import { D as computed, P as networkId, aj as api } from './index.js';

const CACHE_TTL = 1e3 * 60 * 5;
const url = computed(() => `/${networkId.value}/v1/misc/address/scripttype`);
const scriptTypeMap = /* @__PURE__ */ new Map();
const unknownCacheList = new Array();
const getScriptType = async (address) => {
  const cache = scriptTypeMap.get(address);
  if (cache) {
    return cache;
  }
  const res = await api.post(url.value, { address }).catch((err) => {
  });
  const scriptType = res?.data?.scriptType;
  if (scriptType) {
    scriptTypeMap.set(address, scriptType);
    if (scriptType === "unknown") {
      unknownCacheList.push([address, Date.now()]);
    }
    return scriptType;
  }
  return "unknown";
};
const addressCacheCleanup = () => {
  const ttl = Date.now() - CACHE_TTL;
  for (let i = unknownCacheList.length - 1; i >= 0; i--) {
    const entry = unknownCacheList[i];
    if (entry[1] < ttl) {
      scriptTypeMap.delete(entry[0]);
      unknownCacheList.splice(i, 1);
    }
  }
};

export { addressCacheCleanup as a, getScriptType as g };
