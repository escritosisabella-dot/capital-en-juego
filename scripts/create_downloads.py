import os
import zipfile
import shutil

os.makedirs('public/downloads', exist_ok=True)

# 1. HTML file
html_content = """<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Capital en Juego | La Estrategia También Juega</title>
  
  <!-- Tipografías de Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Titan+One&display=swap" rel="stylesheet">
  
  <!-- Hoja de Estilos CSS -->
  <link rel="stylesheet" href="style.css" />
</head>
<body>

  <div class="ambient-glow"></div>

  <!-- Barra de Navegación -->
  <nav>
    <a href="#" class="brand">
      <div class="brand-logo-small">
        <img src="logo-transparent.png" alt="Logo Capital en Juego" />
      </div>
      <div class="brand-title">CAPITAL EN <span>JUEGO</span></div>
    </a>
    <div class="nav-actions">
      <button id="btn-download-trigger" class="btn btn-secondary" onclick="descargarProyecto()">
        Descargar Archivos (.ZIP)
      </button>
    </div>
  </nav>

  <!-- Sección Principal (Hero) -->
  <main>
    <div class="hero-info">
      <div class="pill-badge">
        ⚽ Negocios &amp; Fútbol Profesional
      </div>
      <h1>
        Donde las Finanzas y la Pasión <span class="highlight">Se Disputan</span>.
      </h1>
      <p class="lead">
        Análisis ejecutivo, economía de fichajes y estrategias de arbitraje financiero en el deporte rey. La estrategia también juega.
      </p>
      <div class="cta-group">
        <a href="#contacto" class="btn btn-primary">Explorar Dossier</a>
        <button class="btn btn-secondary" onclick="cambiarModo('original')">Ver Lienzo Original</button>
      </div>
    </div>

    <!-- Módulo del Logotipo Oficial -->
    <div class="logo-showcase-card">
      <div class="card-topbar">
        <span class="badge-title">★ Emblema Oficial</span>
        <div class="mode-switch">
          <button id="btn-original" class="active" onclick="cambiarModo('original')">Lienzo Original</button>
          <button id="btn-badge" onclick="cambiarModo('badge')">Insignia</button>
        </div>
      </div>

      <div class="logo-stage">
        <!-- Vista 1: Lienzo Original Marfil -->
        <div id="view-original" class="frame-original floating-logo">
          <img src="logo.png" alt="Logotipo Oficial Capital en Juego" />
        </div>

        <!-- Vista 2: Insignia Flotante Transparente -->
        <div id="view-badge" class="frame-badge floating-logo" style="display: none;">
          <img src="logo-transparent.png" alt="Insignia Capital en Juego" />
        </div>
      </div>

      <div class="card-footer">
        Identidad Corporativa — <strong>«Capital en Juego»</strong>
      </div>
    </div>
  </main>

  <!-- Script JavaScript -->
  <script src="app.js"></script>
</body>
</html>
"""

