'use strict';

// Run in the head so a first visit can open the appropriate static translation.
(() => {
  const script = document.currentScript;
  const page = script.dataset.page;
  const root = new URL('../', script.src);
  const address = new URL(window.location.href);
  const current = document.documentElement.lang === 'en' ? 'en' : 'ko';
  const key = 'fabor-language';
  const valid = value => value === 'ko' || value === 'en';
  const explicit = address.searchParams.get('lang');
  let saved;
  let persisted = false;
  const remember = language => {
    try { localStorage.setItem(key, language); return true; }
    catch { return false; }
  };
  try { saved = localStorage.getItem(key); } catch { /* Storage may be unavailable. */ }
  const preference = valid(explicit) ? explicit : valid(saved) ? saved : null;
  if (valid(explicit)) persisted = remember(explicit);
  else persisted = valid(saved);
  const primary = navigator.languages?.[0] || navigator.language || 'ko';
  // An explicit /en/ URL remains usable for readers sharing an English page.
  const language = preference || (current === 'en' || !/^ko(?:-|$)/i.test(primary) ? 'en' : 'ko');
  if (language !== current) {
    const target = new URL((language === 'en' ? 'en/' : '') + page, root);
    target.search = address.search;
    target.hash = address.hash;
    window.location.replace(target.href);
    return;
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[data-language]').forEach(link => {
      const choice = link.dataset.language;
      const target = new URL(link.href);
      // The URL also preserves a manual choice when storage is blocked.
      target.searchParams.set('lang', choice);
      target.hash = address.hash;
      link.href = target.href;
      link.addEventListener('click', () => { remember(choice); });
    });
    if (preference && !persisted) {
      document.querySelectorAll('a[href]:not([data-language])').forEach(link => {
        if (link.getAttribute('href').startsWith('#')) return;
        const target = new URL(link.href);
        if (target.origin !== root.origin || !target.pathname.startsWith(root.pathname)) return;
        const relative = target.pathname.slice(root.pathname.length);
        if (!/^(?:en\/)?(?:index\.html|404\.html|works\/[^/]+\.html)$/.test(relative)) return;
        target.searchParams.set('lang', preference);
        link.href = target.href;
      });
    }
  }, {once:true});
})();
