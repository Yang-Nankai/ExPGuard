const pageUrl = document.getElementById("page-url").value;
chrome.storage.local.set({ storedUrl: pageUrl });
