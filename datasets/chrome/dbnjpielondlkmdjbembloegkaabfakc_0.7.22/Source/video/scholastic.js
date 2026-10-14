
window.setInterval(() => {
  const player = document.querySelector(`.video-js video[src]`);

  if (player) {
    if (!window.isLoadedGlot) {
      window.isLoadedGlot = true;
      window.dispatchEvent(new CustomEvent("glotVideoReady"));
    }
  } else {
    window.isLoadedGlot = false;
  }
}, 500);

(open => {
  XMLHttpRequest.prototype.open = function (method, url) {
    if (url.match(/^http/g) !== null) {
      const urlObject = new URL(url);
      if (method === 'GET' && urlObject.pathname.indexOf('getClosedCaptionsDetailsByMediaId') >= 0) {
        this.addEventListener('loadend', function (e) {
          window.dispatchEvent(new CustomEvent("glot_data", { detail: JSON.parse(e.currentTarget.responseText) }));
        })
      } else if (method === 'GET' && urlObject.pathname.indexOf('.vtt') >= 0) {
        window.dispatchEvent(new CustomEvent("glot_get_lang_from_href", { detail: url }));
      }
    }
    open.call(this, method, url);
  };
})(XMLHttpRequest.prototype.open);
