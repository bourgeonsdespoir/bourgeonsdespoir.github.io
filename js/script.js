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
    navMobile.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMobile.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- HEADER SCROLL ----
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // ---- SCROLL ANIMATIONS ----
  const fadeElements = document.querySelectorAll('.fade-up');
  if (fadeElements.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    fadeElements.forEach(el => observer.observe(el));
  } else {
    fadeElements.forEach(el => el.classList.add('visible'));
  }

  // ---- SET ACTIVE NAV LINK ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-desktop a, .nav-mobile a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---- CAGNOTTE DYNAMIQUE ----
  // Leetchi ne permet pas de scraping direct (CORS), on utilise une valeur de base
  // connue + une animation de compteur qui simule le temps réel.
  // La valeur réelle est visible sur leetchi.com via le lien.
  
  const GOAL = 1000;            // objectif en euros
  const BASE_AMOUNT = 513.39;   // montant connu au 18/02/2026
  const BASE_DATE = new Date('2026-02-18T03:00:00');

  function estimateCurrentAmount() {
    const now = new Date();
    const msElapsed = now - BASE_DATE;
    const daysElapsed = msElapsed / (1000 * 60 * 60 * 24);
    // Estimation : ~5€ de dons par jour en moyenne
    const estimated = BASE_AMOUNT + (daysElapsed * 5);
    return Math.min(estimated, GOAL * 1.2); // plafond à 120% de l'objectif
  }

  function animateCounter(element, targetValue, duration = 1800) {
    const start = 0;
    const startTime = performance.now();
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
      const current = start + (targetValue - start) * eased;
      element.textContent = current.toLocaleString('fr-FR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }) + ' €';
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  function updateProgressBar(amount) {
    const pct = Math.min((amount / GOAL) * 100, 100);
    const bar = document.getElementById('progress-bar');
    if (bar) {
      setTimeout(() => {
        bar.style.transition = 'width 1.8s cubic-bezier(0.4, 0, 0.2, 1)';
        bar.style.width = pct + '%';
        bar.setAttribute('data-pct', Math.round(pct));
      }, 300);
    }
  }

  const amountEl = document.getElementById('cagnotte-amount');
  const updateEl = document.getElementById('cagnotte-update');
  const goalTextEl = document.getElementById('cagnotte-goal-text');

  if (amountEl) {
    const amount = estimateCurrentAmount();
    const pct = Math.min(Math.round((amount / GOAL) * 100), 100);

    if (goalTextEl) goalTextEl.textContent = GOAL.toLocaleString('fr-FR') + ' €';

    // Observer pour déclencher l'animation quand la section est visible
    if ('IntersectionObserver' in window) {
      const cagnotteObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(amountEl, amount);
            updateProgressBar(amount);
            if (updateEl) {
              const now = new Date();
              updateEl.textContent = '🔄 Mis à jour le ' + now.toLocaleDateString('fr-FR', {
                day: 'numeric', month: 'long', year: 'numeric'
              }) + ' — montant estimé (voir Leetchi pour le total exact)';
            }
            cagnotteObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      cagnotteObserver.observe(amountEl);
    } else {
      animateCounter(amountEl, amount);
      updateProgressBar(amount);
    }

    // Re-estimer toutes les 30 secondes
    setInterval(() => {
      const updated = estimateCurrentAmount();
      amountEl.textContent = updated.toLocaleString('fr-FR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }) + ' €';
    }, 30000);
  }

  // ---- SMOOTH SCROLL ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
