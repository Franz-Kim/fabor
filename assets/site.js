'use strict';

// Copy the visible address without launching a mail application.
const copyStatuses = [...document.querySelectorAll('[data-copy-status]')];
let copyFeedbackTimer;
let copyFeedbackFrame;
function showCopyFeedback(button, succeeded) {
  const english = document.documentElement.lang === 'en';
  const message = succeeded
    ? (english ? 'Email address copied.' : '이메일 주소가 복사되었습니다.')
    : (english ? 'Copy failed. Please select and copy the address manually.' : '복사하지 못했습니다. 주소를 선택해 직접 복사해 주세요.');
  const status = button.closest('dialog')?.querySelector('[data-copy-status]') || copyStatuses[0];
  clearTimeout(copyFeedbackTimer);
  cancelAnimationFrame(copyFeedbackFrame);
  copyStatuses.forEach(item => { item.classList.remove('is-visible'); item.textContent = ''; });
  copyFeedbackFrame = requestAnimationFrame(() => {
    status.textContent = message;
    status.classList.add('is-visible');
    copyFeedbackTimer = setTimeout(() => {
      status.classList.remove('is-visible');
      status.textContent = '';
    }, succeeded ? 3200 : 6000);
  });
}
function copyWithSelection(address, button) {
  // This also supports browsers opening the downloaded files directly.
  const field = document.createElement('textarea');
  field.value = address;
  field.readOnly = true;
  field.tabIndex = -1;
  field.setAttribute('aria-hidden', 'true');
  field.style.cssText = 'position:fixed;left:0;top:0;width:1px;height:1px;opacity:0;font-size:16px;pointer-events:none';
  // A modal makes the rest of the page inert, so keep the fallback inside it.
  (button.closest('dialog') || document.body).append(field);
  try {
    field.focus({preventScroll:true});
    field.select();
    field.setSelectionRange(0, address.length);
    return document.execCommand('copy');
  } catch { return false; }
  finally { field.remove(); button.focus({preventScroll:true}); }
}
document.querySelectorAll('[data-copy-email]').forEach(button => {
  button.addEventListener('click', async () => {
    let succeeded = false;
    if (window.isSecureContext && navigator.clipboard?.writeText) {
      try { await navigator.clipboard.writeText(button.dataset.copyEmail); succeeded = true; }
      catch { /* Try selection-based copying when clipboard access is unavailable. */ }
    }
    if (!succeeded) succeeded = copyWithSelection(button.dataset.copyEmail, button);
    showCopyFeedback(button, succeeded);
  });
});

