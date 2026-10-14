import { g as getNetworkDecimals, e as networkGroups } from './NetworkId.js';
import { c as compare, r as round, l as mod, g as abs, d as divide, e as bigToNum, i as isZero, m as multiply } from './bigmath.js';
import { e as ref, P as networkId, cM as isTestnet } from './index.js';
import { a as appLanguageTag, b as appTimezone, d as appUseUtc, c as appFormatTag } from './language.js';
import { a5 as ITxBalanceType } from './app2.js';

const sizeUnits = ["byte", "kilobyte", "megabyte", "gigabyte", "terabyte"];
const _numberFormatMap = ref({});
const _datetimeFormatMap = ref({});
let $t;
const setTranslate = (_$t) => {
  $t = _$t;
};
const getTranslate = () => $t;
const translateBadgeList = (badgeList) => {
  for (const badge of badgeList) {
    translateBadge(badge);
  }
};
const translateBadge = (badge) => {
  if (!badge) {
    return;
  }
  if (!badge.label) {
    badge.label = $t(`badge:${badge.id}.label`);
    badge.hover = $t(`badge:${badge.id}.hover`);
  } else if (badge.label.startsWith("badge:")) {
    badge.label = $t(badge.label);
    if (badge.hover?.startsWith("badge:")) {
      badge.hover = $t(badge.hover, badge.hoverParams);
    }
  } else if (badge.hover) {
    badge.hover = $t(badge.hover, badge.hoverParams);
  }
};
const translateErrorMessage = (...args) => {
  return $t.apply(null, args);
};
const mapCryptoSymbol = (currency) => {
  switch (currency.toUpperCase()) {
    case "ADA":
      if (networkGroups.APEX.includes(networkId.value)) {
        return isTestnet.value ? "tÂ" : "Â";
      } else {
        return isTestnet.value ? "t₳" : "₳";
      }
    case "BTC":
      return "₿";
    case "ETH":
      return "Ξ";
    default:
      return currency;
  }
};
const mapAdaCurrency = () => {
  if (networkGroups.APEX.includes(networkId.value)) {
    return isTestnet.value ? "tAP3X" : "AP3X";
  } else {
    return isTestnet.value ? "tADA" : "ADA";
  }
};
const useCompactFormat = (amount, isWhole = true) => {
  try {
    return compare(amount, ">", isWhole ? 1e5 : "100000000000");
  } catch (e) {
    return false;
  }
};
const getDecimalNumber = (decimals) => parseInt("1" + "0".repeat(decimals ?? getNetworkDecimals(networkId.value)));
const getDisplayDecimals = (amount, isWhole = true) => {
  try {
    if (compare(amount, "==", 0)) {
      return 2;
    } else if (compare(amount, "<", isWhole ? 1e-11 : "1000000")) {
      return isWhole ? 16 : 6;
    } else if (compare(amount, "<", isWhole ? 1e-9 : "1000000")) {
      return isWhole ? 14 : 6;
    } else if (compare(amount, "<", isWhole ? 1e-7 : "1000000")) {
      return isWhole ? 12 : 6;
    } else if (compare(amount, "<", isWhole ? 1e-5 : "1000000")) {
      return isWhole ? 10 : 6;
    } else if (compare(amount, "<", isWhole ? 1e-3 : "1000000")) {
      return isWhole ? 8 : 6;
    } else if (compare(amount, "<", isWhole ? 1 : "1000000")) {
      return 6;
    } else if (compare(amount, "<", isWhole ? 10 : "10000000")) {
      return 4;
    } else if (compare(amount, "<", isWhole ? 100 : "100000000")) {
      return 2;
    } else if (compare(amount, ">", isWhole ? 1e5 : "100000000000")) {
      return 1;
    }
    return 0;
  } catch (e) {
    return 0;
  }
};
const getCompactDecimals = (wholePartLength) => {
  if (wholePartLength < 2) {
    return 2;
  } else if (wholePartLength < 3) {
    return 1;
  }
  return 0;
};
const getPercentDecimals = (percent, isFraction = false) => {
  try {
    const _percent = isFraction ? multiply(percent, 100) : percent + "";
    if (compare(_percent, "<", 10)) {
      return 2;
    } else if (compare(_percent, "<", 100)) {
      return 1;
    } else {
      return 0;
    }
  } catch (err) {
  }
  return 0;
};
const getNumberFormatSeparators = () => {
  const formatArray = formatAmount("-1000.1", true, true);
  const group = formatArray.find((s) => s.type === "group")?.value ?? "";
  const decimal = formatArray.find((s) => s.type === "decimal")?.value ?? "";
  const minusSign = formatArray.find((s) => s.type === "minusSign")?.value ?? "";
  return { group, decimal, minusSign };
};
const getDatetimeFormat = (showDate, showTime, showSeconds = false, disableUtc = false, languageTag, tzAlreadyHandled = false) => {
  let options = {};
  if (showDate) {
    options = { dateStyle: "short", timeZone: tzAlreadyHandled || appUseUtc.value && !disableUtc ? "UTC" : appTimezone.value };
  }
  if (showTime) {
    options = { ...options, timeStyle: showSeconds ? "medium" : "short" };
  }
  const tag = languageTag ?? appFormatTag.value;
  const key = tag + JSON.stringify(options);
  let datetimeFormat = _datetimeFormatMap.value[key];
  if (!datetimeFormat) {
    datetimeFormat = new Intl.DateTimeFormat(tag, options);
    _datetimeFormatMap.value[key] = datetimeFormat;
  }
  return datetimeFormat;
};
const getNumberFormat = (amount, isWhole, style = "decimal", decimals, currency, withSign, compact, languageTag) => {
  let options = { style };
  const displayDecimals = compact ? getDisplayDecimals(amount, isWhole) : decimals;
  if (displayDecimals !== void 0) {
    options = { ...options, maximumFractionDigits: displayDecimals, minimumFractionDigits: displayDecimals };
  }
  if (currency) {
    options = { ...options, currency, currencyDisplay: "symbol" };
  }
  if (withSign) {
    options = { ...options, signDisplay: "exceptZero" };
  }
  if (compact) {
    options = { ...options, notation: "compact", compactDisplay: "short" };
  }
  const tag = languageTag ?? appFormatTag.value;
  const key = tag + JSON.stringify(options);
  let numberFormat = _numberFormatMap.value[key];
  if (!numberFormat) {
    numberFormat = new Intl.NumberFormat(tag, options);
    _numberFormatMap.value[key] = numberFormat;
  }
  return numberFormat;
};
const formatDatetime = (datetime, showDate = true, showTime = true, showSeconds = false, disableUtc = false, languageTag, tzAlreadyHandled = false) => {
  try {
    let _datetime = datetime;
    if (typeof _datetime === "string" && !_datetime.endsWith("Z")) {
      _datetime = _datetime + "Z";
    }
    return getDatetimeFormat(showDate, showTime, showSeconds, disableUtc, languageTag, tzAlreadyHandled).format(typeof _datetime === "string" ? Date.parse(_datetime) : _datetime);
  } catch (e) {
    return typeof datetime === "string" ? datetime : "";
  }
};
const formatReportDate = (ts) => {
  const date = new Date(ts);
  const getDate = date.getDate();
  const getMonth = date.getMonth() + 1;
  const monthOfYear = getMonth < 10 ? "0" + getMonth : getMonth;
  const dayOfMonth = getDate < 10 ? "0" + getDate : getDate;
  return date.getFullYear() + "-" + monthOfYear + "-" + dayOfMonth;
};
const checkTime = (i) => i == 0 ? "00" : (i < 10 ? "0" : "") + i;
const formatRemainingTime = (seconds) => {
  const days = Math.floor(seconds / (24 * 60 * 60));
  seconds -= days * (24 * 60 * 60);
  const hours = Math.floor(seconds / (60 * 60));
  seconds -= hours * (60 * 60);
  const mins = Math.floor(seconds / 60);
  seconds -= mins * 60;
  const secs = Math.floor(seconds);
  let str = "";
  if (days > 0) str = days + "d ";
  if (hours >= 0) str = str + checkTime(hours) + "h ";
  if (mins >= 0) str = str + checkTime(mins) + "m ";
  if (secs >= 0) str = str + checkTime(secs) + "s ";
  return str;
};
const formatPercent = (percent, decimals, withSign) => {
  let formatter;
  try {
    formatter = getNumberFormat(percent.toString(), true, "percent", decimals ?? getPercentDecimals(percent), void 0, withSign);
  } catch (e) {
    console.error("Error: formatPercent: ", e.message);
    return [];
  }
  return formatter.formatToParts(percent / 100);
};
const toSubscript = (num) => {
  const subscriptMap = {
    "0": "₀",
    "1": "₁",
    "2": "₂",
    "3": "₃",
    "4": "₄",
    "5": "₅",
    "6": "₆",
    "7": "₇",
    "8": "₈",
    "9": "₉"
  };
  return num.toString().split("").map((ch) => {
    return subscriptMap[ch] || ch;
  }).join("");
};
const formatSmallNumber = (n) => {
  if (Number.isNaN(n)) {
    return n;
  }
  if (n === 0) {
    return "0.0";
  }
  const _n = parseFloat(n.toString());
  if (_n >= 1) {
    return _n.toFixed(5);
  }
  const decimals = Math.max(20, Math.abs(Math.floor(Math.log10(Math.abs(_n)))) + 10);
  const fixed = _n.toFixed(decimals);
  const parts = fixed.split(".");
  if (parts.length < 2) {
    return fixed;
  }
  const fractionalPart = parts[1];
  let leadingZeros = 0;
  for (const ch of fractionalPart) {
    if (ch === "0") {
      leadingZeros++;
    } else {
      break;
    }
  }
  const significant = fractionalPart.substring(leadingZeros);
  if (significant.length === 0) {
    return parts[0] + ".0";
  }
  if (leadingZeros <= 3) {
    const sigCount = Math.max(5 - leadingZeros, 0);
    const sigDigits = significant.substring(0, sigCount);
    const zeros = fractionalPart.substring(0, leadingZeros);
    return "0." + zeros + sigDigits;
  } else {
    const sigDigits = significant.substring(0, 3);
    return "0.0" + toSubscript(leadingZeros - 1) + sigDigits;
  }
};
const formatAmount = (amount, isWhole, isVisible, displayDecimals = -1, decimals, currency, withSign, compact, languageTag) => {
  let formatter;
  try {
    const style = currency?.length ?? 0 > 0 ? "currency" : "decimal";
    formatter = getNumberFormat(
      amount,
      isWhole,
      style,
      isVisible ? displayDecimals < 0 ? decimals : displayDecimals : 0,
      currency ? currency.slice(0, 3) : void 0,
      withSign,
      compact,
      languageTag
    );
  } catch (e) {
    console.error("Error: formatAmount: ", e.message);
    return [];
  }
  let [whole, fraction] = ["", ""];
  if (!isVisible) {
    return formatter.formatToParts(compare(amount, "<", 0) ? -1 : 0).map(({ type, value }) => {
      switch (type) {
        case "currency":
          return { type, value: mapCryptoSymbol((currency?.length ?? 0) > 3 ? currency : value) };
        case "integer":
          return { type, value: currency === "ADA" ? "******" : "***" };
        default:
          return { type, value };
      }
    });
  } else if (!isWhole && decimals) {
    const decimalNumber = getDecimalNumber(decimals);
    fraction = round(mod(abs(amount), decimalNumber), 0, "down");
    whole = divide(amount, decimalNumber, 0);
    while (fraction.length < decimals) {
      fraction = "0" + fraction;
    }
    const fractionFn = (value) => {
      if (compact) {
        return parseFloat("0." + value).toFixed(getDisplayDecimals(whole)).slice(2);
      }
      if (displayDecimals >= 0) {
        return parseFloat("0." + fraction).toFixed(displayDecimals).slice(2);
      }
      return fraction;
    };
    return formatter.formatToParts(isZero(whole) ? parseFloat(whole + "." + fraction) : bigToNum(whole)).map(({ type, value }) => {
      switch (type) {
        case "fraction":
          return { type, value: fractionFn(value) };
        case "currency":
          return { type, value: mapCryptoSymbol((currency?.length ?? 0) > 3 ? currency : value) };
        default:
          return { type, value };
      }
    });
  } else {
    const isBigNum = amount.match(/^[0-9]+$/);
    if (isBigNum) {
      if (amount.toString() !== bigToNum(amount).toString()) {
        return [{ type: "integer", value: amount }];
      }
    }
    return formatter.formatToParts(amount.match(/^[0-9]+$/) ? bigToNum(amount) : parseFloat(amount)).map((n) => n.type === "currency" ? { type: n.type, value: mapCryptoSymbol((currency?.length ?? 0) > 3 ? currency : n.value) } : n);
  }
};
const formatPercentString = (percent, decimals) => formatPercent(percent, decimals).join("");
const formatPercentValue = (percent, decimals) => formatAmountValue(percent.toString(), true, decimals);
const formatADA = (lovelace, isVisible, displayDecimals, withSign, compact, withSymbol, languageTag) => formatAmount(lovelace, false, isVisible, displayDecimals, getNetworkDecimals(networkId.value), withSymbol ? "ADA" : void 0, withSign, compact, languageTag);
const formatADAValue = (lovelace) => formatAmountValue(lovelace, false, getNetworkDecimals(networkId.value));
const formatADAString = (lovelace, isVisible = true, displayDecimals, withSign, compact, withSymbol) => formatADA(lovelace, isVisible, displayDecimals, withSign, compact, withSymbol).map((s) => s.value).join("");
const formatAmountString = (amount, isWhole, isVisible, displayDecimals, decimals, currency, withSign, compact, languageTag) => formatAmount(amount, isWhole, isVisible, displayDecimals, decimals, currency, withSign, compact, languageTag).map((s) => s.value).join("");
const formatAmountValue = (amount, isWhole, decimals) => {
  return formatAmount(amount, isWhole, true, decimals, decimals).map(({ type, value }) => {
    switch (type) {
      case "integer":
        return value;
      case "fraction":
        return value;
      case "decimal":
        return ".";
      default:
        return "";
    }
  }).join("");
};
const replaceSeparator = (amount, sep) => {
  const ar = amount.split("");
  for (let i = ar.length - 1; i >= 0; i--) {
    if (ar[i] === sep) {
      ar.splice(i, 1);
    }
  }
  return ar.join("");
};
const valueFromFormattedString = (amount, decimals = 6, zeroIfEmpty = false, decimalSeparator) => {
  const separators = getNumberFormatSeparators();
  let isNegative = false;
  amount = replaceSeparator(amount, separators.group);
  while (amount.startsWith(separators.minusSign) || amount.startsWith("-")) {
    amount = amount.slice(1);
    isNegative = true;
  }
  if (!decimalSeparator) {
    decimalSeparator = separators.decimal;
  }
  while (amount.length > 1 && amount.startsWith("0")) amount = amount.slice(1);
  const value = amount.split(decimalSeparator).map((n) => n.replace(/[^0-9]/g, "")).join(".");
  const valueArray = value.split(".");
  let whole = valueArray[0];
  let fraction = valueArray.slice(1).join("").replace(/[^0-9]/g, "").slice(0, decimals);
  if (fraction.length === 0) {
    const num = 0;
    fraction = num.toFixed(decimals).replace(/[^0-9]/g, "").slice(0, decimals);
  }
  whole = zeroIfEmpty && whole.length === 0 ? "0" : isNegative ? "-" + whole : whole;
  fraction = zeroIfEmpty && fraction.length === 0 ? "0" : fraction;
  return { whole, fraction, number: whole + "." + fraction };
};
const formatTxType = (type, isProMode) => {
  let sentTokens = false;
  let sentAda = false;
  let receivedTokens = false;
  let receivedAda = false;
  let receivedRewards = false;
  let intraWallet = false;
  if (!type) {
    return { name: $t("tx-txtype:unknown"), icon: "unknown", sentTokens, sentAda, receivedTokens, receivedAda, intraWallet, receivedRewards };
  }
  if ((type & ITxBalanceType.failedContract) === ITxBalanceType.failedContract) {
    return { name: $t("tx-txtype:failed"), icon: "failed", sentTokens, sentAda, receivedTokens, receivedAda, intraWallet, receivedRewards };
  }
  if ((type & ITxBalanceType.sentTokens) === ITxBalanceType.sentTokens) {
    sentTokens = true;
  }
  if ((type & ITxBalanceType.sentAda) === ITxBalanceType.sentAda) {
    sentAda = true;
  }
  if ((type & ITxBalanceType.receivedTokens) === ITxBalanceType.receivedTokens) {
    receivedTokens = true;
  }
  if ((type & ITxBalanceType.receivedAda) === ITxBalanceType.receivedAda) {
    receivedAda = true;
  }
  if ((type & ITxBalanceType.rewards) === ITxBalanceType.rewards) {
    receivedRewards = true;
  }
  let name = receivedRewards ? "Rewards" : "";
  let icon = "square";
  if (receivedRewards) {
    return { name, icon, sentTokens, sentAda, receivedTokens, receivedAda, intraWallet, receivedRewards };
  }
  let sentReceived = false;
  if (sentAda) {
    name += $t("tx-txtype:sent");
    icon = "send";
    sentReceived = true;
  }
  if (receivedAda) {
    name += $t("tx-txtype:received");
    icon = "import";
    sentReceived = true;
  }
  if (sentReceived) {
    name += " " + $t("tx-txtype:ada");
  }
  if (isProMode) {
    if (sentTokens || receivedTokens) {
      if (name.length > 0) {
        name += ", ";
      }
      if (sentTokens) {
        name += $t("tx-txtype:sent");
      }
      if (receivedTokens) {
        if (sentTokens) {
          name += " " + $t("tx-txtype:and") + " ";
        }
        name += $t("tx-txtype:received");
      }
      name += " " + $t("tx-txtype:tokens");
    }
  }
  intraWallet = (type & ITxBalanceType.intraWallet) === ITxBalanceType.intraWallet && (!receivedTokens && !sentTokens);
  if (intraWallet) {
    name = $t("tx-txtype:intraWallet");
    icon = "left";
  }
  if ((type & ITxBalanceType.external) === ITxBalanceType.external) {
    name = $t("tx-txtype:external");
    icon = "square";
  }
  if ((type & ITxBalanceType.withdrawal) === ITxBalanceType.withdrawal) {
    if (name.length > 0) {
      name += ", ";
    }
    name += $t("tx-txtype:withdrawal");
  }
  return { name, icon, sentTokens, sentAda, receivedTokens, receivedAda, intraWallet, receivedRewards };
};
const truncateAddress = (fullAddr, strLen, separator) => {
  if (fullAddr.length <= strLen) return fullAddr;
  separator = separator || "...";
  const sepLen = separator.length;
  const charsToShow = strLen - sepLen;
  const frontChars = Math.ceil(charsToShow / 2);
  const backChars = Math.floor(charsToShow / 2);
  return fullAddr.slice(0, frontChars) + separator + fullAddr.slice(fullAddr.length - backChars);
};
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
const truncateString = (str, strLen, suffix = "...") => {
  if (str.length <= strLen) {
    return str;
  }
  return str.slice(0, strLen) + suffix;
};
const formatTimeAndDate = (datetime, minimal, reverse = false, showTime = true, hideAgo = false, hideAgo24h = false, tzAlreadyHandled = false) => {
  let _datetime = datetime;
  if (typeof _datetime === "string" && !_datetime.endsWith("Z")) {
    _datetime = _datetime + "Z";
  }
  let date = new Date(_datetime);
  let now = new Date((/* @__PURE__ */ new Date()).toUTCString());
  let str = !hideAgo ? formatTimeAgo(now.getTime() - date.getTime(), hideAgo24h) : "";
  let divider = str.length > 0 ? " - " : "";
  if (!minimal) {
    if (!reverse) {
      str += divider + formatDatetime(_datetime, true, showTime, showTime, tzAlreadyHandled);
    } else {
      str = formatDatetime(_datetime, true, showTime, showTime, tzAlreadyHandled) + divider + str;
    }
  }
  return str;
};
const formatTimeAgo = (difference, hideAgo24h = false, compact = false) => {
  let days = Math.floor(difference / (1e3 * 60 * 60 * 24));
  let hours = Math.floor(difference % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60));
  let minutes = Math.floor(difference % (1e3 * 60 * 60) / (1e3 * 60));
  let seconds = Math.floor(difference % (1e3 * 60) / 1e3);
  if (hideAgo24h && days === 0) {
    return "";
  }
  if (compact) {
    if (days > 1) {
      return $t("common:timestamp.compact.ago.days", { days });
    } else if (days > 0) {
      return $t("common:timestamp.compact.ago.days", { days });
    } else if (hours > 1) {
      return $t("common:timestamp.compact.ago.hours", { hours });
    } else if (hours > 0) {
      return $t("common:timestamp.compact.ago.hours", { hours });
    } else if (minutes > 1) {
      return $t("common:timestamp.compact.ago.minutes", { minutes });
    } else if (minutes > 0) {
      return $t("common:timestamp.compact.ago.minutes", { minutes });
    } else {
      return $t("common:timestamp.compact.ago.seconds", { seconds });
    }
  } else {
    if (days > 1) {
      return $t("common:timestamp.full.ago.days", { days });
    } else if (days > 0) {
      return $t("common:timestamp.full.ago.days", { days });
    } else if (hours > 1) {
      return $t("common:timestamp.full.ago.hours", { hours });
    } else if (hours > 0) {
      return $t("common:timestamp.full.ago.hours", { hours });
    } else if (minutes > 1) {
      return $t("common:timestamp.full.ago.minutes", { minutes });
    } else if (minutes > 0) {
      return $t("common:timestamp.full.ago.minutes", { minutes });
    } else {
      return $t("common:timestamp.full.ago.seconds", { seconds });
    }
  }
};
const formatTime = (difference, hideAgo24h = false, compact = false) => {
  let days = Math.floor(difference / (1e3 * 60 * 60 * 24));
  let hours = Math.floor(difference % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60));
  let minutes = Math.floor(difference % (1e3 * 60 * 60) / (1e3 * 60));
  let seconds = Math.floor(difference % (1e3 * 60) / 1e3);
  if (hideAgo24h && days === 0) {
    return "";
  }
  if (compact) {
    if (days > 1) {
      return $t("common:timestamp.compact.in.days", { days });
    } else if (days > 0) {
      return $t("common:timestamp.compact.in.days", { days });
    } else if (hours > 1) {
      return $t("common:timestamp.compact.in.hours", { hours });
    } else if (hours > 0) {
      return $t("common:timestamp.compact.in.hours", { hours });
    } else if (minutes > 1) {
      return $t("common:timestamp.compact.in.minutes", { minutes });
    } else if (minutes > 0) {
      return $t("common:timestamp.compact.in.minutes", { minutes });
    } else {
      return $t("common:timestamp.compact.in.seconds", { seconds });
    }
  } else {
    if (days > 1) {
      return $t("common:timestamp.full.in.days", { days });
    } else if (days > 0) {
      return $t("common:timestamp.full.in.days", { days });
    } else if (hours > 1) {
      return $t("common:timestamp.full.in.hours", { hours });
    } else if (hours > 0) {
      return $t("common:timestamp.full.in.hours", { hours });
    } else if (minutes > 1) {
      return $t("common:timestamp.full.in.minutes", { minutes });
    } else if (minutes > 0) {
      return $t("common:timestamp.full.in.minutes", { minutes });
    } else {
      return $t("common:timestamp.full.in.seconds", { seconds });
    }
  }
};
const formatBytes = (bytes) => {
  const sizeUnitIndex = Math.max(0, Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), sizeUnits.length - 1));
  const tag = appLanguageTag.value;
  const options = {
    style: "unit",
    unit: sizeUnits[sizeUnitIndex]
  };
  const key = tag + JSON.stringify(options);
  let numberFormat = _numberFormatMap.value[key];
  if (!numberFormat) {
    numberFormat = new Intl.NumberFormat(tag, options);
    _numberFormatMap.value[key] = numberFormat;
  }
  return numberFormat.format(bytes / 1024 ** sizeUnitIndex);
};
function useFormatter() {
  return {
    useCompactFormat,
    setTranslate,
    mapCryptoSymbol,
    mapAdaCurrency,
    getDisplayDecimals,
    getCompactDecimals,
    getPercentDecimals,
    getNetworkDecimals,
    getDecimalNumber,
    getNumberFormatSeparators,
    getDatetimeFormat,
    truncateAddress,
    truncateString,
    capitalize,
    formatDatetime,
    formatReportDate,
    formatRemainingTime,
    formatTxType,
    formatPercent,
    formatAmount,
    formatADA,
    formatPercentString,
    formatPercentValue,
    formatAmountString,
    formatAmountValue,
    formatADAString,
    formatADAValue,
    formatSmallNumber,
    valueFromFormattedString,
    formatTimeAndDate,
    formatTimeAgo,
    formatTime,
    formatBytes,
    translateBadge,
    translateBadgeList,
    translateErrorMessage
  };
}

export { getTranslate as g, useFormatter as u };
