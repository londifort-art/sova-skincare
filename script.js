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

  // Update translatable placeholders
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (translations[lang] && translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });

  // Update active state on switcher buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Re-render open procedure modal if active
  if (typeof updateModalContent === 'function') {
    updateModalContent();
  }

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
  navToggle.setAttribute('aria-expanded', navToggle.classList.contains('active'));
  navLinks.classList.toggle('active');
  if (navBackdrop) navBackdrop.classList.toggle('active');
  document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
  navToggle.classList.remove('active');
  navToggle.setAttribute('aria-expanded', 'false');
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
    const href = this.getAttribute('href');
    const target = href === '#' ? document.getElementById('hero') : document.querySelector(href);
    if (target) {
      const offset = 80;
      const position = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: position, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }
  });
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
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
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
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
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

// ===== PROCEDURE DETAILS MODAL =====
let currentModalProcKey = null;

function openProcedureModal(procKey) {
  if (typeof procedureDescriptions === 'undefined' || !procedureDescriptions[procKey]) {
    console.warn('Procedure description not found for key:', procKey);
    return;
  }

  currentModalProcKey = procKey;
  updateModalContent();

  const modalOverlay = document.getElementById('procedureModal');
  if (modalOverlay) {
    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  }
}

function closeProcedureModal() {
  const modalOverlay = document.getElementById('procedureModal');
  if (modalOverlay) {
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }
  currentModalProcKey = null;
}

function updateModalContent() {
  if (!currentModalProcKey || typeof procedureDescriptions === 'undefined') return;
  const procData = procedureDescriptions[currentModalProcKey];
  if (!procData) return;

  const lang = (typeof currentLang !== 'undefined' ? currentLang : 'ru');
  const langData = procData[lang] || procData['ru'] || procData['lv'] || procData['en'];
  if (!langData) return;

  const badgeEl = document.getElementById('modalProcBadge');
  const titleEl = document.getElementById('modalProcTitle');
  const summaryEl = document.getElementById('modalProcSummary');
  const benefitsSec = document.getElementById('modalSectionBenefits');
  const benefitsList = document.getElementById('modalProcBenefits');
  const stepsSec = document.getElementById('modalSectionSteps');
  const stepsList = document.getElementById('modalProcSteps');
  const suitableSec = document.getElementById('modalSectionSuitable');
  const suitableTags = document.getElementById('modalProcSuitable');

  if (badgeEl) badgeEl.textContent = langData.category || '';
  if (titleEl) titleEl.textContent = langData.title || '';
  if (summaryEl) summaryEl.textContent = langData.summary || '';

  // Benefits
  if (benefitsSec && benefitsList) {
    if (langData.benefits && langData.benefits.length > 0) {
      benefitsSec.style.display = 'block';
      benefitsList.innerHTML = langData.benefits.map(b => `<li>${b}</li>`).join('');
    } else {
      benefitsSec.style.display = 'none';
    }
  }

  // Steps
  if (stepsSec && stepsList) {
    if (langData.steps && langData.steps.length > 0) {
      stepsSec.style.display = 'block';
      stepsList.innerHTML = langData.steps.map(s => `<li>${s}</li>`).join('');
    } else {
      stepsSec.style.display = 'none';
    }
  }

  // Suitable for
  if (suitableSec && suitableTags) {
    if (langData.suitableFor && langData.suitableFor.length > 0) {
      suitableSec.style.display = 'block';
      suitableTags.innerHTML = langData.suitableFor.map(t => `<span class="procedure-modal-tag">${t}</span>`).join('');
    } else {
      suitableSec.style.display = 'none';
    }
  }
}

// Bind modal listeners
document.addEventListener('DOMContentLoaded', () => {
  // Delegate clicks on info buttons
  document.addEventListener('click', (e) => {
    const infoBtn = e.target.closest('.price-info-btn');
    if (infoBtn) {
      e.preventDefault();
      e.stopPropagation();
      const procKey = infoBtn.getAttribute('data-procedure');
      if (procKey) {
        openProcedureModal(procKey);
      }
    }
  });

  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalSecondaryClose = document.getElementById('modalSecondaryClose');

  if (modalBackdrop) modalBackdrop.addEventListener('click', closeProcedureModal);
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProcedureModal);
  if (modalSecondaryClose) modalSecondaryClose.addEventListener('click', closeProcedureModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProcedureModal();
    }
  });
});




// Keep the mobile navigation usable with a keyboard and after rotation.
document.addEventListener('keydown', event => { if (event.key === 'Escape' && navLinks.classList.contains('active')) { closeMobileMenu(); navToggle.focus(); } });
window.matchMedia('(min-width: 1101px)').addEventListener('change', event => { if (event.matches) closeMobileMenu(); });
