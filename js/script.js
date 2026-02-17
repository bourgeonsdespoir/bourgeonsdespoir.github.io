/* ============================================
   BOURGEONS D'ESPOIR - JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- HAMBURGER MENU ----
  const hamburger = document.querySelector('.hamburger');
  const navMobile = document.querySelector('.nav-mobile');

  if (hamburger && navMobile) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMobile.classList.toggle('open');
      document.body.style.overflow = navMobile.classList.contains('open') ? 'hidden' : '';
    });

    // Close on link click
    navMobile.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMobile.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- HEADER SCROLL EFFECT ----
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // ---- DATE AUTOMATIQUE ETUD'IFTAR ----
  const dateTextEl = document.getElementById('hero-date-text');
  const dateEl = document.getElementById('hero-date');

  function updateDate() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const totalMinutes = hours * 60 + minutes;

    // Avant 17h00 (1020 min) → distribution d'aujourd'hui
    // À partir de 17h30 (1050 min) → prochaine distribution (demain)
    // Entre 17h00 et 17h30 → on bascule à "prochaine distribution" pour sécurité
    let targetDate;
    let label;

    if (totalMinutes < 1020) {
      // Avant 17h00
      label = "Inscrivez-vous à la distribution d'aujourd'hui";
      targetDate = new Date(now);
    } else {
      // 17h00 et après → prochaine distribution = demain
      label = "Inscrivez-vous à la prochaine distribution";
      targetDate = new Date(now);
      targetDate.setDate(targetDate.getDate() + 1);
    }

    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const dateString = 'Le ' + targetDate.toLocaleDateString('fr-FR', options);

    if (dateTextEl) dateTextEl.textContent = label;
    if (dateEl) dateEl.textContent = dateString;
  }

  if (dateTextEl && dateEl) {
    updateDate();
    // Update every minute
    setInterval(updateDate, 60000);
  }

  // ---- SCROLL ANIMATIONS (Intersection Observer) ----
  const fadeElements = document.querySelectorAll('.fade-up');

  if (fadeElements.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all
    fadeElements.forEach(el => el.classList.add('visible'));
  }

  // ---- PROGRESS BAR ANIMATION ----
  const progressFill = document.querySelector('.progress-bar-fill');
  if (progressFill) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = progressFill.getAttribute('data-width');
          progressFill.style.width = target + '%';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    observer.observe(progressFill);
  }

  // ---- CONTACT FORM ----
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Simple validation
      const name = contactForm.querySelector('[name="name"]');
      const email = contactForm.querySelector('[name="email"]');
      const message = contactForm.querySelector('[name="message"]');

      if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
        showFormMessage('Veuillez remplir tous les champs obligatoires.', 'error');
        return;
      }

      // Simulate success (no backend)
      showFormMessage('Merci pour votre message ! Nous vous répondrons rapidement. 🌱', 'success');
      contactForm.reset();
    });
  }

  function showFormMessage(text, type) {
    let msgEl = document.querySelector('.form-message');
    if (!msgEl) {
      msgEl = document.createElement('div');
      msgEl.className = 'form-message';
      contactForm.appendChild(msgEl);
    }
    msgEl.textContent = text;
    msgEl.className = 'form-message ' + type;

    setTimeout(() => {
      msgEl.style.display = 'none';
    }, 5000);
  }

  // ---- SMOOTH SCROLL for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- SET ACTIVE NAV LINK ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-desktop a, .nav-mobile a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

});
