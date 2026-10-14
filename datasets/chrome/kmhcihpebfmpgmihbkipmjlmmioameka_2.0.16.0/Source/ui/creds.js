import { a4 as getUtxoHash, z as addValueToValue, bo as getCSLVkeywitnessHash, bp as cslDerivePubKey, bq as getBip32PublicKeyCreds, s as safeFreeCSLObject, N as NativeScript, O as cslToJson, b7 as AuxiliaryData, br as NativeScripts, ai as chain, bs as GeneralTransactionMetadata, bt as encode_json_str_to_metadatum, M as MetadataJsonSchema, bu as BigNum, f as freeCSLObjects, bv as jsonToCsl, bw as ScriptAny, bx as ScriptAll, by as ScriptNOfK, bz as getXpubFromXvkShared, e as getIAppAccountById, bA as getCSLBip32PublicKey, ah as multisigPath, bB as getCSLCredential, bC as ScriptPubkey, bD as TimelockStart, bE as decode_metadatum_to_json_str, bF as TransactionMetadatum, aD as getBaseAddressFromCred, aE as getEnterpriseAddressFromCred, bG as getAllInputUtxoHashList, bH as loadUnknownUtxos, aj as getNativeScriptCredFromHex, bI as getIAppAccountByCred, W as getOwnedCred, h as calcAccountTxBalance, V as getAddressCredentials } from './app2.js';
import { E as ErrorSignTx } from './ErrorSignTx.js';
import { n as neg, j as add, s as subtract } from './bigmath.js';
import { cs as byteaToHex, bI as DEFAULT_ACCOUNT_ID, aI as toHexArray, aJ as toHexString } from './index.js';
import { a as getCalculatedChainTip } from './chain.js';
import { q as generateAccountId } from './useAppAccountBalances.js';
import './NetworkId.js';
import { f as getRequestData, A as ApiRequestType, E as ErrorSync } from './epochParams.js';

const getDeposit = (tx, chosenCredSet, invert = false) => {
  let deposit = "0";
  const inputUtxoList = tx.inputUtxoList;
  if (inputUtxoList && inputUtxoList.length > 0) {
    const balance = { coin: "0" };
    for (const input of tx.body.inputs) {
      const utxo = inputUtxoList.find((utxo2) => getUtxoHash(utxo2.input) === getUtxoHash(input));
      if (utxo) {
        addValueToValue(balance, utxo.output.amount, false);
      }
    }
    for (const output of tx.body.outputs) {
      addValueToValue(balance, output.amount, true);
    }
    addValueToValue(balance, { coin: tx.body.fee }, true);
    if (tx.body.withdrawals) {
      for (const stakeKey in tx.body.withdrawals) {
        const amount = tx.body.withdrawals[stakeKey];
        addValueToValue(balance, { coin: amount }, false);
      }
    }
    deposit = balance.coin;
  }
  getDepositByCerts(tx, 2, 500, chosenCredSet, invert);
  if (invert && deposit !== "0") {
    return neg(deposit);
  }
  return deposit;
};
const getDepositByCerts = (tx, stakeAddressDeposit, stakePoolDeposit, chosenCredSet, invert = false) => {
  const certs = tx.body.certs;
  let deposit = "0";
  if (certs) {
    for (const cert of certs) {
      if (cert.hasOwnProperty("StakeRegistration") || cert.hasOwnProperty("StakeRegistrationAndDelegation") || cert.hasOwnProperty("StakeVoteRegistrationAndDelegation") || cert.hasOwnProperty("VoteRegistrationAndDelegation")) {
        if (chosenCredSet) {
          let regCert;
          if (cert.hasOwnProperty("StakeRegistration")) {
            regCert = cert.StakeRegistration;
          } else if (cert.hasOwnProperty("StakeRegistrationAndDelegation")) {
            regCert = cert.StakeRegistrationAndDelegation;
          } else if (cert.hasOwnProperty("StakeVoteRegistrationAndDelegation")) {
            regCert = cert.StakeVoteRegistrationAndDelegation;
          } else {
            regCert = cert.VoteRegistrationAndDelegation;
          }
          const cred = Object.values(regCert.stake_credential)[0];
          chosenCredSet.add(cred);
        }
        deposit = add(deposit, stakeAddressDeposit);
      } else if (cert.hasOwnProperty("StakeDeregistration")) {
        if (chosenCredSet) {
          const cred = Object.values(cert.StakeDeregistration.stake_credential)[0];
          chosenCredSet.add(cred);
        }
        deposit = subtract(deposit, stakeAddressDeposit);
      } else if (cert.hasOwnProperty("PoolRegistration")) {
        if (chosenCredSet) {
          const poolParams = cert.PoolRegistration.pool_params;
          chosenCredSet.add(poolParams.operator);
          for (const owner of poolParams.pool_owners) {
            chosenCredSet.add(owner);
          }
        }
        deposit = add(deposit, stakePoolDeposit);
      } else if (cert.hasOwnProperty("PoolRetirement")) {
        if (chosenCredSet) {
          const cred = cert.PoolRetirement.pool_keyhash;
          chosenCredSet.add(cred);
        }
      } else if (cert.hasOwnProperty("StakeDelegation") || cert.hasOwnProperty("StakeAndVoteDelegation") || cert.hasOwnProperty("VoteDelegation")) {
        if (chosenCredSet) {
          let delCert;
          if (cert.hasOwnProperty("StakeDelegation")) {
            delCert = cert.StakeDelegation;
          } else if (cert.hasOwnProperty("StakeAndVoteDelegation")) {
            delCert = cert.StakeAndVoteDelegation;
          } else {
            delCert = cert.VoteDelegation;
          }
          const cred = Object.values(delCert.stake_credential)[0];
          chosenCredSet.add(cred);
        }
      } else if (cert.hasOwnProperty("DRepRegistration")) {
        const drepReg = cert.DRepRegistration;
        if (chosenCredSet) {
          const cred = Object.values(drepReg.voting_credential)[0];
          chosenCredSet.add(cred);
        }
        deposit = add(deposit, drepReg.coin);
      } else if (cert.hasOwnProperty("DRepDeregistration")) {
        const drepDeReg = cert.DRepDeregistration;
        if (chosenCredSet) {
          const cred = Object.values(drepDeReg.voting_credential)[0];
          chosenCredSet.add(cred);
        }
        deposit = subtract(deposit, drepDeReg.coin);
      } else if (cert.hasOwnProperty("DRepUpdate")) {
        if (chosenCredSet) {
          const cred = Object.values(cert.DRepUpdate.voting_credential)[0];
          chosenCredSet.add(cred);
        }
      } else if (cert.hasOwnProperty("CommitteeHotAuth") || cert.hasOwnProperty("CommitteeColdResign")) {
        if (chosenCredSet) {
          let committeeCert;
          if (cert.hasOwnProperty("CommitteeHotAuth")) {
            committeeCert = cert.CommitteeHotAuth;
          } else {
            committeeCert = cert.CommitteeColdResign;
          }
          const cred = Object.values(committeeCert.committee_cold_credential)[0];
          chosenCredSet.add(cred);
        }
      } else if (cert.hasOwnProperty("GenesisKeyDelegation")) ; else if (cert.hasOwnProperty("MoveInstantaneousRewardsCert")) ; else {
        throw new Error("Unknown certificate: " + JSON.stringify(cert));
      }
    }
  }
  if (invert && deposit !== "0") {
    return neg(deposit);
  }
  return deposit;
};

