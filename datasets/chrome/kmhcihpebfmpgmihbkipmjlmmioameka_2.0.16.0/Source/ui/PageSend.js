import { D as computed, P as networkId, e as ref, G as watch, ad as dispatchSignalSync, ak as doResetAllTx, d as defineComponent, w as useTranslation, c as createBlock, t as createCommentVNode, u as unref, o as openBlock, y as withCtx, p as createBaseVNode, n as createVNode, z as resolveComponent, B as toDisplayString, al as getErrorMsg, am as Buffer$1, an as isHexString, m as createElementBlock, F as Fragment, a1 as withDirectives, a2 as resolveDirective, ao as doBuildTxSend, ap as doToggleDonation, aq as onTxAuxMessageReset, ar as getMetadataType, as as createJsonFromCborJson, at as onTxAuxUpdate, au as doAddAuxData, av as doRemoveDonation, aw as doAddDonation, ax as doRemoveOutput, ay as doAddOutput, az as dispatchSignalSyncTo, aA as doJustBuildTxSend, aB as inject, v as createStaticVNode, aC as dispatchSignal, aD as doBuildTxCU, aE as addSignalListener, aF as removeSignalListener, aG as onBuiltTxTF, aH as doBuildTxTF, V as normalizeClass, U as withModifiers, f as onMounted, k as onUnmounted, H as createTextVNode, aI as toHexArray, ab as mergeModels, ac as useModel, aJ as toHexString, S as renderList, aK as normalizeStyle, aL as onBuiltTxSend, aM as el, aN as sl, N as nextTick, x as useScreenSize, aO as withKeys, ae as isRef, Y as toRefs, aP as markRaw, $ as createSlots, aQ as provide, aR as onBeforeMount, aS as onUpdateTfBundleSize } from './index.js';
import { i as isZero, s as subtract, a as isLessThanZero, d as divide, p as pow, b as isEqual, c as compare, m as multiply, e as bigToNum, f as isGreaterThanZero, g as abs, h as isZeroOrLess, n as neg } from './bigmath.js';
import { g as getChosenInputList, c as cloneTransactionOutputJSON, u as useBuildAccount } from './lib.js';
import { g as getNetworkDecimals } from './NetworkId.js';
import { k as getStagingTxList, l as getStagingTxConfigList, m as getBuiltTxList, o as getBuiltTxBalanceList, F as FixedTransaction, s as safeFreeCSLObject, p as processMetadata, q as hasDonation, r as createIBalance, t as clearBalance, v as addToBalance, E as ErrorBuildTx, w as resetAllTx, x as DataHash, y as getPlutusHVB, L as LanguageKind, f as freeCSLObjects, N as NativeScript, S as ScriptRef, P as PlutusScript, z as addValueToValue, A as updateBalanceTotal, B as createIUtxo, C as isDonation, G as isLargeOutput, H as getMinUtxo, I as removeOutput, J as includesMultiAsset, K as addMultiAssets, M as MetadataJsonSchema, O as cslToJson, Q as onAccountSettingsUpdated } from './app2.js';
import { u as useAppMode } from './useAppMode.js';
import { d as doUpdateAccountBalances, a as doClearSelectedUtxos, g as getRandomId, c as checkEpochParams } from './epochParams.js';
import { u as useTxMessage, _ as _sfc_main$O, I as IconArrowRT } from './TransactionItemMessages.vue_vue_type_script_setup_true_lang.js';
import { I as IconSpinner } from './IconSpinner.js';
import { _ as _sfc_main$u, a as _sfc_main$v, I as IconFileUpload, b as IconDownload, c as IconPencilOutline, d as IconLockClosed, e as _sfc_main$B, f as _sfc_main$E, u as useAddressResolverSendMode, g as _sfc_main$I, h as useModalAddAsset } from './AddressResolver.vue_vue_type_script_setup_true_lang.js';
import { p as parseTxSignRequest } from './parse.js';
import { u as useSelectedAccount } from './useSelectedAccount.js';
import { u as useNotifications } from './useNotification.js';
import { _ as _sfc_main$x } from './Modal.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$w } from './ModalHeader.vue_vue_type_script_setup_true_lang.js';
import { M as ModalContentCard } from './ModalContentCard.js';
import { _ as _sfc_main$C } from './AdaAmount.vue_vue_type_script_setup_true_lang.js';
import { c as checkAndTrimTxMessageLineList, g as getTxMetadataFromStringArray, a as createIMetadata, b as getMetadataFromJSON } from './metadata.js';
import { D as DEFAULT_MSG_PASSWORD, e as encryptMessage } from './messageEncryption.js';
import { u as useModalOpen } from './useModalOpen.js';
import { _ as _sfc_main$y } from './AccountUtxoList.vue_vue_type_script_setup_true_lang.js';
import { u as useAdaSymbol } from './useAdaSymbol.js';
import { s as sleep, g as getSortedAssetDetailsListCached, a as getAssetByFingerprint } from './useAppAccountBalances.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper.js';
import { g as getTxBuiltErrorMsg } from './error.js';
import { g as getTimestampFromSlot, b as getCalculatedSlotFromBlockTime } from './chain.js';
import { u as useFormatter } from './useFormatter.js';
import { I as IconEpochTimer } from './IconEpochTimer.js';
import { I as IconCancel01 } from './IconCancel01.js';
import { _ as _sfc_main$A } from './TransactionUTxODetails.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$z } from './CopyToClipboard.vue_vue_type_script_setup_true_lang.js';
import { b as getNativeScriptJSONFromHex } from './creds.js';
import { _ as _sfc_main$D } from './Toggle.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$F } from './AdaAmountRaw.vue_vue_type_script_setup_true_lang.js';
import { u as useSignTx } from './useSignTx.js';
import { o as onNavigateToSend } from './send.js';
import { I as IconPencil } from './IconPencil.js';
import { I as IconPlusSign } from './IconPlusSign.js';
import { I as IconDelete02 } from './IconDelete02.js';
import { B as ButtonRow } from './ButtonRow.js';
import { d as doSelectAddressBookEntry } from './contractMapping.js';
import { I as IconAlert02 } from './IconAlert02.js';
import { _ as _sfc_main$J } from './TransactionAssetList.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$G } from './InputCoin.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$K } from './BannerNeutral.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$L } from './BannerWarning.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$H } from './ContextMenu.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$M } from './PasswordInput.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$N } from './ExternalLink.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$P } from './PageHeader.vue_vue_type_script_setup_true_lang.js';
import './decryptedMsg.js';
import './IconSquareUnlock02.js';
import './IconFxLoader.js';
import './index2.js';
import './DrawSVGPlugin.js';
import './language.js';
import './Badge.vue_vue_type_script_setup_true_lang.js';
import './image.js';
import './IconQR.js';
import './TransactionUTxOAddress.vue_vue_type_script_setup_true_lang.js';
import './Bech32Display.vue_vue_type_script_setup_true_lang.js';
import './ExplorerLink.vue_vue_type_script_setup_true_lang.js';
import './index3.js';
import './IconInformationCircle.js';
import './IconCopy01.js';
import './IconLinkSquare01.js';
import './ResolvedImage.vue_vue_type_script_setup_true_lang.js';
import './useModalImage.js';
import './AdaHandleName.vue_vue_type_script_setup_true_lang.js';
import './useBalanceVisible.js';
import './ErrorSignTx.js';
import './notification.js';
import './FormattedAmount.vue_vue_type_script_setup_true_lang.js';
import './usePaginator.js';
import './AccountUtxoItem.vue_vue_type_script_setup_true_lang.js';
import './Badges.vue_vue_type_script_setup_true_lang.js';
import './AssetListFilters.vue_vue_type_script_setup_true_lang.js';
import './useGuards.js';
import './useHomeSettings.js';
import './InputSearch.vue_vue_type_script_setup_true_lang.js';
import './IconSearch01.js';
import './ErrorSubmitTx.js';
import './address.js';
import './IconChevronRight.js';
import './useModalAssetDetails.js';
import './currency2.js';
import './useBiometricsAction.js';

const txErrorMap = ref(
  /* @__PURE__ */ new Map()
);
function useAppAccountTxLists(buildAccountInfo) {
  const accountId = buildAccountInfo.buildAccountId;
  const walletId = buildAccountInfo.buildWalletId;
  const coinDecimals = computed(() => getNetworkDecimals(networkId.value));
  const stagingTxList = ref(null);
  const stagingTxConfigList = ref(null);
  const builtTxList = ref(null);
  const builtTxBalanceList = ref(null);
  const resetAllTx = () => {
    if (accountId.value) {
      dispatchSignalSync(doResetAllTx, accountId.value);
    }
  };
  const updateRefs = () => {
    if (accountId.value) {
      stagingTxList.value = getStagingTxList(accountId.value);
      stagingTxConfigList.value = getStagingTxConfigList(accountId.value);
      builtTxList.value = getBuiltTxList(accountId.value);
      builtTxBalanceList.value = getBuiltTxBalanceList(accountId.value);
      resetAllTx();
    } else {
      stagingTxList.value = null;
      stagingTxConfigList.value = null;
      builtTxList.value = null;
      builtTxBalanceList.value = null;
    }
  };
  watch(accountId, () => {
    updateRefs();
  }, { immediate: true });
  return {
    accountId,
    walletId,
    buildAccountInfo,
    coinDecimals,
    txErrorMap,
    stagingTxList,
    stagingTxConfigList,
    builtTxList,
    builtTxBalanceList,
    resetAllTx
  };
}

const showModal$3 = ref(false);
const openModalImportTx = async () => {
  showModal$3.value = true;
};
const closeModalImportTx = () => {
  showModal$3.value = false;
};
const useModalImportTx = () => {
  return {
    showModalImportTx: showModal$3,
    openModalImportTx,
    closeModalImportTx
  };
};

const _hoisted_1$n = { class: "w-full flex flex-col" };
const _hoisted_2$f = ["onClick"];
const _hoisted_3$a = { class: "" };
const _hoisted_4$8 = { class: "flex flex-wrap et-je et-gap-sm" };
const _sfc_main$t = /* @__PURE__ */ defineComponent({
  __name: "ModalImportTx",
  setup(__props) {
    const $t = useTranslation().t;
    const {
      showModalImportTx,
      closeModalImportTx
    } = useModalImportTx();
    const { showError } = useNotifications();
    const { appAccount } = useSelectedAccount();
    const isProcessing = ref(false);
    const isDoneProcessing = ref(true);
    const pasteInput = ref("");
    const pasteError = ref("");
    let _handleClose = null;
    const loadFile = (file) => {
      return new Promise((resolve, reject) => {
        const fr = new FileReader();
        fr.onload = () => {
          resolve(fr.result);
        };
        fr.onerror = () => {
          reject(fr);
        };
        fr.readAsDataURL(file);
      });
    };
    const parseFileData = (data) => {
      const fileContent = new Text(data);
      if (fileContent.textContent) {
        let file = fileContent.textContent.split(",");
        file[0];
        let content = Buffer$1.from(file[1], "base64").toString();
        if (isHexString(content)) {
          return deserializeTx([content]);
        }
        const maybeTxList = JSON.parse(content);
        if (Array.isArray(maybeTxList)) {
          if (isHexString(content)) {
            return deserializeTx([content]);
          }
          return deserializeTx(maybeTxList.map((tx) => tx.cborHex));
        } else {
          return deserializeTx([maybeTxList.cborHex]);
        }
      }
      return [];
    };
    const handleTxFileUpload = async (handleClose, event) => {
      isProcessing.value = true;
      isDoneProcessing.value = false;
      const files = event.files;
      if (Array.isArray(files) && files.length > 0) {
        try {
          const readers = [];
          for (let i = 0; i < files.length; i++) {
            readers.push(loadFile(files[i]));
          }
          const fileData = await Promise.all(readers);
          const txCborList = [];
          for (const data of fileData) {
            txCborList.push(...parseFileData(data));
          }
          _handleClose = handleClose;
          await parseTxSignRequest(appAccount.value, "cc", txCborList, null);
        } catch (err) {
          const errorMsg = getErrorMsg(err);
          if (errorMsg.includes("not valid JSON")) {
            showError($t("tx-import:invalid"));
          } else if (errorMsg.includes("Cannot read properties of undefined")) {
            showError($t("tx-import:error.format"));
          } else {
            showError(getErrorMsg(err));
          }
        }
      }
      isProcessing.value = false;
      isDoneProcessing.value = true;
    };
    const deserializeTx = (cbor) => {
      for (const tx of cbor) {
        try {
          const cslTx = FixedTransaction.from_hex(tx);
          safeFreeCSLObject(cslTx);
        } catch (e) {
          const errorMsg = getErrorMsg(e);
          if (errorMsg.includes("Deserialization failed in Transaction")) {
            throw $t("tx-import:error.corrupted");
          } else {
            throw errorMsg;
          }
        }
      }
      return cbor.map((c) => ({ cbor: c, partialSign: true }));
    };
    const onPaste = async (handleClose, event) => {
      isProcessing.value = true;
      isDoneProcessing.value = false;
      _handleClose = handleClose;
      try {
        const pasteData = (event.clipboardData?.getData("text/plain") ?? "").trim();
        const txCborList = deserializeTx([pasteData]);
        await parseTxSignRequest(appAccount.value, "cc", txCborList, null);
      } catch (err) {
        showError(getErrorMsg(err));
      }
      isProcessing.value = false;
      isDoneProcessing.value = true;
    };
    watch(pasteInput, async (newValue, oldValue) => {
      if (!oldValue || oldValue.length === 0 || !_handleClose) {
        return;
      }
      try {
        const txCborList = deserializeTx([newValue]);
        await parseTxSignRequest(appAccount.value, "cc", txCborList, null);
      } catch (err) {
        showError(getErrorMsg(err));
      }
    });
    const doClear = () => pasteInput.value = "";
    watch(isProcessing, (newValue, oldValue) => {
      if (oldValue && !newValue && _handleClose) {
        setTimeout(() => _handleClose?.(), 10);
      }
    });
    return (_ctx, _cache) => {
      const _component_FileUpload = resolveComponent("FileUpload");
      const _component_Button = resolveComponent("Button");
      return unref(showModalImportTx) ? (openBlock(), createBlock(_sfc_main$x, {
        key: 0,
        "modal-container": "#modal-add-message",
        narrow: "",
        "full-width-on-mobile": "",
        onClose: unref(closeModalImportTx)
      }, {
        header: withCtx(({ handleClose }) => [
          createBaseVNode("div", _hoisted_1$n, [
            createVNode(_sfc_main$w, {
              headline: unref($t)("tx-import:title"),
              caption: unref($t)("tx-import:caption"),
              "hide-info": "",
              "hide-back": "",
              "show-close": "",
              onClose: handleClose
            }, null, 8, ["headline", "caption", "onClose"])
          ])
        ]),
        content: withCtx(({ handleClose }) => [
          createVNode(ModalContentCard, null, {
            default: withCtx(() => [
              isProcessing.value ? (openBlock(), createBlock(_sfc_main$u, {
                key: 0,
                "is-processing": isProcessing.value,
                "onUpdate:isProcessing": _cache[0] || (_cache[0] = ($event) => isProcessing.value = $event),
                "is-done-processing": isDoneProcessing.value,
                "onUpdate:isDoneProcessing": _cache[1] || (_cache[1] = ($event) => isDoneProcessing.value = $event),
                label: unref($t)("common:importFiles.processing")
              }, null, 8, ["is-processing", "is-done-processing", "label"])) : createCommentVNode("", true),
              createVNode(_sfc_main$v, {
                input: pasteInput.value,
                "onUpdate:input": _cache[2] || (_cache[2] = ($event) => pasteInput.value = $event),
                error: pasteError.value,
                placeholder: unref($t)("tx-import:cbor"),
                onPaste: ($event) => onPaste(handleClose, $event),
                autofocus: ""
              }, null, 8, ["input", "error", "placeholder", "onPaste"]),
              !isProcessing.value ? (openBlock(), createBlock(_component_FileUpload, {
                key: 1,
                pt: {
                  root: "w-full rounded-2xl!",
                  header: "p-0",
                  empty: "hidden",
                  content: "hidden"
                },
                multiple: "",
                auto: "",
                customUpload: "",
                onSelect: (event) => handleTxFileUpload(handleClose, event)
              }, {
                header: withCtx(({ chooseCallback }) => [
                  createBaseVNode("div", {
                    class: "w-full h-full pb-3 flex flex-col et-jb-ic text-txt-muted cursor-pointer rounded-2xl hover:bg-[var(--p-button-text-secondary-hover-background)]",
                    onClick: ($event) => chooseCallback()
                  }, [
                    createVNode(IconFileUpload, { class: "w-12 my-4" }),
                    createBaseVNode("span", _hoisted_3$a, toDisplayString(unref($t)("wallet-add-more-cli:drop")), 1)
                  ], 8, _hoisted_2$f)
                ]),
                _: 1
              }, 8, ["onSelect"])) : createCommentVNode("", true)
            ]),
            _: 2
          }, 1024)
        ]),
        footer: withCtx(({ handleClose }) => [
          createBaseVNode("div", _hoisted_4$8, [
            createVNode(_component_Button, {
              class: "grow sm:grow-0",
              label: unref($t)("common:close"),
              disabled: false,
              severity: "secondary",
              rounded: "",
              outlined: "",
              onClick: handleClose
            }, null, 8, ["label", "onClick"]),
            createVNode(_component_Button, {
              class: "grow sm:grow-0",
              label: unref($t)("common:clear"),
              disabled: pasteInput.value.length === 0,
              severity: "secondary",
              rounded: "",
              outlined: "",
              onClick: doClear
            }, null, 8, ["label", "disabled"])
          ])
        ]),
        _: 1
      }, 8, ["onClose"])) : createCommentVNode("", true);
    };
  }
});

const _sfc_main$s = /* @__PURE__ */ defineComponent({
  __name: "ImportTxButton",
  setup(__props) {
    const $t = useTranslation().t;
    const {
      openModalImportTx
    } = useModalImportTx();
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _directive_tooltip = resolveDirective("tooltip");
      return openBlock(), createElementBlock(Fragment, null, [
        withDirectives((openBlock(), createBlock(_component_Button, {
          class: "p-0",
          link: "",
          onClick: unref(openModalImportTx)
        }, {
          default: withCtx(() => [
            createVNode(IconDownload, { class: "size-5 sm:size-6 rotate-180" })
          ]),
          _: 1
        }, 8, ["onClick"])), [
          [_directive_tooltip, unref($t)("send-options:import.label") + " - " + unref($t)("send-options:import.caption")]
        ]),
        createVNode(_sfc_main$t)
      ], 64);
    };
  }
});

