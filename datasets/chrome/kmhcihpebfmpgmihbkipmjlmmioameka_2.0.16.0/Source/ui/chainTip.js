import { D as computed, e as ref, cm as getChainTip, P as networkId, cn as setOffsetFromServer, co as setChainTip } from './index.js';
import { u as updateChainTip } from './chain.js';
import { k as updateEpochParams } from './epochParams.js';

const createIChainTip = (networkId) => {
  return {
    networkId,
    network: networkId,
    blockNo: 0,
    slotNo: 0,
    epochNo: 0,
    epochSlot: 0,
    epochSlots: 0,
    epochPercent: 0,
    syncProgress: 0,
    onTip: false,
    serverTime: 0
  };
};

const createChainTip = (networkId2) => {
  const chainTip2 = createIChainTip(networkId2);
  updateChainTip(networkId2, chainTip2, chainTip2);
  chainTip2.onTip = false;
  return chainTip2;
};
const _chainTip = ref(getChainTip(networkId.value, createChainTip(networkId.value)).value);
const chainTip = computed(() => _chainTip.value);
const isConnected = ref(false);
const onUpdateChainTip = (chainTip2) => {
  if (chainTip2.networkId === networkId.value) {
    isConnected.value = chainTip2.epochNo > 0 && chainTip2.onTip;
    if (!Number.isNaN(chainTip2.serverTime) && chainTip2.serverTime > 0) {
      setOffsetFromServer(chainTip2.serverTime);
    }
    setChainTip(networkId.value, chainTip2);
    _chainTip.value = chainTip2;
    updateEpochParams(_chainTip.value);
    return true;
  }
  return false;
};
const onUpdateOnTip = (numFailedCalls) => {
  const __chainTip = chainTip.value;
  if (__chainTip.networkId === networkId.value) {
    updateChainTip(networkId.value, __chainTip, __chainTip);
    if (numFailedCalls > 4) {
      __chainTip.onTip = false;
    }
    isConnected.value = __chainTip.epochNo > 0 && __chainTip.onTip;
    return true;
  }
  return false;
};

export { onUpdateOnTip as a, chainTip as c, onUpdateChainTip as o };
