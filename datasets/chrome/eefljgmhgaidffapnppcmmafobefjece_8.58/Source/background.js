const uniqueId = "amazon-analysis-" + chrome.runtime.id;
const domainToLocaleCountryAndCurrency = {
  "amazon.com": { locale: "en-US", countryCode: "US", currency: "USD" },
  "amazon.co.uk": { locale: "en-GB", countryCode: "GB", currency: "GBP" },
  "amazon.ca": { locale: "en-CA", countryCode: "CA", currency: "CAD" },
  "amazon.com.au": { locale: "en-AU", countryCode: "AU", currency: "AUD" },
  "amazon.de": { locale: "de-DE", countryCode: "DE", currency: "EUR" },
  "amazon.fr": { locale: "fr-FR", countryCode: "FR", currency: "EUR" },
  "amazon.it": { locale: "it-IT", countryCode: "IT", currency: "EUR" },
  "amazon.es": { locale: "es-ES", countryCode: "ES", currency: "EUR" },
  "amazon.nl": { locale: "nl-NL", countryCode: "NL", currency: "EUR" },
  "amazon.com.br": { locale: "pt-BR", countryCode: "BR", currency: "BRL" },
  "amazon.com.mx": { locale: "es-MX", countryCode: "MX", currency: "MXN" },
  "amazon.in": { locale: "en-IN", countryCode: "IN", currency: "INR" },
  "amazon.ae": { locale: "ar-AE", countryCode: "AE", currency: "AED" },
  "amazon.com.tr": { locale: "tr-TR", countryCode: "TR", currency: "TRY" },
  "amazon.com.sa": { locale: "ar-SA", countryCode: "SA", currency: "SAR" },
  "amazon.com.sg": { locale: "en-SG", countryCode: "SG", currency: "SGD" },
  "amazon.cn": { locale: "zh-CN", countryCode: "CN", currency: "CNY" },
  "amazon.co.jp": { locale: "ja-JP", countryCode: "JP", currency: "JPY" },
  
};


async function getSellCenterData(domain, searchKey, page) {
  domain = domain.replace("www.", "").trim();
  const data = domainToLocaleCountryAndCurrency[domain];
  const locale = data.locale;
  const countryCode = data.countryCode;

  const fetchUrlPublic = `https://sellercentral.${domain}/rcpublic/searchproduct?countryCode=${countryCode}&locale=${locale}`;
  const response = await fetch(fetchUrlPublic, {
    headers: {
      accept: "application/json",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      countryCode: countryCode,
      searchType: "GENERAL",
      pageOffset: page,
      keywords: searchKey,
    }),
    method: "POST",
  });

  if(response.status === 200) {
    const jsonData = await response.json();
    const responseData = {
      data: jsonData,
      error: null,
      message: "success",
      ok: true,
      status: 200,
    };
    return responseData;
  } else {
    const responseData = {
      data: null,
      error: null,
      message: "error",
      status: response.status,
      ok: false,
    };
    return responseData;
  }
}

chrome.runtime.onInstalled.addListener(function (details) {
  
  if (details.reason == "install") {
    chrome.storage.local.set(
      {
        [uniqueId + "_isEnable"]: true,
        [uniqueId + "_isSponsoredEnabled"]: false,
        [uniqueId + "_productPageGraph"]: true,
        [uniqueId + "_productPageDeepViewWidget"]: true,
        [uniqueId + "_isDeepViewSummaryCollapsed"]: true,
        [uniqueId + "_isSalesCollapsed"]: true,
        [uniqueId + "_productDetailsPopup"]: true,
        [uniqueId + "_deepView"]: true,
        [uniqueId + "_quickViewFull"]: true,
        [uniqueId + "_deepViewSummary"]: true,
        [uniqueId + "_productBoxFullOrLite"]: true,
        [uniqueId + "_treadMark"]: false,
        [uniqueId + "_guidelineStatus"]: false,
      },
      function () {
        if (chrome.runtime.lastError) {
          console.error(
            "Initialize isEnable flag: ",
            chrome.runtime.lastError.message
          );
        }
      }
    );
    chrome.tabs.create({
      url: "https://selfpublishingtitans.com/extension/welcome",
    });
  } else if (details.reason == "update") {
    console.log("Updated version");
  }
});
chrome.storage.local.set({ version: 3 });

