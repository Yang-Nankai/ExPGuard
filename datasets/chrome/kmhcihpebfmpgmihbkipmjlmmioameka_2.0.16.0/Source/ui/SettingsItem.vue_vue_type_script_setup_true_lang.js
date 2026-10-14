import { d as defineComponent, e as ref, G as watch, c as createBlock, o as openBlock, V as normalizeClass, y as withCtx, p as createBaseVNode, m as createElementBlock, t as createCommentVNode, B as toDisplayString, U as withModifiers, a0 as renderSlot } from './index.js';
import { _ as _sfc_main$2 } from './Toggle.vue_vue_type_script_setup_true_lang.js';
import { I as IconArrowRight01 } from './ModalHeader.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$1 } from './ButtonOutline.vue_vue_type_script_setup_true_lang.js';

const _hoisted_1 = { class: "flex flex-row et-js-ic et-gap-sm" };
const _hoisted_2 = { class: "flex flex-col et-js-is et-gap-sm" };
const _hoisted_3 = { class: "" };
const _hoisted_4 = {
  key: 0,
  class: ""
};
const _hoisted_5 = {
  key: 1,
  class: "min-w-10 flex et-je"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SettingsItem",
  props: {
    label: { type: String, required: true, default: "Please add a label" },
    description: { type: String, required: false },
    isToggle: { type: Boolean, required: false, default: false },
    settingEnabled: { type: Boolean, required: false, default: void 0 },
    active: { type: Boolean, required: false, default: false }
  },
  emits: ["toggle"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const toggleValue = ref(props.settingEnabled ?? false);
    const emit = __emit;
    watch(() => props.settingEnabled, (newValue) => {
      if (newValue !== toggleValue.value) {
        toggleValue.value = newValue ?? false;
      }
    });
    const onClick = () => {
      toggleValue.value = !toggleValue.value;
      emit("toggle", toggleValue.value);
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$1, {
        class: normalizeClass(["w-full pl-4! pr-2! py-2! flex flex-row et-jb-ic", __props.active ? "border-border-highlight" : ""])
      }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1, [
            createBaseVNode("div", _hoisted_2, [
              createBaseVNode("span", _hoisted_3, toDisplayString(__props.label), 1),
              __props.description ? (openBlock(), createElementBlock("span", _hoisted_4, toDisplayString(__props.description), 1)) : createCommentVNode("", true)
            ])
          ]),
          __props.isToggle ? (openBlock(), createBlock(_sfc_main$2, {
            key: 0,
            class: "mt-0.5",
            modelValue: toggleValue.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => toggleValue.value = $event),
            pt: { slider: toggleValue.value ? "et-bg-highlight et-bg-highlight-hover" : "" },
            onClick: withModifiers(onClick, ["stop", "prevent"])
          }, null, 8, ["modelValue", "pt"])) : _ctx.$slots.icon ? (openBlock(), createElementBlock("div", _hoisted_5, [
            renderSlot(_ctx.$slots, "icon")
          ])) : (openBlock(), createBlock(IconArrowRight01, {
            key: 2,
            class: "w-6 h-6"
          }))
        ]),
        _: 3
      }, 8, ["class"]);
    };
  }
});

export { _sfc_main as _ };
