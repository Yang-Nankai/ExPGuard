import { bK as getHintUtxoList, B as createIUtxo, bL as ErrorSignData, a7 as getIAppWallet, aL as isMultiSigAccountPath } from './app2.js';
import { E as ErrorSignTx } from './ErrorSignTx.js';
import { e as ref, aC as dispatchSignal, cK as onDataSignReset, P as networkId, aX as json } from './index.js';
import { g as getTransactionFromCbor, u as useSignTx } from './useSignTx.js';
import { a as getSignTxCredList } from './creds.js';
import { c as checkEpochParams } from './epochParams.js';

const _reqMap = /* @__PURE__ */ new Map();
const setApiRequest = (req, callerId) => {
  const _oldReq = _reqMap.get(callerId);
  if (_oldReq && _oldReq.payload.resolve) {
    _oldReq.payload.resolve();
    delete _oldReq.payload.resolve;
  }
  _reqMap.set(callerId, req ?? null);
};
const getApiRequest = (callerId) => {
  return _reqMap.get(callerId) ?? null;
};

const addr = ref(null);
const payload = ref(null);
const payloadType = ref(null);
const txSubmitType = ref(null);
const accountId = ref(null);
const walletId = ref(null);
const origin = ref(null);
const openSignData = (_addr, _payload, _txSubmitType, _accountId, _walletId, _payloadType, _origin) => {
  if (_addr && _payload && _accountId && _walletId && _txSubmitType) {
    accountId.value = _accountId;
    walletId.value = _walletId;
    addr.value = _addr;
    payload.value = _payload;
    txSubmitType.value = _txSubmitType;
    payloadType.value = _payloadType ?? null;
    origin.value = _origin ?? null;
  } else {
    accountId.value = null;
    walletId.value = null;
    addr.value = null;
    payload.value = null;
    txSubmitType.value = null;
    payloadType.value = null;
    origin.value = null;
    dispatchSignal(onDataSignReset);
  }
};
const resetSignData = () => openSignData();
const useSignData = () => {
  return {
    addr,
    payload,
    payloadType,
    txSubmitType,
    accountId,
    walletId,
    origin,
    openSignData,
    resetSignData
  };
};

var ApiErrorCode = /* @__PURE__ */ ((ApiErrorCode2) => {
  ApiErrorCode2[ApiErrorCode2["InvalidRequest"] = -1] = "InvalidRequest";
  ApiErrorCode2[ApiErrorCode2["InternalError"] = -2] = "InternalError";
  ApiErrorCode2[ApiErrorCode2["Refused"] = -3] = "Refused";
  ApiErrorCode2[ApiErrorCode2["AccountChange"] = -4] = "AccountChange";
  return ApiErrorCode2;
})(ApiErrorCode || {});
var DataSignErrorCode = /* @__PURE__ */ ((DataSignErrorCode2) => {
  DataSignErrorCode2[DataSignErrorCode2["ProofGeneration"] = 1] = "ProofGeneration";
  DataSignErrorCode2[DataSignErrorCode2["AddressNotPK"] = 2] = "AddressNotPK";
  DataSignErrorCode2[DataSignErrorCode2["UserDeclined"] = 3] = "UserDeclined";
  DataSignErrorCode2[DataSignErrorCode2["InvalidFormat"] = 4] = "InvalidFormat";
  return DataSignErrorCode2;
})(DataSignErrorCode || {});
var TxSendErrorCode = /* @__PURE__ */ ((TxSendErrorCode2) => {
  TxSendErrorCode2[TxSendErrorCode2["Refused"] = 1] = "Refused";
  TxSendErrorCode2[TxSendErrorCode2["Failure"] = 2] = "Failure";
  return TxSendErrorCode2;
})(TxSendErrorCode || {});
var TxSignErrorCode = /* @__PURE__ */ ((TxSignErrorCode2) => {
  TxSignErrorCode2[TxSignErrorCode2["ProofGeneration"] = 1] = "ProofGeneration";
  TxSignErrorCode2[TxSignErrorCode2["UserDeclined"] = 2] = "UserDeclined";
  TxSignErrorCode2[TxSignErrorCode2["DeprecatedCertificate"] = 3] = "DeprecatedCertificate";
  return TxSignErrorCode2;
})(TxSignErrorCode || {});

