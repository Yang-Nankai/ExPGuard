import { d as defineComponent, w as useTranslation, f as onMounted, c as createBlock, o as openBlock, y as withCtx, p as createBaseVNode, n as createVNode, z as resolveComponent, u as unref, B as toDisplayString, e as ref, G as watch, H as createTextVNode, m as createElementBlock, t as createCommentVNode, aX as json, P as networkId, Q as reactive, aM as el, aN as sl, aW as changeTimezone, v as createStaticVNode, D as computed, aP as markRaw, aO as withKeys, ba as trimAllStrings, bb as isTxHash, ab as mergeModels, ac as useModel, F as Fragment, U as withModifiers, V as normalizeClass, a1 as withDirectives, S as renderList, a2 as resolveDirective, x as useScreenSize, l as useTheme, Z as useLocalStorage, bc as watchEffect, Y as toRefs, $ as createSlots } from './index.js';
import { u as useSelectedAccount } from './useSelectedAccount.js';
import { u as useAdaSymbol } from './useAdaSymbol.js';
import './useModalStakePoolList.js';
import { I as IconStakingOutline } from './IconStakingOutline.js';
import { F as FxStakingHeader } from './FxStakingHeader.js';
import { _ as _sfc_main$v } from './PageHeader.vue_vue_type_script_setup_true_lang.js';
import { s as selectedEntity, b as useReportTimeChanger, c as sortBalanceList, g as getEntityByName, d as getRawData, e as getAccountIdsByTxHash, f as getAllRawData, h as addRawData, u as useWalletList, i as clearRawData, _ as _sfc_main$l, j as entityList, l as loadRawData, k as fullEntityList, m as saveRawData, n as getAccountNames } from './WalletList.vue_vue_type_script_setup_true_lang.js';
import { u as useFileSystemAccess } from './useFileSystemAccess.js';
import { u as useModalEntityManagement, a as useCSVExport } from './useCSVExport.js';
import { _ as _sfc_main$j } from './SettingsItem.vue_vue_type_script_setup_true_lang.js';
import { u as useCurrencyAPI } from './useCurrencyAPI.js';
import { u as useModalSelectCurrency } from './useModalSelectCurrency.js';
import { _ as _sfc_main$k } from './TimezoneSetting.vue_vue_type_script_setup_true_lang.js';
import { ak as isZeroValue, a5 as ITxBalanceType, al as getSingleAsset, z as addValueToValue, am as getNumAssets2, a4 as getUtxoHash, an as isEqualMultiAsset, ao as isEqualPolicyIds, ap as clearValueJSON, aq as getIAppAccountByAddress, ar as getITxBalanceType, as as getTxBalanceTypeFlags, at as countMultiAsset, e as getIAppAccountById, au as includesFingerprint, av as includesPolicyId } from './app2.js';
import { u as useDownload } from './useDownload.js';
import { i as isZero, s as subtract, m as multiply, d as divide, n as neg, j as add, a as isLessThanZero, f as isGreaterThanZero, k as isZeroOrGreater, c as compare, e as bigToNum, p as pow, g as abs } from './bigmath.js';
import { c as getDateIdFromSlot, g as getTimestampFromSlot, d as getSlotFromDateId, e as getDateIdFromTimestamp } from './chain.js';
import { b as appTimezone } from './language.js';
import { g as getPriceOfDay, i as isLoadingPriceOfDay, p as priceOfDayData } from './priceOfDay.js';
import { h as getAssetInfoCheck, l as loadAssetMapInfo } from './useAppAccountBalances.js';
import { u as useNotifications } from './useNotification.js';
import { I as IconDelete02 } from './IconDelete02.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper.js';
import { B as ButtonRow } from './ButtonRow.js';
import { _ as _sfc_main$m } from './ContextMenu.vue_vue_type_script_setup_true_lang.js';
import { g as getNetworkDecimals } from './NetworkId.js';
import { a as appCurrency } from './currency2.js';
import { u as useModalOpen } from './useModalOpen.js';
import { _ as _sfc_main$s } from './InputCoin.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$u } from './Modal.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$t } from './ModalHeader.vue_vue_type_script_setup_true_lang.js';
import { u as usePaginator } from './usePaginator.js';
import { u as useFormatter } from './useFormatter.js';
import { u as useModalTransactionViewer, _ as _sfc_main$r } from './TransactionAssetList.vue_vue_type_script_setup_true_lang.js';
import { I as IconArrowUp01, a as IconArrowDown01 } from './IconArrowUp01.js';
import { f as IconPin } from './SyncInfo.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$q } from './AdaAmount.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$p } from './FiatAmount.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$n } from './ExplorerLink.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$o } from './Badge.vue_vue_type_script_setup_true_lang.js';
import './epochParams.js';
import './index2.js';
import './DrawSVGPlugin.js';
import './IconPlusSign.js';
import './useModalReceiveAddress.js';
import './IconChevronDown.js';
import './IconChevronUp.js';
import './IconArrowLB.js';
import './IconCopy01.js';
import './useBalanceVisible.js';
import './IconPencil.js';
import './FormattedAmount.vue_vue_type_script_setup_true_lang.js';
import './index3.js';
import './history.js';
import './contractMapping.js';
import './Toggle.vue_vue_type_script_setup_true_lang.js';
import './ButtonOutline.vue_vue_type_script_setup_true_lang.js';
import './notification.js';
import './IconInformationCircle.js';
import './IconCancel01.js';
import './parse.js';
import './ErrorSignTx.js';
import './useSignTx.js';
import './creds.js';
import './useModalAssetDetails.js';
import './image.js';
import './useGuards.js';
import './IconAlert02.js';
import './useAppMode.js';
import './IconLinkSquare01.js';

const _hoisted_1$i = { class: "shrink flex flex-row et-js-ic et-gap-md truncate" };
const _hoisted_2$b = { class: "truncate" };
const _hoisted_3$a = { class: "w-full flex flex-col" };
const _hoisted_4$a = { class: "whitespace-pre-line" };
const _hoisted_5$a = { class: "w-full flex flex-wrap et-je-ic et-gap-sm" };
const _hoisted_6$9 = { class: "shrink-0 flex flex-row pr-2" };
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  __name: "CardEntityManagement",
  setup(__props) {
    const $t = useTranslation().t;
    const {
      openModalEntityManagement
    } = useModalEntityManagement();
    const {
      initFileSystemAccess
    } = useFileSystemAccess();
    onMounted(() => {
      initFileSystemAccess(true);
    });
    return (_ctx, _cache) => {
      const _component_Divider = resolveComponent("Divider");
      const _component_Button = resolveComponent("Button");
      const _component_Card = resolveComponent("Card");
      return openBlock(), createBlock(_component_Card, {
        class: "w-full min-w-0",
        pt: {
          body: "h-full flex et-gap-md",
          title: "flex flex-row et-gap-md et-jb-ic et-jb-ic sm:et-jb-ic",
          content: "h-full flex flex-col et-gap-md",
          footer: "flex flex-row et-gap-md et-jc-ic"
        }
      }, {
        title: withCtx(() => [
          createBaseVNode("div", _hoisted_1$i, [
            createBaseVNode("div", _hoisted_2$b, toDisplayString(unref($t)("reporting:entityManagement.title")), 1)
          ])
        ]),
        content: withCtx(() => [
          createVNode(_component_Divider, { class: "my-0" }),
          createBaseVNode("div", _hoisted_3$a, [
            createBaseVNode("span", _hoisted_4$a, toDisplayString(unref($t)("reporting:entityManagement.caption")), 1)
          ]),
          createBaseVNode("div", null, [
            createVNode(_component_Button, {
              label: unref($t)("reporting:entityManagement.button.manage"),
              severity: "secondary",
              rounded: "",
              outlined: "",
              onClick: _cache[0] || (_cache[0] = ($event) => unref(openModalEntityManagement)("manage"))
            }, null, 8, ["label"])
          ])
        ]),
        footer: withCtx(() => [
          createBaseVNode("div", _hoisted_5$a, [
            createVNode(_component_Button, {
              class: "w-full",
              label: "Select Folder",
              severity: "secondary",
              rounded: "",
              outlined: "",
              onClick: _cache[1] || (_cache[1] = ($event) => unref(initFileSystemAccess)(false))
            }),
            createVNode(_sfc_main$j, {
              label: "Selected entity:",
              onClick: _cache[2] || (_cache[2] = ($event) => unref(openModalEntityManagement)("select"))
            }, {
              icon: withCtx(() => [
                createBaseVNode("div", _hoisted_6$9, toDisplayString(unref(selectedEntity)?.name ?? "-"), 1)
              ]),
              _: 1
            })
          ])
        ]),
        _: 1
      });
    };
  }
});

const _hoisted_1$h = { class: "shrink flex flex-row et-js-ic et-gap-md truncate" };
const _hoisted_2$a = { class: "truncate" };
const _hoisted_3$9 = { class: "w-full flex flex-col et-gap-sm et-jc-ic" };
const _hoisted_4$9 = { class: "w-full mt-2 flex flex-wrap et-gap-md et-js-ic" };
const _hoisted_5$9 = { class: "w-full flex flex-wrap et-gap-md et-js-ic" };
const _hoisted_6$8 = { class: "shrink-0 flex flex-row pr-1.5 uppercase" };
const _hoisted_7$5 = { key: 0 };
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "CardReportingDate",
  setup(__props) {
    const $t = useTranslation().t;
    const {
      openModalSelectCurrency
    } = useModalSelectCurrency();
    const {
      setDay,
      setMonth,
      setYear
    } = useReportTimeChanger();
    const { activeCurrency } = useCurrencyAPI();
    const date = ref(new Date(2020, 0, 1));
    const minDate = ref(new Date(2020, 0, 1));
    const maxDate = ref(/* @__PURE__ */ new Date());
    const isUsingMonth = ref(false);
    const isUsingDay = ref(false);
    const updateDate = () => {
      if (isUsingDay.value) {
        setDay(date.value.getDate());
      } else {
        setDay(0);
      }
      if (isUsingMonth.value) {
        setMonth(date.value.getMonth() + 1);
      } else {
        setMonth(0);
      }
      setYear(date.value.getFullYear());
    };
    watch(isUsingMonth, () => {
      if (!isUsingMonth.value) {
        isUsingDay.value = false;
      }
      updateDate();
    });
    watch(isUsingDay, () => {
      if (isUsingDay.value) {
        isUsingMonth.value = true;
      }
      updateDate();
    });
    watch(date, () => {
      updateDate();
    });
    return (_ctx, _cache) => {
      const _component_Divider = resolveComponent("Divider");
      const _component_DatePicker = resolveComponent("DatePicker");
      const _component_ToggleSwitch = resolveComponent("ToggleSwitch");
      const _component_Card = resolveComponent("Card");
      return openBlock(), createBlock(_component_Card, {
        class: "min-w-0",
        pt: {
          body: "flex et-gap-md",
          title: "flex flex-row et-gap-md et-jb-ic et-jb-ic sm:et-jb-ic",
          content: "flex flex-col et-gap-md",
          footer: "flex flex-row et-gap-md et-jc-ic"
        }
      }, {
        title: withCtx(() => [
          createBaseVNode("div", _hoisted_1$h, [
            createBaseVNode("div", _hoisted_2$a, toDisplayString(unref($t)("reporting:date.title")), 1)
          ])
        ]),
        content: withCtx(() => [
          createVNode(_component_Divider, { class: "my-0" }),
          createBaseVNode("div", _hoisted_3$9, [
            createVNode(_component_DatePicker, {
              modelValue: date.value,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => date.value = $event),
              class: "",
              pt: {
                pcInputText: {
                  root: "text-center"
                }
              },
              view: isUsingMonth.value ? isUsingDay.value ? "date" : "month" : "year",
              dateFormat: isUsingMonth.value ? isUsingDay.value ? "dd/mm/yy" : "mm/yy" : "yy",
              "min-date": minDate.value,
              "max-date": maxDate.value
            }, null, 8, ["modelValue", "view", "dateFormat", "min-date", "max-date"]),
            createBaseVNode("div", _hoisted_4$9, [
              createVNode(_component_ToggleSwitch, {
                modelValue: isUsingMonth.value,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => isUsingMonth.value = $event)
              }, null, 8, ["modelValue"]),
              _cache[3] || (_cache[3] = createBaseVNode("span", null, "Set specific month", -1))
            ]),
            createBaseVNode("div", _hoisted_5$9, [
              createVNode(_component_ToggleSwitch, {
                modelValue: isUsingDay.value,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => isUsingDay.value = $event)
              }, null, 8, ["modelValue"]),
              _cache[4] || (_cache[4] = createBaseVNode("span", null, "Set specific day", -1))
            ]),
            createVNode(_sfc_main$k),
            createVNode(_sfc_main$j, {
              label: unref($t)("settings-app:currency.title"),
              onClick: unref(openModalSelectCurrency)
            }, {
              icon: withCtx(() => [
                createBaseVNode("div", _hoisted_6$8, [
                  createTextVNode(toDisplayString(unref(activeCurrency).symbol) + " ", 1),
                  unref(activeCurrency).id !== unref(activeCurrency).symbol ? (openBlock(), createElementBlock("span", _hoisted_7$5, " (" + toDisplayString(unref(activeCurrency).id) + ")", 1)) : createCommentVNode("", true)
                ])
              ]),
              _: 1
            }, 8, ["label", "onClick"])
          ])
        ]),
        _: 1
      });
    };
  }
});

const createIReportEntityBalance = (id) => {
  return {
    id,
    coin: "0"
  };
};

const createIReportRawBalance = (hash, slot, idx, accountId) => {
  return {
    h: hash,
    s: slot,
    idx,
    f: "0",
    a: createIReportEntityBalance(accountId),
    t: ITxBalanceType.uninitialized
  };
};
const createIReportMetaBalance = (balance, entityId) => {
  const data = createIReportRawBalance(balance.h, balance.s, balance.idx, entityId);
  data.cb = [];
  data.f = balance.f;
  if (balance.ow) {
    data.ow = balance.ow;
  }
  if (balance.ew) {
    data.ew = balance.ew;
  }
  if (balance.a.hasInputs) {
    data.a.hasInputs = true;
  }
  return data;
};
const hasLeftOverValue = (balance) => {
  return !isZeroValue(balance.leftover) && !isZero(balance.a.coin);
};

const createIReportCostBasisAda = (lovelace, type, ts, cbId) => {
  const cb = {
    t: type,
    av: lovelace,
    ts
  };
  if (type === "p" && cbId) {
    cb.id = cbId;
  }
  return cb;
};
const createIReportCostBasisToken = (multiasset, type, ts, cbId) => {
  const sa = getSingleAsset(multiasset);
  if (!sa) {
    throw new Error("createIReportCostBasisToken: no single asset");
  }
  const cb = {
    t: type,
    av: sa.av,
    au: sa.au,
    lv: "0",
    ts
  };
  if (type === "p" && cbId) {
    cb.id = cbId;
  }
  return cb;
};
const cloneIReportCostBasis = (value) => {
  const cb = {
    t: value.t,
    ts: value.ts
  };
  if (typeof value.pd !== "undefined") {
    cb.pd = value.pd;
  }
  if (typeof value.av !== "undefined") {
    cb.av = value.av;
  }
  if (typeof value.i !== "undefined") {
    cb.i = value.i;
  }
  if (typeof value.l !== "undefined") {
    cb.l = value.l;
  }
  if (typeof value.id !== "undefined") {
    cb.id = value.id;
  }
  if (typeof value.au !== "undefined") {
    cb.au = value.au;
  }
  if (typeof value.lv !== "undefined") {
    cb.lv = value.lv;
  }
  if (typeof value.fv !== "undefined") {
    cb.fv = value.fv;
  }
  if (typeof value.fu !== "undefined") {
    cb.fu = value.fu;
  }
  if (typeof value.gl !== "undefined") {
    cb.gl = value.gl;
  }
  return cb;
};

const getSlotDate = (slot) => new Date(getTimestampFromSlot(networkId.value, slot));
const getDateId = (slot) => getDateIdFromSlot(networkId.value, slot, appTimezone.value);
const deletePriceOfDay = (cb) => {
  delete cb.pd;
  delete cb.fv;
  delete cb.gl;
  delete cb.fu;
};
const calcFiatValue = (cb) => {
  try {
    if (!cb.au) {
      cb.fv = parseFloat(multiply(divide(cb.av, "1000000"), cb.pd ?? 0, 6));
    } else {
      if (typeof cb.lv === "string" && cb.lv !== "0") {
        cb.fv = parseFloat(multiply(divide(cb.lv, "1000000"), cb.pd ?? 0, 6));
      } else {
        delete cb.fv;
        delete cb.gl;
      }
    }
  } catch (err) {
    console.error("err", err);
    console.error("cb", json(cb));
  }
};
const addPriceOfDay = (cb, dateId) => {
  if (cb.t === "d" || cb.t === "c" || cb.t === "sc") {
    return deletePriceOfDay(cb);
  }
  if (typeof cb.pd !== "number" || cb.pd === 0) {
    const priceOfDay = getPriceOfDay(dateId);
    cb.pd = priceOfDay.pd;
    cb.fu = priceOfDay.unit;
  }
  calcFiatValue(cb);
};
const updateLovelaceLeft = (balance) => {
  if (!balance) {
    return false;
  }
  if (!balance.cb) {
    balance.cb = [];
  }
  const total = addValueToValue(void 0, balance.a);
  for (const cb of balance.cb) {
    if (!cb.au) {
      total.coin = subtract(total.coin, cb.av);
    } else {
      const [policyId, assetName] = cb.au.split(".");
      const coin = cb.lv ?? "0";
      addValueToValue(total, { coin, multiasset: { [policyId]: { [assetName]: cb.av } } }, true);
    }
  }
  balance.leftover = total;
  return true;
};
const markBalanceFeeAsTaxRelevant = (balance, _addPriceOfDay = true, force = false) => {
  if (!updateLovelaceLeft(balance)) {
    return false;
  }
  if (balance.h === "7ff8d04e56d48909749a092785275a228b22d8b65bb12728ff543e0e01e7a292") {
    console.warn("####", balance.a.hasInputs, balance.f, balance.leftover.coin);
  }
  if (!balance.a.hasInputs && !force) {
    return true;
  }
  if (balance.f === "0") {
    return true;
  }
  const cb = addCostBasisAda(balance, "f", neg(balance.f));
  if (_addPriceOfDay) {
    addPriceOfDay(cb, getDateId(balance.s));
  }
  return true;
};
const markBalanceDeposit = (balance, _addPriceOfDay = true) => {
  if (!balance) {
    return;
  }
  if (!balance.d) {
    return;
  }
  if (isZero(balance.d)) {
    return;
  }
  const cb = addCostBasisAda(balance, "d", balance.d);
  if (_addPriceOfDay) {
    addPriceOfDay(cb, getDateId(balance.s));
  }
};
const markBalanceRewards = (balance, _addPriceOfDay = true) => {
  if (!markBalanceFeeAsTaxRelevant(balance)) {
    return;
  }
  if (!hasLeftOverValue(balance)) {
    return;
  }
  const cb = addCostBasisAda(balance, "r", balance.leftover.coin);
  if (_addPriceOfDay) {
    addPriceOfDay(cb, getDateId(balance.s));
  }
};
const markBalanceAsX = (balance, type, _addPriceOfDay = true, skipFee = false, cbId) => {
  if (!updateLovelaceLeft(balance)) {
    return;
  }
  if (!skipFee) {
    markBalanceFeeAsTaxRelevant(balance);
  }
  if (balance.leftover.multiasset) {
    calculateMultiAssetCostBasis(balance, type, balance.leftover, cbId);
  }
  if (!hasLeftOverValue(balance)) {
    return;
  }
  const cb = addCostBasisAda(balance, type, balance.leftover.coin, cbId);
  if (_addPriceOfDay) {
    addPriceOfDay(cb, getDateId(balance.s));
  }
};
const markBalanceAsTaxRelevant = (balance, _addPriceOfDay = true, skipFee = false) => markBalanceAsX(balance, "i", _addPriceOfDay, skipFee);
const markBalanceAsC = (balance, _addPriceOfDay = true, skipFee = false) => markBalanceAsX(balance, "c", _addPriceOfDay, skipFee);
const markBalanceAsN = (balance, _addPriceOfDay = true, skipFee = false) => markBalanceAsX(balance, "n", _addPriceOfDay, skipFee);
const markBalanceAsP = (balance, _addPriceOfDay = true, skipFee = false) => markBalanceAsX(balance, "p", _addPriceOfDay, skipFee, "no-id");
const resetBalance = (balance) => {
  if (!balance) {
    return;
  }
  if (!balance.cb) {
    balance.cb = [];
  }
  balance.cb.length = 0;
  updateLovelaceLeft(balance);
};
const markBalanceAsManual = (balance, cb) => {
  if (!balance) {
    return;
  }
  if (!balance.cb) {
    balance.cb = [];
  }
  balance.cb.push(cb);
  updateLovelaceLeft(balance);
};
const removeCostBasis = (balance, cb) => {
  if (!balance) {
    return;
  }
  for (let i = balance.cb.length - 1; i >= 0; i--) {
    const _cb = balance.cb[i];
    if (_cb.t === cb.t && _cb.av === cb.av && _cb.au === cb.au) {
      balance.cb.splice(i, 1);
    }
  }
  updateLovelaceLeft(balance);
};
const getTimestamp = (balance) => {
  return getTimestampFromSlot(networkId.value, balance.s);
};
const calculateMultiAssetCostBasis = (balance, type, value, cbId) => {
  const multiasset = value.multiasset;
  const numAssets = getNumAssets2(value.multiasset);
  if (numAssets > 0) {
    const inAssets = { };
    const outAssets = { };
    for (const policyId in multiasset) {
      const assets = multiasset[policyId];
      for (const assetName in assets) {
        const quantity = assets[assetName];
        if (isGreaterThanZero(quantity)) {
          inAssets.multiasset = inAssets.multiasset ?? {};
          inAssets.multiasset[policyId] = inAssets.multiasset[policyId] ?? {};
          inAssets.multiasset[policyId][assetName] = quantity;
        } else if (isLessThanZero(quantity)) {
          outAssets.multiasset = outAssets.multiasset ?? {};
          outAssets.multiasset[policyId] = outAssets.multiasset[policyId] ?? {};
          outAssets.multiasset[policyId][assetName] = quantity;
        }
      }
    }
    const numInAssets = getNumAssets2(inAssets.multiasset);
    const numOutAssets = getNumAssets2(outAssets.multiasset);
    if (numInAssets > 0) {
      const multiasset2 = inAssets.multiasset;
      const valueCoin = isGreaterThanZero(value.coin) || type === "p" ? "0" : value.coin;
      const lovelacePerAsset = divide(valueCoin, numInAssets, 0);
      let totalLovelace = valueCoin;
      let assetsLeft = numInAssets;
      for (const policyId in multiasset2) {
        const assets = multiasset2[policyId];
        for (const assetName in assets) {
          const quantity = assets[assetName];
          const cb = createIReportCostBasisToken({ [policyId]: { [assetName]: quantity } }, type, getTimestamp(balance), cbId);
          cb.lv = assetsLeft === 1 ? totalLovelace : lovelacePerAsset;
          addPriceOfDay(cb, getDateId(balance.s));
          balance.cb.push(cb);
          totalLovelace = subtract(totalLovelace, lovelacePerAsset);
          assetsLeft--;
        }
      }
    }
    if (numOutAssets > 0) {
      addTokenCostBasis(balance, type, outAssets.multiasset, false, cbId);
    }
    updateLovelaceLeft(balance);
  }
};
const calculateAdaCostBasis = (cbBalance, value) => {
  if (cbBalance.length === 0) {
    return;
  }
  if (isZeroOrGreater(value.coin)) {
    return;
  }
  let totalLovelace = value.coin;
  for (let i = 0; i < cbBalance.length; i++) {
    const balance = cbBalance[i];
    const cbValue = balance.leftover.coin;
    if (isZeroOrGreater(cbValue)) {
      continue;
    }
    let cbAdd = "0";
    if (compare(cbValue, "<=", totalLovelace)) {
      cbAdd = totalLovelace;
      totalLovelace = "0";
    } else {
      cbAdd = cbValue;
      totalLovelace = subtract(totalLovelace, cbValue);
    }
    if (isLessThanZero(cbAdd)) {
      addCostBasisAda(balance, "c", cbAdd);
    }
  }
};
const distributeTokenCostBasis = (cbBalance, type, balanceLeftover, cbId) => {
  const multiasset = balanceLeftover.multiasset;
  if (!multiasset) {
    return;
  }
  for (const policyId in multiasset) {
    const assets = multiasset[policyId];
    for (const assetName in assets) {
      let totalQuantity = assets[assetName];
      if (totalQuantity && isZero(totalQuantity)) {
        continue;
      }
      totalQuantity = neg(totalQuantity);
      for (let i = 0; i < cbBalance.length; i++) {
        const balance = cbBalance[i];
        const cbValue = balance.leftover.multiasset?.[policyId]?.[assetName];
        if (typeof cbValue === "undefined" || isZeroOrGreater(cbValue)) {
          continue;
        }
        let cbAdd = "0";
        if (compare(cbValue, "<=", totalQuantity)) {
          cbAdd = totalQuantity;
          totalQuantity = "0";
        } else {
          cbAdd = cbValue;
          totalQuantity = subtract(totalQuantity, cbValue);
        }
        if (isLessThanZero(cbAdd)) {
          addTokenCostBasis(balance, type, { [policyId]: { [assetName]: cbAdd } }, false, cbId);
        }
        if (isZero(totalQuantity)) {
          break;
        }
      }
      if (!isZero(totalQuantity)) {
        console.warn("distributeTokenCostBasis: leftover quantity not fully distributed", totalQuantity, policyId, assetName);
      }
    }
  }
};
const addTokenCostBasis = (balance, type, multiasset, _neg = false, cbId) => {
  for (const policyId in multiasset) {
    const assets = multiasset[policyId];
    for (const assetName in assets) {
      const quantity = !_neg ? assets[assetName] : neg(assets[assetName]);
      const cb = createIReportCostBasisToken({ [policyId]: { [assetName]: quantity } }, type, getTimestamp(balance), cbId);
      balance.cb.push(cb);
    }
  }
};
const addCostBasisAda = (balance, type, coin, cbId) => {
  if (!balance.cb) {
    balance.cb = [];
  }
  const cb = createIReportCostBasisAda(coin, type, getTimestamp(balance), cbId);
  for (const _cb of balance.cb) {
    if (_cb.t === type && cb.av === _cb.av && cb.au === _cb.au) {
      return _cb;
    }
  }
  balance.cb.push(cb);
  updateLovelaceLeft(balance);
  return cb;
};
const isTaxNeutral = (type) => {
  return type === "d" || type === "n" || type === "p";
};
const hasTaxNeutralCostBasis = (balance) => {
  if (!balance) {
    return false;
  }
  if (!balance.cb) {
    return false;
  }
  for (const cb of balance.cb) {
    if (isTaxNeutral(cb.t)) {
      return true;
    }
  }
  return false;
};
const fillAssetKeySets = (balance, keys) => {
  if (balance.a.multiasset) {
    for (const policyId in balance.a.multiasset) {
      if (!keys.has(policyId)) {
        keys.set(policyId, /* @__PURE__ */ new Set());
      }
      const set = keys.get(policyId);
      const assets = balance.a.multiasset[policyId];
      for (const assetName in assets) {
        set.add(assetName);
      }
    }
  }
};
const markBalanceUsingCostBasis = (balance, cbBalanceList) => {
  if (!balance) {
    return;
  }
  if (!cbBalanceList) {
    return;
  }
  const keys = /* @__PURE__ */ new Map();
  const txHashSet = /* @__PURE__ */ new Set();
  const cbId = balance.h;
  cbBalanceList.push(balance);
  sortBalanceList(cbBalanceList);
  for (let i = cbBalanceList.length - 1; i >= 0; i--) {
    const cbBalance = cbBalanceList[i];
    if (txHashSet.has(cbBalance.h)) {
      cbBalanceList.splice(i, 1);
    } else {
      fillAssetKeySets(cbBalance, keys);
      txHashSet.add(cbBalance.h);
    }
  }
  if (cbBalanceList.length < 2) {
    markBalanceFeeAsTaxRelevant(balance);
    return;
  }
  const value = addValueToValue(void 0, balance.leftover);
  const cbValue = addValueToValue();
  for (const cbBalance of cbBalanceList) {
    if (!markBalanceFeeAsTaxRelevant(cbBalance)) {
      return;
    }
    if (balance.h === cbBalance.h) {
      continue;
    }
    addValueToValue(cbValue, cbBalance.leftover);
    console.log("cblo  ---  0.1 ---", json(cbBalance.leftover));
  }
  console.log("v     ---  0.1 ---", json(value));
  console.log("cbv   ---  0.1 ---", json(cbValue));
  addValueToValue(value, cbValue);
  if (!isZero(cbValue.coin) && !isZero(balance.f) && neg(balance.f) === value.coin && !balance.cb.some((cb) => cb.t === "f")) {
    console.log("      ---  0.2 --- Smart contract took the fee from sc input");
    markBalanceFeeAsTaxRelevant(balance, true, true);
    markBalanceUsingCostBasis(balance, cbBalanceList);
    return;
  }
  const addPassThroughTokenCB = (_balance, policyId, assetName) => {
    const quantity = _balance.leftover.multiasset?.[policyId]?.[assetName];
    if (typeof quantity === "undefined" || isZero(quantity)) {
      return;
    }
    const cb = createIReportCostBasisToken({ [policyId]: { [assetName]: quantity } }, "p", getTimestamp(_balance), cbId);
    _balance.cb.push(cb);
    updateLovelaceLeft(_balance);
  };
  const addPassThroughRest = () => {
    console.log("b     --- rest ---", json(balance));
    console.log("cbbl  --- rest ---", json(cbBalanceList));
    if (!isZero(balance.leftover.coin)) {
      addCostBasisAda(balance, "p", balance.leftover.coin, cbId);
    }
    if (balance.leftover.multiasset) {
      calculateMultiAssetCostBasis(balance, "p", balance.leftover, cbId);
    }
    for (const cbBalance of cbBalanceList) {
      if (balance.h === cbBalance.h) {
        continue;
      }
      if (!isZero(cbBalance.leftover.coin)) {
        addCostBasisAda(cbBalance, "p", cbBalance.leftover.coin, cbId);
      }
      if (cbBalance.leftover.multiasset) {
        calculateMultiAssetCostBasis(cbBalance, "p", cbBalance.leftover, cbId);
      }
    }
    console.log("b     --- rest ---", json(balance));
    console.log("cbbl  --- rest ---", json(cbBalanceList));
  };
  for (const [policyId, assetNames] of keys.entries()) {
    for (const assetName of assetNames) {
      const valueQuantity = value.multiasset?.[policyId]?.[assetName];
      if (typeof valueQuantity !== "undefined" && !isZero(valueQuantity)) {
        continue;
      }
      addPassThroughTokenCB(balance, policyId, assetName);
      for (const cbBalance of cbBalanceList) {
        if (balance.h === cbBalance.h) {
          continue;
        }
        addPassThroughTokenCB(cbBalance, policyId, assetName);
      }
    }
  }
  console.log("v     ---  0.2 ---", json(value));
  if (!isZero(cbValue.coin) && !value.multiasset && (isZero(value.coin) || add(value.coin, balance.f) === "0")) {
    addPassThroughRest();
  } else if (isLessThanZero(value.coin)) {
    console.log("v buy ---  1.0 ---", json(value));
    console.log("b     ---  1.0 ---", json(balance));
    console.log("cbbl  ---  1.0 ---", json(cbBalanceList));
    calculateAdaCostBasis(cbBalanceList, value);
    addCostBasisAda(balance, "c", neg(value.coin));
    console.log("b     ---  2.0 ---", json(balance));
    console.log("cbbl  ---  2.0 ---", json(cbBalanceList));
    calculateMultiAssetCostBasis(balance, "i", value);
    console.log("b     ---  3.0 ---", json(balance));
    addPassThroughRest();
  } else if (isZero(value.coin)) {
    console.log("v zero ---  1.0 ---", json(value));
    calculateAdaCostBasis(cbBalanceList, value);
    console.log("b     ---  2.0 ---", json(balance));
    console.log("cbbl  ---  2.0 ---", json(cbBalanceList));
    if (!isZero(value.coin)) {
      addCostBasisAda(balance, "c", neg(value.coin));
    }
    console.log("b     ---  3.0 ---", json(balance));
    calculateMultiAssetCostBasis(balance, "i", value);
    console.log("b     ---  4.0 ---", json(balance));
    addPassThroughRest();
  } else if (isGreaterThanZero(value.coin)) {
    console.log("v sel ---  1.0 ---", json(value));
    console.log("b     ---  1.0 ---", json(balance));
    addCostBasisAda(balance, "i", value.coin);
    if (value.multiasset) {
      addTokenCostBasis(balance, "i", value.multiasset);
      updateLovelaceLeft(balance);
      distributeTokenCostBasis(cbBalanceList, "p", balance.leftover, cbId);
    }
    if (!isZero(balance.leftover.coin)) {
      addCostBasisAda(balance, "p", balance.leftover.coin, cbId);
    }
    if (balance.leftover.multiasset) {
      addTokenCostBasis(balance, "p", balance.leftover.multiasset, false, cbId);
    }
    updateLovelaceLeft(balance);
    console.log("b     ---  2.0 ---", json(balance));
    console.log("cbbl  ---  2.0 ---", json(cbBalanceList));
    for (const cbBalance of cbBalanceList) {
      if (balance.h === cbBalance.h) {
        continue;
      }
      if (!isZero(cbBalance.leftover.coin)) {
        addCostBasisAda(cbBalance, "p", cbBalance.leftover.coin, cbId);
      }
      if (cbBalance.leftover.multiasset) {
        calculateMultiAssetCostBasis(cbBalance, "c", cbBalance.leftover);
      }
    }
    console.log("cbbl  ---  3.0 ---", json(cbBalanceList));
  } else {
    console.log("v ??? ---  1.0 ---", json(value));
  }
  sortBalanceList(cbBalanceList);
  const ptl = cbBalanceList.map((b) => b.h);
  for (const cbBalance of cbBalanceList) {
    cbBalance.ptl = ptl;
  }
  updateSoldTokenCostBasis(balance);
};
const updateSoldTokenCostBasis = (balance) => {
  let numCoinIn = 0;
  let numTokenOut = 0;
  let cbCoinIn;
  let cbTokenOut;
  for (const cb of balance.cb) {
    if (cb.t !== "i") {
      continue;
    }
    if (!cb.au && isGreaterThanZero(cb.av)) {
      cbCoinIn = cb;
      numCoinIn++;
      continue;
    }
    if (cb.au && isLessThanZero(cb.av)) {
      cbTokenOut = cb;
      numTokenOut++;
    }
  }
  if (!cbCoinIn) {
    return;
  }
  if (!cbTokenOut) {
    return;
  }
  if (numCoinIn === 1 && numTokenOut === 1) {
    console.warn("fix!!!  IN:", new Date(cbCoinIn.ts), json(balance));
    cbTokenOut.lv = cbCoinIn.av;
    addPriceOfDay(cbTokenOut, getDateId(balance.s));
    calcFiatValue(cbTokenOut);
    for (let i = balance.cb.length - 1; i >= 0; i--) {
      const cb = balance.cb[i];
      if (cb === cbCoinIn) {
        balance.cb.splice(i, 1);
        break;
      }
    }
    console.warn("fix!!! OUT:", new Date(cbCoinIn.ts), json(balance));
  } else if (numCoinIn > 1 || numTokenOut > 1) {
    console.warn("fix???", numCoinIn, numTokenOut, new Date(cbCoinIn.ts), balance);
  }
};

