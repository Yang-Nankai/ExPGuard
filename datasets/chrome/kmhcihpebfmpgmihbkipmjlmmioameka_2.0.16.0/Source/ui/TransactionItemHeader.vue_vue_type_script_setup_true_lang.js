import { a as addContractBadge, b as addPropBadge, d as createSubmitBadge, e as createRemoveBadge, C as CONTRACT_BADGE } from './Badge.vue_vue_type_script_setup_true_lang.js';
import { u as useAppMode } from './useAppMode.js';
import { u as useTxMessage, I as IconArrowRT } from './TransactionItemMessages.vue_vue_type_script_setup_true_lang.js';
import { D as computed, cL as timestamp, P as networkId, e as ref, G as watch, aJ as toHexString, ck as toHexBuffer, N as nextTick, bc as watchEffect, f as onMounted, aE as addSignalListener, cv as onTxNoteAdded, cu as onTxNoteUpdated, cw as onTxNoteDeleted, k as onUnmounted, aF as removeSignalListener, m as createElementBlock, o as openBlock, p as createBaseVNode, d as defineComponent, w as useTranslation, x as useScreenSize, t as createCommentVNode, n as createVNode, ai as Transition, y as withCtx, u as unref, c as createBlock, V as normalizeClass, B as toDisplayString, a1 as withDirectives, a2 as resolveDirective, U as withModifiers, z as resolveComponent } from './index.js';
import { a as getCalculatedChainTip, g as getTimestampFromSlot, f as getEpochFromSlot } from './chain.js';
import { c as chainTip } from './chainTip.js';
import { u as useFormatter } from './useFormatter.js';
import { n as networkIdList } from './NetworkId.js';
import { a4 as getUtxoHash, br as NativeScripts, bv as jsonToCsl, O as cslToJson, s as safeFreeCSLObject, y as getPlutusHVB, V as getAddressCredentials, bM as PlutusScripts, P as PlutusScript, bo as getCSLVkeywitnessHash, bN as isOnChainState, bO as isInvalidState, bP as isSubmittedState, bQ as isSignedState, bR as loadUtxoSpentList, bG as getAllInputUtxoHashList, bH as loadUnknownUtxos, B as createIUtxo, f as freeCSLObjects, a3 as createIUtxoFromIUtxoDetails, a5 as ITxBalanceType, be as CertificateKind, bl as getGovProposalId, az as getDRepAddressFromKeyHash, L as LanguageKind, bS as TransactionNoteDB } from './app2.js';
import { g as getTransactionFromCbor } from './useSignTx.js';
import { r as round, j as add, m as multiply, f as isGreaterThanZero } from './bigmath.js';
import { c as checkEpochParams, M as syncEpochParams, g as getRandomId, u as useSelectedAccount } from './epochParams.js';
import { u as useWitnesses } from './creds.js';
import { l as loadTxCbor, c as loadTxByron } from './TransactionAssetList.vue_vue_type_script_setup_true_lang.js';
import { i as useSubmitTx } from './useSubmitTx.js';
import { t as createIAssetListItemDetails } from './useAppAccountBalances.js';
import { g as govActionList } from './govActionList.js';
import { d as dRepList } from './useSelectedAccount.js';
import './MilkomedaDB.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper.js';
import { I as IconArrowLB } from './IconArrowLB.js';
import { I as IconAlert02 } from './IconAlert02.js';
import { _ as _sfc_main$6 } from './FiatAmount.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$5 } from './AdaAmount.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$4 } from './Badges.vue_vue_type_script_setup_true_lang.js';

const useTxHash = (txBalance, tx) => {
  const txHash = computed(() => tx && tx?.value ? tx.value?.hash : txBalance.value ? txBalance.value.hash : "unknown");
  return {
    txHash
  };
};

const {
  formatRemainingTime
} = useFormatter();
const useTxTTL = (txBalance, tx) => {
  const ttl = computed(() => tx.value ? parseInt(tx.value?.body.ttl ?? "0") : 0);
  const doesNotExpire = computed(() => ttl.value === 0);
  const currentSlot = computed(() => {
    timestamp.value;
    return getCalculatedChainTip(networkId.value);
  });
  const remainingSeconds = computed(() => ttl.value - currentSlot.value);
  const validFor = computed(() => {
    if (ttl.value <= 0) {
      return "unlimited";
    }
    if (remainingSeconds.value <= 0) {
      return "expired";
    } else {
      return formatRemainingTime(remainingSeconds.value);
    }
  });
  const blockTime = computed(() => {
    if (!txBalance.value) {
      return null;
    }
    if (txBalance.value.slot <= 0) {
      return null;
    }
    return new Date(getTimestampFromSlot(networkId.value, txBalance.value.slot));
  });
  const blockNo = computed(() => {
    if (!txBalance.value) {
      return 0;
    }
    return txBalance.value.block ?? 0;
  });
  const numConfirmations = computed(() => {
    if (!chainTip.value) {
      return 0;
    }
    if (blockNo.value === 0) {
      return 0;
    }
    if (chainTip.value.blockNo === 0) {
      return 0;
    }
    return Math.max(0, chainTip.value.blockNo - blockNo.value);
  });
  const isExpired = computed(() => {
    if (blockNo.value > 0) {
      return false;
    }
    if (ttl.value <= 0) {
      return false;
    }
    return remainingSeconds.value <= 0;
  });
  const hasValidFor = ref(false);
  watch(validFor, () => {
    const v = !!validFor.value;
    if (hasValidFor.value !== v) {
      hasValidFor.value = v;
    }
  });
  return {
    ttl,
    doesNotExpire,
    currentSlot,
    remainingSeconds,
    isExpired,
    validFor,
    hasValidFor,
    blockNo,
    blockTime,
    numConfirmations
  };
};

const createTransactionJSONFromITxByron = (ref) => {
  const cslTx = {
    body: {
      fee: ref.f,
      inputs: [],
      outputs: []
    },
    is_valid: true,
    witness_set: {}
  };
  for (const input of ref.il) {
    cslTx.body.inputs.push({
      transaction_id: input.h,
      index: input.i
    });
  }
  for (const output of ref.ol) {
    cslTx.body.outputs.push({
      address: output.a.b,
      amount: {
        coin: output.o
      }
    });
  }
  return cslTx;
};

