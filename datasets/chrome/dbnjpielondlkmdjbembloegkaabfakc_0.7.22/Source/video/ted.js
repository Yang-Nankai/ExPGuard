
window.subtitlesEnabledGlot = false;
window.isFirstLoadSubGlot = false;

var parseMock = JSON.parse;

JSON.parse = function () {
  var data = parseMock.apply(this, arguments);
  if (data && data.events) {
    const event = (data.events || []).find(res => res.e === 'loadstart' && res.vsohn === 'hls.ted.com')
    if (event) {
      window.dispatchEvent(new CustomEvent("glot_get_subs", { detail: event.vsour }));
    }
  }
  return data;
};

window.setInterval(() => {
  const player = document.getElementById("video");
  const subsToggleElement = document.querySelector("media-controller > div.bottom\\:0");
  if (player) {
    if (!window.isLoadedGlot) {
      window.isLoadedGlot = true;
      window.dispatchEvent(new CustomEvent("glotVideoReady"));
      window.dispatchEvent(new CustomEvent("glotSubtitlesChanged", { detail: "" }));
    }
  } else {
    window.isFirstLoadSubGlot = false
    window.isLoadedGlot = false;
  }

  if (window.subtitlesEnabledGlot && !subsToggleElement) {
    window.subtitlesEnabledGlot = false;
    window.dispatchEvent(new CustomEvent("glotSubtitlesChanged", { detail: "" }));
  } else if (!window.subtitlesEnabledGlot && subsToggleElement) {
    window.subtitlesEnabledGlot = true;
    window.dispatchEvent(new CustomEvent("glotSubtitlesChanged", { detail: window.currentLanguageGlot }));
  }
  if (!document.querySelector(".glot-settings")) {
    window.isFirstLoadIcon = true;
    window.dispatchEvent(new CustomEvent("renderIconGlot"));
  }
}, 500);

// }
// (open => {
//   XMLHttpRequest.prototype.open = function (method, url) {
//     try {
//       if (url.href && url.href.indexOf('manifest.m3u8') > 0) {
//         window.dispatchEvent(new CustomEvent("glot_get_subs", { detail: url.href }));
//       }

//     } catch (error) {
//     }
//     open.call(this, method, url);
//   };
// })(XMLHttpRequest.prototype.open);
