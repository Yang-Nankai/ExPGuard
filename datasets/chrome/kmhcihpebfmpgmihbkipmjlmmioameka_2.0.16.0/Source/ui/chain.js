import { aV as now, aW as changeTimezone } from './index.js';

const activeSlotsCoeff$8 = 0.05;
const protocolParams$8 = {"protocolVersion":{"minor":0,"major":2},"decentralisationParam":1,"eMax":18,"extraEntropy":{"tag":"NeutralNonce"},"maxTxSize":16384,"maxBlockBodySize":65536,"maxBlockHeaderSize":1100,"minFeeA":44,"minFeeB":155381,"minUTxOValue":1000000,"poolDeposit":500000000,"minPoolCost":340000000,"keyDeposit":2000000,"nOpt":150,"rho":0.003,"tau":0.2,"a0":0.3};
const updateQuorum$8 = 5;
const networkId$8 = "Mainnet";
const initialFunds$1 = {};
const maxLovelaceSupply$8 = 45000000000000000;
const networkMagic$8 = 764824073;
const epochLength$8 = 432000;
const systemStart$8 = "2017-09-23T21:44:51Z";
const slotsPerKESPeriod$8 = 129600;
const slotLength$8 = 1;
const maxKESEvolutions$8 = 62;
const securityParam$8 = 2160;
const mainnetShelley = {
  activeSlotsCoeff: activeSlotsCoeff$8,
  protocolParams: protocolParams$8,
  updateQuorum: updateQuorum$8,
  networkId: networkId$8,
  initialFunds: initialFunds$1,
  maxLovelaceSupply: maxLovelaceSupply$8,
  networkMagic: networkMagic$8,
  epochLength: epochLength$8,
  systemStart: systemStart$8,
  slotsPerKESPeriod: slotsPerKESPeriod$8,
  slotLength: slotLength$8,
  maxKESEvolutions: maxKESEvolutions$8,
  securityParam: securityParam$8,
};

const maxLovelaceSupply$7 = 45000000000000000;
const securityParam$7 = 36;
const slotsPerKESPeriod$7 = 129600;
const updateQuorum$7 = 1;
const activeSlotsCoeff$7 = 0.05;
const protocolParams$7 = {"minUTxOValue":1000000,"eMax":18,"extraEntropy":{"tag":"NeutralNonce"},"minFeeB":1000,"tau":0.1,"maxBlockBodySize":65536,"minPoolCost":340000000,"minFeeA":1,"maxTxSize":16384,"nOpt":10,"maxBlockHeaderSize":1100,"keyDeposit":2000000,"protocolVersion":{"minor":0,"major":2},"poolDeposit":500000000,"a0":0.3,"rho":0.0003,"decentralisationParam":0.8};
const networkMagic$7 = 141;
const maxKESEvolutions$7 = 62;
const networkId$7 = "Testnet";
const slotLength$7 = 1;
const systemStart$7 = "2021-12-09T22:55:22Z";
const epochLength$7 = 3600;
const guildShelley = {
  maxLovelaceSupply: maxLovelaceSupply$7,
  securityParam: securityParam$7,
  slotsPerKESPeriod: slotsPerKESPeriod$7,
  updateQuorum: updateQuorum$7,
  activeSlotsCoeff: activeSlotsCoeff$7,
  protocolParams: protocolParams$7,
  networkMagic: networkMagic$7,
  maxKESEvolutions: maxKESEvolutions$7,
  networkId: networkId$7,
  slotLength: slotLength$7,
  systemStart: systemStart$7,
  epochLength: epochLength$7,
};

