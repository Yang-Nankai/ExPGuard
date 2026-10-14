import { e as ref, k as onUnmounted, G as watch, d as defineComponent, Y as toRefs, w as useTranslation, x as useScreenSize, D as computed, c as createBlock, o as openBlock, z as resolveComponent, U as withModifiers, V as normalizeClass, y as withCtx, p as createBaseVNode, t as createCommentVNode, u as unref, m as createElementBlock, F as Fragment, n as createVNode, B as toDisplayString, H as createTextVNode, j as isIosApp, a1 as withDirectives, a2 as resolveDirective, aO as withKeys, f as onMounted, aY as onBeforeUnmount, ae as isRef, l as useTheme, S as renderList } from './index.js';
import { H as loadSwapAssets } from './useAppAccountBalances.js';
import { u as useFormatter } from './useFormatter.js';
import { u as useSelectedAccount } from './epochParams.js';
import { _ as _sfc_main$8 } from './AssetListFilters.vue_vue_type_script_setup_true_lang.js';
import { m as multiply, d as divide, e as bigToNum } from './bigmath.js';
import { u as useModalAssetDetails } from './useModalAssetDetails.js';
import { u as useAssetInfos, _ as _sfc_main$4, a as _sfc_main$6 } from './AssetListCardImage.vue_vue_type_script_setup_true_lang.js';
import { u as useNavigation } from './useNavigation.js';
import { _ as _sfc_main$5 } from './FormattedAmount.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$7 } from './InputCoin.vue_vue_type_script_setup_true_lang.js';

const ContainerBreakpointList = [
  "11xl",
  "10xl",
  "9xl",
  "8xl",
  "7xl",
  "6xl",
  "5xl",
  "4xl",
  "3xl",
  "2xl",
  "xl",
  "lg",
  "md",
  "sm",
  "xs",
  "2xs",
  "3xs",
  "4xs",
  "5xs",
  "6xs",
  "7xs"
];
const _containerBreakpointMap = {
  "11xl": "168rem",
  "10xl": "144rem",
  "9xl": "120rem",
  "8xl": "96rem",
  "7xl": "80rem",
  "6xl": "72rem",
  "5xl": "64rem",
  "4xl": "56rem",
  "3xl": "48rem",
  "2xl": "42rem",
  "xl": "36rem",
  "lg": "32rem",
  "md": "28rem",
  "sm": "24rem",
  "xs": "20rem",
  "2xs": "18rem",
  "3xs": "16rem",
  "4xs": "14rem",
  "5xs": "12rem",
  "6xs": "11rem",
  "7xs": "10rem"
};
const determineContainerSize = (width) => {
  const rootStyle = window.getComputedStyle(document.documentElement);
  const fontSize = parseFloat(rootStyle.fontSize);
  for (const breakpoint of ContainerBreakpointList) {
    const sizeInRem = _containerBreakpointMap[breakpoint];
    const sizeInPx = parseFloat(sizeInRem) * fontSize;
    if (width >= sizeInPx) {
      return breakpoint;
    }
  }
  return "";
};
const useContainerSize = (elementRef) => {
  let observer = null;
  let currentElement = null;
  const containerSize = ref("");
  const cleanupObserver = () => {
    if (observer && currentElement) {
      observer.unobserve(currentElement);
      currentElement = null;
    }
  };
  const initObserver = (element) => {
    cleanupObserver();
    currentElement = element;
    observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        containerSize.value = determineContainerSize(entry.contentRect.width);
      }
    });
    observer.observe(element);
  };
  onUnmounted(() => {
    cleanupObserver();
    observer?.disconnect();
  });
  watch(elementRef, (newElement) => {
    if (newElement) {
      initObserver(newElement);
    } else {
      cleanupObserver();
      containerSize.value = "";
    }
  }, { immediate: true });
  return { containerSize };
};

