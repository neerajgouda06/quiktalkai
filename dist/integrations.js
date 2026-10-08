(() => {
  'use strict';
  const section = document.querySelector('.integration-story');
  if (!section || !('IntersectionObserver' in window)) return;
  const cards = [...section.querySelectorAll('[data-integration-card]')];
  const links = [...section.querySelectorAll('[data-integration-link]')];
  const ecosystem = section.querySelector('.integration-ecosystem');
  const root = document.documentElement;
  const systemMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = matchMedia('(min-width: 810px)');
  const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
  const smooth = v => v * v * (3 - 2 * v);
  let reduced = systemMotion.matches || root.dataset.motion === 'reduced';
  let frame = 0;
  let measured = [];
  let viewport = innerHeight;
  let travel = 80;
  let active = -1;
  let visible = false;
  let lastTime = 0;
  let renderedScroll = scrollY;

  // Geometry is cached on layout changes. A scroll frame only writes transforms.
  function measure() {
    viewport = innerHeight;
    travel = Math.min(80, Math.max(0, (innerWidth - section.querySelector('.integration-container').offsetWidth) / 2 - 4));
    measured = cards.map(card => {
      let top = 0;
      for (let element = card; element; element = element.offsetParent) top += element.offsetTop;
      return { top, height:card.offsetHeight };
    });
    renderedScroll = scrollY;
    requestPaint();
  }
  function requestPaint() {
    if (!frame && !document.hidden) frame = requestAnimationFrame(paint);
  }
  function paint(time) {
    frame = 0;
    const actualScroll = scrollY;
    const dt = Math.min(64, time - (lastTime || time - 16));
    lastTime = time;
    const diff = actualScroll - renderedScroll;
    renderedScroll = reduced || Math.abs(diff) > viewport ? actualScroll : renderedScroll + diff * (1 - Math.exp(-dt / 48));
    if (Math.abs(actualScroll - renderedScroll) < .15) renderedScroll = actualScroll;
    let nextActive = 0;
    const focusLine = actualScroll + viewport * .44;
    measured.forEach((position, index) => { if (focusLine >= position.top) nextActive = index; });
    if (nextActive !== active) {
      active = nextActive;
      links.forEach((link, index) => {
        index === active ? link.setAttribute('aria-current', 'step') : link.removeAttribute('aria-current');
        link.classList.toggle('is-visited',index<active);
      });
      cards.forEach((card,index) => card.classList.toggle('is-active',index===active));
    }
    measured.forEach((position, index) => {
      const card = cards[index];
      const top = position.top - renderedScroll;
      const entry = clamp((viewport - top) / Math.min(position.height + 30, viewport * .75));
      const exit = clamp((-top + 80) / Math.max(position.height, 1));
      const focus = smooth(entry) * (1 - exit * .24);
      const progress = clamp((actualScroll + viewport * .5 - position.top) / Math.max(position.height, 1));
      links[index].style.setProperty('--link-progress', index < active ? '1' : index === active ? String(Math.max(.1, progress)) : '0');
      if (top > viewport + 160 || top + position.height < -160) return;
      if (reduced) {
        card.style.transform = '';
        card.style.opacity = '';
        card.style.filter = '';
        card.style.removeProperty('--scene-drift');
        card.style.removeProperty('--call-drift');
        card.style.removeProperty('--detail-drift');
        card.style.removeProperty('--endpoint-drift');
        return;
      }
      const entryMotion = 1 - smooth(entry);
      const x = desktop.matches ? travel * entryMotion : 0;
      const y = desktop.matches ? 0 : 14 * entryMotion;
      const scale = 1 - (desktop.matches ? .012 : .006) * entryMotion - .008 * exit;
      card.style.transform = `translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,0) scale(${scale.toFixed(4)})`;
      card.style.opacity = (1 - .14 * entryMotion - .12 * exit).toFixed(3);
      // Only the first few pixels of entry carry blur, never the reading state.
      card.style.filter = desktop.matches && entry < .3 ? `blur(${(.45 * (1-entry/.3)).toFixed(2)}px)` : '';
      card.style.setProperty('--scene-light', focus.toFixed(3));
      card.style.setProperty('--scene-drift', `${((1 - entry) * 14 - exit * 8).toFixed(2)}px`);
      card.style.setProperty('--call-drift', `${(entryMotion * -7).toFixed(2)}px`);
      card.style.setProperty('--detail-drift', `${(entryMotion * 9).toFixed(2)}px`);
      card.style.setProperty('--endpoint-drift', `${(entryMotion * 15).toFixed(2)}px`);
    });
    if (visible && !reduced && actualScroll !== renderedScroll) requestPaint();
  }
  const visibility = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.target.classList.toggle('is-in-view',entry.isIntersecting && !reduced && !document.hidden));
  }, { rootMargin:'40px 0px', threshold:0 });
  [...cards, ecosystem].forEach(card => visibility.observe(card));
  const intro = new IntersectionObserver(([entry], observer) => {
    if (!entry.isIntersecting) return;
    if (!reduced) entry.target.classList.add('is-entered');
    observer.disconnect();
  }, { threshold:.2 });
  intro.observe(section.querySelector('.integration-heading'));
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) { renderedScroll = scrollY; requestPaint(); }
  }, { rootMargin:'200px 0px' }).observe(section);
  window.addEventListener('scroll', () => { if (visible) requestPaint(); }, {passive:true});
  window.addEventListener('resize',measure,{passive:true});
  window.addEventListener('pageshow',measure);
  // Other homepage sections and local fonts can shift this section after load.
  const resize = new ResizeObserver(measure);
  resize.observe(document.querySelector('main'));
  document.fonts?.ready.then(measure);
  function updateMotion() {
    reduced = systemMotion.matches || root.dataset.motion === 'reduced';
    if (reduced) [...cards,ecosystem].forEach(card => card.classList.remove('is-in-view'));
    [...cards,ecosystem].forEach(card => {visibility.unobserve(card);visibility.observe(card);});
    measure();
  }
  systemMotion.addEventListener('change',updateMotion);
  new MutationObserver(updateMotion).observe(root,{attributes:true,attributeFilter:['data-motion']});
  document.addEventListener('visibilitychange',() => {
    if (document.hidden) {cancelAnimationFrame(frame);frame=0;[...cards,ecosystem].forEach(card=>card.classList.remove('is-in-view'));}
    else updateMotion();
  });
  section.addEventListener('click',event => {
    const link = event.target.closest('a[href^="#integration-"]');
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const target = document.getElementById(link.hash.slice(1));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({behavior:reduced?'instant':'smooth',block:'start'});
    history.replaceState(null,'',link.hash);
    // Keep keyboard focus in the document's narrative order after a jump.
    target.setAttribute('tabindex','-1');
    target.focus({preventScroll:true});
    target.addEventListener('blur',()=>target.removeAttribute('tabindex'),{once:true});
  });
  measure();
})();
