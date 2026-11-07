"""Slab take -> camera path.

Film the slab with a still camera and move the slab with your hands. Moving the
object in front of a still camera is the same picture as moving the camera
around a still object, so each frame's slab pose, inverted, is a camera pose
around a phone that stands still at the origin. That path drives Blender (or a
3D-to-video model) exactly as you acted it.

  python3 track.py take.mov --hfov 69 --out path.json
Output: fps, per-frame camera position (mm, phone frame) and rotation
(quaternion w,x,y,z, Blender camera convention: looks down -Z, +Y up).
"""
import argparse, json
import cv2
import numpy as np
from slab import dictionary, marker_corners_3d, intrinsics

FLIP = np.diag([1.0, -1.0, -1.0])  # OpenCV camera (z forward, y down) -> Blender camera


def quat(R):
    w = np.sqrt(max(0.0, 1 + R[0, 0] + R[1, 1] + R[2, 2])) / 2
    x = np.copysign(np.sqrt(max(0.0, 1 + R[0, 0] - R[1, 1] - R[2, 2])) / 2, R[2, 1] - R[1, 2])
    y = np.copysign(np.sqrt(max(0.0, 1 - R[0, 0] + R[1, 1] - R[2, 2])) / 2, R[0, 2] - R[2, 0])
    z = np.copysign(np.sqrt(max(0.0, 1 - R[0, 0] - R[1, 1] + R[2, 2])) / 2, R[1, 0] - R[0, 1])
    q = np.array([w, x, y, z]); return q / np.linalg.norm(q)


def track(path, hfov, min_markers=2):
    cap = cv2.VideoCapture(path)
    fps = cap.get(cv2.CAP_PROP_FPS) or 30
    det = cv2.aruco.ArucoDetector(dictionary(), cv2.aruco.DetectorParameters())
    K = None; poses = []; prev = None
    while True:
        ok, frame = cap.read()
        if not ok: break
        h, w = frame.shape[:2]
        if K is None: K = intrinsics(w, h, hfov)
        corners, ids, _ = det.detectMarkers(cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY))
        if ids is None or len([i for i in ids.flatten() if i < 10]) < min_markers:
            poses.append(None); continue
        obj, img = [], []
        for c, i in zip(corners, ids.flatten()):
            if i < 10: obj.append(marker_corners_3d(i)); img.append(c.reshape(4, 2))
        obj, img = np.vstack(obj), np.vstack(img).astype(np.float64)
        if prev is not None:
            ok, rv, tv = cv2.solvePnP(obj, img, K, None, prev[0].copy(), prev[1].copy(), True, cv2.SOLVEPNP_ITERATIVE)
        else:
            ok, rv, tv = cv2.solvePnP(obj, img, K, None, flags=cv2.SOLVEPNP_SQPNP)
        if not ok: poses.append(None); continue
        prev = (rv, tv)
        R, _ = cv2.Rodrigues(rv)
        Rc = R.T; pc = (-R.T @ tv).ravel()          # camera pose in the phone frame
        poses.append((pc, Rc @ FLIP))
    return fps, (w, h), poses


def smooth(poses, win):
    idx = [i for i, p in enumerate(poses) if p is not None]
    if not idx: raise SystemExit("no slab found in any frame: check light, focus, print size")
    n = len(poses)
    P = np.array([poses[i][0] for i in idx]); Q = [quat(poses[i][1]) for i in idx]
    for k in range(1, len(Q)):                     # keep quaternions on one hemisphere
        if np.dot(Q[k], Q[k - 1]) < 0: Q[k] = -Q[k]
    Q = np.array(Q); t = np.arange(n)
    P = np.stack([np.interp(t, idx, P[:, a]) for a in range(3)], 1)   # fill dropped frames
    Q = np.stack([np.interp(t, idx, Q[:, a]) for a in range(4)], 1)
    if win > 1:
        k = np.ones(win) / win; pad = win // 2
        P = np.stack([np.convolve(np.pad(P[:, a], pad, mode="edge"), k, "valid") for a in range(3)], 1)
        Q = np.stack([np.convolve(np.pad(Q[:, a], pad, mode="edge"), k, "valid") for a in range(4)], 1)
    Q /= np.linalg.norm(Q, axis=1, keepdims=True)
    return P, Q, len(idx) / n


if __name__ == "__main__":
    a = argparse.ArgumentParser()
    a.add_argument("video"); a.add_argument("--hfov", type=float, default=69.0,
                   help="horizontal field of view of the camera that filmed the take (iPhone main, landscape ~69)")
    a.add_argument("--smooth", type=int, default=9, help="frames averaged; odd; 1 = raw hand shake")
    a.add_argument("--out", default="path.json")
    o = a.parse_args()
    fps, size, poses = track(o.video, o.hfov)
    P, Q, cover = smooth(poses, o.smooth)
    json.dump({"fps": fps, "source_size": size, "hfov": o.hfov, "units": "mm", "coverage": round(cover, 3),
               "frames": [{"p": [round(v, 2) for v in p], "q": [round(v, 5) for v in q]} for p, q in zip(P, Q)]},
              open(o.out, "w"))
    print(f"{len(P)} frames at {fps:.2f} fps, slab found in {cover:.0%} -> {o.out}")
