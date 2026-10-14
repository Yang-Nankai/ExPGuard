import { d as defineComponent, w as useTranslation, e as ref, D as computed, m as createElementBlock, o as openBlock, p as createBaseVNode, c as createBlock, t as createCommentVNode, y as withCtx, a1 as withDirectives, a2 as resolveDirective, u as unref, z as resolveComponent, n as createVNode, B as toDisplayString, H as createTextVNode, U as withModifiers, G as watch, $ as createSlots, V as normalizeClass, aX as json, f as onMounted, aE as addSignalListener, b7 as onTxSubmitted, k as onUnmounted, aF as removeSignalListener, aV as now, b8 as onBuiltTxMultiSigReg, aC as dispatchSignal, b9 as doBuildTxMultiSigReg, x as useScreenSize, al as getErrorMsg, P as networkId } from './index.js';
import { O as cslToJson, s as safeFreeCSLObject, E as ErrorBuildTx, af as updateAccountScriptMeta, ag as saveWallet, ah as multisigPath, ai as chain, aj as getNativeScriptCredFromHex } from './app2.js';
import { I as IconCopy02, u as useModalMultiSigFlow, a as useModalMultiSigWallet, b as IconFileDownload, c as IconBlockChain, d as useModalMultiSigEncrypt, _ as _sfc_main$7, e as createIUIMultiSigParticipant } from './MultiSigWalletFlow.vue_vue_type_script_setup_true_lang.js';
import { s as syncMultiSigMeta } from './multisig.js';
import { u as useSelectedAccount } from './useSelectedAccount.js';
import { b as getNativeScriptJSONFromHex, c as getAllVkeysFromNativeScriptList, d as checkScriptHasTimeLock, j as joinMetaDataValue, e as generateScriptAuxData, f as createOfflineRegistrationData, h as generateScriptMeta, i as getIScriptMetaFromCbor } from './creds.js';
import { u as useNotifications } from './useNotification.js';
import { _ as _sfc_main$6 } from './PageHeader.vue_vue_type_script_setup_true_lang.js';
import { I as IconUserGroup, a as IconClock, b as IconMultiSig } from './IconUserGroup.js';
import { _ as _sfc_main$4 } from './MultiSigDecryptMetadata.vue_vue_type_script_setup_true_lang.js';
import { I as IconPencil } from './IconPencil.js';
import { _ as _sfc_main$5 } from './BannerNeutral.vue_vue_type_script_setup_true_lang.js';
import { b as getMetadataFromJSON } from './metadata.js';
import { g as getTxBuiltErrorMsg } from './error.js';
import { u as useAdaSymbol } from './useAdaSymbol.js';
import { u as useDownload } from './useDownload.js';
import { F as FxAnnouncementPageDark } from './FxAnnouncementPageDark.js';
import './NetworkId.js';
import './bigmath.js';
import './epochParams.js';
import './_plugin-vue_export-helper.js';
import './TabsToSelect.vue_vue_type_script_setup_true_lang.js';
import './IconCheckmarkCircle02.js';
import './IconAlert02.js';
import './useFormatter.js';
import './language.js';
import './chain.js';
import './IconEpochTimer.js';
import './IconInformationCircle.js';
import './useAppAccountBalances.js';
import './ErrorSignTx.js';
import './notification.js';
import './messageEncryption.js';
import './IconSquareUnlock02.js';
import './PasswordInput.vue_vue_type_script_setup_true_lang.js';
import './useBiometricsAction.js';
import './ErrorSubmitTx.js';
import './index2.js';
import './DrawSVGPlugin.js';

