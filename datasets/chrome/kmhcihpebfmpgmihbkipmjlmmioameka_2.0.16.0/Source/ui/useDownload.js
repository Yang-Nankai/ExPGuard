const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["ui/_useDownload.js","ui/index.js","ui/NetworkId.js","assets/index.css"])))=>i.map(i=>d[i]);
import { _ as __vitePreload, g as isMobileApp } from './index.js';

const downloadWallet = async (walletData) => {
  if (!walletData) {
    return false;
  }
  let downloadFunc = null;
  if (isMobileApp()) {
    const { _downloadWallet } = await __vitePreload(async () => { const { _downloadWallet } = await import('./_useDownload.js').then(n => n._);return { _downloadWallet }},true              ?__vite__mapDeps([0,1,2,3]):void 0);
    downloadFunc = _downloadWallet;
  } else {
    const { _downloadWallet } = await __vitePreload(async () => { const { _downloadWallet } = await import('./_useDownload2.js');return { _downloadWallet }},true              ?[]:void 0);
    downloadFunc = _downloadWallet;
  }
  return downloadFunc(walletData);
};
const downloadText = async (text, fileName) => {
  if (!text) {
    return false;
  }
  let downloadFunc = null;
  if (isMobileApp()) {
    const { _downloadText } = await __vitePreload(async () => { const { _downloadText } = await import('./_useDownload.js').then(n => n._);return { _downloadText }},true              ?__vite__mapDeps([0,1,2,3]):void 0);
    downloadFunc = _downloadText;
  } else {
    const { _downloadText } = await __vitePreload(async () => { const { _downloadText } = await import('./_useDownload2.js');return { _downloadText }},true              ?[]:void 0);
    downloadFunc = _downloadText;
  }
  return downloadFunc(text, fileName);
};
const useDownload = () => {
  return {
    downloadWallet,
    downloadText
  };
};

export { useDownload as u };
