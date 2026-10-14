import { d as defineComponent, m as createElementBlock, o as openBlock, t as createCommentVNode, p as createBaseVNode, V as normalizeClass, c as createBlock, W as resolveDynamicComponent, a0 as renderSlot, B as toDisplayString } from './index.js';

const _hoisted_1 = { class: "page-header relative w-full flex flex-col et-js-is xs:px-0 mt-2 sm:pt-1" };
const _hoisted_2 = { class: "flex flex-row et-js-ic et-gap-sm" };
const _hoisted_3 = {
  key: 0,
  class: "text-xl font-semibold capitalize"
};
const _hoisted_4 = {
  key: 0,
  class: "relative flex flex-col et-js-is"
};
const _hoisted_5 = {
  key: 1,
  class: "break-words"
};
const _hoisted_6 = {
  key: 2,
  class: "text-txt-muted break-words"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PageHeader",
  props: {
    title: { type: String, required: false, default: "" },
    caption: { type: String, required: false, default: "" },
    caption2: { type: String, required: false, default: "" },
    animation: { type: Object, required: false },
    animationClass: { type: String, required: false }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        __props.animation ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(["page-header-animation absolute et-max-width-page", __props.animationClass ? __props.animationClass : "left-0 top-0 right-0 bottom-0"])
        }, [
          (openBlock(), createBlock(resolveDynamicComponent(__props.animation)))
        ], 2)) : createCommentVNode("", true),
        createBaseVNode("div", {
          class: normalizeClass(["page-header-title relative h-full flex flex-col et-js-is et-gap-sm", _ctx.$slots.caption || _ctx.$slots["sub-caption"] || __props.caption || __props.caption2 ? "min-h-24" : ""])
        }, [
          createBaseVNode("div", _hoisted_2, [
            __props.title ? (openBlock(), createElementBlock("div", _hoisted_3, toDisplayString(__props.title), 1)) : createCommentVNode("", true),
            renderSlot(_ctx.$slots, "icon")
          ]),
          _ctx.$slots.caption || _ctx.$slots["sub-caption"] ? (openBlock(), createElementBlock("div", _hoisted_4, [
            renderSlot(_ctx.$slots, "caption"),
            renderSlot(_ctx.$slots, "sub-caption")
          ])) : createCommentVNode("", true),
          __props.caption ? (openBlock(), createElementBlock("div", _hoisted_5, toDisplayString(__props.caption), 1)) : createCommentVNode("", true),
          __props.caption2 ? (openBlock(), createElementBlock("div", _hoisted_6, toDisplayString(__props.caption2), 1)) : createCommentVNode("", true),
          renderSlot(_ctx.$slots, "append")
        ], 2)
      ]);
    };
  }
});

export { _sfc_main as _ };
