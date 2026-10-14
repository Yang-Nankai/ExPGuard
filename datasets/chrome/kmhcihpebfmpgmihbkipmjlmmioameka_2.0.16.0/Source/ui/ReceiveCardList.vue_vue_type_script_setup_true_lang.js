import { d as defineComponent, w as useTranslation, D as computed, z as resolveComponent, c as createBlock, t as createCommentVNode, u as unref, o as openBlock, U as withModifiers, V as normalizeClass, y as withCtx, n as createVNode, m as createElementBlock, p as createBaseVNode, B as toDisplayString, F as Fragment, S as renderList } from './index.js';
import { G as useAdaHandle } from './useAppAccountBalances.js';
import { _ as _sfc_main$6 } from './CopyToClipboard.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$4 } from './ResolvedImage.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$5 } from './AdaHandleName.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$7 } from './ReceiveListItem.vue_vue_type_script_setup_true_lang.js';
import { I as IconFxLoader } from './IconFxLoader.js';
import { _ as _sfc_main$8 } from './QRCodeRenderer.vue_vue_type_script_setup_true_lang.js';

const _hoisted_1$3 = { class: "mt-0 sm:mt-0" };
const _hoisted_2$1 = {
  key: 0,
  class: "w-full flex flex-col et-gap-xs"
};
const _hoisted_3$1 = {
  key: 1,
  class: "w-full flex flex-col et-gap-xs"
};
const _hoisted_4 = { class: "text-red" };
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "AdaHandleCard",
  props: {
    adaHandle: { type: Object, required: true },
    selectedAdaHandle: { type: Object, required: false, default: void 0 },
    size: { type: String, required: false, default: void 0 },
    selectable: { type: Boolean, required: false, default: false }
  },
  emits: ["select"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const $t = useTranslation().t;
    const multiAsset = computed(() => props.adaHandle);
    const {
      isLoadingAdaHandle,
      isResolvedAdaHandle,
      adaHandleName,
      adaHandleHexName,
      adaHandleImage,
      adaHandleAddress,
      getHexName
    } = useAdaHandle(multiAsset);
    const cssImageSize = computed(() => {
      if (props.size === "small") {
        return "size-[100px] sm:size-[120px]";
      }
      return "size-[100px] sm:size-[200px]";
    });
    const isSelected = computed(() => {
      return (adaHandleHexName.value ?? "-1") === getHexName(props.selectedAdaHandle);
    });
    const onSelect = () => {
      emit("select", adaHandleHexName.value);
    };
    return (_ctx, _cache) => {
      const _component_Card = resolveComponent("Card");
      const _component_Button = resolveComponent("Button");
      return unref(adaHandleHexName) ? (openBlock(), createBlock(_component_Button, {
        key: 0,
        class: normalizeClass(["transaction-item w-full p-0 et-js-ic rounded-card shadow-sm border-1 border-[var(--p-content-border-color)] data-active:border-border-highlight/50 hover:data-active:border-border-highlight bg-[var(--p-card-background)]", __props.selectable ? "cursor-pointer hover:bg-[var(--p-button-text-secondary-hover-background)]" : "cursor-default"]),
        severity: "secondary",
        "data-ui": isSelected.value ? "active" : "",
        text: "",
        onClick: withModifiers(onSelect, ["prevent", "stop"])
      }, {
        default: withCtx(() => [
          createVNode(_component_Card, {
            class: "w-full bg-transparent border-0 rounded-lg!",
            pt: {
              content: "relative w-full flex flex-col et-js-ic et-gap-md"
            }
          }, {
            content: withCtx(() => [
              unref(isLoadingAdaHandle) ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: normalizeClass(["w-full flex flex-row et-jc-ic h-24", __props.size === "small" ? "et-gap-md sm:et-gap-mde" : "et-gap-md sm:et-gap-lg"])
              }, [
                createVNode(IconFxLoader, { finished: unref(isResolvedAdaHandle) }, null, 8, ["finished"])
              ], 2)) : (openBlock(), createElementBlock("div", {
                key: 1,
                class: normalizeClass(["w-full flex flex-row et-js-ic", __props.size === "small" ? "et-gap-md sm:et-gap-mde" : "et-gap-md sm:et-gap-lg"])
              }, [
                createBaseVNode("div", _hoisted_1$3, [
                  unref(adaHandleImage) ? (openBlock(), createBlock(_sfc_main$4, {
                    key: 0,
                    class: "shrink-0",
                    size: cssImageSize.value,
                    rounded: "rounded-xl",
                    image: unref(adaHandleImage),
                    inject: false
                  }, null, 8, ["size", "image"])) : createCommentVNode("", true)
                ]),
                unref(isResolvedAdaHandle) ? (openBlock(), createElementBlock("div", _hoisted_2$1, [
                  createVNode(_sfc_main$5, {
                    size: __props.size,
                    "ada-handle-name": unref(adaHandleName)
                  }, {
                    copy: withCtx(() => [
                      createVNode(_sfc_main$6, {
                        "copy-text": "$" + unref(adaHandleName),
                        compact: ""
                      }, null, 8, ["copy-text"])
                    ]),
                    _: 1
                  }, 8, ["size", "ada-handle-name"]),
                  unref(adaHandleAddress) ? (openBlock(), createBlock(_sfc_main$7, {
                    key: 0,
                    item: unref(adaHandleAddress),
                    "hide-share": ""
                  }, null, 8, ["item"])) : createCommentVNode("", true)
                ])) : (openBlock(), createElementBlock("div", _hoisted_3$1, [
                  createBaseVNode("span", null, toDisplayString(unref(adaHandleHexName)), 1),
                  createBaseVNode("span", _hoisted_4, toDisplayString(unref($t)("sendMode:adaHandle.error.resolve")), 1)
                ]))
              ], 2))
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["class", "data-ui"])) : createCommentVNode("", true);
    };
  }
});

const _hoisted_1$2 = { class: "mt-4 sm:mt-0" };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ReceiveCard",
  props: {
    receiveAddress: { type: Object, required: true }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_Card = resolveComponent("Card");
      return __props.receiveAddress ? (openBlock(), createBlock(_component_Card, {
        key: 0,
        class: "w-full",
        pt: { content: "w-full flex flex-col sm:flex-row et-gap-lg et-js-ic" }
      }, {
        content: withCtx(() => [
          createBaseVNode("div", _hoisted_1$2, [
            createVNode(_sfc_main$8, {
              target: __props.receiveAddress.bech32,
              size: "w-50",
              title: _ctx.$t("common:receiveAddress")
            }, null, 8, ["target", "title"])
          ]),
          createVNode(_sfc_main$7, {
            item: __props.receiveAddress,
            "hide-share": ""
          }, null, 8, ["item"])
        ]),
        _: 1
      })) : createCommentVNode("", true);
    };
  }
});