const useTxWitnesses = (tx, inputUtxoList) => {
  const { getWitnessesData } = useWitnesses();
  const vkeyWitnessHashList = ref([]);
  const redeemerSpendIndexList = ref([]);
  const redeemerMintIndexList = ref([]);
  const inputList = ref([]);
  const mintList = ref([]);
  const nativeScriptList = ref([]);
  const plutusContractList = ref([]);
  const witnessSet = computed(() => tx.value?.witness_set);
  let _lastTxHash = "";
  const setTxWitnessesRefs = (txHash) => {
    const data = getWitnessesData(txHash);
    vkeyWitnessHashList.value = data.vkeyWitnessHashList;
    redeemerSpendIndexList.value = data.redeemerSpendIndexList;
    redeemerMintIndexList.value = data.redeemerMintIndexList;
    inputList.value = data.inputList;
    mintList.value = data.mintList;
    nativeScriptList.value = data.nativeScriptList;
    plutusContractList.value = data.plutusContractList;
  };
  const resetTxWitnesses = () => {
    _lastTxHash = "";
    setTxWitnessesRefs(_lastTxHash);
    vkeyWitnessHashList.value.length = 0;
    redeemerSpendIndexList.value.length = 0;
    redeemerMintIndexList.value.length = 0;
    inputList.value.length = 0;
    mintList.value.length = 0;
    nativeScriptList.value.length = 0;
    plutusContractList.value.length = 0;
  };
  const parseTxWitnesses = () => {
    const _tx = tx.value;
    if (!_tx) {
      return resetTxWitnesses();
    }
    if (_tx.hash === _lastTxHash) {
      return;
    }
    setTxWitnessesRefs(_tx.hash);
    if (inputList.value.length === 0) {
      inputList.value.push(..._tx.body.inputs);
    }
    inputList.value.sort((a, b) => a.transaction_id.localeCompare(b.transaction_id, "en-US") || a.index - b.index);
    if (_tx.body.mint && mintList.value.length === 0) {
      mintList.value.push(..._tx.body.mint.map((m) => m[0]));
      mintList.value.sort((a, b) => a.localeCompare(b, "en-US"));
    }
    if (_tx.witness_set.redeemers && _tx.witness_set.redeemers.length > 0 && redeemerSpendIndexList.value.length === 0) {
      const redeemerList = _tx.witness_set.redeemers ?? [];
      for (const redeemer of redeemerList) {
        if (redeemer.tag === "Spend") {
          redeemerSpendIndexList.value.push(parseInt(redeemer.index));
        } else if (redeemer.tag === "Mint") {
          redeemerMintIndexList.value.push(parseInt(redeemer.index));
        }
      }
    }
    const vkeyList = _tx.witness_set.vkeys ?? [];
    for (const vkeyWitness of vkeyList) {
      const hash = getCSLVkeywitnessHash(JSON.stringify(vkeyWitness));
      if (!vkeyWitnessHashList.value.includes(hash)) {
        vkeyWitnessHashList.value.push(hash);
      }
    }
    _lastTxHash = _tx.hash;
  };
  const parseWitnessSetPlutus = async (_tx, slot) => {
    plutusContractList.value.length = 0;
    if (_tx.witness_set.redeemers == null) {
      return;
    }
    const epochNo = slot ? getEpochFromSlot(networkId.value, slot) : chainTip.value.epochNo;
    let ep = null;
    if (chainTip.value.epochNo === epochNo) {
      ep = checkEpochParams();
    } else {
      const epList = await syncEpochParams(networkId.value, "txDetails", [epochNo]);
      if (epList) {
        ep = epList[0];
      }
    }
    const sortedInputList = inputUtxoList.value?.concat().sort((a, b) => a.input.transaction_id.localeCompare(b.input.transaction_id, "en-US") || a.input.index - b.input.index) ?? [];
    for (const redeemer of _tx.witness_set.redeemers) {
      if (redeemer) {
        const isSpend = redeemer.tag === "Spend";
        const isMint = redeemer.tag === "Mint";
        const purpose = isMint ? "Mint" : redeemer.tag.toString();
        if (!isSpend && !isMint) {
          continue;
        }
        try {
          const redeemerData = getPlutusHVB(redeemer.data);
          const redeemerIndex = parseInt(redeemer.index);
          const redeemerInput = isSpend ? sortedInputList[redeemerIndex] : null;
          const inputCred = isSpend && redeemerInput ? getAddressCredentials(redeemerInput.output.address) : null;
          const mintHashList = isMint && _tx.body.mint ? _tx.body.mint.map((m) => m[0]) : [];
          const mintCred = mintHashList[redeemerIndex] ?? "";
          const prices = ep?.executionUnitPrices;
          const steps = redeemer.ex_units.steps;
          const mem = redeemer.ex_units.mem;
          let plutusScript = null;
          if (_tx.witness_set.plutus_scripts) {
            const cslPlutusScripts = PlutusScripts.from_json(jsonToCsl(_tx.witness_set.plutus_scripts));
            for (let i = 0; i < cslPlutusScripts.len(); i++) {
              const cslPlutusScript = cslPlutusScripts.get(i);
              const cslPlutusScriptHash = cslPlutusScript.hash();
              const plutusScriptHash = toHexString(cslPlutusScriptHash.to_bytes());
              if (isSpend && plutusScriptHash === inputCred?.paymentCred || isMint && plutusScriptHash === mintCred) {
                plutusScript = {
                  hash: plutusScriptHash,
                  bytes: toHexString(cslPlutusScript.bytes()),
                  size: cslPlutusScript.bytes().byteLength
                };
              }
              safeFreeCSLObject(cslPlutusScriptHash);
              safeFreeCSLObject(cslPlutusScript);
              if (plutusScript) {
                break;
              }
            }
            safeFreeCSLObject(cslPlutusScripts);
          }
          if (!plutusScript) {
            for (const refInput of _tx.body.reference_inputs ?? []) {
              const _input = sortedInputList.find((input) => input.input.transaction_id === refInput.transaction_id && input.input.index === refInput.index);
              if (_input?.output.script_ref && _input.output.script_ref.hasOwnProperty("PlutusScript")) {
                const pScript = _input.output.script_ref.PlutusScript;
                const cslPlutusScript = PlutusScript.from_hex(pScript);
                const cslPlutusScriptHash = cslPlutusScript.hash();
                const plutusScriptHash = toHexString(cslPlutusScriptHash.to_bytes());
                safeFreeCSLObject(cslPlutusScriptHash);
                safeFreeCSLObject(cslPlutusScript);
                if (isSpend && plutusScriptHash === inputCred?.paymentCred || isMint && plutusScriptHash === mintCred) {
                  plutusScript = {
                    hash: plutusScriptHash,
                    bytes: pScript,
                    size: toHexBuffer(pScript).byteLength
                  };
                  break;
                }
              }
            }
          }
          const plutusDataList = [];
          if (_tx.witness_set.plutus_data) {
            if (_tx.witness_set.plutus_data.hasOwnProperty("elems") && !Array.isArray(_tx.witness_set.plutus_data.elems)) {
              const pDataList = _tx.witness_set.plutus_data.elems;
              for (const pDataJson of pDataList) {
                const pData = getPlutusHVB(pDataJson);
                if (pData) {
                  plutusDataList.push(pData);
                }
              }
            }
          }
          let inputDatum;
          if (isSpend && redeemerInput?.output.plutus_data) {
            const hvb = getPlutusHVB(redeemerInput.output.plutus_data);
            if (hvb.value === null && hvb.hash) {
              const pData = plutusDataList.find((pd) => pd.hash === hvb.hash);
              inputDatum = {
                hash: hvb.hash,
                bytes: hvb.bytes ?? pData?.bytes ?? "",
                value: hvb.value ?? pData?.value ?? "",
                size: hvb.size ?? pData?.size ?? 0
              };
            }
          }
          const contract = {
            address: redeemerInput?.output.address ?? null,
            scriptHash: plutusScript?.hash ?? "",
            bytecode: plutusScript?.bytes ?? "",
            size: plutusScript?.size ?? 0,
            validContract: true,
            input: {
              redeemer: {
                purpose,
                fee: prices ? round(add(multiply(prices.steps, steps), multiply(prices.memory, mem)), 0, "up") : "-1",
                unit: {
                  steps,
                  mem
                },
                datum: redeemerData
              },
              datum: void 0
            }
          };
          if (inputDatum) {
            contract.input.datum = inputDatum;
          }
          plutusContractList.value.push(contract);
        } catch (e) {
          console.error("Error: parseWitnessSetPlutus", e);
        }
      }
    }
  };
  const parseWitnessSetNativeScript = (_tx) => {
    nativeScriptList.value.length = 0;
    if (_tx.witness_set.native_scripts == null) {
      return;
    }
    const cslNativeScripts = NativeScripts.from_json(jsonToCsl(_tx.witness_set.native_scripts));
    for (let i = 0; i < cslNativeScripts.len(); i++) {
      const script = cslNativeScripts.get(i);
      const scriptHash = script.hash();
      nativeScriptList.value.push({
        scriptHash: toHexString(scriptHash.to_bytes()),
        json: cslToJson(script.to_json())
      });
      safeFreeCSLObject(scriptHash);
      safeFreeCSLObject(script);
    }
    safeFreeCSLObject(cslNativeScripts);
  };
  const isSignedHash = (hash) => {
    return vkeyWitnessHashList.value.includes(hash);
  };
  const isSignedUtxo = (utxo) => {
    return typeof utxo.pc === "string" && (vkeyWitnessHashList.value.includes(utxo.pc) || nativeScriptList.value.some((ns) => ns.scriptHash === utxo.pc));
  };
  const hasSpendRedeemer = (_input) => {
    const hash = getUtxoHash(_input);
    const index = inputList.value.findIndex((input) => getUtxoHash(input) === hash) ?? -1;
    return index >= 0 && redeemerSpendIndexList.value.includes(index);
  };
  const hasMintRedeemer = (_policyId) => {
    const index = mintList.value.indexOf(_policyId);
    return index >= 0 && redeemerMintIndexList.value.includes(index);
  };
  watch(tx, () => {
    parseTxWitnesses();
  });
  return {
    witnessSet,
    vkeyWitnessHashList,
    inputList,
    mintList,
    nativeScriptList,
    plutusContractList,
    parseTxWitnesses,
    parseWitnessSetPlutus,
    parseWitnessSetNativeScript,
    resetTxWitnesses,
    isSignedHash,
    isSignedUtxo,
    hasSpendRedeemer,
    hasMintRedeemer
  };
};

