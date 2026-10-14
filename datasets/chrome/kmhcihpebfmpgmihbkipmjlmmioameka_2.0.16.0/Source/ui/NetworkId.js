const networkIdList = ["mainnet", "preprod", "preview", "guild", "sancho", "afvt", "afvm", "afpt", "afpm"];
const networkGroups = {
  Cardano: ["mainnet", "preprod", "preview", "guild", "sancho"],
  APEX: ["afvt", "afvm", "afpt", "afpm"]
};
const networkFeaturesMap = networkIdList.reduce((o, n) => {
  o[n] = 0 /* NONE */;
  return o;
}, {});
networkFeaturesMap["mainnet"] = 255 /* ALL */;
networkFeaturesMap["guild"] = 1 /* STAKING */;
networkFeaturesMap["sancho"] = 1 /* STAKING */ | 16 /* DAPP_BROWSER */ | 8 /* GOVERNANCE */;
networkFeaturesMap["preprod"] = 1 /* STAKING */ | 16 /* DAPP_BROWSER */ | 8 /* GOVERNANCE */ | 4 /* CATALYST */;
networkFeaturesMap["preview"] = 1 /* STAKING */ | 16 /* DAPP_BROWSER */ | 8 /* GOVERNANCE */;
networkFeaturesMap["afpt"] = 1 /* STAKING */;
networkFeaturesMap["afpm"] = 1 /* STAKING */;
networkFeaturesMap["afvt"] = 1 /* STAKING */ | 16 /* DAPP_BROWSER */;
networkFeaturesMap["afvm"] = 1 /* STAKING */ | 16 /* DAPP_BROWSER */;
const networkAddressPrefix = {
  mainnet: "addr",
  sancho: "addr_test",
  guild: "addr_test",
  preprod: "addr_test",
  preview: "addr_test",
  afvt: "addr",
  // 'vector_test'
  afvm: "addr",
  // 'vector'
  afpt: "addr_test",
  afpm: "addr"
};
const networkStakeAddressPrefix = {
  mainnet: "stake",
  sancho: "stake_test",
  guild: "stake_test",
  preprod: "stake_test",
  preview: "stake_test",
  afvt: "stake",
  afvm: "stake",
  afpt: "stake_test",
  afpm: "stake"
};
const isEnabledNetworkId = (id) => networkIdList.includes(id) && Object.keys(networkFeaturesMap).includes(id);
const isStakingEnabled = (networkId) => (networkFeaturesMap[networkId] & 1 /* STAKING */) !== 0;
const isDappBrowserEnabled = (networkId) => (networkFeaturesMap[networkId] & 16 /* DAPP_BROWSER */) !== 0;
const isSwapEnabled = (networkId) => (networkFeaturesMap[networkId] & 2 /* SWAP */) !== 0;
const isCollateralEnabled = (networkId) => (networkFeaturesMap[networkId] & 128 /* ETERNL_COLLATERAL */) !== 0;
const isCatalystEnabled = (networkId) => (networkFeaturesMap[networkId] & 4 /* CATALYST */) !== 0;
const isGovernanceEnabled = (networkId) => (networkFeaturesMap[networkId] & 8 /* GOVERNANCE */) !== 0;
const updateNetworkFeaturesMap = (featuresMap) => {
  let changed = false;
  const oldNetworks = Object.keys(networkFeaturesMap);
  const newNetworks = Object.keys(featuresMap);
  if (oldNetworks.length !== newNetworks.length || newNetworks.some(
    (n) => !oldNetworks.includes(n) || networkFeaturesMap[n] !== featuresMap[n]
  )) {
    changed = true;
  }
  if (changed) {
    for (const key in networkFeaturesMap) {
      delete networkFeaturesMap[key];
    }
    for (const key in featuresMap) {
      networkFeaturesMap[key] = featuresMap[key];
    }
  }
  return changed;
};
const getNetworkId = (id) => {
  switch (id) {
    case "mainnet":
      return 1;
    case "guild":
      return 0;
    case "sancho":
      return 0;
    case "preprod":
      return 0;
    case "preview":
      return 0;
    case "afvt":
      return 1;
    case "afvm":
      return 1;
    case "afpt":
      return 0;
    case "afpm":
      return 1;
  }
  throw new Error("Error: INetwork.getNetworkId: unknown network: " + id);
};
const getNetworkDecimals = (id) => {
  switch (id) {
    case "sancho":
      return 6;
    default:
      return 6;
  }
};
const isSupportedNetworkId = (id) => networkIdList.includes(id);
const isTestnetNetwork = (networkId) => {
  switch (networkId) {
    case "mainnet":
      return false;
    case "guild":
      return true;
    case "sancho":
      return true;
    case "preprod":
      return true;
    case "preview":
      return true;
    case "afvt":
      return true;
    case "afvm":
      return false;
    case "afpt":
      return true;
    case "afpm":
      return false;
    default:
      return false;
  }
};
const isCustomNetwork = (networkId) => !isTestnetNetwork(networkId) && networkId !== "mainnet";

export { isCustomNetwork as a, isEnabledNetworkId as b, isSwapEnabled as c, isStakingEnabled as d, networkGroups as e, isSupportedNetworkId as f, getNetworkDecimals as g, getNetworkId as h, isTestnetNetwork as i, networkAddressPrefix as j, isGovernanceEnabled as k, isDappBrowserEnabled as l, isCatalystEnabled as m, networkIdList as n, isCollateralEnabled as o, networkStakeAddressPrefix as p, updateNetworkFeaturesMap as u };
