window.currentUrlGlot = ''
const _setting = {
  settingSelector: "[role=\"main\"] .ytp-right-controls > .ytp-settings-button",
  subsToggleElementEmbed: "#player .ytp-subtitles-button",
  contextSettingSelector: "[role=\"main\"] .html5-video-player",
  subsToggleElement: "[role=\"main\"] .ytp-subtitles-button",
  subsToggleElementAttrCheck: "aria-pressed",
  subsToggleElementAttrCheckValueTrue: "true",
  subsToggleElementAttrCheckValueFalse: "false",
  playerContainerSelector: "[role=\"main\"] .html5-video-player",
  playerContainerSelectorEmbed: "#player .html5-video-player",
  checkShowIcon: "[role=\"main\"] .glot-settings",
  checkShowIconEmbed: "#player .glot-settings",
  checkHasPreview: "ytd-browsefdsfsdfsdf",
  speedData: [
    0.25,
    0.5,
    0.75,
    1,
    1.25,
    1.5,
    1.75,
    2
  ],
  checkUrlRemovePreview: "youtube.com/watch?v"
}
let videoId = null;
let settingCache = null;
function detectVideoIdInDom() {
  const videoContainer = document.querySelector('[video-id]');

  if (videoContainer) {
    const id = videoContainer.getAttribute('video-id');
    if (id) return id;
  }

  return null;
}

function getSetting() {
  const host = window.location.host;
  if (settingCache) return settingCache;
  const settingConfigCheck = localStorage.getItem(`${host}_check`) || '';
  const settingConfig = localStorage.getItem(`${host}_config`);
  if (settingConfigCheck === 'true') settingCache = _setting
  if (settingConfig) {
    settingCache = JSON.parse(settingConfig);
    return settingCache
  }
  return _setting;
}

function getIdVideoYt(url) {
  var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = url.match(regExp);
  if (match && match[2].length == 11) {
    return match[2];
  } else {
    return ""
  }
}

window.setInterval(() => {
  const setting = getSetting();
  const isEmbed = (location.pathname || '').startsWith('/embed')
  const player = document.querySelector(isEmbed ? setting.playerContainerSelectorEmbed : setting.playerContainerSelector);
  const subsToggleElement = document.querySelector(isEmbed ? setting.subsToggleElementEmbed : setting.subsToggleElement);
  if (window.location.href != window.currentUrlGlot) {
    const videoId = (window.location.href.match(/v=[A-z0-9]*/) != null && window.location.href.match(/v=[A-z0-9]*/).length > 0) ? window.location.href.match(/v=[A-z0-9\-]*/)[0].split("=")[1] : getIdVideoYt(window.location.href);
    if (videoId) {
      window.dispatchEvent(new CustomEvent("get_subtile_list", { detail: videoId }));
      window.dispatchEvent(new CustomEvent("renderIconGlot"));
    }
    window.dispatchEvent(new CustomEvent("glotGetVideoId"));
    window.currentUrlGlot = window.location.href;
  }
  if (player) {
    if (!window.isLoadedGlot) {
      window.isLoadedGlot = true;
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("glotVideoReady"));
        if (subsToggleElement && subsToggleElement.getAttribute(setting.subsToggleElementAttrCheck) === setting.subsToggleElementAttrCheckValueTrue) {
          player && player.toggleSubtitles && player.toggleSubtitles();
          player && player.toggleSubtitles && player.toggleSubtitles();
        } else {
          window.dispatchEvent(new CustomEvent("glotSubtitlesChanged", { detail: "" }));
        }
      }, 500);
    }
  } else {
    window.isLoadedGlot = false;
  }

  if (window.isLoadedGlot) {
    if (subsToggleElement) {
      if (window.subtitlesEnabledGlot && subsToggleElement.getAttribute(setting.subsToggleElementAttrCheck) === setting.subsToggleElementAttrCheckValueFalse) {
        window.subtitlesEnabledGlot = false;
        window.dispatchEvent(new CustomEvent("glotSubtitlesChanged", { detail: "" }));
      }
    }

    let movieIdInDomMatch = detectVideoIdInDom();

    if (videoId && movieIdInDomMatch && videoId !== movieIdInDomMatch) {
      videoId = movieIdInDomMatch;
      setTimeout(function () {
        if (subsToggleElement && subsToggleElement.getAttribute(setting.subsToggleElementAttrCheck) === setting.subsToggleElementAttrCheckValueTrue) {
          player && player.toggleSubtitles && player.toggleSubtitles();
          player && player.toggleSubtitles && player.toggleSubtitles();
        }
      }, 500);
    }

    if (!videoId && movieIdInDomMatch) videoId = movieIdInDomMatch;

    if (!document.querySelector(isEmbed ? setting.checkShowIconEmbed : setting.checkShowIcon)) {
      window.dispatchEvent(new CustomEvent("renderIconGlot"));
    }
    if (window.location.href.indexOf(setting.checkUrlRemovePreview) > 0 && document.querySelector(setting.checkHasPreview)) {
      document.querySelector(setting.checkHasPreview).remove();
    }
  }

}, 500);

(open => {
  XMLHttpRequest.prototype.open = function (method, url) {
    this.addEventListener('loadend', function (e) {
    })
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