// Autoplay the selected, visible film without a player toolbar.
const videos = [...document.querySelectorAll('video[data-ambient]')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const state = new Map(videos.map(video => [video, {visible:false, userPaused:false, systemPause:false}]));
const selected = video => !video.closest('.video-panel').hidden;
const inViewport = video => {
  const bounds = video.getBoundingClientRect();
  return bounds.width > 0 && bounds.bottom > 0 && bounds.top < window.innerHeight;
};
function pauseVideo(video) {
  if (!video.paused) {
    state.get(video).systemPause = true;
    video.pause();
  }
}
function resumeVideo(video) {
  const info = state.get(video);
  if (!selected(video) || !info.visible || document.hidden || info.userPaused || reducedMotion.matches || document.querySelector('dialog[open]')) return;
  video.muted = true;
  if (video.preload === 'none') video.preload = 'metadata';
  const playing = video.play();
  if (playing) playing.catch(() => { /* A tap or keyboard activation retries playback. */ });
}
videos.forEach(video => {
  video.defaultMuted = true;
  video.muted = true;
  video.loop = true;
  video.controls = false;
  const updateLabel = () => {
    video.setAttribute('aria-label', video.paused ? video.dataset.playLabel : video.dataset.pauseLabel);
    video.setAttribute('aria-pressed', String(!video.paused));
  };
  const toggle = () => {
    if (!video.paused) { state.get(video).userPaused = true; video.pause(); }
    else {
      state.get(video).userPaused = false;
      video.muted = true;
      video.play().catch(() => {});
    }
  };
  video.addEventListener('click', toggle);
  video.addEventListener('keydown', event => {
    if (event.key === ' ' || event.key === 'Enter') { event.preventDefault(); toggle(); }
  });
  video.addEventListener('play', updateLabel);
  video.addEventListener('pause', updateLabel);
  // JavaScript schedules playback at viewport entry; the HTML provides a no-script fallback.
  video.autoplay = false;
  video.addEventListener('pause', () => {
    const info = state.get(video);
    if (!info.systemPause && selected(video) && info.visible && !document.hidden) info.userPaused = true;
    info.systemPause = false;
  });
  video.addEventListener('play', () => {
    state.get(video).userPaused = false;
    videos.forEach(other => { if (other !== video) pauseVideo(other); });
    if (!selected(video) || document.hidden) pauseVideo(video);
  });
});

document.querySelectorAll('.video-choice').forEach(group => {
  const tabs = [...group.querySelectorAll('.video-tab')];
  const select = (next, focus = false) => {
    tabs.forEach(tab => {
      const active = tab === next;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      const panel = document.getElementById(tab.getAttribute('aria-controls'));
      panel.hidden = !active;
      const video = panel.querySelector('video');
      if (!active) pauseVideo(video);
      else {
        const info = state.get(video);
        info.visible = inViewport(video);
        info.userPaused = false;
        resumeVideo(video);
      }
    });
    if (focus) next.focus();
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', event => {
      let target;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') target = tabs[(index + 1) % tabs.length];
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') target = tabs[(index - 1 + tabs.length) % tabs.length];
      if (event.key === 'Home') target = tabs[0];
      if (event.key === 'End') target = tabs[tabs.length - 1];
      if (target) { event.preventDefault(); select(target, true); }
    });
  });
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      state.get(entry.target).visible = entry.isIntersecting;
      if (entry.isIntersecting) resumeVideo(entry.target);
      else pauseVideo(entry.target);
    });
  }, {threshold:0.1});
  videos.forEach(video => observer.observe(video));
} else {
  const update = () => videos.forEach(video => {
    state.get(video).visible = inViewport(video);
    if (state.get(video).visible) resumeVideo(video); else pauseVideo(video);
  });
  window.addEventListener('scroll', update, {passive:true});
  window.addEventListener('resize', update);
  update();
}
document.addEventListener('visibilitychange', () => {
  videos.forEach(video => { if (document.hidden) pauseVideo(video); else resumeVideo(video); });
});
reducedMotion.addEventListener('change', () => {
  videos.forEach(video => { if (reducedMotion.matches) pauseVideo(video); else resumeVideo(video); });
});

const lightbox = document.getElementById('lightbox');
if (lightbox && typeof lightbox.showModal === 'function') {
  let opener;
  document.querySelectorAll('.image-zoom').forEach(button => button.addEventListener('click', () => {
    opener = button;
    const source = button.querySelector('img');
    const enlarged = lightbox.querySelector('img');
    enlarged.src = source.src;
    enlarged.alt = source.alt;
    lightbox.querySelector('p').textContent = source.alt;
    lightbox.showModal();
    videos.forEach(pauseVideo);
    document.body.classList.add('locked');
  }));
  lightbox.querySelector('button').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });
  lightbox.addEventListener('close', () => { document.body.classList.remove('locked'); videos.forEach(resumeVideo); opener?.focus(); });
}

const profileModal = document.getElementById('profile-modal');
if (profileModal && typeof profileModal.showModal === 'function') {
  let profileOpener;
  document.querySelectorAll('.profile-open').forEach(button => button.addEventListener('click', () => {
    profileOpener = button;
    profileModal.showModal();
    profileModal.scrollTop = 0;
    document.body.classList.add('locked');
    videos.forEach(pauseVideo);
  }));
  profileModal.querySelector('.profile-close').addEventListener('click', () => profileModal.close());
  profileModal.addEventListener('click', event => {
    const bounds = profileModal.getBoundingClientRect();
    if (event.target === profileModal && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) profileModal.close();
  });
  profileModal.addEventListener('close', () => {
    document.body.classList.remove('locked');
    profileOpener?.focus();
    videos.forEach(resumeVideo);
  });
}
