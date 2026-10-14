window.currentUrlGlot = ''

window.setInterval(() => {
  const player = document.querySelector(".video-stream.html5-main-video");
  const subsToggleElement = document.querySelector(".ytp-subtitles-button");
  if (window.location.href != window.currentUrlGlot) {
    if (window.location.href.match(/embed\/[A-z0-9]*/) != null &&
      window.location.href.match(/embed\/[A-z0-9]*/).length > 0) {
      window.dispatchEvent(new CustomEvent("get_all_lang_sub", { detail: window.location.href.match(/embed\/[A-z0-9\-]*/)[0].split("/")[1] }));
    }
    window.currentUrlGlot = window.location.href;
  }

  if (player) {
    if (!window.isLoadedGlot) {
      window.isLoadedGlot = true;
      window.dispatchEvent(new CustomEvent("glotVideoReady"));
      // if (subsToggleElement && subsToggleElement.getAttribute("aria-pressed") === "true") {
      //   // player && player.toggleSubtitles && player.toggleSubtitles();
      //   // player && player.toggleSubtitles && player.toggleSubtitles();
      //   window.dispatchEvent(new CustomEvent("renderCoreLayoutGlot"));
      // } else {
      // }
      window.dispatchEvent(new CustomEvent("glotSubtitlesChanged", { detail: "" }));
    }
  } else {
    window.isLoadedGlot = false;
  }

  if (subsToggleElement) {
    if (window.subtitlesEnabledGlot && subsToggleElement.getAttribute("aria-pressed") === "false") {
      window.subtitlesEnabledGlot = false;
      // window.dispatchEvent(new CustomEvent("glotSubtitlesChanged", { detail: "" }));
    }
  }
}, 500);

(open => {
  XMLHttpRequest.prototype.open = function (method, url) {
    if (url.match(/^http/g) !== null) {
      const urlObject = new URL(url);
      if (urlObject.pathname === "/api/timedtext") {
        window.subtitlesEnabledGlot = true;
        const lang = urlObject.searchParams.get("tlang") || urlObject.searchParams.get("lang")
        window.dispatchEvent(new CustomEvent("glot_data", { detail: urlObject.href }));
        window.dispatchEvent(
          new CustomEvent("glotSubtitlesChanged", { detail: lang })
        );
      }
    }
    open.call(this, method, url);
  };
})(XMLHttpRequest.prototype.open);


