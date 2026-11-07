"""Load a slab-take camera path into Blender: a phone-sized stand-in at the
origin and a camera keyed on every frame. Not run yet in this repo's tests
(needs Blender 4.x); run it once on the Mac before the first real take.

  blender -b -P blender_camera.py -- path.json [scene.blend]
or paste into Blender's Text Editor and set PATH below.
Units: the path is in mm; the scene uses metres (1 mm = 0.001).
"""
import bpy, json, sys

argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
PATH = argv[0] if argv else "path.json"
OUT = argv[1] if len(argv) > 1 else None
d = json.load(open(PATH))
mm = 0.001
scn = bpy.context.scene
scn.render.fps = round(d["fps"]); scn.frame_start = 1; scn.frame_end = len(d["frames"])

# stand-in phone: top face is the screen, at z = 0, top edge toward +Y
bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0, -4 * mm))
phone = bpy.context.object; phone.name = "phone_standin"
phone.scale = (72 * mm, 148 * mm, 8 * mm)

cam_data = bpy.data.cameras.new("slab_cam")
w, h = d["source_size"]
cam_data.sensor_fit = "HORIZONTAL"; cam_data.sensor_width = 36
import math
cam_data.lens = 18 / math.tan(math.radians(d["hfov"]) / 2)   # same field of view as the take
cam_data.clip_start = 1 * mm
cam = bpy.data.objects.new("slab_cam", cam_data); scn.collection.objects.link(cam); scn.camera = cam
cam.rotation_mode = "QUATERNION"
for i, f in enumerate(d["frames"], start=1):
    cam.location = [v * mm for v in f["p"]]; cam.rotation_quaternion = f["q"]
    cam.keyframe_insert("location", frame=i); cam.keyframe_insert("rotation_quaternion", frame=i)
scn.render.resolution_x, scn.render.resolution_y = w, h
if OUT: bpy.ops.wm.save_as_mainfile(filepath=OUT)
print(f"keyed {len(d['frames'])} frames from {PATH}")