const _loadedTxCborMap = {};
const _loadedTxByronMap = {};
const useTxCbor = (txBalance, localTx) => {
  const isLoading = ref(false);
  const error = ref("");
  const txCbor = ref(null);
  const txByron = ref(null);
  const tx = ref(localTx.value);
  const blockNo = ref(0);
  const blockHash = ref("");
  const inputUtxoList = ref([]);
  const inputRefUtxoList = ref([]);
  const inputColUtxoList = ref([]);
  const outputUtxoList = ref([]);
  const collateralReturnUtxo = ref(null);
  const unknownInputUtxoList = ref([]);
  const txWitnesses = useTxWitnesses(tx, inputUtxoList);
  const {
    parseTxWitnesses,
    parseWitnessSetNativeScript,
    parseWitnessSetPlutus,
    resetTxWitnesses,
    isSignedHash,
    isSignedUtxo,
    hasSpendRedeemer,
    hasMintRedeemer,
    mintList,
    nativeScriptList,
    plutusContractList,
    vkeyWitnessHashList
  } = txWitnesses;
  parseTxWitnesses();
  const resetTxCbor = () => {
    isLoading.value = false;
    error.value = "";
    blockNo.value = 0;
    blockHash.value = "";
    inputUtxoList.value = [];
    inputRefUtxoList.value = [];
    inputColUtxoList.value = [];
    outputUtxoList.value = [];
    collateralReturnUtxo.value = null;
    unknownInputUtxoList.value = [];
    txCbor.value = null;
    txByron.value = null;
    tx.value = void 0;
    resetTxWitnesses();
  };
  const loadTxDetails = async () => {
    if (!txBalance.value) {
      return resetTxCbor();
    }
    if (localTx.value) {
      return;
    }
    resetTxCbor();
    const txHash = txBalance.value.hash;
    if (_loadedTxCborMap[txHash]) {
      txCbor.value = _loadedTxCborMap[txHash];
      return parseTxCbor(txCbor.value);
    }
    if (_loadedTxByronMap[txHash]) {
      txByron.value = _loadedTxByronMap[txHash];
      return parseTxByron(txByron.value);
    }
    isLoading.value = true;
    try {
      const txCborList = await loadTxCbor(networkId.value, null, txHash);
      if (!txCborList || txCborList.length === 0) {
        const txByronList = await loadTxByron(networkId.value, null, txHash);
        if (!txByronList || txByronList.length === 0) {
          throw Error("Failed to fetch transaction details.");
        }
        const res = txByronList[0];
        _loadedTxByronMap[txHash] = res;
        txByron.value = res;
        await parseTxByron(res);
      } else {
        const res = txCborList[0];
        _loadedTxCborMap[txHash] = res;
        txCbor.value = res;
        await parseTxCbor(res);
      }
      if (!txCbor.value && !txByron.value) {
        throw Error("Failed to fetch transaction details.");
      }
    } catch (err) {
      console.error(err?.message ?? JSON.stringify(err));
      error.value = err?.message ?? JSON.stringify(err);
    }
    nextTick(() => isLoading.value = false);
  };
  const parseTxCbor = async (txCbor2) => {
    if (!txCbor2) {
      return;
    }
    blockNo.value = txCbor2.block;
    blockHash.value = txCbor2.blockHash;
    if (txBalance.value) {
      if (txBalance.value.slot !== txCbor2.slot) {
        txBalance.value.slot = txCbor2.slot;
        txBalance.value.idx = 0;
        txBalance.value.block = blockNo.value;
      }
    }
    const free = [];
    const txBuiltRes = getTransactionFromCbor(networkId.value, txCbor2.cbor, 0, free);
    await updateTxJson(txBuiltRes.builtTx, txCbor2.slot);
    freeCSLObjects(free);
  };
  const parseTxByron = async (txByron2) => {
    if (!txByron2) {
      return;
    }
    blockNo.value = txByron2.bn;
    blockHash.value = txByron2.bh;
    let _tx = createTransactionJSONFromITxByron(txByron2);
    _tx.inputUtxoList = _tx.inputUtxoList ?? [];
    resetTxWitnesses();
    const _inputUtxoList = [];
    for (const input of txByron2.il) {
      _inputUtxoList.push(createIUtxoFromIUtxoDetails(input));
    }
    inputUtxoList.value = _inputUtxoList;
    outputUtxoList.value = mapOutputUtxos(_tx);
    tx.value = _tx;
  };
  const updateTxJson = async (_tx, slot) => {
    inputUtxoList.value = [];
    inputRefUtxoList.value = [];
    inputColUtxoList.value = [];
    outputUtxoList.value = [];
    collateralReturnUtxo.value = null;
    unknownInputUtxoList.value = [];
    if (!_tx) {
      tx.value = void 0;
      return resetTxWitnesses();
    }
    try {
      _tx.inputUtxoList = _tx.inputUtxoList ?? [];
      const _allInputUtxoList = getAllInputUtxoHashList(_tx);
      await loadUnknownUtxos(networkId.value, _tx.inputUtxoList, _allInputUtxoList);
      fillUtxoList(_tx.body.reference_inputs, inputRefUtxoList.value, _tx.inputUtxoList);
      fillUtxoList(_tx.body.collateral, inputColUtxoList.value, _tx.inputUtxoList);
      fillUtxoList(_tx.body.inputs, inputUtxoList.value, _tx.inputUtxoList);
      outputUtxoList.value = mapOutputUtxos(_tx);
      unknownInputUtxoList.value = _allInputUtxoList.map((input) => {
        const [_hash, _idx] = input.split("#");
        const _utxo = createIUtxo();
        _utxo.input.transaction_id = _hash;
        _utxo.input.index = parseInt(_idx);
        return _utxo;
      });
      if (_tx.body.collateral_return) {
        collateralReturnUtxo.value = createIUtxo({ output: _tx.body.collateral_return });
      }
      parseTxWitnesses();
      parseWitnessSetNativeScript(_tx);
      await parseWitnessSetPlutus(_tx, slot);
      tx.value = _tx;
    } catch (err) {
      error.value = err?.message ?? JSON.stringify(err);
    }
  };
  const mapOutputUtxos = (tx2) => {
    const outputUtxosList = [];
    for (let i = 0; i < tx2.body.outputs.length; i++) {
      const output = tx2.body.outputs[i];
      const utxo = createIUtxo({ output });
      utxo.input.transaction_id = tx2.hash;
      utxo.input.index = i;
      outputUtxosList.push(utxo);
    }
    return outputUtxosList;
  };
  const fetchSpentByTx = async (list) => {
    const utxoList = await loadUtxoSpentList(networkId.value, null, list.map((u) => [u.input.transaction_id, u.input.index.toString()]));
    for (const item of utxoList) {
      const utxo = list.find((out) => out.input.transaction_id === item.h && out.input.index === item.i);
      if (utxo) {
        utxo.spentBy = item.t;
      }
    }
  };
  watch(outputUtxoList, (list) => fetchSpentByTx(list), { immediate: true });
  watch(collateralReturnUtxo, (utxo) => utxo && fetchSpentByTx([utxo]), { immediate: true });
  watch(txBalance, loadTxDetails, { immediate: true });
  watch(localTx, async (tx2) => {
    if (tx2) {
      await updateTxJson(tx2);
    }
  }, { immediate: true });
  const isOnChain = computed(() => tx ? isOnChainState(tx.value?.state) : false);
  const isInvalid = computed(() => tx ? isInvalidState(tx.value?.state) : false);
  const isSubmitted = computed(() => tx ? isSubmittedState(tx.value?.state) : false);
  const isSigned = computed(() => tx ? isSignedState(tx.value?.state) : false);
  const hasCbor = computed(() => tx ? !!tx.value?.cbor : false);
  return {
    isLoading,
    error,
    txWitnesses,
    txCbor,
    txByron,
    tx,
    blockNo,
    blockHash,
    inputUtxoList,
    inputRefUtxoList,
    inputColUtxoList,
    outputUtxoList,
    collateralReturnUtxo,
    unknownInputUtxoList,
    isSignedHash,
    isSignedUtxo,
    hasSpendRedeemer,
    hasMintRedeemer,
    mintList,
    nativeScriptList,
    plutusContractList,
    vkeyWitnessHashList,
    isOnChain,
    isInvalid,
    isSubmitted,
    isSigned,
    hasCbor
  };
};
const fillUtxoList = (inputList, list, availableList) => {
  list.length = 0;
  if (inputList) {
    for (const input of inputList) {
      for (const utxo of availableList) {
        if (utxo.input.transaction_id === input.transaction_id && utxo.input.index === input.index) {
          list.push(utxo);
          break;
        }
      }
    }
  }
};

