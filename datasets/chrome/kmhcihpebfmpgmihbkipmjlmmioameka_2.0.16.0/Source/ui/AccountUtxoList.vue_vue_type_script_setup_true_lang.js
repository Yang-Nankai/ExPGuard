import { D as computed, e as ref, d as defineComponent, w as useTranslation, f as onMounted, aE as addSignalListener, k as onUnmounted, aF as removeSignalListener, G as watch, m as createElementBlock, t as createCommentVNode, o as openBlock, p as createBaseVNode, c as createBlock, u as unref, B as toDisplayString, n as createVNode, z as resolveComponent, l as useTheme, F as Fragment, S as renderList, aX as json, N as nextTick, y as withCtx, H as createTextVNode, aO as withKeys, ae as isRef, a1 as withDirectives, a2 as resolveDirective } from './index.js';
import { c as compare, m as multiply, j as add } from './bigmath.js';
import { u as useSelectedAccount } from './useSelectedAccount.js';
import { u as useAdaSymbol } from './useAdaSymbol.js';
import { _ as _sfc_main$b } from './AdaAmount.vue_vue_type_script_setup_true_lang.js';
import { aa as onAccountDataUpdated, ab as getLockedUtxos, ac as cachePendingUtxoList, a4 as getUtxoHash, ad as getOwnedCredFromAddrBech32, ae as getDerivationPath } from './app2.js';
import { o as onSwitchSelectedWalletAccount, b as onLockedUtxoToggled, g as getRandomId } from './epochParams.js';
import { u as usePaginator } from './usePaginator.js';
import { _ as _sfc_main$3 } from './Badge.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$4 } from './AccountUtxoItem.vue_vue_type_script_setup_true_lang.js';
import { a as appLanguageTag } from './language.js';
import { u as useFormatter } from './useFormatter.js';
import { u as useModalOpen } from './useModalOpen.js';
import { u as useAssetList, _ as _sfc_main$9 } from './AssetListFilters.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$5 } from './InputSearch.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$6 } from './FormattedAmount.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$8 } from './InputCoin.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$7 } from './Modal.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$a } from './ModalHeader.vue_vue_type_script_setup_true_lang.js';
import { M as ModalContentCard } from './ModalContentCard.js';
import { I as IconFxLoader } from './IconFxLoader.js';

const createIUtxoSearchConfig = () => {
  return {
    coinLow: null,
    coinHigh: null,
    searchStr: null,
    searchStrList: [],
    assetFilter: null
  };
};
const config = ref(createIUtxoSearchConfig());
const isUpdatingUtxoListMap = ref({
  opk: false,
  opkosk: false,
  opkesk: false,
  epkosk: false,
  collateral: false,
  locked: false,
  pendingIn: false,
  pendingOut: false
});
const useIUtxoSearchConfig = () => {
  const hasCoinLowFilter = computed(() => !!config.value.coinLow && config.value.coinLow > 0);
  const hasCoinHighFilter = computed(() => !!config.value.coinHigh && config.value.coinHigh > 0);
  const hasSearchStrFilter = computed(() => !!config.value.searchStr && config.value.searchStr.length > 0);
  const hasSearchStrListFilter = computed(() => config.value.searchStrList.length > 0);
  const hasAssetFilter = computed(() => !!config.value.assetFilter);
  const hasActiveFilter = computed(() => hasCoinLowFilter.value || hasCoinHighFilter.value || hasSearchStrFilter.value || hasSearchStrListFilter.value || hasAssetFilter.value);
  const isUpdatingUtxoList = computed(() => Object.values(isUpdatingUtxoListMap.value).some((v) => v));
  return {
    createIUtxoSearchConfig,
    isUpdatingUtxoListMap,
    isUpdatingUtxoList,
    hasCoinLowFilter,
    hasCoinHighFilter,
    hasSearchStrFilter,
    hasSearchStrListFilter,
    hasAssetFilter,
    hasActiveFilter,
    config
  };
};

