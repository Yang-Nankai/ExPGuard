export async function initContentScript() {
  const [{ getSettings }, { backgroundFetchJson }, analyticsMod, configMod, linkMod] = await Promise.all([
    import(chrome.runtime.getURL('common/storage.js')),
    import(chrome.runtime.getURL('common/backgroundFetch.js')),
    import(chrome.runtime.getURL('common/analytics.js')).catch(() => null),
    import(chrome.runtime.getURL('common/config.js')).catch(() => null),
    import(chrome.runtime.getURL('common/ggselLink.js')).catch(() => null),
  ]);

  const sendAnalyticsEvent = analyticsMod?.sendAnalyticsEvent || (() => Promise.resolve(false));
  const touchMonthlyActive = analyticsMod?.touchMonthlyActive || (() => Promise.resolve(false));
  const createUsageTracker = analyticsMod?.createUsageTracker || null;
  const recoverOrphanedUsageSession = analyticsMod?.recoverOrphanedUsageSession || (() => Promise.resolve(false));
  const DEFAULT_UTM_SOURCE = configMod?.DEFAULT_UTM_SOURCE || 'ggsel_twitch_extension';
  const buildGgselUrl = linkMod?.buildGgselUrl || ((url) => url);
  const slugifyCampaign = linkMod?.slugifyCampaign || ((v) => String(v || '').toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, ''));

  const settings = await getSettings();

  return {
    settings,
    getSettings,
    backgroundFetchJson,
    sendAnalyticsEvent,
    touchMonthlyActive,
    createUsageTracker,
    recoverOrphanedUsageSession,
    DEFAULT_UTM_SOURCE,
    buildGgselUrl,
    slugifyCampaign,
  };
}