const maxLovelaceSupply$6 = 45000000000000000;
const securityParam$6 = 432;
const slotsPerKESPeriod$6 = 129600;
const updateQuorum$6 = 3;
const activeSlotsCoeff$6 = 0.05;
const protocolParams$6 = {"a0":0.3,"decentralisationParam":1,"eMax":18,"extraEntropy":{"tag":"NeutralNonce"},"keyDeposit":2000000,"maxBlockBodySize":65536,"maxBlockHeaderSize":1100,"maxTxSize":16384,"minFeeA":44,"minFeeB":155381,"minPoolCost":340000000,"minUTxOValue":1000000,"nOpt":150,"poolDeposit":500000000,"protocolVersion":{"major":6,"minor":0},"rho":0.003,"tau":0.2};
const networkMagic$6 = 4;
const initialFunds = {};
const maxKESEvolutions$6 = 62;
const networkId$6 = "Testnet";
const slotLength$6 = 1;
const systemStart$6 = "2023-06-15T00:30:00Z";
const epochLength$6 = 86400;
const sanchoShelley = {
  maxLovelaceSupply: maxLovelaceSupply$6,
  securityParam: securityParam$6,
  slotsPerKESPeriod: slotsPerKESPeriod$6,
  updateQuorum: updateQuorum$6,
  activeSlotsCoeff: activeSlotsCoeff$6,
  protocolParams: protocolParams$6,
  networkMagic: networkMagic$6,
  initialFunds,
  maxKESEvolutions: maxKESEvolutions$6,
  networkId: networkId$6,
  slotLength: slotLength$6,
  systemStart: systemStart$6,
  epochLength: epochLength$6,
};

const activeSlotsCoeff$5 = 0.05;
const epochLength$5 = 432000;
const maxKESEvolutions$5 = 62;
const maxLovelaceSupply$5 = 45000000000000000;
const networkId$5 = "Testnet";
const networkMagic$5 = 1;
const protocolParams$5 = {"protocolVersion":{"minor":0,"major":2},"decentralisationParam":1,"eMax":18,"extraEntropy":{"tag":"NeutralNonce"},"maxTxSize":16384,"maxBlockBodySize":65536,"maxBlockHeaderSize":1100,"minFeeA":44,"minFeeB":155381,"minUTxOValue":1000000,"poolDeposit":500000000,"minPoolCost":340000000,"keyDeposit":2000000,"nOpt":150,"rho":0.003,"tau":0.2,"a0":0.3};
const securityParam$5 = 2160;
const slotLength$5 = 1;
const slotsPerKESPeriod$5 = 129600;
const systemStart$5 = "2022-06-01T00:00:00Z";
const updateQuorum$5 = 5;
const preprodShelley = {
  activeSlotsCoeff: activeSlotsCoeff$5,
  epochLength: epochLength$5,
  maxKESEvolutions: maxKESEvolutions$5,
  maxLovelaceSupply: maxLovelaceSupply$5,
  networkId: networkId$5,
  networkMagic: networkMagic$5,
  protocolParams: protocolParams$5,
  securityParam: securityParam$5,
  slotLength: slotLength$5,
  slotsPerKESPeriod: slotsPerKESPeriod$5,
  systemStart: systemStart$5,
  updateQuorum: updateQuorum$5,
};

const activeSlotsCoeff$4 = 0.05;
const epochLength$4 = 86400;
const maxKESEvolutions$4 = 62;
const maxLovelaceSupply$4 = 45000000000000000;
const networkId$4 = "Testnet";
const networkMagic$4 = 2;
const protocolParams$4 = {"protocolVersion":{"minor":0,"major":6},"decentralisationParam":1,"eMax":18,"extraEntropy":{"tag":"NeutralNonce"},"maxTxSize":16384,"maxBlockBodySize":65536,"maxBlockHeaderSize":1100,"minFeeA":44,"minFeeB":155381,"minUTxOValue":1000000,"poolDeposit":500000000,"minPoolCost":340000000,"keyDeposit":2000000,"nOpt":150,"rho":0.003,"tau":0.2,"a0":0.3};
const securityParam$4 = 432;
const slotLength$4 = 1;
const slotsPerKESPeriod$4 = 129600;
const systemStart$4 = "2022-10-25T00:00:00Z";
const updateQuorum$4 = 5;
const previewShelley = {
  activeSlotsCoeff: activeSlotsCoeff$4,
  epochLength: epochLength$4,
  maxKESEvolutions: maxKESEvolutions$4,
  maxLovelaceSupply: maxLovelaceSupply$4,
  networkId: networkId$4,
  networkMagic: networkMagic$4,
  protocolParams: protocolParams$4,
  securityParam: securityParam$4,
  slotLength: slotLength$4,
  slotsPerKESPeriod: slotsPerKESPeriod$4,
  systemStart: systemStart$4,
  updateQuorum: updateQuorum$4,
};

