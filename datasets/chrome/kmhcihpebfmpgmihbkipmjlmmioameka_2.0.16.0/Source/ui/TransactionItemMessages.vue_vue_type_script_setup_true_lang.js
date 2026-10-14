import { D as DEFAULT_MSG_PASSWORD, d as decryptMessage } from './messageEncryption.js';
import { d as delDecryptedMsg, s as saveDecryptedMsg, a as decryptedMsgMap } from './decryptedMsg.js';
import { e as ref, D as computed, G as watch, m as createElementBlock, o as openBlock, v as createStaticVNode, d as defineComponent, w as useTranslation, t as createCommentVNode, u as unref, p as createBaseVNode, B as toDisplayString, a1 as withDirectives, a2 as resolveDirective, c as createBlock, y as withCtx, U as withModifiers, V as normalizeClass, H as createTextVNode, n as createVNode, F as Fragment, S as renderList, z as resolveComponent } from './index.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper.js';
import { u as useNotifications } from './useNotification.js';
import { I as IconSquareLock02, a as IconSquareUnlock02 } from './IconSquareUnlock02.js';

const useTxMessage = (txBalance) => {
  const isCommentsEnc = ref(false);
  const encType = ref("");
  const encMessage = ref("");
  const messageList = ref([]);
  const hasMessages = computed(() => messageList.value.length > 0 || encMessage.value.length > 0);
  const numMessages = computed(() => messageList.value.length);
  const hasMoreMessages = computed(() => messageList.value.length > 4);
  const messageListHeader = computed(() => messageList.value.length > 4 ? messageList.value.slice(0, 2) : messageList.value.concat());
  const doShowModalDecryptTxMessage = ref(false);
  const _getMessage = () => {
    isCommentsEnc.value = false;
    encMessage.value = "";
    encType.value = "";
    const msg = txBalance.value?.msg;
    const enc = txBalance.value?.enc;
    if (!txBalance.value) {
      return [];
    }
    if (!msg || msg.length === 0) {
      return [];
    }
    if (!enc || enc === "plain") {
      return msg.concat();
    }
    isCommentsEnc.value = true;
    const decryptedMsg = txBalance.value.hash ? decryptedMsgMap.value.get(txBalance.value.hash) : null;
    if (decryptedMsg) {
      return [...decryptedMsg];
    } else {
      encMessage.value = msg.join("");
      encType.value = enc;
      return [];
    }
  };
  const updateMessageList = () => {
    messageList.value = _getMessage();
  };
  const _decryptMsg = async (password) => {
    if (!txBalance.value) {
      return;
    }
    return decryptMessage(encMessage.value, password, encType.value).then((decrypted) => {
      if (Array.isArray(decrypted)) {
        messageList.value = decrypted.concat();
        if (!txBalance.value) {
          return;
        }
        saveDecryptedMsg(txBalance.value.hash, decrypted);
      }
      return;
    });
  };
  const doDecryptTxMessage = async () => {
    doShowModalDecryptTxMessage.value = false;
    if (isCommentsEnc.value) {
      if (messageList.value.length === 0) {
        try {
          await _decryptMsg(DEFAULT_MSG_PASSWORD);
        } catch (e) {
          doShowModalDecryptTxMessage.value = true;
        }
      } else {
        if (!txBalance.value) {
          return;
        }
        await delDecryptedMsg(txBalance.value.hash);
        messageList.value = _getMessage();
      }
    }
  };
  const onDecryptTxMessage = (password) => {
    doShowModalDecryptTxMessage.value = false;
    return _decryptMsg(password);
  };
  watch(txBalance, updateMessageList, { immediate: true, deep: true });
  const messageInput = ref("");
  const messageInputError = ref("");
  const doEncryptMessage = ref(false);
  const messagePassword = ref("");
  const messagePasswordDefault = ref("cardano");
  const messagePasswordError = ref("");
  const resetMessageInputs = (resetPassword = true) => {
    messageInput.value = "";
    messageInputError.value = "";
    if (resetPassword) {
      messagePassword.value = "";
      messagePasswordError.value = "";
      doEncryptMessage.value = false;
    }
    messageList.value = [];
  };
  return {
    isCommentsEnc,
    encType,
    encMessage,
    messageList,
    messageListHeader,
    hasMessages,
    numMessages,
    hasMoreMessages,
    doShowModalDecryptTxMessage,
    messageInput,
    messageInputError,
    doEncryptMessage,
    messagePassword,
    messagePasswordDefault,
    messagePasswordError,
    resetMessageInputs,
    doDecryptTxMessage,
    onDecryptTxMessage
  };
};

