const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const autoplayButton = document.getElementById("autoplay");

const currentTitle = document.getElementById("current-title");
const currentWebsite = document.getElementById("current-website");

// Update UI with current tab information
// chrome.storage.local.get("currentTab", (data) => {
//   if (data.currentTab) {
//     currentTitle.textContent = `Now Playing: ${data.currentTab.title}`;
//     const url = new URL(data.currentTab.url);
//     currentWebsite.textContent = `Website: ${url.hostname}`;
//   }
// });

function updateCurrentTabInfo() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs && tabs.length > 0) {
        const activeTab = tabs[0];
        const tabTitle = activeTab.title || "No Title";
        const tabUrl = activeTab.url || "No URL";
        
        currentTitle.textContent = `Now Playing: ${tabTitle}`;
        const url = new URL(tabUrl);
        currentWebsite.textContent = `Website: ${url.hostname}`;
        
        // Store current tab info (optional if needed for other purposes)
        chrome.storage.local.set({
          currentTab: {
            title: tabTitle,
            url: tabUrl
          }
        });
      }
    });
  }
  
  // Call update function on popup open
document.addEventListener("DOMContentLoaded", updateCurrentTabInfo);
  

// Play media
playButton.addEventListener("click", () => {
  executeMediaScript("playMedia");
});

// Pause media
pauseButton.addEventListener("click", () => {
  executeMediaScript("pauseMedia");
});

// Toggle autoplay
autoplayButton.addEventListener("click", () => {
const isAutoplayEnabled = autoplayButton.textContent === "Disable Autoplay";
  executeMediaScript("toggleAutoplay");
  autoplayButton.textContent = isAutoplayEnabled
      ? "Enable Autoplay"
      : "Disable Autoplay";
});

// Execute the script in the content script context
function executeMediaScript(action) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: controlMedia,
      args: [action],
    });
  });
}

// Function that will run in the context of the webpage
function controlMedia(action) {
  const video = document.querySelector("video");
  const audio = document.querySelector("audio");
  const media = video || audio;

  if (!media) {
    alert("No media element found on this page.");
    return;
  }

  switch (action) {
    case "playMedia":
      if (media.paused) {
        media.play();
      }
      break;
    case "pauseMedia":
      if (!media.paused) {
        media.pause();
      }
      break;
    case "toggleAutoplay":
      if (media.hasAttribute("autoplay")) {
        media.removeAttribute("autoplay");
        alert("Autoplay Disabled");
      } else {
        media.setAttribute("autoplay", true);
        alert("Autoplay Enabled");
      }
      break;
    default:
      console.error("Unknown action:", action);
  }
}