const createInternalError = (info) => ({ success: false, error: { code: ApiErrorCode.InternalError, info } });
const createInvalidRequestError = (info) => ({ success: false, error: { code: ApiErrorCode.InvalidRequest, info } });
const errorInternal = (e) => createInternalError(e);
const errorNoPayload = () => createInternalError("Error: no payload");
const errorNoOrigin = () => createInternalError("Error: no origin");
const errorNoAccount = () => createInternalError("no account set");
const errorNoNetworkId = () => createInternalError("no networkId");
const errorNoNetworkMagic = () => createInternalError("no network magic");
const errorNoChangeAddr = () => createInternalError("no change address");
const errorNoRewardAddr = () => createInternalError("no reward address");
const errorNotConnected = () => createInvalidRequestError("not connected");
const errorInvalidInputAmount = (e) => createInvalidRequestError("invalid input: amount: " + e);
const errorInvalidAmount = (e) => createInvalidRequestError("invalid amount: " + e);
const errorNoAddr = () => createInvalidRequestError("no addr set");
const errorNoTx = () => createInvalidRequestError("no tx set");
const errorNoSubmitTx = () => createInvalidRequestError("no submit tx set");
const errorInvalidArgument = () => createInvalidRequestError("invalid argument");
const errorUnsupportedExtensions = (extensions) => createInvalidRequestError("unsupported extensions requested: " + extensions);
const errorPaginateRange = (numPages) => ({ success: false, error: { code: 1, info: "page out of range", maxPages: numPages } });
const errorConnectionRefused = () => ({ success: false, error: { code: ApiErrorCode.Refused, info: "user canceled connection" } });
const errorAccountChanged = () => ({ success: false, error: { code: ApiErrorCode.AccountChange, info: "account changed" } });
const errorTxUserDeclined = () => ({ success: false, error: { code: TxSignErrorCode.UserDeclined, info: "user declined sign tx" } });
const errorTxProofGeneration = () => ({ success: false, error: { code: TxSignErrorCode.ProofGeneration, info: "no witness set generated" } });
const errorDataUserDeclined = () => ({ success: false, error: { code: DataSignErrorCode.UserDeclined, info: "user declined sign data" } });
const errorSubmitTxFailed = (e) => ({ success: false, error: { code: TxSendErrorCode.Failure, info: e } });

