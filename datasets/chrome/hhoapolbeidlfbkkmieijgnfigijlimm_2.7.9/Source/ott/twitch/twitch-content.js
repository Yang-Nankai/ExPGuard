/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
// extension content script for ott service. this is part of extension which can access chrome.runtime api
console.log('twitch contents script loaded');

function observeChatMessages(callback) {
  const messageContainer = document.querySelector('#live-page-chat');

  if (messageContainer.isObservingScreena) {
    return true;
  }

  messageContainer.isObservingScreena = true;
  if (!messageContainer) return false;
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.classList && node.classList.contains('chat-line__message')) {
          // chat-line__message 클래스명을 가진 하위 요소가 추가됨
          callback(node);
        }
      });
    });
  });
  observer.observe(messageContainer, {
    childList: true,
    subtree: true
  });
  return true;
} // Add a new method without debounce


const sendMessageToExtensionWithoutDebounce = async (type, data = null) => {
  // console.log('sendMessageToExtensionWithoutDebounce', type, data)
  return new Promise(resolve => {
    // eslint-disable-next-line no-undef
    chrome.runtime.sendMessage('hhoapolbeidlfbkkmieijgnfigijlimm', {
      from: 'content',
      service: 'twitch',
      type,
      data
    }, function (response) {
      resolve(response);
    });
  });
};

function getCodeFromUrlIfScreena(str) {
  try {
    const urlObj = new URL(str);
    const urlForMatching = urlObj.origin + urlObj.pathname; // get the base URL without search and hash

    for (const matchPattern of [/.*screena\.com\/.*/, /http:\/\/localhost:3000\/.*/]) {
      if (matchPattern.test(urlForMatching)) {
        const code = urlObj.search.substring(1).split('&').sort((a, b) => b.length - a.length)[0];
        return code;
      }
    }

    return null;
  } catch (e) {
    console.error(e);
    return null;
  }
} // Listen for the message from the extension


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // console.log('onMessage',request.channel,new URL(location.href).pathname.split('/')[1],sender)
  const channel = new URL(location.href).pathname.split('/')[1];

  if (request.type === 'observeChatMessages') {
    if (request.channel && request.channel !== channel) {
      sendResponse({
        success: false
      });
      return;
    }

    const success = observeChatMessages(async node => {
      const username = node.querySelector('[data-a-target="chat-message-username"]').innerText;
      if (username !== 'screena_bot' && username !== 'screena_dev') return;
      const messageText = node.querySelector('[data-a-target="chat-line-message-body"]').innerText;
      const code = getCodeFromUrlIfScreena(messageText); // console.log('New chat message:', username, messageText, code)

      if (code) {
        const response = await sendMessageToExtensionWithoutDebounce('observedChatMessage', {
          code,
          channel
        }); // console.log('Response from extension:', response)
      }
    });
    sendResponse(success && 'success');
  } else if (request.type === 'rearrange') {
    if (!document.querySelector('.channel-root__scroll-area--theatre-mode')) {
      document.querySelector('[data-a-target="player-theatre-mode-button"]')?.click();
    }

    if (document.querySelector('[data-a-target="right-column-chat-bar-collapsed"]')) {
      document.querySelector('[data-a-target="right-column__toggle-collapse-btn"]')?.click();
    }

    sendResponse('success');
  }
});
/******/ })()
;