import { e as ref, D as computed, G as watch, ba as trimAllStrings, k as onUnmounted, aF as removeSignalListener, dg as onBuiltTxCleanUpScam, aE as addSignalListener, aC as dispatchSignal, dh as doBuildTxCleanUpScam, d as defineComponent, ab as mergeModels, ac as useModel, w as useTranslation, m as createElementBlock, o as openBlock, p as createBaseVNode, n as createVNode, a0 as renderSlot, u as unref, V as normalizeClass, c as createBlock, t as createCommentVNode, z as resolveComponent, U as withModifiers } from './index.js';
import { v as isVerified, F as getSortedAssetList } from './useAppAccountBalances.js';
import { u as useSelectedAccount } from './useSelectedAccount.js';
import { u as useGuard } from './useGuards.js';
import { u as usePaginator } from './usePaginator.js';
import { E as ErrorBuildTx } from './app2.js';
import { g as getRandomId } from './epochParams.js';
import { g as getTxBuiltErrorMsg } from './error.js';
import { u as useNotifications } from './useNotification.js';
import { u as useAdaSymbol } from './useAdaSymbol.js';
import { u as useHomeSettings } from './useHomeSettings.js';
import { _ as _sfc_main$1 } from './InputSearch.vue_vue_type_script_setup_true_lang.js';

