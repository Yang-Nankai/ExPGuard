import { D as computed, aI as toHexArray, Q as reactive, aM as el, aN as sl, aX as json, aV as now, aJ as toHexString } from './index.js';
import { u as useSelectedAccount } from './epochParams.js';
import { i as useAccountSettings, j as useAppAccountBalances, u as useWalletSettings, k as useAppAccount, n as useAppWallet, s as sleep, y as getChangeAddress } from './useAppAccountBalances.js';
import { g as getNetworkDecimals } from './NetworkId.js';
import { cd as getCSLTransactionBuilderConfigBuilder, ce as getCSLLinearFee, cf as getCSLBigNum, cg as getCSLExUnitPrices, ch as TransactionBuilder, f as freeCSLObjects, ci as TxInputsBuilder, N as NativeScript, cj as NativeScriptSource, ck as TransactionInput, bv as jsonToCsl, cl as Value, cm as Address, s as safeFreeCSLObject, cn as getTransactionOutputFromJSON, L as LanguageKind, P as PlutusScript, S as ScriptRef, bu as BigNum, b7 as AuxiliaryData, co as CertificatesBuilder, cp as Certificate, cq as VotingBuilder, cr as Voter, cs as GovernanceActionId, ct as VotingProcedure, cu as WithdrawalsBuilder, cv as getRewardAddressFromBech32, cw as Ed25519KeyHashes, cx as PlutusData, cy as Costmdls, cz as addOutputToBalance, E as ErrorBuildTx, cA as filterUtxoFromList, cB as sortUtxoListByAdaDesc, t as clearBalance, c4 as createTransactionOutputJSON, bW as getDonationAddress, H as getMinUtxo, v as addToBalance, c3 as getFilteredUtxoList, cC as sortInputListByScore, cD as filterUtxoList, r as createIBalance, cE as getInputBalance, cF as getOutputBalance, ca as decreaseBalance, b8 as TransactionWitnessSet, F as FixedTransaction, cG as hash_transaction, b9 as Transaction, bc as getTransactionJSONFromCSL, cH as hasNewerBuild, z as addValueToValue, cI as getTransactionOutputSize, cJ as splitTokenFragmentation, cK as splitLargeOutput, K as addMultiAssets, cL as filterUtxoListByHashList, a4 as getUtxoHash, cM as addRewardsToBalance, A as updateBalanceTotal, cN as filterRewardInfoList, cO as sortRewardInfoListByAdaAsc, cP as getRewardInfoListBalance } from './app2.js';
import { c as compare, j as add, i as isZero, f as isGreaterThanZero, k as isZeroOrGreater, s as subtract, m as multiply, d as divide, a as isLessThanZero, h as isZeroOrLess } from './bigmath.js';
import { a as getCalculatedChainTip } from './chain.js';
import { k as getDepositByCerts } from './creds.js';
import { h as hasConwaySetTag } from './useSignTx.js';

const {
  selectedWalletId,
  selectedAccountId
} = useSelectedAccount();
const buildWalletId = selectedWalletId;
const buildAccountId = selectedAccountId;
const isBuildAccountSet = computed(() => !!buildAccountId.value);

const appWallet = useAppWallet(buildWalletId);
const walletSettings = useWalletSettings(appWallet);
const walletData = walletSettings.data;
const appAccount = useAppAccount(appWallet, buildAccountId);
const appAccountBalances = useAppAccountBalances(appAccount);
const accountSettings = useAccountSettings(appAccount);
const accountData = accountSettings.data;
const accountBalance = computed(() => accountData.value?.balance);
const utxoMap = accountSettings.utxoMap;
function useBuildAccount() {
  return {
    buildAccountId,
    buildWalletId,
    isBuildAccountSet,
    buildWallet: appWallet,
    buildAccount: appAccount,
    walletData,
    walletSettings,
    accountData,
    accountSettings,
    accountBalance,
    accountBalances: appAccountBalances,
    utxoMap
  };
}

