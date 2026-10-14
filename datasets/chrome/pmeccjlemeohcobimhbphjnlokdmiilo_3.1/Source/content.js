// content.js

let selecting = false;
const DEBUG_CROPPED_AREA = false;
let startX, startY;
let selectionBox, guideHorizontal, guideVertical, overlay;
let originalStyles = {};

let lastImageDataUrl = null;
let lastCoords = null; // Store last coords for re-OCR on language change
let selectionCount = 0; // Number of area selections (NOT OCR re-runs on language change)

// Monetize state (token-based)
const DEFAULT_OCR_BALANCE_TYPE = 'standard'; // must match Monetize "Query Price Level" configured for your API Provider
let ocrBalanceType = DEFAULT_OCR_BALANCE_TYPE;
let monetizeMode = 'guest'; // 'guest' | 'no_tokens' | 'tokened'
let tokenCount = 0;
let isAuthenticated = false;
let isPaidUser = false;
let lastAutoPromptSelection = 0; // last selectionCount where we auto-opened the paywall
let isUpgradeFlowActive = false; // prevents paywall+popup race conditions

// Free-tier limiter: OCR actions (Google + Tesseract) for non-paid users (rolling 24h)
const FREE_OCR_USES_LIMIT = 3;
const FREE_OCR_WINDOW_MS = 24 * 60 * 60 * 1000;
const MS_OCR_USAGE_KEY = 'ms_ocr_action_timestamps';
// Legacy key for migration from old Tesseract-only limit
const MS_TESSERACT_USAGE_KEY = 'ms_tesseract_ocr_timestamps';
const MS_FIRST_ACTION_ACTIVATION_DONE_KEY = 'ms_first_action_activation_done';
let firstActionActivationDone = false;

function clampNumber(n, min, max) {
  const v = Number(n);
  if (!Number.isFinite(v)) return min;
  return Math.min(max, Math.max(min, v));
}

function formatDurationShort(ms) {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  if (h <= 0) return `${m}m`;
  return `${h}h ${m}m`;
}

async function getRollingOcrUsage() {
  const now = Date.now();
  const rawResult = await syncGet({ [MS_OCR_USAGE_KEY]: [], [MS_TESSERACT_USAGE_KEY]: [] });
  const primary = Array.isArray(rawResult[MS_OCR_USAGE_KEY]) ? rawResult[MS_OCR_USAGE_KEY] : [];
  const legacy = Array.isArray(rawResult[MS_TESSERACT_USAGE_KEY]) ? rawResult[MS_TESSERACT_USAGE_KEY] : [];
  const arr = primary.length ? primary : legacy;
  const pruned = arr
    .map((x) => Number(x))
    .filter((t) => Number.isFinite(t) && t > 0 && (now - t) < FREE_OCR_WINDOW_MS)
    .sort((a, b) => a - b);

  // Persist pruning + migrate legacy key if needed.
  if (pruned.length !== arr.length || (legacy.length && !primary.length)) {
    await syncSet({ [MS_OCR_USAGE_KEY]: pruned });
  }

  const count = pruned.length;
  const remaining = clampNumber(FREE_OCR_USES_LIMIT - count, 0, FREE_OCR_USES_LIMIT);
  const oldest = pruned[0];
  const resetInMs = oldest ? Math.max(0, FREE_OCR_WINDOW_MS - (now - oldest)) : 0;
  return { count, remaining, resetInMs };
}

async function consumeFreeOcrUseIfAvailable() {
  const now = Date.now();
  const rawResult = await syncGet({ [MS_OCR_USAGE_KEY]: [], [MS_TESSERACT_USAGE_KEY]: [] });
  const primary = Array.isArray(rawResult[MS_OCR_USAGE_KEY]) ? rawResult[MS_OCR_USAGE_KEY] : [];
  const legacy = Array.isArray(rawResult[MS_TESSERACT_USAGE_KEY]) ? rawResult[MS_TESSERACT_USAGE_KEY] : [];
  const arr = primary.length ? primary : legacy;
  const pruned = arr
    .map((x) => Number(x))
    .filter((t) => Number.isFinite(t) && t > 0 && (now - t) < FREE_OCR_WINDOW_MS)
    .sort((a, b) => a - b);

  if (pruned.length >= FREE_OCR_USES_LIMIT) {
    // Persist pruning if needed, but do not add a new use.
    if (pruned.length !== arr.length || (legacy.length && !primary.length)) {
      await syncSet({ [MS_OCR_USAGE_KEY]: pruned });
    }
    const count = pruned.length;
    const remaining = 0;
    const oldest = pruned[0];
    const resetInMs = oldest ? Math.max(0, FREE_OCR_WINDOW_MS - (now - oldest)) : FREE_OCR_WINDOW_MS;
    return { allowed: false, count, remaining, resetInMs };
  }

  const next = pruned.concat([now]).sort((a, b) => a - b);
  await syncSet({ [MS_OCR_USAGE_KEY]: next });

  const count = next.length;
  const remaining = clampNumber(FREE_OCR_USES_LIMIT - count, 0, FREE_OCR_USES_LIMIT);
  const oldest = next[0];
  const resetInMs = oldest ? Math.max(0, FREE_OCR_WINDOW_MS - (now - oldest)) : 0;
  return { allowed: true, count, remaining, resetInMs };
}

async function enforceFreeOcrLimitOrPaywall(lang = 'eng') {
  // Paid users are not limited here.
  let state = null;
  try {
    state = await refreshMonetizeState({ force: true });
  } catch (e) {
    state = { mode: monetizeMode, isPaidUser };
  }
  if (state?.isPaidUser) return { allowed: true, mode: state?.mode || monetizeMode };

  const gate = await consumeFreeOcrUseIfAvailable();
  if (gate.allowed) return { allowed: true, mode: state?.mode || monetizeMode };

  const resetIn = gate.resetInMs ? formatDurationShort(gate.resetInMs) : '24h';
  const message = `That’s your free OCR limit for today.\nUpgrade to continue, or try again in ${resetIn}.`;

  // Paywall-first on block
  try {
    if (typeof paywall !== 'undefined' && typeof paywall.open === 'function') {
      await openUpgradeFlow({ reason: 'ocr-rolling-limit', rerunOcr: true, forceRenew: true });
      const after = await refreshMonetizeState({ force: true });
      if (after?.isPaidUser) {
        // openUpgradeFlow will auto-rerun OCR, so stop this flow.
        return { allowed: false, upgraded: true, message, resetInMs: gate.resetInMs };
      }
    }
  } catch (e) {}

  // Still free/no tokens: show overlay message and block OCR.
  showPopup(message, lang, false);
  return { allowed: false, upgraded: false, message, resetInMs: gate.resetInMs };
}

function syncGet(keysWithDefaults) {
  return new Promise((resolve) => {
    try {
      chrome.storage.sync.get(keysWithDefaults, resolve);
    } catch (e) {
      resolve(keysWithDefaults);
    }
  });
}

function syncSet(obj) {
  return new Promise((resolve) => {
    try {
      chrome.storage.sync.set(obj, () => resolve(true));
    } catch (e) {
      resolve(false);
    }
  });
}

// Keep local in-memory cache in sync across tabs/windows
try {
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== 'sync') return;
    if (changes.ms_selection_count) selectionCount = Number(changes.ms_selection_count.newValue) || 0;
    if (changes.ms_last_auto_prompt_selection) lastAutoPromptSelection = Number(changes.ms_last_auto_prompt_selection.newValue) || 0;
    if (changes.ms_ocr_balance_type && typeof changes.ms_ocr_balance_type.newValue === 'string') {
      ocrBalanceType = changes.ms_ocr_balance_type.newValue || DEFAULT_OCR_BALANCE_TYPE;
    }
    if (changes.ms_mode && typeof changes.ms_mode.newValue === 'string') {
      const v = changes.ms_mode.newValue;
      if (v === 'guest' || v === 'no_tokens' || v === 'tokened') monetizeMode = v;
    }
    if (changes.ms_token_count) tokenCount = Number(changes.ms_token_count.newValue) || 0;
    if (changes.ms_signed_in) isAuthenticated = !!changes.ms_signed_in.newValue;
    if (changes.ms_paid_user) isPaidUser = !!changes.ms_paid_user.newValue;
    if (changes.ms_first_action_activation_done) firstActionActivationDone = !!changes.ms_first_action_activation_done.newValue;
  });
} catch (e) {}