const activeSlotsCoeff$3 = 0.25;
const epochLength$3 = 86400;
const maxKESEvolutions$3 = 62;
const maxLovelaceSupply$3 = 3000000000000000;
const networkId$3 = "Mainnet";
const networkMagic$3 = 764824073;
const protocolParams$3 = {"a0":0,"decentralisationParam":1,"eMax":18,"extraEntropy":{"tag":"NeutralNonce"},"keyDeposit":0,"maxBlockBodySize":180224,"maxBlockHeaderSize":1100,"maxTxSize":16384,"minFeeA":45,"minFeeB":156253,"minPoolCost":0,"minUTxOValue":1000000,"nOpt":100,"poolDeposit":0,"protocolVersion":{"major":2,"minor":0},"rho":0.00001,"tau":0.000001};
const securityParam$3 = 2160;
const slotLength$3 = 1;
const slotsPerKESPeriod$3 = 129600;
const systemStart$3 = "2025-07-09T10:38:04.000000000Z";
const updateQuorum$3 = 3;
const afvtShelley = {
  activeSlotsCoeff: activeSlotsCoeff$3,
  epochLength: epochLength$3,
  maxKESEvolutions: maxKESEvolutions$3,
  maxLovelaceSupply: maxLovelaceSupply$3,
  networkId: networkId$3,
  networkMagic: networkMagic$3,
  protocolParams: protocolParams$3,
  securityParam: securityParam$3,
  slotLength: slotLength$3,
  slotsPerKESPeriod: slotsPerKESPeriod$3,
  systemStart: systemStart$3,
  updateQuorum: updateQuorum$3,
};

const activeSlotsCoeff$2 = 0.25;
const epochLength$2 = 86400;
const maxKESEvolutions$2 = 62;
const maxLovelaceSupply$2 = 3000000000000000;
const networkId$2 = "Mainnet";
const networkMagic$2 = 764824073;
const protocolParams$2 = {"a0":0,"decentralisationParam":1,"eMax":18,"extraEntropy":{"tag":"NeutralNonce"},"keyDeposit":0,"maxBlockBodySize":180224,"maxBlockHeaderSize":1100,"maxTxSize":16384,"minFeeA":45,"minFeeB":156253,"minPoolCost":0,"minUTxOValue":1000000,"nOpt":100,"poolDeposit":0,"protocolVersion":{"major":2,"minor":0},"rho":0.00001,"tau":0.000001};
const securityParam$2 = 2160;
const slotLength$2 = 1;
const slotsPerKESPeriod$2 = 129600;
const systemStart$2 = "2025-08-29T16:40:00.000000000Z";
const updateQuorum$2 = 3;
const afvmShelley = {
  activeSlotsCoeff: activeSlotsCoeff$2,
  epochLength: epochLength$2,
  maxKESEvolutions: maxKESEvolutions$2,
  maxLovelaceSupply: maxLovelaceSupply$2,
  networkId: networkId$2,
  networkMagic: networkMagic$2,
  protocolParams: protocolParams$2,
  securityParam: securityParam$2,
  slotLength: slotLength$2,
  slotsPerKESPeriod: slotsPerKESPeriod$2,
  systemStart: systemStart$2,
  updateQuorum: updateQuorum$2,
};

