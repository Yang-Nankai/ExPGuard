import { _ as _export_sfc } from './_plugin-vue_export-helper.js';
import { m as createElementBlock, o as openBlock, p as createBaseVNode, d as defineComponent, c as createBlock, z as resolveComponent, y as withCtx, n as createVNode, bC as useRtlHelper, u as unref, a0 as renderSlot, t as createCommentVNode, V as normalizeClass, B as toDisplayString } from './index.js';
import { I as IconInformationCircle } from './IconInformationCircle.js';
import { I as IconCancel01 } from './IconCancel01.js';

const _sfc_main$5 = {  };

const _hoisted_1$2 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
};

function _sfc_render$1(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$2, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M15 6s-6 4.419-6 6s6 6 6 6",
      color: "currentColor"
    }, null, -1)
  ]))]))
}
const IconChevronLeft = /*#__PURE__*/_export_sfc(_sfc_main$5, [['render',_sfc_render$1]]);

const _sfc_main$4 = {  };

const _hoisted_1$1 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
};

function _sfc_render(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$1, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      d: "M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",
      fill: "none",
      color: "currentColor",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, -1)
  ]))]))
}
const IconArrowRight01 = /*#__PURE__*/_export_sfc(_sfc_main$4, [['render',_sfc_render]]);

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ButtonHeaderBack",
  props: {
    showRight: { type: Boolean, required: false, default: false }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      return openBlock(), createBlock(_component_Button, {
        class: "w-10 h-10 sm:w-12 sm:h-12 rounded-lg backdrop-blur-xs",
        severity: "secondary",
        rounded: "",
        outlined: ""
      }, {
        icon: withCtx(() => [
          !__props.showRight ? (openBlock(), createBlock(IconChevronLeft, {
            key: 0,
            class: "w-5 h-5 sm:w-6 sm:h-6 -ml-0.5"
          })) : (openBlock(), createBlock(IconArrowRight01, {
            key: 1,
            class: "w-5 h-5 sm:w-6 sm:h-6 -mr-0.5"
          }))
        ]),
        _: 1
      });
    };
  }
});

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ButtonInfo",
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      return openBlock(), createBlock(_component_Button, {
        class: "w-10 h-10 sm:w-12 sm:h-12 rounded-lg backdrop-blur-xs",
        severity: "secondary",
        rounded: "",
        outlined: ""
      }, {
        icon: withCtx(() => [
          createVNode(IconInformationCircle, { class: "w-4 h-4 sm:w-5 sm:h-5" })
        ]),
        _: 1
      });
    };
  }
});

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ButtonClose",
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      return openBlock(), createBlock(_component_Button, {
        class: "w-10 h-10 sm:w-12 sm:h-12 rounded-lg backdrop-blur-xs",
        severity: "secondary",
        rounded: "",
        outlined: ""
      }, {
        icon: withCtx(() => [
          createVNode(IconCancel01, { class: "w-4 h-4 sm:w-5 sm:h-5" })
        ]),
        _: 1
      });
    };
  }
});

