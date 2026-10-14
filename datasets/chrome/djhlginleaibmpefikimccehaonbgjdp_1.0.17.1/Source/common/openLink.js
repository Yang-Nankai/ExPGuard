import { isSafeHttpUrl } from './steamGameData.js';

const MESSAGE_TYPE = 'ggsel:openLink';

function normalizeSafeUrl(rawUrl) {
  if (!isSafeHttpUrl(rawUrl)) {
    return '';
  }

  try {
    return new URL(rawUrl).toString();
  } catch (_) {
    return '';
  }
}

export function isSafeOpenLinkUrl(rawUrl) {
  return Boolean(normalizeSafeUrl(rawUrl));
}

export function openGgselLink(rawUrl, options = {}) {
  const url = normalizeSafeUrl(rawUrl);
  if (!url) {
    return Promise.resolve(false);
  }

  const sendMessage = typeof options.sendMessage === 'function'
    ? options.sendMessage
    : chrome.runtime.sendMessage.bind(chrome.runtime);
  const getLastError = typeof options.getLastError === 'function'
    ? options.getLastError
    : () => chrome.runtime.lastError || null;
  const fallbackOpen = typeof options.fallbackOpen === 'function'
    ? options.fallbackOpen
    : globalThis.open?.bind(globalThis);

  return new Promise((resolve) => {
    function fallback() {
      if (typeof fallbackOpen !== 'function') {
        resolve(false);
        return;
      }

      try {
        resolve(Boolean(fallbackOpen(url, '_blank', 'noopener,noreferrer')));
      } catch (_) {
        resolve(false);
      }
    }

    try {
      sendMessage({ type: MESSAGE_TYPE, url }, (response) => {
        const lastError = getLastError();
        if (!lastError && response?.ok === true) {
          resolve(true);
          return;
        }
        fallback();
      });
    } catch (_) {
      fallback();
    }
  });
}

export { MESSAGE_TYPE as OPEN_LINK_MESSAGE_TYPE };
