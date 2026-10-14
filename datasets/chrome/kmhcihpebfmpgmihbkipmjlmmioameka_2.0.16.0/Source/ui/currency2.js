import { D as computed, bu as getAppCurrencies, bv as getAppCurrency, bw as getCoingeckoTicker, bx as setCoingeckoTicker, by as setAppCurrencies$1, bz as createICoingeckoTickerItem, bA as setAppCurrency$1 } from './index.js';

const DEFAULT_CURRENCY_LIST = {
  "currencies": [
    { "id": "btc", "symbol": "₿", "value": 0, "change24h": 0 },
    { "id": "eth", "symbol": "Ξ", "value": 0, "change24h": 0 },
    { "id": "ltc", "symbol": "ltc", "value": 0, "change24h": 0 },
    { "id": "bch", "symbol": "bch", "value": 0, "change24h": 0 },
    { "id": "bnb", "symbol": "bnb", "value": 0, "change24h": 0 },
    { "id": "eos", "symbol": "eos", "value": 0, "change24h": 0 },
    { "id": "xrp", "symbol": "xrp", "value": 0, "change24h": 0 },
    { "id": "xlm", "symbol": "xlm", "value": 0, "change24h": 0 },
    { "id": "link", "symbol": "link", "value": 0, "change24h": 0 },
    { "id": "dot", "symbol": "dot", "value": 0, "change24h": 0 },
    { "id": "yfi", "symbol": "yfi", "value": 0, "change24h": 0 },
    { "id": "usd", "symbol": "$", "value": 0, "change24h": 0 },
    { "id": "aed", "symbol": "aed", "value": 0, "change24h": 0 },
    { "id": "ars", "symbol": "ars", "value": 0, "change24h": 0 },
    { "id": "aud", "symbol": "aud", "value": 0, "change24h": 0 },
    { "id": "bdt", "symbol": "bdt", "value": 0, "change24h": 0 },
    { "id": "bhd", "symbol": "bhd", "value": 0, "change24h": 0 },
    { "id": "bmd", "symbol": "bmd", "value": 0, "change24h": 0 },
    { "id": "brl", "symbol": "brl", "value": 0, "change24h": 0 },
    { "id": "cad", "symbol": "cad", "value": 0, "change24h": 0 },
    { "id": "chf", "symbol": "chf", "value": 0, "change24h": 0 },
    { "id": "clp", "symbol": "clp", "value": 0, "change24h": 0 },
    { "id": "cny", "symbol": "cny", "value": 0, "change24h": 0 },
    { "id": "czk", "symbol": "czk", "value": 0, "change24h": 0 },
    { "id": "dkk", "symbol": "dkk", "value": 0, "change24h": 0 },
    { "id": "eur", "symbol": "€", "value": 0, "change24h": 0 },
    { "id": "gbp", "symbol": "gbp", "value": 0, "change24h": 0 },
    { "id": "gel", "symbol": "gel", "value": 0, "change24h": 0 },
    { "id": "hkd", "symbol": "hkd", "value": 0, "change24h": 0 },
    { "id": "huf", "symbol": "huf", "value": 0, "change24h": 0 },
    { "id": "idr", "symbol": "idr", "value": 0, "change24h": 0 },
    { "id": "ils", "symbol": "ils", "value": 0, "change24h": 0 },
    { "id": "inr", "symbol": "inr", "value": 0, "change24h": 0 },
    { "id": "jpy", "symbol": "jpy", "value": 0, "change24h": 0 },
    { "id": "krw", "symbol": "krw", "value": 0, "change24h": 0 },
    { "id": "kwd", "symbol": "kwd", "value": 0, "change24h": 0 },
    { "id": "lkr", "symbol": "lkr", "value": 0, "change24h": 0 },
    { "id": "mmk", "symbol": "mmk", "value": 0, "change24h": 0 },
    { "id": "mxn", "symbol": "mxn", "value": 0, "change24h": 0 },
    { "id": "myr", "symbol": "myr", "value": 0, "change24h": 0 },
    { "id": "ngn", "symbol": "ngn", "value": 0, "change24h": 0 },
    { "id": "nok", "symbol": "nok", "value": 0, "change24h": 0 },
    { "id": "nzd", "symbol": "nzd", "value": 0, "change24h": 0 },
    { "id": "php", "symbol": "php", "value": 0, "change24h": 0 },
    { "id": "pkr", "symbol": "pkr", "value": 0, "change24h": 0 },
    { "id": "pln", "symbol": "pln", "value": 0, "change24h": 0 },
    { "id": "rub", "symbol": "rub", "value": 0, "change24h": 0 },
    { "id": "sar", "symbol": "sar", "value": 0, "change24h": 0 },
    { "id": "sek", "symbol": "sek", "value": 0, "change24h": 0 },
    { "id": "sgd", "symbol": "sgd", "value": 0, "change24h": 0 },
    { "id": "thb", "symbol": "thb", "value": 0, "change24h": 0 },
    { "id": "try", "symbol": "try", "value": 0, "change24h": 0 },
    { "id": "twd", "symbol": "twd", "value": 0, "change24h": 0 },
    { "id": "uah", "symbol": "uah", "value": 0, "change24h": 0 },
    { "id": "vef", "symbol": "vef", "value": 0, "change24h": 0 },
    { "id": "vnd", "symbol": "vnd", "value": 0, "change24h": 0 },
    { "id": "zar", "symbol": "zar", "value": 0, "change24h": 0 },
    { "id": "xdr", "symbol": "xdr", "value": 0, "change24h": 0 },
    { "id": "xag", "symbol": "xag", "value": 0, "change24h": 0 },
    { "id": "xau", "symbol": "xau", "value": 0, "change24h": 0 },
    { "id": "bits", "symbol": "bits", "value": 0, "change24h": 0 },
    { "id": "sats", "symbol": "sats", "value": 0, "change24h": 0 }
  ],
  "last_update": 0
};
const _appCurrency = getAppCurrency("usd");
const _currencies = getAppCurrencies(DEFAULT_CURRENCY_LIST);
const appCurrency = computed(() => _appCurrency.value);
const appCurrencySymbol = computed(() => {
  const tmp = _currencies.value.currencies.find((c) => c.id === _appCurrency.value);
  if (!tmp) {
    return "";
  }
  const symbol = tmp.symbol;
  if (symbol.length > 1) {
    return symbol;
  }
  return symbol.toUpperCase();
});
const appCurrencies = computed(() => _currencies.value);
const setAppCurrency = (currency) => {
  setAppCurrency$1(currency);
};
const setAppCurrencies = (list) => {
  setAppCurrencies$1(list);
};
const getCoinGeckoTicker = (tokenName) => {
  return getCoingeckoTicker(tokenName, createICoingeckoTickerItem()).value;
};
const setCoinGeckoTicker = (tokenName, value) => {
  setCoingeckoTicker(tokenName, value);
};

export { appCurrency as a, appCurrencies as b, setAppCurrencies as c, appCurrencySymbol as d, setAppCurrency as e, getCoinGeckoTicker as g, setCoinGeckoTicker as s };
