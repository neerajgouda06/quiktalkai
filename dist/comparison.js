(() => {
  'use strict';
  const section = document.querySelector('#comparison');
  if (!section || !('IntersectionObserver' in window) || typeof Element.prototype.animate !== 'function') return;
  const root = document.documentElement;
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const small = matchMedia('(max-width:809px)');
  const seen = new WeakSet();
  const running = new Set();
  const reduced = () => preference.matches || root.dataset.motion === 'reduced';
  const cancel = () => { running.forEach(animation => animation.cancel()); running.clear(); };
  function play(element, frames, options) {
    if (reduced() || document.hidden || element.contains(document.activeElement)) return;
    const animation = element.animate(frames, { easing: 'cubic-bezier(.16,1,.3,1)', ...options });
    running.add(animation);
    animation.finished.then(() => running.delete(animation), () => running.delete(animation));
  }
  const observer = new IntersectionObserver(entries => {
    let rowDelay = 0;
    entries.forEach(entry => {
      if (!entry.isIntersecting || seen.has(entry.target)) return;
      const element = entry.target;
      seen.add(element);
      observer.unobserve(element);
      if (reduced() || document.hidden) return;
      if (element.matches('.comparison-row')) {
        const delay = rowDelay;
        rowDelay += small.matches ? 40 : 80;
        element.querySelectorAll('.comparison-cell').forEach(cell => play(cell, [
          { opacity: 0, transform: `translateY(${small.matches ? 8 : 14}px)` },
          { opacity: 1, transform: 'translateY(0)' }
        ], { duration: small.matches ? 380 : 560, delay, fill: 'backwards' }));
        play(element.querySelector('.comparison-check path'), [
          { strokeDashoffset: 1 }, { strokeDashoffset: 0 }
        ], { duration: 380, delay: delay + 180, fill: 'backwards' });
      } else if (element.matches('.comparison-panel')) {
        play(section.querySelector('.comparison-glow'), [
          { opacity: .3 }, { opacity: 1, offset: .45 }, { opacity: .65 }
        ], { duration: 1500 });
      } else {
        play(element, [{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 620 });
      }
    });
  }, { threshold: .15 });
  section.querySelectorAll('.comparison-heading,.comparison-panel,.comparison-row,.comparison-footer').forEach(element => observer.observe(element));
  preference.addEventListener('change', () => { if (reduced()) cancel(); });
  new MutationObserver(() => { if (reduced()) cancel(); }).observe(root, { attributes: true, attributeFilter: ['data-motion'] });
  document.addEventListener('visibilitychange', () => { if (document.hidden) cancel(); });
  section.addEventListener('focusin', cancel);
  addEventListener('pagehide', cancel);
})();
