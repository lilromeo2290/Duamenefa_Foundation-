"""
Generate a proper square favicon.png and logo.png from the real Duamenefa logo (logo.jpg).
Replaces the mislabeled JPEG files that were showing as a bird icon in the browser tab.
"""

from PIL import Image
from pathlib import Path

PUBLIC = Path("/home/z/my-project/public")
SRC = PUBLIC / "logo.jpg"  # 412x122 banner — the real Duamenefa logo

# Load source
src = Image.open(SRC).convert("RGBA")
print(f"Source: {SRC.name}  size={src.size}  mode={src.mode}")
w, h = src.size

# 1) favicon.png — 512x512 square with white background, logo centered and padded
FAV_SIZE = 512
fav_bg = Image.new("RGBA", (FAV_SIZE, FAV_SIZE), (255, 255, 255, 255))
max_dim = int(FAV_SIZE * 0.80)
scale = min(max_dim / w, max_dim / h)
new_w, new_h = max(1, int(w * scale)), max(1, int(h * scale))
src_resized = src.resize((new_w, new_h), Image.LANCZOS)
offset = ((FAV_SIZE - new_w) // 2, (FAV_SIZE - new_h) // 2)
fav_bg.paste(src_resized, offset, src_resized)

fav_path = PUBLIC / "favicon.png"
fav_bg.save(fav_path, "PNG", optimize=True)
print(f"Saved: {fav_path}  size={fav_bg.size}")

# 2) logo.png — 1024x1024 square with white background (for high-res usage)
LOGO_SIZE = 1024
logo_bg = Image.new("RGBA", (LOGO_SIZE, LOGO_SIZE), (255, 255, 255, 255))
max_dim_l = int(LOGO_SIZE * 0.85)
scale_l = min(max_dim_l / w, max_dim_l / h)
new_w_l, new_h_l = max(1, int(w * scale_l)), max(1, int(h * scale_l))
src_l = src.resize((new_w_l, new_h_l), Image.LANCZOS)
offset_l = ((LOGO_SIZE - new_w_l) // 2, (LOGO_SIZE - new_h_l) // 2)
logo_bg.paste(src_l, offset_l, src_l)

logo_png_path = PUBLIC / "logo.png"
logo_bg.save(logo_png_path, "PNG", optimize=True)
print(f"Saved: {logo_png_path}  size={logo_bg.size}")

# 3) Also generate a real .ico for maximum browser compatibility
ico_path = PUBLIC / "favicon.ico"
fav_bg_ico = Image.new("RGBA", (256, 256), (255, 255, 255, 255))
scale_ico = min(int(256 * 0.80) / w, int(256 * 0.80) / h)
nw_ico, nh_ico = max(1, int(w * scale_ico)), max(1, int(h * scale_ico))
src_ico = src.resize((nw_ico, nh_ico), Image.LANCZOS)
fav_bg_ico.paste(src_ico, ((256 - nw_ico) // 2, (256 - nh_ico) // 2), src_ico)
fav_bg_ico.save(ico_path, format="ICO", sizes=[(256, 256), (128, 128), (64, 64), (48, 48), (32, 32), (16, 16)])
print(f"Saved: {ico_path}")

print("\nDone. Browser tab will now show the Duamenefa logo instead of the bird.")