const createISmartContractProcess = (utxoHash, slot) => {
  return {
    id: utxoHash,
    slot,
    hashList: [utxoHash],
    isComplete: false,
    coin: "0"
  };
};

const sortSCProcessList = (list) => {
  list.sort((a, b) => a.slot - b.slot || a.id.localeCompare(b.id));
};
const getSmartContractProcess = (entityData, hash, onlyOpen = false) => {
  const openScp = entityData.openSCList.find((scp) => filterFindSCP(scp, hash));
  if (onlyOpen) {
    return openScp ?? null;
  }
  const closeScp = entityData.closedSCList.find((scp) => filterFindSCP(scp, hash));
  return closeScp ?? null;
};
const getBalanceListBySCP = (entityData, scp) => {
  const list = [];
  for (const hash of scp.hashList) {
    const txHash = hash.substring(0, 64);
    const balance = entityData.balanceList.find((b) => b.h === txHash);
    if (balance && !list.some((bb) => bb.h === balance.h)) {
      list.push(balance);
    }
  }
  return list;
};
const getAllSCPsForBalance = (entityData, balance) => {
  const list = [];
  if (balance.i) {
    for (const utxo of balance.i) {
      const utxoHash = getUtxoHash(utxo.input);
      addAllSCPToList(utxoHash, entityData.openSCList, list);
      addAllSCPToList(utxoHash, entityData.closedSCList, list);
    }
  }
  if (balance.o) {
    for (const utxo of balance.o) {
      const utxoHash = getUtxoHash(utxo.input);
      addAllSCPToList(utxoHash, entityData.openSCList, list);
      addAllSCPToList(utxoHash, entityData.closedSCList, list);
    }
  }
  const txHash = balance.h;
  addAllSCPToList(txHash, entityData.openSCList, list);
  addAllSCPToList(txHash, entityData.closedSCList, list);
  return list;
};
const updateSmartContractList = (entityData) => {
  const openSCList = entityData.openSCList;
  const openSCHashSet = /* @__PURE__ */ new Set();
  for (const scp2 of openSCList) {
    for (const hash of scp2.hashList) {
      openSCHashSet.add(hash);
    }
  }
  const closedSCList = entityData.closedSCList;
  const closedSCHashSet = /* @__PURE__ */ new Set();
  for (const scp2 of closedSCList) {
    for (const hash of scp2.hashList) {
      closedSCHashSet.add(hash);
    }
  }
  let scp;
  let utxoHash;
  let isOpen;
  let isClosed;
  for (const balance of entityData.balanceList) {
    const isSC = balance.i && balance.i.length > 0 || balance.o && balance.o.length > 0;
    if (!isSC) {
      continue;
    }
    const slot = balance.s;
    const outputList = balance.o ?? [];
    const inputList = balance.i ?? [];
    const isSCInit = outputList.length > 0 && inputList.length === 0;
    const isSCUpdate = outputList.length > 0 && inputList.length > 0;
    const isSCComplete = inputList.length > 0 && outputList.length === 0;
    if (isSCInit) {
      for (const utxo of outputList) {
        utxoHash = getUtxoHash(utxo.input);
        isOpen = openSCHashSet.has(utxoHash);
        isClosed = closedSCHashSet.has(utxoHash);
        if (isOpen || isClosed) {
          continue;
        }
        scp = createISmartContractProcess(utxoHash, slot);
        openSCList.push(scp);
        openSCHashSet.add(scp.id);
        sortSCProcessList(openSCList);
        addValueToValue(scp, utxo.output.amount);
      }
    } else if (isSCUpdate) {
      const inputUtxoHashSet = /* @__PURE__ */ new Set();
      for (const utxo of inputList) {
        utxoHash = getUtxoHash(utxo.input);
        isOpen = openSCHashSet.has(utxoHash);
        isClosed = closedSCHashSet.has(utxoHash);
        if (!isOpen && !isClosed) {
          console.error("No SCP found:", utxoHash);
          console.error("utxo", json(utxo));
          console.error("balance", json(balance));
          console.error("openSCHashSet", json(openSCHashSet));
          console.error("closedSCHashSet", json(closedSCHashSet));
          continue;
        }
        if (isClosed) {
          continue;
        }
        scp = openSCList.find((scp2) => filterFindSCP(scp2, utxoHash));
        if (!scp) {
          console.error("No open SCP found:", utxoHash);
          console.error("utxo", json(utxo));
          console.error("balance", json(balance));
          console.error("openSCHashSet", json(openSCHashSet));
          console.error("closedSCHashSet", json(closedSCHashSet));
          continue;
        }
        const matchingOutput = outputList.find((o) => {
          const utxoHash2 = getUtxoHash(o.input);
          if (inputUtxoHashSet.has(utxoHash2)) {
            return false;
          }
          if (o.output.address !== utxo.output.address) {
            return false;
          }
          if (!isEqualMultiAsset(o.output.amount.multiasset, utxo.output.amount.multiasset, true)) {
            return false;
          }
          inputUtxoHashSet.add(utxoHash2);
          return true;
        }) ?? outputList.find((o) => {
          const utxoHash2 = getUtxoHash(o.input);
          if (inputUtxoHashSet.has(utxoHash2)) {
            return false;
          }
          if (o.output.address !== utxo.output.address) {
            return false;
          }
          if (!isEqualMultiAsset(o.output.amount.multiasset, utxo.output.amount.multiasset, false)) {
            return false;
          }
          inputUtxoHashSet.add(utxoHash2);
          return true;
        }) ?? outputList.find((o) => {
          const utxoHash2 = getUtxoHash(o.input);
          if (inputUtxoHashSet.has(utxoHash2)) {
            return false;
          }
          if (o.output.address !== utxo.output.address) {
            return false;
          }
          if (!isEqualPolicyIds(o.output.amount.multiasset, utxo.output.amount.multiasset)) {
            return false;
          }
          inputUtxoHashSet.add(utxoHash2);
          return true;
        });
        if (!matchingOutput) {
          updateSCHashSets(maybeCloseSmartContractProcess(entityData, balance, utxo), openSCHashSet, closedSCHashSet);
          continue;
        }
        const matchingOutputUtxoHash = getUtxoHash(matchingOutput.input);
        if (scp.hashList.includes(matchingOutputUtxoHash)) {
          continue;
        }
        addValueToValue(scp, utxo.output.amount, true);
        addValueToValue(scp, matchingOutput.output.amount);
        scp.hashList.push(matchingOutputUtxoHash);
        openSCHashSet.add(matchingOutputUtxoHash);
      }
    } else if (isSCComplete) {
      for (const utxo of inputList) {
        updateSCHashSets(maybeCloseSmartContractProcess(entityData, balance, utxo), openSCHashSet, closedSCHashSet);
      }
    }
  }
};
const maybeCloseSmartContractProcess = (entityData, balance, utxo) => {
  const openSCList = entityData.openSCList;
  const closedSCList = entityData.closedSCList;
  const utxoHash = getUtxoHash(utxo.input);
  const openScpIndex = openSCList.findIndex((scp) => filterFindSCP(scp, utxoHash));
  const closeScpIndex = closedSCList.findIndex((scp) => filterFindSCP(scp, utxoHash));
  if (closeScpIndex >= 0) {
    return null;
  }
  const openScp = openScpIndex >= 0 ? openSCList[openScpIndex] : void 0;
  if (!openScp) {
    console.error("SCP not found to close:", utxoHash, openScpIndex);
    console.error("utxo", json(utxo));
    console.error("balance", json(balance));
    console.error("closeScpIndex", closeScpIndex);
    console.error("closedSC", json(closedSCList));
    console.error("openScpIndex", openScpIndex);
    console.error("openSCList", json(openSCList));
    return null;
  }
  if (!openScp.hashList.includes(balance.h)) {
    addValueToValue(openScp, utxo.output.amount, true);
    openScp.hashList.push(balance.h);
  }
  if (!hasLeftOverValue(balance)) {
    openSCList.splice(openScpIndex, 1);
    openScp.isComplete = true;
    closedSCList.push(openScp);
    sortSCProcessList(closedSCList);
    return openScp;
  }
  return null;
};
const updateSCHashSets = (closedScp, openSCHashSet, closedSCHashSet) => {
  if (!closedScp) {
    return;
  }
  for (const hash of closedScp.hashList) {
    openSCHashSet.delete(hash);
    closedSCHashSet.add(hash);
  }
};
const addAllSCPToList = (hash, inList, outList) => {
  for (const scp of inList) {
    if (scp.hashList.includes(hash) && !outList.some((s) => s.id === scp.id)) {
      outList.push(scp);
    }
  }
};
const filterFindSCP = (scp, hash) => {
  return scp.hashList.includes(hash) ?? scp.hashList.includes(hash.substring(0, 64));
};

const doLoadMissingAssetInfo = async (balanceList) => {
  const assetMap = {};
  let addedAssetInfoCount = 0;
  for (const entityBalance of balanceList) {
    const multiasset = entityBalance.a.multiasset;
    if (multiasset) {
      for (const policyId in multiasset) {
        for (const assetName in multiasset[policyId]) {
          const ai = getAssetInfoCheck(policyId, assetName);
          if (!ai) {
            if (!assetMap[policyId]) {
              assetMap[policyId] = [];
            }
            assetMap[policyId].push(assetName);
            addedAssetInfoCount++;
          }
        }
      }
    }
  }
  if (addedAssetInfoCount === 0) {
    return;
  }
  return loadAssetMapInfo(assetMap);
};
const doLoadMissingAssetInfoByStringList = async (assetList) => {
  const assetMap = {};
  let addedAssetInfoCount = 0;
  for (const assetKey of assetList) {
    const [policyId, assetName] = assetKey.split(".");
    const ai = getAssetInfoCheck(policyId, assetName);
    if (!ai) {
      if (!assetMap[policyId]) {
        assetMap[policyId] = [];
      }
      assetMap[policyId].push(assetName);
      addedAssetInfoCount++;
    }
  }
  if (addedAssetInfoCount === 0) {
    return;
  }
  return loadAssetMapInfo(assetMap);
};
const loadMissingAssetInfo = async (reports, year) => {
  const assetList = [];
  let list = reports.datevRowList;
  for (const row of list) {
    if ((row.info?.au?.length ?? 0) > 0) {
      if (row.info.au.includes(".")) {
        assetList.push(row.info.au);
      }
    }
  }
  let list2 = reports.csvRowList;
  for (const row of list2) {
    if ((row.info?.au?.length ?? 0) > 0) {
      if (row.info.au.includes(".")) {
        assetList.push(row.info.au);
      }
    }
  }
  await doLoadMissingAssetInfoByStringList(assetList);
};

const storeId$1 = "reportingMetaDataStore";
{
  console.warn(el(storeId$1), sl("init"));
}
const _metaData = reactive({});
reactive({});
const clearMetaData = () => {
  for (const entityId in _metaData) {
    delete _metaData[entityId];
  }
};
const getMetaData = (entityId, reset) => {
  if (!_metaData[entityId]) {
    _metaData[entityId] = {
      balanceList: [],
      openSCList: [],
      closedSCList: []
    };
  }
  return _metaData[entityId];
};
const setMetaData = (_newData, isFirstImport = false) => {
  const numTxAdded = {};
  for (const entityId in _newData) {
    const newData = _newData[entityId];
    if (typeof entityId !== "string" || !Array.isArray(newData.balanceList) || !Array.isArray(newData.openSCList) || !Array.isArray(newData.closedSCList)) {
      numTxAdded[entityId] = -1;
      continue;
    }
    const entityData = getMetaData(entityId);
    const isEmptyList = entityData.balanceList.length === 0;
    for (const balance of newData.balanceList) {
      if (!isFirstImport && !isEmptyList) {
        const oldBalance = entityData.balanceList.find((b) => b.h === balance.h);
        if (oldBalance) {
          oldBalance.cb = balance.cb;
          updateLovelaceLeft(oldBalance);
          continue;
        }
      }
      updateLovelaceLeft(balance);
      entityData.balanceList.push(balance);
    }
    sortBalanceList(entityData.balanceList);
    {
      console.log(el(storeId$1), sl("entityData"), json(entityData));
    }
    updateSmartContractList(entityData);
  }
  return numTxAdded;
};
const saveMetaData = (entityId, minSlot, maxSlot) => {
  const metaData = getMetaData(entityId);
  sortBalanceList(metaData.balanceList);
  let data = {};
  data[entityId] = {
    balanceList: metaData.balanceList.filter((b) => b.s >= minSlot && b.s <= maxSlot),
    openSCList: metaData.openSCList.filter((b) => b.slot >= minSlot && b.slot <= maxSlot),
    closedSCList: metaData.closedSCList.filter((b) => b.slot >= minSlot && b.slot <= maxSlot)
  };
  return { metaData: json(data) };
};
const createMetaData = async (entityId, minSlot, maxSlot) => {
  {
    console.log(el(storeId$1), sl("createMetaData"), entityId, minSlot, maxSlot, getDateId(minSlot), getDateId(maxSlot));
  }
  const entityData = getMetaData(entityId);
  const entity = getEntityByName(entityId);
  if (!entity) {
    console.error("Entity not found for meta data creation", entityId);
    return entityData;
  }
  {
    console.log(el(storeId$1), sl("entity"), entity);
  }
  {
    console.log(el(storeId$1), sl("entityData"), entityData);
  }
  let start = (/* @__PURE__ */ new Date()).getTime();
  const _localBalanceMap = /* @__PURE__ */ new Map();
  for (const balance of entityData.balanceList) {
    _localBalanceMap.set(balance.h, balance);
    if (balance.s < minSlot || balance.s > maxSlot) {
      continue;
    }
    clearValueJSON(balance.a);
    balance.f = "0";
    delete balance.a.hasInputs;
    delete balance.a.hashList;
    delete balance.d;
    balance.al = [];
    balance.el = [];
  }
  const _localTxHashMap = getLocalTxHashMap();
  const accountIdList = entity.accountIdList;
  let numAllBalances = 0;
  for (const accountId of accountIdList) {
    const rawData = getRawData(accountId, false);
    const startBalances = (/* @__PURE__ */ new Date()).getTime();
    let numBalances2 = 0;
    for (const accountBalance of rawData.balanceList) {
      if (accountBalance.s < minSlot || accountBalance.s > maxSlot) {
        continue;
      }
      let entityBalance = _localBalanceMap.get(accountBalance.h);
      if (!entityBalance) {
        entityBalance = createIReportMetaBalance(accountBalance, entityId);
        entityBalance.al = [];
        entityBalance.el = [];
        if (accountBalance.i) {
          entityBalance.i = accountBalance.i;
        }
        if (accountBalance.o) {
          entityBalance.o = accountBalance.o;
        }
        entityData.balanceList.push(entityBalance);
        _localBalanceMap.set(accountBalance.h, entityBalance);
      }
      if (accountBalance.i) {
        if (!entityBalance.i) {
          entityBalance.i = accountBalance.i;
        } else {
          for (const input of accountBalance.i) {
            if (!entityBalance.i.some((i) => i.input.transaction_id === input.input.transaction_id && i.input.index === input.input.index)) {
              entityBalance.i.push(input);
            }
          }
        }
      }
      if (accountBalance.o) {
        if (!entityBalance.o) {
          entityBalance.o = accountBalance.o;
        } else {
          for (const output of accountBalance.o) {
            if (!entityBalance.o.some((o) => o.input.transaction_id === output.input.transaction_id && o.input.index === output.input.index)) {
              entityBalance.o.push(output);
            }
          }
        }
      }
      if (accountBalance.a.hasInputs) {
        entityBalance.a.hasInputs = true;
      }
      if (accountBalance.a.hashList) {
        if (!entityBalance.a.hashList) {
          entityBalance.a.hashList = [];
        } else {
          entityBalance.a.hashList = Array.from(new Set(entityBalance.a.hashList));
        }
        for (const h of accountBalance.a.hashList) {
          if (!entityBalance.a.hashList.includes(h)) {
            entityBalance.a.hashList.push(h);
          }
        }
      }
      addValueToValue(entityBalance.a, accountBalance.a);
      entityBalance.f = accountBalance.f;
      if (accountBalance.d) {
        entityBalance.d = add(entityBalance.d ?? "0", accountBalance.d);
      }
      entityBalance.al = getAccountIdsByTxHash(_localTxHashMap, entityBalance.h, true, accountIdList);
      entityBalance.el = getAccountIdsByTxHash(_localTxHashMap, entityBalance.h, false, accountIdList);
      if (accountBalance.ew) {
        for (const stakeAddr in accountBalance.ew) {
          const stakeAppAccount = getIAppAccountByAddress(stakeAddr);
          if (!stakeAppAccount) {
            continue;
          }
          const withdrawalAccountId = stakeAppAccount.id;
          if (accountIdList.includes(withdrawalAccountId)) {
            if (!entityBalance.al.includes(withdrawalAccountId)) {
              entityBalance.al.push(withdrawalAccountId);
            }
            entityBalance.how = true;
            const checkData = getRawData(withdrawalAccountId, false);
            const withdrawalBalance = checkData.balanceList.find((b) => b.h === accountBalance.h);
            if (!withdrawalBalance) {
              const coin = accountBalance.ew[stakeAddr];
              addValueToValue(entityBalance.a, { coin }, true);
            }
          } else {
            entityBalance.hew = true;
            if (!entityBalance.el.includes(withdrawalAccountId)) {
              entityBalance.el.push(withdrawalAccountId);
            }
          }
        }
      }
      if (accountBalance.ow) {
        entityBalance.how = true;
        if (!entityBalance.al.includes(accountId)) {
          entityBalance.al.push(accountId);
        }
      }
      if (accountBalance.t === ITxBalanceType.rewards) {
        entityBalance.t = ITxBalanceType.rewards;
      } else {
        const list = getAccountIdsByTxHash(_localTxHashMap, entityBalance.h, false, accountIdList);
        for (const el2 of list) {
          if (!entityBalance.el.includes(el2)) {
            entityBalance.el.push(el2);
          }
        }
      }
      updateLovelaceLeft(entityBalance);
      numBalances2++;
    }
    if (numBalances2 > 0) {
      console.log("Processed", numBalances2, "balances for", accountId, (/* @__PURE__ */ new Date()).getTime() - startBalances + "ms");
    }
    numAllBalances += numBalances2;
  }
  {
    console.log("Processed all accounts for", entityId, `(balances: ${numAllBalances})`, (/* @__PURE__ */ new Date()).getTime() - start + "ms");
  }
  start = (/* @__PURE__ */ new Date()).getTime();
  sortBalanceList(entityData.balanceList);
  {
    console.log("Sorted", (/* @__PURE__ */ new Date()).getTime() - start + "ms");
  }
  start = (/* @__PURE__ */ new Date()).getTime();
  updateSmartContractList(entityData);
  {
    console.log("Updated smart contract statuses", (/* @__PURE__ */ new Date()).getTime() - start + "ms");
  }
  start = (/* @__PURE__ */ new Date()).getTime();
  let numBalances = 0;
  let startTmp = (/* @__PURE__ */ new Date()).getTime();
  for (const entityBalance of entityData.balanceList) {
    if (entityBalance.s < minSlot || entityBalance.s > maxSlot) {
      continue;
    }
    numBalances++;
    if (numBalances % 1e3 === 0) {
      {
        console.log("Processed", numBalances, "balances", (/* @__PURE__ */ new Date()).getTime() - startTmp + "ms");
      }
      startTmp = (/* @__PURE__ */ new Date()).getTime();
    }
    if (entityBalance.t !== ITxBalanceType.rewards) {
      entityBalance.t = getITxBalanceType(entityBalance.a, entityBalance.f, entityBalance.how ?? false, entityBalance.hew ?? false);
    }
    entityBalance.tf = getTxBalanceTypeFlags(entityBalance.t);
    markBalanceDeposit(entityBalance);
    markBalanceFeeAsTaxRelevant(entityBalance);
    if (entityBalance.tf.iw) {
      markBalanceAsTaxRelevant(entityBalance);
    } else if (entityBalance.tf.rw) {
      markBalanceRewards(entityBalance);
    } else if (entityBalance.i || entityBalance.o) {
      if (!entityBalance.i && !!entityBalance.o) ; else if (entityBalance.i && entityBalance.o) ; else if (!!entityBalance.i && !entityBalance.o) {
        for (const utxo of entityBalance.i) {
          const utxHash = getUtxoHash(utxo.input);
          const scp = getSmartContractProcess(entityData, utxHash, true);
          if (!scp) {
            continue;
          }
          const balanceList = getBalanceListBySCP(entityData, scp);
          if (balanceList.length !== 2) {
            continue;
          }
          const otherBalance = balanceList[0].h === entityBalance.h ? balanceList[1] : balanceList[0];
          const _countMultiAsset = countMultiAsset(entityBalance.a.multiasset);
          const _countMultiAssetOther = countMultiAsset(otherBalance.a.multiasset);
          if (!(_countMultiAsset === 1 && _countMultiAssetOther === 0 || _countMultiAsset === 0 && _countMultiAssetOther === 1 || _countMultiAsset === 0 && _countMultiAssetOther === 0)) {
            continue;
          }
          markBalanceUsingCostBasis(entityBalance, [otherBalance]);
          updateSmartContractList(entityData);
        }
      }
    } else if ((entityBalance.a.hashList?.length ?? 0) > 0) ; else {
      updateLovelaceLeft(entityBalance);
    }
    if (entityBalance.al && entityBalance.al.length === 1 && (!entityBalance.el || entityBalance.el.length === 0)) {
      const accountId = entityBalance.al[0];
      const settings = entity.accountSettings?.[accountId];
      if (settings && !!settings.isGeneralIncome) {
        markBalanceAsTaxRelevant(entityBalance);
      }
    }
  }
  {
    console.warn("Processed", numBalances, "balances", (/* @__PURE__ */ new Date()).getTime() - start + "ms");
  }
  let start2 = (/* @__PURE__ */ new Date()).getTime();
  await doLoadMissingAssetInfo(entityData.balanceList);
  {
    console.log("Loaded missing asset info", entityId, (/* @__PURE__ */ new Date()).getTime() - start2 + "ms");
  }
  {
    console.log("Post-processed all accounts", entityId, (/* @__PURE__ */ new Date()).getTime() - start + "ms");
  }
  return entityData;
};
const selectCBTX = (entityId, balance, txHashList) => {
  if (!balance) {
    return;
  }
  const txHashSet = new Set(txHashList);
  txHashSet.add(balance.h);
  txHashList = Array.from(txHashSet);
  if (txHashList.length < 2) {
    return;
  }
  const entityData = getMetaData(entityId);
  const cbBalanceList = entityData.balanceList.filter((d) => txHashList.includes(d.h));
  if (cbBalanceList.length < 2) {
    return;
  }
  markBalanceUsingCostBasis(balance, cbBalanceList);
  updateSmartContractList(entityData);
};
const getAllSmartContractProcesses = (entityId, balance) => {
  const entityData = getMetaData(entityId);
  return getAllSCPsForBalance(entityData, balance);
};
const getLocalTxHashMap = () => {
  const rawData = getAllRawData();
  const _localTxHashMap = /* @__PURE__ */ new Map();
  const allAccountIds = Object.keys(rawData);
  for (const accountId of allAccountIds) {
    const rawData2 = getRawData(accountId, false);
    const hashSet = /* @__PURE__ */ new Set();
    _localTxHashMap.set(accountId, hashSet);
    for (const balance of rawData2.balanceList) {
      hashSet.add(balance.h);
    }
  }
  return _localTxHashMap;
};

const createIReport = (date, slotStart, slotEnd) => {
  return {
    year: date.year,
    month: date.month,
    day: date.day,
    timezone: date.timezone,
    slotStart,
    slotEnd,
    ledger: [],
    in: [],
    out: [],
    rewards: [],
    total: { coin: "0" }
  };
};
const createIReports = (entityId, tz, unit) => {
  return {
    entityId,
    unit,
    timezone: tz,
    dayList: [],
    monthList: [],
    yearList: [],
    ledgerActive: [],
    ledgerPassive: [],
    ledgerPassThrough: [],
    ledgerTaxFree: [],
    datevRowList: [],
    csvRowList: [],
    taxTxList: []
  };
};
const sortLedger = (ledger, reverse = true) => {
  if (reverse) {
    ledger.sort((a, b) => {
      const tsDiff = b.ts - a.ts;
      if (tsDiff !== 0) {
        return tsDiff;
      }
      return (b.i ?? 0) - (a.i ?? 0);
    });
  } else {
    ledger.sort((a, b) => {
      const tsDiff = a.ts - b.ts;
      if (tsDiff !== 0) {
        return tsDiff;
      }
      return (a.i ?? 0) - (b.i ?? 0);
    });
  }
};
const sortReportList = (list) => {
  list.sort((a, b) => a.slotStart - b.slotStart);
};
const isValidIReports = (reports) => {
  return typeof reports?.entityId == "string" && Array.isArray(reports.dayList) && Array.isArray(reports.monthList) && Array.isArray(reports.yearList) && Array.isArray(reports.ledgerActive) && Array.isArray(reports.ledgerPassive) && Array.isArray(reports.ledgerPassThrough);
};

const powers = [
  1,
  10,
  100,
  1e3,
  1e4,
  1e5,
  1e6,
  1e7,
  1e8,
  1e9,
  1e10,
  1e11,
  1e12,
  1e13,
  1e14,
  1e15,
  1e16,
  1e17,
  1e18,
  1e19,
  1e20,
  1e21,
  1e22
];
const intpow10 = (power) => power < 0 || power > 22 ? Math.pow(10, power) : powers[power];
const isRound = (num, decimalPlaces) => {
  const p = intpow10(decimalPlaces);
  return Math.round(num * p) / p === num;
};
const decimalAdjust = (func, num, decimalPlaces = 0) => {
  if (func !== Math.round && isRound(num, decimalPlaces)) {
    return num;
  }
  const p = intpow10(decimalPlaces);
  const n = num * p * (1 + Number.EPSILON);
  return func(n) / p;
};
const round = (num, decimalPlaces) => decimalAdjust(Math.round, num, decimalPlaces);

const precision = 6;
const getCSVAmountRounded = (amount, p = precision) => round(amount, p);
const getCSVAmount = (amount, p = precision) => {
  const csvAmount = getCSVAmountRounded(amount).toFixed(p).replace(".", ",").replace("-", "");
  const splitAmount = csvAmount.split(",");
  if (!splitAmount[1] || splitAmount[1].length === 0) splitAmount[1] = "00";
  if (splitAmount[1].length === 1) splitAmount[1] += "0";
  return splitAmount.join(",");
};
const getCSVAmount2 = (amount, p = precision) => {
  const csvAmount = getCSVAmountRounded(amount).toFixed(p).replace(".", ",");
  const splitAmount = csvAmount.split(",");
  if (!splitAmount[1] || splitAmount[1].length === 0) splitAmount[1] = "00";
  if (splitAmount[1].length === 1) splitAmount[1] += "0";
  return splitAmount.join(",");
};
const getCSVADAAmount = (amount) => {
  return amount.replace(".", ",");
};

const accountValueMap = {};
const addDatevRow = (row, reports) => {
  if (row) {
    reports.datevRowList.push(row);
  }
};
const getDatevRow = (dateId, amount, info, accountIn, accountOut, preferS = true, commentAddition = "") => {
  let SH = "S";
  if (amount < 0) {
    SH = "H";
    amount = -amount;
  }
  if (preferS && SH === "H") {
    SH = "S";
    let tmp = accountIn;
    accountIn = accountOut;
    accountOut = tmp;
  }
  let _amount = getCSVAmount(amount, 2);
  if (_amount === "0,00") {
    return null;
  }
  const date = dateId.day.toString().padStart(2, "0") + dateId.month.toString().padStart(2, "0");
  const comment = getComment(accountIn, accountOut, SH, commentAddition);
  return {
    a: _amount,
    sh: SH,
    i: accountIn,
    o: accountOut,
    d: date,
    // needs year trimming for file export
    y: dateId.year,
    n: comment,
    info
  };
};
const processDatevRow = (reports, customDatevRows) => {
  reports.datevRowList.reverse();
  const datevRowList = [...reports.datevRowList];
  for (let i = reports.datevRowList.length - 1; i >= 0; i--) {
    const row = reports.datevRowList[i];
    const key = getDatevRowKey(row);
    let rowStr = "";
    if (key in customDatevRows) {
      datevRowList.splice(i, 1);
      const rows = customDatevRows[key];
      let addedAmounts = false;
      for (const _row of rows) {
        datevRowList.splice(i, 0, _row);
        if (!addedAmounts && _row.n?.includes("crt")) {
          addedAmounts = true;
          _row.info = row.info;
        }
        reports.taxTxList.push(`${_row.a.padStart(10, "_")} - ${_row.sh} - ${_row.i} ${_row.o} - ${_row.d} - ${_row.n}`);
        rowStr += reports.taxTxList[reports.taxTxList.length - 1] + "\n";
        updateAccountValueMap(_row);
      }
      delete customDatevRows[key];
    } else {
      const _row = row;
      reports.taxTxList.push(`${_row.a.padStart(10, "_")} - ${_row.sh} - ${_row.i} ${_row.o} - ${_row.d} - ${_row.n}`);
      rowStr += reports.taxTxList[reports.taxTxList.length - 1] + "\n";
      updateAccountValueMap(_row);
    }
  }
  datevRowList.reverse();
  reports.datevRowList.length = 0;
  reports.datevRowList.push(...datevRowList);
  console.log("map", json(accountValueMap));
  console.log("rows", json(customDatevRows));
};
const getDatevRowKey = (row) => `${row.a};${row.sh};${row.i};${row.o};${row.d}`;
const getComment = (accountIn, accountOut, SH, commentAddition = "") => {
  let comment = commentMap[accountIn]?.[accountOut]?.[SH] ?? "Unknown";
  if (comment === "Unknown") {
    console.error("Unknown comment:", accountIn, accountOut, SH);
  } else if (commentAddition) {
    comment = comment.replace("###ADD###", " - " + commentAddition);
  } else {
    comment = comment.replace("###ADD###", "");
  }
  return comment;
};
const clearAccountMap = () => {
  for (const key in accountValueMap) {
    delete accountValueMap[key];
  }
};
const updateAccountValueMap = (row) => {
  const y = row.y;
  const i = row.i;
  const o = row.o;
  const a = Math.abs(parseFloat(row.a.replace(",", ".")));
  if (!(y in accountValueMap)) {
    accountValueMap[y] = {};
  }
  const my = accountValueMap[y];
  if (!(i in my)) {
    my[i] = [];
  }
  if (!(o in my)) {
    my[o] = [];
  }
  if (!my[i][0]) {
    my[i][0] = 0;
  }
  if (!my[i][1]) {
    my[i][1] = 0;
  }
  if (!my[i][2]) {
    my[i][2] = 0;
  }
  if (!my[o][0]) {
    my[o][0] = 0;
  }
  if (!my[o][1]) {
    my[o][1] = 0;
  }
  if (!my[o][2]) {
    my[o][2] = 0;
  }
  if (row.sh === "S") {
    my[i][0] += a;
    my[o][1] += a;
  } else {
    my[i][1] += a;
    my[o][0] += a;
  }
  my[i][0] = Math.round(my[i][0] * 1e4) / 1e4;
  my[i][1] = Math.round(my[i][1] * 1e4) / 1e4;
  my[o][0] = Math.round(my[o][0] * 1e4) / 1e4;
  my[o][1] = Math.round(my[o][1] * 1e4) / 1e4;
  my[i][2] = Math.round((my[i][0] - my[i][1]) * 1e4) / 1e4;
  my[o][2] = Math.round((my[o][0] - my[o][1]) * 1e4) / 1e4;
};
const commentMap = {
  "31": {
    "1210": {
      "S": "Kauf ADA (passiv)",
      "H": "Verkauf ADA (passiv)"
    },
    "2760": {
      "S": "Eingang ADA (passiv)",
      "H": "Abgang ADA (passiv)"
    }
  },
  "34": {
    "31": {
      "S": "Swap ADA -> Token (passiv)",
      "H": "Swap Token -> ADA (passiv)"
    },
    "1509": {
      "S": "Swap ADA -> Token (aktiv)",
      "H": "Swap Token -> ADA (aktiv)"
    },
    // '1591': {
    //
    //   'S':                    'Eingang Token (durchlaufend)',
    //   'H':                    'Abgang Token (durchlaufend)'
    // },
    "2760": {
      "S": "Eingang Token",
      "H": "Abgang Token"
    }
  },
  "1210": {
    "31": {
      "S": "Verkauf ADA (passiv)",
      "H": "Kauf ADA (passiv)"
    },
    "1509": {
      "S": "Verkauf ADA (aktiv)",
      "H": "Kauf ADA (aktiv)"
    }
  },
  "1509": {
    // '1591': {
    //
    //   'S':                    'Eingang ADA (durchlaufend)',
    //   'H':                    'Abgang ADA (durchlaufend)',
    // },
    //
    // '1210': {
    //
    //   'S':                    'Kauf ADA (aktiv)',
    //   'H':                    'Verkauf ADA (aktiv)'
    // },
    "2760": {
      "S": "Eingang ADA (aktiv)###ADD###",
      "H": "Abgang ADA (aktiv)"
    }
  },
  "1591": {
    "34": {
      "S": "Abgang Token (durchlaufend)",
      "H": "Eingang Token (durchlaufend)"
    },
    "1509": {
      "S": "Abgang ADA (durchlaufend)",
      "H": "Eingang ADA (durchlaufend)"
    }
  },
  "2760": {
    "1509": {
      "H": "Gewinn###ADD###",
      "S": "Verlust###ADD###"
    },
    "31": {
      "H": "Gewinn###ADD###",
      "S": "Verlust###ADD###"
    },
    "34": {
      "H": "Gewinn###ADD###",
      "S": "Verlust###ADD###"
    }
  }
};

const addCSVRow = (row, reports) => {
  if (row) {
    reports.csvRowList.push(row);
  }
  return row;
};
const getCSVRow = (cb, timezone, amount, info, txType) => {
  if (info) {
    if (cb.id) {
      info.ref = cb.id;
    } else if (cb.l) {
      info.ref = cb.l;
    }
  }
  return _getCSVRow(cb.ts, timezone, amount, info, txType);
};
const _getCSVRow = (ts, timezone, amount, info, txType) => {
  let _amount = getCSVAmount2(amount, 5);
  let _date = new Date(ts);
  _date = changeTimezone(_date, timezone);
  const dateId = {
    year: _date.getFullYear(),
    month: _date.getMonth() + 1,
    day: _date.getDate()};
  const date = dateId.year.toString().padStart(4, "0") + "-" + dateId.month.toString().padStart(2, "0") + "-" + dateId.day.toString().padStart(2, "0");
  let isNeg = false;
  if (info && info.lv) {
    isNeg = isLessThanZero(info.lv);
  } else {
    isNeg = amount < 0;
  }
  const row = {
    a: _amount,
    d: date,
    y: dateId.year,
    t: txType,
    n: getCSVRowType(txType, isNeg),
    info
  };
  return row;
};
const getCSVRowType = (txType, isNeg) => {
  switch (txType) {
    case "i":
      return isNeg ? "outflow" : "income";
    case "r":
      return "rewards";
    case "f":
      return "transaction fees";
    case "d":
      return "deposit";
    case "b":
      return isNeg ? "sell" : "buy";
    case "n":
      return "neutral";
    case "p":
      return "pass-through";
    case "c":
      return "cost basis";
    case "gl":
      return isNeg ? "loss" : "gain";
    case "sw":
      return "swap";
    case "ti":
      return "token in";
    case "to":
      return "token out";
    default:
      return "unknown";
  }
};
const convertCSV = (content, timezone) => {
  if (timezone.startsWith("Europe/Berlin")) {
    return content;
  }
  const lineList = content.split(/\r?\n/);
  lineList.forEach((line, index) => {
    const cellList = line.split(";");
    const convertedCells = cellList.map((cell) => {
      const trimmed = cell.trim();
      if (/^-?\d+,\d+$/.test(trimmed)) {
        return trimmed.replace(",", ".");
      }
      return cell;
    });
    lineList[index] = convertedCells.join(",");
  });
  return lineList.join("\n");
};