const filterBySearchString = (_filteredAssetList, searchInputList) => {
  if (searchInputList.length === 0) {
    return;
  }
  if (searchInputList[0].length === 0) {
    return;
  }
  for (let i = _filteredAssetList.length - 1; i >= 0; i--) {
    const item = _filteredAssetList[i];
    for (let k = item.l.length - 1; k >= 0; k--) {
      const asset = item.l[k];
      const metadata = JSON.stringify(asset.ai ?? "");
      const filterData = (asset.p + asset.n + asset.f + metadata).toLowerCase();
      let found = false;
      for (const searchString of searchInputList) {
        if (filterData.includes(searchString.toLowerCase())) {
          found = true;
        }
      }
      if (!found) {
        item.l.splice(k, 1);
      }
    }
    if (item.l.length === 0) {
      _filteredAssetList.splice(i, 1);
    }
  }
  return _filteredAssetList;
};
const filterByVerifiedStatus = (_filteredAssetList, verifiedOnly = false) => {
  if (!verifiedOnly) {
    return;
  }
  const { isSpamAsset } = useGuard();
  for (let i = _filteredAssetList.length - 1; i >= 0; i--) {
    const item = _filteredAssetList[i];
    for (let k = item.l.length - 1; k >= 0; k--) {
      const asset = item.l[k];
      if (isSpamAsset(asset) || isVerified(item.p, asset.t.a)) {
        item.l.splice(k, 1);
      }
    }
  }
};
const filteredAssetList = ref([]);
const useAssetFilter = (originalAssetList, isCollection, selectedAssetList) => {
  const {
    spamAssets,
    isSpamAsset
  } = useGuard();
  const filterVerifiedOnly = ref(false);
  const filterAssetType = ref("ALL");
  const filterSearchInput = ref("");
  const selectedCollectionPolicyId = ref(void 0);
  const filterBadgeList = ref([]);
  const filterPolicyIdList = ref([]);
  const isFilterUpdating = ref(false);
  const hasScam = ref(false);
  const hasActiveFilter = computed(() => {
    return filterAssetType.value !== "ALL" || filterVerifiedOnly.value || filterSearchInput.value.length > 0 || filterBadgeList.value.length > 0 || filterPolicyIdList.value.length > 0;
  });
  let toid = -1;
  const setSelectCollectionPolicyId = (policyId) => {
    if (selectedCollectionPolicyId.value) {
      removeFilterBadge(selectedCollectionPolicyId.value);
    }
    selectedCollectionPolicyId.value = policyId;
    addFilterPolicyId(policyId);
    delayedUpdateFilteredAssetList(false, !!policyId);
  };
  const resetFilterBadge = () => {
    filterBadgeList.value = [];
    filterPolicyIdList.value = [];
    selectedCollectionPolicyId.value = void 0;
    filterAssetType.value = "ALL";
    delayedUpdateFilteredAssetList();
  };
  const removeFilterBadge = (badge) => {
    if (filterBadgeList.value.includes(badge)) {
      filterBadgeList.value = filterBadgeList.value.filter((_entry) => _entry !== badge);
    }
    if (selectedCollectionPolicyId.value === badge) {
      selectedCollectionPolicyId.value = void 0;
    }
    removeFilterPolicyId(badge);
    delayedUpdateFilteredAssetList();
  };
  const addFilterPolicyId = (policyId) => {
    if (policyId && policyId.length > 0 && !filterPolicyIdList.value.includes(policyId)) {
      filterPolicyIdList.value = [...filterPolicyIdList.value, policyId];
    }
  };
  const removeFilterPolicyId = (policyId) => {
    if (filterPolicyIdList.value.includes(policyId)) {
      filterPolicyIdList.value = filterPolicyIdList.value.filter((_policy) => _policy !== policyId);
    }
  };
  const addFilterBadge = (badge) => {
    if (badge.length > 0 && !filterBadgeList.value.includes(badge)) {
      filterBadgeList.value = [...filterBadgeList.value, badge];
      delayedUpdateFilteredAssetList();
    }
  };
  const addAllFilterBadges = (badgeList) => {
    const searchInputList = trimAllStrings(filterSearchInput.value.split(";"));
    badgeList = badgeList || filterBadgeList.value;
    for (const searchString of searchInputList) {
      if (!badgeList.includes(searchString)) {
        badgeList.push(searchString);
      }
    }
  };
  const updateFilteredAssetList = (initial = false) => {
    isFilterUpdating.value = true;
    clearTimeout(toid);
    let _filteredAssetList = [];
    let _hasScam = false;
    for (const policyGroup of originalAssetList.value) {
      if (!_hasScam) {
        for (const asset of policyGroup.l) {
          if (isSpamAsset(asset)) {
            _hasScam = true;
            break;
          }
        }
      }
      _filteredAssetList.push({
        p: policyGroup.p,
        c: policyGroup.c,
        l: policyGroup.l.concat()
      });
    }
    hasScam.value = _hasScam;
    filterByVerifiedStatus(_filteredAssetList, filterVerifiedOnly.value);
    if (filterPolicyIdList.value.length > 0) {
      for (let i = _filteredAssetList.length - 1; i >= 0; i--) {
        const item = _filteredAssetList[i];
        if (!filterPolicyIdList.value.includes(item.p)) {
          _filteredAssetList.splice(i, 1);
        }
      }
    }
    if (filterAssetType.value === "ALL") {
      for (let i = _filteredAssetList.length - 1; i >= 0; i--) {
        const item = _filteredAssetList[i];
        if (item.l.length === 0) {
          _filteredAssetList.splice(i, 1);
        }
      }
    } else if (filterAssetType.value === "SCAM") {
      for (let i = _filteredAssetList.length - 1; i >= 0; i--) {
        const item = _filteredAssetList[i];
        for (let k = item.l.length - 1; k >= 0; k--) {
          const asset = item.l[k];
          if (!isSpamAsset(asset)) {
            item.l.splice(k, 1);
          }
        }
        if (item.l.length === 0) {
          _filteredAssetList.splice(i, 1);
        }
      }
    } else if (filterAssetType.value === "NFT") {
      for (let i = _filteredAssetList.length - 1; i >= 0; i--) {
        const item = _filteredAssetList[i];
        for (let k = item.l.length - 1; k >= 0; k--) {
          const asset = item.l[k];
          if (asset?.ai?.ts !== "1") {
            item.l.splice(k, 1);
          }
        }
        if (item.l.length === 0) {
          _filteredAssetList.splice(i, 1);
        }
      }
    } else if (filterAssetType.value === "SELECTED") {
      for (let i = _filteredAssetList.length - 1; i >= 0; i--) {
        const item = _filteredAssetList[i];
        let assetItemFound = selectedAssetList?.value.find((detail) => detail.p === item.p);
        if (selectedAssetList && selectedAssetList.value.length > 0 && !assetItemFound) {
          _filteredAssetList.splice(i, 1);
        } else if (assetItemFound && isCollection) {
          for (let k = item.l.length - 1; k >= 0; k--) {
            const asset = item.l[k];
            if (!selectedAssetList?.value.find((detail) => detail.p === asset.p && asset.t?.a === detail.t.a)) {
              item.l.splice(k, 1);
            }
          }
        }
        if (item.l.length === 0) {
          _filteredAssetList.splice(i, 1);
        }
      }
    } else {
      for (let i = _filteredAssetList.length - 1; i >= 0; i--) {
        const item = _filteredAssetList[i];
        for (let k = item.l.length - 1; k >= 0; k--) {
          const asset = item.l[k];
          if (asset?.ai?.ts === "1") {
            item.l.splice(k, 1);
          }
        }
        if (item.l.length === 0) {
          _filteredAssetList.splice(i, 1);
        }
      }
    }
    const _filterBadgeList = [...filterBadgeList.value];
    addAllFilterBadges(_filterBadgeList);
    for (let i = _filterBadgeList.length - 1; i >= 0; i--) {
      if (filterPolicyIdList.value.includes(_filterBadgeList[i])) {
        _filterBadgeList.splice(i, 1);
      }
    }
    filterBySearchString(_filteredAssetList, filterPolicyIdList.value);
    filterBySearchString(_filteredAssetList, _filterBadgeList);
    if (initial) {
      const policyIdSet = /* @__PURE__ */ new Set();
      for (const policyGroup of _filteredAssetList) {
        policyIdSet.add(policyGroup.p);
      }
      const policyIdList = Array.from(policyIdSet);
      if (policyIdList.length === 1 && (filterPolicyIdList.value.length === 0 || filterPolicyIdList.value.length === 1 && filterPolicyIdList.value[0] !== policyIdList[0])) {
        setSelectCollectionPolicyId(policyIdList[0]);
      }
    }
    for (const policyGroup of _filteredAssetList) {
      policyGroup.c = policyGroup.l.length > 1;
    }
    filteredAssetList.value = _filteredAssetList;
    isFilterUpdating.value = false;
  };
  const delayedUpdateFilteredAssetList = (immediate = false, initial = false) => {
    clearTimeout(toid);
    if (immediate) {
      updateFilteredAssetList(initial);
      return;
    }
    toid = setTimeout(() => {
      updateFilteredAssetList(initial);
    }, 133);
  };
  watch(originalAssetList, () => {
    delayedUpdateFilteredAssetList(true);
  });
  watch(filterAssetType, () => {
    delayedUpdateFilteredAssetList();
  });
  watch(filterSearchInput, () => {
    delayedUpdateFilteredAssetList(false, true);
  });
  watch(filterVerifiedOnly, () => {
    delayedUpdateFilteredAssetList();
  });
  watch(() => spamAssets.value.length, () => {
    delayedUpdateFilteredAssetList();
  });
  return {
    isFilterUpdating,
    filterVerifiedOnly,
    filterAssetType,
    filterSearchInput,
    filterBadgeList,
    filterPolicyIdList,
    filteredAssetList,
    hasScam,
    hasActiveFilter,
    addFilterBadge,
    addAllFilterBadges,
    removeFilterBadge,
    resetFilterBadge,
    selectedCollectionPolicyId,
    setSelectCollectionPolicyId
  };
};

