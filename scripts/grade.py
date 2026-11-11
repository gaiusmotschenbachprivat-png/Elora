"""Farbkorrektur („Kampagnen-Look“) für die Render-Master.

Aufruf: python scripts/grade.py <eingabe.png> <ausgabe.png>
Wärmere Lichter, sattere Tiefen, dezente Vignette und feines Filmkorn.
"""
import sys
import numpy as np
from PIL import Image


def grade(img: Image.Image, seed: int = 7) -> Image.Image:
    a = np.asarray(img.convert("RGB")).astype(np.float32) / 255.0
    h, w, _ = a.shape

    # 1. Schwarzpunkt & Kontrast (weiche S-Kurve um die Mitte)
    a = np.clip((a - 0.02) / (1 - 0.02), 0, 1)
    s = a * a * (3 - 2 * a)  # Smoothstep = weiche S-Kurve
    a = a + (s - a) * 0.28
    a = np.clip(a * 1.025, 0, 1)  # Lichter minimal öffnen

    # 2. Weißabgleich: Lichter wärmer, Schatten minimal kühler-grün (Salbei)
    lum = a @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
    hi = np.clip((lum - 0.45) / 0.55, 0, 1)[..., None]
    lo = np.clip((0.45 - lum) / 0.45, 0, 1)[..., None]
    a = a * (1 + hi * np.array([0.025, 0.008, -0.03])) * (1 + lo * np.array([-0.01, 0.005, -0.005]))

    # 3. Sättigung leicht anheben (Citrus), ohne Hauttöne/Weiß zu verfärben
    lum = (a @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32))[..., None]
    a = lum + (a - lum) * 1.08

    # 4. Vignette (sehr dezent)
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    d = np.sqrt(((xx - w / 2) / (w / 2)) ** 2 + ((yy - h / 2) / (h / 2)) ** 2) / np.sqrt(2)
    a = a * (1 - 0.05 * d[..., None] ** 2.4)

    # 5. Filmkorn (luminanzbasiert, in Mitteltönen am stärksten)
    rng = np.random.default_rng(seed)
    g = rng.normal(0, 1, (h, w)).astype(np.float32)
    lum = (a @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32))[..., None]
    a = a + g[..., None] * 0.006 * (1 - np.abs(2 * lum - 1))

    return Image.fromarray((np.clip(a, 0, 1) * 255 + 0.5).astype(np.uint8))


if __name__ == "__main__":
    grade(Image.open(sys.argv[1])).save(sys.argv[2])