function useAppAccountTx(lists, txIndex) {
  const {
    stagingTxList,
    stagingTxConfigList,
    buildAccountInfo,
    builtTxList,
    builtTxBalanceList
  } = lists;
  const accountId = buildAccountInfo.buildAccountId;
  buildAccountInfo.accountBalance;
  const accountBalances = buildAccountInfo.accountBalances;
  const accountSettings = buildAccountInfo.accountSettings;
  const isTfEnabled = accountSettings.isTfEnabled;
  const stagingTx = computed(() => {
    const _txIndex = txIndex?.value ?? -1;
    if (_txIndex < 0) {
      return null;
    }
    return stagingTxList.value?.[_txIndex] ?? null;
  });
  const stagingTxConfig = computed(() => {
    const _txIndex = txIndex?.value ?? -1;
    if (_txIndex < 0) {
      return null;
    }
    return stagingTxConfigList.value?.[_txIndex] ?? null;
  });
  const builtTx = computed(() => {
    const _txIndex = txIndex?.value ?? -1;
    if (_txIndex < 0) {
      return null;
    }
    return builtTxList.value?.[_txIndex] ?? null;
  });
  const builtTxBalance = computed(() => {
    const _txIndex = txIndex?.value ?? -1;
    if (_txIndex < 0) {
      return null;
    }
    return builtTxBalanceList.value?.[_txIndex] ?? null;
  });
  const auxData = computed(() => stagingTx.value?.auxiliary_data ?? null);
  const msgWrapper = computed(() => {
    if (!auxData.value) {
      return void 0;
    }
    const obj = {};
    processMetadata(obj, auxData.value);
    return obj;
  });
  const txMessages = useTxMessage(msgWrapper);
  const {
    messageInput,
    messageInputError,
    doEncryptMessage,
    messagePassword,
    messagePasswordError,
    messagePasswordDefault,
    resetMessageInputs
  } = txMessages;
  const numOutputs = computed(() => stagingTx.value?.body.outputs.length ?? 0);
  const hasMultipleOutputs = computed(() => numOutputs.value > 1);
  const hasDonation$1 = computed(() => hasDonation(accountId.value, txIndex.value));
  const accountAssets = computed(() => accountBalances.value?.account.multiasset ?? void 0);
  const chosenInputList = computed(() => getChosenInputList(txIndex.value, false));
  const lockedAvailableBalance = ref(void 0);
  const availableAccountBalance = ref(createIBalance());
  const availableAccountAssets = ref(void 0);
  watch(accountBalances, (value) => {
    const ab = availableAccountBalance.value;
    clearBalance(ab);
    if (value) {
      lockedAvailableBalance.value = isTfEnabled.value ? value.lockedAvailableTF : value.lockedAvailable;
      addToBalance(ab, lockedAvailableBalance.value);
      availableAccountAssets.value = ab.multiasset ?? void 0;
    } else {
      lockedAvailableBalance.value = void 0;
      availableAccountAssets.value = void 0;
    }
  }, { immediate: true, deep: true });
  const addOutput = (address = "", coin = "0", multiasset) => {
    if (accountId.value) {
      dispatchSignalSync(doAddOutput, accountId.value, txIndex.value, address, coin, multiasset);
    }
  };
  const addFirstOutput = () => {
    if (stagingTx.value && numOutputs.value === 0) {
      addOutput();
    }
  };
  const removeOutput = (outputIndex = -1) => {
    if (accountId.value) {
      dispatchSignalSync(doRemoveOutput, accountId.value, txIndex.value, outputIndex);
    }
  };
  const addDonation = () => {
    if (accountId.value) {
      dispatchSignalSync(doAddDonation, accountId.value, txIndex.value);
    }
  };
  const removeDonation = () => {
    if (accountId.value) {
      dispatchSignalSync(doRemoveDonation, accountId.value, txIndex.value);
    }
  };
  const addAuxData = (auxDataJSON, replace) => {
    if (accountId.value) {
      dispatchSignalSync(doAddAuxData, accountId.value, txIndex.value, auxDataJSON, replace);
    }
  };
  const updateRawAuxData = (auxDataJSON) => {
    if (accountId.value && auxDataJSON) {
      if (stagingTxConfig.value && auxDataJSON.metadata && "674" in auxDataJSON.metadata) {
        const meta674 = auxDataJSON.metadata["674"];
        let validCIP20 = true;
        if (getMetadataType(meta674)?.startsWith("map")) {
          let _json = {};
          createJsonFromCborJson(JSON.parse(meta674), _json, void 0, false);
          if ("msg" in _json && Array.isArray(_json.msg)) {
            for (const line of _json.msg) {
              if (typeof line !== "string") {
                validCIP20 = false;
                break;
              }
            }
            if (validCIP20) {
              stagingTxConfig.value.metadata674Lines = _json.msg;
              txMessages.messageInput.value = _json.msg.join("\n");
            }
          } else {
            validCIP20 = false;
          }
        } else {
          validCIP20 = false;
        }
        if (!validCIP20) {
          stagingTxConfig.value.metadata674Lines = [];
        }
        dispatchSignalSync(onTxAuxUpdate);
      }
    }
  };
  const resetAuxDataMessage = (all = false) => {
    if (stagingTxConfig.value) {
      stagingTxConfig.value.metadata674Lines = [];
      stagingTxConfig.value.metadataPassword = "";
      resetMessageInputs();
      if (all) {
        addAuxData(null, true);
      } else if (!!auxData.value?.metadata?.["674"]) {
        const _auxData = auxData.value;
        const metadata = _auxData.metadata;
        delete metadata["674"];
        if (Object.keys(metadata).length === 0) {
          addAuxData(null, true);
        } else {
          addAuxData(_auxData, true);
        }
      }
      dispatchSignalSync(onTxAuxMessageReset, all);
    }
  };
  const toggleDonation = () => {
    if (accountId.value) {
      dispatchSignalSync(doToggleDonation, accountId.value, txIndex.value);
    }
  };
  let _toidJustBuildTx = -1;
  let _toidJustUpdateAccountBalances = -1;
  const sendSignalJustBuildTx = () => {
    if (accountId.value) {
      dispatchSignalSync(doJustBuildTxSend, txIndex.value);
    }
  };
  const sendSignalJustUpdateAccountBalances = () => {
    if (accountId.value) {
      dispatchSignalSyncTo(accountId.value, doUpdateAccountBalances);
    }
  };
  const justBuildTx = () => {
    clearTimeout(_toidJustBuildTx);
    clearTimeout(_toidJustUpdateAccountBalances);
    _toidJustBuildTx = setTimeout(sendSignalJustBuildTx, 333);
  };
  const justUpdateAccountBalances = () => {
    clearTimeout(_toidJustBuildTx);
    clearTimeout(_toidJustUpdateAccountBalances);
    _toidJustUpdateAccountBalances = setTimeout(sendSignalJustUpdateAccountBalances, 333);
  };
  const checkJustBuildTx = () => {
    const txBody = stagingTx.value?.body;
    if (!txBody) {
      return;
    }
    let doBuildTx = true;
    for (const output of txBody.outputs) {
      if (output.amount.coin === "0") {
        doBuildTx = false;
        break;
      }
      if (!output.address) {
        doBuildTx = false;
        break;
      }
    }
    if (doBuildTx) {
      justBuildTx();
    } else {
      justUpdateAccountBalances();
    }
  };
  const buildSignTx = () => {
    if (accountId.value) {
      dispatchSignalSync(doBuildTxSend, txIndex.value);
    }
  };
  watch(accountId, (newValue, oldValue) => {
    resetAuxDataMessage(true);
    addFirstOutput();
  }, { immediate: true });
  const allLinesLessThan64Chars = ref("true");
  const validateMessageInput = async (updateMetadata = true, $t, showError) => {
    if (!stagingTxConfig.value) {
      return;
    }
    let messageLineList = messageInput.value.split("\n");
    const numLines = messageLineList.length;
    let auxDataJSON = auxData.value;
    try {
      if (!checkAndTrimTxMessageLineList(messageLineList)) {
        messageInput.value = "";
        messageInputError.value = "";
      } else if (messageLineList.length !== numLines) {
        messageInput.value = messageLineList.join("\n");
      }
      stagingTxConfig.value.metadata674Lines = messageLineList;
      let encryptionType = void 0;
      if (doEncryptMessage.value) {
        let pw = messagePassword.value;
        if (pw.length === 0) {
          pw = DEFAULT_MSG_PASSWORD;
        }
        stagingTxConfig.value.metadataPassword = pw;
        const encMetadata = await encryptMessage(messageInput.value, pw);
        messageLineList = encMetadata.match(/.{1,64}/g) ?? [];
        encryptionType = "basic";
      } else {
        stagingTxConfig.value.metadataPassword = null;
      }
      const _auxDataJSON = getTxMetadataFromStringArray(messageLineList, 674, encryptionType);
      if (!_auxDataJSON) {
        return;
      }
      if (!!auxDataJSON?.metadata && !!_auxDataJSON?.metadata?.["674"]) {
        auxDataJSON.metadata["674"] = _auxDataJSON.metadata["674"];
      } else {
        auxDataJSON = _auxDataJSON;
      }
      allLinesLessThan64Chars.value = "true";
      messageInputError.value = "";
    } catch (err) {
      console.error(err);
      allLinesLessThan64Chars.value = "";
      messageInputError.value = $t?.("send-options:metadata.error.overflow");
      showError?.(messageInputError.value);
    }
    if (updateMetadata) {
      addAuxData(auxDataJSON, true);
      checkJustBuildTx();
    }
  };
  return {
    accountId,
    accountTxLists: lists,
    accountAssets,
    lockedAvailableBalance,
    availableAccountBalance,
    availableAccountAssets,
    txIndex,
    stagingTx,
    stagingTxConfig,
    numOutputs,
    hasMultipleOutputs,
    builtTx,
    builtTxBalance,
    hasDonation: hasDonation$1,
    auxData,
    chosenInputList,
    txMessages,
    allLinesLessThan64Chars,
    validateMessageInput,
    addOutput,
    addFirstOutput,
    removeOutput,
    addDonation,
    removeDonation,
    addAuxData,
    updateRawAuxData,
    resetAuxDataMessage,
    toggleDonation,
    justBuildTx,
    justUpdateAccountBalances,
    checkJustBuildTx,
    buildSignTx
  };
}

const selectedTxIndex = ref(0);
function useSelectedTxIndex() {
  return {
    selectedTxIndex
  };
}

const showModal$2 = ref(false);
const openModalAddCustomData = async () => {
  showModal$2.value = true;
};
const closeModalAddCustomData = () => {
  showModal$2.value = false;
};
const useModalAddCustomData = () => {
  return {
    showModalAddCustomData: showModal$2,
    openModalAddCustomData,
    closeModalAddCustomData
  };
};

const _sfc_main$r = /* @__PURE__ */ defineComponent({
  __name: "CustomMetadataButton",
  setup(__props) {
    const {
      openModalAddCustomData
    } = useModalAddCustomData();
    const $t = useTranslation().t;
    const { selectedTxIndex } = useSelectedTxIndex();
    const accountTxLists = inject("accountTxLists");
    const { auxData } = useAppAccountTx(accountTxLists, selectedTxIndex);
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_OverlayBadge = resolveComponent("OverlayBadge");
      const _directive_tooltip = resolveDirective("tooltip");
      return openBlock(), createBlock(_component_OverlayBadge, {
        class: "flex et-jc-ic",
        "pt:pcbadge:root:class": !!unref(auxData) ? "" : "hidden",
        severity: "primary"
      }, {
        default: withCtx(() => [
          withDirectives((openBlock(), createBlock(_component_Button, {
            class: "p-0",
            link: "",
            onClick: unref(openModalAddCustomData)
          }, {
            default: withCtx(() => [
              createVNode(IconPencilOutline, { class: "size-5 sm:size-6" })
            ]),
            _: 1
          }, 8, ["onClick"])), [
            [_directive_tooltip, unref($t)("send-options:customMetadata.label") + " - " + unref($t)("send-options:customMetadata.caption")]
          ])
        ]),
        _: 1
      }, 8, ["pt:pcbadge:root:class"]);
    };
  }
});

const _hoisted_1$m = { class: "w-full flex flex-col et-gap-sm" };
const _hoisted_2$e = { class: "flex flex-row et-je-ic et-gap-md" };
const _sfc_main$q = /* @__PURE__ */ defineComponent({
  __name: "InputSelection",
  props: {
    hasSelected: { type: Boolean, required: false, default: false }
  },
  setup(__props) {
    const $t = useTranslation().t;
    const {
      showModal,
      onClose,
      doOpen
    } = useModalOpen();
    const { appAccount } = useSelectedAccount();
    const onReset = () => {
      if (!appAccount.value) {
        return;
      }
      dispatchSignalSyncTo(appAccount.value.id, doClearSelectedUtxos);
    };
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_OverlayBadge = resolveComponent("OverlayBadge");
      const _directive_tooltip = resolveDirective("tooltip");
      return openBlock(), createBlock(_component_OverlayBadge, {
        class: "flex et-jc-ic",
        "pt:pcbadge:root:class": !__props.hasSelected ? "hidden" : "",
        severity: "primary"
      }, {
        default: withCtx(() => [
          withDirectives((openBlock(), createBlock(_component_Button, {
            class: "p-0",
            link: "",
            onClick: unref(doOpen)
          }, {
            default: withCtx(() => [
              createVNode(IconLockClosed, { class: "size-5 sm:size-6" }),
              unref(showModal) ? (openBlock(), createBlock(_sfc_main$x, {
                key: 0,
                "full-width-on-mobile": "",
                "half-wide": "",
                onClose: _cache[1] || (_cache[1] = ($event) => {
                  unref(onClose)();
                })
              }, {
                header: withCtx(({ handleClose }) => [
                  createVNode(_sfc_main$w, {
                    headline: unref($t)("utxoList-page:filter.headline"),
                    caption: unref($t)("utxoList-page:filter.caption"),
                    "hide-back": "",
                    "hide-info": "",
                    showClose: "",
                    onClose: ($event) => handleClose()
                  }, null, 8, ["headline", "caption", "onClose"])
                ]),
                content: withCtx(() => [
                  createBaseVNode("div", _hoisted_1$m, [
                    createVNode(_sfc_main$y, { "show-select": "" })
                  ])
                ]),
                footer: withCtx(({ handleClose }) => [
                  createBaseVNode("div", _hoisted_2$e, [
                    createVNode(_component_Button, {
                      label: unref($t)("common:reset"),
                      severity: "secondary",
                      onClick: _cache[0] || (_cache[0] = ($event) => onReset()),
                      outlined: "",
                      rounded: ""
                    }, null, 8, ["label"]),
                    createVNode(_component_Button, {
                      label: unref($t)("common:apply"),
                      onClick: ($event) => handleClose(),
                      rounded: ""
                    }, null, 8, ["label", "onClick"])
                  ])
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ]),
            _: 1
          }, 8, ["onClick"])), [
            [_directive_tooltip, unref($t)("send-options:is.label") + " - " + unref($t)("send-options:is.caption")]
          ])
        ]),
        _: 1
      }, 8, ["pt:pcbadge:root:class"]);
    };
  }
});

const _sfc_main$p = {  };

const _hoisted_1$l = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  color: "currentColor",
  fill: "none"
};

function _sfc_render$4(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$l, [...(_cache[0] || (_cache[0] = [
    createStaticVNode("<path d=\"M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linejoin=\"round\"></path><path d=\"M20 18C21.1046 18 22 17.1046 22 16C22 14.8954 21.1046 14 20 14C18.8954 14 18 14.8954 18 16C18 17.1046 18.8954 18 20 18Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linejoin=\"round\"></path><path d=\"M11 22C12.1046 22 13 21.1046 13 20C13 18.8954 12.1046 18 11 18C9.89543 18 9 18.8954 9 20C9 21.1046 9.89543 22 11 22Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linejoin=\"round\"></path><path d=\"M15 6C16.1046 6 17 5.10457 17 4C17 2.89543 16.1046 2 15 2C13.8954 2 13 2.89543 13 4C13 5.10457 13.8954 6 15 6Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linejoin=\"round\"></path><path d=\"M4 10C5.10457 10 6 9.10457 6 8C6 6.89543 5.10457 6 4 6C2.89543 6 2 6.89543 2 8C2 9.10457 2.89543 10 4 10Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linejoin=\"round\"></path><path d=\"M14.2983 5.87309L12.7032 10.1268M13.1207 4.68359L5.88086 7.31625M11.7527 13.9847L11.2489 18.0152M13.79 12.8945L18.2115 15.1053M18.1727 16.8124L12.8288 19.1874\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linejoin=\"round\"></path>", 6)
  ]))]))
}
const CollectUTxOIcon = /*#__PURE__*/_export_sfc(_sfc_main$p, [['render',_sfc_render$4]]);

const _sfc_main$o = /* @__PURE__ */ defineComponent({
  __name: "CollectUTxOButton",
  setup(__props) {
    const {
      appAccount,
      accountData
    } = useSelectedAccount();
    const $t = useTranslation().t;
    const {
      showSuccess,
      showInfo,
      showError
    } = useNotifications();
    const { adaCurrency } = useAdaSymbol();
    const doCU = async () => {
      const _appAccount = appAccount.value;
      if (!_appAccount) {
        return;
      }
      try {
        showInfo($t("send-options:cu.notification.start"));
        await sleep(100);
        const res = await dispatchSignal(doBuildTxCU);
        if (res.length > 0 && accountData.value) {
          showSuccess($t("send-options:cu.notification.finish"));
          console.log("IBuiltTxResult[]", res);
          await parseTxSignRequest(_appAccount, "cc", res.map((r) => ({
            cbor: r.txCbor,
            partialSign: false
          })), "cu");
        } else {
          console.log(res);
          showError($t("send-options:cu.notification.error1"));
        }
      } catch (err) {
        console.warn(err);
        if (err === ErrorBuildTx.notNecessaryCU) {
          showInfo($t("send-options:cu.notification.notNecessary"));
        } else {
          showError($t("send-options:cu.notification.error2", { currency: adaCurrency.value }));
        }
      }
    };
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _directive_tooltip = resolveDirective("tooltip");
      return withDirectives((openBlock(), createBlock(_component_Button, {
        class: "p-0",
        link: "",
        onClick: doCU
      }, {
        default: withCtx(() => [
          createVNode(CollectUTxOIcon, { class: "size-5 sm:size-6" })
        ]),
        _: 1
      })), [
        [_directive_tooltip, unref($t)("send-options:cu.label") + " - " + unref($t)("send-options:cu.caption")]
      ]);
    };
  }
});

const _sfc_main$n = {  };

const _hoisted_1$k = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none"
};

function _sfc_render$3(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$k, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      d: "M9 14V10C9 9.44772 8.55228 9 8 9H3C2.44772 9 2 9.44772 2 10V14C2 14.5523 2.44772 15 3 15H8C8.55228 15 9 14.5523 9 14Z",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linejoin": "round"
    }, null, -1),
    createBaseVNode("path", {
      d: "M22 7V3C22 2.44772 21.5523 2 21 2H16C15.4477 2 15 2.44772 15 3V7C15 7.55228 15.4477 8 16 8H21C21.5523 8 22 7.55228 22 7Z",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linejoin": "round"
    }, null, -1),
    createBaseVNode("path", {
      d: "M22 21V17C22 16.4477 21.5523 16 21 16H16C15.4477 16 15 16.4477 15 17V21C15 21.5523 15.4477 22 16 22H21C21.5523 22 22 21.5523 22 21Z",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linejoin": "round"
    }, null, -1),
    createBaseVNode("path", {
      d: "M12 11.999L12 17C12 18.1046 12.8954 19 14 19L15 19M12 11.999L12 6.99998C12 5.89541 12.8954 4.99998 14 4.99998L15 4.99998M12 11.999L9 11.999",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linejoin": "round"
    }, null, -1)
  ]))]))
}
const IconHierarchySquare04 = /*#__PURE__*/_export_sfc(_sfc_main$n, [['render',_sfc_render$3]]);

const storeId$2 = "TokenFragmentationButton";
const _sfc_main$m = /* @__PURE__ */ defineComponent({
  __name: "TokenFragmentationButton",
  setup(__props) {
    const { appAccount } = useSelectedAccount();
    const $t = useTranslation().t;
    const {
      showSuccess,
      showInfo,
      showError
    } = useNotifications();
    const { adaSymbol } = useAdaSymbol();
    const doTF = async () => {
      console.log("start tf");
      showInfo($t("send-options:tf.notification.start"));
      await sleep(100);
      addSignalListener(onBuiltTxTF, storeId$2, (res, error) => {
        removeSignalListener(onBuiltTxTF, storeId$2);
        if (res?.error) {
          let { msg } = getTxBuiltErrorMsg(res ? res.error : { message: $t("send-options:tf.notification.error1") }, 0, { value: 0 }, adaSymbol);
          if (msg.length > 0) {
            if (res.error === ErrorBuildTx.notNecessaryTF) {
              showSuccess(msg);
            } else {
              if (msg.startsWith("Too many assets to send")) {
                msg = $t("send-options:tf.notification.error1") + " (" + msg + ")";
              }
              showError(msg);
            }
          }
          resetAllTx(appAccount.value.id);
        } else if (error) {
          showError(error);
        } else {
          showSuccess($t("send-options:tf.notification.finish"));
        }
      });
      await dispatchSignal(doBuildTxTF);
      removeSignalListener(onBuiltTxTF, "SendOptions");
    };
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _directive_tooltip = resolveDirective("tooltip");
      return withDirectives((openBlock(), createBlock(_component_Button, {
        class: "p-0",
        link: "",
        onClick: doTF
      }, {
        default: withCtx(() => [
          createVNode(IconHierarchySquare04, { class: "size-5 sm:size-6" })
        ]),
        _: 1
      })), [
        [_directive_tooltip, unref($t)("send-options:tf.label") + " - " + unref($t)("send-options:tf.caption")]
      ]);
    };
  }
});

