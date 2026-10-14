import { e as ref } from './index.js';

const _show = ref(false);
const _receiveAddress = ref();
const _forcedUnusedAddress = ref();
const _stakeAddress = ref();
const _adaHandleList = ref();
const _adaHandle = ref();
const openModalReceiveAddress = (receiveAddress, forcedUnusedAddress, stakeAddress, adaHandleList, adaHandle) => {
  _receiveAddress.value = receiveAddress;
  _forcedUnusedAddress.value = forcedUnusedAddress;
  _stakeAddress.value = stakeAddress;
  _adaHandleList.value = adaHandleList;
  _adaHandle.value = adaHandle;
  _show.value = true;
};
const closeModalReceiveAddress = () => {
  _show.value = false;
  _receiveAddress.value = void 0;
  _forcedUnusedAddress.value = void 0;
  _stakeAddress.value = void 0;
  _adaHandleList.value = void 0;
  _adaHandle.value = void 0;
};
const useModalReceiveAddress = () => {
  return {
    openModalReceiveAddress,
    closeModalReceiveAddress,
    showModalReceiveAddress: _show,
    receiveAddress: _receiveAddress,
    forcedUnusedAddress: _forcedUnusedAddress,
    stakeAddress: _stakeAddress,
    adaHandleList: _adaHandleList,
    adaHandle: _adaHandle
  };
};

export { useModalReceiveAddress as u };
