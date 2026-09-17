import subprocess
import os

# Create the exact SVG matching the user's uploaded image
svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="1000" height="1000">
  <defs>
    <filter id="textDropShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="4" flood-color="#000000" flood-opacity="0.3"/>
    </filter>
  </defs>

  <!-- SQUARE VINTAGE CREAM BACKGROUND -->
  <rect width="1000" height="1000" fill="#f5f0e6" />

  <!-- MAIN CIRCULAR EMBLEM -->
  <!-- Outer black circle boundary -->
  <circle cx="500" cy="490" r="470" fill="#121415" />
  
  <!-- Golden Yellow Ring -->
  <circle cx="500" cy="490" r="456" fill="#edb037" />

  <!-- Inner black ring -->
  <circle cx="500" cy="490" r="434" fill="#121415" />

  <!-- Deep Forest Teal Green Disc Background -->
  <circle cx="500" cy="490" r="422" fill="#24584e" />

  <!-- ============================================== -->
  <!-- ACTION SPEED & TENSION LINES -->
  <!-- ============================================== -->
  <!-- Background Action Burst Lines radiating behind the briefcase -->
  <g stroke="#121415" stroke-linecap="round" fill="none">
    <!-- Straight up -->
    <path d="M 500 305 L 500 240" stroke-width="10"/>
    <!-- Left bursts -->
    <path d="M 465 315 L 435 255" stroke-width="9"/>
    <path d="M 435 340 L 385 285" stroke-width="8.5"/>
    <path d="M 410 380 L 345 340" stroke-width="8"/>
    <!-- Right bursts -->
    <path d="M 535 315 L 565 255" stroke-width="9"/>
    <path d="M 565 340 L 615 285" stroke-width="8.5"/>
    <path d="M 590 380 L 655 340" stroke-width="8"/>

    <!-- Left character head action swooshes -->
    <path d="M 370 145 Q 395 120 415 130" stroke-width="6"/>
    <path d="M 360 170 Q 380 150 395 158" stroke-width="5"/>
    <!-- Left character body motion arcs -->
    <path d="M 115 320 Q 95 350 105 385" stroke-width="8"/>
    <path d="M 95 335 Q 75 365 85 400" stroke-width="6"/>

    <!-- Right character head action swooshes -->
    <path d="M 630 145 Q 605 120 585 130" stroke-width="6"/>
    <path d="M 640 170 Q 620 150 605 158" stroke-width="5"/>
    <!-- Right character body motion arcs -->
    <path d="M 885 320 Q 905 350 895 385" stroke-width="8"/>
    <path d="M 905 335 Q 925 365 915 400" stroke-width="6"/>
  </g>

  <!-- ============================================== -->
  <!-- LEFT CHARACTER (SOCCER HEAD, RED TIE) -->
  <!-- ============================================== -->
  <g id="left-character">
    <!-- Back Leg & Shoe -->
    <g>
      <!-- Leg limb -->
      <path d="M 235 480 Q 185 515 145 540" fill="none" stroke="#121415" stroke-width="26" stroke-linecap="round"/>
      <!-- White spat / ankle cuff -->
      <ellipse cx="140" cy="545" rx="16" ry="11" fill="#fdfbf5" stroke="#121415" stroke-width="6" transform="rotate(-25 140 545)"/>
      <!-- Big Black cartoon shoe -->
      <path d="M 145 540 C 170 545 190 570 175 605 C 155 635 80 630 65 605 C 50 575 80 540 130 540 Z" fill="#121415" stroke="#121415" stroke-width="5"/>
      <!-- White specular glare on shoe -->
      <path d="M 90 595 Q 125 615 155 585" fill="none" stroke="#fdfbf5" stroke-width="7" stroke-linecap="round" opacity="0.9"/>
    </g>

    <!-- Front Leg & Shoe (Planted forward) -->
    <g>
      <path d="M 285 470 Q 300 520 280 565" fill="none" stroke="#121415" stroke-width="26" stroke-linecap="round"/>
      <ellipse cx="280" cy="565" rx="18" ry="12" fill="#fdfbf5" stroke="#121415" stroke-width="6"/>
      <path d="M 285 560 C 315 565 355 585 340 625 C 315 650 230 645 210 615 C 195 590 225 560 270 560 Z" fill="#121415" stroke="#121415" stroke-width="5"/>
      <path d="M 245 618 Q 285 635 320 605" fill="none" stroke="#fdfbf5" stroke-width="8" stroke-linecap="round" opacity="0.9"/>
    </g>

    <!-- Suit Body / Jacket -->
    <path d="M 185 320 C 275 310 325 360 300 450 C 275 480 200 480 155 435 C 120 380 145 325 185 320 Z" fill="#151719" stroke="#121415" stroke-width="8"/>
    <!-- Tailcoat flair on back -->
    <path d="M 140 410 Q 115 440 100 435 Q 115 410 135 390 Z" fill="#151719" stroke="#121415" stroke-width="6"/>

    <!-- White Shirt Collar -->
    <polygon points="230,335 258,400 208,395" fill="#fdfbf5" stroke="#121415" stroke-width="5"/>
    
    <!-- Red Necktie -->
    <polygon points="228,358 240,358 248,435 234,455 220,435" fill="#d32424" stroke="#121415" stroke-width="5" stroke-linejoin="round"/>
    <circle cx="234" cy="363" r="6" fill="#b71c1c" stroke="#121415" stroke-width="3"/>

    <!-- Left Arm & White Cartoon Glove Pulling Briefcase -->
    <path d="M 195 365 Q 260 330 335 345" fill="none" stroke="#121415" stroke-width="24" stroke-linecap="round"/>
    <path d="M 225 405 Q 295 420 330 380" fill="none" stroke="#121415" stroke-width="24" stroke-linecap="round"/>

    <!-- Left White Glove Gripping Top Left / Handle -->
    <g transform="translate(330, 345)">
      <ellipse cx="5" cy="18" rx="14" ry="9" fill="#fdfbf5" stroke="#121415" stroke-width="5" transform="rotate(-25 5 18)"/>
      <path d="M 2 -5 C 20 -20 48 -2 44 22 C 38 36 18 42 -2 26 C -18 14 -12 -2 2 -5 Z" fill="#fdfbf5" stroke="#121415" stroke-width="6"/>
      <path d="M 16 -7 C 26 -1 24 16 14 26" fill="none" stroke="#121415" stroke-width="4.5"/>
      <path d="M 28 -1 C 36 7 34 22 24 30" fill="none" stroke="#121415" stroke-width="4.5"/>
    </g>

    <!-- Head: Soccer Ball Mascot -->
    <g transform="translate(230, 215)">
      <!-- Ball base sphere -->
      <circle cx="0" cy="0" r="115" fill="#fdfbf5" stroke="#121415" stroke-width="10"/>

      <!-- Classic Black Soccer Pentagons & Seams -->
      <!-- Top patch -->
      <polygon points="-15,-110 30,-105 55,-75 25,-55 -25,-75" fill="#151719" stroke="#121415" stroke-width="5"/>
      <line x1="-15" y1="-110" x2="-45" y2="-115" stroke="#121415" stroke-width="5"/>
      <line x1="30" y1="-105" x2="65" y2="-115" stroke="#121415" stroke-width="5"/>
      <line x1="55" y1="-75" x2="105" y2="-65" stroke="#121415" stroke-width="5"/>
      <line x1="-25" y1="-75" x2="-75" y2="-65" stroke="#121415" stroke-width="5"/>

      <!-- Left patch -->
      <polygon points="-80,-45 -45,-35 -50,15 -90,30 -115, -10" fill="#151719" stroke="#121415" stroke-width="5"/>
      <line x1="-45" y1="-35" x2="-25" y2="-75" stroke="#121415" stroke-width="5"/>
      <line x1="-50" y1="15" x2="-40" y2="70" stroke="#121415" stroke-width="5"/>

      <!-- Right patch behind brow -->
      <polygon points="50,-20 85,-35 115,-5 105,40 65,30" fill="#151719" stroke="#121415" stroke-width="5"/>
      <line x1="50" y1="-20" x2="25" y2="-55" stroke="#121415" stroke-width="5"/>
      <line x1="65" y1="30" x2="45" y2="85" stroke="#121415" stroke-width="5"/>

      <!-- Angry Eyebrows -->
      <path d="M -45 -35 Q -10 -5 15 -25" fill="none" stroke="#121415" stroke-width="11" stroke-linecap="round"/>
      <path d="M 12 -25 Q 40 2 70 -15" fill="none" stroke="#121415" stroke-width="11" stroke-linecap="round"/>

      <!-- Left Pie-Cut Eye -->
      <g transform="translate(-10, 5) rotate(6)">
        <ellipse cx="0" cy="0" rx="19" ry="26" fill="#fdfbf5" stroke="#121415" stroke-width="5.5"/>
        <ellipse cx="4" cy="2" rx="11" ry="17" fill="#121415"/>
        <!-- 1930s Pacman notch highlight -->
        <polygon points="4,2 16,-4 16,8" fill="#fdfbf5"/>
      </g>

      <!-- Right Pie-Cut Eye -->
      <g transform="translate(42, 12) rotate(10)">
        <ellipse cx="0" cy="0" rx="18" ry="25" fill="#fdfbf5" stroke="#121415" stroke-width="5.5"/>
        <ellipse cx="3" cy="2" rx="10" ry="16" fill="#121415"/>
        <polygon points="3,2 14,-4 14,8" fill="#fdfbf5"/>
      </g>

      <!-- Clenched Gritted Teeth Mouth -->
      <g transform="translate(10, 65) rotate(6)">
        <path d="M -36 0 C -18 24 22 24 42 -5 C 22 -14 -18 -14 -36 0 Z" fill="#fdfbf5" stroke="#121415" stroke-width="6.5" stroke-linejoin="round"/>
        <path d="M -33 0 Q 3 9 39 -5" fill="none" stroke="#121415" stroke-width="4.5"/>
        <!-- Vertical teeth dividers -->
        <line x1="-18" y1="-6" x2="-16" y2="8" stroke="#121415" stroke-width="4.5"/>
        <line x1="-3" y1="-7" x2="-2" y2="12" stroke="#121415" stroke-width="4.5"/>
        <line x1="12" y1="-8" x2="13" y2="10" stroke="#121415" stroke-width="4.5"/>
        <line x1="26" y1="-9" x2="26" y2="6" stroke="#121415" stroke-width="4.5"/>
      </g>
    </g>
  </g>

  <!-- ============================================== -->
  <!-- RIGHT CHARACTER (SOCCER HEAD, BLUE TIE) -->
  <!-- ============================================== -->
  <g id="right-character">
    <!-- Back Leg & Shoe -->
    <g>
      <path d="M 765 480 Q 815 515 855 540" fill="none" stroke="#121415" stroke-width="26" stroke-linecap="round"/>
      <ellipse cx="860" cy="545" rx="16" ry="11" fill="#fdfbf5" stroke="#121415" stroke-width="6" transform="rotate(25 860 545)"/>
      <path d="M 855 540 C 830 545 810 570 825 605 C 845 635 920 630 935 605 C 950 575 920 540 870 540 Z" fill="#121415" stroke="#121415" stroke-width="5"/>
      <path d="M 910 595 Q 875 615 845 585" fill="none" stroke="#fdfbf5" stroke-width="7" stroke-linecap="round" opacity="0.9"/>
    </g>

    <!-- Front Leg & Shoe -->
    <g>
      <path d="M 715 470 Q 700 520 720 565" fill="none" stroke="#121415" stroke-width="26" stroke-linecap="round"/>
      <ellipse cx="720" cy="565" rx="18" ry="12" fill="#fdfbf5" stroke="#121415" stroke-width="6"/>
      <path d="M 715 560 C 685 560 645 585 660 625 C 685 650 770 645 790 615 C 805 590 775 560 730 560 Z" fill="#121415" stroke="#121415" stroke-width="5"/>
      <path d="M 755 618 Q 715 635 680 605" fill="none" stroke="#fdfbf5" stroke-width="8" stroke-linecap="round" opacity="0.9"/>
    </g>

    <!-- Suit Body / Jacket -->
    <path d="M 815 320 C 725 310 675 360 700 450 C 725 480 800 480 845 435 C 880 380 855 325 815 320 Z" fill="#151719" stroke="#121415" stroke-width="8"/>
    <!-- Tailcoat flair -->
    <path d="M 860 410 Q 885 440 900 435 Q 885 410 865 390 Z" fill="#151719" stroke="#121415" stroke-width="6"/>

    <!-- White Shirt Collar -->
    <polygon points="770,335 742,400 792,395" fill="#fdfbf5" stroke="#121415" stroke-width="5"/>
    
    <!-- Royal Blue Necktie -->
    <polygon points="772,358 760,358 752,435 766,455 780,435" fill="#1976d2" stroke="#121415" stroke-width="5" stroke-linejoin="round"/>
    <circle cx="766" cy="363" r="6" fill="#1565c0" stroke="#121415" stroke-width="3"/>

    <!-- Right Arm & Gloves Pulling Briefcase -->
    <path d="M 805 365 Q 740 330 665 345" fill="none" stroke="#121415" stroke-width="24" stroke-linecap="round"/>
    <path d="M 775 405 Q 705 420 670 380" fill="none" stroke="#121415" stroke-width="24" stroke-linecap="round"/>

    <!-- Right White Glove Gripping Top Right Edge -->
    <g transform="translate(665, 345)">
      <ellipse cx="-5" cy="18" rx="14" ry="9" fill="#fdfbf5" stroke="#121415" stroke-width="5" transform="rotate(25 -5 18)"/>
      <path d="M -2 -5 C -20 -20 -48 -2 -44 22 C -38 36 -18 42 2 26 C 18 14 12 -2 -2 -5 Z" fill="#fdfbf5" stroke="#121415" stroke-width="6"/>
      <path d="M -16 -7 C -26 -1 -24 16 -14 26" fill="none" stroke="#121415" stroke-width="4.5"/>
      <path d="M -28 -1 C -36 7 -34 22 -24 30" fill="none" stroke="#121415" stroke-width="4.5"/>
    </g>

    <!-- Head: Soccer Ball Mascot -->
    <g transform="translate(770, 240)">
      <circle cx="0" cy="0" r="115" fill="#fdfbf5" stroke="#121415" stroke-width="10"/>

      <!-- Classic Black Soccer Pentagons & Seams -->
      <!-- Top patch -->
      <polygon points="15,-110 -30,-105 -55,-75 -25,-55 25,-75" fill="#151719" stroke="#121415" stroke-width="5"/>
      <line x1="15" y1="-110" x2="45" y2="-115" stroke="#121415" stroke-width="5"/>
      <line x1="-30" y1="-105" x2="-65" y2="-115" stroke="#121415" stroke-width="5"/>
      <line x1="-55" y1="-75" x2="-105" y2="-65" stroke="#121415" stroke-width="5"/>
      <line x1="25" y1="-75" x2="75" y2="-65" stroke="#121415" stroke-width="5"/>

      <!-- Right patch -->
      <polygon points="80,-45 45,-35 50,15 90,30 115, -10" fill="#151719" stroke="#121415" stroke-width="5"/>
      <line x1="45" y1="-35" x2="25" y2="-75" stroke="#121415" stroke-width="5"/>
      <line x1="50" y1="15" x2="40" y2="70" stroke="#121415" stroke-width="5"/>

      <!-- Left patch behind brow -->
      <polygon points="-50,-20 -85,-35 -115,-5 -105,40 -65,30" fill="#151719" stroke="#121415" stroke-width="5"/>
      <line x1="-50" y1="-20" x2="-25" y2="-55" stroke="#121415" stroke-width="5"/>
      <line x1="-65" y1="30" x2="-45" y2="85" stroke="#121415" stroke-width="5"/>

      <!-- Angry Eyebrows -->
      <path d="M 45 -35 Q 10 -5 -15 -25" fill="none" stroke="#121415" stroke-width="11" stroke-linecap="round"/>
      <path d="M -12 -25 Q -40 2 -70 -15" fill="none" stroke="#121415" stroke-width="11" stroke-linecap="round"/>

      <!-- Right Pie-Cut Eye -->
      <g transform="translate(10, 5) rotate(-6)">
        <ellipse cx="0" cy="0" rx="19" ry="26" fill="#fdfbf5" stroke="#121415" stroke-width="5.5"/>
        <ellipse cx="-4" cy="2" rx="11" ry="17" fill="#121415"/>
        <polygon points="-4,2 -16,-4 -16,8" fill="#fdfbf5"/>
      </g>

      <!-- Left Pie-Cut Eye -->
      <g transform="translate(-42, 12) rotate(-10)">
        <ellipse cx="0" cy="0" rx="18" ry="25" fill="#fdfbf5" stroke="#121415" stroke-width="5.5"/>
        <ellipse cx="-3" cy="2" rx="10" ry="16" fill="#121415"/>
        <polygon points="-3,2 -14,-4 -14,8" fill="#fdfbf5"/>
      </g>

      <!-- Clenched Gritted Teeth Mouth -->
      <g transform="translate(-10, 65) rotate(-6)">
        <path d="M 36 0 C 18 24 -22 24 -42 -5 C -22 -14 18 -14 36 0 Z" fill="#fdfbf5" stroke="#121415" stroke-width="6.5" stroke-linejoin="round"/>
        <path d="M 33 0 Q -3 9 -39 -5" fill="none" stroke="#121415" stroke-width="4.5"/>
        <line x1="18" y1="-6" x2="16" y2="8" stroke="#121415" stroke-width="4.5"/>
        <line x1="3" y1="-7" x2="2" y2="12" stroke="#121415" stroke-width="4.5"/>
        <line x1="-12" y1="-8" x2="-13" y2="10" stroke="#121415" stroke-width="4.5"/>
        <line x1="-26" y1="-9" x2="-26" y2="6" stroke="#121415" stroke-width="4.5"/>
      </g>
    </g>
  </g>

  <!-- ============================================== -->
  <!-- CENTER BRIEFCASE PACKED WITH MONEY -->
  <!-- ============================================== -->
  <g id="briefcase-money">
    <!-- Open Lid of Briefcase -->
    <path d="M 425 350 L 460 305 L 540 305 L 575 350 Z" fill="#202226" stroke="#121415" stroke-width="8" stroke-linejoin="round"/>
    <!-- Metal handle on lid -->
    <path d="M 478 305 C 478 280 522 280 522 305" fill="none" stroke="#121415" stroke-width="12" stroke-linecap="round"/>

    <!-- Briefcase Body Box -->
    <path d="M 365 375 L 635 375 L 600 545 L 400 545 Z" fill="#1c1d21" stroke="#121415" stroke-width="9" stroke-linejoin="round"/>

    <!-- Gold Brass Corner Guards -->
    <!-- Top left corner -->
    <polygon points="365,375 388,375 369,400" fill="#edb037" stroke="#121415" stroke-width="4"/>
    <!-- Top right corner -->
    <polygon points="635,375 612,375 631,400" fill="#edb037" stroke="#121415" stroke-width="4"/>
    <!-- Bottom left corner -->
    <polygon points="400,545 424,545 403,520" fill="#edb037" stroke="#121415" stroke-width="4"/>
    <!-- Bottom right corner -->
    <polygon points="600,545 576,545 597,520" fill="#edb037" stroke="#121415" stroke-width="4"/>

    <!-- Gold Center Latch Plate & Keyhole -->
    <rect x="480" y="465" width="40" height="30" rx="5" fill="#edb037" stroke="#121415" stroke-width="5"/>
    <circle cx="500" cy="477" r="4" fill="#121415"/>
    <line x1="500" y1="477" x2="500" y2="488" stroke="#121415" stroke-width="3.5"/>

    <!-- Money Stacks inside Briefcase -->
    <!-- Stack 1 (Far Left) -->
    <g transform="translate(390, 375) rotate(-8)">
      <polygon points="5,22 65,10 75,38 15,50" fill="#4b8b54" stroke="#121415" stroke-width="4"/>
      <polygon points="5,15 65,3 75,31 15,43" fill="#62a76b" stroke="#121415" stroke-width="4"/>
      <!-- Band wrap -->
      <line x1="40" y1="7" x2="48" y2="35" stroke="#fdfbf5" stroke-width="9"/>
      <ellipse cx="44" cy="21" rx="10" ry="7" fill="#e2efe3" stroke="#121415" stroke-width="2"/>
    </g>

    <!-- Stack 2 (Center Left) -->
    <g transform="translate(435, 365) rotate(2)">
      <polygon points="5,24 68,16 78,42 15,50" fill="#46864f" stroke="#121415" stroke-width="4"/>
      <polygon points="5,15 68,7 78,33 15,41" fill="#6cb175" stroke="#121415" stroke-width="4"/>
      <line x1="42" y1="11" x2="47" y2="37" stroke="#fdfbf5" stroke-width="9"/>
      <ellipse cx="45" cy="24" rx="10" ry="7" fill="#e2efe3" stroke="#121415" stroke-width="2"/>
    </g>

    <!-- Stack 3 (Center Right) -->
    <g transform="translate(485, 362) rotate(-3)">
      <polygon points="5,24 68,16 78,42 15,50" fill="#46864f" stroke="#121415" stroke-width="4"/>
      <polygon points="5,15 68,7 78,33 15,41" fill="#65ab6e" stroke="#121415" stroke-width="4"/>
      <line x1="42" y1="11" x2="47" y2="37" stroke="#fdfbf5" stroke-width="9"/>
      <ellipse cx="45" cy="24" rx="10" ry="7" fill="#e2efe3" stroke="#121415" stroke-width="2"/>
    </g>

    <!-- Stack 4 (Far Right) -->
    <g transform="translate(540, 375) rotate(9)">
      <polygon points="5,22 65,10 75,38 15,50" fill="#4b8b54" stroke="#121415" stroke-width="4"/>
      <polygon points="5,15 65,3 75,31 15,43" fill="#62a76b" stroke="#121415" stroke-width="4"/>
      <line x1="40" y1="7" x2="48" y2="35" stroke="#fdfbf5" stroke-width="9"/>
      <ellipse cx="44" cy="21" rx="10" ry="7" fill="#e2efe3" stroke="#121415" stroke-width="2"/>
    </g>

    <!-- Falling Dollar Banknotes Below Briefcase -->
    <!-- Bill 1 (Left, dropping) -->
    <g transform="translate(365, 510) rotate(22)">
      <rect x="0" y="0" width="76" height="42" rx="4" fill="#6cb175" stroke="#121415" stroke-width="5"/>
      <rect x="5" y="4" width="66" height="34" rx="3" fill="none" stroke="#121415" stroke-width="2"/>
      <ellipse cx="38" cy="21" rx="15" ry="11" fill="#e2efe3" stroke="#121415" stroke-width="3"/>
      <text x="38" y="27" font-family="'Impact', Arial, sans-serif" font-weight="900" font-size="18" fill="#121415" text-anchor="middle">$</text>
    </g>

    <!-- Bill 2 (Lower Center, dropping) -->
    <g transform="translate(470, 560) rotate(-14)">
      <rect x="0" y="0" width="82" height="44" rx="4" fill="#75bc7f" stroke="#121415" stroke-width="5"/>
      <rect x="5" y="4" width="72" height="36" rx="3" fill="none" stroke="#121415" stroke-width="2"/>
      <ellipse cx="41" cy="22" rx="16" ry="12" fill="#e2efe3" stroke="#121415" stroke-width="3"/>
      <text x="41" y="28" font-family="'Impact', Arial, sans-serif" font-weight="900" font-size="19" fill="#121415" text-anchor="middle">$</text>
    </g>

    <!-- Bill 3 (Bottom Center Left) -->
    <g transform="translate(400, 595) rotate(16)">
      <rect x="0" y="0" width="70" height="38" rx="4" fill="#62a76b" stroke="#121415" stroke-width="5"/>
      <rect x="5" y="4" width="60" height="30" rx="3" fill="none" stroke="#121415" stroke-width="2"/>
      <ellipse cx="35" cy="19" rx="14" ry="10" fill="#e2efe3" stroke="#121415" stroke-width="3"/>
      <text x="35" y="25" font-family="'Impact', Arial, sans-serif" font-weight="900" font-size="16" fill="#121415" text-anchor="middle">$</text>
    </g>

    <!-- Bill 4 (Far Right, dropping) -->
    <g transform="translate(565, 490) rotate(-32)">
      <rect x="0" y="0" width="72" height="38" rx="4" fill="#65ab6e" stroke="#121415" stroke-width="5"/>
      <rect x="5" y="4" width="62" height="30" rx="3" fill="none" stroke="#121415" stroke-width="2"/>
      <ellipse cx="36" cy="19" rx="14" ry="10" fill="#e2efe3" stroke="#121415" stroke-width="3"/>
      <text x="36" y="25" font-family="'Impact', Arial, sans-serif" font-weight="900" font-size="16" fill="#121415" text-anchor="middle">$</text>
    </g>
  </g>

  <!-- ============================================== -->
  <!-- BOTTOM BLACK PLAQUE / BANNER WITH 3D TEXT -->
  <!-- ============================================== -->
  <!-- Bottom curved dark shield cutout -->
  <path d="M 85 750 C 130 920 300 970 500 970 C 700 970 870 920 915 750 C 790 680 500 640 85 750 Z" fill="#121415" />

  <!-- Bottom Golden Yellow Arc Smile Line -->
  <path d="M 340 940 C 440 962 560 962 660 940 C 625 962 550 975 500 975 C 450 975 375 962 340 940 Z" fill="#edb037" stroke="#121415" stroke-width="4"/>

  <!-- Curved Text Paths -->
  <defs>
    <!-- Upper Path for CAPITAL -->
    <path id="pathCapital" d="M 125 805 Q 500 625 875 805" />
    <!-- Lower Path for EN JUEGO -->
    <path id="pathEnJuego" d="M 235 905 Q 500 790 765 905" />
  </defs>

  <!-- VINTAGE RETRO BUBBLE TYPOGRAPHY -->
  <g id="typography" filter="url(#textDropShadow)">
    <!-- 3D Gold Extrusion / Shadow for CAPITAL -->
    <g transform="translate(0, 16)">
      <text font-family="'Impact', 'Arial Black', sans-serif" font-size="142" font-weight="900" letter-spacing="8" fill="#e4a02a" stroke="#e4a02a" stroke-width="26" stroke-linejoin="round">
        <textPath href="#pathCapital" startOffset="50%" text-anchor="middle">
          CAPITAL
        </textPath>
      </text>
    </g>
    <!-- Black Outline Behind Letters for CAPITAL -->
    <g transform="translate(0, 0)">
      <text font-family="'Impact', 'Arial Black', sans-serif" font-size="142" font-weight="900" letter-spacing="8" fill="#121415" stroke="#121415" stroke-width="20" stroke-linejoin="round">
        <textPath href="#pathCapital" startOffset="50%" text-anchor="middle">
          CAPITAL
        </textPath>
      </text>
    </g>
    <!-- Cream White Front Face for CAPITAL -->
    <g transform="translate(0, 0)">
      <text font-family="'Impact', 'Arial Black', sans-serif" font-size="142" font-weight="900" letter-spacing="8" fill="#fdf8ea">
        <textPath href="#pathCapital" startOffset="50%" text-anchor="middle">
          CAPITAL
        </textPath>
      </text>
    </g>

    <!-- Flanking Gold Dash on Left of EN JUEGO -->
    <path d="M 170 875 L 230 862" stroke="#edb037" stroke-width="14" stroke-linecap="round"/>
    <!-- Flanking Gold Dash on Right of EN JUEGO -->
    <path d="M 770 862 L 830 875" stroke="#edb037" stroke-width="14" stroke-linecap="round"/>

    <!-- 3D Gold Extrusion / Shadow for EN JUEGO -->
    <g transform="translate(0, 14)">
      <text font-family="'Impact', 'Arial Black', sans-serif" font-size="108" font-weight="900" letter-spacing="7" fill="#e4a02a" stroke="#e4a02a" stroke-width="22" stroke-linejoin="round">
        <textPath href="#pathEnJuego" startOffset="50%" text-anchor="middle">
          EN JUEGO
        </textPath>
      </text>
    </g>
    <!-- Black Outline for EN JUEGO -->
    <g transform="translate(0, 0)">
      <text font-family="'Impact', 'Arial Black', sans-serif" font-size="108" font-weight="900" letter-spacing="7" fill="#121415" stroke="#121415" stroke-width="18" stroke-linejoin="round">
        <textPath href="#pathEnJuego" startOffset="50%" text-anchor="middle">
          EN JUEGO
        </textPath>
      </text>
    </g>
    <!-- Cream White Front Face for EN JUEGO -->
    <g transform="translate(0, 0)">
      <text font-family="'Impact', 'Arial Black', sans-serif" font-size="108" font-weight="900" letter-spacing="7" fill="#fdf8ea">
        <textPath href="#pathEnJuego" startOffset="50%" text-anchor="middle">
          EN JUEGO
        </textPath>
      </text>
    </g>
  </g>
</svg>'''

with open('public/logo.svg', 'w') as f:
    f.write(svg)

# Render to 1024x1024 PNG
subprocess.run(['rsvg-convert', '-w', '1024', '-h', '1024', 'public/logo.svg', '-o', 'public/logo.png'], check=True)
subprocess.run(['rsvg-convert', '-w', '1024', '-h', '1024', 'public/logo.svg', '-o', 'public/image.png'], check=True)

if os.path.exists('dist'):
    subprocess.run(['cp', 'public/logo.svg', 'dist/logo.svg'])
    subprocess.run(['cp', 'public/logo.png', 'dist/logo.png'])
    subprocess.run(['cp', 'public/image.png', 'dist/image.png'])

print('Rendered exact logo matching uploaded image.')