const _hoisted_1$2 = { key: 0 };
const _hoisted_2$2 = { class: "flex flex-col et-gap-md" };
const _hoisted_3$2 = { class: "flex flex-row et-js-ic et-gap-sm sm:et-gap-md" };
const _hoisted_4$2 = { class: "et-text-sm mt-px" };
const _hoisted_5$2 = {
  key: 0,
  class: "col-span-12 flex justify-center"
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AccountUtxoTypeList",
  props: {
    utxoType: { type: String, required: true },
    badgeLabel: { type: String },
    badgeHint: { type: String },
    badgeHover: { type: String },
    badgeCss: { type: String, default: "" },
    showDivider: { type: Boolean, default: true },
    showBadge: { type: Boolean, default: true },
    showSelect: { type: Boolean, required: false, default: false }
  },
  setup(__props) {
    const props = __props;
    const storeId = "AccountUtxoTypeList" + getRandomId();
    const $t = useTranslation().t;
    const {
      getPaginatorTemplate
    } = useTheme();
    const {
      appAccount,
      accountData,
      utxoMap,
      selectedWalletId,
      selectedAccountId
    } = useSelectedAccount();
    const {
      isUpdatingUtxoListMap,
      hasCoinLowFilter,
      hasCoinHighFilter,
      hasSearchStrFilter,
      hasAssetFilter,
      hasActiveFilter,
      config
    } = useIUtxoSearchConfig();
    const utxoList = ref([]);
    const numAllUtxos = ref(0);
    const utxoItemList = ref([]);
    const {
      numItemsPerPage,
      numItems,
      numPages,
      page,
      onPageStateUpdate
    } = usePaginator(utxoItemList, 10);
    let _timeoutId = -1;
    const updateList = async (_appAccount, delay = 10) => {
      if (!appAccount.value) {
        return;
      }
      if (_appAccount?.id && appAccount.value.id !== _appAccount?.id) {
        return;
      }
      const _utxoMap = utxoMap.value;
      if (!_utxoMap) {
        return;
      }
      if (!accountData.value) {
        return;
      }
      isUpdatingUtxoListMap.value[props.utxoType] = true;
      clearTimeout(_timeoutId);
      _timeoutId = setTimeout(() => {
        if (props.utxoType === "collateral") {
          utxoList.value = _utxoMap.collateral;
        } else if (props.utxoType === "locked") {
          utxoList.value = getLockedUtxos(appAccount.value);
        } else if (props.utxoType === "pendingIn") {
          const {
            pendingInputList
          } = cachePendingUtxoList(appAccount.value);
          utxoList.value = pendingInputList.concat();
        } else if (props.utxoType === "pendingOut") {
          const {
            pendingOutputList
          } = cachePendingUtxoList(appAccount.value);
          utxoList.value = pendingOutputList.concat();
        } else {
          utxoList.value = _utxoMap[props.utxoType];
        }
        numAllUtxos.value = utxoList.value.length;
        switch (props.utxoType) {
          case "opk":
            numAllUtxos.value = _utxoMap.numOpk;
            break;
          case "opkosk":
            numAllUtxos.value = _utxoMap.numOpkOsk;
            break;
          case "opkesk":
            numAllUtxos.value = _utxoMap.numOpkEsk;
            break;
          case "epkosk":
            numAllUtxos.value = _utxoMap.numEpkOsk;
            break;
        }
        let list = [];
        for (const utxo of utxoList.value) {
          let item = list.find((item2) => item2.bech32 === utxo.output.address);
          if (!item) {
            item = { bech32: utxo.output.address, list: [utxo], pathInfo: getPathInfo(utxo.output.address) };
            list.push(item);
          } else {
            item.list.push(utxo);
          }
        }
        for (const item of list) {
          item.list.sort((a, b) => compare(a.output.amount.coin, ">", b.output.amount.coin) ? -1 : 1);
        }
        if (hasActiveFilter.value && list) {
          let searchStrList = [...config.value.searchStrList];
          if (hasSearchStrFilter.value && !searchStrList.includes(config.value.searchStr)) {
            searchStrList.push(config.value.searchStr);
          }
          list = json(list).filter((utxo) => {
            if (hasCoinLowFilter.value || hasCoinHighFilter.value) {
              utxo.list = utxo.list.filter((utxoItem) => {
                const coin = utxoItem.output.amount.coin;
                const isValidLow = hasCoinLowFilter.value ? compare(coin, ">", config.value.coinLow) : true;
                const isValidHigh = hasCoinHighFilter.value ? compare(coin, "<=", config.value.coinHigh) : true;
                return isValidLow && isValidHigh;
              });
              if (utxo.list.length === 0) {
                return false;
              }
            }
            if (searchStrList.some((searchStr) => {
              if (searchStr.indexOf("/") >= 0 && utxo.pathInfo.includes(searchStr)) {
                return true;
              }
              if (utxo.bech32.includes(searchStr)) {
                return true;
              }
              return false;
            })) {
              return true;
            }
            if (searchStrList.length > 0 || hasAssetFilter.value) {
              utxo.list = utxo.list.filter((utxoItem) => {
                if (searchStrList.length > 0) {
                  const hash = getUtxoHash(utxoItem.input);
                  if (searchStrList.some((searchStr) => hash.includes(searchStr))) {
                    return true;
                  }
                }
                if (hasAssetFilter.value) {
                  if (!utxoItem.output.amount.multiasset) {
                    return false;
                  }
                  const assetFilter = config.value.assetFilter;
                  const utxoAssetEntries = Object.entries(utxoItem.output.amount.multiasset);
                  const assetFilterPolicies = Object.keys(assetFilter);
                  if (utxoAssetEntries.some((utxoAssetEntry) => {
                    if (!assetFilterPolicies.includes(utxoAssetEntry[0])) {
                      return false;
                    }
                    const assetFilterAssets = Object.keys(assetFilter[utxoAssetEntry[0]]);
                    const utxoAssets = Object.keys(utxoAssetEntry[1]);
                    if (utxoAssets.some((asset) => assetFilterAssets.includes(asset))) {
                      return true;
                    }
                  })) {
                    return true;
                  }
                  return false;
                }
              });
            }
            return utxo.list.length > 0;
          });
        }
        disposeList();
        utxoItemList.value = list;
        isUpdatingUtxoListMap.value[props.utxoType] = false;
      }, delay);
    };
    const disposeList = () => {
      for (const utxo of utxoItemList.value) {
        utxo.list.length = 0;
      }
      utxoItemList.value.length = 0;
    };
    onMounted(() => {
      updateList(appAccount.value ?? null, 100);
      addSignalListener(onAccountDataUpdated, storeId, updateList);
      addSignalListener(onSwitchSelectedWalletAccount, storeId, updateList);
      if (props.utxoType === "locked") {
        addSignalListener(onLockedUtxoToggled, storeId, updateList);
      }
    });
    onUnmounted(() => {
      disposeList();
      removeSignalListener(onAccountDataUpdated, storeId);
      if (props.utxoType === "locked") {
        removeSignalListener(onLockedUtxoToggled, storeId);
      }
    });
    watch(config, (newValue, oldValue) => {
      nextTick(() => {
        updateList(appAccount.value ?? null);
      });
    });
    watch(selectedAccountId, () => {
      nextTick(() => {
        updateList(appAccount.value ?? null);
      });
    });
    const getPathInfo = (addr) => {
      if (accountData.value) {
        const cred = getOwnedCredFromAddrBech32([accountData.value.keys], addr);
        if (cred) {
          return getDerivationPath(cred.path);
        }
      }
      return "";
    };
    const utxoCount = computed(() => utxoItemList.value.map((item) => item.list.length).reduce((carry, current) => carry + current, 0));
    const addressCount = computed(() => utxoItemList.value.length);
    onUnmounted(() => {
      removeSignalListener(onAccountDataUpdated, storeId);
      removeSignalListener(onSwitchSelectedWalletAccount, storeId);
      removeSignalListener(onLockedUtxoToggled, storeId);
    });
    return (_ctx, _cache) => {
      const _component_Paginator = resolveComponent("Paginator");
      return utxoList.value.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_1$2, [
        createBaseVNode("div", _hoisted_2$2, [
          createBaseVNode("div", _hoisted_3$2, [
            __props.badgeLabel && __props.showBadge ? (openBlock(), createBlock(_sfc_main$3, {
              key: 0,
              badge: { id: "test", label: unref($t)(__props.badgeLabel), hover: unref($t)(__props.badgeHint) },
              class: "whitespace-nowrap",
              label: unref($t)(__props.badgeLabel)
            }, null, 8, ["badge", "label"])) : createCommentVNode("", true),
            createBaseVNode("div", _hoisted_4$2, toDisplayString(unref($t)("utxoList-page:badge.utxos", { utxo_count: utxoCount.value, address_count: addressCount.value })), 1)
          ]),
          unref(numPages) > 1 ? (openBlock(), createElementBlock("div", _hoisted_5$2, [
            createVNode(_component_Paginator, {
              "page-link-size": 3,
              template: unref(getPaginatorTemplate)(),
              rows: unref(numItemsPerPage),
              "total-records": unref(numItems),
              pt: { content: "flex flex-row flex-nowrap" },
              onPage: unref(onPageStateUpdate)
            }, null, 8, ["template", "rows", "total-records", "onPage"])
          ])) : createCommentVNode("", true),
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(page), (item, index) => {
            return openBlock(), createBlock(_sfc_main$4, {
              key: item.bech32 + "_au",
              "utxo-item": item,
              index,
              "show-select": __props.showSelect,
              "hide-lock": false,
              "badge-label": __props.badgeLabel,
              "badge-hint": __props.badgeHint,
              "wallet-id": unref(selectedWalletId)
            }, null, 8, ["utxo-item", "index", "show-select", "badge-label", "badge-hint", "wallet-id"]);
          }), 128))
        ])
      ])) : createCommentVNode("", true);
    };
  }
});

