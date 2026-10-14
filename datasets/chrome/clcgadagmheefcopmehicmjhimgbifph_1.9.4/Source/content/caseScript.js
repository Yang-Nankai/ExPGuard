var version;
chrome.runtime.sendMessage({ message: "getVersion" }, (response) => {
  version = response.version;
});

function handleButtonClick() {
  toggleLoading(true);
  injectScript();
}

function getScripts() {
  let scripts = document.getElementsByTagName("script");
  const cursorRegex = /g_historyCursor = ([^;]+);/;
  let found = false;
  for (let i = 0; i < scripts.length; i++) {
    let currentScript = scripts[i];
    if (currentScript.text.includes("g_historyCursor")) {
      let regexResult = cursorRegex.exec(currentScript.text);
      if (regexResult.length === 2) {
        console.log("Cursor found: ");
        console.log(regexResult[1]);
        found = true;
        break;
      }
    }
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "login") {
    handleLoggedIn();
  }
});

// Listen for the event with the variable data
document.addEventListener("ReadVariable", function (e) {
  initiatePulling(fixedTime ?? currentTime ?? new Date().getTime() / 1000);
});

// More robust DOM readiness check for Firefox
function waitForDOMReady() {
  const requiredElement = ".inventory_history_pagingrow";
  let attempts = 0;
  const maxAttempts = 50; // 5 seconds with 100ms intervals
  
  const checkInterval = setInterval(() => {
    attempts++;
    const element = document.querySelector(requiredElement);
    
    if (element) {
      clearInterval(checkInterval);
      prepareBox();
      return;
    }
    
    if (attempts >= maxAttempts) {
      clearInterval(checkInterval);
      console.warn("LootSpectrum: Required DOM element not found after 5 seconds, attempting to inject anyway");
      prepareBox();
    }
  }, 100);
}

// Use multiple DOM readiness strategies for better compatibility
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', waitForDOMReady);
} else if (document.readyState === 'interactive') {
  // DOM is ready but resources might still be loading
  waitForDOMReady();
} else {
  // DOM and resources are ready
  const element = document.querySelector(".inventory_history_pagingrow");
  if (element) {
    prepareBox();
  } else {
    waitForDOMReady();
  }
}