const dataMap = {};
const useWitnesses = () => {
  const getWitnessesData = (txHash) => {
    if (!dataMap[txHash]) {
      dataMap[txHash] = {
        vkeyWitnessHashList: [],
        redeemerSpendIndexList: [],
        redeemerMintIndexList: [],
        inputList: [],
        mintList: [],
        nativeScriptList: [],
        plutusContractList: []
      };
    }
    return dataMap[txHash];
  };
  const parseWitnesses = (tx) => {
    if (!tx) {
      return;
    }
    const data = getWitnessesData(tx.hash);
    const isFirst = data.inputList.length === 0;
    if (isFirst) {
      data.inputList.push(...tx.body.inputs);
      data.inputList.sort((a, b) => a.transaction_id.localeCompare(b.transaction_id, "en-US") || a.index - b.index);
      if (tx.body.mint) {
        data.mintList.push(...tx.body.mint.map((m) => m[0]));
        data.mintList.sort((a, b) => a.localeCompare(b, "en-US"));
      }
      for (const redeemer of tx?.witness_set.redeemers ?? []) {
        if (redeemer.tag === "Spend") {
          data.redeemerSpendIndexList.push(parseInt(redeemer.index));
        } else if (redeemer.tag === "Mint") {
          data.redeemerMintIndexList.push(parseInt(redeemer.index));
        }
      }
    }
    for (const vkeyWitness of tx?.witness_set.vkeys ?? []) {
      const hash = getCSLVkeywitnessHash(JSON.stringify(vkeyWitness));
      if (!data.vkeyWitnessHashList.includes(hash)) {
        data.vkeyWitnessHashList.push(hash);
      }
    }
  };
  const isSignedHash = (txHash, hash) => {
    const data = getWitnessesData(txHash);
    return data.vkeyWitnessHashList.includes(hash);
  };
  const isSignedUtxo = (txHash, utxo) => {
    if (!utxo.pc || typeof utxo.pc !== "string") {
      return false;
    }
    const data = getWitnessesData(txHash);
    return data.vkeyWitnessHashList.includes(utxo.pc) || data.nativeScriptList.some((ns) => ns.scriptHash === utxo.pc);
  };
  const hasSpendRedeemer = (txHash, _input) => {
    const data = getWitnessesData(txHash);
    const hash = getUtxoHash(_input);
    const index = data.inputList.findIndex((input) => getUtxoHash(input) === hash) ?? -1;
    return index >= 0 && data.redeemerSpendIndexList.includes(index);
  };
  const hasMintRedeemer = (txHash, _policyId) => {
    const data = getWitnessesData(txHash);
    const index = data.mintList.indexOf(_policyId);
    return index >= 0 && data.redeemerMintIndexList.includes(index);
  };
  const getVkeyWitnessHashList = (txHash) => {
    const data = getWitnessesData(txHash);
    return data.vkeyWitnessHashList;
  };
  return {
    getWitnessesData,
    parseWitnesses,
    isSignedHash,
    isSignedUtxo,
    hasSpendRedeemer,
    hasMintRedeemer,
    getVkeyWitnessHashList
  };
};