const removeAda = (_out, report, reports, hasPassive) => {
  if (_out.au) {
    console.error("removeAda: _out.au:", json(_out));
  }
  let addedRow = false;
  let amount = 0;
  let gl = 0;
  let info;
  const {
    taxFreeList,
    activeList,
    passiveList
  } = calcLedgerOut(_out, report, reports, hasPassive);
  if (activeList && activeList.length > 0) {
    for (const active of activeList) {
      amount = active.fv ?? 0;
      info = { fu: active.fu, lv: active.av, pd: _out.pd ?? 0 };
      addDatevRow(getDatevRow(report, amount, info, "1509", "2760", false), reports);
      addCSVRow(getCSVRow(_out, report.timezone, amount, info, _out.t), reports);
      amount = active.gl ?? 0;
      addDatevRow(getDatevRow(report, amount, void 0, "2760", "1509", false, "Abgang ADA (aktiv)"), reports);
      addCSVRow(getCSVRow(_out, report.timezone, amount, void 0, "gl"), reports);
      gl -= amount;
    }
    addedRow = true;
  }
  if (passiveList && passiveList.length > 0) {
    for (const passive of passiveList) {
      amount = passive.fv ?? 0;
      info = { fu: passive.fu, lv: passive.av, pd: _out.pd ?? 0 };
      addDatevRow(getDatevRow(report, amount, info, "31", "2760", false), reports);
      addCSVRow(getCSVRow(_out, report.timezone, amount, info, _out.t), reports);
      amount = passive.gl ?? 0;
      addDatevRow(getDatevRow(report, amount, void 0, "2760", "31", false, "Abgang ADA (passiv)"), reports);
      addCSVRow(getCSVRow(_out, report.timezone, amount, void 0, "gl"), reports);
      gl -= amount;
    }
    addedRow = true;
  }
  if (taxFreeList && taxFreeList.length > 0) {
    for (const taxFree of taxFreeList) {
      amount = taxFree.fv ?? 0;
      info = { fu: taxFree.fu, lv: taxFree.av, pd: _out.pd ?? 0 };
      addCSVRow(getCSVRow(_out, report.timezone, amount, info, _out.t), reports);
    }
    addedRow = true;
  }
  _out.gl = gl;
  if (!addedRow) {
    console.error("No row added for removeAda:", json(_out));
  }
};
const soldAda = (_out, report, reports, hasPassive) => {
  if (_out.au) {
    console.error("soldAda: _out.au:", json(_out));
  }
  let addedRow = false;
  let amount = 0;
  let info;
  const {
    taxFreeList,
    activeList,
    passiveList
  } = calcLedgerOut(_out, report, reports, hasPassive);
  let gl = 0;
  if (activeList && activeList.length > 0) {
    for (const active of activeList) {
      amount = (active.fv ?? 0) * -1;
      info = { fu: active.fu, lv: active.av, pd: _out.pd ?? 0 };
      addDatevRow(getDatevRow(report, amount, info, "1210", "1509", false), reports);
      addCSVRow(getCSVRow(_out, report.timezone, amount, info, _out.t), reports);
      amount = active.gl ?? 0;
      addDatevRow(getDatevRow(report, amount, void 0, "2760", "1509", false, "Verkauf ADA (aktiv)"), reports);
      addCSVRow(getCSVRow(_out, report.timezone, amount, void 0, "gl"), reports);
      gl -= amount;
    }
    addedRow = true;
  }
  if (passiveList && passiveList.length > 0) {
    for (const passive of passiveList) {
      amount = (passive.fv ?? 0) * -1;
      info = { fu: passive.fu, lv: passive.av, pd: _out.pd ?? 0 };
      addDatevRow(getDatevRow(report, amount, info, "1210", "31", false), reports);
      addCSVRow(getCSVRow(_out, report.timezone, amount, info, _out.t), reports);
      amount = passive.gl ?? 0;
      addDatevRow(getDatevRow(report, amount, void 0, "2760", "31", false, "Verkauf ADA (passiv)"), reports);
      addCSVRow(getCSVRow(_out, report.timezone, amount, void 0, "gl"), reports);
      gl -= amount;
    }
    addedRow = true;
  }
  if (taxFreeList && taxFreeList.length > 0) {
    for (const taxFree of taxFreeList) {
      amount = (taxFree.fv ?? 0) * -1;
      info = { fu: taxFree.fu, lv: taxFree.av, pd: _out.pd ?? 0 };
      addCSVRow(getCSVRow(_out, report.timezone, amount, info, _out.t), reports);
    }
    addedRow = true;
  }
  _out.gl = gl;
  if (!addedRow) {
    console.error("No row added for soldAda:", json(_out));
  }
};
const removeToken = (_out, report, reports, hasPassive) => {
  if (!_out.au) {
    console.error("removeToken: _out.au:", json(_out));
  }
  let addedRow = false;
  let amount = 0;
  let info;
  const {
    taxFreeList,
    activeList,
    passiveList,
    processedCB
  } = calcLedgerOut(_out, report, reports, hasPassive);
  if (activeList && activeList.length > 0) {
    for (const active of activeList) {
      amount = active.gl ?? 0;
      info = { fu: active.fu, av: active.av, au: active.au, pd: _out.pd ?? 0 };
      addDatevRow(getDatevRow(report, amount, info, "34", "2760", false), reports);
      addCSVRow(getCSVRow(_out, report.timezone, amount, info, "to"), reports);
      addedRow = true;
    }
  }
  if (passiveList && passiveList.length > 0) {
    for (const passive of passiveList) {
      if (_out.lv && !isZero(_out.lv)) {
        console.warn("removeToken: passive:", json(passive));
      }
      amount = passive.gl ?? 0;
      addedRow = true;
    }
  }
  let processedCBLabel = void 0;
  if (taxFreeList && taxFreeList.length > 0) {
    const outLabel = _out.l;
    _out.l = "tax-free";
    for (const taxFree of taxFreeList) {
      taxFree.gl = 0;
      amount = taxFree.gl ?? 0;
      info = { fu: taxFree.fu, av: taxFree.av, au: taxFree.au, pd: _out.pd ?? 0 };
      addCSVRow(getCSVRow(_out, report.timezone, amount, info, "to"), reports);
    }
    _out.l = outLabel;
    addedRow = true;
    processedCBLabel = processedCB.l;
    processedCB.gl = 0;
    processedCB.l = "tax-free";
  }
  if (processedCB && isGreaterThanZero(processedCB.lv ?? 0)) {
    amount = processedCB.gl ?? 0;
    info = { fu: processedCB.fu, lv: processedCB.lv, av: processedCB.av, au: processedCB.au, pd: processedCB.pd ?? 0 };
    addDatevRow(getDatevRow(report, amount, info, "34", "2760", false), reports);
    addCSVRow(getCSVRow(processedCB, report.timezone, amount, info, "to"), reports);
    addedRow = true;
  }
  processedCB.l = processedCBLabel;
  if (!addedRow) {
    console.error("No row added for removeToken:", json(_out));
    console.error("No row added for removeToken:", activeList, passiveList, taxFreeList);
  }
  return processedCB;
};
const swapADAToToken = (_in, report, reports, hasPassive) => {
  if (typeof _in.lv !== "string" || isZero(_in.lv)) {
    return false;
  }
  let addedRow = false;
  let amount = 0;
  let gl = 0;
  let info;
  const cbGL = cloneIReportCostBasis(_in);
  cbGL.av = _in.lv;
  delete cbGL.au;
  delete cbGL.lv;
  if (doReportLogging()) {
    console.log("_in cbGL", json(cbGL));
  }
  const {
    taxFreeList,
    activeList,
    passiveList
  } = calcLedgerOut(cbGL, report, reports, hasPassive);
  if (activeList && activeList.length > 0) {
    for (const active of activeList) {
      amount = (active.fv ?? 0) * -1;
      info = { fu: _in.fu, lv: _in.lv, av: _in.av, au: _in.au, pd: _in.pd ?? 0 };
      addDatevRow(getDatevRow(report, amount, info, "34", "1509", false, "aktiv"), reports);
      addCSVRow(getCSVRow(_in, report.timezone, amount, info, "sw"), reports);
      amount = active.gl ?? 0;
      addDatevRow(getDatevRow(report, amount, void 0, "2760", "1509", false, "Swap ADA -> Token (aktiv)"), reports);
      addCSVRow(getCSVRow(_in, report.timezone, amount, void 0, "gl"), reports);
      gl -= amount;
    }
    addedRow = true;
  }
  if (passiveList && passiveList.length > 0) {
    for (const passive of passiveList) {
      info = !addedRow ? { fu: _in.fu, lv: _in.lv, av: _in.av, au: _in.au, pd: _in.pd ?? 0 } : void 0;
      amount = passive.fv ?? 0;
      addDatevRow(getDatevRow(report, amount, info, "34", "31", false, "passiv"), reports);
      addCSVRow(getCSVRow(_in, report.timezone, amount, info, "sw"), reports);
      amount = passive.gl ?? 0;
      addDatevRow(getDatevRow(report, amount, void 0, "2760", "31", false, "Swap ADA -> Token (passiv)"), reports);
      addCSVRow(getCSVRow(_in, report.timezone, amount, void 0, "gl"), reports);
      gl -= amount;
    }
    addedRow = true;
  }
  if (taxFreeList && taxFreeList.length > 0) {
    info = !addedRow ? { fu: _in.fu, lv: _in.lv, av: _in.av, au: _in.au, pd: _in.pd ?? 0 } : void 0;
    amount = _in.fv ?? 0;
    const row = getCSVRow(_in, report.timezone, amount, info, "sw");
    addCSVRow(row, reports);
    addedRow = true;
  }
  _in.gl = gl;
  return addedRow;
};
const handlePassThrough = (_cb, report, reports) => {
  let fromType = "1591";
  let toType = "1509";
  let info;
  let removedList = calcLedgerPassThrough(_cb, report, reports);
  if (removedList.length === 0) {
    removedList.push(_cb);
  }
  for (const cb of removedList) {
    let amount = cb.fv ?? 0;
    if (typeof cb.au === "string") {
      info = { fu: cb.fu, av: cb.av, au: cb.au, pd: cb.pd ?? 0 };
      toType = "34";
    } else {
      info = { fu: cb.fu, lv: cb.av, pd: cb.pd ?? 0 };
    }
    addDatevRow(getDatevRow(report, amount, info, fromType, toType, false, cb.t), reports);
    addCSVRow(getCSVRow(_cb, report.timezone, amount, info, cb.t), reports);
  }
  return true;
};

const _logToken = "";
const doReportLogging = (cb) => {
  return false;
};
const calcLedgerPassThrough = (_cb, report, reports) => {
  if (_cb.t !== "p") {
    console.error("calcLedgerPassThrough: _cb.t !== p", json(_cb));
  }
  addPriceOfDay(_cb, report);
  return addOrRemovePassThrough(_cb, reports.ledgerPassThrough);
};
const calcLedgerOut = (_out, report, reports, hasPassive) => {
  addPriceOfDay(_out, report);
  const av = _out.av ?? 0;
  if (isGreaterThanZero(av)) {
    console.error("av > 0 out", json(_out));
  }
  const copy = cloneIReportCostBasis(_out);
  let removedTaxFree;
  let removedActive;
  let removedPassive;
  if (_out.t === "p") {
    console.error("calcLedgerOut MUST NOT HAPPEN ! p:", json(_out));
  } else {
    let ledgerList = getLedgerList(reports, false, true);
    removedTaxFree = removeFromLedger(copy, ledgerList);
    if (!isZero(copy.av)) {
      ledgerList = getLedgerList(reports, false, false);
      removedActive = removeFromLedger(copy, ledgerList);
    }
    if (hasPassive && !isZero(copy.av)) {
      ledgerList = getLedgerList(reports, true, false);
      removedPassive = removeFromLedger(copy, ledgerList);
    }
  }
  if (!isZero(copy.av)) {
    console.error("Not all assets were removed:", json(copy), json(reports));
    throw new Error("Not all assets were removed");
  }
  return {
    taxFreeList: removedTaxFree,
    activeList: removedActive,
    passiveList: removedPassive,
    processedCB: copy
  };
};
const handleCalcLedgerIn = (_in, report, reports, hasPassive) => {
  if (_in.t === "d") {
    return;
  }
  if (_in.t === "c") {
    return;
  }
  addPriceOfDay(_in, report);
  let fv = _in.fv ?? 0;
  let info;
  if (fv < 0 && !_in.au) {
    console.error("fv < 0 in", json(_in));
  }
  _in.gl = 0;
  if (_in.t === "b") {
    if (typeof _in.au === "undefined") {
      info = { fu: _in.fu, lv: _in.av, pd: _in.pd ?? 0 };
      addDatevRow(getDatevRow(report, _in.fv ?? 0, info, "31", "1210", false, _in.t), reports);
      addCSVRow(getCSVRow(_in, report.timezone, _in.fv ?? 0, info, _in.t), reports);
    } else {
      console.error("No row added for token purchase:", json(_in));
    }
  } else if (_in.t === "p") {
    handlePassThrough(_in, report, reports);
  } else if (_in.t === "r") {
    if (typeof _in.au === "undefined") {
      info = { fu: _in.fu, lv: _in.av, pd: _in.pd ?? 0 };
      addDatevRow(getDatevRow(report, _in.fv ?? 0, info, "1509", "2760", true, _in.t), reports);
      addCSVRow(getCSVRow(_in, report.timezone, _in.fv ?? 0, info, _in.t), reports);
    } else {
      console.error("No row added for token rewards:", json(_in));
    }
  } else if (_in.t === "n") {
    if (typeof _in.au === "undefined") {
      info = { fu: _in.fu, lv: _in.av, pd: _in.pd ?? 0 };
      addDatevRow(getDatevRow(report, _in.fv ?? 0, info, "1509", "2760", false, _in.t), reports);
      addCSVRow(getCSVRow(_in, report.timezone, _in.fv ?? 0, info, _in.t), reports);
    }
  } else if (_in.t === "i") {
    if (typeof _in.au === "undefined") {
      info = { fu: _in.fu, lv: _in.av, pd: _in.pd ?? 0 };
      addDatevRow(getDatevRow(report, _in.fv ?? 0, info, "1509", "2760", false, _in.t), reports);
      addCSVRow(getCSVRow(_in, report.timezone, _in.fv ?? 0, info, _in.t), reports);
    } else {
      if (doReportLogging()) {
        console.warn("handleCalcLedgerIn i: before: swapADAToToken:", json(_in));
      }
      let addedRow = swapADAToToken(_in, report, reports, hasPassive);
      if (doReportLogging()) {
        console.warn("handleCalcLedgerIn i: before: addedRow:", addedRow);
      }
      if (!addedRow) {
        fv = _in.fv ?? 0;
        if (fv !== 0) {
          console.error("No row added for token income:", new Date(_in.ts), json(_in));
        } else {
          info = { av: _in.av, au: _in.au };
          addCSVRow(getCSVRow(_in, report.timezone, 0, info, "ti"), reports);
        }
      }
    }
  }
  if (_in.t === "p") ; else {
    addToLedger(_in, getLedgerList(reports, hasPassive && _in.t === "b", false));
  }
};
const handleCalcLedgerOut = (_out, report, reports, hasPassive) => {
  if (_out.t === "d") {
    return;
  }
  if (_out.t === "c") {
    return;
  }
  addPriceOfDay(_out, report);
  const fv = _out.fv ?? 0;
  if (fv > 0 && !_out.au) {
    console.error("fv > 0 out", json(_out));
  }
  _out.gl = 0;
  if (_out.t === "b") {
    let addedRow = false;
    if (typeof _out.au === "undefined") {
      soldAda(_out, report, reports, hasPassive);
      addedRow = true;
    }
    if (!addedRow) {
      console.error("No row added for b:", json(_out));
    }
  } else if (_out.t === "p") {
    handlePassThrough(_out, report, reports);
  } else if (_out.t === "f") {
    let addedRow = false;
    if (typeof _out.au === "undefined") {
      removeAda(_out, report, reports, hasPassive);
      addedRow = true;
    }
    if (!addedRow) {
      console.error("No row added for f:", json(_out));
    }
  } else if (_out.t === "i") {
    let addedRow = false;
    if (typeof _out.au === "undefined") {
      removeAda(_out, report, reports, hasPassive);
      addedRow = true;
    } else {
      const cbLedgerIn = removeToken(_out, report, reports, hasPassive);
      if (cbLedgerIn && isGreaterThanZero(cbLedgerIn.lv ?? "0")) {
        const _in = createIReportCostBasisAda(cbLedgerIn.lv ?? "0", "i", cbLedgerIn.ts);
        addToLedger(_in, getLedgerList(reports, hasPassive && _in.t === "b", false));
      }
      addedRow = true;
    }
    if (!addedRow) {
      console.error("No row added for i:", json(_out));
    }
  } else if (_out.t === "n") {
    let addedRow = false;
    if (typeof _out.au === "undefined") {
      removeAda(_out, report, reports, hasPassive);
      addedRow = true;
    } else {
      removeToken(_out, report, reports, hasPassive);
      addedRow = true;
    }
    if (!addedRow) {
      console.error("No row added for i:", json(_out));
    }
  } else {
    console.error("?", json(_out), json(report));
  }
};
const moveToTaxFree = (report, reports, hasPassive, has1YearTaxFree) => {
  if (!has1YearTaxFree) {
    return;
  }
  const startTs = getTimestampFromSlot("mainnet", report.slotStart);
  const diffTs = startTs - 1e3 * 60 * 60 * 24 * 365;
  for (let i = reports.ledgerActive.length - 1; i >= 0; i--) {
    const cb = reports.ledgerActive[i];
    if (cb.ts < diffTs) {
      reports.ledgerActive.splice(i, 1);
      reports.ledgerTaxFree.push(cb);
    }
  }
  if (hasPassive) {
    for (let i = reports.ledgerPassive.length - 1; i >= 0; i--) {
      const cb = reports.ledgerPassive[i];
      if (cb.ts < startTs - diffTs) {
        reports.ledgerPassive.splice(i, 1);
        reports.ledgerTaxFree.push(cb);
      }
    }
  }
};
const getLedgerList = (reports, getPassive, getTaxFree) => {
  let ledger = reports.ledgerActive;
  if (getTaxFree) {
    ledger = reports.ledgerTaxFree;
  }
  if (getPassive) {
    ledger = reports.ledgerPassive;
  }
  return ledger;
};
const addToLedger = (cb, ledger) => {
  if (cb.t === "d") {
    return;
  }
  if (cb.t === "c") {
    return;
  }
  const _cb = cloneIReportCostBasis(cb);
  _cb.i = ledger.length > 0 ? (ledger[ledger.length - 1].i ?? 0) + 1 : 0;
  ledger.push(_cb);
  return _cb;
};
const removeFromLedger = (cb, ledger, onlyAllowOpposite = false) => {
  if (cb.t === "d") {
    return [];
  }
  if (cb.t === "c") {
    return [];
  }
  const doLog = doReportLogging();
  sortLedger(ledger);
  const removedList = [];
  const cbAv = cb.av;
  let isPositiveValue = isGreaterThanZero(cb.av);
  if (!onlyAllowOpposite) {
    if (isPositiveValue) {
      console.error("removeFromLedger: cb.av must be negative when onlyAllowOpposite is false", json(cb));
    }
  }
  if (doLog && !_logToken) {
    console.warn("removeFromLedger IN:", json(ledger));
  } else if (doLog) {
    console.warn("removeFromLedger IN:", json(ledger.filter((l) => l.au === _logToken)));
  }
  for (let i = ledger.length - 1; i >= 0; i--) {
    const entry = ledger[i];
    if (entry.au !== cb.au) {
      continue;
    }
    if (cb.t === "p" && entry.t !== "p") {
      continue;
    }
    let entryIsNeg = isLessThanZero(entry.av);
    let entryIsPos = isGreaterThanZero(entry.av);
    if (onlyAllowOpposite) {
      if (isPositiveValue && entryIsPos) {
        continue;
      }
      if (!isPositiveValue && entryIsNeg) {
        continue;
      }
    }
    if (doLog) {
      console.warn("removeFromLedger  cb", json(cb));
      console.warn("removeFromLedger ent", json(entry));
      console.warn("removeFromLedger pos", isPositiveValue, entryIsPos);
      console.warn("removeFromLedger neg", !isPositiveValue, entryIsNeg);
    }
    const entryCopy = cloneIReportCostBasis(entry);
    if (doLog) {
      console.warn("removeFromLedger modified 1", json(entry));
    }
    entry.av = add(entry.av, cb.av);
    calcFiatValue(entry);
    if (doLog) {
      console.warn("removeFromLedger modified 2", json(entry));
    }
    entryIsNeg = isLessThanZero(entry.av);
    entryIsPos = isGreaterThanZero(entry.av);
    let didAbsorbValue = false;
    if (!onlyAllowOpposite) {
      didAbsorbValue = entryIsPos;
    } else {
      if (!isPositiveValue && entryIsPos) {
        didAbsorbValue = true;
      } else if (isPositiveValue && entryIsNeg) {
        didAbsorbValue = true;
      }
    }
    if (onlyAllowOpposite && doLog) {
      console.warn("removeFromLedger oap", onlyAllowOpposite);
      console.warn("removeFromLedger abs", didAbsorbValue);
      console.warn("removeFromLedger cop", json(entry));
    }
    if (didAbsorbValue) {
      if (entry.au && !isZero(entryCopy.av) && entryCopy.fv && entry.fv) {
        if (doLog) {
          console.warn("didAbsorbValue entry >", json(entry));
        }
        if (doLog) {
          console.warn("didAbsorbValue copy  >", json(entryCopy));
        }
        const fac = bigToNum(divide(entry.av, entryCopy.av));
        entryCopy.fv = entryCopy.fv * (1 - fac);
        entryCopy.lv = multiply(entryCopy.lv ?? "0", 1 - fac, 0);
        entry.fv = entry.fv * fac;
        entry.lv = multiply(entry.lv ?? "0", fac, 0);
        if (doLog) {
          console.warn("didAbsorbValue entry <", json(entry));
        }
        if (doLog) {
          console.warn("didAbsorbValue copy  <", json(entryCopy));
        }
      }
      entryCopy.av = cb.av;
      calcFiatValue(entryCopy);
      if (doLog) {
        console.warn("didAbsorbValue copy =", json(entryCopy));
      }
      cb.av = "0";
      removedList.push(entryCopy);
      break;
    } else if (isZero(entry.av)) {
      entryCopy.av = cb.av;
      calcFiatValue(entryCopy);
      if (doLog) {
        console.warn("isZero copy =", json(entryCopy));
      }
      cb.av = "0";
      removedList.push(entryCopy);
      ledger.splice(i, 1);
      break;
    } else {
      entryCopy.av = neg(entryCopy.av);
      calcFiatValue(entryCopy);
      if (doLog) {
        console.warn("consumed copy =", json(entryCopy));
      }
      removedList.push(entryCopy);
      ledger.splice(i, 1);
      cb.av = entry.av;
    }
  }
  if (doLog) {
    console.warn("removedList =", json(removedList));
  }
  if (removedList.length > 0) {
    if (doLog) {
      console.warn(">>> cb", json(cb));
      console.log(
        el("cbAv:", 8),
        el(cbAv, 15),
        el("cb.av:", 8),
        el(cb.av, 15),
        el("cb.fv:", 8),
        el(cb.fv?.toFixed(6) ?? "", 15)
      );
    }
    const totalFV = cb.fv ?? 0;
    const remainingFac = bigToNum(divide(cb.av, cbAv));
    const remainingFv = remainingFac * totalFV;
    const spentFv = totalFV - remainingFv;
    if (doLog) {
      console.log(
        el("remainingFac:", 15),
        el(remainingFac.toFixed(6), 15),
        el("remainingFv:", 15),
        el(remainingFv.toFixed(6), 15),
        el("totalFV:", 15),
        el(totalFV.toFixed(6), 15),
        el("spentFv:", 15),
        el(spentFv.toFixed(6), 15)
      );
    }
    cb.fv = remainingFv;
    for (const removed of removedList) {
      if (removed.au && removed.fv) ;
      removed.fv = removed.fv ?? 0;
      removed.gl = removed.fv;
      removed.fv = 0;
    }
  }
  if (!!cb.au && cb.t === "i") {
    if (isZero(cb.av) && isGreaterThanZero(cb.lv ?? "0")) {
      if (doLog) {
        console.warn("######## removeFromLedger: DONE WITH CB", json(cb));
      }
      calcFiatValue(cb);
      if (cb.fv && isGreaterThanZero(cb.fv)) {
        cb.gl = cb.fv;
        cb.fv = 0;
      }
    }
  }
  if (doLog) {
    console.warn("removedList ===", json(removedList));
  }
  ledger.reverse();
  return removedList;
};
const addOrRemovePassThrough = (cb, ledger) => {
  if (cb.t !== "p") {
    return [];
  }
  const doLog = doReportLogging();
  if (doLog) {
    console.warn("addOrRemovePassThrough ledger IN", json(ledger.filter((l) => true)));
  }
  if (!cb.id) {
    addToLedger(cloneIReportCostBasis(cb), ledger);
    if (doLog) {
      console.warn("addOrRemovePassThrough >>> ADDED cb: ", new Date(cb.ts), json(cb));
    }
    return [];
  }
  sortLedger(ledger);
  let removedList = [];
  let total = cb.av;
  for (let i = ledger.length - 1; i >= 0; i--) {
    const entry = ledger[i];
    if (entry.au !== cb.au) {
      continue;
    }
    if (entry.id !== cb.id) {
      continue;
    }
    total = add(total, entry.av);
  }
  if (isZero(total)) {
    for (let i = ledger.length - 1; i >= 0; i--) {
      const entry = ledger[i];
      if (entry.au !== cb.au) {
        continue;
      }
      if (entry.id !== cb.id) {
        continue;
      }
      const removed = cloneIReportCostBasis(entry);
      removed.av = neg(removed.av);
      calcFiatValue(removed);
      removedList.push(removed);
      if (removedList.length > 0 && doLog) {
        console.warn("addOrRemovePassThrough >>> ID removed: ", new Date(cb.ts), json(removedList), "cb", json(cb));
      }
      ledger.splice(i, 1);
    }
  }
  {
    ledger.reverse();
  }
  if (removedList.length === 0) {
    addToLedger(cloneIReportCostBasis(cb), ledger);
    if (doLog) {
      console.warn("addOrRemovePassThrough >>> ADDED: ", new Date(cb.ts), json(cb));
    }
  }
  if (doLog) {
    console.warn("addOrRemovePassThrough ledger OUT", json(ledger.filter((l) => true)));
  }
  return removedList;
};

const addToFiatValue = (_cb, cb) => {
  if (_cb.lv || cb.lv) {
    _cb.lv = add(_cb.lv ?? "0", cb.lv ?? "0");
  }
  if (cb.fv) {
    _cb.fv = (_cb.fv ?? 0) + cb.fv;
  }
  if (!_cb.gl) {
    _cb.gl = 0;
  }
  _cb.gl += cb.gl ?? 0;
};
const summarizeInLedger = (ledger, cb, isDay = true) => {
  sortLedger(ledger, true);
  const _cb = cloneIReportCostBasis(cb);
  if (isDay && cb.t !== "p" && doReportLogging()) {
    console.log("... SUM in :", new Date(cb.ts), json(cb));
  }
  for (let i = ledger.length - 1; i >= 0; i--) {
    const entry = ledger[i];
    if (entry.t === "p") {
      continue;
    }
    if (entry.l) {
      continue;
    }
    if (entry.id) {
      continue;
    }
    if (entry.t === "b") {
      continue;
    }
    if (entry.t === _cb.t && entry.au === _cb.au) {
      if (cb.t === "i" && cb.au && cb.lv && entry.lv && (cb.lv === "0" && entry.lv !== "0" || cb.lv !== "0" && entry.lv === "0")) {
        continue;
      }
      if (isDay && doReportLogging()) {
        console.log("... SUM en >", json(entry));
      }
      const entryAv = entry.av;
      entry.av = add(entryAv, _cb.av);
      if (isZero(entry.av)) {
        ledger.splice(i, 1);
      } else {
        const entryFv = entry.fv ?? 0;
        const entryPd = entry.pd ?? 0;
        const cbFv = _cb.fv ?? 0;
        const cbPd = _cb.pd ?? 0;
        addToFiatValue(entry, _cb);
        if (!entry.au) {
          if (entryPd !== cbPd) {
            if (entry.av && entry.fv) {
              entry.pd = parseFloat(divide(entry.fv, divide(entry.av, "1000000")));
            }
          }
        } else {
          const fvFac = cbFv / entryFv;
          if (isDay && doReportLogging()) {
            console.log(
              el("cbFv:", 8),
              el(cbFv.toFixed(6), 15),
              el("cbPd:", 8),
              el(cbPd?.toFixed(6), 15),
              el("entryFv:", 8),
              el(entryFv.toFixed(6), 15),
              el("entryPd:", 8),
              el(entryPd?.toFixed(6), 15),
              el("fvFac:", 8),
              el(fvFac.toFixed(6), 15),
              el("cbPd * fvFac:", 15),
              el((cbPd * fvFac).toFixed(6), 15),
              el("(1 - fvFac):", 15),
              el((1 - fvFac).toFixed(6), 15),
              el("entryPd * (1 - fvFac):", 25),
              el((entryPd * (1 - fvFac)).toFixed(6), 15)
            );
          }
          if (fvFac >= 0 && fvFac <= 1) {
            entry.pd = entryPd * (1 - fvFac) + cbPd * fvFac;
          }
        }
      }
      if (isDay && doReportLogging()) {
        console.log("... SUM en <", json(entry));
      }
      ledger.reverse();
      return true;
    }
  }
  ledger.reverse();
  _cb.i = ledger.length;
  if (!isDay) {
    delete _cb.pd;
  }
  ledger.push(_cb);
};
const fillReports = (networkId, reports, balanceList, minSlot, maxSlot) => {
  for (const balance of balanceList) {
    if (balance.s < minSlot || balance.s >= maxSlot) {
      continue;
    }
    if (isZeroValue(balance.a)) {
      continue;
    }
    if (balance.cb.length === 0 || hasLeftOverValue(balance)) {
      console.error("Missing cost-basis in balanceList: ", json(balance));
      break;
    }
    const dateId = getDateIdFromSlot(networkId, balance.s, reports.timezone);
    const report = getReportFromDateId(networkId, reports.dayList, dateId);
    sortLedger(balance.cb, false);
    for (const cb of balance.cb) {
      addPriceOfDay(cb, report);
      if (doReportLogging()) {
        console.warn("fillReports", cb);
      }
      if (isZero(cb.av)) {
        console.error("fillReports: zero av in cb", json(cb));
        continue;
      }
      if (isGreaterThanZero(cb.av)) {
        summarizeInLedger(report.in, cb, true);
      } else if (isLessThanZero(cb.av)) {
        summarizeInLedger(report.out, cb, true);
      }
    }
    report.in.sort((a, b) => a.ts - b.ts || (a.i ?? 0) - (b.i ?? 0));
    report.out.sort((a, b) => a.ts - b.ts || (a.i ?? 0) - (b.i ?? 0));
  }
  return calcMonthAndYearReports(networkId, reports);
};
const calcLedger = (networkId, reports, hasPassive, has1YearTaxFree, customDatevRows) => {
  console.log("calcLedger", hasPassive, has1YearTaxFree);
  for (const report of reports.dayList) {
    const allCbs = report.in.concat(report.out);
    allCbs.sort((a, b) => a.ts - b.ts || (a.i ?? 0) - (b.i ?? 0));
    moveToTaxFree(report, reports, hasPassive, has1YearTaxFree);
    for (const cb of allCbs) {
      if (isZero(cb.av)) {
        console.error("calcLedger: zero av in cb", json(cb));
        continue;
      }
      if (isGreaterThanZero(cb.av)) {
        handleCalcLedgerIn(cb, report, reports, hasPassive);
      } else if (isLessThanZero(cb.av)) {
        handleCalcLedgerOut(cb, report, reports, hasPassive);
      }
      moveToTaxFree(report, reports, hasPassive, has1YearTaxFree);
    }
  }
  console.log("calcLedger ", json(reports));
  processDatevRow(reports, customDatevRows);
  calcMonthAndYearReports(networkId, reports);
};
const getReportFromDateId = (networkId, reportList, dateId) => {
  let report = reportList.find((r) => r.year === dateId.year && r.month === dateId.month && r.day === dateId.day);
  if (!report) {
    const slotStart = getSlotFromDateId(networkId, dateId, false);
    const slotEnd = getSlotFromDateId(networkId, dateId, true);
    report = createIReport(dateId, slotStart, slotEnd);
    reportList.push(report);
  }
  return report;
};
const ensureReports = (networkId, reports, slotList) => {
  for (const obj of []) {
    const dateId = getDateIdFromSlot(networkId, obj.s, reports.timezone);
    getReportFromDateId(networkId, reports.dayList, dateId);
  }
  for (const report of reports.dayList) {
    const dateId = getDateIdFromSlot(
      networkId,
      getSlotFromDateId(networkId, { year: report.year, month: report.month, day: 0, timezone: reports.timezone }, false),
      // start of month
      reports.timezone
    );
    dateId.day = 0;
    getReportFromDateId(networkId, reports.monthList, dateId);
  }
  for (const report of reports.monthList) {
    const dateId = getDateIdFromSlot(
      networkId,
      getSlotFromDateId(networkId, { year: report.year, month: 0, day: 0, timezone: reports.timezone }, false),
      // start of year
      reports.timezone
    );
    dateId.month = 0;
    dateId.day = 0;
    getReportFromDateId(networkId, reports.yearList, dateId);
  }
  console.warn("ensureReports: reports", json(reports));
};
const calcMonthAndYearReports = (networkId, reports) => {
  sortReportList(reports.dayList);
  ensureReports(networkId, reports);
  console.warn("calcMonthAndYearReports: reports", json(reports));
  const _resetMap = /* @__PURE__ */ new Set();
  for (const dayReport of reports.dayList) {
    const key = dayReport.year + "-" + dayReport.month;
    const reportMonth = reports.monthList.find((r) => r.year === dayReport.year && r.month === dayReport.month && r.day === 0);
    if (!_resetMap.has(key)) {
      reportMonth.in.length = 0;
      reportMonth.out.length = 0;
      reportMonth.rewards.length = 0;
      clearValueJSON(reportMonth.total);
      _resetMap.add(key);
    }
    for (const cb of dayReport.in) {
      summarizeInLedger(reportMonth.in, cb, false);
    }
    for (const cb of dayReport.out) {
      summarizeInLedger(reportMonth.out, cb, false);
    }
    for (const cb of dayReport.rewards) {
      summarizeInLedger(reportMonth.rewards, cb, false);
    }
    addValueToValue(reportMonth.total, dayReport.total);
  }
  for (const monthReport of reports.monthList) {
    const key = monthReport.year.toString();
    const reportYear = reports.yearList.find((r) => r.year === monthReport.year && r.month === 0 && r.day === 0);
    if (!_resetMap.has(key)) {
      reportYear.in.length = 0;
      reportYear.out.length = 0;
      reportYear.rewards.length = 0;
      clearValueJSON(reportYear.total);
      _resetMap.add(key);
    }
    for (const cb of monthReport.in) {
      summarizeInLedger(reportYear.in, cb, false);
    }
    for (const cb of monthReport.out) {
      summarizeInLedger(reportYear.out, cb, false);
    }
    for (const cb of monthReport.rewards) {
      summarizeInLedger(reportYear.rewards, cb, false);
    }
    addValueToValue(reportYear.total, monthReport.total);
  }
  console.warn("calcMonthAndYearReports: 1 reports", json(reports));
  sortReportList(reports.monthList);
  sortReportList(reports.yearList);
  console.warn("calcMonthAndYearReports: 2 reports", json(reports));
  return reports;
};

