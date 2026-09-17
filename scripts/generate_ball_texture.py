import math
import time
import subprocess
import os

t0 = time.time()

# Width and height for high-definition 3D texture
WIDTH = 2048
HEIGHT = 1024

# 1. Truncated icosahedron vertices aligned with +Z
phi = (1.0 + math.sqrt(5.0)) / 2.0
raw_ico = []
for s1 in [-1, 1]:
    for s2 in [-1, 1]:
        raw_ico.append((0, s1 * 1.0, s2 * phi))
        raw_ico.append((s1 * 1.0, s2 * phi, 0))
        raw_ico.append((s2 * phi, 0, s1 * 1.0))

def norm(v):
    l = math.hypot(v[0], math.hypot(v[1], v[2]))
    return (v[0]/l, v[1]/l, v[2]/l)

raw_ico = [norm(v) for v in raw_ico]

# Rotate to put v0 at (0, 0, 1)
v0 = min(raw_ico, key=lambda v: v[2])
ang = math.pi - math.atan2(v0[1], -v0[2])
cos_a, sin_a = math.cos(ang), math.sin(ang)

def rot_x(v):
    return (v[0], v[1]*cos_a - v[2]*sin_a, v[1]*sin_a + v[2]*cos_a)

ico_verts = [rot_x(v) for v in raw_ico]

# Generate 20 hexagon centers (face centers of icosahedron)
hex_centers = []
for i in range(len(ico_verts)):
    for j in range(i+1, len(ico_verts)):
        dot_ij = sum(ico_verts[i][k]*ico_verts[j][k] for k in range(3))
        if abs(dot_ij - 0.4472135955) < 0.05:
            for m in range(j+1, len(ico_verts)):
                dot_im = sum(ico_verts[i][k]*ico_verts[m][k] for k in range(3))
                dot_jm = sum(ico_verts[j][k]*ico_verts[m][k] for k in range(3))
                if abs(dot_im - 0.4472135955) < 0.05 and abs(dot_jm - 0.4472135955) < 0.05:
                    c = norm((ico_verts[i][0]+ico_verts[j][0]+ico_verts[m][0],
                              ico_verts[i][1]+ico_verts[j][1]+ico_verts[m][1],
                              ico_verts[i][2]+ico_verts[j][2]+ico_verts[m][2]))
                    if not any(sum(c[k]*x[k] for k in range(3)) > 0.99 for x in hex_centers):
                        hex_centers.append(c)

print(f"Setup complete: {len(ico_verts)} pentagons, {len(hex_centers)} hexagons")

# Precompute sin/cos for speed
cos_phi = [math.cos((y / HEIGHT) * math.pi) for y in range(HEIGHT)]
sin_phi = [math.sin((y / HEIGHT) * math.pi) for y in range(HEIGHT)]
cos_theta = [math.cos((x / WIDTH) * 2 * math.pi) for x in range(WIDTH)]
sin_theta = [math.sin((x / WIDTH) * 2 * math.pi) for x in range(WIDTH)]

HALF_W = WIDTH // 2

# Bytearray for RGB image
img_bytes = bytearray(WIDTH * HEIGHT * 3)