const _hoisted_1$2 = { class: "grow w-full flex flex-col et-jb-ic et-gap-sm px-2" };
const _hoisted_2$2 = { class: "w-full flex flex-col et-je-ic et-text-md" };
const _hoisted_3$2 = { class: "w-full flex flex-wrap et-jc-ic et-gap-xs" };
const _hoisted_4$1 = {
  key: 0,
  class: "flex flex-row et-gap-xs"
};
const _hoisted_5$1 = { key: 0 };
const _hoisted_6$1 = { class: "break-all et-text-md font-semibold" };
const _hoisted_7 = {
  key: 0,
  class: "w-full h-8 flex et-jc-ic et-text-sm"
};
const _hoisted_8 = { class: "cap-first" };
const _hoisted_9 = { class: "whitespace-nowrap" };
const _hoisted_10 = {
  key: 2,
  class: "w-full flex flex-wrap et-je-ie et-gap-xs"
};
const _hoisted_11 = {
  key: 1,
  class: "w-1/2 -mr-1"
};
const _hoisted_12 = {
  key: 3,
  class: "w-full flex flex-wrap et-je-ie et-gap-sm"
};
const _hoisted_13 = {
  key: 2,
  class: "w-full flex flex-wrap et-gap-sm"
};
const _hoisted_14 = { class: "flex flex-col pt-5" };
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "AssetListCard",
  props: {
    assetDetails: { type: Object, required: true },
    assetDetailsList: { type: Array, required: true },
    selectedAssetList: { type: Array, required: false, default: [] },
    isCollection: { type: Boolean, required: false, default: false },
    isComplete: { type: Boolean, required: false, default: false },
    isPartial: { type: Boolean, required: false, default: false },
    isSelectable: { type: Boolean, required: false, default: false }
  },
  emits: ["assetUpdate"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const {
      assetDetails,
      assetDetailsList,
      selectedAssetList,
      isCollection
    } = toRefs(props);
    const $t = useTranslation().t;
    const {
      gotoSendWithAsset,
      gotoSwapWithAsset
    } = useNavigation();
    const { isSmallerThanXS } = useScreenSize();
    const { getPercentDecimals } = useFormatter();
    const {
      openModalAssetDetails
    } = useModalAssetDetails();
    const {
      isNFT,
      isToken,
      isVerifiedAsset,
      onlyHasOneToken,
      assetDecimals,
      assetAmount,
      assetAmountWithDecimals,
      getAssetAmountWithoutDecimals,
      getAssetAmountWithDecimals,
      tokenCardLabel
    } = useAssetInfos(assetDetails, isCollection);
    const selectedAsset = ref();
    const assetAmountSelectedWithDecimals = ref(0);
    const isSelected = ref(false);
    const isScam = ref(false);
    const isAllSelected = ref(false);
    const isComplete = computed(() => props.isCollection && props.isComplete || isSelected.value && isAllSelected.value);
    const isPartial = computed(() => props.isCollection && props.isPartial || isSelected.value && !isAllSelected.value);
    watch([assetDetails, selectedAssetList], ([ad, sal]) => {
      if (ad) {
        let _selectedAsset;
        if (sal) {
          _selectedAsset = sal.find((ts) => ad && ts.p === ad.p && ts.t.a === ad.t.a);
        }
        if (!_selectedAsset) {
          _selectedAsset = {
            p: ad.p,
            t: ad.t,
            a: ad.a ?? "0"
          };
        }
        selectedAsset.value = _selectedAsset;
        isSelected.value = _selectedAsset.a !== "0";
        isAllSelected.value = isSelected.value && _selectedAsset.a === ad.t.q;
        assetAmountSelectedWithDecimals.value = getAssetAmountWithDecimals(_selectedAsset.a);
      } else {
        selectedAsset.value = void 0;
        isSelected.value = false;
        isAllSelected.value = false;
        assetAmountSelectedWithDecimals.value = 0;
      }
    }, { immediate: true, deep: true });
    const assetTypeColor = computed(() => {
      if (isScam.value) {
        return "bg-bg-negative ";
      }
      if (props.isCollection) {
        return "et-bg-highlight ";
      }
      if (isNFT.value) {
        return "bg-blue ";
      }
      if (isToken.value) {
        return "bg-green ";
      }
      return "bg-gray ";
    });
    const borderColor = computed(() => {
      if (isScam.value) {
        return "border-bg-negative hover:border-border-negative ";
      }
      if (props.isCollection) {
        return "border-border-highlight hover:border-border-highlight ";
      }
      if (isNFT.value) {
        return "border-blue             hover:border-blue ";
      }
      if (isToken.value) {
        return "border-green            hover:border-green ";
      }
      return "border-gray ";
    });
    const percentSelected = computed(() => {
      const sa = selectedAsset.value;
      if (sa) {
        return multiply(divide(sa.a, assetAmount.value), 100);
      }
      return "0";
    });
    const onAddAsset = (event) => {
      if (isNFT.value || isScam.value || onlyHasOneToken.value) {
        emit("assetUpdate", "add", [
          {
            p: props.assetDetails.p,
            t: props.assetDetails.t,
            a: props.assetDetails?.t.q
          }
        ]);
      } else {
        showPopoverInput(event);
      }
    };
    const onUpdateSelectedAmount = (valueWithDecimals) => {
      const amount = getAssetAmountWithoutDecimals(valueWithDecimals ?? 0) ?? "0";
      const type = !amount || amount === "0" ? "delete" : "add";
      emit("assetUpdate", type, [
        {
          p: props.assetDetails.p,
          t: props.assetDetails.t,
          a: amount
        }
      ]);
    };
    const onDeleteAsset = () => {
      emit("assetUpdate", "delete", [
        {
          p: props.assetDetails.p,
          t: props.assetDetails.t,
          a: props.assetDetails?.t.q
        }
      ]);
    };
    const changeCollection = (type) => {
      const assetList = [];
      for (const item of assetDetailsList?.value) {
        assetList.push({
          p: item.p,
          t: item.t,
          a: item.t.q
        });
      }
      emit("assetUpdate", type, assetList);
    };
    const onAddCollection = () => changeCollection("add");
    const onRemoveCollection = () => changeCollection("delete");
    const onClick = () => {
      if (!isCollection.value) {
        openModalAssetDetails(props.assetDetails);
      }
    };
    const doSendAsset = () => gotoSendWithAsset(props.assetDetails.p, props.assetDetails.t.a);
    const doSwapAsset = () => gotoSwapWithAsset(props.assetDetails.p, props.assetDetails.t.a);
    const popoverInput = ref();
    const showPopoverInput = (event) => popoverInput.value?.show(event);
    const hidePopoverInput = (event) => popoverInput.value?.hide(event);
    const onEnterInput = (event) => hidePopoverInput(event);
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_Popover = resolveComponent("Popover");
      const _directive_tooltip = resolveDirective("tooltip");
      return openBlock(), createBlock(_component_Button, {
        class: normalizeClass(["asset-list-card relative w-full p-0 px-1 sm:px-3 py-4 sm:py-6 flex flex-col et-js-ic et-gap-sme sm:et-gap-md rounded-card et-bg-content et-bg-content-hover et-border-1 overflow-hidden", (isSelected.value || isScam.value ? borderColor.value : "") + " " + (isComplete.value || !isPartial.value && isSelected.value ? " bg-green-600/30" : isPartial.value ? " bg-yellow-600/30" : "")]),
        severity: "secondary",
        outlined: "",
        onClick: withModifiers(onClick, ["stop", "prevent"])
      }, {
        default: withCtx(() => [
          createBaseVNode("div", null, [
            unref(isCollection) ? (openBlock(), createBlock(_sfc_main$4, {
              key: 0,
              class: "w-full max-w-24 sm:max-w-28 lg:max-w-28",
              "asset-details-list": unref(assetDetailsList),
              "is-collection": unref(isCollection)
            }, null, 8, ["asset-details-list", "is-collection"])) : (openBlock(), createBlock(_sfc_main$4, {
              key: 1,
              class: "w-full max-w-30 sm:max-w-28 lg:max-w-28",
              "asset-details-list": [unref(assetDetails)],
              "is-collection": unref(isCollection)
            }, null, 8, ["asset-details-list", "is-collection"]))
          ]),
          createBaseVNode("div", _hoisted_1$2, [
            createBaseVNode("div", _hoisted_2$2, [
              createBaseVNode("div", _hoisted_3$2, [
                unref(isToken) ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  __props.isSelectable && isSelected.value && selectedAsset.value ? (openBlock(), createElementBlock("span", _hoisted_4$1, [
                    createVNode(_sfc_main$5, {
                      "text-c-s-s": "break-all",
                      amount: selectedAsset.value.a,
                      decimals: unref(assetDecimals),
                      currency: ""
                    }, null, 8, ["amount", "decimals"]),
                    !isAllSelected.value ? (openBlock(), createElementBlock("span", _hoisted_5$1, "/")) : createCommentVNode("", true)
                  ])) : createCommentVNode("", true),
                  !isAllSelected.value ? (openBlock(), createBlock(_sfc_main$5, {
                    key: 1,
                    "text-c-s-s": "break-all",
                    amount: unref(assetAmount),
                    decimals: unref(assetDecimals),
                    currency: ""
                  }, null, 8, ["amount", "decimals"])) : createCommentVNode("", true),
                  percentSelected.value !== "0" ? (openBlock(), createBlock(_sfc_main$5, {
                    key: 2,
                    "text-c-s-s": "break-all",
                    amount: percentSelected.value,
                    decimals: unref(getPercentDecimals)(percentSelected.value),
                    prefix: "(",
                    suffix: ")",
                    percent: ""
                  }, null, 8, ["amount", "decimals"])) : createCommentVNode("", true)
                ], 64)) : createCommentVNode("", true)
              ]),
              createBaseVNode("span", _hoisted_6$1, toDisplayString(unref(tokenCardLabel)), 1)
            ]),
            unref(isCollection) ? (openBlock(), createElementBlock("div", _hoisted_7, [
              createBaseVNode("span", _hoisted_8, toDisplayString(unref($t)("common:collection")), 1),
              _cache[5] || (_cache[5] = createTextVNode("  ", -1)),
              createBaseVNode("span", _hoisted_9, "(" + toDisplayString(unref(assetDetailsList).length) + " " + toDisplayString(unref($t)("common:items")) + ")", 1)
            ])) : createCommentVNode("", true),
            __props.isSelectable ? (openBlock(), createBlock(_sfc_main$6, {
              key: 1,
              "is-scam": isScam.value,
              "onUpdate:isScam": _cache[0] || (_cache[0] = ($event) => isScam.value = $event),
              "asset-details-list": unref(assetDetailsList),
              "is-selectable": __props.isSelectable
            }, null, 8, ["is-scam", "asset-details-list", "is-selectable"])) : createCommentVNode("", true),
            !unref(isCollection) && !__props.isSelectable ? (openBlock(), createElementBlock("div", _hoisted_10, [
              createVNode(_component_Button, {
                class: "grow shrink px-2.5",
                severity: "secondary",
                size: "small",
                label: unref($t)("common:send"),
                rounded: "",
                outlined: "",
                onClick: withModifiers(doSendAsset, ["prevent", "stop"])
              }, null, 8, ["label"]),
              unref(isToken) && unref(isVerifiedAsset) && !unref(isIosApp)() ? (openBlock(), createBlock(_component_Button, {
                key: 0,
                class: "grow shrink px-2.5",
                severity: "primary",
                size: "small",
                label: unref($t)("common:swap"),
                rounded: "",
                onClick: withModifiers(doSwapAsset, ["prevent", "stop"])
              }, null, 8, ["label"])) : !unref(isSmallerThanXS) ? (openBlock(), createElementBlock("div", _hoisted_11)) : createCommentVNode("", true)
            ])) : __props.isSelectable && selectedAsset.value ? (openBlock(), createElementBlock("div", _hoisted_12, [
              !unref(isCollection) && !isSelected.value && unref(onlyHasOneToken) && isSelected.value ? withDirectives((openBlock(), createBlock(_component_Button, {
                key: 0,
                label: unref($t)("assets:button.removeAsset.label"),
                class: "grow shrink px-2.5",
                severity: "secondary",
                rounded: "",
                outlined: "",
                onClick: withModifiers(onDeleteAsset, ["stop", "prevent"])
              }, null, 8, ["label"])), [
                [_directive_tooltip, unref($t)("assets:button.removeAsset.tooltip")]
              ]) : !unref(isCollection) && !isSelected.value ? withDirectives((openBlock(), createBlock(_component_Button, {
                key: 1,
                label: unref($t)("assets:button.addAsset.label"),
                class: "grow shrink px-2.5",
                severity: "contrast",
                rounded: "",
                outlined: "",
                onClick: withModifiers(onAddAsset, ["stop", "prevent"])
              }, null, 8, ["label"])), [
                [_directive_tooltip, unref($t)("assets:button.addAsset.tooltip")]
              ]) : !unref(isCollection) && !unref(onlyHasOneToken) && isSelected.value ? (openBlock(), createElementBlock("div", _hoisted_13, [
                withDirectives(createVNode(_component_Button, {
                  label: unref($t)("assets:button.editAsset.label"),
                  class: "grow shrink px-2.5",
                  severity: "contrast",
                  rounded: "",
                  outlined: "",
                  onClick: withModifiers(onAddAsset, ["stop", "prevent"])
                }, null, 8, ["label"]), [
                  [_directive_tooltip, unref($t)("assets:button.editAsset.tooltip")]
                ]),
                withDirectives(createVNode(_component_Button, {
                  label: unref($t)("assets:button.removeAsset.label"),
                  class: "grow shrink px-2.5",
                  severity: "contrast",
                  rounded: "",
                  outlined: "",
                  onClick: withModifiers(onDeleteAsset, ["stop", "prevent"])
                }, null, 8, ["label"]), [
                  [_directive_tooltip, unref($t)("assets:button.removeAsset.tooltip")]
                ])
              ])) : unref(isCollection) && !isComplete.value ? withDirectives((openBlock(), createBlock(_component_Button, {
                key: 3,
                label: unref($t)("assets:button.addCollection.label"),
                class: "grow shrink px-2.5",
                severity: "contrast",
                rounded: "",
                outlined: "",
                onClick: withModifiers(onAddCollection, ["stop", "prevent"])
              }, null, 8, ["label"])), [
                [_directive_tooltip, unref($t)("assets:button.addCollection.tooltip")]
              ]) : !unref(isCollection) && unref(onlyHasOneToken) ? withDirectives((openBlock(), createBlock(_component_Button, {
                key: 4,
                label: unref($t)("assets:button.removeAsset.label"),
                class: "grow shrink px-2.5",
                severity: "contrast",
                rounded: "",
                outlined: "",
                onClick: withModifiers(onDeleteAsset, ["stop", "prevent"])
              }, null, 8, ["label"])), [
                [_directive_tooltip, unref($t)("assets:button.removeAsset.tooltip")]
              ]) : withDirectives((openBlock(), createBlock(_component_Button, {
                key: 5,
                label: unref($t)("assets:button.removeCollection.label"),
                class: "grow shrink px-1",
                severity: "contrast",
                rounded: "",
                outlined: "",
                onClick: withModifiers(onRemoveCollection, ["stop", "prevent"])
              }, null, 8, ["label"])), [
                [_directive_tooltip, unref($t)("assets:button.removeCollection.tooltip")]
              ]),
              createVNode(_component_Popover, {
                ref_key: "popoverInput",
                ref: popoverInput
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_14, [
                    createVNode(_sfc_main$7, {
                      model: assetAmountSelectedWithDecimals.value,
                      "onUpdate:model": [
                        _cache[1] || (_cache[1] = ($event) => assetAmountSelectedWithDecimals.value = $event),
                        onUpdateSelectedAmount
                      ],
                      "max-coin-input": unref(bigToNum)(unref(assetAmountWithDecimals)),
                      "asset-decimals": unref(assetDecimals),
                      "is-send-all-enabled": true,
                      "is-coin-input": false,
                      autofocus: "",
                      onKeydown: _cache[2] || (_cache[2] = withKeys(($event) => onEnterInput($event), ["enter"])),
                      onMax: _cache[3] || (_cache[3] = ($event) => onEnterInput($event))
                    }, null, 8, ["model", "max-coin-input", "asset-decimals"])
                  ])
                ]),
                _: 1
              }, 512)
            ])) : createCommentVNode("", true)
          ]),
          !__props.isSelectable ? (openBlock(), createBlock(_sfc_main$6, {
            key: 0,
            "is-scam": isScam.value,
            "onUpdate:isScam": _cache[4] || (_cache[4] = ($event) => isScam.value = $event),
            "asset-details-list": unref(assetDetailsList)
          }, null, 8, ["is-scam", "asset-details-list"])) : createCommentVNode("", true),
          createBaseVNode("div", {
            class: normalizeClass(["absolute bottom-0 left-0 right-0 w-full h-2", [assetTypeColor.value]])
          }, null, 2)
        ]),
        _: 1
      }, 8, ["class"]);
    };
  }
});

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AssetListCollectionCard",
  props: {
    assetListItem: { type: Object, required: true },
    isSelectable: { type: Boolean, required: false, default: false },
    selectedAssetList: { type: Array, required: false, default: [] }
  },
  emits: ["assetUpdate"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const {
      assetListItem,
      selectedAssetList
    } = toRefs(props);
    const assetDetails = computed(() => props.assetListItem.l[0]);
    const items = computed(() => assetListItem?.value?.l[0] ?? null);
    const isComplete = ref(false);
    const isPartial = ref(false);
    const onAssetUpdate = (type, assetList) => emit("assetUpdate", type, assetList);
    watch(selectedAssetList, () => {
      isComplete.value = false;
      isPartial.value = false;
      const policy = assetListItem.value?.p;
      if (!policy) {
        return;
      }
      let numAssets = 0;
      for (const asset of selectedAssetList.value) {
        if (asset.p === policy) {
          numAssets++;
        }
      }
      if (numAssets === assetListItem.value?.l.length) {
        isComplete.value = true;
        isPartial.value = true;
      } else if (numAssets > 0) {
        isPartial.value = true;
      }
    }, { immediate: true, deep: true });
    return (_ctx, _cache) => {
      return assetDetails.value && items.value ? (openBlock(), createBlock(_sfc_main$3, {
        key: 0,
        "asset-details": assetDetails.value,
        "asset-details-list": unref(assetListItem).l,
        "selected-asset-list": unref(selectedAssetList),
        "is-selectable": __props.isSelectable,
        "is-complete": isComplete.value,
        "is-partial": isPartial.value,
        "is-collection": "",
        onAssetUpdate
      }, null, 8, ["asset-details", "asset-details-list", "selected-asset-list", "is-selectable", "is-complete", "is-partial"])) : createCommentVNode("", true);
    };
  }
});

