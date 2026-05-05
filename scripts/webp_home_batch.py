"""One-off: resize imports to 4:3 @1600x1200 WebP per public/README.md."""
from pathlib import Path

from PIL import Image

HOME = Path(__file__).resolve().parents[1] / "public" / "home"


def cover_4_3(im: Image.Image, w: int = 1600, h: int = 1200) -> Image.Image:
  im = im.convert("RGB")
  sw, sh = im.size
  tr = w / h
  sr = sw / sh
  if sr > tr:
    nw = int(sh * tr)
    left = (sw - nw) // 2
    im = im.crop((left, 0, left + nw, sh))
  else:
    nh = int(sw / tr)
    top = (sh - nh) // 2
    im = im.crop((0, top, sw, top + nh))
  return im.resize((w, h), Image.Resampling.LANCZOS)


def save_webp_under_budget(im: Image.Image, dest: Path, max_bytes: int = 380_000) -> int:
  lo, hi = 50, 92
  best_q = 50
  dest.parent.mkdir(parents=True, exist_ok=True)
  while lo <= hi:
    mid = (lo + hi) // 2
    im.save(dest, format="WEBP", quality=mid, method=6)
    sz = dest.stat().st_size
    if sz <= max_bytes:
      best_q = mid
      lo = mid + 1
    else:
      hi = mid - 1
  im.save(dest, format="WEBP", quality=best_q, method=6)
  return dest.stat().st_size


MAPPED = [
  ("slide-01.png", "era.webp"),
  ("slide-02.png", "spectrum-bedside.webp"),
  ("slide-03.png", "spectrum-desk.webp"),
  ("slide-04.png", "spectrum-home.webp"),
  ("slide-05.png", "spectrum-community.webp"),
  ("slide-06.png", "intelligence.webp"),
]


def main() -> None:
  for src_name, dest_name in MAPPED:
    p = HOME / src_name
    if not p.exists():
      print("missing", p)
      continue
    with Image.open(p) as im:
      out = cover_4_3(im)
    d = HOME / dest_name
    sz = save_webp_under_budget(out, d)
    print(f"{dest_name}\t{sz / 1024:.1f} KB")

  for i in range(7, 15):
    src_name = f"slide-{i:02d}.png"
    p = HOME / src_name
    if not p.exists():
      continue
    with Image.open(p) as im:
      out = cover_4_3(im)
    d = HOME / f"slide-{i:02d}.webp"
    sz = save_webp_under_budget(out, d)
    print(f"{d.name}\t{sz / 1024:.1f} KB")


if __name__ == "__main__":
  main()