for y in range(HEIGHT):
    cp = cos_phi[y]
    sp = sin_phi[y]
    y_idx = y * WIDTH * 3

    for x in range(WIDTH):
        idx = y_idx + x * 3

        # Seam width check (dividing the two halves at x=0, x=HALF_W, x=WIDTH-1)
        dist_to_seam = min(abs(x - HALF_W), x, WIDTH - 1 - x)
        if dist_to_seam < 8:
            # Golden metallic seam with rivets
            if (y % 24 < 6) and dist_to_seam < 4:
                # Golden rivet
                img_bytes[idx] = 254
                img_bytes[idx + 1] = 240
                img_bytes[idx + 2] = 138
            else:
                # Metallic gold border
                g_factor = 1.0 - (dist_to_seam / 8.0)
                img_bytes[idx] = int(180 + 70 * g_factor)
                img_bytes[idx + 1] = int(120 + 70 * g_factor)
                img_bytes[idx + 2] = int(20 + 30 * g_factor)
            continue

        # ==============================================================
        # HEMISPHERE 1: AUTHENTIC SOCCER MATCH BALL (x < HALF_W)
        # ==============================================================
        if x < HALF_W:
            ct = cos_theta[x]
            st = sin_theta[x]

            px = -sp * ct
            py = cp
            pz = sp * st

            # Find 2 highest scores
            best_score1 = -999.0
            best_score2 = -999.0
            best_type = 'hex'
            best_dot = 0.0
            best_id = 0

            # Pentagons have 1.08 weight to match geometric truncation
            for k, iv in enumerate(ico_verts):
                dot = px*iv[0] + py*iv[1] + pz*iv[2]
                score = dot * 1.08
                if score > best_score1:
                    best_score2 = best_score1
                    best_score1 = score
                    best_type = 'pent'
                    best_dot = dot
                    best_id = k
                elif score > best_score2:
                    best_score2 = score

            for j, hv in enumerate(hex_centers):
                dot = px*hv[0] + py*hv[1] + pz*hv[2]
                score = dot
                if score > best_score1:
                    best_score2 = best_score1
                    best_score1 = score
                    best_type = 'hex'
                    best_dot = dot
                    best_id = j
                elif score > best_score2:
                    best_score2 = score

            diff = best_score1 - best_score2

            # Panel seam groove
            if diff < 0.032:
                # Deep recessed channel
                groove_edge = diff / 0.032
                if diff < 0.008 and ((x + y) % 14 < 6):
                    # Stitched thread
                    img_bytes[idx] = 220
                    img_bytes[idx + 1] = 225
                    img_bytes[idx + 2] = 230
                else:
                    g_val = int(15 + 25 * groove_edge)
                    img_bytes[idx] = g_val
                    img_bytes[idx + 1] = g_val + 2
                    img_bytes[idx + 2] = g_val + 8
            elif best_type == 'pent':
                # PENTAGON: Obsidian leather with metallic sheen
                # If central pentagon (best_id == 0, z == 1.0):
                is_center = (best_id == 0)
                edge_dist = diff - 0.032

                if is_center and edge_dist < 0.035:
                    # Gold border rim on central pentagon
                    img_bytes[idx] = 245
                    img_bytes[idx + 1] = 175
                    img_bytes[idx + 2] = 25
                elif is_center and best_dot > 0.985:
                    # Center gold star/emblem dot
                    img_bytes[idx] = 254
                    img_bytes[idx + 1] = 220
                    img_bytes[idx + 2] = 70
                else:
                    # Obsidian black leather with micro texture
                    sh = int(18 + 25 * best_dot)
                    grain = int((((x * 17) ^ (y * 23)) % 10) - 5)
                    r = max(10, min(65, sh + grain))
                    # Subtle midnight blue tint for outer pentagons, crimson touch
                    if not is_center and (best_id % 2 == 0):
                        img_bytes[idx] = r + 15
                        img_bytes[idx + 1] = r
                        img_bytes[idx + 2] = r + 5
                    else:
                        img_bytes[idx] = r
                        img_bytes[idx + 1] = r + 2
                        img_bytes[idx + 2] = r + 12
            else:
                # HEXAGON: Crisp pearl white leather with FIFA 26 dynamic accents
                edge_dist = diff - 0.032
                # White leather base
                base_white = int(230 + 24 * best_dot)
                grain = int((((x * 19) ^ (y * 31)) % 8) - 4)
                w_val = max(200, min(255, base_white + grain))

                # Dynamic FIFA 26 aero-swooshes near hexagon edges
                # Distance from panel center
                dist_from_c = math.sqrt(max(0.0, 1.0 - best_dot**2))
                
                # Dynamic colored swoosh ring around hexagons
                if 0.22 < dist_from_c < 0.38 and (edge_dist < 0.12):
                    angle = math.atan2(py - hex_centers[best_id][1], px - hex_centers[best_id][0])
                    wave = math.sin(angle * 3.0 + best_id)
                    if wave > 0.2:
                        # Royal Blue aero-channel
                        img_bytes[idx] = 30
                        img_bytes[idx + 1] = 90
                        img_bytes[idx + 2] = 220
                    elif wave < -0.2:
                        # Vivid FIFA Red aero-channel
                        img_bytes[idx] = 235
                        img_bytes[idx + 1] = 45
                        img_bytes[idx + 2] = 45
                    else:
                        # Electric Cyan accent
                        img_bytes[idx] = 6
                        img_bytes[idx + 1] = 182
                        img_bytes[idx + 2] = 212
                else:
                    img_bytes[idx] = w_val
                    img_bytes[idx + 1] = w_val
                    img_bytes[idx + 2] = min(255, w_val + 2)

        # ==============================================================
        # HEMISPHERE 2: LUXURY CAPITAL & MONEY (x >= HALF_W)
        # ==============================================================
        else:
            # Center of money face is at x = HALF_W + HALF_W // 2, y = HEIGHT // 2
            mc_x = HALF_W + HALF_W // 2
            mc_y = HEIGHT // 2

            dx = x - mc_x
            dy = y - mc_y
            dist_center = math.hypot(dx, dy)

            # Banknote background gradient (Emerald green to forest dark)
            bg_factor = min(1.0, dist_center / (HALF_W * 0.7))
            r = int(6 + (2 - 6) * bg_factor)
            g = int(78 + (28 - 78) * bg_factor)
            b = int(59 + (20 - 59) * bg_factor)

            # 1. Guilloche Security Wave Engravings
            angle = math.atan2(dy, dx)
            wave1 = math.sin(dist_center * 0.15 + angle * 12) * 5
            wave2 = math.cos(dist_center * 0.08 - angle * 8) * 4
            if abs(dist_center % 18 + wave1 - 9) < 1.4:
                # Gold/emerald security thread
                r = int(r * 0.7 + 180 * 0.3)
                g = int(g * 0.7 + 220 * 0.3)
                b = int(b * 0.7 + 100 * 0.3)

            # 2. Central Medallion Outer Gold Rim
            if 220 <= dist_center <= 236:
                # Outer gold ring
                r, g, b = 245, 175, 25
            elif 205 <= dist_center <= 212:
                # Inner fine gold ring
                r, g, b = 254, 240, 138
            elif dist_center < 205:
                # Inside Medallion: Rich deep emerald & gold shimmer
                r = int(6 + (dx + dy) * 0.05)
                g = int(85 + (dx + dy) * 0.08)
                b = int(65 + (dx + dy) * 0.05)
                r = max(5, min(90, r))
                g = max(40, min(140, g))
                b = max(30, min(110, b))

                # Large embossed '$' symbol
                # S-curve logic: center bar and double curve
                dollar_pixel = False
                if abs(dx) < 7 and abs(dy) < 120:
                    # Vertical strike-through lines
                    dollar_pixel = True
                elif abs(dy) < 95 and abs(dx) < 65:
                    # S curves
                    norm_y = dy / 80.0
                    norm_x = dx / 55.0
                    # Top curve: dy in [-75, -15]
                    if -80 < dy < -10:
                        cy = -45
                        rad = math.hypot(dx, dy - cy)
                        if 30 < rad < 50 and not (dx > 25 and dy > -45):
                            dollar_pixel = True
                    # Bottom curve: dy in [10, 80]
                    elif 10 < dy < 80:
                        cy = 45
                        rad = math.hypot(dx, dy - cy)
                        if 30 < rad < 50 and not (dx < -25 and dy < 45):
                            dollar_pixel = True
                    # Center diagonal bridge: dy in [-20, 20]
                    elif abs(dy) <= 20 and abs(dx - (-dy * 1.5)) < 16:
                        dollar_pixel = True

                if dollar_pixel:
                    # Embossed 3D Gold with specular highlight
                    if dx < -2 or dy < -2:
                        r, g, b = 254, 240, 138 # Highlight
                    else:
                        r, g, b = 217, 119, 6 # Shadow gold

            # 3. Banknote Outer Decorative Border
            bx1, bx2 = HALF_W + 30, WIDTH - 30
            by1, by2 = 40, HEIGHT - 40
            if (bx1 <= x <= bx2 and (abs(y - by1) < 4 or abs(y - by2) < 4)) or \
               (by1 <= y <= by2 and (abs(x - bx1) < 4 or abs(x - bx2) < 4)):
                r, g, b = 217, 119, 6 # Gold border

            img_bytes[idx] = max(0, min(255, r))
            img_bytes[idx + 1] = max(0, min(255, g))
            img_bytes[idx + 2] = max(0, min(255, b))

# Write to PPM
ppm_path = "public/hybrid-ball-texture.ppm"
png_path = "public/hybrid-ball-texture.png"

with open(ppm_path, "wb") as f:
    f.write(f"P6\n{WIDTH} {HEIGHT}\n255\n".encode())
    f.write(img_bytes)

print(f"PPM written in {round(time.time() - t0, 2)}s, converting to PNG...")
subprocess.run(["convert", ppm_path, png_path], check=True)
os.remove(ppm_path)
print(f"Texture ready at {png_path}! Total time: {round(time.time() - t0, 2)}s")
