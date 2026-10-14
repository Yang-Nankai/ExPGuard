
const _setting = {
  "checkCookie": false,
  "captionActive": "[aria-checked=\"true\"]",
  "player": "[class*=\"--video-player--\"]",
  "captionSelector": "[data-purpose=\"captions-dropdown-menu\"]",
  "settingSelector": "[data-purpose=\"video-controls\"] > :last-child",
  "playerContainerSelector": "div[class*='video-viewer--container']",
  "speedData": [
    0.5,
    0.75,
    1,
    1.25,
    1.5,
    1.75,
    2
  ],
  "speedIncrement": true,
  "speedClass": "[data-purpose=\"playback-rate-menu\"] > ul > li > div",
  "getSubFromWebPageClassData": ".ud-component--course-preview--app",
  "getSubFromWebPageKeyData": "data-module-args",
  "getAllLangSelector": "/api-2.0/users/me/subscribed-courses"
}
window.currentUrlGlot = ''
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
  const captionCon = document.querySelector(setting.captionSelector);
  const captionStatus = captionCon && captionCon.querySelector(setting.captionActive);

  if (window.location.href != window.currentUrlGlot) {
    if (window.location.href.match(/udemy.com\/course*/) != null &&
      window.location.href.match(/udemy.com\/course*/).length > 0) {
      window.dispatchEvent(new CustomEvent("get_sub_from_web_page", { detail: window.location.href }));
    } else if ((window.location.href.match(/udemy.com\/tutorial*/) != null &&
      window.location.href.match(/udemy.com\/tutorial*/).length > 0)) {
      const dataString = document.querySelector("body").getAttribute("data-module-args");
      if (dataString) {
        window.dispatchEvent(new CustomEvent("get_sub_from_dom_for_tutorial", { detail: dataString }));
      }
    }
    window.currentUrlGlot = window.location.href;
  }

  if (player) {
    if (!window.isLoadedGlot) {
      window.isLoadedGlot = true;
      window.dispatchEvent(new CustomEvent("glotVideoReady"));
      if (captionCon) {
        if (captionStatus && captionStatus.innerText === 'Off') {
          window.subtitlesEnabledGlot = false;
          window.dispatchEvent(new CustomEvent("glotSubtitlesChanged", { detail: "getStorePrimaryLang" }));
        } else {
          window.subtitlesEnabledGlot = true;
          window.dispatchEvent(new CustomEvent("glotSubtitlesChanged", { detail: window.currentLanguageGlot }));
        }
      }
    }
  } else {
    window.isLoadedGlot = false;
  }

  if (!document.querySelector(".glot-settings")) {
    window.isFirstLoadIcon = true;
    window.dispatchEvent(new CustomEvent("renderIcon"));
  }
}, 500);

// Shared handler for intercepted URL requests (XHR and fetch)
function handleInterceptedUrl(url) {
  if (!url || !url.match(/^http/g)) return;
  try {
    const urlObject = new URL(url);
    const patt2 = /vtt-(.*?[^\\]).udemycdn.co/g;
    if (patt2.test(urlObject.host)) {
      window.subtitlesEnabledGlot = true;
      const splitPathName = urlObject.pathname.split("/")
      const lang = splitPathName[2];
      window.currentLanguageGlot = lang;
      window.dispatchEvent(new CustomEvent("glot_data", { detail: urlObject.href }));
      window.dispatchEvent(
        new CustomEvent("glotSubtitlesChanged", { detail: lang })
      );
    }
  } catch (e) {}
}

// Intercept XMLHttpRequest
(open => {
  XMLHttpRequest.prototype.open = function (method, url) {
    if (method === 'GET' && url && url.match(/^http/g) !== null) {
      handleInterceptedUrl(url);
      const urlObject = new URL(url);
      if (urlObject.pathname.startsWith(getSetting().getAllLangSelector) && urlObject.pathname.indexOf('social-bookmarks') > 0) {
        const href = urlObject.href.split('social-bookmarks')[0] + '?fields[asset]=captions';

        this.addEventListener('loadend', function (e) {
          window.dispatchEvent(new CustomEvent('get_all_lang_sub', { detail: `${href}##${window.currentLanguageGlot || ''}` }));
        });
      }
    }
    open.call(this, method, url);
  };
})(XMLHttpRequest.prototype.open);

// Intercept fetch API (Udemy uses fetch for VTT subtitles)
(originalFetch => {
  window.fetch = function (input, init) {
    const url = typeof input === 'string' ? input : (input && input.url) || '';
    handleInterceptedUrl(url);
    return originalFetch.apply(this, arguments);
  };
})(window.fetch);