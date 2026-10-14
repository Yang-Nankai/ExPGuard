import { d as defineComponent, ac as useModel, c as createBlock, o as openBlock, z as resolveComponent } from './index.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Toggle",
  props: {
    "modelValue": { type: Boolean, required: true },
    "modelModifiers": {}
  },
  emits: ["update:modelValue"],
  setup(__props) {
    const model = useModel(__props, "modelValue");
    return (_ctx, _cache) => {
      const _component_ToggleSwitch = resolveComponent("ToggleSwitch");
      return openBlock(), createBlock(_component_ToggleSwitch, {
        class: "shrink-0 grow-0",
        modelValue: model.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => model.value = $event)
      }, null, 8, ["modelValue"]);
    };
  }
});

export { _sfc_main as _ };
