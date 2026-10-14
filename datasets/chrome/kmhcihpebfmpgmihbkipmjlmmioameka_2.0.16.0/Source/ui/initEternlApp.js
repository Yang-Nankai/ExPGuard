import { A as AppMode, s as setAppMode$1 } from './index.js';
import './params.js';
import { n as networkIdList } from './NetworkId.js';

const removeApexNetworks = () => {
  for (let i = networkIdList.length - 1; i >= 0; i--) {
    if (networkIdList[i] === "afvt") {
      networkIdList.splice(i, 1);
    } else if (networkIdList[i] === "afpt") {
      networkIdList.splice(i, 1);
    } else if (networkIdList[i] === "afvm") {
      networkIdList.splice(i, 1);
    } else if (networkIdList[i] === "afpm") {
      networkIdList.splice(i, 1);
    }
  }
};
const setAppMode = (mode) => {
  if (mode === AppMode.normal) {
    setAppMode$1(AppMode.normal);
  } else if (mode === AppMode.enable) {
    setAppMode$1(AppMode.enable);
  } else if (mode === AppMode.signTx) {
    setAppMode$1(AppMode.signTx);
  } else if (mode === AppMode.signData) {
    setAppMode$1(AppMode.signData);
  } else if (mode === AppMode.bg) {
    setAppMode$1(AppMode.bg);
  } else if (mode === AppMode.offscreen) {
    setAppMode$1(AppMode.offscreen);
  } else if (mode === AppMode.sidePanel) {
    setAppMode$1(AppMode.sidePanel);
  }
};

export { removeApexNetworks, setAppMode };
