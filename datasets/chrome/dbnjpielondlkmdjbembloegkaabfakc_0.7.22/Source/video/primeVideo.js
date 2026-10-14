
const _setting = {
  "rulesSub": {
    "GetPlaybackResources": "/cdp/catalog/GetPlaybackResources"
  },
  "playPauseButton": ".atvwebplayersdk-playpause-button",
  "activePlayerCheck": "off",
  "activePlayer": "div[id='dv-web-player'][class='dv-player-fullscreen']",
  "selectedSubtitle": ".atvwebplayersdk-subtitleoption-selected",
  "playerSelector": "div[id='dv-web-player']",
  "videoSelector": "video:not(.tst-video-overlay-player-html5)",
  "playerContainerSelector": "div.webPlayerSDKContainer",
  "settingSelector": ".atvwebplayersdk-hideabletopbuttons-container > div > div"
}
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

  const player = document.querySelector(setting.playerSelector);
  const selectedSubtitle = document.querySelector(setting.selectedSubtitle)
  const activePlayer = document.querySelector(setting.activePlayer);
  const playPauseButton = document.querySelector(setting.playPauseButton)
  if (activePlayer && selectedSubtitle && selectedSubtitle.innerText.toLowerCase() === setting.activePlayerCheck) {
    if (playPauseButton && playPauseButton.parentNode) {
      if (playPauseButton.parentNode.style.display !== 'none') {
        if (!playPauseButton.classList.contains('hide')) {
          window.dispatchEvent(new CustomEvent("hideSubGlot", { detail: '' }));
        }
      }
    }
  }
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
      if (urlObject.pathname.startsWith('/cdp/catalog/GetPlaybackResources')) {
        if (urlObject.searchParams.has('desiredResources')) {
          if (urlObject.searchParams.get('desiredResources').includes('SubtitleUrls')) {
            this.addEventListener('loadend', function (e) {
              try {
                window.dispatchEvent(new CustomEvent("glot_data", { detail: JSON.parse(e.currentTarget.responseText) }));
              } catch (err) {

              }
            })
          }
        }
      }
      if (url.startsWith('http') && url.indexOf('.ttml2') >= 0) {
        // this.addEventListener('loadend', function(e: any){
        window.dispatchEvent(new CustomEvent("setLanguageGlot", { detail: url }))
        // })
      }
    }
    open.call(this, method, url);
  };
})(XMLHttpRequest.prototype.open);
