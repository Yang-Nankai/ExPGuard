import { d as defineComponent, z as resolveComponent, c as createBlock, o as openBlock, y as withCtx, Y as toRefs, D as computed, e as ref, G as watch, m as createElementBlock, F as Fragment, t as createCommentVNode, U as withModifiers, V as normalizeClass, az as dispatchSignalSyncTo, w as useTranslation, x as useScreenSize, p as createBaseVNode, n as createVNode, B as toDisplayString, u as unref, a0 as renderSlot, l as useTheme, S as renderList } from './index.js';
import { a4 as getUtxoHash } from './app2.js';
import { u as useSelectedAccount } from './useSelectedAccount.js';
import { _ as _sfc_main$b, a as addContractBadge } from './Badge.vue_vue_type_script_setup_true_lang.js';
import { H as doToggleLockedUtxo, I as doToggleSelectedUtxo } from './epochParams.js';
import { u as usePaginator } from './usePaginator.js';
import { _ as _sfc_main$a } from './TransactionUTxOAddress.vue_vue_type_script_setup_true_lang.js';
import { u as useUtxoInfos, a as _sfc_main$9 } from './TransactionUTxODetails.vue_vue_type_script_setup_true_lang.js';
import { u as useModalTransactionViewer, _ as _sfc_main$8 } from './TransactionAssetList.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$7 } from './AdaAmount.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$5 } from './ExplorerLink.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$6 } from './Badges.vue_vue_type_script_setup_true_lang.js';
import { I as IconSquareLock02, a as IconSquareUnlock02 } from './IconSquareUnlock02.js';

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "ButtonLock",
  props: {
    locked: { type: Boolean, required: false, default: false }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      return openBlock(), createBlock(_component_Button, {
        text: "",
        class: "p-0 shrink-0 bg-transparent"
      }, {
        default: withCtx(() => [
          __props.locked ? (openBlock(), createBlock(IconSquareLock02, {
            key: 0,
            class: "size-5 sm:size-6"
          })) : (openBlock(), createBlock(IconSquareUnlock02, {
            key: 1,
            class: "size-5 sm:size-6"
          }))
        ]),
        _: 1
      });
    };
  }
});

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "AccountUtxoButton",
  props: {
    utxo: { type: Object, required: true },
    showSelect: { type: Boolean, required: false, default: false },
    hideLock: { type: Boolean, required: false, default: false }
  },
  setup(__props) {
    const props = __props;
    const { utxo } = toRefs(props);
    const {
      appAccount,
      utxoMap
    } = useSelectedAccount();
    const isLocked = computed(() => utxoMap.value?.locked.includes(getUtxoHash(utxo.value.input)) ?? false);
    const isSelected = computed(() => utxoMap.value?.selected.includes(getUtxoHash(utxo.value.input)) ?? false);
    const selected = ref(isSelected.value);
    const onToggleLock = () => {
      if (!appAccount.value) {
        return;
      }
      dispatchSignalSyncTo(appAccount.value.id, doToggleLockedUtxo, props.utxo);
    };
    const onToggleSelected = () => {
      if (isLocked.value || !appAccount.value) {
        return;
      }
      dispatchSignalSyncTo(appAccount.value.id, doToggleSelectedUtxo, props.utxo);
    };
    watch(isSelected, () => {
      if (isSelected.value !== selected.value) {
        selected.value = isSelected.value;
      }
    });
    return (_ctx, _cache) => {
      const _component_Checkbox = resolveComponent("Checkbox");
      return openBlock(), createElementBlock(Fragment, null, [
        __props.showSelect ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          isLocked.value ? (openBlock(), createBlock(_sfc_main$4, {
            key: 0,
            disabled: "",
            locked: ""
          })) : (openBlock(), createBlock(_component_Checkbox, {
            key: 1,
            modelValue: selected.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => selected.value = $event),
            class: "ml-1.5",
            binary: "",
            onClick: withModifiers(onToggleSelected, ["prevent", "stop"])
          }, null, 8, ["modelValue"]))
        ], 64)) : createCommentVNode("", true),
        !__props.showSelect && !__props.hideLock ? (openBlock(), createBlock(_sfc_main$4, {
          key: 1,
          class: normalizeClass(isLocked.value ? "text-txt-red" : "text-txt-green"),
          locked: isLocked.value,
          onClick: withModifiers(onToggleLock, ["prevent", "stop"])
        }, null, 8, ["class", "locked"])) : createCommentVNode("", true)
      ], 64);
    };
  }
});

