
window.subtitlesEnabledGlot = false;
window.isFirstLoadSubGlot = false;

window.dispatchEvent(
  new CustomEvent("get_all_sub_glot", {})
);
function getSubByTrack(trackDom, srcVideoDom) {
  if (trackDom) {
    const lang = trackDom.getAttribute('srclang');
    window.isFirstLoadSubGlot = true;
    window.currentLanguageGlot = lang;
    const href = trackDom.getAttribute('src');
    const videoId = srcVideoDom.getAttribute('src').replace('//view.vzaar.com/', '').split('/')[0];
    window.subtitlesEnabledGlot = true;
    const dataDetail = {
      href,
      lang,
      videoId,
    }
    window.dispatchEvent(new CustomEvent("glot_data", { detail: dataDetail }));
    window.dispatchEvent(
      new CustomEvent("glotSubtitlesChanged", { detail: lang })
    );
  }
}


window.setInterval(() => {
  const player = document.querySelector(".video-js-video-player");
  const subsToggleElement = document.querySelector(".vjs-subs-caps-button .vjs-menu-content > .vjs-menu-item:first-child");

  if (player && subsToggleElement) {
    if (!window.isLoadedGlot) {
      window.isLoadedGlot = true;
      window.dispatchEvent(new CustomEvent("glotVideoReady"));

      if (subsToggleElement.getAttribute("aria-checked") === "false") {
        player && player.toggleSubtitles && player.toggleSubtitles();
      } else {
        window.dispatchEvent(new CustomEvent("glotSubtitlesChanged", { detail: '' }));
      }
    }
  } else {
    window.isFirstLoadSubGlot = false;
    window.isLoadedGlot = false;
  }

  if (subsToggleElement) {
    if (window.subtitlesEnabledGlot && subsToggleElement.getAttribute("aria-checked") === "true") {
      window.subtitlesEnabledGlot = false;
      window.dispatchEvent(new CustomEvent("glotSubtitlesChanged", { detail: '' }));
    } else if (!window.subtitlesEnabledGlot && subsToggleElement.getAttribute("aria-checked") === "false") {
      window.subtitlesEnabledGlot = true;
      window.dispatchEvent(new CustomEvent("glotSubtitlesChanged", { detail: window.currentLanguageGlot }));
    }
  }
  const videoElm = document.querySelector(".video-js-video-player > video");
  if (videoElm && !window.isFirstLoadSubGlot) {
    window.isFirstLoadSubGlot = true;
    const textTracks = videoElm.textTracks;
    const srcVideoDom = document.querySelector(".video-js-video-player > video > source");
    textTracks.addEventListener("change", function (e) {
      let trackCur = null;
      for (var prop in e.currentTarget) {
        const track = e.currentTarget[prop];
        if (track && !!track.cues) {
          trackCur = track;
          break
        }
      }
      if (trackCur) {
        const lang = trackCur.language;
        const trackDom = document.querySelector(`.video-js-video-player > video > track[srclang="${lang}"]`);
        getSubByTrack(trackDom, srcVideoDom);
      }
    });
  }
}, 500);