// Initialize cached state ASAP to avoid showing wrong UI on first popup
try {
  chrome.storage.sync.get({
    ms_signed_in: false,
    ms_mode: 'guest',
    ms_token_count: 0,
    ms_selection_count: 0,
    ms_ocr_balance_type: DEFAULT_OCR_BALANCE_TYPE,
    ms_last_auto_prompt_selection: 0,
    ms_paid_user: false,
    ms_first_action_activation_done: false,
  }, ({ ms_signed_in, ms_mode, ms_token_count, ms_selection_count, ms_ocr_balance_type, ms_last_auto_prompt_selection, ms_paid_user, ms_first_action_activation_done }) => {
    isAuthenticated = !!ms_signed_in;
    monetizeMode = (ms_mode === 'tokened' || ms_mode === 'no_tokens' || ms_mode === 'guest') ? ms_mode : 'guest';
    tokenCount = Number(ms_token_count) || 0;
    selectionCount = Number(ms_selection_count) || 0;
    ocrBalanceType = typeof ms_ocr_balance_type === 'string' && ms_ocr_balance_type.trim() ? ms_ocr_balance_type.trim() : DEFAULT_OCR_BALANCE_TYPE;
    lastAutoPromptSelection = Number(ms_last_auto_prompt_selection) || 0;
    isPaidUser = !!ms_paid_user;
    firstActionActivationDone = !!ms_first_action_activation_done;
  });
} catch (e) {}

// Refresh Monetize state on page load (non-blocking)
document.addEventListener('DOMContentLoaded', async function() {
  try {
    await refreshMonetizeState({ force: true });
  } catch (error) {
    console.error("Monetize state refresh failed", error);
  }
});

// Helper: Extract base64 content from data URL or return original if already base64
function extractBase64FromDataUrl(possiblyDataUrl) {
  try {
    if (typeof possiblyDataUrl === 'string' && possiblyDataUrl.startsWith('data:')) {
      const commaIndex = possiblyDataUrl.indexOf(',');
      return possiblyDataUrl.substring(commaIndex + 1);
    }
  } catch (e) {}
  return possiblyDataUrl;
}

// Helper: Parse Google Vision API response into { text, confidence }
function parseGoogleVisionResponseToResult(json) {
  try {
    // Accept both raw Vision response and our legacy shape
    if (json && typeof json.text === 'string') {
      return { text: json.text, confidence: json.confidence };
    }
    const responses = json && (json.responses || json.data?.responses);
    if (!responses || !responses[0]) return { text: '', confidence: undefined };
    const r0 = responses[0];
    const fullText = r0.fullTextAnnotation && r0.fullTextAnnotation.text ? r0.fullTextAnnotation.text : '';
    // Compute a rough confidence if available (average of page confidences)
    let confidence;
    try {
      const pages = r0.fullTextAnnotation && r0.fullTextAnnotation.pages || [];
      if (pages.length) {
        let sum = 0, count = 0;
        for (const p of pages) {
          if (typeof p.confidence === 'number') { sum += p.confidence; count++; }
        }
        confidence = count ? Math.round((sum / count) * 100) : undefined;
      }
    } catch (e) {}
    return { text: fullText, confidence };
  } catch (e) {
    return { text: '', confidence: undefined };
  }
}

// Helper: Normalize Monetize paywall.makeRequest response into { ok, status, data }
async function normalizeMonetizeResponse(res) {
  try {
    if (res && typeof res.json === 'function') {
      // Fetch-like Response
      const data = await res.json();
      return { ok: !!res.ok, status: typeof res.status === 'number' ? res.status : 200, data };
    }
    // Already parsed object (SDK or gateway returned JSON directly)
    const status = (res && typeof res.status === 'number') ? res.status : (res && res.error ? 400 : 200);
    const ok = (typeof res?.ok === 'boolean') ? res.ok : (status >= 200 && status < 300 && !res?.error);
    return { ok, status, data: res };
  } catch (e) {
    return { ok: false, status: 500, data: { error: e && e.message ? e.message : 'Failed to parse response' } };
  }
}

// Monetize user + token balances
async function fetchMonetizeUserWithTimeout(timeoutMs = 2500) {
  try {
    if (typeof paywall === 'undefined' || typeof paywall.getUser !== 'function') {
      return { error: 'paywall-sdk-unavailable' };
    }
    const res = await Promise.race([
      paywall.getUser(),
      new Promise((_, reject) => setTimeout(() => reject(new Error('getUser timeout')), timeoutMs)),
    ]);
    return res || { error: 'empty-user' };
  } catch (err) {
    // Monetize SDK throws strings like: 'not-enough-queries', 'Unauthorized', 'access-denied'
    return { error: typeof err === 'string' ? err : (err && err.message ? err.message : 'getUser-failed') };
  }
}

function isTransientMonetizeError(err) {
  // Errors that should NOT flip UI/mode because they're often temporary during iframe init,
  // network hiccups, or right after auth/purchase transitions.
  return (
    err === 'getUser timeout' ||
    err === 'paywall-sdk-unavailable' ||
    err === 'getUser-failed' ||
    err === 'empty-user' ||
    err === 'request-failed' ||
    err === 'Monetize request failed'
  );
}

function isAuthMonetizeError(err) {
  return err === 'Unauthorized' || err === 'access-denied';
}

function computeTokenCountFromUser(user, balanceType) {
  try {
    const balances = Array.isArray(user?.balances) ? user.balances : [];
    const b = balances.find(x => x && x.type === balanceType);
    const c = Number(b?.count);
    return Number.isFinite(c) ? c : 0;
  } catch (e) {
    return 0;
  }
}

function detectBestBalanceType(user, preferredType) {
  try {
    const balances = Array.isArray(user?.balances) ? user.balances : [];
    let bestType = preferredType;
    let bestCount = computeTokenCountFromUser(user, preferredType);

    for (const b of balances) {
      const t = b?.type;
      const c = Number(b?.count);
      if (!t || !Number.isFinite(c)) continue;
      if (c > bestCount) {
        bestCount = c;
        bestType = t;
      }
    }

    return { balanceTypeUsed: bestType || preferredType, bestCount: Number(bestCount) || 0 };
  } catch (e) {
    return { balanceTypeUsed: preferredType, bestCount: 0 };
  }
}

function deriveMonetizeState(user, preferredBalanceType) {
  const authed = !!user && !user.error;
  const paid = !!user?.paid;
  if (!authed) {
    return {
      user,
      isAuthenticated: false,
      isPaidUser: false,
      tokenCount: 0,
      tokensAvailable: false,
      mode: 'guest',
      balanceTypeUsed: preferredBalanceType,
    };
  }

  // Monetize uses user.balances[{type,count}] (docs example).
  // If our preferred balance type doesn't match the paywall setup, auto-detect the best non-zero balance
  // to avoid UI flapping (tokened -> no_tokens) due to type mismatch.
  const { balanceTypeUsed, bestCount } = detectBestBalanceType(user, preferredBalanceType);
  const tokensAvailable = bestCount > 0;
  const mode = tokensAvailable ? 'tokened' : 'no_tokens';

  return { user, isAuthenticated: true, isPaidUser: paid, tokenCount: bestCount, tokensAvailable, mode, balanceTypeUsed };
}