const _sfc_main$l = {  };

const _hoisted_1$j = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  fill: "none"
};

function _sfc_render$2(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$j, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      d: "M18.8578 3.74469C14.8661 1.60383 12 4.7597 12 4.7597C12 4.7597 9.1338 1.60382 5.14211 3.74468C0.307394 6.33768 -0.039777 16.492 12 21C24.0399 16.492 23.6926 6.33769 18.8578 3.74469Z",
      "stroke-width": "1.5",
      "stroke-linecap": "round"
    }, null, -1),
    createBaseVNode("path", {
      d: "M12 9V12M12 12V15M12 12H9M12 12L15 12",
      stroke: "currentColor",
      "stroke-width": "1.5"
    }, null, -1)
  ]))]))
}
const IconHeartOutline = /*#__PURE__*/_export_sfc(_sfc_main$l, [['render',_sfc_render$2]]);

const _sfc_main$k = /* @__PURE__ */ defineComponent({
  __name: "AddDonationButton",
  setup(__props) {
    const accountTxLists = inject("accountTxLists");
    const $t = useTranslation().t;
    const { selectedTxIndex } = useSelectedTxIndex();
    const {
      hasDonation,
      toggleDonation
    } = useAppAccountTx(accountTxLists, selectedTxIndex);
    const { adaCurrency } = useAdaSymbol();
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _directive_tooltip = resolveDirective("tooltip");
      return withDirectives((openBlock(), createBlock(_component_Button, {
        class: "p-0",
        link: "",
        onClick: unref(toggleDonation)
      }, {
        default: withCtx(() => [
          createVNode(IconHeartOutline, {
            class: normalizeClass(["size-5 sm:size-6", !unref(hasDonation) ? "" : "text-txt-highlight"])
          }, null, 8, ["class"])
        ]),
        _: 1
      }, 8, ["onClick"])), [
        [_directive_tooltip, unref($t)("send-options:donation.label", { currency: unref(adaCurrency) }) + " - " + unref($t)("send-options:donation.caption")]
      ]);
    };
  }
});

const _hoisted_1$i = {
  for: "ttlDate",
  class: "pl-1"
};
const ttlWarningTime = 1e3 * 60 * 60 * 24 * 7;
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  __name: "CustomTTLButton",
  setup(__props) {
    const accountTxLists = inject("accountTxLists");
    const $t = useTranslation().t;
    const { formatDatetime } = useFormatter();
    const { showWarning } = useNotifications();
    const { selectedTxIndex } = useSelectedTxIndex();
    const { stagingTx } = useAppAccountTx(accountTxLists, selectedTxIndex);
    const ttlPopover = ref();
    const ttlDate = ref(null);
    const minDate = ref(/* @__PURE__ */ new Date());
    const hasCustomTTL = computed(() => !!stagingTx.value?.body.ttl);
    const customTTLDateString = computed(() => hasCustomTTL.value ? formatDatetime(getTimestampFromSlot(networkId.value, parseInt(stagingTx.value.body.ttl))) : "");
    const onToggleTTL = () => {
      ttlPopover.value?.toggle(event);
    };
    const onTTLUpdate = (_date) => {
      if (!stagingTx.value) {
        return;
      }
      if (!_date) {
        delete stagingTx.value.body.ttl;
        return;
      }
      try {
        const time = _date.getTime();
        stagingTx.value.body.ttl = getCalculatedSlotFromBlockTime(networkId.value, time).toString();
        if (time - Date.now() > ttlWarningTime) {
          showWarning($t("send-options:ttl.long"));
        }
      } catch (e) {
        delete stagingTx.value.body.ttl;
      }
    };
    const onReset = () => {
      ttlDate.value = null;
      if (!stagingTx.value) {
        return;
      }
      delete stagingTx.value.body.ttl;
    };
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_DatePicker = resolveComponent("DatePicker");
      const _component_FloatLabel = resolveComponent("FloatLabel");
      const _component_Popover = resolveComponent("Popover");
      const _directive_tooltip = resolveDirective("tooltip");
      return openBlock(), createElementBlock(Fragment, null, [
        withDirectives((openBlock(), createBlock(_component_Button, {
          class: "p-0",
          link: "",
          onClick: onToggleTTL
        }, {
          default: withCtx(() => [
            createVNode(IconEpochTimer, {
              class: normalizeClass(["size-5 sm:size-6", !hasCustomTTL.value ? "" : "text-txt-highlight"])
            }, null, 8, ["class"])
          ]),
          _: 1
        })), [
          [_directive_tooltip, unref($t)("send-options:ttl.label") + " - " + (hasCustomTTL.value ? customTTLDateString.value : unref($t)("send-options:ttl.caption"))]
        ]),
        createVNode(_component_Popover, {
          ref_key: "ttlPopover",
          ref: ttlPopover
        }, {
          default: withCtx(() => [
            createVNode(_component_FloatLabel, {
              class: "w-full flex et-gap-sm",
              variant: "on"
            }, {
              default: withCtx(() => [
                createVNode(_component_DatePicker, {
                  modelValue: ttlDate.value,
                  "onUpdate:modelValue": [
                    _cache[0] || (_cache[0] = ($event) => ttlDate.value = $event),
                    onTTLUpdate
                  ],
                  class: "w-full",
                  pt: { pcinputtext: { root: "rounded-full" } },
                  inputId: "ttlDate",
                  selectionMode: "single",
                  showIcon: "",
                  showButtonBar: "",
                  manualInput: "",
                  showTime: "",
                  hourFormat: "24",
                  iconDisplay: "input",
                  variant: "filled",
                  minDate: minDate.value
                }, null, 8, ["modelValue", "minDate"]),
                createBaseVNode("label", _hoisted_1$i, toDisplayString(unref($t)("send-options:ttl.label")), 1),
                hasCustomTTL.value ? (openBlock(), createBlock(_component_Button, {
                  key: 0,
                  class: "p-0",
                  link: "",
                  onClick: withModifiers(onReset, ["stop", "prevent"])
                }, {
                  default: withCtx(() => [
                    createVNode(IconCancel01, { class: "size-5 sm:size-6" })
                  ]),
                  _: 1
                })) : createCommentVNode("", true)
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 512)
      ], 64);
    };
  }
});

const showModal$1 = ref(false);
const accountTxOutput$1 = ref(void 0);
const openModalAddOutputDatum = (_accountTxOutput) => {
  accountTxOutput$1.value = _accountTxOutput;
  showModal$1.value = true;
};
const closeModalAddOutputDatum = () => {
  showModal$1.value = false;
  accountTxOutput$1.value = void 0;
};
const useModalAddOutputDatum = () => {
  return {
    accountTxOutput: accountTxOutput$1,
    showModalAddOutputDatum: showModal$1,
    openModalAddOutputDatum,
    closeModalAddOutputDatum
  };
};

const _hoisted_1$h = { class: "w-full flex flex-col et-js-is et-gap-md" };
const _hoisted_2$d = { class: "w-full flex flex-row et-js-ic et-gap-md" };
const _hoisted_3$9 = { class: "grow max-h-64 flex flex-col et-gap-sm" };
const _hoisted_4$7 = {
  key: 0,
  class: "flex flex-col et-js-is et-gap-md"
};
const _hoisted_5$6 = { class: "w-full max-w-full flex flex-col et-gap-sm text-xs text-txt-muted text-start" };
const _hoisted_6$5 = { class: "flex flex-col" };
const _hoisted_7$4 = { class: "flex flex-row et-js-ic et-gap-sm" };
const _hoisted_8$4 = { class: "" };
const _hoisted_9$3 = { class: "truncate" };
const _hoisted_10$3 = { class: "flex flex-col" };
const _hoisted_11$3 = { class: "flex flex-row et-js-ic et-gap-sm" };
const _hoisted_12$3 = { class: "" };
const _hoisted_13$3 = { class: "truncate" };
const _hoisted_14$3 = { class: "flex flex-col" };
const _hoisted_15$3 = { class: "flex flex-row et-js-ic et-gap-sm" };
const _hoisted_16$3 = { class: "" };
const _hoisted_17$2 = { class: "truncate" };
const _hoisted_18$2 = { class: "flex flex-col" };
const _hoisted_19$1 = { class: "flex flex-row et-js-ic et-gap-sm" };
const _hoisted_20$1 = { class: "" };
const _hoisted_21$1 = { key: 1 };
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  __name: "OutputDatumInput",
  props: {
    output: { type: Object, required: true }
  },
  emits: ["updatePlutusData"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const $t = useTranslation().t;
    const datumInput = ref("");
    const datumInputError = ref("");
    const hvb = ref(null);
    const hasInlineDatum = computed(() => !!hvb.value?.value);
    const hasDatumHash = computed(() => !!hvb.value?.hash && !hvb.value?.value);
    const isValid = computed(() => datumInputError.value.length === 0 && !(datumInput.value.length > 0 && !hvb.value?.value));
    const validateDatumInput = (value) => {
      datumInputError.value = "";
      datumInput.value = value;
      hvb.value = null;
      const output = props.output;
      if (!output) {
        return;
      }
      if (value.length === 0) {
        return emit("updatePlutusData", null);
      }
      try {
        if (!isHexString(value)) {
          value = value.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ');
          value = JSON.parse(value);
        } else if (value.length === 64) {
          DataHash.from_bytes(toHexArray(value));
          hvb.value = {
            hash: value,
            bytes: "",
            value: null,
            size: 0
          };
          return emit("updatePlutusData", { DataHash: value });
        }
        hvb.value = getPlutusHVB(value);
        if (hvb.value?.value) {
          return emit("updatePlutusData", { Data: hvb.value.bytes });
        } else {
          return emit("updatePlutusData", null);
        }
      } catch (err) {
        datumInputError.value = getErrorMsg(err);
      }
    };
    const doResetInput = () => {
      datumInput.value = "";
      datumInputError.value = "";
    };
    watch(() => props.output.plutus_data, (value) => {
      if (!value) {
        doResetInput();
      }
    });
    onMounted(() => {
      if (!props.output.plutus_data) {
        return;
      }
      validateDatumInput(Object.values(props.output.plutus_data)[0]);
    });
    onUnmounted(() => {
      doResetInput();
    });
    return (_ctx, _cache) => {
      const _component_Card = resolveComponent("Card");
      return openBlock(), createElementBlock("div", _hoisted_1$h, [
        createBaseVNode("div", _hoisted_2$d, [
          createBaseVNode("div", _hoisted_3$9, [
            createVNode(_sfc_main$v, {
              input: datumInput.value,
              "onUpdate:input": [
                _cache[0] || (_cache[0] = ($event) => datumInput.value = $event),
                _cache[2] || (_cache[2] = ($event) => validateDatumInput($event))
              ],
              error: datumInputError.value,
              "onUpdate:error": _cache[1] || (_cache[1] = ($event) => datumInputError.value = $event),
              placeholder: unref($t)("send-recipient:datum.input.placeholder"),
              "allow-enter": ""
            }, null, 8, ["input", "error", "placeholder"])
          ])
        ]),
        datumInput.value.length > 0 && isValid.value ? (openBlock(), createBlock(_component_Card, {
          key: 0,
          class: "w-full"
        }, {
          content: withCtx(() => [
            hasInlineDatum.value ? (openBlock(), createElementBlock("div", _hoisted_4$7, [
              createTextVNode(toDisplayString(unref($t)("send-recipient:datum.inline")) + " ", 1),
              createBaseVNode("div", _hoisted_5$6, [
                createBaseVNode("div", _hoisted_6$5, [
                  createBaseVNode("div", _hoisted_7$4, [
                    createBaseVNode("div", _hoisted_8$4, toDisplayString(unref($t)("tx-details:plutusscript.hash")), 1),
                    createVNode(_sfc_main$z, {
                      "copy-text": hvb.value.hash,
                      compact: ""
                    }, null, 8, ["copy-text"])
                  ]),
                  createBaseVNode("div", _hoisted_9$3, toDisplayString(hvb.value.hash), 1)
                ]),
                createBaseVNode("div", _hoisted_10$3, [
                  createBaseVNode("div", _hoisted_11$3, [
                    createBaseVNode("div", _hoisted_12$3, toDisplayString(unref($t)("tx-details:plutusscript.size")), 1),
                    createVNode(_sfc_main$z, {
                      "copy-text": hvb.value.size.toString(),
                      compact: ""
                    }, null, 8, ["copy-text"])
                  ]),
                  createBaseVNode("div", _hoisted_13$3, toDisplayString(hvb.value.size), 1)
                ]),
                createBaseVNode("div", _hoisted_14$3, [
                  createBaseVNode("div", _hoisted_15$3, [
                    createBaseVNode("div", _hoisted_16$3, toDisplayString(unref($t)("tx-details:plutusscript.bytes")), 1),
                    createVNode(_sfc_main$z, {
                      "copy-text": hvb.value.bytes,
                      compact: ""
                    }, null, 8, ["copy-text"])
                  ]),
                  createBaseVNode("div", _hoisted_17$2, toDisplayString(hvb.value.bytes), 1)
                ]),
                createBaseVNode("div", _hoisted_18$2, [
                  createBaseVNode("div", _hoisted_19$1, [
                    createBaseVNode("div", _hoisted_20$1, toDisplayString(unref($t)("tx-details:plutusscript.value")), 1),
                    createVNode(_sfc_main$z, {
                      "copy-text": JSON.stringify(hvb.value.value),
                      compact: ""
                    }, null, 8, ["copy-text"])
                  ]),
                  createVNode(_sfc_main$A, {
                    class: "w-full",
                    css: "w-full",
                    data: hvb.value.value,
                    deep: 2
                  }, null, 8, ["data"])
                ])
              ])
            ])) : hasDatumHash.value ? (openBlock(), createElementBlock("div", _hoisted_21$1, toDisplayString(unref($t)("send-recipient:datum.hash")), 1)) : createCommentVNode("", true)
          ]),
          _: 1
        })) : createCommentVNode("", true),
        !isValid.value ? (openBlock(), createBlock(_sfc_main$B, {
          key: 1,
          class: "w-full",
          headline: unref($t)("send-recipient:datum.banner.error.title"),
          caption: datumInputError.value
        }, null, 8, ["headline", "caption"])) : createCommentVNode("", true)
      ]);
    };
  }
});

const _hoisted_1$g = { class: "w-full flex flex-col" };
const _hoisted_2$c = { class: "flex flex-wrap et-je et-gap-sm" };
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "ModalAddOutputDatum",
  setup(__props) {
    const {
      accountTxOutput,
      showModalAddOutputDatum,
      closeModalAddOutputDatum
    } = useModalAddOutputDatum();
    const $t = useTranslation().t;
    const output = computed(() => accountTxOutput.value?.output ?? void 0);
    const doUpdatePlutusData = (data) => {
      if (accountTxOutput.value) {
        accountTxOutput.value.updatePlutusData(data);
      }
    };
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      return unref(showModalAddOutputDatum) ? (openBlock(), createBlock(_sfc_main$x, {
        key: 0,
        "modal-container": "#modal-add-message",
        "half-wide": "",
        "full-width-on-mobile": "",
        onClose: unref(closeModalAddOutputDatum)
      }, {
        header: withCtx(({ handleClose }) => [
          createBaseVNode("div", _hoisted_1$g, [
            createVNode(_sfc_main$w, {
              headline: unref($t)("send-recipient:datum.label"),
              caption: unref($t)("send-recipient:datum.caption"),
              "hide-info": "",
              "hide-back": "",
              "show-close": "",
              onClose: handleClose
            }, null, 8, ["headline", "caption", "onClose"])
          ])
        ]),
        content: withCtx(({ handleClose }) => [
          createVNode(ModalContentCard, null, {
            default: withCtx(() => [
              output.value ? (openBlock(), createBlock(_sfc_main$i, {
                key: 0,
                output: output.value,
                onUpdatePlutusData: doUpdatePlutusData
              }, null, 8, ["output"])) : createCommentVNode("", true)
            ]),
            _: 1
          })
        ]),
        footer: withCtx(({ handleClose }) => [
          createBaseVNode("div", _hoisted_2$c, [
            createVNode(_component_Button, {
              class: "grow sm:grow-0",
              label: unref($t)("common:clear"),
              disabled: !output.value?.plutus_data,
              severity: "secondary",
              rounded: "",
              outlined: "",
              onClick: _cache[0] || (_cache[0] = ($event) => doUpdatePlutusData())
            }, null, 8, ["label", "disabled"]),
            createVNode(_component_Button, {
              class: "grow sm:grow-0",
              label: unref($t)("common:close"),
              disabled: false,
              rounded: "",
              onClick: handleClose
            }, null, 8, ["label", "onClick"])
          ])
        ]),
        _: 1
      }, 8, ["onClose"])) : createCommentVNode("", true);
    };
  }
});

const showModal = ref(false);
const accountTxOutput = ref(void 0);
const openModalAddOutputRefScript = (_accountTxOutput) => {
  accountTxOutput.value = _accountTxOutput;
  showModal.value = true;
};
const closeModalAddOutputRefScript = () => {
  showModal.value = false;
  accountTxOutput.value = void 0;
};
const useModalAddOutputRefScript = () => {
  return {
    accountTxOutput,
    showModalAddOutputRefScript: showModal,
    openModalAddOutputRefScript,
    closeModalAddOutputRefScript
  };
};

const _hoisted_1$f = ["onClick"];
const _hoisted_2$b = { class: "" };
const _hoisted_3$8 = { class: "et-text-sm text-txt-muted" };
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "OutputRefScriptSelector",
  props: {
    "selectedScriptType": { type: String, required: true, default: "plutusV3" },
    "selectedScriptTypeModifiers": {}
  },
  emits: /* @__PURE__ */ mergeModels(["select"], ["update:selectedScriptType"]),
  setup(__props, { emit: __emit }) {
    const selectedScriptType = useModel(__props, "selectedScriptType");
    const $t = useTranslation().t;
    const scriptTypeSelector = ref();
    const toggleMenu = (event) => {
      scriptTypeSelector.value.toggle(event);
    };
    const showSelection = ref(false);
    const scriptTypeOptions = [
      {
        id: "plutusV3",
        label: $t("send-recipient:refscript.selector.plutusV3.label"),
        caption: $t("send-recipient:refscript.selector.plutusV3.caption"),
        command: () => {
          selectedScriptType.value = "plutusV3";
        }
      },
      {
        id: "plutusV2",
        label: $t("send-recipient:refscript.selector.plutusV2.label"),
        caption: $t("send-recipient:refscript.selector.plutusV2.caption"),
        command: () => {
          selectedScriptType.value = "plutusV2";
        }
      },
      {
        id: "plutusV1",
        label: $t("send-recipient:refscript.selector.plutusV1.label"),
        caption: $t("send-recipient:refscript.selector.plutusV1.caption"),
        command: () => {
          selectedScriptType.value = "plutusV1";
        }
      },
      {
        id: "multisig",
        label: $t("send-recipient:refscript.selector.multisig.label"),
        caption: $t("send-recipient:refscript.selector.multisig.caption"),
        command: () => {
          selectedScriptType.value = "multisig";
        }
      }
    ];
    const currentScriptTypeOption = computed(() => scriptTypeOptions.find((s) => s.id === selectedScriptType.value));
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_Menu = resolveComponent("Menu");
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(_component_Button, {
          label: currentScriptTypeOption.value?.label ?? scriptTypeOptions[0].label,
          severity: "secondary",
          outlined: "",
          rounded: "",
          onClick: withModifiers(toggleMenu, ["stop", "prevent"])
        }, null, 8, ["label"]),
        createVNode(_component_Menu, {
          ref_key: "scriptTypeSelector",
          ref: scriptTypeSelector,
          id: "overlay_menu",
          model: scriptTypeOptions,
          popup: true,
          onFocus: _cache[0] || (_cache[0] = ($event) => showSelection.value = true),
          onBlur: _cache[1] || (_cache[1] = ($event) => showSelection.value = false)
        }, {
          item: withCtx(({ item, props }) => [
            createBaseVNode("div", {
              class: normalizeClass(["p-2 flex flex-col cursor-pointer rounded-md", item.id === selectedScriptType.value ? "bg-bg-positive" : ""]),
              onClick: ($event) => _ctx.$emit("select", item.id)
            }, [
              createBaseVNode("span", _hoisted_2$b, toDisplayString(item.label), 1),
              createBaseVNode("span", _hoisted_3$8, toDisplayString(item.caption), 1)
            ], 10, _hoisted_1$f)
          ]),
          _: 1
        }, 512)
      ], 64);
    };
  }
});

