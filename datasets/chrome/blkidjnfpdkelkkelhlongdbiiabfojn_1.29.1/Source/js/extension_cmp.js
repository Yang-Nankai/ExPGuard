/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-unused-vars */
import AirDatepicker from "../libs/air-datepicker.js";
import Toastify from "../libs/toastify-js.js";
import "../libs/popper.min.js";
import "../libs/tippy-bundle.umd.js";
import "../libs/echarts.min.js";
import { Base64 } from "../libs/base64.min.js";
import moment from "../libs/moment.min.js";
import { jwtDecode } from "../libs/jwt-decode.js";

window.AirDatepicker = AirDatepicker;
window.Toastify = Toastify;

//TODO ПЛАН "Б"
// window.addEventListener("message", (msg) => {
//   console.log("MESSAGE", msg)
// }, false)
// if(document.location.href.includes("cmp.wildberries.ru")){
//   window.open("https://www.wildberries.ru/getLocalToken", "Нейромаркет Авторизация запросов", `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
//   width=5,height=5,left=-1000,top=-1000`)
// }

(() => {
  let injected = false;
  let campaignId = null;

  let alreadyInjectedAds = [];

  let CAMPAIGN_NAME_ELEMENT;
  let WB_TOKEN_RAW = getCookie("neuromarket-token") || null;
  let WB_CAPTCHA_RAW = getCookie("neuromarket-captcha-token") || null;
  let WB_AUTH_V3_RAW = getCookie("neuromarket-auth-v3") || null;

  let WB_TOKEN = WB_TOKEN_RAW
    ? Base64.decode(decodeURIComponent(WB_TOKEN_RAW))
    : null;

  let WB_CAPTCHA = WB_CAPTCHA_RAW
    ? Base64.decode(decodeURIComponent(WB_CAPTCHA_RAW))
    : null;

  let WB_AUTH_V3 = WB_AUTH_V3_RAW
    ? Base64.decode(decodeURIComponent(WB_AUTH_V3_RAW))
    : null;
  1
  let WB_TOKEN_DECODED = null;

  try {
    if (WB_TOKEN && jwtDecode(WB_TOKEN)) {
      WB_TOKEN_DECODED = jwtDecode(WB_TOKEN)
    }
  } catch (e) { }

  const PAY_HOST = "https://pay.neuromarket.online/";

  const VERSION = "0.19.11";
  const NEUROMARKET_CHROME_ID = document.getElementById('neuromarket-extension-id')?.dataset?.extensionId;
  // const NEUROMARKET_CHROME_ID = "ofjinikpdciemfpkdlapbjjcfbfhphno";
  // const NEUROMARKET_CHROME_ID = "blkidjnfpdkelkkelhlongdbiiabfojn";

  const UPDATE_MESSAGE_READ = isLocalStorageAvailable()
    ? localStorage.getItem("neuromarket-" + VERSION + "-read") || false
    : true;

  const TG_MESSAGE_READ = isLocalStorageAvailable()
    ? localStorage.getItem("neuromarket-tg-read") || false
    : true;

  const CLICKED_NEW_VERSION = isLocalStorageAvailable()
    ? localStorage.getItem("neuromarket-pro-click") || false
    : true;

  const CLUSTERS_THREADS = 5;
  const THREADS = 20;
  const THREAD_DELAY_MS = 50;

  const MAX_RETRIES = 5;
  const MAX_POSITIONS_PAGE = 5;
  const REQUEST_DELAY = 30000;

  const REGIONS = {
    MOSCOW: { name: "Москва", dest: -1257786 },
    KRASNODAR: { name: "Краснодар", dest: 12358093 },
    PITER: { name: "Санкт-Петербург", dest: -1121516 },
    KHABAROVSK: { name: "Хабаровск", dest: -1785056 },
    EKATERINBURG: { name: "Екатеринбург", dest: -5817698 },
    NOVOSIBIRSK: { name: "Новосибирск", dest: -364763 },
    KAZAN: { name: "Казань", dest: -2133462 },
    SEVASTOPOL: { name: "Севастополь", dest: -3827420 },
    ARMENIA: { name: "Армения", dest: 36 },
    BELARUS: { name: "Беларусь", dest: -59249 },
    KAZAHSTAN: { name: "Казахстан", dest: 85 },
  };

  const AD_TYPES = {
    4: "CATALOG",
    5: "CAROUSEL",
    6: "SEARCH",
    7: "RECOM",
    8: "AUTO",
    9: "SEACAT",
    10: "BILLBOARD",
  };

  const AD_TYPES_BY_NAME = {
    CATALOG: 4,
    CAROUSEL: 5,
    SEARCH: 6,
    RECOM: 7,
    AUTO: 8,
    SEACAT: 9,
    BILLBOARD: 10,
  };

  let USER_DATA;

  let CURRENT_APPTYPE = localStorage.getItem("neuromarket-apptype") || "IOS";
  let CURRENT_REGION =
    localStorage.getItem("neuromarket-region-name") || "MOSCOW";
  const APPTYPE = {
    WEB: 1,
    ANDROID: 32,
    IOS: 64,
  };

  const checkLoader = `
    <div class="n-loader" style="width:20px !important; height:15px !important;">
        <svg
        aria-hidden="true"
        role="status"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        >
        <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
        />
        <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="#1C64F2"
        />
        </svg>
    </div>
    `;

  async function observeFunction() {
    if (document.querySelector(".marketpapa-clusters-video")) {
      document.querySelector(".marketpapa-clusters-video")?.remove()
    }

    const isSameLocation =
      window?.__NEUROMARKET_LOCATION_INJECTED__ === window.location.href;
    if (window?.__NEUROMARKET_ENGINE__ === true && isSameLocation) {
      return;
    }

    if (window?.__NEUROMARKET_ENGINE__ === true && !isSameLocation) {
      if (window.Engine) {
        window.Engine.destroy();
        window.__NEUROMARKET_LOCATION_INJECTED__ = false;
        window.__NEUROMARKET_CAMPAIGNS_LIST_BUTTON_INJECTED__ = false;
        window.__NEUROMARKET_CAMPAIGNS_LIST_BUTTON_ATTACHED__ = false;
        window.__NEUROMARKET_ENGINE__ = false;
        window.__NEUROMARKET_AD_TYPE = null;
      }

      if (window.helpEngine) {
        window.helpEngine.destroy();
      }
    }

    // ГОТОВАЯ КНОПКА ДЛЯ ДОБАВЛЕНИЯ В СПИСОК КАМПАНИЙ
    if (window.location.href.includes("/campaigns/list")) {
      const createAdButtonElement = GetCreateAdElement();
      if (createAdButtonElement && !document.getElementById("n-enchance-btn")) {

        if (window?.__NEUROMARKET_NEW_FRONT__) {
          createAdButtonElement.parentNode.style.display = 'flex';
          createAdButtonElement?.insertAdjacentHTML(
            "beforebegin",
            `<div style="display: flex; position: relative;">
        <div href="#" id="n-enchance-btn" class="n-enchance-btn">
          <img src="https://cdn.neuromarket.online/images/logo_symbol.png"/>
          <span id="n-enchance-btn-text">Улучшено</span>
        </div>
        <div style="position: absolute; bottom: -50px; left:0; z-index:10; display: none;" id="n-enchance-remove-api-btn" class="n-enchance-btn">Удалить API Токен</div>
        </div>`
          );
        } else {
          createAdButtonElement?.parentNode?.insertAdjacentHTML(
            "beforebegin",
            `<div style="display: flex; position: relative;">
        <div href="#" id="n-enchance-btn" class="n-enchance-btn">
          <img src="https://cdn.neuromarket.online/images/logo_symbol.png"/>
          <span id="n-enchance-btn-text">Улучшено</span>
        </div>
        <div style="position: absolute; bottom: -50px; left:0; z-index:10; display: none;" id="n-enchance-remove-api-btn" class="n-enchance-btn">Удалить API Токен</div>
        </div>`
          );
        }

        const enchanceButton = document.getElementById("n-enchance-btn");
        const enchanceButtonText = document.getElementById(
          "n-enchance-btn-text"
        );
        const enchanceRemoveApiTokenButton = document.getElementById(
          "n-enchance-remove-api-btn"
        );

        enchanceButton.addEventListener("click", () => {
          if (!window.helpEngine.ApiToken) return;
          enchanceRemoveApiTokenButton.style.display =
            enchanceRemoveApiTokenButton.style.display === "flex"
              ? "none"
              : "flex";
        });
        enchanceRemoveApiTokenButton.addEventListener("click", () => {
          const existsTokens = JSON.parse(
            localStorage.getItem("neuromarket-api-token") || "{}"
          );

          const {
            [window.helpEngine.supplierId]: currentToken,
            ...restTokens
          } = existsTokens;

          localStorage.setItem(
            "neuromarket-api-token",
            JSON.stringify(restTokens)
          );
          enchanceRemoveApiTokenButton.style.display = "none";
          Toastify({
            text: "✅ API Токен данного поставщика удалён. Страница обновится автоматически через 3 секунды.",
            duration: 5000,
            newWindow: true,
            gravity: "bottom", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            style: {
              background: "linear-gradient(to right, #162033, #253144)",
              fontSize: "0.8em",
              maxWidth: "300px",
              borderRadius: "10px",
              border: "1px solid #334155",
              boxShadow: "0",
            },
            offset: {
              y: 200,
            },
          }).showToast();
          setTimeout(() => {
            location.reload();
          }, 5000);
        });

        const parentElement = window?.__NEUROMARKET_NEW_FRONT__ ? createAdButtonElement : createAdButtonElement.parentElement;

        if (window.helpEngine === undefined) {
          window.helpEngine = new NeuromarketEngine();
          if (!window.helpEngine.accessToken) {
            await window.helpEngine.getAccessToken();
          }
          await window.helpEngine.getSupplierUsers();
          await window.helpEngine.getSupplier();
        }

        const ApiToken = JSON.parse(
          localStorage.getItem("neuromarket-api-token") || "{}"
        )?.[window.helpEngine.supplierId];

        if (!ApiToken) {
          parentElement.parentElement.parentElement.style.gridTemplateRows = "initial";
          parentElement?.parentElement?.insertAdjacentHTML(
            "afterend",
            `<div class="n-api-token-layout" id="n-api-token-layout">
          <div style="display:flex; flex-direction: column;">
          <div class="n-api-bg-glow-blue"></div>  
          <div class="n-api-bg-glow-red"></div>  
            <span style="color: #ffffff; z-index:10; font-weight: 500;">Получите еще больше функционала с помощью <a class="n-api-token-link" target="_blank" href="https://seller.wildberries.ru/supplier-settings/access-to-api">API токена</a></span>
            <div style="display:flex; font-size: 0.9em; z-index:10;  align-items:center; gap: 2px; color: #cbd5e1">
              Баланс
              <svg xmlns="http://www.w3.org/2000/svg" style="fill: #cbd5e1;" width="20" height="20" viewBox="0 0 24 24"><circle cx="12" cy="12" r="2"></circle></svg>
              Ставка
              <svg xmlns="http://www.w3.org/2000/svg" style="fill: #cbd5e1;" width="20" height="20" viewBox="0 0 24 24"><circle cx="12" cy="12" r="2"></circle></svg>
              Статистика — по всем Рекламным Кампаниям
            </div>
          </div>
          <div style="display:flex; z-index:10; gap:12px; align-items:center;">
            <div class="n-api-token-set-btn" id="n-api-token-set-btn">Ввести вручную</div>
            <div class="n-create-api-token-btn" id="n-create-api-token-btn">Создать Автоматически</div>
          </div>
        </div>
        <div style="position: fixed;font-size: 0.9em;top:0;left:0;width:100%;height:100vh;display:none;align-items:center;justify-content:center;background: rgba(0,0,0,.5);backdrop-filter: blur(5px);z-index: 50;color: white;" id="n-api-token-add-overlay">
          <div style="position: relative; display:flex;flex-direction: column;border: 1px solid #ffffff1a;padding: 12px;background: #1e293b; gap: 4px;border-radius: 8px;">
            <span class="n-api-token-add-close" id="n-api-token-add-close">+</span>
            <div>Ручное добавление API Токена</div>
            <span style="margin-top:12px;">Необходимы следующие права доступа:</span>
            <div style="color: #707f95;font-size:0.9em; display: flex;align-items:center;justify-content: center;gap: 12px;">
              <div style="display:flex; align-items: center; gap:4px;"><span class="n-api-scope-grey" id="n-api-token-scope-read"></span>Только Чтение</div>
              <div style="display:flex; align-items: center; gap:4px;"><span class="n-api-scope-grey" id="n-api-token-scope-promotion"></span>Продвижение</div>
              <div style="display:flex; align-items: center; gap:4px;"><span class="n-api-scope-grey" id="n-api-token-scope-analytics"></span>Аналитика</div>
            </div>
            <div style="display: flex; width: 100%; margin-top: 12px;">
              <div style="flex: 1;"><input type="text" id="n-api-token-input" placeholder="Введите API Токен" style="width: 100%;box-sizing: border-box; padding: 8px 8px; border-radius: 8px 0 0 8px; border:none; height:34px; background:#0f172a; color: white;"/></div>
              <button class="n-create-api-token-btn" id="n-api-token-save" style="padding: 8px 8px; border-radius: 0 8px 8px 0; border:none;" disabled="true">Сохранить</button>
            </div>
            </div>
        </div>`
          );

          tippy("#n-create-api-token-btn", {
            content(reference) {
              return `
          <div class="n-column-tip" style="flex-direction: column; max-width: max-content; align-items: start; text-align:left;">
            <strong style="padding-bottom:4px;">API токен будет создан автоматически</strong>
            <span style="padding-bottom:4px;">Будет выставлен режим "Только чтение" с правами доступа к разделам "Аналитика" и "Продвижение".</span>
            <p style="display:flex; flex-direction: column; padding: 4px 8px; background: #334155; gap:2px; border-radius: 8px;">
              <span>Создать API Токен может только владелец кабинета поставщика. Если Вы не владелец, запросите API токен и введите его вручную.</span>
            </p>
          </div>
        `;
            },
            arrow: false,
            followCursor: false,
            placement: "top",
            allowHTML: true,
          });

          const apiTokenSaveBtn = document.getElementById("n-api-token-save");
          const apiTokenLayout = document.getElementById("n-api-token-layout");
          const apiTokenAddOverlay = document.getElementById(
            "n-api-token-add-overlay"
          );
          const apiTokenAddOverlayClose = document.getElementById(
            "n-api-token-add-close"
          );
          const apiTokenAddOverlayOpen = document.getElementById(
            "n-api-token-set-btn"
          );

          apiTokenAddOverlayClose.addEventListener("click", () => {
            apiTokenAddOverlay.style.display = "none";
          });

          apiTokenAddOverlayOpen.addEventListener("click", () => {
            apiTokenAddOverlay.style.display = "flex";
          });

          const apiTokenInput = document.getElementById("n-api-token-input");
          const apiTokenScopes = {
            read: document.getElementById("n-api-token-scope-read"),
            promotion: document.getElementById("n-api-token-scope-promotion"),
            analytics: document.getElementById("n-api-token-scope-analytics"),
          };

          apiTokenInput.addEventListener("input", () => {
            try {
              const value = apiTokenInput.value;
              if (value === "") {
                apiTokenScopes.promotion.style.background = null;
                apiTokenScopes.promotion.parentElement.style.color = null;
                apiTokenScopes.analytics.style.background = null;
                apiTokenScopes.analytics.parentElement.style.color = null;
                apiTokenScopes.read.style.background = null;
                apiTokenScopes.read.parentElement.style.color = null;
                return;
              }
              const decoded = jwtDecode?.(value) || false;
              const needleScopes = {
                read: false,
                promotion: false,
                analytics: false,
              };
              const sid = decoded?.sid;
              const scope = decoded?.s;
              if ((scope >> 6) % 2 != 0) {
                apiTokenScopes.promotion.style.background = "#15ffab80";
                apiTokenScopes.promotion.parentElement.style.color = "#15ffab";
                needleScopes.promotion = true;
              } else {
                apiTokenScopes.promotion.style.background = "#db303180";
                apiTokenScopes.promotion.parentElement.style.color = "#db3031";
                needleScopes.promotion = false;
              }

              if ((scope >> 2) % 2 != 0) {
                apiTokenScopes.analytics.style.background = "#15ffab80";
                apiTokenScopes.analytics.parentElement.style.color = "#15ffab";
                needleScopes.analytics = true;
              } else {
                apiTokenScopes.analytics.style.background = "#db303180";
                apiTokenScopes.analytics.parentElement.style.color = "#db3031";
                needleScopes.analytics = false;
              }

              if ((scope >> 30) % 2 != 0) {
                apiTokenScopes.read.style.background = "#15ffab80";
                apiTokenScopes.read.parentElement.style.color = "#15ffab";
                needleScopes.read = true;
              } else {
                apiTokenScopes.read.style.background = "#db303180";
                apiTokenScopes.read.parentElement.style.color = "#db3031";
                needleScopes.read = false;
              }

              const allScopesTrue = Object.values(needleScopes).every(
                (scope) => scope === true
              );
              if (allScopesTrue) {
                apiTokenSaveBtn.disabled = false;
              }
            } catch (e) {
              apiTokenScopes.promotion.style.background = "#db303180";
              apiTokenScopes.promotion.parentElement.style.color = "#db3031";
              apiTokenScopes.analytics.style.background = "#db303180";
              apiTokenScopes.analytics.parentElement.style.color = "#db3031";
              apiTokenScopes.read.style.background = "#db303180";
              apiTokenScopes.read.parentElement.style.color = "#db3031";
              apiTokenSaveBtn.disabled = true;
            }
          });

          apiTokenSaveBtn.addEventListener("click", async () => {
            const ApiToken = apiTokenInput.value;
            const sid = jwtDecode(ApiToken)?.sid;
            if (apiTokenSaveBtn.disabled || ApiToken === "") return;
            apiTokenSaveBtn.innerHTML = checkLoader;
            const checkTokenResult = await window.helpEngine.checkApiToken(
              ApiToken
            );
            const supplierExternalId = getCookie("x-supplier-id-external");
            const supplierIdMatch = sid === supplierExternalId;
            if (!checkTokenResult || !supplierIdMatch) {
              apiTokenSaveBtn.innerText = "Сохранить";
              Toastify({
                text: "❌ Введен невалидный API Токен либо он принадлежит другому поставщику. Повторите попытку с новым API Токеном.",
                duration: 8000,
                newWindow: true,
                gravity: "bottom", // `top` or `bottom`
                position: "center", // `left`, `center` or `right`
                style: {
                  background: "linear-gradient(to right, #162033, #253144)",
                  fontSize: "0.8em",
                  maxWidth: "300px",
                  borderRadius: "10px",
                  border: "1px solid #334155",
                  boxShadow: "0",
                },
                offset: {
                  y: 200,
                },
              }).showToast();
              return;
            }

            window.helpEngine.ApiToken = ApiToken;

            const existsTokens = JSON.parse(
              localStorage.getItem("neuromarket-api-token") || "{}"
            );

            localStorage.setItem(
              "neuromarket-api-token",
              JSON.stringify({
                ...existsTokens,
                [window.helpEngine.supplierId]: ApiToken,
              })
            );

            apiTokenLayout.style.display = "none";
            apiTokenAddOverlay.style.display = "none";

            Toastify({
              text: "✅ API Токен сохранён внутри локального хранилища вашего браузера. Страница будет Автоматически перезагружена через 5 секунд.",
              duration: 5000,
              newWindow: true,
              gravity: "bottom", // `top` or `bottom`
              position: "center", // `left`, `center` or `right`
              style: {
                background: "linear-gradient(to right, #162033, #253144)",
                fontSize: "0.8em",
                maxWidth: "300px",
                borderRadius: "10px",
                border: "1px solid #334155",
                boxShadow: "0",
              },
              offset: {
                y: 200,
              },
            }).showToast();

            setTimeout(() => {
              location.reload();
            }, 5000);
          });

          const createTokenBtn = document.getElementById(
            "n-create-api-token-btn"
          );

          createTokenBtn.addEventListener("click", async () => {
            try {
              const simulateErrorTimeout = setTimeout(() => {
                createTokenBtn.innerText = "Создать Автоматически";
                Toastify({
                  text: "❌ Не удалось создать API Токен автоматически. Возможно недостаточно прав у пользователя. Обратитесь к Владельцу кабинета либо попробуйте ввести API токен вручную.",
                  duration: 5000,
                  newWindow: true,
                  gravity: "bottom", // `top` or `bottom`
                  position: "center", // `left`, `center` or `right`
                  style: {
                    background: "linear-gradient(to right, #162033, #253144)",
                    fontSize: "0.8em",
                    maxWidth: "300px",
                    borderRadius: "10px",
                    border: "1px solid #334155",
                    boxShadow: "0",
                  },
                  offset: {
                    y: 200,
                  },
                }).showToast();
              }, 3000);
              createTokenBtn.innerHTML = checkLoader;
              const token = await window.helpEngine.createApiToken();
              clearTimeout(simulateErrorTimeout);

              window.helpEngine.ApiToken = token;

              const existsTokens = JSON.parse(
                localStorage.getItem("neuromarket-api-token") || "{}"
              );

              localStorage.setItem(
                "neuromarket-api-token",
                JSON.stringify({
                  ...existsTokens,
                  [window.helpEngine.supplierId]: token,
                })
              );

              Toastify({
                text: "✅ API Токен создан и сохранён внутри локального хранилища вашего браузера. Страница будет автоматически перезагружена через 5 секунд.",
                duration: 5000,
                newWindow: true,
                gravity: "bottom", // `top` or `bottom`
                position: "center", // `left`, `center` or `right`
                style: {
                  background: "linear-gradient(to right, #162033, #253144)",
                  fontSize: "0.8em",
                  maxWidth: "300px",
                  borderRadius: "10px",
                  border: "1px solid #334155",
                  boxShadow: "0",
                },
                offset: {
                  y: 200,
                },
              }).showToast();

              document.getElementById("n-api-token-layout").style.display =
                "none";

              setTimeout(() => {
                location.reload();
              }, 5000);
            } catch (e) {
              createTokenBtn.innerText = "Создать Автоматически";
              Toastify({
                text: "❌ Не удалось создать API Токен автоматически. Возможно недостаточно прав у пользователя. Обратитесь к Владельцу кабинета либо попробуйте ввести API токен вручную.",
                duration: 5000,
                newWindow: true,
                gravity: "bottom", // `top` or `bottom`
                position: "center", // `left`, `center` or `right`
                style: {
                  background: "linear-gradient(to right, #162033, #253144)",
                  fontSize: "0.8em",
                  maxWidth: "300px",
                  borderRadius: "10px",
                  border: "1px solid #334155",
                  boxShadow: "0",
                },
                offset: {
                  y: 200,
                },
              }).showToast();
            }
          });
        } else {
          window.helpEngine.ApiToken = ApiToken;
          enchanceButtonText.innerText = "Подключен API";
        }
      }
    }

    if (!window.location.href.includes("/campaigns/edit/")) return;

    const adData =
      GetSeacatCampaignElement() ||
      GetAutoCampaignElement() ||
      GetSearchCampaignElement() ||
      [];


    if (adData.length === 0) return;
    const [adType, adElement] = adData;
    window.__NEUROMARKET_AD_TYPE = adType;

    if (adElement !== null) {
      if (!injected) {
        campaignId = new URL(window.location.href).pathname.split("/")[3];
        addNeuromarketEngine(adElement);
        window.__NEUROMARKET_LOCATION_INJECTED__ = window.location.href;
        injected = true;
        return;
      }

      const newCampaignId =
        new URL(window.location.href).pathname.split("/")[3] || null;
      if (newCampaignId === null) {
        injected = false;
        window.__NEUROMARKET_LOCATION_INJECTED__ = false;
        campaignId = null;
        return;
      }

      if (newCampaignId !== campaignId) {
        campaignId = newCampaignId;
        addNeuromarketEngine(adElement);
        window.__NEUROMARKET_LOCATION_INJECTED__ = window.location.href;
        return;
      }
    } else {
      injected = false;
      window.__NEUROMARKET_LOCATION_INJECTED__ = false;
      campaignId = null;
    }
  }
  const observer = new MutationObserver(observeFunction);

  const addNeuromarketEngine = async (element) => {

    const nodeCollapsed = document.createElement("div");
    nodeCollapsed.setAttribute("translate", "no");
    const node = document.createElement("div");
    node.setAttribute("translate", "no");
    nodeCollapsed.className = "n-main-collapsed-window";
    nodeCollapsed.innerHTML += `
    <div style="display: flex; position:relative; justify-content: space-between">
      <div style="display:flex;">
        <div style="display: flex; position:relative;">
          <img height="24" style="margin: 0px 0 0 0; padding-right: 2px; height: 24px;" src="https://cdn.neuromarket.online/images/logo_symbol.png" />
          <img height="16" style="margin: 2px 0 0 0; height:16px" src="https://cdn.neuromarket.online/images/logo.png" />
          <span style="margin-left: 4px;"> — Профессиональные инструменты</span>
          <span style="margin-left: 4px; padding:2px 4px 2px 4px; border:1px solid #2563ebAA; box-sizing: border-box; border-radius: 6px; font-size:10px; color: #2563ebeb; margin-top: 2px; height:20px;">v${VERSION}</span>
          ${!UPDATE_MESSAGE_READ
        ? ` <div class="update-message" id="n-update-message">
                    <span>🎉 Расширение Обновилось!</span>
                    <a id="n-update-read" target="_blank" href="https://docs.neuromarket.online/extension/updates/ads">
                      Узнайте что нового →
                    </a>
                    <span class="n-update-close" id="n-update-close">+</span>
                  </div>`
        : ""
      }
          <span style="margin-left: 4px; padding:2px 4px 2px 4px; border:1px solid #fd01feb3; box-sizing: border-box; border-radius: 6px; font-size:10px; color: #fd01feb3; margin-top: 2px; height:20px;">
          ${window.__NEUROMARKET_AD_TYPE === "AUTO" ? "АРК" : ""}
          ${window.__NEUROMARKET_AD_TYPE === "SEARCH" ? "🚀Поиск" : ""}
          ${window.__NEUROMARKET_AD_TYPE === "SEACAT" ? "🚀Аукцион" : ""}
          </span>
        </div>
      </div>
      <div style="display:flex;">
        <button type="button" id="n-expand-btn" class="n-expand-button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="n-arrow-btn"><path fill-rule="evenodd" d="M11 18.586V3h2v15.586l6.293-6.293 1.414 1.414L12 22.414l-8.707-8.707 1.414-1.414L11 18.586Z" clip-rule="evenodd"></path></svg></button>
      </div>
    </div>`;

    node.className = "n-main-window sentry-block notranslate";
    node.style.display = "none";
    node.style.position = "relative";
    node.innerHTML += `
  <div class="n-overlay-blured" id="n-overlay-blured">
        <div class="n-modal">
          <div style="display:flex;flex-direction:column;padding:12px 12px 0 12px;">
            <p style="padding-bottom:8px; font-size: 1.1em;"><strong>Создать 🚀Аукцион?</strong></p>
            <p>При нажатии на кнопку "Создать" будут выполнены следующие действия:</p>
            <ul class="n-modal-ul">
              <li class="n-modal-li">Автоматически будет создана новая Рекламная Кампания типа "Аукцион" с товаром <span id="n-modal-nm"></span></li>
              <li class="n-modal-li">Минус-Фразы из текущей АРК перенесутся в новую РК</li>
              <li class="n-modal-li">Автоматически откроется вкладка с новой РК</li>
            </ul>
            <p style="padding: 8px; background: rgba(127,29,29,.3); border:1px solid hsla(0,96%,89%,.3); border-radius: .5rem; color:rgb(254, 202, 202);">Если браузер заблокирует всплывающее окно, новую РК найдете в списке кампаний</p>
          </div>
          <div style="display:flex;flex-direction:column;padding:12px;">
            <p><strong>От Вас потребуется:</strong></p>
            <ul class="n-modal-ul">
              <li class="n-modal-li">Пополнить бюджет новой РК</li>
              <li class="n-modal-li">Запустить новую РК</li>
            </ul>
          </div>
          <div class="n-modal-btns">
            <button class="n-btn" id="n-modal-btn-green">Создать 🚀Аукцион</button>
            <button class="n-btn" id="n-modal-cancel" style="color: rgb(203, 213, 225);">Отменить</button>
          </div>
        </div>
  </div>
  
  <div class="n-tariffs-overlay-blured" id="n-tariffs-overlay">
    <div style="position: sticky; top: 48px; width: 100%; padding: 24px; height: fit-content;">
      <div style="display:flex; background: #0f172a; border:1px solid #ffffff1a; gap: 12px; border-radius:12px; padding:12px;">
      <span class="n-tariffs-close" id="n-tariffs-close">+</span>
        <div style="position: relative; display: flex; flex:1; flex-direction: column; gap: 8px; border-radius: 9px; padding: 12px; background: #162033; overflow: hidden;">
        <img style="position: absolute; bottom:0; right: 0; pointer-events: none;" src="https://cdn.neuromarket.online/images/star.png" />
          <div style="display:flex; flex-direction: column;">
            <span class="n-tariffs-options-static-name">ТАРИФ</span>
            <span class="n-tariffs-options-name">Первый</span>
          </div>
          <div class="n-tariffs-options-description" style="width: 400px;">
            Первый и пока единственный тариф, который предоставляет полный доступ ко всем возможностям расширения
          </div>
          <div style="margin-top: 24px;">Неограниченное количество:</div>
          <ul class="n-tariffs-options-list">
            <li>
              <svg fill="#ffffffAA" width="20" height="20" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg">
                <path d="M252,128a59.99981,59.99981,0,0,1-102.42627,42.42627q-.25709-.25708-.49805-.5293L89.21533,102.30615a36,36,0,1,0,0,51.3877L92.30078,150.21a12,12,0,0,1,17.9668,15.91211l-3.34326,3.7749q-.241.27173-.498.5293a60,60,0,1,1,0-84.85254q.25709.25709.498.5293l59.86035,67.59082a36,36,0,1,0,0-51.3877L163.69922,105.79a12,12,0,0,1-17.9668-15.91211l3.34326-3.7749q.241-.27174.49805-.5293A60,60,0,0,1,252,128Z"/>
              </svg>
              <span>Рекламных Кампаний</span>
            </li>
            <li>
              <svg fill="#ffffffAA" width="20" height="20" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg">
                <path d="M252,128a59.99981,59.99981,0,0,1-102.42627,42.42627q-.25709-.25708-.49805-.5293L89.21533,102.30615a36,36,0,1,0,0,51.3877L92.30078,150.21a12,12,0,0,1,17.9668,15.91211l-3.34326,3.7749q-.241.27173-.498.5293a60,60,0,1,1,0-84.85254q.25709.25709.498.5293l59.86035,67.59082a36,36,0,1,0,0-51.3877L163.69922,105.79a12,12,0,0,1-17.9668-15.91211l3.34326-3.7749q.241-.27174.49805-.5293A60,60,0,0,1,252,128Z"/>
              </svg>
              <span>Устройств</span>
            </li>
            <li>
              <svg fill="#ffffffAA" width="20" height="20" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg">
                <path d="M252,128a59.99981,59.99981,0,0,1-102.42627,42.42627q-.25709-.25708-.49805-.5293L89.21533,102.30615a36,36,0,1,0,0,51.3877L92.30078,150.21a12,12,0,0,1,17.9668,15.91211l-3.34326,3.7749q-.241.27173-.498.5293a60,60,0,1,1,0-84.85254q.25709.25709.498.5293l59.86035,67.59082a36,36,0,1,0,0-51.3877L163.69922,105.79a12,12,0,0,1-17.9668-15.91211l3.34326-3.7749q.241-.27174.49805-.5293A60,60,0,0,1,252,128Z"/>
              </svg>
              <span>Браузеров</span>
            </li>
            <li>
              <svg fill="#ffffffAA" width="20" height="20" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg">
                <path d="M252,128a59.99981,59.99981,0,0,1-102.42627,42.42627q-.25709-.25708-.49805-.5293L89.21533,102.30615a36,36,0,1,0,0,51.3877L92.30078,150.21a12,12,0,0,1,17.9668,15.91211l-3.34326,3.7749q-.241.27173-.498.5293a60,60,0,1,1,0-84.85254q.25709.25709.498.5293l59.86035,67.59082a36,36,0,1,0,0-51.3877L163.69922,105.79a12,12,0,0,1-17.9668-15.91211l3.34326-3.7749q.241-.27174.49805-.5293A60,60,0,0,1,252,128Z"/>
              </svg>
              <span>Кабинетов Поставщиков</span>
            </li>
          </ul>
          <div style="display:flex; flex-direction: column; margin-top: 24px;">
            <div style="width: 430px;">
              <span class="n-wtf" style="font-size: 0.7em">i</span>
              <span style="font-size: 0.85em; opacity: 0.5; font-weight: 400;">Тариф прикрепляется к вашему аккаунту (к номеру телефона) под которым вы авторизованы в данный момент на ВБ.Партнёры</span>
            </div>
            <div style="margin-top: 4px;">
              <span class="n-wtf" style="font-size: 0.7em">i</span>
              <span style="font-size: 0.85em; opacity: 0.5; font-weight: 400;">Оплаченные дни добавляются к текущему остатку дней</span>
            </div>
          </div>
        </div>
        <div style="display:flex; flex-direction: column; gap: 8px; justify-content:space-between; width: 400px;">
          <div style="display:flex; flex-direction: column; gap: 8px;">
            <span>Выберите количество месяцев</span>
            <div class="n-tariffs-months-btn n-tariffs-months-btn-active" id="n-tariffs-months-btn" data-tariff-id="1">
              <div class="n-main-chart-selector-item-inside-title">1 месяц</div>
              <div class="n-tariffs-months-btn-inside-price">1 690₽<span style="opacity: 0.6; font-size: 0.6em">/мес.</span></div>
            </div>
            <div class="n-tariffs-months-btn" id="n-tariffs-months-btn" data-tariff-id="2">
              <div class="n-main-chart-selector-item-inside-title">3 месяца <sup>-5%</sup></div>
              <div class="n-tariffs-months-btn-inside-price">1 606₽<span style="opacity: 0.6; font-size: 0.6em">/мес.</span></div>
            </div>
            <div class="n-tariffs-months-btn" id="n-tariffs-months-btn" data-tariff-id="3">
              <div class="n-main-chart-selector-item-inside-title">6 месяцев <sup>-10%</sup></div>
              <div class="n-tariffs-months-btn-inside-price">1 521₽<span style="opacity: 0.6; font-size: 0.6em">/мес.</span></div>
            </div>
            <div class="n-tariffs-months-btn" id="n-tariffs-months-btn" data-tariff-id="4">
              <div class="n-main-chart-selector-item-inside-title">12 месяцев <sup>-20%</sup></div>
              <div class="n-tariffs-months-btn-inside-price">1 352₽<span style="opacity: 0.6; font-size: 0.6em">/мес.</span></div>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="display: flex; gap: 4px; width: 100%; justify-content: flex-end; display: none;" id="n-tariffs-promocode-input-wrap">
            <input class="n-tariffs-promocode-input" placeholder="Введите промокод" id="n-tariffs-promocode-input" type="text"/>
            <div class="n-nav-btn" id="n-tariffs-promocode-activate-btn">Активировать</div>
            <div class="n-nav-btn" id="n-tariffs-promocode-close-btn">Закрыть</div>
          </div>
          <div style="display: flex; gap: 4px; width: 100%; justify-content: flex-end; display: none;" id="n-tariffs-promocode-activated-wrap">
            <span class="n-tariffs-promocode-activated-text" id="n-tariffs-promocode-activated-text"></span>
          </div>
          <div style="display: flex; gap: 4px; width: 100%; justify-content: flex-end;" id="n-tariffs-have-promocode-wrap">
            <span class="n-tariffs-have-promocode" id="n-tariffs-have-promocode">У меня есть Промокод</span>
          </div>
          <div class="n-tarrifs-price-liner"></div>
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <div class="n-tariffs-pay-item">
                <div class="n-tariffs-pay-desc"><span style="color: #fff;">Тариф</span></div>
                <div class="n-tariffs-pay-price">Первый <span id="n-tariffs-pay-days">30</span> <span>дней</span></div>
              </div>
              <div style="display: none;" class="n-tariffs-pay-item" id="n-tariffs-pay-discount-wrap">
                <div class="n-tariffs-pay-desc"><span style="color: #fff;">Промо-Скидка</span></div>
                <div class="n-tariffs-pay-price"><span id="n-tariffs-pay-discount-text"></span><span>%</span></div>
              </div>
              <div class="n-tariffs-pay-item">
                <div class="n-tariffs-pay-desc"><span style="color: #fff;">К Оплате</span></div>
                <div class="n-tariffs-pay-price"><span id="n-tariffs-pay-price">1690</span><span>₽</span></div>
              </div>
            </div>
            <div class="n-nav-btn n-nav-btn-pay" id="n-tariff-pay-btn">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
              </svg>
              Оплатить
            </div>
            <div class="n-legal-message"><input id="n-legal-checkbox" style="margin:0; appearance: auto;" type="checkbox" checked="true"/> Прочитал и Согласен с <a class="" href="https://neuromarket.online/legal" target="_blank">Пользовательским Соглашением</a></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="n-logs-overlay-blured" id="n-logs-overlay">
        <div class="n-logs-modal" id="n-logs-modal">
          <span class="n-logs-close" id="n-logs-close">+</span>
          <div style="display: flex; align-items: center; gap: 4px;">
            История действий в Рекламной Кампании 
            <span class="n-wtf" style="font-size: 0.7em;" data-tip="Мы сохраняем все действия, которые проводились внутри рекламной кампании через наше расширение. Действия совершенные не через расширения логироваться не будут.">?</span>
          </div>
          <div class="n-nav-buttons">
              <div style="display:flex;">
              <button class="n-tools-button" style="height:42px; font-size: 0.8em; padding-inline: 2px; background: hsl(217 33% 21% / 1);" id="n-logs-add-notes-btn">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
              <button class="n-tools-button" style="height:42px; font-size: 0.8em;" id="n-logs-filters-btn" data-type="note">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
                  Заметки
              </button>
              </div>
            <button class="n-tools-button" style="height:42px; font-size: 0.8em;" id="n-logs-filters-btn" data-type="phrase">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
              </svg>
              Ключевые фразы
            </button>
            <button class="n-tools-button" style="height:42px; font-size: 0.8em;" id="n-logs-filters-btn" data-type="fix">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
              Режим фикс
            </button>
            <button class="n-tools-button" style="height:42px; font-size: 0.8em;" id="n-logs-filters-btn" data-type="status">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
              </svg>
              Статус
            </button>
          </div>
          <div id="n-add-logs-wrap" class="n-add-logs-wrap">
            <div class="n-add-logs-text" id="n-add-logs-text" data-ph="Введите текст заметки" contenteditable="plaintext-only"></div>
            <button class="n-logs-note-send-btn" id="n-logs-note-send-btn">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
              </svg>
            </button>
          </div>
          
          <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 12px;" id="n-logs-items">
            
          </div>
        </div>
  </div>
    <div style="display: flex; position:relative; justify-content: space-between">
      <div style="display:flex;">
        <img height="24" style="margin: 0px 0 0 0; padding-right: 2px; height: 24px;" src="https://cdn.neuromarket.online/images/logo_symbol.png" />
        <img height="16" style="margin: 2px 0 0 0; height: 16px;" src="https://cdn.neuromarket.online/images/logo.png" />
          <span style="margin-left: 4px;"> — Профессиональные инструменты</span>
          <span style="margin-left: 4px; padding:2px 4px 2px 4px; border:1px solid #2563ebAA; box-sizing: border-box; border-radius: 6px; font-size:10px; color: #2563ebeb; margin-top: 2px; height:20px;">v${VERSION}</span>
          ${!UPDATE_MESSAGE_READ
        ? ` <div class="update-message" id="n-update-message">
                    <span>🎉 Расширение Обновилось!</span>
                    <a id="n-update-read" target="_blank" href="https://docs.neuromarket.online/extension/updates/ads">
                      Узнайте что нового →
                    </a>
                    <span class="n-update-close" id="n-update-close">+</span>
                  </div>`
        : ""
      }
          <span style="margin-left: 4px; padding:2px 4px 2px 4px; border:1px solid #fd01feb3; box-sizing: border-box; border-radius: 6px; font-size:10px; color: #fd01feb3; margin-top: 2px; height:20px;">
          ${window.__NEUROMARKET_AD_TYPE === "AUTO" ? "АРК" : ""}
          ${window.__NEUROMARKET_AD_TYPE === "SEARCH" ? "🚀Поиск" : ""}
          ${window.__NEUROMARKET_AD_TYPE === "SEACAT" ? "🚀Аукцион" : ""}
          </span>
      </div>
      <div style="display:flex; gap: 8px;">
        <a id="n-set-pro-version" class="n-nav-btn" style="display:flex; height:22px; padding:0; padding-inline: 4px; gap:0px; display: flex; border-radius: 4px;">
          <svg  style="height: 16px; width:16px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
          </svg>
          <span>Новая PRO версия</span>
        </a>
        <div class="n-user-id-badge" id="n-user-id-badge">
          <div class="n-user-id-show-btn" id="n-user-id-show-btn">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          </div>
          <div id="n-user-id-value"></div>
        </div>
        <button class="n-user-tariff-badge" id="n-user-tariff-badge">
          <div id="n-user-tariff-name"></div>
          <div id="n-user-tariff-days"></div>
        </button>
        <button type="button" id="n-collapse-btn" class="n-expand-button n-flip"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="n-arrow-btn"><path fill-rule="evenodd" d="M11 18.586V3h2v15.586l6.293-6.293 1.414 1.414L12 22.414l-8.707-8.707 1.414-1.414L11 18.586Z" clip-rule="evenodd"></path></svg></button>
      </div>
    </div>`;

    node.innerHTML += `
    <div style="display:flex; justify-content: space-between; align-items: center;">
      <div class="n-nav-buttons" style="position: relative;">
      <div id="n-tg-read" style="display: none;width:310px;z-index:1000; flex-direction: column; gap: 4px; font-size:0.85em;position: absolute;background: #162033AA;backdrop-filter: blur(6px);padding: 12px;top: 50px;left: 50px;border-radius: 8px;border: 1px solid #ffffff1a;">
        <svg style="position: absolute;width: 50px;fill: white;bottom: 65px;transform: scaleY(-1);left: -38px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
          <path style="line-height:normal;text-indent:0;text-align:start;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000;text-transform:none;block-progression:tb;isolation:auto;mix-blend-mode:normal" d="M 12.886719 2 C 7.9854386 2 4 5.9854386 4 10.886719 L 4 12.025391 L 1.7285156 9.7539062 L 1.0214844 10.460938 L 4.5 13.939453 L 7.9785156 10.460938 L 7.2714844 9.7539062 L 5 12.025391 L 5 10.886719 C 5 6.5259985 8.5259985 3 12.886719 3 L 14 3 L 14 2 L 12.886719 2 z M 4.4746094 12.5 L 4.5253906 12.5 L 4.5 12.525391 L 4.4746094 12.5 z" font-weight="400" font-family="sans-serif" white-space="normal" overflow="visible"/>
        </svg>
        <div style="font-weight: 700;">Wildberries в последнее время делает очень много изменений в рекламном кабинете.</div>
        <div>Чтобы не потерять доступ к расширению, советуем подписаться на наш <a href="https://t.me/+e9f9faUTfZ9kNDYy" class="n-tg-link" target="_blank">канал в Телеграм</a></div>  
        <span class="n-update-close" id="n-tg-close">+</span>
      </div>
      <a class="n-nav-tg-btn" target="_blank" href="https://t.me/+e9f9faUTfZ9kNDYy">Новости</a>
      <a class="n-nav-tg-btn" target="_blank" href="https://t.me/neuromarket_chat">Чат</a>
      <a class="n-nav-btn" target="_blank" href="https://docs.neuromarket.online/extension/campaigns">Инструкция</a>

      <div style="display: flex; position: relative;">
      <button class="n-nav-btn" id="n-tag-btn">Установить тег</button>
        
        <div id="n-tag-selector" style="width:max-content; display: none; flex-direction:row; position: absolute; left: 0; margin-top: 40px; z-index: 10; background-color: #334155; border: 1px solid #ffffff20; font-size: 0.9em; font-weight: 300;">
          <div style="display:flex; flex-direction:column;">
            <div class="n-tools-select" id="n-tag-select" data-tag="🟢">
                🟢 Обработано
            </div>
            <div class="n-tools-select" id="n-tag-select" data-tag="🟡">
                🟡 В работе
            </div>
            <div class="n-tools-select" id="n-tag-select" data-tag="🔴">
                🔴 Проблема
            </div>
            <div class="n-tools-select" id="n-tag-select" data-tag="🔵">
                🔵 Другое
            </div>
          </div>
            <div style="display:flex; flex-direction:column; border-left: 1px solid #ffffff1a;">
              <div class="n-tools-select-square" id="n-tag-select" data-tag="⛔️">⛔️</div>
              <div class="n-tools-select-square" id="n-tag-select" data-tag="❓">❓</div>
              <div class="n-tools-select-square" id="n-tag-select" data-tag="❗">❗</div>
              <div class="n-tools-select-square" id="n-tag-select" data-tag="❌">❌</div>
            </div>
            <div style="display:flex; flex-direction:column; border-left: 1px solid #ffffff1a;">
              <div class="n-tools-select-square" id="n-tag-select" data-tag="✅">✅</div>
              <div class="n-tools-select-square" id="n-tag-select" data-tag="👌">👌</div>
              <div class="n-tools-select-square" id="n-tag-select" data-tag="🚀">🚀</div>
              <div class="n-tools-select-square" id="n-tag-select" data-tag="⚠️">⚠️</div>
            </div>
        </div>
      </div>
      <button class="n-nav-btn" id="n-create-search-campaign-btn">Создать 🚀Аукцион</button>
      <button class="n-nav-btn" id="n-logs-open-btn" style="display:none">История</button>

      <div style="display:flex; position: relative; margin-left:20px;">
        <a class="n-nav-btn" style="display:flex; height:37px; padding:0; padding-inline: 8px; gap:4px; display: flex;gap: 4px; border-radius: 6px;" target="_blank" href="https://vk.com/video-226770714_456239042">
          <img style="height: 16px; width:16px; opacity: 0.75; border-radius: 4px;" src="https://cdn.neuromarket.online/vk_video.png"/>
          <span>Видео-Инструкция</span>
        </a>
      </div>
      <div style="display: none; position: relative; margin-left:20px;">
        <a class="n-nav-btn" id="n-ad-btn" style="display:flex; padding:0; padding-inline: 8px; display: flex; border-radius: 6px;" target="_blank" href="https://t.me/lavka_dobbi_seller_bot?utm_source=neuromarket&utm_campaign=cmp">
          <svg style="width:25px; height:25px;" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.58 4.77604C12.2747 3.00516 12.6221 2.11971 13.3486 2.01056C14.075 1.90141 14.6994 2.64083 15.9483 4.11967L16.2714 4.50226C16.6263 4.9225 16.8037 5.13263 17.045 5.25261C17.2863 5.37259 17.564 5.38884 18.1196 5.42135L18.6254 5.45095C20.5803 5.56537 21.5578 5.62258 21.897 6.26168C22.2362 6.90079 21.7125 7.69853 20.6651 9.29403L20.3941 9.7068C20.0965 10.1602 19.9477 10.3869 19.9075 10.6457C19.8673 10.9045 19.9402 11.1662 20.0862 11.6895L20.219 12.166C20.7325 14.0076 20.9893 14.9284 20.4725 15.4325C19.9557 15.9367 19.0076 15.6903 17.1114 15.1975L16.6208 15.07C16.082 14.93 15.8125 14.86 15.5464 14.8999C15.2803 14.9399 15.0476 15.0854 14.5823 15.3763L14.1586 15.6412C12.521 16.6649 11.7022 17.1768 11.0436 16.8493C10.385 16.5217 10.3227 15.5717 10.1982 13.6717L10.166 13.1801C10.1306 12.6402 10.1129 12.3702 9.98865 12.1361C9.86439 11.902 9.64763 11.7302 9.2141 11.3867L8.81941 11.0739C7.2938 9.86506 6.531 9.26062 6.64075 8.55405C6.75051 7.84748 7.66013 7.50672 9.47939 6.8252L9.95005 6.64888C10.467 6.45522 10.7255 6.35839 10.9148 6.17371C11.1041 5.98903 11.2029 5.73742 11.4003 5.23419L11.58 4.77604Z" fill="#EF4444"/>
            <path d="M5.31003 9.59277C2.87292 11.9213 1.27501 15.8058 2.33125 22.0002C3.27403 19.3966 5.85726 17.2407 8.91219 15.9528C8.80559 15.3601 8.7583 14.6364 8.70844 13.8733L8.66945 13.2782C8.66038 13.1397 8.65346 13.0347 8.64607 12.9443C8.643 12.9068 8.64012 12.8754 8.63743 12.8489C8.61421 12.829 8.58591 12.8053 8.55117 12.7769C8.47874 12.7177 8.39377 12.6503 8.28278 12.5623L7.80759 12.1858C7.11448 11.6368 6.46884 11.1254 6.02493 10.6538C5.77182 10.385 5.48876 10.0304 5.31003 9.59277Z" fill="#B91C1C"/>
            <path d="M10.3466 15.4231C10.3415 15.3857 10.3365 15.3475 10.3316 15.3086L10.3877 15.41C10.374 15.4144 10.3603 15.4187 10.3466 15.4231Z" fill="#B91C1C"/>
          </svg>
          <span>Выйти в ТОП</span>
        </a>
        <div style="position: absolute; box-sizing: border-box; gap: 2px; width: 505px; z-index: 100; top: 44px; right:0; background: #253144;display: none;border: 1px solid #ffffff1a;border-radius: 6px;" id="n-ad-description">
          <div style="position: absolute; opacity: 0.7; font-size: 0.55em; top:0; right: 0; background:#334155; border-bottom-left-radius: 5px; padding: 2px;">Реклама: Лавка Добби</div>
          <div style="height:266px; width:245px; overflow:hidden; border-top-left-radius:6px; border-bottom-left-radius:6px;">
            <img
              style="height:100%; aspect-ratio:9/16; background:linear-gradient(180deg, #fff 0%, #fd01fe61 50%); overflow: hidden;"
              src="https://cdn.neuromarket.online/ad/lavka2.png"
            />
          </div>
          <div style="padding:8px; display:flex; flex-direction: column; justify-content: space-between;">
            <div style="display:flex; gap:8px; font-size: 1.0em; align-items:center;">
              <!--img style="height: 22px;box-sizing: content-box; padding: 2px; border-radius: 3px;" src="https://cdn.neuromarket.online/ad/wow.svg"/-->
              <span><b>НОВЕЙШИЙ СЕРВИС РАЗДАЧ</b></span>
            </div>
            <div style="display:flex; flex-direction:column;">
              <span style="font-size: 0.9em; opacity: 0.8;">Получайте реальные отзывы от покупателей быстро и без лишних затрат!</span>
            </div>
           <div style="display:flex; flex-direction: column; gap: 8px; margin-top:8px;">
            <div style="display:flex; gap: 6px; align-items:center;">
              <svg style="width: 18px; min-width:18px; box-sizing: content-box; padding: 4px; background: #CC8A1F; border: 1px solid #F4AD21; border-radius: 8px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
              </svg>
              <span style="line-height: 1.1em; font-size: 0.95em;">Без личных переписок с покупателями</span>
            </div>
            <div style="display: flex; gap: 8px; align-items:center;">
              <div style="display:flex; gap: 6px; align-items:center;">
                <svg style="width: 18px; min-width:18px; box-sizing: content-box; padding: 4px; background: #CC8A1F; border: 1px solid #F4AD21; border-radius: 8px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" />
                </svg>
                <span>Никаких таблиц</span>
              </div>
              <div style="display:flex; gap: 6px; align-items:center;">
                <svg style="width: 18px; min-width:18px; box-sizing: content-box; padding: 4px; background: #CC8A1F; border: 1px solid #F4AD21; border-radius: 8px;"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                </svg>
                <span>Бесплатно</span>
              </div>
            </div>
           </div>
           <div style="display:flex; flex-direction:column;">
            <span style="margin-top:8px; font-size: 0.9em; opacity: 0.8;">Ваш товар заслуживает быть на первом месте 🚀</span>
           </div>
           <div style="display:flex; flex-direction:column;">
            <span style="margin-top:4px; font-size: 0.9em;">Создайте свою первую раздачу прямо сейчас и получите результат уже сегодня!</span>
           </div>
           <div style="display: flex; gap: 8px; width: 100%;">
            <a class="n-nav-btn n-nav-btn-wow" id="n-ad-inside-first-btn" style="margin-top:10px; flex:1;" href="https://t.me/lavka_dobbi_seller_bot?utm_source=neuromarket&utm_campaign=cmp" target="_blank">Создать Раздачу</a>
            <a class="n-nav-btn n-nav-btn-wow-tg" id="n-ad-inside-second-btn" style="margin-top:10px; width: 130px;" href="https://t.me/sellers_lavka_dobbi?utm_source=neuromarket&utm_campaign=cmp" target="_blank">Наш Телеграм</a>
           </div>
          </div>
        </div>
      </div>
      </div>
      <div class="n-loader" style="margin-top:16px; color: #94a3b8; font-size:0.8em" id="n-top-loader"></div>
    </div>
    `;

    node.innerHTML += `
  <div class="n-info" style="margin-top:18px;gap:8px; height:30px;">
    <div class="n-info-badge">
      <span>Статус</span> 
      <div class="n-ad-status-green" id="n-ad-status">
        <span class="n-ad-status-circle-green" id="n-ad-status-circle"></span>
        <span id="n-ad-status-text">Не определено</span>
      </div>
    </div>
    <div class="n-info-badge" id="n-ad-info-fixed" style="padding: 0 !important; display:none;">
      <div class="n-ad-status-green" style="border: 4px; !important">
        <span class="n-ad-status-circle-green"></span>
        <span id="n-ad-status-text">Фикс  <span class="n-wtf" data-tip="Кампания работает в режиме фиксированных фраз">?</span></span>
      </div>
    </div>
    <div class="n-info-badge">
      <span>Баланс</span> 
      <div class="n-ad-info-badge">
        <span id="n-ad-budget-text"></span>₽
      </div>
    </div>
    <div class="n-info-badge">
      <span>CPM</span> 
      <div class="n-ad-info-badge">
        <span id="n-ad-cpm-text"></span>₽
      </div>
    </div>
    <div class="n-info-badge" id="n-ad-info-views">
      <span>Показы</span> 
      <div class="n-ad-info-badge">
        <span id="n-ad-views-text"></span>
      </div>
    </div>
    <div class="n-info-badge" id="n-ad-info-clicks">
      <span>Клики</span> 
      <div class="n-ad-info-badge">
        <span id="n-ad-clicks-text"></span>
      </div>
    </div>
    <div class="n-info-badge" id="n-ad-info-ctr">
      <span>CTR</span> 
      <div class="n-ad-info-badge">
        <span id="n-ad-ctr-text"></span>%
      </div>
    </div>
    <div class="n-info-badge" id="n-ad-info-cpc">
      <span>CPC</span> 
      <div class="n-ad-info-badge">
        <span id="n-ad-cpc-text"></span>₽
      </div>
    </div>
    <div class="n-info-badge" id="n-ad-info-money">
      <span>Затраты</span> 
      <div class="n-ad-info-badge">
        <span id="n-ad-money-text"></span>₽
      </div>
    </div>
    <div class="n-loader" id="n-ad-loader" style="display:none; width:15px; height:15px;">
        <svg
        aria-hidden="true"
        style="width:15px !important; height:15px !important;"
        role="status"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        >
        <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
        />
        <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="#1C64F2"
        />
        </svg>
    </div>
  </div>
  <div class="n-help-message" style="margin-top: 18px;" id="n-product-analytics-help-message">
    <svg class="n-blink" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="height: 20px; color: #c18c0e;">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
    </svg>
    Если Статистика не отображается — перейдите в <a href="https://seller.wildberries.ru/content-analytics" style="text-decoration:underline;" target="_blank">Воронку Продаж</a> затем вернитесь обратно в РК и нажмите на "Обновить"
  </div>
  `;

    const copyAllKeywords = async () => {
      await navigator.clipboard.writeText(
        Engine.wordsStats?.keywords?.map((i) => i.keyword)?.join("\n") || ""
      );
    };

    const copyAllSelectedKeywords = async () => {
      await navigator.clipboard.writeText(
        [
          ...Engine.wordsStats?.keywords
            .filter((i) => i.selected)
            .map((i) => i.keyword),
          ...Engine.wordsStats?.excluded
            .filter((i) => i.selected)
            .map((i) => i.keyword),
        ].join("\n")
      );
    };

    const copyAllExcluded = async () => {
      await navigator.clipboard.writeText(
        Engine.wordsStats?.excluded?.map((i) => i.keyword)?.join("\n") || ""
      );
    };

    const copyAllFixed = async () => {
      await navigator.clipboard.writeText(
        Engine.wordsStats?.fixed.map((i) => i.keyword).join("\n")
      );
    };

    node.innerHTML += `
  <div class="n-kw">
    <div class="n-kw-wrap">
        <div class="n-tools">
          <svg class="n-search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" />
          </svg>
          <button class="n-search-close-btn" id="n-search-close-btn">+</button>
          <input class="n-search" autocomplete="off" id="n-search" type="text" placeholder="Поиск фраз"/>
          <input class="n-date-input" autocomplete="off" id="n-date-from" type="text" placeholder="Дата от"/>
          <span class="n-date-between">—</span>
          <input class="n-date-input" autocomplete="off" id="n-date-to" type="text" placeholder="Дата до"/>
          <button class="n-tools-button" id="n-show-lists-btn">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            Списки
          </button>
          <button class="n-tools-button" id="n-clusterize-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
              <path fill-rule="evenodd" d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zm0 9A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zm9-9A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zm0 9A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z" clip-rule="evenodd" />
            </svg>
            Кластеризовать
          </button>
          <button class="n-tools-button" id="n-refresh-btn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
              <path fill-rule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z" clip-rule="evenodd" />
            </svg>
            Обновить
          </button>
          <button class="n-tools-button" style="cursor:not-allowed" id="n-check-positions-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clip-rule="evenodd" />
            </svg>
            Позиции
          </button>
          <div style="display:flex; position:relative;">
            <button class="n-tools-button" id="n-destination-btn">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
              <span id="n-destination-name">Москва</span>
            </button>
            <div id="n-regions-selector" style="width:max-content; display: none; position: absolute; left: 0; margin-top: 52px; z-index: 10; background-color: #334155; border: 1px solid #ffffff20;">
            <div style="display:flex; flex-direction:row;">
              <div class="n-tools-select" id="n-apptype-select" data-apptype="WEB">
                WEB
              </div>
              <div class="n-tools-select" id="n-apptype-select" data-apptype="ANDROID">
                ANDROID
              </div>
              <div class="n-tools-select" id="n-apptype-select" data-apptype="IOS">
                IOS
              </div>
            </div>  
            <div style="height:1px;width:100%;background-color:#4d596a;"></div>
            <div class="n-tools-select" id="n-region-select" data-region="EKATERINBURG">
                Екатеринбург
              </div>
              <div class="n-tools-select" id="n-region-select" data-region="KAZAN">
                Казань
              </div>
              <div class="n-tools-select" id="n-region-select" data-region="KRASNODAR">
                Краснодар
              </div>
              <div class="n-tools-select" id="n-region-select" data-region="MOSCOW">
                Москва
              </div>
              <div class="n-tools-select" id="n-region-select" data-region="NOVOSIBIRSK">
                Новосибирск
              </div>
              <div class="n-tools-select" id="n-region-select" data-region="PITER">
                Санкт-Петербург
              </div>
              <div class="n-tools-select" id="n-region-select" data-region="SEVASTOPOL">
                Севастополь
              </div>
              <div class="n-tools-select" id="n-region-select" data-region="KHABAROVSK">
                Хабаровск
              </div>
              <div style="height:1px;width:100%;background-color:#4d596a;"></div>
              <div class="n-tools-select" id="n-region-select" data-region="ARMENIA">
                Армения
              </div>
              <div class="n-tools-select" id="n-region-select" data-region="BELARUS">
                Беларусь
              </div>
              <div class="n-tools-select" id="n-region-select" data-region="KAZAHSTAN">
                Казахстан
              </div>
            </div>
          </div>
          <button class="n-tools-button" id="n-export-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
              <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
              <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
            </svg>
            Экспорт
          </button>
        </div>
        <div class="switch-seven-to-all-stats-btn" id="switch-seven-to-all-stats-btn">
          Загружена статистика за 15 дней. Нажмите здесь для получения статистики за месяц.
        </div>
        <div class="n-custom-lists" id="n-custom-lists">
          <div class="n-custom-list-badges" id="n-custom-list-badges"></div>
          <span id="n-empty-custom-lists-msg">У вас ещё нет пользовательских списков</span>
          <div class="n-add-custom-list-wrap" id="n-add-custom-list-wrap">
            <div class="n-add-custom-list-colors-wrap" id="n-add-custom-list-colors-wrap">
              <div style="color:#f56d20;" class="n-add-custom-list-color-select-btn" id="n-add-custom-list-color-select-btn" data-color="f56d20">
                <div class="n-add-custom-list-color-select"></div>
              </div>
              <div style="color:#a162f7;" class="n-add-custom-list-color-select-btn" id="n-add-custom-list-color-select-btn" data-color="a162f7">
                <div class="n-add-custom-list-color-select"></div>
              </div>
              <div style="color:#ffca2c;" class="n-add-custom-list-color-select-btn" id="n-add-custom-list-color-select-btn" data-color="ffca2c">
                <div class="n-add-custom-list-color-select"></div>
              </div>
              <div style="color:#fd01fe;" class="n-add-custom-list-color-select-btn" id="n-add-custom-list-color-select-btn" data-color="fd01fe">
                <div class="n-add-custom-list-color-select"></div>
              </div>
              <div style="color:#37ffa4;" class="n-add-custom-list-color-select-btn" id="n-add-custom-list-color-select-btn" data-color="37ffa4">
                <div class="n-add-custom-list-color-select"></div>
              </div>
              <div style="color:#3fbfff;" class="n-add-custom-list-color-select-btn" id="n-add-custom-list-color-select-btn" data-color="3fbfff">
                <div class="n-add-custom-list-color-select"></div>
              </div>
            </div>
            <div class="n-add-custom-list-input-wrap" id="n-add-custom-list-input-wrap">
              <div class="n-add-custom-list-color-btn" id="n-add-custom-list-color-btn">
                <div class="n-add-custom-list-color-selected"></div>
                <svg xmlns="http://www.w3.org/2000/svg" id="n-add-custom-list-color-btn-chevron" style="width:10px; height:10px;" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
              <div class="n-add-custom-list-input" id="n-add-custom-list-input" tabindex="0" data-ph="Название списка" spellcheck="false" contenteditable="plaintext-only"></div>
            </div>
            <div class="n-add-custom-list-btn n-add-custom-list-submit-btn" id="n-add-custom-list-submit-btn">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" style="width: 12px; height:12px;" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <span>Создать</span>
            </div>
            <div class="n-add-custom-list-btn n-add-custom-list-close-btn" id="n-add-custom-list-close-btn">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" style="width: 12px; height:12px;" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
              <span>Отменить</span>
            </div>
          </div>
          <div class="n-add-custom-list-btn" id="n-add-custom-list-btn">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" style="width: 12px; height:12px;" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span>Добавить</span>
          </div>
        </div>
        <div class="n-sub-tools" style="justify-content: space-between;">
          <div style="display: flex; border-right: 1px solid #ffffff10;">
            <button class="n-tools-button" id="n-only-active-btn" data-tip="Отобразить только активные фразы">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                </svg>
            </button>
            <button class="n-tools-button" id="n-only-off-btn" data-tip="Отобразить только исключенные фразы">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.412 15.655 9.75 21.75l3.745-4.012M9.257 13.5H3.75l2.659-2.849m2.048-2.194L14.25 2.25 12 10.5h8.25l-4.707 5.043M8.457 8.457 3 3m5.457 5.457 7.086 7.086m0 0L21 21" />
              </svg>
            </button>
            <button class="n-tools-button" style="display:none;" id="n-only-fixed-btn" data-tip="Отобразить только фиксированные фразы">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
            </button>
            <button class="n-tools-button" style="display:none;" id="n-only-unfixed-btn" data-tip="Отобразить только не фиксированные фразы">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
            </button>
            <button class="n-tools-button" id="n-only-found-btn" data-tip="Отобразить только те фразы, которые присутствуют в поисковой выдаче (индексируются).">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            </button>
            <button class="n-tools-button" id="n-only-not-found-btn" data-tip="Отобразить только те фразы, которые не были найдены в поисковой выдаче (не индексируются).">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            </button>
            <button class="n-tools-button" id="n-only-pk-btn" data-tip="Отобразить только те фразы, которые продвигаются Рекламной Кампанией Аукцион">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
              </svg>
            </button>
            <button class="n-tools-button" id="n-only-auto-btn" data-tip="Отобразить только те фразы, которые продвигаются Автоматической Рекламной Кампанией">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z" />
              </svg>
            </button>
            <button class="n-tools-button" id="n-only-without-boost-btn" data-tip="Отобразить фразы по которым был замер позиций, но оказались без буста">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0 1 12 12.75Zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 0 1-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 2.104.52 4.136 1.153 6.06M12 12.75a2.25 2.25 0 0 0 2.248-2.354M12 12.75a2.25 2.25 0 0 1-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 0 0 0-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 0 1 .4-2.253M12 8.25a2.25 2.25 0 0 0-2.248 2.146M12 8.25a2.25 2.25 0 0 1 2.248 2.146M8.683 5a6.032 6.032 0 0 1-1.155-1.002c.07-.63.27-1.222.574-1.747m.581 2.749A3.75 3.75 0 0 1 15.318 5m0 0c.427-.283.815-.62 1.155-.999a4.471 4.471 0 0 0-.575-1.752M4.921 6a24.048 24.048 0 0 0-.392 3.314c1.668.546 3.416.914 5.223 1.082M19.08 6c.205 1.08.337 2.187.392 3.314a23.882 23.882 0 0 1-5.223 1.082" />
            </svg>
            </button>
            <button class="n-tools-button" id="n-only-new-phrases-btn" data-tip="Отобразить только новые ключевые фразы (Фразы, по которым появились показы только сегодня)">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.379a48.474 48.474 0 0 0-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12M12.265 3.11a.375.375 0 1 1-.53 0L12 2.845l.265.265Zm-3 0a.375.375 0 1 1-.53 0L9 2.845l.265.265Zm6 0a.375.375 0 1 1-.53 0L15 2.845l.265.265Z" />
              </svg>
            </button>
          </div>
          <div style="display: flex; gap:1px;">
            <div class="n-btn n-btn-vertical n-btn-vertical-disabled" id="n-erase-filters-btn">Очистить</div>
            <div style="display: flex; flex-direction: column; gap: 0; width:60px;">
              <input class="n-tools-values" id="n-sum-freq-from-input" type="number" placeholder="от"/>
              <div class="n-tools-between">
                <span style="font-weight: 400;position: absolute;font-size: 0.9em;color: #94a3b8;pointer-events: none;">
                  Σ Частота
                </span>
              </div>
              <input class="n-tools-values" style="padding-top: 4px;" id="n-sum-freq-to-input" type="number" placeholder="до"/>
            </div>
            <div style="display: flex; flex-direction: column; gap: 0; width:60px;">
              <input class="n-tools-values" id="n-freq-from-input" type="number" placeholder="от"/>
              <div class="n-tools-between">
                <span style="font-weight: 400;position: absolute;font-size: 0.9em;color: #94a3b8;pointer-events: none;">
                  Частота
                </span>
              </div>
              <input class="n-tools-values" style="padding-top: 4px;" id="n-freq-to-input" type="number" placeholder="до"/>
            </div>
            <div style="display: flex; flex-direction: column; gap: 0; width:60px;">
              <input class="n-tools-values" id="n-position-from-input" type="number" placeholder="от"/>
              <div class="n-tools-between">
                <span style="font-weight: 400;position: absolute;font-size: 0.9em;color: #94a3b8;pointer-events: none;">
                  Органика
                </span>
              </div>
              <input class="n-tools-values" style="padding-top: 4px;" id="n-position-to-input" type="number" placeholder="до"/>
            </div>
            <div style="display: flex; flex-direction: column; gap: 0; width:60px;">
              <input class="n-tools-values" id="n-position-boost-from-input" type="number" placeholder="от"/>
              <div class="n-tools-between">
                <span style="font-weight: 400;position: absolute;font-size: 0.9em;color: #94a3b8;pointer-events: none;">
                  Буст
                </span>
              </div>
              <input class="n-tools-values" style="padding-top: 4px;" id="n-position-boost-to-input" type="number" placeholder="до"/>
            </div>
            <div style="display: flex; flex-direction: column; gap: 0; width:60px;">
              <input class="n-tools-values" id="n-position-delta-from-input" type="number" placeholder="от"/>
              <div class="n-tools-between">
                <span style="font-weight: 400;position: absolute;font-size: 0.9em;color: #94a3b8;pointer-events: none;">
                  Дельта
                </span>
              </div>
              <input class="n-tools-values" style="padding-top: 4px;" id="n-position-delta-to-input" type="number" placeholder="до"/>
            </div>
            <div style="display: flex; flex-direction: column; gap: 0; width:60px;">
              <input class="n-tools-values" id="n-count-from-input" type="number" placeholder="от"/>
              <div class="n-tools-between">
                <span style="font-weight: 400;position: absolute;font-size: 0.9em;color: #94a3b8;pointer-events: none;">
                  Показы
                </span>
              </div>
              <input class="n-tools-values" style="padding-top: 4px;" id="n-count-to-input" type="number" placeholder="до"/>
            </div>
            <div style="display: flex; flex-direction: column; gap: 0; width:60px;">
              <input class="n-tools-values" id="n-clicks-from-input" type="number" max="100" placeholder="от"/>
              <div class="n-tools-between">
                <span style="font-weight: 400;position: absolute;font-size: 0.9em;color: #94a3b8;pointer-events: none;">
                  Клики
                </span>
              </div>
              <input class="n-tools-values" style="padding-top: 4px;" id="n-clicks-to-input" type="number" max="100" placeholder="до"/>
            </div>
            <div style="display: flex; flex-direction: column; gap: 0; width:60px;">
              <input class="n-tools-values" id="n-ctr-from-input" type="number" placeholder="от"/>
              <div class="n-tools-between">
                <span style="font-weight: 400;position: absolute;font-size: 0.9em;color: #94a3b8;pointer-events: none;">
                  CTR
                </span>
              </div>
              <input class="n-tools-values" style="padding-top: 4px;" id="n-ctr-to-input" type="number" placeholder="до"/>
            </div>
            <div style="display: flex; flex-direction: column; gap: 0; width:60px;">
              <input class="n-tools-values" id="n-cpc-from-input" type="number" placeholder="от"/>
              <div class="n-tools-between">
                <span style="font-weight: 400;position: absolute;font-size: 0.9em;color: #94a3b8;pointer-events: none;">
                  CPC
                </span>
              </div>
              <input class="n-tools-values" style="padding-top: 4px;" id="n-cpc-to-input" type="number" placeholder="до"/>
            </div>
            <div style="display: flex; flex-direction: column; gap: 0; width:60px;">
              <input class="n-tools-values" id="n-money-from-input" type="number" placeholder="от"/>
              <div class="n-tools-between">
                <span style="font-weight: 400;position: absolute;font-size: 0.9em;color: #94a3b8;pointer-events: none;">
                  Затраты
                </span>
              </div>
              <input class="n-tools-values" style="padding-top: 4px;" id="n-money-to-input" type="number" placeholder="до"/>
            </div>
          </div>
        </div>
        
        <div class="n-progress-wrap">
          <div class="n-progress" id="n-progress"></div>
        </div>

        <div class="n-title">
          <div style="display:flex; align-items:center; gap:6px; text-wrap:nowrap">
            <input type="checkbox" style="appearance:auto" id="keywordsAllCheckbox"/>
            <span id="n-keywords-title">Ключевые фразы</span>
            <span id="n-keywords-total"></span>
          </div>
          <div style="display:flex; gap:12px;">
            <span style="width:75px; text-align:right;" id="n-column" data-name="cluster_views" >Σ Частота <span class="n-wtf" data-tip="Суммарная частотность запросов всех фраз в кластере">?</span></span>
            <span style="width:60px; text-align:right;" id="n-column" data-name="views">Частота</span>
            <span style="width:55px; text-align:right;">Кластер</span>
            <span style="width:55px; text-align:center;">Анализ</span>
            <span style="width:70px; text-align:right;" id="n-column" data-name="position">Позиция</span>
            <span style="width:40px; text-align:right;" id="n-column" data-name="position_boost">Буст</span>
            <span style="width:40px; text-align:right;" id="n-column" data-name="position_delta">Дельта</span>
            <span style="width:50px; text-align:right;" id="n-column" data-name="count">Показы</span>
            <span style="width:50px; text-align:right;" id="n-column" data-name="clicks">Клики</span>
            <span style="width:35px; text-align:center;" id="n-column" data-name="ctr">CTR</span>
            <span style="width:35px; text-align:center;" id="n-column" data-name="cpc">CPC</span>
            <span style="width:55px; text-align:right;" id="n-column" data-name="money">Затраты</span>
          </div>
        </div>
        <div class="n-kw-list" id="n-keywords-list">
          <div style="display: flex;gap: 12px;align-items: center;justify-content: center;height: 100%;">
            <div class="n-load-stats-btn n-load-7-days-button" id="n-load-7-days-btn">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
              </svg>
                Загрузить статистику за 15 дней
            </div>
            <div class="n-load-stats-btn n-load-full-days-button" id="n-load-full-stats-btn">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                </svg>
                Загрузить статистику за месяц
            </div>
          </div>
        </div>
        <div class="n-title" style="background: #182234; border: none; border-inline: 1px solid #ffffff10;">
          <div style="display:flex; align-items:center; gap:6px; text-wrap:nowrap">
            <span>Итого</span>
          </div>
          <div style="display:flex; gap:12px;" id="n-keywords-total-values">
          </div>
        </div>
        <div class="n-action-buttons" style="flex-flow: row wrap;">
          <div class="n-btn" id="n-restore-cluster-button" style="border-right: none !important;">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
              </svg>
              Включить кластеры
          </div>
          <div class="n-btn" id="n-restore-keyword-button">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            Убрать из исключений
          </div>
          <div class="n-btn" id="n-remove-keyword-button">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            Исключить фразы
          </div>
          <div class="n-btn" id="n-fix-keyword-button">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 15px;">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
            Зафиксировать фразы
          </div>
          <div class="n-btn" id="n-unfix-keyword-button">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 15px;">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
            Вернуть в общие
          </div>
          <div class="n-btn" id="copy-keywords">Скопировать все фразы</div>
          <div class="n-btn" id="copy-keywords-selected" style="display:none;">Скопировать выбранные фразы</div>
          <div class="n-btn" id="add-keywords-to-custom-lists-button" style="display:none;">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
            </svg>
            Добавить в Список
          </div>
          <div class="n-btn" id="remove-keywords-from-custom-lists-button" style="display:none;">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
            </svg>

            Убрать из Списка
          </div>
        </div>
    </div>
    <div id="n-charts-layout" class="n-charts-layout"> 
    </div>   

    <div class="n-main-chart-layout" id="n-main-chart-layout">
    <div class="n-main-chart-bg-glow-blue"></div>
    <div class="n-main-chart-bg-glow-red"></div>
    <div class="n-main-chart-selector-overlay"></div>
      <div class="n-main-chart" id="n-main-chart"></div>
      <div class="n-main-chart-selector">
        <!-- XX -->
        <div style="display:flex; align-items: center; height: 30px;">
            <span class="n-main-chart-selector-item-inside-title">Статистика</span>
        </div>
        <div class="n-main-chart-selector-item-active" style="color: rgb(161, 98, 247);" id="n-main-chart-selector-item" data-name="Показы" data-accessor="totals-views" data-color="#A162F7" data-axis-id="0" data-is-active="true" data-type="line">
          <div class="n-main-chart-selector-item-circle-active"></div>
          <div class="n-main-chart-selector-item-inside">
            <span class="n-main-chart-selector-item-inside-title">Показы</span>
            <span class="n-main-chart-selector-item-inside-value">15 295</span>
          </div>
        </div>
        <div class="n-main-chart-selector-item-active" style="color: rgb(37, 99, 235);" id="n-main-chart-selector-item" data-name="Клики" data-accessor="totals-clicks" data-color="#2563eb" data-axis-id="1" data-is-active="true" data-type="line">
        <div class="n-main-chart-selector-item-circle-active"></div>
          <div class="n-main-chart-selector-item-inside">
            <span class="n-main-chart-selector-item-inside-title">Клики</span>
            <span class="n-main-chart-selector-item-inside-value">1 241</span>
          </div>
        </div>
        <div class="n-main-chart-selector-item" id="n-main-chart-selector-item" data-name="CTR" data-accessor="totals-ctr" data-color="#FF8743" data-axis-id="3" data-type="bar">
          <div class="n-main-chart-selector-item-circle"></div>
          <div class="n-main-chart-selector-item-inside">
            <span class="n-main-chart-selector-item-inside-title">CTR</span>
            <span class="n-main-chart-selector-item-inside-value">2.12%</span>
          </div>
        </div>
        <div class="n-main-chart-selector-item" id="n-main-chart-selector-item" data-name="CPM" data-accessor="totals-cpm" data-color="#FF8743" data-axis-id="3" data-type="bar">
          <div class="n-main-chart-selector-item-circle"></div>
          <div class="n-main-chart-selector-item-inside">
            <span class="n-main-chart-selector-item-inside-title">CPM</span>
            <span class="n-main-chart-selector-item-inside-value">2.12%</span>
          </div>
        </div>
        <div class="n-main-chart-selector-item" id="n-main-chart-selector-item" data-name="CPC" data-accessor="totals-cpc" data-color="#DB3031" data-axis-id="4" data-type="bar">
          <div class="n-main-chart-selector-item-circle"></div>
          <div class="n-main-chart-selector-item-inside">
            <span class="n-main-chart-selector-item-inside-title">CPC</span>
            <span class="n-main-chart-selector-item-inside-value">4.88₽</span>
          </div>
        </div>
        <div class="n-main-chart-selector-item-active" id="n-main-chart-selector-item" style="color: rgb(21, 255, 171);" data-name="Затраты" data-accessor="totals-money" data-color="#15FFAB" data-axis-id="5" data-is-active="true" data-type="line">
          <div class="n-main-chart-selector-item-circle-active"></div>
          <div class="n-main-chart-selector-item-inside">
            <span class="n-main-chart-selector-item-inside-title">Затраты</span>
            <span class="n-main-chart-selector-item-inside-value">152 123₽</span>
          </div>
        </div>
        <!-- XX -->
        <div class="n-main-chart-selector-items-title">
            <span class="n-main-chart-selector-item-inside-title">Рекламная воронка</span>
        </div>
        <div class="n-main-chart-selector-item" id="n-main-chart-selector-item" data-name="Корзины" data-accessor="addToCartWithAdRate" data-color="#2563eb" data-axis-id="6" data-type="bar">
          <div class="n-main-chart-selector-item-circle"></div>
          <div class="n-main-chart-selector-item-inside">
            <span class="n-main-chart-selector-item-inside-title">Корзины</span>
            <span class="n-main-chart-selector-item-inside-value">42</span>
          </div>
        </div>
        <div class="n-main-chart-selector-item" id="n-main-chart-selector-item" data-name="Конверсия в корзину" data-accessor="addToCartConversionRealTime" data-color="#2563eb" data-axis-id="7" data-type="line-dashed">
          <div class="n-main-chart-selector-item-circle"></div>
          <div class="n-main-chart-selector-item-inside">
            <span class="n-main-chart-selector-item-inside-title">Конверсия в корзину</span>
            <span class="n-main-chart-selector-item-inside-value">4.68%</span>
          </div>
        </div>
        <div class="n-main-chart-selector-item" id="n-main-chart-selector-item" data-name="Заказы" data-accessor="ordersWithAdRate" data-color="#FF8743" data-axis-id="6" data-type="bar">
          <div class="n-main-chart-selector-item-circle"></div>
          <div class="n-main-chart-selector-item-inside">
            <span class="n-main-chart-selector-item-inside-title">Заказы</span>
            <span class="n-main-chart-selector-item-inside-value">8</span>
          </div>
        </div>
        <div class="n-main-chart-selector-item" id="n-main-chart-selector-item" data-name="Конверсия в заказ" data-accessor="ordersConversionRealTime" data-color="#FF8743" data-axis-id="7" data-type="line-dashed">
          <div class="n-main-chart-selector-item-circle"></div>
          <div class="n-main-chart-selector-item-inside">
            <span class="n-main-chart-selector-item-inside-title">Конверсия в заказ</span>
            <span class="n-main-chart-selector-item-inside-value">6.82%</span>
          </div>
        </div>
        <div class="n-main-chart-selector-item" id="n-main-chart-selector-item" data-name="Заказов на сумму" data-accessor="ordersSumWithAdRate" data-color="#FF8743" data-axis-id="9" data-type="line-dashed">
          <div class="n-main-chart-selector-item-circle"></div>
          <div class="n-main-chart-selector-item-inside">
            <span class="n-main-chart-selector-item-inside-title">Заказов на сумму</span>
            <span class="n-main-chart-selector-item-inside-value">164 213₽</span>
          </div>
        </div>
        <div class="n-main-chart-selector-item" id="n-main-chart-selector-item" data-name="Продажи" data-accessor="salesWithAdRate" data-color="#15FFAB" data-axis-id="6" data-type="bar">
          <div class="n-main-chart-selector-item-circle"></div>
          <div class="n-main-chart-selector-item-inside">
            <span class="n-main-chart-selector-item-inside-title">Продажи</span>
            <span class="n-main-chart-selector-item-inside-value">3.22</span>
          </div>
        </div>
        <div class="n-main-chart-selector-item" id="n-main-chart-selector-item" data-name="Конверсия в продажу" data-accessor="buyOutPercent" data-color="#15FFAB" data-axis-id="7" data-type="line-dashed">
          <div class="n-main-chart-selector-item-circle"></div>
          <div class="n-main-chart-selector-item-inside">
            <span class="n-main-chart-selector-item-inside-title">Конверсия в продажу</span>
            <span class="n-main-chart-selector-item-inside-value">41%</span>
          </div>
        </div>
        <div class="n-main-chart-selector-item" id="n-main-chart-selector-item" data-name="Продажи на сумму" data-accessor="salesSumWithAdRate" data-color="#15FFAB" data-axis-id="9" data-type="line-dashed">
          <div class="n-main-chart-selector-item-circle"></div>
          <div class="n-main-chart-selector-item-inside">
            <span class="n-main-chart-selector-item-inside-title">Продажи на сумму</span>
            <span class="n-main-chart-selector-item-inside-value">44 214₽</span>
          </div>
        </div>
        <!-- XX -->
        <div class="n-main-chart-selector-items-title">
            <span class="n-main-chart-selector-item-inside-title">Рекламные метрики</span>
        </div>
        <div class="n-main-chart-selector-item" id="n-main-chart-selector-item" data-name="Кликов %" data-accessor="adClicksRate" data-color="#A162F7" data-axis-id="3" data-type="bar">
          <div class="n-main-chart-selector-item-circle"></div>
          <div class="n-main-chart-selector-item-inside">
            <span class="n-main-chart-selector-item-inside-title">Кликов %</span>
            <span class="n-main-chart-selector-item-inside-value">12.22%</span>
          </div>
        </div>
        <div class="n-main-chart-selector-item" id="n-main-chart-selector-item" data-name="Позиция" data-accessor="totals-avgBoost" data-color="#15FFAB" data-axis-id="6" data-type="line-dotted">
          <div class="n-main-chart-selector-item-circle"></div>
          <div class="n-main-chart-selector-item-inside">
            <span class="n-main-chart-selector-item-inside-title">Позиция</span>
            <span class="n-main-chart-selector-item-inside-value">121</span>
          </div>
        </div>
        <div class="n-main-chart-selector-item" id="n-main-chart-selector-item" data-name="CPO" data-accessor="cpo" data-color="#FF8743" data-axis-id="8" data-type="bar">
          <div class="n-main-chart-selector-item-circle"></div>
          <div class="n-main-chart-selector-item-inside">
            <span class="n-main-chart-selector-item-inside-title">CPO</span>
            <span class="n-main-chart-selector-item-inside-value">121.22₽</span>
          </div>
        </div>
        <div class="n-main-chart-selector-item" id="n-main-chart-selector-item" data-name="CPS" data-accessor="cps" data-color="#DB3031" data-axis-id="8" data-type="bar-dotted">
          <div class="n-main-chart-selector-item-circle"></div>
          <div class="n-main-chart-selector-item-inside">
            <span class="n-main-chart-selector-item-inside-title">CPS</span>
            <span class="n-main-chart-selector-item-inside-value">516.88₽</span>
          </div>
        </div>
        <div class="n-main-chart-selector-item" id="n-main-chart-selector-item" data-name="oER" data-accessor="ero" data-color="#15FFAB" data-axis-id="3" data-type="bar">
          <div class="n-main-chart-selector-item-circle"></div>
          <div class="n-main-chart-selector-item-inside">
            <span class="n-main-chart-selector-item-inside-title">oER</span>
            <span class="n-main-chart-selector-item-inside-value">13.22%</span>
          </div>
        </div>
        <div class="n-main-chart-selector-item" id="n-main-chart-selector-item" data-name="ER" data-accessor="er" data-color="#A162F7" data-axis-id="3" data-type="bar">
          <div class="n-main-chart-selector-item-circle"></div>
          <div class="n-main-chart-selector-item-inside">
            <span class="n-main-chart-selector-item-inside-title">ER</span>
            <span class="n-main-chart-selector-item-inside-value">25.19%</span>
          </div>
        </div>
        <!-- XX -->
        <div class="n-main-chart-selector-items-title">
            <span class="n-main-chart-selector-item-inside-title">Общая воронка</span>
        </div>
        <div class="n-main-chart-selector-item" id="n-main-chart-selector-item" data-name="Отложенные" data-accessor="wishList" data-color="#eb2576" data-axis-id="7" data-type="line-dotted">
          <div class="n-main-chart-selector-item-circle"></div>
          <div class="n-main-chart-selector-item-inside">
            <span class="n-main-chart-selector-item-inside-title">Отложенные</span>
            <span class="n-main-chart-selector-item-inside-value">420</span>
          </div>
        </div>
        <div class="n-main-chart-selector-item" id="n-main-chart-selector-item" data-name="Σ Корзины" data-accessor="addToCart" data-color="#2563eb" data-axis-id="6" data-type="bar">
          <div class="n-main-chart-selector-item-circle"></div>
          <div class="n-main-chart-selector-item-inside">
            <span class="n-main-chart-selector-item-inside-title">Σ Корзины</span>
            <span class="n-main-chart-selector-item-inside-value">420</span>
          </div>
        </div>
        <div class="n-main-chart-selector-item" id="n-main-chart-selector-item" data-name="Конверсия в корзину" data-accessor="addToCartConversion" data-color="#2563eb" data-axis-id="7" data-type="line-dotted">
          <div class="n-main-chart-selector-item-circle"></div>
          <div class="n-main-chart-selector-item-inside">
            <span class="n-main-chart-selector-item-inside-title">Конверсия в корзину</span>
            <span class="n-main-chart-selector-item-inside-value">4.68%</span>
          </div>
        </div>
        <div class="n-main-chart-selector-item" id="n-main-chart-selector-item" data-name="Σ Заказы" data-accessor="orders" data-color="#FF8743" data-axis-id="6" data-type="bar">
          <div class="n-main-chart-selector-item-circle"></div>
          <div class="n-main-chart-selector-item-inside">
            <span class="n-main-chart-selector-item-inside-title">Σ Заказы</span>
            <span class="n-main-chart-selector-item-inside-value">78</span>
          </div>
        </div>
        <div class="n-main-chart-selector-item" id="n-main-chart-selector-item" data-name="Конверсия в заказ" data-accessor="ordersConversion" data-color="#FF8743" data-axis-id="7" data-type="line-dotted">
          <div class="n-main-chart-selector-item-circle"></div>
          <div class="n-main-chart-selector-item-inside">
            <span class="n-main-chart-selector-item-inside-title">Конверсия в заказ</span>
            <span class="n-main-chart-selector-item-inside-value">6.82%</span>
          </div>
        </div>
        <div class="n-main-chart-selector-item" id="n-main-chart-selector-item" data-name="Σ Заказов на сумму" data-accessor="ordersSum" data-color="#FF8743" data-axis-id="9" data-type="line-dotted">
          <div class="n-main-chart-selector-item-circle"></div>
          <div class="n-main-chart-selector-item-inside">
            <span class="n-main-chart-selector-item-inside-title">Σ Заказов на сумму</span>
            <span class="n-main-chart-selector-item-inside-value">1 264 213₽</span>
          </div>
        </div>
        <div class="n-main-chart-selector-item" id="n-main-chart-selector-item" data-name="Σ Продажи" data-accessor="sales" data-color="#15FFAB" data-axis-id="6" data-type="bar">
          <div class="n-main-chart-selector-item-circle"></div>
          <div class="n-main-chart-selector-item-inside">
            <span class="n-main-chart-selector-item-inside-title">Σ Продажи</span>
            <span class="n-main-chart-selector-item-inside-value">23.62</span>
          </div>
        </div>
        <div class="n-main-chart-selector-item" id="n-main-chart-selector-item" data-name="Σ Продажи на сумму" data-accessor="salesSum" data-color="#15FFAB" data-axis-id="9" data-type="line-dotted">
          <div class="n-main-chart-selector-item-circle"></div>
          <div class="n-main-chart-selector-item-inside">
            <span class="n-main-chart-selector-item-inside-title">Σ Продажи на сумму</span>
            <span class="n-main-chart-selector-item-inside-value">441 814₽</span>
          </div>
        </div>
        <!-- XX -->
        <div class="n-main-chart-selector-items-title">
            <span class="n-main-chart-selector-item-inside-title">Общие метрики</span>
        </div>
        <div class="n-main-chart-selector-item" id="n-main-chart-selector-item" data-name="Цена товара" data-accessor="priceNoSpp" data-color="#A162F7" data-axis-id="9" data-type="line">
          <div class="n-main-chart-selector-item-circle"></div>
          <div class="n-main-chart-selector-item-inside">
            <span class="n-main-chart-selector-item-inside-title">Цена товара</span>
            <span class="n-main-chart-selector-item-inside-value">11 230₽</span>
          </div>
        </div>
        <div class="n-main-chart-selector-item" id="n-main-chart-selector-item" data-name="Открытий" data-accessor="openCard" data-color="#15FFAB" data-axis-id="1" data-type="line-dashed">
          <div class="n-main-chart-selector-item-circle"></div>
          <div class="n-main-chart-selector-item-inside">
            <span class="n-main-chart-selector-item-inside-title">Открытий</span>
            <span class="n-main-chart-selector-item-inside-value">2 321</span>
          </div>
        </div>
        <div class="n-main-chart-selector-item" id="n-main-chart-selector-item" data-name="Σ CPO" data-accessor="eCpo" data-color="#A162F7" data-axis-id="8" data-type="bar">
          <div class="n-main-chart-selector-item-circle"></div>
          <div class="n-main-chart-selector-item-inside">
            <span class="n-main-chart-selector-item-inside-title">Σ CPO</span>
            <span class="n-main-chart-selector-item-inside-value">121.22₽</span>
          </div>
        </div>
        <div class="n-main-chart-selector-item" id="n-main-chart-selector-item" data-name="Σ CPS" data-accessor="eCps" data-color="#15FFAB" data-axis-id="8" data-type="bar">
          <div class="n-main-chart-selector-item-circle"></div>
          <div class="n-main-chart-selector-item-inside">
            <span class="n-main-chart-selector-item-inside-title">Σ CPS</span>
            <span class="n-main-chart-selector-item-inside-value">516.88₽</span>
          </div>
        </div>
        <div class="n-main-chart-selector-item" id="n-main-chart-selector-item" data-name="Σ oER" data-accessor="eEro" data-color="#FF8743" data-axis-id="3" data-type="bar">
          <div class="n-main-chart-selector-item-circle"></div>
          <div class="n-main-chart-selector-item-inside">
            <span class="n-main-chart-selector-item-inside-title">Σ oER</span>
            <span class="n-main-chart-selector-item-inside-value">13.22%</span>
          </div>
        </div>
        <div class="n-main-chart-selector-item" id="n-main-chart-selector-item" data-name="Σ ER" data-accessor="eEr" data-color="#DB3031" data-axis-id="3" data-type="bar">
          <div class="n-main-chart-selector-item-circle"></div>
          <div class="n-main-chart-selector-item-inside">
            <span class="n-main-chart-selector-item-inside-title">Σ ER</span>
            <span class="n-main-chart-selector-item-inside-value">25.19%</span>
          </div>
        </div>
        <!-- XX -->
        <div class="n-main-chart-selector-items-title">
            <span class="n-main-chart-selector-item-inside-title">Статистика Поиска</span>
        </div>
        <div class="n-main-chart-selector-item" id="n-main-chart-selector-item" data-name="П.Показы" data-accessor="search-views" data-color="#A162F7" data-axis-id="0" data-type="line-dotted">
          <div class="n-main-chart-selector-item-circle"></div>
          <div class="n-main-chart-selector-item-inside">
            <span class="n-main-chart-selector-item-inside-title">П.Показы</span>
            <span class="n-main-chart-selector-item-inside-value">15 295</span>
          </div>
        </div>
        <div class="n-main-chart-selector-item" id="n-main-chart-selector-item" data-name="П.Клики" data-accessor="search-clicks" data-color="#2563eb" data-axis-id="1" data-type="line-dotted">
          <div class="n-main-chart-selector-item-circle"></div>
          <div class="n-main-chart-selector-item-inside">
            <span class="n-main-chart-selector-item-inside-title">П.Клики</span>
            <span class="n-main-chart-selector-item-inside-value">1 241</span>
          </div>
        </div>
        <div class="n-main-chart-selector-item" id="n-main-chart-selector-item" data-name="П.CTR" data-accessor="search-ctr" data-color="#FF8743" data-axis-id="3" data-type="bar">
          <div class="n-main-chart-selector-item-circle"></div>
          <div class="n-main-chart-selector-item-inside">
            <span class="n-main-chart-selector-item-inside-title">П.CTR</span>
            <span class="n-main-chart-selector-item-inside-value">2.12%</span>
          </div>
        </div>
        <div class="n-main-chart-selector-item" id="n-main-chart-selector-item" data-name="П.CPM" data-accessor="search-cpm" data-color="#FF8743" data-axis-id="3" data-type="line">
          <div class="n-main-chart-selector-item-circle"></div>
          <div class="n-main-chart-selector-item-inside">
            <span class="n-main-chart-selector-item-inside-title">П.CPM</span>
            <span class="n-main-chart-selector-item-inside-value">2.12%</span>
          </div>
        </div>
        <div class="n-main-chart-selector-item" id="n-main-chart-selector-item" data-name="П.CPC" data-accessor="search-cpc" data-color="#DB3031" data-axis-id="4" data-type="bar">
          <div class="n-main-chart-selector-item-circle"></div>
          <div class="n-main-chart-selector-item-inside">
            <span class="n-main-chart-selector-item-inside-title">П.CPC</span>
            <span class="n-main-chart-selector-item-inside-value">4.88₽</span>
          </div>
        </div>
        <div class="n-main-chart-selector-item" id="n-main-chart-selector-item" data-name="П.Затраты" data-accessor="search-money" data-color="#15FFAB" data-axis-id="5" data-type="line-dotted">
          <div class="n-main-chart-selector-item-circle"></div>
          <div class="n-main-chart-selector-item-inside">
            <span class="n-main-chart-selector-item-inside-title">П.Затраты</span>
            <span class="n-main-chart-selector-item-inside-value">152 123₽</span>
          </div>
        </div>
        <!-- XX -->
        <div class="n-main-chart-selector-items-title">
            <span class="n-main-chart-selector-item-inside-title">Статистика Каталога</span>
        </div>
        <div class="n-main-chart-selector-item" id="n-main-chart-selector-item" data-name="К.Показы" data-accessor="catalog-views" data-color="#A162F7" data-axis-id="0" data-type="line-dashed">
          <div class="n-main-chart-selector-item-circle"></div>
          <div class="n-main-chart-selector-item-inside">
            <span class="n-main-chart-selector-item-inside-title">К.Показы</span>
            <span class="n-main-chart-selector-item-inside-value">15 295</span>
          </div>
        </div>
        <div class="n-main-chart-selector-item" id="n-main-chart-selector-item" data-name="К.Клики" data-accessor="catalog-clicks" data-color="#2563eb" data-axis-id="1" data-type="line-dashed">
          <div class="n-main-chart-selector-item-circle"></div>
          <div class="n-main-chart-selector-item-inside">
            <span class="n-main-chart-selector-item-inside-title">К.Клики</span>
            <span class="n-main-chart-selector-item-inside-value">1 241</span>
          </div>
        </div>
        <div class="n-main-chart-selector-item" id="n-main-chart-selector-item" data-name="К.CTR" data-accessor="catalog-ctr" data-color="#FF8743" data-axis-id="3" data-type="bar-empty">
          <div class="n-main-chart-selector-item-circle"></div>
          <div class="n-main-chart-selector-item-inside">
            <span class="n-main-chart-selector-item-inside-title">К.CTR</span>
            <span class="n-main-chart-selector-item-inside-value">2.12%</span>
          </div>
        </div>
        <div class="n-main-chart-selector-item" id="n-main-chart-selector-item" data-name="К.CPM" data-accessor="catalog-cpm" data-color="#FF8743" data-axis-id="3" data-type="line-dashed">
          <div class="n-main-chart-selector-item-circle"></div>
          <div class="n-main-chart-selector-item-inside">
            <span class="n-main-chart-selector-item-inside-title">К.CPM</span>
            <span class="n-main-chart-selector-item-inside-value">2.12%</span>
          </div>
        </div>
        <div class="n-main-chart-selector-item" id="n-main-chart-selector-item" data-name="К.CPC" data-accessor="catalog-cpc" data-color="#DB3031" data-axis-id="4" data-type="bar-empty">
          <div class="n-main-chart-selector-item-circle"></div>
          <div class="n-main-chart-selector-item-inside">
            <span class="n-main-chart-selector-item-inside-title">К.CPC</span>
            <span class="n-main-chart-selector-item-inside-value">4.88₽</span>
          </div>
        </div>
        <div class="n-main-chart-selector-item" id="n-main-chart-selector-item" data-name="К.Затраты" data-accessor="catalog-money" data-color="#15FFAB" data-axis-id="5" data-type="line-dashed">
          <div class="n-main-chart-selector-item-circle"></div>
          <div class="n-main-chart-selector-item-inside">
            <span class="n-main-chart-selector-item-inside-title">К.Затраты</span>
            <span class="n-main-chart-selector-item-inside-value">152 123₽</span>
          </div>
        </div>
        <!-- XX -->
        <div class="n-main-chart-selector-items-title">
            <span class="n-main-chart-selector-item-inside-title">Статистика Полок</span>
        </div>
        <div class="n-main-chart-selector-item" id="n-main-chart-selector-item" data-name="РП.Показы" data-accessor="shelf-views" data-color="#A162F7" data-axis-id="0" data-type="line-dashed">
          <div class="n-main-chart-selector-item-circle"></div>
          <div class="n-main-chart-selector-item-inside">
            <span class="n-main-chart-selector-item-inside-title">РП.Показы</span>
            <span class="n-main-chart-selector-item-inside-value">15 295</span>
          </div>
        </div>
        <div class="n-main-chart-selector-item" id="n-main-chart-selector-item" data-name="РП.Клики" data-accessor="shelf-clicks" data-color="#2563eb" data-axis-id="1" data-type="line-dashed">
          <div class="n-main-chart-selector-item-circle"></div>
          <div class="n-main-chart-selector-item-inside">
            <span class="n-main-chart-selector-item-inside-title">РП.Клики</span>
            <span class="n-main-chart-selector-item-inside-value">1 241</span>
          </div>
        </div>
        <div class="n-main-chart-selector-item" id="n-main-chart-selector-item" data-name="РП.CTR" data-accessor="shelf-ctr" data-color="#FF8743" data-axis-id="3" data-type="bar-empty">
          <div class="n-main-chart-selector-item-circle"></div>
          <div class="n-main-chart-selector-item-inside">
            <span class="n-main-chart-selector-item-inside-title">РП.CTR</span>
            <span class="n-main-chart-selector-item-inside-value">2.12%</span>
          </div>
        </div>
        <div class="n-main-chart-selector-item" id="n-main-chart-selector-item" data-name="РП.CPM" data-accessor="shelf-cpm" data-color="#FF8743" data-axis-id="3" data-type="line-dotted">
          <div class="n-main-chart-selector-item-circle"></div>
          <div class="n-main-chart-selector-item-inside">
            <span class="n-main-chart-selector-item-inside-title">РП.CPM</span>
            <span class="n-main-chart-selector-item-inside-value">2.12%</span>
          </div>
        </div>
        <div class="n-main-chart-selector-item" id="n-main-chart-selector-item" data-name="РП.CPC" data-accessor="shelf-cpc" data-color="#DB3031" data-axis-id="4" data-type="bar-empty">
          <div class="n-main-chart-selector-item-circle"></div>
          <div class="n-main-chart-selector-item-inside">
            <span class="n-main-chart-selector-item-inside-title">РП.CPC</span>
            <span class="n-main-chart-selector-item-inside-value">4.88₽</span>
          </div>
        </div>
        <div class="n-main-chart-selector-item" id="n-main-chart-selector-item" data-name="РП.Затраты" data-accessor="shelf-money" data-color="#15FFAB" data-axis-id="5" data-type="line-dashed">
          <div class="n-main-chart-selector-item-circle"></div>
          <div class="n-main-chart-selector-item-inside">
            <span class="n-main-chart-selector-item-inside-title">РП.Затраты</span>
            <span class="n-main-chart-selector-item-inside-value">152 123₽</span>
          </div>
        </div>
      </div>
    </div>   

    <div class="n-kw-wrap" id="n-dates-table" style="display:none; height: 551px; overflow:scroll; resize:vertical">
      <div class="n-kw-list" id="n-dates-list" style="display:table; border-left:none; border-top:none; height: initial"></div>
    </div>

    <div class="n-kw-wrap">
      <div class="n-tools">
        <svg class="n-search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
          <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" />
        </svg>
        <button class="n-search-close-btn" id="n-search-excluded-close-btn">+</button>
        <input class="n-search" id="n-excluded-search" type="text" placeholder="Поиск минус-фраз"/>
        <div style="display:flex; position:relative;">
          <button class="n-tools-button" id="n-add-mass-excluded-btn">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Добавить массово
          </button>
          <div id="n-bulk-excluded-area" style="width:max-content; display: none; position: absolute; left: 0; margin-top: 52px; z-index: 10; border: 1px solid #ffffff20;">
            <div contenteditable="plaintext-only" spellcheck="false" class="n-bulk-excluded-area" id="n-bulk-excluded-list"></div>
            <div class="n-action-buttons">
                <div class="n-btn" id="n-add-bulk-excluded" style="display:flex;">Добавить минус-фразы</div>
            </div>
          </div>
        </div>
        <div style="display:flex; position:relative;">
            <button class="n-tools-button" id="n-add-mass-excluded-except-btn" data-tip="Введите список из фраз, которые останутся активными. Все остальные фразы будут исключены. Исключение происходит по кластерами. Если фраза является частью какого-то кластера, то все фразы из кластера не будут исключены (Кроме кластера №-1. Здесь проверка идёт по фразам).">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
            </svg>

            Исключить всё кроме
            </button>
            <div id="n-bulk-excluded-except-area" style="width:max-content; display: none; position: absolute; left: 0; margin-top: 52px; z-index: 10; border: 1px solid #ffffff20;">
            <div contenteditable="plaintext-only" spellcheck="false" class="n-bulk-excluded-area" id="n-bulk-excluded-except-list"></div>
            <div class="n-action-buttons">
                <div class="n-btn" id="n-add-bulk-excluded-except" style="display:flex;">Добавить всё в исключения кроме введенных</div>
            </div>
            </div>
        </div>
        <div style="display:flex; position:relative;">
          <button class="n-tools-button" id="n-remove-mass-excluded-except-btn" data-tip="Введите список из фраз, которые будут восстановлены к показу. Фразы будут убраны из списка Исключений.">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
            </svg>
            Вернуть массово
          </button>
          <div id="n-bulk-remove-excluded-area" style="width:max-content; display: none; position: absolute; left: 0; margin-top: 52px; z-index: 10; border: 1px solid #ffffff20;">
            <div contenteditable="plaintext-only" spellcheck="false" class="n-bulk-excluded-area" id="n-bulk-remove-excluded-list"></div>
            <div class="n-action-buttons">
                <div class="n-btn" id="n-remove-bulk-excluded" style="display:flex;">Вернуть из минус-фраз</div>
            </div>
          </div>
        </div>
        <button class="n-tools-button" id="n-only-danger-btn">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
          Подозрительные
        </button>
      </div>
      <div class="n-progress-wrap">
        <div class="n-progress" id="n-excluded-progress"></div>
      </div>
      <div class="n-title">
        <div style="display:flex; align-items:center; gap:6px;">
          <input type="checkbox" style="appearance:auto" id="excludedAllCheckbox"/>
          <span>Минус-Фразы</span>
          <span id="n-excluded-total"></span>
        </div>
        <div style="display:flex; gap:12px;">
          <span style="width:75px; text-align:right;" id="n-excluded-column" data-name="cluster_views">Σ Частота</span>
          <span style="width:75px; text-align:right;" id="n-excluded-column" data-name="views">Частота</span>
          <span style="width:75px; text-align:right;">Кластер</span>
          <span style="width:50px; text-align:right;" id="n-excluded-column" data-name="count">Показы</span>
          <span style="width:50px; text-align:right;" id="n-excluded-column" data-name="clicks">Клики</span>
          <span style="width:50px; text-align:right;" id="n-excluded-column" data-name="ctr">CTR</span>
          <span style="width:50px; text-align:right;" id="n-excluded-column" data-name="cpc">CPC</span>
          <span style="width:70px; text-align:right;" id="n-excluded-column" data-name="money">Затраты</span>
        </div>
      </div>

      <div class="n-kw-list" id="n-excluded-list"></div>
      <div class="n-action-buttons">
        <div class="n-btn" id="n-restore-excluded-button">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        Убрать из исключений</div>
        <div class="n-btn" id="copy-excluded">Скопировать минус-фразы</div>
      </div>
    </div>

    <div class="n-kw-wrap" id="n-fixed-table-wrap">
      <div class="n-tools">
        <svg class="n-search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
          <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" />
        </svg>
        <button class="n-search-close-btn" id="n-search-fixed-close-btn">+</button>
        <input class="n-search" id="n-fixed-search" type="text" placeholder="Поиск фикс-фраз"/>
        <div style="display:flex; position:relative;">
            <button class="n-tools-button n-active-fixed-button" id="n-set-fixed-active-status-btn" style="display:none;">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:18px;">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
              Включить Фикс-Фразы
            </button>
            <button class="n-tools-button n-inactive-fixed-button" id="n-set-fixed-inactive-status-btn" style="display:none;">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:18px;">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
              Отключить Фикс-Фразы
            </button>
            <button class="n-tools-button" id="n-add-mass-fixed-btn">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Добавить массово
            </button>
            <div id="n-bulk-fixed-area" style="width:max-content; display: none; position: absolute; left: 0; margin-top: 52px; z-index: 10; border: 1px solid #ffffff20;">
            <div contenteditable="plaintext-only" spellcheck="false" class="n-bulk-excluded-area" id="n-bulk-fixed-list"></div>
            <div class="n-action-buttons">
                <div class="n-btn" id="n-add-bulk-fixed" style="display:flex;">Добавить фикс-фразы</div>
            </div>
            </div>
        </div>
      </div>
      <div class="n-progress-wrap">
        <div class="n-progress" id="n-fixed-progress"></div>
      </div>
      <div class="n-title">
        <div style="display:flex; align-items:center; gap:6px;">
          <input type="checkbox"  style="appearance:auto" id="fixedAllCheckbox"/>
          <span>Фикс-Фразы</span>
          <span id="n-fixed-total"></span>
        </div>
        <div style="display:flex; gap:12px;">
          <span style="width:75px; text-align:right;" id="n-fixed-n-column" data-name="cluster_views">Σ Частота</span>
          <span style="width:75px; text-align:right;" id="n-fixed-column" data-name="views">Частота</span>
          <span style="width:75px; text-align:right;">Кластер</span>
          <span style="width:50px; text-align:right;" id="n-fixed-column" data-name="count">Показы</span>
          <span style="width:50px; text-align:right;" id="n-fixed-column" data-name="clicks">Клики</span>
          <span style="width:50px; text-align:right;" id="n-fixed-column" data-name="ctr">CTR</span>
          <span style="width:50px; text-align:right;" id="n-fixed-column" data-name="cpc">CPC</span>
          <span style="width:70px; text-align:right;" id="n-fixed-column" data-name="money">Затраты</span>
        </div>
      </div>

      <div class="n-kw-list" id="n-fixed-list"></div>
      <div class="n-action-buttons">
        <div class="n-btn" id="n-restore-fixed-button">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 15px;">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
          Вернуть в общие
        </div>
        <div class="n-btn" id="n-exclude-fixed-button">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          Исключить фразы
        </div>
        <div class="n-btn" id="copy-fixed">Скопировать фикс-фразы</div>
      </div>
    </div>
  </div>
  `;
    element.after(node);
    element.after(nodeCollapsed);

    if (!CLICKED_NEW_VERSION) {
      const button = document.getElementById("n-set-pro-version");
      button?.addEventListener("mouseup", (e) => {
        e.preventDefault();
        localStorage.setItem("neuromarket-pro-click", 'true');
        localStorage.setItem("nm-pro-version", 'true');
        window.open("https://t.me/neuromarket_channel/509")
      })
    } else {
      const button = document.getElementById("n-set-pro-version");
      button?.addEventListener("mouseup", (e) => {
        e.preventDefault();
        localStorage.setItem("nm-pro-version", 'true');
        window.location.reload()
      })
    }

    if (!UPDATE_MESSAGE_READ) {
      const readLinks = document.querySelectorAll("#n-update-read");
      const closeModal = document.querySelectorAll("#n-update-close");
      [...readLinks, ...closeModal].forEach((el) =>
        el.addEventListener("mouseup", () => {
          localStorage.setItem("neuromarket-" + VERSION + "-read", true);
          [...document.querySelectorAll("#n-update-message")].forEach(
            (el) => (el.style.display = "none")
          );
        })
      );
    }

    if (!TG_MESSAGE_READ) {
      const tgMessageOverlay = document.getElementById("n-tg-read");
      tgMessageOverlay.style.display = "flex";
      const closeModal = document.getElementById("n-tg-close");
      closeModal?.addEventListener("mouseup", () => {
        localStorage.setItem("neuromarket-tg-read", true);
        tgMessageOverlay.style.display = "none";
      });
    }

    if (["SEACAT", "SEARCH"].includes(window.__NEUROMARKET_AD_TYPE)) {
      document
        .getElementById("n-fixed-table-wrap")
        .setAttribute("style", "display:flex !important");
    }

    const createSearchAdCampaignBtn = document.getElementById(
      "n-create-search-campaign-btn"
    );
    const cancelModalBtn = document.getElementById("n-modal-cancel");
    const createTurboAdBtn = document.getElementById("n-modal-btn-green");
    const addMassExcludedBtn = document.getElementById(
      "n-add-mass-excluded-btn"
    );
    const addMassExcludedExceptBtn = document.getElementById(
      "n-add-mass-excluded-except-btn"
    );
    const removeMassExcludedExceptBtn = document.getElementById(
      "n-remove-mass-excluded-except-btn"
    );

    const addBulkExcludedBtn = document.getElementById("n-add-bulk-excluded");
    const addBulkRemoveExcludedBtn = document.getElementById(
      "n-remove-bulk-excluded"
    );
    const addBulkExcludedExceptBtn = document.getElementById(
      "n-add-bulk-excluded-except"
    );
    const bulkExcludedArea = document.getElementById("n-bulk-excluded-area");
    const bulkExcludedExceptArea = document.getElementById(
      "n-bulk-excluded-except-area"
    );
    const bulkRemoveExcludedArea = document.getElementById(
      "n-bulk-remove-excluded-area"
    );

    const bulkExcludedList = document.getElementById("n-bulk-excluded-list");
    const bulkRemoveExcludedList = document.getElementById(
      "n-bulk-remove-excluded-list"
    );
    const bulkExcludedExceptList = document.getElementById(
      "n-bulk-excluded-except-list"
    );

    const closeTariffsBtn = document.getElementById("n-tariffs-close");

    const openLogsBtn = document.getElementById("n-logs-open-btn");
    const closeLogsBtn = document.getElementById("n-logs-close");
    const addNotesLogs = document.getElementById("n-logs-add-notes-btn");
    const addNotesText = document.getElementById("n-add-logs-text");
    const addNotesSendBtn = document.getElementById("n-logs-note-send-btn");
    const logsFilterBtns = [
      ...document.querySelectorAll("#n-logs-filters-btn"),
    ];

    const addMassFixedBtn = document.getElementById("n-add-mass-fixed-btn");
    const addBulkFixedBtn = document.getElementById("n-add-bulk-fixed");
    const bulkFixedArea = document.getElementById("n-bulk-fixed-area");
    const bulkFixedList = document.getElementById("n-bulk-fixed-list");

    const setFixedActiveStatusBtn = document.getElementById(
      "n-set-fixed-active-status-btn"
    );
    const setFixedInactiveStatusBtn = document.getElementById(
      "n-set-fixed-inactive-status-btn"
    );

    const destinationBtn = document.getElementById("n-destination-btn");
    const tagBtn = document.getElementById("n-tag-btn");
    const destinationName = document.getElementById("n-destination-name");
    const destintaionSelector = document.getElementById("n-regions-selector");
    const appTypeBtns = [...document.querySelectorAll("#n-apptype-select")];
    const regionBtns = [...document.querySelectorAll("#n-region-select")];

    const handleAppTypeBtn = (el) => {
      if (el.dataset.apptype === CURRENT_APPTYPE) {
        el.classList.add("n-tools-select-active");
      } else {
        el.classList.remove("n-tools-select-active");
      }
    };

    appTypeBtns.forEach(handleAppTypeBtn);

    appTypeBtns.forEach((el) =>
      el.addEventListener("click", (item) => {
        CURRENT_APPTYPE = item.target.dataset.apptype;
        localStorage.setItem("neuromarket-apptype", CURRENT_APPTYPE);
        appTypeBtns.forEach(handleAppTypeBtn);
        destintaionSelector.style.display = "none";
      })
    );

    const tagSelector = document.getElementById("n-tag-selector");

    const searchClearBtn = document.getElementById("n-search-close-btn");
    const searchExcludedClearBtn = document.getElementById(
      "n-search-excluded-close-btn"
    );
    const searchFixedClearBtn = document.getElementById(
      "n-search-fixed-close-btn"
    );

    // USER ID BADGE

    const userIdShowBtn = document.getElementById("n-user-id-show-btn");
    const userIdValueElement = document.getElementById("n-user-id-value");

    // CUSTOM LISTS
    const customListsElement = document.getElementById("n-custom-lists");
    const customListsAddInput = document.getElementById(
      "n-add-custom-list-input"
    );
    const customListsAddButton = document.getElementById(
      "n-add-custom-list-btn"
    );
    const customListsWrap = document.getElementById("n-add-custom-list-wrap");
    const customListInputWrap = document.getElementById(
      "n-add-custom-list-input-wrap"
    );
    const customListsColorsWrap = document.getElementById(
      "n-add-custom-list-colors-wrap"
    );
    const customListsColorsSelectBtns = [
      ...document.querySelectorAll("#n-add-custom-list-color-select-btn"),
    ];
    const customListsColorBtn = document.getElementById(
      "n-add-custom-list-color-btn"
    );
    const customListsColorBtnChevron = document.getElementById(
      "n-add-custom-list-color-btn-chevron"
    );
    const customListsColorSelected = document.getElementById(
      "n-add-custom-list-color-selected"
    );
    const customListsSubmitButton = document.getElementById(
      "n-add-custom-list-submit-btn"
    );
    const customListsCloseButton = document.getElementById(
      "n-add-custom-list-close-btn"
    );
    // -------------

    // TARIFFS

    const tariffs = {
      1: {
        id: 1,
        days: 30,
        price: 1690
      },
      2: {
        id: 2,
        days: 90,
        price: 4818
      },
      3: {
        id: 3,
        days: 180,
        price: 9126
      },
      4: {
        id: 4,
        days: 360,
        price: 16224
      },
    }

    let selectedTariff = tariffs[1]
    let selectedPromo = null;

    const tariffMonthBtns = document.querySelectorAll("#n-tariffs-months-btn")
    const tariffPayDays = document.getElementById("n-tariffs-pay-days")
    const tariffPayPrice = document.getElementById("n-tariffs-pay-price")
    const tariffLegalCheckbox = document.getElementById("n-legal-checkbox")
    const tariffPayBtn = document.getElementById("n-tariff-pay-btn")
    const tariffPromocodeInputWrap = document.getElementById("n-tariffs-promocode-input-wrap")
    const tariffPromocodeActivatedWrap = document.getElementById("n-tariffs-promocode-activated-wrap")
    const tariffPromocodeActivatedText = document.getElementById("n-tariffs-promocode-activated-text")
    const tariffPromocodeInput = document.getElementById("n-tariffs-promocode-input")
    const tariffHavePromocodeWrap = document.getElementById("n-tariffs-have-promocode-wrap")
    const tariffHavePromocodeBtn = document.getElementById("n-tariffs-have-promocode")
    const tariffPromocodeCloseBtn = document.getElementById("n-tariffs-promocode-close-btn")
    const tariffPromocodeActivateBtn = document.getElementById("n-tariffs-promocode-activate-btn")

    const tariffDiscountWrap = document.getElementById("n-tariffs-pay-discount-wrap")
    const tariffDiscountText = document.getElementById("n-tariffs-pay-discount-text")

    const showToast = function (message) {
      Toastify({
        text: message,
        duration: 2000,
        newWindow: true,
        gravity: "bottom", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        style: {
          background: "linear-gradient(to right, #162033, #253144)",
          fontSize: "0.8em",
          maxWidth: "300px",
          borderRadius: "10px",
          border: "1px solid #334155",
          boxShadow: "0",
        },
        offset: {
          y: 200, // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
      }).showToast();
    }

    tariffPromocodeActivateBtn.addEventListener("click", async () => {
      const promoCode = tariffPromocodeInput.value?.toLowerCase()
      if (!promoCode) {
        showToast("⌨ Введите Промокод")
        return;
      }

      const promoDataResponse = await Engine.requestPromo(Engine.userData.id, promoCode)
      const promoData = await promoDataResponse.json()
      if (promoData?.error) {
        if (promoData.error === "empty_request") {
          showToast("⛔ Пустой запрос. Попробуйте ввести другой промокод.")
          return;
        }
        if (promoData.error === "no_such_promo") {
          showToast("⛔ Не существует данного промокода")
          return;
        }
        if (promoData.error === "not_active") {
          showToast("⛔ Вышел срок действия промокода")
          return;
        }
        if (promoData.error === "expired") {
          showToast("⛔ Достигнут лимит на использование данного промокода")
          return;
        }
        if (promoData.error === "already_activated") {
          showToast("⛔ Вы уже использовали данный промокод раннее")
          return;
        }
        if (promoData.error === "unknown") {
          showToast("⛔ Неизвестная ошибка. Напишите нам в телеграм чат")
          return;
        }
        return;
      }

      if (promoData?.isFree && promoData?.activated) {
        showToast(`✅ Активирован промокод "${promoData.name}" на ${promoData.days} дней. Страница автоматически перезагрузится через 3 секунды.`)
        setTimeout(() => location.reload(), 3000)
        return;
      }

      selectedPromo = promoData;

      tariffPromocodeInputWrap.style.display = "none"
      tariffPromocodeActivatedWrap.style.display = 'flex'
      tariffPromocodeActivatedText.innerText = `Активирован промокод "${promoData.name}" со скидкой ${promoData.discount}%`
      tariffDiscountWrap.style.display = "flex"
      tariffDiscountText.innerText = promoData.discount
      tariffPayPrice.innerText = (selectedTariff.price * ((100 - promoData.discount) / 100)).toFixed(0)

    })

    tariffHavePromocodeBtn.addEventListener("click", () => {
      tariffHavePromocodeWrap.style.display = 'none'
      tariffPromocodeInputWrap.style.display = 'flex'
    })

    tariffPromocodeCloseBtn.addEventListener("click", () => {
      tariffHavePromocodeWrap.style.display = 'flex'
      tariffPromocodeInputWrap.style.display = 'none'
    })

    tariffLegalCheckbox.addEventListener("click", () => {
      if (tariffLegalCheckbox.checked) {
        tariffPayBtn.classList.remove("n-nav-btn-pay-disabled")
      } else {
        tariffPayBtn.classList.add("n-nav-btn-pay-disabled")
      }
    })

    tariffPayBtn.addEventListener("click", async () => {
      if (!tariffLegalCheckbox.checked) return;
      if (!Engine?.userData?.id) return;
      const userId = Engine.userData.id
      const tariffId = selectedTariff.id
      const campaignId = Engine.campaignId;
      const promoCode = selectedPromo?.code ?? null;

      const newWindow = window.open('', '_blank');

      const response = await Engine.createPayment(userId, tariffId, promoCode, campaignId)
      const payment = await response.json();
      if (payment?.error) {
        if (payment.error === "empty_request") {
          showToast("⛔ Пустой запрос. Попробуйте ввести другой промокод.")
          return;
        }
        if (payment.error === "no_such_promo") {
          showToast("⛔ Не существует данного промокода")
          return;
        }
        if (payment.error === "not_active") {
          showToast("⛔ Вышел срок действия промокода")
          return;
        }
        if (payment.error === "expired") {
          showToast("⛔ Достигнут лимит на использование данного промокода")
          return;
        }
        if (payment.error === "already_activated") {
          showToast("⛔ Вы уже использовали данный промокод раннее")
          return;
        }
        if (payment.error === "unknown") {
          showToast("⛔ Неизвестная ошибка. Напишите нам в телеграм чат")
          return;
        }
      }
      if (payment?.confirm) {
        if (newWindow) {
          newWindow.location = PAY_HOST + "pay?id=" + encodeURIComponent(btoa(payment.confirm))
          return;
        } else {
          window.location.href = PAY_HOST + "pay?id=" + encodeURIComponent(btoa(payment.confirm))
        }
      }

      showToast("⛔ Неизвестная ошибка. Попробуйте обновить страницу.")
    })

    tariffMonthBtns.forEach(tariffMonthBtn => {
      tariffMonthBtn.addEventListener("click", () => {
        tariffMonthBtns.forEach(el => el.classList.remove("n-tariffs-months-btn-active"))
        tariffMonthBtn.classList.add("n-tariffs-months-btn-active")

        const tariffId = tariffMonthBtn.dataset.tariffId
        const tariff = tariffs[tariffId]
        selectedTariff = tariff
        tariffPayDays.innerText = tariff.days
        tariffPayPrice.innerText = selectedPromo ? (tariff.price * ((100 - selectedPromo.discount) / 100)).toFixed(0) : tariff.price
      })
    })
    // -------------

    const eraseFiltersBtn = document.getElementById("n-erase-filters-btn");
    const keywordsAllCheckbox = document.getElementById("keywordsAllCheckbox");
    const excludedAllCheckbox = document.getElementById("excludedAllCheckbox");
    const fixedAllCheckbox = document.getElementById("fixedAllCheckbox");
    const expandButton = document.getElementById("n-expand-btn");
    const collapseButton = document.getElementById("n-collapse-btn");
    const keywordsListElement = document.getElementById("n-keywords-list");
    const datesListElement = document.getElementById("n-dates-list");
    const excludedListElement = document.getElementById("n-excluded-list");
    const fixedListElement = document.getElementById("n-fixed-list");
    const showListsButton = document.getElementById("n-show-lists-btn");
    const checkPositionsButton = document.getElementById(
      "n-check-positions-btn"
    );
    const refreshWordsButton = document.getElementById("n-refresh-btn");
    const clusterizeButton = document.getElementById("n-clusterize-btn");
    const exportButton = document.getElementById("n-export-btn");
    const showOnlyDangerButton = document.getElementById("n-only-danger-btn");
    const showOnlyActiveClusters = document.getElementById("n-only-active-btn");
    const showOnlyOffClusters = document.getElementById("n-only-off-btn");
    const showOnlyNotFoundClusters = document.getElementById(
      "n-only-not-found-btn"
    );
    const showOnlyPKClusters = document.getElementById("n-only-pk-btn");
    const showOnlyAutoClusters = document.getElementById("n-only-auto-btn");
    const showOnlyNewPhrasesBtn = document.getElementById(
      "n-only-new-phrases-btn"
    );
    const showOnlyPhrasesWithoutBoostBtn = document.getElementById(
      "n-only-without-boost-btn"
    );
    const showOnlyFoundClusters = document.getElementById("n-only-found-btn");
    const showOnlyFixedClusters = document.getElementById("n-only-fixed-btn");
    const showOnlyUnfixedClusters =
      document.getElementById("n-only-unfixed-btn");
    const removeKeywordButton = document.getElementById(
      "n-remove-keyword-button"
    );
    const restoreKeywordButton = document.getElementById(
      "n-restore-keyword-button"
    );
    const restoreClusterButton = document.getElementById(
      "n-restore-cluster-button"
    );
    const restoreExcludedButton = document.getElementById(
      "n-restore-excluded-button"
    );
    const restoreFixedButton = document.getElementById(
      "n-restore-fixed-button"
    );
    const excludeFixedButton = document.getElementById(
      "n-exclude-fixed-button"
    );
    const fixKeywordButton = document.getElementById("n-fix-keyword-button");
    const unfixKeywordButton = document.getElementById(
      "n-unfix-keyword-button"
    );
    const searchElement = document.getElementById("n-search");
    const searchExcludedElement = document.getElementById("n-excluded-search");
    const searchFixedElement = document.getElementById("n-fixed-search");
    const tableColumns = document.querySelectorAll("#n-column");
    const tableExcludedColumns =
      document.querySelectorAll("#n-excluded-column");
    const tableFixedColumns = document.querySelectorAll("#n-fixed-column");
    const topLoader = document.getElementById("n-top-loader");

    const freqFromInput = document.getElementById("n-freq-from-input");
    const freqToInput = document.getElementById("n-freq-to-input");

    const sumFreqFromInput = document.getElementById("n-sum-freq-from-input");
    const sumFreqToInput = document.getElementById("n-sum-freq-to-input");
    const positionFromInput = document.getElementById("n-position-from-input");
    const positionToInput = document.getElementById("n-position-to-input");
    const positionBoostFromInput = document.getElementById(
      "n-position-boost-from-input"
    );
    const positionBoostToInput = document.getElementById(
      "n-position-boost-to-input"
    );
    const positionDeltaFromInput = document.getElementById(
      "n-position-delta-from-input"
    );
    const positionDeltaToInput = document.getElementById(
      "n-position-delta-to-input"
    );
    const countFromInput = document.getElementById("n-count-from-input");
    const countToInput = document.getElementById("n-count-to-input");
    const clicksFromInput = document.getElementById("n-clicks-from-input");
    const clicksToInput = document.getElementById("n-clicks-to-input");
    const ctrFromInput = document.getElementById("n-ctr-from-input");
    const ctrToInput = document.getElementById("n-ctr-to-input");
    const cpcFromInput = document.getElementById("n-cpc-from-input");
    const cpcToInput = document.getElementById("n-cpc-to-input");
    const moneyFromInput = document.getElementById("n-money-from-input");
    const moneyToInput = document.getElementById("n-money-to-input");

    const load7DaysBtn = document.getElementById("n-load-7-days-btn");
    const loadFullStatsBtn = document.getElementById("n-load-full-stats-btn");
    const switchSevenToAllStatsBtn = document.getElementById(
      "switch-seven-to-all-stats-btn"
    );

    const adBtn = document.getElementById("n-ad-btn");
    const adFirstBtn = document.getElementById("n-ad-inside-first-btn");
    const adSecondBtn = document.getElementById("n-ad-inside-second-btn");
    const adDescription = document.getElementById("n-ad-description");
    let isOverAdDescription = false;

    if (userIdValueElement.getAttribute("listener") !== "true") {
      userIdValueElement.setAttribute("listener", "true");
      userIdValueElement.addEventListener("click", async () => {
        await navigator.clipboard.writeText(Engine.userData.id);
        Toastify({
          text: `✅ Идентификатор скопирован`,
          duration: 3000,
          newWindow: true,
          gravity: "bottom",
          position: "center",
          style: {
            background: "linear-gradient(to right, #162033, #253144)",
            fontSize: "0.8em",
            maxWidth: "300px",
            borderRadius: "10px",
            border: "1px solid #334155",
            boxShadow: "0",
          },
          offset: {
            y: 200,
          },
        }).showToast();
      });
    }

    if (eraseFiltersBtn.getAttribute("listener") !== "true") {
      eraseFiltersBtn.setAttribute("listener", "true");
      eraseFiltersBtn.addEventListener("click", () => {
        if (eraseFiltersBtn.classList.contains("n-btn-vertical-disabled"))
          return;

        Engine.sumFreqFromFilter = null;
        Engine.sumFreqToFilter = null;
        Engine.freqFromFilter = null;
        Engine.freqToFilter = null;
        Engine.positionFromFilter = null;
        Engine.positionToFilter = null;
        Engine.positionDeltaFromFilter = null;
        Engine.positionDeltaToFilter = null;
        Engine.positionBoostFromFilter = null;
        Engine.positionBoostToFilter = null;
        Engine.countFromFilter = null;
        Engine.countToFilter = null;
        Engine.clicksFromFilter = null;
        Engine.clicksToFilter = null;
        Engine.ctrFromFilter = null;
        Engine.ctrToFilter = null;
        Engine.cpcFromFilter = null;
        Engine.cpcToFilter = null;
        Engine.moneyFromFilter = null;
        Engine.moneyToFilter = null;

        sumFreqFromInput.value = "";
        sumFreqToInput.value = "";
        freqFromInput.value = "";
        freqToInput.value = "";
        positionFromInput.value = "";
        positionToInput.value = "";
        positionBoostFromInput.value = "";
        positionBoostToInput.value = "";
        positionDeltaFromInput.value = "";
        positionDeltaToInput.value = "";
        countFromInput.value = "";
        countToInput.value = "";
        clicksFromInput.value = "";
        clicksToInput.value = "";
        ctrFromInput.value = "";
        ctrToInput.value = "";
        cpcFromInput.value = "";
        cpcToInput.value = "";
        moneyFromInput.value = "";
        moneyToInput.value = "";

        keywordsListElement.innerHTML = Engine.renderKeywordsList();
        eraseFiltersBtn.classList.add("n-btn-vertical-disabled");
      });
    }

    if (userIdShowBtn.getAttribute("listener") !== "true") {
      userIdShowBtn.setAttribute("listener", "true");
      userIdShowBtn.addEventListener("click", () => {
        const isHidden = userIdShowBtn.dataset?.hidden === "true";
        const userIdValueElement = document.getElementById("n-user-id-value");
        if (isHidden) {
          userIdShowBtn.dataset.hidden = "false";
          userIdShowBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
            </svg>`;
          userIdValueElement.innerText = Engine.userData.id;
        } else {
          userIdShowBtn.dataset.hidden = "true";
          userIdShowBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>`;
          const userId = String(Engine.userData.id);
          userIdValueElement.innerText = maskString(userId, 4);
        }
      });
    }

    if (customListsAddButton.getAttribute("listener") !== "true") {
      customListsAddButton.setAttribute("listener", "true");
      customListsAddButton.addEventListener("click", () => {
        customListsWrap.style.display = "flex";
        customListsAddButton.style.display = "none";
        customListsElement.scrollLeft = 99999;
      });
    }

    if (customListsAddInput.getAttribute("listener") !== "true") {
      customListsAddInput.setAttribute("listener", "true");
      customListsAddInput.addEventListener("keydown", (e) => {
        if (e.keyCode === 13) {
          e.preventDefault();
        }
      });
    }

    if (customListsCloseButton.getAttribute("listener") !== "true") {
      customListsCloseButton.setAttribute("listener", "true");
      customListsCloseButton.addEventListener("click", () => {
        customListsAddButton.style.display = "flex";
        customListsWrap.style.display = "none";
        customListsAddInput.innerText = "";
      });
    }

    if (customListsColorBtn.getAttribute("listener") !== "true") {
      customListsColorBtn.setAttribute("listener", "true");
      customListsColorBtn.addEventListener("click", () => {
        customListsColorsWrap.style.display = "flex";
        customListsColorBtnChevron.style.transform = "rotate(180deg)";
      });
    }

    if (customListsSubmitButton.getAttribute("listener") !== "true") {
      customListsSubmitButton.setAttribute("listener", "true");
      customListsSubmitButton.addEventListener("click", async () => {
        const listName = customListsAddInput.innerText;
        if (listName.length > 1 && listName.length <= 60) {
          customListsSubmitButton.style.padding = "4px 6px 4px 6px";
          customListsSubmitButton.innerHTML = checkLoader;
          const result = await Engine.addCustomList(listName);
          customListsAddInput.innerText = "";
          customListsSubmitButton.style.padding = "4px 9px 4px 6px";
          customListsSubmitButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" style="width: 12px; height:12px;" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span>Создать</span>
            `;
          if (result) {
            customListsAddButton.style.display = "flex";
            customListsWrap.style.display = "none";
            await Engine.getCustomLists();
          }
        } else {
          Toastify({
            text: `⛔ Название списка должно быть от 2 и до 60 символов.`,
            duration: 3000,
            newWindow: true,
            gravity: "bottom", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            style: {
              background: "linear-gradient(to right, #162033, #253144)",
              fontSize: "0.8em",
              maxWidth: "300px",
              borderRadius: "10px",
              border: "1px solid #334155",
              boxShadow: "0",
            },
            offset: {
              y: 200, // vertical axis - can be a number or a string indicating unity. eg: '2em'
            },
          }).showToast();
        }
      });
    }

    customListsColorsSelectBtns.forEach((customListsColorsSelectBtn) => {
      if (customListsColorsSelectBtn.getAttribute("listener") !== "true") {
        customListsColorsSelectBtn.setAttribute("listener", "true");
        customListsColorsSelectBtn.addEventListener("click", () => {
          const color = customListsColorsSelectBtn.dataset.color;
          Engine.customListsSelectedColor = color;
          customListInputWrap.style.color = "#" + color;
          customListsAddInput.style.color = "#" + color;
          document.documentElement.style.setProperty(
            "--n-custom-list-input-color",
            "#" + color
          );
          customListsColorsWrap.style.display = "none";
          customListsColorBtnChevron.style.transform = "rotate(0deg)";
          setTimeout(() => {
            customListsAddInput.focus();
          }, 0);
          if (customListsAddInput.hasChildNodes()) {
            let s = window.getSelection();
            let r = document.createRange();
            let e =
              customListsAddInput.childElementCount > 0
                ? customListsAddInput.lastChild
                : customListsAddInput;
            r.setStart(e, 1);
            r.setEnd(e, 1);
            s.removeAllRanges();
            s.addRange(r);
          }
        });
      }
    });

    if (adBtn.getAttribute("listener") !== "true") {
      adBtn.setAttribute("listener", "true");
      adBtn.addEventListener("mouseenter", (e) => {
        isOverAdDescription = true;
        adDescription.style.display = "flex";
      });

      adBtn.addEventListener("mouseleave", (e) => {
        isOverAdDescription = false;
        setTimeout(() => {
          if (isOverAdDescription) return;
          adDescription.style.display = "none";
        }, 200);
      });

      adBtn.addEventListener("click", (e) => {
      });

      adFirstBtn.addEventListener("click", (e) => {
      });

      adSecondBtn.addEventListener("click", (e) => {
      });

      let isRead = false;
      adDescription.addEventListener("mouseover", (e) => {
        isOverAdDescription = true;
        if (!isRead) {
          isRead = true;
        }
      });

      adDescription.addEventListener("mouseout", (e) => {
        isOverAdDescription = false;
        if (isOverAdDescription) return;
        setTimeout(() => {
          if (isOverAdDescription) return;
          adDescription.style.display = "none";
        }, 200);
      });
    }

    if (switchSevenToAllStatsBtn.getAttribute("listener") !== "true") {
      switchSevenToAllStatsBtn.setAttribute("listener", "true");
      switchSevenToAllStatsBtn.addEventListener("click", (e) => {
        Engine.onlySevenDays = false;
        loadAllData();
      });
    }

    if (load7DaysBtn.getAttribute("listener") !== "true") {
      load7DaysBtn.setAttribute("listener", "true");
      load7DaysBtn.addEventListener("click", (e) => {
        Engine.onlySevenDays = true;
        loadAllData();
      });
    }

    if (loadFullStatsBtn.getAttribute("listener") !== "true") {
      loadFullStatsBtn.setAttribute("listener", "true");
      loadFullStatsBtn.addEventListener("click", (e) => {
        // Toastify({
        //   text: `⛔ Невозможно загрузить полную статистику.
        //   Сейчас установлено ограничение от ВБ на 15 дней. Загружайте статистику за 15 дней (Зелёная кнопка рядом).`,
        //   duration: 3000,
        //   newWindow: true,
        //   gravity: "bottom", // `top` or `bottom`
        //   position: "center", // `left`, `center` or `right`
        //   style: {
        //     background: "linear-gradient(to right, #162033, #253144)",
        //     fontSize: "0.8em",
        //     maxWidth: "300px",
        //     borderRadius: "10px",
        //     border: "1px solid #334155",
        //     boxShadow: "0",
        //   },
        //   offset: {
        //     y: 200, // vertical axis - can be a number or a string indicating unity. eg: '2em'
        //   },
        // }).showToast();
        Engine.onlySevenDays = false;
        loadAllData();
      });
    }

    const mainChartSelectors = [
      ...document.querySelectorAll("#n-main-chart-selector-item"),
    ];

    const hideActionButtons = () => {
      restoreClusterButton.style.display = "none";
      restoreKeywordButton.style.display = "none";
      restoreExcludedButton.style.display = "none";
      removeKeywordButton.style.display = "none";
      restoreFixedButton.style.display = "none";
      excludeFixedButton.style.display = "none";
      fixKeywordButton.style.display = "none";
      unfixKeywordButton.style.display = "none";
    };

    if (window.__NEUROMARKET_AD_TYPE !== "AUTO") {
      createSearchAdCampaignBtn.style.display = "none";
    } else {
      cancelModalBtn.addEventListener("click", () => {
        const overlay = document.getElementById("n-overlay-blured");
        overlay.style.display = "none";
      });

      createTurboAdBtn.addEventListener("click", async () => {
        const overlay = document.getElementById("n-overlay-blured");
        overlay.style.display = "none";

        if (!Engine?.placement?.nms[0]?.nm) return;
        const nmId = Engine.placement.nms[0].nm;
        const { id: campaignId } = await Engine.createSeacatAdCampaign([nmId]);
        await Engine.setExcludedSeacatAdCampaign(campaignId);
        window.open(
          "https://cmp.wildberries.ru/campaigns/edit/" + campaignId,
          "_blank"
        );
      });

      createSearchAdCampaignBtn.addEventListener("click", async () => {
        const overlay = document.getElementById("n-overlay-blured");
        const nmSpan = document.getElementById("n-modal-nm");
        nmSpan.innerText = Engine?.placement?.nms[0]?.nm;
        overlay.style.display = "flex";
      });
    }

    mainChartSelectors.forEach((item) => {
      if (item.getAttribute("listener") !== "true") {
        item.setAttribute("listener", "true");
        item.addEventListener("click", (e) => {
          e.preventDefault();
          const wasActive =
            item.getAttribute("data-is-active") === "true" ? true : false;
          const isActive = !wasActive;
          const color = item.dataset.color;
          const name = item.dataset.name;
          const accessor = item.dataset.accessor;
          const axisId = item.dataset.axisId;
          const type = item.dataset.type;

          if (isActive) {
            Engine.selectedChartData.push({
              accessor,
              name,
              color,
              axisId,
              type,
            });
          } else {
            Engine.selectedChartData = Engine.selectedChartData.filter(
              (item) => item.accessor !== accessor
            );
          }

          Engine.renderMainChart();

          const circle = item.getElementsByClassName(
            `n-main-chart-selector-item-circle${wasActive ? "-active" : ""}`
          )[0];
          item.setAttribute("data-is-active", !wasActive);
          item.classList.remove(
            `n-main-chart-selector-item${wasActive ? "-active" : ""}`
          );
          item.classList.add(
            `n-main-chart-selector-item${wasActive ? "" : "-active"}`
          );
          circle.classList.remove(
            `n-main-chart-selector-item-circle${wasActive ? "-active" : ""}`
          );
          circle.classList.add(
            `n-main-chart-selector-item-circle${wasActive ? "" : "-active"}`
          );
          item.style.color = wasActive ? "inherit" : color;
        });
      }
    });

    logsFilterBtns.forEach((btn) => {
      if (btn.getAttribute("listener") !== "true") {
        btn.setAttribute("listener", "true");
        const existFilters = {
          note: ["note"],
          phrase: ["add-fixed", "remove-fixed", "restore-excluded", "exclude"],
          fix: ["set-fixed-status", "set-fixed-status"],
          status: ["set-status", "set-status"],
        };
        btn.addEventListener("click", async () => {
          const wasActive = btn.classList.contains("n-tools-select-active");
          const isActive = !wasActive;
          const type = btn.dataset.type;

          if (isActive) {
            btn.classList.add("n-tools-select-active");
            Engine.campaignLogsFilter = [
              ...Engine.campaignLogsFilter,
              ...existFilters[type],
            ];
          } else {
            btn.classList.remove("n-tools-select-active");
            Engine.campaignLogsFilter = Engine.campaignLogsFilter.filter(
              (item) => !existFilters[type].includes(item)
            );
          }
        });
      }
    });

    if (addNotesSendBtn.getAttribute("listener") !== "true") {
      addNotesSendBtn.setAttribute("listener", "true");
      addNotesSendBtn.addEventListener("click", async () => {
        const text = addNotesText.innerText;

        addNotesText.innerHTML = `
        <div style="width: 100%; height: 100%; display: flex; justify-content: center; align-items:center;">
          ${checkLoader}
        </div>
      `;

        if (text.length < 3 || addNotesText.length > 1000) {
          Toastify({
            text: "Текст заметки должен быть от 3 до 1000 символов",
            duration: 3000,
            newWindow: true,
            gravity: "bottom", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            style: {
              background: "linear-gradient(to right, #162033, #253144)",
              fontSize: "0.8em",
              maxWidth: "300px",
              borderRadius: "10px",
              border: "1px solid #334155",
              boxShadow: "0",
            },
            offset: {
              y: 200, // vertical axis - can be a number or a string indicating unity. eg: '2em'
            },
          }).showToast();
          addNotesText.innerText = text;
          return;
        }
        await Logger.send({
          type: "note",
          data: { text },
        });
        await Engine.getCampaignLogs();
        addNotesText.innerText = "";
      });
    }

    closeTariffsBtn.addEventListener("click", () => {
      const tariffsOverlayElement = document.getElementById("n-tariffs-overlay");
      tariffsOverlayElement.style.display = "none";
    });

    addNotesLogs.addEventListener("click", (e) => {
      e.preventDefault();
      const wrapper = document.getElementById("n-add-logs-wrap");

      wrapper.style.display =
        wrapper.style.display === "flex" ? "none" : "flex";
    });

    openLogsBtn.addEventListener("click", () => {
      const logsOverlay = document.getElementById("n-logs-overlay");
      logsOverlay.style.display = "flex";
    });


    closeLogsBtn.addEventListener("click", () => {
      const logsOverlay = document.getElementById("n-logs-overlay");
      logsOverlay.style.display = "none";
    });

    destinationBtn.addEventListener("click", () => {
      if (destintaionSelector.style.display === "none") {
        destintaionSelector.style.display = "block";
      } else {
        destintaionSelector.style.display = "none";
      }
    });

    tagBtn.addEventListener("click", () => {
      if (tagSelector.style.display === "none") {
        tagSelector.style.display = "flex";
      } else {
        tagSelector.style.display = "none";
      }
    });

    addMassExcludedBtn.addEventListener("click", () => {
      if (bulkExcludedArea.style.display === "none") {
        bulkExcludedArea.style.display = "block";
        bulkExcludedList.focus();
      } else {
        bulkExcludedArea.style.display = "none";
      }
    });

    addMassExcludedExceptBtn.addEventListener("click", () => {
      if (bulkExcludedExceptArea.style.display === "none") {
        bulkExcludedExceptArea.style.display = "block";
        bulkExcludedExceptList.focus();
      } else {
        bulkExcludedExceptArea.style.display = "none";
      }
    });

    removeMassExcludedExceptBtn.addEventListener("click", () => {
      if (bulkRemoveExcludedArea.style.display === "none") {
        bulkRemoveExcludedArea.style.display = "block";
        bulkExcludedExceptList.focus();
      } else {
        bulkRemoveExcludedArea.style.display = "none";
      }
    });

    addMassFixedBtn.addEventListener("click", () => {
      if (bulkFixedArea.style.display === "none") {
        bulkFixedArea.style.display = "block";
        bulkFixedList.focus();
      } else {
        bulkFixedArea.style.display = "none";
      }
    });

    addBulkExcludedBtn.addEventListener("click", async () => {
      const list = bulkExcludedList.innerText
        .split("\n")
        .filter((text) => text !== "")
        .map((text) => text.trim());
      const mergedList = [
        ...Engine.wordsStats.excluded.map((ex) => ex.keyword),
        ...list,
      ];
      addBulkExcludedBtn.innerHTML = checkLoader;
      setLoading(true, "Добавляем минус-фразы");
      await Engine.setExcluded(mergedList);
      Logger.send({
        type: "exclude",
        data: { keywords: list },
      });
      addBulkExcludedBtn.innerText = "Добавить минус-фразы";
      setLoading(true, "Загрузка ключевых фраз");
      bulkExcludedArea.style.display = "none";
      Engine.loadWordsStats()
        .then(() => setLoading(false))
        .catch(() => setLoading(false, "Ошибка загрузки Ключевых Фраз"));
    });

    addBulkRemoveExcludedBtn.addEventListener("click", async () => {

      const clustersToRestore = new Set();
      const keywordsToRestore = [];

      const list = bulkRemoveExcludedList.innerText
        .split("\n")
        .filter((text) => text !== "")
        .map((text) => text.trim());

      Engine.wordsStats.excluded.forEach(excluded => {
        if (!list.includes(excluded.keyword)) return;
        if (excluded?.presetId > 0) {
          clustersToRestore.add(excluded.presetId)
        } else {
          keywordsToRestore.push(excluded.keyword)
        }
      })

      Engine.wordsStats.excluded.forEach(excluded => {
        if (!clustersToRestore.has(excluded?.presetId)) return;
        keywordsToRestore.push(excluded.keyword);
      });

      const mergedList = Engine.wordsStats.excluded
        .map((ex) => ex.keyword)
        .filter((keyword) => !keywordsToRestore.includes(keyword));

      addBulkRemoveExcludedBtn.innerHTML = checkLoader;
      setLoading(true, "Возвращаем из минус-фраз");
      await Engine.setExcluded(mergedList);
      Logger.send({
        type: "restore-excluded",
        data: { keywords: keywordsToRestore },
      });
      addBulkRemoveExcludedBtn.innerText = "Вернуть из минус-фраз";
      setLoading(true, "Загрузка ключевых фраз");
      bulkRemoveExcludedArea.style.display = "none";
      Engine.loadWordsStats()
        .then(() => setLoading(false))
        .catch(() => setLoading(false, "Ошибка загрузки Ключевых Фраз"));
    });

    addBulkExcludedExceptBtn.addEventListener("click", async () => {
      const list = bulkExcludedExceptList.innerText
        .split("\n")
        .filter((text) => text !== "")
        .map((text) => text.trim());

      const suspectPhrasesToBeActive = [];

      const whiteClusters = new Set(
        Engine.clustersRaw
          .filter((c) => {
            if (c.cluster_id === -1 && list.includes(c.keyword)) {
              suspectPhrasesToBeActive.push(c.keyword);
            }
            return c.cluster_id !== -1 && list.includes(c.keyword);
          })
          .map((c) => Number(c.cluster_id))
      );

      const blackClusters = new Set([-1]);

      const filteredKeywords = [
        ...Engine.wordsStats.keywords,
        ...Engine.wordsStats.excluded,
      ]
        .sort((a, b) => (b?.views?.count || 0) - (a?.views?.count || 0))
        .filter((e) => {
          const shouldRemove =
            !whiteClusters.has(e.presetId) &&
            !suspectPhrasesToBeActive.includes(e.keyword);
          if (shouldRemove) {
            if (!blackClusters.has(e.presetId)) {
              blackClusters.add(e.presetId);
            }
            return true;
          } else {
            return false;
          }
        });

      const mergedList = [...filteredKeywords.map((i) => i.keyword)];
      addBulkExcludedExceptBtn.innerHTML = checkLoader;
      setLoading(true, "Добавляем минус-фразы");
      await Engine.setExcluded(mergedList);
      Logger.send({
        type: "exclude",
        data: { keywords: mergedList },
      });
      addBulkExcludedExceptBtn.innerText =
        "Добавить всё в исключения кроме введенных";
      setLoading(true, "Загрузка ключевых фраз");
      bulkExcludedExceptArea.style.display = "none";
      Engine.loadWordsStats()
        .then(() => setLoading(false))
        .catch(() => setLoading(false, "Ошибка загрузки Ключевых Фраз"));
    });

    addBulkFixedBtn.addEventListener("click", async () => {
      const list = bulkFixedList.innerText
        .split("\n")
        .filter((text) => text !== "")
        .map((text) => text.trim());
      const mergedList = [
        ...Engine.wordsStats.fixed.map((ex) => ex.keyword),
        ...list,
      ];
      addBulkFixedBtn.innerHTML = checkLoader;
      setLoading(true, "Добавляем фикс-фразы");
      await Engine.setFixed(mergedList);
      Logger.send({
        type: "add-fixed",
        data: { keywords: list },
      });
      addBulkFixedBtn.innerText = "Добавить фикс-фразы";
      setLoading(true, "Загрузка ключевых фраз");
      bulkFixedArea.style.display = "none";
      Engine.loadWordsStats()
        .then(() => setLoading(false))
        .catch(() => setLoading(false, "Ошибка загрузки Ключевых Фраз"));
    });

    setFixedActiveStatusBtn.addEventListener("click", async () => {
      setLoading(true, "Включаем режим фикс-фраз");
      await Engine.setFixedStatus(true);
      setLoading(true, "Загрузка ключевых фраз");
      loadAllData();
    });

    setFixedInactiveStatusBtn.addEventListener("click", async () => {
      setLoading(true, "Выключаем режим фикс-фраз");
      await Engine.setFixedStatus(false);
      setLoading(true, "Загрузка ключевых фраз");
      loadAllData();
    });

    const handleRegionBtn = (el) => {
      if (el.dataset.region === CURRENT_REGION) {
        el.classList.add("n-tools-select-active");
      } else {
        el.classList.remove("n-tools-select-active");
      }
    };

    regionBtns.forEach((item) => {
      item.addEventListener("click", (el) => {
        const region = el.target.dataset.region;
        CURRENT_REGION = region;
        localStorage.setItem("neuromarket-region-name", CURRENT_REGION);
        destinationName.innerText = REGIONS[region].name;
        Engine.region = REGIONS[region];
        regionBtns.forEach(handleRegionBtn);
        destintaionSelector.style.display = "none";
      });
    });

    document.querySelectorAll("#n-tag-select").forEach((item) => {
      item.addEventListener("click", async (el) => {
        const tag = el.target.dataset.tag;
        tagSelector.style.display = "none";
        if (Engine?.placement?.name) {
          tagBtn.innerHTML = checkLoader;
          await Engine.setCampaignTag(tag);
          tagBtn.innerText = "Установить тег";
        }
      });
    });

    searchClearBtn.addEventListener("click", () => {
      Engine.searchText = "";
      searchElement.value = "";
      searchClearBtn.style.display = "none";
      keywordsListElement.innerHTML = Engine.renderKeywordsList({
        searchText: Engine.searchText,
      });
    });

    searchExcludedClearBtn.addEventListener("click", () => {
      Engine.excludedSearchText = "";
      searchExcludedElement.value = "";
      searchExcludedClearBtn.style.display = "none";
      excludedListElement.innerHTML = Engine.renderExcludedList({
        searchText: Engine.excludedSearchText,
      });
    });

    if (restoreKeywordButton.getAttribute("listener") !== "true") {
      restoreKeywordButton.setAttribute("listener", "true");
      restoreKeywordButton.addEventListener("click", async () => {
        setLoading(true, "Возвращаем фразы из исключений");
        await Engine.restoreKeywords();
        hideActionButtons();
        keywordsAllCheckbox.checked = false;
        excludedAllCheckbox.checked = false;
        await delay(2000);
        setLoading(true, "Загрузка ключевых фраз");
        if ((await Engine.loadWordsStats()) === false) {
          setLoading(false, "Ошибка загрузки Ключевых Фраз");
          return;
        }

        // setLoading(true, "Загрузка частотности запросов");
        // if ((await Engine.loadKeywordsViews()) === false) {
        //   setLoading(false, "Ошибка загрузки частотности запросов");
        // }
        setLoading(true, "Загрузка данных по кластерам");
        if ((await Engine.clusterizeKeywords()) === false) {
          setLoading(false);
        }
        setLoading(false);
      });
    }

    if (restoreFixedButton.getAttribute("listener") !== "true") {
      restoreFixedButton.setAttribute("listener", "true");
      restoreFixedButton.addEventListener("click", async () => {
        setLoading(true, "Возвращаем фразы из фиксированных");
        await Engine.restoreFixed();
        hideActionButtons();
        keywordsAllCheckbox.checked = false;
        excludedAllCheckbox.checked = false;
        fixedAllCheckbox.checked = false;
        await delay(2000);
        setLoading(true, "Загрузка ключевых фраз");
        if ((await Engine.loadWordsStats()) === false) {
          setLoading(false, "Ошибка загрузки Ключевых Фраз");
          return;
        }

        // setLoading(true, "Загрузка частотности запросов");
        // if ((await Engine.loadKeywordsViews()) === false) {
        //   setLoading(false, "Ошибка загрузки частотности запросов");
        // }
        setLoading(true, "Загрузка данных по кластерам");
        if ((await Engine.clusterizeKeywords()) === false) {
          setLoading(false);
        }
        setLoading(false);
      });
    }

    if (excludeFixedButton.getAttribute("listener") !== "true") {
      excludeFixedButton.setAttribute("listener", "true");
      excludeFixedButton.addEventListener("click", async () => {
        setLoading(true, "Добавляем фразы в исключения");
        await Engine.excludeFixed();
        hideActionButtons();
        keywordsAllCheckbox.checked = false;
        excludedAllCheckbox.checked = false;
        fixedAllCheckbox.checked = false;
        await delay(2000);
        setLoading(true, "Загрузка ключевых фраз");
        if ((await Engine.loadWordsStats()) === false) {
          setLoading(false, "Ошибка загрузки Ключевых Фраз");
          return;
        }

        // setLoading(true, "Загрузка частотности запросов");
        // if ((await Engine.loadKeywordsViews()) === false) {
        //   setLoading(false, "Ошибка загрузки частотности запросов");
        // }
        setLoading(true, "Загрузка данных по кластерам");
        if ((await Engine.clusterizeKeywords()) === false) {
          setLoading(false);
        }
        setLoading(false);
      });
    }

    if (fixKeywordButton.getAttribute("listener") !== "true") {
      fixKeywordButton.setAttribute("listener", "true");
      fixKeywordButton.addEventListener("click", async () => {
        setLoading(true, "Фиксируем фразы");
        await Engine.addFixed();
        hideActionButtons();
        keywordsAllCheckbox.checked = false;
        excludedAllCheckbox.checked = false;
        fixedAllCheckbox.checked = false;
        await delay(2000);
        setLoading(true, "Загрузка ключевых фраз");
        if ((await Engine.loadWordsStats()) === false) {
          setLoading(false, "Ошибка загрузки Ключевых Фраз");
          return;
        }

        // setLoading(true, "Загрузка частотности запросов");
        // if ((await Engine.loadKeywordsViews()) === false) {
        //   setLoading(false, "Ошибка загрузки частотности запросов");
        // }
        setLoading(true, "Загрузка данных по кластерам");
        if ((await Engine.clusterizeKeywords()) === false) {
          setLoading(false);
        }
        setLoading(false);
      });
    }

    if (unfixKeywordButton.getAttribute("listener") !== "true") {
      unfixKeywordButton.setAttribute("listener", "true");
      unfixKeywordButton.addEventListener("click", async () => {
        setLoading(true, "Возвращаем фразы из фиксированных");
        await Engine.removeFixedFromKeywords();
        hideActionButtons();
        keywordsAllCheckbox.checked = false;
        excludedAllCheckbox.checked = false;
        fixedAllCheckbox.checked = false;
        await delay(2000);
        setLoading(true, "Загрузка ключевых фраз");
        if ((await Engine.loadWordsStats()) === false) {
          setLoading(false, "Ошибка загрузки Ключевых Фраз");
          return;
        }

        // setLoading(true, "Загрузка частотности запросов");
        // if ((await Engine.loadKeywordsViews()) === false) {
        //   setLoading(false, "Ошибка загрузки частотности запросов");
        // }
        setLoading(true, "Загрузка данных по кластерам");
        if ((await Engine.clusterizeKeywords()) === false) {
          setLoading(false);
        }
        setLoading(false);
      });
    }
    if (restoreClusterButton.getAttribute("listener") !== "true") {
      restoreClusterButton.setAttribute("listener", "true");
      restoreClusterButton.addEventListener("click", async () => {
        setLoading(true, "Включаем кластеры");
        await Engine.restoreClusters();
        hideActionButtons();
        keywordsAllCheckbox.checked = false;
        excludedAllCheckbox.checked = false;
        fixedAllCheckbox.checked = false;
        await delay(2000);
        setLoading(true, "Загрузка ключевых фраз");
        if ((await Engine.loadWordsStats()) === false) {
          setLoading(false, "Ошибка загрузки Ключевых Фраз");
          return;
        }

        // setLoading(true, "Загрузка частотности запросов");
        // if ((await Engine.loadKeywordsViews()) === false) {
        //   setLoading(false, "Ошибка загрузки частотности запросов");
        // }
        setLoading(true, "Загрузка данных по кластерам");
        if ((await Engine.clusterizeKeywords()) === false) {
          setLoading(false);
        }
        setLoading(false);
      });
    }
    if (restoreExcludedButton.getAttribute("listener") !== "true") {
      restoreExcludedButton.setAttribute("listener", "true");
      restoreExcludedButton.addEventListener("click", async () => {
        setLoading(true, "Возвращаем фразы из исключений");
        await Engine.restoreKeywords();
        hideActionButtons();
        keywordsAllCheckbox.checked = false;
        excludedAllCheckbox.checked = false;
        fixedAllCheckbox.checked = false;
        await delay(2000);
        setLoading(true, "Загрузка ключевых фраз");
        if ((await Engine.loadWordsStats()) === false) {
          setLoading(false, "Ошибка загрузки Ключевых Фраз");
          return;
        }

        // setLoading(true, "Загрузка частотности запросов");
        // if ((await Engine.loadKeywordsViews()) === false) {
        //   setLoading(false, "Ошибка загрузки частотности запросов");
        // }
        setLoading(true, "Загрузка данных по кластерам");
        if ((await Engine.clusterizeKeywords()) === false) {
          setLoading(false);
        }
        setLoading(false);
      });
    }
    if (removeKeywordButton.getAttribute("listener") !== "true") {
      removeKeywordButton.setAttribute("listener", "true");
      removeKeywordButton.addEventListener("click", async () => {
        setLoading(true, "Добавляем фразы в исключения");
        await Engine.removeKeywords();
        hideActionButtons();
        keywordsAllCheckbox.checked = false;
        excludedAllCheckbox.checked = false;
        fixedAllCheckbox.checked = false;
        await delay(2000);
        setLoading(true, "Загрузка ключевых фраз");
        if ((await Engine.loadWordsStats()) === false) {
          setLoading(false, "Ошибка загрузки Ключевых Фраз");
          return;
        }

        // setLoading(true, "Загрузка частотности запросов");
        // if ((await Engine.loadKeywordsViews()) === false) {
        //   setLoading(false, "Ошибка загрузки частотности запросов");
        // }
        setLoading(true, "Загрузка данных по кластерам");
        if ((await Engine.clusterizeKeywords()) === false) {
          setLoading(false);
        }
        setLoading(false);
      });
    }

    if (expandButton.getAttribute("listener") !== "true") {
      expandButton.setAttribute("listener", "true");
      expandButton.addEventListener("click", () => {
        nodeCollapsed.style.display = "none";
        node.style.display = "block";
        Engine.isWidgetOpen = true;
        if (window.nMainAnalyticsChart) {
          window.nMainAnalyticsChart.resize();
        }
      });

      collapseButton.addEventListener("click", () => {
        node.style.display = "none";
        nodeCollapsed.style.display = "block";
        Engine.isWidgetOpen = false;
      });
    }

    if (exportButton.getAttribute("listener") !== "true") {
      exportButton.setAttribute("listener", "true");
      exportButton.addEventListener("click", () => {
        Engine.exportXlsx();
      });
    }

    tableColumns.forEach((element) => {
      if (element.getAttribute("listener") !== "true") {
        element.setAttribute("listener", "true");
        element.addEventListener("click", (el) => {
          tableColumns.forEach((otherCols) => {
            otherCols.classList.remove("n-column-order-desc");
            otherCols.classList.remove("n-column-order-asc");
          });

          const column = el.target.dataset.name;
          if (Engine.sortOptions.column === column) {
            if (Engine.sortOptions.order === "desc") {
              Engine.sortOptions.order = "asc";
            } else {
              Engine.sortOptions.order = "desc";
            }
            el.target.classList.add(
              `n-column-order-${Engine.sortOptions.order}`
            );
            keywordsListElement.innerHTML = Engine.renderKeywordsList({
              searchText: Engine.searchText,
            });
          } else {
            Engine.sortOptions.column = column;
            Engine.sortOptions.order = "desc";
            keywordsListElement.innerHTML = Engine.renderKeywordsList({
              searchText: Engine.searchText,
            });
            el.target.classList.add(
              `n-column-order-${Engine.sortOptions.order}`
            );
          }
        });
      }
    });

    tableExcludedColumns.forEach((element) => {
      element.addEventListener("click", (el) => {
        tableExcludedColumns.forEach((otherCols) => {
          otherCols.classList.remove("n-column-order-desc");
          otherCols.classList.remove("n-column-order-asc");
        });

        const column = el.target.dataset.name;
        if (Engine.sortExcludedOptions.column === column) {
          if (Engine.sortExcludedOptions.order === "desc") {
            Engine.sortExcludedOptions.order = "asc";
          } else {
            Engine.sortExcludedOptions.order = "desc";
          }
          el.target.classList.add(
            `n-column-order-${Engine.sortExcludedOptions.order}`
          );
          excludedListElement.innerHTML = Engine.renderExcludedList({
            searchText: Engine.excludedSearchText,
          });
        } else {
          Engine.sortExcludedOptions.column = column;
          Engine.sortExcludedOptions.order = "desc";
          excludedListElement.innerHTML = Engine.renderExcludedList({
            searchText: Engine.excludedSearchText,
          });
          el.target.classList.add(
            `n-column-order-${Engine.sortExcludedOptions.order}`
          );
        }
      });
    });

    tableFixedColumns.forEach((element) => {
      element.addEventListener("click", (el) => {
        tableFixedColumns.forEach((otherCols) => {
          otherCols.classList.remove("n-column-order-desc");
          otherCols.classList.remove("n-column-order-asc");
        });

        const column = el.target.dataset.name;
        if (Engine.sortFixedOptions.column === column) {
          if (Engine.sortFixedOptions.order === "desc") {
            Engine.sortFixedOptions.order = "asc";
          } else {
            Engine.sortFixedOptions.order = "desc";
          }
          el.target.classList.add(
            `n-column-order-${Engine.sortFixedOptions.order}`
          );
          fixedListElement.innerHTML = Engine.renderFixedList({
            searchText: Engine.fixedSearchText,
          });
        } else {
          Engine.sortFixedOptions.column = column;
          Engine.sortFixedOptions.order = "desc";
          fixedListElement.innerHTML = Engine.renderFixedList({
            searchText: Engine.fixedSearchText,
          });
          el.target.classList.add(
            `n-column-order-${Engine.sortFixedOptions.order}`
          );
        }
      });
    });

    clusterizeButton.addEventListener("click", () => {
      Engine.clusterize = !Engine.clusterize;

      requestAnimationFrame(() => {
        keywordsListElement.innerHTML = Engine.renderKeywordsList();
        keywordsListElement.scrollTop = 0;
      });
    });

    showOnlyDangerButton.addEventListener("click", () => {
      Engine.showOnlyDanger = !Engine.showOnlyDanger;
      requestAnimationFrame(() => {
        excludedListElement.innerHTML = Engine.renderExcludedList({
          searchText: "",
        });
        excludedListElement.scrollTop = 0;
      });
    });

    showOnlyActiveClusters.addEventListener("click", () => {
      Engine.showOnlyActiveClusters = !Engine.showOnlyActiveClusters;
      if (Engine.showOnlyActiveClusters) {
        Engine.showOnlyOffClusters = false;
      }
      requestAnimationFrame(() => {
        keywordsListElement.innerHTML = Engine.renderKeywordsList();
        keywordsListElement.scrollTop = 0;
      });
    });

    showOnlyOffClusters.addEventListener("click", () => {
      Engine.showOnlyOffClusters = !Engine.showOnlyOffClusters;
      if (Engine.showOnlyOffClusters) {
        Engine.showOnlyActiveClusters = false;
      }
      requestAnimationFrame(() => {
        keywordsListElement.innerHTML = Engine.renderKeywordsList();
        keywordsListElement.scrollTop = 0;
      });
    });

    showOnlyNotFoundClusters.addEventListener("click", () => {
      Engine.showOnlyNotFoundClusters = !Engine.showOnlyNotFoundClusters;
      if (Engine.showOnlyNotFoundClusters) {
        Engine.showOnlyFoundClusters = false;
      }
      requestAnimationFrame(() => {
        keywordsListElement.innerHTML = Engine.renderKeywordsList();
        keywordsListElement.scrollTop = 0;
      });
    });

    showOnlyPKClusters.addEventListener("click", () => {
      Engine.showOnlyPKClusters = !Engine.showOnlyPKClusters;
      if (Engine.showOnlyPKClusters) {
        Engine.showOnlyAutoClusters = false;
      }
      requestAnimationFrame(() => {
        keywordsListElement.innerHTML = Engine.renderKeywordsList();
        keywordsListElement.scrollTop = 0;
      });
    });

    showOnlyAutoClusters.addEventListener("click", () => {
      Engine.showOnlyAutoClusters = !Engine.showOnlyAutoClusters;
      if (Engine.showOnlyAutoClusters) {
        Engine.showOnlyPKClusters = false;
      }
      requestAnimationFrame(() => {
        keywordsListElement.innerHTML = Engine.renderKeywordsList();
        keywordsListElement.scrollTop = 0;
      });
    });

    showOnlyNewPhrasesBtn.addEventListener("click", () => {
      Engine.showOnlyNewPhrases = !Engine.showOnlyNewPhrases;
      requestAnimationFrame(() => {
        keywordsListElement.innerHTML = Engine.renderKeywordsList();
        keywordsListElement.scrollTop = 0;
      });
    });

    showOnlyPhrasesWithoutBoostBtn.addEventListener("click", () => {
      Engine.showOnlyPhrasesWithoutBoost = !Engine.showOnlyPhrasesWithoutBoost;
      requestAnimationFrame(() => {
        keywordsListElement.innerHTML = Engine.renderKeywordsList();
        keywordsListElement.scrollTop = 0;
      });
    });

    showOnlyFoundClusters.addEventListener("click", () => {
      Engine.showOnlyFoundClusters = !Engine.showOnlyFoundClusters;
      if (Engine.showOnlyFoundClusters) {
        Engine.showOnlyNotFoundClusters = false;
      }
      requestAnimationFrame(() => {
        keywordsListElement.innerHTML = Engine.renderKeywordsList();
        keywordsListElement.scrollTop = 0;
      });
    });

    showOnlyFixedClusters.addEventListener("click", () => {
      Engine.showOnlyFixedClusters = !Engine.showOnlyFixedClusters;
      if (Engine.showOnlyFixedClusters) {
        Engine.showOnlyUnfixedClusters = false;
      }
      requestAnimationFrame(() => {
        keywordsListElement.innerHTML = Engine.renderKeywordsList();
        keywordsListElement.scrollTop = 0;
      });
    });
    showOnlyUnfixedClusters.addEventListener("click", () => {
      Engine.showOnlyUnfixedClusters = !Engine.showOnlyUnfixedClusters;
      if (Engine.showOnlyUnfixedClusters) {
        Engine.showOnlyFixedClusters = false;
      }
      requestAnimationFrame(() => {
        keywordsListElement.innerHTML = Engine.renderKeywordsList();
        keywordsListElement.scrollTop = 0;
      });
    });

    refreshWordsButton.addEventListener("click", async () => {
      await loadAllData();
    });

    const checkSingleKeyword = async (element, clicked = true) => {
      const presetElement = element;

      const keywordIndex = clicked
        ? element.target.dataset.keywordIndex
        : element.dataset.keywordIndex;

      const keywordItem = Engine.wordsStats.keywords[keywordIndex];

      const checkLoader = `
      <div class="n-loader" style="width:20px; height:15px; margin-right: 15px;">
        <svg
          aria-hidden="true"
          role="status"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="#1C64F2"
          />
        </svg>
      </div>
    `;

      presetElement.innerHTML = checkLoader;

      const [response, metadata] = await Engine.getMetadata(
        keywordItem.keyword,
        0
      );

      const isPreset = metadata?.catalog_type === "preset";
      const presetId = isPreset
        ? metadata?.catalog_value.split("&")[0].split("=")[1].split(";")[0]
        : null;

      presetElement.outerHTML = isPreset
        ? `<span class="n-count">${presetId}</span>`
        : "<span></span>";

      if (isPreset) {
        Engine.wordsStats.keywords[keywordIndex].metadata = metadata;
        Engine.wordsStats.keywords[keywordIndex].presetId = presetId;
      }

      if (metadata?.catalog_value.includes("subject=")) {
        Engine.wordsStats.keywords[keywordIndex].isSubject = true;
      }

      if (metadata?.catalog_type === "merger") {
        Engine.wordsStats.keywords[keywordIndex].isMerger = true;
      }
    };

    const checkSinglePosKeyword = async (element, clicked = true, delay_ms) => {
      let el = clicked ? element.target : element;
      const type = el.dataset?.isExcluded ? "excluded" : "keywords";

      let foundIndexInIndex;
      let productId;
      if (window.__NEUROMARKET_AD_TYPE === "AUTO") {
        productId = Engine.placement.nms[0].nm;
      }
      if (window.__NEUROMARKET_AD_TYPE === "SEARCH") {
        productId = Engine.placement.place[0].searchElements[0].nm;
      }
      if (window.__NEUROMARKET_AD_TYPE === "SEACAT") {
        productId = Engine.placement.subjects[0].nms[0].nm;
      }

      const adElement = clicked
        ? element.target.previousElementSibling
        : element.previousElementSibling;

      const boostElement = clicked
        ? element.target.nextElementSibling
        : element.nextElementSibling;

      const deltaElement = boostElement.nextElementSibling;

      const keywordIndex = clicked
        ? element.target.dataset.keywordIndex
        : element.dataset.keywordIndex;

      const keywordItem = Engine.wordsStats[type][keywordIndex];

      const checkLoader = `
      <div class="n-loader" style="width:20px; height:15px; margin-right: 15px;">
        <svg
          aria-hidden="true"
          role="status"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="#1C64F2"
          />
        </svg>
      </div>
    `;
      adElement.innerHTML = checkLoader;
      if (clicked) {
        element.target.innerHTML = checkLoader;
      } else {
        element.innerHTML = checkLoader;
      }

      const findProduct = async (
        page = 1,
        adsArr = [],
        retry,
        metadata = null,
        rawProducts = [],
      ) => {
        try {

          const response = await Engine.getSearchResults(
            keywordItem.keyword,
            page,
            100,
            0,
            false,
            clicked
          );

          if (response.status === 500) {
            throw new Error("500 STATUS");
          }
          if (response.status === 429) {
            throw new Error("429");
          }
          if (metadata === null) {
            metadata = response?.metadata;
          }
          const products = response?.products || [];
          rawProducts.push(...products)
          adsArr.push(...Engine.findAdsCPM(products, page));
          const foundIndex = products.findIndex(
            (product) => product.id === productId
          );

          if (foundIndex === -1) {
            if (page < MAX_POSITIONS_PAGE) {
              await delay(THREAD_DELAY_MS);
              return findProduct(page + 1, adsArr, retry, metadata, rawProducts);
            }
            return [response, page, adsArr, metadata, rawProducts];
          }
          return [response, page, adsArr, metadata, rawProducts];
        } catch (e) {
          if (retry < MAX_RETRIES) {
            await delay(THREAD_DELAY_MS);
            return findProduct(page, adsArr, retry + 1, metadata, rawProducts);
          }
          return [{}, page, [], {}, []];
        }
      };

      const findProductInIndex = async (
        page = 1,
        adsArr = [],
        retry,
        metadata = null,
        rawProducts = []
      ) => {
        try {
          const response = await Engine.getSearchIndexResults(
            keywordItem.keyword,
            page,
            100,
            0,
            false,
            clicked
          );

          if (response.status === 500) {
            throw new Error("500 STATUS");
          }
          if (response.status === 429) {
            throw new Error("429");
          }
          if (metadata === null) {
            metadata = response?.metadata;
          }
          const products = response?.products || [];
          adsArr.push(...Engine.findAdsCPM(products, page));
          rawProducts.push(...products)

          return [response, page, adsArr, metadata, rawProducts];
        } catch (e) {
          if (retry < MAX_RETRIES) {
            return findProductInIndex(page, adsArr, retry + 1, metadata, rawProducts);
          }
          return [{}, page, [], {}, []];
        }
      };

      await delay(delay_ms);

      const [searchResult, page, adsArr, metadata, rawProducts] = await findProduct();

      const products = searchResult?.products || [];
      const foundIndex = products.findIndex(
        (product) => product.id === productId
      );

      let searchIndexResult;

      if (foundIndex === -1) {
        const searchIndexResponseArray = await findProductInIndex();
        searchIndexResult = searchIndexResponseArray[0];
        const metadata = searchIndexResponseArray[3];
        if (metadata?.is_empty === true) {
          foundIndexInIndex = -1;
        } else {
          foundIndexInIndex = searchIndexResult?.products?.findIndex(
            (product) => product.id === productId
          );
        }
      }

      if (foundIndex === -1) {
        if (adsArr?.length > 1) {
          adElement.outerHTML = `
          <span class="n-count" style="width:55px;min-width:55px;" data-ads-index="${keywordIndex}" ${type === "excluded" ? `data-is-excluded="1"` : ""
            }>
          <span class="n-ad-analyze-btn">Смотреть</span>
        </span>
        `;
        } else {
          adElement.outerHTML = `
          <span class="n-count n-text-red" style="width:55px;min-width:55px; font-size: 0.75em;">Нет данных</span>
          </span>
        `;
        }
        if (foundIndexInIndex !== -1) {
          const productData =
            searchIndexResult.data?.products[foundIndexInIndex] || {};
          const adType = productData?.log?.tp || productData?.logs || false;
          const adId = productData?.log?.advertId || false;

          const textColor = adType ? `n-text-green` : `n-text-yellow`;
          const resultText = `${adType === "c" ? "🚀" : ""} В выдаче`;

          if (clicked) {
            element.target.outerHTML = `<span class="n-count ${textColor} n-check-position-manual" ${type === "excluded" ? `data-is-excluded="1"` : ""
              } data-keyword-index="${keywordIndex}" style="width:70px;min-width:70px; position:relative; white-space: nowrap;">${resultText} ${adType === "c" && adId !== Engine.campaignId
                ? `<span class="n-diff-ad-campaign"></span>`
                : ""
              }
          </span>`;
          } else {
            element.outerHTML = `<span class="n-count ${textColor} n-check-position-manual" ${type === "excluded" ? `data-is-excluded="1"` : ""
              } data-keyword-index="${keywordIndex}" style="width:70px;min-width:70px; position:relative; white-space: nowrap;">${resultText} ${adType === "c" && adId !== Engine.campaignId
                ? `<span class="n-diff-ad-campaign"></span>`
                : ""
              }
          </span>`;
          }
        } else {
          if (clicked) {
            element.target.outerHTML = `<span class="n-count n-text-red n-check-position-manual" ${type === "excluded" ? `data-is-excluded="1"` : ""
              } data-keyword-index="${keywordIndex}" style="width:70px;min-width:70px;">Не найдено</span>`;
          } else {
            element.outerHTML = `<span class="n-count n-text-red n-check-position-manual" ${type === "excluded" ? `data-is-excluded="1"` : ""
              } data-keyword-index="${keywordIndex}" style="width:70px;min-width:70px;">Не найдено</span>`;
          }
        }

        Engine.wordsStats[type][keywordIndex] = {
          ...Engine.wordsStats[type][keywordIndex],
          positions: { position: -1 },
          ads: adsArr,
          rawProducts,
          indexData: {
            exist: foundIndexInIndex !== -1,
            ad:
              foundIndexInIndex !== -1
                ? {
                  ...searchIndexResult?.products?.[foundIndexInIndex]?.log,
                  logs: searchIndexResult?.products?.[foundIndexInIndex]
                    ?.logs,
                }
                : false,
          },
        };
        return;
      }

      const product = products[foundIndex];

      const result = {
        position: foundIndex + 1 + (page - 1) * 100,
      };

      if (product?.logs) {
        const positionBoost = product?.log?.promoPosition;
        const boostedFrom = product?.log?.position + (page - 1) * 100;
        const positionDelta = boostedFrom - positionBoost;

        result.promotion = 1;
        result.advertId = product?.log?.advertId;
        result.type = product?.log?.tp;
        result.logs = product?.logs;
        result.boosted_from = boostedFrom;
        result.position_delta = positionDelta || undefined;
        result.position_boost = positionBoost || undefined;
        result.cpm = product?.log?.cpm;

        if (adsArr.length > 1) {
          adElement.outerHTML = `
        <span class="n-count" style="width:55px; min-width:55px;" data-ads-index="${keywordIndex}" ${type === "excluded" ? `data-is-excluded="1"` : ""
            }> <span class="n-ad-analyze-btn">Смотреть</span>
        </span>
      `;
        } else {
          adElement.outerHTML = `
          <span class="n-count n-text-red" style="width:55px; min-width:55px; font-size: 0.75em;">Нет данных</span>
          </span>
        `;
        }

        if (clicked) {
          element.target.outerHTML = `<span class="n-count n-text-green n-check-position-manual" ${type === "excluded" ? `data-is-excluded="1"` : ""
            } data-keyword-index="${keywordIndex}" style="width:70px;min-width:70px; position:relative; white-space: nowrap;">${result.type === "c" ? "🚀" : ""
            }${result?.boosted_from ? `${result?.boosted_from} →` : ""} ${result.position
            } ${result.type === "c" && result.advertId !== Engine.campaignId
              ? `<span class="n-diff-ad-campaign"></span>`
              : ""
            }</span>
        `;
          boostElement.outerHTML = `<span class="n-count" style="width:40px; min-width:40px;">
          ${result.position_boost || "--"}
          </span>`;

          deltaElement.outerHTML = `<span class="n-count" style="width:40px; min-width:40px;">
          ${result.position_delta || "--"}
          </span>`;
        } else {
          element.outerHTML = `<span class="n-count n-text-green n-check-position-manual" ${type === "excluded" ? `data-is-excluded="1"` : ""
            } data-keyword-index="${keywordIndex}" style="width:70px;min-width:70px; position:relative; white-space: nowrap;">${result.type === "c" ? "🚀" : ""
            }${result?.boosted_from ? `${result.boosted_from} →` : ""} ${result.position
            } ${result.type === "c" && result.advertId !== Engine.campaignId
              ? `<span class="n-diff-ad-campaign"></span>`
              : ""
            }</span>
        `;
          boostElement.outerHTML = `<span class="n-count" style="width:40px; min-width:40px;">
          ${result.position_boost || "--"}
          </span>`;

          deltaElement.outerHTML = `<span class="n-count" style="width:40px; min-width:40px;">
          ${result.position_delta || "--"}
          </span>`;
        }

        Engine.wordsStats[type][keywordIndex] = {
          ...Engine.wordsStats[type][keywordIndex],
          positions: result,
          ads: adsArr,
          rawProducts,
        };

        return;
      }

      if (adsArr.length > 1) {
        adElement.outerHTML = `
        <span class="n-count" style="width:55px;min-width:55px;gap:4px;" data-ads-index="${keywordIndex}" ${type === "excluded" ? `data-is-excluded="1"` : ""
          }> <span class="n-ad-analyze-btn">Смотреть</span>
        </span>
      `;
      } else {
        adElement.outerHTML = `
        <span class="n-count n-text-red" style="width:55px;min-width:55px; font-size: 0.75em;">Нет данных</span>
        </span>
      `;
      }

      if (clicked) {
        element.target.outerHTML = `<span class="n-count n-text-yellow n-check-position-manual" ${type === "excluded" ? `data-is-excluded="1"` : ""
          } data-keyword-index="${keywordIndex}" style="width:60px;min-width:70px;">${result.position
          }</span>`;
      } else {
        element.outerHTML = `<span class="n-count n-text-yellow n-check-position-manual" ${type === "excluded" ? `data-is-excluded="1"` : ""
          } data-keyword-index="${keywordIndex}" style="width:60px;min-width:70px;">${result.position
          }</span>`;
      }

      Engine.wordsStats[type][keywordIndex] = {
        ...Engine.wordsStats[type][keywordIndex],
        positions: result,
        ads: adsArr,
        rawProducts,
      };
    };

    const checkSingleExcluded = async (element, clicked = true) => {
      const presetElement = clicked ? element.target : element;

      const excludedIndex = presetElement.dataset.excludedIndex;

      const excludedItem = Engine.wordsStats.excluded[excludedIndex];

      const checkLoader = `
      <div class="n-loader" style="width:20px; height:15px; margin-right: 15px;">
        <svg
          aria-hidden="true"
          role="status"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="#1C64F2"
          />
        </svg>
      </div>
    `;
      presetElement.innerHTML = checkLoader;

      const [response, metadata] = await Engine.getMetadata(
        excludedItem.keyword,
        0
      );

      const isPreset = metadata?.catalog_type === "preset";
      const presetId = isPreset
        ? metadata?.catalog_value.split("&")[0].split("=")[1].split(";")[0]
        : null;

      presetElement.outerHTML = isPreset
        ? `<span class="n-count">${presetId}</span>`
        : "<span></span>";

      Engine.wordsStats.excluded[excludedIndex] = {
        ...Engine.wordsStats.excluded[excludedIndex],
        metadata,
        presetId,
      };

      if (metadata?.catalog_value.includes("subject=")) {
        Engine.wordsStats.excluded[excludedIndex].isSubject = true;
      }

      if (metadata?.catalog_type === "merger") {
        Engine.wordsStats.excluded[excludedIndex].isMerger = true;
      }
    };
    1;
    function checkAlonePositionListner(item) {
      item.addEventListener("click", checkSinglePosKeyword);
    }

    const keywordsListObserver = new MutationObserver((records) => {
      document.querySelectorAll(".n-check-position")?.forEach((item) => {
        if (item.getAttribute("listener") !== "true") {
          item.setAttribute("listener", "true");
          checkAlonePositionListner(item);
        }
      });
      document.querySelectorAll(".n-check-position-manual")?.forEach((item) => {
        if (item.getAttribute("listener") !== "true") {
          item.setAttribute("listener", "true");
          checkAlonePositionListner(item);
        }
      });

      const chevronHandler = (element) => {
        const idx = element.target.dataset.keywordIndex;
        const isExcluded = element.target.dataset?.isExcluded;
        if (isExcluded) {
          Engine.wordsStats.excluded[idx].open =
            !Engine.wordsStats.excluded[idx].open;
        } else {
          Engine.wordsStats.keywords[idx].open =
            !Engine.wordsStats.keywords[idx].open;
        }
        keywordsListElement.innerHTML = Engine.renderKeywordsList();
      };

      document.querySelectorAll(".n-chevron")?.forEach((item) => {
        if (item.getAttribute("listener") !== "true") {
          item.setAttribute("listener", "true");
          item.addEventListener("click", chevronHandler);
        }
      });

      const keywordCheckboxClicked = (element) => {
        element.stopPropagation();
        const idx = element.target.dataset.keywordIndex || -1;
        const isExcluded = element.target.dataset.isExcluded === "1" || false;
        const isFixed = element.target.dataset.isFixed === "1" || false;
        if (idx === -1) return;
        if (!isExcluded) {
          const elements = document.querySelectorAll(
            `[data-checkbox='keyword-${idx}']`
          );
          Engine.select("keywords", idx);

          elements.forEach((listItem) => {
            listItem.checked = Engine.wordsStats.keywords[idx].selected;
          });
        }
        if (isExcluded) {
          const elements = document.querySelectorAll(
            `[data-checkbox='excluded-${idx}']`
          );
          Engine.select("excluded", idx, true);

          elements.forEach((listItem) => {
            listItem.checked = Engine.wordsStats.excluded[idx].selected;
          });
        }
        if (isFixed) {
          const idx = element.target.dataset.fixedIndex;
          const elements = document.querySelectorAll(
            `[data-fixed-index='${idx}']`
          );
          Engine.select("fixed", idx);

          elements.forEach((listItem) => {
            listItem.checked = Engine.wordsStats.fixed[idx].selected;
          });
        }
      };

      document.querySelectorAll("#keywordsCheckbox")?.forEach((item) => {
        if (item.getAttribute("listener") !== "true") {
          item.setAttribute("listener", "true");
          item.addEventListener("click", keywordCheckboxClicked);
        }
      });

      if (keywordsAllCheckbox.getAttribute("listener") !== "true") {
        keywordsAllCheckbox.setAttribute("listener", "true");
        keywordsAllCheckbox.addEventListener("click", (element) => {
          const needleStatus = element.target.checked ? true : false;
          const checkboxes = document.querySelectorAll("#keywordsCheckbox");
          checkboxes.forEach((item) => {
            item.checked = needleStatus;
            let type = "keywords";
            const idx = item.dataset.keywordIndex || -1;
            const isExcluded = item.dataset.isExcluded === "1" || false;
            const isFixed = item.dataset.isFixed === "1" || false;
            if (isExcluded) {
              type = "excluded";
            }
            if (isFixed) {
              const fixedIndex = item.dataset.fixedIndex;
              Engine.wordsStats["fixed"][fixedIndex].selected = needleStatus;
            }
            Engine.wordsStats[type][idx].selected = needleStatus;
          });
          if (checkboxes.length) {
            Engine.isRestoreClusterSelected = Engine.isSomeClusterSelected();
            Engine.isKeywordsSelected = Engine.isSomeKeywordsSelected();
            Engine.isRestoreKeywordSelected = Engine.isSomeExcludedSelected();
            Engine.isRestoreExcludedSelected = Engine.isSomeExcludedSelected();
            Engine.isFixedSelected = Engine.isSomeFixedSelected();

            const somethingSelected =
              Engine.isRestoreClusterSelected || Engine.isKeywordsSelected;
            if (!somethingSelected) {
              copyKeywordsSelectedElement.style.display = "none";
              addKeywordsToCustomListsButton.style.display = "none";
              removeKeywordsFromCustomListsButton.style.display = "none";
            } else {
              copyKeywordsSelectedElement.style.display = "flex";
              addKeywordsToCustomListsButton.style.display = "flex";
              removeKeywordsFromCustomListsButton.style.display = "flex";
            }
          }
        });
      }

      if (fixedAllCheckbox.getAttribute("listener") !== "true") {
        fixedAllCheckbox.setAttribute("listener", "true");
        fixedAllCheckbox.addEventListener("click", (element) => {
          const needleStatus = element.target.checked ? true : false;
          const checkboxes = document.querySelectorAll("#fixedCheckbox");
          checkboxes.forEach((item) => {
            item.checked = needleStatus;
            Engine.wordsStats.fixed[item.dataset.fixedIndex].selected =
              needleStatus;
          });
          if (checkboxes.length) {
            Engine.isFixedSelected = needleStatus;
          }
        });
      }

      if (excludedAllCheckbox.getAttribute("listener") !== "true") {
        excludedAllCheckbox.setAttribute("listener", "true");
        excludedAllCheckbox.addEventListener("click", (element) => {
          const needleStatus = element.target.checked ? true : false;
          const checkboxes = document.querySelectorAll("#excludedCheckbox");
          checkboxes.forEach((item) => {
            item.checked = needleStatus;
            Engine.wordsStats.excluded[item.dataset.keywordIndex].selected =
              needleStatus;
          });
          if (checkboxes.length) {
            Engine.isRestoreKeywordSelected = needleStatus;
            Engine.isRestoreExcludedSelected = needleStatus;
          }
        });
      }
    });

    keywordsListObserver.observe(keywordsListElement, {
      childList: true,
      subtree: true,
    });

    const excludedListObserver = new MutationObserver((records) => {
      if (Engine.isExcludedScanStarted) {
        return;
      }
      document.querySelectorAll("#excludedCheckbox")?.forEach((item) => {
        item.addEventListener("click", (element) => {
          element.stopPropagation();
          const idx = element.target.dataset.keywordIndex || -1;
          if (idx === -1) return;

          Engine.select("excluded", idx, true);

          const elements = document.querySelectorAll(
            `[data-checkbox='excluded-${idx}']`
          );

          elements.forEach((listItem) => {
            listItem.checked = Engine.wordsStats.excluded[idx].selected;
          });
        });
      });
    });

    excludedListObserver.observe(excludedListElement, {
      childList: true,
    });

    const fixedListObserver = new MutationObserver((records) => {
      if (Engine.isFixedScanStarted) {
        return;
      }
      document.querySelectorAll("#fixedCheckbox")?.forEach((item) => {
        item.addEventListener("click", (element) => {
          element.stopPropagation();
          const idx = element.target.dataset.fixedIndex || -1;
          if (idx === -1) return;

          Engine.select("fixed", idx, true);

          const elements = document.querySelectorAll(
            `[data-checkbox='fixed-${idx}']`
          );

          elements.forEach((listItem) => {
            listItem.checked = Engine.wordsStats.fixed[idx].selected;
          });
        });
      });
    });

    fixedListObserver.observe(fixedListElement, {
      childList: true,
      subtree: true,
    });

    const renderWithSearch = (e) => {
      Engine.searchText = e.target.value?.toLowerCase().trim();
      if (Engine.searchText.length > 0) {
        searchClearBtn.style.display = "flex";
      } else {
        searchClearBtn.style.display = "none";
      }
      keywordsListElement.innerHTML = Engine.renderKeywordsList();
    };
    const debouncedRenderWithSearch = debounce(renderWithSearch);
    searchElement.addEventListener("input", debouncedRenderWithSearch);

    const renderWithCountFilter = (e) => {
      Engine.sumFreqFromFilter = Number(sumFreqFromInput.value) || null;
      Engine.sumFreqToFilter = Number(sumFreqToInput.value) || null;
      Engine.freqFromFilter = Number(freqFromInput.value) || null;
      Engine.freqToFilter = Number(freqToInput.value) || null;
      Engine.positionFromFilter = Number(positionFromInput.value) || null;
      Engine.positionToFilter = Number(positionToInput.value) || null;
      Engine.positionBoostFromFilter =
        Number(positionBoostFromInput.value) || null;
      Engine.positionBoostToFilter = Number(positionBoostToInput.value) || null;
      Engine.positionDeltaFromFilter =
        Number(positionDeltaFromInput.value) || null;
      Engine.positionDeltaToFilter = Number(positionDeltaToInput.value) || null;
      Engine.countFromFilter = Number(countFromInput.value) || null;
      Engine.countToFilter = Number(countToInput.value) || null;
      Engine.clicksFromFilter = Number(clicksFromInput.value) || null;
      Engine.clicksToFilter = Number(clicksToInput.value) || null;
      Engine.ctrFromFilter = Number(ctrFromInput.value) || null;
      Engine.ctrToFilter = Number(ctrToInput.value) || null;
      Engine.cpcFromFilter = Number(cpcFromInput.value) || null;
      Engine.cpcToFilter = Number(cpcToInput.value) || null;
      Engine.moneyFromFilter = Number(moneyFromInput.value) || null;
      Engine.moneyToFilter = Number(moneyToInput.value) || null;

      if (
        Engine.sumFreqFromFilter ||
        Engine.sumFreqToFilter ||
        Engine.freqFromFilter ||
        Engine.freqToFilter ||
        Engine.positionFromFilter ||
        Engine.positionToFilter ||
        Engine.positionDeltaFromFilter ||
        Engine.positionDeltaToFilter ||
        Engine.positionBoostFromFilter ||
        Engine.positionBoostToFilter ||
        Engine.countFromFilter ||
        Engine.countToFilter ||
        Engine.clicksFromFilter ||
        Engine.clicksToFilter ||
        Engine.ctrFromFilter ||
        Engine.ctrToFilter ||
        Engine.cpcFromFilter ||
        Engine.cpcToFilter ||
        Engine.moneyFromFilter ||
        Engine.moneyToFilter
      ) {
        eraseFiltersBtn.classList.remove("n-btn-vertical-disabled");
      } else {
        eraseFiltersBtn.classList.add("n-btn-vertical-disabled");
      }

      keywordsListElement.innerHTML = Engine.renderKeywordsList();
    };
    const debouncedRenderWithFilter = debounce(renderWithCountFilter);

    sumFreqFromInput.addEventListener("input", debouncedRenderWithFilter);
    sumFreqToInput.addEventListener("input", debouncedRenderWithFilter);
    freqFromInput.addEventListener("input", debouncedRenderWithFilter);
    freqToInput.addEventListener("input", debouncedRenderWithFilter);
    positionFromInput.addEventListener("input", debouncedRenderWithFilter);
    positionToInput.addEventListener("input", debouncedRenderWithFilter);
    positionBoostFromInput.addEventListener("input", debouncedRenderWithFilter);
    positionBoostToInput.addEventListener("input", debouncedRenderWithFilter);
    positionDeltaFromInput.addEventListener("input", debouncedRenderWithFilter);
    positionDeltaToInput.addEventListener("input", debouncedRenderWithFilter);
    countFromInput.addEventListener("input", debouncedRenderWithFilter);
    countToInput.addEventListener("input", debouncedRenderWithFilter);
    clicksFromInput.addEventListener("input", debouncedRenderWithFilter);
    clicksToInput.addEventListener("input", debouncedRenderWithFilter);
    ctrFromInput.addEventListener("input", debouncedRenderWithFilter);
    ctrToInput.addEventListener("input", debouncedRenderWithFilter);
    cpcFromInput.addEventListener("input", debouncedRenderWithFilter);
    cpcToInput.addEventListener("input", debouncedRenderWithFilter);
    moneyFromInput.addEventListener("input", debouncedRenderWithFilter);
    moneyToInput.addEventListener("input", debouncedRenderWithFilter);

    const renderExcludedWithSearch = (e) => {
      Engine.excludedSearchText = e.target.value?.toLowerCase().trim();
      if (Engine.excludedSearchText.length > 0) {
        searchExcludedClearBtn.style.display = "flex";
      } else {
        searchExcludedClearBtn.style.display = "none";
      }
      excludedListElement.innerHTML = Engine.renderExcludedList({
        searchText: Engine.excludedSearchText,
      });
    };
    const debouncedRenderExcludedWithSearch = debounce(
      renderExcludedWithSearch
    );

    const renderFixedWithSearch = (e) => {
      Engine.fixedSearchText = e.target.value?.toLowerCase().trim();
      if (Engine.excludedSearchText.length > 0) {
        searchExcludedClearBtn.style.display = "flex";
      } else {
        searchExcludedClearBtn.style.display = "none";
      }
      fixedListElement.innerHTML = Engine.renderFixedList({
        searchText: Engine.fixedSearchText,
      });
    };
    const debouncedRenderFixedWithSearch = debounce(renderFixedWithSearch);

    searchFixedElement.addEventListener(
      "input",
      debouncedRenderFixedWithSearch
    );

    searchExcludedElement.addEventListener(
      "input",
      debouncedRenderExcludedWithSearch
    );

    window.setTopLoading = (value, status = "") => {
      if (value === true) {
        topLoader.innerHTML = `
        <svg
          aria-hidden="true"
          role="status"
          style="width:20px; height:20px;"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="#1C64F2"
          />
        </svg>
        <div style="margin-left:6px; color: #94a3b8;">${status}</div>
      `;
        return;
      }

      if (value === false && status !== "") {
        topLoader.innerHTML = `<div style="margin-left:6px; color: #e11d48; cursor:pointer;">${status} <span id="n-refresh-top" style="color:#2563ebeb">Обновить</span></div>`;
        document
          ?.getElementById("n-refresh-top")
          ?.addEventListener("click", () => {
            loadAllData(true);
          });
        return;
      }
      topLoader.innerHTML = "";
    };

    const setLoading = (value, status = "") => {
      if (value === true) {
        keywordsListElement.innerHTML = `
      <div class="n-loader" style="position:relative; flex-direction: column; gap:12px; ">
        <div style="display:flex; gap:4px; align-items:center; ">
          <div style="position:relative; overflow:hidden;">
            <svg
              aria-hidden="true"
              role="status"
              viewBox="0 0 100 101"
              fill="none"
              class="n-loader-svg"
              style="width:50px; height:50px;"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="#1C64F2"
              />
            </svg>
            <img style="position:absolute; width:40px; height:40px; left:5px; top:5px; border-radius: 1000px;" src="https://cdn.neuromarket.online/images/enot.webp"/>
          </div>
          ${status === ""
            ? ""
            : `<div style="margin-left:6px; color: #94a3b8;">${status}</div>`
          }
        </div>
        ${status === "Загрузка поставщика"
            ? `
          <div style="display:flex; width: 100%; align-items:center; justify-content:center">
            <span style="font-size: 0.9em; color: #64758d; padding: 6px 11px; background: #33415536; border-radius: 8px;" class="n-supplier-loader-docs-link">Не загружаются данные о поставщике?<br/>Перейдите на <a href="https://seller.wildberries.ru/" target="_blank">ВБ.Партнеры</a> для обновления сессии.<br/>Затем вернитесь обратно в РК и обновите страницу.</span>
          </div>
          <div style="display:flex; width: 100%; align-items:center; justify-content:center">
            <span style="font-size: 0.9em; color: #64758d; padding: 6px 11px; background: #33415536; border-radius: 8px;" class="n-supplier-loader-docs-link">Не помогло? Перейдите по ссылке для дополнительных способов решения - <a href="https://docs.neuromarket.online/extension/problems" target="_blank">"Проблемы и Решения"</a></span>
          </div>`
            : ""
          }
      </div>
      `;
        excludedListElement.innerHTML = `
      <div class="n-loader">
      <svg
        aria-hidden="true"
        role="status"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="#1C64F2"
        />
      </svg>
      </div>
      `;
        fixedListElement.innerHTML = `
      <div class="n-loader">
      <svg
        aria-hidden="true"
        role="status"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="#1C64F2"
        />
      </svg>
      </div>
      `;
        return;
      }

      if (value === false && status !== "") {
        keywordsListElement.innerHTML = `
      <div class="n-loader" style="display:flex; flex-direction: column; gap:12px; ">
        ${status === ""
            ? ""
            : `<div style="margin-left:6px; color: #e11d48;">${status}</div>`
          }
          ${status === "Ошибка загрузки Поставщика"
            ? `
          <div style="display:flex; width: 100%; align-items:center; justify-content:center">
            <span style="font-size: 0.9em; color: #64758d; padding: 6px 11px; background: #33415536; border-radius: 8px;" class="n-supplier-loader-docs-link">Не загружаются данные о поставщике?<br/>Перейдите на <a href="https://seller.wildberries.ru/" target="_blank">ВБ.Партнеры</a> для обновления сессии.<br/>Затем вернитесь обратно в РК и обновите страницу.</span>
          </div>
          <div style="display:flex; width: 100%; align-items:center; justify-content:center">
            <span style="font-size: 0.9em; color: #64758d; padding: 6px 11px; background: #33415536; border-radius: 8px;" class="n-supplier-loader-docs-link">Не помогло? Перейдите по ссылке для дополнительных способов решения - <a href="https://docs.neuromarket.online/extension/problems" target="_blank">"Проблемы и Решения"</a></span>
          </div>`
            : ""
          }
      </div>
      `;
        excludedListElement.innerHTML = `
      <div class="n-loader">
      </div>
      `;
        fixedListElement.innerHTML = `
      <div class="n-loader">
      </div>
      `;
        return;
      }

      keywordsListElement.innerHTML = Engine.renderKeywordsList();
      excludedListElement.innerHTML = Engine.renderExcludedList({
        searchText: Engine.excludedSearchText,
      });
      fixedListElement.innerHTML = Engine.renderFixedList({
        searchText: Engine.fixedSearchText,
      });
    };

    window.loadAllData = async function (onlyFull = false) {
      keywordsAllCheckbox.checked = false;
      excludedAllCheckbox.checked = false;
      fixedAllCheckbox.checked = false;

      if (!Engine.isWidgetOpen) return;

      if (!Engine.accessToken) {
        await Engine.getAccessToken();
        await Engine.confirmAccessToken();
      }

      Engine.fullStatsLoaded = false;
      Engine.realTimeStatsLoaded = false;
      Engine.productBuyOutDataLoaded = false;
      Engine.productDataLoaded = false;

      setLoading(true, "Загрузка поставщика");
      if ((await Engine.getSupplier()) === false) {
        setLoading(false, "Ошибка загрузки Поставщика");
        return;
      }

      if (!Engine.userData || !Engine.userAuthData) {
        setLoading(true, "Авторизация расширения");
        await Engine.getBalance();
        await Engine.getUserPersonalData();
        await Engine.getAuthData();
      }

      if (
        !Engine.userData || !Engine.userAuthData
      ) {
        setLoading(false, "Ошибка авторизации расширения");
        return;
      }
      if (Engine.userAuthData.days === 0) {
        setLoading(false, `
          <div style="display: flex; flex-direction: column; gap: 8px; align-items:center; justify-content: center;">
            <div>Закончился пробный период или оплаченный тариф</div>
            <div class="n-nav-btn" id="n-topup-loading-btn">Оплатить доступ</div>
          </div>
        `);

        const topupLoadingBtnElement = document.getElementById("n-topup-loading-btn")
        topupLoadingBtnElement.addEventListener("click", () => {
          Engine.showTarrifsWindow()
        })
        return;
      }

      if (onlyFull) {
        setTopLoading(true, "Загрузка кликов, CTR и затрат");
        Promise.all([
          Engine.loadRealTimeData(),
          Engine.loadFullStats(),
          Engine.loadProductAnalytics(),
          Engine.loadProductSalesFunnel(),
          Engine.loadProductBuyOutPercent(),
        ])
          .then(() => setTopLoading(false))
          .catch((e) => {
            setTopLoading(false, "Ошибка загрузки Кликов, CTR и Затрат");
          });
        return;
      }

      Engine.wordsStatsLoaded = false;

      await Engine.getSupplierUsers();
      Engine.getCampaignLogs();
      Engine.getCustomLists();

      setLoading(true, "Определение типа Кампании");
      if ((await Engine.getCampaignInfo()) === false) {
        setLoading(false, "Ошибка определения типа Кампании");
        return;
      }

      setLoading(true, "Загрузка кампании");
      if ((await Engine.getPlacement()) === false) {
        setLoading(false, "Ошибка загрузки Кампании");
        return;
      }

      // setLoading(true, "Загрузка данных товара");
      // if ((await Engine.getProductDetails()) === false) {
      //   setLoading(false, "Ошибка загрузки данных товара");
      //   return;
      // }

      setLoading(true, "Загрузка ключевых фраз");
      if ((await Engine.loadWordsStats()) === false) {
        setLoading(false, "Ошибка загрузки Ключевых Фраз");
        return;
      }

      if (Engine.wordsStats.keywords.length > 5000) {
        Engine.countFromFilter = 5;
        document.getElementById("n-count-from-input").value = 5;
      }

      keywordsListElement.innerHTML = Engine.renderKeywordsList();

      excludedListElement.innerHTML = Engine.renderExcludedList({
        searchText: Engine.excludedSearchText,
      });

      fixedListElement.innerHTML = Engine.renderFixedList({
        searchText: Engine.fixedSearchText,
      });

      setTopLoading(true, "Загрузка кликов, CTR и затрат");
      Promise.all([
        Engine.loadRealTimeData(),
        Engine.loadProductAnalytics(),
        Engine.loadProductSalesFunnel(),
        Engine.loadProductBuyOutPercent(),
        Engine.loadFullStats(),
      ])
        .then(() => {
          setTopLoading(false);
        })
        .catch((e) => {
          setTopLoading(false, "Ошибка загрузки Кликов, CTR и Затрат");
        })
        .finally(async () => {
          // Engine.sendKeywords();
          if (Engine.wordsStats.keywords.length > 5000) {
            Engine.countFromFilter = 5;
            document.getElementById("n-count-from-input").value = 5;
          }
          if (
            Engine.wordsStats.keywords.length +
            Engine.wordsStats.excluded.length
          ) {
            // setLoading(true, "Загрузка частотности запросов");
            // if ((await Engine.loadKeywordsViews()) === false) {
            //   setLoading(false, "Ошибка загрузки частотности запросов");
            // }
            setLoading(true, "Загрузка данных по кластерам");
            if ((await Engine.clusterizeKeywords()) === false) {
              setLoading(false);
            }
            setLoading(false);
            Engine.mergeStats().then(() => {
              keywordsListElement.innerHTML = Engine.renderKeywordsList();

              excludedListElement.innerHTML = Engine.renderExcludedList({
                searchText: Engine.excludedSearchText,
              });

              fixedListElement.innerHTML = Engine.renderFixedList({
                searchText: Engine.fixedSearchText,
              });
            })
          }
        });
    };

    window.Engine = new NeuromarketEngine(campaignId);
    //await loadAllData();

    // eslint-disable-next-line no-undef

    tippy("#n-search", {
      content(reference) {
        return `
        <div class="n-column-tip" style="flex-direction: column; max-width: max-content; align-items: start; text-align:left;">
          <strong style="padding-bottom:4px;">Операторы поиска</strong>
          <span style="padding-bottom:4px;">Оператор - это символ расположенный в начале поискового запроса. Предназначен менять логику работы поиска.</span>
          <p style="display:flex; flex-direction: column; padding: 4px 8px; background: #334155; gap:2px; border-radius: 8px;">
            <span><b>@</b><small>фраза</small> - Искать <u>только</u> в название кластера</span>
            <span><b>#</b><small>число</small> - Искать числа в название фразы/кластера</span>
            <span><b>!</b><small>число/фраза</small> - Искать всё кроме введенного числа/фразы. Можно комбинировать с предыдущими операторами.</span>
          </p>
          <span style="margin-top:4px; padding-bottom:4px;">Примеры запросов:</span>
          <p style="display:flex; flex-direction: column; padding: 4px 8px; background: #334155; gap:2px; border-radius: 8px;">
            <span><b>платье</b> - Найдет все фразы в которых есть слово "платье"</span>
            <span><b>10025234</b> - Найдет все фразы с данным номером кластера</span>
            <span><b>#!03</b> - Найдет все фразы, в которых <u>нет</u> числа "03"</span>
            <span><b>@!платье</b> - Найдет все кластеры, в названии которых <u>нет</u> слова "платье"</span>
          </p>
          </div>
        `;
      },
      arrow: false,
      followCursor: false,
      placement: "top",
      allowHTML: true,
    });

    tippy.delegate("#n-keywords-list", {
      content() {
        return "";
      },
      onShown: async (tooltip) => {
        const popper = tooltip.popper;
        const child = popper.childNodes[0].childNodes[0];
        if (child.innerHTML !== "") return;

        child.innerHTML = `
        <div class="n-column-tip" style="flex-direction: column; max-width: max-content; align-items: start; text-align:left;">
          ${checkLoader}
          </div>
        `;
        const clusterId = tooltip.reference.dataset.clusterId;
        const clusterData = await Engine.getClusterData(clusterId);

        child.innerHTML = `
        <div class="n-ads-tip">
          <div class="n-kw-wrap">
            <div class="n-kw-list" style="resize: none; border:none !important;">
              <div class="n-title" style="z-index:10; background: #1e293b; display:table; position:sticky; top:0; border-top:none; padding: 0px 12px 0px 0px !important; border-left: none; border-right: none;">
                <div class="n-title-flex" style="justify-content: space-between;">
                    <span style="width:200px; text-align:left; padding-left: 12px;">Ключевая фраза</span>
                    <span style="width:50px; text-align:right; padding-right: 12px;">Частота</span>
                </div>
              </div>
          ${clusterData
            .map((data) => {
              return `
              <div class="n-ads-list-item n-no-left-border" style="padding-left: 0 !important;">
                <span class="n-count ns-clamp-1" style="width:200px; max-width:200px; overflow: hidden; justify-content: flex-start; text-align:left; padding-left:12px;">${data.keyword
                }</span>
                <span class="n-count" style="width:50px; min-width:50px;  justify-content: flex-end; text-align:right; padding-right: 12px;">${data.views ? data.views : 0
                }</span>
              </div>
              `;
            })
            .join("")}
          </div>
        </div>`;
      },
      arrow: false,
      trigger: "click",
      followCursor: false,
      placement: "right",
      target: "#n-advanced-cluster-data",
      trigger: "click",
      interactive: true,
      popperOptions: {
        positionFixed: true,
      },
      appendTo: document.body,
      allowHTML: true,
      inertia: true,
    });

    tippy.delegate("#n-keywords-list", {
      content(reference) {
        const index = reference.getAttribute("data-ads-index") || -1;
        const type =
          reference.getAttribute("data-is-excluded") === "1"
            ? "excluded"
            : "keywords";
        if (index === -1) return;
        const data = Engine.wordsStats[type][index];

        const products = data?.rawProducts || [];
        const ads = data?.ads || [];
        const position = data.positions.position || [];

        const element = document.createElement('div')

        element.innerHTML = `
      <div class="n-ads-tip" style="flex-direction: column;">
        <div id="n-ads-tip-chart" data-ads-index="${index}" data-is-excluded="${type === "excluded" ? 1 : 0
          }" style="width:100%; height:150px;"></div>
        <div style="display: flex;">
        <div class="ns-product-dots-chart" id="ns-product-dots-chart" style="margin: 8px;">
          <div class="ns-product-dots-chart-dot ns-product-dots-chart-dot-empty"></div>
        </div>
        <div class="n-kw-wrap" style="overflow-y:auto;">
          <div class="n-kw-list" style="resize: none; border:none !important; height: 352px;">
            <div class="n-title" style="z-index:10; background: #1e293b; display:table; position:sticky; top:0; border-top:none; padding: 0px 12px 0px 0px !important; border-left: none; border-right: none;">
              <div class="n-title-flex">
                  <span style="width:50px; text-align:center;">До</span>
                  <span style="width:15px; text-align:center;"></span>
                  <span style="width:50px; text-align:center;">После</span>
                  <span style="width:40px; text-align:center;">CPM</span>
                  <span style="width:50px; text-align:right;">Дельта</span>
                  <span style="width:50px; text-align:center;">BPC <span class="n-wtf" id="n-concurrent-cpm" data-tip="Средняя цена за буст одной позиции">?</span></span>
                  <span style="width:50px; text-align:center;">Акция</span>
                  <span style="width:50px; text-align:right;">Тип РК</span>
                  <span style="width:65px; text-align:right;">ID РК</span>
              </div>
            </div>
        ${ads
            .slice(0, 300)
            .map((ad) => {
              const delta = ad.boosted_from - ad.position;
              const rawProduct = products?.find(({ id }) => ad.productId === id)
              const hasPromo = !!rawProduct?.panelPromoId;
              const bpc = precise.round(ad.cpm / delta, 2);
              return `
            <div class="n-ads-list-item n-no-left-border" style="padding-left: 0 !important; ${ad.position === position
                  ? "background: #1a422f;"
                  : ad.supplierId === Engine.supplierId
                    ? "background: #ffc1002e;"
                    : ""
                }">
              <span class="n-count" style="width:50px; min-width:50px; justify-content: center;">${ad.boosted_from || "---"
                }</span>
              <span class="n-count" style="width:15px; min-width:15px; justify-content: center;">→</span>
              <span class="n-count" style="width:50px; min-width:50px; justify-content: center;">
                <a href="https://www.wildberries.ru/catalog/${ad.productId
                }/detail.aspx" class="n-ad-product-link" target="_blank">
                ${ad.position}
                </a>
              </span>
              <span class="n-count" style="width:40px; min-width:40px; justify-content: center;">${ad.cpm || "---"
                }₽</span>
              <span class="n-count" style="width:50px; min-width:50px;">${delta || "---"
                }</span>
              <span class="n-count" style="width:50px; min-width:50px; justify-content: center;">${bpc || "---"
                }₽</span>
              <span class="n-count" style="width:50px; min-width:50px;text-align:center;justify-content: center;">${hasPromo ? "Да" : "Нет"
                }</span>
              <span class="n-count" style="width:50px; min-width:50px;text-align:center;">${ad.type === "c" ? "Аукцион" : "АРК"
                }</span>
              <span class="n-count" style="width:65px; min-width:65px;">
              <a href="https://cmp.wildberries.ru/campaigns/edit/${ad.advertId
                }" class="n-ad-product-link" target="_blank">${ad?.advertId || "---"
                }</a></span>
            </div>
            `;
            })
            .join("")}
        </div>
        </div>
      </div>`;

        const productsDotsChartElement = (element.getElementsByClassName("ns-product-dots-chart"))?.[0]
        Engine.renderProductDotsChart(productsDotsChartElement, products.slice(0, 100));
        return element
      },
      arrow: false,
      followCursor: false,
      placement: "left",
      target: "[data-ads-index]",
      trigger: "click",
      interactive: true,
      popperOptions: {
        positionFixed: true,
      },
      appendTo: document.body,
      allowHTML: true,
      inertia: true,
      onShown: () => {
        tippy("[data-tip]", {
          content(reference) {
            const desc = reference.getAttribute("data-tip");
            return `
            <div class="n-column-tip">
              ${desc}
            </div>
            `;
          },
          arrow: false,
          followCursor: false,
          placement: "top",
          allowHTML: true,
        });

        const chartElement = document.getElementById("n-ads-tip-chart");
        const index = chartElement.getAttribute("data-ads-index") || -1;
        const type =
          chartElement.getAttribute("data-is-excluded") === "1"
            ? "excluded"
            : "keywords";
        if (index === -1) return;
        const data = Engine.wordsStats[type][index];
        const ads = data.ads || [];

        const adsBSeries = [];
        const adsCSeries = [];

        ads.forEach((item) => {
          const res = [
            item.position,
            item.boosted_from,
            precise.round(item.cpm / (item.boosted_from - item.position), 2),
            item.cpm,
            item.type,
          ];
          if (item.type === "c") {
            adsCSeries.push(res);
          } else {
            adsBSeries.push(res);
          }
        });

        const myChart = echarts.init(chartElement, "dark");

        const option = {
          backgroundColor: "#162033",
          tooltip: {},
          responsive: true,
          maintainAspectRatio: false,
          grid: {
            left: "8%",
            bottom: "13%",
            right: "8%",
            top: "8%",
          },
          xAxis: [
            {
              position: "top",
              reverse: true,
            },
            {},
          ],
          yAxis: [
            {
              position: "right",
              reverse: true,
            },
            {
              position: "left",
              min: "dataMin",
              max: "dataMax",
              type: "log",
              logBase: 2,
            },
          ],
          series: [
            {
              type: "scatter",
              data: adsBSeries,
              encode: {
                x: 1,
                y: 0,
              },
            },
            {
              type: "line",
              smooth: "true",
              xAxisIndex: 1,
              yAxisIndex: 1,
              itemStyle: {
                color: "#2563eb",
              },
              data: adsBSeries,
              encode: {
                x: 0,
                y: 2,
              },
            },
            {
              type: "line",
              smooth: "true",
              xAxisId: 1,
              yAxisId: 1,
              xAxisIndex: 1,
              yAxisIndex: 1,
              itemStyle: {
                color: "#fd01fe",
              },
              data: adsCSeries,
              encode: {
                x: 0,
                y: 2,
              },
            },
          ],
        };

        // Display the chart using the configuration items and data just specified.
        myChart.setOption(option);
        setTimeout(() => {
          myChart.resize();
        }, 2000);
      },
    });

    Engine.setOnExcludedScanChanged(() => {
      const progressBarElement = document.getElementById("n-excluded-progress");
      if (!Engine.isExcludedScanStarted) {
        progressBarElement.style.display = "none";
        return;
      }

      progressBarElement.style.display = "flex";

      let workers = [];
      let keysToCheck = [...document.querySelectorAll(".n-scan-excluded")];

      async function checkFunc(element) {
        await checkSingleExcluded(element, false);
        workers.pop();
        fillWorkers();
      }

      function fillWorkers() {
        if (!Engine.isExcludedScanStarted) {
          progressBarElement.style.display = "none";
          return;
        }

        if (keysToCheck.length === 0) {
          if (Engine.isExcludedScanStarted) {
            Engine.isExcludedScanStarted = false;
          }
          return;
        }

        const totalKeys = Engine.wordsStats.excluded.length;
        const totalCheckedKeys = totalKeys - keysToCheck.length;
        const progressPercent = Math.round(
          (totalCheckedKeys / totalKeys) * 100
        );
        progressBarElement.style.width = `${progressPercent}%`;

        const addCount = CLUSTERS_THREADS - workers.length;
        for (let i = 0; i < addCount; i++) {
          workers.push(null);
          checkFunc(keysToCheck.shift());
        }
      }

      fillWorkers();
    });

    Engine.setOnClusterCheckChanged(() => {
      const progressBarElement = document.getElementById("n-progress");
      if (!Engine.isClusterCheckStarted) {
        progressBarElement.style.display = "none";
        return;
      }

      progressBarElement.style.display = "flex";

      let workers = [];
      let keysToCheck = [...document.querySelectorAll(".n-check-cluster")];

      async function checkFunc(element) {
        await checkSingleKeyword(element, false);
        workers.pop();
        fillWorkers();
      }

      function fillWorkers() {
        if (!Engine.isClusterCheckStarted) {
          progressBarElement.style.display = "none";
          return;
        }

        if (keysToCheck.length === 0) {
          if (Engine.isClusterCheckStarted) {
            Engine.isClusterCheckStarted = false;
          }
          return;
        }

        const totalKeys = Engine.wordsStats.keywords.length;
        const totalCheckedKeys = totalKeys - keysToCheck.length;
        const progressPercent = Math.round(
          (totalCheckedKeys / totalKeys) * 100
        );
        progressBarElement.style.width = `${progressPercent}%`;

        const addCount = CLUSTERS_THREADS - workers.length;
        for (let i = 0; i < addCount; i++) {
          workers.push(null);
          checkFunc(keysToCheck.shift());
        }
      }

      fillWorkers();
    });

    Engine.setOnPosCheckChanged(() => {
      const progressBarElement = document.getElementById("n-progress");
      if (!Engine.isPosCheckStarted) {
        progressBarElement.style.display = "none";
        return;
      }

      progressBarElement.style.display = "flex";

      const checkFunc = async (threads) => {
        if (!Engine.isPosCheckStarted) {
          progressBarElement.style.display = "none";
          return;
        }
        let keysToCheck = document.querySelectorAll(".n-check-position");

        const totalKeys =
          document.getElementById("n-keywords-list").childNodes.length;
        const totalCheckedKeys = totalKeys - keysToCheck.length;
        const progressPercent = Math.round(
          (totalCheckedKeys / totalKeys) * 100
        );
        progressBarElement.style.width = `${progressPercent}%`;

        if (keysToCheck.length === 0) {
          Engine.isPosCheckStarted = false;
          return;
        }

        const elements = [];

        for (let i = 0; i < threads; i++) {
          if (keysToCheck.length - 1 < i) break;
          const element = keysToCheck[i];
          elements.push(
            checkSinglePosKeyword(element, false, THREAD_DELAY_MS)
          );
        }

        await Promise.all(elements);

        if (!keysToCheck.length) {
          if (Engine.isPosCheckStarted) {
            Engine.isPosCheckStarted = false;
          }
          return;
        }

        checkFunc(threads);
      };
      checkFunc(THREADS);
    });

    showListsButton.addEventListener("click", () => {
      Engine.isListsShow = !Engine.isListsShow;
    });

    checkPositionsButton.addEventListener("click", () => {
      Toastify({
        text: `Автоматический замер позиций отключен. Проверяйте позиции по каждому ключу отдельно по кнопке 'Проверить'`,
        duration: 5000,
        newWindow: true,
        gravity: "bottom", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        style: {
          background: "linear-gradient(to right, #162033, #253144)",
          fontSize: "0.8em",
          maxWidth: "300px",
          borderRadius: "10px",
          border: "1px solid #334155",
          boxShadow: "0",
        },
        offset: {
          y: 200,
        },
      }).showToast();
      // Engine.isPosCheckStarted = !Engine.isPosCheckStarted;
    });

    const copyKeywordsElement = document.getElementById("copy-keywords");
    copyKeywordsElement.addEventListener("click", async () => {
      await copyAllKeywords();
      copyKeywordsElement.innerText = "Фразы скопированы 👍";
      setTimeout(() => {
        copyKeywordsElement.innerText = "Скопировать все фразы";
      }, 2000);
    });

    const copyKeywordsSelectedElement = document.getElementById(
      "copy-keywords-selected"
    );

    const addKeywordsToCustomListsButton = document.getElementById(
      "add-keywords-to-custom-lists-button"
    );
    const removeKeywordsFromCustomListsButton = document.getElementById(
      "remove-keywords-from-custom-lists-button"
    );

    copyKeywordsSelectedElement.addEventListener("click", async () => {
      await copyAllSelectedKeywords();
      copyKeywordsSelectedElement.innerText = "Фразы скопированы 👍";
      setTimeout(() => {
        copyKeywordsSelectedElement.innerText = "Скопировать выбранные фразы";
      }, 2000);
    });

    if (addKeywordsToCustomListsButton.getAttribute("listener") !== "true") {
      addKeywordsToCustomListsButton.setAttribute("listener", true);
      addKeywordsToCustomListsButton.addEventListener("click", () => {
        const foundElement = keywordsListElement.querySelector(
          "#n-add-keywords-to-custom-lists-modal"
        );
        const foundAnotherElement = keywordsListElement.querySelector(
          "#n-remove-keywords-to-custom-lists-modal"
        );
        if (foundAnotherElement) {
          foundAnotherElement.style.display = "none";
        }
        if (foundElement && foundElement?.style?.display === "flex") return;

        if (!foundElement) {
          keywordsListElement.insertAdjacentHTML(
            "afterbegin",
            `
        <div class="n-add-keywords-to-custom-lists-modal" id="n-add-keywords-to-custom-lists-modal">
          <div class="n-add-keywords-to-custom-lists-modal-wrap">
            <div style="width:60px; opacity:0.2;">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
              </svg>
            </div>
            <div style="font-size: 1.2em; font-weight: 600;">В какой список добавить выбранные фразы?</div>
            <div class="n-add-keywords-to-custom-lists-modal-lists" id="n-add-keywords-to-custom-lists-modal-lists"></div>
            <div class="n-btn" style="width: max-content !important" id="n-add-keywords-to-custom-lists-modal-close">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
              Отменить
            </div>
          </div>
        </div>`
          );
        }

        const addKeywordsToCustomListsModal = document.getElementById(
          "n-add-keywords-to-custom-lists-modal"
        );
        const addKeywordsToCustomListsModalLists = document.getElementById(
          "n-add-keywords-to-custom-lists-modal-lists"
        );
        const addKeywordsToCustomListsModalClose = document.getElementById(
          "n-add-keywords-to-custom-lists-modal-close"
        );

        addKeywordsToCustomListsModal.style.display = "flex";
        keywordsListElement.style.overflowY = "hidden";
        keywordsListElement.style.resize = "none";

        const listElements = Engine.customLists.map((list) => {
          const { id, name, color, keywords } = list;
          const keywordsCount = keywords.length;
          return `<div class="n-custom-list-badge n-custom-list-badge-active" style="--n-custom-list-color: #${color}" id="n-custom-list-badge-to-add" data-list-id="${id}">
            <div class="n-custom-list-name" style="padding-left: 8px;">${name}</div>
            <div class="n-custom-list-count">${keywordsCount}</div>
          </div>`;
        });

        if (listElements.length === 0) {
          addKeywordsToCustomListsModalLists.innerText =
            "В кампании отсутствуют списки. Для начала создайте список.";
        } else {
          addKeywordsToCustomListsModalLists.innerHTML = listElements.join("");
        }

        [
          ...addKeywordsToCustomListsModalLists.querySelectorAll(
            "#n-custom-list-badge-to-add"
          ),
        ].forEach((listElement) => {
          if (listElement.getAttribute("listener") !== "true") {
            listElement.setAttribute("listener", true);
            listElement.addEventListener("click", async () => {
              const listId = Number(listElement.dataset.listId);
              const list = Engine.customLists.find(
                (list) => list.id === listId
              );

              if (!list) return;
              const listName = list.name;
              const selectedKeywordsSet = Object.values(
                Engine.wordsStats
              ).reduce((keywordsSet, keywords) => {
                if (!Array.isArray(keywords)) return keywordsSet;
                keywords
                  .filter((keyword) => keyword.selected === true)
                  .forEach(({ keyword }) => keywordsSet.add(keyword));
                return keywordsSet;
              }, new Set(list.keywords));

              const selectedKeywords = [...selectedKeywordsSet];

              setTopLoading(true, "Добавляем фразы в список");
              addKeywordsToCustomListsModal.style.display = "none";
              keywordsListElement.style.overflowY = "scroll";
              keywordsListElement.style.resize = "vertical";
              const isSetSuccess = await Engine.setCustomListKeywords(
                listId,
                selectedKeywords
              );
              if (isSetSuccess) {
                Toastify({
                  text: `✅ В список "${listName}" успешно добавлены ключевые фразы.`,
                  duration: 3000,
                  newWindow: true,
                  gravity: "bottom", // `top` or `bottom`
                  position: "center", // `left`, `center` or `right`
                  style: {
                    background: "linear-gradient(to right, #162033, #253144)",
                    fontSize: "0.8em",
                    maxWidth: "300px",
                    borderRadius: "10px",
                    border: "1px solid #334155",
                    boxShadow: "0",
                  },
                  offset: {
                    y: 200, // vertical axis - can be a number or a string indicating unity. eg: '2em'
                  },
                }).showToast();
                Engine.wordsStats.keywords = Engine.wordsStats.keywords.map(
                  (keyword) => ({ ...keyword, selected: false })
                );
                Engine.wordsStats.excluded = Engine.wordsStats.excluded.map(
                  (keyword) => ({ ...keyword, selected: false })
                );
                Engine.wordsStats.fixed = Engine.wordsStats.fixed.map(
                  (keyword) => ({ ...keyword, selected: false })
                );
                try {
                  keywordsAllCheckbox.checked = false;
                  excludedAllCheckbox.checked = false;
                  fixedAllCheckbox.checked = false;
                } catch (e) { }
                await Engine.getCustomLists();
              } else {
                Toastify({
                  text: `⛔ Ошибка изменения ключевых фраз в списке. Попробуйте повторить попытку позже.`,
                  duration: 3000,
                  newWindow: true,
                  gravity: "bottom", // `top` or `bottom`
                  position: "center", // `left`, `center` or `right`
                  style: {
                    background: "linear-gradient(to right, #162033, #253144)",
                    fontSize: "0.8em",
                    maxWidth: "300px",
                    borderRadius: "10px",
                    border: "1px solid #334155",
                    boxShadow: "0",
                  },
                  offset: {
                    y: 200, // vertical axis - can be a number or a string indicating unity. eg: '2em'
                  },
                }).showToast();
              }
              setTopLoading(false);
              Engine.select("keywords", 0);
              Engine.select("keywords", 0);
              keywordsListElement.innerHTML = Engine.renderKeywordsList();
            });
          }
        });

        if (
          addKeywordsToCustomListsModalClose.getAttribute("listener") !== "true"
        ) {
          addKeywordsToCustomListsModalClose.setAttribute("listener", true);
          addKeywordsToCustomListsModalClose.addEventListener("click", () => {
            addKeywordsToCustomListsModal.style.display = "none";
            keywordsListElement.style.overflowY = "scroll";
            keywordsListElement.style.resize = "vertical";
          });
        }
      });
    }

    if (
      removeKeywordsFromCustomListsButton.getAttribute("listener") !== "true"
    ) {
      removeKeywordsFromCustomListsButton.setAttribute("listener", true);
      removeKeywordsFromCustomListsButton.addEventListener("click", () => {
        const foundElement = keywordsListElement.querySelector(
          "#n-remove-keywords-to-custom-lists-modal"
        );
        const foundAnotherElement = keywordsListElement.querySelector(
          "#n-add-keywords-to-custom-lists-modal"
        );

        if (foundAnotherElement) {
          foundAnotherElement.style.display = "none";
        }

        if (foundElement && foundElement?.style?.display === "flex") return;

        if (!foundElement) {
          keywordsListElement.insertAdjacentHTML(
            "afterbegin",
            `
        <div class="n-add-keywords-to-custom-lists-modal" id="n-remove-keywords-to-custom-lists-modal">
          <div class="n-add-keywords-to-custom-lists-modal-wrap">
            <div style="width:60px; opacity:0.2;">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
              </svg>
            </div>
            <div style="font-size: 1.2em; font-weight: 600;">Из какого списка удалить выбранные фразы?</div>
            <div class="n-add-keywords-to-custom-lists-modal-lists" id="n-remove-keywords-to-custom-lists-modal-lists"></div>
            <div class="n-btn" style="width: max-content !important" id="n-remove-keywords-to-custom-lists-modal-close">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
              Отменить
            </div>
          </div>
        </div>`
          );
        }

        const removeKeywordsToCustomListsModal = document.getElementById(
          "n-remove-keywords-to-custom-lists-modal"
        );
        const removeKeywordsToCustomListsModalLists = document.getElementById(
          "n-remove-keywords-to-custom-lists-modal-lists"
        );
        const removeKeywordsToCustomListsModalClose = document.getElementById(
          "n-remove-keywords-to-custom-lists-modal-close"
        );

        removeKeywordsToCustomListsModal.style.display = "flex";
        keywordsListElement.style.overflowY = "hidden";
        keywordsListElement.style.resize = "none";

        const listElements = Engine.customLists
          .filter((list) => list.keywords.length)
          .map((list) => {
            const { id, name, color, keywords } = list;
            const keywordsCount = keywords.length;
            return `<div class="n-custom-list-badge n-custom-list-badge-active" style="--n-custom-list-color: #${color}" id="n-custom-list-badge-to-remove" data-list-id="${id}">
            <div class="n-custom-list-name" style="padding-left: 8px;">${name}</div>
            <div class="n-custom-list-count">${keywordsCount}</div>
          </div>`;
          });

        if (listElements.length === 0) {
          removeKeywordsToCustomListsModalLists.innerText =
            "В кампании отсутствуют списки. Для начала создайте список.";
        } else {
          removeKeywordsToCustomListsModalLists.innerHTML =
            listElements.join("");
        }

        [
          ...removeKeywordsToCustomListsModalLists.querySelectorAll(
            "#n-custom-list-badge-to-remove"
          ),
        ].forEach((listElement) => {
          if (listElement.getAttribute("listener") !== "true") {
            listElement.setAttribute("listener", true);
            listElement.addEventListener("click", async () => {
              const listId = Number(listElement.dataset.listId);
              const list = Engine.customLists.find(
                (list) => list.id === listId
              );

              if (!list) return;

              const listName = list.name;
              const selectedKeywordsSet = Object.values(
                Engine.wordsStats
              ).reduce((keywordsSet, keywords) => {
                if (!Array.isArray(keywords)) return keywordsSet;
                keywords
                  .filter((keyword) => keyword.selected === true)
                  .forEach(({ keyword }) => keywordsSet.delete(keyword));
                return keywordsSet;
              }, new Set(list.keywords));

              const selectedKeywords = [...selectedKeywordsSet];

              if (selectedKeywordsSet.size === list.keywords.length) {
                Toastify({
                  text: `В данном списке уже отсутствуют выбранные фразы`,
                  duration: 3000,
                  newWindow: true,
                  gravity: "bottom", // `top` or `bottom`
                  position: "center", // `left`, `center` or `right`
                  style: {
                    background: "linear-gradient(to right, #162033, #253144)",
                    fontSize: "0.8em",
                    maxWidth: "300px",
                    borderRadius: "10px",
                    border: "1px solid #334155",
                    boxShadow: "0",
                  },
                  offset: {
                    y: 200, // vertical axis - can be a number or a string indicating unity. eg: '2em'
                  },
                }).showToast();
                return;
              }

              setTopLoading(true, "Удаляем фразы из списка");
              removeKeywordsToCustomListsModal.style.display = "none";
              keywordsListElement.style.overflowY = "scroll";
              keywordsListElement.style.resize = "vertical";
              const isSetSuccess = await Engine.setCustomListKeywords(
                listId,
                selectedKeywords
              );
              if (isSetSuccess) {
                Toastify({
                  text: `✅ В списке "${listName}" успешно удалены ключевые фразы.`,
                  duration: 3000,
                  newWindow: true,
                  gravity: "bottom", // `top` or `bottom`
                  position: "center", // `left`, `center` or `right`
                  style: {
                    background: "linear-gradient(to right, #162033, #253144)",
                    fontSize: "0.8em",
                    maxWidth: "300px",
                    borderRadius: "10px",
                    border: "1px solid #334155",
                    boxShadow: "0",
                  },
                  offset: {
                    y: 200, // vertical axis - can be a number or a string indicating unity. eg: '2em'
                  },
                }).showToast();
                Engine.wordsStats.keywords = Engine.wordsStats.keywords.map(
                  (keyword) => ({ ...keyword, selected: false })
                );
                Engine.wordsStats.excluded = Engine.wordsStats.excluded.map(
                  (keyword) => ({ ...keyword, selected: false })
                );
                Engine.wordsStats.fixed = Engine.wordsStats.fixed.map(
                  (keyword) => ({ ...keyword, selected: false })
                );
                try {
                  keywordsAllCheckbox.checked = false;
                  excludedAllCheckbox.checked = false;
                  fixedAllCheckbox.checked = false;
                } catch (e) { }
                await Engine.getCustomLists();
              } else {
                Toastify({
                  text: `⛔ Ошибка изменения ключевых фраз в списке. Попробуйте повторить попытку позже.`,
                  duration: 3000,
                  newWindow: true,
                  gravity: "bottom", // `top` or `bottom`
                  position: "center", // `left`, `center` or `right`
                  style: {
                    background: "linear-gradient(to right, #162033, #253144)",
                    fontSize: "0.8em",
                    maxWidth: "300px",
                    borderRadius: "10px",
                    border: "1px solid #334155",
                    boxShadow: "0",
                  },
                  offset: {
                    y: 200, // vertical axis - can be a number or a string indicating unity. eg: '2em'
                  },
                }).showToast();
              }
              setTopLoading(false);
              Engine.select("keywords", 0);
              Engine.select("keywords", 0);
              keywordsListElement.innerHTML = Engine.renderKeywordsList();
            });
          }
        });

        if (
          removeKeywordsToCustomListsModalClose.getAttribute("listener") !==
          "true"
        ) {
          removeKeywordsToCustomListsModalClose.setAttribute("listener", true);
          removeKeywordsToCustomListsModalClose.addEventListener(
            "click",
            () => {
              removeKeywordsToCustomListsModal.style.display = "none";
              keywordsListElement.style.overflowY = "scroll";
              keywordsListElement.style.resize = "vertical";
            }
          );
        }
      });
    }

    const copyExcludedElement = document.getElementById("copy-excluded");
    copyExcludedElement.addEventListener("click", async () => {
      await copyAllExcluded();
      copyExcludedElement.innerText = "Минус-фразы скопированы 👍";
      setTimeout(() => {
        copyExcludedElement.innerText = "Скопировать минус-фразы";
      }, 2000);
    });

    const copyFixedElement = document.getElementById("copy-fixed");
    copyFixedElement.addEventListener("click", async () => {
      await copyAllFixed();
      copyFixedElement.innerText = "Фикс-фразы скопированы 👍";
      setTimeout(() => {
        copyFixedElement.innerText = "Скопировать фикс-фразы";
      }, 2000);
    });
  };

  class Logger {
    static send({ type, data }) {
      try {
        const uri = "https://ext.neuromarket.online/logs/";
        const params = {
          campaignId: Engine.campaignId,
          userId: Engine.userData.id,
          type,
        };

        const url =
          uri +
          "?" +
          Object.entries(params)
            .map(([key, value]) => `${key}=${value}`)
            .join("&");
        return new Promise((resolve, reject) => {
          const onResponse = (response) => {
            console.log("Logger: [SENT]", type);
            resolve();
          };

          window.chrome.runtime.sendMessage(
            NEUROMARKET_CHROME_ID,
            {
              type: "fetchJson",
              url,
              options: {
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify(data),
                method: "POST",
                mode: "cors",
                credentials: "omit",
              },
            },
            onResponse
          );
        });
      } catch (e) {
        console.log("Logger: [ERROR]", e);
      }
    }

    static getCampaignsNotes(campaignIds) {
      try {
        const params = {
          campaignIds: campaignIds.join(";"),
          type: "note",
        };

        const uri = "https://ext.neuromarket.online/notes";
        const url =
          uri +
          "?" +
          Object.entries(params)
            .map(([key, value]) => `${key}=${value}`)
            .join("&");

        return new Promise((resolve, reject) => {
          const onResponse = (response) => {
            resolve(response);
          };

          window.chrome.runtime.sendMessage(
            NEUROMARKET_CHROME_ID,
            {
              type: "fetchJson",
              url,
              options: {
                headers: {
                  "content-type": "application/json",
                },
                method: "GET",
                mode: "cors",
                credentials: "include",
              },
            },
            onResponse
          );
        });
      } catch (e) {
        console.log("Logger: [ERROR]", e);
      }
    }

    static getAll() {
      try {
        const params = {
          campaignId: Engine.campaignId,
          userId: Engine.userData.id,
        };

        const uri = "https://ext.neuromarket.online/logs/";
        const url =
          uri +
          "?" +
          Object.entries(params)
            .map(([key, value]) => `${key}=${value}`)
            .join("&");

        return new Promise((resolve, reject) => {
          const onResponse = (response) => {
            console.log("Logger: [GET]", campaignId);
            resolve(response);
          };

          window.chrome.runtime.sendMessage(
            NEUROMARKET_CHROME_ID,
            {
              type: "fetchJson",
              url,
              options: {
                headers: {
                  "content-type": "application/json",
                },
                method: "GET",
                mode: "cors",
                credentials: "include",
              },
            },
            onResponse
          );
        });
      } catch (e) {
        console.log("Logger: [ERROR]", e);
      }
    }
  }

  class NeuromarketEngine {
    #userAuthData = false;

    #isExcludedScanStarted = false;
    #isClusterCheckStarted = false;
    #isListsShow = false;
    #isPosCheckStarted = false;
    #wordsStats = {};
    #clusterize = false;
    #fullStatsLoaded = false; //БЫЛО true
    #realTimeStatsLoaded = false;
    #datesStatsLoaded = false;
    #wordsStatsLoaded = false; //БЫЛО true
    #productDataLoaded = false;
    #productBuyOutDataLoaded = false;
    #productDataLoadError = false;
    #productSalesFunnelDataLoadError = false;
    #productSalesFunnelDataLoaded = false;
    #isProductDataMerged = false;
    #isKeywordsSelected = false;
    #isFixedSelected = false;
    #isRestoreClusterSelected = false;
    #isRestoreKeywordSelected = false;
    #isRestoreExcludedSelected = false;
    #datePickerLoaded = true;
    datePickerFrom = null;
    datePickerTo = null;
    campaignInfo = null;

    //CUSTOM LISTS

    #customListsSelectedColor = "f56d20";
    #customLists = [];

    //------------

    #campaignLogs = null;
    #campaignLogsFilter = [];

    #selectedChartData = [
      {
        accessor: "totals-views",
        name: "Показы",
        color: "#A162F7",
        axisId: 0,
        type: "line",
      },
      {
        accessor: "totals-clicks",
        name: "Клики",
        color: "#2563eb",
        axisId: 1,
        type: "line",
      },
      {
        accessor: "totals-money",
        name: "Затраты",
        color: "#15FFAB",
        axisId: 5,
        type: "line",
      },
    ];

    accessToken = localStorage?.getItem("access-token");
    realTimeInterval;

    supplierUsers;

    sumFreqFromFilter = null;
    sumFreqToFilter = null;
    freqFromFilter = null;
    freqToFilter = null;
    positionFromFilter = null;
    positionToFilter = null;
    positionDeltaFromFilter = null;
    positionDeltaToFilter = null;
    positionBoostFromFilter = null;
    positionBoostToFilter = null;
    countFromFilter = null;
    countToFilter = null;
    clicksFromFilter = null;
    clicksToFilter = null;
    ctrFromFilter = null;
    ctrToFilter = null;
    cpcFromFilter = null;
    cpcToFilter = null;
    moneyFromFilter = null;
    moneyToFilter = null;

    supplierRawData = null;
    supplierId = null;

    #isWidgetOpen = false;
    clustersRaw = [];
    someKeywordsSelected = false;
    fullStatsRaw = [];
    ordersStatsRaw = [];
    catalogStatsRaw = [];
    boostingStatsRaw = [];
    datesStats = {};
    realTimeStats = [];
    datesCalculatedStats = {};
    datesCalculatedTotalsStats = {};

    productImagesAppended = false;

    productDetails = null;
    #allProductDetails;
    #allProductOutsideDetails;

    #showOnlyDanger = false;
    #showOnlyActiveClusters = false;
    #showOnlyOffClusters = false;
    #showOnlyNotFoundClusters = false;
    #showOnlyPKClusters = false;
    #showOnlyAutoClusters = false;
    #showOnlyNewPhrases = false;
    #showOnlyPhrasesWithoutBoost = false;
    #showOnlyFoundClusters = false;
    #showOnlyFixedClusters = false;
    #showOnlyUnfixedClusters = false;

    keywordsClusterized = [];
    wordsClusters = new Map();
    searchText = "";
    excludedSearchText = "";
    fixedSearchText = "";
    sortOptions = {
      column: "count",
      order: "desc",
    };
    sortExcludedOptions = {
      column: "count",
      order: "desc",
    };
    sortFixedOptions = {
      column: "count",
      order: "desc",
    };
    keywordsToExport = [];
    excludedToExport = [];
    fixedToExport = [];

    onExcludedScanChanged = () => { };
    onClusterCheckChanged = () => { };
    onPosCheckChanged = () => { };

    #region =
      JSON.parse(localStorage.getItem("neuromarket-region")) ||
      REGIONS["MOSCOW"];

    supplier = null;
    #userData = null;
    balance = null;

    #placement = null;
    CPM = null;
    BUDGET = null;

    #ApiToken = null;

    #onlySevenDays = null;

    constructor(campaignId) {
      window.__NEUROMARKET_ENGINE__ = true;
      this.campaignId = Number(campaignId);
      this.isWidgetOpen =
        Number(localStorage.getItem("neuromarket_should_widget_open")) || false;
      try {
        document.getElementById("n-destination-name").innerText =
          this.#region.name;
      } catch (e) { }
    }

    destroy() {
      clearInterval(this.realTimeInterval);
    }

    showTarrifsWindow() {
      const tariffsOverlayElement = document.getElementById("n-tariffs-overlay")
      tariffsOverlayElement.style.display = "flex";
    }

    async requestPromo(userId, promoCode) {
      const URL = PAY_HOST + "request-promo"
      const body = { userId, promoCode: promoCode.toLowerCase() }

      const res = await fetch(URL, {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(body)
      })
      return res;
    }

    async createPayment(userId, tariffId, promoCode, campaignId) {
      const URL = PAY_HOST + "payment"
      const body = { userId, tariffId, promoCode, campaignId }

      const res = await fetch(URL, {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(body)
      })
      return res;
    }


    renderProductDotsChart(productDotsChartElement, products = []) {
      const totalProducts = products.length;
      const page = 1
      if (totalProducts === 0) return;

      const diffCount = 100 - products.length;
      const tooltipPosition = `<div class="ns-dot-tooltip" id="ns-dot-position"></div>`;
      const resultDots = [tooltipPosition];

      const boltSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" style="color: #4ade80cc"viewBox="0 0 16 16" fill="currentColor" class="size-4">
      <path fill-rule="evenodd" d="M9.58 1.077a.75.75 0 0 1 .405.82L9.165 6h4.085a.75.75 0 0 1 .567 1.241l-6.5 7.5a.75.75 0 0 1-1.302-.638L6.835 10H2.75a.75.75 0 0 1-.567-1.241l6.5-7.5a.75.75 0 0 1 .897-.182Z" clip-rule="evenodd" />
    </svg>`;

      const boltSVGYellow = `
    <svg xmlns="http://www.w3.org/2000/svg" style="color: #ffc1008a"viewBox="0 0 16 16" fill="currentColor" class="size-4">
      <path fill-rule="evenodd" d="M9.58 1.077a.75.75 0 0 1 .405.82L9.165 6h4.085a.75.75 0 0 1 .567 1.241l-6.5 7.5a.75.75 0 0 1-1.302-.638L6.835 10H2.75a.75.75 0 0 1-.567-1.241l6.5-7.5a.75.75 0 0 1 .897-.182Z" clip-rule="evenodd" />
    </svg>`;


      let productId;
      if (window.__NEUROMARKET_AD_TYPE === "AUTO") {
        productId = Engine.placement.nms[0].nm;
      }
      if (window.__NEUROMARKET_AD_TYPE === "SEARCH") {
        productId = Engine.placement.place[0].searchElements[0].nm;
      }
      if (window.__NEUROMARKET_AD_TYPE === "SEACAT") {
        productId = Engine.placement.subjects[0].nms[0].nm;
      }

      products.forEach(({ id, supplierId, name, log, logs }, index) => {
        const isSuppliersProduct = supplierId === this?.supplierId;
        const isSameProduct = id === productId
        const revealOwnDuration = index * 5;
        const revealDuration = index * 15;
        const position =
          ((page || 1) - 1) * 100 +
          (index + 1);

        let dotTemplate = `<div class="ns-product-dots-chart-dot" id="ns-product-dots-chart-dot" data-position="${position}" data-nm-id="${id}" style="--dot-animation-duration:${isSuppliersProduct ? revealOwnDuration : revealDuration
          }ms">${isSuppliersProduct ? isSameProduct ? boltSVG : boltSVGYellow : ""}</div>`;
        if (log?.tp === "c") {
          dotTemplate = `<div class="ns-product-dots-chart-dot ns-product-dots-chart-dot-ad-search" data-position="${position}" id="ns-product-dots-chart-dot" data-nm-id="${id}" style="--dot-animation-duration:${isSuppliersProduct ? revealOwnDuration : revealDuration
            }ms">${isSuppliersProduct ? isSameProduct ? boltSVG : boltSVGYellow : ""}</div>`;
        }
        if (logs !== undefined && log?.tp !== "c") {
          dotTemplate = `<div class="ns-product-dots-chart-dot ns-product-dots-chart-dot-ad-auto" data-position="${position}" id="ns-product-dots-chart-dot" data-nm-id="${id}" style="--dot-animation-duration:${isSuppliersProduct ? revealOwnDuration : revealDuration
            }ms">${isSuppliersProduct ? isSameProduct ? boltSVG : boltSVGYellow : ""}</div>`;
        }
        resultDots.push(dotTemplate);
      });

      const revealDuration = products.length * 15;

      for (let i = 0; i < diffCount; i++) {
        const emptyTemplate = `<div class="ns-product-dots-chart-dot ns-product-dots-chart-dot-empty" style="--dot-animation-duration:${revealDuration}ms"></div>`;
        resultDots.push(emptyTemplate);
      }

      productDotsChartElement.innerHTML = resultDots.join("");
      const dotElements = [
        ...productDotsChartElement.querySelectorAll("#ns-product-dots-chart-dot"),
      ];

      let isMouseOverDot = false;
      let hideTimeout;
      const tooltip = productDotsChartElement.querySelector("#ns-dot-position");
      tooltip.style.display = "none";

      dotElements.forEach((dot, index) => {
        dot.addEventListener("mouseover", (e) => {
          clearTimeout(hideTimeout);
          isMouseOverDot = true;
          this.renderDotTooltipByIndex(products, index);
        });

        dot.addEventListener("mouseout", (e) => {
          isMouseOverDot = false;
          hideTimeout = setTimeout(() => {
            if (!isMouseOverDot) {
              tooltip.innerText = "";
              tooltip.style.display = "none";
            }
          }, 200);
        });

        dot.addEventListener("click", () => {
          const productId = dot.dataset.nmId;
          let needleElement = document.querySelector(
            `article[data-nm-id="${productId}"]`
          );
          needleElement?.scrollIntoView({ block: "center" });
          needleElement?.classList.add("ns-scale-product-card");
          setTimeout(() => {
            needleElement?.classList.remove("ns-scale-product-card");
          }, 2200);
        });
      });
    }


    hideDotTooltip() {
      const tooltip = document.getElementById("ns-dot-position");
      tooltip.style.display = "none";
    }

    renderDotTooltipByIndex(products, index) {
      const dotElements = [
        ...document.querySelectorAll("#ns-product-dots-chart-dot"),
      ];

      if (index > dotElements.length - 1) return;

      const tooltip = document.getElementById("ns-dot-position");

      const dot = dotElements[index];
      const position = dot.dataset.position;
      const productId = Number(dot.dataset.nmId);
      const product = products.find((item) => item.id === productId);
      const price = product.sizes?.[0]?.price?.product / 100;
      const brand = product?.brand;
      if (tooltip.style.display === "none") {
        tooltip.style.display = "block";
      }

      tooltip.innerHTML = `
        <div style="display:flex; z-index:10; position:relative; gap:4px; flex-direction: column; min-width: 200px;">
          <img src="${imageURL(
        productId
      )}" style="flex:1; opacity:0.95; width: 200px; height: 380px; border-radius: 8px;background: #efeff4;"/>
          <div style="position:absolute; top:4px; left:4px;">
            <div style="display: flex;gap: 4px;padding: 2px 10px 2px 4px;align-items: center;font-weight: 600 !important;background: #162033;border-radius: 7px;">
              <img style="height:24px; padding-top:1px;" src="https://cdn.neuromarket.online/images/logo_symbol.png" />
              <span>${position}</span>
            </div>
          </div>
          <span style="font-size: 1.4em; font-weight: 600;">${price}<small>₽</small></span>
          <div>${brand !== undefined ? `<span>${brand} / </span>` : ""
        }<span style="color: #cbd5e1;">${product.name}</span></div>
        </div>
      `;
    }

    get userAuthData() {
      return this.#userAuthData
    }

    set userAuthData(data) {
      this.#userAuthData = data

      const userTariffBadgeElement = document.getElementById("n-user-tariff-badge");
      const userTariffNameElement = document.getElementById("n-user-tariff-name");
      const userTariffDaysElement = document.getElementById("n-user-tariff-days");
      userTariffBadgeElement.style.display = "flex";

      userTariffBadgeElement.addEventListener("click", () => {
        this.showTarrifsWindow()
      })

      if (this.#userAuthData.days === 0) {
        userTariffNameElement.innerHTML = `
          <div class="n-topup-btn" id="n-topup-btn">Оплатить Доступ</div>
        `

        tippy(userTariffNameElement, {
          content(reference) {
            return `
            <div class="n-column-tip">
              У вас закончился пробный период или оплаченный тариф.
            </div>
            `;
          },
          arrow: false,
          followCursor: false,
          placement: "top",
          allowHTML: true,
        });
        return;
      }
      userTariffNameElement.innerText = this.#userAuthData.tariff_name
      userTariffDaysElement.innerText = this.#userAuthData.days + " " + createLabel(this.#userAuthData.days, ['день', 'дня', 'дней'])

      if (this.#userAuthData.days > 0) {
        if (this.#userAuthData.days <= 7) {
          userTariffDaysElement.style.color = "#d1a724";
        }

        if (this.#userAuthData.days <= 3) {
          userTariffDaysElement.style.color = "#dc2626";
        }
      }

      tippy(userTariffNameElement, {
        content(reference) {
          return `
          <div class="n-column-tip">
            Ваш текущий тариф и количество дней до его окончания
          </div>
          `;
        },
        arrow: false,
        followCursor: false,
        placement: "top",
        allowHTML: true,
      });
    }

    get userData() {
      return this.#userData;
    }

    set userData(value) {
      this.#userData = value;
      if (this.#userData?.id) {
        const userId = this.#userData.id;
        const userIdBadgeElement = document.getElementById("n-user-id-badge");
        const userIdShowBtn = document.getElementById("n-user-id-show-btn");
        const userIdValueElement = document.getElementById("n-user-id-value");
        userIdShowBtn.dataset.hidden = "true";
        userIdValueElement.innerText = maskString(userId, 4);
        userIdBadgeElement.style.display = "flex";

        tippy(userIdValueElement, {
          content(reference) {
            return `
            <div class="n-column-tip">
              Это ваш Идентификатор пользователя WB
            </div>
            `;
          },
          arrow: false,
          followCursor: false,
          placement: "top",
          allowHTML: true,
        });
      }
    }

    set customListsSelectedColor(value) {
      this.#customListsSelectedColor = value;
    }

    get customListsSelectedColor() {
      return this.#customListsSelectedColor;
    }

    set customLists(value) {
      const oldCustomLists = [...this.#customLists];

      if (oldCustomLists.length > 0) {
        this.#customLists = value.map((newList) => {
          const foundOldList = oldCustomLists.find(
            (oldList) => oldList.id === newList.id
          );
          if (!foundOldList) return newList;
          return {
            ...newList,
            selected: foundOldList.selected,
            except: foundOldList.except,
          };
        });
      } else {
        this.#customLists = value;
      }

      const emptyMessageElement = document.getElementById(
        "n-empty-custom-lists-msg"
      );
      const customListsElement = document.getElementById("n-custom-lists");
      this.renderCustomLists();
      if (this.#customLists.length) {
        emptyMessageElement.style.display = "none";
        customListsElement.style.justifyContent = "flex-start";
      } else {
        emptyMessageElement.style.display = "block";
        customListsElement.style.justifyContent = "center";
      }
    }

    customListTemplate(list) {
      const { id, name, color, keywords, userId, selected, except } = list;
      const keywordsCount = keywords.length;
      return `
        <div class="n-custom-list-badge ${selected ? "n-custom-list-badge-active" : ""
        }" id="n-custom-list-badge" data-list-id="${id}" style="--n-custom-list-color: #${color}">
          <div class="n-custom-list-circle-wrap" data-except="${except ? "true" : "false"
        }" id="n-custom-list-circle-wrap">
            ${selected
          ? except
            ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
              </svg>
              `
            : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clip-rule="evenodd" />
              </svg>
              `
          : `<div class="n-custom-list-circle"></div>`
        }
          </div>
          <div class="n-custom-list-name">${name}</div>
          <div class="n-custom-list-count">${keywordsCount}</div>
        </div>
      `;
    }

    renderCustomLists() {
      const listElements = this.customLists.map(this.customListTemplate);
      const badgesElement = document.getElementById("n-custom-list-badges");

      badgesElement.innerHTML = listElements.join(" ");
      const keywordsListElement = document.getElementById("n-keywords-list");
      [...document.querySelectorAll("#n-custom-list-badge")].forEach(
        (listBadge) => {
          if (listBadge.getAttribute("listener") !== "true") {
            listBadge.setAttribute("listener", "true");
            const listId = Number(listBadge.dataset.listId);

            const listIndex = this.customLists.findIndex(
              (list) => list.id === listId
            );
            if (listIndex === -1) return;
            const list = this.customLists[listIndex];

            const circleElement = listBadge.querySelector(
              "#n-custom-list-circle-wrap"
            );

            circleElement.addEventListener("click", (circleEvent) => {
              if (!this.#customLists[listIndex].selected) return;
              if (circleElement.dataset.except === "false") {
                circleElement.dataset.except = true;
                this.#customLists[listIndex].except = true;
                circleElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
              </svg>
              `;
              } else {
                circleElement.dataset.except = false;
                this.#customLists[listIndex].except = false;
                circleElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clip-rule="evenodd" />
              </svg>`;
              }
              circleEvent.stopPropagation();
              keywordsListElement.innerHTML = this.renderKeywordsList();
            });

            listBadge.addEventListener("click", (badgeEvent) => {
              if (list.selected === true) {
                this.#customLists[listIndex].selected = false;
                this.#customLists[listIndex].except = false;
                circleElement.innerHTML = `<div class="n-custom-list-circle"></div>`;
                listBadge.classList.remove("n-custom-list-badge-active");
              } else {
                circleElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                  <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                  <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clip-rule="evenodd" />
                </svg>`;
                this.#customLists[listIndex].selected = true;
                this.#customLists[listIndex].except = false;
                listBadge.classList.add("n-custom-list-badge-active");
              }
              circleElement.dataset.except = false;
              keywordsListElement.innerHTML = this.renderKeywordsList();
            });
            let overActionButtons = false;
            listBadge.addEventListener("contextmenu", (e) => {
              e.preventDefault();
              let actionButtonsElement = badgesElement.querySelector(
                `#n-custom-list-action-buttons[data-list-id="${listId}"]`
              );
              if (!actionButtonsElement) {
                listBadge.insertAdjacentHTML(
                  "afterend",
                  `
                    <div class="n-custom-list-action-buttons" id="n-custom-list-action-buttons" data-list-id="${listId}">
                      <div class="n-custom-list-action-button" id="n-custom-list-action-edit" data-list-id="${listId}">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>        
                      </div>
                      <div class="n-custom-list-action-button" id="n-custom-list-action-delete" data-list-id="${listId}">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>                  
                      </div>
                    </div>
                  `
                );
              }

              actionButtonsElement = badgesElement.querySelector(
                `#n-custom-list-action-buttons[data-list-id="${listId}"]`
              );

              actionButtonsElement.addEventListener("mouseenter", () => {
                overActionButtons = true;
              });

              actionButtonsElement.addEventListener("mouseleave", () => {
                overActionButtons = false;
                setTimeout(() => {
                  if (!overActionButtons) actionButtonsElement.remove();
                }, 200);
              });

              const editButton = actionButtonsElement.querySelector(
                `#n-custom-list-action-edit`
              );
              const deleteButton = actionButtonsElement.querySelector(
                `#n-custom-list-action-delete`
              );

              editButton.addEventListener("click", async () => {
                let editListArea = badgesElement.querySelector(
                  `#n-list-edit-area[data-list-id="${listId}"]`
                );
                if (editListArea) return;
                const customList = this.customLists.find(
                  ({ id }) => id === listId
                );

                listBadge.insertAdjacentHTML(
                  "afterend",
                  `<div id="n-list-edit-area" data-list-id="${listId}" style="width:max-content; position: absolute; right: 0; margin-top: -8px; z-index: 10; border: 1px solid #ffffff20;">
                  <div class="n-list-edit-title">Изменение списка "${customList.name}"</div>
                  <div contenteditable="plaintext-only" spellcheck="false" class="n-bulk-excluded-area" id="n-list-edit-list"></div>
                  <div class="n-action-buttons">
                    <div class="n-btn" id="n-list-edit-accept" style="display:flex;text-transform: uppercase;font-weight: 500;font-size: 0.9em;color: #cbd5e1;">Сохранить фразы в списке</div>
                    <div class="n-btn" id="n-list-edit-close" style="display:flex;text-transform: uppercase;font-weight: 500;font-size: 0.9em;color: #cbd5e1;">Закрыть</div>
                  </div>
                </div>`
                );

                editListArea = badgesElement.querySelector(
                  `#n-list-edit-area[data-list-id="${listId}"]`
                );

                const editListList =
                  editListArea.querySelector(`#n-list-edit-list`);

                const saveBtn =
                  editListArea.querySelector(`#n-list-edit-accept`);

                const closeBtn =
                  editListArea.querySelector(`#n-list-edit-close`);

                editListList.innerHTML = customList.keywords.join("\n");

                closeBtn.addEventListener("click", () => {
                  editListArea.remove();
                });
                saveBtn.addEventListener("click", async () => {
                  saveBtn.innerHTML = checkLoader;
                  const keywords = editListList.innerText
                    .split("\n")
                    .map((k) => k.trim())
                    .filter((i) => i.length > 2);

                  await this.setCustomListKeywords(listId, keywords);
                  Toastify({
                    text: `✅ Изменили список "${customList.name}"`,
                    duration: 3000,
                    newWindow: true,
                    gravity: "bottom", // `top` or `bottom`
                    position: "center", // `left`, `center` or `right`
                    style: {
                      background: "linear-gradient(to right, #162033, #253144)",
                      fontSize: "0.8em",
                      maxWidth: "300px",
                      borderRadius: "10px",
                      border: "1px solid #334155",
                      boxShadow: "0",
                    },
                    offset: {
                      y: 200, // vertical axis - can be a number or a string indicating unity. eg: '2em'
                    },
                  }).showToast();
                  await this.getCustomLists();
                });
              });

              deleteButton.addEventListener("click", async () => {
                actionButtonsElement.innerHTML = checkLoader;
                await this.deteleCustomList(listId);
                await this.getCustomLists();
              });
            });

            listBadge.addEventListener("mouseleave", () => {
              const actionButtonsElement = badgesElement.querySelector(
                `#n-custom-list-action-buttons[data-list-id="${listId}"]`
              );
              if (!actionButtonsElement) return;
              setTimeout(() => {
                if (!overActionButtons) actionButtonsElement.remove();
              }, 200);
            });
          }
        }
      );
    }

    get customLists() {
      return this.#customLists;
    }

    get onlySevenDays() {
      return this.#onlySevenDays;
    }

    set onlySevenDays(value) {
      const switchSevenToAllStatsBtn = document.getElementById(
        "switch-seven-to-all-stats-btn"
      );
      if (value) {
        switchSevenToAllStatsBtn.style.display = "flex";
      } else {
        switchSevenToAllStatsBtn.style.display = "none";
      }
      this.#onlySevenDays = value;
    }

    checkApiToken(ApiToken) {
      try {
        return new Promise((resolve, reject) => {
          const timeoutHandler = setTimeout(() => {
            resolve(false);
          }, 3000);

          const onResponse = (response) => {
            clearTimeout(timeoutHandler);
            if (response?.adverts) {
              resolve(true);
            } else {
              resolve(false);
            }
          };

          window.chrome.runtime.sendMessage(
            NEUROMARKET_CHROME_ID,
            {
              type: "fetchJson",
              url: "https://advert-api.wildberries.ru/adv/v1/promotion/count",
              options: {
                headers: {
                  accept: "application/json",
                  "accept-language":
                    "en-US,en;q=0.9,ru-RU;q=0.8,ru;q=0.7,zh-CN;q=0.6,zh-TW;q=0.5,zh;q=0.4",
                  authorization: ApiToken,
                  "content-type": "application/json",
                  "sec-ch-ua":
                    '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
                  "sec-ch-ua-mobile": "?0",
                  "sec-ch-ua-platform": '"Windows"',
                  "sec-fetch-dest": "empty",
                  "sec-fetch-mode": "cors",
                  "sec-fetch-site": "cross-site",
                },
                method: "GET",
                mode: "cors",
              },
            },
            onResponse
          );
        });
      } catch (e) {
        console.log(e);
        return Promise.resolve(false);
      }
    }

    get ApiToken() {
      return this.#ApiToken;
    }

    set ApiToken(value) {
      try {
        const decoded = jwtDecode(value);
        const s = decoded?.s;
        if ((s >> 2) % 2 != 0 && (s >> 6) % 2 != 0) {
          this.#ApiToken = value;
        } else {
          Toastify({
            text: `У API токена нет прав на доступ к разделам "Аналитика" или "Продвижение"`,
            duration: 5000,
            newWindow: true,
            gravity: "bottom", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            style: {
              background: "linear-gradient(to right, #162033, #253144)",
              fontSize: "0.8em",
              maxWidth: "300px",
              borderRadius: "10px",
              border: "1px solid #334155",
              boxShadow: "0",
            },
            offset: {
              y: 200,
            },
          }).showToast();
        }
      } catch (e) {
        console.log(e);
      }
    }

    get isWidgetOpen() {
      return this.#isWidgetOpen;
    }

    set isWidgetOpen(value) {
      this.#isWidgetOpen = value;
      const collapsed = document.getElementsByClassName(
        "n-main-collapsed-window"
      )[0];
      const expanded = document.getElementsByClassName("n-main-window")[0];
      try {
        if (value) {
          collapsed.style.display = "none";
          expanded.style.display = "block";
        } else {
          collapsed.style.display = "block";
          expanded.style.display = "none";
        }
      } catch (e) { }
      localStorage.setItem("neuromarket_should_widget_open", Number(value));
    }

    apiGetAdsInfo(adIds) {
      try {
        return new Promise((resolve, reject) => {
          const onResponse = (response) => {
            if (Array.isArray(response)) {
              resolve(response);
            } else {
              reject(false);
            }
          };

          window.chrome.runtime.sendMessage(
            NEUROMARKET_CHROME_ID,
            {
              type: "fetchJson",
              url: "https://advert-api.wildberries.ru/adv/v1/promotion/adverts",
              options: {
                headers: {
                  accept: "application/json",
                  authorization: this.#ApiToken,
                  "content-type": "application/json",
                },
                body: JSON.stringify(adIds),
                method: "POST",
                mode: "cors",
                credentials: "include",
              },
            },
            onResponse
          );
        });
      } catch (e) {
        console.log(e);
        return Promise.reject();
      }
    }

    apiGetAdsStats(adIds) {
      try {
        return new Promise((resolve, reject) => {
          const onResponse = (response) => {
            if (Array.isArray(response)) {
              resolve(response);
            } else {
              resolve(false);
            }
          };
          const date = new Date();
          const dateString =
            date.getFullYear() +
            "-" +
            zeroPad(date.getMonth() + 1, 2) +
            "-" +
            zeroPad(date.getDate(), 2);

          const body = adIds.map((adId) => ({ id: adId, dates: [dateString] }));

          window.chrome.runtime.sendMessage(
            NEUROMARKET_CHROME_ID,
            {
              type: "fetchJson",
              url: "https://advert-api.wildberries.ru/adv/v2/fullstats",
              options: {
                headers: {
                  accept: "application/json",
                  authorization: this.#ApiToken,
                  "content-type": "application/json",
                },
                body: JSON.stringify(body),
                method: "POST",
                mode: "cors",
                credentials: "include",
              },
            },
            onResponse
          );
        });
      } catch (e) {
        console.log(e);
        return Promise.reject();
      }
    }

    apiGetAdBudget(adId) {
      try {
        return new Promise((resolve, reject) => {
          const onResponse = (response) => {
            if (response) {
              resolve(response);
            } else {
              reject(false);
            }
          };

          window.chrome.runtime.sendMessage(
            NEUROMARKET_CHROME_ID,
            {
              type: "fetchJson",
              url: `https://advert-api.wildberries.ru/adv/v1/budget?id=${adId}`,
              options: {
                headers: {
                  accept: "application/json",
                  authorization: this.#ApiToken,
                  "content-type": "application/json",
                },
                method: "GET",
                mode: "cors",
                credentials: "include",
              },
            },
            onResponse
          );
        });
      } catch (e) {
        console.log(e);
        return Promise.reject();
      }
    }

    createApiToken() {
      try {
        return new Promise((resolve, reject) => {
          const onResponse = (response) => {
            if (response?.result?.token?.accessToken) {
              resolve(response.result.token.accessToken);
            } else {
              reject(false);
            }
          };
          const options = {
            headers: {
              accept: "*/*",
              "accept-language":
                "en-US,en;q=0.9,ru-RU;q=0.8,ru;q=0.7,zh-CN;q=0.6,zh-TW;q=0.5,zh;q=0.4",
              "content-type": "application/json",
              "sec-ch-ua":
                '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": '"Windows"',
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-origin",
            },
            referrer:
              "https://seller.wildberries.ru/supplier-settings/access-to-api",
            referrerPolicy: "strict-origin-when-cross-origin",
            body: '{"params":{"name":"[Нейромаркет] Реклама","scopes":["contentanalytics","advert"],"isReadOnly":true},"jsonrpc":"2.0","id":"json-rpc_70"}',
            method: "POST",
            mode: "cors",
            credentials: "include",
          }

          if (WB_AUTH_V3) {
            options.headers['AuthorizeV3'] = WB_AUTH_V3
          }

          window.chrome.runtime.sendMessage(
            NEUROMARKET_CHROME_ID,
            {
              type: "fetchJson",
              url: "https://seller.wildberries.ru/ns/manage/api-tokens/api/tokens/generateToken",
              options,
            },
            onResponse
          );
        });
      } catch (e) {
        console.log(e);
        return Promise.reject();
      }
    }

    getUserPersonalData() {
      try {
        return new Promise((resolve, reject) => {
          const onResponse = (response) => {
            if (response?.result?.data?.user) {
              this.userData = response.result.data.user;
              resolve(true);
            } else {
              reject(false);
            }
          };

          const options = {
            headers: {
              accept: "*/*",
              "accept-language":
                "en-US,en;q=0.9,ru-RU;q=0.8,ru;q=0.7,zh-CN;q=0.6,zh-TW;q=0.5,zh;q=0.4",
              "content-type": "application/json",
              "sec-ch-ua":
                '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": '"Windows"',
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-origin",
            },
            referrer:
              "https://seller.wildberries.ru/?workloadWarehouse=%D0%9A%D0%B0%D0%B7%D0%B0%D0%BD%D1%8C",
            referrerPolicy: "strict-origin-when-cross-origin",
            body: JSON.stringify({
              "jsonrpc": "2.0",
              "id": "json-rpc_97"
            }),
            method: "POST",
            mode: "cors",
            credentials: "include",
          }

          if (WB_AUTH_V3) {
            options.headers['AuthorizeV3'] = WB_AUTH_V3
          }

          window.chrome.runtime.sendMessage(
            NEUROMARKET_CHROME_ID,
            {
              type: "fetchJson",
              url: "https://seller.wildberries.ru/ns/suppliers/suppliers-portal-core/card/api/v2/getPersonalData",
              options,
            },
            onResponse
          );
          // window.chrome.runtime.sendMessage(
          //   NEUROMARKET_CHROME_ID,
          //   {
          //     type: "fetchJson",
          //     url: "https://seller.wildberries.ru/passport/api/v2/user/personal_data",
          //     options: {
          //       headers: {
          //         accept: "*/*",
          //         "accept-language":
          //           "en-US,en;q=0.9,ru-RU;q=0.8,ru;q=0.7,zh-CN;q=0.6,zh-TW;q=0.5,zh;q=0.4",
          //         "content-type": "application/json",
          //         "sec-ch-ua":
          //           '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
          //         "sec-ch-ua-mobile": "?0",
          //         "sec-ch-ua-platform": '"Windows"',
          //         "sec-fetch-dest": "empty",
          //         "sec-fetch-mode": "cors",
          //         "sec-fetch-site": "same-origin",
          //       },
          //       referrer:
          //         "https://seller.wildberries.ru/?workloadWarehouse=%D0%9A%D0%B0%D0%B7%D0%B0%D0%BD%D1%8C",
          //       referrerPolicy: "strict-origin-when-cross-origin",
          //       body: null,
          //       method: "GET",
          //       mode: "cors",
          //       credentials: "include",
          //     },
          //   },
          //   onResponse
          // );
        });
      } catch (e) {
        console.log(e);
      }
    }

    getSupplierUsers() {
      try {
        return new Promise((resolve, reject) => {
          const onResponse = (response) => {
            if (response?.result?.users) {
              this.supplierUsers = response.result.users;
              resolve(true);
            } else {
              reject(false);
            }
          };

          const options = {
            headers: {
              accept: "*/*",
              "accept-language":
                "en-US,en;q=0.9,ru-RU;q=0.8,ru;q=0.7,zh-CN;q=0.6,zh-TW;q=0.5,zh;q=0.4",
              "content-type": "application/json",
              "sec-ch-ua":
                '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": '"Windows"',
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-origin",
            },
            referrer:
              "https://seller.wildberries.ru/supplier-settings/supplier-users",
            referrerPolicy: "strict-origin-when-cross-origin",
            body: '{"params":{"limit":20,"offset":0},"jsonrpc":"2.0","id":"json-rpc_44"}',
            method: "POST",
            mode: "cors",
            credentials: "include",
          }

          if (WB_AUTH_V3) {
            options.headers['AuthorizeV3'] = WB_AUTH_V3
          }

          window.chrome.runtime.sendMessage(
            NEUROMARKET_CHROME_ID,
            {
              type: "fetchJson",
              url: "https://seller.wildberries.ru/ns/supplier-acl/suppliers-portal-core/v1/ACL/getSupplierUsers",
              options,
            },
            onResponse
          );
        });
      } catch (e) {
        console.log(e);
      }
    }

    get campaignLogs() {
      return this.#campaignLogs;
    }

    set campaignLogs(value) {
      this.#campaignLogs = value;
      this.renderLogs();
    }

    get campaignLogsFilter() {
      return this.#campaignLogsFilter;
    }

    set campaignLogsFilter(value) {
      this.#campaignLogsFilter = value;
      this.renderLogs();
    }

    async getCampaignLogs() {
      this.campaignLogs = await Logger.getAll();
      document.getElementById("n-logs-open-btn").style.display = "flex";
    }

    getAuthData() {
      try {
        return new Promise((resolve, reject) => {
          const onResponse = (response) => {
            if (response?.id) {
              this.userAuthData = response;
              return resolve(true);
            } else {
              return resolve(false);
            }
          };

          window.chrome.runtime.sendMessage(
            NEUROMARKET_CHROME_ID,
            {
              type: "fetchJson",
              url: "https://ext.neuromarket.online/auth-v2",
              options: {
                headers: {
                  accept: "*/*",
                  "accept-language":
                    "en-US,en;q=0.9,ru-RU;q=0.8,ru;q=0.7,zh-CN;q=0.6,zh-TW;q=0.5,zh;q=0.4",
                  "content-type": "application/json",
                  "sec-ch-ua":
                    '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
                  "sec-ch-ua-mobile": "?0",
                  "sec-ch-ua-platform": '"Windows"',
                  "sec-fetch-dest": "empty",
                  "sec-fetch-mode": "cors",
                  "sec-fetch-site": "same-origin",
                },
                referrer:
                  "https://seller.wildberries.ru/?workloadWarehouse=%D0%9A%D0%B0%D0%B7%D0%B0%D0%BD%D1%8C",
                referrerPolicy: "strict-origin-when-cross-origin",
                body: JSON.stringify({
                  userId: this.userData.id,
                  userEmail: this.userData?.email,
                  userGender: this.userData?.gender,
                  userName: this.userData?.first_name,
                  userLastName: this.userData?.last_name,
                  userPhone: this.userData?.phone,
                  supplierId: this.supplierId,
                  campaignId: this.campaignId,
                  campaignType: this.__NEUROMARKET_AD_TYPE,
                  balance: this.balance?.net || 0,
                }),
                method: "POST",
                mode: "cors",
                credentials: "omit",
              },
            },
            onResponse
          );
        });
      } catch (e) {
        console.log(e);
      }
    }

    async getAccessToken() {
      const request = await fetch(
        "https://seller-auth.wildberries.ru/auth/v2/auth/slide-v3",
        {
          headers: {
            accept: "*/*",
            "accept-language":
              "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6,zh-TW;q=0.5,zh;q=0.4",
            "cache-control": "no-cache",
            "content-type": "application/json",
            "sec-ch-ua":
              '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
          },
          referrer: "https://cmp.wildberries.ru/",
          referrerPolicy: "strict-origin-when-cross-origin",
          body: null,
          method: "POST",
          mode: "cors",
          credentials: "include",
        }
      );

      const response = await request.json();
      this.accessToken = response?.payload?.access_token;
      this.accessSticker = response?.payload?.sticker;
    }

    async getSupplier(retry = 0) {
      try {
        const supplierExternalId = getCookie("x-supplier-id-external");
        return new Promise((resolve, reject) => {
          const onResponse = (response) => {
            const suppliers = response?.[0]?.result?.suppliers;
            if (suppliers) {
              this.supplierRawData = suppliers.find(
                (item) => item.id === supplierExternalId
              );
              this.supplierId = this.supplierRawData.oldID;
              resolve(response);
            } else {
              resolve(false);
            }
          };

          const options = {
            headers: {
              accept: "application/json",
              "accept-language":
                "en-US,en;q=0.9,ru-RU;q=0.8,ru;q=0.7,zh-CN;q=0.6,zh-TW;q=0.5,zh;q=0.4",
              "content-type": "application/json",
              "sec-ch-ua":
                '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": '"Windows"',
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "cross-site",
            },
            body: '[{"method":"getUserSuppliers","params":{},"id":"json-rpc_5","jsonrpc":"2.0"}]',
            method: "POST",
            mode: "cors",
            credentials: "include",
          }


          if (WB_AUTH_V3) {
            options.headers['AuthorizeV3'] = WB_AUTH_V3
          }

          window.chrome.runtime.sendMessage(
            NEUROMARKET_CHROME_ID,
            {
              type: "fetchJson",
              url: "https://seller.wildberries.ru/ns/suppliers/suppliers-portal-core/suppliers",
              options,
            },
            onResponse
          );
        });
      } catch (e) {
        console.log(e);
        return Promise.resolve(false);
      }
    }

    async OLD_getSupplier(retry = 0) {
      try {
        const supplierExternalId = getCookie("x-supplier-id-external");
        const request = await fetch("/api/v5/suppliers", {
          headers: {
            accept: "*/*",
            "accept-language":
              "en-US,en;q=0.9,ru-RU;q=0.8,ru;q=0.7,zh-CN;q=0.6,zh-TW;q=0.5,zh;q=0.4",
            authorizev3: this.accessToken,
            "sec-ch-ua":
              '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
          },
          referrer: "https://cmp.wildberries.ru/",
          referrerPolicy: "strict-origin-when-cross-origin",
          body: null,
          method: "GET",
          mode: "cors",
          credentials: "include",
        });

        const response = await request.json();
        const suppliers = response[0].result.suppliers;
        this.supplierRawData = suppliers.find(
          (item) => item.id === supplierExternalId
        );
        this.supplierId = this.supplierRawData.oldID;
      } catch (e) {
        console.log(e);
        if (retry < MAX_RETRIES) {
          await delay(REQUEST_DELAY);
          return this.getSupplier(retry + 1);
        } else {
          return false;
        }
      }
    }

    async getStocks(nms) {
      try {
        return new Promise((resolve, reject) => {

          const timeout = setTimeout(() => {
            resolve([]);
          }, 3000);
          const onResponse = (response) => {
            if (response?.error === false) {
              clearTimeout(timeout);
              resolve(response?.data?.groups?.[0]?.items || []);
            } else {
              clearTimeout(timeout);
              resolve([]);
            }
          };

          const data = {
            "nmIDs": [
              ...nms
            ],
            "subjectIDs": [],
            "brandNames": [],
            "tagIDs": [],
            "regionNames": [],
            "officeIDs": [],
            "tableType": "byItems",
            "currentPeriod": {
              "start": moment().format("YYYY-MM-DD"),
              "end": moment().format("YYYY-MM-DD")
            },
            "stockType": "",
            "skipDeletedNm": false,
            "availabilityFilters": [
              "deficient",
              "actual",
              "balanced",
              "nonActual",
              "nonLiquid",
              "invalidData"
            ],
            "orderBy": {
              "field": "ordersCount",
              "mode": "desc"
            }
          }

          window.chrome.runtime.sendMessage(
            NEUROMARKET_CHROME_ID,
            {
              type: "fetchJson",
              url: "https://seller-content.wildberries.ru/ns/analytics-api/content-analytics/api/v2/stocks-report/report",
              options: {
                headers: {
                  accept: "application/json",
                  authorizev3: WB_AUTH_V3,
                  "content-type": "application/json",
                },
                body: JSON.stringify(data),
                method: "POST",
                mode: "cors",
                credentials: "include",
              },
            },
            onResponse
          );
        });
      } catch (e) {
        console.log(e);
        return Promise.reject();
      }
    }

    async getBalance() {
      try {
        const request = await fetch("/api/v3/balance", {
          headers: {
            accept: "*/*",
            "accept-language":
              "en-US,en;q=0.9,ru-RU;q=0.8,ru;q=0.7,zh-CN;q=0.6,zh-TW;q=0.5,zh;q=0.4",
            authorizev3: this.accessToken,
            "sec-ch-ua":
              '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
          },
          referrer: "https://cmp.wildberries.ru/",
          referrerPolicy: "strict-origin-when-cross-origin",
          body: null,
          method: "GET",
          mode: "cors",
          credentials: "include",
        });

        const response = await request.json();
        this.balance = response?.content;
      } catch (e) {
        console.log(e);
      }
    }

    async confirmAccessToken() {
      const request = await fetch(
        "https://seller-auth.wildberries.ru/auth/v2/auth/slide-v3-confirm",
        {
          headers: {
            accept: "*/*",
            "accept-language":
              "en-US,en;q=0.9,ru-RU;q=0.8,ru;q=0.7,zh-CN;q=0.6,zh-TW;q=0.5,zh;q=0.4",
            "content-type": "application/json",
            "sec-ch-ua":
              '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
          },
          referrer: "https://cmp.wildberries.ru/",
          referrerPolicy: "strict-origin-when-cross-origin",
          body: `{"sticker":"${this?.accessSticker}"}`,
          method: "POST",
          mode: "cors",
          credentials: "include",
        }
      );
    }

    get datePickerLoaded() {
      return this.#datePickerLoaded;
    }

    set datePickerLoaded(value) {
      this.#datePickerLoaded = value;
      if (value) {
        this.shouldDatePickerInit();
      }
    }

    shouldDatePickerInit() {
      if (this.#datePickerLoaded && this.#placement) {
        const todayButton = {
          content: "Сегодня",
          onClick: () => {
            let date = new Date();
            const dateString =
              "'" +
              date.getFullYear() +
              "-" +
              zeroPad(date.getMonth() + 1, 2) +
              "-" +
              zeroPad(date.getDate(), 2);
            this.datePickerFrom.selectDate(dateString);
            this.datePickerFrom.setViewDate(dateString);
            this.datePickerTo.selectDate(dateString);
            this.datePickerTo.setViewDate(dateString);
          },
        };
        const clearButton = {
          content: "Очистить",
          onClick: () => {
            this.datePickerFrom.clear();
            this.datePickerTo.clear();
          },
        };
        if (!this.datePickerFrom) {
          this.datePickerFrom = new AirDatepicker("#n-date-from", {
            minDate: this.#placement.createDate,
            maxDate: new Date(),
            startDate: this?.datePickerFrom?.selectedDates[0] || undefined,
            onSelect: ({ date }) => {
              const keywordsListElement =
                document.getElementById("n-keywords-list");
              keywordsListElement.innerHTML = this.renderKeywordsList();
              const excludedListElement =
                document.getElementById("n-excluded-list");
              excludedListElement.innerHTML = this.renderExcludedList({
                searchText: this.excludedSearchText,
              });
              this.datePickerTo.update({
                minDate: date,
              });
            },
            buttons: [todayButton, clearButton],
          });
        }
        if (!this.datePickerTo) {
          this.datePickerTo = new AirDatepicker("#n-date-to", {
            minDate: this.#placement.createDate,
            maxDate: new Date(),
            startDate: this?.datePickerTo?.selectedDates[0] || undefined,
            onSelect: ({ date }) => {
              const keywordsListElement =
                document.getElementById("n-keywords-list");
              keywordsListElement.innerHTML = this.renderKeywordsList();
              const excludedListElement =
                document.getElementById("n-excluded-list");
              excludedListElement.innerHTML = this.renderExcludedList({
                searchText: this.excludedSearchText,
              });
              this.datePickerFrom.update({
                maxDate: date,
              });
            },
            buttons: [todayButton, clearButton],
          });
        }
      }
    }

    get region() {
      return this.#region;
    }

    set region(selectedRegion) {
      if (this.#region.name === selectedRegion.name) {
        return;
      }
      localStorage.setItem(
        "neuromarket-region",
        JSON.stringify(selectedRegion)
      );
      this.#region = selectedRegion;
    }

    async restoreKeywords() {
      const excludedKeywords =
        this.wordsStats.excluded
          .filter((item) => item?.selected === false)
          .map((item) => item.keyword) || [];

      const keywordsSelected =
        this.wordsStats.excluded
          .filter((item) => item?.selected === true)
          .map((item) => item.keyword) || [];

      if (keywordsSelected.length) {
        Logger.send({
          type: "restore-excluded",
          data: { keywords: keywordsSelected },
        });
      }

      return await this.setExcluded(excludedKeywords);
    }

    async restoreFixed() {
      const fixedKeywords =
        this.wordsStats.fixed
          .filter((item) => item?.selected === false)
          .map((item) => item.keyword) || [];

      const keywordsSelected =
        this.wordsStats.fixed
          .filter((item) => item?.selected === true)
          .map((item) => item.keyword) || [];

      if (keywordsSelected.length) {
        Logger.send({
          type: "remove-fixed",
          data: { keywords: keywordsSelected },
        });
      }

      return await this.setFixed(fixedKeywords);
    }

    async excludeFixed() {
      const fixedKeywords =
        this.wordsStats.fixed
          .filter((item) => item?.selected === true)
          .map((item) => item.keyword) || [];

      const excludedKeywords =
        this.wordsStats.excluded.map((item) => item.keyword) || [];

      if (fixedKeywords.length) {
        Logger.send({ type: "exclude", data: { keywords: fixedKeywords } });
      }

      return await this.setExcluded([...excludedKeywords, ...fixedKeywords]);
    }

    async addFixed() {
      const fixedKeywords =
        this.wordsStats.keywords
          .filter((item) => item?.selected === true)
          .map((item) => item.keyword) || [];

      const keywordsSelected = fixedKeywords;

      if (keywordsSelected.length) {
        Logger.send({
          type: "add-fixed",
          data: { keywords: keywordsSelected },
        });
      }

      return await this.setFixed([
        ...fixedKeywords,
        ...this.#wordsStats.fixed.map((item) => item.keyword),
      ]);
    }

    async removeFixedFromKeywords() {
      let selectedFixedToRemove = [];
      if (this.clusterize) {
        const clustersSet = new Set();
        const keywords = [
          ...this.wordsStats.keywords,
          ...this.wordsStats.excluded,
        ];
        const selectedKeywords = keywords.filter((item) => item.selected);
        selectedKeywords.forEach((keyword) => {
          clustersSet.add(keyword.presetId);
        });
        const selectedClusters = [...clustersSet];
        selectedFixedToRemove = keywords.filter((item) => selectedClusters.includes(item.presetId))
          .map((item) => item.keyword);
      } else {
        selectedFixedToRemove =
          this.wordsStats.keywords
            .filter((item) => item?.selected === true && item.isFixed)
            .map((item) => item.keyword) || [];
      }

      if (selectedFixedToRemove.length === 0) {
        return;
      }

      Logger.send({
        type: "remove-fixed",
        data: { keywords: selectedFixedToRemove },
      });

      const newFixedKeywords = this.#wordsStats.fixed
        .filter((item) => !selectedFixedToRemove.includes(item.keyword))
        .map((item) => item.keyword);

      return await this.setFixed(newFixedKeywords);
    }

    async restoreClusters() {
      const clustersSet = new Set();
      const keywords = [
        ...this.wordsStats.keywords,
        ...this.wordsStats.excluded,
      ];
      const selectedKeywords = keywords.filter((keyword) => keyword.selected);
      selectedKeywords.forEach((keyword) => {
        clustersSet.add(keyword.presetId);
      });

      const selectedClusters = [...clustersSet];

      const keywordsToRestore = this.wordsStats.excluded
        .filter((excluded) => !selectedClusters.includes(excluded.presetId))
        .map((excluded) => excluded.keyword);

      if (selectedClusters.length === 0) {
        return;
      }

      Logger.send({
        type: "restore-excluded",
        data: { keywords: keywordsToRestore },
      });

      const request = await this.setExcluded(keywordsToRestore);
    }

    async removeKeywords() {
      const excludedKeywords =
        this.wordsStats.excluded.map((item) => item.keyword) || [];

      const keywordsSelected =
        this.wordsStats?.keywords
          .filter((item) => item?.selected)
          .map((item) => item.keyword) || [];

      if (keywordsSelected.length) {
        Logger.send({ type: "exclude", data: { keywords: keywordsSelected } });
      }

      const keywordsToRemove = [...keywordsSelected, ...excludedKeywords];
      const request = await this.setExcluded(keywordsToRemove);
    }

    async setExcluded(excluded, retry = 0) {
      try {
        let adType = window.__NEUROMARKET_AD_TYPE;
        console.log(adType, this.#placement);
        if (adType === "AUTO" && this.campaignInfo?.type === 9) {
          adType = "SEACAT";
        }

        const endpoints = {
          AUTO: {
            url: `/api/v2/auto/${this.campaignId}/set-excluded`,
            method: "POST"
          },
          SEARCH: {
            url: `/api/v2/search/${this.campaignId}/set-excluded`,
            method: "POST"
          },
          SEACAT: {
            url: `/api/v5/set-excluded`,
            method: "PUT"
          },
        };
        const URL = endpoints[adType].url;
        const method = endpoints[adType].method;
        const request = await fetch(URL, {
          headers: {
            Authorizev3: this.accessToken,
            "x-supplierid": this?.supplierId,
          },
          referrer: `https://cmp.wildberries.ru/campaigns/edit/${this.campaignId}`,
          referrerPolicy: "strict-origin-when-cross-origin",
          body: JSON.stringify({ advert_id: String(this.campaignId), excluded }),
          method,
          mode: "cors",
          credentials: "include",
        });

        if (request.status === 400) {
          Toastify({
            text: `😢 Ошибка: 
            ${(await request.text()).trim()}`,
            duration: 3000,
            newWindow: true,
            gravity: "bottom", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            style: {
              background: "linear-gradient(to right, #162033, #253144)",
              fontSize: "0.8em",
              maxWidth: "300px",
              borderRadius: "10px",
              border: "1px solid #334155",
              boxShadow: "0",
            },
            offset: {
              y: 200, // vertical axis - can be a number or a string indicating unity. eg: '2em'
            },
          }).showToast();
          return;
        }

        if (request.status === 207) {
          Toastify({
            text: `😢 Ошибка: 
            ${(await request.text()).trim()}`,
            duration: 5000,
            newWindow: true,
            gravity: "bottom", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            style: {
              background: "linear-gradient(to right, #162033, #253144)",
              fontSize: "0.8em",
              maxWidth: "300px",
              borderRadius: "10px",
              border: "1px solid #334155",
              boxShadow: "0",
            },
            offset: {
              y: 200, // vertical axis - can be a number or a string indicating unity. eg: '2em'
            },
          }).showToast();
          return;
        }

        if (request.status !== 200) {
          throw new Error("setExcluded");
        }

        return;
      } catch (e) {
        if (retry < MAX_RETRIES) {
          await delay(REQUEST_DELAY);
          return this.setExcluded(excluded, retry + 1);
        }
        return;
      }
    }

    async setFixed(fixed, retry = 0) {
      try {
        const adType = window.__NEUROMARKET_AD_TYPE;
        const endpoints = {
          SEARCH: `/api/v2/search/${this.campaignId}/set-plus`,
          SEACAT: `/api/v5/set-plus`,
        };
        const URL = endpoints[adType];
        const request = await fetch(URL, {
          headers: {
            Authorizev3: this.accessToken,
            "x-supplierid": this?.supplierId,
          },
          referrer: `https://cmp.wildberries.ru/campaigns/edit/${this.campaignId}`,
          referrerPolicy: "strict-origin-when-cross-origin",
          body: JSON.stringify({ advert_id: String(this.campaignId), fixed: true, plus: fixed }),
          method: "PUT",
          mode: "cors",
          credentials: "include",
        });

        if (request.status === 400 || request.status === 207) {
          Toastify({
            text: `😢 Ошибка: 
            ${(await request.text()).trim()}`,
            duration: 3000,
            newWindow: true,
            gravity: "bottom", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            style: {
              background: "linear-gradient(to right, #162033, #253144)",
              fontSize: "0.8em",
              maxWidth: "300px",
              borderRadius: "10px",
              border: "1px solid #334155",
              boxShadow: "0",
            },
            offset: {
              y: 200, // vertical axis - can be a number or a string indicating unity. eg: '2em'
            },
          }).showToast();
          return;
        }

        if (request.status !== 200) {
          throw new Error("setFixed");
        }

        return;
      } catch (e) {
        if (retry < MAX_RETRIES) {
          await delay(REQUEST_DELAY);
          return this.setFixed(fixed, retry + 1);
        }
        return;
      }
    }
    async setFixedStatus(status, retry = 0) {
      try {
        const adType = window.__NEUROMARKET_AD_TYPE;
        const endpoints = {
          SEARCH: `/api/v2/search/${this.campaignId}/set-plus?fixed=${status}`,
          SEACAT: `/api/v2/seacat/${this.campaignId}/set-plus?fixed=${status}`,
        };
        const URL = endpoints[adType];
        const request = await fetch(URL, {
          headers: {
            Authorizev3: this.accessToken,
            "x-supplierid": this?.supplierId,
          },
          referrer: `https://cmp.wildberries.ru/campaigns/edit/${this.campaignId}`,
          referrerPolicy: "strict-origin-when-cross-origin",
          method: "GET",
          mode: "cors",
          credentials: "include",
        });

        Logger.send({ type: "set-fixed-status", data: { status } });

        if (request.status !== 200) {
          throw new Error("setFixed");
        }

        return true;
      } catch (e) {
        if (retry < MAX_RETRIES) {
          await delay(REQUEST_DELAY);
          return this.setFixed(fixed, retry + 1);
        }
        return false;
      }
    }

    renderTemplate(
      item,
      idx,
      isChild = false,
      isExcluded = false,
      filteredDates = false
    ) {
      const clusterize = this.clusterize;

      let filteredCount,
        filteredClicks,
        filteredCTR,
        filteredCPC,
        filteredMoney = null;

      if (filteredDates) {
        if (clusterize && !isChild) {
          filteredCount = item.dates_total_count;
          filteredClicks = item.dates_total_clicks;
          filteredMoney = item.dates_total_money;
          filteredCTR = item.dates_total_ctr;
          filteredCPC = item.dates_total_cpc;
        } else {
          filteredCount = item.dates_count;
          filteredClicks = item.dates_clicks;
          filteredMoney = item.dates_money;
          filteredCTR = item.dates_ctr;
          filteredCPC = item.dates_cpc;
        }
      }

      return `<div class="n-kw-list-item" ${isChild === true ||
        (clusterize && item?.hasExcluded) ||
        item?.isExcluded
        ? isExcluded || item?.isExcluded || item?.hasExcluded
          ? item?.isSubject
            ? `style="background: linear-gradient(90deg, rgb(101 0 0) 0%, #590d29a1 25%)"`
            : item?.isMerger
              ? `style="background: linear-gradient(90deg, #590d29a1 0%, #590d29a1 25%)"`
              : `style="background: #590d29a1"`
          : `style="background: #131e35"`
        : item?.isSubject
          ? `style="background: linear-gradient(90deg, rgb(101 0 0) 0%, 0f172a 25%)"`
          : item?.isMerger
            ? `style="background: linear-gradient(90deg, #590d29a1 0%, 0f172a 25%)"`
            : ""
        }>
    ${(!clusterize && item?.isFixed) ||
          (clusterize && !isChild && item?.hasFixed) ||
          (clusterize && isChild && item?.isFixed)
          ? `
      <div style="position:absolute; left:0; background: #0f7b18; width:5px; height:41px;"></div>
    `
          : ""
        }
  <div style="width:250px; display:flex; ${isChild ? "margin-left: 12px;" : ""
        } gap:2px; align-items:center;">
  <div style="display:flex; align-items:center; margin-right: 4px;">
    <input type="checkbox" style="appearance:auto" id="keywordsCheckbox" data-keyword-index="${isExcluded
          ? this.wordsStats?.excluded?.find((ex) => ex.keyword === item.keyword)
            .index
          : item?.index
        }" ${item?.selected ? "checked" : ""} ${item?.isExcluded ? `data-is-excluded="1"` : ""
        } ${item?.isFixed
          ? `data-is-fixed="1" data-fixed-index="${item?.fixedIndex}"`
          : ""
        }  ${item?.isExcluded || isExcluded
          ? `data-checkbox="excluded-${this.wordsStats?.excluded?.find(
            (ex) => ex.keyword === item.keyword
          ).index
          }"`
          : `data-checkbox="keyword-${item?.index}"`
        } 
      ${item?.isFixed ? `data-checkbox="fixed-${item?.index}"` : ""}/>
  </div>
  ${clusterize && item?.child?.length > 1
          ? `
  <div class="n-chevron"  ${item?.isExcluded ? `data-is-excluded="1"` : ""
          } data-keyword-index="${item?.index}">
    <svg ${item?.open
            ? `style="transform: rotate(90deg); pointer-events: none;"`
            : `style="pointer-events: none;"`
          }" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
      <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
    </svg>
  </div>
  `
          : ""
        }
  <div style="max-width: 250px; overflow:hidden; text-overflow: ellipsis; line-clamp: 3;display: -webkit-box; -webkit-box-orient: vertical;-webkit-line-clamp: 2;">
  <a target="_blank" class="n-external-link" href="https://www.wildberries.ru/catalog/0/search.aspx?search=${encodeURI(
          sanitize(item.keyword)
        )}">${sanitize(item.keyword)}</a></div>
  </div>
  <div style="display:flex; gap:12px;">
  <span class="n-count" style="width:75px; min-width:75px;">${item?.views?.cluster_count
          ? numberWithSpaces(item?.views?.cluster_count)
          : "--"
        }</span>
  <span class="n-count" style="width:60px; min-width:60px;">
  ${clusterize && !isChild
          ? numberWithSpaces(item?.total_views)
          : item?.views?.count === undefined
            ? "--"
            : numberWithSpaces(item?.views?.count)
        }</span>
  ${!item?.metadata
          ? `<span class="n-count n-check-cluster" data-keyword-index="${item.index}" style="width:55px;min-width:55px; gap:4px;"></span>`
          : item?.presetId
            ? `<span class="n-count" style="font-size: 0.7em; width:55px; min-width:55px;" id="${item?.presetId === -1 ? "" : "n-advanced-cluster-data"
            }" data-cluster-id="${item?.presetId}">${item?.presetId}</span>`
            : `<span class="n-count" style="font-size: 0.7em; width:55px; min-width:55px;"></span>`
        }
  ${item?.ads?.length > 1
          ? `<span class="n-count" style="width:55px; min-width:55px; gap:4px;" ${item?.isExcluded ? `data-is-excluded="1"` : ""
          } data-ads-index="${item.index
          }"><span class="n-ad-analyze-btn">Смотреть</span></span>`
          : `<span class="n-count n-text-red" style="width:55px;min-width:55px; gap:4px;"></span>`
        }
  ${item?.positions
          ? item?.positions?.position === -1
            ? item?.indexData.exist
              ? `<span class="n-count ${item.indexData?.ad?.tp || item.indexData?.ad?.logs
                ? "n-text-green"
                : "n-text-yellow"
              } n-check-position-manual" ${item?.isExcluded ? `data-is-excluded="1"` : ""
              } data-keyword-index="${item.index
              }" style="width:70px;min-width:70px; position:relative; white-space: nowrap;">${item.indexData?.ad?.tp === "c" ? "🚀" : ""
              }В выдаче 
            ${item.indexData?.ad?.tp === "c" &&
                item.indexData?.ad?.advertId !== this.campaignId
                ? `<span class="n-diff-ad-campaign"></span>`
                : ""
              }</span>
            </span>`
              : `<span class="n-count n-text-red n-check-position-manual" ${item?.isExcluded ? `data-is-excluded="1"` : ""
              } data-keyword-index="${item.index
              }" style="width:60px; min-width:70px;">Не найдено</span>`
            : item.positions?.logs
              ? `<span class="n-count n-text-green n-check-position-manual" ${item?.isExcluded ? `data-is-excluded="1"` : ""
              } data-keyword-index="${item.index
              }" style="width:70px;min-width:70px; position:relative; white-space: nowrap;">${item?.positions.type === "c" ? "🚀" : ""
              }${item?.positions?.boosted_from
                ? `${item?.positions?.boosted_from} →`
                : ""
              } ${item?.positions?.position} ${item.indexData?.ad?.tp === "c" &&
                item.positions?.advertId !== this.campaignId
                ? `<span class="n-diff-ad-campaign"></span>`
                : ""
              }</span>`
              : `<span class="n-count n-text-yellow n-check-position-manual" ${item?.isExcluded ? `data-is-excluded="1"` : ""
              } data-keyword-index="${item.index
              }" style="width:70px; min-width:70px;">${item?.positions?.position
              }</span>`
          : !item?.isExcluded
            ? `<span class="n-count n-check-position" style="width:70px; min-width:70px;" data-keyword-index="${item.index}">Проверить</span>`
            : `<span class="n-count n-check-position" style="width:70px; min-width:70px;" data-is-excluded="1" data-keyword-index="${item.index}">Проверить</span>`
        }
  
    <span class="n-count" style="width:40px; min-width:40px;">${item?.positions?.logs ? item?.positions?.position_boost || "--" : ""
        }</span>

    <span class="n-count" style="width:40px; min-width:40px;">${item?.positions?.logs ? item?.positions?.position_delta || "--" : ""
        }</span>

    <span class="n-count" style="width:50px; min-width:50px;">${numberWithSpaces(
          clusterize && !isChild
            ? filteredDates
              ? filteredCount
              : item.total_count
            : filteredDates
              ? filteredCount
              : item?.count || "--"
        )}</span>
    <span class="n-count" style="width:50px; min-width:50px;">${clusterize && !isChild
          ? filteredDates
            ? filteredClicks
            : item.total_clicks
          : filteredDates
            ? filteredClicks
            : item?.clicks === undefined
              ? "--"
              : item.clicks
        }</span>
    <span class="n-count" style="width:35px; min-width:35px;">${clusterize && !isChild
          ? filteredDates
            ? filteredCTR
            : Math.round((item.total_ctr + Number.EPSILON) * 100) / 100
          : filteredDates
            ? filteredCTR
            : item?.ctr === undefined
              ? "--"
              : Math.round((item.ctr + Number.EPSILON) * 100) / 100
        }%</span>
    <span class="n-count" style="width:35px; min-width:35px;">${clusterize && !isChild
          ? filteredDates
            ? filteredCPC
            : Math.round((item.total_cpc + Number.EPSILON) * 100) / 100
          : filteredDates
            ? filteredCPC
            : item?.cpc === undefined
              ? "--"
              : Math.round((item.cpc + Number.EPSILON) * 100) / 100
        }₽</span>
    <span class="n-count" style="width:55px; min-width:55px;">${clusterize && !isChild
          ? filteredDates
            ? Math.round((filteredMoney + Number.EPSILON) * 100) / 100
            : Math.round((item.total_money + Number.EPSILON) * 100) / 100
          : filteredDates
            ? Math.round((filteredMoney + Number.EPSILON) * 100) / 100
            : item?.money === undefined
              ? "--"
              : Math.round((item.money + Number.EPSILON) * 100) / 100
        }₽</span>
  </div>
</div>
  ${clusterize && item?.child?.length && item?.open
          ? item?.child
            ?.map((child, idx) =>
              this.renderTemplate(
                child,
                idx,
                true,
                child?.isExcluded,
                filteredDates
              )
            )
            .join("")
          : ""
        }`;
    }

    renderLogs() {
      const element = document.getElementById("n-logs-items");
      const types = {
        exclude: {
          color: "#DB3031",
          title: "Исключены фразы",
        },
        "restore-excluded": {
          color: "#2563eb",
          title: "Восстановлены фразы",
        },
        "remove-fixed": {
          color: "#FF8743",
          title: "Удалены фикс-фразы",
        },
        "add-fixed": {
          color: "#15FFAB",
          title: "Добавлены фикс-фразы",
        },
        "set-fixed-status-true": {
          color: "#15FFAB",
          title: "Установлен режим фикс-фраз",
        },
        "set-fixed-status-false": {
          color: "#DB3031",
          title: "Отключен режим фикс-фраз",
        },
        "set-status-start": {
          color: "#15FFAB",
          title: "Кампания возобновлена",
        },
        "set-status-pause": {
          color: "#DB3031",
          title: "Кампания приостановлена",
        },
        note: {
          color: "",
          title: "Заметка",
        },
      };

      let prevId = 0;

      const renderTemplate = ({
        id,
        user_id: userId,
        type,
        data,
        created_at: createdAt,
      }) => {
        const isFixedStatusType = type === "set-fixed-status";
        const isStatusType = type === "set-status";
        const isNote = type === "note";

        let logType;

        if (isFixedStatusType || isStatusType) {
          logType = types[type + "-" + data.status];
        } else {
          logType = types?.[type];
        }

        if (!logType) return;

        const date = new Date(createdAt);
        const dateString =
          date.getDate() +
          "." +
          zeroPad(date.getMonth() + 1, 2) +
          "." +
          zeroPad(date.getFullYear(), 2) +
          " " +
          zeroPad(date.getHours(), 2) +
          ":" +
          zeroPad(date.getMinutes(), 2) +
          ":" +
          zeroPad(date.getSeconds(), 2);

        const user = this.supplierUsers.find((user) => user.id === userId);
        const userName = user?.firstName || `Удалён (${userId})`;
        const userLetter = userName[0].toUpperCase();
        const isMe = user?.me || false;
        const isPrev = prevId === userId;

        prevId = userId;

        return `<div style="display:flex; flex-direction: column; margin-top: 8px;">
      <div style="display:flex; gap: 6px; align-items: center;">
        <div style="width: 30px; height:30px; border-radius: 12px; background: ${stringToColor(
          userName
        )}; display: flex; justify-content: center; align-items: center; text-shadow: 0 0 10px #000000AA;">
        ${userLetter}
        </div>
        <div>${userName}</div>
        <div style="font-size: 0.8em; color: #cbd5e1;">${dateString}</div>
      </div>

        <div style="margin-top: 8px; display: flex; flex-direction: column; box-sizing: border-box; background: #162033; width: 100%; border-radius: 8px;">
          <div style="display: flex;flex-direction: row; justify-content:space-between; gap: 4px; align-items: center; color: #cbd5e1;"> 
            <div style="display: flex; flex-direction: row; gap: 4px; align-items: center;padding: 12px;">
            ${isNote
            ? ""
            : `<span style="width: 10px; height: 10px; border-radius: 50%; background: ${logType.color};"></span>`
          }
            ${logType.title}
            </div>
            ${!isFixedStatusType && !isStatusType && !isNote
            ? `
            <button class="n-tools-button" style="height:42px; font-size: 0.8em; border-top-right-radius: 8px;" id="n-logs-copy-phrases" data-log-id="${id}">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
              </svg>
              Копировать фразы
            </button>`
            : ""
          }
          </div>
          
      ${!isFixedStatusType && !isStatusType
            ? `
          <div class="n-logs-message-table">${isNote
              ? data?.text
              : data?.keywords
                ?.map((keyword) => `<div>${keyword}</div>`)
                .join("")
            }</div>
            `
            : ""
          }
          </div>
    </div>`;
      };
      const filteredLogs = this.campaignLogs.filter(
        (log) =>
          !this.campaignLogsFilter.length ||
          this.campaignLogsFilter.includes(log.type)
      );

      if (filteredLogs?.length) {
        const html = filteredLogs.map((log) => renderTemplate(log)).join("");
        element.innerHTML = html;
      } else {
        element.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 8px; justify-content: center; align-items: center;        margin-top: 20px;color: #94a3b8;">
        Пока нет данных по действиям в данной РК
      </div>
      `;
      }

      [...document.querySelectorAll("#n-logs-copy-phrases")].forEach((el) => {
        el.addEventListener("click", async () => {
          const logId = el.dataset.logId;
          const log = this.campaignLogs.find((item) => item.id === logId);
          await navigator.clipboard.writeText(log?.data?.keywords.join("\n"));

          el.innerText = "Фразы скопированы 👍";
          setTimeout(() => {
            el.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"></path>
              </svg>
              Копировать фразы
              `;
          }, 2000);
        });
      });
    }

    calcDatesData() {
      const dates = Object.entries(this.datesStats);
      dates.sort((a, b) => Date.parse(b[0]) - Date.parse(a[0]));

      const analyticsTotals = {
        wishList: 0,
        adClicks: 0,
        clicksRate: 0,
        openCard: 0,
        addToCart: 0,
        addToCartWithAdRate: 0,
        addToCartPercent: 0,
        addToCartPercentRealTime: 0,
        priceNoSpp: 0,
        orders: 0,
        ordersSum: 0,
        ordersWithAdRate: 0,
        ordersSumWithAdRate: 0,
        buyoutPercent: 0,
        sales: 0,
        salesWithAdRate: 0,
        salesSum: 0,
        salesSumWithAdRate: 0,
        eCpo: 0,
        eCps: 0,
        eEro: 0,
        eEr: 0,
        cpo: 0,
        cps: 0,
        ero: 0,
        er: 0,
        avgBoost: 0,
      };

      const searchTotals = {
        views: 0,
        clicks: 0,
        ctr: 0,
        cpc: 0,
        cpm: 0,
        money: 0,
      };

      const catalogTotals = {
        views: 0,
        clicks: 0,
        ctr: 0,
        cpc: 0,
        cpm: 0,
        money: 0,
        percent: 0,
      };

      const shelfTotals = {
        views: 0,
        clicks: 0,
        ctr: 0,
        cpc: 0,
        cpm: 0,
        money: 0,
        percent: 0,
      };

      const sumTotals = {
        views: 0,
        clicks: 0,
        ctr: 0,
        cpc: 0,
        cpm: 0,
        money: 0,
      };

      for (const [date, stats] of dates) {
        const splittedDate = date.split("-");
        const formattedDate = `${splittedDate[2]}.${splittedDate[1]}.${splittedDate[0]}`;
        // const { views, clicks, money, ctr, cpc, catalog, avgBoost } = stats;
        const views = stats?.['views'] || 0
        const clicks = stats?.['clicks'] || 0
        const money = stats?.['money'] || 0
        const ctr = stats?.['ctr'] || 0
        const cpc = stats?.['cpc'] || 0
        const catalog = stats?.['catalog'] || 0
        const avgBoost = stats?.['avgBoost'] || 0

        // const {
        //   views: catViews,
        //   clicks: catClicks,
        //   money: catMoney,
        //   ctr: catCtr,
        //   cpc: catCpc,
        // } = catalog;

        const catViews = catalog?.['views'] || 0
        const catClicks = catalog?.['clicks'] || 0
        const catMoney = catalog?.['money'] || 0
        const catCtr = catalog?.['ctr'] || 0
        const catCpc = catalog?.['cpc'] || 0


        const initialRealTimeStats = {
          views: 0,
          clicks: 0,
          sum: 0,
          atbs: 0,
          orders: 0,
          sum_price: 0,
          shks: 0,
        };

        //TODO: Венуть если появится apps в статистике
        // const rsStats = this?.realTimeStats?.[date]?.apps?.reduce(
        //   (acc, cur) => {
        //     const foundNmStats = cur.nm.find(
        //       (nm) => nm.nmId === this.productDetails.id
        //     );
        //     if (!foundNmStats) return acc;
        //     acc.views = (acc.views || 0) + foundNmStats.views;
        //     acc.clicks = (acc.clicks || 0) + foundNmStats.clicks;
        //     acc.sum = (acc.sum || 0) + foundNmStats.sum;
        //     acc.atbs = (acc.atbs || 0) + foundNmStats.atbs;
        //     acc.orders = (acc.orders || 0) + foundNmStats.orders;
        //     acc.sum_price = (acc.sum_price || 0) + foundNmStats.sum_price;
        //     acc.shks = (acc.shks || 0) + foundNmStats.shks;
        //     return acc;
        //   },
        //   { ...initialRealTimeStats }
        // ) || { ...initialRealTimeStats };

        const rsStats = { ...initialRealTimeStats }

        const rsData = this?.realTimeStats?.[date]

        rsStats.views = (rsStats.views || 0) + (rsData?.views || 0);
        rsStats.clicks = (rsStats.clicks || 0) + (rsData?.clicks || 0);
        rsStats.sum = (rsStats.sum || 0) + (rsData?.sum || 0);
        rsStats.atbs = (rsStats.atbs || 0) + (rsData?.atbs || 0);
        rsStats.orders = (rsStats.orders || 0) + (rsData?.orders || 0);
        rsStats.sum_price = (rsStats.sum_price || 0) + (rsData?.sum_price || 0);
        rsStats.shks = (rsStats.shks || 0) + (rsData?.shks || 0);

        const rsViews = rsStats?.['views'] || views + catViews
        const rsClicks = rsStats?.['clicks'] || clicks + catClicks
        const rsMoney = rsStats?.['sum'] || money + catMoney
        const addToCartRealTimeStats = rsStats?.['atbs'] || 0
        const ordersSumPriceRealTimeStats = rsStats?.['sum_price'] || 0
        const ordersCountRealTimeStats = rsStats?.['shks'] || 0

        const orderAvgPriceRealTimeStats =
          (ordersCountRealTimeStats || 0) > 0
            ? precise.round(
              (ordersSumPriceRealTimeStats || 0) / ordersCountRealTimeStats
            )
            : 0;

        const _shelfViews = rsViews - (views || 0) - (catViews || 0);
        const shelfViews = rsViews <= (views || 0) + (catViews || 0) ? 0 : _shelfViews;
        const _shelfClicks = rsClicks - (clicks || 0) - (catClicks || 0);
        const shelfClicks = rsClicks <= (clicks || 0) + (catClicks || 0) ? 0 : _shelfClicks;

        const _shelfMoney = Number(
          precise.toFixed(rsMoney - money - catMoney, 2)
        );
        const shelfMoney = rsViews <= views + catViews ? 0 : _shelfMoney;

        const shelfCtr =
          shelfViews > 0
            ? Number(precise.toFixed((shelfClicks / shelfViews) * 100, 2))
            : 0;
        const shelfCpc =
          shelfClicks > 0
            ? Number(precise.toFixed(shelfMoney / shelfClicks, 2))
            : 0;

        const sumViews = views + catViews + shelfViews;
        const sumClicks = clicks + catClicks + shelfClicks;
        const sumMoney = Number(
          precise.toFixed(money + catMoney + shelfMoney, 2) || 0
        );
        const sumCpm =
          sumViews > 0 ? precise.round((sumMoney / sumViews) * 1000) : 0;

        const sumCtr =
          sumViews > 0
            ? Number(precise.toFixed((sumClicks / sumViews) * 100, 2))
            : 0;
        const sumCpc =
          sumClicks > 0 ? Number(precise.toFixed(sumMoney / sumClicks, 2)) : 0;

        const catPercent =
          sumViews > 0
            ? views > 0
              ? Number(precise.toFixed((100 / sumViews) * catViews, 2))
              : 100
            : 0;

        const shelfPercent =
          sumViews > 0
            ? views > 0
              ? Number(precise.toFixed((100 / sumViews) * shelfViews, 2))
              : 100
            : 0;

        const cpm = views > 0 ? precise.round((money / views) * 1000) : 0;
        const catCpm =
          catViews > 0 ? precise.round((catMoney / catViews) * 1000) : 0;

        const shelfCpm =
          shelfViews > 0 ? precise.round((shelfMoney / shelfViews) * 1000) : 0;

        this.datesCalculatedStats[date] = {
          search: {
            views: views || 0,
            clicks: clicks || 0,
            money: money || 0,
            ctr: ctr || 0,
            cpc: cpc || 0,
            cpm: cpm || 0,
          },
          shelf: {
            views: shelfViews || 0,
            clicks: shelfClicks || 0,
            money: shelfMoney || 0,
            ctr: shelfCtr || 0,
            cpc: shelfCpc || 0,
            percent: shelfPercent || 0,
            cpm: shelfCpm || 0,
          },
          catalog: {
            views: catViews || 0,
            clicks: catClicks || 0,
            money: catMoney || 0,
            ctr: catCtr || 0,
            cpc: catCpc || 0,
            percent: catPercent || 0,
            cpm: catCpm || 0,
          },
          totals: {
            views: sumViews || 0,
            clicks: sumClicks || 0,
            money: sumMoney || 0,
            ctr: sumCtr || 0,
            cpc: sumCpc || 0,
            cpm: sumCpm || 0,
            avgBoost: avgBoost || 0,
          },
        };

        if (this.isProductDataMerged) {
          let chartData = this.rawProductData.data.chartData;
          let funnelData = this.rawProductSalesFunnelData?.chart?.byDay || [];

          const dateSplit = date.split("-");
          const dateFormated = dateSplit[2] + "." + dateSplit[1];

          const funnelDataItem = funnelData.find((item) => item?.date === date);

          const pcsData = chartData.pcs.find(
            (item) => item?.name === dateFormated
          );
          const currencyData = chartData.currency.find(
            (item) => item?.name === dateFormated
          );

          let wishList = funnelDataItem?.addToWishlistCount || 0;
          let openCard = pcsData?.openCard || 0;
          let adClicks = clicks + catClicks + shelfClicks || 0;
          let adClicksRate = 0;

          if (openCard === 0) {
            if (adClicks > 0) {
              adClicksRate = 100;
            } else {
              adClicksRate = 0;
            }
          } else {
            if (adClicks === 0) {
              adClicksRate = 0;
            } else {
              adClicksRate =
                openCard > 0
                  ? Number(precise.toFixed((100 / openCard) * adClicks, 2))
                  : 0;
            }
          }

          let addToCart = pcsData?.addToCart || 0;

          let addToCartWithAdRate = addToCartRealTimeStats || 0;
          // addToCart > 0
          //   ? Number(precise.toFixed(addToCart * (adClicksRate / 100), 2))
          //   : 0;

          let addToCartConversion =
            addToCart > 0 && openCard > 0
              ? Number(precise.toFixed((addToCart * 100) / openCard, 2))
              : 0;

          let addToCartConversionRealTime =
            addToCartWithAdRate > 0 && adClicks > 0
              ? Number(
                precise.toFixed((addToCartWithAdRate * 100) / adClicks, 2)
              )
              : 0;

          let orders = pcsData?.orders || 0;

          let ordersConversion = addToCart > 0
            ? Number(precise.toFixed((100 / addToCart) * orders, 2))
            : 0;

          let ordersWithAdRate = ordersCountRealTimeStats || 0; //ordersRealTimeStats
          // Number(
          //   precise.toFixed((pcsData.orders || 0) * (adClicksRate / 100), 2)
          // );

          let ordersConversionRealTime =
            addToCartWithAdRate > 0
              ? Number(
                precise.toFixed(
                  (100 / addToCartWithAdRate) * ordersWithAdRate,
                  2
                )
              )
              : 0;

          let ordersSum = funnelDataItem?.orderSum || 0;
          //currencyData.orders;


          let ordersSumWithAdRate = ordersSumPriceRealTimeStats || 0;
          // ordersWithAdRate > 0
          //   ? precise.round(priceNoSpp * ordersWithAdRate)
          //   : 0;

          let buyOutPercent = this.rawProductBuyOutData.data.legend.buyout.percent;

          let sales = orders > 0
            ? Number(precise.toFixed(orders * (buyOutPercent / 100), 2))
            : 0;

          let priceNoSpp = orders > 0 ? precise.round(ordersSum / orders) : 0;

          let salesSum = sales > 0 ? precise.round(sales * priceNoSpp) : 0;

          let salesWithAdRate =
            ordersWithAdRate > 0
              ? Number(
                precise.toFixed(ordersWithAdRate * (buyOutPercent / 100), 2)
              )
              : 0;

          let salesSumWithAdRate =
            salesWithAdRate > 0
              ? precise.round(salesWithAdRate * orderAvgPriceRealTimeStats)
              : 0;

          let cps =
            salesWithAdRate > 0
              ? Number(precise.toFixed(sumMoney / salesWithAdRate, 2))
              : 0;
          let cpo =
            ordersWithAdRate > 0
              ? Number(precise.toFixed(sumMoney / ordersWithAdRate, 2))
              : 0;
          let ero =
            ordersWithAdRate > 0
              ? Number(
                precise.toFixed((sumMoney / ordersSumWithAdRate) * 100, 2)
              )
              : 0;
          let er =
            salesWithAdRate > 0
              ? Number(
                precise.toFixed(
                  (sumMoney / (salesWithAdRate * priceNoSpp)) * 100,
                  2
                )
              )
              : 0;

          let eCpo =
            orders > 0 ? Number(precise.toFixed(sumMoney / orders, 2)) || 0 : 0;
          let eCps =
            sales > 0 ? Number(precise.toFixed(sumMoney / sales, 2)) || 0 : 0;
          let eEro =
            orders > 0
              ? Number(precise.toFixed((sumMoney / ordersSum) * 100, 2)) || 0
              : 0;
          let eEr =
            sales > 0
              ? Number(
                precise.toFixed((sumMoney / (sales * priceNoSpp)) * 100, 2) ||
                0
              )
              : 0;

          //Count totals
          analyticsTotals.wishList += wishList;
          analyticsTotals.adClicks += adClicks;
          analyticsTotals.openCard += openCard;
          analyticsTotals.addToCart += addToCart;
          analyticsTotals.addToCartWithAdRate += addToCartWithAdRate;
          analyticsTotals.orders += orders;
          analyticsTotals.ordersWithAdRate += ordersWithAdRate;
          analyticsTotals.ordersSum += ordersSum;
          analyticsTotals.ordersSumWithAdRate += ordersSumWithAdRate;
          analyticsTotals.sales += sales;
          analyticsTotals.salesSum += salesSum;
          analyticsTotals.salesWithAdRate += salesWithAdRate;
          analyticsTotals.salesSumWithAdRate += salesSumWithAdRate;
          analyticsTotals.avgBoost += avgBoost;

          // -------------------

          this.datesCalculatedStats[date] = {
            ...this.datesCalculatedStats[date],
            wishList,
            openCard,
            adClicks,
            adClicksRate,
            addToCart,
            addToCartWithAdRate,
            addToCartConversion,
            addToCartConversionRealTime,
            ordersConversion,
            ordersConversionRealTime,
            orders,
            ordersWithAdRate,
            ordersSum,
            priceNoSpp,
            ordersSumWithAdRate,
            ordersWithAdRate,
            buyOutPercent,
            sales,
            salesSum,
            salesWithAdRate,
            salesSumWithAdRate,
            cps,
            cpo,
            ero,
            er,
            eCpo,
            eCps,
            eEro,
            eEr,
          };
        }

        searchTotals.views += views;
        searchTotals.clicks += clicks;
        searchTotals.money += money;
        searchTotals.ctr =
          searchTotals.views > 0
            ? Number(
              precise.toFixed(
                (searchTotals.clicks / searchTotals.views) * 100,
                2
              )
            )
            : 0;
        searchTotals.cpc =
          searchTotals.clicks > 0
            ? Number(
              precise.toFixed(searchTotals.money / searchTotals.clicks, 2)
            )
            : 0;
        searchTotals.cpm =
          searchTotals.views > 0
            ? precise.round((searchTotals.money / searchTotals.views) * 1000)
            : 0;


        catalogTotals.views += catViews;
        catalogTotals.clicks += catClicks;
        catalogTotals.money += catMoney;
        catalogTotals.ctr =
          catalogTotals.views > 0
            ? Number(
              precise.toFixed(
                (catalogTotals.clicks / catalogTotals.views) * 100,
                2
              )
            )
            : 0;
        catalogTotals.cpc =
          catalogTotals.clicks > 0
            ? Number(
              precise.toFixed(catalogTotals.money / catalogTotals.clicks, 2)
            )
            : 0;
        catalogTotals.cpm =
          catalogTotals.views > 0
            ? precise.round(
              (catalogTotals.money / catalogTotals.views) * 1000
            )
            : 0;

        shelfTotals.views += (shelfViews || 0);
        shelfTotals.clicks += (shelfClicks || 0);
        shelfTotals.money += (shelfMoney || 0);

        shelfTotals.ctr =
          shelfTotals.views > 0
            ? Number(
              precise.toFixed(
                (shelfTotals.clicks / shelfTotals.views) * 100,
                2
              )
            )
            : 0;
        shelfTotals.cpc =
          shelfTotals.clicks > 0
            ? Number(
              precise.toFixed(shelfTotals.money / shelfTotals.clicks, 2)
            )
            : 0;
        shelfTotals.cpm =
          shelfTotals.views > 0
            ? precise.round((shelfTotals.money / shelfTotals.views) * 1000)
            : 0;
      }

      sumTotals.views =
        searchTotals.views + catalogTotals.views + shelfTotals.views;
      sumTotals.clicks =
        searchTotals.clicks + catalogTotals.clicks + shelfTotals.clicks;
      sumTotals.money = Number(
        precise.toFixed(
          searchTotals.money + catalogTotals.money + shelfTotals.money,
          2
        )
      );
      sumTotals.ctr =
        sumTotals.views > 0
          ? Number(
            precise.toFixed((sumTotals.clicks / sumTotals.views) * 100, 2)
          )
          : 0;
      sumTotals.cpc =
        sumTotals.clicks > 0
          ? precise.round(sumTotals.money / sumTotals.clicks)
          : 0;
      sumTotals.cpm =
        sumTotals.money > 0 && sumTotals.views > 0
          ? precise.round(sumTotals.money / (sumTotals.views / 1000))
          : 0;


      catalogTotals.percent =
        sumTotals.views > 0
          ? catalogTotals.views > 0
            ? Number(
              precise.toFixed(
                (100 / sumTotals.views) * catalogTotals.views,
                2
              )
            )
            : 0
          : 0;

      shelfTotals.percent =
        sumTotals.views > 0
          ? shelfTotals.views > 0
            ? Number(
              precise.toFixed((100 / sumTotals.views) * shelfTotals.views, 2)
            )
            : 0
          : 0;

      analyticsTotals.ordersConversion =
        analyticsTotals.addToCart > 0
          ? Number(
            precise.toFixed(
              (100 / analyticsTotals.addToCart) * analyticsTotals.orders,
              2
            )
          )
          : 0;

      analyticsTotals.ordersConversionRealTime =
        analyticsTotals.addToCart > 0
          ? Number(
            precise.toFixed(
              (100 / analyticsTotals.addToCartWithAdRate) *
              analyticsTotals.ordersWithAdRate,
              2
            )
          )
          : 0;

      analyticsTotals.salesWithAdRate = Number(
        precise.toFixed(analyticsTotals.salesWithAdRate, 2)
      );

      analyticsTotals.addToCartWithAdRate = Number(
        precise.toFixed(analyticsTotals.addToCartWithAdRate, 2)
      );

      analyticsTotals.ordersWithAdRate = Number(
        precise.toFixed(analyticsTotals.ordersWithAdRate, 2)
      );

      analyticsTotals.addToCartPercent =
        analyticsTotals.addToCart > 0 && analyticsTotals.openCard > 0
          ? precise.toFixed(
            (analyticsTotals.addToCart * 100) / analyticsTotals.openCard,
            2
          )
          : 0;

      analyticsTotals.addToCartPercentRealTime =
        analyticsTotals.addToCartWithAdRate > 0 && analyticsTotals.openCard > 0
          ? precise.toFixed(
            (analyticsTotals.addToCartWithAdRate * 100) /
            analyticsTotals.adClicks,
            2
          )
          : 0;

      analyticsTotals.buyoutPercent = this.rawProductBuyOutData.data.legend.buyout.percent || 0;

      analyticsTotals.priceNoSpp =
        analyticsTotals.orders > 0
          ? precise.round(analyticsTotals.ordersSum / analyticsTotals.orders)
          : 0;
      analyticsTotals.clicksRate = Number(
        precise.toFixed((100 / analyticsTotals.openCard) * sumTotals.clicks, 2)
      );

      analyticsTotals.cpo =
        analyticsTotals.ordersWithAdRate > 0
          ? Number(
            precise.toFixed(
              sumTotals.money / analyticsTotals.ordersWithAdRate,
              2
            )
          )
          : 0;

      analyticsTotals.cps =
        analyticsTotals.salesWithAdRate > 0
          ? Number(
            precise.toFixed(
              sumTotals.money / analyticsTotals.salesWithAdRate,
              2
            )
          )
          : 0;

      analyticsTotals.ero =
        analyticsTotals.ordersSumWithAdRate > 0
          ? precise.toFixed(
            (sumTotals.money / analyticsTotals.ordersSumWithAdRate) * 100,
            2
          )
          : 0;

      analyticsTotals.er =
        analyticsTotals.salesWithAdRate > 0
          ? precise.toFixed(
            (sumTotals.money /
              (analyticsTotals.salesWithAdRate *
                analyticsTotals.priceNoSpp)) *
            100,
            2
          )
          : 0;

      analyticsTotals.eCpo =
        analyticsTotals.orders > 0
          ? precise.toFixed(sumTotals.money / analyticsTotals.orders, 2)
          : 0;

      analyticsTotals.eCps =
        analyticsTotals.sales > 0
          ? precise.toFixed(sumTotals.money / analyticsTotals.sales, 2)
          : 0;

      analyticsTotals.eEro =
        analyticsTotals.ordersSum > 0
          ? precise.toFixed(
            (sumTotals.money / analyticsTotals.ordersSum) * 100,
            2
          )
          : 0;

      analyticsTotals.eEr =
        analyticsTotals.sales > 0
          ? precise.toFixed(
            (sumTotals.money /
              (analyticsTotals.sales * analyticsTotals.priceNoSpp)) *
            100,
            2
          )
          : 0;

      analyticsTotals.avgBoost =
        dates.length > 0
          ? precise.round(analyticsTotals.avgBoost / dates.length)
          : 0;

      analyticsTotals.sales = Number(precise.toFixed(analyticsTotals.sales, 2));
      analyticsTotals.orders = Number(
        precise.toFixed(analyticsTotals.orders, 2)
      );

      catalogTotals.money = Number(precise.toFixed(catalogTotals.money, 2));
      searchTotals.money = Number(precise.toFixed(searchTotals.money, 2));
      shelfTotals.money = Number(precise.toFixed(shelfTotals.money, 2));

      this.datesCalculatedTotalsStats = {
        search: searchTotals,
        catalog: catalogTotals,
        shelf: shelfTotals,
        analytics: analyticsTotals,
        sum: sumTotals,
      };
    }

    ctrMiniCard() {
      let dates = Object.entries(this.datesStats);
      dates.sort((a, b) => Date.parse(b[0]) - Date.parse(a[0]));

      const stats = this.datesCalculatedStats?.[dates[0]?.[0]] || null;
      const beforeStats = this.datesCalculatedStats?.[dates[1]?.[0]] || null;

      if (!stats) return;

      const todayCtr = stats.totals.ctr;
      const beforeCtr = beforeStats
        ? Number(precise.toFixed(todayCtr - beforeStats.totals.ctr, 2))
        : "";
      const diffSymbol = beforeCtr > 0 ? "+" : "";
      const diffColor =
        beforeCtr > 0
          ? "color: #22c55e;"
          : beforeCtr < 0
            ? "color: #d91420;"
            : "";
      const avgCtr = this.datesCalculatedTotalsStats.sum.ctr;

      return `
    <div style="color: #707f95; background:#0f172a; padding: 12px; gap: 12px; border: 1px solid #ffffff10; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; width:100%">
        <div style="display: flex; flex: 1; flex-wrap: nowrap; flex-direction: column; gap: 4px; min-width: fit-content;">
          <div style="font-size: 0.95em;">Конверсия в клик</div>
          <div style="display: flex; gap: 4px; align-items: baseline;">
            <span style="color: #cbd5e1; font-size: 1.5em; font-weight: 700;">%${todayCtr}</span>
            <span style="${diffColor}; font-size: 0.85em; font-weight: 600;">${diffSymbol}${beforeCtr}%</span>
          </div>
          <div style="font-size: 0.9em; font-weight: 200; white-space: nowrap;">Средний CTR <span>%${avgCtr}</span></div>
        </div>
        <div style="display: flex; flex-direction: column; width: 100%; height: 61px;" id="n-card-ctr-chart"></div>
      </div>`;
    }

    ctrMiniChart() {
      window.ctrMiniChart = echarts.init(document.getElementById("n-card-ctr-chart"));

      let dates = Object.entries(this.datesStats);
      dates.sort((a, b) => Date.parse(a[0]) - Date.parse(b[0]));
      if (dates.length > 14) {
        dates = dates.slice(dates.length - 15, dates.length);
      }
      const startLength = dates.length;
      if (startLength < 14) {
        for (let i = 0; i < 14 - startLength; i++) {
          const date = new Date(dates[0][0]);
          date.setDate(date.getDate() - 1);
          const dateString =
            date.getFullYear() +
            "-" +
            zeroPad(date.getMonth() + 1, 2) +
            "-" +
            zeroPad(date.getDate(), 2);
          dates.unshift([dateString]);
        }
      }

      var option = {
        grid: {
          top: "2%",
          left: "0%",
          right: "0%",
          bottom: "2%",
        },
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          valueFormatter: (value) => value + "%",
          className: "n-mini-charts-tooltip",
          textStyle: {
            color: "#cbd5e1",
          },
        },
        xAxis: {
          data: dates.map((date) => {
            const splitted = date[0].split("-");
            const formatted =
              splitted[2] + "." + splitted[1] + "." + splitted[0];
            return formatted;
          }),
          splitLine: { show: false },
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { show: false },
        },
        yAxis: {
          splitLine: { show: false },
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { show: false },
        },
        series: [
          {
            type: "bar",
            name: "CTR",
            data: dates.map(
              (date) => this.datesCalculatedStats[date[0]]?.totals?.ctr || 0
            ),
            barMinHeight: 1,
            itemStyle: {
              barBorderRadius: [50, 50],
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#22c55e",
                },
                {
                  offset: 1,
                  color: "#184629cc",
                },
              ]),
              shadowColor: "#22c55e10",
              shadowBlur: 6.5,
            },
          },
        ],
      };

      window.ctrMiniChart.setOption(option);
    }

    cpcMiniCard() {
      let dates = Object.entries(this.datesStats);
      dates.sort((a, b) => Date.parse(b[0]) - Date.parse(a[0]));

      const stats = this.datesCalculatedStats?.[dates[0]?.[0]] || null;
      const beforeStats = this.datesCalculatedStats?.[dates[1]?.[0]] || null;

      if (!stats) return;

      const todayCpc = stats.totals.cpc;
      const beforeCpc = beforeStats
        ? Number(precise.toFixed(todayCpc - beforeStats.totals.cpc, 2))
        : "";
      const diffSymbol = beforeCpc > 0 ? "+" : "";
      const diffColor =
        beforeCpc > 0
          ? "color: #d91420;"
          : beforeCpc < 0
            ? "color: #22c55e;"
            : "";
      const avgCpc = this.datesCalculatedTotalsStats.sum.cpc;

      return `
    <div style="color: #707f95; background:#0f172a; padding: 12px; gap: 12px; border: 1px solid #ffffff10; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; width:100%">
        <div style="display: flex; flex: 1; flex-direction: column; gap: 4px;min-width: fit-content;">
          <div style="font-size: 0.95em;">Цена за клик</div>
          <div style="display: flex; gap: 4px; align-items: baseline;">
            <span style="color: #cbd5e1; font-size: 1.5em; font-weight: 700;">₽${todayCpc}</span>
            <span style="${diffColor}; font-size: 0.85em; font-weight: 600;">${diffSymbol}${beforeCpc}₽</span>
          </div>
          <div style="font-size: 0.9em; font-weight: 200; white-space: nowrap;">Средний CPC <span>₽${avgCpc}</span></div>
        </div>
        <div style="display: flex; flex-direction: column; width: 100%; height: 61px;" id="n-card-cpc-chart"></div>
      </div>`;
    }
    cpcMiniChart() {
      window.cpcMiniChart = echarts.init(document.getElementById("n-card-cpc-chart"));

      let dates = Object.entries(this.datesStats);
      dates.sort((a, b) => Date.parse(a[0]) - Date.parse(b[0]));
      if (dates.length > 14) {
        dates = dates.slice(dates.length - 15, dates.length);
      }
      const startLength = dates.length;
      if (startLength < 14) {
        for (let i = 0; i < 14 - startLength; i++) {
          const date = new Date(dates[0][0]);
          date.setDate(date.getDate() - 1);
          const dateString =
            date.getFullYear() +
            "-" +
            zeroPad(date.getMonth() + 1, 2) +
            "-" +
            zeroPad(date.getDate(), 2);
          dates.unshift([dateString]);
        }
      }

      var option = {
        grid: {
          top: "2%",
          left: "0%",
          right: "0%",
          bottom: "2%",
        },
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          valueFormatter: (value) => value + "₽",
          className: "n-mini-charts-tooltip",
          textStyle: {
            color: "#cbd5e1",
          },
        },
        xAxis: {
          data: dates.map((date) => {
            const splitted = date[0].split("-");
            const formatted =
              splitted[2] + "." + splitted[1] + "." + splitted[0];
            return formatted;
          }),
          splitLine: { show: false },
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { show: false },
        },
        yAxis: {
          splitLine: { show: false },
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { show: false },
        },
        series: [
          {
            type: "bar",
            name: "CPC",
            data: dates.map(
              (date) => this.datesCalculatedStats[date[0]]?.totals?.cpc || 0
            ),
            barMinHeight: 1,
            itemStyle: {
              barBorderRadius: [50, 50],
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#22c55e",
                },
                {
                  offset: 1,
                  color: "#184629cc",
                },
              ]),
            },
          },
        ],
      };

      window.cpcMiniChart.setOption(option);
    }
    cpmMiniCard() {
      let dates = Object.entries(this.datesStats);
      dates.sort((a, b) => Date.parse(b[0]) - Date.parse(a[0]));

      const stats = this.datesCalculatedStats?.[dates[0]?.[0]] || null;
      const beforeStats = this.datesCalculatedStats?.[dates[1]?.[0]] || null;

      if (!stats) return;

      const todayCpm = stats.totals.cpm;
      const beforeCpm = beforeStats
        ? precise.round(todayCpm - beforeStats.totals.cpm, 2)
        : "";
      const diffSymbol = beforeCpm > 0 ? "+" : "";
      const diffColor =
        beforeCpm > 0
          ? "color: #d91420;"
          : beforeCpm < 0
            ? "color: #22c55e;"
            : "";
      const avgCpm = precise.round(this.datesCalculatedTotalsStats.sum.cpm);

      return `
    <div style="color: #707f95; background:#0f172a; padding: 12px; gap: 12px; border: 1px solid #ffffff10; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; width:100%">
        <div style="display: flex; flex: 1;flex-direction: column; gap: 4px;min-width: fit-content;">
          <div style="font-size: 0.95em;">Рекламная ставка</div>
          <div style="display: flex; gap: 4px; align-items: baseline;">
            <span style="color: #cbd5e1; font-size: 1.5em; font-weight: 700;">₽${todayCpm}</span>
            <span style="${diffColor}; font-size: 0.85em; font-weight: 600;">${diffSymbol}${beforeCpm}₽</span>
          </div>
          <div style="font-size: 0.9em; font-weight: 200; white-space: nowrap;">Средний CPM <span>₽${avgCpm}</span></div>
        </div>
        <div style="display: flex; flex-direction: column; width: 100%; height: 61px;" id="n-card-cpm-chart"></div>
      </div>`;
    }
    cpmMiniChart() {
      window.cpmMiniChart = echarts.init(document.getElementById("n-card-cpm-chart"));

      let dates = Object.entries(this.datesStats);
      dates.sort((a, b) => Date.parse(a[0]) - Date.parse(b[0]));
      if (dates.length > 14) {
        dates = dates.slice(dates.length - 15, dates.length);
      }
      const startLength = dates.length;
      if (startLength < 14) {
        for (let i = 0; i < 14 - startLength; i++) {
          const date = new Date(dates[0][0]);
          date.setDate(date.getDate() - 1);
          const dateString =
            date.getFullYear() +
            "-" +
            zeroPad(date.getMonth() + 1, 2) +
            "-" +
            zeroPad(date.getDate(), 2);
          dates.unshift([dateString]);
        }
      }

      var option = {
        grid: {
          top: "2%",
          left: "0%",
          right: "0%",
          bottom: "2%",
        },
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          valueFormatter: (value) => value + "₽",
          className: "n-mini-charts-tooltip",
          textStyle: {
            color: "#cbd5e1",
          },
        },
        xAxis: {
          data: dates.map((date) => {
            const splitted = date[0].split("-");
            const formatted =
              splitted[2] + "." + splitted[1] + "." + splitted[0];
            return formatted;
          }),
          splitLine: { show: false },
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { show: false },
        },
        yAxis: {
          splitLine: { show: false },
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { show: false },
        },
        series: [
          {
            type: "bar",
            name: "Каталог",
            data: dates.map(
              (date) => this.datesCalculatedStats[date[0]]?.catalog?.cpm || 0
            ),
            stack: "x",
            itemStyle: {
              barBorderRadius: [0, 0, 50, 50],
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#8338EC",
                },
                {
                  offset: 1,
                  color: "#8338EC50",
                },
              ]),
            },
          },
          {
            type: "bar",
            name: "Полки",
            data: dates.map(
              (date) => this.datesCalculatedStats[date[0]]?.shelf?.cpm || 0
            ),
            stack: "x",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#2563eb",
                },
                {
                  offset: 1,
                  color: "#2563eb50",
                },
              ]),
            },
          },
          {
            type: "bar",
            name: "Поиск",
            data: dates.map(
              (date) => this.datesCalculatedStats[date[0]]?.search?.cpm || 0
            ),
            stack: "x",
            barMinHeight: 1,
            itemStyle: {
              barBorderRadius: [50, 50, 0, 0],
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#22c55e",
                },
                {
                  offset: 1,
                  color: "#184629cc",
                },
              ]),
            },
          },
          {
            type: "line",
            name: "Средний",
            symbol: "circle",
            symbolSize: 2,
            smooth: true,
            data: dates.map(
              (date) => this.datesCalculatedStats[date[0]]?.totals?.cpm || 0
            ),
            itemStyle: {
              color: "#d1a724",
              borderColor: "#ffffff",
              borderWidth: 1,
            },
            lineStyle: {
              width: 1,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#d1a724",
                },
                {
                  offset: 1,
                  color: "#d1a724",
                },
              ]),
            },
          },
        ],
      };

      window.cpmMiniChart.setOption(option);
    }

    moneyMiniCard() {
      let dates = Object.entries(this.datesStats);
      dates.sort((a, b) => Date.parse(b[0]) - Date.parse(a[0]));

      const stats = this.datesCalculatedStats?.[dates[0]?.[0]] || null;

      if (!stats) return;

      const todayMoney = precise.round(stats.totals.money);
      const totalMoney = precise.round(
        this.datesCalculatedTotalsStats.sum.money
      );

      return `
    <div style="color: #707f95; background:#0f172a; padding: 12px; gap: 12px; border: 1px solid #ffffff10; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; width:100%">
        <div style="display: flex; flex:1; flex-direction: column; gap: 4px;min-width: fit-content;">
          <div style="font-size: 0.95em;">Затраты за день</div>
          <div style="display: flex; gap: 4px; align-items: baseline;">
            <span style="color: #cbd5e1; font-size: 1.5em; font-weight: 700;">₽${todayMoney}</span>
          </div>
          <div style="font-size: 0.9em; font-weight: 200; white-space: nowrap;">Всего <span>₽${numberWithSpaces(
        totalMoney
      )}</span></div>
        </div>
        <div style="display: flex; flex-direction: column; width: 100%; height: 61px;" id="n-card-money-chart"></div>
      </div>`;
    }
    moneyMiniChart() {
      window.moneyMiniChart = echarts.init(document.getElementById("n-card-money-chart"));

      let dates = Object.entries(this.datesStats);
      dates.sort((a, b) => Date.parse(a[0]) - Date.parse(b[0]));
      if (dates.length > 14) {
        dates = dates.slice(dates.length - 15, dates.length);
      }
      const startLength = dates.length;
      if (startLength < 14) {
        for (let i = 0; i < 14 - startLength; i++) {
          const date = new Date(dates[0][0]);
          date.setDate(date.getDate() - 1);
          const dateString =
            date.getFullYear() +
            "-" +
            zeroPad(date.getMonth() + 1, 2) +
            "-" +
            zeroPad(date.getDate(), 2);
          dates.unshift([dateString]);
        }
      }

      var option = {
        grid: {
          top: "2%",
          left: "0%",
          right: "0%",
          bottom: "2%",
        },
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          valueFormatter: (value) => value + "₽",
          className: "n-mini-charts-tooltip",
          textStyle: {
            color: "#cbd5e1",
          },
        },
        xAxis: {
          data: dates.map((date) => {
            const splitted = date[0].split("-");
            const formatted =
              splitted[2] + "." + splitted[1] + "." + splitted[0];
            return formatted;
          }),
          splitLine: { show: false },
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { show: false },
        },
        yAxis: {
          splitLine: { show: false },
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { show: false },
        },
        series: [
          {
            type: "bar",
            name: "Затраты",
            data: dates.map(
              (date) => this.datesCalculatedStats[date[0]]?.totals?.money || 0
            ),
            barMinHeight: 1,
            itemStyle: {
              barBorderRadius: [50, 50],
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#22c55e",
                },
                {
                  offset: 1,
                  color: "#184629cc",
                },
              ]),
              shadowColor: "#22c55e10",
              shadowBlur: 6.5,
            },
          },
        ],
      };

      window.moneyMiniChart.setOption(option);
    }

    renderMiniCharts() {
      const chartsLayout = document.getElementById("n-charts-layout");
      chartsLayout.innerHTML = [
        this.ctrMiniCard(),
        this.cpcMiniCard(),
        this.cpmMiniCard(),
        this.moneyMiniCard(),
      ].join("");
      try {
        this.ctrMiniChart();
        this.cpcMiniChart();
        this.cpmMiniChart();
        this.moneyMiniChart();
      } catch (e) {
        console.warn(e);
      }
    }

    set selectedChartData(value) {
      this.#selectedChartData = value;
    }

    get selectedChartData() {
      return this.#selectedChartData;
    }

    renderMainChart() {
      const layout = document.getElementById("n-main-chart-layout");
      layout.style.display = "flex";

      window.nMainAnalyticsChart = echarts.init(
        document.getElementById("n-main-chart")
      );

      let dates = Object.entries(this.datesStats);
      dates.sort((a, b) => Date.parse(a[0]) - Date.parse(b[0]));
      const startLength = dates.length;
      if (startLength < 14) {
        for (let i = 0; i <= 14 - startLength; i++) {
          const date = new Date(dates[0][0]);
          date.setDate(date.getDate() - 1);
          const dateString =
            date.getFullYear() +
            "-" +
            zeroPad(date.getMonth() + 1, 2) +
            "-" +
            zeroPad(date.getDate(), 2);
          dates.unshift([dateString]);
        }
      }

      const lineTemplate = {
        type: "line",
        smooth: "true",
        smoothMonotone: "x",
        name: "Показы",
        data: [],
        symbol: "circle",
        symbolSize: 0,
        itemStyle: {
          color: "#0f172a",
          borderColor: "#0f172a",
          borderWidth: 1,
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0.5, 1, [
            { offset: 0, color: "red" },
            { offset: 1, color: "transparent" },
          ]),
        },
        lineStyle: {
          width: 2,
          color: "#d1a724",
          shadowColor: "#d1a724",
        },
      };

      const lineDashedTemplate = {
        type: "line",
        smooth: "true",
        smoothMonotone: "x",
        name: "Показы",
        data: [],
        symbol: "circle",
        symbolSize: 0,
        itemStyle: {
          color: "#0f172a",
          borderColor: "#0f172a",
          borderWidth: 1,
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0.5, 1, [
            { offset: 0, color: "red" },
            { offset: 1, color: "transparent" },
          ]),
        },
        lineStyle: {
          width: 2,
          type: "dashed",
          color: "#d1a724",
          shadowColor: "#d1a724",
        },
      };

      const lineDottedTemplate = {
        type: "line",
        smooth: "true",
        smoothMonotone: "x",
        name: "Показы",
        data: [],
        symbol: "circle",
        symbolSize: 0,
        itemStyle: {
          color: "#0f172a",
          borderColor: "#0f172a",
          borderWidth: 1,
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0.5, 1, [
            { offset: 0, color: "red" },
            { offset: 1, color: "transparent" },
          ]),
        },
        lineStyle: {
          width: 2,
          type: "dotted",
          color: "#d1a724",
          shadowColor: "#d1a724",
        },
      };

      const barTemplate = {
        type: "bar",
        name: "Показы",
        data: [],
        barMinHeight: 1,
        itemStyle: {
          barBorderRadius: [12, 12, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#22c55e",
            },
            {
              offset: 1,
              color: "#184629cc",
            },
          ]),
          borderColor: "",
          borderWidth: 1,
          shadowColor: "#22c55e10",
          shadowBlur: 6.5,
        },
      };

      const barEmptyTemplate = {
        type: "bar",
        name: "Показы",
        data: [],
        barMinHeight: 1,
        itemStyle: {
          barBorderRadius: [12, 12, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#22c55e",
            },
            {
              offset: 1,
              color: "#184629cc",
            },
          ]),
          borderColor: "",
          borderWidth: 2,
          color: "transparent",
          shadowColor: "#22c55e10",
          shadowBlur: 6.5,
        },
      };

      const barDashedTemplate = {
        type: "bar",
        name: "Показы",
        data: [],
        barMinHeight: 1,
        itemStyle: {
          barBorderRadius: [12, 12, 0, 0],
          borderColor: "",
          borderWidth: 2,
          borderType: "dashed",
          color: "transparent",
          shadowColor: "#22c55e10",
          shadowBlur: 6.5,
        },
      };
      const barDottedTemplate = {
        type: "bar",
        name: "Показы",
        data: [],
        barMinHeight: 1,
        itemStyle: {
          barBorderRadius: [12, 12, 0, 0],
          borderColor: "",
          borderWidth: 2,
          borderType: "dotted",
          color: "transparent",
          shadowColor: "#22c55e10",
          shadowBlur: 6.5,
        },
      };

      const dataHouse = {};

      dates.forEach(([date]) => {
        this.#selectedChartData.forEach((selected) => {
          if (selected.accessor.includes("totals-")) {
            const accessor = selected.accessor.replace("totals-", "");
            const name = selected.name;
            const color = selected.color;
            const axisId = selected.axisId;
            const type = selected.type;
            const data = this.datesCalculatedStats[date]?.totals[accessor] || 0;
            dataHouse[selected.accessor] = dataHouse[selected.accessor] || {
              name,
              color,
              axisId,
              type,
            };
            dataHouse[selected.accessor].data =
              dataHouse[selected.accessor].data || [];
            dataHouse[selected.accessor].data.push(data);
            return;
          }

          if (selected.accessor.includes("shelf-")) {
            const accessor = selected.accessor.replace("shelf-", "");
            const name = selected.name;
            const color = selected.color;
            const axisId = selected.axisId;
            const type = selected.type;
            const data = this.datesCalculatedStats[date]?.shelf[accessor] || 0;
            dataHouse[selected.accessor] = dataHouse[selected.accessor] || {
              name,
              color,
              axisId,
              type,
            };
            dataHouse[selected.accessor].data =
              dataHouse[selected.accessor].data || [];
            dataHouse[selected.accessor].data.push(data);
            return;
          }

          if (selected.accessor.includes("search-")) {
            const accessor = selected.accessor.replace("search-", "");
            const name = selected.name;
            const color = selected.color;
            const axisId = selected.axisId;
            const type = selected.type;
            const data = this.datesCalculatedStats[date]?.search[accessor] || 0;
            dataHouse[selected.accessor] = dataHouse[selected.accessor] || {
              name,
              color,
              axisId,
              type,
            };
            dataHouse[selected.accessor].data =
              dataHouse[selected.accessor].data || [];
            dataHouse[selected.accessor].data.push(data);
            dataHouse[selected.accessor].name = name;
            return;
          }

          if (selected.accessor.includes("catalog-")) {
            const accessor = selected.accessor.replace("catalog-", "");
            const name = selected.name;
            const color = selected.color;
            const axisId = selected.axisId;
            const type = selected.type;
            const data =
              this.datesCalculatedStats[date]?.catalog[accessor] || 0;
            dataHouse[selected.accessor] = dataHouse[selected.accessor] || {
              name,
              color,
              axisId,
              type,
            };
            dataHouse[selected.accessor].data =
              dataHouse[selected.accessor].data || [];
            dataHouse[selected.accessor].data.push(data);
            dataHouse[selected.accessor].name = name;
            return;
          }

          const accessor = selected.accessor;
          const name = selected.name;
          const color = selected.color;
          const axisId = selected.axisId;
          const type = selected.type;
          const data = this.datesCalculatedStats[date]?.[accessor] || 0;
          dataHouse[accessor] = dataHouse[accessor] || {
            name,
            color,
            axisId,
            type,
          };
          dataHouse[accessor].data = dataHouse[accessor].data || [];
          dataHouse[accessor].data.push(data);
          dataHouse[accessor].name = name;
        });
      });

      const series = Object.entries(dataHouse).map(
        ([accessor, { data, name, color, axisId, type }]) => {
          if (type === "line") {
            return {
              ...lineTemplate,
              yAxisIndex: axisId,
              lineStyle: {
                ...lineTemplate.lineStyle,
                color,
                shadowColor: color + "AA",
                shadowBlur: 30,
              },
              itemStyle: {
                ...lineTemplate.itemStyle,
                color,
              },
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: color + "70" },
                  { offset: 1, color: color + "10" },
                ]),
              },
              data,
              name,
            };
          }
          if (type === "line-dashed") {
            return {
              ...lineDashedTemplate,
              yAxisIndex: axisId,
              lineStyle: {
                ...lineDashedTemplate.lineStyle,
                color,
                shadowColor: color + "AA",
                shadowBlur: 30,
              },
              itemStyle: {
                ...lineDashedTemplate.itemStyle,
                color,
              },
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: color + "50" },
                  { offset: 1, color: "transparent" },
                ]),
              },
              data,
              name,
            };
          }

          if (type === "line-dotted") {
            return {
              ...lineDottedTemplate,
              yAxisIndex: axisId,
              lineStyle: {
                ...lineDottedTemplate.lineStyle,
                color,
                shadowColor: color + "AA",
                shadowBlur: 30,
              },
              itemStyle: {
                ...lineDottedTemplate.itemStyle,
                color,
              },
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: color + "50" },
                  { offset: 1, color: "transparent" },
                ]),
              },
              data,
              name,
            };
          }

          if (type === "bar") {
            return {
              ...barTemplate,
              yAxisIndex: axisId,
              itemStyle: {
                ...barTemplate.itemStyle,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: color + "AA",
                  },
                  {
                    offset: 1,
                    color: color + "30",
                  },
                ]),
                borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: color,
                  },
                  {
                    offset: 1,
                    color: color + "30",
                  },
                ]),
              },
              data,
              name,
            };
          }
          if (type === "bar-empty") {
            return {
              ...barEmptyTemplate,
              yAxisIndex: axisId,
              itemStyle: {
                ...barEmptyTemplate.itemStyle,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: color + "50",
                  },
                  {
                    offset: 1,
                    color: color + "10",
                  },
                ]),
                borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: color,
                  },
                  {
                    offset: 1,
                    color: color + "30",
                  },
                ]),
              },
              data,
              name,
            };
          }
          if (type === "bar-dashed") {
            return {
              ...barDashedTemplate,
              yAxisIndex: axisId,
              itemStyle: {
                ...barDashedTemplate.itemStyle,
                borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: color,
                  },
                  {
                    offset: 1,
                    color: color + "30",
                  },
                ]),
              },
              data,
              name,
            };
          }
          if (type === "bar-dotted") {
            return {
              ...barDottedTemplate,
              yAxisIndex: axisId,
              itemStyle: {
                ...barDottedTemplate.itemStyle,
                borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: color,
                  },
                  {
                    offset: 1,
                    color: color + "30",
                  },
                ]),
              },
              data,
              name,
            };
          }
        }
      );

      var option = {
        animation: false,
        grid: {
          top: "1%",
          left: "0%",
          right: "0%",
          bottom: "1.7%",
        },
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          appendToBody: true,
          className: "n-main-chart-tooltip",
          textStyle: {
            color: "#cbd5e1",
          },
        },
        xAxis: [
          {
            data: dates.map((date) => {
              const splitted = date[0].split("-");
              const formatted =
                splitted[2] + "." + splitted[1] + "." + splitted[0];
              return formatted;
            }),
            splitLine: {
              show: true,
              lineStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "transparent" },
                  { offset: 0.3, color: "#ffffff10" },
                ]),
              },
              interval: 0,
            },
            minorTick: {
              show: false,
              lineStyle: { color: "#ffffff10" },
              interval: 0,
            },
            axisLine: {
              show: true,
              lineStyle: { color: "#ffffff10" },
              interval: 0,
            },
            axisTick: {
              show: true,
              lineStyle: { color: "#ffffff10" },
              interval: 0,
            },
            axisLabel: {
              show: true,
              lineStyle: { color: "#ffffff10" },
              interval: 0,
            },
          },
        ],
        yAxis: [
          {
            splitLine: {
              show: false,
              lineStyle: { color: "#ffffff10" },
              interval: 0,
            },
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { show: false },
          },
          {
            splitLine: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { show: false },
          },
          {
            splitLine: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { show: false },
          },
          {
            splitLine: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { show: false },
          },
          {
            splitLine: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { show: false },
          },
          {
            splitLine: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { show: false },
          },
          {
            splitLine: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { show: false },
          },
          {
            splitLine: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { show: false },
          },
          {
            splitLine: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { show: false },
          },
          {
            splitLine: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { show: false },
          },
        ],
        series,
      };

      window.nMainAnalyticsChart.setOption(option, true);
      window.onresize = function () {
        window.nMainAnalyticsChart.resize();
        window.ctrMiniChart.resize();
        window.cpcMiniChart.resize();
        window.cpmMiniChart.resize();
        window.moneyMiniChart.resize();
      };
    }

    renderMainChartSelectors() {
      let dates = Object.entries(this.datesStats);
      dates.sort((a, b) => Date.parse(b[0]) - Date.parse(a[0]));
      const lastDate = dates[0][0];

      const selectors = [
        ...document.querySelectorAll("#n-main-chart-selector-item"),
      ];
      selectors.forEach((selector) => {
        const selectorValue = selector.getElementsByClassName(
          "n-main-chart-selector-item-inside-value"
        )[0];
        const accessor = selector.dataset.accessor;
        let value = 0;

        if (accessor.includes("totals-")) {
          value =
            this.datesCalculatedStats?.[lastDate]?.totals[
            accessor.replace("totals-", "")
            ] || 0;
        } else if (accessor.includes("search-")) {
          value =
            this.datesCalculatedStats?.[lastDate]?.search[
            accessor.replace("search-", "")
            ] || 0;
        } else if (accessor.includes("catalog-")) {
          value =
            this.datesCalculatedStats?.[lastDate]?.catalog[
            accessor.replace("catalog-", "")
            ] || 0;
        } else if (accessor.includes("shelf-")) {
          value =
            this.datesCalculatedStats?.[lastDate]?.shelf[
            accessor.replace("shelf-", "")
            ] || 0;
        } else {
          value = this.datesCalculatedStats?.[lastDate]?.[accessor] || 0;
        }

        selectorValue.innerText = value;
      });
    }

    renderDatesListv2() {
      this.calcDatesData();
      this.renderMiniCharts();
      this.renderMainChartSelectors();
      this.renderMainChart();
      let dates = Object.entries(this.datesStats);
      dates.sort((a, b) => Date.parse(b[0]) - Date.parse(a[0]));

      const TABLE_HEADER = `
        <div class="n-title" style="justify-content: flex-start; z-index: 1; border-left:none; border-right:none; position:sticky; top:0;padding-left:0 !important; padding-right: 12px !important;">
          <div style="display:flex; gap:6px; position: sticky; left:0;">
            <div style="min-width: 73px; width:85px; box-sizing: content-box; display: flex;background: #1e293b; height: 40px; border-left: 1px solid #ffffff1a; border-right: 1px solid #ffffff1a; align-items: center;">
              <button class="n-tools-button" style="height:40px;" id="n-export-days-btn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                  <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z"></path>
                  <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z"></path>
                </svg>
                Экспорт
              </button>
            </div>
          </div>
          <div class="n-title-flex">
            <div class="n-title-flex" style="display:flex; background: #1e293b; position: sticky; left: 87px; border-right:1px solid #334155;">
              <span style="width:366px; text-align:center;">Статистика</span>
            </div>
            <div class="n-title-flex" style="display:flex; background: #1e293b; left: 87px; margin-left: -12px; border-right:1px solid #334155; align-items: center; justify-content: center;width:524px;">
              <div style="text-align:center;">Рекламная Воронка
              </div>
              <div style="margin-left: 45px; display: flex; align-items: center; gap: 2px; justify-content: center;">
              <svg style="width:14px; fill:#d12424;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5" data-tip="На текущий момент ВБ в Статистике Рекламной Кампании отдает суммарное количество конверсий, включая ассоциированные. Советуем ориентироваться по Общей Воронке (прокрутите вправо данную таблицу)">
                <path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd" />
              </svg>

                <span>Включая Ассоциированные Конверсии</span>
              </div>
            </div>
            <div class="n-title-flex" style="display:flex; background: #1e293b; left: 87px; border-right:1px solid #334155;">
              <span style="width:460px; text-align:center;">Рекламные Метрики <span class="n-wtf" data-tip="Метрики относительно процента рекламных открытий карточки">?</span></span>
            </div>
            <div class="n-title-flex" style="display:flex; background: #1e293b; left: 87px; margin-left: -12px; border-right:1px solid #334155;">
              <span style="width:579px; text-align:center;">Общая Воронка</span>
            </div>
            <div class="n-title-flex" style="display:flex; background: #1e293b; left: 87px; border-right:1px solid #334155;">
              <span style="width:465px; text-align:center;">Общие Метрики <span class="n-wtf" data-tip="Метрики относительно общих данных по артикулу">?</span></span>
            </div>
            <div class="n-title-flex" style="display:flex; background: #1e293b; left: 87px; border-right:1px solid #334155;">
              <span style="width:366px; text-align:center;">Статистика Поиска</span>
            </div>
            <div class="n-title-flex" style="display:flex; background: #1e293b; left: 87px; border-right:1px solid #334155;">
              <span style="width:428px; text-align:center;">Статистика Каталога</span>
            </div>
            <div class="n-title-flex" style="display:flex; background: #1e293b; left: 87px; border-right:1px solid #334155;">
              <span style="width:428px; text-align:center;">Статистика Полок <span class="n-wtf" data-tip="Рекомендательные Полки - Объединение показов рекомендаций на Главной странице и в Карточке товара">?</span></span>
            </div>
          </div>
        </div>
        
        <div class="n-title" style="justify-content: flex-start; z-index: 1; border-left:none; border-right:none; position:sticky; top:0;padding-left:0 !important; padding-right: 12px !important;">
        <div style="display:flex; gap:6px; position: sticky; left:0;">
          <span style="min-width: 73px; width:73px; box-sizing: content-box; display: flex;background: #1e293b; height: 40px; border-left: 1px solid #ffffff1a; border-right: 1px solid #ffffff1a;padding-left: 12px; align-items: center;">Даты</span>
        </div>
        <div class="n-title-flex">
          <div class="n-title-flex" style="display:flex; background: #1e293b; position: sticky; left: 87px; border-right:1px solid #334155;">
            <span style="width:60px; text-align:center; padding-left:6px;">Показы</span>
            <span style="width:50px; text-align:center;">Клики</span>
            <span style="width:40px; text-align:center;">CTR</span>
            <span style="width:40px; text-align:center;">CPC</span>
            <span style="width:40px; text-align:center;">CPM</span>
            <span style="width:70px; text-align:center;">Затраты</span>
          </div>
          <div class="n-title-flex" style="display:flex; background: #1e293b; left: 87px; margin-left: -12px; border-right:1px solid #334155;">
            <span style="width:55px; text-align:center;" data-tip="Количество корзин из рекламы">
              <svg style="background: #2563eb1c;box-shadow: 0 0 42px 0px #2563eb;width: 17px; fill: #2563eb" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                <path d="M1 1.75A.75.75 0 0 1 1.75 1h1.628a1.75 1.75 0 0 1 1.734 1.51L5.18 3a65.25 65.25 0 0 1 13.36 1.412.75.75 0 0 1 .58.875 48.645 48.645 0 0 1-1.618 6.2.75.75 0 0 1-.712.513H6a2.503 2.503 0 0 0-2.292 1.5H17.25a.75.75 0 0 1 0 1.5H2.76a.75.75 0 0 1-.748-.807 4.002 4.002 0 0 1 2.716-3.486L3.626 2.716a.25.25 0 0 0-.248-.216H1.75A.75.75 0 0 1 1 1.75ZM6 17.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM15.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
              </svg>
            </span>
            <span style="width:55px; text-align:center;" data-tip="Конверсия в корзину">
              <svg style="background: #2563eb1c;box-shadow: 0 0 42px 0px #2563eb;width: 17px; fill: #2563eb" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 122.88" style="enable-background:new 0 0 122.88 122.88" xml:space="preserve"><style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path class="st0" d="M61.44,0c33.93,0,61.44,27.51,61.44,61.44c0,33.93-27.51,61.44-61.44,61.44S0,95.37,0,61.44 C0,27.51,27.51,0,61.44,0L61.44,0z M70.66,34.43c3.91-8.48,12.48-3.51,9.45,2.07L52.18,88.01c-4.41,9.57-12.4,3.36-9.46-2.07 L70.66,34.43L70.66,34.43z M27.71,46.84c0-2.31,0.51-4.53,1.52-6.62c1.02-2.1,2.57-3.71,4.66-4.83c2.08-1.12,4.54-1.69,7.4-1.69 c4.19,0,7.5,1.19,9.91,3.58c2.41,2.39,3.62,5.58,3.62,9.56c0,4.02-1.2,7.22-3.62,9.61c-2.41,2.39-5.72,3.58-9.91,3.58 c-2.86,0-5.32-0.57-7.4-1.69c-2.08-1.13-3.64-2.73-4.66-4.83C28.21,51.42,27.71,49.19,27.71,46.84L27.71,46.84z M37.3,46.91 c0,2.81,0.46,4.85,1.37,6.12c0.6,0.84,1.47,1.26,2.61,1.26c1.13,0,1.98-0.43,2.57-1.26c0.89-1.27,1.37-3.3,1.37-6.12 c0-2.78-0.46-4.82-1.37-6.1c-0.57-0.81-1.44-1.23-2.57-1.23c-1.14,0-2.02,0.41-2.61,1.23C37.76,42.06,37.3,44.11,37.3,46.91 L37.3,46.91z M68.07,77.43c0-2.35,0.5-4.57,1.51-6.65c1-2.09,2.56-3.71,4.65-4.84c2.09-1.14,4.55-1.7,7.39-1.7 c4.21,0,7.53,1.2,9.95,3.61c2.42,2.4,3.62,5.6,3.62,9.59c0,3.99-1.2,7.19-3.62,9.59c-2.41,2.4-5.73,3.61-9.95,3.61 c-2.84,0-5.29-0.57-7.39-1.7c-2.09-1.13-3.64-2.76-4.65-4.84C68.58,81.99,68.07,79.77,68.07,77.43L68.07,77.43z M77.67,77.51 c0,2.82,0.46,4.88,1.37,6.15c0.57,0.81,1.44,1.23,2.58,1.23c1.13,0,2.01-0.41,2.6-1.23c0.91-1.27,1.37-3.33,1.37-6.15 c0-2.81-0.45-4.89-1.37-6.17c-0.58-0.82-1.47-1.23-2.6-1.23c-1.14,0-2,0.43-2.58,1.26C78.14,72.65,77.67,74.7,77.67,77.51 L77.67,77.51z"/></g></svg>
            </span>
            <span style="width:55px; text-align:center;" data-tip="Количество заказов из рекламы">
              <svg style="background: #d1a72417;box-shadow: 0 0 42px 0px #d1a724;width: 17px; fill: #d1a724" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                <path d="M3.105 2.288a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.897 28.897 0 0 0 15.293-7.155.75.75 0 0 0 0-1.114A28.897 28.897 0 0 0 3.105 2.288Z" />
              </svg>
            </span>
            <span style="width:55px; text-align:center;" data-tip="Конверсия в заказ">
              <svg style="background: #d1a72417;box-shadow: 0 0 42px 0px #d1a724;width: 17px; fill: #d1a724" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 122.88" style="enable-background:new 0 0 122.88 122.88" xml:space="preserve"><style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path class="st0" d="M61.44,0c33.93,0,61.44,27.51,61.44,61.44c0,33.93-27.51,61.44-61.44,61.44S0,95.37,0,61.44 C0,27.51,27.51,0,61.44,0L61.44,0z M70.66,34.43c3.91-8.48,12.48-3.51,9.45,2.07L52.18,88.01c-4.41,9.57-12.4,3.36-9.46-2.07 L70.66,34.43L70.66,34.43z M27.71,46.84c0-2.31,0.51-4.53,1.52-6.62c1.02-2.1,2.57-3.71,4.66-4.83c2.08-1.12,4.54-1.69,7.4-1.69 c4.19,0,7.5,1.19,9.91,3.58c2.41,2.39,3.62,5.58,3.62,9.56c0,4.02-1.2,7.22-3.62,9.61c-2.41,2.39-5.72,3.58-9.91,3.58 c-2.86,0-5.32-0.57-7.4-1.69c-2.08-1.13-3.64-2.73-4.66-4.83C28.21,51.42,27.71,49.19,27.71,46.84L27.71,46.84z M37.3,46.91 c0,2.81,0.46,4.85,1.37,6.12c0.6,0.84,1.47,1.26,2.61,1.26c1.13,0,1.98-0.43,2.57-1.26c0.89-1.27,1.37-3.3,1.37-6.12 c0-2.78-0.46-4.82-1.37-6.1c-0.57-0.81-1.44-1.23-2.57-1.23c-1.14,0-2.02,0.41-2.61,1.23C37.76,42.06,37.3,44.11,37.3,46.91 L37.3,46.91z M68.07,77.43c0-2.35,0.5-4.57,1.51-6.65c1-2.09,2.56-3.71,4.65-4.84c2.09-1.14,4.55-1.7,7.39-1.7 c4.21,0,7.53,1.2,9.95,3.61c2.42,2.4,3.62,5.6,3.62,9.59c0,3.99-1.2,7.19-3.62,9.59c-2.41,2.4-5.73,3.61-9.95,3.61 c-2.84,0-5.29-0.57-7.39-1.7c-2.09-1.13-3.64-2.76-4.65-4.84C68.58,81.99,68.07,79.77,68.07,77.43L68.07,77.43z M77.67,77.51 c0,2.82,0.46,4.88,1.37,6.15c0.57,0.81,1.44,1.23,2.58,1.23c1.13,0,2.01-0.41,2.6-1.23c0.91-1.27,1.37-3.33,1.37-6.15 c0-2.81-0.45-4.89-1.37-6.17c-0.58-0.82-1.47-1.23-2.6-1.23c-1.14,0-2,0.43-2.58,1.26C78.14,72.65,77.67,74.7,77.67,77.51 L77.67,77.51z"/></g></svg>
            </span>
            <span style="width:55px; text-align:center;" data-tip="Заказов на сумму">
              <svg style="background: #d1a72417;box-shadow: 0 0 42px 0px #d1a724;width: 17px; fill: #d1a724" xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 512"><path d="M256 59.55c108.5 0 196.45 87.96 196.45 196.45S364.5 452.45 256 452.45c-108.49 0-196.45-87.96-196.45-196.45S147.51 59.55 256 59.55zM256 0c70.68 0 134.69 28.66 181.02 74.98C483.34 121.31 512 185.31 512 256c0 70.69-28.66 134.7-74.98 181.02C390.7 483.34 326.69 512 256 512c-70.69 0-134.69-28.66-181.02-74.98C28.66 390.69 0 326.68 0 256c0-70.69 28.66-134.69 74.98-181.02C121.31 28.66 185.31 0 256 0zm163.28 92.72C377.49 50.94 319.76 25.09 256 25.09c-63.77 0-121.5 25.85-163.28 67.63C50.94 134.5 25.09 192.23 25.09 256c0 63.76 25.85 121.49 67.63 163.28 41.78 41.78 99.51 67.63 163.28 67.63 63.77 0 121.5-25.85 163.28-67.63 41.78-41.78 67.63-99.51 67.63-163.28 0-63.77-25.85-121.5-67.63-163.28zM283.09 293.39v31.25h-37.84v26.97h-53.72v-26.97h-21.41v-31.25h21.41v-16.82h-21.41v-31.25h21.41V160.4h83.72c21.36 0 37.83 4.76 49.36 14.28 11.48 9.53 17.27 23.64 17.27 42.42 0 19.32-6.19 34.05-18.6 44.2-12.38 10.19-30.58 15.27-54.57 15.27h-23.46v16.82h37.84zm-37.84-48.07h14.46c5.84 0 10.73-.76 14.7-2.22 3.91-1.47 7.12-3.43 9.48-5.92 2.4-2.45 4.13-5.3 5.16-8.51 1.07-3.2 1.56-6.49 1.56-9.88 0-2.89-.4-5.79-1.29-8.72-.85-2.99-2.36-5.65-4.5-8.01-2.14-2.41-5.03-4.32-8.72-5.79-3.7-1.47-8.37-2.22-14.03-2.22h-16.82v51.27z"/></svg>
            </span>
            <span style="width:55px; text-align:center;" data-tip="Количество продаж из рекламы. Рассчитывается от рекламных заказов и процента выкупа">
              <svg style="background: #22c55e14;box-shadow: 0 0 42px 0px #22c55e;width: 17px; fill: #22c55e" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                <path fill-rule="evenodd" d="M1 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4Zm12 4a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM4 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm13-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM1.75 14.5a.75.75 0 0 0 0 1.5c4.417 0 8.693.603 12.749 1.73 1.111.309 2.251-.512 2.251-1.696v-.784a.75.75 0 0 0-1.5 0v.784a.272.272 0 0 1-.35.25A49.043 49.043 0 0 0 1.75 14.5Z" clip-rule="evenodd" />
              </svg>
            </span>
            <span style="width:55px; text-align:center;" data-tip="Конверсия в продажу">
              <svg style="background: #22c55e14;box-shadow: 0 0 42px 0px #22c55e;width: 17px; fill: #22c55e" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 122.88" style="enable-background:new 0 0 122.88 122.88" xml:space="preserve"><style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path class="st0" d="M61.44,0c33.93,0,61.44,27.51,61.44,61.44c0,33.93-27.51,61.44-61.44,61.44S0,95.37,0,61.44 C0,27.51,27.51,0,61.44,0L61.44,0z M70.66,34.43c3.91-8.48,12.48-3.51,9.45,2.07L52.18,88.01c-4.41,9.57-12.4,3.36-9.46-2.07 L70.66,34.43L70.66,34.43z M27.71,46.84c0-2.31,0.51-4.53,1.52-6.62c1.02-2.1,2.57-3.71,4.66-4.83c2.08-1.12,4.54-1.69,7.4-1.69 c4.19,0,7.5,1.19,9.91,3.58c2.41,2.39,3.62,5.58,3.62,9.56c0,4.02-1.2,7.22-3.62,9.61c-2.41,2.39-5.72,3.58-9.91,3.58 c-2.86,0-5.32-0.57-7.4-1.69c-2.08-1.13-3.64-2.73-4.66-4.83C28.21,51.42,27.71,49.19,27.71,46.84L27.71,46.84z M37.3,46.91 c0,2.81,0.46,4.85,1.37,6.12c0.6,0.84,1.47,1.26,2.61,1.26c1.13,0,1.98-0.43,2.57-1.26c0.89-1.27,1.37-3.3,1.37-6.12 c0-2.78-0.46-4.82-1.37-6.1c-0.57-0.81-1.44-1.23-2.57-1.23c-1.14,0-2.02,0.41-2.61,1.23C37.76,42.06,37.3,44.11,37.3,46.91 L37.3,46.91z M68.07,77.43c0-2.35,0.5-4.57,1.51-6.65c1-2.09,2.56-3.71,4.65-4.84c2.09-1.14,4.55-1.7,7.39-1.7 c4.21,0,7.53,1.2,9.95,3.61c2.42,2.4,3.62,5.6,3.62,9.59c0,3.99-1.2,7.19-3.62,9.59c-2.41,2.4-5.73,3.61-9.95,3.61 c-2.84,0-5.29-0.57-7.39-1.7c-2.09-1.13-3.64-2.76-4.65-4.84C68.58,81.99,68.07,79.77,68.07,77.43L68.07,77.43z M77.67,77.51 c0,2.82,0.46,4.88,1.37,6.15c0.57,0.81,1.44,1.23,2.58,1.23c1.13,0,2.01-0.41,2.6-1.23c0.91-1.27,1.37-3.33,1.37-6.15 c0-2.81-0.45-4.89-1.37-6.17c-0.58-0.82-1.47-1.23-2.6-1.23c-1.14,0-2,0.43-2.58,1.26C78.14,72.65,77.67,74.7,77.67,77.51 L77.67,77.51z"/></g></svg>
            </span>
            <span style="width:55px; text-align:center;" data-tip="Потенциальных продаж на сумму">
              <svg style="background: #22c55e14;box-shadow: 0 0 42px 0px #22c55e;width: 17px; fill: #22c55e" xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 512"><path d="M256 59.55c108.5 0 196.45 87.96 196.45 196.45S364.5 452.45 256 452.45c-108.49 0-196.45-87.96-196.45-196.45S147.51 59.55 256 59.55zM256 0c70.68 0 134.69 28.66 181.02 74.98C483.34 121.31 512 185.31 512 256c0 70.69-28.66 134.7-74.98 181.02C390.7 483.34 326.69 512 256 512c-70.69 0-134.69-28.66-181.02-74.98C28.66 390.69 0 326.68 0 256c0-70.69 28.66-134.69 74.98-181.02C121.31 28.66 185.31 0 256 0zm163.28 92.72C377.49 50.94 319.76 25.09 256 25.09c-63.77 0-121.5 25.85-163.28 67.63C50.94 134.5 25.09 192.23 25.09 256c0 63.76 25.85 121.49 67.63 163.28 41.78 41.78 99.51 67.63 163.28 67.63 63.77 0 121.5-25.85 163.28-67.63 41.78-41.78 67.63-99.51 67.63-163.28 0-63.77-25.85-121.5-67.63-163.28zM283.09 293.39v31.25h-37.84v26.97h-53.72v-26.97h-21.41v-31.25h21.41v-16.82h-21.41v-31.25h21.41V160.4h83.72c21.36 0 37.83 4.76 49.36 14.28 11.48 9.53 17.27 23.64 17.27 42.42 0 19.32-6.19 34.05-18.6 44.2-12.38 10.19-30.58 15.27-54.57 15.27h-23.46v16.82h37.84zm-37.84-48.07h14.46c5.84 0 10.73-.76 14.7-2.22 3.91-1.47 7.12-3.43 9.48-5.92 2.4-2.45 4.13-5.3 5.16-8.51 1.07-3.2 1.56-6.49 1.56-9.88 0-2.89-.4-5.79-1.29-8.72-.85-2.99-2.36-5.65-4.5-8.01-2.14-2.41-5.03-4.32-8.72-5.79-3.7-1.47-8.37-2.22-14.03-2.22h-16.82v51.27z"/></svg>
            </span>
          </div>
          <div class="n-title-flex" style="display:flex; background: #1e293b; left: 87px; border-right:1px solid #334155;">
            <span style="width:70px; text-align:center;">Кликов % <span class="n-wtf" data-tip="Процент рекламных переходов от общего количества открытий карточки">?</span></span>
            <span style="width:70px; text-align:center;">Позиция <span class="n-wtf" data-tip="Средняя позиция товара по данным из детальной статистики WB">?</span></span>
            <span style="width:70px; text-align:center;">CPO</span>
            <span style="width:70px; text-align:center;">CPS</span>
            <span style="width:60px; text-align:center;"><small>o</small>ER <span class="n-wtf" data-tip="Доля рекламных расходов относительно заказов">?</span></span>
            <span style="width:60px; text-align:center;">ER <span class="n-wtf" data-tip="Доля рекламных расходов относительно продаж">?</span></span>
          </div>
          <div class="n-title-flex" style="display:flex; background: #1e293b; left: 87px; margin-left: -12px; border-right:1px solid #334155;">
            <span style="width:55px; text-align:center;" data-tip="Добавили в Отложенные">
              <svg style="background: #eb25761c;box-shadow: 0 0 42px 0px #eb2576;width: 20px;fill: #eb2576; margin-left:2px; margin-top: 1px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
                <path d="m9.653 16.915-.005-.003-.019-.01a20.759 20.759 0 0 1-1.162-.682 22.045 22.045 0 0 1-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 0 1 8-2.828A4.5 4.5 0 0 1 18 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 0 1-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 0 1-.69.001l-.002-.001Z" />
              </svg>
            </span>
            <span style="width:55px; text-align:center; margin-left:-12px;" data-tip="Количество корзин">
              <svg style="background: #2563eb1c;box-shadow: 0 0 42px 0px #2563eb;width: 17px; fill: #2563eb" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                <path d="M1 1.75A.75.75 0 0 1 1.75 1h1.628a1.75 1.75 0 0 1 1.734 1.51L5.18 3a65.25 65.25 0 0 1 13.36 1.412.75.75 0 0 1 .58.875 48.645 48.645 0 0 1-1.618 6.2.75.75 0 0 1-.712.513H6a2.503 2.503 0 0 0-2.292 1.5H17.25a.75.75 0 0 1 0 1.5H2.76a.75.75 0 0 1-.748-.807 4.002 4.002 0 0 1 2.716-3.486L3.626 2.716a.25.25 0 0 0-.248-.216H1.75A.75.75 0 0 1 1 1.75ZM6 17.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM15.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
              </svg>
            </span>
            <span style="width:55px; text-align:center;" data-tip="Конверсия в корзину">
              <svg style="background: #2563eb1c;box-shadow: 0 0 42px 0px #2563eb;width: 17px; fill: #2563eb" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 122.88" style="enable-background:new 0 0 122.88 122.88" xml:space="preserve"><style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path class="st0" d="M61.44,0c33.93,0,61.44,27.51,61.44,61.44c0,33.93-27.51,61.44-61.44,61.44S0,95.37,0,61.44 C0,27.51,27.51,0,61.44,0L61.44,0z M70.66,34.43c3.91-8.48,12.48-3.51,9.45,2.07L52.18,88.01c-4.41,9.57-12.4,3.36-9.46-2.07 L70.66,34.43L70.66,34.43z M27.71,46.84c0-2.31,0.51-4.53,1.52-6.62c1.02-2.1,2.57-3.71,4.66-4.83c2.08-1.12,4.54-1.69,7.4-1.69 c4.19,0,7.5,1.19,9.91,3.58c2.41,2.39,3.62,5.58,3.62,9.56c0,4.02-1.2,7.22-3.62,9.61c-2.41,2.39-5.72,3.58-9.91,3.58 c-2.86,0-5.32-0.57-7.4-1.69c-2.08-1.13-3.64-2.73-4.66-4.83C28.21,51.42,27.71,49.19,27.71,46.84L27.71,46.84z M37.3,46.91 c0,2.81,0.46,4.85,1.37,6.12c0.6,0.84,1.47,1.26,2.61,1.26c1.13,0,1.98-0.43,2.57-1.26c0.89-1.27,1.37-3.3,1.37-6.12 c0-2.78-0.46-4.82-1.37-6.1c-0.57-0.81-1.44-1.23-2.57-1.23c-1.14,0-2.02,0.41-2.61,1.23C37.76,42.06,37.3,44.11,37.3,46.91 L37.3,46.91z M68.07,77.43c0-2.35,0.5-4.57,1.51-6.65c1-2.09,2.56-3.71,4.65-4.84c2.09-1.14,4.55-1.7,7.39-1.7 c4.21,0,7.53,1.2,9.95,3.61c2.42,2.4,3.62,5.6,3.62,9.59c0,3.99-1.2,7.19-3.62,9.59c-2.41,2.4-5.73,3.61-9.95,3.61 c-2.84,0-5.29-0.57-7.39-1.7c-2.09-1.13-3.64-2.76-4.65-4.84C68.58,81.99,68.07,79.77,68.07,77.43L68.07,77.43z M77.67,77.51 c0,2.82,0.46,4.88,1.37,6.15c0.57,0.81,1.44,1.23,2.58,1.23c1.13,0,2.01-0.41,2.6-1.23c0.91-1.27,1.37-3.33,1.37-6.15 c0-2.81-0.45-4.89-1.37-6.17c-0.58-0.82-1.47-1.23-2.6-1.23c-1.14,0-2,0.43-2.58,1.26C78.14,72.65,77.67,74.7,77.67,77.51 L77.67,77.51z"/></g></svg>
            </span>
            <span style="width:55px; text-align:center;" data-tip="Количество заказов">
              <svg style="background: #d1a72417;box-shadow: 0 0 42px 0px #d1a724;width: 17px; fill: #d1a724" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                <path d="M3.105 2.288a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.897 28.897 0 0 0 15.293-7.155.75.75 0 0 0 0-1.114A28.897 28.897 0 0 0 3.105 2.288Z" />
              </svg>
            </span>
            <span style="width:55px; text-align:center;" data-tip="Конверсия в заказ">
              <svg style="background: #d1a72417;box-shadow: 0 0 42px 0px #d1a724;width: 17px; fill: #d1a724" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 122.88" style="enable-background:new 0 0 122.88 122.88" xml:space="preserve"><style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path class="st0" d="M61.44,0c33.93,0,61.44,27.51,61.44,61.44c0,33.93-27.51,61.44-61.44,61.44S0,95.37,0,61.44 C0,27.51,27.51,0,61.44,0L61.44,0z M70.66,34.43c3.91-8.48,12.48-3.51,9.45,2.07L52.18,88.01c-4.41,9.57-12.4,3.36-9.46-2.07 L70.66,34.43L70.66,34.43z M27.71,46.84c0-2.31,0.51-4.53,1.52-6.62c1.02-2.1,2.57-3.71,4.66-4.83c2.08-1.12,4.54-1.69,7.4-1.69 c4.19,0,7.5,1.19,9.91,3.58c2.41,2.39,3.62,5.58,3.62,9.56c0,4.02-1.2,7.22-3.62,9.61c-2.41,2.39-5.72,3.58-9.91,3.58 c-2.86,0-5.32-0.57-7.4-1.69c-2.08-1.13-3.64-2.73-4.66-4.83C28.21,51.42,27.71,49.19,27.71,46.84L27.71,46.84z M37.3,46.91 c0,2.81,0.46,4.85,1.37,6.12c0.6,0.84,1.47,1.26,2.61,1.26c1.13,0,1.98-0.43,2.57-1.26c0.89-1.27,1.37-3.3,1.37-6.12 c0-2.78-0.46-4.82-1.37-6.1c-0.57-0.81-1.44-1.23-2.57-1.23c-1.14,0-2.02,0.41-2.61,1.23C37.76,42.06,37.3,44.11,37.3,46.91 L37.3,46.91z M68.07,77.43c0-2.35,0.5-4.57,1.51-6.65c1-2.09,2.56-3.71,4.65-4.84c2.09-1.14,4.55-1.7,7.39-1.7 c4.21,0,7.53,1.2,9.95,3.61c2.42,2.4,3.62,5.6,3.62,9.59c0,3.99-1.2,7.19-3.62,9.59c-2.41,2.4-5.73,3.61-9.95,3.61 c-2.84,0-5.29-0.57-7.39-1.7c-2.09-1.13-3.64-2.76-4.65-4.84C68.58,81.99,68.07,79.77,68.07,77.43L68.07,77.43z M77.67,77.51 c0,2.82,0.46,4.88,1.37,6.15c0.57,0.81,1.44,1.23,2.58,1.23c1.13,0,2.01-0.41,2.6-1.23c0.91-1.27,1.37-3.33,1.37-6.15 c0-2.81-0.45-4.89-1.37-6.17c-0.58-0.82-1.47-1.23-2.6-1.23c-1.14,0-2,0.43-2.58,1.26C78.14,72.65,77.67,74.7,77.67,77.51 L77.67,77.51z"/></g></svg>
            </span>
            <span style="width:55px; text-align:center;" data-tip="Заказов на сумму">
              <svg style="background: #d1a72417;box-shadow: 0 0 42px 0px #d1a724;width: 17px; fill: #d1a724" xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 512"><path d="M256 59.55c108.5 0 196.45 87.96 196.45 196.45S364.5 452.45 256 452.45c-108.49 0-196.45-87.96-196.45-196.45S147.51 59.55 256 59.55zM256 0c70.68 0 134.69 28.66 181.02 74.98C483.34 121.31 512 185.31 512 256c0 70.69-28.66 134.7-74.98 181.02C390.7 483.34 326.69 512 256 512c-70.69 0-134.69-28.66-181.02-74.98C28.66 390.69 0 326.68 0 256c0-70.69 28.66-134.69 74.98-181.02C121.31 28.66 185.31 0 256 0zm163.28 92.72C377.49 50.94 319.76 25.09 256 25.09c-63.77 0-121.5 25.85-163.28 67.63C50.94 134.5 25.09 192.23 25.09 256c0 63.76 25.85 121.49 67.63 163.28 41.78 41.78 99.51 67.63 163.28 67.63 63.77 0 121.5-25.85 163.28-67.63 41.78-41.78 67.63-99.51 67.63-163.28 0-63.77-25.85-121.5-67.63-163.28zM283.09 293.39v31.25h-37.84v26.97h-53.72v-26.97h-21.41v-31.25h21.41v-16.82h-21.41v-31.25h21.41V160.4h83.72c21.36 0 37.83 4.76 49.36 14.28 11.48 9.53 17.27 23.64 17.27 42.42 0 19.32-6.19 34.05-18.6 44.2-12.38 10.19-30.58 15.27-54.57 15.27h-23.46v16.82h37.84zm-37.84-48.07h14.46c5.84 0 10.73-.76 14.7-2.22 3.91-1.47 7.12-3.43 9.48-5.92 2.4-2.45 4.13-5.3 5.16-8.51 1.07-3.2 1.56-6.49 1.56-9.88 0-2.89-.4-5.79-1.29-8.72-.85-2.99-2.36-5.65-4.5-8.01-2.14-2.41-5.03-4.32-8.72-5.79-3.7-1.47-8.37-2.22-14.03-2.22h-16.82v51.27z"/></svg>
            </span>
            <span style="width:55px; text-align:center;" data-tip="Количество продаж">
              <svg style="background: #22c55e14;box-shadow: 0 0 42px 0px #22c55e;width: 17px; fill: #22c55e" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                <path fill-rule="evenodd" d="M1 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4Zm12 4a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM4 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm13-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM1.75 14.5a.75.75 0 0 0 0 1.5c4.417 0 8.693.603 12.749 1.73 1.111.309 2.251-.512 2.251-1.696v-.784a.75.75 0 0 0-1.5 0v.784a.272.272 0 0 1-.35.25A49.043 49.043 0 0 0 1.75 14.5Z" clip-rule="evenodd" />
              </svg>
            </span>
            <span style="width:55px; text-align:center;" data-tip="Конверсия в продажу">
              <svg style="background: #22c55e14;box-shadow: 0 0 42px 0px #22c55e;width: 17px; fill: #22c55e" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 122.88" style="enable-background:new 0 0 122.88 122.88" xml:space="preserve"><style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path class="st0" d="M61.44,0c33.93,0,61.44,27.51,61.44,61.44c0,33.93-27.51,61.44-61.44,61.44S0,95.37,0,61.44 C0,27.51,27.51,0,61.44,0L61.44,0z M70.66,34.43c3.91-8.48,12.48-3.51,9.45,2.07L52.18,88.01c-4.41,9.57-12.4,3.36-9.46-2.07 L70.66,34.43L70.66,34.43z M27.71,46.84c0-2.31,0.51-4.53,1.52-6.62c1.02-2.1,2.57-3.71,4.66-4.83c2.08-1.12,4.54-1.69,7.4-1.69 c4.19,0,7.5,1.19,9.91,3.58c2.41,2.39,3.62,5.58,3.62,9.56c0,4.02-1.2,7.22-3.62,9.61c-2.41,2.39-5.72,3.58-9.91,3.58 c-2.86,0-5.32-0.57-7.4-1.69c-2.08-1.13-3.64-2.73-4.66-4.83C28.21,51.42,27.71,49.19,27.71,46.84L27.71,46.84z M37.3,46.91 c0,2.81,0.46,4.85,1.37,6.12c0.6,0.84,1.47,1.26,2.61,1.26c1.13,0,1.98-0.43,2.57-1.26c0.89-1.27,1.37-3.3,1.37-6.12 c0-2.78-0.46-4.82-1.37-6.1c-0.57-0.81-1.44-1.23-2.57-1.23c-1.14,0-2.02,0.41-2.61,1.23C37.76,42.06,37.3,44.11,37.3,46.91 L37.3,46.91z M68.07,77.43c0-2.35,0.5-4.57,1.51-6.65c1-2.09,2.56-3.71,4.65-4.84c2.09-1.14,4.55-1.7,7.39-1.7 c4.21,0,7.53,1.2,9.95,3.61c2.42,2.4,3.62,5.6,3.62,9.59c0,3.99-1.2,7.19-3.62,9.59c-2.41,2.4-5.73,3.61-9.95,3.61 c-2.84,0-5.29-0.57-7.39-1.7c-2.09-1.13-3.64-2.76-4.65-4.84C68.58,81.99,68.07,79.77,68.07,77.43L68.07,77.43z M77.67,77.51 c0,2.82,0.46,4.88,1.37,6.15c0.57,0.81,1.44,1.23,2.58,1.23c1.13,0,2.01-0.41,2.6-1.23c0.91-1.27,1.37-3.33,1.37-6.15 c0-2.81-0.45-4.89-1.37-6.17c-0.58-0.82-1.47-1.23-2.6-1.23c-1.14,0-2,0.43-2.58,1.26C78.14,72.65,77.67,74.7,77.67,77.51 L77.67,77.51z"/></g></svg>
            </span>
            <span style="width:55px; text-align:center;" data-tip="Продаж на сумму">
              <svg style="background: #22c55e14;box-shadow: 0 0 42px 0px #22c55e;width: 17px; fill: #22c55e" xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 512"><path d="M256 59.55c108.5 0 196.45 87.96 196.45 196.45S364.5 452.45 256 452.45c-108.49 0-196.45-87.96-196.45-196.45S147.51 59.55 256 59.55zM256 0c70.68 0 134.69 28.66 181.02 74.98C483.34 121.31 512 185.31 512 256c0 70.69-28.66 134.7-74.98 181.02C390.7 483.34 326.69 512 256 512c-70.69 0-134.69-28.66-181.02-74.98C28.66 390.69 0 326.68 0 256c0-70.69 28.66-134.69 74.98-181.02C121.31 28.66 185.31 0 256 0zm163.28 92.72C377.49 50.94 319.76 25.09 256 25.09c-63.77 0-121.5 25.85-163.28 67.63C50.94 134.5 25.09 192.23 25.09 256c0 63.76 25.85 121.49 67.63 163.28 41.78 41.78 99.51 67.63 163.28 67.63 63.77 0 121.5-25.85 163.28-67.63 41.78-41.78 67.63-99.51 67.63-163.28 0-63.77-25.85-121.5-67.63-163.28zM283.09 293.39v31.25h-37.84v26.97h-53.72v-26.97h-21.41v-31.25h21.41v-16.82h-21.41v-31.25h21.41V160.4h83.72c21.36 0 37.83 4.76 49.36 14.28 11.48 9.53 17.27 23.64 17.27 42.42 0 19.32-6.19 34.05-18.6 44.2-12.38 10.19-30.58 15.27-54.57 15.27h-23.46v16.82h37.84zm-37.84-48.07h14.46c5.84 0 10.73-.76 14.7-2.22 3.91-1.47 7.12-3.43 9.48-5.92 2.4-2.45 4.13-5.3 5.16-8.51 1.07-3.2 1.56-6.49 1.56-9.88 0-2.89-.4-5.79-1.29-8.72-.85-2.99-2.36-5.65-4.5-8.01-2.14-2.41-5.03-4.32-8.72-5.79-3.7-1.47-8.37-2.22-14.03-2.22h-16.82v51.27z"/></svg>
            </span>
          </div>
          <div class="n-title-flex" style="display:flex; background: #1e293b; left: 87px; border-right:1px solid #334155;">
            <span style="width:70px; text-align:center;">Цена <span class="n-wtf" data-tip="Средняя цена товара без СПП">?</span></span>
            <span style="width:75px; text-align:center;">Открытий <span class="n-wtf" data-tip="Общее число переходов в карточку товара из органики и рекламы">?</span></span>
            <span style="width:70px; text-align:center;">Σ CPO</span>
            <span style="width:70px; text-align:center;">Σ CPS</span>
            <span style="width:60px; text-align:center;">Σ <small>o</small>ER <span class="n-wtf" data-tip="Доля рекламных расходов относительно заказов">?</span></span>
            <span style="width:60px; text-align:center;">Σ ER <span class="n-wtf" data-tip="Доля рекламных расходов относительно продаж">?</span></span>
          </div>
          <div class="n-title-flex" style="display:flex; background: #1e293b; left: 87px; border-right:1px solid #334155;">
            <span style="width:60px; text-align:center; padding-left:6px;">Показы</span>
            <span style="width:50px; text-align:center;">Клики</span>
            <span style="width:40px; text-align:center;">CTR</span>
            <span style="width:40px; text-align:center;">CPC</span>
            <span style="width:40px; text-align:center;">CPM</span>
            <span style="width:70px; text-align:center;">Затраты</span>
          </div>
          <div class="n-title-flex" style="display:flex; background: #1e293b; left: 87px; border-right:1px solid #334155;">
            <span style="width:60px; text-align:center; padding-left:6px;">Показы</span>
            <span style="width:50px; text-align:center;">Клики</span>
            <span style="width:50px; text-align:center;">Доля <span class="n-wtf" data-tip="Доля показов в каталоге относительно общего числа показов">?</span></span>
            <span style="width:40px; text-align:center;">CTR</span>
            <span style="width:40px; text-align:center;">CPC</span>
            <span style="width:40px; text-align:center;">CPM</span>
            <span style="width:70px; text-align:center;">Затраты</span>
          </div>
          <div class="n-title-flex" style="display:flex; background: #1e293b; left: 87px; border-right:1px solid #334155;">
            <span style="width:60px; text-align:center; padding-left:6px;">Показы</span>
            <span style="width:50px; text-align:center;">Клики</span>
            <span style="width:50px; text-align:center;">Доля <span class="n-wtf" data-tip="Доля показов в рекомендательных полках относительно общего числа показов">?</span></span>
            <span style="width:40px; text-align:center;">CTR</span>
            <span style="width:40px; text-align:center;">CPC</span>
            <span style="width:40px; text-align:center;">CPM</span>
            <span style="width:70px; text-align:center;">Затраты</span>
          </div>
        </div>
      </div>
    `;

      const result = [TABLE_HEADER];

      const renderTemplate = (date, stats, dateIndex) => {
        const splittedDate = date.split("-");
        const formattedDate = `${splittedDate[2]}.${splittedDate[1]}.${splittedDate[0]}`;
        const nextStats =
          dateIndex + 1 < dates.length
            ? this.datesCalculatedStats[dates[dateIndex + 1][0]]
            : null;
        const { catalog, search, shelf, totals, ...rest } = stats;

        const comparison = {
          totals: {
            views: nextStats ? nextStats.totals.views - totals.views || 0 : 0,
            clicks: nextStats
              ? nextStats.totals.clicks - totals.clicks || 0
              : 0,
            ctr: nextStats ? nextStats.totals.ctr - totals.ctr || 0 : 0,
            cpc: nextStats ? nextStats.totals.cpc - totals.cpc || 0 : 0,
            cpm: nextStats ? nextStats.totals.cpm - totals.cpm || 0 : 0,
            avgBoost: nextStats
              ? nextStats.totals.avgBoost - totals.avgBoost || 0
              : 0,
          },
          search: {
            views: nextStats ? nextStats.search.views - search.views || 0 : 0,
            clicks: nextStats
              ? nextStats.search.clicks - search.clicks || 0
              : 0,
            ctr: nextStats ? nextStats.search.ctr - search.ctr || 0 : 0,
            cpc: nextStats ? nextStats.search.cpc - search.cpc || 0 : 0,
            cpm: nextStats ? nextStats.search.cpm - search.cpm || 0 : 0,
          },
          shelf: {
            views: nextStats ? nextStats.shelf.views - shelf.views || 0 : 0,
            clicks: nextStats ? nextStats.shelf.clicks - shelf.clicks || 0 : 0,
            ctr: nextStats ? nextStats.shelf.ctr - shelf.ctr || 0 : 0,
            cpc: nextStats ? nextStats.shelf.cpc - shelf.cpc || 0 : 0,
            cpm: nextStats ? nextStats.shelf.cpm - shelf.cpm || 0 : 0,
          },
          catalog: {
            views: nextStats ? nextStats.catalog.views - catalog.views || 0 : 0,
            clicks: nextStats
              ? nextStats.catalog.clicks - catalog.clicks || 0
              : 0,
            ctr: nextStats ? nextStats.catalog.ctr - catalog.ctr || 0 : 0,
            cpc: nextStats ? nextStats.catalog.cpc - catalog.cpc || 0 : 0,
            cpm: nextStats ? nextStats.catalog.cpm - catalog.cpm || 0 : 0,
          },
        };

        const arrowUpSVG = `
      <svg xmlns="http://www.w3.org/2000/svg" style="margin-right: -10px;stroke-width: 1px; stroke: #22c55e; width: 10px;" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
      </svg>
      `;
        const arrowDownSVG = `
      <svg xmlns="http://www.w3.org/2000/svg"style="margin-right: -10px; margin-top: 4px; stroke-width: 1px; stroke: red; width: 10px; bottom: 0px;" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 4.5 15 15m0 0V8.25m0 11.25H8.25" />
      </svg>
      `;

        const arrowUpBadSVG = `
      <svg xmlns="http://www.w3.org/2000/svg" style="margin-right: -10px;stroke-width: 1px; stroke: red; width: 10px;" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
      </svg>
      `;
        const arrowDownGoodSVG = `
      <svg xmlns="http://www.w3.org/2000/svg"style="margin-right: -10px; margin-top: 4px; stroke-width: 1px; stroke: #22c55e; width: 10px; bottom: 0px;" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 4.5 15 15m0 0V8.25m0 11.25H8.25" />
      </svg>
      `;

        return `
            <div class="n-kw-list-item n-no-left-border" style="justify-content: flex-start; padding-left: 0 !important; gap:0;">
                <span class="n-date-cell" data-date="'${date}">${formattedDate}</span>
                <div style="display:flex; gap:12px; height:100%;">
                  <div class="n-fixed-cell">
                    <span class="n-count" style="width:60px;padding-left:6px; justify-content:center; min-width:60px; white-space: nowrap;">${numberWithSpaces(
          numberWithSpaces(totals.views)
        )} 
                    ${comparison.totals.views > 0
            ? `<span style="height:15px;">${arrowDownSVG}</span>`
            : ""
          }
                    ${comparison.totals.views < 0
            ? `<span style="height:15px;">${arrowUpSVG}</span>`
            : ""
          }
                    </span>
                    <span class="n-count" style="width:50px; min-width:50px; justify-content:center;">${numberWithSpaces(
            numberWithSpaces(totals.clicks)
          )}
                    ${comparison.totals.clicks > 0
            ? `<span style="height:15px;">${arrowDownSVG}</span>`
            : ""
          }
                    ${comparison.totals.clicks < 0
            ? `<span style="height:15px;">${arrowUpSVG}</span>`
            : ""
          }</span>
                    <span class="n-count" style="width:40px; min-width:40px; justify-content:center;">${totals.ctr
          }%
                    ${comparison.totals.ctr > 0
            ? `<span style="height:15px;">${arrowDownSVG}</span>`
            : ""
          }
                    ${comparison.totals.ctr < 0
            ? `<span style="height:15px;">${arrowUpSVG}</span>`
            : ""
          }</span>
                    <span class="n-count" style="width:40px; min-width:40px; justify-content:center;">${totals.cpc
          }₽
                    ${comparison.totals.cpc > 0
            ? `<span style="height:15px;">${arrowDownGoodSVG}</span>`
            : ""
          }
                    ${comparison.totals.cpc < 0
            ? `<span style="height:15px;">${arrowUpBadSVG}</span>`
            : ""
          }</span>
                    <span class="n-count" style="width:40px; min-width:40px; justify-content:center;">${numberWithSpaces(
            totals.cpm
          )}₽
                    ${comparison.totals.cpm > 0
            ? `<span style="height:15px;">${arrowDownGoodSVG}</span>`
            : ""
          }
                    ${comparison.totals.cpm < 0
            ? `<span style="height:15px;">${arrowUpBadSVG}</span>`
            : ""
          }</span>
                    <span class="n-count" style="width:70px; min-width:70px; justify-content:center; border-right:1px solid #334155;">${numberWithSpaces(
            numberWithSpaces(totals.money)
          )}₽</span>
                  </div>
                  <div style="display:flex; margin-left: -12px; gap:12px; height:100%; background: #2563eb15">
                    <span class="n-count" style="width:55px; min-width:55px; justify-content: center;">${numberWithSpaces(
            rest.addToCartWithAdRate
          )}</span>
                    <span class="n-count" style="width:55px; min-width:55px; justify-content: center; padding-right:6px;">${rest.addToCartConversionRealTime
          }%</span>             
                  </div>
                  <div style="display:flex; margin-left: -12px; padding-left:6px; gap:12px; height:100%; background: #eab30815">
                    <span class="n-count" style="width:55px; min-width:55px; justify-content: center;">${numberWithSpaces(
            rest.ordersWithAdRate
          )}</span>
                    <span class="n-count" style="width:55px; min-width:55px; justify-content: center;">${rest.ordersConversionRealTime
          }%</span>
                    <span class="n-count" style="width:55px; min-width:55px; justify-content: center; padding-right:6px;">${numberWithSpaces(
            rest.ordersSumWithAdRate
          )}₽</span>
                    </div>
                  <div style="display:flex; margin-left: -12px; padding-left:6px; gap:12px; height:100%; background: #22c55e15">
                    <span class="n-count" style="width:55px; min-width:55px; justify-content: center;">${numberWithSpaces(
            rest.salesWithAdRate
          )}</span>
                    <span class="n-count" style="width:55px; min-width:55px; justify-content: center;">${rest.buyOutPercent
          }%</span>
                    <span class="n-count" style="width:55px; min-width:55px; justify-content: center; border-right:1px solid #334155;">${numberWithSpaces(
            rest.salesSumWithAdRate
          )}₽</span> 
                  </div>
                  <span class="n-count" style="width:70px; min-width:70px; justify-content:center;">${rest.adClicksRate
          }%</span>
                  <span class="n-count" style="width:70px; min-width:70px; justify-content:center;">${numberWithSpaces(
            totals?.avgBoost || 0
          )}
                  ${comparison.totals.avgBoost > 0
            ? `<span style="height:15px;">${arrowDownGoodSVG}</span>`
            : ""
          }
                  ${comparison.totals.avgBoost < 0
            ? `<span style="height:15px;">${arrowUpBadSVG}</span>`
            : ""
          }</span>
                  <span class="n-count" style="width:70px; min-width:70px; justify-content:center;">${numberWithSpaces(
            numberWithSpaces(rest.cpo)
          )}₽</span>
                  <span class="n-count" style="width:70px; min-width:70px; justify-content:center;">${numberWithSpaces(
            rest.cps
          )}₽</span>
                  <span class="n-count" style="width:60px; min-width:40px; justify-content:center;">${rest.ero
          }%</span>
                  <span class="n-count" style="width:60px; min-width:40px; justify-content:center; border-right:1px solid #334155;">${numberWithSpaces(
            rest.er
          )}%</span>
                  
                  <div style="display:flex; margin-left: -12px; gap:12px; height:100%; background: #eb257615">
                    <span class="n-count" style="width:55px; min-width:55px; justify-content: center;">${numberWithSpaces(
            rest.wishList
          )}</span></div>

                  <div style="display:flex; margin-left: -12px; gap:12px; height:100%; background: #2563eb15">
                    <span class="n-count" style="width:55px; min-width:55px; justify-content: center;">${numberWithSpaces(
            rest.addToCart
          )}</span>
                    <span class="n-count" style="width:55px; min-width:55px; justify-content: center; padding-right:6px;">${rest.addToCartConversion
          }%</span>             
                  </div>
                  <div style="display:flex; margin-left: -12px; padding-left:6px; gap:12px; height:100%; background: #eab30815">
                    <span class="n-count" style="width:55px; min-width:55px; justify-content: center;">${numberWithSpaces(
            rest.orders
          )}</span>
                    <span class="n-count" style="width:55px; min-width:55px; justify-content: center;">${rest.ordersConversion
          }%</span>
                    <span class="n-count" style="width:55px; min-width:55px; justify-content: center; padding-right:6px;">${numberWithSpaces(
            rest.ordersSum
          )}₽</span>
                    </div>
                  <div style="display:flex; margin-left: -12px; padding-left:6px; gap:12px; height:100%; background: #22c55e15">
                    <span class="n-count" style="width:55px; min-width:55px; justify-content: center;">${numberWithSpaces(
            rest.sales
          )}</span>
                    <span class="n-count" style="width:55px; min-width:55px; justify-content: center;">${rest.buyOutPercent
          }%</span>
                    <span class="n-count" style="width:55px; min-width:55px; justify-content: center; border-right:1px solid #334155;">${numberWithSpaces(
            rest.salesSum
          )}₽</span> 
                  </div>
                  <span class="n-count" style="width:70px; min-width:70px; justify-content:center;">${numberWithSpaces(
            numberWithSpaces(rest.priceNoSpp)
          )}₽</span>
                  <span class="n-count" style="width:75px; min-width:75px; justify-content:center;">${numberWithSpaces(
            numberWithSpaces(rest.openCard)
          )}</span>
                  <span class="n-count" style="width:70px; min-width:70px; justify-content:center;">${numberWithSpaces(
            numberWithSpaces(rest.eCpo)
          )}₽</span>
                  <span class="n-count" style="width:70px; min-width:70px; justify-content:center;">${numberWithSpaces(
            rest.eCps
          )}₽</span>
                  <span class="n-count" style="width:60px; min-width:40px; justify-content:center;">${rest.eEro
          }%</span>
                  <span class="n-count" style="width:60px; min-width:40px; justify-content:center; border-right:1px solid #334155;">${numberWithSpaces(
            rest.eEr
          )}%</span>
                  <span class="n-count" style="width:60px;padding-left:6px; justify-content:center; min-width:60px; white-space: nowrap;">${numberWithSpaces(
            numberWithSpaces(search.views)
          )} 
                  ${comparison.search.views > 0
            ? `<span style="height:15px;">${arrowDownSVG}</span>`
            : ""
          }
                  ${comparison.search.views < 0
            ? `<span style="height:15px;">${arrowUpSVG}</span>`
            : ""
          }
                  </span>
                  <span class="n-count" style="width:50px; min-width:50px; justify-content:center;">${numberWithSpaces(
            numberWithSpaces(search.clicks)
          )}
                  ${comparison.search.clicks > 0
            ? `<span style="height:15px;">${arrowDownSVG}</span>`
            : ""
          }
                  ${comparison.search.clicks < 0
            ? `<span style="height:15px;">${arrowUpSVG}</span>`
            : ""
          }</span>
                  <span class="n-count" style="width:40px; min-width:40px; justify-content:center;">${search.ctr
          }%
                  ${comparison.search.ctr > 0
            ? `<span style="height:15px;">${arrowDownSVG}</span>`
            : ""
          }
                  ${comparison.search.ctr < 0
            ? `<span style="height:15px;">${arrowUpSVG}</span>`
            : ""
          }</span>
                  <span class="n-count" style="width:40px; min-width:40px; justify-content:center;">${search.cpc
          }₽
                  ${comparison.search.cpc > 0
            ? `<span style="height:15px;">${arrowDownGoodSVG}</span>`
            : ""
          }
                  ${comparison.search.cpc < 0
            ? `<span style="height:15px;">${arrowUpBadSVG}</span>`
            : ""
          }</span>
                  <span class="n-count" style="width:40px; min-width:40px; justify-content:center;">${numberWithSpaces(
            search.cpm
          )}₽
                  ${comparison.search.cpm > 0
            ? `<span style="height:15px;">${arrowDownGoodSVG}</span>`
            : ""
          }
                  ${comparison.search.cpm < 0
            ? `<span style="height:15px;">${arrowUpBadSVG}</span>`
            : ""
          }</span>
                  <span class="n-count" style="width:70px; min-width:70px; justify-content:center; border-right:1px solid #334155;">${numberWithSpaces(
            numberWithSpaces(search.money)
          )}₽</span>
                  <span class="n-count" style="width:60px;padding-left:6px; justify-content:center; min-width:60px; white-space: nowrap;">${numberWithSpaces(
            numberWithSpaces(catalog.views)
          )} 
                  ${comparison.catalog.views > 0
            ? `<span style="height:15px;">${arrowDownSVG}</span>`
            : ""
          }
                  ${comparison.catalog.views < 0
            ? `<span style="height:15px;">${arrowUpSVG}</span>`
            : ""
          }
                  </span>
                  <span class="n-count" style="width:50px; min-width:50px; justify-content:center;">${numberWithSpaces(
            numberWithSpaces(catalog.clicks)
          )}
                  ${comparison.catalog.clicks > 0
            ? `<span style="height:15px;">${arrowDownSVG}</span>`
            : ""
          }
                  ${comparison.catalog.clicks < 0
            ? `<span style="height:15px;">${arrowUpSVG}</span>`
            : ""
          }</span>
                  <span class="n-count" style="width:50px; min-width:50px; justify-content:center;">${catalog.percent
          }%</span>
                  <span class="n-count" style="width:40px; min-width:40px; justify-content:center;">${catalog.ctr
          }%
                  ${comparison.catalog.ctr > 0
            ? `<span style="height:15px;">${arrowDownSVG}</span>`
            : ""
          }
                  ${comparison.catalog.ctr < 0
            ? `<span style="height:15px;">${arrowUpSVG}</span>`
            : ""
          }</span>
                  <span class="n-count" style="width:40px; min-width:40px; justify-content:center;">${catalog.cpc
          }₽
                  ${comparison.catalog.cpc > 0
            ? `<span style="height:15px;">${arrowDownGoodSVG}</span>`
            : ""
          }
                  ${comparison.catalog.cpc < 0
            ? `<span style="height:15px;">${arrowUpBadSVG}</span>`
            : ""
          }</span>
                  <span class="n-count" style="width:40px; min-width:40px; justify-content:center;">${numberWithSpaces(
            catalog.cpm
          )}₽
                  ${comparison.catalog.cpm > 0
            ? `<span style="height:15px;">${arrowDownGoodSVG}</span>`
            : ""
          }
                  ${comparison.catalog.cpm < 0
            ? `<span style="height:15px;">${arrowUpBadSVG}</span>`
            : ""
          }</span>
                  <span class="n-count" style="width:70px; min-width:70px; justify-content:center; border-right:1px solid #334155;">${numberWithSpaces(
            numberWithSpaces(catalog.money)
          )}₽</span>
                  <span class="n-count" style="width:60px;padding-left:6px; justify-content:center; min-width:60px; white-space: nowrap;">${numberWithSpaces(
            numberWithSpaces(shelf.views)
          )} 
                  ${comparison.shelf.views > 0
            ? `<span style="height:15px;">${arrowDownSVG}</span>`
            : ""
          }
                  ${comparison.shelf.views < 0
            ? `<span style="height:15px;">${arrowUpSVG}</span>`
            : ""
          }
                  </span>
                  <span class="n-count" style="width:50px; min-width:50px; justify-content:center;">${numberWithSpaces(
            numberWithSpaces(shelf.clicks)
          )}
                  ${comparison.shelf.clicks > 0
            ? `<span style="height:15px;">${arrowDownSVG}</span>`
            : ""
          }
                  ${comparison.shelf.clicks < 0
            ? `<span style="height:15px;">${arrowUpSVG}</span>`
            : ""
          }</span>
                  <span class="n-count" style="width:50px; min-width:50px; justify-content:center;">${shelf.percent
          }%</span>
                  <span class="n-count" style="width:40px; min-width:40px; justify-content:center;">${shelf.ctr
          }%
                  ${comparison.shelf.ctr > 0
            ? `<span style="height:15px;">${arrowDownSVG}</span>`
            : ""
          }
                  ${comparison.shelf.ctr < 0
            ? `<span style="height:15px;">${arrowUpSVG}</span>`
            : ""
          }</span>
                  <span class="n-count" style="width:40px; min-width:40px; justify-content:center;">${shelf.cpc
          }₽
                  ${comparison.shelf.cpc > 0
            ? `<span style="height:15px;">${arrowDownGoodSVG}</span>`
            : ""
          }
                  ${comparison.shelf.cpc < 0
            ? `<span style="height:15px;">${arrowUpBadSVG}</span>`
            : ""
          }</span>
                  <span class="n-count" style="width:40px; min-width:40px; justify-content:center;">${numberWithSpaces(
            shelf.cpm
          )}₽
                  ${comparison.shelf.cpm > 0
            ? `<span style="height:15px;">${arrowDownGoodSVG}</span>`
            : ""
          }
                  ${comparison.shelf.cpm < 0
            ? `<span style="height:15px;">${arrowUpBadSVG}</span>`
            : ""
          }</span>
                  <span class="n-count" style="width:70px; min-width:70px; justify-content:center; border-right:1px solid #334155;">${numberWithSpaces(
            numberWithSpaces(shelf.money)
          )}₽</span>
                </div>
            </div>
            `;
      };
      for (const [dateIndex, [date]] of dates.entries()) {
        result.push(
          renderTemplate(date, this.datesCalculatedStats[date], dateIndex)
        );
      }

      const totals = this.datesCalculatedTotalsStats;

      const TABLE_FOOTER = `
      <div class="n-title" style="justify-content: flex-start; border-left:none; border-right:none; position: sticky; bottom: 0; padding-left: 0 !important; padding-right: 12px !important;">
          <div style="display:flex; gap:6px; position: sticky; left:0;">
          <span style="min-width: 73px; width:73px; display: flex; box-sizing: content-box; background: #1e293b; height: 40px; border-left: 1px solid #ffffff1a; border-right: 1px solid #ffffff1a;padding-left: 12px; align-items: center;">Всего</span>
        </div>
      <div class="n-title-flex">
        <div class="n-title-flex" style="display:flex; background: #1e293b; position:sticky; left: 87px; border-right:1px solid #334155;">
            <span style="width:60px; text-align:center; padding-left:6px;">${numberWithSpaces(
        totals.sum.views
      )}</span>
            <span style="width:50px; text-align:center;">${numberWithSpaces(
        totals.sum.clicks
      )}</span>
            <span style="width:40px; text-align:center;">${totals.sum.ctr
        }%</span>
            <span style="width:40px; text-align:center;">${totals.sum.cpc
        }₽</span>
            <span style="width:40px; text-align:center;">${totals.sum.cpm
        }₽</span>
            <span style="width:70px; text-align:center;">
              ${numberWithSpaces(totals.sum.money)}₽
            </span>
        </div>
        <div class="n-title-flex" style="display:flex; background: #1e293b; margin-left: -12px; border-right:1px solid #334155;">
          <span style="width:55px; text-align:center;">
            ${totals.analytics.addToCartWithAdRate}
          </span>
          <span style="width:55px; text-align:center;">
            ${totals.analytics.addToCartPercentRealTime}%
          </span>
          <span style="width:55px; text-align:center;">
            ${totals.analytics.ordersWithAdRate}
            </span>
          <span style="width:55px; text-align:center;">
            ${totals.analytics.ordersConversionRealTime}%
          </span>
          <span style="width:55px; text-align:center;">
            ${numberWithSpaces(totals.analytics.ordersSumWithAdRate)}₽
          </span>
          <span style="width:55px; text-align:center;">
            ${totals.analytics.salesWithAdRate}
          </span>
          <span style="width:55px; text-align:center;">
            ${totals.analytics.buyoutPercent}%
          </span>
          <span style="width:55px; text-align:center;">
            ${numberWithSpaces(totals.analytics.salesSumWithAdRate)}₽
          </span>
        </div>
        <div class="n-title-flex" style="display:flex; background: #1e293b; border-right:1px solid #334155;">
            <span style="width:70px; text-align:center;">${totals.analytics.clicksRate
        }%</span>
            <span style="width:70px; text-align:center;">${numberWithSpaces(
          totals.analytics.avgBoost
        )}</span>
            <span style="width:70px; text-align:center;">${numberWithSpaces(
          totals.analytics.cpo
        )}₽</span>
            <span style="width:70px; text-align:center;">${numberWithSpaces(
          totals.analytics.cps
        )}₽</span>
            <span style="width:60px; text-align:center;">${totals.analytics.ero
        }%</span>
            <span style="width:60px; text-align:center;">
              ${totals.analytics.er}%
            </span>
        </div>
        <div class="n-title-flex" style="display:flex; background: #1e293b; margin-left: -12px; border-right:1px solid #334155; border-right: none !important;">
          <span style="width:55px; text-align:center;">
            ${totals.analytics.wishList}
          </span>
        </div>
        <div class="n-title-flex" style="display:flex; background: #1e293b; margin-left: -12px; border-right:1px solid #334155;">
          <span style="width:55px; text-align:center;">
            ${totals.analytics.addToCart}
          </span>
          <span style="width:55px; text-align:center;">
            ${totals.analytics.addToCartPercent}%
          </span>
          <span style="width:55px; text-align:center;">
            ${totals.analytics.orders}
            </span>
          <span style="width:55px; text-align:center;">
            ${totals.analytics.ordersConversion}%
          </span>
          <span style="width:55px; text-align:center;">
            ${numberWithSpaces(totals.analytics.ordersSum)}₽
          </span>
          <span style="width:55px; text-align:center;">
            ${totals.analytics.sales}
          </span>
          <span style="width:55px; text-align:center;">
            ${totals.analytics.buyoutPercent}%
          </span>
          <span style="width:55px; text-align:center;">
            ${numberWithSpaces(totals.analytics.salesSum)}₽
          </span>
        </div>
        <div class="n-title-flex" style="display:flex; background: #1e293b; border-right:1px solid #334155;">
            <span style="width:70px; text-align:center;">${numberWithSpaces(
          totals.analytics.priceNoSpp
        )}₽</span>
            <span style="width:75px; text-align:center;">${numberWithSpaces(
          totals.analytics.openCard
        )}</span>
            <span style="width:70px; text-align:center;">${numberWithSpaces(
          totals.analytics.eCpo
        )}₽</span>
            <span style="width:70px; text-align:center;">${numberWithSpaces(
          totals.analytics.eCps
        )}₽</span>
            <span style="width:60px; text-align:center;">${totals.analytics.eEro
        }%</span>
            <span style="width:60px; text-align:center;">
              ${totals.analytics.eEr}%
            </span>
        </div>
        <div class="n-title-flex" style="display:flex; background: #1e293b; border-right:1px solid #334155;">
          <span style="width:60px; text-align:center; padding-left:6px;">${numberWithSpaces(
          totals.search.views
        )}</span>
          <span style="width:50px; text-align:center;">${numberWithSpaces(
          totals.search.clicks
        )}</span>
          <span style="width:40px; text-align:center;">${totals.search.ctr
        }%</span>
          <span style="width:40px; text-align:center;">${totals.search.cpc
        }₽</span>
          <span style="width:40px; text-align:center;">${totals.search.cpm
        }₽</span>
          <span style="width:70px; text-align:center;">
            ${numberWithSpaces(totals.search.money)}₽
          </span>
        </div>
        <div class="n-title-flex" style="display:flex; background: #1e293b; border-right:1px solid #334155;">
          <span style="width:60px; text-align:center; padding-left:6px;">${numberWithSpaces(
          totals.catalog.views
        )}</span>
          <span style="width:50px; text-align:center;">${numberWithSpaces(
          totals.catalog.clicks
        )}</span>
          <span style="width:50px; text-align:center;">${totals.catalog.percent
        }%</span>
          <span style="width:40px; text-align:center;">${totals.catalog.ctr
        }%</span>
          <span style="width:40px; text-align:center;">${totals.catalog.cpc
        }₽</span>
          <span style="width:40px; text-align:center;">${totals.catalog.cpm
        }₽</span>
          <span style="width:70px; text-align:center;">
            ${numberWithSpaces(totals.catalog.money)}₽
          </span>
        </div>
        <div class="n-title-flex" style="display:flex; background: #1e293b; border-right:1px solid #334155;">
          <span style="width:60px; text-align:center; padding-left:6px;">${numberWithSpaces(
          totals.shelf.views
        )}</span>
          <span style="width:50px; text-align:center;">${numberWithSpaces(
          totals.shelf.clicks
        )}</span>
          <span style="width:50px; text-align:center;">${totals.shelf.percent
        }%</span>
          <span style="width:40px; text-align:center;">${totals.shelf.ctr
        }%</span>
          <span style="width:40px; text-align:center;">${totals.shelf.cpc
        }₽</span>
          <span style="width:40px; text-align:center;">${totals.shelf.cpm
        }₽</span>
          <span style="width:70px; text-align:center;">
            ${numberWithSpaces(totals.shelf.money)}₽
          </span>
        </div>
      </div>
    </div>
    `;

      result.push(TABLE_FOOTER);

      return result.join("");
    }

    renderKeywordsList() {
      const searchText = this.searchText;
      const clusterize = this.clusterize;
      let filteredDates = false;
      let keywords = [...this?.wordsStats?.keywords] || [];
      let excluded = [...this?.wordsStats?.excluded] || [];
      let fixed = [...this?.wordsStats?.fixed] || [];

      const selectedCustomLists = this.customLists.filter(
        (list) => list.selected === true
      );

      const exceptCustomLists = selectedCustomLists.filter(
        (list) => list.except === true
      );

      const includeCustomLists = selectedCustomLists.filter(
        (list) => list.except === false
      );

      if (this.showOnlyPhrasesWithoutBoost) {
        const filterWithoutBoost = (item) => {
          return item?.positions?.position >= -1 &&
            item?.positions?.logs === undefined && item?.indexData?.ad?.logs === undefined;
        };
        if (clusterize) {
          const selectedClusters = new Set();
          const selectClustersWithFilterWithoutBoost = (item, index) => {
            if (filterWithoutBoost(item) && item?.presetId) {
              selectedClusters.add(item.presetId);
            }
          };
          this.#wordsStats.keywords.forEach(
            selectClustersWithFilterWithoutBoost
          );
          this.#wordsStats.excluded.forEach(
            selectClustersWithFilterWithoutBoost
          );
          this.#wordsStats.fixed.forEach(selectClustersWithFilterWithoutBoost);

          keywords = keywords.filter((item) =>
            selectedClusters.has(item.presetId)
          );
          excluded = excluded.filter((item) =>
            selectedClusters.has(item.presetId)
          );
          fixed = fixed.filter((item) => selectedClusters.has(item.presetId));
        } else {
          keywords = this.#wordsStats.keywords.filter(filterWithoutBoost);
          excluded = this.#wordsStats.excluded.filter(filterWithoutBoost);
          fixed = this.#wordsStats.fixed.filter(filterWithoutBoost);
        }
      }

      if (this.showOnlyNewPhrases) {
        const today = new Date();
        const todayString =
          today.getFullYear() +
          "-" +
          zeroPad(today.getMonth() + 1, 2) +
          "-" +
          zeroPad(today.getDate(), 2);

        const filterByDateAndNew = (item) => {
          return item.dates.size === 1 && item.dates.has("'" + todayString);
        };

        if (clusterize) {
          const selectedClusters = new Set();
          const selectClustersWithFilterByDateAndNew = (item, index) => {
            if (filterByDateAndNew(item) && item?.presetId) {
              selectedClusters.add(item.presetId);
            }
          };
          this.#wordsStats.keywords.forEach(
            selectClustersWithFilterByDateAndNew
          );
          this.#wordsStats.excluded.forEach(
            selectClustersWithFilterByDateAndNew
          );
          this.#wordsStats.fixed.forEach(selectClustersWithFilterByDateAndNew);

          keywords = keywords.filter((item) =>
            selectedClusters.has(item.presetId)
          );
          excluded = excluded.filter((item) =>
            selectedClusters.has(item.presetId)
          );
          fixed = fixed.filter((item) => selectedClusters.has(item.presetId));
        } else {
          keywords = this.#wordsStats.keywords.filter(filterByDateAndNew);
          excluded = this.#wordsStats.excluded.filter(filterByDateAndNew);
          fixed = this.#wordsStats.fixed.filter(filterByDateAndNew);
        }
      }

      if (clusterize) {
        if (exceptCustomLists.length) {
          const selectedKeywordsSet = exceptCustomLists.reduce((acc, list) => {
            list.keywords.forEach((keyword) => acc.add(keyword));
            return acc;
          }, new Set());
          const selectedClusters = new Set();

          const pushSelectedClusters = (item, index) => {
            if (selectedKeywordsSet.has(item.keyword)) {
              if (item.presetId) {
                selectedClusters.add(item.presetId);
              }
            }
          };
          keywords.forEach(pushSelectedClusters);
          excluded.forEach(pushSelectedClusters);
          fixed.forEach(pushSelectedClusters);

          keywords = keywords.filter(
            (item) => !selectedClusters.has(item.presetId)
          );
          excluded = excluded.filter(
            (item) => !selectedClusters.has(item.presetId)
          );
          fixed = fixed.filter((item) => !selectedClusters.has(item.presetId));
        }

        if (includeCustomLists.length) {
          const selectedKeywordsSet = includeCustomLists.reduce((acc, list) => {
            list.keywords.forEach((keyword) => acc.add(keyword));
            return acc;
          }, new Set());
          const selectedClusters = new Set();

          const pushSelectedClusters = (item, index) => {
            if (selectedKeywordsSet.has(item.keyword)) {
              if (item.presetId) {
                selectedClusters.add(item.presetId);
              }
            }
          };

          keywords.forEach(pushSelectedClusters);
          excluded.forEach(pushSelectedClusters);
          fixed.forEach(pushSelectedClusters);

          keywords = keywords.filter((item) =>
            selectedClusters.has(item.presetId)
          );
          excluded = excluded.filter((item) =>
            selectedClusters.has(item.presetId)
          );
          fixed = fixed.filter((item) => selectedClusters.has(item.presetId));
        }
      } else {
        if (exceptCustomLists.length) {
          const selectedKeywords = exceptCustomLists.reduce((acc, list) => {
            list.keywords.forEach((keyword) => acc.add(keyword));
            return acc;
          }, new Set());

          keywords = keywords.filter(
            ({ keyword }) => !selectedKeywords.has(keyword)
          );
          excluded = excluded.filter(
            ({ keyword }) => !selectedKeywords.has(keyword)
          );
          fixed = fixed.filter(({ keyword }) => !selectedKeywords.has(keyword));
        }

        if (includeCustomLists.length) {
          const selectedKeywords = includeCustomLists.reduce((acc, list) => {
            list.keywords.forEach((keyword) => acc.add(keyword));
            return acc;
          }, new Set());

          keywords = keywords.filter(({ keyword }) =>
            selectedKeywords.has(keyword)
          );
          excluded = excluded.filter(({ keyword }) =>
            selectedKeywords.has(keyword)
          );
          fixed = fixed.filter(({ keyword }) => selectedKeywords.has(keyword));
        }
      }

      if (this.showOnlyNotFoundClusters) {
        keywords = keywords.filter(
          (keyword) =>
            keyword?.indexData?.exist !== undefined && !keyword.indexData.exist
        );
        excluded = excluded.filter(
          (keyword) =>
            keyword?.indexData?.exist !== undefined && !keyword.indexData.exist
        );
      }

      if (this.showOnlyPKClusters) {
        keywords = keywords.filter(
          (keyword) =>
            keyword?.positions?.logs !== undefined &&
            keyword.positions?.type === "c"
        );
        excluded = excluded.filter(
          (keyword) =>
            keyword?.positions?.logs !== undefined &&
            keyword.positions?.type === "c"
        );
      }

      if (this.showOnlyAutoClusters) {
        keywords = keywords.filter(
          (keyword) =>
            keyword?.positions?.logs !== undefined &&
            keyword.positions?.type !== "c"
        );
        excluded = excluded.filter(
          (keyword) =>
            keyword?.positions?.logs !== undefined &&
            keyword.positions?.type !== "c"
        );
      }

      if (this.showOnlyFoundClusters) {
        keywords = keywords.filter(
          (keyword) =>
            keyword?.positions?.position > -1 ||
            (keyword?.positions?.position === -1 &&
              keyword?.indexData?.exist !== undefined &&
              keyword.indexData.exist)
        );
        excluded = excluded.filter(
          (keyword) =>
            keyword?.positions?.position > -1 ||
            (keyword?.positions?.position === -1 &&
              keyword?.indexData?.exist !== undefined &&
              keyword.indexData.exist)
        );
      }

      if (
        this.fullStatsLoaded &&
        (this.datePickerFrom?.selectedDates?.length ||
          this.datePickerTo?.selectedDates?.length)
      ) {
        filteredDates = true;
        keywords = keywords.map((item) => ({
          ...item,
          dates: [...item.dates].filter(
            ([date]) => {
              // const date = d.slice(1)
              return new Date(date).getTime() >=
                (this.datePickerFrom.selectedDates[0]?.getTime() ||
                  new Date(this.#placement.createDate).getTime()) &&
                new Date(date).getTime() <=
                (this.datePickerTo.selectedDates[0]?.getTime() ||
                  new Date().getTime())
            }
          ),
        }));

        excluded = excluded.map((item) => ({
          ...item,
          dates: [...item.dates].filter(
            ([date]) => {
              // const date = d.slice(1);
              return new Date(date).getTime() >=
                (this.datePickerFrom.selectedDates[0]?.getTime() ||
                  new Date(this.#placement.createDate).getTime()) &&
                new Date(date).getTime() <=
                (this.datePickerTo.selectedDates[0]?.getTime() ||
                  new Date().getTime())
            }
          ),
        }));
        if (!clusterize) {
          keywords = keywords.filter((item) => [...item.dates].length);
          excluded = excluded.filter((item) => [...item.dates].length);
          fixed = fixed.filter((item) => [...item.dates].length);
        }
      }

      if (clusterize) {
        const clusters = {};
        keywords.forEach((item) => {
          const presetId = item?.presetId;
          if (presetId === undefined) {
            if (item?.isSubject) {
              clusters["subject"] = clusters["subject"] || [];
              clusters["subject"].push(item);
            } else {
              if (item?.isMerger) {
                clusters["merger"] = clusters["merger"] || [];
                clusters["merger"].push(item);
              }
            }
          }
          if (presetId !== undefined) {
            clusters[presetId] = clusters[presetId] || [];
            clusters[presetId].push(item);
          }
        });
        let hasExcludedChilds = [];
        let hasFixedChilds = [];

        excluded.forEach((item) => {
          const presetId = item?.presetId;
          if (presetId) {
            hasExcludedChilds.push(presetId);
            clusters[presetId] = clusters[presetId] || [];
            clusters[presetId].push(item);
          }
        });

        fixed.forEach((item) => {
          const presetId = item?.presetId;
          if (presetId) {
            hasFixedChilds.push(presetId);
          }
        });

        hasExcludedChilds = [...new Set(hasExcludedChilds)].map((i) =>
          Number(i)
        );
        hasFixedChilds = [...new Set(hasFixedChilds)].map((i) => Number(i));

        const clusterizedKeywords = [];
        for (const [presetId, values] of Object.entries(clusters)) {
          const sorted = values.sort(
            (a, b) => (b?.views?.count || 0) - (a?.views?.count || 0)
          );
          const hasExcluded =
            hasExcludedChilds.findIndex((i) => i == Number(presetId)) > -1;
          const hasFixed =
            hasFixedChilds.findIndex((i) => i == Number(presetId)) > -1;
          const totalSchema = {
            total_count: 0,
            total_clicks: 0,
            total_ctr: 0,
            total_cpc: 0,
            total_money: 0,
            total_views: 0,
          };
          sorted.forEach((item) => {
            totalSchema.total_views += item?.views?.count || 0;
            totalSchema.total_count += item?.count || 0;
            totalSchema.total_clicks += item?.clicks || 0;
            totalSchema.total_ctr =
              (totalSchema.total_clicks / totalSchema.total_count) * 100 || 0;
            totalSchema.total_money += item?.money || 0;
            totalSchema.total_cpc =
              totalSchema.total_clicks > 0
                ? totalSchema.total_money / totalSchema.total_clicks
                : 0;
          });
          const schema = {
            ...sorted[0],
            ...totalSchema,
            child: sorted,
            hasExcluded,
            hasFixed,
          };

          if (this.showOnlyActiveClusters) {
            if (!schema.hasExcluded) {
              clusterizedKeywords.push(schema);
            }
          } else {
            if (this.showOnlyOffClusters) {
              if (schema.hasExcluded) {
                clusterizedKeywords.push(schema);
              }
            } else {
              clusterizedKeywords.push(schema);
            }
          }
        }
        keywords = clusterizedKeywords;
      }
      if (
        clusterize &&
        (this.showOnlyFixedClusters || this.showOnlyUnfixedClusters)
      ) {
        keywords = keywords.filter((item) => {
          if (this.#showOnlyFixedClusters) {
            if (item.hasFixed) {
              return true;
            }
            return false;
          } else {
            if (this.#showOnlyUnfixedClusters) {
              if (!item.hasFixed) {
                return true;
              }
              return false;
            }
          }
        });
      }
      if (filteredDates) {
        if (clusterize) {
          const reducer = (acc, child, column) =>
          (acc += [...child.dates].reduce(
            (acc, [date, value]) => (acc += value[column]),
            0
          ));
          const childReducer = (acc, [date, value], column) =>
            (acc += value[column]);

          keywords = keywords.map((item) => {
            const datesTotalSchema = {
              dates_total_count: 0,
              dates_total_clicks: 0,
              dates_total_ctr: 0,
              dates_total_cpc: 0,
              dates_total_money: 0,
            };
            datesTotalSchema.dates_total_count =
              item?.child.reduce(
                (acc, item) => reducer(acc, item, "count"),
                0
              ) || 0;
            datesTotalSchema.dates_total_clicks =
              item?.child.reduce(
                (acc, item) => reducer(acc, item, "clicks"),
                0
              ) || 0;
            datesTotalSchema.dates_total_money =
              Math.round(
                item?.child.reduce(
                  (acc, item) => reducer(acc, item, "money"),
                  0
                ) * 100
              ) / 100 || 0;
            datesTotalSchema.dates_total_ctr =
              Math.round(
                (datesTotalSchema.dates_total_clicks /
                  datesTotalSchema.dates_total_count) *
                100 *
                100
              ) / 100 || 0;
            datesTotalSchema.dates_total_cpc =
              datesTotalSchema.dates_total_clicks > 0
                ? Math.round(
                  (datesTotalSchema.dates_total_money /
                    datesTotalSchema.dates_total_clicks) *
                  100
                ) / 100
                : 0;

            return { ...item, ...datesTotalSchema };
          });

          keywords.forEach((keyword, index) => {
            keyword?.child?.forEach((child, cindex) => {
              const datesSchema = {
                dates_count: 0,
                dates_clicks: 0,
                dates_ctr: 0,
                dates_cpc: 0,
                dates_money: 0,
              };
              datesSchema.dates_count = [...child.dates].reduce(
                (acc, child) => childReducer(acc, child, "count"),
                0
              );
              datesSchema.dates_clicks = [...child.dates].reduce(
                (acc, child) => childReducer(acc, child, "clicks"),
                0
              );
              datesSchema.dates_money =
                Math.round(
                  [...child.dates].reduce(
                    (acc, child) => childReducer(acc, child, "money"),
                    0
                  ) * 100
                ) / 100;
              datesSchema.dates_ctr =
                datesSchema.dates_count > 0
                  ? Math.round(
                    (datesSchema.dates_clicks / datesSchema.dates_count) *
                    100 *
                    100
                  ) / 100
                  : 0;
              datesSchema.dates_cpc =
                datesSchema.dates_clicks > 0
                  ? Math.round(
                    (datesSchema.dates_money / datesSchema.dates_clicks) * 100
                  ) / 100
                  : 0;
              keywords[index].child[cindex] = {
                ...keyword.child[cindex],
                ...datesSchema,
              };
            });
          });
        } else {
          const reducer = (acc, [date, value], column) =>
            (acc += value[column]);
          keywords = keywords.map((item) => {
            const datesSchema = {
              dates_count: 0,
              dates_clicks: 0,
              dates_ctr: 0,
              dates_cpc: 0,
              dates_money: 0,
            };
            datesSchema.dates_count = [...item.dates].reduce(
              (acc, item) => reducer(acc, item, "count"),
              0
            );
            datesSchema.dates_clicks = [...item.dates].reduce(
              (acc, item) => reducer(acc, item, "clicks"),
              0
            );
            datesSchema.dates_money =
              Math.round(
                [...item.dates].reduce(
                  (acc, item) => reducer(acc, item, "money"),
                  0
                ) * 100
              ) / 100;
            datesSchema.dates_ctr =
              Math.round(
                (datesSchema.dates_clicks / datesSchema.dates_count) * 100 * 100
              ) / 100;
            datesSchema.dates_cpc =
              datesSchema.dates_clicks > 0
                ? Math.round(
                  (datesSchema.dates_money / datesSchema.dates_clicks) * 100
                ) / 100
                : 0;

            return { ...item, ...datesSchema };
          });
        }
      }

      if (
        this.sumFreqFromFilter ||
        this.sumFreqToFilter ||
        this.freqFromFilter ||
        this.freqToFilter ||
        this.positionFromFilter ||
        this.positionToFilter ||
        this.positionDeltaFromFilter ||
        this.positionDeltaToFilter ||
        this.positionBoostFromFilter ||
        this.positionBoostToFilter ||
        this.countFromFilter ||
        this.countToFilter ||
        this.clicksFromFilter ||
        this.clicksToFilter ||
        this.ctrFromFilter ||
        this.ctrToFilter ||
        this.cpcFromFilter ||
        this.cpcToFilter ||
        this.moneyFromFilter ||
        this.moneyToFilter
      ) {
        let prefix = "";
        if (clusterize) {
          prefix = "total_";
        }

        keywords = keywords.filter((item) => {
          if (filteredDates && clusterize) {
            const count = item.dates_total_count;
            const clicks = item.dates_total_clicks;
            const money = item.dates_total_money;
            const ctr = item.dates_total_ctr;
            const cpc = item.dates_total_cpc;

            return (
              (item?.views?.cluster_count || 0) >=
              (this.sumFreqFromFilter || 0) &&
              (item?.views?.cluster_count || 0) <=
              (this.sumFreqToFilter || 1000000000) &&
              (item?.views?.count || 0) >= (this.freqFromFilter || 0) &&
              (item?.views?.count || 0) <= (this.freqToFilter || 100000000) &&
              (item?.positions?.boosted_from ||
                item?.positions?.position ||
                0) >= (this.positionFromFilter || -1) &&
              (item?.positions?.boosted_from ||
                item?.positions?.position ||
                99999) <= (this.positionToFilter || 99999) &&
              (this.positionToFilter > 0
                ? item?.positions?.position === -1
                  ? false
                  : true
                : true) &&
              (item?.positions?.position_delta || 0) >=
              (this.positionDeltaFromFilter || -1) &&
              (item?.positions?.position_delta || 0) <=
              (this.positionDeltaToFilter || 99999) &&
              (this.positionDeltaToFilter > 0
                ? !item?.positions?.position_delta
                  ? false
                  : true
                : true) &&
              (item?.positions?.position_boost || 0) >=
              (this.positionBoostFromFilter || -1) &&
              (item?.positions?.position_boost || 0) <=
              (this.positionBoostToFilter || 99999) &&
              (this.positionBoostToFilter > 0
                ? !item?.positions?.position_boost
                  ? false
                  : true
                : true) &&
              (count || 0) >= (this.countFromFilter || 0) &&
              (count || 0) <= (this.countToFilter || 10 ** 7) &&
              (clicks || 0) >= (this.clicksFromFilter || 0) &&
              (clicks || 0) <= (this.clicksToFilter || 10 ** 7) &&
              (ctr || 0) >= (this.ctrFromFilter || 0) &&
              (ctr || 0) <= (this.ctrToFilter || 100) &&
              (cpc || 0) >= (this.cpcFromFilter || 0) &&
              (cpc || 0) <= (this.cpcToFilter || 100) &&
              (money || 0) >= (this.moneyFromFilter || 0) &&
              (money || 0) <= (this.moneyToFilter || 10 ** 7)
            );
          }

          if (filteredDates) {
            const count = item.dates_count;
            const clicks = item.dates_clicks;
            const money = item.dates_money;
            const ctr = item.dates_ctr;
            const cpc = item.dates_cpc;

            return (
              (item?.views?.cluster_count || 0) >=
              (this.sumFreqFromFilter || 0) &&
              (item?.views?.cluster_count || 0) <=
              (this.sumFreqToFilter || 1000000000) &&
              (item?.views?.count || 0) >= (this.freqFromFilter || 0) &&
              (item?.views?.count || 0) <= (this.freqToFilter || 100000000) &&
              (item?.positions?.boosted_from ||
                item?.positions?.position ||
                0) >= (this.positionFromFilter || -1) &&
              (item?.positions?.boosted_from ||
                item?.positions?.position ||
                99999) <= (this.positionToFilter || 99999) &&
              (this.positionToFilter > 0
                ? item?.positions?.position === -1
                  ? false
                  : true
                : true) &&
              (item?.positions?.position_delta || 0) >=
              (this.positionDeltaFromFilter || -1) &&
              (item?.positions?.position_delta || 0) <=
              (this.positionDeltaToFilter || 99999) &&
              (this.positionDeltaToFilter > 0
                ? !item?.positions?.position_delta
                  ? false
                  : true
                : true) &&
              (item?.positions?.position_boost || 0) >=
              (this.positionBoostFromFilter || -1) &&
              (item?.positions?.position_boost || 0) <=
              (this.positionBoostToFilter || 99999) &&
              (this.positionBoostToFilter > 0
                ? !item?.positions?.position_boost
                  ? false
                  : true
                : true) &&
              (count || 0) >= (this.countFromFilter || 0) &&
              (count || 0) <= (this.countToFilter || 10 ** 7) &&
              (clicks || 0) >= (this.clicksFromFilter || 0) &&
              (clicks || 0) <= (this.clicksToFilter || 10 ** 7) &&
              (ctr || 0) >= (this.ctrFromFilter || 0) &&
              (ctr || 0) <= (this.ctrToFilter || 100) &&
              (cpc || 0) >= (this.cpcFromFilter || 0) &&
              (cpc || 0) <= (this.cpcToFilter || 100) &&
              (money || 0) >= (this.moneyFromFilter || 0) &&
              (money || 0) <= (this.moneyToFilter || 10 ** 7)
            );
          }

          return (
            (item?.views?.cluster_count || 0) >=
            (this.sumFreqFromFilter || 0) &&
            (item?.views?.cluster_count || 0) <=
            (this.sumFreqToFilter || 1000000000) &&
            (item?.views?.count || 0) >= (this.freqFromFilter || 0) &&
            (item?.views?.count || 0) <= (this.freqToFilter || 100000000) &&
            (item?.positions?.boosted_from || item?.positions?.position || 0) >=
            (this.positionFromFilter || -1) &&
            (item?.positions?.boosted_from ||
              item?.positions?.position ||
              99999) <= (this.positionToFilter || 99999) &&
            (this.positionToFilter > 0
              ? item?.positions?.position === -1
                ? false
                : true
              : true) &&
            (item?.positions?.position_delta || 0) >=
            (this.positionDeltaFromFilter || -1) &&
            (item?.positions?.position_delta || 0) <=
            (this.positionDeltaToFilter || 99999) &&
            (this.positionDeltaToFilter > 0
              ? !item?.positions?.position_delta
                ? false
                : true
              : true) &&
            (item?.positions?.position_boost || 0) >=
            (this.positionBoostFromFilter || -1) &&
            (item?.positions?.position_boost || 0) <=
            (this.positionBoostToFilter || 99999) &&
            (this.positionBoostToFilter > 0
              ? !item?.positions?.position_boost
                ? false
                : true
              : true) &&
            (item[prefix + "count"] || 0) >= (this.countFromFilter || 0) &&
            (item[prefix + "count"] || 0) <= (this.countToFilter || 10 ** 7) &&
            (item[prefix + "clicks"] || 0) >= (this.clicksFromFilter || 0) &&
            (item[prefix + "clicks"] || 0) <=
            (this.clicksToFilter || 10 ** 7) &&
            (item[prefix + "ctr"] || 0) >= (this.ctrFromFilter || 0) &&
            (item[prefix + "ctr"] || 0) <= (this.ctrToFilter || 1000000) &&
            (item[prefix + "cpc"] || 0) >= (this.cpcFromFilter || 0) &&
            (item[prefix + "cpc"] || 0) <= (this.cpcToFilter || 1000000) &&
            (item[prefix + "money"] || 0) >= (this.moneyFromFilter || 0) &&
            (item[prefix + "money"] || 0) <= (this.moneyToFilter || 10 ** 7)
          );
        });
      }

      keywords = keywords.sort((a, b) => {
        const column = this.sortOptions.column;
        const prefix = clusterize ? "total_" : "";

        if (column === "position") {
          const posA =
            a?.positions?.boosted_from === undefined
              ? a?.positions?.position === undefined
                ? 70000
                : a?.positions?.position === -1
                  ? 99999
                  : a?.positions?.position
              : a?.positions?.boosted_from;
          const posB =
            b?.positions?.boosted_from === undefined
              ? b?.positions?.position === undefined
                ? 70000
                : b?.positions?.position === -1
                  ? 99999
                  : b?.positions?.position
              : b?.positions?.boosted_from;

          if (this.sortOptions.order === "desc") {
            return posB - posA;
          }
          return posA - posB;
        }

        if (column === "position_delta") {
          const posA = !a?.positions?.position_delta
            ? 70000
            : a?.positions?.position_delta;
          const posB = !b?.positions?.position_delta
            ? 70000
            : b?.positions?.position_delta;

          if (this.sortOptions.order === "desc") {
            return posB - posA;
          }
          return posA - posB;
        }

        if (column === "position_boost") {
          const posA = !a?.positions?.position_boost
            ? 70000
            : a?.positions?.position_boost;
          const posB = !b?.positions?.position_boost
            ? 70000
            : b?.positions?.position_boost;

          if (this.sortOptions.order === "desc") {
            return posB - posA;
          }
          return posA - posB;
        }

        if (column === "views" && !clusterize) {
          if (this.sortOptions.order === "desc") {
            return (b?.views?.count || 0) - (a?.views?.count || 0);
          }
          return (a?.views?.count || 0) - (b?.views?.count || 0);
        }

        if (column === "cluster_views") {
          if (this.sortOptions.order === "desc") {
            return (
              (b?.views?.cluster_count || 0) - (a?.views?.cluster_count || 0)
            );
          }
          return (
            (a?.views?.cluster_count || 0) - (b?.views?.cluster_count || 0)
          );
        }

        if (filteredDates) {
          if (clusterize) {
            if (column === "views") {
              if (this.sortOptions.order === "desc") {
                return (b[prefix + column] || 0) - (a[prefix + column] || 0);
              }
              return (a[prefix + column] || 0) - (b[prefix + column] || 0);
            }

            const aRes = a["dates_total_" + column];
            const bRes = b["dates_total_" + column];

            if (this.sortOptions.order === "desc") {
              return bRes - aRes;
            }

            return aRes - bRes;
          }

          const aRes = a["dates_" + column];
          const bRes = b["dates_" + column];

          if (this.sortOptions.order === "desc") {
            return bRes - aRes;
          }
          return aRes - bRes;
        }
        if (this.sortOptions.order === "desc") {
          return (b[prefix + column] || 0) - (a[prefix + column] || 0);
        }
        return (a[prefix + column] || 0) - (b[prefix + column] || 0);
      });

      if (searchText !== "") {
        let searchString = searchText.toLowerCase().trim();

        let searchByClusterName = false;
        let searchWithLogicalNot = false;
        let searchNumbersInPhrase = false;
        if (searchString.startsWith("#")) {
          searchString = searchString.slice(1);
          searchNumbersInPhrase = true;
        }

        if (searchString.startsWith("@")) {
          searchString = searchString.slice(1);
          searchByClusterName = true;
        }

        if (searchString.startsWith("!")) {
          searchString = searchString.slice(1);
          searchWithLogicalNot = true;
        }

        let searchIsNumeric =
          !isNaN(Number(searchString)) &&
          isFinite(searchString) &&
          !searchNumbersInPhrase;

        if (clusterize) {
          if (searchByClusterName) {
            if (searchWithLogicalNot) {
              keywords = keywords.filter((item) => {
                return !item?.keyword?.includes(searchString);
              });
            } else {
              keywords = keywords.filter((item) => {
                return item?.keyword?.includes(searchString);
              });
            }
          }

          keywords = keywords.filter((item) => {
            if (searchIsNumeric) {
              if (searchWithLogicalNot) {
                return (
                  item?.presetId !== Number(searchString) &&
                  !String(item?.presetId).startsWith(searchString)
                );
              }
              return (
                item?.presetId === Number(searchString) ||
                String(item?.presetId).startsWith(searchString)
              );
            }

            if (searchWithLogicalNot) {
              return (
                !item?.keyword?.includes(searchString) ||
                !item?.child?.some((child) =>
                  child.keyword.includes(searchString)
                )
              );
            }

            return (
              item?.keyword?.includes(searchString) ||
              item?.child?.some((child) => child.keyword.includes(searchString))
            );
          });
        } else {
          keywords = keywords.filter((item) => {
            if (searchIsNumeric) {
              if (searchWithLogicalNot) {
                return (
                  item?.presetId !== Number(searchString) &&
                  !String(item?.presetId).startsWith(searchString)
                );
              }
              return (
                item?.presetId === Number(searchString) ||
                String(item?.presetId).startsWith(searchString)
              );
            }

            if (searchWithLogicalNot) {
              return !item?.keyword?.includes(searchString);
            }

            return item?.keyword?.includes(searchString);
          });
        }
      }

      this.keywordsToExport = keywords;
      document.getElementById("n-keywords-total").innerText = keywords.length;
      document.getElementById("n-keywords-title").innerText = clusterize
        ? "Кластеры"
        : "Ключевые фразы";

      const totalValuesElement = document.getElementById(
        "n-keywords-total-values"
      );

      totalValuesElement.innerHTML = this.renderTotalsTemplate(
        keywords,
        filteredDates
      );

      return keywords
        .map((item, idx) =>
          this.renderTemplate(item, idx, false, false, filteredDates)
        )
        .join("");
    }

    renderTotalsTemplate(keywords, filteredDates) {
      const totals = {
        totalFreq: 0,
        freq: 0,
        views: 0,
        clicks: 0,
        ctr: 0,
        cpc: 0,
        money: 0,
      };

      const counter = (item) => {
        totals.freq += item?.views?.count || 0;
        if (filteredDates) {
          totals.views += item?.dates_count || 0;
          totals.clicks += item?.dates_clicks || 0;
          totals.money += item?.dates_money || 0;
        } else {
          totals.views += item?.count || 0;
          totals.clicks += item?.clicks || 0;
          totals.money += item?.money || 0;
        }
      };

      keywords.forEach((item) => {
        totals.totalFreq += item?.views?.cluster_count || 0;
        if (this.clusterize) {
          item.child.forEach(counter);
        } else {
          counter(item);
        }
      });

      totals.ctr =
        totals.views > 0
          ? Number(precise.toFixed((totals.clicks / totals.views) * 100, 2))
          : 0;

      totals.cpc =
        totals.clicks > 0
          ? Number(precise.toFixed(totals.money / totals.clicks, 2))
          : 0;

      totals.money = Number(precise.toFixed(totals.money, 2));

      return `
      <span style="width:75px; text-align:right;">${numberWithSpaces(
        totals.totalFreq
      )}</span>
      <span style="width:60px; text-align:right;">${numberWithSpaces(
        totals.freq
      )}</span>
      <span style="width:55px; text-align:center;"></span>
      <span style="width:55px; text-align:center;"></span>
      <span style="width:70px; text-align:right;"></span>
      <span style="width:40px; text-align:right;"></span>
      <span style="width:40px; text-align:right;"></span>
      <span style="width:50px; text-align:right;">${numberWithSpaces(
        totals.views
      )}</span>
      <span style="width:50px; text-align:right;">${numberWithSpaces(
        totals.clicks
      )}</span>
      <span style="width:35px; text-align:right;">${totals.ctr}%</span>
      <span style="width:35px; text-align:right;">${totals.cpc}₽</span>
      <span style="width:55px; text-align:right;">${totals.money}₽</span>`;
    }

    renderExcludedList({ searchText = "" }) {
      let keywords = [...this.wordsStats.excluded] || [];
      let filteredDates = false;

      if (searchText !== "") {
        const searchString = searchText.toLowerCase().trim();
        const searchIsNumeric =
          !isNaN(parseFloat(searchString)) && isFinite(searchString);
        keywords = keywords.filter((item) => {
          if (searchIsNumeric) {
            return (
              item?.keyword?.includes(searchString) ||
              item?.presetId === Number(searchString) ||
              String(item?.presetId).startsWith(searchString)
            );
          } else {
            return item?.keyword?.includes(searchString);
          }
        });
      }

      if (this.showOnlyDanger) {
        keywords = keywords.filter((item) => item?.isMerger || item?.isSubject);
      }

      if (
        this.fullStatsLoaded &&
        (this.datePickerFrom?.selectedDates?.length ||
          this.datePickerTo?.selectedDates?.length)
      ) {
        filteredDates = true;
        keywords = keywords.map((item) => ({
          ...item,
          dates: [...item.dates].filter(
            ([date]) =>
              new Date(date).getTime() >=
              (this.datePickerFrom.selectedDates[0]?.getTime() ||
                new Date(this.#placement.createDate).getTime()) &&
              new Date(date).getTime() <=
              (this.datePickerTo.selectedDates[0]?.getTime() ||
                new Date().getTime())
          ),
        }));
        keywords = keywords.filter((item) => [...item.dates].length);
      }

      keywords = keywords.sort((a, b) => {
        const column = this.sortExcludedOptions.column;

        if (column === "views") {
          if (this.sortExcludedOptions.order === "desc") {
            return (b?.views?.count || 0) - (a?.views?.count || 0);
          }
          return (a?.views?.count || 0) - (b?.views?.count || 0);
        }

        if (column === "cluster_views") {
          if (this.sortExcludedOptions.order === "desc") {
            return (
              (b?.views?.cluster_count || 0) - (a?.views?.cluster_count || 0)
            );
          }
          return (
            (a?.views?.cluster_count || 0) - (b?.views?.cluster_count || 0)
          );
        }

        if (filteredDates) {
          if (this.sortExcludedOptions.order === "desc") {
            return (
              [...b.dates].reduce(
                (acc, [date, value]) => (acc += value[column]),
                0
              ) -
              [...a.dates].reduce(
                (acc, [date, value]) => (acc += value[column]),
                0
              )
            );
          }

          return (
            [...a.dates].reduce(
              (acc, [date, value]) => (acc += value[column]),
              0
            ) -
            [...b.dates].reduce(
              (acc, [date, value]) => (acc += value[column]),
              0
            )
          );
        } else {
          if (this.sortExcludedOptions.order === "desc") {
            return (b[column] || 0) - (a[column] || 0);
          }
          return (a[column] || 0) - (b[column] || 0);
        }
      });

      document.getElementById("n-excluded-total").innerText = keywords.length;

      this.excludedToExport = keywords;

      return keywords
        .map((item) => {
          let filteredCount,
            filteredClicks,
            filteredCTR,
            filteredCPC,
            filteredMoney = null;

          if (filteredDates) {
            const filteredReducer = (item, key) => {
              return (
                [...item.dates].reduce(
                  (acc, [date, value]) => (acc += value[key] || 0),
                  0
                ) || 0
              );
            };

            filteredCount = filteredReducer(item, "count");
            filteredClicks = filteredReducer(item, "clicks");
            filteredMoney = filteredReducer(item, "money");

            filteredCTR =
              filteredClicks && filteredCount
                ? Math.round(
                  ((filteredClicks / filteredCount) * 100 + Number.EPSILON) *
                  100
                ) / 100
                : 0;
            filteredCPC =
              filteredMoney && filteredClicks
                ? Math.round(
                  (filteredMoney / filteredClicks) * 100 + Number.EPSILON
                ) / 100
                : 0;
          }
          return `
      <div class="n-kw-list-item" ${item?.isSubject || item?.isMerger
              ? `style="background: linear-gradient(90deg, rgb(101 0 0) 0%, #590d29a1 25%)"`
              : `style="background: #590d29a1"`
            }>
        <div style="display:flex; gap:2px; align-items:center;">
          <div style="display:flex; align-items:center; margin-right: 4px;">
            <input type="checkbox"  style="appearance:auto" ${item?.selected ? "checked" : ""
            } id="excludedCheckbox" data-keyword-index="${item?.index
            }" data-checkbox="excluded-${item?.index}"/>
          </div>
          <div style="max-width: 250px; overflow: hidden; text-overflow: ellipsis; line-clamp: 3; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2;"><a target="_blank" class="n-external-link" href="https://www.wildberries.ru/catalog/0/search.aspx?search=${encodeURI(
              sanitize(item.keyword)
            )}">${sanitize(item.keyword)}</a></div>
        </div>
        <div style="display:flex; gap:12px;">
        ${item?.views?.loaded
              ? `<span class="n-count">${numberWithSpaces(
                item?.views.cluster_count
              )}</span>`
              : `<span class="n-count"></span>`
            }
        ${item?.views?.loaded
              ? `<span class="n-count">${numberWithSpaces(
                item?.views.count
              )}</span>`
              : `<span class="n-count"></span>`
            }
        ${item?.metadata
              ? `<span class="n-count">${item?.presetId}</span>`
              : `<span class="n-count n-scan-excluded" data-excluded-index="${item.index}"></span>`
            }
        ${`<span class="n-count" style="width:50px; min-width:50px;">${numberWithSpaces(
              item?.count ? (filteredDates ? filteredCount : item.count) : ""
            )}</span>`}
        ${`<span class="n-count" style="width:50px; min-width:50px;">${numberWithSpaces(
              item?.clicks ? (filteredDates ? filteredClicks : item.clicks) : "--"
            )}</span>`}
        ${`<span class="n-count" style="width:50px; min-width:50px;">${item?.ctr
              ? filteredDates
                ? filteredCTR
                : Math.round((item.ctr + Number.EPSILON) * 100) / 100
              : "0"
            }%</span>`}
        ${`<span class="n-count" style="width:50px; min-width:50px;">${item?.cpc
              ? filteredDates
                ? filteredCPC
                : Math.round((item.cpc + Number.EPSILON) * 100) / 100
              : "0"
            }₽</span>`}
        ${`<span class="n-count" style="width:70px; min-width:70px;">${numberWithSpaces(
              item?.money
                ? filteredDates
                  ? Math.round((filteredMoney + Number.EPSILON) * 100) / 100
                  : Math.round((item.money + Number.EPSILON) * 100) / 100
                : "0"
            )}₽</span>`}
        </div>
      </div>`;
        })
        .join("");
    }

    renderFixedList({ searchText = "" }) {
      let keywords = [...this.wordsStats.fixed] || [];
      let filteredDates = false;

      if (searchText !== "") {
        const searchString = searchText.toLowerCase().trim();
        const searchIsNumeric =
          !isNaN(parseFloat(searchString)) && isFinite(searchString);
        keywords = keywords.filter((item) => {
          if (searchIsNumeric) {
            return (
              item?.keyword?.includes(searchString) ||
              item?.presetId === Number(searchString) ||
              String(item?.presetId).startsWith(searchString)
            );
          } else {
            return item?.keyword?.includes(searchString);
          }
        });
      }

      if (
        this.fullStatsLoaded &&
        (this.datePickerFrom?.selectedDates?.length ||
          this.datePickerTo?.selectedDates?.length)
      ) {
        filteredDates = true;
        keywords = keywords.map((item) => ({
          ...item,
          dates: [...item.dates].filter(
            ([date]) =>
              new Date(date).getTime() >=
              (this.datePickerFrom.selectedDates[0]?.getTime() ||
                new Date(this.#placement.createDate).getTime()) &&
              new Date(date).getTime() <=
              (this.datePickerTo.selectedDates[0]?.getTime() ||
                new Date().getTime())
          ),
        }));
        keywords = keywords.filter((item) => [...item.dates].length);
      }

      keywords = keywords.sort((a, b) => {
        const column = this.sortFixedOptions.column;

        if (column === "views") {
          if (this.sortFixedOptions.order === "desc") {
            return (b?.views?.count || 0) - (a?.views?.count || 0);
          }
          return (a?.views?.count || 0) - (b?.views?.count || 0);
        }
        if (column === "cluster_views") {
          if (this.sortFixedOptions.order === "desc") {
            return (
              (b?.views?.cluster_count || 0) - (a?.views?.cluster_count || 0)
            );
          }
          return (
            (a?.views?.cluster_count || 0) - (b?.views?.cluster_count || 0)
          );
        }

        if (filteredDates) {
          if (this.sortFixedOptions.order === "desc") {
            return (
              [...b.dates].reduce(
                (acc, [date, value]) => (acc += value[column]),
                0
              ) -
              [...a.dates].reduce(
                (acc, [date, value]) => (acc += value[column]),
                0
              )
            );
          }

          return (
            [...a.dates].reduce(
              (acc, [date, value]) => (acc += value[column]),
              0
            ) -
            [...b.dates].reduce(
              (acc, [date, value]) => (acc += value[column]),
              0
            )
          );
        } else {
          if (this.sortFixedOptions.order === "desc") {
            return (b[column] || 0) - (a[column] || 0);
          }
          return (a[column] || 0) - (b[column] || 0);
        }
      });

      document.getElementById("n-fixed-total").innerText = keywords.length;

      this.fixedToExport = keywords;

      return keywords
        .map((item) => {
          let filteredCount,
            filteredClicks,
            filteredCTR,
            filteredCPC,
            filteredMoney = null;

          if (filteredDates) {
            const filteredReducer = (item, key) => {
              return (
                [...item.dates].reduce(
                  (acc, [date, value]) => (acc += value[key] || 0),
                  0
                ) || 0
              );
            };

            filteredCount = filteredReducer(item, "count");
            filteredClicks = filteredReducer(item, "clicks");
            filteredMoney = filteredReducer(item, "money");

            filteredCTR =
              filteredClicks && filteredCount
                ? Math.round(
                  ((filteredClicks / filteredCount) * 100 + Number.EPSILON) *
                  100
                ) / 100
                : 0;
            filteredCPC =
              filteredMoney && filteredClicks
                ? Math.round(
                  (filteredMoney / filteredClicks) * 100 + Number.EPSILON
                ) / 100
                : 0;
          }
          return `
      <div class="n-kw-list-item" style="background: #0f4313a1">
        <div style="display:flex; gap:2px; align-items:center;">
          <div style="display:flex; align-items:center; margin-right: 4px;">
            <input type="checkbox"  style="appearance:auto" ${item?.selected ? "checked" : ""
            } id="fixedCheckbox" data-fixed-index="${item?.index
            }" data-checkbox="fixed-${item?.index}"/>
          </div>
          <div style="max-width: 250px; overflow: hidden; text-overflow: ellipsis; line-clamp: 3; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2;"><a target="_blank" class="n-external-link" href="https://www.wildberries.ru/catalog/0/search.aspx?search=${encodeURI(
              sanitize(item.keyword)
            )}">${sanitize(item.keyword)}</a></div>
        </div>
        <div style="display:flex; gap:12px;">
        ${item?.views?.loaded
              ? `<span class="n-count">${numberWithSpaces(
                item?.views.cluster_count
              )}</span>`
              : `<span class="n-count"></span>`
            }
        ${item?.views?.loaded
              ? `<span class="n-count">${numberWithSpaces(
                item?.views.count
              )}</span>`
              : `<span class="n-count"></span>`
            }
        ${item?.metadata
              ? `<span class="n-count">${item?.presetId}</span>`
              : `<span class="n-count n-scan-excluded" data-excluded-index="${item.index}"></span>`
            }
        ${`<span class="n-count" style="width:50px; min-width:50px;">${numberWithSpaces(
              item?.count ? (filteredDates ? filteredCount : item.count) : ""
            )}</span>`}
        ${`<span class="n-count" style="width:50px; min-width:50px;">${numberWithSpaces(
              item?.clicks ? (filteredDates ? filteredClicks : item.clicks) : "--"
            )}</span>`}
        ${`<span class="n-count" style="width:50px; min-width:50px;">${item?.ctr
              ? filteredDates
                ? filteredCTR
                : Math.round((item.ctr + Number.EPSILON) * 100) / 100
              : "0"
            }%</span>`}
        ${`<span class="n-count" style="width:50px; min-width:50px;">${item?.cpc
              ? filteredDates
                ? filteredCPC
                : Math.round((item.cpc + Number.EPSILON) * 100) / 100
              : "0"
            }₽</span>`}
        ${`<span class="n-count" style="width:70px; min-width:70px;">${numberWithSpaces(
              item?.money
                ? filteredDates
                  ? Math.round((filteredMoney + Number.EPSILON) * 100) / 100
                  : Math.round((item.money + Number.EPSILON) * 100) / 100
                : "0"
            )}₽</span>`}
        </div>
      </div>`;
        })
        .join("");
    }

    set fullStatsLoaded(value) {
      this.#fullStatsLoaded = value;

      if (
        this.#fullStatsLoaded &&
        this.#wordsStatsLoaded &&
        this.#realTimeStatsLoaded &&
        this.#productDataLoaded &&
        this.#productBuyOutDataLoaded
      ) {
        this.mergeStats().then(() => {
          const keywordsListElement = document.getElementById("n-keywords-list");
          const excludedListElement = document.getElementById("n-excluded-list");
          const fixedListElement = document.getElementById("n-fixed-list");
          keywordsListElement.innerHTML = this.renderKeywordsList({
            searchText: this.searchText,
          });
          excludedListElement.innerHTML = this.renderExcludedList({
            searchText: this.excludedSearchText,
          });
          fixedListElement.innerHTML = this.renderFixedList({
            searchText: this.fixedSearchText,
          });
        })
        this.isProductDataMerged = true;
      }
      this.mergeStats()
    }

    get fullStatsLoaded() {
      return this.#fullStatsLoaded;
    }

    set wordsStatsLoaded(value) {
      this.#wordsStatsLoaded = value;

      if (
        this.#fullStatsLoaded &&
        this.#wordsStatsLoaded &&
        this.#realTimeStatsLoaded &&
        this.#productDataLoaded &&
        this.#productBuyOutDataLoaded
      ) {
        this.mergeStats();
        const keywordsListElement = document.getElementById("n-keywords-list");
        const excludedListElement = document.getElementById("n-excluded-list");
        const fixedListElement = document.getElementById("n-fixed-list");
        keywordsListElement.innerHTML = this.renderKeywordsList({
          searchText: this.searchText,
        });
        excludedListElement.innerHTML = this.renderExcludedList({
          searchText: this.excludedSearchText,
        });

        if (this.#wordsStats.fixed.length) {
          fixedListElement.innerHTML = this.renderFixedList({
            searchText: this.fixedSearchText,
          });
        }
      }
    }

    get wordsStatsLoaded() {
      return this.#wordsStatsLoaded;
    }

    setOnClusterCheckChanged(callback) {
      this.onClusterCheckChanged = callback;
    }

    setOnPosCheckChanged(callback) {
      this.onPosCheckChanged = callback;
    }

    setOnExcludedScanChanged(callback) {
      this.onExcludedScanChanged = callback;
    }

    set showOnlyDanger(value) {
      this.#showOnlyDanger = value;
      const btn = document.getElementById("n-only-danger-btn");
      if (value) {
        btn.classList.add("n-tools-button-active");
      } else {
        btn.classList.remove("n-tools-button-active");
      }
    }

    get showOnlyDanger() {
      return this.#showOnlyDanger;
    }

    set showOnlyActiveClusters(value) {
      this.#showOnlyActiveClusters = value;
      const btn = document.getElementById("n-only-active-btn");
      if (value) {
        btn.classList.add("n-tools-button-active");
      } else {
        btn.classList.remove("n-tools-button-active");
      }
    }

    get showOnlyActiveClusters() {
      return this.#showOnlyActiveClusters;
    }

    set showOnlyOffClusters(value) {
      this.#showOnlyOffClusters = value;
      const btn = document.getElementById("n-only-off-btn");
      if (value) {
        btn.classList.add("n-tools-button-active");
      } else {
        btn.classList.remove("n-tools-button-active");
      }
    }

    get showOnlyOffClusters() {
      return this.#showOnlyOffClusters;
    }

    set showOnlyPKClusters(value) {
      this.#showOnlyPKClusters = value;
      const btn = document.getElementById("n-only-pk-btn");
      if (value) {
        btn.classList.add("n-tools-button-active");
      } else {
        btn.classList.remove("n-tools-button-active");
      }
    }

    get showOnlyPKClusters() {
      return this.#showOnlyPKClusters;
    }

    get showOnlyAutoClusters() {
      return this.#showOnlyAutoClusters;
    }

    set showOnlyAutoClusters(value) {
      this.#showOnlyAutoClusters = value;
      const btn = document.getElementById("n-only-auto-btn");
      if (value) {
        btn.classList.add("n-tools-button-active");
      } else {
        btn.classList.remove("n-tools-button-active");
      }
    }

    get showOnlyNewPhrases() {
      return this.#showOnlyNewPhrases;
    }

    set showOnlyNewPhrases(value) {
      this.#showOnlyNewPhrases = value;
      const btn = document.getElementById("n-only-new-phrases-btn");
      if (value) {
        btn.classList.add("n-tools-button-active");
      } else {
        btn.classList.remove("n-tools-button-active");
      }
    }

    get showOnlyPhrasesWithoutBoost() {
      return this.#showOnlyPhrasesWithoutBoost;
    }

    set showOnlyPhrasesWithoutBoost(value) {
      this.#showOnlyPhrasesWithoutBoost = value;
      const btn = document.getElementById("n-only-without-boost-btn");
      if (value) {
        btn.classList.add("n-tools-button-active");
      } else {
        btn.classList.remove("n-tools-button-active");
      }
    }


    set showOnlyNotFoundClusters(value) {
      this.#showOnlyNotFoundClusters = value;
      const btn = document.getElementById("n-only-not-found-btn");
      if (value) {
        btn.classList.add("n-tools-button-active");
      } else {
        btn.classList.remove("n-tools-button-active");
      }
    }

    get showOnlyNotFoundClusters() {
      return this.#showOnlyNotFoundClusters;
    }

    set showOnlyFoundClusters(value) {
      this.#showOnlyFoundClusters = value;
      const btn = document.getElementById("n-only-found-btn");
      if (value) {
        btn.classList.add("n-tools-button-active");
      } else {
        btn.classList.remove("n-tools-button-active");
      }
    }

    get showOnlyFoundClusters() {
      return this.#showOnlyFoundClusters;
    }

    set showOnlyFixedClusters(value) {
      this.#showOnlyFixedClusters = value;
      const btn = document.getElementById("n-only-fixed-btn");
      if (value) {
        btn.classList.add("n-tools-button-active");
      } else {
        btn.classList.remove("n-tools-button-active");
      }
    }

    get showOnlyFixedClusters() {
      return this.#showOnlyFixedClusters;
    }

    set showOnlyUnfixedClusters(value) {
      this.#showOnlyUnfixedClusters = value;
      const btn = document.getElementById("n-only-unfixed-btn");
      if (value) {
        btn.classList.add("n-tools-button-active");
      } else {
        btn.classList.remove("n-tools-button-active");
      }
    }

    get showOnlyUnfixedClusters() {
      return this.#showOnlyUnfixedClusters;
    }

    set clusterize(value) {
      this.#clusterize = value;
      const btn = document.getElementById("n-clusterize-btn");
      const showFixedBtn = document.getElementById("n-only-fixed-btn");
      const showUnfixedBtn = document.getElementById("n-only-unfixed-btn");
      if (value) {
        btn.classList.add("n-tools-button-active");
        if (window.__NEUROMARKET_AD_TYPE !== "AUTO") {
          showFixedBtn.style.display = "flex";
          showUnfixedBtn.style.display = "flex";
        }
      } else {
        btn.classList.remove("n-tools-button-active");
        showFixedBtn.style.display = "none";
        showUnfixedBtn.style.display = "none";
      }
    }

    get clusterize() {
      return this.#clusterize;
    }

    set isExcludedScanStarted(value) {
      this.#isExcludedScanStarted = value;
      const btn = document.getElementById("n-scan-excluded-btn");
      if (value) {
        btn.classList.add("n-tools-button-active");
        btn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fill-rule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clip-rule="evenodd" />
      </svg>
      Остановить`;
      } else {
        btn.classList.remove("n-tools-button-active");
        btn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fill-rule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clip-rule="evenodd" />
      </svg>
      Сканировать`;
      }
      this.onExcludedScanChanged(value);
    }

    get isExcludedScanStarted() {
      return this.#isExcludedScanStarted;
    }

    set isListsShow(value) {
      this.#isListsShow = value;
      const btn = document.getElementById("n-show-lists-btn");
      const listsElement = document.getElementById("n-custom-lists");
      if (value) {
        btn.classList.add("n-tools-button-active");
        listsElement.style.display = "flex";
      } else {
        btn.classList.remove("n-tools-button-active");
        listsElement.style.display = "none";
        this.#customLists = this.customLists.map((item) => ({
          ...item,
          except: false,
          selected: false,
        }));
        const keywordsListElement = document.getElementById("n-keywords-list");
        keywordsListElement.innerHTML = this.renderKeywordsList();
        this.renderCustomLists();
      }
    }

    get isListsShow() {
      return this.#isListsShow;
    }

    set isClusterCheckStarted(value) {
      this.#isClusterCheckStarted = value;
      const btn = document.getElementById("n-check-clusters-btn");
      if (value) {
        btn.classList.add("n-tools-button-active");
        btn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fill-rule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clip-rule="evenodd" />
      </svg>
      Остановить`;
      } else {
        btn.classList.remove("n-tools-button-active");
        btn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fill-rule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clip-rule="evenodd" />
      </svg>
      Сканировать`;
      }
      this.onClusterCheckChanged(value);
    }

    get isClusterCheckStarted() {
      return this.#isClusterCheckStarted;
    }

    set isPosCheckStarted(value) {
      this.#isPosCheckStarted = value;
      const btn = document.getElementById("n-check-positions-btn");
      if (value) {
        btn.classList.add("n-tools-button-active");
        btn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fill-rule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clip-rule="evenodd" />
      </svg>
      Остановить`;
      } else {
        btn.classList.remove("n-tools-button-active");
        btn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fill-rule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clip-rule="evenodd" />
      </svg>
      Позиции`;
      }
      this.onPosCheckChanged(value);
    }

    get isPosCheckStarted() {
      return this.#isPosCheckStarted;
    }

    get wordsStats() {
      return this.#wordsStats;
    }

    set wordsStats(data) {
      const keywords = [];
      const keywordsSet = new Set();
      data?.keywords?.forEach((item, index) => {
        keywordsSet.add(item.keyword.toLowerCase().trim());
        keywords.push({
          ...item,
          keyword: item.keyword.toLowerCase().trim(),
          index,
          open: false,
          selected: false,
        });
      }) || [];

      const fixed = [];
      data?.plus?.forEach((item, index) => {
        fixed.push({
          keyword: item.toLowerCase().trim(),
          index,
          isExcluded: false,
          isFixed: true,
          selected: false,
        });
      }) || [];

      const excluded = [];
      const excludedSet = new Set();
      data?.excluded?.forEach((item, index) => {
        const isFixed = fixed.find(
          (fixedItem) => fixedItem.keyword === item.keyword
        );
        excludedSet.add(item.toLowerCase().trim());
        excluded.push({
          keyword: item.toLowerCase().trim(),
          index,
          isExcluded: true,
          selected: false,
          isFixed: Boolean(isFixed),
          fixedIndex: Boolean(isFixed) ? isFixed.index : undefined,
        });
      }) || [];

      const resultFixed = [];
      fixed.forEach((newItem) => {
        const inKeywords = keywordsSet.has(newItem.keyword);
        const inExcluded = excludedSet.has(newItem.keyword);
        if (!inKeywords && !inExcluded) {
          keywords.push({
            count: 0,
            keyword: newItem.keyword.toLowerCase().trim(),
            index: keywords.length,
            open: false,
            selected: false,
          });
        }

        let prevItem = this.#wordsStats?.fixed?.find(
          (item) => item.keyword === newItem.keyword
        );
        if (prevItem) {
          resultFixed.push({
            ...newItem,
            ...prevItem,
            index: resultFixed.length,
            selected: false,
            isFixed: true,
          });
        } else {
          prevItem = this.#wordsStats?.keywords?.find(
            (item) => item.keyword === newItem.keyword
          );
          if (prevItem) {
            resultFixed.push({
              ...newItem,
              ...prevItem,
              index: resultFixed.length,
              selected: false,
              isExcluded: false,
              isFixed: true,
            });
          } else {
            resultFixed.push({ ...newItem, index: resultFixed.length });
          }
        }
      });

      const resultKeywords = [];
      keywords.forEach((newItem) => {
        let prevKeyword = this.#wordsStats?.keywords?.find(
          (item) => item.keyword.toLowerCase().trim() === newItem.keyword
        );
        const isFixed = fixed.find((item) => item.keyword === newItem.keyword);
        if (prevKeyword) {
          resultKeywords.push({
            ...prevKeyword,
            ...newItem,
            index: resultKeywords.length,
            selected: false,
            isFixed: Boolean(isFixed),
            fixedIndex: Boolean(isFixed) ? isFixed.index : undefined,
          });
        } else {
          const isExcluded = excluded.some(
            (item) => item.keyword === newItem.keyword
          );
          const isFixed = fixed.find(
            (item) => item.keyword === newItem.keyword
          );
          resultKeywords.push({
            ...newItem,
            index: resultKeywords.length,
            selected: false,
            isExcluded,
            isFixed: Boolean(isFixed),
            fixedIndex: Boolean(isFixed) ? isFixed.index : undefined,
          });
        }
      });

      const resultExcluded = [];
      excluded.forEach((newItem) => {
        let prevItem = this.#wordsStats?.excluded?.find(
          (item) => item.keyword === newItem.keyword
        );
        if (prevItem) {
          resultExcluded.push({
            ...newItem,
            ...prevItem,
            index: resultExcluded.length,
            selected: false,
          });
        } else {
          prevItem = this.#wordsStats?.keywords?.find(
            (item) => item.keyword === newItem.keyword
          );
          if (prevItem) {
            resultExcluded.push({
              ...newItem,
              ...prevItem,
              index: resultExcluded.length,
              selected: false,
              isExcluded: true,
            });
          } else {
            resultExcluded.push({ ...newItem, index: resultExcluded.length });
          }
        }
      });

      if (resultKeywords.length) {
        this.#wordsStats.keywords = resultKeywords;
      } else {
        this.#wordsStats.keywords = keywords;
      }
      if (resultExcluded.length) {
        this.#wordsStats.excluded = resultExcluded;
      } else {
        this.#wordsStats.excluded = excluded;
      }
      if (resultFixed.length) {
        this.#wordsStats.fixed = resultFixed;
      } else {
        this.#wordsStats.fixed = fixed;
      }

      this.#wordsStats.isFixed = data?.fixed;

      if (this.#wordsStats.isFixed && this.#wordsStats.fixed.length) {
        document.getElementById("n-set-fixed-active-status-btn").style.display =
          "none";
        document.getElementById(
          "n-set-fixed-inactive-status-btn"
        ).style.display = "flex";
      } else {
        if (this.#wordsStats.fixed.length) {
          document.getElementById(
            "n-set-fixed-active-status-btn"
          ).style.display = "flex";
        } else {
          document.getElementById(
            "n-set-fixed-active-status-btn"
          ).style.display = "none";
          document.getElementById("n-ad-info-fixed").style.display = "none";
        }
        document.getElementById(
          "n-set-fixed-inactive-status-btn"
        ).style.display = "none";
      }
    }

    async sendKeywords() {
      try {
        const keywords =
          this.#wordsStats?.keywords?.map((item) => item.keyword) || [];
        const excluded =
          this.#wordsStats?.excluded?.map((item) => item.keyword) || [];
        const fixed =
          this.#wordsStats?.fixed?.map((item) => item.keyword) || [];

        const request = await fetch("https://ext.neuromarket.online/add", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            keywords: [...new Set([...keywords, ...excluded, ...fixed])],
          }),
          method: "POST",
        });
      } catch (e) {
        return;
      }
    }

    async deteleCustomList(listId) {
      const request = await fetch(
        `https://ext.neuromarket.online/custom-lists/${listId}/delete`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            campaignId: this.campaignId,
            supplierId: this.supplierId,
            supplierIdExternal: this.supplierRawData?.id,
          }),
          method: "DELETE",
        }
      );

      const listName = this.#customLists.find(
        (list) => list.id === listId
      )?.name;
      if (request.status === 200) {
        Toastify({
          text: `✅ Список "${listName}" удален`,
          duration: 3000,
          newWindow: true,
          gravity: "bottom", // `top` or `bottom`
          position: "center", // `left`, `center` or `right`
          style: {
            background: "linear-gradient(to right, #162033, #253144)",
            fontSize: "0.8em",
            maxWidth: "300px",
            borderRadius: "10px",
            border: "1px solid #334155",
            boxShadow: "0",
          },
          offset: {
            y: 200, // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        }).showToast();
      } else {
        Toastify({
          text: `⚠ Не получилось удалить список "${listName}".
          Попробуйте обновить страницу и повторить действие.`,
          duration: 3000,
          newWindow: true,
          gravity: "bottom", // `top` or `bottom`
          position: "center", // `left`, `center` or `right`
          style: {
            background: "linear-gradient(to right, #162033, #253144)",
            fontSize: "0.8em",
            maxWidth: "300px",
            borderRadius: "10px",
            border: "1px solid #334155",
            boxShadow: "0",
          },
          offset: {
            y: 200, // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        }).showToast();
      }
    }

    async getCustomLists() {
      try {
        const request = await fetch(
          "https://ext.neuromarket.online/custom-lists/get",
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              campaignId: this.campaignId,
              supplierId: this.supplierId,
              supplierIdExternal: this.supplierRawData?.id,
            }),
            method: "POST",
          }
        );

        const response = await request.json();

        const responseChangedNullsToArray = response?.map((list) => ({
          id: Number(list?.id),
          color: list.color,
          name: list.name,
          userId: Number(list?.user_id),
          keywords: list?.keywords === null ? [] : list.keywords,
          selected: false,
          except: false,
        }));

        this.customLists = responseChangedNullsToArray;
      } catch (e) {
        console.log(e);
        return;
      }
    }

    async addCustomList(name) {
      try {
        const color = this.#customListsSelectedColor;
        if (
          !this.userData?.id ||
          !this.supplierId ||
          !this.campaignId ||
          !this.supplierRawData?.id
        ) {
          Toastify({
            text: `⛔ Для начала загрузите статистику по кампании`,
            duration: 3000,
            newWindow: true,
            gravity: "bottom", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            style: {
              background: "linear-gradient(to right, #162033, #253144)",
              fontSize: "0.8em",
              maxWidth: "300px",
              borderRadius: "10px",
              border: "1px solid #334155",
              boxShadow: "0",
            },
            offset: {
              y: 200, // vertical axis - can be a number or a string indicating unity. eg: '2em'
            },
          }).showToast();
          return;
        }

        const request = await fetch(
          "https://ext.neuromarket.online/custom-lists/add",
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              color,
              campaignId: this.campaignId,
              supplierId: this.supplierId,
              supplierIdExternal: this.supplierRawData?.id,
              userId: this.userData?.id,
            }),
            method: "POST",
          }
        );

        if (request.status !== 200) {
          Toastify({
            text: `⛔ Ошибка создания списка. Попробуйте повторить попытку позже.`,
            duration: 3000,
            newWindow: true,
            gravity: "bottom", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            style: {
              background: "linear-gradient(to right, #162033, #253144)",
              fontSize: "0.8em",
              maxWidth: "300px",
              borderRadius: "10px",
              border: "1px solid #334155",
              boxShadow: "0",
            },
            offset: {
              y: 200, // vertical axis - can be a number or a string indicating unity. eg: '2em'
            },
          }).showToast();
          return false;
        }

        if (request.status === 200) {
          Toastify({
            text: `✅ Список "${name}" успешно создан.`,
            duration: 3000,
            newWindow: true,
            gravity: "bottom", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            style: {
              background: "linear-gradient(to right, #162033, #253144)",
              fontSize: "0.8em",
              maxWidth: "300px",
              borderRadius: "10px",
              border: "1px solid #334155",
              boxShadow: "0",
            },
            offset: {
              y: 200, // vertical axis - can be a number or a string indicating unity. eg: '2em'
            },
          }).showToast();

          return true;
        }
      } catch (e) {
        console.log(e);
      }
    }

    async setCustomListKeywords(listId, keywords) {
      try {
        const list = this.customLists.find((list) => list.id === listId);
        const listName = list.name;
        const request = await fetch(
          `https://ext.neuromarket.online/custom-lists/${listId}/set-keywords`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              keywords: [...new Set(keywords)],
              campaignId: this.campaignId,
              supplierId: this.supplierId,
              supplierIdExternal: this.supplierRawData?.id,
              userId: this.userData?.id,
            }),
            method: "PUT",
          }
        );

        if (request.status !== 200) {
          return false;
        }

        if (request.status === 200) {
          return true;
        }
      } catch (e) {
        console.log(e);
      }
    }

    async clusterizeKeywords() {
      try {
        const keywords =
          this.#wordsStats?.keywords?.map((item) => item.keyword) || [];
        const excluded =
          this.#wordsStats?.excluded?.map((item) => item.keyword) || [];
        const fixed =
          this.#wordsStats?.fixed?.map((item) => item.keyword) || [];

        const request = await fetch(
          "https://ext.neuromarket.online/clusterize-v4",
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              keywords: [...new Set([...keywords, ...excluded, ...fixed])],
              campaign_id: this.campaignId,
              supplier_id: this.supplierId,
              campaign_type:
                AD_TYPES_BY_NAME[window.__NEUROMARKET_AD_TYPE] || 0,
              campaign_name: this.placement?.name,
              campaign_placement: this.placement,
            }),
            method: "POST",
          }
        );

        const response = await request.json();
        this.clustersRaw = response;
        this.matchKeywordsToClusters();
      } catch (e) {
        console.log(e);
        return;
      }
    }

    async matchKeywordsToClusters() {
      this.clustersRaw?.forEach((resItem) => {
        let idx = this.#wordsStats?.keywords.findIndex(
          (item) => item.keyword === resItem.keyword
        );

        const fixedIdx = this.#wordsStats.fixed.findIndex(
          (item) => item.keyword === resItem.keyword
        );

        if (fixedIdx !== -1) {
          this.#wordsStats.fixed[fixedIdx].metadata = {
            catalog_type: resItem.catalog_type,
            catalog_value: resItem.catalog_value,
          };
          this.#wordsStats.fixed[fixedIdx].isMerger = resItem.is_merger;
          this.#wordsStats.fixed[fixedIdx].isSubject = resItem.is_subject;
          this.#wordsStats.fixed[fixedIdx].presetId = Number(
            resItem.cluster_id
          );
          this.#wordsStats.fixed[fixedIdx].views = {
            loaded: true,
            count: Number(resItem.wb_views),
            cluster_count: Number(resItem.max_views),
          };
        }

        if (idx === -1) {
          idx = this.#wordsStats?.excluded.findIndex(
            (item) => item.keyword === resItem.keyword
          );
          if (idx === -1) return;

          this.#wordsStats.excluded[idx].metadata = {
            catalog_type: resItem.catalog_type,
            catalog_value: resItem.catalog_value,
          };
          this.#wordsStats.excluded[idx].isMerger = resItem.is_merger;
          this.#wordsStats.excluded[idx].isSubject = resItem.is_subject;
          this.#wordsStats.excluded[idx].presetId = Number(resItem.cluster_id);
          this.#wordsStats.excluded[idx].views = {
            loaded: true,
            count: Number(resItem.wb_views),
            cluster_count: Number(resItem.max_views),
          };
          return;
        }
        this.#wordsStats.keywords[idx].metadata = {
          catalog_type: resItem.catalog_type,
          catalog_value: resItem.catalog_value,
        };
        this.#wordsStats.keywords[idx].isMerger = resItem.is_merger;
        this.#wordsStats.keywords[idx].isSubject = resItem.is_subject;
        this.#wordsStats.keywords[idx].presetId = Number(resItem.cluster_id);
        this.#wordsStats.keywords[idx].views = {
          loaded: true,
          count: Number(resItem.wb_views),
          cluster_count: Number(resItem.max_views),
        };
      });
    }

    async loadKeywordsViews(retry = 0) {
      try {
        const keywords =
          this.#wordsStats?.keywords?.map((item) => item.keyword) || [];
        const excluded =
          this.#wordsStats?.excluded?.map((item) => item.keyword) || [];

        const request = await fetch("https://ext.neuromarket.online/views", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ keywords: [...keywords, ...excluded] }),
          method: "POST",
        });

        if (request.status !== 200) {
          throw new Error("loadKeywordsViews");
        }

        const response = await request.json();

        response?.forEach((resItem) => {
          let idx = this.#wordsStats?.keywords.findIndex(
            (item) => item.keyword === resItem.keyword
          );

          if (idx === -1) {
            idx = this.#wordsStats?.excluded.findIndex(
              (item) => item.keyword === resItem.keyword
            );
            if (idx === -1) return;

            this.#wordsStats.excluded[idx].views = {
              loaded: true,
              count: resItem.wb_views,
            };
            return;
          }
          this.#wordsStats.keywords[idx].views = {
            loaded: true,
            count: resItem.wb_views,
          };
        });

        return true;
      } catch (e) {
        if (retry < MAX_RETRIES) {
          await delay(REQUEST_DELAY);
          return this.loadKeywordsViews(retry + 1);
        } else {
          return false;
        }
      }
    }

    async loadWordsStats(retry = 0) {
      try {
        const adType = window.__NEUROMARKET_AD_TYPE;
        const endpoints = {
          AUTO: `/api/v1/advert/${this.campaignId}/stat-words`,
          SEARCH: `/api/v2/search/${this.campaignId}/stat-words`,
          SEACAT: `/api/v1/advert/${this.campaignId}/stat-words`,
        };
        const URL = endpoints[adType];
        const request = await fetch(URL, {
          headers: {
            Authorizev3: this.accessToken,
            accept: "*/*",
            "accept-language":
              "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6,zh-TW;q=0.5,zh;q=0.4",
            "cache-control": "no-cache",
            "x-supplierid": this?.supplierId,
          },
          referrer: `https://cmp-new.wildberries.ru/campaigns/edit/${this.campaignId}`,
          referrerPolicy: "strict-origin-when-cross-origin",
          method: "GET",
          mode: "cors",
          credentials: "include",
        });

        if (request.status !== 200) {
          throw new Error("loadWordsStats");
        }

        const data = await request.json();
        this.wordsStats = data.words || data;

        this.wordsStatsLoaded = true;
        this.matchKeywordsToClusters();
        return true;
      } catch (e) {
        console.log(e);
        if (retry < MAX_RETRIES) {
          await delay(REQUEST_DELAY);
          return this.loadWordsStats(retry + 1);
        } else {
          return false;
        }
      }
    }

    async exportXlsx() {
      if (window.XLSX === undefined) {
        await import("../libs/xlsx.min.js");
      }
      this.renderKeywordsList();
      const columns = [
        "Ключевые фразы",
        "Кластер",
        "Тип РК",
        "Органика",
        "Буст",
        "Показы",
        "Клики",
        "CTR",
        "CPC",
        "Затраты",
      ];

      const rows = [];
      const minusRows = [];
      const fixRows = [];

      this.keywordsToExport.forEach((item) => {
        const organicPosition = item?.positions?.boosted_from
          ? item?.positions?.boosted_from
          : item?.positions?.position > -1
            ? item?.positions?.position
            : "";

        const boostPosition = item?.positions?.boosted_from
          ? item?.positions?.position
          : "";

        const adType = item?.positions?.logs
          ? item?.positions?.type !== "c"
            ? "АРК"
            : "Аукцион"
          : "";

        let obj = {
          "Ключевые фразы": item.keyword,
          Частота: item?.views?.count || "",
          "Σ Частота": item?.views?.cluster_count || "",
          Кластер: item?.presetId,
          "Тип РК": adType,
          Органика: organicPosition,
          Буст: boostPosition,
        };
        if (
          this.fullStatsLoaded &&
          (this.datePickerFrom.selectedDates.length ||
            this.datePickerTo.selectedDates.length)
        ) {
          let count = 0;
          let clicks = 0;
          let money = 0;
          let ctr = 0;
          let cpc = 0;

          if (this.clusterize) {
            for (const child of item?.child) {
              for (const [key, value] of [...child?.dates]) {
                count += value.count;
                clicks += value.clicks;
                money += value.money;
              }
            }
          } else {
            for (const [key, value] of [...item?.dates]) {
              count += value.count;
              clicks += value.clicks;
              money += value.money;
            }
          }
          ctr =
            clicks && count
              ? Math.round(((clicks / count) * 100 + Number.EPSILON) * 100) /
              100
              : 0;

          cpc =
            money && clicks
              ? Math.round((money / clicks) * 100 + Number.EPSILON) / 100
              : 0;

          obj = {
            ...obj,
            Показы: count,
            Клики: clicks,
            CTR: ctr,
            CPC: cpc,
            Затраты: money,
          };
        } else {
          if (this.clusterize) {
            obj = {
              ...obj,
              Показы: item?.total_count,
              Клики: item?.total_clicks || 0,
              CTR:
                Math.round((item?.total_ctr + Number.EPSILON) * 100) / 100 || 0,
              CPC:
                Math.round((item?.total_cpc + Number.EPSILON) * 100) / 100 || 0,
              Затраты:
                Math.round((item?.total_money + Number.EPSILON) * 100) / 100 ||
                0,
            };
          } else {
            obj = {
              ...obj,
              Показы: item?.count,
              Клики: item?.clicks || 0,
              CTR: Math.round((item?.ctr + Number.EPSILON) * 100) / 100 || 0,
              CPC: Math.round((item?.cpc + Number.EPSILON) * 100) / 100 || 0,
              Затраты:
                Math.round((item?.money + Number.EPSILON) * 100) / 100 || 0,
            };
          }
        }
        if (item?.isFixed) {
          fixRows.push(obj);
        }
        rows.push(obj);
      });
      this.excludedToExport.forEach((item) => {
        const organicPosition = item?.positions?.boosted_from
          ? item?.positions?.boosted_from
          : item?.positions?.position > -1
            ? item?.positions?.position
            : "";

        const boostPosition = item?.positions?.boosted_from
          ? item?.positions?.position
          : "";

        let obj = {
          "Ключевые фразы": item.keyword,
          Частота: item?.views?.count || "",
          "Σ Частота": item?.views?.cluster_count || "",
          Кластер: item?.presetId,
          Органика: organicPosition,
          Буст: boostPosition,
        };
        if (
          this.fullStatsLoaded &&
          (this.datePickerFrom.selectedDates.length ||
            this.datePickerTo.selectedDates.length)
        ) {
          let count = 0;
          let clicks = 0;
          let money = 0;
          let ctr = 0;
          let cpc = 0;

          for (const [key, value] of [...item?.dates]) {
            count += value.count;
            clicks += value.clicks;
            money += value.money;
          }
          ctr =
            clicks && count
              ? Math.round(((clicks / count) * 100 + Number.EPSILON) * 100) /
              100
              : 0;

          cpc =
            money && clicks
              ? Math.round((money / clicks) * 100 + Number.EPSILON) / 100
              : 0;

          obj = {
            ...obj,
            Показы: count,
            Клики: clicks,
            CTR: ctr,
            CPC: cpc,
            Затраты: money,
          };
        } else {
          obj = {
            ...obj,
            Показы: item?.count,
            Клики: item?.clicks || 0,
            CTR: Math.round((item?.ctr + Number.EPSILON) * 100) / 100 || 0,
            CPC: Math.round((item?.cpc + Number.EPSILON) * 100) / 100 || 0,
            Затраты:
              Math.round((item?.money + Number.EPSILON) * 100) / 100 || 0,
          };
        }
        minusRows.push(obj);
      });
      const wb = XLSX.utils.book_new();
      const ws1 = XLSX.utils.json_to_sheet(rows, {
        header: columns,
      });
      const ws2 = XLSX.utils.json_to_sheet(minusRows, {
        header: columns,
      });
      const ws3 = XLSX.utils.json_to_sheet(fixRows, {
        header: columns,
      });
      XLSX.utils.book_append_sheet(wb, ws1, `Статистика`);
      XLSX.utils.book_append_sheet(wb, ws2, `Минус-Фразы`);
      XLSX.utils.book_append_sheet(wb, ws3, `Фикс-Фразы`);
      XLSX.writeFile(wb, `Статистика РК — ${this.campaignId}.xlsx`, {
        cellStyles: true,
      });
    }

    async exportDaysXlsx() {
      if (window.XLSX === undefined) {
        await import("../libs/xlsx.min.js");
      }

      let dates = Object.entries(this.datesStats);
      dates.sort((a, b) => Date.parse(b[0]) - Date.parse(a[0]));

      const topHeader = [
        "",
        "Статистика",
        "",
        "",
        "",
        "",
        "",
        "Рекламная Воронка",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "Рекламные метрики",
        "",
        "",
        "",
        "",
        "",
        "Общая Воронка",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "Общие метрики",
        "",
        "",
        "",
        "",
        "",
        "Статистика Поиска",
        "",
        "",
        "",
        "",
        "",
        "Статистика Каталога",
        "",
        "",
        "",
        "",
        "",
        "",
        "Статистика Полок",
        "",
        "",
        "",
        "",
        "",
        "",
      ];

      const header = [
        "Даты",
        "Показы",
        "Клики",
        "CTR",
        "CPC",
        "CPM",
        "Затраты",
        "Корзины",
        "Конверсия в корзину",
        "Заказы",
        "Конверсия в заказ",
        "Заказов на сумму",
        "Продажи",
        "Конверсия в продажу",
        "Продаж на сумму",
        "Кликов %",
        "Позиция",
        "CPO",
        "CPS",
        "oER",
        "ER",
        "Отложенные",
        "Корзины",
        "Конверсия в корзину",
        "Заказы",
        "Конверсия в заказ",
        "Заказов на сумму",
        "Продажи",
        "Конверсия в продажу",
        "Продаж на сумму",
        "Цена без СПП",
        "Открытий",
        "Σ CPO",
        "Σ CPS",
        "Σ oER",
        "Σ ER",
        "Показы",
        "Клики",
        "CTR",
        "CPC",
        "CPM",
        "Затраты",
        "Показы",
        "Клики",
        "Доля",
        "CTR",
        "CPC",
        "CPM",
        "Затраты",
        "Показы",
        "Клики",
        "Доля",
        "CTR",
        "CPC",
        "CPM",
        "Затраты",
      ];

      const rows = dates.map(([date]) => [
        date,
        this.datesCalculatedStats[date].totals.views,
        this.datesCalculatedStats[date].totals.clicks,
        this.datesCalculatedStats[date].totals.ctr,
        this.datesCalculatedStats[date].totals.cpc,
        this.datesCalculatedStats[date].totals.cpm,
        this.datesCalculatedStats[date].totals.money,
        this.datesCalculatedStats[date].addToCartWithAdRate,
        this.datesCalculatedStats[date].addToCartConversionRealTime,
        this.datesCalculatedStats[date].ordersWithAdRate,
        this.datesCalculatedStats[date].ordersConversionRealTime,
        this.datesCalculatedStats[date].ordersSumWithAdRate,
        this.datesCalculatedStats[date].salesWithAdRate,
        this.datesCalculatedStats[date].buyOutPercent,
        this.datesCalculatedStats[date].salesSumWithAdRate,
        this.datesCalculatedStats[date].adClicksRate,
        this.datesCalculatedStats[date].totals.avgBoost,
        this.datesCalculatedStats[date].cpo,
        this.datesCalculatedStats[date].cps,
        this.datesCalculatedStats[date].ero,
        this.datesCalculatedStats[date].er,
        this.datesCalculatedStats[date].wishList,
        this.datesCalculatedStats[date].addToCart,
        this.datesCalculatedStats[date].addToCartConversion,
        this.datesCalculatedStats[date].orders,
        this.datesCalculatedStats[date].ordersConversion,
        this.datesCalculatedStats[date].ordersSum,
        this.datesCalculatedStats[date].sales,
        this.datesCalculatedStats[date].buyOutPercent,
        this.datesCalculatedStats[date].salesSum,
        this.datesCalculatedStats[date].priceNoSpp,
        this.datesCalculatedStats[date].openCard,
        this.datesCalculatedStats[date].eCpo,
        this.datesCalculatedStats[date].eCps,
        this.datesCalculatedStats[date].eEro,
        this.datesCalculatedStats[date].eEr,
        this.datesCalculatedStats[date].search.views,
        this.datesCalculatedStats[date].search.clicks,
        this.datesCalculatedStats[date].search.ctr,
        this.datesCalculatedStats[date].search.cpc,
        this.datesCalculatedStats[date].search.cpm,
        this.datesCalculatedStats[date].search.money,
        this.datesCalculatedStats[date].catalog.views,
        this.datesCalculatedStats[date].catalog.clicks,
        this.datesCalculatedStats[date].catalog.percent,
        this.datesCalculatedStats[date].catalog.ctr,
        this.datesCalculatedStats[date].catalog.cpc,
        this.datesCalculatedStats[date].catalog.cpm,
        this.datesCalculatedStats[date].catalog.money,
        this.datesCalculatedStats[date].shelf.views,
        this.datesCalculatedStats[date].shelf.clicks,
        this.datesCalculatedStats[date].shelf.percent,
        this.datesCalculatedStats[date].shelf.ctr,
        this.datesCalculatedStats[date].shelf.cpc,
        this.datesCalculatedStats[date].shelf.cpm,
        this.datesCalculatedStats[date].shelf.money,
      ]);

      const data = [topHeader, header, ...rows];

      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet(data);
      ws["!merges"] = [
        XLSX.utils.decode_range("B1:G1"),
        XLSX.utils.decode_range("H1:O1"),
        XLSX.utils.decode_range("P1:U1"),
        XLSX.utils.decode_range("V1:AC1"),
        XLSX.utils.decode_range("AD1:AI1"),
        XLSX.utils.decode_range("AJ1:AO1"),
        XLSX.utils.decode_range("AP1:AV1"),
        XLSX.utils.decode_range("AW1:BC1"),
      ];

      XLSX.utils.book_append_sheet(wb, ws, `Статистика`);
      XLSX.writeFile(wb, `Статистика по дням РК — ${this.campaignId}.xlsx`, {
        cellStyles: true,
      });
    }

    get realTimeStatsLoaded() {
      return this.#realTimeStatsLoaded;
    }

    set realTimeStatsLoaded(value) {
      this.#realTimeStatsLoaded = value;
      if (
        this.#fullStatsLoaded &&
        this.#realTimeStatsLoaded &&
        this.#wordsStatsLoaded &&
        this.#productDataLoaded &&
        this.#productBuyOutDataLoaded
      ) {
        this.mergeStats();
        if (this.#productDataLoaded && this.#productBuyOutDataLoaded) {
          this.isProductDataMerged = true;
        }
      }
    }

    async loadRealTimeData() {
      // if (!this.realTimeInterval) {
      //   this.realTimeInterval = setInterval(
      //     () => this.loadRealTimeData(),
      //     300000
      //   );
      // }

      const adLoader = document.getElementById("n-ad-loader");
      adLoader.style.display = "block";

      const requests = [this.loadFullStatsRealtime()];
      if (window.__NEUROMARKET_AD_TYPE === "AUTO") {
        requests.push(this.getCPM());
      }
      if (window.__NEUROMARKET_AD_TYPE === "SEARCH") {
        requests.push(this.getBudget());
      }
      if (window.__NEUROMARKET_AD_TYPE === "SEACAT") {
        requests.push(this.getBudget());
      }

      const data = await Promise.all(requests);

      const [stats] = data;

      stats?.content?.days?.forEach((day) => {
        const date = day.date.split("T")[0];
        this.realTimeStats[date] = day;
      });

      const today = new Date();
      const todayString =
        today.getFullYear() +
        "-" +
        zeroPad(today.getMonth() + 1, 2) +
        "-" +
        zeroPad(today.getDate(), 2);

      const foundDayStats = this?.realTimeStats?.[todayString];

      if (foundDayStats === undefined) {
        document.getElementById("n-ad-info-fixed").style.display = "none";
        document.getElementById("n-ad-info-views").style.display = "none";
        document.getElementById("n-ad-info-clicks").style.display = "none";
        document.getElementById("n-ad-info-ctr").style.display = "none";
        document.getElementById("n-ad-info-cpc").style.display = "none";
        document.getElementById("n-ad-info-money").style.display = "none";
      } else {
        document.getElementById("n-ad-info-views").style.display = "flex";
        document.getElementById("n-ad-info-clicks").style.display = "flex";
        document.getElementById("n-ad-info-ctr").style.display = "flex";
        document.getElementById("n-ad-info-cpc").style.display = "flex";
        document.getElementById("n-ad-info-money").style.display = "flex";
      }
      if (
        ["SEACAT", "SEARCH"].includes(window.__NEUROMARKET_AD_TYPE) &&
        this.#wordsStats.isFixed &&
        this.#wordsStats.fixed.length
      ) {
        document.getElementById("n-ad-info-fixed").style.display = "flex";
      }

      const status = this.placement?.status;
      let budget = 0;

      if (window.__NEUROMARKET_AD_TYPE === "AUTO") {
        budget = this.placement?.budget;
      }
      if (window.__NEUROMARKET_AD_TYPE === "SEARCH") {
        budget = this.BUDGET.total;
      }
      if (window.__NEUROMARKET_AD_TYPE === "SEACAT") {
        budget = this.BUDGET.total;
      }

      const views = foundDayStats?.views || 0;
      const clicks = foundDayStats?.clicks || 0;
      const money = foundDayStats?.sum || 0;
      const ctr =
        clicks > 0 ? Number(precise.toFixed((clicks / views) * 100, 2)) : 0;
      const cpc = clicks > 0 ? Number(precise.toFixed(money / clicks, 2)) : 0;

      const adStatus = document.getElementById("n-ad-status");
      const adStatusCircle = document.getElementById("n-ad-status-circle");
      const adStatusText = document.getElementById("n-ad-status-text");

      if (status === 9) {
        adStatus.classList.value = "n-ad-status-green";
        adStatusCircle.classList.value = "n-ad-status-circle-green";
        adStatusText.innerText = "Активна";
      } else {
        adStatus.classList.value = "n-ad-status-red";
        adStatusCircle.classList.value = "n-ad-status-circle-red";
        adStatusText.innerText = "Отключена";
      }

      const adBudget = document.getElementById("n-ad-budget-text");
      const adCpm = document.getElementById("n-ad-cpm-text");
      const adViews = document.getElementById("n-ad-views-text");
      const adClicks = document.getElementById("n-ad-clicks-text");
      const adCtr = document.getElementById("n-ad-ctr-text");
      const adCpc = document.getElementById("n-ad-cpc-text");
      const adMoney = document.getElementById("n-ad-money-text");
      adBudget.innerText = budget;

      if (window.__NEUROMARKET_AD_TYPE === "AUTO") {
        adCpm.innerText = this.#placement?.nms[0]?.cpm;
      }
      if (window.__NEUROMARKET_AD_TYPE === "SEARCH") {
        adCpm.innerText = this.#placement?.place[0]?.price;
      }
      if (window.__NEUROMARKET_AD_TYPE === "SEACAT") {
        adCpm.innerText =
          this.#placement?.subjects[0]?.nms[0]?.cpm ||
          this.#placement?.subjects[0]?.search?.price;
      }

      adViews.innerText = views;
      adClicks.innerText = clicks;
      adCtr.innerText = ctr;
      adCpc.innerText = cpc;
      adMoney.innerText = money;
      adLoader.style.display = "none";

      if (stats?.content === undefined) {
        this.realTimeStatsLoaded = false;
        setTopLoading(false, "Ошибка загрузки Кликов, CTR и Затрат");
        return Promise.reject();
      } else {
        this.realTimeStatsLoaded = true;
      }
    }

    async getBudget() {
      try {
        const adType = window.__NEUROMARKET_AD_TYPE;
        const endpoints = {
          AUTO: `/api/v2/auto/${this.campaignId}/budget`,
          SEARCH: `/api/v2/search/${this.campaignId}/budget`,
          CATALOG: `/api/v2/catalog/${this.campaignId}/budget`,
          CAROUSEL: `/api/v2/carousel-auction/${this.campaignId}/budget`,
          SEACAT: `/api/v2/seacat/${this.campaignId}/budget`,
        };
        const request = await fetch(endpoints[adType], {
          headers: {
            Authorizev3: this.accessToken,
            "x-supplierid": this?.supplierId,
          },
          referrer: `https://cmp.wildberries.ru/campaigns/statistics/details/${this.campaignId}`,
          referrerPolicy: "strict-origin-when-cross-origin",
          body: null,
          method: "GET",
          mode: "cors",
          credentials: "include",
        });

        const response = await request.json();
        this.BUDGET = response;
        return response;
      } catch (e) {
        console.log(e);
      }
    }

    get productDataLoaded() {
      return this.#productDataLoaded;
    }

    set productDataLoaded(value) {
      this.#productDataLoaded = value;
      if (
        this.#fullStatsLoaded &&
        this.#realTimeStatsLoaded &&
        this.#wordsStatsLoaded &&
        this.#productDataLoaded &&
        this.#productBuyOutDataLoaded
      ) {
        this.mergeStats();
        this.isProductDataMerged = true;
      }
    }

    get productSalesFunnelDataLoaded() {
      return this.#productSalesFunnelDataLoaded;
    }

    set productSalesFunnelDataLoaded(value) {
      this.#productSalesFunnelDataLoaded = value;
    }

    get productBuyOutDataLoaded() {
      return this.#productBuyOutDataLoaded;
    }

    set productBuyOutDataLoaded(value) {
      this.#productBuyOutDataLoaded = value;
      if (
        this.#fullStatsLoaded &&
        this.#realTimeStatsLoaded &&
        this.#wordsStatsLoaded &&
        this.#productDataLoaded &&
        this.#productBuyOutDataLoaded
      ) {
        this.mergeStats();
        this.isProductDataMerged = true;
      }
    }

    set isProductDataMerged(value) {
      this.#isProductDataMerged = value;
      if (value) {
        document.getElementById("n-dates-list").innerHTML =
          this.renderDatesListv2();
        document
          .getElementById("n-export-days-btn")
          .addEventListener("click", () => this.exportDaysXlsx());
        document.getElementById("n-dates-table").style.display = "flex";
        const dateCells = [...document.getElementsByClassName("n-date-cell")];
        for (let i = 0; i < dateCells.length; i++) {
          const date = dateCells[i].dataset.date;
          dateCells[i].addEventListener("click", () => {
            this.datePickerFrom.selectDate(new Date(date));
            this.datePickerTo.selectDate(new Date(date));
          });
        }
        tippy("[data-tip]", {
          content(reference) {
            const desc = reference.getAttribute("data-tip");
            return `
            <div class="n-column-tip">
              ${desc}
            </div>
            `;
          },
          arrow: false,
          followCursor: false,
          placement: "top",
          allowHTML: true,
        });
      }
    }

    get isProductDataMerged() {
      return this.#isProductDataMerged;
    }

    get productDataLoadError() {
      return this.#productDataLoadError;
    }

    set productDataLoadError(value) {
      this.#productDataLoadError = value;
      if (value) {
        document
          .getElementById("n-product-analytics-help-message")
          .setAttribute("style", "display:flex !important");
      } else {
        document
          .getElementById("n-product-analytics-help-message")
          .setAttribute("style", "display:none !important");
      }
    }

    get productSalesFunnelDataLoadError() {
      return this.#productSalesFunnelDataLoadError;
    }

    set productSalesFunnelDataLoadError(value) {
      this.#productSalesFunnelDataLoadError = value;
      if (value) {
        document
          .getElementById("n-product-analytics-help-message")
          .setAttribute("style", "display:flex !important");
      } else {
        document
          .getElementById("n-product-analytics-help-message")
          .setAttribute("style", "display:none !important");
      }
    }

    loadProductAnalytics() {
      const timeout = setTimeout(() => {
        this.productDataLoadError = true;
      }, 10000);
      const onResponse = (response) => {
        clearTimeout(timeout);
        if (!response?.error) {
          response.data.chartData.pcs = response.data.chartData.pcs.reverse();
          response.data.chartData.currency =
            response.data.chartData.currency.reverse();
          this.rawProductData = response;
          this.productDataLoaded = true;
          this.productDataLoadError = false;
        } else {
          this.productDataLoadError = true;
        }
      };
      const dateTo = new Date();

      let dateFromOriginal = new Date(this.#placement.createDate);
      let dateFromLimited = new Date();

      let dateFrom;

      if (this.onlySevenDays || this.onlySevenDays === null) {
        dateFromLimited.setDate(dateFromLimited.getDate() - 14); //TODO вернуть 6
      } else {
        dateFromLimited.setDate(dateFromLimited.getDate() - 30);
      }

      dateFrom = dateFromLimited;

      if (Date.parse(dateFromOriginal) > Date.parse(dateFromLimited)) {
        dateFrom = dateFromOriginal;
      }

      const dateStringFrom =
        dateFrom.getFullYear() +
        "-" +
        zeroPad(dateFrom.getMonth() + 1, 2) +
        "-" +
        zeroPad(dateFrom.getDate(), 2);

      const dateStringTo =
        dateTo.getFullYear() +
        "-" +
        zeroPad(dateTo.getMonth() + 1, 2) +
        "-" +
        zeroPad(dateTo.getDate(), 2);
      let productId;
      if (window.__NEUROMARKET_AD_TYPE === "AUTO") {
        productId = Engine.placement.nms[0].nm;
      }
      if (window.__NEUROMARKET_AD_TYPE === "SEARCH") {
        productId = Engine.placement.place[0].searchElements[0].nm;
      }
      if (window.__NEUROMARKET_AD_TYPE === "SEACAT") {
        productId = Engine.placement.subjects[0].nms[0].nm;
      }

      const options = {
        headers: {
          accept: "*/*",
          "content-type": "application/json",
        },
        referrer: "https://seller.wildberries.ru/",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: `{"start":"${dateStringFrom}","end":"${dateStringTo}","aggregationLevel":"day","nmIDs":[${productId}],"subjectIDs":[],"brandNames":[],"tags":[],"skipDeletedNm":false,"stockType":""}`,
        method: "POST",
        mode: "cors",
        credentials: "include",
      }

      if (WB_AUTH_V3) {
        options.headers['AuthorizeV3'] = WB_AUTH_V3
      }

      window.chrome.runtime.sendMessage(
        NEUROMARKET_CHROME_ID,
        {
          type: "fetchJson",
          url: "https://seller-content.wildberries.ru/ns/analytics-api/content-analytics/api/v1/summary/sales-funnel",
          options,
        },
        onResponse
      );
    }

    loadProductSalesFunnel() {
      const timeout = setTimeout(() => {
        this.productSalesFunnelDataLoadError = true;
      }, 10000);

      const onResponse = (response) => {
        clearTimeout(timeout);
        if (!response?.error) {
          this.rawProductSalesFunnelData = response.data;
          this.productSalesFunnelDataLoaded = true;
          this.productSalesFunnelDataLoadError = false;
        } else {
          this.productSalesFunnelDataLoadError = true;
        }
      };
      const dateTo = new Date();

      let dateFromOriginal = new Date(this.#placement.createDate);
      let dateFromLimited = new Date();

      let dateFrom;

      if (this.onlySevenDays || this.onlySevenDays === null) {
        dateFromLimited.setDate(dateFromLimited.getDate() - 14); //TODO вернуть 6
      } else {
        dateFromLimited.setDate(dateFromLimited.getDate() - 30);
      }

      dateFrom = dateFromLimited;

      if (Date.parse(dateFromOriginal) > Date.parse(dateFromLimited)) {
        dateFrom = dateFromOriginal;
      }

      const dateStringFrom =
        dateFrom.getFullYear() +
        "-" +
        zeroPad(dateFrom.getMonth() + 1, 2) +
        "-" +
        zeroPad(dateFrom.getDate(), 2);

      const dateStringTo =
        dateTo.getFullYear() +
        "-" +
        zeroPad(dateTo.getMonth() + 1, 2) +
        "-" +
        zeroPad(dateTo.getDate(), 2);
      let productId;
      if (window.__NEUROMARKET_AD_TYPE === "AUTO") {
        productId = Engine.placement.nms[0].nm;
      }
      if (window.__NEUROMARKET_AD_TYPE === "SEARCH") {
        productId = Engine.placement.place[0].searchElements[0].nm;
      }
      if (window.__NEUROMARKET_AD_TYPE === "SEACAT") {
        productId = Engine.placement.subjects[0].nms[0].nm;
      }

      const body = {
        "currentPeriod": {
          "start": dateStringFrom,
          "end": dateStringTo
        },
        "subjects": [],
        "brands": [],
        "nms": [productId],
        "tagIds": [],
        "skipDeletedNm": false,
        "orderBy": { "field": "orders", "mode": "desc" }
      }

      const options = {
        headers: {
          accept: "*/*",
          "content-type": "application/json",
        },
        referrer: "https://seller.wildberries.ru/",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: JSON.stringify(body),
        method: "POST",
        mode: "cors",
        credentials: "include",
      }

      if (WB_AUTH_V3) {
        options.headers['AuthorizeV3'] = WB_AUTH_V3
      }

      window.chrome.runtime.sendMessage(
        NEUROMARKET_CHROME_ID,
        {
          type: "fetchJson",
          url: "https://seller-content.wildberries.ru/ns/analytics-api/content-analytics/api/v1/sales-funnel/report",
          options,
        },
        onResponse
      );
    }

    loadProductBuyOutPercent() {
      const timeout = setTimeout(() => {
        this.productDataLoadError = true;
      }, 10000);
      const onResponse = (response) => {
        clearTimeout(timeout);
        if (!response?.error) {
          this.rawProductBuyOutData = response;
          this.productBuyOutDataLoaded = true;
        } else {
          this.productDataLoadError = true;
        }
      };
      const yearBeforeDate = new Date()
      yearBeforeDate.setDate(yearBeforeDate.getDate() - 180);
      let dateFrom = yearBeforeDate;

      // if (Date.parse(yearBeforeDate) > Date.parse(dateFrom)) {
      //   dateFrom = yearBeforeDate;
      // } else {
      //   dateFrom.setDate(dateFrom.getDate() - 14);
      // }
      const dateTo = new Date();

      const dateStringFrom =
        dateFrom.getFullYear() +
        "-" +
        zeroPad(dateFrom.getMonth() + 1, 2) +
        "-" +
        zeroPad(dateFrom.getDate(), 2);
      const dateStringTo =
        dateTo.getFullYear() +
        "-" +
        zeroPad(dateTo.getMonth() + 1, 2) +
        "-" +
        zeroPad(dateTo.getDate(), 2);
      let productId;
      if (window.__NEUROMARKET_AD_TYPE === "AUTO") {
        productId = Engine.placement.nms[0].nm;
      }
      if (window.__NEUROMARKET_AD_TYPE === "SEARCH") {
        productId = Engine.placement.place[0].searchElements[0].nm;
      }
      if (window.__NEUROMARKET_AD_TYPE === "SEACAT") {
        productId = Engine.placement.subjects[0].nms[0].nm;
      }

      const options = {
        headers: {
          accept: "*/*",
          "accept-language":
            "en-US,en;q=0.9,ru-RU;q=0.8,ru;q=0.7,zh-CN;q=0.6,zh-TW;q=0.5,zh;q=0.4",
          "content-type": "application/json",
          "sec-ch-ua":
            '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
        },
        referrer: "https://seller.wildberries.ru/",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: `{"start":"${dateStringFrom}","end":"${dateStringTo}","aggregationLevel":"day","nmIDs":[${productId}],"subjectIDs":[],"brandNames":[],"tags":[],"skipDeletedNm":false,"stockType":""}`,
        method: "POST",
        mode: "cors",
        credentials: "include",
      };

      if (WB_AUTH_V3) {
        options.headers['AuthorizeV3'] = WB_AUTH_V3
      }

      window.chrome.runtime.sendMessage(
        NEUROMARKET_CHROME_ID,
        {
          type: "fetchJson",
          url: "https://seller-content.wildberries.ru/ns/analytics-api/content-analytics/api/v1/summary/sales-funnel",
          options,
        },
        onResponse
      );
    }

    async loadFullStatsRealtime() {
      try {
        const date = new Date();
        let dateFromOriginal = new Date(this.#placement.createDate);
        let dateFromLimited = new Date();

        let dateFrom;

        if (this.onlySevenDays || this.onlySevenDays === null) {
          dateFromLimited.setDate(dateFromLimited.getDate() - 14); // TODO поставить 6
        } else {
          dateFromLimited.setDate(dateFromLimited.getDate() - 30);
        }

        dateFrom = dateFromLimited;

        if (Date.parse(dateFromOriginal) > Date.parse(dateFromLimited)) {
          dateFrom = dateFromOriginal;
        }

        const dateStringFrom =
          dateFrom.getFullYear() +
          "-" +
          zeroPad(dateFrom.getMonth() + 1, 2) +
          "-" +
          zeroPad(dateFrom.getDate(), 2);

        const dateString =
          date.getFullYear() +
          "-" +
          zeroPad(date.getMonth() + 1, 2) +
          "-" +
          zeroPad(date.getDate(), 2) +
          "T" +
          zeroPad(date.getHours(), 2) +
          "%3A" +
          zeroPad(date.getMinutes(), 2) +
          "%3A" +
          zeroPad(date.getSeconds(), 2) +
          "Z";

        const request = await fetch(
          `/api/v5/fullstat?advertID=${this.campaignId}&from=${dateStringFrom}T00%3A00%3A00Z&to=${dateString}&appType=0&placementType=0`,
          {
            headers: {
              Authorizev3: this.accessToken,
              "x-supplierid": this?.supplierId,
            },
            referrer: `https://cmp.wildberries.ru/campaigns/statistics/details/${this.campaignId}`,
            referrerPolicy: "strict-origin-when-cross-origin",
            body: null,
            method: "GET",
            mode: "cors",
            credentials: "include",
          }
        );

        if (request.status !== 200) {
          Toastify({
            text: `😢 Ошибка WB при загрузке Статистики РК:
            ${(await request.text()).trim()}`,
            duration: 3000,
            newWindow: true,
            gravity: "bottom", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            style: {
              background: "linear-gradient(to right, #162033, #253144)",
              fontSize: "0.8em",
              maxWidth: "300px",
              borderRadius: "10px",
              border: "1px solid #334155",
              boxShadow: "0",
            },
            offset: {
              y: 200, // vertical axis - can be a number or a string indicating unity. eg: '2em'
            },
          }).showToast();
          return;
        }

        const response = await request.json();
        return response;
      } catch (e) {
        console.log(e);
        return null;
      }
    }

    async loadFullStats() {
      try {
        if (window.XLSX === undefined) {
          await import("../libs/xlsx.min.js");
        }

        const dateTo = new Date();

        let dateFromOriginal = new Date(this.#placement.createDate);
        let dateFromLimited = new Date();

        let dateFrom;

        if (this.onlySevenDays || this.onlySevenDays === null) {
          dateFromLimited.setDate(dateFromLimited.getDate() - 14); // TODO поставить 6
        } else {
          dateFromLimited.setDate(dateFromLimited.getDate() - 30);
        }

        dateFrom = dateFromLimited;

        if (Date.parse(dateFromOriginal) > Date.parse(dateFromLimited)) {
          dateFrom = dateFromOriginal;
        }

        const dateStringFrom =
          dateFrom.getFullYear() +
          "-" +
          zeroPad(dateFrom.getMonth() + 1, 2) +
          "-" +
          zeroPad(dateFrom.getDate(), 2);

        const dateStringTo =
          dateTo.getFullYear() +
          "-" +
          zeroPad(dateTo.getMonth() + 1, 2) +
          "-" +
          zeroPad(dateTo.getDate(), 2);

        const request = await fetch(
          `/api/v3/fullstat?advertID=${this.campaignId}&appType=0&from=${dateStringFrom}T00%3A00%3A00Z&to=${dateStringTo}T00%3A00%3A00Z`,
          {
            headers: {
              Authorizev3: this.accessToken,
              "x-supplierid": this?.supplierId,
            },
            referrer:
              "https://cmp-new.wildberries.ru/campaigns/statistics/details/10589225",
            referrerPolicy: "strict-origin-when-cross-origin",
            body: null,
            method: "GET",
            mode: "cors",
            credentials: "include",
          }
        );

        if (request.status !== 200) {
          Toastify({
            text: `😢 Ошибка WB при загрузке Excel отчёта:
            ${(await request.text()).trim().slice(0, 200)}...`,
            duration: 3000,
            newWindow: true,
            gravity: "bottom", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            style: {
              background: "linear-gradient(to right, #162033, #253144)",
              fontSize: "0.8em",
              maxWidth: "300px",
              borderRadius: "10px",
              border: "1px solid #334155",
              boxShadow: "0",
            },
            offset: {
              y: 200, // vertical axis - can be a number or a string indicating unity. eg: '2em'
            },
          }).showToast();
          throw new Error("loadFullStats");
        }

        const buf = await request.arrayBuffer();
        const data = new Uint8Array(buf);
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets["Статистика по ключевым словам"];
        const ordersWorksheet =
          workbook.Sheets["Ассоциированные конверсии"] || undefined;
        const catalogWorksheet =
          workbook.Sheets["Статистика по каталогу"] || undefined;
        const boostWorksheet =
          workbook.Sheets["Статистика бустинг"] || undefined;

        const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // if (rawData.length <= 1) {
        //   return;
        // }

        rawData.splice(0, 1);

        const modifiedRawData = rawData.map((data) => {
          const views = data[1]
          const clicks = data[2]
          const money = data[4]

          // const viewsWithClicks = views + clicks
          const realMoney = money; //clicks > 0 ? money - ((money / viewsWithClicks) * clicks) : money;

          return [data[0], views, clicks, data[3], realMoney, data[5]]
        })

        if (boostWorksheet) {
          const boostingRawData = XLSX.utils.sheet_to_json(boostWorksheet, {
            header: 1,
          });
          if (boostingRawData.length > 1) {
            boostingRawData.splice(0, 1);
            this.boostingStatsRaw = boostingRawData;
          }
        }
        if (catalogWorksheet) {
          const catalogRawData = XLSX.utils.sheet_to_json(catalogWorksheet, {
            header: 1,
          });
          if (catalogRawData.length > 1) {
            catalogRawData.splice(0, 1);
            this.catalogStatsRaw = catalogRawData;
          }
        }

        if (ordersWorksheet) {
          const ordersRawData = XLSX.utils.sheet_to_json(ordersWorksheet, {
            header: 1,
          });
          if (ordersRawData.length > 1) {
            ordersRawData.splice(0, 1);
            this.ordersStatsRaw = ordersRawData;
          }
        }
        this.fullStatsRaw = modifiedRawData //rawData;
        this.fullStatsLoaded = true;
      } catch (e) {
        console.log(e);
        throw new Error("error");
      }
    }

    get datesStatsLoaded() {
      return this.#datesStatsLoaded;
    }

    set datesStatsLoaded(value) {
      this.#datesStatsLoaded = value;
      if (value) {
        document.getElementById("n-dates-list").innerHTML =
          this.renderDatesListv2();
        document
          .getElementById("n-export-days-btn")
          .addEventListener("click", () => this.exportDaysXlsx());
        document.getElementById("n-dates-table").style.display = "flex";
        const dateCells = [...document.getElementsByClassName("n-date-cell")];
        for (let i = 0; i < dateCells.length; i++) {
          const date = dateCells[i].dataset.date;
          dateCells[i].addEventListener("click", () => {
            this.datePickerFrom.selectDate(new Date(date));
            this.datePickerTo.selectDate(new Date(date));
          });
        }
        tippy("[data-tip]", {
          content(reference) {
            const desc = reference.getAttribute("data-tip");
            return `
            <div class="n-column-tip">
              ${desc}
            </div>
            `;
          },
          arrow: false,
          followCursor: false,
          placement: "top",
          allowHTML: true,
        });
      }
    }

    async mergeStats() {
      this.#wordsStats.keywords?.forEach((_, idx) => {
        this.#wordsStats.keywords[idx].count = 0;
        this.#wordsStats.keywords[idx].clicks = 0;
        this.#wordsStats.keywords[idx].money = 0;
        this.#wordsStats.keywords[idx].ctr = 0;
        this.#wordsStats.keywords[idx].cpc = 0;
        this.#wordsStats.keywords[idx].orders = {};
        this.#wordsStats.keywords[idx].dates = new Map();
      });

      this.#wordsStats.excluded?.forEach((_, idx) => {
        this.#wordsStats.excluded[idx].count = 0;
        this.#wordsStats.excluded[idx].clicks = 0;
        this.#wordsStats.excluded[idx].money = 0;
        this.#wordsStats.excluded[idx].ctr = 0;
        this.#wordsStats.excluded[idx].cpc = 0;
        this.#wordsStats.excluded[idx].orders = {};
        this.#wordsStats.excluded[idx].dates = new Map();
      });

      this.#wordsStats.fixed?.forEach((_, idx) => {
        this.#wordsStats.fixed[idx].count = 0;
        this.#wordsStats.fixed[idx].clicks = 0;
        this.#wordsStats.fixed[idx].money = 0;
        this.#wordsStats.fixed[idx].ctr = 0;
        this.#wordsStats.fixed[idx].cpc = 0;
        this.#wordsStats.fixed[idx].orders = {};
        this.#wordsStats.fixed[idx].dates = new Map();
      });

      const datesStatsSchema = {
        views: 0,
        clicks: 0,
        money: 0,
        ctr: 0,
        cpc: 0,
        avgBoost: 0,
      };

      const catalogStatsSchema = {
        views: 0,
        clicks: 0,
        money: 0,
        ctr: 0,
        cpc: 0,
      };

      this.datesStats = {};

      if (!this.#placement?.createDate || !this.#productSalesFunnelDataLoaded || !this.#productDataLoaded || !this.#fullStatsLoaded) return;

      let dateFromOriginal = new Date(this.#placement.createDate);
      let dateFromLimited = new Date();

      let dateFrom;

      if (this.onlySevenDays || this.onlySevenDays === null) {
        dateFromLimited.setDate(dateFromLimited.getDate() - 14); //TODO поставить 6
      } else {
        dateFromLimited.setDate(dateFromLimited.getDate() - 30); //TODO поставить 6
      }

      dateFrom = dateFromLimited;

      if (Date.parse(dateFromOriginal) > Date.parse(dateFromLimited)) {
        dateFrom = dateFromOriginal;
      }

      const dateFromString =
        dateFrom.getFullYear() +
        "-" +
        zeroPad(dateFrom.getMonth() + 1, 2) +
        "-" +
        zeroPad(dateFrom.getDate(), 2);

      const date = new Date();
      let dateString =
        date.getFullYear() +
        "-" +
        zeroPad(date.getMonth() + 1, 2) +
        "-" +
        zeroPad(date.getDate(), 2);

      while (dateFromString !== dateString) {
        dateString =
          date.getFullYear() +
          "-" +
          zeroPad(date.getMonth() + 1, 2) +
          "-" +
          zeroPad(date.getDate(), 2);

        this.datesStats[dateString] = this.datesStats[dateString] || {
          ...datesStatsSchema,
          catalog: { ...catalogStatsSchema },
        };
        date.setDate(date.getDate() - 1);
      }

      this.fullStatsRaw.forEach(
        ([_keyword, views, clicks, _ctr, money, date]) => {
          const keyword = _keyword.toLowerCase().trim();

          this.datesStats[date] = this.datesStats[date] || {
            ...datesStatsSchema,
            catalog: { ...catalogStatsSchema },
          };
          this.datesStats[date].views =
            (this.datesStats[date].views || 0) + (views || 0);
          this.datesStats[date].clicks =
            (this.datesStats[date].clicks || 0) + (clicks || 0);
          this.datesStats[date].money =
            Math.round(((this.datesStats[date].money || 0) + money) * 100) /
            100;
          this.datesStats[date].ctr =
            Math.round(
              ((this.datesStats[date].clicks / this.datesStats[date].views) *
                100 +
                Number.EPSILON) *
              100
            ) / 100;
          this.datesStats[date].cpc =
            Math.round(
              (this.datesStats[date].clicks > 0
                ? (this.datesStats[date].money / this.datesStats[date].clicks) *
                100
                : 0) + Number.EPSILON
            ) / 100;

          let type = "keywords";
          let idx = this.#wordsStats.keywords.findIndex(
            (item) => item.keyword === keyword
          );

          let fixedIdx = this.#wordsStats.fixed.findIndex(
            (item) => item.keyword === keyword
          );

          if (idx === -1) {
            type = "excluded";
            idx = this.#wordsStats.excluded.findIndex(
              (item) => item.keyword === keyword
            );
            if (idx === -1) {
              type = "keywords";
              idx = this.#wordsStats.keywords.length;
              const isFixed = this.#wordsStats.fixed.some(
                (item) => item.keyword === keyword
              );
              this.#wordsStats.keywords.push({
                keyword: keyword,
                hasCluster: false,
                index: idx,
                open: false,
                selected: false,
                isFixed,
              });
            }
          }

          const merger = (type, idx) => {
            this.#wordsStats[type][idx] = {
              ...this.#wordsStats[type][idx],
              clicks: (this.#wordsStats[type][idx]?.clicks || 0) + clicks,
              money: (this.#wordsStats[type][idx]?.money || 0) + money,
              count: (this.#wordsStats[type][idx]?.count || 0) + views,
              orders: {},
            };

            this.#wordsStats[type][idx].dates =
              this.#wordsStats[type][idx].dates || new Map();

            const lastDate = this.#wordsStats[type][idx].dates.get("'" + date);
            const cClicks = clicks + (lastDate?.clicks || 0);
            const cMoney = money + (lastDate?.money || 0);
            const cViews = views + (lastDate?.count || 0);

            this.#wordsStats[type][idx].dates.set("'" + date, {
              clicks: cClicks,
              money: cMoney,
              count: cViews,
              ctr: (cClicks / cViews) * 100,
              cpc:
                Math.round(
                  ((cClicks > 0 ? (cMoney / cClicks) * 100 : 0) +
                    Number.EPSILON) *
                  100
                ) / 100,
              orders: {},
            });

            this.#wordsStats[type][idx].ctr =
              (this.#wordsStats[type][idx].clicks /
                this.#wordsStats[type][idx].count) *
              100;

            const cpc =
              this.#wordsStats[type][idx].clicks > 0
                ? this.#wordsStats[type][idx].money /
                this.#wordsStats[type][idx].clicks
                : 0;

            this.#wordsStats[type][idx].cpc =
              Math.round((cpc + Number.EPSILON) * 100) / 100;
          };
          merger(type, idx);
          if (fixedIdx !== -1) {
            merger("fixed", fixedIdx);
          }
        }
      );

      this.catalogStatsRaw.forEach(
        ([catalogId, views, clicks, _ctr, _cpc, money, _date]) => {
          const date = String(_date);

          this.datesStats[date] = this.datesStats[date] || {
            ...datesStatsSchema,
            catalog: { ...catalogStatsSchema },
          };
          this.datesStats[date]["catalog"].views =
            (this.datesStats[date]["catalog"].views || 0) + views;
          this.datesStats[date]["catalog"].clicks =
            (this.datesStats[date]["catalog"].clicks || 0) + clicks;
          this.datesStats[date]["catalog"].money =
            Math.round(
              ((this.datesStats[date]["catalog"].money || 0) + money) * 100
            ) / 100;
          this.datesStats[date]["catalog"].ctr =
            Math.round(
              ((this.datesStats[date]["catalog"].clicks /
                this.datesStats[date]["catalog"].views) *
                100 +
                Number.EPSILON) *
              100
            ) / 100;
          this.datesStats[date]["catalog"].cpc =
            Math.round(
              (this.datesStats[date]["catalog"].clicks > 0
                ? (this.datesStats[date]["catalog"].money /
                  this.datesStats[date]["catalog"].clicks) *
                100
                : 0) + Number.EPSILON
            ) / 100;
        }
      );

      this.boostingStatsRaw.forEach(([date, nm, position]) => {

        this.datesStats[date].avgBoost = position;
      });

      this.datesStatsLoaded = true;

      // Это данные не по ключам, а по названию и артикулу товара!
      // this.ordersStatsRaw.forEach(([keyword, productId, orders]) => {
      //   if (keyword === undefined) return;
      //   let type = "keywords";
      //   let idx = this.#wordsStats.keywords.findIndex(
      //     (item) => item.keyword === keyword.toLowerCase().trim()
      //   );
      //   if (idx === -1) {
      //     type = "excluded";
      //     this.#wordsStats.excluded.findIndex(
      //       (item) => item.keyword === keyword.toLowerCase().trim()
      //     );
      //   }
      //   if (idx === -1) {
      //     type = "keywords";
      //     idx = this.#wordsStats.keywords.length;
      //     this.#wordsStats.keywords.push({
      //       keyword: keyword.toLowerCase().trim(),
      //       hasCluster: false,
      //       index: idx,
      //       open: false,
      //       selected: false,
      //     });
      //   }
      //   this.#wordsStats[type][idx].orders[productId] =
      //     (this.#wordsStats[type][idx]?.orders[productId] | 0) + orders;
      //   this.#wordsStats[type][idx].orders["total"] =
      //     (this.#wordsStats[type][idx]?.orders["total"] | 0) + orders;
      // });
    }

    async loadWordsClusters() {
      if (window.XLSX === undefined) {
        await import("../libs/xlsx.min.js");
      }
      const request = await fetch(
        `/api/v5/words-clusters?advertID=${this.campaignId}`,
        {
          headers: {
            Authorizev3: this.accessToken,
            "x-supplierid": this?.supplierId,
          },
          referrer: `https://cmp-new.wildberries.ru/campaigns/edit/${this.campaignId}`,
          referrerPolicy: "strict-origin-when-cross-origin",
          body: null,
          method: "GET",
          mode: "cors",
          credentials: "include",
        }
      );
      const buf = await request.arrayBuffer();
      const data = new Uint8Array(buf);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      if (rawData.length <= 1) {
        return;
      }

      rawData.splice(0, 1);
      rawData.forEach(([cluster, keyword]) => {
        if (cluster === keyword) return;

        if (this.wordsClusters.has(cluster)) {
          this.wordsClusters.set(cluster, [
            ...this.wordsClusters.get(cluster),
            keyword,
          ]);
          return;
        }
        this.wordsClusters.set(cluster, [keyword]);
      });

      return this.wordsClusters;
    }

    async getCPM(retry = 0) {
      try {
        const adType = window.__NEUROMARKET_AD_TYPE;
        const endpoints = {
          AUTO: `/api/v2/auto/${this.campaignId}/getcpm`,
          SEARCH: `/api/v2/search/${this.campaignId}/getcpm`,
          SEACAT: `/api/v2/seacat/${this.campaignId}/getcpm`,
        };
        const URL = endpoints[adType];

        const request = await fetch(URL, {
          headers: {
            Authorizev3: this.accessToken,
            "x-supplierid": this?.supplierId,
          },
          referrer: `https://cmp-new.wildberries.ru/campaigns/edit/${this.campaignId}`,
          referrerPolicy: "strict-origin-when-cross-origin",
          method: "GET",
          mode: "cors",
          credentials: "include",
        });

        if (request.status !== 200) {
          throw new Error("getCPM");
        }

        if (request.status === 429) {
          throw new Error("ERROR 429");
        }

        const data = await request.text();
        this.CPM = Number(data);
        return true;
      } catch (e) {
        if (retry < MAX_RETRIES) {
          await delay(REQUEST_DELAY);
          return this.getCPM(retry + 1);
        } else {
          return false;
        }
      }
    }

    async getPlacement(retry = 0) {
      try {
        const adType = window.__NEUROMARKET_AD_TYPE;
        const endpoints = {
          AUTO: `/api/v2/auto/${this.campaignId}/placement`,
          SEARCH: `/api/v2/search/${this.campaignId}/placement`,
          CATALOG: `/api/v2/catalog/${this.campaignId}/placement`,
          CAROUSEL: `/api/v2/carousel-auction/${this.campaignId}/placement`,
          SEACAT: `/api/v2/seacat/${this.campaignId}/placement`,
        };
        const URL = endpoints[adType];
        const request = await fetch(URL, {
          headers: {
            Authorizev3: this.accessToken,
            "x-supplierid": this?.supplierId,
          },
          referrer: `https://cmp-new.wildberries.ru/campaigns/edit/${this.campaignId}`,
          referrerPolicy: "strict-origin-when-cross-origin",
          body: null,
          method: "GET",
          mode: "cors",
          credentials: "include",
        });

        if (request.status !== 200) {
          throw new Error("getPlacement");
        }

        if (request.status === 429) {
          throw new Error("ERROR 429");
        }

        const data = await request.json();
        this.placement = data;
        return true;
      } catch (e) {
        if (retry < MAX_RETRIES) {
          await delay(REQUEST_DELAY);
          return this.getPlacement(retry + 1);
        } else {
          return false;
        }
      }
    }

    async getCampaignInfo(retry = 0) {
      try {
        const URL = `https://cmp.wildberries.ru/api/v5/campaign-info?advertID=${this.campaignId}`;
        const request = await fetch(URL, {
          headers: {
            Authorizev3: this.accessToken,
            "x-supplierid": this?.supplierId,
          },
          referrer: `https://cmp-new.wildberries.ru/campaigns/edit/${this.campaignId}`,
          referrerPolicy: "strict-origin-when-cross-origin",
          body: null,
          method: "GET",
          mode: "cors",
          credentials: "include",
        });

        if (request.status !== 200) {
          throw new Error("getCampaignInfo");
        }

        if (request.status === 429) {
          throw new Error("ERROR 429");
        }

        const data = await request.json();
        this.campaignInfo = data;
        return true;
      } catch (e) {
        if (retry < MAX_RETRIES) {
          await delay(REQUEST_DELAY);
          return this.getCampaignInfo(retry + 1);
        } else {
          return false;
        }
      }
    }

    get placement() {
      return this.#placement;
    }

    set placement(data) {
      this.#placement = data;
      if (this.#datePickerLoaded) {
        this.shouldDatePickerInit();
      }
      try {
        if (!this.productImagesAppended) {
          let elementToAppendAfter;
          let nms;
          let nodes;
          let appendType = "beforebegin";
          nodes = CAMPAIGN_NAME_ELEMENT.parentNode.parentNode.childNodes;
          if (window.__NEUROMARKET_AD_TYPE !== "AUTO") {
            if (window?.__NEUROMARKET_NEW_FRONT__) {
              elementToAppendAfter = nodes[2]
            } else {
              if (nodes.length === 3) {
                elementToAppendAfter = nodes[2];
              } else {
                if (nodes.length === 4) {
                  elementToAppendAfter = nodes[2];
                  appendType = "beforeend";
                } else {
                  elementToAppendAfter = nodes[2].childNodes[1];
                }
              }
            }
          }

          if (window.__NEUROMARKET_AD_TYPE === "AUTO") {
            if (nodes.length === 5) {
              elementToAppendAfter = nodes[2];
            } else {
              appendType = "beforeend";
              elementToAppendAfter = nodes[2];
            }
          }

          if (window.__NEUROMARKET_AD_TYPE === "AUTO") {
            nms = this.placement.nms.map((item) => item.nm) || [];
          }
          if (window.__NEUROMARKET_AD_TYPE === "SEARCH") {
            nms =
              this.placement.place.reduce(
                (arr, item) =>
                  (arr = [...arr, ...item.searchElements.map((i) => i.nm)]),
                []
              ) || [];
          }
          if (window.__NEUROMARKET_AD_TYPE === "SEACAT") {
            nms =
              this.placement.subjects.reduce(
                (arr, item) => (arr = [...arr, ...item.nms.map((i) => i.nm)]),
                []
              ) || [];
          }

          const imagesHtml = nms.slice(0, 8).map((nm) => {
            return `
      <a href="https://www.wildberries.ru/catalog/${nm}/detail.aspx" target="_blank" style="position: relative;">
        <img src="${imageURL(nm)}" class="n-inside-ad-nm-images"/>
        <div id="n-product-extra-details" data-product-id="${nm}"></div>
      </a>
    `;
          });
          elementToAppendAfter.insertAdjacentHTML(
            appendType,
            `<div style="margin-bottom: -5px; margin-top: 26px; display: flex; gap: 10px; opacity: 0.8;">
      ${imagesHtml.join("")}
    </div>`
          );
          this.productImagesAppended = true;
        }
      } catch (e) {
        console.log(e);
      }
    }

    async getProductDetails(withToken = true) {
      try {

        let products;

        if (window.__NEUROMARKET_AD_TYPE === "AUTO") {
          products = this.placement.nms;
        }
        if (window.__NEUROMARKET_AD_TYPE === "SEARCH") {
          products = this.placement.place[0].searchElements;
        }
        if (window.__NEUROMARKET_AD_TYPE === "SEACAT") {
          products = this.placement.subjects[0].nms;
        }

        products = products.map((item) => item.nm);

        const headers = {}
        if (withToken) {
          if (WB_TOKEN && WB_TOKEN_DECODED?.user) {
            headers["authorization"] = `Bearer ${WB_TOKEN}`;
          } else {
            if (WB_CAPTCHA) {
              headers["x-captcha-id"] = `Catalog ${WB_CAPTCHA}`;
            }
          }
        }

        // const request = await fetch(
        //   `https://card.wb.ru/cards/v2/detail?appType=${APPTYPE[CURRENT_APPTYPE]
        //   }&curr=rub&dest=${this.#region.dest}&spp=30&nm=${products.join(";")}`,
        //   {
        //     headers,
        //     body: null,
        //     method: "GET",
        //     mode: "cors",
        //     credentials: "include",
        //   }
        // );


        const request = await new Promise((resolve, reject) => {

          const timeoutHandler = setTimeout(() => {
            resolve(false);
          }, 3000);

          const onResponse = (response) => {
            clearTimeout(timeoutHandler);
            if (response) {
              resolve(response);
            } else {
              resolve(null);
            }
          };

          window.chrome.runtime.sendMessage(
            NEUROMARKET_CHROME_ID,
            {
              type: "fetchJson",
              url: `https://card.wb.ru/cards/v2/detail?appType=${APPTYPE[CURRENT_APPTYPE]
                }&curr=rub&dest=${this.#region.dest}&spp=30&nm=${products.join(";")}`,
              options: {
                headers,
                body: null,
                method: "GET",
                mode: "cors",
                credentials: "include",
              },
            },
            onResponse
          );
        });

        const response = request;
        if (response) {
          this.allProductDetails = response.data.products;
          this.productDetails = response.data.products[0];
          return true;
        }
        return false;
      } catch (e) {
        console.log(e, withToken);
        if (withToken) {
          return await this.getProductDetails(false)
        }
        return false;
      }
    }

    get allProductDetails() {
      return this.#allProductDetails;
    }

    set allProductDetails(data) {
      this.#allProductDetails = data;
      try {
        const allProductsElements = [
          ...document.querySelectorAll("#n-product-extra-details"),
        ];
        allProductsElements.forEach((el) => {
          const productId = Number(el.dataset.productId);
          const details = this.allProductDetails.find(
            (product) => product.id === productId
          );
          const price =
            details.sizes.find((size) => size.hasOwnProperty("price"))?.price
              ?.total / 100;
          const totalStocks = details.sizes.reduce((sum, size) => {
            return (sum += size.stocks.reduce((stocksSum, stock) => {
              return (stocksSum += stock.qty);
            }, 0));
          }, 0);

          const hasPromo = !!details?.promoTextCard;

          const template = [];

          if (price) {
            template.push(
              `<div class="n-product-extra-top-badge">${price}₽</div>`
            );
          }

          template.push(
            `<div class="n-product-extra-bottom-badge" style="${totalStocks === 0 ? "background: #ff0000c2;" : null
            }">${totalStocks}<small>шт.</small></div>`
          );
          if (hasPromo) {
            const promoTitle = details.promoTextCard
            template.push(
              `<div class="n-product-promo-badge" style="${totalStocks === 0 ? "background: #ff0000c2;" : null
              }" data-tip="Акция: ${promoTitle}">⭐</div>`
            );
          }

          el.innerHTML = template.join("");
        });

        tippy("[data-tip]", {
          content(reference) {
            const desc = reference.getAttribute("data-tip");
            return `
            <div class="n-column-tip">
              ${desc}
            </div>
            `;
          },
          arrow: false,
          followCursor: false,
          placement: "top",
          allowHTML: true,
        });
      } catch (e) {
        console.log(e);
      }
    }

    async getClusterData(clusterId) {
      try {
        const request = await fetch(`https://ext.neuromarket.online/cluster`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ clusterId: Number(clusterId) }),
          method: "POST",
          mode: "cors",
          credentials: "omit",
        });

        return await request.json();
      } catch (e) {
        console.log(e);
        return {};
      }
    }

    async getSearchResults(
      query,
      page = 1,
      limit = 100,
      retry = 0,
      suppressSpellcheck = true,
      withToken = false
    ) {
      try {
        let headers = { cache: "no-store" };
        let url = "https://ext.neuromarket.online/pos";
        url = `https://www.wildberries.ru/__internal/search/exactmatch/ru/common/v18/search`;
        headers = {
          "X-QueryId": getQueryIdForSearch(),
        };

        const WB_TOKEN_RAW = getCookie("neuromarket-token") || null;
        const WB_TOKEN = WB_TOKEN_RAW
          ? Base64.decode(decodeURIComponent(WB_TOKEN_RAW))
          : null;

        let WB_TOKEN_DECODED = null;

        if (!WB_TOKEN) {
          Toastify({
            text: "Ошибка замера позиции. Авторизуйтесь на клиентском сайте WB и повторите попытку замера.",
            duration: 5000,
            newWindow: true,
            gravity: "bottom", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            style: {
              background: "linear-gradient(to right, #162033, #253144)",
              fontSize: "0.8em",
              maxWidth: "300px",
              borderRadius: "10px",
              border: "1px solid #334155",
              boxShadow: "0",
            },
            offset: {
              y: 200,
            },
          }).showToast();
          return null;
        } else {
          try {
            if (WB_TOKEN && jwtDecode(WB_TOKEN)) {
              WB_TOKEN_DECODED = jwtDecode(WB_TOKEN)
            }
          } catch (e) { }
        }

        if (withToken) {
          if (WB_TOKEN && WB_TOKEN_DECODED?.user) {
            headers["authorization"] = `Bearer ${WB_TOKEN}`;
            headers["X-UserId"] = WB_TOKEN_DECODED.user;
          } else {
            if (WB_CAPTCHA) {
              headers["x-captcha-id"] = `Catalog ${WB_CAPTCHA}`;
            }
          }
        }



        const request = await new Promise((resolve, reject) => {

          const timeoutHandler = setTimeout(() => {
            resolve(false);
          }, 3000);

          const onResponse = (response) => {
            clearTimeout(timeoutHandler);
            if (response) {
              resolve(response);
            } else {
              resolve(null);
            }
          };

          window.chrome.runtime.sendMessage(
            NEUROMARKET_CHROME_ID,
            {
              type: "fetchJson",
              url: `${url}?ab_testing=false&appType=${APPTYPE[CURRENT_APPTYPE]
                }&curr=rub&dest=${this.#region.dest}&query=${encodeURIComponent(
                  query
                )}&resultset=catalog&sort=popular&spp=30&suppressSpellcheck=${suppressSpellcheck}${page === 1 ? "" : `&page=${page}`
                }${limit === 100 ? "" : `&limit=${limit}`}`,
              options: {
                headers: headers,
                referrer: `https://www.wildberries.ru/catalog/0/search.aspx?search=${query}`,
                referrerPolicy: "no-referrer-when-downgrade",
                body: null,
                method: "GET",
                mode: "cors",
                credentials: "include",
              },
            },
            onResponse
          );
        });


        if (!request && WB_TOKEN !== null) {
          Toastify({
            text: "Ошибка замера позиции. Убедитесь что вы авторизованы на клиентском сайте WB. Если авторизованы, подождите немного и повторите попытку замера.",
            duration: 5000,
            newWindow: true,
            gravity: "bottom", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            style: {
              background: "linear-gradient(to right, #162033, #253144)",
              fontSize: "0.8em",
              maxWidth: "300px",
              borderRadius: "10px",
              border: "1px solid #334155",
              boxShadow: "0",
            },
            offset: {
              y: 200,
            },
          }).showToast();
          return null;
        }

        const data = request;
        if (limit <= 1) {
          if (suppressSpellcheck && !data?.query) {
            return await this.getSearchResults(
              query,
              page,
              limit,
              retry,
              false
            );
          }

          if (suppressSpellcheck && data?.query) {
            const query = data.query;
            const type = query.split("=")[0] || "";
            data.metadata = {
              catalog_type: type,
              catalog_value: query,
            };
          }
          if (data?.metadata?.catalog_type === "merger" && suppressSpellcheck) {
            return await this.getSearchResults(
              query,
              page,
              limit,
              retry,
              false
            );
          }
          if (
            !data?.metadata?.catalog_value?.includes("preset") &&
            limit !== 1
          ) {
            await delay(THREAD_DELAY_MS);
            return await this.getSearchResults(query, page, 1, retry, false);
          }
        }
        return data;
      } catch (e) {
        if (retry <= MAX_RETRIES) {
          await delay(THREAD_DELAY_MS);
          return await this.getSearchResults(
            query,
            page,
            limit,
            retry + 1,
            suppressSpellcheck,
            withToken
          );
        }
        return e;
      }
    }

    async getSearchIndexResults(
      query,
      page = 1,
      limit = 100,
      retry = 0,
      suppressSpellcheck = true,
      withToken = false
    ) {
      try {
        let headers = { cache: "no-store" };
        let url = "https://ext.neuromarket.online/pos";
        url = "https://www.wildberries.ru/__internal/search/exactmatch/ru/common/v18/search";
        headers = {
          "X-QueryId": getQueryIdForSearch(),
        };


        const WB_TOKEN_RAW = getCookie("neuromarket-token") || null;
        const WB_TOKEN = WB_TOKEN_RAW
          ? Base64.decode(decodeURIComponent(WB_TOKEN_RAW))
          : null;

        let WB_TOKEN_DECODED = null;

        if (!WB_TOKEN) {
          Toastify({
            text: "Ошибка замера позиции. Авторизуйтесь на клиентском сайте WB и повторите попытку замера.",
            duration: 5000,
            newWindow: true,
            gravity: "bottom", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            style: {
              background: "linear-gradient(to right, #162033, #253144)",
              fontSize: "0.8em",
              maxWidth: "300px",
              borderRadius: "10px",
              border: "1px solid #334155",
              boxShadow: "0",
            },
            offset: {
              y: 200,
            },
          }).showToast();
          return null;
        } else {
          try {
            if (WB_TOKEN && jwtDecode(WB_TOKEN)) {
              WB_TOKEN_DECODED = jwtDecode(WB_TOKEN)
            }
          } catch (e) { }
        }

        if (withToken) {
          if (WB_TOKEN && WB_TOKEN_DECODED?.user) {
            headers["authorization"] = `Bearer ${WB_TOKEN}`;
            headers["X-UserId"] = WB_TOKEN_DECODED.user;
          } else {
            if (WB_CAPTCHA) {
              headers["x-captcha-id"] = `Catalog ${WB_CAPTCHA}`;
            }
          }
        }

        const request = await new Promise((resolve, reject) => {

          const timeoutHandler = setTimeout(() => {
            resolve(false);
          }, 3000);

          const onResponse = (response) => {
            clearTimeout(timeoutHandler);
            if (response) {
              resolve(response);
            } else {
              resolve(null);
            }
          };

          window.chrome.runtime.sendMessage(
            NEUROMARKET_CHROME_ID,
            {
              type: "fetchJson",
              url: `${url}?ab_testing=false&appType=${APPTYPE[CURRENT_APPTYPE]
                }&curr=rub&dest=${this.#region.dest}&fsupplier=${this.productDetails.supplierId
                }&query=${query}&resultset=catalog&sort=popular&spp=30&suppressSpellcheck=${suppressSpellcheck}${page === 1 ? "" : `&page=${page}`
                }${limit === 100 ? "" : `&limit=${limit}`}`,
              options: {
                headers: headers,
                referrer: `https://www.wildberries.ru/catalog/0/search.aspx?search=${query}`,
                referrerPolicy: "no-referrer-when-downgrade",
                body: null,
                method: "GET",
                mode: "cors",
                credentials: "include",
              },
            },
            onResponse
          );
        });


        if (!request && WB_TOKEN !== null) {
          Toastify({
            text: "Ошибка замера позиции. Убедитесь что вы авторизованы на клиентском сайте WB. Если авторизованы, подождите немного и повторите попытку замера.",
            duration: 5000,
            newWindow: true,
            gravity: "bottom", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            style: {
              background: "linear-gradient(to right, #162033, #253144)",
              fontSize: "0.8em",
              maxWidth: "300px",
              borderRadius: "10px",
              border: "1px solid #334155",
              boxShadow: "0",
            },
            offset: {
              y: 200,
            },
          }).showToast();
          return null;
        }

        const data = await request;
        return data;
      } catch (e) {
        if (retry <= MAX_RETRIES) {
          await delay(THREAD_DELAY_MS);
          return await this.getSearchIndexResults(
            query,
            page,
            limit,
            retry + 1,
            suppressSpellcheck,
            withToken
          );
        }
        return e;
      }
    }

    findAdsCPM(products, page) {
      const result = [];
      products?.forEach((product, index) => {
        if (product?.logs) {
          const position = index + 1 + (page - 1) * 100;
          const boostedFrom = product?.log?.position + (page - 1) * 100;
          const positionBoost = product?.log?.promoPosition;
          const positionDelta = boostedFrom - positionBoost;
          result.push({
            productId: product.id,
            supplierId: product.supplierId,
            position: position,
            boosted_from: boostedFrom,
            position_delta: positionDelta || undefined,
            position_boost: positionBoost || undefined,
            advertId: product?.log?.advertId,
            cpm: product?.log?.cpm,
            type: product?.log?.tp,
            logs: product?.logs,
          });
        }
      });

      return result;
    }

    isSomeKeywordsSelected() {
      return (
        this.wordsStats?.keywords?.some((item) => item.selected === true) ||
        false
      );
    }

    isSomeFixedSelected() {
      return (
        this.wordsStats?.fixed?.some((item) => item.selected === true) || false
      );
    }

    isSomeExcludedSelected() {
      return this.wordsStats?.excluded?.some((item) => item?.selected === true);
    }

    isSomeClusterSelected() {
      return this.keywordsToExport?.some(
        (item) =>
          (this.wordsStats?.keywords[item.index]?.selected ||
            (item.isExcluded &&
              this.wordsStats?.excluded[item.index]?.selected)) &&
          item?.child?.some((item) => item.isExcluded)
      );
    }

    set isKeywordsSelected(value) {
      this.#isKeywordsSelected = value;
      const removeKeywordBtn = document.getElementById(
        "n-remove-keyword-button"
      );
      if (value) {
        removeKeywordBtn.style.display = "flex";
      } else {
        removeKeywordBtn.style.display = "none";
      }
      if (["SEARCH", "SEACAT"].includes(window.__NEUROMARKET_AD_TYPE)) {
        const fixKeywordBtn = document.getElementById("n-fix-keyword-button");
        const unfixKeywordBtn = document.getElementById(
          "n-unfix-keyword-button"
        );
        const selectedAndFixed = this.#wordsStats.keywords.some(
          (item) => item.selected && item.isFixed
        );
        const selectedAndNotFixed = this.#wordsStats.keywords.some(
          (item) => item.selected && !item.isFixed
        );
        if (value) {
          if (selectedAndFixed) {
            unfixKeywordBtn.style.display = "flex";
          }
          if (selectedAndNotFixed) {
            fixKeywordBtn.style.display = "flex";
          }
        } else {
          unfixKeywordBtn.style.display = "none";
          fixKeywordBtn.style.display = "none";
        }
      }
    }

    get isFixedSelected() {
      return this.#isFixedSelected;
    }

    set isFixedSelected(value) {
      this.#isFixedSelected = value;
      const removeFixedBtn = document.getElementById("n-restore-fixed-button");
      const excludeFixedBtn = document.getElementById("n-exclude-fixed-button");
      if (value) {
        removeFixedBtn.style.display = "flex";
        excludeFixedBtn.style.display = "flex";
      } else {
        removeFixedBtn.style.display = "none";
        excludeFixedBtn.style.display = "none";
      }
    }

    set isRestoreClusterSelected(value) {
      this.#isRestoreClusterSelected = value;
      const restoreClusterBtn = document.getElementById(
        "n-restore-cluster-button"
      );
      if (value) {
        restoreClusterBtn.style.display = "flex";
      } else {
        restoreClusterBtn.style.display = "none";
      }
    }

    set isRestoreKeywordSelected(value) {
      this.#isRestoreKeywordSelected = value;
      const restoreKeywordBtn = document.getElementById(
        "n-restore-keyword-button"
      );
      if (value) {
        restoreKeywordBtn.style.display = "flex";
      } else {
        restoreKeywordBtn.style.display = "none";
      }
    }

    set isRestoreExcludedSelected(value) {
      this.#isRestoreExcludedSelected = value;
      const restoreExcludedBtn = document.getElementById(
        "n-restore-excluded-button"
      );
      if (value) {
        restoreExcludedBtn.style.display = "flex";
      } else {
        restoreExcludedBtn.style.display = "none";
      }
    }

    get isKeywordsSelected() {
      return this.#isKeywordsSelected;
    }

    select(type, index) {
      this.wordsStats[type][index].selected =
        !this.wordsStats[type][index].selected;

      const copyKeywordsSelectedElement = document.getElementById(
        "copy-keywords-selected"
      );
      const addKeywordsToCustomListsButton = document.getElementById(
        "add-keywords-to-custom-lists-button"
      );
      const removeKeywordsFromCustomListsButton = document.getElementById(
        "remove-keywords-from-custom-lists-button"
      );
      const copyKeywordsElement = document.getElementById("copy-keywords");
      let somethingSelected = false;
      if (this.isSomeKeywordsSelected()) {
        this.isKeywordsSelected = true;
        somethingSelected = true;
      } else {
        this.isKeywordsSelected = false;
      }

      if (this.isSomeFixedSelected()) {
        this.isFixedSelected = true;
        somethingSelected = true;
      } else {
        this.isFixedSelected = false;
      }

      if (this.isSomeExcludedSelected()) {
        this.isRestoreKeywordSelected = true;
        this.isRestoreExcludedSelected = true;
        somethingSelected = true;
      } else {
        this.isRestoreKeywordSelected = false;
        this.isRestoreExcludedSelected = false;
      }

      if (this.isSomeClusterSelected()) {
        this.isRestoreClusterSelected = true;
        somethingSelected = true;
      } else {
        this.isRestoreClusterSelected = false;
      }

      if (!somethingSelected) {
        copyKeywordsSelectedElement.style.display = "none";
        copyKeywordsElement.style.display = "flex";
        addKeywordsToCustomListsButton.style.display = "none";
        removeKeywordsFromCustomListsButton.style.display = "none";
      } else {
        copyKeywordsSelectedElement.style.display = "flex";
        copyKeywordsElement.style.display = "none";
        if (this.customLists.length > 0) {
          addKeywordsToCustomListsButton.style.display = "flex";
          removeKeywordsFromCustomListsButton.style.display = "flex";
        } else {
          addKeywordsToCustomListsButton.style.display = "none";
          removeKeywordsFromCustomListsButton.style.display = "none";
        }
      }
    }

    async getMetadata(keyword, retry) {
      try {
        const response = await this.getSearchResults(keyword, 1, 0);

        const metadata = response?.metadata;

        return [response, metadata];
      } catch (e) {
        if (retry < MAX_RETRIES) {
          return this.getMetadata(keyword, retry + 1);
        }
        return [{}, {}];
      }
    }

    async setCampaignTag(tag) {
      try {
        let name = this?.placement?.name;
        const tags = [
          "🟢",
          "🟡",
          "🔴",
          "🔵",
          "⛔️",
          "❓",
          "❗",
          "❌",
          "✅",
          "👌",
          "🚀",
          "⚠️",
        ];
        tags.forEach((_tag) => (name = name.replace(_tag, "")));
        name = tag + " " + name.trim();
        const request = await fetch(
          `/api/v3/rename?advert-id=${this.campaignId}`,
          {
            headers: {
              Authorizev3: this.accessToken,
              accept: "*/*",
              "accept-language":
                "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6,zh-TW;q=0.5,zh;q=0.4",
              "cache-control": "no-cache",
              "content-type": "application/json",
              pragma: "no-cache",
              "sec-ch-ua":
                '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": '"Windows"',
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-origin",
              "x-supplierid": this?.supplierId,
            },
            referrer: `https://cmp.wildberries.ru/campaigns/edit/${this.campaignId}`,
            referrerPolicy: "strict-origin-when-cross-origin",
            body: JSON.stringify({ name }),
            method: "POST",
            mode: "cors",
            credentials: "include",
          }
        );
        CAMPAIGN_NAME_ELEMENT.innerText = name;
      } catch (e) {
        console.log(e);
      }
    }

    async createSearchAdCampaign(nm) {
      try {
        const request = await fetch("/api/v5/save-ad", {
          headers: {
            accept: "*/*",
            "accept-language":
              "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6,zh-TW;q=0.5,zh;q=0.4",
            Authorizev3: this.accessToken,
            accept: "*/*",
            "accept-language":
              "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6,zh-TW;q=0.5,zh;q=0.4",
            "cache-control": "no-cache",
            "content-type": "application/json",
            pragma: "no-cache",
            "sec-ch-ua":
              '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-supplierid": this?.supplierId,
          },
          referrer: "https://cmp.wildberries.ru/campaigns/create/search",
          referrerPolicy: "strict-origin-when-cross-origin",
          body: `{\"type\":6,\"name\":\"🚀 [Нейромаркет] Поиск [${nm}]\",\"nms\":[${nm}]}`,
          method: "POST",
          mode: "cors",
          credentials: "include",
        });
        const response = await request.json();
        return response;
      } catch (e) {
        console.log(e);
      }
    }

    async createSeacatAdCampaign(nm) {
      try {
        const body = {
          model: "cpm",
          name: `🚀 [Нейромаркет] Аукцион [${nm[0]}]`,
          nms: [nm[0]],
          nms_settings: {
            [nm[0]]: {
              cost: {
                cpm: 350
              }
            }
          },
          targets: [
            {
              "type": 1,
              "nms": [
                {
                  "id": nm[0],
                  "amount": 350
                }
              ]
            },
            {
              "type": 2,
              "nms": [
                {
                  "id": nm[0],
                  "amount": 350
                }
              ]
            }
          ],
          type: 9
        }

        const request = await fetch("/api/v5/save-ad", {
          headers: {
            accept: "*/*",
            "accept-language":
              "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6,zh-TW;q=0.5,zh;q=0.4",
            Authorizev3: this.accessToken,
            accept: "*/*",
            "accept-language":
              "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6,zh-TW;q=0.5,zh;q=0.4",
            "cache-control": "no-cache",
            "content-type": "application/json",
            "sec-ch-ua":
              '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-supplierid": this?.supplierId,
          },
          referrer: "https://cmp.wildberries.ru/campaigns/create/search",
          referrerPolicy: "strict-origin-when-cross-origin",
          body: JSON.stringify(body),
          method: "POST",
          mode: "cors",
          credentials: "include",
        });
        const response = await request.json();
        return response;
      } catch (e) {
        console.log(e);
      }
    }

    async setExcludedSearchAdCampaign(campaignId) {
      try {
        const excluded = this.wordsStats.excluded.map((item) => item.keyword);
        const request = await fetch(
          `/api/v2/search/${campaignId}/set-excluded`,
          {
            headers: {
              accept: "*/*",
              "accept-language":
                "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6,zh-TW;q=0.5,zh;q=0.4",
              Authorizev3: this.accessToken,
              accept: "*/*",
              "accept-language":
                "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6,zh-TW;q=0.5,zh;q=0.4",
              "cache-control": "no-cache",
              "content-type": "application/json",
              pragma: "no-cache",
              "sec-ch-ua":
                '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": '"Windows"',
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-origin",
              "x-supplierid": this?.supplierId,
            },
            referrer: `https://cmp.wildberries.ru/campaigns/edit/${this.campaignId}`,
            referrerPolicy: "strict-origin-when-cross-origin",
            body: JSON.stringify({ excluded }),
            method: "POST",
            mode: "cors",
            credentials: "include",
          }
        );
      } catch (e) {
        console.log(e);
      }
    }

    async setExcludedSeacatAdCampaign(campaignId) {
      try {
        const excluded = this.wordsStats.excluded.map((item) => item.keyword);
        const request = await fetch(
          `/api/v2/seacat/${campaignId}/set-excluded`,
          {
            headers: {
              accept: "*/*",
              "accept-language":
                "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6,zh-TW;q=0.5,zh;q=0.4",
              Authorizev3: this.accessToken,
              accept: "*/*",
              "accept-language":
                "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6,zh-TW;q=0.5,zh;q=0.4",
              "cache-control": "no-cache",
              "content-type": "application/json",
              pragma: "no-cache",
              "sec-ch-ua":
                '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": '"Windows"',
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-origin",
              "x-supplierid": this?.supplierId,
            },
            referrer: `https://cmp.wildberries.ru/campaigns/edit/${this.campaignId}`,
            referrerPolicy: "strict-origin-when-cross-origin",
            body: JSON.stringify({ excluded }),
            method: "POST",
            mode: "cors",
            credentials: "include",
          }
        );
      } catch (e) {
        console.log(e);
      }
    }
  }

  const GetCreateAdElement = () => {
    try {
      const text = "Создать кампанию";
      const matches = [];
      for (const div of document.querySelectorAll("button")) {
        if (div.textContent.includes(text)) {
          matches.push(div);
        }
      }
      if (matches.length !== 1) {
        return null;
      }
      return matches[0];
    } catch (e) {
      return null;
    }
  };

  const GetAutoCampaignElement = () => {
    try {
      if (window?.__NEUROMARKET_NEW_FRONT__) {

        const element = document.querySelector(".ant-flex-vertical")?.childNodes?.[0];
        for (const span of document.querySelectorAll(".ant-typography")) {
          if (span.innerText === "Зоны показов") {
            return null;
          }
        }


        const foundElements = document.querySelectorAll(".ant-flex-align-center")
        if (foundElements?.[6]?.innerText === "Инструкция") {
          const element = foundElements[6]?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement;

          const textElement = element
          // console.log(textElement.parentElement.parentElement)
          // textElement.style.gridTemplateColumns = 'minmax(0, 1320px)';
          // document.body.style.overflowX = 'initial'
          CAMPAIGN_NAME_ELEMENT = textElement.parentElement.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0]
          textElement.parentElement.classList.add('n-special-auto-grid');
          // console.log(["AUTO", textElement.parentElement.parentElement])
          return ["AUTO", textElement.parentElement.childNodes[0]];

        } else {
          const element = document.querySelector("main")?.childNodes?.[0]?.childNodes?.[0]?.childNodes?.[0];
          for (const span of document.querySelectorAll(".ant-typography")) {
            if (span.innerText === "Показываем товар в поиске и рекомендациях по единой ставке") {
              element.parentNode.parentNode.style.gridTemplateColumns = 'minmax(0, 1320px)';
              document.body.style.overflowX = 'initial'
              element.parentNode.parentNode.classList.add('n-special-auto-grid');

              CAMPAIGN_NAME_ELEMENT = element?.childNodes?.[1]?.childNodes?.[0]
              return ["AUTO", element];
            }
          }
        }
      } else {

        const text = "Автоматическая";
        const matches = [];
        for (const div of document.querySelectorAll("div")) {
          if (div.textContent.includes(text)) {
            matches.push(div);
          }
        }
        if (matches.length < 8) {
          return null;
        }
        const needleElement = matches[5];
        try {
          needleElement.parentNode.parentNode.classList.add('n-special-auto-grid');
          CAMPAIGN_NAME_ELEMENT = matches[6]?.nextElementSibling?.firstChild;
          return ["AUTO", needleElement];
        } catch (e) { }
        CAMPAIGN_NAME_ELEMENT = matches[6]?.nextElementSibling?.firstChild;
        return ["AUTO", needleElement];
      }
    } catch (e) {
      return null;
    }
  };

  const GetSeacatCampaignElement = () => {
    try {
      const text = "Аукцион";
      const matches = [];
      if (window?.__NEUROMARKET_NEW_FRONT__) {
        const foundElements = document.querySelectorAll(".ant-flex-align-center")
        const element = document.querySelector(".ant-flex-vertical")?.childNodes?.[0].parentNode.parentNode;
        for (const span of document.querySelectorAll(".ant-typography")) {
          if (span.innerText === "Зоны показов") {
            element.parentElement.classList.add('n-special-auto-grid');
            element.parentNode.parentNode.style.gridTemplateColumns = 'minmax(0, 1320px)';
            document.body.style.overflowX = 'initial'
            CAMPAIGN_NAME_ELEMENT = element.childNodes?.[1]?.childNodes?.[0]
            return ["SEACAT", element];
          }
        }
      } else {
        for (const div of document.querySelectorAll("p")) {
          if (div.innerText === text) {
            matches.push(div);
          }
        }
        if (matches.length !== 1) {
          return null;
        }

        const foundElement =
          matches[0].parentNode.parentNode.parentNode.parentNode;
        const foundGridElement = foundElement.parentNode;
        foundElement.style.zIndex = 1;
        foundElement.style.justifyContent = "center";
        foundGridElement.style.display = "grid !important";
        foundGridElement.style.columnGap = "2rem";
        foundGridElement.style.maxWidth = "1250px !important";
        foundGridElement.classList.add("n-special-grid")
        document.body.style.overflowX = 'initial'
        foundGridElement.parentNode.classList.add("n-special-grid-mobile")
        const needleElement = matches[0].parentNode.parentNode.parentNode;
        CAMPAIGN_NAME_ELEMENT = needleElement.childNodes[1].childNodes[0];
        return ["SEACAT", needleElement];
      }

    } catch (e) {
      return null;
    }
  }

  const GetSearchCampaignElement = () => {
    try {
      const text = "Поиск";
      const matches = [];
      for (const div of document.querySelectorAll("p")) {
        if (div.innerText === text) {
          matches.push(div);
        }
      }
      if (matches.length !== 1) {
        return null;
      }

      const needleElement = matches[0].parentNode.parentNode.parentNode;
      CAMPAIGN_NAME_ELEMENT = needleElement.childNodes[1].childNodes[0];
      return ["SEARCH", needleElement];
    } catch (e) {
      return null;
    }
  };

  const URLS = [
    "https://cmp-new.wildberries.ru/campaigns/edit/",
    "https://cmp.wildberries.ru/campaigns/edit/",
  ];

  const URLS_CAMPAIGNS_LIST = [
    "https://cmp.wildberries.ru/campaigns/list",
    "https://cmp-new.wildberries.ru/campaigns/list",
  ];

  const URLS_EXTERNAL_TRAFIC = ["https://cmp.wildberries.ru/external-traffic"];

  let oldPushState = history.pushState;
  history.pushState = function pushState() {
    let ret = oldPushState.apply(this, arguments);
    window.dispatchEvent(new Event("pushstate"));
    window.dispatchEvent(new Event("locationchange"));
    return ret;
  };

  window.addEventListener("popstate", () => {
    window.dispatchEvent(new Event("locationchange"));
  });


  if (document.readyState === "complete")
    InjectByLocation(window.location.href);
  else
    window.addEventListener("load", () =>
      InjectByLocation(window.location.href)
    );

  window.addEventListener("locationchange", () => {
    InjectByLocation(window.location.href);
  });


  async function InjectByLocation(loc) {

    if (document.querySelector(".ant-app")) {
      window.__NEUROMARKET_NEW_FRONT__ = true;
    } else {
      window.__NEUROMARKET_NEW_FRONT__ = false;
    }

    if (
      !window?.__NEUROMARKET_EXTERNAL_INJECTED__ &&
      URLS_EXTERNAL_TRAFIC.some((url) => loc.startsWith(url))
    ) {
      window.__NEUROMARKET_EXTERNAL_INJECTED__ = true;
    }

    if (
      !window?.__NEUROMARKET_CAMPAIGNS_LIST_BUTTON_INJECTED__ &&
      URLS_CAMPAIGNS_LIST.some((url) => loc.startsWith(url))
    ) {
      window.__NEUROMARKET_CAMPAIGNS_LIST_BUTTON_INJECTED__ = true;
      alreadyInjectedAds = [];

      const rootELement = document.getElementById("root") || null;
      if (rootELement === null) {
        return;
      }
      window.__NEUROMARKET_INJECTED__ = true;
      observer.observe(rootELement, {
        childList: true,
        subtree: true,
      });
      observeFunction();
    }

    if (
      !window?.__NEUROMARKET_INJECTED__ &&
      URLS.some((url) => loc.startsWith(url))
    ) {
      const rootELement = document.getElementById("root") || null;
      if (rootELement === null) {
        return;
      }
      window.__NEUROMARKET_INJECTED__ = true;
      observer.observe(rootELement, {
        childList: true,
        subtree: true,
      });
      observeFunction();
    }

  }

  //---------------UTILS

  function debounce(callback, wait = 250) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => callback(...args), wait);
    };
  }

  function delay(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function numberWithSpaces(x) {
    if (x === undefined) return 0;
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  function createLabel(number, titles) {
    const cases = [2, 0, 1, 1, 1, 2];
    return `${titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]]}`;
  }

  function sanitize(string) {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#x27;",
      "/": "&#x2F;",
    };
    const reg = /[&<>"'/]/gi;
    return string?.replace(reg, (match) => map[match]);
  }

  function zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
  }

  function isLocalStorageAvailable() {
    var test = "test";
    try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  }

  function genNewUserID() {
    let t = Math.floor(new Date().getTime() / 1e3);
    let e =
      Math.floor(Math.random() * Math.pow(2, 30)).toString() + t.toString();
    let n = new Date;
    return n.setTime(n.getTime() + 31536e6);
  }

  function getQueryIdForSearch() {

    const wbauid = getCookie("_wbauid");
    if (wbauid) {
      return `qid${wbauid}${moment(
        new Date(new Date() - Math.random() * 1e12)
      ).format("yyyyMMDDHHmmss")}`;
    } else {
      let userId =
        WB_TOKEN_DECODED !== null ? WB_TOKEN_DECODED.user : genNewUserID();
      return `qid${userId}${moment(
        new Date(new Date() - Math.random() * 1e12)
      ).format("yyyyMMDDHHmmss")}`;
    }
  }

  function maskString(string, numToMask) {
    const data = String(string);
    const dataLen = data.length;
    const firstPart = data.slice(0, numToMask / 2);
    const hiddenPart = "*".repeat(dataLen - numToMask);
    const lastPart = data.slice(dataLen - numToMask / 2, dataLen);
    return `${firstPart}${hiddenPart}${lastPart}`;
  }

  const precise = (function () {
    if (Math.trunc === undefined) {
      Math.trunc = function (v) {
        return v < 0 ? Math.ceil(v) : Math.floor(v);
      };
    }
    var powers = [
      1, 1e1, 1e2, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13,
      1e14, 1e15, 1e16, 1e17, 1e18, 1e19, 1e20, 1e21, 1e22,
    ];
    var intpow10 = function (power) {
      if (power < 0 || power > 22) {
        return Math.pow(10, power);
      }
      return powers[power];
    };
    var toPrecision = function (num, significantDigits) {
      if (!num || !Number.isFinite(num)) return num;
      var shift = significantDigits - 1 - Math.floor(Math.log10(Math.abs(num)));
      var decimalPlaces = 0;
      for (var p = 1; num != Math.round(num * p) / p; p *= 10) decimalPlaces++;
      if (shift >= decimalPlaces) return num;
      var scale = intpow10(Math.abs(shift));
      return shift > 0
        ? Math.round(num * scale) / scale
        : Math.round(num / scale) * scale;
    };
    var stripError = function (num) {
      if (Number.isInteger(num)) return num;
      return toPrecision(num, 15);
    };
    var decimalAdjust = function myself(type, num, decimalPlaces) {
      if (type === "round" && num < 0)
        return -myself(type, -num, decimalPlaces);
      var p = intpow10(decimalPlaces || 0);
      var n = stripError(num * p);
      return Math[type](n) / p;
    };
    return {
      round: function (num, decimalPlaces) {
        return decimalAdjust("round", num, decimalPlaces);
      },
      ceil: function (num, decimalPlaces) {
        return decimalAdjust("ceil", num, decimalPlaces);
      },
      floor: function (num, decimalPlaces) {
        return decimalAdjust("floor", num, decimalPlaces);
      },
      trunc: function (num, decimalPlaces) {
        return decimalAdjust("trunc", num, decimalPlaces);
      },
      toFixed: function (num, decimalPlaces) {
        return decimalAdjust("round", num, decimalPlaces).toFixed(
          decimalPlaces
        );
      },
    };
  })();

  function deleteCookie(name, path, domain) {
    document.cookie = name + "=" +
      ((path) ? ";path=" + path : "") +
      ((domain) ? ";domain=" + domain : "") +
      ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }

  const BASKETS = [
    [0, 143],
    [144, 287],
    [288, 431],
    [432, 719],
    [720, 1007],
    [1008, 1061],
    [1062, 1115],
    [1116, 1169],
    [1170, 1313],
    [1314, 1601],
    [1602, 1655],
    [1656, 1919],
    [1920, 2045],
    [2046, 2189],
    [2190, 2405],
    [2406, 2621],
    [2622, 2837],
    [2838, 3053],
    [3054, 3269],
    [3270, 3485],
    [3486, 3701],
    [3702, 3917],
    [3918, 4133],
    [4134, 4349],
    [4350, 4565],
    [4566, 4877],
    [4878, 5189],
    [5190, 5501],
    [5502, 5813],
    [5814, 6125],
    [6126, 6437],
    [6438, 6749],
    [6750, 7061],
    [7062, 7373],
    [7374, 7685],
    [7686, 7997],
    [7998, 8309],
  ];

  function imageURL(productId, order = 1) {
    const vol = parseInt(productId / 100000, 10);
    const part = parseInt(productId / 1000, 10);
    const basket = getBasketNumber(productId);
    const basketWithZero = basket < 10 ? `0${basket}` : basket;
    const random = Date.now();
    const URL = `https://basket-${basketWithZero}.wbbasket.ru/vol${vol}/part${part}/${productId}/images/c246x328/${order}.webp`;

    return URL;
  }

  function getBasketNumber(productId) {
    const vol = parseInt(productId / 100000, 10);
    const basket = BASKETS.reduce((accumulator, current, index) => {
      if (vol >= current[0] && vol <= current[1]) {
        return index + 1;
      }
      return accumulator;
    }, 1);
    return basket;
  }

  if (
    window.location.href.includes("cmp.wildberries.ru") ||
    window.location.href.includes("cmp-new.wildberries.ru")
  ) {

    // eslint-disable-next-line no-undef

    const { fetch: originalFetch } = window;
    window.fetch = async (...args) => {
      let [resource, config] = args;

      const response = await originalFetch(resource, config);

      if (
        window.location.href.includes("/campaigns/list") &&
        resource?.url?.includes("api/v6/atrevds")
      ) {
        const clonedResource = new Request(resource.url.replace("api/v6/atrevds", "api/v5/atrevds"), resource);
        const clonedResponse = await originalFetch(clonedResource, config);
        injectCampaignAdvancedData(clonedResponse, false);
      }

      if (resource?.url?.includes("/pause")) {
        updateCampaign("pause");
      }
      if (resource?.url?.includes("/start")) {
        updateCampaign("start");
      }

      return response;
    };

    const origOpen = XMLHttpRequest.prototype.open;
    const origSend = XMLHttpRequest.prototype.send;

    // Переопределяем open, чтобы запомнить метод и URL
    XMLHttpRequest.prototype.open = function (method, url, ...rest) {
      this._method = method;
      this._url = url;

      if (window.location.href.includes("/campaigns/list") &&
        url.includes("api/v6/atrevds")) {

        if (helpEngine?.accessToken) {
          fetch(url.replace("api/v6/atrevds", "api/v5/atrevds"), {
            headers: {
              "Authorizev3": helpEngine.accessToken,
            }
          }).then(res => injectCampaignAdvancedData(res))
        }

      }
      return origOpen.apply(this, [method, url, ...rest]);
    };

    // Переопределяем send, чтобы наблюдать за запросом/ответом
    // XMLHttpRequest.prototype.send = function (body) {

    //   // Отслеживаем ответ
    //   this.addEventListener('readystatechange', () => {
    //     if (this.readyState === 4) {                       // DONE
    //       if (window.location.href.includes("/campaigns/list") &&
    //         this._url.includes("api/v5/atrevds")) {
    //         injectCampaignAdvancedData(JSON.parse(this.responseText), true)
    //       }
    //     }
    //   });

    //   return origSend.apply(this, [body]);
    // };
  }

  function updateCampaign(status) {
    if (window.Engine) {
      if (window.Engine.onlySevenDays === null) return;
      if (window.loadAllData) {
        loadAllData();
      }
      Logger.send({
        type: "set-status",
        data: { status },
      });
    }
  }

  function stringToColor(str) {
    const colors = [
      "#e51c23",
      "#e91e63",
      "#9c27b0",
      "#673ab7",
      "#3f51b5",
      "#5677fc",
      "#03a9f4",
      "#00bcd4",
      "#009688",
      "#259b24",
      "#8bc34a",
      "#afb42b",
      "#ff9800",
      "#ff5722",
      "#795548",
      "#607d8b",
    ];

    let hash = 0;
    if (str.length === 0) return hash;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
      hash = hash & hash;
    }
    hash = ((hash % colors.length) + colors.length) % colors.length;
    return colors[hash];
  }

  const compareInjectedAds = (arr1, arr2) => (JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort()));

  async function injectCampaignAdvancedData(response, adsDataResponse) {
    if (!window.helpEngine?.supplierUsers) {
      await delay(200);
      return await injectCampaignAdvancedData(response, adsDataResponse);
    }
    const adsData = adsDataResponse ? adsDataResponse : (await response.json()).content || [];
    const allNms = adsData.reduce((acc, ad) => acc.add(...ad.products.map((product) => product.nm)), new Set())
    const stocksData = await helpEngine.getStocks(Array.from(allNms));
    const campaignIds = adsData.map((item) => item.id);
    if (compareInjectedAds(alreadyInjectedAds, campaignIds)) return;

    let notes = [];
    if (campaignIds.length) {
      notes = await Logger.getCampaignsNotes(campaignIds);
      notes = notes.map((note) => ({ ...note, data: JSON.parse(note.data) }));
    }
    const listAdsElement =
      [
        ...[...document.getElementsByTagName("section")[0].childNodes].filter(
          (node) =>
            node.id !== "n-api-token-layout" &&
            node.id !== "n-api-token-add-overlay" &&
            node.nodeName !== "#text"
        )[1].childNodes,
      ].filter(node => node.innerText !== "") || [];
    listAdsElement?.shift();
    if (listAdsElement?.[0]?.innerText?.includes('Подготовили для вас кампанию с товарами, которые вы пока не продвигаете')) {
      listAdsElement?.shift();
    }
    if (listAdsElement?.[0]?.innerText?.includes('Подготовили кампанию со скидкой')) {
      listAdsElement?.shift();
    }
    if (listAdsElement?.[0]?.innerText?.includes('Добавить API-ключ для расширенной аналитики РК')) {
      listAdsElement?.shift();
    }


    try {
      adsData.forEach((data, index) => {
        if (document.querySelector(`[data-nm-extra-adid="${data.id}"]`)) return;

        const date = moment(data.changeDate).format("DD.MM.YYYY HH:mm");
        const datesElement = listAdsElement[index].childNodes[0].childNodes[0].lastChild;
        datesElement.style.gridTemplateColumns = "repeat(3, max-content)";
        datesElement.innerHTML += `<svg color="var(--color-text-secondary)" fill="currentColor" height="24px" viewBox="0 0 24 24" width="24px"><circle cx="12" cy="12" fill="currentColor" r="2"></circle></svg><div style="color: #4e4e53; font-size: 13px;line-height: 16px;">Изменена: ${date}</div>`;
      });
    } catch (e) {
      injectCampaignAdvancedData(response, adsData)
    }

    alreadyInjectedAds = campaignIds;

    if (adsData.length === listAdsElement.length && adsData.length > 0) {
      const render = (adElement, index) => {
        const campaignId = adsData[index].id;
        if (document.querySelector(`[data-nm-extra-adid="${campaignId}"]`)) return;

        const elementToAppendAfter = adElement.childNodes[0].childNodes[0].lastChild;
        const campaignTitleElement = adElement.childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0]
        const nms = adsData[index].products.map((product) => product.nm);
        const limitNms = 6;
        const totalNms = nms.length;
        const diffNms = totalNms - limitNms;
        const isExtraNms = diffNms > 0;

        const note = notes.find((item) => item.campaign_id === campaignId);
        let noteHtml = "";

        if (note) {
          const date = new Date(note.created_at);
          const dateString =
            date.getDate() +
            "." +
            zeroPad(date.getMonth() + 1, 2) +
            "." +
            zeroPad(date.getFullYear(), 2) +
            " " +
            zeroPad(date.getHours(), 2) +
            ":" +
            zeroPad(date.getMinutes(), 2) +
            ":" +
            zeroPad(date.getSeconds(), 2);

          const user = window.helpEngine.supplierUsers.find(
            (user) => user.id === note.user_id
          );
          const userName = user?.firstName || `Удалён (${note.user_id})`;
          const userLetter = userName[0].toUpperCase();

          noteHtml = `
        <div class="n-campaign-note">
          <div style="display:flex; gap: 6px; align-items: center;">
            <div style="display:flex;gap: 4px;align-items: center;padding: 4px 8px 4px 4px;background: ${stringToColor(userName) + "35"
            }; border-radius: 15px;">
              <div style="width: 20px;height:20px;font-size: 1em;border-radius: 12px;display: flex;justify-content: center;align-items: center;text-shadow: 0 0 10px #000000AA; background: ${stringToColor(
              userName
            )};">
              ${userLetter}
              </div>
              <div style="color: ${stringToColor(
              userName
            )}; font-weight: 600;">${userName}</div>
            </div>
            <div style="font-size: 1.3em;color: #000000;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">
              ${note.data.text}
            </div>
          </div>
        </div>
      `;
        }

        const imagesHtml = nms.slice(0, limitNms).map((nm) => {
          return `
        <a href="https://www.wildberries.ru/catalog/${nm}/detail.aspx" target="_blank" style="position: relative;">
          <img src="${imageURL(nm)}" class="n-inside-nm-images"/>
          <div id="n-product-extra-details" data-product-id="${nm}"></div>
        </a>
        `;
        });
        elementToAppendAfter.insertAdjacentHTML(
          "beforebegin",
          `<div data-nm-extra-adid="${campaignId}" style="margin-bottom: -4px; display: flex; gap: 5px; opacity: 0.8;">
          ${imagesHtml.join("")}
          ${isExtraNms
            ? `<div class="n-outside-extra-nms">
                <span style="font-weight: 600; font-size:1.3em;">+${diffNms}</span>
                <span style="font-size: 0.7em;">товаров</span>
              </div>`
            : ""
          }
        </div>
        ${note ? noteHtml : ""}`
        );
      };

      listAdsElement.forEach(render);

      const whiteAdTypes = [4, 5, 6, 7, 8, 9];
      const whiteAdStatuses = [9, 11];

      async function getAllProductDetails(products, withToken = true) {
        try {

          const headers = {}
          if (withToken) {
            if (WB_TOKEN && WB_TOKEN_DECODED?.user) {
              headers["authorization"] = `Bearer ${WB_TOKEN}`;
            } else {
              if (WB_CAPTCHA) {
                headers["x-captcha-id"] = `Catalog ${WB_CAPTCHA}`;
              }
            }
          }

          const request = await new Promise((resolve, reject) => {

            const timeoutHandler = setTimeout(() => {
              resolve([]);
            }, 3000);

            const onResponse = (response) => {
              clearTimeout(timeoutHandler);
              if (response) {
                resolve(response);
              } else {
                resolve([]);
              }
            };

            window.chrome.runtime.sendMessage(
              NEUROMARKET_CHROME_ID,
              {
                type: "fetchJson",
                url: `https://card.wb.ru/cards/v2/detail?appType=${APPTYPE[CURRENT_APPTYPE]
                  }&curr=rub&dest=${REGIONS[CURRENT_REGION].dest
                  }&spp=30&nm=${products.join(";")}`,
                options: {
                  headers,
                  body: null,
                  method: "GET",
                  mode: "cors",
                  credentials: "include",
                },
              },
              onResponse
            );
          });

          const response = request;
          return response?.products;
        } catch (e) {
          console.log(e);
          return [];
        }
      }

      const productIds = adsData.reduce((nms, cur) => {
        nms.push(...cur.products.map((product) => product.nm));
        return nms;
      }, []);

      const allProductOutsideDetails = await getAllProductDetails(productIds);
      try {
        const allProductsElements = [
          ...document.querySelectorAll("#n-product-extra-details"),
        ];
        allProductsElements.forEach((el) => {
          const productId = Number(el.dataset.productId);
          const details = allProductOutsideDetails.find(
            (product) => product.id === productId
          );
          const price =
            (details?.sizes.find((size) => size.hasOwnProperty("price"))?.price
              ?.total / 100) || 0;

          const foundStocksData = stocksData.find(item => item.nmID === productId)
          const totalStocks = foundStocksData
            ? foundStocksData?.metrics?.stockCount
            : details?.sizes.reduce((sum, size) => {
              return (sum += size.stocks.reduce((stocksSum, stock) => {
                return (stocksSum += stock.qty);
              }, 0));
            }, 0) || 0;

          const hasPromo = !!details?.promoTextCard;

          const template = [];

          if (price) {
            template.push(
              `<div class="n-product-extra-top-badge">${price}₽</div>`
            );
          }

          template.push(
            `<div class="n-product-extra-bottom-badge" style="${totalStocks === 0 ? "background: #ff0000c2;" : ""
            }">${totalStocks}<small>шт.</small></div>`
          );

          if (hasPromo) {
            const promoTitle = details.promoTextCard
            template.push(
              `<div class="n-product-promo-badge" style="${totalStocks === 0 ? "background: #ff0000c2;" : null
              }" data-tip="Акция: ${promoTitle}">⭐</div>`
            );
          }

          el.innerHTML = template.join("");
        });
        tippy("[data-tip]", {
          content(reference) {
            const desc = reference.getAttribute("data-tip");
            return `
            <div class="n-column-tip">
              ${desc}
            </div>
            `;
          },
          arrow: false,
          followCursor: false,
          placement: "top",
          allowHTML: true,
        });
      } catch (e) {
        console.log(e);
      }

      if (window.helpEngine === undefined) {
        window.helpEngine = new NeuromarketEngine();
        if (!window.helpEngine.accessToken) {
          await window.helpEngine.getAccessToken();
        }
        await window.helpEngine.getSupplierUsers();
        await window.helpEngine.getSupplier();
      }

      const ApiToken = JSON.parse(
        localStorage.getItem("neuromarket-api-token") || "{}"
      )?.[window.helpEngine.supplierId];

      if (ApiToken) {
        if (window.helpEngine.ApiToken !== ApiToken) {
          window.helpEngine.ApiToken = ApiToken;
        }
        const date = new Date();
        const dateString =
          date.getFullYear() +
          "-" +
          zeroPad(date.getMonth() + 1, 2) +
          "-" +
          zeroPad(date.getDate(), 2);

        const adIds = adsData.map((ad) => ad.id);
        const adsInfo = await window.helpEngine.apiGetAdsInfo(adIds);
        const adsStats = (await window.helpEngine.apiGetAdsStats(adIds)) || [];

        for (const [index, adData] of adsData.entries()) {
          const parentElement = listAdsElement[index].childNodes[0].childNodes[0];
          const elementToAppendAfter =
            parentElement.lastChild;
          elementToAppendAfter.insertAdjacentHTML(
            "afterend",
            `<div id="n-campaign-detailed-stats" data-campaign-id="${adData.id}" class="n-campaign-detailed-stats">`
          );
        }

        for (const [index, adData] of adsData.entries()) {
          try {
            if (!whiteAdTypes.includes(adData.type)) continue;
            // if (!whiteAdStatuses.includes(adData.statusId)) continue;

            window.__NEUROMARKET_AD_TYPE = AD_TYPES[adData.type] || null;
            if (!window.__NEUROMARKET_AD_TYPE) continue;

            const adInfo = adsInfo.find((ad) => ad.advertId === adData.id);
            const adType = adInfo.type;
            const adStat =
              adsStats.find((stats) => stats.advertId === adData.id)
                ?.days?.[0] || undefined;
            let money = 0;
            let ctr = 0;
            let cpc = 0;
            let views = 0;
            let clicks = 0;

            if (adStat) {
              money = adStat.sum;
              cpc = adStat.cpc;
              views = adStat.views;
              clicks = adStat.clicks;
              ctr = precise.round((clicks / views) * 100, 2);
            }

            let cpm;
            if (adType === 8) {
              cpm =
                adInfo?.autoParams?.nmCPM?.[0]?.cpm ||
                adInfo?.autoParams?.cpm ||
                0;
            }
            if (adType === 9) {
              cpm = adInfo?.unitedParams?.[0]?.searchCPM || 0;
            }

            await delay(255);
            const budget = (await window.helpEngine.apiGetAdBudget(adData.id))
              .total;
            if (budget === undefined || cpm === undefined) {
              continue;
            }

            const statsElement = document.querySelector(
              `[data-campaign-id="${adData.id}"]`
            );
            if (!statsElement) return;

            statsElement.innerHTML = `
            <p style="display:flex; flex-direction: column; color: black;">
                  <span>CPM:</span>
                  <span style="font-weight: 500;">${cpm}₽</span>
                </p>
                <p style="display:flex; flex-direction: column; color: black;">
                  <span>Баланс:</span>
                  <span style="font-weight: 500;">${budget}₽</span>
                </p>
                ${adStat
                ? `
                  <p style="display:flex; flex-direction: column; color: black;">
                    <span>Показы:</span>
                    <span style="font-weight: 500;">${views}</span>
                  </p>
                  <p style="display:flex; flex-direction: column; color: black;">
                    <span>Клики:</span>
                    <span style="font-weight: 500;">${clicks}</span>
                    </p>
                  <p style="display:flex; flex-direction: column; color: black;">
                    <span>CTR:</span>
                    <span style="font-weight: 500;">${ctr}%</span>
                  </p>
                  <p style="display:flex; flex-direction: column; color: black;">
                    <span>CPC:</span>
                    <span style="font-weight: 500;">${cpc}₽</span>
                  </p>
                  <p style="display:flex; flex-direction: column; color: black;">
                    <span>Затраты:</span>
                    <span style="font-weight: 500;">${money}₽</span>
                  </p>
                `
                : ""
              }`;
          } catch (e) {
            console.log(e);
            await delay(30000);
            return;
          }
        }
      }
    }
  }
})();
