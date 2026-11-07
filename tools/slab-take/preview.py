"""Camera path -> greybox animatic (no Blender needed): a phone standing still,
seen from the acted camera. Good enough to judge the move, the timing and the
framing before anything is modelled or generated.

  python3 preview.py path.json --screen screen.png --size 1080x1920 --out preview.mp4
"""
import argparse, json, subprocess, os, tempfile
import cv2
import numpy as np
from slab import FACE_W, FACE_H, intrinsics
from track import FLIP

BODY = (FACE_W + 2, FACE_H + 2, 8.0)  # mm


def extrinsics(p, q):
    w, x, y, z = q
    Rb = np.array([[1 - 2 * (y * y + z * z), 2 * (x * y - w * z), 2 * (x * z + w * y)],
                   [2 * (x * y + w * z), 1 - 2 * (x * x + z * z), 2 * (y * z - w * x)],
                   [2 * (x * z - w * y), 2 * (y * z + w * x), 1 - 2 * (x * x + y * y)]])
    R = (Rb @ FLIP).T
    return R, -R @ np.asarray(p, float)


def default_screen():
    img = np.full((1460, 700, 3), (40, 36, 34), np.uint8)
    for yy in range(0, 1460, 100): cv2.line(img, (0, yy), (700, yy), (70, 66, 62), 2)
    cv2.putText(img, "SCREEN", (170, 740), cv2.FONT_HERSHEY_SIMPLEX, 3, (230, 230, 230), 6)
    return img


def render(K, R, t, size, screen):
    W, H = size
    out = np.full((H, W, 3), (214, 216, 218), np.uint8)
    bw, bh, bd = BODY
    def proj(P):
        P = np.asarray(P, float); C = (R @ P.T).T + t
        return C, C[:, :2] / C[:, 2:3] * [K[0, 0], K[1, 1]] + [K[0, 2], K[1, 2]]
    v = np.array([[sx * bw / 2, sy * bh / 2, z] for z in (0, -bd) for sx, sy in ((-1, 1), (1, 1), (1, -1), (-1, -1))])
    faces = [([4, 5, 6, 7], (60, 60, 64)), ([0, 1, 5, 4], (120, 120, 126)), ([3, 2, 6, 7], (120, 120, 126)),
             ([0, 3, 7, 4], (100, 100, 106)), ([1, 2, 6, 5], (100, 100, 106)), ([0, 1, 2, 3], (24, 24, 26))]
    C, uv = proj(v)
    if (C[:, 2] < 5).any(): return out          # camera inside or behind the phone: skip frame
    cam = -R.T @ t; centre = np.array([0, 0, -bd / 2])
    for idx, col in faces:                       # convex box: back-face culling is enough
        n = np.cross(v[idx[1]] - v[idx[0]], v[idx[3]] - v[idx[0]])
        if np.dot(n, v[idx[0]] - centre) < 0: n = -n
        if np.dot(n, cam - v[idx[0]]) > 0:
            cv2.fillConvexPoly(out, np.round(uv[idx]).astype(np.int32), col, cv2.LINE_AA)
    if cam[2] > 0:                               # screen faces the camera
        sw, sh = FACE_W - 4, FACE_H - 6
        _, suv = proj([[-sw / 2, sh / 2, 0.1], [sw / 2, sh / 2, 0.1], [sw / 2, -sh / 2, 0.1], [-sw / 2, -sh / 2, 0.1]])
        h, w = screen.shape[:2]
        M = cv2.getPerspectiveTransform(np.float32([[0, 0], [w, 0], [w, h], [0, h]]), np.float32(suv))
        warped = cv2.warpPerspective(screen, M, (W, H), flags=cv2.INTER_LINEAR)
        mask = cv2.warpPerspective(np.full((h, w), 255, np.uint8), M, (W, H))
        out[mask > 127] = warped[mask > 127]
    return out


if __name__ == "__main__":
    a = argparse.ArgumentParser()
    a.add_argument("path"); a.add_argument("--screen"); a.add_argument("--size", default="1080x1920")
    a.add_argument("--hfov", type=float, help="lens of the film (default: the take's)")
    a.add_argument("--out", default="preview.mp4"); a.add_argument("--sheet", help="also write a contact sheet PNG")
    o = a.parse_args()
    d = json.load(open(o.path)); W, H = map(int, o.size.split("x"))
    hf = o.hfov or d["hfov"]
    # keep the take's vertical framing when the output is portrait
    K = intrinsics(W, H, hf if W >= H else np.degrees(2 * np.arctan(np.tan(np.radians(hf) / 2) * W / H * d["source_size"][1] / d["source_size"][0] * H / W)))
    screen = cv2.imread(o.screen) if o.screen else default_screen()
    tmp = tempfile.mkdtemp(); stills = []
    for i, f in enumerate(d["frames"]):
        R, t = extrinsics(f["p"], f["q"]); img = render(K, R, t, (W, H), screen)
        cv2.imwrite(f"{tmp}/{i:05d}.png", img)
        if o.sheet and i % max(1, len(d["frames"]) // 8) == 0: stills.append(cv2.resize(img, (W // 4, H // 4)))
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-framerate", str(d["fps"]), "-i", f"{tmp}/%05d.png",
                    "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "20", o.out], check=True)
    if o.sheet: cv2.imwrite(o.sheet, np.hstack(stills[:8]))
    print("wrote", o.out)
