import { aC as getScriptState, ae as getDerivationPath, aD as getBaseAddressFromCred, aE as getEnterpriseAddressFromCred, V as getAddressCredentials, aF as getAddressKey, aG as AccountError, aH as getCSLAddress, s as safeFreeCSLObject, aI as getRewardAddressFromCred, X as getAssetIdBech32, aJ as AdaHandleError, aK as isValidSendAddress, ax as doInitApp, a8 as SyncState, f as freeCSLObjects, aL as isMultiSigAccountPath, aM as updateIAccountSettingsPartial, aN as saveAccountSettings, a7 as getIAppWallet, aO as getIAppAccount, D as DataError, aj as getNativeScriptCredFromHex, aP as getXpubFromHex, aQ as Bip32PrivateKey, aR as getAddressBytes, aS as generatePlateHex, aT as isSameAccountPath, aU as createIAccount, aV as getPubKeyFromPrvKey, aW as createIWalletDBData, aX as generateAccountPub, aY as purpose, aZ as coin, ah as multisigPath, a_ as prepareAccountKey, ag as saveWallet, a$ as createIUIPlate, b0 as getWalletNameList, b1 as saveWalletSettings, b2 as onWalletSettingsUpdated, b3 as getIAccountBalances } from './app2.js';
import { bp as Dexie, aj as api, aM as el, aX as json, am as Buffer$1, P as networkId, ch as prefix0x, bI as DEFAULT_ACCOUNT_ID, e as ref, aV as now, D as computed, aI as toHexArray, Q as reactive, aC as dispatchSignal, ci as doLoadTxAssetMetadata, G as watch, aE as addSignalListener, ad as dispatchSignalSync, cj as requireDist, ck as toHexBuffer, aJ as toHexString, bT as encryptText, b_ as decryptText, cl as DEFAULT_WALLET_GROUP_NAME } from './index.js';
import { c as compare, d as divide } from './bigmath.js';
import { f as getRequestData, A as ApiRequestType, c as checkEpochParams, j as getSelectedWalletAccountId } from './epochParams.js';
import { d as isStakingEnabled, n as networkIdList, g as getNetworkDecimals, f as isSupportedNetworkId } from './NetworkId.js';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const adaHandle = "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a";

const createIReceiveAddress = (bech32, used, path, pathInfo) => {
  return {
    used,
    bech32,
    pathInfo,
    searchablePath: path.join(" ")
  };
};

const getBaseAddressList = (paymentCredList, isPayScript, stakeCredList, isStakeScript, networkId, onlyUnused = true, maxNumAddresses = Number.MAX_SAFE_INTEGER) => {
  const list = [];
  for (const stakeCred of stakeCredList) {
    for (const paymentCred of paymentCredList) {
      if (!onlyUnused || !paymentCred.used) {
        list.push(
          createIReceiveAddress(
            getBaseAddressFromCred(paymentCred.cred, stakeCred.cred, networkId, isPayScript, isStakeScript),
            paymentCred.used,
            paymentCred.path,
            getDerivationPath(paymentCred.path)
          )
        );
        if (list.length >= maxNumAddresses) {
          break;
        }
      }
    }
  }
  return list;
};
const getEnterpriseAddressList = (paymentCredList, isPayScript, networkId, onlyUnused = true, maxNumAddresses = Number.MAX_SAFE_INTEGER) => {
  const list = [];
  for (const paymentCred of paymentCredList) {
    if (!onlyUnused || !paymentCred.used) {
      list.push(
        createIReceiveAddress(
          getEnterpriseAddressFromCred(paymentCred.cred, networkId, isPayScript),
          paymentCred.used,
          paymentCred.path,
          getDerivationPath(paymentCred.path)
        )
      );
      if (list.length >= maxNumAddresses) {
        break;
      }
    }
  }
  return list;
};
const getPaymentBaseAddressList = (accountData, onlyUnused = true, maxNumAddresses = Number.MAX_SAFE_INTEGER) => {
  const {
    isPayScript,
    isStakeScript
  } = getScriptState(accountData, true, true);
  return getBaseAddressList(accountData.keys.payment, isPayScript, accountData.keys.stake, isStakeScript, accountData.state.networkId, onlyUnused, maxNumAddresses);
};
const getPaymentEnterpriseAddressList = (accountData, onlyUnused = true, maxNumAddresses = Number.MAX_SAFE_INTEGER) => {
  const { isPayScript } = getScriptState(accountData, true, false);
  return getEnterpriseAddressList(accountData.keys.payment, isPayScript, accountData.state.networkId, onlyUnused, maxNumAddresses);
};
const getChangeBaseAddressList = (accountData, onlyUnused = true, maxNumAddresses = Number.MAX_SAFE_INTEGER) => {
  const {
    isPayScript,
    isStakeScript
  } = getScriptState(accountData, true, true);
  return getBaseAddressList(accountData.keys.change, isPayScript, accountData.keys.stake, isStakeScript, accountData.state.networkId, onlyUnused, maxNumAddresses);
};
const getChangeEnterpriseAddressList = (accountData, onlyUnused = true, maxNumAddresses = Number.MAX_SAFE_INTEGER) => {
  const { isPayScript } = getScriptState(accountData, true, false);
  return getEnterpriseAddressList(accountData.keys.change, isPayScript, accountData.state.networkId, onlyUnused, maxNumAddresses);
};
const getChangeAddress = (accountData, onlyIfEnabled = false, preferRootAddr = false, preferPaymentAddr = false, ignoreSAM = false, free) => {
  if (!accountData) {
    return null;
  }
  const networkId = accountData.state.networkId;
  const {
    isPayScript,
    isStakeScript
  } = getScriptState(accountData, true, true);
  if (!ignoreSAM && accountData.settings.sam.enabled) {
    const customAddrBech32 = accountData.settings.sam.addr ?? null;
    if (customAddrBech32) {
      const { paymentCred } = getAddressCredentials(customAddrBech32);
      const {
        paymentKey,
        changeKey: changeKey2
      } = getAddressKey([accountData.keys], paymentCred, null);
      let receiveAddr = null;
      if (paymentKey) {
        receiveAddr = createIReceiveAddress(customAddrBech32, paymentKey.used, paymentKey.path, getDerivationPath(paymentKey.path));
      } else if (changeKey2) {
        receiveAddr = createIReceiveAddress(customAddrBech32, changeKey2.used, changeKey2.path, getDerivationPath(changeKey2.path));
      }
      if (receiveAddr) {
        return {
          csl: getCSLAddress(customAddrBech32, free),
          addr: receiveAddr
        };
      } else {
        throw AccountError.wrongCustomAddress;
      }
    } else {
      const paymentKey = accountData.keys.payment[0];
      const stakeKey2 = accountData.keys.stake.length > 0 ? accountData.keys.stake[0] : null;
      const addrBech322 = stakeKey2 && isStakingEnabled(networkId) ? getBaseAddressFromCred(paymentKey.cred, stakeKey2.cred, networkId, isPayScript, isStakeScript) : getEnterpriseAddressFromCred(paymentKey.cred, networkId, isPayScript);
      return {
        csl: getCSLAddress(addrBech322, free),
        addr: createIReceiveAddress(addrBech322, paymentKey.used, paymentKey.path, getDerivationPath(paymentKey.path))
      };
    }
  }
  if (onlyIfEnabled) {
    return null;
  }
  if (preferRootAddr) {
    const paymentKey = accountData.keys.payment[0];
    const stakeKey2 = accountData.keys.stake.length > 0 ? accountData.keys.stake[0] : null;
    const addrBech322 = stakeKey2 && isStakingEnabled(networkId) ? getBaseAddressFromCred(paymentKey.cred, stakeKey2.cred, networkId, isPayScript, isStakeScript) : getEnterpriseAddressFromCred(paymentKey.cred, networkId, isPayScript);
    return {
      csl: getCSLAddress(addrBech322, free),
      addr: createIReceiveAddress(addrBech322, paymentKey.used, paymentKey.path, getDerivationPath(paymentKey.path))
    };
  }
  const changeKey = preferPaymentAddr ? accountData.keys.payment.find((payment) => !payment.used) ?? accountData.keys.payment[0] : accountData.keys.change.find((change) => !change.used) ?? accountData.keys.change[0];
  const stakeKey = accountData.keys.stake.length > 0 ? accountData.keys.stake[0] : null;
  const addrBech32 = stakeKey && isStakingEnabled(networkId) ? getBaseAddressFromCred(changeKey.cred, stakeKey.cred, networkId, isPayScript, isStakeScript) : getEnterpriseAddressFromCred(changeKey.cred, networkId, isPayScript);
  return {
    csl: getCSLAddress(addrBech32, free),
    addr: createIReceiveAddress(addrBech32, changeKey.used, changeKey.path, getDerivationPath(changeKey.path))
  };
};
const getReceiveAddress = (accountData) => {
  const changeAddress = getChangeAddress(accountData, false, false, true, false);
  if (changeAddress) {
    safeFreeCSLObject(changeAddress.csl);
    return changeAddress.addr;
  }
  return null;
};
const getForcedUnusedAddress = (accountData) => {
  const changeAddress = getChangeAddress(accountData, false, false, true, true);
  if (changeAddress) {
    safeFreeCSLObject(changeAddress.csl);
    return changeAddress.addr;
  }
  return null;
};
const getStakeAddress = (accountData) => {
  if (accountData.keys.stake.length === 0) {
    return null;
  }
  const stakeKey = accountData.keys.stake[0];
  const networkId = accountData.state.networkId;
  const { isStakeScript } = getScriptState(accountData, false, true);
  const addrBech32 = isStakingEnabled(networkId) ? getRewardAddressFromCred(stakeKey.cred, networkId, isStakeScript) : "";
  return isStakingEnabled(networkId) ? createIReceiveAddress(addrBech32, stakeKey.used, stakeKey.path, getDerivationPath(stakeKey.path)) : null;
};
const getRootAddress = (accountData) => {
  const paymentKey = accountData.keys.payment[0];
  const stakeKey = accountData.keys.stake.length > 0 ? accountData.keys.stake[0] : null;
  const networkId = accountData.state.networkId;
  const {
    isPayScript,
    isStakeScript
  } = getScriptState(accountData, true, true);
  const addrBech32 = stakeKey && isStakingEnabled(networkId) ? getBaseAddressFromCred(paymentKey.cred, stakeKey.cred, networkId, isPayScript, isStakeScript) : getEnterpriseAddressFromCred(paymentKey.cred, networkId, isPayScript);
  return createIReceiveAddress(addrBech32, paymentKey.used, paymentKey.path, getDerivationPath(paymentKey.path));
};

var ITokenRegistrySource = /* @__PURE__ */ ((ITokenRegistrySource2) => {
  ITokenRegistrySource2[ITokenRegistrySource2["TokenRegistry"] = 0] = "TokenRegistry";
  ITokenRegistrySource2[ITokenRegistrySource2["CIP20"] = 1] = "CIP20";
  ITokenRegistrySource2[ITokenRegistrySource2["CIP68"] = 2] = "CIP68";
  return ITokenRegistrySource2;
})(ITokenRegistrySource || {});
var MediaSize = /* @__PURE__ */ ((MediaSize2) => {
  MediaSize2[MediaSize2["LOW"] = 128] = "LOW";
  MediaSize2[MediaSize2["HIGH"] = 1024] = "HIGH";
  return MediaSize2;
})(MediaSize || {});
var MediaType = /* @__PURE__ */ ((MediaType2) => {
  MediaType2["IMAGE"] = "IMAGE";
  MediaType2["AUDIO"] = "AUDIO";
  MediaType2["VIDEO"] = "VIDEO";
  MediaType2["PDF"] = "PDF";
  MediaType2["IFRAME"] = "IFRAME";
  MediaType2["MUSIC_SONG"] = "MUSIC_SONG";
  MediaType2["UNDEFINED"] = "UNDEFINED";
  return MediaType2;
})(MediaType || {});

class AssetDB extends Dexie {
  list;
  cdn;
  constructor(networkId) {
    super("eternl-" + networkId + "-asset");
    this.version(1).stores({
      list: "p",
      cdn: "f"
    });
    this.version(2).upgrade((tx) => {
      return tx.table("list").clear();
    });
  }
}
const dbMap$1 = networkIdList.reduce((o, n) => {
  o[n] = null;
  return o;
}, {});
const getDB$1 = async (networkId) => {
  let db = dbMap$1[networkId];
  if (!db) {
    db = new AssetDB(networkId);
    dbMap$1[networkId] = db;
  }
  if (!db.isOpen()) {
    await db.open();
  }
  return db;
};
const getAssets = (networkId, assets) => {
  return getDB$1(networkId).then((db) => {
    return db.list.bulkGet(Object.keys(assets)).then((dbList) => {
      const assetList = {};
      for (const item of dbList) {
        if (item) {
          const wantedAssets = assets[item.p];
          assetList[item.p] = item.a.filter((ai) => wantedAssets.includes(ai.h));
        }
      }
      return assetList;
    }).catch((e) => null);
  }).catch((e) => null);
};
const putAssets = (networkId, assets) => {
  return getDB$1(networkId).then((db) => {
    return db.transaction("rw", db.list, async (tx) => {
      const dbList = await db.list.bulkGet(Object.keys(assets));
      for (const entry of Object.entries(assets)) {
        const dbAsset = dbList.find((a) => a && a.p === entry[0]);
        if (dbAsset) {
          const assetList = dbAsset.a.filter((a) => !entry[1].some((ai) => ai.h === a.h));
          assetList.push(...entry[1]);
          db.list.put({ p: entry[0], a: assetList });
        } else {
          db.list.put({ p: entry[0], a: entry[1] });
        }
      }
      return true;
    });
  }).catch((e) => false);
};
const removeAllAssets = (networkId) => getDB$1(networkId).then((db) => db.list.clear());
const getCDNImage = (networkId, fingerprint) => {
  return getDB$1(networkId).then((db) => db.cdn.get(fingerprint));
};
const getCDNImages = (networkId, fingerprints) => {
  return getDB$1(networkId).then((db) => {
    return db.transaction("r", db.cdn, async (tx) => {
      return await db.cdn.bulkGet(fingerprints);
    });
  }).catch((e) => []);
};
const putCDNImage = (networkId, image) => {
  return getDB$1(networkId).then((db) => db.cdn.put(image));
};
const putCDNImages = (networkId, images) => {
  return getDB$1(networkId).then((db) => {
    return db.transaction("rw", db.cdn, async (tx) => {
      db.cdn.bulkPut(images);
      return true;
    });
  }).catch((e) => false);
};
const removeAllCDNImages = (networkId) => getDB$1(networkId).then((db) => db.cdn.clear());
const AssetDB$1 = {
  getAssets,
  putAssets,
  getCDNImage,
  getCDNImages,
  putCDNImage,
  putCDNImages,
  removeAllAssets,
  removeAllCDNImages
};

const endPoints = networkIdList.reduce((o, n) => {
  o[n] = {
    postgrest: { rpc(a, b) {
      return { single() {
      } };
    }, url: "", schema: "" },
    postgrestFH: { rpc(a, b) {
      return { single() {
      } };
    }, url: "", schema: "" },
    gql: "",
    fh: {
      jwt_token: "",
      api: ""
    },
    catalyst: "",
    id: n
  };
  if (n === "mainnet") {
    o[n].bf = {
      pid: "Qyj1TZi2K991Na979bZd1VBHw66RxhpW",
      api: "https://cardano-mainnet.blockfrost.io/api/v0"
    };
    o[n].swap = {
      ms: {
        pools: "https://onchain.muesliswap.com/pools/pair",
        orders: "https://onchain.muesliswap.com/orders/all",
        datum: "https://aggregator.muesliswap.com/constructSwapDatum",
        cancel: "https://aggregator.muesliswap.com/cancelSwapTransaction",
        verified: "https://api.muesliswap.com/token-status"
      },
      dh: {
        us: "https://api-us.dexhunterv3.app",
        eu: "https://api-eu.dexhunterv3.app",
        orders: "/swap/orders/",
        lpinfo: "/swap/pairStats/",
        assets: "/swap/tokens",
        estimate: "/swap/estimate",
        restimate: "/swap/reverseEstimate",
        lestimate: "/swap/limit/estimate",
        avgprice: "/swap/averagePrice/",
        build: "/swap/build",
        limit: "/swap/limit/build",
        cancel: "/swap/cancel",
        options: { headers: [{ name: "X-Partner-Id", value: "eternl-Zdfz2u71Q7cL" }] }
      },
      ss: {
        token: "https://eternl.steelswap.io/tokens/list/",
        usdPrice: "https://eternl.steelswap.io/tokens/price/usd/"
      },
      py: {
        floorAndSales: "https://devapi.pyroanalytics.io/v1/policy/collectionFloorAndSales"
      }
    };
    o[n].catalyst = "https://core.projectcatalyst.io/api/v0/fund";
  } else if (n === "preprod") {
    o[n].bf = {
      pid: "preprodmrTNQWgyoje1RDejR7FeJYUAuUSDMbP2",
      api: "https://cardano-preprod.blockfrost.io/api/v0"
    };
    o[n].swap = {
      ms: {
        pools: "https://preprod.onchain.muesliswap.com/pools/pair",
        orders: "https://preprod.onchain.muesliswap.com/orders/all",
        datum: "https://aggregator.muesliswap.com/constructTestnetSwapDatum",
        cancel: "https://aggregator.muesliswap.com/cancelTestnetSwapTransaction",
        verified: ""
      },
      ss: {
        token: "https://ci.cardem.io/api/tokens/list/",
        usdPrice: "https://ci.cardem.io/api/tokens/price/usd/"
      }
    };
    o[n].catalyst = "https://core.projectcatalyst.io/api/v0/fund";
  } else if (n === "preview") {
    o[n].bf = {
      pid: "preview9uvxT4opuz8kZGYYXNLzVsjhk43VYF6U",
      api: "https://cardano-preview.blockfrost.io/api/v0"
    };
  }
  return o;
}, {});
networkIdList.reduce((o, n) => {
  o[n] = [];
  return o;
}, {});
const ipfsEndPoints = [
  {
    api: "https://ipfs.blockfrost.io/api/v0/ipfs/gateway/",
    pid: "OgH6uBktScbjFjmJHkHwcCcxK76S4m1Y"
  },
  {
    api: "https://ipfs.blockfrost.dev/ipfs/"
  }
];
networkIdList.reduce((o, n) => {
  o[n] = {
    postgrest: { rpc(a, b) {
      return { single() {
      } };
    }, url: "", schema: "" },
    postgrestFH: { rpc(a, b) {
      return { single() {
      } };
    }, url: "", schema: "" },
    gql: "",
    fh: {
      jwt_token: "",
      api: ""
    },
    catalyst: "",
    id: n
  };
  return o;
}, {});

const getPIDHeader = (pid) => {
  return {
    name: "project_id",
    value: pid
  };
};
const fetchIPFS = async (url, request = new XMLHttpRequest()) => {
  let ipfsPath = url.split("ipfs://");
  if (ipfsPath.length === 2) {
    url = ipfsPath[1];
  }
  ipfsPath = url.split("ipfs/");
  if (ipfsPath.length === 2) {
    url = ipfsPath[1];
  }
  for (const ipfsEndPoint of ipfsEndPoints) {
    let options = { responseType: "arraybuffer" };
    if (ipfsEndPoint.pid) {
      options = { ...options, header: getPIDHeader(ipfsEndPoint.pid) };
    }
    const ipfsImgRaw = await api.get(ipfsEndPoint.api + url, options, void 0, request).catch((err) => {
      console.error("fetchIPFS:", err);
    });
    if (ipfsImgRaw) {
      return Buffer$1.from(ipfsImgRaw, "binary").toString("base64");
    }
  }
  return null;
};
const fileCache = /* @__PURE__ */ new Map();
const setLoadedSource = (src, loadedSrc, target) => {
  if (!fileCache.has(src)) {
    fileCache.set(src, loadedSrc);
    target.value = loadedSrc;
  }
};
const parseMetaSrcFile = async (srcFile, mediaSrc, hooks) => {
  if (Array.isArray(srcFile.src)) {
    srcFile.src = srcFile.src.join("");
  } else {
    srcFile.src = srcFile.src ?? "";
  }
  if (fileCache.has(srcFile.src)) {
    mediaSrc.value = fileCache.get(srcFile.src);
    return true;
  }
  srcFile.mediaType = srcFile.mediaType ?? null;
  let xmlHttpRequest = new XMLHttpRequest();
  if (hooks) {
    hooks.map((value) => {
      xmlHttpRequest.addEventListener(value.eventName, value.eventHandler);
    });
  }
  if (srcFile.src.length === 0) return false;
  if (srcFile.mediaType?.startsWith("image/")) {
    if (srcFile.src.startsWith("ar://")) {
      setLoadedSource(srcFile.src, "https://arweave.net/" + srcFile.src.slice(5), mediaSrc);
      return true;
    } else if (srcFile.src.includes(";base64,")) {
      setLoadedSource(srcFile.src, srcFile.src, mediaSrc);
      return true;
    } else if (srcFile.src.startsWith("ipfs://")) {
      const ipfsBase64 = await fetchIPFS(srcFile.src, xmlHttpRequest);
      if (ipfsBase64) {
        const type = srcFile.mediaType === "image/jpeg" ? "image/jpg" : srcFile.mediaType;
        setLoadedSource(srcFile.src, "data:" + type + ";base64," + ipfsBase64, mediaSrc);
        return true;
      }
    }
  } else if (srcFile.mediaType?.startsWith("text/html") || srcFile.mediaType?.startsWith("application/pdf")) {
    if (srcFile.src.startsWith("ar://")) {
      setLoadedSource(srcFile.src, "https://arweave.net/" + srcFile.src.slice(5), mediaSrc);
      return true;
    } else if (srcFile.src.startsWith("ipfs://")) {
      const ipfsBase64 = await fetchIPFS(srcFile.src, xmlHttpRequest);
      if (ipfsBase64) {
        setLoadedSource(srcFile.src, "data:" + srcFile.mediaType + ";base64," + ipfsBase64, mediaSrc);
        return true;
      }
    } else {
      setLoadedSource(srcFile.src, srcFile.src, mediaSrc);
      return true;
    }
  } else if (srcFile.mediaType?.startsWith("video/")) {
    if (srcFile.src.startsWith("ar://")) {
      setLoadedSource(srcFile.src, "https://arweave.net/" + srcFile.src.slice(5), mediaSrc);
      return true;
    } else if (srcFile.src.startsWith("ipfs://")) {
      const ipfsBase64 = await fetchIPFS(srcFile.src, xmlHttpRequest);
      if (ipfsBase64) {
        setLoadedSource(srcFile.src, "data:" + srcFile.mediaType + ";base64," + ipfsBase64, mediaSrc);
        return true;
      }
    } else {
      setLoadedSource(srcFile.src, srcFile.src, mediaSrc);
      return true;
    }
  } else if (srcFile.mediaType?.startsWith("audio/")) {
    if (srcFile.src.startsWith("ar://")) {
      setLoadedSource(srcFile.src, "https://arweave.net/" + srcFile.src.slice(5), mediaSrc);
      return true;
    } else if (srcFile.src.startsWith("ipfs://")) {
      const ipfsBase64 = await fetchIPFS(srcFile.src, xmlHttpRequest);
      if (ipfsBase64) {
        setLoadedSource(srcFile.src, "data:" + srcFile.mediaType + ";base64," + ipfsBase64, mediaSrc);
        return true;
      }
    } else {
      setLoadedSource(srcFile.src, srcFile.src, mediaSrc);
      return true;
    }
  }
  return false;
};
const fetchAssetInfo = async (networkId, assetMap) => {
  const url = `/${networkId}/v2/asset/info`;
  const res = await api.post(url, { assetList: assetMap }).catch((err) => {
    console.error(el("fetchAssetInfo"), json(err));
  });
  if (res?.data) {
    return res?.data;
  }
  return {};
};
const fetchAssetMetadata = async (networkId, policyId, assetName) => {
  const url = `/${networkId}/v2/asset/metadata`;
  const res = await api.post(url, { policyId, assetName }).catch((err) => {
    console.error(el("fetchAssetMetadata"), json(err));
  });
  if (res?.data?.metadata) {
    return res?.data.metadata;
  } else if (res?.data?.cip68meta) {
    return res?.data.cip68meta;
  }
  return [];
};
const fetchAssetCDN = async (networkId, assetList) => {
  const url = `/${networkId}/v2/asset/cdn`;
  const res = await api.post(url, { assetList }).catch((err) => {
    console.error(el("fetchAssetCDN"), json(err));
  });
  if (res?.data) {
    return res?.data;
  }
  return [];
};
const fetchImageCDN = async (url, fingerprint) => {
  const res = await api.fetchData(url, true, null, {
    responseType: "arraybuffer"
  }).catch((err) => {
    console.warn(el("fetchImageCdn"), fingerprint, json(err));
  });
  if (res) {
    return res;
  }
  return null;
};
const fetchAssetCDNImage = async (networkId, assetCDN, mediaSize = MediaSize.LOW) => {
  const imageParam = assetCDN.l.find((p) => p.s === mediaSize);
  let image = null;
  if (imageParam) {
    const imageUrl = buildUrl(networkId, buildBaseUrl(networkId, assetCDN.f), imageParam);
    if (imageUrl) {
      image = await fetchImageCDN(imageUrl, assetCDN.f);
    }
  }
  return image;
};
const buildBaseUrl = (networkId, fingerprint) => {
  if (networkId === "mainnet") {
    return `https://${fingerprint}.eternl.nftcdn.io/image`;
  } else if (networkId === "preprod" || networkId === "preview") {
    return `https://${fingerprint}.${networkId}.nftcdn.io/image`;
  }
  return null;
};
const buildUrl = (networkId, baseUrl, params) => {
  if (!baseUrl) {
    return null;
  }
  if (params.s) {
    baseUrl += "?size=" + params.s;
  }
  return baseUrl + (networkId !== "preview" ? "&tk=" + params.tk : "");
};

const _assetInfoMap = /* @__PURE__ */ new Map();
const _assetFingerprintMap = /* @__PURE__ */ new Map();
const _promiseMap$2 = /* @__PURE__ */ new Map();
const __getAssetInfoMap = () => _assetInfoMap;
const getAssetInfoCheck = (policyId, assetName) => {
  if (!policyId || !assetName) {
    return void 0;
  }
  let assetInfo = _assetInfoMap.get(policyId)?.get(assetName);
  return assetInfo;
};
const getAssetInfo = async (policyId, assetName) => {
  if (!policyId || assetName == null) {
    return void 0;
  }
  let assetInfo = _assetInfoMap.get(policyId)?.get(assetName);
  if (assetInfo) {
    return assetInfo;
  }
  assetInfo = await getAssetInfoFromDB(policyId, assetName);
  if (assetInfo) {
    return assetInfo;
  }
  let assetInfoPromise = _promiseMap$2.get(policyId + assetName);
  if (!assetInfoPromise) {
    assetInfoPromise = loadAssetInfo(policyId, assetName);
    _promiseMap$2.set(policyId + assetName, assetInfoPromise);
  }
  assetInfo = await assetInfoPromise;
  return assetInfo;
};
const getAssetInfoList = async (assetDetailsList) => {
  const assetMap = {};
  for (const assetDetails of assetDetailsList) {
    if (!assetDetails) {
      continue;
    }
    if (assetDetails.ai) {
      continue;
    }
    let assetInfo = _assetInfoMap.get(assetDetails.p)?.get(assetDetails.t.a);
    if (assetInfo) {
      assetDetails.ai = assetInfo;
      continue;
    }
    assetMap[assetDetails.p] = assetMap[assetDetails.p] || [];
    assetMap[assetDetails.p].push(assetDetails.t.a);
  }
  await getAssetInfoFromDBList(assetMap);
  return _assetInfoMap;
};
const getAssetByFingerprint = (fingerprint) => {
  const asset = _assetFingerprintMap.get(fingerprint);
  return asset;
};
const addToAssetFingerprintMap = (tokenList) => {
  for (const entry of tokenList) {
    const fingerprint = getAssetIdBech32(entry.policyId, entry.hexName);
    if (_assetFingerprintMap.has(fingerprint)) {
      continue;
    }
    _assetFingerprintMap.set(fingerprint, { p: entry.policyId, t: { a: entry.hexName, q: "0" } });
  }
};
const addAllAssetInfoToMap = (assetInfoMap) => {
  for (const policyId in assetInfoMap) {
    const assetInfoList = assetInfoMap[policyId];
    let policyMap = _assetInfoMap.get(policyId);
    if (!policyMap) {
      policyMap = /* @__PURE__ */ new Map();
      _assetInfoMap.set(policyId, policyMap);
    }
    for (const assetInfo of assetInfoList) {
      policyMap.set(assetInfo.h, assetInfo);
      const fingerprint = getAssetIdBech32(policyId, assetInfo.h);
      _assetFingerprintMap.set(fingerprint, { p: policyId, t: { a: assetInfo.h, q: "0" } });
    }
  }
};
const getAssetInfoFromDB = async (policyId, assetName) => {
  const assetMap = { [policyId]: [assetName] };
  const dbAssets = await AssetDB$1.getAssets(networkId.value, assetMap) ?? {};
  const assetInfo = dbAssets[policyId]?.find((ai) => ai.h === assetName);
  addAssetInfoToMap(policyId, assetName, assetInfo);
  return assetInfo;
};
const getAssetInfoFromDBList = async (assetMap) => {
  if (Object.keys(assetMap).length === 0) {
    return;
  }
  const dbAssets = await AssetDB$1.getAssets(networkId.value, assetMap) ?? {};
  addAllAssetInfoToMap(dbAssets);
  return dbAssets;
};
const loadAssetInfo = async (policyId, assetName) => {
  const assetMap = { [policyId]: [assetName] };
  const assetInfoMap = await fetchAssetInfo(networkId.value, assetMap);
  if (!assetInfoMap) {
    return void 0;
  }
  const assetInfo = assetInfoMap[policyId]?.find((ai) => ai.h === assetName);
  addAssetInfoToMap(policyId, assetName, assetInfo);
  if (assetInfo) {
    await saveAssetInfoToDB(policyId, assetInfo);
  }
  _promiseMap$2.delete(policyId + assetName);
  return assetInfo;
};
const loadAssetMapInfo = async (assetMap) => {
  const assetInfoMap = await fetchAssetInfo(networkId.value, assetMap);
  if (!assetInfoMap) {
    return;
  }
  for (const policyId in assetInfoMap) {
    const assetNameList = assetMap[policyId];
    if (!assetNameList) {
      continue;
    }
    const assetInfoList = assetInfoMap[policyId];
    for (const assetName of assetNameList) {
      const assetInfo = assetInfoList.find((ai) => ai.h === assetName);
      addAssetInfoToMap(policyId, assetName, assetInfo);
      if (assetInfo) {
        await saveAssetInfoToDB(policyId, assetInfo);
      }
      _promiseMap$2.delete(policyId + assetName);
    }
  }
};
const saveAssetInfoToDB = (policyId, assetInfo) => {
  return AssetDB$1.putAssets(networkId.value, { [policyId]: [assetInfo] });
};
const addAssetInfoToMap = (policyId, assetName, assetInfo) => {
  if (!assetInfo) {
    return;
  }
  let policyMap = _assetInfoMap.get(policyId);
  if (!policyMap) {
    policyMap = /* @__PURE__ */ new Map();
    _assetInfoMap.set(policyId, policyMap);
  }
  policyMap.set(assetName, assetInfo);
  const fingerprint = getAssetIdBech32(policyId, assetName);
  _assetFingerprintMap.set(fingerprint, { p: policyId, t: { a: assetName, q: "0" } });
};

const get721MetadataDetails = (policy, name, metadata) => {
  const meta721 = metadata.find((meta) => meta.key === "721")?.json ?? null;
  if (!meta721) {
    return null;
  }
  if (policy in meta721) ; else if (prefix0x(policy) in meta721) {
    policy = prefix0x(policy);
  } else return null;
  const formattedAssetName = formatAssetName(name);
  if (name in meta721[policy]) ; else if (prefix0x(name) in meta721[policy]) {
    name = prefix0x(name);
  } else if (formattedAssetName in meta721[policy]) {
    name = formattedAssetName;
  } else return null;
  return meta721[policy][name];
};
const isValidMetadataList = (metadata) => {
  for (const meta of metadata) {
    if (!("key" in meta) || !("json" in meta)) {
      return false;
    }
  }
  return true;
};
const get1155Metadata = (metadata) => {
  const meta1155 = metadata.find((meta) => meta.key === "721")?.json ?? null;
  return meta1155 && "asset" in meta1155 ? meta1155 : null;
};

const _assetMetaMap = /* @__PURE__ */ new Map();
const _promiseMap$1 = /* @__PURE__ */ new Map();
const __getAssetMetaMap = () => _assetMetaMap;
const getAssetMeta = async (policyId, assetName) => {
  if (!policyId || !assetName) {
    return void 0;
  }
  let metaInfo = _assetMetaMap.get(policyId)?.get(assetName);
  if (metaInfo) {
    return metaInfo;
  }
  let metaInfoPromise = _promiseMap$1.get(policyId + assetName);
  if (!metaInfoPromise) {
    metaInfoPromise = loadAssetMeta(policyId, assetName);
    _promiseMap$1.set(policyId + assetName, metaInfoPromise);
  }
  metaInfo = await metaInfoPromise;
  return metaInfo;
};
const loadAssetMeta = async (policyId, assetName) => {
  const serverMeta = await fetchAssetMetadata(networkId.value, policyId, assetName);
  if (!serverMeta) {
    return void 0;
  }
  const assetMeta = {};
  let hasMeta = false;
  if (Array.isArray(serverMeta) && isValidMetadataList(serverMeta)) {
    assetMeta.list = serverMeta;
    hasMeta = true;
    const meta721 = get721MetadataDetails(policyId, assetName, serverMeta);
    if (meta721) {
      assetMeta.meta721 = meta721;
    } else {
      const meta1155 = get1155Metadata(serverMeta);
      if (meta1155) {
        assetMeta.meta1155 = meta1155;
      }
    }
  } else if (serverMeta.json) {
    assetMeta.meta68 = serverMeta.json;
    hasMeta = true;
  }
  if (!hasMeta) {
    return void 0;
  }
  addAssetMetaToMap(policyId, assetName, assetMeta);
  _promiseMap$1.delete(policyId + assetName);
  return assetMeta;
};
const addAssetMetaToMap = (policyId, assetName, metaInfo) => {
  if (!metaInfo) {
    return;
  }
  let policyMap = _assetMetaMap.get(policyId);
  if (!policyMap) {
    policyMap = /* @__PURE__ */ new Map();
    _assetMetaMap.set(policyId, policyMap);
  }
  policyMap.set(assetName, metaInfo);
};

const ErrorSwap = {
  aggList: "ErrorSwap.aggList",
  providerList: "ErrorSwap.providerList",
  feeAddress: "ErrorSwap.feeAddress",
  openOrders: "ErrorSwap.openOrders",
  lpInfo: "ErrorSwap.lpInfo",
  verifiedAssets: "ErrorSwap.verifiedAssets",
  estimate: "ErrorSwap.estimate",
  reverseEstimate: "ErrorSwap.reverseEstimate",
  limitEstimate: "ErrorSwap.limitEstimate",
  averagePrice: "ErrorSwap.averagePrice",
  swapOrder: "ErrorSwap.swapOrder",
  limitOrder: "ErrorSwap.limitOrder",
  cancelOrder: "ErrorSwap.cancelOrder"
};

var DHRequestType = /* @__PURE__ */ ((DHRequestType2) => {
  DHRequestType2[DHRequestType2["feeAddress"] = 0] = "feeAddress";
  DHRequestType2[DHRequestType2["openOrders"] = 1] = "openOrders";
  DHRequestType2[DHRequestType2["lpInfo"] = 2] = "lpInfo";
  DHRequestType2[DHRequestType2["verifiedAssets"] = 3] = "verifiedAssets";
  DHRequestType2[DHRequestType2["estimate"] = 4] = "estimate";
  DHRequestType2[DHRequestType2["reverseEstimate"] = 5] = "reverseEstimate";
  DHRequestType2[DHRequestType2["limitEstimate"] = 6] = "limitEstimate";
  DHRequestType2[DHRequestType2["averagePrice"] = 7] = "averagePrice";
  DHRequestType2[DHRequestType2["swapOrder"] = 8] = "swapOrder";
  DHRequestType2[DHRequestType2["limitOrder"] = 9] = "limitOrder";
  DHRequestType2[DHRequestType2["cancelOrder"] = 10] = "cancelOrder";
  return DHRequestType2;
})(DHRequestType || {});

const fetchVerifiedAssets = async (networkId, accountId) => {
  if (!accountId) {
    accountId = DEFAULT_ACCOUNT_ID;
  }
  try {
    return await getRequestData()(
      networkId,
      accountId,
      ApiRequestType.swapDH,
      ErrorSwap.verifiedAssets,
      {
        id: accountId,
        type: DHRequestType.verifiedAssets
      },
      async (data) => data?.data ?? null
    );
  } catch (err) {
    console.error("fetchVerifiedAssets:", err);
    return null;
  }
};
const fetchCancelTxCBOR = async (networkId, accountId, order) => {
  if (!accountId) {
    accountId = DEFAULT_ACCOUNT_ID;
  }
  try {
    return await getRequestData()(
      networkId,
      accountId,
      ApiRequestType.swapDH,
      ErrorSwap.cancelOrder,
      {
        id: accountId,
        type: DHRequestType.cancelOrder,
        address: order.user_address,
        orderId: order._id
      },
      async (data) => data?.data ?? null
    );
  } catch (err) {
    console.error("fetchCancelTxCBOR:", err);
    return null;
  }
};

const MAX_CHUNK_SIZE = 1e3;
const UPDATE_INTERVAL = 1e3 * 60 * 60;
const ASSET_INFO_TTL = 1e3 * 60 * 60 * 24 * 7;
const verifiedAssetMap = ref({});
const swapAssetInfoMap = ref({});
const syncStartAI = ref(-1);
let _timeout = -1;
computed(() => {
  let cnt = 0;
  for (const list of Object.values(swapAssetInfoMap.value)) {
    cnt += list.length;
  }
  return cnt;
});
const loadVerifiedAssets = async () => {
  const verifiedAssetList = await fetchVerifiedAssets(networkId.value);
  if (!verifiedAssetList) {
    return;
  }
  verifiedAssetMap.value = {};
  verifiedAssetList.sort((a, b) => a.localeCompare(b, "en-US"));
  let currentPolicy = "";
  for (const asset of verifiedAssetList) {
    if (asset.length < 56) {
      continue;
    }
    const policy = asset.slice(0, 56);
    const name = asset.slice(56);
    if (currentPolicy === policy) {
      verifiedAssetMap.value[policy].push(name);
    } else {
      verifiedAssetMap.value[policy] = [name];
      currentPolicy = policy;
    }
  }
};
const loadSwapAssets = async () => {
  if (syncStartAI.value > 0) {
    return;
  }
  clearTimeout(_timeout);
  syncStartAI.value = now();
  await loadVerifiedAssets();
  let totalCnt = 0;
  for (const t of Object.values(verifiedAssetMap.value)) {
    totalCnt += t.length;
  }
  if (!totalCnt) {
    syncStartAI.value = 0;
    return;
  }
  const unknownAssets = {};
  const dbAssets = await AssetDB$1.getAssets(networkId.value, verifiedAssetMap.value) ?? {};
  swapAssetInfoMap.value = dbAssets;
  let dbCnt = 0;
  for (const entry of Object.entries(verifiedAssetMap.value)) {
    const dbAssetInfoList = dbAssets[entry[0]];
    if (!dbAssetInfoList) {
      unknownAssets[entry[0]] = entry[1];
    } else {
      dbCnt += dbAssetInfoList.length;
      const dbAssetNames = dbAssetInfoList.map((a) => a.h);
      unknownAssets[entry[0]] = entry[1].filter((h) => !dbAssetNames.includes(h));
      for (const dbAsset of dbAssetInfoList) {
        if (dbAsset.t + ASSET_INFO_TTL < syncStartAI.value) {
          unknownAssets[entry[0]].push(dbAsset.h);
          dbCnt--;
        }
      }
    }
  }
  let unknownCnt = totalCnt - dbCnt;
  if (unknownCnt === 0) {
    syncStartAI.value = 0;
    return;
  }
  const fetchedAssets = {};
  while (unknownCnt > 0) {
    const chunk = {};
    let chunkSize = 0;
    for (const policy in unknownAssets) {
      chunk[policy] = unknownAssets[policy];
      chunkSize += unknownAssets[policy].length;
      delete unknownAssets[policy];
      if (chunkSize > MAX_CHUNK_SIZE) {
        break;
      }
    }
    if (chunkSize === 0) {
      break;
    }
    unknownCnt -= chunkSize;
    const _fetchedAssets = await fetchAssetInfo(networkId.value, chunk);
    for (const policy in _fetchedAssets) {
      for (const asset of _fetchedAssets[policy]) {
        asset.t = syncStartAI.value;
      }
      fetchedAssets[policy] = _fetchedAssets[policy];
    }
    for (const entry of Object.entries(fetchedAssets)) {
      if (entry[0] in swapAssetInfoMap.value) {
        swapAssetInfoMap.value[entry[0]].push(...entry[1]);
      } else {
        swapAssetInfoMap.value[entry[0]] = entry[1];
      }
    }
    await AssetDB$1.putAssets(networkId.value, _fetchedAssets);
  }
  syncStartAI.value = 0;
  _timeout = setTimeout(() => {
    loadSwapAssets();
  }, UPDATE_INTERVAL);
};
const resetSwapData = () => {
  verifiedAssetMap.value = {};
  swapAssetInfoMap.value = {};
  syncStartAI.value = 0;
};
const initSwapStore = async () => {
  if (Object.keys(verifiedAssetMap.value).length > 0) {
    return;
  }
  await loadSwapAssets();
};
const isVerifiedAsset = (policyId, hexName) => {
  return verifiedAssetMap.value[policyId]?.includes(hexName) ?? false;
};

const _textDecoder = new TextDecoder("utf-8", { fatal: true });
const getSortedAssetList = async (ma) => {
  if (!ma) {
    return { sortedAssetList: [], numAssets: 0, numCollections: 0 };
  }
  const sortedAssetDetailsList = await getSortedAssetDetailsList(ma);
  const sortedAssetList = [];
  let lastPolicyId = "";
  let numAssetsPerPolicy = 0;
  let numAssets = 0;
  let numCollections = 0;
  let assetListItem = null;
  for (const asset of sortedAssetDetailsList) {
    if (asset.p !== lastPolicyId) {
      numAssetsPerPolicy = 0;
      lastPolicyId = asset.p;
      assetListItem = createIAssetListItem(asset.p, false);
      sortedAssetList.push(assetListItem);
    }
    if (!assetListItem) {
      continue;
    }
    numAssetsPerPolicy++;
    if (numAssetsPerPolicy === 2) {
      numCollections++;
      assetListItem.c = true;
    }
    numAssets++;
    assetListItem.l.push(asset);
  }
  return { sortedAssetList, numAssets, numCollections };
};
const getSortedAssetNames = (ma) => {
  if (!ma) {
    return [];
  }
  const sortedAssetDetailsList = [];
  for (const policyId of Object.keys(ma)) {
    const assetList = Object.entries(ma[policyId]);
    for (const asset of assetList) {
      const assetName = asset[0];
      const quantity = asset[1];
      const ai = getAssetInfoCheck(policyId, assetName);
      const assetDetails = createIAssetListItemDetails(policyId, assetName, quantity);
      if (ai) {
        assetDetails.ai = ai;
      } else {
        scheduleSetAssetInfo(assetDetails);
      }
      sortedAssetDetailsList.push(assetDetails);
    }
  }
  return sortedAssetDetailsList;
};
const getSortedAssetDetailsList = async (ma) => {
  if (!ma) {
    return [];
  }
  const sortedAssetDetailsList = getSortedAssetNames(ma);
  await scheduleSetAssetInfoList(sortedAssetDetailsList);
  sortedAssetDetailsList.sort((a, b) => {
    if (compare(a.a ?? "0", "<=", b.a ?? "0")) {
      return -1;
    }
    if (a.p !== b.p) {
      return a.p.localeCompare(a.p, "en-US");
    }
    return a.n.localeCompare(b.n, "en-US");
  });
  return sortedAssetDetailsList;
};
const getSortedAssetDetailsListCached = (accountAssets, outputAssets, cache) => {
  if (!accountAssets || !outputAssets) {
    cache.splice(0);
    return;
  }
  for (let i = cache.length - 1; i >= 0; i--) {
    const item = cache[i];
    if (!outputAssets[item.p] || !outputAssets[item.p][item.t.a]) {
      cache.splice(i, 1);
    }
  }
  const policyIdListOutput = Object.keys(outputAssets);
  const policyIdListAccount = Object.keys(accountAssets);
  for (const policyIdOutput of policyIdListOutput) {
    if (!policyIdListAccount.includes(policyIdOutput)) {
      delete outputAssets[policyIdOutput];
      for (let i = cache.length - 1; i >= 0; i--) {
        if (cache[i].p === policyIdOutput) {
          cache.splice(i, 1);
        }
      }
      continue;
    }
    const assetNameListOutput = Object.keys(outputAssets[policyIdOutput]);
    const assetNameListAccount = Object.keys(accountAssets[policyIdOutput]);
    for (const assetName of assetNameListOutput) {
      if (!assetNameListAccount.includes(assetName)) {
        delete outputAssets[policyIdOutput][assetName];
        for (let i = cache.length - 1; i >= 0; i--) {
          if (cache[i].p === policyIdOutput && cache[i].t.a === assetName) {
            cache.splice(i, 1);
          }
        }
      }
    }
  }
  for (const policyId of policyIdListOutput) {
    const outputAssetsPolicy = outputAssets[policyId];
    if (!outputAssetsPolicy) {
      continue;
    }
    const assetList = Object.entries(outputAssetsPolicy);
    for (const asset of assetList) {
      const assetName = asset[0];
      const quantity = asset[1];
      let assetDetails = cache.find((item) => item.p === policyId && item.t.a === assetName);
      if (!assetDetails) {
        assetDetails = createIAssetListItemDetails(policyId, assetName, quantity);
        cache.push(assetDetails);
      }
      assetDetails.a = quantity;
      if (!assetDetails.ai) {
        const ai = getAssetInfoCheck(policyId, assetName);
        if (ai) {
          assetDetails.ai = ai;
        } else {
          scheduleSetAssetInfo(assetDetails);
        }
      }
    }
  }
  cache.sort((a, b) => {
    if (a.p !== b.p) {
      return a.p.localeCompare(a.p, "en-US");
    }
    return a.n.localeCompare(b.n, "en-US");
  });
  scheduleSetAssetInfoList(cache);
};
const loadAssetMetadata = async (assetDetails) => {
  if (!assetDetails) {
    return;
  }
  const am = await getAssetMeta(assetDetails.p, assetDetails.t.a) ?? void 0;
  if (am) {
    assetDetails.am = am;
  }
};
const searchForAssetId = (str) => {
  if (!str || str.length < 2) {
    return null;
  }
  str = str.toLowerCase();
  const _assetInfoMap = __getAssetInfoMap();
  const _assetMetaMap = __getAssetMetaMap();
  const policyIdList = Array.from(_assetInfoMap.keys());
  const res = [];
  for (const policyId of policyIdList) {
    const assetInfoMap = _assetInfoMap.get(policyId);
    const assetMetaMap = _assetMetaMap.get(policyId);
    const assetInfoList = assetInfoMap ? Array.from(assetInfoMap.values()) : [];
    for (const assetInfo of assetInfoList) {
      try {
        if (policyId === str) {
          res.push(getAssetIdBech32(policyId, assetInfo.h));
          continue;
        }
        let _str = JSON.stringify(assetInfo).toLowerCase();
        if (assetMetaMap) {
          const assetMeta = assetMetaMap.get(assetInfo.h);
          if (assetMeta) {
            _str += " " + JSON.stringify(assetMeta).toLowerCase();
          }
        }
        if (_str.includes(str)) {
          res.push(getAssetIdBech32(policyId, assetInfo.h));
        }
      } catch (err) {
        console.error("getAssetInfoByName", err, assetInfo);
      }
    }
  }
  return res;
};
const cacheUpdateList = /* @__PURE__ */ new Map();
const cachePromises = /* @__PURE__ */ new Map();
const scheduleSetAssetInfo = (assetDetails) => {
  const key = assetDetails.p + assetDetails.t.a;
  let promise = cachePromises.get(key);
  if (promise) {
    let list = cacheUpdateList.get(key) ?? [];
    if (!list.includes(assetDetails)) {
      list.push(assetDetails);
      cacheUpdateList.set(key, list);
    }
    return promise;
  }
  promise = new Promise(async (resolve) => {
    const ai = await getAssetInfo(assetDetails.p, assetDetails.t.a) ?? void 0;
    if (ai) {
      assetDetails.ai = ai;
      assetDetails.n = getAssetName(assetDetails.n, ai, (ai.ts ?? "1") !== "1");
      let list = cacheUpdateList.get(key) ?? [];
      for (const item of list) {
        item.ai = ai;
        item.n = getAssetName(item.n, ai, (ai.ts ?? "1") !== "1");
      }
    } else {
      await dispatchSignal(doLoadTxAssetMetadata, { [assetDetails.p]: { [assetDetails.t.a]: 1 } });
    }
    cachePromises.delete(key);
    cacheUpdateList.delete(key);
    resolve();
  });
  cachePromises.set(key, promise);
  return promise;
};
const scheduleSetAssetInfoList = async (assetDetailsList) => {
  if (assetDetailsList.length === 1) {
    return scheduleSetAssetInfo(assetDetailsList[0]);
  }
  const aiList = await getAssetInfoList(assetDetailsList) ?? void 0;
  if (!aiList) {
    return;
  }
  for (const assetDetails of assetDetailsList) {
    const ai = aiList.get(assetDetails.p)?.get(assetDetails.t.a);
    if (ai) {
      assetDetails.ai = ai;
      assetDetails.n = getAssetName(assetDetails.n, ai, (ai.ts ?? "1") !== "1");
    } else {
      await dispatchSignal(doLoadTxAssetMetadata, { [assetDetails.p]: { [assetDetails.t.a]: 1 } });
    }
  }
};
const createIAssetListItem = (policyId, isCollection) => {
  return {
    p: policyId,
    c: isCollection,
    l: []
  };
};
const createIAssetListItemDetails = (policyId, assetName, quantity) => {
  return reactive({
    p: policyId,
    t: {
      a: assetName,
      q: quantity
    },
    a: "0",
    n: formatAssetName(assetName),
    f: getAssetIdBech32(policyId, assetName)
  });
};
const getAssetName = (assetName, data, preferTicker = false) => {
  if (data?.tr) {
    if (preferTicker) {
      const ticker = data.tr.t;
      if (ticker) {
        return ticker;
      }
    }
    return data.n ?? data.tr.n;
  }
  return data?.n ?? assetName;
};
const formatAssetName = (assetName) => {
  if (!assetName) {
    return "";
  }
  try {
    return _textDecoder.decode(toHexArray(assetName));
  } catch (e) {
  }
  return assetName;
};
const isVerified = (policyId, assetName) => {
  return isVerifiedAsset(policyId, assetName);
};

const cache = [];
const isAdaHandle = (value) => !!value && value.startsWith("$") && value.replace("$", "").trim() !== "";
const getCachedHandle = (adaHandle) => {
  if (!isAdaHandle(adaHandle)) {
    return null;
  }
  const cachedEntry = cache.find((entry) => entry.name === adaHandle);
  if (cachedEntry && (cachedEntry?.cachedAt ?? 0) + 5 * 60 * 1e3 > Date.now()) {
    return cachedEntry.handle;
  }
  return null;
};
const resolveAdaHandle = async (networkId, adaHandle) => {
  if (!isAdaHandle(adaHandle)) {
    console.error("resolveAdaHandle: AdaHandleError.invalidAdaHandle", networkId, adaHandle);
    throw AdaHandleError.invalidAdaHandle;
  }
  const cachedHandle = getCachedHandle(adaHandle);
  if (cachedHandle) {
    return cachedHandle;
  }
  const url = `/${networkId}/v2/misc/adahandle`;
  const res = await api.post(url, {
    assetName: adaHandle.slice(1).toLowerCase()
  }).catch((err) => {
    console.warn("Error: ADA Handle: failed", networkId, err);
  });
  const addr = res?.data?.address;
  if (addr && res?.data?.fingerprint) {
    if (!isValidSendAddress(networkId, addr)) {
      throw AdaHandleError.invalidAddress;
    }
    const tmp = {
      address: res.data.address,
      fingerprint: res.data.fingerprint
    };
    if (adaHandle) {
      for (let i = cache.length - 1; i >= 0; i--) {
        if (cache[i].name === adaHandle) {
          cache.splice(i, 1);
        }
      }
      cache.push({
        name: adaHandle,
        cachedAt: Date.now(),
        handle: tmp
      });
    }
    return tmp;
  }
  throw AdaHandleError.adaHandleNotResolved;
};

const getImageB64 = (image) => {
  let type = "data:image/png;base64,";
  const buffer = Buffer$1.from(image);
  if (image.toString().match('^<svg.+xmlns=".+')) {
    type = "data:image/svg+xml;base64,";
  }
  return type + buffer.toString("base64");
};

const _assetCDNMap = /* @__PURE__ */ new Map();
const _promiseMap = /* @__PURE__ */ new Map();
const getAssetCDNImage = async (fingerprint, mediaSize, forceUpdate = false) => {
  const assetCDN = await getAssetCDN(fingerprint, mediaSize, forceUpdate);
  if (!assetCDN) {
    return void 0;
  }
  if (mediaSize === MediaSize.LOW && assetCDN.i) {
    return getImageB64(assetCDN.i);
  }
  const arrayBuffer = await fetchAssetCDNImage(networkId.value, assetCDN, mediaSize);
  if (arrayBuffer) {
    if (mediaSize === MediaSize.LOW) {
      assetCDN.i = arrayBuffer;
      addAssetCDNToMap(fingerprint, assetCDN);
      await saveAssetCDNToDB(assetCDN);
    }
    return getImageB64(arrayBuffer);
  }
};
const getAssetCDNFromDB = async (fingerprint) => {
  const assetImage = await AssetDB$1.getCDNImage(networkId.value, fingerprint);
  addAssetCDNToMap(fingerprint, assetImage);
  return assetImage;
};
const getAssetCDN = async (fingerprint, mediaSize, forceUpdate = false) => {
  const _now = now() / 1e3;
  let memAssetCDN = !forceUpdate ? _assetCDNMap.get(fingerprint) : void 0;
  if (memAssetCDN && memAssetCDN.e < _now) {
    forceUpdate = true;
  }
  if (!forceUpdate) {
    if (memAssetCDN) {
      return memAssetCDN;
    }
  }
  const dbAssetCDN = await getAssetCDNFromDB(fingerprint);
  if (!forceUpdate) {
    if (dbAssetCDN) {
      return dbAssetCDN;
    }
  }
  let assetCDNPromise = _promiseMap.get(fingerprint);
  if (!assetCDNPromise) {
    assetCDNPromise = loadAssetCDN(fingerprint);
    _promiseMap.set(fingerprint, assetCDNPromise);
  }
  const loadedAssetCDN = await assetCDNPromise;
  return loadedAssetCDN ?? dbAssetCDN ?? memAssetCDN;
};
const loadAssetCDN = async (fingerprint) => {
  const assetCDNList = await fetchAssetCDN(networkId.value, [fingerprint]);
  if (assetCDNList.length !== 1) {
    return void 0;
  }
  const assetCDN = assetCDNList[0];
  addAssetCDNToMap(assetCDN.f, assetCDN);
  _promiseMap.delete(assetCDN.f);
  await saveAssetCDNToDB(assetCDN);
  return assetCDN;
};
const saveAssetCDNToDB = (assetCDN) => {
  return AssetDB$1.putCDNImage(networkId.value, assetCDN);
};
const addAssetCDNToMap = (fingerprint, assetImage) => {
  if (!assetImage) {
    return;
  }
  _assetCDNMap.set(fingerprint, assetImage);
};

const useAdaHandle = (asset) => {
  const _assetDetails = ref(void 0);
  const isLoading = ref(false);
  const isResolved = ref(false);
  const address = ref();
  const image = ref("");
  const _name = ref("");
  const _hexName = ref("");
  const reset = () => {
    _assetDetails.value = void 0;
    isLoading.value = false;
    isResolved.value = false;
    address.value = void 0;
    image.value = "";
  };
  watch(_assetDetails, () => {
    _name.value = _assetDetails.value?.n.substr(1);
    _hexName.value = _assetDetails.value?.t.a;
  }, { deep: true });
  const loadAssetList = async () => {
    if (!asset.value) {
      reset();
      return;
    }
    isLoading.value = true;
    const list = await getSortedAssetDetailsList(asset.value);
    if (list.length > 0) {
      _assetDetails.value = list[0];
      _name.value = _assetDetails.value?.n.substr(1);
      _hexName.value = _assetDetails.value?.t.a;
      await doResolve(_assetDetails.value.n).catch((err) => console.error(err));
    }
    isLoading.value = false;
  };
  const resolveImage = async (fingerprint) => {
    const assetCDN = await getAssetCDNImage(fingerprint, MediaSize.HIGH);
    if (assetCDN) {
      return assetCDN;
    }
  };
  const doResolve = async (name) => {
    try {
      const handle = await resolveAdaHandle(networkId.value, name);
      if (handle) {
        isResolved.value = true;
        address.value = {
          bech32: handle.address,
          used: true,
          pathInfo: "",
          searchablePath: ""
        };
        const _tmp = await resolveImage(handle.fingerprint);
        if (_tmp) {
          image.value = _tmp;
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  const getHexName = (_adaHandleAsset) => {
    if (!_adaHandleAsset) {
      return void 0;
    }
    return Object.keys(_adaHandleAsset[adaHandle])[0] ?? void 0;
  };
  watch(asset, (newValue) => {
    loadAssetList();
  }, { immediate: true, deep: true });
  return {
    adaHandle: asset,
    isLoadingAdaHandle: isLoading,
    isResolvedAdaHandle: isResolved,
    adaHandleAddress: address,
    adaHandleImage: image,
    adaHandleName: _name,
    adaHandleHexName: _hexName,
    getHexName
  };
};

class PoolDataDB extends Dexie {
  pooldata;
  constructor(networkId) {
    super("eternl-" + networkId + "-pooldata");
    this.version(2).stores({
      pooldata: "pb, ra"
    });
  }
}
const dbMap = networkIdList.reduce((o, n) => {
  o[n] = null;
  return o;
}, {});
const getDB = async (networkId) => {
  let db = dbMap[networkId];
  if (!db) {
    db = new PoolDataDB(networkId);
    dbMap[networkId] = db;
  }
  if (!db.isOpen()) {
    await db.open();
  }
  return db;
};
const bulkPutPoolData = (networkId, list) => {
  return getDB(networkId).then((db) => {
    return db.transaction("rw", [db.pooldata], async (tx) => {
      await db.pooldata.bulkPut(list);
      return true;
    });
  }).catch((error) => {
    return false;
  });
};
const getPoolDataList = (networkId) => {
  return getDB(networkId).then((db) => db.pooldata.orderBy("ra").toArray()).catch((error) => {
    return [];
  });
};
const PoolDataDB$1 = {
  bulkPutPoolData,
  getPoolDataList
};

const doLoadPoolData = "doLoadPoolData";
const onPoolDataUpdated = "onPoolDataUpdated";

const storeId = "poolDataStore";
const poolDataList = ref([]);
const filteredPoolDataList = ref([]);
const groupPoolDataList = ref([]);
const featuredPoolDataList = ref([]);
const avgROS = ref(0);
const medianROS = ref(0);
const numPoolsROS = ref(0);
let _searchValue = "";
let groupCounter = {};
const featuredPoolList = [
  "pool19pyfv4xnln8x4l7auw0n0skk3hd97shun707hrw5d4s553ys74x",
  // CCW (former TITAN #2)
  "pool1qqq6qqa0hpzvumv5p87ynczfmdj557xuwlc3289ke42g72z7f74",
  // [AHL] AHLNET #1 🇸🇪
  // 'pool1qqq6qpcq3tvnqzy7r03dush0qk9vrr88v85d6fj3ws9h5zj0h8w',   // [AHL] AHLNET #2 🇸🇪
  "pool1qqqqpanw9zc0rzh0yp247nzf2s35uvnsm7aaesfl2nnejaev0uc"
  // [TITAN] TITANstaking
  // 'pool19pyfv4xnln8x4l7auw0n0skk3hd97shun707hrw5d4s553ys74x'    // [TITAN] TITANstaking #2
];
const updatePoolData = async () => {
  const dbEntries = await PoolDataDB$1.getPoolDataList(networkId.value);
  poolDataList.value.splice(0, poolDataList.value.length, ...dbEntries);
  updateROS();
  updateGroupList();
  updateFilteredPools(_searchValue);
  return true;
};
const getPoolInfo = (poolBech32) => {
  if (!poolBech32) {
    return null;
  }
  return poolDataList.value.find((p) => p.pb === poolBech32) ?? null;
};
const updateROS = () => {
  const localPoolData = poolDataList.value.filter((pool) => pool.stl > 0.1);
  localPoolData.sort((a, b) => b.mr12 - a.mr12);
  const epochParams = checkEpochParams(networkId.value);
  if (!epochParams) {
    avgROS.value = 0;
    medianROS.value = 0;
    numPoolsROS.value = 0;
    return;
  }
  let k = Math.min(epochParams.stakePoolTargetNum, localPoolData.length);
  let kHalf = Math.floor(k / 2);
  let _sumROS = 0;
  let _numPools = 0;
  let _medianROS = 0;
  for (let i = 0; i < k; i++) {
    const pool = localPoolData[i];
    if (pool.ma > 0.1) {
      kHalf++;
      continue;
    }
    if (pool.mr12 === 0) {
      kHalf++;
      continue;
    }
    _sumROS += pool.mr12;
    _numPools += 1;
    if (_numPools === kHalf) {
      _medianROS = pool.mr12;
    }
  }
  avgROS.value = _sumROS / _numPools;
  if (_medianROS === 0) {
    _medianROS = avgROS.value;
  }
  medianROS.value = _medianROS;
  numPoolsROS.value = _numPools;
};
const updateGroupList = () => {
  groupCounter = {};
  if (poolDataList.value.length === 0) return;
  groupPoolDataList.value.splice(0, groupPoolDataList.value.length, ...poolDataList.value.filter(poolGroupFilter));
  featuredPoolDataList.value.splice(0, featuredPoolDataList.value.length, ...poolDataList.value.filter(poolFeatureFilter));
};
const poolSearchFilter = (item) => {
  if (_searchValue.length > 2) {
    if (item?.md?.ticker) {
      if (item.md.ticker.toLowerCase().startsWith(_searchValue) || item.md.name?.toLowerCase().includes(_searchValue) || item.md.description?.toLowerCase().includes(_searchValue)) {
        return true;
      }
    }
    return item.pb.includes(_searchValue) || item.ph.includes(_searchValue);
  }
  return true;
};
const poolGroupFilter = (item) => {
  if (item.gn !== null) {
    if (groupCounter.hasOwnProperty(item.gn)) {
      groupCounter[item.gn] += 1;
    } else {
      groupCounter[item.gn] = 1;
    }
    const count = groupCounter[item.gn];
    if (count > 2) {
      return false;
    }
  }
  return true;
};
const poolFeatureFilter = (item) => featuredPoolList.includes(item.pb);
const updateFilteredPools = (searchStr) => {
  _searchValue = searchStr?.toLowerCase() ?? "";
  if (_searchValue.length > 2) {
    const filteredList = poolDataList.value.filter(poolSearchFilter);
    filteredList.sort((a, b) => {
      const tickerA = a.md?.ticker?.toLowerCase() ?? null;
      const tickerB = b.md?.ticker?.toLowerCase() ?? null;
      if (tickerA === _searchValue) {
        return -1;
      }
      if (tickerB === _searchValue) {
        return 1;
      }
      const tickerAStart = tickerA?.startsWith(_searchValue) ?? false;
      const tickerBStart = tickerB?.startsWith(_searchValue) ?? false;
      if (tickerAStart && !tickerBStart) {
        return -1;
      } else if (!tickerAStart && tickerBStart) {
        return 1;
      } else if (tickerAStart && tickerBStart) {
        if (a.ra < b.ra) return -1;
        return 1;
      }
      const tickerAIncludes = tickerA?.includes(_searchValue) ?? false;
      const tickerBIncludes = tickerB?.includes(_searchValue) ?? false;
      if (tickerAIncludes && !tickerBIncludes) {
        return -1;
      } else if (!tickerAIncludes && tickerBIncludes) {
        return 1;
      } else if (tickerAIncludes && tickerBIncludes) {
        if (a.ra < b.ra) return -1;
        return 1;
      }
      const nameA = a.md?.name?.toLowerCase() ?? null;
      const nameB = b.md?.name?.toLowerCase() ?? null;
      if (nameA === _searchValue) return -1;
      if (nameB === _searchValue) return 1;
      const nameAStart = nameA?.startsWith(_searchValue) ?? false;
      const nameBStart = nameB?.startsWith(_searchValue) ?? false;
      if (nameAStart && !nameBStart) {
        return -1;
      } else if (!nameAStart && nameBStart) {
        return 1;
      } else if (nameAStart && nameBStart) {
        if (a.ra < b.ra) return -1;
        return 1;
      }
      const nameAIncludes = nameA?.includes(_searchValue) ?? false;
      const nameBIncludes = nameB?.includes(_searchValue) ?? false;
      if (nameAIncludes && !nameBIncludes) {
        return -1;
      } else if (!nameAIncludes && nameBIncludes) {
        return 1;
      } else if (nameAIncludes && nameBIncludes) {
        if (a.ra < b.ra) return -1;
        return 1;
      }
      if (a.ra < b.ra) return -1;
      return 1;
    });
    filteredPoolDataList.value.splice(0, filteredPoolDataList.value.length, ...filteredList);
  } else {
    filteredPoolDataList.value.splice(0, filteredPoolDataList.value.length, ...poolDataList.value);
  }
  dispatchSignalSync(onPoolDataUpdated);
};
const load = async () => {
  await dispatchSignal(doLoadPoolData);
  if (poolDataList.value.length === 0) {
    await updatePoolData();
  }
};
addSignalListener(doInitApp, storeId, load);

const saving$1 = ref(false);
const updateAppAccountSetting = async (appAccount, obj) => {
  saving$1.value = true;
  let success = false;
  if (appAccount) {
    updateIAccountSettingsPartial(appAccount.data.settings, {
      id: appAccount.id,
      networkId: appAccount.data.settings.networkId,
      ...obj
    });
    try {
      success = await saveAccountSettings(appAccount);
    } catch (err) {
      console.error(err);
    }
  }
  saving$1.value = false;
  return success;
};
function useAccountSettings(appAccountRef) {
  const accountData = computed(() => appAccountRef.value?.data ?? null);
  const accountUtxoMap = computed(() => appAccountRef.value?.utxoMap ?? null);
  const accountSyncInfo = computed(() => appAccountRef.value?.syncInfo ?? null);
  const account = computed(() => accountData.value?.account ?? null);
  const accountSettings = computed(() => accountData.value?.settings ?? null);
  const accountPath = computed(() => getDerivationPath(account.value?.path ?? []));
  const accountNetworkId = computed(() => accountData.value?.state.networkId ?? "mainnet");
  const accountSyncState = computed(() => accountSyncInfo.value?.state ?? SyncState.idle);
  const isAccountSyncing = computed(() => accountSyncState.value === SyncState.syncing || accountSyncState.value === SyncState.initializing || accountSyncState.value === SyncState.queued);
  const _adahandle = computed(() => accountSettings.value?.adahandle);
  const isAumEnabled = computed(() => accountSettings.value?.aum.enabled ?? false);
  const isAwEnabled = computed(() => accountSettings.value?.aw.enabled ?? false);
  const isCollateralEnabled = computed(() => accountSettings.value?.collateral.enabled ?? false);
  const useEternlCollateral = computed(() => accountSettings.value?.collateral.eternl !== false);
  const isTfEnabled = computed(() => accountSettings.value?.tf.enabled ?? false);
  const tfBundleSize = computed(() => {
    if (accountSettings.value) {
      return accountSettings.value.tf.bundleSize;
    }
    return 0;
  });
  const isSamEnabled = computed(() => accountSettings.value?.sam.enabled ?? true);
  const samAddr = computed(() => {
    if (accountSettings.value) {
      return accountSettings.value.sam.addr;
    }
    return "";
  });
  const isManualSyncEnabled = computed(() => accountSettings.value?.manualSync.enabled ?? false);
  const isHistorySyncEnabled = computed(() => accountSettings.value?.historySync.enabled ?? false);
  const isSendAllEnabled = computed(
    () => true
    /* accountSettings.value?.sendAll.enabled        ?? false */
  );
  const isFavorite = computed(() => accountSettings.value?.favorite?.enabled ?? false);
  const hasCatalystData = computed(() => accountSettings.value?.catalyst_cip15.encryptedKey && (accountSettings.value.catalyst_cip15.minVersion ?? 0) >= 10);
  const catalystData = computed(() => accountSettings.value?.catalyst_cip15.encryptedKey ?? null);
  const accountBalance = computed(() => accountData.value?.balance ?? null);
  const accountTotal = computed(() => accountBalance.value?.total ?? "0");
  const accountLovelace = computed(() => accountBalance.value?.coin ?? "0");
  const accountRewards = computed(() => accountBalance.value?.rewards ?? "0");
  const accountAssets = computed(() => accountBalance.value?.multiasset ?? null);
  const adaHandleList = computed(() => {
    const multiasset = accountAssets.value;
    if (!multiasset) {
      return void 0;
    }
    const policy = multiasset[adaHandle];
    if (!policy) {
      return void 0;
    }
    const keys = Object.keys(policy);
    keys.sort((a, b) => {
      if (a.length > b.length) return 1;
      if (a.length < b.length) return -1;
      return a.localeCompare(b, "en-US");
    });
    const list = [];
    for (const key in policy) {
      list.push({ [adaHandle]: { [key]: policy[key] } });
    }
    return list;
  });
  const _selectedAdaHandle = computed(() => {
    const _adaHandleList = adaHandleList.value;
    if (_adahandle.value === null) {
      return void 0;
    }
    if (!_adaHandleList) {
      return void 0;
    }
    if (_adaHandleList.length === 0) {
      return void 0;
    }
    let handle = _adaHandleList[0];
    for (const _handle of _adaHandleList) {
      if (Object.keys(_handle[adaHandle])[0] === _adahandle.value) {
        handle = _handle;
        break;
      }
    }
    return handle ?? void 0;
  });
  computed(() => {
    if (!_selectedAdaHandle.value) {
      return void 0;
    }
    return Object.keys(_selectedAdaHandle.value[adaHandle])[0] ?? void 0;
  });
  const rewardInfo = computed(() => accountData.value?.rewardInfoList[0] ?? null);
  const isRegistered = computed(() => rewardInfo.value?.registered ?? false);
  const hasStakeHistory = computed(() => (rewardInfo.value?.rewardList.length ?? 0) > 0);
  const stakeKey = computed(() => !!accountData.value && accountData.value.keys.stake.length > 0 ? accountData.value.keys.stake[0] : null);
  const stakeKeyPath = computed(() => stakeKey.value?.path ? getDerivationPath(stakeKey.value.path) : "");
  const hasUTxOs = computed(() => compare(accountLovelace.value, ">", 0));
  const hasRewards = computed(() => compare(accountRewards.value, ">", 0));
  const updateSAMAddress = (addr) => updateAppAccountSetting(appAccountRef.value, { sam: { addr } });
  const free = [];
  const changeAddress = computed(() => {
    if (!accountData.value) {
      return null;
    }
    if (accountData.value.keys.payment.length === 0) {
      return null;
    }
    !!samAddr.value || isSamEnabled.value;
    freeCSLObjects(free);
    try {
      return getChangeAddress(accountData.value, false, false, false, false, free);
    } catch (err) {
      if (err === AccountError.wrongCustomAddress) {
        updateSAMAddress(null);
      }
    }
    return null;
  });
  const receiveAddress = computed(() => {
    if (!accountData.value) {
      return null;
    }
    if (accountData.value.keys.payment.length === 0) {
      return null;
    }
    !!samAddr.value || isSamEnabled.value;
    try {
      return getReceiveAddress(accountData.value);
    } catch (err) {
      if (err === AccountError.wrongCustomAddress) {
        updateSAMAddress(null);
      }
    }
    return null;
  });
  const forcedUnusedAddress = computed(() => {
    if (!accountData.value) {
      return null;
    }
    if (accountData.value.keys.payment.length === 0) {
      return null;
    }
    !!samAddr.value || isSamEnabled.value;
    try {
      return getForcedUnusedAddress(accountData.value);
    } catch (err) {
    }
    return null;
  });
  const stakeAddress = computed(() => {
    if (!accountData.value) {
      return null;
    }
    if (accountData.value.keys.stake.length === 0) {
      return null;
    }
    !!samAddr.value || isSamEnabled.value;
    return getStakeAddress(accountData.value);
  });
  const _adaHandle = useAdaHandle(_selectedAdaHandle);
  const stakedPool = computed(() => {
    if (!rewardInfo.value) {
      return null;
    }
    if (!poolDataList.value) {
      return null;
    }
    if (!rewardInfo.value.registered) {
      return null;
    }
    const delegationList = rewardInfo.value?.delegationList;
    if (!delegationList) {
      return null;
    }
    const delegationListLength = delegationList.length - 1;
    const latestDelegation = delegationList[delegationListLength];
    return poolDataList.value.find((pool) => pool.pb === latestDelegation?.poolHash?.bech32);
  });
  const rewardHistory = computed(() => {
    const items = [];
    const rewardList = rewardInfo.value?.rewardList;
    if (!rewardList) {
      return items;
    }
    for (const rewards of rewardList) {
      const poolItem = JSON.parse(JSON.stringify(getPoolInfo(rewards.poolHash.bech32) ?? {}));
      poolItem.epoch = rewards.epochEarned;
      poolItem.amount = rewards.amount;
      poolItem.ada = divide(rewards.amount, getNetworkDecimals(accountNetworkId.value));
      items.push(poolItem);
    }
    items.pop();
    items.reverse();
    return items;
  });
  const isNameSet = computed(() => {
    const data = accountData.value;
    if (!!data && isMultiSigAccountPath(data?.account)) {
      return true;
    } else if (data?.settings.name) {
      return true;
    }
    return false;
  });
  const name = computed(() => {
    const data = accountData.value;
    if (!!data && isMultiSigAccountPath(data?.account)) {
      return "Multi-Sig";
    } else if (data?.settings.name) {
      return data?.settings.name;
    }
    return "Account #" + (data?.keys.index ?? "0");
  });
  const nameShort = computed(() => {
    const data = accountData.value;
    return "#" + (data?.keys.index ?? "0");
  });
  return {
    saving: saving$1,
    data: accountData,
    utxoMap: accountUtxoMap,
    rewardInfo,
    isRegistered,
    hasStakeHistory,
    stakeKey,
    stakeKeyPath,
    stakedPool,
    rewardHistory,
    accountNetworkId,
    path: accountPath,
    isSyncing: isAccountSyncing,
    accountSyncInfo,
    isAumEnabled,
    isAwEnabled,
    isCollateralEnabled,
    useEternlCollateral,
    isTfEnabled,
    tfBundleSize,
    isSamEnabled,
    samAddr,
    isManualSyncEnabled,
    isHistorySyncEnabled,
    isSendAllEnabled,
    isFavorite,
    hasCatalystData,
    catalystData,
    isNameSet,
    name,
    nameShort,
    balance: accountBalance,
    total: accountTotal,
    lovelace: accountLovelace,
    rewards: accountRewards,
    assets: accountAssets,
    adaHandle: _adaHandle,
    adaHandleList,
    hasUTxOs,
    hasRewards,
    changeAddress,
    receiveAddress,
    forcedUnusedAddress,
    stakeAddress,
    toggleAUM: () => updateAppAccountSetting(appAccountRef.value, { aum: { enabled: !isAumEnabled.value } }),
    toggleAW: () => updateAppAccountSetting(appAccountRef.value, { aw: { enabled: !isAwEnabled.value } }),
    toggleCollateral: () => updateAppAccountSetting(appAccountRef.value, { collateral: { enabled: !isCollateralEnabled.value } }),
    toggleEternlCollateral: () => updateAppAccountSetting(appAccountRef.value, { collateral: { eternl: !useEternlCollateral.value } }),
    toggleManualSync: () => updateAppAccountSetting(appAccountRef.value, { manualSync: { enabled: !isManualSyncEnabled.value } }),
    toggleHistorySync: () => updateAppAccountSetting(appAccountRef.value, { historySync: { enabled: !isHistorySyncEnabled.value } }),
    enableHistorySync: () => updateAppAccountSetting(appAccountRef.value, { historySync: { enabled: true } }),
    disableHistorySync: () => updateAppAccountSetting(appAccountRef.value, { historySync: { enabled: false } }),
    toggleSendAll: () => updateAppAccountSetting(appAccountRef.value, { sendAll: { enabled: !isSendAllEnabled.value } }),
    toggleFavorite: () => updateAppAccountSetting(appAccountRef.value, { favorite: { enabled: !isFavorite.value } }),
    toggleTF: () => updateAppAccountSetting(appAccountRef.value, { tf: { enabled: !isTfEnabled.value } }),
    toggleSAM: () => updateAppAccountSetting(appAccountRef.value, { sam: { enabled: !isSamEnabled.value } }),
    updateTFBundleSize: (bundleSize) => updateAppAccountSetting(appAccountRef.value, { tf: { enabled: true, bundleSize } }),
    updateSAMAddress,
    updateAccountName: (name2) => updateAppAccountSetting(appAccountRef.value, { name: name2 }),
    updateSelectedAdaHandle: (hexName) => updateAppAccountSetting(appAccountRef.value, { adahandle: hexName }),
    setCatalystCIP15Key: (key) => updateAppAccountSetting(appAccountRef.value, { catalyst_cip15: { encryptedKey: key, minVersion: 10 } })
  };
}

let _appAccount = ref(null);
let _appWallet = ref(null);
const appAccount = computed(() => _appAccount.value);
const appWallet = computed(() => _appWallet.value);

function useAppWallet(walletId) {
  const appWalletRef = ref(null);
  let toid = -1;
  const updateRef = () => {
    clearTimeout(toid);
    if (walletId.value) {
      let maybeAppWallet = appWallet.value;
      if (!maybeAppWallet || maybeAppWallet.id !== walletId.value) {
        maybeAppWallet = null;
      }
      appWalletRef.value = maybeAppWallet ?? getIAppWallet(walletId.value);
      if (!appWalletRef.value) {
        toid = setTimeout(updateRef, 250);
      }
    } else {
      appWalletRef.value = null;
    }
  };
  watch(walletId, () => {
    updateRef();
  }, { immediate: true });
  return appWalletRef;
}

function useAppAccount(appWalletRef, accountId) {
  const appAccountRef = ref(null);
  const updateRefs = () => {
    if (appWalletRef.value && accountId.value) {
      let maybeAppAccount = appAccount.value;
      if (!maybeAppAccount || maybeAppAccount.id !== accountId.value) {
        maybeAppAccount = null;
      }
      const newAppAccount = maybeAppAccount ?? getIAppAccount(accountId.value, appWalletRef.value.id);
      if (appAccountRef.value !== newAppAccount) {
        appAccountRef.value = newAppAccount;
      }
    } else {
      if (appAccountRef.value !== null) {
        appAccountRef.value = null;
      }
    }
  };
  watch(() => appWalletRef.value?.accountList.length, () => {
    updateRefs();
  });
  watch(accountId, () => {
    updateRefs();
  }, { immediate: true });
  return appAccountRef;
}

const updateIWalletSettingsPartial = (obj, ref) => {
  if (obj.id !== ref.id || obj.networkId !== ref.networkId) {
    throw DataError.updateIWalletSettingsIfNeeded;
  }
  if (ref.hasOwnProperty("name") && obj.name !== ref.name) {
    obj.name = ref.name;
  }
  if (ref.hasOwnProperty("groupName") && obj.groupName !== ref.groupName) {
    obj.groupName = ref.groupName;
  }
  if (ref.hasOwnProperty("description") && obj.description !== ref.description) {
    obj.description = ref.description;
  }
  if (ref.hasOwnProperty("useBiometrics") && obj.useBiometrics !== ref.useBiometrics) {
    obj.useBiometrics = ref.useBiometrics;
  }
  if (ref.plate?.hasOwnProperty("checksum") && obj.plate.checksum !== ref.plate.checksum) {
    obj.plate.checksum = ref.plate.checksum;
  }
  if (ref.plate?.hasOwnProperty("image") && obj.plate.image !== ref.plate.image) {
    obj.plate.image = ref.plate.image;
  }
  if (ref.plate?.hasOwnProperty("data") && obj.plate.data !== ref.plate.data) {
    obj.plate.data = ref.plate.data;
  }
  if (ref.background?.hasOwnProperty("policy") && obj.background.policy !== ref.background.policy) {
    obj.background.policy = ref.background.policy;
  }
  if (ref.background?.hasOwnProperty("name") && obj.background.name !== ref.background.name) {
    obj.background.name = ref.background.name;
  }
  if (ref.background?.hasOwnProperty("opacity") && obj.background.opacity !== ref.background.opacity) {
    obj.background.opacity = ref.background.opacity ?? 100;
  }
  return obj;
};

var cip4Js = {};

var blake2b$1 = {exports: {}};

var nanoassert;
var hasRequiredNanoassert;

function requireNanoassert () {
	if (hasRequiredNanoassert) return nanoassert;
	hasRequiredNanoassert = 1;
	assert.notEqual = notEqual;
	assert.notOk = notOk;
	assert.equal = equal;
	assert.ok = assert;

	nanoassert = assert;

	function equal (a, b, m) {
	  assert(a == b, m); // eslint-disable-line eqeqeq
	}

	function notEqual (a, b, m) {
	  assert(a != b, m); // eslint-disable-line eqeqeq
	}

	function notOk (t, m) {
	  assert(!t, m);
	}

	function assert (t, m) {
	  if (!t) throw new Error(m || 'AssertionError')
	}
	return nanoassert;
}

var blake2bWasm = {exports: {}};

function commonjsRequire(path) {
	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}

var blake2b;
var hasRequiredBlake2b$1;

function requireBlake2b$1 () {
	if (hasRequiredBlake2b$1) return blake2b;
	hasRequiredBlake2b$1 = 1;
	blake2b = loadWebAssembly;

	loadWebAssembly.supported = typeof WebAssembly !== 'undefined';

	function loadWebAssembly (opts) {
	  if (!loadWebAssembly.supported) return null

	  var imp = opts && opts.imports;
	  var wasm = toUint8Array('AGFzbQEAAAABEANgAn9/AGADf39/AGABfwADBQQAAQICBQUBAQroBwdNBQZtZW1vcnkCAAxibGFrZTJiX2luaXQAAA5ibGFrZTJiX3VwZGF0ZQABDWJsYWtlMmJfZmluYWwAAhBibGFrZTJiX2NvbXByZXNzAAMK00AElgMAIABCADcDACAAQQhqQgA3AwAgAEEQakIANwMAIABBGGpCADcDACAAQSBqQgA3AwAgAEEoakIANwMAIABBMGpCADcDACAAQThqQgA3AwAgAEHAAGpCADcDACAAQcgAakIANwMAIABB0ABqQgA3AwAgAEHYAGpCADcDACAAQeAAakIANwMAIABB6ABqQgA3AwAgAEHwAGpCADcDACAAQfgAakIANwMAIABBgAFqQoiS853/zPmE6gBBACkDAIU3AwAgAEGIAWpCu86qptjQ67O7f0EIKQMAhTcDACAAQZABakKr8NP0r+68tzxBECkDAIU3AwAgAEGYAWpC8e30+KWn/aelf0EYKQMAhTcDACAAQaABakLRhZrv+s+Uh9EAQSApAwCFNwMAIABBqAFqQp/Y+dnCkdqCm39BKCkDAIU3AwAgAEGwAWpC6/qG2r+19sEfQTApAwCFNwMAIABBuAFqQvnC+JuRo7Pw2wBBOCkDAIU3AwAgAEHAAWpCADcDACAAQcgBakIANwMAIABB0AFqQgA3AwALbQEDfyAAQcABaiEDIABByAFqIQQgBCkDAKchBQJAA0AgASACRg0BIAVBgAFGBEAgAyADKQMAIAWtfDcDAEEAIQUgABADCyAAIAVqIAEtAAA6AAAgBUEBaiEFIAFBAWohAQwACwsgBCAFrTcDAAtkAQN/IABBwAFqIQEgAEHIAWohAiABIAEpAwAgAikDAHw3AwAgAEHQAWpCfzcDACACKQMApyEDAkADQCADQYABRg0BIAAgA2pBADoAACADQQFqIQMMAAsLIAIgA603AwAgABADC+U7AiB+CX8gAEGAAWohISAAQYgBaiEiIABBkAFqISMgAEGYAWohJCAAQaABaiElIABBqAFqISYgAEGwAWohJyAAQbgBaiEoICEpAwAhASAiKQMAIQIgIykDACEDICQpAwAhBCAlKQMAIQUgJikDACEGICcpAwAhByAoKQMAIQhCiJLznf/M+YTqACEJQrvOqqbY0Ouzu38hCkKr8NP0r+68tzwhC0Lx7fT4paf9p6V/IQxC0YWa7/rPlIfRACENQp/Y+dnCkdqCm38hDkLr+obav7X2wR8hD0L5wvibkaOz8NsAIRAgACkDACERIABBCGopAwAhEiAAQRBqKQMAIRMgAEEYaikDACEUIABBIGopAwAhFSAAQShqKQMAIRYgAEEwaikDACEXIABBOGopAwAhGCAAQcAAaikDACEZIABByABqKQMAIRogAEHQAGopAwAhGyAAQdgAaikDACEcIABB4ABqKQMAIR0gAEHoAGopAwAhHiAAQfAAaikDACEfIABB+ABqKQMAISAgDSAAQcABaikDAIUhDSAPIABB0AFqKQMAhSEPIAEgBSARfHwhASANIAGFQiCKIQ0gCSANfCEJIAUgCYVCGIohBSABIAUgEnx8IQEgDSABhUIQiiENIAkgDXwhCSAFIAmFQj+KIQUgAiAGIBN8fCECIA4gAoVCIIohDiAKIA58IQogBiAKhUIYiiEGIAIgBiAUfHwhAiAOIAKFQhCKIQ4gCiAOfCEKIAYgCoVCP4ohBiADIAcgFXx8IQMgDyADhUIgiiEPIAsgD3whCyAHIAuFQhiKIQcgAyAHIBZ8fCEDIA8gA4VCEIohDyALIA98IQsgByALhUI/iiEHIAQgCCAXfHwhBCAQIASFQiCKIRAgDCAQfCEMIAggDIVCGIohCCAEIAggGHx8IQQgECAEhUIQiiEQIAwgEHwhDCAIIAyFQj+KIQggASAGIBl8fCEBIBAgAYVCIIohECALIBB8IQsgBiALhUIYiiEGIAEgBiAafHwhASAQIAGFQhCKIRAgCyAQfCELIAYgC4VCP4ohBiACIAcgG3x8IQIgDSAChUIgiiENIAwgDXwhDCAHIAyFQhiKIQcgAiAHIBx8fCECIA0gAoVCEIohDSAMIA18IQwgByAMhUI/iiEHIAMgCCAdfHwhAyAOIAOFQiCKIQ4gCSAOfCEJIAggCYVCGIohCCADIAggHnx8IQMgDiADhUIQiiEOIAkgDnwhCSAIIAmFQj+KIQggBCAFIB98fCEEIA8gBIVCIIohDyAKIA98IQogBSAKhUIYiiEFIAQgBSAgfHwhBCAPIASFQhCKIQ8gCiAPfCEKIAUgCoVCP4ohBSABIAUgH3x8IQEgDSABhUIgiiENIAkgDXwhCSAFIAmFQhiKIQUgASAFIBt8fCEBIA0gAYVCEIohDSAJIA18IQkgBSAJhUI/iiEFIAIgBiAVfHwhAiAOIAKFQiCKIQ4gCiAOfCEKIAYgCoVCGIohBiACIAYgGXx8IQIgDiAChUIQiiEOIAogDnwhCiAGIAqFQj+KIQYgAyAHIBp8fCEDIA8gA4VCIIohDyALIA98IQsgByALhUIYiiEHIAMgByAgfHwhAyAPIAOFQhCKIQ8gCyAPfCELIAcgC4VCP4ohByAEIAggHnx8IQQgECAEhUIgiiEQIAwgEHwhDCAIIAyFQhiKIQggBCAIIBd8fCEEIBAgBIVCEIohECAMIBB8IQwgCCAMhUI/iiEIIAEgBiASfHwhASAQIAGFQiCKIRAgCyAQfCELIAYgC4VCGIohBiABIAYgHXx8IQEgECABhUIQiiEQIAsgEHwhCyAGIAuFQj+KIQYgAiAHIBF8fCECIA0gAoVCIIohDSAMIA18IQwgByAMhUIYiiEHIAIgByATfHwhAiANIAKFQhCKIQ0gDCANfCEMIAcgDIVCP4ohByADIAggHHx8IQMgDiADhUIgiiEOIAkgDnwhCSAIIAmFQhiKIQggAyAIIBh8fCEDIA4gA4VCEIohDiAJIA58IQkgCCAJhUI/iiEIIAQgBSAWfHwhBCAPIASFQiCKIQ8gCiAPfCEKIAUgCoVCGIohBSAEIAUgFHx8IQQgDyAEhUIQiiEPIAogD3whCiAFIAqFQj+KIQUgASAFIBx8fCEBIA0gAYVCIIohDSAJIA18IQkgBSAJhUIYiiEFIAEgBSAZfHwhASANIAGFQhCKIQ0gCSANfCEJIAUgCYVCP4ohBSACIAYgHXx8IQIgDiAChUIgiiEOIAogDnwhCiAGIAqFQhiKIQYgAiAGIBF8fCECIA4gAoVCEIohDiAKIA58IQogBiAKhUI/iiEGIAMgByAWfHwhAyAPIAOFQiCKIQ8gCyAPfCELIAcgC4VCGIohByADIAcgE3x8IQMgDyADhUIQiiEPIAsgD3whCyAHIAuFQj+KIQcgBCAIICB8fCEEIBAgBIVCIIohECAMIBB8IQwgCCAMhUIYiiEIIAQgCCAefHwhBCAQIASFQhCKIRAgDCAQfCEMIAggDIVCP4ohCCABIAYgG3x8IQEgECABhUIgiiEQIAsgEHwhCyAGIAuFQhiKIQYgASAGIB98fCEBIBAgAYVCEIohECALIBB8IQsgBiALhUI/iiEGIAIgByAUfHwhAiANIAKFQiCKIQ0gDCANfCEMIAcgDIVCGIohByACIAcgF3x8IQIgDSAChUIQiiENIAwgDXwhDCAHIAyFQj+KIQcgAyAIIBh8fCEDIA4gA4VCIIohDiAJIA58IQkgCCAJhUIYiiEIIAMgCCASfHwhAyAOIAOFQhCKIQ4gCSAOfCEJIAggCYVCP4ohCCAEIAUgGnx8IQQgDyAEhUIgiiEPIAogD3whCiAFIAqFQhiKIQUgBCAFIBV8fCEEIA8gBIVCEIohDyAKIA98IQogBSAKhUI/iiEFIAEgBSAYfHwhASANIAGFQiCKIQ0gCSANfCEJIAUgCYVCGIohBSABIAUgGnx8IQEgDSABhUIQiiENIAkgDXwhCSAFIAmFQj+KIQUgAiAGIBR8fCECIA4gAoVCIIohDiAKIA58IQogBiAKhUIYiiEGIAIgBiASfHwhAiAOIAKFQhCKIQ4gCiAOfCEKIAYgCoVCP4ohBiADIAcgHnx8IQMgDyADhUIgiiEPIAsgD3whCyAHIAuFQhiKIQcgAyAHIB18fCEDIA8gA4VCEIohDyALIA98IQsgByALhUI/iiEHIAQgCCAcfHwhBCAQIASFQiCKIRAgDCAQfCEMIAggDIVCGIohCCAEIAggH3x8IQQgECAEhUIQiiEQIAwgEHwhDCAIIAyFQj+KIQggASAGIBN8fCEBIBAgAYVCIIohECALIBB8IQsgBiALhUIYiiEGIAEgBiAXfHwhASAQIAGFQhCKIRAgCyAQfCELIAYgC4VCP4ohBiACIAcgFnx8IQIgDSAChUIgiiENIAwgDXwhDCAHIAyFQhiKIQcgAiAHIBt8fCECIA0gAoVCEIohDSAMIA18IQwgByAMhUI/iiEHIAMgCCAVfHwhAyAOIAOFQiCKIQ4gCSAOfCEJIAggCYVCGIohCCADIAggEXx8IQMgDiADhUIQiiEOIAkgDnwhCSAIIAmFQj+KIQggBCAFICB8fCEEIA8gBIVCIIohDyAKIA98IQogBSAKhUIYiiEFIAQgBSAZfHwhBCAPIASFQhCKIQ8gCiAPfCEKIAUgCoVCP4ohBSABIAUgGnx8IQEgDSABhUIgiiENIAkgDXwhCSAFIAmFQhiKIQUgASAFIBF8fCEBIA0gAYVCEIohDSAJIA18IQkgBSAJhUI/iiEFIAIgBiAWfHwhAiAOIAKFQiCKIQ4gCiAOfCEKIAYgCoVCGIohBiACIAYgGHx8IQIgDiAChUIQiiEOIAogDnwhCiAGIAqFQj+KIQYgAyAHIBN8fCEDIA8gA4VCIIohDyALIA98IQsgByALhUIYiiEHIAMgByAVfHwhAyAPIAOFQhCKIQ8gCyAPfCELIAcgC4VCP4ohByAEIAggG3x8IQQgECAEhUIgiiEQIAwgEHwhDCAIIAyFQhiKIQggBCAIICB8fCEEIBAgBIVCEIohECAMIBB8IQwgCCAMhUI/iiEIIAEgBiAffHwhASAQIAGFQiCKIRAgCyAQfCELIAYgC4VCGIohBiABIAYgEnx8IQEgECABhUIQiiEQIAsgEHwhCyAGIAuFQj+KIQYgAiAHIBx8fCECIA0gAoVCIIohDSAMIA18IQwgByAMhUIYiiEHIAIgByAdfHwhAiANIAKFQhCKIQ0gDCANfCEMIAcgDIVCP4ohByADIAggF3x8IQMgDiADhUIgiiEOIAkgDnwhCSAIIAmFQhiKIQggAyAIIBl8fCEDIA4gA4VCEIohDiAJIA58IQkgCCAJhUI/iiEIIAQgBSAUfHwhBCAPIASFQiCKIQ8gCiAPfCEKIAUgCoVCGIohBSAEIAUgHnx8IQQgDyAEhUIQiiEPIAogD3whCiAFIAqFQj+KIQUgASAFIBN8fCEBIA0gAYVCIIohDSAJIA18IQkgBSAJhUIYiiEFIAEgBSAdfHwhASANIAGFQhCKIQ0gCSANfCEJIAUgCYVCP4ohBSACIAYgF3x8IQIgDiAChUIgiiEOIAogDnwhCiAGIAqFQhiKIQYgAiAGIBt8fCECIA4gAoVCEIohDiAKIA58IQogBiAKhUI/iiEGIAMgByARfHwhAyAPIAOFQiCKIQ8gCyAPfCELIAcgC4VCGIohByADIAcgHHx8IQMgDyADhUIQiiEPIAsgD3whCyAHIAuFQj+KIQcgBCAIIBl8fCEEIBAgBIVCIIohECAMIBB8IQwgCCAMhUIYiiEIIAQgCCAUfHwhBCAQIASFQhCKIRAgDCAQfCEMIAggDIVCP4ohCCABIAYgFXx8IQEgECABhUIgiiEQIAsgEHwhCyAGIAuFQhiKIQYgASAGIB58fCEBIBAgAYVCEIohECALIBB8IQsgBiALhUI/iiEGIAIgByAYfHwhAiANIAKFQiCKIQ0gDCANfCEMIAcgDIVCGIohByACIAcgFnx8IQIgDSAChUIQiiENIAwgDXwhDCAHIAyFQj+KIQcgAyAIICB8fCEDIA4gA4VCIIohDiAJIA58IQkgCCAJhUIYiiEIIAMgCCAffHwhAyAOIAOFQhCKIQ4gCSAOfCEJIAggCYVCP4ohCCAEIAUgEnx8IQQgDyAEhUIgiiEPIAogD3whCiAFIAqFQhiKIQUgBCAFIBp8fCEEIA8gBIVCEIohDyAKIA98IQogBSAKhUI/iiEFIAEgBSAdfHwhASANIAGFQiCKIQ0gCSANfCEJIAUgCYVCGIohBSABIAUgFnx8IQEgDSABhUIQiiENIAkgDXwhCSAFIAmFQj+KIQUgAiAGIBJ8fCECIA4gAoVCIIohDiAKIA58IQogBiAKhUIYiiEGIAIgBiAgfHwhAiAOIAKFQhCKIQ4gCiAOfCEKIAYgCoVCP4ohBiADIAcgH3x8IQMgDyADhUIgiiEPIAsgD3whCyAHIAuFQhiKIQcgAyAHIB58fCEDIA8gA4VCEIohDyALIA98IQsgByALhUI/iiEHIAQgCCAVfHwhBCAQIASFQiCKIRAgDCAQfCEMIAggDIVCGIohCCAEIAggG3x8IQQgECAEhUIQiiEQIAwgEHwhDCAIIAyFQj+KIQggASAGIBF8fCEBIBAgAYVCIIohECALIBB8IQsgBiALhUIYiiEGIAEgBiAYfHwhASAQIAGFQhCKIRAgCyAQfCELIAYgC4VCP4ohBiACIAcgF3x8IQIgDSAChUIgiiENIAwgDXwhDCAHIAyFQhiKIQcgAiAHIBR8fCECIA0gAoVCEIohDSAMIA18IQwgByAMhUI/iiEHIAMgCCAafHwhAyAOIAOFQiCKIQ4gCSAOfCEJIAggCYVCGIohCCADIAggE3x8IQMgDiADhUIQiiEOIAkgDnwhCSAIIAmFQj+KIQggBCAFIBl8fCEEIA8gBIVCIIohDyAKIA98IQogBSAKhUIYiiEFIAQgBSAcfHwhBCAPIASFQhCKIQ8gCiAPfCEKIAUgCoVCP4ohBSABIAUgHnx8IQEgDSABhUIgiiENIAkgDXwhCSAFIAmFQhiKIQUgASAFIBx8fCEBIA0gAYVCEIohDSAJIA18IQkgBSAJhUI/iiEFIAIgBiAYfHwhAiAOIAKFQiCKIQ4gCiAOfCEKIAYgCoVCGIohBiACIAYgH3x8IQIgDiAChUIQiiEOIAogDnwhCiAGIAqFQj+KIQYgAyAHIB18fCEDIA8gA4VCIIohDyALIA98IQsgByALhUIYiiEHIAMgByASfHwhAyAPIAOFQhCKIQ8gCyAPfCELIAcgC4VCP4ohByAEIAggFHx8IQQgECAEhUIgiiEQIAwgEHwhDCAIIAyFQhiKIQggBCAIIBp8fCEEIBAgBIVCEIohECAMIBB8IQwgCCAMhUI/iiEIIAEgBiAWfHwhASAQIAGFQiCKIRAgCyAQfCELIAYgC4VCGIohBiABIAYgEXx8IQEgECABhUIQiiEQIAsgEHwhCyAGIAuFQj+KIQYgAiAHICB8fCECIA0gAoVCIIohDSAMIA18IQwgByAMhUIYiiEHIAIgByAVfHwhAiANIAKFQhCKIQ0gDCANfCEMIAcgDIVCP4ohByADIAggGXx8IQMgDiADhUIgiiEOIAkgDnwhCSAIIAmFQhiKIQggAyAIIBd8fCEDIA4gA4VCEIohDiAJIA58IQkgCCAJhUI/iiEIIAQgBSATfHwhBCAPIASFQiCKIQ8gCiAPfCEKIAUgCoVCGIohBSAEIAUgG3x8IQQgDyAEhUIQiiEPIAogD3whCiAFIAqFQj+KIQUgASAFIBd8fCEBIA0gAYVCIIohDSAJIA18IQkgBSAJhUIYiiEFIAEgBSAgfHwhASANIAGFQhCKIQ0gCSANfCEJIAUgCYVCP4ohBSACIAYgH3x8IQIgDiAChUIgiiEOIAogDnwhCiAGIAqFQhiKIQYgAiAGIBp8fCECIA4gAoVCEIohDiAKIA58IQogBiAKhUI/iiEGIAMgByAcfHwhAyAPIAOFQiCKIQ8gCyAPfCELIAcgC4VCGIohByADIAcgFHx8IQMgDyADhUIQiiEPIAsgD3whCyAHIAuFQj+KIQcgBCAIIBF8fCEEIBAgBIVCIIohECAMIBB8IQwgCCAMhUIYiiEIIAQgCCAZfHwhBCAQIASFQhCKIRAgDCAQfCEMIAggDIVCP4ohCCABIAYgHXx8IQEgECABhUIgiiEQIAsgEHwhCyAGIAuFQhiKIQYgASAGIBN8fCEBIBAgAYVCEIohECALIBB8IQsgBiALhUI/iiEGIAIgByAefHwhAiANIAKFQiCKIQ0gDCANfCEMIAcgDIVCGIohByACIAcgGHx8IQIgDSAChUIQiiENIAwgDXwhDCAHIAyFQj+KIQcgAyAIIBJ8fCEDIA4gA4VCIIohDiAJIA58IQkgCCAJhUIYiiEIIAMgCCAVfHwhAyAOIAOFQhCKIQ4gCSAOfCEJIAggCYVCP4ohCCAEIAUgG3x8IQQgDyAEhUIgiiEPIAogD3whCiAFIAqFQhiKIQUgBCAFIBZ8fCEEIA8gBIVCEIohDyAKIA98IQogBSAKhUI/iiEFIAEgBSAbfHwhASANIAGFQiCKIQ0gCSANfCEJIAUgCYVCGIohBSABIAUgE3x8IQEgDSABhUIQiiENIAkgDXwhCSAFIAmFQj+KIQUgAiAGIBl8fCECIA4gAoVCIIohDiAKIA58IQogBiAKhUIYiiEGIAIgBiAVfHwhAiAOIAKFQhCKIQ4gCiAOfCEKIAYgCoVCP4ohBiADIAcgGHx8IQMgDyADhUIgiiEPIAsgD3whCyAHIAuFQhiKIQcgAyAHIBd8fCEDIA8gA4VCEIohDyALIA98IQsgByALhUI/iiEHIAQgCCASfHwhBCAQIASFQiCKIRAgDCAQfCEMIAggDIVCGIohCCAEIAggFnx8IQQgECAEhUIQiiEQIAwgEHwhDCAIIAyFQj+KIQggASAGICB8fCEBIBAgAYVCIIohECALIBB8IQsgBiALhUIYiiEGIAEgBiAcfHwhASAQIAGFQhCKIRAgCyAQfCELIAYgC4VCP4ohBiACIAcgGnx8IQIgDSAChUIgiiENIAwgDXwhDCAHIAyFQhiKIQcgAiAHIB98fCECIA0gAoVCEIohDSAMIA18IQwgByAMhUI/iiEHIAMgCCAUfHwhAyAOIAOFQiCKIQ4gCSAOfCEJIAggCYVCGIohCCADIAggHXx8IQMgDiADhUIQiiEOIAkgDnwhCSAIIAmFQj+KIQggBCAFIB58fCEEIA8gBIVCIIohDyAKIA98IQogBSAKhUIYiiEFIAQgBSARfHwhBCAPIASFQhCKIQ8gCiAPfCEKIAUgCoVCP4ohBSABIAUgEXx8IQEgDSABhUIgiiENIAkgDXwhCSAFIAmFQhiKIQUgASAFIBJ8fCEBIA0gAYVCEIohDSAJIA18IQkgBSAJhUI/iiEFIAIgBiATfHwhAiAOIAKFQiCKIQ4gCiAOfCEKIAYgCoVCGIohBiACIAYgFHx8IQIgDiAChUIQiiEOIAogDnwhCiAGIAqFQj+KIQYgAyAHIBV8fCEDIA8gA4VCIIohDyALIA98IQsgByALhUIYiiEHIAMgByAWfHwhAyAPIAOFQhCKIQ8gCyAPfCELIAcgC4VCP4ohByAEIAggF3x8IQQgECAEhUIgiiEQIAwgEHwhDCAIIAyFQhiKIQggBCAIIBh8fCEEIBAgBIVCEIohECAMIBB8IQwgCCAMhUI/iiEIIAEgBiAZfHwhASAQIAGFQiCKIRAgCyAQfCELIAYgC4VCGIohBiABIAYgGnx8IQEgECABhUIQiiEQIAsgEHwhCyAGIAuFQj+KIQYgAiAHIBt8fCECIA0gAoVCIIohDSAMIA18IQwgByAMhUIYiiEHIAIgByAcfHwhAiANIAKFQhCKIQ0gDCANfCEMIAcgDIVCP4ohByADIAggHXx8IQMgDiADhUIgiiEOIAkgDnwhCSAIIAmFQhiKIQggAyAIIB58fCEDIA4gA4VCEIohDiAJIA58IQkgCCAJhUI/iiEIIAQgBSAffHwhBCAPIASFQiCKIQ8gCiAPfCEKIAUgCoVCGIohBSAEIAUgIHx8IQQgDyAEhUIQiiEPIAogD3whCiAFIAqFQj+KIQUgASAFIB98fCEBIA0gAYVCIIohDSAJIA18IQkgBSAJhUIYiiEFIAEgBSAbfHwhASANIAGFQhCKIQ0gCSANfCEJIAUgCYVCP4ohBSACIAYgFXx8IQIgDiAChUIgiiEOIAogDnwhCiAGIAqFQhiKIQYgAiAGIBl8fCECIA4gAoVCEIohDiAKIA58IQogBiAKhUI/iiEGIAMgByAafHwhAyAPIAOFQiCKIQ8gCyAPfCELIAcgC4VCGIohByADIAcgIHx8IQMgDyADhUIQiiEPIAsgD3whCyAHIAuFQj+KIQcgBCAIIB58fCEEIBAgBIVCIIohECAMIBB8IQwgCCAMhUIYiiEIIAQgCCAXfHwhBCAQIASFQhCKIRAgDCAQfCEMIAggDIVCP4ohCCABIAYgEnx8IQEgECABhUIgiiEQIAsgEHwhCyAGIAuFQhiKIQYgASAGIB18fCEBIBAgAYVCEIohECALIBB8IQsgBiALhUI/iiEGIAIgByARfHwhAiANIAKFQiCKIQ0gDCANfCEMIAcgDIVCGIohByACIAcgE3x8IQIgDSAChUIQiiENIAwgDXwhDCAHIAyFQj+KIQcgAyAIIBx8fCEDIA4gA4VCIIohDiAJIA58IQkgCCAJhUIYiiEIIAMgCCAYfHwhAyAOIAOFQhCKIQ4gCSAOfCEJIAggCYVCP4ohCCAEIAUgFnx8IQQgDyAEhUIgiiEPIAogD3whCiAFIAqFQhiKIQUgBCAFIBR8fCEEIA8gBIVCEIohDyAKIA98IQogBSAKhUI/iiEFICEgISkDACABIAmFhTcDACAiICIpAwAgAiAKhYU3AwAgIyAjKQMAIAMgC4WFNwMAICQgJCkDACAEIAyFhTcDACAlICUpAwAgBSANhYU3AwAgJiAmKQMAIAYgDoWFNwMAICcgJykDACAHIA+FhTcDACAoICgpAwAgCCAQhYU3AwAL');
	  var ready = null;

	  var mod = {
	    buffer: wasm,
	    memory: null,
	    exports: null,
	    realloc: realloc,
	    onload: onload
	  };

	  onload(function () {});

	  return mod

	  function realloc (size) {
	    mod.exports.memory.grow(Math.ceil(Math.abs(size - mod.memory.length) / 65536));
	    mod.memory = new Uint8Array(mod.exports.memory.buffer);
	  }

	  function onload (cb) {
	    if (mod.exports) return cb()

	    if (ready) {
	      ready.then(cb.bind(null, null)).catch(cb);
	      return
	    }

	    try {
	      if (opts && opts.async) throw new Error('async')
	      setup({instance: new WebAssembly.Instance(new WebAssembly.Module(wasm), imp)});
	    } catch (err) {
	      ready = WebAssembly.instantiate(wasm, imp).then(setup);
	    }

	    onload(cb);
	  }

	  function setup (w) {
	    mod.exports = w.instance.exports;
	    mod.memory = mod.exports.memory && mod.exports.memory.buffer && new Uint8Array(mod.exports.memory.buffer);
	  }
	}

	function toUint8Array (s) {
	  if (typeof atob === 'function') return new Uint8Array(atob(s).split('').map(charCodeAt))
	  return new (commonjsRequire('buf' + 'fer').Buffer)(s, 'base64')
	}

	function charCodeAt (c) {
	  return c.charCodeAt(0)
	}
	return blake2b;
}

var hasRequiredBlake2bWasm;

function requireBlake2bWasm () {
	if (hasRequiredBlake2bWasm) return blake2bWasm.exports;
	hasRequiredBlake2bWasm = 1;
	var assert = requireNanoassert();
	var wasm = requireBlake2b$1()();

	var head = 64;
	var freeList = [];

	blake2bWasm.exports = Blake2b;
	var BYTES_MIN = blake2bWasm.exports.BYTES_MIN = 16;
	var BYTES_MAX = blake2bWasm.exports.BYTES_MAX = 64;
	blake2bWasm.exports.BYTES = 32;
	var KEYBYTES_MIN = blake2bWasm.exports.KEYBYTES_MIN = 16;
	var KEYBYTES_MAX = blake2bWasm.exports.KEYBYTES_MAX = 64;
	blake2bWasm.exports.KEYBYTES = 32;
	var SALTBYTES = blake2bWasm.exports.SALTBYTES = 16;
	var PERSONALBYTES = blake2bWasm.exports.PERSONALBYTES = 16;

	function Blake2b (digestLength, key, salt, personal, noAssert) {
	  if (!(this instanceof Blake2b)) return new Blake2b(digestLength, key, salt, personal, noAssert)
	  if (!(wasm && wasm.exports)) throw new Error('WASM not loaded. Wait for Blake2b.ready(cb)')
	  if (!digestLength) digestLength = 32;

	  if (noAssert !== true) {
	    assert(digestLength >= BYTES_MIN, 'digestLength must be at least ' + BYTES_MIN + ', was given ' + digestLength);
	    assert(digestLength <= BYTES_MAX, 'digestLength must be at most ' + BYTES_MAX + ', was given ' + digestLength);
	    if (key != null) assert(key.length >= KEYBYTES_MIN, 'key must be at least ' + KEYBYTES_MIN + ', was given ' + key.length);
	    if (key != null) assert(key.length <= KEYBYTES_MAX, 'key must be at least ' + KEYBYTES_MAX + ', was given ' + key.length);
	    if (salt != null) assert(salt.length === SALTBYTES, 'salt must be exactly ' + SALTBYTES + ', was given ' + salt.length);
	    if (personal != null) assert(personal.length === PERSONALBYTES, 'personal must be exactly ' + PERSONALBYTES + ', was given ' + personal.length);
	  }

	  if (!freeList.length) {
	    freeList.push(head);
	    head += 216;
	  }

	  this.digestLength = digestLength;
	  this.finalized = false;
	  this.pointer = freeList.pop();

	  wasm.memory.fill(0, 0, 64);
	  wasm.memory[0] = this.digestLength;
	  wasm.memory[1] = key ? key.length : 0;
	  wasm.memory[2] = 1; // fanout
	  wasm.memory[3] = 1; // depth

	  if (salt) wasm.memory.set(salt, 32);
	  if (personal) wasm.memory.set(personal, 48);

	  if (this.pointer + 216 > wasm.memory.length) wasm.realloc(this.pointer + 216); // we need 216 bytes for the state
	  wasm.exports.blake2b_init(this.pointer, this.digestLength);

	  if (key) {
	    this.update(key);
	    wasm.memory.fill(0, head, head + key.length); // whiteout key
	    wasm.memory[this.pointer + 200] = 128;
	  }
	}


	Blake2b.prototype.update = function (input) {
	  assert(this.finalized === false, 'Hash instance finalized');
	  assert(input, 'input must be TypedArray or Buffer');

	  if (head + input.length > wasm.memory.length) wasm.realloc(head + input.length);
	  wasm.memory.set(input, head);
	  wasm.exports.blake2b_update(this.pointer, head, head + input.length);
	  return this
	};

	Blake2b.prototype.digest = function (enc) {
	  assert(this.finalized === false, 'Hash instance finalized');
	  this.finalized = true;

	  freeList.push(this.pointer);
	  wasm.exports.blake2b_final(this.pointer);

	  if (!enc || enc === 'binary') {
	    return wasm.memory.slice(this.pointer + 128, this.pointer + 128 + this.digestLength)
	  }

	  if (enc === 'hex') {
	    return hexSlice(wasm.memory, this.pointer + 128, this.digestLength)
	  }

	  assert(enc.length >= this.digestLength, 'input must be TypedArray or Buffer');
	  for (var i = 0; i < this.digestLength; i++) {
	    enc[i] = wasm.memory[this.pointer + 128 + i];
	  }

	  return enc
	};

	// libsodium compat
	Blake2b.prototype.final = Blake2b.prototype.digest;

	Blake2b.WASM = wasm && wasm.buffer;
	Blake2b.SUPPORTED = typeof WebAssembly !== 'undefined';

	Blake2b.ready = function (cb) {
	  if (!cb) cb = noop;
	  if (!wasm) return cb(new Error('WebAssembly not supported'))

	  // backwards compat, can be removed in a new major
	  var p = new Promise(function (reject, resolve) {
	    wasm.onload(function (err) {
	      if (err) resolve();
	      else reject();
	      cb(err);
	    });
	  });

	  return p
	};

	Blake2b.prototype.ready = Blake2b.ready;

	function noop () {}

	function hexSlice (buf, start, len) {
	  var str = '';
	  for (var i = 0; i < len; i++) str += toHex(buf[start + i]);
	  return str
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}
	return blake2bWasm.exports;
}

var hasRequiredBlake2b;

function requireBlake2b () {
	if (hasRequiredBlake2b) return blake2b$1.exports;
	hasRequiredBlake2b = 1;
	var assert = requireNanoassert();
	var b2wasm = requireBlake2bWasm();

	// 64-bit unsigned addition
	// Sets v[a,a+1] += v[b,b+1]
	// v should be a Uint32Array
	function ADD64AA (v, a, b) {
	  var o0 = v[a] + v[b];
	  var o1 = v[a + 1] + v[b + 1];
	  if (o0 >= 0x100000000) {
	    o1++;
	  }
	  v[a] = o0;
	  v[a + 1] = o1;
	}

	// 64-bit unsigned addition
	// Sets v[a,a+1] += b
	// b0 is the low 32 bits of b, b1 represents the high 32 bits
	function ADD64AC (v, a, b0, b1) {
	  var o0 = v[a] + b0;
	  if (b0 < 0) {
	    o0 += 0x100000000;
	  }
	  var o1 = v[a + 1] + b1;
	  if (o0 >= 0x100000000) {
	    o1++;
	  }
	  v[a] = o0;
	  v[a + 1] = o1;
	}

	// Little-endian byte access
	function B2B_GET32 (arr, i) {
	  return (arr[i] ^
	  (arr[i + 1] << 8) ^
	  (arr[i + 2] << 16) ^
	  (arr[i + 3] << 24))
	}

	// G Mixing function
	// The ROTRs are inlined for speed
	function B2B_G (a, b, c, d, ix, iy) {
	  var x0 = m[ix];
	  var x1 = m[ix + 1];
	  var y0 = m[iy];
	  var y1 = m[iy + 1];

	  ADD64AA(v, a, b); // v[a,a+1] += v[b,b+1] ... in JS we must store a uint64 as two uint32s
	  ADD64AC(v, a, x0, x1); // v[a, a+1] += x ... x0 is the low 32 bits of x, x1 is the high 32 bits

	  // v[d,d+1] = (v[d,d+1] xor v[a,a+1]) rotated to the right by 32 bits
	  var xor0 = v[d] ^ v[a];
	  var xor1 = v[d + 1] ^ v[a + 1];
	  v[d] = xor1;
	  v[d + 1] = xor0;

	  ADD64AA(v, c, d);

	  // v[b,b+1] = (v[b,b+1] xor v[c,c+1]) rotated right by 24 bits
	  xor0 = v[b] ^ v[c];
	  xor1 = v[b + 1] ^ v[c + 1];
	  v[b] = (xor0 >>> 24) ^ (xor1 << 8);
	  v[b + 1] = (xor1 >>> 24) ^ (xor0 << 8);

	  ADD64AA(v, a, b);
	  ADD64AC(v, a, y0, y1);

	  // v[d,d+1] = (v[d,d+1] xor v[a,a+1]) rotated right by 16 bits
	  xor0 = v[d] ^ v[a];
	  xor1 = v[d + 1] ^ v[a + 1];
	  v[d] = (xor0 >>> 16) ^ (xor1 << 16);
	  v[d + 1] = (xor1 >>> 16) ^ (xor0 << 16);

	  ADD64AA(v, c, d);

	  // v[b,b+1] = (v[b,b+1] xor v[c,c+1]) rotated right by 63 bits
	  xor0 = v[b] ^ v[c];
	  xor1 = v[b + 1] ^ v[c + 1];
	  v[b] = (xor1 >>> 31) ^ (xor0 << 1);
	  v[b + 1] = (xor0 >>> 31) ^ (xor1 << 1);
	}

	// Initialization Vector
	var BLAKE2B_IV32 = new Uint32Array([
	  0xF3BCC908, 0x6A09E667, 0x84CAA73B, 0xBB67AE85,
	  0xFE94F82B, 0x3C6EF372, 0x5F1D36F1, 0xA54FF53A,
	  0xADE682D1, 0x510E527F, 0x2B3E6C1F, 0x9B05688C,
	  0xFB41BD6B, 0x1F83D9AB, 0x137E2179, 0x5BE0CD19
	]);

	var SIGMA8 = [
	  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
	  14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3,
	  11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4,
	  7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8,
	  9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13,
	  2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9,
	  12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11,
	  13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10,
	  6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5,
	  10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0,
	  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
	  14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3
	];

	// These are offsets into a uint64 buffer.
	// Multiply them all by 2 to make them offsets into a uint32 buffer,
	// because this is Javascript and we don't have uint64s
	var SIGMA82 = new Uint8Array(SIGMA8.map(function (x) { return x * 2 }));

	// Compression function. 'last' flag indicates last block.
	// Note we're representing 16 uint64s as 32 uint32s
	var v = new Uint32Array(32);
	var m = new Uint32Array(32);
	function blake2bCompress (ctx, last) {
	  var i = 0;

	  // init work variables
	  for (i = 0; i < 16; i++) {
	    v[i] = ctx.h[i];
	    v[i + 16] = BLAKE2B_IV32[i];
	  }

	  // low 64 bits of offset
	  v[24] = v[24] ^ ctx.t;
	  v[25] = v[25] ^ (ctx.t / 0x100000000);
	  // high 64 bits not supported, offset may not be higher than 2**53-1

	  // last block flag set ?
	  if (last) {
	    v[28] = ~v[28];
	    v[29] = ~v[29];
	  }

	  // get little-endian words
	  for (i = 0; i < 32; i++) {
	    m[i] = B2B_GET32(ctx.b, 4 * i);
	  }

	  // twelve rounds of mixing
	  for (i = 0; i < 12; i++) {
	    B2B_G(0, 8, 16, 24, SIGMA82[i * 16 + 0], SIGMA82[i * 16 + 1]);
	    B2B_G(2, 10, 18, 26, SIGMA82[i * 16 + 2], SIGMA82[i * 16 + 3]);
	    B2B_G(4, 12, 20, 28, SIGMA82[i * 16 + 4], SIGMA82[i * 16 + 5]);
	    B2B_G(6, 14, 22, 30, SIGMA82[i * 16 + 6], SIGMA82[i * 16 + 7]);
	    B2B_G(0, 10, 20, 30, SIGMA82[i * 16 + 8], SIGMA82[i * 16 + 9]);
	    B2B_G(2, 12, 22, 24, SIGMA82[i * 16 + 10], SIGMA82[i * 16 + 11]);
	    B2B_G(4, 14, 16, 26, SIGMA82[i * 16 + 12], SIGMA82[i * 16 + 13]);
	    B2B_G(6, 8, 18, 28, SIGMA82[i * 16 + 14], SIGMA82[i * 16 + 15]);
	  }

	  for (i = 0; i < 16; i++) {
	    ctx.h[i] = ctx.h[i] ^ v[i] ^ v[i + 16];
	  }
	}

	// reusable parameter_block
	var parameter_block = new Uint8Array([
	  0, 0, 0, 0,      //  0: outlen, keylen, fanout, depth
	  0, 0, 0, 0,      //  4: leaf length, sequential mode
	  0, 0, 0, 0,      //  8: node offset
	  0, 0, 0, 0,      // 12: node offset
	  0, 0, 0, 0,      // 16: node depth, inner length, rfu
	  0, 0, 0, 0,      // 20: rfu
	  0, 0, 0, 0,      // 24: rfu
	  0, 0, 0, 0,      // 28: rfu
	  0, 0, 0, 0,      // 32: salt
	  0, 0, 0, 0,      // 36: salt
	  0, 0, 0, 0,      // 40: salt
	  0, 0, 0, 0,      // 44: salt
	  0, 0, 0, 0,      // 48: personal
	  0, 0, 0, 0,      // 52: personal
	  0, 0, 0, 0,      // 56: personal
	  0, 0, 0, 0       // 60: personal
	]);

	// Creates a BLAKE2b hashing context
	// Requires an output length between 1 and 64 bytes
	// Takes an optional Uint8Array key
	function Blake2b (outlen, key, salt, personal) {
	  // zero out parameter_block before usage
	  parameter_block.fill(0);
	  // state, 'param block'

	  this.b = new Uint8Array(128);
	  this.h = new Uint32Array(16);
	  this.t = 0; // input count
	  this.c = 0; // pointer within buffer
	  this.outlen = outlen; // output length in bytes

	  parameter_block[0] = outlen;
	  if (key) parameter_block[1] = key.length;
	  parameter_block[2] = 1; // fanout
	  parameter_block[3] = 1; // depth

	  if (salt) parameter_block.set(salt, 32);
	  if (personal) parameter_block.set(personal, 48);

	  // initialize hash state
	  for (var i = 0; i < 16; i++) {
	    this.h[i] = BLAKE2B_IV32[i] ^ B2B_GET32(parameter_block, i * 4);
	  }

	  // key the hash, if applicable
	  if (key) {
	    blake2bUpdate(this, key);
	    // at the end
	    this.c = 128;
	  }
	}

	Blake2b.prototype.update = function (input) {
	  assert(input != null, 'input must be Uint8Array or Buffer');
	  blake2bUpdate(this, input);
	  return this
	};

	Blake2b.prototype.digest = function (out) {
	  var buf = (!out || out === 'binary' || out === 'hex') ? new Uint8Array(this.outlen) : out;
	  assert(buf.length >= this.outlen, 'out must have at least outlen bytes of space');
	  blake2bFinal(this, buf);
	  if (out === 'hex') return hexSlice(buf)
	  return buf
	};

	Blake2b.prototype.final = Blake2b.prototype.digest;

	Blake2b.ready = function (cb) {
	  b2wasm.ready(function () {
	    cb(); // ignore the error
	  });
	};

	// Updates a BLAKE2b streaming hash
	// Requires hash context and Uint8Array (byte array)
	function blake2bUpdate (ctx, input) {
	  for (var i = 0; i < input.length; i++) {
	    if (ctx.c === 128) { // buffer full ?
	      ctx.t += ctx.c; // add counters
	      blake2bCompress(ctx, false); // compress (not last)
	      ctx.c = 0; // counter to zero
	    }
	    ctx.b[ctx.c++] = input[i];
	  }
	}

	// Completes a BLAKE2b streaming hash
	// Returns a Uint8Array containing the message digest
	function blake2bFinal (ctx, out) {
	  ctx.t += ctx.c; // mark last block offset

	  while (ctx.c < 128) { // fill up with zeros
	    ctx.b[ctx.c++] = 0;
	  }
	  blake2bCompress(ctx, true); // final block flag = 1

	  for (var i = 0; i < ctx.outlen; i++) {
	    out[i] = ctx.h[i >> 2] >> (8 * (i & 3));
	  }
	  return out
	}

	function hexSlice (buf) {
	  var str = '';
	  for (var i = 0; i < buf.length; i++) str += toHex(buf[i]);
	  return str
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	var Proto = Blake2b;

	blake2b$1.exports = function createHash (outlen, key, salt, personal, noAssert) {
	  if (noAssert !== true) {
	    assert(outlen >= BYTES_MIN, 'outlen must be at least ' + BYTES_MIN + ', was given ' + outlen);
	    assert(outlen <= BYTES_MAX, 'outlen must be at most ' + BYTES_MAX + ', was given ' + outlen);
	    if (key != null) assert(key.length >= KEYBYTES_MIN, 'key must be at least ' + KEYBYTES_MIN + ', was given ' + key.length);
	    if (key != null) assert(key.length <= KEYBYTES_MAX, 'key must be at most ' + KEYBYTES_MAX + ', was given ' + key.length);
	    if (salt != null) assert(salt.length === SALTBYTES, 'salt must be exactly ' + SALTBYTES + ', was given ' + salt.length);
	    if (personal != null) assert(personal.length === PERSONALBYTES, 'personal must be exactly ' + PERSONALBYTES + ', was given ' + personal.length);
	  }

	  return new Proto(outlen, key, salt, personal)
	};

	blake2b$1.exports.ready = function (cb) {
	  b2wasm.ready(function () { // ignore errors
	    cb();
	  });
	};

	blake2b$1.exports.WASM_SUPPORTED = b2wasm.SUPPORTED;
	blake2b$1.exports.WASM_LOADED = false;

	var BYTES_MIN = blake2b$1.exports.BYTES_MIN = 16;
	var BYTES_MAX = blake2b$1.exports.BYTES_MAX = 64;
	blake2b$1.exports.BYTES = 32;
	var KEYBYTES_MIN = blake2b$1.exports.KEYBYTES_MIN = 16;
	var KEYBYTES_MAX = blake2b$1.exports.KEYBYTES_MAX = 64;
	blake2b$1.exports.KEYBYTES = 32;
	var SALTBYTES = blake2b$1.exports.SALTBYTES = 16;
	var PERSONALBYTES = blake2b$1.exports.PERSONALBYTES = 16;

	b2wasm.ready(function (err) {
	  if (!err) {
	    blake2b$1.exports.WASM_LOADED = true;
	    Proto = b2wasm;
	  }
	});
	return blake2b$1.exports;
}

var bufferCrc32;
var hasRequiredBufferCrc32;

function requireBufferCrc32 () {
	if (hasRequiredBufferCrc32) return bufferCrc32;
	hasRequiredBufferCrc32 = 1;
	var Buffer = requireDist().Buffer;

	var CRC_TABLE = [
	  0x00000000, 0x77073096, 0xee0e612c, 0x990951ba, 0x076dc419,
	  0x706af48f, 0xe963a535, 0x9e6495a3, 0x0edb8832, 0x79dcb8a4,
	  0xe0d5e91e, 0x97d2d988, 0x09b64c2b, 0x7eb17cbd, 0xe7b82d07,
	  0x90bf1d91, 0x1db71064, 0x6ab020f2, 0xf3b97148, 0x84be41de,
	  0x1adad47d, 0x6ddde4eb, 0xf4d4b551, 0x83d385c7, 0x136c9856,
	  0x646ba8c0, 0xfd62f97a, 0x8a65c9ec, 0x14015c4f, 0x63066cd9,
	  0xfa0f3d63, 0x8d080df5, 0x3b6e20c8, 0x4c69105e, 0xd56041e4,
	  0xa2677172, 0x3c03e4d1, 0x4b04d447, 0xd20d85fd, 0xa50ab56b,
	  0x35b5a8fa, 0x42b2986c, 0xdbbbc9d6, 0xacbcf940, 0x32d86ce3,
	  0x45df5c75, 0xdcd60dcf, 0xabd13d59, 0x26d930ac, 0x51de003a,
	  0xc8d75180, 0xbfd06116, 0x21b4f4b5, 0x56b3c423, 0xcfba9599,
	  0xb8bda50f, 0x2802b89e, 0x5f058808, 0xc60cd9b2, 0xb10be924,
	  0x2f6f7c87, 0x58684c11, 0xc1611dab, 0xb6662d3d, 0x76dc4190,
	  0x01db7106, 0x98d220bc, 0xefd5102a, 0x71b18589, 0x06b6b51f,
	  0x9fbfe4a5, 0xe8b8d433, 0x7807c9a2, 0x0f00f934, 0x9609a88e,
	  0xe10e9818, 0x7f6a0dbb, 0x086d3d2d, 0x91646c97, 0xe6635c01,
	  0x6b6b51f4, 0x1c6c6162, 0x856530d8, 0xf262004e, 0x6c0695ed,
	  0x1b01a57b, 0x8208f4c1, 0xf50fc457, 0x65b0d9c6, 0x12b7e950,
	  0x8bbeb8ea, 0xfcb9887c, 0x62dd1ddf, 0x15da2d49, 0x8cd37cf3,
	  0xfbd44c65, 0x4db26158, 0x3ab551ce, 0xa3bc0074, 0xd4bb30e2,
	  0x4adfa541, 0x3dd895d7, 0xa4d1c46d, 0xd3d6f4fb, 0x4369e96a,
	  0x346ed9fc, 0xad678846, 0xda60b8d0, 0x44042d73, 0x33031de5,
	  0xaa0a4c5f, 0xdd0d7cc9, 0x5005713c, 0x270241aa, 0xbe0b1010,
	  0xc90c2086, 0x5768b525, 0x206f85b3, 0xb966d409, 0xce61e49f,
	  0x5edef90e, 0x29d9c998, 0xb0d09822, 0xc7d7a8b4, 0x59b33d17,
	  0x2eb40d81, 0xb7bd5c3b, 0xc0ba6cad, 0xedb88320, 0x9abfb3b6,
	  0x03b6e20c, 0x74b1d29a, 0xead54739, 0x9dd277af, 0x04db2615,
	  0x73dc1683, 0xe3630b12, 0x94643b84, 0x0d6d6a3e, 0x7a6a5aa8,
	  0xe40ecf0b, 0x9309ff9d, 0x0a00ae27, 0x7d079eb1, 0xf00f9344,
	  0x8708a3d2, 0x1e01f268, 0x6906c2fe, 0xf762575d, 0x806567cb,
	  0x196c3671, 0x6e6b06e7, 0xfed41b76, 0x89d32be0, 0x10da7a5a,
	  0x67dd4acc, 0xf9b9df6f, 0x8ebeeff9, 0x17b7be43, 0x60b08ed5,
	  0xd6d6a3e8, 0xa1d1937e, 0x38d8c2c4, 0x4fdff252, 0xd1bb67f1,
	  0xa6bc5767, 0x3fb506dd, 0x48b2364b, 0xd80d2bda, 0xaf0a1b4c,
	  0x36034af6, 0x41047a60, 0xdf60efc3, 0xa867df55, 0x316e8eef,
	  0x4669be79, 0xcb61b38c, 0xbc66831a, 0x256fd2a0, 0x5268e236,
	  0xcc0c7795, 0xbb0b4703, 0x220216b9, 0x5505262f, 0xc5ba3bbe,
	  0xb2bd0b28, 0x2bb45a92, 0x5cb36a04, 0xc2d7ffa7, 0xb5d0cf31,
	  0x2cd99e8b, 0x5bdeae1d, 0x9b64c2b0, 0xec63f226, 0x756aa39c,
	  0x026d930a, 0x9c0906a9, 0xeb0e363f, 0x72076785, 0x05005713,
	  0x95bf4a82, 0xe2b87a14, 0x7bb12bae, 0x0cb61b38, 0x92d28e9b,
	  0xe5d5be0d, 0x7cdcefb7, 0x0bdbdf21, 0x86d3d2d4, 0xf1d4e242,
	  0x68ddb3f8, 0x1fda836e, 0x81be16cd, 0xf6b9265b, 0x6fb077e1,
	  0x18b74777, 0x88085ae6, 0xff0f6a70, 0x66063bca, 0x11010b5c,
	  0x8f659eff, 0xf862ae69, 0x616bffd3, 0x166ccf45, 0xa00ae278,
	  0xd70dd2ee, 0x4e048354, 0x3903b3c2, 0xa7672661, 0xd06016f7,
	  0x4969474d, 0x3e6e77db, 0xaed16a4a, 0xd9d65adc, 0x40df0b66,
	  0x37d83bf0, 0xa9bcae53, 0xdebb9ec5, 0x47b2cf7f, 0x30b5ffe9,
	  0xbdbdf21c, 0xcabac28a, 0x53b39330, 0x24b4a3a6, 0xbad03605,
	  0xcdd70693, 0x54de5729, 0x23d967bf, 0xb3667a2e, 0xc4614ab8,
	  0x5d681b02, 0x2a6f2b94, 0xb40bbe37, 0xc30c8ea1, 0x5a05df1b,
	  0x2d02ef8d
	];

	if (typeof Int32Array !== 'undefined') {
	  CRC_TABLE = new Int32Array(CRC_TABLE);
	}

	function ensureBuffer(input) {
	  if (Buffer.isBuffer(input)) {
	    return input;
	  }

	  var hasNewBufferAPI =
	      typeof Buffer.alloc === "function" &&
	      typeof Buffer.from === "function";

	  if (typeof input === "number") {
	    return hasNewBufferAPI ? Buffer.alloc(input) : new Buffer(input);
	  }
	  else if (typeof input === "string") {
	    return hasNewBufferAPI ? Buffer.from(input) : new Buffer(input);
	  }
	  else {
	    throw new Error("input must be buffer, number, or string, received " +
	                    typeof input);
	  }
	}

	function bufferizeInt(num) {
	  var tmp = ensureBuffer(4);
	  tmp.writeInt32BE(num, 0);
	  return tmp;
	}

	function _crc32(buf, previous) {
	  buf = ensureBuffer(buf);
	  if (Buffer.isBuffer(previous)) {
	    previous = previous.readUInt32BE(0);
	  }
	  var crc = ~~previous ^ -1;
	  for (var n = 0; n < buf.length; n++) {
	    crc = CRC_TABLE[(crc ^ buf[n]) & 0xff] ^ (crc >>> 8);
	  }
	  return (crc ^ -1);
	}

	function crc32() {
	  return bufferizeInt(_crc32.apply(null, arguments));
	}
	crc32.signed = function () {
	  return _crc32.apply(null, arguments);
	};
	crc32.unsigned = function () {
	  return _crc32.apply(null, arguments) >>> 0;
	};

	bufferCrc32 = crc32;
	return bufferCrc32;
}

var fnvPlus = {exports: {}};

/**
 * FNV-1a Hash implementation (32, 64, 128, 256, 512, and 1024 bit)
 * @author Travis Webb <me@traviswebb.com>
 * @see http://tools.ietf.org/html/draft-eastlake-fnv-06
 */

var hasRequiredFnvPlus;

function requireFnvPlus () {
	if (hasRequiredFnvPlus) return fnvPlus.exports;
	hasRequiredFnvPlus = 1;
	(function (module) {
		var fnvplus = (function(){
			var i, hl = [], hl16 = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'],
				version = '1a',
				useUTF8 = false,
				_hash32, _hash52, _hash64, _hash128, _hash256, _hash512, _hash1024,
				referenceSeed = 'chongo <Landon Curt Noll> /\\../\\',
				defaultKeyspace = 52,
				fnvConstants = {
					32: {offset: 0},
					64: {offset: [0,0,0,0]},
					128: {offset: [0,0,0,0,0,0,0,0]},
					256: {offset: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
					512: {offset: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
					1024: {offset: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}};

			for(i=0; i < 256; i++){
				hl[i] = ((i >> 4) & 15).toString(16) + (i & 15).toString(16);
			}

			function hexToBase(hex, base){
				var alphabet = '0123456789abcdefghijklmnopqrstuvwxyz',
					digits = [0], carry, i, j, string = '';

				for(i = 0; i < hex.length; i+=2){
					carry = parseInt(hex.substr(i,2),16);
					for(j = 0; j < digits.length; j++){
						carry += digits[j] << 8;
						digits[j] = carry % base;
						carry = (carry / base) | 0;
					}
					while (carry > 0) {
						digits.push(carry % base);
						carry = (carry / base) | 0;
					}
				}

				for (i = digits.length - 1; i >= 0; --i){
					string += alphabet[digits[i]];
				}

				return string;
			}

			function hashValHex(value, keyspace) {
				return {
					bits: keyspace,
					value: value,
					dec: function(){return hexToBase(value, 10);},
					hex: function(){return value;},
					str: function(){return hexToBase(value, 36);}
				};
			}

			function hashValInt32(value, keyspace) {
				return {
					bits: keyspace,
					value: value,
					dec: function(){return value.toString();},
					hex: function(){return hl[value>>>24]+ hl[(value>>>16)&255]+hl[(value>>>8)&255]+hl[value&255];},
					str: function(){return value.toString(36);}
				};
			}

			function hashValInt52(value, keyspace) {
				return {
					bits: keyspace,
					value: value,
					dec: function(){return value.toString();},
					hex: function(){return ('0000000000000000'+value.toString(16)).substr(-13);},
					str: function(){return value.toString(36);}
				};
			}

			function hash(message, keyspace) {
				var str = (typeof message === 'object') ? JSON.stringify(message) : message;

				switch(keyspace || defaultKeyspace){
					case 32:
						return _hash32(str);
					case 64:
						return _hash64(str);
					case 128:
						return _hash128(str);
					case 256:
						return _hash256(str);
					case 512:
						return _hash512(str);
					case 1024:
						return _hash1024(str);
					default:
						return _hash52(str);
				}
			}

			function setKeyspace(keyspace) {
				if (keyspace === 52 || fnvConstants[keyspace]) {
					defaultKeyspace = keyspace;
				} else {
					throw new Error('Supported FNV keyspacs: 32, 52, 64, 128, 256, 512, and 1024 bit');
				}
			}

			function setVersion(_version) {
				if (_version === '1a' ) {
					version = _version;
					_hash32   = useUTF8 ? _hash32_1a_utf   : _hash32_1a;
					_hash52   = useUTF8 ? _hash52_1a_utf   : _hash52_1a;
					_hash64   = useUTF8 ? _hash64_1a_utf   : _hash64_1a;
					_hash128  = useUTF8 ? _hash128_1a_utf  : _hash128_1a;
					_hash256  = useUTF8 ? _hash256_1a_utf  : _hash256_1a;
					_hash512  = useUTF8 ? _hash512_1a_utf  : _hash512_1a;
					_hash1024 = useUTF8 ? _hash1024_1a_utf : _hash1024_1a;
				} else if (_version === '1') {
					version = _version;
					_hash32   = useUTF8 ? _hash32_1_utf   : _hash32_1;
					_hash52   = useUTF8 ? _hash52_1_utf   : _hash52_1;
					_hash64   = useUTF8 ? _hash64_1_utf   : _hash64_1;
					_hash128  = useUTF8 ? _hash128_1_utf  : _hash128_1;
					_hash256  = useUTF8 ? _hash256_1_utf  : _hash256_1;
					_hash512  = useUTF8 ? _hash512_1_utf  : _hash512_1;
					_hash1024 = useUTF8 ? _hash1024_1_utf : _hash1024_1;
				} else {
					throw new Error('Supported FNV versions: 1, 1a');
				}
			}

			function setUTF8(utf8) {
				if (utf8) {
					useUTF8 = true;
					_hash32   = version == '1a' ? _hash32_1a_utf   : _hash32_1_utf;
					_hash52   = version == '1a' ? _hash52_1a_utf   : _hash52_1_utf;
					_hash64   = version == '1a' ? _hash64_1a_utf   : _hash64_1_utf;
					_hash128  = version == '1a' ? _hash128_1a_utf  : _hash128_1_utf;
					_hash256  = version == '1a' ? _hash256_1a_utf  : _hash256_1_utf;
					_hash512  = version == '1a' ? _hash512_1a_utf  : _hash512_1_utf;
					_hash1024 = version == '1a' ? _hash1024_1a_utf : _hash1024_1_utf;
				} else {
					useUTF8 = false;
					_hash32   = version == '1a' ? _hash32_1a   : _hash32_1;
					_hash52   = version == '1a' ? _hash52_1a   : _hash52_1;
					_hash64   = version == '1a' ? _hash64_1a   : _hash64_1;
					_hash128  = version == '1a' ? _hash128_1a  : _hash128_1;
					_hash256  = version == '1a' ? _hash256_1a  : _hash256_1;
					_hash512  = version == '1a' ? _hash512_1a  : _hash512_1;
					_hash1024 = version == '1a' ? _hash1024_1a : _hash1024_1;
				}
			}

			function seed(seed) {
				var oldVersion = version, res, i;

				seed = (seed || seed === 0) ? seed : referenceSeed;

				if (seed === referenceSeed) setVersion('1');

				for (var keysize in fnvConstants) {
					fnvConstants[keysize].offset = [];
					for(i = 0; i < keysize / 16; i++){
						fnvConstants[keysize].offset[i]	= 0;
					}
					res = hash(seed, parseInt(keysize, 10)).hex();
					for(i = 0; i < keysize / 16; i++){
						fnvConstants[keysize].offset[i]	= parseInt(res.substr(i*4,4), 16);
					}
				}

				setVersion(oldVersion);
			}

			/**
			 * Implementation without library overhead.
			 */

			function _hash32_1a_fast(str) {
				var i, l = str.length-3, t0=0,v0=0x9dc5,t1=0,v1=0x811c;

				for (i = 0; i < l;) {
					v0^=str.charCodeAt(i++);
					t0=v0*403;t1=v1*403;
					t1+=v0<<8;
					v1=(t1+(t0>>>16))&65535;v0=t0&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*403;t1=v1*403;
					t1+=v0<<8;
					v1=(t1+(t0>>>16))&65535;v0=t0&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*403;t1=v1*403;
					t1+=v0<<8;
					v1=(t1+(t0>>>16))&65535;v0=t0&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*403;t1=v1*403;
					t1+=v0<<8;
					v1=(t1+(t0>>>16))&65535;v0=t0&65535;
				}

				while(i<l+3){
					v0^=str.charCodeAt(i++);
					t0=v0*403;t1=v1*403;
					t1+=v0<<8;
					v1=(t1+(t0>>>16))&65535;v0=t0&65535;
				}


				return ((v1<<16)>>>0)+v0;
			}

			function _hash32_1a_fast_hex(str) {
				var i, l = str.length-3, t0=0,v0=0x9dc5,t1=0,v1=0x811c;

				for (i = 0; i < l;) {
					v0^=str.charCodeAt(i++);
					t0=v0*403;t1=v1*403;
					t1+=v0<<8;
					v1=(t1+(t0>>>16))&65535;v0=t0&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*403;t1=v1*403;
					t1+=v0<<8;
					v1=(t1+(t0>>>16))&65535;v0=t0&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*403;t1=v1*403;
					t1+=v0<<8;
					v1=(t1+(t0>>>16))&65535;v0=t0&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*403;t1=v1*403;
					t1+=v0<<8;
					v1=(t1+(t0>>>16))&65535;v0=t0&65535;
				}

				while(i<l+3){
					v0^=str.charCodeAt(i++);
					t0=v0*403;t1=v1*403;
					t1+=v0<<8;
					v1=(t1+(t0>>>16))&65535;v0=t0&65535;
				}


				return hl[(v1>>>8)&255]+hl[v1&255]+hl[(v0>>>8)&255]+hl[v0&255];
			}

			function _hash52_1a_fast(str){
				var i,l=str.length-3,t0=0,v0=0x2325,t1=0,v1=0x8422,t2=0,v2=0x9ce4,t3=0,v3=0xcbf2;

				for (i = 0; i < l;) {
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
				}

				while(i<l+3){
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
				}

				return (v3&15) * 281474976710656 + v2 * 4294967296 + v1 * 65536 + (v0^(v3>>4));
			}

			function _hash52_1a_fast_hex(str){
				var i,l=str.length-3,t0=0,v0=0x2325,t1=0,v1=0x8422,t2=0,v2=0x9ce4,t3=0,v3=0xcbf2;

				for (i = 0; i < l;) {
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
				}

				while(i<l+3){
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
				}

				return hl16[v3&15]+hl[v2>>8]+hl[v2&255]+hl[v1>>8]+hl[v1&255]+hl[(v0>>8)^(v3>>12)]+hl[(v0^(v3>>4))&255];
			}

			function _hash64_1a_fast(str){
				var i,l=str.length-3,t0=0,v0=0x2325,t1=0,v1=0x8422,t2=0,v2=0x9ce4,t3=0,v3=0xcbf2;

				for (i = 0; i < l;) {
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
				}

				while(i<l+3){
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
				}

				return hl[v3>>8]+hl[v3&255]+hl[v2>>8]+hl[v2&255]+hl[v1>>8]+hl[v1&255]+hl[v0>>8]+hl[v0&255];
			}

			function _hash32_1a_fast_utf(str) {
				var c,i,l=str.length,t0=0,v0=0x9dc5,t1=0,v1=0x811c;

				for (i = 0; i < l; i++) {
					c = str.charCodeAt(i);
					if(c < 128){
						v0^=c;
					}else if(c < 2048){
						v0^=(c>>6)|192;
						t0=v0*403;t1=v1*403;
						t1+=v0<<8;
						v1=(t1+(t0>>>16))&65535;v0=t0&65535;
						v0^=(c&63)|128;
					}else if(((c&64512)==55296)&&(i+1)<l&&((str.charCodeAt(i+1)&64512)==56320)){
						c=65536+((c&1023)<<10)+(str.charCodeAt(++i)&1023);
						v0^=(c>>18)|240;
						t0=v0*403;t1=v1*403;
						t1+=v0<<8;
						v1=(t1+(t0>>>16))&65535;v0=t0&65535;
						v0^=((c>>12)&63)|128;
						t0=v0*403;t1=v1*403;
						t1+=v0<<8;
						v1=(t1+(t0>>>16))&65535;v0=t0&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*403;t1=v1*403;
						t1+=v0<<8;
						v1=(t1+(t0>>>16))&65535;v0=t0&65535;
						v0^=(c&63)|128;
					}else {
						v0^=(c>>12)|224;
						t0=v0*403;t1=v1*403;
						t1+=v0<<8;
						v1=(t1+(t0>>>16))&65535;v0=t0&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*403;t1=v1*403;
						t1+=v0<<8;
						v1=(t1+(t0>>>16))&65535;v0=t0&65535;
						v0^=(c&63)|128;
					}
					t0=v0*403;t1=v1*403;
					t1+=v0<<8;
					v1=(t1+(t0>>>16))&65535;v0=t0&65535;
				}

				return ((v1<<16)>>>0)+v0;
			}

			function _hash32_1a_fast_hex_utf(str) {
				var c,i,l=str.length,t0=0,v0=0x9dc5,t1=0,v1=0x811c;

				for (i = 0; i < l; i++) {
					c = str.charCodeAt(i);
					if(c < 128){
						v0^=c;
					}else if(c < 2048){
						v0^=(c>>6)|192;
						t0=v0*403;t1=v1*403;
						t1+=v0<<8;
						v1=(t1+(t0>>>16))&65535;v0=t0&65535;
						v0^=(c&63)|128;
					}else if(((c&64512)==55296)&&(i+1)<l&&((str.charCodeAt(i+1)&64512)==56320)){
						c=65536+((c&1023)<<10)+(str.charCodeAt(++i)&1023);
						v0^=(c>>18)|240;
						t0=v0*403;t1=v1*403;
						t1+=v0<<8;
						v1=(t1+(t0>>>16))&65535;v0=t0&65535;
						v0^=((c>>12)&63)|128;
						t0=v0*403;t1=v1*403;
						t1+=v0<<8;
						v1=(t1+(t0>>>16))&65535;v0=t0&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*403;t1=v1*403;
						t1+=v0<<8;
						v1=(t1+(t0>>>16))&65535;v0=t0&65535;
						v0^=(c&63)|128;
					}else {
						v0^=(c>>12)|224;
						t0=v0*403;t1=v1*403;
						t1+=v0<<8;
						v1=(t1+(t0>>>16))&65535;v0=t0&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*403;t1=v1*403;
						t1+=v0<<8;
						v1=(t1+(t0>>>16))&65535;v0=t0&65535;
						v0^=(c&63)|128;
					}
					t0=v0*403;t1=v1*403;
					t1+=v0<<8;
					v1=(t1+(t0>>>16))&65535;v0=t0&65535;
				}


				return hl[(v1>>>8)&255]+hl[v1&255]+hl[(v0>>>8)&255]+hl[v0&255];
			}

			function _hash52_1a_fast_utf(str){
				var c,i,l=str.length,t0=0,v0=0x2325,t1=0,v1=0x8422,t2=0,v2=0x9ce4,t3=0,v3=0xcbf2;

				for (i = 0; i < l; i++) {
					c = str.charCodeAt(i);
					if(c < 128){
						v0^=c;
					}else if(c < 2048){
						v0^=(c>>6)|192;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=(c&63)|128;
					}else if(((c&64512)==55296)&&(i+1)<l&&((str.charCodeAt(i+1)&64512)==56320)){
						c=65536+((c&1023)<<10)+(str.charCodeAt(++i)&1023);
						v0^=(c>>18)|240;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=((c>>12)&63)|128;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=(c&63)|128;
					}else {
						v0^=(c>>12)|224;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=(c&63)|128;
					}
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
				}

				return (v3&15) * 281474976710656 + v2 * 4294967296 + v1 * 65536 + (v0^(v3>>4));
			}

			function _hash52_1a_fast_hex_utf (str){
				var c,i,l=str.length,t0=0,v0=0x2325,t1=0,v1=0x8422,t2=0,v2=0x9ce4,t3=0,v3=0xcbf2;

				for (i = 0; i < l; i++) {
					c = str.charCodeAt(i);
					if(c < 128){
						v0^=c;
					}else if(c < 2048){
						v0^=(c>>6)|192;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=(c&63)|128;
					}else if(((c&64512)==55296)&&(i+1)<l&&((str.charCodeAt(i+1)&64512)==56320)){
						c=65536+((c&1023)<<10)+(str.charCodeAt(++i)&1023);
						v0^=(c>>18)|240;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=((c>>12)&63)|128;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=(c&63)|128;
					}else {
						v0^=(c>>12)|224;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=(c&63)|128;
					}
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
				}

				return hl16[v3&15]+hl[v2>>8]+hl[v2&255]+hl[v1>>8]+hl[v1&255]+hl[(v0>>8)^(v3>>12)]+hl[(v0^(v3>>4))&255];
			}

			function _hash64_1a_fast_utf(str){
				var c,i,l=str.length,t0=0,v0=0x2325,t1=0,v1=0x8422,t2=0,v2=0x9ce4,t3=0,v3=0xcbf2;

				for (i = 0; i < l; i++) {
					c = str.charCodeAt(i);
					if(c < 128){
						v0^=c;
					}else if(c < 2048){
						v0^=(c>>6)|192;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=(c&63)|128;
					}else if(((c&64512)==55296)&&(i+1)<l&&((str.charCodeAt(i+1)&64512)==56320)){
						c=65536+((c&1023)<<10)+(str.charCodeAt(++i)&1023);
						v0^=(c>>18)|240;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=((c>>12)&63)|128;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=(c&63)|128;
					}else {
						v0^=(c>>12)|224;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=(c&63)|128;
					}
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
				}

				return hl[v3>>8]+hl[v3&255]+hl[v2>>8]+hl[v2&255]+hl[v1>>8]+hl[v1&255]+hl[v0>>8]+hl[v0&255];
			}
			/**
			 * Regular functions. This versions are accessible through API
			 */

			function _hash32_1a(str){
				var i,l=str.length-3,s=fnvConstants[32].offset,t0=0,v0=s[1]|0,t1=0,v1=s[0]|0;

				for (i = 0; i < l;) {
					v0^=str.charCodeAt(i++);
					t0=v0*403;t1=v1*403;
					t1+=v0<<8;
					v1=(t1+(t0>>>16))&65535;v0=t0&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*403;t1=v1*403;
					t1+=v0<<8;
					v1=(t1+(t0>>>16))&65535;v0=t0&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*403;t1=v1*403;
					t1+=v0<<8;
					v1=(t1+(t0>>>16))&65535;v0=t0&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*403;t1=v1*403;
					t1+=v0<<8;
					v1=(t1+(t0>>>16))&65535;v0=t0&65535;
				}

				while(i<l+3){
					v0^=str.charCodeAt(i++);
					t0=v0*403;t1=v1*403;
					t1+=v0<<8;
					v1=(t1+(t0>>>16))&65535;v0=t0&65535;
				}

				return hashValInt32(((v1<<16)>>>0)+v0,32);
			}

			function _hash32_1(str){
				var i,l=str.length-3,s=fnvConstants[32].offset,t0=0,v0=s[1]|0,t1=0,v1=s[0]|0;

				for (i = 0; i < l;) {
					t0=v0*403;t1=v1*403;
					t1+=v0<<8;
					v1=(t1+(t0>>>16))&65535;v0=t0&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*403;t1=v1*403;
					t1+=v0<<8;
					v1=(t1+(t0>>>16))&65535;v0=t0&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*403;t1=v1*403;
					t1+=v0<<8;
					v1=(t1+(t0>>>16))&65535;v0=t0&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*403;t1=v1*403;
					t1+=v0<<8;
					v1=(t1+(t0>>>16))&65535;v0=t0&65535;
					v0^=str.charCodeAt(i++);
				}

				while(i<l+3){
					t0=v0*403;t1=v1*403;
					t1+=v0<<8;
					v1=(t1+(t0>>>16))&65535;v0=t0&65535;
					v0^=str.charCodeAt(i++);
				}

				return hashValInt32(((v1<<16)>>>0)+v0,32);
			}

			function _hash32_1a_utf(str){
				var c,i,l=str.length,s=fnvConstants[32].offset,t0=0,v0=s[1]|0,t1=0,v1=s[0]|0;

				for (i = 0; i < l; i++) {
					c = str.charCodeAt(i);
					if(c < 128){
						v0^=c;
					}else if(c < 2048){
						v0^=(c>>6)|192;
						t0=v0*403;t1=v1*403;
						t1+=v0<<8;
						v1=(t1+(t0>>>16))&65535;v0=t0&65535;
						v0^=(c&63)|128;
					}else if(((c&64512)==55296)&&(i+1)<l&&((str.charCodeAt(i+1)&64512)==56320)){
						c=65536+((c&1023)<<10)+(str.charCodeAt(++i)&1023);
						v0^=(c>>18)|240;
						t0=v0*403;t1=v1*403;
						t1+=v0<<8;
						v1=(t1+(t0>>>16))&65535;v0=t0&65535;
						v0^=((c>>12)&63)|128;
						t0=v0*403;t1=v1*403;
						t1+=v0<<8;
						v1=(t1+(t0>>>16))&65535;v0=t0&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*403;t1=v1*403;
						t1+=v0<<8;
						v1=(t1+(t0>>>16))&65535;v0=t0&65535;
						v0^=(c&63)|128;
					}else {
						v0^=(c>>12)|224;
						t0=v0*403;t1=v1*403;
						t1+=v0<<8;
						v1=(t1+(t0>>>16))&65535;v0=t0&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*403;t1=v1*403;
						t1+=v0<<8;
						v1=(t1+(t0>>>16))&65535;v0=t0&65535;
						v0^=(c&63)|128;
					}
					t0=v0*403;t1=v1*403;
					t1+=v0<<8;
					v1=(t1+(t0>>>16))&65535;v0=t0&65535;
				}

				return hashValInt32(((v1<<16)>>>0)+v0,32);
			}

			function _hash32_1_utf(str){
				var c,i,l=str.length,s=fnvConstants[32].offset,t0=0,v0=s[1]|0,t1=0,v1=s[0]|0;

				for (i = 0; i < l; i++) {
					c = str.charCodeAt(i);
					t0=v0*403;t1=v1*403;
					t1+=v0<<8;
					v1=(t1+(t0>>>16))&65535;v0=t0&65535;
					if(c < 128){
						v0^=c;
					}else if(c < 2048){
						v0^=(c>>6)|192;
						t0=v0*403;t1=v1*403;
						t1+=v0<<8;
						v1=(t1+(t0>>>16))&65535;v0=t0&65535;
						v0^=(c&63)|128;
					}else if(((c&64512)==55296)&&(i+1)<l&&((str.charCodeAt(i+1)&64512)==56320)){
						c=65536+((c&1023)<<10)+(str.charCodeAt(++i)&1023);
						v0^=(c>>18)|240;
						t0=v0*403;t1=v1*403;
						t1+=v0<<8;
						v1=(t1+(t0>>>16))&65535;v0=t0&65535;
						v0^=((c>>12)&63)|128;
						t0=v0*403;t1=v1*403;
						t1+=v0<<8;
						v1=(t1+(t0>>>16))&65535;v0=t0&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*403;t1=v1*403;
						t1+=v0<<8;
						v1=(t1+(t0>>>16))&65535;v0=t0&65535;
						v0^=(c&63)|128;
					}else {
						v0^=(c>>12)|224;
						t0=v0*403;t1=v1*403;
						t1+=v0<<8;
						v1=(t1+(t0>>>16))&65535;v0=t0&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*403;t1=v1*403;
						t1+=v0<<8;
						v1=(t1+(t0>>>16))&65535;v0=t0&65535;
						v0^=(c&63)|128;
					}
				}

				return hashValInt32(((v1<<16)>>>0)+v0,32);
			}

			_hash32 = _hash32_1a;

			function _hash52_1a(str){
				var i,l=str.length-3,s=fnvConstants[64].offset,t0=0,v0=s[3]|0,t1=0,v1=s[2]|0,t2=0,v2=s[1]|0,t3=0,v3=s[0]|0;

				for (i = 0; i < l;) {
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
				}

				while(i<l+3){
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
				}

				return hashValInt52((v3&15)*281474976710656+v2*4294967296+v1*65536+(v0^(v3>>4)),52);
			}

			function _hash52_1(str){
				var i,l=str.length-3,s=fnvConstants[64].offset,t0=0,v0=s[3]|0,t1=0,v1=s[2]|0,t2=0,v2=s[1]|0,t3=0,v3=s[0]|0;

				for (i = 0; i < l;) {
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					v0^=str.charCodeAt(i++);
				}

				while(i<l+3){
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					v0^=str.charCodeAt(i++);
				}

				return hashValInt52((v3&15)*281474976710656+v2*4294967296+v1*65536+(v0^(v3>>4)),52);
			}

			function _hash52_1a_utf(str){
				var c,i,l=str.length,s=fnvConstants[64].offset,t0=0,v0=s[3]|0,t1=0,v1=s[2]|0,t2=0,v2=s[1]|0,t3=0,v3=s[0]|0;

				for (i = 0; i < l; i++) {
					c = str.charCodeAt(i);
					if(c < 128){
						v0^=c;
					}else if(c < 2048){
						v0^=(c>>6)|192;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=(c&63)|128;
					}else if(((c&64512)==55296)&&(i+1)<l&&((str.charCodeAt(i+1)&64512)==56320)){
						c=65536+((c&1023)<<10)+(str.charCodeAt(++i)&1023);
						v0^=(c>>18)|240;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=((c>>12)&63)|128;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=(c&63)|128;
					}else {
						v0^=(c>>12)|224;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=(c&63)|128;
					}
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
				}

				return hashValInt52((v3&15)*281474976710656+v2*4294967296+v1*65536+(v0^(v3>>4)),52);
			}

			function _hash52_1_utf(str){
				var c,i,l=str.length,s=fnvConstants[64].offset,t0=0,v0=s[3]|0,t1=0,v1=s[2]|0,t2=0,v2=s[1]|0,t3=0,v3=s[0]|0;

				for (i = 0; i < l; i++) {
					c = str.charCodeAt(i);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					if(c < 128){
						v0^=c;
					}else if(c < 2048){
						v0^=(c>>6)|192;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=(c&63)|128;
					}else if(((c&64512)==55296)&&(i+1)<l&&((str.charCodeAt(i+1)&64512)==56320)){
						c=65536+((c&1023)<<10)+(str.charCodeAt(++i)&1023);
						v0^=(c>>18)|240;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=((c>>12)&63)|128;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=(c&63)|128;
					}else {
						v0^=(c>>12)|224;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=(c&63)|128;
					}
				}

				return hashValInt52((v3&15)*281474976710656+v2*4294967296+v1*65536+(v0^(v3>>4)),52);
			}

			_hash52 = _hash52_1a;

			function _hash64_1a(str){
				var i,l=str.length-3,s=fnvConstants[64].offset,t0=0,v0=s[3]|0,t1=0,v1=s[2]|0,t2=0,v2=s[1]|0,t3=0,v3=s[0]|0;

				for (i = 0; i < l;) {
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
				}

				while(i<l+3){
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
				}

				return hashValHex(hl[v3>>8]+hl[v3&255]+hl[v2>>8]+hl[v2&255]+hl[v1>>8]+hl[v1&255]+hl[v0>>8]+hl[v0&255],64);
			}

			function _hash64_1(str){
				var i,l=str.length-3,s=fnvConstants[64].offset,t0=0,v0=s[3]|0,t1=0,v1=s[2]|0,t2=0,v2=s[1]|0,t3=0,v3=s[0]|0;

				for (i = 0; i < l;) {
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					v0^=str.charCodeAt(i++);
				}

				while(i<l+3){
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					v0^=str.charCodeAt(i++);
				}

				return hashValHex(hl[v3>>8]+hl[v3&255]+hl[v2>>8]+hl[v2&255]+hl[v1>>8]+hl[v1&255]+hl[v0>>8]+hl[v0&255],64);
			}

			function _hash64_1a_utf(str){
				var c,i,l=str.length,s=fnvConstants[64].offset,t0=0,v0=s[3]|0,t1=0,v1=s[2]|0,t2=0,v2=s[1]|0,t3=0,v3=s[0]|0;

				for (i = 0; i < l; i++) {
					c = str.charCodeAt(i);
					if(c < 128){
						v0^=c;
					}else if(c < 2048){
						v0^=(c>>6)|192;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=(c&63)|128;
					}else if(((c&64512)==55296)&&(i+1)<l&&((str.charCodeAt(i+1)&64512)==56320)){
						c=65536+((c&1023)<<10)+(str.charCodeAt(++i)&1023);
						v0^=(c>>18)|240;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=((c>>12)&63)|128;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=(c&63)|128;
					}else {
						v0^=(c>>12)|224;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=(c&63)|128;
					}
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
				}

				return hashValHex(hl[v3>>8]+hl[v3&255]+hl[v2>>8]+hl[v2&255]+hl[v1>>8]+hl[v1&255]+hl[v0>>8]+hl[v0&255],64);
			}

			function _hash64_1_utf(str){
				var c,i,l=str.length,s=fnvConstants[64].offset,t0=0,v0=s[3]|0,t1=0,v1=s[2]|0,t2=0,v2=s[1]|0,t3=0,v3=s[0]|0;

				for (i = 0; i < l; i++) {
					c = str.charCodeAt(i);
					t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
					t2+=v0<<8;t3+=v1<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
					if(c < 128){
						v0^=c;
					}else if(c < 2048){
						v0^=(c>>6)|192;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=(c&63)|128;
					}else if(((c&64512)==55296)&&(i+1)<l&&((str.charCodeAt(i+1)&64512)==56320)){
						c=65536+((c&1023)<<10)+(str.charCodeAt(++i)&1023);
						v0^=(c>>18)|240;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=((c>>12)&63)|128;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=(c&63)|128;
					}else {
						v0^=(c>>12)|224;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*435;t1=v1*435;t2=v2*435;t3=v3*435;
						t2+=v0<<8;t3+=v1<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;v3=(t3+(t2>>>16))&65535;v2=t2&65535;
						v0^=(c&63)|128;
					}
				}

				return hashValHex(hl[v3>>8]+hl[v3&255]+hl[v2>>8]+hl[v2&255]+hl[v1>>8]+hl[v1&255]+hl[v0>>8]+hl[v0&255],64);
			}

			_hash64 = _hash64_1a;

			function _hash128_1a(str){
				var i,l=str.length-3,s=fnvConstants[128].offset,t0=0,v0=s[7]|0,t1=0,v1=s[6]|0,t2=0,v2=s[5]|0,t3=0,v3=s[4]|0,t4=0,v4=s[3]|0,t5=0,v5=s[2]|0,t6=0,v6=s[1]|0,t7=0,v7=s[0]|0;

				for (i = 0; i < l;) {
					v0^=str.charCodeAt(i++);
					t0=v0*315;t1=v1*315;t2=v2*315;t3=v3*315;t4=v4*315;t5=v5*315;t6=v6*315;t7=v7*315;
					t5+=v0<<8;t6+=v1<<8;t7+=v2<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;v7=(t7+(t6>>>16))&65535;v6=t6&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*315;t1=v1*315;t2=v2*315;t3=v3*315;t4=v4*315;t5=v5*315;t6=v6*315;t7=v7*315;
					t5+=v0<<8;t6+=v1<<8;t7+=v2<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;v7=(t7+(t6>>>16))&65535;v6=t6&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*315;t1=v1*315;t2=v2*315;t3=v3*315;t4=v4*315;t5=v5*315;t6=v6*315;t7=v7*315;
					t5+=v0<<8;t6+=v1<<8;t7+=v2<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;v7=(t7+(t6>>>16))&65535;v6=t6&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*315;t1=v1*315;t2=v2*315;t3=v3*315;t4=v4*315;t5=v5*315;t6=v6*315;t7=v7*315;
					t5+=v0<<8;t6+=v1<<8;t7+=v2<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;v7=(t7+(t6>>>16))&65535;v6=t6&65535;
				}

				while(i<l+3){
					v0^=str.charCodeAt(i++);
					t0=v0*315;t1=v1*315;t2=v2*315;t3=v3*315;t4=v4*315;t5=v5*315;t6=v6*315;t7=v7*315;
					t5+=v0<<8;t6+=v1<<8;t7+=v2<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;v7=(t7+(t6>>>16))&65535;v6=t6&65535;
				}

				return hashValHex(hl[v7>>8]+hl[v7&255]+hl[v6>>8]+hl[v6&255]+hl[v5>>8]+hl[v5&255]+hl[v4>>8]+hl[v4&255]+hl[v3>>8]+hl[v3&255]+hl[v2>>8]+hl[v2&255]+hl[v1>>8]+hl[v1&255]+hl[v0>>8]+hl[v0&255],128);
			}

			function _hash128_1(str){
				var i,l=str.length-3,s=fnvConstants[128].offset,t0=0,v0=s[7]|0,t1=0,v1=s[6]|0,t2=0,v2=s[5]|0,t3=0,v3=s[4]|0,t4=0,v4=s[3]|0,t5=0,v5=s[2]|0,t6=0,v6=s[1]|0,t7=0,v7=s[0]|0;

				for (i = 0; i < l;) {
					t0=v0*315;t1=v1*315;t2=v2*315;t3=v3*315;t4=v4*315;t5=v5*315;t6=v6*315;t7=v7*315;
					t5+=v0<<8;t6+=v1<<8;t7+=v2<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;v7=(t7+(t6>>>16))&65535;v6=t6&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*315;t1=v1*315;t2=v2*315;t3=v3*315;t4=v4*315;t5=v5*315;t6=v6*315;t7=v7*315;
					t5+=v0<<8;t6+=v1<<8;t7+=v2<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;v7=(t7+(t6>>>16))&65535;v6=t6&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*315;t1=v1*315;t2=v2*315;t3=v3*315;t4=v4*315;t5=v5*315;t6=v6*315;t7=v7*315;
					t5+=v0<<8;t6+=v1<<8;t7+=v2<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;v7=(t7+(t6>>>16))&65535;v6=t6&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*315;t1=v1*315;t2=v2*315;t3=v3*315;t4=v4*315;t5=v5*315;t6=v6*315;t7=v7*315;
					t5+=v0<<8;t6+=v1<<8;t7+=v2<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;v7=(t7+(t6>>>16))&65535;v6=t6&65535;
					v0^=str.charCodeAt(i++);
				}

				while(i<l+3){
					t0=v0*315;t1=v1*315;t2=v2*315;t3=v3*315;t4=v4*315;t5=v5*315;t6=v6*315;t7=v7*315;
					t5+=v0<<8;t6+=v1<<8;t7+=v2<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;v7=(t7+(t6>>>16))&65535;v6=t6&65535;
					v0^=str.charCodeAt(i++);
				}

				return hashValHex(hl[v7>>8]+hl[v7&255]+hl[v6>>8]+hl[v6&255]+hl[v5>>8]+hl[v5&255]+hl[v4>>8]+hl[v4&255]+hl[v3>>8]+hl[v3&255]+hl[v2>>8]+hl[v2&255]+hl[v1>>8]+hl[v1&255]+hl[v0>>8]+hl[v0&255],128);
			}

			function _hash128_1a_utf(str){
				var c,i,l=str.length,s=fnvConstants[128].offset,t0=0,v0=s[7]|0,t1=0,v1=s[6]|0,t2=0,v2=s[5]|0,t3=0,v3=s[4]|0,t4=0,v4=s[3]|0,t5=0,v5=s[2]|0,t6=0,v6=s[1]|0,t7=0,v7=s[0]|0;

				for (i = 0; i < l; i++) {
					c = str.charCodeAt(i);
					if(c < 128){
						v0^=c;
					}else if(c < 2048){
						v0^=(c>>6)|192;
						t0=v0*315;t1=v1*315;t2=v2*315;t3=v3*315;t4=v4*315;t5=v5*315;t6=v6*315;t7=v7*315;
						t5+=v0<<8;t6+=v1<<8;t7+=v2<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;v7=(t7+(t6>>>16))&65535;v6=t6&65535;
						v0^=(c&63)|128;
					}else if(((c&64512)==55296)&&(i+1)<l&&((str.charCodeAt(i+1)&64512)==56320)){
						c=65536+((c&1023)<<10)+(str.charCodeAt(++i)&1023);
						v0^=(c>>18)|240;
						t0=v0*315;t1=v1*315;t2=v2*315;t3=v3*315;t4=v4*315;t5=v5*315;t6=v6*315;t7=v7*315;
						t5+=v0<<8;t6+=v1<<8;t7+=v2<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;v7=(t7+(t6>>>16))&65535;v6=t6&65535;
						v0^=((c>>12)&63)|128;
						t0=v0*315;t1=v1*315;t2=v2*315;t3=v3*315;t4=v4*315;t5=v5*315;t6=v6*315;t7=v7*315;
						t5+=v0<<8;t6+=v1<<8;t7+=v2<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;v7=(t7+(t6>>>16))&65535;v6=t6&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*315;t1=v1*315;t2=v2*315;t3=v3*315;t4=v4*315;t5=v5*315;t6=v6*315;t7=v7*315;
						t5+=v0<<8;t6+=v1<<8;t7+=v2<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;v7=(t7+(t6>>>16))&65535;v6=t6&65535;
						v0^=(c&63)|128;
					}else {
						v0^=(c>>12)|224;
						t0=v0*315;t1=v1*315;t2=v2*315;t3=v3*315;t4=v4*315;t5=v5*315;t6=v6*315;t7=v7*315;
						t5+=v0<<8;t6+=v1<<8;t7+=v2<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;v7=(t7+(t6>>>16))&65535;v6=t6&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*315;t1=v1*315;t2=v2*315;t3=v3*315;t4=v4*315;t5=v5*315;t6=v6*315;t7=v7*315;
						t5+=v0<<8;t6+=v1<<8;t7+=v2<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;v7=(t7+(t6>>>16))&65535;v6=t6&65535;
						v0^=(c&63)|128;
					}
					t0=v0*315;t1=v1*315;t2=v2*315;t3=v3*315;t4=v4*315;t5=v5*315;t6=v6*315;t7=v7*315;
					t5+=v0<<8;t6+=v1<<8;t7+=v2<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;v7=(t7+(t6>>>16))&65535;v6=t6&65535;
				}

				return hashValHex(hl[v7>>8]+hl[v7&255]+hl[v6>>8]+hl[v6&255]+hl[v5>>8]+hl[v5&255]+hl[v4>>8]+hl[v4&255]+hl[v3>>8]+hl[v3&255]+hl[v2>>8]+hl[v2&255]+hl[v1>>8]+hl[v1&255]+hl[v0>>8]+hl[v0&255],128);
			}

			function _hash128_1_utf(str){
				var c,i,l=str.length,s=fnvConstants[128].offset,t0=0,v0=s[7]|0,t1=0,v1=s[6]|0,t2=0,v2=s[5]|0,t3=0,v3=s[4]|0,t4=0,v4=s[3]|0,t5=0,v5=s[2]|0,t6=0,v6=s[1]|0,t7=0,v7=s[0]|0;

				for (i = 0; i < l; i++) {
					c = str.charCodeAt(i);
					t0=v0*315;t1=v1*315;t2=v2*315;t3=v3*315;t4=v4*315;t5=v5*315;t6=v6*315;t7=v7*315;
					t5+=v0<<8;t6+=v1<<8;t7+=v2<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;v7=(t7+(t6>>>16))&65535;v6=t6&65535;
					if(c < 128){
						v0^=c;
					}else if(c < 2048){
						v0^=(c>>6)|192;
						t0=v0*315;t1=v1*315;t2=v2*315;t3=v3*315;t4=v4*315;t5=v5*315;t6=v6*315;t7=v7*315;
						t5+=v0<<8;t6+=v1<<8;t7+=v2<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;v7=(t7+(t6>>>16))&65535;v6=t6&65535;
						v0^=(c&63)|128;
					}else if(((c&64512)==55296)&&(i+1)<l&&((str.charCodeAt(i+1)&64512)==56320)){
						c=65536+((c&1023)<<10)+(str.charCodeAt(++i)&1023);
						v0^=(c>>18)|240;
						t0=v0*315;t1=v1*315;t2=v2*315;t3=v3*315;t4=v4*315;t5=v5*315;t6=v6*315;t7=v7*315;
						t5+=v0<<8;t6+=v1<<8;t7+=v2<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;v7=(t7+(t6>>>16))&65535;v6=t6&65535;
						v0^=((c>>12)&63)|128;
						t0=v0*315;t1=v1*315;t2=v2*315;t3=v3*315;t4=v4*315;t5=v5*315;t6=v6*315;t7=v7*315;
						t5+=v0<<8;t6+=v1<<8;t7+=v2<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;v7=(t7+(t6>>>16))&65535;v6=t6&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*315;t1=v1*315;t2=v2*315;t3=v3*315;t4=v4*315;t5=v5*315;t6=v6*315;t7=v7*315;
						t5+=v0<<8;t6+=v1<<8;t7+=v2<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;v7=(t7+(t6>>>16))&65535;v6=t6&65535;
						v0^=(c&63)|128;
					}else {
						v0^=(c>>12)|224;
						t0=v0*315;t1=v1*315;t2=v2*315;t3=v3*315;t4=v4*315;t5=v5*315;t6=v6*315;t7=v7*315;
						t5+=v0<<8;t6+=v1<<8;t7+=v2<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;v7=(t7+(t6>>>16))&65535;v6=t6&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*315;t1=v1*315;t2=v2*315;t3=v3*315;t4=v4*315;t5=v5*315;t6=v6*315;t7=v7*315;
						t5+=v0<<8;t6+=v1<<8;t7+=v2<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;v7=(t7+(t6>>>16))&65535;v6=t6&65535;
						v0^=(c&63)|128;
					}
				}

				return hashValHex(hl[v7>>8]+hl[v7&255]+hl[v6>>8]+hl[v6&255]+hl[v5>>8]+hl[v5&255]+hl[v4>>8]+hl[v4&255]+hl[v3>>8]+hl[v3&255]+hl[v2>>8]+hl[v2&255]+hl[v1>>8]+hl[v1&255]+hl[v0>>8]+hl[v0&255],128);
			}

			_hash128 = _hash128_1a;

			function _hash256_1a(str){
				var i,l=str.length-3,s=fnvConstants[256].offset,t0=0,v0=s[15]|0,t1=0,v1=s[14]|0,t2=0,v2=s[13]|0,t3=0,v3=s[12]|0,t4=0,v4=s[11]|0,t5=0,v5=s[10]|0,t6=0,v6=s[9]|0,t7=0,v7=s[8]|0,t8=0,v8=s[7]|0,t9=0,v9=s[6]|0,t10=0,v10=s[5]|0,t11=0,v11=s[4]|0,t12=0,v12=s[3]|0,t13=0,v13=s[2]|0,t14=0,v14=s[1]|0,t15=0,v15=s[0]|0;

				for (i = 0; i < l;) {
					v0^=str.charCodeAt(i++);
					t0=v0*355;t1=v1*355;t2=v2*355;t3=v3*355;t4=v4*355;t5=v5*355;t6=v6*355;t7=v7*355;t8=v8*355;t9=v9*355;t10=v10*355;t11=v11*355;t12=v12*355;t13=v13*355;t14=v14*355;t15=v15*355;
					t10+=v0<<8;t11+=v1<<8;t12+=v2<<8;t13+=v3<<8;t14+=v4<<8;t15+=v5<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;v15=(t15+(t14>>>16))&65535;v14=t14&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*355;t1=v1*355;t2=v2*355;t3=v3*355;t4=v4*355;t5=v5*355;t6=v6*355;t7=v7*355;t8=v8*355;t9=v9*355;t10=v10*355;t11=v11*355;t12=v12*355;t13=v13*355;t14=v14*355;t15=v15*355;
					t10+=v0<<8;t11+=v1<<8;t12+=v2<<8;t13+=v3<<8;t14+=v4<<8;t15+=v5<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;v15=(t15+(t14>>>16))&65535;v14=t14&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*355;t1=v1*355;t2=v2*355;t3=v3*355;t4=v4*355;t5=v5*355;t6=v6*355;t7=v7*355;t8=v8*355;t9=v9*355;t10=v10*355;t11=v11*355;t12=v12*355;t13=v13*355;t14=v14*355;t15=v15*355;
					t10+=v0<<8;t11+=v1<<8;t12+=v2<<8;t13+=v3<<8;t14+=v4<<8;t15+=v5<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;v15=(t15+(t14>>>16))&65535;v14=t14&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*355;t1=v1*355;t2=v2*355;t3=v3*355;t4=v4*355;t5=v5*355;t6=v6*355;t7=v7*355;t8=v8*355;t9=v9*355;t10=v10*355;t11=v11*355;t12=v12*355;t13=v13*355;t14=v14*355;t15=v15*355;
					t10+=v0<<8;t11+=v1<<8;t12+=v2<<8;t13+=v3<<8;t14+=v4<<8;t15+=v5<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;v15=(t15+(t14>>>16))&65535;v14=t14&65535;
				}

				while(i<l+3){
					v0^=str.charCodeAt(i++);
					t0=v0*355;t1=v1*355;t2=v2*355;t3=v3*355;t4=v4*355;t5=v5*355;t6=v6*355;t7=v7*355;t8=v8*355;t9=v9*355;t10=v10*355;t11=v11*355;t12=v12*355;t13=v13*355;t14=v14*355;t15=v15*355;
					t10+=v0<<8;t11+=v1<<8;t12+=v2<<8;t13+=v3<<8;t14+=v4<<8;t15+=v5<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;v15=(t15+(t14>>>16))&65535;v14=t14&65535;
				}

				return hashValHex(hl[v15>>8]+hl[v15&255]+hl[v14>>8]+hl[v14&255]+hl[v13>>8]+hl[v13&255]+hl[v12>>8]+hl[v12&255]+hl[v11>>8]+hl[v11&255]+hl[v10>>8]+hl[v10&255]+hl[v9>>8]+hl[v9&255]+hl[v8>>8]+hl[v8&255]+hl[v7>>8]+hl[v7&255]+hl[v6>>8]+hl[v6&255]+hl[v5>>8]+hl[v5&255]+hl[v4>>8]+hl[v4&255]+hl[v3>>8]+hl[v3&255]+hl[v2>>8]+hl[v2&255]+hl[v1>>8]+hl[v1&255]+hl[v0>>8]+hl[v0&255],256);
			}

			function _hash256_1(str){
				var i,l=str.length-3,s=fnvConstants[256].offset,t0=0,v0=s[15]|0,t1=0,v1=s[14]|0,t2=0,v2=s[13]|0,t3=0,v3=s[12]|0,t4=0,v4=s[11]|0,t5=0,v5=s[10]|0,t6=0,v6=s[9]|0,t7=0,v7=s[8]|0,t8=0,v8=s[7]|0,t9=0,v9=s[6]|0,t10=0,v10=s[5]|0,t11=0,v11=s[4]|0,t12=0,v12=s[3]|0,t13=0,v13=s[2]|0,t14=0,v14=s[1]|0,t15=0,v15=s[0]|0;

				for (i = 0; i < l;) {
					t0=v0*355;t1=v1*355;t2=v2*355;t3=v3*355;t4=v4*355;t5=v5*355;t6=v6*355;t7=v7*355;t8=v8*355;t9=v9*355;t10=v10*355;t11=v11*355;t12=v12*355;t13=v13*355;t14=v14*355;t15=v15*355;
					t10+=v0<<8;t11+=v1<<8;t12+=v2<<8;t13+=v3<<8;t14+=v4<<8;t15+=v5<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;v15=(t15+(t14>>>16))&65535;v14=t14&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*355;t1=v1*355;t2=v2*355;t3=v3*355;t4=v4*355;t5=v5*355;t6=v6*355;t7=v7*355;t8=v8*355;t9=v9*355;t10=v10*355;t11=v11*355;t12=v12*355;t13=v13*355;t14=v14*355;t15=v15*355;
					t10+=v0<<8;t11+=v1<<8;t12+=v2<<8;t13+=v3<<8;t14+=v4<<8;t15+=v5<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;v15=(t15+(t14>>>16))&65535;v14=t14&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*355;t1=v1*355;t2=v2*355;t3=v3*355;t4=v4*355;t5=v5*355;t6=v6*355;t7=v7*355;t8=v8*355;t9=v9*355;t10=v10*355;t11=v11*355;t12=v12*355;t13=v13*355;t14=v14*355;t15=v15*355;
					t10+=v0<<8;t11+=v1<<8;t12+=v2<<8;t13+=v3<<8;t14+=v4<<8;t15+=v5<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;v15=(t15+(t14>>>16))&65535;v14=t14&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*355;t1=v1*355;t2=v2*355;t3=v3*355;t4=v4*355;t5=v5*355;t6=v6*355;t7=v7*355;t8=v8*355;t9=v9*355;t10=v10*355;t11=v11*355;t12=v12*355;t13=v13*355;t14=v14*355;t15=v15*355;
					t10+=v0<<8;t11+=v1<<8;t12+=v2<<8;t13+=v3<<8;t14+=v4<<8;t15+=v5<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;v15=(t15+(t14>>>16))&65535;v14=t14&65535;
					v0^=str.charCodeAt(i++);
				}

				while(i<l+3){
					t0=v0*355;t1=v1*355;t2=v2*355;t3=v3*355;t4=v4*355;t5=v5*355;t6=v6*355;t7=v7*355;t8=v8*355;t9=v9*355;t10=v10*355;t11=v11*355;t12=v12*355;t13=v13*355;t14=v14*355;t15=v15*355;
					t10+=v0<<8;t11+=v1<<8;t12+=v2<<8;t13+=v3<<8;t14+=v4<<8;t15+=v5<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;v15=(t15+(t14>>>16))&65535;v14=t14&65535;
					v0^=str.charCodeAt(i++);
				}

				return hashValHex(hl[v15>>8]+hl[v15&255]+hl[v14>>8]+hl[v14&255]+hl[v13>>8]+hl[v13&255]+hl[v12>>8]+hl[v12&255]+hl[v11>>8]+hl[v11&255]+hl[v10>>8]+hl[v10&255]+hl[v9>>8]+hl[v9&255]+hl[v8>>8]+hl[v8&255]+hl[v7>>8]+hl[v7&255]+hl[v6>>8]+hl[v6&255]+hl[v5>>8]+hl[v5&255]+hl[v4>>8]+hl[v4&255]+hl[v3>>8]+hl[v3&255]+hl[v2>>8]+hl[v2&255]+hl[v1>>8]+hl[v1&255]+hl[v0>>8]+hl[v0&255],256);
			}

			function _hash256_1a_utf(str){
				var c,i,l=str.length,s=fnvConstants[256].offset,t0=0,v0=s[15]|0,t1=0,v1=s[14]|0,t2=0,v2=s[13]|0,t3=0,v3=s[12]|0,t4=0,v4=s[11]|0,t5=0,v5=s[10]|0,t6=0,v6=s[9]|0,t7=0,v7=s[8]|0,t8=0,v8=s[7]|0,t9=0,v9=s[6]|0,t10=0,v10=s[5]|0,t11=0,v11=s[4]|0,t12=0,v12=s[3]|0,t13=0,v13=s[2]|0,t14=0,v14=s[1]|0,t15=0,v15=s[0]|0;

				for (i = 0; i < l; i++) {
					c = str.charCodeAt(i);
					if(c < 128){
						v0^=c;
					}else if(c < 2048){
						v0^=(c>>6)|192;
						t0=v0*355;t1=v1*355;t2=v2*355;t3=v3*355;t4=v4*355;t5=v5*355;t6=v6*355;t7=v7*355;t8=v8*355;t9=v9*355;t10=v10*355;t11=v11*355;t12=v12*355;t13=v13*355;t14=v14*355;t15=v15*355;
						t10+=v0<<8;t11+=v1<<8;t12+=v2<<8;t13+=v3<<8;t14+=v4<<8;t15+=v5<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;v15=(t15+(t14>>>16))&65535;v14=t14&65535;
						v0^=(c&63)|128;
					}else if(((c&64512)==55296)&&(i+1)<l&&((str.charCodeAt(i+1)&64512)==56320)){
						c=65536+((c&1023)<<10)+(str.charCodeAt(++i)&1023);
						v0^=(c>>18)|240;
						t0=v0*355;t1=v1*355;t2=v2*355;t3=v3*355;t4=v4*355;t5=v5*355;t6=v6*355;t7=v7*355;t8=v8*355;t9=v9*355;t10=v10*355;t11=v11*355;t12=v12*355;t13=v13*355;t14=v14*355;t15=v15*355;
						t10+=v0<<8;t11+=v1<<8;t12+=v2<<8;t13+=v3<<8;t14+=v4<<8;t15+=v5<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;v15=(t15+(t14>>>16))&65535;v14=t14&65535;
						v0^=((c>>12)&63)|128;
						t0=v0*355;t1=v1*355;t2=v2*355;t3=v3*355;t4=v4*355;t5=v5*355;t6=v6*355;t7=v7*355;t8=v8*355;t9=v9*355;t10=v10*355;t11=v11*355;t12=v12*355;t13=v13*355;t14=v14*355;t15=v15*355;
						t10+=v0<<8;t11+=v1<<8;t12+=v2<<8;t13+=v3<<8;t14+=v4<<8;t15+=v5<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;v15=(t15+(t14>>>16))&65535;v14=t14&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*355;t1=v1*355;t2=v2*355;t3=v3*355;t4=v4*355;t5=v5*355;t6=v6*355;t7=v7*355;t8=v8*355;t9=v9*355;t10=v10*355;t11=v11*355;t12=v12*355;t13=v13*355;t14=v14*355;t15=v15*355;
						t10+=v0<<8;t11+=v1<<8;t12+=v2<<8;t13+=v3<<8;t14+=v4<<8;t15+=v5<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;v15=(t15+(t14>>>16))&65535;v14=t14&65535;
						v0^=(c&63)|128;
					}else {
						v0^=(c>>12)|224;
						t0=v0*355;t1=v1*355;t2=v2*355;t3=v3*355;t4=v4*355;t5=v5*355;t6=v6*355;t7=v7*355;t8=v8*355;t9=v9*355;t10=v10*355;t11=v11*355;t12=v12*355;t13=v13*355;t14=v14*355;t15=v15*355;
						t10+=v0<<8;t11+=v1<<8;t12+=v2<<8;t13+=v3<<8;t14+=v4<<8;t15+=v5<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;v15=(t15+(t14>>>16))&65535;v14=t14&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*355;t1=v1*355;t2=v2*355;t3=v3*355;t4=v4*355;t5=v5*355;t6=v6*355;t7=v7*355;t8=v8*355;t9=v9*355;t10=v10*355;t11=v11*355;t12=v12*355;t13=v13*355;t14=v14*355;t15=v15*355;
						t10+=v0<<8;t11+=v1<<8;t12+=v2<<8;t13+=v3<<8;t14+=v4<<8;t15+=v5<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;v15=(t15+(t14>>>16))&65535;v14=t14&65535;
						v0^=(c&63)|128;
					}
					t0=v0*355;t1=v1*355;t2=v2*355;t3=v3*355;t4=v4*355;t5=v5*355;t6=v6*355;t7=v7*355;t8=v8*355;t9=v9*355;t10=v10*355;t11=v11*355;t12=v12*355;t13=v13*355;t14=v14*355;t15=v15*355;
					t10+=v0<<8;t11+=v1<<8;t12+=v2<<8;t13+=v3<<8;t14+=v4<<8;t15+=v5<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;v15=(t15+(t14>>>16))&65535;v14=t14&65535;
				}

				return hashValHex(hl[v15>>8]+hl[v15&255]+hl[v14>>8]+hl[v14&255]+hl[v13>>8]+hl[v13&255]+hl[v12>>8]+hl[v12&255]+hl[v11>>8]+hl[v11&255]+hl[v10>>8]+hl[v10&255]+hl[v9>>8]+hl[v9&255]+hl[v8>>8]+hl[v8&255]+hl[v7>>8]+hl[v7&255]+hl[v6>>8]+hl[v6&255]+hl[v5>>8]+hl[v5&255]+hl[v4>>8]+hl[v4&255]+hl[v3>>8]+hl[v3&255]+hl[v2>>8]+hl[v2&255]+hl[v1>>8]+hl[v1&255]+hl[v0>>8]+hl[v0&255],256);
			}

			function _hash256_1_utf(str){
				var c,i,l=str.length,s=fnvConstants[256].offset,t0=0,v0=s[15]|0,t1=0,v1=s[14]|0,t2=0,v2=s[13]|0,t3=0,v3=s[12]|0,t4=0,v4=s[11]|0,t5=0,v5=s[10]|0,t6=0,v6=s[9]|0,t7=0,v7=s[8]|0,t8=0,v8=s[7]|0,t9=0,v9=s[6]|0,t10=0,v10=s[5]|0,t11=0,v11=s[4]|0,t12=0,v12=s[3]|0,t13=0,v13=s[2]|0,t14=0,v14=s[1]|0,t15=0,v15=s[0]|0;

				for (i = 0; i < l; i++) {
					c = str.charCodeAt(i);
					t0=v0*355;t1=v1*355;t2=v2*355;t3=v3*355;t4=v4*355;t5=v5*355;t6=v6*355;t7=v7*355;t8=v8*355;t9=v9*355;t10=v10*355;t11=v11*355;t12=v12*355;t13=v13*355;t14=v14*355;t15=v15*355;
					t10+=v0<<8;t11+=v1<<8;t12+=v2<<8;t13+=v3<<8;t14+=v4<<8;t15+=v5<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;v15=(t15+(t14>>>16))&65535;v14=t14&65535;
					if(c < 128){
						v0^=c;
					}else if(c < 2048){
						v0^=(c>>6)|192;
						t0=v0*355;t1=v1*355;t2=v2*355;t3=v3*355;t4=v4*355;t5=v5*355;t6=v6*355;t7=v7*355;t8=v8*355;t9=v9*355;t10=v10*355;t11=v11*355;t12=v12*355;t13=v13*355;t14=v14*355;t15=v15*355;
						t10+=v0<<8;t11+=v1<<8;t12+=v2<<8;t13+=v3<<8;t14+=v4<<8;t15+=v5<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;v15=(t15+(t14>>>16))&65535;v14=t14&65535;
						v0^=(c&63)|128;
					}else if(((c&64512)==55296)&&(i+1)<l&&((str.charCodeAt(i+1)&64512)==56320)){
						c=65536+((c&1023)<<10)+(str.charCodeAt(++i)&1023);
						v0^=(c>>18)|240;
						t0=v0*355;t1=v1*355;t2=v2*355;t3=v3*355;t4=v4*355;t5=v5*355;t6=v6*355;t7=v7*355;t8=v8*355;t9=v9*355;t10=v10*355;t11=v11*355;t12=v12*355;t13=v13*355;t14=v14*355;t15=v15*355;
						t10+=v0<<8;t11+=v1<<8;t12+=v2<<8;t13+=v3<<8;t14+=v4<<8;t15+=v5<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;v15=(t15+(t14>>>16))&65535;v14=t14&65535;
						v0^=((c>>12)&63)|128;
						t0=v0*355;t1=v1*355;t2=v2*355;t3=v3*355;t4=v4*355;t5=v5*355;t6=v6*355;t7=v7*355;t8=v8*355;t9=v9*355;t10=v10*355;t11=v11*355;t12=v12*355;t13=v13*355;t14=v14*355;t15=v15*355;
						t10+=v0<<8;t11+=v1<<8;t12+=v2<<8;t13+=v3<<8;t14+=v4<<8;t15+=v5<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;v15=(t15+(t14>>>16))&65535;v14=t14&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*355;t1=v1*355;t2=v2*355;t3=v3*355;t4=v4*355;t5=v5*355;t6=v6*355;t7=v7*355;t8=v8*355;t9=v9*355;t10=v10*355;t11=v11*355;t12=v12*355;t13=v13*355;t14=v14*355;t15=v15*355;
						t10+=v0<<8;t11+=v1<<8;t12+=v2<<8;t13+=v3<<8;t14+=v4<<8;t15+=v5<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;v15=(t15+(t14>>>16))&65535;v14=t14&65535;
						v0^=(c&63)|128;
					}else {
						v0^=(c>>12)|224;
						t0=v0*355;t1=v1*355;t2=v2*355;t3=v3*355;t4=v4*355;t5=v5*355;t6=v6*355;t7=v7*355;t8=v8*355;t9=v9*355;t10=v10*355;t11=v11*355;t12=v12*355;t13=v13*355;t14=v14*355;t15=v15*355;
						t10+=v0<<8;t11+=v1<<8;t12+=v2<<8;t13+=v3<<8;t14+=v4<<8;t15+=v5<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;v15=(t15+(t14>>>16))&65535;v14=t14&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*355;t1=v1*355;t2=v2*355;t3=v3*355;t4=v4*355;t5=v5*355;t6=v6*355;t7=v7*355;t8=v8*355;t9=v9*355;t10=v10*355;t11=v11*355;t12=v12*355;t13=v13*355;t14=v14*355;t15=v15*355;
						t10+=v0<<8;t11+=v1<<8;t12+=v2<<8;t13+=v3<<8;t14+=v4<<8;t15+=v5<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;v15=(t15+(t14>>>16))&65535;v14=t14&65535;
						v0^=(c&63)|128;
					}
				}

				return hashValHex(hl[v15>>8]+hl[v15&255]+hl[v14>>8]+hl[v14&255]+hl[v13>>8]+hl[v13&255]+hl[v12>>8]+hl[v12&255]+hl[v11>>8]+hl[v11&255]+hl[v10>>8]+hl[v10&255]+hl[v9>>8]+hl[v9&255]+hl[v8>>8]+hl[v8&255]+hl[v7>>8]+hl[v7&255]+hl[v6>>8]+hl[v6&255]+hl[v5>>8]+hl[v5&255]+hl[v4>>8]+hl[v4&255]+hl[v3>>8]+hl[v3&255]+hl[v2>>8]+hl[v2&255]+hl[v1>>8]+hl[v1&255]+hl[v0>>8]+hl[v0&255],256);
			}

			_hash256 = _hash256_1a;

			function _hash512_1a(str){
				var i,l=str.length-3,s=fnvConstants[512].offset,t0=0,v0=s[31]|0,t1=0,v1=s[30]|0,t2=0,v2=s[29]|0,t3=0,v3=s[28]|0,t4=0,v4=s[27]|0,t5=0,v5=s[26]|0,t6=0,v6=s[25]|0,t7=0,v7=s[24]|0,t8=0,v8=s[23]|0,t9=0,v9=s[22]|0,t10=0,v10=s[21]|0,t11=0,v11=s[20]|0,t12=0,v12=s[19]|0,t13=0,v13=s[18]|0,t14=0,v14=s[17]|0,t15=0,v15=s[16]|0,t16=0,v16=s[15]|0,t17=0,v17=s[14]|0,t18=0,v18=s[13]|0,t19=0,v19=s[12]|0,t20=0,v20=s[11]|0,t21=0,v21=s[10]|0,t22=0,v22=s[9]|0,t23=0,v23=s[8]|0,t24=0,v24=s[7]|0,t25=0,v25=s[6]|0,t26=0,v26=s[5]|0,t27=0,v27=s[4]|0,t28=0,v28=s[3]|0,t29=0,v29=s[2]|0,t30=0,v30=s[1]|0,t31=0,v31=s[0]|0;

				for (i = 0; i < l;) {
					v0^=str.charCodeAt(i++);
					t0=v0*343;t1=v1*343;t2=v2*343;t3=v3*343;t4=v4*343;t5=v5*343;t6=v6*343;t7=v7*343;t8=v8*343;t9=v9*343;t10=v10*343;t11=v11*343;t12=v12*343;t13=v13*343;t14=v14*343;t15=v15*343;t16=v16*343;t17=v17*343;t18=v18*343;t19=v19*343;t20=v20*343;t21=v21*343;t22=v22*343;t23=v23*343;t24=v24*343;t25=v25*343;t26=v26*343;t27=v27*343;t28=v28*343;t29=v29*343;t30=v30*343;t31=v31*343;
					t21+=v0<<8;t22+=v1<<8;t23+=v2<<8;t24+=v3<<8;t25+=v4<<8;t26+=v5<<8;t27+=v6<<8;t28+=v7<<8;t29+=v8<<8;t30+=v9<<8;t31+=v10<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;v31=(t31+(t30>>>16))&65535;v30=t30&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*343;t1=v1*343;t2=v2*343;t3=v3*343;t4=v4*343;t5=v5*343;t6=v6*343;t7=v7*343;t8=v8*343;t9=v9*343;t10=v10*343;t11=v11*343;t12=v12*343;t13=v13*343;t14=v14*343;t15=v15*343;t16=v16*343;t17=v17*343;t18=v18*343;t19=v19*343;t20=v20*343;t21=v21*343;t22=v22*343;t23=v23*343;t24=v24*343;t25=v25*343;t26=v26*343;t27=v27*343;t28=v28*343;t29=v29*343;t30=v30*343;t31=v31*343;
					t21+=v0<<8;t22+=v1<<8;t23+=v2<<8;t24+=v3<<8;t25+=v4<<8;t26+=v5<<8;t27+=v6<<8;t28+=v7<<8;t29+=v8<<8;t30+=v9<<8;t31+=v10<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;v31=(t31+(t30>>>16))&65535;v30=t30&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*343;t1=v1*343;t2=v2*343;t3=v3*343;t4=v4*343;t5=v5*343;t6=v6*343;t7=v7*343;t8=v8*343;t9=v9*343;t10=v10*343;t11=v11*343;t12=v12*343;t13=v13*343;t14=v14*343;t15=v15*343;t16=v16*343;t17=v17*343;t18=v18*343;t19=v19*343;t20=v20*343;t21=v21*343;t22=v22*343;t23=v23*343;t24=v24*343;t25=v25*343;t26=v26*343;t27=v27*343;t28=v28*343;t29=v29*343;t30=v30*343;t31=v31*343;
					t21+=v0<<8;t22+=v1<<8;t23+=v2<<8;t24+=v3<<8;t25+=v4<<8;t26+=v5<<8;t27+=v6<<8;t28+=v7<<8;t29+=v8<<8;t30+=v9<<8;t31+=v10<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;v31=(t31+(t30>>>16))&65535;v30=t30&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*343;t1=v1*343;t2=v2*343;t3=v3*343;t4=v4*343;t5=v5*343;t6=v6*343;t7=v7*343;t8=v8*343;t9=v9*343;t10=v10*343;t11=v11*343;t12=v12*343;t13=v13*343;t14=v14*343;t15=v15*343;t16=v16*343;t17=v17*343;t18=v18*343;t19=v19*343;t20=v20*343;t21=v21*343;t22=v22*343;t23=v23*343;t24=v24*343;t25=v25*343;t26=v26*343;t27=v27*343;t28=v28*343;t29=v29*343;t30=v30*343;t31=v31*343;
					t21+=v0<<8;t22+=v1<<8;t23+=v2<<8;t24+=v3<<8;t25+=v4<<8;t26+=v5<<8;t27+=v6<<8;t28+=v7<<8;t29+=v8<<8;t30+=v9<<8;t31+=v10<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;v31=(t31+(t30>>>16))&65535;v30=t30&65535;
				}

				while(i<l+3){
					v0^=str.charCodeAt(i++);
					t0=v0*343;t1=v1*343;t2=v2*343;t3=v3*343;t4=v4*343;t5=v5*343;t6=v6*343;t7=v7*343;t8=v8*343;t9=v9*343;t10=v10*343;t11=v11*343;t12=v12*343;t13=v13*343;t14=v14*343;t15=v15*343;t16=v16*343;t17=v17*343;t18=v18*343;t19=v19*343;t20=v20*343;t21=v21*343;t22=v22*343;t23=v23*343;t24=v24*343;t25=v25*343;t26=v26*343;t27=v27*343;t28=v28*343;t29=v29*343;t30=v30*343;t31=v31*343;
					t21+=v0<<8;t22+=v1<<8;t23+=v2<<8;t24+=v3<<8;t25+=v4<<8;t26+=v5<<8;t27+=v6<<8;t28+=v7<<8;t29+=v8<<8;t30+=v9<<8;t31+=v10<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;v31=(t31+(t30>>>16))&65535;v30=t30&65535;
				}

				return hashValHex(hl[v31>>8]+hl[v31&255]+hl[v30>>8]+hl[v30&255]+hl[v29>>8]+hl[v29&255]+hl[v28>>8]+hl[v28&255]+hl[v27>>8]+hl[v27&255]+hl[v26>>8]+hl[v26&255]+hl[v25>>8]+hl[v25&255]+hl[v24>>8]+hl[v24&255]+hl[v23>>8]+hl[v23&255]+hl[v22>>8]+hl[v22&255]+hl[v21>>8]+hl[v21&255]+hl[v20>>8]+hl[v20&255]+hl[v19>>8]+hl[v19&255]+hl[v18>>8]+hl[v18&255]+hl[v17>>8]+hl[v17&255]+hl[v16>>8]+hl[v16&255]+hl[v15>>8]+hl[v15&255]+hl[v14>>8]+hl[v14&255]+hl[v13>>8]+hl[v13&255]+hl[v12>>8]+hl[v12&255]+hl[v11>>8]+hl[v11&255]+hl[v10>>8]+hl[v10&255]+hl[v9>>8]+hl[v9&255]+hl[v8>>8]+hl[v8&255]+hl[v7>>8]+hl[v7&255]+hl[v6>>8]+hl[v6&255]+hl[v5>>8]+hl[v5&255]+hl[v4>>8]+hl[v4&255]+hl[v3>>8]+hl[v3&255]+hl[v2>>8]+hl[v2&255]+hl[v1>>8]+hl[v1&255]+hl[v0>>8]+hl[v0&255],512);
			}

			function _hash512_1(str){
				var i,l=str.length-3,s=fnvConstants[512].offset,t0=0,v0=s[31]|0,t1=0,v1=s[30]|0,t2=0,v2=s[29]|0,t3=0,v3=s[28]|0,t4=0,v4=s[27]|0,t5=0,v5=s[26]|0,t6=0,v6=s[25]|0,t7=0,v7=s[24]|0,t8=0,v8=s[23]|0,t9=0,v9=s[22]|0,t10=0,v10=s[21]|0,t11=0,v11=s[20]|0,t12=0,v12=s[19]|0,t13=0,v13=s[18]|0,t14=0,v14=s[17]|0,t15=0,v15=s[16]|0,t16=0,v16=s[15]|0,t17=0,v17=s[14]|0,t18=0,v18=s[13]|0,t19=0,v19=s[12]|0,t20=0,v20=s[11]|0,t21=0,v21=s[10]|0,t22=0,v22=s[9]|0,t23=0,v23=s[8]|0,t24=0,v24=s[7]|0,t25=0,v25=s[6]|0,t26=0,v26=s[5]|0,t27=0,v27=s[4]|0,t28=0,v28=s[3]|0,t29=0,v29=s[2]|0,t30=0,v30=s[1]|0,t31=0,v31=s[0]|0;

				for (i = 0; i < l;) {
					t0=v0*343;t1=v1*343;t2=v2*343;t3=v3*343;t4=v4*343;t5=v5*343;t6=v6*343;t7=v7*343;t8=v8*343;t9=v9*343;t10=v10*343;t11=v11*343;t12=v12*343;t13=v13*343;t14=v14*343;t15=v15*343;t16=v16*343;t17=v17*343;t18=v18*343;t19=v19*343;t20=v20*343;t21=v21*343;t22=v22*343;t23=v23*343;t24=v24*343;t25=v25*343;t26=v26*343;t27=v27*343;t28=v28*343;t29=v29*343;t30=v30*343;t31=v31*343;
					t21+=v0<<8;t22+=v1<<8;t23+=v2<<8;t24+=v3<<8;t25+=v4<<8;t26+=v5<<8;t27+=v6<<8;t28+=v7<<8;t29+=v8<<8;t30+=v9<<8;t31+=v10<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;v31=(t31+(t30>>>16))&65535;v30=t30&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*343;t1=v1*343;t2=v2*343;t3=v3*343;t4=v4*343;t5=v5*343;t6=v6*343;t7=v7*343;t8=v8*343;t9=v9*343;t10=v10*343;t11=v11*343;t12=v12*343;t13=v13*343;t14=v14*343;t15=v15*343;t16=v16*343;t17=v17*343;t18=v18*343;t19=v19*343;t20=v20*343;t21=v21*343;t22=v22*343;t23=v23*343;t24=v24*343;t25=v25*343;t26=v26*343;t27=v27*343;t28=v28*343;t29=v29*343;t30=v30*343;t31=v31*343;
					t21+=v0<<8;t22+=v1<<8;t23+=v2<<8;t24+=v3<<8;t25+=v4<<8;t26+=v5<<8;t27+=v6<<8;t28+=v7<<8;t29+=v8<<8;t30+=v9<<8;t31+=v10<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;v31=(t31+(t30>>>16))&65535;v30=t30&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*343;t1=v1*343;t2=v2*343;t3=v3*343;t4=v4*343;t5=v5*343;t6=v6*343;t7=v7*343;t8=v8*343;t9=v9*343;t10=v10*343;t11=v11*343;t12=v12*343;t13=v13*343;t14=v14*343;t15=v15*343;t16=v16*343;t17=v17*343;t18=v18*343;t19=v19*343;t20=v20*343;t21=v21*343;t22=v22*343;t23=v23*343;t24=v24*343;t25=v25*343;t26=v26*343;t27=v27*343;t28=v28*343;t29=v29*343;t30=v30*343;t31=v31*343;
					t21+=v0<<8;t22+=v1<<8;t23+=v2<<8;t24+=v3<<8;t25+=v4<<8;t26+=v5<<8;t27+=v6<<8;t28+=v7<<8;t29+=v8<<8;t30+=v9<<8;t31+=v10<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;v31=(t31+(t30>>>16))&65535;v30=t30&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*343;t1=v1*343;t2=v2*343;t3=v3*343;t4=v4*343;t5=v5*343;t6=v6*343;t7=v7*343;t8=v8*343;t9=v9*343;t10=v10*343;t11=v11*343;t12=v12*343;t13=v13*343;t14=v14*343;t15=v15*343;t16=v16*343;t17=v17*343;t18=v18*343;t19=v19*343;t20=v20*343;t21=v21*343;t22=v22*343;t23=v23*343;t24=v24*343;t25=v25*343;t26=v26*343;t27=v27*343;t28=v28*343;t29=v29*343;t30=v30*343;t31=v31*343;
					t21+=v0<<8;t22+=v1<<8;t23+=v2<<8;t24+=v3<<8;t25+=v4<<8;t26+=v5<<8;t27+=v6<<8;t28+=v7<<8;t29+=v8<<8;t30+=v9<<8;t31+=v10<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;v31=(t31+(t30>>>16))&65535;v30=t30&65535;
					v0^=str.charCodeAt(i++);
				}

				while(i<l+3){
					t0=v0*343;t1=v1*343;t2=v2*343;t3=v3*343;t4=v4*343;t5=v5*343;t6=v6*343;t7=v7*343;t8=v8*343;t9=v9*343;t10=v10*343;t11=v11*343;t12=v12*343;t13=v13*343;t14=v14*343;t15=v15*343;t16=v16*343;t17=v17*343;t18=v18*343;t19=v19*343;t20=v20*343;t21=v21*343;t22=v22*343;t23=v23*343;t24=v24*343;t25=v25*343;t26=v26*343;t27=v27*343;t28=v28*343;t29=v29*343;t30=v30*343;t31=v31*343;
					t21+=v0<<8;t22+=v1<<8;t23+=v2<<8;t24+=v3<<8;t25+=v4<<8;t26+=v5<<8;t27+=v6<<8;t28+=v7<<8;t29+=v8<<8;t30+=v9<<8;t31+=v10<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;v31=(t31+(t30>>>16))&65535;v30=t30&65535;
					v0^=str.charCodeAt(i++);
				}

				return hashValHex(hl[v31>>8]+hl[v31&255]+hl[v30>>8]+hl[v30&255]+hl[v29>>8]+hl[v29&255]+hl[v28>>8]+hl[v28&255]+hl[v27>>8]+hl[v27&255]+hl[v26>>8]+hl[v26&255]+hl[v25>>8]+hl[v25&255]+hl[v24>>8]+hl[v24&255]+hl[v23>>8]+hl[v23&255]+hl[v22>>8]+hl[v22&255]+hl[v21>>8]+hl[v21&255]+hl[v20>>8]+hl[v20&255]+hl[v19>>8]+hl[v19&255]+hl[v18>>8]+hl[v18&255]+hl[v17>>8]+hl[v17&255]+hl[v16>>8]+hl[v16&255]+hl[v15>>8]+hl[v15&255]+hl[v14>>8]+hl[v14&255]+hl[v13>>8]+hl[v13&255]+hl[v12>>8]+hl[v12&255]+hl[v11>>8]+hl[v11&255]+hl[v10>>8]+hl[v10&255]+hl[v9>>8]+hl[v9&255]+hl[v8>>8]+hl[v8&255]+hl[v7>>8]+hl[v7&255]+hl[v6>>8]+hl[v6&255]+hl[v5>>8]+hl[v5&255]+hl[v4>>8]+hl[v4&255]+hl[v3>>8]+hl[v3&255]+hl[v2>>8]+hl[v2&255]+hl[v1>>8]+hl[v1&255]+hl[v0>>8]+hl[v0&255],512);
			}

			function _hash512_1a_utf(str){
				var c,i,l=str.length,s=fnvConstants[512].offset,t0=0,v0=s[31]|0,t1=0,v1=s[30]|0,t2=0,v2=s[29]|0,t3=0,v3=s[28]|0,t4=0,v4=s[27]|0,t5=0,v5=s[26]|0,t6=0,v6=s[25]|0,t7=0,v7=s[24]|0,t8=0,v8=s[23]|0,t9=0,v9=s[22]|0,t10=0,v10=s[21]|0,t11=0,v11=s[20]|0,t12=0,v12=s[19]|0,t13=0,v13=s[18]|0,t14=0,v14=s[17]|0,t15=0,v15=s[16]|0,t16=0,v16=s[15]|0,t17=0,v17=s[14]|0,t18=0,v18=s[13]|0,t19=0,v19=s[12]|0,t20=0,v20=s[11]|0,t21=0,v21=s[10]|0,t22=0,v22=s[9]|0,t23=0,v23=s[8]|0,t24=0,v24=s[7]|0,t25=0,v25=s[6]|0,t26=0,v26=s[5]|0,t27=0,v27=s[4]|0,t28=0,v28=s[3]|0,t29=0,v29=s[2]|0,t30=0,v30=s[1]|0,t31=0,v31=s[0]|0;

				for (i = 0; i < l; i++) {
					c = str.charCodeAt(i);
					if(c < 128){
						v0^=c;
					}else if(c < 2048){
						v0^=(c>>6)|192;
						t0=v0*343;t1=v1*343;t2=v2*343;t3=v3*343;t4=v4*343;t5=v5*343;t6=v6*343;t7=v7*343;t8=v8*343;t9=v9*343;t10=v10*343;t11=v11*343;t12=v12*343;t13=v13*343;t14=v14*343;t15=v15*343;t16=v16*343;t17=v17*343;t18=v18*343;t19=v19*343;t20=v20*343;t21=v21*343;t22=v22*343;t23=v23*343;t24=v24*343;t25=v25*343;t26=v26*343;t27=v27*343;t28=v28*343;t29=v29*343;t30=v30*343;t31=v31*343;
						t21+=v0<<8;t22+=v1<<8;t23+=v2<<8;t24+=v3<<8;t25+=v4<<8;t26+=v5<<8;t27+=v6<<8;t28+=v7<<8;t29+=v8<<8;t30+=v9<<8;t31+=v10<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;v31=(t31+(t30>>>16))&65535;v30=t30&65535;
						v0^=(c&63)|128;
					}else if(((c&64512)==55296)&&(i+1)<l&&((str.charCodeAt(i+1)&64512)==56320)){
						c=65536+((c&1023)<<10)+(str.charCodeAt(++i)&1023);
						v0^=(c>>18)|240;
						t0=v0*343;t1=v1*343;t2=v2*343;t3=v3*343;t4=v4*343;t5=v5*343;t6=v6*343;t7=v7*343;t8=v8*343;t9=v9*343;t10=v10*343;t11=v11*343;t12=v12*343;t13=v13*343;t14=v14*343;t15=v15*343;t16=v16*343;t17=v17*343;t18=v18*343;t19=v19*343;t20=v20*343;t21=v21*343;t22=v22*343;t23=v23*343;t24=v24*343;t25=v25*343;t26=v26*343;t27=v27*343;t28=v28*343;t29=v29*343;t30=v30*343;t31=v31*343;
						t21+=v0<<8;t22+=v1<<8;t23+=v2<<8;t24+=v3<<8;t25+=v4<<8;t26+=v5<<8;t27+=v6<<8;t28+=v7<<8;t29+=v8<<8;t30+=v9<<8;t31+=v10<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;v31=(t31+(t30>>>16))&65535;v30=t30&65535;
						v0^=((c>>12)&63)|128;
						t0=v0*343;t1=v1*343;t2=v2*343;t3=v3*343;t4=v4*343;t5=v5*343;t6=v6*343;t7=v7*343;t8=v8*343;t9=v9*343;t10=v10*343;t11=v11*343;t12=v12*343;t13=v13*343;t14=v14*343;t15=v15*343;t16=v16*343;t17=v17*343;t18=v18*343;t19=v19*343;t20=v20*343;t21=v21*343;t22=v22*343;t23=v23*343;t24=v24*343;t25=v25*343;t26=v26*343;t27=v27*343;t28=v28*343;t29=v29*343;t30=v30*343;t31=v31*343;
						t21+=v0<<8;t22+=v1<<8;t23+=v2<<8;t24+=v3<<8;t25+=v4<<8;t26+=v5<<8;t27+=v6<<8;t28+=v7<<8;t29+=v8<<8;t30+=v9<<8;t31+=v10<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;v31=(t31+(t30>>>16))&65535;v30=t30&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*343;t1=v1*343;t2=v2*343;t3=v3*343;t4=v4*343;t5=v5*343;t6=v6*343;t7=v7*343;t8=v8*343;t9=v9*343;t10=v10*343;t11=v11*343;t12=v12*343;t13=v13*343;t14=v14*343;t15=v15*343;t16=v16*343;t17=v17*343;t18=v18*343;t19=v19*343;t20=v20*343;t21=v21*343;t22=v22*343;t23=v23*343;t24=v24*343;t25=v25*343;t26=v26*343;t27=v27*343;t28=v28*343;t29=v29*343;t30=v30*343;t31=v31*343;
						t21+=v0<<8;t22+=v1<<8;t23+=v2<<8;t24+=v3<<8;t25+=v4<<8;t26+=v5<<8;t27+=v6<<8;t28+=v7<<8;t29+=v8<<8;t30+=v9<<8;t31+=v10<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;v31=(t31+(t30>>>16))&65535;v30=t30&65535;
						v0^=(c&63)|128;
					}else {
						v0^=(c>>12)|224;
						t0=v0*343;t1=v1*343;t2=v2*343;t3=v3*343;t4=v4*343;t5=v5*343;t6=v6*343;t7=v7*343;t8=v8*343;t9=v9*343;t10=v10*343;t11=v11*343;t12=v12*343;t13=v13*343;t14=v14*343;t15=v15*343;t16=v16*343;t17=v17*343;t18=v18*343;t19=v19*343;t20=v20*343;t21=v21*343;t22=v22*343;t23=v23*343;t24=v24*343;t25=v25*343;t26=v26*343;t27=v27*343;t28=v28*343;t29=v29*343;t30=v30*343;t31=v31*343;
						t21+=v0<<8;t22+=v1<<8;t23+=v2<<8;t24+=v3<<8;t25+=v4<<8;t26+=v5<<8;t27+=v6<<8;t28+=v7<<8;t29+=v8<<8;t30+=v9<<8;t31+=v10<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;v31=(t31+(t30>>>16))&65535;v30=t30&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*343;t1=v1*343;t2=v2*343;t3=v3*343;t4=v4*343;t5=v5*343;t6=v6*343;t7=v7*343;t8=v8*343;t9=v9*343;t10=v10*343;t11=v11*343;t12=v12*343;t13=v13*343;t14=v14*343;t15=v15*343;t16=v16*343;t17=v17*343;t18=v18*343;t19=v19*343;t20=v20*343;t21=v21*343;t22=v22*343;t23=v23*343;t24=v24*343;t25=v25*343;t26=v26*343;t27=v27*343;t28=v28*343;t29=v29*343;t30=v30*343;t31=v31*343;
						t21+=v0<<8;t22+=v1<<8;t23+=v2<<8;t24+=v3<<8;t25+=v4<<8;t26+=v5<<8;t27+=v6<<8;t28+=v7<<8;t29+=v8<<8;t30+=v9<<8;t31+=v10<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;v31=(t31+(t30>>>16))&65535;v30=t30&65535;
						v0^=(c&63)|128;
					}
					t0=v0*343;t1=v1*343;t2=v2*343;t3=v3*343;t4=v4*343;t5=v5*343;t6=v6*343;t7=v7*343;t8=v8*343;t9=v9*343;t10=v10*343;t11=v11*343;t12=v12*343;t13=v13*343;t14=v14*343;t15=v15*343;t16=v16*343;t17=v17*343;t18=v18*343;t19=v19*343;t20=v20*343;t21=v21*343;t22=v22*343;t23=v23*343;t24=v24*343;t25=v25*343;t26=v26*343;t27=v27*343;t28=v28*343;t29=v29*343;t30=v30*343;t31=v31*343;
					t21+=v0<<8;t22+=v1<<8;t23+=v2<<8;t24+=v3<<8;t25+=v4<<8;t26+=v5<<8;t27+=v6<<8;t28+=v7<<8;t29+=v8<<8;t30+=v9<<8;t31+=v10<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;v31=(t31+(t30>>>16))&65535;v30=t30&65535;
				}

				return hashValHex(hl[v31>>8]+hl[v31&255]+hl[v30>>8]+hl[v30&255]+hl[v29>>8]+hl[v29&255]+hl[v28>>8]+hl[v28&255]+hl[v27>>8]+hl[v27&255]+hl[v26>>8]+hl[v26&255]+hl[v25>>8]+hl[v25&255]+hl[v24>>8]+hl[v24&255]+hl[v23>>8]+hl[v23&255]+hl[v22>>8]+hl[v22&255]+hl[v21>>8]+hl[v21&255]+hl[v20>>8]+hl[v20&255]+hl[v19>>8]+hl[v19&255]+hl[v18>>8]+hl[v18&255]+hl[v17>>8]+hl[v17&255]+hl[v16>>8]+hl[v16&255]+hl[v15>>8]+hl[v15&255]+hl[v14>>8]+hl[v14&255]+hl[v13>>8]+hl[v13&255]+hl[v12>>8]+hl[v12&255]+hl[v11>>8]+hl[v11&255]+hl[v10>>8]+hl[v10&255]+hl[v9>>8]+hl[v9&255]+hl[v8>>8]+hl[v8&255]+hl[v7>>8]+hl[v7&255]+hl[v6>>8]+hl[v6&255]+hl[v5>>8]+hl[v5&255]+hl[v4>>8]+hl[v4&255]+hl[v3>>8]+hl[v3&255]+hl[v2>>8]+hl[v2&255]+hl[v1>>8]+hl[v1&255]+hl[v0>>8]+hl[v0&255],512);
			}

			function _hash512_1_utf(str){
				var c,i,l=str.length,s=fnvConstants[512].offset,t0=0,v0=s[31]|0,t1=0,v1=s[30]|0,t2=0,v2=s[29]|0,t3=0,v3=s[28]|0,t4=0,v4=s[27]|0,t5=0,v5=s[26]|0,t6=0,v6=s[25]|0,t7=0,v7=s[24]|0,t8=0,v8=s[23]|0,t9=0,v9=s[22]|0,t10=0,v10=s[21]|0,t11=0,v11=s[20]|0,t12=0,v12=s[19]|0,t13=0,v13=s[18]|0,t14=0,v14=s[17]|0,t15=0,v15=s[16]|0,t16=0,v16=s[15]|0,t17=0,v17=s[14]|0,t18=0,v18=s[13]|0,t19=0,v19=s[12]|0,t20=0,v20=s[11]|0,t21=0,v21=s[10]|0,t22=0,v22=s[9]|0,t23=0,v23=s[8]|0,t24=0,v24=s[7]|0,t25=0,v25=s[6]|0,t26=0,v26=s[5]|0,t27=0,v27=s[4]|0,t28=0,v28=s[3]|0,t29=0,v29=s[2]|0,t30=0,v30=s[1]|0,t31=0,v31=s[0]|0;

				for (i = 0; i < l; i++) {
					c = str.charCodeAt(i);
					t0=v0*343;t1=v1*343;t2=v2*343;t3=v3*343;t4=v4*343;t5=v5*343;t6=v6*343;t7=v7*343;t8=v8*343;t9=v9*343;t10=v10*343;t11=v11*343;t12=v12*343;t13=v13*343;t14=v14*343;t15=v15*343;t16=v16*343;t17=v17*343;t18=v18*343;t19=v19*343;t20=v20*343;t21=v21*343;t22=v22*343;t23=v23*343;t24=v24*343;t25=v25*343;t26=v26*343;t27=v27*343;t28=v28*343;t29=v29*343;t30=v30*343;t31=v31*343;
					t21+=v0<<8;t22+=v1<<8;t23+=v2<<8;t24+=v3<<8;t25+=v4<<8;t26+=v5<<8;t27+=v6<<8;t28+=v7<<8;t29+=v8<<8;t30+=v9<<8;t31+=v10<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;v31=(t31+(t30>>>16))&65535;v30=t30&65535;
					if(c < 128){
						v0^=c;
					}else if(c < 2048){
						v0^=(c>>6)|192;
						t0=v0*343;t1=v1*343;t2=v2*343;t3=v3*343;t4=v4*343;t5=v5*343;t6=v6*343;t7=v7*343;t8=v8*343;t9=v9*343;t10=v10*343;t11=v11*343;t12=v12*343;t13=v13*343;t14=v14*343;t15=v15*343;t16=v16*343;t17=v17*343;t18=v18*343;t19=v19*343;t20=v20*343;t21=v21*343;t22=v22*343;t23=v23*343;t24=v24*343;t25=v25*343;t26=v26*343;t27=v27*343;t28=v28*343;t29=v29*343;t30=v30*343;t31=v31*343;
						t21+=v0<<8;t22+=v1<<8;t23+=v2<<8;t24+=v3<<8;t25+=v4<<8;t26+=v5<<8;t27+=v6<<8;t28+=v7<<8;t29+=v8<<8;t30+=v9<<8;t31+=v10<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;v31=(t31+(t30>>>16))&65535;v30=t30&65535;
						v0^=(c&63)|128;
					}else if(((c&64512)==55296)&&(i+1)<l&&((str.charCodeAt(i+1)&64512)==56320)){
						c=65536+((c&1023)<<10)+(str.charCodeAt(++i)&1023);
						v0^=(c>>18)|240;
						t0=v0*343;t1=v1*343;t2=v2*343;t3=v3*343;t4=v4*343;t5=v5*343;t6=v6*343;t7=v7*343;t8=v8*343;t9=v9*343;t10=v10*343;t11=v11*343;t12=v12*343;t13=v13*343;t14=v14*343;t15=v15*343;t16=v16*343;t17=v17*343;t18=v18*343;t19=v19*343;t20=v20*343;t21=v21*343;t22=v22*343;t23=v23*343;t24=v24*343;t25=v25*343;t26=v26*343;t27=v27*343;t28=v28*343;t29=v29*343;t30=v30*343;t31=v31*343;
						t21+=v0<<8;t22+=v1<<8;t23+=v2<<8;t24+=v3<<8;t25+=v4<<8;t26+=v5<<8;t27+=v6<<8;t28+=v7<<8;t29+=v8<<8;t30+=v9<<8;t31+=v10<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;v31=(t31+(t30>>>16))&65535;v30=t30&65535;
						v0^=((c>>12)&63)|128;
						t0=v0*343;t1=v1*343;t2=v2*343;t3=v3*343;t4=v4*343;t5=v5*343;t6=v6*343;t7=v7*343;t8=v8*343;t9=v9*343;t10=v10*343;t11=v11*343;t12=v12*343;t13=v13*343;t14=v14*343;t15=v15*343;t16=v16*343;t17=v17*343;t18=v18*343;t19=v19*343;t20=v20*343;t21=v21*343;t22=v22*343;t23=v23*343;t24=v24*343;t25=v25*343;t26=v26*343;t27=v27*343;t28=v28*343;t29=v29*343;t30=v30*343;t31=v31*343;
						t21+=v0<<8;t22+=v1<<8;t23+=v2<<8;t24+=v3<<8;t25+=v4<<8;t26+=v5<<8;t27+=v6<<8;t28+=v7<<8;t29+=v8<<8;t30+=v9<<8;t31+=v10<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;v31=(t31+(t30>>>16))&65535;v30=t30&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*343;t1=v1*343;t2=v2*343;t3=v3*343;t4=v4*343;t5=v5*343;t6=v6*343;t7=v7*343;t8=v8*343;t9=v9*343;t10=v10*343;t11=v11*343;t12=v12*343;t13=v13*343;t14=v14*343;t15=v15*343;t16=v16*343;t17=v17*343;t18=v18*343;t19=v19*343;t20=v20*343;t21=v21*343;t22=v22*343;t23=v23*343;t24=v24*343;t25=v25*343;t26=v26*343;t27=v27*343;t28=v28*343;t29=v29*343;t30=v30*343;t31=v31*343;
						t21+=v0<<8;t22+=v1<<8;t23+=v2<<8;t24+=v3<<8;t25+=v4<<8;t26+=v5<<8;t27+=v6<<8;t28+=v7<<8;t29+=v8<<8;t30+=v9<<8;t31+=v10<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;v31=(t31+(t30>>>16))&65535;v30=t30&65535;
						v0^=(c&63)|128;
					}else {
						v0^=(c>>12)|224;
						t0=v0*343;t1=v1*343;t2=v2*343;t3=v3*343;t4=v4*343;t5=v5*343;t6=v6*343;t7=v7*343;t8=v8*343;t9=v9*343;t10=v10*343;t11=v11*343;t12=v12*343;t13=v13*343;t14=v14*343;t15=v15*343;t16=v16*343;t17=v17*343;t18=v18*343;t19=v19*343;t20=v20*343;t21=v21*343;t22=v22*343;t23=v23*343;t24=v24*343;t25=v25*343;t26=v26*343;t27=v27*343;t28=v28*343;t29=v29*343;t30=v30*343;t31=v31*343;
						t21+=v0<<8;t22+=v1<<8;t23+=v2<<8;t24+=v3<<8;t25+=v4<<8;t26+=v5<<8;t27+=v6<<8;t28+=v7<<8;t29+=v8<<8;t30+=v9<<8;t31+=v10<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;v31=(t31+(t30>>>16))&65535;v30=t30&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*343;t1=v1*343;t2=v2*343;t3=v3*343;t4=v4*343;t5=v5*343;t6=v6*343;t7=v7*343;t8=v8*343;t9=v9*343;t10=v10*343;t11=v11*343;t12=v12*343;t13=v13*343;t14=v14*343;t15=v15*343;t16=v16*343;t17=v17*343;t18=v18*343;t19=v19*343;t20=v20*343;t21=v21*343;t22=v22*343;t23=v23*343;t24=v24*343;t25=v25*343;t26=v26*343;t27=v27*343;t28=v28*343;t29=v29*343;t30=v30*343;t31=v31*343;
						t21+=v0<<8;t22+=v1<<8;t23+=v2<<8;t24+=v3<<8;t25+=v4<<8;t26+=v5<<8;t27+=v6<<8;t28+=v7<<8;t29+=v8<<8;t30+=v9<<8;t31+=v10<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;v31=(t31+(t30>>>16))&65535;v30=t30&65535;
						v0^=(c&63)|128;
					}
				}

				return hashValHex(hl[v31>>8]+hl[v31&255]+hl[v30>>8]+hl[v30&255]+hl[v29>>8]+hl[v29&255]+hl[v28>>8]+hl[v28&255]+hl[v27>>8]+hl[v27&255]+hl[v26>>8]+hl[v26&255]+hl[v25>>8]+hl[v25&255]+hl[v24>>8]+hl[v24&255]+hl[v23>>8]+hl[v23&255]+hl[v22>>8]+hl[v22&255]+hl[v21>>8]+hl[v21&255]+hl[v20>>8]+hl[v20&255]+hl[v19>>8]+hl[v19&255]+hl[v18>>8]+hl[v18&255]+hl[v17>>8]+hl[v17&255]+hl[v16>>8]+hl[v16&255]+hl[v15>>8]+hl[v15&255]+hl[v14>>8]+hl[v14&255]+hl[v13>>8]+hl[v13&255]+hl[v12>>8]+hl[v12&255]+hl[v11>>8]+hl[v11&255]+hl[v10>>8]+hl[v10&255]+hl[v9>>8]+hl[v9&255]+hl[v8>>8]+hl[v8&255]+hl[v7>>8]+hl[v7&255]+hl[v6>>8]+hl[v6&255]+hl[v5>>8]+hl[v5&255]+hl[v4>>8]+hl[v4&255]+hl[v3>>8]+hl[v3&255]+hl[v2>>8]+hl[v2&255]+hl[v1>>8]+hl[v1&255]+hl[v0>>8]+hl[v0&255],512);
			}

			_hash512 = _hash512_1a;

			function _hash1024_1a(str){
				var i,l=str.length-3,s=fnvConstants[1024].offset,t0=0,v0=s[63]|0,t1=0,v1=s[62]|0,t2=0,v2=s[61]|0,t3=0,v3=s[60]|0,t4=0,v4=s[59]|0,t5=0,v5=s[58]|0,t6=0,v6=s[57]|0,t7=0,v7=s[56]|0,t8=0,v8=s[55]|0,t9=0,v9=s[54]|0,t10=0,v10=s[53]|0,t11=0,v11=s[52]|0,t12=0,v12=s[51]|0,t13=0,v13=s[50]|0,t14=0,v14=s[49]|0,t15=0,v15=s[48]|0,t16=0,v16=s[47]|0,t17=0,v17=s[46]|0,t18=0,v18=s[45]|0,t19=0,v19=s[44]|0,t20=0,v20=s[43]|0,t21=0,v21=s[42]|0,t22=0,v22=s[41]|0,t23=0,v23=s[40]|0,t24=0,v24=s[39]|0,t25=0,v25=s[38]|0,t26=0,v26=s[37]|0,t27=0,v27=s[36]|0,t28=0,v28=s[35]|0,t29=0,v29=s[34]|0,t30=0,v30=s[33]|0,t31=0,v31=s[32]|0,t32=0,v32=s[31]|0,t33=0,v33=s[30]|0,t34=0,v34=s[29]|0,t35=0,v35=s[28]|0,t36=0,v36=s[27]|0,t37=0,v37=s[26]|0,t38=0,v38=s[25]|0,t39=0,v39=s[24]|0,t40=0,v40=s[23]|0,t41=0,v41=s[22]|0,t42=0,v42=s[21]|0,t43=0,v43=s[20]|0,t44=0,v44=s[19]|0,t45=0,v45=s[18]|0,t46=0,v46=s[17]|0,t47=0,v47=s[16]|0,t48=0,v48=s[15]|0,t49=0,v49=s[14]|0,t50=0,v50=s[13]|0,t51=0,v51=s[12]|0,t52=0,v52=s[11]|0,t53=0,v53=s[10]|0,t54=0,v54=s[9]|0,t55=0,v55=s[8]|0,t56=0,v56=s[7]|0,t57=0,v57=s[6]|0,t58=0,v58=s[5]|0,t59=0,v59=s[4]|0,t60=0,v60=s[3]|0,t61=0,v61=s[2]|0,t62=0,v62=s[1]|0,t63=0,v63=s[0]|0;

				for (i = 0; i < l;) {
					v0^=str.charCodeAt(i++);
					t0=v0*397;t1=v1*397;t2=v2*397;t3=v3*397;t4=v4*397;t5=v5*397;t6=v6*397;t7=v7*397;t8=v8*397;t9=v9*397;t10=v10*397;t11=v11*397;t12=v12*397;t13=v13*397;t14=v14*397;t15=v15*397;t16=v16*397;t17=v17*397;t18=v18*397;t19=v19*397;t20=v20*397;t21=v21*397;t22=v22*397;t23=v23*397;t24=v24*397;t25=v25*397;t26=v26*397;t27=v27*397;t28=v28*397;t29=v29*397;t30=v30*397;t31=v31*397;t32=v32*397;t33=v33*397;t34=v34*397;t35=v35*397;t36=v36*397;t37=v37*397;t38=v38*397;t39=v39*397;t40=v40*397;t41=v41*397;t42=v42*397;t43=v43*397;t44=v44*397;t45=v45*397;t46=v46*397;t47=v47*397;t48=v48*397;t49=v49*397;t50=v50*397;t51=v51*397;t52=v52*397;t53=v53*397;t54=v54*397;t55=v55*397;t56=v56*397;t57=v57*397;t58=v58*397;t59=v59*397;t60=v60*397;t61=v61*397;t62=v62*397;t63=v63*397;
					t42+=v0<<8;t43+=v1<<8;t44+=v2<<8;t45+=v3<<8;t46+=v4<<8;t47+=v5<<8;t48+=v6<<8;t49+=v7<<8;t50+=v8<<8;t51+=v9<<8;t52+=v10<<8;t53+=v11<<8;t54+=v12<<8;t55+=v13<<8;t56+=v14<<8;t57+=v15<<8;t58+=v16<<8;t59+=v17<<8;t60+=v18<<8;t61+=v19<<8;t62+=v20<<8;t63+=v21<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;t31+=t30>>>16;v30=t30&65535;t32+=t31>>>16;v31=t31&65535;t33+=t32>>>16;v32=t32&65535;t34+=t33>>>16;v33=t33&65535;t35+=t34>>>16;v34=t34&65535;t36+=t35>>>16;v35=t35&65535;t37+=t36>>>16;v36=t36&65535;t38+=t37>>>16;v37=t37&65535;t39+=t38>>>16;v38=t38&65535;t40+=t39>>>16;v39=t39&65535;t41+=t40>>>16;v40=t40&65535;t42+=t41>>>16;v41=t41&65535;t43+=t42>>>16;v42=t42&65535;t44+=t43>>>16;v43=t43&65535;t45+=t44>>>16;v44=t44&65535;t46+=t45>>>16;v45=t45&65535;t47+=t46>>>16;v46=t46&65535;t48+=t47>>>16;v47=t47&65535;t49+=t48>>>16;v48=t48&65535;t50+=t49>>>16;v49=t49&65535;t51+=t50>>>16;v50=t50&65535;t52+=t51>>>16;v51=t51&65535;t53+=t52>>>16;v52=t52&65535;t54+=t53>>>16;v53=t53&65535;t55+=t54>>>16;v54=t54&65535;t56+=t55>>>16;v55=t55&65535;t57+=t56>>>16;v56=t56&65535;t58+=t57>>>16;v57=t57&65535;t59+=t58>>>16;v58=t58&65535;t60+=t59>>>16;v59=t59&65535;t61+=t60>>>16;v60=t60&65535;t62+=t61>>>16;v61=t61&65535;v63=(t63+(t62>>>16))&65535;v62=t62&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*397;t1=v1*397;t2=v2*397;t3=v3*397;t4=v4*397;t5=v5*397;t6=v6*397;t7=v7*397;t8=v8*397;t9=v9*397;t10=v10*397;t11=v11*397;t12=v12*397;t13=v13*397;t14=v14*397;t15=v15*397;t16=v16*397;t17=v17*397;t18=v18*397;t19=v19*397;t20=v20*397;t21=v21*397;t22=v22*397;t23=v23*397;t24=v24*397;t25=v25*397;t26=v26*397;t27=v27*397;t28=v28*397;t29=v29*397;t30=v30*397;t31=v31*397;t32=v32*397;t33=v33*397;t34=v34*397;t35=v35*397;t36=v36*397;t37=v37*397;t38=v38*397;t39=v39*397;t40=v40*397;t41=v41*397;t42=v42*397;t43=v43*397;t44=v44*397;t45=v45*397;t46=v46*397;t47=v47*397;t48=v48*397;t49=v49*397;t50=v50*397;t51=v51*397;t52=v52*397;t53=v53*397;t54=v54*397;t55=v55*397;t56=v56*397;t57=v57*397;t58=v58*397;t59=v59*397;t60=v60*397;t61=v61*397;t62=v62*397;t63=v63*397;
					t42+=v0<<8;t43+=v1<<8;t44+=v2<<8;t45+=v3<<8;t46+=v4<<8;t47+=v5<<8;t48+=v6<<8;t49+=v7<<8;t50+=v8<<8;t51+=v9<<8;t52+=v10<<8;t53+=v11<<8;t54+=v12<<8;t55+=v13<<8;t56+=v14<<8;t57+=v15<<8;t58+=v16<<8;t59+=v17<<8;t60+=v18<<8;t61+=v19<<8;t62+=v20<<8;t63+=v21<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;t31+=t30>>>16;v30=t30&65535;t32+=t31>>>16;v31=t31&65535;t33+=t32>>>16;v32=t32&65535;t34+=t33>>>16;v33=t33&65535;t35+=t34>>>16;v34=t34&65535;t36+=t35>>>16;v35=t35&65535;t37+=t36>>>16;v36=t36&65535;t38+=t37>>>16;v37=t37&65535;t39+=t38>>>16;v38=t38&65535;t40+=t39>>>16;v39=t39&65535;t41+=t40>>>16;v40=t40&65535;t42+=t41>>>16;v41=t41&65535;t43+=t42>>>16;v42=t42&65535;t44+=t43>>>16;v43=t43&65535;t45+=t44>>>16;v44=t44&65535;t46+=t45>>>16;v45=t45&65535;t47+=t46>>>16;v46=t46&65535;t48+=t47>>>16;v47=t47&65535;t49+=t48>>>16;v48=t48&65535;t50+=t49>>>16;v49=t49&65535;t51+=t50>>>16;v50=t50&65535;t52+=t51>>>16;v51=t51&65535;t53+=t52>>>16;v52=t52&65535;t54+=t53>>>16;v53=t53&65535;t55+=t54>>>16;v54=t54&65535;t56+=t55>>>16;v55=t55&65535;t57+=t56>>>16;v56=t56&65535;t58+=t57>>>16;v57=t57&65535;t59+=t58>>>16;v58=t58&65535;t60+=t59>>>16;v59=t59&65535;t61+=t60>>>16;v60=t60&65535;t62+=t61>>>16;v61=t61&65535;v63=(t63+(t62>>>16))&65535;v62=t62&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*397;t1=v1*397;t2=v2*397;t3=v3*397;t4=v4*397;t5=v5*397;t6=v6*397;t7=v7*397;t8=v8*397;t9=v9*397;t10=v10*397;t11=v11*397;t12=v12*397;t13=v13*397;t14=v14*397;t15=v15*397;t16=v16*397;t17=v17*397;t18=v18*397;t19=v19*397;t20=v20*397;t21=v21*397;t22=v22*397;t23=v23*397;t24=v24*397;t25=v25*397;t26=v26*397;t27=v27*397;t28=v28*397;t29=v29*397;t30=v30*397;t31=v31*397;t32=v32*397;t33=v33*397;t34=v34*397;t35=v35*397;t36=v36*397;t37=v37*397;t38=v38*397;t39=v39*397;t40=v40*397;t41=v41*397;t42=v42*397;t43=v43*397;t44=v44*397;t45=v45*397;t46=v46*397;t47=v47*397;t48=v48*397;t49=v49*397;t50=v50*397;t51=v51*397;t52=v52*397;t53=v53*397;t54=v54*397;t55=v55*397;t56=v56*397;t57=v57*397;t58=v58*397;t59=v59*397;t60=v60*397;t61=v61*397;t62=v62*397;t63=v63*397;
					t42+=v0<<8;t43+=v1<<8;t44+=v2<<8;t45+=v3<<8;t46+=v4<<8;t47+=v5<<8;t48+=v6<<8;t49+=v7<<8;t50+=v8<<8;t51+=v9<<8;t52+=v10<<8;t53+=v11<<8;t54+=v12<<8;t55+=v13<<8;t56+=v14<<8;t57+=v15<<8;t58+=v16<<8;t59+=v17<<8;t60+=v18<<8;t61+=v19<<8;t62+=v20<<8;t63+=v21<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;t31+=t30>>>16;v30=t30&65535;t32+=t31>>>16;v31=t31&65535;t33+=t32>>>16;v32=t32&65535;t34+=t33>>>16;v33=t33&65535;t35+=t34>>>16;v34=t34&65535;t36+=t35>>>16;v35=t35&65535;t37+=t36>>>16;v36=t36&65535;t38+=t37>>>16;v37=t37&65535;t39+=t38>>>16;v38=t38&65535;t40+=t39>>>16;v39=t39&65535;t41+=t40>>>16;v40=t40&65535;t42+=t41>>>16;v41=t41&65535;t43+=t42>>>16;v42=t42&65535;t44+=t43>>>16;v43=t43&65535;t45+=t44>>>16;v44=t44&65535;t46+=t45>>>16;v45=t45&65535;t47+=t46>>>16;v46=t46&65535;t48+=t47>>>16;v47=t47&65535;t49+=t48>>>16;v48=t48&65535;t50+=t49>>>16;v49=t49&65535;t51+=t50>>>16;v50=t50&65535;t52+=t51>>>16;v51=t51&65535;t53+=t52>>>16;v52=t52&65535;t54+=t53>>>16;v53=t53&65535;t55+=t54>>>16;v54=t54&65535;t56+=t55>>>16;v55=t55&65535;t57+=t56>>>16;v56=t56&65535;t58+=t57>>>16;v57=t57&65535;t59+=t58>>>16;v58=t58&65535;t60+=t59>>>16;v59=t59&65535;t61+=t60>>>16;v60=t60&65535;t62+=t61>>>16;v61=t61&65535;v63=(t63+(t62>>>16))&65535;v62=t62&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*397;t1=v1*397;t2=v2*397;t3=v3*397;t4=v4*397;t5=v5*397;t6=v6*397;t7=v7*397;t8=v8*397;t9=v9*397;t10=v10*397;t11=v11*397;t12=v12*397;t13=v13*397;t14=v14*397;t15=v15*397;t16=v16*397;t17=v17*397;t18=v18*397;t19=v19*397;t20=v20*397;t21=v21*397;t22=v22*397;t23=v23*397;t24=v24*397;t25=v25*397;t26=v26*397;t27=v27*397;t28=v28*397;t29=v29*397;t30=v30*397;t31=v31*397;t32=v32*397;t33=v33*397;t34=v34*397;t35=v35*397;t36=v36*397;t37=v37*397;t38=v38*397;t39=v39*397;t40=v40*397;t41=v41*397;t42=v42*397;t43=v43*397;t44=v44*397;t45=v45*397;t46=v46*397;t47=v47*397;t48=v48*397;t49=v49*397;t50=v50*397;t51=v51*397;t52=v52*397;t53=v53*397;t54=v54*397;t55=v55*397;t56=v56*397;t57=v57*397;t58=v58*397;t59=v59*397;t60=v60*397;t61=v61*397;t62=v62*397;t63=v63*397;
					t42+=v0<<8;t43+=v1<<8;t44+=v2<<8;t45+=v3<<8;t46+=v4<<8;t47+=v5<<8;t48+=v6<<8;t49+=v7<<8;t50+=v8<<8;t51+=v9<<8;t52+=v10<<8;t53+=v11<<8;t54+=v12<<8;t55+=v13<<8;t56+=v14<<8;t57+=v15<<8;t58+=v16<<8;t59+=v17<<8;t60+=v18<<8;t61+=v19<<8;t62+=v20<<8;t63+=v21<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;t31+=t30>>>16;v30=t30&65535;t32+=t31>>>16;v31=t31&65535;t33+=t32>>>16;v32=t32&65535;t34+=t33>>>16;v33=t33&65535;t35+=t34>>>16;v34=t34&65535;t36+=t35>>>16;v35=t35&65535;t37+=t36>>>16;v36=t36&65535;t38+=t37>>>16;v37=t37&65535;t39+=t38>>>16;v38=t38&65535;t40+=t39>>>16;v39=t39&65535;t41+=t40>>>16;v40=t40&65535;t42+=t41>>>16;v41=t41&65535;t43+=t42>>>16;v42=t42&65535;t44+=t43>>>16;v43=t43&65535;t45+=t44>>>16;v44=t44&65535;t46+=t45>>>16;v45=t45&65535;t47+=t46>>>16;v46=t46&65535;t48+=t47>>>16;v47=t47&65535;t49+=t48>>>16;v48=t48&65535;t50+=t49>>>16;v49=t49&65535;t51+=t50>>>16;v50=t50&65535;t52+=t51>>>16;v51=t51&65535;t53+=t52>>>16;v52=t52&65535;t54+=t53>>>16;v53=t53&65535;t55+=t54>>>16;v54=t54&65535;t56+=t55>>>16;v55=t55&65535;t57+=t56>>>16;v56=t56&65535;t58+=t57>>>16;v57=t57&65535;t59+=t58>>>16;v58=t58&65535;t60+=t59>>>16;v59=t59&65535;t61+=t60>>>16;v60=t60&65535;t62+=t61>>>16;v61=t61&65535;v63=(t63+(t62>>>16))&65535;v62=t62&65535;
				}

				while(i<l+3){
					v0^=str.charCodeAt(i++);
					t0=v0*397;t1=v1*397;t2=v2*397;t3=v3*397;t4=v4*397;t5=v5*397;t6=v6*397;t7=v7*397;t8=v8*397;t9=v9*397;t10=v10*397;t11=v11*397;t12=v12*397;t13=v13*397;t14=v14*397;t15=v15*397;t16=v16*397;t17=v17*397;t18=v18*397;t19=v19*397;t20=v20*397;t21=v21*397;t22=v22*397;t23=v23*397;t24=v24*397;t25=v25*397;t26=v26*397;t27=v27*397;t28=v28*397;t29=v29*397;t30=v30*397;t31=v31*397;t32=v32*397;t33=v33*397;t34=v34*397;t35=v35*397;t36=v36*397;t37=v37*397;t38=v38*397;t39=v39*397;t40=v40*397;t41=v41*397;t42=v42*397;t43=v43*397;t44=v44*397;t45=v45*397;t46=v46*397;t47=v47*397;t48=v48*397;t49=v49*397;t50=v50*397;t51=v51*397;t52=v52*397;t53=v53*397;t54=v54*397;t55=v55*397;t56=v56*397;t57=v57*397;t58=v58*397;t59=v59*397;t60=v60*397;t61=v61*397;t62=v62*397;t63=v63*397;
					t42+=v0<<8;t43+=v1<<8;t44+=v2<<8;t45+=v3<<8;t46+=v4<<8;t47+=v5<<8;t48+=v6<<8;t49+=v7<<8;t50+=v8<<8;t51+=v9<<8;t52+=v10<<8;t53+=v11<<8;t54+=v12<<8;t55+=v13<<8;t56+=v14<<8;t57+=v15<<8;t58+=v16<<8;t59+=v17<<8;t60+=v18<<8;t61+=v19<<8;t62+=v20<<8;t63+=v21<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;t31+=t30>>>16;v30=t30&65535;t32+=t31>>>16;v31=t31&65535;t33+=t32>>>16;v32=t32&65535;t34+=t33>>>16;v33=t33&65535;t35+=t34>>>16;v34=t34&65535;t36+=t35>>>16;v35=t35&65535;t37+=t36>>>16;v36=t36&65535;t38+=t37>>>16;v37=t37&65535;t39+=t38>>>16;v38=t38&65535;t40+=t39>>>16;v39=t39&65535;t41+=t40>>>16;v40=t40&65535;t42+=t41>>>16;v41=t41&65535;t43+=t42>>>16;v42=t42&65535;t44+=t43>>>16;v43=t43&65535;t45+=t44>>>16;v44=t44&65535;t46+=t45>>>16;v45=t45&65535;t47+=t46>>>16;v46=t46&65535;t48+=t47>>>16;v47=t47&65535;t49+=t48>>>16;v48=t48&65535;t50+=t49>>>16;v49=t49&65535;t51+=t50>>>16;v50=t50&65535;t52+=t51>>>16;v51=t51&65535;t53+=t52>>>16;v52=t52&65535;t54+=t53>>>16;v53=t53&65535;t55+=t54>>>16;v54=t54&65535;t56+=t55>>>16;v55=t55&65535;t57+=t56>>>16;v56=t56&65535;t58+=t57>>>16;v57=t57&65535;t59+=t58>>>16;v58=t58&65535;t60+=t59>>>16;v59=t59&65535;t61+=t60>>>16;v60=t60&65535;t62+=t61>>>16;v61=t61&65535;v63=(t63+(t62>>>16))&65535;v62=t62&65535;
				}

				return hashValHex(hl[v63>>8]+hl[v63&255]+hl[v62>>8]+hl[v62&255]+hl[v61>>8]+hl[v61&255]+hl[v60>>8]+hl[v60&255]+hl[v59>>8]+hl[v59&255]+hl[v58>>8]+hl[v58&255]+hl[v57>>8]+hl[v57&255]+hl[v56>>8]+hl[v56&255]+hl[v55>>8]+hl[v55&255]+hl[v54>>8]+hl[v54&255]+hl[v53>>8]+hl[v53&255]+hl[v52>>8]+hl[v52&255]+hl[v51>>8]+hl[v51&255]+hl[v50>>8]+hl[v50&255]+hl[v49>>8]+hl[v49&255]+hl[v48>>8]+hl[v48&255]+hl[v47>>8]+hl[v47&255]+hl[v46>>8]+hl[v46&255]+hl[v45>>8]+hl[v45&255]+hl[v44>>8]+hl[v44&255]+hl[v43>>8]+hl[v43&255]+hl[v42>>8]+hl[v42&255]+hl[v41>>8]+hl[v41&255]+hl[v40>>8]+hl[v40&255]+hl[v39>>8]+hl[v39&255]+hl[v38>>8]+hl[v38&255]+hl[v37>>8]+hl[v37&255]+hl[v36>>8]+hl[v36&255]+hl[v35>>8]+hl[v35&255]+hl[v34>>8]+hl[v34&255]+hl[v33>>8]+hl[v33&255]+hl[v32>>8]+hl[v32&255]+hl[v31>>8]+hl[v31&255]+hl[v30>>8]+hl[v30&255]+hl[v29>>8]+hl[v29&255]+hl[v28>>8]+hl[v28&255]+hl[v27>>8]+hl[v27&255]+hl[v26>>8]+hl[v26&255]+hl[v25>>8]+hl[v25&255]+hl[v24>>8]+hl[v24&255]+hl[v23>>8]+hl[v23&255]+hl[v22>>8]+hl[v22&255]+hl[v21>>8]+hl[v21&255]+hl[v20>>8]+hl[v20&255]+hl[v19>>8]+hl[v19&255]+hl[v18>>8]+hl[v18&255]+hl[v17>>8]+hl[v17&255]+hl[v16>>8]+hl[v16&255]+hl[v15>>8]+hl[v15&255]+hl[v14>>8]+hl[v14&255]+hl[v13>>8]+hl[v13&255]+hl[v12>>8]+hl[v12&255]+hl[v11>>8]+hl[v11&255]+hl[v10>>8]+hl[v10&255]+hl[v9>>8]+hl[v9&255]+hl[v8>>8]+hl[v8&255]+hl[v7>>8]+hl[v7&255]+hl[v6>>8]+hl[v6&255]+hl[v5>>8]+hl[v5&255]+hl[v4>>8]+hl[v4&255]+hl[v3>>8]+hl[v3&255]+hl[v2>>8]+hl[v2&255]+hl[v1>>8]+hl[v1&255]+hl[v0>>8]+hl[v0&255],1024);
			}

			function _hash1024_1(str){
				var i,l=str.length-3,s=fnvConstants[1024].offset,t0=0,v0=s[63]|0,t1=0,v1=s[62]|0,t2=0,v2=s[61]|0,t3=0,v3=s[60]|0,t4=0,v4=s[59]|0,t5=0,v5=s[58]|0,t6=0,v6=s[57]|0,t7=0,v7=s[56]|0,t8=0,v8=s[55]|0,t9=0,v9=s[54]|0,t10=0,v10=s[53]|0,t11=0,v11=s[52]|0,t12=0,v12=s[51]|0,t13=0,v13=s[50]|0,t14=0,v14=s[49]|0,t15=0,v15=s[48]|0,t16=0,v16=s[47]|0,t17=0,v17=s[46]|0,t18=0,v18=s[45]|0,t19=0,v19=s[44]|0,t20=0,v20=s[43]|0,t21=0,v21=s[42]|0,t22=0,v22=s[41]|0,t23=0,v23=s[40]|0,t24=0,v24=s[39]|0,t25=0,v25=s[38]|0,t26=0,v26=s[37]|0,t27=0,v27=s[36]|0,t28=0,v28=s[35]|0,t29=0,v29=s[34]|0,t30=0,v30=s[33]|0,t31=0,v31=s[32]|0,t32=0,v32=s[31]|0,t33=0,v33=s[30]|0,t34=0,v34=s[29]|0,t35=0,v35=s[28]|0,t36=0,v36=s[27]|0,t37=0,v37=s[26]|0,t38=0,v38=s[25]|0,t39=0,v39=s[24]|0,t40=0,v40=s[23]|0,t41=0,v41=s[22]|0,t42=0,v42=s[21]|0,t43=0,v43=s[20]|0,t44=0,v44=s[19]|0,t45=0,v45=s[18]|0,t46=0,v46=s[17]|0,t47=0,v47=s[16]|0,t48=0,v48=s[15]|0,t49=0,v49=s[14]|0,t50=0,v50=s[13]|0,t51=0,v51=s[12]|0,t52=0,v52=s[11]|0,t53=0,v53=s[10]|0,t54=0,v54=s[9]|0,t55=0,v55=s[8]|0,t56=0,v56=s[7]|0,t57=0,v57=s[6]|0,t58=0,v58=s[5]|0,t59=0,v59=s[4]|0,t60=0,v60=s[3]|0,t61=0,v61=s[2]|0,t62=0,v62=s[1]|0,t63=0,v63=s[0]|0;

				for (i = 0; i < l;) {
					t0=v0*397;t1=v1*397;t2=v2*397;t3=v3*397;t4=v4*397;t5=v5*397;t6=v6*397;t7=v7*397;t8=v8*397;t9=v9*397;t10=v10*397;t11=v11*397;t12=v12*397;t13=v13*397;t14=v14*397;t15=v15*397;t16=v16*397;t17=v17*397;t18=v18*397;t19=v19*397;t20=v20*397;t21=v21*397;t22=v22*397;t23=v23*397;t24=v24*397;t25=v25*397;t26=v26*397;t27=v27*397;t28=v28*397;t29=v29*397;t30=v30*397;t31=v31*397;t32=v32*397;t33=v33*397;t34=v34*397;t35=v35*397;t36=v36*397;t37=v37*397;t38=v38*397;t39=v39*397;t40=v40*397;t41=v41*397;t42=v42*397;t43=v43*397;t44=v44*397;t45=v45*397;t46=v46*397;t47=v47*397;t48=v48*397;t49=v49*397;t50=v50*397;t51=v51*397;t52=v52*397;t53=v53*397;t54=v54*397;t55=v55*397;t56=v56*397;t57=v57*397;t58=v58*397;t59=v59*397;t60=v60*397;t61=v61*397;t62=v62*397;t63=v63*397;
					t42+=v0<<8;t43+=v1<<8;t44+=v2<<8;t45+=v3<<8;t46+=v4<<8;t47+=v5<<8;t48+=v6<<8;t49+=v7<<8;t50+=v8<<8;t51+=v9<<8;t52+=v10<<8;t53+=v11<<8;t54+=v12<<8;t55+=v13<<8;t56+=v14<<8;t57+=v15<<8;t58+=v16<<8;t59+=v17<<8;t60+=v18<<8;t61+=v19<<8;t62+=v20<<8;t63+=v21<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;t31+=t30>>>16;v30=t30&65535;t32+=t31>>>16;v31=t31&65535;t33+=t32>>>16;v32=t32&65535;t34+=t33>>>16;v33=t33&65535;t35+=t34>>>16;v34=t34&65535;t36+=t35>>>16;v35=t35&65535;t37+=t36>>>16;v36=t36&65535;t38+=t37>>>16;v37=t37&65535;t39+=t38>>>16;v38=t38&65535;t40+=t39>>>16;v39=t39&65535;t41+=t40>>>16;v40=t40&65535;t42+=t41>>>16;v41=t41&65535;t43+=t42>>>16;v42=t42&65535;t44+=t43>>>16;v43=t43&65535;t45+=t44>>>16;v44=t44&65535;t46+=t45>>>16;v45=t45&65535;t47+=t46>>>16;v46=t46&65535;t48+=t47>>>16;v47=t47&65535;t49+=t48>>>16;v48=t48&65535;t50+=t49>>>16;v49=t49&65535;t51+=t50>>>16;v50=t50&65535;t52+=t51>>>16;v51=t51&65535;t53+=t52>>>16;v52=t52&65535;t54+=t53>>>16;v53=t53&65535;t55+=t54>>>16;v54=t54&65535;t56+=t55>>>16;v55=t55&65535;t57+=t56>>>16;v56=t56&65535;t58+=t57>>>16;v57=t57&65535;t59+=t58>>>16;v58=t58&65535;t60+=t59>>>16;v59=t59&65535;t61+=t60>>>16;v60=t60&65535;t62+=t61>>>16;v61=t61&65535;v63=(t63+(t62>>>16))&65535;v62=t62&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*397;t1=v1*397;t2=v2*397;t3=v3*397;t4=v4*397;t5=v5*397;t6=v6*397;t7=v7*397;t8=v8*397;t9=v9*397;t10=v10*397;t11=v11*397;t12=v12*397;t13=v13*397;t14=v14*397;t15=v15*397;t16=v16*397;t17=v17*397;t18=v18*397;t19=v19*397;t20=v20*397;t21=v21*397;t22=v22*397;t23=v23*397;t24=v24*397;t25=v25*397;t26=v26*397;t27=v27*397;t28=v28*397;t29=v29*397;t30=v30*397;t31=v31*397;t32=v32*397;t33=v33*397;t34=v34*397;t35=v35*397;t36=v36*397;t37=v37*397;t38=v38*397;t39=v39*397;t40=v40*397;t41=v41*397;t42=v42*397;t43=v43*397;t44=v44*397;t45=v45*397;t46=v46*397;t47=v47*397;t48=v48*397;t49=v49*397;t50=v50*397;t51=v51*397;t52=v52*397;t53=v53*397;t54=v54*397;t55=v55*397;t56=v56*397;t57=v57*397;t58=v58*397;t59=v59*397;t60=v60*397;t61=v61*397;t62=v62*397;t63=v63*397;
					t42+=v0<<8;t43+=v1<<8;t44+=v2<<8;t45+=v3<<8;t46+=v4<<8;t47+=v5<<8;t48+=v6<<8;t49+=v7<<8;t50+=v8<<8;t51+=v9<<8;t52+=v10<<8;t53+=v11<<8;t54+=v12<<8;t55+=v13<<8;t56+=v14<<8;t57+=v15<<8;t58+=v16<<8;t59+=v17<<8;t60+=v18<<8;t61+=v19<<8;t62+=v20<<8;t63+=v21<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;t31+=t30>>>16;v30=t30&65535;t32+=t31>>>16;v31=t31&65535;t33+=t32>>>16;v32=t32&65535;t34+=t33>>>16;v33=t33&65535;t35+=t34>>>16;v34=t34&65535;t36+=t35>>>16;v35=t35&65535;t37+=t36>>>16;v36=t36&65535;t38+=t37>>>16;v37=t37&65535;t39+=t38>>>16;v38=t38&65535;t40+=t39>>>16;v39=t39&65535;t41+=t40>>>16;v40=t40&65535;t42+=t41>>>16;v41=t41&65535;t43+=t42>>>16;v42=t42&65535;t44+=t43>>>16;v43=t43&65535;t45+=t44>>>16;v44=t44&65535;t46+=t45>>>16;v45=t45&65535;t47+=t46>>>16;v46=t46&65535;t48+=t47>>>16;v47=t47&65535;t49+=t48>>>16;v48=t48&65535;t50+=t49>>>16;v49=t49&65535;t51+=t50>>>16;v50=t50&65535;t52+=t51>>>16;v51=t51&65535;t53+=t52>>>16;v52=t52&65535;t54+=t53>>>16;v53=t53&65535;t55+=t54>>>16;v54=t54&65535;t56+=t55>>>16;v55=t55&65535;t57+=t56>>>16;v56=t56&65535;t58+=t57>>>16;v57=t57&65535;t59+=t58>>>16;v58=t58&65535;t60+=t59>>>16;v59=t59&65535;t61+=t60>>>16;v60=t60&65535;t62+=t61>>>16;v61=t61&65535;v63=(t63+(t62>>>16))&65535;v62=t62&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*397;t1=v1*397;t2=v2*397;t3=v3*397;t4=v4*397;t5=v5*397;t6=v6*397;t7=v7*397;t8=v8*397;t9=v9*397;t10=v10*397;t11=v11*397;t12=v12*397;t13=v13*397;t14=v14*397;t15=v15*397;t16=v16*397;t17=v17*397;t18=v18*397;t19=v19*397;t20=v20*397;t21=v21*397;t22=v22*397;t23=v23*397;t24=v24*397;t25=v25*397;t26=v26*397;t27=v27*397;t28=v28*397;t29=v29*397;t30=v30*397;t31=v31*397;t32=v32*397;t33=v33*397;t34=v34*397;t35=v35*397;t36=v36*397;t37=v37*397;t38=v38*397;t39=v39*397;t40=v40*397;t41=v41*397;t42=v42*397;t43=v43*397;t44=v44*397;t45=v45*397;t46=v46*397;t47=v47*397;t48=v48*397;t49=v49*397;t50=v50*397;t51=v51*397;t52=v52*397;t53=v53*397;t54=v54*397;t55=v55*397;t56=v56*397;t57=v57*397;t58=v58*397;t59=v59*397;t60=v60*397;t61=v61*397;t62=v62*397;t63=v63*397;
					t42+=v0<<8;t43+=v1<<8;t44+=v2<<8;t45+=v3<<8;t46+=v4<<8;t47+=v5<<8;t48+=v6<<8;t49+=v7<<8;t50+=v8<<8;t51+=v9<<8;t52+=v10<<8;t53+=v11<<8;t54+=v12<<8;t55+=v13<<8;t56+=v14<<8;t57+=v15<<8;t58+=v16<<8;t59+=v17<<8;t60+=v18<<8;t61+=v19<<8;t62+=v20<<8;t63+=v21<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;t31+=t30>>>16;v30=t30&65535;t32+=t31>>>16;v31=t31&65535;t33+=t32>>>16;v32=t32&65535;t34+=t33>>>16;v33=t33&65535;t35+=t34>>>16;v34=t34&65535;t36+=t35>>>16;v35=t35&65535;t37+=t36>>>16;v36=t36&65535;t38+=t37>>>16;v37=t37&65535;t39+=t38>>>16;v38=t38&65535;t40+=t39>>>16;v39=t39&65535;t41+=t40>>>16;v40=t40&65535;t42+=t41>>>16;v41=t41&65535;t43+=t42>>>16;v42=t42&65535;t44+=t43>>>16;v43=t43&65535;t45+=t44>>>16;v44=t44&65535;t46+=t45>>>16;v45=t45&65535;t47+=t46>>>16;v46=t46&65535;t48+=t47>>>16;v47=t47&65535;t49+=t48>>>16;v48=t48&65535;t50+=t49>>>16;v49=t49&65535;t51+=t50>>>16;v50=t50&65535;t52+=t51>>>16;v51=t51&65535;t53+=t52>>>16;v52=t52&65535;t54+=t53>>>16;v53=t53&65535;t55+=t54>>>16;v54=t54&65535;t56+=t55>>>16;v55=t55&65535;t57+=t56>>>16;v56=t56&65535;t58+=t57>>>16;v57=t57&65535;t59+=t58>>>16;v58=t58&65535;t60+=t59>>>16;v59=t59&65535;t61+=t60>>>16;v60=t60&65535;t62+=t61>>>16;v61=t61&65535;v63=(t63+(t62>>>16))&65535;v62=t62&65535;
					v0^=str.charCodeAt(i++);
					t0=v0*397;t1=v1*397;t2=v2*397;t3=v3*397;t4=v4*397;t5=v5*397;t6=v6*397;t7=v7*397;t8=v8*397;t9=v9*397;t10=v10*397;t11=v11*397;t12=v12*397;t13=v13*397;t14=v14*397;t15=v15*397;t16=v16*397;t17=v17*397;t18=v18*397;t19=v19*397;t20=v20*397;t21=v21*397;t22=v22*397;t23=v23*397;t24=v24*397;t25=v25*397;t26=v26*397;t27=v27*397;t28=v28*397;t29=v29*397;t30=v30*397;t31=v31*397;t32=v32*397;t33=v33*397;t34=v34*397;t35=v35*397;t36=v36*397;t37=v37*397;t38=v38*397;t39=v39*397;t40=v40*397;t41=v41*397;t42=v42*397;t43=v43*397;t44=v44*397;t45=v45*397;t46=v46*397;t47=v47*397;t48=v48*397;t49=v49*397;t50=v50*397;t51=v51*397;t52=v52*397;t53=v53*397;t54=v54*397;t55=v55*397;t56=v56*397;t57=v57*397;t58=v58*397;t59=v59*397;t60=v60*397;t61=v61*397;t62=v62*397;t63=v63*397;
					t42+=v0<<8;t43+=v1<<8;t44+=v2<<8;t45+=v3<<8;t46+=v4<<8;t47+=v5<<8;t48+=v6<<8;t49+=v7<<8;t50+=v8<<8;t51+=v9<<8;t52+=v10<<8;t53+=v11<<8;t54+=v12<<8;t55+=v13<<8;t56+=v14<<8;t57+=v15<<8;t58+=v16<<8;t59+=v17<<8;t60+=v18<<8;t61+=v19<<8;t62+=v20<<8;t63+=v21<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;t31+=t30>>>16;v30=t30&65535;t32+=t31>>>16;v31=t31&65535;t33+=t32>>>16;v32=t32&65535;t34+=t33>>>16;v33=t33&65535;t35+=t34>>>16;v34=t34&65535;t36+=t35>>>16;v35=t35&65535;t37+=t36>>>16;v36=t36&65535;t38+=t37>>>16;v37=t37&65535;t39+=t38>>>16;v38=t38&65535;t40+=t39>>>16;v39=t39&65535;t41+=t40>>>16;v40=t40&65535;t42+=t41>>>16;v41=t41&65535;t43+=t42>>>16;v42=t42&65535;t44+=t43>>>16;v43=t43&65535;t45+=t44>>>16;v44=t44&65535;t46+=t45>>>16;v45=t45&65535;t47+=t46>>>16;v46=t46&65535;t48+=t47>>>16;v47=t47&65535;t49+=t48>>>16;v48=t48&65535;t50+=t49>>>16;v49=t49&65535;t51+=t50>>>16;v50=t50&65535;t52+=t51>>>16;v51=t51&65535;t53+=t52>>>16;v52=t52&65535;t54+=t53>>>16;v53=t53&65535;t55+=t54>>>16;v54=t54&65535;t56+=t55>>>16;v55=t55&65535;t57+=t56>>>16;v56=t56&65535;t58+=t57>>>16;v57=t57&65535;t59+=t58>>>16;v58=t58&65535;t60+=t59>>>16;v59=t59&65535;t61+=t60>>>16;v60=t60&65535;t62+=t61>>>16;v61=t61&65535;v63=(t63+(t62>>>16))&65535;v62=t62&65535;
					v0^=str.charCodeAt(i++);
				}

				while(i<l+3){
					t0=v0*397;t1=v1*397;t2=v2*397;t3=v3*397;t4=v4*397;t5=v5*397;t6=v6*397;t7=v7*397;t8=v8*397;t9=v9*397;t10=v10*397;t11=v11*397;t12=v12*397;t13=v13*397;t14=v14*397;t15=v15*397;t16=v16*397;t17=v17*397;t18=v18*397;t19=v19*397;t20=v20*397;t21=v21*397;t22=v22*397;t23=v23*397;t24=v24*397;t25=v25*397;t26=v26*397;t27=v27*397;t28=v28*397;t29=v29*397;t30=v30*397;t31=v31*397;t32=v32*397;t33=v33*397;t34=v34*397;t35=v35*397;t36=v36*397;t37=v37*397;t38=v38*397;t39=v39*397;t40=v40*397;t41=v41*397;t42=v42*397;t43=v43*397;t44=v44*397;t45=v45*397;t46=v46*397;t47=v47*397;t48=v48*397;t49=v49*397;t50=v50*397;t51=v51*397;t52=v52*397;t53=v53*397;t54=v54*397;t55=v55*397;t56=v56*397;t57=v57*397;t58=v58*397;t59=v59*397;t60=v60*397;t61=v61*397;t62=v62*397;t63=v63*397;
					t42+=v0<<8;t43+=v1<<8;t44+=v2<<8;t45+=v3<<8;t46+=v4<<8;t47+=v5<<8;t48+=v6<<8;t49+=v7<<8;t50+=v8<<8;t51+=v9<<8;t52+=v10<<8;t53+=v11<<8;t54+=v12<<8;t55+=v13<<8;t56+=v14<<8;t57+=v15<<8;t58+=v16<<8;t59+=v17<<8;t60+=v18<<8;t61+=v19<<8;t62+=v20<<8;t63+=v21<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;t31+=t30>>>16;v30=t30&65535;t32+=t31>>>16;v31=t31&65535;t33+=t32>>>16;v32=t32&65535;t34+=t33>>>16;v33=t33&65535;t35+=t34>>>16;v34=t34&65535;t36+=t35>>>16;v35=t35&65535;t37+=t36>>>16;v36=t36&65535;t38+=t37>>>16;v37=t37&65535;t39+=t38>>>16;v38=t38&65535;t40+=t39>>>16;v39=t39&65535;t41+=t40>>>16;v40=t40&65535;t42+=t41>>>16;v41=t41&65535;t43+=t42>>>16;v42=t42&65535;t44+=t43>>>16;v43=t43&65535;t45+=t44>>>16;v44=t44&65535;t46+=t45>>>16;v45=t45&65535;t47+=t46>>>16;v46=t46&65535;t48+=t47>>>16;v47=t47&65535;t49+=t48>>>16;v48=t48&65535;t50+=t49>>>16;v49=t49&65535;t51+=t50>>>16;v50=t50&65535;t52+=t51>>>16;v51=t51&65535;t53+=t52>>>16;v52=t52&65535;t54+=t53>>>16;v53=t53&65535;t55+=t54>>>16;v54=t54&65535;t56+=t55>>>16;v55=t55&65535;t57+=t56>>>16;v56=t56&65535;t58+=t57>>>16;v57=t57&65535;t59+=t58>>>16;v58=t58&65535;t60+=t59>>>16;v59=t59&65535;t61+=t60>>>16;v60=t60&65535;t62+=t61>>>16;v61=t61&65535;v63=(t63+(t62>>>16))&65535;v62=t62&65535;
					v0^=str.charCodeAt(i++);
				}

				return hashValHex(hl[v63>>8]+hl[v63&255]+hl[v62>>8]+hl[v62&255]+hl[v61>>8]+hl[v61&255]+hl[v60>>8]+hl[v60&255]+hl[v59>>8]+hl[v59&255]+hl[v58>>8]+hl[v58&255]+hl[v57>>8]+hl[v57&255]+hl[v56>>8]+hl[v56&255]+hl[v55>>8]+hl[v55&255]+hl[v54>>8]+hl[v54&255]+hl[v53>>8]+hl[v53&255]+hl[v52>>8]+hl[v52&255]+hl[v51>>8]+hl[v51&255]+hl[v50>>8]+hl[v50&255]+hl[v49>>8]+hl[v49&255]+hl[v48>>8]+hl[v48&255]+hl[v47>>8]+hl[v47&255]+hl[v46>>8]+hl[v46&255]+hl[v45>>8]+hl[v45&255]+hl[v44>>8]+hl[v44&255]+hl[v43>>8]+hl[v43&255]+hl[v42>>8]+hl[v42&255]+hl[v41>>8]+hl[v41&255]+hl[v40>>8]+hl[v40&255]+hl[v39>>8]+hl[v39&255]+hl[v38>>8]+hl[v38&255]+hl[v37>>8]+hl[v37&255]+hl[v36>>8]+hl[v36&255]+hl[v35>>8]+hl[v35&255]+hl[v34>>8]+hl[v34&255]+hl[v33>>8]+hl[v33&255]+hl[v32>>8]+hl[v32&255]+hl[v31>>8]+hl[v31&255]+hl[v30>>8]+hl[v30&255]+hl[v29>>8]+hl[v29&255]+hl[v28>>8]+hl[v28&255]+hl[v27>>8]+hl[v27&255]+hl[v26>>8]+hl[v26&255]+hl[v25>>8]+hl[v25&255]+hl[v24>>8]+hl[v24&255]+hl[v23>>8]+hl[v23&255]+hl[v22>>8]+hl[v22&255]+hl[v21>>8]+hl[v21&255]+hl[v20>>8]+hl[v20&255]+hl[v19>>8]+hl[v19&255]+hl[v18>>8]+hl[v18&255]+hl[v17>>8]+hl[v17&255]+hl[v16>>8]+hl[v16&255]+hl[v15>>8]+hl[v15&255]+hl[v14>>8]+hl[v14&255]+hl[v13>>8]+hl[v13&255]+hl[v12>>8]+hl[v12&255]+hl[v11>>8]+hl[v11&255]+hl[v10>>8]+hl[v10&255]+hl[v9>>8]+hl[v9&255]+hl[v8>>8]+hl[v8&255]+hl[v7>>8]+hl[v7&255]+hl[v6>>8]+hl[v6&255]+hl[v5>>8]+hl[v5&255]+hl[v4>>8]+hl[v4&255]+hl[v3>>8]+hl[v3&255]+hl[v2>>8]+hl[v2&255]+hl[v1>>8]+hl[v1&255]+hl[v0>>8]+hl[v0&255],1024);
			}

			function _hash1024_1a_utf(str){
				var c,i,l=str.length,s=fnvConstants[1024].offset,t0=0,v0=s[63]|0,t1=0,v1=s[62]|0,t2=0,v2=s[61]|0,t3=0,v3=s[60]|0,t4=0,v4=s[59]|0,t5=0,v5=s[58]|0,t6=0,v6=s[57]|0,t7=0,v7=s[56]|0,t8=0,v8=s[55]|0,t9=0,v9=s[54]|0,t10=0,v10=s[53]|0,t11=0,v11=s[52]|0,t12=0,v12=s[51]|0,t13=0,v13=s[50]|0,t14=0,v14=s[49]|0,t15=0,v15=s[48]|0,t16=0,v16=s[47]|0,t17=0,v17=s[46]|0,t18=0,v18=s[45]|0,t19=0,v19=s[44]|0,t20=0,v20=s[43]|0,t21=0,v21=s[42]|0,t22=0,v22=s[41]|0,t23=0,v23=s[40]|0,t24=0,v24=s[39]|0,t25=0,v25=s[38]|0,t26=0,v26=s[37]|0,t27=0,v27=s[36]|0,t28=0,v28=s[35]|0,t29=0,v29=s[34]|0,t30=0,v30=s[33]|0,t31=0,v31=s[32]|0,t32=0,v32=s[31]|0,t33=0,v33=s[30]|0,t34=0,v34=s[29]|0,t35=0,v35=s[28]|0,t36=0,v36=s[27]|0,t37=0,v37=s[26]|0,t38=0,v38=s[25]|0,t39=0,v39=s[24]|0,t40=0,v40=s[23]|0,t41=0,v41=s[22]|0,t42=0,v42=s[21]|0,t43=0,v43=s[20]|0,t44=0,v44=s[19]|0,t45=0,v45=s[18]|0,t46=0,v46=s[17]|0,t47=0,v47=s[16]|0,t48=0,v48=s[15]|0,t49=0,v49=s[14]|0,t50=0,v50=s[13]|0,t51=0,v51=s[12]|0,t52=0,v52=s[11]|0,t53=0,v53=s[10]|0,t54=0,v54=s[9]|0,t55=0,v55=s[8]|0,t56=0,v56=s[7]|0,t57=0,v57=s[6]|0,t58=0,v58=s[5]|0,t59=0,v59=s[4]|0,t60=0,v60=s[3]|0,t61=0,v61=s[2]|0,t62=0,v62=s[1]|0,t63=0,v63=s[0]|0;

				for (i = 0; i < l; i++) {
					c = str.charCodeAt(i);
					if(c < 128){
						v0^=c;
					}else if(c < 2048){
						v0^=(c>>6)|192;
						t0=v0*397;t1=v1*397;t2=v2*397;t3=v3*397;t4=v4*397;t5=v5*397;t6=v6*397;t7=v7*397;t8=v8*397;t9=v9*397;t10=v10*397;t11=v11*397;t12=v12*397;t13=v13*397;t14=v14*397;t15=v15*397;t16=v16*397;t17=v17*397;t18=v18*397;t19=v19*397;t20=v20*397;t21=v21*397;t22=v22*397;t23=v23*397;t24=v24*397;t25=v25*397;t26=v26*397;t27=v27*397;t28=v28*397;t29=v29*397;t30=v30*397;t31=v31*397;t32=v32*397;t33=v33*397;t34=v34*397;t35=v35*397;t36=v36*397;t37=v37*397;t38=v38*397;t39=v39*397;t40=v40*397;t41=v41*397;t42=v42*397;t43=v43*397;t44=v44*397;t45=v45*397;t46=v46*397;t47=v47*397;t48=v48*397;t49=v49*397;t50=v50*397;t51=v51*397;t52=v52*397;t53=v53*397;t54=v54*397;t55=v55*397;t56=v56*397;t57=v57*397;t58=v58*397;t59=v59*397;t60=v60*397;t61=v61*397;t62=v62*397;t63=v63*397;
						t42+=v0<<8;t43+=v1<<8;t44+=v2<<8;t45+=v3<<8;t46+=v4<<8;t47+=v5<<8;t48+=v6<<8;t49+=v7<<8;t50+=v8<<8;t51+=v9<<8;t52+=v10<<8;t53+=v11<<8;t54+=v12<<8;t55+=v13<<8;t56+=v14<<8;t57+=v15<<8;t58+=v16<<8;t59+=v17<<8;t60+=v18<<8;t61+=v19<<8;t62+=v20<<8;t63+=v21<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;t31+=t30>>>16;v30=t30&65535;t32+=t31>>>16;v31=t31&65535;t33+=t32>>>16;v32=t32&65535;t34+=t33>>>16;v33=t33&65535;t35+=t34>>>16;v34=t34&65535;t36+=t35>>>16;v35=t35&65535;t37+=t36>>>16;v36=t36&65535;t38+=t37>>>16;v37=t37&65535;t39+=t38>>>16;v38=t38&65535;t40+=t39>>>16;v39=t39&65535;t41+=t40>>>16;v40=t40&65535;t42+=t41>>>16;v41=t41&65535;t43+=t42>>>16;v42=t42&65535;t44+=t43>>>16;v43=t43&65535;t45+=t44>>>16;v44=t44&65535;t46+=t45>>>16;v45=t45&65535;t47+=t46>>>16;v46=t46&65535;t48+=t47>>>16;v47=t47&65535;t49+=t48>>>16;v48=t48&65535;t50+=t49>>>16;v49=t49&65535;t51+=t50>>>16;v50=t50&65535;t52+=t51>>>16;v51=t51&65535;t53+=t52>>>16;v52=t52&65535;t54+=t53>>>16;v53=t53&65535;t55+=t54>>>16;v54=t54&65535;t56+=t55>>>16;v55=t55&65535;t57+=t56>>>16;v56=t56&65535;t58+=t57>>>16;v57=t57&65535;t59+=t58>>>16;v58=t58&65535;t60+=t59>>>16;v59=t59&65535;t61+=t60>>>16;v60=t60&65535;t62+=t61>>>16;v61=t61&65535;v63=(t63+(t62>>>16))&65535;v62=t62&65535;
						v0^=(c&63)|128;
					}else if(((c&64512)==55296)&&(i+1)<l&&((str.charCodeAt(i+1)&64512)==56320)){
						c=65536+((c&1023)<<10)+(str.charCodeAt(++i)&1023);
						v0^=(c>>18)|240;
						t0=v0*397;t1=v1*397;t2=v2*397;t3=v3*397;t4=v4*397;t5=v5*397;t6=v6*397;t7=v7*397;t8=v8*397;t9=v9*397;t10=v10*397;t11=v11*397;t12=v12*397;t13=v13*397;t14=v14*397;t15=v15*397;t16=v16*397;t17=v17*397;t18=v18*397;t19=v19*397;t20=v20*397;t21=v21*397;t22=v22*397;t23=v23*397;t24=v24*397;t25=v25*397;t26=v26*397;t27=v27*397;t28=v28*397;t29=v29*397;t30=v30*397;t31=v31*397;t32=v32*397;t33=v33*397;t34=v34*397;t35=v35*397;t36=v36*397;t37=v37*397;t38=v38*397;t39=v39*397;t40=v40*397;t41=v41*397;t42=v42*397;t43=v43*397;t44=v44*397;t45=v45*397;t46=v46*397;t47=v47*397;t48=v48*397;t49=v49*397;t50=v50*397;t51=v51*397;t52=v52*397;t53=v53*397;t54=v54*397;t55=v55*397;t56=v56*397;t57=v57*397;t58=v58*397;t59=v59*397;t60=v60*397;t61=v61*397;t62=v62*397;t63=v63*397;
						t42+=v0<<8;t43+=v1<<8;t44+=v2<<8;t45+=v3<<8;t46+=v4<<8;t47+=v5<<8;t48+=v6<<8;t49+=v7<<8;t50+=v8<<8;t51+=v9<<8;t52+=v10<<8;t53+=v11<<8;t54+=v12<<8;t55+=v13<<8;t56+=v14<<8;t57+=v15<<8;t58+=v16<<8;t59+=v17<<8;t60+=v18<<8;t61+=v19<<8;t62+=v20<<8;t63+=v21<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;t31+=t30>>>16;v30=t30&65535;t32+=t31>>>16;v31=t31&65535;t33+=t32>>>16;v32=t32&65535;t34+=t33>>>16;v33=t33&65535;t35+=t34>>>16;v34=t34&65535;t36+=t35>>>16;v35=t35&65535;t37+=t36>>>16;v36=t36&65535;t38+=t37>>>16;v37=t37&65535;t39+=t38>>>16;v38=t38&65535;t40+=t39>>>16;v39=t39&65535;t41+=t40>>>16;v40=t40&65535;t42+=t41>>>16;v41=t41&65535;t43+=t42>>>16;v42=t42&65535;t44+=t43>>>16;v43=t43&65535;t45+=t44>>>16;v44=t44&65535;t46+=t45>>>16;v45=t45&65535;t47+=t46>>>16;v46=t46&65535;t48+=t47>>>16;v47=t47&65535;t49+=t48>>>16;v48=t48&65535;t50+=t49>>>16;v49=t49&65535;t51+=t50>>>16;v50=t50&65535;t52+=t51>>>16;v51=t51&65535;t53+=t52>>>16;v52=t52&65535;t54+=t53>>>16;v53=t53&65535;t55+=t54>>>16;v54=t54&65535;t56+=t55>>>16;v55=t55&65535;t57+=t56>>>16;v56=t56&65535;t58+=t57>>>16;v57=t57&65535;t59+=t58>>>16;v58=t58&65535;t60+=t59>>>16;v59=t59&65535;t61+=t60>>>16;v60=t60&65535;t62+=t61>>>16;v61=t61&65535;v63=(t63+(t62>>>16))&65535;v62=t62&65535;
						v0^=((c>>12)&63)|128;
						t0=v0*397;t1=v1*397;t2=v2*397;t3=v3*397;t4=v4*397;t5=v5*397;t6=v6*397;t7=v7*397;t8=v8*397;t9=v9*397;t10=v10*397;t11=v11*397;t12=v12*397;t13=v13*397;t14=v14*397;t15=v15*397;t16=v16*397;t17=v17*397;t18=v18*397;t19=v19*397;t20=v20*397;t21=v21*397;t22=v22*397;t23=v23*397;t24=v24*397;t25=v25*397;t26=v26*397;t27=v27*397;t28=v28*397;t29=v29*397;t30=v30*397;t31=v31*397;t32=v32*397;t33=v33*397;t34=v34*397;t35=v35*397;t36=v36*397;t37=v37*397;t38=v38*397;t39=v39*397;t40=v40*397;t41=v41*397;t42=v42*397;t43=v43*397;t44=v44*397;t45=v45*397;t46=v46*397;t47=v47*397;t48=v48*397;t49=v49*397;t50=v50*397;t51=v51*397;t52=v52*397;t53=v53*397;t54=v54*397;t55=v55*397;t56=v56*397;t57=v57*397;t58=v58*397;t59=v59*397;t60=v60*397;t61=v61*397;t62=v62*397;t63=v63*397;
						t42+=v0<<8;t43+=v1<<8;t44+=v2<<8;t45+=v3<<8;t46+=v4<<8;t47+=v5<<8;t48+=v6<<8;t49+=v7<<8;t50+=v8<<8;t51+=v9<<8;t52+=v10<<8;t53+=v11<<8;t54+=v12<<8;t55+=v13<<8;t56+=v14<<8;t57+=v15<<8;t58+=v16<<8;t59+=v17<<8;t60+=v18<<8;t61+=v19<<8;t62+=v20<<8;t63+=v21<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;t31+=t30>>>16;v30=t30&65535;t32+=t31>>>16;v31=t31&65535;t33+=t32>>>16;v32=t32&65535;t34+=t33>>>16;v33=t33&65535;t35+=t34>>>16;v34=t34&65535;t36+=t35>>>16;v35=t35&65535;t37+=t36>>>16;v36=t36&65535;t38+=t37>>>16;v37=t37&65535;t39+=t38>>>16;v38=t38&65535;t40+=t39>>>16;v39=t39&65535;t41+=t40>>>16;v40=t40&65535;t42+=t41>>>16;v41=t41&65535;t43+=t42>>>16;v42=t42&65535;t44+=t43>>>16;v43=t43&65535;t45+=t44>>>16;v44=t44&65535;t46+=t45>>>16;v45=t45&65535;t47+=t46>>>16;v46=t46&65535;t48+=t47>>>16;v47=t47&65535;t49+=t48>>>16;v48=t48&65535;t50+=t49>>>16;v49=t49&65535;t51+=t50>>>16;v50=t50&65535;t52+=t51>>>16;v51=t51&65535;t53+=t52>>>16;v52=t52&65535;t54+=t53>>>16;v53=t53&65535;t55+=t54>>>16;v54=t54&65535;t56+=t55>>>16;v55=t55&65535;t57+=t56>>>16;v56=t56&65535;t58+=t57>>>16;v57=t57&65535;t59+=t58>>>16;v58=t58&65535;t60+=t59>>>16;v59=t59&65535;t61+=t60>>>16;v60=t60&65535;t62+=t61>>>16;v61=t61&65535;v63=(t63+(t62>>>16))&65535;v62=t62&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*397;t1=v1*397;t2=v2*397;t3=v3*397;t4=v4*397;t5=v5*397;t6=v6*397;t7=v7*397;t8=v8*397;t9=v9*397;t10=v10*397;t11=v11*397;t12=v12*397;t13=v13*397;t14=v14*397;t15=v15*397;t16=v16*397;t17=v17*397;t18=v18*397;t19=v19*397;t20=v20*397;t21=v21*397;t22=v22*397;t23=v23*397;t24=v24*397;t25=v25*397;t26=v26*397;t27=v27*397;t28=v28*397;t29=v29*397;t30=v30*397;t31=v31*397;t32=v32*397;t33=v33*397;t34=v34*397;t35=v35*397;t36=v36*397;t37=v37*397;t38=v38*397;t39=v39*397;t40=v40*397;t41=v41*397;t42=v42*397;t43=v43*397;t44=v44*397;t45=v45*397;t46=v46*397;t47=v47*397;t48=v48*397;t49=v49*397;t50=v50*397;t51=v51*397;t52=v52*397;t53=v53*397;t54=v54*397;t55=v55*397;t56=v56*397;t57=v57*397;t58=v58*397;t59=v59*397;t60=v60*397;t61=v61*397;t62=v62*397;t63=v63*397;
						t42+=v0<<8;t43+=v1<<8;t44+=v2<<8;t45+=v3<<8;t46+=v4<<8;t47+=v5<<8;t48+=v6<<8;t49+=v7<<8;t50+=v8<<8;t51+=v9<<8;t52+=v10<<8;t53+=v11<<8;t54+=v12<<8;t55+=v13<<8;t56+=v14<<8;t57+=v15<<8;t58+=v16<<8;t59+=v17<<8;t60+=v18<<8;t61+=v19<<8;t62+=v20<<8;t63+=v21<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;t31+=t30>>>16;v30=t30&65535;t32+=t31>>>16;v31=t31&65535;t33+=t32>>>16;v32=t32&65535;t34+=t33>>>16;v33=t33&65535;t35+=t34>>>16;v34=t34&65535;t36+=t35>>>16;v35=t35&65535;t37+=t36>>>16;v36=t36&65535;t38+=t37>>>16;v37=t37&65535;t39+=t38>>>16;v38=t38&65535;t40+=t39>>>16;v39=t39&65535;t41+=t40>>>16;v40=t40&65535;t42+=t41>>>16;v41=t41&65535;t43+=t42>>>16;v42=t42&65535;t44+=t43>>>16;v43=t43&65535;t45+=t44>>>16;v44=t44&65535;t46+=t45>>>16;v45=t45&65535;t47+=t46>>>16;v46=t46&65535;t48+=t47>>>16;v47=t47&65535;t49+=t48>>>16;v48=t48&65535;t50+=t49>>>16;v49=t49&65535;t51+=t50>>>16;v50=t50&65535;t52+=t51>>>16;v51=t51&65535;t53+=t52>>>16;v52=t52&65535;t54+=t53>>>16;v53=t53&65535;t55+=t54>>>16;v54=t54&65535;t56+=t55>>>16;v55=t55&65535;t57+=t56>>>16;v56=t56&65535;t58+=t57>>>16;v57=t57&65535;t59+=t58>>>16;v58=t58&65535;t60+=t59>>>16;v59=t59&65535;t61+=t60>>>16;v60=t60&65535;t62+=t61>>>16;v61=t61&65535;v63=(t63+(t62>>>16))&65535;v62=t62&65535;
						v0^=(c&63)|128;
					}else {
						v0^=(c>>12)|224;
						t0=v0*397;t1=v1*397;t2=v2*397;t3=v3*397;t4=v4*397;t5=v5*397;t6=v6*397;t7=v7*397;t8=v8*397;t9=v9*397;t10=v10*397;t11=v11*397;t12=v12*397;t13=v13*397;t14=v14*397;t15=v15*397;t16=v16*397;t17=v17*397;t18=v18*397;t19=v19*397;t20=v20*397;t21=v21*397;t22=v22*397;t23=v23*397;t24=v24*397;t25=v25*397;t26=v26*397;t27=v27*397;t28=v28*397;t29=v29*397;t30=v30*397;t31=v31*397;t32=v32*397;t33=v33*397;t34=v34*397;t35=v35*397;t36=v36*397;t37=v37*397;t38=v38*397;t39=v39*397;t40=v40*397;t41=v41*397;t42=v42*397;t43=v43*397;t44=v44*397;t45=v45*397;t46=v46*397;t47=v47*397;t48=v48*397;t49=v49*397;t50=v50*397;t51=v51*397;t52=v52*397;t53=v53*397;t54=v54*397;t55=v55*397;t56=v56*397;t57=v57*397;t58=v58*397;t59=v59*397;t60=v60*397;t61=v61*397;t62=v62*397;t63=v63*397;
						t42+=v0<<8;t43+=v1<<8;t44+=v2<<8;t45+=v3<<8;t46+=v4<<8;t47+=v5<<8;t48+=v6<<8;t49+=v7<<8;t50+=v8<<8;t51+=v9<<8;t52+=v10<<8;t53+=v11<<8;t54+=v12<<8;t55+=v13<<8;t56+=v14<<8;t57+=v15<<8;t58+=v16<<8;t59+=v17<<8;t60+=v18<<8;t61+=v19<<8;t62+=v20<<8;t63+=v21<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;t31+=t30>>>16;v30=t30&65535;t32+=t31>>>16;v31=t31&65535;t33+=t32>>>16;v32=t32&65535;t34+=t33>>>16;v33=t33&65535;t35+=t34>>>16;v34=t34&65535;t36+=t35>>>16;v35=t35&65535;t37+=t36>>>16;v36=t36&65535;t38+=t37>>>16;v37=t37&65535;t39+=t38>>>16;v38=t38&65535;t40+=t39>>>16;v39=t39&65535;t41+=t40>>>16;v40=t40&65535;t42+=t41>>>16;v41=t41&65535;t43+=t42>>>16;v42=t42&65535;t44+=t43>>>16;v43=t43&65535;t45+=t44>>>16;v44=t44&65535;t46+=t45>>>16;v45=t45&65535;t47+=t46>>>16;v46=t46&65535;t48+=t47>>>16;v47=t47&65535;t49+=t48>>>16;v48=t48&65535;t50+=t49>>>16;v49=t49&65535;t51+=t50>>>16;v50=t50&65535;t52+=t51>>>16;v51=t51&65535;t53+=t52>>>16;v52=t52&65535;t54+=t53>>>16;v53=t53&65535;t55+=t54>>>16;v54=t54&65535;t56+=t55>>>16;v55=t55&65535;t57+=t56>>>16;v56=t56&65535;t58+=t57>>>16;v57=t57&65535;t59+=t58>>>16;v58=t58&65535;t60+=t59>>>16;v59=t59&65535;t61+=t60>>>16;v60=t60&65535;t62+=t61>>>16;v61=t61&65535;v63=(t63+(t62>>>16))&65535;v62=t62&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*397;t1=v1*397;t2=v2*397;t3=v3*397;t4=v4*397;t5=v5*397;t6=v6*397;t7=v7*397;t8=v8*397;t9=v9*397;t10=v10*397;t11=v11*397;t12=v12*397;t13=v13*397;t14=v14*397;t15=v15*397;t16=v16*397;t17=v17*397;t18=v18*397;t19=v19*397;t20=v20*397;t21=v21*397;t22=v22*397;t23=v23*397;t24=v24*397;t25=v25*397;t26=v26*397;t27=v27*397;t28=v28*397;t29=v29*397;t30=v30*397;t31=v31*397;t32=v32*397;t33=v33*397;t34=v34*397;t35=v35*397;t36=v36*397;t37=v37*397;t38=v38*397;t39=v39*397;t40=v40*397;t41=v41*397;t42=v42*397;t43=v43*397;t44=v44*397;t45=v45*397;t46=v46*397;t47=v47*397;t48=v48*397;t49=v49*397;t50=v50*397;t51=v51*397;t52=v52*397;t53=v53*397;t54=v54*397;t55=v55*397;t56=v56*397;t57=v57*397;t58=v58*397;t59=v59*397;t60=v60*397;t61=v61*397;t62=v62*397;t63=v63*397;
						t42+=v0<<8;t43+=v1<<8;t44+=v2<<8;t45+=v3<<8;t46+=v4<<8;t47+=v5<<8;t48+=v6<<8;t49+=v7<<8;t50+=v8<<8;t51+=v9<<8;t52+=v10<<8;t53+=v11<<8;t54+=v12<<8;t55+=v13<<8;t56+=v14<<8;t57+=v15<<8;t58+=v16<<8;t59+=v17<<8;t60+=v18<<8;t61+=v19<<8;t62+=v20<<8;t63+=v21<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;t31+=t30>>>16;v30=t30&65535;t32+=t31>>>16;v31=t31&65535;t33+=t32>>>16;v32=t32&65535;t34+=t33>>>16;v33=t33&65535;t35+=t34>>>16;v34=t34&65535;t36+=t35>>>16;v35=t35&65535;t37+=t36>>>16;v36=t36&65535;t38+=t37>>>16;v37=t37&65535;t39+=t38>>>16;v38=t38&65535;t40+=t39>>>16;v39=t39&65535;t41+=t40>>>16;v40=t40&65535;t42+=t41>>>16;v41=t41&65535;t43+=t42>>>16;v42=t42&65535;t44+=t43>>>16;v43=t43&65535;t45+=t44>>>16;v44=t44&65535;t46+=t45>>>16;v45=t45&65535;t47+=t46>>>16;v46=t46&65535;t48+=t47>>>16;v47=t47&65535;t49+=t48>>>16;v48=t48&65535;t50+=t49>>>16;v49=t49&65535;t51+=t50>>>16;v50=t50&65535;t52+=t51>>>16;v51=t51&65535;t53+=t52>>>16;v52=t52&65535;t54+=t53>>>16;v53=t53&65535;t55+=t54>>>16;v54=t54&65535;t56+=t55>>>16;v55=t55&65535;t57+=t56>>>16;v56=t56&65535;t58+=t57>>>16;v57=t57&65535;t59+=t58>>>16;v58=t58&65535;t60+=t59>>>16;v59=t59&65535;t61+=t60>>>16;v60=t60&65535;t62+=t61>>>16;v61=t61&65535;v63=(t63+(t62>>>16))&65535;v62=t62&65535;
						v0^=(c&63)|128;
					}
					t0=v0*397;t1=v1*397;t2=v2*397;t3=v3*397;t4=v4*397;t5=v5*397;t6=v6*397;t7=v7*397;t8=v8*397;t9=v9*397;t10=v10*397;t11=v11*397;t12=v12*397;t13=v13*397;t14=v14*397;t15=v15*397;t16=v16*397;t17=v17*397;t18=v18*397;t19=v19*397;t20=v20*397;t21=v21*397;t22=v22*397;t23=v23*397;t24=v24*397;t25=v25*397;t26=v26*397;t27=v27*397;t28=v28*397;t29=v29*397;t30=v30*397;t31=v31*397;t32=v32*397;t33=v33*397;t34=v34*397;t35=v35*397;t36=v36*397;t37=v37*397;t38=v38*397;t39=v39*397;t40=v40*397;t41=v41*397;t42=v42*397;t43=v43*397;t44=v44*397;t45=v45*397;t46=v46*397;t47=v47*397;t48=v48*397;t49=v49*397;t50=v50*397;t51=v51*397;t52=v52*397;t53=v53*397;t54=v54*397;t55=v55*397;t56=v56*397;t57=v57*397;t58=v58*397;t59=v59*397;t60=v60*397;t61=v61*397;t62=v62*397;t63=v63*397;
					t42+=v0<<8;t43+=v1<<8;t44+=v2<<8;t45+=v3<<8;t46+=v4<<8;t47+=v5<<8;t48+=v6<<8;t49+=v7<<8;t50+=v8<<8;t51+=v9<<8;t52+=v10<<8;t53+=v11<<8;t54+=v12<<8;t55+=v13<<8;t56+=v14<<8;t57+=v15<<8;t58+=v16<<8;t59+=v17<<8;t60+=v18<<8;t61+=v19<<8;t62+=v20<<8;t63+=v21<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;t31+=t30>>>16;v30=t30&65535;t32+=t31>>>16;v31=t31&65535;t33+=t32>>>16;v32=t32&65535;t34+=t33>>>16;v33=t33&65535;t35+=t34>>>16;v34=t34&65535;t36+=t35>>>16;v35=t35&65535;t37+=t36>>>16;v36=t36&65535;t38+=t37>>>16;v37=t37&65535;t39+=t38>>>16;v38=t38&65535;t40+=t39>>>16;v39=t39&65535;t41+=t40>>>16;v40=t40&65535;t42+=t41>>>16;v41=t41&65535;t43+=t42>>>16;v42=t42&65535;t44+=t43>>>16;v43=t43&65535;t45+=t44>>>16;v44=t44&65535;t46+=t45>>>16;v45=t45&65535;t47+=t46>>>16;v46=t46&65535;t48+=t47>>>16;v47=t47&65535;t49+=t48>>>16;v48=t48&65535;t50+=t49>>>16;v49=t49&65535;t51+=t50>>>16;v50=t50&65535;t52+=t51>>>16;v51=t51&65535;t53+=t52>>>16;v52=t52&65535;t54+=t53>>>16;v53=t53&65535;t55+=t54>>>16;v54=t54&65535;t56+=t55>>>16;v55=t55&65535;t57+=t56>>>16;v56=t56&65535;t58+=t57>>>16;v57=t57&65535;t59+=t58>>>16;v58=t58&65535;t60+=t59>>>16;v59=t59&65535;t61+=t60>>>16;v60=t60&65535;t62+=t61>>>16;v61=t61&65535;v63=(t63+(t62>>>16))&65535;v62=t62&65535;
				}

				return hashValHex(hl[v63>>8]+hl[v63&255]+hl[v62>>8]+hl[v62&255]+hl[v61>>8]+hl[v61&255]+hl[v60>>8]+hl[v60&255]+hl[v59>>8]+hl[v59&255]+hl[v58>>8]+hl[v58&255]+hl[v57>>8]+hl[v57&255]+hl[v56>>8]+hl[v56&255]+hl[v55>>8]+hl[v55&255]+hl[v54>>8]+hl[v54&255]+hl[v53>>8]+hl[v53&255]+hl[v52>>8]+hl[v52&255]+hl[v51>>8]+hl[v51&255]+hl[v50>>8]+hl[v50&255]+hl[v49>>8]+hl[v49&255]+hl[v48>>8]+hl[v48&255]+hl[v47>>8]+hl[v47&255]+hl[v46>>8]+hl[v46&255]+hl[v45>>8]+hl[v45&255]+hl[v44>>8]+hl[v44&255]+hl[v43>>8]+hl[v43&255]+hl[v42>>8]+hl[v42&255]+hl[v41>>8]+hl[v41&255]+hl[v40>>8]+hl[v40&255]+hl[v39>>8]+hl[v39&255]+hl[v38>>8]+hl[v38&255]+hl[v37>>8]+hl[v37&255]+hl[v36>>8]+hl[v36&255]+hl[v35>>8]+hl[v35&255]+hl[v34>>8]+hl[v34&255]+hl[v33>>8]+hl[v33&255]+hl[v32>>8]+hl[v32&255]+hl[v31>>8]+hl[v31&255]+hl[v30>>8]+hl[v30&255]+hl[v29>>8]+hl[v29&255]+hl[v28>>8]+hl[v28&255]+hl[v27>>8]+hl[v27&255]+hl[v26>>8]+hl[v26&255]+hl[v25>>8]+hl[v25&255]+hl[v24>>8]+hl[v24&255]+hl[v23>>8]+hl[v23&255]+hl[v22>>8]+hl[v22&255]+hl[v21>>8]+hl[v21&255]+hl[v20>>8]+hl[v20&255]+hl[v19>>8]+hl[v19&255]+hl[v18>>8]+hl[v18&255]+hl[v17>>8]+hl[v17&255]+hl[v16>>8]+hl[v16&255]+hl[v15>>8]+hl[v15&255]+hl[v14>>8]+hl[v14&255]+hl[v13>>8]+hl[v13&255]+hl[v12>>8]+hl[v12&255]+hl[v11>>8]+hl[v11&255]+hl[v10>>8]+hl[v10&255]+hl[v9>>8]+hl[v9&255]+hl[v8>>8]+hl[v8&255]+hl[v7>>8]+hl[v7&255]+hl[v6>>8]+hl[v6&255]+hl[v5>>8]+hl[v5&255]+hl[v4>>8]+hl[v4&255]+hl[v3>>8]+hl[v3&255]+hl[v2>>8]+hl[v2&255]+hl[v1>>8]+hl[v1&255]+hl[v0>>8]+hl[v0&255],1024);
			}

			function _hash1024_1_utf(str){
				var c,i,l=str.length,s=fnvConstants[1024].offset,t0=0,v0=s[63]|0,t1=0,v1=s[62]|0,t2=0,v2=s[61]|0,t3=0,v3=s[60]|0,t4=0,v4=s[59]|0,t5=0,v5=s[58]|0,t6=0,v6=s[57]|0,t7=0,v7=s[56]|0,t8=0,v8=s[55]|0,t9=0,v9=s[54]|0,t10=0,v10=s[53]|0,t11=0,v11=s[52]|0,t12=0,v12=s[51]|0,t13=0,v13=s[50]|0,t14=0,v14=s[49]|0,t15=0,v15=s[48]|0,t16=0,v16=s[47]|0,t17=0,v17=s[46]|0,t18=0,v18=s[45]|0,t19=0,v19=s[44]|0,t20=0,v20=s[43]|0,t21=0,v21=s[42]|0,t22=0,v22=s[41]|0,t23=0,v23=s[40]|0,t24=0,v24=s[39]|0,t25=0,v25=s[38]|0,t26=0,v26=s[37]|0,t27=0,v27=s[36]|0,t28=0,v28=s[35]|0,t29=0,v29=s[34]|0,t30=0,v30=s[33]|0,t31=0,v31=s[32]|0,t32=0,v32=s[31]|0,t33=0,v33=s[30]|0,t34=0,v34=s[29]|0,t35=0,v35=s[28]|0,t36=0,v36=s[27]|0,t37=0,v37=s[26]|0,t38=0,v38=s[25]|0,t39=0,v39=s[24]|0,t40=0,v40=s[23]|0,t41=0,v41=s[22]|0,t42=0,v42=s[21]|0,t43=0,v43=s[20]|0,t44=0,v44=s[19]|0,t45=0,v45=s[18]|0,t46=0,v46=s[17]|0,t47=0,v47=s[16]|0,t48=0,v48=s[15]|0,t49=0,v49=s[14]|0,t50=0,v50=s[13]|0,t51=0,v51=s[12]|0,t52=0,v52=s[11]|0,t53=0,v53=s[10]|0,t54=0,v54=s[9]|0,t55=0,v55=s[8]|0,t56=0,v56=s[7]|0,t57=0,v57=s[6]|0,t58=0,v58=s[5]|0,t59=0,v59=s[4]|0,t60=0,v60=s[3]|0,t61=0,v61=s[2]|0,t62=0,v62=s[1]|0,t63=0,v63=s[0]|0;

				for (i = 0; i < l; i++) {
					c = str.charCodeAt(i);
					t0=v0*397;t1=v1*397;t2=v2*397;t3=v3*397;t4=v4*397;t5=v5*397;t6=v6*397;t7=v7*397;t8=v8*397;t9=v9*397;t10=v10*397;t11=v11*397;t12=v12*397;t13=v13*397;t14=v14*397;t15=v15*397;t16=v16*397;t17=v17*397;t18=v18*397;t19=v19*397;t20=v20*397;t21=v21*397;t22=v22*397;t23=v23*397;t24=v24*397;t25=v25*397;t26=v26*397;t27=v27*397;t28=v28*397;t29=v29*397;t30=v30*397;t31=v31*397;t32=v32*397;t33=v33*397;t34=v34*397;t35=v35*397;t36=v36*397;t37=v37*397;t38=v38*397;t39=v39*397;t40=v40*397;t41=v41*397;t42=v42*397;t43=v43*397;t44=v44*397;t45=v45*397;t46=v46*397;t47=v47*397;t48=v48*397;t49=v49*397;t50=v50*397;t51=v51*397;t52=v52*397;t53=v53*397;t54=v54*397;t55=v55*397;t56=v56*397;t57=v57*397;t58=v58*397;t59=v59*397;t60=v60*397;t61=v61*397;t62=v62*397;t63=v63*397;
					t42+=v0<<8;t43+=v1<<8;t44+=v2<<8;t45+=v3<<8;t46+=v4<<8;t47+=v5<<8;t48+=v6<<8;t49+=v7<<8;t50+=v8<<8;t51+=v9<<8;t52+=v10<<8;t53+=v11<<8;t54+=v12<<8;t55+=v13<<8;t56+=v14<<8;t57+=v15<<8;t58+=v16<<8;t59+=v17<<8;t60+=v18<<8;t61+=v19<<8;t62+=v20<<8;t63+=v21<<8;
					t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;t31+=t30>>>16;v30=t30&65535;t32+=t31>>>16;v31=t31&65535;t33+=t32>>>16;v32=t32&65535;t34+=t33>>>16;v33=t33&65535;t35+=t34>>>16;v34=t34&65535;t36+=t35>>>16;v35=t35&65535;t37+=t36>>>16;v36=t36&65535;t38+=t37>>>16;v37=t37&65535;t39+=t38>>>16;v38=t38&65535;t40+=t39>>>16;v39=t39&65535;t41+=t40>>>16;v40=t40&65535;t42+=t41>>>16;v41=t41&65535;t43+=t42>>>16;v42=t42&65535;t44+=t43>>>16;v43=t43&65535;t45+=t44>>>16;v44=t44&65535;t46+=t45>>>16;v45=t45&65535;t47+=t46>>>16;v46=t46&65535;t48+=t47>>>16;v47=t47&65535;t49+=t48>>>16;v48=t48&65535;t50+=t49>>>16;v49=t49&65535;t51+=t50>>>16;v50=t50&65535;t52+=t51>>>16;v51=t51&65535;t53+=t52>>>16;v52=t52&65535;t54+=t53>>>16;v53=t53&65535;t55+=t54>>>16;v54=t54&65535;t56+=t55>>>16;v55=t55&65535;t57+=t56>>>16;v56=t56&65535;t58+=t57>>>16;v57=t57&65535;t59+=t58>>>16;v58=t58&65535;t60+=t59>>>16;v59=t59&65535;t61+=t60>>>16;v60=t60&65535;t62+=t61>>>16;v61=t61&65535;v63=(t63+(t62>>>16))&65535;v62=t62&65535;
					if(c < 128){
						v0^=c;
					}else if(c < 2048){
						v0^=(c>>6)|192;
						t0=v0*397;t1=v1*397;t2=v2*397;t3=v3*397;t4=v4*397;t5=v5*397;t6=v6*397;t7=v7*397;t8=v8*397;t9=v9*397;t10=v10*397;t11=v11*397;t12=v12*397;t13=v13*397;t14=v14*397;t15=v15*397;t16=v16*397;t17=v17*397;t18=v18*397;t19=v19*397;t20=v20*397;t21=v21*397;t22=v22*397;t23=v23*397;t24=v24*397;t25=v25*397;t26=v26*397;t27=v27*397;t28=v28*397;t29=v29*397;t30=v30*397;t31=v31*397;t32=v32*397;t33=v33*397;t34=v34*397;t35=v35*397;t36=v36*397;t37=v37*397;t38=v38*397;t39=v39*397;t40=v40*397;t41=v41*397;t42=v42*397;t43=v43*397;t44=v44*397;t45=v45*397;t46=v46*397;t47=v47*397;t48=v48*397;t49=v49*397;t50=v50*397;t51=v51*397;t52=v52*397;t53=v53*397;t54=v54*397;t55=v55*397;t56=v56*397;t57=v57*397;t58=v58*397;t59=v59*397;t60=v60*397;t61=v61*397;t62=v62*397;t63=v63*397;
						t42+=v0<<8;t43+=v1<<8;t44+=v2<<8;t45+=v3<<8;t46+=v4<<8;t47+=v5<<8;t48+=v6<<8;t49+=v7<<8;t50+=v8<<8;t51+=v9<<8;t52+=v10<<8;t53+=v11<<8;t54+=v12<<8;t55+=v13<<8;t56+=v14<<8;t57+=v15<<8;t58+=v16<<8;t59+=v17<<8;t60+=v18<<8;t61+=v19<<8;t62+=v20<<8;t63+=v21<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;t31+=t30>>>16;v30=t30&65535;t32+=t31>>>16;v31=t31&65535;t33+=t32>>>16;v32=t32&65535;t34+=t33>>>16;v33=t33&65535;t35+=t34>>>16;v34=t34&65535;t36+=t35>>>16;v35=t35&65535;t37+=t36>>>16;v36=t36&65535;t38+=t37>>>16;v37=t37&65535;t39+=t38>>>16;v38=t38&65535;t40+=t39>>>16;v39=t39&65535;t41+=t40>>>16;v40=t40&65535;t42+=t41>>>16;v41=t41&65535;t43+=t42>>>16;v42=t42&65535;t44+=t43>>>16;v43=t43&65535;t45+=t44>>>16;v44=t44&65535;t46+=t45>>>16;v45=t45&65535;t47+=t46>>>16;v46=t46&65535;t48+=t47>>>16;v47=t47&65535;t49+=t48>>>16;v48=t48&65535;t50+=t49>>>16;v49=t49&65535;t51+=t50>>>16;v50=t50&65535;t52+=t51>>>16;v51=t51&65535;t53+=t52>>>16;v52=t52&65535;t54+=t53>>>16;v53=t53&65535;t55+=t54>>>16;v54=t54&65535;t56+=t55>>>16;v55=t55&65535;t57+=t56>>>16;v56=t56&65535;t58+=t57>>>16;v57=t57&65535;t59+=t58>>>16;v58=t58&65535;t60+=t59>>>16;v59=t59&65535;t61+=t60>>>16;v60=t60&65535;t62+=t61>>>16;v61=t61&65535;v63=(t63+(t62>>>16))&65535;v62=t62&65535;
						v0^=(c&63)|128;
					}else if(((c&64512)==55296)&&(i+1)<l&&((str.charCodeAt(i+1)&64512)==56320)){
						c=65536+((c&1023)<<10)+(str.charCodeAt(++i)&1023);
						v0^=(c>>18)|240;
						t0=v0*397;t1=v1*397;t2=v2*397;t3=v3*397;t4=v4*397;t5=v5*397;t6=v6*397;t7=v7*397;t8=v8*397;t9=v9*397;t10=v10*397;t11=v11*397;t12=v12*397;t13=v13*397;t14=v14*397;t15=v15*397;t16=v16*397;t17=v17*397;t18=v18*397;t19=v19*397;t20=v20*397;t21=v21*397;t22=v22*397;t23=v23*397;t24=v24*397;t25=v25*397;t26=v26*397;t27=v27*397;t28=v28*397;t29=v29*397;t30=v30*397;t31=v31*397;t32=v32*397;t33=v33*397;t34=v34*397;t35=v35*397;t36=v36*397;t37=v37*397;t38=v38*397;t39=v39*397;t40=v40*397;t41=v41*397;t42=v42*397;t43=v43*397;t44=v44*397;t45=v45*397;t46=v46*397;t47=v47*397;t48=v48*397;t49=v49*397;t50=v50*397;t51=v51*397;t52=v52*397;t53=v53*397;t54=v54*397;t55=v55*397;t56=v56*397;t57=v57*397;t58=v58*397;t59=v59*397;t60=v60*397;t61=v61*397;t62=v62*397;t63=v63*397;
						t42+=v0<<8;t43+=v1<<8;t44+=v2<<8;t45+=v3<<8;t46+=v4<<8;t47+=v5<<8;t48+=v6<<8;t49+=v7<<8;t50+=v8<<8;t51+=v9<<8;t52+=v10<<8;t53+=v11<<8;t54+=v12<<8;t55+=v13<<8;t56+=v14<<8;t57+=v15<<8;t58+=v16<<8;t59+=v17<<8;t60+=v18<<8;t61+=v19<<8;t62+=v20<<8;t63+=v21<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;t31+=t30>>>16;v30=t30&65535;t32+=t31>>>16;v31=t31&65535;t33+=t32>>>16;v32=t32&65535;t34+=t33>>>16;v33=t33&65535;t35+=t34>>>16;v34=t34&65535;t36+=t35>>>16;v35=t35&65535;t37+=t36>>>16;v36=t36&65535;t38+=t37>>>16;v37=t37&65535;t39+=t38>>>16;v38=t38&65535;t40+=t39>>>16;v39=t39&65535;t41+=t40>>>16;v40=t40&65535;t42+=t41>>>16;v41=t41&65535;t43+=t42>>>16;v42=t42&65535;t44+=t43>>>16;v43=t43&65535;t45+=t44>>>16;v44=t44&65535;t46+=t45>>>16;v45=t45&65535;t47+=t46>>>16;v46=t46&65535;t48+=t47>>>16;v47=t47&65535;t49+=t48>>>16;v48=t48&65535;t50+=t49>>>16;v49=t49&65535;t51+=t50>>>16;v50=t50&65535;t52+=t51>>>16;v51=t51&65535;t53+=t52>>>16;v52=t52&65535;t54+=t53>>>16;v53=t53&65535;t55+=t54>>>16;v54=t54&65535;t56+=t55>>>16;v55=t55&65535;t57+=t56>>>16;v56=t56&65535;t58+=t57>>>16;v57=t57&65535;t59+=t58>>>16;v58=t58&65535;t60+=t59>>>16;v59=t59&65535;t61+=t60>>>16;v60=t60&65535;t62+=t61>>>16;v61=t61&65535;v63=(t63+(t62>>>16))&65535;v62=t62&65535;
						v0^=((c>>12)&63)|128;
						t0=v0*397;t1=v1*397;t2=v2*397;t3=v3*397;t4=v4*397;t5=v5*397;t6=v6*397;t7=v7*397;t8=v8*397;t9=v9*397;t10=v10*397;t11=v11*397;t12=v12*397;t13=v13*397;t14=v14*397;t15=v15*397;t16=v16*397;t17=v17*397;t18=v18*397;t19=v19*397;t20=v20*397;t21=v21*397;t22=v22*397;t23=v23*397;t24=v24*397;t25=v25*397;t26=v26*397;t27=v27*397;t28=v28*397;t29=v29*397;t30=v30*397;t31=v31*397;t32=v32*397;t33=v33*397;t34=v34*397;t35=v35*397;t36=v36*397;t37=v37*397;t38=v38*397;t39=v39*397;t40=v40*397;t41=v41*397;t42=v42*397;t43=v43*397;t44=v44*397;t45=v45*397;t46=v46*397;t47=v47*397;t48=v48*397;t49=v49*397;t50=v50*397;t51=v51*397;t52=v52*397;t53=v53*397;t54=v54*397;t55=v55*397;t56=v56*397;t57=v57*397;t58=v58*397;t59=v59*397;t60=v60*397;t61=v61*397;t62=v62*397;t63=v63*397;
						t42+=v0<<8;t43+=v1<<8;t44+=v2<<8;t45+=v3<<8;t46+=v4<<8;t47+=v5<<8;t48+=v6<<8;t49+=v7<<8;t50+=v8<<8;t51+=v9<<8;t52+=v10<<8;t53+=v11<<8;t54+=v12<<8;t55+=v13<<8;t56+=v14<<8;t57+=v15<<8;t58+=v16<<8;t59+=v17<<8;t60+=v18<<8;t61+=v19<<8;t62+=v20<<8;t63+=v21<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;t31+=t30>>>16;v30=t30&65535;t32+=t31>>>16;v31=t31&65535;t33+=t32>>>16;v32=t32&65535;t34+=t33>>>16;v33=t33&65535;t35+=t34>>>16;v34=t34&65535;t36+=t35>>>16;v35=t35&65535;t37+=t36>>>16;v36=t36&65535;t38+=t37>>>16;v37=t37&65535;t39+=t38>>>16;v38=t38&65535;t40+=t39>>>16;v39=t39&65535;t41+=t40>>>16;v40=t40&65535;t42+=t41>>>16;v41=t41&65535;t43+=t42>>>16;v42=t42&65535;t44+=t43>>>16;v43=t43&65535;t45+=t44>>>16;v44=t44&65535;t46+=t45>>>16;v45=t45&65535;t47+=t46>>>16;v46=t46&65535;t48+=t47>>>16;v47=t47&65535;t49+=t48>>>16;v48=t48&65535;t50+=t49>>>16;v49=t49&65535;t51+=t50>>>16;v50=t50&65535;t52+=t51>>>16;v51=t51&65535;t53+=t52>>>16;v52=t52&65535;t54+=t53>>>16;v53=t53&65535;t55+=t54>>>16;v54=t54&65535;t56+=t55>>>16;v55=t55&65535;t57+=t56>>>16;v56=t56&65535;t58+=t57>>>16;v57=t57&65535;t59+=t58>>>16;v58=t58&65535;t60+=t59>>>16;v59=t59&65535;t61+=t60>>>16;v60=t60&65535;t62+=t61>>>16;v61=t61&65535;v63=(t63+(t62>>>16))&65535;v62=t62&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*397;t1=v1*397;t2=v2*397;t3=v3*397;t4=v4*397;t5=v5*397;t6=v6*397;t7=v7*397;t8=v8*397;t9=v9*397;t10=v10*397;t11=v11*397;t12=v12*397;t13=v13*397;t14=v14*397;t15=v15*397;t16=v16*397;t17=v17*397;t18=v18*397;t19=v19*397;t20=v20*397;t21=v21*397;t22=v22*397;t23=v23*397;t24=v24*397;t25=v25*397;t26=v26*397;t27=v27*397;t28=v28*397;t29=v29*397;t30=v30*397;t31=v31*397;t32=v32*397;t33=v33*397;t34=v34*397;t35=v35*397;t36=v36*397;t37=v37*397;t38=v38*397;t39=v39*397;t40=v40*397;t41=v41*397;t42=v42*397;t43=v43*397;t44=v44*397;t45=v45*397;t46=v46*397;t47=v47*397;t48=v48*397;t49=v49*397;t50=v50*397;t51=v51*397;t52=v52*397;t53=v53*397;t54=v54*397;t55=v55*397;t56=v56*397;t57=v57*397;t58=v58*397;t59=v59*397;t60=v60*397;t61=v61*397;t62=v62*397;t63=v63*397;
						t42+=v0<<8;t43+=v1<<8;t44+=v2<<8;t45+=v3<<8;t46+=v4<<8;t47+=v5<<8;t48+=v6<<8;t49+=v7<<8;t50+=v8<<8;t51+=v9<<8;t52+=v10<<8;t53+=v11<<8;t54+=v12<<8;t55+=v13<<8;t56+=v14<<8;t57+=v15<<8;t58+=v16<<8;t59+=v17<<8;t60+=v18<<8;t61+=v19<<8;t62+=v20<<8;t63+=v21<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;t31+=t30>>>16;v30=t30&65535;t32+=t31>>>16;v31=t31&65535;t33+=t32>>>16;v32=t32&65535;t34+=t33>>>16;v33=t33&65535;t35+=t34>>>16;v34=t34&65535;t36+=t35>>>16;v35=t35&65535;t37+=t36>>>16;v36=t36&65535;t38+=t37>>>16;v37=t37&65535;t39+=t38>>>16;v38=t38&65535;t40+=t39>>>16;v39=t39&65535;t41+=t40>>>16;v40=t40&65535;t42+=t41>>>16;v41=t41&65535;t43+=t42>>>16;v42=t42&65535;t44+=t43>>>16;v43=t43&65535;t45+=t44>>>16;v44=t44&65535;t46+=t45>>>16;v45=t45&65535;t47+=t46>>>16;v46=t46&65535;t48+=t47>>>16;v47=t47&65535;t49+=t48>>>16;v48=t48&65535;t50+=t49>>>16;v49=t49&65535;t51+=t50>>>16;v50=t50&65535;t52+=t51>>>16;v51=t51&65535;t53+=t52>>>16;v52=t52&65535;t54+=t53>>>16;v53=t53&65535;t55+=t54>>>16;v54=t54&65535;t56+=t55>>>16;v55=t55&65535;t57+=t56>>>16;v56=t56&65535;t58+=t57>>>16;v57=t57&65535;t59+=t58>>>16;v58=t58&65535;t60+=t59>>>16;v59=t59&65535;t61+=t60>>>16;v60=t60&65535;t62+=t61>>>16;v61=t61&65535;v63=(t63+(t62>>>16))&65535;v62=t62&65535;
						v0^=(c&63)|128;
					}else {
						v0^=(c>>12)|224;
						t0=v0*397;t1=v1*397;t2=v2*397;t3=v3*397;t4=v4*397;t5=v5*397;t6=v6*397;t7=v7*397;t8=v8*397;t9=v9*397;t10=v10*397;t11=v11*397;t12=v12*397;t13=v13*397;t14=v14*397;t15=v15*397;t16=v16*397;t17=v17*397;t18=v18*397;t19=v19*397;t20=v20*397;t21=v21*397;t22=v22*397;t23=v23*397;t24=v24*397;t25=v25*397;t26=v26*397;t27=v27*397;t28=v28*397;t29=v29*397;t30=v30*397;t31=v31*397;t32=v32*397;t33=v33*397;t34=v34*397;t35=v35*397;t36=v36*397;t37=v37*397;t38=v38*397;t39=v39*397;t40=v40*397;t41=v41*397;t42=v42*397;t43=v43*397;t44=v44*397;t45=v45*397;t46=v46*397;t47=v47*397;t48=v48*397;t49=v49*397;t50=v50*397;t51=v51*397;t52=v52*397;t53=v53*397;t54=v54*397;t55=v55*397;t56=v56*397;t57=v57*397;t58=v58*397;t59=v59*397;t60=v60*397;t61=v61*397;t62=v62*397;t63=v63*397;
						t42+=v0<<8;t43+=v1<<8;t44+=v2<<8;t45+=v3<<8;t46+=v4<<8;t47+=v5<<8;t48+=v6<<8;t49+=v7<<8;t50+=v8<<8;t51+=v9<<8;t52+=v10<<8;t53+=v11<<8;t54+=v12<<8;t55+=v13<<8;t56+=v14<<8;t57+=v15<<8;t58+=v16<<8;t59+=v17<<8;t60+=v18<<8;t61+=v19<<8;t62+=v20<<8;t63+=v21<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;t31+=t30>>>16;v30=t30&65535;t32+=t31>>>16;v31=t31&65535;t33+=t32>>>16;v32=t32&65535;t34+=t33>>>16;v33=t33&65535;t35+=t34>>>16;v34=t34&65535;t36+=t35>>>16;v35=t35&65535;t37+=t36>>>16;v36=t36&65535;t38+=t37>>>16;v37=t37&65535;t39+=t38>>>16;v38=t38&65535;t40+=t39>>>16;v39=t39&65535;t41+=t40>>>16;v40=t40&65535;t42+=t41>>>16;v41=t41&65535;t43+=t42>>>16;v42=t42&65535;t44+=t43>>>16;v43=t43&65535;t45+=t44>>>16;v44=t44&65535;t46+=t45>>>16;v45=t45&65535;t47+=t46>>>16;v46=t46&65535;t48+=t47>>>16;v47=t47&65535;t49+=t48>>>16;v48=t48&65535;t50+=t49>>>16;v49=t49&65535;t51+=t50>>>16;v50=t50&65535;t52+=t51>>>16;v51=t51&65535;t53+=t52>>>16;v52=t52&65535;t54+=t53>>>16;v53=t53&65535;t55+=t54>>>16;v54=t54&65535;t56+=t55>>>16;v55=t55&65535;t57+=t56>>>16;v56=t56&65535;t58+=t57>>>16;v57=t57&65535;t59+=t58>>>16;v58=t58&65535;t60+=t59>>>16;v59=t59&65535;t61+=t60>>>16;v60=t60&65535;t62+=t61>>>16;v61=t61&65535;v63=(t63+(t62>>>16))&65535;v62=t62&65535;
						v0^=((c>>6)&63)|128;
						t0=v0*397;t1=v1*397;t2=v2*397;t3=v3*397;t4=v4*397;t5=v5*397;t6=v6*397;t7=v7*397;t8=v8*397;t9=v9*397;t10=v10*397;t11=v11*397;t12=v12*397;t13=v13*397;t14=v14*397;t15=v15*397;t16=v16*397;t17=v17*397;t18=v18*397;t19=v19*397;t20=v20*397;t21=v21*397;t22=v22*397;t23=v23*397;t24=v24*397;t25=v25*397;t26=v26*397;t27=v27*397;t28=v28*397;t29=v29*397;t30=v30*397;t31=v31*397;t32=v32*397;t33=v33*397;t34=v34*397;t35=v35*397;t36=v36*397;t37=v37*397;t38=v38*397;t39=v39*397;t40=v40*397;t41=v41*397;t42=v42*397;t43=v43*397;t44=v44*397;t45=v45*397;t46=v46*397;t47=v47*397;t48=v48*397;t49=v49*397;t50=v50*397;t51=v51*397;t52=v52*397;t53=v53*397;t54=v54*397;t55=v55*397;t56=v56*397;t57=v57*397;t58=v58*397;t59=v59*397;t60=v60*397;t61=v61*397;t62=v62*397;t63=v63*397;
						t42+=v0<<8;t43+=v1<<8;t44+=v2<<8;t45+=v3<<8;t46+=v4<<8;t47+=v5<<8;t48+=v6<<8;t49+=v7<<8;t50+=v8<<8;t51+=v9<<8;t52+=v10<<8;t53+=v11<<8;t54+=v12<<8;t55+=v13<<8;t56+=v14<<8;t57+=v15<<8;t58+=v16<<8;t59+=v17<<8;t60+=v18<<8;t61+=v19<<8;t62+=v20<<8;t63+=v21<<8;
						t1+=t0>>>16;v0=t0&65535;t2+=t1>>>16;v1=t1&65535;t3+=t2>>>16;v2=t2&65535;t4+=t3>>>16;v3=t3&65535;t5+=t4>>>16;v4=t4&65535;t6+=t5>>>16;v5=t5&65535;t7+=t6>>>16;v6=t6&65535;t8+=t7>>>16;v7=t7&65535;t9+=t8>>>16;v8=t8&65535;t10+=t9>>>16;v9=t9&65535;t11+=t10>>>16;v10=t10&65535;t12+=t11>>>16;v11=t11&65535;t13+=t12>>>16;v12=t12&65535;t14+=t13>>>16;v13=t13&65535;t15+=t14>>>16;v14=t14&65535;t16+=t15>>>16;v15=t15&65535;t17+=t16>>>16;v16=t16&65535;t18+=t17>>>16;v17=t17&65535;t19+=t18>>>16;v18=t18&65535;t20+=t19>>>16;v19=t19&65535;t21+=t20>>>16;v20=t20&65535;t22+=t21>>>16;v21=t21&65535;t23+=t22>>>16;v22=t22&65535;t24+=t23>>>16;v23=t23&65535;t25+=t24>>>16;v24=t24&65535;t26+=t25>>>16;v25=t25&65535;t27+=t26>>>16;v26=t26&65535;t28+=t27>>>16;v27=t27&65535;t29+=t28>>>16;v28=t28&65535;t30+=t29>>>16;v29=t29&65535;t31+=t30>>>16;v30=t30&65535;t32+=t31>>>16;v31=t31&65535;t33+=t32>>>16;v32=t32&65535;t34+=t33>>>16;v33=t33&65535;t35+=t34>>>16;v34=t34&65535;t36+=t35>>>16;v35=t35&65535;t37+=t36>>>16;v36=t36&65535;t38+=t37>>>16;v37=t37&65535;t39+=t38>>>16;v38=t38&65535;t40+=t39>>>16;v39=t39&65535;t41+=t40>>>16;v40=t40&65535;t42+=t41>>>16;v41=t41&65535;t43+=t42>>>16;v42=t42&65535;t44+=t43>>>16;v43=t43&65535;t45+=t44>>>16;v44=t44&65535;t46+=t45>>>16;v45=t45&65535;t47+=t46>>>16;v46=t46&65535;t48+=t47>>>16;v47=t47&65535;t49+=t48>>>16;v48=t48&65535;t50+=t49>>>16;v49=t49&65535;t51+=t50>>>16;v50=t50&65535;t52+=t51>>>16;v51=t51&65535;t53+=t52>>>16;v52=t52&65535;t54+=t53>>>16;v53=t53&65535;t55+=t54>>>16;v54=t54&65535;t56+=t55>>>16;v55=t55&65535;t57+=t56>>>16;v56=t56&65535;t58+=t57>>>16;v57=t57&65535;t59+=t58>>>16;v58=t58&65535;t60+=t59>>>16;v59=t59&65535;t61+=t60>>>16;v60=t60&65535;t62+=t61>>>16;v61=t61&65535;v63=(t63+(t62>>>16))&65535;v62=t62&65535;
						v0^=(c&63)|128;
					}
				}

				return hashValHex(hl[v63>>8]+hl[v63&255]+hl[v62>>8]+hl[v62&255]+hl[v61>>8]+hl[v61&255]+hl[v60>>8]+hl[v60&255]+hl[v59>>8]+hl[v59&255]+hl[v58>>8]+hl[v58&255]+hl[v57>>8]+hl[v57&255]+hl[v56>>8]+hl[v56&255]+hl[v55>>8]+hl[v55&255]+hl[v54>>8]+hl[v54&255]+hl[v53>>8]+hl[v53&255]+hl[v52>>8]+hl[v52&255]+hl[v51>>8]+hl[v51&255]+hl[v50>>8]+hl[v50&255]+hl[v49>>8]+hl[v49&255]+hl[v48>>8]+hl[v48&255]+hl[v47>>8]+hl[v47&255]+hl[v46>>8]+hl[v46&255]+hl[v45>>8]+hl[v45&255]+hl[v44>>8]+hl[v44&255]+hl[v43>>8]+hl[v43&255]+hl[v42>>8]+hl[v42&255]+hl[v41>>8]+hl[v41&255]+hl[v40>>8]+hl[v40&255]+hl[v39>>8]+hl[v39&255]+hl[v38>>8]+hl[v38&255]+hl[v37>>8]+hl[v37&255]+hl[v36>>8]+hl[v36&255]+hl[v35>>8]+hl[v35&255]+hl[v34>>8]+hl[v34&255]+hl[v33>>8]+hl[v33&255]+hl[v32>>8]+hl[v32&255]+hl[v31>>8]+hl[v31&255]+hl[v30>>8]+hl[v30&255]+hl[v29>>8]+hl[v29&255]+hl[v28>>8]+hl[v28&255]+hl[v27>>8]+hl[v27&255]+hl[v26>>8]+hl[v26&255]+hl[v25>>8]+hl[v25&255]+hl[v24>>8]+hl[v24&255]+hl[v23>>8]+hl[v23&255]+hl[v22>>8]+hl[v22&255]+hl[v21>>8]+hl[v21&255]+hl[v20>>8]+hl[v20&255]+hl[v19>>8]+hl[v19&255]+hl[v18>>8]+hl[v18&255]+hl[v17>>8]+hl[v17&255]+hl[v16>>8]+hl[v16&255]+hl[v15>>8]+hl[v15&255]+hl[v14>>8]+hl[v14&255]+hl[v13>>8]+hl[v13&255]+hl[v12>>8]+hl[v12&255]+hl[v11>>8]+hl[v11&255]+hl[v10>>8]+hl[v10&255]+hl[v9>>8]+hl[v9&255]+hl[v8>>8]+hl[v8&255]+hl[v7>>8]+hl[v7&255]+hl[v6>>8]+hl[v6&255]+hl[v5>>8]+hl[v5&255]+hl[v4>>8]+hl[v4&255]+hl[v3>>8]+hl[v3&255]+hl[v2>>8]+hl[v2&255]+hl[v1>>8]+hl[v1&255]+hl[v0>>8]+hl[v0&255],1024);
			}

			_hash1024 = _hash1024_1a;

			// Init library.
			setVersion('1a');
			setUTF8(false);
			seed();

			return {
				hash: hash,
				setKeyspace: setKeyspace,
				version: setVersion,
				useUTF8: setUTF8,
				seed: seed,
				fast1a32: _hash32_1a_fast,
				fast1a32hex:_hash32_1a_fast_hex,
				fast1a52: _hash52_1a_fast,
				fast1a52hex: _hash52_1a_fast_hex,
				fast1a64: _hash64_1a_fast,
				fast1a32utf: _hash32_1a_fast_utf,
				fast1a32hexutf:_hash32_1a_fast_hex_utf,
				fast1a52utf: _hash52_1a_fast_utf,
				fast1a52hexutf: _hash52_1a_fast_hex_utf,
				fast1a64utf: _hash64_1a_fast_utf
			};
		})();

		module.exports = fnvplus; 
	} (fnvPlus));
	return fnvPlus.exports;
}

var hasRequiredCip4Js;

function requireCip4Js () {
	if (hasRequiredCip4Js) return cip4Js;
	hasRequiredCip4Js = 1;
	var __importDefault = (cip4Js && cip4Js.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(cip4Js, "__esModule", { value: true });
	const blake2b_1 = __importDefault(requireBlake2b());
	const buffer_crc32_1 = __importDefault(requireBufferCrc32());
	const fnv_plus_1 = requireFnvPlus();
	const ALPHA = `ABCDEJHKLNOPSTXZ`;
	function textPartFromBytes([a, b, c, d]) {
	    const letters = (x) => `${ALPHA[Math.floor(x / 16)]}${ALPHA[x % 16]}`;
	    const numbers = `${((c << 8) + d) % 10000}`.padStart(4, '0');
	    return `${letters(a)}${letters(b)}-${numbers}`;
	}
	function legacyWalletChecksum(publicKeyHash /* note: lowercase hex representation */) {
	    // ImagePart
	    const output = new Uint8Array(64);
	    const input = Buffer$1.from(publicKeyHash);
	    const ImagePart = blake2b_1.default(output.length).update(input).digest('hex');
	    // TextPart
	    const [a, b, c, d] = buffer_crc32_1.default(ImagePart);
	    const TextPart = textPartFromBytes([a, b, c, d]);
	    return { ImagePart, TextPart };
	}
	cip4Js.legacyWalletChecksum = legacyWalletChecksum;
	function toBytesInt32(int32) {
	    const byteArray = [0, 0, 0, 0];
	    for (let index = 0; index < byteArray.length; index++) {
	        const byte = int32 & 0xff;
	        byteArray[index] = byte;
	        int32 = (int32 - byte) / 256;
	    }
	    return byteArray;
	}
	function textPartFromWalletChecksumImagePart(walletChecksum) {
	    return textPartFromBytes(toBytesInt32(fnv_plus_1.fast1a32(walletChecksum)));
	}
	cip4Js.textPartFromWalletChecksumImagePart = textPartFromWalletChecksumImagePart;
	function hash(len, inp, msg) {
	    return blake2b_1.default(len, undefined, undefined, Buffer$1.from(msg) // personal
	    ).update(Buffer$1.from(inp)).digest('hex');
	}
	function hash44(s) {
	    const shortHash = hash(33, s, 'shorten checksum');
	    const buff1 = Array.from(Buffer$1.from(shortHash, 'hex').toString('base64'));
	    const requiredReplacementPositions = buff1
	        .map((c, i) => c === '+' || c === '/' ? i : -1)
	        .filter(i => i >= 0);
	    const reverse = s.split('').reverse().join('');
	    for (let i = 0; i < 100; i++) {
	        const shortHash2 = hash(39, `${reverse}${i}`, 'shorten checksum');
	        const buff2 = Array.from(Buffer$1.from(shortHash2, 'hex').toString('base64'));
	        const availableReplacements = buff2.filter(c => c !== '+' && c !== '/');
	        if (availableReplacements.length >= requiredReplacementPositions.length) {
	            requiredReplacementPositions.forEach((position, i) => {
	                buff1[position] = availableReplacements[i];
	            });
	            return buff1.join('');
	        }
	    }
	    return buff1.map(c => c === '+' ? 'a' : (c === '/' ? 'b' : c)).join('');
	}
	cip4Js.hash44 = hash44;
	function walletChecksum(publicKeyHash /* note: lowercase hex representation */) {
	    // ImagePart
	    const ImagePart = hash(64, publicKeyHash, 'wallets checksum');
	    // TextPart
	    const TextPart = textPartFromWalletChecksumImagePart(ImagePart);
	    return { ImagePart, TextPart };
	}
	cip4Js.walletChecksum = walletChecksum;
	return cip4Js;
}

var cip4JsExports = requireCip4Js();

const createIRootKey = (pubBech32, prvBech32Encr) => {
  return {
    pub: pubBech32,
    prv: prvBech32Encr,
    v: "2"
  };
};

const generateWalletId = (source, network, signType, suffix = "") => {
  return source.slice(0, 16) + "-" + network.slice(0, 1) + signType.slice(0, 1) + suffix;
};
const generateAccountId = (source) => {
  return source.slice(0, 16);
};
const generateWalletIdFromScripts = (networkId, paymentScript, stakeScript) => {
  const paymentCred = getNativeScriptCredFromHex(paymentScript);
  const stakeCred = stakeScript ? getNativeScriptCredFromHex(stakeScript) : "";
  const xpub = getXpubFromHex(paymentCred + stakeCred);
  return generateWalletId(xpub, networkId, "multisig");
};
const generateWalletIdFromAddress = (network, address) => {
  return generateWalletId(address.slice(0, 12) + address.slice(-4), network, "readonly");
};

var src = {};

var sha256 = {};

var sha2 = {};

var _md = {};

var utils = {};

var crypto = {};

var hasRequiredCrypto;

function requireCrypto () {
	if (hasRequiredCrypto) return crypto;
	hasRequiredCrypto = 1;
	Object.defineProperty(crypto, "__esModule", { value: true });
	crypto.crypto = void 0;
	crypto.crypto = typeof globalThis === 'object' && 'crypto' in globalThis ? globalThis.crypto : undefined;
	
	return crypto;
}

var hasRequiredUtils;

function requireUtils () {
	if (hasRequiredUtils) return utils;
	hasRequiredUtils = 1;
	(function (exports) {
		/**
		 * Utilities for hex, bytes, CSPRNG.
		 * @module
		 */
		/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.wrapXOFConstructorWithOpts = exports.wrapConstructorWithOpts = exports.wrapConstructor = exports.Hash = exports.nextTick = exports.swap32IfBE = exports.byteSwapIfBE = exports.swap8IfBE = exports.isLE = void 0;
		exports.isBytes = isBytes;
		exports.anumber = anumber;
		exports.abytes = abytes;
		exports.ahash = ahash;
		exports.aexists = aexists;
		exports.aoutput = aoutput;
		exports.u8 = u8;
		exports.u32 = u32;
		exports.clean = clean;
		exports.createView = createView;
		exports.rotr = rotr;
		exports.rotl = rotl;
		exports.byteSwap = byteSwap;
		exports.byteSwap32 = byteSwap32;
		exports.bytesToHex = bytesToHex;
		exports.hexToBytes = hexToBytes;
		exports.asyncLoop = asyncLoop;
		exports.utf8ToBytes = utf8ToBytes;
		exports.bytesToUtf8 = bytesToUtf8;
		exports.toBytes = toBytes;
		exports.kdfInputToBytes = kdfInputToBytes;
		exports.concatBytes = concatBytes;
		exports.checkOpts = checkOpts;
		exports.createHasher = createHasher;
		exports.createOptHasher = createOptHasher;
		exports.createXOFer = createXOFer;
		exports.randomBytes = randomBytes;
		// We use WebCrypto aka globalThis.crypto, which exists in browsers and node.js 16+.
		// node.js versions earlier than v19 don't declare it in global scope.
		// For node.js, package.json#exports field mapping rewrites import
		// from `crypto` to `cryptoNode`, which imports native module.
		// Makes the utils un-importable in browsers without a bundler.
		// Once node.js 18 is deprecated (2025-04-30), we can just drop the import.
		const crypto_1 = /*@__PURE__*/ requireCrypto();
		/** Checks if something is Uint8Array. Be careful: nodejs Buffer will return true. */
		function isBytes(a) {
		    return a instanceof Uint8Array || (ArrayBuffer.isView(a) && a.constructor.name === 'Uint8Array');
		}
		/** Asserts something is positive integer. */
		function anumber(n) {
		    if (!Number.isSafeInteger(n) || n < 0)
		        throw new Error('positive integer expected, got ' + n);
		}
		/** Asserts something is Uint8Array. */
		function abytes(b, ...lengths) {
		    if (!isBytes(b))
		        throw new Error('Uint8Array expected');
		    if (lengths.length > 0 && !lengths.includes(b.length))
		        throw new Error('Uint8Array expected of length ' + lengths + ', got length=' + b.length);
		}
		/** Asserts something is hash */
		function ahash(h) {
		    if (typeof h !== 'function' || typeof h.create !== 'function')
		        throw new Error('Hash should be wrapped by utils.createHasher');
		    anumber(h.outputLen);
		    anumber(h.blockLen);
		}
		/** Asserts a hash instance has not been destroyed / finished */
		function aexists(instance, checkFinished = true) {
		    if (instance.destroyed)
		        throw new Error('Hash instance has been destroyed');
		    if (checkFinished && instance.finished)
		        throw new Error('Hash#digest() has already been called');
		}
		/** Asserts output is properly-sized byte array */
		function aoutput(out, instance) {
		    abytes(out);
		    const min = instance.outputLen;
		    if (out.length < min) {
		        throw new Error('digestInto() expects output buffer of length at least ' + min);
		    }
		}
		/** Cast u8 / u16 / u32 to u8. */
		function u8(arr) {
		    return new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
		}
		/** Cast u8 / u16 / u32 to u32. */
		function u32(arr) {
		    return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
		}
		/** Zeroize a byte array. Warning: JS provides no guarantees. */
		function clean(...arrays) {
		    for (let i = 0; i < arrays.length; i++) {
		        arrays[i].fill(0);
		    }
		}
		/** Create DataView of an array for easy byte-level manipulation. */
		function createView(arr) {
		    return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
		}
		/** The rotate right (circular right shift) operation for uint32 */
		function rotr(word, shift) {
		    return (word << (32 - shift)) | (word >>> shift);
		}
		/** The rotate left (circular left shift) operation for uint32 */
		function rotl(word, shift) {
		    return (word << shift) | ((word >>> (32 - shift)) >>> 0);
		}
		/** Is current platform little-endian? Most are. Big-Endian platform: IBM */
		exports.isLE = (() => new Uint8Array(new Uint32Array([0x11223344]).buffer)[0] === 0x44)();
		/** The byte swap operation for uint32 */
		function byteSwap(word) {
		    return (((word << 24) & 0xff000000) |
		        ((word << 8) & 0xff0000) |
		        ((word >>> 8) & 0xff00) |
		        ((word >>> 24) & 0xff));
		}
		/** Conditionally byte swap if on a big-endian platform */
		exports.swap8IfBE = exports.isLE
		    ? (n) => n
		    : (n) => byteSwap(n);
		/** @deprecated */
		exports.byteSwapIfBE = exports.swap8IfBE;
		/** In place byte swap for Uint32Array */
		function byteSwap32(arr) {
		    for (let i = 0; i < arr.length; i++) {
		        arr[i] = byteSwap(arr[i]);
		    }
		    return arr;
		}
		exports.swap32IfBE = exports.isLE
		    ? (u) => u
		    : byteSwap32;
		// Built-in hex conversion https://caniuse.com/mdn-javascript_builtins_uint8array_fromhex
		const hasHexBuiltin = /* @__PURE__ */ (() => 
		// @ts-ignore
		typeof Uint8Array.from([]).toHex === 'function' && typeof Uint8Array.fromHex === 'function')();
		// Array where index 0xf0 (240) is mapped to string 'f0'
		const hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, '0'));
		/**
		 * Convert byte array to hex string. Uses built-in function, when available.
		 * @example bytesToHex(Uint8Array.from([0xca, 0xfe, 0x01, 0x23])) // 'cafe0123'
		 */
		function bytesToHex(bytes) {
		    abytes(bytes);
		    // @ts-ignore
		    if (hasHexBuiltin)
		        return bytes.toHex();
		    // pre-caching improves the speed 6x
		    let hex = '';
		    for (let i = 0; i < bytes.length; i++) {
		        hex += hexes[bytes[i]];
		    }
		    return hex;
		}
		// We use optimized technique to convert hex string to byte array
		const asciis = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
		function asciiToBase16(ch) {
		    if (ch >= asciis._0 && ch <= asciis._9)
		        return ch - asciis._0; // '2' => 50-48
		    if (ch >= asciis.A && ch <= asciis.F)
		        return ch - (asciis.A - 10); // 'B' => 66-(65-10)
		    if (ch >= asciis.a && ch <= asciis.f)
		        return ch - (asciis.a - 10); // 'b' => 98-(97-10)
		    return;
		}
		/**
		 * Convert hex string to byte array. Uses built-in function, when available.
		 * @example hexToBytes('cafe0123') // Uint8Array.from([0xca, 0xfe, 0x01, 0x23])
		 */
		function hexToBytes(hex) {
		    if (typeof hex !== 'string')
		        throw new Error('hex string expected, got ' + typeof hex);
		    // @ts-ignore
		    if (hasHexBuiltin)
		        return Uint8Array.fromHex(hex);
		    const hl = hex.length;
		    const al = hl / 2;
		    if (hl % 2)
		        throw new Error('hex string expected, got unpadded hex of length ' + hl);
		    const array = new Uint8Array(al);
		    for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
		        const n1 = asciiToBase16(hex.charCodeAt(hi));
		        const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
		        if (n1 === undefined || n2 === undefined) {
		            const char = hex[hi] + hex[hi + 1];
		            throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
		        }
		        array[ai] = n1 * 16 + n2; // multiply first octet, e.g. 'a3' => 10*16+3 => 160 + 3 => 163
		    }
		    return array;
		}
		/**
		 * There is no setImmediate in browser and setTimeout is slow.
		 * Call of async fn will return Promise, which will be fullfiled only on
		 * next scheduler queue processing step and this is exactly what we need.
		 */
		const nextTick = async () => { };
		exports.nextTick = nextTick;
		/** Returns control to thread each 'tick' ms to avoid blocking. */
		async function asyncLoop(iters, tick, cb) {
		    let ts = Date.now();
		    for (let i = 0; i < iters; i++) {
		        cb(i);
		        // Date.now() is not monotonic, so in case if clock goes backwards we return return control too
		        const diff = Date.now() - ts;
		        if (diff >= 0 && diff < tick)
		            continue;
		        await (0, exports.nextTick)();
		        ts += diff;
		    }
		}
		/**
		 * Converts string to bytes using UTF8 encoding.
		 * @example utf8ToBytes('abc') // Uint8Array.from([97, 98, 99])
		 */
		function utf8ToBytes(str) {
		    if (typeof str !== 'string')
		        throw new Error('string expected');
		    return new Uint8Array(new TextEncoder().encode(str)); // https://bugzil.la/1681809
		}
		/**
		 * Converts bytes to string using UTF8 encoding.
		 * @example bytesToUtf8(Uint8Array.from([97, 98, 99])) // 'abc'
		 */
		function bytesToUtf8(bytes) {
		    return new TextDecoder().decode(bytes);
		}
		/**
		 * Normalizes (non-hex) string or Uint8Array to Uint8Array.
		 * Warning: when Uint8Array is passed, it would NOT get copied.
		 * Keep in mind for future mutable operations.
		 */
		function toBytes(data) {
		    if (typeof data === 'string')
		        data = utf8ToBytes(data);
		    abytes(data);
		    return data;
		}
		/**
		 * Helper for KDFs: consumes uint8array or string.
		 * When string is passed, does utf8 decoding, using TextDecoder.
		 */
		function kdfInputToBytes(data) {
		    if (typeof data === 'string')
		        data = utf8ToBytes(data);
		    abytes(data);
		    return data;
		}
		/** Copies several Uint8Arrays into one. */
		function concatBytes(...arrays) {
		    let sum = 0;
		    for (let i = 0; i < arrays.length; i++) {
		        const a = arrays[i];
		        abytes(a);
		        sum += a.length;
		    }
		    const res = new Uint8Array(sum);
		    for (let i = 0, pad = 0; i < arrays.length; i++) {
		        const a = arrays[i];
		        res.set(a, pad);
		        pad += a.length;
		    }
		    return res;
		}
		function checkOpts(defaults, opts) {
		    if (opts !== undefined && {}.toString.call(opts) !== '[object Object]')
		        throw new Error('options should be object or undefined');
		    const merged = Object.assign(defaults, opts);
		    return merged;
		}
		/** For runtime check if class implements interface */
		class Hash {
		}
		exports.Hash = Hash;
		/** Wraps hash function, creating an interface on top of it */
		function createHasher(hashCons) {
		    const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
		    const tmp = hashCons();
		    hashC.outputLen = tmp.outputLen;
		    hashC.blockLen = tmp.blockLen;
		    hashC.create = () => hashCons();
		    return hashC;
		}
		function createOptHasher(hashCons) {
		    const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
		    const tmp = hashCons({});
		    hashC.outputLen = tmp.outputLen;
		    hashC.blockLen = tmp.blockLen;
		    hashC.create = (opts) => hashCons(opts);
		    return hashC;
		}
		function createXOFer(hashCons) {
		    const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
		    const tmp = hashCons({});
		    hashC.outputLen = tmp.outputLen;
		    hashC.blockLen = tmp.blockLen;
		    hashC.create = (opts) => hashCons(opts);
		    return hashC;
		}
		exports.wrapConstructor = createHasher;
		exports.wrapConstructorWithOpts = createOptHasher;
		exports.wrapXOFConstructorWithOpts = createXOFer;
		/** Cryptographically secure PRNG. Uses internal OS-level `crypto.getRandomValues`. */
		function randomBytes(bytesLength = 32) {
		    if (crypto_1.crypto && typeof crypto_1.crypto.getRandomValues === 'function') {
		        return crypto_1.crypto.getRandomValues(new Uint8Array(bytesLength));
		    }
		    // Legacy Node.js compatibility
		    if (crypto_1.crypto && typeof crypto_1.crypto.randomBytes === 'function') {
		        return Uint8Array.from(crypto_1.crypto.randomBytes(bytesLength));
		    }
		    throw new Error('crypto.getRandomValues must be defined');
		}
		
	} (utils));
	return utils;
}

var hasRequired_md;

function require_md () {
	if (hasRequired_md) return _md;
	hasRequired_md = 1;
	Object.defineProperty(_md, "__esModule", { value: true });
	_md.SHA512_IV = _md.SHA384_IV = _md.SHA224_IV = _md.SHA256_IV = _md.HashMD = void 0;
	_md.setBigUint64 = setBigUint64;
	_md.Chi = Chi;
	_md.Maj = Maj;
	/**
	 * Internal Merkle-Damgard hash utils.
	 * @module
	 */
	const utils_ts_1 = /*@__PURE__*/ requireUtils();
	/** Polyfill for Safari 14. https://caniuse.com/mdn-javascript_builtins_dataview_setbiguint64 */
	function setBigUint64(view, byteOffset, value, isLE) {
	    if (typeof view.setBigUint64 === 'function')
	        return view.setBigUint64(byteOffset, value, isLE);
	    const _32n = BigInt(32);
	    const _u32_max = BigInt(0xffffffff);
	    const wh = Number((value >> _32n) & _u32_max);
	    const wl = Number(value & _u32_max);
	    const h = isLE ? 4 : 0;
	    const l = isLE ? 0 : 4;
	    view.setUint32(byteOffset + h, wh, isLE);
	    view.setUint32(byteOffset + l, wl, isLE);
	}
	/** Choice: a ? b : c */
	function Chi(a, b, c) {
	    return (a & b) ^ (~a & c);
	}
	/** Majority function, true if any two inputs is true. */
	function Maj(a, b, c) {
	    return (a & b) ^ (a & c) ^ (b & c);
	}
	/**
	 * Merkle-Damgard hash construction base class.
	 * Could be used to create MD5, RIPEMD, SHA1, SHA2.
	 */
	class HashMD extends utils_ts_1.Hash {
	    constructor(blockLen, outputLen, padOffset, isLE) {
	        super();
	        this.finished = false;
	        this.length = 0;
	        this.pos = 0;
	        this.destroyed = false;
	        this.blockLen = blockLen;
	        this.outputLen = outputLen;
	        this.padOffset = padOffset;
	        this.isLE = isLE;
	        this.buffer = new Uint8Array(blockLen);
	        this.view = (0, utils_ts_1.createView)(this.buffer);
	    }
	    update(data) {
	        (0, utils_ts_1.aexists)(this);
	        data = (0, utils_ts_1.toBytes)(data);
	        (0, utils_ts_1.abytes)(data);
	        const { view, buffer, blockLen } = this;
	        const len = data.length;
	        for (let pos = 0; pos < len;) {
	            const take = Math.min(blockLen - this.pos, len - pos);
	            // Fast path: we have at least one block in input, cast it to view and process
	            if (take === blockLen) {
	                const dataView = (0, utils_ts_1.createView)(data);
	                for (; blockLen <= len - pos; pos += blockLen)
	                    this.process(dataView, pos);
	                continue;
	            }
	            buffer.set(data.subarray(pos, pos + take), this.pos);
	            this.pos += take;
	            pos += take;
	            if (this.pos === blockLen) {
	                this.process(view, 0);
	                this.pos = 0;
	            }
	        }
	        this.length += data.length;
	        this.roundClean();
	        return this;
	    }
	    digestInto(out) {
	        (0, utils_ts_1.aexists)(this);
	        (0, utils_ts_1.aoutput)(out, this);
	        this.finished = true;
	        // Padding
	        // We can avoid allocation of buffer for padding completely if it
	        // was previously not allocated here. But it won't change performance.
	        const { buffer, view, blockLen, isLE } = this;
	        let { pos } = this;
	        // append the bit '1' to the message
	        buffer[pos++] = 0b10000000;
	        (0, utils_ts_1.clean)(this.buffer.subarray(pos));
	        // we have less than padOffset left in buffer, so we cannot put length in
	        // current block, need process it and pad again
	        if (this.padOffset > blockLen - pos) {
	            this.process(view, 0);
	            pos = 0;
	        }
	        // Pad until full block byte with zeros
	        for (let i = pos; i < blockLen; i++)
	            buffer[i] = 0;
	        // Note: sha512 requires length to be 128bit integer, but length in JS will overflow before that
	        // You need to write around 2 exabytes (u64_max / 8 / (1024**6)) for this to happen.
	        // So we just write lowest 64 bits of that value.
	        setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE);
	        this.process(view, 0);
	        const oview = (0, utils_ts_1.createView)(out);
	        const len = this.outputLen;
	        // NOTE: we do division by 4 later, which should be fused in single op with modulo by JIT
	        if (len % 4)
	            throw new Error('_sha2: outputLen should be aligned to 32bit');
	        const outLen = len / 4;
	        const state = this.get();
	        if (outLen > state.length)
	            throw new Error('_sha2: outputLen bigger than state');
	        for (let i = 0; i < outLen; i++)
	            oview.setUint32(4 * i, state[i], isLE);
	    }
	    digest() {
	        const { buffer, outputLen } = this;
	        this.digestInto(buffer);
	        const res = buffer.slice(0, outputLen);
	        this.destroy();
	        return res;
	    }
	    _cloneInto(to) {
	        to || (to = new this.constructor());
	        to.set(...this.get());
	        const { blockLen, buffer, length, finished, destroyed, pos } = this;
	        to.destroyed = destroyed;
	        to.finished = finished;
	        to.length = length;
	        to.pos = pos;
	        if (length % blockLen)
	            to.buffer.set(buffer);
	        return to;
	    }
	    clone() {
	        return this._cloneInto();
	    }
	}
	_md.HashMD = HashMD;
	/**
	 * Initial SHA-2 state: fractional parts of square roots of first 16 primes 2..53.
	 * Check out `test/misc/sha2-gen-iv.js` for recomputation guide.
	 */
	/** Initial SHA256 state. Bits 0..32 of frac part of sqrt of primes 2..19 */
	_md.SHA256_IV = Uint32Array.from([
	    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
	]);
	/** Initial SHA224 state. Bits 32..64 of frac part of sqrt of primes 23..53 */
	_md.SHA224_IV = Uint32Array.from([
	    0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939, 0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4,
	]);
	/** Initial SHA384 state. Bits 0..64 of frac part of sqrt of primes 23..53 */
	_md.SHA384_IV = Uint32Array.from([
	    0xcbbb9d5d, 0xc1059ed8, 0x629a292a, 0x367cd507, 0x9159015a, 0x3070dd17, 0x152fecd8, 0xf70e5939,
	    0x67332667, 0xffc00b31, 0x8eb44a87, 0x68581511, 0xdb0c2e0d, 0x64f98fa7, 0x47b5481d, 0xbefa4fa4,
	]);
	/** Initial SHA512 state. Bits 0..64 of frac part of sqrt of primes 2..19 */
	_md.SHA512_IV = Uint32Array.from([
	    0x6a09e667, 0xf3bcc908, 0xbb67ae85, 0x84caa73b, 0x3c6ef372, 0xfe94f82b, 0xa54ff53a, 0x5f1d36f1,
	    0x510e527f, 0xade682d1, 0x9b05688c, 0x2b3e6c1f, 0x1f83d9ab, 0xfb41bd6b, 0x5be0cd19, 0x137e2179,
	]);
	
	return _md;
}

var _u64 = {};

var hasRequired_u64;

function require_u64 () {
	if (hasRequired_u64) return _u64;
	hasRequired_u64 = 1;
	Object.defineProperty(_u64, "__esModule", { value: true });
	_u64.toBig = _u64.shrSL = _u64.shrSH = _u64.rotrSL = _u64.rotrSH = _u64.rotrBL = _u64.rotrBH = _u64.rotr32L = _u64.rotr32H = _u64.rotlSL = _u64.rotlSH = _u64.rotlBL = _u64.rotlBH = _u64.add5L = _u64.add5H = _u64.add4L = _u64.add4H = _u64.add3L = _u64.add3H = void 0;
	_u64.add = add;
	_u64.fromBig = fromBig;
	_u64.split = split;
	/**
	 * Internal helpers for u64. BigUint64Array is too slow as per 2025, so we implement it using Uint32Array.
	 * @todo re-check https://issues.chromium.org/issues/42212588
	 * @module
	 */
	const U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
	const _32n = /* @__PURE__ */ BigInt(32);
	function fromBig(n, le = false) {
	    if (le)
	        return { h: Number(n & U32_MASK64), l: Number((n >> _32n) & U32_MASK64) };
	    return { h: Number((n >> _32n) & U32_MASK64) | 0, l: Number(n & U32_MASK64) | 0 };
	}
	function split(lst, le = false) {
	    const len = lst.length;
	    let Ah = new Uint32Array(len);
	    let Al = new Uint32Array(len);
	    for (let i = 0; i < len; i++) {
	        const { h, l } = fromBig(lst[i], le);
	        [Ah[i], Al[i]] = [h, l];
	    }
	    return [Ah, Al];
	}
	const toBig = (h, l) => (BigInt(h >>> 0) << _32n) | BigInt(l >>> 0);
	_u64.toBig = toBig;
	// for Shift in [0, 32)
	const shrSH = (h, _l, s) => h >>> s;
	_u64.shrSH = shrSH;
	const shrSL = (h, l, s) => (h << (32 - s)) | (l >>> s);
	_u64.shrSL = shrSL;
	// Right rotate for Shift in [1, 32)
	const rotrSH = (h, l, s) => (h >>> s) | (l << (32 - s));
	_u64.rotrSH = rotrSH;
	const rotrSL = (h, l, s) => (h << (32 - s)) | (l >>> s);
	_u64.rotrSL = rotrSL;
	// Right rotate for Shift in (32, 64), NOTE: 32 is special case.
	const rotrBH = (h, l, s) => (h << (64 - s)) | (l >>> (s - 32));
	_u64.rotrBH = rotrBH;
	const rotrBL = (h, l, s) => (h >>> (s - 32)) | (l << (64 - s));
	_u64.rotrBL = rotrBL;
	// Right rotate for shift===32 (just swaps l&h)
	const rotr32H = (_h, l) => l;
	_u64.rotr32H = rotr32H;
	const rotr32L = (h, _l) => h;
	_u64.rotr32L = rotr32L;
	// Left rotate for Shift in [1, 32)
	const rotlSH = (h, l, s) => (h << s) | (l >>> (32 - s));
	_u64.rotlSH = rotlSH;
	const rotlSL = (h, l, s) => (l << s) | (h >>> (32 - s));
	_u64.rotlSL = rotlSL;
	// Left rotate for Shift in (32, 64), NOTE: 32 is special case.
	const rotlBH = (h, l, s) => (l << (s - 32)) | (h >>> (64 - s));
	_u64.rotlBH = rotlBH;
	const rotlBL = (h, l, s) => (h << (s - 32)) | (l >>> (64 - s));
	_u64.rotlBL = rotlBL;
	// JS uses 32-bit signed integers for bitwise operations which means we cannot
	// simple take carry out of low bit sum by shift, we need to use division.
	function add(Ah, Al, Bh, Bl) {
	    const l = (Al >>> 0) + (Bl >>> 0);
	    return { h: (Ah + Bh + ((l / 2 ** 32) | 0)) | 0, l: l | 0 };
	}
	// Addition with more than 2 elements
	const add3L = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
	_u64.add3L = add3L;
	const add3H = (low, Ah, Bh, Ch) => (Ah + Bh + Ch + ((low / 2 ** 32) | 0)) | 0;
	_u64.add3H = add3H;
	const add4L = (Al, Bl, Cl, Dl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
	_u64.add4L = add4L;
	const add4H = (low, Ah, Bh, Ch, Dh) => (Ah + Bh + Ch + Dh + ((low / 2 ** 32) | 0)) | 0;
	_u64.add4H = add4H;
	const add5L = (Al, Bl, Cl, Dl, El) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
	_u64.add5L = add5L;
	const add5H = (low, Ah, Bh, Ch, Dh, Eh) => (Ah + Bh + Ch + Dh + Eh + ((low / 2 ** 32) | 0)) | 0;
	_u64.add5H = add5H;
	// prettier-ignore
	const u64 = {
	    fromBig, split, toBig,
	    shrSH, shrSL,
	    rotrSH, rotrSL, rotrBH, rotrBL,
	    rotr32H, rotr32L,
	    rotlSH, rotlSL, rotlBH, rotlBL,
	    add, add3L, add3H, add4L, add4H, add5H, add5L,
	};
	_u64.default = u64;
	
	return _u64;
}

var hasRequiredSha2;

function requireSha2 () {
	if (hasRequiredSha2) return sha2;
	hasRequiredSha2 = 1;
	Object.defineProperty(sha2, "__esModule", { value: true });
	sha2.sha512_224 = sha2.sha512_256 = sha2.sha384 = sha2.sha512 = sha2.sha224 = sha2.sha256 = sha2.SHA512_256 = sha2.SHA512_224 = sha2.SHA384 = sha2.SHA512 = sha2.SHA224 = sha2.SHA256 = void 0;
	/**
	 * SHA2 hash function. A.k.a. sha256, sha384, sha512, sha512_224, sha512_256.
	 * SHA256 is the fastest hash implementable in JS, even faster than Blake3.
	 * Check out [RFC 4634](https://datatracker.ietf.org/doc/html/rfc4634) and
	 * [FIPS 180-4](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf).
	 * @module
	 */
	const _md_ts_1 = /*@__PURE__*/ require_md();
	const u64 = /*@__PURE__*/ require_u64();
	const utils_ts_1 = /*@__PURE__*/ requireUtils();
	/**
	 * Round constants:
	 * First 32 bits of fractional parts of the cube roots of the first 64 primes 2..311)
	 */
	// prettier-ignore
	const SHA256_K = /* @__PURE__ */ Uint32Array.from([
	    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
	    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
	    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
	    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
	    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
	    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
	    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
	    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
	]);
	/** Reusable temporary buffer. "W" comes straight from spec. */
	const SHA256_W = /* @__PURE__ */ new Uint32Array(64);
	class SHA256 extends _md_ts_1.HashMD {
	    constructor(outputLen = 32) {
	        super(64, outputLen, 8, false);
	        // We cannot use array here since array allows indexing by variable
	        // which means optimizer/compiler cannot use registers.
	        this.A = _md_ts_1.SHA256_IV[0] | 0;
	        this.B = _md_ts_1.SHA256_IV[1] | 0;
	        this.C = _md_ts_1.SHA256_IV[2] | 0;
	        this.D = _md_ts_1.SHA256_IV[3] | 0;
	        this.E = _md_ts_1.SHA256_IV[4] | 0;
	        this.F = _md_ts_1.SHA256_IV[5] | 0;
	        this.G = _md_ts_1.SHA256_IV[6] | 0;
	        this.H = _md_ts_1.SHA256_IV[7] | 0;
	    }
	    get() {
	        const { A, B, C, D, E, F, G, H } = this;
	        return [A, B, C, D, E, F, G, H];
	    }
	    // prettier-ignore
	    set(A, B, C, D, E, F, G, H) {
	        this.A = A | 0;
	        this.B = B | 0;
	        this.C = C | 0;
	        this.D = D | 0;
	        this.E = E | 0;
	        this.F = F | 0;
	        this.G = G | 0;
	        this.H = H | 0;
	    }
	    process(view, offset) {
	        // Extend the first 16 words into the remaining 48 words w[16..63] of the message schedule array
	        for (let i = 0; i < 16; i++, offset += 4)
	            SHA256_W[i] = view.getUint32(offset, false);
	        for (let i = 16; i < 64; i++) {
	            const W15 = SHA256_W[i - 15];
	            const W2 = SHA256_W[i - 2];
	            const s0 = (0, utils_ts_1.rotr)(W15, 7) ^ (0, utils_ts_1.rotr)(W15, 18) ^ (W15 >>> 3);
	            const s1 = (0, utils_ts_1.rotr)(W2, 17) ^ (0, utils_ts_1.rotr)(W2, 19) ^ (W2 >>> 10);
	            SHA256_W[i] = (s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16]) | 0;
	        }
	        // Compression function main loop, 64 rounds
	        let { A, B, C, D, E, F, G, H } = this;
	        for (let i = 0; i < 64; i++) {
	            const sigma1 = (0, utils_ts_1.rotr)(E, 6) ^ (0, utils_ts_1.rotr)(E, 11) ^ (0, utils_ts_1.rotr)(E, 25);
	            const T1 = (H + sigma1 + (0, _md_ts_1.Chi)(E, F, G) + SHA256_K[i] + SHA256_W[i]) | 0;
	            const sigma0 = (0, utils_ts_1.rotr)(A, 2) ^ (0, utils_ts_1.rotr)(A, 13) ^ (0, utils_ts_1.rotr)(A, 22);
	            const T2 = (sigma0 + (0, _md_ts_1.Maj)(A, B, C)) | 0;
	            H = G;
	            G = F;
	            F = E;
	            E = (D + T1) | 0;
	            D = C;
	            C = B;
	            B = A;
	            A = (T1 + T2) | 0;
	        }
	        // Add the compressed chunk to the current hash value
	        A = (A + this.A) | 0;
	        B = (B + this.B) | 0;
	        C = (C + this.C) | 0;
	        D = (D + this.D) | 0;
	        E = (E + this.E) | 0;
	        F = (F + this.F) | 0;
	        G = (G + this.G) | 0;
	        H = (H + this.H) | 0;
	        this.set(A, B, C, D, E, F, G, H);
	    }
	    roundClean() {
	        (0, utils_ts_1.clean)(SHA256_W);
	    }
	    destroy() {
	        this.set(0, 0, 0, 0, 0, 0, 0, 0);
	        (0, utils_ts_1.clean)(this.buffer);
	    }
	}
	sha2.SHA256 = SHA256;
	class SHA224 extends SHA256 {
	    constructor() {
	        super(28);
	        this.A = _md_ts_1.SHA224_IV[0] | 0;
	        this.B = _md_ts_1.SHA224_IV[1] | 0;
	        this.C = _md_ts_1.SHA224_IV[2] | 0;
	        this.D = _md_ts_1.SHA224_IV[3] | 0;
	        this.E = _md_ts_1.SHA224_IV[4] | 0;
	        this.F = _md_ts_1.SHA224_IV[5] | 0;
	        this.G = _md_ts_1.SHA224_IV[6] | 0;
	        this.H = _md_ts_1.SHA224_IV[7] | 0;
	    }
	}
	sha2.SHA224 = SHA224;
	// SHA2-512 is slower than sha256 in js because u64 operations are slow.
	// Round contants
	// First 32 bits of the fractional parts of the cube roots of the first 80 primes 2..409
	// prettier-ignore
	const K512 = /* @__PURE__ */ (() => u64.split([
	    '0x428a2f98d728ae22', '0x7137449123ef65cd', '0xb5c0fbcfec4d3b2f', '0xe9b5dba58189dbbc',
	    '0x3956c25bf348b538', '0x59f111f1b605d019', '0x923f82a4af194f9b', '0xab1c5ed5da6d8118',
	    '0xd807aa98a3030242', '0x12835b0145706fbe', '0x243185be4ee4b28c', '0x550c7dc3d5ffb4e2',
	    '0x72be5d74f27b896f', '0x80deb1fe3b1696b1', '0x9bdc06a725c71235', '0xc19bf174cf692694',
	    '0xe49b69c19ef14ad2', '0xefbe4786384f25e3', '0x0fc19dc68b8cd5b5', '0x240ca1cc77ac9c65',
	    '0x2de92c6f592b0275', '0x4a7484aa6ea6e483', '0x5cb0a9dcbd41fbd4', '0x76f988da831153b5',
	    '0x983e5152ee66dfab', '0xa831c66d2db43210', '0xb00327c898fb213f', '0xbf597fc7beef0ee4',
	    '0xc6e00bf33da88fc2', '0xd5a79147930aa725', '0x06ca6351e003826f', '0x142929670a0e6e70',
	    '0x27b70a8546d22ffc', '0x2e1b21385c26c926', '0x4d2c6dfc5ac42aed', '0x53380d139d95b3df',
	    '0x650a73548baf63de', '0x766a0abb3c77b2a8', '0x81c2c92e47edaee6', '0x92722c851482353b',
	    '0xa2bfe8a14cf10364', '0xa81a664bbc423001', '0xc24b8b70d0f89791', '0xc76c51a30654be30',
	    '0xd192e819d6ef5218', '0xd69906245565a910', '0xf40e35855771202a', '0x106aa07032bbd1b8',
	    '0x19a4c116b8d2d0c8', '0x1e376c085141ab53', '0x2748774cdf8eeb99', '0x34b0bcb5e19b48a8',
	    '0x391c0cb3c5c95a63', '0x4ed8aa4ae3418acb', '0x5b9cca4f7763e373', '0x682e6ff3d6b2b8a3',
	    '0x748f82ee5defb2fc', '0x78a5636f43172f60', '0x84c87814a1f0ab72', '0x8cc702081a6439ec',
	    '0x90befffa23631e28', '0xa4506cebde82bde9', '0xbef9a3f7b2c67915', '0xc67178f2e372532b',
	    '0xca273eceea26619c', '0xd186b8c721c0c207', '0xeada7dd6cde0eb1e', '0xf57d4f7fee6ed178',
	    '0x06f067aa72176fba', '0x0a637dc5a2c898a6', '0x113f9804bef90dae', '0x1b710b35131c471b',
	    '0x28db77f523047d84', '0x32caab7b40c72493', '0x3c9ebe0a15c9bebc', '0x431d67c49c100d4c',
	    '0x4cc5d4becb3e42b6', '0x597f299cfc657e2a', '0x5fcb6fab3ad6faec', '0x6c44198c4a475817'
	].map(n => BigInt(n))))();
	const SHA512_Kh = /* @__PURE__ */ (() => K512[0])();
	const SHA512_Kl = /* @__PURE__ */ (() => K512[1])();
	// Reusable temporary buffers
	const SHA512_W_H = /* @__PURE__ */ new Uint32Array(80);
	const SHA512_W_L = /* @__PURE__ */ new Uint32Array(80);
	class SHA512 extends _md_ts_1.HashMD {
	    constructor(outputLen = 64) {
	        super(128, outputLen, 16, false);
	        // We cannot use array here since array allows indexing by variable
	        // which means optimizer/compiler cannot use registers.
	        // h -- high 32 bits, l -- low 32 bits
	        this.Ah = _md_ts_1.SHA512_IV[0] | 0;
	        this.Al = _md_ts_1.SHA512_IV[1] | 0;
	        this.Bh = _md_ts_1.SHA512_IV[2] | 0;
	        this.Bl = _md_ts_1.SHA512_IV[3] | 0;
	        this.Ch = _md_ts_1.SHA512_IV[4] | 0;
	        this.Cl = _md_ts_1.SHA512_IV[5] | 0;
	        this.Dh = _md_ts_1.SHA512_IV[6] | 0;
	        this.Dl = _md_ts_1.SHA512_IV[7] | 0;
	        this.Eh = _md_ts_1.SHA512_IV[8] | 0;
	        this.El = _md_ts_1.SHA512_IV[9] | 0;
	        this.Fh = _md_ts_1.SHA512_IV[10] | 0;
	        this.Fl = _md_ts_1.SHA512_IV[11] | 0;
	        this.Gh = _md_ts_1.SHA512_IV[12] | 0;
	        this.Gl = _md_ts_1.SHA512_IV[13] | 0;
	        this.Hh = _md_ts_1.SHA512_IV[14] | 0;
	        this.Hl = _md_ts_1.SHA512_IV[15] | 0;
	    }
	    // prettier-ignore
	    get() {
	        const { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
	        return [Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl];
	    }
	    // prettier-ignore
	    set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl) {
	        this.Ah = Ah | 0;
	        this.Al = Al | 0;
	        this.Bh = Bh | 0;
	        this.Bl = Bl | 0;
	        this.Ch = Ch | 0;
	        this.Cl = Cl | 0;
	        this.Dh = Dh | 0;
	        this.Dl = Dl | 0;
	        this.Eh = Eh | 0;
	        this.El = El | 0;
	        this.Fh = Fh | 0;
	        this.Fl = Fl | 0;
	        this.Gh = Gh | 0;
	        this.Gl = Gl | 0;
	        this.Hh = Hh | 0;
	        this.Hl = Hl | 0;
	    }
	    process(view, offset) {
	        // Extend the first 16 words into the remaining 64 words w[16..79] of the message schedule array
	        for (let i = 0; i < 16; i++, offset += 4) {
	            SHA512_W_H[i] = view.getUint32(offset);
	            SHA512_W_L[i] = view.getUint32((offset += 4));
	        }
	        for (let i = 16; i < 80; i++) {
	            // s0 := (w[i-15] rightrotate 1) xor (w[i-15] rightrotate 8) xor (w[i-15] rightshift 7)
	            const W15h = SHA512_W_H[i - 15] | 0;
	            const W15l = SHA512_W_L[i - 15] | 0;
	            const s0h = u64.rotrSH(W15h, W15l, 1) ^ u64.rotrSH(W15h, W15l, 8) ^ u64.shrSH(W15h, W15l, 7);
	            const s0l = u64.rotrSL(W15h, W15l, 1) ^ u64.rotrSL(W15h, W15l, 8) ^ u64.shrSL(W15h, W15l, 7);
	            // s1 := (w[i-2] rightrotate 19) xor (w[i-2] rightrotate 61) xor (w[i-2] rightshift 6)
	            const W2h = SHA512_W_H[i - 2] | 0;
	            const W2l = SHA512_W_L[i - 2] | 0;
	            const s1h = u64.rotrSH(W2h, W2l, 19) ^ u64.rotrBH(W2h, W2l, 61) ^ u64.shrSH(W2h, W2l, 6);
	            const s1l = u64.rotrSL(W2h, W2l, 19) ^ u64.rotrBL(W2h, W2l, 61) ^ u64.shrSL(W2h, W2l, 6);
	            // SHA256_W[i] = s0 + s1 + SHA256_W[i - 7] + SHA256_W[i - 16];
	            const SUMl = u64.add4L(s0l, s1l, SHA512_W_L[i - 7], SHA512_W_L[i - 16]);
	            const SUMh = u64.add4H(SUMl, s0h, s1h, SHA512_W_H[i - 7], SHA512_W_H[i - 16]);
	            SHA512_W_H[i] = SUMh | 0;
	            SHA512_W_L[i] = SUMl | 0;
	        }
	        let { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
	        // Compression function main loop, 80 rounds
	        for (let i = 0; i < 80; i++) {
	            // S1 := (e rightrotate 14) xor (e rightrotate 18) xor (e rightrotate 41)
	            const sigma1h = u64.rotrSH(Eh, El, 14) ^ u64.rotrSH(Eh, El, 18) ^ u64.rotrBH(Eh, El, 41);
	            const sigma1l = u64.rotrSL(Eh, El, 14) ^ u64.rotrSL(Eh, El, 18) ^ u64.rotrBL(Eh, El, 41);
	            //const T1 = (H + sigma1 + Chi(E, F, G) + SHA256_K[i] + SHA256_W[i]) | 0;
	            const CHIh = (Eh & Fh) ^ (~Eh & Gh);
	            const CHIl = (El & Fl) ^ (~El & Gl);
	            // T1 = H + sigma1 + Chi(E, F, G) + SHA512_K[i] + SHA512_W[i]
	            // prettier-ignore
	            const T1ll = u64.add5L(Hl, sigma1l, CHIl, SHA512_Kl[i], SHA512_W_L[i]);
	            const T1h = u64.add5H(T1ll, Hh, sigma1h, CHIh, SHA512_Kh[i], SHA512_W_H[i]);
	            const T1l = T1ll | 0;
	            // S0 := (a rightrotate 28) xor (a rightrotate 34) xor (a rightrotate 39)
	            const sigma0h = u64.rotrSH(Ah, Al, 28) ^ u64.rotrBH(Ah, Al, 34) ^ u64.rotrBH(Ah, Al, 39);
	            const sigma0l = u64.rotrSL(Ah, Al, 28) ^ u64.rotrBL(Ah, Al, 34) ^ u64.rotrBL(Ah, Al, 39);
	            const MAJh = (Ah & Bh) ^ (Ah & Ch) ^ (Bh & Ch);
	            const MAJl = (Al & Bl) ^ (Al & Cl) ^ (Bl & Cl);
	            Hh = Gh | 0;
	            Hl = Gl | 0;
	            Gh = Fh | 0;
	            Gl = Fl | 0;
	            Fh = Eh | 0;
	            Fl = El | 0;
	            ({ h: Eh, l: El } = u64.add(Dh | 0, Dl | 0, T1h | 0, T1l | 0));
	            Dh = Ch | 0;
	            Dl = Cl | 0;
	            Ch = Bh | 0;
	            Cl = Bl | 0;
	            Bh = Ah | 0;
	            Bl = Al | 0;
	            const All = u64.add3L(T1l, sigma0l, MAJl);
	            Ah = u64.add3H(All, T1h, sigma0h, MAJh);
	            Al = All | 0;
	        }
	        // Add the compressed chunk to the current hash value
	        ({ h: Ah, l: Al } = u64.add(this.Ah | 0, this.Al | 0, Ah | 0, Al | 0));
	        ({ h: Bh, l: Bl } = u64.add(this.Bh | 0, this.Bl | 0, Bh | 0, Bl | 0));
	        ({ h: Ch, l: Cl } = u64.add(this.Ch | 0, this.Cl | 0, Ch | 0, Cl | 0));
	        ({ h: Dh, l: Dl } = u64.add(this.Dh | 0, this.Dl | 0, Dh | 0, Dl | 0));
	        ({ h: Eh, l: El } = u64.add(this.Eh | 0, this.El | 0, Eh | 0, El | 0));
	        ({ h: Fh, l: Fl } = u64.add(this.Fh | 0, this.Fl | 0, Fh | 0, Fl | 0));
	        ({ h: Gh, l: Gl } = u64.add(this.Gh | 0, this.Gl | 0, Gh | 0, Gl | 0));
	        ({ h: Hh, l: Hl } = u64.add(this.Hh | 0, this.Hl | 0, Hh | 0, Hl | 0));
	        this.set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl);
	    }
	    roundClean() {
	        (0, utils_ts_1.clean)(SHA512_W_H, SHA512_W_L);
	    }
	    destroy() {
	        (0, utils_ts_1.clean)(this.buffer);
	        this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
	    }
	}
	sha2.SHA512 = SHA512;
	class SHA384 extends SHA512 {
	    constructor() {
	        super(48);
	        this.Ah = _md_ts_1.SHA384_IV[0] | 0;
	        this.Al = _md_ts_1.SHA384_IV[1] | 0;
	        this.Bh = _md_ts_1.SHA384_IV[2] | 0;
	        this.Bl = _md_ts_1.SHA384_IV[3] | 0;
	        this.Ch = _md_ts_1.SHA384_IV[4] | 0;
	        this.Cl = _md_ts_1.SHA384_IV[5] | 0;
	        this.Dh = _md_ts_1.SHA384_IV[6] | 0;
	        this.Dl = _md_ts_1.SHA384_IV[7] | 0;
	        this.Eh = _md_ts_1.SHA384_IV[8] | 0;
	        this.El = _md_ts_1.SHA384_IV[9] | 0;
	        this.Fh = _md_ts_1.SHA384_IV[10] | 0;
	        this.Fl = _md_ts_1.SHA384_IV[11] | 0;
	        this.Gh = _md_ts_1.SHA384_IV[12] | 0;
	        this.Gl = _md_ts_1.SHA384_IV[13] | 0;
	        this.Hh = _md_ts_1.SHA384_IV[14] | 0;
	        this.Hl = _md_ts_1.SHA384_IV[15] | 0;
	    }
	}
	sha2.SHA384 = SHA384;
	/**
	 * Truncated SHA512/256 and SHA512/224.
	 * SHA512_IV is XORed with 0xa5a5a5a5a5a5a5a5, then used as "intermediary" IV of SHA512/t.
	 * Then t hashes string to produce result IV.
	 * See `test/misc/sha2-gen-iv.js`.
	 */
	/** SHA512/224 IV */
	const T224_IV = /* @__PURE__ */ Uint32Array.from([
	    0x8c3d37c8, 0x19544da2, 0x73e19966, 0x89dcd4d6, 0x1dfab7ae, 0x32ff9c82, 0x679dd514, 0x582f9fcf,
	    0x0f6d2b69, 0x7bd44da8, 0x77e36f73, 0x04c48942, 0x3f9d85a8, 0x6a1d36c8, 0x1112e6ad, 0x91d692a1,
	]);
	/** SHA512/256 IV */
	const T256_IV = /* @__PURE__ */ Uint32Array.from([
	    0x22312194, 0xfc2bf72c, 0x9f555fa3, 0xc84c64c2, 0x2393b86b, 0x6f53b151, 0x96387719, 0x5940eabd,
	    0x96283ee2, 0xa88effe3, 0xbe5e1e25, 0x53863992, 0x2b0199fc, 0x2c85b8aa, 0x0eb72ddc, 0x81c52ca2,
	]);
	class SHA512_224 extends SHA512 {
	    constructor() {
	        super(28);
	        this.Ah = T224_IV[0] | 0;
	        this.Al = T224_IV[1] | 0;
	        this.Bh = T224_IV[2] | 0;
	        this.Bl = T224_IV[3] | 0;
	        this.Ch = T224_IV[4] | 0;
	        this.Cl = T224_IV[5] | 0;
	        this.Dh = T224_IV[6] | 0;
	        this.Dl = T224_IV[7] | 0;
	        this.Eh = T224_IV[8] | 0;
	        this.El = T224_IV[9] | 0;
	        this.Fh = T224_IV[10] | 0;
	        this.Fl = T224_IV[11] | 0;
	        this.Gh = T224_IV[12] | 0;
	        this.Gl = T224_IV[13] | 0;
	        this.Hh = T224_IV[14] | 0;
	        this.Hl = T224_IV[15] | 0;
	    }
	}
	sha2.SHA512_224 = SHA512_224;
	class SHA512_256 extends SHA512 {
	    constructor() {
	        super(32);
	        this.Ah = T256_IV[0] | 0;
	        this.Al = T256_IV[1] | 0;
	        this.Bh = T256_IV[2] | 0;
	        this.Bl = T256_IV[3] | 0;
	        this.Ch = T256_IV[4] | 0;
	        this.Cl = T256_IV[5] | 0;
	        this.Dh = T256_IV[6] | 0;
	        this.Dl = T256_IV[7] | 0;
	        this.Eh = T256_IV[8] | 0;
	        this.El = T256_IV[9] | 0;
	        this.Fh = T256_IV[10] | 0;
	        this.Fl = T256_IV[11] | 0;
	        this.Gh = T256_IV[12] | 0;
	        this.Gl = T256_IV[13] | 0;
	        this.Hh = T256_IV[14] | 0;
	        this.Hl = T256_IV[15] | 0;
	    }
	}
	sha2.SHA512_256 = SHA512_256;
	/**
	 * SHA2-256 hash function from RFC 4634.
	 *
	 * It is the fastest JS hash, even faster than Blake3.
	 * To break sha256 using birthday attack, attackers need to try 2^128 hashes.
	 * BTC network is doing 2^70 hashes/sec (2^95 hashes/year) as per 2025.
	 */
	sha2.sha256 = (0, utils_ts_1.createHasher)(() => new SHA256());
	/** SHA2-224 hash function from RFC 4634 */
	sha2.sha224 = (0, utils_ts_1.createHasher)(() => new SHA224());
	/** SHA2-512 hash function from RFC 4634. */
	sha2.sha512 = (0, utils_ts_1.createHasher)(() => new SHA512());
	/** SHA2-384 hash function from RFC 4634. */
	sha2.sha384 = (0, utils_ts_1.createHasher)(() => new SHA384());
	/**
	 * SHA2-512/256 "truncated" hash function, with improved resistance to length extension attacks.
	 * See the paper on [truncated SHA512](https://eprint.iacr.org/2010/548.pdf).
	 */
	sha2.sha512_256 = (0, utils_ts_1.createHasher)(() => new SHA512_256());
	/**
	 * SHA2-512/224 "truncated" hash function, with improved resistance to length extension attacks.
	 * See the paper on [truncated SHA512](https://eprint.iacr.org/2010/548.pdf).
	 */
	sha2.sha512_224 = (0, utils_ts_1.createHasher)(() => new SHA512_224());
	
	return sha2;
}

var hasRequiredSha256;

function requireSha256 () {
	if (hasRequiredSha256) return sha256;
	hasRequiredSha256 = 1;
	Object.defineProperty(sha256, "__esModule", { value: true });
	sha256.sha224 = sha256.SHA224 = sha256.sha256 = sha256.SHA256 = void 0;
	/**
	 * SHA2-256 a.k.a. sha256. In JS, it is the fastest hash, even faster than Blake3.
	 *
	 * To break sha256 using birthday attack, attackers need to try 2^128 hashes.
	 * BTC network is doing 2^70 hashes/sec (2^95 hashes/year) as per 2025.
	 *
	 * Check out [FIPS 180-4](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf).
	 * @module
	 * @deprecated
	 */
	const sha2_ts_1 = /*@__PURE__*/ requireSha2();
	/** @deprecated Use import from `noble/hashes/sha2` module */
	sha256.SHA256 = sha2_ts_1.SHA256;
	/** @deprecated Use import from `noble/hashes/sha2` module */
	sha256.sha256 = sha2_ts_1.sha256;
	/** @deprecated Use import from `noble/hashes/sha2` module */
	sha256.SHA224 = sha2_ts_1.SHA224;
	/** @deprecated Use import from `noble/hashes/sha2` module */
	sha256.sha224 = sha2_ts_1.sha224;
	
	return sha256;
}

var sha512 = {};

var hasRequiredSha512;

function requireSha512 () {
	if (hasRequiredSha512) return sha512;
	hasRequiredSha512 = 1;
	Object.defineProperty(sha512, "__esModule", { value: true });
	sha512.sha512_256 = sha512.SHA512_256 = sha512.sha512_224 = sha512.SHA512_224 = sha512.sha384 = sha512.SHA384 = sha512.sha512 = sha512.SHA512 = void 0;
	/**
	 * SHA2-512 a.k.a. sha512 and sha384. It is slower than sha256 in js because u64 operations are slow.
	 *
	 * Check out [RFC 4634](https://datatracker.ietf.org/doc/html/rfc4634) and
	 * [the paper on truncated SHA512/256](https://eprint.iacr.org/2010/548.pdf).
	 * @module
	 * @deprecated
	 */
	const sha2_ts_1 = /*@__PURE__*/ requireSha2();
	/** @deprecated Use import from `noble/hashes/sha2` module */
	sha512.SHA512 = sha2_ts_1.SHA512;
	/** @deprecated Use import from `noble/hashes/sha2` module */
	sha512.sha512 = sha2_ts_1.sha512;
	/** @deprecated Use import from `noble/hashes/sha2` module */
	sha512.SHA384 = sha2_ts_1.SHA384;
	/** @deprecated Use import from `noble/hashes/sha2` module */
	sha512.sha384 = sha2_ts_1.sha384;
	/** @deprecated Use import from `noble/hashes/sha2` module */
	sha512.SHA512_224 = sha2_ts_1.SHA512_224;
	/** @deprecated Use import from `noble/hashes/sha2` module */
	sha512.sha512_224 = sha2_ts_1.sha512_224;
	/** @deprecated Use import from `noble/hashes/sha2` module */
	sha512.SHA512_256 = sha2_ts_1.SHA512_256;
	/** @deprecated Use import from `noble/hashes/sha2` module */
	sha512.sha512_256 = sha2_ts_1.sha512_256;
	
	return sha512;
}

var pbkdf2 = {};

var hmac = {};

var hasRequiredHmac;

function requireHmac () {
	if (hasRequiredHmac) return hmac;
	hasRequiredHmac = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.hmac = exports.HMAC = void 0;
		/**
		 * HMAC: RFC2104 message authentication code.
		 * @module
		 */
		const utils_ts_1 = /*@__PURE__*/ requireUtils();
		class HMAC extends utils_ts_1.Hash {
		    constructor(hash, _key) {
		        super();
		        this.finished = false;
		        this.destroyed = false;
		        (0, utils_ts_1.ahash)(hash);
		        const key = (0, utils_ts_1.toBytes)(_key);
		        this.iHash = hash.create();
		        if (typeof this.iHash.update !== 'function')
		            throw new Error('Expected instance of class which extends utils.Hash');
		        this.blockLen = this.iHash.blockLen;
		        this.outputLen = this.iHash.outputLen;
		        const blockLen = this.blockLen;
		        const pad = new Uint8Array(blockLen);
		        // blockLen can be bigger than outputLen
		        pad.set(key.length > blockLen ? hash.create().update(key).digest() : key);
		        for (let i = 0; i < pad.length; i++)
		            pad[i] ^= 0x36;
		        this.iHash.update(pad);
		        // By doing update (processing of first block) of outer hash here we can re-use it between multiple calls via clone
		        this.oHash = hash.create();
		        // Undo internal XOR && apply outer XOR
		        for (let i = 0; i < pad.length; i++)
		            pad[i] ^= 0x36 ^ 0x5c;
		        this.oHash.update(pad);
		        (0, utils_ts_1.clean)(pad);
		    }
		    update(buf) {
		        (0, utils_ts_1.aexists)(this);
		        this.iHash.update(buf);
		        return this;
		    }
		    digestInto(out) {
		        (0, utils_ts_1.aexists)(this);
		        (0, utils_ts_1.abytes)(out, this.outputLen);
		        this.finished = true;
		        this.iHash.digestInto(out);
		        this.oHash.update(out);
		        this.oHash.digestInto(out);
		        this.destroy();
		    }
		    digest() {
		        const out = new Uint8Array(this.oHash.outputLen);
		        this.digestInto(out);
		        return out;
		    }
		    _cloneInto(to) {
		        // Create new instance without calling constructor since key already in state and we don't know it.
		        to || (to = Object.create(Object.getPrototypeOf(this), {}));
		        const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
		        to = to;
		        to.finished = finished;
		        to.destroyed = destroyed;
		        to.blockLen = blockLen;
		        to.outputLen = outputLen;
		        to.oHash = oHash._cloneInto(to.oHash);
		        to.iHash = iHash._cloneInto(to.iHash);
		        return to;
		    }
		    clone() {
		        return this._cloneInto();
		    }
		    destroy() {
		        this.destroyed = true;
		        this.oHash.destroy();
		        this.iHash.destroy();
		    }
		}
		exports.HMAC = HMAC;
		/**
		 * HMAC: RFC2104 message authentication code.
		 * @param hash - function that would be used e.g. sha256
		 * @param key - message key
		 * @param message - message data
		 * @example
		 * import { hmac } from '@noble/hashes/hmac';
		 * import { sha256 } from '@noble/hashes/sha2';
		 * const mac1 = hmac(sha256, 'key', 'message');
		 */
		const hmac = (hash, key, message) => new HMAC(hash, key).update(message).digest();
		exports.hmac = hmac;
		exports.hmac.create = (hash, key) => new HMAC(hash, key);
		
	} (hmac));
	return hmac;
}

var hasRequiredPbkdf2;

function requirePbkdf2 () {
	if (hasRequiredPbkdf2) return pbkdf2;
	hasRequiredPbkdf2 = 1;
	Object.defineProperty(pbkdf2, "__esModule", { value: true });
	pbkdf2.pbkdf2 = pbkdf2$1;
	pbkdf2.pbkdf2Async = pbkdf2Async;
	/**
	 * PBKDF (RFC 2898). Can be used to create a key from password and salt.
	 * @module
	 */
	const hmac_ts_1 = /*@__PURE__*/ requireHmac();
	// prettier-ignore
	const utils_ts_1 = /*@__PURE__*/ requireUtils();
	// Common prologue and epilogue for sync/async functions
	function pbkdf2Init(hash, _password, _salt, _opts) {
	    (0, utils_ts_1.ahash)(hash);
	    const opts = (0, utils_ts_1.checkOpts)({ dkLen: 32, asyncTick: 10 }, _opts);
	    const { c, dkLen, asyncTick } = opts;
	    (0, utils_ts_1.anumber)(c);
	    (0, utils_ts_1.anumber)(dkLen);
	    (0, utils_ts_1.anumber)(asyncTick);
	    if (c < 1)
	        throw new Error('iterations (c) should be >= 1');
	    const password = (0, utils_ts_1.kdfInputToBytes)(_password);
	    const salt = (0, utils_ts_1.kdfInputToBytes)(_salt);
	    // DK = PBKDF2(PRF, Password, Salt, c, dkLen);
	    const DK = new Uint8Array(dkLen);
	    // U1 = PRF(Password, Salt + INT_32_BE(i))
	    const PRF = hmac_ts_1.hmac.create(hash, password);
	    const PRFSalt = PRF._cloneInto().update(salt);
	    return { c, dkLen, asyncTick, DK, PRF, PRFSalt };
	}
	function pbkdf2Output(PRF, PRFSalt, DK, prfW, u) {
	    PRF.destroy();
	    PRFSalt.destroy();
	    if (prfW)
	        prfW.destroy();
	    (0, utils_ts_1.clean)(u);
	    return DK;
	}
	/**
	 * PBKDF2-HMAC: RFC 2898 key derivation function
	 * @param hash - hash function that would be used e.g. sha256
	 * @param password - password from which a derived key is generated
	 * @param salt - cryptographic salt
	 * @param opts - {c, dkLen} where c is work factor and dkLen is output message size
	 * @example
	 * const key = pbkdf2(sha256, 'password', 'salt', { dkLen: 32, c: Math.pow(2, 18) });
	 */
	function pbkdf2$1(hash, password, salt, opts) {
	    const { c, dkLen, DK, PRF, PRFSalt } = pbkdf2Init(hash, password, salt, opts);
	    let prfW; // Working copy
	    const arr = new Uint8Array(4);
	    const view = (0, utils_ts_1.createView)(arr);
	    const u = new Uint8Array(PRF.outputLen);
	    // DK = T1 + T2 + ⋯ + Tdklen/hlen
	    for (let ti = 1, pos = 0; pos < dkLen; ti++, pos += PRF.outputLen) {
	        // Ti = F(Password, Salt, c, i)
	        const Ti = DK.subarray(pos, pos + PRF.outputLen);
	        view.setInt32(0, ti, false);
	        // F(Password, Salt, c, i) = U1 ^ U2 ^ ⋯ ^ Uc
	        // U1 = PRF(Password, Salt + INT_32_BE(i))
	        (prfW = PRFSalt._cloneInto(prfW)).update(arr).digestInto(u);
	        Ti.set(u.subarray(0, Ti.length));
	        for (let ui = 1; ui < c; ui++) {
	            // Uc = PRF(Password, Uc−1)
	            PRF._cloneInto(prfW).update(u).digestInto(u);
	            for (let i = 0; i < Ti.length; i++)
	                Ti[i] ^= u[i];
	        }
	    }
	    return pbkdf2Output(PRF, PRFSalt, DK, prfW, u);
	}
	/**
	 * PBKDF2-HMAC: RFC 2898 key derivation function. Async version.
	 * @example
	 * await pbkdf2Async(sha256, 'password', 'salt', { dkLen: 32, c: 500_000 });
	 */
	async function pbkdf2Async(hash, password, salt, opts) {
	    const { c, dkLen, asyncTick, DK, PRF, PRFSalt } = pbkdf2Init(hash, password, salt, opts);
	    let prfW; // Working copy
	    const arr = new Uint8Array(4);
	    const view = (0, utils_ts_1.createView)(arr);
	    const u = new Uint8Array(PRF.outputLen);
	    // DK = T1 + T2 + ⋯ + Tdklen/hlen
	    for (let ti = 1, pos = 0; pos < dkLen; ti++, pos += PRF.outputLen) {
	        // Ti = F(Password, Salt, c, i)
	        const Ti = DK.subarray(pos, pos + PRF.outputLen);
	        view.setInt32(0, ti, false);
	        // F(Password, Salt, c, i) = U1 ^ U2 ^ ⋯ ^ Uc
	        // U1 = PRF(Password, Salt + INT_32_BE(i))
	        (prfW = PRFSalt._cloneInto(prfW)).update(arr).digestInto(u);
	        Ti.set(u.subarray(0, Ti.length));
	        await (0, utils_ts_1.asyncLoop)(c - 1, asyncTick, () => {
	            // Uc = PRF(Password, Uc−1)
	            PRF._cloneInto(prfW).update(u).digestInto(u);
	            for (let i = 0; i < Ti.length; i++)
	                Ti[i] ^= u[i];
	        });
	    }
	    return pbkdf2Output(PRF, PRFSalt, DK, prfW, u);
	}
	
	return pbkdf2;
}

var _wordlists = {};

const require$$0 = /* #__PURE__ */ JSON.parse("[\"abdikace\",\"abeceda\",\"adresa\",\"agrese\",\"akce\",\"aktovka\",\"alej\",\"alkohol\",\"amputace\",\"ananas\",\"andulka\",\"anekdota\",\"anketa\",\"antika\",\"anulovat\",\"archa\",\"arogance\",\"asfalt\",\"asistent\",\"aspirace\",\"astma\",\"astronom\",\"atlas\",\"atletika\",\"atol\",\"autobus\",\"azyl\",\"babka\",\"bachor\",\"bacil\",\"baculka\",\"badatel\",\"bageta\",\"bagr\",\"bahno\",\"bakterie\",\"balada\",\"baletka\",\"balkon\",\"balonek\",\"balvan\",\"balza\",\"bambus\",\"bankomat\",\"barbar\",\"baret\",\"barman\",\"baroko\",\"barva\",\"baterka\",\"batoh\",\"bavlna\",\"bazalka\",\"bazilika\",\"bazuka\",\"bedna\",\"beran\",\"beseda\",\"bestie\",\"beton\",\"bezinka\",\"bezmoc\",\"beztak\",\"bicykl\",\"bidlo\",\"biftek\",\"bikiny\",\"bilance\",\"biograf\",\"biolog\",\"bitva\",\"bizon\",\"blahobyt\",\"blatouch\",\"blecha\",\"bledule\",\"blesk\",\"blikat\",\"blizna\",\"blokovat\",\"bloudit\",\"blud\",\"bobek\",\"bobr\",\"bodlina\",\"bodnout\",\"bohatost\",\"bojkot\",\"bojovat\",\"bokorys\",\"bolest\",\"borec\",\"borovice\",\"bota\",\"boubel\",\"bouchat\",\"bouda\",\"boule\",\"bourat\",\"boxer\",\"bradavka\",\"brambora\",\"branka\",\"bratr\",\"brepta\",\"briketa\",\"brko\",\"brloh\",\"bronz\",\"broskev\",\"brunetka\",\"brusinka\",\"brzda\",\"brzy\",\"bublina\",\"bubnovat\",\"buchta\",\"buditel\",\"budka\",\"budova\",\"bufet\",\"bujarost\",\"bukvice\",\"buldok\",\"bulva\",\"bunda\",\"bunkr\",\"burza\",\"butik\",\"buvol\",\"buzola\",\"bydlet\",\"bylina\",\"bytovka\",\"bzukot\",\"capart\",\"carevna\",\"cedr\",\"cedule\",\"cejch\",\"cejn\",\"cela\",\"celer\",\"celkem\",\"celnice\",\"cenina\",\"cennost\",\"cenovka\",\"centrum\",\"cenzor\",\"cestopis\",\"cetka\",\"chalupa\",\"chapadlo\",\"charita\",\"chata\",\"chechtat\",\"chemie\",\"chichot\",\"chirurg\",\"chlad\",\"chleba\",\"chlubit\",\"chmel\",\"chmura\",\"chobot\",\"chochol\",\"chodba\",\"cholera\",\"chomout\",\"chopit\",\"choroba\",\"chov\",\"chrapot\",\"chrlit\",\"chrt\",\"chrup\",\"chtivost\",\"chudina\",\"chutnat\",\"chvat\",\"chvilka\",\"chvost\",\"chyba\",\"chystat\",\"chytit\",\"cibule\",\"cigareta\",\"cihelna\",\"cihla\",\"cinkot\",\"cirkus\",\"cisterna\",\"citace\",\"citrus\",\"cizinec\",\"cizost\",\"clona\",\"cokoliv\",\"couvat\",\"ctitel\",\"ctnost\",\"cudnost\",\"cuketa\",\"cukr\",\"cupot\",\"cvaknout\",\"cval\",\"cvik\",\"cvrkot\",\"cyklista\",\"daleko\",\"dareba\",\"datel\",\"datum\",\"dcera\",\"debata\",\"dechovka\",\"decibel\",\"deficit\",\"deflace\",\"dekl\",\"dekret\",\"demokrat\",\"deprese\",\"derby\",\"deska\",\"detektiv\",\"dikobraz\",\"diktovat\",\"dioda\",\"diplom\",\"disk\",\"displej\",\"divadlo\",\"divoch\",\"dlaha\",\"dlouho\",\"dluhopis\",\"dnes\",\"dobro\",\"dobytek\",\"docent\",\"dochutit\",\"dodnes\",\"dohled\",\"dohoda\",\"dohra\",\"dojem\",\"dojnice\",\"doklad\",\"dokola\",\"doktor\",\"dokument\",\"dolar\",\"doleva\",\"dolina\",\"doma\",\"dominant\",\"domluvit\",\"domov\",\"donutit\",\"dopad\",\"dopis\",\"doplnit\",\"doposud\",\"doprovod\",\"dopustit\",\"dorazit\",\"dorost\",\"dort\",\"dosah\",\"doslov\",\"dostatek\",\"dosud\",\"dosyta\",\"dotaz\",\"dotek\",\"dotknout\",\"doufat\",\"doutnat\",\"dovozce\",\"dozadu\",\"doznat\",\"dozorce\",\"drahota\",\"drak\",\"dramatik\",\"dravec\",\"draze\",\"drdol\",\"drobnost\",\"drogerie\",\"drozd\",\"drsnost\",\"drtit\",\"drzost\",\"duben\",\"duchovno\",\"dudek\",\"duha\",\"duhovka\",\"dusit\",\"dusno\",\"dutost\",\"dvojice\",\"dvorec\",\"dynamit\",\"ekolog\",\"ekonomie\",\"elektron\",\"elipsa\",\"email\",\"emise\",\"emoce\",\"empatie\",\"epizoda\",\"epocha\",\"epopej\",\"epos\",\"esej\",\"esence\",\"eskorta\",\"eskymo\",\"etiketa\",\"euforie\",\"evoluce\",\"exekuce\",\"exkurze\",\"expedice\",\"exploze\",\"export\",\"extrakt\",\"facka\",\"fajfka\",\"fakulta\",\"fanatik\",\"fantazie\",\"farmacie\",\"favorit\",\"fazole\",\"federace\",\"fejeton\",\"fenka\",\"fialka\",\"figurant\",\"filozof\",\"filtr\",\"finance\",\"finta\",\"fixace\",\"fjord\",\"flanel\",\"flirt\",\"flotila\",\"fond\",\"fosfor\",\"fotbal\",\"fotka\",\"foton\",\"frakce\",\"freska\",\"fronta\",\"fukar\",\"funkce\",\"fyzika\",\"galeje\",\"garant\",\"genetika\",\"geolog\",\"gilotina\",\"glazura\",\"glejt\",\"golem\",\"golfista\",\"gotika\",\"graf\",\"gramofon\",\"granule\",\"grep\",\"gril\",\"grog\",\"groteska\",\"guma\",\"hadice\",\"hadr\",\"hala\",\"halenka\",\"hanba\",\"hanopis\",\"harfa\",\"harpuna\",\"havran\",\"hebkost\",\"hejkal\",\"hejno\",\"hejtman\",\"hektar\",\"helma\",\"hematom\",\"herec\",\"herna\",\"heslo\",\"hezky\",\"historik\",\"hladovka\",\"hlasivky\",\"hlava\",\"hledat\",\"hlen\",\"hlodavec\",\"hloh\",\"hloupost\",\"hltat\",\"hlubina\",\"hluchota\",\"hmat\",\"hmota\",\"hmyz\",\"hnis\",\"hnojivo\",\"hnout\",\"hoblina\",\"hoboj\",\"hoch\",\"hodiny\",\"hodlat\",\"hodnota\",\"hodovat\",\"hojnost\",\"hokej\",\"holinka\",\"holka\",\"holub\",\"homole\",\"honitba\",\"honorace\",\"horal\",\"horda\",\"horizont\",\"horko\",\"horlivec\",\"hormon\",\"hornina\",\"horoskop\",\"horstvo\",\"hospoda\",\"hostina\",\"hotovost\",\"houba\",\"houf\",\"houpat\",\"houska\",\"hovor\",\"hradba\",\"hranice\",\"hravost\",\"hrazda\",\"hrbolek\",\"hrdina\",\"hrdlo\",\"hrdost\",\"hrnek\",\"hrobka\",\"hromada\",\"hrot\",\"hrouda\",\"hrozen\",\"hrstka\",\"hrubost\",\"hryzat\",\"hubenost\",\"hubnout\",\"hudba\",\"hukot\",\"humr\",\"husita\",\"hustota\",\"hvozd\",\"hybnost\",\"hydrant\",\"hygiena\",\"hymna\",\"hysterik\",\"idylka\",\"ihned\",\"ikona\",\"iluze\",\"imunita\",\"infekce\",\"inflace\",\"inkaso\",\"inovace\",\"inspekce\",\"internet\",\"invalida\",\"investor\",\"inzerce\",\"ironie\",\"jablko\",\"jachta\",\"jahoda\",\"jakmile\",\"jakost\",\"jalovec\",\"jantar\",\"jarmark\",\"jaro\",\"jasan\",\"jasno\",\"jatka\",\"javor\",\"jazyk\",\"jedinec\",\"jedle\",\"jednatel\",\"jehlan\",\"jekot\",\"jelen\",\"jelito\",\"jemnost\",\"jenom\",\"jepice\",\"jeseter\",\"jevit\",\"jezdec\",\"jezero\",\"jinak\",\"jindy\",\"jinoch\",\"jiskra\",\"jistota\",\"jitrnice\",\"jizva\",\"jmenovat\",\"jogurt\",\"jurta\",\"kabaret\",\"kabel\",\"kabinet\",\"kachna\",\"kadet\",\"kadidlo\",\"kahan\",\"kajak\",\"kajuta\",\"kakao\",\"kaktus\",\"kalamita\",\"kalhoty\",\"kalibr\",\"kalnost\",\"kamera\",\"kamkoliv\",\"kamna\",\"kanibal\",\"kanoe\",\"kantor\",\"kapalina\",\"kapela\",\"kapitola\",\"kapka\",\"kaple\",\"kapota\",\"kapr\",\"kapusta\",\"kapybara\",\"karamel\",\"karotka\",\"karton\",\"kasa\",\"katalog\",\"katedra\",\"kauce\",\"kauza\",\"kavalec\",\"kazajka\",\"kazeta\",\"kazivost\",\"kdekoliv\",\"kdesi\",\"kedluben\",\"kemp\",\"keramika\",\"kino\",\"klacek\",\"kladivo\",\"klam\",\"klapot\",\"klasika\",\"klaun\",\"klec\",\"klenba\",\"klepat\",\"klesnout\",\"klid\",\"klima\",\"klisna\",\"klobouk\",\"klokan\",\"klopa\",\"kloub\",\"klubovna\",\"klusat\",\"kluzkost\",\"kmen\",\"kmitat\",\"kmotr\",\"kniha\",\"knot\",\"koalice\",\"koberec\",\"kobka\",\"kobliha\",\"kobyla\",\"kocour\",\"kohout\",\"kojenec\",\"kokos\",\"koktejl\",\"kolaps\",\"koleda\",\"kolize\",\"kolo\",\"komando\",\"kometa\",\"komik\",\"komnata\",\"komora\",\"kompas\",\"komunita\",\"konat\",\"koncept\",\"kondice\",\"konec\",\"konfese\",\"kongres\",\"konina\",\"konkurs\",\"kontakt\",\"konzerva\",\"kopanec\",\"kopie\",\"kopnout\",\"koprovka\",\"korbel\",\"korektor\",\"kormidlo\",\"koroptev\",\"korpus\",\"koruna\",\"koryto\",\"korzet\",\"kosatec\",\"kostka\",\"kotel\",\"kotleta\",\"kotoul\",\"koukat\",\"koupelna\",\"kousek\",\"kouzlo\",\"kovboj\",\"koza\",\"kozoroh\",\"krabice\",\"krach\",\"krajina\",\"kralovat\",\"krasopis\",\"kravata\",\"kredit\",\"krejcar\",\"kresba\",\"kreveta\",\"kriket\",\"kritik\",\"krize\",\"krkavec\",\"krmelec\",\"krmivo\",\"krocan\",\"krok\",\"kronika\",\"kropit\",\"kroupa\",\"krovka\",\"krtek\",\"kruhadlo\",\"krupice\",\"krutost\",\"krvinka\",\"krychle\",\"krypta\",\"krystal\",\"kryt\",\"kudlanka\",\"kufr\",\"kujnost\",\"kukla\",\"kulajda\",\"kulich\",\"kulka\",\"kulomet\",\"kultura\",\"kuna\",\"kupodivu\",\"kurt\",\"kurzor\",\"kutil\",\"kvalita\",\"kvasinka\",\"kvestor\",\"kynolog\",\"kyselina\",\"kytara\",\"kytice\",\"kytka\",\"kytovec\",\"kyvadlo\",\"labrador\",\"lachtan\",\"ladnost\",\"laik\",\"lakomec\",\"lamela\",\"lampa\",\"lanovka\",\"lasice\",\"laso\",\"lastura\",\"latinka\",\"lavina\",\"lebka\",\"leckdy\",\"leden\",\"lednice\",\"ledovka\",\"ledvina\",\"legenda\",\"legie\",\"legrace\",\"lehce\",\"lehkost\",\"lehnout\",\"lektvar\",\"lenochod\",\"lentilka\",\"lepenka\",\"lepidlo\",\"letadlo\",\"letec\",\"letmo\",\"letokruh\",\"levhart\",\"levitace\",\"levobok\",\"libra\",\"lichotka\",\"lidojed\",\"lidskost\",\"lihovina\",\"lijavec\",\"lilek\",\"limetka\",\"linie\",\"linka\",\"linoleum\",\"listopad\",\"litina\",\"litovat\",\"lobista\",\"lodivod\",\"logika\",\"logoped\",\"lokalita\",\"loket\",\"lomcovat\",\"lopata\",\"lopuch\",\"lord\",\"losos\",\"lotr\",\"loudal\",\"louh\",\"louka\",\"louskat\",\"lovec\",\"lstivost\",\"lucerna\",\"lucifer\",\"lump\",\"lusk\",\"lustrace\",\"lvice\",\"lyra\",\"lyrika\",\"lysina\",\"madam\",\"madlo\",\"magistr\",\"mahagon\",\"majetek\",\"majitel\",\"majorita\",\"makak\",\"makovice\",\"makrela\",\"malba\",\"malina\",\"malovat\",\"malvice\",\"maminka\",\"mandle\",\"manko\",\"marnost\",\"masakr\",\"maskot\",\"masopust\",\"matice\",\"matrika\",\"maturita\",\"mazanec\",\"mazivo\",\"mazlit\",\"mazurka\",\"mdloba\",\"mechanik\",\"meditace\",\"medovina\",\"melasa\",\"meloun\",\"mentolka\",\"metla\",\"metoda\",\"metr\",\"mezera\",\"migrace\",\"mihnout\",\"mihule\",\"mikina\",\"mikrofon\",\"milenec\",\"milimetr\",\"milost\",\"mimika\",\"mincovna\",\"minibar\",\"minomet\",\"minulost\",\"miska\",\"mistr\",\"mixovat\",\"mladost\",\"mlha\",\"mlhovina\",\"mlok\",\"mlsat\",\"mluvit\",\"mnich\",\"mnohem\",\"mobil\",\"mocnost\",\"modelka\",\"modlitba\",\"mohyla\",\"mokro\",\"molekula\",\"momentka\",\"monarcha\",\"monokl\",\"monstrum\",\"montovat\",\"monzun\",\"mosaz\",\"moskyt\",\"most\",\"motivace\",\"motorka\",\"motyka\",\"moucha\",\"moudrost\",\"mozaika\",\"mozek\",\"mozol\",\"mramor\",\"mravenec\",\"mrkev\",\"mrtvola\",\"mrzet\",\"mrzutost\",\"mstitel\",\"mudrc\",\"muflon\",\"mulat\",\"mumie\",\"munice\",\"muset\",\"mutace\",\"muzeum\",\"muzikant\",\"myslivec\",\"mzda\",\"nabourat\",\"nachytat\",\"nadace\",\"nadbytek\",\"nadhoz\",\"nadobro\",\"nadpis\",\"nahlas\",\"nahnat\",\"nahodile\",\"nahradit\",\"naivita\",\"najednou\",\"najisto\",\"najmout\",\"naklonit\",\"nakonec\",\"nakrmit\",\"nalevo\",\"namazat\",\"namluvit\",\"nanometr\",\"naoko\",\"naopak\",\"naostro\",\"napadat\",\"napevno\",\"naplnit\",\"napnout\",\"naposled\",\"naprosto\",\"narodit\",\"naruby\",\"narychlo\",\"nasadit\",\"nasekat\",\"naslepo\",\"nastat\",\"natolik\",\"navenek\",\"navrch\",\"navzdory\",\"nazvat\",\"nebe\",\"nechat\",\"necky\",\"nedaleko\",\"nedbat\",\"neduh\",\"negace\",\"nehet\",\"nehoda\",\"nejen\",\"nejprve\",\"neklid\",\"nelibost\",\"nemilost\",\"nemoc\",\"neochota\",\"neonka\",\"nepokoj\",\"nerost\",\"nerv\",\"nesmysl\",\"nesoulad\",\"netvor\",\"neuron\",\"nevina\",\"nezvykle\",\"nicota\",\"nijak\",\"nikam\",\"nikdy\",\"nikl\",\"nikterak\",\"nitro\",\"nocleh\",\"nohavice\",\"nominace\",\"nora\",\"norek\",\"nositel\",\"nosnost\",\"nouze\",\"noviny\",\"novota\",\"nozdra\",\"nuda\",\"nudle\",\"nuget\",\"nutit\",\"nutnost\",\"nutrie\",\"nymfa\",\"obal\",\"obarvit\",\"obava\",\"obdiv\",\"obec\",\"obehnat\",\"obejmout\",\"obezita\",\"obhajoba\",\"obilnice\",\"objasnit\",\"objekt\",\"obklopit\",\"oblast\",\"oblek\",\"obliba\",\"obloha\",\"obluda\",\"obnos\",\"obohatit\",\"obojek\",\"obout\",\"obrazec\",\"obrna\",\"obruba\",\"obrys\",\"obsah\",\"obsluha\",\"obstarat\",\"obuv\",\"obvaz\",\"obvinit\",\"obvod\",\"obvykle\",\"obyvatel\",\"obzor\",\"ocas\",\"ocel\",\"ocenit\",\"ochladit\",\"ochota\",\"ochrana\",\"ocitnout\",\"odboj\",\"odbyt\",\"odchod\",\"odcizit\",\"odebrat\",\"odeslat\",\"odevzdat\",\"odezva\",\"odhadce\",\"odhodit\",\"odjet\",\"odjinud\",\"odkaz\",\"odkoupit\",\"odliv\",\"odluka\",\"odmlka\",\"odolnost\",\"odpad\",\"odpis\",\"odplout\",\"odpor\",\"odpustit\",\"odpykat\",\"odrazka\",\"odsoudit\",\"odstup\",\"odsun\",\"odtok\",\"odtud\",\"odvaha\",\"odveta\",\"odvolat\",\"odvracet\",\"odznak\",\"ofina\",\"ofsajd\",\"ohlas\",\"ohnisko\",\"ohrada\",\"ohrozit\",\"ohryzek\",\"okap\",\"okenice\",\"oklika\",\"okno\",\"okouzlit\",\"okovy\",\"okrasa\",\"okres\",\"okrsek\",\"okruh\",\"okupant\",\"okurka\",\"okusit\",\"olejnina\",\"olizovat\",\"omak\",\"omeleta\",\"omezit\",\"omladina\",\"omlouvat\",\"omluva\",\"omyl\",\"onehdy\",\"opakovat\",\"opasek\",\"operace\",\"opice\",\"opilost\",\"opisovat\",\"opora\",\"opozice\",\"opravdu\",\"oproti\",\"orbital\",\"orchestr\",\"orgie\",\"orlice\",\"orloj\",\"ortel\",\"osada\",\"oschnout\",\"osika\",\"osivo\",\"oslava\",\"oslepit\",\"oslnit\",\"oslovit\",\"osnova\",\"osoba\",\"osolit\",\"ospalec\",\"osten\",\"ostraha\",\"ostuda\",\"ostych\",\"osvojit\",\"oteplit\",\"otisk\",\"otop\",\"otrhat\",\"otrlost\",\"otrok\",\"otruby\",\"otvor\",\"ovanout\",\"ovar\",\"oves\",\"ovlivnit\",\"ovoce\",\"oxid\",\"ozdoba\",\"pachatel\",\"pacient\",\"padouch\",\"pahorek\",\"pakt\",\"palanda\",\"palec\",\"palivo\",\"paluba\",\"pamflet\",\"pamlsek\",\"panenka\",\"panika\",\"panna\",\"panovat\",\"panstvo\",\"pantofle\",\"paprika\",\"parketa\",\"parodie\",\"parta\",\"paruka\",\"paryba\",\"paseka\",\"pasivita\",\"pastelka\",\"patent\",\"patrona\",\"pavouk\",\"pazneht\",\"pazourek\",\"pecka\",\"pedagog\",\"pejsek\",\"peklo\",\"peloton\",\"penalta\",\"pendrek\",\"penze\",\"periskop\",\"pero\",\"pestrost\",\"petarda\",\"petice\",\"petrolej\",\"pevnina\",\"pexeso\",\"pianista\",\"piha\",\"pijavice\",\"pikle\",\"piknik\",\"pilina\",\"pilnost\",\"pilulka\",\"pinzeta\",\"pipeta\",\"pisatel\",\"pistole\",\"pitevna\",\"pivnice\",\"pivovar\",\"placenta\",\"plakat\",\"plamen\",\"planeta\",\"plastika\",\"platit\",\"plavidlo\",\"plaz\",\"plech\",\"plemeno\",\"plenta\",\"ples\",\"pletivo\",\"plevel\",\"plivat\",\"plnit\",\"plno\",\"plocha\",\"plodina\",\"plomba\",\"plout\",\"pluk\",\"plyn\",\"pobavit\",\"pobyt\",\"pochod\",\"pocit\",\"poctivec\",\"podat\",\"podcenit\",\"podepsat\",\"podhled\",\"podivit\",\"podklad\",\"podmanit\",\"podnik\",\"podoba\",\"podpora\",\"podraz\",\"podstata\",\"podvod\",\"podzim\",\"poezie\",\"pohanka\",\"pohnutka\",\"pohovor\",\"pohroma\",\"pohyb\",\"pointa\",\"pojistka\",\"pojmout\",\"pokazit\",\"pokles\",\"pokoj\",\"pokrok\",\"pokuta\",\"pokyn\",\"poledne\",\"polibek\",\"polknout\",\"poloha\",\"polynom\",\"pomalu\",\"pominout\",\"pomlka\",\"pomoc\",\"pomsta\",\"pomyslet\",\"ponechat\",\"ponorka\",\"ponurost\",\"popadat\",\"popel\",\"popisek\",\"poplach\",\"poprosit\",\"popsat\",\"popud\",\"poradce\",\"porce\",\"porod\",\"porucha\",\"poryv\",\"posadit\",\"posed\",\"posila\",\"poskok\",\"poslanec\",\"posoudit\",\"pospolu\",\"postava\",\"posudek\",\"posyp\",\"potah\",\"potkan\",\"potlesk\",\"potomek\",\"potrava\",\"potupa\",\"potvora\",\"poukaz\",\"pouto\",\"pouzdro\",\"povaha\",\"povidla\",\"povlak\",\"povoz\",\"povrch\",\"povstat\",\"povyk\",\"povzdech\",\"pozdrav\",\"pozemek\",\"poznatek\",\"pozor\",\"pozvat\",\"pracovat\",\"prahory\",\"praktika\",\"prales\",\"praotec\",\"praporek\",\"prase\",\"pravda\",\"princip\",\"prkno\",\"probudit\",\"procento\",\"prodej\",\"profese\",\"prohra\",\"projekt\",\"prolomit\",\"promile\",\"pronikat\",\"propad\",\"prorok\",\"prosba\",\"proton\",\"proutek\",\"provaz\",\"prskavka\",\"prsten\",\"prudkost\",\"prut\",\"prvek\",\"prvohory\",\"psanec\",\"psovod\",\"pstruh\",\"ptactvo\",\"puberta\",\"puch\",\"pudl\",\"pukavec\",\"puklina\",\"pukrle\",\"pult\",\"pumpa\",\"punc\",\"pupen\",\"pusa\",\"pusinka\",\"pustina\",\"putovat\",\"putyka\",\"pyramida\",\"pysk\",\"pytel\",\"racek\",\"rachot\",\"radiace\",\"radnice\",\"radon\",\"raft\",\"ragby\",\"raketa\",\"rakovina\",\"rameno\",\"rampouch\",\"rande\",\"rarach\",\"rarita\",\"rasovna\",\"rastr\",\"ratolest\",\"razance\",\"razidlo\",\"reagovat\",\"reakce\",\"recept\",\"redaktor\",\"referent\",\"reflex\",\"rejnok\",\"reklama\",\"rekord\",\"rekrut\",\"rektor\",\"reputace\",\"revize\",\"revma\",\"revolver\",\"rezerva\",\"riskovat\",\"riziko\",\"robotika\",\"rodokmen\",\"rohovka\",\"rokle\",\"rokoko\",\"romaneto\",\"ropovod\",\"ropucha\",\"rorejs\",\"rosol\",\"rostlina\",\"rotmistr\",\"rotoped\",\"rotunda\",\"roubenka\",\"roucho\",\"roup\",\"roura\",\"rovina\",\"rovnice\",\"rozbor\",\"rozchod\",\"rozdat\",\"rozeznat\",\"rozhodce\",\"rozinka\",\"rozjezd\",\"rozkaz\",\"rozloha\",\"rozmar\",\"rozpad\",\"rozruch\",\"rozsah\",\"roztok\",\"rozum\",\"rozvod\",\"rubrika\",\"ruchadlo\",\"rukavice\",\"rukopis\",\"ryba\",\"rybolov\",\"rychlost\",\"rydlo\",\"rypadlo\",\"rytina\",\"ryzost\",\"sadista\",\"sahat\",\"sako\",\"samec\",\"samizdat\",\"samota\",\"sanitka\",\"sardinka\",\"sasanka\",\"satelit\",\"sazba\",\"sazenice\",\"sbor\",\"schovat\",\"sebranka\",\"secese\",\"sedadlo\",\"sediment\",\"sedlo\",\"sehnat\",\"sejmout\",\"sekera\",\"sekta\",\"sekunda\",\"sekvoje\",\"semeno\",\"seno\",\"servis\",\"sesadit\",\"seshora\",\"seskok\",\"seslat\",\"sestra\",\"sesuv\",\"sesypat\",\"setba\",\"setina\",\"setkat\",\"setnout\",\"setrvat\",\"sever\",\"seznam\",\"shoda\",\"shrnout\",\"sifon\",\"silnice\",\"sirka\",\"sirotek\",\"sirup\",\"situace\",\"skafandr\",\"skalisko\",\"skanzen\",\"skaut\",\"skeptik\",\"skica\",\"skladba\",\"sklenice\",\"sklo\",\"skluz\",\"skoba\",\"skokan\",\"skoro\",\"skripta\",\"skrz\",\"skupina\",\"skvost\",\"skvrna\",\"slabika\",\"sladidlo\",\"slanina\",\"slast\",\"slavnost\",\"sledovat\",\"slepec\",\"sleva\",\"slezina\",\"slib\",\"slina\",\"sliznice\",\"slon\",\"sloupek\",\"slovo\",\"sluch\",\"sluha\",\"slunce\",\"slupka\",\"slza\",\"smaragd\",\"smetana\",\"smilstvo\",\"smlouva\",\"smog\",\"smrad\",\"smrk\",\"smrtka\",\"smutek\",\"smysl\",\"snad\",\"snaha\",\"snob\",\"sobota\",\"socha\",\"sodovka\",\"sokol\",\"sopka\",\"sotva\",\"souboj\",\"soucit\",\"soudce\",\"souhlas\",\"soulad\",\"soumrak\",\"souprava\",\"soused\",\"soutok\",\"souviset\",\"spalovna\",\"spasitel\",\"spis\",\"splav\",\"spodek\",\"spojenec\",\"spolu\",\"sponzor\",\"spornost\",\"spousta\",\"sprcha\",\"spustit\",\"sranda\",\"sraz\",\"srdce\",\"srna\",\"srnec\",\"srovnat\",\"srpen\",\"srst\",\"srub\",\"stanice\",\"starosta\",\"statika\",\"stavba\",\"stehno\",\"stezka\",\"stodola\",\"stolek\",\"stopa\",\"storno\",\"stoupat\",\"strach\",\"stres\",\"strhnout\",\"strom\",\"struna\",\"studna\",\"stupnice\",\"stvol\",\"styk\",\"subjekt\",\"subtropy\",\"suchar\",\"sudost\",\"sukno\",\"sundat\",\"sunout\",\"surikata\",\"surovina\",\"svah\",\"svalstvo\",\"svetr\",\"svatba\",\"svazek\",\"svisle\",\"svitek\",\"svoboda\",\"svodidlo\",\"svorka\",\"svrab\",\"sykavka\",\"sykot\",\"synek\",\"synovec\",\"sypat\",\"sypkost\",\"syrovost\",\"sysel\",\"sytost\",\"tabletka\",\"tabule\",\"tahoun\",\"tajemno\",\"tajfun\",\"tajga\",\"tajit\",\"tajnost\",\"taktika\",\"tamhle\",\"tampon\",\"tancovat\",\"tanec\",\"tanker\",\"tapeta\",\"tavenina\",\"tazatel\",\"technika\",\"tehdy\",\"tekutina\",\"telefon\",\"temnota\",\"tendence\",\"tenista\",\"tenor\",\"teplota\",\"tepna\",\"teprve\",\"terapie\",\"termoska\",\"textil\",\"ticho\",\"tiskopis\",\"titulek\",\"tkadlec\",\"tkanina\",\"tlapka\",\"tleskat\",\"tlukot\",\"tlupa\",\"tmel\",\"toaleta\",\"topinka\",\"topol\",\"torzo\",\"touha\",\"toulec\",\"tradice\",\"traktor\",\"tramp\",\"trasa\",\"traverza\",\"trefit\",\"trest\",\"trezor\",\"trhavina\",\"trhlina\",\"trochu\",\"trojice\",\"troska\",\"trouba\",\"trpce\",\"trpitel\",\"trpkost\",\"trubec\",\"truchlit\",\"truhlice\",\"trus\",\"trvat\",\"tudy\",\"tuhnout\",\"tuhost\",\"tundra\",\"turista\",\"turnaj\",\"tuzemsko\",\"tvaroh\",\"tvorba\",\"tvrdost\",\"tvrz\",\"tygr\",\"tykev\",\"ubohost\",\"uboze\",\"ubrat\",\"ubrousek\",\"ubrus\",\"ubytovna\",\"ucho\",\"uctivost\",\"udivit\",\"uhradit\",\"ujednat\",\"ujistit\",\"ujmout\",\"ukazatel\",\"uklidnit\",\"uklonit\",\"ukotvit\",\"ukrojit\",\"ulice\",\"ulita\",\"ulovit\",\"umyvadlo\",\"unavit\",\"uniforma\",\"uniknout\",\"upadnout\",\"uplatnit\",\"uplynout\",\"upoutat\",\"upravit\",\"uran\",\"urazit\",\"usednout\",\"usilovat\",\"usmrtit\",\"usnadnit\",\"usnout\",\"usoudit\",\"ustlat\",\"ustrnout\",\"utahovat\",\"utkat\",\"utlumit\",\"utonout\",\"utopenec\",\"utrousit\",\"uvalit\",\"uvolnit\",\"uvozovka\",\"uzdravit\",\"uzel\",\"uzenina\",\"uzlina\",\"uznat\",\"vagon\",\"valcha\",\"valoun\",\"vana\",\"vandal\",\"vanilka\",\"varan\",\"varhany\",\"varovat\",\"vcelku\",\"vchod\",\"vdova\",\"vedro\",\"vegetace\",\"vejce\",\"velbloud\",\"veletrh\",\"velitel\",\"velmoc\",\"velryba\",\"venkov\",\"veranda\",\"verze\",\"veselka\",\"veskrze\",\"vesnice\",\"vespodu\",\"vesta\",\"veterina\",\"veverka\",\"vibrace\",\"vichr\",\"videohra\",\"vidina\",\"vidle\",\"vila\",\"vinice\",\"viset\",\"vitalita\",\"vize\",\"vizitka\",\"vjezd\",\"vklad\",\"vkus\",\"vlajka\",\"vlak\",\"vlasec\",\"vlevo\",\"vlhkost\",\"vliv\",\"vlnovka\",\"vloupat\",\"vnucovat\",\"vnuk\",\"voda\",\"vodivost\",\"vodoznak\",\"vodstvo\",\"vojensky\",\"vojna\",\"vojsko\",\"volant\",\"volba\",\"volit\",\"volno\",\"voskovka\",\"vozidlo\",\"vozovna\",\"vpravo\",\"vrabec\",\"vracet\",\"vrah\",\"vrata\",\"vrba\",\"vrcholek\",\"vrhat\",\"vrstva\",\"vrtule\",\"vsadit\",\"vstoupit\",\"vstup\",\"vtip\",\"vybavit\",\"vybrat\",\"vychovat\",\"vydat\",\"vydra\",\"vyfotit\",\"vyhledat\",\"vyhnout\",\"vyhodit\",\"vyhradit\",\"vyhubit\",\"vyjasnit\",\"vyjet\",\"vyjmout\",\"vyklopit\",\"vykonat\",\"vylekat\",\"vymazat\",\"vymezit\",\"vymizet\",\"vymyslet\",\"vynechat\",\"vynikat\",\"vynutit\",\"vypadat\",\"vyplatit\",\"vypravit\",\"vypustit\",\"vyrazit\",\"vyrovnat\",\"vyrvat\",\"vyslovit\",\"vysoko\",\"vystavit\",\"vysunout\",\"vysypat\",\"vytasit\",\"vytesat\",\"vytratit\",\"vyvinout\",\"vyvolat\",\"vyvrhel\",\"vyzdobit\",\"vyznat\",\"vzadu\",\"vzbudit\",\"vzchopit\",\"vzdor\",\"vzduch\",\"vzdychat\",\"vzestup\",\"vzhledem\",\"vzkaz\",\"vzlykat\",\"vznik\",\"vzorek\",\"vzpoura\",\"vztah\",\"vztek\",\"xylofon\",\"zabrat\",\"zabydlet\",\"zachovat\",\"zadarmo\",\"zadusit\",\"zafoukat\",\"zahltit\",\"zahodit\",\"zahrada\",\"zahynout\",\"zajatec\",\"zajet\",\"zajistit\",\"zaklepat\",\"zakoupit\",\"zalepit\",\"zamezit\",\"zamotat\",\"zamyslet\",\"zanechat\",\"zanikat\",\"zaplatit\",\"zapojit\",\"zapsat\",\"zarazit\",\"zastavit\",\"zasunout\",\"zatajit\",\"zatemnit\",\"zatknout\",\"zaujmout\",\"zavalit\",\"zavelet\",\"zavinit\",\"zavolat\",\"zavrtat\",\"zazvonit\",\"zbavit\",\"zbrusu\",\"zbudovat\",\"zbytek\",\"zdaleka\",\"zdarma\",\"zdatnost\",\"zdivo\",\"zdobit\",\"zdroj\",\"zdvih\",\"zdymadlo\",\"zelenina\",\"zeman\",\"zemina\",\"zeptat\",\"zezadu\",\"zezdola\",\"zhatit\",\"zhltnout\",\"zhluboka\",\"zhotovit\",\"zhruba\",\"zima\",\"zimnice\",\"zjemnit\",\"zklamat\",\"zkoumat\",\"zkratka\",\"zkumavka\",\"zlato\",\"zlehka\",\"zloba\",\"zlom\",\"zlost\",\"zlozvyk\",\"zmapovat\",\"zmar\",\"zmatek\",\"zmije\",\"zmizet\",\"zmocnit\",\"zmodrat\",\"zmrzlina\",\"zmutovat\",\"znak\",\"znalost\",\"znamenat\",\"znovu\",\"zobrazit\",\"zotavit\",\"zoubek\",\"zoufale\",\"zplodit\",\"zpomalit\",\"zprava\",\"zprostit\",\"zprudka\",\"zprvu\",\"zrada\",\"zranit\",\"zrcadlo\",\"zrnitost\",\"zrno\",\"zrovna\",\"zrychlit\",\"zrzavost\",\"zticha\",\"ztratit\",\"zubovina\",\"zubr\",\"zvednout\",\"zvenku\",\"zvesela\",\"zvon\",\"zvrat\",\"zvukovod\",\"zvyk\"]");

const require$$1 = /* #__PURE__ */ JSON.parse("[\"的\",\"一\",\"是\",\"在\",\"不\",\"了\",\"有\",\"和\",\"人\",\"这\",\"中\",\"大\",\"为\",\"上\",\"个\",\"国\",\"我\",\"以\",\"要\",\"他\",\"时\",\"来\",\"用\",\"们\",\"生\",\"到\",\"作\",\"地\",\"于\",\"出\",\"就\",\"分\",\"对\",\"成\",\"会\",\"可\",\"主\",\"发\",\"年\",\"动\",\"同\",\"工\",\"也\",\"能\",\"下\",\"过\",\"子\",\"说\",\"产\",\"种\",\"面\",\"而\",\"方\",\"后\",\"多\",\"定\",\"行\",\"学\",\"法\",\"所\",\"民\",\"得\",\"经\",\"十\",\"三\",\"之\",\"进\",\"着\",\"等\",\"部\",\"度\",\"家\",\"电\",\"力\",\"里\",\"如\",\"水\",\"化\",\"高\",\"自\",\"二\",\"理\",\"起\",\"小\",\"物\",\"现\",\"实\",\"加\",\"量\",\"都\",\"两\",\"体\",\"制\",\"机\",\"当\",\"使\",\"点\",\"从\",\"业\",\"本\",\"去\",\"把\",\"性\",\"好\",\"应\",\"开\",\"它\",\"合\",\"还\",\"因\",\"由\",\"其\",\"些\",\"然\",\"前\",\"外\",\"天\",\"政\",\"四\",\"日\",\"那\",\"社\",\"义\",\"事\",\"平\",\"形\",\"相\",\"全\",\"表\",\"间\",\"样\",\"与\",\"关\",\"各\",\"重\",\"新\",\"线\",\"内\",\"数\",\"正\",\"心\",\"反\",\"你\",\"明\",\"看\",\"原\",\"又\",\"么\",\"利\",\"比\",\"或\",\"但\",\"质\",\"气\",\"第\",\"向\",\"道\",\"命\",\"此\",\"变\",\"条\",\"只\",\"没\",\"结\",\"解\",\"问\",\"意\",\"建\",\"月\",\"公\",\"无\",\"系\",\"军\",\"很\",\"情\",\"者\",\"最\",\"立\",\"代\",\"想\",\"已\",\"通\",\"并\",\"提\",\"直\",\"题\",\"党\",\"程\",\"展\",\"五\",\"果\",\"料\",\"象\",\"员\",\"革\",\"位\",\"入\",\"常\",\"文\",\"总\",\"次\",\"品\",\"式\",\"活\",\"设\",\"及\",\"管\",\"特\",\"件\",\"长\",\"求\",\"老\",\"头\",\"基\",\"资\",\"边\",\"流\",\"路\",\"级\",\"少\",\"图\",\"山\",\"统\",\"接\",\"知\",\"较\",\"将\",\"组\",\"见\",\"计\",\"别\",\"她\",\"手\",\"角\",\"期\",\"根\",\"论\",\"运\",\"农\",\"指\",\"几\",\"九\",\"区\",\"强\",\"放\",\"决\",\"西\",\"被\",\"干\",\"做\",\"必\",\"战\",\"先\",\"回\",\"则\",\"任\",\"取\",\"据\",\"处\",\"队\",\"南\",\"给\",\"色\",\"光\",\"门\",\"即\",\"保\",\"治\",\"北\",\"造\",\"百\",\"规\",\"热\",\"领\",\"七\",\"海\",\"口\",\"东\",\"导\",\"器\",\"压\",\"志\",\"世\",\"金\",\"增\",\"争\",\"济\",\"阶\",\"油\",\"思\",\"术\",\"极\",\"交\",\"受\",\"联\",\"什\",\"认\",\"六\",\"共\",\"权\",\"收\",\"证\",\"改\",\"清\",\"美\",\"再\",\"采\",\"转\",\"更\",\"单\",\"风\",\"切\",\"打\",\"白\",\"教\",\"速\",\"花\",\"带\",\"安\",\"场\",\"身\",\"车\",\"例\",\"真\",\"务\",\"具\",\"万\",\"每\",\"目\",\"至\",\"达\",\"走\",\"积\",\"示\",\"议\",\"声\",\"报\",\"斗\",\"完\",\"类\",\"八\",\"离\",\"华\",\"名\",\"确\",\"才\",\"科\",\"张\",\"信\",\"马\",\"节\",\"话\",\"米\",\"整\",\"空\",\"元\",\"况\",\"今\",\"集\",\"温\",\"传\",\"土\",\"许\",\"步\",\"群\",\"广\",\"石\",\"记\",\"需\",\"段\",\"研\",\"界\",\"拉\",\"林\",\"律\",\"叫\",\"且\",\"究\",\"观\",\"越\",\"织\",\"装\",\"影\",\"算\",\"低\",\"持\",\"音\",\"众\",\"书\",\"布\",\"复\",\"容\",\"儿\",\"须\",\"际\",\"商\",\"非\",\"验\",\"连\",\"断\",\"深\",\"难\",\"近\",\"矿\",\"千\",\"周\",\"委\",\"素\",\"技\",\"备\",\"半\",\"办\",\"青\",\"省\",\"列\",\"习\",\"响\",\"约\",\"支\",\"般\",\"史\",\"感\",\"劳\",\"便\",\"团\",\"往\",\"酸\",\"历\",\"市\",\"克\",\"何\",\"除\",\"消\",\"构\",\"府\",\"称\",\"太\",\"准\",\"精\",\"值\",\"号\",\"率\",\"族\",\"维\",\"划\",\"选\",\"标\",\"写\",\"存\",\"候\",\"毛\",\"亲\",\"快\",\"效\",\"斯\",\"院\",\"查\",\"江\",\"型\",\"眼\",\"王\",\"按\",\"格\",\"养\",\"易\",\"置\",\"派\",\"层\",\"片\",\"始\",\"却\",\"专\",\"状\",\"育\",\"厂\",\"京\",\"识\",\"适\",\"属\",\"圆\",\"包\",\"火\",\"住\",\"调\",\"满\",\"县\",\"局\",\"照\",\"参\",\"红\",\"细\",\"引\",\"听\",\"该\",\"铁\",\"价\",\"严\",\"首\",\"底\",\"液\",\"官\",\"德\",\"随\",\"病\",\"苏\",\"失\",\"尔\",\"死\",\"讲\",\"配\",\"女\",\"黄\",\"推\",\"显\",\"谈\",\"罪\",\"神\",\"艺\",\"呢\",\"席\",\"含\",\"企\",\"望\",\"密\",\"批\",\"营\",\"项\",\"防\",\"举\",\"球\",\"英\",\"氧\",\"势\",\"告\",\"李\",\"台\",\"落\",\"木\",\"帮\",\"轮\",\"破\",\"亚\",\"师\",\"围\",\"注\",\"远\",\"字\",\"材\",\"排\",\"供\",\"河\",\"态\",\"封\",\"另\",\"施\",\"减\",\"树\",\"溶\",\"怎\",\"止\",\"案\",\"言\",\"士\",\"均\",\"武\",\"固\",\"叶\",\"鱼\",\"波\",\"视\",\"仅\",\"费\",\"紧\",\"爱\",\"左\",\"章\",\"早\",\"朝\",\"害\",\"续\",\"轻\",\"服\",\"试\",\"食\",\"充\",\"兵\",\"源\",\"判\",\"护\",\"司\",\"足\",\"某\",\"练\",\"差\",\"致\",\"板\",\"田\",\"降\",\"黑\",\"犯\",\"负\",\"击\",\"范\",\"继\",\"兴\",\"似\",\"余\",\"坚\",\"曲\",\"输\",\"修\",\"故\",\"城\",\"夫\",\"够\",\"送\",\"笔\",\"船\",\"占\",\"右\",\"财\",\"吃\",\"富\",\"春\",\"职\",\"觉\",\"汉\",\"画\",\"功\",\"巴\",\"跟\",\"虽\",\"杂\",\"飞\",\"检\",\"吸\",\"助\",\"升\",\"阳\",\"互\",\"初\",\"创\",\"抗\",\"考\",\"投\",\"坏\",\"策\",\"古\",\"径\",\"换\",\"未\",\"跑\",\"留\",\"钢\",\"曾\",\"端\",\"责\",\"站\",\"简\",\"述\",\"钱\",\"副\",\"尽\",\"帝\",\"射\",\"草\",\"冲\",\"承\",\"独\",\"令\",\"限\",\"阿\",\"宣\",\"环\",\"双\",\"请\",\"超\",\"微\",\"让\",\"控\",\"州\",\"良\",\"轴\",\"找\",\"否\",\"纪\",\"益\",\"依\",\"优\",\"顶\",\"础\",\"载\",\"倒\",\"房\",\"突\",\"坐\",\"粉\",\"敌\",\"略\",\"客\",\"袁\",\"冷\",\"胜\",\"绝\",\"析\",\"块\",\"剂\",\"测\",\"丝\",\"协\",\"诉\",\"念\",\"陈\",\"仍\",\"罗\",\"盐\",\"友\",\"洋\",\"错\",\"苦\",\"夜\",\"刑\",\"移\",\"频\",\"逐\",\"靠\",\"混\",\"母\",\"短\",\"皮\",\"终\",\"聚\",\"汽\",\"村\",\"云\",\"哪\",\"既\",\"距\",\"卫\",\"停\",\"烈\",\"央\",\"察\",\"烧\",\"迅\",\"境\",\"若\",\"印\",\"洲\",\"刻\",\"括\",\"激\",\"孔\",\"搞\",\"甚\",\"室\",\"待\",\"核\",\"校\",\"散\",\"侵\",\"吧\",\"甲\",\"游\",\"久\",\"菜\",\"味\",\"旧\",\"模\",\"湖\",\"货\",\"损\",\"预\",\"阻\",\"毫\",\"普\",\"稳\",\"乙\",\"妈\",\"植\",\"息\",\"扩\",\"银\",\"语\",\"挥\",\"酒\",\"守\",\"拿\",\"序\",\"纸\",\"医\",\"缺\",\"雨\",\"吗\",\"针\",\"刘\",\"啊\",\"急\",\"唱\",\"误\",\"训\",\"愿\",\"审\",\"附\",\"获\",\"茶\",\"鲜\",\"粮\",\"斤\",\"孩\",\"脱\",\"硫\",\"肥\",\"善\",\"龙\",\"演\",\"父\",\"渐\",\"血\",\"欢\",\"械\",\"掌\",\"歌\",\"沙\",\"刚\",\"攻\",\"谓\",\"盾\",\"讨\",\"晚\",\"粒\",\"乱\",\"燃\",\"矛\",\"乎\",\"杀\",\"药\",\"宁\",\"鲁\",\"贵\",\"钟\",\"煤\",\"读\",\"班\",\"伯\",\"香\",\"介\",\"迫\",\"句\",\"丰\",\"培\",\"握\",\"兰\",\"担\",\"弦\",\"蛋\",\"沉\",\"假\",\"穿\",\"执\",\"答\",\"乐\",\"谁\",\"顺\",\"烟\",\"缩\",\"征\",\"脸\",\"喜\",\"松\",\"脚\",\"困\",\"异\",\"免\",\"背\",\"星\",\"福\",\"买\",\"染\",\"井\",\"概\",\"慢\",\"怕\",\"磁\",\"倍\",\"祖\",\"皇\",\"促\",\"静\",\"补\",\"评\",\"翻\",\"肉\",\"践\",\"尼\",\"衣\",\"宽\",\"扬\",\"棉\",\"希\",\"伤\",\"操\",\"垂\",\"秋\",\"宜\",\"氢\",\"套\",\"督\",\"振\",\"架\",\"亮\",\"末\",\"宪\",\"庆\",\"编\",\"牛\",\"触\",\"映\",\"雷\",\"销\",\"诗\",\"座\",\"居\",\"抓\",\"裂\",\"胞\",\"呼\",\"娘\",\"景\",\"威\",\"绿\",\"晶\",\"厚\",\"盟\",\"衡\",\"鸡\",\"孙\",\"延\",\"危\",\"胶\",\"屋\",\"乡\",\"临\",\"陆\",\"顾\",\"掉\",\"呀\",\"灯\",\"岁\",\"措\",\"束\",\"耐\",\"剧\",\"玉\",\"赵\",\"跳\",\"哥\",\"季\",\"课\",\"凯\",\"胡\",\"额\",\"款\",\"绍\",\"卷\",\"齐\",\"伟\",\"蒸\",\"殖\",\"永\",\"宗\",\"苗\",\"川\",\"炉\",\"岩\",\"弱\",\"零\",\"杨\",\"奏\",\"沿\",\"露\",\"杆\",\"探\",\"滑\",\"镇\",\"饭\",\"浓\",\"航\",\"怀\",\"赶\",\"库\",\"夺\",\"伊\",\"灵\",\"税\",\"途\",\"灭\",\"赛\",\"归\",\"召\",\"鼓\",\"播\",\"盘\",\"裁\",\"险\",\"康\",\"唯\",\"录\",\"菌\",\"纯\",\"借\",\"糖\",\"盖\",\"横\",\"符\",\"私\",\"努\",\"堂\",\"域\",\"枪\",\"润\",\"幅\",\"哈\",\"竟\",\"熟\",\"虫\",\"泽\",\"脑\",\"壤\",\"碳\",\"欧\",\"遍\",\"侧\",\"寨\",\"敢\",\"彻\",\"虑\",\"斜\",\"薄\",\"庭\",\"纳\",\"弹\",\"饲\",\"伸\",\"折\",\"麦\",\"湿\",\"暗\",\"荷\",\"瓦\",\"塞\",\"床\",\"筑\",\"恶\",\"户\",\"访\",\"塔\",\"奇\",\"透\",\"梁\",\"刀\",\"旋\",\"迹\",\"卡\",\"氯\",\"遇\",\"份\",\"毒\",\"泥\",\"退\",\"洗\",\"摆\",\"灰\",\"彩\",\"卖\",\"耗\",\"夏\",\"择\",\"忙\",\"铜\",\"献\",\"硬\",\"予\",\"繁\",\"圈\",\"雪\",\"函\",\"亦\",\"抽\",\"篇\",\"阵\",\"阴\",\"丁\",\"尺\",\"追\",\"堆\",\"雄\",\"迎\",\"泛\",\"爸\",\"楼\",\"避\",\"谋\",\"吨\",\"野\",\"猪\",\"旗\",\"累\",\"偏\",\"典\",\"馆\",\"索\",\"秦\",\"脂\",\"潮\",\"爷\",\"豆\",\"忽\",\"托\",\"惊\",\"塑\",\"遗\",\"愈\",\"朱\",\"替\",\"纤\",\"粗\",\"倾\",\"尚\",\"痛\",\"楚\",\"谢\",\"奋\",\"购\",\"磨\",\"君\",\"池\",\"旁\",\"碎\",\"骨\",\"监\",\"捕\",\"弟\",\"暴\",\"割\",\"贯\",\"殊\",\"释\",\"词\",\"亡\",\"壁\",\"顿\",\"宝\",\"午\",\"尘\",\"闻\",\"揭\",\"炮\",\"残\",\"冬\",\"桥\",\"妇\",\"警\",\"综\",\"招\",\"吴\",\"付\",\"浮\",\"遭\",\"徐\",\"您\",\"摇\",\"谷\",\"赞\",\"箱\",\"隔\",\"订\",\"男\",\"吹\",\"园\",\"纷\",\"唐\",\"败\",\"宋\",\"玻\",\"巨\",\"耕\",\"坦\",\"荣\",\"闭\",\"湾\",\"键\",\"凡\",\"驻\",\"锅\",\"救\",\"恩\",\"剥\",\"凝\",\"碱\",\"齿\",\"截\",\"炼\",\"麻\",\"纺\",\"禁\",\"废\",\"盛\",\"版\",\"缓\",\"净\",\"睛\",\"昌\",\"婚\",\"涉\",\"筒\",\"嘴\",\"插\",\"岸\",\"朗\",\"庄\",\"街\",\"藏\",\"姑\",\"贸\",\"腐\",\"奴\",\"啦\",\"惯\",\"乘\",\"伙\",\"恢\",\"匀\",\"纱\",\"扎\",\"辩\",\"耳\",\"彪\",\"臣\",\"亿\",\"璃\",\"抵\",\"脉\",\"秀\",\"萨\",\"俄\",\"网\",\"舞\",\"店\",\"喷\",\"纵\",\"寸\",\"汗\",\"挂\",\"洪\",\"贺\",\"闪\",\"柬\",\"爆\",\"烯\",\"津\",\"稻\",\"墙\",\"软\",\"勇\",\"像\",\"滚\",\"厘\",\"蒙\",\"芳\",\"肯\",\"坡\",\"柱\",\"荡\",\"腿\",\"仪\",\"旅\",\"尾\",\"轧\",\"冰\",\"贡\",\"登\",\"黎\",\"削\",\"钻\",\"勒\",\"逃\",\"障\",\"氨\",\"郭\",\"峰\",\"币\",\"港\",\"伏\",\"轨\",\"亩\",\"毕\",\"擦\",\"莫\",\"刺\",\"浪\",\"秘\",\"援\",\"株\",\"健\",\"售\",\"股\",\"岛\",\"甘\",\"泡\",\"睡\",\"童\",\"铸\",\"汤\",\"阀\",\"休\",\"汇\",\"舍\",\"牧\",\"绕\",\"炸\",\"哲\",\"磷\",\"绩\",\"朋\",\"淡\",\"尖\",\"启\",\"陷\",\"柴\",\"呈\",\"徒\",\"颜\",\"泪\",\"稍\",\"忘\",\"泵\",\"蓝\",\"拖\",\"洞\",\"授\",\"镜\",\"辛\",\"壮\",\"锋\",\"贫\",\"虚\",\"弯\",\"摩\",\"泰\",\"幼\",\"廷\",\"尊\",\"窗\",\"纲\",\"弄\",\"隶\",\"疑\",\"氏\",\"宫\",\"姐\",\"震\",\"瑞\",\"怪\",\"尤\",\"琴\",\"循\",\"描\",\"膜\",\"违\",\"夹\",\"腰\",\"缘\",\"珠\",\"穷\",\"森\",\"枝\",\"竹\",\"沟\",\"催\",\"绳\",\"忆\",\"邦\",\"剩\",\"幸\",\"浆\",\"栏\",\"拥\",\"牙\",\"贮\",\"礼\",\"滤\",\"钠\",\"纹\",\"罢\",\"拍\",\"咱\",\"喊\",\"袖\",\"埃\",\"勤\",\"罚\",\"焦\",\"潜\",\"伍\",\"墨\",\"欲\",\"缝\",\"姓\",\"刊\",\"饱\",\"仿\",\"奖\",\"铝\",\"鬼\",\"丽\",\"跨\",\"默\",\"挖\",\"链\",\"扫\",\"喝\",\"袋\",\"炭\",\"污\",\"幕\",\"诸\",\"弧\",\"励\",\"梅\",\"奶\",\"洁\",\"灾\",\"舟\",\"鉴\",\"苯\",\"讼\",\"抱\",\"毁\",\"懂\",\"寒\",\"智\",\"埔\",\"寄\",\"届\",\"跃\",\"渡\",\"挑\",\"丹\",\"艰\",\"贝\",\"碰\",\"拔\",\"爹\",\"戴\",\"码\",\"梦\",\"芽\",\"熔\",\"赤\",\"渔\",\"哭\",\"敬\",\"颗\",\"奔\",\"铅\",\"仲\",\"虎\",\"稀\",\"妹\",\"乏\",\"珍\",\"申\",\"桌\",\"遵\",\"允\",\"隆\",\"螺\",\"仓\",\"魏\",\"锐\",\"晓\",\"氮\",\"兼\",\"隐\",\"碍\",\"赫\",\"拨\",\"忠\",\"肃\",\"缸\",\"牵\",\"抢\",\"博\",\"巧\",\"壳\",\"兄\",\"杜\",\"讯\",\"诚\",\"碧\",\"祥\",\"柯\",\"页\",\"巡\",\"矩\",\"悲\",\"灌\",\"龄\",\"伦\",\"票\",\"寻\",\"桂\",\"铺\",\"圣\",\"恐\",\"恰\",\"郑\",\"趣\",\"抬\",\"荒\",\"腾\",\"贴\",\"柔\",\"滴\",\"猛\",\"阔\",\"辆\",\"妻\",\"填\",\"撤\",\"储\",\"签\",\"闹\",\"扰\",\"紫\",\"砂\",\"递\",\"戏\",\"吊\",\"陶\",\"伐\",\"喂\",\"疗\",\"瓶\",\"婆\",\"抚\",\"臂\",\"摸\",\"忍\",\"虾\",\"蜡\",\"邻\",\"胸\",\"巩\",\"挤\",\"偶\",\"弃\",\"槽\",\"劲\",\"乳\",\"邓\",\"吉\",\"仁\",\"烂\",\"砖\",\"租\",\"乌\",\"舰\",\"伴\",\"瓜\",\"浅\",\"丙\",\"暂\",\"燥\",\"橡\",\"柳\",\"迷\",\"暖\",\"牌\",\"秧\",\"胆\",\"详\",\"簧\",\"踏\",\"瓷\",\"谱\",\"呆\",\"宾\",\"糊\",\"洛\",\"辉\",\"愤\",\"竞\",\"隙\",\"怒\",\"粘\",\"乃\",\"绪\",\"肩\",\"籍\",\"敏\",\"涂\",\"熙\",\"皆\",\"侦\",\"悬\",\"掘\",\"享\",\"纠\",\"醒\",\"狂\",\"锁\",\"淀\",\"恨\",\"牲\",\"霸\",\"爬\",\"赏\",\"逆\",\"玩\",\"陵\",\"祝\",\"秒\",\"浙\",\"貌\",\"役\",\"彼\",\"悉\",\"鸭\",\"趋\",\"凤\",\"晨\",\"畜\",\"辈\",\"秩\",\"卵\",\"署\",\"梯\",\"炎\",\"滩\",\"棋\",\"驱\",\"筛\",\"峡\",\"冒\",\"啥\",\"寿\",\"译\",\"浸\",\"泉\",\"帽\",\"迟\",\"硅\",\"疆\",\"贷\",\"漏\",\"稿\",\"冠\",\"嫩\",\"胁\",\"芯\",\"牢\",\"叛\",\"蚀\",\"奥\",\"鸣\",\"岭\",\"羊\",\"凭\",\"串\",\"塘\",\"绘\",\"酵\",\"融\",\"盆\",\"锡\",\"庙\",\"筹\",\"冻\",\"辅\",\"摄\",\"袭\",\"筋\",\"拒\",\"僚\",\"旱\",\"钾\",\"鸟\",\"漆\",\"沈\",\"眉\",\"疏\",\"添\",\"棒\",\"穗\",\"硝\",\"韩\",\"逼\",\"扭\",\"侨\",\"凉\",\"挺\",\"碗\",\"栽\",\"炒\",\"杯\",\"患\",\"馏\",\"劝\",\"豪\",\"辽\",\"勃\",\"鸿\",\"旦\",\"吏\",\"拜\",\"狗\",\"埋\",\"辊\",\"掩\",\"饮\",\"搬\",\"骂\",\"辞\",\"勾\",\"扣\",\"估\",\"蒋\",\"绒\",\"雾\",\"丈\",\"朵\",\"姆\",\"拟\",\"宇\",\"辑\",\"陕\",\"雕\",\"偿\",\"蓄\",\"崇\",\"剪\",\"倡\",\"厅\",\"咬\",\"驶\",\"薯\",\"刷\",\"斥\",\"番\",\"赋\",\"奉\",\"佛\",\"浇\",\"漫\",\"曼\",\"扇\",\"钙\",\"桃\",\"扶\",\"仔\",\"返\",\"俗\",\"亏\",\"腔\",\"鞋\",\"棱\",\"覆\",\"框\",\"悄\",\"叔\",\"撞\",\"骗\",\"勘\",\"旺\",\"沸\",\"孤\",\"吐\",\"孟\",\"渠\",\"屈\",\"疾\",\"妙\",\"惜\",\"仰\",\"狠\",\"胀\",\"谐\",\"抛\",\"霉\",\"桑\",\"岗\",\"嘛\",\"衰\",\"盗\",\"渗\",\"脏\",\"赖\",\"涌\",\"甜\",\"曹\",\"阅\",\"肌\",\"哩\",\"厉\",\"烃\",\"纬\",\"毅\",\"昨\",\"伪\",\"症\",\"煮\",\"叹\",\"钉\",\"搭\",\"茎\",\"笼\",\"酷\",\"偷\",\"弓\",\"锥\",\"恒\",\"杰\",\"坑\",\"鼻\",\"翼\",\"纶\",\"叙\",\"狱\",\"逮\",\"罐\",\"络\",\"棚\",\"抑\",\"膨\",\"蔬\",\"寺\",\"骤\",\"穆\",\"冶\",\"枯\",\"册\",\"尸\",\"凸\",\"绅\",\"坯\",\"牺\",\"焰\",\"轰\",\"欣\",\"晋\",\"瘦\",\"御\",\"锭\",\"锦\",\"丧\",\"旬\",\"锻\",\"垄\",\"搜\",\"扑\",\"邀\",\"亭\",\"酯\",\"迈\",\"舒\",\"脆\",\"酶\",\"闲\",\"忧\",\"酚\",\"顽\",\"羽\",\"涨\",\"卸\",\"仗\",\"陪\",\"辟\",\"惩\",\"杭\",\"姚\",\"肚\",\"捉\",\"飘\",\"漂\",\"昆\",\"欺\",\"吾\",\"郎\",\"烷\",\"汁\",\"呵\",\"饰\",\"萧\",\"雅\",\"邮\",\"迁\",\"燕\",\"撒\",\"姻\",\"赴\",\"宴\",\"烦\",\"债\",\"帐\",\"斑\",\"铃\",\"旨\",\"醇\",\"董\",\"饼\",\"雏\",\"姿\",\"拌\",\"傅\",\"腹\",\"妥\",\"揉\",\"贤\",\"拆\",\"歪\",\"葡\",\"胺\",\"丢\",\"浩\",\"徽\",\"昂\",\"垫\",\"挡\",\"览\",\"贪\",\"慰\",\"缴\",\"汪\",\"慌\",\"冯\",\"诺\",\"姜\",\"谊\",\"凶\",\"劣\",\"诬\",\"耀\",\"昏\",\"躺\",\"盈\",\"骑\",\"乔\",\"溪\",\"丛\",\"卢\",\"抹\",\"闷\",\"咨\",\"刮\",\"驾\",\"缆\",\"悟\",\"摘\",\"铒\",\"掷\",\"颇\",\"幻\",\"柄\",\"惠\",\"惨\",\"佳\",\"仇\",\"腊\",\"窝\",\"涤\",\"剑\",\"瞧\",\"堡\",\"泼\",\"葱\",\"罩\",\"霍\",\"捞\",\"胎\",\"苍\",\"滨\",\"俩\",\"捅\",\"湘\",\"砍\",\"霞\",\"邵\",\"萄\",\"疯\",\"淮\",\"遂\",\"熊\",\"粪\",\"烘\",\"宿\",\"档\",\"戈\",\"驳\",\"嫂\",\"裕\",\"徙\",\"箭\",\"捐\",\"肠\",\"撑\",\"晒\",\"辨\",\"殿\",\"莲\",\"摊\",\"搅\",\"酱\",\"屏\",\"疫\",\"哀\",\"蔡\",\"堵\",\"沫\",\"皱\",\"畅\",\"叠\",\"阁\",\"莱\",\"敲\",\"辖\",\"钩\",\"痕\",\"坝\",\"巷\",\"饿\",\"祸\",\"丘\",\"玄\",\"溜\",\"曰\",\"逻\",\"彭\",\"尝\",\"卿\",\"妨\",\"艇\",\"吞\",\"韦\",\"怨\",\"矮\",\"歇\"]");

const require$$2 = /* #__PURE__ */ JSON.parse("[\"的\",\"一\",\"是\",\"在\",\"不\",\"了\",\"有\",\"和\",\"人\",\"這\",\"中\",\"大\",\"為\",\"上\",\"個\",\"國\",\"我\",\"以\",\"要\",\"他\",\"時\",\"來\",\"用\",\"們\",\"生\",\"到\",\"作\",\"地\",\"於\",\"出\",\"就\",\"分\",\"對\",\"成\",\"會\",\"可\",\"主\",\"發\",\"年\",\"動\",\"同\",\"工\",\"也\",\"能\",\"下\",\"過\",\"子\",\"說\",\"產\",\"種\",\"面\",\"而\",\"方\",\"後\",\"多\",\"定\",\"行\",\"學\",\"法\",\"所\",\"民\",\"得\",\"經\",\"十\",\"三\",\"之\",\"進\",\"著\",\"等\",\"部\",\"度\",\"家\",\"電\",\"力\",\"裡\",\"如\",\"水\",\"化\",\"高\",\"自\",\"二\",\"理\",\"起\",\"小\",\"物\",\"現\",\"實\",\"加\",\"量\",\"都\",\"兩\",\"體\",\"制\",\"機\",\"當\",\"使\",\"點\",\"從\",\"業\",\"本\",\"去\",\"把\",\"性\",\"好\",\"應\",\"開\",\"它\",\"合\",\"還\",\"因\",\"由\",\"其\",\"些\",\"然\",\"前\",\"外\",\"天\",\"政\",\"四\",\"日\",\"那\",\"社\",\"義\",\"事\",\"平\",\"形\",\"相\",\"全\",\"表\",\"間\",\"樣\",\"與\",\"關\",\"各\",\"重\",\"新\",\"線\",\"內\",\"數\",\"正\",\"心\",\"反\",\"你\",\"明\",\"看\",\"原\",\"又\",\"麼\",\"利\",\"比\",\"或\",\"但\",\"質\",\"氣\",\"第\",\"向\",\"道\",\"命\",\"此\",\"變\",\"條\",\"只\",\"沒\",\"結\",\"解\",\"問\",\"意\",\"建\",\"月\",\"公\",\"無\",\"系\",\"軍\",\"很\",\"情\",\"者\",\"最\",\"立\",\"代\",\"想\",\"已\",\"通\",\"並\",\"提\",\"直\",\"題\",\"黨\",\"程\",\"展\",\"五\",\"果\",\"料\",\"象\",\"員\",\"革\",\"位\",\"入\",\"常\",\"文\",\"總\",\"次\",\"品\",\"式\",\"活\",\"設\",\"及\",\"管\",\"特\",\"件\",\"長\",\"求\",\"老\",\"頭\",\"基\",\"資\",\"邊\",\"流\",\"路\",\"級\",\"少\",\"圖\",\"山\",\"統\",\"接\",\"知\",\"較\",\"將\",\"組\",\"見\",\"計\",\"別\",\"她\",\"手\",\"角\",\"期\",\"根\",\"論\",\"運\",\"農\",\"指\",\"幾\",\"九\",\"區\",\"強\",\"放\",\"決\",\"西\",\"被\",\"幹\",\"做\",\"必\",\"戰\",\"先\",\"回\",\"則\",\"任\",\"取\",\"據\",\"處\",\"隊\",\"南\",\"給\",\"色\",\"光\",\"門\",\"即\",\"保\",\"治\",\"北\",\"造\",\"百\",\"規\",\"熱\",\"領\",\"七\",\"海\",\"口\",\"東\",\"導\",\"器\",\"壓\",\"志\",\"世\",\"金\",\"增\",\"爭\",\"濟\",\"階\",\"油\",\"思\",\"術\",\"極\",\"交\",\"受\",\"聯\",\"什\",\"認\",\"六\",\"共\",\"權\",\"收\",\"證\",\"改\",\"清\",\"美\",\"再\",\"採\",\"轉\",\"更\",\"單\",\"風\",\"切\",\"打\",\"白\",\"教\",\"速\",\"花\",\"帶\",\"安\",\"場\",\"身\",\"車\",\"例\",\"真\",\"務\",\"具\",\"萬\",\"每\",\"目\",\"至\",\"達\",\"走\",\"積\",\"示\",\"議\",\"聲\",\"報\",\"鬥\",\"完\",\"類\",\"八\",\"離\",\"華\",\"名\",\"確\",\"才\",\"科\",\"張\",\"信\",\"馬\",\"節\",\"話\",\"米\",\"整\",\"空\",\"元\",\"況\",\"今\",\"集\",\"溫\",\"傳\",\"土\",\"許\",\"步\",\"群\",\"廣\",\"石\",\"記\",\"需\",\"段\",\"研\",\"界\",\"拉\",\"林\",\"律\",\"叫\",\"且\",\"究\",\"觀\",\"越\",\"織\",\"裝\",\"影\",\"算\",\"低\",\"持\",\"音\",\"眾\",\"書\",\"布\",\"复\",\"容\",\"兒\",\"須\",\"際\",\"商\",\"非\",\"驗\",\"連\",\"斷\",\"深\",\"難\",\"近\",\"礦\",\"千\",\"週\",\"委\",\"素\",\"技\",\"備\",\"半\",\"辦\",\"青\",\"省\",\"列\",\"習\",\"響\",\"約\",\"支\",\"般\",\"史\",\"感\",\"勞\",\"便\",\"團\",\"往\",\"酸\",\"歷\",\"市\",\"克\",\"何\",\"除\",\"消\",\"構\",\"府\",\"稱\",\"太\",\"準\",\"精\",\"值\",\"號\",\"率\",\"族\",\"維\",\"劃\",\"選\",\"標\",\"寫\",\"存\",\"候\",\"毛\",\"親\",\"快\",\"效\",\"斯\",\"院\",\"查\",\"江\",\"型\",\"眼\",\"王\",\"按\",\"格\",\"養\",\"易\",\"置\",\"派\",\"層\",\"片\",\"始\",\"卻\",\"專\",\"狀\",\"育\",\"廠\",\"京\",\"識\",\"適\",\"屬\",\"圓\",\"包\",\"火\",\"住\",\"調\",\"滿\",\"縣\",\"局\",\"照\",\"參\",\"紅\",\"細\",\"引\",\"聽\",\"該\",\"鐵\",\"價\",\"嚴\",\"首\",\"底\",\"液\",\"官\",\"德\",\"隨\",\"病\",\"蘇\",\"失\",\"爾\",\"死\",\"講\",\"配\",\"女\",\"黃\",\"推\",\"顯\",\"談\",\"罪\",\"神\",\"藝\",\"呢\",\"席\",\"含\",\"企\",\"望\",\"密\",\"批\",\"營\",\"項\",\"防\",\"舉\",\"球\",\"英\",\"氧\",\"勢\",\"告\",\"李\",\"台\",\"落\",\"木\",\"幫\",\"輪\",\"破\",\"亞\",\"師\",\"圍\",\"注\",\"遠\",\"字\",\"材\",\"排\",\"供\",\"河\",\"態\",\"封\",\"另\",\"施\",\"減\",\"樹\",\"溶\",\"怎\",\"止\",\"案\",\"言\",\"士\",\"均\",\"武\",\"固\",\"葉\",\"魚\",\"波\",\"視\",\"僅\",\"費\",\"緊\",\"愛\",\"左\",\"章\",\"早\",\"朝\",\"害\",\"續\",\"輕\",\"服\",\"試\",\"食\",\"充\",\"兵\",\"源\",\"判\",\"護\",\"司\",\"足\",\"某\",\"練\",\"差\",\"致\",\"板\",\"田\",\"降\",\"黑\",\"犯\",\"負\",\"擊\",\"范\",\"繼\",\"興\",\"似\",\"餘\",\"堅\",\"曲\",\"輸\",\"修\",\"故\",\"城\",\"夫\",\"夠\",\"送\",\"筆\",\"船\",\"佔\",\"右\",\"財\",\"吃\",\"富\",\"春\",\"職\",\"覺\",\"漢\",\"畫\",\"功\",\"巴\",\"跟\",\"雖\",\"雜\",\"飛\",\"檢\",\"吸\",\"助\",\"昇\",\"陽\",\"互\",\"初\",\"創\",\"抗\",\"考\",\"投\",\"壞\",\"策\",\"古\",\"徑\",\"換\",\"未\",\"跑\",\"留\",\"鋼\",\"曾\",\"端\",\"責\",\"站\",\"簡\",\"述\",\"錢\",\"副\",\"盡\",\"帝\",\"射\",\"草\",\"衝\",\"承\",\"獨\",\"令\",\"限\",\"阿\",\"宣\",\"環\",\"雙\",\"請\",\"超\",\"微\",\"讓\",\"控\",\"州\",\"良\",\"軸\",\"找\",\"否\",\"紀\",\"益\",\"依\",\"優\",\"頂\",\"礎\",\"載\",\"倒\",\"房\",\"突\",\"坐\",\"粉\",\"敵\",\"略\",\"客\",\"袁\",\"冷\",\"勝\",\"絕\",\"析\",\"塊\",\"劑\",\"測\",\"絲\",\"協\",\"訴\",\"念\",\"陳\",\"仍\",\"羅\",\"鹽\",\"友\",\"洋\",\"錯\",\"苦\",\"夜\",\"刑\",\"移\",\"頻\",\"逐\",\"靠\",\"混\",\"母\",\"短\",\"皮\",\"終\",\"聚\",\"汽\",\"村\",\"雲\",\"哪\",\"既\",\"距\",\"衛\",\"停\",\"烈\",\"央\",\"察\",\"燒\",\"迅\",\"境\",\"若\",\"印\",\"洲\",\"刻\",\"括\",\"激\",\"孔\",\"搞\",\"甚\",\"室\",\"待\",\"核\",\"校\",\"散\",\"侵\",\"吧\",\"甲\",\"遊\",\"久\",\"菜\",\"味\",\"舊\",\"模\",\"湖\",\"貨\",\"損\",\"預\",\"阻\",\"毫\",\"普\",\"穩\",\"乙\",\"媽\",\"植\",\"息\",\"擴\",\"銀\",\"語\",\"揮\",\"酒\",\"守\",\"拿\",\"序\",\"紙\",\"醫\",\"缺\",\"雨\",\"嗎\",\"針\",\"劉\",\"啊\",\"急\",\"唱\",\"誤\",\"訓\",\"願\",\"審\",\"附\",\"獲\",\"茶\",\"鮮\",\"糧\",\"斤\",\"孩\",\"脫\",\"硫\",\"肥\",\"善\",\"龍\",\"演\",\"父\",\"漸\",\"血\",\"歡\",\"械\",\"掌\",\"歌\",\"沙\",\"剛\",\"攻\",\"謂\",\"盾\",\"討\",\"晚\",\"粒\",\"亂\",\"燃\",\"矛\",\"乎\",\"殺\",\"藥\",\"寧\",\"魯\",\"貴\",\"鐘\",\"煤\",\"讀\",\"班\",\"伯\",\"香\",\"介\",\"迫\",\"句\",\"豐\",\"培\",\"握\",\"蘭\",\"擔\",\"弦\",\"蛋\",\"沉\",\"假\",\"穿\",\"執\",\"答\",\"樂\",\"誰\",\"順\",\"煙\",\"縮\",\"徵\",\"臉\",\"喜\",\"松\",\"腳\",\"困\",\"異\",\"免\",\"背\",\"星\",\"福\",\"買\",\"染\",\"井\",\"概\",\"慢\",\"怕\",\"磁\",\"倍\",\"祖\",\"皇\",\"促\",\"靜\",\"補\",\"評\",\"翻\",\"肉\",\"踐\",\"尼\",\"衣\",\"寬\",\"揚\",\"棉\",\"希\",\"傷\",\"操\",\"垂\",\"秋\",\"宜\",\"氫\",\"套\",\"督\",\"振\",\"架\",\"亮\",\"末\",\"憲\",\"慶\",\"編\",\"牛\",\"觸\",\"映\",\"雷\",\"銷\",\"詩\",\"座\",\"居\",\"抓\",\"裂\",\"胞\",\"呼\",\"娘\",\"景\",\"威\",\"綠\",\"晶\",\"厚\",\"盟\",\"衡\",\"雞\",\"孫\",\"延\",\"危\",\"膠\",\"屋\",\"鄉\",\"臨\",\"陸\",\"顧\",\"掉\",\"呀\",\"燈\",\"歲\",\"措\",\"束\",\"耐\",\"劇\",\"玉\",\"趙\",\"跳\",\"哥\",\"季\",\"課\",\"凱\",\"胡\",\"額\",\"款\",\"紹\",\"卷\",\"齊\",\"偉\",\"蒸\",\"殖\",\"永\",\"宗\",\"苗\",\"川\",\"爐\",\"岩\",\"弱\",\"零\",\"楊\",\"奏\",\"沿\",\"露\",\"桿\",\"探\",\"滑\",\"鎮\",\"飯\",\"濃\",\"航\",\"懷\",\"趕\",\"庫\",\"奪\",\"伊\",\"靈\",\"稅\",\"途\",\"滅\",\"賽\",\"歸\",\"召\",\"鼓\",\"播\",\"盤\",\"裁\",\"險\",\"康\",\"唯\",\"錄\",\"菌\",\"純\",\"借\",\"糖\",\"蓋\",\"橫\",\"符\",\"私\",\"努\",\"堂\",\"域\",\"槍\",\"潤\",\"幅\",\"哈\",\"竟\",\"熟\",\"蟲\",\"澤\",\"腦\",\"壤\",\"碳\",\"歐\",\"遍\",\"側\",\"寨\",\"敢\",\"徹\",\"慮\",\"斜\",\"薄\",\"庭\",\"納\",\"彈\",\"飼\",\"伸\",\"折\",\"麥\",\"濕\",\"暗\",\"荷\",\"瓦\",\"塞\",\"床\",\"築\",\"惡\",\"戶\",\"訪\",\"塔\",\"奇\",\"透\",\"梁\",\"刀\",\"旋\",\"跡\",\"卡\",\"氯\",\"遇\",\"份\",\"毒\",\"泥\",\"退\",\"洗\",\"擺\",\"灰\",\"彩\",\"賣\",\"耗\",\"夏\",\"擇\",\"忙\",\"銅\",\"獻\",\"硬\",\"予\",\"繁\",\"圈\",\"雪\",\"函\",\"亦\",\"抽\",\"篇\",\"陣\",\"陰\",\"丁\",\"尺\",\"追\",\"堆\",\"雄\",\"迎\",\"泛\",\"爸\",\"樓\",\"避\",\"謀\",\"噸\",\"野\",\"豬\",\"旗\",\"累\",\"偏\",\"典\",\"館\",\"索\",\"秦\",\"脂\",\"潮\",\"爺\",\"豆\",\"忽\",\"托\",\"驚\",\"塑\",\"遺\",\"愈\",\"朱\",\"替\",\"纖\",\"粗\",\"傾\",\"尚\",\"痛\",\"楚\",\"謝\",\"奮\",\"購\",\"磨\",\"君\",\"池\",\"旁\",\"碎\",\"骨\",\"監\",\"捕\",\"弟\",\"暴\",\"割\",\"貫\",\"殊\",\"釋\",\"詞\",\"亡\",\"壁\",\"頓\",\"寶\",\"午\",\"塵\",\"聞\",\"揭\",\"炮\",\"殘\",\"冬\",\"橋\",\"婦\",\"警\",\"綜\",\"招\",\"吳\",\"付\",\"浮\",\"遭\",\"徐\",\"您\",\"搖\",\"谷\",\"贊\",\"箱\",\"隔\",\"訂\",\"男\",\"吹\",\"園\",\"紛\",\"唐\",\"敗\",\"宋\",\"玻\",\"巨\",\"耕\",\"坦\",\"榮\",\"閉\",\"灣\",\"鍵\",\"凡\",\"駐\",\"鍋\",\"救\",\"恩\",\"剝\",\"凝\",\"鹼\",\"齒\",\"截\",\"煉\",\"麻\",\"紡\",\"禁\",\"廢\",\"盛\",\"版\",\"緩\",\"淨\",\"睛\",\"昌\",\"婚\",\"涉\",\"筒\",\"嘴\",\"插\",\"岸\",\"朗\",\"莊\",\"街\",\"藏\",\"姑\",\"貿\",\"腐\",\"奴\",\"啦\",\"慣\",\"乘\",\"夥\",\"恢\",\"勻\",\"紗\",\"扎\",\"辯\",\"耳\",\"彪\",\"臣\",\"億\",\"璃\",\"抵\",\"脈\",\"秀\",\"薩\",\"俄\",\"網\",\"舞\",\"店\",\"噴\",\"縱\",\"寸\",\"汗\",\"掛\",\"洪\",\"賀\",\"閃\",\"柬\",\"爆\",\"烯\",\"津\",\"稻\",\"牆\",\"軟\",\"勇\",\"像\",\"滾\",\"厘\",\"蒙\",\"芳\",\"肯\",\"坡\",\"柱\",\"盪\",\"腿\",\"儀\",\"旅\",\"尾\",\"軋\",\"冰\",\"貢\",\"登\",\"黎\",\"削\",\"鑽\",\"勒\",\"逃\",\"障\",\"氨\",\"郭\",\"峰\",\"幣\",\"港\",\"伏\",\"軌\",\"畝\",\"畢\",\"擦\",\"莫\",\"刺\",\"浪\",\"秘\",\"援\",\"株\",\"健\",\"售\",\"股\",\"島\",\"甘\",\"泡\",\"睡\",\"童\",\"鑄\",\"湯\",\"閥\",\"休\",\"匯\",\"舍\",\"牧\",\"繞\",\"炸\",\"哲\",\"磷\",\"績\",\"朋\",\"淡\",\"尖\",\"啟\",\"陷\",\"柴\",\"呈\",\"徒\",\"顏\",\"淚\",\"稍\",\"忘\",\"泵\",\"藍\",\"拖\",\"洞\",\"授\",\"鏡\",\"辛\",\"壯\",\"鋒\",\"貧\",\"虛\",\"彎\",\"摩\",\"泰\",\"幼\",\"廷\",\"尊\",\"窗\",\"綱\",\"弄\",\"隸\",\"疑\",\"氏\",\"宮\",\"姐\",\"震\",\"瑞\",\"怪\",\"尤\",\"琴\",\"循\",\"描\",\"膜\",\"違\",\"夾\",\"腰\",\"緣\",\"珠\",\"窮\",\"森\",\"枝\",\"竹\",\"溝\",\"催\",\"繩\",\"憶\",\"邦\",\"剩\",\"幸\",\"漿\",\"欄\",\"擁\",\"牙\",\"貯\",\"禮\",\"濾\",\"鈉\",\"紋\",\"罷\",\"拍\",\"咱\",\"喊\",\"袖\",\"埃\",\"勤\",\"罰\",\"焦\",\"潛\",\"伍\",\"墨\",\"欲\",\"縫\",\"姓\",\"刊\",\"飽\",\"仿\",\"獎\",\"鋁\",\"鬼\",\"麗\",\"跨\",\"默\",\"挖\",\"鏈\",\"掃\",\"喝\",\"袋\",\"炭\",\"污\",\"幕\",\"諸\",\"弧\",\"勵\",\"梅\",\"奶\",\"潔\",\"災\",\"舟\",\"鑑\",\"苯\",\"訟\",\"抱\",\"毀\",\"懂\",\"寒\",\"智\",\"埔\",\"寄\",\"屆\",\"躍\",\"渡\",\"挑\",\"丹\",\"艱\",\"貝\",\"碰\",\"拔\",\"爹\",\"戴\",\"碼\",\"夢\",\"芽\",\"熔\",\"赤\",\"漁\",\"哭\",\"敬\",\"顆\",\"奔\",\"鉛\",\"仲\",\"虎\",\"稀\",\"妹\",\"乏\",\"珍\",\"申\",\"桌\",\"遵\",\"允\",\"隆\",\"螺\",\"倉\",\"魏\",\"銳\",\"曉\",\"氮\",\"兼\",\"隱\",\"礙\",\"赫\",\"撥\",\"忠\",\"肅\",\"缸\",\"牽\",\"搶\",\"博\",\"巧\",\"殼\",\"兄\",\"杜\",\"訊\",\"誠\",\"碧\",\"祥\",\"柯\",\"頁\",\"巡\",\"矩\",\"悲\",\"灌\",\"齡\",\"倫\",\"票\",\"尋\",\"桂\",\"鋪\",\"聖\",\"恐\",\"恰\",\"鄭\",\"趣\",\"抬\",\"荒\",\"騰\",\"貼\",\"柔\",\"滴\",\"猛\",\"闊\",\"輛\",\"妻\",\"填\",\"撤\",\"儲\",\"簽\",\"鬧\",\"擾\",\"紫\",\"砂\",\"遞\",\"戲\",\"吊\",\"陶\",\"伐\",\"餵\",\"療\",\"瓶\",\"婆\",\"撫\",\"臂\",\"摸\",\"忍\",\"蝦\",\"蠟\",\"鄰\",\"胸\",\"鞏\",\"擠\",\"偶\",\"棄\",\"槽\",\"勁\",\"乳\",\"鄧\",\"吉\",\"仁\",\"爛\",\"磚\",\"租\",\"烏\",\"艦\",\"伴\",\"瓜\",\"淺\",\"丙\",\"暫\",\"燥\",\"橡\",\"柳\",\"迷\",\"暖\",\"牌\",\"秧\",\"膽\",\"詳\",\"簧\",\"踏\",\"瓷\",\"譜\",\"呆\",\"賓\",\"糊\",\"洛\",\"輝\",\"憤\",\"競\",\"隙\",\"怒\",\"粘\",\"乃\",\"緒\",\"肩\",\"籍\",\"敏\",\"塗\",\"熙\",\"皆\",\"偵\",\"懸\",\"掘\",\"享\",\"糾\",\"醒\",\"狂\",\"鎖\",\"淀\",\"恨\",\"牲\",\"霸\",\"爬\",\"賞\",\"逆\",\"玩\",\"陵\",\"祝\",\"秒\",\"浙\",\"貌\",\"役\",\"彼\",\"悉\",\"鴨\",\"趨\",\"鳳\",\"晨\",\"畜\",\"輩\",\"秩\",\"卵\",\"署\",\"梯\",\"炎\",\"灘\",\"棋\",\"驅\",\"篩\",\"峽\",\"冒\",\"啥\",\"壽\",\"譯\",\"浸\",\"泉\",\"帽\",\"遲\",\"矽\",\"疆\",\"貸\",\"漏\",\"稿\",\"冠\",\"嫩\",\"脅\",\"芯\",\"牢\",\"叛\",\"蝕\",\"奧\",\"鳴\",\"嶺\",\"羊\",\"憑\",\"串\",\"塘\",\"繪\",\"酵\",\"融\",\"盆\",\"錫\",\"廟\",\"籌\",\"凍\",\"輔\",\"攝\",\"襲\",\"筋\",\"拒\",\"僚\",\"旱\",\"鉀\",\"鳥\",\"漆\",\"沈\",\"眉\",\"疏\",\"添\",\"棒\",\"穗\",\"硝\",\"韓\",\"逼\",\"扭\",\"僑\",\"涼\",\"挺\",\"碗\",\"栽\",\"炒\",\"杯\",\"患\",\"餾\",\"勸\",\"豪\",\"遼\",\"勃\",\"鴻\",\"旦\",\"吏\",\"拜\",\"狗\",\"埋\",\"輥\",\"掩\",\"飲\",\"搬\",\"罵\",\"辭\",\"勾\",\"扣\",\"估\",\"蔣\",\"絨\",\"霧\",\"丈\",\"朵\",\"姆\",\"擬\",\"宇\",\"輯\",\"陝\",\"雕\",\"償\",\"蓄\",\"崇\",\"剪\",\"倡\",\"廳\",\"咬\",\"駛\",\"薯\",\"刷\",\"斥\",\"番\",\"賦\",\"奉\",\"佛\",\"澆\",\"漫\",\"曼\",\"扇\",\"鈣\",\"桃\",\"扶\",\"仔\",\"返\",\"俗\",\"虧\",\"腔\",\"鞋\",\"棱\",\"覆\",\"框\",\"悄\",\"叔\",\"撞\",\"騙\",\"勘\",\"旺\",\"沸\",\"孤\",\"吐\",\"孟\",\"渠\",\"屈\",\"疾\",\"妙\",\"惜\",\"仰\",\"狠\",\"脹\",\"諧\",\"拋\",\"黴\",\"桑\",\"崗\",\"嘛\",\"衰\",\"盜\",\"滲\",\"臟\",\"賴\",\"湧\",\"甜\",\"曹\",\"閱\",\"肌\",\"哩\",\"厲\",\"烴\",\"緯\",\"毅\",\"昨\",\"偽\",\"症\",\"煮\",\"嘆\",\"釘\",\"搭\",\"莖\",\"籠\",\"酷\",\"偷\",\"弓\",\"錐\",\"恆\",\"傑\",\"坑\",\"鼻\",\"翼\",\"綸\",\"敘\",\"獄\",\"逮\",\"罐\",\"絡\",\"棚\",\"抑\",\"膨\",\"蔬\",\"寺\",\"驟\",\"穆\",\"冶\",\"枯\",\"冊\",\"屍\",\"凸\",\"紳\",\"坯\",\"犧\",\"焰\",\"轟\",\"欣\",\"晉\",\"瘦\",\"禦\",\"錠\",\"錦\",\"喪\",\"旬\",\"鍛\",\"壟\",\"搜\",\"撲\",\"邀\",\"亭\",\"酯\",\"邁\",\"舒\",\"脆\",\"酶\",\"閒\",\"憂\",\"酚\",\"頑\",\"羽\",\"漲\",\"卸\",\"仗\",\"陪\",\"闢\",\"懲\",\"杭\",\"姚\",\"肚\",\"捉\",\"飄\",\"漂\",\"昆\",\"欺\",\"吾\",\"郎\",\"烷\",\"汁\",\"呵\",\"飾\",\"蕭\",\"雅\",\"郵\",\"遷\",\"燕\",\"撒\",\"姻\",\"赴\",\"宴\",\"煩\",\"債\",\"帳\",\"斑\",\"鈴\",\"旨\",\"醇\",\"董\",\"餅\",\"雛\",\"姿\",\"拌\",\"傅\",\"腹\",\"妥\",\"揉\",\"賢\",\"拆\",\"歪\",\"葡\",\"胺\",\"丟\",\"浩\",\"徽\",\"昂\",\"墊\",\"擋\",\"覽\",\"貪\",\"慰\",\"繳\",\"汪\",\"慌\",\"馮\",\"諾\",\"姜\",\"誼\",\"兇\",\"劣\",\"誣\",\"耀\",\"昏\",\"躺\",\"盈\",\"騎\",\"喬\",\"溪\",\"叢\",\"盧\",\"抹\",\"悶\",\"諮\",\"刮\",\"駕\",\"纜\",\"悟\",\"摘\",\"鉺\",\"擲\",\"頗\",\"幻\",\"柄\",\"惠\",\"慘\",\"佳\",\"仇\",\"臘\",\"窩\",\"滌\",\"劍\",\"瞧\",\"堡\",\"潑\",\"蔥\",\"罩\",\"霍\",\"撈\",\"胎\",\"蒼\",\"濱\",\"倆\",\"捅\",\"湘\",\"砍\",\"霞\",\"邵\",\"萄\",\"瘋\",\"淮\",\"遂\",\"熊\",\"糞\",\"烘\",\"宿\",\"檔\",\"戈\",\"駁\",\"嫂\",\"裕\",\"徙\",\"箭\",\"捐\",\"腸\",\"撐\",\"曬\",\"辨\",\"殿\",\"蓮\",\"攤\",\"攪\",\"醬\",\"屏\",\"疫\",\"哀\",\"蔡\",\"堵\",\"沫\",\"皺\",\"暢\",\"疊\",\"閣\",\"萊\",\"敲\",\"轄\",\"鉤\",\"痕\",\"壩\",\"巷\",\"餓\",\"禍\",\"丘\",\"玄\",\"溜\",\"曰\",\"邏\",\"彭\",\"嘗\",\"卿\",\"妨\",\"艇\",\"吞\",\"韋\",\"怨\",\"矮\",\"歇\"]");

const require$$3 = /* #__PURE__ */ JSON.parse("[\"가격\",\"가끔\",\"가난\",\"가능\",\"가득\",\"가르침\",\"가뭄\",\"가방\",\"가상\",\"가슴\",\"가운데\",\"가을\",\"가이드\",\"가입\",\"가장\",\"가정\",\"가족\",\"가죽\",\"각오\",\"각자\",\"간격\",\"간부\",\"간섭\",\"간장\",\"간접\",\"간판\",\"갈등\",\"갈비\",\"갈색\",\"갈증\",\"감각\",\"감기\",\"감소\",\"감수성\",\"감자\",\"감정\",\"갑자기\",\"강남\",\"강당\",\"강도\",\"강력히\",\"강변\",\"강북\",\"강사\",\"강수량\",\"강아지\",\"강원도\",\"강의\",\"강제\",\"강조\",\"같이\",\"개구리\",\"개나리\",\"개방\",\"개별\",\"개선\",\"개성\",\"개인\",\"객관적\",\"거실\",\"거액\",\"거울\",\"거짓\",\"거품\",\"걱정\",\"건강\",\"건물\",\"건설\",\"건조\",\"건축\",\"걸음\",\"검사\",\"검토\",\"게시판\",\"게임\",\"겨울\",\"견해\",\"결과\",\"결국\",\"결론\",\"결석\",\"결승\",\"결심\",\"결정\",\"결혼\",\"경계\",\"경고\",\"경기\",\"경력\",\"경복궁\",\"경비\",\"경상도\",\"경영\",\"경우\",\"경쟁\",\"경제\",\"경주\",\"경찰\",\"경치\",\"경향\",\"경험\",\"계곡\",\"계단\",\"계란\",\"계산\",\"계속\",\"계약\",\"계절\",\"계층\",\"계획\",\"고객\",\"고구려\",\"고궁\",\"고급\",\"고등학생\",\"고무신\",\"고민\",\"고양이\",\"고장\",\"고전\",\"고집\",\"고춧가루\",\"고통\",\"고향\",\"곡식\",\"골목\",\"골짜기\",\"골프\",\"공간\",\"공개\",\"공격\",\"공군\",\"공급\",\"공기\",\"공동\",\"공무원\",\"공부\",\"공사\",\"공식\",\"공업\",\"공연\",\"공원\",\"공장\",\"공짜\",\"공책\",\"공통\",\"공포\",\"공항\",\"공휴일\",\"과목\",\"과일\",\"과장\",\"과정\",\"과학\",\"관객\",\"관계\",\"관광\",\"관념\",\"관람\",\"관련\",\"관리\",\"관습\",\"관심\",\"관점\",\"관찰\",\"광경\",\"광고\",\"광장\",\"광주\",\"괴로움\",\"굉장히\",\"교과서\",\"교문\",\"교복\",\"교실\",\"교양\",\"교육\",\"교장\",\"교직\",\"교통\",\"교환\",\"교훈\",\"구경\",\"구름\",\"구멍\",\"구별\",\"구분\",\"구석\",\"구성\",\"구속\",\"구역\",\"구입\",\"구청\",\"구체적\",\"국가\",\"국기\",\"국내\",\"국립\",\"국물\",\"국민\",\"국수\",\"국어\",\"국왕\",\"국적\",\"국제\",\"국회\",\"군대\",\"군사\",\"군인\",\"궁극적\",\"권리\",\"권위\",\"권투\",\"귀국\",\"귀신\",\"규정\",\"규칙\",\"균형\",\"그날\",\"그냥\",\"그늘\",\"그러나\",\"그룹\",\"그릇\",\"그림\",\"그제서야\",\"그토록\",\"극복\",\"극히\",\"근거\",\"근교\",\"근래\",\"근로\",\"근무\",\"근본\",\"근원\",\"근육\",\"근처\",\"글씨\",\"글자\",\"금강산\",\"금고\",\"금년\",\"금메달\",\"금액\",\"금연\",\"금요일\",\"금지\",\"긍정적\",\"기간\",\"기관\",\"기념\",\"기능\",\"기독교\",\"기둥\",\"기록\",\"기름\",\"기법\",\"기본\",\"기분\",\"기쁨\",\"기숙사\",\"기술\",\"기억\",\"기업\",\"기온\",\"기운\",\"기원\",\"기적\",\"기준\",\"기침\",\"기혼\",\"기획\",\"긴급\",\"긴장\",\"길이\",\"김밥\",\"김치\",\"김포공항\",\"깍두기\",\"깜빡\",\"깨달음\",\"깨소금\",\"껍질\",\"꼭대기\",\"꽃잎\",\"나들이\",\"나란히\",\"나머지\",\"나물\",\"나침반\",\"나흘\",\"낙엽\",\"난방\",\"날개\",\"날씨\",\"날짜\",\"남녀\",\"남대문\",\"남매\",\"남산\",\"남자\",\"남편\",\"남학생\",\"낭비\",\"낱말\",\"내년\",\"내용\",\"내일\",\"냄비\",\"냄새\",\"냇물\",\"냉동\",\"냉면\",\"냉방\",\"냉장고\",\"넥타이\",\"넷째\",\"노동\",\"노란색\",\"노력\",\"노인\",\"녹음\",\"녹차\",\"녹화\",\"논리\",\"논문\",\"논쟁\",\"놀이\",\"농구\",\"농담\",\"농민\",\"농부\",\"농업\",\"농장\",\"농촌\",\"높이\",\"눈동자\",\"눈물\",\"눈썹\",\"뉴욕\",\"느낌\",\"늑대\",\"능동적\",\"능력\",\"다방\",\"다양성\",\"다음\",\"다이어트\",\"다행\",\"단계\",\"단골\",\"단독\",\"단맛\",\"단순\",\"단어\",\"단위\",\"단점\",\"단체\",\"단추\",\"단편\",\"단풍\",\"달걀\",\"달러\",\"달력\",\"달리\",\"닭고기\",\"담당\",\"담배\",\"담요\",\"담임\",\"답변\",\"답장\",\"당근\",\"당분간\",\"당연히\",\"당장\",\"대규모\",\"대낮\",\"대단히\",\"대답\",\"대도시\",\"대략\",\"대량\",\"대륙\",\"대문\",\"대부분\",\"대신\",\"대응\",\"대장\",\"대전\",\"대접\",\"대중\",\"대책\",\"대출\",\"대충\",\"대통령\",\"대학\",\"대한민국\",\"대합실\",\"대형\",\"덩어리\",\"데이트\",\"도대체\",\"도덕\",\"도둑\",\"도망\",\"도서관\",\"도심\",\"도움\",\"도입\",\"도자기\",\"도저히\",\"도전\",\"도중\",\"도착\",\"독감\",\"독립\",\"독서\",\"독일\",\"독창적\",\"동화책\",\"뒷모습\",\"뒷산\",\"딸아이\",\"마누라\",\"마늘\",\"마당\",\"마라톤\",\"마련\",\"마무리\",\"마사지\",\"마약\",\"마요네즈\",\"마을\",\"마음\",\"마이크\",\"마중\",\"마지막\",\"마찬가지\",\"마찰\",\"마흔\",\"막걸리\",\"막내\",\"막상\",\"만남\",\"만두\",\"만세\",\"만약\",\"만일\",\"만점\",\"만족\",\"만화\",\"많이\",\"말기\",\"말씀\",\"말투\",\"맘대로\",\"망원경\",\"매년\",\"매달\",\"매력\",\"매번\",\"매스컴\",\"매일\",\"매장\",\"맥주\",\"먹이\",\"먼저\",\"먼지\",\"멀리\",\"메일\",\"며느리\",\"며칠\",\"면담\",\"멸치\",\"명단\",\"명령\",\"명예\",\"명의\",\"명절\",\"명칭\",\"명함\",\"모금\",\"모니터\",\"모델\",\"모든\",\"모범\",\"모습\",\"모양\",\"모임\",\"모조리\",\"모집\",\"모퉁이\",\"목걸이\",\"목록\",\"목사\",\"목소리\",\"목숨\",\"목적\",\"목표\",\"몰래\",\"몸매\",\"몸무게\",\"몸살\",\"몸속\",\"몸짓\",\"몸통\",\"몹시\",\"무관심\",\"무궁화\",\"무더위\",\"무덤\",\"무릎\",\"무슨\",\"무엇\",\"무역\",\"무용\",\"무조건\",\"무지개\",\"무척\",\"문구\",\"문득\",\"문법\",\"문서\",\"문제\",\"문학\",\"문화\",\"물가\",\"물건\",\"물결\",\"물고기\",\"물론\",\"물리학\",\"물음\",\"물질\",\"물체\",\"미국\",\"미디어\",\"미사일\",\"미술\",\"미역\",\"미용실\",\"미움\",\"미인\",\"미팅\",\"미혼\",\"민간\",\"민족\",\"민주\",\"믿음\",\"밀가루\",\"밀리미터\",\"밑바닥\",\"바가지\",\"바구니\",\"바나나\",\"바늘\",\"바닥\",\"바닷가\",\"바람\",\"바이러스\",\"바탕\",\"박물관\",\"박사\",\"박수\",\"반대\",\"반드시\",\"반말\",\"반발\",\"반성\",\"반응\",\"반장\",\"반죽\",\"반지\",\"반찬\",\"받침\",\"발가락\",\"발걸음\",\"발견\",\"발달\",\"발레\",\"발목\",\"발바닥\",\"발생\",\"발음\",\"발자국\",\"발전\",\"발톱\",\"발표\",\"밤하늘\",\"밥그릇\",\"밥맛\",\"밥상\",\"밥솥\",\"방금\",\"방면\",\"방문\",\"방바닥\",\"방법\",\"방송\",\"방식\",\"방안\",\"방울\",\"방지\",\"방학\",\"방해\",\"방향\",\"배경\",\"배꼽\",\"배달\",\"배드민턴\",\"백두산\",\"백색\",\"백성\",\"백인\",\"백제\",\"백화점\",\"버릇\",\"버섯\",\"버튼\",\"번개\",\"번역\",\"번지\",\"번호\",\"벌금\",\"벌레\",\"벌써\",\"범위\",\"범인\",\"범죄\",\"법률\",\"법원\",\"법적\",\"법칙\",\"베이징\",\"벨트\",\"변경\",\"변동\",\"변명\",\"변신\",\"변호사\",\"변화\",\"별도\",\"별명\",\"별일\",\"병실\",\"병아리\",\"병원\",\"보관\",\"보너스\",\"보라색\",\"보람\",\"보름\",\"보상\",\"보안\",\"보자기\",\"보장\",\"보전\",\"보존\",\"보통\",\"보편적\",\"보험\",\"복도\",\"복사\",\"복숭아\",\"복습\",\"볶음\",\"본격적\",\"본래\",\"본부\",\"본사\",\"본성\",\"본인\",\"본질\",\"볼펜\",\"봉사\",\"봉지\",\"봉투\",\"부근\",\"부끄러움\",\"부담\",\"부동산\",\"부문\",\"부분\",\"부산\",\"부상\",\"부엌\",\"부인\",\"부작용\",\"부장\",\"부정\",\"부족\",\"부지런히\",\"부친\",\"부탁\",\"부품\",\"부회장\",\"북부\",\"북한\",\"분노\",\"분량\",\"분리\",\"분명\",\"분석\",\"분야\",\"분위기\",\"분필\",\"분홍색\",\"불고기\",\"불과\",\"불교\",\"불꽃\",\"불만\",\"불법\",\"불빛\",\"불안\",\"불이익\",\"불행\",\"브랜드\",\"비극\",\"비난\",\"비닐\",\"비둘기\",\"비디오\",\"비로소\",\"비만\",\"비명\",\"비밀\",\"비바람\",\"비빔밥\",\"비상\",\"비용\",\"비율\",\"비중\",\"비타민\",\"비판\",\"빌딩\",\"빗물\",\"빗방울\",\"빗줄기\",\"빛깔\",\"빨간색\",\"빨래\",\"빨리\",\"사건\",\"사계절\",\"사나이\",\"사냥\",\"사람\",\"사랑\",\"사립\",\"사모님\",\"사물\",\"사방\",\"사상\",\"사생활\",\"사설\",\"사슴\",\"사실\",\"사업\",\"사용\",\"사월\",\"사장\",\"사전\",\"사진\",\"사촌\",\"사춘기\",\"사탕\",\"사투리\",\"사흘\",\"산길\",\"산부인과\",\"산업\",\"산책\",\"살림\",\"살인\",\"살짝\",\"삼계탕\",\"삼국\",\"삼십\",\"삼월\",\"삼촌\",\"상관\",\"상금\",\"상대\",\"상류\",\"상반기\",\"상상\",\"상식\",\"상업\",\"상인\",\"상자\",\"상점\",\"상처\",\"상추\",\"상태\",\"상표\",\"상품\",\"상황\",\"새벽\",\"색깔\",\"색연필\",\"생각\",\"생명\",\"생물\",\"생방송\",\"생산\",\"생선\",\"생신\",\"생일\",\"생활\",\"서랍\",\"서른\",\"서명\",\"서민\",\"서비스\",\"서양\",\"서울\",\"서적\",\"서점\",\"서쪽\",\"서클\",\"석사\",\"석유\",\"선거\",\"선물\",\"선배\",\"선생\",\"선수\",\"선원\",\"선장\",\"선전\",\"선택\",\"선풍기\",\"설거지\",\"설날\",\"설렁탕\",\"설명\",\"설문\",\"설사\",\"설악산\",\"설치\",\"설탕\",\"섭씨\",\"성공\",\"성당\",\"성명\",\"성별\",\"성인\",\"성장\",\"성적\",\"성질\",\"성함\",\"세금\",\"세미나\",\"세상\",\"세월\",\"세종대왕\",\"세탁\",\"센터\",\"센티미터\",\"셋째\",\"소규모\",\"소극적\",\"소금\",\"소나기\",\"소년\",\"소득\",\"소망\",\"소문\",\"소설\",\"소속\",\"소아과\",\"소용\",\"소원\",\"소음\",\"소중히\",\"소지품\",\"소질\",\"소풍\",\"소형\",\"속담\",\"속도\",\"속옷\",\"손가락\",\"손길\",\"손녀\",\"손님\",\"손등\",\"손목\",\"손뼉\",\"손실\",\"손질\",\"손톱\",\"손해\",\"솔직히\",\"솜씨\",\"송아지\",\"송이\",\"송편\",\"쇠고기\",\"쇼핑\",\"수건\",\"수년\",\"수단\",\"수돗물\",\"수동적\",\"수면\",\"수명\",\"수박\",\"수상\",\"수석\",\"수술\",\"수시로\",\"수업\",\"수염\",\"수영\",\"수입\",\"수준\",\"수집\",\"수출\",\"수컷\",\"수필\",\"수학\",\"수험생\",\"수화기\",\"숙녀\",\"숙소\",\"숙제\",\"순간\",\"순서\",\"순수\",\"순식간\",\"순위\",\"숟가락\",\"술병\",\"술집\",\"숫자\",\"스님\",\"스물\",\"스스로\",\"스승\",\"스웨터\",\"스위치\",\"스케이트\",\"스튜디오\",\"스트레스\",\"스포츠\",\"슬쩍\",\"슬픔\",\"습관\",\"습기\",\"승객\",\"승리\",\"승부\",\"승용차\",\"승진\",\"시각\",\"시간\",\"시골\",\"시금치\",\"시나리오\",\"시댁\",\"시리즈\",\"시멘트\",\"시민\",\"시부모\",\"시선\",\"시설\",\"시스템\",\"시아버지\",\"시어머니\",\"시월\",\"시인\",\"시일\",\"시작\",\"시장\",\"시절\",\"시점\",\"시중\",\"시즌\",\"시집\",\"시청\",\"시합\",\"시험\",\"식구\",\"식기\",\"식당\",\"식량\",\"식료품\",\"식물\",\"식빵\",\"식사\",\"식생활\",\"식초\",\"식탁\",\"식품\",\"신고\",\"신규\",\"신념\",\"신문\",\"신발\",\"신비\",\"신사\",\"신세\",\"신용\",\"신제품\",\"신청\",\"신체\",\"신화\",\"실감\",\"실내\",\"실력\",\"실례\",\"실망\",\"실수\",\"실습\",\"실시\",\"실장\",\"실정\",\"실질적\",\"실천\",\"실체\",\"실컷\",\"실태\",\"실패\",\"실험\",\"실현\",\"심리\",\"심부름\",\"심사\",\"심장\",\"심정\",\"심판\",\"쌍둥이\",\"씨름\",\"씨앗\",\"아가씨\",\"아나운서\",\"아드님\",\"아들\",\"아쉬움\",\"아스팔트\",\"아시아\",\"아울러\",\"아저씨\",\"아줌마\",\"아직\",\"아침\",\"아파트\",\"아프리카\",\"아픔\",\"아홉\",\"아흔\",\"악기\",\"악몽\",\"악수\",\"안개\",\"안경\",\"안과\",\"안내\",\"안녕\",\"안동\",\"안방\",\"안부\",\"안주\",\"알루미늄\",\"알코올\",\"암시\",\"암컷\",\"압력\",\"앞날\",\"앞문\",\"애인\",\"애정\",\"액수\",\"앨범\",\"야간\",\"야단\",\"야옹\",\"약간\",\"약국\",\"약속\",\"약수\",\"약점\",\"약품\",\"약혼녀\",\"양념\",\"양력\",\"양말\",\"양배추\",\"양주\",\"양파\",\"어둠\",\"어려움\",\"어른\",\"어젯밤\",\"어쨌든\",\"어쩌다가\",\"어쩐지\",\"언니\",\"언덕\",\"언론\",\"언어\",\"얼굴\",\"얼른\",\"얼음\",\"얼핏\",\"엄마\",\"업무\",\"업종\",\"업체\",\"엉덩이\",\"엉망\",\"엉터리\",\"엊그제\",\"에너지\",\"에어컨\",\"엔진\",\"여건\",\"여고생\",\"여관\",\"여군\",\"여권\",\"여대생\",\"여덟\",\"여동생\",\"여든\",\"여론\",\"여름\",\"여섯\",\"여성\",\"여왕\",\"여인\",\"여전히\",\"여직원\",\"여학생\",\"여행\",\"역사\",\"역시\",\"역할\",\"연결\",\"연구\",\"연극\",\"연기\",\"연락\",\"연설\",\"연세\",\"연속\",\"연습\",\"연애\",\"연예인\",\"연인\",\"연장\",\"연주\",\"연출\",\"연필\",\"연합\",\"연휴\",\"열기\",\"열매\",\"열쇠\",\"열심히\",\"열정\",\"열차\",\"열흘\",\"염려\",\"엽서\",\"영국\",\"영남\",\"영상\",\"영양\",\"영역\",\"영웅\",\"영원히\",\"영하\",\"영향\",\"영혼\",\"영화\",\"옆구리\",\"옆방\",\"옆집\",\"예감\",\"예금\",\"예방\",\"예산\",\"예상\",\"예선\",\"예술\",\"예습\",\"예식장\",\"예약\",\"예전\",\"예절\",\"예정\",\"예컨대\",\"옛날\",\"오늘\",\"오락\",\"오랫동안\",\"오렌지\",\"오로지\",\"오른발\",\"오븐\",\"오십\",\"오염\",\"오월\",\"오전\",\"오직\",\"오징어\",\"오페라\",\"오피스텔\",\"오히려\",\"옥상\",\"옥수수\",\"온갖\",\"온라인\",\"온몸\",\"온종일\",\"온통\",\"올가을\",\"올림픽\",\"올해\",\"옷차림\",\"와이셔츠\",\"와인\",\"완성\",\"완전\",\"왕비\",\"왕자\",\"왜냐하면\",\"왠지\",\"외갓집\",\"외국\",\"외로움\",\"외삼촌\",\"외출\",\"외침\",\"외할머니\",\"왼발\",\"왼손\",\"왼쪽\",\"요금\",\"요일\",\"요즘\",\"요청\",\"용기\",\"용서\",\"용어\",\"우산\",\"우선\",\"우승\",\"우연히\",\"우정\",\"우체국\",\"우편\",\"운동\",\"운명\",\"운반\",\"운전\",\"운행\",\"울산\",\"울음\",\"움직임\",\"웃어른\",\"웃음\",\"워낙\",\"원고\",\"원래\",\"원서\",\"원숭이\",\"원인\",\"원장\",\"원피스\",\"월급\",\"월드컵\",\"월세\",\"월요일\",\"웨이터\",\"위반\",\"위법\",\"위성\",\"위원\",\"위험\",\"위협\",\"윗사람\",\"유난히\",\"유럽\",\"유명\",\"유물\",\"유산\",\"유적\",\"유치원\",\"유학\",\"유행\",\"유형\",\"육군\",\"육상\",\"육십\",\"육체\",\"은행\",\"음력\",\"음료\",\"음반\",\"음성\",\"음식\",\"음악\",\"음주\",\"의견\",\"의논\",\"의문\",\"의복\",\"의식\",\"의심\",\"의외로\",\"의욕\",\"의원\",\"의학\",\"이것\",\"이곳\",\"이념\",\"이놈\",\"이달\",\"이대로\",\"이동\",\"이렇게\",\"이력서\",\"이론적\",\"이름\",\"이민\",\"이발소\",\"이별\",\"이불\",\"이빨\",\"이상\",\"이성\",\"이슬\",\"이야기\",\"이용\",\"이웃\",\"이월\",\"이윽고\",\"이익\",\"이전\",\"이중\",\"이튿날\",\"이틀\",\"이혼\",\"인간\",\"인격\",\"인공\",\"인구\",\"인근\",\"인기\",\"인도\",\"인류\",\"인물\",\"인생\",\"인쇄\",\"인연\",\"인원\",\"인재\",\"인종\",\"인천\",\"인체\",\"인터넷\",\"인하\",\"인형\",\"일곱\",\"일기\",\"일단\",\"일대\",\"일등\",\"일반\",\"일본\",\"일부\",\"일상\",\"일생\",\"일손\",\"일요일\",\"일월\",\"일정\",\"일종\",\"일주일\",\"일찍\",\"일체\",\"일치\",\"일행\",\"일회용\",\"임금\",\"임무\",\"입대\",\"입력\",\"입맛\",\"입사\",\"입술\",\"입시\",\"입원\",\"입장\",\"입학\",\"자가용\",\"자격\",\"자극\",\"자동\",\"자랑\",\"자부심\",\"자식\",\"자신\",\"자연\",\"자원\",\"자율\",\"자전거\",\"자정\",\"자존심\",\"자판\",\"작가\",\"작년\",\"작성\",\"작업\",\"작용\",\"작은딸\",\"작품\",\"잔디\",\"잔뜩\",\"잔치\",\"잘못\",\"잠깐\",\"잠수함\",\"잠시\",\"잠옷\",\"잠자리\",\"잡지\",\"장관\",\"장군\",\"장기간\",\"장래\",\"장례\",\"장르\",\"장마\",\"장면\",\"장모\",\"장미\",\"장비\",\"장사\",\"장소\",\"장식\",\"장애인\",\"장인\",\"장점\",\"장차\",\"장학금\",\"재능\",\"재빨리\",\"재산\",\"재생\",\"재작년\",\"재정\",\"재채기\",\"재판\",\"재학\",\"재활용\",\"저것\",\"저고리\",\"저곳\",\"저녁\",\"저런\",\"저렇게\",\"저번\",\"저울\",\"저절로\",\"저축\",\"적극\",\"적당히\",\"적성\",\"적용\",\"적응\",\"전개\",\"전공\",\"전기\",\"전달\",\"전라도\",\"전망\",\"전문\",\"전반\",\"전부\",\"전세\",\"전시\",\"전용\",\"전자\",\"전쟁\",\"전주\",\"전철\",\"전체\",\"전통\",\"전혀\",\"전후\",\"절대\",\"절망\",\"절반\",\"절약\",\"절차\",\"점검\",\"점수\",\"점심\",\"점원\",\"점점\",\"점차\",\"접근\",\"접시\",\"접촉\",\"젓가락\",\"정거장\",\"정도\",\"정류장\",\"정리\",\"정말\",\"정면\",\"정문\",\"정반대\",\"정보\",\"정부\",\"정비\",\"정상\",\"정성\",\"정오\",\"정원\",\"정장\",\"정지\",\"정치\",\"정확히\",\"제공\",\"제과점\",\"제대로\",\"제목\",\"제발\",\"제법\",\"제삿날\",\"제안\",\"제일\",\"제작\",\"제주도\",\"제출\",\"제품\",\"제한\",\"조각\",\"조건\",\"조금\",\"조깅\",\"조명\",\"조미료\",\"조상\",\"조선\",\"조용히\",\"조절\",\"조정\",\"조직\",\"존댓말\",\"존재\",\"졸업\",\"졸음\",\"종교\",\"종로\",\"종류\",\"종소리\",\"종업원\",\"종종\",\"종합\",\"좌석\",\"죄인\",\"주관적\",\"주름\",\"주말\",\"주머니\",\"주먹\",\"주문\",\"주민\",\"주방\",\"주변\",\"주식\",\"주인\",\"주일\",\"주장\",\"주전자\",\"주택\",\"준비\",\"줄거리\",\"줄기\",\"줄무늬\",\"중간\",\"중계방송\",\"중국\",\"중년\",\"중단\",\"중독\",\"중반\",\"중부\",\"중세\",\"중소기업\",\"중순\",\"중앙\",\"중요\",\"중학교\",\"즉석\",\"즉시\",\"즐거움\",\"증가\",\"증거\",\"증권\",\"증상\",\"증세\",\"지각\",\"지갑\",\"지경\",\"지극히\",\"지금\",\"지급\",\"지능\",\"지름길\",\"지리산\",\"지방\",\"지붕\",\"지식\",\"지역\",\"지우개\",\"지원\",\"지적\",\"지점\",\"지진\",\"지출\",\"직선\",\"직업\",\"직원\",\"직장\",\"진급\",\"진동\",\"진로\",\"진료\",\"진리\",\"진짜\",\"진찰\",\"진출\",\"진통\",\"진행\",\"질문\",\"질병\",\"질서\",\"짐작\",\"집단\",\"집안\",\"집중\",\"짜증\",\"찌꺼기\",\"차남\",\"차라리\",\"차량\",\"차림\",\"차별\",\"차선\",\"차츰\",\"착각\",\"찬물\",\"찬성\",\"참가\",\"참기름\",\"참새\",\"참석\",\"참여\",\"참외\",\"참조\",\"찻잔\",\"창가\",\"창고\",\"창구\",\"창문\",\"창밖\",\"창작\",\"창조\",\"채널\",\"채점\",\"책가방\",\"책방\",\"책상\",\"책임\",\"챔피언\",\"처벌\",\"처음\",\"천국\",\"천둥\",\"천장\",\"천재\",\"천천히\",\"철도\",\"철저히\",\"철학\",\"첫날\",\"첫째\",\"청년\",\"청바지\",\"청소\",\"청춘\",\"체계\",\"체력\",\"체온\",\"체육\",\"체중\",\"체험\",\"초등학생\",\"초반\",\"초밥\",\"초상화\",\"초순\",\"초여름\",\"초원\",\"초저녁\",\"초점\",\"초청\",\"초콜릿\",\"촛불\",\"총각\",\"총리\",\"총장\",\"촬영\",\"최근\",\"최상\",\"최선\",\"최신\",\"최악\",\"최종\",\"추석\",\"추억\",\"추진\",\"추천\",\"추측\",\"축구\",\"축소\",\"축제\",\"축하\",\"출근\",\"출발\",\"출산\",\"출신\",\"출연\",\"출입\",\"출장\",\"출판\",\"충격\",\"충고\",\"충돌\",\"충분히\",\"충청도\",\"취업\",\"취직\",\"취향\",\"치약\",\"친구\",\"친척\",\"칠십\",\"칠월\",\"칠판\",\"침대\",\"침묵\",\"침실\",\"칫솔\",\"칭찬\",\"카메라\",\"카운터\",\"칼국수\",\"캐릭터\",\"캠퍼스\",\"캠페인\",\"커튼\",\"컨디션\",\"컬러\",\"컴퓨터\",\"코끼리\",\"코미디\",\"콘서트\",\"콜라\",\"콤플렉스\",\"콩나물\",\"쾌감\",\"쿠데타\",\"크림\",\"큰길\",\"큰딸\",\"큰소리\",\"큰아들\",\"큰어머니\",\"큰일\",\"큰절\",\"클래식\",\"클럽\",\"킬로\",\"타입\",\"타자기\",\"탁구\",\"탁자\",\"탄생\",\"태권도\",\"태양\",\"태풍\",\"택시\",\"탤런트\",\"터널\",\"터미널\",\"테니스\",\"테스트\",\"테이블\",\"텔레비전\",\"토론\",\"토마토\",\"토요일\",\"통계\",\"통과\",\"통로\",\"통신\",\"통역\",\"통일\",\"통장\",\"통제\",\"통증\",\"통합\",\"통화\",\"퇴근\",\"퇴원\",\"퇴직금\",\"튀김\",\"트럭\",\"특급\",\"특별\",\"특성\",\"특수\",\"특징\",\"특히\",\"튼튼히\",\"티셔츠\",\"파란색\",\"파일\",\"파출소\",\"판결\",\"판단\",\"판매\",\"판사\",\"팔십\",\"팔월\",\"팝송\",\"패션\",\"팩스\",\"팩시밀리\",\"팬티\",\"퍼센트\",\"페인트\",\"편견\",\"편의\",\"편지\",\"편히\",\"평가\",\"평균\",\"평생\",\"평소\",\"평양\",\"평일\",\"평화\",\"포스터\",\"포인트\",\"포장\",\"포함\",\"표면\",\"표정\",\"표준\",\"표현\",\"품목\",\"품질\",\"풍경\",\"풍속\",\"풍습\",\"프랑스\",\"프린터\",\"플라스틱\",\"피곤\",\"피망\",\"피아노\",\"필름\",\"필수\",\"필요\",\"필자\",\"필통\",\"핑계\",\"하느님\",\"하늘\",\"하드웨어\",\"하룻밤\",\"하반기\",\"하숙집\",\"하순\",\"하여튼\",\"하지만\",\"하천\",\"하품\",\"하필\",\"학과\",\"학교\",\"학급\",\"학기\",\"학년\",\"학력\",\"학번\",\"학부모\",\"학비\",\"학생\",\"학술\",\"학습\",\"학용품\",\"학원\",\"학위\",\"학자\",\"학점\",\"한계\",\"한글\",\"한꺼번에\",\"한낮\",\"한눈\",\"한동안\",\"한때\",\"한라산\",\"한마디\",\"한문\",\"한번\",\"한복\",\"한식\",\"한여름\",\"한쪽\",\"할머니\",\"할아버지\",\"할인\",\"함께\",\"함부로\",\"합격\",\"합리적\",\"항공\",\"항구\",\"항상\",\"항의\",\"해결\",\"해군\",\"해답\",\"해당\",\"해물\",\"해석\",\"해설\",\"해수욕장\",\"해안\",\"핵심\",\"핸드백\",\"햄버거\",\"햇볕\",\"햇살\",\"행동\",\"행복\",\"행사\",\"행운\",\"행위\",\"향기\",\"향상\",\"향수\",\"허락\",\"허용\",\"헬기\",\"현관\",\"현금\",\"현대\",\"현상\",\"현실\",\"현장\",\"현재\",\"현지\",\"혈액\",\"협력\",\"형부\",\"형사\",\"형수\",\"형식\",\"형제\",\"형태\",\"형편\",\"혜택\",\"호기심\",\"호남\",\"호랑이\",\"호박\",\"호텔\",\"호흡\",\"혹시\",\"홀로\",\"홈페이지\",\"홍보\",\"홍수\",\"홍차\",\"화면\",\"화분\",\"화살\",\"화요일\",\"화장\",\"화학\",\"확보\",\"확인\",\"확장\",\"확정\",\"환갑\",\"환경\",\"환영\",\"환율\",\"환자\",\"활기\",\"활동\",\"활발히\",\"활용\",\"활짝\",\"회견\",\"회관\",\"회복\",\"회색\",\"회원\",\"회장\",\"회전\",\"횟수\",\"횡단보도\",\"효율적\",\"후반\",\"후춧가루\",\"훈련\",\"훨씬\",\"휴식\",\"휴일\",\"흉내\",\"흐름\",\"흑백\",\"흑인\",\"흔적\",\"흔히\",\"흥미\",\"흥분\",\"희곡\",\"희망\",\"희생\",\"흰색\",\"힘껏\"]");

const require$$4 = /* #__PURE__ */ JSON.parse("[\"abaisser\",\"abandon\",\"abdiquer\",\"abeille\",\"abolir\",\"aborder\",\"aboutir\",\"aboyer\",\"abrasif\",\"abreuver\",\"abriter\",\"abroger\",\"abrupt\",\"absence\",\"absolu\",\"absurde\",\"abusif\",\"abyssal\",\"académie\",\"acajou\",\"acarien\",\"accabler\",\"accepter\",\"acclamer\",\"accolade\",\"accroche\",\"accuser\",\"acerbe\",\"achat\",\"acheter\",\"aciduler\",\"acier\",\"acompte\",\"acquérir\",\"acronyme\",\"acteur\",\"actif\",\"actuel\",\"adepte\",\"adéquat\",\"adhésif\",\"adjectif\",\"adjuger\",\"admettre\",\"admirer\",\"adopter\",\"adorer\",\"adoucir\",\"adresse\",\"adroit\",\"adulte\",\"adverbe\",\"aérer\",\"aéronef\",\"affaire\",\"affecter\",\"affiche\",\"affreux\",\"affubler\",\"agacer\",\"agencer\",\"agile\",\"agiter\",\"agrafer\",\"agréable\",\"agrume\",\"aider\",\"aiguille\",\"ailier\",\"aimable\",\"aisance\",\"ajouter\",\"ajuster\",\"alarmer\",\"alchimie\",\"alerte\",\"algèbre\",\"algue\",\"aliéner\",\"aliment\",\"alléger\",\"alliage\",\"allouer\",\"allumer\",\"alourdir\",\"alpaga\",\"altesse\",\"alvéole\",\"amateur\",\"ambigu\",\"ambre\",\"aménager\",\"amertume\",\"amidon\",\"amiral\",\"amorcer\",\"amour\",\"amovible\",\"amphibie\",\"ampleur\",\"amusant\",\"analyse\",\"anaphore\",\"anarchie\",\"anatomie\",\"ancien\",\"anéantir\",\"angle\",\"angoisse\",\"anguleux\",\"animal\",\"annexer\",\"annonce\",\"annuel\",\"anodin\",\"anomalie\",\"anonyme\",\"anormal\",\"antenne\",\"antidote\",\"anxieux\",\"apaiser\",\"apéritif\",\"aplanir\",\"apologie\",\"appareil\",\"appeler\",\"apporter\",\"appuyer\",\"aquarium\",\"aqueduc\",\"arbitre\",\"arbuste\",\"ardeur\",\"ardoise\",\"argent\",\"arlequin\",\"armature\",\"armement\",\"armoire\",\"armure\",\"arpenter\",\"arracher\",\"arriver\",\"arroser\",\"arsenic\",\"artériel\",\"article\",\"aspect\",\"asphalte\",\"aspirer\",\"assaut\",\"asservir\",\"assiette\",\"associer\",\"assurer\",\"asticot\",\"astre\",\"astuce\",\"atelier\",\"atome\",\"atrium\",\"atroce\",\"attaque\",\"attentif\",\"attirer\",\"attraper\",\"aubaine\",\"auberge\",\"audace\",\"audible\",\"augurer\",\"aurore\",\"automne\",\"autruche\",\"avaler\",\"avancer\",\"avarice\",\"avenir\",\"averse\",\"aveugle\",\"aviateur\",\"avide\",\"avion\",\"aviser\",\"avoine\",\"avouer\",\"avril\",\"axial\",\"axiome\",\"badge\",\"bafouer\",\"bagage\",\"baguette\",\"baignade\",\"balancer\",\"balcon\",\"baleine\",\"balisage\",\"bambin\",\"bancaire\",\"bandage\",\"banlieue\",\"bannière\",\"banquier\",\"barbier\",\"baril\",\"baron\",\"barque\",\"barrage\",\"bassin\",\"bastion\",\"bataille\",\"bateau\",\"batterie\",\"baudrier\",\"bavarder\",\"belette\",\"bélier\",\"belote\",\"bénéfice\",\"berceau\",\"berger\",\"berline\",\"bermuda\",\"besace\",\"besogne\",\"bétail\",\"beurre\",\"biberon\",\"bicycle\",\"bidule\",\"bijou\",\"bilan\",\"bilingue\",\"billard\",\"binaire\",\"biologie\",\"biopsie\",\"biotype\",\"biscuit\",\"bison\",\"bistouri\",\"bitume\",\"bizarre\",\"blafard\",\"blague\",\"blanchir\",\"blessant\",\"blinder\",\"blond\",\"bloquer\",\"blouson\",\"bobard\",\"bobine\",\"boire\",\"boiser\",\"bolide\",\"bonbon\",\"bondir\",\"bonheur\",\"bonifier\",\"bonus\",\"bordure\",\"borne\",\"botte\",\"boucle\",\"boueux\",\"bougie\",\"boulon\",\"bouquin\",\"bourse\",\"boussole\",\"boutique\",\"boxeur\",\"branche\",\"brasier\",\"brave\",\"brebis\",\"brèche\",\"breuvage\",\"bricoler\",\"brigade\",\"brillant\",\"brioche\",\"brique\",\"brochure\",\"broder\",\"bronzer\",\"brousse\",\"broyeur\",\"brume\",\"brusque\",\"brutal\",\"bruyant\",\"buffle\",\"buisson\",\"bulletin\",\"bureau\",\"burin\",\"bustier\",\"butiner\",\"butoir\",\"buvable\",\"buvette\",\"cabanon\",\"cabine\",\"cachette\",\"cadeau\",\"cadre\",\"caféine\",\"caillou\",\"caisson\",\"calculer\",\"calepin\",\"calibre\",\"calmer\",\"calomnie\",\"calvaire\",\"camarade\",\"caméra\",\"camion\",\"campagne\",\"canal\",\"caneton\",\"canon\",\"cantine\",\"canular\",\"capable\",\"caporal\",\"caprice\",\"capsule\",\"capter\",\"capuche\",\"carabine\",\"carbone\",\"caresser\",\"caribou\",\"carnage\",\"carotte\",\"carreau\",\"carton\",\"cascade\",\"casier\",\"casque\",\"cassure\",\"causer\",\"caution\",\"cavalier\",\"caverne\",\"caviar\",\"cédille\",\"ceinture\",\"céleste\",\"cellule\",\"cendrier\",\"censurer\",\"central\",\"cercle\",\"cérébral\",\"cerise\",\"cerner\",\"cerveau\",\"cesser\",\"chagrin\",\"chaise\",\"chaleur\",\"chambre\",\"chance\",\"chapitre\",\"charbon\",\"chasseur\",\"chaton\",\"chausson\",\"chavirer\",\"chemise\",\"chenille\",\"chéquier\",\"chercher\",\"cheval\",\"chien\",\"chiffre\",\"chignon\",\"chimère\",\"chiot\",\"chlorure\",\"chocolat\",\"choisir\",\"chose\",\"chouette\",\"chrome\",\"chute\",\"cigare\",\"cigogne\",\"cimenter\",\"cinéma\",\"cintrer\",\"circuler\",\"cirer\",\"cirque\",\"citerne\",\"citoyen\",\"citron\",\"civil\",\"clairon\",\"clameur\",\"claquer\",\"classe\",\"clavier\",\"client\",\"cligner\",\"climat\",\"clivage\",\"cloche\",\"clonage\",\"cloporte\",\"cobalt\",\"cobra\",\"cocasse\",\"cocotier\",\"coder\",\"codifier\",\"coffre\",\"cogner\",\"cohésion\",\"coiffer\",\"coincer\",\"colère\",\"colibri\",\"colline\",\"colmater\",\"colonel\",\"combat\",\"comédie\",\"commande\",\"compact\",\"concert\",\"conduire\",\"confier\",\"congeler\",\"connoter\",\"consonne\",\"contact\",\"convexe\",\"copain\",\"copie\",\"corail\",\"corbeau\",\"cordage\",\"corniche\",\"corpus\",\"correct\",\"cortège\",\"cosmique\",\"costume\",\"coton\",\"coude\",\"coupure\",\"courage\",\"couteau\",\"couvrir\",\"coyote\",\"crabe\",\"crainte\",\"cravate\",\"crayon\",\"créature\",\"créditer\",\"crémeux\",\"creuser\",\"crevette\",\"cribler\",\"crier\",\"cristal\",\"critère\",\"croire\",\"croquer\",\"crotale\",\"crucial\",\"cruel\",\"crypter\",\"cubique\",\"cueillir\",\"cuillère\",\"cuisine\",\"cuivre\",\"culminer\",\"cultiver\",\"cumuler\",\"cupide\",\"curatif\",\"curseur\",\"cyanure\",\"cycle\",\"cylindre\",\"cynique\",\"daigner\",\"damier\",\"danger\",\"danseur\",\"dauphin\",\"débattre\",\"débiter\",\"déborder\",\"débrider\",\"débutant\",\"décaler\",\"décembre\",\"déchirer\",\"décider\",\"déclarer\",\"décorer\",\"décrire\",\"décupler\",\"dédale\",\"déductif\",\"déesse\",\"défensif\",\"défiler\",\"défrayer\",\"dégager\",\"dégivrer\",\"déglutir\",\"dégrafer\",\"déjeuner\",\"délice\",\"déloger\",\"demander\",\"demeurer\",\"démolir\",\"dénicher\",\"dénouer\",\"dentelle\",\"dénuder\",\"départ\",\"dépenser\",\"déphaser\",\"déplacer\",\"déposer\",\"déranger\",\"dérober\",\"désastre\",\"descente\",\"désert\",\"désigner\",\"désobéir\",\"dessiner\",\"destrier\",\"détacher\",\"détester\",\"détourer\",\"détresse\",\"devancer\",\"devenir\",\"deviner\",\"devoir\",\"diable\",\"dialogue\",\"diamant\",\"dicter\",\"différer\",\"digérer\",\"digital\",\"digne\",\"diluer\",\"dimanche\",\"diminuer\",\"dioxyde\",\"directif\",\"diriger\",\"discuter\",\"disposer\",\"dissiper\",\"distance\",\"divertir\",\"diviser\",\"docile\",\"docteur\",\"dogme\",\"doigt\",\"domaine\",\"domicile\",\"dompter\",\"donateur\",\"donjon\",\"donner\",\"dopamine\",\"dortoir\",\"dorure\",\"dosage\",\"doseur\",\"dossier\",\"dotation\",\"douanier\",\"double\",\"douceur\",\"douter\",\"doyen\",\"dragon\",\"draper\",\"dresser\",\"dribbler\",\"droiture\",\"duperie\",\"duplexe\",\"durable\",\"durcir\",\"dynastie\",\"éblouir\",\"écarter\",\"écharpe\",\"échelle\",\"éclairer\",\"éclipse\",\"éclore\",\"écluse\",\"école\",\"économie\",\"écorce\",\"écouter\",\"écraser\",\"écrémer\",\"écrivain\",\"écrou\",\"écume\",\"écureuil\",\"édifier\",\"éduquer\",\"effacer\",\"effectif\",\"effigie\",\"effort\",\"effrayer\",\"effusion\",\"égaliser\",\"égarer\",\"éjecter\",\"élaborer\",\"élargir\",\"électron\",\"élégant\",\"éléphant\",\"élève\",\"éligible\",\"élitisme\",\"éloge\",\"élucider\",\"éluder\",\"emballer\",\"embellir\",\"embryon\",\"émeraude\",\"émission\",\"emmener\",\"émotion\",\"émouvoir\",\"empereur\",\"employer\",\"emporter\",\"emprise\",\"émulsion\",\"encadrer\",\"enchère\",\"enclave\",\"encoche\",\"endiguer\",\"endosser\",\"endroit\",\"enduire\",\"énergie\",\"enfance\",\"enfermer\",\"enfouir\",\"engager\",\"engin\",\"englober\",\"énigme\",\"enjamber\",\"enjeu\",\"enlever\",\"ennemi\",\"ennuyeux\",\"enrichir\",\"enrobage\",\"enseigne\",\"entasser\",\"entendre\",\"entier\",\"entourer\",\"entraver\",\"énumérer\",\"envahir\",\"enviable\",\"envoyer\",\"enzyme\",\"éolien\",\"épaissir\",\"épargne\",\"épatant\",\"épaule\",\"épicerie\",\"épidémie\",\"épier\",\"épilogue\",\"épine\",\"épisode\",\"épitaphe\",\"époque\",\"épreuve\",\"éprouver\",\"épuisant\",\"équerre\",\"équipe\",\"ériger\",\"érosion\",\"erreur\",\"éruption\",\"escalier\",\"espadon\",\"espèce\",\"espiègle\",\"espoir\",\"esprit\",\"esquiver\",\"essayer\",\"essence\",\"essieu\",\"essorer\",\"estime\",\"estomac\",\"estrade\",\"étagère\",\"étaler\",\"étanche\",\"étatique\",\"éteindre\",\"étendoir\",\"éternel\",\"éthanol\",\"éthique\",\"ethnie\",\"étirer\",\"étoffer\",\"étoile\",\"étonnant\",\"étourdir\",\"étrange\",\"étroit\",\"étude\",\"euphorie\",\"évaluer\",\"évasion\",\"éventail\",\"évidence\",\"éviter\",\"évolutif\",\"évoquer\",\"exact\",\"exagérer\",\"exaucer\",\"exceller\",\"excitant\",\"exclusif\",\"excuse\",\"exécuter\",\"exemple\",\"exercer\",\"exhaler\",\"exhorter\",\"exigence\",\"exiler\",\"exister\",\"exotique\",\"expédier\",\"explorer\",\"exposer\",\"exprimer\",\"exquis\",\"extensif\",\"extraire\",\"exulter\",\"fable\",\"fabuleux\",\"facette\",\"facile\",\"facture\",\"faiblir\",\"falaise\",\"fameux\",\"famille\",\"farceur\",\"farfelu\",\"farine\",\"farouche\",\"fasciner\",\"fatal\",\"fatigue\",\"faucon\",\"fautif\",\"faveur\",\"favori\",\"fébrile\",\"féconder\",\"fédérer\",\"félin\",\"femme\",\"fémur\",\"fendoir\",\"féodal\",\"fermer\",\"féroce\",\"ferveur\",\"festival\",\"feuille\",\"feutre\",\"février\",\"fiasco\",\"ficeler\",\"fictif\",\"fidèle\",\"figure\",\"filature\",\"filetage\",\"filière\",\"filleul\",\"filmer\",\"filou\",\"filtrer\",\"financer\",\"finir\",\"fiole\",\"firme\",\"fissure\",\"fixer\",\"flairer\",\"flamme\",\"flasque\",\"flatteur\",\"fléau\",\"flèche\",\"fleur\",\"flexion\",\"flocon\",\"flore\",\"fluctuer\",\"fluide\",\"fluvial\",\"folie\",\"fonderie\",\"fongible\",\"fontaine\",\"forcer\",\"forgeron\",\"formuler\",\"fortune\",\"fossile\",\"foudre\",\"fougère\",\"fouiller\",\"foulure\",\"fourmi\",\"fragile\",\"fraise\",\"franchir\",\"frapper\",\"frayeur\",\"frégate\",\"freiner\",\"frelon\",\"frémir\",\"frénésie\",\"frère\",\"friable\",\"friction\",\"frisson\",\"frivole\",\"froid\",\"fromage\",\"frontal\",\"frotter\",\"fruit\",\"fugitif\",\"fuite\",\"fureur\",\"furieux\",\"furtif\",\"fusion\",\"futur\",\"gagner\",\"galaxie\",\"galerie\",\"gambader\",\"garantir\",\"gardien\",\"garnir\",\"garrigue\",\"gazelle\",\"gazon\",\"géant\",\"gélatine\",\"gélule\",\"gendarme\",\"général\",\"génie\",\"genou\",\"gentil\",\"géologie\",\"géomètre\",\"géranium\",\"germe\",\"gestuel\",\"geyser\",\"gibier\",\"gicler\",\"girafe\",\"givre\",\"glace\",\"glaive\",\"glisser\",\"globe\",\"gloire\",\"glorieux\",\"golfeur\",\"gomme\",\"gonfler\",\"gorge\",\"gorille\",\"goudron\",\"gouffre\",\"goulot\",\"goupille\",\"gourmand\",\"goutte\",\"graduel\",\"graffiti\",\"graine\",\"grand\",\"grappin\",\"gratuit\",\"gravir\",\"grenat\",\"griffure\",\"griller\",\"grimper\",\"grogner\",\"gronder\",\"grotte\",\"groupe\",\"gruger\",\"grutier\",\"gruyère\",\"guépard\",\"guerrier\",\"guide\",\"guimauve\",\"guitare\",\"gustatif\",\"gymnaste\",\"gyrostat\",\"habitude\",\"hachoir\",\"halte\",\"hameau\",\"hangar\",\"hanneton\",\"haricot\",\"harmonie\",\"harpon\",\"hasard\",\"hélium\",\"hématome\",\"herbe\",\"hérisson\",\"hermine\",\"héron\",\"hésiter\",\"heureux\",\"hiberner\",\"hibou\",\"hilarant\",\"histoire\",\"hiver\",\"homard\",\"hommage\",\"homogène\",\"honneur\",\"honorer\",\"honteux\",\"horde\",\"horizon\",\"horloge\",\"hormone\",\"horrible\",\"houleux\",\"housse\",\"hublot\",\"huileux\",\"humain\",\"humble\",\"humide\",\"humour\",\"hurler\",\"hydromel\",\"hygiène\",\"hymne\",\"hypnose\",\"idylle\",\"ignorer\",\"iguane\",\"illicite\",\"illusion\",\"image\",\"imbiber\",\"imiter\",\"immense\",\"immobile\",\"immuable\",\"impact\",\"impérial\",\"implorer\",\"imposer\",\"imprimer\",\"imputer\",\"incarner\",\"incendie\",\"incident\",\"incliner\",\"incolore\",\"indexer\",\"indice\",\"inductif\",\"inédit\",\"ineptie\",\"inexact\",\"infini\",\"infliger\",\"informer\",\"infusion\",\"ingérer\",\"inhaler\",\"inhiber\",\"injecter\",\"injure\",\"innocent\",\"inoculer\",\"inonder\",\"inscrire\",\"insecte\",\"insigne\",\"insolite\",\"inspirer\",\"instinct\",\"insulter\",\"intact\",\"intense\",\"intime\",\"intrigue\",\"intuitif\",\"inutile\",\"invasion\",\"inventer\",\"inviter\",\"invoquer\",\"ironique\",\"irradier\",\"irréel\",\"irriter\",\"isoler\",\"ivoire\",\"ivresse\",\"jaguar\",\"jaillir\",\"jambe\",\"janvier\",\"jardin\",\"jauger\",\"jaune\",\"javelot\",\"jetable\",\"jeton\",\"jeudi\",\"jeunesse\",\"joindre\",\"joncher\",\"jongler\",\"joueur\",\"jouissif\",\"journal\",\"jovial\",\"joyau\",\"joyeux\",\"jubiler\",\"jugement\",\"junior\",\"jupon\",\"juriste\",\"justice\",\"juteux\",\"juvénile\",\"kayak\",\"kimono\",\"kiosque\",\"label\",\"labial\",\"labourer\",\"lacérer\",\"lactose\",\"lagune\",\"laine\",\"laisser\",\"laitier\",\"lambeau\",\"lamelle\",\"lampe\",\"lanceur\",\"langage\",\"lanterne\",\"lapin\",\"largeur\",\"larme\",\"laurier\",\"lavabo\",\"lavoir\",\"lecture\",\"légal\",\"léger\",\"légume\",\"lessive\",\"lettre\",\"levier\",\"lexique\",\"lézard\",\"liasse\",\"libérer\",\"libre\",\"licence\",\"licorne\",\"liège\",\"lièvre\",\"ligature\",\"ligoter\",\"ligue\",\"limer\",\"limite\",\"limonade\",\"limpide\",\"linéaire\",\"lingot\",\"lionceau\",\"liquide\",\"lisière\",\"lister\",\"lithium\",\"litige\",\"littoral\",\"livreur\",\"logique\",\"lointain\",\"loisir\",\"lombric\",\"loterie\",\"louer\",\"lourd\",\"loutre\",\"louve\",\"loyal\",\"lubie\",\"lucide\",\"lucratif\",\"lueur\",\"lugubre\",\"luisant\",\"lumière\",\"lunaire\",\"lundi\",\"luron\",\"lutter\",\"luxueux\",\"machine\",\"magasin\",\"magenta\",\"magique\",\"maigre\",\"maillon\",\"maintien\",\"mairie\",\"maison\",\"majorer\",\"malaxer\",\"maléfice\",\"malheur\",\"malice\",\"mallette\",\"mammouth\",\"mandater\",\"maniable\",\"manquant\",\"manteau\",\"manuel\",\"marathon\",\"marbre\",\"marchand\",\"mardi\",\"maritime\",\"marqueur\",\"marron\",\"marteler\",\"mascotte\",\"massif\",\"matériel\",\"matière\",\"matraque\",\"maudire\",\"maussade\",\"mauve\",\"maximal\",\"méchant\",\"méconnu\",\"médaille\",\"médecin\",\"méditer\",\"méduse\",\"meilleur\",\"mélange\",\"mélodie\",\"membre\",\"mémoire\",\"menacer\",\"mener\",\"menhir\",\"mensonge\",\"mentor\",\"mercredi\",\"mérite\",\"merle\",\"messager\",\"mesure\",\"métal\",\"météore\",\"méthode\",\"métier\",\"meuble\",\"miauler\",\"microbe\",\"miette\",\"mignon\",\"migrer\",\"milieu\",\"million\",\"mimique\",\"mince\",\"minéral\",\"minimal\",\"minorer\",\"minute\",\"miracle\",\"miroiter\",\"missile\",\"mixte\",\"mobile\",\"moderne\",\"moelleux\",\"mondial\",\"moniteur\",\"monnaie\",\"monotone\",\"monstre\",\"montagne\",\"monument\",\"moqueur\",\"morceau\",\"morsure\",\"mortier\",\"moteur\",\"motif\",\"mouche\",\"moufle\",\"moulin\",\"mousson\",\"mouton\",\"mouvant\",\"multiple\",\"munition\",\"muraille\",\"murène\",\"murmure\",\"muscle\",\"muséum\",\"musicien\",\"mutation\",\"muter\",\"mutuel\",\"myriade\",\"myrtille\",\"mystère\",\"mythique\",\"nageur\",\"nappe\",\"narquois\",\"narrer\",\"natation\",\"nation\",\"nature\",\"naufrage\",\"nautique\",\"navire\",\"nébuleux\",\"nectar\",\"néfaste\",\"négation\",\"négliger\",\"négocier\",\"neige\",\"nerveux\",\"nettoyer\",\"neurone\",\"neutron\",\"neveu\",\"niche\",\"nickel\",\"nitrate\",\"niveau\",\"noble\",\"nocif\",\"nocturne\",\"noirceur\",\"noisette\",\"nomade\",\"nombreux\",\"nommer\",\"normatif\",\"notable\",\"notifier\",\"notoire\",\"nourrir\",\"nouveau\",\"novateur\",\"novembre\",\"novice\",\"nuage\",\"nuancer\",\"nuire\",\"nuisible\",\"numéro\",\"nuptial\",\"nuque\",\"nutritif\",\"obéir\",\"objectif\",\"obliger\",\"obscur\",\"observer\",\"obstacle\",\"obtenir\",\"obturer\",\"occasion\",\"occuper\",\"océan\",\"octobre\",\"octroyer\",\"octupler\",\"oculaire\",\"odeur\",\"odorant\",\"offenser\",\"officier\",\"offrir\",\"ogive\",\"oiseau\",\"oisillon\",\"olfactif\",\"olivier\",\"ombrage\",\"omettre\",\"onctueux\",\"onduler\",\"onéreux\",\"onirique\",\"opale\",\"opaque\",\"opérer\",\"opinion\",\"opportun\",\"opprimer\",\"opter\",\"optique\",\"orageux\",\"orange\",\"orbite\",\"ordonner\",\"oreille\",\"organe\",\"orgueil\",\"orifice\",\"ornement\",\"orque\",\"ortie\",\"osciller\",\"osmose\",\"ossature\",\"otarie\",\"ouragan\",\"ourson\",\"outil\",\"outrager\",\"ouvrage\",\"ovation\",\"oxyde\",\"oxygène\",\"ozone\",\"paisible\",\"palace\",\"palmarès\",\"palourde\",\"palper\",\"panache\",\"panda\",\"pangolin\",\"paniquer\",\"panneau\",\"panorama\",\"pantalon\",\"papaye\",\"papier\",\"papoter\",\"papyrus\",\"paradoxe\",\"parcelle\",\"paresse\",\"parfumer\",\"parler\",\"parole\",\"parrain\",\"parsemer\",\"partager\",\"parure\",\"parvenir\",\"passion\",\"pastèque\",\"paternel\",\"patience\",\"patron\",\"pavillon\",\"pavoiser\",\"payer\",\"paysage\",\"peigne\",\"peintre\",\"pelage\",\"pélican\",\"pelle\",\"pelouse\",\"peluche\",\"pendule\",\"pénétrer\",\"pénible\",\"pensif\",\"pénurie\",\"pépite\",\"péplum\",\"perdrix\",\"perforer\",\"période\",\"permuter\",\"perplexe\",\"persil\",\"perte\",\"peser\",\"pétale\",\"petit\",\"pétrir\",\"peuple\",\"pharaon\",\"phobie\",\"phoque\",\"photon\",\"phrase\",\"physique\",\"piano\",\"pictural\",\"pièce\",\"pierre\",\"pieuvre\",\"pilote\",\"pinceau\",\"pipette\",\"piquer\",\"pirogue\",\"piscine\",\"piston\",\"pivoter\",\"pixel\",\"pizza\",\"placard\",\"plafond\",\"plaisir\",\"planer\",\"plaque\",\"plastron\",\"plateau\",\"pleurer\",\"plexus\",\"pliage\",\"plomb\",\"plonger\",\"pluie\",\"plumage\",\"pochette\",\"poésie\",\"poète\",\"pointe\",\"poirier\",\"poisson\",\"poivre\",\"polaire\",\"policier\",\"pollen\",\"polygone\",\"pommade\",\"pompier\",\"ponctuel\",\"pondérer\",\"poney\",\"portique\",\"position\",\"posséder\",\"posture\",\"potager\",\"poteau\",\"potion\",\"pouce\",\"poulain\",\"poumon\",\"pourpre\",\"poussin\",\"pouvoir\",\"prairie\",\"pratique\",\"précieux\",\"prédire\",\"préfixe\",\"prélude\",\"prénom\",\"présence\",\"prétexte\",\"prévoir\",\"primitif\",\"prince\",\"prison\",\"priver\",\"problème\",\"procéder\",\"prodige\",\"profond\",\"progrès\",\"proie\",\"projeter\",\"prologue\",\"promener\",\"propre\",\"prospère\",\"protéger\",\"prouesse\",\"proverbe\",\"prudence\",\"pruneau\",\"psychose\",\"public\",\"puceron\",\"puiser\",\"pulpe\",\"pulsar\",\"punaise\",\"punitif\",\"pupitre\",\"purifier\",\"puzzle\",\"pyramide\",\"quasar\",\"querelle\",\"question\",\"quiétude\",\"quitter\",\"quotient\",\"racine\",\"raconter\",\"radieux\",\"ragondin\",\"raideur\",\"raisin\",\"ralentir\",\"rallonge\",\"ramasser\",\"rapide\",\"rasage\",\"ratisser\",\"ravager\",\"ravin\",\"rayonner\",\"réactif\",\"réagir\",\"réaliser\",\"réanimer\",\"recevoir\",\"réciter\",\"réclamer\",\"récolter\",\"recruter\",\"reculer\",\"recycler\",\"rédiger\",\"redouter\",\"refaire\",\"réflexe\",\"réformer\",\"refrain\",\"refuge\",\"régalien\",\"région\",\"réglage\",\"régulier\",\"réitérer\",\"rejeter\",\"rejouer\",\"relatif\",\"relever\",\"relief\",\"remarque\",\"remède\",\"remise\",\"remonter\",\"remplir\",\"remuer\",\"renard\",\"renfort\",\"renifler\",\"renoncer\",\"rentrer\",\"renvoi\",\"replier\",\"reporter\",\"reprise\",\"reptile\",\"requin\",\"réserve\",\"résineux\",\"résoudre\",\"respect\",\"rester\",\"résultat\",\"rétablir\",\"retenir\",\"réticule\",\"retomber\",\"retracer\",\"réunion\",\"réussir\",\"revanche\",\"revivre\",\"révolte\",\"révulsif\",\"richesse\",\"rideau\",\"rieur\",\"rigide\",\"rigoler\",\"rincer\",\"riposter\",\"risible\",\"risque\",\"rituel\",\"rival\",\"rivière\",\"rocheux\",\"romance\",\"rompre\",\"ronce\",\"rondin\",\"roseau\",\"rosier\",\"rotatif\",\"rotor\",\"rotule\",\"rouge\",\"rouille\",\"rouleau\",\"routine\",\"royaume\",\"ruban\",\"rubis\",\"ruche\",\"ruelle\",\"rugueux\",\"ruiner\",\"ruisseau\",\"ruser\",\"rustique\",\"rythme\",\"sabler\",\"saboter\",\"sabre\",\"sacoche\",\"safari\",\"sagesse\",\"saisir\",\"salade\",\"salive\",\"salon\",\"saluer\",\"samedi\",\"sanction\",\"sanglier\",\"sarcasme\",\"sardine\",\"saturer\",\"saugrenu\",\"saumon\",\"sauter\",\"sauvage\",\"savant\",\"savonner\",\"scalpel\",\"scandale\",\"scélérat\",\"scénario\",\"sceptre\",\"schéma\",\"science\",\"scinder\",\"score\",\"scrutin\",\"sculpter\",\"séance\",\"sécable\",\"sécher\",\"secouer\",\"sécréter\",\"sédatif\",\"séduire\",\"seigneur\",\"séjour\",\"sélectif\",\"semaine\",\"sembler\",\"semence\",\"séminal\",\"sénateur\",\"sensible\",\"sentence\",\"séparer\",\"séquence\",\"serein\",\"sergent\",\"sérieux\",\"serrure\",\"sérum\",\"service\",\"sésame\",\"sévir\",\"sevrage\",\"sextuple\",\"sidéral\",\"siècle\",\"siéger\",\"siffler\",\"sigle\",\"signal\",\"silence\",\"silicium\",\"simple\",\"sincère\",\"sinistre\",\"siphon\",\"sirop\",\"sismique\",\"situer\",\"skier\",\"social\",\"socle\",\"sodium\",\"soigneux\",\"soldat\",\"soleil\",\"solitude\",\"soluble\",\"sombre\",\"sommeil\",\"somnoler\",\"sonde\",\"songeur\",\"sonnette\",\"sonore\",\"sorcier\",\"sortir\",\"sosie\",\"sottise\",\"soucieux\",\"soudure\",\"souffle\",\"soulever\",\"soupape\",\"source\",\"soutirer\",\"souvenir\",\"spacieux\",\"spatial\",\"spécial\",\"sphère\",\"spiral\",\"stable\",\"station\",\"sternum\",\"stimulus\",\"stipuler\",\"strict\",\"studieux\",\"stupeur\",\"styliste\",\"sublime\",\"substrat\",\"subtil\",\"subvenir\",\"succès\",\"sucre\",\"suffixe\",\"suggérer\",\"suiveur\",\"sulfate\",\"superbe\",\"supplier\",\"surface\",\"suricate\",\"surmener\",\"surprise\",\"sursaut\",\"survie\",\"suspect\",\"syllabe\",\"symbole\",\"symétrie\",\"synapse\",\"syntaxe\",\"système\",\"tabac\",\"tablier\",\"tactile\",\"tailler\",\"talent\",\"talisman\",\"talonner\",\"tambour\",\"tamiser\",\"tangible\",\"tapis\",\"taquiner\",\"tarder\",\"tarif\",\"tartine\",\"tasse\",\"tatami\",\"tatouage\",\"taupe\",\"taureau\",\"taxer\",\"témoin\",\"temporel\",\"tenaille\",\"tendre\",\"teneur\",\"tenir\",\"tension\",\"terminer\",\"terne\",\"terrible\",\"tétine\",\"texte\",\"thème\",\"théorie\",\"thérapie\",\"thorax\",\"tibia\",\"tiède\",\"timide\",\"tirelire\",\"tiroir\",\"tissu\",\"titane\",\"titre\",\"tituber\",\"toboggan\",\"tolérant\",\"tomate\",\"tonique\",\"tonneau\",\"toponyme\",\"torche\",\"tordre\",\"tornade\",\"torpille\",\"torrent\",\"torse\",\"tortue\",\"totem\",\"toucher\",\"tournage\",\"tousser\",\"toxine\",\"traction\",\"trafic\",\"tragique\",\"trahir\",\"train\",\"trancher\",\"travail\",\"trèfle\",\"tremper\",\"trésor\",\"treuil\",\"triage\",\"tribunal\",\"tricoter\",\"trilogie\",\"triomphe\",\"tripler\",\"triturer\",\"trivial\",\"trombone\",\"tronc\",\"tropical\",\"troupeau\",\"tuile\",\"tulipe\",\"tumulte\",\"tunnel\",\"turbine\",\"tuteur\",\"tutoyer\",\"tuyau\",\"tympan\",\"typhon\",\"typique\",\"tyran\",\"ubuesque\",\"ultime\",\"ultrason\",\"unanime\",\"unifier\",\"union\",\"unique\",\"unitaire\",\"univers\",\"uranium\",\"urbain\",\"urticant\",\"usage\",\"usine\",\"usuel\",\"usure\",\"utile\",\"utopie\",\"vacarme\",\"vaccin\",\"vagabond\",\"vague\",\"vaillant\",\"vaincre\",\"vaisseau\",\"valable\",\"valise\",\"vallon\",\"valve\",\"vampire\",\"vanille\",\"vapeur\",\"varier\",\"vaseux\",\"vassal\",\"vaste\",\"vecteur\",\"vedette\",\"végétal\",\"véhicule\",\"veinard\",\"véloce\",\"vendredi\",\"vénérer\",\"venger\",\"venimeux\",\"ventouse\",\"verdure\",\"vérin\",\"vernir\",\"verrou\",\"verser\",\"vertu\",\"veston\",\"vétéran\",\"vétuste\",\"vexant\",\"vexer\",\"viaduc\",\"viande\",\"victoire\",\"vidange\",\"vidéo\",\"vignette\",\"vigueur\",\"vilain\",\"village\",\"vinaigre\",\"violon\",\"vipère\",\"virement\",\"virtuose\",\"virus\",\"visage\",\"viseur\",\"vision\",\"visqueux\",\"visuel\",\"vital\",\"vitesse\",\"viticole\",\"vitrine\",\"vivace\",\"vivipare\",\"vocation\",\"voguer\",\"voile\",\"voisin\",\"voiture\",\"volaille\",\"volcan\",\"voltiger\",\"volume\",\"vorace\",\"vortex\",\"voter\",\"vouloir\",\"voyage\",\"voyelle\",\"wagon\",\"xénon\",\"yacht\",\"zèbre\",\"zénith\",\"zeste\",\"zoologie\"]");

const require$$5 = /* #__PURE__ */ JSON.parse("[\"abaco\",\"abbaglio\",\"abbinato\",\"abete\",\"abisso\",\"abolire\",\"abrasivo\",\"abrogato\",\"accadere\",\"accenno\",\"accusato\",\"acetone\",\"achille\",\"acido\",\"acqua\",\"acre\",\"acrilico\",\"acrobata\",\"acuto\",\"adagio\",\"addebito\",\"addome\",\"adeguato\",\"aderire\",\"adipe\",\"adottare\",\"adulare\",\"affabile\",\"affetto\",\"affisso\",\"affranto\",\"aforisma\",\"afoso\",\"africano\",\"agave\",\"agente\",\"agevole\",\"aggancio\",\"agire\",\"agitare\",\"agonismo\",\"agricolo\",\"agrumeto\",\"aguzzo\",\"alabarda\",\"alato\",\"albatro\",\"alberato\",\"albo\",\"albume\",\"alce\",\"alcolico\",\"alettone\",\"alfa\",\"algebra\",\"aliante\",\"alibi\",\"alimento\",\"allagato\",\"allegro\",\"allievo\",\"allodola\",\"allusivo\",\"almeno\",\"alogeno\",\"alpaca\",\"alpestre\",\"altalena\",\"alterno\",\"alticcio\",\"altrove\",\"alunno\",\"alveolo\",\"alzare\",\"amalgama\",\"amanita\",\"amarena\",\"ambito\",\"ambrato\",\"ameba\",\"america\",\"ametista\",\"amico\",\"ammasso\",\"ammenda\",\"ammirare\",\"ammonito\",\"amore\",\"ampio\",\"ampliare\",\"amuleto\",\"anacardo\",\"anagrafe\",\"analista\",\"anarchia\",\"anatra\",\"anca\",\"ancella\",\"ancora\",\"andare\",\"andrea\",\"anello\",\"angelo\",\"angolare\",\"angusto\",\"anima\",\"annegare\",\"annidato\",\"anno\",\"annuncio\",\"anonimo\",\"anticipo\",\"anzi\",\"apatico\",\"apertura\",\"apode\",\"apparire\",\"appetito\",\"appoggio\",\"approdo\",\"appunto\",\"aprile\",\"arabica\",\"arachide\",\"aragosta\",\"araldica\",\"arancio\",\"aratura\",\"arazzo\",\"arbitro\",\"archivio\",\"ardito\",\"arenile\",\"argento\",\"argine\",\"arguto\",\"aria\",\"armonia\",\"arnese\",\"arredato\",\"arringa\",\"arrosto\",\"arsenico\",\"arso\",\"artefice\",\"arzillo\",\"asciutto\",\"ascolto\",\"asepsi\",\"asettico\",\"asfalto\",\"asino\",\"asola\",\"aspirato\",\"aspro\",\"assaggio\",\"asse\",\"assoluto\",\"assurdo\",\"asta\",\"astenuto\",\"astice\",\"astratto\",\"atavico\",\"ateismo\",\"atomico\",\"atono\",\"attesa\",\"attivare\",\"attorno\",\"attrito\",\"attuale\",\"ausilio\",\"austria\",\"autista\",\"autonomo\",\"autunno\",\"avanzato\",\"avere\",\"avvenire\",\"avviso\",\"avvolgere\",\"azione\",\"azoto\",\"azzimo\",\"azzurro\",\"babele\",\"baccano\",\"bacino\",\"baco\",\"badessa\",\"badilata\",\"bagnato\",\"baita\",\"balcone\",\"baldo\",\"balena\",\"ballata\",\"balzano\",\"bambino\",\"bandire\",\"baraonda\",\"barbaro\",\"barca\",\"baritono\",\"barlume\",\"barocco\",\"basilico\",\"basso\",\"batosta\",\"battuto\",\"baule\",\"bava\",\"bavosa\",\"becco\",\"beffa\",\"belgio\",\"belva\",\"benda\",\"benevole\",\"benigno\",\"benzina\",\"bere\",\"berlina\",\"beta\",\"bibita\",\"bici\",\"bidone\",\"bifido\",\"biga\",\"bilancia\",\"bimbo\",\"binocolo\",\"biologo\",\"bipede\",\"bipolare\",\"birbante\",\"birra\",\"biscotto\",\"bisesto\",\"bisnonno\",\"bisonte\",\"bisturi\",\"bizzarro\",\"blando\",\"blatta\",\"bollito\",\"bonifico\",\"bordo\",\"bosco\",\"botanico\",\"bottino\",\"bozzolo\",\"braccio\",\"bradipo\",\"brama\",\"branca\",\"bravura\",\"bretella\",\"brevetto\",\"brezza\",\"briglia\",\"brillante\",\"brindare\",\"broccolo\",\"brodo\",\"bronzina\",\"brullo\",\"bruno\",\"bubbone\",\"buca\",\"budino\",\"buffone\",\"buio\",\"bulbo\",\"buono\",\"burlone\",\"burrasca\",\"bussola\",\"busta\",\"cadetto\",\"caduco\",\"calamaro\",\"calcolo\",\"calesse\",\"calibro\",\"calmo\",\"caloria\",\"cambusa\",\"camerata\",\"camicia\",\"cammino\",\"camola\",\"campale\",\"canapa\",\"candela\",\"cane\",\"canino\",\"canotto\",\"cantina\",\"capace\",\"capello\",\"capitolo\",\"capogiro\",\"cappero\",\"capra\",\"capsula\",\"carapace\",\"carcassa\",\"cardo\",\"carisma\",\"carovana\",\"carretto\",\"cartolina\",\"casaccio\",\"cascata\",\"caserma\",\"caso\",\"cassone\",\"castello\",\"casuale\",\"catasta\",\"catena\",\"catrame\",\"cauto\",\"cavillo\",\"cedibile\",\"cedrata\",\"cefalo\",\"celebre\",\"cellulare\",\"cena\",\"cenone\",\"centesimo\",\"ceramica\",\"cercare\",\"certo\",\"cerume\",\"cervello\",\"cesoia\",\"cespo\",\"ceto\",\"chela\",\"chiaro\",\"chicca\",\"chiedere\",\"chimera\",\"china\",\"chirurgo\",\"chitarra\",\"ciao\",\"ciclismo\",\"cifrare\",\"cigno\",\"cilindro\",\"ciottolo\",\"circa\",\"cirrosi\",\"citrico\",\"cittadino\",\"ciuffo\",\"civetta\",\"civile\",\"classico\",\"clinica\",\"cloro\",\"cocco\",\"codardo\",\"codice\",\"coerente\",\"cognome\",\"collare\",\"colmato\",\"colore\",\"colposo\",\"coltivato\",\"colza\",\"coma\",\"cometa\",\"commando\",\"comodo\",\"computer\",\"comune\",\"conciso\",\"condurre\",\"conferma\",\"congelare\",\"coniuge\",\"connesso\",\"conoscere\",\"consumo\",\"continuo\",\"convegno\",\"coperto\",\"copione\",\"coppia\",\"copricapo\",\"corazza\",\"cordata\",\"coricato\",\"cornice\",\"corolla\",\"corpo\",\"corredo\",\"corsia\",\"cortese\",\"cosmico\",\"costante\",\"cottura\",\"covato\",\"cratere\",\"cravatta\",\"creato\",\"credere\",\"cremoso\",\"crescita\",\"creta\",\"criceto\",\"crinale\",\"crisi\",\"critico\",\"croce\",\"cronaca\",\"crostata\",\"cruciale\",\"crusca\",\"cucire\",\"cuculo\",\"cugino\",\"cullato\",\"cupola\",\"curatore\",\"cursore\",\"curvo\",\"cuscino\",\"custode\",\"dado\",\"daino\",\"dalmata\",\"damerino\",\"daniela\",\"dannoso\",\"danzare\",\"datato\",\"davanti\",\"davvero\",\"debutto\",\"decennio\",\"deciso\",\"declino\",\"decollo\",\"decreto\",\"dedicato\",\"definito\",\"deforme\",\"degno\",\"delegare\",\"delfino\",\"delirio\",\"delta\",\"demenza\",\"denotato\",\"dentro\",\"deposito\",\"derapata\",\"derivare\",\"deroga\",\"descritto\",\"deserto\",\"desiderio\",\"desumere\",\"detersivo\",\"devoto\",\"diametro\",\"dicembre\",\"diedro\",\"difeso\",\"diffuso\",\"digerire\",\"digitale\",\"diluvio\",\"dinamico\",\"dinnanzi\",\"dipinto\",\"diploma\",\"dipolo\",\"diradare\",\"dire\",\"dirotto\",\"dirupo\",\"disagio\",\"discreto\",\"disfare\",\"disgelo\",\"disposto\",\"distanza\",\"disumano\",\"dito\",\"divano\",\"divelto\",\"dividere\",\"divorato\",\"doblone\",\"docente\",\"doganale\",\"dogma\",\"dolce\",\"domato\",\"domenica\",\"dominare\",\"dondolo\",\"dono\",\"dormire\",\"dote\",\"dottore\",\"dovuto\",\"dozzina\",\"drago\",\"druido\",\"dubbio\",\"dubitare\",\"ducale\",\"duna\",\"duomo\",\"duplice\",\"duraturo\",\"ebano\",\"eccesso\",\"ecco\",\"eclissi\",\"economia\",\"edera\",\"edicola\",\"edile\",\"editoria\",\"educare\",\"egemonia\",\"egli\",\"egoismo\",\"egregio\",\"elaborato\",\"elargire\",\"elegante\",\"elencato\",\"eletto\",\"elevare\",\"elfico\",\"elica\",\"elmo\",\"elsa\",\"eluso\",\"emanato\",\"emblema\",\"emesso\",\"emiro\",\"emotivo\",\"emozione\",\"empirico\",\"emulo\",\"endemico\",\"enduro\",\"energia\",\"enfasi\",\"enoteca\",\"entrare\",\"enzima\",\"epatite\",\"epilogo\",\"episodio\",\"epocale\",\"eppure\",\"equatore\",\"erario\",\"erba\",\"erboso\",\"erede\",\"eremita\",\"erigere\",\"ermetico\",\"eroe\",\"erosivo\",\"errante\",\"esagono\",\"esame\",\"esanime\",\"esaudire\",\"esca\",\"esempio\",\"esercito\",\"esibito\",\"esigente\",\"esistere\",\"esito\",\"esofago\",\"esortato\",\"esoso\",\"espanso\",\"espresso\",\"essenza\",\"esso\",\"esteso\",\"estimare\",\"estonia\",\"estroso\",\"esultare\",\"etilico\",\"etnico\",\"etrusco\",\"etto\",\"euclideo\",\"europa\",\"evaso\",\"evidenza\",\"evitato\",\"evoluto\",\"evviva\",\"fabbrica\",\"faccenda\",\"fachiro\",\"falco\",\"famiglia\",\"fanale\",\"fanfara\",\"fango\",\"fantasma\",\"fare\",\"farfalla\",\"farinoso\",\"farmaco\",\"fascia\",\"fastoso\",\"fasullo\",\"faticare\",\"fato\",\"favoloso\",\"febbre\",\"fecola\",\"fede\",\"fegato\",\"felpa\",\"feltro\",\"femmina\",\"fendere\",\"fenomeno\",\"fermento\",\"ferro\",\"fertile\",\"fessura\",\"festivo\",\"fetta\",\"feudo\",\"fiaba\",\"fiducia\",\"fifa\",\"figurato\",\"filo\",\"finanza\",\"finestra\",\"finire\",\"fiore\",\"fiscale\",\"fisico\",\"fiume\",\"flacone\",\"flamenco\",\"flebo\",\"flemma\",\"florido\",\"fluente\",\"fluoro\",\"fobico\",\"focaccia\",\"focoso\",\"foderato\",\"foglio\",\"folata\",\"folclore\",\"folgore\",\"fondente\",\"fonetico\",\"fonia\",\"fontana\",\"forbito\",\"forchetta\",\"foresta\",\"formica\",\"fornaio\",\"foro\",\"fortezza\",\"forzare\",\"fosfato\",\"fosso\",\"fracasso\",\"frana\",\"frassino\",\"fratello\",\"freccetta\",\"frenata\",\"fresco\",\"frigo\",\"frollino\",\"fronde\",\"frugale\",\"frutta\",\"fucilata\",\"fucsia\",\"fuggente\",\"fulmine\",\"fulvo\",\"fumante\",\"fumetto\",\"fumoso\",\"fune\",\"funzione\",\"fuoco\",\"furbo\",\"furgone\",\"furore\",\"fuso\",\"futile\",\"gabbiano\",\"gaffe\",\"galateo\",\"gallina\",\"galoppo\",\"gambero\",\"gamma\",\"garanzia\",\"garbo\",\"garofano\",\"garzone\",\"gasdotto\",\"gasolio\",\"gastrico\",\"gatto\",\"gaudio\",\"gazebo\",\"gazzella\",\"geco\",\"gelatina\",\"gelso\",\"gemello\",\"gemmato\",\"gene\",\"genitore\",\"gennaio\",\"genotipo\",\"gergo\",\"ghepardo\",\"ghiaccio\",\"ghisa\",\"giallo\",\"gilda\",\"ginepro\",\"giocare\",\"gioiello\",\"giorno\",\"giove\",\"girato\",\"girone\",\"gittata\",\"giudizio\",\"giurato\",\"giusto\",\"globulo\",\"glutine\",\"gnomo\",\"gobba\",\"golf\",\"gomito\",\"gommone\",\"gonfio\",\"gonna\",\"governo\",\"gracile\",\"grado\",\"grafico\",\"grammo\",\"grande\",\"grattare\",\"gravoso\",\"grazia\",\"greca\",\"gregge\",\"grifone\",\"grigio\",\"grinza\",\"grotta\",\"gruppo\",\"guadagno\",\"guaio\",\"guanto\",\"guardare\",\"gufo\",\"guidare\",\"ibernato\",\"icona\",\"identico\",\"idillio\",\"idolo\",\"idra\",\"idrico\",\"idrogeno\",\"igiene\",\"ignaro\",\"ignorato\",\"ilare\",\"illeso\",\"illogico\",\"illudere\",\"imballo\",\"imbevuto\",\"imbocco\",\"imbuto\",\"immane\",\"immerso\",\"immolato\",\"impacco\",\"impeto\",\"impiego\",\"importo\",\"impronta\",\"inalare\",\"inarcare\",\"inattivo\",\"incanto\",\"incendio\",\"inchino\",\"incisivo\",\"incluso\",\"incontro\",\"incrocio\",\"incubo\",\"indagine\",\"india\",\"indole\",\"inedito\",\"infatti\",\"infilare\",\"inflitto\",\"ingaggio\",\"ingegno\",\"inglese\",\"ingordo\",\"ingrosso\",\"innesco\",\"inodore\",\"inoltrare\",\"inondato\",\"insano\",\"insetto\",\"insieme\",\"insonnia\",\"insulina\",\"intasato\",\"intero\",\"intonaco\",\"intuito\",\"inumidire\",\"invalido\",\"invece\",\"invito\",\"iperbole\",\"ipnotico\",\"ipotesi\",\"ippica\",\"iride\",\"irlanda\",\"ironico\",\"irrigato\",\"irrorare\",\"isolato\",\"isotopo\",\"isterico\",\"istituto\",\"istrice\",\"italia\",\"iterare\",\"labbro\",\"labirinto\",\"lacca\",\"lacerato\",\"lacrima\",\"lacuna\",\"laddove\",\"lago\",\"lampo\",\"lancetta\",\"lanterna\",\"lardoso\",\"larga\",\"laringe\",\"lastra\",\"latenza\",\"latino\",\"lattuga\",\"lavagna\",\"lavoro\",\"legale\",\"leggero\",\"lembo\",\"lentezza\",\"lenza\",\"leone\",\"lepre\",\"lesivo\",\"lessato\",\"lesto\",\"letterale\",\"leva\",\"levigato\",\"libero\",\"lido\",\"lievito\",\"lilla\",\"limatura\",\"limitare\",\"limpido\",\"lineare\",\"lingua\",\"liquido\",\"lira\",\"lirica\",\"lisca\",\"lite\",\"litigio\",\"livrea\",\"locanda\",\"lode\",\"logica\",\"lombare\",\"londra\",\"longevo\",\"loquace\",\"lorenzo\",\"loto\",\"lotteria\",\"luce\",\"lucidato\",\"lumaca\",\"luminoso\",\"lungo\",\"lupo\",\"luppolo\",\"lusinga\",\"lusso\",\"lutto\",\"macabro\",\"macchina\",\"macero\",\"macinato\",\"madama\",\"magico\",\"maglia\",\"magnete\",\"magro\",\"maiolica\",\"malafede\",\"malgrado\",\"malinteso\",\"malsano\",\"malto\",\"malumore\",\"mana\",\"mancia\",\"mandorla\",\"mangiare\",\"manifesto\",\"mannaro\",\"manovra\",\"mansarda\",\"mantide\",\"manubrio\",\"mappa\",\"maratona\",\"marcire\",\"maretta\",\"marmo\",\"marsupio\",\"maschera\",\"massaia\",\"mastino\",\"materasso\",\"matricola\",\"mattone\",\"maturo\",\"mazurca\",\"meandro\",\"meccanico\",\"mecenate\",\"medesimo\",\"meditare\",\"mega\",\"melassa\",\"melis\",\"melodia\",\"meninge\",\"meno\",\"mensola\",\"mercurio\",\"merenda\",\"merlo\",\"meschino\",\"mese\",\"messere\",\"mestolo\",\"metallo\",\"metodo\",\"mettere\",\"miagolare\",\"mica\",\"micelio\",\"michele\",\"microbo\",\"midollo\",\"miele\",\"migliore\",\"milano\",\"milite\",\"mimosa\",\"minerale\",\"mini\",\"minore\",\"mirino\",\"mirtillo\",\"miscela\",\"missiva\",\"misto\",\"misurare\",\"mitezza\",\"mitigare\",\"mitra\",\"mittente\",\"mnemonico\",\"modello\",\"modifica\",\"modulo\",\"mogano\",\"mogio\",\"mole\",\"molosso\",\"monastero\",\"monco\",\"mondina\",\"monetario\",\"monile\",\"monotono\",\"monsone\",\"montato\",\"monviso\",\"mora\",\"mordere\",\"morsicato\",\"mostro\",\"motivato\",\"motosega\",\"motto\",\"movenza\",\"movimento\",\"mozzo\",\"mucca\",\"mucosa\",\"muffa\",\"mughetto\",\"mugnaio\",\"mulatto\",\"mulinello\",\"multiplo\",\"mummia\",\"munto\",\"muovere\",\"murale\",\"musa\",\"muscolo\",\"musica\",\"mutevole\",\"muto\",\"nababbo\",\"nafta\",\"nanometro\",\"narciso\",\"narice\",\"narrato\",\"nascere\",\"nastrare\",\"naturale\",\"nautica\",\"naviglio\",\"nebulosa\",\"necrosi\",\"negativo\",\"negozio\",\"nemmeno\",\"neofita\",\"neretto\",\"nervo\",\"nessuno\",\"nettuno\",\"neutrale\",\"neve\",\"nevrotico\",\"nicchia\",\"ninfa\",\"nitido\",\"nobile\",\"nocivo\",\"nodo\",\"nome\",\"nomina\",\"nordico\",\"normale\",\"norvegese\",\"nostrano\",\"notare\",\"notizia\",\"notturno\",\"novella\",\"nucleo\",\"nulla\",\"numero\",\"nuovo\",\"nutrire\",\"nuvola\",\"nuziale\",\"oasi\",\"obbedire\",\"obbligo\",\"obelisco\",\"oblio\",\"obolo\",\"obsoleto\",\"occasione\",\"occhio\",\"occidente\",\"occorrere\",\"occultare\",\"ocra\",\"oculato\",\"odierno\",\"odorare\",\"offerta\",\"offrire\",\"offuscato\",\"oggetto\",\"oggi\",\"ognuno\",\"olandese\",\"olfatto\",\"oliato\",\"oliva\",\"ologramma\",\"oltre\",\"omaggio\",\"ombelico\",\"ombra\",\"omega\",\"omissione\",\"ondoso\",\"onere\",\"onice\",\"onnivoro\",\"onorevole\",\"onta\",\"operato\",\"opinione\",\"opposto\",\"oracolo\",\"orafo\",\"ordine\",\"orecchino\",\"orefice\",\"orfano\",\"organico\",\"origine\",\"orizzonte\",\"orma\",\"ormeggio\",\"ornativo\",\"orologio\",\"orrendo\",\"orribile\",\"ortensia\",\"ortica\",\"orzata\",\"orzo\",\"osare\",\"oscurare\",\"osmosi\",\"ospedale\",\"ospite\",\"ossa\",\"ossidare\",\"ostacolo\",\"oste\",\"otite\",\"otre\",\"ottagono\",\"ottimo\",\"ottobre\",\"ovale\",\"ovest\",\"ovino\",\"oviparo\",\"ovocito\",\"ovunque\",\"ovviare\",\"ozio\",\"pacchetto\",\"pace\",\"pacifico\",\"padella\",\"padrone\",\"paese\",\"paga\",\"pagina\",\"palazzina\",\"palesare\",\"pallido\",\"palo\",\"palude\",\"pandoro\",\"pannello\",\"paolo\",\"paonazzo\",\"paprica\",\"parabola\",\"parcella\",\"parere\",\"pargolo\",\"pari\",\"parlato\",\"parola\",\"partire\",\"parvenza\",\"parziale\",\"passivo\",\"pasticca\",\"patacca\",\"patologia\",\"pattume\",\"pavone\",\"peccato\",\"pedalare\",\"pedonale\",\"peggio\",\"peloso\",\"penare\",\"pendice\",\"penisola\",\"pennuto\",\"penombra\",\"pensare\",\"pentola\",\"pepe\",\"pepita\",\"perbene\",\"percorso\",\"perdonato\",\"perforare\",\"pergamena\",\"periodo\",\"permesso\",\"perno\",\"perplesso\",\"persuaso\",\"pertugio\",\"pervaso\",\"pesatore\",\"pesista\",\"peso\",\"pestifero\",\"petalo\",\"pettine\",\"petulante\",\"pezzo\",\"piacere\",\"pianta\",\"piattino\",\"piccino\",\"picozza\",\"piega\",\"pietra\",\"piffero\",\"pigiama\",\"pigolio\",\"pigro\",\"pila\",\"pilifero\",\"pillola\",\"pilota\",\"pimpante\",\"pineta\",\"pinna\",\"pinolo\",\"pioggia\",\"piombo\",\"piramide\",\"piretico\",\"pirite\",\"pirolisi\",\"pitone\",\"pizzico\",\"placebo\",\"planare\",\"plasma\",\"platano\",\"plenario\",\"pochezza\",\"poderoso\",\"podismo\",\"poesia\",\"poggiare\",\"polenta\",\"poligono\",\"pollice\",\"polmonite\",\"polpetta\",\"polso\",\"poltrona\",\"polvere\",\"pomice\",\"pomodoro\",\"ponte\",\"popoloso\",\"porfido\",\"poroso\",\"porpora\",\"porre\",\"portata\",\"posa\",\"positivo\",\"possesso\",\"postulato\",\"potassio\",\"potere\",\"pranzo\",\"prassi\",\"pratica\",\"precluso\",\"predica\",\"prefisso\",\"pregiato\",\"prelievo\",\"premere\",\"prenotare\",\"preparato\",\"presenza\",\"pretesto\",\"prevalso\",\"prima\",\"principe\",\"privato\",\"problema\",\"procura\",\"produrre\",\"profumo\",\"progetto\",\"prolunga\",\"promessa\",\"pronome\",\"proposta\",\"proroga\",\"proteso\",\"prova\",\"prudente\",\"prugna\",\"prurito\",\"psiche\",\"pubblico\",\"pudica\",\"pugilato\",\"pugno\",\"pulce\",\"pulito\",\"pulsante\",\"puntare\",\"pupazzo\",\"pupilla\",\"puro\",\"quadro\",\"qualcosa\",\"quasi\",\"querela\",\"quota\",\"raccolto\",\"raddoppio\",\"radicale\",\"radunato\",\"raffica\",\"ragazzo\",\"ragione\",\"ragno\",\"ramarro\",\"ramingo\",\"ramo\",\"randagio\",\"rantolare\",\"rapato\",\"rapina\",\"rappreso\",\"rasatura\",\"raschiato\",\"rasente\",\"rassegna\",\"rastrello\",\"rata\",\"ravveduto\",\"reale\",\"recepire\",\"recinto\",\"recluta\",\"recondito\",\"recupero\",\"reddito\",\"redimere\",\"regalato\",\"registro\",\"regola\",\"regresso\",\"relazione\",\"remare\",\"remoto\",\"renna\",\"replica\",\"reprimere\",\"reputare\",\"resa\",\"residente\",\"responso\",\"restauro\",\"rete\",\"retina\",\"retorica\",\"rettifica\",\"revocato\",\"riassunto\",\"ribadire\",\"ribelle\",\"ribrezzo\",\"ricarica\",\"ricco\",\"ricevere\",\"riciclato\",\"ricordo\",\"ricreduto\",\"ridicolo\",\"ridurre\",\"rifasare\",\"riflesso\",\"riforma\",\"rifugio\",\"rigare\",\"rigettato\",\"righello\",\"rilassato\",\"rilevato\",\"rimanere\",\"rimbalzo\",\"rimedio\",\"rimorchio\",\"rinascita\",\"rincaro\",\"rinforzo\",\"rinnovo\",\"rinomato\",\"rinsavito\",\"rintocco\",\"rinuncia\",\"rinvenire\",\"riparato\",\"ripetuto\",\"ripieno\",\"riportare\",\"ripresa\",\"ripulire\",\"risata\",\"rischio\",\"riserva\",\"risibile\",\"riso\",\"rispetto\",\"ristoro\",\"risultato\",\"risvolto\",\"ritardo\",\"ritegno\",\"ritmico\",\"ritrovo\",\"riunione\",\"riva\",\"riverso\",\"rivincita\",\"rivolto\",\"rizoma\",\"roba\",\"robotico\",\"robusto\",\"roccia\",\"roco\",\"rodaggio\",\"rodere\",\"roditore\",\"rogito\",\"rollio\",\"romantico\",\"rompere\",\"ronzio\",\"rosolare\",\"rospo\",\"rotante\",\"rotondo\",\"rotula\",\"rovescio\",\"rubizzo\",\"rubrica\",\"ruga\",\"rullino\",\"rumine\",\"rumoroso\",\"ruolo\",\"rupe\",\"russare\",\"rustico\",\"sabato\",\"sabbiare\",\"sabotato\",\"sagoma\",\"salasso\",\"saldatura\",\"salgemma\",\"salivare\",\"salmone\",\"salone\",\"saltare\",\"saluto\",\"salvo\",\"sapere\",\"sapido\",\"saporito\",\"saraceno\",\"sarcasmo\",\"sarto\",\"sassoso\",\"satellite\",\"satira\",\"satollo\",\"saturno\",\"savana\",\"savio\",\"saziato\",\"sbadiglio\",\"sbalzo\",\"sbancato\",\"sbarra\",\"sbattere\",\"sbavare\",\"sbendare\",\"sbirciare\",\"sbloccato\",\"sbocciato\",\"sbrinare\",\"sbruffone\",\"sbuffare\",\"scabroso\",\"scadenza\",\"scala\",\"scambiare\",\"scandalo\",\"scapola\",\"scarso\",\"scatenare\",\"scavato\",\"scelto\",\"scenico\",\"scettro\",\"scheda\",\"schiena\",\"sciarpa\",\"scienza\",\"scindere\",\"scippo\",\"sciroppo\",\"scivolo\",\"sclerare\",\"scodella\",\"scolpito\",\"scomparto\",\"sconforto\",\"scoprire\",\"scorta\",\"scossone\",\"scozzese\",\"scriba\",\"scrollare\",\"scrutinio\",\"scuderia\",\"scultore\",\"scuola\",\"scuro\",\"scusare\",\"sdebitare\",\"sdoganare\",\"seccatura\",\"secondo\",\"sedano\",\"seggiola\",\"segnalato\",\"segregato\",\"seguito\",\"selciato\",\"selettivo\",\"sella\",\"selvaggio\",\"semaforo\",\"sembrare\",\"seme\",\"seminato\",\"sempre\",\"senso\",\"sentire\",\"sepolto\",\"sequenza\",\"serata\",\"serbato\",\"sereno\",\"serio\",\"serpente\",\"serraglio\",\"servire\",\"sestina\",\"setola\",\"settimana\",\"sfacelo\",\"sfaldare\",\"sfamato\",\"sfarzoso\",\"sfaticato\",\"sfera\",\"sfida\",\"sfilato\",\"sfinge\",\"sfocato\",\"sfoderare\",\"sfogo\",\"sfoltire\",\"sforzato\",\"sfratto\",\"sfruttato\",\"sfuggito\",\"sfumare\",\"sfuso\",\"sgabello\",\"sgarbato\",\"sgonfiare\",\"sgorbio\",\"sgrassato\",\"sguardo\",\"sibilo\",\"siccome\",\"sierra\",\"sigla\",\"signore\",\"silenzio\",\"sillaba\",\"simbolo\",\"simpatico\",\"simulato\",\"sinfonia\",\"singolo\",\"sinistro\",\"sino\",\"sintesi\",\"sinusoide\",\"sipario\",\"sisma\",\"sistole\",\"situato\",\"slitta\",\"slogatura\",\"sloveno\",\"smarrito\",\"smemorato\",\"smentito\",\"smeraldo\",\"smilzo\",\"smontare\",\"smottato\",\"smussato\",\"snellire\",\"snervato\",\"snodo\",\"sobbalzo\",\"sobrio\",\"soccorso\",\"sociale\",\"sodale\",\"soffitto\",\"sogno\",\"soldato\",\"solenne\",\"solido\",\"sollazzo\",\"solo\",\"solubile\",\"solvente\",\"somatico\",\"somma\",\"sonda\",\"sonetto\",\"sonnifero\",\"sopire\",\"soppeso\",\"sopra\",\"sorgere\",\"sorpasso\",\"sorriso\",\"sorso\",\"sorteggio\",\"sorvolato\",\"sospiro\",\"sosta\",\"sottile\",\"spada\",\"spalla\",\"spargere\",\"spatola\",\"spavento\",\"spazzola\",\"specie\",\"spedire\",\"spegnere\",\"spelatura\",\"speranza\",\"spessore\",\"spettrale\",\"spezzato\",\"spia\",\"spigoloso\",\"spillato\",\"spinoso\",\"spirale\",\"splendido\",\"sportivo\",\"sposo\",\"spranga\",\"sprecare\",\"spronato\",\"spruzzo\",\"spuntino\",\"squillo\",\"sradicare\",\"srotolato\",\"stabile\",\"stacco\",\"staffa\",\"stagnare\",\"stampato\",\"stantio\",\"starnuto\",\"stasera\",\"statuto\",\"stelo\",\"steppa\",\"sterzo\",\"stiletto\",\"stima\",\"stirpe\",\"stivale\",\"stizzoso\",\"stonato\",\"storico\",\"strappo\",\"stregato\",\"stridulo\",\"strozzare\",\"strutto\",\"stuccare\",\"stufo\",\"stupendo\",\"subentro\",\"succoso\",\"sudore\",\"suggerito\",\"sugo\",\"sultano\",\"suonare\",\"superbo\",\"supporto\",\"surgelato\",\"surrogato\",\"sussurro\",\"sutura\",\"svagare\",\"svedese\",\"sveglio\",\"svelare\",\"svenuto\",\"svezia\",\"sviluppo\",\"svista\",\"svizzera\",\"svolta\",\"svuotare\",\"tabacco\",\"tabulato\",\"tacciare\",\"taciturno\",\"tale\",\"talismano\",\"tampone\",\"tannino\",\"tara\",\"tardivo\",\"targato\",\"tariffa\",\"tarpare\",\"tartaruga\",\"tasto\",\"tattico\",\"taverna\",\"tavolata\",\"tazza\",\"teca\",\"tecnico\",\"telefono\",\"temerario\",\"tempo\",\"temuto\",\"tendone\",\"tenero\",\"tensione\",\"tentacolo\",\"teorema\",\"terme\",\"terrazzo\",\"terzetto\",\"tesi\",\"tesserato\",\"testato\",\"tetro\",\"tettoia\",\"tifare\",\"tigella\",\"timbro\",\"tinto\",\"tipico\",\"tipografo\",\"tiraggio\",\"tiro\",\"titanio\",\"titolo\",\"titubante\",\"tizio\",\"tizzone\",\"toccare\",\"tollerare\",\"tolto\",\"tombola\",\"tomo\",\"tonfo\",\"tonsilla\",\"topazio\",\"topologia\",\"toppa\",\"torba\",\"tornare\",\"torrone\",\"tortora\",\"toscano\",\"tossire\",\"tostatura\",\"totano\",\"trabocco\",\"trachea\",\"trafila\",\"tragedia\",\"tralcio\",\"tramonto\",\"transito\",\"trapano\",\"trarre\",\"trasloco\",\"trattato\",\"trave\",\"treccia\",\"tremolio\",\"trespolo\",\"tributo\",\"tricheco\",\"trifoglio\",\"trillo\",\"trincea\",\"trio\",\"tristezza\",\"triturato\",\"trivella\",\"tromba\",\"trono\",\"troppo\",\"trottola\",\"trovare\",\"truccato\",\"tubatura\",\"tuffato\",\"tulipano\",\"tumulto\",\"tunisia\",\"turbare\",\"turchino\",\"tuta\",\"tutela\",\"ubicato\",\"uccello\",\"uccisore\",\"udire\",\"uditivo\",\"uffa\",\"ufficio\",\"uguale\",\"ulisse\",\"ultimato\",\"umano\",\"umile\",\"umorismo\",\"uncinetto\",\"ungere\",\"ungherese\",\"unicorno\",\"unificato\",\"unisono\",\"unitario\",\"unte\",\"uovo\",\"upupa\",\"uragano\",\"urgenza\",\"urlo\",\"usanza\",\"usato\",\"uscito\",\"usignolo\",\"usuraio\",\"utensile\",\"utilizzo\",\"utopia\",\"vacante\",\"vaccinato\",\"vagabondo\",\"vagliato\",\"valanga\",\"valgo\",\"valico\",\"valletta\",\"valoroso\",\"valutare\",\"valvola\",\"vampata\",\"vangare\",\"vanitoso\",\"vano\",\"vantaggio\",\"vanvera\",\"vapore\",\"varano\",\"varcato\",\"variante\",\"vasca\",\"vedetta\",\"vedova\",\"veduto\",\"vegetale\",\"veicolo\",\"velcro\",\"velina\",\"velluto\",\"veloce\",\"venato\",\"vendemmia\",\"vento\",\"verace\",\"verbale\",\"vergogna\",\"verifica\",\"vero\",\"verruca\",\"verticale\",\"vescica\",\"vessillo\",\"vestale\",\"veterano\",\"vetrina\",\"vetusto\",\"viandante\",\"vibrante\",\"vicenda\",\"vichingo\",\"vicinanza\",\"vidimare\",\"vigilia\",\"vigneto\",\"vigore\",\"vile\",\"villano\",\"vimini\",\"vincitore\",\"viola\",\"vipera\",\"virgola\",\"virologo\",\"virulento\",\"viscoso\",\"visione\",\"vispo\",\"vissuto\",\"visura\",\"vita\",\"vitello\",\"vittima\",\"vivanda\",\"vivido\",\"viziare\",\"voce\",\"voga\",\"volatile\",\"volere\",\"volpe\",\"voragine\",\"vulcano\",\"zampogna\",\"zanna\",\"zappato\",\"zattera\",\"zavorra\",\"zefiro\",\"zelante\",\"zelo\",\"zenzero\",\"zerbino\",\"zibetto\",\"zinco\",\"zircone\",\"zitto\",\"zolla\",\"zotico\",\"zucchero\",\"zufolo\",\"zulu\",\"zuppa\"]");

const require$$6 = /* #__PURE__ */ JSON.parse("[\"ábaco\",\"abdomen\",\"abeja\",\"abierto\",\"abogado\",\"abono\",\"aborto\",\"abrazo\",\"abrir\",\"abuelo\",\"abuso\",\"acabar\",\"academia\",\"acceso\",\"acción\",\"aceite\",\"acelga\",\"acento\",\"aceptar\",\"ácido\",\"aclarar\",\"acné\",\"acoger\",\"acoso\",\"activo\",\"acto\",\"actriz\",\"actuar\",\"acudir\",\"acuerdo\",\"acusar\",\"adicto\",\"admitir\",\"adoptar\",\"adorno\",\"aduana\",\"adulto\",\"aéreo\",\"afectar\",\"afición\",\"afinar\",\"afirmar\",\"ágil\",\"agitar\",\"agonía\",\"agosto\",\"agotar\",\"agregar\",\"agrio\",\"agua\",\"agudo\",\"águila\",\"aguja\",\"ahogo\",\"ahorro\",\"aire\",\"aislar\",\"ajedrez\",\"ajeno\",\"ajuste\",\"alacrán\",\"alambre\",\"alarma\",\"alba\",\"álbum\",\"alcalde\",\"aldea\",\"alegre\",\"alejar\",\"alerta\",\"aleta\",\"alfiler\",\"alga\",\"algodón\",\"aliado\",\"aliento\",\"alivio\",\"alma\",\"almeja\",\"almíbar\",\"altar\",\"alteza\",\"altivo\",\"alto\",\"altura\",\"alumno\",\"alzar\",\"amable\",\"amante\",\"amapola\",\"amargo\",\"amasar\",\"ámbar\",\"ámbito\",\"ameno\",\"amigo\",\"amistad\",\"amor\",\"amparo\",\"amplio\",\"ancho\",\"anciano\",\"ancla\",\"andar\",\"andén\",\"anemia\",\"ángulo\",\"anillo\",\"ánimo\",\"anís\",\"anotar\",\"antena\",\"antiguo\",\"antojo\",\"anual\",\"anular\",\"anuncio\",\"añadir\",\"añejo\",\"año\",\"apagar\",\"aparato\",\"apetito\",\"apio\",\"aplicar\",\"apodo\",\"aporte\",\"apoyo\",\"aprender\",\"aprobar\",\"apuesta\",\"apuro\",\"arado\",\"araña\",\"arar\",\"árbitro\",\"árbol\",\"arbusto\",\"archivo\",\"arco\",\"arder\",\"ardilla\",\"arduo\",\"área\",\"árido\",\"aries\",\"armonía\",\"arnés\",\"aroma\",\"arpa\",\"arpón\",\"arreglo\",\"arroz\",\"arruga\",\"arte\",\"artista\",\"asa\",\"asado\",\"asalto\",\"ascenso\",\"asegurar\",\"aseo\",\"asesor\",\"asiento\",\"asilo\",\"asistir\",\"asno\",\"asombro\",\"áspero\",\"astilla\",\"astro\",\"astuto\",\"asumir\",\"asunto\",\"atajo\",\"ataque\",\"atar\",\"atento\",\"ateo\",\"ático\",\"atleta\",\"átomo\",\"atraer\",\"atroz\",\"atún\",\"audaz\",\"audio\",\"auge\",\"aula\",\"aumento\",\"ausente\",\"autor\",\"aval\",\"avance\",\"avaro\",\"ave\",\"avellana\",\"avena\",\"avestruz\",\"avión\",\"aviso\",\"ayer\",\"ayuda\",\"ayuno\",\"azafrán\",\"azar\",\"azote\",\"azúcar\",\"azufre\",\"azul\",\"baba\",\"babor\",\"bache\",\"bahía\",\"baile\",\"bajar\",\"balanza\",\"balcón\",\"balde\",\"bambú\",\"banco\",\"banda\",\"baño\",\"barba\",\"barco\",\"barniz\",\"barro\",\"báscula\",\"bastón\",\"basura\",\"batalla\",\"batería\",\"batir\",\"batuta\",\"baúl\",\"bazar\",\"bebé\",\"bebida\",\"bello\",\"besar\",\"beso\",\"bestia\",\"bicho\",\"bien\",\"bingo\",\"blanco\",\"bloque\",\"blusa\",\"boa\",\"bobina\",\"bobo\",\"boca\",\"bocina\",\"boda\",\"bodega\",\"boina\",\"bola\",\"bolero\",\"bolsa\",\"bomba\",\"bondad\",\"bonito\",\"bono\",\"bonsái\",\"borde\",\"borrar\",\"bosque\",\"bote\",\"botín\",\"bóveda\",\"bozal\",\"bravo\",\"brazo\",\"brecha\",\"breve\",\"brillo\",\"brinco\",\"brisa\",\"broca\",\"broma\",\"bronce\",\"brote\",\"bruja\",\"brusco\",\"bruto\",\"buceo\",\"bucle\",\"bueno\",\"buey\",\"bufanda\",\"bufón\",\"búho\",\"buitre\",\"bulto\",\"burbuja\",\"burla\",\"burro\",\"buscar\",\"butaca\",\"buzón\",\"caballo\",\"cabeza\",\"cabina\",\"cabra\",\"cacao\",\"cadáver\",\"cadena\",\"caer\",\"café\",\"caída\",\"caimán\",\"caja\",\"cajón\",\"cal\",\"calamar\",\"calcio\",\"caldo\",\"calidad\",\"calle\",\"calma\",\"calor\",\"calvo\",\"cama\",\"cambio\",\"camello\",\"camino\",\"campo\",\"cáncer\",\"candil\",\"canela\",\"canguro\",\"canica\",\"canto\",\"caña\",\"cañón\",\"caoba\",\"caos\",\"capaz\",\"capitán\",\"capote\",\"captar\",\"capucha\",\"cara\",\"carbón\",\"cárcel\",\"careta\",\"carga\",\"cariño\",\"carne\",\"carpeta\",\"carro\",\"carta\",\"casa\",\"casco\",\"casero\",\"caspa\",\"castor\",\"catorce\",\"catre\",\"caudal\",\"causa\",\"cazo\",\"cebolla\",\"ceder\",\"cedro\",\"celda\",\"célebre\",\"celoso\",\"célula\",\"cemento\",\"ceniza\",\"centro\",\"cerca\",\"cerdo\",\"cereza\",\"cero\",\"cerrar\",\"certeza\",\"césped\",\"cetro\",\"chacal\",\"chaleco\",\"champú\",\"chancla\",\"chapa\",\"charla\",\"chico\",\"chiste\",\"chivo\",\"choque\",\"choza\",\"chuleta\",\"chupar\",\"ciclón\",\"ciego\",\"cielo\",\"cien\",\"cierto\",\"cifra\",\"cigarro\",\"cima\",\"cinco\",\"cine\",\"cinta\",\"ciprés\",\"circo\",\"ciruela\",\"cisne\",\"cita\",\"ciudad\",\"clamor\",\"clan\",\"claro\",\"clase\",\"clave\",\"cliente\",\"clima\",\"clínica\",\"cobre\",\"cocción\",\"cochino\",\"cocina\",\"coco\",\"código\",\"codo\",\"cofre\",\"coger\",\"cohete\",\"cojín\",\"cojo\",\"cola\",\"colcha\",\"colegio\",\"colgar\",\"colina\",\"collar\",\"colmo\",\"columna\",\"combate\",\"comer\",\"comida\",\"cómodo\",\"compra\",\"conde\",\"conejo\",\"conga\",\"conocer\",\"consejo\",\"contar\",\"copa\",\"copia\",\"corazón\",\"corbata\",\"corcho\",\"cordón\",\"corona\",\"correr\",\"coser\",\"cosmos\",\"costa\",\"cráneo\",\"cráter\",\"crear\",\"crecer\",\"creído\",\"crema\",\"cría\",\"crimen\",\"cripta\",\"crisis\",\"cromo\",\"crónica\",\"croqueta\",\"crudo\",\"cruz\",\"cuadro\",\"cuarto\",\"cuatro\",\"cubo\",\"cubrir\",\"cuchara\",\"cuello\",\"cuento\",\"cuerda\",\"cuesta\",\"cueva\",\"cuidar\",\"culebra\",\"culpa\",\"culto\",\"cumbre\",\"cumplir\",\"cuna\",\"cuneta\",\"cuota\",\"cupón\",\"cúpula\",\"curar\",\"curioso\",\"curso\",\"curva\",\"cutis\",\"dama\",\"danza\",\"dar\",\"dardo\",\"dátil\",\"deber\",\"débil\",\"década\",\"decir\",\"dedo\",\"defensa\",\"definir\",\"dejar\",\"delfín\",\"delgado\",\"delito\",\"demora\",\"denso\",\"dental\",\"deporte\",\"derecho\",\"derrota\",\"desayuno\",\"deseo\",\"desfile\",\"desnudo\",\"destino\",\"desvío\",\"detalle\",\"detener\",\"deuda\",\"día\",\"diablo\",\"diadema\",\"diamante\",\"diana\",\"diario\",\"dibujo\",\"dictar\",\"diente\",\"dieta\",\"diez\",\"difícil\",\"digno\",\"dilema\",\"diluir\",\"dinero\",\"directo\",\"dirigir\",\"disco\",\"diseño\",\"disfraz\",\"diva\",\"divino\",\"doble\",\"doce\",\"dolor\",\"domingo\",\"don\",\"donar\",\"dorado\",\"dormir\",\"dorso\",\"dos\",\"dosis\",\"dragón\",\"droga\",\"ducha\",\"duda\",\"duelo\",\"dueño\",\"dulce\",\"dúo\",\"duque\",\"durar\",\"dureza\",\"duro\",\"ébano\",\"ebrio\",\"echar\",\"eco\",\"ecuador\",\"edad\",\"edición\",\"edificio\",\"editor\",\"educar\",\"efecto\",\"eficaz\",\"eje\",\"ejemplo\",\"elefante\",\"elegir\",\"elemento\",\"elevar\",\"elipse\",\"élite\",\"elixir\",\"elogio\",\"eludir\",\"embudo\",\"emitir\",\"emoción\",\"empate\",\"empeño\",\"empleo\",\"empresa\",\"enano\",\"encargo\",\"enchufe\",\"encía\",\"enemigo\",\"enero\",\"enfado\",\"enfermo\",\"engaño\",\"enigma\",\"enlace\",\"enorme\",\"enredo\",\"ensayo\",\"enseñar\",\"entero\",\"entrar\",\"envase\",\"envío\",\"época\",\"equipo\",\"erizo\",\"escala\",\"escena\",\"escolar\",\"escribir\",\"escudo\",\"esencia\",\"esfera\",\"esfuerzo\",\"espada\",\"espejo\",\"espía\",\"esposa\",\"espuma\",\"esquí\",\"estar\",\"este\",\"estilo\",\"estufa\",\"etapa\",\"eterno\",\"ética\",\"etnia\",\"evadir\",\"evaluar\",\"evento\",\"evitar\",\"exacto\",\"examen\",\"exceso\",\"excusa\",\"exento\",\"exigir\",\"exilio\",\"existir\",\"éxito\",\"experto\",\"explicar\",\"exponer\",\"extremo\",\"fábrica\",\"fábula\",\"fachada\",\"fácil\",\"factor\",\"faena\",\"faja\",\"falda\",\"fallo\",\"falso\",\"faltar\",\"fama\",\"familia\",\"famoso\",\"faraón\",\"farmacia\",\"farol\",\"farsa\",\"fase\",\"fatiga\",\"fauna\",\"favor\",\"fax\",\"febrero\",\"fecha\",\"feliz\",\"feo\",\"feria\",\"feroz\",\"fértil\",\"fervor\",\"festín\",\"fiable\",\"fianza\",\"fiar\",\"fibra\",\"ficción\",\"ficha\",\"fideo\",\"fiebre\",\"fiel\",\"fiera\",\"fiesta\",\"figura\",\"fijar\",\"fijo\",\"fila\",\"filete\",\"filial\",\"filtro\",\"fin\",\"finca\",\"fingir\",\"finito\",\"firma\",\"flaco\",\"flauta\",\"flecha\",\"flor\",\"flota\",\"fluir\",\"flujo\",\"flúor\",\"fobia\",\"foca\",\"fogata\",\"fogón\",\"folio\",\"folleto\",\"fondo\",\"forma\",\"forro\",\"fortuna\",\"forzar\",\"fosa\",\"foto\",\"fracaso\",\"frágil\",\"franja\",\"frase\",\"fraude\",\"freír\",\"freno\",\"fresa\",\"frío\",\"frito\",\"fruta\",\"fuego\",\"fuente\",\"fuerza\",\"fuga\",\"fumar\",\"función\",\"funda\",\"furgón\",\"furia\",\"fusil\",\"fútbol\",\"futuro\",\"gacela\",\"gafas\",\"gaita\",\"gajo\",\"gala\",\"galería\",\"gallo\",\"gamba\",\"ganar\",\"gancho\",\"ganga\",\"ganso\",\"garaje\",\"garza\",\"gasolina\",\"gastar\",\"gato\",\"gavilán\",\"gemelo\",\"gemir\",\"gen\",\"género\",\"genio\",\"gente\",\"geranio\",\"gerente\",\"germen\",\"gesto\",\"gigante\",\"gimnasio\",\"girar\",\"giro\",\"glaciar\",\"globo\",\"gloria\",\"gol\",\"golfo\",\"goloso\",\"golpe\",\"goma\",\"gordo\",\"gorila\",\"gorra\",\"gota\",\"goteo\",\"gozar\",\"grada\",\"gráfico\",\"grano\",\"grasa\",\"gratis\",\"grave\",\"grieta\",\"grillo\",\"gripe\",\"gris\",\"grito\",\"grosor\",\"grúa\",\"grueso\",\"grumo\",\"grupo\",\"guante\",\"guapo\",\"guardia\",\"guerra\",\"guía\",\"guiño\",\"guion\",\"guiso\",\"guitarra\",\"gusano\",\"gustar\",\"haber\",\"hábil\",\"hablar\",\"hacer\",\"hacha\",\"hada\",\"hallar\",\"hamaca\",\"harina\",\"haz\",\"hazaña\",\"hebilla\",\"hebra\",\"hecho\",\"helado\",\"helio\",\"hembra\",\"herir\",\"hermano\",\"héroe\",\"hervir\",\"hielo\",\"hierro\",\"hígado\",\"higiene\",\"hijo\",\"himno\",\"historia\",\"hocico\",\"hogar\",\"hoguera\",\"hoja\",\"hombre\",\"hongo\",\"honor\",\"honra\",\"hora\",\"hormiga\",\"horno\",\"hostil\",\"hoyo\",\"hueco\",\"huelga\",\"huerta\",\"hueso\",\"huevo\",\"huida\",\"huir\",\"humano\",\"húmedo\",\"humilde\",\"humo\",\"hundir\",\"huracán\",\"hurto\",\"icono\",\"ideal\",\"idioma\",\"ídolo\",\"iglesia\",\"iglú\",\"igual\",\"ilegal\",\"ilusión\",\"imagen\",\"imán\",\"imitar\",\"impar\",\"imperio\",\"imponer\",\"impulso\",\"incapaz\",\"índice\",\"inerte\",\"infiel\",\"informe\",\"ingenio\",\"inicio\",\"inmenso\",\"inmune\",\"innato\",\"insecto\",\"instante\",\"interés\",\"íntimo\",\"intuir\",\"inútil\",\"invierno\",\"ira\",\"iris\",\"ironía\",\"isla\",\"islote\",\"jabalí\",\"jabón\",\"jamón\",\"jarabe\",\"jardín\",\"jarra\",\"jaula\",\"jazmín\",\"jefe\",\"jeringa\",\"jinete\",\"jornada\",\"joroba\",\"joven\",\"joya\",\"juerga\",\"jueves\",\"juez\",\"jugador\",\"jugo\",\"juguete\",\"juicio\",\"junco\",\"jungla\",\"junio\",\"juntar\",\"júpiter\",\"jurar\",\"justo\",\"juvenil\",\"juzgar\",\"kilo\",\"koala\",\"labio\",\"lacio\",\"lacra\",\"lado\",\"ladrón\",\"lagarto\",\"lágrima\",\"laguna\",\"laico\",\"lamer\",\"lámina\",\"lámpara\",\"lana\",\"lancha\",\"langosta\",\"lanza\",\"lápiz\",\"largo\",\"larva\",\"lástima\",\"lata\",\"látex\",\"latir\",\"laurel\",\"lavar\",\"lazo\",\"leal\",\"lección\",\"leche\",\"lector\",\"leer\",\"legión\",\"legumbre\",\"lejano\",\"lengua\",\"lento\",\"leña\",\"león\",\"leopardo\",\"lesión\",\"letal\",\"letra\",\"leve\",\"leyenda\",\"libertad\",\"libro\",\"licor\",\"líder\",\"lidiar\",\"lienzo\",\"liga\",\"ligero\",\"lima\",\"límite\",\"limón\",\"limpio\",\"lince\",\"lindo\",\"línea\",\"lingote\",\"lino\",\"linterna\",\"líquido\",\"liso\",\"lista\",\"litera\",\"litio\",\"litro\",\"llaga\",\"llama\",\"llanto\",\"llave\",\"llegar\",\"llenar\",\"llevar\",\"llorar\",\"llover\",\"lluvia\",\"lobo\",\"loción\",\"loco\",\"locura\",\"lógica\",\"logro\",\"lombriz\",\"lomo\",\"lonja\",\"lote\",\"lucha\",\"lucir\",\"lugar\",\"lujo\",\"luna\",\"lunes\",\"lupa\",\"lustro\",\"luto\",\"luz\",\"maceta\",\"macho\",\"madera\",\"madre\",\"maduro\",\"maestro\",\"mafia\",\"magia\",\"mago\",\"maíz\",\"maldad\",\"maleta\",\"malla\",\"malo\",\"mamá\",\"mambo\",\"mamut\",\"manco\",\"mando\",\"manejar\",\"manga\",\"maniquí\",\"manjar\",\"mano\",\"manso\",\"manta\",\"mañana\",\"mapa\",\"máquina\",\"mar\",\"marco\",\"marea\",\"marfil\",\"margen\",\"marido\",\"mármol\",\"marrón\",\"martes\",\"marzo\",\"masa\",\"máscara\",\"masivo\",\"matar\",\"materia\",\"matiz\",\"matriz\",\"máximo\",\"mayor\",\"mazorca\",\"mecha\",\"medalla\",\"medio\",\"médula\",\"mejilla\",\"mejor\",\"melena\",\"melón\",\"memoria\",\"menor\",\"mensaje\",\"mente\",\"menú\",\"mercado\",\"merengue\",\"mérito\",\"mes\",\"mesón\",\"meta\",\"meter\",\"método\",\"metro\",\"mezcla\",\"miedo\",\"miel\",\"miembro\",\"miga\",\"mil\",\"milagro\",\"militar\",\"millón\",\"mimo\",\"mina\",\"minero\",\"mínimo\",\"minuto\",\"miope\",\"mirar\",\"misa\",\"miseria\",\"misil\",\"mismo\",\"mitad\",\"mito\",\"mochila\",\"moción\",\"moda\",\"modelo\",\"moho\",\"mojar\",\"molde\",\"moler\",\"molino\",\"momento\",\"momia\",\"monarca\",\"moneda\",\"monja\",\"monto\",\"moño\",\"morada\",\"morder\",\"moreno\",\"morir\",\"morro\",\"morsa\",\"mortal\",\"mosca\",\"mostrar\",\"motivo\",\"mover\",\"móvil\",\"mozo\",\"mucho\",\"mudar\",\"mueble\",\"muela\",\"muerte\",\"muestra\",\"mugre\",\"mujer\",\"mula\",\"muleta\",\"multa\",\"mundo\",\"muñeca\",\"mural\",\"muro\",\"músculo\",\"museo\",\"musgo\",\"música\",\"muslo\",\"nácar\",\"nación\",\"nadar\",\"naipe\",\"naranja\",\"nariz\",\"narrar\",\"nasal\",\"natal\",\"nativo\",\"natural\",\"náusea\",\"naval\",\"nave\",\"navidad\",\"necio\",\"néctar\",\"negar\",\"negocio\",\"negro\",\"neón\",\"nervio\",\"neto\",\"neutro\",\"nevar\",\"nevera\",\"nicho\",\"nido\",\"niebla\",\"nieto\",\"niñez\",\"niño\",\"nítido\",\"nivel\",\"nobleza\",\"noche\",\"nómina\",\"noria\",\"norma\",\"norte\",\"nota\",\"noticia\",\"novato\",\"novela\",\"novio\",\"nube\",\"nuca\",\"núcleo\",\"nudillo\",\"nudo\",\"nuera\",\"nueve\",\"nuez\",\"nulo\",\"número\",\"nutria\",\"oasis\",\"obeso\",\"obispo\",\"objeto\",\"obra\",\"obrero\",\"observar\",\"obtener\",\"obvio\",\"oca\",\"ocaso\",\"océano\",\"ochenta\",\"ocho\",\"ocio\",\"ocre\",\"octavo\",\"octubre\",\"oculto\",\"ocupar\",\"ocurrir\",\"odiar\",\"odio\",\"odisea\",\"oeste\",\"ofensa\",\"oferta\",\"oficio\",\"ofrecer\",\"ogro\",\"oído\",\"oír\",\"ojo\",\"ola\",\"oleada\",\"olfato\",\"olivo\",\"olla\",\"olmo\",\"olor\",\"olvido\",\"ombligo\",\"onda\",\"onza\",\"opaco\",\"opción\",\"ópera\",\"opinar\",\"oponer\",\"optar\",\"óptica\",\"opuesto\",\"oración\",\"orador\",\"oral\",\"órbita\",\"orca\",\"orden\",\"oreja\",\"órgano\",\"orgía\",\"orgullo\",\"oriente\",\"origen\",\"orilla\",\"oro\",\"orquesta\",\"oruga\",\"osadía\",\"oscuro\",\"osezno\",\"oso\",\"ostra\",\"otoño\",\"otro\",\"oveja\",\"óvulo\",\"óxido\",\"oxígeno\",\"oyente\",\"ozono\",\"pacto\",\"padre\",\"paella\",\"página\",\"pago\",\"país\",\"pájaro\",\"palabra\",\"palco\",\"paleta\",\"pálido\",\"palma\",\"paloma\",\"palpar\",\"pan\",\"panal\",\"pánico\",\"pantera\",\"pañuelo\",\"papá\",\"papel\",\"papilla\",\"paquete\",\"parar\",\"parcela\",\"pared\",\"parir\",\"paro\",\"párpado\",\"parque\",\"párrafo\",\"parte\",\"pasar\",\"paseo\",\"pasión\",\"paso\",\"pasta\",\"pata\",\"patio\",\"patria\",\"pausa\",\"pauta\",\"pavo\",\"payaso\",\"peatón\",\"pecado\",\"pecera\",\"pecho\",\"pedal\",\"pedir\",\"pegar\",\"peine\",\"pelar\",\"peldaño\",\"pelea\",\"peligro\",\"pellejo\",\"pelo\",\"peluca\",\"pena\",\"pensar\",\"peñón\",\"peón\",\"peor\",\"pepino\",\"pequeño\",\"pera\",\"percha\",\"perder\",\"pereza\",\"perfil\",\"perico\",\"perla\",\"permiso\",\"perro\",\"persona\",\"pesa\",\"pesca\",\"pésimo\",\"pestaña\",\"pétalo\",\"petróleo\",\"pez\",\"pezuña\",\"picar\",\"pichón\",\"pie\",\"piedra\",\"pierna\",\"pieza\",\"pijama\",\"pilar\",\"piloto\",\"pimienta\",\"pino\",\"pintor\",\"pinza\",\"piña\",\"piojo\",\"pipa\",\"pirata\",\"pisar\",\"piscina\",\"piso\",\"pista\",\"pitón\",\"pizca\",\"placa\",\"plan\",\"plata\",\"playa\",\"plaza\",\"pleito\",\"pleno\",\"plomo\",\"pluma\",\"plural\",\"pobre\",\"poco\",\"poder\",\"podio\",\"poema\",\"poesía\",\"poeta\",\"polen\",\"policía\",\"pollo\",\"polvo\",\"pomada\",\"pomelo\",\"pomo\",\"pompa\",\"poner\",\"porción\",\"portal\",\"posada\",\"poseer\",\"posible\",\"poste\",\"potencia\",\"potro\",\"pozo\",\"prado\",\"precoz\",\"pregunta\",\"premio\",\"prensa\",\"preso\",\"previo\",\"primo\",\"príncipe\",\"prisión\",\"privar\",\"proa\",\"probar\",\"proceso\",\"producto\",\"proeza\",\"profesor\",\"programa\",\"prole\",\"promesa\",\"pronto\",\"propio\",\"próximo\",\"prueba\",\"público\",\"puchero\",\"pudor\",\"pueblo\",\"puerta\",\"puesto\",\"pulga\",\"pulir\",\"pulmón\",\"pulpo\",\"pulso\",\"puma\",\"punto\",\"puñal\",\"puño\",\"pupa\",\"pupila\",\"puré\",\"quedar\",\"queja\",\"quemar\",\"querer\",\"queso\",\"quieto\",\"química\",\"quince\",\"quitar\",\"rábano\",\"rabia\",\"rabo\",\"ración\",\"radical\",\"raíz\",\"rama\",\"rampa\",\"rancho\",\"rango\",\"rapaz\",\"rápido\",\"rapto\",\"rasgo\",\"raspa\",\"rato\",\"rayo\",\"raza\",\"razón\",\"reacción\",\"realidad\",\"rebaño\",\"rebote\",\"recaer\",\"receta\",\"rechazo\",\"recoger\",\"recreo\",\"recto\",\"recurso\",\"red\",\"redondo\",\"reducir\",\"reflejo\",\"reforma\",\"refrán\",\"refugio\",\"regalo\",\"regir\",\"regla\",\"regreso\",\"rehén\",\"reino\",\"reír\",\"reja\",\"relato\",\"relevo\",\"relieve\",\"relleno\",\"reloj\",\"remar\",\"remedio\",\"remo\",\"rencor\",\"rendir\",\"renta\",\"reparto\",\"repetir\",\"reposo\",\"reptil\",\"res\",\"rescate\",\"resina\",\"respeto\",\"resto\",\"resumen\",\"retiro\",\"retorno\",\"retrato\",\"reunir\",\"revés\",\"revista\",\"rey\",\"rezar\",\"rico\",\"riego\",\"rienda\",\"riesgo\",\"rifa\",\"rígido\",\"rigor\",\"rincón\",\"riñón\",\"río\",\"riqueza\",\"risa\",\"ritmo\",\"rito\",\"rizo\",\"roble\",\"roce\",\"rociar\",\"rodar\",\"rodeo\",\"rodilla\",\"roer\",\"rojizo\",\"rojo\",\"romero\",\"romper\",\"ron\",\"ronco\",\"ronda\",\"ropa\",\"ropero\",\"rosa\",\"rosca\",\"rostro\",\"rotar\",\"rubí\",\"rubor\",\"rudo\",\"rueda\",\"rugir\",\"ruido\",\"ruina\",\"ruleta\",\"rulo\",\"rumbo\",\"rumor\",\"ruptura\",\"ruta\",\"rutina\",\"sábado\",\"saber\",\"sabio\",\"sable\",\"sacar\",\"sagaz\",\"sagrado\",\"sala\",\"saldo\",\"salero\",\"salir\",\"salmón\",\"salón\",\"salsa\",\"salto\",\"salud\",\"salvar\",\"samba\",\"sanción\",\"sandía\",\"sanear\",\"sangre\",\"sanidad\",\"sano\",\"santo\",\"sapo\",\"saque\",\"sardina\",\"sartén\",\"sastre\",\"satán\",\"sauna\",\"saxofón\",\"sección\",\"seco\",\"secreto\",\"secta\",\"sed\",\"seguir\",\"seis\",\"sello\",\"selva\",\"semana\",\"semilla\",\"senda\",\"sensor\",\"señal\",\"señor\",\"separar\",\"sepia\",\"sequía\",\"ser\",\"serie\",\"sermón\",\"servir\",\"sesenta\",\"sesión\",\"seta\",\"setenta\",\"severo\",\"sexo\",\"sexto\",\"sidra\",\"siesta\",\"siete\",\"siglo\",\"signo\",\"sílaba\",\"silbar\",\"silencio\",\"silla\",\"símbolo\",\"simio\",\"sirena\",\"sistema\",\"sitio\",\"situar\",\"sobre\",\"socio\",\"sodio\",\"sol\",\"solapa\",\"soldado\",\"soledad\",\"sólido\",\"soltar\",\"solución\",\"sombra\",\"sondeo\",\"sonido\",\"sonoro\",\"sonrisa\",\"sopa\",\"soplar\",\"soporte\",\"sordo\",\"sorpresa\",\"sorteo\",\"sostén\",\"sótano\",\"suave\",\"subir\",\"suceso\",\"sudor\",\"suegra\",\"suelo\",\"sueño\",\"suerte\",\"sufrir\",\"sujeto\",\"sultán\",\"sumar\",\"superar\",\"suplir\",\"suponer\",\"supremo\",\"sur\",\"surco\",\"sureño\",\"surgir\",\"susto\",\"sutil\",\"tabaco\",\"tabique\",\"tabla\",\"tabú\",\"taco\",\"tacto\",\"tajo\",\"talar\",\"talco\",\"talento\",\"talla\",\"talón\",\"tamaño\",\"tambor\",\"tango\",\"tanque\",\"tapa\",\"tapete\",\"tapia\",\"tapón\",\"taquilla\",\"tarde\",\"tarea\",\"tarifa\",\"tarjeta\",\"tarot\",\"tarro\",\"tarta\",\"tatuaje\",\"tauro\",\"taza\",\"tazón\",\"teatro\",\"techo\",\"tecla\",\"técnica\",\"tejado\",\"tejer\",\"tejido\",\"tela\",\"teléfono\",\"tema\",\"temor\",\"templo\",\"tenaz\",\"tender\",\"tener\",\"tenis\",\"tenso\",\"teoría\",\"terapia\",\"terco\",\"término\",\"ternura\",\"terror\",\"tesis\",\"tesoro\",\"testigo\",\"tetera\",\"texto\",\"tez\",\"tibio\",\"tiburón\",\"tiempo\",\"tienda\",\"tierra\",\"tieso\",\"tigre\",\"tijera\",\"tilde\",\"timbre\",\"tímido\",\"timo\",\"tinta\",\"tío\",\"típico\",\"tipo\",\"tira\",\"tirón\",\"titán\",\"títere\",\"título\",\"tiza\",\"toalla\",\"tobillo\",\"tocar\",\"tocino\",\"todo\",\"toga\",\"toldo\",\"tomar\",\"tono\",\"tonto\",\"topar\",\"tope\",\"toque\",\"tórax\",\"torero\",\"tormenta\",\"torneo\",\"toro\",\"torpedo\",\"torre\",\"torso\",\"tortuga\",\"tos\",\"tosco\",\"toser\",\"tóxico\",\"trabajo\",\"tractor\",\"traer\",\"tráfico\",\"trago\",\"traje\",\"tramo\",\"trance\",\"trato\",\"trauma\",\"trazar\",\"trébol\",\"tregua\",\"treinta\",\"tren\",\"trepar\",\"tres\",\"tribu\",\"trigo\",\"tripa\",\"triste\",\"triunfo\",\"trofeo\",\"trompa\",\"tronco\",\"tropa\",\"trote\",\"trozo\",\"truco\",\"trueno\",\"trufa\",\"tubería\",\"tubo\",\"tuerto\",\"tumba\",\"tumor\",\"túnel\",\"túnica\",\"turbina\",\"turismo\",\"turno\",\"tutor\",\"ubicar\",\"úlcera\",\"umbral\",\"unidad\",\"unir\",\"universo\",\"uno\",\"untar\",\"uña\",\"urbano\",\"urbe\",\"urgente\",\"urna\",\"usar\",\"usuario\",\"útil\",\"utopía\",\"uva\",\"vaca\",\"vacío\",\"vacuna\",\"vagar\",\"vago\",\"vaina\",\"vajilla\",\"vale\",\"válido\",\"valle\",\"valor\",\"válvula\",\"vampiro\",\"vara\",\"variar\",\"varón\",\"vaso\",\"vecino\",\"vector\",\"vehículo\",\"veinte\",\"vejez\",\"vela\",\"velero\",\"veloz\",\"vena\",\"vencer\",\"venda\",\"veneno\",\"vengar\",\"venir\",\"venta\",\"venus\",\"ver\",\"verano\",\"verbo\",\"verde\",\"vereda\",\"verja\",\"verso\",\"verter\",\"vía\",\"viaje\",\"vibrar\",\"vicio\",\"víctima\",\"vida\",\"vídeo\",\"vidrio\",\"viejo\",\"viernes\",\"vigor\",\"vil\",\"villa\",\"vinagre\",\"vino\",\"viñedo\",\"violín\",\"viral\",\"virgo\",\"virtud\",\"visor\",\"víspera\",\"vista\",\"vitamina\",\"viudo\",\"vivaz\",\"vivero\",\"vivir\",\"vivo\",\"volcán\",\"volumen\",\"volver\",\"voraz\",\"votar\",\"voto\",\"voz\",\"vuelo\",\"vulgar\",\"yacer\",\"yate\",\"yegua\",\"yema\",\"yerno\",\"yeso\",\"yodo\",\"yoga\",\"yogur\",\"zafiro\",\"zanja\",\"zapato\",\"zarza\",\"zona\",\"zorro\",\"zumo\",\"zurdo\"]");

const require$$7 = /* #__PURE__ */ JSON.parse("[\"あいこくしん\",\"あいさつ\",\"あいだ\",\"あおぞら\",\"あかちゃん\",\"あきる\",\"あけがた\",\"あける\",\"あこがれる\",\"あさい\",\"あさひ\",\"あしあと\",\"あじわう\",\"あずかる\",\"あずき\",\"あそぶ\",\"あたえる\",\"あたためる\",\"あたりまえ\",\"あたる\",\"あつい\",\"あつかう\",\"あっしゅく\",\"あつまり\",\"あつめる\",\"あてな\",\"あてはまる\",\"あひる\",\"あぶら\",\"あぶる\",\"あふれる\",\"あまい\",\"あまど\",\"あまやかす\",\"あまり\",\"あみもの\",\"あめりか\",\"あやまる\",\"あゆむ\",\"あらいぐま\",\"あらし\",\"あらすじ\",\"あらためる\",\"あらゆる\",\"あらわす\",\"ありがとう\",\"あわせる\",\"あわてる\",\"あんい\",\"あんがい\",\"あんこ\",\"あんぜん\",\"あんてい\",\"あんない\",\"あんまり\",\"いいだす\",\"いおん\",\"いがい\",\"いがく\",\"いきおい\",\"いきなり\",\"いきもの\",\"いきる\",\"いくじ\",\"いくぶん\",\"いけばな\",\"いけん\",\"いこう\",\"いこく\",\"いこつ\",\"いさましい\",\"いさん\",\"いしき\",\"いじゅう\",\"いじょう\",\"いじわる\",\"いずみ\",\"いずれ\",\"いせい\",\"いせえび\",\"いせかい\",\"いせき\",\"いぜん\",\"いそうろう\",\"いそがしい\",\"いだい\",\"いだく\",\"いたずら\",\"いたみ\",\"いたりあ\",\"いちおう\",\"いちじ\",\"いちど\",\"いちば\",\"いちぶ\",\"いちりゅう\",\"いつか\",\"いっしゅん\",\"いっせい\",\"いっそう\",\"いったん\",\"いっち\",\"いってい\",\"いっぽう\",\"いてざ\",\"いてん\",\"いどう\",\"いとこ\",\"いない\",\"いなか\",\"いねむり\",\"いのち\",\"いのる\",\"いはつ\",\"いばる\",\"いはん\",\"いびき\",\"いひん\",\"いふく\",\"いへん\",\"いほう\",\"いみん\",\"いもうと\",\"いもたれ\",\"いもり\",\"いやがる\",\"いやす\",\"いよかん\",\"いよく\",\"いらい\",\"いらすと\",\"いりぐち\",\"いりょう\",\"いれい\",\"いれもの\",\"いれる\",\"いろえんぴつ\",\"いわい\",\"いわう\",\"いわかん\",\"いわば\",\"いわゆる\",\"いんげんまめ\",\"いんさつ\",\"いんしょう\",\"いんよう\",\"うえき\",\"うえる\",\"うおざ\",\"うがい\",\"うかぶ\",\"うかべる\",\"うきわ\",\"うくらいな\",\"うくれれ\",\"うけたまわる\",\"うけつけ\",\"うけとる\",\"うけもつ\",\"うける\",\"うごかす\",\"うごく\",\"うこん\",\"うさぎ\",\"うしなう\",\"うしろがみ\",\"うすい\",\"うすぎ\",\"うすぐらい\",\"うすめる\",\"うせつ\",\"うちあわせ\",\"うちがわ\",\"うちき\",\"うちゅう\",\"うっかり\",\"うつくしい\",\"うったえる\",\"うつる\",\"うどん\",\"うなぎ\",\"うなじ\",\"うなずく\",\"うなる\",\"うねる\",\"うのう\",\"うぶげ\",\"うぶごえ\",\"うまれる\",\"うめる\",\"うもう\",\"うやまう\",\"うよく\",\"うらがえす\",\"うらぐち\",\"うらない\",\"うりあげ\",\"うりきれ\",\"うるさい\",\"うれしい\",\"うれゆき\",\"うれる\",\"うろこ\",\"うわき\",\"うわさ\",\"うんこう\",\"うんちん\",\"うんてん\",\"うんどう\",\"えいえん\",\"えいが\",\"えいきょう\",\"えいご\",\"えいせい\",\"えいぶん\",\"えいよう\",\"えいわ\",\"えおり\",\"えがお\",\"えがく\",\"えきたい\",\"えくせる\",\"えしゃく\",\"えすて\",\"えつらん\",\"えのぐ\",\"えほうまき\",\"えほん\",\"えまき\",\"えもじ\",\"えもの\",\"えらい\",\"えらぶ\",\"えりあ\",\"えんえん\",\"えんかい\",\"えんぎ\",\"えんげき\",\"えんしゅう\",\"えんぜつ\",\"えんそく\",\"えんちょう\",\"えんとつ\",\"おいかける\",\"おいこす\",\"おいしい\",\"おいつく\",\"おうえん\",\"おうさま\",\"おうじ\",\"おうせつ\",\"おうたい\",\"おうふく\",\"おうべい\",\"おうよう\",\"おえる\",\"おおい\",\"おおう\",\"おおどおり\",\"おおや\",\"おおよそ\",\"おかえり\",\"おかず\",\"おがむ\",\"おかわり\",\"おぎなう\",\"おきる\",\"おくさま\",\"おくじょう\",\"おくりがな\",\"おくる\",\"おくれる\",\"おこす\",\"おこなう\",\"おこる\",\"おさえる\",\"おさない\",\"おさめる\",\"おしいれ\",\"おしえる\",\"おじぎ\",\"おじさん\",\"おしゃれ\",\"おそらく\",\"おそわる\",\"おたがい\",\"おたく\",\"おだやか\",\"おちつく\",\"おっと\",\"おつり\",\"おでかけ\",\"おとしもの\",\"おとなしい\",\"おどり\",\"おどろかす\",\"おばさん\",\"おまいり\",\"おめでとう\",\"おもいで\",\"おもう\",\"おもたい\",\"おもちゃ\",\"おやつ\",\"おやゆび\",\"およぼす\",\"おらんだ\",\"おろす\",\"おんがく\",\"おんけい\",\"おんしゃ\",\"おんせん\",\"おんだん\",\"おんちゅう\",\"おんどけい\",\"かあつ\",\"かいが\",\"がいき\",\"がいけん\",\"がいこう\",\"かいさつ\",\"かいしゃ\",\"かいすいよく\",\"かいぜん\",\"かいぞうど\",\"かいつう\",\"かいてん\",\"かいとう\",\"かいふく\",\"がいへき\",\"かいほう\",\"かいよう\",\"がいらい\",\"かいわ\",\"かえる\",\"かおり\",\"かかえる\",\"かがく\",\"かがし\",\"かがみ\",\"かくご\",\"かくとく\",\"かざる\",\"がぞう\",\"かたい\",\"かたち\",\"がちょう\",\"がっきゅう\",\"がっこう\",\"がっさん\",\"がっしょう\",\"かなざわし\",\"かのう\",\"がはく\",\"かぶか\",\"かほう\",\"かほご\",\"かまう\",\"かまぼこ\",\"かめれおん\",\"かゆい\",\"かようび\",\"からい\",\"かるい\",\"かろう\",\"かわく\",\"かわら\",\"がんか\",\"かんけい\",\"かんこう\",\"かんしゃ\",\"かんそう\",\"かんたん\",\"かんち\",\"がんばる\",\"きあい\",\"きあつ\",\"きいろ\",\"ぎいん\",\"きうい\",\"きうん\",\"きえる\",\"きおう\",\"きおく\",\"きおち\",\"きおん\",\"きかい\",\"きかく\",\"きかんしゃ\",\"ききて\",\"きくばり\",\"きくらげ\",\"きけんせい\",\"きこう\",\"きこえる\",\"きこく\",\"きさい\",\"きさく\",\"きさま\",\"きさらぎ\",\"ぎじかがく\",\"ぎしき\",\"ぎじたいけん\",\"ぎじにってい\",\"ぎじゅつしゃ\",\"きすう\",\"きせい\",\"きせき\",\"きせつ\",\"きそう\",\"きぞく\",\"きぞん\",\"きたえる\",\"きちょう\",\"きつえん\",\"ぎっちり\",\"きつつき\",\"きつね\",\"きてい\",\"きどう\",\"きどく\",\"きない\",\"きなが\",\"きなこ\",\"きぬごし\",\"きねん\",\"きのう\",\"きのした\",\"きはく\",\"きびしい\",\"きひん\",\"きふく\",\"きぶん\",\"きぼう\",\"きほん\",\"きまる\",\"きみつ\",\"きむずかしい\",\"きめる\",\"きもだめし\",\"きもち\",\"きもの\",\"きゃく\",\"きやく\",\"ぎゅうにく\",\"きよう\",\"きょうりゅう\",\"きらい\",\"きらく\",\"きりん\",\"きれい\",\"きれつ\",\"きろく\",\"ぎろん\",\"きわめる\",\"ぎんいろ\",\"きんかくじ\",\"きんじょ\",\"きんようび\",\"ぐあい\",\"くいず\",\"くうかん\",\"くうき\",\"くうぐん\",\"くうこう\",\"ぐうせい\",\"くうそう\",\"ぐうたら\",\"くうふく\",\"くうぼ\",\"くかん\",\"くきょう\",\"くげん\",\"ぐこう\",\"くさい\",\"くさき\",\"くさばな\",\"くさる\",\"くしゃみ\",\"くしょう\",\"くすのき\",\"くすりゆび\",\"くせげ\",\"くせん\",\"ぐたいてき\",\"くださる\",\"くたびれる\",\"くちこみ\",\"くちさき\",\"くつした\",\"ぐっすり\",\"くつろぐ\",\"くとうてん\",\"くどく\",\"くなん\",\"くねくね\",\"くのう\",\"くふう\",\"くみあわせ\",\"くみたてる\",\"くめる\",\"くやくしょ\",\"くらす\",\"くらべる\",\"くるま\",\"くれる\",\"くろう\",\"くわしい\",\"ぐんかん\",\"ぐんしょく\",\"ぐんたい\",\"ぐんて\",\"けあな\",\"けいかく\",\"けいけん\",\"けいこ\",\"けいさつ\",\"げいじゅつ\",\"けいたい\",\"げいのうじん\",\"けいれき\",\"けいろ\",\"けおとす\",\"けおりもの\",\"げきか\",\"げきげん\",\"げきだん\",\"げきちん\",\"げきとつ\",\"げきは\",\"げきやく\",\"げこう\",\"げこくじょう\",\"げざい\",\"けさき\",\"げざん\",\"けしき\",\"けしごむ\",\"けしょう\",\"げすと\",\"けたば\",\"けちゃっぷ\",\"けちらす\",\"けつあつ\",\"けつい\",\"けつえき\",\"けっこん\",\"けつじょ\",\"けっせき\",\"けってい\",\"けつまつ\",\"げつようび\",\"げつれい\",\"けつろん\",\"げどく\",\"けとばす\",\"けとる\",\"けなげ\",\"けなす\",\"けなみ\",\"けぬき\",\"げねつ\",\"けねん\",\"けはい\",\"げひん\",\"けぶかい\",\"げぼく\",\"けまり\",\"けみかる\",\"けむし\",\"けむり\",\"けもの\",\"けらい\",\"けろけろ\",\"けわしい\",\"けんい\",\"けんえつ\",\"けんお\",\"けんか\",\"げんき\",\"けんげん\",\"けんこう\",\"けんさく\",\"けんしゅう\",\"けんすう\",\"げんそう\",\"けんちく\",\"けんてい\",\"けんとう\",\"けんない\",\"けんにん\",\"げんぶつ\",\"けんま\",\"けんみん\",\"けんめい\",\"けんらん\",\"けんり\",\"こあくま\",\"こいぬ\",\"こいびと\",\"ごうい\",\"こうえん\",\"こうおん\",\"こうかん\",\"ごうきゅう\",\"ごうけい\",\"こうこう\",\"こうさい\",\"こうじ\",\"こうすい\",\"ごうせい\",\"こうそく\",\"こうたい\",\"こうちゃ\",\"こうつう\",\"こうてい\",\"こうどう\",\"こうない\",\"こうはい\",\"ごうほう\",\"ごうまん\",\"こうもく\",\"こうりつ\",\"こえる\",\"こおり\",\"ごかい\",\"ごがつ\",\"ごかん\",\"こくご\",\"こくさい\",\"こくとう\",\"こくない\",\"こくはく\",\"こぐま\",\"こけい\",\"こける\",\"ここのか\",\"こころ\",\"こさめ\",\"こしつ\",\"こすう\",\"こせい\",\"こせき\",\"こぜん\",\"こそだて\",\"こたい\",\"こたえる\",\"こたつ\",\"こちょう\",\"こっか\",\"こつこつ\",\"こつばん\",\"こつぶ\",\"こてい\",\"こてん\",\"ことがら\",\"ことし\",\"ことば\",\"ことり\",\"こなごな\",\"こねこね\",\"このまま\",\"このみ\",\"このよ\",\"ごはん\",\"こひつじ\",\"こふう\",\"こふん\",\"こぼれる\",\"ごまあぶら\",\"こまかい\",\"ごますり\",\"こまつな\",\"こまる\",\"こむぎこ\",\"こもじ\",\"こもち\",\"こもの\",\"こもん\",\"こやく\",\"こやま\",\"こゆう\",\"こゆび\",\"こよい\",\"こよう\",\"こりる\",\"これくしょん\",\"ころっけ\",\"こわもて\",\"こわれる\",\"こんいん\",\"こんかい\",\"こんき\",\"こんしゅう\",\"こんすい\",\"こんだて\",\"こんとん\",\"こんなん\",\"こんびに\",\"こんぽん\",\"こんまけ\",\"こんや\",\"こんれい\",\"こんわく\",\"ざいえき\",\"さいかい\",\"さいきん\",\"ざいげん\",\"ざいこ\",\"さいしょ\",\"さいせい\",\"ざいたく\",\"ざいちゅう\",\"さいてき\",\"ざいりょう\",\"さうな\",\"さかいし\",\"さがす\",\"さかな\",\"さかみち\",\"さがる\",\"さぎょう\",\"さくし\",\"さくひん\",\"さくら\",\"さこく\",\"さこつ\",\"さずかる\",\"ざせき\",\"さたん\",\"さつえい\",\"ざつおん\",\"ざっか\",\"ざつがく\",\"さっきょく\",\"ざっし\",\"さつじん\",\"ざっそう\",\"さつたば\",\"さつまいも\",\"さてい\",\"さといも\",\"さとう\",\"さとおや\",\"さとし\",\"さとる\",\"さのう\",\"さばく\",\"さびしい\",\"さべつ\",\"さほう\",\"さほど\",\"さます\",\"さみしい\",\"さみだれ\",\"さむけ\",\"さめる\",\"さやえんどう\",\"さゆう\",\"さよう\",\"さよく\",\"さらだ\",\"ざるそば\",\"さわやか\",\"さわる\",\"さんいん\",\"さんか\",\"さんきゃく\",\"さんこう\",\"さんさい\",\"ざんしょ\",\"さんすう\",\"さんせい\",\"さんそ\",\"さんち\",\"さんま\",\"さんみ\",\"さんらん\",\"しあい\",\"しあげ\",\"しあさって\",\"しあわせ\",\"しいく\",\"しいん\",\"しうち\",\"しえい\",\"しおけ\",\"しかい\",\"しかく\",\"じかん\",\"しごと\",\"しすう\",\"じだい\",\"したうけ\",\"したぎ\",\"したて\",\"したみ\",\"しちょう\",\"しちりん\",\"しっかり\",\"しつじ\",\"しつもん\",\"してい\",\"してき\",\"してつ\",\"じてん\",\"じどう\",\"しなぎれ\",\"しなもの\",\"しなん\",\"しねま\",\"しねん\",\"しのぐ\",\"しのぶ\",\"しはい\",\"しばかり\",\"しはつ\",\"しはらい\",\"しはん\",\"しひょう\",\"しふく\",\"じぶん\",\"しへい\",\"しほう\",\"しほん\",\"しまう\",\"しまる\",\"しみん\",\"しむける\",\"じむしょ\",\"しめい\",\"しめる\",\"しもん\",\"しゃいん\",\"しゃうん\",\"しゃおん\",\"じゃがいも\",\"しやくしょ\",\"しゃくほう\",\"しゃけん\",\"しゃこ\",\"しゃざい\",\"しゃしん\",\"しゃせん\",\"しゃそう\",\"しゃたい\",\"しゃちょう\",\"しゃっきん\",\"じゃま\",\"しゃりん\",\"しゃれい\",\"じゆう\",\"じゅうしょ\",\"しゅくはく\",\"じゅしん\",\"しゅっせき\",\"しゅみ\",\"しゅらば\",\"じゅんばん\",\"しょうかい\",\"しょくたく\",\"しょっけん\",\"しょどう\",\"しょもつ\",\"しらせる\",\"しらべる\",\"しんか\",\"しんこう\",\"じんじゃ\",\"しんせいじ\",\"しんちく\",\"しんりん\",\"すあげ\",\"すあし\",\"すあな\",\"ずあん\",\"すいえい\",\"すいか\",\"すいとう\",\"ずいぶん\",\"すいようび\",\"すうがく\",\"すうじつ\",\"すうせん\",\"すおどり\",\"すきま\",\"すくう\",\"すくない\",\"すける\",\"すごい\",\"すこし\",\"ずさん\",\"すずしい\",\"すすむ\",\"すすめる\",\"すっかり\",\"ずっしり\",\"ずっと\",\"すてき\",\"すてる\",\"すねる\",\"すのこ\",\"すはだ\",\"すばらしい\",\"ずひょう\",\"ずぶぬれ\",\"すぶり\",\"すふれ\",\"すべて\",\"すべる\",\"ずほう\",\"すぼん\",\"すまい\",\"すめし\",\"すもう\",\"すやき\",\"すらすら\",\"するめ\",\"すれちがう\",\"すろっと\",\"すわる\",\"すんぜん\",\"すんぽう\",\"せあぶら\",\"せいかつ\",\"せいげん\",\"せいじ\",\"せいよう\",\"せおう\",\"せかいかん\",\"せきにん\",\"せきむ\",\"せきゆ\",\"せきらんうん\",\"せけん\",\"せこう\",\"せすじ\",\"せたい\",\"せたけ\",\"せっかく\",\"せっきゃく\",\"ぜっく\",\"せっけん\",\"せっこつ\",\"せっさたくま\",\"せつぞく\",\"せつだん\",\"せつでん\",\"せっぱん\",\"せつび\",\"せつぶん\",\"せつめい\",\"せつりつ\",\"せなか\",\"せのび\",\"せはば\",\"せびろ\",\"せぼね\",\"せまい\",\"せまる\",\"せめる\",\"せもたれ\",\"せりふ\",\"ぜんあく\",\"せんい\",\"せんえい\",\"せんか\",\"せんきょ\",\"せんく\",\"せんげん\",\"ぜんご\",\"せんさい\",\"せんしゅ\",\"せんすい\",\"せんせい\",\"せんぞ\",\"せんたく\",\"せんちょう\",\"せんてい\",\"せんとう\",\"せんぬき\",\"せんねん\",\"せんぱい\",\"ぜんぶ\",\"ぜんぽう\",\"せんむ\",\"せんめんじょ\",\"せんもん\",\"せんやく\",\"せんゆう\",\"せんよう\",\"ぜんら\",\"ぜんりゃく\",\"せんれい\",\"せんろ\",\"そあく\",\"そいとげる\",\"そいね\",\"そうがんきょう\",\"そうき\",\"そうご\",\"そうしん\",\"そうだん\",\"そうなん\",\"そうび\",\"そうめん\",\"そうり\",\"そえもの\",\"そえん\",\"そがい\",\"そげき\",\"そこう\",\"そこそこ\",\"そざい\",\"そしな\",\"そせい\",\"そせん\",\"そそぐ\",\"そだてる\",\"そつう\",\"そつえん\",\"そっかん\",\"そつぎょう\",\"そっけつ\",\"そっこう\",\"そっせん\",\"そっと\",\"そとがわ\",\"そとづら\",\"そなえる\",\"そなた\",\"そふぼ\",\"そぼく\",\"そぼろ\",\"そまつ\",\"そまる\",\"そむく\",\"そむりえ\",\"そめる\",\"そもそも\",\"そよかぜ\",\"そらまめ\",\"そろう\",\"そんかい\",\"そんけい\",\"そんざい\",\"そんしつ\",\"そんぞく\",\"そんちょう\",\"ぞんび\",\"ぞんぶん\",\"そんみん\",\"たあい\",\"たいいん\",\"たいうん\",\"たいえき\",\"たいおう\",\"だいがく\",\"たいき\",\"たいぐう\",\"たいけん\",\"たいこ\",\"たいざい\",\"だいじょうぶ\",\"だいすき\",\"たいせつ\",\"たいそう\",\"だいたい\",\"たいちょう\",\"たいてい\",\"だいどころ\",\"たいない\",\"たいねつ\",\"たいのう\",\"たいはん\",\"だいひょう\",\"たいふう\",\"たいへん\",\"たいほ\",\"たいまつばな\",\"たいみんぐ\",\"たいむ\",\"たいめん\",\"たいやき\",\"たいよう\",\"たいら\",\"たいりょく\",\"たいる\",\"たいわん\",\"たうえ\",\"たえる\",\"たおす\",\"たおる\",\"たおれる\",\"たかい\",\"たかね\",\"たきび\",\"たくさん\",\"たこく\",\"たこやき\",\"たさい\",\"たしざん\",\"だじゃれ\",\"たすける\",\"たずさわる\",\"たそがれ\",\"たたかう\",\"たたく\",\"ただしい\",\"たたみ\",\"たちばな\",\"だっかい\",\"だっきゃく\",\"だっこ\",\"だっしゅつ\",\"だったい\",\"たてる\",\"たとえる\",\"たなばた\",\"たにん\",\"たぬき\",\"たのしみ\",\"たはつ\",\"たぶん\",\"たべる\",\"たぼう\",\"たまご\",\"たまる\",\"だむる\",\"ためいき\",\"ためす\",\"ためる\",\"たもつ\",\"たやすい\",\"たよる\",\"たらす\",\"たりきほんがん\",\"たりょう\",\"たりる\",\"たると\",\"たれる\",\"たれんと\",\"たろっと\",\"たわむれる\",\"だんあつ\",\"たんい\",\"たんおん\",\"たんか\",\"たんき\",\"たんけん\",\"たんご\",\"たんさん\",\"たんじょうび\",\"だんせい\",\"たんそく\",\"たんたい\",\"だんち\",\"たんてい\",\"たんとう\",\"だんな\",\"たんにん\",\"だんねつ\",\"たんのう\",\"たんぴん\",\"だんぼう\",\"たんまつ\",\"たんめい\",\"だんれつ\",\"だんろ\",\"だんわ\",\"ちあい\",\"ちあん\",\"ちいき\",\"ちいさい\",\"ちえん\",\"ちかい\",\"ちから\",\"ちきゅう\",\"ちきん\",\"ちけいず\",\"ちけん\",\"ちこく\",\"ちさい\",\"ちしき\",\"ちしりょう\",\"ちせい\",\"ちそう\",\"ちたい\",\"ちたん\",\"ちちおや\",\"ちつじょ\",\"ちてき\",\"ちてん\",\"ちぬき\",\"ちぬり\",\"ちのう\",\"ちひょう\",\"ちへいせん\",\"ちほう\",\"ちまた\",\"ちみつ\",\"ちみどろ\",\"ちめいど\",\"ちゃんこなべ\",\"ちゅうい\",\"ちゆりょく\",\"ちょうし\",\"ちょさくけん\",\"ちらし\",\"ちらみ\",\"ちりがみ\",\"ちりょう\",\"ちるど\",\"ちわわ\",\"ちんたい\",\"ちんもく\",\"ついか\",\"ついたち\",\"つうか\",\"つうじょう\",\"つうはん\",\"つうわ\",\"つかう\",\"つかれる\",\"つくね\",\"つくる\",\"つけね\",\"つける\",\"つごう\",\"つたえる\",\"つづく\",\"つつじ\",\"つつむ\",\"つとめる\",\"つながる\",\"つなみ\",\"つねづね\",\"つのる\",\"つぶす\",\"つまらない\",\"つまる\",\"つみき\",\"つめたい\",\"つもり\",\"つもる\",\"つよい\",\"つるぼ\",\"つるみく\",\"つわもの\",\"つわり\",\"てあし\",\"てあて\",\"てあみ\",\"ていおん\",\"ていか\",\"ていき\",\"ていけい\",\"ていこく\",\"ていさつ\",\"ていし\",\"ていせい\",\"ていたい\",\"ていど\",\"ていねい\",\"ていひょう\",\"ていへん\",\"ていぼう\",\"てうち\",\"ておくれ\",\"てきとう\",\"てくび\",\"でこぼこ\",\"てさぎょう\",\"てさげ\",\"てすり\",\"てそう\",\"てちがい\",\"てちょう\",\"てつがく\",\"てつづき\",\"でっぱ\",\"てつぼう\",\"てつや\",\"でぬかえ\",\"てぬき\",\"てぬぐい\",\"てのひら\",\"てはい\",\"てぶくろ\",\"てふだ\",\"てほどき\",\"てほん\",\"てまえ\",\"てまきずし\",\"てみじか\",\"てみやげ\",\"てらす\",\"てれび\",\"てわけ\",\"てわたし\",\"でんあつ\",\"てんいん\",\"てんかい\",\"てんき\",\"てんぐ\",\"てんけん\",\"てんごく\",\"てんさい\",\"てんし\",\"てんすう\",\"でんち\",\"てんてき\",\"てんとう\",\"てんない\",\"てんぷら\",\"てんぼうだい\",\"てんめつ\",\"てんらんかい\",\"でんりょく\",\"でんわ\",\"どあい\",\"といれ\",\"どうかん\",\"とうきゅう\",\"どうぐ\",\"とうし\",\"とうむぎ\",\"とおい\",\"とおか\",\"とおく\",\"とおす\",\"とおる\",\"とかい\",\"とかす\",\"ときおり\",\"ときどき\",\"とくい\",\"とくしゅう\",\"とくてん\",\"とくに\",\"とくべつ\",\"とけい\",\"とける\",\"とこや\",\"とさか\",\"としょかん\",\"とそう\",\"とたん\",\"とちゅう\",\"とっきゅう\",\"とっくん\",\"とつぜん\",\"とつにゅう\",\"とどける\",\"ととのえる\",\"とない\",\"となえる\",\"となり\",\"とのさま\",\"とばす\",\"どぶがわ\",\"とほう\",\"とまる\",\"とめる\",\"ともだち\",\"ともる\",\"どようび\",\"とらえる\",\"とんかつ\",\"どんぶり\",\"ないかく\",\"ないこう\",\"ないしょ\",\"ないす\",\"ないせん\",\"ないそう\",\"なおす\",\"ながい\",\"なくす\",\"なげる\",\"なこうど\",\"なさけ\",\"なたでここ\",\"なっとう\",\"なつやすみ\",\"ななおし\",\"なにごと\",\"なにもの\",\"なにわ\",\"なのか\",\"なふだ\",\"なまいき\",\"なまえ\",\"なまみ\",\"なみだ\",\"なめらか\",\"なめる\",\"なやむ\",\"ならう\",\"ならび\",\"ならぶ\",\"なれる\",\"なわとび\",\"なわばり\",\"にあう\",\"にいがた\",\"にうけ\",\"におい\",\"にかい\",\"にがて\",\"にきび\",\"にくしみ\",\"にくまん\",\"にげる\",\"にさんかたんそ\",\"にしき\",\"にせもの\",\"にちじょう\",\"にちようび\",\"にっか\",\"にっき\",\"にっけい\",\"にっこう\",\"にっさん\",\"にっしょく\",\"にっすう\",\"にっせき\",\"にってい\",\"になう\",\"にほん\",\"にまめ\",\"にもつ\",\"にやり\",\"にゅういん\",\"にりんしゃ\",\"にわとり\",\"にんい\",\"にんか\",\"にんき\",\"にんげん\",\"にんしき\",\"にんずう\",\"にんそう\",\"にんたい\",\"にんち\",\"にんてい\",\"にんにく\",\"にんぷ\",\"にんまり\",\"にんむ\",\"にんめい\",\"にんよう\",\"ぬいくぎ\",\"ぬかす\",\"ぬぐいとる\",\"ぬぐう\",\"ぬくもり\",\"ぬすむ\",\"ぬまえび\",\"ぬめり\",\"ぬらす\",\"ぬんちゃく\",\"ねあげ\",\"ねいき\",\"ねいる\",\"ねいろ\",\"ねぐせ\",\"ねくたい\",\"ねくら\",\"ねこぜ\",\"ねこむ\",\"ねさげ\",\"ねすごす\",\"ねそべる\",\"ねだん\",\"ねつい\",\"ねっしん\",\"ねつぞう\",\"ねったいぎょ\",\"ねぶそく\",\"ねふだ\",\"ねぼう\",\"ねほりはほり\",\"ねまき\",\"ねまわし\",\"ねみみ\",\"ねむい\",\"ねむたい\",\"ねもと\",\"ねらう\",\"ねわざ\",\"ねんいり\",\"ねんおし\",\"ねんかん\",\"ねんきん\",\"ねんぐ\",\"ねんざ\",\"ねんし\",\"ねんちゃく\",\"ねんど\",\"ねんぴ\",\"ねんぶつ\",\"ねんまつ\",\"ねんりょう\",\"ねんれい\",\"のいず\",\"のおづま\",\"のがす\",\"のきなみ\",\"のこぎり\",\"のこす\",\"のこる\",\"のせる\",\"のぞく\",\"のぞむ\",\"のたまう\",\"のちほど\",\"のっく\",\"のばす\",\"のはら\",\"のべる\",\"のぼる\",\"のみもの\",\"のやま\",\"のらいぬ\",\"のらねこ\",\"のりもの\",\"のりゆき\",\"のれん\",\"のんき\",\"ばあい\",\"はあく\",\"ばあさん\",\"ばいか\",\"ばいく\",\"はいけん\",\"はいご\",\"はいしん\",\"はいすい\",\"はいせん\",\"はいそう\",\"はいち\",\"ばいばい\",\"はいれつ\",\"はえる\",\"はおる\",\"はかい\",\"ばかり\",\"はかる\",\"はくしゅ\",\"はけん\",\"はこぶ\",\"はさみ\",\"はさん\",\"はしご\",\"ばしょ\",\"はしる\",\"はせる\",\"ぱそこん\",\"はそん\",\"はたん\",\"はちみつ\",\"はつおん\",\"はっかく\",\"はづき\",\"はっきり\",\"はっくつ\",\"はっけん\",\"はっこう\",\"はっさん\",\"はっしん\",\"はったつ\",\"はっちゅう\",\"はってん\",\"はっぴょう\",\"はっぽう\",\"はなす\",\"はなび\",\"はにかむ\",\"はぶらし\",\"はみがき\",\"はむかう\",\"はめつ\",\"はやい\",\"はやし\",\"はらう\",\"はろうぃん\",\"はわい\",\"はんい\",\"はんえい\",\"はんおん\",\"はんかく\",\"はんきょう\",\"ばんぐみ\",\"はんこ\",\"はんしゃ\",\"はんすう\",\"はんだん\",\"ぱんち\",\"ぱんつ\",\"はんてい\",\"はんとし\",\"はんのう\",\"はんぱ\",\"はんぶん\",\"はんぺん\",\"はんぼうき\",\"はんめい\",\"はんらん\",\"はんろん\",\"ひいき\",\"ひうん\",\"ひえる\",\"ひかく\",\"ひかり\",\"ひかる\",\"ひかん\",\"ひくい\",\"ひけつ\",\"ひこうき\",\"ひこく\",\"ひさい\",\"ひさしぶり\",\"ひさん\",\"びじゅつかん\",\"ひしょ\",\"ひそか\",\"ひそむ\",\"ひたむき\",\"ひだり\",\"ひたる\",\"ひつぎ\",\"ひっこし\",\"ひっし\",\"ひつじゅひん\",\"ひっす\",\"ひつぜん\",\"ぴったり\",\"ぴっちり\",\"ひつよう\",\"ひてい\",\"ひとごみ\",\"ひなまつり\",\"ひなん\",\"ひねる\",\"ひはん\",\"ひびく\",\"ひひょう\",\"ひほう\",\"ひまわり\",\"ひまん\",\"ひみつ\",\"ひめい\",\"ひめじし\",\"ひやけ\",\"ひやす\",\"ひよう\",\"びょうき\",\"ひらがな\",\"ひらく\",\"ひりつ\",\"ひりょう\",\"ひるま\",\"ひるやすみ\",\"ひれい\",\"ひろい\",\"ひろう\",\"ひろき\",\"ひろゆき\",\"ひんかく\",\"ひんけつ\",\"ひんこん\",\"ひんしゅ\",\"ひんそう\",\"ぴんち\",\"ひんぱん\",\"びんぼう\",\"ふあん\",\"ふいうち\",\"ふうけい\",\"ふうせん\",\"ぷうたろう\",\"ふうとう\",\"ふうふ\",\"ふえる\",\"ふおん\",\"ふかい\",\"ふきん\",\"ふくざつ\",\"ふくぶくろ\",\"ふこう\",\"ふさい\",\"ふしぎ\",\"ふじみ\",\"ふすま\",\"ふせい\",\"ふせぐ\",\"ふそく\",\"ぶたにく\",\"ふたん\",\"ふちょう\",\"ふつう\",\"ふつか\",\"ふっかつ\",\"ふっき\",\"ふっこく\",\"ぶどう\",\"ふとる\",\"ふとん\",\"ふのう\",\"ふはい\",\"ふひょう\",\"ふへん\",\"ふまん\",\"ふみん\",\"ふめつ\",\"ふめん\",\"ふよう\",\"ふりこ\",\"ふりる\",\"ふるい\",\"ふんいき\",\"ぶんがく\",\"ぶんぐ\",\"ふんしつ\",\"ぶんせき\",\"ふんそう\",\"ぶんぽう\",\"へいあん\",\"へいおん\",\"へいがい\",\"へいき\",\"へいげん\",\"へいこう\",\"へいさ\",\"へいしゃ\",\"へいせつ\",\"へいそ\",\"へいたく\",\"へいてん\",\"へいねつ\",\"へいわ\",\"へきが\",\"へこむ\",\"べにいろ\",\"べにしょうが\",\"へらす\",\"へんかん\",\"べんきょう\",\"べんごし\",\"へんさい\",\"へんたい\",\"べんり\",\"ほあん\",\"ほいく\",\"ぼうぎょ\",\"ほうこく\",\"ほうそう\",\"ほうほう\",\"ほうもん\",\"ほうりつ\",\"ほえる\",\"ほおん\",\"ほかん\",\"ほきょう\",\"ぼきん\",\"ほくろ\",\"ほけつ\",\"ほけん\",\"ほこう\",\"ほこる\",\"ほしい\",\"ほしつ\",\"ほしゅ\",\"ほしょう\",\"ほせい\",\"ほそい\",\"ほそく\",\"ほたて\",\"ほたる\",\"ぽちぶくろ\",\"ほっきょく\",\"ほっさ\",\"ほったん\",\"ほとんど\",\"ほめる\",\"ほんい\",\"ほんき\",\"ほんけ\",\"ほんしつ\",\"ほんやく\",\"まいにち\",\"まかい\",\"まかせる\",\"まがる\",\"まける\",\"まこと\",\"まさつ\",\"まじめ\",\"ますく\",\"まぜる\",\"まつり\",\"まとめ\",\"まなぶ\",\"まぬけ\",\"まねく\",\"まほう\",\"まもる\",\"まゆげ\",\"まよう\",\"まろやか\",\"まわす\",\"まわり\",\"まわる\",\"まんが\",\"まんきつ\",\"まんぞく\",\"まんなか\",\"みいら\",\"みうち\",\"みえる\",\"みがく\",\"みかた\",\"みかん\",\"みけん\",\"みこん\",\"みじかい\",\"みすい\",\"みすえる\",\"みせる\",\"みっか\",\"みつかる\",\"みつける\",\"みてい\",\"みとめる\",\"みなと\",\"みなみかさい\",\"みねらる\",\"みのう\",\"みのがす\",\"みほん\",\"みもと\",\"みやげ\",\"みらい\",\"みりょく\",\"みわく\",\"みんか\",\"みんぞく\",\"むいか\",\"むえき\",\"むえん\",\"むかい\",\"むかう\",\"むかえ\",\"むかし\",\"むぎちゃ\",\"むける\",\"むげん\",\"むさぼる\",\"むしあつい\",\"むしば\",\"むじゅん\",\"むしろ\",\"むすう\",\"むすこ\",\"むすぶ\",\"むすめ\",\"むせる\",\"むせん\",\"むちゅう\",\"むなしい\",\"むのう\",\"むやみ\",\"むよう\",\"むらさき\",\"むりょう\",\"むろん\",\"めいあん\",\"めいうん\",\"めいえん\",\"めいかく\",\"めいきょく\",\"めいさい\",\"めいし\",\"めいそう\",\"めいぶつ\",\"めいれい\",\"めいわく\",\"めぐまれる\",\"めざす\",\"めした\",\"めずらしい\",\"めだつ\",\"めまい\",\"めやす\",\"めんきょ\",\"めんせき\",\"めんどう\",\"もうしあげる\",\"もうどうけん\",\"もえる\",\"もくし\",\"もくてき\",\"もくようび\",\"もちろん\",\"もどる\",\"もらう\",\"もんく\",\"もんだい\",\"やおや\",\"やける\",\"やさい\",\"やさしい\",\"やすい\",\"やすたろう\",\"やすみ\",\"やせる\",\"やそう\",\"やたい\",\"やちん\",\"やっと\",\"やっぱり\",\"やぶる\",\"やめる\",\"ややこしい\",\"やよい\",\"やわらかい\",\"ゆうき\",\"ゆうびんきょく\",\"ゆうべ\",\"ゆうめい\",\"ゆけつ\",\"ゆしゅつ\",\"ゆせん\",\"ゆそう\",\"ゆたか\",\"ゆちゃく\",\"ゆでる\",\"ゆにゅう\",\"ゆびわ\",\"ゆらい\",\"ゆれる\",\"ようい\",\"ようか\",\"ようきゅう\",\"ようじ\",\"ようす\",\"ようちえん\",\"よかぜ\",\"よかん\",\"よきん\",\"よくせい\",\"よくぼう\",\"よけい\",\"よごれる\",\"よさん\",\"よしゅう\",\"よそう\",\"よそく\",\"よっか\",\"よてい\",\"よどがわく\",\"よねつ\",\"よやく\",\"よゆう\",\"よろこぶ\",\"よろしい\",\"らいう\",\"らくがき\",\"らくご\",\"らくさつ\",\"らくだ\",\"らしんばん\",\"らせん\",\"らぞく\",\"らたい\",\"らっか\",\"られつ\",\"りえき\",\"りかい\",\"りきさく\",\"りきせつ\",\"りくぐん\",\"りくつ\",\"りけん\",\"りこう\",\"りせい\",\"りそう\",\"りそく\",\"りてん\",\"りねん\",\"りゆう\",\"りゅうがく\",\"りよう\",\"りょうり\",\"りょかん\",\"りょくちゃ\",\"りょこう\",\"りりく\",\"りれき\",\"りろん\",\"りんご\",\"るいけい\",\"るいさい\",\"るいじ\",\"るいせき\",\"るすばん\",\"るりがわら\",\"れいかん\",\"れいぎ\",\"れいせい\",\"れいぞうこ\",\"れいとう\",\"れいぼう\",\"れきし\",\"れきだい\",\"れんあい\",\"れんけい\",\"れんこん\",\"れんさい\",\"れんしゅう\",\"れんぞく\",\"れんらく\",\"ろうか\",\"ろうご\",\"ろうじん\",\"ろうそく\",\"ろくが\",\"ろこつ\",\"ろじうら\",\"ろしゅつ\",\"ろせん\",\"ろてん\",\"ろめん\",\"ろれつ\",\"ろんぎ\",\"ろんぱ\",\"ろんぶん\",\"ろんり\",\"わかす\",\"わかめ\",\"わかやま\",\"わかれる\",\"わしつ\",\"わじまし\",\"わすれもの\",\"わらう\",\"われる\"]");

const require$$8 = /* #__PURE__ */ JSON.parse("[\"abacate\",\"abaixo\",\"abalar\",\"abater\",\"abduzir\",\"abelha\",\"aberto\",\"abismo\",\"abotoar\",\"abranger\",\"abreviar\",\"abrigar\",\"abrupto\",\"absinto\",\"absoluto\",\"absurdo\",\"abutre\",\"acabado\",\"acalmar\",\"acampar\",\"acanhar\",\"acaso\",\"aceitar\",\"acelerar\",\"acenar\",\"acervo\",\"acessar\",\"acetona\",\"achatar\",\"acidez\",\"acima\",\"acionado\",\"acirrar\",\"aclamar\",\"aclive\",\"acolhida\",\"acomodar\",\"acoplar\",\"acordar\",\"acumular\",\"acusador\",\"adaptar\",\"adega\",\"adentro\",\"adepto\",\"adequar\",\"aderente\",\"adesivo\",\"adeus\",\"adiante\",\"aditivo\",\"adjetivo\",\"adjunto\",\"admirar\",\"adorar\",\"adquirir\",\"adubo\",\"adverso\",\"advogado\",\"aeronave\",\"afastar\",\"aferir\",\"afetivo\",\"afinador\",\"afivelar\",\"aflito\",\"afluente\",\"afrontar\",\"agachar\",\"agarrar\",\"agasalho\",\"agenciar\",\"agilizar\",\"agiota\",\"agitado\",\"agora\",\"agradar\",\"agreste\",\"agrupar\",\"aguardar\",\"agulha\",\"ajoelhar\",\"ajudar\",\"ajustar\",\"alameda\",\"alarme\",\"alastrar\",\"alavanca\",\"albergue\",\"albino\",\"alcatra\",\"aldeia\",\"alecrim\",\"alegria\",\"alertar\",\"alface\",\"alfinete\",\"algum\",\"alheio\",\"aliar\",\"alicate\",\"alienar\",\"alinhar\",\"aliviar\",\"almofada\",\"alocar\",\"alpiste\",\"alterar\",\"altitude\",\"alucinar\",\"alugar\",\"aluno\",\"alusivo\",\"alvo\",\"amaciar\",\"amador\",\"amarelo\",\"amassar\",\"ambas\",\"ambiente\",\"ameixa\",\"amenizar\",\"amido\",\"amistoso\",\"amizade\",\"amolador\",\"amontoar\",\"amoroso\",\"amostra\",\"amparar\",\"ampliar\",\"ampola\",\"anagrama\",\"analisar\",\"anarquia\",\"anatomia\",\"andaime\",\"anel\",\"anexo\",\"angular\",\"animar\",\"anjo\",\"anomalia\",\"anotado\",\"ansioso\",\"anterior\",\"anuidade\",\"anunciar\",\"anzol\",\"apagador\",\"apalpar\",\"apanhado\",\"apego\",\"apelido\",\"apertada\",\"apesar\",\"apetite\",\"apito\",\"aplauso\",\"aplicada\",\"apoio\",\"apontar\",\"aposta\",\"aprendiz\",\"aprovar\",\"aquecer\",\"arame\",\"aranha\",\"arara\",\"arcada\",\"ardente\",\"areia\",\"arejar\",\"arenito\",\"aresta\",\"argiloso\",\"argola\",\"arma\",\"arquivo\",\"arraial\",\"arrebate\",\"arriscar\",\"arroba\",\"arrumar\",\"arsenal\",\"arterial\",\"artigo\",\"arvoredo\",\"asfaltar\",\"asilado\",\"aspirar\",\"assador\",\"assinar\",\"assoalho\",\"assunto\",\"astral\",\"atacado\",\"atadura\",\"atalho\",\"atarefar\",\"atear\",\"atender\",\"aterro\",\"ateu\",\"atingir\",\"atirador\",\"ativo\",\"atoleiro\",\"atracar\",\"atrevido\",\"atriz\",\"atual\",\"atum\",\"auditor\",\"aumentar\",\"aura\",\"aurora\",\"autismo\",\"autoria\",\"autuar\",\"avaliar\",\"avante\",\"avaria\",\"avental\",\"avesso\",\"aviador\",\"avisar\",\"avulso\",\"axila\",\"azarar\",\"azedo\",\"azeite\",\"azulejo\",\"babar\",\"babosa\",\"bacalhau\",\"bacharel\",\"bacia\",\"bagagem\",\"baiano\",\"bailar\",\"baioneta\",\"bairro\",\"baixista\",\"bajular\",\"baleia\",\"baliza\",\"balsa\",\"banal\",\"bandeira\",\"banho\",\"banir\",\"banquete\",\"barato\",\"barbado\",\"baronesa\",\"barraca\",\"barulho\",\"baseado\",\"bastante\",\"batata\",\"batedor\",\"batida\",\"batom\",\"batucar\",\"baunilha\",\"beber\",\"beijo\",\"beirada\",\"beisebol\",\"beldade\",\"beleza\",\"belga\",\"beliscar\",\"bendito\",\"bengala\",\"benzer\",\"berimbau\",\"berlinda\",\"berro\",\"besouro\",\"bexiga\",\"bezerro\",\"bico\",\"bicudo\",\"bienal\",\"bifocal\",\"bifurcar\",\"bigorna\",\"bilhete\",\"bimestre\",\"bimotor\",\"biologia\",\"biombo\",\"biosfera\",\"bipolar\",\"birrento\",\"biscoito\",\"bisneto\",\"bispo\",\"bissexto\",\"bitola\",\"bizarro\",\"blindado\",\"bloco\",\"bloquear\",\"boato\",\"bobagem\",\"bocado\",\"bocejo\",\"bochecha\",\"boicotar\",\"bolada\",\"boletim\",\"bolha\",\"bolo\",\"bombeiro\",\"bonde\",\"boneco\",\"bonita\",\"borbulha\",\"borda\",\"boreal\",\"borracha\",\"bovino\",\"boxeador\",\"branco\",\"brasa\",\"braveza\",\"breu\",\"briga\",\"brilho\",\"brincar\",\"broa\",\"brochura\",\"bronzear\",\"broto\",\"bruxo\",\"bucha\",\"budismo\",\"bufar\",\"bule\",\"buraco\",\"busca\",\"busto\",\"buzina\",\"cabana\",\"cabelo\",\"cabide\",\"cabo\",\"cabrito\",\"cacau\",\"cacetada\",\"cachorro\",\"cacique\",\"cadastro\",\"cadeado\",\"cafezal\",\"caiaque\",\"caipira\",\"caixote\",\"cajado\",\"caju\",\"calafrio\",\"calcular\",\"caldeira\",\"calibrar\",\"calmante\",\"calota\",\"camada\",\"cambista\",\"camisa\",\"camomila\",\"campanha\",\"camuflar\",\"canavial\",\"cancelar\",\"caneta\",\"canguru\",\"canhoto\",\"canivete\",\"canoa\",\"cansado\",\"cantar\",\"canudo\",\"capacho\",\"capela\",\"capinar\",\"capotar\",\"capricho\",\"captador\",\"capuz\",\"caracol\",\"carbono\",\"cardeal\",\"careca\",\"carimbar\",\"carneiro\",\"carpete\",\"carreira\",\"cartaz\",\"carvalho\",\"casaco\",\"casca\",\"casebre\",\"castelo\",\"casulo\",\"catarata\",\"cativar\",\"caule\",\"causador\",\"cautelar\",\"cavalo\",\"caverna\",\"cebola\",\"cedilha\",\"cegonha\",\"celebrar\",\"celular\",\"cenoura\",\"censo\",\"centeio\",\"cercar\",\"cerrado\",\"certeiro\",\"cerveja\",\"cetim\",\"cevada\",\"chacota\",\"chaleira\",\"chamado\",\"chapada\",\"charme\",\"chatice\",\"chave\",\"chefe\",\"chegada\",\"cheiro\",\"cheque\",\"chicote\",\"chifre\",\"chinelo\",\"chocalho\",\"chover\",\"chumbo\",\"chutar\",\"chuva\",\"cicatriz\",\"ciclone\",\"cidade\",\"cidreira\",\"ciente\",\"cigana\",\"cimento\",\"cinto\",\"cinza\",\"ciranda\",\"circuito\",\"cirurgia\",\"citar\",\"clareza\",\"clero\",\"clicar\",\"clone\",\"clube\",\"coado\",\"coagir\",\"cobaia\",\"cobertor\",\"cobrar\",\"cocada\",\"coelho\",\"coentro\",\"coeso\",\"cogumelo\",\"coibir\",\"coifa\",\"coiote\",\"colar\",\"coleira\",\"colher\",\"colidir\",\"colmeia\",\"colono\",\"coluna\",\"comando\",\"combinar\",\"comentar\",\"comitiva\",\"comover\",\"complexo\",\"comum\",\"concha\",\"condor\",\"conectar\",\"confuso\",\"congelar\",\"conhecer\",\"conjugar\",\"consumir\",\"contrato\",\"convite\",\"cooperar\",\"copeiro\",\"copiador\",\"copo\",\"coquetel\",\"coragem\",\"cordial\",\"corneta\",\"coronha\",\"corporal\",\"correio\",\"cortejo\",\"coruja\",\"corvo\",\"cosseno\",\"costela\",\"cotonete\",\"couro\",\"couve\",\"covil\",\"cozinha\",\"cratera\",\"cravo\",\"creche\",\"credor\",\"creme\",\"crer\",\"crespo\",\"criada\",\"criminal\",\"crioulo\",\"crise\",\"criticar\",\"crosta\",\"crua\",\"cruzeiro\",\"cubano\",\"cueca\",\"cuidado\",\"cujo\",\"culatra\",\"culminar\",\"culpar\",\"cultura\",\"cumprir\",\"cunhado\",\"cupido\",\"curativo\",\"curral\",\"cursar\",\"curto\",\"cuspir\",\"custear\",\"cutelo\",\"damasco\",\"datar\",\"debater\",\"debitar\",\"deboche\",\"debulhar\",\"decalque\",\"decimal\",\"declive\",\"decote\",\"decretar\",\"dedal\",\"dedicado\",\"deduzir\",\"defesa\",\"defumar\",\"degelo\",\"degrau\",\"degustar\",\"deitado\",\"deixar\",\"delator\",\"delegado\",\"delinear\",\"delonga\",\"demanda\",\"demitir\",\"demolido\",\"dentista\",\"depenado\",\"depilar\",\"depois\",\"depressa\",\"depurar\",\"deriva\",\"derramar\",\"desafio\",\"desbotar\",\"descanso\",\"desenho\",\"desfiado\",\"desgaste\",\"desigual\",\"deslize\",\"desmamar\",\"desova\",\"despesa\",\"destaque\",\"desviar\",\"detalhar\",\"detentor\",\"detonar\",\"detrito\",\"deusa\",\"dever\",\"devido\",\"devotado\",\"dezena\",\"diagrama\",\"dialeto\",\"didata\",\"difuso\",\"digitar\",\"dilatado\",\"diluente\",\"diminuir\",\"dinastia\",\"dinheiro\",\"diocese\",\"direto\",\"discreta\",\"disfarce\",\"disparo\",\"disquete\",\"dissipar\",\"distante\",\"ditador\",\"diurno\",\"diverso\",\"divisor\",\"divulgar\",\"dizer\",\"dobrador\",\"dolorido\",\"domador\",\"dominado\",\"donativo\",\"donzela\",\"dormente\",\"dorsal\",\"dosagem\",\"dourado\",\"doutor\",\"drenagem\",\"drible\",\"drogaria\",\"duelar\",\"duende\",\"dueto\",\"duplo\",\"duquesa\",\"durante\",\"duvidoso\",\"eclodir\",\"ecoar\",\"ecologia\",\"edificar\",\"edital\",\"educado\",\"efeito\",\"efetivar\",\"ejetar\",\"elaborar\",\"eleger\",\"eleitor\",\"elenco\",\"elevador\",\"eliminar\",\"elogiar\",\"embargo\",\"embolado\",\"embrulho\",\"embutido\",\"emenda\",\"emergir\",\"emissor\",\"empatia\",\"empenho\",\"empinado\",\"empolgar\",\"emprego\",\"empurrar\",\"emulador\",\"encaixe\",\"encenado\",\"enchente\",\"encontro\",\"endeusar\",\"endossar\",\"enfaixar\",\"enfeite\",\"enfim\",\"engajado\",\"engenho\",\"englobar\",\"engomado\",\"engraxar\",\"enguia\",\"enjoar\",\"enlatar\",\"enquanto\",\"enraizar\",\"enrolado\",\"enrugar\",\"ensaio\",\"enseada\",\"ensino\",\"ensopado\",\"entanto\",\"enteado\",\"entidade\",\"entortar\",\"entrada\",\"entulho\",\"envergar\",\"enviado\",\"envolver\",\"enxame\",\"enxerto\",\"enxofre\",\"enxuto\",\"epiderme\",\"equipar\",\"ereto\",\"erguido\",\"errata\",\"erva\",\"ervilha\",\"esbanjar\",\"esbelto\",\"escama\",\"escola\",\"escrita\",\"escuta\",\"esfinge\",\"esfolar\",\"esfregar\",\"esfumado\",\"esgrima\",\"esmalte\",\"espanto\",\"espelho\",\"espiga\",\"esponja\",\"espreita\",\"espumar\",\"esquerda\",\"estaca\",\"esteira\",\"esticar\",\"estofado\",\"estrela\",\"estudo\",\"esvaziar\",\"etanol\",\"etiqueta\",\"euforia\",\"europeu\",\"evacuar\",\"evaporar\",\"evasivo\",\"eventual\",\"evidente\",\"evoluir\",\"exagero\",\"exalar\",\"examinar\",\"exato\",\"exausto\",\"excesso\",\"excitar\",\"exclamar\",\"executar\",\"exemplo\",\"exibir\",\"exigente\",\"exonerar\",\"expandir\",\"expelir\",\"expirar\",\"explanar\",\"exposto\",\"expresso\",\"expulsar\",\"externo\",\"extinto\",\"extrato\",\"fabricar\",\"fabuloso\",\"faceta\",\"facial\",\"fada\",\"fadiga\",\"faixa\",\"falar\",\"falta\",\"familiar\",\"fandango\",\"fanfarra\",\"fantoche\",\"fardado\",\"farelo\",\"farinha\",\"farofa\",\"farpa\",\"fartura\",\"fatia\",\"fator\",\"favorita\",\"faxina\",\"fazenda\",\"fechado\",\"feijoada\",\"feirante\",\"felino\",\"feminino\",\"fenda\",\"feno\",\"fera\",\"feriado\",\"ferrugem\",\"ferver\",\"festejar\",\"fetal\",\"feudal\",\"fiapo\",\"fibrose\",\"ficar\",\"ficheiro\",\"figurado\",\"fileira\",\"filho\",\"filme\",\"filtrar\",\"firmeza\",\"fisgada\",\"fissura\",\"fita\",\"fivela\",\"fixador\",\"fixo\",\"flacidez\",\"flamingo\",\"flanela\",\"flechada\",\"flora\",\"flutuar\",\"fluxo\",\"focal\",\"focinho\",\"fofocar\",\"fogo\",\"foguete\",\"foice\",\"folgado\",\"folheto\",\"forjar\",\"formiga\",\"forno\",\"forte\",\"fosco\",\"fossa\",\"fragata\",\"fralda\",\"frango\",\"frasco\",\"fraterno\",\"freira\",\"frente\",\"fretar\",\"frieza\",\"friso\",\"fritura\",\"fronha\",\"frustrar\",\"fruteira\",\"fugir\",\"fulano\",\"fuligem\",\"fundar\",\"fungo\",\"funil\",\"furador\",\"furioso\",\"futebol\",\"gabarito\",\"gabinete\",\"gado\",\"gaiato\",\"gaiola\",\"gaivota\",\"galega\",\"galho\",\"galinha\",\"galocha\",\"ganhar\",\"garagem\",\"garfo\",\"gargalo\",\"garimpo\",\"garoupa\",\"garrafa\",\"gasoduto\",\"gasto\",\"gata\",\"gatilho\",\"gaveta\",\"gazela\",\"gelado\",\"geleia\",\"gelo\",\"gemada\",\"gemer\",\"gemido\",\"generoso\",\"gengiva\",\"genial\",\"genoma\",\"genro\",\"geologia\",\"gerador\",\"germinar\",\"gesso\",\"gestor\",\"ginasta\",\"gincana\",\"gingado\",\"girafa\",\"girino\",\"glacial\",\"glicose\",\"global\",\"glorioso\",\"goela\",\"goiaba\",\"golfe\",\"golpear\",\"gordura\",\"gorjeta\",\"gorro\",\"gostoso\",\"goteira\",\"governar\",\"gracejo\",\"gradual\",\"grafite\",\"gralha\",\"grampo\",\"granada\",\"gratuito\",\"graveto\",\"graxa\",\"grego\",\"grelhar\",\"greve\",\"grilo\",\"grisalho\",\"gritaria\",\"grosso\",\"grotesco\",\"grudado\",\"grunhido\",\"gruta\",\"guache\",\"guarani\",\"guaxinim\",\"guerrear\",\"guiar\",\"guincho\",\"guisado\",\"gula\",\"guloso\",\"guru\",\"habitar\",\"harmonia\",\"haste\",\"haver\",\"hectare\",\"herdar\",\"heresia\",\"hesitar\",\"hiato\",\"hibernar\",\"hidratar\",\"hiena\",\"hino\",\"hipismo\",\"hipnose\",\"hipoteca\",\"hoje\",\"holofote\",\"homem\",\"honesto\",\"honrado\",\"hormonal\",\"hospedar\",\"humorado\",\"iate\",\"ideia\",\"idoso\",\"ignorado\",\"igreja\",\"iguana\",\"ileso\",\"ilha\",\"iludido\",\"iluminar\",\"ilustrar\",\"imagem\",\"imediato\",\"imenso\",\"imersivo\",\"iminente\",\"imitador\",\"imortal\",\"impacto\",\"impedir\",\"implante\",\"impor\",\"imprensa\",\"impune\",\"imunizar\",\"inalador\",\"inapto\",\"inativo\",\"incenso\",\"inchar\",\"incidir\",\"incluir\",\"incolor\",\"indeciso\",\"indireto\",\"indutor\",\"ineficaz\",\"inerente\",\"infantil\",\"infestar\",\"infinito\",\"inflamar\",\"informal\",\"infrator\",\"ingerir\",\"inibido\",\"inicial\",\"inimigo\",\"injetar\",\"inocente\",\"inodoro\",\"inovador\",\"inox\",\"inquieto\",\"inscrito\",\"inseto\",\"insistir\",\"inspetor\",\"instalar\",\"insulto\",\"intacto\",\"integral\",\"intimar\",\"intocado\",\"intriga\",\"invasor\",\"inverno\",\"invicto\",\"invocar\",\"iogurte\",\"iraniano\",\"ironizar\",\"irreal\",\"irritado\",\"isca\",\"isento\",\"isolado\",\"isqueiro\",\"italiano\",\"janeiro\",\"jangada\",\"janta\",\"jararaca\",\"jardim\",\"jarro\",\"jasmim\",\"jato\",\"javali\",\"jazida\",\"jejum\",\"joaninha\",\"joelhada\",\"jogador\",\"joia\",\"jornal\",\"jorrar\",\"jovem\",\"juba\",\"judeu\",\"judoca\",\"juiz\",\"julgador\",\"julho\",\"jurado\",\"jurista\",\"juro\",\"justa\",\"labareda\",\"laboral\",\"lacre\",\"lactante\",\"ladrilho\",\"lagarta\",\"lagoa\",\"laje\",\"lamber\",\"lamentar\",\"laminar\",\"lampejo\",\"lanche\",\"lapidar\",\"lapso\",\"laranja\",\"lareira\",\"largura\",\"lasanha\",\"lastro\",\"lateral\",\"latido\",\"lavanda\",\"lavoura\",\"lavrador\",\"laxante\",\"lazer\",\"lealdade\",\"lebre\",\"legado\",\"legendar\",\"legista\",\"leigo\",\"leiloar\",\"leitura\",\"lembrete\",\"leme\",\"lenhador\",\"lentilha\",\"leoa\",\"lesma\",\"leste\",\"letivo\",\"letreiro\",\"levar\",\"leveza\",\"levitar\",\"liberal\",\"libido\",\"liderar\",\"ligar\",\"ligeiro\",\"limitar\",\"limoeiro\",\"limpador\",\"linda\",\"linear\",\"linhagem\",\"liquidez\",\"listagem\",\"lisura\",\"litoral\",\"livro\",\"lixa\",\"lixeira\",\"locador\",\"locutor\",\"lojista\",\"lombo\",\"lona\",\"longe\",\"lontra\",\"lorde\",\"lotado\",\"loteria\",\"loucura\",\"lousa\",\"louvar\",\"luar\",\"lucidez\",\"lucro\",\"luneta\",\"lustre\",\"lutador\",\"luva\",\"macaco\",\"macete\",\"machado\",\"macio\",\"madeira\",\"madrinha\",\"magnata\",\"magreza\",\"maior\",\"mais\",\"malandro\",\"malha\",\"malote\",\"maluco\",\"mamilo\",\"mamoeiro\",\"mamute\",\"manada\",\"mancha\",\"mandato\",\"manequim\",\"manhoso\",\"manivela\",\"manobrar\",\"mansa\",\"manter\",\"manusear\",\"mapeado\",\"maquinar\",\"marcador\",\"maresia\",\"marfim\",\"margem\",\"marinho\",\"marmita\",\"maroto\",\"marquise\",\"marreco\",\"martelo\",\"marujo\",\"mascote\",\"masmorra\",\"massagem\",\"mastigar\",\"matagal\",\"materno\",\"matinal\",\"matutar\",\"maxilar\",\"medalha\",\"medida\",\"medusa\",\"megafone\",\"meiga\",\"melancia\",\"melhor\",\"membro\",\"memorial\",\"menino\",\"menos\",\"mensagem\",\"mental\",\"merecer\",\"mergulho\",\"mesada\",\"mesclar\",\"mesmo\",\"mesquita\",\"mestre\",\"metade\",\"meteoro\",\"metragem\",\"mexer\",\"mexicano\",\"micro\",\"migalha\",\"migrar\",\"milagre\",\"milenar\",\"milhar\",\"mimado\",\"minerar\",\"minhoca\",\"ministro\",\"minoria\",\"miolo\",\"mirante\",\"mirtilo\",\"misturar\",\"mocidade\",\"moderno\",\"modular\",\"moeda\",\"moer\",\"moinho\",\"moita\",\"moldura\",\"moleza\",\"molho\",\"molinete\",\"molusco\",\"montanha\",\"moqueca\",\"morango\",\"morcego\",\"mordomo\",\"morena\",\"mosaico\",\"mosquete\",\"mostarda\",\"motel\",\"motim\",\"moto\",\"motriz\",\"muda\",\"muito\",\"mulata\",\"mulher\",\"multar\",\"mundial\",\"munido\",\"muralha\",\"murcho\",\"muscular\",\"museu\",\"musical\",\"nacional\",\"nadador\",\"naja\",\"namoro\",\"narina\",\"narrado\",\"nascer\",\"nativa\",\"natureza\",\"navalha\",\"navegar\",\"navio\",\"neblina\",\"nebuloso\",\"negativa\",\"negociar\",\"negrito\",\"nervoso\",\"neta\",\"neural\",\"nevasca\",\"nevoeiro\",\"ninar\",\"ninho\",\"nitidez\",\"nivelar\",\"nobreza\",\"noite\",\"noiva\",\"nomear\",\"nominal\",\"nordeste\",\"nortear\",\"notar\",\"noticiar\",\"noturno\",\"novelo\",\"novilho\",\"novo\",\"nublado\",\"nudez\",\"numeral\",\"nupcial\",\"nutrir\",\"nuvem\",\"obcecado\",\"obedecer\",\"objetivo\",\"obrigado\",\"obscuro\",\"obstetra\",\"obter\",\"obturar\",\"ocidente\",\"ocioso\",\"ocorrer\",\"oculista\",\"ocupado\",\"ofegante\",\"ofensiva\",\"oferenda\",\"oficina\",\"ofuscado\",\"ogiva\",\"olaria\",\"oleoso\",\"olhar\",\"oliveira\",\"ombro\",\"omelete\",\"omisso\",\"omitir\",\"ondulado\",\"oneroso\",\"ontem\",\"opcional\",\"operador\",\"oponente\",\"oportuno\",\"oposto\",\"orar\",\"orbitar\",\"ordem\",\"ordinal\",\"orfanato\",\"orgasmo\",\"orgulho\",\"oriental\",\"origem\",\"oriundo\",\"orla\",\"ortodoxo\",\"orvalho\",\"oscilar\",\"ossada\",\"osso\",\"ostentar\",\"otimismo\",\"ousadia\",\"outono\",\"outubro\",\"ouvido\",\"ovelha\",\"ovular\",\"oxidar\",\"oxigenar\",\"pacato\",\"paciente\",\"pacote\",\"pactuar\",\"padaria\",\"padrinho\",\"pagar\",\"pagode\",\"painel\",\"pairar\",\"paisagem\",\"palavra\",\"palestra\",\"palheta\",\"palito\",\"palmada\",\"palpitar\",\"pancada\",\"panela\",\"panfleto\",\"panqueca\",\"pantanal\",\"papagaio\",\"papelada\",\"papiro\",\"parafina\",\"parcial\",\"pardal\",\"parede\",\"partida\",\"pasmo\",\"passado\",\"pastel\",\"patamar\",\"patente\",\"patinar\",\"patrono\",\"paulada\",\"pausar\",\"peculiar\",\"pedalar\",\"pedestre\",\"pediatra\",\"pedra\",\"pegada\",\"peitoral\",\"peixe\",\"pele\",\"pelicano\",\"penca\",\"pendurar\",\"peneira\",\"penhasco\",\"pensador\",\"pente\",\"perceber\",\"perfeito\",\"pergunta\",\"perito\",\"permitir\",\"perna\",\"perplexo\",\"persiana\",\"pertence\",\"peruca\",\"pescado\",\"pesquisa\",\"pessoa\",\"petiscar\",\"piada\",\"picado\",\"piedade\",\"pigmento\",\"pilastra\",\"pilhado\",\"pilotar\",\"pimenta\",\"pincel\",\"pinguim\",\"pinha\",\"pinote\",\"pintar\",\"pioneiro\",\"pipoca\",\"piquete\",\"piranha\",\"pires\",\"pirueta\",\"piscar\",\"pistola\",\"pitanga\",\"pivete\",\"planta\",\"plaqueta\",\"platina\",\"plebeu\",\"plumagem\",\"pluvial\",\"pneu\",\"poda\",\"poeira\",\"poetisa\",\"polegada\",\"policiar\",\"poluente\",\"polvilho\",\"pomar\",\"pomba\",\"ponderar\",\"pontaria\",\"populoso\",\"porta\",\"possuir\",\"postal\",\"pote\",\"poupar\",\"pouso\",\"povoar\",\"praia\",\"prancha\",\"prato\",\"praxe\",\"prece\",\"predador\",\"prefeito\",\"premiar\",\"prensar\",\"preparar\",\"presilha\",\"pretexto\",\"prevenir\",\"prezar\",\"primata\",\"princesa\",\"prisma\",\"privado\",\"processo\",\"produto\",\"profeta\",\"proibido\",\"projeto\",\"prometer\",\"propagar\",\"prosa\",\"protetor\",\"provador\",\"publicar\",\"pudim\",\"pular\",\"pulmonar\",\"pulseira\",\"punhal\",\"punir\",\"pupilo\",\"pureza\",\"puxador\",\"quadra\",\"quantia\",\"quarto\",\"quase\",\"quebrar\",\"queda\",\"queijo\",\"quente\",\"querido\",\"quimono\",\"quina\",\"quiosque\",\"rabanada\",\"rabisco\",\"rachar\",\"racionar\",\"radial\",\"raiar\",\"rainha\",\"raio\",\"raiva\",\"rajada\",\"ralado\",\"ramal\",\"ranger\",\"ranhura\",\"rapadura\",\"rapel\",\"rapidez\",\"raposa\",\"raquete\",\"raridade\",\"rasante\",\"rascunho\",\"rasgar\",\"raspador\",\"rasteira\",\"rasurar\",\"ratazana\",\"ratoeira\",\"realeza\",\"reanimar\",\"reaver\",\"rebaixar\",\"rebelde\",\"rebolar\",\"recado\",\"recente\",\"recheio\",\"recibo\",\"recordar\",\"recrutar\",\"recuar\",\"rede\",\"redimir\",\"redonda\",\"reduzida\",\"reenvio\",\"refinar\",\"refletir\",\"refogar\",\"refresco\",\"refugiar\",\"regalia\",\"regime\",\"regra\",\"reinado\",\"reitor\",\"rejeitar\",\"relativo\",\"remador\",\"remendo\",\"remorso\",\"renovado\",\"reparo\",\"repelir\",\"repleto\",\"repolho\",\"represa\",\"repudiar\",\"requerer\",\"resenha\",\"resfriar\",\"resgatar\",\"residir\",\"resolver\",\"respeito\",\"ressaca\",\"restante\",\"resumir\",\"retalho\",\"reter\",\"retirar\",\"retomada\",\"retratar\",\"revelar\",\"revisor\",\"revolta\",\"riacho\",\"rica\",\"rigidez\",\"rigoroso\",\"rimar\",\"ringue\",\"risada\",\"risco\",\"risonho\",\"robalo\",\"rochedo\",\"rodada\",\"rodeio\",\"rodovia\",\"roedor\",\"roleta\",\"romano\",\"roncar\",\"rosado\",\"roseira\",\"rosto\",\"rota\",\"roteiro\",\"rotina\",\"rotular\",\"rouco\",\"roupa\",\"roxo\",\"rubro\",\"rugido\",\"rugoso\",\"ruivo\",\"rumo\",\"rupestre\",\"russo\",\"sabor\",\"saciar\",\"sacola\",\"sacudir\",\"sadio\",\"safira\",\"saga\",\"sagrada\",\"saibro\",\"salada\",\"saleiro\",\"salgado\",\"saliva\",\"salpicar\",\"salsicha\",\"saltar\",\"salvador\",\"sambar\",\"samurai\",\"sanar\",\"sanfona\",\"sangue\",\"sanidade\",\"sapato\",\"sarda\",\"sargento\",\"sarjeta\",\"saturar\",\"saudade\",\"saxofone\",\"sazonal\",\"secar\",\"secular\",\"seda\",\"sedento\",\"sediado\",\"sedoso\",\"sedutor\",\"segmento\",\"segredo\",\"segundo\",\"seiva\",\"seleto\",\"selvagem\",\"semanal\",\"semente\",\"senador\",\"senhor\",\"sensual\",\"sentado\",\"separado\",\"sereia\",\"seringa\",\"serra\",\"servo\",\"setembro\",\"setor\",\"sigilo\",\"silhueta\",\"silicone\",\"simetria\",\"simpatia\",\"simular\",\"sinal\",\"sincero\",\"singular\",\"sinopse\",\"sintonia\",\"sirene\",\"siri\",\"situado\",\"soberano\",\"sobra\",\"socorro\",\"sogro\",\"soja\",\"solda\",\"soletrar\",\"solteiro\",\"sombrio\",\"sonata\",\"sondar\",\"sonegar\",\"sonhador\",\"sono\",\"soprano\",\"soquete\",\"sorrir\",\"sorteio\",\"sossego\",\"sotaque\",\"soterrar\",\"sovado\",\"sozinho\",\"suavizar\",\"subida\",\"submerso\",\"subsolo\",\"subtrair\",\"sucata\",\"sucesso\",\"suco\",\"sudeste\",\"sufixo\",\"sugador\",\"sugerir\",\"sujeito\",\"sulfato\",\"sumir\",\"suor\",\"superior\",\"suplicar\",\"suposto\",\"suprimir\",\"surdina\",\"surfista\",\"surpresa\",\"surreal\",\"surtir\",\"suspiro\",\"sustento\",\"tabela\",\"tablete\",\"tabuada\",\"tacho\",\"tagarela\",\"talher\",\"talo\",\"talvez\",\"tamanho\",\"tamborim\",\"tampa\",\"tangente\",\"tanto\",\"tapar\",\"tapioca\",\"tardio\",\"tarefa\",\"tarja\",\"tarraxa\",\"tatuagem\",\"taurino\",\"taxativo\",\"taxista\",\"teatral\",\"tecer\",\"tecido\",\"teclado\",\"tedioso\",\"teia\",\"teimar\",\"telefone\",\"telhado\",\"tempero\",\"tenente\",\"tensor\",\"tentar\",\"termal\",\"terno\",\"terreno\",\"tese\",\"tesoura\",\"testado\",\"teto\",\"textura\",\"texugo\",\"tiara\",\"tigela\",\"tijolo\",\"timbrar\",\"timidez\",\"tingido\",\"tinteiro\",\"tiragem\",\"titular\",\"toalha\",\"tocha\",\"tolerar\",\"tolice\",\"tomada\",\"tomilho\",\"tonel\",\"tontura\",\"topete\",\"tora\",\"torcido\",\"torneio\",\"torque\",\"torrada\",\"torto\",\"tostar\",\"touca\",\"toupeira\",\"toxina\",\"trabalho\",\"tracejar\",\"tradutor\",\"trafegar\",\"trajeto\",\"trama\",\"trancar\",\"trapo\",\"traseiro\",\"tratador\",\"travar\",\"treino\",\"tremer\",\"trepidar\",\"trevo\",\"triagem\",\"tribo\",\"triciclo\",\"tridente\",\"trilogia\",\"trindade\",\"triplo\",\"triturar\",\"triunfal\",\"trocar\",\"trombeta\",\"trova\",\"trunfo\",\"truque\",\"tubular\",\"tucano\",\"tudo\",\"tulipa\",\"tupi\",\"turbo\",\"turma\",\"turquesa\",\"tutelar\",\"tutorial\",\"uivar\",\"umbigo\",\"unha\",\"unidade\",\"uniforme\",\"urologia\",\"urso\",\"urtiga\",\"urubu\",\"usado\",\"usina\",\"usufruir\",\"vacina\",\"vadiar\",\"vagaroso\",\"vaidoso\",\"vala\",\"valente\",\"validade\",\"valores\",\"vantagem\",\"vaqueiro\",\"varanda\",\"vareta\",\"varrer\",\"vascular\",\"vasilha\",\"vassoura\",\"vazar\",\"vazio\",\"veado\",\"vedar\",\"vegetar\",\"veicular\",\"veleiro\",\"velhice\",\"veludo\",\"vencedor\",\"vendaval\",\"venerar\",\"ventre\",\"verbal\",\"verdade\",\"vereador\",\"vergonha\",\"vermelho\",\"verniz\",\"versar\",\"vertente\",\"vespa\",\"vestido\",\"vetorial\",\"viaduto\",\"viagem\",\"viajar\",\"viatura\",\"vibrador\",\"videira\",\"vidraria\",\"viela\",\"viga\",\"vigente\",\"vigiar\",\"vigorar\",\"vilarejo\",\"vinco\",\"vinheta\",\"vinil\",\"violeta\",\"virada\",\"virtude\",\"visitar\",\"visto\",\"vitral\",\"viveiro\",\"vizinho\",\"voador\",\"voar\",\"vogal\",\"volante\",\"voleibol\",\"voltagem\",\"volumoso\",\"vontade\",\"vulto\",\"vuvuzela\",\"xadrez\",\"xarope\",\"xeque\",\"xeretar\",\"xerife\",\"xingar\",\"zangado\",\"zarpar\",\"zebu\",\"zelador\",\"zombar\",\"zoologia\",\"zumbido\"]");

const require$$9 = /* #__PURE__ */ JSON.parse("[\"abandon\",\"ability\",\"able\",\"about\",\"above\",\"absent\",\"absorb\",\"abstract\",\"absurd\",\"abuse\",\"access\",\"accident\",\"account\",\"accuse\",\"achieve\",\"acid\",\"acoustic\",\"acquire\",\"across\",\"act\",\"action\",\"actor\",\"actress\",\"actual\",\"adapt\",\"add\",\"addict\",\"address\",\"adjust\",\"admit\",\"adult\",\"advance\",\"advice\",\"aerobic\",\"affair\",\"afford\",\"afraid\",\"again\",\"age\",\"agent\",\"agree\",\"ahead\",\"aim\",\"air\",\"airport\",\"aisle\",\"alarm\",\"album\",\"alcohol\",\"alert\",\"alien\",\"all\",\"alley\",\"allow\",\"almost\",\"alone\",\"alpha\",\"already\",\"also\",\"alter\",\"always\",\"amateur\",\"amazing\",\"among\",\"amount\",\"amused\",\"analyst\",\"anchor\",\"ancient\",\"anger\",\"angle\",\"angry\",\"animal\",\"ankle\",\"announce\",\"annual\",\"another\",\"answer\",\"antenna\",\"antique\",\"anxiety\",\"any\",\"apart\",\"apology\",\"appear\",\"apple\",\"approve\",\"april\",\"arch\",\"arctic\",\"area\",\"arena\",\"argue\",\"arm\",\"armed\",\"armor\",\"army\",\"around\",\"arrange\",\"arrest\",\"arrive\",\"arrow\",\"art\",\"artefact\",\"artist\",\"artwork\",\"ask\",\"aspect\",\"assault\",\"asset\",\"assist\",\"assume\",\"asthma\",\"athlete\",\"atom\",\"attack\",\"attend\",\"attitude\",\"attract\",\"auction\",\"audit\",\"august\",\"aunt\",\"author\",\"auto\",\"autumn\",\"average\",\"avocado\",\"avoid\",\"awake\",\"aware\",\"away\",\"awesome\",\"awful\",\"awkward\",\"axis\",\"baby\",\"bachelor\",\"bacon\",\"badge\",\"bag\",\"balance\",\"balcony\",\"ball\",\"bamboo\",\"banana\",\"banner\",\"bar\",\"barely\",\"bargain\",\"barrel\",\"base\",\"basic\",\"basket\",\"battle\",\"beach\",\"bean\",\"beauty\",\"because\",\"become\",\"beef\",\"before\",\"begin\",\"behave\",\"behind\",\"believe\",\"below\",\"belt\",\"bench\",\"benefit\",\"best\",\"betray\",\"better\",\"between\",\"beyond\",\"bicycle\",\"bid\",\"bike\",\"bind\",\"biology\",\"bird\",\"birth\",\"bitter\",\"black\",\"blade\",\"blame\",\"blanket\",\"blast\",\"bleak\",\"bless\",\"blind\",\"blood\",\"blossom\",\"blouse\",\"blue\",\"blur\",\"blush\",\"board\",\"boat\",\"body\",\"boil\",\"bomb\",\"bone\",\"bonus\",\"book\",\"boost\",\"border\",\"boring\",\"borrow\",\"boss\",\"bottom\",\"bounce\",\"box\",\"boy\",\"bracket\",\"brain\",\"brand\",\"brass\",\"brave\",\"bread\",\"breeze\",\"brick\",\"bridge\",\"brief\",\"bright\",\"bring\",\"brisk\",\"broccoli\",\"broken\",\"bronze\",\"broom\",\"brother\",\"brown\",\"brush\",\"bubble\",\"buddy\",\"budget\",\"buffalo\",\"build\",\"bulb\",\"bulk\",\"bullet\",\"bundle\",\"bunker\",\"burden\",\"burger\",\"burst\",\"bus\",\"business\",\"busy\",\"butter\",\"buyer\",\"buzz\",\"cabbage\",\"cabin\",\"cable\",\"cactus\",\"cage\",\"cake\",\"call\",\"calm\",\"camera\",\"camp\",\"can\",\"canal\",\"cancel\",\"candy\",\"cannon\",\"canoe\",\"canvas\",\"canyon\",\"capable\",\"capital\",\"captain\",\"car\",\"carbon\",\"card\",\"cargo\",\"carpet\",\"carry\",\"cart\",\"case\",\"cash\",\"casino\",\"castle\",\"casual\",\"cat\",\"catalog\",\"catch\",\"category\",\"cattle\",\"caught\",\"cause\",\"caution\",\"cave\",\"ceiling\",\"celery\",\"cement\",\"census\",\"century\",\"cereal\",\"certain\",\"chair\",\"chalk\",\"champion\",\"change\",\"chaos\",\"chapter\",\"charge\",\"chase\",\"chat\",\"cheap\",\"check\",\"cheese\",\"chef\",\"cherry\",\"chest\",\"chicken\",\"chief\",\"child\",\"chimney\",\"choice\",\"choose\",\"chronic\",\"chuckle\",\"chunk\",\"churn\",\"cigar\",\"cinnamon\",\"circle\",\"citizen\",\"city\",\"civil\",\"claim\",\"clap\",\"clarify\",\"claw\",\"clay\",\"clean\",\"clerk\",\"clever\",\"click\",\"client\",\"cliff\",\"climb\",\"clinic\",\"clip\",\"clock\",\"clog\",\"close\",\"cloth\",\"cloud\",\"clown\",\"club\",\"clump\",\"cluster\",\"clutch\",\"coach\",\"coast\",\"coconut\",\"code\",\"coffee\",\"coil\",\"coin\",\"collect\",\"color\",\"column\",\"combine\",\"come\",\"comfort\",\"comic\",\"common\",\"company\",\"concert\",\"conduct\",\"confirm\",\"congress\",\"connect\",\"consider\",\"control\",\"convince\",\"cook\",\"cool\",\"copper\",\"copy\",\"coral\",\"core\",\"corn\",\"correct\",\"cost\",\"cotton\",\"couch\",\"country\",\"couple\",\"course\",\"cousin\",\"cover\",\"coyote\",\"crack\",\"cradle\",\"craft\",\"cram\",\"crane\",\"crash\",\"crater\",\"crawl\",\"crazy\",\"cream\",\"credit\",\"creek\",\"crew\",\"cricket\",\"crime\",\"crisp\",\"critic\",\"crop\",\"cross\",\"crouch\",\"crowd\",\"crucial\",\"cruel\",\"cruise\",\"crumble\",\"crunch\",\"crush\",\"cry\",\"crystal\",\"cube\",\"culture\",\"cup\",\"cupboard\",\"curious\",\"current\",\"curtain\",\"curve\",\"cushion\",\"custom\",\"cute\",\"cycle\",\"dad\",\"damage\",\"damp\",\"dance\",\"danger\",\"daring\",\"dash\",\"daughter\",\"dawn\",\"day\",\"deal\",\"debate\",\"debris\",\"decade\",\"december\",\"decide\",\"decline\",\"decorate\",\"decrease\",\"deer\",\"defense\",\"define\",\"defy\",\"degree\",\"delay\",\"deliver\",\"demand\",\"demise\",\"denial\",\"dentist\",\"deny\",\"depart\",\"depend\",\"deposit\",\"depth\",\"deputy\",\"derive\",\"describe\",\"desert\",\"design\",\"desk\",\"despair\",\"destroy\",\"detail\",\"detect\",\"develop\",\"device\",\"devote\",\"diagram\",\"dial\",\"diamond\",\"diary\",\"dice\",\"diesel\",\"diet\",\"differ\",\"digital\",\"dignity\",\"dilemma\",\"dinner\",\"dinosaur\",\"direct\",\"dirt\",\"disagree\",\"discover\",\"disease\",\"dish\",\"dismiss\",\"disorder\",\"display\",\"distance\",\"divert\",\"divide\",\"divorce\",\"dizzy\",\"doctor\",\"document\",\"dog\",\"doll\",\"dolphin\",\"domain\",\"donate\",\"donkey\",\"donor\",\"door\",\"dose\",\"double\",\"dove\",\"draft\",\"dragon\",\"drama\",\"drastic\",\"draw\",\"dream\",\"dress\",\"drift\",\"drill\",\"drink\",\"drip\",\"drive\",\"drop\",\"drum\",\"dry\",\"duck\",\"dumb\",\"dune\",\"during\",\"dust\",\"dutch\",\"duty\",\"dwarf\",\"dynamic\",\"eager\",\"eagle\",\"early\",\"earn\",\"earth\",\"easily\",\"east\",\"easy\",\"echo\",\"ecology\",\"economy\",\"edge\",\"edit\",\"educate\",\"effort\",\"egg\",\"eight\",\"either\",\"elbow\",\"elder\",\"electric\",\"elegant\",\"element\",\"elephant\",\"elevator\",\"elite\",\"else\",\"embark\",\"embody\",\"embrace\",\"emerge\",\"emotion\",\"employ\",\"empower\",\"empty\",\"enable\",\"enact\",\"end\",\"endless\",\"endorse\",\"enemy\",\"energy\",\"enforce\",\"engage\",\"engine\",\"enhance\",\"enjoy\",\"enlist\",\"enough\",\"enrich\",\"enroll\",\"ensure\",\"enter\",\"entire\",\"entry\",\"envelope\",\"episode\",\"equal\",\"equip\",\"era\",\"erase\",\"erode\",\"erosion\",\"error\",\"erupt\",\"escape\",\"essay\",\"essence\",\"estate\",\"eternal\",\"ethics\",\"evidence\",\"evil\",\"evoke\",\"evolve\",\"exact\",\"example\",\"excess\",\"exchange\",\"excite\",\"exclude\",\"excuse\",\"execute\",\"exercise\",\"exhaust\",\"exhibit\",\"exile\",\"exist\",\"exit\",\"exotic\",\"expand\",\"expect\",\"expire\",\"explain\",\"expose\",\"express\",\"extend\",\"extra\",\"eye\",\"eyebrow\",\"fabric\",\"face\",\"faculty\",\"fade\",\"faint\",\"faith\",\"fall\",\"false\",\"fame\",\"family\",\"famous\",\"fan\",\"fancy\",\"fantasy\",\"farm\",\"fashion\",\"fat\",\"fatal\",\"father\",\"fatigue\",\"fault\",\"favorite\",\"feature\",\"february\",\"federal\",\"fee\",\"feed\",\"feel\",\"female\",\"fence\",\"festival\",\"fetch\",\"fever\",\"few\",\"fiber\",\"fiction\",\"field\",\"figure\",\"file\",\"film\",\"filter\",\"final\",\"find\",\"fine\",\"finger\",\"finish\",\"fire\",\"firm\",\"first\",\"fiscal\",\"fish\",\"fit\",\"fitness\",\"fix\",\"flag\",\"flame\",\"flash\",\"flat\",\"flavor\",\"flee\",\"flight\",\"flip\",\"float\",\"flock\",\"floor\",\"flower\",\"fluid\",\"flush\",\"fly\",\"foam\",\"focus\",\"fog\",\"foil\",\"fold\",\"follow\",\"food\",\"foot\",\"force\",\"forest\",\"forget\",\"fork\",\"fortune\",\"forum\",\"forward\",\"fossil\",\"foster\",\"found\",\"fox\",\"fragile\",\"frame\",\"frequent\",\"fresh\",\"friend\",\"fringe\",\"frog\",\"front\",\"frost\",\"frown\",\"frozen\",\"fruit\",\"fuel\",\"fun\",\"funny\",\"furnace\",\"fury\",\"future\",\"gadget\",\"gain\",\"galaxy\",\"gallery\",\"game\",\"gap\",\"garage\",\"garbage\",\"garden\",\"garlic\",\"garment\",\"gas\",\"gasp\",\"gate\",\"gather\",\"gauge\",\"gaze\",\"general\",\"genius\",\"genre\",\"gentle\",\"genuine\",\"gesture\",\"ghost\",\"giant\",\"gift\",\"giggle\",\"ginger\",\"giraffe\",\"girl\",\"give\",\"glad\",\"glance\",\"glare\",\"glass\",\"glide\",\"glimpse\",\"globe\",\"gloom\",\"glory\",\"glove\",\"glow\",\"glue\",\"goat\",\"goddess\",\"gold\",\"good\",\"goose\",\"gorilla\",\"gospel\",\"gossip\",\"govern\",\"gown\",\"grab\",\"grace\",\"grain\",\"grant\",\"grape\",\"grass\",\"gravity\",\"great\",\"green\",\"grid\",\"grief\",\"grit\",\"grocery\",\"group\",\"grow\",\"grunt\",\"guard\",\"guess\",\"guide\",\"guilt\",\"guitar\",\"gun\",\"gym\",\"habit\",\"hair\",\"half\",\"hammer\",\"hamster\",\"hand\",\"happy\",\"harbor\",\"hard\",\"harsh\",\"harvest\",\"hat\",\"have\",\"hawk\",\"hazard\",\"head\",\"health\",\"heart\",\"heavy\",\"hedgehog\",\"height\",\"hello\",\"helmet\",\"help\",\"hen\",\"hero\",\"hidden\",\"high\",\"hill\",\"hint\",\"hip\",\"hire\",\"history\",\"hobby\",\"hockey\",\"hold\",\"hole\",\"holiday\",\"hollow\",\"home\",\"honey\",\"hood\",\"hope\",\"horn\",\"horror\",\"horse\",\"hospital\",\"host\",\"hotel\",\"hour\",\"hover\",\"hub\",\"huge\",\"human\",\"humble\",\"humor\",\"hundred\",\"hungry\",\"hunt\",\"hurdle\",\"hurry\",\"hurt\",\"husband\",\"hybrid\",\"ice\",\"icon\",\"idea\",\"identify\",\"idle\",\"ignore\",\"ill\",\"illegal\",\"illness\",\"image\",\"imitate\",\"immense\",\"immune\",\"impact\",\"impose\",\"improve\",\"impulse\",\"inch\",\"include\",\"income\",\"increase\",\"index\",\"indicate\",\"indoor\",\"industry\",\"infant\",\"inflict\",\"inform\",\"inhale\",\"inherit\",\"initial\",\"inject\",\"injury\",\"inmate\",\"inner\",\"innocent\",\"input\",\"inquiry\",\"insane\",\"insect\",\"inside\",\"inspire\",\"install\",\"intact\",\"interest\",\"into\",\"invest\",\"invite\",\"involve\",\"iron\",\"island\",\"isolate\",\"issue\",\"item\",\"ivory\",\"jacket\",\"jaguar\",\"jar\",\"jazz\",\"jealous\",\"jeans\",\"jelly\",\"jewel\",\"job\",\"join\",\"joke\",\"journey\",\"joy\",\"judge\",\"juice\",\"jump\",\"jungle\",\"junior\",\"junk\",\"just\",\"kangaroo\",\"keen\",\"keep\",\"ketchup\",\"key\",\"kick\",\"kid\",\"kidney\",\"kind\",\"kingdom\",\"kiss\",\"kit\",\"kitchen\",\"kite\",\"kitten\",\"kiwi\",\"knee\",\"knife\",\"knock\",\"know\",\"lab\",\"label\",\"labor\",\"ladder\",\"lady\",\"lake\",\"lamp\",\"language\",\"laptop\",\"large\",\"later\",\"latin\",\"laugh\",\"laundry\",\"lava\",\"law\",\"lawn\",\"lawsuit\",\"layer\",\"lazy\",\"leader\",\"leaf\",\"learn\",\"leave\",\"lecture\",\"left\",\"leg\",\"legal\",\"legend\",\"leisure\",\"lemon\",\"lend\",\"length\",\"lens\",\"leopard\",\"lesson\",\"letter\",\"level\",\"liar\",\"liberty\",\"library\",\"license\",\"life\",\"lift\",\"light\",\"like\",\"limb\",\"limit\",\"link\",\"lion\",\"liquid\",\"list\",\"little\",\"live\",\"lizard\",\"load\",\"loan\",\"lobster\",\"local\",\"lock\",\"logic\",\"lonely\",\"long\",\"loop\",\"lottery\",\"loud\",\"lounge\",\"love\",\"loyal\",\"lucky\",\"luggage\",\"lumber\",\"lunar\",\"lunch\",\"luxury\",\"lyrics\",\"machine\",\"mad\",\"magic\",\"magnet\",\"maid\",\"mail\",\"main\",\"major\",\"make\",\"mammal\",\"man\",\"manage\",\"mandate\",\"mango\",\"mansion\",\"manual\",\"maple\",\"marble\",\"march\",\"margin\",\"marine\",\"market\",\"marriage\",\"mask\",\"mass\",\"master\",\"match\",\"material\",\"math\",\"matrix\",\"matter\",\"maximum\",\"maze\",\"meadow\",\"mean\",\"measure\",\"meat\",\"mechanic\",\"medal\",\"media\",\"melody\",\"melt\",\"member\",\"memory\",\"mention\",\"menu\",\"mercy\",\"merge\",\"merit\",\"merry\",\"mesh\",\"message\",\"metal\",\"method\",\"middle\",\"midnight\",\"milk\",\"million\",\"mimic\",\"mind\",\"minimum\",\"minor\",\"minute\",\"miracle\",\"mirror\",\"misery\",\"miss\",\"mistake\",\"mix\",\"mixed\",\"mixture\",\"mobile\",\"model\",\"modify\",\"mom\",\"moment\",\"monitor\",\"monkey\",\"monster\",\"month\",\"moon\",\"moral\",\"more\",\"morning\",\"mosquito\",\"mother\",\"motion\",\"motor\",\"mountain\",\"mouse\",\"move\",\"movie\",\"much\",\"muffin\",\"mule\",\"multiply\",\"muscle\",\"museum\",\"mushroom\",\"music\",\"must\",\"mutual\",\"myself\",\"mystery\",\"myth\",\"naive\",\"name\",\"napkin\",\"narrow\",\"nasty\",\"nation\",\"nature\",\"near\",\"neck\",\"need\",\"negative\",\"neglect\",\"neither\",\"nephew\",\"nerve\",\"nest\",\"net\",\"network\",\"neutral\",\"never\",\"news\",\"next\",\"nice\",\"night\",\"noble\",\"noise\",\"nominee\",\"noodle\",\"normal\",\"north\",\"nose\",\"notable\",\"note\",\"nothing\",\"notice\",\"novel\",\"now\",\"nuclear\",\"number\",\"nurse\",\"nut\",\"oak\",\"obey\",\"object\",\"oblige\",\"obscure\",\"observe\",\"obtain\",\"obvious\",\"occur\",\"ocean\",\"october\",\"odor\",\"off\",\"offer\",\"office\",\"often\",\"oil\",\"okay\",\"old\",\"olive\",\"olympic\",\"omit\",\"once\",\"one\",\"onion\",\"online\",\"only\",\"open\",\"opera\",\"opinion\",\"oppose\",\"option\",\"orange\",\"orbit\",\"orchard\",\"order\",\"ordinary\",\"organ\",\"orient\",\"original\",\"orphan\",\"ostrich\",\"other\",\"outdoor\",\"outer\",\"output\",\"outside\",\"oval\",\"oven\",\"over\",\"own\",\"owner\",\"oxygen\",\"oyster\",\"ozone\",\"pact\",\"paddle\",\"page\",\"pair\",\"palace\",\"palm\",\"panda\",\"panel\",\"panic\",\"panther\",\"paper\",\"parade\",\"parent\",\"park\",\"parrot\",\"party\",\"pass\",\"patch\",\"path\",\"patient\",\"patrol\",\"pattern\",\"pause\",\"pave\",\"payment\",\"peace\",\"peanut\",\"pear\",\"peasant\",\"pelican\",\"pen\",\"penalty\",\"pencil\",\"people\",\"pepper\",\"perfect\",\"permit\",\"person\",\"pet\",\"phone\",\"photo\",\"phrase\",\"physical\",\"piano\",\"picnic\",\"picture\",\"piece\",\"pig\",\"pigeon\",\"pill\",\"pilot\",\"pink\",\"pioneer\",\"pipe\",\"pistol\",\"pitch\",\"pizza\",\"place\",\"planet\",\"plastic\",\"plate\",\"play\",\"please\",\"pledge\",\"pluck\",\"plug\",\"plunge\",\"poem\",\"poet\",\"point\",\"polar\",\"pole\",\"police\",\"pond\",\"pony\",\"pool\",\"popular\",\"portion\",\"position\",\"possible\",\"post\",\"potato\",\"pottery\",\"poverty\",\"powder\",\"power\",\"practice\",\"praise\",\"predict\",\"prefer\",\"prepare\",\"present\",\"pretty\",\"prevent\",\"price\",\"pride\",\"primary\",\"print\",\"priority\",\"prison\",\"private\",\"prize\",\"problem\",\"process\",\"produce\",\"profit\",\"program\",\"project\",\"promote\",\"proof\",\"property\",\"prosper\",\"protect\",\"proud\",\"provide\",\"public\",\"pudding\",\"pull\",\"pulp\",\"pulse\",\"pumpkin\",\"punch\",\"pupil\",\"puppy\",\"purchase\",\"purity\",\"purpose\",\"purse\",\"push\",\"put\",\"puzzle\",\"pyramid\",\"quality\",\"quantum\",\"quarter\",\"question\",\"quick\",\"quit\",\"quiz\",\"quote\",\"rabbit\",\"raccoon\",\"race\",\"rack\",\"radar\",\"radio\",\"rail\",\"rain\",\"raise\",\"rally\",\"ramp\",\"ranch\",\"random\",\"range\",\"rapid\",\"rare\",\"rate\",\"rather\",\"raven\",\"raw\",\"razor\",\"ready\",\"real\",\"reason\",\"rebel\",\"rebuild\",\"recall\",\"receive\",\"recipe\",\"record\",\"recycle\",\"reduce\",\"reflect\",\"reform\",\"refuse\",\"region\",\"regret\",\"regular\",\"reject\",\"relax\",\"release\",\"relief\",\"rely\",\"remain\",\"remember\",\"remind\",\"remove\",\"render\",\"renew\",\"rent\",\"reopen\",\"repair\",\"repeat\",\"replace\",\"report\",\"require\",\"rescue\",\"resemble\",\"resist\",\"resource\",\"response\",\"result\",\"retire\",\"retreat\",\"return\",\"reunion\",\"reveal\",\"review\",\"reward\",\"rhythm\",\"rib\",\"ribbon\",\"rice\",\"rich\",\"ride\",\"ridge\",\"rifle\",\"right\",\"rigid\",\"ring\",\"riot\",\"ripple\",\"risk\",\"ritual\",\"rival\",\"river\",\"road\",\"roast\",\"robot\",\"robust\",\"rocket\",\"romance\",\"roof\",\"rookie\",\"room\",\"rose\",\"rotate\",\"rough\",\"round\",\"route\",\"royal\",\"rubber\",\"rude\",\"rug\",\"rule\",\"run\",\"runway\",\"rural\",\"sad\",\"saddle\",\"sadness\",\"safe\",\"sail\",\"salad\",\"salmon\",\"salon\",\"salt\",\"salute\",\"same\",\"sample\",\"sand\",\"satisfy\",\"satoshi\",\"sauce\",\"sausage\",\"save\",\"say\",\"scale\",\"scan\",\"scare\",\"scatter\",\"scene\",\"scheme\",\"school\",\"science\",\"scissors\",\"scorpion\",\"scout\",\"scrap\",\"screen\",\"script\",\"scrub\",\"sea\",\"search\",\"season\",\"seat\",\"second\",\"secret\",\"section\",\"security\",\"seed\",\"seek\",\"segment\",\"select\",\"sell\",\"seminar\",\"senior\",\"sense\",\"sentence\",\"series\",\"service\",\"session\",\"settle\",\"setup\",\"seven\",\"shadow\",\"shaft\",\"shallow\",\"share\",\"shed\",\"shell\",\"sheriff\",\"shield\",\"shift\",\"shine\",\"ship\",\"shiver\",\"shock\",\"shoe\",\"shoot\",\"shop\",\"short\",\"shoulder\",\"shove\",\"shrimp\",\"shrug\",\"shuffle\",\"shy\",\"sibling\",\"sick\",\"side\",\"siege\",\"sight\",\"sign\",\"silent\",\"silk\",\"silly\",\"silver\",\"similar\",\"simple\",\"since\",\"sing\",\"siren\",\"sister\",\"situate\",\"six\",\"size\",\"skate\",\"sketch\",\"ski\",\"skill\",\"skin\",\"skirt\",\"skull\",\"slab\",\"slam\",\"sleep\",\"slender\",\"slice\",\"slide\",\"slight\",\"slim\",\"slogan\",\"slot\",\"slow\",\"slush\",\"small\",\"smart\",\"smile\",\"smoke\",\"smooth\",\"snack\",\"snake\",\"snap\",\"sniff\",\"snow\",\"soap\",\"soccer\",\"social\",\"sock\",\"soda\",\"soft\",\"solar\",\"soldier\",\"solid\",\"solution\",\"solve\",\"someone\",\"song\",\"soon\",\"sorry\",\"sort\",\"soul\",\"sound\",\"soup\",\"source\",\"south\",\"space\",\"spare\",\"spatial\",\"spawn\",\"speak\",\"special\",\"speed\",\"spell\",\"spend\",\"sphere\",\"spice\",\"spider\",\"spike\",\"spin\",\"spirit\",\"split\",\"spoil\",\"sponsor\",\"spoon\",\"sport\",\"spot\",\"spray\",\"spread\",\"spring\",\"spy\",\"square\",\"squeeze\",\"squirrel\",\"stable\",\"stadium\",\"staff\",\"stage\",\"stairs\",\"stamp\",\"stand\",\"start\",\"state\",\"stay\",\"steak\",\"steel\",\"stem\",\"step\",\"stereo\",\"stick\",\"still\",\"sting\",\"stock\",\"stomach\",\"stone\",\"stool\",\"story\",\"stove\",\"strategy\",\"street\",\"strike\",\"strong\",\"struggle\",\"student\",\"stuff\",\"stumble\",\"style\",\"subject\",\"submit\",\"subway\",\"success\",\"such\",\"sudden\",\"suffer\",\"sugar\",\"suggest\",\"suit\",\"summer\",\"sun\",\"sunny\",\"sunset\",\"super\",\"supply\",\"supreme\",\"sure\",\"surface\",\"surge\",\"surprise\",\"surround\",\"survey\",\"suspect\",\"sustain\",\"swallow\",\"swamp\",\"swap\",\"swarm\",\"swear\",\"sweet\",\"swift\",\"swim\",\"swing\",\"switch\",\"sword\",\"symbol\",\"symptom\",\"syrup\",\"system\",\"table\",\"tackle\",\"tag\",\"tail\",\"talent\",\"talk\",\"tank\",\"tape\",\"target\",\"task\",\"taste\",\"tattoo\",\"taxi\",\"teach\",\"team\",\"tell\",\"ten\",\"tenant\",\"tennis\",\"tent\",\"term\",\"test\",\"text\",\"thank\",\"that\",\"theme\",\"then\",\"theory\",\"there\",\"they\",\"thing\",\"this\",\"thought\",\"three\",\"thrive\",\"throw\",\"thumb\",\"thunder\",\"ticket\",\"tide\",\"tiger\",\"tilt\",\"timber\",\"time\",\"tiny\",\"tip\",\"tired\",\"tissue\",\"title\",\"toast\",\"tobacco\",\"today\",\"toddler\",\"toe\",\"together\",\"toilet\",\"token\",\"tomato\",\"tomorrow\",\"tone\",\"tongue\",\"tonight\",\"tool\",\"tooth\",\"top\",\"topic\",\"topple\",\"torch\",\"tornado\",\"tortoise\",\"toss\",\"total\",\"tourist\",\"toward\",\"tower\",\"town\",\"toy\",\"track\",\"trade\",\"traffic\",\"tragic\",\"train\",\"transfer\",\"trap\",\"trash\",\"travel\",\"tray\",\"treat\",\"tree\",\"trend\",\"trial\",\"tribe\",\"trick\",\"trigger\",\"trim\",\"trip\",\"trophy\",\"trouble\",\"truck\",\"true\",\"truly\",\"trumpet\",\"trust\",\"truth\",\"try\",\"tube\",\"tuition\",\"tumble\",\"tuna\",\"tunnel\",\"turkey\",\"turn\",\"turtle\",\"twelve\",\"twenty\",\"twice\",\"twin\",\"twist\",\"two\",\"type\",\"typical\",\"ugly\",\"umbrella\",\"unable\",\"unaware\",\"uncle\",\"uncover\",\"under\",\"undo\",\"unfair\",\"unfold\",\"unhappy\",\"uniform\",\"unique\",\"unit\",\"universe\",\"unknown\",\"unlock\",\"until\",\"unusual\",\"unveil\",\"update\",\"upgrade\",\"uphold\",\"upon\",\"upper\",\"upset\",\"urban\",\"urge\",\"usage\",\"use\",\"used\",\"useful\",\"useless\",\"usual\",\"utility\",\"vacant\",\"vacuum\",\"vague\",\"valid\",\"valley\",\"valve\",\"van\",\"vanish\",\"vapor\",\"various\",\"vast\",\"vault\",\"vehicle\",\"velvet\",\"vendor\",\"venture\",\"venue\",\"verb\",\"verify\",\"version\",\"very\",\"vessel\",\"veteran\",\"viable\",\"vibrant\",\"vicious\",\"victory\",\"video\",\"view\",\"village\",\"vintage\",\"violin\",\"virtual\",\"virus\",\"visa\",\"visit\",\"visual\",\"vital\",\"vivid\",\"vocal\",\"voice\",\"void\",\"volcano\",\"volume\",\"vote\",\"voyage\",\"wage\",\"wagon\",\"wait\",\"walk\",\"wall\",\"walnut\",\"want\",\"warfare\",\"warm\",\"warrior\",\"wash\",\"wasp\",\"waste\",\"water\",\"wave\",\"way\",\"wealth\",\"weapon\",\"wear\",\"weasel\",\"weather\",\"web\",\"wedding\",\"weekend\",\"weird\",\"welcome\",\"west\",\"wet\",\"whale\",\"what\",\"wheat\",\"wheel\",\"when\",\"where\",\"whip\",\"whisper\",\"wide\",\"width\",\"wife\",\"wild\",\"will\",\"win\",\"window\",\"wine\",\"wing\",\"wink\",\"winner\",\"winter\",\"wire\",\"wisdom\",\"wise\",\"wish\",\"witness\",\"wolf\",\"woman\",\"wonder\",\"wood\",\"wool\",\"word\",\"work\",\"world\",\"worry\",\"worth\",\"wrap\",\"wreck\",\"wrestle\",\"wrist\",\"write\",\"wrong\",\"yard\",\"year\",\"yellow\",\"you\",\"young\",\"youth\",\"zebra\",\"zero\",\"zone\",\"zoo\"]");

var hasRequired_wordlists;

function require_wordlists () {
	if (hasRequired_wordlists) return _wordlists;
	hasRequired_wordlists = 1;
	Object.defineProperty(_wordlists, "__esModule", { value: true });
	// browserify by default only pulls in files that are hard coded in requires
	// In order of last to first in this file, the default wordlist will be chosen
	// based on what is present. (Bundles may remove wordlists they don't need)
	const wordlists = {};
	_wordlists.wordlists = wordlists;
	let _default;
	_wordlists._default = _default;
	try {
	    _wordlists._default = _default = require$$0;
	    wordlists.czech = _default;
	}
	catch (err) { }
	try {
	    _wordlists._default = _default = require$$1;
	    wordlists.chinese_simplified = _default;
	}
	catch (err) { }
	try {
	    _wordlists._default = _default = require$$2;
	    wordlists.chinese_traditional = _default;
	}
	catch (err) { }
	try {
	    _wordlists._default = _default = require$$3;
	    wordlists.korean = _default;
	}
	catch (err) { }
	try {
	    _wordlists._default = _default = require$$4;
	    wordlists.french = _default;
	}
	catch (err) { }
	try {
	    _wordlists._default = _default = require$$5;
	    wordlists.italian = _default;
	}
	catch (err) { }
	try {
	    _wordlists._default = _default = require$$6;
	    wordlists.spanish = _default;
	}
	catch (err) { }
	try {
	    _wordlists._default = _default = require$$7;
	    wordlists.japanese = _default;
	    wordlists.JA = _default;
	}
	catch (err) { }
	try {
	    _wordlists._default = _default = require$$8;
	    wordlists.portuguese = _default;
	}
	catch (err) { }
	try {
	    _wordlists._default = _default = require$$9;
	    wordlists.english = _default;
	    wordlists.EN = _default;
	}
	catch (err) { }
	return _wordlists;
}

var hasRequiredSrc;

function requireSrc () {
	if (hasRequiredSrc) return src;
	hasRequiredSrc = 1;
	Object.defineProperty(src, "__esModule", { value: true });
	const sha256_1 = /*@__PURE__*/ requireSha256();
	const sha512_1 = /*@__PURE__*/ requireSha512();
	const pbkdf2_1 = /*@__PURE__*/ requirePbkdf2();
	const utils_1 = /*@__PURE__*/ requireUtils();
	const _wordlists_1 = require_wordlists();
	let DEFAULT_WORDLIST = _wordlists_1._default;
	const INVALID_MNEMONIC = 'Invalid mnemonic';
	const INVALID_ENTROPY = 'Invalid entropy';
	const INVALID_CHECKSUM = 'Invalid mnemonic checksum';
	const WORDLIST_REQUIRED = 'A wordlist is required but a default could not be found.\n' +
	    'Please pass a 2048 word array explicitly.';
	function normalize(str) {
	    return (str || '').normalize('NFKD');
	}
	function lpad(str, padString, length) {
	    while (str.length < length) {
	        str = padString + str;
	    }
	    return str;
	}
	function binaryToByte(bin) {
	    return parseInt(bin, 2);
	}
	function bytesToBinary(bytes) {
	    return bytes.map((x) => lpad(x.toString(2), '0', 8)).join('');
	}
	function deriveChecksumBits(entropyBuffer) {
	    const ENT = entropyBuffer.length * 8;
	    const CS = ENT / 32;
	    const hash = sha256_1.sha256(Uint8Array.from(entropyBuffer));
	    return bytesToBinary(Array.from(hash)).slice(0, CS);
	}
	function salt(password) {
	    return 'mnemonic' + (password || '');
	}
	function mnemonicToSeedSync(mnemonic, password) {
	    const mnemonicBuffer = Uint8Array.from(Buffer$1.from(normalize(mnemonic), 'utf8'));
	    const saltBuffer = Uint8Array.from(Buffer$1.from(salt(normalize(password)), 'utf8'));
	    const res = pbkdf2_1.pbkdf2(sha512_1.sha512, mnemonicBuffer, saltBuffer, {
	        c: 2048,
	        dkLen: 64,
	    });
	    return Buffer$1.from(res);
	}
	src.mnemonicToSeedSync = mnemonicToSeedSync;
	function mnemonicToSeed(mnemonic, password) {
	    const mnemonicBuffer = Uint8Array.from(Buffer$1.from(normalize(mnemonic), 'utf8'));
	    const saltBuffer = Uint8Array.from(Buffer$1.from(salt(normalize(password)), 'utf8'));
	    return pbkdf2_1.pbkdf2Async(sha512_1.sha512, mnemonicBuffer, saltBuffer, {
	        c: 2048,
	        dkLen: 64,
	    }).then((res) => Buffer$1.from(res));
	}
	src.mnemonicToSeed = mnemonicToSeed;
	function mnemonicToEntropy(mnemonic, wordlist) {
	    wordlist = wordlist || DEFAULT_WORDLIST;
	    if (!wordlist) {
	        throw new Error(WORDLIST_REQUIRED);
	    }
	    const words = normalize(mnemonic).split(' ');
	    if (words.length % 3 !== 0) {
	        throw new Error(INVALID_MNEMONIC);
	    }
	    // convert word indices to 11 bit binary strings
	    const bits = words
	        .map((word) => {
	        const index = wordlist.indexOf(word);
	        if (index === -1) {
	            throw new Error(INVALID_MNEMONIC);
	        }
	        return lpad(index.toString(2), '0', 11);
	    })
	        .join('');
	    // split the binary string into ENT/CS
	    const dividerIndex = Math.floor(bits.length / 33) * 32;
	    const entropyBits = bits.slice(0, dividerIndex);
	    const checksumBits = bits.slice(dividerIndex);
	    // calculate the checksum and compare
	    const entropyBytes = entropyBits.match(/(.{1,8})/g).map(binaryToByte);
	    if (entropyBytes.length < 16) {
	        throw new Error(INVALID_ENTROPY);
	    }
	    if (entropyBytes.length > 32) {
	        throw new Error(INVALID_ENTROPY);
	    }
	    if (entropyBytes.length % 4 !== 0) {
	        throw new Error(INVALID_ENTROPY);
	    }
	    const entropy = Buffer$1.from(entropyBytes);
	    const newChecksum = deriveChecksumBits(entropy);
	    if (newChecksum !== checksumBits) {
	        throw new Error(INVALID_CHECKSUM);
	    }
	    return entropy.toString('hex');
	}
	src.mnemonicToEntropy = mnemonicToEntropy;
	function entropyToMnemonic(entropy, wordlist) {
	    if (!Buffer$1.isBuffer(entropy)) {
	        entropy = Buffer$1.from(entropy, 'hex');
	    }
	    wordlist = wordlist || DEFAULT_WORDLIST;
	    if (!wordlist) {
	        throw new Error(WORDLIST_REQUIRED);
	    }
	    // 128 <= ENT <= 256
	    if (entropy.length < 16) {
	        throw new TypeError(INVALID_ENTROPY);
	    }
	    if (entropy.length > 32) {
	        throw new TypeError(INVALID_ENTROPY);
	    }
	    if (entropy.length % 4 !== 0) {
	        throw new TypeError(INVALID_ENTROPY);
	    }
	    const entropyBits = bytesToBinary(Array.from(entropy));
	    const checksumBits = deriveChecksumBits(entropy);
	    const bits = entropyBits + checksumBits;
	    const chunks = bits.match(/(.{1,11})/g);
	    const words = chunks.map((binary) => {
	        const index = binaryToByte(binary);
	        return wordlist[index];
	    });
	    return wordlist[0] === '\u3042\u3044\u3053\u304f\u3057\u3093' // Japanese wordlist
	        ? words.join('\u3000')
	        : words.join(' ');
	}
	src.entropyToMnemonic = entropyToMnemonic;
	function generateMnemonic(strength, rng, wordlist) {
	    strength = strength || 128;
	    if (strength % 32 !== 0) {
	        throw new TypeError(INVALID_ENTROPY);
	    }
	    rng = rng || ((size) => Buffer$1.from(utils_1.randomBytes(size)));
	    return entropyToMnemonic(rng(strength / 8), wordlist);
	}
	src.generateMnemonic = generateMnemonic;
	function validateMnemonic(mnemonic, wordlist) {
	    try {
	        mnemonicToEntropy(mnemonic, wordlist);
	    }
	    catch (e) {
	        return false;
	    }
	    return true;
	}
	src.validateMnemonic = validateMnemonic;
	function setDefaultWordlist(language) {
	    const result = _wordlists_1.wordlists[language];
	    if (result) {
	        DEFAULT_WORDLIST = result;
	    }
	    else {
	        throw new Error('Could not find wordlist for language "' + language + '"');
	    }
	}
	src.setDefaultWordlist = setDefaultWordlist;
	function getDefaultWordlist() {
	    if (!DEFAULT_WORDLIST) {
	        throw new Error('No Default Wordlist set');
	    }
	    return Object.keys(_wordlists_1.wordlists).filter((lang) => {
	        if (lang === 'JA' || lang === 'EN') {
	            return false;
	        }
	        return _wordlists_1.wordlists[lang].every((word, index) => word === DEFAULT_WORDLIST[index]);
	    })[0];
	}
	src.getDefaultWordlist = getDefaultWordlist;
	var _wordlists_2 = require_wordlists();
	src.wordlists = _wordlists_2.wordlists;
	return src;
}

var srcExports = requireSrc();

const getMnemonic = srcExports.generateMnemonic;
const createPrvKeyRoot = (mnemonic) => {
  const mnemonicBuffer = toHexBuffer(srcExports.mnemonicToEntropy(mnemonic));
  const passwordBuffer = toHexBuffer("");
  const cslPrvKey = Bip32PrivateKey.from_bip39_entropy(mnemonicBuffer, passwordBuffer);
  const prvKeyBech32 = cslPrvKey.to_bech32();
  safeFreeCSLObject(cslPrvKey);
  return prvKeyBech32;
};

const generateRootKey = (mnemonic, password) => {
  const prv = createPrvKeyRoot(mnemonic);
  return createIRootKey(getPubKeyFromPrvKey(prv), encryptText(prv, password));
};
const updateRootKey = (walletData, mnemonic, password) => {
  walletData.wallet.rootKey = generateRootKey(mnemonic, password);
  return true;
};
const updateSpendingPassword$1 = (walletData, oldPassword, newPassword) => {
  let prv = walletData.wallet.rootKey?.prv;
  if (prv) {
    try {
      const decryptedPrv = decryptText(prv, oldPassword, walletData.wallet.rootKey?.v ?? "");
      prv = encryptText(decryptedPrv, newPassword);
      walletData.wallet.rootKey.prv = prv;
      walletData.wallet.rootKey.v = "2";
    } catch (err) {
      return false;
    }
  }
  return true;
};
const populateWalletData = (walletData, networkId, walletId, signType) => {
  walletData.wallet.id = walletId;
  walletData.wallet.networkId = networkId;
  walletData.wallet.signType = signType;
  walletData.settings.id = walletId;
  walletData.settings.networkId = networkId;
};
const populateRootKey = (walletData, rootKey) => {
  walletData.wallet.rootKey = rootKey;
};
const createPlate = (walletData) => {
  const signType = walletData.wallet.signType;
  const account = walletData.wallet.accountList[0];
  if (!account) {
    return void 0;
  }
  let hash = "";
  if (account.pubIsAddress) {
    hash = toHexString(getAddressBytes(walletData.wallet.accountList[0].pub));
  } else {
    switch (signType) {
      case "mnemonic":
      case "ledger":
      case "trezor":
      case "keystone":
      case "onekey":
      case "bitbox":
      case "readonly":
        hash = generatePlateHex(walletData.wallet.accountList[0].pub);
        break;
      case "multisig":
        hash = walletData.wallet.accountList[0].pub;
        break;
      case "cli":
        hash = toHexString(getAddressBytes(walletData.wallet.accountList[0].pub));
        break;
      default:
        hash = "";
    }
  }
  return cip4JsExports.walletChecksum(hash);
};
const setPlate = (walletData) => {
  const plate = createPlate(walletData);
  if (!plate) {
    return;
  }
  walletData.settings.plate.image = plate.ImagePart;
  walletData.settings.plate.checksum = plate.TextPart;
  walletData.settings.plate.data = null;
};
const createMnemonicWallet = async (networkId, mnemonic, spendingPassword, numAccounts = 1) => {
  const signType = "mnemonic";
  const rootKey = generateRootKey(mnemonic, spendingPassword);
  const walletId = generateWalletId(rootKey.pub, networkId, signType);
  const walletData = createIWalletDBData();
  populateWalletData(walletData, networkId, walletId, signType);
  populateRootKey(walletData, rootKey);
  for (let accountIndex = 0; accountIndex < numAccounts; accountIndex++) {
    const path = [purpose.hdwallet, coin.ada, accountIndex];
    const accountPub = generateAccountPub(rootKey, spendingPassword, path);
    walletData.wallet.accountList.push(createIAccount({
      id: generateAccountId(accountPub),
      pub: accountPub,
      path,
      signType
    }));
  }
  const multiSigPub = generateAccountPub(rootKey, spendingPassword, multisigPath);
  walletData.wallet.accountList.push(createIAccount({
    id: generateAccountId(multiSigPub),
    pub: multiSigPub,
    path: multisigPath,
    signType
  }));
  setPlate(walletData);
  return walletData;
};
const createCLIWallet = async (networkId, address, drepCred, paymentPrvKey, stakePrvKey, drepPrvKey, spendingPassword) => {
  const signType = "cli";
  const walletData = createIWalletDBData();
  const rootKey = createIRootKey("", encryptText(`${paymentPrvKey}:${stakePrvKey ?? ""}:${drepPrvKey ?? ""}`, spendingPassword));
  const walletId = generateWalletIdFromAddress(networkId, address);
  populateWalletData(walletData, networkId, walletId, signType);
  populateRootKey(walletData, rootKey);
  const account = createIAccount({
    id: generateAccountId(walletId),
    pub: address,
    pubIsAddress: true,
    path: [purpose.hdwallet, coin.ada, 0],
    signType,
    drepCred
  });
  walletData.wallet.accountList.push(account);
  setPlate(walletData);
  return walletData;
};
const createReadonlyWallet = async (networkId, accountPubBech32List) => {
  const signType = "readonly";
  const walletData = createIWalletDBData();
  const accountPubBech32 = prepareAccountKey(accountPubBech32List[0]);
  const walletId = generateWalletId(accountPubBech32, networkId, signType);
  populateWalletData(walletData, networkId, walletId, signType);
  walletData.wallet.accountList.push(createAccountFromPubKey(walletData, purpose.hdwallet, 0, accountPubBech32, signType));
  setPlate(walletData);
  return walletData;
};
const createReadonlyAddressWallet = async (networkId, address) => {
  if (!isSupportedNetworkId(networkId)) {
    throw new Error("Error: WalletLib.createReadonlyAddressWallet: network not supported: " + networkId);
  }
  const signType = "readonly";
  const walletData = createIWalletDBData();
  const walletId = generateWalletIdFromAddress(networkId, address);
  populateWalletData(walletData, networkId, walletId, signType);
  walletData.wallet.accountList.push(createIAccount({
    id: generateAccountId(walletId),
    pub: address,
    pubIsAddress: true,
    path: [purpose.hdwallet, coin.ada, 0],
    signType
  }));
  setPlate(walletData);
  return walletData;
};
const createHardwareWallet = async (networkId, signType, accountPubBech32List, multiSigPub, suffix, masterFingerprint) => {
  if (!isSupportedNetworkId(networkId)) {
    throw new Error("Error: WalletLib.createHardwareWallet: network not supported: " + networkId);
  }
  const walletData = createIWalletDBData();
  const accountPubBech32 = prepareAccountKey(accountPubBech32List[0]);
  const walletId = generateWalletId(accountPubBech32, networkId, signType, suffix);
  populateWalletData(walletData, networkId, walletId, signType);
  if (masterFingerprint) {
    walletData.wallet.masterFingerprint = masterFingerprint;
  }
  for (let accountIndex = 0; accountIndex < accountPubBech32List.length; accountIndex++) {
    walletData.wallet.accountList.push(createAccountFromPubKey(walletData, purpose.hdwallet, accountIndex, prepareAccountKey(accountPubBech32List[accountIndex]), signType));
  }
  if (multiSigPub) {
    walletData.wallet.accountList.push(createAccountFromPubKey(walletData, multisigPath[0], multisigPath[2], prepareAccountKey(multiSigPub), signType));
  }
  setPlate(walletData);
  return walletData;
};
const createMultiSigWallet = async (networkId, paymentScript, stakeScript, drepScript, meta) => {
  if (!isSupportedNetworkId(networkId)) {
    throw new Error("Error: WalletLib.createMultiSigWallet: network not supported: " + networkId);
  }
  let walletData = createIWalletDBData();
  const paymentCred = getNativeScriptCredFromHex(paymentScript);
  let stakeCred = null;
  if (stakeScript) {
    try {
      stakeCred = getNativeScriptCredFromHex(stakeScript);
    } catch (e) {
      throw new Error("Error: WalletLib.createMultiSigWallet: invalid stake script");
    }
  }
  const signType = "multisig";
  const xpub = getXpubFromHex(paymentCred + (stakeCred ?? ""));
  const walletId = generateWalletIdFromScripts(networkId, paymentScript, stakeScript);
  populateWalletData(walletData, networkId, walletId, signType);
  const account = createIAccount({
    id: generateAccountId(xpub),
    pub: xpub,
    path: [purpose.hdwallet, coin.ada, 0],
    // purpose.hdwallet enables syncing
    signType
  });
  account.paymentScript = paymentScript;
  account.stakeScript = stakeCred ? stakeScript : null;
  account.drepScript = drepScript;
  if (meta) {
    account.scriptMeta = meta;
  }
  walletData.wallet.accountList.push(account);
  setPlate(walletData);
  return walletData;
};
const createAccountFromPubKey = (_walletData, accPurpose, accIndex, accountPubBech32, signType) => {
  if (!accountPubBech32) {
    throw new Error("Error: WalletLib.generateAccountFromPubKey: Cannot generate account: accountPubBech32 missing. " + _walletData.wallet.id);
  }
  if (!accountPubBech32.startsWith("acct_xvk") && !accountPubBech32.startsWith("xpub")) {
    throw new Error("Error: WalletLib.generateAccountFromPubKey: Cannot generate account: unknown accountPubBech32 format. " + accountPubBech32);
  }
  for (const account of _walletData.wallet.accountList) {
    if (isSameAccountPath(account, accPurpose, accIndex)) {
      console.warn("Warning: WalletLib.generateAccount: account already exists, skipping.", _walletData.wallet.id, account.path);
      return account;
    }
  }
  accountPubBech32 = prepareAccountKey(accountPubBech32);
  return createIAccount({
    id: generateAccountId(accountPubBech32),
    pub: accountPubBech32,
    path: [accPurpose, coin.ada, accIndex],
    signType
  });
};
const createAdditionalAccountMultiSig = (walletData, accountPubBech32) => {
  createAdditionalAccounts(walletData, { [accountPubBech32]: 0 }, purpose.multisig);
};
const createAdditionalAccounts = (walletData, accountsPubBech32Map, _purpose) => {
  if (!_purpose) {
    _purpose = purpose.hdwallet;
  }
  const existingAccountIndexList = [];
  const createdAccountIndexList = [];
  if (!accountsPubBech32Map) {
    return {
      createdAccountIndexList,
      existingAccountIndexList
    };
  }
  for (const entry of Object.entries(accountsPubBech32Map)) {
    const accountPub = entry[0];
    const accountIndex = entry[1];
    let accountAlreadyExists = false;
    for (const account of walletData.wallet.accountList) {
      if (isSameAccountPath(account, _purpose, accountIndex)) {
        accountAlreadyExists = true;
        break;
      }
    }
    if (!accountAlreadyExists) {
      if (accountPub) {
        walletData.wallet.accountList.push(createIAccount({
          id: generateAccountId(accountPub),
          pub: accountPub,
          path: [_purpose, coin.ada, accountIndex],
          signType: walletData.wallet.signType
        }));
        createdAccountIndexList.push(accountIndex);
      }
    } else {
      existingAccountIndexList.push(accountIndex);
    }
  }
  return {
    createdAccountIndexList,
    existingAccountIndexList
  };
};

const updateSpendingPassword = (appWallet, oldPassword, password) => {
  const success = updateSpendingPassword$1(appWallet.data, oldPassword, password);
  if (success) {
    return saveWallet(appWallet);
  }
  return false;
};
const setSpendingPassword = (appWallet, mnemonic, password) => {
  updateRootKey(appWallet.data, mnemonic, password);
  {
    return saveWallet(appWallet);
  }
};

const saving = ref(false);
const updateAppWalletSetting = async (appWallet, obj) => {
  saving.value = true;
  let success = false;
  if (appWallet) {
    updateIWalletSettingsPartial(appWallet.data.settings, {
      id: appWallet.id,
      networkId: appWallet.data.settings.networkId,
      ...obj
    });
    try {
      success = await saveWalletSettings(appWallet);
      dispatchSignalSync(onWalletSettingsUpdated, appWallet.id);
    } catch (err) {
      console.error(err);
    }
  }
  saving.value = false;
  return success;
};
const _walletPlate = createIUIPlate();
const _walletBackground = {
  policy: null,
  name: null,
  opacity: 100
};
function useWalletSettings(appWalletRef) {
  const walletData = computed(() => appWalletRef.value?.data ?? null);
  const walletSyncInfo = computed(() => appWalletRef.value?.syncInfo ?? null);
  const walletSettings = computed(() => walletData.value?.settings ?? null);
  const walletAccountId = computed(() => {
    if (!walletData.value) {
      return null;
    }
    const accountId = getSelectedWalletAccountId(networkId.value, walletData.value?.wallet.id ?? "notset").value;
    if (accountId && accountId.length > 6) {
      return accountId;
    }
    return walletData.value?.wallet.accountList?.[0].id ?? null;
  });
  const walletName = computed(() => walletSettings.value?.name ?? "Wallet");
  const walletGroupName = computed(() => walletSettings.value?.groupName ?? DEFAULT_WALLET_GROUP_NAME);
  const walletDescription = computed(() => walletSettings.value?.description ?? "");
  const walletPlate = computed(() => walletSettings.value?.plate ?? _walletPlate);
  const walletBackground = computed(() => walletSettings.value?.background ?? _walletBackground);
  const enabledBiometrics = computed(() => walletSettings.value?.useBiometrics ?? false);
  const walletBalance = computed(() => walletData.value?.balance ?? null);
  const walletSyncState = computed(() => walletSyncInfo.value?.state ?? SyncState.idle);
  const isWalletSyncing = computed(() => walletSyncState.value === SyncState.syncing || walletSyncState.value === SyncState.initializing || walletSyncState.value === SyncState.queued);
  return {
    saving,
    data: walletData,
    name: walletName,
    groupName: walletGroupName,
    description: walletDescription,
    plate: walletPlate,
    background: walletBackground,
    balance: walletBalance,
    isSyncing: isWalletSyncing,
    isWalletSyncing,
    walletSyncInfo,
    walletAccountId,
    enabledBiometrics,
    // setAUM:                   (enabled: boolean)                      => updateSettingForAllAppAccounts(appWalletRef.value, { aum:            { enabled } }),
    // setAW:                    (enabled: boolean)                      => updateSettingForAllAppAccounts(appWalletRef.value, { aw:             { enabled } }),
    // setCollateral:            (enabled: boolean)                      => updateSettingForAllAppAccounts(appWalletRef.value, { collateral:     { enabled } }),
    // setManualSync:            (enabled: boolean)                      => updateSettingForAllAppAccounts(appWalletRef.value, { manualSync:     { enabled } }),
    // setHistorySync:           (enabled: boolean)                      => updateSettingForAllAppAccounts(appWalletRef.value, { historySync:    { enabled } }),
    // setSendAll:               (enabled: boolean)                      => updateSettingForAllAppAccounts(appWalletRef.value, { sendAll:        { enabled } }),
    // setTF:                    (enabled: boolean, bundleSize: number)  => updateSettingForAllAppAccounts(appWalletRef.value, { tf:             { enabled, bundleSize } }),
    // setSAM:                   (enabled: boolean)                      => updateSettingForAllAppAccounts(appWalletRef.value, { sam:            { enabled } }),
    // setUseBiometrics:         (enabled: boolean)                      => updateSettingForAllAppAccounts(appWalletRef.value, { useBio:         { enabled } }),
    updateName: (payload) => updateAppWalletSetting(appWalletRef.value, { name: payload.walletName, groupName: payload.groupName ?? null, description: payload.description ?? null }),
    setUseBiometrics: (enable) => updateAppWalletSetting(appWalletRef.value, { useBiometrics: enable, name: "test name" }),
    // updateBackground:         (bg: IUIBackground)  => updateAppWalletSetting(appWalletRef.value, { background: bg }),
    updatePlate: (plate) => updateAppWalletSetting(appWalletRef.value, { plate }),
    updateSpendingPassword: async (oldPassword, newPassword) => {
      saving.value = true;
      let success = false;
      if (appWalletRef.value) {
        success = await updateSpendingPassword(appWalletRef.value, oldPassword, newPassword);
      }
      saving.value = false;
      return success;
    },
    updateRootKey: async (mnemonic, newPassword) => {
      saving.value = true;
      let success = false;
      if (appWalletRef.value) {
        success = await setSpendingPassword(appWalletRef.value, mnemonic, newPassword);
      }
      saving.value = false;
      return success;
    },
    getWalletNameList
  };
}

function useAppAccountBalances(appAccountRef) {
  const balancesRef = ref(null);
  const updateRefs = () => {
    if (appAccountRef.value) {
      balancesRef.value = getIAccountBalances(appAccountRef.value.id);
    } else {
      balancesRef.value = null;
    }
  };
  watch(appAccountRef, () => {
    updateRefs();
  }, { immediate: true });
  return balancesRef;
}

export { createHardwareWallet as $, searchForAssetId as A, getCachedHandle as B, resolveAdaHandle as C, isAdaHandle as D, getReceiveAddress as E, getSortedAssetList as F, useAdaHandle as G, loadSwapAssets as H, ITokenRegistrySource as I, AssetDB$1 as J, addAllAssetInfoToMap as K, fetchAssetInfo as L, MediaType as M, commonjsRequire as N, requireSha256 as O, requireUtils as P, require_md as Q, require_u64 as R, updateAppAccountSetting as S, createAdditionalAccounts as T, getMnemonic as U, createMnemonicWallet as V, createMultiSigWallet as W, createCLIWallet as X, createReadonlyAddressWallet as Y, createReadonlyWallet as Z, __getAssetInfoMap as _, getAssetByFingerprint as a, srcExports as a0, createPrvKeyRoot as a1, generateWalletId as a2, generateRootKey as a3, createIRootKey as a4, createAdditionalAccountMultiSig as a5, generateWalletIdFromScripts as a6, generateWalletIdFromAddress as a7, parseMetaSrcFile as a8, createPlate as a9, getSortedAssetNames as aa, filteredPoolDataList as ab, updateFilteredPools as ac, getPoolInfo as ad, onPoolDataUpdated as ae, doLoadPoolData as af, PoolDataDB$1 as ag, updatePoolData as ah, poolDataList as ai, endPoints as aj, resetSwapData as ak, initSwapStore as al, getRootAddress as am, fetchCancelTxCBOR as an, getPaymentBaseAddressList as b, getChangeBaseAddressList as c, getPaymentEnterpriseAddressList as d, getChangeEnterpriseAddressList as e, avgROS as f, getSortedAssetDetailsListCached as g, getAssetInfoCheck as h, useAccountSettings as i, useAppAccountBalances as j, useAppAccount as k, loadAssetMapInfo as l, medianROS as m, useAppWallet as n, MediaSize as o, getAssetCDNImage as p, generateAccountId as q, getSortedAssetDetailsList as r, sleep as s, createIAssetListItemDetails as t, useWalletSettings as u, isVerified as v, loadAssetMetadata as w, formatAssetName as x, getChangeAddress as y, addToAssetFingerprintMap as z };
