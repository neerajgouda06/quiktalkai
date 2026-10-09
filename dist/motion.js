(() => {
  'use strict';

  const root = document.documentElement;
  const systemPreference = matchMedia('(prefers-reduced-motion: reduce)');
  const desktopPointer = matchMedia('(min-width: 901px) and (hover: hover) and (pointer: fine)');
  const mobile = matchMedia('(max-width: 640px)');
  const ambientVideo = document.querySelector('.atmosphere-video');
  const ambientScene = document.querySelector('.atmosphere');
  const videoViewport = matchMedia('(min-width: 901px)');
  let sceneVisible = false;
  let videoRequested = false;
  const header = document.querySelector('.site-header');
  const animated = new Map();
  const disclosures = new Set();
  const seen = new WeakSet();
  const easing = 'cubic-bezier(.16,1,.3,1)';
  const uiEasing = 'cubic-bezier(.2,.65,.3,1)';
  let userReduced = false;
  let reduced = systemPreference.matches;
  let frame = 0;
  let processVisible = false;
  let pointer = null;
  let processGrid = null;
  let processSteps = [];
  let processProgress = 0;
  let activeStep = -1;
  let processThresholds = [0, .5, 1];
  let processSpan = 1;
  const exceptionalities = [];
  const statement = document.querySelector('.voice-statement');
  const statementText = statement?.querySelector('.statement-text');
  const statementInks = statement ? [...statement.querySelectorAll('.statement-ink')] : [];
  const statementOrb = statement?.querySelector('.statement-orb');
  const statementSurface = statement?.querySelector('.statement-orb-surface');
  let statementProgress = null;
  let orbProgress = null;
  let statementTime = 0;
  let statementOpacities = [];

  try { userReduced = localStorage.getItem('quiktalk-reduce-motion') === 'true'; } catch { /* Device preferences still work when storage is unavailable. */ }
  function token(name, fallback) {
    return parseFloat(getComputedStyle(root).getPropertyValue(name)) || fallback;
  }
  function play(element, keyframes, options = {}) {
    if (!element || reduced || element.contains(document.activeElement) || typeof element.animate !== 'function') return;
    const animation = element.animate(keyframes, {
      duration: token('--motion-reveal', 620), easing, fill: 'backwards', ...options
    });
    animated.set(animation, element);
    const clean = () => { animated.delete(animation); animation.cancel(); };
    animation.finished.then(clean, clean);
    return animation;
  }
  function enter(element, delay = 0, distance = mobile.matches ? 8 : 16) {
    if (!element) return;
    play(element, [
      { opacity: .15, transform: `translate3d(0,${distance}px,0)` },
      { opacity: 1, transform: 'translate3d(0,0,0)' }
    ], { delay: mobile.matches ? Math.min(delay, 180) : delay });
  }
  function settleDecorations() {
    for (const animation of animated.keys()) animation.cancel();
    animated.clear();
    document.querySelectorAll('.has-reflection,.workflow-visited').forEach(element => element.classList.remove('has-reflection', 'workflow-visited'));
    root.classList.remove('motion-boot');
  }
  function clearLight() {
    pointer?.element.classList.remove('light-active');
    pointer = null;
  }
  function syncAtmosphere() {
    if (!ambientVideo) return;
    const canPlay = !reduced && videoViewport.matches && sceneVisible && !document.hidden && !navigator.connection?.saveData;
    if (!canPlay) {
      ambientVideo.pause();
      if (videoRequested && (reduced || !videoViewport.matches || navigator.connection?.saveData)) {
        ambientVideo.removeAttribute('src');
        ambientVideo.load();
        ambientVideo.classList.remove('is-ready');
        videoRequested = false;
      }
      return;
    }
    if (!videoRequested) {
      videoRequested = true;
      ambientVideo.muted = true;
      ambientVideo.src = ambientVideo.dataset.src;
    }
    ambientVideo.play()?.catch(() => { if (ambientVideo.paused || ambientVideo.error) ambientVideo.classList.remove('is-ready'); });
  }
  ambientVideo?.addEventListener('playing', () => ambientVideo.classList.add('is-ready'));
  ambientVideo?.addEventListener('error', () => ambientVideo.classList.remove('is-ready'));
  videoViewport.addEventListener('change', syncAtmosphere);
  navigator.connection?.addEventListener('change', syncAtmosphere);
  function updatePreference() {
    reduced = systemPreference.matches || userReduced;
    root.dataset.motion = reduced ? 'reduced' : 'full';
    if (reduced) {
      settleDecorations();
      disclosures.forEach(controller => controller.settle());
      clearLight();
      exceptionalities.forEach(card => {
        card.entered = true;
        card.element.classList.remove('is-reveal-pending', 'is-art-running');
      });
    }
    activeStep = -1;
    syncAtmosphere();
    requestUpdate();
  }
  systemPreference.addEventListener('change', updatePreference);
  updatePreference();

  // Layout dimensions stay fixed: the sticky state changes only the glass and scale.
  function requestUpdate() { if (!frame) frame = requestAnimationFrame(updateFrame); }
  function updateFrame(time) {
    frame = 0;
    // Read geometry first, then commit visual-only changes in one frame.
    const compact = scrollY > 50;
    const processRect = processGrid && processVisible && !reduced ? processGrid.getBoundingClientRect() : null;
    const lightRect = pointer && !reduced && desktopPointer.matches ? pointer.element.getBoundingClientRect() : null;
    const cardRects = exceptionalities.map(card => card.element.getBoundingClientRect());
    const statementRect = statementText?.getBoundingClientRect();
    const orbRect = statementOrb?.getBoundingClientRect();
    let nextProgress = processProgress;
    if (reduced) nextProgress = 1;
    else if (processRect) {
      const span = mobile.matches ? processSpan : Math.max(1, processRect.height * .65 + innerHeight * .3);
      const start = innerHeight * (mobile.matches ? .66 : .78) - processRect.top - (mobile.matches ? 33 : 0);
      nextProgress = Math.max(processProgress, Math.min(1, Math.max(0, start / span)));
    }
    header?.classList.toggle('is-scrolled', compact);
    if (ambientScene && sceneVisible) ambientScene.style.setProperty('--scene-shift', reduced ? '0px' : `${Math.min(60, scrollY * .065)}px`);
    if (processGrid && (nextProgress !== processProgress || activeStep === -1)) {
      processProgress = nextProgress;
      processGrid.style.setProperty('--process-progress', String(processProgress));
      activeStep = processProgress > 0 ? processThresholds.filter(value => value <= processProgress).length - 1 : -1;
      processSteps.forEach((step, index) => {
        step.classList.toggle('is-active', index <= activeStep);
        step.classList.toggle('is-current', index === activeStep && !reduced);
      });
    }
    if (pointer && lightRect) {
      pointer.element.style.setProperty('--light-x', `${pointer.x - lightRect.left - 9}px`);
      pointer.element.style.setProperty('--light-y', `${pointer.y - lightRect.top - 9}px`);
    }
    updateStatement(statementRect, orbRect, time);
    exceptionalities.forEach((card, index) => {
      const rect = cardRects[index];
      const visibleHeight = Math.max(0, Math.min(rect.bottom, innerHeight) - Math.max(rect.top, 0));
      card.element.classList.toggle('is-art-running', !reduced && !document.hidden && visibleHeight > 0);
      // Framer's threshold uses the smaller of element and viewport height.
      // Reading this in the existing scroll frame also handles short landscape screens.
      if (!card.entered && visibleHeight / Math.max(1, Math.min(rect.height, innerHeight)) >= .5) {
        card.entered = true;
        card.element.classList.remove('is-reveal-pending');
        play(card.element, [
          { opacity: 0, transform: `translate3d(0,${innerWidth <= 809 ? 12 : 20}px,0)` },
          { opacity: 1, transform: 'translate3d(0,0,0)' }
        ], { duration: 400, delay: innerWidth <= 809 ? Math.min(card.delay, 100) : card.delay, easing: 'cubic-bezier(.12,.23,.5,1)' });
      }
    });
  }
  function updateStatement(rect, orbRect, time) {
    if (!rect || document.hidden) return;
    // Promote only visible animated layers; release their memory offscreen.
    statement.classList.toggle('is-in-view', !reduced && ((rect.bottom > 0 && rect.top < innerHeight) || (orbRect.bottom > 0 && orbRect.top < innerHeight)));
    // The reference maps text top: viewport bottom -> viewport center, +140px.
    // A longer mobile paragraph gets enough reading distance without pinning.
    const offset = innerWidth <= 809 ? 0 : Math.min(140, innerHeight * .18);
    const distance = Math.max(innerHeight * .5, rect.height - innerHeight * .35);
    const target = reduced ? 1 : Math.max(0, Math.min(1, (innerHeight - offset - rect.top) / distance));
    const delta = Math.min(64, Math.max(0, time - statementTime));
    statementTime = time;
    // First render and preference changes settle immediately. Scroll easing is
    // time-based (65ms), reversible, and the shared rAF stops when it settles.
    if (statementProgress === null || reduced || Math.abs(target - statementProgress) < .0001) statementProgress = target;
    else statementProgress += (target - statementProgress) * (1 - Math.exp(-delta / 65));
    if (Math.abs(target - statementProgress) < .0001) statementProgress = target;
    const tokenCount = statementInks.length * 2 - 1;
    statementInks.forEach((ink, index) => {
      const opacity = Math.max(0, Math.min(1, (statementProgress * (tokenCount + .6) - index * 2) / 1.6));
      const value = opacity.toFixed(4);
      if (statementOpacities[index] !== value) {
        ink.style.opacity = value;
        statementOpacities[index] = value;
      }
    });
    statement.classList.add('is-scroll-ready');
    // Track the orb separately: on phones it enters after the paragraph.
    // Remove the previous visual translation from its measured geometry.
    const previousDrift = reduced || orbProgress === null ? 0 : (orbProgress - .5) * 14;
    const orbTop = orbRect.top - previousDrift;
    const orbTarget = reduced ? .5 : Math.max(0, Math.min(1, (innerHeight - orbTop) / (innerHeight + orbRect.height)));
    if (orbProgress === null || reduced || Math.abs(orbTarget - orbProgress) < .0001) orbProgress = orbTarget;
    else orbProgress += (orbTarget - orbProgress) * (1 - Math.exp(-delta / 65));
    if (Math.abs(orbTarget - orbProgress) < .0001) orbProgress = orbTarget;
    const drift = reduced ? 0 : (orbProgress - .5) * 14;
    statementOrb.style.transform = `translate3d(${(drift * -.25).toFixed(2)}px,${drift.toFixed(2)}px,0)`;
    statementSurface.style.transform = `rotate(${(75 + (reduced ? 0 : (orbProgress - .5) * 10)).toFixed(2)}deg)`;
    if (!reduced && (Math.abs(target - statementProgress) >= .0001 || Math.abs(orbTarget - orbProgress) >= .0001)) requestUpdate();
  }
  addEventListener('scroll', requestUpdate, { passive: true });
  // Font loading can change line wraps without a window resize.
  if (statementText && 'ResizeObserver' in window) new ResizeObserver(requestUpdate).observe(statementText);
  document.fonts?.ready.then(requestUpdate);
  function measureHeader() {
    if (header) {
      const style = getComputedStyle(header);
      const chrome = ['paddingTop', 'paddingBottom', 'borderTopWidth', 'borderBottomWidth'].reduce((sum, key) => sum + parseFloat(style[key]), 0);
      const row = Math.max(header.querySelector('.brand')?.offsetHeight || 0, header.querySelector('.menu-toggle')?.offsetHeight || 0);
      const collapsedHeight = Math.max(parseFloat(style.minHeight) || 0, row + chrome);
      root.style.setProperty('--header-offset', `${collapsedHeight + 28}px`);
    }
    requestUpdate();
  }
  function measureProcess() {
    if (!processGrid || processSteps.length < 2) return;
    const points = processSteps.map(step => mobile.matches ? step.offsetTop : step.offsetLeft);
    processSpan = Math.max(1, points[points.length - 1] - points[0]);
    processThresholds = points.map(point => (point - points[0]) / processSpan);
    processGrid.style.setProperty('--process-span', `${processSpan}px`);
    requestUpdate();
  }
  if ('ResizeObserver' in window && header) new ResizeObserver(measureHeader).observe(header);
  measureHeader();

  const reflection = element => {
    if (!element) return;
    const layer = document.createElement('span');
    layer.className = 'motion-reflection';
    layer.setAttribute('aria-hidden', 'true');
    element.prepend(layer);
  };
  document.querySelectorAll('.hero-demo,.contact-panel').forEach(reflection);

  // A single observer handles grouped, one-time section entrances. HTML stays visible
  // before observation, if the script fails, and if the API is unavailable.
  const revealSelectors = [
    '.value-strip', '.section-heading', '.center-heading', '.industry-card',
    '.employee-copy', '.employee-list', '.follow-panel',
    '.integrations', '.faq-section>div:first-child', '.faq-list',
    '.contact-panel', '.footer-top', '.scenario', '.transcript', '.outcome-list', '.handoff-note'
  ];
  if ('IntersectionObserver' in window) {
    if (ambientScene) new IntersectionObserver(entries => {
      sceneVisible = entries.some(entry => entry.isIntersecting);
      syncAtmosphere();
    }).observe(ambientScene);
    const reveals = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting || seen.has(entry.target)) continue;
        const element = entry.target;
        seen.add(element);
        reveals.unobserve(element);
        let delay = 0;
        if (element.matches('.industry-card') && !mobile.matches) {
          const columns = innerWidth <= 900 ? 2 : 3;
          delay = Array.from(element.parentElement.children).indexOf(element) % columns * 70;
        }
        enter(element, delay, element.matches('.footer-top') ? 6 : undefined);
        if (!reduced && element.matches('.follow-panel')) element.classList.add('workflow-visited');
        if (!reduced && element.matches('.contact-panel')) {
          element.classList.add('has-reflection');
          enter(element.querySelector('h2'), 90, 8);
          enter(element.querySelector('.contact-actions'), 160, 8);
        }
      }
    }, { rootMargin: '0px 0px 35px 0px', threshold: 0 });
    document.querySelectorAll(revealSelectors.join(',')).forEach(element => reveals.observe(element));
  }

  // The reference uses independent one-time entrances, not a scroll-scrubbed pin.
  // Artwork clocks run only while visible. With no JS/observer all content is static.
  if ('IntersectionObserver' in window && typeof Element.prototype.animate === 'function') {
    document.querySelectorAll('.exceptionalities [data-card-index]').forEach((element, index) => {
      const entered = reduced || element.contains(document.activeElement);
      exceptionalities.push({ element, entered, delay: [0, 100, 0, 100, 200][index] || 0 });
      element.classList.toggle('is-reveal-pending', !entered);
    });
    const cardObserver = new IntersectionObserver(requestUpdate, { threshold: [0, .5, 1] });
    exceptionalities.forEach(card => cardObserver.observe(card.element));
    requestUpdate();
  }

  processGrid = document.querySelector('.how-grid');
  processSteps = Array.from(processGrid?.children || []);
  if (processGrid) {
    measureProcess();
    if ('ResizeObserver' in window) new ResizeObserver(measureProcess).observe(processGrid);
    processProgress = reduced ? 1 : 0;
    processGrid.style.setProperty('--process-progress', String(processProgress));
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => {
        processVisible = entries.some(entry => entry.isIntersecting);
        requestUpdate();
      }, { rootMargin: '50px' }).observe(processGrid);
    } else {
      processProgress = 1;
      processGrid.style.setProperty('--process-progress', '1');
    }
    requestUpdate();
  }

  // Pointer light moves a small existing gradient; no full-surface gradient repaint,
  // parallax, magnetic targets, timers or idle animation loop.
  document.querySelectorAll('.hero-demo,.industry-card').forEach(element => {
    const light = document.createElement('span');
    light.className = 'surface-light';
    light.setAttribute('aria-hidden', 'true');
    element.prepend(light);
    element.addEventListener('pointermove', event => {
      if (reduced || !desktopPointer.matches || event.pointerType !== 'mouse') return;
      if (pointer?.element !== element) clearLight();
      pointer = { element, x: event.clientX, y: event.clientY };
      element.classList.add('light-active');
      requestUpdate();
    }, { passive: true });
    element.addEventListener('pointerleave', () => { if (pointer?.element === element) clearLight(); });
  });
  desktopPointer.addEventListener('change', () => { if (!desktopPointer.matches) clearLight(); });

  // Native details is the semantic and no-JS fallback. Only the brief height change
  // needs layout animation; every other motion uses transform/opacity.
  document.querySelectorAll('.faq-list details,.outcome-step').forEach(details => {
    const summary = details.querySelector('summary');
    const content = details.querySelector('.disclosure-content');
    if (!summary || !content) return;
    let targetOpen = details.open;
    let animation = null;
    let fade = null;
    let generation = 0;
    let transitioning = false;
    const controller = {
      details, content,
      settle() {
        if (!transitioning) targetOpen = details.open;
        generation++;
        animation?.cancel();
        fade?.cancel();
        animation = null;
        fade = null;
        transitioning = false;
        details.open = targetOpen;
        details.style.removeProperty('overflow');
        content.inert = false;
      }
    };
    disclosures.add(controller);
    details.addEventListener('toggle', () => { if (!animation) targetOpen = details.open; });
    summary.addEventListener('click', event => {
      if (reduced || typeof details.animate !== 'function') return;
      event.preventDefault();
      const startHeight = details.getBoundingClientRect().height;
      const startOpacity = details.open ? getComputedStyle(content).opacity : '.2';
      targetOpen = !targetOpen;
      transitioning = true;
      const thisGeneration = ++generation;
      animation?.cancel();
      fade?.cancel();
      details.open = true;
      const style = getComputedStyle(details);
      const borders = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
      const endHeight = targetOpen ? details.getBoundingClientRect().height : summary.getBoundingClientRect().height + borders;
      if (!targetOpen && content.contains(document.activeElement)) summary.focus({ preventScroll: true });
      content.inert = !targetOpen;
      details.style.overflow = 'hidden';
      try {
        animation = details.animate([{ height: `${startHeight}px` }, { height: `${endHeight}px` }], {
          duration: token('--motion-ui', 300), easing: uiEasing
        });
        fade = content.animate([{ opacity: startOpacity }, { opacity: targetOpen ? 1 : 0 }], {
          duration: token('--motion-micro', 200), easing: uiEasing, fill: 'both'
        });
        fade.finished.catch(() => {});
        const finished = () => { if (thisGeneration === generation) controller.settle(); };
        animation.finished.then(finished, finished);
      } catch {
        controller.settle();
      }
    });
  });

  addEventListener('resize', () => {
    disclosures.forEach(controller => controller.settle());
    clearLight();
    measureHeader();
    measureProcess();
  }, { passive: true });

  // One finite entrance. Deep links and restored scroll positions skip it entirely.
  if (!reduced && !location.hash && scrollY < 40) {
    root.classList.add('motion-boot');
    enter(header, 0, -12);
    const hero = document.querySelector('.hero-copy');
    if (hero) {
      enter(hero.querySelector('.eyebrow'), 80, 8);
      hero.querySelectorAll('.hero-line').forEach((line, index) => play(line, [
        { opacity: .1, transform: `translate3d(0,${mobile.matches ? 12 : 32}px,0) scale(.97)` },
        { opacity: 1, transform: 'translate3d(0,0,0) scale(1)' }
      ], { delay: 120 + index * 100, duration: mobile.matches ? 600 : 1200 }));
      enter(hero.querySelector('.hero-description'), 240, 10);
      enter(hero.querySelector('.hero-actions'), 340, 8);
      enter(hero.querySelector('.hero-note'), 390, 6);
      enter(document.querySelector('.hero-demo'), 500, 24);
      enter(document.querySelector('.mini-caller:not(.conversation-card)'), 650, 8);
      enter(document.querySelector('.mini-ai:not(.conversation-card)'), 900, 8);
      enter(document.querySelector('.hero-after:not(.booking-workflow)'), 1150, 6);
      document.querySelector('.hero-demo')?.classList.add('has-reflection');
    } else {
      enter(document.querySelector('.industry-hero>div'), 100, 12);
      enter(document.querySelector('.role-profile'), 240, 12);
    }
  }

  // Keyboard users should never have to wait for a visual entrance to finish.
  document.addEventListener('focusin', event => {
    exceptionalities.forEach(card => {
      if (card.element.contains(event.target)) {
        card.entered = true;
        card.element.classList.remove('is-reveal-pending');
      }
    });
    for (const [animation, element] of animated) {
      if (element.contains(event.target)) { animation.cancel(); animated.delete(animation); }
    }
    disclosures.forEach(controller => { if (controller.content.contains(event.target)) controller.settle(); });
    if (header && !header.contains(event.target)) {
      requestAnimationFrame(() => {
        const box = event.target.getBoundingClientRect();
        const edge = header.getBoundingClientRect().bottom + 12;
        if (box.top < edge && box.bottom > 0) scrollBy({ top: box.top - edge, behavior: 'instant' });
      });
    }
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      settleDecorations();
      disclosures.forEach(controller => controller.settle());
      clearLight();
      exceptionalities.forEach(card => card.element.classList.remove('is-art-running'));
    }
    syncAtmosphere();
    requestUpdate();
  });
  addEventListener('pagehide', () => ambientVideo?.pause());
  addEventListener('pageshow', event => { if (event.persisted) { statementProgress = null; settleDecorations(); measureHeader(); syncAtmosphere(); } });
})();