async function refreshMonetizeState({ force = false } = {}) {
  // Optional: throttle refreshes in the future; for now keep it simple + correct.
  if (!force && (monetizeMode === 'tokened' || monetizeMode === 'no_tokens' || monetizeMode === 'guest')) {
    // still refresh on demand elsewhere
  }
  const prev = {
    mode: monetizeMode,
    tokenCount,
    isAuthenticated,
    isPaidUser,
    balanceType: ocrBalanceType,
  };

  const user = await fetchMonetizeUserWithTimeout(2500);

  // If Monetize returned an error object, only change mode when the error is definitive.
  // Otherwise keep previous state to avoid UI flapping (tokened -> guest/no_tokens).
  if (user && user.error) {
    const err = user.error;
    if (isAuthMonetizeError(err)) {
      monetizeMode = 'guest';
      tokenCount = 0;
      isAuthenticated = false;
      isPaidUser = false;
      try {
        chrome.storage.sync.set({
          ms_mode: monetizeMode,
          ms_token_count: tokenCount,
          ms_signed_in: isAuthenticated,
          ms_paid_user: isPaidUser,
          ms_ocr_balance_type: ocrBalanceType,
        });
      } catch (e) {}
      return { user, isAuthenticated, isPaidUser, tokenCount, tokensAvailable: false, mode: monetizeMode, balanceTypeUsed: ocrBalanceType };
    }
    if (err === 'not-enough-queries') {
      monetizeMode = 'no_tokens';
      tokenCount = 0;
      isAuthenticated = true;
      try {
        chrome.storage.sync.set({
          ms_mode: monetizeMode,
          ms_token_count: tokenCount,
          ms_signed_in: isAuthenticated,
          ms_paid_user: isPaidUser,
          ms_ocr_balance_type: ocrBalanceType,
        });
      } catch (e) {}
      return { user, isAuthenticated, isPaidUser, tokenCount, tokensAvailable: false, mode: monetizeMode, balanceTypeUsed: ocrBalanceType };
    }
    if (isTransientMonetizeError(err)) {
      return {
        user,
        isAuthenticated: prev.isAuthenticated,
        isPaidUser: prev.isPaidUser,
        tokenCount: prev.tokenCount,
        tokensAvailable: prev.mode === 'tokened',
        mode: prev.mode,
        balanceTypeUsed: prev.balanceType,
      };
    }
    // Unknown error: be conservative and keep previous state.
    return {
      user,
      isAuthenticated: prev.isAuthenticated,
      isPaidUser: prev.isPaidUser,
      tokenCount: prev.tokenCount,
      tokensAvailable: prev.mode === 'tokened',
      mode: prev.mode,
      balanceTypeUsed: prev.balanceType,
    };
  }

  const state = deriveMonetizeState(user, ocrBalanceType);

  monetizeMode = state.mode;
  tokenCount = state.tokenCount;
  isAuthenticated = state.isAuthenticated;
  isPaidUser = !!state.isPaidUser;
  if (state.balanceTypeUsed && state.balanceTypeUsed !== ocrBalanceType) {
    ocrBalanceType = state.balanceTypeUsed;
  }

  try {
    chrome.storage.sync.set({
      ms_mode: monetizeMode,
      ms_token_count: tokenCount,
      ms_signed_in: isAuthenticated,
      ms_paid_user: isPaidUser,
      ms_ocr_balance_type: ocrBalanceType,
    });
  } catch (e) {}

  return state;
}

async function ensurePaywallOverlayPointerEvents(enabled) {
  try {
    const popup = document.getElementById('ocr-popup');
    const container = popup && popup.querySelector('#paywall-overlay-container');
    if (container) container.style.pointerEvents = enabled ? 'auto' : 'none';
  } catch (e) {}
}

async function openUpgradeFlow({ reason = 'manual', rerunOcr = true, forceRenew = false } = {}) {
  try { mountPaywallInsidePopup(); } catch (e) {}
  await ensurePaywallOverlayPointerEvents(true);
  isUpgradeFlowActive = true;

  // Refresh quickly to decide the right action
  const state = await refreshMonetizeState({ force: true });
  const isGuest = state.mode === 'guest';

  try {
    // Safety: don't open pricing automatically if we already have tokens.
    if (state.mode === 'tokened' && String(reason).startsWith('auto-selection-4') && !forceRenew) {
      console.log('[TFI Monetize] Upgrade flow skipped (already tokened)', { reason, balanceType: ocrBalanceType, tokenCount });
      return state;
    }

    if (isGuest) {
      console.log('[TFI Monetize] Upgrade flow (guest): opening sign-in', { reason });
      await paywall.open({ resolveEvent: 'signed-in' });
      console.log('[TFI Monetize] Upgrade flow (guest): signed-in');

      // After sign-in, if user has no tokens, immediately open pricing (renew).
      // Note: getUser() can lag right after login; if we can't confirm tokened mode, still open renew.
      let afterSignIn = null;
      try {
        afterSignIn = await refreshMonetizeState({ force: true });
      } catch (e) {}

      const confirmedTokened = afterSignIn && afterSignIn.mode === 'tokened';
      if (!confirmedTokened || forceRenew) {
        // Give the paywall UI a moment to transition auth state before asking it to renew.
        await new Promise(r => setTimeout(r, 250));
        try {
          console.log('[TFI Monetize] Upgrade flow (guest): opening pricing (renew)', {
            mode: afterSignIn?.mode,
            tokenCount: afterSignIn?.tokenCount,
            balanceType: ocrBalanceType,
          });
          await paywall.renew();
        } catch (e) {
          console.log('[TFI Monetize] Upgrade flow (guest): renew closed/cancelled');
        }
      } else {
        console.log('[TFI Monetize] Upgrade flow (guest): already tokened, skipping renew');
      }
    } else {
      // signed-in but no tokens OR tokened but wants to top up
      // If tokened and this is manual, you might still want to top up; otherwise skip.
      if (state.mode === 'tokened' && !forceRenew) {
        console.log('[TFI Monetize] Upgrade flow (signed-in): already tokened, skipping renew', { reason, balanceType: ocrBalanceType, tokenCount });
      } else {
        console.log('[TFI Monetize] Upgrade flow (signed-in): opening pricing (renew)', { reason, mode: state.mode });
        await paywall.renew();
      }
    }
  } catch (e) {
    // user closed / cancelled
    console.log('[TFI Monetize] Upgrade flow aborted/closed', { reason });
  } finally {
    isUpgradeFlowActive = false;
    await ensurePaywallOverlayPointerEvents(false);
  }

  // Always refresh after paywall close (login or purchase might have changed balances)
  const after = await refreshMonetizeState({ force: true });

  // Rerun OCR automatically only after paid conversion to avoid renew->limit loops
  // for free tokened users blocked by the daily cap.
  if (rerunOcr && after.isPaidUser && lastImageDataUrl) {
    try {
      const popup = document.getElementById('ocr-popup');
      const languageSelect = popup?.querySelector('.ocr-lang-select');
      const lang = languageSelect?.value || 'eng';
      const currentText = popup?.querySelector('textarea')?.value || '';
      showPopup(currentText, lang, true);
      performOCR(lastImageDataUrl, lang);
    } catch (e) {}
  }

  return after;
}

// NEW: Disable Zooming functions
function preventZoom(e) {
  if (e.ctrlKey) {
    e.preventDefault();
  }
}

function preventZoomKey(e) {
  if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-' || e.key === '=' || e.key === '0')) {
    e.preventDefault();
  }
}

function disableZooming() {
  window.addEventListener('wheel', preventZoom, { passive: false });
  window.addEventListener('keydown', preventZoomKey, { passive: false });
}

function enableZooming() {
  window.removeEventListener('wheel', preventZoom, { passive: false });
  window.removeEventListener('keydown', preventZoomKey, { passive: false });
}
// End of Disable Zooming functions

