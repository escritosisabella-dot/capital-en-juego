import math
import time
import subprocess
import os

t0 = time.time()

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

print(f"Icosahedron setup complete: {len(ico_verts)} pentagons, {len(hex_centers)} hexagons")

# Precompute sin/cos
cos_phi = [math.cos((y / HEIGHT) * math.pi) for y in range(HEIGHT)]
sin_phi = [math.sin((y / HEIGHT) * math.pi) for y in range(HEIGHT)]
cos_theta = [math.cos((x / WIDTH) * 2 * math.pi) for x in range(WIDTH)]
sin_theta = [math.sin((x / WIDTH) * 2 * math.pi) for x in range(WIDTH)]

img_bytes = bytearray(WIDTH * HEIGHT * 3)
bump_bytes = bytearray(WIDTH * HEIGHT * 3)

for y in range(HEIGHT):
    cp = cos_phi[y]
    sp = sin_phi[y]
    y_idx = y * WIDTH * 3

    for x in range(WIDTH):
        idx = y_idx + x * 3

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

        # 1. Seams & Stitching Channels
        if diff < 0.034:
            groove_factor = diff / 0.034
            # Stitched thread
            if diff < 0.010 and ((x + y) % 12 < 5):
                # Thread stitch
                img_bytes[idx] = 230
                img_bytes[idx + 1] = 235
                img_bytes[idx + 2] = 240
                # Bump: raised thread
                bump_bytes[idx] = 210
                bump_bytes[idx + 1] = 210
                bump_bytes[idx + 2] = 210
            else:
                # Deep recessed channel
                c_val = int(25 + 30 * groove_factor)
                img_bytes[idx] = c_val
                img_bytes[idx + 1] = c_val + 2
                img_bytes[idx + 2] = c_val + 4
                # Bump: recessed groove
                b_val = int(20 + 80 * groove_factor)
                bump_bytes[idx] = b_val
                bump_bytes[idx + 1] = b_val
                bump_bytes[idx + 2] = b_val

        # 2. Pentagons (Obsidian Black Leather with Emerald / Gold trim)
        elif best_type == 'pent':
            edge_dist = diff - 0.034
            is_center = (best_id == 0)

            # Gold trim on the edge of pentagons
            if edge_dist < 0.024:
                # Elegant Emerald/Gold accent seam
                img_bytes[idx] = 16
                img_bytes[idx + 1] = 185
                img_bytes[idx + 2] = 129
                # Bump: slightly raised seam
                bump_bytes[idx] = 190
                bump_bytes[idx + 1] = 190
                bump_bytes[idx + 2] = 190
            elif is_center and best_dot > 0.982:
                # Center gold emblem on main face
                img_bytes[idx] = 245
                img_bytes[idx + 1] = 190
                img_bytes[idx + 2] = 40
                bump_bytes[idx] = 240
                bump_bytes[idx + 1] = 240
                bump_bytes[idx + 2] = 240
            else:
                # Deep graphite/obsidian leather with realistic leather grain
                grain = int((((x * 17) ^ (y * 29)) % 8) - 4)
                base_dark = int(22 + 25 * best_dot)
                val = max(15, min(65, base_dark + grain))
                img_bytes[idx] = val
                img_bytes[idx + 1] = val + 2
                img_bytes[idx + 2] = val + 5

                # Bump: leather texture
                bump_val = int(140 + grain * 4)
                bump_bytes[idx] = bump_val
                bump_bytes[idx + 1] = bump_val
                bump_bytes[idx + 2] = bump_val

        # 3. Hexagons (Crisp Pearl White Match Leather with subtle aerodynamic lines)
        else:
            edge_dist = diff - 0.034
            grain = int((((x * 19) ^ (y * 31)) % 8) - 4)
            base_white = int(238 + 16 * best_dot)
            w_val = max(220, min(255, base_white + grain))

            # Aerodynamic subtle graphic accent
            dist_from_c = math.sqrt(max(0.0, 1.0 - best_dot**2))
            
            # Subtle emerald/slate geometric accent along hexagon contours
            if 0.24 < dist_from_c < 0.36 and (0.015 < edge_dist < 0.055):
                angle = math.atan2(py - hex_centers[best_id][1], px - hex_centers[best_id][0])
                wave = math.sin(angle * 3.0 + best_id * 1.5)
                if wave > 0.3:
                    # Deep Emerald green accent line
                    img_bytes[idx] = 5
                    img_bytes[idx + 1] = 150
                    img_bytes[idx + 2] = 105
                elif wave < -0.3:
                    # Slate navy line
                    img_bytes[idx] = 30
                    img_bytes[idx + 1] = 41
                    img_bytes[idx + 2] = 59
                else:
                    # Gold metallic point
                    img_bytes[idx] = 217
                    img_bytes[idx + 1] = 160
                    img_bytes[idx + 2] = 25
            else:
                img_bytes[idx] = w_val
                img_bytes[idx + 1] = w_val
                img_bytes[idx + 2] = min(255, w_val + 2)

            # Bump map for white leather
            bump_val = int(160 + grain * 3)
            bump_bytes[idx] = bump_val
            bump_bytes[idx + 1] = bump_val
            bump_bytes[idx + 2] = bump_val

print(f"Pixel computation completed in {time.time() - t0:.2f}s. Writing textures...")

# Write PPM then convert to PNG
ppm_path = "public/official_ball.ppm"
png_path = "public/official-soccer-ball.png"

with open(ppm_path, 'wb') as f:
    f.write(f"P6\n{WIDTH} {HEIGHT}\n255\n".encode())
    f.write(img_bytes)

ppm_bump_path = "public/official_ball_bump.ppm"
png_bump_path = "public/official-soccer-ball-bump.png"

with open(ppm_bump_path, 'wb') as f:
    f.write(f"P6\n{WIDTH} {HEIGHT}\n255\n".encode())
    f.write(bump_bytes)

subprocess.run(['convert', ppm_path, png_path], check=True)
subprocess.run(['convert', ppm_bump_path, png_bump_path], check=True)

os.remove(ppm_path)
os.remove(ppm_bump_path)

print("Official match ball textures generated successfully in public/!")