const { formatTxType } = useFormatter();
const useTxType = (txBalance, props) => {
  const { isProMode } = useAppMode();
  const txType = computed(() => {
    let type = txBalance.value?.t;
    if (!type) {
      if (props.isTxViewer) {
        type = ITxBalanceType.external;
      }
    }
    return formatTxType(type ?? ITxBalanceType.uninitialized, isProMode.value);
  });
  return {
    txType
  };
};

const useTxFlags = (txBalance, hasContracts) => {
  const hasMeta = computed(() => !!txBalance.value?.mk && txBalance.value.mk.length > 0);
  const hasOwnWithdrawal = computed(() => !!txBalance.value?.ow);
  const hasMultiSigReg = computed(() => !!txBalance.value?.mk && txBalance.value.mk.includes(1854) && !!txBalance.value.n);
  const hasCatalystReg = computed(() => !!txBalance.value?.mk && txBalance.value.mk.includes(61284));
  const hasPossiblyMilkomedaMeta = computed(() => !!txBalance.value?.mk && txBalance.value.mk.some((k) => k === 87 || k === 88));
  const hasMint = computed(() => txBalance.value?.m ?? false);
  const hasBurn = computed(() => txBalance.value?.b ?? false);
  const hasNativeScript = computed(() => txBalance.value?.n ?? false);
  const hasPlutusContract = computed(() => txBalance.value?.p ?? false);
  const cert = computed(() => txBalance.value?.cert ?? []);
  const hasRegCert = computed(() => cert.value.some((c) => c === CertificateKind.StakeRegistration || c === CertificateKind.StakeRegistrationAndDelegation || c === CertificateKind.StakeVoteRegistrationAndDelegation || c === CertificateKind.DRepRegistration || c === CertificateKind.DRepUpdate) ?? false);
  const hasDeregCert = computed(() => cert.value.some((c) => c === CertificateKind.StakeDeregistration || c === CertificateKind.DRepDeregistration) ?? false);
  const hasDelegCert = computed(() => cert.value.some((c) => c === CertificateKind.StakeDelegation || c === CertificateKind.VoteDelegation || c === CertificateKind.StakeRegistrationAndDelegation || c === CertificateKind.StakeAndVoteDelegation || c === CertificateKind.StakeVoteRegistrationAndDelegation || c === CertificateKind.VoteRegistrationAndDelegation) ?? false);
  const hasPoolRegCert = computed(() => cert.value.some((c) => c === CertificateKind.PoolRegistration) ?? false);
  const hasPoolRetCert = computed(() => cert.value.some((c) => c === CertificateKind.PoolRetirement) ?? false);
  const hasGovCert = computed(() => cert.value.some((c) => c === CertificateKind.VoteDelegation || c === CertificateKind.VoteRegistrationAndDelegation || c === CertificateKind.StakeAndVoteDelegation || c === CertificateKind.StakeVoteRegistrationAndDelegation || c === CertificateKind.CommitteeColdResign || c === CertificateKind.CommitteeHotAuth || c === CertificateKind.DRepDeregistration || c === CertificateKind.DRepUpdate || c === CertificateKind.GenesisKeyDelegation) ?? false);
  const hasGovVote = computed(() => txBalance.value?.v ?? false);
  return {
    hasMeta,
    hasOwnWithdrawal,
    hasCatalystReg,
    hasMultiSigReg,
    hasPossiblyMilkomedaMeta,
    hasMint,
    hasBurn,
    hasNativeScript,
    hasPlutusContract,
    hasRegCert,
    hasDeregCert,
    hasDelegCert,
    hasPoolRegCert,
    hasPoolRetCert,
    hasGovCert,
    hasGovVote,
    hasContracts
  };
};

const useTxBadges = (txBalance, txTTL, txCbor, txAuxData, txWithdrawals, props) => {
  const {
    translateBadgeList
  } = useFormatter();
  const contractPropertyList = ref([]);
  const hasContracts = computed(() => contractPropertyList.value.length > 0);
  const {
    hasWithdrawalsAboveZero
  } = txWithdrawals;
  const {
    signedTx,
    pendingTx,
    stagingTx,
    sentTx
  } = props;
  const txFlags = useTxFlags(txBalance, hasContracts);
  const {
    hasPossiblyMilkomedaMeta,
    hasCatalystReg,
    hasMultiSigReg,
    hasMeta,
    hasMint,
    hasBurn,
    hasGovVote,
    hasGovCert,
    hasRegCert,
    hasDeregCert,
    hasDelegCert,
    hasPoolRegCert,
    hasPoolRetCert,
    hasNativeScript,
    hasPlutusContract
  } = txFlags;
  const {
    isMilkomedaTx
  } = txAuxData;
  const {
    isExpired,
    doesNotExpire,
    numConfirmations,
    hasValidFor
  } = txTTL;
  const {
    tx,
    isOnChain,
    isInvalid,
    isSubmitted,
    isSigned,
    hasCbor
  } = txCbor;
  const _txCbor = txCbor.txCbor;
  const badgeList = ref([]);
  const submitTxFromBadge = () => {
    if (!tx.value) {
      return;
    }
    if (!_txCbor.value?.cbor && !tx.value?.cbor) {
      return;
    }
    useSubmitTx().submitTx(networkId.value, _txCbor.value?.cbor ?? tx.value?.cbor, tx.value);
  };
  watchEffect(() => {
    badgeList.value = [];
    let addressList = [];
    txCbor.inputUtxoList.value.forEach((utxo) => {
      addressList.push(utxo.output.address);
    });
    txCbor.inputRefUtxoList.value.forEach((utxo) => {
      addressList.push(utxo.output.address);
    });
    txCbor.outputUtxoList.value.forEach((utxo) => {
      addressList.push(utxo.output.address);
    });
    const {
      contractList} = addContractBadge(addressList, badgeList.value);
    contractPropertyList.value = contractList;
    addPropBadge(hasMeta.value && !hasContracts.value, "metadata", badgeList.value);
    addPropBadge(hasWithdrawalsAboveZero.value, "withdrawal", badgeList.value);
    addPropBadge(hasCatalystReg.value, "catalyst", badgeList.value);
    addPropBadge(hasMultiSigReg.value, "multisig", badgeList.value);
    addPropBadge(hasPossiblyMilkomedaMeta.value && isMilkomedaTx.value, "milkomeda", badgeList.value);
    addPropBadge(hasGovCert.value || hasGovVote.value, "gov", badgeList.value);
    addPropBadge(hasRegCert.value, "reg", badgeList.value);
    addPropBadge(hasDeregCert.value, "dereg", badgeList.value);
    addPropBadge(hasDelegCert.value, "delegation", badgeList.value);
    addPropBadge(hasPoolRegCert.value, "poolreg", badgeList.value);
    addPropBadge(hasPoolRetCert.value, "poolret", badgeList.value);
    addPropBadge(hasPlutusContract.value && !hasContracts.value, "plutus", badgeList.value);
    addPropBadge(hasNativeScript.value && !hasContracts.value, "nativescript", badgeList.value);
    addPropBadge(hasMint.value && !hasContracts.value, "mint", badgeList.value);
    addPropBadge(hasBurn.value && !hasContracts.value, "burn", badgeList.value);
    if (sentTx || pendingTx || stagingTx) {
      if (isSigned.value) {
        addPropBadge(!isSubmitted.value && !isOnChain.value, "signed", badgeList.value);
        if (!isSubmitted.value && !isOnChain.value && hasCbor.value && !isInvalid.value) {
          createSubmitBadge(submitTxFromBadge, badgeList.value);
        }
        addPropBadge(!isSubmitted.value && !hasCbor.value, "notSubmitted", badgeList.value);
      }
      addPropBadge(isOnChain.value, "onchain", badgeList.value);
      addPropBadge(isInvalid.value, "invalid", badgeList.value);
      if (!isExpired.value && !isInvalid.value && !isOnChain.value) {
        addPropBadge(pendingTx && isSubmitted.value, "pending", badgeList.value);
        addPropBadge(stagingTx && sentTx, "invalid", badgeList.value);
        addPropBadge(stagingTx && !sentTx, "staging", badgeList.value);
        addPropBadge(doesNotExpire.value, "unlimited", badgeList.value);
      }
      addPropBadge(isExpired.value && !isInvalid.value && !isOnChain.value, "expired", badgeList.value);
      if (!sentTx && (isExpired.value || isInvalid.value || isSigned.value && !isSubmitted.value)) {
        createRemoveBadge(txBalance.value?.hash, badgeList.value);
      }
    }
    addPropBadge(!pendingTx && signedTx && !isExpired.value && !isInvalid.value && !isOnChain.value, "signed", badgeList.value);
    translateBadgeList(badgeList.value);
  });
  return {
    txFlags,
    badgeList,
    hasContracts
    // confirmationBadge
  };
};

