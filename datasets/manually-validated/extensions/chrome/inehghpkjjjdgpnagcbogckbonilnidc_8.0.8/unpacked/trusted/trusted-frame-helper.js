/*jshint esversion: 6 */
(function (d) {
  // 'd' = instance of window.document

  // This is the URL to call loginsettings on the degreed api and get the service host .
  const baseUrl = 'https://degreed.com';
  const trustedFrameUrlPrefix = `degreed-button/app?is_ext=true`;
  let trustedFrameUrl = trustedFrameUrlPrefix;

  const iframeId = '__degreed-extension__';
  const CLOSE_SLIDER_FROM_X_EVENT = 'CLOSE_SLIDER_FROM_X';
  const APP_READY_EVENT = 'APP_READY';
  const SHOW_LOADER_EVENT = 'SHOW_LOADER';
  const HIDE_LOADER_EVENT = 'HIDE_LOADER';
  let isLoaded = false;
  let iframe;
  let interceptedData;

  const $error = d.getElementById('error');
  const $email = d.getElementById('email');
  const $container = d.getElementById('container');
  const $continue = d.getElementById('continue');
  const $form = d.getElementById('form');

  init();

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  function clearErrorHandler() {
    $error.style.display = 'none';
  }

  function submitEmailHandler() {
    //validate email
    if (!$email.value || !validateEmail($email.value)) {
      $error.style.display = 'block';
    } else {
      $error.style.display = 'none';
      sendMessageToContentScript(SHOW_LOADER_EVENT);

      // get domain from email
      const domain = $email.value.split('@')[1];
      const url = `${baseUrl}/api/degreed/loginsettings?domain=${domain}`;
      // fetch service host from degreed api
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const port = ':44300';
          const serviceHostIsLocalAndMissingPort =
            data.ServiceHost.includes('localhost') &&
            !data.ServiceHost.includes(port);
          const localPort = serviceHostIsLocalAndMissingPort ? port : '';
          const serviceHost = data.ServiceHost + localPort;
          chrome.storage.sync.set({ dgServiceHost: serviceHost }, function () {
            hideContainer();
            buildTrustedFrameUrlAndCreateIframe(serviceHost);
          });
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }

  function init() {
    document.querySelector('label[for="email"]').innerHTML =
      chrome.i18n.getMessage('getStartedText');
    document.getElementById('email').placeholder =
      chrome.i18n.getMessage('emailPlaceholder');
    document.getElementById('continue').innerHTML =
      chrome.i18n.getMessage('continueButtonText');
    document.getElementById('error').innerHTML =
      chrome.i18n.getMessage('invalidEmailError');

    // Listen for messages from the trusted frame proxy
    window.addEventListener('message', function (event) {
      let parsed;
      if (event.data) {
        interceptedData = event.data;

        try {
          parsed = JSON.parse(interceptedData);
        } catch (e) {
          console.warn('No JSON data found', e);
        }

        if (parsed && parsed.dgCloseWindow) {
          sendMessageToContentScript(CLOSE_SLIDER_FROM_X_EVENT);
        } else if (parsed && parsed.resetIframeHost) {
          const dgServiceHost = parsed.remoteOrgHost;

          // Parse the URL to ensure correct handling of host value
          const url = new URL(dgServiceHost);
          const host = url.hostname;
          const regex = new RegExp(
            /^(?:[a-zA-Z0-9-]+\.)*degreed\.(?:com|app|dev)$/
          );

          // Check if the host ends with any of the specified domains
          const isValidMatch = host.match(regex);
          if (!(isValidMatch?.[0] === host)) {
            return;
          }

          // build trustedFrameUrl with service host from chrome storage
          chrome.storage.sync.set({ dgServiceHost: dgServiceHost }, () => {
            d.getElementById(iframeId).setAttribute(
              'src',
              `${dgServiceHost}/${trustedFrameUrlPrefix}`
            );
          });
        } else if (parsed && parsed.APP_READY) {
          sendMessageToContentScript(HIDE_LOADER_EVENT);
          sendMessageToContentScript(APP_READY_EVENT);
        } else {
          tryRelayMessage(event.data);
        }
      }
    });

    let dgServiceHost = null;
    chrome.storage.sync.get(['dgServiceHost'], function (result) {
      dgServiceHost = result.dgServiceHost;
      if (!dgServiceHost) {
        // display form to enter email
        $form.style.display = 'block';
        // listener for submit email Enter key press
        d.addEventListener('keydown', (event) => {
          if (event.code === 'Enter') {
            event.preventDefault();
            submitEmailHandler();
          } else {
            clearErrorHandler();
          }
        });
        // listener for submit email button click
        // and clear error messages on keyup
        $continue.addEventListener('click', submitEmailHandler);
      } else {
        hideContainer();
        buildTrustedFrameUrlAndCreateIframe(dgServiceHost);
      }
    });
  }

  function buildTrustedFrameUrlAndCreateIframe(dgServiceHost) {
    // show loader while iframe loads
    sendMessageToContentScript(SHOW_LOADER_EVENT);

    // build trustedFrameUrl with service host from chrome storage
    trustedFrameUrl = `${dgServiceHost}/${trustedFrameUrlPrefix}`;

    // create iframe
    createIframe(function onCreated() {
      iframe.onload = onFrameLoad; // attach onload listener
    });
  }

  function hideContainer() {
    $container.style.display = 'none';
  }

  function createIframe(callback) {
    // Load our URL into the trusted iframe.
    // This is what gets us around restrictive CSP headers.
    iframe = d.createElement('iframe');
    iframe.id = iframeId;
    iframe.src = trustedFrameUrl;
    d.body.appendChild(iframe);
    if (callback) {
      callback();
    }
  }

  function onFrameLoad() {
    isLoaded = true;
    if (interceptedData) {
      // Handles race winner of message being posted before frame loaded
      tryRelayMessage(interceptedData);
    }
  }

  function tryRelayMessage(eventData) {
    // If the iframe is ready,
    // relay the event to our frame proxy
    if (isLoaded) {
      iframe.contentWindow.postMessage(eventData, '*');
    }
  }

  function sendMessageToContentScript(message, callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: message },
        function (response) {
          if (callback) callback(response);
        }
      );
    });
  }
})(document); // IIFE module DI
