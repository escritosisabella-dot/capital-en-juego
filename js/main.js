/**
 * Capital en Juego — Script Principal y Motor de Animaciones (js/main.js)
 * Interactividad nativa: scroll reveals, perspectiva 3D, filtros y conmutadores
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Conmutador del Logotipo Showcase en Hero con el nuevo Emblema
  const tabBtns = document.querySelectorAll('.card-tab-btn');
  const imgLogo = document.getElementById('showcase-logo-img');

  if (tabBtns && imgLogo) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const mode = btn.getAttribute('data-mode');
        imgLogo.style.opacity = '0';
        imgLogo.style.transform = 'scale(0.92)';

        setTimeout(() => {
          if (mode === 'emblema') {
            imgLogo.src = 'assets/capital-en-juego-emblema.jpg';
            imgLogo.alt = 'Emblema Oficial Capital en Juego';
            imgLogo.classList.add('emblem-img');
          } else if (mode === 'original') {
            imgLogo.src = 'assets/logo.png';
            imgLogo.alt = 'Logotipo Oficial en Lienzo';
            imgLogo.classList.remove('emblem-img');
          } else if (mode === 'badge') {
            imgLogo.src = 'assets/logo-transparent.png';
            imgLogo.alt = 'Insignia Flotante Transparente';
            imgLogo.classList.remove('emblem-img');
          }
          imgLogo.style.opacity = '1';
          imgLogo.style.transform = 'scale(1)';
        }, 200);
      });
    });
  }

  // 2. Efecto de inclinación 3D al mover el ratón en la tarjeta Hero
  const heroCard = document.querySelector('.hero-card');
  if (heroCard) {
    heroCard.addEventListener('mousemove', (e) => {
      const rect = heroCard.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = -(y / rect.height) * 14;
      const rotateY = (x / rect.width) * 14;
      heroCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    heroCard.addEventListener('mouseleave', () => {
      heroCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
  }

  // 3. Filtro interactivo de la Galería
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
          }, index * 40);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // 4. Animaciones de revelado al hacer scroll (Intersection Observer)
  const revealElements = document.querySelectorAll('.feature-card, .objective-card, .concept-card, .step-card, .company-card, .gallery-item, .section-header');
  
  revealElements.forEach(el => el.classList.add('reveal-init'));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('reveal-visible');
          }, 60);
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('reveal-visible'));
  }

  // 5. Navbar Scrolled Effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 6. Menú móvil interactivo
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
        navLinks.style.background = '#05080d';
        navLinks.style.padding = '1.75rem';
        navLinks.style.borderBottom = '1px solid rgba(244,179,40,0.2)';
      }
    });
  }

  console.log('⚡ Capital en Juego: Animaciones y motor UI activos.');
});
