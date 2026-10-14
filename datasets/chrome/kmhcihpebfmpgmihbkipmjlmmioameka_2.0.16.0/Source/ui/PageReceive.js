import { d as defineComponent, Y as toRefs, w as useTranslation, x as useScreenSize, D as computed, m as createElementBlock, t as createCommentVNode, o as openBlock, p as createBaseVNode, B as toDisplayString, u as unref, c as createBlock, l as useTheme, F as Fragment, S as renderList, z as resolveComponent, e as ref, P as networkId, Q as reactive, G as watch, f as onMounted, aE as addSignalListener, aT as onNetworkFeaturesUpdated, k as onUnmounted, aF as removeSignalListener, n as createVNode, $ as createSlots, y as withCtx } from './index.js';
import { d as isStakingEnabled } from './NetworkId.js';
import { R as isEntAddrSupported } from './app2.js';
import { g as getRandomId } from './epochParams.js';
import { b as getPaymentBaseAddressList, c as getChangeBaseAddressList, d as getPaymentEnterpriseAddressList, e as getChangeEnterpriseAddressList } from './useAppAccountBalances.js';
import { u as useSelectedAccount } from './useSelectedAccount.js';
import { I as IconArrowLB } from './IconArrowLB.js';
import { _ as _sfc_main$5 } from './InputSearch.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$6 } from './TabsToSelect.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$3 } from './PageHeader.vue_vue_type_script_setup_true_lang.js';
import { u as usePaginator } from './usePaginator.js';
import { u as useModalReceiveAddress } from './useModalReceiveAddress.js';
import { _ as _sfc_main$2 } from './ReceiveListItem.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$4 } from './ReceiveCardList.vue_vue_type_script_setup_true_lang.js';
import './bigmath.js';
import './_plugin-vue_export-helper.js';
import './IconCancel01.js';
import './IconSearch01.js';
import './useAppMode.js';
import './CopyToClipboard.vue_vue_type_script_setup_true_lang.js';
import './index3.js';
import './useNotification.js';
import './notification.js';
import './IconCopy01.js';
import './TransactionUTxOAddress.vue_vue_type_script_setup_true_lang.js';
import './Bech32Display.vue_vue_type_script_setup_true_lang.js';
import './ExplorerLink.vue_vue_type_script_setup_true_lang.js';
import './ContextMenu.vue_vue_type_script_setup_true_lang.js';
import './IconInformationCircle.js';
import './IconLinkSquare01.js';
import './ResolvedImage.vue_vue_type_script_setup_true_lang.js';
import './useModalImage.js';
import './AdaHandleName.vue_vue_type_script_setup_true_lang.js';
import './useBalanceVisible.js';
import './IconFxLoader.js';
import './index2.js';
import './DrawSVGPlugin.js';
import './QRCodeRenderer.vue_vue_type_script_setup_true_lang.js';

const _hoisted_1$1 = {
  key: 0,
  class: "relative w-full flex flex-col et-gap-md"
};
const _hoisted_2$1 = { class: "" };
const _hoisted_3$1 = {
  key: 0,
  class: ""
};
const _hoisted_4$1 = { class: "w-full flex flex-row et-js-is" };
const _hoisted_5$1 = { class: "flex flex-col et-gap-sm" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ReceiveList",
  props: {
    headline: { type: String, default: "", required: true },
    text: { type: String, default: "", required: true },
    itemsOnPage: { type: Number, default: 10, required: false },
    isFilteredResult: { type: Boolean, default: false, required: false },
    hideOnEmptyResults: { type: Boolean, default: false, required: false },
    highlight: { type: Boolean, default: false, required: false },
    // TODO: Not too sure about Refs as props here.
    list: { type: Object, default: [], required: true }
  },
  setup(__props) {
    const props = __props;
    const {
      list,
      isFilteredResult,
      hideOnEmptyResults
    } = toRefs(props);
    useTranslation().t;
    const {
      getPaginatorTemplate
    } = useTheme();
    const { isSmallerThanSM } = useScreenSize();
    const {
      openModalReceiveAddress
    } = useModalReceiveAddress();
    const {
      numItemsPerPage,
      numItems,
      numPages,
      page,
      onPageStateUpdate
    } = usePaginator(list, props.itemsOnPage);
    const showPagination = computed(() => numItems.value > numItemsPerPage.value);
    const hideContent = computed(() => hideOnEmptyResults.value && list.value.length === 0);
    const openModalShare = (item) => {
      openModalReceiveAddress(item);
    };
    return (_ctx, _cache) => {
      const _component_Paginator = resolveComponent("Paginator");
      return !hideContent.value ? (openBlock(), createElementBlock("div", _hoisted_1$1, [
        createBaseVNode("div", null, [
          createBaseVNode("div", _hoisted_2$1, toDisplayString(__props.headline), 1),
          !unref(isFilteredResult) ? (openBlock(), createElementBlock("div", _hoisted_3$1, toDisplayString(__props.text), 1)) : createCommentVNode("", true)
        ]),
        createBaseVNode("div", _hoisted_4$1, [
          showPagination.value ? (openBlock(), createBlock(_component_Paginator, {
            key: 0,
            class: "py-0",
            "page-link-size": unref(isSmallerThanSM) ? 3 : 5,
            template: unref(getPaginatorTemplate)(),
            rows: unref(numItemsPerPage),
            "total-records": unref(numItems),
            onPage: unref(onPageStateUpdate)
          }, null, 8, ["page-link-size", "template", "rows", "total-records", "onPage"])) : createCommentVNode("", true)
        ]),
        createBaseVNode("div", _hoisted_5$1, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(page), (item) => {
            return openBlock(), createBlock(_sfc_main$2, {
              key: item.bech32,
              item,
              onOpenShare: openModalShare,
              "hide-copy": ""
            }, null, 8, ["item"]);
          }), 128))
        ])
      ])) : createCommentVNode("", true);
    };
  }
});