const _hoisted_1$2 = { class: "w-full flex flex-col et-js-is et-gap-sm" };
const _hoisted_2$2 = { class: "w-full flex flex-row flex-nowrap et-jb-is et-gap-sm" };
const _hoisted_3$2 = { class: "shrink grow min-w-0 flex flex-col et-js-is et-gap-sm" };
const _hoisted_4$1 = { class: "shrink grow w-full min-w-0 flex flex-row et-js-is sm:et-js-ic et-gap-sm" };
const _hoisted_5$1 = { class: "shrink grow min-h-6 sm:min-h-8 min-w-0 flex flex-row et-js-ic et-gap-md text-txt-reduced" };
const _hoisted_6$1 = { class: "mt-0.5 et-text-sm font-mono text-left" };
const _hoisted_7$1 = { class: "shrink-0 relative min-w-0 flex flex-col et-je-ie 2xs:et-je-ie et-gap-xs sm:et-gap-sm" };
const _hoisted_8$1 = { class: "flex flex-row et-js-is 2xs:et-je-ie" };
const _hoisted_9$1 = {
  key: 0,
  class: "w-full flex flex-wrap et-gap-sm"
};
const _hoisted_10 = { class: "grow -mt-1 flex flex-wrap et-gap-sm" };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "UTxOItemHeader",
  props: {
    utxo: { type: Object, required: true },
    minimal: { type: Boolean, required: false, default: false },
    hideValidFor: { type: Boolean, required: false, default: false },
    showSelect: { type: Boolean, required: false, default: false },
    hideLock: { type: Boolean, required: false, default: false },
    badgeLabel: { type: String },
    badgeHint: { type: String }
  },
  setup(__props) {
    const props = __props;
    const $t = useTranslation().t;
    const { isSmallerThanXXS } = useScreenSize();
    const badgeList = computed(() => props.badgeLabel ? [
      { id: "test", label: $t("wallet:" + props.badgeLabel), hover: $t("wallet:" + props.badgeHint) }
    ] : []);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        createBaseVNode("div", _hoisted_2$2, [
          createBaseVNode("div", _hoisted_3$2, [
            createBaseVNode("div", _hoisted_4$1, [
              createBaseVNode("div", _hoisted_5$1, [
                createVNode(_sfc_main$3, {
                  "hide-lock": __props.hideLock,
                  "show-select": __props.showSelect,
                  utxo: __props.utxo
                }, null, 8, ["hide-lock", "show-select", "utxo"]),
                createVNode(_sfc_main$5, {
                  class: "grow",
                  type: "transaction",
                  subject: __props.utxo,
                  "copy-text": unref(getUtxoHash)(__props.utxo.input),
                  hideTransactionExpand: ""
                }, {
                  default: withCtx(() => [
                    createBaseVNode("span", _hoisted_6$1, toDisplayString(unref(getUtxoHash)(__props.utxo.input)), 1)
                  ]),
                  _: 1
                }, 8, ["subject", "copy-text"]),
                !unref(isSmallerThanXXS) && badgeList.value.length > 0 ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: normalizeClass(["shrink w-full min-h-6 min-w-0 flex et-js-is sm:et-js-is et-gap-sm text-left", badgeList.value.length === 0 ? "flex-nowrap" : "flex-wrap"])
                }, [
                  createVNode(_sfc_main$6, {
                    badges: badgeList.value,
                    size: "small"
                  }, null, 8, ["badges"])
                ], 2)) : createCommentVNode("", true)
              ])
            ])
          ]),
          createBaseVNode("div", _hoisted_7$1, [
            createBaseVNode("div", _hoisted_8$1, [
              _cache[0] || (_cache[0] = createBaseVNode("div", { class: "h-6 sm:h-8 w-px" }, null, -1)),
              createVNode(_sfc_main$7, {
                class: "font-semibold",
                amount: __props.utxo.output.amount.coin,
                "with-sign": false
              }, null, 8, ["amount"])
            ])
          ])
        ]),
        badgeList.value.length > 0 && unref(isSmallerThanXXS) ? (openBlock(), createElementBlock("div", _hoisted_9$1, [
          createBaseVNode("div", _hoisted_10, [
            createVNode(_sfc_main$6, { badges: badgeList.value }, null, 8, ["badges"])
          ])
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});

const _hoisted_1$1 = { class: "w-full flex flex-col et-js-is et-gap-sm" };
const _hoisted_2$1 = { class: "w-full flex flex-col et-gap-sm" };
const _hoisted_3$1 = {
  key: 0,
  class: "w-full flex flex-row flex-wrap et-je-is et-gap-sm"
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "UTxOItem",
  props: {
    utxo: { type: Object, required: true },
    showSelect: { type: Boolean, required: false, default: false },
    hideLock: { type: Boolean, required: false, default: false },
    badgeLabel: { type: String },
    badgeHint: { type: String },
    walletId: { type: String, required: false, default: "" },
    accountId: { type: String, required: false, default: "" },
    minimal: { type: Boolean, required: false, default: false },
    showAssets: { type: Boolean, required: false, default: true },
    amountToShow: { type: Number, required: false, default: 2 }
  },
  setup(__props) {
    const props = __props;
    const utxo = computed(() => props.utxo || null);
    const walletId = computed(() => props.walletId || null);
    const accountId = computed(() => props.accountId || null);
    const utxoInfos = useUtxoInfos(utxo, {
      walletId,
      accountId
    });
    const {
      txBalance,
      doTxHashSearch,
      tweenOutModalTransactionViewer
    } = useModalTransactionViewer(walletId, accountId, void 0, false);
    const isOpenInViewer = computed(() => txBalance.value?.hash === props.utxo?.input.transaction_id);
    const toggleModalTransactionViewer = (event) => {
      event.preventDefault();
      if (isOpenInViewer.value) {
        tweenOutModalTransactionViewer();
      } else {
        doTxHashSearch(props.utxo?.input.transaction_id, false);
      }
    };
    return (_ctx, _cache) => {
      const _component_Card = resolveComponent("Card");
      const _component_Button = resolveComponent("Button");
      return openBlock(), createBlock(_component_Button, {
        class: "utxo-item w-full p-0 et-js-ic rounded-card shadow-sm overflow-visible! border-1 border-[var(--p-content-border-color)] data-active:border-border-highlight/50 hover:data-active:border-border-highlight bg-[var(--p-card-background)] hover:bg-[var(--p-button-text-secondary-hover-background)]",
        severity: "secondary",
        "data-ui": isOpenInViewer.value ? "active" : "",
        text: "",
        onClick: withModifiers(toggleModalTransactionViewer, ["prevent", "stop"])
      }, {
        default: withCtx(() => [
          createVNode(_component_Card, {
            class: "w-full bg-transparent border-0 rounded-lg!",
            pt: { body: "p-0 pt-4 pb-3.5 px-4" }
          }, {
            content: withCtx(() => [
              createBaseVNode("div", _hoisted_1$1, [
                createBaseVNode("div", _hoisted_2$1, [
                  utxo.value ? (openBlock(), createBlock(_sfc_main$2, {
                    key: 0,
                    utxo: utxo.value,
                    minimal: __props.minimal,
                    "show-select": __props.showSelect
                  }, null, 8, ["utxo", "minimal", "show-select"])) : createCommentVNode("", true)
                ]),
                __props.showAssets && utxo.value.output.amount.multiasset ? (openBlock(), createElementBlock("div", _hoisted_3$1, [
                  createVNode(_sfc_main$8, {
                    "multi-asset": utxo.value.output.amount.multiasset,
                    "amount-to-show": __props.amountToShow
                  }, null, 8, ["multi-asset", "amount-to-show"])
                ])) : createCommentVNode("", true),
                unref(utxoInfos) && unref(utxoInfos).utxo ? (openBlock(), createBlock(_sfc_main$9, {
                  key: 1,
                  class: "w-auto!",
                  "utxo-infos": unref(utxoInfos),
                  "hide-creds": ""
                }, null, 8, ["utxo-infos"])) : createCommentVNode("", true)
              ]),
              renderSlot(_ctx.$slots, "footer")
            ]),
            _: 3
          })
        ]),
        _: 3
      }, 8, ["data-ui"]);
    };
  }
});

