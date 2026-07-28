// ===== LANGUAGE SWITCHER =====
let currentLang = localStorage.getItem('sova-lang') || 'en';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('sova-lang', lang);
  document.documentElement.lang = lang;

  // Update all translatable elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translations[lang][key];
      } else {
        el.innerHTML = translations[lang][key];
      }
    }
  });

  // Update active state on switcher buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

// Init language on load
document.addEventListener('DOMContentLoaded', () => {
  // Set up lang buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });
  setLanguage(currentLang);
});

// ===== NAVBAR SCROLL =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ===== MOBILE MENU =====
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navBackdrop = document.getElementById('navBackdrop');
const drawerClose = document.getElementById('drawerClose');

function toggleMobileMenu() {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
  if (navBackdrop) navBackdrop.classList.toggle('active');
  document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
  navToggle.classList.remove('active');
  navLinks.classList.remove('active');
  if (navBackdrop) navBackdrop.classList.remove('active');
  document.body.style.overflow = '';
}

navToggle.addEventListener('click', toggleMobileMenu);
if (drawerClose) drawerClose.addEventListener('click', closeMobileMenu);
if (navBackdrop) navBackdrop.addEventListener('click', closeMobileMenu);

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

// ===== HERO BG ZOOM =====
window.addEventListener('load', () => {
  document.querySelector('.hero-bg')?.classList.add('loaded');
});

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const position = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: position, behavior: 'smooth' });
    }
  });
});

// ===== PARALLAX SUBTLE =====
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrolled = window.scrollY;
      const heroImg = document.querySelector('.hero-bg img');
      if (heroImg && scrolled < window.innerHeight) {
        heroImg.style.transform = `scale(${1 + scrolled * 0.0001}) translateY(${scrolled * 0.15}px)`;
      }
      ticking = false;
    });
    ticking = true;
  }
});

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.about-stat-number');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const endValue = target.dataset.count;
      const suffix = target.dataset.suffix || '';
      let current = 0;
      const increment = Math.ceil(parseInt(endValue) / 40);
      const timer = setInterval(() => {
        current += increment;
        if (current >= parseInt(endValue)) {
          target.textContent = endValue + suffix;
          clearInterval(timer);
        } else {
          target.textContent = current + suffix;
        }
      }, 40);
      counterObserver.unobserve(target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

// ===== PRICE ACCORDION & TABS =====
document.addEventListener('DOMContentLoaded', () => {
  const priceTabsContainer = document.getElementById('priceTabs');
  const priceTabs = document.querySelectorAll('.price-tab');
  const accordionCards = document.querySelectorAll('.price-accordion-card');
  let isTabClicking = false;
  let tabClickTimeout = null;

  // Center active tab horizontally in the tab bar without affecting window scroll
  function centerTabInBar(tab) {
    if (!priceTabsContainer || !tab) return;
    const tabOffset = tab.offsetLeft;
    const tabWidth = tab.offsetWidth;
    const containerWidth = priceTabsContainer.clientWidth;
    priceTabsContainer.scrollTo({
      left: tabOffset - (containerWidth / 2) + (tabWidth / 2),
      behavior: 'smooth'
    });
  }

  // Toggle card expand/collapse
  accordionCards.forEach(card => {
    const header = card.querySelector('.price-card-header');
    if (!header) return;
    header.addEventListener('click', () => {
      const isOpen = card.classList.toggle('open');
      header.setAttribute('aria-expanded', isOpen);
    });
  });

  // Quick jump tabs
  priceTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      isTabClicking = true;
      if (tabClickTimeout) clearTimeout(tabClickTimeout);

      const targetId = tab.dataset.target;
      const targetCard = document.getElementById(targetId);

      // Active tab styling
      priceTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      centerTabInBar(tab);

      if (targetCard) {
        // Expand target card if closed
        if (!targetCard.classList.contains('open')) {
          targetCard.classList.add('open');
          const header = targetCard.querySelector('.price-card-header');
          if (header) header.setAttribute('aria-expanded', 'true');
        }

        // Smooth scroll to target card with navbar offset
        const offset = 90;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = targetCard.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }

      tabClickTimeout = setTimeout(() => {
        isTabClicking = false;
      }, 1000);
    });
  });

  // IntersectionObserver to highlight active tab as user scrolls naturally
  const observer = new IntersectionObserver(entries => {
    if (isTabClicking) return; // Don't conflict with tab click smooth scroll

    entries.forEach(entry => {
      if (entry.isIntersecting && entry.target.classList.contains('open')) {
        const id = entry.target.id;
        priceTabs.forEach(tab => {
          const isActive = tab.dataset.target === id;
          if (isActive && !tab.classList.contains('active')) {
            tab.classList.add('active');
            centerTabInBar(tab);
          } else if (!isActive) {
            tab.classList.remove('active');
          }
        });
      }
    });
  }, { rootMargin: '-20% 0px -50% 0px', threshold: 0.1 });

  accordionCards.forEach(card => observer.observe(card));
});