const _hoisted_1$e = { class: "w-full flex flex-col et-js-is et-gap-md" };
const _hoisted_2$a = { class: "w-full flex flex-row et-js-ic et-gap-md" };
const _hoisted_3$7 = { class: "grow max-h-64 flex flex-col et-gap-sm" };
const _hoisted_4$6 = { class: "w-full flex flex-row et-js-ic et-gap-md" };
const _hoisted_5$5 = {
  key: 0,
  class: "flex flex-row et-js-ic et-gap-sm"
};
const _hoisted_6$4 = {
  key: 0,
  class: "flex flex-col et-js-is et-gap-md"
};
const _hoisted_7$3 = { class: "w-full max-w-full flex flex-col et-gap-sm text-xs text-txt-muted text-start" };
const _hoisted_8$3 = { class: "flex flex-col" };
const _hoisted_9$2 = { class: "flex flex-row et-js-ic et-gap-sm" };
const _hoisted_10$2 = { class: "" };
const _hoisted_11$2 = { class: "truncate" };
const _hoisted_12$2 = { class: "flex flex-col" };
const _hoisted_13$2 = { class: "flex flex-row et-js-ic et-gap-sm" };
const _hoisted_14$2 = { class: "" };
const _hoisted_15$2 = { class: "truncate" };
const _hoisted_16$2 = {
  key: 0,
  class: "flex flex-col"
};
const _hoisted_17$1 = { class: "flex flex-row et-js-ic et-gap-sm" };
const _hoisted_18$1 = { class: "" };
const _hoisted_19 = { class: "truncate cap-first" };
const _hoisted_20 = {
  key: 1,
  class: "flex flex-col"
};
const _hoisted_21 = { class: "flex flex-row et-js-ic et-gap-sm" };
const _hoisted_22 = { class: "" };
const _hoisted_23 = { class: "truncate" };
const _hoisted_24 = {
  key: 2,
  class: "flex flex-col"
};
const _hoisted_25 = { class: "flex flex-row et-js-ic et-gap-sm" };
const _hoisted_26 = { class: "" };
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "OutputRefScriptInput",
  props: {
    output: { type: Object, required: true }
  },
  emits: ["updateRefScript"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const $t = useTranslation().t;
    const refScriptInput = ref("");
    const refScriptInputError = ref("");
    const scriptType = ref("plutusV3");
    const rawScriptInput = ref(false);
    const script = ref(null);
    const hasNativeScript = computed(() => !!script.value && script.value.type === "multisig");
    const hasPlutusScript = computed(() => !!script.value && script.value.type !== "multisig");
    const isValid = computed(() => refScriptInputError.value.length === 0);
    const validateRefScriptInput = (value, _scriptType) => {
      refScriptInputError.value = "";
      refScriptInput.value = value;
      script.value = null;
      const output = props.output;
      if (!output) {
        return;
      }
      delete output.scriptLanguage;
      if (value.length === 0) {
        return emit("updateRefScript", null);
      }
      if (_scriptType) {
        scriptType.value = _scriptType;
      }
      const free = [];
      try {
        if (scriptType.value === "multisig" || !isHexString(value)) {
          const cslNativeScript = isHexString(value) ? NativeScript.from_bytes(toHexArray(value)) : NativeScript.from_json(value);
          free.push(cslNativeScript);
          const byteCode = toHexString(cslNativeScript.to_bytes());
          const json = getNativeScriptJSONFromHex(byteCode);
          const cslScriptHash = cslNativeScript.hash();
          free.push(cslScriptHash);
          const cred = toHexString(cslScriptHash.to_bytes());
          script.value = {
            hash: cred,
            bytes: byteCode,
            value: json,
            size: cslNativeScript.to_bytes().byteLength,
            type: "multisig"
          };
          scriptType.value = "multisig";
          const cslScriptRef = ScriptRef.new_native_script(cslNativeScript);
          free.push(cslScriptRef);
          return emit("updateRefScript", { NativeScript: json });
        } else {
          let cslPlutusScript;
          const valueBuffer = toHexArray(value);
          if (_scriptType === "plutusV3") {
            cslPlutusScript = rawScriptInput.value ? PlutusScript.new_v3(valueBuffer) : PlutusScript.from_bytes_v3(valueBuffer);
          } else if (_scriptType === "plutusV2") {
            cslPlutusScript = rawScriptInput.value ? PlutusScript.new_v2(valueBuffer) : PlutusScript.from_bytes_v2(valueBuffer);
          } else {
            cslPlutusScript = rawScriptInput.value ? PlutusScript.new(valueBuffer) : PlutusScript.from_bytes(valueBuffer);
          }
          free.push(cslPlutusScript);
          const cslScriptHash = cslPlutusScript.hash();
          free.push(cslScriptHash);
          const cred = toHexString(cslScriptHash.to_bytes());
          const languageVersion = cslPlutusScript.language_version().kind();
          switch (languageVersion) {
            case LanguageKind.PlutusV1:
              scriptType.value = "plutusV1";
              break;
            case LanguageKind.PlutusV2:
              scriptType.value = "plutusV2";
              break;
            case LanguageKind.PlutusV3:
              scriptType.value = "plutusV3";
              break;
            default:
              scriptType.value = "unknown";
          }
          const cborBytes = toHexString(cslPlutusScript.to_bytes());
          script.value = {
            hash: cred,
            bytes: cborBytes,
            value: null,
            size: cslPlutusScript.bytes().byteLength,
            // raw compiled plutus script size without cbor wrapping
            type: scriptType.value
          };
          const cslScriptRef = ScriptRef.new_plutus_script(cslPlutusScript);
          free.push(cslScriptRef);
          return emit("updateRefScript", { PlutusScript: cborBytes }, languageVersion);
        }
      } catch (err) {
        refScriptInputError.value = getErrorMsg(err);
      } finally {
        freeCSLObjects(free);
      }
    };
    const doResetInput = () => {
      refScriptInputError.value = "";
      refScriptInput.value = "";
    };
    const onScriptTypeSelected = (type) => {
      validateRefScriptInput(refScriptInput.value, type);
    };
    watch(() => props.output.script_ref, (value) => {
      if (!value) {
        doResetInput();
      }
    });
    watch(rawScriptInput, () => validateRefScriptInput(refScriptInput.value, scriptType.value));
    onMounted(() => {
      if (!props.output.script_ref) {
        return;
      }
      const free = [];
      try {
        let _scriptType;
        if (!props.output.scriptLanguage) {
          _scriptType = "multisig";
        } else {
          switch (props.output.scriptLanguage) {
            case LanguageKind.PlutusV1:
              _scriptType = "plutusV1";
              break;
            case LanguageKind.PlutusV2:
              _scriptType = "plutusV2";
              break;
            case LanguageKind.PlutusV3:
              _scriptType = "plutusV3";
              break;
          }
        }
        validateRefScriptInput(Object.values(props.output.script_ref)[0], _scriptType);
      } catch (e) {
        console.error(e);
      } finally {
        freeCSLObjects(free);
      }
    });
    onUnmounted(() => {
      doResetInput();
    });
    return (_ctx, _cache) => {
      const _component_ToggleSwitch = resolveComponent("ToggleSwitch");
      const _component_Card = resolveComponent("Card");
      return openBlock(), createElementBlock("div", _hoisted_1$e, [
        createBaseVNode("div", _hoisted_2$a, [
          createBaseVNode("div", _hoisted_3$7, [
            createVNode(_sfc_main$v, {
              input: refScriptInput.value,
              "onUpdate:input": [
                _cache[0] || (_cache[0] = ($event) => refScriptInput.value = $event),
                _cache[2] || (_cache[2] = ($event) => validateRefScriptInput($event, scriptType.value))
              ],
              error: refScriptInputError.value,
              "onUpdate:error": _cache[1] || (_cache[1] = ($event) => refScriptInputError.value = $event),
              placeholder: unref($t)("send-recipient:refscript.input.placeholder"),
              "allow-enter": ""
            }, null, 8, ["input", "error", "placeholder"])
          ])
        ]),
        createBaseVNode("div", _hoisted_4$6, [
          createVNode(_sfc_main$g, {
            "selected-script-type": scriptType.value,
            "onUpdate:selectedScriptType": _cache[3] || (_cache[3] = ($event) => scriptType.value = $event),
            onSelect: onScriptTypeSelected
          }, null, 8, ["selected-script-type"]),
          scriptType.value !== "multisig" ? (openBlock(), createElementBlock("div", _hoisted_5$5, [
            createVNode(_component_ToggleSwitch, {
              modelValue: rawScriptInput.value,
              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => rawScriptInput.value = $event)
            }, null, 8, ["modelValue"]),
            createBaseVNode("span", null, toDisplayString(unref($t)("send-recipient:refscript.input." + (rawScriptInput.value ? "raw" : "cbor"))), 1)
          ])) : createCommentVNode("", true)
        ]),
        refScriptInput.value.length > 0 && isValid.value ? (openBlock(), createBlock(_component_Card, {
          key: 0,
          class: "w-full"
        }, {
          content: withCtx(() => [
            script.value ? (openBlock(), createElementBlock("div", _hoisted_6$4, [
              createTextVNode(toDisplayString(unref($t)(`send-recipient:refscript.${hasPlutusScript.value ? "plutus" : "native"}`)) + " ", 1),
              createBaseVNode("div", _hoisted_7$3, [
                createBaseVNode("div", _hoisted_8$3, [
                  createBaseVNode("div", _hoisted_9$2, [
                    createBaseVNode("div", _hoisted_10$2, toDisplayString(unref($t)("tx-details:plutusscript.hash")), 1),
                    createVNode(_sfc_main$z, {
                      "copy-text": script.value.hash,
                      compact: ""
                    }, null, 8, ["copy-text"])
                  ]),
                  createBaseVNode("div", _hoisted_11$2, toDisplayString(script.value.hash), 1)
                ]),
                createBaseVNode("div", _hoisted_12$2, [
                  createBaseVNode("div", _hoisted_13$2, [
                    createBaseVNode("div", _hoisted_14$2, toDisplayString(unref($t)("tx-details:plutusscript.size")), 1),
                    createVNode(_sfc_main$z, {
                      "copy-text": script.value.size.toString(),
                      compact: ""
                    }, null, 8, ["copy-text"])
                  ]),
                  createBaseVNode("div", _hoisted_15$2, toDisplayString(script.value.size), 1)
                ]),
                hasPlutusScript.value ? (openBlock(), createElementBlock("div", _hoisted_16$2, [
                  createBaseVNode("div", _hoisted_17$1, [
                    createBaseVNode("div", _hoisted_18$1, toDisplayString(unref($t)("tx-details:plutusscript.type")), 1),
                    createVNode(_sfc_main$z, {
                      "copy-text": script.value.type,
                      compact: ""
                    }, null, 8, ["copy-text"])
                  ]),
                  createBaseVNode("div", _hoisted_19, toDisplayString(unref($t)(`send-recipient:refscript.selector.${script.value.type}.label`)), 1)
                ])) : createCommentVNode("", true),
                hasNativeScript.value ? (openBlock(), createElementBlock("div", _hoisted_20, [
                  createBaseVNode("div", _hoisted_21, [
                    createBaseVNode("div", _hoisted_22, toDisplayString(unref($t)("tx-details:plutusscript.bytes")), 1),
                    createVNode(_sfc_main$z, {
                      "copy-text": script.value.bytes,
                      compact: ""
                    }, null, 8, ["copy-text"])
                  ]),
                  createBaseVNode("div", _hoisted_23, toDisplayString(script.value.bytes), 1)
                ])) : createCommentVNode("", true),
                hasNativeScript.value ? (openBlock(), createElementBlock("div", _hoisted_24, [
                  createBaseVNode("div", _hoisted_25, [
                    createBaseVNode("div", _hoisted_26, toDisplayString(unref($t)("tx-details:plutusscript.value")), 1),
                    createVNode(_sfc_main$z, {
                      "copy-text": script.value.value,
                      compact: ""
                    }, null, 8, ["copy-text"])
                  ]),
                  createVNode(_sfc_main$A, {
                    class: "w-full",
                    css: "w-full",
                    data: script.value.value,
                    deep: 0
                  }, null, 8, ["data"])
                ])) : createCommentVNode("", true)
              ])
            ])) : createCommentVNode("", true)
          ]),
          _: 1
        })) : createCommentVNode("", true),
        !isValid.value ? (openBlock(), createBlock(_sfc_main$B, {
          key: 1,
          class: "w-full",
          headline: unref($t)("send-recipient:refscript.banner.error.title"),
          caption: refScriptInputError.value
        }, null, 8, ["headline", "caption"])) : createCommentVNode("", true)
      ]);
    };
  }
});

const _hoisted_1$d = { class: "w-full flex flex-col" };
const _hoisted_2$9 = { class: "flex flex-wrap et-je et-gap-sm" };
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "ModalAddOutputRefScript",
  setup(__props) {
    const {
      accountTxOutput,
      showModalAddOutputRefScript,
      closeModalAddOutputRefScript
    } = useModalAddOutputRefScript();
    const $t = useTranslation().t;
    const output = computed(() => accountTxOutput.value?.output ?? void 0);
    const doUpdateRefScript = (data, languageKind) => {
      if (accountTxOutput.value) {
        accountTxOutput.value.updateRefScript(data, languageKind);
      }
    };
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      return unref(showModalAddOutputRefScript) ? (openBlock(), createBlock(_sfc_main$x, {
        key: 0,
        "modal-container": "#modal-add-message",
        "half-wide": "",
        "full-width-on-mobile": "",
        onClose: unref(closeModalAddOutputRefScript)
      }, {
        header: withCtx(({ handleClose }) => [
          createBaseVNode("div", _hoisted_1$d, [
            createVNode(_sfc_main$w, {
              headline: unref($t)("send-recipient:refscript.label"),
              caption: unref($t)("send-recipient:refscript.caption"),
              "hide-info": "",
              "hide-back": "",
              "show-close": "",
              onClose: handleClose
            }, null, 8, ["headline", "caption", "onClose"])
          ])
        ]),
        content: withCtx(({ handleClose }) => [
          createVNode(ModalContentCard, null, {
            default: withCtx(() => [
              output.value ? (openBlock(), createBlock(_sfc_main$f, {
                key: 0,
                output: output.value,
                onUpdateRefScript: doUpdateRefScript
              }, null, 8, ["output"])) : createCommentVNode("", true)
            ]),
            _: 1
          })
        ]),
        footer: withCtx(({ handleClose }) => [
          createBaseVNode("div", _hoisted_2$9, [
            createVNode(_component_Button, {
              class: "grow sm:grow-0",
              label: unref($t)("common:clear"),
              disabled: !output.value?.script_ref,
              severity: "secondary",
              rounded: "",
              outlined: "",
              onClick: _cache[0] || (_cache[0] = ($event) => doUpdateRefScript())
            }, null, 8, ["label", "disabled"]),
            createVNode(_component_Button, {
              class: "grow sm:grow-0",
              label: unref($t)("common:close"),
              disabled: false,
              rounded: "",
              onClick: handleClose
            }, null, 8, ["label", "onClick"])
          ])
        ]),
        _: 1
      }, 8, ["onClose"])) : createCommentVNode("", true);
    };
  }
});

const _hoisted_1$c = {
  key: 0,
  class: "flex flex-col"
};
const _hoisted_2$8 = { class: "flex flex-row et-jb-ic" };
const _hoisted_3$6 = { class: "" };
const _hoisted_4$5 = {
  key: 0,
  class: "et-js et-pt-sm text-txt-muted et-text-md"
};
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "LockedFundDescription",
  props: {
    id: { type: String, required: true },
    amount: { type: String, required: true },
    showEmpty: { type: Boolean, required: false, default: false }
  },
  setup(__props) {
    const props = __props;
    const $t = useTranslation().t;
    const $exists = useTranslation().i18next.exists;
    const { adaCurrency } = useAdaSymbol();
    const description = computed(() => $exists(`send-funds:${props.id}.info`) ? $t(`send-funds:${props.id}.info`, { currency: adaCurrency.value }) : "");
    const showEmpty = computed(() => props.showEmpty || !isZero(props.amount ?? "0"));
    return (_ctx, _cache) => {
      return showEmpty.value ? (openBlock(), createElementBlock("div", _hoisted_1$c, [
        createBaseVNode("div", _hoisted_2$8, [
          createBaseVNode("div", _hoisted_3$6, toDisplayString(unref($t)("send-funds:" + __props.id + ".label")), 1),
          createVNode(_sfc_main$C, {
            amount: __props.amount,
            "display-decimals": 6,
            "with-sign": false
          }, null, 8, ["amount"])
        ]),
        description.value ? (openBlock(), createElementBlock("div", _hoisted_4$5, toDisplayString(description.value), 1)) : createCommentVNode("", true)
      ])) : createCommentVNode("", true);
    };
  }
});

