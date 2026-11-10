/* GA4. This public measurement ID is not a password. */
(() => {
  'use strict';
  const measurementId = 'G-J1DY2XX4LK';
  if (location.protocol !== 'https:' || !['fabor.kr', 'www.fabor.kr'].includes(location.hostname)) return;
  if (window.FABOR_LANGUAGE_REDIRECT || window.FABOR_INQUIRY?.mode === 'preview') return;
  if (navigator.globalPrivacyControl || navigator.doNotTrack === '1') return;
  if (window.FABOR_ANALYTICS_LOADED) return;
  window.FABOR_ANALYTICS_LOADED = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  const cleanUrl = value => {
    try { const url = new URL(value); return /^https?:$/.test(url.protocol) ? url.origin + url.pathname : ''; }
    catch { return ''; }
  };
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    send_page_view: true,
    page_location: cleanUrl(location.href),
    page_referrer: cleanUrl(document.referrer),
    page_title: document.title,
    content_group: 'fabor_website',
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  });
  const tag = document.createElement('script');
  tag.async = true;
  tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
  document.head.append(tag);

  // Only fixed event names and entry labels leave the site. Never pass form values,
  // receipt numbers, request IDs, or a complete enquiry payload to Analytics.
  for (const [signal, eventName] of Object.entries({
    'fabor:inquiry-open': 'inquiry_open',
    'fabor:inquiry-received': 'generate_lead'
  })) {
    document.addEventListener(signal, event => {
      window.gtag('event', eventName, {
        send_to: measurementId,
        content_group: 'fabor_website',
        enquiry_entry: event.detail?.entry === 'event' ? 'event' : 'contact',
        site_language: document.documentElement.lang === 'en' ? 'en' : 'ko'
      });
    });
  }
})();
