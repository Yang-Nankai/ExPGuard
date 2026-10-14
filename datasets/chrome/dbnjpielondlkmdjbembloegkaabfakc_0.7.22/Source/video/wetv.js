
const _setting = {
  "captureSelector": "https://play.wetv.vip/getvinfo?",
  "parseSub": {
    "VN": {
      "id": "vi",
      "name": "Vietnamese"
    }
  },
  "currentSub": "[data-role='wetv-player-subtitle-icon']",
  "settingSelector": "[data-role=\"wetv-player-ctrl-fullscreen\"]",
  "playerContainerSelector": "#player-wrapper",
  "player": "#player-wrapper",
  "speedData": [
    0.5,
    0.75,
    1,
    1.25,
    1.5,
    2.0,
    3.0
  ],
  "speedClass": "[data-role=\"wetv-player-playback-rate-list\"] li",
  "speedIncrement": true,
  "videoSelector": "video[src]"
}
let urlCurrentLang = {};
let currentLang = '';
let videoId = null;
let settingCache = null;

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

window.setInterval(() => {
  const setting = getSetting();
  const player = document.querySelector(setting.player);
  const currentSub = document.querySelector(setting.currentSub);
  if (player) {
    if (currentSub && currentSub.innerText && currentLang !== currentSub.innerText) {
      currentLang = currentSub.innerText
      window.dispatchEvent(new CustomEvent("setLangIdGlot", { detail: { id: currentSub.innerText, href: urlCurrentLang[window.location.href] } }));
    }
    if (!window.isLoadedGlot) {
      window.isLoadedGlot = true;
      window.dispatchEvent(new CustomEvent("glotVideoReady"));
    }
  } else {
    window.isLoadedGlot = false;
  }
  if (!window.isFirstLoadSubGlot && document.querySelector(setting.settingSelector)) {
    window.isFirstLoadSubGlot = true;
    window.dispatchEvent(new CustomEvent("renderCoreLayoutGlot"));
  }
  function getParameterByName(name, url) {
    try {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, '\\$&');
      let regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
        results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
    } catch (error) {
      return '';
    }
  }

  const movieIdInDomMatch = getParameterByName("vid", window.location.href);
  if (videoId && movieIdInDomMatch && videoId !== movieIdInDomMatch) {
    videoId = movieIdInDomMatch;
    window.dispatchEvent(new CustomEvent("refreshGlot"));
  }

  if (!videoId && movieIdInDomMatch) videoId = movieIdInDomMatch;

}, 500);

(open => {
  XMLHttpRequest.prototype.open = function (method, url) {
    if (method === 'GET' && url.indexOf(".srt") >= 0) {
      urlCurrentLang[window.location.href] = url;
    }
    open.call(this, method, url);
  };
})(XMLHttpRequest.prototype.open);

const observer2 = new PerformanceObserver((entries) => {
  entries.getEntriesByType("resource").forEach(res => {
    const capture_resource = res.toJSON()
    if (capture_resource.initiatorType == 'script' && capture_resource.name.startsWith(getSetting().captureSelector)) {
      window.dispatchEvent(new CustomEvent("glot_data", { detail: capture_resource.name }));
    }
  })
});
observer2.observe({ entryTypes: ["resource"] });