/*
response = {
  data: object,
  error: object,
  message: string,
  status: string,
  statusCode: number,
}
*/
function backendRequest(url, method, data, token, extraHeaders = {}) {
  return new Promise(async (resolve, reject) => {
    try {
      let response;
      const headers = {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
        ...extraHeaders,
      };
      if(method === "GET") {
        response = await fetch(url, {
          method: method,
          headers: headers,
        });
      }
      else if(method === "DELETE") {
        response = await fetch(url, {
          method: method,
          headers: headers,
        });
      }
      else {
        response = await fetch(url, {
          method: method,
          headers: headers,
          body: JSON.stringify(data),
        });
      }
      if (response.status === 200) {
        const jsonData = await response.json();

        const responseData = {
          data: jsonData,
          error: null,
          message: "success",
          ok: true,
          status: 200,
        };
        resolve(responseData);
      } else if (response.status === 404) {
        const responseData = {
          data: null,
          error: null,
          message: "Not found",
          ok: false,
          status: 404,
        };
        reject(responseData);
      } else if (response.status === 401) {
        const responseData = {
          data: null,
          error: null,
          message: "Unauthorized",
          ok: false,
          status: 401,
        };
        reject(responseData);
      } else {
        const jsonData = await response.json();
        const responseData = {
          data: null,
          error: jsonData && jsonData.error != null ? jsonData.error : null,
          message:
            jsonData && jsonData.message != null ? jsonData.message : "error",
          status: response.status,
          ok: false,
        };
        reject(responseData);
      }
    } catch (err) {
      const responseData = {
        data: null,
        error: err,
        message: "error",
        status: 500,
        ok: false,
      };
      reject(responseData);
    }
  });
}

const chromeExternalMessage = (message, sendResponse) => {
  const type = message.type;
  const payload = message.payload;
  switch (type) {
    case "TITANS_LOGIN":
      chrome.storage.local.set(
        {
          userStatus: true,
          userInfo: payload.user,
          token: payload.token,
          isManuallyLoggedIn: false,
        },
        function () {
          if (chrome.runtime.lastError) sendResponse("Login fail");
          sendResponse("Login success");
        }
      );
      break;
    case "TITANS_LOGOUT":
      // if manually logged in, don't logout
      chrome.storage.local.get(["isManuallyLoggedIn"], function (response) {
        if (chrome.runtime.lastError) sendResponse("Logout fail");

        if (
          response.isManuallyLoggedIn ||
          response.isManuallyLoggedIn == true ||
          response.isManuallyLoggedIn == "true"
        ) {
          sendResponse("Manually logged in");
        } else {
          chrome.storage.local.set(
            { userStatus: false, userInfo: {}, token: null },
            function () {
              if (chrome.runtime.lastError) sendResponse("Logout fail");

              sendResponse("Logout success");
            }
          );
        }
      });

      break;
    default:
      break;
  }
};

