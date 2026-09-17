/**
 * Capital en Juego — Motor de Animaciones Lúdicas & UI (js/main.js)
 * Efectos elásticos, rebote de caricatura (Rubberhose), inclinación 3D,
 * confeti dinámico y tipografía animada interactiva.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Animación de rebote gelatinoso e inclinación al interactuar con el Emblema
  const emblemWrapper = document.querySelector('.emblem-wrapper-standalone, .emblem-wrapper');
  if (emblemWrapper) {
    emblemWrapper.addEventListener('click', (e) => {
      emblemWrapper.classList.remove('wobble-active');
      void emblemWrapper.offsetWidth; // Forzar reflujo para reiniciar la animación
      emblemWrapper.classList.add('wobble-active');
      createConfetti(e.clientX, e.clientY, 28);

      if (navigator.vibrate) {
        navigator.vibrate([30, 40, 30]);
      }
    });

    emblemWrapper.addEventListener('mousemove', (e) => {
      const rect = emblemWrapper.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = -(y / rect.height) * 14;
      const rotateY = (x / rect.width) * 14;
      emblemWrapper.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    emblemWrapper.addEventListener('mouseleave', () => {
      emblemWrapper.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
  }

  // 2. Tipografía Cutout interactiva: rebote y confeti al tocar letras de "capital en juego"
  const letters = document.querySelectorAll('.c-letter');
  letters.forEach((letter) => {
    letter.addEventListener('click', (e) => {
      letter.style.transform = 'translateY(-20px) scale(1.45) rotate(12deg)';
      createConfetti(e.clientX, e.clientY, 14);
      setTimeout(() => {
        letter.style.transform = '';
      }, 350);
    });
  });

  // 3. Confeti en botones principales
  const ctaButtons = document.querySelectorAll('.btn-primary, .nav-btn');
  ctaButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const rect = btn.getBoundingClientRect();
      createConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 30);
    });
  });

  // 4. Animaciones de revelado elásticas al hacer scroll (Intersection Observer)
  const revealElements = document.querySelectorAll('.concept-card, .team-card, .mecanica-card, .why-admin-box, .gallery-card, .section-header, .concept-lead-box, .winner-card, .objective-banner');
  
  revealElements.forEach(el => el.classList.add('reveal-init'));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('reveal-visible');
          }, 80);
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('reveal-visible'));
  }

  // 5. Navbar Scrolled Glassmorphism Effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 35) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 6. Menú móvil
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isVisible = navLinks.style.display === 'flex';
      navLinks.style.display = isVisible ? 'none' : 'flex';
      if (!isVisible) {
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = '#0a1411';
        navLinks.style.padding = '1.75rem';
        navLinks.style.borderBottom = '3px solid var(--gold-bright)';
      }
    });
  }

  // 7. Cañón de Confeti Cartoon
  function createConfetti(x, y, count = 20) {
    const colors = ['#d8271e', '#275a9e', '#f6c728', '#7ba02d', '#f17822', '#9333ea', '#ffffff'];
    const shapes = ['square', 'circle', 'streamer'];

    for (let i = 0; i < count; i++) {
      const confetti = document.createElement('div');
      const color = colors[Math.floor(Math.random() * colors.length)];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const size = Math.random() * 8 + 7;

      confetti.className = 'confetti-particle';
      confetti.style.position = 'fixed';
      confetti.style.left = `${x}px`;
      confetti.style.top = `${y}px`;
      confetti.style.width = `${size}px`;
      confetti.style.height = shape === 'streamer' ? `${size * 2.2}px` : `${size}px`;
      confetti.style.backgroundColor = color;
      confetti.style.borderRadius = shape === 'circle' ? '50%' : '2px';
      confetti.style.pointerEvents = 'none';
      confetti.style.zIndex = '99999';
      confetti.style.transition = 'all 0.9s cubic-bezier(0.25, 1, 0.5, 1)';

      document.body.appendChild(confetti);

      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 140 + 40;
      const destX = Math.cos(angle) * velocity;
      const destY = Math.sin(angle) * velocity - 35; // Tendencia hacia arriba
      const rot = Math.random() * 720 - 360;

      requestAnimationFrame(() => {
        confetti.style.transform = `translate(${destX}px, ${destY}px) rotate(${rot}deg)`;
        confetti.style.opacity = '0';
      });

      setTimeout(() => {
        confetti.remove();
      }, 950);
    }
  }

  console.log('⚽ Capital en Juego: Motor de animaciones v6.0 activo.');
});