const useTxMints = (tx) => {
  const mintAssets = ref([]);
  const burnAssets = ref([]);
  const buildGroups = () => {
    let _mintAssets = [];
    let _burnAssets = [];
    for (const mintGroup of tx.value?.body?.mint ?? []) {
      let _mintGroup = {
        policy: mintGroup[0],
        assets: []
      };
      let _burnGroup = {
        policy: mintGroup[0],
        assets: []
      };
      for (const mintAsset of Object.entries(mintGroup[1])) {
        const _asset = Object.values(mintAsset);
        if (isGreaterThanZero(_asset[1])) {
          _mintGroup.assets.push(createIAssetListItemDetails(_mintGroup.policy, _asset[0], _asset[1]));
        } else {
          _burnGroup.assets.push(createIAssetListItemDetails(_burnGroup.policy, _asset[0], _asset[1]));
        }
      }
      if (_mintGroup.assets.length > 0) {
        _mintAssets.push(_mintGroup);
      }
      if (_burnGroup.assets.length > 0) {
        _burnAssets.push(_burnGroup);
      }
    }
    mintAssets.value = _mintAssets;
    burnAssets.value = _burnAssets;
  };
  watch(tx, buildGroups, { immediate: true, deep: true });
  return {
    mintAssets,
    burnAssets
  };
};

const useTxCertificates = (tx) => {
  const certList = ref([]);
  let _lastTxHash = "";
  const resetTxCertificates = () => {
    _lastTxHash = "";
    certList.value.length = 0;
  };
  const parseTxCertificates = () => {
    const _tx = tx.value;
    if (!_tx) {
      return resetTxCertificates();
    }
    if (_tx.hash === _lastTxHash) {
      return;
    }
    resetTxCertificates();
    certList.value.push(..._tx.body.certs ?? []);
    _lastTxHash = _tx.hash;
  };
  const hasCertificates = computed(() => certList.value.length > 0);
  watch(tx, () => {
    parseTxCertificates();
  }, { immediate: true, deep: true });
  return {
    hasCertificates,
    certList
  };
};

const getDRepId = (voter) => {
  const voterType = Object.keys(voter)[0];
  if (voterType !== "DRep") {
    return null;
  }
  const isScript = Object.keys(voter.DRep)[0] === "Script";
  const cred = Object.values(voter.DRep)[0];
  return getDRepAddressFromKeyHash(cred, isScript);
};
const useTxGovernance = (tx) => {
  const voteList = ref([]);
  const proposalList = ref([]);
  let _lastTxHash = "";
  const resetTxGovernance = () => {
    _lastTxHash = "";
    voteList.value.length = 0;
    proposalList.value.length = 0;
  };
  const parseTxGovernance = () => {
    const _tx = tx.value;
    if (!_tx) {
      return resetTxGovernance();
    }
    if (_tx.hash === _lastTxHash) {
      return;
    }
    resetTxGovernance();
    voteList.value.push(..._tx.body.voting_procedures ?? []);
    proposalList.value.push(..._tx.body.voting_proposals ?? []);
    _lastTxHash = _tx.hash;
  };
  const hasVotes = computed(() => voteList.value.length > 0);
  const hasProposals = computed(() => proposalList.value.length > 0);
  const getGovProposal = (index) => {
    const govActionId = getGovProposalId(_lastTxHash, index);
    return govActionList.value.find((p) => p.b === govActionId);
  };
  const getGovProposalById = (txHash, index) => {
    const govActionId = getGovProposalId(txHash, index);
    return govActionList.value.find((p) => p.b === govActionId);
  };
  const getDRepById = (drepId) => {
    return dRepList.value.find((d) => d.b === drepId);
  };
  watch(tx, () => {
    parseTxGovernance();
  }, { immediate: true, deep: true });
  return {
    hasVotes,
    hasProposals,
    voteList,
    proposalList,
    getDRepId,
    getDRepById,
    getGovProposal,
    getGovProposalById
  };
};

const useTxWithdrawals = (tx) => {
  const withdrawalMap = ref(null);
  let _lastTxHash = "";
  const resetTxCertificates = () => {
    _lastTxHash = "";
    withdrawalMap.value = null;
  };
  const parseTxWithdrawals = () => {
    const _tx = tx.value;
    if (!_tx) {
      return resetTxCertificates();
    }
    if (_tx.hash === _lastTxHash) {
      return;
    }
    resetTxCertificates();
    withdrawalMap.value = _tx.body.withdrawals ?? null;
    _lastTxHash = _tx.hash;
  };
  const numWithdrawals = computed(() => withdrawalMap.value !== null ? Object.keys(withdrawalMap.value).length : 0);
  const numWithdrawalsAboveZero = computed(() => {
    if (numWithdrawals.value === 0) {
      return 0;
    }
    const entries = Object.entries(withdrawalMap.value);
    let num = 0;
    for (const entry of entries) {
      if (parseInt(entry[1]) > 0) {
        num++;
      }
    }
    return num;
  });
  const hasWithdrawals = computed(() => numWithdrawals.value > 0);
  const hasWithdrawalsAboveZero = computed(() => numWithdrawalsAboveZero.value > 0);
  watch(tx, () => {
    parseTxWithdrawals();
  }, { immediate: true, deep: true });
  return {
    numWithdrawals,
    numWithdrawalsAboveZero,
    hasWithdrawals,
    hasWithdrawalsAboveZero,
    withdrawalMap
  };
};

var types = {};

var hasRequiredTypes;

function requireTypes () {
	if (hasRequiredTypes) return types;
	hasRequiredTypes = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.ProtocolMagic = exports.Explorers = exports.BackendEndpoints = exports.ProtocolNames = exports.NetworkNames = void 0;
		(function (NetworkNames) {
		    NetworkNames["internalTestnet"] = "c1-internal";
		    NetworkNames["devnet"] = "c1-devnet";
		    NetworkNames["mainnet"] = "c1-mainnet";
		})(exports.NetworkNames || (exports.NetworkNames = {}));
		(function (ProtocolNames) {
		    ProtocolNames["cardanoProtocol"] = "cardano";
		    ProtocolNames["evmProtocol"] = "EVM";
		})(exports.ProtocolNames || (exports.ProtocolNames = {}));
		(function (BackendEndpoints) {
		    BackendEndpoints["internalTestnet"] = "allowlist.flint-wallet.com";
		    BackendEndpoints["devnet"] = "allowlist.flint-wallet.com";
		    BackendEndpoints["mainnet"] = "allowlist-mainnet.flint-wallet.com";
		})(exports.BackendEndpoints || (exports.BackendEndpoints = {}));
		(function (Explorers) {
		    Explorers["internalTestnet"] = "";
		    Explorers["mainnet"] = "https://bridge-explorer.milkomeda.com/cardano-mainnet";
		    Explorers["devnet"] = "https://bridge-explorer.milkomeda.com/cardano-devnet";
		})(exports.Explorers || (exports.Explorers = {}));
		(function (ProtocolMagic) {
		    ProtocolMagic["internalTestnet"] = "internal.cardano-evm.c1";
		    ProtocolMagic["devnet"] = "devnet.cardano-evm.c1";
		    ProtocolMagic["mainnet"] = "mainnet.cardano-evm.c1";
		})(exports.ProtocolMagic || (exports.ProtocolMagic = {})); 
	} (types));
	return types;
}

var typesExports = requireTypes();

