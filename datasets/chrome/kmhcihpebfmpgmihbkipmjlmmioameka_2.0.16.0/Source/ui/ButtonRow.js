import { d as defineComponent, m as createElementBlock, o as openBlock, V as normalizeClass, a0 as renderSlot } from './index.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ButtonRow",
  props: {
    alignLeft: { type: Boolean, required: false, default: false },
    alignCenter: { type: Boolean, required: false, default: false },
    alignBetween: { type: Boolean, required: false, default: false },
    notFullWidth: { type: Boolean, required: false, default: false }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          "button-row grow shrink max-w-full flex flex-row max-sm:flex-wrap et-gap-sm et-jb-ic",
          (__props.alignLeft ? "et-js-ic!" : __props.alignBetween ? "et-jb-ic!" : __props.alignCenter ? "et-jc-ic!" : "et-je-ic") + " " + (__props.notFullWidth ? "" : "w-full")
        ])
      }, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 2);
    };
  }
});

const ButtonRow = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a70cb557"]]);

export { ButtonRow as B };
