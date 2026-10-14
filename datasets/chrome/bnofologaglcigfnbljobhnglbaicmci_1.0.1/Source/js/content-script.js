/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
(() => {
  const setFonts = () => {
    const links = [{
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    }, {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossorigin: ''
    }, {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Kodchasan:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&display=swap'
    }];
    const fragment = document.createDocumentFragment();
    links.forEach(linkData => {
      const link = document.createElement('link');
      Object.keys(linkData).forEach(key => {
        link[key] = linkData[key];
      });
      fragment.appendChild(link);
    });
    document.head.appendChild(fragment);
  };
  const initWidget = () => {
    if (!document.head || !document.head.appendChild) {
      return setTimeout(initWidget, 100);
    }
    const widget = document.createElement('script');
    const widgetUrl = chrome.runtime.getURL('js/widget.js');
    widget.src = widgetUrl;
    setFonts();
    document.head.appendChild(widget);
    widget.onload = function () {
      this.remove();
    };
  };
  const getAvatars = async () => {
    const {
      avatars
    } = await chrome.storage.local.get('avatars');
    const lifeTime = 1000 * 60 * 60 * 3;
    const diffUpdate = Date.now() - avatars.lastUpdate;
    if (lifeTime < diffUpdate) {
      chrome.runtime.sendMessage('updateAvatars');
    }
    return avatars;
  };
  chrome.runtime.onMessage.addListener(function (request) {
    switch (request.action) {
      case 'switchWidget':
        window.postMessage({
          forWidget: true,
          message: 'switchWidget',
          context: request.context,
          type: request.type
        });
        break;
      case 'startSpeak':
        window.postMessage({
          forWidget: true,
          message: 'startSpeak'
        });
        break;
      default:
        break;
    }
  });
  window.addEventListener('message', event => {
    if (event && event.data.textSpeecher) {
      switch (event.data.message) {
        case 'getResources':
          // eslint-disable-next-line no-case-declarations
          const resources = [];
          for (let i = 0; i < event.data.props.length; i++) {
            resources.push(chrome.runtime.getURL(event.data.props[i]));
          }
          getAvatars().then(data => {
            window.postMessage({
              forWidget: true,
              message: 'sendResources',
              resources,
              avatars: data.list,
              avatarsVersion: data.listVersion,
              avatarsLastUpdate: data.lastUpdate,
              extVer: chrome.runtime.getManifest().version,
              type: event.data.type
            });
          });
          break;
        case 'setNewBaseSpeed':
          chrome.storage.local.set({
            defaultSpeed: event.data.speed
          });
          break;
        case 'getReportData':
          window.postMessage({
            forWidget: true,
            message: 'gotReportData',
            reportData: {
              extensionId: chrome.runtime.id,
              uId: 'test'
            }
          });
          break;
        case 'setVoiceParams':
          chrome.storage.local.set({
            voiceParams: {
              voice: event.data.params.voice,
              lang: event.data.params.lang
            }
          });
          break;
        case 'whatALang':
          chrome.i18n.detectLanguage(event.data.text).then(data => {
            chrome.runtime.sendMessage({
              action: 'getTabId'
            });
            !data.languages.length ? window.postMessage({
              forWidget: true,
              message: 'unreadableNotification'
            }) : window.postMessage({
              forWidget: true,
              message: 'sendLanguage',
              lang: data.languages[0].language
            });
          });
          break;
        case 'getBaseSpeed':
          chrome.storage.local.get(['defaultSpeed'], async storage => {
            window.postMessage({
              forWidget: true,
              message: 'gotBaseSpeed',
              speed: storage.defaultSpeed
            });
          });
          break;
        case 'getVoiceParams':
          chrome.storage.local.get(['voiceParams'], async storage => {
            window.postMessage({
              forWidget: true,
              message: 'voiceParams',
              params: storage.voiceParams
            });
          });
          break;
        case 'getAvatars':
          getAvatars().then(data => {
            window.postMessage({
              forWidget: true,
              message: 'sendAvatars',
              // avatars: data,
              avatars: data.list,
              avatarsVersion: data.listVersion,
              avatarsLastUpdate: data.lastUpdate
            }, '*');
          });
          break;
        default:
          break;
      }
    }
  });
  initWidget();
})();
/******/ })()
;