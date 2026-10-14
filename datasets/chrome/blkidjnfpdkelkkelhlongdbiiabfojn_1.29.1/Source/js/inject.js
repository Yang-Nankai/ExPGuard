function injectLocalStyle(src) {
  return new Promise(function (resolve, reject) {
    let link = document.createElement("link");
    link.href = chrome.runtime.getURL(src);
    link.rel = "stylesheet";

    link.onload = () => resolve(link);
    link.onerror = () => reject(new Error(`Style load error for ${src}`));

    document.head.append(link);
  });
}

function injectExtensionId() {
  const el = document.createElement('div');
  el.id = 'neuromarket-extension-id';
  el.style.display = 'none';
  el.dataset.extensionId = chrome.runtime.id;
  (document.documentElement || document.body || document.head).appendChild(el);
}

function injectLocalScript(src) {
  injectExtensionId();
  const s = document.createElement("script");
  s.src = chrome.runtime.getURL(src);
  s.type = "module";
  s.onload = function () {
    this.remove();
  };
  (document.head || document.documentElement).appendChild(s);
}


(() => {
  (() => {
    const CDN_HOST = "https://cdn.neuromarket.online/";
    const CMP_LOCATIONS = [
      "https://cmp.wildberries.ru",
      "https://cmp-new.wildberries.ru",
    ];

    const CLIENT_LOCATIONS = [
      "https://wildberries.ru",
      "https://www.wildberries.ru",
      "https://wildberries.kz",
      "https://www.wildberries.kz",
      "https://wildberries.by",
      "https://www.wildberries.by",
      "https://wildberries.uz",
      "https://www.wildberries.uz",
    ];

    const SELLER_LOCATIONS = [
      "https://seller.wildberries.ru",
    ];

    if (CMP_LOCATIONS.some((pattern) => location.href.startsWith(pattern))) {
      injectLocalScript("dist/bundle.js");
    }

    if (SELLER_LOCATIONS.some((pattern) => location.href.startsWith(pattern))) {
      try {
        const wbCaptchaKey = "wb-eu-passport-v2.access-token"
        const storageData = localStorage.getItem(wbCaptchaKey)

        if (storageData) {
          chrome.storage.local.set({ "neuromarket-auth-v3": btoa(storageData) });
        }
      } catch (e) {
        console.log("Something wrong with auth token")
      }
    }

    if (CLIENT_LOCATIONS.some((pattern) => location.href.startsWith(pattern))) {

      try {
        const wbTokenKey = "wbx__tokenData"
        const storageData = localStorage.getItem(wbTokenKey)

        if (storageData) {
          const tokenData = JSON.parse(storageData)
          chrome.storage.local.set({ "neuromarket-token": btoa(tokenData.token) });
        }
      } catch (e) {
        console.log("Something wrong with tokenData")
      }

      try {
        const wbTokenKey = "wbx__sessionID"
        const storageData = localStorage.getItem(wbTokenKey)

        if (storageData) {
          chrome.storage.local.set({ "neuromarket-deviceid": storageData });
        }
      } catch (e) {
        console.log("Something wrong with tokenData")
      }

      try {
        const wbCaptchaKey = "wb-captcha-short-token"
        const storageData = localStorage.getItem(wbCaptchaKey)

        if (storageData) {
          chrome.storage.local.set({ "neuromarket-captcha-token": btoa(storageData) });
        }
      } catch (e) {
        console.log("Something wrong with Captcha")
      }

      try {
        const xPow = "session-pow-token"
        const storageData = localStorage.getItem(xPow)

        if (storageData) {
          chrome.storage.local.set({ "neuromarket-xpow-data": btoa(storageData) });
        }
      } catch (e) {
        console.log("Something wrong with Captcha")
      }

      injectLocalStyle("css/client.css");
      injectLocalScript("js/extension_client.js");
    }
  })();

})();