const _reportData = reactive({});
const getAllReportData = () => _reportData;
const clearReportData = () => {
  for (const entityId in _reportData) {
    delete _reportData[entityId];
  }
  clearAccountMap();
};
const getReportData = (entityId, reset) => {
  if (!_reportData[entityId]) {
    _reportData[entityId] = createIReports(entityId, appTimezone.value, "EUR");
  }
  return _reportData[entityId];
};
const setReportData = (_newData) => {
  for (const entityId in _newData) {
    const newData = _newData[entityId];
    if (isValidIReports(newData)) {
      _reportData[entityId] = newData;
    }
  }
};
const createReportData = async (entity, minSlot, maxSlot) => {
  const entityId = entity.name;
  const reports = _reportData[entityId] ?? createIReports(entityId, appTimezone.value, "EUR");
  const metaData = getMetaData(entityId);
  if (metaData) {
    fillReports(networkId.value, reports, metaData.balanceList, minSlot, maxSlot);
  }
  _reportData[entityId] = reports;
  return reports;
};
const saveReportData = (entityId) => {
  const data = getReportData(entityId);
  return { reports: { [entityId]: json(data) } };
};
const createLedger = async (entityId, hasPassive, has1YearTaxFree, customDatevRows) => {
  console.log("createLedger entityId", entityId);
  console.log("createLedger hasPassive", hasPassive);
  console.log("createLedger has1YearTaxFree", has1YearTaxFree);
  console.log("createLedger customDatevRows", customDatevRows);
  const reports = _reportData[entityId] ?? createIReports(entityId, appTimezone.value, "EUR");
  const metaData = getMetaData(entityId);
  console.log("createLedger metaData", metaData);
  clearAccountMap();
  if (metaData) {
    reports.ledgerActive = [];
    reports.ledgerPassThrough = [];
    reports.ledgerTaxFree = [];
    if (hasPassive) {
      reports.ledgerPassive = [];
    } else {
      reports.ledgerPassive = reports.ledgerActive;
    }
    reports.datevRowList = [];
    reports.taxTxList = [];
    reports.csvRowList = [];
    calcLedger(networkId.value, reports, hasPassive, has1YearTaxFree, customDatevRows);
  }
  console.log("createLedger reports", reports);
  _reportData[entityId] = reports;
  return reports;
};

const useReportingImport = (input) => {
  const {
    showInfo,
    showError,
    showWarning
  } = useNotifications();
  const onUpdateData = ref(0);
  const _processFunction = ref(null);
  let _firstImport = true;
  const doImport = (processFunction) => {
    _processFunction.value = processFunction;
    if (input.value) {
      input.value.click();
    }
  };
  const doLoadFiles = (file) => {
    const reader = new FileReader();
    return new Promise(async (resolve, reject) => {
      reader.onload = async (re) => {
        try {
          const loadedFile = JSON.parse(re.target.result);
          return resolve(loadedFile);
        } catch (err) {
          showError("Could not parse: " + file?.name);
          console.error("Could not parse:", file?.name);
        }
        return reject("error 1");
      };
      reader.onerror = () => {
        showError("Could not load: " + file?.name);
        return reject("error 2");
      };
      reader.onabort = () => {
        showError("Could not load: " + file?.name);
        return reject("error 3");
      };
      reader.readAsText(file);
    });
  };
  const onHandleFileSelect = async (e) => {
    try {
      showInfo("Loading files.");
      const files = e.target.files;
      const calls = [];
      for (const file of files) {
        if (!file.type.match("application/json")) {
          showWarning("Unsupported file type: " + file.type);
          continue;
        }
        calls.push(doLoadFiles(file));
      }
      const loadedFiles = await Promise.all(calls);
      showInfo("Processing files.");
      for (const file of loadedFiles) {
        if (_processFunction.value) {
          _processFunction.value(file);
        }
      }
      _firstImport = false;
      input.value.value = null;
      onUpdateData.value = Date.now();
      showInfo("Done loading files.");
    } catch (err) {
      showError("Error: " + err);
      console.error("Error:", err);
    }
  };
  const doProcessRawDataFile = (jsonObj) => {
    if (!jsonObj?.rawData || typeof jsonObj.rawData !== "object") {
      return showError("Invalid file format");
    }
    const rawData = jsonObj.rawData;
    const numTxAdded = addRawData(rawData);
    for (const accountId in numTxAdded) {
      if (numTxAdded[accountId] === 0) {
        continue;
      }
      if (numTxAdded[accountId] === -1) {
        showError("Invalid file format: " + accountId);
      }
    }
  };
  const doProcessMetaDataFile = (jsonObj) => {
    if (!jsonObj?.metaData || typeof jsonObj.metaData !== "object") {
      return showError("Invalid file format");
    }
    const data = jsonObj.metaData;
    const numTxAdded = setMetaData(data, _firstImport);
    for (const accountId in numTxAdded) {
      if (numTxAdded[accountId] === 0) {
        continue;
      }
      if (numTxAdded[accountId] === -1) {
        showError("Invalid file format: " + accountId);
      }
    }
  };
  const doProcessReportFile = (jsonObj) => {
    if (!jsonObj?.reports || typeof jsonObj.reports !== "object") {
      return showError("Invalid file format");
    }
    const data = jsonObj.reports;
    setReportData(data);
  };
  onMounted(() => {
    if (input.value) {
      input.value.addEventListener("change", onHandleFileSelect, false);
    }
  });
  return {
    doImport,
    doProcessRawDataFile,
    doProcessMetaDataFile,
    doProcessReportFile,
    onUpdateData
  };
};

const _sfc_main$g = {  };

const _hoisted_1$g = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
};

function _sfc_render$4(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$g, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M12 14.5v-10m0 10c-.7 0-2.008-1.994-2.5-2.5m2.5 2.5c.7 0 2.008-1.994 2.5-2.5m5.5 4.5c0 2.482-.518 3-3 3H7c-2.482 0-3-.518-3-3",
      color: "currentColor"
    }, null, -1)
  ]))]))
}
const IconDownload04 = /*#__PURE__*/_export_sfc(_sfc_main$g, [['render',_sfc_render$4]]);

const _sfc_main$f = {  };

const _hoisted_1$f = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  color: "currentColor",
  fill: "none"
};

function _sfc_render$3(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$f, [...(_cache[0] || (_cache[0] = [
    createStaticVNode("<ellipse cx=\"12\" cy=\"5\" rx=\"8\" ry=\"3\" stroke=\"currentColor\" stroke-width=\"1.5\"></ellipse><path d=\"M7 10.8418C7.60158 11.0226 8.27434 11.1716 9 11.2817\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\"></path><path d=\"M12 15C7.58172 15 4 13.6569 4 12\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\"></path><path d=\"M7 17.8418C7.60158 18.0226 8.27434 18.1716 9 18.2817\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\"></path><path d=\"M12 22C7.58172 22 4 20.6569 4 19V5M20 5V12\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path><path d=\"M20 19.3265L18.8258 20.8131C18.2008 21.6044 17.8883 22 17.5 22C17.1117 22 16.7992 21.6044 16.1742 20.8131L15 19.3265M17.5 21.9128V14\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>", 6)
  ]))]))
}
const IconDatabaseImport = /*#__PURE__*/_export_sfc(_sfc_main$f, [['render',_sfc_render$3]]);

const _sfc_main$e = {  };

const _hoisted_1$e = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  color: "currentColor",
  fill: "none"
};

function _sfc_render$2(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$e, [...(_cache[0] || (_cache[0] = [
    createStaticVNode("<ellipse cx=\"11\" cy=\"5\" rx=\"8\" ry=\"3\" stroke=\"currentColor\" stroke-width=\"1.5\"></ellipse><path d=\"M6 10.8418C6.60158 11.0226 7.27434 11.1716 8 11.2817\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\"></path><path d=\"M11 15C6.58172 15 3 13.6569 3 12\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\"></path><path d=\"M6 17.8418C6.60158 18.0226 7.27434 18.1716 8 18.2817\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\"></path><path d=\"M11 22C6.58172 22 3 20.6569 3 19V5M19 5V12\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path><path d=\"M19 16.6735L17.8258 15.1869C17.2008 14.3956 16.8883 14 16.5 14C16.1117 14 15.7992 14.3956 15.1742 15.1869L14 16.6735M16.5 14.0872V22\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>", 6)
  ]))]))
}
const IconDatabaseExport = /*#__PURE__*/_export_sfc(_sfc_main$e, [['render',_sfc_render$2]]);

const doLog = true;
const storeId = "useFileSystemAccessReporting";
const writeTextToFile = async (fileHandle, text) => {
  const writable = await fileHandle.createWritable();
  await writable.write(text);
  await writable.close();
};
const useFileSystemAccessReporting = () => {
  const { showError } = useNotifications();
  {
    console.log(el(storeId), sl("init"));
  }
  const {
    initFileSystemAccess,
    isFileSystemAccessAPIAvailable,
    isFileSystemAccessAPISupported,
    dirHandleRaw,
    hasWriteAccessRoot,
    hasWriteAccessMetadata,
    hasWriteAccessRaw,
    hasWriteAccessReports
  } = useFileSystemAccess();
  const loadRawData = async () => {
    if (!isFileSystemAccessAPISupported.value) {
      return;
    }
    {
      console.log(el(storeId), sl("loadRawData"));
    }
    if (!dirHandleRaw.value) {
      return;
    }
    const fileHandle = await dirHandleRaw.value.getFileHandle("2020-raw-data.json", { create: true });
    const file = await fileHandle.getFile();
    try {
      if (file.size === 0) {
        if (doLog) {
          console.log(el(storeId), sl("loadRawData"), "create file");
        }
        await writeTextToFile(fileHandle, '{ "rawData": {} }');
        if (doLog) {
          console.log(el(storeId), sl("loadRawData"), "file created");
        }
        return;
      }
      const fileContent = await file.text();
      if (doLog) {
        console.log(el(storeId), sl("loadRawData"), "fileContent", fileContent);
      }
      const jsonObj = JSON.parse(fileContent);
      if (doLog) {
        console.log(el(storeId), sl("loadRawData"), "got data", jsonObj);
      }
      if (jsonObj && jsonObj.rawData) {
        const rawData = jsonObj.rawData;
        const numTxAdded = addRawData(rawData);
        for (const accountId in numTxAdded) {
          if (numTxAdded[accountId] === 0) {
            continue;
          }
          if (numTxAdded[accountId] === -1) {
            showError("Invalid file format: " + accountId);
          }
        }
      }
    } catch (err) {
      console.error(el(storeId), sl("loadRawData"), err);
    }
  };
  watch(isFileSystemAccessAPIAvailable, (available) => {
    console.warn("### File System Access API available:", available);
  }, { immediate: true });
  return {
    initFileSystemAccess,
    isFileSystemAccessAPIAvailable,
    isFileSystemAccessAPISupported,
    hasWriteAccessMetadata,
    hasWriteAccessRaw,
    hasWriteAccessReports,
    hasWriteAccessRoot,
    loadRawData
  };
};

const _hoisted_1$d = { class: "w-full flex flex-col et-gap-sm mt-6" };
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "PanelRawData",
  setup(__props) {
    const {
      year,
      month,
      minSlotOfYear,
      maxSlotOfYear
    } = useReportTimeChanger();
    const inputRef = ref(null);
    const {
      doImport,
      doProcessRawDataFile
    } = useReportingImport(inputRef);
    const isManageMode = ref(false);
    const isSelectMode = ref(false);
    const isLocalMode = ref(true);
    const uwl = useWalletList(isManageMode, isSelectMode, isLocalMode);
    const {
      isFileSystemAccessAPIAvailable,
      initFileSystemAccess
    } = useFileSystemAccessReporting();
    const _stopSync = ref(false);
    const doLoadRawReportingDataEntity = async () => {
      _stopSync.value = false;
      for (const entity of entityList.value) {
        for (const accountId of entity.accountIdList) {
          const appAccount = getIAppAccountById(accountId, true);
          if (!appAccount) {
            continue;
          }
          await loadRawData(appAccount, minSlotOfYear.value, maxSlotOfYear.value, _stopSync, false);
        }
      }
      _stopSync.value = false;
    };
    const doLoadRawReportingDataAll = async () => {
      _stopSync.value = false;
      for (const entity of fullEntityList.value) {
        for (const accountId of entity.accountIdList) {
          const appAccount = getIAppAccountById(accountId, true);
          if (!appAccount) {
            continue;
          }
          await loadRawData(appAccount, minSlotOfYear.value, maxSlotOfYear.value, _stopSync, false);
        }
      }
      _stopSync.value = false;
    };
    const doSave = async () => {
      const { downloadText } = useDownload();
      let _month = month.value.toString().padStart(2, "0");
      if (_month === "00") {
        _month = "";
      } else {
        _month = "-" + _month;
      }
      const name = year.value + _month + "-raw-data.json";
      const data = saveRawData(minSlotOfYear.value, maxSlotOfYear.value);
      const formattedData = JSON.stringify(data, null, 2);
      await downloadText(formattedData, name);
    };
    const doReset = () => clearRawData();
    const contextMenuItems = computed(() => {
      const list = [
        {
          id: "importRawData",
          icon: markRaw(IconDatabaseExport),
          label: "Import Raw Data",
          fn: () => doImport(doProcessRawDataFile)
        },
        {
          id: "resetRawData",
          icon: markRaw(IconDelete02),
          label: "Reset Raw Data",
          fn: doReset
        },
        {
          id: "divider1",
          divider: true
        },
        {
          id: "downloadRawData",
          icon: markRaw(IconDownload04),
          label: "Download Raw Data (selected entity)",
          fn: doLoadRawReportingDataEntity
        },
        {
          id: "downloadRawData",
          icon: markRaw(IconDownload04),
          label: "Download Raw Data (all entities)",
          fn: doLoadRawReportingDataAll
        },
        {
          id: "saveRawData",
          icon: markRaw(IconDatabaseImport),
          label: "Save Raw Data",
          fn: doSave
        },
        {
          id: "divider2",
          divider: true
        }
      ];
      if (!isFileSystemAccessAPIAvailable.value) {
        list.push({
          id: "selectLocalDirectory",
          icon: markRaw(IconDatabaseImport),
          label: "Select local data folder",
          fn: initFileSystemAccess
        });
      } else {
        list.push({
          id: "changeLocalDirectory",
          icon: markRaw(IconDatabaseImport),
          label: "Change local data folder",
          fn: () => initFileSystemAccess(false, true)
        });
      }
      return list;
    });
    return (_ctx, _cache) => {
      const _component_Panel = resolveComponent("Panel");
      return openBlock(), createBlock(_component_Panel, {
        class: "w-full rounded-2xl! border-1 border-gray/25",
        pt: {
          pctogglebutton: {
            root: "hover:bg-bg-app/20 outline-txt-1"
          }
        },
        toggleable: "",
        collapsed: ""
      }, {
        header: withCtx(() => [
          createVNode(ButtonRow, { "align-left": "" }, {
            default: withCtx(() => [
              _cache[0] || (_cache[0] = createBaseVNode("div", null, "Raw Blockchain Data", -1)),
              createVNode(_sfc_main$m, { items: contextMenuItems.value }, null, 8, ["items"])
            ]),
            _: 1
          }),
          createBaseVNode("input", {
            type: "file",
            id: "files",
            name: "files[]",
            multiple: "",
            ref_key: "inputRef",
            ref: inputRef,
            hidden: ""
          }, null, 512)
        ]),
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1$d, [
            createVNode(_sfc_main$l, { "wallet-list": unref(uwl) }, null, 8, ["wallet-list"])
          ])
        ]),
        _: 1
      });
    };
  }
});

const removeDuplicates = (array) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const item = array[i];
    for (let j = i - 1; j >= 0; j--) {
      if (array[j] === item) {
        array.splice(i, 1);
        break;
      }
    }
  }
};

const useReporting = () => {
  const applyPriceOfDayData = (entityId) => {
    const entityData = getMetaData(entityId);
    if (!entityData) {
      return;
    }
    for (const balance of entityData.balanceList) {
      for (const cb of balance.cb) {
        if (!cb.pd) {
          addPriceOfDay(cb, getDateId(balance.s));
        }
      }
    }
  };
  const resetPriceOfDayData = (entityId, minSlot, maxSlot) => {
    const entityData = getMetaData(entityId);
    if (!entityData) {
      return;
    }
    for (const balance of entityData.balanceList) {
      if (balance.s < minSlot || balance.s > maxSlot) {
        continue;
      }
      for (const cb of balance.cb) {
        if (cb.l === "") {
          delete cb.l;
        }
        if (typeof cb.i !== "undefined") {
          delete cb.i;
        }
        addPriceOfDay(cb, getDateId(balance.s));
      }
    }
  };
  const fixSoldTokens = (entityId, minSlot, maxSlot) => {
    const entityData = getMetaData(entityId);
    if (!entityData) {
      return;
    }
    for (const balance of entityData.balanceList) {
      if (balance.s < minSlot || balance.s > maxSlot) {
        continue;
      }
      updateSoldTokenCostBasis(balance);
    }
  };
  return {
    priceOfDayData,
    isLoadingPriceOfDay,
    getSlotDate,
    getDateId,
    applyPriceOfDayData,
    resetPriceOfDayData,
    fixSoldTokens,
    getPriceOfDay
  };
};

const costBasisLabelList = [
  { id: "i", primaryLabel: "Gain/Loss" },
  { id: "r", primaryLabel: "Rewards" },
  { id: "f", primaryLabel: "Tx Fee" },
  { id: "d", primaryLabel: "Deposit" },
  { id: "b", primaryLabel: "Buy/Sell" },
  { id: "n", primaryLabel: "Neutral" },
  { id: "p", primaryLabel: "Pass-through" },
  { id: "c", primaryLabel: "Cost Basis" },
  { id: "sc", primaryLabel: "Smart Contract" }
];
const getCostBasisLabel = (_type) => {
  const label = costBasisLabelList.find((type) => type.id === _type);
  if (!label) {
    return _type;
  }
  return label.primaryLabel;
};
const getBadgeColors = (id) => {
  switch (id.toLowerCase()) {
    case "31":
      return { bgColor: "#00599f", color: "#e6e6e6" };
    case "1509":
      return { bgColor: "rgb(64,29,101)", color: "#e6e6e6" };
    case "1591":
      return { bgColor: "rgb(31,29,101)", color: "#e6e6e6" };
    case "1210":
      return { bgColor: "rgb(41,101,29)", color: "#e6e6e6" };
    case "sc":
    case "2760":
      return { bgColor: "rgba(255,204,45,1)", color: "#000000" };
    case "d":
    case "p":
    case "n":
      return { bgColor: "#00599f", color: "#e6e6e6" };
    case "rewards":
    case "r":
      return { bgColor: "rgba(64,156,45,0.6)", color: "#e6e6e6" };
    case "b":
      return { bgColor: "rgba(111,63,223,0.6)", color: "#e6e6e6" };
    case "f":
      return { bgColor: "#3e3e3e", color: "#e6e6e6" };
    case "s":
    case "in":
    case "i":
    case "c":
      return { bgColor: "#375337", color: "#e6e6e6" };
    case "edit":
      return { bgColor: "#0061bf", color: "#e6e6e6" };
    case "h":
    case "out":
    case "remove":
      return { bgColor: "#d9534f", color: "#e6e6e6" };
  }
  return {};
};

const _show = ref(false);
const _entityId = ref(null);
const openModalCSVExport = (entityId) => {
  _entityId.value = entityId;
  _show.value = entityId !== null;
};
const closeModalCSVExport = () => {
  _show.value = false;
  _entityId.value = null;
};
const useModalCSVExport = () => {
  return {
    entityId: _entityId,
    showModalCSVExport: _show,
    openModalCSVExport,
    closeModalCSVExport
  };
};

const _hoisted_1$c = { class: "relative shrink max-w-full flex flex-col et-gap-sm" };
const _hoisted_2$9 = { class: "w-full flex max-sm:flex-wrap sm:flex-row et-gap-sm" };
const _hoisted_3$8 = { class: "w-96 p-2 flex flex-col et-gap-md" };
const _hoisted_4$8 = { class: "flex flex-row et-gap-sm et-je" };
const _hoisted_5$8 = {
  key: 0,
  class: "w-full max-w-full flex max-sm:flex-wrap sm:flex-row et-gap-sm"
};
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "ButtonRowCostBasis",
  props: {
    metaDataList: { type: Array, required: true },
    allowPinnedCostBasis: { type: Boolean, required: false, default: false }
  },
  emits: ["add", "usePinned"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const metaDataList = computed(() => props.metaDataList ?? []);
    const cbtxHash = computed(() => {
      let hash = void 0;
      if (metaDataList.value.length === 1) {
        const data = metaDataList.value[0];
        if (data.a.hashList && data.a.hashList.length > 0) {
          hash = data.a.hashList[0];
        }
      }
      return hash;
    });
    const popoverAdd = ref();
    const inputManualTxHash = ref("");
    const showPopoverAdd = (event) => {
      popoverAdd.value?.show(event);
    };
    const doMarkAsRewards = () => {
      for (const metaData of metaDataList.value) {
        markBalanceRewards(metaData);
      }
    };
    const doMarkAsDeposit = () => {
      for (const metaData of metaDataList.value) {
        markBalanceDeposit(metaData);
      }
    };
    const doMarkAsIncome = () => {
      for (const metaData of metaDataList.value) {
        markBalanceAsTaxRelevant(metaData);
      }
    };
    const doMarkAsC = () => {
      for (const metaData of metaDataList.value) {
        markBalanceAsC(metaData);
      }
    };
    const doMarkAsP = () => {
      for (const metaData of metaDataList.value) {
        markBalanceAsP(metaData);
      }
    };
    const doResetMetaData = () => {
      for (const metaData of metaDataList.value) {
        resetBalance(metaData);
      }
    };
    const onEnteredCBTX = () => {
      doSelectCBTX(inputManualTxHash.value);
    };
    const doSelectCBTX = (txHash) => {
      const entity = selectedEntity.value;
      if (!entity) {
        return;
      }
      console.log("doSelectCBTX", txHash, metaDataList.value.length === 1, metaDataList.value);
      if (metaDataList.value.length !== 1) {
        return;
      }
      const data = metaDataList.value[0];
      const txHashStr = txHash ?? "";
      const txHashList = trimAllStrings(txHashStr.split(",")).filter(isTxHash);
      selectCBTX(entity.name, data, txHashList);
    };
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_InputText = resolveComponent("InputText");
      const _component_FloatLabel = resolveComponent("FloatLabel");
      const _component_Popover = resolveComponent("Popover");
      return openBlock(), createElementBlock("div", _hoisted_1$c, [
        createBaseVNode("div", _hoisted_2$9, [
          createVNode(_component_Button, {
            class: "h-6",
            size: "small",
            rounded: "",
            outlined: "",
            severity: "secondary",
            label: "Reset",
            onClick: doResetMetaData
          }),
          createVNode(_component_Button, {
            class: "h-6",
            size: "small",
            rounded: "",
            outlined: "",
            severity: "secondary",
            label: "Rewards",
            onClick: doMarkAsRewards
          }),
          createVNode(_component_Button, {
            class: "h-6",
            size: "small",
            rounded: "",
            outlined: "",
            severity: "secondary",
            label: "Deposit",
            onClick: doMarkAsDeposit
          }),
          createVNode(_component_Button, {
            class: "h-6",
            size: "small",
            rounded: "",
            outlined: "",
            severity: "secondary",
            label: "Use price of day",
            onClick: doMarkAsIncome
          }),
          createVNode(_component_Button, {
            class: "h-6",
            size: "small",
            rounded: "",
            outlined: "",
            severity: "secondary",
            label: "Neutral CB",
            onClick: doMarkAsC
          }),
          createVNode(_component_Button, {
            class: "h-6",
            size: "small",
            rounded: "",
            outlined: "",
            severity: "secondary",
            label: "Pass-Through",
            onClick: doMarkAsP
          }),
          createVNode(_component_Button, {
            class: "h-6",
            size: "small",
            rounded: "",
            outlined: "",
            severity: "secondary",
            label: "Add Details",
            onClick: _cache[0] || (_cache[0] = ($event) => emit("add"))
          }),
          createVNode(_component_Button, {
            class: "h-6",
            size: "small",
            rounded: "",
            outlined: "",
            severity: "secondary",
            label: "Select CBTX",
            onClick: showPopoverAdd
          }),
          __props.allowPinnedCostBasis ? (openBlock(), createBlock(_component_Button, {
            key: 0,
            class: "h-6",
            size: "small",
            severity: "secondary",
            label: "Used Pinned CBTX",
            rounded: "",
            outlined: "",
            onClick: _cache[1] || (_cache[1] = ($event) => emit("usePinned"))
          })) : createCommentVNode("", true),
          createVNode(_component_Popover, {
            ref_key: "popoverAdd",
            ref: popoverAdd,
            class: "rounded-2xl!"
          }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_3$8, [
                createVNode(_component_FloatLabel, {
                  class: "w-full",
                  variant: "on"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_InputText, {
                      id: "endpointInputNew",
                      modelValue: inputManualTxHash.value,
                      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => inputManualTxHash.value = $event),
                      class: "w-full rounded-full",
                      autofocus: "",
                      onKeydown: withKeys(onEnteredCBTX, ["enter"])
                    }, null, 8, ["modelValue"]),
                    _cache[5] || (_cache[5] = createBaseVNode("label", { for: "endpointInputNew" }, "Cost-basis", -1))
                  ]),
                  _: 1
                }),
                createBaseVNode("div", _hoisted_4$8, [
                  createVNode(_component_Button, {
                    label: _ctx.$t("common:clear"),
                    severity: "secondary",
                    rounded: "",
                    outlined: "",
                    onClick: _cache[3] || (_cache[3] = ($event) => inputManualTxHash.value = "")
                  }, null, 8, ["label"]),
                  createVNode(_component_Button, {
                    label: _ctx.$t("common:confirm"),
                    rounded: "",
                    onClick: onEnteredCBTX
                  }, null, 8, ["label"])
                ])
              ])
            ]),
            _: 1
          }, 512)
        ]),
        cbtxHash.value ? (openBlock(), createElementBlock("div", _hoisted_5$8, [
          createVNode(_component_Button, {
            class: "h-6 truncate",
            size: "small",
            rounded: "",
            outlined: "",
            severity: "secondary",
            label: "CBTX: " + cbtxHash.value,
            onClick: _cache[4] || (_cache[4] = ($event) => doSelectCBTX(cbtxHash.value))
          }, null, 8, ["label"])
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});

const _sfc_main$b = {  };

const _hoisted_1$b = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  color: "currentColor",
  fill: "none"
};

function _sfc_render$1(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$b, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M19.6905 5.77665C20.09 6.15799 20.1047 6.79098 19.7234 7.19048L9.22336 18.1905C9.03745 18.3852 8.78086 18.4968 8.51163 18.4999C8.2424 18.5031 7.98328 18.3975 7.79289 18.2071L4.29289 14.7071C3.90237 14.3166 3.90237 13.6834 4.29289 13.2929C4.68342 12.9024 5.31658 12.9024 5.70711 13.2929L8.48336 16.0692L18.2766 5.80953C18.658 5.41003 19.291 5.39531 19.6905 5.77665Z",
      stroke: "none",
      fill: "currentColor"
    }, null, -1)
  ]))]))
}
const IconCheckmark = /*#__PURE__*/_export_sfc(_sfc_main$b, [['render',_sfc_render$1]]);

const _sfc_main$a = {  };

const _hoisted_1$a = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  fill: "none"
};

function _sfc_render(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$a, [...(_cache[0] || (_cache[0] = [
    createStaticVNode("<path d=\"M3.5 9V14C3.5 17.7712 3.5 19.6569 4.67157 20.8284C5.84315 22 7.72876 22 11.5 22H12.5C16.2712 22 18.1569 22 19.3284 20.8284C20.5 19.6569 20.5 17.7712 20.5 14V10C20.5 6.22876 20.5 4.34315 19.3284 3.17157C18.1569 2 16.2712 2 12.5 2H12\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path><path d=\"M13.5 17H17.5\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path><path d=\"M13.5 7H17.5\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path><path d=\"M13.5 12H17.5\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path><path d=\"M6.5 16.5C6.5 16.5 7.46758 16.7672 8 18C8 18 9 15 11 14\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path><path d=\"M10 5H3.5M10 5C10 4.15973 7.67332 2.58984 7.08333 2M10 5C10 5.84027 7.67331 7.41016 7.08333 8\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>", 6)
  ]))]))
}
const IconAddToList = /*#__PURE__*/_export_sfc(_sfc_main$a, [['render',_sfc_render]]);

