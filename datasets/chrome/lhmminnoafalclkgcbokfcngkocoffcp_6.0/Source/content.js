window.addEventListener("message", (event) => {
  if (event.source !== window || !event.data.type) return;

  console.log("Content script received message from web:", event.data);

  if (event.data.type === "REQUEST_FULL_TOKEN") {
    chrome.runtime.sendMessage(
      { type: event.data.type, payload: event.data.payload },
      (response) => {
        if (response) {
          window.postMessage(
            { type: "RESPONSE_FULL_TOKEN", payload: response },
            "*"
          );
        }
      }
    );
  }

  // if (event.data.type === "REQUEST_ACCESS_TOKEN") {
  //   chrome.runtime.sendMessage(
  //     { type: event.data.type, payload: event.data.payload },
  //     (response) => {
  //       if (response) {
  //         window.postMessage(
  //           { type: "RESPONSE_ACCESS_TOKEN", payload: response },
  //           "*"
  //         );
  //       }
  //     }
  //   );
  // }

  if (event.data.type === "SET_FULL_TOKEN_TO_EXTENSION") {
    chrome.runtime.sendMessage({
      type: event.data.type,
      payload: event.data.payload,
    });
  }

  // if (event.data.type === "SET_ACCESS_TOKEN_TO_EXTENSION") {
  //   chrome.runtime.sendMessage({
  //     type: event.data.type,
  //     payload: event.data.payload,
  //   });
  // }

  if (event.data.type === "REQUEST_LOGOUT_TO_EXTENSION") {
    chrome.runtime.sendMessage({
      type: event.data.type,
      payload: event.data.payload,
    });
  }

  if (event.data.type === "SET_TOTAL_EARNING_TO_EXTENSION") {
    chrome.runtime.sendMessage({
      type: event.data.type,
      payload: event.data.payload,
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("onMessage content.js", message, sender);

  if (message.type === "REQUEST_LOGOUT_FROM_EXTENSION") {
    window.postMessage({ type: "REQUEST_LOGOUT_FROM_EXTENSION" }, "*");
    sendResponse({ status: "Processed" });
  }

  if (message.type === "SET_FULL_TOKEN_FROM_EXTENSION") {
    window.postMessage(
      { type: "SET_ACCESS_TOKEN_FROM_EXTENSION", payload: message.payload },
      "*"
    );
    sendResponse({ status: "Processed" });
  }

  // if (message.type === "SET_ACCESS_TOKEN_FROM_EXTENSION") {
  //   window.postMessage(
  //     { type: "SET_ACCESS_TOKEN_FROM_EXTENSION", payload: message.payload },
  //     "*"
  //   );
  //   sendResponse({ status: "Processed" });
  // }

  return true;
});