const _hoisted_1$b = { class: "w-full flex flex-col et-gap-sm" };
const _hoisted_2$7 = { class: "flex flex-col et-gap-sm" };
const _hoisted_3$5 = {
  key: 0,
  class: "w-full flex flex-row et-jb-ic"
};
const _hoisted_4$4 = { class: "w-3/5 flex" };
const _hoisted_5$4 = { class: "w-2/5 flex et-je-ic text-end" };
const _hoisted_6$3 = {
  key: 1,
  class: "flex flex-col et-gap-md"
};
const _hoisted_7$2 = { class: "et-flex flex flex-row et-jb-ic" };
const _hoisted_8$2 = { key: 0 };
const _hoisted_9$1 = { key: 1 };
const _hoisted_10$1 = { class: "flex flex-col et-gap-sm" };
const _hoisted_11$1 = { class: "flex flex-col et-jb et-gap-sm" };
const _hoisted_12$1 = { class: "" };
const _hoisted_13$1 = { class: "" };
const _hoisted_14$1 = { class: "flex flex-row et-jb" };
const _hoisted_15$1 = { key: 0 };
const _hoisted_16$1 = { key: 1 };
const _hoisted_17 = { class: "flex flex-row et-jb et-pt" };
const _hoisted_18 = { class: "" };
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "LockedBalances",
  setup(__props) {
    const $t = useTranslation().t;
    const {
      accountData,
      accountSettings,
      accountBalances
    } = useSelectedAccount();
    const showDescription = ref(false);
    const isTfEnabled = computed(() => accountSettings.isTfEnabled.value);
    const _lockedTotalTF = computed(() => {
      if (isTfEnabled.value) {
        return accountBalances.value?.lockedTotalTF.total ?? "0";
      } else {
        return accountBalances.value?.lockedTotal.total ?? "0";
      }
    });
    const balanceBreakdownParts = computed(() => {
      return [
        { id: "total", amount: accountData.value?.balance.coin ?? "0", color: "#C1C1C1" },
        { id: "selected", amount: accountBalances.value?.selected.total ?? "0", color: "#19c2ff" },
        { id: "rewards", amount: accountData.value?.balance.rewards ?? "0", color: "#19ffa7" },
        { id: "lockedInPendingInputs", amount: accountBalances.value?.pending.coin ?? "0", color: "#acac84" },
        { id: "lockedByCollateral", amount: accountBalances.value?.collateral.coin ?? "0", color: "#44FFF9" },
        { id: "lockedUtxo", amount: accountBalances.value?.locked.coin ?? "0", color: "#226868" },
        { id: "lockedByTokens", amount: accountBalances.value?.lockedByTokens.coin ?? "0", color: "#7188FF" },
        { id: "lockedByTokensTF", amount: accountBalances.value?.lockedByTokensTF.coin ?? "0", color: "#D153D1" },
        { id: "lockedAsRewards", amount: accountBalances.value?.lockedByRewards.total ?? "0", color: "#C1C1C1" },
        { id: "lockedFees", amount: accountBalances.value?.txFees.coin ?? "0", color: "#FF5178" },
        { id: "lockedTotal", amount: _lockedTotalTF.value ?? "0", color: "#FFB719" },
        { id: "available", amount: "0", color: "#8AD3A8" }
      ];
    });
    const getPercentage = (current, max) => {
      if (max === 0) {
        return 0;
      }
      return Math.round(current / max * 1e6) / 1e4;
    };
    const getBalanceMeterConfig = () => {
      const balance = balanceBreakdownParts.value[0];
      const rewards = balanceBreakdownParts.value[1];
      const lockedTotal = balanceBreakdownParts.value[balanceBreakdownParts.value.length - 2];
      const available = balanceBreakdownParts.value[balanceBreakdownParts.value.length - 1];
      const numericTotalAmount = Number(balance.amount) + Number(rewards.amount);
      available.amount = subtract(numericTotalAmount, lockedTotal.amount);
      for (const item of balanceBreakdownParts.value) {
        const numericAmount = Number(item.amount);
        item.percentage = getPercentage(numericAmount, numericTotalAmount);
      }
    };
    const toggleFragmentation = () => {
      accountSettings.toggleTF();
    };
    const toggleDescription = (value) => {
      showDescription.value = value;
    };
    watch(accountBalances, () => {
      getBalanceMeterConfig();
    }, { immediate: true, deep: true });
    return (_ctx, _cache) => {
      const _component_Card = resolveComponent("Card");
      return openBlock(), createElementBlock("div", _hoisted_1$b, [
        unref(accountBalances) ? (openBlock(), createBlock(_component_Card, {
          key: 0,
          pt: {
            content: "flex flex-col et-gap-md"
          }
        }, {
          content: withCtx(() => [
            createBaseVNode("div", _hoisted_2$7, [
              !showDescription.value ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(balanceBreakdownParts.value, (item) => {
                return openBlock(), createElementBlock(Fragment, null, [
                  item.id !== "selected" || item.id === "selected" && item.amount !== "0" ? (openBlock(), createElementBlock("div", _hoisted_3$5, [
                    createBaseVNode("div", _hoisted_4$4, [
                      createBaseVNode("div", {
                        class: "rounded-2xl px-3 py-1 max-w-96 flex",
                        style: normalizeStyle(`min-width: ${Math.ceil(item.percentage ?? 0)}%; background-color: ${item.color};`)
                      }, [
                        createVNode(_sfc_main$F, {
                          amount: item.amount,
                          "with-sign": false,
                          "display-decimals": 6,
                          cssColor: "text-dark"
                        }, null, 8, ["amount"])
                      ], 4)
                    ]),
                    createBaseVNode("div", _hoisted_5$4, toDisplayString(unref($t)("send-funds:" + item.id + ".label")), 1)
                  ])) : createCommentVNode("", true)
                ], 64);
              }), 256)) : (openBlock(), createElementBlock("div", _hoisted_6$3, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(balanceBreakdownParts.value, (item) => {
                  return openBlock(), createBlock(_sfc_main$d, {
                    id: item.id,
                    amount: item.amount,
                    showEmpty: ""
                  }, null, 8, ["id", "amount"]);
                }), 256))
              ]))
            ]),
            createBaseVNode("div", _hoisted_7$2, [
              showDescription.value ? (openBlock(), createElementBlock("div", _hoisted_8$2, toDisplayString(unref($t)("send-funds:toggleInfo.inactive")), 1)) : (openBlock(), createElementBlock("div", _hoisted_9$1, toDisplayString(unref($t)("send-funds:toggleInfo.active")), 1)),
              createVNode(_sfc_main$D, {
                modelValue: showDescription.value,
                "onUpdate:modelValue": [
                  _cache[0] || (_cache[0] = ($event) => showDescription.value = $event),
                  toggleDescription
                ]
              }, null, 8, ["modelValue"])
            ])
          ]),
          _: 1
        })) : createCommentVNode("", true),
        createVNode(_component_Card, null, {
          content: withCtx(() => [
            createBaseVNode("div", _hoisted_10$1, [
              createBaseVNode("div", _hoisted_11$1, [
                createBaseVNode("div", _hoisted_12$1, toDisplayString(unref($t)("send-options:tf.label")), 1),
                createBaseVNode("div", _hoisted_13$1, toDisplayString(unref($t)("send-options:tf.caption")), 1)
              ]),
              createBaseVNode("div", _hoisted_14$1, [
                isTfEnabled.value ? (openBlock(), createElementBlock("span", _hoisted_15$1, toDisplayString(unref($t)("settings-account:tokenFragmentation.setting.enabled")), 1)) : (openBlock(), createElementBlock("span", _hoisted_16$1, toDisplayString(unref($t)("settings-account:tokenFragmentation.setting.disabled")), 1)),
                createVNode(_sfc_main$D, {
                  modelValue: isTfEnabled.value,
                  "onUpdate:modelValue": [
                    _cache[1] || (_cache[1] = ($event) => isTfEnabled.value = $event),
                    toggleFragmentation
                  ]
                }, null, 8, ["modelValue"])
              ]),
              createBaseVNode("div", _hoisted_17, [
                createVNode(_sfc_main$E, { onUpdate: getBalanceMeterConfig })
              ]),
              createBaseVNode("div", _hoisted_18, toDisplayString(unref($t)("settings-account:tokenFragmentation.fragment.info")), 1)
            ])
          ]),
          _: 1
        })
      ]);
    };
  }
});

const storeId$1 = "useAppAccountTxOutput";
function useAppAccountTxOutput(accountTx, outputIndex) {
  const {
    accountTxLists,
    accountId,
    stagingTx,
    stagingTxConfig,
    txIndex,
    availableAccountBalance,
    accountAssets,
    txMessages,
    checkJustBuildTx
  } = accountTx;
  const { coinDecimals } = accountTxLists;
  const output = ref(null);
  const addressResolverSendMode = useAddressResolverSendMode(output);
  const {
    addressResolver
  } = addressResolverSendMode;
  const {
    addrInputError,
    addrInputErrorType,
    resolvedAddr,
    onErrorAddress
  } = addressResolver;
  const maxCoinInput = ref(0);
  const availableOutputBalance = ref(createIBalance());
  const availableOutputAssets = ref({});
  watch(availableAccountBalance, (value) => {
    const ab = availableOutputBalance.value;
    clearBalance(ab);
    if (!value) {
      availableOutputAssets.value = {};
      maxCoinInput.value = 0;
      return;
    }
    addToBalance(ab, value, true, true);
    if (output.value) {
      addValueToValue(ab, output.value.amount);
    }
    updateBalanceTotal(ab);
    availableOutputAssets.value = ab.multiasset ?? {};
    if (isLessThanZero(ab.total)) {
      maxCoinInput.value = 0;
    } else {
      maxCoinInput.value = Number(divide(ab.total, pow(10, coinDecimals.value)));
    }
  }, { immediate: true, deep: true });
  const utxo = computed(() => {
    const _utxo = createIUtxo();
    if (!output.value) {
      return _utxo;
    }
    _utxo.output = output.value;
    return _utxo;
  });
  let _lastUUID = "-1";
  watch(stagingTx, () => {
    const _outputIndex = outputIndex?.value ?? -1;
    if (_outputIndex < 0) {
      return null;
    }
    const body = stagingTx.value?.body;
    if (!body) {
      return null;
    }
    if (body.outputs.length <= _outputIndex) {
      return null;
    }
    const newOutput = body.outputs[_outputIndex];
    if (output.value && !output.value.uuid) {
      output.value.uuid = getRandomId();
    }
    if (newOutput && !newOutput.uuid) {
      newOutput.uuid = getRandomId();
    }
    if (output.value && newOutput && output.value.uuid === newOutput.uuid) {
      return;
    }
    output.value = newOutput;
  }, { immediate: true, deep: true });
  const outputAddress = computed(() => output.value?.address ?? null);
  const outputMultiAsset = computed(() => output.value?.amount.multiasset ?? void 0);
  const outputFull = computed(() => output.value?.isFull ?? false);
  const hasPlutusData = computed(() => !!output.value?.plutus_data);
  const hasRefScript = computed(() => !!output.value?.script_ref);
  const hasOutputAssets = computed(() => Object.keys(outputMultiAsset.value ?? {}).length > 0);
  const hasOutputMultipleAssets = computed(() => Object.keys(outputMultiAsset.value ?? {}).length > 1);
  const hasAvailableAssets = computed(() => Object.keys(availableOutputAssets.value ?? {}).length > 0);
  const _selectedAssetList = ref([]);
  const isDonation$1 = computed(() => isDonation(outputAddress.value));
  const isLargeOutput$1 = computed(() => isLargeOutput(stagingTx.value, outputIndex.value));
  const coinInput = ref(0);
  const coinInputError = ref("");
  const coinInputErrorType = ref("string");
  txMessages.hasMessages;
  const { adaSymbol } = useAdaSymbol();
  const onErrorCoin = (error, type = "translate", storeId2 = "") => {
    if (storeId2) {
      console.log(el(storeId2), sl("onError"), error, type);
    }
    coinInputError.value = "";
    coinInputErrorType.value = type;
    const _error = getTxBuiltErrorMsg(error, outputIndex.value, outputIndex, adaSymbol) || error;
    nextTick(() => {
      coinInputError.value = _error;
    });
  };
  const getCoinFromLovelace = (lovelace) => {
    return parseFloat(lovelace === "0" ? "0" : (Number(lovelace) / 1e6).toFixed(6));
  };
  const updateRefs = () => {
    coinInputError.value = "";
    coinInputErrorType.value = "string";
    if (output.value) {
      const coin = output.value?.amount?.coin ?? "0";
      if (coin === "0") {
        coinInput.value = null;
      } else {
        coinInput.value = getCoinFromLovelace(coin);
      }
    }
  };
  watch(output, (value) => {
    if (!value) {
      return;
    }
    if (value.uuid === _lastUUID) {
      return;
    }
    _lastUUID = value.uuid;
    updateRefs();
  }, { immediate: true });
  watch(outputMultiAsset, (value) => {
    if (!value) {
      _selectedAssetList.value.splice(0);
    } else {
      getSortedAssetDetailsListCached(accountAssets.value, value, _selectedAssetList.value);
    }
  }, { immediate: true, deep: true });
  watch(coinInput, (coin) => {
    if (!output.value) {
      return;
    }
    const _coin = getCoinAmountWithoutDecimals(coin ?? "0");
    updateOutputSize(output.value, false, false);
    coinInputError.value = "";
    coinInputErrorType.value = "string";
    if (!isEqual(_coin, output.value.amount.coin)) {
      output.value.amount.coin = _coin;
    }
  });
  watch(() => output.value?.amount.coin, (coin) => {
    checkJustBuildTx();
  }, { deep: true });
  watch(resolvedAddr, (newVal) => {
    if (!output.value) {
      return;
    }
    output.value.address = newVal ?? "";
    checkJustBuildTx();
  });
  const removeOutput$1 = () => {
    removeOutput(accountId.value, txIndex?.value, outputIndex?.value);
    checkJustBuildTx();
  };
  const removeAsset = (output2, asset) => {
    const multiasset = output2.amount.multiasset;
    if (!multiasset) {
      return;
    }
    const outputAsset = multiasset[asset.p];
    if (!outputAsset) {
      return;
    }
    delete outputAsset[asset.t.a];
    if (Object.keys(outputAsset).length === 0) {
      delete multiasset[asset.p];
    }
    if (Object.keys(multiasset).length === 0) {
      delete output2.amount.multiasset;
    }
  };
  const onAssetUpdate = (type, assetList) => {
    const _output = output.value;
    if (!_output) {
      return;
    }
    const epochParams = checkEpochParams(networkId.value);
    if (!epochParams) {
      return;
    }
    const _minUtxoValue = getMinUtxo(_output, epochParams.utxoCostPerSize, epochParams.isAtLeastBabbageEra, void 0, false);
    const _isMinUtxoValue = compare(_output.amount.coin, "<=", _minUtxoValue);
    if (type === "reset") {
      delete _output.amount.multiasset;
      updateOutputSize(_output, false, _isMinUtxoValue, _isMinUtxoValue);
      checkJustBuildTx();
      return;
    } else if (type === "delete") {
      for (const asset of assetList) {
        removeAsset(_output, asset);
      }
      updateOutputSize(_output, false, _isMinUtxoValue, _isMinUtxoValue);
      checkJustBuildTx();
      return;
    }
    const outputCopy = cloneTransactionOutputJSON(_output);
    let cannotAdd = false;
    for (const asset of assetList) {
      const quantity = asset.a;
      if (isZero(quantity)) {
        removeAsset(_output, asset);
        removeAsset(outputCopy, asset);
        continue;
      }
      const policyId = asset.p;
      const assetName = asset.t.a;
      cannotAdd = tryAddAsset(_output, outputCopy, epochParams, policyId, assetName, quantity);
      if (cannotAdd) {
        break;
      }
    }
    updateOutputSize(_output, cannotAdd, true, _isMinUtxoValue);
    checkJustBuildTx();
    return cannotAdd;
  };
  const setLovelace = (lovelace) => {
    coinInput.value = getCoinAmountWithDecimals(lovelace);
  };
  const setMinUtxoValueForLovelace = () => {
    const epochParams = checkEpochParams(networkId.value);
    if (!epochParams) {
      return false;
    }
    const _output = output.value;
    if (!_output) {
      return;
    }
    const _minUtxoValue = getMinUtxo(_output, epochParams.utxoCostPerSize, epochParams.isAtLeastBabbageEra, void 0, false);
    coinInput.value = getCoinAmountWithDecimals(_minUtxoValue);
  };
  const tryAddAllMultiasset = (_output, assets) => {
    const epochParams = checkEpochParams(networkId.value);
    if (!epochParams) {
      return false;
    }
    const _minUtxoValue = getMinUtxo(_output, epochParams.utxoCostPerSize, epochParams.isAtLeastBabbageEra, void 0, false);
    const _isMinUtxoValue = compare(_output.amount.coin, "<=", _minUtxoValue);
    const outputCopy = cloneTransactionOutputJSON(_output);
    const policyIdList = Object.keys(assets);
    let cannotAdd = false;
    for (const policyId of policyIdList) {
      const entryList = Object.entries(assets[policyId]);
      for (const entry of entryList) {
        const assetName = entry[0];
        const quantity = entry[1];
        if (isZero(quantity)) {
          continue;
        }
        cannotAdd = tryAddAsset(_output, outputCopy, epochParams, policyId, assetName, quantity);
        if (cannotAdd) {
          break;
        }
      }
      if (cannotAdd) {
        break;
      }
    }
    updateOutputSize(_output, cannotAdd, true, _isMinUtxoValue);
    checkJustBuildTx();
    return cannotAdd;
  };
  const addAllAssets = () => {
    const _output = output.value;
    if (!_output) {
      return;
    }
    return tryAddAllMultiasset(_output, availableOutputAssets.value);
  };
  const addAllAssetsOnPage = (multiasset) => {
    const _output = output.value;
    if (!_output) {
      return;
    }
    return tryAddAllMultiasset(_output, multiasset);
  };
  const addAllFilteredAssets = addAllAssetsOnPage;
  const addPrefilledAssets = addAllAssetsOnPage;
  const tryAddAsset = (output2, outputCopy, epochParams, policyId, assetName, quantity) => {
    let cannotAdd = false;
    const amountCopy = outputCopy.amount;
    if (!amountCopy.multiasset) {
      amountCopy.multiasset = {};
    }
    if (!amountCopy.multiasset[policyId]) {
      amountCopy.multiasset[policyId] = {};
    }
    amountCopy.multiasset[policyId][assetName] = quantity;
    updateOutputSize(outputCopy, false);
    if (outputCopy.valueSize < epochParams.maxValueSize) {
      const amount = output2.amount;
      if (!amount.multiasset) {
        amount.multiasset = {};
      }
      if (!amount.multiasset[policyId]) {
        amount.multiasset[policyId] = {};
      }
      amount.multiasset[policyId][assetName] = quantity;
    } else {
      cannotAdd = true;
    }
    return cannotAdd;
  };
  const resetCoinError = () => {
    coinInputError.value = "";
    coinInputErrorType.value = "string";
  };
  const updateOutputSize = (output2, cannotAddMore, updateMinUTxOValue = true, forceMinUTxOValue = false) => {
    const epochParams = checkEpochParams(networkId.value);
    if (!epochParams) {
      return;
    }
    const minUtxoValue = getMinUtxo(output2, epochParams.utxoCostPerSize, epochParams.isAtLeastBabbageEra, void 0, updateMinUTxOValue);
    if (forceMinUTxOValue) {
      if (Object.keys(output2.amount.multiasset ?? {}).length === 0 && !output2.plutus_data && !output2.script_ref) {
        output2.amount.coin = "0";
        getMinUtxo(output2, epochParams.utxoCostPerSize, epochParams.isAtLeastBabbageEra, void 0, false);
      } else {
        output2.amount.coin = minUtxoValue;
        getMinUtxo(output2, epochParams.utxoCostPerSize, epochParams.isAtLeastBabbageEra, void 0, updateMinUTxOValue);
      }
    } else if (!updateMinUTxOValue) {
      if (!isZero(output2.amount.coin) && compare(output2.amount.coin, "<", minUtxoValue)) {
        onErrorCoin(ErrorBuildTx.valueTooLow + "." + outputIndex.value + "." + divide(minUtxoValue, Math.pow(10, getNetworkDecimals(networkId.value))).replace(".", ","), "translate", storeId$1);
      } else {
        resetCoinError();
      }
    } else {
      resetCoinError();
    }
    output2.isFull = cannotAddMore;
  };
  const onMaxCoinInput = () => {
    if (stagingTxConfig.value) {
      stagingTxConfig.value.maxCoinOutputIndex = outputIndex.value;
    }
  };
  const getCoinAmountWithoutDecimals = (amountWithDecimals) => {
    const d = coinDecimals.value;
    if (d === 0) {
      return amountWithDecimals.toString();
    }
    const _d = pow(10, d);
    return multiply(amountWithDecimals, _d);
  };
  const getCoinAmountWithDecimals = (amountWithoutDecimals) => {
    const d = coinDecimals.value;
    if (d === 0) {
      return bigToNum(amountWithoutDecimals.toString());
    }
    const _d = pow(10, d);
    return bigToNum(divide(amountWithoutDecimals, _d));
  };
  const _onBuiltTxSend = async (res, _txIndex) => {
    if (!res) {
      return;
    }
    if (res.error) {
      return _onTxBuiltError(res.error, _txIndex);
    }
    coinInputError.value = "";
    coinInputErrorType.value = "string";
    addrInputError.value = "";
    addrInputErrorType.value = "string";
    await nextTick();
    const _outputList = res.builtTx?.body.outputs ?? [];
    for (let i = 0; i < _outputList.length; i++) {
      const output2 = _outputList[i];
      if (outputIndex.value === i) {
        let coin = output2.amount?.coin ?? "0";
        if (coin === "0") {
          if (coinInput.value !== void 0) {
            coinInput.value = null;
          }
        } else {
          const _coin = getCoinFromLovelace(coin);
          if (coinInput.value !== _coin) {
            coinInput.value = _coin;
          }
        }
      }
    }
  };
  const _onTxBuiltError = (err, _txIndex, _outputIndex) => {
    const hasZeroCoin = isZero(output.value?.amount.coin ?? "0");
    const hasAddress = !!outputAddress.value;
    if (err && !_outputIndex) {
      const errArr = typeof err === "string" ? err.split(".") : [];
      if (errArr.length > 2) {
        _outputIndex = parseInt(errArr[2]);
      }
    }
    if (_txIndex === txIndex.value && _outputIndex === outputIndex.value) {
      if (!hasAddress) {
        onErrorAddress(ErrorBuildTx.missingAddress + "." + outputIndex.value, "translate", outputIndex.value, storeId$1);
      }
      if (hasZeroCoin) {
        onErrorCoin(ErrorBuildTx.valueIsZero + "." + outputIndex.value, "translate", storeId$1);
      }
      if (err?.startsWith(ErrorBuildTx.valueTooLow)) {
        onErrorCoin(err, "translate", storeId$1);
      }
      return;
    }
    if (err) {
      onErrorCoin(err, "translate", storeId$1);
    }
  };
  const _doSelectAddressBookEntry = (name) => {
    if (!name) {
      return;
    }
    if (!output.value) {
      return;
    }
    if (outputIndex.value !== 0) {
      return;
    }
    addressResolverSendMode.doSelectAddressBookEntry(name);
  };
  const updatePlutusData = (data) => {
    const _output = output.value;
    if (!_output) {
      return;
    }
    const epochParams = checkEpochParams(networkId.value);
    if (!epochParams) {
      return false;
    }
    const _minUtxoValue = getMinUtxo(_output, epochParams.utxoCostPerSize, epochParams.isAtLeastBabbageEra, void 0, false);
    const _isMinUtxoValue = compare(_output.amount.coin, "<=", _minUtxoValue);
    if (!data) {
      delete _output.plutus_data;
    } else {
      _output.plutus_data = data;
    }
    updateOutputSize(_output, false, true, _isMinUtxoValue);
    checkJustBuildTx();
  };
  const updateRefScript = (data, languageKind) => {
    const _output = output.value;
    if (!_output) {
      return;
    }
    const epochParams = checkEpochParams(networkId.value);
    if (!epochParams) {
      return false;
    }
    const _minUtxoValue = getMinUtxo(_output, epochParams.utxoCostPerSize, epochParams.isAtLeastBabbageEra, void 0, false);
    const _isMinUtxoValue = compare(_output.amount.coin, "<=", _minUtxoValue);
    if (!data) {
      delete _output.scriptLanguage;
      delete _output.script_ref;
    } else {
      if (!languageKind) {
        delete _output.scriptLanguage;
      } else {
        _output.scriptLanguage = languageKind;
      }
      _output.script_ref = data;
    }
    updateOutputSize(_output, false, true, _isMinUtxoValue);
    checkJustBuildTx();
  };
  watch(outputIndex, (newValue, oldValue) => {
    removeSignalListener(onBuiltTxSend, storeId$1 + "-" + oldValue);
    removeSignalListener(doSelectAddressBookEntry, storeId$1 + "-" + oldValue);
    addSignalListener(onBuiltTxSend, storeId$1 + "-" + newValue, _onBuiltTxSend);
    addSignalListener(doSelectAddressBookEntry, storeId$1 + "-" + newValue, _doSelectAddressBookEntry);
  }, { immediate: true });
  onUnmounted(() => {
    removeSignalListener(onBuiltTxSend, storeId$1 + "-" + outputIndex.value);
    removeSignalListener(doSelectAddressBookEntry, storeId$1 + "-" + outputIndex.value);
  });
  return {
    accountId,
    accountTx,
    outputIndex,
    output,
    addressResolverSendMode,
    utxo,
    availableOutputBalance,
    availableOutputAssets,
    maxCoinInput,
    outputAddress,
    outputMultiAsset,
    hasPlutusData,
    hasRefScript,
    hasOutputAssets,
    hasOutputMultipleAssets,
    hasAvailableAssets,
    outputSelectedAssetList: _selectedAssetList,
    outputFull,
    isDonation: isDonation$1,
    isLargeOutput: isLargeOutput$1,
    coinInput,
    coinInputError,
    coinInputErrorType,
    onErrorCoin,
    getCoinFromLovelace,
    updatePlutusData,
    updateRefScript,
    setLovelace,
    setMinUtxoValueForLovelace,
    removeOutput: removeOutput$1,
    addAllAssets,
    addAllAssetsOnPage,
    addAllFilteredAssets,
    addPrefilledAssets,
    onAssetUpdate,
    getCoinAmountWithoutDecimals,
    getCoinAmountWithDecimals,
    onMaxCoinInput
  };
}

