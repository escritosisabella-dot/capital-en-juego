<div align="center">
  <img width="1200" height="475" alt="Banner Capital en Juego" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
  <h1>⚽ Capital en Juego — Plataforma Oficial</h1>
  <p><em>Actividad deportiva y gerencial que une el fútbol con la administración de empresas. La estrategia también juega.</em></p>
</div>

---

## 🏛️ Arquitectura del Repositorio

El repositorio está estructurado bajo una arquitectura limpia, profesional e intuitiva:

```text
capital_juego/
│
├── index.html                   # 🌐 Página Web Principal (Abre directo con doble clic, sin pantalla blanca)
│
├── css/                         # 🎨 Hojas de Estilo CSS
│   └── styles.css               # Estilos globales, variables, diseño responsive y efectos visuales
│
├── js/                          # ⚡ Lógica Interactiva JavaScript
│   └── main.js                  # Control de filtros de galería, conmutador de logos y UI
│
├── assets/                      # 🖼️ Recursos Multimedia y Gráficos
│   ├── logo.png                 # Logotipo oficial en lienzo
│   ├── logo-transparent.png     # Logotipo en formato insignia transparente
│   ├── logo.svg                 # Versión vectorial SVG
│   └── hero-bg.jpg              # Imagen de fondo principal
│
├── src/                         # ⚛️ Código Fuente Modular (React 19 + TypeScript)
│   ├── components/              # Componentes clasificados por dominio
│   │   ├── 3d/                  # Visualización Three.js (Ball3D)
│   │   ├── layout/              # Navbar, Hero, Footer
│   │   ├── modals/              # Ventanas modales interactivas
│   │   └── sections/            # Secciones del juego (Objetivos, Reglas, Empresas, etc.)
│   ├── styles/                  # Estilos CSS de la versión React
│   │   └── index.css
│   ├── data/                    # Datos estructurados del juego (gameData.ts)
│   ├── utils/                   # Utilidades matemáticas y gráficas
│   ├── types.ts                 # Definiciones e interfaces de TypeScript
│   ├── App.tsx                  # Componente principal React
│   └── main.tsx                 # Entrada de la aplicación React
│
├── public/                      # Recursos y texturas públicas
├── scripts/                     # Scripts de generación gráfica (Python)
├── package.json                 # Configuración de dependencias
└── tsconfig.json                # Configuración TypeScript
```

---

## 🚀 Cómo Visualizar el Proyecto

### 1. Vista Directa (Sin Instalar Nada)
1. Descarga o clona el repositorio.
2. Haz **doble clic en `index.html`**.
3. La página se abrirá inmediatamente en cualquier navegador (Chrome, Edge, Firefox, Safari) mostrando todas las secciones del juego, galería, reglas y estilos activos con **cero errores de pantalla blanca**.

---

### 2. Entorno React + TypeScript (Para Desarrolladores)
Si deseas trabajar con los componentes modulares en React:
```bash
npm install
npm run dev
```
