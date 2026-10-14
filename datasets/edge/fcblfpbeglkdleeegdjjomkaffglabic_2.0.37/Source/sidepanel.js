window.onload = () => {
  const url = new URL(location.href);
  const queryUrl = url.searchParams.get('url');
  document.getElementById('sidepanel-main-iframe').src = queryUrl
    ? queryUrl
    : 'https://app.matador.ai/messages/extension';
  const port = chrome.runtime.connect({
    name: 'matadorExtSidePanel',
  });
  // For saving window ids on our side
  chrome.windows.getCurrent((window) => {
    port.postMessage({ windowId: window.id });
  });
};
