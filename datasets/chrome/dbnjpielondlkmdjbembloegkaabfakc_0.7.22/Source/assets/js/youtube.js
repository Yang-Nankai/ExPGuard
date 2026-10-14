console.log("youtube.js loaded");
window.setInterval(() => {
  const player = document.getElementById("movie_player");
  const subsToggleElement = document.querySelector(".ytp-subtitles-button");

  if (player) {
    if (!window.isLoadedGlot) {
      window.isLoadedGlot = true;
      window.dispatchEvent(new CustomEvent("esYoutubeLoaded"));

      if (subsToggleElement && subsToggleElement.getAttribute("aria-pressed") === "true") {
        player.toggleSubtitles();
        player.toggleSubtitles();
      } else {
        window.dispatchEvent(new CustomEvent("esYoutubeCaptionsChanged", { detail: "" }));
      }
    }
  } else {
    window.isLoadedGlot = false;
  }

  if (subsToggleElement) {
    if (window.subtitlesEnabledGlot && subsToggleElement.getAttribute("aria-pressed") === "false") {
      window.subtitlesEnabledGlot = false;
      window.dispatchEvent(new CustomEvent("esYoutubeCaptionsChanged", { detail: "" }));
    }
  }
}, 500);
((open) => {
  XMLHttpRequest.prototype.open = function (method, url) {
    if (url.match(/^http/g) !== null) {
      const urlObject = new URL(url);
      if (urlObject.pathname === "/api/timedtext") {
        window.subtitlesEnabledGlot = true;
        const lang = urlObject.searchParams.get("tlang") || urlObject.searchParams.get("lang");
        window.dispatchEvent(new CustomEvent("esYoutubeCaptionsData", { detail: urlObject.href }));
        window.dispatchEvent(new CustomEvent("esYoutubeCaptionsChanged", { detail: lang }));
      }
    }
    open.call(this, method, url, true);
  };
})(XMLHttpRequest.prototype.open);
