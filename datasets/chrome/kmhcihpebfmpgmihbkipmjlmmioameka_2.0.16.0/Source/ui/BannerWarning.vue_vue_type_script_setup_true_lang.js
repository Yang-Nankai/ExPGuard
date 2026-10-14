import { I as IconAlert02 } from './IconAlert02.js';
import { d as defineComponent, e as ref, c as createBlock, o as openBlock, z as resolveComponent, y as withCtx, p as createBaseVNode, m as createElementBlock, t as createCommentVNode, B as toDisplayString, a0 as renderSlot, n as createVNode } from './index.js';

const _hoisted_1 = { class: "et-text-md font-semibold text-txt-warning cap-first" };
const _hoisted_2 = { class: "w-full flex flex-col et-js-is et-gap-md" };
const _hoisted_3 = {
  key: 0,
  class: "w-full text-txt-warning break-words whitespace-pre-wrap"
};
const _hoisted_4 = {
  key: 1,
  class: "w-full"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BannerWarning",
  props: {
    headline: { type: String },
    caption: { type: String }
  },
  setup(__props) {
    const panel = ref();
    const onToggleCollapsed = () => {
      panel.value?.toggle();
    };
    return (_ctx, _cache) => {
      const _component_Panel = resolveComponent("Panel");
      return openBlock(), createBlock(_component_Panel, {
        ref_key: "panel",
        ref: panel,
        class: "w-full bg-bg-warning rounded-2xl!",
        pt: {
          pctogglebutton: {
            root: "bg-bg-warning hover:bg-bg-app/20 text-txt-warning outline-txt-warning"
          },
          content: __props.caption ? "" : "py-0"
        },
        toggleable: !!__props.caption && __props.caption.length > 0
      }, {
        header: withCtx(() => [
          createBaseVNode("div", {
            class: "w-full flex et-ic et-gap-sme cursor-pointer",
            onClick: onToggleCollapsed
          }, [
            renderSlot(_ctx.$slots, "icon", {}, () => [
              createVNode(IconAlert02, { class: "shrink-0 grow-0 w-5 sm:w-6 fill-none text-txt-warning" })
            ]),
            createBaseVNode("span", _hoisted_1, toDisplayString(__props.headline), 1)
          ])
        ]),
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_2, [
            __props.caption ? (openBlock(), createElementBlock("div", _hoisted_3, toDisplayString(__props.caption), 1)) : createCommentVNode("", true),
            _ctx.$slots.default ? (openBlock(), createElementBlock("div", _hoisted_4, [
              renderSlot(_ctx.$slots, "default")
            ])) : createCommentVNode("", true)
          ])
        ]),
        _: 3
      }, 8, ["pt", "toggleable"]);
    };
  }
});

export { _sfc_main as _ };
