import { d as defineComponent, e as ref, D as computed, as as createJsonFromCborJson, m as createElementBlock, t as createCommentVNode, o as openBlock, c as createBlock, n as createVNode, z as resolveComponent, U as withModifiers, y as withCtx, p as createBaseVNode, B as toDisplayString, aX as json, al as getErrorMsg } from './index.js';
import { d as decryptMessage } from './messageEncryption.js';
import { u as useNotifications } from './useNotification.js';
import { a as IconSquareUnlock02, I as IconSquareLock02 } from './IconSquareUnlock02.js';
import { _ as _sfc_main$1 } from './PasswordInput.vue_vue_type_script_setup_true_lang.js';

const _hoisted_1 = {
  key: 0,
  class: "flex et-jc-ic"
};
const _hoisted_2 = { class: "flex flex-col et-gap-md" };
const _hoisted_3 = { class: "flex flex-col et-gap-sm" };
const _hoisted_4 = { class: "" };
const _hoisted_5 = { class: "et-text-sm text-txt-muted break-all" };
const _hoisted_6 = { class: "flex flex-row et-gap-sm et-je" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MultiSigDecryptMetadata",
  props: {
    metadataString: { type: String, required: false },
    metadataObject: { type: Object, required: false },
    canReEncrypt: { type: Boolean, required: false, default: true }
  },
  emits: ["decrypt", "encrypt"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { showError } = useNotifications();
    const isDecrypted = ref(false);
    const password = ref("");
    const popover = ref();
    const metadataJson = computed(() => {
      if (props.metadataObject) {
        return props.metadataObject;
      } else if (props.metadataString) {
        try {
          const _json = {};
          createJsonFromCborJson(JSON.parse(props.metadataString), _json, void 0, false);
          return _json;
        } catch (e) {
        }
      }
      return null;
    });
    const isEncryptedMultiSigMeta = computed(() => metadataJson.value?.enc === "basic");
    const onShowPopover = (event) => {
      popover.value?.toggle(event);
    };
    const decryptValue = async (value) => {
      return (await decryptMessage(Array.isArray(value) ? value.join("") : value, password.value))[0];
    };
    const onDecryptMultiSigMeta = async () => {
      if (!metadataJson.value || password.value.length === 0) {
        return;
      }
      const meta = json(metadataJson.value);
      try {
        if (meta.name) {
          meta.name = await decryptValue(meta.name);
        }
        if (meta.description) {
          meta.description = await decryptValue(meta.description);
        }
        if (meta.icon) {
          meta.icon = await decryptValue(meta.icon);
        }
        if (meta.participants) {
          for (const cred in meta.participants) {
            const participant = meta.participants[cred];
            if (participant.name.length > 0) {
              participant.name = await decryptValue(participant.name);
            }
            if (participant.description) {
              participant.description = await decryptValue(participant.description);
            }
            if (participant.icon) {
              participant.icon = await decryptValue(participant.icon);
            }
          }
        }
        isDecrypted.value = true;
        emit("decrypt", meta);
      } catch (e) {
        showError(getErrorMsg(e));
      }
      password.value = "";
      popover.value?.hide();
    };
    const onResetMeta = () => {
      emit("encrypt", metadataJson.value);
      isDecrypted.value = false;
    };
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_Popover = resolveComponent("Popover");
      return isEncryptedMultiSigMeta.value ? (openBlock(), createElementBlock("div", _hoisted_1, [
        isDecrypted.value ? (openBlock(), createBlock(_component_Button, {
          key: 0,
          class: "p-0",
          disabled: !__props.canReEncrypt,
          link: "",
          onClick: withModifiers(onResetMeta, ["stop", "prevent"])
        }, {
          default: withCtx(() => [
            createVNode(IconSquareUnlock02, { class: "size-5" })
          ]),
          _: 1
        }, 8, ["disabled"])) : (openBlock(), createBlock(_component_Button, {
          key: 1,
          class: "p-0",
          link: "",
          onClick: withModifiers(onShowPopover, ["stop", "prevent"])
        }, {
          default: withCtx(() => [
            createVNode(IconSquareLock02, { class: "size-5 text-txt-positive" })
          ]),
          _: 1
        })),
        createVNode(_component_Popover, {
          ref_key: "popover",
          ref: popover
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_2, [
              createBaseVNode("div", _hoisted_3, [
                createBaseVNode("div", _hoisted_4, toDisplayString(_ctx.$t("wallet-multiSig:decrypt.popover.headline")), 1),
                createBaseVNode("div", _hoisted_5, toDisplayString(_ctx.$t("wallet-multiSig:decrypt.popover.caption")), 1)
              ]),
              createVNode(_sfc_main$1, {
                input: password.value,
                "onUpdate:input": _cache[0] || (_cache[0] = ($event) => password.value = $event),
                autofocus: "",
                "skip-validation": "",
                meter: false,
                placeholder: "",
                onEnter: onDecryptMultiSigMeta
              }, null, 8, ["input"]),
              createBaseVNode("div", _hoisted_6, [
                createVNode(_component_Button, {
                  label: _ctx.$t("common:confirm"),
                  disabled: password.value.length === 0,
                  rounded: "",
                  onClick: withModifiers(onDecryptMultiSigMeta, ["stop", "prevent"])
                }, null, 8, ["label", "disabled"])
              ])
            ])
          ]),
          _: 1
        }, 512)
      ])) : createCommentVNode("", true);
    };
  }
});

export { _sfc_main as _ };