// Full language list without "detect"
let availableLanguages = [
  { value: "afr", label: "Afrikaans" },
  { value: "amh", label: "Amharic" },
  { value: "ara", label: "Arabic" },
  { value: "asm", label: "Assamese" },
  { value: "aze", label: "Azerbaijani" },
  { value: "aze_cyrl", label: "Azerbaijani - Cyrillic" },
  { value: "bel", label: "Belarusian" },
  { value: "ben", label: "Bengali" },
  { value: "bod", label: "Tibetan" },
  { value: "bos", label: "Bosnian" },
  { value: "bul", label: "Bulgarian" },
  { value: "cat", label: "Catalan; Valencian" },
  { value: "ceb", label: "Cebuano" },
  { value: "ces", label: "Czech" },
  { value: "chi_sim", label: "Chinese - Simplified" },
  { value: "chi_tra", label: "Chinese - Traditional" },
  { value: "chr", label: "Cherokee" },
  { value: "cym", label: "Welsh" },
  { value: "dan", label: "Danish" },
  { value: "deu", label: "German" },
  { value: "dzo", label: "Dzongkha" },
  { value: "ell", label: "Greek, Modern (1453-)" },
  { value: "enm", label: "English, Middle (1100-1500)" },
  { value: "eng", label: "English" },
  { value: "epo", label: "Esperanto" },
  { value: "est", label: "Estonian" },
  { value: "eus", label: "Basque" },
  { value: "fas", label: "Persian" },
  { value: "fra", label: "French" },
  { value: "fin", label: "Finnish" },
  { value: "frk", label: "German Fraktur" },
  { value: "frm", label: "French, Middle (ca. 1400-1600)" },
  { value: "gle", label: "Irish" },
  { value: "glg", label: "Galician" },
  { value: "grc", label: "Greek, Ancient (-1453)" },
  { value: "guj", label: "Gujarati" },
  { value: "hat", label: "Haitian; Haitian Creole" },
  { value: "heb", label: "Hebrew" },
  { value: "hin", label: "Hindi" },
  { value: "hrv", label: "Croatian" },
  { value: "hun", label: "Hungarian" },
  { value: "iku", label: "Inuktitut" },
  { value: "ind", label: "Indonesian" },
  { value: "isl", label: "Icelandic" },
  { value: "ita", label: "Italian" },
  { value: "ita_old", label: "Italian - Old" },
  { value: "jav", label: "Javanese" },
  { value: "jpn", label: "Japanese" },
  { value: "jpn_vert", label: "Japanese - Vertical" },
  { value: "kan", label: "Kannada" },
  { value: "kat", label: "Georgian" },
  { value: "kat_old", label: "Georgian - Old" },
  { value: "kaz", label: "Kazakh" },
  { value: "khm", label: "Central Khmer" },
  { value: "kir", label: "Kirghiz; Kyrgyz" },
  { value: "kor", label: "Korean" },
  { value: "kur", label: "Kurdish" },
  { value: "lao", label: "Lao" },
  { value: "lat", label: "Latin" },
  { value: "lav", label: "Latvian" },
  { value: "lit", label: "Lithuanian" },
  { value: "mal", label: "Malayalam" },
  { value: "mar", label: "Marathi" },
  { value: "mkd", label: "Macedonian" },
  { value: "mlt", label: "Maltese" },
  { value: "msa", label: "Malay" },
  { value: "mya", label: "Burmese" },
  { value: "nep", label: "Nepali" },
  { value: "nld", label: "Dutch; Flemish" },
  { value: "nor", label: "Norwegian" },
  { value: "ori", label: "Oriya" },
  { value: "pan", label: "Panjabi; Punjabi" },
  { value: "pol", label: "Polish" },
  { value: "por", label: "Portuguese" },
  { value: "pus", label: "Pushto; Pashto" },
  { value: "ron", label: "Romanian; Moldavian; Moldovan" },
  { value: "rus", label: "Russian" },
  { value: "san", label: "Sanskrit" },
  { value: "sin", label: "Sinhala; Sinhalese" },
  { value: "slk", label: "Slovak" },
  { value: "slv", label: "Slovenian" },
  { value: "spa", label: "Spanish; Castilian" },
  { value: "spa_old", label: "Spanish; Castilian - Old" },
  { value: "sqi", label: "Albanian" },
  { value: "srp", label: "Serbian" },
  { value: "swa", label: "Swahili" },
  { value: "swe", label: "Swedish" },
  { value: "syr", label: "Syriac" },
  { value: "tam", label: "Tamil" },
  { value: "tel", label: "Telugu" },
  { value: "tgk", label: "Tajik" },
  { value: "tgl", label: "Tagalog" },
  { value: "tha", label: "Thai" },
  { value: "tir", label: "Tigrinya" },
  { value: "tur", label: "Turkish" },
  { value: "uig", label: "Uighur; Uyghur" },
  { value: "ukr", label: "Ukrainian" },
  { value: "urd", label: "Urdu" },
  { value: "uzb", label: "Uzbek" },
  { value: "uzb_cyrl", label: "Uzbek - Cyrillic" },
  { value: "vie", label: "Vietnamese" },
  { value: "yid", label: "Yiddish" }
];

// Sort languages alphabetically by label
availableLanguages.sort((a, b) => a.label.localeCompare(b.label));

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "startSelection") {
    if (!selecting) {
      startSelection();
      selecting = true;
    }
  } else if (request.action === "capturedImage") {
    processCapturedImage(request.dataUrl, request.coords);
  }
});

function startSelection() {
  originalStyles = {
    cursor: document.body.style.cursor,
    userSelect: document.body.style.userSelect,
  };

  document.body.style.cursor = 'crosshair';
  document.body.style.userSelect = 'none';
  disableZooming();

  overlay = document.createElement('div');
  overlay.classList.add('selection-overlay');
  document.body.appendChild(overlay);

  guideHorizontal = document.createElement('div');
  guideHorizontal.classList.add('selection-guide-horizontal');
  overlay.appendChild(guideHorizontal);

  guideVertical = document.createElement('div');
  guideVertical.classList.add('selection-guide-vertical');
  overlay.appendChild(guideVertical);

  selectionBox = document.createElement('div');
  selectionBox.classList.add('selection-box');
  overlay.appendChild(selectionBox);

  overlay.addEventListener('mousemove', moveHandler);
  overlay.addEventListener('mousedown', mouseDownHandler);
  document.addEventListener('keydown', keyDownHandler);
}

function moveHandler(e) {
  const rect = overlay.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  guideHorizontal.style.top = `${y}px`;
  guideVertical.style.left = `${x}px`;
}

function keyDownHandler(e) {
  if (e.key === "Escape") {
    cancelSelection();
  }
}

function cancelSelection() {
  cleanupSelection();
  selecting = false;
}

function cleanupSelection() {
  if (overlay) document.body.removeChild(overlay);
  document.body.style.cursor = originalStyles.cursor;
  document.body.style.userSelect = originalStyles.userSelect;
  document.removeEventListener('keydown', keyDownHandler);
  enableZooming();
}

function mouseDownHandler(e) {
  e.preventDefault();
  startX = e.clientX;
  startY = e.clientY;

  overlay.addEventListener('mousemove', mouseMoveHandler);
  overlay.addEventListener('mouseup', mouseUpHandler);
}

function mouseMoveHandler(e) {
  updateSelectionBox(e);
}

// In mouseUpHandler, remove the immediate call to showPopup
function mouseUpHandler(e) {
  updateSelectionBox(e);
  const endX = e.clientX;
  const endY = e.clientY;

  cleanupSelection();
  selecting = false;

  // Removed immediate popup call to avoid modifying layout before screenshot capture
  // showPopup('', null, true);

  captureSelectedArea(startX, startY, endX, endY);
}

