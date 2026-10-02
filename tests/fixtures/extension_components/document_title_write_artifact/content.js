let currentColumnVisibility = { one: true };

function flashTitle() {
  const originalTitle = document.title;
  const interval = setInterval(() => {
    document.title = originalTitle;
    clearInterval(interval);
  }, 1_000);
}

function savePreferences() {
  currentColumnVisibility.one = false;
  chrome.storage.sync.set({ currentColumnVisibility });
}

flashTitle();
savePreferences();
