const MESSAGE_TYPE = 'ggsel:bgFetch';

function normalizeHeaders(headers) {
  if (!headers) {
    return undefined;
  }
  if (Array.isArray(headers)) {
    return headers.reduce((acc, entry) => {
      if (!entry) {
        return acc;
      }
      if (Array.isArray(entry) && entry.length === 2) {
        acc[String(entry[0])] = String(entry[1]);
        return acc;
      }
      if (typeof entry === 'object') {
        const key = 'name' in entry ? entry.name : undefined;
        const value = 'value' in entry ? entry.value : undefined;
        if (key !== undefined && value !== undefined) {
          acc[String(key)] = String(value);
        }
      }
      return acc;
    }, {});
  }
  if (headers instanceof Headers) {
    const result = {};
    headers.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }
  if (typeof headers === 'object') {
    const result = {};
    for (const [key, value] of Object.entries(headers)) {
      if (value == null) {
        continue;
      }
      result[String(key)] = String(value);
    }
    return result;
  }
  return undefined;
}

function sendMessageAsync(message, signal) {
  return new Promise((resolve, reject) => {
    let aborted = false;

    function cleanup() {
      if (signal) {
        signal.removeEventListener('abort', onAbort);
      }
    }

    function onAbort() {
      aborted = true;
      cleanup();
      reject(new DOMException('The operation was aborted.', 'AbortError'));
    }

    if (signal) {
      if (signal.aborted) {
        onAbort();
        return;
      }
      signal.addEventListener('abort', onAbort, { once: true });
    }

    chrome.runtime.sendMessage(message, (response) => {
      const runtimeError = chrome.runtime.lastError;
      cleanup();
      if (aborted) {
        return;
      }
      if (runtimeError) {
        reject(new Error(runtimeError.message || 'Failed to reach background script'));
        return;
      }
      resolve(response);
    });
  });
}

async function backgroundFetchRaw(url, { method, headers, body, credentials, signal } = {}) {
  const payload = {
    type: MESSAGE_TYPE,
    url,
    init: {},
  };

  if (method) {
    payload.init.method = method;
  }
  const normalizedHeaders = normalizeHeaders(headers);
  if (normalizedHeaders && Object.keys(normalizedHeaders).length > 0) {
    payload.init.headers = normalizedHeaders;
  }
  if (typeof body === 'string') {
    payload.init.body = body;
  } else if (body instanceof URLSearchParams) {
    payload.init.body = body.toString();
  } else if (body != null && typeof body === 'object') {
    payload.init.body = JSON.stringify(body);
    payload.init.headers = Object.assign({}, payload.init.headers, {
      'Content-Type': 'application/json',
    });
  }
  if (credentials && typeof credentials === 'string') {
    payload.init.credentials = credentials;
  }

  const response = await sendMessageAsync(payload, signal);
  if (!response) {
    throw new Error('No response received from background fetch');
  }
  if (!response.ok) {
    const error = new Error(`Request failed with status ${response.status}`);
    error.status = response.status;
    error.statusText = response.statusText;
    error.bodyText = response.bodyText;
    throw error;
  }
  return response;
}

export async function backgroundFetchJson(url, options = {}) {
  const response = await backgroundFetchRaw(url, options);
  const text = response.bodyText || '';
  if (!text) {
    return null;
  }
  try {
    return JSON.parse(text);
  } catch (error) {
    const wrapped = new Error('Failed to parse JSON response');
    wrapped.cause = error;
    wrapped.bodyText = text;
    throw wrapped;
  }
}

export async function backgroundFetchText(url, options = {}) {
  const response = await backgroundFetchRaw(url, options);
  return response.bodyText || '';
}

export { MESSAGE_TYPE as BACKGROUND_FETCH_MESSAGE_TYPE };
