import subprocess
import os

svg_content = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="1000" height="1000">
  <defs>
    <!-- Filters & Shadows -->
    <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="15" flood-color="#000000" flood-opacity="0.45"/>
    </filter>
    <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#f5b82e" flood-opacity="0.4"/>
    </filter>
    
    <!-- Linear & Radial Gradients -->
    <radialGradient id="greenBg" cx="50%" cy="42%" r="48%">
      <stop offset="0%" stop-color="#235c4d" />
      <stop offset="65%" stop-color="#184a3c" />
      <stop offset="100%" stop-color="#0f3329" />
    </radialGradient>

    <radialGradient id="ballShadeLeft" cx="40%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="75%" stop-color="#e8ede9" />
      <stop offset="100%" stop-color="#b5c4ba" />
    </radialGradient>

    <radialGradient id="ballShadeRight" cx="60%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="75%" stop-color="#e8ede9" />
      <stop offset="100%" stop-color="#b5c4ba" />
    </radialGradient>

    <linearGradient id="goldRing" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffd56b" />
      <stop offset="40%" stop-color="#f5b82e" />
      <stop offset="70%" stop-color="#d99518" />
      <stop offset="100%" stop-color="#f8c448" />
    </linearGradient>

    <linearGradient id="briefcaseBody" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#2a2c32" />
      <stop offset="100%" stop-color="#131417" />
    </linearGradient>

    <linearGradient id="moneyGreen" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#72b575" />
      <stop offset="100%" stop-color="#468549" />
    </linearGradient>
  </defs>

  <!-- OUTER BADGE BACKGROUND -->
  <!-- Outer Rim / Cream Offset -->
  <circle cx="500" cy="500" r="480" fill="#fcf9ee" stroke="#121314" stroke-width="26" />
  
  <!-- Outer Gold Ring -->
  <circle cx="500" cy="500" r="454" fill="none" stroke="url(#goldRing)" stroke-width="20" />
  
  <!-- Thin inner black separator line -->
  <circle cx="500" cy="500" r="443" fill="none" stroke="#111214" stroke-width="7" />

  <!-- Inner Dark Forest Green Circle -->
  <circle cx="500" cy="500" r="439" fill="url(#greenBg)" />

  <!-- Tension / Action burst lines radiating behind briefcase -->
  <g stroke="#131416" stroke-width="7" stroke-linecap="round" opacity="0.9">
    <line x1="500" y1="280" x2="500" y2="230" stroke-width="9"/>
    <line x1="465" y1="285" x2="445" y2="238" />
    <line x1="535" y1="285" x2="555" y2="238" />
    <line x1="430" y1="305" x2="395" y2="265" />
    <line x1="570" y1="305" x2="605" y2="265" />
    <line x1="390" y1="335" x2="355" y2="310" />
    <line x1="610" y1="335" x2="645" y2="310" />
  </g>

  <!-- Tension arcs around characters -->
  <g stroke="#131416" stroke-width="6" fill="none" stroke-linecap="round">
    <!-- Left character motion -->
    <path d="M 125 385 Q 105 425 125 465" />
    <path d="M 105 395 Q 85 425 105 455" stroke-width="4.5"/>
    <!-- Right character motion -->
    <path d="M 875 385 Q 895 425 875 465" />
    <path d="M 895 395 Q 915 425 895 455" stroke-width="4.5"/>
  </g>

  <!-- ============================================== -->
  <!-- LEFT CHARACTER (EMPRESA A - RED TIE) -->
  <!-- ============================================== -->
  <g id="leftCharacter">
    <!-- Left Character: Back Leg -->
    <path d="M 285 530 Q 255 580 200 580" fill="none" stroke="#131416" stroke-width="32" stroke-linecap="round" />
    <!-- White Spat / Sock cuff -->
    <ellipse cx="200" cy="580" rx="20" ry="12" fill="#ffffff" stroke="#131416" stroke-width="7" />
    <!-- Back Shoe (Oversized cartoon leather shoe) -->
    <path d="M 215 575 C 235 575 255 595 240 635 C 220 660 145 660 125 640 C 110 625 130 580 185 580 Z" fill="#15161a" stroke="#131416" stroke-width="8" />
    <!-- White shoe highlight -->
    <ellipse cx="160" cy="625" rx="14" ry="7" fill="#ffffff" opacity="0.8" transform="rotate(-15 160 625)" />

    <!-- Left Character: Front Leg -->
    <path d="M 325 540 Q 330 600 310 635" fill="none" stroke="#131416" stroke-width="32" stroke-linecap="round" />
    <!-- Front Leg Spat -->
    <ellipse cx="310" cy="635" rx="20" ry="12" fill="#ffffff" stroke="#131416" stroke-width="7" />
    <!-- Front Shoe -->
    <path d="M 325 630 C 355 635 390 655 375 690 C 350 710 270 705 250 680 C 235 660 260 630 305 630 Z" fill="#15161a" stroke="#131416" stroke-width="8" />
    <ellipse cx="295" cy="675" rx="16" ry="8" fill="#ffffff" opacity="0.8" transform="rotate(-10 295 675)" />

    <!-- Left Character: Suit Body -->
    <path d="M 225 355 C 310 350 360 400 345 500 C 320 545 235 550 180 500 C 150 435 180 365 225 355 Z" fill="#16181d" stroke="#131416" stroke-width="9" />
    <!-- Suit Lapels / White Shirt V -->
    <polygon points="260,370 290,445 235,445" fill="#ffffff" stroke="#131416" stroke-width="6" />
    <!-- Vibrant Red Necktie -->
    <polygon points="255,395 270,395 278,485 262,505 248,485" fill="#dc2626" stroke="#131416" stroke-width="6" />
    <circle cx="262" cy="402" r="7" fill="#b91c1c" stroke="#131416" stroke-width="4"/>

    <!-- Left Character: Head (Soccer Ball) -->
    <g transform="translate(250, 255)">
      <!-- Ball base sphere -->
      <circle cx="0" cy="0" r="130" fill="url(#ballShadeLeft)" stroke="#131416" stroke-width="12" />
      
      <!-- Classic Black Soccer Pentagons & Seams -->
      <!-- Center-right pentagon -->
      <polygon points="20,-20 60,-5 70,35 35,60 5,25" fill="#16171b" stroke="#131416" stroke-width="6" />
      <!-- Seams connecting center-right -->
      <line x1="20" y1="-20" x2="-20" y2="-55" stroke="#131416" stroke-width="6" />
      <line x1="60" y1="-5" x2="110" y2="-15" stroke="#131416" stroke-width="6" />
      <line x1="70" y1="35" x2="120" y2="60" stroke="#131416" stroke-width="6" />
      <line x1="35" y1="60" x2="40" y2="115" stroke="#131416" stroke-width="6" />
      <line x1="5" y1="25" x2="-45" y2="50" stroke="#131416" stroke-width="6" />

      <!-- Top-left patch -->
      <polygon points="-50,-80 -20,-55 -35,-20 -75,-25 -90,-60" fill="#16171b" stroke="#131416" stroke-width="6" />
      <!-- Seams top-left -->
      <line x1="-50" y1="-80" x2="-55" y2="-120" stroke="#131416" stroke-width="6" />
      <line x1="-90" y1="-60" x2="-125" y2="-50" stroke="#131416" stroke-width="6" />
      <line x1="-75" y1="-25" x2="-115" y2="10" stroke="#131416" stroke-width="6" />

      <!-- Bottom-left patch -->
      <polygon points="-45,50 -10,85 -30,120 -70,110 -80,70" fill="#16171b" stroke="#131416" stroke-width="6" />

      <!-- Angry Eyebrows (Vintage 1930s style) -->
      <path d="M -30 -40 Q 5 -10 30 -35" fill="none" stroke="#131416" stroke-width="12" stroke-linecap="round" />
      <path d="M 25 -35 Q 55 -5 85 -25" fill="none" stroke="#131416" stroke-width="12" stroke-linecap="round" />

      <!-- Left Angry Cartoon Eye (Pie-cut style with white sclera) -->
      <ellipse cx="10" cy="-5" rx="20" ry="26" fill="#ffffff" stroke="#131416" stroke-width="6" transform="rotate(10 10 -5)"/>
      <ellipse cx="14" cy="-3" rx="11" ry="16" fill="#131416" />
      <circle cx="10" cy="-8" r="4" fill="#ffffff" />

      <!-- Right Angry Cartoon Eye -->
      <ellipse cx="62" cy="5" rx="19" ry="25" fill="#ffffff" stroke="#131416" stroke-width="6" transform="rotate(15 62 5)"/>
      <ellipse cx="66" cy="7" rx="10" ry="15" fill="#131416" />
      <circle cx="62" cy="2" r="4" fill="#ffffff" />

      <!-- Clenched Teeth Angry Mouth -->
      <g transform="translate(15, 60) rotate(8)">
        <!-- Mouth outline shape -->
        <path d="M -35 0 C -15 25 25 25 45 -5 C 25 -12 -15 -12 -35 0 Z" fill="#ffffff" stroke="#131416" stroke-width="7" stroke-linejoin="round"/>
        <!-- Horizontal teeth line -->
        <path d="M -32 0 Q 5 10 42 -5" fill="none" stroke="#131416" stroke-width="5" />
        <!-- Vertical teeth dividers -->
        <line x1="-18" y1="-5" x2="-16" y2="10" stroke="#131416" stroke-width="5" />
        <line x1="-3" y1="-6" x2="-2" y2="14" stroke="#131416" stroke-width="5" />
        <line x1="12" y1="-7" x2="13" y2="12" stroke="#131416" stroke-width="5" />
        <line x1="27" y1="-8" x2="27" y2="7" stroke="#131416" stroke-width="5" />
      </g>
    </g>

    <!-- Left Character: Arms & White Cartoon Gloves Pulling Briefcase -->
    <!-- Back Arm -->
    <path d="M 230 410 Q 300 370 380 395" fill="none" stroke="#131416" stroke-width="26" stroke-linecap="round" />
    <!-- Front Arm -->
    <path d="M 260 450 Q 330 470 370 425" fill="none" stroke="#131416" stroke-width="28" stroke-linecap="round" />

    <!-- Left Glove: Grasping briefcase handle -->
    <g transform="translate(375, 395)">
      <!-- Glove cuff -->
      <ellipse cx="-5" cy="15" rx="15" ry="10" fill="#ffffff" stroke="#131416" stroke-width="6" transform="rotate(-30 -5 15)"/>
      <!-- Glove hand / fingers tightly wrapped -->
      <path d="M -5 -10 C 15 -25 45 -5 40 20 C 35 35 15 40 -5 25 C -20 15 -15 0 -5 -10 Z" fill="#ffffff" stroke="#131416" stroke-width="7" />
      <!-- Finger grooves -->
      <path d="M 12 -12 C 22 -5 20 15 10 25" fill="none" stroke="#131416" stroke-width="5"/>
      <path d="M 25 -5 C 32 5 30 20 20 28" fill="none" stroke="#131416" stroke-width="5"/>
    </g>
  </g>

  <!-- ============================================== -->
  <!-- RIGHT CHARACTER (EMPRESA B - BLUE TIE) -->
  <!-- ============================================== -->
  <g id="rightCharacter">
    <!-- Right Character: Back Leg -->
    <path d="M 715 530 Q 745 580 800 580" fill="none" stroke="#131416" stroke-width="32" stroke-linecap="round" />
    <ellipse cx="800" cy="580" rx="20" ry="12" fill="#ffffff" stroke="#131416" stroke-width="7" />
    <!-- Back Shoe -->
    <path d="M 785 575 C 765 575 745 595 760 635 C 780 660 855 660 875 640 C 890 625 870 580 815 580 Z" fill="#15161a" stroke="#131416" stroke-width="8" />
    <ellipse cx="840" cy="625" rx="14" ry="7" fill="#ffffff" opacity="0.8" transform="rotate(15 840 625)" />

    <!-- Right Character: Front Leg -->
    <path d="M 675 540 Q 670 600 690 635" fill="none" stroke="#131416" stroke-width="32" stroke-linecap="round" />
    <ellipse cx="690" cy="635" rx="20" ry="12" fill="#ffffff" stroke="#131416" stroke-width="7" />
    <!-- Front Shoe -->
    <path d="M 675 630 C 645 635 610 655 625 690 C 650 710 730 705 750 680 C 765 660 740 630 695 630 Z" fill="#15161a" stroke="#131416" stroke-width="8" />
    <ellipse cx="705" cy="675" rx="16" ry="8" fill="#ffffff" opacity="0.8" transform="rotate(10 705 675)" />

    <!-- Right Character: Suit Body -->
    <path d="M 775 355 C 690 350 640 400 655 500 C 680 545 765 550 820 500 C 850 435 820 365 775 355 Z" fill="#16181d" stroke="#131416" stroke-width="9" />
    <!-- Suit Lapels / White Shirt V -->
    <polygon points="740,370 710,445 765,445" fill="#ffffff" stroke="#131416" stroke-width="6" />
    <!-- Vibrant Blue Necktie -->
    <polygon points="745,395 730,395 722,485 738,505 752,485" fill="#2563eb" stroke="#131416" stroke-width="6" />
    <circle cx="738" cy="402" r="7" fill="#1d4ed8" stroke="#131416" stroke-width="4"/>

    <!-- Right Character: Head (Soccer Ball) -->
    <g transform="translate(750, 255)">
      <!-- Ball base sphere -->
      <circle cx="0" cy="0" r="130" fill="url(#ballShadeRight)" stroke="#131416" stroke-width="12" />
      
      <!-- Classic Black Soccer Pentagons & Seams -->
      <!-- Center-left pentagon -->
      <polygon points="-20,-20 -60,-5 -70,35 -35,60 -5,25" fill="#16171b" stroke="#131416" stroke-width="6" />
      <!-- Seams connecting center-left -->
      <line x1="-20" y1="-20" x2="20" y2="-55" stroke="#131416" stroke-width="6" />
      <line x1="-60" y1="-5" x2="-110" y2="-15" stroke="#131416" stroke-width="6" />
      <line x1="-70" y1="35" x2="-120" y2="60" stroke="#131416" stroke-width="6" />
      <line x1="-35" y1="60" x2="-40" y2="115" stroke="#131416" stroke-width="6" />
      <line x1="-5" y1="25" x2="45" y2="50" stroke="#131416" stroke-width="6" />

      <!-- Top-right patch -->
      <polygon points="50,-80 20,-55 35,-20 75,-25 90,-60" fill="#16171b" stroke="#131416" stroke-width="6" />
      <line x1="50" y1="-80" x2="55" y2="-120" stroke="#131416" stroke-width="6" />
      <line x1="90" y1="-60" x2="125" y2="-50" stroke="#131416" stroke-width="6" />
      <line x1="75" y1="-25" x2="115" y2="10" stroke="#131416" stroke-width="6" />

      <!-- Bottom-right patch -->
      <polygon points="45,50 10,85 30,120 70,110 80,70" fill="#16171b" stroke="#131416" stroke-width="6" />

      <!-- Angry Eyebrows -->
      <path d="M 30 -40 Q -5 -10 -30 -35" fill="none" stroke="#131416" stroke-width="12" stroke-linecap="round" />
      <path d="M -25 -35 Q -55 -5 -85 -25" fill="none" stroke="#131416" stroke-width="12" stroke-linecap="round" />

      <!-- Right Angry Cartoon Eye -->
      <ellipse cx="-10" cy="-5" rx="20" ry="26" fill="#ffffff" stroke="#131416" stroke-width="6" transform="rotate(-10 -10 -5)"/>
      <ellipse cx="-14" cy="-3" rx="11" ry="16" fill="#131416" />
      <circle cx="-10" cy="-8" r="4" fill="#ffffff" />

      <!-- Left Angry Cartoon Eye -->
      <ellipse cx="-62" cy="5" rx="19" ry="25" fill="#ffffff" stroke="#131416" stroke-width="6" transform="rotate(-15 -62 5)"/>
      <ellipse cx="-66" cy="7" rx="10" ry="15" fill="#131416" />
      <circle cx="-62" cy="2" r="4" fill="#ffffff" />

      <!-- Clenched Teeth Angry Mouth -->
      <g transform="translate(-15, 60) rotate(-8)">
        <path d="M 35 0 C 15 25 -25 25 -45 -5 C -25 -12 15 -12 35 0 Z" fill="#ffffff" stroke="#131416" stroke-width="7" stroke-linejoin="round"/>
        <path d="M 32 0 Q -5 10 -42 -5" fill="none" stroke="#131416" stroke-width="5" />
        <line x1="18" y1="-5" x2="16" y2="10" stroke="#131416" stroke-width="5" />
        <line x1="3" y1="-6" x2="2" y2="14" stroke="#131416" stroke-width="5" />
        <line x1="-12" y1="-7" x2="-13" y2="12" stroke="#131416" stroke-width="5" />
        <line x1="-27" y1="-8" x2="-27" y2="7" stroke="#131416" stroke-width="5" />
      </g>
    </g>

    <!-- Right Character: Arms & White Cartoon Gloves Pulling Briefcase -->
    <path d="M 770 410 Q 700 370 620 395" fill="none" stroke="#131416" stroke-width="26" stroke-linecap="round" />
    <path d="M 740 450 Q 670 470 630 425" fill="none" stroke="#131416" stroke-width="28" stroke-linecap="round" />

    <!-- Right Glove: Grasping briefcase right edge -->
    <g transform="translate(625, 395)">
      <ellipse cx="5" cy="15" rx="15" ry="10" fill="#ffffff" stroke="#131416" stroke-width="6" transform="rotate(30 5 15)"/>
      <path d="M 5 -10 C -15 -25 -45 -5 -40 20 C -35 35 -15 40 5 25 C 20 15 15 0 5 -10 Z" fill="#ffffff" stroke="#131416" stroke-width="7" />
      <path d="M -12 -12 C -22 -5 -20 15 -10 25" fill="none" stroke="#131416" stroke-width="5"/>
      <path d="M -25 -5 C -32 5 -30 20 -20 28" fill="none" stroke="#131416" stroke-width="5"/>
    </g>
  </g>

  <!-- ============================================== -->
  <!-- CENTER BRIEFCASE & FLOATING DOLLAR BILLS -->
  <!-- ============================================== -->
  <g id="centerBriefcase" filter="url(#softShadow)">
    <!-- Open Briefcase Lid (Tilted back/up) -->
    <path d="M 400 365 L 460 300 L 540 300 L 600 365 Z" fill="#202227" stroke="#131416" stroke-width="8" stroke-linejoin="round"/>
    <!-- Lid handle bracket -->
    <path d="M 475 300 C 475 270 525 270 525 300" fill="none" stroke="#f5b82e" stroke-width="12" stroke-linecap="round"/>

    <!-- Briefcase Main Body Box -->
    <path d="M 370 380 L 630 380 L 605 525 L 395 525 Z" fill="url(#briefcaseBody)" stroke="#131416" stroke-width="9" stroke-linejoin="round" />

    <!-- Gold Corner Reinforcements -->
    <polygon points="370,380 395,380 373,408" fill="#f5b82e" stroke="#131416" stroke-width="4"/>
    <polygon points="630,380 605,380 627,408" fill="#f5b82e" stroke="#131416" stroke-width="4"/>
    <polygon points="395,525 418,525 398,500" fill="#f5b82e" stroke="#131416" stroke-width="4"/>
    <polygon points="605,525 582,525 602,500" fill="#f5b82e" stroke="#131416" stroke-width="4"/>

    <!-- Gold Center Key Lock Latch -->
    <rect x="485" y="445" width="30" height="24" rx="4" fill="#f5b82e" stroke="#131416" stroke-width="5"/>
    <circle cx="500" cy="454" r="3" fill="#131416" />
    <line x1="500" y1="454" x2="500" y2="463" stroke="#131416" stroke-width="3"/>

    <!-- Overflowing Green Money Stacks inside Briefcase -->
    <g transform="translate(390, 360)">
      <!-- Stack 1 (Left) -->
      <g transform="rotate(-6 35 25)">
        <polygon points="10,25 70,12 85,38 25,52" fill="#529b57" stroke="#131416" stroke-width="4"/>
        <polygon points="10,18 70,5 85,30 25,45" fill="#6dbd73" stroke="#131416" stroke-width="4"/>
        <line x1="45" y1="9" x2="54" y2="35" stroke="#fcf9ee" stroke-width="8" opacity="0.9"/>
      </g>
      <!-- Stack 2 (Center) -->
      <g transform="translate(60, -10)">
        <polygon points="10,25 75,18 85,42 20,50" fill="#4d9451" stroke="#131416" stroke-width="4"/>
        <polygon points="10,16 75,9 85,34 20,42" fill="#78c97e" stroke="#131416" stroke-width="4"/>
        <line x1="45" y1="12" x2="50" y2="38" stroke="#fcf9ee" stroke-width="9" opacity="0.9"/>
      </g>
      <!-- Stack 3 (Right) -->
      <g transform="translate(130, 0) rotate(8 40 25)">
        <polygon points="10,25 70,18 80,45 20,52" fill="#529b57" stroke="#131416" stroke-width="4"/>
        <polygon points="10,16 70,9 80,36 20,44" fill="#6ebb74" stroke="#131416" stroke-width="4"/>
        <line x1="43" y1="12" x2="48" y2="40" stroke="#fcf9ee" stroke-width="8" opacity="0.9"/>
      </g>
    </g>

    <!-- Floating / Dropping Dollar Banknotes -->
    <!-- Falling Bill 1 (Left) -->
    <g transform="translate(370, 500) rotate(22)">
      <rect x="0" y="0" width="70" height="38" rx="4" fill="#75c77b" stroke="#131416" stroke-width="5"/>
      <ellipse cx="35" cy="19" rx="14" ry="10" fill="#e8f5e9" stroke="#131416" stroke-width="3"/>
      <text x="35" y="24" font-family="Arial, sans-serif" font-weight="bold" font-size="16" fill="#131416" text-anchor="middle">$</text>
    </g>

    <!-- Falling Bill 2 (Center Low) -->
    <g transform="translate(470, 550) rotate(-12)">
      <rect x="0" y="0" width="75" height="40" rx="4" fill="#80d486" stroke="#131416" stroke-width="5"/>
      <ellipse cx="37" cy="20" rx="15" ry="11" fill="#e8f5e9" stroke="#131416" stroke-width="3"/>
      <text x="37" y="26" font-family="Arial, sans-serif" font-weight="bold" font-size="17" fill="#131416" text-anchor="middle">$</text>
    </g>

    <!-- Falling Bill 3 (Right) -->
    <g transform="translate(560, 480) rotate(-35)">
      <rect x="0" y="0" width="65" height="36" rx="4" fill="#6dbf73" stroke="#131416" stroke-width="5"/>
      <ellipse cx="32" cy="18" rx="13" ry="9" fill="#e8f5e9" stroke="#131416" stroke-width="3"/>
      <text x="32" y="23" font-family="Arial, sans-serif" font-weight="bold" font-size="15" fill="#131416" text-anchor="middle">$</text>
    </g>
  </g>

  <!-- ============================================== -->
  <!-- BOTTOM ARCHED TYPOGRAPHY: CAPITAL EN JUEGO -->
  <!-- ============================================== -->
  <!-- Bottom Golden Yellow Pill / Crescent Base Accent -->
  <path d="M 330 920 C 440 945 560 945 670 920 C 650 940 550 960 500 960 C 450 960 350 940 330 920 Z" fill="#f5b82e" stroke="#131416" stroke-width="8" />

  <!-- Typography Paths Definition for Curved Text -->
  <defs>
    <!-- Upper Path for CAPITAL -->
    <path id="capitalPath" d="M 115 800 Q 500 600 885 800" />
    <!-- Lower Path for EN JUEGO -->
    <path id="enJuegoPath" d="M 230 890 Q 500 780 770 890" />
  </defs>

  <g id="typographyGroup" filter="url(#softShadow)">
    <!-- 3D Shadow Layer for CAPITAL (Extruded Black / Deep Ochre) -->
    <g transform="translate(0, 18)">
      <text font-family="'Impact', 'Arial Black', sans-serif" font-size="138" font-weight="900" letter-spacing="9" fill="#111215" stroke="#111215" stroke-width="26" stroke-linejoin="round">
        <textPath href="#capitalPath" startOffset="50%" text-anchor="middle">
          CAPITAL
        </textPath>
      </text>
    </g>
    <!-- 3D Yellow / Amber Bevel Layer for CAPITAL -->
    <g transform="translate(0, 9)">
      <text font-family="'Impact', 'Arial Black', sans-serif" font-size="138" font-weight="900" letter-spacing="9" fill="#f5a623" stroke="#f5a623" stroke-width="20" stroke-linejoin="round">
        <textPath href="#capitalPath" startOffset="50%" text-anchor="middle">
          CAPITAL
        </textPath>
      </text>
    </g>
    <!-- Foreground Cream Face Layer for CAPITAL -->
    <g transform="translate(0, 0)">
      <text font-family="'Impact', 'Arial Black', sans-serif" font-size="138" font-weight="900" letter-spacing="9" fill="#fdfbf3" stroke="#111215" stroke-width="15" stroke-linejoin="round">
        <textPath href="#capitalPath" startOffset="50%" text-anchor="middle">
          CAPITAL
        </textPath>
      </text>
    </g>

    <!-- 3D Shadow Layer for EN JUEGO -->
    <g transform="translate(0, 16)">
      <text font-family="'Impact', 'Arial Black', sans-serif" font-size="108" font-weight="900" letter-spacing="7" fill="#111215" stroke="#111215" stroke-width="24" stroke-linejoin="round">
        <textPath href="#enJuegoPath" startOffset="50%" text-anchor="middle">
          EN JUEGO
        </textPath>
      </text>
    </g>
    <!-- 3D Yellow / Amber Bevel Layer for EN JUEGO -->
    <g transform="translate(0, 8)">
      <text font-family="'Impact', 'Arial Black', sans-serif" font-size="108" font-weight="900" letter-spacing="7" fill="#f5a623" stroke="#f5a623" stroke-width="18" stroke-linejoin="round">
        <textPath href="#enJuegoPath" startOffset="50%" text-anchor="middle">
          EN JUEGO
        </textPath>
      </text>
    </g>
    <!-- Foreground Cream Face Layer for EN JUEGO -->
    <g transform="translate(0, 0)">
      <text font-family="'Impact', 'Arial Black', sans-serif" font-size="108" font-weight="900" letter-spacing="7" fill="#fdfbf3" stroke="#111215" stroke-width="13" stroke-linejoin="round">
        <textPath href="#enJuegoPath" startOffset="50%" text-anchor="middle">
          EN JUEGO
        </textPath>
      </text>
    </g>
  </g>
</svg>'''

with open('public/logo.svg', 'w') as f:
    f.write(svg_content)

print('Saved public/logo.svg')

# Now convert using rsvg-convert to high-res PNG (1000x1000 and 650x650)
subprocess.run(['rsvg-convert', '-w', '1000', '-h', '1000', 'public/logo.svg', '-o', 'public/logo.png'], check=True)
subprocess.run(['rsvg-convert', '-w', '1000', '-h', '1000', 'public/logo.svg', '-o', 'public/logo-mascot.png'], check=True)

# Also copy to dist if dist exists
if os.path.exists('dist'):
    subprocess.run(['cp', 'public/logo.svg', 'dist/logo.svg'])
    subprocess.run(['cp', 'public/logo.png', 'dist/logo.png'])
    subprocess.run(['cp', 'public/logo-mascot.png', 'dist/logo-mascot.png'])

print('Rendered public/logo.png and public/logo-mascot.png successfully')
