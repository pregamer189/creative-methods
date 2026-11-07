"""Write the printable slab: slab-face.png (70 x 146 mm) and slab-fin.png (70 x 28 mm), 300 dpi, print at 100 %."""
import cv2
from slab import sheet_image, tab_image
cv2.imwrite("slab-face.png", sheet_image()); cv2.imwrite("slab-fin.png", tab_image())
print("wrote slab-face.png and slab-fin.png - print at 100 % (no fit-to-page).")
print("Glue the face on a phone-sized card. Fold the fin up at 90 deg on the TOP edge, printed side facing the screen.")
