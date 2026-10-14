import { _ as _sfc_main$1 } from './Badge.vue_vue_type_script_setup_true_lang.js';
import { d as defineComponent, m as createElementBlock, o as openBlock, F as Fragment, S as renderList, c as createBlock } from './index.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Badges",
  props: {
    badges: { type: Array, required: true, default: [] },
    cssLabel: { type: String, required: false, default: "" },
    size: { type: String, required: false, default: void 0 },
    cssBadge: { type: String, required: false, default: "" },
    noAction: { type: Boolean, required: false, default: false },
    addColors: { type: Boolean, required: false, default: false },
    translationNamespace: { type: String, required: false, default: "badge" },
    translationPrefix: { type: String, required: false, default: "" }
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _cache) => {
      return openBlock(true), createElementBlock(Fragment, null, renderList(__props.badges, (badge) => {
        return openBlock(), createBlock(_sfc_main$1, {
          size: __props.size,
          badge,
          "css-label": __props.cssLabel,
          "css-badge": __props.cssBadge,
          "no-action": __props.noAction,
          "add-colors": __props.addColors,
          "translation-namespace": __props.translationNamespace,
          "translation-prefix": __props.translationPrefix,
          onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("click"))
        }, null, 8, ["size", "badge", "css-label", "css-badge", "no-action", "add-colors", "translation-namespace", "translation-prefix"]);
      }), 256);
    };
  }
});

export { _sfc_main as _ };