const getTxBuilder = (appAccount, tx, txConfig) => {
  const epochParams = txConfig.epochParams;
  const free = [];
  const cfg = getCSLTransactionBuilderConfigBuilder(free).fee_algo(getCSLLinearFee(
    epochParams.txFeePerByte,
    epochParams.txFeeFixed,
    free
  )).pool_deposit(getCSLBigNum(epochParams.stakePoolDeposit, free)).key_deposit(getCSLBigNum(epochParams.stakeAddressDeposit, free)).coins_per_utxo_byte(getCSLBigNum(epochParams.utxoCostPerSize, free)).max_value_size(epochParams.maxValueSize).max_tx_size(epochParams.maxTxSize).ex_unit_prices(getCSLExUnitPrices(
    epochParams.executionUnitPrices.memory,
    epochParams.executionUnitPrices.steps,
    free
  )).prefer_pure_change(true).build();
  const txBuilder = TransactionBuilder.new(cfg);
  freeCSLObjects(free);
  setTTL(tx, txBuilder);
  setValidityStartInterval(tx, txBuilder);
  setAuxData(tx, txBuilder);
  addCerts(appAccount, tx, txBuilder);
  addVoteProcedures(tx, txBuilder);
  addWithdrawals(appAccount, tx, txBuilder);
  addRequiredSigners(tx, txBuilder);
  setScriptDataHash(txConfig, txBuilder);
  return txBuilder;
};
const addInputs = (appAccount, inputUtxoList, txBuilder) => {
  const txInputsBuilder = TxInputsBuilder.new();
  let cslPaymentScript;
  let cslPaymentScriptSource;
  if (appAccount.data.account.paymentScript) {
    cslPaymentScript = NativeScript.from_bytes(toHexArray(appAccount.data.account.paymentScript));
    cslPaymentScriptSource = NativeScriptSource.new(cslPaymentScript);
  }
  for (const utxo of inputUtxoList) {
    const input = TransactionInput.from_json(jsonToCsl(utxo.input));
    const amount = Value.from_json(jsonToCsl(utxo.output.amount));
    if (cslPaymentScriptSource) {
      txInputsBuilder.add_native_script_input(cslPaymentScriptSource, input, amount);
    } else {
      const addr = Address.from_bech32(utxo.output.address);
      txInputsBuilder.add_regular_input(addr, input, amount);
      safeFreeCSLObject(addr);
    }
    safeFreeCSLObject(input);
    safeFreeCSLObject(amount);
  }
  txBuilder.set_inputs(txInputsBuilder);
  safeFreeCSLObject(txInputsBuilder);
  safeFreeCSLObject(cslPaymentScript);
  safeFreeCSLObject(cslPaymentScriptSource);
};
const addOutputs = (outputList, txBuilder) => {
  for (const output of outputList) {
    const cslOutput = getTransactionOutputFromJSON(output);
    if (output.script_ref && output.script_ref.hasOwnProperty("PlutusScript") && output.hasOwnProperty("scriptLanguage")) {
      let cslPlutusScript;
      const scriptBytes = toHexArray(Object.values(output.script_ref)[0]);
      switch (output.scriptLanguage) {
        case LanguageKind.PlutusV1:
          cslPlutusScript = PlutusScript.from_bytes_v3(scriptBytes);
          break;
        case LanguageKind.PlutusV2:
          cslPlutusScript = PlutusScript.from_bytes_v3(scriptBytes);
          break;
        case LanguageKind.PlutusV3:
          cslPlutusScript = PlutusScript.from_bytes_v3(scriptBytes);
          break;
      }
      if (cslPlutusScript) {
        const cslScriptRef = ScriptRef.new_plutus_script(cslPlutusScript);
        cslOutput.set_script_ref(cslScriptRef);
        safeFreeCSLObject(cslPlutusScript);
        safeFreeCSLObject(cslScriptRef);
      }
    }
    txBuilder.add_output(cslOutput);
    safeFreeCSLObject(cslOutput);
  }
};
const setTTL = (tx, txBuilder) => {
  if (tx.body.ttl) {
    const ttl = BigNum.from_str(tx.body.ttl);
    txBuilder.set_ttl_bignum(ttl);
    safeFreeCSLObject(ttl);
  }
};
const setValidityStartInterval = (tx, txBuilder) => {
  if (tx.body.validity_start_interval && parseInt(tx.body.validity_start_interval) > -1) {
    const vsi = BigNum.from_str(tx.body.validity_start_interval);
    txBuilder.set_validity_start_interval_bignum(vsi);
    safeFreeCSLObject(vsi);
  }
};
const addCerts = (appAccount, tx, txBuilder) => {
  if (tx.body.certs && tx.body.certs.length > 0) {
    const certificatesBuilder = CertificatesBuilder.new();
    let cslStakeScript;
    let cslStakeScriptSource;
    let cslDRepScript;
    let cslDRepScriptSource;
    if (appAccount.data.account.stakeScript) {
      cslStakeScript = NativeScript.from_bytes(toHexArray(appAccount.data.account.stakeScript));
      cslStakeScriptSource = NativeScriptSource.new(cslStakeScript);
    }
    if (appAccount.data.account.drepScript) {
      cslDRepScript = NativeScript.from_bytes(toHexArray(appAccount.data.account.drepScript));
      cslDRepScriptSource = NativeScriptSource.new(cslDRepScript);
    }
    for (const cert of tx.body.certs) {
      const cslCertificate = Certificate.from_json(jsonToCsl(cert));
      const stakeCred = Object.values(cert)[0].stake_credential || void 0;
      const drepCred = Object.values(cert)[0].voting_credential || void 0;
      if (cslStakeScriptSource && !!stakeCred && stakeCred.hasOwnProperty("Script")) {
        certificatesBuilder.add_with_native_script(cslCertificate, cslStakeScriptSource);
      } else if (cslDRepScriptSource && !!drepCred && drepCred.hasOwnProperty("Script")) {
        certificatesBuilder.add_with_native_script(cslCertificate, cslDRepScriptSource);
      } else {
        certificatesBuilder.add(cslCertificate);
      }
      safeFreeCSLObject(cslCertificate);
    }
    txBuilder.set_certs_builder(certificatesBuilder);
    safeFreeCSLObject(certificatesBuilder);
    safeFreeCSLObject(cslStakeScript);
    safeFreeCSLObject(cslStakeScriptSource);
  }
};
const setAuxData = (tx, txBuilder) => {
  if (tx.auxiliary_data) {
    const auxData = AuxiliaryData.from_json(jsonToCsl(tx.auxiliary_data));
    txBuilder.set_auxiliary_data(auxData);
    safeFreeCSLObject(auxData);
  }
};
const addWithdrawals = (appAccount, tx, txBuilder) => {
  if (tx.body.withdrawals) {
    const withdrawalsBuilder = WithdrawalsBuilder.new();
    let cslStakeScript;
    let cslStakeScriptSource;
    if (appAccount.data.account.stakeScript) {
      cslStakeScript = NativeScript.from_bytes(toHexArray(appAccount.data.account.stakeScript));
      cslStakeScriptSource = NativeScriptSource.new(cslStakeScript);
    }
    for (const withdrawal of Object.entries(tx.body.withdrawals)) {
      const cslRewardAddress = getRewardAddressFromBech32(withdrawal[0]);
      const cslAmount = BigNum.from_str(withdrawal[1]);
      if (cslStakeScriptSource) {
        withdrawalsBuilder.add_with_native_script(cslRewardAddress, cslAmount, cslStakeScriptSource);
      } else {
        withdrawalsBuilder.add(cslRewardAddress, cslAmount);
      }
      safeFreeCSLObject(cslRewardAddress);
      safeFreeCSLObject(cslAmount);
    }
    txBuilder.set_withdrawals_builder(withdrawalsBuilder);
    safeFreeCSLObject(withdrawalsBuilder);
    safeFreeCSLObject(cslStakeScript);
    safeFreeCSLObject(cslStakeScriptSource);
  }
};
const addRequiredSigners = (tx, txBuilder) => {
  if (tx.body.required_signers && tx.body.required_signers.length > 0) {
    const hashes = Ed25519KeyHashes.from_json(jsonToCsl(tx.body.required_signers));
    const numHashes = hashes.len();
    for (let i = 0; i < numHashes; i++) {
      const hash = hashes.get(i);
      txBuilder.add_required_signer(hash);
      safeFreeCSLObject(hash);
    }
    safeFreeCSLObject(hashes);
  }
};
const setScriptDataHash = (txConfig, txBuilder) => {
  const swapDatum = txConfig.swapConfig?.swapDatum.datum;
  if (swapDatum) {
    const datum = PlutusData.from_hex(swapDatum);
    const costmdls = Costmdls.new();
    txBuilder.add_extra_witness_datum(datum);
    txBuilder.calc_script_data_hash(costmdls);
    safeFreeCSLObject(datum);
    safeFreeCSLObject(costmdls);
  }
};
const addVoteProcedures = (tx, txBuilder) => {
  if (!tx.body.voting_procedures || tx.body.voting_procedures.length === 0) {
    return;
  }
  const votingBuilder = VotingBuilder.new();
  for (const votingProcedure of tx.body.voting_procedures) {
    const cslVoter = Voter.from_json(jsonToCsl(votingProcedure.voter));
    for (const vote of votingProcedure.votes) {
      const cslGovActionId = GovernanceActionId.from_json(jsonToCsl(vote.action_id));
      const cslVotingProcedure = VotingProcedure.from_json(jsonToCsl(vote.voting_procedure));
      votingBuilder.add(cslVoter, cslGovActionId, cslVotingProcedure);
      safeFreeCSLObject(cslGovActionId);
      safeFreeCSLObject(cslVotingProcedure);
    }
    safeFreeCSLObject(cslVoter);
  }
  txBuilder.set_voting_builder(votingBuilder);
};