const _hoisted_1$3 = { class: "flex flex-nowrap et-jb-ic et-gap-md mt-1.5" };
const _hoisted_2$3 = { class: "flex flex-wrap et-js-ic et-gap-sm" };
const _hoisted_3$3 = { class: "whitespace-nowrap" };
const _hoisted_4$3 = { class: "whitespace-nowrap" };
const _hoisted_5$2 = { class: "whitespace-nowrap" };
const _hoisted_6$2 = { class: "flex flex-wrap et-je-ic et-gap-sm" };
const _hoisted_7$2 = { class: "whitespace-nowrap" };
const _hoisted_8$2 = { class: "whitespace-nowrap" };
const _hoisted_9$1 = { class: "whitespace-nowrap" };
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "MultiSigInfoCard",
  props: {
    isRegistered: { type: Boolean, required: false, default: void 0 },
    hasUpdatedMeta: { type: Boolean, required: false, default: void 0 },
    isEncrypted: { type: Boolean, required: false, default: false },
    registeredMeta: { type: Object, required: false }
  },
  emits: ["loadOnChainMeta", "decrypt"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const $t = useTranslation().t;
    const { accountData } = useSelectedAccount();
    const isDecrypted = ref(false);
    const paymentScript = computed(() => accountData.value?.account.paymentScript ? getNativeScriptJSONFromHex(accountData.value?.account.paymentScript) : null);
    const stakeScript = computed(() => accountData.value?.account.stakeScript ? getNativeScriptJSONFromHex(accountData.value?.account.stakeScript) : null);
    const drepScript = computed(() => accountData.value?.account.drepScript ? getNativeScriptJSONFromHex(accountData.value?.account.drepScript) : null);
    const payParticipants = computed(() => paymentScript.value ? new Set(getAllVkeysFromNativeScriptList([paymentScript.value])).size : 0);
    const stakeParticipants = computed(() => stakeScript.value ? new Set(getAllVkeysFromNativeScriptList([stakeScript.value])).size : 0);
    const drepParticipants = computed(() => drepScript.value ? new Set(getAllVkeysFromNativeScriptList([drepScript.value])).size : 0);
    const payHasTimeLock = computed(() => paymentScript.value ? checkScriptHasTimeLock([paymentScript.value]) : false);
    const stakeHasTimeLock = computed(() => stakeScript.value ? checkScriptHasTimeLock([stakeScript.value]) : false);
    const drepHasTimeLock = computed(() => drepScript.value ? checkScriptHasTimeLock([drepScript.value]) : false);
    const doLoadOnChainMeta = () => {
      emit("loadOnChainMeta");
    };
    const onMultiSigDecrypt = (_meta) => {
      delete _meta.enc;
      isDecrypted.value = true;
      emit("decrypt", _meta);
    };
    const onMultiSigEncrypt = (_meta) => {
      isDecrypted.value = false;
      emit("decrypt", null);
    };
    return (_ctx, _cache) => {
      const _component_OverlayBadge = resolveComponent("OverlayBadge");
      const _component_Chip = resolveComponent("Chip");
      const _component_Button = resolveComponent("Button");
      const _directive_tooltip = resolveDirective("tooltip");
      return openBlock(), createElementBlock("div", _hoisted_1$3, [
        createBaseVNode("div", _hoisted_2$3, [
          paymentScript.value ? (openBlock(), createBlock(_component_Chip, { key: 0 }, {
            default: withCtx(() => [
              createBaseVNode("span", _hoisted_3$3, toDisplayString(unref($t)("multisig-page:info-card.payment")), 1),
              createVNode(_component_OverlayBadge, {
                severity: "info",
                size: "small",
                value: payParticipants.value
              }, {
                default: withCtx(() => [
                  createVNode(IconUserGroup, { class: "w-6" })
                ]),
                _: 1
              }, 8, ["value"]),
              payHasTimeLock.value ? (openBlock(), createBlock(IconClock, {
                key: 0,
                class: "w-6"
              })) : createCommentVNode("", true)
            ]),
            _: 1
          })) : createCommentVNode("", true),
          stakeScript.value ? (openBlock(), createBlock(_component_Chip, { key: 1 }, {
            default: withCtx(() => [
              createBaseVNode("span", _hoisted_4$3, toDisplayString(unref($t)("multisig-page:info-card.stake")), 1),
              createVNode(_component_OverlayBadge, {
                severity: "info",
                size: "small",
                value: stakeParticipants.value
              }, {
                default: withCtx(() => [
                  createVNode(IconUserGroup, { class: "w-6" })
                ]),
                _: 1
              }, 8, ["value"]),
              stakeHasTimeLock.value ? (openBlock(), createBlock(IconClock, {
                key: 0,
                class: "w-6"
              })) : createCommentVNode("", true)
            ]),
            _: 1
          })) : createCommentVNode("", true),
          drepScript.value ? (openBlock(), createBlock(_component_Chip, { key: 2 }, {
            default: withCtx(() => [
              createBaseVNode("span", _hoisted_5$2, toDisplayString(unref($t)("multisig-page:info-card.drep")), 1),
              createVNode(_component_OverlayBadge, {
                severity: "info",
                size: "small",
                value: drepParticipants.value
              }, {
                default: withCtx(() => [
                  createVNode(IconUserGroup, { class: "w-6" })
                ]),
                _: 1
              }, 8, ["value"]),
              drepHasTimeLock.value ? (openBlock(), createBlock(IconClock, {
                key: 0,
                class: "w-6"
              })) : createCommentVNode("", true)
            ]),
            _: 1
          })) : createCommentVNode("", true)
        ]),
        createBaseVNode("div", _hoisted_6$2, [
          __props.isRegistered ? (openBlock(), createBlock(_component_Chip, {
            key: 0,
            class: "bg-bg-positive"
          }, {
            default: withCtx(() => [
              withDirectives((openBlock(), createElementBlock("span", _hoisted_7$2, [
                createTextVNode(toDisplayString(unref($t)("common:status.registered")), 1)
              ])), [
                [_directive_tooltip, unref($t)("multisig-page:info-card.tooltip.registered")]
              ]),
              __props.isEncrypted ? withDirectives((openBlock(), createBlock(_sfc_main$4, {
                key: 0,
                "metadata-object": __props.registeredMeta,
                onDecrypt: onMultiSigDecrypt,
                onEncrypt: onMultiSigEncrypt
              }, null, 8, ["metadata-object"])), [
                [_directive_tooltip, isDecrypted.value ? unref($t)("multisig-page:info-card.tooltip.decrypted") : unref($t)("multisig-page:info-card.tooltip.encrypted")]
              ]) : createCommentVNode("", true)
            ]),
            _: 1
          })) : __props.isRegistered === false ? withDirectives((openBlock(), createBlock(_component_Chip, { key: 1 }, {
            default: withCtx(() => [
              createBaseVNode("span", _hoisted_8$2, toDisplayString(unref($t)("common:status.unregistered")), 1)
            ]),
            _: 1
          })), [
            [_directive_tooltip, unref($t)("multisig-page:info-card.tooltip.unregistered")]
          ]) : createCommentVNode("", true),
          __props.hasUpdatedMeta ? withDirectives((openBlock(), createBlock(_component_Chip, {
            key: 2,
            class: "bg-bg-info"
          }, {
            default: withCtx(() => [
              createBaseVNode("span", _hoisted_9$1, toDisplayString(unref($t)("common:status.modified")), 1),
              createVNode(_component_Button, {
                class: "p-0",
                link: "",
                onClick: withModifiers(doLoadOnChainMeta, ["stop", "prevent"])
              }, {
                default: withCtx(() => [
                  createVNode(IconCopy02, { class: "size-4" })
                ]),
                _: 1
              })
            ]),
            _: 1
          })), [
            [_directive_tooltip, unref($t)("multisig-page:info-card.tooltip.modified")]
          ]) : createCommentVNode("", true)
        ])
      ]);
    };
  }
});

