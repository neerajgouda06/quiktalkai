(() => {
  'use strict';
  const root = document.querySelector('.booking-demo');
  if (!root) return;
  const call = JSON.parse(root.querySelector('.booking-timeline').textContent);
  const audio = root.querySelector('.call-audio');
  const play = root.querySelector('.call-play');
  const silentToggle = root.querySelector('.silent-toggle');
  const status = root.querySelector('.call-status');
  const modeLabel = root.querySelector('.call-mode');
  const progress = root.querySelector('.call-progress');
  const clock = root.querySelector('.call-time');
  const error = root.querySelector('.call-error');
  const transcript = root.querySelector('.booking-transcript');
  const cards = [...root.querySelectorAll('.conversation-card')];
  const fields = [...root.querySelectorAll('[data-milestone]')];
  const bars = [...root.querySelectorAll('.call-wave i')];
  const reducedPreference = matchMedia('(prefers-reduced-motion: reduce)');
  const listeners = new AbortController();
  // One clock owns transcript, workflow, status, progress and speaker state.
  const state = { mode: 'silent', time: 0, paused: false, loading: false, buffering: false, visible: false, suspendedAudio: false };
  let frame = 0, lastNow = null, lastRender = -Infinity, energy = 0, lastSpeaker = -1;
  let context, source, analyser, samples, operation = 0, visibilityOperation = 0, destroyed = false, watchdog = 0;
  let observer, preferenceObserver, transcriptObserver, followTranscript = true;
  const duration = call.duration;
  const milestones = call.milestones;
  const timeText = seconds => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
  const on = (target, name, handler) => target.addEventListener(name, handler, { signal: listeners.signal });
  const reduced = () => reducedPreference.matches || document.documentElement.dataset.motion === 'reduced';
  const runnable = () => !destroyed && state.visible && !document.hidden && !state.paused && !state.loading && !state.buffering && (state.mode === 'silent' || !audio.paused);

  function render() {
    const t = state.time;
    const active = call.segments.findIndex(s => t >= s.start && t < s.end);
    const completed = t >= milestones.complete;
    root.dataset.speaker = active < 0 ? 'none' : call.segments[active].speaker;
    root.dataset.complete = String(completed);
    root.dataset.paused = String(!runnable());
    root.classList.toggle('is-reduced', reduced());
    let changed = false;
    cards.forEach((card, i) => {
      const segment = call.segments[i];
      const show = t >= segment.start;
      if (card.classList.contains('is-revealed') !== show) changed = true;
      card.classList.toggle('is-revealed', show);
      card.setAttribute('aria-hidden', String(!show));
      card.classList.toggle('is-speaking', i === active);
      card.querySelectorAll('.transcript-phrase').forEach((phrase, n) => {
        const visible = t >= segment.phrases[n].time;
        if (phrase.classList.contains('is-revealed') !== visible) changed = true;
        phrase.classList.toggle('is-revealed', visible);
      });
    });
    root.querySelector('.transcript-wait').hidden = t >= call.segments[0].start;
    if (changed && followTranscript) transcript.scrollTop = transcript.scrollHeight;
    fields.forEach(field => {
      const show = t >= milestones[field.dataset.milestone];
      field.classList.toggle('is-revealed', show);
      field.setAttribute('aria-hidden', String(!show));
    });
    root.querySelector('.workflow-save').classList.toggle('is-complete', t >= milestones.saved);
    root.querySelector('.workflow-team').classList.toggle('is-complete', t >= milestones.notified);
    root.querySelectorAll('.workflow-check').forEach((check, i) => check.setAttribute('aria-hidden', String(t < (i ? milestones.notified : milestones.saved))));
    const callStatus = state.loading ? 'Loading call…' : state.buffering ? 'Buffering…' : completed ? 'Booking request recorded' : t === 0 ? 'Ready' : t < call.segments[0].start ? 'Connecting' : t >= milestones.processing ? 'Processing booking' : 'In conversation';
    const label = state.paused ? `${callStatus} · Paused` : callStatus;
    if (status.textContent !== label) status.textContent = label;
    modeLabel.textContent = state.mode === 'audio' ? (t >= duration ? 'Call ended' : state.paused || audio.paused ? 'Audio paused' : 'Audio playing') : 'Silent preview';
    const finished = t >= duration;
    const playing = state.mode === 'audio' && !state.paused && !finished;
    const buttonLabel = state.loading ? 'Loading…' : playing ? 'Pause' : state.mode === 'audio' && finished ? 'Replay call' : state.mode === 'audio' && state.paused ? 'Resume' : 'Play call';
    play.querySelector('span').textContent = buttonLabel;
    play.setAttribute('aria-label', state.loading ? 'Loading sample call' : playing ? 'Pause sample call' : state.mode === 'audio' && finished ? 'Replay sample call' : state.mode === 'audio' && state.paused ? 'Resume sample call' : 'Play sample call');
    play.querySelector('path').setAttribute('d', playing ? 'M6 4h3v12H6ZM12 4h3v12h-3Z' : 'm7 4 9 6-9 6Z');
    play.disabled = state.loading;
    silentToggle.textContent = state.mode === 'audio' ? 'Watch silently' : state.paused ? 'Resume demo' : 'Pause demo';
    progress.value = Math.min(t, duration);
    clock.textContent = `${timeText(Math.min(t, duration))} / ${timeText(Math.ceil(duration))}`;
    lastSpeaker = active;
  }

  function visual(now, delta) {
    const t = state.time;
    const segment = call.segments.find(s => t >= s.start && t < s.end);
    let target = 0;
    if (state.mode === 'audio' && analyser) {
      analyser.getFloatTimeDomainData(samples);
      let sum = 0;
      for (const value of samples) sum += value * value;
      target = Math.min(1, Math.sqrt(sum / samples.length) * 7);
    } else if (segment) {
      const p = t - segment.start;
      const edge = Math.min(1, p / .12, (segment.end - t) / .2);
      target = edge * (.22 + .32 * Math.abs(Math.sin(p * 11.7)) + .18 * Math.abs(Math.sin(p * 23.1)));
    } else if (t >= milestones.processing && t < milestones.saved) {
      target = .06 + .055 * (1 + Math.sin(t * 2.5));
    } else if (t < milestones.complete) target = .025 + .015 * Math.sin(t * 1.8);
    const blend = 1 - Math.exp(-Math.min(delta || 16, 100) / (target > energy ? 65 : 180));
    energy += (target - energy) * blend;
    const speakerGain = segment?.speaker === 'assistant' ? 1 : .72;
    const level = reduced() ? 0 : energy * speakerGain;
    root.style.setProperty('--voice', level.toFixed(4));
    root.style.setProperty('--core-scale', (1 + level * .06).toFixed(4));
    root.style.setProperty('--ring-scale', (1 + level * .18).toFixed(4));
    root.style.setProperty('--halo-scale', (1 + level * .24).toFixed(4));
    root.style.setProperty('--glow', (.1 + level * .33).toFixed(4));
    root.style.setProperty('--save-dash', (70 * (1 - Math.min(1, Math.max(0, (t - milestones.saved) / .6)))).toFixed(2));
    const notification = Math.min(1, Math.max(0, (t - milestones.notified) / .65));
    root.style.setProperty('--team-scale', (1 + Math.sin(notification * Math.PI) * .12).toFixed(4));
    bars.forEach((bar, i) => bar.style.setProperty('--height', (1 + level * (1.1 + Math.abs(Math.sin(i * 1.7 + t * 9)) * 4.3)).toFixed(3)));
  }

  function tick(now) {
    frame = 0;
    if (!runnable()) { lastNow = null; return; }
    const delta = lastNow === null ? 0 : now - lastNow;
    lastNow = now;
    if (state.mode === 'audio') state.time = Math.min(audio.currentTime, duration);
    else {
      state.time += delta / 1000;
      if (state.time > duration + 4) { state.time = 0; followTranscript = true; transcript.scrollTop = 0; lastRender = -Infinity; }
    }
    visual(now, delta);
    const speaker = call.segments.findIndex(s => state.time >= s.start && state.time < s.end);
    if (now - lastRender >= 80 || speaker !== lastSpeaker) { render(); lastRender = now; }
    schedule();
  }
  function schedule() { if (!frame && runnable()) frame = requestAnimationFrame(tick); }
  function suspend() { if (frame) cancelAnimationFrame(frame); frame = 0; lastNow = null; }
  function clearWatchdog() { clearTimeout(watchdog); watchdog = 0; }
  function watchAudio() { clearWatchdog(); watchdog = setTimeout(() => { if (state.mode === 'audio' && !state.paused && (state.loading || state.buffering)) fallback(); }, 15000); }
  function reset() { state.time = 0; energy = 0; lastNow = null; lastRender = -Infinity; followTranscript = true; transcript.scrollTop = 0; visual(0, 100); render(); }

  async function startAudio() {
    if (state.loading) return;
    ++visibilityOperation; clearWatchdog();
    if (state.mode === 'audio' && !state.paused && state.time < duration) {
      ++operation; state.paused = true; state.suspendedAudio = false; state.time = audio.currentTime; audio.pause(); suspend(); render(); return;
    }
    const id = ++operation;
    const resume = state.mode === 'audio' && state.paused && state.time < duration;
    suspend(); state.mode = 'audio'; state.paused = false; state.loading = true; state.buffering = false; error.hidden = true;
    if (!resume) { audio.currentTime = 0; reset(); }
    render(); watchAudio();
    try {
      if (audio.error) audio.load();
      if (!context) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) throw new Error('Audio analysis unavailable');
        context = new AudioContextClass();
        source = context.createMediaElementSource(audio);
        analyser = context.createAnalyser(); analyser.fftSize = 1024;
        samples = new Float32Array(analyser.fftSize);
        source.connect(analyser); analyser.connect(context.destination);
      }
      await context.resume();
      if (destroyed || id !== operation) return;
      if (!state.visible || document.hidden) { state.loading = false; state.suspendedAudio = true; clearWatchdog(); render(); return; }
      await audio.play();
      if (destroyed || id !== operation) return;
      state.loading = false; clearWatchdog();
      if (!state.visible || document.hidden) { state.suspendedAudio = true; audio.pause(); }
      render(); schedule();
    } catch {
      if (!destroyed && id === operation) {
        if (state.suspendedAudio || !state.visible || document.hidden) { state.loading = false; clearWatchdog(); render(); }
        else fallback();
      }
    }
  }
  function fallback() {
    ++operation; ++visibilityOperation; clearWatchdog(); audio.pause(); suspend();
    state.mode = 'silent'; state.paused = false; state.loading = false; state.buffering = false; state.suspendedAudio = false;
    error.textContent = 'Audio is unavailable. You can still watch the silent preview.'; error.hidden = false;
    reset(); schedule();
  }
  function changeVisibility() {
    const visibilityId = ++visibilityOperation;
    if (!state.visible || document.hidden) {
      suspend(); clearWatchdog();
      if (state.mode === 'audio' && !state.paused && state.time < duration) { state.suspendedAudio = true; state.time = audio.currentTime; audio.pause(); }
      render();
    } else if (state.suspendedAudio && !state.paused) {
      state.suspendedAudio = false;
      const id = operation;
      watchAudio();
      audio.play().then(() => { if (!destroyed && id === operation && visibilityId === visibilityOperation) { state.loading = false; state.buffering = false; clearWatchdog(); render(); schedule(); } }).catch(() => { if (!destroyed && id === operation && visibilityId === visibilityOperation && state.visible && !document.hidden && !state.paused) fallback(); });
    } else { render(); schedule(); }
  }

  root.classList.add('is-enhanced');
  root.querySelector('.call-controls').hidden = false;
  on(play, 'click', startAudio);
  on(transcript, 'scroll', () => { followTranscript = transcript.scrollHeight - transcript.scrollTop - transcript.clientHeight < 44; });
  if ('ResizeObserver' in window) {
    transcriptObserver = new ResizeObserver(() => { if (followTranscript) transcript.scrollTop = transcript.scrollHeight; });
    transcriptObserver.observe(transcript);
  }
  on(silentToggle, 'click', () => {
    ++operation; ++visibilityOperation; clearWatchdog();
    if (state.mode === 'audio') {
      audio.pause(); suspend(); state.mode = 'silent'; state.paused = false; state.loading = false; state.buffering = false; state.suspendedAudio = false; reset();
    } else { state.paused = !state.paused; suspend(); render(); }
    schedule();
  });
  on(audio, 'waiting', () => { if (state.mode === 'audio' && !state.paused) { state.buffering = true; watchAudio(); suspend(); render(); } });
  on(audio, 'playing', () => { if (state.mode === 'audio') { state.buffering = false; clearWatchdog(); render(); schedule(); } });
  on(audio, 'error', () => { if (state.mode === 'audio') fallback(); });
  on(audio, 'ended', () => { if (state.mode === 'audio') { state.time = duration; state.paused = false; suspend(); energy = 0; visual(0, 100); render(); } });
  on(document, 'visibilitychange', changeVisibility);
  on(reducedPreference, 'change', render);
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(entries => { state.visible = entries[0].isIntersecting; changeVisibility(); }, { threshold: 0 });
    observer.observe(root);
  } else { state.visible = true; }
  preferenceObserver = new MutationObserver(render);
  preferenceObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-motion'] });
  on(window, 'pagehide', event => {
    ++visibilityOperation; clearWatchdog();
    if (event.persisted) { suspend(); if (state.mode === 'audio' && !state.paused && state.time < duration) { state.suspendedAudio = true; audio.pause(); } return; }
    destroyed = true; ++operation; suspend(); audio.pause(); observer?.disconnect(); preferenceObserver.disconnect(); transcriptObserver?.disconnect(); listeners.abort(); source?.disconnect(); analyser?.disconnect(); context?.close().catch(() => {});
  });
  on(window, 'pageshow', event => { if (event.persisted) changeVisibility(); });
  render(); schedule();
})();
