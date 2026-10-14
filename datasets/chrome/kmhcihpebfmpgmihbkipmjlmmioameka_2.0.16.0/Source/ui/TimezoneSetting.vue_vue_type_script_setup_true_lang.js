import { b as appTimezone, d as appUseUtc, s as setUseUtc, e as setAppTimezone } from './language.js';
import { d as defineComponent, ac as useModel, m as createElementBlock, o as openBlock, p as createBaseVNode, n as createVNode, B as toDisplayString, z as resolveComponent, u as unref, c6 as supportedTimezones, ae as isRef, y as withCtx } from './index.js';

const _hoisted_1 = { class: "w-full flex flex-col et-js-is et-gap-sm" };
const _hoisted_2 = { class: "ml-6 font-semibold cap-first" };
const _hoisted_3 = { class: "w-full pl-4 text-left" };
const _hoisted_4 = { class: "w-full pl-6 text-left" };
const UTC = "UTC - Coordinated Universal Time";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TimezoneSetting",
  props: {
    "error": { type: String, required: false, default: "" },
    "errorModifiers": {}
  },
  emits: ["update:error"],
  setup(__props) {
    useModel(__props, "error");
    const onTimezoneChange = (tz) => {
      if (tz === UTC) {
        setUseUtc(true);
        setAppTimezone(UTC);
      } else {
        setUseUtc(false);
        setAppTimezone(tz);
      }
    };
    return (_ctx, _cache) => {
      const _component_Select = resolveComponent("Select");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, toDisplayString(_ctx.$t("settings-app:formatting.setting.timezone")), 1),
        createVNode(_component_Select, {
          modelValue: unref(appTimezone),
          "onUpdate:modelValue": [
            _cache[0] || (_cache[0] = ($event) => isRef(appTimezone) ? appTimezone.value = $event : null),
            onTimezoneChange
          ],
          options: unref(supportedTimezones).concat(UTC),
          class: "w-full",
          "filter-match-mode": "contains",
          filter: "",
          autoFilterFocus: "",
          resetFilterOnHide: ""
        }, {
          value: withCtx((slotProps) => [
            createBaseVNode("div", _hoisted_3, toDisplayString(unref(appUseUtc) ? UTC : slotProps.value), 1)
          ]),
          option: withCtx((slotProps) => [
            createBaseVNode("div", _hoisted_4, toDisplayString(slotProps.option), 1)
          ]),
          _: 1
        }, 8, ["modelValue", "options"])
      ]);
    };
  }
});

export { _sfc_main as _ };
