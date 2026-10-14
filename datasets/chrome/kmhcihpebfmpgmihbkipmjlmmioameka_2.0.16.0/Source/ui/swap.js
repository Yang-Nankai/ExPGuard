import { a$ as backendServer, bW as getAppInfo } from './index.js';

const getSwapURL = () => {
  const localURL = getAppInfo().localSwapBackend;
  if (localURL) {
    return localURL;
  }
  if (backendServer?.serverV2?.swap) {
    return `https://${backendServer.serverV2.swap}`;
  }
  throw new Error("No backend swap URL available.");
};

export { getSwapURL as g };