const TX_INPUT_SIZE = 36;
const TX_WITNESS_SIZE = 96;
const selectInputs = (adaOnlyUtxoList, multiAssetUtxoList, chosenInputList, chosenCredSet, balance, maxInputBudget = 999999, adaOnly = false) => {
  if (adaOnlyUtxoList.length === 0 && multiAssetUtxoList.length === 0) {
    if (chosenInputList.length > 0 && balance.toCover.total === "0") {
      return true;
    }
    throw ErrorBuildTx.notEnoughUtxos;
  }
  isWithinBudget(chosenInputList.length, chosenCredSet.size, maxInputBudget);
  if (balance.toCover.multiasset && !adaOnly) {
    const multiAssetList = Object.entries(balance.toCover.multiasset);
    for (const multiAsset of multiAssetList) {
      const policyId = multiAsset[0];
      const assetList = Object.entries(multiAsset[1]);
      for (const asset of assetList) {
        const assetName = asset[0];
        const wantedQuantity = asset[1];
        const _filteredList = [];
        let numChosen = balance.chosenInputs.multiasset?.[policyId]?.[assetName] ?? "0";
        if (compare(numChosen, ">=", wantedQuantity)) {
          continue;
        }
        let numAvailable = numChosen;
        for (let i = multiAssetUtxoList.length - 1; i >= 0; i--) {
          const utxo = multiAssetUtxoList[i];
          const assetQuantity = utxo.output.amount.multiasset?.[policyId]?.[assetName];
          if (assetQuantity) {
            _filteredList.push(utxo);
            numAvailable = add(numAvailable, assetQuantity);
          }
        }
        if (compare(numAvailable, "<", wantedQuantity)) {
          if (_filteredList.length === 0) {
            throw ErrorBuildTx.tokenNotFound;
          }
          throw ErrorBuildTx.notEnoughTokens;
        }
        if (_filteredList.length === 0) {
          continue;
        }
        _filteredList.sort((a, b) => {
          const qa = a.output.amount.multiasset[policyId][assetName];
          const qb = b.output.amount.multiasset[policyId][assetName];
          return compare(qa, ">", qb) ? -1 : 1;
        });
        for (const utxo of _filteredList) {
          const assetQuantity = utxo.output.amount.multiasset[policyId][assetName];
          if (assetQuantity) {
            const addedInput2 = selectUtxo(chosenInputList, chosenCredSet, balance, multiAssetUtxoList, utxo, maxInputBudget);
            if (!addedInput2) {
              throw ErrorBuildTx.maxBudgetReached;
            }
            numChosen = add(numChosen, assetQuantity);
          }
          if (compare(numChosen, ">=", wantedQuantity)) {
            break;
          }
        }
      }
    }
  }
  let addedInput = selectForRemainingAda(chosenInputList, chosenCredSet, balance, adaOnlyUtxoList, maxInputBudget, 1);
  const notInBudget = !addedInput;
  if (!addedInput || (isZero(balance.chosenInputs.total) || compare(balance.chosenInputs.total, "<", balance.toCover.total))) {
    addedInput = selectForRemainingAda(chosenInputList, chosenCredSet, balance, multiAssetUtxoList, maxInputBudget, 1);
  }
  if (chosenInputList.length === 0) {
    throw ErrorBuildTx.notEnoughUtxos;
  }
  if (!addedInput || notInBudget) {
    throw ErrorBuildTx.maxBudgetReached;
  }
  if (isZero(balance.chosenInputs.total) || compare(balance.chosenInputs.total, "<", balance.toCover.total)) {
    throw ErrorBuildTx.notEnoughAda;
  }
  return addedInput;
};
const selectSingleInput = (adaOnlyUtxoList, multiAssetUtxoList, chosenInputList, chosenCredSet, balance, maxInputBudget = 999999) => {
  if (adaOnlyUtxoList.length === 0 && multiAssetUtxoList.length === 0) {
    return false;
  }
  if (adaOnlyUtxoList.length > 0) {
    const addedOutput = selectUtxo(chosenInputList, chosenCredSet, balance, adaOnlyUtxoList, adaOnlyUtxoList[adaOnlyUtxoList.length - 1], maxInputBudget);
    if (addedOutput) {
      return true;
    }
  }
  if (multiAssetUtxoList.length > 0) {
    const addedOutput = selectUtxo(chosenInputList, chosenCredSet, balance, multiAssetUtxoList, multiAssetUtxoList[multiAssetUtxoList.length - 1], maxInputBudget);
    if (addedOutput) {
      return true;
    }
  }
  return false;
};
const selectUtxo = (chosenInputList, chosenCredSet, balance, utxoList, utxo, maxInputBudget) => {
  const numCreds = chosenCredSet.size + (chosenCredSet.has(utxo.pc) ? 0 : 1);
  const numInputs = chosenInputList.length + 1;
  const fitsBudget = isWithinBudget(numInputs, numCreds, maxInputBudget);
  if (!fitsBudget) {
    return false;
  }
  filterUtxoFromList(utxoList, utxo);
  chosenInputList.push(utxo);
  chosenCredSet.add(utxo.pc);
  addOutputToBalance(balance.chosenInputs, utxo.output);
  return true;
};
const selectAllUtxos = (chosenInputList, chosenCredSet, balance, preselectedInputList, maxInputBudget) => {
  for (const utxo of preselectedInputList) {
    if (chosenInputList.some((input) => input.input.transaction_id === utxo.input.transaction_id && input.input.index === utxo.input.index)) {
      continue;
    }
    chosenInputList.push(utxo);
    chosenCredSet.add(utxo.pc);
    addOutputToBalance(balance.chosenInputs, utxo.output);
  }
  return !isWithinBudget(chosenInputList.length, chosenCredSet.size, maxInputBudget);
};
const selectForRemainingAda = (chosenInputList, chosenCredSet, balance, utxoList, maxInputBudget, minInputsToSelect = 0) => {
  if (isZero(balance.chosenInputs.total) || compare(balance.chosenInputs.total, "<", balance.toCover.total) || minInputsToSelect > chosenInputList.length) {
    for (let i = utxoList.length - 1; i >= 0; i--) {
      const utxo = utxoList[i];
      if (!selectUtxo(chosenInputList, chosenCredSet, balance, utxoList, utxo, maxInputBudget)) {
        return false;
      }
      if (isGreaterThanZero(balance.chosenInputs.total) && compare(balance.chosenInputs.total, ">=", balance.toCover.total) && minInputsToSelect <= chosenInputList.length) {
        return true;
      }
    }
  }
  return true;
};
const isWithinBudget = (numInputs, numCreds, maxInputBudget) => {
  const currentSize = numInputs * TX_INPUT_SIZE + numCreds * TX_WITNESS_SIZE;
  return currentSize <= maxInputBudget;
};

