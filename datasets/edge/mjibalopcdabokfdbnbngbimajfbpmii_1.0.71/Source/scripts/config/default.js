/* global chrome */
const configDev = {
  HOST_DOMAIN: 'https://app.psychological.ai',
  BASE_URL: 'https://app.psychological.ai/v1',
  BASE_URL_V2: 'https://app.psychological.ai/v2',
  SUPPORTED_LANGUAGES: ['de', 'en'],
};

const configProd = {
  HOST_DOMAIN: 'https://app.psychological.ai',
  BASE_URL: 'https://app.psychological.ai/v1',
  BASE_URL_V2: 'https://app.psychological.ai/v2',
  SUPPORTED_LANGUAGES: ['de', 'en'],
};

const getConfig = async () => {
  const extensionInfo = await chrome.management.getSelf();
  const isDevelopment = extensionInfo?.installType === chrome.management.ExtensionInstallType.DEVELOPMENT;

  return isDevelopment ? configDev : configProd;
};

export default getConfig;