const networkMetadataUrlKey = 87;
const networkMetadataAddressKey = 88;
const networkMetadataUrl = networkIdList.reduce((o, n) => {
  o[n] = n === "mainnet" ? typesExports.ProtocolMagic.mainnet : null;
  return o;
}, {});
const networkExplorer = networkIdList.reduce((o, n) => {
  o[n] = null;
  return o;
}, {});
networkExplorer.mainnet = "https://explorer-mainnet-cardano-evm.c1.milkomeda.com/address/###ADDRESS###/transactions";
networkExplorer.preview = "https://explorer-devnet-cardano-evm.c1.milkomeda.com/address/###ADDRESS###/transactions";
const isMilkomedaTx = (tx, networkId) => {
  const metadata = tx?.metadata ? tx?.metadata[String(networkMetadataUrlKey)] : null;
  if (metadata && networkMetadataUrl[networkId] && metadata.includes(networkMetadataUrl[networkId])) {
    return true;
  }
  return false;
};
const getNetworkExplorerUrl = (networkId, address) => {
  return networkExplorer[networkId]?.replace("###ADDRESS###", address) ?? void 0;
};
const getNetworkExplorerUrlFromItx = (networkId, itx) => {
  if (!isMilkomedaTx(itx, networkId)) return void 0;
  const address = itx.metadata ? itx.metadata[String(networkMetadataAddressKey)] ?? null : null;
  if (!address) {
    return void 0;
  }
  let jsonValue = getJsonValue(address) ?? void 0;
  return jsonValue ? getNetworkExplorerUrl(networkId, jsonValue) : void 0;
};
const getJsonValue = (input) => {
  if (!input) {
    return null;
  }
  const value = input.match(/"string":"(.*?)"/);
  if (!value) {
    return null;
  }
  return value[1];
};

const useTxAuxData = (tx) => {
  const auxData = computed(() => tx.value?.auxiliary_data ?? null);
  const metadata = computed(() => auxData.value?.metadata ?? null);
  const auxNativeScriptList = ref([]);
  const auxPlutusScriptList = ref([]);
  const hasMetadata = computed(() => metadata.value && Object.keys(metadata.value).length > 0);
  const isMilkomedaTx$1 = computed(() => isMilkomedaTx(auxData.value, networkId.value));
  let _lastTxHash = "";
  const resetTxAuxData = () => {
    _lastTxHash = "";
    auxNativeScriptList.value.length = 0;
    auxPlutusScriptList.value.length = 0;
  };
  const parseAuxDataNativeScript = (_tx) => {
    auxNativeScriptList.value.length = 0;
    if (_tx.auxiliary_data?.native_scripts == null) {
      return;
    }
    const cslNativeScripts = NativeScripts.from_json(jsonToCsl(_tx.auxiliary_data.native_scripts));
    for (let i = 0; i < cslNativeScripts.len(); i++) {
      const script = cslNativeScripts.get(i);
      const scriptHash = script.hash();
      auxNativeScriptList.value.push({
        scriptHash: toHexString(scriptHash.to_bytes()),
        json: cslToJson(script.to_json())
      });
      safeFreeCSLObject(scriptHash);
      safeFreeCSLObject(script);
    }
    safeFreeCSLObject(cslNativeScripts);
  };
  const parseAuxDataPlutusScript = (_tx) => {
    auxPlutusScriptList.value.length = 0;
    if (_tx.auxiliary_data?.plutus_scripts == null) {
      return;
    }
    const cslPlutusScripts = PlutusScripts.from_json(jsonToCsl(_tx.auxiliary_data.plutus_scripts));
    for (let i = 0; i < cslPlutusScripts.len(); i++) {
      const cslPlutusScript = cslPlutusScripts.get(i);
      const cslPlutusScriptHash = cslPlutusScript.hash();
      const cslPlutusLanguage = cslPlutusScript.language_version();
      const cslPlutusLanguageKind = cslPlutusLanguage.kind();
      const plutusScriptHash = toHexString(cslPlutusScriptHash.to_bytes());
      const script = {
        hash: plutusScriptHash,
        bytes: toHexString(cslPlutusScript.bytes()),
        value: "",
        size: cslPlutusScript.bytes().byteLength,
        type: "plutusV1"
      };
      if (cslPlutusLanguageKind === LanguageKind.PlutusV2) {
        script.type = "plutusV2";
      } else if (cslPlutusLanguageKind === LanguageKind.PlutusV3) {
        script.type = "plutusV3";
      }
      try {
        script.value = JSON.parse(_tx.auxiliary_data.plutus_scripts[i]);
      } catch (e) {
        script.value = _tx.auxiliary_data.plutus_scripts[i];
      }
      auxPlutusScriptList.value.push(script);
      safeFreeCSLObject(cslPlutusLanguage);
      safeFreeCSLObject(cslPlutusScriptHash);
      safeFreeCSLObject(cslPlutusScript);
    }
    safeFreeCSLObject(cslPlutusScripts);
  };
  const parseTxAuxData = () => {
    const _tx = tx.value;
    if (!_tx) {
      return resetTxAuxData();
    }
    if (_tx.hash === _lastTxHash) {
      return;
    }
    parseAuxDataNativeScript(_tx);
    parseAuxDataPlutusScript(_tx);
    _lastTxHash = _tx.hash;
  };
  watch(tx, () => {
    parseTxAuxData();
  }, { immediate: true, deep: true });
  return {
    hasMetadata,
    metadata,
    auxData,
    auxNativeScriptList,
    auxPlutusScriptList,
    isMilkomedaTx: isMilkomedaTx$1
  };
};

const useTxParamUpdate = (tx) => {
  const paramUpdate = ref(null);
  let _lastTxHash = "";
  const resetTxParamUpdate = () => {
    _lastTxHash = "";
    paramUpdate.value = null;
  };
  const parseTxParamUpdate = () => {
    const _tx = tx.value;
    if (!_tx) {
      return resetTxParamUpdate();
    }
    if (_tx.hash === _lastTxHash) {
      return;
    }
    resetTxParamUpdate();
    if (_tx.body.update) {
      paramUpdate.value = _tx.body.update;
    }
    _lastTxHash = _tx.hash;
  };
  const hasParamUpdate = computed(() => !!paramUpdate.value);
  watch(tx, () => {
    parseTxParamUpdate();
  }, { immediate: true, deep: true });
  return {
    hasParamUpdate,
    paramUpdate
  };
};

const useTxRequiredSigners = (tx) => {
  const requiredSigners = computed(() => tx?.value?.body.required_signers);
  const hasRequiredSigners = computed(() => !!requiredSigners.value);
  return {
    requiredSigners,
    hasRequiredSigners
  };
};

const { isProMode } = useAppMode();
const useTxInfos = (txBalance, localTx, props) => {
  const txCbor = useTxCbor(txBalance, localTx);
  const { tx } = txCbor;
  const txTTL = useTxTTL(txBalance, tx);
  const { txHash } = useTxHash(txBalance, tx);
  const { txType } = useTxType(txBalance, props);
  const txCerts = useTxCertificates(tx);
  const txGovernance = useTxGovernance(tx);
  const txWithdrawals = useTxWithdrawals(tx);
  const txAuxData = useTxAuxData(tx);
  const txMints = useTxMints(tx);
  const txParamUpdate = useTxParamUpdate(tx);
  const txRequiredSigners = useTxRequiredSigners(tx);
  const txBadges = useTxBadges(txBalance, txTTL, txCbor, txAuxData, txWithdrawals, props);
  const { txFlags } = txBadges;
  const showTitle = computed(() => isProMode.value || txBadges.badgeList.value.some((entry) => entry.type !== CONTRACT_BADGE));
  const txMessages = useTxMessage(txBalance);
  return {
    showTitle,
    txBalance,
    txHash,
    txType,
    txCerts,
    txGovernance,
    txWithdrawals,
    txAuxData,
    txMints,
    txProps: props,
    txFlags,
    txTTL,
    txCbor,
    txBadges,
    txMessages,
    txParamUpdate,
    txRequiredSigners
  };
};

const loadTxNote = async (txNoteKey) => {
  return TransactionNoteDB.getTxNote(networkId.value, txNoteKey.accountId, txNoteKey.txHash);
};
const saveTxNote = async (txNote) => {
  await TransactionNoteDB.putTransactionNote(networkId.value, txNote);
  return txNote;
};
const deleteTxNote = async (txNoteKey) => {
  return TransactionNoteDB.deleteTxNote(networkId.value, txNoteKey.accountId, txNoteKey.txHash);
};