const _hoisted_1$1 = { class: "grow w-full flex flex-col et-jb-ic et-gap-sm" };
const _hoisted_2$1 = { class: "grow w-full flex flex-col et-jb-ic" };
const _hoisted_3$1 = { class: "animate-pulse" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AssetListCardLoading",
  setup(__props) {
    const $t = useTranslation().t;
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      return openBlock(), createBlock(_component_Button, { class: "token-card relative w-full md:w-52 flex flex-col et-js-ic px-2 pt-2 3xs:px-3 3xs:pt-3 sm:px-4 sm:pt-4 lg:px-5 lg:pt-5 pb-5 lg:pb-6 rounded-sm 3xs:rounded-lg et-bg-content et-bg-content-hover overflow-hidden" }, {
        default: withCtx(() => [
          _cache[0] || (_cache[0] = createBaseVNode("div", { class: "w-full aspect-square max-w-52 bg-bg-3 animate-pulse" }, null, -1)),
          createBaseVNode("div", _hoisted_1$1, [
            createBaseVNode("div", _hoisted_2$1, [
              createBaseVNode("span", _hoisted_3$1, toDisplayString(unref($t)("common:loading")) + "... ", 1)
            ])
          ]),
          _cache[1] || (_cache[1] = createBaseVNode("div", { class: "absolute bottom-0 left-0 right-0 w-full h-2 bg-gray grayscale animate-pulse" }, null, -1))
        ]),
        _: 1
      });
    };
  }
});

