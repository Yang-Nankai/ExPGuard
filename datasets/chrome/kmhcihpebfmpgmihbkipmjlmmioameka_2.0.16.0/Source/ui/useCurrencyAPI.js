import { e as ref, aV as now, br as createICoingeckoTicker, bs as createICurrency, bt as createICurrencyItem, aj as api } from './index.js';
import { m as multiply, d as divide, c as compare } from './bigmath.js';
import { b as appCurrencies, g as getCoinGeckoTicker, s as setCoinGeckoTicker, a as appCurrency, c as setAppCurrencies } from './currency2.js';

const API_ENDPOINT = "https://api.coingecko.com/api/v3/";
const API_TIMEOUT = 1e3 * 60 * 5;
const _activeCurrency = ref(createICurrencyItem(null));
let _timeoutId = -1;
async function callCurrencyAPI(path) {
  return await api.get(API_ENDPOINT + path).catch((e) => {
    return null;
  });
}
const mapSymbol = (symbol) => {
  switch (symbol) {
    case "usd":
      return "$";
    case "eur":
      return "€";
    case "btc":
      return "₿";
    case "eth":
      return "Ξ";
    default:
      return symbol.toLowerCase();
  }
};
const pullCurrencyData = async () => {
  clearTimeout(_timeoutId);
  setActiveCurrency(appCurrency.value);
  if (now() > appCurrencies.value.last_update + API_TIMEOUT) {
    let res = await callCurrencyAPI("simple/supported_vs_currencies");
    if (res) {
      const currencyIds = res;
      const currencyString = currencyIds.join("%2C");
      res = await callCurrencyAPI("simple/price?ids=cardano&vs_currencies=" + currencyString + "&include_24hr_change=true");
      if (res && res.hasOwnProperty("cardano")) {
        const tmp = createICurrency();
        tmp.last_update = now();
        for (const currencyId of currencyIds) {
          if (res.cardano.hasOwnProperty(currencyId)) {
            tmp.currencies.push(createICurrencyItem({
              id: currencyId,
              symbol: mapSymbol(currencyId),
              value: res.cardano[currencyId],
              change24h: res.cardano[currencyId + "_24h_change"]
            }));
          }
        }
        setAppCurrencies(tmp);
      }
    }
  }
  if (appCurrency.value) {
    setActiveCurrency(appCurrency.value);
  } else if (appCurrencies.value.currencies.some((c) => c.id === "usd")) {
    setActiveCurrency("usd");
  }
  _timeoutId = setTimeout(() => {
    pullCurrencyData();
  }, API_TIMEOUT);
};
const setActiveCurrency = (currencyId) => {
  const tmp = currencyId ? appCurrencies.value.currencies.find((c) => c.id === currencyId) ?? createICurrencyItem(null) : null;
  if (tmp) {
    _activeCurrency.value = tmp;
  }
};
const getCurrencyAmount = (lovelace, priceOfDay = 0) => {
  if (!_activeCurrency.value?.id) {
    return "";
  }
  let _activeCurrencyValue = priceOfDay > 0 ? priceOfDay : _activeCurrency.value.value;
  const currencyAmount = multiply(divide(lovelace, 1e6), _activeCurrencyValue, 8);
  return compare(currencyAmount, ">", 1e5) ? multiply(currencyAmount, 1, 1) : currencyAmount;
};
const getCurrencyValue = async function(tokenName, tokenBalance, currency) {
  if (currency.id) {
    try {
      const balance = await getAdaValue(tokenName, tokenBalance);
      return multiply(currency.value, balance, 8);
    } catch (err) {
      console.warn(`failure during currency(${currency.id}) conversion: ${currency.value}`, err.message);
    }
  }
  return "";
};
const getAdaValue = async function(tokenName, tokenBalance) {
  let coinName = tokenName.toLowerCase();
  const pricePerAda = await convertToAdaAmount(coinName);
  return multiply(pricePerAda, tokenBalance);
};
const getTickers = async (tokenId) => {
  let res = await callCurrencyAPI("coins/" + tokenId + "/tickers");
  if (res && "tickers" in res) {
    return res.tickers;
  }
  throw new Error("No tickers found for " + tokenId);
};
const convertTokenAmount = async (tokenId, targetCurrency) => {
  let tickers = await getTickers(tokenId);
  for (let element in tickers) {
    let cgAssetNameLowercase = tickers[element].target.toLowerCase();
    if (cgAssetNameLowercase == targetCurrency.toLowerCase()) {
      return tickers[element].last;
    }
  }
  throw new Error("Can not determine price of " + tokenId);
};
const convertToAdaAmount = async (tokenId) => {
  let usdValue = void 0;
  let usdPair = void 0;
  let ticker = getCoinGeckoTicker(tokenId);
  if (ticker.last_update === 0 || now() > ticker.last_update + API_TIMEOUT) {
    let tickers = await getTickers(tokenId);
    for (let element in tickers) {
      let assetNameLowercase = tickers[element].target.toLowerCase();
      if (assetNameLowercase === "usd" || assetNameLowercase === "usdt") {
        usdValue = tickers[element].last;
        usdPair = assetNameLowercase;
      }
      if (assetNameLowercase == "ada") {
        ticker = createICoingeckoTicker(tickers[element]);
        ticker.last_update = now();
      }
    }
    if (usdPair !== void 0 && usdValue !== void 0) {
      let number = await convertTokenAmount("cardano", usdPair);
      let result = usdValue / number;
      let lastUpdate = now();
      ticker = createICoingeckoTicker({
        base: "ada",
        target: tokenId,
        last: result,
        last_update: lastUpdate
      });
    }
    setCoinGeckoTicker(tokenId, ticker);
    return ticker.last;
  } else if (ticker.last_update !== 0) {
    return ticker.last;
  }
  throw new Error("Can not determine price of " + tokenId);
};
function useCurrencyAPI() {
  return {
    activeCurrency: _activeCurrency,
    currencyList: appCurrencies.value,
    setActiveCurrency,
    pullCurrencyData,
    getCurrencyAmount,
    getTokenPrice: convertTokenAmount,
    getCurrencyValue,
    convertToAdaAmount
  };
}

export { useCurrencyAPI as u };