const { formatDatetime } = useFormatter();
const _show = ref(false);
const _txNoteEdit = ref(void 0);
const _txHashEdit = ref(void 0);
const _accountIdEdit = ref(void 0);
const _createdAtEdit = computed(() => !_txNoteEdit.value ? void 0 : formatDatetime(_txNoteEdit.value.note.created, true, true));
const _updatedAtEdit = computed(() => !_txNoteEdit.value?.note.updated ? void 0 : formatDatetime(_txNoteEdit.value.note.updated, true, true));
const _hasTxNoteEdit = computed(() => !!_txNoteEdit.value?.note);
const useModalTransactionNote = (_txHash) => {
  const storeId = "useModalTransactionNote-" + getRandomId();
  const _txNote = ref(void 0);
  const _hasTxNote = computed(() => !!_txNote.value?.note);
  const _createdAt = computed(() => !_txNote.value ? void 0 : formatDatetime(_txNote.value.note.created, true, true));
  const _updatedAt = computed(() => !_txNote.value?.note.updated ? void 0 : formatDatetime(_txNote.value.note.updated, true, true));
  const { selectedAccountId } = useSelectedAccount();
  const open = () => {
    const txHash = _txHash.value;
    if (!txHash) {
      return false;
    }
    if (!selectedAccountId.value) {
      return false;
    }
    _accountIdEdit.value = selectedAccountId.value;
    _txHashEdit.value = _txHash.value ?? void 0;
    _txNoteEdit.value = _txNote.value;
    _show.value = true;
    return true;
  };
  const close = () => {
    _show.value = false;
    _txNoteEdit.value = void 0;
  };
  const doSaveTxNoteEdit = async (msg) => {
    const updatedTxNote = _txNoteEdit.value ? {
      txHash: _txHashEdit.value,
      accountId: _accountIdEdit.value,
      note: {
        created: _txNoteEdit.value.note.created ?? Date.now(),
        updated: Date.now(),
        note: msg
      }
    } : {
      txHash: _txHashEdit.value,
      accountId: _accountIdEdit.value,
      note: {
        created: Date.now(),
        note: msg
      }
    };
    _txNoteEdit.value = await saveTxNote(updatedTxNote);
  };
  const doDeleteTxNoteEdit = async () => {
    if (_txNoteEdit.value) {
      await deleteTxNote({ txHash: _txNoteEdit.value.txHash, accountId: selectedAccountId.value });
      _txNoteEdit.value = void 0;
    }
  };
  const _onTxNoteAdded = (txNote) => {
    if (txNote.txHash === _txHash.value) {
      _txNote.value = txNote;
    }
  };
  const _onTxNoteUpdated = (txNote) => {
    if (txNote.txHash === _txHash.value) {
      _txNote.value = txNote;
    }
  };
  const _onTxNoteDeleted = (accountId, txHash) => {
    if (txHash === _txHash.value) {
      _txNote.value = void 0;
    }
  };
  onMounted(() => {
    addSignalListener(onTxNoteAdded, storeId, _onTxNoteAdded);
    addSignalListener(onTxNoteUpdated, storeId, _onTxNoteUpdated);
    addSignalListener(onTxNoteDeleted, storeId, _onTxNoteDeleted);
  });
  onUnmounted(() => {
    removeSignalListener(onTxNoteAdded, storeId);
    removeSignalListener(onTxNoteUpdated, storeId);
    removeSignalListener(onTxNoteDeleted, storeId);
  });
  watch(_txHash, async () => {
    if (_txHash.value) {
      _txNote.value = await loadTxNote({ txHash: _txHash.value, accountId: selectedAccountId.value });
    }
  }, { immediate: true });
  return {
    txNote: _txNote,
    hasTxNote: _hasTxNote,
    createdAt: _createdAt,
    updatedAt: _updatedAt,
    txNoteEdit: _txNoteEdit,
    txHashEdit: _txHashEdit,
    hasTxNoteEdit: _hasTxNoteEdit,
    createdAtEdit: _createdAtEdit,
    updatedAtEdit: _updatedAtEdit,
    showModalTransactionNote: _show,
    doDeleteTxNoteEdit,
    doSaveTxNoteEdit,
    openModalTransactionNote: open,
    closeModalTransactionNote: close
  };
};

const _sfc_main$3 = {  };

const _hoisted_1$3 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  color: "currentColor",
  fill: "none"
};

function _sfc_render$2(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$3, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      d: "M9 14.5H13M9 9.5H17",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round"
    }, null, -1),
    createBaseVNode("path", {
      d: "M4 10C4 6.22876 4 4.34315 5.17157 3.17157C6.34315 2 8.22876 2 12 2H13.5C17.2712 2 19.1569 2 20.3284 3.17157C21.5 4.34315 21.5 6.22876 21.5 10V14C21.5 17.7712 21.5 19.6569 20.3284 20.8284C19.1569 22 17.2712 22 13.5 22H12C8.22876 22 6.34315 22 5.17157 20.8284C4 19.6569 4 17.7712 4 14V10Z",
      stroke: "currentColor",
      "stroke-width": "1.5"
    }, null, -1),
    createBaseVNode("path", {
      d: "M5 6L2.5 6M5 12L2.5 12M5 18H2.5",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, -1)
  ]))]))
}
const IconNotebook = /*#__PURE__*/_export_sfc(_sfc_main$3, [['render',_sfc_render$2]]);

const _sfc_main$2 = {  };

const _hoisted_1$2 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  fill: "none"
};

function _sfc_render$1(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$2, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      d: "M8 9H16M8 15H16",
      "stroke-width": "1.5",
      "stroke-linecap": "round"
    }, null, -1),
    createBaseVNode("path", {
      d: "M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z",
      "stroke-width": "1.5",
      "stroke-linejoin": "round"
    }, null, -1)
  ]))]))
}
const IconSquare = /*#__PURE__*/_export_sfc(_sfc_main$2, [['render',_sfc_render$1]]);

const _sfc_main$1 = {  };

const _hoisted_1$1 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  color: "currentColor",
  fill: "none"
};

function _sfc_render(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$1, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("circle", {
      cx: "12",
      cy: "12",
      r: "10",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "square",
      "stroke-linejoin": "round"
    }, null, -1),
    createBaseVNode("path", {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M12 16.5H12.009H12Z",
      fill: "currentColor"
    }, null, -1),
    createBaseVNode("path", {
      d: "M12 16.5H12.009",
      stroke: "currentColor",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, -1),
    createBaseVNode("path", {
      d: "M10 9.5C10 8.39543 10.8954 7.5 12 7.5C13.1046 7.5 14 8.39543 14 9.5C14 9.89815 13.8837 10.2691 13.6831 10.5808C13.0854 11.5097 12 12.3954 12 13.5",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round"
    }, null, -1)
  ]))]))
}
const IconQuestion = /*#__PURE__*/_export_sfc(_sfc_main$1, [['render',_sfc_render]]);

