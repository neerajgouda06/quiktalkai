(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const hosts = new Set([...document.querySelectorAll('.chrome-glyph,.chrome-mask')].map(icon => icon.closest('a,button,.industry-card,.how-grid li,.feature-card,.exceptionalities-card,.comparison-cell,.integration-node') || icon));
  for (const host of hosts) {
    let frame = 0;
    const gradients = [...host.querySelectorAll('.chrome-reflection')];
    const reset = () => {
      cancelAnimationFrame(frame);
      gradients.forEach(gradient => gradient.removeAttribute('gradientTransform'));
      host.style.removeProperty('--chrome-position');
      host.removeAttribute('data-chrome-active');
    };
    host.addEventListener('pointermove', event => {
      if (reduced.matches || document.documentElement.dataset.motion === 'reduced' || event.pointerType === 'touch') return;
      const box = host.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (event.clientX - box.left) / Math.max(1, box.width)));
      const y = Math.max(0, Math.min(1, (event.clientY - box.top) / Math.max(1, box.height)));
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        gradients.forEach(gradient => gradient.setAttribute('gradientTransform', `rotate(${(x - .5) * 65 + (y - .5) * 25} .5 .5)`));
        host.style.setProperty('--chrome-position', `${x * 100}%`);
        host.setAttribute('data-chrome-active', '');
      });
    }, {passive:true});
    host.addEventListener('pointerleave', reset);
    reduced.addEventListener('change', reset);
  }
})();