function updateSelectionBox(e) {
  const currentX = e.clientX;
  const currentY = e.clientY;

  const rect = {
    left: Math.min(startX, currentX),
    top: Math.min(startY, currentY),
    width: Math.abs(currentX - startX),
    height: Math.abs(currentY - startY),
  };

  selectionBox.style.left = `${rect.left - overlay.getBoundingClientRect().left}px`;
  selectionBox.style.top = `${rect.top - overlay.getBoundingClientRect().top}px`;
  selectionBox.style.width = `${rect.width}px`;
  selectionBox.style.height = `${rect.height}px`;

  applyMaskToOverlay(rect);
}

function applyMaskToOverlay(rect) {
  const overlayRect = overlay.getBoundingClientRect();
  const x = rect.left - overlayRect.left;
  const y = rect.top - overlayRect.top;

  const maskCanvas = document.createElement('canvas');
  maskCanvas.width = overlayRect.width;
  maskCanvas.height = overlayRect.height;

  const ctx = maskCanvas.getContext('2d');
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);
  ctx.clearRect(x, y, rect.width, rect.height);

  const maskDataUrl = maskCanvas.toDataURL();
  overlay.style.mask = `url(${maskDataUrl})`;
  overlay.style.webkitMask = `url(${maskDataUrl})`;
}

function captureSelectedArea(startX, startY, endX, endY) {
  const hasVP = window.visualViewport !== undefined;
  const vpOffsetX = hasVP ? window.visualViewport.offsetLeft : 0;
  const vpOffsetY = hasVP ? window.visualViewport.offsetTop : 0;
  const coords = {
    startX: Math.min(startX, endX) - vpOffsetX,
    startY: Math.min(startY, endY) - vpOffsetY,
    endX: Math.max(startX, endX) - vpOffsetX,
    endY: Math.max(startY, endY) - vpOffsetY,
    viewportX: 0,
    viewportY: 0,
  };

  chrome.runtime.sendMessage(
    {
      action: 'captureTab',
      coords: coords,
    },
    (response) => {
      if (response && response.error) {
        console.error('Error capturing the visible tab:', response.error);
      } else {
        processCapturedImage(response.dataUrl, coords);
      }
    }
  );
}

// In processCapturedImage, show the popup with loader immediately after the screenshot is captured, before starting OCR
function processCapturedImage(dataUrl, coords) {
  let image = new Image();
  image.onload = function () {
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');

    const hasVP = window.visualViewport !== undefined;
    const viewportScale = hasVP ? window.visualViewport.scale : 1;
    const dpr = (window.devicePixelRatio || 1) * viewportScale;

    const x = coords.startX * dpr;
    const y = coords.startY * dpr;
    const width = (coords.endX - coords.startX) * dpr;
    const height = (coords.endY - coords.startY) * dpr;

    canvas.width = width;
    canvas.height = height;
    context.drawImage(image, x, y, width, height, 0, 0, width, height);

    const croppedImageDataUrl = canvas.toDataURL('image/png');

    // TEMPORARY DEBUG: Show the cropped area overlay for testing
    if (DEBUG_CROPPED_AREA) {
      const debugImg = document.createElement('img');
      debugImg.src = croppedImageDataUrl;
      debugImg.style.cssText = 'position: fixed; bottom: 100px; right: 20px; border: 2px solid red; z-index: 99999; max-width: 300px; max-height: 300px;';
      document.body.appendChild(debugImg);
      setTimeout(() => { debugImg.remove(); }, 5000);
    }

    // Show the popup with loader immediately after capturing the screenshot
    // (language picker will hydrate from storage)
    showPopup('', 'eng', true);

    lastImageDataUrl = croppedImageDataUrl;
    lastCoords = coords;

    (async () => {
      // Count ONLY new selections (not language re-runs) and make it GLOBAL across tabs.
      try {
        const { ms_selection_count } = await syncGet({ ms_selection_count: 0 });
        selectionCount = (Number(ms_selection_count) || 0) + 1;
        await syncSet({ ms_selection_count: selectionCount });
      } catch (e) {}

      // Prompt sign-in once for activation (works for new + existing users).
      try {
        await maybeRunFirstActionActivationFlow();
      } catch (e) {}

      // Begin OCR processing (after any paywall flow)
      chrome.storage.local.get({ lang: 'eng' }, ({ lang }) => {
        performOCR(croppedImageDataUrl, lang);
      });
    })();
  };
  image.onerror = function () {
    console.error('Failed to load image from data URL');
  };
  image.src = dataUrl;
}

// Modify performOCR function to enforce subscription limits on Google OCR
function performOCR(imageDataUrl, lang = 'eng') {
  console.log("Starting OCR on image with language:", lang);

  // Get existing popup elements from the DOM (unchanged code)
  const popup = document.getElementById('ocr-popup');
  const overlay = popup?.querySelector('.loading-overlay');
  const languageSelect = popup?.querySelector('.ocr-lang-select');
  const copyButton = popup?.querySelector('.ocr-copy-btn');
  
  // Show loading state in existing popup
  if (popup) {
    if (overlay) overlay.style.display = 'flex';
    if (languageSelect) {
      languageSelect.disabled = true;
      languageSelect.style.opacity = '0.5';
    }
    if (copyButton) {
      copyButton.disabled = true;
      copyButton.style.opacity = '0.5';
    }
  }

  // Decide engine for this run from Monetize state (token-based)
  Promise.resolve()
    .then(() => refreshMonetizeState({ force: false }))
    .catch(() => ({ mode: monetizeMode, tokenCount, isAuthenticated, isPaidUser, tokensAvailable: monetizeMode === 'tokened' }))
    .then(async (state) => {
      const effectiveMode = state?.mode || monetizeMode;

    // Enforce free-tier OCR limit (rolling 24h) for all non-paid users,
    // regardless of engine (Google OCR or Tesseract).
    try {
      const gate = await enforceFreeOcrLimitOrPaywall(lang);
      if (!gate.allowed) {
        if (popup) {
          if (overlay) overlay.style.display = 'none';
          if (languageSelect) {
            languageSelect.disabled = false;
            languageSelect.style.opacity = '1';
          }
          if (copyButton) {
            copyButton.disabled = false;
            copyButton.style.opacity = '1';
          }
        }
        return;
      }
    } catch (e) {}

    // Handler to process OCR result
    const handleResult = (result) => {
      const { text, confidence, error } = result || {};

      if (popup) {
        if (overlay) overlay.style.display = 'none';
        if (languageSelect) {
          languageSelect.disabled = false;
          languageSelect.style.opacity = '1';
        }
        if (copyButton) {
          copyButton.disabled = false;
          copyButton.style.opacity = '1';
        }
      }

      if (error) {
        showPopup(`OCR Error: ${error}`, lang);
        return;
      }

      if (effectiveMode !== 'tokened' && (text?.trim() === '' || (confidence !== undefined && confidence < 50))) {
        console.log("Retrying OCR with preprocessing...");
        processImageWithTesseract(imageDataUrl, lang, true, (retryResult) => {
          const { text: retryText, error: retryError } = retryResult || {};
          if (retryError) {
            showPopup(`OCR Error: ${retryError}`, lang);
          } else {
            showPopup(retryText?.trim() || 'No text found', lang);
            // Paywall auto-prompt is handled pre-OCR on selection #4 (paywall-first flow).
          }
        });
        return;
      }

      // If paywall flow is currently active, don't re-render popup yet (it can hide the paywall iframe).
      // We'll render normally once paywall is closed.
      if (!isUpgradeFlowActive) {
        showPopup(text || 'No text found', lang);
      } else {
        // Keep loader until paywall closes; we'll let the post-paywall OCR run render the result.
        showPopup(text || 'No text found', lang, true);
      }
    };

    // Tokened -> Google OCR. Otherwise -> Tesseract OCR.
    if (effectiveMode === 'tokened') {
      mountPaywallInsidePopup();
      processImageWithGoogleVision(imageDataUrl, lang, false, (googleResult) => {
        // Handle Monetize token/auth errors explicitly (docs): not-enough-queries, Unauthorized, access-denied
        if (googleResult?.error === 'not-enough-queries') {
          monetizeMode = 'no_tokens';
          tokenCount = 0;
          isAuthenticated = true;
          try { chrome.storage.sync.set({ ms_mode: 'no_tokens', ms_token_count: 0, ms_signed_in: true, ms_paid_user: isPaidUser }); } catch (e) {}
          processImageWithTesseract(imageDataUrl, lang, false, handleResult);
          return;
        }
        if (googleResult?.error === 'Unauthorized' || googleResult?.error === 'access-denied') {
          monetizeMode = 'guest';
          tokenCount = 0;
          isAuthenticated = false;
          isPaidUser = false;
          try { chrome.storage.sync.set({ ms_mode: 'guest', ms_token_count: 0, ms_signed_in: false, ms_paid_user: false }); } catch (e) {}
          processImageWithTesseract(imageDataUrl, lang, false, handleResult);
          return;
        }
        handleResult(googleResult);
      });
    } else {
      processImageWithTesseract(imageDataUrl, lang, false, handleResult);
    }
  });
}

