import { u as useNavigation } from './useNavigation.js';
import { e as ref, d as defineComponent, w as useTranslation, x as useScreenSize, I as useBiometrics, f as onMounted, c as createBlock, t as createCommentVNode, u as unref, K as getSetupCompleted, o as openBlock, y as withCtx, p as createBaseVNode, n as createVNode, m as createElementBlock, z as resolveComponent } from './index.js';
import { _ as _sfc_main$3 } from './PINLogin.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$2 } from './Modal.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$4 } from './ModalHeader.vue_vue_type_script_setup_true_lang.js';
import { M as ModalContentCard } from './ModalContentCard.js';
import './epochParams.js';
import './NetworkId.js';
import './send.js';
import './useResetScroll.js';
import './IconCheckmarkCircle02.js';
import './_plugin-vue_export-helper.js';
import './ButtonOutline.vue_vue_type_script_setup_true_lang.js';
import './PasswordInput.vue_vue_type_script_setup_true_lang.js';
import './useSelectedAccount.js';
import './app2.js';
import './bigmath.js';
import './useAppAccountBalances.js';
import './useBiometricsAction.js';
import './IconAlert02.js';
import './IconPencil.js';
import './index2.js';
import './IconInformationCircle.js';
import './IconCancel01.js';

const _show = ref(false);
const openModalLogin = () => {
  _show.value = true;
};
const closeModalLogin = () => {
  _show.value = false;
};
const useModalLogin = () => {
  return {
    showModalLogin: _show,
    openModalLogin,
    closeModalLogin
  };
};

const _hoisted_1 = {
  key: 1,
  class: "w-full flex flex-col et-gap-sm"
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ModalLogin",
  emits: ["back", "preClose"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const $t = useTranslation().t;
    const { gotoPage } = useNavigation();
    const { isSmallerThanSM } = useScreenSize();
    const {
      showModalLogin,
      openModalLogin
    } = useModalLogin();
    const {
      isAvailable,
      isBiometricsEnabled,
      auth
    } = useBiometrics();
    const pinConfirmed = ref(false);
    const tryCount = ref(0);
    const forcePinInput = ref(false);
    const showModal = ref(!isAvailable.value || isAvailable.value && !isBiometricsEnabled.value || forcePinInput.value);
    const onClose = () => {
      if (pinConfirmed.value) {
        gotoPage("PageAccountOverview");
      } else {
        emit("back");
      }
    };
    const forceShowPin = () => {
      forcePinInput.value = true;
    };
    const doAuth = async () => {
      tryCount.value++;
      const authResult = await auth();
      if (authResult) {
        pinConfirmed.value = true;
        onClose();
      } else {
        showModal.value = true;
        if (tryCount.value > 1) {
          forcePinInput.value = true;
        }
      }
    };
    onMounted(() => {
      pinConfirmed.value = false;
      openModalLogin();
      if (isBiometricsEnabled.value) {
        setTimeout(async () => {
          doAuth();
        }, 50);
      }
    });
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      return unref(showModalLogin) && unref(getSetupCompleted)() ? (openBlock(), createBlock(_sfc_main$2, {
        key: 0,
        "attach-to-bottom": unref(isSmallerThanSM),
        persistent: "",
        narrow: "",
        "full-width-on-mobile": "",
        "show-invisible": !showModal.value,
        onClose
      }, {
        header: withCtx(({ handleClose }) => [
          createVNode(_sfc_main$4, {
            headline: unref($t)("pin:access.title"),
            caption: unref($t)("pin:access.caption"),
            "hide-back": true,
            "hide-info": true,
            "show-close": true,
            onClose: ($event) => handleClose()
          }, null, 8, ["headline", "caption", "onClose"])
        ]),
        content: withCtx(({ handleClose }) => [
          createVNode(ModalContentCard, null, {
            default: withCtx(() => [
              !unref(isAvailable) || unref(isAvailable) && !unref(isBiometricsEnabled) || forcePinInput.value ? (openBlock(), createBlock(_sfc_main$3, {
                key: 0,
                pinConfirmed: pinConfirmed.value,
                "onUpdate:pinConfirmed": _cache[0] || (_cache[0] = ($event) => pinConfirmed.value = $event),
                "button-teleport": "#modalSetupSettingsFooter",
                autofocus: "",
                onPinConfirmed: _cache[1] || (_cache[1] = ($event) => onClose())
              }, null, 8, ["pinConfirmed"])) : (openBlock(), createElementBlock("div", _hoisted_1, [
                createVNode(_component_Button, {
                  label: unref($t)("pin:biometrics.login"),
                  severity: "secondary",
                  rounded: "",
                  outlined: "",
                  onClick: _cache[2] || (_cache[2] = ($event) => doAuth())
                }, null, 8, ["label"]),
                tryCount.value > 0 ? (openBlock(), createBlock(_component_Button, {
                  key: 0,
                  label: unref($t)("pin:biometrics.fallback"),
                  severity: "secondary",
                  rounded: "",
                  outlined: "",
                  onClick: forceShowPin
                }, null, 8, ["label"])) : createCommentVNode("", true)
              ]))
            ]),
            _: 1
          })
        ]),
        footer: withCtx(() => [..._cache[3] || (_cache[3] = [
          createBaseVNode("div", { class: "w-full flex flex-wrap et-je et-gap-sm" }, [
            createBaseVNode("div", {
              class: "grow flex flex-wrap et-gap-sm",
              id: "modalSetupSettingsFooter"
            })
          ], -1)
        ])]),
        _: 1
      }, 8, ["attach-to-bottom", "show-invisible"])) : createCommentVNode("", true);
    };
  }
});

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Login",
  setup(__props) {
    const { gotoWelcome } = useNavigation();
    const step = ref(0);
    const onBack = () => {
      if (step.value === 0) {
        gotoWelcome();
      } else {
        step.value--;
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$1, {
        onBack: _cache[0] || (_cache[0] = ($event) => onBack())
      });
    };
  }
});

export { _sfc_main as default };