const useAssetList = (_multiasset, _selectedAssetList) => {
  const { accountData } = useSelectedAccount();
  const multiasset = computed(() => _multiasset.value ?? accountData.value?.balance.multiasset);
  const _sortedAssetList = ref([]);
  const isCollectionSelected = ref(false);
  const setSortedAssetList = async () => {
    const { sortedAssetList } = await getSortedAssetList(multiasset.value);
    _sortedAssetList.value = sortedAssetList;
  };
  watch(() => multiasset.value, () => {
    setSortedAssetList();
  }, { immediate: true, deep: true });
  const assetFilter = useAssetFilter(_sortedAssetList, isCollectionSelected, _selectedAssetList);
  const {
    filteredAssetList,
    selectedCollectionPolicyId
  } = assetFilter;
  watch(selectedCollectionPolicyId, () => {
    isCollectionSelected.value = !!selectedCollectionPolicyId;
  });
  const selectedCollectionAssets = computed(() => {
    if (!selectedCollectionPolicyId.value) {
      return [];
    }
    const tmp = filteredAssetList.value.filter((a) => a.p === selectedCollectionPolicyId.value) ?? [];
    if (tmp.length === 0) {
      return [];
    }
    return tmp[0].l;
  });
  const paginatorAssets = usePaginator(filteredAssetList, 18);
  const paginatorPolicies = usePaginator(selectedCollectionAssets, 18);
  const numAssets = computed(() => {
    let num = 0;
    if (selectedCollectionAssets.value.length > 0) {
      return selectedCollectionAssets.value.length;
    }
    const assetList = filteredAssetList.value;
    for (const asset of assetList) {
      if (asset.c) {
        num += asset.l.length;
      } else {
        num += 1;
      }
    }
    return num;
  });
  return {
    selectedAssetList: _selectedAssetList,
    sortedAssetList: _sortedAssetList,
    assetFilter,
    isCollectionSelected,
    multiasset,
    numAssets,
    paginatorAssets,
    paginatorPolicies
  };
};