function processImageWithTesseract(imageDataUrl, lang, applyPreprocessing, callback) {
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.src = chrome.runtime.getURL('ocr.html');
  document.body.appendChild(iframe);

  function messageHandler(event) {
    if (event.source !== iframe.contentWindow) return;
    const { text, confidence, error } = event.data;
    window.removeEventListener('message', messageHandler);
    if (iframe.parentNode) document.body.removeChild(iframe);
    callback({ text, confidence, error });
  }

  window.addEventListener('message', messageHandler);

  iframe.onload = function () {
    console.log('Iframe loaded, sending image data for OCR...');
    iframe.contentWindow.postMessage({ imageDataUrl, applyPreprocessing, lang }, '*');
  };
}

function processImageWithGoogleVision(imageDataUrl, lang, applyPreprocessing, callback) {

  // Use Monetize.software API gateway only (no Firebase fallback)
  try {
    if (typeof paywall !== 'undefined' && typeof paywall.makeRequest === 'function') {
      chrome.storage.local.get({ ms_api_provider_id: 218, ms_paywall_id: 624, ms_test_mode: 0 }, async (cfg) => {
        const providerId = cfg.ms_api_provider_id || 218;
        const paywallId = cfg.ms_paywall_id || 624;
        const testMode = cfg.ms_test_mode ? 1 : 0;

        const imageBase64 = extractBase64FromDataUrl(imageDataUrl);
        const body = {
          requests: [
            {
              image: { content: imageBase64 },
              features: [{ type: 'DOCUMENT_TEXT_DETECTION' }]
            }
          ]
        };

        const requestUrl = `https://appbox.space/api/v1/api-gateway/${providerId}?paywall_id=${encodeURIComponent(paywallId)}${testMode ? `&test_mode=${testMode}` : ''}`;

        try {
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(body)
          };

          // Monetize SDK returns response OR throws string errors like 'not-enough-queries'
          const raw = await paywall.makeRequest(requestUrl, requestOptions);
          const result = await normalizeMonetizeResponse(raw);
          if (!result.ok) {
            const msg = (result.data && (result.data.message || result.data.error)) || 'request-failed';
            callback({ error: msg });
            return;
          }

          const { text, confidence } = parseGoogleVisionResponseToResult(result.data);
          callback({ text, confidence });
          return;
        } catch (err) {
          const msg = typeof err === 'string' ? err : (err && err.message ? err.message : 'Monetize request failed');
          callback({ error: msg });
        }
      });
      return;
    }
  } catch (e) {
    // ignore and fallback
  }
  callback({ error: 'Monetize paywall SDK is not available on this page' });
}
function showPopup(text, lang = 'eng', isLoading = false) {
  const existingPopup = document.getElementById('ocr-popup');
  if (existingPopup) {
    // Preserve Monetize.software iframe across popup closes
    unmountPaywallFromPopup();
    document.body.removeChild(existingPopup);
  }

  const popup = document.createElement('div');
  popup.id = 'ocr-popup';
  popup.style.cssText = `
    all: initial;
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0px 2px 4px rgba(0,0,0,0.2);
    padding: 20px;
    z-index: 10000;
    width: 450px;
    max-width: 95%;
    max-height: 80vh;
    overflow-y: auto;
    font-family: 'Roboto', sans-serif;
    color: #212121;
    box-sizing: border-box;
    text-align: left;
    transform: none;
  `;

  const wrapper = document.createElement('div');
  wrapper.style.cssText = `
    all: unset;
    display: block;
    position: relative;
  `;

// Close Button - Add z-index
const closeButton = document.createElement('button');
closeButton.innerHTML = '&times;';
closeButton.style.cssText = `
  all: unset;
  position: absolute;
  top: 12px;
  right: 14px;
  background-color: transparent;
  border: none;
  color: #333;
  cursor: pointer;
  font-size: 24px;
  line-height: 24px;
  z-index: 3; // Add this line to ensure it stays on top
`;
closeButton.onclick = () => { unmountPaywallFromPopup(); document.body.removeChild(popup); };

  // Customer Portal (paid users)
  const portalButton = document.createElement('a');
  portalButton.href = 'https://appbox.space/paywall/624/customer-portal/get';
  portalButton.target = '_blank';
  portalButton.rel = 'noopener';
  portalButton.title = 'Manage subscription';
  portalButton.style.cssText = `
    all: unset;
    position: absolute;
    top: 12px;
    right: 44px;
    width: 28px;
    height: 28px;
    display: ${isPaidUser ? 'inline-flex' : 'none'};
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: #eef1f7;
    color: #374151;
    cursor: pointer;
    z-index: 3;
    box-shadow: 0 1px 2px rgba(0,0,0,0.15);
  `;
  portalButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-4 0-7 2-7 4.5V20h14v-1.5c0-2.5-3-4.5-7-4.5z"/></svg>';

  // Upgrade badge (shown for free users)
  const upgradeButton = document.createElement('button');
  upgradeButton.textContent = '⬆ Upgrade';
  upgradeButton.style.cssText = `
    all: unset;
    position: absolute;
    top: 14px;
    right: 48px;
    padding: 6px 10px;
    background-color: #007bff;
    color: #fff;
    border-radius: 8px;
    font-size: 12px;
    cursor: pointer;
    display: ${isPaidUser ? 'none' : 'inline-block'};
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    z-index: 3;
  `;
  upgradeButton.addEventListener('click', () => {
    try {
      if (typeof paywall !== 'undefined' && typeof paywall.open === 'function') {
        openUpgradeFlow({ reason: 'manual-upgrade-button' });
      }
    } catch (e) {}
  });

  // Text Container with Overlay
  const textContainer = document.createElement('div');
  textContainer.style.cssText = `
    position: relative;
    margin: 40px 0 20px;
    height: 300px;
  `;

  // Textarea
  const textArea = document.createElement('textarea');
  textArea.classList.add('ocr-textarea');
  const isLimitOverlay = typeof text === 'string' && text.startsWith("That’s your free");
  textArea.value = isLimitOverlay ? '' : text;
  textArea.readOnly = isLoading;
  textArea.style.cssText = `
    all: unset;
    width: 100%;
    height: 100%;
    padding: 10px;
    border: 1px solid ${isLoading ? '#eee' : '#ccc'};
    font-size: 14px;
    resize: vertical;
    border-radius: 4px;
    box-sizing: border-box;
    font-family: inherit;
    color: inherit;
    background-color: #fff;
    position: relative;
    ${isLoading ? 'pointer-events: none;' : ''}
  `;

  // Loading Overlay
  const overlay = document.createElement('div');
  overlay.classList.add('loading-overlay');
  overlay.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.95);
    display: ${isLoading || isLimitOverlay ? 'flex' : 'none'};
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    z-index: 1;
  `;

  // Spinner
  const spinner = document.createElement('div');
  spinner.style.cssText = `
    border: 4px solid #f3f3f3;
    border-radius: 50%;
    border-top: 4px solid #007bff;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    display: ${isLimitOverlay ? 'none' : 'block'};
  `;

  // Loading Text
  const loadingText = document.createElement('div');
  loadingText.textContent = isLimitOverlay ? '' : 'Extracting text...';
  loadingText.style.cssText = `
    margin-top: 15px;
    color: #666;
    font-size: 14px;
  `;

  // Limit overlay content (CTA)
  const limitBox = document.createElement('div');
  limitBox.style.cssText = `
    all: unset;
    display: ${isLimitOverlay ? 'flex' : 'none'};
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 0 16px;
    text-align: center;
  `;

  const limitMsg = document.createElement('div');
  limitMsg.textContent = text;
  limitMsg.style.cssText = `
    all: unset;
    font-size: 14px;
    line-height: 18px;
    color: #111827;
    max-width: 360px;
    white-space: pre-line;
  `;

  const limitUpgradeBtn = document.createElement('button');
  limitUpgradeBtn.type = 'button';
  limitUpgradeBtn.textContent = 'Upgrade';
  limitUpgradeBtn.style.cssText = `
    all: unset;
    padding: 10px 16px;
    border-radius: 10px;
    background: #1a73e8;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  `;
  limitUpgradeBtn.addEventListener('click', () => {
    try {
      if (typeof paywall !== 'undefined' && typeof paywall.open === 'function') {
        openUpgradeFlow({ reason: 'limit-overlay-upgrade' });
      }
    } catch (e) {}
  });

  limitBox.appendChild(limitMsg);
  limitBox.appendChild(limitUpgradeBtn);

  // Spinner Animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  // Assemble Loading Elements
  overlay.appendChild(spinner);
  overlay.appendChild(loadingText);
  overlay.appendChild(limitBox);
  textContainer.appendChild(style);
  textContainer.appendChild(textArea);
  textContainer.appendChild(overlay);

  // Language Selector
  const languageSelect = document.createElement('select');
  languageSelect.classList.add('ocr-lang-select');
  languageSelect.style.cssText = `
    all: unset;
    width: 255px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    position: relative;
    padding: 8px 12px;
    border: 1px solid #ccc;
    font-family: inherit;
    font-size: 16px;
    border-radius: 4px;
    background-color: #f9f9f9;
    color: #333;
    cursor: pointer;
    appearance: none;
    background-image: url('data:image/svg+xml;utf8,<svg fill="%23333" height="14" width="14" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5.55 7.55l4.45 4.45 4.45-4.45L16 9l-6 6-6-6z"/></svg>');
    background-repeat: no-repeat;
    background-position: right 10px center;
    background-size: 14px 14px;
    ${isLoading ? 'opacity: 0.5; pointer-events: none;' : ''}
  `;

  // Non-selectable note shown at the top when the dropdown is expanded.
  const languageHintOptionLine1 = document.createElement('option');
  languageHintOptionLine1.value = '__info_line_1__';
  languageHintOptionLine1.disabled = true;
  languageHintOptionLine1.textContent = 'Text is extracted using the selected language.';
  languageHintOptionLine1.style.textAlign = 'center';
  languageSelect.appendChild(languageHintOptionLine1);

  const languageHintOptionLine2 = document.createElement('option');
  languageHintOptionLine2.value = '__info_line_2__';
  languageHintOptionLine2.disabled = true;
  languageHintOptionLine2.textContent = 'Change it if incorrect.';
  languageHintOptionLine2.style.textAlign = 'center';
  languageSelect.appendChild(languageHintOptionLine2);

  availableLanguages.forEach(langObj => {
    const option = document.createElement('option');
    option.value = langObj.value;
    option.textContent = langObj.label;
    languageSelect.appendChild(option);
  });

  chrome.storage.local.get({ lang: 'eng' }, ({ lang: storedLang }) => {
    const hasStoredLang = Array.from(languageSelect.options).some((option) => option.value === storedLang && !option.disabled);
    languageSelect.value = hasStoredLang ? storedLang : 'eng';
  });

  languageSelect.addEventListener('change', () => {
    const newLang = languageSelect.value;
    if (!newLang || newLang.startsWith('__info_')) return;
    
    // Show loading state immediately
    const currentText = document.querySelector('#ocr-popup textarea')?.value || '';
    showPopup(currentText, newLang, true);
    
    chrome.storage.local.set({ lang: newLang }, () => {
      if (lastImageDataUrl) {
        performOCR(lastImageDataUrl, newLang);
      }
    });
  });

  // Removed engine selector (engine chosen automatically based on subscription)

  // Copy Button
  const copyButton = document.createElement('button');
  copyButton.classList.add('ocr-copy-btn');
  copyButton.textContent = 'Copy Text';
  copyButton.style.cssText = `
    all: unset;
    padding: 10px 18px;
    background-color: #007bff;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 16px;
    border-radius: 4px;
    text-align: center;
    ${isLoading ? 'opacity: 0.5; pointer-events: none;' : ''}
  `;
  copyButton.onclick = function() {
    textArea.select();
    document.execCommand('copy');
    copyButton.textContent = 'Copied!';
    setTimeout(() => (copyButton.textContent = 'Copy Text'), 2000);
  };

  // Tools Container
  const toolsContainer = document.createElement('div');
  toolsContainer.style.cssText = `
    all: unset;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
  `;
  // Language selector is only relevant for Tesseract mode.
  languageSelect.style.display = monetizeMode === 'tokened' ? 'none' : '';
  if (isLimitOverlay) {
    languageSelect.disabled = true;
    languageSelect.style.opacity = '0.5';
  }
  toolsContainer.appendChild(languageSelect);
  // Spacer to keep the copy button aligned to the right regardless of dropdown visibility
  const spacer = document.createElement('div');
  spacer.style.cssText = `all: unset; flex: 1;`;
  toolsContainer.appendChild(spacer);
  if (isLimitOverlay) {
    copyButton.disabled = true;
    copyButton.style.opacity = '0.5';
  }
  toolsContainer.appendChild(copyButton);

  // Rating logic
  const reviewUrl = 'https://chrome.google.com/webstore/detail/pmeccjlemeohcobimhbphjnlokdmiilo/reviews'; // Replace with your extension's review page
  const formUrl = 'https://forms.gle/2aEcoacDfiq5TYxN8'; // Replace with your Google Form
  
  const ratingContainer = document.createElement('div');
  ratingContainer.style.cssText = `
    all: unset;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    text-align: center;
  `;
  if (isLimitOverlay || isLoading) {
    // Only allow ratings once we actually have extracted text shown (no loading/blocked states).
    ratingContainer.style.pointerEvents = 'none';
    ratingContainer.style.opacity = isLimitOverlay ? '0.35' : '0.5';
  }

  const ratingTitle = document.createElement('div');
  ratingTitle.style.cssText = `
    all: unset;
    font-family: inherit;
    font-size: 16px;
    margin-bottom: 10px;
    color: #333;
  `;
  ratingTitle.textContent = "Rate Us:";

  ratingContainer.appendChild(ratingTitle);

  const starsContainer = document.createElement('div');
  starsContainer.style.cssText = `
    all: unset;
    display: flex;
    flex-direction: row;
    gap: 5px;
    cursor: pointer;
  `;
  if (isLimitOverlay || isLoading) {
    starsContainer.style.cursor = 'default';
  }

  let selectedRating = 0;
  const highlightedColor = '#FFA500';
  const unhighlightedColor = '#E0E0E0';

  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('span');
    star.textContent = '★';
    star.style.cssText = `
      all: unset;
      font-size: 24px;
      color: ${unhighlightedColor}; 
      cursor: pointer;
    `;
    star.addEventListener('click', () => {
      selectedRating = i;
      highlightStars(i);
      if (selectedRating <= 3) {
        window.open(formUrl, '_blank');
      } else {
        window.open(reviewUrl, '_blank');
      }
      // Reset stars after redirect
      selectedRating = 0;
      highlightStars(0);
    });

    star.addEventListener('mouseover', () => {
      highlightStars(i);
    });
    star.addEventListener('mouseout', () => {
      highlightStars(selectedRating);
    });
    starsContainer.appendChild(star);
  }

  ratingContainer.appendChild(starsContainer);

  // Support email under Rate Us
  const supportContainer = document.createElement('div');
  supportContainer.style.cssText = `
    all: unset;
    margin-top: 8px;
    font-size: 12px;
    color: #666;
    ${isPaidUser ? '' : 'display: none;'}
  `;
  const supportLabel = document.createElement('span');
  supportLabel.textContent = '';
  const supportLink = document.createElement('a');
  supportLink.href = 'https://appbox.space/paywall/624/customer-portal/get?tab=support';
  supportLink.target = '_blank';
  supportLink.rel = 'noopener';
  supportLink.textContent = 'Contact Support';
  supportLink.style.cssText = `
    all: unset;
    color: #1a73e8; /* Material primary */
    cursor: pointer;
  `;
  supportLink.addEventListener('mouseover', () => { supportLink.style.textDecoration = 'underline'; });
  supportLink.addEventListener('mouseout', () => { supportLink.style.textDecoration = 'none'; });
  supportContainer.appendChild(supportLabel);
  supportContainer.appendChild(supportLink);
  ratingContainer.appendChild(supportContainer);

  function highlightStars(rating) {
    const stars = starsContainer.querySelectorAll('span');
    for (let s = 0; s < stars.length; s++) {
      stars[s].style.color = s < rating ? highlightedColor : unhighlightedColor;
    }
  }

  highlightStars(0); // Initially no stars selected

  // Assemble Popup
  popup.appendChild(closeButton); // Add close button directly to popup
  popup.appendChild(upgradeButton); // Add upgrade badge/button when applicable
  popup.appendChild(portalButton); // Customer portal access for paid users
  popup.appendChild(wrapper);
  wrapper.appendChild(textContainer);
  wrapper.appendChild(toolsContainer);
  wrapper.appendChild(ratingContainer);

  document.body.appendChild(popup);

  // Prepare paywall overlay inside the popup and move existing iframe if needed
  mountPaywallInsidePopup();

  // After rendering, refresh Monetize state and toggle UI elements accordingly
  try {
    refreshMonetizeState({ force: false }).then((state) => {
      // Paid-only UI: customer portal/support are for paid subscribers.
      const uiIsPaid = !!state?.isPaidUser;
      const uiMode = state?.mode || monetizeMode;

      upgradeButton.style.display = uiIsPaid ? 'none' : 'inline-block';
      languageSelect.style.display = uiMode === 'tokened' ? 'none' : '';
      const portalBtn = popup.querySelector('a[title="Manage subscription"]');
      if (portalBtn) portalBtn.style.display = uiIsPaid ? 'inline-flex' : 'none';
      if (supportContainer) supportContainer.style.display = uiIsPaid ? '' : 'none';
    }).catch(() => {
      // fallback to stored value if any
      upgradeButton.style.display = isPaidUser ? 'none' : 'inline-block';
      languageSelect.style.display = monetizeMode === 'tokened' ? 'none' : '';
      const portalBtn = popup.querySelector('a[title="Manage subscription"]');
      if (portalBtn) portalBtn.style.display = isPaidUser ? 'inline-flex' : 'none';
      if (supportContainer) supportContainer.style.display = isPaidUser ? '' : 'none';
    });
  } catch (e) {
    upgradeButton.style.display = isPaidUser ? 'none' : 'inline-block';
    languageSelect.style.display = monetizeMode === 'tokened' ? 'none' : '';
    const portalBtn = popup.querySelector('a[title="Manage subscription"]');
    if (portalBtn) portalBtn.style.display = isPaidUser ? 'inline-flex' : 'none';
    if (supportContainer) supportContainer.style.display = isPaidUser ? '' : 'none';
  }

}

