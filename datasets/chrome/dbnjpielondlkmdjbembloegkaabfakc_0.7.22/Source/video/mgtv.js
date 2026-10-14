
const _setting = {
  "captionSelector": "[data-purpose=\"captions-dropdown-menu\"]",
  "settingSelector": "mango-volume",
  "playerContainerSelector": "#mgtv-player-wrap > container",
  "checkAllSub": "pcweb.api.mgtv.com/video/title?",
  "currentSub": "mango-subtitle-bar .ucbox a.focus",
  "speedData": [
    2,
    1.5,
    1.25,
    1,
    0.75,
    0.5
  ],
  "speedClass": ".u-control-speed .ucbox > a",
  "hostGetSub": "https://web-disp.titan.mgtv.com/"
}
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
  const player = document.querySelector(setting.playerContainerSelector);
  const currentSub = document.querySelector(setting.currentSub);
  if (player) {
    if (currentSub && currentSub.dataset.lan) {
      window.dispatchEvent(new CustomEvent("setLangId", { detail: { id: currentSub.dataset.lan, name: currentSub.dataset.name } }));
    }
    if (!window.isLoadedGlot) {
      window.isLoadedGlot = true;
      window.dispatchEvent(new CustomEvent("glotVideoReady"));
    }
  } else {
    window.isLoadedGlot = false;
  }

  const movieIdInDomMatch = window.location.href;
  if (videoId && movieIdInDomMatch && videoId !== movieIdInDomMatch) {
    videoId = movieIdInDomMatch;
    window.dispatchEvent(new CustomEvent("refreshGlot"));
  }

  if (!videoId && movieIdInDomMatch) videoId = movieIdInDomMatch;
}, 500);

const observer2 = new PerformanceObserver((entries) => {
  entries.getEntriesByType("resource").forEach(res => {
    const capture_resource = res.toJSON()
    if (capture_resource.initiatorType == 'script' && capture_resource.name.indexOf(getSetting().checkAllSub) >= 0) {
      window.dispatchEvent(new CustomEvent("glot_data", { detail: capture_resource.name }));
    }
  })
});
observer2.observe({ entryTypes: ["resource"] });