with open('public/downloads/index.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

# 2. CSS file
css_content = """/* ====================================================
   Capital en Juego - Estilos Oficiales (style.css)
   ==================================================== */
:root {
  --bg-dark: #080c10;
  --card-bg: #0f1722;
  --gold: #f4b328;
  --gold-light: #fce38a;
  --gold-dark: #b88214;
  --green-dark: #12332c;
  --green-emerald: #10b981;
  --ivory: #f7efe1;
  --text-muted: #94a3b8;
  --text-light: #f8fafc;
  --border-color: rgba(244, 179, 40, 0.25);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--bg-dark);
  color: var(--text-light);
  font-family: 'Plus Jakarta Sans', sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
}

/* Efecto ambiental de luz en el fondo */
.ambient-glow {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 900px;
  height: 600px;
  background: radial-gradient(circle at 50% 20%, rgba(244, 179, 40, 0.14) 0%, rgba(16, 185, 129, 0.06) 45%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

/* Barra de Navegación */
nav {
  width: 100%;
  max-width: 1200px;
  padding: 1.25rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 10;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  text-decoration: none;
  color: inherit;
}

.brand-logo-small {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid var(--border-color);
  background: rgba(244, 179, 40, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0 0 15px rgba(244, 179, 40, 0.2);
}

.brand-logo-small img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.brand-title {
  font-family: 'Cinzel', serif;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.brand-title span {
  color: var(--gold);
}

/* Disposición Principal (Hero Grid) */
main {
  width: 100%;
  max-width: 1200px;
  padding: 3.5rem 1.5rem 5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3.5rem;
  align-items: center;
  position: relative;
  z-index: 1;
}

@media (max-width: 900px) {
  main {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    padding-top: 1.5rem;
  }
}

.hero-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.pill-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.9rem;
  border-radius: 9999px;
  background: rgba(244, 179, 40, 0.08);
  border: 1px solid var(--border-color);
  color: var(--gold-light);
  font-size: 0.85rem;
  width: fit-content;
  font-weight: 500;
}

h1 {
  font-family: 'Cinzel', serif;
  font-size: clamp(2.25rem, 4.5vw, 3.75rem);
  line-height: 1.1;
  font-weight: 900;
  letter-spacing: -0.01em;
}

h1 .highlight {
  background: linear-gradient(135deg, #ffffff, var(--gold));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

p.lead {
  color: var(--text-muted);
  font-size: 1.1rem;
  line-height: 1.65;
}

.cta-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.5rem;
}

.btn {
  padding: 0.85rem 1.75rem;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.25s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-primary {
  background: linear-gradient(135deg, var(--gold), var(--gold-dark));
  color: #0d1218;
  border: none;
  box-shadow: 0 4px 20px rgba(244, 179, 40, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(244, 179, 40, 0.45);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #ffffff;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
}

/* Tarjeta del Logotipo */
.logo-showcase-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 1.5rem;
  padding: 1.5rem;
  position: relative;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 40px rgba(244, 179, 40, 0.12);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-topbar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 0.85rem;
}

.badge-title {
  color: var(--gold);
  font-weight: 600;
}

.mode-switch {
  display: flex;
  background: rgba(8, 12, 16, 0.9);
  padding: 3px;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.mode-switch button {
  background: transparent;
  border: none;
  color: var(--text-muted);
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.mode-switch button.active {
  background: rgba(244, 179, 40, 0.2);
  color: var(--gold-light);
  font-weight: 600;
  border: 1px solid rgba(244, 179, 40, 0.35);
}

.logo-stage {
  padding: 2.5rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 380px;
  position: relative;
}

/* Animación sutil de levitación */
.floating-logo {
  animation: floatEffect 4.5s ease-in-out infinite;
  transition: all 0.3s ease;
  max-width: 100%;
}

@keyframes floatEffect {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
}

.frame-original {
  background: var(--ivory);
  border-radius: 1.25rem;
  padding: 0.5rem;
  border: 2px solid rgba(244, 179, 40, 0.4);
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.85);
  display: flex;
}

.frame-original img {
  width: 330px;
  max-width: 100%;
  height: auto;
  border-radius: 1rem;
  display: block;
}

.frame-badge {
  display: flex;
}

.frame-badge img {
  width: 340px;
  max-width: 100%;
  height: auto;
  filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.9));
}

.card-footer {
  width: 100%;
  text-align: center;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 0.85rem;
  color: var(--text-muted);
}

.card-footer strong {
  color: var(--gold);
}
"""

with open('public/downloads/style.css', 'w', encoding='utf-8') as f:
    f.write(css_content)

# 3. JS file
js_content = """/**
 * Capital en Juego - Lógica Interactiva (app.js)
 */

// Cambiar entre vista de Lienzo Original e Insignia Flotante
function cambiarModo(modo) {
  const viewOriginal = document.getElementById('view-original');
  const viewBadge = document.getElementById('view-badge');
  const btnOriginal = document.getElementById('btn-original');
  const btnBadge = document.getElementById('btn-badge');

  if (!viewOriginal || !viewBadge) return;

  if (modo === 'original') {
    viewOriginal.style.display = 'flex';
    viewBadge.style.display = 'none';
    if (btnOriginal) btnOriginal.classList.add('active');
    if (btnBadge) btnBadge.classList.remove('active');
  } else {
    viewOriginal.style.display = 'none';
    viewBadge.style.display = 'flex';
    if (btnBadge) btnBadge.classList.add('active');
    if (btnOriginal) btnOriginal.classList.remove('active');
  }
}

// Descarga directa del archivo ZIP
function descargarProyecto() {
  const link = document.createElement('a');
  link.href = 'capital-en-juego.zip';
  link.download = 'capital-en-juego.zip';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  console.log('Capital en Juego inicializado con éxito.');
});
"""

with open('public/downloads/app.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

# Copy the images to public/downloads/
shutil.copyfile('public/logo.png', 'public/downloads/logo.png')
shutil.copyfile('public/logo-transparent.png', 'public/downloads/logo-transparent.png')
shutil.copyfile('public/logo.svg', 'public/downloads/logo.svg')

# Create the ZIP package
zip_path = 'public/downloads/capital-en-juego.zip'
with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
    zipf.write('public/downloads/index.html', 'index.html')
    zipf.write('public/downloads/style.css', 'style.css')
    zipf.write('public/downloads/app.js', 'app.js')
    zipf.write('public/downloads/logo.png', 'logo.png')
    zipf.write('public/downloads/logo-transparent.png', 'logo-transparent.png')
    zipf.write('public/downloads/logo.svg', 'logo.svg')

# Also copy zip to public/ and dist/
shutil.copyfile(zip_path, 'public/capital-en-juego.zip')
if os.path.exists('dist'):
    os.makedirs('dist/downloads', exist_ok=True)
    for fname in os.listdir('public/downloads'):
        shutil.copyfile(os.path.join('public/downloads', fname), os.path.join('dist/downloads', fname))
    shutil.copyfile(zip_path, 'dist/capital-en-juego.zip')

print("Created all downloadable files and ZIP package successfully!")