const createICreds = (chainPubKey, chainPath, index) => {
  const derivedCredKey = cslDerivePubKey(chainPubKey, [index], false, false);
  const cred = {
    path: chainPath.concat(index),
    cred: getBip32PublicKeyCreds(derivedCredKey),
    used: false
  };
  safeFreeCSLObject(derivedCredKey);
  return cred;
};
const generateCredRange = (accountPubKey, accountPath, store, chain2, end) => {
  const derivedChainKey = cslDerivePubKey(accountPubKey, [chain2], false, false);
  const chainPath = accountPath.concat(chain2);
  for (let index = store.length; index < end; index++) {
    store[index] = createICreds(derivedChainKey, chainPath, index);
  }
};
const syncMultiSigCredUsed = (networkId, accountId, credList) => {
  if (!accountId) {
    accountId = DEFAULT_ACCOUNT_ID;
  }
  return getRequestData()(
    networkId,
    accountId,
    ApiRequestType.syncMultiSigCredUsed,
    ErrorSync.syncMultiSigCredUsed,
    {
      id: accountId,
      credList: credList.map((hash) => byteaToHex(hash))
    },
    async (data) => data.isCredUsedList
  );
};

const ErrorMultiSig = {
  noUnusedPaymentKeys: "ErrorMultiSig.noUnusedPaymentKeys",
  noUnusedStakeKeys: "ErrorMultiSig.noUnusedStakeKeys",
  noUnusedDRepKeys: "ErrorMultiSig.noUnusedDRepKeys",
  apiUsedKeyState: "ErrorMultiSig.apiUsedKeyState",
  unknownError: "ErrorMultiSig.unknownError"
};

