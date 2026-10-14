import { m as createElementBlock, o as openBlock, p as createBaseVNode, d as defineComponent, w as useTranslation, x as useScreenSize, D as computed, aP as markRaw, t as createCommentVNode, n as createVNode, u as unref, B as toDisplayString, z as resolveComponent } from './index.js';
import { u as useAppMode } from './useAppMode.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper.js';
import { _ as _sfc_main$3 } from './CopyToClipboard.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$2 } from './TransactionUTxOAddress.vue_vue_type_script_setup_true_lang.js';

const _sfc_main$1 = {  };

const _hoisted_1$1 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  color: "currentColor",
  fill: "none"
};

function _sfc_render(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$1, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      d: "M11.0257 2.99985C6.5113 3.49881 3 7.32556 3 11.9723C3 16.9581 7.04239 20.9998 12.0289 20.9998C16.668 20.9998 20.4898 17.5018 21 12.9998",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round"
    }, null, -1),
    createBaseVNode("path", {
      d: "M20.9995 6.02514L20 6.02261C16.2634 6.01316 14.3951 6.00843 13.0817 6.95251C12.6452 7.26623 12.2622 7.64829 11.9474 8.08397C11 9.395 11 11.2633 11 14.9998M20.9995 6.02514C21.0062 5.86251 20.9481 5.6989 20.8251 5.55318C20.0599 4.64671 18.0711 2.99985 18.0711 2.99985M20.9995 6.02514C20.9934 6.17097 20.9352 6.31601 20.8249 6.44666C20.0596 7.35295 18.0711 8.99985 18.0711 8.99985",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, -1)
  ]))]))
}
const IconShare04 = /*#__PURE__*/_export_sfc(_sfc_main$1, [['render',_sfc_render]]);

const _hoisted_1 = { class: "receive-list-item w-full flex flex-row et-gap-sm" };
const _hoisted_2 = { class: "grow flex flex-col et-jc-is" };
const _hoisted_3 = {
  key: 0,
  class: "et-text-sm text-txt-muted"
};
const _hoisted_4 = {
  key: 1,
  class: "w-full mt-2 flex"
};
const _hoisted_5 = { key: 0 };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ReceiveListItem",
  props: {
    item: { type: Object, required: true },
    hideShare: { type: Boolean, required: false, default: false },
    hideCopy: { type: Boolean, required: false, default: false }
  },
  emits: ["openShare"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const $t = useTranslation().t;
    const { isProMode } = useAppMode();
    const { isSmallerThanSM } = useScreenSize();
    const additionalMenuOptions = computed(() => {
      if (props.hideShare) {
        return [];
      }
      return [
        {
          id: "share",
          icon: markRaw(IconShare04),
          fn: () => openModalShare(props.item),
          label: $t("common:button.shareAddress")
        }
      ];
    });
    const openModalShare = (item) => {
      emit("openShare", item);
    };
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createVNode(_sfc_main$2, {
            class: "w-full",
            address: __props.item.bech32,
            "full-width": __props.hideShare,
            "additional-menu-options": additionalMenuOptions.value,
            "popover-left": ""
          }, null, 8, ["address", "full-width", "additional-menu-options"]),
          unref(isProMode) ? (openBlock(), createElementBlock("span", _hoisted_3, toDisplayString(__props.item.pathInfo), 1)) : createCommentVNode("", true),
          !__props.hideCopy ? (openBlock(), createElementBlock("div", _hoisted_4, [
            createVNode(_sfc_main$3, {
              class: "max-xs:grow",
              label: unref($t)("common:copy.address"),
              "copy-text": __props.item.bech32
            }, null, 8, ["label", "copy-text"])
          ])) : createCommentVNode("", true)
        ]),
        !__props.hideShare ? (openBlock(), createElementBlock("div", _hoisted_5, [
          createVNode(_component_Button, {
            class: "px-3 shrink-0 whitespace-nowrap",
            label: unref(isSmallerThanSM) ? unref($t)("common:share") : unref($t)("common:button.shareAddress"),
            severity: "secondary",
            size: "small",
            rounded: "",
            outlined: "",
            onClick: _cache[0] || (_cache[0] = ($event) => openModalShare(__props.item))
          }, null, 8, ["label"])
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});

export { IconShare04 as I, _sfc_main as _ };
