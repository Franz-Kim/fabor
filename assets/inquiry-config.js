/* Public settings only. Google credentials and the spreadsheet ID NEVER belong here. */
window.FABOR_INQUIRY = {
  mode: 'live', // Public deployment: real enquiries are saved and emailed.
  endpoint: 'https://script.google.com/macros/s/AKfycbwFAENp2GHVR-zOf43HFkig0D49TYW2DHfVrl66xurwifhcphVA3NODJ77-TByqaKlB/exec', // Published Google Apps Script /exec URL.
  email: 'faborobjet@gmail.com',
  privacyApproved: true,
  privacyVersion: 'inquiry-2026-11-v1',
  retentionMonths: 12, // Retain for 12 months from receipt; see the enquiry information notice.
  event: {
    enabled: false, // Normal site: false. Important event: true.
    id: 'sdf-2026',
    startAt: '', // Optional ISO timestamp with timezone, e.g. YYYY-MM-DDTHH:mm:ss+09:00.
    endAt: '' // Optional exclusive end. Keep blank until the actual schedule is confirmed.
  }
};