const _hoisted_1$2 = { class: "flex flex-nowrap et-jb-ic et-gap-sm" };
const _hoisted_2$2 = { class: "font-semibold" };
const _hoisted_3$2 = { class: "flex flex-nowrap et-gap-sm" };
const _hoisted_4$2 = { class: "w-full flex flex-col et-gap-md" };
const _hoisted_5$1 = {
  for: "name",
  class: "ml-1 cap-first"
};
const _hoisted_6$1 = {
  for: "description",
  class: "ml-1"
};
const _hoisted_7$1 = { class: "flex flex-col et-gap-xs" };
const _hoisted_8$1 = ["src"];
const _hoisted_9 = {
  for: "icon",
  class: "ml-1"
};
const _hoisted_10 = { class: "ml-4 et-text-xs text-txt-muted" };
const _hoisted_11 = { class: "flex flex-wrap et-je et-gap-sm mt-2" };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "MultiSigMetaCard",
  emits: ["cancel", "save"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const $t = useTranslation().t;
    useNotifications();
    const {
      accountData
    } = useSelectedAccount();
    const {
      metadata,
      editMode
    } = useModalMultiSigFlow();
    ref(false);
    const accMeta = computed(() => accountData.value?.account.scriptMeta ?? null);
    const name = ref("");
    const description = ref("");
    const icon = ref("");
    const isInvalidName = computed(() => (name.value.length ?? 0) > 64);
    const isInvalidDescription = computed(() => (description.value.length ?? 0) > 64);
    const isInvalidIcon = computed(() => (icon.value.length ?? 0) > 64);
    const doEdit = () => {
      metadata.value = json(accMeta.value);
      editMode.value = true;
    };
    const doCancel = () => {
      metadata.value = json(accMeta.value);
      editMode.value = false;
      emit("cancel");
    };
    const doApply = () => {
      if (!metadata.value) {
        return;
      }
      if (accMeta.value?.name !== name.value) {
        metadata.value.name = name.value;
      }
      if (accMeta.value?.description !== description.value) {
        metadata.value.description = description.value;
      }
      if (accMeta.value?.icon !== icon.value) {
        metadata.value.icon = icon.value;
      }
      emit("save");
    };
    watch(accMeta, () => {
      if (accMeta.value) {
        name.value = joinMetaDataValue(accMeta.value.name);
        description.value = joinMetaDataValue(accMeta.value.description);
        icon.value = joinMetaDataValue(accMeta.value.icon);
      } else {
        name.value = joinMetaDataValue(metadata.value?.name);
        description.value = joinMetaDataValue(metadata.value?.description);
        icon.value = joinMetaDataValue(metadata.value?.icon);
      }
    }, { immediate: true });
    watch(metadata, () => {
      name.value = joinMetaDataValue(metadata.value?.name);
      description.value = joinMetaDataValue(metadata.value?.description);
      icon.value = joinMetaDataValue(metadata.value?.icon);
    });
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_InputText = resolveComponent("InputText");
      const _component_FloatLabel = resolveComponent("FloatLabel");
      const _component_InputGroupAddon = resolveComponent("InputGroupAddon");
      const _component_InputGroup = resolveComponent("InputGroup");
      const _component_Card = resolveComponent("Card");
      const _directive_tooltip = resolveDirective("tooltip");
      return openBlock(), createBlock(_component_Card, {
        class: "grow break-inside-avoid",
        pt: {
          body: "h-full",
          content: "h-full flex flex-row flex-wrap et-js-ic"
        }
      }, createSlots({
        title: withCtx(() => [
          createBaseVNode("div", _hoisted_1$2, [
            createBaseVNode("div", _hoisted_2$2, toDisplayString(unref($t)("multisig-page:meta-card.title")), 1),
            createBaseVNode("div", _hoisted_3$2, [
              withDirectives((openBlock(), createBlock(_component_Button, {
                class: "p-0",
                disabled: unref(editMode),
                link: "",
                onClick: doEdit
              }, {
                default: withCtx(() => [
                  createVNode(IconPencil, { class: "w-5" })
                ]),
                _: 1
              }, 8, ["disabled"])), [
                [_directive_tooltip, unref($t)("multisig-page:meta-card.tooltip.edit")]
              ])
            ])
          ])
        ]),
        content: withCtx(() => [
          createBaseVNode("div", _hoisted_4$2, [
            createVNode(_component_FloatLabel, {
              class: "w-full",
              variant: "on"
            }, {
              default: withCtx(() => [
                createVNode(_component_InputText, {
                  modelValue: name.value,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => name.value = $event),
                  class: "w-full px-4 rounded-full",
                  id: "name",
                  disabled: !unref(editMode),
                  invalid: isInvalidName.value
                }, null, 8, ["modelValue", "disabled", "invalid"]),
                createBaseVNode("label", _hoisted_5$1, toDisplayString(unref($t)(`multisig-page:meta-card.name.${name.value.length === 0 ? "placeholder" : "label"}`)), 1)
              ]),
              _: 1
            }),
            createVNode(_component_FloatLabel, {
              class: "w-full",
              variant: "on"
            }, {
              default: withCtx(() => [
                createVNode(_component_InputText, {
                  modelValue: description.value,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => description.value = $event),
                  class: "w-full px-4 rounded-full",
                  id: "description",
                  disabled: !unref(editMode),
                  invalid: isInvalidDescription.value
                }, null, 8, ["modelValue", "disabled", "invalid"]),
                createBaseVNode("label", _hoisted_6$1, toDisplayString(unref($t)(`multisig-page:meta-card.description.${description.value.length === 0 ? "placeholder" : "label"}`)), 1)
              ]),
              _: 1
            }),
            createBaseVNode("div", _hoisted_7$1, [
              createVNode(_component_InputGroup, null, {
                default: withCtx(() => [
                  icon.value ? (openBlock(), createBlock(_component_InputGroupAddon, {
                    key: 0,
                    pt: { root: "p-0" },
                    class: "rounded-l-full"
                  }, {
                    default: withCtx(() => [
                      createBaseVNode("div", {
                        class: normalizeClass(["aspect-square", icon.value ? "size-10 p-1" : "flex et-jc-ic ml-4"])
                      }, [
                        icon.value ? (openBlock(), createElementBlock("img", {
                          key: 0,
                          class: "rounded-full",
                          src: icon.value,
                          alt: "icon"
                        }, null, 8, _hoisted_8$1)) : createCommentVNode("", true)
                      ], 2)
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  createVNode(_component_FloatLabel, {
                    class: "w-full",
                    variant: "on"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_InputText, {
                        pt: { root: icon.value.length > 0 ? "border-l-transparent" : "" },
                        modelValue: icon.value,
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => icon.value = $event),
                        class: normalizeClass(["w-full px-4", icon.value.length > 0 ? "rounded-r-full" : "rounded-full"]),
                        id: "icon",
                        disabled: !unref(editMode),
                        invalid: isInvalidIcon.value
                      }, null, 8, ["pt", "modelValue", "class", "disabled", "invalid"]),
                      createBaseVNode("label", _hoisted_9, toDisplayString(unref($t)(`multisig-page:meta-card.icon.${icon.value.length === 0 ? "placeholder" : "label"}`)), 1)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createBaseVNode("div", _hoisted_10, toDisplayString(unref($t)("multisig-page:meta-card.icon.info")), 1)
            ]),
            unref(editMode) ? (openBlock(), createBlock(_sfc_main$5, {
              key: 0,
              class: "w-full",
              collapsed: "",
              headline: unref($t)("multisig-page:meta-card.metainfo.headline"),
              caption: unref($t)("multisig-page:meta-card.metainfo.caption")
            }, null, 8, ["headline", "caption"])) : createCommentVNode("", true)
          ])
        ]),
        _: 2
      }, [
        unref(editMode) ? {
          name: "footer",
          fn: withCtx(() => [
            createBaseVNode("div", _hoisted_11, [
              unref(editMode) ? (openBlock(), createBlock(_component_Button, {
                key: 0,
                class: "grow sm:grow-0",
                label: unref($t)("common:cancel"),
                severity: "secondary",
                rounded: "",
                outlined: "",
                onClick: doCancel
              }, null, 8, ["label"])) : createCommentVNode("", true),
              unref(editMode) ? (openBlock(), createBlock(_component_Button, {
                key: 1,
                disabled: isInvalidName.value || isInvalidDescription.value || isInvalidIcon.value,
                class: "grow sm:grow-0",
                label: unref($t)("common:apply"),
                rounded: "",
                onClick: doApply
              }, null, 8, ["disabled", "label"])) : createCommentVNode("", true)
            ])
          ]),
          key: "0"
        } : void 0
      ]), 1024);
    };
  }
});

const _hoisted_1$1 = { class: "flex flex-nowrap et-gap-sm" };
const _hoisted_2$1 = { class: "cap-first" };
const _hoisted_3$1 = { class: "cap-first" };
const _hoisted_4$1 = { class: "cap-first" };
const storeId = "MultiSigActionCard";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "MultiSigActionCard",
  props: {
    isRegistered: { type: Boolean, required: false, default: void 0 },
    hasUpdatedMeta: { type: Boolean, required: false, default: void 0 }
  },
  emits: ["cancel", "save"],
  setup(__props, { emit: __emit }) {
    const $t = useTranslation().t;
    const {
      showSuccess,
      showWarning,
      showError
    } = useNotifications();
    const {
      appAccount,
      accountData,
      walletSettings
    } = useSelectedAccount();
    const {
      metadata,
      editMode
    } = useModalMultiSigFlow();
    const {
      outputMetadata,
      openModalMultiSigEncrypt
    } = useModalMultiSigEncrypt();
    const {
      showModalMultiSigWallet
    } = useModalMultiSigWallet();
    const { adaSymbol } = useAdaSymbol();
    const { downloadText } = useDownload();
    const isMetaUpdate = ref(false);
    const createTx = async (auxDataJson) => {
      addSignalListener(onBuiltTxMultiSigReg, storeId, (res, error) => {
        removeSignalListener(onBuiltTxMultiSigReg, storeId);
        if (res?.error) {
          const { msg, isWarning } = getTxBuiltErrorMsg(res ? res.error : ErrorBuildTx.missingAccountData, 0, { value: 0 }, adaSymbol);
          if (msg.length > 0) {
            isWarning ? showWarning(msg) : showError(msg);
          }
        } else if (error) {
          showError(error);
        }
      });
      await dispatchSignal(doBuildTxMultiSigReg, appAccount.value, auxDataJson);
      removeSignalListener(onBuiltTxMultiSigReg, storeId);
    };
    const doDownload = () => {
      if (!accountData.value?.account.paymentScript) {
        return;
      }
      const auxDataJson = generateScriptAuxData(
        accountData.value.account.paymentScript,
        accountData.value.account.stakeScript ?? null,
        accountData.value.account.drepScript ?? null,
        metadata.value
      );
      const offlineData = createOfflineRegistrationData(auxDataJson);
      downloadText(JSON.stringify(offlineData, null, 2), "eternl-multisig-" + walletSettings.name.value.replace(/[^a-z0-9]/gi, "_") + "_" + now().toString() + ".script");
    };
    const doRegister = () => {
      if (!accountData.value?.account.paymentScript) {
        return;
      }
      const auxDataJson = generateScriptAuxData(
        accountData.value.account.paymentScript,
        accountData.value.account.stakeScript ?? null,
        accountData.value.account.drepScript ?? null,
        outputMetadata.value
      );
      createTx(auxDataJson);
    };
    const doShowEncryptModal = (isUpdate) => {
      const accMeta = accountData.value?.account.scriptMeta;
      if (!accMeta) {
        return;
      }
      isMetaUpdate.value = isUpdate;
      openModalMultiSigEncrypt(accMeta);
    };
    const doMetaUpdate = () => {
      const cslAuxData = getMetadataFromJSON([{ label: 1854, metadatum: outputMetadata.value }]);
      const auxDataJson = cslToJson(cslAuxData.to_json());
      safeFreeCSLObject(cslAuxData);
      createTx(auxDataJson);
    };
    const _onTxSubmitted = (txList) => {
      if (showModalMultiSigWallet.value) {
        return;
      }
      const tx = txList[0];
      if (!tx?.auxiliary_data?.metadata || !tx.auxiliary_data.metadata.hasOwnProperty("1854")) {
        return;
      }
      showSuccess($t("multisig-page:action-card.metadata.success"));
    };
    watch(outputMetadata, () => {
      if (outputMetadata.value) {
        if (isMetaUpdate.value) {
          doMetaUpdate();
        } else {
          doRegister();
        }
      }
    });
    onMounted(() => {
      addSignalListener(onTxSubmitted, storeId, _onTxSubmitted);
    });
    onUnmounted(() => {
      removeSignalListener(onTxSubmitted, storeId);
    });
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_Card = resolveComponent("Card");
      const _directive_tooltip = resolveDirective("tooltip");
      return openBlock(), createBlock(_component_Card, {
        class: "grow break-inside-avoid",
        pt: {
          body: "h-full",
          content: "h-full flex flex-row flex-wrap et-js-ic"
        }
      }, {
        content: withCtx(() => [
          createBaseVNode("div", _hoisted_1$1, [
            withDirectives((openBlock(), createBlock(_component_Button, {
              disabled: unref(editMode),
              severity: "secondary",
              outlined: "",
              rounded: "",
              onClick: doDownload
            }, {
              default: withCtx(() => [
                createVNode(IconFileDownload, { class: "w-5" }),
                createBaseVNode("span", _hoisted_2$1, toDisplayString(unref($t)("multisig-page:action-card.download.label")), 1)
              ]),
              _: 1
            }, 8, ["disabled"])), [
              [_directive_tooltip, unref($t)("multisig-page:action-card.download.tooltip")]
            ]),
            __props.isRegistered === false ? withDirectives((openBlock(), createBlock(_component_Button, {
              key: 0,
              disabled: unref(editMode),
              severity: "secondary",
              outlined: "",
              rounded: "",
              onClick: _cache[0] || (_cache[0] = ($event) => doShowEncryptModal(false))
            }, {
              default: withCtx(() => [
                createVNode(IconBlockChain, { class: "w-5" }),
                createBaseVNode("span", _hoisted_3$1, toDisplayString(unref($t)("multisig-page:action-card.register.label")), 1)
              ]),
              _: 1
            }, 8, ["disabled"])), [
              [_directive_tooltip, unref($t)("multisig-page:action-card.register.tooltip")]
            ]) : createCommentVNode("", true),
            __props.isRegistered && __props.hasUpdatedMeta ? withDirectives((openBlock(), createBlock(_component_Button, {
              key: 1,
              disabled: unref(editMode),
              severity: "secondary",
              outlined: "",
              rounded: "",
              onClick: _cache[1] || (_cache[1] = ($event) => doShowEncryptModal(true))
            }, {
              default: withCtx(() => [
                createVNode(IconFileDownload, { class: "w-5" }),
                createBaseVNode("span", _hoisted_4$1, toDisplayString(unref($t)("multisig-page:action-card.metadata.label")), 1)
              ]),
              _: 1
            }, 8, ["disabled"])), [
              [_directive_tooltip, unref($t)("multisig-page:action-card.metadata.tooltip")]
            ]) : createCommentVNode("", true)
          ])
        ]),
        _: 1
      });
    };
  }
});

const _hoisted_1 = { class: "page-multi-sig flex flex-col et-max-width-page" };
const _hoisted_2 = { class: "relative w-full flex flex-col et-js et-gap-md" };
const _hoisted_3 = { class: "" };
const _hoisted_4 = { class: "text-txt-muted" };
const _hoisted_5 = {
  key: 0,
  class: "relative @container w-full flex flex-col et-js-is et-gap-md sm:et-gap-md"
};
const _hoisted_6 = { class: "w-full @4xl:columns-2 et-gap-x-md et-gap-y-md et-space-y-md" };
const _hoisted_7 = { class: "flex flex-col et-gap-md break-inside-avoid" };
const _hoisted_8 = { class: "grow break-inside-avoid" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PageMultiSig",
  setup(__props) {
    const $t = useTranslation().t;
    const {
      showSuccess,
      showError
    } = useNotifications();
    const {
      appWallet,
      accountData
    } = useSelectedAccount();
    const { isSmallerThanXS } = useScreenSize();
    const {
      showModalMultiSigWallet
    } = useModalMultiSigWallet();
    const {
      stakeMirrored,
      drepMirrored,
      createMode,
      editMode,
      metadata,
      tweenOutModalMultiSigParticipantViewer
    } = useModalMultiSigFlow();
    createMode.value = false;
    editMode.value = false;
    stakeMirrored.value = false;
    drepMirrored.value = false;
    const registeredMeta = ref(void 0);
    const registeredDecryptedMeta = ref(null);
    const isRegistered = computed(() => {
      if (!!registeredMeta.value) {
        return true;
      } else if (registeredMeta.value === null) {
        return false;
      } else {
        return void 0;
      }
    });
    const isEncrypted = computed(() => registeredMeta.value?.enc === "basic");
    const lastUpdateSlot = ref(void 0);
    const paymentNodeList = ref([]);
    const stakeNodeList = ref([]);
    const drepNodeList = ref([]);
    const paymentEdgeList = ref([]);
    const stakeEdgeList = ref([]);
    const drepEdgeList = ref([]);
    const updateFlow = (type, nodeList, edgeList, nsList, parent) => {
      for (const item of nsList) {
        const nodeId = nodeList.length.toString();
        const edgeId = edgeList.length.toString();
        const newNode = {
          id: nodeId,
          position: { x: 0, y: 0 },
          selectable: true,
          deletable: false,
          connectable: false,
          data: { valid: true, parent }
        };
        const newEdge = parent ? {
          id: edgeId,
          source: parent,
          target: nodeId,
          deletable: false
        } : null;
        if (item.hasOwnProperty("ScriptPubkey")) {
          const _item = item;
          const cred = _item.ScriptPubkey.addr_keyhash;
          const participant = createIUIMultiSigParticipant();
          participant.keys[type] = [{
            path: [...multisigPath, chain[type], 0],
            cred,
            used: true
          }];
          const meta = metadata.value ?? accountData.value?.account.scriptMeta;
          const participantMeta = meta?.participants?.[cred];
          if (participantMeta?.name) {
            participant.name = participantMeta.name;
          }
          if (participantMeta?.description) {
            participant.description = participantMeta.description;
          }
          if (participantMeta?.icon) {
            participant.icon = participantMeta.icon;
          }
          newNode.type = "participant";
          newNode.data.participant = participant;
          nodeList.push(newNode);
          edgeList.push(newEdge);
        } else if (item.hasOwnProperty("TimelockStart")) {
          const _item = item;
          const timelock = parseInt(_item.TimelockStart.slot);
          newNode.type = "timelock";
          newNode.data.timelock = timelock;
          nodeList.push(newNode);
          edgeList.push(newEdge);
        } else if (item.hasOwnProperty("TimelockExpiry")) {
          showError("Unsupported timelock expiry entry found, ignoring!");
        } else if (item.hasOwnProperty("ScriptAll")) {
          const _item = item;
          newNode.type = "root";
          newNode.data.isRootNode = !parent;
          newNode.data.requiredSigners = _item.ScriptAll.native_scripts.length;
          newNode.data.children = _item.ScriptAll.native_scripts.length;
          nodeList.push(newNode);
          edgeList.push(newEdge);
          updateFlow(type, nodeList, edgeList, _item.ScriptAll.native_scripts, nodeId);
        } else if (item.hasOwnProperty("ScriptAny")) {
          const _item = item;
          newNode.type = "root";
          newNode.data.isRootNode = !parent;
          newNode.data.requiredSigners = 1;
          newNode.data.children = _item.ScriptAny.native_scripts.length;
          nodeList.push(newNode);
          edgeList.push(newEdge);
          updateFlow(type, nodeList, edgeList, _item.ScriptAny.native_scripts, nodeId);
        } else if (item.hasOwnProperty("ScriptNOfK")) {
          const _item = item;
          newNode.type = "root";
          newNode.data.isRootNode = !parent;
          newNode.data.requiredSigners = _item.ScriptNOfK.n;
          newNode.data.children = _item.ScriptNOfK.native_scripts.length;
          nodeList.push(newNode);
          edgeList.push(newEdge);
          updateFlow(type, nodeList, edgeList, _item.ScriptNOfK.native_scripts, nodeId);
        }
      }
    };
    const createFlowsFromNS = () => {
      if (!accountData.value) {
        return;
      }
      if (accountData.value.account.paymentScript) {
        const nodeList = [];
        const edgeList = [];
        updateFlow("payment", nodeList, edgeList, [getNativeScriptJSONFromHex(accountData.value.account.paymentScript)]);
        paymentNodeList.value = nodeList;
        paymentEdgeList.value = edgeList;
      }
      if (accountData.value.account.stakeScript) {
        const nodeList = [];
        const edgeList = [];
        updateFlow("stake", nodeList, edgeList, [getNativeScriptJSONFromHex(accountData.value.account.stakeScript)]);
        stakeNodeList.value = nodeList;
        stakeEdgeList.value = edgeList;
      }
      if (accountData.value.account.drepScript) {
        const nodeList = [];
        const edgeList = [];
        updateFlow("drep", nodeList, edgeList, [getNativeScriptJSONFromHex(accountData.value.account.drepScript)]);
        drepNodeList.value = nodeList;
        drepEdgeList.value = edgeList;
      }
    };
    const cancelAccountMeta = () => {
      createFlowsFromNS();
      tweenOutModalMultiSigParticipantViewer();
    };
    const updateAccountMeta = async () => {
      if (!accountData.value) {
        return;
      }
      if (!appWallet.value || (accountData.value.account.scriptMeta?.types.length ?? 0) === 0 || !metadata.value) {
        showError($t("multisig-page:error.save"));
        return;
      }
      const participants = paymentNodeList.value.filter((n) => n.type === "participant").map((n) => n.data.participant).concat(stakeNodeList.value.filter((n) => n.type === "participant").map((n) => n.data.participant)).concat(drepNodeList.value.filter((n) => n.type === "participant").map((n) => n.data.participant));
      const _metadata = json(
        generateScriptMeta(
          joinMetaDataValue(metadata.value?.name),
          joinMetaDataValue(metadata.value?.description),
          joinMetaDataValue(metadata.value?.icon),
          participants
        )
      );
      _metadata.types = accountData.value.account.scriptMeta?.types;
      updateAccountScriptMeta(appWallet.value, accountData.value.account.id, _metadata);
      try {
        await saveWallet(appWallet.value);
        editMode.value = false;
        showSuccess($t("multisig-page:save"));
      } catch (e) {
        showError(getErrorMsg(e));
      }
    };
    const onDecryptRegMeta = (_meta) => {
      registeredDecryptedMeta.value = _meta;
    };
    const doLoadOnChainMeta = () => {
      tweenOutModalMultiSigParticipantViewer();
      editMode.value = true;
      metadata.value = json(registeredDecryptedMeta.value ?? registeredMeta.value);
      createFlowsFromNS();
    };
    const checkIsRegistered = async () => {
      if (!accountData.value?.account.paymentScript) {
        return;
      }
      try {
        const meta = await syncMultiSigMeta(networkId.value, accountData.value.account.id, getNativeScriptCredFromHex(accountData.value.account.paymentScript));
        registeredMeta.value = !!meta ? getIScriptMetaFromCbor(meta.meta) : void 0;
        lastUpdateSlot.value = meta?.tx.slot;
      } catch (e) {
        console.error(e);
      }
    };
    const hasUpdatedMeta = computed(() => {
      if (!isRegistered.value) {
        return false;
      }
      const accMeta = accountData.value?.account.scriptMeta;
      if (!accMeta) {
        return false;
      }
      if (isEncrypted.value && !registeredDecryptedMeta.value) {
        return false;
      }
      const refMeta = registeredDecryptedMeta.value ?? registeredMeta.value;
      if ((accMeta.name ?? "") !== (refMeta?.name ?? "") || (accMeta.description ?? "") !== (refMeta?.description ?? "") || (accMeta.icon ?? "") !== (refMeta?.icon ?? "")) {
        return true;
      }
      if (Object.keys(accMeta.participants ?? {}).length !== Object.keys(refMeta?.participants ?? {}).length) {
        return true;
      }
      return Object.entries(accMeta.participants ?? {}).some((i) => {
        const p = refMeta?.participants?.[i[0]];
        if (!p) {
          return true;
        }
        if (i[1].name !== p.name || i[1].description !== p.description || i[1].icon !== p.icon) {
          return true;
        }
        return false;
      });
    });
    watch(accountData, () => {
      if (!!accountData.value) {
        createFlowsFromNS();
        checkIsRegistered();
        metadata.value = accountData.value.account.scriptMeta ?? null;
      }
    }, { immediate: true });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createVNode(_sfc_main$6, {
            title: unref($t)("multisig-page:title"),
            animation: FxAnnouncementPageDark,
            animationClass: "absolut top-0 right-0 w-[45%] -translate-y-[15%]"
          }, createSlots({
            icon: withCtx(() => [
              createVNode(IconMultiSig, { class: "size-5" })
            ]),
            _: 2
          }, [
            !unref(isSmallerThanXS) ? {
              name: "caption",
              fn: withCtx(() => [
                createBaseVNode("div", _hoisted_3, toDisplayString(unref($t)("multisig-page:caption")), 1)
              ]),
              key: "0"
            } : void 0,
            !unref(isSmallerThanXS) ? {
              name: "sub-caption",
              fn: withCtx(() => [
                createBaseVNode("div", _hoisted_4, toDisplayString(unref($t)("multisig-page:subCaption")), 1)
              ]),
              key: "1"
            } : void 0
          ]), 1032, ["title"]),
          unref(accountData) ? (openBlock(), createElementBlock("div", _hoisted_5, [
            createBaseVNode("div", _hoisted_6, [
              createVNode(_sfc_main$3, {
                "is-registered": isRegistered.value,
                "has-updated-meta": hasUpdatedMeta.value,
                "is-encrypted": isEncrypted.value,
                "registered-meta": registeredMeta.value,
                onDecrypt: onDecryptRegMeta,
                onLoadOnChainMeta: doLoadOnChainMeta
              }, null, 8, ["is-registered", "has-updated-meta", "is-encrypted", "registered-meta"]),
              createBaseVNode("div", _hoisted_7, [
                createVNode(_sfc_main$2, {
                  onSave: updateAccountMeta,
                  onCancel: cancelAccountMeta
                }),
                createVNode(_sfc_main$1, {
                  "is-registered": isRegistered.value,
                  "has-updated-meta": hasUpdatedMeta.value
                }, null, 8, ["is-registered", "has-updated-meta"])
              ]),
              createBaseVNode("div", _hoisted_8, [
                !unref(showModalMultiSigWallet) ? (openBlock(), createBlock(_sfc_main$7, {
                  key: 0,
                  "payment-node-list": paymentNodeList.value,
                  "onUpdate:paymentNodeList": _cache[0] || (_cache[0] = ($event) => paymentNodeList.value = $event),
                  "stake-node-list": stakeNodeList.value,
                  "onUpdate:stakeNodeList": _cache[1] || (_cache[1] = ($event) => stakeNodeList.value = $event),
                  "drep-node-list": drepNodeList.value,
                  "onUpdate:drepNodeList": _cache[2] || (_cache[2] = ($event) => drepNodeList.value = $event),
                  "payment-edge-list": paymentEdgeList.value,
                  "onUpdate:paymentEdgeList": _cache[3] || (_cache[3] = ($event) => paymentEdgeList.value = $event),
                  "stake-edge-list": stakeEdgeList.value,
                  "onUpdate:stakeEdgeList": _cache[4] || (_cache[4] = ($event) => stakeEdgeList.value = $event),
                  "drep-edge-list": drepEdgeList.value,
                  "onUpdate:drepEdgeList": _cache[5] || (_cache[5] = ($event) => drepEdgeList.value = $event),
                  showStake: !!unref(accountData).account.stakeScript,
                  showDRep: !!unref(accountData).account.drepScript
                }, null, 8, ["payment-node-list", "stake-node-list", "drep-node-list", "payment-edge-list", "stake-edge-list", "drep-edge-list", "showStake", "showDRep"])) : createCommentVNode("", true)
              ])
            ])
          ])) : createCommentVNode("", true)
        ])
      ]);
    };
  }
});

export { _sfc_main as default };