const getScriptSigner = (cred) => {
  const cslCredential = getCSLCredential(cred, false);
  if (cslCredential.kind() === 0) {
    const cslScriptPubKey = ScriptPubkey.new(cslCredential.to_keyhash());
    const cslSigner = NativeScript.new_script_pubkey(cslScriptPubKey);
    safeFreeCSLObject(cslScriptPubKey);
    return cslSigner;
  }
  safeFreeCSLObject(cslCredential);
  return null;
};
const getScriptTimelockAfter = (slot) => {
  const cslTimelockStart = TimelockStart.new(slot);
  const cslTimelock = NativeScript.new_timelock_start(cslTimelockStart);
  safeFreeCSLObject(cslTimelockStart);
  return cslTimelock;
};
const getIScriptMetaFromCbor = (metaCbor) => {
  const cslGeneralMeta = GeneralTransactionMetadata.from_bytes(toHexArray(metaCbor));
  const label = BigNum.from_str("1854");
  const cslMeta = cslGeneralMeta.get(label);
  let meta = void 0;
  if (cslMeta) {
    meta = JSON.parse(decode_metadatum_to_json_str(cslMeta, MetadataJsonSchema.NoConversions));
  }
  safeFreeCSLObject(cslMeta);
  safeFreeCSLObject(label);
  safeFreeCSLObject(cslGeneralMeta);
  return meta;
};
const getMultiSigFromCbor = (networkId, scriptsCbor, metaCbor) => {
  const cslMeta = TransactionMetadatum.from_bytes(toHexArray(metaCbor));
  const meta = JSON.parse(decode_metadatum_to_json_str(cslMeta, MetadataJsonSchema.NoConversions));
  const cslNativeScripts = NativeScripts.from_bytes(toHexArray(scriptsCbor));
  const paymentScriptIndex = meta.types?.findIndex((t) => t === chain.payment);
  if (paymentScriptIndex === -1) {
    throw "No payment script found";
  }
  const cslPaymentScript = cslNativeScripts.len() > paymentScriptIndex ? cslNativeScripts.get(paymentScriptIndex) : null;
  if (!cslPaymentScript) {
    throw "No matching script found for payment index";
  }
  const stakeScriptIndex = meta.types?.findIndex((t) => t === chain.stake);
  const cslStakeScript = stakeScriptIndex >= 0 && cslNativeScripts.len() > stakeScriptIndex ? cslNativeScripts.get(stakeScriptIndex) : null;
  const drepScriptIndex = meta.types?.findIndex((t) => t === chain.drep);
  const cslDRepScript = drepScriptIndex >= 0 && cslNativeScripts.len() > drepScriptIndex ? cslNativeScripts.get(drepScriptIndex) : null;
  const paymentScript = cslToJson(cslPaymentScript.to_json());
  const stakeScript = cslStakeScript ? cslToJson(cslStakeScript.to_json()) : null;
  const drepScript = cslDRepScript ? cslToJson(cslDRepScript.to_json()) : null;
  const paymentCred = toHexString(cslPaymentScript.hash().to_bytes());
  const stakeCred = cslStakeScript ? toHexString(cslStakeScript.hash().to_bytes()) : null;
  const address = stakeCred ? getBaseAddressFromCred(paymentCred, stakeCred, networkId, true, true) : getEnterpriseAddressFromCred(paymentCred, networkId, true);
  safeFreeCSLObject(cslMeta);
  safeFreeCSLObject(cslNativeScripts);
  safeFreeCSLObject(cslPaymentScript);
  safeFreeCSLObject(cslStakeScript);
  safeFreeCSLObject(cslDRepScript);
  return { paymentScript, stakeScript, drepScript, address, meta };
};
const generateSimpleMultiSig = (participants, requiredSigners) => {
  const free = [];
  let cslPaymentScript = void 0;
  let cslStakeScript = void 0;
  let cslDRepScript = void 0;
  const paymentParticipants = participants.reduce((acc, cur) => acc + (cur.keys.payment.length > 0 ? 1 : 0), 0);
  const stakeParticipants = participants.reduce((acc, cur) => acc + (cur.keys.stake.length > 0 ? 1 : 0), 0);
  const drepParticipants = participants.reduce((acc, cur) => acc + (cur.keys.drep.length > 0 ? 1 : 0), 0);
  const paymentSigners = Math.min(requiredSigners, paymentParticipants);
  const stakeSigners = Math.min(requiredSigners, stakeParticipants);
  const drepSigners = Math.min(requiredSigners, drepParticipants);
  const cslPaymentSignerList = NativeScripts.new();
  free.push(cslPaymentSignerList);
  const cslStakeSignerList = NativeScripts.new();
  free.push(cslStakeSignerList);
  const cslDRepSignerList = NativeScripts.new();
  free.push(cslDRepSignerList);
  for (const participant of participants) {
    if (participant.keys.payment.length > 0) {
      const cslSigner = getScriptSigner(participant.keys.payment[0].cred);
      if (cslSigner) {
        cslPaymentSignerList.add(cslSigner);
        free.push(cslSigner);
      }
    }
    if (participant.keys.stake.length > 0) {
      const cslSigner = getScriptSigner(participant.keys.stake[0].cred);
      if (cslSigner) {
        cslStakeSignerList.add(cslSigner);
        free.push(cslSigner);
      }
    }
    if (participant.keys.drep.length > 0) {
      const cslSigner = getScriptSigner(participant.keys.drep[0].cred);
      if (cslSigner) {
        cslDRepSignerList.add(cslSigner);
        free.push(cslSigner);
      }
    }
  }
  if (paymentSigners === 1) {
    const cslScriptAny = ScriptAny.new(cslPaymentSignerList);
    free.push(cslScriptAny);
    cslPaymentScript = NativeScript.new_script_any(cslScriptAny);
    free.push(cslPaymentScript);
  } else if (paymentSigners === paymentParticipants) {
    const cslScriptAll = ScriptAll.new(cslPaymentSignerList);
    free.push(cslScriptAll);
    cslPaymentScript = NativeScript.new_script_all(cslScriptAll);
    free.push(cslPaymentScript);
  } else {
    const cslScriptNOfK = ScriptNOfK.new(paymentSigners, cslPaymentSignerList);
    free.push(cslScriptNOfK);
    cslPaymentScript = NativeScript.new_script_n_of_k(cslScriptNOfK);
    free.push(cslPaymentScript);
  }
  if (stakeSigners === 0) ; else if (stakeSigners === 1) {
    const cslScriptAny = ScriptAny.new(cslStakeSignerList);
    free.push(cslScriptAny);
    cslStakeScript = NativeScript.new_script_any(cslScriptAny);
    free.push(cslStakeScript);
  } else if (stakeSigners === stakeParticipants) {
    const cslScriptAll = ScriptAll.new(cslStakeSignerList);
    free.push(cslScriptAll);
    cslStakeScript = NativeScript.new_script_all(cslScriptAll);
    free.push(cslStakeScript);
  } else {
    const cslScriptNOfK = ScriptNOfK.new(stakeSigners, cslStakeSignerList);
    free.push(cslScriptNOfK);
    cslStakeScript = NativeScript.new_script_n_of_k(cslScriptNOfK);
    free.push(cslStakeScript);
  }
  if (drepSigners === 0) ; else if (drepSigners === 1) {
    const cslScriptAny = ScriptAny.new(cslDRepSignerList);
    free.push(cslScriptAny);
    cslDRepScript = NativeScript.new_script_any(cslScriptAny);
    free.push(cslDRepScript);
  } else if (stakeSigners === stakeParticipants) {
    const cslScriptAll = ScriptAll.new(cslDRepSignerList);
    free.push(cslScriptAll);
    cslDRepScript = NativeScript.new_script_all(cslScriptAll);
    free.push(cslDRepScript);
  } else {
    const cslScriptNOfK = ScriptNOfK.new(drepSigners, cslDRepSignerList);
    free.push(cslScriptNOfK);
    cslDRepScript = NativeScript.new_script_n_of_k(cslScriptNOfK);
    free.push(cslDRepScript);
  }
  const paymentScript = toHexString(cslPaymentScript.to_bytes());
  const stakeScript = cslStakeScript ? toHexString(cslStakeScript.to_bytes()) : null;
  const drepScript = cslDRepScript ? toHexString(cslDRepScript.to_bytes()) : null;
  freeCSLObjects(free);
  return { paymentScript, stakeScript, drepScript };
};
const generateScriptFromNodeList = (type, rootNode, nodeList, free) => {
  const cslNativeScripts = NativeScripts.new();
  free.push(cslNativeScripts);
  const requiredSigners = rootNode.data.requiredSigners;
  const children = nodeList.filter((n) => n.data.parent === rootNode.id);
  for (const child of children) {
    if (child.type === "participant") {
      const cslSigner = getScriptSigner(child.data.participant.keys[type][0].cred);
      if (cslSigner) {
        cslNativeScripts.add(cslSigner);
        free.push(cslSigner);
      }
    } else if (child.type === "timelock") {
      const cslTimelock = getScriptTimelockAfter(child.data.timelock);
      cslNativeScripts.add(cslTimelock);
      free.push(cslTimelock);
    } else {
      const cslChildRoot = generateScriptFromNodeList(type, child, nodeList, free);
      cslNativeScripts.add(cslChildRoot);
      free.push(cslChildRoot);
    }
  }
  if (requiredSigners === 1) {
    const cslScriptAny = ScriptAny.new(cslNativeScripts);
    free.push(cslScriptAny);
    const cslScript = NativeScript.new_script_any(cslScriptAny);
    free.push(cslScript);
    return cslScript;
  } else if (requiredSigners === children.length) {
    const cslScriptAll = ScriptAll.new(cslNativeScripts);
    free.push(cslScriptAll);
    const cslScript = NativeScript.new_script_all(cslScriptAll);
    free.push(cslScript);
    return cslScript;
  } else {
    const cslScriptNOfK = ScriptNOfK.new(requiredSigners, cslNativeScripts);
    free.push(cslScriptNOfK);
    const cslScript = NativeScript.new_script_n_of_k(cslScriptNOfK);
    free.push(cslScript);
    return cslScript;
  }
};
const getNativeScriptFromJSON = (script) => {
  return NativeScript.from_json(jsonToCsl(script));
};
const getHexFromNativeScriptJSON = (script) => {
  const cslNativeScript = getNativeScriptFromJSON(script);
  const hex = toHexString(cslNativeScript.to_bytes());
  safeFreeCSLObject(cslNativeScript);
  return hex;
};
const getNativeScriptJSONFromHex = (script) => {
  const cslNativeScript = NativeScript.from_bytes(toHexArray(script));
  const json = cslToJson(cslNativeScript.to_json());
  safeFreeCSLObject(cslNativeScript);
  return json;
};
const generateScriptMeta = (name, description, icon, participants) => {
  const meta = {
    types: []
  };
  if (name && name.length > 0) {
    meta.name = name;
  }
  if (description && description.length > 0) {
    meta.description = description;
  }
  if (icon && icon.length > 0) {
    meta.icon = icon;
  }
  for (const participant of participants) {
    if (!meta.participants) {
      meta.participants = {};
    }
    if (participant.name && participant.name.length > 0) {
      const paymentCred = participant.keys.payment.length > 0 ? participant.keys.payment[0].cred : null;
      const stakeCred = participant.keys.stake.length > 0 ? participant.keys.stake[0].cred : null;
      const drepCred = participant.keys.drep.length > 0 ? participant.keys.drep[0].cred : null;
      if (paymentCred) {
        meta.participants[paymentCred] = { name: participant.name };
        if (participant.description) {
          meta.participants[paymentCred].description = participant.description;
        }
        if (participant.icon) {
          meta.participants[paymentCred].icon = participant.icon;
        }
      }
      if (stakeCred) {
        meta.participants[stakeCred] = { name: participant.name };
        if (participant.description) {
          meta.participants[stakeCred].description = participant.description;
        }
        if (participant.icon) {
          meta.participants[stakeCred].icon = participant.icon;
        }
      }
      if (drepCred) {
        meta.participants[drepCred] = { name: participant.name };
        if (participant.description) {
          meta.participants[drepCred].description = participant.description;
        }
        if (participant.icon) {
          meta.participants[drepCred].icon = participant.icon;
        }
      }
    }
  }
  return meta;
};
const generateScriptAuxData = (paymentScript, stakeScript, drepScript, meta) => {
  const free = [];
  const cslAuxData = AuxiliaryData.new();
  free.push(cslAuxData);
  const cslNativeScripts = NativeScripts.new();
  free.push(cslNativeScripts);
  const cslPaymentScript = NativeScript.from_bytes(toHexArray(paymentScript));
  free.push(cslPaymentScript);
  cslNativeScripts.add(cslPaymentScript);
  const _meta = meta ?? { types: [] };
  _meta.types.splice(0);
  _meta.types.push(chain.payment);
  if (stakeScript) {
    const cslStakeScript = NativeScript.from_bytes(toHexArray(stakeScript));
    free.push(cslStakeScript);
    cslNativeScripts.add(cslStakeScript);
    _meta.types.push(chain.stake);
  }
  if (drepScript) {
    const cslDRepScript = NativeScript.from_bytes(toHexArray(drepScript));
    free.push(cslDRepScript);
    cslNativeScripts.add(cslDRepScript);
    _meta.types.push(chain.drep);
  }
  cslAuxData.set_native_scripts(cslNativeScripts);
  const generalMetadata = GeneralTransactionMetadata.new();
  free.push(generalMetadata);
  const metadatum = encode_json_str_to_metadatum(
    JSON.stringify(_meta),
    MetadataJsonSchema.NoConversions
  );
  free.push(metadatum);
  const label = BigNum.from_str("1854");
  free.push(label);
  generalMetadata.insert(label, metadatum);
  cslAuxData.set_metadata(generalMetadata);
  const auxDataJson = cslToJson(cslAuxData.to_json());
  freeCSLObjects(free);
  return auxDataJson;
};
const createOfflineRegistrationData = (auxData) => {
  const cslAuxData = AuxiliaryData.from_json(jsonToCsl(auxData));
  const metadata = toHexString(cslAuxData.metadata().to_bytes());
  const nativeScripts = toHexString(cslAuxData.native_scripts().to_bytes());
  return {
    metadata,
    native_scripts: nativeScripts
  };
};
const deriveMultiSigCredsFromXvkShared = async (networkId, pubKeyBech32) => {
  const accountId = generateAccountId(getXpubFromXvkShared(pubKeyBech32));
  const appAccount = getIAppAccountById(accountId);
  if (appAccount) {
    const unusedPayCredList = appAccount.data.keys.payment.filter((c) => !c.used).sort((a, b) => a.path[4] - b.path[4]);
    if (unusedPayCredList.length === 0) {
      throw ErrorMultiSig.noUnusedPaymentKeys;
    }
    const paymentCred = unusedPayCredList[0];
    const stakeCred = appAccount.data.keys.stake.find((c) => c.path[4] === paymentCred.path[4]);
    if (!stakeCred) {
      throw ErrorMultiSig.noUnusedStakeKeys;
    }
    const drepCred = appAccount.data.account.signType === "ledger" ? paymentCred : appAccount.data.keys.drep.find((c) => c.path[4] === paymentCred.path[4]);
    if (!drepCred) {
      throw ErrorMultiSig.noUnusedDRepKeys;
    }
    return {
      payment: paymentCred,
      stake: stakeCred,
      drep: drepCred
    };
  } else {
    const cslMultiSigPub = getCSLBip32PublicKey(getXpubFromXvkShared(pubKeyBech32));
    let startIndex = 0;
    while (true) {
      const _paymentCredList = [];
      generateCredRange(cslMultiSigPub, multisigPath, _paymentCredList, chain.payment, 25);
      const credList = _paymentCredList.slice(startIndex).map((c) => c.cred);
      const credUsedList = await syncMultiSigCredUsed(networkId, accountId, credList);
      if (!credUsedList) {
        throw ErrorMultiSig.apiUsedKeyState;
      }
      const unusedCredList = credUsedList.filter((c) => !c.used).map((c) => c.cred);
      if (unusedCredList.length > 0) {
        const paymentCredList = _paymentCredList.filter((c) => unusedCredList.includes(c.cred));
        if (paymentCredList.length > 0) {
          const paymentCred = paymentCredList.sort((a, b) => a.path[4] - b.path[4])[0];
          const stakeChainKey = cslDerivePubKey(cslMultiSigPub, [chain.stake], false, false);
          const drepChainKey = cslDerivePubKey(cslMultiSigPub, [chain.drep], false, false);
          const stakeCred = createICreds(stakeChainKey, multisigPath.concat(chain.stake), paymentCred.path[4]);
          const drepCred = createICreds(drepChainKey, multisigPath.concat(chain.drep), paymentCred.path[4]);
          return {
            payment: paymentCred,
            stake: stakeCred,
            drep: drepCred
          };
        }
      }
      startIndex = _paymentCredList.length;
    }
  }
  throw ErrorMultiSig.unknownError;
};
const validateMultiSig = (networkId, nsList, signatures, sigNeeded) => {
  let _sigCnt = 0;
  let _sigNeeded = sigNeeded ?? nsList.length;
  for (const item of nsList) {
    if (item.hasOwnProperty("ScriptPubkey")) {
      const _item = item;
      if (signatures.includes(_item.ScriptPubkey.addr_keyhash)) {
        _sigCnt++;
      }
    } else if (item.hasOwnProperty("TimelockStart")) {
      const _item = item;
      if (parseInt(_item.TimelockStart.slot) >= getCalculatedChainTip(networkId)) {
        _sigCnt++;
      }
    } else if (item.hasOwnProperty("TimelockExpiry")) {
      const _item = item;
      if (parseInt(_item.TimelockExpiry.slot) < getCalculatedChainTip(networkId)) {
        _sigCnt++;
      }
    } else if (item.hasOwnProperty("ScriptAll")) {
      const _item = item;
      if (validateMultiSig(networkId, _item.ScriptAll.native_scripts, signatures)) {
        _sigCnt++;
      }
    } else if (item.hasOwnProperty("ScriptAny")) {
      const _item = item;
      if (validateMultiSig(networkId, _item.ScriptAny.native_scripts, signatures, 1)) {
        _sigCnt++;
      }
    } else if (item.hasOwnProperty("ScriptNOfK")) {
      const _item = item;
      if (validateMultiSig(networkId, _item.ScriptNOfK.native_scripts, signatures, _item.ScriptNOfK.n)) {
        _sigCnt++;
      }
    }
    if (_sigCnt >= _sigNeeded) {
      return true;
    }
  }
  return false;
};
const checkScriptHasTimeLock = (nsList) => {
  let hasTimeLock = false;
  for (const item of nsList) {
    if (item.hasOwnProperty("ScriptAll")) {
      hasTimeLock = hasTimeLock || checkScriptHasTimeLock(item["ScriptAll"].native_scripts);
    } else if (item.hasOwnProperty("ScriptAny")) {
      hasTimeLock = hasTimeLock || checkScriptHasTimeLock(item["ScriptAny"].native_scripts);
    } else if (item.hasOwnProperty("ScriptNOfK")) {
      hasTimeLock = hasTimeLock || checkScriptHasTimeLock(item["ScriptNOfK"].native_scripts);
    } else if (item.hasOwnProperty("TimelockStart") || item.hasOwnProperty("TimelockExpiry")) {
      hasTimeLock = true;
    }
  }
  return hasTimeLock;
};
const joinMetaDataValue = (value) => {
  if (Array.isArray(value)) {
    return value.join("");
  }
  return value ?? "";
};

