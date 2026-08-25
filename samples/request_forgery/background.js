chrome.runtime.onMessageExternal.addListener(
  (message, _sender, sendResponse) => {
    if (message?.type !== "PROXY_REQUEST") return;

    // Sink: the broad host permission lets an untrusted web origin choose the
    // destination of a request made by the privileged service worker.
    fetch(message.url, {
      method: message.method || "GET",
      body: message.body,
    })
      .then((response) => sendResponse({ status: response.status }))
      .catch((error) => sendResponse({ error: String(error) }));

    return true;
  },
);
