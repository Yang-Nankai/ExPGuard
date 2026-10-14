import { aM as el, aN as sl, aU as decodeHex, as as createJsonFromCborJson, aV as now, d as defineComponent, w as useTranslation, e as ref, D as computed, P as networkId, G as watch, m as createElementBlock, o as openBlock, F as Fragment, n as createVNode, p as createBaseVNode, t as createCommentVNode, c as createBlock, u as unref, z as resolveComponent, y as withCtx, S as renderList, B as toDisplayString, aW as changeTimezone, H as createTextVNode, aO as withKeys, a6 as useRouter, x as useScreenSize, f as onMounted, $ as createSlots, l as useTheme, ae as isRef, ai as Transition, N as nextTick, aX as json } from './index.js';
import { j as add, c as compare, g as abs, m as multiply, i as isZero } from './bigmath.js';
import { T as AccountDB, U as createValueJSON, V as getAddressCredentials, W as getOwnedCred, z as addValueToValue, B as createIUtxo, X as getAssetIdBech32, Y as createITxBalance, Z as RefDB, _ as CertificateTypes, $ as loadUtxoCborFromTxList, a0 as loadUtxoByronList, a1 as getCSLTransactionOutput, a2 as getTransactionOutputJSONFromCSL, s as safeFreeCSLObject, a3 as createIUtxoFromIUtxoDetails, a4 as getUtxoHash, a5 as ITxBalanceType, a6 as getPendingTxList } from './app2.js';
import { u as useFormatter } from './useFormatter.js';
import { u as useSelectedAccount } from './useSelectedAccount.js';
import { b as numTxTotalAccount, c as numTxLoaded, i as isUpdating, d as numPages, n as numTxTotal, e as numItemsPerPage, f as first, g as currentPage, h as txListDatePage, s as searchTxList, j as txListPage } from './txHistory.js';
import { u as useTransactionSearchConfig, a as useModalTransactionExport } from './useModalTransactionExport.js';
import { u as useResetScroll } from './useResetScroll.js';
import { I as IconTransactionOutline } from './IconTransactionOutline.js';
import { _ as _sfc_main$8 } from './PageHeader.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$9 } from './TransactionItem.vue_vue_type_script_setup_true_lang.js';
import { g as getNetworkDecimals } from './NetworkId.js';
import { b as getCalculatedSlotFromBlockTime } from './chain.js';
import { b as appTimezone, a as appLanguageTag } from './language.js';
import { u as useAdaSymbol } from './useAdaSymbol.js';
import { u as useNotifications } from './useNotification.js';
import { u as useModalOpen } from './useModalOpen.js';
import { _ as _sfc_main$2 } from './InputSearch.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$6 } from './InputCoin.vue_vue_type_script_setup_true_lang.js';
import { B as ButtonRow } from './ButtonRow.js';
import { _ as _sfc_main$5 } from './FormattedAmount.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$3 } from './Modal.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$7 } from './ModalHeader.vue_vue_type_script_setup_true_lang.js';
import { M as ModalContentCard } from './ModalContentCard.js';
import { _ as _sfc_main$4 } from './BannerNeutral.vue_vue_type_script_setup_true_lang.js';
import './epochParams.js';
import './useAppAccountBalances.js';
import './history.js';
import './contractMapping.js';
import './_plugin-vue_export-helper.js';
import './TransactionItemHeader.vue_vue_type_script_setup_true_lang.js';
import './Badge.vue_vue_type_script_setup_true_lang.js';
import './image.js';
import './IconCancel01.js';
import './IconAlert02.js';
import './useAppMode.js';
import './TransactionItemMessages.vue_vue_type_script_setup_true_lang.js';
import './messageEncryption.js';
import './decryptedMsg.js';
import './IconSquareUnlock02.js';
import './chainTip.js';
import './useSignTx.js';
import './creds.js';
import './ErrorSignTx.js';
import './TransactionAssetList.vue_vue_type_script_setup_true_lang.js';
import './parse.js';
import './useModalAssetDetails.js';
import './useGuards.js';
import './useSubmitTx.js';
import './ErrorSubmitTx.js';
import './lib.js';
import './swap.js';
import './notification.js';
import './generateConfig.js';
import './govActionList.js';
import './MilkomedaDB.js';
import './IconArrowLB.js';
import './FiatAmount.vue_vue_type_script_setup_true_lang.js';
import './useCurrencyAPI.js';
import './currency2.js';
import './AdaAmount.vue_vue_type_script_setup_true_lang.js';
import './Badges.vue_vue_type_script_setup_true_lang.js';
import './IconSearch01.js';
import './index3.js';
import './useBalanceVisible.js';
import './index2.js';
import './IconInformationCircle.js';