const systemStart$1 = "2024-05-16T17:18:10.000000000Z";
const networkMagic$1 = 3311;
const networkId$1 = "Testnet";
const activeSlotsCoeff$1 = 0.05;
const securityParam$1 = 2160;
const epochLength$1 = 432000;
const slotsPerKESPeriod$1 = 129600;
const maxKESEvolutions$1 = 62;
const slotLength$1 = 1;
const updateQuorum$1 = 2;
const maxLovelaceSupply$1 = 3000000000000000;
const protocolParams$1 = {"minFeeA":47,"minFeeB":158298,"maxBlockBodySize":65536,"maxTxSize":16384,"maxBlockHeaderSize":1100,"keyDeposit":0,"poolDeposit":0,"eMax":18,"nOpt":100,"a0":0,"rho":0.0038,"tau":0.000001,"minPoolCost":0,"decentralisationParam":0.7,"extraEntropy":{"tag":"NeutralNonce"},"protocolVersion":{"major":7,"minor":0},"minUTxOValue":1000000};
const afptShelley = {
  systemStart: systemStart$1,
  networkMagic: networkMagic$1,
  networkId: networkId$1,
  activeSlotsCoeff: activeSlotsCoeff$1,
  securityParam: securityParam$1,
  epochLength: epochLength$1,
  slotsPerKESPeriod: slotsPerKESPeriod$1,
  maxKESEvolutions: maxKESEvolutions$1,
  slotLength: slotLength$1,
  updateQuorum: updateQuorum$1,
  maxLovelaceSupply: maxLovelaceSupply$1,
  protocolParams: protocolParams$1,
};

const systemStart = "2024-05-13T17:40:00.000000000Z";
const networkMagic = 764824073;
const networkId = "Mainnet";
const activeSlotsCoeff = 0.05;
const securityParam = 2160;
const epochLength = 432000;
const slotsPerKESPeriod = 129600;
const maxKESEvolutions = 60;
const slotLength = 1;
const updateQuorum = 5;
const maxLovelaceSupply = 3000000000000000;
const protocolParams = {"minFeeA":47,"minFeeB":158298,"maxBlockBodySize":65536,"maxTxSize":16384,"maxBlockHeaderSize":1100,"keyDeposit":0,"poolDeposit":0,"eMax":18,"nOpt":100,"a0":0,"rho":0.00001,"tau":0.000001,"minPoolCost":0,"decentralisationParam":0.7,"extraEntropy":{"tag":"NeutralNonce"},"protocolVersion":{"major":2,"minor":0},"minUTxOValue":1000000};
const afpmShelley = {
  systemStart,
  networkMagic,
  networkId,
  activeSlotsCoeff,
  securityParam,
  epochLength,
  slotsPerKESPeriod,
  maxKESEvolutions,
  slotLength,
  updateQuorum,
  maxLovelaceSupply,
  protocolParams,
};

const blockVersionData$8 = {"heavyDelThd":"300000000000","maxBlockSize":"2000000","maxHeaderSize":"2000000","maxProposalSize":"700","maxTxSize":"4096","mpcThd":"20000000000000","scriptVersion":0,"slotDuration":"20000","softforkRule":{"initThd":"900000000000000","minThd":"600000000000000","thdDecrement":"50000000000000"},"txFeePolicy":{"multiplier":"43946000000","summand":"155381000000000"},"unlockStakeEpoch":"18446744073709551615","updateImplicit":"10000","updateProposalThd":"100000000000000","updateVoteThd":"1000000000000"};
const ftsSeed = "76617361206f7061736120736b6f766f726f64612047677572646120626f726f64612070726f766f6461";
const protocolConsts$8 = {"k":2160,"protocolMagic":764824073,"vssMaxTTL":6,"vssMinTTL":2};
const startTime$8 = 1506203091;
const mainnetByron = {
  blockVersionData: blockVersionData$8,
  ftsSeed,
  protocolConsts: protocolConsts$8,
  startTime: startTime$8,
};

const startTime$7 = 1639090522;
const blockVersionData$7 = {"scriptVersion":0,"slotDuration":"100","maxBlockSize":"641000","maxHeaderSize":"200000","maxTxSize":"4096","maxProposalSize":"700","mpcThd":"200000","heavyDelThd":"300000","updateVoteThd":"100000","updateProposalThd":"100000","updateImplicit":"10000","softforkRule":{"initThd":"900000","minThd":"600000","thdDecrement":"100000"},"txFeePolicy":{"summand":"0","multiplier":"439460"},"unlockStakeEpoch":"184467"};
const protocolConsts$7 = {"k":36,"protocolMagic":141};
const avvmDistr = {};
const guildByron = {
  startTime: startTime$7,
  blockVersionData: blockVersionData$7,
  protocolConsts: protocolConsts$7,
  avvmDistr,
};