const _sfc_main$b = {  };

const _hoisted_1$a = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none"
};

function _sfc_render$1(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$a, [...(_cache[0] || (_cache[0] = [
    createStaticVNode("<ellipse cx=\"12\" cy=\"5\" rx=\"8\" ry=\"3\" stroke=\"currentColor\" stroke-width=\"1.5\"></ellipse><path d=\"M7 10.842C7.60158 11.0229 8.27434 11.1718 9 11.282\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\"></path><path d=\"M20 12C20 13.6569 16.4183 15 12 15C7.58172 15 4 13.6569 4 12\" stroke=\"currentColor\" stroke-width=\"1.5\"></path><path d=\"M7 17.842C7.60158 18.0229 8.27434 18.1718 9 18.282\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\"></path><path d=\"M20 5V19C20 20.6569 16.4183 22 12 22C7.58172 22 4 20.6569 4 19V5\" stroke=\"currentColor\" stroke-width=\"1.5\"></path>", 5)
  ]))]))
}
const IconDatabase = /*#__PURE__*/_export_sfc(_sfc_main$b, [['render',_sfc_render$1]]);

const _sfc_main$a = {  };

const _hoisted_1$9 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none"
};

function _sfc_render(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$9, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      d: "M20 15.0057V10.6606C20 9.84276 20 9.43383 19.8478 9.06613C19.6955 8.69843 19.4065 8.40927 18.8284 7.83096L14.0919 3.09236C13.593 2.59325 13.3436 2.3437 13.0345 2.19583C12.9702 2.16508 12.9044 2.13778 12.8372 2.11406C12.5141 2 12.1614 2 11.4558 2C8.21082 2 6.58831 2 5.48933 2.88646C5.26731 3.06554 5.06508 3.26787 4.88607 3.48998C4 4.58943 4 6.21265 4 9.45908V14.0052C4 17.7781 4 19.6645 5.17157 20.8366C6.11466 21.7801 7.52043 21.9641 10 22M13 2.50022V3.00043C13 5.83009 13 7.24492 13.8787 8.12398C14.7574 9.00304 16.1716 9.00304 19 9.00304H19.5",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, -1),
    createBaseVNode("path", {
      d: "M14.3267 22L13.1155 20.9142C12.3718 20.2475 12 19.9142 12 19.5C12 19.0858 12.3718 18.7525 13.1155 18.0858L14.3267 17M17.6733 22L18.8845 20.9142C19.6282 20.2475 20 19.9142 20 19.5C20 19.0858 19.6282 18.7525 18.8845 18.0858L17.6733 17",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, -1)
  ]))]))
}
const IconFileScript = /*#__PURE__*/_export_sfc(_sfc_main$a, [['render',_sfc_render]]);

const _hoisted_1$8 = { class: "flex flex-row et-gap-sm pt-2" };
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "OutputInputCoin",
  props: {
    maxCoinInput: { type: Number, required: true }
  },
  setup(__props) {
    const accountTxOutput = inject("accountTxOutput");
    const $t = useTranslation().t;
    const {
      width,
      isSmallerThanXXXS,
      isSmallerThanMD
    } = useScreenSize();
    const { accountSettings } = useBuildAccount();
    const isSendAllEnabled = accountSettings.isSendAllEnabled;
    const {
      utxo,
      isDonation,
      coinInput,
      getCoinAmountWithoutDecimals,
      getCoinAmountWithDecimals,
      onMaxCoinInput
    } = accountTxOutput;
    const coin = computed(() => utxo.value?.output.amount.coin ?? "0");
    const amount = computed(() => coin.value);
    const hasAmount = computed(() => isGreaterThanZero(amount.value ?? "0"));
    const networkDecimals = computed(() => getNetworkDecimals(networkId.value));
    const popoverCoin = ref();
    const showPopoverCoin = (event) => {
      coinInput.value = getCoinAmountWithDecimals(amount.value);
      popoverCoin.value?.show(event);
    };
    const hidePopoverCoin = (event) => popoverCoin.value?.hide(event);
    const onCoinUpdate = (event) => {
      coinInput.value = event;
    };
    const alignPopover = () => {
      if (popoverCoin.value?.visible) {
        popoverCoin.value.alignOverlay();
      }
    };
    const onEnterCoin = (event) => hidePopoverCoin(event);
    watch(width, () => {
      popoverCoin.value?.hide();
    });
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_Popover = resolveComponent("Popover");
      return openBlock(), createBlock(_component_Button, {
        class: "p-0 flex flex-row et-jc-ic et-gap-xs rounded-full! shadow-xs shadow-dark/25",
        size: unref(isSmallerThanMD) ? "small" : void 0,
        text: "",
        onClick: showPopoverCoin
      }, {
        default: withCtx(() => [
          createBaseVNode("div", {
            class: normalizeClass(["w-full flex flex-row et-jb-ic et-gap-sme rounded-full", hasAmount.value ? "" : "pl-3 et-bg-highlight et-bg-highlight-hover"])
          }, [
            !hasAmount.value ? (openBlock(), createBlock(IconPencil, {
              key: 0,
              class: "size-5"
            })) : createCommentVNode("", true),
            createVNode(_sfc_main$C, {
              class: normalizeClass(unref(isSmallerThanXXXS) ? "px-2!" : unref(isSmallerThanMD) ? "py-1!" : "py-2!"),
              amount: amount.value,
              "css-background-positive": !hasAmount.value ? "bg-bg-app/25 px-4!" : "bg-bg-positive/90",
              "css-background-negative": !hasAmount.value ? "bg-bg-app/25 px-4!" : "bg-bg-negative/90",
              "css-background-neutral": !hasAmount.value ? "bg-bg-app/25 px-4!" : "bg-bg-neutral/100",
              "css-text-positive": !hasAmount.value ? "text-sm md:text-md" : "et-text-gradient-positive",
              "css-text-negative": !hasAmount.value ? "text-sm md:text-md" : "et-text-gradient-negative",
              "css-text-neutral": !hasAmount.value ? "text-sm md:text-md" : "",
              "display-decimals": 10,
              "with-sign": false,
              "trim-fraction": true,
              "clipboard-enabled": false
            }, null, 8, ["class", "amount", "css-background-positive", "css-background-negative", "css-background-neutral", "css-text-positive", "css-text-negative", "css-text-neutral"])
          ], 2),
          createVNode(_component_Popover, {
            ref_key: "popoverCoin",
            ref: popoverCoin
          }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_1$8, [
                createVNode(_sfc_main$G, {
                  model: unref(coinInput),
                  "onUpdate:model": _cache[0] || (_cache[0] = ($event) => isRef(coinInput) ? coinInput.value = $event : null),
                  "min-coin-input": 0,
                  "max-coin-input": __props.maxCoinInput,
                  "asset-decimals": networkDecimals.value,
                  "is-donation": unref(isDonation),
                  "is-send-all-enabled": unref(isSendAllEnabled),
                  autofocus: "",
                  "onUpdate:value": _cache[1] || (_cache[1] = ($event) => onCoinUpdate($event)),
                  onAlignPopover: alignPopover,
                  onKeydown: _cache[2] || (_cache[2] = withKeys(($event) => onEnterCoin($event), ["enter"])),
                  onMax: unref(onMaxCoinInput)
                }, null, 8, ["model", "max-coin-input", "asset-decimals", "is-donation", "is-send-all-enabled", "onMax"]),
                createVNode(_component_Button, {
                  class: "px-4",
                  label: unref($t)("common:clear"),
                  severity: "secondary",
                  rounded: "",
                  outlined: "",
                  onClick: _cache[3] || (_cache[3] = ($event) => coinInput.value = 0)
                }, null, 8, ["label"])
              ])
            ]),
            _: 1
          }, 512)
        ]),
        _: 1
      }, 8, ["size"]);
    };
  }
});

const _hoisted_1$7 = { class: "w-full relative flex flex-col sm:flex sm:flex-row et-gap-xs" };
const _hoisted_2$6 = { class: "pl-1.5 pr-1 -mt-1 sm:mt-2 sm:px-0 flex flex-row sm:flex sm:flex-col et-jb-ic sm:et-js-ic et-gap-md" };
const _hoisted_3$4 = { class: "w-6.5 sm:mt-1 font-semibold text-center" };
const _hoisted_4$3 = { class: "w-full flex flex-col et-js-is et-gap-md" };
const _hoisted_5$3 = { class: "w-full flex flex-row et-js-is et-gap-sm sm:et-gap-md" };
const _hoisted_6$2 = { class: "flex et-je" };
const _hoisted_7$1 = {
  key: 0,
  class: "w-full flex flex-wrap et-js-ic et-gap-sm"
};
const _hoisted_8$1 = {
  key: 1,
  class: "w-full max-w-full relative flex flex-row flex-wrap et-je-is et-gap-sm"
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "OutputListItemV1",
  props: {
    outputIndex: { type: Number, required: true },
    txIndex: { type: Number, required: true },
    disabled: { type: Boolean, required: false, default: false }
  },
  setup(__props) {
    const accountTx = inject("accountTx");
    const storeId = "output-" + getRandomId();
    const props = __props;
    const {
      txIndex,
      outputIndex
    } = toRefs(props);
    const $t = useTranslation().t;
    const {
      isSmallerThanXL,
      isSmallerThanMD,
      isSmallerThanSM
    } = useScreenSize();
    const { isProMode } = useAppMode();
    const accountTxOutput = useAppAccountTxOutput(accountTx, outputIndex);
    const { openModalAddAsset } = useModalAddAsset();
    const {
      openModalAddOutputDatum
    } = useModalAddOutputDatum();
    const {
      openModalAddOutputRefScript
    } = useModalAddOutputRefScript();
    const {
      hasMultipleOutputs,
      accountAssets
    } = accountTx;
    const {
      addressResolverSendMode,
      maxCoinInput,
      outputMultiAsset,
      hasPlutusData,
      hasRefScript,
      hasOutputAssets,
      hasOutputMultipleAssets,
      hasAvailableAssets,
      outputFull,
      coinInputError,
      removeOutput,
      onAssetUpdate
    } = accountTxOutput;
    const { addressResolver } = addressResolverSendMode;
    const {
      addrInputError,
      addrInputErrorType
    } = addressResolver;
    const isInput = ref(false);
    const couldNotAddAllPaymentRequestAssets = ref(false);
    const isWarning = ref(false);
    const alignError = ref("right");
    const errorMsg = ref("");
    watch([addrInputError, coinInputError], () => {
      if (typeof addrInputError.value === "object") {
        isWarning.value = !!addrInputError.value.isWarning;
        if (addrInputErrorType.value === "translate") {
          errorMsg.value = $t(addrInputError.value.msg);
        } else {
          errorMsg.value = addrInputError.value.msg;
        }
        alignError.value = "left";
        console.warn("watch: error:", errorMsg.value);
      } else if (typeof addrInputError.value === "string" && addrInputError.value.length > 0) {
        isWarning.value = false;
        if (addrInputErrorType.value === "translate") {
          errorMsg.value = $t(addrInputError.value);
        } else {
          errorMsg.value = addrInputError.value;
        }
        alignError.value = "left";
      } else if (typeof coinInputError.value === "object") {
        isWarning.value = !!coinInputError.value.isWarning;
        errorMsg.value = coinInputError.value.msg;
        alignError.value = "right";
      } else {
        isWarning.value = false;
        errorMsg.value = addrInputError.value || coinInputError.value || "";
        alignError.value = "left";
      }
    });
    const openModalTogglePopup = (policy, name, resetFilter = false) => {
      openModalAddAsset(accountTxOutput, policy, name, true);
    };
    const checkSendParams = (state) => {
      couldNotAddAllPaymentRequestAssets.value = false;
      if (outputIndex.value !== 0 || txIndex.value !== 0) {
        return;
      }
      const sendInfo = state?.sendInfo;
      const paymentData = state?.paymentData;
      if (!sendInfo && !paymentData) {
        return;
      }
      if (sendInfo) {
        if (sendInfo.name) {
          addressResolverSendMode.doSelectAddressBookEntry(sendInfo.name);
        } else if (sendInfo.p && sendInfo.h) {
          openModalTogglePopup(sendInfo.p, sendInfo.h, true);
        }
      } else if (paymentData) {
        addressResolverSendMode.onSelectAddress(paymentData.address);
        let addedAssets = false;
        if (paymentData.assetList && paymentData.assetList.length > 0) {
          const multiAsset = {};
          for (const asset of paymentData.assetList) {
            let policyId = asset.p;
            let assetName = asset.h;
            if (asset.f) {
              const knownAsset = getAssetByFingerprint(asset.f);
              if (knownAsset) {
                policyId = knownAsset.p;
                assetName = knownAsset.t.a;
              }
            }
            if (policyId && typeof assetName === "string") {
              if (includesMultiAsset(accountAssets.value, policyId, assetName)) {
                addMultiAssets(multiAsset, { [policyId]: { [assetName]: asset.q } });
                addedAssets = true;
              } else {
                couldNotAddAllPaymentRequestAssets.value = true;
              }
            } else {
              couldNotAddAllPaymentRequestAssets.value = true;
            }
          }
          if (addedAssets) {
            accountTxOutput.addPrefilledAssets(multiAsset);
          }
        }
        let amount = paymentData.amount;
        if (!amount || amount === "" || amount === "0") {
          if (addedAssets) {
            accountTxOutput.setMinUtxoValueForLovelace();
          } else {
            accountTxOutput.setLovelace("0");
          }
        } else {
          accountTxOutput.setLovelace(amount);
        }
      }
      delete window.history.state.sendInfo;
      delete window.history.state.paymentData;
    };
    const doOpenModalOutputDatum = () => {
      openModalAddOutputDatum(accountTxOutput);
    };
    const doOpenModalOutputRefScript = () => {
      openModalAddOutputRefScript(accountTxOutput);
    };
    const contextMenuItems = computed(() => {
      let _contextMenuItems = [];
      if (isProMode.value) {
        _contextMenuItems.push({
          id: "datum",
          icon: markRaw(IconDatabase),
          label: $t("send-recipient:contextmenu.datum"),
          fn: doOpenModalOutputDatum,
          highlighted: hasPlutusData.value
        });
        _contextMenuItems.push({
          id: "refscript",
          icon: markRaw(IconFileScript),
          label: $t("send-recipient:contextmenu.refscript"),
          fn: doOpenModalOutputRefScript,
          highlighted: hasRefScript.value
        });
        _contextMenuItems.push(
          {
            id: "advanced-divider",
            divider: true,
            show: hasMultipleOutputs.value
          }
        );
      }
      if (hasMultipleOutputs.value) {
        _contextMenuItems.push({
          id: "delete",
          icon: markRaw(IconDelete02),
          label: $t("send-recipient:contextmenu.delete"),
          fn: removeOutput
        });
      }
      return _contextMenuItems;
    });
    onMounted(() => {
      checkSendParams(window.history.state);
      addSignalListener(onNavigateToSend, storeId, checkSendParams);
    });
    onUnmounted(() => {
      removeSignalListener(onNavigateToSend, storeId);
    });
    provide("accountTxOutput", accountTxOutput);
    return (_ctx, _cache) => {
      const _component_Divider = resolveComponent("Divider");
      const _component_Button = resolveComponent("Button");
      const _component_Card = resolveComponent("Card");
      const _directive_tooltip = resolveDirective("tooltip");
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(_component_Card, {
          class: "relative w-full",
          pt: {
            content: "flex flex-col @outputitem"
          }
        }, {
          content: withCtx(() => [
            createBaseVNode("div", _hoisted_1$7, [
              createBaseVNode("div", _hoisted_2$6, [
                createBaseVNode("div", _hoisted_3$4, toDisplayString(unref(outputIndex) + 1), 1),
                contextMenuItems.value.length > 0 ? (openBlock(), createBlock(_sfc_main$H, {
                  key: 0,
                  items: contextMenuItems.value
                }, null, 8, ["items"])) : createCommentVNode("", true)
              ]),
              !unref(isSmallerThanSM) ? (openBlock(), createBlock(_component_Divider, {
                key: 0,
                class: "ml-2 mr-3 opacity-50",
                layout: "vertical"
              })) : createCommentVNode("", true),
              createBaseVNode("div", _hoisted_4$3, [
                createBaseVNode("div", _hoisted_5$3, [
                  createVNode(_sfc_main$I, {
                    addressResolverSendMode: unref(addressResolverSendMode),
                    disabled: __props.disabled
                  }, createSlots({ _: 2 }, [
                    !unref(isSmallerThanXL) ? {
                      name: "coinAndDelete",
                      fn: withCtx(() => [
                        createBaseVNode("div", _hoisted_6$2, [
                          createVNode(_sfc_main$9, { "max-coin-input": unref(maxCoinInput) }, null, 8, ["max-coin-input"])
                        ])
                      ]),
                      key: "0"
                    } : void 0,
                    unref(hasAvailableAssets) && !unref(isSmallerThanXL) ? {
                      name: "addAssets",
                      fn: withCtx(() => [
                        withDirectives(createVNode(_component_Button, {
                          label: !unref(hasOutputAssets) ? unref($t)("assets:button.addAssets.label") : unref($t)("assets:button.editAssets.label"),
                          size: unref(isSmallerThanMD) ? "small" : void 0,
                          class: "shadow-xs shadow-dark/25",
                          severity: "secondary",
                          rounded: "",
                          outlined: "",
                          onClick: _cache[0] || (_cache[0] = ($event) => openModalTogglePopup())
                        }, null, 8, ["label", "size"]), [
                          [_directive_tooltip, !unref(hasOutputAssets) ? unref($t)("assets:button.addAssets.tooltip") : unref($t)("assets:button.editAssets.tooltip")]
                        ])
                      ]),
                      key: "1"
                    } : void 0,
                    unref(hasAvailableAssets) && !unref(isSmallerThanXL) ? {
                      name: "addAssets2",
                      fn: withCtx(() => [
                        withDirectives(createVNode(_component_Button, {
                          label: !unref(hasOutputAssets) ? unref($t)("assets:button.addAssets.label") : unref($t)("assets:button.editAssets.label"),
                          size: unref(isSmallerThanMD) ? "small" : void 0,
                          class: "shadow-sm shadow-dark/25",
                          severity: "secondary",
                          rounded: "",
                          outlined: "",
                          onClick: _cache[1] || (_cache[1] = ($event) => openModalTogglePopup())
                        }, null, 8, ["label", "size"]), [
                          [_directive_tooltip, !unref(hasOutputAssets) ? unref($t)("assets:button.addAssets.tooltip") : unref($t)("assets:button.editAssets.tooltip")]
                        ])
                      ]),
                      key: "2"
                    } : void 0
                  ]), 1032, ["addressResolverSendMode", "disabled"])
                ]),
                unref(isSmallerThanXL) ? (openBlock(), createElementBlock("div", _hoisted_7$1, [
                  createVNode(_sfc_main$9, {
                    class: "xs:grow-0",
                    "max-coin-input": unref(maxCoinInput)
                  }, null, 8, ["max-coin-input"]),
                  unref(hasAvailableAssets) ? withDirectives((openBlock(), createBlock(_component_Button, {
                    key: 0,
                    label: !unref(hasOutputAssets) ? unref($t)("assets:button.addAssets.label") : unref($t)("assets:button.editAssets.label"),
                    size: unref(isSmallerThanMD) ? "small" : void 0,
                    class: "shrink-0 xs:grow-0 shadow-sm shadow-dark/25",
                    severity: "secondary",
                    rounded: "",
                    outlined: "",
                    onClick: _cache[2] || (_cache[2] = ($event) => openModalTogglePopup())
                  }, null, 8, ["label", "size"])), [
                    [_directive_tooltip, !unref(hasOutputAssets) ? unref($t)("assets:button.addAssets.tooltip") : unref($t)("assets:button.editAssets.tooltip")]
                  ]) : createCommentVNode("", true)
                ])) : createCommentVNode("", true),
                unref(outputMultiAsset) && unref(hasOutputAssets) ? (openBlock(), createElementBlock("div", _hoisted_8$1, [
                  createVNode(_sfc_main$J, {
                    "multi-asset": unref(outputMultiAsset),
                    "is-input": isInput.value,
                    "amount-to-show": 7,
                    removable: "",
                    onAssetUpdate: unref(onAssetUpdate)
                  }, null, 8, ["multi-asset", "is-input", "onAssetUpdate"]),
                  unref(hasOutputMultipleAssets) ? (openBlock(), createBlock(_component_Button, {
                    key: 0,
                    class: "whitespace-nowrap text-xs",
                    size: unref(isSmallerThanMD) ? "small" : void 0,
                    label: unref($t)("common:removeAll"),
                    severity: "secondary",
                    rounded: "",
                    outlined: "",
                    onClick: _cache[3] || (_cache[3] = withModifiers(($event) => unref(onAssetUpdate)("reset", []), ["stop", "prevent"]))
                  }, null, 8, ["size", "label"])) : createCommentVNode("", true)
                ])) : createCommentVNode("", true),
                unref(outputFull) ? (openBlock(), createBlock(_sfc_main$K, {
                  key: 2,
                  class: "w-full",
                  headline: unref($t)("send-recipient:banner.outputFull.title"),
                  caption: unref($t)("send-recipient:banner.outputFull.text"),
                  toggleable: "",
                  collapsed: ""
                }, {
                  icon: withCtx(() => [
                    createVNode(IconAlert02, { class: "shrink-0 grow-0 w-5 sm:w-6 fill-none" })
                  ]),
                  _: 1
                }, 8, ["headline", "caption"])) : createCommentVNode("", true),
                couldNotAddAllPaymentRequestAssets.value ? (openBlock(), createBlock(_sfc_main$L, {
                  key: 3,
                  class: "w-full",
                  headline: unref($t)("send-recipient:banner.couldNotAddAllPaymentRequestAssets.title"),
                  caption: unref($t)("send-recipient:banner.couldNotAddAllPaymentRequestAssets.text")
                }, null, 8, ["headline", "caption"])) : createCommentVNode("", true)
              ])
            ])
          ]),
          _: 1
        }),
        errorMsg.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(["w-full -mt-12 px-card py-1 rounded-b-lg border", isWarning.value ? "bg-bg-warning border-border-warning text-txt-warning" : "bg-bg-negative border-border-negative text-txt-negative"])
        }, [
          createBaseVNode("div", {
            class: normalizeClass(["w-auto mt-7 pt-0.5 flex flex-row et-ic et-gap-sm", alignError.value === "left" ? "et-js" : "et-je"])
          }, [
            createVNode(IconAlert02, { class: "w-4 h-4" }),
            createBaseVNode("div", null, toDisplayString(errorMsg.value), 1)
          ], 2)
        ], 2)) : createCommentVNode("", true)
      ], 64);
    };
  }
});

