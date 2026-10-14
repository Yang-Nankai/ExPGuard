/* global chrome, document, window, globalThis */

const config = globalThis.READLANG_EXTENSION_CONFIG;

const isInstalledNode = document.createElement("div");
isInstalledNode.id = "readlang-extension-installed";
document.body.appendChild(isInstalledNode);

const readlangMessageType = "readlangMessage";

/**
 * Adapted from similar function in messagingUtils.ts
 * XXX Ideally should import instead
 */
const messageListener = (handler) => {
  window.addEventListener("message", (event) => {
    let data;

    try {
      data = JSON.parse(event.data);
    } catch (_error) {
      // Ignore messages with invalid JSON
      return;
    }

    const context = "extension";

    if (data?.type !== readlangMessageType) {
      console.log("Ignoring invalid message", event.data);
      return;
    }

    if (data.to !== context) {
      return;
    }

    if (data.message !== "backgroundPageMessage") {
      throw Error("Unexpected message type: " + data.message);
    }

    handler(data.data.message, data.data, event, data.requestId);
  });
};

if (
  [
    config.localhostOrigin,
    "https://readlang.com",
    "https://test.readlang.com",
  ].includes(window.location.origin)
) {
  messageListener(function (message, data, rawEvent, requestId) {
    chrome.runtime.sendMessage({ message, data }, function (response) {
      if (requestId) {
        if (!response) {
          throw Error("No response");
        }

        // XXX Ideally should use postMessage from messagingUtils.ts
        // to: "webReaderIFrame"
        const iFrameWindow = rawEvent.source;
        iFrameWindow.postMessage(
          JSON.stringify({
            type: readlangMessageType,
            to: "webReaderIFrame",
            message: "backgroundPageResponse",
            data: {
              requestId,
              response,
            },
          }),
          "*"
        );
      } else if (response.reload) {
        window.location.reload();
      }
    });
  });
}

if (
  window.location.hostname !== "readlang.com" &&
  window.location.hostname !== "test.readlang.com"
) {
  // check whether to load the Web Reader
  chrome.runtime.sendMessage({ message: "newPageLoaded" }, () => {});
}
