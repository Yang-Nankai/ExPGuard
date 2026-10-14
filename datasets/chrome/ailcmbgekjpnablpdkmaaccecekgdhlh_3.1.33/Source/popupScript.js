const BASE_URL = 'https://workona.com';
const el = document.getElementById('iframe');
const generateUrl = (qs) => {
  return `${BASE_URL}/ext/popup?${qs || Math.floor(Date.now() / (60 * 60 * 1000))}`;
};
if (el) {
  el.src = generateUrl();
}
window.addEventListener('message', (e) => {
  if (!e.data) { return; }
  if (e.data.closeWindow) {
    window.close();
    return;
  }
  if (el) {
    if (e.data.height) {
      el.style.height = `${e.data.height}px`;
    }
    if (e.data.width) {
      el.style.width = `${e.data.width}px`;
    }
  }
}, false);
