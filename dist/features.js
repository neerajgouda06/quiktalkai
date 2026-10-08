(() => {
  'use strict';
  const section = document.querySelector('#enterprise-features');
  if (!section) return;
  const root = document.documentElement;
  const slots = [...section.querySelectorAll('.feature-slot')];
  const cards = slots.map(slot => slot.querySelector('.feature-card'));
  const links = [...section.querySelectorAll('.features-nav-link')];
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  const small = matchMedia('(max-width:809px)');
  const visible = new Set();
  let frame = 0;
  let reduced = true;
  let inView = false;
  let headingSeen = false;
  let headingAnimation;
  let typingTimer;
  let typingIndex = 0;
  let character = 0;
  let deleting = false;
  const prompt = section.querySelector('[data-feature-prompt]');
  const phrases = ['Arrange a visit', 'Take a message'];
  const clamp = value => Math.max(0, Math.min(1, value));

  function update() {
    frame = 0;
    const viewportHeight = window.innerHeight;
    const anchorTop = (parseFloat(getComputedStyle(root).scrollPaddingTop) || 0)
      + (parseFloat(getComputedStyle(slots[0]).scrollMarginTop) || 0);
    const activeLine = Math.max(small.matches ? 190 : 220, anchorTop + 20);
    let active = 0;
    slots.forEach((slot, index) => {
      const box = slot.getBoundingClientRect();
      const progress = reduced ? 1 : clamp((viewportHeight - box.top) / box.height);
      cards[index].style.setProperty('--feature-x', `${small.matches ? 0 : 80 * (1 - progress)}px`);
      const lineProgress = reduced ? 1 : clamp((viewportHeight * .5 - box.top) / box.height);
      links[index].style.setProperty('--feature-progress', lineProgress.toFixed(4));
      links[index].style.opacity = String(.5 + .5 * progress);
      if (box.top <= activeLine) active = index;
    });
    links.forEach((link, index) => {
      if (index === active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  function schedule() {
    if (!frame && inView) frame = requestAnimationFrame(update);
  }
  function type() {
    clearTimeout(typingTimer);
    if (!prompt || reduced || document.hidden || !visible.has(slots[0])) return;
    const phrase = phrases[typingIndex];
    character += deleting ? -1 : 1;
    prompt.textContent = phrase.slice(0, Math.max(0, character));
    let delay = deleting ? 50 : 100;
    if (character >= phrase.length) { deleting = true; delay = 1000; }
    else if (character <= 0 && deleting) { deleting = false; typingIndex = (typingIndex + 1) % phrases.length; delay = 400; }
    typingTimer = setTimeout(type, delay);
  }
  function syncMotion() {
    reduced = media.matches || root.dataset.motion === 'reduced';
    section.classList.toggle('features-paused', reduced || document.hidden);
    clearTimeout(typingTimer);
    if (reduced) {
      headingAnimation?.cancel();
      if (prompt) prompt.textContent = phrases[0];
    } else {
      if (character === 0 && prompt) prompt.textContent = '';
      type();
    }
    update();
  }
  links.forEach((link, index) => {
    // Preserve native anchor navigation and its sequential keyboard position.
    // Focusing a heading during smooth scrolling triggers the site's existing
    // header-clearance handler, which would interrupt the scroll on phones.
    link.addEventListener('keydown', event => {
      let target;
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') target = (index + 1) % links.length;
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') target = (index + links.length - 1) % links.length;
      if (event.key === 'Home') target = 0;
      if (event.key === 'End') target = links.length - 1;
      if (target === undefined) return;
      event.preventDefault();
      links[target].focus({ preventScroll: true });
    });
  });
  section.addEventListener('focusin', event => {
    // The sticky category rail already clears the header. Its focus must not
    // invoke the shared instant header correction during native anchor scroll.
    if (event.target.closest('.features-nav-link')) event.stopPropagation();
    const card = event.target.closest('.feature-card');
    if (card) card.style.setProperty('--feature-x', '0px');
    headingAnimation?.cancel();
  });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      inView = entries[0].isIntersecting;
      if (inView) update();
    }, { rootMargin: '150px 0px' }).observe(section);
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        entry.target.classList.toggle('is-visible', entry.isIntersecting);
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      });
      clearTimeout(typingTimer);
      type();
    });
    slots.forEach(slot => observer.observe(slot));
    const heading = section.querySelector('.features-heading');
    const headingObserver = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting || headingSeen) return;
      headingSeen = true;
      headingObserver.disconnect();
      if (!reduced && typeof heading.animate === 'function') {
        headingAnimation = heading.animate([{ opacity: .3, transform: 'translateY(16px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 700, easing: 'cubic-bezier(.16,1,.3,1)' });
      }
    }, { threshold: .15 });
    headingObserver.observe(heading);
  } else {
    inView = true;
    slots.forEach(slot => { visible.add(slot); slot.classList.add('is-visible'); });
  }
  new MutationObserver(syncMotion).observe(root, { attributes: true, attributeFilter: ['data-motion'] });
  if ('ResizeObserver' in window) new ResizeObserver(schedule).observe(section);
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule, { passive: true });
  document.addEventListener('visibilitychange', syncMotion);
  media.addEventListener('change', syncMotion);
  syncMotion();
})();
