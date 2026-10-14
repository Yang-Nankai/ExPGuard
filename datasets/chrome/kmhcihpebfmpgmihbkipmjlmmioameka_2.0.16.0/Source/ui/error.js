import { E as ErrorBuildTx, bL as ErrorSignData } from './app2.js';
import { E as ErrorSignTx } from './ErrorSignTx.js';
import { E as ErrorSubmitTx } from './ErrorSubmitTx.js';
import { u as useFormatter } from './useFormatter.js';
import { u as useAdaSymbol } from './useAdaSymbol.js';

const {
  formatADAString,
  translateErrorMessage
} = useFormatter();
const { adaCurrency } = useAdaSymbol();
const t = translateErrorMessage;
const getTxBuiltErrorMsg = (err, _outputIndex, outputIndex, adaSymbol) => {
  let msg = "";
  let isWarning = false;
  if (err.toString().startsWith("ErrorBuildTx")) {
    if (err.startsWith(ErrorBuildTx.notEnoughAda)) {
      const lovelace = err.split(".")[2];
      if (lovelace) {
        const adaAmount = formatADAString(lovelace);
        const detail = t("tx-build:errors.txBuilt.notEnoughAdaDetails", { adaSymbol: adaSymbol.value, adaAmount });
        msg = t("tx-build:errors.txBuilt.notEnoughAda", { currency: adaCurrency.value, detail });
      } else {
        msg = t("tx-build:errors.txBuilt.notEnoughAda", { detail: "", currency: adaCurrency.value });
      }
    } else if (err.startsWith(ErrorBuildTx.tooManyAssets)) {
      const splitMessage = err.split(".");
      let params = {};
      const totalOutputSize = splitMessage[2];
      const maxTxSize = splitMessage[3];
      if (totalOutputSize) {
        params.totalSize = t("tx-build:errors.txBuilt.totalSize", { totalOutputSize });
      }
      if (maxTxSize) {
        params.maxSize = t("tx-build:errors.txBuilt.maxSize", { maxTxSize });
      }
      msg = t("tx-build:errors.txBuilt.tooManyAssets", params);
    }
    if (err.startsWith(ErrorBuildTx.notEnoughUtxos)) {
      msg = t("tx-build:errors.txBuilt.notEnoughUtxos");
    } else if (err.startsWith(ErrorBuildTx.noActiveDRep)) {
      msg = t("tx-build:errors.txBuilt.noActiveDRep");
    } else if (err.startsWith(ErrorBuildTx.notNecessaryTF)) {
      msg = t("tx-build:errors.txBuilt.notNecessaryTF");
    } else if (err.startsWith(ErrorBuildTx.notNecessaryCS)) {
      msg = t("tx-build:errors.txBuilt.notNecessaryCS");
    } else if (err.startsWith(ErrorBuildTx.missingBurnAddress)) {
      msg = t("tx-build:errors.txBuilt.missingBurnAddress");
    } else if (err.startsWith(ErrorBuildTx.notNecessaryCU)) {
      msg = t("tx-build:errors.txBuilt.notNecessaryCU");
    } else if (err.startsWith(ErrorBuildTx.couldNotCoverFee)) {
      msg = t("tx-build:errors.txBuilt.couldNotCoverFee", {
        currency: adaCurrency.value,
        adaSymbol: adaSymbol.value,
        adaAmount: formatADAString(err.split(".")[2])
      });
    } else if (err.startsWith(ErrorBuildTx.couldNotCoverAmount)) {
      msg = t("tx-build:errors.txBuilt.couldNotCoverAmount");
    } else if (err === ErrorBuildTx.tokenNotFound) {
      msg = t("tx-build:errors.txBuilt.tokenNotFound");
    } else if (err === ErrorBuildTx.notEnoughTokens) {
      msg = t("tx-build:errors.txBuilt.notEnoughTokens");
    } else if (err === ErrorBuildTx.notAtLeastOneUtxo) {
      msg = t("tx-build:errors.txBuilt.notAtLeastOneUtxo", { currency: adaCurrency.value });
    } else if (err.startsWith(ErrorBuildTx.missingAddress)) {
      const _outputIndex2 = parseInt(err.split(".")[2]);
      if (_outputIndex2 === outputIndex?.value) {
        msg = t("tx-build:errors.txBuilt.missingAddress");
        isWarning = true;
      }
    } else if (err.startsWith(ErrorBuildTx.valueTooLow)) {
      const errComps = err.split(".");
      const _outputIndex2 = errComps.length > 2 ? parseInt(errComps[2]) : 0;
      if (_outputIndex2 === outputIndex?.value) {
        if (errComps.length > 3) {
          const _minUtxoValue = parseFloat(errComps[3].replace(",", "."));
          msg = t("tx-build:errors.txBuilt.valueTooLowDetails", {
            adaSymbol: adaSymbol.value,
            minUtxoValue: _minUtxoValue
          });
        } else {
          msg = t("tx-build:errors.txBuilt.valueTooLow", { currency: adaCurrency.value });
        }
      }
    } else if (err.startsWith(ErrorBuildTx.valueIsZero)) {
      const _outputIndex2 = parseInt(err.split(".")[2]);
      if (_outputIndex2 === outputIndex?.value) {
        msg = t("tx-build:errors.txBuilt.valueIsZero");
        isWarning = true;
      }
    } else if (err === ErrorBuildTx.maxBudgetReached) {
      msg = t("tx-build:errors.txBuilt.maxBudgetReached");
    } else if (err === ErrorBuildTx.missingPoolId) {
      msg = t("tx-build:errors.txBuilt.missingPoolId");
    } else if (err === ErrorBuildTx.missingStakeInfo) {
      msg = t("tx-build:errors.txBuilt.missingStakeInfo");
    } else if (err === ErrorBuildTx.missingAccountData) {
      msg = t("tx-build:errors.txBuilt.missingAccountData");
    }
  } else if (err.toString().toLowerCase().startsWith("maximum transaction size")) {
    msg = t("tx-build:errors.txBuilt.maxTxSizeReached", { errorMessage: err, currency: adaCurrency.value });
  } else {
    msg = err?.message ?? err;
  }
  return { msg, isWarning };
};
const getTxSignErrorMsg = (err) => {
  let msg = "";
  if (!err) {
    return "";
  }
  if (err && typeof err === "string") {
    if (err.startsWith(ErrorSignTx.missingWalletData)) {
      msg = t("tx-build:errors.txSign.missingWalletData");
    } else if (err.startsWith(ErrorSignTx.invalidResult)) {
      msg = t("tx-build:errors.txSign.invalidResult");
    } else if (err.startsWith(ErrorSignTx.missingAccountData)) {
      msg = t("tx-build:errors.txSign.missingAccountData");
    } else if (err.startsWith(ErrorSignTx.missingWalletScripts)) {
      msg = t("tx-build:errors.txSign.missingWalletScripts");
    } else if (err.startsWith(ErrorSignTx.missingTx)) {
      msg = t("tx-build:errors.txSign.missingTx");
    } else if (err.startsWith(ErrorSignTx.missingKeysList)) {
      msg = t("tx-build:errors.txSign.missingKeysList");
    } else if (err.startsWith(ErrorSignTx.invalidPassword)) {
      msg = t("tx-build:errors.txSign.invalidPassword");
    } else if (err.startsWith(ErrorSignTx.missingRootKey)) {
      msg = t("tx-build:errors.txSign.missingRootKey");
    } else if (err.startsWith(ErrorSignTx.missingStakeKey)) {
      msg = t("tx-build:errors.txSign.missingStakeKey");
    } else if (err.startsWith(ErrorSignTx.missingKey)) {
      msg = t("tx-build:errors.txSign.missingKey");
    } else if (err.startsWith(ErrorSignTx.txSize)) {
      msg = t("tx-build:errors.txSign.txSizeDetails", {
        currentSize: err.split(".")[2],
        maxSize: err.split(".")[3]
      });
    } else if (err.startsWith(ErrorSignTx.failedToSign)) {
      msg = t("tx-build:errors.txSign.failedToSign");
    } else if (err.startsWith(ErrorSignTx.ledgerTxHashMismatch)) {
      msg = t("tx-build:errors.txSign.ledgerTxHashMismatch");
    } else if (err.startsWith(ErrorSignTx.ledgerCatalyst)) {
      msg = t("tx-build:errors.txSign.ledgerCatalyst");
    } else if (err.startsWith(ErrorSignTx.ledgerVersionMismatch)) {
      msg = t("tx-build:errors.txSign.ledgerVersionMismatch", {
        minimum: err.split(";")[1],
        current: err.split(";")[2]
      });
    } else if (err.startsWith(ErrorSignTx.trezorTxHashMismatch)) {
      msg = t("tx-build:errors.txSign.trezorTxHashMismatch");
    } else if (err.startsWith(ErrorSignTx.trezorCatalyst)) {
      msg = t("tx-build:errors.txSign.trezorCatalyst");
    } else if (err.startsWith(ErrorSignTx.canOnlySignPartially)) {
      msg = t("tx-build:errors.txSign.canOnlySignPartially");
    } else if (err.startsWith(ErrorSignTx.signTxHashMismatch)) {
      msg = t("tx-build:errors.txSign.signTxHashMismatch");
    } else if (err.startsWith(ErrorSignTx.isMultiSigWallet)) {
      msg = t("tx-build:errors.txSign.isMultiSigWallet");
    } else if (err.startsWith(ErrorSignTx.isReadOnlyWallet)) {
      msg = t("tx-build:errors.txSign.isReadOnlyWallet");
    } else if (err.startsWith(ErrorSubmitTx.noTxToSubmit)) {
      msg = t("tx-build:errors.txSign.noTxToSubmit");
    } else if (err.startsWith(ErrorSignTx.failedToShare)) {
      msg = t("tx-build:errors.txSign.failedToShare");
    } else if (err.startsWith(ErrorSignTx.deviceNotFound)) {
      msg = t("tx-build:errors.txSign.deviceNotFound");
    } else {
      msg = err;
    }
  }
  return msg;
};
const getDataSignErrorMsg = (err) => {
  let msg = "";
  if (!err) {
    return "";
  }
  if (err && typeof err === "string") {
    if (err.startsWith(ErrorSignData.missingWalletData)) {
      msg = t("tx-build:errors.dataSign.missingWalletData");
    } else if (err.startsWith(ErrorSignData.missingAccountData)) {
      msg = t("tx-build:errors.dataSign.missingAccountData");
    } else if (err.startsWith(ErrorSignData.missingAddr)) {
      msg = t("tx-build:errors.dataSign.missingAddr");
    } else if (err.startsWith(ErrorSignData.missingPayload)) {
      msg = t("tx-build:errors.dataSign.missingPayload");
    } else if (err.startsWith(ErrorSignData.invalidPassword)) {
      msg = t("tx-build:errors.dataSign.invalidPassword");
    } else if (err.startsWith(ErrorSignData.invalidAddress)) {
      msg = t("tx-build:errors.dataSign.invalidAddress");
    } else if (err.startsWith(ErrorSignData.notAMnemonic)) {
      msg = t("tx-build:errors.dataSign.notAMnemonic");
    } else if (err.startsWith(ErrorSignData.failedToSign)) {
      msg = t("tx-build:errors.dataSign.failedToSign");
    } else if (err.startsWith(ErrorSignData.noDataToSubmit)) {
      msg = t("tx-build:errors.dataSign.noDataToSubmit");
    } else if (err.startsWith(ErrorSignData.credentialNotFound)) {
      msg = t("tx-build:errors.dataSign.credentialNotFound");
    } else if (err.startsWith(ErrorSignData.invalidPayload)) {
      msg = t("tx-build:errors.dataSign.invalidPayload");
    } else if (err.startsWith(ErrorSignData.unsupportedWalletType)) {
      msg = t("tx-build:errors.dataSign.unsupportedWalletType");
    } else if (err.startsWith(ErrorSignData.deviceNotFound)) {
      msg = t("tx-build:errors.dataSign.deviceNotFound");
    } else {
      msg = err;
    }
  }
  return msg;
};
const getTxSubmitErrorMsg = (err) => {
  let msg = "";
  if (!err) {
    return "";
  }
  if (err) {
    if (err.startsWith(ErrorSubmitTx.noTxToSubmit)) {
      msg = t("tx-build:errors.txSubmit.noTxToSubmit");
    } else if (err.startsWith(ErrorSubmitTx.failed)) {
      const text = err.split(".").splice(2).join(".");
      if (text.includes("consumed") && text.includes("produced")) {
        msg = t("tx-build:errors.txSubmit.utxoSpent", { text });
      } else if (text === "503") {
        msg = t("tx-build:errors.txSubmit.noServers");
      } else {
        msg = t("tx-build:errors.txSubmit.submitFailed", {
          text: text ? " " + text : ""
        });
      }
    } else {
      msg = err;
    }
  }
  return msg;
};

export { getTxSubmitErrorMsg as a, getTxSignErrorMsg as b, getDataSignErrorMsg as c, getTxBuiltErrorMsg as g };
