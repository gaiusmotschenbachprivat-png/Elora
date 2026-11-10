"""Erzeugt responsive WebP-Varianten aus den Render-Mastern.

Aufruf: python scripts/images.py <ordner-mit-pngs>
Die Breiten müssen zu WIDTHS in src/components/ui/Picture.tsx passen.
"""
import os, sys
from PIL import Image

WIDTHS = {
    "hero": [800, 1280, 1920, 2400],
    "still": [800, 1280, 1920, 2400],
    "pack-front": [640, 1024, 1600],
    "pack-glass": [640, 1024, 1600],
    "flatlay": [640, 1024, 1600],
    "glass": [640, 1024, 1600],
}

src_dir = sys.argv[1]
out_dir = os.path.join(os.path.dirname(__file__), "..", "public", "images")
os.makedirs(out_dir, exist_ok=True)
for name, widths in WIDTHS.items():
    path = os.path.join(src_dir, f"{name}.png")
    if not os.path.exists(path):
        print("fehlt:", name)
        continue
    im = Image.open(path).convert("RGB")
    for w in widths:
        h = round(im.height * w / im.width)
        im.resize((w, h), Image.LANCZOS).save(os.path.join(out_dir, f"{name}-{w}.webp"), "WEBP", quality=82, method=6)
    print("ok:", name, im.size)
