
const _setting = {
  "rulesSub": {
    "TYPE": "TYPE=SUBTITLES",
    "FORCED": "FORCED=NO",
    "GROUP_ID": "GROUP-ID=\"subtitles_vod-ap",
    "videoPreview": "VideoPreview",
    "getSub": "oa/hls/subscription/playlist.m3u8",
    "getSub1": "play.itunes.apple.com/WebObjects/MZPlay.woa/hls/subscription/playlist.m3u8"
  },
  "checkStyleSub": "STYLE",
  "addSecSubNotStyle": 8800,
  "addSecSubHasStyle": 24000,
  "settingSelector": ".scrim-footer__controls .scrim-footer__control",
  "playerContainerSelector": ".video-player__content",
  "captionsControl": "amp-captions-control",
  "videoSelector": ".video-player .video-container video[src]"
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

const setting = getSetting();

window.currentLanguageGlot = '';
let currentLanguage = null;
let textSelectCache = '';


var parseMock = JSON.parse;

JSON.parse = function () {
  var data = parseMock.apply(this, arguments);
  if (data && data.id && data.attributes) {
    setTimeout(() => {
      if (data.assetURL && data.assetURL.indexOf(setting.rulesSub.getSub) >= 0) {
        window.dispatchEvent(new CustomEvent("get_all_lang_sub_href", { detail: data.assetURL }));
      }
    }, 100);
  }
  return data;
};




window.setInterval(() => {
  const setting = getSetting();
  try {
    const player = document.querySelector(setting.videoSelector);
    if (player) {
      if (!window.isLoadedGlot) {
        window.isLoadedGlot = true;
        window.dispatchEvent(new CustomEvent("glotVideoReady"));
        window.dispatchEvent(new CustomEvent("glotSubtitlesChanged", { detail: window.currentLanguageGlot }));
      }
    } else {
      if (window.isLoadedGlot) {
        window.dispatchEvent(new CustomEvent("glotSubtitlePrimaryChanged", { detail: '' }));
        window.dispatchEvent(new CustomEvent("glotSubtitleSecondChanged", { detail: '' }));
      }
      window.isLoadedGlot = false;
    }
  } catch (error) {

  }


  try {
    const indexSelect = document.querySelector(setting.captionsControl).shadowRoot.querySelector("select").selectedIndex;
    if (indexSelect) {
      const textSelect = document.querySelector(setting.captionsControl).shadowRoot.querySelector("select")[indexSelect].innerText;
      if (textSelectCache !== textSelect) {
        textSelectCache = textSelect;
        window.dispatchEvent(new CustomEvent("lang_first_select", { detail: textSelectCache }));
      }
    }
  } catch (error) { }
}, 500);


