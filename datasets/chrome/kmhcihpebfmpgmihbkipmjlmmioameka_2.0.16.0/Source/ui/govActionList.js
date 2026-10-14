import { D as computed, e as ref, ad as dispatchSignalSync, G as watch, aE as addSignalListener, aC as dispatchSignal } from './index.js';
import { ax as doInitApp } from './app2.js';

const doLoadGovActionList = "doLoadGovActionList";
const onGovActionListUpdated = "onGovActionListUpdated";

const storeId = "govActionListStore";
const govActionList = ref([]);
const constitutionalCommitteeList = ref([]);
const filteredGovActionList = ref([]);
ref({});
const numGovActions = computed(() => govActionList.value.length);
const numActive = computed(() => {
  const list = govActionList.value;
  if (list.length === 0) {
    return 0;
  }
  let count = 0;
  for (const item of list) {
    if (!item.xe && !item.de && !item.re) {
      count++;
    }
  }
  return count;
});
const numEnacted = computed(() => {
  const list = govActionList.value;
  if (list.length === 0) {
    return 0;
  }
  let count = 0;
  for (const item of list) {
    if (item.ee) {
      count++;
    }
  }
  return count;
});
const typeTriggers = [
  "parameterchange",
  "parameter change",
  "hardforkinitiation",
  "hardfork initiation",
  "hard fork initiation",
  "treasurywithdrawals",
  "treasury withdrawals",
  "noconfidence",
  "no confidence",
  "newcommittee",
  "new committee",
  "newconstitution",
  "newc onstitution",
  "infoaction",
  "info action"
];
const activeProposalTypeFilters = ref([]);
const activeProposalStatusFilters = ref([]);
const proposalTypeFilters = ref([
  { primaryLabel: "Parameter Change", value: "ParameterChange" },
  { primaryLabel: "HardFork Initiation", value: "HardForkInitiation" },
  { primaryLabel: "TreasuryWithdrawals", value: "TreasuryWithdrawals" },
  { primaryLabel: "NoConfidence", value: "NoConfidence" },
  { primaryLabel: "NewCommittee", value: "NewCommittee" },
  { primaryLabel: "NewConstitution", value: "NewConstitution" },
  { primaryLabel: "InfoAction", value: "InfoAction" }
]);
const proposalStatusFilters = ref([
  { primaryLabel: "ratified", value: "ratified" },
  { primaryLabel: "enacted", value: "enacted" },
  { primaryLabel: "dropped", value: "dropped" },
  { primaryLabel: "expired", value: "expired" }
]);
let _searchValue = "";
const sortGovActionList = (a, b) => {
  const slotA = a.s ?? 0;
  const slotB = b.s ?? 0;
  return slotB - slotA;
};
const sortGovCCList = (a, b) => {
  const epochA = a.e ?? 0;
  const epochB = b.e ?? 0;
  return epochB - epochA;
};
const updateGovActionList = async (list) => {
  if (!list) {
    return;
  }
  govActionList.value.splice(0, govActionList.value.length, ...list.proposalList);
  constitutionalCommitteeList.value.splice(0, govActionList.value.length, ...list.ccList);
  sortGovActionListOnce();
  return true;
};
const sortGovActionListOnce = () => {
  constitutionalCommitteeList.value.sort(sortGovCCList);
  govActionList.value.sort(sortGovActionList);
  updateFilteredGovActions(_searchValue);
};
const getGovAction = (id) => {
  if (!id) {
    return null;
  }
  return govActionList.value.find((d) => d.b === id) ?? null;
};
const govActionStatusFilter = (item) => {
  if (activeProposalStatusFilters.value.length === 0) {
    return true;
  }
  for (const statusFilter of activeProposalStatusFilters.value) {
    if (statusFilter.value === "enacted" && item?.ee) {
      return true;
    }
    if (statusFilter.value === "dropped" && item?.de) {
      return true;
    }
    if (statusFilter.value === "expired" && item?.xe) {
      return true;
    }
    if (statusFilter.value === "ratified" && item?.re) {
      return true;
    }
  }
  return false;
};
const govActionTypeFilter = (item) => {
  if (activeProposalTypeFilters.value.length === 0) {
    return true;
  }
  const type = item.t.toLowerCase();
  for (const typeFilter of activeProposalTypeFilters.value) {
    if (type === typeFilter.value.toLowerCase()) {
      return true;
    }
  }
  return false;
};
const govActionSearchFilter = (item) => {
  if (!govActionStatusFilter(item)) {
    return false;
  }
  if (!govActionTypeFilter(item)) {
    return false;
  }
  if (_searchValue.length > 2) {
    if (_searchValue.startsWith("gov")) {
      if (item.b.startsWith(_searchValue)) {
        return true;
      }
    }
    let isTypeTrigger = false;
    for (const trigger of typeTriggers) {
      if (trigger.startsWith(_searchValue)) {
        isTypeTrigger = true;
        break;
      }
    }
    if (isTypeTrigger) {
      const type = item.t.toLowerCase();
      if (type.startsWith(_searchValue)) {
        return true;
      }
    }
    const _item = JSON.stringify(item).toLowerCase();
    return _item.includes(_searchValue);
  }
  return true;
};
const updateFilteredGovActions = (searchStr) => {
  _searchValue = searchStr.toLowerCase();
  const filteredList = govActionList.value.filter(govActionSearchFilter);
  filteredGovActionList.value.splice(0, filteredGovActionList.value.length, ...filteredList);
  dispatchSignalSync(onGovActionListUpdated);
};
watch([activeProposalTypeFilters, activeProposalStatusFilters], () => {
  updateFilteredGovActions(_searchValue);
});
const load = async () => {
  await dispatchSignal(doLoadGovActionList);
};
addSignalListener(doInitApp, storeId, load);

export { activeProposalTypeFilters as a, proposalStatusFilters as b, activeProposalStatusFilters as c, numActive as d, numEnacted as e, filteredGovActionList as f, govActionList as g, constitutionalCommitteeList as h, getGovAction as i, doLoadGovActionList as j, updateGovActionList as k, numGovActions as n, proposalTypeFilters as p, updateFilteredGovActions as u };