const startTime$6 = 1686789000;
const blockVersionData$6 = {"avvmDistr":{},"heavyDelThd":"300000000000","maxBlockSize":"2000000","maxHeaderSize":"2000000","maxProposalSize":"700","maxTxSize":"4096","mpcThd":"20000000000000","scriptVersion":0,"slotDuration":"20000","softforkRule":{"initThd":"900000000000000","minThd":"600000000000000","thdDecrement":"50000000000000"},"txFeePolicy":{"multiplier":"43946000000","summand":"155381000000000"},"unlockStakeEpoch":"18446744073709551615","updateImplicit":"10000","updateProposalThd":"100000000000000","updateVoteThd":"1000000000000"};
const protocolConsts$6 = {"k":432,"protocolMagic":4};
const sanchoByron = {
  startTime: startTime$6,
  blockVersionData: blockVersionData$6,
  protocolConsts: protocolConsts$6,
};

const startTime$5 = 1654041600;
const blockVersionData$5 = {"scriptVersion":0,"slotDuration":"20000","maxBlockSize":"2000000","maxHeaderSize":"2000000","maxTxSize":"4096","maxProposalSize":"700","mpcThd":"20000000000000","heavyDelThd":"300000000000","updateVoteThd":"1000000000000","updateProposalThd":"100000000000000","updateImplicit":"10000","softforkRule":{"initThd":"900000000000000","minThd":"600000000000000","thdDecrement":"50000000000000"},"txFeePolicy":{"summand":"155381000000000","multiplier":"43946000000"},"unlockStakeEpoch":"18446744073709551615"};
const protocolConsts$5 = {"k":2160,"protocolMagic":1};
const preprodByron = {
  startTime: startTime$5,
  blockVersionData: blockVersionData$5,
  protocolConsts: protocolConsts$5,
};

const startTime$4 = 1666656000;
const blockVersionData$4 = {"scriptVersion":0,"slotDuration":"20000","maxBlockSize":"2000000","maxHeaderSize":"2000000","maxTxSize":"4096","maxProposalSize":"700","mpcThd":"20000000000000","heavyDelThd":"300000000000","updateVoteThd":"1000000000000","updateProposalThd":"100000000000000","updateImplicit":"10000","softforkRule":{"initThd":"900000000000000","minThd":"600000000000000","thdDecrement":"50000000000000"},"txFeePolicy":{"summand":"155381000000000","multiplier":"43946000000"},"unlockStakeEpoch":"18446744073709551615"};
const protocolConsts$4 = {"k":432,"protocolMagic":2};
const previewByron = {
  startTime: startTime$4,
  blockVersionData: blockVersionData$4,
  protocolConsts: protocolConsts$4,
};

const startTime$3 = 1752057484;
const blockVersionData$3 = {"scriptVersion":0,"slotDuration":"1000","maxBlockSize":"2000000","maxHeaderSize":"2000000","maxTxSize":"4096","maxProposalSize":"700","mpcThd":"20000000000000","heavyDelThd":"300000000000","updateVoteThd":"1000000000000","updateProposalThd":"100000000000000","updateImplicit":"10000","softforkRule":{"initThd":"900000000000000","minThd":"600000000000000","thdDecrement":"50000000000000"},"txFeePolicy":{"summand":"155381000000000","multiplier":"43946000000"},"unlockStakeEpoch":"18446744073709551615"};
const protocolConsts$3 = {"k":2160,"protocolMagic":764824073};
const afvtByron = {
  startTime: startTime$3,
  blockVersionData: blockVersionData$3,
  protocolConsts: protocolConsts$3,
};

const startTime$2 = 1756485600;
const blockVersionData$2 = {"scriptVersion":0,"slotDuration":"1000","maxBlockSize":"2000000","maxHeaderSize":"2000000","maxTxSize":"4096","maxProposalSize":"700","mpcThd":"20000000000000","heavyDelThd":"300000000000","updateVoteThd":"1000000000000","updateProposalThd":"100000000000000","updateImplicit":"10000","softforkRule":{"initThd":"900000000000000","minThd":"600000000000000","thdDecrement":"50000000000000"},"txFeePolicy":{"summand":"155381000000000","multiplier":"43946000000"},"unlockStakeEpoch":"18446744073709551615"};
const protocolConsts$2 = {"k":2160,"protocolMagic":764824073};
const afvmByron = {
  startTime: startTime$2,
  blockVersionData: blockVersionData$2,
  protocolConsts: protocolConsts$2,
};

