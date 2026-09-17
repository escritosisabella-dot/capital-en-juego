/**
 * Capital en Juego — Motor de Animaciones Lúdicas & UI (js/main.js)
 * Efectos elásticos, rebote de caricatura (Rubberhose), inclinación 3D,
 * confeti dinámico y tipografía animada interactiva.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Animación de rebote gelatinoso al hacer clic en el Emblema Oficial
  const emblemWrapper = document.querySelector('.emblem-wrapper');
  if (emblemWrapper) {
    emblemWrapper.addEventListener('click', (e) => {
      emblemWrapper.classList.remove('wobble-active');
      void emblemWrapper.offsetWidth; // Forzar reflujo para reiniciar la animación
      emblemWrapper.classList.add('wobble-active');
      createConfetti(e.clientX, e.clientY, 24);

      if (navigator.vibrate) {
        navigator.vibrate([30, 40, 30]);
      }
    });
  }

  // 2. Efecto de inclinación 3D interactivo en la tarjeta del Emblema
  const heroCard = document.querySelector('.hero-card');
  if (heroCard) {
    heroCard.addEventListener('mousemove', (e) => {
      const rect = heroCard.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = -(y / rect.height) * 16;
      const rotateY = (x / rect.width) * 16;
      heroCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    heroCard.addEventListener('mouseleave', () => {
      heroCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
  }

  // 3. Tipografía Cutout interactiva: rebote y confeti al tocar letras de "Capital en Juego"
  const letters = document.querySelectorAll('.c-letter');
  letters.forEach((letter) => {
    letter.addEventListener('click', (e) => {
      letter.style.transform = 'translateY(-20px) scale(1.4) rotate(15deg)';
      createConfetti(e.clientX, e.clientY, 12);
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

  // 5. Filtro interactivo de la Galería con animación pop
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');

      galleryItems.forEach((item, index) => {
        const itemCategory = item.getAttribute('data-category');
        if (category === 'todas' || itemCategory === category) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0) scale(1)';
          }, index * 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.92)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // 6. Animaciones de revelado elásticas al hacer scroll (Intersection Observer)
  const revealElements = document.querySelectorAll('.feature-card, .objective-card, .concept-card, .step-card, .company-card, .gallery-item, .section-header');
  
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

  // 7. Navbar Scrolled Glassmorphism Effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 35) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 8. Menú móvil
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

  // 9. Cañón de Confeti Cartoon
  function createConfetti(x, y, count = 20) {
    const colors = ['#f87171', '#60a5fa', '#fde047', '#a3e635', '#fb923c', '#c084fc', '#ffffff'];
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
      confetti.style.height = shape === 'streamer' ? `${size * 2}px` : `${size}px`;
      confetti.style.backgroundColor = color;
      confetti.style.borderRadius = shape === 'circle' ? '50%' : '2px';
      confetti.style.pointerEvents = 'none';
      confetti.style.zIndex = '99999';
      confetti.style.transition = 'all 0.9s cubic-bezier(0.25, 1, 0.5, 1)';

      document.body.appendChild(confetti);

      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 120 + 40;
      const destX = Math.cos(angle) * velocity;
      const destY = Math.sin(angle) * velocity - 30; // Tendencia hacia arriba
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

  console.log('⚽ Capital en Juego: Motor de animaciones retro-cartoon activo v5.0.');
});