const _hoisted_1$6 = { class: "w-full flex flex-col et-js-is et-gap-md" };
const _hoisted_2$5 = { class: "w-full flex flex-row et-js-ic et-gap-md" };
const _hoisted_3$3 = { class: "grow flex flex-col et-gap-sm" };
const _hoisted_4$2 = { class: "w-full h-10 pl-0.5 flex flex-row et-js-ic et-gap-md" };
const _hoisted_5$2 = { class: "whitespace-nowrap" };
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "SendMetadataInput",
  setup(__props) {
    const accountTx = inject("accountTx");
    const $t = useTranslation().t;
    const { showError } = useNotifications();
    const {
      txMessages,
      allLinesLessThan64Chars,
      validateMessageInput
    } = accountTx;
    const {
      messageInput,
      messageInputError,
      doEncryptMessage,
      messagePassword,
      messagePasswordError,
      messagePasswordDefault
    } = txMessages;
    const onPasswordUpdate = () => validateMessageInput(true, $t, showError);
    const onToggledEncrypt = () => validateMessageInput(true, $t, showError);
    watch(messageInput, () => validateMessageInput(true, $t, showError), { immediate: true });
    return (_ctx, _cache) => {
      const _component_ToggleSwitch = resolveComponent("ToggleSwitch");
      return openBlock(), createElementBlock("div", _hoisted_1$6, [
        createBaseVNode("div", _hoisted_2$5, [
          createBaseVNode("div", _hoisted_3$3, [
            createVNode(_sfc_main$v, {
              input: unref(messageInput),
              "onUpdate:input": [
                _cache[0] || (_cache[0] = ($event) => isRef(messageInput) ? messageInput.value = $event : null),
                _cache[3] || (_cache[3] = ($event) => unref(validateMessageInput)(true))
              ],
              error: unref(messageInputError),
              "onUpdate:error": _cache[1] || (_cache[1] = ($event) => isRef(messageInputError) ? messageInputError.value = $event : null),
              success: unref(allLinesLessThan64Chars),
              "onUpdate:success": _cache[2] || (_cache[2] = ($event) => isRef(allLinesLessThan64Chars) ? allLinesLessThan64Chars.value = $event : null),
              placeholder: unref($t)("send-options:metadata.placeholder"),
              "allow-enter": ""
            }, null, 8, ["input", "error", "success", "placeholder"])
          ])
        ]),
        createBaseVNode("div", _hoisted_4$2, [
          createBaseVNode("span", _hoisted_5$2, toDisplayString(unref($t)("send-options:metadata.enableEncryption")), 1),
          createVNode(_component_ToggleSwitch, {
            modelValue: unref(doEncryptMessage),
            "onUpdate:modelValue": [
              _cache[4] || (_cache[4] = ($event) => isRef(doEncryptMessage) ? doEncryptMessage.value = $event : null),
              onToggledEncrypt
            ],
            class: "shrink-0 grow-0",
            "aria-label": unref($t)("send-options:metadata.enableEncryption")
          }, null, 8, ["modelValue", "aria-label"]),
          unref(doEncryptMessage) ? (openBlock(), createBlock(_sfc_main$M, {
            key: 0,
            input: unref(messagePassword),
            "onUpdate:input": [
              _cache[5] || (_cache[5] = ($event) => isRef(messagePassword) ? messagePassword.value = $event : null),
              onPasswordUpdate
            ],
            "input-error": unref(messagePasswordError),
            "onUpdate:inputError": _cache[6] || (_cache[6] = ($event) => isRef(messagePasswordError) ? messagePasswordError.value = $event : null),
            autofocus: "",
            "skip-validation": "",
            meter: false,
            placeholder: unref(messagePasswordDefault),
            "pre-filled-password": unref(messagePassword)
          }, null, 8, ["input", "input-error", "placeholder", "pre-filled-password"])) : createCommentVNode("", true)
        ])
      ]);
    };
  }
});

const _hoisted_1$5 = { class: "flex flex-col et-gap-md" };
const _hoisted_2$4 = { class: "text-txt-muted whitespace-break-spaces" };
const _hoisted_3$2 = { class: "flex flex-wrap et-je et-gap-sm" };
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "PopoverAddMessage",
  setup(__props, { expose: __expose }) {
    const $t = useTranslation().t;
    const accountTx = inject("accountTx");
    const popover = ref();
    const { resetAuxDataMessage } = accountTx;
    const doClear = () => resetAuxDataMessage();
    const showPopover = (event) => popover.value?.show(event);
    const hidePopover = () => popover.value?.hide();
    __expose({ showPopover, hidePopover });
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_Popover = resolveComponent("Popover");
      return openBlock(), createBlock(_component_Popover, {
        ref_key: "popover",
        ref: popover
      }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1$5, [
            createBaseVNode("span", _hoisted_2$4, toDisplayString(unref($t)("send-options:metadata.caption")), 1),
            createVNode(_sfc_main$7),
            createBaseVNode("div", _hoisted_3$2, [
              createVNode(_component_Button, {
                class: "grow sm:grow-0",
                label: unref($t)("common:clear"),
                severity: "secondary",
                onClick: doClear,
                outlined: "",
                rounded: ""
              }, null, 8, ["label"]),
              createVNode(_component_Button, {
                class: "grow sm:grow-0",
                label: unref($t)("common:close"),
                severity: "secondary",
                onClick: hidePopover,
                outlined: "",
                rounded: ""
              }, null, 8, ["label"])
            ])
          ])
        ]),
        _: 1
      }, 512);
    };
  }
});

const _hoisted_1$4 = { class: "" };
const _hoisted_2$3 = { class: "" };
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "CustomMetadataSchemaSelector",
  props: {
    "selectedSchema": { type: Number, required: true, default: MetadataJsonSchema.NoConversions },
    "selectedSchemaModifiers": {}
  },
  emits: ["update:selectedSchema"],
  setup(__props) {
    const selectedSchema = useModel(__props, "selectedSchema");
    const $t = useTranslation().t;
    const metadataSchemaSelector = ref();
    const toggleMenu = (event) => {
      metadataSchemaSelector.value.toggle(event);
    };
    const showSelection = ref(false);
    const schemaOptions = [
      {
        id: MetadataJsonSchema.NoConversions,
        label: `No Conversions (${$t("common:recommended")})`,
        caption: $t("send-options:customMetadata.schemainfo.NoConversions"),
        command: () => {
          selectedSchema.value = MetadataJsonSchema.NoConversions;
        }
      },
      {
        id: MetadataJsonSchema.BasicConversions,
        label: "Basic Conversions",
        caption: $t("send-options:customMetadata.schemainfo.BasicConversions"),
        command: () => {
          selectedSchema.value = MetadataJsonSchema.BasicConversions;
        }
      },
      {
        id: MetadataJsonSchema.DetailedSchema,
        label: "Detailed Schema",
        caption: $t("send-options:customMetadata.schemainfo.DetailedSchema"),
        command: () => {
          selectedSchema.value = MetadataJsonSchema.DetailedSchema;
        }
      }
    ];
    const currentSchemaOption = computed(() => schemaOptions.find((s) => s.id === selectedSchema.value));
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_Menu = resolveComponent("Menu");
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(_component_Button, {
          label: currentSchemaOption.value?.label ?? schemaOptions[0].label,
          severity: "secondary",
          outlined: "",
          rounded: "",
          onClick: withModifiers(toggleMenu, ["stop", "prevent"])
        }, null, 8, ["label"]),
        createVNode(_component_Menu, {
          ref_key: "metadataSchemaSelector",
          ref: metadataSchemaSelector,
          id: "overlay_menu",
          model: schemaOptions,
          popup: true,
          onFocus: _cache[0] || (_cache[0] = ($event) => showSelection.value = true),
          onBlur: _cache[1] || (_cache[1] = ($event) => showSelection.value = false)
        }, {
          item: withCtx(({ item, props }) => [
            createBaseVNode("div", {
              class: normalizeClass(["p-2 flex flex-col cursor-pointer rounded-md", item.id === selectedSchema.value ? "bg-bg-positive" : ""])
            }, [
              createBaseVNode("span", _hoisted_1$4, toDisplayString(item.label), 1),
              createBaseVNode("span", _hoisted_2$3, toDisplayString(item.caption), 1)
            ], 2)
          ]),
          _: 1
        }, 512)
      ], 64);
    };
  }
});

