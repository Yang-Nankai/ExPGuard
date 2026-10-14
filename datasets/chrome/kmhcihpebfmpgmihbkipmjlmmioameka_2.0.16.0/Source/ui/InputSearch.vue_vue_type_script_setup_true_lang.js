import { d as defineComponent, ab as mergeModels, ac as useModel, e as ref, c as createBlock, o as openBlock, z as resolveComponent, y as withCtx, n as createVNode, p as createBaseVNode, aO as withKeys, m as createElementBlock, t as createCommentVNode, U as withModifiers } from './index.js';
import { g as getRandomId } from './epochParams.js';
import { I as IconCancel01 } from './IconCancel01.js';
import { I as IconSearch01 } from './IconSearch01.js';

const _hoisted_1 = { class: "absolute top-1.5 right-2 flex flex-row et-jc-ic" };
const _hoisted_2 = {
  key: 0,
  class: "pi pi-spin pi-spinner"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "InputSearch",
  props: /* @__PURE__ */ mergeModels({
    placeholder: { type: String, required: true, default: "" },
    showSpinner: { type: Boolean, required: false, default: false },
    autofocus: { type: Boolean, required: false, default: false }
  }, {
    "input": { type: String, required: false, default: "" },
    "inputModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["enter"], ["update:input"]),
  setup(__props, { expose: __expose }) {
    const id = getRandomId();
    const input = useModel(
      __props,
      "input"
    );
    const inputId = ref(`inputField-${id}`);
    const inputField = ref(null);
    const doFocus = () => {
      const inputField2 = document.getElementById(inputId.value);
      inputField2?.focus();
    };
    __expose({ doFocus });
    return (_ctx, _cache) => {
      const _component_InputText = resolveComponent("InputText");
      const _component_IconField = resolveComponent("IconField");
      const _component_Button = resolveComponent("Button");
      const _component_InputGroup = resolveComponent("InputGroup");
      return openBlock(), createBlock(_component_InputGroup, { class: "relative" }, {
        default: withCtx(() => [
          createVNode(_component_IconField, { class: "search-field relative w-full" }, {
            default: withCtx(() => [
              createVNode(IconSearch01, { class: "absolute ml-1.5 mt-2.5 w-4 h-4 text-txt-muted" }),
              createVNode(_component_InputText, {
                ref_key: "inputField",
                ref: inputField,
                id: inputId.value,
                modelValue: input.value,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => input.value = $event),
                placeholder: __props.placeholder,
                class: "w-full h-full pl-8 pr-9 rounded-none",
                pt: {
                  root: "bg-transparent border-t-0 border-x-0 z-0! text-md"
                },
                autofocus: __props.autofocus,
                onKeydown: _cache[1] || (_cache[1] = withKeys(($event) => _ctx.$emit("enter", true), ["enter"]))
              }, null, 8, ["id", "modelValue", "placeholder", "autofocus"])
            ]),
            _: 1
          }),
          createBaseVNode("div", _hoisted_1, [
            __props.showSpinner ? (openBlock(), createElementBlock("i", _hoisted_2)) : createCommentVNode("", true),
            createVNode(_component_Button, {
              severity: "secondary",
              class: "w-6 h-6 p-0! rounded-sm bg-transparent border-0",
              onClick: _cache[2] || (_cache[2] = withModifiers(($event) => input.value = "", ["stop", "prevent"]))
            }, {
              icon: withCtx(() => [
                createVNode(IconCancel01, { class: "w-5 sm:w-6" })
              ]),
              _: 1
            })
          ])
        ]),
        _: 1
      });
    };
  }
});

export { _sfc_main as _ };
