/**
 * Capital en Juego — Motor de Animaciones Lúdicas & UI Adaptable (js/main.js)
 * Efectos elásticos, rebote de caricatura, inclinación 3D, confeti,
 * menú móvil responsive profesional y scroll suave.
 * v=8.0
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Menú Móvil Profesional y 100% Adaptable
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');
  const navOverlay = document.getElementById('nav-overlay');
  const navLinks = navMenu ? navMenu.querySelectorAll('a') : [];

  function openMobileMenu() {
    if (!mobileBtn || !navMenu) return;
    mobileBtn.classList.add('is-active');
    mobileBtn.setAttribute('aria-expanded', 'true');
    navMenu.classList.add('nav-open');
    if (navOverlay) navOverlay.classList.add('is-visible');
    document.body.style.overflow = 'hidden'; // Bloquear scroll de fondo
  }

  function closeMobileMenu() {
    if (!mobileBtn || !navMenu) return;
    mobileBtn.classList.remove('is-active');
    mobileBtn.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('nav-open');
    if (navOverlay) navOverlay.classList.remove('is-visible');
    document.body.style.overflow = ''; // Restaurar scroll
  }

  if (mobileBtn) {
    mobileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.contains('nav-open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', closeMobileMenu);
  }

  // Cerrar al hacer clic en cualquier enlace del menú
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Cerrar con la tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileMenu();
    }
  });

  // Cerrar automáticamente si se redimensiona a pantalla grande (>1024px)
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
      closeMobileMenu();
    }
  });

  // 2. Animación de rebote e inclinación al interactuar con el Emblema Oficial
  const emblemWrapper = document.querySelector('.emblem-wrapper-standalone, .emblem-wrapper');
  if (emblemWrapper) {
    emblemWrapper.addEventListener('click', (e) => {
      emblemWrapper.classList.remove('wobble-active');
      void emblemWrapper.offsetWidth; // Forzar reflujo
      emblemWrapper.classList.add('wobble-active');
      createConfetti(e.clientX, e.clientY, 28);

      if (navigator.vibrate) {
        navigator.vibrate([30, 40, 30]);
      }
    });

    // Solo habilitar inclinación 3D en dispositivos con puntero fino (ratón)
    if (window.matchMedia('(pointer: fine)').matches) {
      emblemWrapper.addEventListener('mousemove', (e) => {
        const rect = emblemWrapper.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotateX = -(y / rect.height) * 14;
        const rotateY = (x / rect.width) * 14;
        emblemWrapper.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
      });

      emblemWrapper.addEventListener('mouseleave', () => {
        emblemWrapper.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
      });
    }
  }

  // 3. Tipografía Cutout interactiva: rebote y confeti al tocar letras de "capital en juego"
  const letters = document.querySelectorAll('.c-letter');
  letters.forEach((letter) => {
    letter.addEventListener('click', (e) => {
      letter.style.transform = 'translateY(-18px) scale(1.4) rotate(12deg)';
      createConfetti(e.clientX, e.clientY, 14);
      setTimeout(() => {
        letter.style.transform = '';
      }, 350);
    });
  });

  // 4. Confeti en botones principales
  const ctaButtons = document.querySelectorAll('.btn-primary, .nav-btn');
  ctaButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const rect = btn.getBoundingClientRect();
      createConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 28);
    });
  });

  // 5. Animaciones de revelado elásticas al hacer scroll (Intersection Observer)
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
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('reveal-visible'));
  }

  // 6. Navbar Scrolled Glassmorphism Effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // 7. Cañón de Confeti Cartoon Optimizado
  function createConfetti(x, y, count = 20) {
    const colors = ['#d8271e', '#275a9e', '#f6c728', '#7ba02d', '#f17822', '#9333ea', '#ffffff'];
    const shapes = ['square', 'circle', 'streamer'];

    for (let i = 0; i < count; i++) {
      const confetti = document.createElement('div');
      const color = colors[Math.floor(Math.random() * colors.length)];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const size = Math.random() * 8 + 6;

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
      const velocity = Math.random() * 130 + 40;
      const destX = Math.cos(angle) * velocity;
      const destY = Math.sin(angle) * velocity - 35;
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

  console.log('⚽ Capital en Juego: Motor UI v8.0 listo y adaptable.');
});
