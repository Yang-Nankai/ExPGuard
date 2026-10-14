import { P as networkId, aj as api } from './index.js';
import { g as getSwapURL } from './swap.js';

const PULL_DELAY = 1e3 * 60 * 1;
const _cache = {};
const loadTokenPriceList = async (list) => {
  const now = Date.now();
  const missing = [];
  for (const token of list) {
    if (!_cache[token] || now > _cache[token].lastUpdate + PULL_DELAY) {
      missing.push(token);
    }
  }
  if (missing.length === 0) {
    const tokenPriceList2 = [];
    for (const token of list) {
      if (!_cache[token]?.data) {
        continue;
      }
      tokenPriceList2.push({ ..._cache[token].data });
    }
    return tokenPriceList2;
  }
  const url = `${getSwapURL()}/${networkId.value}/v2/swap/analytics/getTokenPrices`;
  const res = await api.post(url, { tokens: missing });
  const data = res.data;
  for (const token of data) {
    _cache[token.policyId + token.hexName] = { data: { ...token }, lastUpdate: now };
  }
  const tokenPriceList = [];
  for (const token of list) {
    if (!_cache[token]?.data) {
      _cache[token] = {
        data: {
          ticker: "",
          name: "",
          policyId: token.substring(0, 56),
          hexName: token.substring(56),
          decimals: 0
        },
        lastUpdate: now
      };
    }
    tokenPriceList.push({ ..._cache[token].data });
  }
  return tokenPriceList;
};
const useTokenPrices = () => {
  return {
    loadTokenPriceList
  };
};

export { useTokenPrices as u };
