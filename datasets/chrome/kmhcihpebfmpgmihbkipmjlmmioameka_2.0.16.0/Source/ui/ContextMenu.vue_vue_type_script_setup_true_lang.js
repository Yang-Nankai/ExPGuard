import { m as createElementBlock, o as openBlock, p as createBaseVNode, d as defineComponent, e as ref, D as computed, F as Fragment, c as createBlock, t as createCommentVNode, n as createVNode, z as resolveComponent, y as withCtx, U as withModifiers, W as resolveDynamicComponent, B as toDisplayString } from './index.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper.js';
import { a as IconEyeVisible } from './IconCopy01.js';

const _sfc_main$1 = {  };

const _hoisted_1$1 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
};

function _sfc_render(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$1, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      d: "M13.5 4.5C13.5 3.67157 12.8284 3 12 3C11.1716 3 10.5 3.67157 10.5 4.5C10.5 5.32843 11.1716 6 12 6C12.8284 6 13.5 5.32843 13.5 4.5Z",
      fill: "currentColor",
      stroke: "currentColor",
      "stroke-width": "1.5"
    }, null, -1),
    createBaseVNode("path", {
      d: "M13.5 12C13.5 11.1716 12.8284 10.5 12 10.5C11.1716 10.5 10.5 11.1716 10.5 12C10.5 12.8284 11.1716 13.5 12 13.5C12.8284 13.5 13.5 12.8284 13.5 12Z",
      fill: "currentColor",
      stroke: "currentColor",
      "stroke-width": "1.5"
    }, null, -1),
    createBaseVNode("path", {
      d: "M13.5 19.5C13.5 18.6716 12.8284 18 12 18C11.1716 18 10.5 18.6716 10.5 19.5C10.5 20.3284 11.1716 21 12 21C12.8284 21 13.5 20.3284 13.5 19.5Z",
      fill: "currentColor",
      stroke: "currentColor",
      "stroke-width": "1.5"
    }, null, -1)
  ]))]))
}
const IconDots = /*#__PURE__*/_export_sfc(_sfc_main$1, [['render',_sfc_render]]);

const _hoisted_1 = ["onClick"];
const _hoisted_2 = {
  key: 1,
  class: "ml-2 et-text-sm cap-first"
};
const _hoisted_3 = ["onClick"];
const _hoisted_4 = {
  key: 0,
  class: "ml-2 et-text-sm cap-first"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ContextMenu",
  props: {
    items: { type: Object, required: true, default: [] },
    showEyeIcon: { type: Boolean, required: false, default: false },
    hideButton: { type: Boolean, required: false, default: false }
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    const menu = ref();
    const visibleItems = computed(() => props.items.filter((i) => i.show !== false));
    const hasHighlightedItem = computed(() => {
      return visibleItems.value.some((i) => i.highlighted || i.isToggle && i.toggleRef && i.toggleRef.value);
    });
    const onShowMenu = (event) => {
      menu.value.toggle(event);
    };
    const doToggle = (event, item) => {
      if (event) {
        event.stopPropagation();
        event.preventDefault();
      }
      if (item.isToggle && item.toggleRef) {
        item.toggleRef.value = !item.toggleRef.value;
      }
    };
    __expose({ onShowMenu });
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_OverlayBadge = resolveComponent("OverlayBadge");
      const _component_Divider = resolveComponent("Divider");
      const _component_ToggleSwitch = resolveComponent("ToggleSwitch");
      const _component_ContextMenu = resolveComponent("ContextMenu", true);
      return openBlock(), createElementBlock(Fragment, null, [
        !__props.hideButton ? (openBlock(), createBlock(_component_OverlayBadge, {
          key: 0,
          class: "flex et-jc-ic",
          "pt:pcbadge:root:class": !hasHighlightedItem.value ? "hidden" : "mt-0.5 mr-0.5",
          severity: "primary"
        }, {
          default: withCtx(() => [
            createVNode(_component_Button, {
              ref: "btn",
              class: "shrink-0 p-1.5",
              severity: "secondary",
              rounded: "",
              outlined: "",
              onClick: withModifiers(onShowMenu, ["stop", "prevent"])
            }, {
              default: withCtx(() => [
                __props.showEyeIcon ? (openBlock(), createBlock(IconEyeVisible, {
                  key: 0,
                  class: "size-3 transition-all"
                })) : (openBlock(), createBlock(IconDots, {
                  key: 1,
                  class: "size-3 transition-all"
                }))
              ]),
              _: 1
            }, 512)
          ]),
          _: 1
        }, 8, ["pt:pcbadge:root:class"])) : createCommentVNode("", true),
        createVNode(_component_ContextMenu, {
          ref_key: "menu",
          ref: menu,
          pt: {
            root: "p-1"
          },
          model: visibleItems.value,
          items: visibleItems.value
        }, {
          item: withCtx(({ item }) => [
            item.divider ? (openBlock(), createBlock(_component_Divider, {
              key: 0,
              class: "my-1"
            })) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              !item.isToggle ? (openBlock(), createElementBlock("a", {
                key: 0,
                class: "pl-2 pr-3 py-2 flex et-js-ic et-gap-sm cursor-pointer",
                onClick: item.fn
              }, [
                item.icon ? (openBlock(), createBlock(_component_OverlayBadge, {
                  key: 0,
                  "pt:pcbadge:root:class": !item.highlighted ? "hidden" : "",
                  severity: "primary"
                }, {
                  default: withCtx(() => [
                    (openBlock(), createBlock(resolveDynamicComponent(item.icon), { class: "shrink-0 size-5" }))
                  ]),
                  _: 2
                }, 1032, ["pt:pcbadge:root:class"])) : createCommentVNode("", true),
                item.label ? (openBlock(), createElementBlock("span", _hoisted_2, toDisplayString(item.label), 1)) : createCommentVNode("", true)
              ], 8, _hoisted_1)) : (openBlock(), createElementBlock("a", {
                key: 1,
                class: "pl-2 pr-3 py-2 flex et-js-ic et-gap-sm cursor-pointer",
                onClick: ($event) => doToggle($event, item)
              }, [
                createVNode(_component_ToggleSwitch, {
                  modelValue: item.toggleRef,
                  "onUpdate:modelValue": ($event) => item.toggleRef = $event
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                item.label ? (openBlock(), createElementBlock("span", _hoisted_4, toDisplayString(item.label), 1)) : createCommentVNode("", true)
              ], 8, _hoisted_3))
            ], 64))
          ]),
          _: 1
        }, 8, ["model", "items"])
      ], 64);
    };
  }
});

export { _sfc_main as _ };
