import { d as defineComponent, e as ref, G as watch, f as onMounted, k as onUnmounted, c as createBlock, o as openBlock, ai as Transition, y as withCtx, m as createElementBlock, t as createCommentVNode, V as normalizeClass, p as createBaseVNode } from './index.js';
import { g as gsapWithCSS } from './index2.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "GradientBar2",
  props: {
    show: { type: Boolean, required: false, default: true },
    progress: { type: Number, required: true, default: 0 }
  },
  setup(__props) {
    const props = __props;
    const gradientBar = ref();
    const animate = () => {
      if (!gradientBar.value) {
        return;
      }
      gsapWithCSS.set(gradientBar.value, { x: Math.floor(props.progress) + "%" });
    };
    const stopProgress = watch(() => props.progress, animate);
    const stopShow = watch(() => props.show, animate);
    onMounted(() => {
      animate();
    });
    onUnmounted(() => {
      stopProgress();
      stopShow();
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, { name: "gradient-bar" }, {
        default: withCtx(() => [
          __props.show ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(["gradient-bar relative z-max w-full et-bg-epoch-progress", __props.show ? "opacity-100 h-full" : "opacity-0 h-0"])
          }, [
            createBaseVNode("div", {
              class: "absolute z-max w-full h-full top-0 left-0 et-bg-1 opacity-75",
              ref_key: "gradientBar",
              ref: gradientBar
            }, null, 512)
          ], 2)) : createCommentVNode("", true)
        ]),
        _: 1
      });
    };
  }
});

const GradientBar2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f1c45378"]]);

export { GradientBar2 as G };
