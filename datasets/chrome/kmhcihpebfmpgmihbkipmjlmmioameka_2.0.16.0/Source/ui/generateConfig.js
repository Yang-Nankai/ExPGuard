import { y as getChangeAddress } from './useAppAccountBalances.js';
import { cQ as getPendingUtxoList } from './app2.js';

const generateTxConfig = (appAccount, epochParams, txIndex, buildCounter) => {
  const accountData = appAccount.data;
  const changeAddrBech32 = getChangeAddress(accountData)?.addr.bech32 ?? null;
  if (!changeAddrBech32) {
    throw new Error("No change address found.");
  }
  const {
    pendingWithdrawalMap
  } = getPendingUtxoList(appAccount);
  const stakeCredArray = Object.keys(pendingWithdrawalMap);
  const hasPendingWithdrawal = accountData.keys.stake.some((cred) => stakeCredArray.includes(cred.cred));
  const tfBundleSize = accountData.settings.tf.enabled ? accountData.settings.tf.bundleSize : 0;
  return {
    txIndex,
    buildCounter,
    maxCoinOutputIndex: -1,
    networkId: accountData.state.networkId,
    changeAddrBech32,
    processOutputList: true,
    allowChangeOnly: false,
    allowSendAll: true,
    // accountData.settings.sendAll.enabled,
    allowWithdrawal: accountData.settings.aw.enabled && !hasPendingWithdrawal,
    allowUtxoManagement: accountData.settings.aum.enabled,
    forceWithdrawal: false,
    numAdaOnlyUtxos: 0,
    // set during building
    numCollateralUtxos: 0,
    // set during building
    validityStartInterval: -1,
    addCertsAfterFirstTx: false,
    preventNavigation: false,
    epochParams,
    feeOffset: 0,
    forceTF: false,
    forceCU: false,
    maybeMultipleTx: false,
    tokenFragmentation: {
      enabledInternal: tfBundleSize > 0,
      enabledExternal: false,
      bundleSize: tfBundleSize
    },
    result: {
      isSendAll: false,
      isHigherThanUsualFee: false
    }
  };
};

export { generateTxConfig as g };