const _hoisted_1 = { class: "w-full flex flex-col mt-2" };
const _hoisted_2 = { class: "relative w-full flex flex-row et-gap-sm md:et-gap-md et-jb-ic" };
const _hoisted_3 = {
  key: 0,
  class: "w-12 absolute top-0 left-0"
};
const _hoisted_4 = {
  key: 1,
  class: "absolute top-0 left-0 flex flex-row et-js-is et-gap-sm"
};
const _hoisted_5 = { class: "cap-first" };
const _hoisted_6 = { class: "text-txt-muted whitespace-pre-line cap-first" };
const _hoisted_7 = {
  key: 2,
  class: "absolute top-0 right-0 flex flex-row et-js-ie et-gap-sm"
};
const _hoisted_8 = {
  key: 3,
  class: "w-12 absolute top-0 right-0"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ModalHeader",
  props: {
    headline: { type: String, required: false, default: "" },
    caption: { type: String, required: false, default: "" },
    hideBack: { type: Boolean, required: false, default: false },
    hideInfo: { type: Boolean, required: false, default: false },
    showClose: { type: Boolean, required: false, default: false },
    textLeft: { type: Boolean, required: false, default: false },
    showRight: { type: Boolean, required: false, default: false }
  },
  emits: ["back", "info", "close"],
  setup(__props) {
    const { isRtl } = useRtlHelper();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          !unref(isRtl) ? (openBlock(), createElementBlock("div", _hoisted_3, [
            renderSlot(_ctx.$slots, "icon"),
            !__props.hideBack ? (openBlock(), createBlock(_sfc_main$3, {
              key: 0,
              "show-right": __props.showRight,
              onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("back"))
            }, null, 8, ["show-right"])) : createCommentVNode("", true)
          ])) : (openBlock(), createElementBlock("div", _hoisted_4, [
            renderSlot(_ctx.$slots, "pre-info"),
            !__props.hideInfo ? (openBlock(), createBlock(_sfc_main$2, {
              key: 0,
              onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("info"))
            })) : createCommentVNode("", true),
            renderSlot(_ctx.$slots, "pre-close"),
            __props.showClose ? (openBlock(), createBlock(_sfc_main$1, {
              key: 1,
              onClick: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("close"))
            })) : createCommentVNode("", true),
            renderSlot(_ctx.$slots, "info")
          ])),
          createBaseVNode("div", {
            class: normalizeClass(["w-full flex flex-col et-gap-sm sm:et-gap-md", __props.textLeft ? "et-jc-is" : "et-jc-ic"])
          }, [
            createBaseVNode("div", {
              class: normalizeClass([
                (__props.textLeft ? "et-js-ic text-left" : "px-14 et-jc-ic text-center") + " " + (__props.hideBack ? "" : unref(isRtl) ? "pr-16! " : "pl-16! "),
                "w-full min-h-12 flex et-text-xl font-semibold"
              ])
            }, [
              createBaseVNode("span", _hoisted_5, toDisplayString(__props.headline), 1),
              renderSlot(_ctx.$slots, "headline")
            ], 2),
            __props.caption ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass([__props.textLeft ? "text-left" : "text-center", "flex flex-row et-js-ic et-gap-sm"])
            }, [
              renderSlot(_ctx.$slots, "pre-caption"),
              createBaseVNode("span", _hoisted_6, toDisplayString(__props.caption), 1),
              renderSlot(_ctx.$slots, "post-caption")
            ], 2)) : createCommentVNode("", true)
          ], 2),
          !unref(isRtl) ? (openBlock(), createElementBlock("div", _hoisted_7, [
            renderSlot(_ctx.$slots, "pre-info"),
            !__props.hideInfo ? (openBlock(), createBlock(_sfc_main$2, {
              key: 0,
              onClick: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("info"))
            })) : createCommentVNode("", true),
            renderSlot(_ctx.$slots, "pre-close"),
            __props.showClose ? (openBlock(), createBlock(_sfc_main$1, {
              key: 1,
              onClick: _cache[4] || (_cache[4] = ($event) => _ctx.$emit("close"))
            })) : createCommentVNode("", true),
            renderSlot(_ctx.$slots, "info")
          ])) : (openBlock(), createElementBlock("div", _hoisted_8, [
            renderSlot(_ctx.$slots, "icon"),
            !__props.hideBack ? (openBlock(), createBlock(_sfc_main$3, {
              key: 0,
              "show-right": !__props.showRight,
              onClick: _cache[5] || (_cache[5] = ($event) => _ctx.$emit("back"))
            }, null, 8, ["show-right"])) : createCommentVNode("", true)
          ]))
        ])
      ]);
    };
  }
});

export { IconArrowRight01 as I, _sfc_main as _, _sfc_main$1 as a };