const _sfc_main$3 = {  };

const _hoisted_1$3 = {
  width: "100%",
  viewBox: "0 0 17 17",
  fill: "none",
  stroke: "currentColor",
  xmlns: "http://www.w3.org/2000/svg"
};

function _sfc_render$2(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$3, [...(_cache[0] || (_cache[0] = [
    createStaticVNode("<g clip-path=\"url(#clip0_4797_44809)\"><path d=\"M7.59286 3.05313L12.9101 3.05313L13.0309 8.49119\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path><path d=\"M1.70248 14.3359L12.7833 3.25509\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></g><defs><clipPath id=\"clip0_4797_44809\"><rect width=\"16\" height=\"16\" fill=\"white\" transform=\"translate(0.0292969 0.03125)\"></rect></clipPath></defs>", 2)
  ]))]))
}
const IconArrowRT = /*#__PURE__*/_export_sfc(_sfc_main$3, [['render',_sfc_render$2]]);

const _show = ref(false);
const _password = ref("");
const _callback = ref(null);
const openModalDecryptTxMessage = (cb) => {
  _callback.value = cb;
  _show.value = true;
};
const closeModalDecryptTxMessage = (canceled) => {
  _show.value = false;
  if (_callback.value) {
    _callback.value(canceled);
  }
};
const clearPassword = () => {
  _password.value = "";
};
const getPassword = () => {
  return _password.value;
};
const setPassword = (pwd) => {
  _password.value = pwd;
};
const useModalDecryptTxMessage = () => {
  return {
    showModalDecryptTxMessage: _show,
    openModalDecryptTxMessage,
    closeModalDecryptTxMessage,
    clearPassword,
    setPassword,
    getPassword
  };
};

const _sfc_main$2 = {  };

const _hoisted_1$2 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none"
};

function _sfc_render$1(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$2, [...(_cache[0] || (_cache[0] = [
    createStaticVNode("<path d=\"M11 6L21 6\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\"></path><path d=\"M11 12L21 12\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\"></path><path d=\"M11 18L21 18\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\"></path><path d=\"M3 7.39286C3 7.39286 4 8.04466 4.5 9C4.5 9 6 5.25 8 4\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path><path d=\"M3 18.3929C3 18.3929 4 19.0447 4.5 20C4.5 20 6 16.25 8 15\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>", 5)
  ]))]))
}
const IconCheckList = /*#__PURE__*/_export_sfc(_sfc_main$2, [['render',_sfc_render$1]]);

const _sfc_main$1 = {  };

const _hoisted_1$1 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none"
};

function _sfc_render(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$1, [...(_cache[0] || (_cache[0] = [
    createStaticVNode("<path d=\"M8 5L20 5\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\"></path><path d=\"M4 5H4.00898\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path><path d=\"M4 12H4.00898\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path><path d=\"M4 19H4.00898\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path><path d=\"M8 12L20 12\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\"></path><path d=\"M8 19L20 19\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\"></path>", 6)
  ]))]))
}
const IconLeftToRightListBullet = /*#__PURE__*/_export_sfc(_sfc_main$1, [['render',_sfc_render]]);

