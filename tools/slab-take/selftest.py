"""Proof that the slab trick works, with no hands and no camera: render a fake
take of the printed slab along a known camera path (dolly in, tilt, skim along
the screen like a runway), track it, and measure how close the recovered path is.

  python3 selftest.py      -> prints the error, writes selftest-take.mp4 and selftest-path.json
"""
import json, subprocess, tempfile
import cv2
import numpy as np
from slab import sheet_image, tab_image, FACE_W, FACE_H, TAB_W, TAB_H, intrinsics
from track import track, smooth, quat, FLIP

W, H, HFOV, N, FPS = 1920, 1080, 69.0, 150, 30
K = intrinsics(W, H, HFOV)


def look(pos, target, s):
    f = target - pos; f /= np.linalg.norm(f)
    up = np.array([0, 1 - s, s], float); up /= np.linalg.norm(up)
    x = np.cross(f, up); x /= np.linalg.norm(x); y = np.cross(x, f)
    return np.stack([x, y, -f], 1)               # Blender camera rotation (columns)


def truth(i):
    u = i / (N - 1)
    if u < 0.4:                                  # slow push in, face on
        k = u / 0.4; pos = np.array([0, 0, 420 - 160 * k]); tgt = np.array([0, 0, 0.]); s = 0.0
    else:                                        # tilt over and skim along the screen
        k = (u - 0.4) / 0.6; e = k * k * (3 - 2 * k)
        pos = np.array([12 * np.sin(3 * k), -150 * e, 260 - 225 * e]); tgt = np.array([0, 60 * e, 0.]); s = 0.85 * e
    return pos, look(pos, tgt, s)


def plane(img, tex, corners3d, R, t):
    C = (R @ corners3d.T).T + t
    if (C[:, 2] < 5).any(): return
    uv = C[:, :2] / C[:, 2:3] * [K[0, 0], K[1, 1]] + [K[0, 2], K[1, 2]]
    h, w = tex.shape[:2]
    M = cv2.getPerspectiveTransform(np.float32([[0, 0], [w, 0], [w, h], [0, h]]), np.float32(uv))
    warped = cv2.warpPerspective(tex, M, (W, H)); mask = cv2.warpPerspective(np.full((h, w), 255, np.uint8), M, (W, H))
    img[mask > 127] = warped[mask > 127]


if __name__ == "__main__":
    face = cv2.cvtColor(sheet_image(12), cv2.COLOR_GRAY2BGR); fin = cv2.cvtColor(tab_image(12), cv2.COLOR_GRAY2BGR)
    fx, fy, ty = FACE_W / 2, FACE_H / 2, FACE_H / 2
    face3d = np.array([[-fx, fy, 0], [fx, fy, 0], [fx, -fy, 0], [-fx, -fy, 0]], float)
    fin3d = np.array([[-TAB_W / 2, ty, TAB_H], [TAB_W / 2, ty, TAB_H], [TAB_W / 2, ty, 0], [-TAB_W / 2, ty, 0]], float)
    rng = np.random.default_rng(1); tmp = tempfile.mkdtemp(); gt = []
    for i in range(N):
        p, Rb = truth(i); gt.append((p, Rb)); R = (Rb @ FLIP).T; t = -R @ p
        img = np.full((H, W, 3), 150, np.uint8)
        plane(img, face, face3d, R, t)
        if np.dot(p - fin3d[0], [0, -1, 0]) > 0: plane(img, fin, fin3d, R, t)
        img = cv2.GaussianBlur(img, (3, 3), 0)
        img = np.clip(img + rng.normal(0, 4, img.shape), 0, 255).astype(np.uint8)
        cv2.imwrite(f"{tmp}/{i:05d}.png", img)
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-framerate", str(FPS), "-i", f"{tmp}/%05d.png",
                    "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", "selftest-take.mp4"], check=True)
    fps, size, poses = track("selftest-take.mp4", HFOV)
    P, Q, cover = smooth(poses, 1)
    dp = [np.linalg.norm(P[i] - gt[i][0]) for i in range(N) if poses[i] is not None]
    da = [np.degrees(2 * np.arccos(min(1, abs(np.dot(Q[i], quat(gt[i][1])))))) for i in range(N) if poses[i] is not None]
    dist = [np.linalg.norm(g[0]) for g in gt]
    print(f"slab found in {cover:.0%} of frames; position error median {np.median(dp):.1f} mm, 95th {np.percentile(dp, 95):.1f} mm "
          f"(camera 60-420 mm away); angle error median {np.median(da):.2f} deg, 95th {np.percentile(da, 95):.2f} deg")
    missing = [i for i in range(N) if poses[i] is None]
    print("frames with no slab:", missing[:10], "..." if len(missing) > 10 else "")
    P, Q, _ = smooth(poses, 5)
    json.dump({"fps": fps, "source_size": size, "hfov": HFOV, "units": "mm", "coverage": cover,
               "frames": [{"p": p.tolist(), "q": q.tolist()} for p, q in zip(P, Q)]}, open("selftest-path.json", "w"))
