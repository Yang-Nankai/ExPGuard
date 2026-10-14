import { d as defineComponent, w as useTranslation, x as useScreenSize, D as computed, P as networkId, e as ref, G as watch, f as onMounted, aE as addSignalListener, b2 as onInterval20s, k as onUnmounted, aF as removeSignalListener, m as createElementBlock, o as openBlock, p as createBaseVNode, n as createVNode, $ as createSlots, y as withCtx, u as unref, z as resolveComponent, B as toDisplayString, l as useTheme, c as createBlock, t as createCommentVNode, V as normalizeClass, H as createTextVNode, a1 as withDirectives, a2 as resolveDirective, j as isIosApp } from './index.js';
import { g as getNetworkDecimals } from './NetworkId.js';
import { d as divide, m as multiply, c as compare, j as add } from './bigmath.js';
import { a7 as getIAppWallet } from './app2.js';
import { u as useCurrencyAPI } from './useCurrencyAPI.js';
import { u as useSelectedAccount } from './useSelectedAccount.js';
import { u as useAppWalletIdList, I as IconPieChart } from './IconPieChart.js';
import { u as useFormatter } from './useFormatter.js';
import { u as useAdaSymbol } from './useAdaSymbol.js';
import { u as useTokenPrices } from './useTokenPrices.js';
import { u as useNavigation } from './useNavigation.js';
import { u as useModalBuyADA } from './useModalBuyADA.js';
import { u as useModalAssetDetails } from './useModalAssetDetails.js';
import { _ as _sfc_main$1 } from './PageHeader.vue_vue_type_script_setup_true_lang.js';
import { I as IconSpinner } from './IconSpinner.js';
import { _ as _sfc_main$8 } from './AdaAmount.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$2 } from './AdaAmountRaw.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$3 } from './FiatAmount.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$7 } from './FormattedAmount.vue_vue_type_script_setup_true_lang.js';
import { C as CardDataTable } from './CardDataTable.js';
import { _ as _sfc_main$5 } from './SwapTimeAgo.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$6 } from './TokenIcon.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$4 } from './FxPortfolioAnimation.vue_vue_type_script_setup_true_lang.js';
import './epochParams.js';
import './currency2.js';
import './useAppAccountBalances.js';
import './_plugin-vue_export-helper.js';
import './language.js';
import './swap.js';
import './send.js';
import './useResetScroll.js';
import './useAppMode.js';
import './index3.js';
import './useNotification.js';
import './notification.js';
import './useBalanceVisible.js';
import './image.js';
import './index2.js';
import './DrawSVGPlugin.js';

