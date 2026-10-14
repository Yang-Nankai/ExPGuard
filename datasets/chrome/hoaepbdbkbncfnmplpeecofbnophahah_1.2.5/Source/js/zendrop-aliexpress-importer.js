window.addEventListener("message", function(event) {
    // We only accept messages from this window to itself [i.e. not from any iframes]
    if (event.source != window)
      return;

    if (event.data.type && ["LOGIN_TO_EXTENSION", "LOGOUT_TO_EXTENSION"].includes(event.data.type)) {
        chrome.runtime.sendMessage(event.data);
    }
}, false);