const _hoisted_1 = { class: "w-full flex flex-col et-js-is et-gap-sm" };
const _hoisted_2 = { class: "w-full flex flex-row flex-nowrap et-jb-is et-gap-sm" };
const _hoisted_3 = { class: "shrink grow min-w-0 flex flex-col et-js-is et-gap-xs" };
const _hoisted_4 = { class: "shrink grow w-full min-w-0 flex flex-row et-js-is sm:et-js-ic et-gap-sm" };
const _hoisted_5 = {
  key: 0,
  class: "shrink min-h-6 min-w-0 flex flex-row et-js-is et-gap-sm text-txt-reduced"
};
const _hoisted_6 = {
  key: 0,
  class: "indent-7 leading-6 font-semibold"
};
const _hoisted_7 = {
  key: 1,
  class: "h-6 sm:h-8 w-px mr-6"
};
const _hoisted_8 = {
  key: 2,
  class: "h-6 sm:h-8 w-px -mx-1"
};
const _hoisted_9 = {
  key: 3,
  class: "h-6 sm:h-8 flex flex-row"
};
const _hoisted_10 = {
  key: 1,
  class: "shrink w-full min-h-6 min-w-0 flex flex-row et-js-ic"
};
const _hoisted_11 = { class: "shrink-0 relative min-w-0 flex flex-col et-je-ie 2xs:et-je-ie et-gap-xs sm:et-gap-sm" };
const _hoisted_12 = { class: "flex flex-row et-js-is 2xs:et-je-ie" };
const _hoisted_13 = {
  key: 0,
  class: "w-full flex flex-wrap et-gap-sm"
};
const _hoisted_14 = { class: "grow -mt-1 flex flex-wrap et-gap-sm" };
const _hoisted_15 = { class: "w-full" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TransactionItemHeader",
  props: {
    txInfos: { type: Object, required: true },
    minimal: { type: Boolean, required: false, default: false },
    showNote: { type: Boolean, required: false, default: true },
    hideValidFor: { type: Boolean, required: false, default: false }
  },
  setup(__props) {
    const props = __props;
    const txHash = props.txInfos.txHash;
    const txType = props.txInfos.txType;
    props.txInfos.txCbor;
    const badgeList = props.txInfos.txBadges.badgeList;
    props.txInfos.txBadges.txFlags;
    const showTitle = props.txInfos.showTitle;
    const txBalance = props.txInfos.txBalance;
    const txTTL = props.txInfos.txTTL;
    const $t = useTranslation().t;
    const { formatTimeAndDate } = useFormatter();
    const { isSmallerThanXXS } = useScreenSize();
    const {
      hasTxNote,
      openModalTransactionNote
    } = useModalTransactionNote(txHash);
    const blockTime = txTTL.blockTime;
    const validFor = txTTL.validFor;
    const _validFor = computed(() => {
      if (props.hideValidFor) {
        return "";
      }
      if (validFor.value === "unlimited" || validFor.value === "expired") {
        return $t("tx-viewer:validFor." + validFor.value);
      }
      return validFor.value;
    });
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _directive_tooltip = resolveDirective("tooltip");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", _hoisted_4, [
              createVNode(Transition, {
                name: "fade-fast-delayed",
                mode: "out-in"
              }, {
                default: withCtx(() => [
                  unref(txType).name || unref(txType).name === "Unknown" ? (openBlock(), createElementBlock("div", _hoisted_5, [
                    unref(txType).icon === "square" ? (openBlock(), createBlock(IconSquare, {
                      key: 0,
                      class: "absolute w-3 sm:w-5 mt-1.5 sm:mt-1.5"
                    })) : unref(txType).icon === "send" ? (openBlock(), createBlock(IconArrowRT, {
                      key: 1,
                      class: "absolute w-3 sm:w-5 mt-1.5 sm:mt-1.5"
                    })) : unref(txType).icon === "import" ? (openBlock(), createBlock(IconArrowLB, {
                      key: 2,
                      class: "absolute w-3 sm:w-5 mt-1.5 sm:mt-2"
                    })) : unref(txType).icon === "left" ? (openBlock(), createBlock(IconArrowRT, {
                      key: 3,
                      class: "absolute w-3 sm:w-5 mt-1.5 sm:mt-1.5"
                    })) : unref(txType).icon === "unknown" ? (openBlock(), createBlock(IconQuestion, {
                      key: 4,
                      class: "absolute w-3 sm:w-5 mt-1.5 sm:mt-1.5"
                    })) : unref(txType).icon === "failed" ? (openBlock(), createBlock(IconAlert02, {
                      key: 5,
                      class: "absolute w-3 sm:w-5 mt-1.5 sm:mt-1.5 et-text-negative"
                    })) : createCommentVNode("", true),
                    createBaseVNode("div", {
                      class: normalizeClass(["shrink w-full min-h-6 min-w-0 flex et-js-ic sm:et-js-is sm:mt-1 et-gap-sm text-left", unref(badgeList).length === 0 ? "flex-nowrap" : "flex-wrap"])
                    }, [
                      unref(badgeList).length === 0 || unref(badgeList).length > 0 && unref(showTitle) ? (openBlock(), createElementBlock("div", _hoisted_6, toDisplayString(unref(txType).name), 1)) : createCommentVNode("", true),
                      !(unref(badgeList).length === 0 || unref(badgeList).length > 0 && unref(showTitle)) ? (openBlock(), createElementBlock("div", _hoisted_7)) : !unref(isSmallerThanXXS) ? (openBlock(), createElementBlock("div", _hoisted_8)) : createCommentVNode("", true),
                      unref(hasTxNote) ? (openBlock(), createElementBlock("div", _hoisted_9, [
                        createBaseVNode("div", null, [
                          withDirectives((openBlock(), createBlock(_component_Button, {
                            class: "p-0.5 -ml-0.5 mt-0.25",
                            rounded: "",
                            link: "",
                            onClick: withModifiers(unref(openModalTransactionNote), ["stop", "prevent"])
                          }, {
                            default: withCtx(() => [
                              createVNode(IconNotebook, { class: "size-4" })
                            ]),
                            _: 1
                          }, 8, ["onClick"])), [
                            [
                              _directive_tooltip,
                              unref($t)("tx-note:button.editNote.tooltip"),
                              void 0,
                              { top: true }
                            ]
                          ])
                        ])
                      ])) : createCommentVNode("", true),
                      (!unref(isSmallerThanXXS) || !unref(showTitle)) && unref(badgeList).length > 0 ? (openBlock(), createBlock(_sfc_main$4, {
                        key: 4,
                        badges: unref(badgeList),
                        size: "small",
                        "css-badge": "-mt-1"
                      }, null, 8, ["badges"])) : createCommentVNode("", true)
                    ], 2)
                  ])) : (openBlock(), createElementBlock("div", _hoisted_10))
                ]),
                _: 1
              })
            ]),
            (!unref(isSmallerThanXXS) || !unref(showTitle)) && unref(blockTime) ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass(["w-full max-w-full et-text-sm text-left text-txt-muted", unref(showTitle) ? "" : "ml-0"])
            }, toDisplayString(unref(formatTimeAndDate)(unref(blockTime) ?? 0, false)), 3)) : !unref(isSmallerThanXXS) && _validFor.value ? (openBlock(), createElementBlock("div", {
              key: 1,
              class: normalizeClass(["w-full max-w-full et-text-sm text-left text-txt-muted", unref(showTitle) ? "" : "ml-0"])
            }, toDisplayString(_validFor.value), 3)) : createCommentVNode("", true)
          ]),
          createBaseVNode("div", _hoisted_11, [
            createBaseVNode("div", _hoisted_12, [
              _cache[0] || (_cache[0] = createBaseVNode("div", { class: "h-6 sm:h-8 w-px" }, null, -1)),
              unref(txBalance) ? (openBlock(), createBlock(_sfc_main$5, {
                key: 0,
                class: "font-semibold",
                amount: unref(txBalance).coin
              }, null, 8, ["amount"])) : createCommentVNode("", true)
            ]),
            createVNode(_sfc_main$6, {
              class: "pt-px pb-0 sm:py-0 px-2.5 sm:px-3",
              amount: unref(txBalance)?.coin ?? "0",
              "clipboard-enabled": ""
            }, null, 8, ["amount"])
          ])
        ]),
        unref(isSmallerThanXXS) && unref(showTitle) ? (openBlock(), createElementBlock("div", _hoisted_13, [
          createBaseVNode("div", _hoisted_14, [
            unref(badgeList).length > 0 ? (openBlock(), createBlock(_sfc_main$4, {
              key: 0,
              badges: unref(badgeList),
              size: "small"
            }, null, 8, ["badges"])) : createCommentVNode("", true)
          ]),
          createBaseVNode("div", _hoisted_15, [
            unref(blockTime) ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass(["w-full max-w-full et-text-sm text-left text-txt-muted", unref(showTitle) ? "" : "ml-0"])
            }, toDisplayString(unref(formatTimeAndDate)(unref(blockTime) ?? 0, false, true, true, unref(isSmallerThanXXS))), 3)) : _validFor.value ? (openBlock(), createElementBlock("div", {
              key: 1,
              class: normalizeClass(["w-full max-w-full et-text-sm text-left text-txt-muted", unref(showTitle) ? "" : "ml-0"])
            }, toDisplayString(_validFor.value), 3)) : createCommentVNode("", true)
          ])
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});

export { IconNotebook as I, _sfc_main as _, getJsonValue as a, useModalTransactionNote as b, getNetworkExplorerUrlFromItx as g, isMilkomedaTx as i, networkMetadataAddressKey as n, useTxInfos as u };