const _hoisted_1$1 = { class: "w-full flex flex-col et-gap-md et-js-is" };
const _hoisted_2 = { class: "w-full flex flex-col sm:flex-row et-gap-lg et-js-ic" };
const _hoisted_3 = { class: "mt-4 sm:mt-0" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ReceivePanel",
  props: {
    receiveAddress: { type: Object, required: true }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_Panel = resolveComponent("Panel");
      return openBlock(), createBlock(_component_Panel, {
        header: _ctx.$t("receive-page:unused.headline"),
        class: "w-full rounded-2xl",
        toggleable: "",
        collapsed: ""
      }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1$1, [
            createBaseVNode("div", null, toDisplayString(_ctx.$t("receive-page:unused.hint")), 1),
            createBaseVNode("div", _hoisted_2, [
              createBaseVNode("div", _hoisted_3, [
                createVNode(_sfc_main$8, {
                  target: __props.receiveAddress.bech32,
                  size: "w-50",
                  title: _ctx.$t("common:receiveAddress")
                }, null, 8, ["target", "title"])
              ]),
              createVNode(_sfc_main$7, {
                item: __props.receiveAddress,
                "hide-share": ""
              }, null, 8, ["item"])
            ])
          ])
        ]),
        _: 1
      }, 8, ["header"]);
    };
  }
});

const _hoisted_1 = { class: "w-full flex flex-col et-gap-md" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ReceiveCardList",
  props: {
    receiveAddress: { type: Object, required: true },
    forcedUnusedAddress: { type: Object, required: false },
    adaHandleList: { type: Array, required: false },
    adaHandle: { type: Object, required: false }
  },
  setup(__props) {
    const props = __props;
    const _adaHandleList = computed(() => {
      if (!props.adaHandle) {
        return props.adaHandleList ?? [];
      }
      return [props.adaHandle];
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        __props.receiveAddress ? (openBlock(), createBlock(_sfc_main$2, {
          key: 0,
          "receive-address": __props.receiveAddress
        }, null, 8, ["receive-address"])) : createCommentVNode("", true),
        __props.forcedUnusedAddress ? (openBlock(), createBlock(_sfc_main$1, {
          key: 1,
          "receive-address": __props.forcedUnusedAddress
        }, null, 8, ["receive-address"])) : createCommentVNode("", true),
        _adaHandleList.value ? (openBlock(true), createElementBlock(Fragment, { key: 2 }, renderList(_adaHandleList.value, (handle) => {
          return openBlock(), createBlock(_sfc_main$3, { "ada-handle": handle }, null, 8, ["ada-handle"]);
        }), 256)) : createCommentVNode("", true)
      ]);
    };
  }
});

export { _sfc_main as _, _sfc_main$3 as a };