const _hoisted_1 = { class: "page-portfolio flex flex-wrap et-js et-gap-md et-max-width-page" };
const _hoisted_2 = { class: "relative w-full flex flex-col et-gap-md" };
const _hoisted_3 = { class: "flex flex-row et-js-ie et-gap-xs stroke-white" };
const _hoisted_4 = { class: "et-text-xs uppercase" };
const _hoisted_5 = { class: "" };
const _hoisted_6 = { class: "text-txt-muted" };
const _hoisted_7 = { class: "relative flex flex-row et-jb-is et-gap-sm" };
const _hoisted_8 = { class: "flex flex-col et-gap-xs" };
const _hoisted_9 = { class: "et-text-sm text-txt-muted" };
const _hoisted_10 = { class: "flex flex-col et-js-ie gap-1.5" };
const _hoisted_11 = { class: "absolute bottom-0 right-1 size-1" };
const _hoisted_12 = { class: "flex flex-row et-jc-ic et-gap-sm" };
const _hoisted_13 = { class: "w-full h-full flex justify-center items-center" };
const _hoisted_14 = { class: "flex et-ic et-gap-md" };
const _hoisted_15 = { class: "flex flex-col text-start" };
const _hoisted_16 = { class: "et-text-xs" };
const _hoisted_17 = { class: "et-text-md -mb-1" };
const storeId = "PortfolioView";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PagePortfolio",
  setup(__props) {
    const $t = useTranslation().t;
    const { isSmallerThanXS } = useScreenSize();
    const {
      getPaginatorTemplateRows
    } = useTheme();
    const { formatSmallNumber } = useFormatter();
    const {
      appAccount,
      accountData
    } = useSelectedAccount();
    const {
      activeCurrency,
      getCurrencyAmount
    } = useCurrencyAPI();
    const {
      adaCurrency
    } = useAdaSymbol();
    const {
      openModalBuyADA,
      showModalBuyADA
    } = useModalBuyADA();
    const {
      openModalAssetDetailsById
    } = useModalAssetDetails();
    const { gotoSwapWithAsset } = useNavigation();
    const { loadTokenPriceList } = useTokenPrices();
    const networkDecimals = computed(() => getNetworkDecimals(networkId.value));
    const coin = computed(() => appAccount.value?.data.balance.coin ?? "0");
    const fiatPrice = computed(() => activeCurrency.value.value);
    const portfolioAda = ref("0");
    const portfolioLovelace = ref("0");
    const portfolioTokens = ref([]);
    const portfolioNumAssets = ref(0);
    const lastFetch = ref(0);
    const isLoading = ref(true);
    const useAllAccounts = ref(false);
    let _toid = -1;
    const doRequestAllAssets = async () => {
      clearTimeout(_toid);
      let _preparedTokens = [];
      let _portfolioLovelace = coin.value;
      let _portfolioAda = divide(coin.value, Math.pow(10, networkDecimals.value));
      const assetsToUse = getMyAssets();
      lastFetch.value = Date.now();
      portfolioNumAssets.value = 0;
      const _fiatPrice = fiatPrice.value.toFixed(4);
      const adaValue = _portfolioAda;
      const adaEntry = {
        // ITokenListEntry
        ticker: "ADA",
        name: "Cardano",
        policyId: "lovelace",
        hexName: "",
        decimals: 6,
        price: formatSmallNumber(fiatPrice.value),
        // IPortfolioAssetGroup
        ownedRaw: coin.value,
        formattedOwned: adaValue,
        adaValue: parseFloat(adaValue).toFixed(2),
        lovelaceValue: coin.value,
        fiatValue: getCurrencyAmount(coin.value),
        //parseFloat(multiply(adaValue , _fiatPrice)).toFixed(2),
        percentPortfolio: 0
      };
      _preparedTokens.push(adaEntry);
      portfolioNumAssets.value += 1;
      if (!assetsToUse) {
        portfolioTokens.value = _preparedTokens;
        portfolioAda.value = _portfolioAda;
        portfolioLovelace.value = _portfolioLovelace;
        isLoading.value = false;
        return;
      }
      isLoading.value = true;
      const list = [];
      for (const policy of Object.keys(assetsToUse)) {
        for (const assetId of Object.keys(assetsToUse[policy])) {
          list.push(policy + assetId);
        }
      }
      const tokenPriceList = await loadTokenPriceList(list);
      for (const entry of tokenPriceList) {
        if (!entry) {
          continue;
        }
        const ownedRaw = assetsToUse[entry.policyId][entry.hexName];
        if (ownedRaw == "1") {
          continue;
        }
        const price = (entry.price ?? "0") + "";
        const formattedOwned = divide(ownedRaw, Math.pow(10, entry.decimals));
        const adaValue2 = multiply(formattedOwned, price);
        if (compare(adaValue2, "<", 1)) {
          continue;
        }
        const lovelaceValue = multiply(adaValue2, Math.pow(10, networkDecimals.value));
        _portfolioLovelace = add(_portfolioLovelace, lovelaceValue);
        _portfolioAda = add(_portfolioAda, adaValue2);
        entry.price = formatSmallNumber(parseFloat(price));
        const token = {
          // ITokenListEntry
          ...entry,
          // IPortfolioAssetGroup
          ownedRaw,
          formattedOwned,
          adaValue: parseFloat(adaValue2).toFixed(2),
          lovelaceValue,
          fiatValue: parseFloat(multiply(adaValue2, _fiatPrice)).toFixed(2),
          percentPortfolio: 1
        };
        _preparedTokens.push(token);
        portfolioNumAssets.value += 1;
      }
      for (const token of _preparedTokens) {
        token.percentPortfolio = parseFloat(parseFloat(multiply(divide(token.adaValue, _portfolioAda), 100)).toFixed(4));
      }
      portfolioTokens.value = _preparedTokens;
      portfolioAda.value = _portfolioAda;
      portfolioLovelace.value = _portfolioLovelace;
      _toid = setTimeout(() => {
        isLoading.value = false;
      }, 1e3);
    };
    const getMyAssets = () => {
      const assets = accountData.value?.balance.multiasset;
      if (!useAllAccounts.value) {
        return assets;
      }
      const rq = {};
      const { walletIdList } = useAppWalletIdList();
      for (const walletId of walletIdList.value) {
        const wallet = getIAppWallet(walletId);
        const accountList = wallet?.accountList ?? [];
        for (const account of accountList) {
          const multiasset = account.data.balance.multiasset;
          if (!multiasset) {
            continue;
          }
          const policyIdList = Object.keys(multiasset);
          for (const policy of policyIdList) {
            if (!rq[policy]) {
              rq[policy] = {};
            }
            const assetNameList = Object.keys(multiasset[policy]);
            for (const assetName of assetNameList) {
              const assetAmount = multiasset[policy][assetName];
              if (assetAmount) {
                if (!rq[policy][assetName]) {
                  rq[policy][assetName] = assetAmount;
                } else {
                  rq[policy][assetName] = add(assetAmount, rq[policy][assetName]);
                }
              }
            }
          }
        }
      }
      return rq;
    };
    const triggerBuy = () => {
      if (!showModalBuyADA.value) {
        openModalBuyADA();
      }
    };
    const openDetails = (policyId, hexName) => {
      if (policyId !== "lovelace") {
        openModalAssetDetailsById(policyId, hexName);
      }
    };
    watch([accountData, coin, activeCurrency], () => {
      doRequestAllAssets();
    });
    onMounted(() => {
      addSignalListener(onInterval20s, storeId, doRequestAllAssets);
      doRequestAllAssets();
    });
    onUnmounted(() => {
      removeSignalListener(onInterval20s, storeId);
    });
    return (_ctx, _cache) => {
      const _component_Card = resolveComponent("Card");
      const _component_Button = resolveComponent("Button");
      const _component_Column = resolveComponent("Column");
      const _component_ProgressBar = resolveComponent("ProgressBar");
      const _component_DataTable = resolveComponent("DataTable");
      const _directive_tooltip = resolveDirective("tooltip");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createVNode(_sfc_main$1, {
            title: unref($t)("portfolio-page:title")
          }, createSlots({
            icon: withCtx(() => [
              createBaseVNode("div", _hoisted_3, [
                createVNode(IconPieChart, { class: "size-5" }),
                createBaseVNode("div", _hoisted_4, toDisplayString(unref($t)("common:beta")), 1)
              ])
            ]),
            _: 2
          }, [
            !unref(isSmallerThanXS) ? {
              name: "caption",
              fn: withCtx(() => [
                createBaseVNode("div", _hoisted_5, toDisplayString(unref($t)("portfolio-page:caption")), 1)
              ]),
              key: "0"
            } : void 0,
            !unref(isSmallerThanXS) ? {
              name: "sub-caption",
              fn: withCtx(() => [
                createBaseVNode("div", _hoisted_6, toDisplayString(unref($t)("portfolio-page:header.caption", { "asset_count": portfolioNumAssets.value, currency: unref(adaCurrency) })), 1)
              ]),
              key: "1"
            } : void 0
          ]), 1032, ["title"])
        ]),
        createVNode(_component_Card, {
          class: "w-full sm:w-auto",
          pt: {
            body: "pb-0 sm:min-w-120"
          }
        }, {
          content: withCtx(() => [
            createBaseVNode("div", _hoisted_7, [
              createBaseVNode("div", _hoisted_8, [
                createBaseVNode("span", _hoisted_9, toDisplayString(unref($t)("portfolio-page:estimated")), 1),
                createVNode(_sfc_main$2, {
                  cssText: "et-text-3xl font-semibold",
                  amount: portfolioLovelace.value,
                  "with-sign": false,
                  "display-decimals": 2
                }, null, 8, ["amount"]),
                createVNode(_sfc_main$3, {
                  "css-text": "mb-2 sm:mb-3",
                  "css-color": "et-tx-lp-headline et-text-xl font-semibold",
                  amount: portfolioLovelace.value
                }, null, 8, ["amount"])
              ]),
              createBaseVNode("div", _hoisted_10, [
                createBaseVNode("div", _hoisted_11, [
                  createVNode(_sfc_main$4, { class: "absolute right-5 bottom-0 size-24 2xs:size-28 sm:size-32" })
                ]),
                createBaseVNode("div", _hoisted_12, [
                  createVNode(_sfc_main$5, {
                    timestamp: lastFetch.value,
                    "is-loading": isLoading.value
                  }, null, 8, ["timestamp", "is-loading"])
                ])
              ])
            ])
          ]),
          _: 1
        }),
        createVNode(CardDataTable, null, {
          default: withCtx(() => [
            createVNode(_component_DataTable, {
              class: "w-full rounded-xl overflow-hidden",
              tableStyle: "min-width: 1rem",
              dataKey: "ticker",
              pt: {
                pcpaginator: {
                  root: "flex flex-row flex-nowrap et-js-is mt-4",
                  page: "bg-bg-2",
                  next: "bg-bg-2",
                  prev: "bg-bg-2",
                  first: "bg-bg-2",
                  last: "bg-bg-2",
                  pcrowperpagedropdown: {
                    root: "pl-5 pr-2"
                  }
                }
              },
              paginator: "",
              alwaysShowPaginator: false,
              paginatorTemplate: unref(getPaginatorTemplateRows)(),
              rows: 10,
              rowsPerPageOptions: [5, 10, 20, 50],
              sortField: "adaValue",
              sortOrder: -1,
              first: 0,
              value: portfolioTokens.value,
              loading: false
            }, {
              loading: withCtx(() => [
                createBaseVNode("div", _hoisted_13, [
                  createVNode(IconSpinner, { class: "size-10 animate-spin" })
                ])
              ]),
              default: withCtx(() => [
                createVNode(_component_Column, {
                  field: "name",
                  header: unref($t)("portfolio-page:table.header.asset"),
                  sortable: true
                }, {
                  body: withCtx(({ data }) => [
                    createVNode(_component_Button, {
                      unstyled: "",
                      class: normalizeClass(data.policyId !== "lovelace" ? "cursor-pointer" : ""),
                      onClick: ($event) => openDetails(data.policyId, data.hexName)
                    }, {
                      default: withCtx(() => [
                        createBaseVNode("div", _hoisted_14, [
                          createVNode(_sfc_main$6, {
                            name: data.name,
                            "hex-name": data.hexName,
                            "policy-id": data.policyId
                          }, null, 8, ["name", "hex-name", "policy-id"]),
                          createBaseVNode("div", _hoisted_15, [
                            createBaseVNode("div", _hoisted_16, toDisplayString(data.ticker), 1),
                            createBaseVNode("div", _hoisted_17, toDisplayString(data.name), 1)
                          ])
                        ])
                      ]),
                      _: 2
                    }, 1032, ["class", "onClick"])
                  ]),
                  _: 1
                }, 8, ["header"]),
                createVNode(_component_Column, {
                  field: "price",
                  header: unref(adaCurrency) + " " + unref($t)("portfolio-page:table.header.price"),
                  sortable: true
                }, {
                  body: withCtx(({ data }) => [
                    createTextVNode(toDisplayString(data.price), 1)
                  ]),
                  _: 1
                }, 8, ["header"]),
                createVNode(_component_Column, {
                  field: "formattedOwned",
                  header: unref($t)("portfolio-page:table.header.owned"),
                  sortable: true
                }, {
                  body: withCtx(({ data }) => [
                    unref(networkId) === "mainnet" && data.policyId === "lovelace" && data.ownedRaw === "0" ? (openBlock(), createBlock(_component_Button, {
                      key: 0,
                      class: "h-7.5",
                      label: unref($t)("common:buyAda", { currency: unref(adaCurrency) }),
                      size: "small",
                      rounded: "",
                      onClick: _cache[0] || (_cache[0] = ($event) => triggerBuy())
                    }, null, 8, ["label"])) : (openBlock(), createBlock(_sfc_main$7, {
                      key: 1,
                      amount: data.ownedRaw,
                      "with-sign": false,
                      decimals: data.decimals,
                      currency: ""
                    }, null, 8, ["amount", "decimals"]))
                  ]),
                  _: 1
                }, 8, ["header"]),
                createVNode(_component_Column, {
                  field: "adaValue",
                  header: unref(adaCurrency),
                  sortable: true
                }, {
                  body: withCtx(({ data }) => [
                    createVNode(_sfc_main$8, {
                      amount: data.lovelaceValue,
                      "with-sign": false
                    }, null, 8, ["amount"])
                  ]),
                  _: 1
                }, 8, ["header"]),
                createVNode(_component_Column, {
                  field: "fiatValue",
                  header: unref(activeCurrency).symbol,
                  sortable: true
                }, {
                  body: withCtx(({ data }) => [
                    createVNode(_sfc_main$3, {
                      amount: data.lovelaceValue,
                      "css-text": "",
                      "css-color": "text-txt-reduced et-text-md"
                    }, null, 8, ["amount"])
                  ]),
                  _: 1
                }, 8, ["header"]),
                createVNode(_component_Column, {
                  field: "percentPortfolio",
                  header: unref($t)("portfolio-page:table.header.percent"),
                  sortable: true
                }, {
                  body: withCtx(({ data }) => [
                    withDirectives((openBlock(), createBlock(_component_ProgressBar, {
                      value: data.percentPortfolio,
                      showValue: false,
                      style: { "height": "12px" }
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(data.percentPortfolio) + "% ", 1)
                      ]),
                      _: 2
                    }, 1032, ["value"])), [
                      [_directive_tooltip, data.percentPortfolio + "%"]
                    ])
                  ]),
                  _: 1
                }, 8, ["header"]),
                !unref(isIosApp)() ? (openBlock(), createBlock(_component_Column, {
                  key: 0,
                  field: "buttonSwap",
                  header: unref($t)("portfolio-page:table.header.swaptoken"),
                  sortable: false
                }, {
                  body: withCtx(({ data }) => [
                    data.policyId === "lovelace" ? (openBlock(), createBlock(_component_Button, {
                      key: 0,
                      class: "h-7.5 whitespace-nowrap",
                      label: unref($t)("common:buyAda", { currency: unref(adaCurrency) }),
                      size: "small",
                      rounded: "",
                      onClick: _cache[1] || (_cache[1] = ($event) => triggerBuy())
                    }, null, 8, ["label"])) : !unref(isIosApp)() ? (openBlock(), createBlock(_component_Button, {
                      key: 1,
                      class: "h-7.5 whitespace-nowrap",
                      label: unref($t)("common:swap"),
                      size: "small",
                      severity: "secondary",
                      rounded: "",
                      outlined: "",
                      onClick: ($event) => unref(gotoSwapWithAsset)(data.policyId, data.hexName)
                    }, null, 8, ["label", "onClick"])) : createCommentVNode("", true)
                  ]),
                  _: 1
                }, 8, ["header"])) : createCommentVNode("", true)
              ]),
              _: 1
            }, 8, ["paginatorTemplate", "value"])
          ]),
          _: 1
        })
      ]);
    };
  }
});

export { _sfc_main as default };