const _hoisted_1 = { class: "flex et-ic" };
const _hoisted_2 = { class: "font-semibold cap-first" };
const _hoisted_3 = { class: "flex et-ic" };
const _hoisted_4 = { class: "font-semibold cap-first" };
const _hoisted_5 = { class: "flex flex-row flex-wrap et-gap-sm et-js-ic" };
const _hoisted_6 = { class: "et-text-sm text-txt-muted mt-px" };
const _hoisted_7 = { class: "col-span-12 flex flex-col et-js-is et-gap-md" };
const _hoisted_8 = { class: "w-full flex flex-col et-gap-sm sm:et-gap-sme" };
const _hoisted_9 = {
  key: 0,
  class: "flex flex-row flex-nowrap et-gap-md et-js-ic ml-5.5 mt-1"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AccountUtxoItem",
  props: {
    utxoItem: { type: Object, required: true },
    index: { type: Number, required: false, default: 0 },
    walletId: { type: String, required: false, default: "" },
    accountId: { type: String, required: false, default: "" },
    showSelect: { type: Boolean, required: false, default: false },
    hideLock: { type: Boolean, required: false, default: false },
    badgeLabel: { type: String },
    badgeHint: { type: String }
  },
  setup(__props) {
    const props = __props;
    const $t = useTranslation().t;
    const { utxoItem } = toRefs(props);
    const {
      getPaginatorTemplate
    } = useTheme();
    const {
      isSmallerThanSM
    } = useScreenSize();
    const {
      appAccount,
      utxoMap
    } = useSelectedAccount();
    const utxoList = computed(() => utxoItem.value.list);
    const {
      numItemsPerPage,
      numItems,
      numPages,
      page,
      onPageStateUpdate
    } = usePaginator(utxoList, 10);
    const badges = ref([]);
    const selectAll = ref(false);
    const onToggleSelectAll = (doSelectAll) => {
      if (!appAccount.value) {
        return;
      }
      for (const utxo of page.value) {
        const utxoHash = getUtxoHash(utxo.input);
        const isLocked = utxoMap.value?.locked.includes(utxoHash) ?? false;
        const isSelected = utxoMap.value?.selected.includes(utxoHash) ?? false;
        if (isLocked) {
          continue;
        }
        if (isSelected && !doSelectAll || !isSelected && doSelectAll) {
          dispatchSignalSyncTo(appAccount.value.id, doToggleSelectedUtxo, utxo);
        }
      }
    };
    const updateSelectAllState = () => {
      let allSelected = true;
      for (const utxo of page.value) {
        const utxoHash = getUtxoHash(utxo.input);
        const isSelected = utxoMap.value?.selected.includes(utxoHash) ?? false;
        if (!isSelected) {
          allSelected = false;
          break;
        }
      }
      selectAll.value = allSelected;
    };
    watch(() => utxoMap.value?.selected, () => {
      updateSelectAllState();
    }, { immediate: true, deep: true });
    watch(page, () => {
      updateSelectAllState();
    });
    watch(utxoItem, () => {
      badges.value = [];
      addContractBadge([utxoItem?.value.bech32], badges.value);
    }, { immediate: true, deep: true });
    return (_ctx, _cache) => {
      const _component_Card = resolveComponent("Card");
      const _component_Paginator = resolveComponent("Paginator");
      const _component_Checkbox = resolveComponent("Checkbox");
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(_component_Card, {
          class: normalizeClass(["account-list-item col-span-12", __props.index === 0 ? "" : "mt-10"]),
          pt: {
            content: "grid grid-cols-[auto_minmax(auto,_1fr)] et-gap-x-md et-gap-y-xs"
          }
        }, {
          content: withCtx(() => [
            createBaseVNode("div", _hoisted_1, [
              createBaseVNode("span", _hoisted_2, toDisplayString(unref($t)("common:address")) + ":", 1)
            ]),
            createVNode(_sfc_main$a, {
              class: normalizeClass(["grow", __props.showSelect ? "cursor-pointer" : "cursor-auto"]),
              address: unref(utxoItem).bech32,
              small: unref(isSmallerThanSM)
            }, null, 8, ["class", "address", "small"]),
            createBaseVNode("div", _hoisted_3, [
              createBaseVNode("span", _hoisted_4, toDisplayString(unref($t)("common:key")) + ":", 1)
            ]),
            createBaseVNode("div", _hoisted_5, [
              createBaseVNode("span", _hoisted_6, toDisplayString(unref(utxoItem).pathInfo), 1),
              __props.badgeLabel ? (openBlock(), createBlock(_sfc_main$b, {
                key: 0,
                badge: { id: "test", label: unref($t)(__props.badgeLabel), hover: unref($t)(__props.badgeHint) },
                class: "whitespace-nowrap",
                size: "small",
                label: unref($t)(__props.badgeLabel)
              }, null, 8, ["badge", "label"])) : createCommentVNode("", true),
              badges.value.length > 0 ? (openBlock(), createBlock(_sfc_main$6, {
                key: 1,
                badges: badges.value,
                size: "small"
              }, null, 8, ["badges"])) : createCommentVNode("", true)
            ])
          ]),
          _: 1
        }, 8, ["class"]),
        createBaseVNode("div", _hoisted_7, [
          unref(numPages) > 1 ? (openBlock(), createBlock(_component_Paginator, {
            key: 0,
            "page-link-size": 3,
            template: unref(getPaginatorTemplate)(),
            rows: unref(numItemsPerPage),
            "total-records": unref(numItems),
            pt: { content: "flex flex-row flex-nowrap" },
            onPage: unref(onPageStateUpdate)
          }, null, 8, ["template", "rows", "total-records", "onPage"])) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_8, [
            __props.showSelect ? (openBlock(), createElementBlock("div", _hoisted_9, [
              createVNode(_component_Checkbox, {
                modelValue: selectAll.value,
                "onUpdate:modelValue": [
                  _cache[0] || (_cache[0] = ($event) => selectAll.value = $event),
                  onToggleSelectAll
                ],
                binary: ""
              }, null, 8, ["modelValue"]),
              createBaseVNode("span", null, toDisplayString(unref($t)("utxoList-page:selectAll")), 1)
            ])) : createCommentVNode("", true),
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(page), (utxo, u_index) => {
              return openBlock(), createBlock(_sfc_main$1, {
                key: utxo.input.transaction_id + "#" + utxo.input.index,
                utxo,
                "wallet-id": __props.walletId,
                "account-id": __props.accountId,
                "show-select": __props.showSelect
              }, null, 8, ["utxo", "wallet-id", "account-id", "show-select"]);
            }), 128))
          ])
        ])
      ], 64);
    };
  }
});

export { _sfc_main as _ };