const storeId = "txbalance";
const doLog = false;
const loadedUtxoCborMap = {};
const getITxBalanceType = (tx, txBalance, hasWithdrawal) => {
  let type = ITxBalanceType.uninitialized;
  if (hasWithdrawal) {
    type = type | ITxBalanceType.withdrawal;
  }
  if (txBalance.multiasset && Object.values(txBalance.multiasset).some((assets) => Object.values(assets).some((amount) => compare(amount, ">", 0)))) {
    type = type | ITxBalanceType.receivedTokens;
  }
  if (txBalance.multiasset && Object.values(txBalance.multiasset).some((assets) => Object.values(assets).some((amount) => compare(amount, "<", 0)))) {
    type = type | ITxBalanceType.sentTokens;
  }
  if (compare(abs(txBalance.coin), "==", tx.body.fee)) {
    type = type | ITxBalanceType.intraWallet;
  }
  if (compare(txBalance.coin, "<", 0)) {
    type = type | ITxBalanceType.sentAda;
  } else if (compare(txBalance.coin, ">", 0)) {
    if (!((type & ITxBalanceType.withdrawal) === ITxBalanceType.withdrawal)) {
      type = type | ITxBalanceType.receivedAda;
    }
  } else {
    type = type | ITxBalanceType.external;
  }
  return type;
};
const getSendITxBalance = async (networkId, accountId, tx) => {
  if (!tx) {
    return null;
  }
  const start = now();
  let time = start;
  try {
    const accountKeys = await AccountDB.getKeys(networkId, accountId);
    if (!accountKeys) {
      console.error(el(storeId), sl("getSendITxBalance"), "failed to fetch account keys");
      throw "failed to fetch account keys";
    }
    const _tx = {
      hash: tx.hash ?? "",
      slot: 0,
      idx: 0,
      block: 0,
      json: tx
    };
    await loadUnknownInputUtxos(networkId, accountId, getUnknownInputUtxoHashList(tx), tx.inputUtxoList);
    let debugCnt = 1;
    const balance = createValueJSON();
    const uniqueAddressSet = /* @__PURE__ */ new Set();
    let ownWithdrawals = null;
    if (tx.body.withdrawals) {
      for (const withdrawal of Object.entries(tx.body.withdrawals)) {
        const credentials = getAddressCredentials(withdrawal[0]);
        if (credentials.stakeCred && getOwnedCred([accountKeys], credentials.stakeCred, "stake")) {
          ownWithdrawals = add(ownWithdrawals ?? "0", withdrawal[1]);
        }
      }
    }
    if (ownWithdrawals) {
      addValueToValue(balance, { coin: ownWithdrawals }, true);
    }
    for (const input of tx.body.inputs) {
      const utxo = tx.inputUtxoList.find((utxo2) => utxo2.input.transaction_id === input.transaction_id && utxo2.input.index === input.index);
      if (!utxo) {
        console.warn(el(storeId), sl("getSendITxBalance"), `input details missing: hash=${input.transaction_id}, index=${input.index}`);
        continue;
      }
      if (utxo.pc.length > 0) {
        if (getOwnedCred([accountKeys], utxo.pc)) {
          addValueToValue(balance, utxo.output.amount, true);
        }
        uniqueAddressSet.add(utxo.pc);
      }
      uniqueAddressSet.add(utxo.output.address);
    }
    for (let i = 0; i < tx.body.outputs.length; i++) {
      const output = createIUtxo({ input: { transaction_id: _tx.hash, index: i }, output: tx.body.outputs[i] });
      if (output.pc.length > 0) {
        if (getOwnedCred([accountKeys], output.pc)) {
          addValueToValue(balance, output.output.amount);
        }
        uniqueAddressSet.add(output.pc);
      }
      uniqueAddressSet.add(output.output.address);
    }
    const uniqueAssetNameSet = /* @__PURE__ */ new Set();
    if (balance.multiasset) {
      for (const polidyId in balance.multiasset) {
        for (const assetName in balance.multiasset[polidyId]) {
          uniqueAssetNameSet.add(decodeHex(assetName));
          uniqueAssetNameSet.add(getAssetIdBech32(polidyId, assetName));
        }
      }
    }
    const txBalance = createITxBalance({ hash: _tx.hash, slot: _tx.slot, idx: _tx.idx });
    const refIdList = await RefDB.addRefList(networkId, accountId, Array.from(uniqueAddressSet).concat(Array.from(uniqueAssetNameSet)));
    txBalance.block = _tx.block;
    txBalance.coin = balance.coin;
    if (balance.multiasset) {
      txBalance.multiasset = balance.multiasset;
    }
    txBalance.c = Number(balance.coin);
    txBalance.t = getITxBalanceType(tx, txBalance, ownWithdrawals !== null);
    if ((tx.witness_set.native_scripts?.length ?? 0) > 0 || (tx.auxiliary_data?.native_scripts?.length ?? 0) > 0) {
      txBalance.n = true;
    }
    if (!!(tx.witness_set.plutus_data || tx.witness_set.plutus_scripts || tx.witness_set.redeemers || !!tx.auxiliary_data?.plutus_scripts)) {
      txBalance.p = true;
    }
    for (const cert of tx.body.certs ?? []) {
      const id = CertificateTypes.findIndex((type) => type === Object.keys(cert)[0]);
      if (id >= 0) {
        txBalance.cert ? txBalance.cert.push(id) : txBalance.cert = [id];
      } else {
        console.warn("getSendITxBalance: unknown certificate type: ", Object.keys(cert)[0]);
      }
    }
    for (const address of uniqueAddressSet) {
      const ref = refIdList.find((ref2) => ref2.ref === address);
      if (!ref) {
        throw Error("getSendITxBalance: address ref not found: " + address);
      }
      txBalance.al.push(ref.id);
    }
    for (const assetName of uniqueAssetNameSet) {
      const ref = refIdList.find((ref2) => ref2.ref === assetName);
      if (!ref?.id) {
        throw Error("getSendITxBalance: tag ref not found: " + assetName);
      }
      txBalance.tags ? txBalance.tags.push(ref.id) : txBalance.tags = [ref.id];
    }
    if (tx.auxiliary_data?.metadata) {
      const label674 = tx.auxiliary_data.metadata["674"];
      if (label674) {
        const msg = {};
        createJsonFromCborJson(JSON.parse(label674), msg);
        if (msg.msg && Array.isArray(msg.msg)) {
          txBalance.msg = msg.msg;
        }
        if (msg.enc && typeof msg.enc === "string") {
          txBalance.enc = msg.enc;
        }
      }
      for (const key of Object.keys(tx.auxiliary_data.metadata)) {
        txBalance.mk ? txBalance.mk.push(Number(key)) : txBalance.mk = [Number(key)];
      }
    }
    if (doLog) ;
    return txBalance;
  } catch (err) {
    console.error(el(storeId), sl("getSendITxBalance"), accountId, err);
    throw err;
  }
};
const getUnknownInputUtxoHashList = (tx) => {
  tx.inputUtxoList = tx.inputUtxoList ?? new Array();
  const inputHashSet = /* @__PURE__ */ new Set();
  for (const input of tx.body.reference_inputs ?? []) {
    inputHashSet.add(getUtxoHash(input));
  }
  for (const input of tx.body.collateral ?? []) {
    inputHashSet.add(getUtxoHash(input));
  }
  for (const input of tx.body.inputs ?? []) {
    inputHashSet.add(getUtxoHash(input));
  }
  for (const utxo of tx.inputUtxoList ?? []) {
    inputHashSet.delete(getUtxoHash(utxo.input));
  }
  return Array.from(inputHashSet);
};
const loadUnknownInputUtxos = async (networkId, accountId, inputHashList, inputUtxoList) => {
  const _inputHashList = inputHashList.concat();
  const inputUtxoCborList = [];
  for (let i = _inputHashList.length; i >= 0; i--) {
    const utxoCbor = loadedUtxoCborMap[_inputHashList[i]];
    if (utxoCbor) {
      inputUtxoCborList.push(utxoCbor);
      _inputHashList.splice(i, 1);
    }
  }
  if (_inputHashList.length > 0) {
    const loadedUtxoCborList = await loadUtxoCborFromTxList(networkId, accountId, _inputHashList);
    for (const cbor of loadedUtxoCborList) {
      inputUtxoCborList.push(cbor);
      loadedUtxoCborMap[cbor.hash] = cbor;
    }
  }
  let utxoByronList = null;
  if (inputUtxoCborList.length !== inputHashList.length) {
    const missingUtxoList = inputHashList.filter((i) => !inputUtxoCborList.some((cbor) => cbor.hash === i));
    const missingUtxoArr = new Array(missingUtxoList.length);
    for (let i = 0; i < missingUtxoList.length; i++) {
      missingUtxoArr[i] = missingUtxoList[i].split("#");
    }
    utxoByronList = await loadUtxoByronList(networkId, accountId, missingUtxoArr);
    if (!utxoByronList || inputUtxoCborList.length + utxoByronList.length !== inputHashList.length) {
      console.warn(el(storeId), sl("loadUnknownInputUtxos"), `incomplete cbor response compared to unknown input list:
        id=${accountId}, inputs=${inputHashList.length}, cbor=${inputUtxoCborList.length}, byron=${utxoByronList?.length ?? 0}`);
      return null;
    }
  }
  for (let i = 0; i < inputUtxoCborList.length; i++) {
    const inputArr = inputUtxoCborList[i].hash.split("#");
    const input = {
      transaction_id: inputArr[0],
      index: parseInt(inputArr[1])
    };
    const cslOutput = getCSLTransactionOutput(inputUtxoCborList[i].cbor);
    const output = getTransactionOutputJSONFromCSL(networkId, cslOutput);
    const utxo = createIUtxo({ input, output });
    inputUtxoList.push(utxo);
    safeFreeCSLObject(cslOutput);
  }
  for (const byronInput of utxoByronList ?? []) {
    inputUtxoList.push(createIUtxoFromIUtxoDetails(byronInput));
  }
};