const _hoisted_1$1 = { class: "w-full flex flex-row flex-nowrap et-js-ic et-gap-md" };
const _hoisted_2$1 = {
  key: 0,
  class: "flex flex-row et-gap-sm"
};
const _hoisted_3$1 = { class: "flex flex-row et-gap-sm et-jc-ic" };
const _hoisted_4$1 = { key: 1 };
const _hoisted_5$1 = { class: "col-span-2 flex flex-col et-jc-is et-gap-xs sm:et-gap-sm" };
const _hoisted_6$1 = { class: "flex flex-row et-gap-sm" };
const _hoisted_7$1 = { class: "col-span-2 2xs:col-span-1 flex flex-col et-jc-is et-gap-xs sm:et-gap-sm" };
const _hoisted_8$1 = { class: "col-span-2 2xs:col-span-1 flex flex-col et-jc-is et-gap-xs sm:et-gap-sm" };
const _hoisted_9$1 = {
  key: 0,
  class: "col-span-2 flex flex-col et-gap-sm"
};
const _hoisted_10$1 = { class: "" };
const _hoisted_11$1 = { class: "flex flex-row et-gap-sm" };
const _hoisted_12$1 = { class: "flex flex-row et-je-ic et-gap-md" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AccountUtxoListFilter",
  setup(__props) {
    const $t = useTranslation().t;
    const { adaCurrency } = useAdaSymbol();
    const {
      showModal,
      onClose,
      doOpen
    } = useModalOpen();
    const {
      config,
      isUpdatingUtxoList,
      hasActiveFilter,
      hasCoinLowFilter,
      hasCoinHighFilter,
      createIUtxoSearchConfig
    } = useIUtxoSearchConfig();
    const { accountData } = useSelectedAccount();
    const _multiasset = computed(() => accountData.value?.balance.multiasset ?? {});
    const _selectedAssetList = ref([]);
    const _hasAssets = computed(() => Object.keys(_multiasset.value).length > 0);
    const assetList = useAssetList(_multiasset, _selectedAssetList);
    const assetFilter = assetList.assetFilter;
    const numAssets = assetList.numAssets;
    const {
      hasScam: assetHasScam,
      hasActiveFilter: assetHasActiveFilter,
      isFilterUpdating: assetIsFilterUpdating,
      filterSearchInput: assetFilterSearchInput,
      filterAssetType: assetFilterAssetType,
      filterBadgeList: assetFilterBadgeList,
      addFilterBadge: assetAddFilterBadge,
      removeFilterBadge: assetRemoveFilterBadge,
      filteredAssetList
    } = assetFilter;
    const {
      getDecimalNumber,
      getNumberFormatSeparators,
      truncateAddress
    } = useFormatter();
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
    const onEnterUtxoFilter = () => {
      const str = filterSearchInput.value;
      preventUpdate = true;
      filterSearchInput.value = "";
      if (str.length > 0 && !config.value.searchStrList.includes(str)) {
        config.value.searchStrList.push(str);
        config.value.searchStr = null;
      }
    };
    const onEnterAssetFilter = (str) => {
      if (!str) {
        return;
      }
      assetFilterSearchInput.value = "";
      assetAddFilterBadge(str);
    };
    const onFilterReset = () => {
      onUpdateMinAmount();
      onUpdateMaxAmount();
      filterSearchInput.value = "";
      assetFilterAssetType.value = "ALL";
      assetFilterSearchInput.value = "";
      for (const badge of assetFilterBadgeList.value) {
        assetRemoveFilterBadge(badge);
      }
      config.value = createIUtxoSearchConfig();
    };
    const onFilterSubmit = (delay = 300) => {
      clearTimeout(_toid);
      const _searchConfig = createIUtxoSearchConfig();
      if (fInputMinLovelace.value) {
        _searchConfig.coinLow = Number(fInputMinLovelace.value);
      }
      if (fInputMaxLovelace.value) {
        _searchConfig.coinHigh = Number(fInputMaxLovelace.value);
        if (_searchConfig.coinLow && _searchConfig.coinHigh < _searchConfig.coinLow) {
          _searchConfig.coinHigh = _searchConfig.coinLow;
        }
      }
      if (filterSearchInput.value && filterSearchInput.value.length > 0) {
        _searchConfig.searchStr = filterSearchInput.value.trim();
      }
      _searchConfig.searchStrList = config.value.searchStrList;
      if (assetHasActiveFilter.value) {
        _searchConfig.assetFilter = {};
        for (const policy of filteredAssetList.value) {
          _searchConfig.assetFilter[policy.p] = {};
          for (const asset of policy.l) {
            _searchConfig.assetFilter[policy.p][asset.t.a] = asset.t.q;
          }
        }
      }
      _toid = setTimeout(() => {
        config.value = _searchConfig;
      }, delay);
    };
    watch(filteredAssetList, () => {
      if (!showModal.value) {
        onFilterSubmit(0);
      }
    });
    watch(filterSearchInput, () => {
      if (!preventUpdate && !showModal.value) {
        onFilterSubmit();
      }
      preventUpdate = false;
    });
    onMounted(() => {
      onFilterReset();
    });
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_Chip = resolveComponent("Chip");
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", _hoisted_1$1, [
          createVNode(_sfc_main$5, {
            input: filterSearchInput.value,
            "onUpdate:input": _cache[0] || (_cache[0] = ($event) => filterSearchInput.value = $event),
            "show-spinner": unref(isUpdatingUtxoList),
            placeholder: unref($t)("utxoList-page:filter.search"),
            onEnter: onEnterUtxoFilter
          }, null, 8, ["input", "show-spinner", "placeholder"]),
          createVNode(_component_Button, {
            label: unref($t)("utxoList-page:filter.more"),
            severity: unref(hasActiveFilter) ? "primary" : "secondary",
            outlined: !unref(hasActiveFilter),
            rounded: "",
            onClick: unref(doOpen)
          }, null, 8, ["label", "severity", "outlined", "onClick"])
        ]),
        unref(hasCoinLowFilter) || unref(hasCoinHighFilter) || unref(config).searchStrList.length > 0 || unref(assetFilterBadgeList).length > 0 || unref(assetFilterAssetType) !== "ALL" ? (openBlock(), createElementBlock("div", _hoisted_2$1, [
          unref(hasCoinLowFilter) || unref(hasCoinHighFilter) ? (openBlock(), createBlock(_component_Chip, {
            key: 0,
            removable: "",
            onRemove: _cache[1] || (_cache[1] = ($event) => doRemoveCoinFilter())
          }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_3$1, [
                createVNode(_sfc_main$6, {
                  amount: (unref(config).coinLow ?? 0).toString(),
                  "with-sign": false,
                  "trim-fraction": ""
                }, null, 8, ["amount"]),
                _cache[11] || (_cache[11] = createTextVNode(" - ", -1)),
                unref(hasCoinHighFilter) ? (openBlock(), createBlock(_sfc_main$6, {
                  key: 0,
                  amount: unref(config).coinHigh.toString(),
                  "with-sign": false,
                  "trim-fraction": ""
                }, null, 8, ["amount"])) : (openBlock(), createElementBlock("div", _hoisted_4$1, "∞"))
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
          }), 128)),
          unref(assetFilterAssetType) !== "ALL" ? (openBlock(), createBlock(_component_Chip, {
            key: 1,
            label: unref(assetFilterAssetType),
            removable: "",
            onRemove: _cache[2] || (_cache[2] = ($event) => assetFilterAssetType.value = "ALL")
          }, null, 8, ["label"])) : createCommentVNode("", true),
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(assetFilterBadgeList), (assetFilter2) => {
            return openBlock(), createBlock(_component_Chip, {
              key: assetFilter2,
              label: unref(truncateAddress)(assetFilter2, 16),
              removable: "",
              onRemove: ($event) => unref(assetRemoveFilterBadge)(assetFilter2)
            }, null, 8, ["label", "onRemove"]);
          }), 128))
        ])) : createCommentVNode("", true),
        unref(showModal) ? (openBlock(), createBlock(_sfc_main$7, {
          key: 1,
          narrow: "",
          "full-width-on-mobile": "",
          onClose: _cache[10] || (_cache[10] = ($event) => {
            onFilterSubmit(0);
            unref(onClose)();
          })
        }, {
          header: withCtx(({ handleClose }) => [
            createVNode(_sfc_main$a, {
              headline: unref($t)("utxoList-page:filter.headline"),
              caption: unref($t)("utxoList-page:filter.caption"),
              "hide-back": "",
              "hide-info": "",
              showClose: "",
              onClose: ($event) => handleClose()
            }, null, 8, ["headline", "caption", "onClose"])
          ]),
          content: withCtx(({ handleClose }) => [
            createVNode(ModalContentCard, { class: "grid grid-cols-2 et-gap-md sm:et-gap-lg" }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_5$1, [
                  createVNode(_sfc_main$5, {
                    input: filterSearchInput.value,
                    "onUpdate:input": _cache[3] || (_cache[3] = ($event) => filterSearchInput.value = $event),
                    "show-spinner": unref(isUpdatingUtxoList),
                    placeholder: unref($t)("utxoList-page:filter.search"),
                    onEnter: onEnterUtxoFilter
                  }, null, 8, ["input", "show-spinner", "placeholder"]),
                  createBaseVNode("div", _hoisted_6$1, [
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
                createBaseVNode("div", _hoisted_7$1, [
                  createVNode(_sfc_main$8, {
                    model: fInputMin.value,
                    "onUpdate:model": [
                      _cache[4] || (_cache[4] = ($event) => fInputMin.value = $event),
                      onUpdateMinAmount
                    ],
                    label: unref($t)("utxoList-page:filter.minada", { adaCurrency: unref(adaCurrency) }),
                    "min-coin-input": 0,
                    onKeydown: withKeys(($event) => handleClose(), ["enter"])
                  }, null, 8, ["model", "label", "onKeydown"])
                ]),
                createBaseVNode("div", _hoisted_8$1, [
                  createVNode(_sfc_main$8, {
                    model: fInputMax.value,
                    "onUpdate:model": [
                      _cache[5] || (_cache[5] = ($event) => fInputMax.value = $event),
                      onUpdateMaxAmount
                    ],
                    label: unref($t)("utxoList-page:filter.maxada", { adaCurrency: unref(adaCurrency) }),
                    "min-coin-input": 0,
                    onKeydown: withKeys(($event) => handleClose(), ["enter"])
                  }, null, 8, ["model", "label", "onKeydown"])
                ]),
                _hasAssets.value ? (openBlock(), createElementBlock("div", _hoisted_9$1, [
                  createVNode(_sfc_main$9, {
                    "is-updating": unref(assetIsFilterUpdating),
                    "onUpdate:isUpdating": _cache[6] || (_cache[6] = ($event) => isRef(assetIsFilterUpdating) ? assetIsFilterUpdating.value = $event : null),
                    "filter-search-input": unref(assetFilterSearchInput),
                    "onUpdate:filterSearchInput": _cache[7] || (_cache[7] = ($event) => isRef(assetFilterSearchInput) ? assetFilterSearchInput.value = $event : null),
                    "filter-asset-type": unref(assetFilterAssetType),
                    "onUpdate:filterAssetType": _cache[8] || (_cache[8] = ($event) => isRef(assetFilterAssetType) ? assetFilterAssetType.value = $event : null),
                    "has-scam": unref(assetHasScam),
                    "filter-by-selected": false,
                    onEnter: onEnterAssetFilter
                  }, {
                    count: withCtx(() => [
                      createBaseVNode("div", _hoisted_10$1, toDisplayString(unref($t)("utxoList-page:filter.numAssets", { numAssets: unref(numAssets) })), 1)
                    ]),
                    _: 1
                  }, 8, ["is-updating", "filter-search-input", "filter-asset-type", "has-scam"]),
                  createBaseVNode("div", _hoisted_11$1, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(unref(assetFilterBadgeList), (assetFilter2) => {
                      return openBlock(), createBlock(_component_Chip, {
                        key: assetFilter2,
                        label: unref(truncateAddress)(assetFilter2, 16),
                        removable: "",
                        onRemove: ($event) => unref(assetRemoveFilterBadge)(assetFilter2)
                      }, null, 8, ["label", "onRemove"]);
                    }), 128))
                  ])
                ])) : createCommentVNode("", true)
              ]),
              _: 2
            }, 1024)
          ]),
          footer: withCtx(({ handleClose }) => [
            createBaseVNode("div", _hoisted_12$1, [
              createVNode(_component_Button, {
                label: unref($t)("common:reset"),
                severity: "secondary",
                onClick: _cache[9] || (_cache[9] = ($event) => onFilterReset()),
                outlined: "",
                rounded: ""
              }, null, 8, ["label"]),
              createVNode(_component_Button, {
                label: unref($t)("common:apply"),
                onClick: ($event) => handleClose(),
                rounded: ""
              }, null, 8, ["label", "onClick"])
            ])
          ]),
          _: 1
        })) : createCommentVNode("", true)
      ], 64);
    };
  }
});

