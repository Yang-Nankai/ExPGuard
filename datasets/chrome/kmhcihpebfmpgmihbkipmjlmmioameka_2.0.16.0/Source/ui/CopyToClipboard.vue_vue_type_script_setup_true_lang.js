import { m as createElementBlock, o as openBlock, p as createBaseVNode, d as defineComponent, ab as mergeModels, ac as useModel, w as useTranslation, e as ref, a8 as useElementSize, G as watch, c as createBlock, z as resolveComponent, U as withModifiers, V as normalizeClass, y as withCtx, n as createVNode, ai as Transition } from './index.js';
import { c as copyToClipboard } from './index3.js';
import { u as useNotifications } from './useNotification.js';
import { I as IconCopy01 } from './IconCopy01.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper.js';

const _sfc_main$1 = {  };

const _hoisted_1 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none"
};

function _sfc_render(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      d: "M5 14.5C5 14.5 6.5 14.5 8.5 18C8.5 18 14.0588 8.83333 19 7",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, -1)
  ]))]))
}
const IconTick01 = /*#__PURE__*/_export_sfc(_sfc_main$1, [['render',_sfc_render]]);

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CopyToClipboard",
  props: /* @__PURE__ */ mergeModels({
    class: { type: String, required: false, default: "shrink-0 size-6 p-0" },
    copyText: { type: String, required: false, default: "" },
    notificationText: { type: String, required: false, default: "" },
    iconSize: { type: String, required: false, default: "w-3 h-3" }
  }, {
    "elWidth": { type: Number, required: false, default: 0 },
    "elWidthModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["clicked"], ["update:elWidth"]),
  setup(__props, { emit: __emit }) {
    const elWidth = useModel(__props, "elWidth");
    const props = __props;
    const emit = __emit;
    const $t = useTranslation().t;
    const {
      showCopied,
      showError
    } = useNotifications();
    const recentlyCopied = ref(false);
    const label = ref();
    const elementSize = useElementSize(label);
    watch(() => elementSize.width.value, (width) => {
      elWidth.value = width ?? 0;
    });
    let _toid = -1;
    const setRecentlyCopied = () => {
      clearTimeout(_toid);
      recentlyCopied.value = true;
      _toid = setTimeout(() => {
        recentlyCopied.value = false;
      }, 2e3);
    };
    const doCopyToClipboard = () => {
      return copyToClipboard(props.copyText).then((res) => {
        if (res) {
          if (props.notificationText) {
            showCopied(props.notificationText);
          } else {
            showCopied(props.copyText);
          }
          setRecentlyCopied();
          emit("clicked");
        } else {
          showError($t("common:copy.failed"));
        }
        return res;
      }).catch((err) => {
        showError($t("common:copy.failed") + ": " + err);
      });
    };
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      return openBlock(), createBlock(_component_Button, {
        class: normalizeClass(__props.class),
        ref_key: "label",
        ref: label,
        severity: "secondary",
        size: "small",
        rounded: "",
        outlined: "",
        onClick: withModifiers(doCopyToClipboard, ["stop", "prevent"])
      }, {
        icon: withCtx(() => [
          createVNode(Transition, {
            name: "fade",
            mode: "out-in"
          }, {
            default: withCtx(() => [
              !recentlyCopied.value ? (openBlock(), createBlock(IconCopy01, {
                key: 0,
                class: normalizeClass(["", __props.iconSize])
              }, null, 8, ["class"])) : (openBlock(), createBlock(IconTick01, {
                key: 1,
                class: normalizeClass(["text-txt-green", __props.iconSize])
              }, null, 8, ["class"]))
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["class"]);
    };
  }
});

export { _sfc_main as _ };