const _hoisted_1$1 = { class: "flex et-je" };
const _hoisted_2$1 = {
  key: 0,
  class: "w-full flex flex-row et-gap-sm"
};
const _hoisted_3$1 = { class: "flex flex-row et-gap-sm et-jc-ic" };
const _hoisted_4$1 = { key: 0 };
const _hoisted_5$1 = { key: 1 };
const _hoisted_6$1 = { key: 2 };
const _hoisted_7$1 = { key: 3 };
const _hoisted_8$1 = { class: "flex flex-row et-gap-sm et-jc-ic" };
const _hoisted_9$1 = { key: 1 };
const _hoisted_10$1 = { key: 3 };
const _hoisted_11$1 = { class: "col-span-2 flex flex-col et-jc-is et-gap-xs sm:et-gap-sm" };
const _hoisted_12$1 = { class: "flex flex-row et-gap-sm" };
const _hoisted_13$1 = { class: "col-span-2 2xs:col-span-1 flex flex-col et-jc-is et-gap-xs sm:et-gap-sm" };
const _hoisted_14$1 = { class: "relative w-full" };
const _hoisted_15$1 = {
  for: "input-start-date",
  class: "pl-1"
};
const _hoisted_16 = { class: "col-span-2 2xs:col-span-1 flex flex-col et-jc-is et-gap-xs sm:et-gap-sm" };
const _hoisted_17 = { class: "relative w-full" };
const _hoisted_18 = {
  for: "input-end-date",
  class: "pl-1"
};
const _hoisted_19 = { class: "col-span-2 2xs:col-span-1 flex flex-col et-jc-is et-gap-xs sm:et-gap-sm" };
const _hoisted_20 = { class: "col-span-2 2xs:col-span-1 flex flex-col et-jc-is et-gap-xs sm:et-gap-sm" };
const _hoisted_21 = {
  key: 2,
  class: "col-span-12 flex flex-row flex-nowrap whitespace-pre-wrap"
};
const _hoisted_22 = { class: "flex flex-wrap et-ic" };
const _hoisted_23 = { key: 0 };
const _hoisted_24 = { key: 0 };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "TransactionListFilters",
  props: {
    isUpdating: { type: Boolean, required: false, default: false }
  },
  setup(__props) {
    const $t = useTranslation().t;
    const { adaCurrency } = useAdaSymbol();
    const { showInfo } = useNotifications();
    const {
      showModal,
      onClose,
      doOpen
    } = useModalOpen();
    const {
      formatDatetime,
      getDecimalNumber,
      getNumberFormatSeparators,
      truncateAddress
    } = useFormatter();
    const { accountSettings } = useSelectedAccount();
    const {
      isHistorySyncEnabled,
      toggleHistorySync
    } = accountSettings;
    const {
      config,
      hasActiveFilter,
      hasCoinLowFilter,
      hasCoinHighFilter,
      createTxSearchConfig
    } = useTransactionSearchConfig();
    const {
      openModalTransactionExport
    } = useModalTransactionExport();
    const startDate = ref(null);
    const maxDate = ref(/* @__PURE__ */ new Date());
    const endDate = ref();
    const endDateChanged = ref(false);
    const changeEndDate = (date) => {
      endDateChanged.value = true;
    };
    const needFullSync = computed(() => numTxTotalAccount.value !== numTxLoaded.value);
    const networkDecimals = computed(() => getNetworkDecimals(networkId.value));
    const enableHistorySync = async () => {
      await toggleHistorySync();
      showInfo($t("tx-page:sync.progress"));
    };
    const decimalNumber = getDecimalNumber();
    let formatSeparators = getNumberFormatSeparators();
    const decimalSeparator = ref(formatSeparators.decimal);
    const groupSeparator = ref(formatSeparators.group);
    const minusSign = ref(formatSeparators.minusSign);
    watch(appLanguageTag, () => {
      formatSeparators = getNumberFormatSeparators();
      decimalSeparator.value = formatSeparators.decimal;
      groupSeparator.value = formatSeparators.group;
      minusSign.value = formatSeparators.minusSign;
      onFilterReset();
    }, { deep: true });
    const filterError = ref("");
    const startDateSet = computed(() => startDate.value !== null);
    const fInputMin = ref(null);
    const fInputMax = ref(null);
    const fInputMinLovelace = ref(null);
    const fInputMaxLovelace = ref(null);
    const filterSearchInput = ref("");
    let preventUpdate = false;
    let _toid = -1;
    const onUpdateMinAmount = (valueWithDecimals) => {
      fInputMin.value = valueWithDecimals ?? null;
      if (!valueWithDecimals || valueWithDecimals === 0) {
        fInputMinLovelace.value = null;
      } else {
        fInputMinLovelace.value = multiply(valueWithDecimals, decimalNumber);
      }
    };
    const onUpdateMaxAmount = (valueWithDecimals) => {
      fInputMax.value = valueWithDecimals ?? null;
      if (!valueWithDecimals || valueWithDecimals === 0) {
        fInputMaxLovelace.value = null;
      } else {
        fInputMaxLovelace.value = multiply(valueWithDecimals, decimalNumber);
      }
    };
    const clearDateRangeFilter = () => {
      startDate.value = null;
      endDate.value = null;
      onFilterSubmit(0);
    };
    const doRemoveCoinFilter = () => {
      onUpdateMinAmount();
      onUpdateMaxAmount();
      onFilterSubmit(0);
    };
    const doRemoveSearchStrFilter = (index) => {
      config.value.searchStrList.splice(index, 1);
      if (!showModal.value) {
        onFilterSubmit(0);
      }
    };
    const onEnterTxFilter = () => {
      const str = filterSearchInput.value;
      preventUpdate = true;
      filterSearchInput.value = "";
      if (str.length > 0 && !config.value.searchStrList.includes(str)) {
        config.value.searchStrList.push(str);
      }
    };
    const onFilterReset = () => {
      clearDateRangeFilter();
      onUpdateMinAmount();
      onUpdateMaxAmount();
      filterSearchInput.value = "";
      endDateChanged.value = false;
      config.value = createTxSearchConfig();
    };
    const onFilterSubmit = (delay = 500) => {
      clearTimeout(_toid);
      const _searchConfig = createTxSearchConfig();
      if (fInputMinLovelace.value) {
        _searchConfig.coinLow = Number(fInputMinLovelace.value);
      }
      if (fInputMaxLovelace.value) {
        _searchConfig.coinHigh = Number(fInputMaxLovelace.value);
        if (_searchConfig.coinLow && _searchConfig.coinHigh < _searchConfig.coinLow) {
          _searchConfig.coinHigh = _searchConfig.coinLow;
        }
      }
      if (startDateSet.value || endDate.value) {
        if (startDate.value) {
          const from = changeTimezone(startDate.value, appTimezone.value);
          _searchConfig.slotStart = getCalculatedSlotFromBlockTime(networkId.value, from.getTime());
        }
        if (endDate.value) {
          const to = changeTimezone(endDate.value, appTimezone.value);
          _searchConfig.slotEnd = getCalculatedSlotFromBlockTime(networkId.value, to.getTime());
        }
      }
      if (filterSearchInput.value && filterSearchInput.value.length > 0) {
        _searchConfig.searchStr = filterSearchInput.value.trim();
      }
      _searchConfig.searchStrList = config.value.searchStrList;
      _toid = setTimeout(() => {
        config.value = _searchConfig;
      }, delay);
    };
    watch(startDate, (event) => {
      if ((!endDate.value || !endDateChanged.value) && startDate.value) {
        const tmp = /* @__PURE__ */ new Date();
        tmp.setTime(startDate.value.getTime());
        tmp.setDate(tmp.getDate() + 1);
        endDate.value = tmp;
      }
    });
    watch(filterSearchInput, () => {
      if (!preventUpdate && !showModal.value) {
        onFilterSubmit();
      }
      preventUpdate = false;
    });
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_Chip = resolveComponent("Chip");
      const _component_DatePicker = resolveComponent("DatePicker");
      const _component_FloatLabel = resolveComponent("FloatLabel");
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(_sfc_main$2, {
          class: "w-full 2xs:w-auto 2xs:grow",
          input: filterSearchInput.value,
          "onUpdate:input": _cache[0] || (_cache[0] = ($event) => filterSearchInput.value = $event),
          "show-spinner": __props.isUpdating,
          placeholder: unref($t)("tx-page:filter.search"),
          onEnter: onEnterTxFilter
        }, null, 8, ["input", "show-spinner", "placeholder"]),
        createBaseVNode("div", _hoisted_1$1, [
          createVNode(_component_Button, {
            label: unref($t)("tx-page:filter.more"),
            severity: unref(hasActiveFilter) ? "primary" : "secondary",
            outlined: !unref(hasActiveFilter),
            rounded: "",
            onClick: unref(doOpen)
          }, null, 8, ["label", "severity", "outlined", "onClick"])
        ]),
        !!startDate.value || !!endDate.value || unref(hasCoinLowFilter) || unref(hasCoinHighFilter) || unref(config).searchStrList.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_2$1, [
          !!startDate.value || !!endDate.value ? (openBlock(), createBlock(_component_Chip, {
            key: 0,
            removable: "",
            onRemove: clearDateRangeFilter
          }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_3$1, [
                !!startDate.value ? (openBlock(), createElementBlock("div", _hoisted_4$1, toDisplayString(unref(formatDatetime)(startDate.value, true, true)), 1)) : (openBlock(), createElementBlock("div", _hoisted_5$1, "∞")),
                _cache[8] || (_cache[8] = createTextVNode(" - ", -1)),
                !!endDate.value ? (openBlock(), createElementBlock("div", _hoisted_6$1, toDisplayString(unref(formatDatetime)(endDate.value, true, true)), 1)) : (openBlock(), createElementBlock("div", _hoisted_7$1, "∞"))
              ])
            ]),
            _: 1
          })) : createCommentVNode("", true),
          unref(hasCoinLowFilter) || unref(hasCoinHighFilter) ? (openBlock(), createBlock(_component_Chip, {
            key: 1,
            removable: "",
            onRemove: doRemoveCoinFilter
          }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_8$1, [
                unref(hasCoinLowFilter) ? (openBlock(), createBlock(_sfc_main$5, {
                  key: 0,
                  amount: unref(config).coinLow.toString(),
                  "with-sign": false,
                  "trim-fraction": ""
                }, null, 8, ["amount"])) : (openBlock(), createElementBlock("div", _hoisted_9$1, "∞")),
                _cache[9] || (_cache[9] = createTextVNode(" - ", -1)),
                unref(hasCoinHighFilter) ? (openBlock(), createBlock(_sfc_main$5, {
                  key: 2,
                  amount: unref(config).coinHigh.toString(),
                  "with-sign": false,
                  "trim-fraction": ""
                }, null, 8, ["amount"])) : (openBlock(), createElementBlock("div", _hoisted_10$1, "∞"))
              ])
            ]),
            _: 1
          })) : createCommentVNode("", true),
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(config).searchStrList, (searchStr, index) => {
            return openBlock(), createBlock(_component_Chip, {
              key: searchStr,
              label: unref(truncateAddress)(searchStr, 16),
              removable: "",
              onRemove: ($event) => doRemoveSearchStrFilter(index)
            }, null, 8, ["label", "onRemove"]);
          }), 128))
        ])) : createCommentVNode("", true),
        unref(showModal) ? (openBlock(), createBlock(_sfc_main$3, {
          key: 1,
          narrow: "",
          "full-width-on-mobile": "",
          onClose: _cache[7] || (_cache[7] = ($event) => {
            onFilterSubmit(0);
            unref(onClose)();
          })
        }, {
          header: withCtx(({ handleClose }) => [
            createVNode(_sfc_main$7, {
              headline: unref($t)("tx-page:filter.title"),
              caption: unref($t)("tx-page:filter.caption"),
              "hide-back": "",
              "hide-info": "",
              showClose: "",
              onClose: ($event) => handleClose()
            }, null, 8, ["headline", "caption", "onClose"])
          ]),
          content: withCtx(({ handleClose }) => [
            createVNode(ModalContentCard, { class: "grid grid-cols-2 et-gap-md sm:et-gap-lg" }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_11$1, [
                  createVNode(_sfc_main$2, {
                    input: filterSearchInput.value,
                    "onUpdate:input": _cache[1] || (_cache[1] = ($event) => filterSearchInput.value = $event),
                    "show-spinner": __props.isUpdating,
                    placeholder: unref($t)("tx-page:filter.search"),
                    onEnter: onEnterTxFilter
                  }, null, 8, ["input", "show-spinner", "placeholder"]),
                  createBaseVNode("div", _hoisted_12$1, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(unref(config).searchStrList, (searchStr, index) => {
                      return openBlock(), createBlock(_component_Chip, {
                        key: searchStr,
                        label: unref(truncateAddress)(searchStr, 16),
                        removable: "",
                        onRemove: ($event) => doRemoveSearchStrFilter(index)
                      }, null, 8, ["label", "onRemove"]);
                    }), 128))
                  ])
                ]),
                createBaseVNode("div", _hoisted_13$1, [
                  createBaseVNode("div", _hoisted_14$1, [
                    createVNode(_component_FloatLabel, {
                      class: "w-full",
                      variant: "on"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_DatePicker, {
                          modelValue: startDate.value,
                          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => startDate.value = $event),
                          class: "w-full",
                          pt: { pcinputtext: { root: "rounded-full" } },
                          inputId: "startDate",
                          showIcon: "",
                          showButtonBar: "",
                          manualInput: "",
                          showTime: "",
                          hourFormat: "24",
                          iconDisplay: "input",
                          variant: "filled",
                          maxDate: maxDate.value
                        }, null, 8, ["modelValue", "maxDate"]),
                        createBaseVNode("label", _hoisted_15$1, toDisplayString(unref($t)("tx-page:filter.date-range.start")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                createBaseVNode("div", _hoisted_16, [
                  createBaseVNode("div", _hoisted_17, [
                    createVNode(_component_FloatLabel, {
                      class: "w-full",
                      variant: "on"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_DatePicker, {
                          modelValue: endDate.value,
                          "onUpdate:modelValue": [
                            _cache[3] || (_cache[3] = ($event) => endDate.value = $event),
                            changeEndDate
                          ],
                          class: "w-full",
                          pt: { pcinputtext: { root: "rounded-full" } },
                          inputId: "endDate",
                          showIcon: "",
                          showButtonBar: "",
                          manualInput: "",
                          showTime: "",
                          hourFormat: "24",
                          iconDisplay: "input",
                          variant: "filled",
                          maxDate: maxDate.value
                        }, null, 8, ["modelValue", "maxDate"]),
                        createBaseVNode("label", _hoisted_18, toDisplayString(unref($t)("tx-page:filter.date-range.end")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                createBaseVNode("div", _hoisted_19, [
                  createVNode(_sfc_main$6, {
                    model: fInputMin.value,
                    "onUpdate:model": [
                      _cache[4] || (_cache[4] = ($event) => fInputMin.value = $event),
                      onUpdateMinAmount
                    ],
                    "min-coin-input": 0,
                    "asset-decimals": networkDecimals.value,
                    label: unref($t)("tx-page:filter.minada", { adaCurrency: unref(adaCurrency) }),
                    onKeydown: withKeys(($event) => handleClose(), ["enter"])
                  }, null, 8, ["model", "asset-decimals", "label", "onKeydown"])
                ]),
                createBaseVNode("div", _hoisted_20, [
                  createVNode(_sfc_main$6, {
                    model: fInputMax.value,
                    "onUpdate:model": [
                      _cache[5] || (_cache[5] = ($event) => fInputMax.value = $event),
                      onUpdateMaxAmount
                    ],
                    "min-coin-input": 0,
                    "asset-decimals": networkDecimals.value,
                    label: unref($t)("tx-page:filter.maxada", { adaCurrency: unref(adaCurrency) }),
                    onKeydown: withKeys(($event) => handleClose(), ["enter"])
                  }, null, 8, ["model", "asset-decimals", "label", "onKeydown"])
                ])
              ]),
              _: 2
            }, 1024)
          ]),
          footer: withCtx(({ handleClose }) => [
            createVNode(ButtonRow, null, {
              default: withCtx(() => [
                createVNode(_component_Button, {
                  label: unref($t)("tx-page:filter.downloadCSV"),
                  severity: "secondary",
                  rounded: "",
                  outlined: "",
                  onClick: unref(openModalTransactionExport)
                }, null, 8, ["label", "onClick"]),
                createVNode(_component_Button, {
                  label: unref($t)("common:reset"),
                  severity: "secondary",
                  onClick: _cache[6] || (_cache[6] = ($event) => onFilterReset()),
                  outlined: "",
                  rounded: ""
                }, null, 8, ["label"]),
                createVNode(_component_Button, {
                  label: unref($t)("common:apply"),
                  onClick: ($event) => handleClose(),
                  rounded: ""
                }, null, 8, ["label", "onClick"])
              ]),
              _: 2
            }, 1024)
          ]),
          _: 1
        })) : createCommentVNode("", true),
        filterError.value ? (openBlock(), createElementBlock("div", _hoisted_21, toDisplayString(filterError.value), 1)) : createCommentVNode("", true),
        needFullSync.value ? (openBlock(), createBlock(_sfc_main$4, {
          key: 3,
          headline: unref($t)("tx-page:sync.line1"),
          caption: unref($t)("tx-page:sync.line2")
        }, {
          caption: withCtx(() => [
            createBaseVNode("div", _hoisted_22, [
              unref(isHistorySyncEnabled) ? (openBlock(), createElementBlock("span", _hoisted_23, [
                createTextVNode(toDisplayString(unref($t)("tx-page:sync.loading")) + " (" + toDisplayString(unref(numTxLoaded)) + " / " + toDisplayString(unref(numTxTotalAccount)) + ").", 1),
                _cache[10] || (_cache[10] = createBaseVNode("br", null, null, -1)),
                createBaseVNode("span", null, toDisplayString(unref($t)("tx-page:sync.awhile")), 1)
              ])) : createCommentVNode("", true)
            ]),
            createBaseVNode("div", null, toDisplayString(unref($t)("tx-page:sync.line2")), 1),
            !unref(isHistorySyncEnabled) ? (openBlock(), createElementBlock("div", _hoisted_24, toDisplayString(unref($t)("tx-page:sync.autosync")), 1)) : createCommentVNode("", true),
            createVNode(_component_Button, {
              label: (!unref(isHistorySyncEnabled) ? unref($t)("common:enable") : unref($t)("common:disable")) + " " + unref($t)("tx-page:sync.history"),
              severity: "secondary",
              class: "mt-4",
              rounded: "",
              outlined: "",
              onClick: enableHistorySync
            }, null, 8, ["label"])
          ]),
          _: 1
        }, 8, ["headline", "caption"])) : createCommentVNode("", true)
      ], 64);
    };
  }
});