const _hoisted_1 = {
  key: 0,
  class: "flex flex-col et-gap-xs et-text-base"
};
const _hoisted_2 = {
  key: 0,
  class: "flex flex-row et-js-ic et-gap-xs"
};
const _hoisted_3 = { class: "cap-first font-semibold" };
const _hoisted_4 = { class: "h-0 flex flex-row et-js-ic" };
const _hoisted_5 = {
  key: 0,
  class: "inline"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TransactionItemMessages",
  props: {
    txMessages: { type: Object, required: true },
    cssText: { type: String, default: "" },
    isCompact: { type: Boolean, default: false },
    fontSize: { type: String, default: "et-text-sm" },
    showAllMessages: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const $t = useTranslation().t;
    const localShowAllMessages = ref(props.showAllMessages);
    const { showError } = useNotifications();
    const {
      isCommentsEnc,
      hasMessages,
      numMessages,
      hasMoreMessages,
      messageList,
      messageListHeader,
      doShowModalDecryptTxMessage,
      doDecryptTxMessage,
      onDecryptTxMessage
    } = props.txMessages;
    const {
      getPassword,
      clearPassword,
      openModalDecryptTxMessage
    } = useModalDecryptTxMessage();
    const list = computed(() => localShowAllMessages.value ? messageList.value : messageListHeader.value);
    watch(doShowModalDecryptTxMessage, (value) => {
      if (value) {
        clearPassword();
        openModalDecryptTxMessage(onCloseModalDecryptTxMessage);
      }
    });
    const onCloseModalDecryptTxMessage = (canceled) => {
      if (canceled) {
        return;
      }
      onDecryptTxMessage(getPassword()).catch((err) => {
        showError($t("common:message.encrypted.error"));
      });
      clearPassword();
    };
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _directive_tooltip = resolveDirective("tooltip");
      return unref(hasMessages) ? (openBlock(), createElementBlock("div", _hoisted_1, [
        !__props.isCompact ? (openBlock(), createElementBlock("div", _hoisted_2, [
          createBaseVNode("span", _hoisted_3, toDisplayString(unref($t)("common:message.label")), 1),
          createBaseVNode("div", _hoisted_4, [
            !__props.showAllMessages && unref(hasMoreMessages) ? withDirectives((openBlock(), createBlock(_component_Button, {
              key: 0,
              class: "w-7 h-7 p-0.5",
              severity: "secondary",
              size: "small",
              rounded: "",
              text: "",
              "aria-label": !localShowAllMessages.value ? "expand message" : "collapse message",
              onClick: _cache[0] || (_cache[0] = withModifiers(($event) => localShowAllMessages.value = !localShowAllMessages.value, ["stop", "prevent"]))
            }, {
              icon: withCtx(() => [
                localShowAllMessages.value ? (openBlock(), createBlock(IconCheckList, {
                  key: 0,
                  class: "w-5 h-5"
                })) : (openBlock(), createBlock(IconLeftToRightListBullet, {
                  key: 1,
                  class: "w-5 h-5"
                }))
              ]),
              _: 1
            }, 8, ["aria-label"])), [
              [_directive_tooltip, !localShowAllMessages.value ? "expand message" : "collapse message"]
            ]) : createCommentVNode("", true)
          ])
        ])) : createCommentVNode("", true),
        unref(numMessages) === 0 ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(["flex flex-row et-js-ic et-gap-xs italic text-left", __props.cssText])
        }, [
          createTextVNode(toDisplayString(unref($t)("common:message.encrypted.label")) + " ", 1),
          unref(isCommentsEnc) && unref(numMessages) === 0 ? withDirectives((openBlock(), createBlock(_component_Button, {
            key: 0,
            class: "w-7 h-7 p-0.5",
            severity: "danger",
            rounded: "",
            text: "",
            "aria-label": "decrypt message",
            onClick: withModifiers(unref(doDecryptTxMessage), ["stop", "prevent"])
          }, {
            default: withCtx(() => [
              createVNode(IconSquareLock02, { class: "w-5 h-5" })
            ]),
            _: 1
          }, 8, ["onClick"])), [
            [_directive_tooltip, unref($t)("common:message.encrypted.tooltip")]
          ]) : createCommentVNode("", true)
        ], 2)) : createCommentVNode("", true),
        list.value.length > 0 ? (openBlock(), createElementBlock("div", {
          key: 2,
          class: normalizeClass(["flex flex-row et-js-ic et-gap-xs", __props.fontSize])
        }, [
          createBaseVNode("div", {
            class: normalizeClass(["flex flex-col break-all text-left", __props.cssText])
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(list.value, (msg, index) => {
              return openBlock(), createElementBlock("div", {
                class: "inline",
                key: msg + index
              }, toDisplayString(msg), 1);
            }), 128)),
            !localShowAllMessages.value && unref(hasMoreMessages) ? (openBlock(), createElementBlock("div", _hoisted_5, "...")) : createCommentVNode("", true)
          ], 2),
          unref(isCommentsEnc) && unref(numMessages) > 0 ? withDirectives((openBlock(), createBlock(_component_Button, {
            key: 0,
            class: "w-7 h-7 p-0.5",
            severity: "success",
            rounded: "",
            text: "",
            "aria-label": "hide message",
            onClick: withModifiers(unref(doDecryptTxMessage), ["stop", "prevent"])
          }, {
            icon: withCtx(() => [
              createVNode(IconSquareUnlock02, { class: "w-5 h-5" })
            ]),
            _: 1
          }, 8, ["onClick"])), [
            [_directive_tooltip, "hide message"]
          ]) : createCommentVNode("", true)
        ], 2)) : createCommentVNode("", true)
      ])) : createCommentVNode("", true);
    };
  }
});

export { IconArrowRT as I, _sfc_main as _, useModalDecryptTxMessage as a, useTxMessage as u };
