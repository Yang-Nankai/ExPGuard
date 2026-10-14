import { a$ as backendServer, aj as api, bI as DEFAULT_ACCOUNT_ID } from './index.js';
import { f as getRequestData, A as ApiRequestType, E as ErrorSync } from './epochParams.js';

const getMultiSigURL = () => {
  if (backendServer?.serverV2?.multiSig) {
    return `https://${backendServer.serverV2.multiSig}`;
  }
  throw new Error("No backend Multi-Sig URL available.");
};

const discoverMultiSigWallets = async (networkId, accountId, credList) => {
  if (!accountId) {
    accountId = DEFAULT_ACCOUNT_ID;
  }
  return getRequestData()(
    networkId,
    accountId,
    ApiRequestType.syncMultiSig,
    ErrorSync.discoverMultiSig,
    {
      id: accountId,
      credList
    },
    async (data) => {
      if (!data.multiSigList) {
        throw "missingMultiSigList";
      }
      return data.multiSigList;
    }
  );
};
const syncMultiSigMeta = async (networkId, accountId, paymentCred) => {
  if (!accountId) {
    accountId = DEFAULT_ACCOUNT_ID;
  }
  return getRequestData()(
    networkId,
    accountId,
    ApiRequestType.syncMultiSigMeta,
    ErrorSync.syncMultiSigMeta,
    {
      id: accountId,
      cred: paymentCred
    },
    async (data) => {
      if (!data.multiSigMeta) {
        throw "missingMultiSigMeta";
      }
      return data.multiSigMeta;
    }
  );
};
const shareMultiSigTx = async (networkId, txCbor, update) => {
  const url = `${getMultiSigURL()}/${networkId}/v1/multisig/tx/post`;
  const res = await api.post(url, { txCbor }, void 0, 1e4);
  return res.status === 200;
};

export { shareMultiSigTx as a, discoverMultiSigWallets as d, syncMultiSigMeta as s };