const _hoisted_1$9 = { class: "grid-cell-left grid-cell-single-line et-gap-sm" };
const _hoisted_2$8 = { class: "grid-cell-left grid-cell-single-line et-text-sm whitespace-nowrap" };
const _hoisted_3$7 = { class: "grid-cell-left grid-cell-single-line" };
const _hoisted_4$7 = { class: "grid-cell-left grid-cell-multi-line et-ic" };
const _hoisted_5$7 = { class: "grid-cell-left grid-cell-multi-line" };
const _hoisted_6$7 = { class: "grid-cell-right grid-cell-single-line" };
const _hoisted_7$4 = { class: "grid-cell-right grid-cell-single-line" };
const _hoisted_8$4 = { key: 1 };
const _hoisted_9 = { class: "grid-cell-right grid-cell-single-line" };
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "PanelTxMetadataListItem",
  props: /* @__PURE__ */ mergeModels({
    data: { type: Object, required: true }
  }, {
    "pinnedRows": { type: Object, required: true },
    "pinnedRowsModifiers": {},
    "expandedRows": { type: Object, required: true },
    "expandedRowsModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["showMenuAll", "showMenuAccountBadgeId"], ["update:pinnedRows", "update:expandedRows"]),
  setup(__props, { emit: __emit }) {
    const pinnedRows = useModel(__props, "pinnedRows");
    const expandedRows = useModel(__props, "expandedRows");
    const props = __props;
    const emit = __emit;
    const { formatDatetime } = useFormatter();
    const {
      getPriceOfDay,
      getDateId,
      getSlotDate
    } = useReporting();
    const { doTxHashSearch } = useModalTransactionViewer(ref(null), ref(null), void 0, false);
    const allSCPs = computed(() => {
      const entity = selectedEntity.value;
      if (!entity) {
        return [];
      }
      return getAllSmartContractProcesses(entity.name, props.data);
    });
    const onRightClickAll = (e, data) => {
      emit("showMenuAll", e, data);
    };
    const onRightClickAccountBadge = (e, accountId) => {
      emit("showMenuAccountBadgeId", e, accountId);
    };
    const getPriceOfDayCombined = (data) => {
      let pod = 0;
      let numCB = 0;
      for (const cb of data.cb) {
        if ((cb.pd ?? 0) > 0) {
          pod += cb.pd;
          numCB += 1;
        }
      }
      if (numCB > 0) {
        pod /= numCB;
      }
      if (pod === 0) {
        pod = getPriceOfDay(getDateId(data.s)).pd;
      }
      return pod;
    };
    const getFiatValueCombined = (data) => {
      let fv = 0;
      for (const cb of data.cb) {
        if (isTaxNeutral(cb.t)) {
          continue;
        }
        if (!cb.fv) {
          continue;
        }
        fv += cb.fv;
      }
      return fv;
    };
    const getCostBasisTypeList = (data) => {
      const cbList = data.cb;
      const _set = /* @__PURE__ */ new Set();
      for (const cb of cbList) {
        _set.add(cb.t);
      }
      const list = [];
      if (data.i || data.o) {
        list.push("sc");
      }
      if (_set.has("p")) {
        list.push("p");
        _set.delete("p");
      }
      if (_set.has("c")) {
        list.push("c");
        _set.delete("c");
      }
      if (_set.has("f")) {
        list.push("f");
        _set.delete("f");
      }
      if (_set.has("r")) {
        list.push("r");
        _set.delete("r");
      }
      if (_set.has("i")) {
        list.push("i");
        _set.delete("i");
      }
      if (_set.has("b")) {
        list.push("b");
        _set.delete("b");
      }
      list.push(...Array.from(_set));
      return list;
    };
    const doToggleExpandRow = (hash, forceOpen = false) => {
      if (!hash) {
        return;
      }
      if (forceOpen) {
        expandedRows.value[hash] = true;
        return;
      }
      if (expandedRows.value[hash]) {
        delete expandedRows.value[hash];
      } else {
        expandedRows.value[hash] = true;
      }
    };
    const doTogglePinRow = (hash, forceOpen = false) => {
      if (!hash) {
        return;
      }
      if (forceOpen) {
        pinnedRows.value[hash] = true;
        expandedRows.value[hash] = true;
        return;
      }
      if (pinnedRows.value[hash]) {
        delete pinnedRows.value[hash];
        delete expandedRows.value[hash];
      } else {
        pinnedRows.value[hash] = true;
        expandedRows.value[hash] = true;
      }
    };
    const clearPinnedRows = () => {
      const keys = Object.keys(pinnedRows.value);
      for (const k of keys) {
        delete pinnedRows.value[k];
      }
      for (const k of keys) {
        delete expandedRows.value[k];
      }
    };
    const doPinPTLBalances = (data, clear = false) => {
      const entity = selectedEntity.value;
      if (!entity) {
        return;
      }
      if (!data.ptl) {
        return;
      }
      if (clear) {
        clearPinnedRows();
      }
      doTogglePinRow(data.h, true);
      doToggleExpandRow(data.h, true);
      for (let h of data.ptl) {
        h = h.substring(0, 64);
        doTogglePinRow(h, true);
        doToggleExpandRow(h, true);
      }
    };
    const doPinHashListBalances = (data, clear = false) => {
      const entity = selectedEntity.value;
      if (!entity) {
        return;
      }
      if (!data.a.hashList) {
        return;
      }
      if (clear) {
        clearPinnedRows();
      }
      doTogglePinRow(data.h, true);
      doToggleExpandRow(data.h, true);
      for (let h of data.a.hashList) {
        h = h.substring(0, 64);
        doTogglePinRow(h, true);
        doToggleExpandRow(h, true);
      }
    };
    const doPinSmartContract = (scp, clear = false) => {
      if (!scp) {
        return;
      }
      if (clear) {
        clearPinnedRows();
      }
      for (let h of scp.hashList) {
        h = h.substring(0, 64);
        doTogglePinRow(h, true);
        doToggleExpandRow(h, true);
      }
    };
    const getAccountNameById = (accountId) => {
      const entity = selectedEntity.value;
      if (!entity) {
        return "";
      }
      const list = getAccountNames([accountId]);
      if (list.length === 0) {
        return "";
      }
      return list[0];
    };
    const getShortenedUtxoHash = (hash) => {
      if (hash.length <= 10) {
        return hash;
      }
      return hash.slice(0, 6) + "..." + hash.slice(-6);
    };
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_OverlayBadge = resolveComponent("OverlayBadge");
      const _directive_tooltip = resolveDirective("tooltip");
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", _hoisted_1$9, [
          createVNode(_component_Button, {
            class: "size-5 p-0",
            severity: "secondary",
            rounded: "",
            text: "",
            onClick: _cache[0] || (_cache[0] = withModifiers(($event) => doToggleExpandRow(__props.data.h), ["prevent", "stop"]))
          }, {
            icon: withCtx(() => [
              expandedRows.value[__props.data.h] ? (openBlock(), createBlock(IconArrowUp01, {
                key: 0,
                class: "size-4"
              })) : (openBlock(), createBlock(IconArrowDown01, {
                key: 1,
                class: "size-4"
              }))
            ]),
            _: 1
          }),
          createVNode(_component_Button, {
            class: "size-5 p-0",
            severity: "secondary",
            rounded: "",
            text: "",
            onClick: _cache[1] || (_cache[1] = withModifiers(($event) => doTogglePinRow(__props.data.h), ["prevent", "stop"]))
          }, {
            icon: withCtx(() => [
              createVNode(IconPin, {
                class: normalizeClass(["size-4", pinnedRows.value[__props.data.h] ? "text-txt-highlight fill-txt-highlight" : "text-txt-content fill-none"])
              }, null, 8, ["class"])
            ]),
            _: 1
          })
        ]),
        createBaseVNode("div", _hoisted_2$8, toDisplayString(unref(formatDatetime)(unref(getSlotDate)(__props.data.s))), 1),
        createBaseVNode("div", _hoisted_3$7, [
          createVNode(_sfc_main$n, {
            type: "transaction",
            subject: { txHash: __props.data.h },
            "copy-text": __props.data.h,
            "popover-left": "",
            "hide-transaction-expand": ""
          }, {
            default: withCtx(() => [
              createBaseVNode("div", {
                class: "et-text-sm truncate",
                onClick: _cache[2] || (_cache[2] = ($event) => unref(doTxHashSearch)(__props.data.h))
              }, toDisplayString(__props.data.h), 1)
            ]),
            _: 1
          }, 8, ["subject", "copy-text"])
        ]),
        _cache[5] || (_cache[5] = createBaseVNode("div", { class: "grid-cell-left grid-cell-single-line" }, null, -1)),
        createBaseVNode("div", _hoisted_4$7, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(__props.data.al, (a) => {
            return openBlock(), createBlock(_sfc_main$o, {
              size: "tiny",
              badge: {
                id: "account-with-wallet",
                label: getAccountNameById(a),
                noCapitalize: true,
                action: (event) => {
                  onRightClickAccountBadge(event, a);
                }
              },
              "add-colors": "",
              onContextmenu: ($event) => onRightClickAccountBadge($event, a)
            }, null, 8, ["badge", "onContextmenu"]);
          }), 256)),
          (openBlock(true), createElementBlock(Fragment, null, renderList(__props.data.el, (e) => {
            return openBlock(), createBlock(_sfc_main$o, {
              size: "tiny",
              badge: {
                id: "account-with-wallet-orange",
                label: getAccountNameById(e),
                noCapitalize: true,
                action: (event) => {
                  onRightClickAccountBadge(event, e);
                }
              },
              "add-colors": "",
              onContextmenu: ($event) => onRightClickAccountBadge($event, e)
            }, null, 8, ["badge", "onContextmenu"]);
          }), 256)),
          createVNode(_component_Button, {
            class: "p-0",
            severity: "secondary",
            rounded: "",
            text: "",
            onClick: _cache[3] || (_cache[3] = ($event) => onRightClickAll($event, __props.data))
          }, {
            default: withCtx(() => [
              createVNode(IconAddToList, { class: "size-4" })
            ]),
            _: 1
          }),
          allSCPs.value.length > 0 ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(allSCPs.value, (scp) => {
            return openBlock(), createBlock(_sfc_main$o, {
              class: "max-w-48",
              size: "tiny",
              badge: {
                id: "smart-contract",
                label: getShortenedUtxoHash(scp.id),
                icon: markRaw(IconPin),
                iconRight: scp.isComplete ? markRaw(IconCheckmark) : void 0,
                noCapitalize: true,
                action: ($event) => {
                  doPinSmartContract(scp, $event.shiftKey);
                }
              },
              "add-colors": ""
            }, null, 8, ["badge"]);
          }), 256)) : createCommentVNode("", true),
          __props.data.a.hashList && __props.data.a.hashList.length > 0 ? (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(__props.data.a.hashList, (txHash) => {
            return openBlock(), createBlock(_sfc_main$o, {
              class: "max-w-48",
              size: "tiny",
              badge: {
                id: "tx-hash-list",
                label: getShortenedUtxoHash(txHash),
                icon: markRaw(IconPin),
                noCapitalize: true,
                action: ($event) => {
                  doPinHashListBalances(__props.data, $event.shiftKey);
                }
              },
              "add-colors": ""
            }, null, 8, ["badge"]);
          }), 256)) : createCommentVNode("", true),
          (__props.data.ptl?.length ?? 0) > 0 ? withDirectives((openBlock(), createBlock(_component_Button, {
            key: 2,
            class: "p-0",
            severity: "secondary",
            rounded: "",
            text: "",
            onClick: _cache[4] || (_cache[4] = ($event) => doPinPTLBalances(__props.data, $event.shiftKey))
          }, {
            default: withCtx(() => [
              createVNode(IconAddToList, { class: "size-4" })
            ]),
            _: 1
          })), [
            [_directive_tooltip, {
              value: "Pin involved tx: " + __props.data.ptl.join(" "),
              pt: {
                text: "w-168"
              }
            }]
          ]) : createCommentVNode("", true)
        ]),
        createBaseVNode("div", _hoisted_5$7, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(getCostBasisTypeList(__props.data), (type) => {
            return openBlock(), createBlock(_sfc_main$o, {
              badge: { id: type, label: unref(getCostBasisLabel)(type), ...unref(getBadgeColors)(type) },
              size: "tiny",
              "add-colors": ""
            }, null, 8, ["badge"]);
          }), 256)),
          __props.data && __props.data.leftover && unref(hasLeftOverValue)(__props.data) ? (openBlock(), createBlock(_sfc_main$o, {
            key: 0,
            badge: { id: "notChecked", label: "Needs check" },
            size: "tiny",
            "add-colors": ""
          })) : createCommentVNode("", true)
        ]),
        createBaseVNode("div", _hoisted_6$7, [
          createVNode(_sfc_main$p, {
            amount: "1000000",
            "price-of-day": getPriceOfDayCombined(__props.data),
            compact: "",
            colored: ""
          }, null, 8, ["price-of-day"])
        ]),
        createBaseVNode("div", _hoisted_7$4, [
          __props.data && __props.data.leftover && !unref(hasLeftOverValue)(__props.data) ? (openBlock(), createBlock(_sfc_main$p, {
            key: 0,
            "css-color": "et-text-sm",
            amount: getFiatValueCombined(__props.data) + "",
            "price-of-day": 1e6,
            compact: "",
            colored: ""
          }, null, 8, ["amount"])) : (openBlock(), createElementBlock("div", _hoisted_8$4, [
            createVNode(_sfc_main$o, {
              badge: { id: "notChecked", label: "Needs check" },
              size: "tiny",
              "add-colors": ""
            })
          ]))
        ]),
        createBaseVNode("div", _hoisted_9, [
          createVNode(_component_OverlayBadge, {
            "pt:pcbadge:root:class": !__props.data.a.multiasset ? "hidden" : "",
            severity: "success"
          }, {
            default: withCtx(() => [
              createVNode(_sfc_main$q, {
                class: "py-0.25!",
                amount: __props.data.a.coin,
                "display-decimals": 6,
                "trim-fraction": false,
                "is-neutral": unref(hasTaxNeutralCostBasis)(__props.data),
                compact: ""
              }, null, 8, ["amount", "is-neutral"])
            ]),
            _: 1
          }, 8, ["pt:pcbadge:root:class"])
        ])
      ], 64);
    };
  }
});

const _hoisted_1$8 = { class: "grid-cell-left grid-cell-single-line" };
const _hoisted_2$7 = { class: "grid-cell-left grid-cell-single-line et-text-sm" };
const _hoisted_3$6 = { class: "grid-cell-left grid-cell-multi-line" };
const _hoisted_4$6 = { class: "ml-2 et-text-sm" };
const _hoisted_5$6 = { class: "grid-cell-left grid-cell-multi-line flex-nowrap!" };
const _hoisted_6$6 = { class: "grid-cell-right grid-cell-single-line text-txt-muted" };
const _hoisted_7$3 = { class: "grid-cell-right grid-cell-single-line text-txt-muted" };
const _hoisted_8$3 = { class: "grid-cell-right grid-cell-single-line" };
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "RowCostBasis",
  props: {
    cb: { type: Object, required: true },
    label: { type: String, required: false, default: "" },
    hideActions: { type: Boolean, required: false, default: false },
    isLast: { type: Boolean, required: false, default: false },
    displayConfig: {
      type: Object,
      required: false,
      default: void 0
    }
  },
  emits: ["remove", "edit"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const $t = useTranslation().t;
    const { formatDatetime } = useFormatter();
    const isAsset = computed(() => props.cb.au && props.cb.au !== "");
    const multiasset = computed(() => {
      if (!props.cb.au || props.cb.au === "") {
        return void 0;
      }
      const key = props.cb.au.split(".");
      const policyId = key[0];
      const assetName = key[1];
      return { [policyId]: { [assetName]: props.cb.av } };
    });
    const showRow = computed(() => {
      const dc = props.displayConfig;
      if (dc) {
        return (props.cb.t === "p" && dc.showPassThrough.value || props.cb.t === "d" && dc.showDeposit.value || props.cb.t === "c" && dc.showDeposit.value || props.cb.t === "f" && dc.showTxFee.value || props.cb.t === "r" && dc.showRewards.value || props.cb.t === "i" && dc.showIncome.value || props.cb.t === "n" && dc.showNeutral.value || props.cb.t === "b" && dc.showBought.value) && (dc.showTokens.value || !dc.showTokens.value && !props.cb.au || props.cb.au && typeof props.cb.lv === "string" && !isZero(props.cb.lv));
      }
      return true;
    });
    const date = computed(() => {
      const cb = props.cb;
      const dc = props.displayConfig;
      if (!cb) {
        return "";
      }
      if (!dc) {
        return formatDatetime(cb.ts, true, false);
      }
      const dateId = getDateIdFromTimestamp(cb.ts, appTimezone.value);
      if (dc.showData.value === "day" || props.cb.t === "b") {
        return `${dateId.year}-${dateId.month.toString().padStart(2, "0")}-${dateId.day.toString().padStart(2, "0")}`;
      } else if (dc.showData.value === "month") {
        return `${dateId.year}-${dateId.month.toString().padStart(2, "0")}-01`;
      } else if (dc.showData.value === "year") {
        return `${dateId.year}-01-01`;
      }
    });
    const doEdit = () => {
      emit("edit");
    };
    const doRemove = () => {
      emit("remove");
    };
    const getShortenedUtxoHash = (hash) => {
      if (hash.length <= 10) {
        return hash;
      }
      return hash.slice(0, 6) + "..." + hash.slice(-6);
    };
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      return showRow.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
        createBaseVNode("div", _hoisted_1$8, [
          createVNode(_component_Button, {
            class: "size-5 p-0 opacity-0",
            severity: "secondary",
            rounded: "",
            text: ""
          }, {
            icon: withCtx(() => [
              createVNode(IconArrowUp01, { class: "size-4 opacity-0" })
            ]),
            _: 1
          })
        ]),
        createBaseVNode("div", _hoisted_2$7, toDisplayString(date.value), 1),
        _cache[0] || (_cache[0] = createBaseVNode("div", { class: "grid-cell-left grid-cell-single-line" }, " ", -1)),
        _cache[1] || (_cache[1] = createBaseVNode("div", { class: "grid-cell-left grid-cell-single-line" }, " ", -1)),
        createBaseVNode("div", _hoisted_3$6, [
          !__props.label && !__props.hideActions ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            createVNode(_sfc_main$o, {
              size: "tiny",
              "add-colors": "",
              badge: { id: "edit", label: unref($t)("common:edit"), ...unref(getBadgeColors)("edit"), action: doEdit }
            }, null, 8, ["badge"]),
            createVNode(_sfc_main$o, {
              size: "tiny",
              "add-colors": "",
              badge: { id: "remove", label: unref($t)("common:remove"), ...unref(getBadgeColors)("remove"), action: doRemove }
            }, null, 8, ["badge"]),
            __props.cb.id && __props.cb.id.length > 0 ? (openBlock(), createBlock(_sfc_main$o, {
              key: 0,
              class: "max-w-48",
              size: "tiny",
              badge: {
                id: "tx-hash-list",
                label: getShortenedUtxoHash(__props.cb.id),
                noCapitalize: true
              },
              "add-colors": ""
            }, null, 8, ["badge"])) : createCommentVNode("", true),
            createBaseVNode("div", _hoisted_4$6, toDisplayString(__props.cb.l), 1)
          ], 64)) : __props.label ? (openBlock(), createBlock(_sfc_main$o, {
            key: 1,
            size: "tiny",
            "add-colors": "",
            badge: { id: __props.label, label: __props.label, ...unref(getBadgeColors)(__props.label) }
          }, null, 8, ["badge"])) : (openBlock(), createElementBlock(Fragment, { key: 2 }, [
            createTextVNode("   ")
          ], 64))
        ]),
        createBaseVNode("div", _hoisted_5$6, [
          createVNode(_sfc_main$o, {
            size: "tiny",
            "add-colors": "",
            badge: { id: __props.cb.t, label: unref(getCostBasisLabel)(__props.cb.t), ...unref(getBadgeColors)(__props.cb.t) }
          }, null, 8, ["badge"])
        ]),
        createBaseVNode("div", _hoisted_6$6, [
          __props.cb.pd && isAsset.value && !unref(isZero)(__props.cb.lv ?? "0") ? (openBlock(), createBlock(_sfc_main$p, {
            key: 0,
            amount: "1000000",
            "price-of-day": __props.cb.pd,
            compact: "",
            colored: ""
          }, null, 8, ["price-of-day"])) : __props.cb.pd && !isAsset.value && !unref(isTaxNeutral)(__props.cb.t) ? (openBlock(), createBlock(_sfc_main$p, {
            key: 1,
            amount: "1000000",
            "price-of-day": __props.cb.pd,
            compact: "",
            colored: ""
          }, null, 8, ["price-of-day"])) : (openBlock(), createElementBlock(Fragment, { key: 2 }, [
            createTextVNode("-")
          ], 64))
        ]),
        createBaseVNode("div", _hoisted_7$3, [
          isAsset.value && __props.cb.pd ? (openBlock(), createBlock(_sfc_main$p, {
            key: 0,
            "css-color": "et-text-sm",
            amount: __props.cb.lv,
            "price-of-day": __props.cb.pd,
            compact: "",
            colored: ""
          }, null, 8, ["amount", "price-of-day"])) : !unref(isTaxNeutral)(__props.cb.t) && __props.cb.pd ? (openBlock(), createBlock(_sfc_main$p, {
            key: 1,
            "css-color": "et-text-sm",
            amount: __props.cb.av,
            "price-of-day": __props.cb.pd,
            compact: "",
            colored: ""
          }, null, 8, ["amount", "price-of-day"])) : (openBlock(), createElementBlock(Fragment, { key: 2 }, [
            createTextVNode("-")
          ], 64))
        ]),
        createBaseVNode("div", _hoisted_8$3, [
          !isAsset.value ? (openBlock(), createBlock(_sfc_main$q, {
            key: 0,
            class: "py-0.25!",
            "is-neutral": unref(isTaxNeutral)(__props.cb.t),
            amount: __props.cb.av,
            "display-decimals": 6,
            "trim-fraction": false,
            compact: ""
          }, null, 8, ["is-neutral", "amount"])) : multiasset.value ? (openBlock(), createBlock(_sfc_main$r, {
            key: 1,
            "multi-asset": multiasset.value,
            "is-neutral": unref(isTaxNeutral)(__props.cb.t),
            compact: ""
          }, null, 8, ["multi-asset", "is-neutral"])) : createCommentVNode("", true)
        ])
      ], 64)) : createCommentVNode("", true);
    };
  }
});

const _hoisted_1$7 = {
  key: 0,
  class: "col-span-9 -mx-2 px-2 my-2 py-2 overflow-x-auto grid bg-bg-2 border-1 border-border-1 rounded-2xl grid-cols-[4rem_minmax(8rem,min-content)_10rem_1rem_1fr_minmax(12rem,min-content)_minmax(8rem,min-content)_minmax(11rem,min-content)_minmax(13rem,min-content)]"
};
const _hoisted_2$6 = {
  key: 0,
  class: "col-span-9 flex flex-row et-js-is et-gap-sm px-2 mt-1 mb-1"
};
const _hoisted_3$5 = { class: "flex flex-row et-js-ic et-gap-sm" };
const _hoisted_4$5 = { class: "w-full flex flex-col et-je-ie et-gap-xs" };
const _hoisted_5$5 = { class: "w-full flex flex-row et-je-ic et-gap-sm" };
const _hoisted_6$5 = {
  key: 0,
  class: "flex flex-wrap et-gap-sm et-je-ic"
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "PanelTxMetadataListItemRows",
  props: /* @__PURE__ */ mergeModels({
    data: { type: Object, required: true },
    allowPinnedCostBasis: { type: Boolean, required: false, default: false }
  }, {
    "expandedRows": { type: Object, required: true },
    "expandedRowsModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["addCostBasis", "editCostBasis", "usePinnedAsCostBasis"], ["update:expandedRows"]),
  setup(__props, { emit: __emit }) {
    const expandedRows = useModel(__props, "expandedRows");
    const emit = __emit;
    const doEditCostBasis = (data, cb) => {
      emit("editCostBasis", data, cb);
    };
    const doAddCostBasis = (data) => {
      emit("addCostBasis", data);
    };
    const doUsePinnedAsCostBasis = (data) => {
      emit("usePinnedAsCostBasis", data);
    };
    return (_ctx, _cache) => {
      const _component_divider = resolveComponent("divider");
      return expandedRows.value[__props.data.h] ? (openBlock(), createElementBlock("div", _hoisted_1$7, [
        _cache[3] || (_cache[3] = createStaticVNode('<div class="grid-header-left"> </div><div class="grid-header-left">Date</div><div class="grid-header-left"> </div><div class="grid-header-left"> </div><div class="grid-header-left">Actions</div><div class="grid-header-left">Type</div><div class="grid-header-right">Price of day</div><div class="grid-header-right">Fiat value</div><div class="grid-header-right">Coin value</div>', 9)),
        createVNode(_component_divider, { class: "col-span-9 grid-divider" }),
        (openBlock(true), createElementBlock(Fragment, null, renderList(__props.data.cb, (cb, indexRow) => {
          return openBlock(), createElementBlock(Fragment, null, [
            createVNode(_sfc_main$8, {
              cb,
              onEdit: ($event) => doEditCostBasis(__props.data, cb),
              onRemove: ($event) => unref(removeCostBasis)(__props.data, cb)
            }, null, 8, ["cb", "onEdit", "onRemove"]),
            indexRow !== __props.data.cb.length - 1 ? (openBlock(), createBlock(_component_divider, {
              key: 0,
              class: "col-span-9 grid-divider"
            })) : createCommentVNode("", true)
          ], 64);
        }), 256)),
        unref(hasLeftOverValue)(__props.data) ? (openBlock(), createElementBlock("div", _hoisted_2$6, [
          createBaseVNode("div", _hoisted_3$5, [
            createVNode(_sfc_main$c, {
              "meta-data-list": [__props.data],
              "allow-pinned-cost-basis": __props.allowPinnedCostBasis,
              onAdd: _cache[0] || (_cache[0] = ($event) => doAddCostBasis(__props.data)),
              onUsePinned: _cache[1] || (_cache[1] = ($event) => doUsePinnedAsCostBasis(__props.data))
            }, null, 8, ["meta-data-list", "allow-pinned-cost-basis"])
          ]),
          createBaseVNode("div", _hoisted_4$5, [
            createBaseVNode("div", _hoisted_5$5, [
              _cache[2] || (_cache[2] = createBaseVNode("span", { class: "text-right et-text-sm font-semibold whitespace-nowrap" }, "Unaccounted value:", -1)),
              createVNode(_sfc_main$q, {
                class: "py-0.25!",
                amount: __props.data.leftover.coin,
                "display-decimals": 6,
                "trim-fraction": false,
                "css-background-negative": "bg-bg-neutral/100",
                "css-background-neutral": "bg-bg-neutral/100",
                "css-background-positive": "bg-bg-neutral/100",
                "css-text-negative": "",
                "css-text-neutral": "",
                "css-text-positive": "",
                compact: ""
              }, null, 8, ["amount"])
            ]),
            __props.data.leftover.multiasset ? (openBlock(), createElementBlock("div", _hoisted_6$5, [
              createVNode(_sfc_main$r, {
                "multi-asset": __props.data.leftover.multiasset,
                compact: ""
              }, null, 8, ["multi-asset"])
            ])) : createCommentVNode("", true)
          ])
        ])) : createCommentVNode("", true)
      ])) : createCommentVNode("", true);
    };
  }
});

const _hoisted_1$6 = { class: "w-full flex flex-row et-jc-ic" };
const _hoisted_2$5 = { class: "w-full -mx-2 px-2 pt-4 pb-4 overflow-x-auto grid grid-cols-[4rem_minmax(8rem,min-content)_10rem_1rem_1fr_1fr_minmax(12rem,min-content)_minmax(12rem,min-content)_minmax(12rem,min-content)]" };
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "PanelTxMetadataList",
  props: /* @__PURE__ */ mergeModels({
    filteredBalanceList: { type: Array, required: false, default: [] },
    allowPinnedCostBasis: { type: Boolean, required: false, default: false }
  }, {
    "pinnedRows": { type: Object, required: true },
    "pinnedRowsModifiers": {},
    "expandedRows": { type: Object, required: true },
    "expandedRowsModifiers": {},
    "assetFilter": { type: Array, required: false, default: () => [] },
    "assetFilterModifiers": {},
    "txHashPinFilter": { type: Array, required: false, default: () => [] },
    "txHashPinFilterModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["showMenuAll", "showMenuAccountBadgeId", "addCostBasis", "editCostBasis", "usePinnedAsCostBasis"], ["update:pinnedRows", "update:expandedRows", "update:assetFilter", "update:txHashPinFilter"]),
  setup(__props, { emit: __emit }) {
    const pinnedRows = useModel(__props, "pinnedRows");
    const expandedRows = useModel(__props, "expandedRows");
    const assetFilter = useModel(__props, "assetFilter");
    const txHashPinFilter = useModel(__props, "txHashPinFilter");
    const props = __props;
    const emit = __emit;
    const {
      getPaginatorTemplate
    } = useTheme();
    const { isSmallerThanSM } = useScreenSize();
    const allowPinnedCostBasis = computed(() => props.allowPinnedCostBasis);
    const filteredBalanceList = computed(() => props.filteredBalanceList);
    const {
      numItemsPerPage,
      numItems,
      numPages,
      page,
      first,
      onPageStateUpdate
    } = usePaginator(filteredBalanceList, 20);
    const inputAssetFilter = ref("");
    const inputTxHash = ref("");
    const onRightClickAll = (e, data) => {
      emit("showMenuAll", e, data);
    };
    const onRightClickAccountBadge = (e, accountId) => {
      emit("showMenuAccountBadgeId", e, accountId);
    };
    const doEditCostBasis = (data, cb) => {
      emit("editCostBasis", data, cb);
    };
    const doAddCostBasis = (data) => {
      emit("addCostBasis", data);
    };
    const doUsePinnedAsCostBasis = (data) => {
      emit("usePinnedAsCostBasis", data);
    };
    const onEnterAssetFilter = () => {
      const list = trimAllStrings(inputAssetFilter.value.split(",")).filter((v) => v !== "");
      assetFilter.value.splice(0, assetFilter.value.length, ...list);
    };
    watch(inputAssetFilter, () => {
      onEnterAssetFilter();
    });
    const onEnterTxHash = () => {
      const list = trimAllStrings(inputTxHash.value.split(",")).filter((v) => v !== "");
      txHashPinFilter.value.splice(0, txHashPinFilter.value.length, ...list);
      console.log("onEnterTxHash", inputTxHash.value, txHashPinFilter.value);
    };
    return (_ctx, _cache) => {
      const _component_Paginator = resolveComponent("Paginator");
      const _component_InputText = resolveComponent("InputText");
      const _component_FloatLabel = resolveComponent("FloatLabel");
      const _component_divider = resolveComponent("divider");
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", _hoisted_1$6, [
          unref(numPages) > 1 ? (openBlock(), createBlock(_component_Paginator, {
            key: 0,
            class: "py-0",
            "page-link-size": unref(isSmallerThanSM) ? 3 : 5,
            template: unref(getPaginatorTemplate)(),
            rows: unref(numItemsPerPage),
            "total-records": unref(numItems),
            first: unref(first),
            onPage: unref(onPageStateUpdate)
          }, null, 8, ["page-link-size", "template", "rows", "total-records", "first", "onPage"])) : createCommentVNode("", true)
        ]),
        createVNode(ButtonRow, { "align-center": "" }, {
          default: withCtx(() => [
            _cache[6] || (_cache[6] = createBaseVNode("span", null, "All on page:", -1)),
            createVNode(_sfc_main$c, { "meta-data-list": unref(page) }, null, 8, ["meta-data-list"]),
            createVNode(_component_FloatLabel, {
              class: "w-full",
              variant: "on"
            }, {
              default: withCtx(() => [
                createVNode(_component_InputText, {
                  modelValue: inputAssetFilter.value,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => inputAssetFilter.value = $event),
                  class: "max-w-72 px-4 rounded-full",
                  id: "inputAssetFilter",
                  onKeydown: _cache[1] || (_cache[1] = withKeys(($event) => onEnterAssetFilter(), ["enter"]))
                }, null, 8, ["modelValue"]),
                _cache[4] || (_cache[4] = createBaseVNode("label", {
                  for: "walletName",
                  class: "ml-1"
                }, "Filter by asset", -1))
              ]),
              _: 1
            }),
            createVNode(_component_FloatLabel, {
              class: "w-full",
              variant: "on"
            }, {
              default: withCtx(() => [
                createVNode(_component_InputText, {
                  modelValue: inputTxHash.value,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => inputTxHash.value = $event),
                  class: "max-w-72 px-4 rounded-full",
                  id: "inputAssetFilter",
                  onKeydown: _cache[3] || (_cache[3] = withKeys(($event) => onEnterTxHash(), ["enter"]))
                }, null, 8, ["modelValue"]),
                _cache[5] || (_cache[5] = createBaseVNode("label", {
                  for: "walletName",
                  class: "ml-1"
                }, "Pin tx hash", -1))
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        createBaseVNode("div", _hoisted_2$5, [
          _cache[7] || (_cache[7] = createStaticVNode('<div class="grid-header-left"> </div><div class="grid-header-left">Date</div><div class="grid-header-left">txHash</div><div class="grid-header-left"> </div><div class="grid-header-left">Accounts</div><div class="grid-header-left">Type</div><div class="grid-header-right">Price of day</div><div class="grid-header-right">Fiat value</div><div class="grid-header-right">Coin value</div>', 9)),
          createVNode(_component_divider, { class: "col-span-9 grid-divider mt-2" }),
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(page), (data, indexData) => {
            return openBlock(), createElementBlock(Fragment, null, [
              createVNode(_sfc_main$9, {
                data,
                "expanded-rows": expandedRows.value,
                "pinned-rows": pinnedRows.value,
                onShowMenuAll: onRightClickAll,
                onShowMenuAccountBadgeId: onRightClickAccountBadge
              }, null, 8, ["data", "expanded-rows", "pinned-rows"]),
              expandedRows.value[data.h] ? (openBlock(), createBlock(_sfc_main$7, {
                key: 0,
                data,
                "expanded-rows": expandedRows.value,
                "allow-pinned-cost-basis": allowPinnedCostBasis.value,
                onAddCostBasis: doAddCostBasis,
                onEditCostBasis: doEditCostBasis,
                onUsePinnedAsCostBasis: doUsePinnedAsCostBasis
              }, null, 8, ["data", "expanded-rows", "allow-pinned-cost-basis"])) : createCommentVNode("", true),
              indexData !== unref(page).length - 1 ? (openBlock(), createBlock(_component_divider, {
                key: 1,
                class: "col-span-9 grid-divider"
              })) : createCommentVNode("", true)
            ], 64);
          }), 256))
        ])
      ], 64);
    };
  }
});

