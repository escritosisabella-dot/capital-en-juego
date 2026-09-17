/**
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
