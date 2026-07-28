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

// ===== PRICE CAROUSEL =====
document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('priceCarouselTrack');
  const allSlides = Array.from(document.querySelectorAll('.price-slide'));
  const prevBtn = document.getElementById('priceCarouselPrev');
  const nextBtn = document.getElementById('priceCarouselNext');
  const dotsNav = document.getElementById('priceDotsNav');
  const priceTabs = Array.from(document.querySelectorAll('.price-tab'));

  if (!track || allSlides.length === 0) return;

  // All tabs are single-category — each tab shows exactly 1 slide
  let currentTabIndex = 0; // index into priceTabs

  // Build the dot indicators (one per tab)
  function buildDots() {
    dotsNav.innerHTML = '';
    priceTabs.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'price-dot' + (i === currentTabIndex ? ' active' : '');
      dot.setAttribute('aria-label', `Slide ${i + 1}`);
      dot.addEventListener('click', () => goToTab(i));
      dotsNav.appendChild(dot);
    });
  }

  function updateDots() {
    const dots = dotsNav.querySelectorAll('.price-dot');
    dots.forEach((d, i) => d.classList.toggle('active', i === currentTabIndex));
  }

  function updateArrows() {
    if (prevBtn) prevBtn.disabled = currentTabIndex === 0;
    if (nextBtn) nextBtn.disabled = currentTabIndex >= priceTabs.length - 1;
  }

  function activateTab(index) {
    currentTabIndex = Math.max(0, Math.min(index, priceTabs.length - 1));

    const tab = priceTabs[currentTabIndex];
    const filter = tab.dataset.tab;

    // Update tab active state
    priceTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

    // Show only the matching slide, hide others
    allSlides.forEach(slide => {
      slide.style.display = slide.dataset.category === filter ? '' : 'none';
    });

    // Always reset transform (single visible slide)
    track.style.transform = 'translateX(0)';

    updateDots();
    updateArrows();
  }

  function goToTab(index) {
    activateTab(index);
  }

  // Tab click
  priceTabs.forEach((tab, i) => {
    tab.addEventListener('click', () => goToTab(i));
  });

  // Arrow navigation
  if (prevBtn) prevBtn.addEventListener('click', () => goToTab(currentTabIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goToTab(currentTabIndex + 1));

  // Touch swipe support
  let touchStartX = 0;
  let touchStartY = 0;
  let isDragging = false;

  track.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    isDragging = true;
  }, { passive: true });

  track.addEventListener('touchend', e => {
    if (!isDragging) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    const deltaY = e.changedTouches[0].clientY - touchStartY;
    isDragging = false;
    if (Math.abs(deltaX) < 40 || Math.abs(deltaX) < Math.abs(deltaY)) return;
    if (deltaX < 0) goToTab(currentTabIndex + 1);
    else goToTab(currentTabIndex - 1);
  }, { passive: true });

  // Mouse drag support (desktop)
  let mouseStartX = 0;
  let isMouseDragging = false;

  track.addEventListener('mousedown', e => {
    mouseStartX = e.clientX;
    isMouseDragging = true;
    track.style.cursor = 'grabbing';
  });

  document.addEventListener('mouseup', e => {
    if (!isMouseDragging) return;
    const deltaX = e.clientX - mouseStartX;
    isMouseDragging = false;
    track.style.cursor = '';
    if (Math.abs(deltaX) < 40) return;
    if (deltaX < 0) goToTab(currentTabIndex + 1);
    else goToTab(currentTabIndex - 1);
  });

  // Keyboard navigation (only when carousel is in viewport)
  document.addEventListener('keydown', e => {
    const carousel = document.getElementById('priceCarousel');
    if (!carousel) return;
    const rect = carousel.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (!inView) return;
    if (e.key === 'ArrowLeft') goToTab(currentTabIndex - 1);
    if (e.key === 'ArrowRight') goToTab(currentTabIndex + 1);
  });

  // Init — start on first tab (Consultations)
  buildDots();
  activateTab(0);
});

