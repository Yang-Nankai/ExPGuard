import { bq as initAppInfo } from './index.js';

const params = {
  HOST_API: "https://api.eternl.io",
  USE_COOLIFY: "yes",
  TOKEN: "#!l4n56cGPHoHM3Z@xiT&CV8",
  ENVIRONMENT: "production",
  TYPE: "bex",
  PEN: "k%%2Gb6^!m8iMIvwlnS2xpWC",
  PLATFORM: "web",
  IS_STAGING: "no",
  IS_BETA: "no",
  ADD_APEX: "yes",
  LOCAL_SWAP_BACKEND: undefined                                     ,
  LOCAL_TRANSLATIONS_BACKEND: undefined                                             
};
initAppInfo(params);