const startTime$1 = 1715879890;
const blockVersionData$1 = {"scriptVersion":0,"slotDuration":"20000","maxBlockSize":"2000000","maxHeaderSize":"2000000","maxTxSize":"4096","maxProposalSize":"700","mpcThd":"20000000000000","heavyDelThd":"300000000000","updateVoteThd":"1000000000000","updateProposalThd":"100000000000000","updateImplicit":"10000","softforkRule":{"initThd":"900000000000000","minThd":"600000000000000","thdDecrement":"50000000000000"},"txFeePolicy":{"summand":"155381000000000","multiplier":"43946000000"},"unlockStakeEpoch":"18446744073709551615"};
const protocolConsts$1 = {"k":2160,"protocolMagic":3311};
const afptByron = {
  startTime: startTime$1,
  blockVersionData: blockVersionData$1,
  protocolConsts: protocolConsts$1,
};

const startTime = 1715622000;
const blockVersionData = {"scriptVersion":0,"slotDuration":"20000","maxBlockSize":"2000000","maxHeaderSize":"2000000","maxTxSize":"4096","maxProposalSize":"700","mpcThd":"20000000000000","heavyDelThd":"300000000000","updateVoteThd":"1000000000000","updateProposalThd":"100000000000000","updateImplicit":"10000","softforkRule":{"initThd":"900000000000000","minThd":"600000000000000","thdDecrement":"50000000000000"},"txFeePolicy":{"summand":"155381000000000","multiplier":"43946000000"},"unlockStakeEpoch":"18446744073709551615"};
const protocolConsts = {"k":2160,"protocolMagic":764824073};
const afpmByron = {
  startTime,
  blockVersionData,
  protocolConsts,
};

const GenesisStore = {
  mainnet: {
    shelley: mainnetShelley,
    byron: mainnetByron
  },
  guild: {
    shelley: guildShelley,
    byron: guildByron
  },
  sancho: {
    shelley: sanchoShelley,
    byron: sanchoByron
  },
  preprod: {
    shelley: preprodShelley,
    byron: preprodByron
  },
  preview: {
    shelley: previewShelley,
    byron: previewByron
  },
  afvt: {
    shelley: afvtShelley,
    byron: afvtByron
  },
  afvm: {
    shelley: afvmShelley,
    byron: afvmByron
  },
  afpt: {
    shelley: afptShelley,
    byron: afptByron
  },
  afpm: {
    shelley: afpmShelley,
    byron: afpmByron
  }
};

