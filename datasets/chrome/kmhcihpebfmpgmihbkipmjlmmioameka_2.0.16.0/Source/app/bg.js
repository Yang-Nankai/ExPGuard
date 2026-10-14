(function () {
  'use strict';

  const json = (obj) => JSON.parse(JSON.stringify(obj));

  const ensureLength = (str, length, char = " ", right = true) => {
    let i = 0;
    while (str.length < length && i++ < 100) {
      if (right) {
        str = char + str;
      } else {
        str = str + char;
      }
    }
    return str;
  };

  const el = (msg, length = 30, space = " ") => ensureLength(msg, length, space);
  const sl = (msg, length = 30, space = " ") => el(msg, length, space);

  var AppType = /* @__PURE__ */ ((AppType2) => {
    AppType2["unknown"] = "0";
    AppType2["spa"] = "1";
    AppType2["pwa"] = "2";
    AppType2["bex"] = "3";
    AppType2["capacitor"] = "4";
    AppType2["electron"] = "5";
    return AppType2;
  })(AppType || {});
  var AppMode = /* @__PURE__ */ ((AppMode2) => {
    AppMode2["normal"] = "normal";
    AppMode2["bg"] = "bg";
    AppMode2["offscreen"] = "offscreen";
    AppMode2["enable"] = "enable";
    AppMode2["signTx"] = "signTx";
    AppMode2["signData"] = "signData";
    AppMode2["sidePanel"] = "sidePanel";
    AppMode2["permissions"] = "permissions";
    return AppMode2;
  })(AppMode || {});
  var Platform = /* @__PURE__ */ ((Platform2) => {
    Platform2["unknown"] = "0";
    Platform2["web"] = "1";
    Platform2["ios"] = "2";
    Platform2["android"] = "3";
    Platform2["windows"] = "4";
    Platform2["mac"] = "5";
    Platform2["linux"] = "6";
    return Platform2;
  })(Platform || {});
  var Environment = /* @__PURE__ */ ((Environment2) => {
    Environment2["unknown"] = "unknown";
    Environment2["production"] = "production";
    Environment2["development"] = "development";
    return Environment2;
  })(Environment || {});

  let _apiURL = null;
  const setApiURL = (url) => {
    try {
      const _url = new URL(url).toString();
      _apiURL = _url.substring(0, _url.length - 1);
    } catch (err) {
      console.error("setApiURL", err);
    }
  };

  const _appInfo = {
    appType: AppType.unknown,
    appMode: AppMode.normal,
    platform: Platform.unknown,
    environment: Environment.unknown,
    token: "",
    pen: "",
    isStaging: false,
    isBeta: false,
    addApex: false,
    isMobileApp: false,
    isIosApp: false,
    isAndroidApp: false,
    hasWebUSB: false,
    useCoolify: false,
    localSwapBackend: "",
    localTranslationsBackend: "",
    doRestrictFeatures: true};
  const initAppInfo = (params) => {
    _appInfo.appType = checkAppType(params.TYPE);
    _appInfo.appMode = checkAppMode(AppMode.normal);
    _appInfo.platform = checkPlatform(params.PLATFORM);
    _appInfo.environment = checkEnvironment(params.ENVIRONMENT);
    _appInfo.token = params.TOKEN;
    _appInfo.pen = params.PEN;
    _appInfo.isStaging = params.IS_STAGING === "yes";
    _appInfo.isBeta = params.IS_BETA === "yes";
    _appInfo.addApex = params.ADD_APEX === "yes";
    _appInfo.useCoolify = params.USE_COOLIFY === "yes";
    _appInfo.localSwapBackend = params.LOCAL_SWAP_BACKEND;
    _appInfo.localTranslationsBackend = params.LOCAL_TRANSLATIONS_BACKEND;
    _appInfo.isMobileApp = _appInfo.appType === AppType.capacitor;
    _appInfo.isIosApp = _appInfo.isMobileApp && _appInfo.platform === Platform.ios;
    _appInfo.isAndroidApp = _appInfo.isMobileApp && _appInfo.platform === Platform.android;
    _appInfo.hasWebUSB = "usb" in navigator;
    const hostName = globalThis?.location?.hostname ?? "";
    let apiURL = params.HOST_API;
    if (_appInfo.environment === Environment.production && (_appInfo.appType === AppType.spa || _appInfo.appType === AppType.pwa) && !hostName.toLowerCase().includes("local") && !apiURL) {
      apiURL = "https://api." + hostName;
    }
    _appInfo.doRestrictFeatures = _appInfo.environment === Environment.production && (apiURL.includes("ccwallet.io") || apiURL.includes("ccvault.io") || apiURL.includes("localhost"));
    setApiURL(apiURL);
  };
  const checkAppType = (type) => {
    let res = AppType.unknown;
    switch (type) {
      case "spa":
        res = AppType.spa;
        break;
      case "pwa":
        res = AppType.pwa;
        break;
      case "bex":
        res = AppType.bex;
        break;
      case "capacitor":
        res = AppType.capacitor;
        break;
      case "electron":
        res = AppType.electron;
        break;
    }
    return res;
  };
  const checkPlatform = (platform) => {
    let res = Platform.unknown;
    switch (platform) {
      case "web":
        res = Platform.web;
        break;
      case "ios":
        res = Platform.ios;
        break;
      case "android":
        res = Platform.android;
        break;
      case "windows":
        res = Platform.windows;
        break;
      case "mac":
        res = Platform.mac;
        break;
      case "linux":
        res = Platform.linux;
        break;
    }
    return res;
  };
  const checkEnvironment = (environment) => {
    switch (environment) {
      case Environment.unknown:
      case Environment.production:
      case Environment.development:
        return environment;
    }
    return Environment.unknown;
  };
  const checkAppMode = (mode) => {
    switch (mode) {
      case AppMode.normal:
      case AppMode.bg:
      case AppMode.enable:
      case AppMode.signTx:
      case AppMode.signData:
        return mode;
    }
    return AppMode.normal;
  };

  const params = {
    HOST_API: "https://api.eternl.io",
    USE_COOLIFY: "yes",
    TOKEN: "#!l4n56cGPHoHM3Z@xiT&CV8",
    ENVIRONMENT: "production",
    TYPE: "bex",
    PEN: "k%%2Gb6^!m8iMIvwlnS2xpWC",
    PLATFORM: "web",
    IS_STAGING: "no",
    IS_BETA: "no",
    ADD_APEX: "yes",
    LOCAL_SWAP_BACKEND: undefined                                     ,
    LOCAL_TRANSLATIONS_BACKEND: undefined                                             
  };
  initAppInfo(params);

  const setAppMode$1 = (mode) => {
    _appInfo.appMode = mode;
    if (typeof window !== "undefined") {
      window.appMode = mode;
    }
  };

  const networkIdList = ["mainnet", "preprod", "preview", "guild", "sancho", "afvt", "afvm", "afpt", "afpm"];
  const networkFeaturesMap = networkIdList.reduce((o, n) => {
    o[n] = 0 /* NONE */;
    return o;
  }, {});
  networkFeaturesMap["mainnet"] = 255 /* ALL */;
  networkFeaturesMap["guild"] = 1 /* STAKING */;
  networkFeaturesMap["sancho"] = 1 /* STAKING */ | 16 /* DAPP_BROWSER */ | 8 /* GOVERNANCE */;
  networkFeaturesMap["preprod"] = 1 /* STAKING */ | 16 /* DAPP_BROWSER */ | 8 /* GOVERNANCE */ | 4 /* CATALYST */;
  networkFeaturesMap["preview"] = 1 /* STAKING */ | 16 /* DAPP_BROWSER */ | 8 /* GOVERNANCE */;
  networkFeaturesMap["afpt"] = 1 /* STAKING */;
  networkFeaturesMap["afpm"] = 1 /* STAKING */;
  networkFeaturesMap["afvt"] = 1 /* STAKING */ | 16 /* DAPP_BROWSER */;
  networkFeaturesMap["afvm"] = 1 /* STAKING */ | 16 /* DAPP_BROWSER */;
  const getNetworkId$1 = (id) => {
    switch (id) {
      case "mainnet":
        return 1;
      case "guild":
        return 0;
      case "sancho":
        return 0;
      case "preprod":
        return 0;
      case "preview":
        return 0;
      case "afvt":
        return 1;
      case "afvm":
        return 1;
      case "afpt":
        return 0;
      case "afpm":
        return 1;
    }
    throw new Error("Error: INetwork.getNetworkId: unknown network: " + id);
  };
  const isSupportedNetworkId = (id) => networkIdList.includes(id);

  const setAppMode = (mode) => {
    if (mode === AppMode.normal) {
      setAppMode$1(AppMode.normal);
    } else if (mode === AppMode.enable) {
      setAppMode$1(AppMode.enable);
    } else if (mode === AppMode.signTx) {
      setAppMode$1(AppMode.signTx);
    } else if (mode === AppMode.signData) {
      setAppMode$1(AppMode.signData);
    } else if (mode === AppMode.bg) {
      setAppMode$1(AppMode.bg);
    } else if (mode === AppMode.offscreen) {
      setAppMode$1(AppMode.offscreen);
    } else if (mode === AppMode.sidePanel) {
      setAppMode$1(AppMode.sidePanel);
    }
  };

  const extCip30 = { cip: 30 };
  const extCip95 = { cip: 95 };
  const extCip103 = { cip: 103 };
  const extCip104 = { cip: 104 };
  const extCip142 = { cip: 142 };
  const supportedExtensions = [
    extCip30,
    extCip95,
    extCip103,
    extCip104,
    extCip142
  ];
  const autoGrantWithCIP30List = [
    extCip103,
    extCip142
  ];
  const METHOD = {
    enable: "enable",
    isEnabled: "isEnabled",
    getExtensions: "getExtensions",
    getNetworkId: "getNetworkId",
    signData: "signData",
    signTx: "signTx",
    enableLogs: "enableLogs",
    // CIP-103
    signTxs: "signTxs",
    // CIP-142
    getNetworkMagic: "getNetworkMagic",
    // experimental
    getConnectedNetworkId: "getConnectedNetworkId"
  };

  var ApiChannel = /* @__PURE__ */ ((ApiChannel2) => {
    ApiChannel2["domToCS"] = "eternl-dom-to-cs";
    ApiChannel2["csToDom"] = "eternl-cs-to-dom";
    ApiChannel2["csToBg"] = "eternl-cs-to-bg";
    ApiChannel2["bgToCs"] = "eternl-bg-to-cs";
    ApiChannel2["bgToEnable"] = "eternl-bg-to-enable";
    ApiChannel2["enableToBg"] = "eternl-enable-to-bg";
    ApiChannel2["bgToSidePanel"] = "eternl-bg-to-side-panel";
    ApiChannel2["sidePanelToBg"] = "eternl-side-panel-to-bg";
    ApiChannel2["bgToMain"] = "eternl-bg-to-main";
    ApiChannel2["mainToBg"] = "eternl-main-to-bg";
    ApiChannel2["bgToPermissions"] = "eternl-bg-to-permissions";
    ApiChannel2["permissionsToBg"] = "eternl-permissions-to-bg";
    ApiChannel2["bgToSignTx"] = "eternl-bg-to-sign-tx";
    ApiChannel2["signTxToBg"] = "eternl-sign-tx-to-bg";
    ApiChannel2["bgToSignData"] = "eternl-bg-to-sign-data";
    ApiChannel2["signDataToBg"] = "eternl-sign-data-to-bg";
    ApiChannel2["popupToBg"] = "eternl-popup-to-bg";
    ApiChannel2["bgToOffscreen"] = "eternl-bg-to-offscreen";
    ApiChannel2["offscreenToBg"] = "eternl-offscreen-to-bg";
    return ApiChannel2;
  })(ApiChannel || {});

  let doLogAll = false;
  const enableLogs = (enable) => {
    doLogAll = enable;
  };

  var ApiErrorCode = /* @__PURE__ */ ((ApiErrorCode2) => {
    ApiErrorCode2[ApiErrorCode2["InvalidRequest"] = -1] = "InvalidRequest";
    ApiErrorCode2[ApiErrorCode2["InternalError"] = -2] = "InternalError";
    ApiErrorCode2[ApiErrorCode2["Refused"] = -3] = "Refused";
    ApiErrorCode2[ApiErrorCode2["AccountChange"] = -4] = "AccountChange";
    return ApiErrorCode2;
  })(ApiErrorCode || {});
  var DataSignErrorCode = /* @__PURE__ */ ((DataSignErrorCode2) => {
    DataSignErrorCode2[DataSignErrorCode2["ProofGeneration"] = 1] = "ProofGeneration";
    DataSignErrorCode2[DataSignErrorCode2["AddressNotPK"] = 2] = "AddressNotPK";
    DataSignErrorCode2[DataSignErrorCode2["UserDeclined"] = 3] = "UserDeclined";
    DataSignErrorCode2[DataSignErrorCode2["InvalidFormat"] = 4] = "InvalidFormat";
    return DataSignErrorCode2;
  })(DataSignErrorCode || {});
  var TxSignErrorCode = /* @__PURE__ */ ((TxSignErrorCode2) => {
    TxSignErrorCode2[TxSignErrorCode2["ProofGeneration"] = 1] = "ProofGeneration";
    TxSignErrorCode2[TxSignErrorCode2["UserDeclined"] = 2] = "UserDeclined";
    TxSignErrorCode2[TxSignErrorCode2["DeprecatedCertificate"] = 3] = "DeprecatedCertificate";
    return TxSignErrorCode2;
  })(TxSignErrorCode || {});

  const createInternalError = (info) => ({ success: false, error: { code: ApiErrorCode.InternalError, info } });
  const createInvalidRequestError = (info) => ({ success: false, error: { code: ApiErrorCode.InvalidRequest, info } });
  const errorInternal = (e) => createInternalError(e);
  const errorNoReqId = () => createInternalError("Error: no reqId");
  const errorNoApi = () => createInternalError("Error: no api");
  const errorNoPayload = () => createInternalError("Error: no payload");
  const errorNoOrigin = () => createInternalError("Error: no origin");
  const errorComsMalformed = () => createInternalError("Error: coms malformed");
  const errorNoAccount = () => createInternalError("no account set");
  const errorNoNetworkId = () => createInternalError("no networkId");
  const errorNoNetworkMagic = () => createInternalError("no network magic");
  const errorNotConnected = () => createInvalidRequestError("not connected");
  const errorInvalidArgument = () => createInvalidRequestError("invalid argument");
  const errorUnsupportedExtensions = (extensions) => createInvalidRequestError("unsupported extensions requested: " + extensions);
  const errorConnectionRefused = () => ({ success: false, error: { code: ApiErrorCode.Refused, info: "user canceled connection" } });
  const errorAccountChanged = () => ({ success: false, error: { code: ApiErrorCode.AccountChange, info: "account changed" } });
  const errorTxUserDeclined = () => ({ success: false, error: { code: TxSignErrorCode.UserDeclined, info: "user declined sign tx" } });
  const errorDataUserDeclined = () => ({ success: false, error: { code: DataSignErrorCode.UserDeclined, info: "user declined sign data" } });

  const urlPermissions = "app/permissions.html";
  const urlEnable = "app/enable.html";
  const urlSignTx = "app/signTx.html";
  const urlSignData = "app/signData.html";

  const pendingApiRequests = "pendingApiRequests";
  const _pendingApiRequestList = [];
  const getPendingAPIRequest = (req) => {
    let _req = _pendingApiRequestList.find((r) => r.reqId === req.reqId);
    if (!_req) {
      if (req.hasOwnProperty("timestamp")) {
        _req = req;
      }
    }
    return _req ?? null;
  };
  const addPendingAPIRequest = (pendingAPIRequest) => {
    _pendingApiRequestList.unshift(pendingAPIRequest);
    setAllPendingAPIRequests(_pendingApiRequestList);
  };
  const removePendingAPIRequest = (reqId) => {
    let removed = false;
    for (let i = _pendingApiRequestList.length - 1; i >= 0; i--) {
      const removedRequest = _pendingApiRequestList[i];
      if (removedRequest.reqId === reqId) {
        removed = true;
        _pendingApiRequestList.splice(i, 1);
      }
    }
    if (removed) {
      setAllPendingAPIRequests(_pendingApiRequestList);
    }
  };
  const initPendingApiRequestListIntoMemory = async () => {
    const allPendingAPIRequests = await getAllPendingAPIRequests();
    for (const pendingAPIRequest of allPendingAPIRequests) {
      if (!pendingAPIRequest.reqId || !pendingAPIRequest.origin || !pendingAPIRequest.tabId || !pendingAPIRequest.timestamp) {
        continue;
      }
      if (Date.now() - pendingAPIRequest.timestamp < 1e3 * 60 * 5) {
        _pendingApiRequestList.push(pendingAPIRequest);
      }
    }
    return setAllPendingAPIRequests(_pendingApiRequestList);
  };
  const setAllPendingAPIRequests = async (allPendingAPIRequests) => {
    return new Promise((resolve) => {
      chrome.storage.local.set({ pendingApiRequests: allPendingAPIRequests }, () => {
        if (chrome.runtime.lastError) {
          console.error("setAllPendingAPIRequests:", chrome.runtime.lastError);
        }
        resolve();
      });
    });
  };
  const getAllPendingAPIRequests = async () => {
    return new Promise((resolve) => {
      chrome.storage.local.get(pendingApiRequests, (result) => {
        if (chrome.runtime.lastError) {
          console.error("getAllPendingAPIRequests:", chrome.runtime.lastError);
        }
        if (result.pendingApiRequests && Array.isArray(result.pendingApiRequests)) {
          resolve(result.pendingApiRequests);
        } else {
          resolve([]);
        }
      });
    });
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const doLog = false;
  const storeId$3 = "initOffscreenPage";
  if (doLogAll || doLog) {
    console.warn(el(storeId$3), sl("loaded"));
  }
  let _offscreenCreationPromise = null;
  const ensureOffscreenPage = async () => {
    const hasDocument = await chrome.offscreen.hasDocument();
    if (hasDocument) {
      return;
    }
    if (doLogAll) {
      console.warn(el(storeId$3), sl("ensureOffscreenPage"), _offscreenCreationPromise);
    }
    if (!_offscreenCreationPromise) {
      _offscreenCreationPromise = chrome.offscreen.createDocument({
        url: "app/offscreen.html",
        justification: "Manage localStorage. Manage parallel syncing using workers.",
        reasons: [
          chrome.offscreen.Reason.LOCAL_STORAGE,
          chrome.offscreen.Reason.WORKERS
        ]
      }).then(() => {
        _offscreenCreationPromise = null;
      }).catch((err) => {
        console.error("Error creating offscreen page:", err);
        _offscreenCreationPromise = null;
        throw err;
      });
    }
    if (chrome.runtime.lastError) {
      console.error(el("ensureOffscreenPage"), sl("chrome.offscreen.createDocument"), chrome.runtime.lastError);
    }
    await _offscreenCreationPromise;
    await sleep(500);
  };

  const openUI = async (deeplink, route = "index.html") => {
    await ensureOffscreenPage();
    const url = chrome.runtime.getURL(route) + (deeplink ? "#?dl=" + deeplink : "");
    return new Promise((resolve) => {
      chrome.tabs.query({ url }, (tabs) => {
        if (chrome.runtime.lastError) {
          return console.error("openUI: query", chrome.runtime.lastError);
        }
        if (tabs && tabs.length > 0) {
          const tab = tabs[0];
          const tabId = tab.id;
          if (tabId !== void 0) {
            chrome.tabs.update(tabId, { active: true }, () => {
              if (chrome.runtime.lastError) {
                console.error("openUI: updating tab:", chrome.runtime.lastError);
              }
              resolve(tabId);
            });
            chrome.windows.update(tab.windowId, { focused: true }, () => {
              if (chrome.runtime.lastError) {
                console.error("openUI: updating window:", chrome.runtime.lastError);
              }
            });
          }
        } else {
          chrome.tabs.create({ url }, (tab) => {
            if (chrome.runtime.lastError) {
              console.error("openUI: creating tab:", chrome.runtime.lastError);
            }
            resolve(tab.id ?? null);
          });
        }
      });
    });
  };
  const closeUI = async (route = "index.html") => {
    const url = chrome.runtime.getURL(route);
    chrome.tabs.query({ url }, (tabs) => {
      if (chrome.runtime.lastError) {
        return console.error("closeUI: query", chrome.runtime.lastError);
      }
      if (tabs && tabs.length > 0) {
        const tab = tabs[0];
        const tabId = tab.id;
        if (tabId !== void 0) {
          chrome.tabs.remove(tabId, () => {
            if (chrome.runtime.lastError) {
              console.error("closeUI: updating tab:", chrome.runtime.lastError);
            }
          });
        }
      }
    });
  };

  let _connectedOriginsMap = {};
  let _networkId = "mainnet";
  let _dappAccountId = "";
  let _originAccountList = [];
  const getDappAccountId = () => _dappAccountId;
  const getNetworkId = () => _networkId;
  const setConnectedOriginsMap = (connectedOriginsMap) => {
    _connectedOriginsMap = connectedOriginsMap;
    return _connectedOriginsMap;
  };
  const setDappAccountId = (dappAccountId) => {
    _dappAccountId = dappAccountId;
    return _dappAccountId;
  };
  const setNetworkId = (networkId) => {
    _networkId = networkId;
    return _networkId;
  };
  const setOriginAccountList = (originAccountList) => {
    _originAccountList = originAccountList;
    return _originAccountList;
  };
  const addConnectedOrigin$1 = (origin, extensions) => {
    if (!extensions) {
      return _connectedOriginsMap;
    }
    const originExtensionList = _connectedOriginsMap[origin] ?? [];
    for (const extension of extensions) {
      if (!originExtensionList.some((e) => e.cip === extension.cip)) {
        originExtensionList.push(extension);
      }
    }
    _connectedOriginsMap[origin] = originExtensionList;
    return _connectedOriginsMap;
  };
  const isConnectedOrigin$1 = (origin, extensions) => {
    if (!origin) {
      return void 0;
    }
    const map = _connectedOriginsMap;
    let originExtensions = map[origin];
    if (!originExtensions) {
      return extensions;
    }
    const grantExtensionList = [];
    if (extensions) {
      grantExtensionList.push(...extensions);
    }
    if (typeof originExtensions === "object") {
      originExtensions = Object.values(originExtensions);
    }
    for (let i = 0; i < originExtensions.length; i++) {
      const extension = originExtensions[i];
      const index = grantExtensionList.findIndex((e) => e.cip === extension.cip);
      if (index > -1) {
        grantExtensionList.splice(index, 1);
      }
    }
    return grantExtensionList.length === 0 ? null : grantExtensionList;
  };
  const getConnectedExtensions$1 = (origin) => {
    const map = _connectedOriginsMap;
    return origin ? map[origin] ?? [] : [];
  };
  const setOriginAccount$1 = (origin, domId, calledEnable) => {
    if (!domId) {
      domId = "/ndi";
    }
    if (!domId.startsWith("/")) {
      domId = "/" + domId;
    }
    let found = false;
    let originAccount = null;
    for (let i = 0; i < _originAccountList.length; i++) {
      const entry = _originAccountList[i];
      if (entry.origin === origin && entry.domId === domId) {
        originAccount = entry;
        entry.lastUpdated = Date.now();
        if (entry.accountId === _dappAccountId) {
          entry.needsEnableCall = false;
        } else if (calledEnable) {
          entry.accountId = _dappAccountId;
          entry.needsEnableCall = false;
        } else {
          entry.needsEnableCall = true;
        }
        found = true;
        break;
      }
    }
    if (!found) {
      originAccount = {
        accountId: _dappAccountId,
        origin,
        domId,
        lastUpdated: Date.now(),
        needsEnableCall: !calledEnable
      };
      _originAccountList.push(originAccount);
    }
    for (let i = _originAccountList.length - 1; i >= 0; i--) {
      const entry = _originAccountList[i];
      if (entry.lastUpdated < Date.now() - 1e3 * 60 * 60 * 4) {
        _originAccountList.splice(i, 1);
      }
    }
    return { originAccountList: _originAccountList, originAccount };
  };

  const originEnabledMap = "originEnabledMap";
  const originAccountList = "originAccountList";
  const dappAccountId = "dappAccountId";
  const networkId$9 = "networkId";
  const getStorageDappAccountId = getDappAccountId;
  const getStorageNetworkId = getNetworkId;
  const initChromeStorage = () => {
    chrome.storage.onChanged.addListener((changes, namespace) => {
      if (namespace !== "local") {
        return;
      }
      for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        if (key === originEnabledMap) {
          setConnectedOriginsMap(newValue);
        } else if (key === originAccountList) {
          setOriginAccountList(newValue);
        } else if (key === networkId$9) {
          const changed = getNetworkId() !== newValue;
          if (changed) {
            setNetworkId(newValue);
          }
        } else if (key === dappAccountId) {
          const changed = getDappAccountId() !== newValue;
          if (changed) {
            setDappAccountId(newValue);
          }
        }
      }
    });
    const calls = [];
    calls.push(chrome.storage.local.get(originEnabledMap).then((res) => {
      setConnectedOriginsMap(res.originEnabledMap ?? {});
    }));
    calls.push(chrome.storage.local.get(originAccountList).then((res) => {
      setOriginAccountList(res.originAccountList ?? []);
    }));
    calls.push(chrome.storage.local.get(dappAccountId).then((res) => {
      setDappAccountId(res.dappAccountId ?? "");
    }));
    calls.push(chrome.storage.local.get(networkId$9).then((res) => {
      setNetworkId(res.networkId ?? "mainnet");
    }));
    calls.push(initPendingApiRequestListIntoMemory());
    return Promise.allSettled(calls);
  };
  const addConnectedOrigin = (origin, extensions) => {
    const _connectedOriginsMap = addConnectedOrigin$1(origin, extensions);
    storeOriginEnableMap(_connectedOriginsMap);
    return _connectedOriginsMap;
  };
  const isConnectedOrigin = (origin, extensions) => isConnectedOrigin$1(origin, extensions);
  const getConnectedExtensions = (origin) => getConnectedExtensions$1(origin);
  const setOriginAccount = (origin, domId, calledEnable) => {
    const {
      originAccountList: originAccountList2,
      originAccount
    } = setOriginAccount$1(origin, domId, calledEnable);
    storeAccountOriginList(originAccountList2);
    return originAccount;
  };
  const storeOriginEnableMap = (originEnabledMap2) => chrome.storage.local.set({ originEnabledMap: originEnabledMap2 });
  const storeAccountOriginList = (originAccountList2) => chrome.storage.local.set({ originAccountList: originAccountList2 });
  const storeDappAccountId = (dappAccountId2) => chrome.storage.local.set({ dappAccountId: dappAccountId2 });
  const storeNetworkId = (networkId2) => chrome.storage.local.set({ networkId: networkId2 });

  const initContentScriptFromSW = () => {
    const manifest = chrome.runtime.getManifest();
    const csList = manifest.content_scripts;
    if (csList) {
      for (const cs of csList) {
        if (!cs.js || !cs.js[0]?.includes("content.js")) {
          continue;
        }
        chrome.tabs.query({}).then((tabs) => {
          if (chrome.runtime.lastError) {
            console.error("initContentScriptFromSW", chrome.runtime.lastError);
          }
          for (const tab of tabs) {
            if (tab.url?.includes("chrome://extensions")) {
              continue;
            }
            chrome.scripting.executeScript({
              target: { tabId: tab.id },
              files: cs.js
            }).then((obj) => {
            }).catch((err) => {
            });
          }
        });
      }
    }
    return true;
  };

  const TEST_INTERVAL_MS = 1e3 * 10;
  const STORAGE_WAIT_TIME_MS = 5e3;
  const hasChromiumIssue395536907 = () => {
    return new Promise((resolve) => {
      let dispatched = false;
      const testEventDispatching = (changes) => {
        chrome.storage.local.onChanged.removeListener(testEventDispatching);
        dispatched = true;
      };
      chrome.storage.local.onChanged.addListener(testEventDispatching);
      chrome.storage.local.set({ testEventDispatching: Math.random() });
      setTimeout(() => resolve(!dispatched), STORAGE_WAIT_TIME_MS);
    });
  };
  const cleanupExtension = () => {
    chrome.tabs.query({}).then((tabs) => {
      if (chrome.runtime.lastError) {
        console.error("fixChromiumIssue395536907: query", chrome.runtime.lastError);
      }
      for (const tab of tabs) {
        const url = tab.url ?? "";
        if (url.includes("app/signTx") || url.includes("app/signData") || url.includes("app/enable")) {
          console.error("fixChromiumIssue395536907: closing extension popup:", tab.url);
          chrome.tabs.remove(tab.id, () => {
            if (chrome.runtime.lastError) {
              console.error("fixChromiumIssue395536907: remove", chrome.runtime.lastError);
            }
          });
        }
      }
    }).then(() => {
      setTimeout(() => {
        console.error("fixChromiumIssue395536907: reloading extension.");
        chrome.runtime.reload();
      }, 250);
    });
  };
  self.cleanupExtension = cleanupExtension;
  const logChromiumIssue395536907 = () => {
    hasChromiumIssue395536907().then((hasIssue) => {
      if (hasIssue) {
        console.warn("Chromium issue 395536907 detected.");
      }
      setTimeout(logChromiumIssue395536907, TEST_INTERVAL_MS);
    });
  };

  const activeSlotsCoeff$8 = 0.05;
  const protocolParams$8 = {"protocolVersion":{"minor":0,"major":2},"decentralisationParam":1,"eMax":18,"extraEntropy":{"tag":"NeutralNonce"},"maxTxSize":16384,"maxBlockBodySize":65536,"maxBlockHeaderSize":1100,"minFeeA":44,"minFeeB":155381,"minUTxOValue":1000000,"poolDeposit":500000000,"minPoolCost":340000000,"keyDeposit":2000000,"nOpt":150,"rho":0.003,"tau":0.2,"a0":0.3};
  const updateQuorum$8 = 5;
  const networkId$8 = "Mainnet";
  const initialFunds$1 = {};
  const maxLovelaceSupply$8 = 45000000000000000;
  const networkMagic$8 = 764824073;
  const epochLength$8 = 432000;
  const systemStart$8 = "2017-09-23T21:44:51Z";
  const slotsPerKESPeriod$8 = 129600;
  const slotLength$8 = 1;
  const maxKESEvolutions$8 = 62;
  const securityParam$8 = 2160;
  const mainnetShelley = {
    activeSlotsCoeff: activeSlotsCoeff$8,
    protocolParams: protocolParams$8,
    updateQuorum: updateQuorum$8,
    networkId: networkId$8,
    initialFunds: initialFunds$1,
    maxLovelaceSupply: maxLovelaceSupply$8,
    networkMagic: networkMagic$8,
    epochLength: epochLength$8,
    systemStart: systemStart$8,
    slotsPerKESPeriod: slotsPerKESPeriod$8,
    slotLength: slotLength$8,
    maxKESEvolutions: maxKESEvolutions$8,
    securityParam: securityParam$8,
  };

  const maxLovelaceSupply$7 = 45000000000000000;
  const securityParam$7 = 36;
  const slotsPerKESPeriod$7 = 129600;
  const updateQuorum$7 = 1;
  const activeSlotsCoeff$7 = 0.05;
  const protocolParams$7 = {"minUTxOValue":1000000,"eMax":18,"extraEntropy":{"tag":"NeutralNonce"},"minFeeB":1000,"tau":0.1,"maxBlockBodySize":65536,"minPoolCost":340000000,"minFeeA":1,"maxTxSize":16384,"nOpt":10,"maxBlockHeaderSize":1100,"keyDeposit":2000000,"protocolVersion":{"minor":0,"major":2},"poolDeposit":500000000,"a0":0.3,"rho":0.0003,"decentralisationParam":0.8};
  const networkMagic$7 = 141;
  const maxKESEvolutions$7 = 62;
  const networkId$7 = "Testnet";
  const slotLength$7 = 1;
  const systemStart$7 = "2021-12-09T22:55:22Z";
  const epochLength$7 = 3600;
  const guildShelley = {
    maxLovelaceSupply: maxLovelaceSupply$7,
    securityParam: securityParam$7,
    slotsPerKESPeriod: slotsPerKESPeriod$7,
    updateQuorum: updateQuorum$7,
    activeSlotsCoeff: activeSlotsCoeff$7,
    protocolParams: protocolParams$7,
    networkMagic: networkMagic$7,
    maxKESEvolutions: maxKESEvolutions$7,
    networkId: networkId$7,
    slotLength: slotLength$7,
    systemStart: systemStart$7,
    epochLength: epochLength$7,
  };

  const maxLovelaceSupply$6 = 45000000000000000;
  const securityParam$6 = 432;
  const slotsPerKESPeriod$6 = 129600;
  const updateQuorum$6 = 3;
  const activeSlotsCoeff$6 = 0.05;
  const protocolParams$6 = {"a0":0.3,"decentralisationParam":1,"eMax":18,"extraEntropy":{"tag":"NeutralNonce"},"keyDeposit":2000000,"maxBlockBodySize":65536,"maxBlockHeaderSize":1100,"maxTxSize":16384,"minFeeA":44,"minFeeB":155381,"minPoolCost":340000000,"minUTxOValue":1000000,"nOpt":150,"poolDeposit":500000000,"protocolVersion":{"major":6,"minor":0},"rho":0.003,"tau":0.2};
  const networkMagic$6 = 4;
  const initialFunds = {};
  const maxKESEvolutions$6 = 62;
  const networkId$6 = "Testnet";
  const slotLength$6 = 1;
  const systemStart$6 = "2023-06-15T00:30:00Z";
  const epochLength$6 = 86400;
  const sanchoShelley = {
    maxLovelaceSupply: maxLovelaceSupply$6,
    securityParam: securityParam$6,
    slotsPerKESPeriod: slotsPerKESPeriod$6,
    updateQuorum: updateQuorum$6,
    activeSlotsCoeff: activeSlotsCoeff$6,
    protocolParams: protocolParams$6,
    networkMagic: networkMagic$6,
    initialFunds,
    maxKESEvolutions: maxKESEvolutions$6,
    networkId: networkId$6,
    slotLength: slotLength$6,
    systemStart: systemStart$6,
    epochLength: epochLength$6,
  };

  const activeSlotsCoeff$5 = 0.05;
  const epochLength$5 = 432000;
  const maxKESEvolutions$5 = 62;
  const maxLovelaceSupply$5 = 45000000000000000;
  const networkId$5 = "Testnet";
  const networkMagic$5 = 1;
  const protocolParams$5 = {"protocolVersion":{"minor":0,"major":2},"decentralisationParam":1,"eMax":18,"extraEntropy":{"tag":"NeutralNonce"},"maxTxSize":16384,"maxBlockBodySize":65536,"maxBlockHeaderSize":1100,"minFeeA":44,"minFeeB":155381,"minUTxOValue":1000000,"poolDeposit":500000000,"minPoolCost":340000000,"keyDeposit":2000000,"nOpt":150,"rho":0.003,"tau":0.2,"a0":0.3};
  const securityParam$5 = 2160;
  const slotLength$5 = 1;
  const slotsPerKESPeriod$5 = 129600;
  const systemStart$5 = "2022-06-01T00:00:00Z";
  const updateQuorum$5 = 5;
  const preprodShelley = {
    activeSlotsCoeff: activeSlotsCoeff$5,
    epochLength: epochLength$5,
    maxKESEvolutions: maxKESEvolutions$5,
    maxLovelaceSupply: maxLovelaceSupply$5,
    networkId: networkId$5,
    networkMagic: networkMagic$5,
    protocolParams: protocolParams$5,
    securityParam: securityParam$5,
    slotLength: slotLength$5,
    slotsPerKESPeriod: slotsPerKESPeriod$5,
    systemStart: systemStart$5,
    updateQuorum: updateQuorum$5,
  };

  const activeSlotsCoeff$4 = 0.05;
  const epochLength$4 = 86400;
  const maxKESEvolutions$4 = 62;
  const maxLovelaceSupply$4 = 45000000000000000;
  const networkId$4 = "Testnet";
  const networkMagic$4 = 2;
  const protocolParams$4 = {"protocolVersion":{"minor":0,"major":6},"decentralisationParam":1,"eMax":18,"extraEntropy":{"tag":"NeutralNonce"},"maxTxSize":16384,"maxBlockBodySize":65536,"maxBlockHeaderSize":1100,"minFeeA":44,"minFeeB":155381,"minUTxOValue":1000000,"poolDeposit":500000000,"minPoolCost":340000000,"keyDeposit":2000000,"nOpt":150,"rho":0.003,"tau":0.2,"a0":0.3};
  const securityParam$4 = 432;
  const slotLength$4 = 1;
  const slotsPerKESPeriod$4 = 129600;
  const systemStart$4 = "2022-10-25T00:00:00Z";
  const updateQuorum$4 = 5;
  const previewShelley = {
    activeSlotsCoeff: activeSlotsCoeff$4,
    epochLength: epochLength$4,
    maxKESEvolutions: maxKESEvolutions$4,
    maxLovelaceSupply: maxLovelaceSupply$4,
    networkId: networkId$4,
    networkMagic: networkMagic$4,
    protocolParams: protocolParams$4,
    securityParam: securityParam$4,
    slotLength: slotLength$4,
    slotsPerKESPeriod: slotsPerKESPeriod$4,
    systemStart: systemStart$4,
    updateQuorum: updateQuorum$4,
  };

  const activeSlotsCoeff$3 = 0.25;
  const epochLength$3 = 86400;
  const maxKESEvolutions$3 = 62;
  const maxLovelaceSupply$3 = 3000000000000000;
  const networkId$3 = "Mainnet";
  const networkMagic$3 = 764824073;
  const protocolParams$3 = {"a0":0,"decentralisationParam":1,"eMax":18,"extraEntropy":{"tag":"NeutralNonce"},"keyDeposit":0,"maxBlockBodySize":180224,"maxBlockHeaderSize":1100,"maxTxSize":16384,"minFeeA":45,"minFeeB":156253,"minPoolCost":0,"minUTxOValue":1000000,"nOpt":100,"poolDeposit":0,"protocolVersion":{"major":2,"minor":0},"rho":0.00001,"tau":0.000001};
  const securityParam$3 = 2160;
  const slotLength$3 = 1;
  const slotsPerKESPeriod$3 = 129600;
  const systemStart$3 = "2025-07-09T10:38:04.000000000Z";
  const updateQuorum$3 = 3;
  const afvtShelley = {
    activeSlotsCoeff: activeSlotsCoeff$3,
    epochLength: epochLength$3,
    maxKESEvolutions: maxKESEvolutions$3,
    maxLovelaceSupply: maxLovelaceSupply$3,
    networkId: networkId$3,
    networkMagic: networkMagic$3,
    protocolParams: protocolParams$3,
    securityParam: securityParam$3,
    slotLength: slotLength$3,
    slotsPerKESPeriod: slotsPerKESPeriod$3,
    systemStart: systemStart$3,
    updateQuorum: updateQuorum$3,
  };

  const activeSlotsCoeff$2 = 0.25;
  const epochLength$2 = 86400;
  const maxKESEvolutions$2 = 62;
  const maxLovelaceSupply$2 = 3000000000000000;
  const networkId$2 = "Mainnet";
  const networkMagic$2 = 764824073;
  const protocolParams$2 = {"a0":0,"decentralisationParam":1,"eMax":18,"extraEntropy":{"tag":"NeutralNonce"},"keyDeposit":0,"maxBlockBodySize":180224,"maxBlockHeaderSize":1100,"maxTxSize":16384,"minFeeA":45,"minFeeB":156253,"minPoolCost":0,"minUTxOValue":1000000,"nOpt":100,"poolDeposit":0,"protocolVersion":{"major":2,"minor":0},"rho":0.00001,"tau":0.000001};
  const securityParam$2 = 2160;
  const slotLength$2 = 1;
  const slotsPerKESPeriod$2 = 129600;
  const systemStart$2 = "2025-08-29T16:40:00.000000000Z";
  const updateQuorum$2 = 3;
  const afvmShelley = {
    activeSlotsCoeff: activeSlotsCoeff$2,
    epochLength: epochLength$2,
    maxKESEvolutions: maxKESEvolutions$2,
    maxLovelaceSupply: maxLovelaceSupply$2,
    networkId: networkId$2,
    networkMagic: networkMagic$2,
    protocolParams: protocolParams$2,
    securityParam: securityParam$2,
    slotLength: slotLength$2,
    slotsPerKESPeriod: slotsPerKESPeriod$2,
    systemStart: systemStart$2,
    updateQuorum: updateQuorum$2,
  };

  const systemStart$1 = "2024-05-16T17:18:10.000000000Z";
  const networkMagic$1 = 3311;
  const networkId$1 = "Testnet";
  const activeSlotsCoeff$1 = 0.05;
  const securityParam$1 = 2160;
  const epochLength$1 = 432000;
  const slotsPerKESPeriod$1 = 129600;
  const maxKESEvolutions$1 = 62;
  const slotLength$1 = 1;
  const updateQuorum$1 = 2;
  const maxLovelaceSupply$1 = 3000000000000000;
  const protocolParams$1 = {"minFeeA":47,"minFeeB":158298,"maxBlockBodySize":65536,"maxTxSize":16384,"maxBlockHeaderSize":1100,"keyDeposit":0,"poolDeposit":0,"eMax":18,"nOpt":100,"a0":0,"rho":0.0038,"tau":0.000001,"minPoolCost":0,"decentralisationParam":0.7,"extraEntropy":{"tag":"NeutralNonce"},"protocolVersion":{"major":7,"minor":0},"minUTxOValue":1000000};
  const afptShelley = {
    systemStart: systemStart$1,
    networkMagic: networkMagic$1,
    networkId: networkId$1,
    activeSlotsCoeff: activeSlotsCoeff$1,
    securityParam: securityParam$1,
    epochLength: epochLength$1,
    slotsPerKESPeriod: slotsPerKESPeriod$1,
    maxKESEvolutions: maxKESEvolutions$1,
    slotLength: slotLength$1,
    updateQuorum: updateQuorum$1,
    maxLovelaceSupply: maxLovelaceSupply$1,
    protocolParams: protocolParams$1,
  };

  const systemStart = "2024-05-13T17:40:00.000000000Z";
  const networkMagic = 764824073;
  const networkId = "Mainnet";
  const activeSlotsCoeff = 0.05;
  const securityParam = 2160;
  const epochLength = 432000;
  const slotsPerKESPeriod = 129600;
  const maxKESEvolutions = 60;
  const slotLength = 1;
  const updateQuorum = 5;
  const maxLovelaceSupply = 3000000000000000;
  const protocolParams = {"minFeeA":47,"minFeeB":158298,"maxBlockBodySize":65536,"maxTxSize":16384,"maxBlockHeaderSize":1100,"keyDeposit":0,"poolDeposit":0,"eMax":18,"nOpt":100,"a0":0,"rho":0.00001,"tau":0.000001,"minPoolCost":0,"decentralisationParam":0.7,"extraEntropy":{"tag":"NeutralNonce"},"protocolVersion":{"major":2,"minor":0},"minUTxOValue":1000000};
  const afpmShelley = {
    systemStart,
    networkMagic,
    networkId,
    activeSlotsCoeff,
    securityParam,
    epochLength,
    slotsPerKESPeriod,
    maxKESEvolutions,
    slotLength,
    updateQuorum,
    maxLovelaceSupply,
    protocolParams,
  };

  const blockVersionData$8 = {"heavyDelThd":"300000000000","maxBlockSize":"2000000","maxHeaderSize":"2000000","maxProposalSize":"700","maxTxSize":"4096","mpcThd":"20000000000000","scriptVersion":0,"slotDuration":"20000","softforkRule":{"initThd":"900000000000000","minThd":"600000000000000","thdDecrement":"50000000000000"},"txFeePolicy":{"multiplier":"43946000000","summand":"155381000000000"},"unlockStakeEpoch":"18446744073709551615","updateImplicit":"10000","updateProposalThd":"100000000000000","updateVoteThd":"1000000000000"};
  const ftsSeed = "76617361206f7061736120736b6f766f726f64612047677572646120626f726f64612070726f766f6461";
  const protocolConsts$8 = {"k":2160,"protocolMagic":764824073,"vssMaxTTL":6,"vssMinTTL":2};
  const startTime$8 = 1506203091;
  const mainnetByron = {
    blockVersionData: blockVersionData$8,
    ftsSeed,
    protocolConsts: protocolConsts$8,
    startTime: startTime$8,
  };

  const startTime$7 = 1639090522;
  const blockVersionData$7 = {"scriptVersion":0,"slotDuration":"100","maxBlockSize":"641000","maxHeaderSize":"200000","maxTxSize":"4096","maxProposalSize":"700","mpcThd":"200000","heavyDelThd":"300000","updateVoteThd":"100000","updateProposalThd":"100000","updateImplicit":"10000","softforkRule":{"initThd":"900000","minThd":"600000","thdDecrement":"100000"},"txFeePolicy":{"summand":"0","multiplier":"439460"},"unlockStakeEpoch":"184467"};
  const protocolConsts$7 = {"k":36,"protocolMagic":141};
  const avvmDistr = {};
  const guildByron = {
    startTime: startTime$7,
    blockVersionData: blockVersionData$7,
    protocolConsts: protocolConsts$7,
    avvmDistr,
  };

  const startTime$6 = 1686789000;
  const blockVersionData$6 = {"avvmDistr":{},"heavyDelThd":"300000000000","maxBlockSize":"2000000","maxHeaderSize":"2000000","maxProposalSize":"700","maxTxSize":"4096","mpcThd":"20000000000000","scriptVersion":0,"slotDuration":"20000","softforkRule":{"initThd":"900000000000000","minThd":"600000000000000","thdDecrement":"50000000000000"},"txFeePolicy":{"multiplier":"43946000000","summand":"155381000000000"},"unlockStakeEpoch":"18446744073709551615","updateImplicit":"10000","updateProposalThd":"100000000000000","updateVoteThd":"1000000000000"};
  const protocolConsts$6 = {"k":432,"protocolMagic":4};
  const sanchoByron = {
    startTime: startTime$6,
    blockVersionData: blockVersionData$6,
    protocolConsts: protocolConsts$6,
  };

  const startTime$5 = 1654041600;
  const blockVersionData$5 = {"scriptVersion":0,"slotDuration":"20000","maxBlockSize":"2000000","maxHeaderSize":"2000000","maxTxSize":"4096","maxProposalSize":"700","mpcThd":"20000000000000","heavyDelThd":"300000000000","updateVoteThd":"1000000000000","updateProposalThd":"100000000000000","updateImplicit":"10000","softforkRule":{"initThd":"900000000000000","minThd":"600000000000000","thdDecrement":"50000000000000"},"txFeePolicy":{"summand":"155381000000000","multiplier":"43946000000"},"unlockStakeEpoch":"18446744073709551615"};
  const protocolConsts$5 = {"k":2160,"protocolMagic":1};
  const preprodByron = {
    startTime: startTime$5,
    blockVersionData: blockVersionData$5,
    protocolConsts: protocolConsts$5,
  };

  const startTime$4 = 1666656000;
  const blockVersionData$4 = {"scriptVersion":0,"slotDuration":"20000","maxBlockSize":"2000000","maxHeaderSize":"2000000","maxTxSize":"4096","maxProposalSize":"700","mpcThd":"20000000000000","heavyDelThd":"300000000000","updateVoteThd":"1000000000000","updateProposalThd":"100000000000000","updateImplicit":"10000","softforkRule":{"initThd":"900000000000000","minThd":"600000000000000","thdDecrement":"50000000000000"},"txFeePolicy":{"summand":"155381000000000","multiplier":"43946000000"},"unlockStakeEpoch":"18446744073709551615"};
  const protocolConsts$4 = {"k":432,"protocolMagic":2};
  const previewByron = {
    startTime: startTime$4,
    blockVersionData: blockVersionData$4,
    protocolConsts: protocolConsts$4,
  };

  const startTime$3 = 1752057484;
  const blockVersionData$3 = {"scriptVersion":0,"slotDuration":"1000","maxBlockSize":"2000000","maxHeaderSize":"2000000","maxTxSize":"4096","maxProposalSize":"700","mpcThd":"20000000000000","heavyDelThd":"300000000000","updateVoteThd":"1000000000000","updateProposalThd":"100000000000000","updateImplicit":"10000","softforkRule":{"initThd":"900000000000000","minThd":"600000000000000","thdDecrement":"50000000000000"},"txFeePolicy":{"summand":"155381000000000","multiplier":"43946000000"},"unlockStakeEpoch":"18446744073709551615"};
  const protocolConsts$3 = {"k":2160,"protocolMagic":764824073};
  const afvtByron = {
    startTime: startTime$3,
    blockVersionData: blockVersionData$3,
    protocolConsts: protocolConsts$3,
  };

  const startTime$2 = 1756485600;
  const blockVersionData$2 = {"scriptVersion":0,"slotDuration":"1000","maxBlockSize":"2000000","maxHeaderSize":"2000000","maxTxSize":"4096","maxProposalSize":"700","mpcThd":"20000000000000","heavyDelThd":"300000000000","updateVoteThd":"1000000000000","updateProposalThd":"100000000000000","updateImplicit":"10000","softforkRule":{"initThd":"900000000000000","minThd":"600000000000000","thdDecrement":"50000000000000"},"txFeePolicy":{"summand":"155381000000000","multiplier":"43946000000"},"unlockStakeEpoch":"18446744073709551615"};
  const protocolConsts$2 = {"k":2160,"protocolMagic":764824073};
  const afvmByron = {
    startTime: startTime$2,
    blockVersionData: blockVersionData$2,
    protocolConsts: protocolConsts$2,
  };

  const startTime$1 = 1715879890;
  const blockVersionData$1 = {"scriptVersion":0,"slotDuration":"20000","maxBlockSize":"2000000","maxHeaderSize":"2000000","maxTxSize":"4096","maxProposalSize":"700","mpcThd":"20000000000000","heavyDelThd":"300000000000","updateVoteThd":"1000000000000","updateProposalThd":"100000000000000","updateImplicit":"10000","softforkRule":{"initThd":"900000000000000","minThd":"600000000000000","thdDecrement":"50000000000000"},"txFeePolicy":{"summand":"155381000000000","multiplier":"43946000000"},"unlockStakeEpoch":"18446744073709551615"};
  const protocolConsts$1 = {"k":2160,"protocolMagic":3311};
  const afptByron = {
    startTime: startTime$1,
    blockVersionData: blockVersionData$1,
    protocolConsts: protocolConsts$1,
  };

  const startTime = 1715622000;
  const blockVersionData = {"scriptVersion":0,"slotDuration":"20000","maxBlockSize":"2000000","maxHeaderSize":"2000000","maxTxSize":"4096","maxProposalSize":"700","mpcThd":"20000000000000","heavyDelThd":"300000000000","updateVoteThd":"1000000000000","updateProposalThd":"100000000000000","updateImplicit":"10000","softforkRule":{"initThd":"900000000000000","minThd":"600000000000000","thdDecrement":"50000000000000"},"txFeePolicy":{"summand":"155381000000000","multiplier":"43946000000"},"unlockStakeEpoch":"18446744073709551615"};
  const protocolConsts = {"k":2160,"protocolMagic":764824073};
  const afpmByron = {
    startTime,
    blockVersionData,
    protocolConsts,
  };

  const GenesisStore = {
    mainnet: {
      shelley: mainnetShelley,
      byron: mainnetByron
    },
    guild: {
      shelley: guildShelley,
      byron: guildByron
    },
    sancho: {
      shelley: sanchoShelley,
      byron: sanchoByron
    },
    preprod: {
      shelley: preprodShelley,
      byron: preprodByron
    },
    preview: {
      shelley: previewShelley,
      byron: previewByron
    },
    afvt: {
      shelley: afvtShelley,
      byron: afvtByron
    },
    afvm: {
      shelley: afvmShelley,
      byron: afvmByron
    },
    afpt: {
      shelley: afptShelley,
      byron: afptByron
    },
    afpm: {
      shelley: afpmShelley,
      byron: afpmByron
    }
  };

  const getNetworkMagic = (networkId) => GenesisStore[networkId].shelley.networkMagic;

  const storeId$2 = "bgCip30";
  const _cip30_enable = (extensions) => {
    if (doLogAll) {
      console.log(el(storeId$2), sl("_cip30_enable"), extensions);
    }
    const unsupportedExtensionList = [];
    if (!extensions || !Array.isArray(extensions)) {
      extensions = [extCip30];
    }
    for (const extension of extensions) {
      if (!extension.hasOwnProperty("cip") || Number.isNaN(parseInt(extension.cip))) {
        return void 0;
      }
      if (!supportedExtensions.some((e) => e.cip === extension.cip)) {
        if (unsupportedExtensionList.some((e) => e.cip === extension.cip)) {
          continue;
        }
        unsupportedExtensionList.push(extension);
      }
    }
    return unsupportedExtensionList.length === 0 ? null : unsupportedExtensionList;
  };
  const _cip30_getNetworkId = (networkId) => {
    let respNetworkId = void 0;
    try {
      respNetworkId = getNetworkId$1(networkId);
    } catch (e) {
    }
    if (doLogAll) {
      console.log(el(storeId$2), sl("_cip30_getNetworkId"), networkId, respNetworkId);
    }
    return respNetworkId;
  };
  const _cip30_getNetworkMagic = (networkId) => {
    let respNetworkMagic = void 0;
    try {
      respNetworkMagic = getNetworkMagic(networkId);
    } catch (e) {
    }
    if (doLogAll) {
      console.log(el(storeId$2), sl("_cip30_getNetworkMagic"), networkId, respNetworkMagic);
    }
    return respNetworkMagic;
  };
  const _cip30_getConnectedNetworkId = (networkId) => {
    let respNetworkId = void 0;
    try {
      respNetworkId = isSupportedNetworkId(networkId) ? networkId : void 0;
    } catch (e) {
    }
    if (doLogAll) {
      console.log(el(storeId$2), sl("_cip30_getConnectedNetworkId"), networkId, respNetworkId);
    }
    return respNetworkId;
  };
  const checkEnable = (req) => {
    const origin = req.payload.origin;
    if (doLogAll) {
      console.warn(el(storeId$2), sl("checkEnable"), req, origin);
    }
    let wantedExtensionList = req.payload.extensions;
    if (!wantedExtensionList || !Array.isArray(wantedExtensionList)) {
      wantedExtensionList = [extCip30];
    }
    const unsupportedExtensions = _cip30_enable(wantedExtensionList);
    if (unsupportedExtensions === void 0) {
      req.response = errorInvalidArgument();
    } else if (unsupportedExtensions) {
      req.response = errorUnsupportedExtensions(unsupportedExtensions);
    }
    if (req.response) {
      if (doLogAll) {
        console.error(el(storeId$2), sl("checkEnable"), sl("error"), req.response);
      }
      return req;
    }
    if (wantedExtensionList.some((e1) => autoGrantWithCIP30List.some((e2) => e2.cip === e1.cip)) && !wantedExtensionList.some((e) => e.cip === extCip30.cip)) {
      wantedExtensionList.push(extCip30);
    }
    for (let i = wantedExtensionList.length - 1; i >= 0; i--) {
      const ext = wantedExtensionList[i];
      if (autoGrantWithCIP30List.some((e) => e.cip === ext.cip)) {
        wantedExtensionList.splice(i, 1);
      }
    }
    const grantExtensionList = isConnectedOrigin(origin, wantedExtensionList);
    if (grantExtensionList === void 0) {
      req.response = errorInvalidArgument();
      return req;
    }
    const isConnected = !grantExtensionList;
    if (doLogAll) {
      console.log(el(storeId$2), sl("checkEnable"), "isConnected", isConnected, origin, req);
    }
    if (isConnected) {
      if (getStorageDappAccountId()) {
        const originAccount = setOriginAccount(origin, req.payload.domId, req.api === METHOD.enable);
        req.response = { success: true, isEnabled: !originAccount.needsEnableCall };
      } else {
        req.response = errorNoAccount();
      }
      if (doLogAll) {
        console.warn(el(storeId$2), sl("checkEnable"), sl("isConnected"), req);
      }
      return req;
    }
    req.payload.extensions = grantExtensionList ?? wantedExtensionList;
    return req;
  };
  const _isEnabled = (req) => {
    const origin = req.payload.origin;
    const isEnabled = isConnectedOrigin(origin, []) === null;
    if (doLogAll) {
      console.warn(el(storeId$2), sl("_isEnabled"), sl("origin"), origin, isEnabled);
    }
    return isEnabled;
  };
  const _didAccountChange = (req) => {
    if (doLogAll) {
      console.warn(el(storeId$2), sl("_didAccountChange"), sl("getStorageDappAccountId"), getStorageDappAccountId());
    }
    if (getStorageDappAccountId()) {
      const originAccount = setOriginAccount(req.payload.origin, req.payload.domId, req.api === METHOD.enable);
      if (doLogAll) {
        console.warn(el(storeId$2), sl("_didAccountChange"), sl("originAccount"), originAccount);
      }
      return originAccount.needsEnableCall;
    }
    return true;
  };
  const handleIsEnabled = (req) => {
    const origin = req.payload.origin;
    if (doLogAll) {
      console.warn(el(storeId$2), sl("handleIsEnabled"), sl("req"), req, origin);
    }
    req.response = {
      success: true,
      isEnabled: isConnectedOrigin(origin, []) === null
    };
    if (doLogAll) {
      console.warn(el(storeId$2), sl("handleIsEnabled"), sl("response"), req.response);
    }
    return req;
  };
  const handleGetNetworkId = (req) => {
    const resNetworkId = _cip30_getNetworkId(getStorageNetworkId());
    if (resNetworkId !== void 0) {
      req.response = { success: true, networkId: resNetworkId };
    } else {
      req.response = errorNoNetworkId();
    }
    if (doLogAll) {
      console.warn(el(storeId$2), sl("handleGetNetworkId"), sl("req"), req);
    }
    return req;
  };
  const handleGetNetworkMagic = (req) => {
    const resNetworkMagic = _cip30_getNetworkMagic(getStorageNetworkId());
    if (resNetworkMagic !== void 0) {
      req.response = { success: true, networkMagic: resNetworkMagic };
    } else {
      req.response = errorNoNetworkMagic();
    }
    if (doLogAll) {
      console.warn(el("handleGetNetworkMagic"), sl("req"), req);
    }
    return req;
  };
  const handleGetConnectedNetworkId = (req) => {
    const resNetworkId = _cip30_getConnectedNetworkId(getStorageNetworkId());
    if (resNetworkId !== void 0) {
      req.response = { success: true, connectedNetworkId: resNetworkId };
    } else {
      req.response = errorNoNetworkId();
    }
    if (doLogAll) {
      console.warn(el("handleGetConnectedNetworkId"), sl("req"), req);
    }
    return req;
  };
  const handleGetExtensions = (req) => {
    const origin = req.payload.origin;
    if (doLogAll) {
      console.warn(el(storeId$2), sl("handleGetExtensions"), sl("req"), req, origin);
    }
    const extensions = getConnectedExtensions(origin);
    req.response = { success: true, extensions };
    if (doLogAll) {
      console.warn(el(storeId$2), sl("handleGetExtensions"), sl("response"), req);
    }
    return req;
  };

  const storeId$1 = "bgHandleRequest";
  const handleApiRequest = (req) => {
    if (doLogAll) {
      console.warn(el(storeId$1), sl("req"), json(req));
    }
    if (doLogAll) {
      console.warn(el(storeId$1), sl("api"), req.api);
    }
    if (req.api === METHOD.enableLogs) {
      enableLogs(req.payload.enable);
    }
    switch (req.api) {
      // Only check, don't handle. If no response, SERVICEWORKER will open ENABLE which will handle the request.
      case METHOD.enable:
        return checkEnable(req);
      case METHOD.isEnabled:
        return handleIsEnabled(req);
      case METHOD.getNetworkId:
        return handleGetNetworkId(req);
      case METHOD.getNetworkMagic:
        return handleGetNetworkMagic(req);
      case METHOD.getConnectedNetworkId:
        return handleGetConnectedNetworkId(req);
      case METHOD.getExtensions:
        return handleGetExtensions(req);
    }
    return req;
  };

  const _doLogAll = doLogAll;
  const isTabOpen = async (tabId) => {
    try {
      await chrome.tabs.get(tabId);
      return true;
    } catch (err) {
      if (_doLogAll) {
        console.error(el("isTabOpen"), sl("error"), tabId, err);
      }
      return false;
    }
  };
  const getPopupTabId = (url) => {
    return new Promise((resolve) => {
      chrome.storage.local.get(url, (result) => {
        if (chrome.runtime.lastError) {
          console.error("getPopupTabId", url, chrome.runtime.lastError);
        }
        let id = result[url] ?? null;
        if (_doLogAll) {
          console.warn(el("getPopupTabId"), sl("id"), url, id);
        }
        if (id === null) {
          return resolve(null);
        }
        isTabOpen(id).then((isOpen) => {
          if (_doLogAll) {
            console.warn(el("getPopupTabId"), sl("isOpen"), id, isOpen);
          }
          if (isOpen) {
            resolve(id);
          } else {
            resolve(null);
          }
        });
      });
    });
  };
  const setPopupTabId = (url, id) => {
    return new Promise((resolve) => {
      chrome.storage.local.set({ [url]: id }, () => {
        if (chrome.runtime.lastError) {
          console.error("setPopupTabId", url, id, chrome.runtime.lastError);
        }
        resolve();
      });
    });
  };
  const closePopup = async (url) => {
    const popupTabId = await getPopupTabId(url);
    if (_doLogAll) {
      console.warn(el("closePopup"), popupTabId);
    }
    if (popupTabId !== null) {
      await setPopupTabId(url, null);
      return new Promise((resolve) => {
        chrome.tabs.remove(popupTabId, async () => {
          if (chrome.runtime.lastError) {
            console.error("closePopup", url, popupTabId, chrome.runtime.lastError);
          }
          resolve();
        });
      });
    }
  };
  const openPopup = async (url, senderTab, onTabClose, width = 788, height = 960) => {
    if (_doLogAll) {
      console.warn(el("openPopup"), sl(url), width, height);
    }
    const popupTabId = await getPopupTabId(url);
    if (_doLogAll) {
      console.warn(el("openPopup"), sl("popupTabId"), popupTabId);
    }
    if (popupTabId !== null) {
      if (_doLogAll) {
        console.warn(el("openPopup"), sl("alreadyOpen"), popupTabId);
      }
      return new Promise((resolve) => {
        resolve(popupTabId);
      });
    }
    const allDisplays = await chrome.system.display.getInfo();
    const currentWindow = await chrome.windows.get(senderTab.windowId);
    const settings = findBestDisplay(currentWindow, allDisplays, width, height);
    return new Promise((resolve, reject) => {
      const attemptCreate = (useCalculatedBounds) => {
        const createData = {
          url,
          type: "popup",
          width: settings.width,
          height: settings.height,
          focused: true
        };
        if (useCalculatedBounds) {
          createData.left = settings.left;
          createData.top = settings.top;
        }
        chrome.windows.create(createData, async (win) => {
          if (chrome.runtime.lastError) {
            const errMessage = chrome.runtime.lastError.message || "";
            if (useCalculatedBounds) {
              console.warn(el("openPopup"), sl("creationFailed"), "Retrying with default bounds. Error:", errMessage);
              return attemptCreate(false);
            } else {
              console.error("openPopup", url, chrome.runtime.lastError);
            }
          }
          if (!win || !win.tabs || win.tabs.length === 0) {
            return reject("No popup tab available");
          }
          const tab = win.tabs[0];
          if (tab.id) {
            const popupTabId2 = tab.id;
            const handleRemove = async (tabId, removeInfo) => {
              if (_doLogAll) {
                console.warn(el("openPopup"), sl("handleRemove"), tabId, removeInfo);
              }
              if (tabId === popupTabId2 && onTabClose) {
                await setPopupTabId(url, null);
                onTabClose();
                chrome.tabs.onRemoved.removeListener(handleRemove);
              }
            };
            chrome.tabs.onRemoved.addListener(handleRemove);
            await setPopupTabId(url, popupTabId2);
            let _id = -1;
            const resolveTab = () => {
              chrome.tabs.onUpdated.removeListener(handleUpdate);
              clearTimeout(_id);
              resolve(popupTabId2);
            };
            const handleUpdate = (popupTabId3, info) => {
              if (info.status === "complete") {
                resolveTab();
              }
            };
            chrome.tabs.onUpdated.addListener(handleUpdate);
            _id = setTimeout(resolveTab, 250);
          } else {
            reject("No popup tab available");
          }
        });
      };
      attemptCreate(true);
    });
  };
  const closeEnablePopup = () => closePopup(urlEnable);
  const openEnablePopup = (senderTab, onTabClose) => openPopup(urlEnable, senderTab, onTabClose, 430, 640);
  const closeSignTxPopup = () => closePopup(urlSignTx);
  const openSignTxPopup = (senderTab, onTabClose) => openPopup(urlSignTx, senderTab, onTabClose);
  const closeSignDataPopup = () => closePopup(urlSignData);
  const openSignDataPopup = (senderTab, onTabClose) => openPopup(urlSignData, senderTab, onTabClose);
  const findBestDisplay = (window, displays, width, height) => {
    let bestDisplay = displays.find((d) => d.isPrimary) || displays[0];
    let maxOverlap = 0;
    const winLeft = window.left ?? 0;
    const winTop = window.top ?? 0;
    const winWidth = window.width ?? 0;
    const winHeight = window.height ?? 0;
    const isUsingWindowManagement = window.left === 0 && window.top === 0;
    for (const display of displays) {
      const displayBounds = display.bounds;
      const intersectLeft = Math.max(winLeft, displayBounds.left);
      const intersectTop = Math.max(winTop, displayBounds.top);
      const intersectRight = Math.min(winLeft + winWidth, displayBounds.left + displayBounds.width);
      const intersectBottom = Math.min(winTop + winHeight, displayBounds.top + displayBounds.height);
      const overlapWidth = Math.max(0, intersectRight - intersectLeft);
      const overlapHeight = Math.max(0, intersectBottom - intersectTop);
      const overlapArea = overlapWidth * overlapHeight;
      if (overlapArea > maxOverlap) {
        maxOverlap = overlapArea;
        bestDisplay = display;
      }
    }
    const workArea = bestDisplay.workArea;
    const popupWidth = Math.min(width, Math.max(width, workArea.width - 20));
    const popupHeight = Math.min(height, Math.max(height, workArea.height - 20));
    let targetLeft = winLeft + winWidth - popupWidth;
    let targetTop = winTop;
    if (targetLeft < workArea.left) {
      targetLeft = workArea.left;
    }
    if (targetLeft + popupWidth > workArea.left + workArea.width) {
      targetLeft = workArea.left + workArea.width - popupWidth;
    }
    if (targetTop < workArea.top) {
      targetTop = workArea.top;
    }
    if (targetTop + popupHeight > workArea.top + workArea.height) {
      targetTop = workArea.top + workArea.height - popupHeight;
    }
    return {
      display: bestDisplay,
      top: isUsingWindowManagement ? 0 : Math.round(targetTop),
      left: isUsingWindowManagement ? 0 : Math.round(targetLeft),
      width: popupWidth,
      height: popupHeight
    };
  };

  const enableRequest = "enableRequest";
  const signTxRequest = "signTxRequest";
  const signDataRequest = "signDataRequest";
  let _enableRequest = null;
  let _signTxRequest = null;
  let _signDataRequest = null;
  const initRequestStorage = () => {
    chrome.storage.onChanged.addListener((changes, namespace) => {
      if (namespace !== "local") {
        return;
      }
      for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        if (key === enableRequest) {
          _enableRequest = newValue;
        } else if (key === signTxRequest) {
          _signTxRequest = newValue;
        } else if (key === signDataRequest) {
          _signDataRequest = newValue;
        }
      }
    });
    const calls = [];
    calls.push(chrome.storage.local.get(enableRequest).then((res) => {
      _enableRequest = res.enableRequest;
    }));
    calls.push(chrome.storage.local.get(signTxRequest).then((res) => {
      _signTxRequest = res.signTxRequest;
    }));
    calls.push(chrome.storage.local.get(signDataRequest).then((res) => {
      _signDataRequest = res.signDataRequest;
    }));
    return Promise.allSettled(calls);
  };
  const clearEnableRequest = async () => {
    const removedRequest = _enableRequest;
    _enableRequest = null;
    if (removedRequest !== null) {
      await putInStorage(enableRequest, null);
    }
    return removedRequest;
  };
  const clearSignTxRequest = async () => {
    const removedRequest = _signTxRequest;
    _signTxRequest = null;
    if (removedRequest !== null) {
      await putInStorage(signTxRequest, null);
    }
    return removedRequest;
  };
  const clearSignDataRequest = async () => {
    const removedRequest = _signDataRequest;
    _signDataRequest = null;
    if (removedRequest !== null) {
      await putInStorage(signDataRequest, null);
    }
    return removedRequest;
  };
  const replaceEnableRequest = async (req) => {
    let removedRequest = null;
    if (_enableRequest) {
      removedRequest = _enableRequest;
    }
    _enableRequest = req;
    await putInStorage(enableRequest, req);
    return removedRequest;
  };
  const replaceSignTxRequest = async (req) => {
    let removedRequest = null;
    if (_signTxRequest) {
      removedRequest = _signTxRequest;
    }
    _signTxRequest = req;
    await putInStorage(signTxRequest, req);
    return removedRequest;
  };
  const replaceSignDataRequest = async (req) => {
    let removedRequest = null;
    if (_signDataRequest) {
      removedRequest = _signDataRequest;
    }
    _signDataRequest = req;
    await putInStorage(signDataRequest, req);
    return removedRequest;
  };
  const putInStorage = (key, req) => {
    return new Promise((resolve) => {
      chrome.storage.local.set({ [key]: req }, () => {
        if (chrome.runtime.lastError) {
          console.error("putInStorage:", key, req, chrome.runtime.lastError);
        }
        resolve(true);
      });
    });
  };

  setAppMode(AppMode.bg);
  const storeId = "bg";
  if (doLogAll) {
    console.warn(el(storeId), sl("loaded"));
  }
  self.addEventListener("error", (event) => {
    console.error("Global error in service worker:", event.error, event);
  });
  self.addEventListener("unhandledrejection", (event) => {
    console.error("Unhandled promise rejection in service worker:", event.reason, event);
  });
  let _initChromeStorage = initChromeStorage();
  let _initRequestStorage = initRequestStorage();
  let _isAwake = false;
  const checkIApiRequest = (req) => {
    if (!req) {
      return null;
    }
    if (!req.reqId) {
      req.response = errorNoReqId();
      return req;
    }
    if (!req.api) {
      req.response = errorNoApi();
      return req;
    }
    if (!req.payload) {
      req.response = errorNoPayload();
      return req;
    }
    if (!req.payload.origin) {
      req.response = errorNoOrigin();
      return req;
    }
    return req;
  };
  const sendResponse = async (req, handleErrors) => {
    const pendingReq = getPendingAPIRequest(req);
    if (!pendingReq) {
      if (doLogAll) {
        console.error(el(storeId), sl("sendResponse: no pendingReq"), json(req));
      }
      return;
    }
    removePendingAPIRequest(req.reqId);
    const tabId = pendingReq.tabId;
    if (doLogAll) {
      console.log(el(storeId), sl("sendResponse: tabId, req:"), tabId, json(req));
    }
    req.channel = ApiChannel.bgToCs;
    if (!req.response && handleErrors) {
      handleErrors(req);
    }
    await chrome.tabs.sendMessage(tabId, req).catch((error) => {
      console.error(el(storeId), sl("sendResponse: error sending message to tab"), tabId, json(req), error);
    });
    if (chrome.runtime.lastError) {
      console.error("sendResponse", chrome.runtime.lastError);
    }
  };
  const createPendingAPIRequest = (req, senderTabId) => {
    if (senderTabId > 0) {
      const pendingReq = {
        ...req,
        origin: req.payload.origin,
        tabId: senderTabId,
        timestamp: Date.now(),
        isSidePanel: false
      };
      if (doLogAll) {
        console.log(el(storeId), sl("createPendingAPIRequest"), pendingReq);
      }
      addPendingAPIRequest(pendingReq);
      return pendingReq;
    }
    return null;
  };
  const sendToOffscreen = async (req) => {
    await ensureOffscreenPage();
    req.channel = ApiChannel.bgToOffscreen;
    if (doLogAll) {
      console.log(el(storeId), sl("sendToOffscreen"), json(req));
    }
    chrome.runtime.sendMessage(req).then((response) => {
      if (chrome.runtime.lastError) {
        if (doLogAll) {
          console.log(el(storeId), sl("sendToOffscreen: response"), json(req), response);
        }
        console.error("Error in sendMessage (sendToOffscreen):", chrome.runtime.lastError);
        if (!req.response) {
          req.response = errorInternal(chrome.runtime.lastError);
        }
        sendResponse(req);
      }
    });
  };
  const addDefaultErrorResponse = (req) => {
    if (doLogAll) {
      console.error(el(storeId), sl("addDefaultErrorResponse"), json(req));
    }
    if (req.response) {
      return;
    }
    switch (req.api) {
      case METHOD.enable:
        req.response = errorConnectionRefused();
        break;
      case METHOD.signTx:
      case METHOD.signTxs:
        req.response = errorTxUserDeclined();
        break;
      case METHOD.signData:
        req.response = errorDataUserDeclined();
        break;
      default:
        req.response = errorComsMalformed();
        break;
    }
  };
  const handleRemovedRequest = (req) => {
    if (!req) {
      return false;
    }
    if (doLogAll) {
      console.warn(el(storeId), sl("handleRemovedRequest"), json(req));
    }
    sendResponse(req, addDefaultErrorResponse);
    return true;
  };
  const sendToEnablePopup = async (req, senderTab) => {
    if (doLogAll) {
      console.warn(el(storeId), sl("sendToEnablePopup"), req);
    }
    req.channel = ApiChannel.bgToEnable;
    handleRemovedRequest(await replaceEnableRequest(req));
    await openEnablePopup(senderTab, async () => {
      if (doLogAll) {
        console.warn(el(storeId), sl("onClosedEnablePopup"));
      }
      handleRemovedRequest(await clearEnableRequest());
    });
  };
  const sendToSignTxPopup = async (req, senderTab) => {
    if (doLogAll) {
      console.warn(el(storeId), sl("sendToSignTxPopup"), req);
    }
    req.channel = ApiChannel.bgToSignTx;
    handleRemovedRequest(await replaceSignTxRequest(req));
    await openSignTxPopup(senderTab, async () => {
      if (doLogAll) {
        console.warn(el(storeId), sl("onClosedSignTxPopup"));
      }
      handleRemovedRequest(await clearSignTxRequest());
    });
  };
  const sendToSignDataPopup = async (req, senderTab) => {
    if (doLogAll) {
      console.warn(el(storeId), sl("sendToSignDataPopup"), req);
    }
    req.channel = ApiChannel.bgToSignData;
    handleRemovedRequest(await replaceSignDataRequest(req));
    await openSignDataPopup(senderTab, async () => {
      if (doLogAll) {
        console.warn(el(storeId), sl("onClosedSignDataPopup"));
      }
      handleRemovedRequest(await clearSignDataRequest());
    });
  };
  const onConnectPort = (port) => {
    if (port.name === ApiChannel.enableToBg) {
      port.onDisconnect.addListener(async () => {
        if (doLogAll) {
          console.log(el(storeId), sl("onDisconnect ApiChannel.enableToBg"));
        }
        handleRemovedRequest(await clearEnableRequest());
      });
    } else if (port.name === ApiChannel.signTxToBg) {
      port.onDisconnect.addListener(async () => {
        if (doLogAll) {
          console.log(el(storeId), sl("onDisconnect ApiChannel.signTxToBg"));
        }
        handleRemovedRequest(await clearSignTxRequest());
      });
    } else if (port.name === ApiChannel.signDataToBg) {
      port.onDisconnect.addListener(async () => {
        if (doLogAll) {
          console.log(el(storeId), sl("onDisconnect ApiChannel.signDataToBg"));
        }
        handleRemovedRequest(await clearSignDataRequest());
      });
    } else {
      if (doLogAll) {
        console.warn(el(storeId), sl("onConnectPort: unrecognized port name"), port.name);
      }
      return;
    }
  };
  const checkBgRequest = (req) => {
    handleApiRequest(req);
    if (doLogAll) {
      console.log(el(storeId), sl("checkBgRequest"), json(req));
    }
    if (!req.response) {
      return false;
    }
    sendResponse(req);
    return true;
  };
  const checkRequestAllowed = (req) => {
    if (req.api === METHOD.enable) {
      return false;
    }
    if (!_isEnabled(req)) {
      req.response = errorNotConnected();
      if (doLogAll) {
        console.error(el(storeId), sl("onMessage: not connected 1:"), req);
      }
      sendResponse(req);
      return true;
    }
    if (_didAccountChange(req)) {
      req.response = errorAccountChanged();
      if (doLogAll) {
        console.error(el(storeId), sl("onMessage: account changed"), req);
      }
      sendResponse(req);
      return true;
    }
    return false;
  };
  const handleCommands = (req) => {
    if (req.reqId !== "0") {
      return false;
    }
    if (doLogAll) {
      console.log(el(storeId), sl("onMessage: command"), req.api, req.payload.deeplink ?? req.payload.map ?? req.payload.networkId ?? req.payload.dappAccountId);
    }
    switch (req.api) {
      // Coming from permissions tab.
      case "closePermissionUI":
        closeUI(urlPermissions);
        return true;
      // Coming from the side panel.
      case "openUI":
        openUI(req.payload.deeplink);
        return true;
      case "openPermissionUI":
        openUI(req.payload.deeplink, urlPermissions);
        return true;
      // Coming from the offscreen page.
      case "updateConnectedOriginsMap":
        storeOriginEnableMap(req.payload.map);
        return true;
      case "updateNetworkId":
        storeNetworkId(req.payload.networkId);
        return true;
      case "updateDappAccountId":
        storeDappAccountId(req.payload.dappAccountId);
        return true;
    }
    if (doLogAll) {
      console.error(el(storeId), sl("onMessage: unrecognized command"), req.api);
    }
    return false;
  };
  const handleEnableResponse = (req) => {
    if (req.channel !== ApiChannel.popupToBg) {
      return false;
    }
    if (!req.response) {
      return false;
    }
    if (req.response.success && req.response.isEnabled) {
      const map = addConnectedOrigin(req.payload.origin, req.payload.extensions);
      setOriginAccount(req.payload.origin, req.payload.domId, true);
      const tmpReq = {
        reqId: "1",
        api: "updateConnectedOriginsMap",
        payload: {
          origin: req.payload.origin,
          originEnabledMap: map
        }
      };
      if (doLogAll) {
        console.log(el(storeId), sl("onMessage: update originEnabledMap and send to OFFSCREEN"), tmpReq);
      }
      sendToOffscreen(tmpReq);
    }
    return true;
  };
  const handleOffscreenResponse = (req) => {
    if (req.channel !== ApiChannel.offscreenToBg) {
      return false;
    }
    return false;
  };
  const handleClosePopups = async (req) => {
    if (req.api === METHOD.enable) {
      await clearEnableRequest();
      closeEnablePopup();
    } else if (req.api === METHOD.signTx || req.api === METHOD.signTxs) {
      await clearSignTxRequest();
      closeSignTxPopup();
    } else if (req.api === METHOD.signData) {
      await clearSignTxRequest();
      closeSignDataPopup();
    }
    return true;
  };
  const handleResponse = async (req) => {
    if (!req.response) {
      return false;
    }
    if (req.channel !== ApiChannel.sidePanelToBg && // Not a response from ENABLE, SIGN_TX, SIGN_DATA.
    req.channel !== ApiChannel.enableToBg && req.channel !== ApiChannel.signTxToBg && req.channel !== ApiChannel.signDataToBg && req.channel !== ApiChannel.popupToBg && req.channel !== ApiChannel.offscreenToBg && req.channel !== ApiChannel.permissionsToBg && req.channel !== ApiChannel.mainToBg) {
      if (doLogAll) {
        console.error(el(storeId), sl("handleResponse: unrecognized response channel"), req.channel, json(req));
      }
      return false;
    }
    if (doLogAll) {
      console.log(el(storeId), sl("handleResponse:"), json(req));
    }
    const pendingReq = getPendingAPIRequest(req);
    if (!pendingReq) {
      if (doLogAll) {
        console.error(el(storeId), sl("handleResponse: no pending request"), json(req));
      }
      return false;
    }
    handleEnableResponse(req);
    await handleClosePopups(req);
    handleOffscreenResponse(req);
    sendResponse(req);
    return true;
  };
  const handleMissingResponse = (req) => {
    if (req.response) {
      return false;
    }
    if (req.channel !== ApiChannel.sidePanelToBg && // Not a response from ENABLE, SIGN_TX, SIGN_DATA.
    req.channel !== ApiChannel.enableToBg && req.channel !== ApiChannel.signTxToBg && req.channel !== ApiChannel.signDataToBg && req.channel !== ApiChannel.popupToBg && req.channel !== ApiChannel.offscreenToBg && req.channel !== ApiChannel.permissionsToBg && req.channel !== ApiChannel.mainToBg) {
      return false;
    }
    sendResponse(req, addDefaultErrorResponse);
    return true;
  };
  const handleRequest = (req, senderTab) => {
    if (req.channel !== ApiChannel.csToBg) {
      return false;
    }
    createPendingAPIRequest(req, senderTab.id);
    if (checkBgRequest(req)) {
      return true;
    }
    if (checkRequestAllowed(req)) {
      return true;
    }
    if (req.api === METHOD.enable) {
      sendToEnablePopup(req, senderTab);
      return true;
    } else if (req.api === METHOD.signTx || req.api === METHOD.signTxs) {
      sendToSignTxPopup(req, senderTab);
      return true;
    } else if (req.api === METHOD.signData) {
      sendToSignDataPopup(req, senderTab);
      return true;
    }
    if (doLogAll) {
      console.warn(el(storeId), sl("onMessage: TO OFFSCREEN"), json(req));
    }
    sendToOffscreen(req);
    return true;
  };
  const onMessage = async (message, sender) => {
    const req = checkIApiRequest(message);
    if (doLogAll) {
      console.log(el(storeId), sl("onMessage: start"), json(req));
    }
    if (!req) {
      return;
    }
    if (handleCommands(req)) {
      return;
    }
    if (await handleResponse(req)) {
      return;
    }
    if (handleMissingResponse(req)) {
      return;
    }
    if (!_isAwake) {
      await _initChromeStorage;
      await _initRequestStorage;
    }
    const senderTab = sender.tab;
    const senderTabId = sender.tab?.id;
    if (!senderTab || !senderTabId) {
      if (doLogAll) {
        console.error(el(storeId), sl("onMessage: no senderTabId"), json(req));
      }
      if (doLogAll) {
        console.error(el(storeId), sl("onMessage: no senderTabId"), sender);
      }
      return;
    }
    if (handleRequest(req, senderTab)) {
      return;
    }
    if (doLogAll) {
      console.error(el(storeId), sl("onMessage: no handler found"), json(req));
    }
    return false;
  };
  chrome.runtime.onMessage.addListener(onMessage);
  chrome.action.onClicked.addListener(() => openUI());
  chrome.runtime.onConnect.addListener((port) => onConnectPort(port));
  const init = async () => {
    await _initChromeStorage;
    await _initRequestStorage;
    await ensureOffscreenPage();
    initContentScriptFromSW();
    logChromiumIssue395536907();
    _isAwake = true;
  };
  init();

})();
