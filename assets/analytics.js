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
  const campaignFields = {
    utm_id: 'campaign_id',
    utm_source: 'campaign_source',
    utm_medium: 'campaign_medium',
    utm_campaign: 'campaign_name',
    utm_term: 'campaign_term',
    utm_content: 'campaign_content'
  };
  const campaignConfig = {};
  const cleanUrl = (value, keepCampaign = false) => {
    try {
      const url = new URL(value);
      if (!/^https?:$/.test(url.protocol)) return '';
      const clean = new URL(url.origin + url.pathname);
      if (keepCampaign) {
        for (const [key, field] of Object.entries(campaignFields)) {
          const label = url.searchParams.get(key)?.trim();
          // Preserve marketing labels only. Drop unrelated parameters and fragments.
          // Do not put contact details in campaign labels; reject email-like values.
          if (!label || label.length > 100 || /[@\u0000-\u001f\u007f]/.test(label)) continue;
          clean.searchParams.set(key, label);
          campaignConfig[field] = label;
        }
      }
      return clean.href;
    }
    catch { return ''; }
  };
  const pageLocation = cleanUrl(location.href, true);
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    ...campaignConfig,
    send_page_view: true,
    page_location: pageLocation,
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