const dateIdCache = /* @__PURE__ */ new Map();
const formatterCache = /* @__PURE__ */ new Map();
const getByron = (networkId) => GenesisStore[networkId].byron;
const getShelley = (networkId) => GenesisStore[networkId].shelley;
const getNetworkMagic = (networkId) => GenesisStore[networkId].shelley.networkMagic;
const getEpochLength = (networkId) => GenesisStore[networkId].shelley.epochLength;
const getShelleyTransitionEpoch = (networkId) => {
  switch (networkId) {
    case "mainnet":
      return 208;
    case "preprod":
      return 4;
    case "preview":
      return 0;
    case "guild":
      return 2;
    case "sancho":
      return 0;
    case "afvt":
      return 2;
    case "afvm":
      return 2;
    case "afpt":
      return 0;
    case "afpm":
      return 2;
    default:
      return 0;
  }
};
const getCommonData = (networkId) => {
  const byron = getByron(networkId);
  const currentTimeSec = Math.floor(now() / 1e3);
  const shelleyTransEpoch = getShelleyTransitionEpoch(networkId);
  const byronEpochLength = byron.protocolConsts.k * 10;
  const byronSlots = shelleyTransEpoch * byronEpochLength;
  const byronSlotLength = byron.blockVersionData.slotDuration;
  const byronEndTime = byron.startTime + Math.floor(shelleyTransEpoch * byronEpochLength * parseInt(byronSlotLength) / 1e3);
  return {
    currentTimeSec,
    shelleyTransEpoch,
    byronEpochLength,
    byronSlots,
    byronSlotLength,
    byronEndTime
  };
};
const getCalculatedChainTip = (networkId) => {
  const byron = getByron(networkId);
  const shelley = getShelley(networkId);
  const common = getCommonData(networkId);
  if (common.currentTimeSec < common.byronEndTime) {
    return Math.floor(
      (common.currentTimeSec - byron.startTime) * 1e3
    ) / parseInt(byron.blockVersionData.slotDuration);
  }
  return common.byronSlots + Math.floor(
    (common.currentTimeSec - common.byronEndTime) / shelley.slotLength
  );
};
const getTimestampFromSlot = (networkId, slotNo) => {
  const byron = getByron(networkId);
  const shelley = getShelley(networkId);
  const common = getCommonData(networkId);
  if (slotNo < common.byronSlots) {
    return byron.startTime * 1e3 + slotNo * parseInt(byron.blockVersionData.slotDuration);
  }
  return (common.byronEndTime + (slotNo - common.byronSlots) * shelley.slotLength) * 1e3;
};
const getDateIdFromSlot = (networkId, slotNo, userSelectedTimezone) => {
  const timeStamp = getTimestampFromSlot(networkId, slotNo);
  return getDateIdFromTimestamp(timeStamp, userSelectedTimezone);
};
const getDateIdFromTimestamp = (timeStamp, userSelectedTimezone) => {
  const cacheKey = `${timeStamp}_${userSelectedTimezone}`;
  const cachedResult = dateIdCache.get(cacheKey);
  if (cachedResult) {
    return cachedResult;
  }
  let formatter = formatterCache.get(userSelectedTimezone);
  if (!formatter) {
    formatter = Intl.DateTimeFormat("de-DE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: userSelectedTimezone
    });
    formatterCache.set(userSelectedTimezone, formatter);
  }
  const date = new Date(timeStamp);
  const dateArray = formatter.formatToParts(date);
  const result = {
    year: parseInt(dateArray[4].value),
    month: parseInt(dateArray[2].value),
    day: parseInt(dateArray[0].value),
    timezone: userSelectedTimezone
  };
  dateIdCache.set(cacheKey, result);
  return result;
};
const getSlotFromDateId = (networkId, dateId, calcEnd = false) => {
  let year = dateId.year;
  let month = dateId.month - 1;
  let date;
  if (dateId.day === 0 && dateId.month === 0) {
    if (calcEnd) {
      date = new Date(new Date(year + 1, 0, 1, 0, 0, 0).getTime() - 1e3);
    } else {
      date = new Date(new Date(year, 0, 1, 0, 0, 0).getTime());
    }
  } else if (dateId.day === 0) {
    if (calcEnd) {
      date = new Date(new Date(year, month + 1, 1, 0, 0, 0).getTime() - 1e3);
    } else {
      date = new Date(new Date(year, month, 1, 0, 0, 0).getTime());
    }
  } else {
    if (calcEnd) {
      date = new Date(new Date(year, month, dateId.day, 0, 0, 0).getTime() + (86400 - 1) * 1e3);
    } else {
      date = new Date(new Date(year, month, dateId.day, 0, 0, 0).getTime());
    }
  }
  date = changeTimezone(date, dateId.timezone);
  return getCalculatedSlotFromBlockTime(networkId, date.getTime());
};
const getEpochFromSlot = (networkId, slotNo) => {
  const byron = getByron(networkId);
  const shelley = getShelley(networkId);
  const common = getCommonData(networkId);
  let timeSec = 0;
  if (slotNo < common.byronSlots) {
    timeSec = byron.startTime + slotNo * parseInt(byron.blockVersionData.slotDuration);
  } else {
    timeSec = common.byronEndTime + (slotNo - common.byronSlots) * shelley.slotLength;
  }
  if (timeSec < common.byronEndTime) {
    return Math.floor(
      (timeSec - byron.startTime) * 1e3 / parseInt(byron.blockVersionData.slotDuration) / common.byronEpochLength
    );
  }
  return common.shelleyTransEpoch + Math.floor(
    (timeSec - common.byronEndTime) / shelley.slotLength / shelley.epochLength
  );
};
const getCalculatedSlotFromBlockTime = (networkId, timestamp) => {
  const dateTimeSec = Math.floor(new Date(timestamp).getTime() / 1e3);
  const byron = getByron(networkId);
  const shelley = getShelley(networkId);
  const common = getCommonData(networkId);
  if (dateTimeSec < common.byronEndTime) {
    return Math.floor(
      (dateTimeSec - byron.startTime) * 1e3
    ) / parseInt(byron.blockVersionData.slotDuration);
  }
  return common.byronSlots + Math.floor(
    (dateTimeSec - common.byronEndTime) / shelley.slotLength
  );
};
const getCalculatedEpochSlot = (networkId) => {
  const shelley = getShelley(networkId);
  const common = getCommonData(networkId);
  const tip = getCalculatedChainTip(networkId) - common.byronSlots - (getCalculatedEpoch(networkId) - common.shelleyTransEpoch) * shelley.epochLength;
  return Math.floor(tip);
};
const getCalculatedEpoch = (id) => {
  const byron = getByron(id);
  const shelley = getShelley(id);
  const common = getCommonData(id);
  if (common.currentTimeSec < common.byronEndTime) {
    return Math.floor(
      (common.currentTimeSec - byron.startTime) * 1e3 / parseInt(byron.blockVersionData.slotDuration) / common.byronEpochLength
    );
  }
  return common.shelleyTransEpoch + Math.floor(
    (common.currentTimeSec - common.byronEndTime) / shelley.slotLength / shelley.epochLength
  );
};
const getLastSlotOfEpoch = (id, epochNo) => {
  const shelley = getShelley(id);
  const common = getCommonData(id);
  if (epochNo <= common.shelleyTransEpoch) {
    return common.byronEpochLength * epochNo;
  }
  return common.byronEpochLength * (common.shelleyTransEpoch - 1) + (epochNo - common.shelleyTransEpoch + 1) * shelley.epochLength;
};
const getEpochStart = (id, epochNo) => {
  const common = getCommonData(id);
  if (epochNo >= common.shelleyTransEpoch) {
    const shelley = getShelley(id);
    const shelleySlots = (epochNo - common.shelleyTransEpoch) * shelley.epochLength;
    const slotNumber = common.byronSlots + shelleySlots + 1;
    const timestamp = (common.byronEndTime + shelleySlots + 1) * 1e3;
    return { slotNumber, timestamp };
  } else {
    const byron = getByron(id);
    const slotNumber = epochNo * common.byronEpochLength;
    const timestamp = (byron.startTime + slotNumber * parseInt(common.byronSlotLength) / 1e3) * 1e3;
    return { slotNumber, timestamp };
  }
};
const updateChainTip = (id, chainTip, data) => {
  const shelley = getShelley(id);
  const calcTip = getCalculatedChainTip(id);
  chainTip.blockNo = data.blockNo;
  chainTip.slotNo = data.slotNo;
  chainTip.epochNo = data.epochNo;
  chainTip.epochSlot = data.epochSlot;
  chainTip.epochSlots = shelley.epochLength;
  chainTip.epochPercent = parseFloat((chainTip.epochSlot / chainTip.epochSlots * 100).toFixed(2));
  chainTip.syncProgress = Math.round(chainTip.slotNo / calcTip * 1e4) / 100;
  chainTip.onTip = calcTip - chainTip.slotNo < 300;
  return chainTip;
};

export { getCalculatedChainTip as a, getCalculatedSlotFromBlockTime as b, getDateIdFromSlot as c, getSlotFromDateId as d, getDateIdFromTimestamp as e, getEpochFromSlot as f, getTimestampFromSlot as g, getEpochStart as h, getEpochLength as i, getCalculatedEpochSlot as j, getNetworkMagic as k, getLastSlotOfEpoch as l, updateChainTip as u };