// Ensure the @Monetize.software paywall renders as an overlay inside the OCR popup
function mountPaywallInsidePopup() {
  const popup = document.getElementById('ocr-popup');
  if (!popup) return;

  // Create the overlay container if missing
  let container = popup.querySelector('#paywall-overlay-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'paywall-overlay-container';
    container.style.cssText = `
      all: unset;
      position: absolute;
      inset: 0;
      z-index: 10000;
      pointer-events: none;
    `;
    popup.appendChild(container);
  }

  // Move existing paywall iframe into the container to scope it to the popup
  const existingIframe = document.querySelector('iframe[id^="paywall-"]');
  if (existingIframe && existingIframe.parentNode !== container) {
    container.appendChild(existingIframe);
  }

  // Enforce full-cover styles on the iframe
  if (existingIframe) {
    Object.assign(existingIframe.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      border: '0',
      display: 'block',
      zIndex: '10000',
      background: 'transparent'
    });
    // Keep pointer-events disabled by default; enable only when paywall is opened
    container.style.pointerEvents = 'none';
  }

  // Configure library for future opens
  try {
    paywall.paywallContainerId = 'paywall-overlay-container';
    paywall.iframeStyles = {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      border: '0',
      display: 'block',
      zIndex: '10000',
      background: 'transparent'
    };
  } catch (e) {}
}