const parseTxList = async (appAccount, txSubmitType) => {
  const req = getApiRequest("signTx");
  console.warn("parseTxList", appAccount?.id, appAccount?.walletId, txSubmitType, req);
  if (!req) {
    throw ErrorSignData.missingRequest;
  }
  if (!appAccount) {
    req.response = errorNoAccount();
    return null;
  }
  const txList = req.payload.txList;
  if (!txList) {
    req.response = errorNoTx();
    return null;
  }
  return parseTxSignRequest(appAccount, txSubmitType, txList, null);
};
const parseTxSignRequest = async (appAccount, txSubmitType, txRequestList, buildSignal, trackingUuid) => {
  if (!appAccount) {
    return null;
  }
  const txList = txRequestList;
  const networkId2 = appAccount.data.state.networkId;
  const resList = [];
  const hintUtxoList = getHintUtxoList(appAccount);
  const restrictToAccountIds = txSubmitType === "dapp" ? [appAccount.id] : void 0;
  if (restrictToAccountIds) {
    const appWallet = getIAppWallet(appAccount.walletId);
    if (appWallet) {
      for (const account of appWallet.data.wallet.accountList) {
        if (isMultiSigAccountPath(account)) {
          restrictToAccountIds.push(account.id);
        }
      }
    }
  }
  let partialSign = false;
  const txLen = txList.length;
  const epochParams = checkEpochParams();
  for (let i = 0; i < txLen; i++) {
    const free = [];
    const res = getTransactionFromCbor(networkId2, txList[i].cbor, i, free);
    if (!res.builtTx) {
      throw ErrorSignTx.txCborInvalid;
    }
    for (const cert of res.builtTx.body.certs ?? []) {
      if ((cert.hasOwnProperty("GenesisKeyDelegation") || cert.hasOwnProperty("MoveInstantaneousRewardsCert")) && epochParams.isAtLeastConwayEra) {
        throw ErrorSignTx.deprecatedCertificate;
      }
    }
    res.builtTx.inputUtxoList = hintUtxoList.filter((chained) => res.builtTx.body.inputs.some((input) => input.transaction_id === chained.input.transaction_id && input.index === chained.input.index));
    res.builtTx.inputUtxoList.push(...hintUtxoList.filter((chained) => !!res.builtTx.body.collateral?.some((input) => input.transaction_id === chained.input.transaction_id && input.index === chained.input.index)));
    const creds = await getSignTxCredList(networkId2, res.signedTx?.tx ?? res.builtTx, restrictToAccountIds);
    console.log("res.creds", json(creds));
    res.txCredList = creds;
    if (!txList[i].partialSign && !creds.canSignAllUnsigned) {
      if (creds.ownedList.length === 0) {
        throw ErrorSignTx.failedToSign;
      }
      throw ErrorSignTx.canOnlySignPartially;
    }
    if (!partialSign && txList[i].partialSign) {
      partialSign = true;
    }
    resList.push(res);
    const outputLen = res.builtTx.body.outputs.length;
    if (txLen > 1) {
      for (let j = 0; j < outputLen; j++) {
        hintUtxoList.push(createIUtxo({
          input: {
            transaction_id: res.txHash,
            index: j
          },
          output: res.builtTx.body.outputs[j]
        }));
      }
    }
  }
  useSignTx().openSignTx(resList, txSubmitType, partialSign, buildSignal, trackingUuid);
  console.warn("parseTx: success");
  return resList;
};
const parseTxShowRequest = async (txCbor, appAccount) => {
  const hintUtxoList = getHintUtxoList(appAccount);
  const epochParams = checkEpochParams();
  const free = [];
  const res = getTransactionFromCbor(networkId.value, txCbor, 0, free);
  if (!res.builtTx) {
    throw ErrorSignTx.txCborInvalid;
  }
  for (const cert of res.builtTx.body.certs ?? []) {
    if ((cert.hasOwnProperty("GenesisKeyDelegation") || cert.hasOwnProperty("MoveInstantaneousRewardsCert")) && epochParams.isAtLeastConwayEra) {
      throw ErrorSignTx.deprecatedCertificate;
    }
  }
  res.builtTx.inputUtxoList = hintUtxoList.filter((chained) => res.builtTx.body.inputs.some((input) => input.transaction_id === chained.input.transaction_id && input.index === chained.input.index));
  res.builtTx.inputUtxoList.push(...hintUtxoList.filter((chained) => !!res.builtTx.body.collateral?.some((input) => input.transaction_id === chained.input.transaction_id && input.index === chained.input.index)));
  const creds = await getSignTxCredList(networkId.value, res.builtTx);
  res.txCredList = creds;
  return res;
};
const parseData = (appAccount) => {
  const req = getApiRequest("signData");
  console.warn("parseData", appAccount?.id, appAccount?.walletId, req);
  if (!req) {
    throw ErrorSignData.missingRequest;
  }
  if (!appAccount) {
    req.response = errorNoAccount();
    return req;
  }
  const addr = req.payload.addr;
  const payload = req.payload.sigStructure;
  const origin = req.payload.origin;
  if (!addr) {
    req.response = errorNoAddr();
    return req;
  }
  if (!payload) {
    req.response = errorNoPayload();
    return req;
  }
  useSignData().openSignData(addr, payload, "dapp", appAccount.id, appAccount.walletId, void 0, origin);
  console.warn("parseData: success");
  return req;
};

export { ApiErrorCode as A, parseData as B, parseTxShowRequest as a, errorInvalidAmount as b, errorPaginateRange as c, errorNoSubmitTx as d, errorInvalidInputAmount as e, errorSubmitTxFailed as f, errorNoNetworkId as g, errorInvalidArgument as h, errorUnsupportedExtensions as i, errorNoAccount as j, errorInternal as k, errorNoChangeAddr as l, errorNoRewardAddr as m, errorNoNetworkMagic as n, errorConnectionRefused as o, parseTxSignRequest as p, errorTxUserDeclined as q, errorDataUserDeclined as r, setApiRequest as s, errorNoOrigin as t, errorNotConnected as u, errorAccountChanged as v, getApiRequest as w, useSignData as x, parseTxList as y, errorTxProofGeneration as z };
