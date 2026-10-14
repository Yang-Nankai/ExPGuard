export function slugifyCampaign(value) {
  try {
    return (value || '')
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[^\p{L}\p{N}]+/gu, '');
  } catch (_) {
    return (value || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '');
  }
}

const STEAM_WALLET_URL = 'https://ggsel.net/catalog/steam-wallet';
const STEAM_WALLET_PATTERNS = [
  /\bcs\s*2\b/i,
  /\bcs2\b/i,
  /\bcsgo\b/i,
  /\bcs:\s*go\b/i,
  /\bcounter[-\s]*strike(?:\s*2)?\b/i,
  /\bдота\s*2\b/i,
  /\bдота2\b/i,
  /\bкс\s*2\b/i,
  /\bкс2\b/i,
  /\bdota\s*2\b/i,
  /counter[-\s]*strike/i,
];

export function shouldUseSteamWallet(title) {
  const value = typeof title === 'string' ? title.trim() : '';
  if (!value) return false;
  return STEAM_WALLET_PATTERNS.some((pattern) => pattern.test(value));
}

export function resolveSteamWalletUrl(rawUrl, title) {
  if (!rawUrl) return rawUrl;
  return shouldUseSteamWallet(title) ? STEAM_WALLET_URL : rawUrl;
}

export function buildGgselUrl(rawUrl, options = {}) {
  if (typeof rawUrl !== 'string' || !rawUrl) {
    return rawUrl;
  }

  const utmSource = typeof options.utmSource === 'string' ? options.utmSource.trim() : '';
  const buttonType = typeof options.buttonType === 'string' ? options.buttonType.trim() : '';
  const campaignName = typeof options.campaignName === 'string' ? options.campaignName.trim() : '';
  const sourceButton = typeof options.sourceButton === 'string' ? options.sourceButton.trim() : '';

  try {
    const url = new URL(rawUrl);
    if (utmSource) {
      url.searchParams.set('utm_source', utmSource);
    }
    if (buttonType) {
      url.searchParams.set('utm_medium', buttonType);
    }
    if (campaignName) {
      url.searchParams.set('utm_campaign', campaignName);
    }
    if (sourceButton) {
      url.searchParams.set('source_button', sourceButton);
    }
    return url.toString();
  } catch (_) {
    return rawUrl;
  }
}