// Detach the paywall iframe from the popup before the popup is removed,
// so the library keeps its hidden iframe alive between OCR sessions.
function unmountPaywallFromPopup() {
  try {
    const iframe = document.querySelector('iframe[id^="paywall-"]');
    if (!iframe) return;
    // Check if iframe is inside the current popup
    let node = iframe.parentNode;
    let insidePopup = false;
    while (node) {
      if (node.id === 'ocr-popup') { insidePopup = true; break; }
      node = node.parentNode;
    }
    if (insidePopup) {
      // Move iframe back to body and hide it
      document.body.appendChild(iframe);
      Object.assign(iframe.style, {
        position: 'fixed',
        width: '0',
        height: '0',
        border: '0',
        display: 'none'
      });
    }
    const container = document.getElementById('paywall-overlay-container');
    if (container) container.style.pointerEvents = 'none';
  } catch (e) {
    // no-op
  }
}

async function openPaywallSignInThenPricing() {
  // Deprecated: old paid-based flow. Kept only to avoid runtime references if any remain.
  return { paid: false };
}

async function maybeRunFirstActionActivationFlow() {
  if (firstActionActivationDone) return;

  let state = null;
  try {
    state = await refreshMonetizeState({ force: true });
  } catch (e) {}

  // If user is already signed in, mark activation as done and skip prompting.
  if ((state?.mode || monetizeMode) !== 'guest') {
    firstActionActivationDone = true;
    try {
      await syncSet({ [MS_FIRST_ACTION_ACTIVATION_DONE_KEY]: true });
    } catch (e) {}
    return;
  }
  if (typeof paywall === 'undefined' || typeof paywall.open !== 'function') return;

  let promptAttempted = false;
  try { mountPaywallInsidePopup(); } catch (e) {}
  await ensurePaywallOverlayPointerEvents(true);
  isUpgradeFlowActive = true;
  try {
    promptAttempted = true;
    await paywall.open({ resolveEvent: 'signed-in' });
  } catch (e) {
    // User may close paywall; OCR should continue with normal fallback flow.
  } finally {
    isUpgradeFlowActive = false;
    await ensurePaywallOverlayPointerEvents(false);
  }

  if (promptAttempted) {
    firstActionActivationDone = true;
    try {
      await syncSet({ [MS_FIRST_ACTION_ACTIVATION_DONE_KEY]: true });
    } catch (e) {}
  }

  try {
    await refreshMonetizeState({ force: true });
  } catch (e) {}
}