const _hoisted_1$5 = { class: "w-full grid grid-cols-1 sm:grid-cols-2 et-gap-sm sm:et-gap-md" };
const _hoisted_2$4 = { class: "flex flex-row flex-wrap et-js-ic et-gap-md" };
const _hoisted_3$4 = { class: "flex flex-row flex-wrap et-js-ic et-gap-md" };
const _hoisted_4$4 = { class: "flex flex-row flex-wrap et-js-ic et-gap-md" };
const _hoisted_5$4 = { class: "flex flex-row flex-wrap et-js-ic et-gap-md" };
const _hoisted_6$4 = { class: "sm:col-span-2 flex flex-row flex-wrap et-je-ic et-gap-sm" };
const _hoisted_7$2 = { class: "sm:col-span-2 flex flex-row flex-wrap et-js-ic et-gap-md" };
const _hoisted_8$2 = {
  key: 0,
  class: "sm:col-span-2 flex flex-row flex-wrap et-js-ic et-gap-md"
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "PanelTxMetadata2",
  setup(__props) {
    const $t = useTranslation().t;
    const {
      showModal,
      onClose,
      doOpen
    } = useModalOpen();
    const { openModalCSVExport } = useModalCSVExport();
    const {
      applyPriceOfDayData,
      resetPriceOfDayData,
      fixSoldTokens,
      getPriceOfDay,
      getDateId
    } = useReporting();
    const {
      year,
      month,
      minSlotOfYear,
      maxSlotOfYear
    } = useReportTimeChanger();
    const inputRef = ref(null);
    const {
      doImport,
      doProcessMetaDataFile,
      onUpdateData
    } = useReportingImport(inputRef);
    const _editBalance = ref(null);
    const _editCostBasis = ref(null);
    const _entityMetaData = ref(null);
    const expandedRows = ref({});
    const pinnedRows = ref({});
    const pinnedRowList = ref([]);
    const pinnedRowHashList = useLocalStorage("pinnedRowHashList", []);
    const autoPinAndExpand = () => {
      for (const h of pinnedRowHashList.value) {
        expandedRows.value[h] = true;
        pinnedRows.value[h] = true;
      }
    };
    const filterRewards = ref(false);
    const filterChecked = ref(false);
    const filterIncome = ref(false);
    const filterIntra = ref(false);
    const includedAccountIdList = ref([]);
    const excludedAccountIdList = ref([]);
    const excludedCBTypeList = ref([]);
    const includedCBTypeList = ref([]);
    const networkDecimals = computed(() => getNetworkDecimals(networkId.value));
    const accountList = computed(() => {
      const list2 = [];
      for (const entity of fullEntityList.value) {
        for (const accountId of entity.accountIdList) {
          list2.push({
            id: accountId,
            primaryLabel: getAccountNameById(accountId)
          });
        }
      }
      return list2;
    });
    const list = computed(() => _entityMetaData.value?.balanceList ?? []);
    const lastFilteredList = ref([]);
    const assetFilter = ref([]);
    const txHashPinFilter = ref([]);
    const filteredBalanceList = computed(() => {
      let result = list.value.concat();
      result = result.filter((b) => b.s >= minSlotOfYear.value && b.s <= maxSlotOfYear.value);
      if (assetFilter.value.length > 0) {
        result = result.filter((b) => {
          if (!b.a.multiasset && !b.i && !b.o) {
            return false;
          }
          for (const str of assetFilter.value) {
            if (str.startsWith("asset")) {
              if (includesFingerprint(b.a.multiasset, str)) {
                return true;
              }
              if (b.i && b.i.length > 0) {
                for (const i of b.i) {
                  if (includesFingerprint(i.output.amount.multiasset, str)) {
                    return true;
                  }
                }
              }
              if (b.o && b.o.length > 0) {
                for (const o of b.o) {
                  if (includesFingerprint(o.output.amount.multiasset, str)) {
                    return true;
                  }
                }
              }
            } else {
              if (includesPolicyId(b.a.multiasset, str)) {
                return true;
              }
              if (b.i && b.i.length > 0) {
                for (const i of b.i) {
                  if (includesPolicyId(i.output.amount.multiasset, str)) {
                    return true;
                  }
                }
              }
              if (b.o && b.o.length > 0) {
                for (const o of b.o) {
                  if (includesPolicyId(o.output.amount.multiasset, str)) {
                    return true;
                  }
                }
              }
            }
          }
          return false;
        });
      }
      if (filterChecked.value) {
        result = result.filter((b) => hasLeftOverValue(b));
      }
      if (filterIncome.value) {
        result = result.filter((b) => !(b.cb?.some((cb) => cb.t === "i") && !b.cb?.some((cb) => cb.t === "p") && !b.cb?.some((cb) => cb.t === "c")));
      }
      if (filterIntra.value) {
        result = result.filter((b) => !(b.cb.length === 1 && b.cb[0].t === "f" && !hasLeftOverValue(b)));
        result = result.filter((b) => !isZero(b.a.coin));
      }
      if (filterRewards.value) {
        result = result.filter((b) => {
          if (b.a && b.cb && b.cb.length === 1 && b.cb[0].t === "r" && b.a.coin === b.cb[0].av) {
            return false;
          }
          return !b.tf?.rw;
        });
      }
      if (excludedAccountIdList.value.length > 0) {
        result = result.filter((b) => {
          let allAccountsExcluded = !!b.al;
          for (const a of b.al ?? []) {
            if (!excludedAccountIdList.value.some((i) => i === a)) {
              allAccountsExcluded = false;
              break;
            }
          }
          allAccountsExcluded = allAccountsExcluded && !!b.el;
          for (const e of b.el ?? []) {
            if (!excludedAccountIdList.value.some((i) => i === e)) {
              allAccountsExcluded = false;
              break;
            }
          }
          return !allAccountsExcluded;
        });
      }
      if (includedAccountIdList.value.length > 0) {
        result = result.filter((b) => {
          let allAccountsIncluded = true;
          for (const id of includedAccountIdList.value) {
            if (b.al && !b.al?.includes(id) && b.el && !b.el?.includes(id)) {
              allAccountsIncluded = false;
              break;
            }
          }
          return allAccountsIncluded;
        });
      }
      if (excludedCBTypeList.value.length > 0) {
        result = result.filter((b) => {
          let hasExcludedType = false;
          for (const cb of b.cb ?? []) {
            if (excludedCBTypeList.value.some((i) => i.id === cb.t)) {
              hasExcludedType = true;
              break;
            }
          }
          if ((b.i || b.o) && !hasExcludedType && excludedCBTypeList.value.some((i) => i.id === "sc")) {
            hasExcludedType = true;
          }
          return !hasExcludedType;
        });
      }
      if (includedCBTypeList.value.length > 0) {
        result = result.filter((b) => {
          let hasIncludedType = false;
          for (const cb of b.cb ?? []) {
            if (includedCBTypeList.value.some((i) => i.id === cb.t)) {
              hasIncludedType = true;
              break;
            }
          }
          if ((b.i || b.o) && !hasIncludedType && includedCBTypeList.value.some((i) => i.id === "sc")) {
            hasIncludedType = true;
          }
          return hasIncludedType;
        });
      }
      let different = result.length !== lastFilteredList.value.length;
      for (let i = 0; !different && (i < result.length || i < lastFilteredList.value.length); i++) {
        if (result[i].h !== lastFilteredList.value[i].h) {
          different = true;
          break;
        }
      }
      if (!different) {
        return lastFilteredList.value;
      }
      lastFilteredList.value = result;
      return result;
    });
    const doSave = async () => {
      const entity = selectedEntity.value;
      if (!entity) {
        return;
      }
      const { downloadText } = useDownload();
      let _month = month.value.toString().padStart(2, "0");
      if (_month === "00") {
        _month = "";
      } else {
        _month = "-" + _month;
      }
      const name = year.value + _month + "-meta-data-" + entity.name + ".json";
      await downloadText(JSON.stringify(saveMetaData(entity.name, minSlotOfYear.value, maxSlotOfYear.value), null, 2), name);
    };
    const doReset = () => {
      clearMetaData();
      updateEntityMetaData();
    };
    const doCreateMetaData = async () => {
      const entity = selectedEntity.value;
      if (!entity) {
        return;
      }
      const accountIdList = [];
      for (const entity2 of entityList.value) {
        for (const accountId of entity2.accountIdList) {
          const appAccount = getIAppAccountById(accountId, true);
          if (!appAccount) {
            continue;
          }
          accountIdList.push(appAccount.id);
        }
      }
      const data = await createMetaData(entity.name, minSlotOfYear.value, maxSlotOfYear.value);
      applyPriceOfDayData(entity.name);
      _entityMetaData.value = data;
    };
    const doResetPriceOfDay = async () => {
      const entity = selectedEntity.value;
      if (!entity) {
        return;
      }
      resetPriceOfDayData(entity.name, minSlotOfYear.value, maxSlotOfYear.value);
    };
    const doFixSoldTokens = async () => {
      const entity = selectedEntity.value;
      if (!entity) {
        return;
      }
      fixSoldTokens(entity.name, minSlotOfYear.value, maxSlotOfYear.value);
    };
    const doExpandAll = () => {
      expandedRows.value = list.value.reduce((acc, p) => (acc[p.h] = true) && acc, {});
    };
    const doCollapseAll = () => {
      expandedRows.value = {};
    };
    const updatePinnedRowList = () => {
      pinnedRowList.value = list.value.filter((b) => pinnedRows.value[b.h]);
    };
    const updatePinnedRowHashList = () => {
      pinnedRowHashList.value = Object.keys(pinnedRows.value).filter((h) => pinnedRows.value[h]);
    };
    watch(list, () => {
      updatePinnedRowList();
    }, { deep: true });
    watch(pinnedRows, () => {
      updatePinnedRowList();
      updatePinnedRowHashList();
    }, { deep: true });
    const updateEntityMetaData = () => {
      const entity = selectedEntity.value;
      if (!entity) {
        return;
      }
      const data = getMetaData(entity.name);
      if (!data) {
        return;
      }
      _entityMetaData.value = data;
    };
    const inputManualAda = ref(0);
    const inputManualPrice = ref(0);
    const inputManualType = ref("i");
    const inputManualLabel = ref("");
    const inputManualId = ref("");
    const inputToggleWithTokens = ref(false);
    const inputManualDate = ref(new Date(2020, 0, 1));
    const getCoinAmountWithoutDecimals = (amountWithDecimals) => {
      const d = networkDecimals.value;
      if (d === 0) {
        return amountWithDecimals.toString();
      }
      const _d = pow(10, d);
      return multiply(amountWithDecimals, _d);
    };
    const getCoinAmountWithDecimals = (amountWithoutDecimals) => {
      const d = networkDecimals.value;
      if (d === 0) {
        return bigToNum(amountWithoutDecimals.toString());
      }
      const _d = pow(10, d);
      return bigToNum(divide(amountWithoutDecimals, _d));
    };
    const doExportCSV = () => {
      const entity = selectedEntity.value;
      if (!entity) {
        return;
      }
      openModalCSVExport(entity.name);
    };
    const getAccountNameById = (accountId) => {
      const entity = selectedEntity.value;
      if (!entity) {
        return "";
      }
      const list2 = getAccountNames([accountId]);
      if (list2.length === 0) {
        return "";
      }
      return list2[0];
    };
    const doUsePinnedAsCostBasis = (data) => {
      const entity = selectedEntity.value;
      if (!entity) {
        return "";
      }
      selectCBTX(entity.name, data, pinnedRowList.value.map((b) => b.h).filter((h) => h !== data.h));
    };
    const doEditCostBasis = (data, cb) => {
      _editBalance.value = data;
      _editCostBasis.value = cb;
      inputManualAda.value = !!cb.au ? void 0 : getCoinAmountWithDecimals(cb.av);
      inputManualDate.value = new Date(cb.ts);
      inputManualPrice.value = cb.pd ?? null;
      inputManualType.value = cb.t;
      inputManualLabel.value = cb.l ?? "";
      inputManualId.value = cb.id ?? "";
      doOpen();
    };
    const onEditApply = (handleClose) => {
      if (!_editCostBasis.value) {
        return;
      }
      _editCostBasis.value.pd = inputManualPrice.value;
      if (!_editCostBasis.value.au && inputManualAda.value) {
        _editCostBasis.value.av = getCoinAmountWithoutDecimals(inputManualAda.value);
      }
      _editCostBasis.value.fu = appCurrency.value;
      _editCostBasis.value.ts = inputManualDate.value.getTime();
      _editCostBasis.value.t = inputManualType.value;
      _editCostBasis.value.l = inputManualLabel.value || void 0;
      _editCostBasis.value.id = inputManualId.value || void 0;
      if (_editBalance.value) {
        updateLovelaceLeft(_editBalance.value);
      }
      _editCostBasis.value = null;
      _editBalance.value = null;
      handleClose?.();
    };
    const doAddCostBasis = (data) => {
      _editBalance.value = data;
      const date = new Date(getTimestampFromSlot(networkId.value, data.s));
      inputManualAda.value = getCoinAmountWithDecimals(data.leftover.coin);
      inputManualDate.value = date;
      inputManualPrice.value = getPriceOfDay(getDateId(data.s)).pd;
      inputManualLabel.value = "";
      inputManualId.value = "";
      inputManualType.value = "i";
      inputToggleWithTokens.value = false;
      doOpen();
    };
    const doSaveCostBasis = (handleClose) => {
      const data = _editBalance.value;
      if (!data) {
        return;
      }
      const cb = {
        t: inputManualType.value,
        av: getCoinAmountWithoutDecimals(inputManualAda.value ?? "0"),
        ts: inputManualDate.value.getTime(),
        i: data.cb.length,
        pd: inputManualPrice.value,
        fu: appCurrency.value
      };
      if (inputManualLabel.value) {
        cb.l = inputManualLabel.value;
      }
      if (inputManualId.value) {
        cb.id = inputManualId.value;
      }
      calcFiatValue(cb);
      markBalanceAsManual(data, cb);
      if (inputToggleWithTokens.value && data.a.multiasset) {
        switch (inputManualType.value) {
          case "i":
            markBalanceAsTaxRelevant(data, true, true);
            break;
          case "p":
            markBalanceAsP(data, true);
            break;
          case "n":
            markBalanceAsN(data, true);
            break;
          case "c":
            markBalanceAsC(data, true);
            break;
        }
      }
      updateLovelaceLeft(data);
      _editBalance.value = null;
      handleClose?.();
    };
    const menuAccountBadgeId = ref();
    const menuAccountBadge = ref();
    const menuAccountBadgeItems = ref([
      {
        id: "excludeAccount",
        label: "Exclude account",
        fn: () => {
          doExcludeAccount(menuAccountBadgeId.value);
        }
      },
      {
        id: "includeAccount",
        label: "Include account",
        fn: () => {
          doIncludeAccount(menuAccountBadgeId.value);
        }
      }
    ]);
    const menuAllData = ref();
    const menuAll = ref();
    const menuAllItems = ref([
      {
        id: "excludeAccount",
        label: "Exclude all account",
        fn: () => {
          doExcludeAllAccounts(menuAllData.value);
        }
      },
      {
        id: "includeAccount",
        label: "Include all account",
        fn: () => {
          doIncludeAllAccounts(menuAllData.value);
        }
      }
    ]);
    const onRightClickAll = (e, data) => {
      e.preventDefault();
      e.stopPropagation();
      menuAllData.value = data;
      menuAll.value?.onShowMenu?.(e);
    };
    const onRightClickAccountBadge = (e, accountId) => {
      e.preventDefault();
      e.stopPropagation();
      menuAccountBadgeId.value = accountId;
      menuAccountBadge.value?.onShowMenu?.(e);
    };
    const doIncludeAccount = (accountId) => {
      if (!accountId) {
        return;
      }
      const option = includedAccountIdList.value.find((i) => i === accountId);
      if (!option) {
        const account = accountList.value.find((i) => i.id === accountId);
        if (!account) {
          return;
        }
        includedAccountIdList.value.push(account.id);
      }
    };
    const doExcludeAccount = (accountId) => {
      if (!accountId) {
        return;
      }
      const option = excludedAccountIdList.value.find((i) => i === accountId);
      if (!option) {
        const account = accountList.value.find((i) => i.id === accountId);
        if (!account) {
          return;
        }
        excludedAccountIdList.value.push(account.id);
      }
    };
    const doIncludeAllAccounts = (data) => {
      const idList = [...includedAccountIdList.value];
      if (data.al) {
        for (const accountId of data.al) {
          idList.push(accountId);
        }
      }
      if (data.el) {
        for (const accountId of data.el) {
          idList.push(accountId);
        }
      }
      removeDuplicates(idList);
      includedAccountIdList.value = idList;
    };
    const doExcludeAllAccounts = (data) => {
      const idList = [...excludedAccountIdList.value];
      if (data.al) {
        for (const accountId of data.al) {
          idList.push(accountId);
        }
      }
      if (data.el) {
        for (const accountId of data.el) {
          idList.push(accountId);
        }
      }
      removeDuplicates(idList);
      excludedAccountIdList.value = idList;
    };
    const contextMenuItems = computed(() => [
      {
        id: "importMetadata",
        icon: markRaw(IconDatabaseExport),
        label: "Import Metadata",
        fn: async () => {
          await doImport(doProcessMetaDataFile);
          setTimeout(() => {
            autoPinAndExpand();
          }, 1e3);
        }
      },
      {
        id: "resetPriceOfDay",
        icon: markRaw(IconDatabaseExport),
        label: "Reset Price of Day",
        fn: () => doResetPriceOfDay()
      },
      {
        id: "fixSoldTokens",
        icon: markRaw(IconDatabaseExport),
        label: "Fix sold tokens",
        fn: () => doFixSoldTokens()
      },
      {
        id: "resetMetadata",
        icon: markRaw(IconDelete02),
        label: "Reset Metadata",
        fn: doReset
      },
      {
        id: "divider1",
        divider: true
      },
      {
        id: "createMetadata",
        icon: markRaw(IconDownload04),
        label: "Create Metadata",
        fn: doCreateMetaData
      },
      {
        id: "saveMetadata",
        icon: markRaw(IconDatabaseImport),
        label: "Save Metadata",
        fn: doSave
      },
      {
        id: "divider2",
        divider: true
      },
      {
        id: "exportMetadataCSV",
        icon: markRaw(IconDatabaseImport),
        label: "Export Metadata CSV",
        fn: doExportCSV
      }
    ]);
    const contextMenuItemsToggles = computed(() => [
      {
        id: "hideRewards",
        label: "Hide Rewards",
        isToggle: true,
        toggleRef: markRaw(filterRewards)
      },
      {
        id: "hideComplete",
        label: "Hide Completed",
        isToggle: true,
        toggleRef: markRaw(filterChecked)
      },
      {
        id: "hideIncome",
        label: "Hide Income",
        isToggle: true,
        toggleRef: markRaw(filterIncome)
      },
      {
        id: "hideIntraWallet",
        label: "Hide Intra Wallet",
        isToggle: true,
        toggleRef: markRaw(filterIntra)
      },
      {
        id: "divider1",
        divider: true
      },
      {
        id: "expandAll",
        label: $t("common:button.expandAll"),
        fn: doExpandAll
      },
      {
        id: "collapseAll",
        label: $t("common:button.collapseAll"),
        fn: doCollapseAll
      }
    ]);
    watch([onUpdateData, selectedEntity], () => {
      updateEntityMetaData();
    });
    watchEffect(() => {
      console.log("txHashPinFilter changed", txHashPinFilter.value);
      if (txHashPinFilter.value.length === 0) {
        return;
      }
      for (const b of list.value) {
        if (txHashPinFilter.value.includes(b.h)) {
          expandedRows.value[b.h] = true;
          pinnedRows.value[b.h] = true;
        }
      }
      updatePinnedRowHashList();
      txHashPinFilter.value = [];
    });
    onMounted(() => {
      updateEntityMetaData();
    });
    return (_ctx, _cache) => {
      const _component_MultiSelect = resolveComponent("MultiSelect");
      const _component_Panel = resolveComponent("Panel");
      const _component_DatePicker = resolveComponent("DatePicker");
      const _component_Select = resolveComponent("Select");
      const _component_ToggleSwitch = resolveComponent("ToggleSwitch");
      const _component_InputText = resolveComponent("InputText");
      const _component_FloatLabel = resolveComponent("FloatLabel");
      const _component_Button = resolveComponent("Button");
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(_component_Panel, {
          class: "w-full rounded-2xl! border-1 border-gray/25",
          pt: {
            pctogglebutton: {
              root: "hover:bg-bg-app/20 outline-txt-1"
            },
            content: "flex flex-wrap et-gap-sm"
          },
          toggleable: ""
        }, {
          header: withCtx(() => [
            createVNode(ButtonRow, { "align-left": "" }, {
              default: withCtx(() => [
                _cache[18] || (_cache[18] = createBaseVNode("div", { class: "shrink-0" }, "Transaction Metadata", -1)),
                createVNode(_sfc_main$m, { items: contextMenuItems.value }, null, 8, ["items"]),
                createVNode(_sfc_main$m, {
                  items: contextMenuItemsToggles.value,
                  "show-eye-icon": ""
                }, null, 8, ["items"])
              ]),
              _: 1
            }),
            createBaseVNode("input", {
              type: "file",
              id: "files",
              name: "files[]",
              multiple: "",
              ref_key: "inputRef",
              ref: inputRef,
              hidden: ""
            }, null, 512),
            createVNode(_sfc_main$m, {
              ref_key: "menuAccountBadge",
              ref: menuAccountBadge,
              items: menuAccountBadgeItems.value,
              "hide-button": ""
            }, null, 8, ["items"]),
            createVNode(_sfc_main$m, {
              ref_key: "menuAll",
              ref: menuAll,
              items: menuAllItems.value,
              "hide-button": ""
            }, null, 8, ["items"])
          ]),
          default: withCtx(() => [
            createVNode(ButtonRow, { "align-right": "" }, {
              default: withCtx(() => [
                createVNode(_component_MultiSelect, {
                  modelValue: includedAccountIdList.value,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => includedAccountIdList.value = $event),
                  class: normalizeClass(["rounded-full", includedAccountIdList.value.length === 0 ? "pl-1" : "pl-0"]),
                  options: accountList.value,
                  filter: true,
                  disabled: accountList.value.length === 0,
                  placeholder: "Included accounts",
                  display: "chip",
                  optionValue: "id",
                  optionLabel: "primaryLabel"
                }, null, 8, ["modelValue", "class", "options", "disabled"]),
                createVNode(_component_MultiSelect, {
                  modelValue: excludedAccountIdList.value,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => excludedAccountIdList.value = $event),
                  class: normalizeClass(["max-w-72 rounded-full", excludedAccountIdList.value.length === 0 ? "pl-1" : ""]),
                  options: accountList.value,
                  filter: true,
                  disabled: accountList.value.length === 0,
                  placeholder: "Excluded accounts",
                  display: "chip",
                  optionValue: "id",
                  optionLabel: "primaryLabel"
                }, null, 8, ["modelValue", "class", "options", "disabled"]),
                createVNode(_component_MultiSelect, {
                  modelValue: includedCBTypeList.value,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => includedCBTypeList.value = $event),
                  class: normalizeClass(["max-w-72 rounded-full", includedCBTypeList.value.length === 0 ? "pl-1" : ""]),
                  options: unref(costBasisLabelList),
                  display: "chip",
                  optionLabel: "primaryLabel",
                  placeholder: "Included Types",
                  filter: true
                }, null, 8, ["modelValue", "class", "options"]),
                createVNode(_component_MultiSelect, {
                  modelValue: excludedCBTypeList.value,
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => excludedCBTypeList.value = $event),
                  class: normalizeClass(["max-w-72 rounded-full", excludedCBTypeList.value.length === 0 ? "pl-1" : ""]),
                  options: unref(costBasisLabelList),
                  display: "chip",
                  optionLabel: "primaryLabel",
                  placeholder: "Excluded Types",
                  filter: true
                }, null, 8, ["modelValue", "class", "options"])
              ]),
              _: 1
            }),
            createVNode(_sfc_main$6, {
              "pinned-rows": pinnedRows.value,
              "onUpdate:pinnedRows": _cache[4] || (_cache[4] = ($event) => pinnedRows.value = $event),
              "expanded-rows": expandedRows.value,
              "onUpdate:expandedRows": _cache[5] || (_cache[5] = ($event) => expandedRows.value = $event),
              "asset-filter": assetFilter.value,
              "onUpdate:assetFilter": _cache[6] || (_cache[6] = ($event) => assetFilter.value = $event),
              "tx-hash-pin-filter": txHashPinFilter.value,
              "onUpdate:txHashPinFilter": _cache[7] || (_cache[7] = ($event) => txHashPinFilter.value = $event),
              "filtered-balance-list": filteredBalanceList.value,
              onShowMenuAll: onRightClickAll,
              onShowMenuAccountBadgeId: onRightClickAccountBadge,
              onAddCostBasis: doAddCostBasis,
              onEditCostBasis: doEditCostBasis
            }, null, 8, ["pinned-rows", "expanded-rows", "asset-filter", "tx-hash-pin-filter", "filtered-balance-list"]),
            _cache[19] || (_cache[19] = createBaseVNode("div", null, "Pinned", -1)),
            pinnedRowList.value.length > 0 ? (openBlock(), createBlock(_sfc_main$6, {
              key: 0,
              "pinned-rows": pinnedRows.value,
              "onUpdate:pinnedRows": _cache[8] || (_cache[8] = ($event) => pinnedRows.value = $event),
              "expanded-rows": expandedRows.value,
              "onUpdate:expandedRows": _cache[9] || (_cache[9] = ($event) => expandedRows.value = $event),
              "filtered-balance-list": pinnedRowList.value,
              "allow-pinned-cost-basis": pinnedRowList.value.length > 1,
              onShowMenuAll: onRightClickAll,
              onShowMenuAccountBadgeId: onRightClickAccountBadge,
              onAddCostBasis: doAddCostBasis,
              onEditCostBasis: doEditCostBasis,
              onUsePinnedAsCostBasis: doUsePinnedAsCostBasis
            }, null, 8, ["pinned-rows", "expanded-rows", "filtered-balance-list", "allow-pinned-cost-basis"])) : createCommentVNode("", true)
          ]),
          _: 1
        }),
        unref(showModal) ? (openBlock(), createBlock(_sfc_main$u, {
          key: 0,
          narrow: "",
          "full-width-on-mobile": "",
          onClose: _cache[17] || (_cache[17] = ($event) => {
            unref(onClose)();
          })
        }, {
          header: withCtx(({ handleClose }) => [
            createVNode(_sfc_main$t, {
              headline: unref($t)("tx-page:filter.title"),
              caption: unref($t)("tx-page:filter.caption"),
              "hide-back": "",
              "hide-info": "",
              showClose: "",
              onClose: ($event) => handleClose()
            }, null, 8, ["headline", "caption", "onClose"])
          ]),
          content: withCtx(({ handleClose }) => [
            createBaseVNode("div", _hoisted_1$5, [
              createBaseVNode("div", _hoisted_2$4, [
                createVNode(_sfc_main$s, {
                  model: inputManualAda.value,
                  "onUpdate:model": _cache[10] || (_cache[10] = ($event) => inputManualAda.value = $event),
                  class: "w-full",
                  "asset-decimals": networkDecimals.value,
                  "min-coin-input": Number.MIN_SAFE_INTEGER,
                  "max-coin-input": Number.MAX_SAFE_INTEGER,
                  "is-donation": ""
                }, null, 8, ["model", "asset-decimals", "min-coin-input", "max-coin-input"])
              ]),
              createBaseVNode("div", _hoisted_3$4, [
                createVNode(_sfc_main$s, {
                  model: inputManualPrice.value,
                  "onUpdate:model": _cache[11] || (_cache[11] = ($event) => inputManualPrice.value = $event),
                  class: "w-full",
                  "asset-decimals": 10,
                  "is-coin-input": false,
                  "is-currency-input": true,
                  "min-coin-input": Number.MIN_SAFE_INTEGER,
                  "max-coin-input": Number.MAX_SAFE_INTEGER,
                  "is-donation": ""
                }, null, 8, ["model", "min-coin-input", "max-coin-input"])
              ]),
              createBaseVNode("div", _hoisted_4$4, [
                createVNode(_component_DatePicker, {
                  modelValue: inputManualDate.value,
                  "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => inputManualDate.value = $event),
                  class: "w-full",
                  pt: {
                    pcInputText: {
                      root: "text-center"
                    }
                  },
                  view: "date",
                  dateFormat: "dd/mm/yy"
                }, null, 8, ["modelValue"])
              ]),
              createBaseVNode("div", _hoisted_5$4, [
                createVNode(_component_Select, {
                  ref: "selectEndpoint",
                  modelValue: inputManualType.value,
                  "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => inputManualType.value = $event),
                  class: "w-full pl-4 text-left",
                  options: unref(costBasisLabelList),
                  "option-label": "primaryLabel",
                  "option-value": "id",
                  placeholder: "Select a type",
                  pt: { label: "text-left" }
                }, null, 8, ["modelValue", "options"])
              ]),
              createBaseVNode("div", _hoisted_6$4, [
                _cache[20] || (_cache[20] = createBaseVNode("div", null, "With Tokens:", -1)),
                createVNode(_component_ToggleSwitch, {
                  modelValue: inputToggleWithTokens.value,
                  "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => inputToggleWithTokens.value = $event)
                }, null, 8, ["modelValue"])
              ]),
              createBaseVNode("div", _hoisted_7$2, [
                createVNode(_component_FloatLabel, {
                  class: "w-full",
                  variant: "on"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_InputText, {
                      modelValue: inputManualLabel.value,
                      "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => inputManualLabel.value = $event),
                      class: "w-full px-4 rounded-full",
                      id: "inputManualLabel"
                    }, null, 8, ["modelValue"]),
                    _cache[21] || (_cache[21] = createBaseVNode("label", {
                      for: "inputManualLabel",
                      class: "ml-1"
                    }, "Comment", -1))
                  ]),
                  _: 1
                })
              ]),
              inputManualType.value === "p" ? (openBlock(), createElementBlock("div", _hoisted_8$2, [
                createVNode(_component_FloatLabel, {
                  class: "w-full",
                  variant: "on"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_InputText, {
                      modelValue: inputManualId.value,
                      "onUpdate:modelValue": _cache[16] || (_cache[16] = ($event) => inputManualId.value = $event),
                      class: "w-full px-4 rounded-full",
                      id: "inputManualId"
                    }, null, 8, ["modelValue"]),
                    _cache[22] || (_cache[22] = createBaseVNode("label", {
                      for: "inputManualId",
                      class: "ml-1"
                    }, "Manual pass-through id", -1))
                  ]),
                  _: 1
                })
              ])) : createCommentVNode("", true)
            ])
          ]),
          footer: withCtx(({ handleClose }) => [
            createVNode(ButtonRow, null, {
              default: withCtx(() => [
                _editCostBasis.value ? (openBlock(), createBlock(_component_Button, {
                  key: 0,
                  label: unref($t)("common:apply"),
                  rounded: "",
                  onClick: ($event) => onEditApply(handleClose)
                }, null, 8, ["label", "onClick"])) : (openBlock(), createBlock(_component_Button, {
                  key: 1,
                  label: unref($t)("common:save"),
                  rounded: "",
                  onClick: ($event) => doSaveCostBasis(handleClose)
                }, null, 8, ["label", "onClick"]))
              ]),
              _: 2
            }, 1024)
          ]),
          _: 1
        })) : createCommentVNode("", true)
      ], 64);
    };
  }
});

const { formatDatetime } = useFormatter();
const createMetadataCSVFile = (networkId, _balanceList, target, useLocalTimezone = false, includeTxNotes = false) => {
  const fields = target.fields.concat();
  if (includeTxNotes) {
    fields.push("Note");
  }
  const n = "\n";
  const sep = ",";
  const adaSeparator = target.adaSeparator;
  let csv = fields.join(sep) + n;
  const balanceList = [..._balanceList];
  sortBalanceList(balanceList);
  for (const balance of balanceList) {
    if (!balance.a?.coin) throw new Error("Transaction malformed.");
    const splitFee = !!balance.a.hasInputs;
    let total = balance.a.coin ?? "0";
    let fee = "";
    if (splitFee) {
      fee = balance.f ?? "0";
      total = subtract(total, neg(fee));
      fee = '"' + divide(abs(fee), 1e6, 6).split(".").join(adaSeparator) + '"';
    }
    const value = '"' + divide(abs(total), 1e6, 6).split(".").join(adaSeparator) + '"';
    const isNeg = isLessThanZero(total);
    const isPos = isGreaterThanZero(total);
    const al = getAccountNameList(balance.al ?? []);
    const el = getAccountNameList(balance.el ?? []);
    const msg = el.join(", ") + (el.length > 0 && al.length > 0 ? " - " : "") + al.join(", ");
    csv += createLine(networkId, fields, balance, useLocalTimezone, value, isNeg, isPos, fee, "ADA", msg, sep);
    csv += n;
    if (balance.a.multiasset) {
      for (const policyId in balance.a.multiasset) {
        const assetMap = balance.a.multiasset[policyId];
        for (const assetName in assetMap) {
          let quantity = assetMap[assetName];
          const ai = getAssetInfoCheck(policyId, assetName);
          const name = ai?.tr?.n ?? ai?.n ?? "";
          if (ai?.tr?.d) {
            console.log(name, quantity, ai.tr.d, divide(quantity, Math.pow(10, ai.tr.d ?? 0)));
            quantity = divide(quantity, Math.pow(10, ai.tr.d ?? 0));
          }
          const isNeg2 = isLessThanZero(quantity);
          const isPos2 = isGreaterThanZero(quantity);
          const total2 = '"' + quantity.split(".").join(adaSeparator) + '"';
          csv += createLine(networkId, fields, balance, useLocalTimezone, total2, isNeg2, isPos2, "", name, policyId + "." + assetName, sep);
          csv += n;
        }
      }
    }
  }
  return csv;
};
const createLine = (networkId, fields, balance, useLocalTimezone, value, isNeg, isPos, fee, unit, msg, sep) => {
  const numFields = fields.length;
  let csv = "";
  for (let i = 0; i < numFields; i++) {
    const field = fields[i];
    switch (field) {
      case "Date":
      case "Koinly Date":
        const slotTime = new Date(getTimestampFromSlot(networkId, balance.s));
        if (!useLocalTimezone) {
          csv += '"' + formatDatetime(slotTime, true, true, true) + '"';
        } else {
          const time = new Date(slotTime.getTime() - (/* @__PURE__ */ new Date()).getTimezoneOffset() * 6e4);
          csv += '"' + formatDatetime(time, true, true, true) + '"';
        }
        break;
      case "Sent Amount":
        if (isNeg) csv += value;
        break;
      case "Received Amount":
        if (isPos) csv += value;
        break;
      case "Amount":
        csv += isNeg ? "-" + value : value;
        break;
      case "Fee Amount":
        if (fee !== "" && fee !== "0")
          csv += fee;
        break;
      case "Net Worth Amount":
        break;
      case "Sent Currency":
        if (isNeg) csv += '"' + unit + '"';
        break;
      case "Received Currency":
        if (isPos) csv += '"' + unit + '"';
        break;
      case "Currency":
      case "Fee Currency":
        if (fee !== "" && fee !== "0") csv += '"' + unit + '"';
        break;
      case "Net Worth Currency":
        csv += '"' + unit + '"';
        break;
      case "Label":
        break;
      case "Description":
        if (msg && msg.length > 0) {
          csv += '"' + msg + '"';
        }
        break;
      case "TxHash":
        csv += '"' + balance.h + '"';
        break;
    }
    if (i <= numFields - 2) {
      csv += sep;
    }
  }
  return csv;
};
const getAccountNameList = (accountIdList) => {
  const nameList = accountIdList.map((id) => {
    const name = getAccountNameById(id);
    if (name) {
      return name;
    }
    return id;
  });
  return [...new Set(nameList)];
};
const getAccountNameById = (accountId) => {
  const entity = selectedEntity.value;
  if (!entity) {
    return "";
  }
  const list = getAccountNames([accountId]);
  if (list.length === 0) {
    return "";
  }
  return list[0];
};

