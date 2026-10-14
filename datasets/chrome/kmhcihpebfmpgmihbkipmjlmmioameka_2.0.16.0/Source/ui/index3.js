const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["ui/_Clipboard.js","ui/index.js","ui/NetworkId.js","assets/index.css"])))=>i.map(i=>d[i]);
import { g as isMobileApp, _ as __vitePreload } from './index.js';

const copyToClipboard = async (textToCopy) => {
  if (!textToCopy) {
    return false;
  }
  try {
    let func = null;
    if (isMobileApp()) {
      const { _copyToClipboard } = await __vitePreload(async () => { const { _copyToClipboard } = await import('./_Clipboard.js');return { _copyToClipboard }},true              ?__vite__mapDeps([0,1,2,3]):void 0);
      func = _copyToClipboard;
    } else {
      const { _copyToClipboard } = await __vitePreload(async () => { const { _copyToClipboard } = await import('./_Clipboard2.js');return { _copyToClipboard }},true              ?[]:void 0);
      func = _copyToClipboard;
    }
    await func(textToCopy);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export { copyToClipboard as c };
