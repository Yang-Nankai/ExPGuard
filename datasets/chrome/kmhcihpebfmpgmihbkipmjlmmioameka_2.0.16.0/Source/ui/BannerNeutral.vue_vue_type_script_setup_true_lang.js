import { I as IconInformationCircle } from './IconInformationCircle.js';
import { d as defineComponent, e as ref, c as createBlock, o as openBlock, z as resolveComponent, y as withCtx, a0 as renderSlot, m as createElementBlock, t as createCommentVNode, B as toDisplayString, p as createBaseVNode, n as createVNode } from './index.js';

const _hoisted_1 = { class: "et-text-md font-semibold text-txt-reduced cap-first" };
const _hoisted_2 = {
  key: 1,
  class: "text-txt-muted break-words whitespace-pre-wrap"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BannerNeutral",
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
        class: "w-full rounded-2xl! border-1 border-gray/25",
        pt: {
          pctogglebutton: {
            root: "hover:bg-bg-app/20 outline-txt-1"
          }
        },
        toggleable: !!__props.caption && __props.caption.length > 0
      }, {
        header: withCtx(() => [
          createBaseVNode("div", {
            class: "w-full flex et-ic et-gap-sme cursor-pointer",
            onClick: onToggleCollapsed
          }, [
            renderSlot(_ctx.$slots, "icon", {}, () => [
              createVNode(IconInformationCircle, { class: "shrink-0 grow-0 w-5 sm:w-6 fill-none text-txt-reduced" })
            ]),
            createBaseVNode("span", _hoisted_1, toDisplayString(__props.headline), 1)
          ])
        ]),
        default: withCtx(() => [
          _ctx.$slots.caption ? renderSlot(_ctx.$slots, "caption", { key: 0 }) : __props.caption ? (openBlock(), createElementBlock("span", _hoisted_2, toDisplayString(__props.caption), 1)) : createCommentVNode("", true)
        ]),
        _: 3
      }, 8, ["toggleable"]);
    };
  }
});

export { _sfc_main as _ };