const _deductFeeFromOutputList = (missingFee, txConfig, balance, outputList, canConsume, isChangeOutputList) => {
  let txFee = balance.minFee.total;
  let feeCovered = false;
  const minUtxo = createTransactionOutputJSON({ address: getDonationAddress(txConfig.networkId), amount: { coin: "0" } });
  const adaOnlyMinUtxoValue = getMinUtxo(minUtxo, txConfig.epochParams.utxoCostPerSize, txConfig.epochParams.isAtLeastBabbageEra, void 0, true);
  if (isChangeOutputList) {
    sortUtxoListByAdaDesc(outputList);
  }
  if (outputList.length === 0) {
    if (isZeroOrGreater(subtract(balance.diff.total, missingFee))) {
      txFee = add(missingFee, balance.diff.total);
      missingFee = "0";
      feeCovered = true;
    }
    if (isChangeOutputList) {
      updateChangeOutputBalance(outputList, balance);
    } else {
      updateUserOutputBalance(outputList, balance);
    }
    return { feeCovered, txFee, missingFee };
  }
  for (let i = 0; i < outputList.length; i++) {
    const output = outputList[i];
    if (output.amount.multiasset) {
      continue;
    }
    const reducedOutput = subtract(output.amount.coin, missingFee);
    if (compare(reducedOutput, ">=", adaOnlyMinUtxoValue)) {
      output.amount.coin = reducedOutput;
      missingFee = "0";
      feeCovered = true;
      if (isChangeOutputList) {
        updateChangeOutputBalance(outputList, balance);
      } else {
        updateUserOutputBalance(outputList, balance);
      }
      break;
    } else {
      break;
    }
  }
  if (!feeCovered) {
    for (let i = 0; i < outputList.length; i++) {
      const output = outputList[i];
      if (!output.amount.multiasset) {
        continue;
      }
      const tokenMinUtxoValue = getMinUtxo(output, txConfig.epochParams.utxoCostPerSize, txConfig.epochParams.isAtLeastBabbageEra);
      const reducedOutput = subtract(output.amount.coin, missingFee);
      if (compare(reducedOutput, ">=", tokenMinUtxoValue)) {
        output.amount.coin = reducedOutput;
        missingFee = "0";
        feeCovered = true;
        if (isChangeOutputList) {
          updateChangeOutputBalance(outputList, balance);
        } else {
          updateUserOutputBalance(outputList, balance);
        }
        break;
      } else {
        let coinDiff = subtract(output.amount.coin, tokenMinUtxoValue);
        if (isGreaterThanZero(coinDiff)) {
          output.amount.coin = tokenMinUtxoValue;
          missingFee = subtract(missingFee, coinDiff);
        }
      }
    }
    if (!feeCovered && canConsume) {
      for (let i = outputList.length - 1; i >= 0; i--) {
        const output = outputList[i];
        if (output.amount.multiasset) {
          continue;
        }
        if (compare(output.amount.coin, "<", missingFee)) {
          missingFee = subtract(missingFee, output.amount.coin);
          outputList.splice(i, 1);
          continue;
        }
        const reducedOutput = subtract(output.amount.coin, missingFee);
        subtract(output.amount.coin, reducedOutput);
        const _txFee = add(txFee, reducedOutput);
        txConfig.result.isHigherThanUsualFee = compare(_txFee, ">", multiply(txFee, 1.5));
        txFee = _txFee;
        feeCovered = true;
        missingFee = "0";
        outputList.splice(i, 1);
        break;
      }
      if (isChangeOutputList) {
        updateChangeOutputBalance(outputList, balance);
      } else {
        updateUserOutputBalance(outputList, balance);
      }
    }
  }
  return { feeCovered, txFee, missingFee };
};
const deductFeeFromOutputList = (txConfig, balance, changeOutputList, canConsume, missingFee, userOutputList, allowUserOutputList = false) => {
  let txFee = balance.minFee.total;
  let feeCovered = false;
  missingFee = missingFee ?? txFee;
  sortUtxoListByAdaDesc(changeOutputList);
  if (changeOutputList.length === 0) {
    if (!allowUserOutputList || !userOutputList) {
      if (isZeroOrGreater(subtract(balance.diff.total, missingFee))) {
        txFee = add(missingFee, balance.diff.total);
        missingFee = "0";
        feeCovered = true;
        updateChangeOutputBalance(changeOutputList, balance);
      }
      return { feeCovered, txFee, missingFee };
    }
    return _deductFeeFromOutputList(missingFee, txConfig, balance, userOutputList, false, false);
  }
  const res = _deductFeeFromOutputList(missingFee, txConfig, balance, changeOutputList, canConsume, true);
  if (res.feeCovered || !allowUserOutputList || !userOutputList) {
    return res;
  }
  return _deductFeeFromOutputList(missingFee, txConfig, balance, userOutputList, false, false);
};
const updateChangeOutputBalance = (changeOutputList, balance) => {
  clearBalance(balance.changeOutputs);
  for (const output of changeOutputList) {
    addOutputToBalance(balance.changeOutputs, output);
  }
};
const updateUserOutputBalance = (userOutputList, balance) => {
  clearBalance(balance.userOutputs);
  clearBalance(balance.toCover);
  for (const output of userOutputList) {
    addOutputToBalance(balance.userOutputs, output);
  }
  addToBalance(balance.toCover, balance.userOutputs);
  addToBalance(balance.toCover, balance.deposits, true, true);
};

const _chosenInputList = [];
const _chosenCredSet = /* @__PURE__ */ new Set();
let _userOutputList = [];
const getChosenInputList = (txIndex, reset = true) => {
  if (!_chosenInputList[txIndex]) {
    _chosenInputList[txIndex] = reactive([]);
  }
  if (reset) {
    _chosenInputList[txIndex].length = 0;
  }
  return _chosenInputList[txIndex];
};
const getChosenCredSet = (reset = true) => {
  if (reset) {
    _chosenCredSet.clear();
  }
  return _chosenCredSet;
};
const getUserOutputList = (outputList) => {
  if (!outputList) {
    return _userOutputList;
  }
  _userOutputList = outputList.concat();
  return _userOutputList;
};

