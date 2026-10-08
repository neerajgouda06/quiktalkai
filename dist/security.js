(() => {
  'use strict';
  const section = document.querySelector('.enterprise-security');
  if (!section) return;
  const root = document.documentElement;
  const system = matchMedia('(prefers-reduced-motion: reduce)');
  const smallScreen = matchMedia('(max-width: 809px)');
  const visual = section.querySelector('.security-parallax');
  let visible = false;
  let revealed = false;
  let frame = 0;
  const reveals = new Set();
  const reduced = () => system.matches || root.dataset.motion === 'reduced';

  function settle() {
    for (const animation of reveals) animation.cancel();
    reveals.clear();
    visual.style.removeProperty('--security-drift');
  }
  function updateMotion() {
    const enabled = !reduced();
    section.classList.toggle('security-motion', enabled);
    section.classList.toggle('security-paused', document.hidden);
    if (!enabled || document.hidden) settle();
    requestDrift();
  }
  function reveal() {
    if (revealed || reduced()) { revealed = true; return; }
    revealed = true;
    if (!Element.prototype.animate) return;
    for (const [index, element] of [...section.querySelectorAll('.security-copy,.security-visual')].entries()) {
      const animation = element.animate([
        {opacity:0, transform:`translateY(${smallScreen.matches ? 10 : 20}px)`},
        {opacity:1, transform:'translateY(0)'}
      ], {duration:700, delay:index * 90, fill:'backwards', easing:'cubic-bezier(.16,1,.3,1)'});
      reveals.add(animation);
      animation.onfinish = () => reveals.delete(animation);
    }
  }
  function requestDrift() {
    if (frame || !visible || reduced() || smallScreen.matches || document.hidden) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      if (!visible || reduced() || smallScreen.matches || document.hidden) return;
      const box = section.getBoundingClientRect();
      const progress = Math.max(-1, Math.min(1, (box.top + box.height / 2 - innerHeight / 2) / innerHeight));
      visual.style.setProperty('--security-drift', `${(progress * 9).toFixed(2)}px`);
    });
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      section.classList.toggle('security-in-view', visible);
      if (visible) { reveal(); requestDrift(); }
    }, {threshold:.1}).observe(section);
  } else {
    visible = true;
    section.classList.add('security-in-view');
  }
  new MutationObserver(updateMotion).observe(root, {attributes:true, attributeFilter:['data-motion']});
  system.addEventListener('change', updateMotion);
  smallScreen.addEventListener('change', () => { settle(); requestDrift(); });
  document.addEventListener('visibilitychange', updateMotion);
  window.addEventListener('scroll', requestDrift, {passive:true});
  window.addEventListener('resize', requestDrift, {passive:true});
  updateMotion();
})();