chrome.runtime.onMessageExternal.addListener(
  (request, sender, sendResponse) => {
    chromeExternalMessage(request, sendResponse);
  }
);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message == "disable") {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { isEnable: "false" });
    });
  }
  if (request.command) {
    return "getUrl" == request.command
      ? (fetch(request.url, { method: "GET" })
          .then(function (request) {
            request.text().then(function (request) {
               sendResponse(request);
            });
          })
          ["catch"](function (request) {
            console.error(request);
          }),
        !0)
      : void ("saveKeywords" == request.command);
  }
  let userSignedIn = false;
  let returnSession = false;
  let userPackage = null;
  async function flip_user_status(signIn) {
    if (signIn) {
      return new Promise((resolve) => {
        fetch("https://selfpublishingtitans.com/api/auth/session", {
          mode: "cors",
        })
          .then((response) => response.json())
          .then((session) => {
            if (Object.keys(session).length > 0) {
              if (!session.token) {
                resolve("fail");
              } else {
                chrome.storage.local.set(
                  {
                    userStatus: signIn,
                    userInfo: session.user,
                    token: session.token,
                    isManuallyLoggedIn: false,
                  },
                  function () {
                    if (chrome.runtime.lastError) resolve("fail");
                    userSignedIn = true;
                    resolve("success");
                  }
                );
              }
            } else {
              resolve("fail");
            }
          })
          .catch((err) => {
            console.error(err);
            resolve("fail");
          });
      });
    } else if (!signIn) {
      return new Promise((resolve) => {
        chrome.storage.local.get(
          ["userStatus", "userInfo", "token"],
          function (response) {
            if (chrome.runtime.lastError) resolve("fail");

            if (response.userStatus == undefined && response.token == null)
              resolve("fail");

            chrome.storage.local.set(
              { userStatus: signIn, userInfo: {}, token: null },
              function () {
                if (chrome.runtime.lastError) resolve("fail");

                userSignedIn = signIn;
                resolve("success");
              }
            );
          }
        );
      });
    }
  }

  async function flip_user_status_manual(signIn, userInfo) {
    if (signIn) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      };
      return fetch(
        "https://api.selfpublishingtitans.com/api/account/login",
        requestOptions
      )
        .then((response) => response.json())
        .then((user) => {
          return new Promise((resolve) => {
            if (!user.token) {
              resolve("fail");
            } else {
              userPackage = user?.userPackage;
              chrome.storage.local.set(
                {
                  userStatus: signIn,
                  userInfo: user,
                  token: user.token,
                  isManuallyLoggedIn: true,
                },
                function () {
                  if (chrome.runtime.lastError) resolve("fail");

                  userSignedIn = true;
                  resolve("success");
                }
              );
            }
          });
        })
        .catch((err) => {
          console.error(err);
        });
    } else if (!signIn) {
      return new Promise((resolve) => {
        chrome.storage.local.get(
          ["userStatus", "userInfo", "token"],
          function (response) {
            if (chrome.runtime.lastError) resolve("fail");

            if (response.userStatus == undefined && response.token == null)
              resolve("fail");

            chrome.storage.local.set(
              { userStatus: signIn, userInfo: {}, token: null },
              function () {
                if (chrome.runtime.lastError) resolve("fail");

                userSignedIn = signIn;
                resolve("success");
              }
            );
          }
        );
      });
    }
  }

  if (request.message == "login") {
    flip_user_status(true)
      .then((res) => sendResponse(res))
      .catch((err) => console.error(err));
    return true;
  } else if (request.message == "manualLogin") {
    flip_user_status_manual(true, request.payload)
      .then((res) => sendResponse(res))
      .catch((err) => console.error(err));
    return true;
  } else if (request.message == "logout") {
    flip_user_status(false)
      .then((res) => sendResponse(res))
      .catch((err) => console.error(err));
    return true;
  } else if (request.message == "userStatus") {
    is_user_signed_in()
      .then((res) => sendResponse(res))
      .catch((err) => console.error(err));
    return true;
  } else if (request.message == "packageInfo") {
    getPackageInfo()
      .then((res) => {
        if (Date.parse(res.subscription_due) > Date.now()) {
          sendResponse(true);
          return true;
        }
      })
      .catch((err) => {
        sendResponse(err);
        return true;
      });
  } else if (request.message === "apiRequest") {
    const { url, method, data, token, extraHeaders } = request.payload;
    backendRequest(url, method, data, token, extraHeaders)
      .then((res) => {
        sendResponse(res);
      })
      .catch((err) => {
        sendResponse(err);
      });
    return true;
  } else if (request.message === "getSellCenterData") {
    const { domain, searchKey, page } = request.payload;
    getSellCenterData(domain, searchKey, page)
      .then((res) => {
        sendResponse(res);
      })
      .catch((err) => {
        sendResponse(err);
      });
    return true;
  }

  function is_user_signed_in() {
    return new Promise((resolve) => {
      chrome.storage.local.get(["userStatus", "userInfo"], function (response) {
        if (chrome.runtime.lastError)
          resolve({ userStatus: false, userInfo: {} });

        resolve(
          response.userStatus == undefined
            ? { userStatus: false, userInfo: {} }
            : { userStatus: response.userStatus, userInfo: response.userInfo }
        );
      });
    });
  }

  async function getPackageInfo() {
    chrome.storage.local.get(["token"], async function (response) {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };
      let res = await fetch(
        `https://selfpublishingtitans-server-vwy33.ondigitalocean.app/api/exosub`,
        requestOptions
      );
      if (res.status != 200) return "fail";

      return res;
    });
  }

  is_user_signed_in()
    .then((res) => {
      if (res.userStatus) return (returnSession = true);

      userSignedIn = res.userSignedIn;
    })
    .catch((err) => console.error(err));

  chrome.action.onClicked.addListener(function () {
    is_user_signed_in().then((res) => {
      if (res.userStatus) {
        chrome.windows.create({
          url: "./popup.html",
          width: 300,
          height: 600,
          focused: true,
        });
      } else {
        chrome.windows.create({
          url: "./pop-up-sign-in.html",
          width: 300,
          height: 600,
          focused: true,
        });
      }
    });
  });
});