const doLog = false;
const logId = "buildTx";
const createIBuiltTxBalance = (userOutputList, utxoList) => {
  return {
    userOutputs: getOutputBalance(createIBalance(), userOutputList),
    allInputs: getInputBalance(createIBalance(), utxoList),
    chosenInputs: createIBalance(),
    changeOutputs: createIBalance(),
    deposits: createIBalance(),
    minFee: createIBalance(),
    diff: createIBalance(),
    toCover: createIBalance(),
    toCoverTmp: createIBalance()
  };
};
const selectInitialInputs = async (outputList, tx, txConfig, appAccount, spentInputList, maxInputBudget) => {
  let {
    utxoList,
    collateralUtxoList
  } = getFilteredUtxoList(appAccount, false, true, true, true);
  if (spentInputList.length > 0 && (txConfig.forceCU || txConfig.forceTF || txConfig.maybeMultipleTx)) {
    filterUtxoListByHashList(utxoList, spentInputList);
  }
  sortInputListByScore(utxoList, txConfig.epochParams.txFeePerByte, getInternalBundleSize(txConfig));
  let adaOnlyUtxoList = utxoList.filter((utxo) => !utxo.output.amount.multiasset);
  let multiAssetUtxoList = utxoList.filter((utxo) => !!utxo.output.amount.multiasset);
  const chosenInputList = getChosenInputList(txConfig.txIndex);
  const chosenCredSet = getChosenCredSet();
  const userOutputList = getUserOutputList(outputList);
  txConfig.numAdaOnlyUtxos = adaOnlyUtxoList.length;
  txConfig.numCollateralUtxos = collateralUtxoList.length;
  const balance = createIBuiltTxBalance(userOutputList, utxoList);
  if (tx) {
    processCertificates(tx, txConfig, balance, chosenCredSet);
    processWithdrawals(tx, txConfig, balance, appAccount, utxoList, chosenCredSet);
  }
  updateDiffBalance(balance, "sendall", false, true);
  addToBalance(balance.toCover, balance.userOutputs);
  addToBalance(balance.toCover, balance.deposits, true, true);
  updateDiffBalance(balance);
  const preselectedList = [];
  if (tx) {
    for (const input of tx.body.inputs) {
      const inputHash = getUtxoHash(input);
      const utxo = utxoList.find((utxo2) => getUtxoHash(utxo2.input) === inputHash);
      if (!utxo) {
        throw ErrorBuildTx.missingSelectedInput;
      }
      preselectedList.push(utxo);
    }
  }
  let maxBudgetReached = false;
  if (preselectedList.length > 0) {
    maxBudgetReached = selectAllUtxos(
      chosenInputList,
      chosenCredSet,
      balance,
      preselectedList,
      maxInputBudget
    );
    if (maxBudgetReached) {
      throw ErrorBuildTx.maxBudgetReached;
    }
    filterUtxoList(adaOnlyUtxoList, chosenInputList);
    filterUtxoList(multiAssetUtxoList, chosenInputList);
  }
  const coveredAllOutputs = selectInputs(
    adaOnlyUtxoList,
    multiAssetUtxoList,
    chosenInputList,
    chosenCredSet,
    balance,
    maxInputBudget
  );
  if (!coveredAllOutputs) {
    throw ErrorBuildTx.couldNotCoverAmount;
  }
  filterUtxoList(adaOnlyUtxoList, chosenInputList);
  filterUtxoList(multiAssetUtxoList, chosenInputList);
  updateDiffBalance(balance);
  return {
    utxoList,
    adaOnlyUtxoList,
    multiAssetUtxoList,
    collateralUtxoList,
    chosenInputList,
    chosenCredSet,
    balance
  };
};
const selectForAmount = async (outputList, txConfig, appAccount) => selectInitialInputs(outputList, null, txConfig, appAccount, [], 999999);
const buildTx = async (tx, txConfig, appAccount, spentInputList = []) => {
  try {
    if (doLog) ;
    if (doLog) ;
    const networkId = appAccount.data.state.networkId;
    if (!tx.body.ttl) {
      tx.body.ttl = Math.floor(appAccount.isMultiSig ? getCalculatedChainTip(networkId) + 3600 * 24 * 7 : getCalculatedChainTip(networkId) + 3600 * 3) + "";
    }
    tx.body.validity_start_interval = "1";
    const userOutputList = tx.body.outputs.concat();
    checkOutputs(networkId, txConfig, userOutputList);
    let changeOutputList = [];
    if (doLog) ;
    const txBaseSize = getTxBaseSize(appAccount, tx, txConfig);
    if (doLog) ;
    let maxInputBudget = checkMaxTxBudget(txConfig, userOutputList, changeOutputList, txBaseSize);
    if (doLog) ;
    if (doLog) ;
    const {
      utxoList,
      adaOnlyUtxoList,
      multiAssetUtxoList,
      chosenInputList,
      chosenCredSet,
      balance
    } = await selectInitialInputs(userOutputList, tx, txConfig, appAccount, spentInputList, maxInputBudget);
    checkNewerBuild(txConfig);
    if (doLog) ;
    if (doLog) ;
    if (doLog) ;
    if (doLog) ;
    if (doLog) ;
    await processChangeOutputLoop(tx, txConfig, balance, appAccount, txBaseSize, utxoList, adaOnlyUtxoList, multiAssetUtxoList, userOutputList, changeOutputList, chosenInputList, chosenCredSet, 20);
    if (!isZero(balance.diff.total)) {
      await processChangeOutputLoop(tx, txConfig, balance, appAccount, txBaseSize, utxoList, adaOnlyUtxoList, multiAssetUtxoList, userOutputList, changeOutputList, chosenInputList, chosenCredSet, 1);
    }
    if (!isZero(balance.diff.total)) {
      throw ErrorBuildTx.notEnoughAda + "." + balance.diff.total;
    }
    const txBuilder = getTxBuilder(appAccount, tx, txConfig);
    addInputs(appAccount, chosenInputList, txBuilder);
    addOutputs(userOutputList, txBuilder);
    addOutputs(changeOutputList, txBuilder);
    let cslMinFee = BigNum.from_str(balance.minFee.total);
    txBuilder.set_fee(cslMinFee);
    safeFreeCSLObject(cslMinFee);
    const _cslTx = txBuilder.build_tx();
    safeFreeCSLObject(txBuilder);
    const cslWitnessSet = TransactionWitnessSet.from_json(jsonToCsl(tx.witness_set));
    const _cslWitnessSet = _cslTx.witness_set();
    const _cslNativeScripts = _cslWitnessSet.native_scripts();
    if (_cslNativeScripts) {
      cslWitnessSet.set_native_scripts(_cslNativeScripts);
    }
    safeFreeCSLObject(_cslNativeScripts);
    safeFreeCSLObject(_cslWitnessSet);
    const _cslTxBody = _cslTx.body();
    let cslAuxData = _cslTx.auxiliary_data();
    let cslTxHash;
    try {
      const cslFixedTx = FixedTransaction.new_from_body_bytes(_cslTxBody.to_bytes());
      cslTxHash = cslFixedTx.transaction_hash();
      safeFreeCSLObject(cslFixedTx);
    } catch (err) {
      if (err === "NOT_IMPLEMENTED") {
        console.warn("NOT_IMPLEMENTED > fallback cslTxHash");
        cslTxHash = hash_transaction(_cslTxBody);
      } else {
        throw err;
      }
    }
    const cslTx = Transaction.new(_cslTxBody, cslWitnessSet, cslAuxData);
    safeFreeCSLObject(cslAuxData);
    cslAuxData = cslTx.auxiliary_data();
    const builtTxHash = cslTxHash.to_hex();
    const builtTxBytes = cslTx.to_bytes();
    const builtTx = getTransactionJSONFromCSL(networkId, cslTx);
    builtTx.hash = builtTxHash;
    builtTx.size = builtTxBytes.byteLength;
    builtTx.time = now();
    builtTx.inputUtxoList = chosenInputList;
    const builtTxHex = toHexString(builtTxBytes);
    builtTx.hasConwaySetTag = hasConwaySetTag(builtTxHex);
    safeFreeCSLObject(_cslTxBody);
    safeFreeCSLObject(_cslTx);
    const cslTxBody = cslTx.body();
    if (hasNewerBuild(txConfig.buildCounter)) {
      throw ErrorBuildTx.cancelled;
    }
    return {
      txIndex: txConfig.txIndex,
      txCbor: builtTxHex,
      txHash: builtTxHash,
      cslTx,
      cslTxBody,
      cslTxHash,
      cslAuxData,
      cslWitnessSet,
      builtTx,
      txCredList: null,
      // set in buildTx.ts by build functions or in parseTxSignRequest
      error: null,
      txConfig: json(txConfig)
    };
  } catch (err) {
    if (err === ErrorBuildTx.cancelled) ; else {
      console.error("buildTx", err);
    }
    return {
      txIndex: txConfig.txIndex,
      txCbor: null,
      txHash: null,
      builtTx: null,
      txCredList: null,
      error: err,
      txConfig: json(txConfig)
    };
  }
};
const processChangeOutputLoop = async (tx, txConfig, balance, appAccount, txBaseSize, utxoList, adaOnlyUtxoList, multiAssetUtxoList, userOutputList, changeOutputList, chosenInputList, chosenCredSet, maxIterations = 20) => {
  let maxInputBudget = checkMaxTxBudget(txConfig, userOutputList, changeOutputList, txBaseSize);
  let feeRes = { feeCovered: false, txFee: "0", missingFee: "0" };
  getTxMinFeeBalance(tx, txConfig, balance, appAccount, chosenInputList, userOutputList, changeOutputList);
  for (let i = 0; i < maxIterations; i++) {
    if (i > 0) {
      await sleep(10);
    }
    checkNewerBuild(txConfig);
    const {
      numChangeOutputsStart,
      numChangeOutputsEnd,
      hasTooSmallOutput,
      skipped
    } = processChangeOutput(txConfig, balance, appAccount, changeOutputList);
    maxInputBudget = checkMaxTxBudget(txConfig, userOutputList, changeOutputList, txBaseSize);
    let addedInput = false;
    if (hasTooSmallOutput || skipped && isLessThanZero(balance.diff.total)) {
      addedInput = selectSingleInput(adaOnlyUtxoList, multiAssetUtxoList, chosenInputList, chosenCredSet, balance, maxInputBudget);
    } else {
      let diff = add(balance.diff.total, balance.minFee.total);
      if (isLessThanZero(diff) && (adaOnlyUtxoList.length > 0 || multiAssetUtxoList.length > 0)) {
        let k = 0;
        let addedOnce = false;
        do {
          addedInput = selectSingleInput(adaOnlyUtxoList, multiAssetUtxoList, chosenInputList, chosenCredSet, balance, maxInputBudget);
          if (addedInput) {
            addedOnce = true;
          }
          updateDiffBalance(balance);
          diff = add(balance.diff.total, balance.minFee.total);
          k++;
        } while (addedInput && isLessThanZero(diff) && k < 20);
        addedInput = addedOnce;
      } else if (isLessThanZero(diff)) {
        break;
      }
    }
    getTxMinFeeBalance(tx, txConfig, balance, appAccount, chosenInputList, userOutputList, changeOutputList);
    updateDiffBalance(balance);
    if (addedInput) {
      continue;
    }
    if (isZero(balance.diff.total)) {
      break;
    }
    feeRes = deductFeeFromOutputList(txConfig, balance, changeOutputList, false);
    if (!feeRes.feeCovered) {
      if (chosenInputList.length !== utxoList.length) {
        addedInput = selectSingleInput(adaOnlyUtxoList, multiAssetUtxoList, chosenInputList, chosenCredSet, balance, maxInputBudget);
        const oldTxFee = balance.minFee.total;
        getTxMinFeeBalance(tx, txConfig, balance, appAccount, chosenInputList, userOutputList, changeOutputList);
        const newTxFee = balance.minFee.total;
        if (oldTxFee !== newTxFee) {
          feeRes.txFee = newTxFee;
          feeRes.missingFee = add(feeRes.missingFee, subtract(newTxFee, oldTxFee));
          feeRes.feeCovered = isZeroOrLess(feeRes.missingFee);
        }
        updateDiffBalance(balance);
        if (addedInput) {
          continue;
        }
      }
      const numChangeOutputs = changeOutputList.length;
      const txFee = balance.minFee.total;
      feeRes = deductFeeFromOutputList(txConfig, balance, changeOutputList, true);
      if (changeOutputList.length < numChangeOutputs) {
        const oldTxFee = balance.minFee.total;
        getTxMinFeeBalance(tx, txConfig, balance, appAccount, chosenInputList, userOutputList, changeOutputList);
        const newTxFee = balance.minFee.total;
        if (oldTxFee !== newTxFee) {
          feeRes.txFee = newTxFee;
          feeRes.missingFee = add(feeRes.missingFee, subtract(newTxFee, oldTxFee));
          feeRes.feeCovered = isZeroOrLess(feeRes.missingFee);
        }
        updateDiffBalance(balance);
        if (!feeRes.feeCovered) {
          feeRes.missingFee = add(feeRes.missingFee, subtract(feeRes.txFee, txFee));
        }
      }
      if (!feeRes.feeCovered) {
        feeRes = deductFeeFromOutputList(txConfig, balance, changeOutputList, false, feeRes.missingFee, userOutputList, true);
        if (!feeRes.feeCovered) {
          throw ErrorBuildTx.couldNotCoverFee + "." + feeRes.missingFee;
        }
      }
    }
    balance.minFee.total = feeRes.txFee;
    updateDiffBalance(balance);
    break;
  }
};
const hasWitness = (cslVkeyWitnesses, cslVkeyWitness) => {
  const numWitnesses = cslVkeyWitnesses.len();
  const _vkeyHex = cslVkeyWitness.to_hex();
  for (let i = 0; i < numWitnesses; i++) {
    const cslVkey = cslVkeyWitnesses.get(i);
    const vkeyHex = cslVkey.to_hex();
    cslVkey.free();
    if (vkeyHex === _vkeyHex) {
      return true;
    }
  }
  return false;
};
const selectRewardWithdrawals = (rewardInfoList, chosenRewardInfoList, chosenCredSet, balanceChosen) => {
  let rewardInfoListCopy = [...rewardInfoList];
  filterRewardInfoList(rewardInfoListCopy, chosenRewardInfoList);
  sortRewardInfoListByAdaAsc(rewardInfoListCopy);
  for (let i = rewardInfoListCopy.length - 1; i >= 0; i--) {
    const rewardInfo = rewardInfoListCopy[i];
    if (!isZeroOrLess(rewardInfo.rewards)) {
      chosenRewardInfoList.push(rewardInfo);
      chosenCredSet.add(rewardInfo.cred);
      filterRewardInfoList(rewardInfoListCopy, [rewardInfo]);
      getRewardInfoListBalance(chosenRewardInfoList, balanceChosen);
    }
  }
};
const getInternalBundleSize = (txConfig) => {
  if ((txConfig.allowUtxoManagement || txConfig.tokenFragmentation.enabledInternal) && txConfig.tokenFragmentation.bundleSize > 0) {
    return txConfig.tokenFragmentation.bundleSize;
  }
  return 0;
};
const checkOutputs = (networkId, txConfig, userOutputList) => {
  for (let i = 0; i < userOutputList.length; i++) {
    const output = userOutputList[i];
    if (!output.address) {
      throw ErrorBuildTx.missingAddress + "." + i;
    }
    addValueToValue(output.amount, { coin: "0" });
    const minUtxoValue = getMinUtxo(output, txConfig.epochParams.utxoCostPerSize, txConfig.epochParams.isAtLeastBabbageEra, void 0, false);
    if (compare(output.amount.coin, "<", minUtxoValue)) {
      throw ErrorBuildTx.valueTooLow + "." + i + "." + divide(minUtxoValue, Math.pow(10, getNetworkDecimals(networkId))).replace(".", ",");
    }
  }
};
const cloneTransactionOutputJSON = (output) => {
  const _output = {
    address: output.address,
    amount: { coin: output.amount.coin }
  };
  if (output.amount.multiasset) {
    _output.amount.multiasset = {};
    addMultiAssets(_output.amount.multiasset, output.amount.multiasset);
  }
  if (output.plutus_data) {
    _output.plutus_data = output.plutus_data;
  }
  if (output.script_ref) {
    _output.script_ref = output.script_ref;
  }
  return _output;
};
const getSafeForFeeOutputList = (txConfig, userOutputList, changeOutputList) => {
  const safeForFeeOutputList = userOutputList.concat(changeOutputList);
  for (let i = 0; i < safeForFeeOutputList.length; i++) {
    const output = safeForFeeOutputList[i];
    const outputCopy = cloneTransactionOutputJSON(output);
    safeForFeeOutputList[i] = outputCopy;
    getMinUtxo(outputCopy, txConfig.epochParams.utxoCostPerSize, txConfig.epochParams.isAtLeastBabbageEra, void 0, true);
  }
  return safeForFeeOutputList;
};
const getTxMinFeeBalance = (tx, txConfig, balance, appAccount, chosenInputList, userOutputList, changeOutputList) => {
  try {
    const txBuilder = getTxBuilder(appAccount, tx, txConfig);
    if (doLog) ;
    if (doLog) ;
    if (doLog) ;
    if (doLog) ;
    addInputs(appAccount, chosenInputList, txBuilder);
    addOutputs(getSafeForFeeOutputList(txConfig, userOutputList, changeOutputList), txBuilder);
    let cslMinFee = BigNum.from_str(balance.minFee.total === "0" ? "1000000" : balance.minFee.total);
    if (doLog) ;
    txBuilder.set_min_fee(cslMinFee);
    const byteLength = txBuilder.full_size();
    if (doLog) ;
    const minFee = add(multiply(txConfig.epochParams.txFeePerByte, byteLength), txConfig.epochParams.txFeeFixed);
    if (doLog) ;
    balance.minFee.coin = minFee;
    balance.minFee.total = minFee;
    txBuilder.free();
  } catch (err) {
    console.error("getTxMinFeeBalance", err);
    balance.minFee.coin = "3000000";
    balance.minFee.total = "3000000";
  }
};
const checkMaxTxBudget = (txConfig, userOutputList, changeOutputList, txBaseSize) => {
  let totalOutputSize = 0;
  for (const output of userOutputList) {
    output.cborSize = getTransactionOutputSize(output);
    if (!output.cborSize) {
      console.error("Missing cborSize for output: ", output);
    }
    totalOutputSize += output.cborSize ?? 0;
  }
  for (const output of changeOutputList) {
    output.cborSize = getTransactionOutputSize(output);
    if (!output.cborSize) {
      console.error("Missing cborSize for output: ", output);
    }
    totalOutputSize += output.cborSize ?? 0;
  }
  let maxInputBudget = txConfig.epochParams.maxTxSize - totalOutputSize - txBaseSize - 20;
  if (maxInputBudget < TX_INPUT_SIZE + TX_WITNESS_SIZE) {
    throw ErrorBuildTx.tooManyAssets + "." + totalOutputSize + "." + txConfig.epochParams.maxTxSize;
  }
  return maxInputBudget;
};
const processCertificates = (tx, txConfig, balance, chosenCredSet) => {
  clearBalance(balance.deposits);
  balance.deposits.coin = getDepositByCerts(tx, txConfig.epochParams.stakeAddressDeposit, txConfig.epochParams.stakePoolDeposit, chosenCredSet);
  balance.deposits.total = balance.deposits.coin;
};
const processWithdrawals = (tx, txConfig, balance, appAccount, inputUtxoList, chosenCredSet) => {
  if (txConfig.txIndex !== 0) {
    return;
  }
  if (!(txConfig.allowWithdrawal || txConfig.forceWithdrawal)) {
    return;
  }
  const list = appAccount.data.rewardInfoList;
  if (!list || list.length === 0) {
    if (txConfig.forceWithdrawal) {
      throw ErrorBuildTx.missingStakeInfo;
    }
    return;
  }
  const info = list[0];
  const isEra2 = txConfig.epochParams.isAtLeastConwayEra2;
  if (isEra2) {
    if (!info || info && !info.hasActiveDRep) {
      if (txConfig.forceWithdrawal) {
        throw ErrorBuildTx.noActiveDRep;
      }
      return;
    }
  }
  let chosenRewardInfoList = [];
  selectRewardWithdrawals(list, chosenRewardInfoList, chosenCredSet, balance.chosenInputs);
  if (chosenRewardInfoList.length > 0) {
    tx.body.withdrawals = {};
    if (inputUtxoList.length === 0) {
      throw ErrorBuildTx.notAtLeastOneUtxo;
    }
  }
  for (const rewardInfo of chosenRewardInfoList) {
    tx.body.withdrawals[rewardInfo.bech32] = rewardInfo.rewards + "";
    addRewardsToBalance(balance.allInputs, rewardInfo);
  }
  updateBalanceTotal(balance.allInputs);
};
const processChangeOutput = (txConfig, balance, appAccount, changeOutputList, numTry) => {
  const numChangeOutputsStart = changeOutputList.length;
  changeOutputList.length = 0;
  clearBalance(balance.changeOutputs);
  updateDiffBalance(balance, "pco start", false);
  const changeOutput = createTransactionOutputJSON({
    address: getChangeAddress(appAccount.data).addr.bech32,
    amount: {
      coin: balance.diff.total,
      multiasset: balance.diff.multiasset
    }
  });
  if (isZeroOrLess(changeOutput.amount.coin) && !changeOutput.amount.multiasset) {
    updateDiffBalance(balance);
    return {
      numChangeOutputsStart,
      numChangeOutputsEnd: 0,
      hasTooSmallOutput: false,
      skipped: true
    };
  }
  if (!balance.diff.multiasset && isZero(subtract(balance.diff.coin, balance.minFee.coin))) {
    updateDiffBalance(balance);
    return {
      numChangeOutputsStart,
      numChangeOutputsEnd: 0,
      hasTooSmallOutput: false,
      skipped: true
    };
  }
  const bundleSize = getInternalBundleSize(txConfig);
  let splitOutputList;
  if (bundleSize > 0) {
    splitOutputList = splitTokenFragmentation(
      changeOutput,
      bundleSize,
      txConfig.epochParams,
      txConfig.numAdaOnlyUtxos,
      txConfig.numCollateralUtxos < 3,
      txConfig.allowUtxoManagement
    );
    if (splitOutputList.length === 0) {
      splitOutputList = splitLargeOutput(
        changeOutput,
        txConfig.epochParams,
        txConfig.numAdaOnlyUtxos,
        txConfig.numCollateralUtxos < 3,
        txConfig.allowUtxoManagement
      );
    }
  } else {
    splitOutputList = splitLargeOutput(
      changeOutput,
      txConfig.epochParams,
      txConfig.numAdaOnlyUtxos,
      txConfig.numCollateralUtxos < 3,
      txConfig.allowUtxoManagement
    );
  }
  if (splitOutputList.length > 0) {
    for (const splitOutput of splitOutputList) {
      changeOutputList.push(splitOutput);
      addOutputToBalance(balance.changeOutputs, splitOutput);
    }
  } else {
    getMinUtxo(changeOutput, txConfig.epochParams.utxoCostPerSize, txConfig.epochParams.isAtLeastBabbageEra, void 0, true);
    changeOutputList.push(changeOutput);
    addOutputToBalance(balance.changeOutputs, changeOutput);
  }
  updateDiffBalance(balance);
  let hasTooSmallChangeOutput = false;
  for (let changeOutput2 of changeOutputList) {
    const minUtxoValue = getMinUtxo(changeOutput2, txConfig.epochParams.utxoCostPerSize, txConfig.epochParams.isAtLeastBabbageEra, void 0, false);
    if (compare(changeOutput2.amount.coin, "<", minUtxoValue)) {
      hasTooSmallChangeOutput = true;
      break;
    }
  }
  return {
    numChangeOutputsStart,
    numChangeOutputsEnd: changeOutputList.length,
    hasTooSmallOutput: hasTooSmallChangeOutput,
    skipped: false
  };
};
const updateDiffBalance = (balance, label, includeFee = true, allInputs = false) => {
  clearBalance(balance.diff);
  addToBalance(balance.diff, allInputs ? balance.allInputs : balance.chosenInputs);
  decreaseBalance(balance.diff, balance.userOutputs);
  decreaseBalance(balance.diff, balance.changeOutputs);
  if (includeFee) {
    decreaseBalance(balance.diff, balance.minFee);
  }
  decreaseBalance(balance.diff, balance.deposits, true, true);
};
const getTxBaseSize = (appAccount, tx, txConfig) => {
  const txBuilder = getTxBuilder(appAccount, tx, txConfig);
  let cslMinFee = BigNum.from_str("200000");
  txBuilder.set_min_fee(cslMinFee);
  const _cslTx = txBuilder.build_tx_unsafe();
  const cslWitnessSet = TransactionWitnessSet.from_json(jsonToCsl(tx.witness_set));
  const _cslTxBody = _cslTx.body();
  let cslAuxData = _cslTx.auxiliary_data();
  safeFreeCSLObject(_cslTx);
  const cslTx = Transaction.new(_cslTxBody, cslWitnessSet, cslAuxData);
  safeFreeCSLObject(cslMinFee);
  safeFreeCSLObject(txBuilder);
  safeFreeCSLObject(cslWitnessSet);
  safeFreeCSLObject(cslAuxData);
  const builtTxBytes = cslTx.to_bytes();
  return builtTxBytes.byteLength;
};
const checkNewerBuild = (txConfig) => {
  if (hasNewerBuild(txConfig.buildCounter)) {
    throw ErrorBuildTx.cancelled;
  }
};

export { buildTx as b, cloneTransactionOutputJSON as c, getChosenInputList as g, hasWitness as h, selectForAmount as s, useBuildAccount as u };