const _hoisted_1$4 = { class: "flex flex-col et-js-is et-gap-md" };
const _hoisted_2$3 = { class: "w-full flex" };
const _hoisted_3$3 = { class: "w-full flex flex-col et-js-is et-gap-sm" };
const _hoisted_4$3 = { class: "font-semibold cap-first" };
const _hoisted_5$3 = { class: "w-full flex flex-row et-jb-ic et-gap-md" };
const _hoisted_6$3 = { class: "w-full flex flex-col et-js-is et-gap-sm" };
const _hoisted_7$1 = { class: "font-semibold cap-first" };
const _hoisted_8$1 = { class: "w-full flex flex-row et-jb-ic et-gap-md" };
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "ModalCSVExport",
  setup(__props) {
    const $t = useTranslation().t;
    const { showError } = useNotifications();
    const {
      entityId,
      showModalCSVExport,
      closeModalCSVExport
    } = useModalCSVExport();
    const { downloadText } = useDownload();
    const {
      year,
      month,
      day,
      minSlotOfYear,
      maxSlotOfYear
    } = useReportTimeChanger();
    const noteToggle = ref(false);
    const timezoneToggle = ref(false);
    const isProcessing = ref(false);
    const doExportCSV = async () => {
      const entity = entityId.value;
      if (!entity) {
        return showError("No entity selected");
      }
      const data = getMetaData(entity);
      if (!data) {
        return;
      }
      isProcessing.value = true;
      const target = getCSVTarget(selectedTargetId.value.id);
      const balanceList = data.balanceList.filter((b) => b.s >= minSlotOfYear.value && b.s <= maxSlotOfYear.value);
      await doLoadMissingAssetInfo(balanceList);
      const csv2 = createMetadataCSVFile(networkId.value, balanceList, target, timezoneToggle.value, true);
      const fileName = `eternl-entity-${entity}-meta-${target.id}-${year.value}-${month.value.toString().padStart(2, "0")}-${day.value.toString().padStart(2, "0")}.csv`;
      const output = convertCSV(csv2, appTimezone.value);
      await downloadText(output, fileName);
      isProcessing.value = false;
    };
    const {
      getCSVTarget,
      getCSVTargetList
    } = useCSVExport();
    const exportTargets = getCSVTargetList();
    const selectedTargetId = ref(exportTargets[0]);
    const csv = {
      headline: $t("tx-export:csv.headline"),
      caption: $t("tx-export:csv.caption"),
      format: $t("tx-export:csv.format"),
      button: {
        label: $t("tx-export:csv.button.label"),
        icon: $t("tx-export:csv.button.icon")
      },
      csvExport: {
        label: $t("tx-export:csv.csvExport.label"),
        caption: $t("tx-export:csv.csvExport.caption"),
        exportPreset: $t("tx-export:csv.csvExport.exportPreset")
      },
      notes: {
        label: $t("tx-export:csv.notes.label"),
        caption: $t("tx-export:csv.notes.caption")
      },
      localTime: {
        label: $t("tx-export:csv.localTime.label"),
        caption: $t("tx-export:csv.localTime.caption")
      }
    };
    return (_ctx, _cache) => {
      const _component_Select = resolveComponent("Select");
      const _component_ToggleSwitch = resolveComponent("ToggleSwitch");
      const _component_Button = resolveComponent("Button");
      return unref(showModalCSVExport) ? (openBlock(), createBlock(_sfc_main$u, {
        key: 0,
        "modal-container": "#modal-eternl-tx-note",
        "attach-to-bottom": true,
        narrow: "",
        "full-width-on-mobile": "",
        onClose: unref(closeModalCSVExport)
      }, {
        header: withCtx(({ handleClose }) => [
          createVNode(_sfc_main$t, {
            headline: unref($t)("tx-export:title"),
            caption: unref($t)("tx-export:caption"),
            "hide-info": "",
            "hide-back": "",
            "show-close": "",
            onClose: handleClose
          }, null, 8, ["headline", "caption", "onClose"])
        ]),
        content: withCtx(({ handleClose }) => [
          createBaseVNode("div", _hoisted_1$4, [
            createBaseVNode("div", _hoisted_2$3, [
              createVNode(_component_Select, {
                class: "pl-4",
                modelValue: selectedTargetId.value,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => selectedTargetId.value = $event),
                options: unref(exportTargets),
                pt: { label: "et-text-md text-left" },
                optionLabel: "label"
              }, null, 8, ["modelValue", "options"])
            ]),
            createBaseVNode("div", _hoisted_3$3, [
              createBaseVNode("div", _hoisted_4$3, toDisplayString(csv.notes.label), 1),
              createBaseVNode("div", _hoisted_5$3, [
                createVNode(_component_ToggleSwitch, {
                  modelValue: noteToggle.value,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => noteToggle.value = $event),
                  class: "shrink-0",
                  binary: ""
                }, null, 8, ["modelValue"]),
                createBaseVNode("div", null, toDisplayString(csv.notes.caption), 1)
              ])
            ]),
            createBaseVNode("div", _hoisted_6$3, [
              createBaseVNode("div", _hoisted_7$1, toDisplayString(csv.localTime.label), 1),
              createBaseVNode("div", _hoisted_8$1, [
                createVNode(_component_ToggleSwitch, {
                  modelValue: timezoneToggle.value,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => timezoneToggle.value = $event),
                  class: "shrink-0",
                  binary: ""
                }, null, 8, ["modelValue"]),
                createBaseVNode("div", null, toDisplayString(csv.localTime.caption), 1)
              ])
            ])
          ])
        ]),
        footer: withCtx(({ handleClose }) => [
          createVNode(ButtonRow, null, {
            default: withCtx(() => [
              createVNode(_component_Button, {
                label: csv.button.label,
                severity: "secondary",
                loading: isProcessing.value,
                rounded: "",
                outlined: "",
                onClick: doExportCSV
              }, null, 8, ["label", "loading"])
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["onClose"])) : createCommentVNode("", true);
    };
  }
});

const createDatevCSVFile = (datevRowList, year) => {
  const csvYear = year;
  const csvExportedAt = getFormattedDate$1(/* @__PURE__ */ new Date());
  const csvStartYear = csvYear + "0101";
  const csvStartDate = csvYear + "0101";
  const csvEndDate = csvYear + "1231";
  let csv = "";
  csv += `"EXTF";700;21;"Buchungsstapel";13;${csvExportedAt};;"AG";"tk";;1;64;${csvStartYear};4;${csvStartDate};${csvEndDate};"TK - Krypto";;1;0;0;"EUR";;;;;;;;;`;
  csv += "\n";
  csv += `Umsatz (ohne Soll/Haben-Kz);"Soll/Haben-Kennzeichen";"WKZ Umsatz";"Kurs";"Basis-Umsatz";"WKZ Basis-Umsatz";"Konto";"Gegenkonto (ohne BU-Schlüssel)";"BU-Schlüssel";"Belegdatum";"Belegfeld 1";"Belegfeld 2";"Skonto";"Buchungstext";"Postensperre";"Diverse Adressnummer";"Geschäftspartnerbank";"Sachverhalt";"Zinssperre";"Beleglink";"Beleginfo - Art 1";"Beleginfo - Inhalt 1";"Beleginfo - Art 2";"Beleginfo - Inhalt 2";"Beleginfo - Art 3";"Beleginfo - Inhalt 3";"Beleginfo - Art 4";"Beleginfo - Inhalt 4";"Beleginfo - Art 5";"Beleginfo - Inhalt 5";"Beleginfo - Art 6";"Beleginfo - Inhalt 6";"Beleginfo - Art 7";"Beleginfo - Inhalt 7";"Beleginfo - Art 8";"Beleginfo - Inhalt 8";"KOST1 - Kostenstelle";"KOST2 - Kostenstelle";"Kost-Menge";"EU-Land u. UStID";"EU-Steuersatz";"Abw. Versteuerungsart";"Sachverhalt L+L";"Funktionsergänzung L+L";"BU 49 Hauptfunktionstyp";"BU 49 Hauptfunktionsnummer";"BU 49 Funktionsergänzung";"Zusatzinformation - Art 1";"Zusatzinformation- Inhalt 1";"Zusatzinformation - Art 2";"Zusatzinformation- Inhalt 2";"Zusatzinformation - Art 3";"Zusatzinformation- Inhalt 3";"Zusatzinformation - Art 4";"Zusatzinformation- Inhalt 4";"Zusatzinformation - Art 5";"Zusatzinformation- Inhalt 5";"Zusatzinformation - Art 6";"Zusatzinformation- Inhalt 6";"Zusatzinformation - Art 7";"Zusatzinformation- Inhalt 7";"Zusatzinformation - Art 8";"Zusatzinformation- Inhalt 8";"Zusatzinformation - Art 9";"Zusatzinformation- Inhalt 9";"Zusatzinformation - Art 10";"Zusatzinformation- Inhalt 10";"Zusatzinformation - Art 11";"Zusatzinformation- Inhalt 11";"Zusatzinformation - Art 12";"Zusatzinformation- Inhalt 12";"Zusatzinformation - Art 13";"Zusatzinformation- Inhalt 13";"Zusatzinformation - Art 14";"Zusatzinformation- Inhalt 14";"Zusatzinformation - Art 15";"Zusatzinformation- Inhalt 15";"Zusatzinformation - Art 16";"Zusatzinformation- Inhalt 16";"Zusatzinformation - Art 17";"Zusatzinformation- Inhalt 17";"Zusatzinformation - Art 18";"Zusatzinformation- Inhalt 18";"Zusatzinformation - Art 19";"Zusatzinformation- Inhalt 19";"Zusatzinformation - Art 20";"Zusatzinformation- Inhalt 20";"Stück";"Gewicht";"Zahlweise";"Forderungsart";"Veranlagungsjahr";"Zugeordnete Fälligkeit";"Skontotyp";"Auftragsnummer";"Buchungstyp";"USt-Schlüssel (Anzahlungen)";"EU-Land (Anzahlungen)";"Sachverhalt L+L (Anzahlungen)";"EU-Steuersatz (Anzahlungen)";"Erlöskonto (Anzahlungen)";"Herkunft-Kz";"Buchungs GUID";"KOST-Datum";"SEPA-Mandatsreferenz";"Skontosperre";"Gesellschaftername";"Beteiligtennummer";"Identifikationsnummer";"Zeichnernummer";"Postensperre bis";"Bezeichnung SoBil-Sachverhalt";"Kennzeichen SoBil-Buchung";"Festschreibung";"Leistungsdatum";"Datum Zuord. Steuerperiode"`;
  csv += "\n";
  for (const row of datevRowList) {
    csv += getDatevLine(row);
  }
  return csv;
};
const getDatevLine = (row) => {
  let adaAmountKind = "";
  let adaAssetKind = "";
  let adaPDKind = "";
  let adaPD = "";
  let adaAmount = "";
  let adaAsset = "";
  let tokenAmountKind = "";
  let tokenTokenNameKind = "";
  let tokenPolicyIdKind = "";
  let tokenAssetNameKind = "";
  let tokenAmount = "";
  let tokenTokenName = "";
  let tokenPolicyId = "";
  let tokenAssetName = "";
  console.log(row);
  if (row.info) {
    if (row.info.lv) {
      adaAmountKind = "Menge";
      adaAmount = getCSVADAAmount(divide(row.info.lv, "1000000"));
      adaAssetKind = "Name";
      adaAsset = "ADA";
    }
    if (row.info.pd) {
      adaPDKind = "Tagespreis";
      adaPD = getCSVAmount(row.info.pd, 5);
    }
    if (row.info.au) {
      const [policyId, assetName] = row.info.au.split(".");
      if (!(!policyId || typeof assetName !== "string")) {
        const ai = getAssetInfoCheck(policyId, assetName);
        tokenAmountKind = "Menge";
        tokenAmount = row.info.av;
        tokenTokenNameKind = "Name";
        tokenTokenName = ai?.tr?.n ?? ai?.n ?? "";
        tokenPolicyIdKind = "policyId";
        tokenPolicyId = policyId;
        tokenAssetNameKind = "assetName";
        tokenAssetName = assetName;
      }
    }
  }
  return `${row.a};"${row.sh}";"";;;"";${row.i};${row.o};"";${row.d};"";"";;"${row.n}";0;"";;;;"";;"";"";"";"";"";"";"";"";"";"";"";"";"";"";"";"";"";;"";;"";;;;;;"${adaAmountKind}";"${adaAmount}";"${adaAssetKind}";"${adaAsset}";"${adaPDKind}";"${adaPD}";"${tokenAmountKind}";"${tokenAmount}";"${tokenTokenNameKind}";"${tokenTokenName}";"${tokenPolicyIdKind}";"${tokenPolicyId}";"${tokenAssetNameKind}";"${tokenAssetName}";"";"";"";"";"";"";"";"";"";"";"";"";"";"";"";"";"";"";"";"";"";"";"";"";"";"";"";"";"";"";"";"";"";"";"";"";"";"";"";"";"";"";"";"";"";;;;;"";"";"";0;;
`;
};
const getFormattedDate$1 = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const milliseconds = String(date.getMilliseconds()).padStart(3, "0");
  return `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
};
const convertCustomDatevRows = (customDatevRows, rowMap, year) => {
  for (const datevRowKey in customDatevRows) {
    const list = customDatevRows[datevRowKey];
    const rowList = [];
    for (const row of list) {
      const parts = row.split(";");
      rowList.push({
        a: parts[0],
        sh: parts[1],
        i: parts[2],
        o: parts[3],
        d: parts[4],
        y: year,
        n: parts[5]
      });
    }
    rowMap[datevRowKey] = rowList;
  }
  console.log(rowMap);
  return rowMap;
};
const _customDatevRows2020 = {
  //2020
  "9974,04;S;31;1210;3007": [
    // Deletes that row (it's from 2019)
    "10000,00;S;1210;540;0101;Umbuchung Deposit v.29-11-2019 - cr",
    "9965,34;S;31;1210;0101;ZA-Kauf ADA am 29-11-2019 - cr",
    "8,18;S;31;1210;0101;ZA-Kauf ADA am 29-11-2019 - cr",
    "0,52;S;31;1210;0101;ZA-Kauf ADA am 29-11-2019 - cr",
    "25,91;S;4972;1210;0101;ZA-Gebühren - cr",
    "0,02;S;4972;1210;0101;ZA-Gebühren - cr"
  ],
  "9973,95;S;31;1210;0709": [
    "10000,00;H;1200;1360;0709;ZA-Bank an Kraken - cr",
    "10000,00;S;1210;1360;0709;ZE-Kraken von Bank - cr",
    "9974,00;S;31;1210;0709;Kauf ADA - Kraken - crt",
    "25,93;S;4972;1210;0709;Kauf ADA Gebühren - cr",
    "0,05;S;4972;31;0709;Kauf ADA Gebühren - cr",
    "10000,00;H;1200;1360;0709;ZA-Fehlüberweisung an Kraken - cr",
    "10000,00;S;1210;1360;0709;ZE-Fehlüberweisung an Kraken - cr",
    "10000,00;H;1210;1360;0709;ZA-Fehlüberweisung an Bank - cr",
    "0,09;S;4972;1210;0709;ZA-Fehlüberweisung Gebühren - cr",
    "10000,00;S;1200;1360;0709;ZE-Fehlüberweisung an Bank - cr"
  ],
  "9885,72;S;31;1210;1811": [
    "25000,00;H;1200;1360;1811;ZA-Bank an Kraken - cr",
    "25000,00;S;1210;1360;1811;ZE-Kraken von Bank - cr",
    "15049,40;S;32;1210;1811;Kauf BTC - Kraken - cr",
    "39,13;S;4972;1210;1811;Kauf BTC Gebühren - cr",
    "9885,77;S;31;1210;1811;Kauf ADA - Kraken - crt",
    "25,70;S;4972;1210;1811;Kauf ADA Gebühren - cr",
    "0,05;S;4972;31;1811;Kauf ADA Gebühren - cr"
  ],
  "49875,24;S;31;1210;1911": [
    "50000,00;H;1200;1360;1911;ZA-Bank an Kraken - cr",
    "50000,00;S;1210;1360;1911;ZE-Kraken von Bank - cr",
    "49875,30;S;31;1210;1911;Kauf ADA - Kraken - crt",
    "124,70;S;4972;1210;1911;Kauf ADA Gebühren - cr",
    "0,05;S;4972;31;1911;Kauf ADA Gebühren - cr"
  ],
  "29,57;S;1210;1509;1212": [
    "7,63;S;4972;32;1212;ZA-Kraken an Wallet - cr",
    "29,57;S;1210;1509;1212;Verkauf ADA (aktiv) - crt",
    "29,57;S;32;1210;1212;Kauf BTC - cr",
    "0,07;S;4972;32;1212;Kauf BTC Gebühren - cr",
    "7,63;S;4972;32;1212;ZA-Kraken an Wallet - cr"
  ]
};
const _customDatevRows2021 = {
  //2021
  "896,40;S;1210;1509;2502": [
    "896,40;S;1210;1509;2502;Verkauf ADA (aktiv) - crt",
    "896,40;S;33;1210;2502;Kauf USDT - cr",
    "2,33;S;4972;33;2502;Kauf USDT Gebühren - cr",
    "2,15;S;4972;33;2502;ZA-Kraken an Wallet - cr",
    "429,01;S;2760;33;2502;ZA 25-02-2021 CZILLA-DEP 6713"
  ],
  "9902,04;S;1210;1509;0203": [
    "9902,04;S;1210;1509;0203;Verkauf ADA (aktiv) - crt",
    "25,75;S;4972;1210;0203;Verkauf ADA Gebühren - cr",
    "0,09;S;4972;1210;0203;Verkauf ADA Gebühren - cr",
    "9876,2;H;1210;1360;0203;ZA-Kraken an Bank - cr",
    "9876,2;S;1200;1360;0203;ZE-Bank von Kraken - cr"
  ],
  "10734,92;S;1210;1509;2203": [
    "10734,92;S;1210;1509;2203;Verkauf ADA (aktiv) - crt",
    "27,91;S;4972;1210;2603;Verkauf ADA Gebühren - cr",
    "0,09;S;4972;1210;2603;Verkauf ADA Gebühren - cr",
    "10706,91;H;1210;1360;2603;ZA-Kraken an Bank - cr",
    "10706,91;S;1200;1360;2603;ZE-Bank von Kraken - cr"
  ],
  "14800,00;S;1210;1509;1005": [
    "14800,00;S;1210;1509;1005;Verkauf ADA (aktiv) - crt",
    "23,68;S;4972;1210;1005;Verkauf ADA Gebühren - cr",
    "0,09;S;4972;1210;1005;Verkauf ADA Gebühren - cr",
    "14776,24;H;1210;1360;1005;ZA-Kraken an Bank - cr",
    "14776,24;S;1200;1360;1005;ZE-Bank von Kraken - cr"
  ],
  "12590,72;S;1210;1509;0806": [
    "12590,72;S;1210;1509;0806;Verkauf ADA (aktiv) - crt",
    "32,74;S;4972;1210;0806;Verkauf ADA Gebühren - cr",
    "0,09;S;4972;1210;0806;Verkauf ADA Gebühren - cr",
    "12557,89;H;1210;1360;0806;ZA-Kraken an Bank - cr",
    "12557,89;S;1200;1360;0806;ZE-Bank von Kraken - cr"
  ],
  "11335,10;S;1210;1509;2607": [
    "11335,10;S;1210;1509;2607;Verkauf ADA (aktiv) - crt",
    "29,47;S;4972;1210;2607;Verkauf ADA Gebühren - cr",
    "0,09;S;4972;1210;2607;Verkauf ADA Gebühren - cr",
    "11305,54;H;1210;1360;2607;ZA-Kraken an Bank - cr",
    "11305,54;S;1200;1360;2607;ZE-Bank von Kraken - cr"
  ],
  "21089,50;S;1210;1509;2008": [
    "21089,50;S;1210;1509;2008;Verkauf ADA (aktiv) - crt",
    "54,83;S;4972;1210;2008;Verkauf ADA Gebühren - cr",
    "0,09;S;4972;1210;2008;Verkauf ADA Gebühren - cr",
    "21034,57;H;1210;1360;2008;ZA-Kraken an Bank - cr",
    "21034,57;S;1200;1360;2008;ZE-Bank von Kraken - cr"
  ],
  "16762,56;S;1210;1509;1609": [
    "16762,56;S;1210;1509;1609;Verkauf ADA (aktiv) - crt",
    "43,58;S;4972;1210;1609;Verkauf ADA Gebühren - cr",
    "0,09;S;4972;1210;1609;Verkauf ADA Gebühren - cr",
    "16718,89;H;1210;1360;1609;ZA-Kraken an Bank - cr",
    "16718,89;S;1200;1360;1609;ZE-Bank von Kraken - cr"
  ],
  "14591,69;S;1210;1509;1910": [
    "14591,69;S;1210;1509;1910;Verkauf ADA (aktiv) - crt",
    "37,94;S;4972;1210;1910;Verkauf ADA Gebühren - cr",
    "0,09;S;4972;1210;1910;Verkauf ADA Gebühren - cr",
    "14553,66;H;1210;1360;1910;ZA-Kraken an Bank - cr",
    "14553,66;S;1200;1360;1910;ZE-Bank von Kraken - cr"
  ],
  "19768,54;S;1210;1509;0911": [
    "19768,54;S;1210;1509;0911;Verkauf ADA (aktiv) - crt",
    "51,40;S;4972;1210;0911;Verkauf ADA Gebühren - cr",
    "0,09;S;4972;1210;0911;Verkauf ADA Gebühren - cr",
    "19717,05;H;1210;1360;0911;ZA-Kraken an Bank - cr",
    "19717,05;S;1200;1360;0911;ZE-Bank von Kraken - cr"
  ],
  "15775,53;S;1210;1509;2311": [
    "15775,53;S;1210;1509;2311;Verkauf ADA (aktiv) - crt",
    "41,02;S;4972;1210;2311;Verkauf ADA Gebühren - cr",
    "0,09;S;4972;1210;2311;Verkauf ADA Gebühren - cr",
    "15734,42;H;1210;1360;2311;ZA-Kraken an Bank - cr",
    "15734,42;S;1200;1360;2311;ZE-Bank von Kraken - cr"
  ],
  "476,78;S;31;1210;2911": [
    "479,42;S;1210;33;2911;Verkauf USDT (passiv) - cr",
    "16,51;H;2760;33;2911;Gewinn - Verkauf USDT (passiv) - cr",
    "479,42;S;31;1210;2911;Kauf ADA - crt",
    "1,25;S;4972;31;2911;Kauf ADA Gebühren - cr",
    "1,39;S;4972;31;2911;ZA-Kraken an Wallet - cr"
  ],
  "17257,21;S;1210;1509;1012": [
    "17257,21;S;1210;1509;1012;Verkauf ADA (aktiv) - crt",
    "44,87;S;4972;1210;1012;Verkauf ADA Gebühren - cr",
    "0,09;S;4972;1210;1012;Verkauf ADA Gebühren - cr",
    "17212,26;H;1210;1360;1012;ZA-Kraken an Bank - cr",
    "17212,26;S;1200;1360;1012;ZE-Bank von Kraken - cr"
  ]
};
const _customDatevRows2022 = {
  //2022
  "15847,90;S;1210;1509;0601": [
    "15847,90;S;1210;1509;0601;Verkauf ADA (aktiv) - crt",
    "41,20;S;4972;1210;0601;Verkauf ADA Gebühren - cr"
  ],
  "26512,74;S;1210;1509;1701": [
    "26512,74;S;1210;1509;1701;Verkauf ADA (aktiv) - crt",
    "68,93;S;4972;1210;1701;Verkauf ADA Gebühren - cr",
    "0,09;S;4972;1210;1701;Verkauf ADA Gebühren - cr",
    "42250,41;H;1210;1360;1701;ZA-Kraken an Bank - cr",
    "42250,41;S;1200;1360;1701;ZE-Bank von Kraken - cr"
  ],
  "22760,08;S;1210;1509;0802": [
    "22760,08;S;1210;1509;0802;Verkauf ADA (aktiv) - crt",
    "59,18;S;4972;1210;0802;Verkauf ADA Gebühren - cr",
    "0,09;S;4972;1210;0802;Verkauf ADA Gebühren - cr",
    "22700,81;H;1210;1360;0802;ZA-Kraken an Bank - cr",
    "22700,81;S;1200;1360;0802;ZE-Bank von Kraken - cr"
  ],
  "73742,32;S;1210;1509;2202": [
    "73742,32;S;1210;1509;2202;Verkauf ADA (aktiv) - crt",
    "191,73;S;4972;1210;2202;Verkauf ADA Gebühren - cr",
    "0,09;S;4972;1210;0703;Verkauf ADA Gebühren - cr",
    "39999,91;H;1210;1360;0802;ZA-Kraken an Bank - cr",
    "39999,91;S;1200;1360;0802;ZE-Bank von Kraken - cr",
    "0,09;S;4972;1210;2804;Verkauf ADA Gebühren - cr",
    "33550,50;H;1210;1360;2804;ZA-Kraken an Bank - cr",
    "33550,50;S;1200;1360;2804;ZE-Bank von Kraken - cr"
  ],
  "21056,71;S;1210;1509;1205": [
    "21056,71;S;1210;1509;1205;Verkauf ADA (aktiv) - crt",
    "54,75;S;4972;1210;1205;Verkauf ADA Gebühren - cr",
    "0,09;S;4972;1210;2505;Verkauf ADA Gebühren - cr",
    "21001,87;H;1210;1360;2505;ZA-Kraken an Bank - cr",
    "21001,87;S;1200;1360;2505;ZE-Bank von Kraken - cr"
  ],
  "53040,08;S;1210;1509;2006": [
    "53040,08;S;1210;1509;2006;Verkauf ADA (aktiv) - crt",
    "234,17;S;4972;1210;2202;Verkauf ADA Gebühren - cr",
    "0,09;S;4972;1210;2706;Verkauf ADA Gebühren - cr",
    "45000,00;H;1210;1360;2706;ZA-Kraken an Bank - cr",
    "45000,00;S;1200;1360;2706;ZE-Bank von Kraken - cr",
    "0,09;S;4972;1210;1908;Verkauf ADA Gebühren - cr",
    "44830,11;H;1210;1360;1908;ZA-Kraken an Bank - cr",
    "44830,11;S;1200;1360;1908;ZE-Bank von Kraken - cr"
  ],
  "37024,38;S;1210;31;2006": [
    "37024,38;S;1210;31;2006;Verkauf ADA (passiv) - crt"
  ],
  "43236,06;S;1210;1509;0210": [
    "43236,06;S;1210;1509;0210;Verkauf ADA (aktiv) - crt",
    "112,41;S;4972;1210;0210;Verkauf ADA Gebühren - cr",
    "0,09;S;4972;1210;0210;Verkauf ADA Gebühren - cr",
    "43123,55;H;1210;1360;0210;ZA-Kraken an Bank - cr",
    "43123,55;S;1200;1360;0210;ZE-Bank von Kraken - cr"
  ],
  "28453,74;S;1210;1509;0411": [
    "28453,74;S;1210;1509;0411;Verkauf ADA (aktiv) - crt",
    "110,41;S;4972;1210;0411;Verkauf ADA Gebühren - cr",
    "0,09;S;4972;1210;1211;Verkauf ADA Gebühren - cr",
    "42353,63;H;1210;1360;1211;ZA-Kraken an Bank - cr",
    "42353,63;S;1200;1360;1211;ZE-Bank von Kraken - cr"
  ],
  "14010,39;S;1210;31;0411": [
    "14010,39;S;1210;31;0411;Verkauf ADA (passiv) - crt"
  ],
  "28844,05;S;1210;1509;1212": [
    "28844,05;S;1210;1509;1212;Verkauf ADA (aktiv) - crt",
    "74,99;S;4972;1210;1212;Verkauf ADA Gebühren - cr",
    "0,09;S;4972;1210;1212;Verkauf ADA Gebühren - cr",
    "28768,97;H;1210;1360;1212;ZA-Kraken an Bank - cr",
    "28768,97;S;1200;1360;1212;ZE-Bank von Kraken - cr"
  ],
  "9710,78;S;1210;1509;3012": [
    "9710,78;S;1210;1509;3012;Verkauf ADA (aktiv) - crt",
    "31,24;S;4972;1210;3012;Verkauf ADA Gebühren - cr",
    "0,09;S;4972;1210;3012;Verkauf ADA Gebühren - cr",
    "11984,25;H;1210;1360;3012;ZA-Kraken an Bank - cr",
    "11984,25;S;1200;1360;3012;ZE-Bank von Kraken - cr"
  ],
  "2304,80;S;1210;31;3012": [
    "2304,80;S;1210;31;3012;Verkauf ADA (passiv) - crt"
  ]
};
const _customDatevRows2023 = {
  //2023
  "15114,04;S;1210;1509;0901": [
    "15114,04;S;1210;1509;0901;Verkauf ADA (aktiv) - crt",
    "39,53;S;4972;1210;0901;Verkauf ADA Gebühren - cr",
    "0,09;S;4972;1210;0901;Verkauf ADA Gebühren - cr",
    "15162,37;H;1210;1360;0901;ZA-Kraken an Bank - cr",
    "15162,37;S;1200;1360;0901;ZE-Bank von Kraken - cr"
  ],
  "87,94;S;1210;31;0901": [
    "87,94;S;1210;31;0901;Verkauf ADA (passiv) - crt"
  ],
  "10949,87;S;1210;1509;1401": [
    "10949,87;S;1210;1509;1401;Verkauf ADA (aktiv) - crt",
    "40,61;S;4972;1210;1401;Verkauf ADA Gebühren - cr",
    "0,09;S;4972;1210;1401;Verkauf ADA Gebühren - cr",
    "16878,25;H;1210;1360;1401;ZA-Kraken an Bank - cr",
    "16878,25;S;1200;1360;1401;ZE-Bank von Kraken - cr"
  ],
  "5969,07;S;1210;31;1401": [
    "5969,07;S;1210;31;1401;Verkauf ADA (passiv) - crt"
  ],
  "17534,71;S;1210;1509;0902": [
    "17534,71;S;1210;1509;0902;Verkauf ADA (aktiv) - crt",
    "69,79;S;4972;1210;0902;Verkauf ADA Gebühren - cr",
    "0,09;S;4972;1210;0902;Verkauf ADA Gebühren - cr",
    "26771,49;H;1210;1360;0902;ZA-Kraken an Bank - cr",
    "26771,49;S;1200;1360;0902;ZE-Bank von Kraken - cr"
  ],
  "9306,66;S;1210;31;0902": [
    "9306,66;S;1210;31;0902;Verkauf ADA (passiv) - crt"
  ],
  "24633,60;S;1210;1509;0203": [
    "24633,60;S;1210;1509;0203;Verkauf ADA (aktiv) - crt",
    "86,02;S;4972;1210;0203;Verkauf ADA Gebühren - cr",
    "0,09;S;4972;1210;0203;Verkauf ADA Gebühren - cr",
    "33000,30;H;1210;1360;0203;ZA-Kraken an Bank - cr",
    "33000,30;S;1200;1360;0203;ZE-Bank von Kraken - cr"
  ],
  "8452,81;S;1210;31;0203": [
    "8452,81;S;1210;31;0203;Verkauf ADA (passiv) - crt"
  ],
  "13310,36;S;1210;1509;2803": [
    "13310,36;S;1210;1509;2803;Verkauf ADA (aktiv) - crt",
    "34,61;S;4972;1210;2803;Verkauf ADA Gebühren - cr",
    "0,09;S;4972;1210;2803;Verkauf ADA Gebühren - cr",
    "13275,66;H;1210;1360;2803;ZA-Kraken an Bank - cr",
    "13275,66;S;1200;1360;2803;ZE-Bank von Kraken - cr"
  ],
  "33220,93;S;1210;1509;1104": [
    "33220,93;S;1210;1509;1104;Verkauf ADA (aktiv) - crt",
    "86,37;S;4972;1210;1104;Verkauf ADA Gebühren - cr",
    "0,09;S;4972;1210;1104;Verkauf ADA Gebühren - cr",
    "33134,46;H;1210;1360;1104;ZA-Kraken an Bank - cr",
    "33134,46;S;1200;1360;1104;ZE-Bank von Kraken - cr"
  ],
  "31184,19;S;1210;1509;2805": [
    "31184,19;S;1210;1509;2805;Verkauf ADA (aktiv) - crt",
    "81,08;S;4972;1210;2805;Verkauf ADA Gebühren - cr",
    "1,00;S;4972;1210;2805;Verkauf ADA Gebühren - cr",
    "31102,11;H;1210;1360;2805;ZA-Kraken an Bank - cr",
    "31102,11;S;1200;1360;2805;ZE-Bank von Kraken - cr"
  ],
  "29099,52;S;1210;1509;0906": [
    "29099,52;S;1210;1509;0906;Verkauf ADA (aktiv) - crt",
    "75,66;S;4972;1210;0906;Verkauf ADA Gebühren - cr",
    "1,00;S;4972;1210;0906;Verkauf ADA Gebühren - cr",
    "29022,87;H;1210;1360;0906;ZA-Kraken an Bank - cr",
    "29022,87;S;1200;1360;0906;ZE-Bank von Kraken - cr"
  ],
  "32175,47;S;1210;1509;1407": [
    "32175,47;S;1210;1509;1407;Verkauf ADA (aktiv) - crt",
    "83,66;S;4972;1210;1407;Verkauf ADA Gebühren - cr",
    "1,00;S;4972;1210;1407;Verkauf ADA Gebühren - cr",
    "32090,81;H;1210;1360;1407;ZA-Kraken an Bank - cr",
    "32090,81;S;1200;1360;1407;ZE-Bank von Kraken - cr"
  ],
  "23809,31;S;1210;1509;0709": [
    "23809,31;S;1210;1509;0709;Verkauf ADA (aktiv) - crt",
    "351,86;S;4972;1210;0709;Verkauf ADA Gebühren - cr",
    "1,00;S;4972;1210;0709;Verkauf ADA Gebühren - cr",
    "23456,45;H;1210;1360;0709;ZA-Kraken an Bank - cr",
    "23456,45;S;1200;1360;0709;ZE-Bank von Kraken - cr"
  ],
  "24498,83;S;1210;1509;0410": [
    "24498,83;S;1210;1509;0410;Verkauf ADA (aktiv) - crt",
    "63,70;S;4972;1210;0410;Verkauf ADA Gebühren - cr",
    "1,00;S;4972;1210;0410;Verkauf ADA Gebühren - cr",
    "24434,13;H;1210;1360;0410;ZA-Kraken an Bank - cr",
    "24434,13;S;1200;1360;0410;ZE-Bank von Kraken - cr"
  ],
  "26062,66;S;1210;1509;2410": [
    "26062,66;S;1210;1509;2410;Verkauf ADA (aktiv) - crt",
    "67,76;S;4972;1210;2410;Verkauf ADA Gebühren - cr",
    "1,00;S;4972;1210;2410;Verkauf ADA Gebühren - cr",
    "25993,90;H;1210;1360;2410;ZA-Kraken an Bank - cr",
    "25993,90;S;1200;1360;2410;ZE-Bank von Kraken - cr"
  ],
  "22336,95;S;1210;1509;0611": [
    "22336,95;S;1210;1509;0611;Verkauf ADA (aktiv) - crt",
    "85,41;S;4972;1210;0611;Verkauf ADA Gebühren - cr",
    "1,00;S;4972;1210;0611;Verkauf ADA Gebühren - cr",
    "32763,88;H;1210;1360;0611;ZA-Kraken an Bank - cr",
    "32763,88;S;1200;1360;0611;ZE-Bank von Kraken - cr"
  ],
  "10513,35;S;1210;31;0611": [
    "10513,35;S;1210;31;0611;Verkauf ADA (passiv) - crt"
  ],
  "34465,42;S;1210;1509;1311": [
    "34465,42;S;1210;1509;1311;Verkauf ADA (aktiv) - crt",
    "82,72;S;4972;1210;1311;Verkauf ADA Gebühren - cr",
    "1,00;S;4972;1210;1311;Verkauf ADA Gebühren - cr",
    "34381,71;H;1210;1360;1311;ZA-Kraken an Bank - cr",
    "34381,71;S;1200;1360;1311;ZE-Bank von Kraken - cr"
  ],
  "23837,06;S;1210;1509;0812": [
    "23837,06;S;1210;1509;0812;Verkauf ADA (aktiv) - crt",
    "61,98;S;4972;1210;0812;Verkauf ADA Gebühren - cr",
    "1,00;S;4972;1210;0812;Verkauf ADA Gebühren - cr",
    "23774,08;H;1210;1360;0812;ZA-Kraken an Bank - cr",
    "23774,08;S;1200;1360;0812;ZE-Bank von Kraken - cr"
  ],
  "28957,14;S;1210;1509;1312": [
    "28957,14;S;1210;1509;1312;Verkauf ADA (aktiv) - crt",
    "69,50;S;4972;1210;1312;Verkauf ADA Gebühren - cr",
    "1,00;S;4972;1210;1312;Verkauf ADA Gebühren - cr",
    "28886,63;H;1210;1360;1312;ZA-Kraken an Bank - cr",
    "28886,63;S;1200;1360;1312;ZE-Bank von Kraken - cr"
  ]
};
const getCustomDatevRows = (year) => {
  const obj = {};
  if (year >= 2020) {
    convertCustomDatevRows(_customDatevRows2020, obj, 2020);
  }
  if (year >= 2021) {
    convertCustomDatevRows(_customDatevRows2021, obj, 2021);
  }
  if (year >= 2022) {
    convertCustomDatevRows(_customDatevRows2022, obj, 2022);
  }
  if (year >= 2023) {
    convertCustomDatevRows(_customDatevRows2023, obj, 2023);
  }
  return obj;
};

const createReportsCSVFile = (rowList, year, useLocalTimezone = false) => {
  getFormattedDate(/* @__PURE__ */ new Date());
  let csv = "";
  console.warn("createReportsCSVFile: Generating rowList", rowList);
  for (const row of rowList) {
    csv += getReportLine(row, true);
  }
  return csv;
};
const renderSortedRowList = (_rowList, type, typeLabel) => {
  let csv = "";
  let addedRow = false;
  let hideSectionIfEmpty = type === "deposit" || type === "cost basis" || type === "gain" || type === "loss" || type === "swap";
  for (let i = _rowList.length - 1; i >= 0; i--) {
    const row = _rowList[i];
    if (row.n !== type) {
      continue;
    }
    csv += getReportLine(row, true);
    _rowList.splice(i, 1);
    addedRow = true;
  }
  if (hideSectionIfEmpty && !addedRow) {
    return csv;
  }
  if (!addedRow) {
    csv += getEmptyLine(true);
  }
  csv += getEmptyLine(true);
  csv += getEmptyLine(true, typeLabel ?? type);
  csv += getEmptyLine(true);
  return csv;
};
const sortRowArrayByToken = (a, b) => {
  if (!a.info || !b.info) {
    return 0;
  }
  const auA = a.info.au ?? "";
  const auB = b.info.au ?? "";
  if (auB === auA) {
    return b.d.localeCompare(b.d);
  }
  return auB.localeCompare(auA);
};
const checkRowListEmpty = (_rowList) => {
  if (_rowList.length > 0) {
    console.error("createReportsSortedCSVFile: Some rows were not processed:", _rowList);
    alert("Some rows were not processed, please check console for details.");
  }
};
const createReportsSortedCSVFile = (rowList, year, useLocalTimezone = false) => {
  getFormattedDate(/* @__PURE__ */ new Date());
  let csv = '"Date";"ADA";"Amount in ADA";"EUR";"Price of Day in EUR";"Amount in EUR";"Type";"Reference";"Token amount";"Token name";"Token policyId";"Token hexname"';
  csv += "\n" + getEmptyLine();
  let _rowList = rowList.concat().reverse();
  const _typeListPart1 = ["rewards", "income", "outflow", "transaction fees", "deposit"];
  const _typeListPart2 = ["neutral"];
  const _typeListPart3 = ["pass-through", "cost basis", "gain", "loss", "sell", "buy"];
  const _typeListPart4 = ["swap"];
  const _typeListPart5 = ["token in"];
  const _typeListPart6 = ["token out"];
  const _rowListPart1 = _rowList.filter((r) => _typeListPart1.includes(r.n));
  const _rowListPart2 = _rowList.filter((r) => _typeListPart2.includes(r.n));
  console.log("_rowListPart2", _rowListPart2);
  const _rowNeutralIn = _rowListPart2.filter((r) => r.info && isGreaterThanZero(r.info.lv ?? 0));
  const _rowNeutralOut = _rowListPart2.filter((r) => r.info && isLessThanZero(r.info.lv ?? 0));
  const _rowListPart3 = _rowList.filter((r) => _typeListPart3.includes(r.n));
  const _rowListPart4 = _rowList.filter((r) => _typeListPart4.includes(r.n)).sort(sortRowArrayByToken);
  const _rowListPart5 = _rowList.filter((r) => _typeListPart5.includes(r.n)).sort(sortRowArrayByToken);
  const _rowListPart6 = _rowList.filter((r) => _typeListPart6.includes(r.n)).sort(sortRowArrayByToken);
  for (const type of _typeListPart1) {
    csv += renderSortedRowList(_rowListPart1, type);
  }
  for (const type of _typeListPart2) {
    csv += renderSortedRowList(_rowNeutralIn, type, "Neutral In");
  }
  for (const type of _typeListPart2) {
    csv += renderSortedRowList(_rowNeutralOut, type, "Neutral Out");
  }
  for (const type of _typeListPart3) {
    csv += renderSortedRowList(_rowListPart3, type);
  }
  for (const type of _typeListPart4) {
    csv += renderSortedRowList(_rowListPart4, type);
  }
  for (const type of _typeListPart5) {
    csv += renderSortedRowList(_rowListPart5, type);
  }
  for (const type of _typeListPart6) {
    csv += renderSortedRowList(_rowListPart6, type);
  }
  checkRowListEmpty(_rowListPart1);
  checkRowListEmpty(_rowNeutralIn);
  checkRowListEmpty(_rowNeutralOut);
  checkRowListEmpty(_rowListPart3);
  checkRowListEmpty(_rowListPart4);
  checkRowListEmpty(_rowListPart5);
  checkRowListEmpty(_rowListPart6);
  return csv;
};
const getEmptyLine = (addReferenceColumn = false, type = "") => {
  return (type ? `"${type}"` : "") + ";;;;;;;" + (addReferenceColumn ? ";" : "") + ";;;\n";
};
const getReportLine = (row, addReferenceColumn = false) => {
  let adaPD = "";
  let adaFV = "";
  let adaFU = "";
  let adaAmount = "";
  let adaAsset = "";
  let ref = "";
  let tokenAmount = "";
  let tokenTokenName = "";
  let tokenPolicyId = "";
  let tokenAssetName = "";
  if (row.info) {
    if (row.info.lv && !isZero(row.info.lv)) {
      adaAmount = getCSVADAAmount(divide(row.info.lv, "1000000"));
      adaAsset = "ADA";
      if (row.info.pd) {
        adaPD = getCSVAmount(row.info.pd, 5);
        adaFU = row.info.fu ?? "";
        adaFV = getCSVAmount2(bigToNum(multiply(divide(row.info.lv, "1000000"), row.info.pd)), 5);
      }
    }
    if (row.info.au) {
      const [policyId, assetName] = row.info.au.split(".");
      if (!(!policyId || typeof assetName !== "string")) {
        const ai = getAssetInfoCheck(policyId, assetName);
        tokenAmount = row.info.av;
        tokenTokenName = ai?.tr?.n ?? ai?.n ?? "";
        tokenPolicyId = policyId;
        tokenAssetName = assetName;
      }
      adaFU = row.info.fu ?? "";
      adaFV = row.a;
    }
    if (row.info.ref) {
      ref = row.info.ref.replace(/;/g, ",");
    }
  } else {
    adaFV = row.a;
  }
  return `${row.d};"${adaAsset}";${adaAmount};"${adaFU.toUpperCase()}";${adaPD};${adaFV};"${row.n}";` + (addReferenceColumn ? `"${ref}";` : "") + `${tokenAmount};"${tokenTokenName}";"${tokenPolicyId}";"${tokenAssetName}"
`;
};
const getFormattedDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const milliseconds = String(date.getMilliseconds()).padStart(3, "0");
  return `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
};

const _hoisted_1$3 = { class: "w-full col-span-8 flex flex-row et-jc-ic" };
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "PanelReportCreationLedgerList",
  props: {
    ledgerList: { type: Array, required: false, default: () => [] },
    displayConfig: {
      type: Object,
      required: false,
      default: void 0
    }
  },
  setup(__props) {
    const props = __props;
    const { ledgerList } = toRefs(props);
    const {
      getPaginatorTemplate
    } = useTheme();
    const { isSmallerThanSM } = useScreenSize();
    const list = computed(() => {
      const dc = props.displayConfig;
      const ledgerList2 = props.ledgerList;
      const list2 = [];
      for (let i = 0; i < ledgerList2.length; i++) {
        const cb = ledgerList2[i];
        if (dc) {
          const showRow = (cb.t === "p" && dc.showPassThrough.value || cb.t === "d" && dc.showDeposit.value || cb.t === "c" && dc.showDeposit.value || cb.t === "f" && dc.showTxFee.value || cb.t === "r" && dc.showRewards.value || cb.t === "i" && dc.showIncome.value || cb.t === "n" && dc.showNeutral.value || cb.t === "b" && dc.showBought.value) && (dc.showTokens.value || !dc.showTokens.value && !cb.au || cb.au && typeof cb.lv === "string" && !isZero(cb.lv));
          if (showRow) {
            list2.push(cb);
          }
        } else {
          list2.push(cb);
        }
      }
      return list2;
    });
    const {
      numItemsPerPage,
      numItems,
      numPages,
      page,
      onPageStateUpdate
    } = usePaginator(list, 10);
    return (_ctx, _cache) => {
      const _component_Paginator = resolveComponent("Paginator");
      return openBlock(), createElementBlock(Fragment, null, [
        unref(numItems) > 0 ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(unref(page), (cb, indexRow) => {
          return openBlock(), createBlock(_sfc_main$8, {
            cb,
            "is-last": indexRow === unref(numItemsPerPage) - 1,
            "display-config": __props.displayConfig,
            "hide-actions": ""
          }, null, 8, ["cb", "is-last", "display-config"]);
        }), 256)) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_1$3, [
          unref(numPages) > 1 ? (openBlock(), createBlock(_component_Paginator, {
            key: 0,
            class: "py-0",
            "page-link-size": unref(isSmallerThanSM) ? 3 : 5,
            template: unref(getPaginatorTemplate)(),
            rows: unref(numItemsPerPage),
            "total-records": unref(numItems),
            onPage: unref(onPageStateUpdate)
          }, null, 8, ["page-link-size", "template", "rows", "total-records", "onPage"])) : createCommentVNode("", true)
        ])
      ], 64);
    };
  }
});

