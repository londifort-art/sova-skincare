// Native silent autoplay with a direct gesture retry for mobile browser restrictions.
(() => {
  const video = document.getElementById('heroVideo');
  const toggle = document.getElementById('heroVideoToggle');
  if (!video || !toggle) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const connection = navigator.connection;
  let manuallyPaused = false;
  let requestedByUser = false;
  let playPending = false;
  const hero = document.getElementById('hero');
  let onScreen = hero.getBoundingClientRect().bottom > 0 && hero.getBoundingClientRect().top < window.innerHeight;

  const mayAutoplay = () => !reducedMotion.matches && !connection?.saveData;
  const shouldPlay = () => !manuallyPaused && (requestedByUser || mayAutoplay()) && !document.hidden && onScreen;
  video.defaultMuted = true;
  video.muted = true;
  video.playsInline = true;
  video.autoplay = mayAutoplay();

  function syncButton() {
    const playing = !video.paused;
    const key = playing ? 'hero.video.pause' : 'hero.video.play';
    const label = toggle.querySelector('[data-i18n]');
    label.dataset.i18n = key;
    label.textContent = translations[currentLang]?.[key] || translations.en[key];
    toggle.classList.toggle('is-playing', playing);
  }
  function play(fromGesture = false) {
    if (!shouldPlay() || (playPending && !fromGesture)) return;
    video.hidden = false;
    if (video.error) video.load();
    playPending = true;
    // Call play synchronously within the click/touch handler, before awaiting anything.
    const attempt = video.play();
    if (!attempt?.then) { playPending = false; return; }
    attempt.catch(() => {
      if (shouldPlay()) toggle.classList.add('needs-gesture');
      syncButton();
    }).finally(() => { playPending = false; });
  }
  function updatePlayback() {
    if (document.hidden || !onScreen) { video.pause(); return; }
    if (shouldPlay()) play();
  }
  video.addEventListener('playing', () => {
    toggle.classList.remove('needs-gesture');
    syncButton();
  });
  video.addEventListener('canplay', updatePlayback);
  video.addEventListener('pause', syncButton);
  video.addEventListener('error', () => {
    video.hidden = true;
    toggle.classList.add('needs-gesture');
    syncButton();
  });
  toggle.addEventListener('click', () => {
    if (video.paused) {
      manuallyPaused = false;
      requestedByUser = true;
      play(true);
    } else {
      manuallyPaused = true;
      video.autoplay = false;
      video.pause();
    }
  });
  function retryFromGesture(event) {
    if (event.target.closest?.('#heroVideoToggle')) return;
    if (video.paused && !manuallyPaused && mayAutoplay()) play(true);
  }
  document.addEventListener('touchend', retryFromGesture, {passive: true});
  document.addEventListener('click', retryFromGesture);
  document.addEventListener('visibilitychange', updatePlayback);
  window.addEventListener('pageshow', updatePlayback);
  window.addEventListener('pagehide', () => video.pause());
  reducedMotion.addEventListener('change', () => {
    video.autoplay = mayAutoplay();
    if (reducedMotion.matches) { requestedByUser = false; video.pause(); }
    else updatePlayback();
  });
  new IntersectionObserver(entries => {
    onScreen = entries[0].isIntersecting;
    updatePlayback();
  }, {threshold: 0}).observe(hero);
  if (!mayAutoplay()) video.pause();
  syncButton();
  updatePlayback();
})();