const getAllVkeysFromNativeScriptList = (nsList) => {
  const vkeySet = /* @__PURE__ */ new Set();
  for (const item of nsList) {
    if (item.hasOwnProperty("ScriptAll")) {
      let vkeyList = getAllVkeysFromNativeScriptList(item["ScriptAll"].native_scripts);
      for (const vkey of vkeyList) {
        vkeySet.add(vkey);
      }
    } else if (item.hasOwnProperty("ScriptAny")) {
      let vkeyList = getAllVkeysFromNativeScriptList(item["ScriptAny"].native_scripts);
      for (const vkey of vkeyList) {
        vkeySet.add(vkey);
      }
    } else if (item.hasOwnProperty("ScriptNOfK")) {
      let vkeyList = getAllVkeysFromNativeScriptList(item["ScriptNOfK"].native_scripts);
      for (const vkey of vkeyList) {
        vkeySet.add(vkey);
      }
    } else if (item.hasOwnProperty("ScriptPubkey")) {
      vkeySet.add(item["ScriptPubkey"].addr_keyhash);
    }
  }
  return Array.from(vkeySet);
};
const getNativeScriptCredList = async (networkId, tx, script, witnessUtil) => {
  const known = /* @__PURE__ */ new Set();
  const unknown = /* @__PURE__ */ new Set();
  const ownedList = [];
  const foreign = /* @__PURE__ */ new Set();
  const signed = /* @__PURE__ */ new Set();
  const unsigned = /* @__PURE__ */ new Set();
  const vkeyList = getAllVkeysFromNativeScriptList([script]);
  for (const nsSig of vkeyList) {
    known.add(nsSig);
    if (witnessUtil.isSignedHash(tx.hash, nsSig)) {
      signed.add(nsSig);
    }
  }
  const knownList = Array.from(known);
  for (const cred of knownList) {
    const appAccount = getIAppAccountByCred(cred, true);
    if (appAccount && !appAccount.isReadOnly) {
      const ownedCred = getOwnedCred([appAccount.data.keys], cred);
      const _owned = ownedList.find((oc) => oc.accountId === appAccount.id);
      if (_owned) {
        if (_owned.credList.some((c) => c.cred === cred)) {
          continue;
        }
        _owned.credList.push(ownedCred);
      } else {
        const txBalance = await calcAccountTxBalance(appAccount, tx);
        ownedList.push({
          accountId: appAccount.id,
          walletId: appAccount.walletId,
          type: appAccount.data.account.signType,
          credList: [ownedCred],
          txBalance
        });
      }
    } else {
      foreign.add(cred);
    }
  }
  const foreignList = Array.from(foreign);
  for (const foreignCred of foreignList) {
    if (!signed.has(foreignCred)) {
      unsigned.add(foreignCred);
    }
  }
  for (const ownedCred of ownedList) {
    for (const cred of ownedCred.credList) {
      if (!signed.has(cred.cred)) {
        unsigned.add(cred.cred);
      }
    }
  }
  const unsignedCredList = Array.from(unsigned);
  const scriptValid = validateMultiSig(networkId, [script], Array.from(signed));
  return {
    known: knownList,
    unknown: Array.from(unknown),
    ownedList,
    foreign: foreignList,
    signed: Array.from(signed),
    unsigned: unsignedCredList,
    scriptValid
  };
};
const getSignTxCredList = async (networkId, tx, restrictToAccountIds) => {
  if (!tx) {
    throw ErrorSignTx.missingTx;
  }
  if (!tx.inputUtxoList) {
    throw ErrorSignTx.missingTx;
  }
  const unknownInputList = getAllInputUtxoHashList(tx);
  if (unknownInputList.length > 0) {
    await loadUnknownUtxos(networkId, tx.inputUtxoList, unknownInputList);
  }
  const known = /* @__PURE__ */ new Set();
  const unknown = /* @__PURE__ */ new Set();
  const ownedList = [];
  const foreign = /* @__PURE__ */ new Set();
  const signed = /* @__PURE__ */ new Set();
  const unsigned = /* @__PURE__ */ new Set();
  const certCreds = /* @__PURE__ */ new Set();
  const scriptCredList = [];
  const witnessUtil = useWitnesses();
  witnessUtil.parseWitnesses(tx);
  if (tx.body.required_signers) {
    for (const reqSig of tx.body.required_signers) {
      known.add(reqSig);
      if (witnessUtil.isSignedHash(tx.hash, reqSig)) {
        signed.add(reqSig);
      }
    }
  }
  let allScriptsValid = true;
  if (tx.witness_set.native_scripts) {
    for (const script of tx.witness_set.native_scripts) {
      const nsCredList = await getNativeScriptCredList(networkId, tx, script, witnessUtil);
      scriptCredList.push(nsCredList);
      if (!nsCredList.scriptValid) {
        allScriptsValid = false;
      }
      const scriptHex = getHexFromNativeScriptJSON(script);
      const scriptHash = getNativeScriptCredFromHex(scriptHex);
      signed.add(scriptHash);
    }
  }
  addCredsFromInputList(tx.hash, tx.body.collateral, known, unknown, signed, tx.inputUtxoList, witnessUtil.isSignedUtxo, witnessUtil.hasSpendRedeemer);
  addCredsFromInputList(tx.hash, tx.body.inputs, known, unknown, signed, tx.inputUtxoList, witnessUtil.isSignedUtxo, witnessUtil.hasSpendRedeemer);
  addCredsFromWithdrawalList(tx.hash, tx.body.withdrawals, known, signed, witnessUtil.isSignedHash);
  addCredsFromGovActions(tx.hash, tx.body.voting_procedures, known, signed, witnessUtil.isSignedHash);
  getDeposit(tx, certCreds);
  const certCredsList = Array.from(certCreds);
  for (const cred of certCredsList) {
    known.add(cred);
    if (witnessUtil.isSignedHash(tx.hash, cred)) {
      signed.add(cred);
    }
  }
  const knownList = Array.from(known);
  for (const cred of knownList) {
    const appAccount = getIAppAccountByCred(cred, true);
    if (!!appAccount && (!restrictToAccountIds || restrictToAccountIds.includes(appAccount.id))) {
      const ownedCred = getOwnedCred([appAccount.data.keys], cred);
      const _owned = ownedList.find((oc) => oc.accountId === appAccount.id);
      if (_owned) {
        if (_owned.credList.some((c) => c.cred === cred)) {
          continue;
        }
        _owned.credList.push(ownedCred);
      } else {
        const txBalance = await calcAccountTxBalance(appAccount, tx);
        ownedList.push({
          accountId: appAccount.id,
          walletId: appAccount.walletId,
          type: appAccount.data.account.signType,
          credList: [ownedCred],
          txBalance
        });
      }
    } else {
      foreign.add(cred);
    }
  }
  const foreignList = Array.from(foreign);
  let allForeignSigned = unknown.size === 0;
  let allOwnedSigned = true;
  for (const foreignCred of foreignList) {
    if (!signed.has(foreignCred)) {
      allForeignSigned = false;
      unsigned.add(foreignCred);
    }
  }
  for (const ownedCred of ownedList) {
    for (const cred of ownedCred.credList) {
      if (!signed.has(cred.cred)) {
        allOwnedSigned = false;
        unsigned.add(cred.cred);
      }
    }
  }
  const unsignedCredList = Array.from(unsigned);
  let canSignAllUnsigned = true;
  for (const unsignedCred of unsignedCredList) {
    if (!ownedList.some((oc) => oc.credList.some((c) => c.cred === unsignedCred))) {
      canSignAllUnsigned = false;
      break;
    }
  }
  return {
    known: knownList,
    unknown: Array.from(unknown),
    ownedList,
    foreign: foreignList,
    signed: Array.from(signed),
    unsigned: unsignedCredList,
    scriptCredList,
    total: knownList.length + unknown.size,
    allForeignSigned,
    allOwnedSigned,
    canSignAllUnsigned,
    allScriptsValid
  };
};
const addCredsFromInputList = (txHash, inputList, known, unknown, signed, inputUtxoList, isSignedUtxo, hasRedeemer) => {
  if (inputList) {
    for (const input of inputList) {
      const inputUtxoHash = getUtxoHash(input);
      const utxo = inputUtxoList.find((utxo2) => getUtxoHash(utxo2.input) === inputUtxoHash);
      if (!utxo) {
        unknown.add(inputUtxoHash);
        continue;
      }
      known.add(utxo.pc);
      if (isSignedUtxo(txHash, utxo) || hasRedeemer(txHash, utxo.input)) {
        signed.add(utxo.pc);
      }
    }
  }
};
const addCredsFromWithdrawalList = (txHash, withdrawalList, known, signed, isSignedHash) => {
  if (withdrawalList) {
    const entryList = Object.entries(withdrawalList);
    for (const withdrawal of entryList) {
      if (withdrawal[1] === "0") {
        continue;
      }
      const credentials = getAddressCredentials(withdrawal[0]);
      if (credentials.stakeCred) {
        known.add(credentials.stakeCred);
        if (isSignedHash(txHash, credentials.stakeCred)) {
          signed.add(credentials.stakeCred);
        }
      }
    }
  }
};
const addCredsFromGovActions = (txHash, voting_procedures, known, signed, isSignedHash) => {
  if (voting_procedures) {
    for (const procedure of voting_procedures) {
      const voterType = Object.keys(procedure.voter)[0];
      switch (voterType) {
        case "ConstitutionalCommitteeHotCred": {
          const ccHotKey = procedure.voter.ConstitutionalCommitteeHotCred;
          const cred = Object.values(ccHotKey)[0];
          known.add(cred);
          if (isSignedHash(txHash, cred)) {
            signed.add(cred);
          }
          break;
        }
        case "DRep": {
          const drep = procedure.voter.DRep;
          const cred = Object.values(drep)[0];
          known.add(cred);
          if (isSignedHash(txHash, cred)) {
            signed.add(cred);
          }
          break;
        }
      }
    }
  }
};

export { ErrorMultiSig as E, getSignTxCredList as a, getNativeScriptJSONFromHex as b, getAllVkeysFromNativeScriptList as c, checkScriptHasTimeLock as d, generateScriptAuxData as e, createOfflineRegistrationData as f, getHexFromNativeScriptJSON as g, generateScriptMeta as h, getIScriptMetaFromCbor as i, joinMetaDataValue as j, getDepositByCerts as k, getMultiSigFromCbor as l, deriveMultiSigCredsFromXvkShared as m, generateSimpleMultiSig as n, generateScriptFromNodeList as o, useWitnesses as u };
