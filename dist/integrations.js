(() => {
  'use strict';
  const ecosystem = document.querySelector('.integration-ecosystem');
  if (!ecosystem || !('IntersectionObserver' in window)) return;
  const root = document.documentElement;
  const systemMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false;

  function syncMotion() {
    let savedReduced = false;
    try { savedReduced = localStorage.getItem('quiktalk-reduce-motion') === 'true'; } catch {}
    const reduced = systemMotion.matches || root.dataset.motion === 'reduced' || savedReduced;
    ecosystem.classList.toggle('is-in-view', visible && !reduced && !document.hidden);
  }

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    syncMotion();
  }, { threshold: 0 }).observe(ecosystem);
  systemMotion.addEventListener('change', syncMotion);
  new MutationObserver(syncMotion).observe(root, { attributes: true, attributeFilter: ['data-motion'] });
  document.addEventListener('visibilitychange', syncMotion);
  window.addEventListener('storage', syncMotion);
})();
