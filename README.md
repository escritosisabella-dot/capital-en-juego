<div align="center">
  <img width="1200" height="475" alt="Banner Capital en Juego" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
  <h1>⚽ Capital en Juego — Plataforma Oficial</h1>
  <p><em>Actividad deportiva y gerencial que une el fútbol con la administración de empresas. La estrategia también juega.</em></p>
</div>

---

## 🏛️ Arquitectura del Proyecto

Este repositorio cuenta con una arquitectura modular y organizada que soporta dos modalidades de uso:

```text
capital_juego/
│
├── static-web/                  # 🌐 Versión Web Estática (HTML / CSS / JS Directo)
│   ├── index.html               # Página web principal (abrible con doble clic)
│   ├── css/
│   │   └── style.css            # Hoja de estilos dedicada
│   ├── js/
│   │   └── app.js               # Lógica interactiva
│   └── assets/                  # Logotipos e imágenes estáticas
│
├── src/                         # ⚛️ Aplicación React 19 + TypeScript + Vite
│   ├── components/              # Componentes UI organizados modularmente
│   │   ├── 3d/                  # Visualización 3D del balón (Three.js)
│   │   │   └── Ball3D.tsx
│   │   ├── layout/              # Estructura principal
│   │   │   ├── Navbar.tsx
│   │   │   ├── Hero.tsx
│   │   │   └── Footer.tsx
│   │   ├── modals/              # Ventanas modales
│   │   │   └── DownloadModal.tsx
│   │   └── sections/            # Secciones informativas y dinámicas
│   │       ├── WhatIsIt.tsx
│   │       ├── Objectives.tsx
│   │       ├── HowToPlay.tsx
│   │       ├── CompaniesComparison.tsx
│   │       ├── CompanyPanel.tsx
│   │       ├── AdminConcepts.tsx
│   │       ├── Gallery.tsx
│   │       └── Learnings.tsx
│   ├── styles/                  # 🎨 Hojas de estilo y diseño
│   │   └── index.css            # Estilos globales y Tailwind CSS
│   ├── data/                    # Datos estructurados del juego
│   │   └── gameData.ts
│   ├── utils/                   # Utilidades matemáticas y gráficas
│   ├── types.ts                 # Definiciones de TypeScript
│   ├── App.tsx                  # Componente principal
│   └── main.tsx                 # Entrada React
│
├── public/                      # Recursos multimedia públicos servidos por Vite
│   ├── downloads/               # Paquetes y archivos para descarga
│   └── ...                      # Texturas 3D e imágenes de fondo
│
├── scripts/                     # Scripts auxiliares de generación gráfica (Python)
├── index.html                   # Punto de entrada para Vite
├── package.json                 # Dependencias y scripts de construcción
├── tsconfig.json                # Configuración de compilación TypeScript
└── vite.config.ts               # Configuración del empaquetador Vite
```

---

## 🚀 Opciones de Ejecución

### Opción A: Abrir Directamente (Sin Instalar Node.js)
Si solo deseas ver la página web en tu navegador de forma inmediata:
1. Abre la carpeta `static-web/`.
2. Haz doble clic en `index.html`.
3. ¡Listo! Se cargará el diseño con todos sus estilos CSS y JavaScript.

---

### Opción B: Entorno de Desarrollo React + Vite
Para correr la aplicación interactiva completa con gráficos 3D y componentes dinámicos:

**Requisitos previos:** [Node.js](https://nodejs.org/) instalado en tu equipo.

1. **Instalar dependencias:**
   ```bash
   npm install
   ```
2. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
3. **Construir para producción:**
   ```bash
   npm run build
   ```