const _hoisted_1 = { class: "page-receive flex flex-col et-js et-gap-md et-max-width-page" };
const _hoisted_2 = { class: "relative w-full flex flex-col et-gap-md" };
const _hoisted_3 = { class: "" };
const _hoisted_4 = { class: "text-txt-muted" };
const _hoisted_5 = {
  key: 0,
  class: "flex flex-col et-js-is et-gap-lg"
};
const _hoisted_6 = {
  key: 0,
  class: "w-full flex flex-col et-js-is et-gap-lg"
};
const _hoisted_7 = { class: "" };
const _hoisted_8 = { class: "w-full flex flex-wrap et-gap-md" };
const _hoisted_9 = { class: "grow" };
const _hoisted_10 = {
  key: 2,
  class: "text-txt-muted"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PageReceive",
  setup(__props) {
    const storeId = "PageReceive" + getRandomId();
    const $t = useTranslation().t;
    const { isSmallerThanXXS } = useScreenSize();
    const {
      appAccount,
      accountData,
      accountSettings
    } = useSelectedAccount();
    const isSamEnabled = accountSettings.isSamEnabled;
    const receiveAddress = accountSettings.receiveAddress;
    const forcedUnusedAddress = accountSettings.forcedUnusedAddress;
    const adaHandleList = accountSettings.adaHandleList;
    const adaHandle = accountSettings.adaHandle.adaHandle;
    const showAllKeys = ref(false);
    const searchInputError = ref("");
    const searchInput = ref("");
    const searchRunning = ref(false);
    const minInputLength = ref(1);
    const filterType = ref(0);
    let stakeIsEnabled = isStakingEnabled(networkId.value);
    const filterOptions = ref([
      { primaryLabel: $t("common:all"), value: 0 },
      { primaryLabel: $t("common:used"), value: 1 },
      { primaryLabel: $t("common:unused"), value: 2 }
    ]);
    const selectedFilterOption = ref(filterOptions.value[0]);
    const validateSearchInput = () => {
      if (searchInput.value.length > 0 && searchInput.value.length < minInputLength.value) {
        searchInputError.value = $t("receive-page:filter.error.minLength");
      } else {
        searchInputError.value = "";
      }
    };
    const handleSelectFilterType = (type) => {
      selectedFilterOption.value = type;
      filterType.value = type.value;
      clearSearchTimeout();
      startSearchTimeout();
    };
    const resetFilter = () => {
      searchInput.value = "";
      searchInputError.value = "";
      searchRunning.value = false;
      clearSearchTimeout();
    };
    const hideListsOnEmptyResult = ref(true);
    const isFilteredResult = ref(false);
    const noResultsWarning = ref(false);
    const receiveAddressList = reactive([]);
    let searchingTimeout = -1;
    const searchInputEmpty = computed(() => searchInput.value.length === 0);
    const filteredExternalAddrList = ref([]);
    const filteredInternalAddrList = ref([]);
    const filteredEnterpriseExternalAddrList = ref([]);
    const filteredEnterpriseInternalAddrList = ref([]);
    const initialBaseExternalAddrList = ref([]);
    const initialBaseInternalAddrList = ref([]);
    const initialEnterpriseExternalAddrList = ref([]);
    const initialEnterpriseInternalAddrList = ref([]);
    const listsOnPage = ref([
      filteredExternalAddrList,
      filteredInternalAddrList,
      filteredEnterpriseExternalAddrList,
      filteredEnterpriseInternalAddrList
    ]);
    const resultSize = ref(0);
    watch(searchInput, () => {
      validateSearchInput();
      clearSearchTimeout();
      if (searchInputEmpty.value) {
        isFilteredResult.value = false;
      }
      startSearchTimeout();
    });
    const updateStakeEnabledStatus = (force = false) => {
      const newState = isStakingEnabled(networkId.value);
      if (!force && stakeIsEnabled === newState) {
        return;
      }
      stakeIsEnabled = newState;
      resetFilter();
      filteredExternalAddrList.value.splice(0);
      filteredInternalAddrList.value.splice(0);
      filteredEnterpriseExternalAddrList.value.splice(0);
      filteredEnterpriseInternalAddrList.value.splice(0);
      getAdditionalAddresses();
      initialBaseExternalAddrList.value = filteredExternalAddrList.value;
      initialBaseInternalAddrList.value = filteredInternalAddrList.value;
      initialEnterpriseExternalAddrList.value = filteredEnterpriseExternalAddrList.value;
      initialEnterpriseInternalAddrList.value = filteredEnterpriseInternalAddrList.value;
    };
    onMounted(() => {
      addSignalListener(onNetworkFeaturesUpdated, storeId, updateStakeEnabledStatus);
      getAdditionalAddresses();
      initialBaseExternalAddrList.value = filteredExternalAddrList.value;
      initialBaseInternalAddrList.value = filteredInternalAddrList.value;
      initialEnterpriseExternalAddrList.value = filteredEnterpriseExternalAddrList.value;
      initialEnterpriseInternalAddrList.value = filteredEnterpriseInternalAddrList.value;
    });
    onUnmounted(() => removeSignalListener(onNetworkFeaturesUpdated, storeId));
    const restoreAddressLists = () => {
      filteredExternalAddrList.value = initialBaseExternalAddrList.value;
      filteredInternalAddrList.value = initialBaseInternalAddrList.value;
      filteredEnterpriseExternalAddrList.value = initialEnterpriseExternalAddrList.value;
      filteredEnterpriseInternalAddrList.value = initialEnterpriseInternalAddrList.value;
    };
    const clearSearchTimeout = () => {
      searchRunning.value = false;
      clearTimeout(searchingTimeout);
    };
    const startSearchTimeout = () => {
      searchingTimeout = setTimeout(() => {
        restoreAddressLists();
        searchRunning.value = true;
        filterAddressesOnSearch();
      }, searchInput.value.length === 0 ? 0 : 300);
    };
    const filterAddressesOnSearch = () => {
      if (searchInput.value.length === 4 && Number(searchInput.value) || searchInput.value.includes("/") || searchInput.value.includes(" ") || searchInput.value.includes("'")) {
        filteredExternalAddrList.value = filteredExternalAddrList.value.filter(filterByPath);
        filteredInternalAddrList.value = filteredInternalAddrList.value.filter(filterByPath);
        filteredEnterpriseExternalAddrList.value = filteredEnterpriseExternalAddrList.value.filter(filterByPath);
        filteredEnterpriseInternalAddrList.value = filteredEnterpriseInternalAddrList.value.filter(filterByPath);
      } else {
        filteredExternalAddrList.value = filteredExternalAddrList.value.filter(filterByString);
        filteredInternalAddrList.value = filteredInternalAddrList.value.filter(filterByString);
        filteredEnterpriseExternalAddrList.value = filteredEnterpriseExternalAddrList.value.filter(filterByString);
        filteredEnterpriseInternalAddrList.value = filteredEnterpriseInternalAddrList.value.filter(filterByString);
      }
      isFilteredResult.value = true;
      if (filterType.value === 0 && searchInputEmpty.value) {
        isFilteredResult.value = false;
      }
      showAllKeys.value = true;
      searchRunning.value = false;
      resultSize.value = listsOnPage.value.map((list) => list.value.length).reduce((last, current) => last + current, 0);
      noResultsWarning.value = resultSize.value === 0;
    };
    const filterByPath = (address) => {
      let searchValue = searchInput.value ?? "";
      searchValue = searchValue.replace(/m\//gi, "");
      searchValue = searchValue.replace(/m /gi, "");
      searchValue = searchValue.replace(/m/gi, "");
      if (searchValue.includes("/")) {
        searchValue = searchValue.replace(/\//g, " ");
      }
      if (searchValue.includes("'")) {
        searchValue = searchValue.replace(/\'/g, "");
      }
      searchValue = searchValue.replace(/\s\s+/g, " ");
      if (filterType.value === 0) {
        return address.searchablePath.includes(searchValue);
      }
      if (filterType.value === 1 && address.used) {
        return searchInputEmpty.value || !searchInputEmpty.value && address.searchablePath.includes(searchValue);
      }
      if (filterType.value === 2 && !address.used) {
        return searchInputEmpty.value || !searchInputEmpty.value && address.searchablePath.includes(searchValue);
      }
      return false;
    };
    const transformInfo = (addr) => {
      addr.pathInfo = addr.pathInfo + " (" + (addr.used ? $t("common:used") : $t("common:unused")) + ")";
      return addr;
    };
    const filterByString = (address) => {
      if (filterType.value === 0) {
        return address.bech32.includes(searchInput.value);
      }
      if (filterType.value === 1 && address.used) {
        return searchInputEmpty.value || !searchInputEmpty.value && address.bech32.includes(searchInput.value);
      }
      if (filterType.value === 2 && !address.used) {
        return searchInputEmpty.value || !searchInputEmpty.value && address.bech32.includes(searchInput.value);
      }
      return false;
    };
    watch(receiveAddress, (value) => {
      if (isSamEnabled.value && value) {
        receiveAddressList.splice(0, receiveAddressList.length, value);
      } else {
        const _accountData = accountData.value;
        if (_accountData) {
          const addrList = stakeIsEnabled ? getPaymentBaseAddressList(_accountData, true, 1) : getPaymentEnterpriseAddressList(_accountData, true, 1);
          receiveAddressList.splice(0, receiveAddressList.length, ...addrList.map(transformInfo));
        }
      }
      updateStakeEnabledStatus(true);
    }, { immediate: true });
    function getAdditionalAddresses() {
      const _accountData = accountData.value;
      if (_accountData) {
        if (showAllKeys.value) {
          startSearchTimeout();
        }
        if (searchInputEmpty.value) {
          if (stakeIsEnabled) {
            updateBaseExternalAddrList(_accountData);
            updateBaseInternalAddrList(_accountData);
          }
          if (isEntAddrSupported(_accountData.account.signType)) {
            updateEnterpriseExternalAddrList(_accountData);
            updateEnterpriseInternalAddrList(_accountData);
          }
        }
      }
    }
    function updateBaseExternalAddrList(accountData2) {
      if (filteredExternalAddrList.value.length !== 0) {
        return;
      }
      filteredExternalAddrList.value = getPaymentBaseAddressList(accountData2, false).map(transformInfo);
    }
    function updateBaseInternalAddrList(accountData2) {
      if (filteredInternalAddrList.value.length !== 0) {
        return;
      }
      filteredInternalAddrList.value = getChangeBaseAddressList(accountData2, false).map(transformInfo);
    }
    function updateEnterpriseExternalAddrList(accountData2) {
      if (filteredEnterpriseExternalAddrList.value.length !== 0) {
        return;
      }
      filteredEnterpriseExternalAddrList.value = getPaymentEnterpriseAddressList(accountData2, false).map(transformInfo);
    }
    function updateEnterpriseInternalAddrList(accountData2) {
      if (filteredEnterpriseInternalAddrList.value.length !== 0) {
        return;
      }
      filteredEnterpriseInternalAddrList.value = getChangeEnterpriseAddressList(accountData2, false).map(transformInfo);
    }
    return (_ctx, _cache) => {
      const _component_Panel = resolveComponent("Panel");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createVNode(_sfc_main$3, {
            title: unref($t)("receive-page:title")
          }, createSlots({
            icon: withCtx(() => [
              createVNode(IconArrowLB, { class: "size-5" })
            ]),
            _: 2
          }, [
            !unref(isSmallerThanXXS) ? {
              name: "caption",
              fn: withCtx(() => [
                createBaseVNode("div", _hoisted_3, toDisplayString(unref(isSamEnabled) ? unref($t)("receive-page:current.static") : unref($t)("receive-page:current.headline")), 1)
              ]),
              key: "0"
            } : void 0,
            !unref(isSmallerThanXXS) ? {
              name: "sub-caption",
              fn: withCtx(() => [
                createBaseVNode("div", _hoisted_4, toDisplayString(unref($t)("receive-page:current.caption")), 1)
              ]),
              key: "1"
            } : void 0
          ]), 1032, ["title"]),
          unref(appAccount) ? (openBlock(), createElementBlock("div", _hoisted_5, [
            createVNode(_sfc_main$4, {
              "receive-address": unref(receiveAddress) ?? void 0,
              "forced-unused-address": unref(forcedUnusedAddress) ?? void 0,
              "ada-handle-list": unref(adaHandleList),
              "ada-handle": unref(adaHandle) ?? void 0
            }, null, 8, ["receive-address", "forced-unused-address", "ada-handle-list", "ada-handle"]),
            !unref(isSamEnabled) ? (openBlock(), createElementBlock("div", _hoisted_6, [
              createVNode(_component_Panel, {
                header: unref($t)("receive-page:current.notice.label"),
                class: "w-full rounded-2xl",
                toggleable: "",
                collapsed: ""
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_7, toDisplayString(unref($t)("receive-page:current.notice.text")), 1)
                ]),
                _: 1
              }, 8, ["header"]),
              createBaseVNode("div", _hoisted_8, [
                createBaseVNode("div", _hoisted_9, [
                  !unref(isSamEnabled) ? (openBlock(), createBlock(_sfc_main$5, {
                    key: 0,
                    input: searchInput.value,
                    "onUpdate:input": _cache[0] || (_cache[0] = ($event) => searchInput.value = $event),
                    placeholder: unref($t)("receive-page:search.placeholder")
                  }, null, 8, ["input", "placeholder"])) : createCommentVNode("", true)
                ]),
                createVNode(_sfc_main$6, {
                  "selected-tab": selectedFilterOption.value,
                  "onUpdate:selectedTab": [
                    _cache[1] || (_cache[1] = ($event) => selectedFilterOption.value = $event),
                    handleSelectFilterType
                  ],
                  "tab-labels": filterOptions.value,
                  "compact-on-count": 5
                }, null, 8, ["selected-tab", "tab-labels"])
              ]),
              createVNode(_sfc_main$1, {
                headline: unref($t)("receive-page:external.delegated.headline"),
                text: unref($t)("receive-page:external.delegated.caption"),
                list: filteredExternalAddrList.value,
                "is-filtered-result": isFilteredResult.value,
                "hide-on-empty-results": hideListsOnEmptyResult.value,
                highlight: true
              }, null, 8, ["headline", "text", "list", "is-filtered-result", "hide-on-empty-results"]),
              createVNode(_sfc_main$1, {
                headline: unref($t)("receive-page:internal.delegated.headline"),
                text: unref($t)("receive-page:internal.delegated.caption"),
                list: filteredInternalAddrList.value,
                "is-filtered-result": isFilteredResult.value,
                "hide-on-empty-results": hideListsOnEmptyResult.value,
                highlight: true
              }, null, 8, ["headline", "text", "list", "is-filtered-result", "hide-on-empty-results"]),
              unref(accountData) && unref(isEntAddrSupported)(unref(accountData).account.signType) ? (openBlock(), createBlock(_sfc_main$1, {
                key: 0,
                headline: unref($t)("receive-page:external.enterprise.headline"),
                text: unref($t)("receive-page:external.enterprise.caption"),
                list: filteredEnterpriseExternalAddrList.value,
                "is-filtered-result": isFilteredResult.value,
                "hide-on-empty-results": hideListsOnEmptyResult.value,
                highlight: true
              }, null, 8, ["headline", "text", "list", "is-filtered-result", "hide-on-empty-results"])) : createCommentVNode("", true),
              unref(accountData) && unref(isEntAddrSupported)(unref(accountData).account.signType) ? (openBlock(), createBlock(_sfc_main$1, {
                key: 1,
                headline: unref($t)("receive-page:internal.enterprise.headline"),
                text: unref($t)("receive-page:internal.enterprise.caption"),
                list: filteredEnterpriseInternalAddrList.value,
                "is-filtered-result": isFilteredResult.value,
                "hide-on-empty-results": hideListsOnEmptyResult.value,
                highlight: true
              }, null, 8, ["headline", "text", "list", "is-filtered-result", "hide-on-empty-results"])) : createCommentVNode("", true),
              noResultsWarning.value ? (openBlock(), createElementBlock("div", _hoisted_10, toDisplayString(unref($t)("receive-page:search.noResults")), 1)) : createCommentVNode("", true)
            ])) : createCommentVNode("", true)
          ])) : createCommentVNode("", true)
        ])
      ]);
    };
  }
});

export { _sfc_main as default };
