// Fires `ggsel_visit` analytics event when user lands on ggsel.net via a
// link from this extension.
// Closes step 4 of the conversion funnel: Twitch → Button → Click → ggsel.net.
//
// IMPORTANT — early bail before dynamic import:
//   manifest matches "*://*.ggsel.net/*" which includes twitch.ggsel.net/admin/
//   and every organic visitor of the ggsel.net storefront. Only a small slice
//   of those URLs have our UTM markers. Earlier versions imported the heavy
//   common/initContentScript.js module first and only THEN bailed on UTM — that
//   produced two real problems:
//     1. Wasted CPU + MV3 dynamic-import races on every ggsel.net page load.
//     2. Service-worker context invalidation made the dynamic import randomly
//        fail with "TypeError: Failed to fetch dynamically imported module",
//        which surfaced as user-visible errors in the extension's error log.
//   The UTM check is now done BEFORE any chrome.runtime.getURL / import call.
(async function () {
  try {
    const EXTENSION_UTM_SOURCE = 'ggsel_twitch_extension';
    const params = new URL(location.href).searchParams;
    const utmSource = params.get('utm_source') || '';
    const utmMedium = params.get('utm_medium') || '';
    const utmCampaign = params.get('utm_campaign') || '';
    const sourceButton = params.get('source_button') || '';

    // Only fire when user arrived from this extension (defense against
    // scoring noise from organic ggsel.net traffic).
    const fromExtension = utmSource === EXTENSION_UTM_SOURCE || sourceButton.length > 0;
    if (!fromExtension) return;

    const { initContentScript } = await import(chrome.runtime.getURL('common/initContentScript.js'));
    const ctx = await initContentScript();
    const { sendAnalyticsEvent } = ctx;
    if (typeof sendAnalyticsEvent !== 'function') return;

    sendAnalyticsEvent('ggsel_visit', {
      utm_source: utmSource || undefined,
      utm_medium: utmMedium || undefined,
      utm_campaign: utmCampaign || undefined,
      source_button: sourceButton || undefined,
      page_location: location.href.split('#')[0],
      page_path: location.pathname,
    });
  } catch (error) {
    console.warn('Failed to track ggsel_visit', error);
  }
})();