const _hoisted_1 = { class: "" };
const _hoisted_2 = { class: "w-full flex flex-wrap et-js-ic et-gap-md" };
const _hoisted_3 = {
  key: 0,
  class: "w-full flex flex-wrap et-js-ic et-gap-sm"
};
const _hoisted_4 = {
  key: 1,
  class: "w-full flex flex-wrap et-js-ic et-gap-sm"
};
const _hoisted_5 = { class: "w-full h-full grid et-gap-sm lg:et-gap-md max-w-10xl grid-cols-1 @xs:grid-cols-2 @xl:grid-cols-3 @3xl:grid-cols-4 @5xl:grid-cols-5 @7xl:grid-cols-6 @8xl:grid-cols-7 @9xl:grid-cols-8 @10xl:grid-cols-9 @11xl:grid-cols-10" };
const _hoisted_6 = { class: "w-full flex flex-wrap et-js-ic et-gap-md" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AssetList",
  props: {
    useAssetList: { type: Object, required: true },
    isSelectable: { type: Boolean, required: false, default: false },
    policyFilter: { type: String, required: false, default: "" },
    nameFilter: { type: String, required: false, default: "" },
    resetFilter: { type: Boolean, required: false, default: false }
  },
  emits: ["assetUpdate"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const container = ref(null);
    const $t = useTranslation().t;
    const { isSmallerThanSM } = useScreenSize();
    const { containerSize } = useContainerSize(container);
    const {
      getPaginatorTemplate
    } = useTheme();
    const { truncateAddress } = useFormatter();
    const {
      selectedAccountId
    } = useSelectedAccount();
    const sortedAssetList = props.useAssetList.sortedAssetList;
    const selectedAssetList = props.useAssetList.selectedAssetList;
    const numAssets = props.useAssetList.numAssets;
    const paginatorAssets = props.useAssetList.paginatorAssets;
    const paginatorPolicies = props.useAssetList.paginatorPolicies;
    const policiesNumItems = paginatorPolicies.numItems;
    const policiesNumItemsPerPage = paginatorPolicies.numItemsPerPage;
    const policiesNumPages = paginatorPolicies.numPages;
    const policiesOnPageStateUpdate = paginatorPolicies.onPageStateUpdate;
    const assetsNumItems = paginatorAssets.numItems;
    const assetsNumItemsPerPage = paginatorAssets.numItemsPerPage;
    const assetsNumPages = paginatorAssets.numPages;
    const assetsOnPageStateUpdate = paginatorAssets.onPageStateUpdate;
    const assetsSetPage = paginatorAssets.setPage;
    const assetCurrentPageNo = paginatorAssets.pageNo;
    const setRestoreLastPage = paginatorAssets.setRestoreLastPage;
    const assetFilter = props.useAssetList.assetFilter;
    const {
      hasScam,
      isFilterUpdating,
      filterSearchInput,
      filterAssetType,
      filterBadgeList,
      filterPolicyIdList,
      addAllFilterBadges,
      removeFilterBadge,
      resetFilterBadge,
      setSelectCollectionPolicyId
    } = assetFilter;
    const selectedPolicy = ref([]);
    watch(selectedPolicy, (param) => {
      if (selectedPolicy.value && "p" in selectedPolicy.value) {
        setSelectCollectionPolicyId(selectedPolicy.value.p);
      }
    });
    watch(containerSize, (size) => {
      switch (size) {
        case "11xl":
          policiesNumItemsPerPage.value = assetsNumItemsPerPage.value = !props.isSelectable ? 15 : 20;
          return;
        case "10xl":
          policiesNumItemsPerPage.value = assetsNumItemsPerPage.value = !props.isSelectable ? 15 : 18;
          return;
        case "9xl":
          policiesNumItemsPerPage.value = assetsNumItemsPerPage.value = !props.isSelectable ? 15 : 16;
          return;
        case "8xl":
          policiesNumItemsPerPage.value = assetsNumItemsPerPage.value = !props.isSelectable ? 15 : 14;
          return;
        case "7xl":
          policiesNumItemsPerPage.value = assetsNumItemsPerPage.value = !props.isSelectable ? 15 : 18;
          return;
        case "6xl":
        case "5xl":
          policiesNumItemsPerPage.value = assetsNumItemsPerPage.value = !props.isSelectable ? 15 : 15;
          return;
        case "4xl":
        case "3xl":
          policiesNumItemsPerPage.value = assetsNumItemsPerPage.value = !props.isSelectable ? 12 : 12;
          return;
        case "2xl":
        case "xl":
          policiesNumItemsPerPage.value = assetsNumItemsPerPage.value = !props.isSelectable ? 12 : 12;
          return;
        case "lg":
        case "md":
          policiesNumItemsPerPage.value = assetsNumItemsPerPage.value = !props.isSelectable ? 18 : 18;
          return;
        case "sm":
        case "xs":
        default:
          policiesNumItemsPerPage.value = assetsNumItemsPerPage.value = !props.isSelectable ? 10 : 10;
      }
    });
    const onEnterFilter = (str) => {
      if (!str) {
        return;
      }
      addAllFilterBadges();
      filterSearchInput.value = "";
    };
    const onAssetUpdate = (type, assetList) => {
      emit("assetUpdate", type, assetList);
    };
    const oldPage = ref(0);
    const accountChange = ref(false);
    watch(selectedAccountId, (newValue, oldValue) => {
      if (newValue !== oldValue) {
        oldPage.value = 1;
        setRestoreLastPage(false, oldPage.value);
        resetFilterBadge();
        accountChange.value = true;
      }
    });
    watch(policiesNumPages, (newValue, oldValue) => {
      if (accountChange.value) {
        accountChange.value = false;
        return;
      }
      if (newValue === 0) {
        setRestoreLastPage(true, oldPage.value);
      } else if (oldValue === 0 && newValue !== 0) {
        oldPage.value = assetCurrentPageNo.value;
        setRestoreLastPage(false);
      }
    });
    const _assetsOnPageStateUpdate = (page) => {
      assetsOnPageStateUpdate(page);
    };
    const _policiesOnPageStateUpdate = (page) => {
      assetsOnPageStateUpdate(page);
    };
    onMounted(() => {
      if (props.resetFilter) {
        resetFilterBadge();
      }
      if (props.policyFilter) {
        onEnterFilter(props.policyFilter);
      }
      if (props.nameFilter) {
        onEnterFilter(props.nameFilter);
      }
    });
    onBeforeUnmount(() => {
      setRestoreLastPage(false);
      assetsSetPage(1);
    });
    loadSwapAssets();
    return (_ctx, _cache) => {
      const _component_Paginator = resolveComponent("Paginator");
      const _component_Chip = resolveComponent("Chip");
      const _component_Card = resolveComponent("Card");
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", {
          class: normalizeClass(["relative flex flex-wrap et-gap-md px-2 xs:pl-0 sm:px-0 transition-all", !__props.isSelectable ? "mt-2 2xs:mt-4 xs:mt-12 md:mt-24 lg:mt-24 xl:mt-24" : ""])
        }, [
          createVNode(_sfc_main$8, {
            "is-updating": unref(isFilterUpdating),
            "onUpdate:isUpdating": _cache[0] || (_cache[0] = ($event) => isRef(isFilterUpdating) ? isFilterUpdating.value = $event : null),
            "filter-search-input": unref(filterSearchInput),
            "onUpdate:filterSearchInput": _cache[1] || (_cache[1] = ($event) => isRef(filterSearchInput) ? filterSearchInput.value = $event : null),
            "filter-asset-type": unref(filterAssetType),
            "onUpdate:filterAssetType": _cache[2] || (_cache[2] = ($event) => isRef(filterAssetType) ? filterAssetType.value = $event : null),
            "has-scam": unref(hasScam),
            "filter-by-selected": __props.isSelectable && unref(selectedAssetList).length > 0,
            "is-selectable": __props.isSelectable,
            onEnter: onEnterFilter
          }, {
            count: withCtx(() => [
              createBaseVNode("div", _hoisted_1, toDisplayString(unref($t)("assets:numAssets", { numAssets: unref(numAssets) })), 1)
            ]),
            _: 1
          }, 8, ["is-updating", "filter-search-input", "filter-asset-type", "has-scam", "filter-by-selected", "is-selectable"]),
          createBaseVNode("div", _hoisted_2, [
            unref(policiesNumPages) > 1 || unref(assetsNumPages) > 1 ? (openBlock(), createElementBlock("div", _hoisted_3, [
              unref(policiesNumPages) > 1 ? (openBlock(), createBlock(_component_Paginator, {
                key: 0,
                first: unref(paginatorPolicies).first,
                "onUpdate:first": _cache[3] || (_cache[3] = ($event) => unref(paginatorPolicies).first = $event),
                "page-link-size": unref(isSmallerThanSM) ? 3 : 5,
                template: unref(getPaginatorTemplate)(),
                rows: unref(policiesNumItemsPerPage),
                "total-records": unref(policiesNumItems),
                pt: { content: "flex flex-row flex-nowrap" },
                onPage: _policiesOnPageStateUpdate
              }, null, 8, ["first", "page-link-size", "template", "rows", "total-records"])) : unref(assetsNumPages) > 1 ? (openBlock(), createBlock(_component_Paginator, {
                key: 1,
                first: unref(paginatorAssets).first,
                "onUpdate:first": _cache[4] || (_cache[4] = ($event) => unref(paginatorAssets).first = $event),
                "page-link-size": unref(isSmallerThanSM) ? 3 : 5,
                template: unref(getPaginatorTemplate)(),
                rows: unref(assetsNumItemsPerPage),
                "total-records": unref(assetsNumItems),
                pt: { content: "flex flex-row flex-nowrap" },
                onPage: _assetsOnPageStateUpdate
              }, null, 8, ["first", "page-link-size", "template", "rows", "total-records"])) : createCommentVNode("", true)
            ])) : createCommentVNode("", true),
            unref(filterBadgeList).length > 0 || unref(filterPolicyIdList).length > 0 ? (openBlock(), createElementBlock("div", _hoisted_4, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(filterBadgeList), (badge) => {
                return openBlock(), createBlock(_component_Chip, {
                  class: "rounded-full",
                  key: badge,
                  label: unref(truncateAddress)(badge, 16),
                  removable: "",
                  onRemove: ($event) => unref(removeFilterBadge)(badge)
                }, null, 8, ["label", "onRemove"]);
              }), 128)),
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(filterPolicyIdList), (badge) => {
                return openBlock(), createBlock(_component_Chip, {
                  class: "bg-blue rounded-full",
                  key: badge,
                  label: unref(truncateAddress)(badge, 16),
                  removable: "",
                  onRemove: _cache[5] || (_cache[5] = ($event) => unref(setSelectCollectionPolicyId)())
                }, null, 8, ["label"]);
              }), 128))
            ])) : createCommentVNode("", true)
          ])
        ], 2),
        createBaseVNode("div", {
          ref_key: "container",
          ref: container,
          class: normalizeClass(["relative w-full flex flex-col et-js-is et-gap-md @container", __props.isSelectable ? "" : "et-max-width-page"])
        }, [
          createBaseVNode("div", _hoisted_5, [
            unref(sortedAssetList).length === 0 && unref(paginatorAssets).numItems.value === 0 && unref(paginatorPolicies).numItems.value === 0 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createVNode(_sfc_main$1),
              createVNode(_sfc_main$1),
              createVNode(_sfc_main$1)
            ], 64)) : unref(sortedAssetList).length > 0 && unref(paginatorAssets).numItems.value === 0 && unref(paginatorPolicies).numItems.value === 0 ? (openBlock(), createBlock(_component_Card, {
              key: 1,
              class: "",
              pt: { content: "h-full flex flex-col flex-nowrap et-jc-ic" }
            }, {
              content: withCtx(() => [
                createBaseVNode("span", null, toDisplayString(unref($t)("assets-page:empty")), 1)
              ]),
              _: 1
            })) : unref(paginatorPolicies).numItems.value === 0 ? (openBlock(true), createElementBlock(Fragment, { key: 2 }, renderList(unref(paginatorAssets).page.value, (assetListItem) => {
              return openBlock(), createElementBlock(Fragment, {
                key: assetListItem.p
              }, [
                assetListItem.c ? (openBlock(), createBlock(_sfc_main$2, {
                  key: 0,
                  "asset-list-item": assetListItem,
                  "selected-asset-list": unref(selectedAssetList),
                  "is-selectable": __props.isSelectable,
                  onClick: ($event) => unref(setSelectCollectionPolicyId)(assetListItem.p),
                  onAssetUpdate
                }, null, 8, ["asset-list-item", "selected-asset-list", "is-selectable", "onClick"])) : assetListItem.l[0] ? (openBlock(), createBlock(_sfc_main$3, {
                  key: 1,
                  "asset-details": assetListItem.l[0],
                  "asset-details-list": assetListItem.l,
                  "is-collection": assetListItem.c,
                  "selected-asset-list": unref(selectedAssetList),
                  "is-selectable": __props.isSelectable,
                  onAssetUpdate
                }, null, 8, ["asset-details", "asset-details-list", "is-collection", "selected-asset-list", "is-selectable"])) : createCommentVNode("", true)
              ], 64);
            }), 128)) : createCommentVNode("", true),
            unref(paginatorPolicies).numItems.value > 0 ? (openBlock(true), createElementBlock(Fragment, { key: 3 }, renderList(unref(paginatorPolicies).page.value, (assetDetails) => {
              return openBlock(), createBlock(_sfc_main$3, {
                key: assetDetails.p + "-" + assetDetails.f,
                "asset-details": assetDetails,
                "asset-details-list": unref(paginatorPolicies).page.value,
                "selected-asset-list": unref(selectedAssetList),
                "is-selectable": __props.isSelectable,
                onAssetUpdate
              }, null, 8, ["asset-details", "asset-details-list", "selected-asset-list", "is-selectable"]);
            }), 128)) : createCommentVNode("", true)
          ]),
          createBaseVNode("div", _hoisted_6, [
            unref(policiesNumPages) > 1 ? (openBlock(), createBlock(_component_Paginator, {
              key: 0,
              first: unref(paginatorPolicies).first,
              "onUpdate:first": _cache[6] || (_cache[6] = ($event) => unref(paginatorPolicies).first = $event),
              "page-link-size": unref(isSmallerThanSM) ? 3 : 5,
              template: unref(getPaginatorTemplate)(),
              rows: unref(policiesNumItemsPerPage),
              "total-records": unref(policiesNumItems),
              pt: { content: "flex flex-row flex-nowrap" },
              onPage: unref(policiesOnPageStateUpdate)
            }, null, 8, ["first", "page-link-size", "template", "rows", "total-records", "onPage"])) : unref(assetsNumPages) > 1 ? (openBlock(), createBlock(_component_Paginator, {
              key: 1,
              first: unref(paginatorAssets).first,
              "onUpdate:first": _cache[7] || (_cache[7] = ($event) => unref(paginatorAssets).first = $event),
              "page-link-size": unref(isSmallerThanSM) ? 3 : 5,
              template: unref(getPaginatorTemplate)(),
              rows: unref(assetsNumItemsPerPage),
              "total-records": unref(assetsNumItems),
              pt: { content: "flex flex-row flex-nowrap" },
              onPage: unref(assetsOnPageStateUpdate)
            }, null, 8, ["first", "page-link-size", "template", "rows", "total-records", "onPage"])) : createCommentVNode("", true)
          ])
        ], 2)
      ], 64);
    };
  }
});

export { _sfc_main as _ };
