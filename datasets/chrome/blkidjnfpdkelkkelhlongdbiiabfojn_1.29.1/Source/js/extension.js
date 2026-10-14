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

  function setCrossSubdomainCookie(name, value, days) {
    const assign = name + "=" + escape(value) + ";";
    const d = new Date();
    d.setTime(d.getTime() + (days*24*60*60*1000));
    const expires = "expires="+ d.toUTCString() + ";";
    const path = "path=/;";
    const domain = "domain=" + (document.domain.match(/[^\.]*\.[^.]*$/)[0]) + ";";
    document.cookie = assign + expires + path + domain;
  }

  if (CMP_LOCATIONS.some((pattern) => location.href.startsWith(pattern))) {
    const isProVersion = !!JSON?.parse(localStorage.getItem("nm-pro-version"))
    if (location.href.includes("__dev=1") || isProVersion) {
      localStorage.setItem("nm-pro-version", JSON.stringify(true));
      import(CDN_HOST + "dev/bundle_dev.js?v=1-15-4");
    } else {
      import(CDN_HOST + "dist/extension_cmp.js?v=0192-3lk");
    }
  }

  if (SELLER_LOCATIONS.some((pattern) => location.href.startsWith(pattern))) {
    try{
      const wbCaptchaKey = "wb-eu-passport-v2.access-token"
      const storageData = localStorage.getItem(wbCaptchaKey)
      
      if(storageData) {
        const bToken = btoa(storageData)
        setCrossSubdomainCookie("neuromarket-auth-v3", bToken, 3)
      }
    } catch(e) {
      console.log("Something wrong with auth token")
    }
  }

  if (CLIENT_LOCATIONS.some((pattern) => location.href.startsWith(pattern))) {
    
    try{
      const wbTokenKey = "wbx__tokenData"
      const storageData = localStorage.getItem(wbTokenKey)
      
      if(storageData) {
        const tokenData = JSON.parse(storageData)
        const token = tokenData.token
        const bToken = btoa(token)
        setCrossSubdomainCookie("neuromarket-token", bToken, 3)
      }
    } catch(e) {
      console.log("Something wrong with tokenData")
    }
    
    try{
      const wbCaptchaKey = "wb-captcha-short-token"
      const storageData = localStorage.getItem(wbCaptchaKey)
      
      if(storageData) {
        const bToken = btoa(storageData)
        setCrossSubdomainCookie("neuromarket-captcha-token", bToken, 3)
      }
    } catch(e) {
      console.log("Something wrong with Captcha")
    }

    if (location.href.includes("__dev=1")) {
      import(CDN_HOST + "dev/extension_client_dev.js?v=0-1-1");
    } else {
      import(CDN_HOST + "dist/extension_client.js?v=0-1-8");
    }
  }
})();
