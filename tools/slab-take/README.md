# slab-take: act a camera move with your hands, get an exact camera path

Part of `methods/video/launch-films.md` (step 2, "Act it").

You hold a phone-sized card printed with markers and move it in front of a
camera that stands still, while you talk through the shot. Moving the object
in front of a still camera is the same picture as moving the camera around a
still object, so every frame gives an exact camera position around a phone
standing still. That path goes into a greybox preview, Blender, or a
3D-to-video model, exactly as you acted it: the speed, the tilt, the hover.

| File | What it does |
|---|---|
| `make_sheet.py` | Writes `slab-face.png` (70 x 146 mm) and `slab-fin.png` (70 x 28 mm). Print at 100 % |
| `track.py` | Take video to `path.json` (camera per frame, mm, Blender convention), smoothed, gaps filled |
| `preview.py` | `path.json` to a greybox animatic (phone, screen image) with no Blender. `--screen` takes a real app screenshot |
| `blender_camera.py` | `path.json` into Blender: stand-in phone plus a keyed camera with the take's field of view |
| `selftest.py` | Renders a fake take along a known path (push in, tilt, skim like a runway), tracks it, prints the error |

Needs `pip install opencv-contrib-python-headless numpy` and ffmpeg.

## Making the slab (5 minutes)

1. `python3 make_sheet.py`, print both PNGs at 100 % (no fit-to-page).
2. Glue the face on stiff card cut to the print (or on an old phone or a
   phone case). Fold the fin up at 90 degrees on the TOP edge, printed side
   facing the screen. The fin keeps tracking alive when the camera skims low
   along the screen, where the face markers are too slanted to read.
3. Hold it by the edges; fingers may cover one or two markers, not all.

## Filming the take

- Camera on a stand, landscape, main lens (no zoom), 30 or 60 fps, even light,
  no strong glare on the print. Lock focus and exposure (long-press on iPhone).
- Talk while you move: "slow push... now tilt... hover here... things come
  out". The voice track is the timing sheet; it is kept with the take.
- Move slower than you think. One take per shot, several takes are fine.
- If the phone camera isn't the iPhone main lens, pass its field of view with
  `--hfov` (landscape horizontal degrees).

## Proof (2026-11-07)

`python3 selftest.py`: slab found in 100 % of 150 frames; position error
median 0.6 mm (95th 2.1 mm) with the camera 60 to 420 mm away; angle error
median 0.13 degrees. Real takes will be worse (lens distortion, blur, hands);
the first real take on the Mac is the next test.
