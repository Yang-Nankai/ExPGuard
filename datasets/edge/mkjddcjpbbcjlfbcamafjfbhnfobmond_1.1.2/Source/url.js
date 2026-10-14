var url = null;

try {
  url = document.location.href;
} catch (e) {}

chrome.runtime.connect().postMessage({
    type: 'current-url',
    url: url
});