const _hoisted_1 = {
  key: 0,
  class: "flex flex-wrap et-gap-sm"
};
const _hoisted_2 = { class: "w-full et-px-sm font-semibold" };
const _hoisted_3 = { class: "flex flex-row flex-wrap et-gap-md sm:et-gap-lg" };
const _hoisted_4 = { class: "h-full w-full sm:w-auto flex flex-row sm:flex sm:flex-col flex-wrap sm:flex-nowrap et-jb-ic sm:et-js-is et-gap-sm" };
const _hoisted_5 = { class: "font-semibold cap-first" };
const _hoisted_6 = { class: "flex flex-col et-jc-is" };
const _hoisted_7 = { class: "h-full w-full sm:w-auto flex flex-row sm:flex sm:flex-col flex-wrap sm:flex-nowrap et-jb-ic sm:et-js-is et-gap-sm" };
const _hoisted_8 = { class: "font-semibold" };
const _hoisted_9 = { class: "flex flex-col et-jc-is" };
const _hoisted_10 = { class: "h-full w-full sm:w-auto flex flex-row sm:flex sm:flex-col flex-wrap sm:flex-nowrap et-jb-ic sm:et-js-is et-gap-sm" };
const _hoisted_11 = { class: "font-semibold cap-first" };
const _hoisted_12 = { class: "flex flex-col et-jc-is" };
const _hoisted_13 = { class: "h-full w-full sm:w-auto flex flex-row sm:flex sm:flex-col flex-wrap sm:flex-nowrap et-jb-ic sm:et-js-is et-gap-sm" };
const _hoisted_14 = { class: "font-semibold" };
const _hoisted_15 = { class: "flex flex-col et-jc-is" };
const _hoisted_16 = {
  key: 1,
  class: "relative flex flex-col lg:flex-row flex-wrap et-gap-md px-0 transition-all"
};
const _hoisted_17 = {
  key: 2,
  class: "flex flex-row et-jc w-full"
};
const _hoisted_18 = { key: 3 };
const _hoisted_19 = { class: "et-pt" };
const _hoisted_20 = {
  key: 4,
  class: "flex flex-col et-gap-xl"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AccountUtxoList",
  props: {
    showSelect: { type: Boolean, required: false, default: false }
  },
  setup(__props) {
    const { isUpdatingUtxoList } = useIUtxoSearchConfig();
    const $t = useTranslation().t;
    const {
      appAccount,
      accountSettings,
      utxoMap
    } = useSelectedAccount();
    const { adaCurrency } = useAdaSymbol();
    ref();
    ref();
    const accountBalance = accountSettings.balance;
    const accountTotal = accountSettings.total;
    const registered = computed(() => {
      const list = appAccount.value?.data.rewardInfoList ?? [];
      if (list.length > 0) {
        const info = list[0];
        return info.registered;
      }
      return false;
    });
    const controlledStake = computed(() => {
      const balance = accountBalance.value;
      if (!balance) {
        return "0";
      }
      return add(balance.stakeOpkOsk, balance.stakeEpkOsk);
    });
    const ownedStake = computed(() => {
      const balance = accountBalance.value;
      if (!balance) {
        return "0";
      }
      return balance.stakeOpkOsk;
    });
    const notStaked = computed(() => {
      const balance = accountBalance.value;
      if (!balance) {
        return "0";
      }
      return balance.coinOpk;
    });
    const externalStake = computed(() => {
      const balance = accountBalance.value;
      if (!balance) {
        return "0";
      }
      return balance.stakeOpkEsk;
    });
    const showControlledStake = computed(() => accountTotal.value !== controlledStake.value);
    return (_ctx, _cache) => {
      const _component_Card = resolveComponent("Card");
      const _directive_tooltip = resolveDirective("tooltip");
      return openBlock(), createElementBlock(Fragment, null, [
        showControlledStake.value ? (openBlock(), createElementBlock("div", _hoisted_1, [
          createBaseVNode("div", _hoisted_2, toDisplayString(unref($t)("utxoList-page:stakeBreakdown.title")), 1),
          createVNode(_component_Card, { pt: {
            body: "h-full min-w-42",
            content: "h-full text-txt-reduced"
          } }, {
            content: withCtx(() => [
              createBaseVNode("div", _hoisted_3, [
                withDirectives((openBlock(), createElementBlock("div", _hoisted_4, [
                  createBaseVNode("span", _hoisted_5, toDisplayString(unref($t)("utxoList-page:stakeBreakdown.controlledStake.label")), 1),
                  createBaseVNode("div", _hoisted_6, [
                    createVNode(_sfc_main$b, {
                      amount: controlledStake.value,
                      "with-sign": false,
                      "clipboard-Enabled": false
                    }, null, 8, ["amount"])
                  ])
                ])), [
                  [
                    _directive_tooltip,
                    unref($t)("utxoList-page:stakeBreakdown.controlledStake.tooltip"),
                    void 0,
                    { bottom: true }
                  ]
                ]),
                withDirectives((openBlock(), createElementBlock("div", _hoisted_7, [
                  createBaseVNode("span", _hoisted_8, toDisplayString(unref($t)("utxoList-page:stakeBreakdown.ownedStake.label")), 1),
                  createBaseVNode("div", _hoisted_9, [
                    createVNode(_sfc_main$b, {
                      amount: ownedStake.value,
                      "with-sign": false,
                      "clipboard-Enabled": false,
                      colored: false
                    }, null, 8, ["amount"])
                  ])
                ])), [
                  [
                    _directive_tooltip,
                    unref($t)("utxoList-page:stakeBreakdown.ownedStake.tooltip"),
                    void 0,
                    { bottom: true }
                  ]
                ]),
                withDirectives((openBlock(), createElementBlock("div", _hoisted_10, [
                  createBaseVNode("span", _hoisted_11, toDisplayString(unref($t)("utxoList-page:stakeBreakdown.notStaked.label")), 1),
                  createBaseVNode("div", _hoisted_12, [
                    createVNode(_sfc_main$b, {
                      amount: notStaked.value,
                      "with-sign": false,
                      "clipboard-Enabled": false,
                      colored: false
                    }, null, 8, ["amount"])
                  ])
                ])), [
                  [
                    _directive_tooltip,
                    unref($t)("utxoList-page:stakeBreakdown.notStaked.tooltip", { currency: unref(adaCurrency) }),
                    void 0,
                    { bottom: true }
                  ]
                ]),
                withDirectives((openBlock(), createElementBlock("div", _hoisted_13, [
                  createBaseVNode("span", _hoisted_14, toDisplayString(unref($t)("utxoList-page:stakeBreakdown.externallyStaked.label")), 1),
                  createBaseVNode("div", _hoisted_15, [
                    createVNode(_sfc_main$b, {
                      amount: externalStake.value,
                      "with-sign": false,
                      "clipboard-Enabled": false,
                      colored: false
                    }, null, 8, ["amount"])
                  ])
                ])), [
                  [
                    _directive_tooltip,
                    unref($t)("utxoList-page:stakeBreakdown.externallyStaked.tooltip", { currency: unref(adaCurrency) }),
                    void 0,
                    { bottom: true }
                  ]
                ])
              ])
            ]),
            _: 1
          })
        ])) : createCommentVNode("", true),
        unref(utxoMap)?.allOpk.length ? (openBlock(), createElementBlock("div", _hoisted_16, [
          createVNode(_sfc_main$1)
        ])) : unref(isUpdatingUtxoList) ? (openBlock(), createElementBlock("div", _hoisted_17, [
          createVNode(IconFxLoader)
        ])) : (openBlock(), createElementBlock("div", _hoisted_18, [
          createBaseVNode("div", _hoisted_19, toDisplayString(unref($t)("utxoList-page:empty")), 1)
        ])),
        createVNode(_sfc_main$2, {
          "utxo-type": "pendingIn",
          "show-divider": false,
          "show-badge": false,
          "show-select": __props.showSelect,
          "badge-label": "",
          "badge-hint": "utxoList-page:badge.pendingIn.hint",
          "badge-css": "et-badge-bg-red"
        }, null, 8, ["show-select"]),
        createVNode(_sfc_main$2, {
          "utxo-type": "pendingOut",
          "show-divider": false,
          "show-badge": false,
          "show-select": __props.showSelect,
          "badge-label": "",
          "badge-hint": "utxoList-page:badge.pendingOut.hint",
          "badge-css": "et-badge-bg-red"
        }, null, 8, ["show-select"]),
        createVNode(_sfc_main$2, {
          "utxo-type": "opkosk",
          "show-divider": false,
          "show-badge": registered.value,
          "show-select": __props.showSelect,
          "badge-label": "utxoList-page:badge.opkosk.label",
          "badge-hint": "utxoList-page:badge.opkosk.hint",
          "badge-css": "et-badge-bg-red"
        }, null, 8, ["show-badge", "show-select"]),
        createVNode(_sfc_main$2, {
          "utxo-type": "opk",
          "show-divider": false,
          "show-select": __props.showSelect,
          "badge-label": "utxoList-page:badge.opk.label",
          "badge-hint": "utxoList-page:badge.opk.hint",
          "badge-css": "et-badge"
        }, null, 8, ["show-select"]),
        createVNode(_sfc_main$2, {
          "utxo-type": "opkesk",
          "show-divider": false,
          "show-select": __props.showSelect,
          "badge-label": "utxoList-page:badge.opkesk.label",
          "badge-hint": "utxoList-page:badge.opkesk.hint",
          "badge-css": "et-badge"
        }, null, 8, ["show-select"]),
        createVNode(_sfc_main$2, {
          "utxo-type": "epkosk",
          "show-divider": false,
          "show-badge": registered.value,
          "badge-label": "utxoList-page:badge.epkosk.label",
          "badge-hint": "utxoList-page:badge.epkosk.hint",
          "badge-css": "et-badge et-badge-bg-yellow"
        }, null, 8, ["show-badge"]),
        !__props.showSelect ? (openBlock(), createElementBlock("div", _hoisted_20, [
          createVNode(_sfc_main$2, {
            "utxo-type": "collateral",
            "show-divider": true,
            "badge-label": "utxoList-page:badge.collateral.label",
            "badge-hint": "utxoList-page:badge.collateral.hint",
            "badge-css": "et-badge et-badge-bg-blue",
            class: "mt-2"
          }),
          createVNode(_sfc_main$2, {
            "utxo-type": "locked",
            "show-divider": true,
            "badge-label": "utxoList-page:badge.locked.label",
            "badge-css": "et-badge"
          })
        ])) : createCommentVNode("", true)
      ], 64);
    };
  }
});

export { _sfc_main as _ };
