const APP_URL = import.meta.env.VITE_APP_URL;

/**
 * Build the inner iframe URL with optional teamId from URL params.
 */
const buildIframeSrc = (): string => {
  const params = new URLSearchParams(window.location.search);
  const teamId = params.get('teamId');
  if (teamId) return `${APP_URL}/teams/${teamId}/extension-next/`;
  return `${APP_URL}/extension-next/`;
};

/**
 * Read auth credentials from auth cookies (source of truth).
 */
const getStoredAuth = async (): Promise<{ token: string | null; userId: string | null }> => {
  const authUrl = import.meta.env.VITE_AUTH_URL;
  if (!authUrl) return { token: null, userId: null };
  try {
    const [tokenCookie, userIdCookie] = await Promise.all([
      chrome.cookies.get({ url: authUrl, name: 'Meteor.loginToken' }),
      chrome.cookies.get({ url: authUrl, name: 'Meteor.userId' }),
    ]);
    return {
      token: tokenCookie?.value ?? null,
      userId: userIdCookie?.value ?? null,
    };
  } catch {
    return { token: null, userId: null };
  }
};

/**
 * Create inner iframe and bootstrap auth.
 */
const init = async (): Promise<void> => {
  const iframe = document.createElement('iframe');
  iframe.src = buildIframeSrc();
  iframe.allow = 'microphone';
  iframe.title = 'lemlist';
  iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-popups');
  document.body.appendChild(iframe);

  // Relay all postMessages from content-script → inner iframe
  window.addEventListener('message', (event: MessageEvent) => {
    if (event.data == null) return;
    iframe.contentWindow?.postMessage(event.data, '*');
  });

  // Once inner iframe loads, hide spinner and push stored auth credentials
  iframe.addEventListener('load', async () => {
    document.getElementById('loader')?.classList.add('hidden');
    const auth = await getStoredAuth();
    if (auth.token && auth.userId) {
      iframe.contentWindow?.postMessage(
        {
          command: 'setLoginToken',
          payload: { token: auth.token, userId: auth.userId },
          source: 'content-script',
          type: 'event',
          _lemlist: true,
          lemlist: 1,
          timestamp: Date.now(),
          id: `${Date.now()}-auth-bootstrap`,
        },
        '*'
      );
    }
  });
};

init();