const useScamCleanup = ($t) => {
  const storeId = "useScamCleanup-" + getRandomId();
  const { show } = useNotifications();
  const { adaSymbol } = useAdaSymbol();
  const createScamCleanupTx = async () => {
    addSignalListener(onBuiltTxCleanUpScam, storeId, (res, error) => {
      removeSignalListener(onBuiltTxCleanUpScam, storeId);
      if (res?.error) {
        console.error("Error building scam cleanup tx:", res.error);
        const { msg, isWarning } = getTxBuiltErrorMsg(res ? res.error : ErrorBuildTx.missingAccountData, 0, { value: 0 }, adaSymbol);
        if (msg.length > 0) {
          show({
            message: msg,
            type: isWarning ? "warning" : "error"
          });
        }
      } else if (error) {
        show({
          message: error,
          type: "error"
        });
      } else {
        show({
          message: $t("scam:cleanup.prepared.label"),
          type: "success"
        });
      }
    });
    await dispatchSignal(doBuildTxCleanUpScam);
  };
  onUnmounted(() => {
    removeSignalListener(onBuiltTxCleanUpScam, storeId);
  });
  return { createScamCleanupTx };
};

ref("grid");

const _hoisted_1 = { class: "relative w-full flex flex-wrap et-js-ic et-gap-md et-max-width-page" };
const _hoisted_2 = { class: "relative w-full flex flex-wrap et-js-ic et-gap-y-sme et-gap-x-sm sm:et-gap-x-mde" };
const _hoisted_3 = { class: "flex flex-wrap et-js-ic et-gap-sm" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AssetListFilters",
  props: /* @__PURE__ */ mergeModels({
    hasScam: { type: Boolean, required: false, default: false },
    filterBySelected: { type: Boolean, required: false, default: false },
    isSelectable: { type: Boolean, required: false, default: false }
  }, {
    "filterSearchInput": { type: String, required: true },
    "filterSearchInputModifiers": {},
    "filterAssetType": { type: String, required: true },
    "filterAssetTypeModifiers": {},
    "isUpdating": { type: Boolean, ...{ type: Boolean, required: true } },
    "isUpdatingModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["enter"], ["update:filterSearchInput", "update:filterAssetType", "update:isUpdating"]),
  setup(__props) {
    const filterSearchInput = useModel(__props, "filterSearchInput");
    const filterAssetType = useModel(__props, "filterAssetType");
    const isUpdating = useModel(__props, "isUpdating");
    const props = __props;
    const $t = useTranslation().t;
    const { createScamCleanupTx } = useScamCleanup($t);
    const { showBlurBgs } = useHomeSettings();
    const onSelectAssetType = (type) => {
      filterAssetType.value = type;
    };
    watch(() => props.hasScam, () => {
      if (!props.hasScam && filterAssetType.value === "SCAM") {
        filterAssetType.value = "ALL";
      }
    }, { immediate: true });
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_Divider = resolveComponent("Divider");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createVNode(_sfc_main$1, {
            class: normalizeClass([unref(showBlurBgs) ? "backdrop-blur-modal" : "bg-bg-app/50", "relative w-full sm:w-auto sm:grow sm:min-w-96"]),
            input: filterSearchInput.value,
            "onUpdate:input": _cache[0] || (_cache[0] = ($event) => filterSearchInput.value = $event),
            "show-spinner": isUpdating.value,
            placeholder: unref($t)("assets:filter.search"),
            onEnter: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("enter", filterSearchInput.value))
          }, null, 8, ["class", "input", "show-spinner", "placeholder"]),
          createBaseVNode("div", _hoisted_3, [
            __props.filterBySelected ? (openBlock(), createBlock(_component_Button, {
              key: 0,
              class: normalizeClass(["px-2 sm:px-4 py-1 select-none et-text-sm", filterAssetType.value !== "SELECTED" ? "" : "bg-bg-positive/90 ring-1 ring-offset-1 ring-offset-black ring-border-positive"]),
              severity: "secondary",
              label: unref($t)("common:selected"),
              outlined: "",
              rounded: "",
              onClick: _cache[2] || (_cache[2] = withModifiers(($event) => onSelectAssetType("SELECTED"), ["prevent", "stop"]))
            }, null, 8, ["class", "label"])) : createCommentVNode("", true),
            createVNode(_component_Button, {
              class: normalizeClass(["px-2 sm:px-4 py-1 select-none et-bg-highlight et-bg-highlight-hover et-text-sm", filterAssetType.value !== "ALL" ? "" : "ring-1 ring-offset-1 ring-offset-black ring-border-highlight"]),
              severity: "secondary",
              pt: { label: "font-semibold" },
              outlined: "",
              rounded: "",
              label: unref($t)("common:all"),
              onClick: _cache[3] || (_cache[3] = withModifiers(($event) => onSelectAssetType("ALL"), ["prevent", "stop"]))
            }, null, 8, ["class", "label"]),
            createVNode(_component_Button, {
              class: normalizeClass(["px-2 sm:px-4 py-1 select-none bg-blue hover:bg-blue/70 et-text-sm text-black", filterAssetType.value !== "NFT" ? "" : "ring-1 ring-offset-1 ring-offset-black ring-blue"]),
              severity: "secondary",
              outlined: "",
              rounded: "",
              pt: { label: "font-semibold" },
              label: unref($t)("common:nft"),
              onClick: _cache[4] || (_cache[4] = withModifiers(($event) => onSelectAssetType("NFT"), ["prevent", "stop"]))
            }, null, 8, ["class", "label"]),
            createVNode(_component_Button, {
              class: normalizeClass(["px-2 sm:px-4 py-1 select-none bg-green hover:bg-green/70 et-text-sm text-black", filterAssetType.value !== "FT" ? "" : "ring-1 ring-offset-1 ring-offset-black ring-green"]),
              severity: "secondary",
              label: unref($t)("common:ft"),
              outlined: "",
              rounded: "",
              onClick: _cache[5] || (_cache[5] = withModifiers(($event) => onSelectAssetType("FT"), ["prevent", "stop"]))
            }, null, 8, ["class", "label"]),
            __props.hasScam ? (openBlock(), createBlock(_component_Button, {
              key: 1,
              class: normalizeClass(["px-2 sm:px-4 py-1 select-none et-text-sm", filterAssetType.value !== "SCAM" ? "" : "bg-bg-negative/90 ring-1 ring-offset-1 ring-offset-black ring-bg-negative"]),
              severity: "secondary",
              label: unref($t)("common:scam"),
              outlined: "",
              rounded: "",
              onClick: _cache[6] || (_cache[6] = ($event) => onSelectAssetType("SCAM"))
            }, null, 8, ["class", "label"])) : createCommentVNode("", true),
            __props.hasScam && !__props.isSelectable ? (openBlock(), createBlock(_component_Divider, {
              key: 2,
              layout: "vertical",
              class: "ml-1 mr-2"
            })) : createCommentVNode("", true),
            __props.hasScam && !__props.isSelectable ? (openBlock(), createBlock(_component_Button, {
              key: 3,
              class: "px-2 sm:px-4 py-0.5 select-none et-text-sm et-bg-highlight et-bg-highlight-hover ring-1 ring-offset-1 ring-offset-black ring-border-highlight",
              label: unref($t)("common:button.cleanUp"),
              outlined: "",
              rounded: "",
              onClick: withModifiers(unref(createScamCleanupTx), ["prevent", "stop"])
            }, null, 8, ["label", "onClick"])) : createCommentVNode("", true)
          ]),
          renderSlot(_ctx.$slots, "count")
        ])
      ]);
    };
  }
});

export { _sfc_main as _, useAssetList as u };