const _hoisted_1 = { class: "page-transaction-list flex flex-col et-max-width-page" };
const _hoisted_2 = { class: "relative w-full flex flex-col et-js et-gap-md" };
const _hoisted_3 = { class: "" };
const _hoisted_4 = { key: 0 };
const _hoisted_5 = { class: "text-txt-muted" };
const _hoisted_6 = {
  key: 0,
  class: "relative w-full flex flex-col 2xs:flex-row flex-wrap et-gap-sm 2xs:et-gap-md 2xs:max-w-2xl transition-all"
};
const _hoisted_7 = { class: "text-center" };
const _hoisted_8 = {
  key: 2,
  class: "w-full flex flex-col et-jc-ic sm:et-jc-is et-gap-sm"
};
const _hoisted_9 = {
  key: 0,
  class: "mt-2 flex flex-col et-gap-md"
};
const _hoisted_10 = {
  key: 0,
  class: "flex flex-col et-gap-sme"
};
const _hoisted_11 = {
  key: 0,
  class: "ml-3 -mb-1 et-text-sm"
};
const _hoisted_12 = { class: "flex flex-col et-gap-sme" };
const _hoisted_13 = { class: "ml-4 -mb-1 et-text-sm" };
const _hoisted_14 = { key: 1 };
const _hoisted_15 = { class: "w-full flex et-jc-ic sm:et-js-ic" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PageTransactionList",
  setup(__props) {
    const router = useRouter();
    const $t = useTranslation().t;
    const { formatTimeAndDate } = useFormatter();
    const {
      isSmallerThanSM,
      isSmallerThanXS
    } = useScreenSize();
    const {
      getPaginatorTemplate
    } = useTheme();
    const {
      selectedWalletId,
      selectedAccountId,
      accountData
    } = useSelectedAccount();
    const {
      config,
      hasActiveFilter
    } = useTransactionSearchConfig();
    const selectedTransaction = ref();
    const pendingTxList = getPendingTxList();
    const pendingTxBalanceList = ref([]);
    const pendingMap = {};
    let searchConfig = null;
    const onTxFilterUpdate = async () => {
      if (isUpdating.value) {
        return;
      }
      if (hasActiveFilter.value && searchConfig) {
        await searchTxList(json(searchConfig));
      } else {
        await searchTxList(null);
      }
      if (numTxTotal.value > 0) {
        const first2 = txListPage.value[0];
        if (first2) {
          handleSelectTransaction(first2);
        }
      } else {
        selectedTransaction.value = void 0;
      }
    };
    const handleSelectTransaction = (tx) => {
      selectedTransaction.value = tx;
    };
    const updatePage = (page) => {
      nextTick(() => {
        setCurrentPage(page);
      });
    };
    const setPageFromUrl = () => {
      const queryPage = router.currentRoute.value.query["p"];
      if (queryPage) {
        updatePage(parseInt(queryPage));
      }
    };
    const setCurrentPage = (page) => {
      currentPage.value = page;
    };
    const onPageStateUpdateTop = (pageState) => {
      setCurrentPage(pageState.page + 1);
    };
    const onPageStateUpdateBottom = (pageState) => {
      setCurrentPage(pageState.page + 1);
      setTimeout(() => {
        useResetScroll().scrollDown();
      }, 200);
    };
    watch(config, (newValue) => {
      searchConfig = newValue;
      nextTick(() => {
        onTxFilterUpdate();
      });
    });
    async function checkPendingTx() {
      const list = [];
      if (!accountData.value) {
        pendingTxBalanceList.value = list;
        return;
      }
      pendingTxList.value.sort((a, b) => b.time - a.time);
      for (const pendingTx of pendingTxList.value) {
        pendingMap[pendingTx.hash] = pendingTx;
        const txBalance = await getSendITxBalance(accountData.value.state.networkId, accountData.value.account.id, pendingTx);
        if (txBalance && !isZero(txBalance.coin)) {
          list.push(txBalance);
        }
      }
      pendingTxBalanceList.value = list;
    }
    watch(pendingTxList, () => {
      checkPendingTx();
    });
    watch(accountData, () => {
      checkPendingTx();
    }, { immediate: true });
    onMounted(async () => {
      setPageFromUrl();
    });
    return (_ctx, _cache) => {
      const _component_Card = resolveComponent("Card");
      const _component_Paginator = resolveComponent("Paginator");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createVNode(_sfc_main$8, {
            title: unref($t)("tx-page:title")
          }, createSlots({
            icon: withCtx(() => [
              createVNode(IconTransactionOutline, { class: "size-5 stroke-txt-0" })
            ]),
            _: 2
          }, [
            !unref(isSmallerThanXS) ? {
              name: "caption",
              fn: withCtx(() => [
                createBaseVNode("div", _hoisted_3, [
                  createTextVNode(toDisplayString(unref($t)("tx-page:caption", { numTxTotal: unref(numTxTotal) })) + " ", 1),
                  unref(numTxLoaded) !== unref(numTxTotal) ? (openBlock(), createElementBlock("span", _hoisted_4, " (" + toDisplayString(unref(numTxLoaded) + " " + unref($t)("common:loaded")) + ")", 1)) : createCommentVNode("", true)
                ])
              ]),
              key: "0"
            } : void 0,
            !unref(isSmallerThanXS) ? {
              name: "sub-caption",
              fn: withCtx(() => [
                createBaseVNode("div", _hoisted_5, toDisplayString(unref($t)("tx-page:subCaption")), 1)
              ]),
              key: "1"
            } : void 0
          ]), 1032, ["title"]),
          unref(numTxTotalAccount) !== 0 ? (openBlock(), createElementBlock("div", _hoisted_6, [
            createVNode(_sfc_main$1, { "is-updating": unref(isUpdating) }, null, 8, ["is-updating"])
          ])) : (openBlock(), createBlock(_component_Card, {
            key: 1,
            "pt:body:class": "w-full et-gap-md"
          }, {
            content: withCtx(() => [
              createBaseVNode("div", _hoisted_7, toDisplayString(unref($t)("tx-page:empty")), 1)
            ]),
            _: 1
          })),
          unref(numPages) > 1 ? (openBlock(), createElementBlock("div", _hoisted_8, [
            createVNode(_component_Paginator, {
              first: unref(first),
              "onUpdate:first": _cache[0] || (_cache[0] = ($event) => isRef(first) ? first.value = $event : null),
              "page-link-size": unref(isSmallerThanSM) ? 3 : 5,
              template: unref(getPaginatorTemplate)(),
              rows: unref(numItemsPerPage),
              "total-records": unref(numTxTotal),
              pt: { content: "flex flex-row flex-nowrap" },
              onPage: onPageStateUpdateTop
            }, null, 8, ["first", "page-link-size", "template", "rows", "total-records"])
          ])) : createCommentVNode("", true),
          createVNode(Transition, {
            name: "fade-fast-delayed",
            mode: "out-in"
          }, {
            default: withCtx(() => [
              unref(txListDatePage).length > 0 ? (openBlock(), createElementBlock("div", _hoisted_9, [
                unref(currentPage) === 1 ? (openBlock(), createElementBlock("div", _hoisted_10, [
                  pendingTxBalanceList.value.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_11, "Pending")) : createCommentVNode("", true),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(pendingTxBalanceList.value, (txBalance) => {
                    return openBlock(), createBlock(_sfc_main$9, {
                      key: txBalance.hash,
                      "tx-balance": txBalance,
                      "account-id": unref(selectedAccountId),
                      "wallet-id": unref(selectedWalletId),
                      "local-tx": pendingMap[txBalance.hash],
                      "amount-to-show": 7,
                      "pending-tx": "",
                      "show-assets": ""
                    }, null, 8, ["tx-balance", "account-id", "wallet-id", "local-tx"]);
                  }), 128))
                ])) : createCommentVNode("", true),
                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(txListDatePage), (entry, index) => {
                  return openBlock(), createElementBlock("div", _hoisted_12, [
                    createBaseVNode("div", _hoisted_13, toDisplayString(unref(formatTimeAndDate)(entry.date, false, true, false, true, true, true)), 1),
                    (openBlock(true), createElementBlock(Fragment, null, renderList(entry.txList, (txBalance) => {
                      return openBlock(), createBlock(_sfc_main$9, {
                        key: txBalance.hash,
                        "tx-balance": txBalance,
                        "account-id": unref(selectedAccountId),
                        "wallet-id": unref(selectedWalletId),
                        "amount-to-show": 7,
                        "show-assets": ""
                      }, null, 8, ["tx-balance", "account-id", "wallet-id"]);
                    }), 128))
                  ]);
                }), 256))
              ])) : unref(numTxTotalAccount) !== 0 && unref(numPages) === 0 ? (openBlock(), createElementBlock("div", _hoisted_14, toDisplayString(unref($t)("tx-page:noMatch")), 1)) : createCommentVNode("", true)
            ]),
            _: 1
          }),
          createBaseVNode("div", _hoisted_15, [
            unref(numPages) > 1 ? (openBlock(), createBlock(_component_Paginator, {
              key: 0,
              first: unref(first),
              "onUpdate:first": _cache[1] || (_cache[1] = ($event) => isRef(first) ? first.value = $event : null),
              "page-link-size": unref(isSmallerThanSM) ? 3 : 3,
              template: unref(getPaginatorTemplate)(),
              rows: unref(numItemsPerPage),
              "total-records": unref(numTxTotal),
              pt: { content: "flex flex-row flex-nowrap" },
              onPage: onPageStateUpdateBottom
            }, null, 8, ["first", "page-link-size", "template", "rows", "total-records"])) : createCommentVNode("", true)
          ])
        ])
      ]);
    };
  }
});

export { _sfc_main as default };
