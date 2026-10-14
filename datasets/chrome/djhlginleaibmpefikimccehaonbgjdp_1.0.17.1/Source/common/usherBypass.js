export const USHER_BYPASS_RULE_WITH_QUERY_ID = 20801;
export const USHER_BYPASS_RULE_NO_QUERY_ID = 20802;

const USHER_REGEX_WITH_QUERY =
  '^https://usher\\.ttvnw\\.net/((?:api/(?:v\\d+/)?channel/hls|vod)/([^/?]+\\.m3u8))\\?(.*)$';
const USHER_REGEX_NO_QUERY =
  '^https://usher\\.ttvnw\\.net/((?:api/(?:v\\d+/)?channel/hls|vod)/([^/?]+\\.m3u8))$';

const BYPASS_RULE_IDS = [USHER_BYPASS_RULE_WITH_QUERY_ID, USHER_BYPASS_RULE_NO_QUERY_ID];

/**
 * Builds a DNR update that controls how usher.ttvnw.net requests are handled.
 *
 * Four states exist, driven by `enable` (master toggle), `token` (user OAuth),
 * and `unlock2k` (opt-in to send OAuth through our backend for 2K):
 *
 *   1. enable=false                   → clear rules; static redirect is also disabled by caller
 *   2. enable=true, anon, no unlock2k → clear rules; static redirect routes anon traffic to bek
 *   3. enable=true, logged-in, no unlock2k → `allow` rule cancels the static redirect;
 *      browser talks to usher directly with its own auth, getting source quality
 *   4. enable=true, logged-in, unlock2k → `redirect` rule routes to bek with the user's
 *      authToken attached; bek forwards Authorization to usher to unlock 2K
 *
 * Anon + unlock2k relies on a service-level token configured on the backend
 * (TWITCH_AUTHORIZATION env), so no extension-side rule change is needed.
 */
export function buildUsherBypassRulesUpdate({ token, enable, unlock2k, playlistBaseUrl, clientIntegrity, deviceId }) {
  const removeRuleIds = BYPASS_RULE_IDS.slice();
  const normalized = typeof token === 'string' ? token.trim() : '';

  if (!enable || !normalized) {
    return { removeRuleIds, addRules: [] };
  }

  if (unlock2k) {
    const base = typeof playlistBaseUrl === 'string' ? playlistBaseUrl.replace(/\/$/, '') : '';
    if (!base) {
      return { removeRuleIds, addRules: [] };
    }
    const encoded = encodeURIComponent(normalized);
    const integrityRaw = typeof clientIntegrity === 'string' ? clientIntegrity.trim() : '';
    const deviceIdRaw = typeof deviceId === 'string' ? deviceId.trim() : '';
    // 2K unlock needs all three creds together: OAuth + PASETO integrity + Device-ID.
    // When any is missing, the bek uses forward-PAT (1080p) instead of re-minting.
    const extraSuffix = integrityRaw && deviceIdRaw
      ? `&clientIntegrity=${encodeURIComponent(integrityRaw)}&deviceId=${encodeURIComponent(deviceIdRaw)}`
      : '';
    return {
      removeRuleIds,
      addRules: [
        {
          id: USHER_BYPASS_RULE_WITH_QUERY_ID,
          priority: 200,
          action: {
            type: 'redirect',
            redirect: { regexSubstitution: `${base}/\\1?\\3&authToken=${encoded}${extraSuffix}` },
          },
          condition: {
            regexFilter: USHER_REGEX_WITH_QUERY,
            resourceTypes: ['xmlhttprequest', 'media'],
          },
        },
        {
          id: USHER_BYPASS_RULE_NO_QUERY_ID,
          priority: 200,
          action: {
            type: 'redirect',
            redirect: { regexSubstitution: `${base}/\\1?authToken=${encoded}${extraSuffix}` },
          },
          condition: {
            regexFilter: USHER_REGEX_NO_QUERY,
            resourceTypes: ['xmlhttprequest', 'media'],
          },
        },
      ],
    };
  }

  return {
    removeRuleIds,
    addRules: [
      {
        id: USHER_BYPASS_RULE_WITH_QUERY_ID,
        priority: 200,
        action: { type: 'allow' },
        condition: {
          regexFilter: USHER_REGEX_WITH_QUERY,
          resourceTypes: ['xmlhttprequest', 'media'],
        },
      },
      {
        id: USHER_BYPASS_RULE_NO_QUERY_ID,
        priority: 200,
        action: { type: 'allow' },
        condition: {
          regexFilter: USHER_REGEX_NO_QUERY,
          resourceTypes: ['xmlhttprequest', 'media'],
        },
      },
    ],
  };
}