const _hoisted_1$3 = { class: "w-full flex flex-col et-js-is et-gap-md" };
const _hoisted_2$2 = { class: "w-full flex flex-row et-js-ic et-gap-md" };
const _hoisted_3$1 = { class: "grow flex flex-col et-gap-sm" };
const _hoisted_4$1 = { class: "w-full flex flex-col et-js-is et-gap-md" };
const _hoisted_5$1 = {
  key: 0,
  class: "w-full"
};
const _hoisted_6$1 = {
  key: 0,
  class: "flex flex-wrap et-js-ic p-3 sm:p-4 et-bg-content et-gap-md"
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "SendMetadataInputRaw",
  props: {
    rows: { type: Number, required: false, default: 4 },
    jsonDepth: { type: Number, required: false, default: 0 }
  },
  setup(__props) {
    const storeId = "SendMetadataInputRaw-" + getRandomId();
    const $t = useTranslation().t;
    const accountTx = inject("accountTx");
    const {
      auxData,
      addAuxData,
      updateRawAuxData,
      txMessages
    } = accountTx;
    const min_label = "-" + subtract(pow(2, 64), 1);
    const max_label = abs(min_label);
    const metaSchema = ref(MetadataJsonSchema.NoConversions);
    const metaJson = ref(null);
    const metaInput = ref("");
    const metaInputError = ref("");
    const hasValidMetadata = computed(() => metaJson.value != null && typeof metaJson.value === "object");
    const isValid = computed(() => metaInputError.value.length === 0);
    const validateMetaInput = (value) => {
      if (value && typeof value !== "string") {
        value = value.label;
      }
      metaInputError.value = "";
      metaJson.value = null;
      metaInput.value = value;
      txMessages.resetMessageInputs(false);
      try {
        metaJson.value = JSON.parse(metaInput.value);
      } catch (err) {
        metaInputError.value = $t("send-options:customMetadata.banner.error.json");
        return;
      }
      try {
        for (const label in metaJson.value) {
          if (label.length === 0) {
            throw "";
          }
          if (compare(label, "<", min_label) || compare(label, ">", max_label)) {
            throw "";
          }
        }
      } catch (err) {
        metaInputError.value = $t("send-options:customMetadata.banner.error.label");
        return;
      }
      try {
        const metadataList = [];
        for (const entry of Object.entries(metaJson.value)) {
          metadataList.push(createIMetadata({
            label: entry[0],
            metadatum: entry[1]
          }));
        }
        const auxData2 = getMetadataFromJSON(metadataList, metaSchema.value);
        if (auxData2) {
          const auxDataJson = cslToJson(auxData2.to_json());
          safeFreeCSLObject(auxData2);
          addAuxData(auxDataJson, true);
          updateRawAuxData(auxDataJson);
        }
      } catch (err) {
        metaInputError.value = err?.message ?? JSON.stringify(err);
      }
    };
    function onReset(all) {
      if (all) {
        metaInput.value = "";
        metaInputError.value = "";
      }
    }
    watch(metaSchema, () => {
      if (metaInput.value.length > 0) {
        validateMetaInput(metaInput.value);
      }
    });
    onMounted(() => {
      const txAuxData = auxData.value;
      if (!txAuxData?.metadata) {
        return;
      }
      let _metaInput = {};
      for (const entry of Object.entries(txAuxData.metadata)) {
        if (getMetadataType(entry[1]) === "string" || getMetadataType(entry[1]) === "number") {
          _metaInput[entry[0]] = entry[1];
        } else {
          let _json = {};
          createJsonFromCborJson(JSON.parse(entry[1]), _json, void 0, false);
          _metaInput[entry[0]] = _json;
        }
      }
      metaInput.value = JSON.stringify(_metaInput, null, 2);
      validateMetaInput(metaInput.value);
    });
    onMounted(() => {
      addSignalListener(onTxAuxMessageReset, storeId, onReset);
    });
    onUnmounted(() => {
      removeSignalListener(onTxAuxMessageReset, storeId);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$3, [
        createBaseVNode("div", _hoisted_2$2, [
          createBaseVNode("div", _hoisted_3$1, [
            createVNode(_sfc_main$v, {
              input: metaInput.value,
              "onUpdate:input": [
                _cache[0] || (_cache[0] = ($event) => metaInput.value = $event),
                validateMetaInput
              ],
              error: metaInputError.value,
              "onUpdate:error": _cache[1] || (_cache[1] = ($event) => metaInputError.value = $event),
              placeholder: unref($t)("send-options:customMetadata.placeholder"),
              "allow-enter": ""
            }, null, 8, ["input", "error", "placeholder"])
          ])
        ]),
        createBaseVNode("div", _hoisted_4$1, [
          createVNode(_sfc_main$5, {
            selectedSchema: metaSchema.value,
            "onUpdate:selectedSchema": _cache[2] || (_cache[2] = ($event) => metaSchema.value = $event)
          }, null, 8, ["selectedSchema"]),
          createVNode(_sfc_main$N, {
            url: "https://developers.cardano.org/docs/get-started/cardano-serialization-lib/transaction-metadata/#json-conversion",
            label: unref($t)("send-options:customMetadata.urllabel"),
            "label-c-s-s": ""
          }, null, 8, ["label"])
        ]),
        metaInput.value.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_5$1, [
          isValid.value && hasValidMetadata.value ? (openBlock(), createElementBlock("div", _hoisted_6$1, [
            createTextVNode(toDisplayString(unref($t)("send-options:customMetadata.added")) + " ", 1),
            hasValidMetadata.value ? (openBlock(), createBlock(_sfc_main$A, {
              key: 0,
              class: "w-full",
              css: "w-full",
              deep: __props.jsonDepth,
              data: metaJson.value
            }, null, 8, ["deep", "data"])) : createCommentVNode("", true)
          ])) : (openBlock(), createBlock(_sfc_main$B, {
            key: 1,
            class: "w-full",
            headline: unref($t)("send-options:customMetadata.banner.error.title"),
            caption: metaInputError.value
          }, null, 8, ["headline", "caption"]))
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});

const _hoisted_1$2 = { class: "w-full flex flex-col" };
const _hoisted_2$1 = { class: "flex flex-wrap et-je et-gap-sm" };
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ModalAddCustomData",
  setup(__props) {
    const $t = useTranslation().t;
    const {
      showModalAddCustomData,
      closeModalAddCustomData
    } = useModalAddCustomData();
    const accountTx = inject("accountTx");
    const { resetAuxDataMessage } = accountTx;
    const doClear = () => resetAuxDataMessage(true);
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      return unref(showModalAddCustomData) ? (openBlock(), createBlock(_sfc_main$x, {
        key: 0,
        "modal-container": "#modal-add-message",
        "half-wide": "",
        "full-width-on-mobile": "",
        onClose: unref(closeModalAddCustomData)
      }, {
        header: withCtx(({ handleClose }) => [
          createBaseVNode("div", _hoisted_1$2, [
            createVNode(_sfc_main$w, {
              headline: unref($t)("send-options:customMetadata.label"),
              caption: unref($t)("send-options:customMetadata.caption"),
              "hide-info": "",
              "hide-back": "",
              "show-close": "",
              onClose: handleClose
            }, null, 8, ["headline", "caption", "onClose"])
          ])
        ]),
        content: withCtx(({ handleClose }) => [
          createVNode(ModalContentCard, null, {
            default: withCtx(() => [
              createVNode(_sfc_main$4)
            ]),
            _: 1
          })
        ]),
        footer: withCtx(({ handleClose }) => [
          createBaseVNode("div", _hoisted_2$1, [
            createVNode(_component_Button, {
              class: "grow sm:grow-0",
              label: unref($t)("common:clear"),
              disabled: false,
              severity: "secondary",
              rounded: "",
              outlined: "",
              onClick: doClear
            }, null, 8, ["label"]),
            createVNode(_component_Button, {
              class: "grow sm:grow-0",
              label: unref($t)("common:close"),
              disabled: false,
              rounded: "",
              onClick: handleClose
            }, null, 8, ["label", "onClick"])
          ])
        ]),
        _: 1
      }, 8, ["onClose"])) : createCommentVNode("", true);
    };
  }
});

const _hoisted_1$1 = { class: "flex flex-row et-jb-ic et-gap-sm" };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "SendTxListItemV1",
  props: {
    txIndex: { type: Number, required: true, default: 0 }
  },
  setup(__props) {
    const accountTxLists = inject("accountTxLists");
    const props = __props;
    const { txIndex } = toRefs(props);
    const { resetSignTx } = useSignTx();
    const $t = useTranslation().t;
    const { showError } = useNotifications();
    const { isSmallerThanMD } = useScreenSize();
    const { accountId } = accountTxLists;
    const accountTx = useAppAccountTx(accountTxLists, txIndex);
    const {
      builtTx,
      numOutputs,
      txMessages,
      addOutput,
      addFirstOutput,
      checkJustBuildTx,
      buildSignTx,
      resetAuxDataMessage,
      validateMessageInput
    } = accountTx;
    const { messageInput } = txMessages;
    const popoverAddMessage = ref();
    provide("accountTx", accountTx);
    const { hasMessages } = txMessages;
    const hasBuiltTx = computed(() => builtTx.value !== null && builtTx.value.body.inputs.length > 0);
    watch(accountId, (value) => {
      if (value) {
        dispatchSignalSyncTo(value, doUpdateAccountBalances);
      }
    });
    const storeId = "SendTxListItem-" + getRandomId();
    const addNewOutput = () => {
      addOutput();
    };
    const onAddMessage = (event) => {
      popoverAddMessage.value?.showPopover(event);
    };
    const onSend = async () => {
      if (builtTx.value) {
        buildSignTx();
      } else {
        checkJustBuildTx();
      }
    };
    const removeMessage = () => {
      resetAuxDataMessage();
    };
    watch(accountId, () => {
      addFirstOutput();
    });
    onBeforeMount(() => {
      addFirstOutput();
    });
    const checkSendParams = (state) => {
      if (txIndex.value !== 0) {
        return;
      }
      const paymentData = state?.paymentData;
      if (!paymentData) {
        return;
      }
      if (paymentData.note) {
        messageInput.value = paymentData.note.replace(/(.{64})/g, "$1\n").trim();
      }
    };
    watch(messageInput, () => validateMessageInput(true, $t, showError), { immediate: true });
    onMounted(() => {
      addSignalListener(doRemoveOutput, storeId, () => {
        addFirstOutput();
      });
      addSignalListener(onUpdateTfBundleSize, "", () => {
        checkJustBuildTx();
      });
      checkSendParams(window.history.state);
      addSignalListener(onNavigateToSend, storeId, checkSendParams);
    });
    onUnmounted(() => {
      resetSignTx();
      removeSignalListener(doRemoveOutput, storeId);
      removeSignalListener(onUpdateTfBundleSize, storeId);
      removeSignalListener(onNavigateToSend, storeId);
    });
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_Card = resolveComponent("Card");
      const _directive_tooltip = resolveDirective("tooltip");
      return openBlock(), createElementBlock(Fragment, null, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(numOutputs), (num, outputIndex) => {
          return openBlock(), createBlock(_sfc_main$8, {
            key: "output_" + outputIndex,
            "output-index": outputIndex,
            "tx-index": unref(txIndex)
          }, null, 8, ["output-index", "tx-index"]);
        }), 128)),
        unref(numOutputs) === 0 ? (openBlock(), createBlock(_sfc_main$L, {
          key: 0,
          class: "w-full",
          headline: unref($t)("send-page:banner.recipient.title"),
          caption: unref($t)("send-page:banner.recipient.text"),
          collapsed: ""
        }, null, 8, ["headline", "caption"])) : createCommentVNode("", true),
        unref(hasMessages) ? (openBlock(), createBlock(_component_Card, {
          key: 1,
          pt: { body: "h-full", content: "h-full" },
          class: "w-full"
        }, {
          content: withCtx(() => [
            createBaseVNode("div", _hoisted_1$1, [
              createVNode(_sfc_main$O, {
                "css-text": "",
                "tx-messages": unref(txMessages),
                "font-size": "et-text-md"
              }, null, 8, ["tx-messages"]),
              createVNode(_component_Button, {
                class: "py-1.5",
                severity: "secondary",
                rounded: "",
                text: "",
                onClick: removeMessage
              }, {
                icon: withCtx(() => [
                  createVNode(IconDelete02, { class: "w-5" })
                ]),
                _: 1
              })
            ])
          ]),
          _: 1
        })) : createCommentVNode("", true),
        createVNode(_component_Card, {
          pt: { body: "h-full", content: "h-full max-w-full @container" },
          class: "w-full"
        }, {
          content: withCtx(() => [
            createVNode(ButtonRow, { "align-between": "" }, {
              default: withCtx(() => [
                createVNode(_component_Button, {
                  class: "shrink grow px-4 sm:px-6 shadow-sm shadow-dark/25",
                  size: unref(isSmallerThanMD) ? "small" : void 0,
                  pt: { label: "truncate" },
                  severity: "secondary",
                  label: unref($t)("send-options:metadata.label"),
                  rounded: "",
                  outlined: "",
                  onClick: onAddMessage
                }, {
                  icon: withCtx(() => [
                    createVNode(IconPencil, { class: "size-5" })
                  ]),
                  _: 1
                }, 8, ["size", "label"]),
                createVNode(ButtonRow, { "not-full-width": "" }, {
                  default: withCtx(() => [
                    withDirectives((openBlock(), createBlock(_component_Button, {
                      class: "shrink grow px-4 sm:px-6 shadow-sm shadow-dark/25",
                      size: unref(isSmallerThanMD) ? "small" : void 0,
                      severity: "secondary",
                      label: unref($t)("send-page:button.recipient.label"),
                      rounded: "",
                      outlined: "",
                      onClick: addNewOutput
                    }, {
                      icon: withCtx(() => [
                        createVNode(IconPlusSign, { class: "size-5" })
                      ]),
                      _: 1
                    }, 8, ["size", "label"])), [
                      [_directive_tooltip, unref($t)("send-page:button.recipient.tooltip")]
                    ]),
                    withDirectives(createVNode(_component_Button, {
                      class: "shrink grow px-4 sm:px-6 shadow-sm shadow-dark/25",
                      size: unref(isSmallerThanMD) ? "small" : void 0,
                      label: hasBuiltTx.value ? unref($t)("send-page:button.sign.label") : unref($t)("send-page:button.check.label"),
                      rounded: "",
                      onClick: onSend
                    }, null, 8, ["size", "label"]), [
                      [_directive_tooltip, hasBuiltTx.value ? unref($t)("send-page:button.sign.tooltip") : unref($t)("send-page:button.check.tooltip")]
                    ])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            createVNode(_sfc_main$6, {
              ref_key: "popoverAddMessage",
              ref: popoverAddMessage
            }, null, 512),
            createVNode(_sfc_main$3)
          ]),
          _: 1
        })
      ], 64);
    };
  }
});

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SendTxList",
  setup(__props) {
    const accountTxLists = inject("accountTxLists");
    const {
      stagingTxList,
      resetAllTx
    } = accountTxLists;
    onBeforeMount(() => {
      resetAllTx();
    });
    onUnmounted(() => {
      resetAllTx();
    });
    return (_ctx, _cache) => {
      return openBlock(true), createElementBlock(Fragment, null, renderList(unref(stagingTxList), (tx, txIndex) => {
        return openBlock(), createBlock(_sfc_main$2, {
          key: "tx_" + txIndex,
          "tx-index": txIndex
        }, null, 8, ["tx-index"]);
      }), 128);
    };
  }
});

const _hoisted_1 = { class: "page-send flex flex-col et-max-width-page" };
const _hoisted_2 = { class: "relative w-full flex flex-col et-gap-md" };
const _hoisted_3 = { class: "" };
const _hoisted_4 = { class: "text-txt-muted" };
const _hoisted_5 = {
  key: 0,
  class: "flex flex-col et-js-is et-gap-md"
};
const _hoisted_6 = { class: "flex flex-row flex-wrap et-gap-sm sm:et-gap-md" };
const _hoisted_7 = { class: "h-full w-full sm:w-auto flex flex-row sm:flex sm:flex-col flex-wrap sm:flex-nowrap et-jb-ic sm:et-js-is et-gap-sm" };
const _hoisted_8 = { class: "sm:h-full whitespace-nowrap font-semibold cap-first" };
const _hoisted_9 = { class: "flex flex-col et-jc-is" };
const _hoisted_10 = { class: "h-full w-full sm:w-auto flex flex-row sm:flex sm:flex-col flex-wrap sm:flex-nowrap et-jb-ic sm:et-js-is et-gap-sm" };
const _hoisted_11 = { class: "sm:h-full whitespace-nowrap font-semibold cap-first" };
const _hoisted_12 = { class: "flex flex-col et-jc-is" };
const _hoisted_13 = { class: "h-full w-full sm:w-auto flex flex-row sm:flex sm:flex-col flex-wrap sm:flex-nowrap et-jb-ic sm:et-js-is et-gap-sm sm:et-gap-sm" };
const _hoisted_14 = { class: "sm:h-full et-js-is whitespace-nowrap font-semibold cap-first" };
const _hoisted_15 = { class: "flex flex-col et-jc-is" };
const _hoisted_16 = { class: "h-6 sm:h-8 flex flex-row et-js-ic et-gap-sm sm:et-gap-md text-txt-reduced" };
const storeId = "PageSend";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PageSend",
  setup(__props) {
    const $t = useTranslation().t;
    const { isProMode } = useAppMode();
    const { isSmallerThanXS } = useScreenSize();
    const buildAccountInfo = useBuildAccount();
    const {
      buildAccount,
      accountSettings,
      accountBalances
    } = buildAccountInfo;
    const accountTxLists = useAppAccountTxLists(buildAccountInfo);
    const { accountId } = accountTxLists;
    const isTfEnabled = accountSettings.isTfEnabled;
    const showModal = ref(false);
    const onClose = () => {
      showModal.value = false;
    };
    const openModal = () => {
      showModal.value = true;
    };
    const _fee = ref("0");
    const _lockedAvailable = ref("0");
    const isAvailableProcessing = ref(false);
    const _setOnce = ref(false);
    const hasBalance = computed(() => isGreaterThanZero(accountBalances.value?.account.total ?? "0"));
    const hasSelectedBalance = computed(() => isGreaterThanZero(accountBalances.value?.selected.total ?? "0"));
    computed(() => _setOnce.value && hasBalance.value && isZeroOrLess(_lockedAvailable.value));
    let _toid = -1;
    watch(accountId, (value) => {
      _lockedAvailable.value = "0";
      if (value) {
        setTimeout(() => {
          dispatchSignalSyncTo(value, doUpdateAccountBalances);
        }, 500);
      }
    }, { immediate: true });
    watch(accountBalances, (value) => {
      if (value) {
        const fee = accountBalances.value?.txFees.total ?? "0";
        _fee.value = fee;
        clearTimeout(_toid);
        isAvailableProcessing.value = true;
        if (isTfEnabled.value) {
          _toid = setTimeout(() => {
            _lockedAvailable.value = subtract(accountBalances.value?.lockedAvailableTF.total ?? "0", fee);
            _setOnce.value = true;
            isAvailableProcessing.value = false;
          }, 250);
        } else {
          _toid = setTimeout(() => {
            _lockedAvailable.value = subtract(accountBalances.value?.lockedAvailable.total ?? "0", fee);
            _setOnce.value = true;
            isAvailableProcessing.value = false;
          }, 250);
        }
      }
    }, { immediate: true, deep: true });
    provide("accountTxLists", accountTxLists);
    addSignalListener(onAccountSettingsUpdated, storeId, () => {
      dispatchSignalSyncTo(accountId.value, doUpdateAccountBalances);
    });
    onUnmounted(() => {
      removeSignalListener(onAccountSettingsUpdated, storeId);
    });
    return (_ctx, _cache) => {
      const _component_Card = resolveComponent("Card");
      const _component_Button = resolveComponent("Button");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createVNode(_sfc_main$P, {
            title: unref($t)("send-page:title")
          }, createSlots({
            icon: withCtx(() => [
              createVNode(IconArrowRT, { class: "size-5" })
            ]),
            _: 2
          }, [
            !unref(isSmallerThanXS) ? {
              name: "caption",
              fn: withCtx(() => [
                createBaseVNode("div", _hoisted_3, toDisplayString(unref($t)("send-page:caption")), 1)
              ]),
              key: "0"
            } : void 0,
            !unref(isSmallerThanXS) ? {
              name: "sub-caption",
              fn: withCtx(() => [
                createBaseVNode("div", _hoisted_4, toDisplayString(unref($t)("send-page:subCaption")), 1)
              ]),
              key: "1"
            } : void 0
          ]), 1032, ["title"]),
          unref(buildAccount) ? (openBlock(), createElementBlock("div", _hoisted_5, [
            createBaseVNode("div", _hoisted_6, [
              createVNode(_component_Button, {
                plain: "",
                text: "",
                class: "p-0 grow flex shadow-sm border-0 rounded-2xl",
                onClick: openModal
              }, {
                default: withCtx(() => [
                  createVNode(_component_Card, {
                    class: "grow",
                    pt: {
                      body: "h-full min-w-42",
                      content: "h-full text-txt-reduced"
                    }
                  }, {
                    content: withCtx(() => [
                      createBaseVNode("div", _hoisted_7, [
                        createBaseVNode("div", _hoisted_8, toDisplayString(unref($t)("send-page:info.available")), 1),
                        createBaseVNode("div", _hoisted_9, [
                          isAvailableProcessing.value && _lockedAvailable.value === "0" ? (openBlock(), createBlock(IconSpinner, {
                            key: 0,
                            class: "size-8 animate-spin self-center"
                          })) : (openBlock(), createBlock(_sfc_main$C, {
                            key: 1,
                            amount: _lockedAvailable.value,
                            "with-sign": false,
                            "clipboard-Enabled": false
                          }, null, 8, ["amount"]))
                        ])
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_Card, {
                class: "grow",
                pt: {
                  body: "h-full min-w-42",
                  content: "h-full text-txt-reduced"
                }
              }, {
                content: withCtx(() => [
                  createBaseVNode("div", _hoisted_10, [
                    createBaseVNode("div", _hoisted_11, toDisplayString(unref($t)("send-page:info.txFee")), 1),
                    createBaseVNode("div", _hoisted_12, [
                      createBaseVNode("div", null, [
                        createVNode(_sfc_main$C, {
                          amount: unref(neg)(_fee.value),
                          "with-sign": false
                        }, null, 8, ["amount"])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_Card, {
                class: "grow",
                pt: {
                  body: "h-full min-w-42",
                  content: "h-full text-txt-reduced"
                }
              }, {
                content: withCtx(() => [
                  createBaseVNode("div", _hoisted_13, [
                    createBaseVNode("div", _hoisted_14, toDisplayString(unref($t)("send-page:info.options")), 1),
                    createBaseVNode("div", _hoisted_15, [
                      createBaseVNode("div", _hoisted_16, [
                        unref(isProMode) ? (openBlock(), createBlock(_sfc_main$o, { key: 0 })) : createCommentVNode("", true),
                        unref(isProMode) ? (openBlock(), createBlock(_sfc_main$m, { key: 1 })) : createCommentVNode("", true),
                        unref(isProMode) ? (openBlock(), createBlock(_sfc_main$q, {
                          key: 2,
                          "has-selected": hasSelectedBalance.value
                        }, null, 8, ["has-selected"])) : createCommentVNode("", true),
                        unref(isProMode) ? (openBlock(), createBlock(_sfc_main$r, { key: 3 })) : createCommentVNode("", true),
                        createVNode(_sfc_main$k),
                        createVNode(_sfc_main$s),
                        unref(isProMode) ? (openBlock(), createBlock(_sfc_main$j, { key: 4 })) : createCommentVNode("", true)
                      ])
                    ])
                  ])
                ]),
                _: 1
              })
            ]),
            createVNode(_sfc_main$1)
          ])) : createCommentVNode("", true)
        ]),
        createVNode(_sfc_main$h),
        createVNode(_sfc_main$e),
        showModal.value ? (openBlock(), createBlock(_sfc_main$x, {
          key: 0,
          narrow: "",
          "full-width-on-mobile": "",
          "full-height-on-mobile": "",
          onClose
        }, {
          header: withCtx(({ handleClose }) => [
            createVNode(_sfc_main$w, {
              headline: unref($t)("send-funds:title"),
              "hide-back": "",
              "hide-info": "",
              "show-close": "",
              onClose: handleClose
            }, null, 8, ["headline", "onClose"])
          ]),
          content: withCtx(() => [
            createVNode(ModalContentCard, null, {
              default: withCtx(() => [
                createVNode(_sfc_main$c)
              ]),
              _: 1
            })
          ]),
          _: 1
        })) : createCommentVNode("", true)
      ]);
    };
  }
});

export { _sfc_main as default };
