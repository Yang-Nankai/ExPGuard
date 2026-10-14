const params = new URLSearchParams(location.search);
const url = params.get('url');
if (url) document.getElementById('blocked-url').textContent = url;
document.getElementById('go-back').addEventListener('click', () => {
  if (history.length > 1) history.back();
  else window.close();
});
document.getElementById('open-settings').addEventListener('click', () => {
  if (chrome?.runtime?.openOptionsPage) chrome.runtime.openOptionsPage();
  else location.href = 'chrome://extensions';
});
