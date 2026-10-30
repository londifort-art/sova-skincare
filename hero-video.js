// Load one appropriately sized silent film; keep the poster for data-saving users.
(() => {
  const video = document.getElementById('heroVideo');
  const toggle = document.getElementById('heroVideoToggle');
  if (!video || !toggle) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const connection = navigator.connection;
  let manuallyPaused = false;
  let onScreen = true;

  const mayAutoplay = () => !reducedMotion.matches && !connection?.saveData;
  function syncButton() {
    const playing = !video.paused;
    const key = playing ? 'hero.video.pause' : 'hero.video.play';
    const label = toggle.querySelector('[data-i18n]');
    label.dataset.i18n = key;
    label.textContent = translations[currentLang]?.[key] || translations.en[key];
    toggle.classList.toggle('is-playing', playing);
  }
  function loadSource() {
    if (video.getAttribute('src')) return;
    video.muted = true;
    video.src = window.matchMedia('(max-width: 768px)').matches ? video.dataset.mobileSrc : video.dataset.desktopSrc;
    video.load();
  }
  async function play() {
    loadSource();
    try { await video.play(); } catch { syncButton(); }
  }
  function updatePlayback() {
    if (document.hidden || !onScreen) { video.pause(); return; }
    if (!manuallyPaused && mayAutoplay()) play();
  }
  video.addEventListener('playing', () => {
    video.classList.add('has-frame');
    syncButton();
  });
  video.addEventListener('pause', syncButton);
  video.addEventListener('error', () => {
    video.classList.remove('has-frame');
    video.removeAttribute('src');
    syncButton();
  });
  toggle.addEventListener('click', () => {
    if (video.paused) { manuallyPaused = false; play(); }
    else { manuallyPaused = true; video.pause(); }
  });
  document.addEventListener('visibilitychange', updatePlayback);
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) video.pause();
    else updatePlayback();
  });
  new IntersectionObserver(entries => {
    onScreen = entries[0].isIntersecting;
    updatePlayback();
  }, {threshold: 0}).observe(document.getElementById('hero'));
  syncButton();
  updatePlayback();
})();
