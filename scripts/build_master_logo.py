import math
import subprocess
import os

def build_svg(transparent=False):
    # Dimensions: 1000 x 1000
    cx, cy = 500, 480
    r_outer = 472
    r_gold = 456
    r_inner_black = 432
    r_green = 420

    # Arched text setup for Titan One / Retro Display
    # CAPITAL: 7 letters
    cap_chars = ['C', 'A', 'P', 'I', 'T', 'A', 'L']
    cap_angles = [-30, -20.5, -10.5, 0, 10.5, 20.5, 30]
    cap_r = 615
    cap_cx, cap_cy = 500, 1375

    cap_svg = ""
    for char, ang in zip(cap_chars, cap_angles):
        rad = math.radians(ang)
        x = cap_cx + cap_r * math.sin(rad)
        y = cap_cy - cap_r * math.cos(rad)
        # Font size adjustment for I
        fsize = 126 if char != 'I' else 122
        cap_svg += f'''
        <g transform="translate({x:.2f}, {y:.2f}) rotate({ang})">
          <!-- 3D Gold Extrusion -->
          <text x="0" y="16" text-anchor="middle" font-family="'Titan One', 'Arial Black', sans-serif" font-weight="900" font-size="{fsize}" fill="#f2aa24" stroke="#f2aa24" stroke-width="26" stroke-linejoin="round">{char}</text>
          <!-- Black Outline -->
          <text x="0" y="0" text-anchor="middle" font-family="'Titan One', 'Arial Black', sans-serif" font-weight="900" font-size="{fsize}" fill="#121415" stroke="#121415" stroke-width="18" stroke-linejoin="round">{char}</text>
          <!-- Cream Face -->
          <text x="0" y="0" text-anchor="middle" font-family="'Titan One', 'Arial Black', sans-serif" font-weight="900" font-size="{fsize}" fill="#fff7dc">{char}</text>
        </g>'''

    # EN JUEGO: letters + dashes
    # Left dash, E, N, space, J, U, E, G, O, Right dash
    ej_items = [
        ('-', -26.5, True),
        ('E', -19, False),
        ('N', -12, False),
        ('J', -3, False),
        ('U', 4.5, False),
        ('E', 12, False),
        ('G', 19.5, False),
        ('O', 27, False),
        ('-', 34, True),
    ]
    ej_r = 502
    ej_svg = ""
    for char, ang, is_dash in ej_items:
        rad = math.radians(ang)
        x = cap_cx + ej_r * math.sin(rad)
        y = cap_cy - ej_r * math.cos(rad)
        if is_dash:
            ej_svg += f'''
            <g transform="translate({x:.2f}, {y:.2f}) rotate({ang})">
              <rect x="-18" y="-4" width="36" height="14" rx="7" fill="#f2aa24" stroke="#121415" stroke-width="6"/>
            </g>'''
        else:
            ej_svg += f'''
            <g transform="translate({x:.2f}, {y:.2f}) rotate({ang})">
              <!-- 3D Gold Extrusion -->
              <text x="0" y="12" text-anchor="middle" font-family="'Titan One', 'Arial Black', sans-serif" font-weight="900" font-size="86" fill="#f2aa24" stroke="#f2aa24" stroke-width="20" stroke-linejoin="round">{char}</text>
              <!-- Black Outline -->
              <text x="0" y="0" text-anchor="middle" font-family="'Titan One', 'Arial Black', sans-serif" font-weight="900" font-size="86" fill="#121415" stroke="#121415" stroke-width="14" stroke-linejoin="round">{char}</text>
              <!-- Cream Face -->
              <text x="0" y="0" text-anchor="middle" font-family="'Titan One', 'Arial Black', sans-serif" font-weight="900" font-size="86" fill="#fff7dc">{char}</text>
            </g>'''

    bg_rect = "" if transparent else '<rect width="1000" height="1000" fill="#f7efe1" />'

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="1000" height="1000">
  <defs>
    <filter id="badgeShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#000000" flood-opacity="0.3"/>
    </filter>
  </defs>

  {bg_rect}

  <!-- CIRCULAR EMBLEM RINGS -->
  <!-- Outer black ring -->
  <circle cx="{cx}" cy="{cy}" r="{r_outer}" fill="#121415" />
  <!-- Gold circular ring -->
  <circle cx="{cx}" cy="{cy}" r="{r_gold}" fill="#f4b328" />
  <!-- Inner black ring -->
  <circle cx="{cx}" cy="{cy}" r="{r_inner_black}" fill="#121415" />
  <!-- Dark pine forest green field -->
  <circle cx="{cx}" cy="{cy}" r="{r_green}" fill="#255b50" />

  <!-- ACTION SPEED BURST LINES -->
  <g stroke="#121415" stroke-linecap="round" fill="none">
    <!-- radiating burst rays behind briefcase -->
    <path d="M 500 295 L 500 215" stroke-width="13"/>
    <path d="M 465 305 L 420 230" stroke-width="11"/>
    <path d="M 430 328 L 360 262" stroke-width="10"/>
    <path d="M 405 365 L 320 318" stroke-width="9"/>

    <path d="M 535 305 L 580 230" stroke-width="11"/>
    <path d="M 570 328 L 640 262" stroke-width="10"/>
    <path d="M 595 365 L 680 318" stroke-width="9"/>

    <!-- Left character speed arcs -->
    <path d="M 370 142 Q 395 118 418 128" stroke-width="7"/>
    <path d="M 356 168 Q 378 148 396 156" stroke-width="6"/>
    <path d="M 112 315 Q 92 346 102 382" stroke-width="9"/>
    <path d="M 92 330 Q 70 362 82 398" stroke-width="7"/>

    <!-- Right character speed arcs -->
    <path d="M 630 142 Q 605 118 582 128" stroke-width="7"/>
    <path d="M 644 168 Q 622 148 604 156" stroke-width="6"/>
    <path d="M 888 315 Q 908 346 898 382" stroke-width="9"/>
    <path d="M 908 330 Q 930 362 918 398" stroke-width="7"/>
  </g>

  <!-- LEFT CHARACTER (SOCCER HEAD, RED TIE) -->
  <g id="left-character">
    <!-- Back Leg & Big Black Shoe -->
    <g>
      <path d="M 235 470 Q 185 505 140 530" fill="none" stroke="#121415" stroke-width="28" stroke-linecap="round"/>
      <ellipse cx="138" cy="537" rx="17" ry="12" fill="#fffdf7" stroke="#121415" stroke-width="6" transform="rotate(-25 138 537)"/>
      <path d="M 142 533 C 170 540 192 567 178 601 C 158 633 80 627 64 601 C 48 569 80 533 132 533 Z" fill="#121415" stroke="#121415" stroke-width="5"/>
      <path d="M 88 590 Q 124 611 156 581" fill="none" stroke="#fffdf7" stroke-width="8" stroke-linecap="round" opacity="0.95"/>
    </g>

    <!-- Front Leg & Big Black Shoe (Bracing) -->
    <g>
      <path d="M 285 460 Q 300 510 280 557" fill="none" stroke="#121415" stroke-width="28" stroke-linecap="round"/>
      <ellipse cx="280" cy="557" rx="19" ry="13" fill="#fffdf7" stroke="#121415" stroke-width="6"/>
      <path d="M 285 553 C 318 559 360 580 344 621 C 318 647 230 642 208 611 C 192 585 224 553 270 553 Z" fill="#121415" stroke="#121415" stroke-width="5"/>
      <path d="M 244 613 Q 285 631 322 601" fill="none" stroke="#fffdf7" stroke-width="8.5" stroke-linecap="round" opacity="0.95"/>
    </g>

    <!-- Black Suit Jacket -->
    <path d="M 180 310 C 275 300 328 350 302 440 C 276 473 200 473 152 427 C 116 370 140 315 180 310 Z" fill="#15171a" stroke="#121415" stroke-width="8"/>
    <path d="M 138 400 Q 112 431 96 425 Q 112 400 132 380 Z" fill="#15171a" stroke="#121415" stroke-width="6"/>

    <!-- White Shirt Collar -->
    <polygon points="228,325 258,391 206,387" fill="#fffdf7" stroke="#121415" stroke-width="5.5"/>
    
    <!-- Red Necktie -->
    <polygon points="226,349 240,349 248,427 234,447 220,427" fill="#d8232a" stroke="#121415" stroke-width="5.5" stroke-linejoin="round"/>
    <circle cx="233" cy="354" r="6.5" fill="#ba1c22" stroke="#121415" stroke-width="3.5"/>

    <!-- Black Arms stretching toward briefcase -->
    <path d="M 195 355 Q 260 320 338 335" fill="none" stroke="#121415" stroke-width="26" stroke-linecap="round"/>
    <path d="M 225 395 Q 295 410 332 370" fill="none" stroke="#121415" stroke-width="26" stroke-linecap="round"/>

    <!-- White 4-Fingered Glove Gripping Handle -->
    <g transform="translate(332, 335)">
      <ellipse cx="5" cy="18" rx="15" ry="10" fill="#fffdf7" stroke="#121415" stroke-width="5.5" transform="rotate(-25 5 18)"/>
      <path d="M 2 -6 C 22 -22 52 -2 46 24 C 40 38 18 44 -4 28 C -20 14 -14 -2 2 -6 Z" fill="#fffdf7" stroke="#121415" stroke-width="6.5"/>
      <path d="M 16 -8 C 28 -2 26 16 14 28" fill="none" stroke="#121415" stroke-width="5"/>
      <path d="M 30 -1 C 38 8 36 24 24 32" fill="none" stroke="#121415" stroke-width="5"/>
    </g>

    <!-- Head: Soccer Ball Mascot -->
    <g transform="translate(225, 205)">
      <circle cx="0" cy="0" r="118" fill="#fffdf7" stroke="#121415" stroke-width="10"/>

      <polygon points="-15,-112 32,-107 58,-76 26,-54 -26,-76" fill="#15171a" stroke="#121415" stroke-width="5.5"/>
      <line x1="-15" y1="-112" x2="-46" y2="-117" stroke="#121415" stroke-width="5.5"/>
      <line x1="32" y1="-107" x2="68" y2="-117" stroke="#121415" stroke-width="5.5"/>
      <line x1="58" y1="-76" x2="108" y2="-66" stroke="#121415" stroke-width="5.5"/>
      <line x1="-26" y1="-76" x2="-78" y2="-66" stroke="#121415" stroke-width="5.5"/>

      <polygon points="-82,-45 -46,-35 -52,16 -92,32 -118,-10" fill="#15171a" stroke="#121415" stroke-width="5.5"/>
      <line x1="-46" y1="-35" x2="-26" y2="-76" stroke="#121415" stroke-width="5.5"/>
      <line x1="-52" y1="16" x2="-42" y2="72" stroke="#121415" stroke-width="5.5"/>

      <polygon points="52,-20 88,-36 118,-6 108,42 66,32" fill="#15171a" stroke="#121415" stroke-width="5.5"/>
      <line x1="52" y1="-20" x2="26" y2="-54" stroke="#121415" stroke-width="5.5"/>
      <line x1="66" y1="32" x2="46" y2="88" stroke="#121415" stroke-width="5.5"/>

      <!-- Angry eyebrow -->
      <path d="M -48 -36 Q -12 -6 14 -26" fill="none" stroke="#121415" stroke-width="12" stroke-linecap="round"/>
      <path d="M 12 -26 Q 42 2 72 -16" fill="none" stroke="#121415" stroke-width="12" stroke-linecap="round"/>

      <!-- Pie-cut eyes -->
      <g transform="translate(-10, 6) rotate(6)">
        <ellipse cx="0" cy="0" rx="20" ry="28" fill="#fffdf7" stroke="#121415" stroke-width="6"/>
        <ellipse cx="4" cy="2" rx="12" ry="18" fill="#121415"/>
        <polygon points="4,2 17,-5 17,9" fill="#fffdf7"/>
      </g>

      <g transform="translate(44, 13) rotate(10)">
        <ellipse cx="0" cy="0" rx="19" ry="27" fill="#fffdf7" stroke="#121415" stroke-width="6"/>
        <ellipse cx="3" cy="2" rx="11" ry="17" fill="#121415"/>
        <polygon points="3,2 15,-5 15,9" fill="#fffdf7"/>
      </g>

      <!-- Clenched teeth grimace -->
      <g transform="translate(10, 68) rotate(6)">
        <path d="M -38 0 C -18 26 24 26 44 -6 C 24 -15 -18 -15 -38 0 Z" fill="#fffdf7" stroke="#121415" stroke-width="7" stroke-linejoin="round"/>
        <path d="M -35 0 Q 3 10 41 -6" fill="none" stroke="#121415" stroke-width="5"/>
        <line x1="-20" y1="-7" x2="-18" y2="9" stroke="#121415" stroke-width="5"/>
        <line x1="-4" y1="-8" x2="-3" y2="13" stroke="#121415" stroke-width="5"/>
        <line x1="12" y1="-9" x2="13" y2="11" stroke="#121415" stroke-width="5"/>
        <line x1="28" y1="-10" x2="28" y2="7" stroke="#121415" stroke-width="5"/>
      </g>
    </g>
  </g>

  <!-- RIGHT CHARACTER (SOCCER HEAD, BLUE TIE) -->
  <g id="right-character">
    <!-- Back Leg & Big Black Shoe -->
    <g>
      <path d="M 765 470 Q 815 505 860 530" fill="none" stroke="#121415" stroke-width="28" stroke-linecap="round"/>
      <ellipse cx="862" cy="537" rx="17" ry="12" fill="#fffdf7" stroke="#121415" stroke-width="6" transform="rotate(25 862 537)"/>
      <path d="M 858 533 C 830 540 808 567 822 601 C 842 633 920 627 936 601 C 952 569 920 533 868 533 Z" fill="#121415" stroke="#121415" stroke-width="5"/>
      <path d="M 912 590 Q 876 611 844 581" fill="none" stroke="#fffdf7" stroke-width="8" stroke-linecap="round" opacity="0.95"/>
    </g>

    <!-- Front Leg & Big Black Shoe (Bracing) -->
    <g>
      <path d="M 715 460 Q 700 510 720 557" fill="none" stroke="#121415" stroke-width="28" stroke-linecap="round"/>
      <ellipse cx="720" cy="557" rx="19" ry="13" fill="#fffdf7" stroke="#121415" stroke-width="6"/>
      <path d="M 715 553 C 682 553 640 580 656 621 C 682 647 770 642 792 611 C 808 585 776 553 730 553 Z" fill="#121415" stroke="#121415" stroke-width="5"/>
      <path d="M 756 613 Q 715 631 678 601" fill="none" stroke="#fffdf7" stroke-width="8.5" stroke-linecap="round" opacity="0.95"/>
    </g>

    <!-- Black Suit Jacket -->
    <path d="M 820 310 C 725 300 672 350 698 440 C 724 473 800 473 848 427 C 884 370 860 315 820 310 Z" fill="#15171a" stroke="#121415" stroke-width="8"/>
    <path d="M 862 400 Q 888 431 904 425 Q 888 400 868 380 Z" fill="#15171a" stroke="#121415" stroke-width="6"/>

    <!-- White Shirt Collar -->
    <polygon points="772,325 742,391 794,387" fill="#fffdf7" stroke="#121415" stroke-width="5.5"/>
    
    <!-- Royal Blue Necktie -->
    <polygon points="774,349 760,349 752,427 766,447 780,427" fill="#1870c5" stroke="#121415" stroke-width="5.5" stroke-linejoin="round"/>
    <circle cx="767" cy="354" r="6.5" fill="#145da4" stroke="#121415" stroke-width="3.5"/>

    <!-- Black Arms stretching toward briefcase -->
    <path d="M 805 355 Q 740 320 662 335" fill="none" stroke="#121415" stroke-width="26" stroke-linecap="round"/>
    <path d="M 775 395 Q 705 410 668 370" fill="none" stroke="#121415" stroke-width="26" stroke-linecap="round"/>

    <!-- White Glove Gripping Rim -->
    <g transform="translate(668, 335)">
      <ellipse cx="-5" cy="18" rx="15" ry="10" fill="#fffdf7" stroke="#121415" stroke-width="5.5" transform="rotate(25 -5 18)"/>
      <path d="M -2 -6 C -22 -22 -52 -2 -46 24 C -40 38 -18 44 4 28 C 20 14 14 -2 -2 -6 Z" fill="#fffdf7" stroke="#121415" stroke-width="6.5"/>
      <path d="M -16 -8 C -28 -2 -26 16 -14 28" fill="none" stroke="#121415" stroke-width="5"/>
      <path d="M -30 -1 C -38 8 -36 24 -24 32" fill="none" stroke="#121415" stroke-width="5"/>
    </g>

    <!-- Head: Soccer Ball Mascot -->
    <g transform="translate(775, 230)">
      <circle cx="0" cy="0" r="118" fill="#fffdf7" stroke="#121415" stroke-width="10"/>

      <polygon points="15,-112 -32,-107 -58,-76 -26,-54 26,-76" fill="#15171a" stroke="#121415" stroke-width="5.5"/>
      <line x1="15" y1="-112" x2="46" y2="-117" stroke="#121415" stroke-width="5.5"/>
      <line x1="-32" y1="-107" x2="-68" y2="-117" stroke="#121415" stroke-width="5.5"/>
      <line x1="-58" y1="-76" x2="-108" y2="-66" stroke="#121415" stroke-width="5.5"/>
      <line x1="26" y1="-76" x2="78" y2="-66" stroke="#121415" stroke-width="5.5"/>

      <polygon points="82,-45 46,-35 52,16 92,32 118,-10" fill="#15171a" stroke="#121415" stroke-width="5.5"/>
      <line x1="46" y1="-35" x2="26" y2="-76" stroke="#121415" stroke-width="5.5"/>
      <line x1="52" y1="16" x2="42" y2="72" stroke="#121415" stroke-width="5.5"/>

      <polygon points="-52,-20 -88,-36 -118,-6 -108,42 -66,32" fill="#15171a" stroke="#121415" stroke-width="5.5"/>
      <line x1="-52" y1="-20" x2="-26" y2="-54" stroke="#121415" stroke-width="5.5"/>
      <line x1="-66" y1="32" x2="-46" y2="88" stroke="#121415" stroke-width="5.5"/>

      <!-- Angry eyebrow -->
      <path d="M 48 -36 Q 12 -6 -14 -26" fill="none" stroke="#121415" stroke-width="12" stroke-linecap="round"/>
      <path d="M -12 -26 Q -42 2 -72 -16" fill="none" stroke="#121415" stroke-width="12" stroke-linecap="round"/>

      <!-- Pie-cut eyes -->
      <g transform="translate(10, 6) rotate(-6)">
        <ellipse cx="0" cy="0" rx="20" ry="28" fill="#fffdf7" stroke="#121415" stroke-width="6"/>
        <ellipse cx="-4" cy="2" rx="12" ry="18" fill="#121415"/>
        <polygon points="-4,2 -17,-5 -17,9" fill="#fffdf7"/>
      </g>

      <g transform="translate(-44, 13) rotate(-10)">
        <ellipse cx="0" cy="0" rx="19" ry="27" fill="#fffdf7" stroke="#121415" stroke-width="6"/>
        <ellipse cx="-3" cy="2" rx="11" ry="17" fill="#121415"/>
        <polygon points="-3,2 -15,-5 -15,9" fill="#fffdf7"/>
      </g>

      <!-- Clenched teeth grimace -->
      <g transform="translate(-10, 68) rotate(-6)">
        <path d="M 38 0 C 18 26 -24 26 -44 -6 C -24 -15 18 -15 38 0 Z" fill="#fffdf7" stroke="#121415" stroke-width="7" stroke-linejoin="round"/>
        <path d="M 35 0 Q -3 10 -41 -6" fill="none" stroke="#121415" stroke-width="5"/>
        <line x1="20" y1="-7" x2="18" y2="9" stroke="#121415" stroke-width="5"/>
        <line x1="4" y1="-8" x2="3" y2="13" stroke="#121415" stroke-width="5"/>
        <line x1="-12" y1="-9" x2="-13" y2="11" stroke="#121415" stroke-width="5"/>
        <line x1="-28" y1="-10" x2="-28" y2="7" stroke="#121415" stroke-width="5"/>
      </g>
    </g>
  </g>

  <!-- CENTER BRIEFCASE PACKED WITH MONEY -->
  <g id="briefcase-money">
    <!-- Top curved handle and open lid -->
    <path d="M 425 344 L 462 296 L 538 296 L 575 344 Z" fill="#222428" stroke="#121415" stroke-width="9" stroke-linejoin="round"/>
    <path d="M 476 296 C 476 268 524 268 524 296" fill="none" stroke="#121415" stroke-width="14" stroke-linecap="round"/>

    <!-- Briefcase Main Body -->
    <path d="M 362 368 L 638 368 L 602 542 L 398 542 Z" fill="#1d1f23" stroke="#121415" stroke-width="10" stroke-linejoin="round"/>

    <!-- Brass Gold Corners -->
    <polygon points="362,368 388,368 367,395" fill="#f4b328" stroke="#121415" stroke-width="4.5"/>
    <polygon points="638,368 612,368 633,395" fill="#f4b328" stroke="#121415" stroke-width="4.5"/>
    <polygon points="398,542 424,542 402,515" fill="#f4b328" stroke="#121415" stroke-width="4.5"/>
    <polygon points="602,542 576,542 598,515" fill="#f4b328" stroke="#121415" stroke-width="4.5"/>

    <!-- Gold Center Lock Latch -->
    <rect x="478" y="460" width="44" height="34" rx="5" fill="#f4b328" stroke="#121415" stroke-width="5.5"/>
    <circle cx="500" cy="473" r="4.5" fill="#121415"/>
    <line x1="500" y1="473" x2="500" y2="485" stroke="#121415" stroke-width="4"/>

    <!-- Money Stacks inside Briefcase -->
    <g transform="translate(390, 368) rotate(-8)">
      <polygon points="5,22 66,10 76,38 15,50" fill="#4b8b54" stroke="#121415" stroke-width="4"/>
      <polygon points="5,15 66,3 76,31 15,43" fill="#65ab6e" stroke="#121415" stroke-width="4"/>
      <line x1="41" y1="7" x2="49" y2="35" stroke="#fffdf7" stroke-width="10"/>
      <ellipse cx="45" cy="21" rx="10" ry="7" fill="#e2efe3" stroke="#121415" stroke-width="2"/>
    </g>

    <g transform="translate(436, 358) rotate(2)">
      <polygon points="5,24 70,16 80,42 15,50" fill="#46864f" stroke="#121415" stroke-width="4"/>
      <polygon points="5,15 70,7 80,33 15,41" fill="#70b97b" stroke="#121415" stroke-width="4"/>
      <line x1="43" y1="11" x2="48" y2="37" stroke="#fffdf7" stroke-width="10"/>
      <ellipse cx="46" cy="24" rx="10" ry="7" fill="#e2efe3" stroke="#121415" stroke-width="2"/>
    </g>

    <g transform="translate(488, 355) rotate(-3)">
      <polygon points="5,24 70,16 80,42 15,50" fill="#46864f" stroke="#121415" stroke-width="4"/>
      <polygon points="5,15 70,7 80,33 15,41" fill="#6bb576" stroke="#121415" stroke-width="4"/>
      <line x1="43" y1="11" x2="48" y2="37" stroke="#fffdf7" stroke-width="10"/>
      <ellipse cx="46" cy="24" rx="10" ry="7" fill="#e2efe3" stroke="#121415" stroke-width="2"/>
    </g>

    <g transform="translate(542, 368) rotate(9)">
      <polygon points="5,22 66,10 76,38 15,50" fill="#4b8b54" stroke="#121415" stroke-width="4"/>
      <polygon points="5,15 66,3 76,31 15,43" fill="#65ab6e" stroke="#121415" stroke-width="4"/>
      <line x1="41" y1="7" x2="49" y2="35" stroke="#fffdf7" stroke-width="10"/>
      <ellipse cx="45" cy="21" rx="10" ry="7" fill="#e2efe3" stroke="#121415" stroke-width="2"/>
    </g>

    <!-- Falling Dollar Banknotes with $ symbol -->
    <g transform="translate(365, 505) rotate(22)">
      <rect x="0" y="0" width="76" height="42" rx="4" fill="#70b97b" stroke="#121415" stroke-width="5"/>
      <rect x="5" y="4" width="66" height="34" rx="3" fill="none" stroke="#121415" stroke-width="2"/>
      <ellipse cx="38" cy="21" rx="15" ry="11" fill="#e2efe3" stroke="#121415" stroke-width="3"/>
      <text x="38" y="27" font-family="'Titan One', 'Arial Black', sans-serif" font-size="18" fill="#121415" text-anchor="middle" font-weight="bold">$</text>
    </g>

    <g transform="translate(470, 555) rotate(-14)">
      <rect x="0" y="0" width="82" height="44" rx="4" fill="#75bc7f" stroke="#121415" stroke-width="5"/>
      <rect x="5" y="4" width="72" height="36" rx="3" fill="none" stroke="#121415" stroke-width="2"/>
      <ellipse cx="41" cy="22" rx="16" ry="12" fill="#e2efe3" stroke="#121415" stroke-width="3"/>
      <text x="41" y="28" font-family="'Titan One', 'Arial Black', sans-serif" font-size="19" fill="#121415" text-anchor="middle" font-weight="bold">$</text>
    </g>

    <g transform="translate(400, 590) rotate(16)">
      <rect x="0" y="0" width="70" height="38" rx="4" fill="#65ab6e" stroke="#121415" stroke-width="5"/>
      <rect x="5" y="4" width="60" height="30" rx="3" fill="none" stroke="#121415" stroke-width="2"/>
      <ellipse cx="35" cy="19" rx="14" ry="10" fill="#e2efe3" stroke="#121415" stroke-width="3"/>
      <text x="35" y="25" font-family="'Titan One', 'Arial Black', sans-serif" font-size="16" fill="#121415" text-anchor="middle" font-weight="bold">$</text>
    </g>

    <g transform="translate(565, 485) rotate(-32)">
      <rect x="0" y="0" width="72" height="38" rx="4" fill="#6bb576" stroke="#121415" stroke-width="5"/>
      <rect x="5" y="4" width="62" height="30" rx="3" fill="none" stroke="#121415" stroke-width="2"/>
      <ellipse cx="36" cy="19" rx="14" ry="10" fill="#e2efe3" stroke="#121415" stroke-width="3"/>
      <text x="36" y="25" font-family="'Titan One', 'Arial Black', sans-serif" font-size="16" fill="#121415" text-anchor="middle" font-weight="bold">$</text>
    </g>
  </g>

  <!-- BOTTOM BLACK PLAQUE WITH 3D RETRO TEXT -->
  <path d="M 75 740 C 125 925 300 975 500 975 C 700 975 875 925 925 740 C 795 670 500 630 75 740 Z" fill="#121415" />

  <!-- Bottom curved gold accent line / smile -->
  <path d="M 330 945 C 435 968 565 968 670 945 C 630 969 550 980 500 980 C 450 980 370 969 330 945 Z" fill="#f4b328" stroke="#121415" stroke-width="3"/>

  <!-- VINTAGE RETRO BUBBLE LETTERS -->
  <g id="typography-capital" filter="url(#badgeShadow)">
    {cap_svg}
  </g>

  <g id="typography-en-juego" filter="url(#badgeShadow)">
    {ej_svg}
  </g>
</svg>'''
    return svg

# Generate full logo with vintage cream background
with open('public/logo.svg', 'w') as f:
    f.write(build_svg(transparent=False))

subprocess.run(['rsvg-convert', '-w', '1024', '-h', '1024', 'public/logo.svg', '-o', 'public/logo.png'], check=True)
subprocess.run(['rsvg-convert', '-w', '1024', '-h', '1024', 'public/logo.svg', '-o', 'public/image.png'], check=True)

# Generate transparent version
with open('public/logo-transparent.svg', 'w') as f:
    f.write(build_svg(transparent=True))

subprocess.run(['rsvg-convert', '-w', '1024', '-h', '1024', 'public/logo-transparent.svg', '-o', 'public/logo-transparent.png'], check=True)

# Copy to dist if dist exists
if os.path.exists('dist'):
    for fname in ['logo.png', 'logo.svg', 'logo-transparent.png', 'logo-transparent.svg', 'image.png']:
        src = os.path.join('public', fname)
        dst = os.path.join('dist', fname)
        if os.path.exists(src):
            with open(src, 'rb') as sf, open(dst, 'wb') as df:
                df.write(sf.read())

print("Built master logos successfully!")
