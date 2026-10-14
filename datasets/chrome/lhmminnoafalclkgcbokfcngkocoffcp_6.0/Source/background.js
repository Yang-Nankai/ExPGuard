chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension has setup");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Background received message:", message, sender);

  if (message.type === "REQUEST_FULL_TOKEN") {
    chrome.storage.local.get(
      ["access_token", "refresh_token", "public_key"],
      (data) => {
        console.log("REQUEST_FULL_TOKEN", data);
        if (data.access_token && data.refresh_token && data.public_key) {
          sendResponse({
            access_token: data.access_token,
            refresh_token: data.refresh_token,
            public_key: data.public_key,
          });
        } else {
          sendResponse(null);
        }
      }
    );
    return true;
  }

  // if (message.type === "REQUEST_ACCESS_TOKEN") {
  //   chrome.storage.local.get(["access_token", "refresh_token"], (data) => {
  //     console.log("REQUEST_ACCESS_TOKEN", data);
  //     if (data.access_token && data.refresh_token) {
  //       sendResponse({
  //         access_token: data.access_token,
  //         refresh_token: data.refresh_token,
  //       });
  //     } else {
  //       sendResponse(null);
  //     }
  //   });
  //   return true;
  // }

  if (message.type === "REQUEST_LOGOUT_TO_EXTENSION") {
    chrome.storage.local.remove(["access_token", "refresh_token"], () => {
      console.log("✅ access_token and refresh_token deleted");
    });
    sendResponse({ status: "Processed" });
  }

  if (message.type === "SET_FULL_TOKEN_TO_EXTENSION") {
    chrome.storage.local.set(
      {
        access_token: message?.payload?.accessToken,
        refresh_token: message?.payload?.refreshToken,
        public_key: message?.payload?.publicKey,
      },
      () => {
        console.log(
          "✅ access_token and refresh_token has been set",
          message?.payload
        );
      }
    );
    sendResponse({ status: "Processed" });
  }

  // if (message.type === "SET_ACCESS_TOKEN_TO_EXTENSION") {
  //   chrome.storage.local.set(
  //     {
  //       access_token: message?.payload?.accessToken,
  //       refresh_token: message?.payload?.refreshToken,
  //     },
  //     () => {
  //       console.log(
  //         "✅ access_token and refresh_token has been set",
  //         message?.payload
  //       );
  //     }
  //   );
  //   sendResponse({ status: "Processed" });
  // }

  if (message.type === "REQUEST_LOGOUT_FROM_EXTENSION") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        tabs.forEach((tab) => {
          chrome.tabs.sendMessage(tab.id, {
            type: "REQUEST_LOGOUT_FROM_EXTENSION",
          });
        });
      }
    });
    sendResponse({ status: "Processed" });
  }

  if (message.type === "SET_FULL_TOKEN_FROM_EXTENSION") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        tabs.forEach((tab) => {
          chrome.tabs.sendMessage(tab.id, {
            type: "SET_FULL_TOKEN_FROM_EXTENSION",
            payload: message.payload,
          });
        });
      }
    });
    sendResponse({ status: "Processed" });
  }

  // if (message.type === "SET_ACCESS_TOKEN_FROM_EXTENSION") {
  //   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  //     if (tabs.length > 0) {
  //       tabs.forEach((tab) => {
  //         chrome.tabs.sendMessage(tab.id, {
  //           type: "SET_ACCESS_TOKEN_FROM_EXTENSION",
  //           payload: message.payload,
  //         });
  //       });
  //     }
  //   });
  //   sendResponse({ status: "Processed" });
  // }

  if (message.type === "SET_TOTAL_EARNING_TO_EXTENSION") {
    chrome.storage.local.set(
      {
        earning: message?.payload,
      },
      () => {
        console.log(
          "✅ access_token and refresh_token has been set",
          message?.payload
        );
      }
    );
    sendResponse({ status: "Processed" });
  }

  return true;
});
