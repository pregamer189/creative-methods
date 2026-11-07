"""Shared geometry for the slab take: a phone-sized card covered in ArUco markers.

Frame of the slab ("phone frame"), in millimetres:
  origin = centre of the screen face, x = right, y = up (toward the top edge),
  z = out of the screen toward the viewer.
"""
import cv2
import numpy as np

DICT = cv2.aruco.DICT_4X4_50
FACE_W, FACE_H = 70.0, 146.0           # a typical phone face, mm
MARKER = 26.0                          # marker side, mm
CENTRES = [(x, y) for y in (54, 18, -18, -54) for x in (-17.5, 17.5)]  # ids 0..7, top-left first


# Optional "fin": a small tab folded up at 90 degrees at the top edge, facing
# down the slab, so the camera still sees markers when it skims along the screen
# (the runway angle, where the face markers are too slanted to read).
TAB_MARKER = 20.0
TAB_CENTRES = [(-17.5, 14.0), (17.5, 14.0)]   # ids 8, 9: (x, z) on the plane y = FACE_H / 2
TAB_W, TAB_H = 70.0, 28.0


def dictionary():
    return cv2.aruco.getPredefinedDictionary(DICT)


def marker_corners_3d(i):
    if i >= 8:
        cx, cz = TAB_CENTRES[i - 8]; h = TAB_MARKER / 2; y = FACE_H / 2
        return np.array([[cx - h, y, cz + h], [cx + h, y, cz + h],
                         [cx + h, y, cz - h], [cx - h, y, cz - h]], np.float64)
    cx, cy = CENTRES[i]
    h = MARKER / 2
    # detector order: top-left, top-right, bottom-right, bottom-left
    return np.array([[cx - h, cy + h, 0], [cx + h, cy + h, 0],
                     [cx + h, cy - h, 0], [cx - h, cy - h, 0]], np.float64)


def sheet_image(ppmm=300 / 25.4):
    """Printable face (white card, black markers, a TOP mark)."""
    w, h = int(round(FACE_W * ppmm)), int(round(FACE_H * ppmm))
    img = np.full((h, w), 255, np.uint8)
    side = int(round(MARKER * ppmm))
    for i, (cx, cy) in enumerate(CENTRES):
        m = cv2.aruco.generateImageMarker(dictionary(), i, side)
        x0 = int(round((FACE_W / 2 + cx - MARKER / 2) * ppmm))
        y0 = int(round((FACE_H / 2 - cy - MARKER / 2) * ppmm))
        img[y0:y0 + side, x0:x0 + side] = m
    cv2.putText(img, "TOP", (w // 2 - int(6 * ppmm), int(4.5 * ppmm)),
                cv2.FONT_HERSHEY_SIMPLEX, 0.09 * ppmm, 0, max(1, int(0.4 * ppmm)))
    cv2.rectangle(img, (0, 0), (w - 1, h - 1), 0, max(1, int(0.3 * ppmm)))
    return img


def intrinsics(w, h, hfov_deg):
    f = (w / 2) / np.tan(np.radians(hfov_deg) / 2)
    return np.array([[f, 0, w / 2], [0, f, h / 2], [0, 0, 1]], np.float64)


def tab_image(ppmm=300 / 25.4):
    """Printable fin: glue it upright on the top edge, printed side facing the screen."""
    w, h = int(round(TAB_W * ppmm)), int(round(TAB_H * ppmm))
    img = np.full((h, w), 255, np.uint8)
    side = int(round(TAB_MARKER * ppmm))
    for k, (cx, cz) in enumerate(TAB_CENTRES):
        m = cv2.aruco.generateImageMarker(dictionary(), 8 + k, side)
        x0 = int(round((TAB_W / 2 + cx - TAB_MARKER / 2) * ppmm))
        y0 = int(round((TAB_H - cz - TAB_MARKER / 2) * ppmm))
        img[y0:y0 + side, x0:x0 + side] = m
    cv2.rectangle(img, (0, 0), (w - 1, h - 1), 0, max(1, int(0.3 * ppmm)))
    return img