const _hoisted_1$2 = { class: "grid-cell-left grid-cell-multi-line flex-nowrap! et-text-sm text-txt-muted" };
const _hoisted_2$2 = { class: "grid-cell-left grid-cell-single-line et-text-sm et-je" };
const _hoisted_3$2 = { class: "grid-cell-right grid-cell-single-line et-text-sm" };
const _hoisted_4$2 = { class: "grid-cell-left grid-cell-single-line" };
const _hoisted_5$2 = { class: "grid-cell-left grid-cell-single-line" };
const _hoisted_6$2 = { class: "grid-cell-right grid-cell-single-line et-js et-text-sm text-txt-muted" };
const _hoisted_7 = { class: "grid-cell-right grid-cell-single-line et-js et-text-sm text-txt-muted" };
const _hoisted_8 = { class: "w-full col-span-7 flex flex-row et-jc-ic" };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "PanelReportCreationLedgerDatev",
  props: {
    datevList: { type: Array, required: false, default: () => [] }
  },
  setup(__props) {
    const props = __props;
    const { datevList } = toRefs(props);
    const {
      getPaginatorTemplate
    } = useTheme();
    const { isSmallerThanSM } = useScreenSize();
    const {
      numItemsPerPage,
      numItems,
      numPages,
      page,
      onPageStateUpdate
    } = usePaginator(datevList, 50);
    return (_ctx, _cache) => {
      const _component_Paginator = resolveComponent("Paginator");
      return openBlock(), createElementBlock(Fragment, null, [
        unref(numItems) > 0 ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(unref(page), (row, indexRow) => {
          return openBlock(), createElementBlock(Fragment, null, [
            createBaseVNode("div", _hoisted_1$2, toDisplayString(row.d) + "-" + toDisplayString(row.y), 1),
            createBaseVNode("div", _hoisted_2$2, [
              createVNode(_sfc_main$p, {
                amount: row.a.replace(",", "."),
                "price-of-day": 1e6,
                "display-decimals": 2,
                "trim-fraction": true,
                compact: "",
                colored: ""
              }, null, 8, ["amount"])
            ]),
            createBaseVNode("div", _hoisted_3$2, [
              createVNode(_sfc_main$o, {
                size: "tiny",
                "add-colors": "",
                badge: { id: row.i, label: row.i, ...unref(getBadgeColors)(row.i) }
              }, null, 8, ["badge"])
            ]),
            createBaseVNode("div", _hoisted_4$2, [
              createVNode(_sfc_main$o, {
                size: "tiny",
                "add-colors": "",
                badge: { id: row.sh, label: row.sh, ...unref(getBadgeColors)(row.sh) }
              }, null, 8, ["badge"])
            ]),
            createBaseVNode("div", _hoisted_5$2, [
              createVNode(_sfc_main$o, {
                size: "tiny",
                "add-colors": "",
                badge: { id: row.o, label: row.o, ...unref(getBadgeColors)(row.o) }
              }, null, 8, ["badge"])
            ]),
            createBaseVNode("div", _hoisted_6$2, toDisplayString(row.n), 1),
            createBaseVNode("div", _hoisted_7, toDisplayString(row.info), 1)
          ], 64);
        }), 256)) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_8, [
          unref(numPages) > 1 ? (openBlock(), createBlock(_component_Paginator, {
            key: 0,
            class: "py-0",
            "page-link-size": unref(isSmallerThanSM) ? 3 : 5,
            template: unref(getPaginatorTemplate)(),
            rows: unref(numItemsPerPage),
            "total-records": unref(numItems),
            onPage: unref(onPageStateUpdate)
          }, null, 8, ["page-link-size", "template", "rows", "total-records", "onPage"])) : createCommentVNode("", true)
        ])
      ], 64);
    };
  }
});

const _hoisted_1$1 = { class: "w-full col-span-12" };
const _hoisted_2$1 = { class: "col-span-9 -mx-2 px-2 my-2 py-2 overflow-x-auto grid bg-bg-2 border-1 border-border-1 rounded-2xl grid-cols-[1px_minmax(8rem,min-content)_10rem_5rem_1fr_1fr_minmax(12rem,min-content)_minmax(12rem,min-content)_minmax(12rem,min-content)]" };
const _hoisted_3$1 = { class: "col-span-9 grid-divider" };
const _hoisted_4$1 = { class: "w-full flex flex-row et-jc-ic" };
const _hoisted_5$1 = { class: "col-span-9 -mx-2 px-2 my-2 py-2 overflow-x-auto grid bg-bg-2 border-1 border-border-1 rounded-2xl grid-cols-[1px_minmax(8rem,min-content)_10rem_5rem_1fr_1fr_minmax(12rem,min-content)_minmax(12rem,min-content)_minmax(12rem,min-content)]" };
const _hoisted_6$1 = { class: "-mx-2 px-2 my-2 py-2 overflow-x-auto grid bg-bg-2 border-1 border-border-1 rounded-2xl grid-cols-[minmax(7rem,min-content)_minmax(10rem,min-content)_minmax(5rem,min-content)_minmax(3rem,min-content)_minmax(5rem,min-content)_minmax(20rem,min-content)_1fr]" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "PanelReportCreation",
  setup(__props) {
    const $t = useTranslation().t;
    const {
      getPaginatorTemplate
    } = useTheme();
    const { isSmallerThanSM } = useScreenSize();
    const {
      year,
      maxSlotOfYear
    } = useReportTimeChanger();
    const showRewards = ref(true);
    const showTxFee = ref(true);
    const showNeutral = ref(true);
    const showIncome = ref(true);
    const showDeposit = ref(true);
    const showPassThrough = ref(true);
    const showTokens = ref(true);
    const showBought = ref(true);
    const showAllAssets = ref(true);
    const showData = ref("day");
    const displayConfig = computed(() => {
      return {
        showRewards,
        showTxFee,
        showNeutral,
        showIncome,
        showDeposit,
        showPassThrough,
        showTokens,
        showBought,
        showAllAssets,
        showData
      };
    });
    const inputRef = ref(null);
    const {
      doImport,
      doProcessReportFile
    } = useReportingImport(inputRef);
    const allData = getAllReportData();
    const reportData = computed(() => {
      const _entityId = selectedEntity.value?.name;
      if (!_entityId) {
        return void 0;
      }
      const data = allData[_entityId];
      if (!data) {
        return void 0;
      }
      return allData[_entityId];
    });
    const list = computed(() => {
      if (showData.value === "day") {
        return reportData.value?.dayList ?? [];
      }
      if (showData.value === "month") {
        return reportData.value?.monthList ?? [];
      }
      if (showData.value === "year") {
        return reportData.value?.yearList ?? [];
      }
      return [];
    });
    const {
      numItemsPerPage,
      numItems,
      numPages,
      page,
      onPageStateUpdate
    } = usePaginator(list, 10);
    const doSave = async () => {
      const entity = selectedEntity.value;
      if (!entity) {
        return;
      }
      const { downloadText } = useDownload();
      await downloadText(JSON.stringify(saveReportData(entity.name), null, 2), "report-data-" + entity.name + ".json");
    };
    const doReset = () => clearReportData();
    const _entityReports = ref();
    const doCreateReports = async () => {
      const entity = selectedEntity.value;
      if (!entity) {
        return;
      }
      _entityReports.value = await createReportData(entity, 0, maxSlotOfYear.value);
      console.warn("doCreateReports", _entityReports.value);
    };
    const doCalcLedger = async () => {
      const entity = selectedEntity.value;
      if (!entity) {
        return;
      }
      _entityReports.value = await createLedger(entity.name, entity.hasPassiveAccount ?? true, entity.has1YearTaxFree ?? false, getCustomDatevRows(year.value));
      console.warn("doCalcLedger", _entityReports.value);
    };
    const doExportDatev = async () => {
      const entity = selectedEntity.value;
      if (!entity) {
        return;
      }
      const reports = getReportData(entity.name);
      await loadMissingAssetInfo(reports);
      const rows = reports.datevRowList.filter((row) => row.y === year.value);
      const csv = createDatevCSVFile(rows, year.value);
      const { downloadText } = useDownload();
      let output = convertCSV(csv, reports.timezone);
      await downloadText(output, year.value + "-datev-csv-" + entity.name + ".csv");
    };
    const doJustCalcDatev = async () => {
      const entity = selectedEntity.value;
      if (!entity) {
        return;
      }
      const reports = getReportData(entity.name);
      await loadMissingAssetInfo(reports);
      const rows = reports.datevRowList.filter((row) => row.y === year.value);
      const datevAccountMap = {};
      for (const row of rows) {
        datevAccountMap[row.i];
        datevAccountMap[row.o];
        if (row.sh === "H") ;
      }
    };
    const doExportSortedCSV = async () => {
      const entity = selectedEntity.value;
      if (!entity) {
        return;
      }
      const reports = getReportData(entity.name);
      await loadMissingAssetInfo(reports);
      console.log("doExportSortedCSV", reports);
      const rows = reports.csvRowList.filter((row) => row.y === year.value);
      const csv = createReportsSortedCSVFile(rows, year.value);
      const { downloadText } = useDownload();
      let output = convertCSV(csv, reports.timezone);
      await downloadText(output, year.value + "-reports-csv-" + entity.name + "-sorted.csv");
    };
    const doExportPassthroughCSV = async () => {
      const entity = selectedEntity.value;
      if (!entity) {
        return;
      }
      const reports = getReportData(entity.name);
      await loadMissingAssetInfo(reports);
      console.log("doExportPassthroughCSV", reports);
      const rows = [];
      let info;
      for (const _cb of reports.ledgerPassThrough) {
        let amount = _cb.fv ?? 0;
        if (typeof _cb.au === "string") {
          info = { fu: _cb.fu, av: _cb.av, au: _cb.au, pd: _cb.pd ?? 0 };
        } else {
          info = { fu: _cb.fu, lv: _cb.av, pd: _cb.pd ?? 0 };
        }
        if (_cb.id) {
          info.ref = _cb.id;
          if (_cb.l) {
            info.ref += " - ";
          }
        }
        if (_cb.l) {
          if (info.ref) {
            info.ref += _cb.l;
          } else {
            info.ref = _cb.l;
          }
        }
        const row = getCSVRow(_cb, reports.timezone, amount, info, _cb.t);
        if (row) {
          rows.push(row);
        }
      }
      const csv = createReportsCSVFile(rows, year.value);
      const { downloadText } = useDownload();
      let output = convertCSV(csv, reports.timezone);
      await downloadText(output, year.value + "-reports-csv-" + entity.name + "-passthrough.csv");
    };
    const doExportCSV = async () => {
      const entity = selectedEntity.value;
      if (!entity) {
        return;
      }
      const reports = getReportData(entity.name);
      await loadMissingAssetInfo(reports);
      console.log("doExportCSV", reports);
      const rows = reports.csvRowList.filter((row) => row.y === year.value);
      const csv = createReportsCSVFile(rows, year.value);
      const { downloadText } = useDownload();
      let output = convertCSV(csv, reports.timezone);
      await downloadText(output, year.value + "-reports-csv-" + entity.name + ".csv");
    };
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_Divider = resolveComponent("Divider");
      const _component_divider = resolveComponent("divider");
      const _component_Paginator = resolveComponent("Paginator");
      const _component_Panel = resolveComponent("Panel");
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(_component_Panel, {
          class: "w-full rounded-2xl! border-1 border-gray/25",
          pt: {
            pctogglebutton: {
              root: "hover:bg-bg-app/20 outline-txt-1"
            }
          },
          toggleable: ""
        }, {
          header: withCtx(() => [
            createVNode(ButtonRow, {
              "align-left": "",
              class: "mr-2"
            }, {
              default: withCtx(() => [
                _cache[13] || (_cache[13] = createBaseVNode("div", { class: "w-full" }, "Reports", -1)),
                createVNode(_component_Button, {
                  label: "Create Reports",
                  size: "small",
                  severity: "secondary",
                  rounded: "",
                  outlined: "",
                  onClick: doCreateReports
                }),
                createVNode(_component_Button, {
                  label: "Save Reports",
                  size: "small",
                  severity: "secondary",
                  rounded: "",
                  outlined: "",
                  onClick: doSave
                }),
                createVNode(_component_Button, {
                  label: unref($t)("common:reset"),
                  size: "small",
                  severity: "secondary",
                  rounded: "",
                  outlined: "",
                  onClick: doReset
                }, null, 8, ["label"]),
                createVNode(_component_Button, {
                  label: unref($t)("common:import"),
                  size: "small",
                  severity: "secondary",
                  rounded: "",
                  outlined: "",
                  onClick: _cache[0] || (_cache[0] = ($event) => unref(doImport)(unref(doProcessReportFile)))
                }, null, 8, ["label"]),
                createVNode(_component_Button, {
                  label: "Calculate Ledger",
                  size: "small",
                  severity: "secondary",
                  rounded: "",
                  outlined: "",
                  onClick: doCalcLedger
                }),
                createVNode(_component_Button, {
                  label: "Just Calc DATEV",
                  size: "small",
                  severity: "secondary",
                  rounded: "",
                  outlined: "",
                  onClick: doJustCalcDatev
                }),
                createVNode(_component_Button, {
                  label: "Export DATEV",
                  size: "small",
                  severity: "secondary",
                  rounded: "",
                  outlined: "",
                  onClick: doExportDatev
                }),
                createVNode(_component_Button, {
                  label: "Export Sorted CSV",
                  size: "small",
                  severity: "secondary",
                  rounded: "",
                  outlined: "",
                  onClick: doExportSortedCSV
                }),
                createVNode(_component_Button, {
                  label: "Export CSV",
                  size: "small",
                  severity: "secondary",
                  rounded: "",
                  outlined: "",
                  onClick: doExportCSV
                }),
                createVNode(_component_Button, {
                  label: "Export Passthrough CSV",
                  size: "small",
                  severity: "secondary",
                  rounded: "",
                  outlined: "",
                  onClick: doExportPassthroughCSV
                }),
                createBaseVNode("input", {
                  type: "file",
                  id: "files",
                  name: "files[]",
                  multiple: "",
                  ref_key: "inputRef",
                  ref: inputRef,
                  hidden: ""
                }, null, 512)
              ]),
              _: 1
            })
          ]),
          default: withCtx(() => [
            createVNode(ButtonRow, {
              "align-right": "",
              class: "flex-wrap"
            }, {
              default: withCtx(() => [
                createVNode(_component_Button, {
                  label: "Rewards",
                  class: "col-span-2",
                  severity: showRewards.value ? "info" : "secondary",
                  rounded: "",
                  outlined: "",
                  size: "small",
                  onClick: _cache[1] || (_cache[1] = ($event) => showRewards.value = !showRewards.value)
                }, null, 8, ["severity"]),
                createVNode(_component_Button, {
                  label: "Income",
                  class: "col-span-2",
                  severity: showIncome.value ? "info" : "secondary",
                  rounded: "",
                  outlined: "",
                  size: "small",
                  onClick: _cache[2] || (_cache[2] = ($event) => showIncome.value = !showIncome.value)
                }, null, 8, ["severity"]),
                createVNode(_component_Button, {
                  label: "Tx Fees",
                  class: "col-span-2",
                  severity: showTxFee.value ? "info" : "secondary",
                  rounded: "",
                  outlined: "",
                  size: "small",
                  onClick: _cache[3] || (_cache[3] = ($event) => showTxFee.value = !showTxFee.value)
                }, null, 8, ["severity"]),
                createVNode(_component_Button, {
                  label: "Passthrough",
                  class: "col-span-2",
                  severity: showPassThrough.value ? "info" : "secondary",
                  rounded: "",
                  outlined: "",
                  size: "small",
                  onClick: _cache[4] || (_cache[4] = ($event) => showPassThrough.value = !showPassThrough.value)
                }, null, 8, ["severity"]),
                createVNode(_component_Button, {
                  label: "Tokens",
                  class: "col-span-2",
                  severity: showTokens.value ? "info" : "secondary",
                  rounded: "",
                  outlined: "",
                  size: "small",
                  onClick: _cache[5] || (_cache[5] = ($event) => showTokens.value = !showTokens.value)
                }, null, 8, ["severity"]),
                createVNode(_component_Button, {
                  label: "neutral",
                  class: "col-span-2",
                  severity: showNeutral.value ? "info" : "secondary",
                  rounded: "",
                  outlined: "",
                  size: "small",
                  onClick: _cache[6] || (_cache[6] = ($event) => showNeutral.value = !showNeutral.value)
                }, null, 8, ["severity"]),
                createVNode(_component_Button, {
                  label: "deposit",
                  class: "col-span-2",
                  severity: showDeposit.value ? "info" : "secondary",
                  rounded: "",
                  outlined: "",
                  size: "small",
                  onClick: _cache[7] || (_cache[7] = ($event) => showDeposit.value = !showDeposit.value)
                }, null, 8, ["severity"]),
                createVNode(_component_Button, {
                  label: "bought",
                  class: "col-span-2",
                  severity: showBought.value ? "info" : "secondary",
                  rounded: "",
                  outlined: "",
                  size: "small",
                  onClick: _cache[8] || (_cache[8] = ($event) => showBought.value = !showBought.value)
                }, null, 8, ["severity"]),
                createBaseVNode("div", _hoisted_1$1, [
                  createVNode(_component_Divider, { hr: "" })
                ]),
                createVNode(_component_Button, {
                  label: "Show Days",
                  class: "col-span-2",
                  severity: showData.value === "day" ? "info" : "secondary",
                  rounded: "",
                  outlined: "",
                  size: "small",
                  onClick: _cache[9] || (_cache[9] = ($event) => showData.value = "day")
                }, null, 8, ["severity"]),
                createVNode(_component_Button, {
                  label: "Show Months",
                  class: "col-span-2",
                  severity: showData.value === "month" ? "info" : "secondary",
                  rounded: "",
                  outlined: "",
                  size: "small",
                  onClick: _cache[10] || (_cache[10] = ($event) => showData.value = "month")
                }, null, 8, ["severity"]),
                createVNode(_component_Button, {
                  label: "Show Years",
                  class: "col-span-2",
                  severity: showData.value === "year" ? "info" : "secondary",
                  rounded: "",
                  outlined: "",
                  size: "small",
                  onClick: _cache[11] || (_cache[11] = ($event) => showData.value = "year")
                }, null, 8, ["severity"]),
                createVNode(_component_Button, {
                  class: "col-span-2",
                  severity: showAllAssets.value ? "info" : "secondary",
                  rounded: "",
                  outlined: "",
                  size: "small",
                  onClick: _cache[12] || (_cache[12] = ($event) => showAllAssets.value = !showAllAssets.value),
                  label: showAllAssets.value ? "Hide Assets" : "Show Assets"
                }, null, 8, ["severity", "label"])
              ]),
              _: 1
            }),
            createBaseVNode("div", _hoisted_2$1, [
              _cache[14] || (_cache[14] = createBaseVNode("div", { class: "grid-header-left" }, " ", -1)),
              _cache[15] || (_cache[15] = createBaseVNode("div", { class: "grid-header-left" }, "Date", -1)),
              _cache[16] || (_cache[16] = createBaseVNode("div", { class: "grid-header-left" }, " ", -1)),
              _cache[17] || (_cache[17] = createBaseVNode("div", { class: "grid-header-left" }, " ", -1)),
              _cache[18] || (_cache[18] = createBaseVNode("div", { class: "grid-header-left" }, "In/Out", -1)),
              _cache[19] || (_cache[19] = createBaseVNode("div", { class: "grid-header-left" }, "Type", -1)),
              _cache[20] || (_cache[20] = createBaseVNode("div", { class: "grid-header-right" }, "Price of day", -1)),
              _cache[21] || (_cache[21] = createBaseVNode("div", { class: "grid-header-right" }, "Fiat value", -1)),
              _cache[22] || (_cache[22] = createBaseVNode("div", { class: "grid-header-right" }, "Coin value", -1)),
              createBaseVNode("div", _hoisted_3$1, [
                createVNode(_component_divider, { class: "col-span-9 grid-divider" })
              ]),
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(page), (report) => {
                return openBlock(), createElementBlock(Fragment, null, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(report.in, (cb, indexRow) => {
                    return openBlock(), createBlock(_sfc_main$8, {
                      cb,
                      label: "in",
                      "display-config": displayConfig.value,
                      "is-last": indexRow === report.in.length - 1
                    }, null, 8, ["cb", "display-config", "is-last"]);
                  }), 256)),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(report.out, (cb, indexRow) => {
                    return openBlock(), createBlock(_sfc_main$8, {
                      cb,
                      label: "out",
                      "display-config": displayConfig.value,
                      "is-last": indexRow === report.out.length - 1
                    }, null, 8, ["cb", "display-config", "is-last"]);
                  }), 256)),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(report.rewards, (cb, indexRow) => {
                    return openBlock(), createBlock(_sfc_main$8, {
                      cb,
                      label: "rewards",
                      "display-config": displayConfig.value,
                      "is-last": indexRow === report.rewards.length - 1
                    }, null, 8, ["cb", "display-config", "is-last"]);
                  }), 256))
                ], 64);
              }), 256))
            ]),
            createBaseVNode("div", _hoisted_4$1, [
              unref(numPages) > 1 ? (openBlock(), createBlock(_component_Paginator, {
                key: 0,
                class: "py-0",
                "page-link-size": unref(isSmallerThanSM) ? 3 : 5,
                template: unref(getPaginatorTemplate)(),
                rows: unref(numItemsPerPage),
                "total-records": unref(numItems),
                onPage: unref(onPageStateUpdate)
              }, null, 8, ["page-link-size", "template", "rows", "total-records", "onPage"])) : createCommentVNode("", true)
            ])
          ]),
          _: 1
        }),
        createVNode(_component_Panel, {
          class: "w-full rounded-2xl! border-1 border-gray/25",
          pt: {
            pctogglebutton: {
              root: "hover:bg-bg-app/20 outline-txt-1"
            }
          },
          toggleable: ""
        }, {
          header: withCtx(() => [
            createVNode(ButtonRow, {
              "align-left": "",
              class: "mr-2"
            }, {
              default: withCtx(() => [..._cache[23] || (_cache[23] = [
                createBaseVNode("div", { class: "w-full" }, "Ledger", -1)
              ])]),
              _: 1
            })
          ]),
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_5$1, [
              _cache[29] || (_cache[29] = createBaseVNode("div", { class: "grid-header-left" }, " ", -1)),
              _cache[30] || (_cache[30] = createBaseVNode("div", { class: "grid-header-left" }, "Date", -1)),
              _cache[31] || (_cache[31] = createBaseVNode("div", { class: "grid-header-left" }, " ", -1)),
              _cache[32] || (_cache[32] = createBaseVNode("div", { class: "grid-header-left" }, " ", -1)),
              _cache[33] || (_cache[33] = createBaseVNode("div", { class: "grid-header-left" }, " ", -1)),
              _cache[34] || (_cache[34] = createBaseVNode("div", { class: "grid-header-left" }, "Type", -1)),
              _cache[35] || (_cache[35] = createBaseVNode("div", { class: "grid-header-right" }, "Price of day", -1)),
              _cache[36] || (_cache[36] = createBaseVNode("div", { class: "grid-header-right" }, "Fiat value", -1)),
              _cache[37] || (_cache[37] = createBaseVNode("div", { class: "grid-header-right" }, "Coin value", -1)),
              createVNode(_component_divider, { class: "col-span-9 grid-divider" }, {
                default: withCtx(() => [..._cache[24] || (_cache[24] = [
                  createBaseVNode("span", { class: "et-text-xs" }, "tax free", -1)
                ])]),
                _: 1
              }),
              createVNode(_component_divider, { class: "col-span-9 grid-divider" }, {
                default: withCtx(() => [..._cache[25] || (_cache[25] = [
                  createBaseVNode("span", { class: "et-text-xs" }, "tax-free", -1)
                ])]),
                _: 1
              }),
              createVNode(_sfc_main$3, {
                "ledger-list": reportData.value?.ledgerTaxFree,
                "display-config": displayConfig.value
              }, null, 8, ["ledger-list", "display-config"]),
              createVNode(_component_divider, { class: "col-span-9 grid-divider" }, {
                default: withCtx(() => [..._cache[26] || (_cache[26] = [
                  createBaseVNode("span", { class: "et-text-xs" }, "passive", -1)
                ])]),
                _: 1
              }),
              reportData.value?.ledgerPassive !== reportData.value?.ledgerActive ? (openBlock(), createBlock(_sfc_main$3, {
                key: 0,
                "ledger-list": reportData.value?.ledgerPassive,
                "display-config": displayConfig.value
              }, null, 8, ["ledger-list", "display-config"])) : createCommentVNode("", true),
              createVNode(_component_divider, { class: "col-span-9 grid-divider" }, {
                default: withCtx(() => [..._cache[27] || (_cache[27] = [
                  createBaseVNode("span", { class: "et-text-xs" }, "active", -1)
                ])]),
                _: 1
              }),
              createVNode(_sfc_main$3, {
                "ledger-list": reportData.value?.ledgerActive,
                "display-config": displayConfig.value
              }, null, 8, ["ledger-list", "display-config"]),
              createVNode(_component_divider, { class: "col-span-9 grid-divider" }, {
                default: withCtx(() => [..._cache[28] || (_cache[28] = [
                  createBaseVNode("span", { class: "et-text-xs" }, "pass-through", -1)
                ])]),
                _: 1
              }),
              createVNode(_sfc_main$3, {
                "ledger-list": reportData.value?.ledgerPassThrough,
                "display-config": displayConfig.value
              }, null, 8, ["ledger-list", "display-config"])
            ])
          ]),
          _: 1
        }),
        createVNode(_component_Panel, {
          class: "w-full rounded-2xl! border-1 border-gray/25",
          pt: {
            pctogglebutton: {
              root: "hover:bg-bg-app/20 outline-txt-1"
            }
          },
          toggleable: ""
        }, {
          header: withCtx(() => [
            createVNode(ButtonRow, {
              "align-left": "",
              class: "mr-2"
            }, {
              default: withCtx(() => [..._cache[38] || (_cache[38] = [
                createBaseVNode("div", { class: "w-full" }, "Datev", -1)
              ])]),
              _: 1
            })
          ]),
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_6$1, [
              createVNode(_sfc_main$2, {
                "datev-list": reportData.value?.datevRowList
              }, null, 8, ["datev-list"])
            ])
          ]),
          _: 1
        })
      ], 64);
    };
  }
});

const _hoisted_1 = { class: "page-staking flex flex-col" };
const _hoisted_2 = { class: "relative w-full flex flex-col et-js et-gap-md" };
const _hoisted_3 = { class: "" };
const _hoisted_4 = { class: "text-txt-muted" };
const _hoisted_5 = { class: "relative @container w-full flex flex-col et-js-is et-gap-md sm:et-gap-md" };
const _hoisted_6 = { class: "w-full flex flex-wrap et-gap-md" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PageReporting",
  setup(__props) {
    const $t = useTranslation().t;
    const {
      isSmallerThanXS} = useScreenSize();
    const {
      accountSettings
    } = useSelectedAccount();
    const { adaCurrency } = useAdaSymbol();
    accountSettings.hasStakeHistory;
    accountSettings.stakedPool;
    accountSettings.rewardHistory;
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createVNode(_sfc_main$v, {
            title: unref($t)("reporting-page:title"),
            animation: FxStakingHeader,
            animationClass: "absolut top-0 right-0 w-[45%] -translate-y-[15%]"
          }, createSlots({
            icon: withCtx(() => [
              createVNode(IconStakingOutline, { class: "size-5" })
            ]),
            _: 2
          }, [
            !unref(isSmallerThanXS) ? {
              name: "caption",
              fn: withCtx(() => [
                createBaseVNode("div", _hoisted_3, toDisplayString(unref($t)("reporting-page:caption", { currency: unref(adaCurrency) })), 1)
              ]),
              key: "0"
            } : void 0,
            !unref(isSmallerThanXS) ? {
              name: "sub-caption",
              fn: withCtx(() => [
                createBaseVNode("div", _hoisted_4, toDisplayString(unref($t)("reporting-page:subCaption")), 1)
              ]),
              key: "1"
            } : void 0
          ]), 1032, ["title"]),
          createBaseVNode("div", _hoisted_5, [
            createBaseVNode("div", _hoisted_6, [
              createVNode(_sfc_main$i, { class: "w-full max-w-90" }),
              createVNode(_sfc_main$h, { class: "w-full max-w-90" })
            ]),
            _cache[0] || (_cache[0] = createBaseVNode("div", { class: "min-w-full @4xl:min-w-200 grid grid-cols-2 et-gap-md" }, null, -1)),
            createVNode(_sfc_main$d),
            createVNode(_sfc_main$5),
            createVNode(_sfc_main$1),
            _cache[1] || (_cache[1] = createBaseVNode("div", { class: "w-full" }, "How to combine the received rewards?", -1)),
            _cache[2] || (_cache[2] = createBaseVNode("div", { class: "w-full" }, "Add more stake keys, because of Lace to have correct rewards data?", -1))
          ])
        ]),
        createVNode(_sfc_main$4)
      ]);
    };
  }
});

export { _sfc_main as default };
