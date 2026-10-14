import { ax as doInitApp, ay as getDRepCredentialsFromAddress, az as getDRepAddressFromKeyHash, aA as isHDAccount, aB as onTxHistoryAccountUpdated } from './app2.js';
import { f as getRequestData, A as ApiRequestType, E as ErrorSync, s as selectedWalletId, h as selectedAccountId, i as doSwitchSelectedWalletAccount } from './epochParams.js';
import { s as sleep, i as useAccountSettings, j as useAppAccountBalances, u as useWalletSettings, k as useAppAccount, n as useAppWallet } from './useAppAccountBalances.js';
import { e as ref, G as watch, cf as DREP_ALWAYS_ABSTAIN, cg as DREP_ALWAYS_NO_CONFIDENCE, D as computed, aE as addSignalListener, aC as dispatchSignal, ad as dispatchSignalSync, bI as DEFAULT_ACCOUNT_ID, P as networkId, aj as api } from './index.js';
import { c as compare, s as subtract, i as isZero, m as multiply, d as divide } from './bigmath.js';

const createIGovDRepListItemFromIGovDRepInfo = (dRepInfo) => {
  return {
    b: dRepInfo.bech32,
    au: null,
    v: dRepInfo.voteList.length,
    d: 0,
    as: dRepInfo.drepStake,
    la: null,
    fr: null,
    lr: null,
    a: dRepInfo.active,
    u: dRepInfo.anchor?.url ?? "",
    n: dRepInfo.anchor?.json?.given_name ?? null,
    i: dRepInfo.anchor?.json?.image_url ?? null,
    pa: dRepInfo.anchor?.json?.payment_address ?? null,
    o: dRepInfo.anchor?.json?.objectives ?? null,
    m: dRepInfo.anchor?.json?.motivations ?? null,
    q: dRepInfo.anchor?.json?.qualifications ?? null,
    rl: null
  };
};

const dRepAutoFilter = (item) => {
  return item.b === DREP_ALWAYS_ABSTAIN || item.b === DREP_ALWAYS_NO_CONFIDENCE;
};
const dRepSearchFilter = (item, searchValue) => {
  if (!searchValue) {
    return true;
  }
  let searchValueList = [];
  if (searchValue.includes(",")) {
    searchValueList = searchValue.split(",").map((s) => s.trim());
  } else {
    searchValueList = [searchValue];
  }
  for (const searchValue2 of searchValueList) {
    if (searchValue2.startsWith("drep1")) {
      if (item.b.includes(searchValue2)) {
        return true;
      }
    } else {
      const num = parseInt(searchValue2);
      if (!isNaN(num)) {
        return item.d >= num;
      }
      if (searchValue2.startsWith("active")) {
        return item.a;
      }
      if (searchValue2.startsWith("inactive")) {
        return !item.a;
      }
      const _item = JSON.stringify(item).toLowerCase();
      return _item.includes(searchValue2);
    }
  }
  return false;
};
const useDRepListFilter$1 = (dRepList, drepVoteList) => {
  const drepSortOptions = ref([
    { primaryLabel: "Default", value: "Default" },
    { primaryLabel: "Vote Power", value: "VotePower" },
    { primaryLabel: "Delegators", value: "Delegators" }
  ]);
  const activeDRepSortOrder = ref(null);
  const filterInput = ref("");
  const filteredDRepList = ref([]);
  const filteredDRepVoteList = ref([]);
  const updateFilteredDRepVoteList = () => {
    if (!drepVoteList?.value) {
      return;
    }
    const filteredDRepIdList = filteredDRepList.value.map((item) => item.b);
    filteredDRepVoteList.value.splice(
      0,
      filteredDRepVoteList.value.length,
      ...drepVoteList.value.filter((vote) => filteredDRepIdList.includes(vote.b))
    );
  };
  const resetFilteredDReps = () => {
    filterInput.value = "";
    filteredDRepList.value.splice(0, filteredDRepList.value.length, ...dRepList.value);
    updateFilteredDRepVoteList();
  };
  const updateFilteredDReps = () => {
    let searchValue = filterInput.value.toLowerCase();
    if (searchValue.length > 2) {
      const filteredList = dRepList.value.filter((item) => dRepSearchFilter(item, searchValue));
      filteredDRepList.value.splice(0, filteredDRepList.value.length, ...filteredList);
      updateFilteredDRepVoteList();
    } else {
      resetFilteredDReps();
    }
  };
  const sortDRepList = (a, b) => {
    if (dRepAutoFilter(a)) {
      return 1;
    }
    if (activeDRepSortOrder.value) {
      if (activeDRepSortOrder.value.value === "VotePower") {
        const votePowerA = a.as;
        const votePowerB = b.as;
        return compare(votePowerA, ">", votePowerB) ? -1 : 1;
      } else if (activeDRepSortOrder.value.value === "Delegators") {
        const delegatorsA = a.d;
        const delegatorsB = b.d;
        return compare(delegatorsA, ">", delegatorsB) ? -1 : 1;
      }
    }
    const activeA = a.a;
    const activeB = b.a;
    if (activeA && !activeB) {
      return -1;
    }
    if (!activeA && activeB) {
      return 1;
    }
    if (!activeA && !activeB) {
      const lastActiveA = a.la ?? 0;
      const lastActiveB = b.la ?? 0;
      return lastActiveB - lastActiveA;
    }
    const hasImageA = !!a.i;
    const hasImageB = !!b.i;
    if (hasImageA && !hasImageB) {
      return -1;
    }
    if (!hasImageA && hasImageB) {
      return 1;
    }
    const hasNameA = !!a.n;
    const hasNameB = !!b.n;
    if (hasNameA && !hasNameB) {
      return -1;
    }
    if (!hasNameA && hasNameB) {
      return 1;
    }
    const hasMotivationA = !!a.m || !!a.o || !!a.q;
    const hasMotivationB = !!b.m || !!b.o || !!b.q;
    if (hasMotivationA && !hasMotivationB) {
      return -1;
    }
    if (!hasMotivationA && hasMotivationB) {
      return 1;
    }
    return Math.random() < 0.5 ? -1 : 1;
  };
  const sortDRepListOnce = () => {
    dRepList.value.sort(sortDRepList);
    if (drepVoteList) {
      drepVoteList.value.sort((a, b) => {
        const _a = dRepList.value.find((item) => item.b === a.b);
        const _b = dRepList.value.find((item) => item.b === b.b);
        if (!_a || !_b) {
          return 0;
        }
        if (activeDRepSortOrder.value?.value === "VotePower") {
          return compare(_a.as, ">", _b.as) ? -1 : 1;
        }
        if (activeDRepSortOrder.value?.value === "Delegators") {
          return compare(_a.d, ">", _b.d) ? -1 : 1;
        }
        return 0;
      });
    }
    updateFilteredDReps();
  };
  watch(activeDRepSortOrder, () => {
    if (activeDRepSortOrder.value?.value === "Default") {
      activeDRepSortOrder.value = null;
      return;
    }
    sortDRepListOnce();
  });
  watch(filterInput, () => {
    sortDRepListOnce();
  });
  watch(dRepList, () => {
    sortDRepListOnce();
  });
  if (drepVoteList) {
    watch(drepVoteList, () => {
      sortDRepListOnce();
    });
  }
  return {
    dRepList,
    filterInput,
    filteredDRepList,
    filteredDRepVoteList,
    activeDRepSortOrder,
    drepSortOptions,
    dRepAutoFilter,
    updateFilteredDReps,
    resetFilteredDReps,
    sortDRepList,
    sortDRepListOnce
  };
};

const doLoadDRepList = "doLoadDRepList";
const onDRepListUpdated = "onDRepListUpdated";

const storeId = "dRepListStore";
const dRepList = ref([]);
const autoDRepList = ref([]);
const dRepInfoMap = ref(/* @__PURE__ */ new Map());
const useDRepListFilter = useDRepListFilter$1(dRepList);
const filteredDRepList = useDRepListFilter.filteredDRepList;
const totalVoteStake = ref("0");
const numDReps = computed(() => Math.max(dRepList.value.length - 2, 0));
const updateDRepList = async (govList) => {
  if (!govList) {
    return;
  }
  let _totalVoteStake = govList.totalStake;
  const drepAlwaysAbstain = govList.drepList.find((item) => item.b === DREP_ALWAYS_ABSTAIN);
  if (drepAlwaysAbstain) {
    _totalVoteStake = subtract(_totalVoteStake, drepAlwaysAbstain.as);
  }
  totalVoteStake.value = _totalVoteStake;
  dRepList.value.splice(0, dRepList.value.length, ...govList.drepList);
  useDRepListFilter.sortDRepListOnce();
  return true;
};
const getDRepInfo = (dRepId) => {
  if (!dRepId) {
    return null;
  }
  let dDepListItem = dRepList.value.find((d) => d.b === dRepId) ?? null;
  if (!dDepListItem) {
    const dRepInfo = dRepInfoMap.value.get(dRepId);
    if (dRepInfo) {
      dDepListItem = createIGovDRepListItemFromIGovDRepInfo(dRepInfo);
    }
  }
  return dDepListItem;
};
const updateFilteredDReps = (searchStr) => {
  useDRepListFilter.filterInput.value = searchStr;
  useDRepListFilter.updateFilteredDReps();
  autoDRepList.value.splice(
    0,
    autoDRepList.value.length,
    ...dRepList.value.filter(useDRepListFilter.dRepAutoFilter)
  );
  dispatchSignalSync(onDRepListUpdated);
};
const addDRepInfo = (drepInfo) => {
  if (!drepInfo) {
    return;
  }
  dRepInfoMap.value.set(drepInfo.bech32, drepInfo);
};
const load = async () => {
  await dispatchSignal(doLoadDRepList);
};
addSignalListener(doInitApp, storeId, load);

const getGovDRepInfo = (networkId, accountId, cred, isScript) => {
  if (!accountId) {
    accountId = DEFAULT_ACCOUNT_ID;
  }
  return getRequestData()(
    networkId,
    accountId,
    ApiRequestType.getGovDRepInfo,
    ErrorSync.getGovDRepInfo,
    {
      id: accountId,
      cred,
      isScript
    },
    async (data) => typeof data === "object" && data.bech32 ? data : null
  );
};
const getGovDRepList = (networkId, accountId) => {
  if (!accountId) {
    accountId = DEFAULT_ACCOUNT_ID;
  }
  return getRequestData()(
    networkId,
    accountId,
    ApiRequestType.getGovDRepList,
    ErrorSync.getGovDRepList,
    {
      id: accountId
    },
    async (data) => typeof data === "object" && !!data.drepList ? data : null
  );
};
const getGovProposalList = (networkId, accountId) => {
  if (!accountId) {
    accountId = DEFAULT_ACCOUNT_ID;
  }
  return getRequestData()(
    networkId,
    accountId,
    ApiRequestType.getGovProposalList,
    ErrorSync.getGovProposalList,
    {
      id: accountId
    },
    async (data) => typeof data === "object" && !!data.proposalList ? data : null
  );
};
const getGovProposalVotes = (networkId, accountId, proposalId) => {
  if (!accountId) {
    accountId = DEFAULT_ACCOUNT_ID;
  }
  return getRequestData()(
    networkId,
    accountId,
    ApiRequestType.getGovProposalVotes,
    ErrorSync.getGovProposalVotes,
    {
      id: accountId,
      proposalId
    },
    async (data) => typeof data === "object" && !!data.proposalVotes ? data : null
  );
};

const dRepVoteMap = {};
const _lastFetchedTs = {};
const _voteListCallMap = /* @__PURE__ */ new Map();
const ensureDRepVoteMap = (dRepId) => {
  if (!dRepVoteMap[dRepId]) {
    dRepVoteMap[dRepId] = [];
  }
};
const getDRepVoteList = async (dRepId) => {
  ensureDRepVoteMap(dRepId);
  let drepVoteList = dRepVoteMap[dRepId];
  if (drepVoteList.length === 0) {
    if (_voteListCallMap.has(dRepId)) {
      while (_voteListCallMap.has(dRepId)) {
        await sleep(10);
      }
    } else {
      _voteListCallMap.set(dRepId, true);
      drepVoteList = await fetchDRepVotes(dRepId);
      _voteListCallMap.delete(dRepId);
    }
    for (const vote of drepVoteList) {
      if (vote.b.startsWith("gov_action")) {
        vote.g = vote.b;
      }
    }
  }
  return drepVoteList;
};
const fetchDRepVotes = async (dRepId) => {
  ensureDRepVoteMap(dRepId);
  try {
    const {
      dRepCred,
      isScript
    } = getDRepCredentialsFromAddress(dRepId);
    const res = await getGovDRepInfo(networkId.value, null, dRepCred, isScript);
    addDRepInfo(res);
    if (res?.voteList) {
      const calls = [];
      for (const vote of res.voteList) {
        if (!vote.c && vote.u) {
          calls.push(fetchDRepVoteAnchor(vote));
        }
      }
      await Promise.allSettled(calls);
      dRepVoteMap[dRepId] = res.voteList;
    }
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    if (!msg.includes("data:noresult")) {
      console.warn("fetchDRepVotes:", e);
    }
  }
  return dRepVoteMap[dRepId];
};
const fetchDRepVoteAnchor = async (vote) => {
  if (!vote.u) {
    return;
  }
  vote.u = vote.u.replace("ipfs://", "https://ipfs.io/ipfs/");
  try {
    const lastFetchedTs = _lastFetchedTs[vote.u] ?? 0;
    if (lastFetchedTs > Date.now() - 1e3 * 60 * 60) {
      return;
    }
    _lastFetchedTs[vote.u] = Date.now();
    const url = `/${networkId.value}/v2/gov/vote/data`;
    const res = await api.post(url, {
      url: vote.u
    }).catch((err) => {
      console.error("Error fetching vote rationale:", err);
    });
    vote.c = res?.data;
  } catch (e) {
  }
};

const useDRepInfo = (dRepId) => {
  const dRepListItem = ref(null);
  const dRepIconError = ref(false);
  const dRepVoteList = ref([]);
  const hasDRepInfo = computed(() => !!dRepListItem.value);
  const hasDRepVotes = computed(() => dRepVoteList.value.length > 0);
  const isAutoDRep = computed(() => dRepId.value === DREP_ALWAYS_ABSTAIN || dRepId.value === DREP_ALWAYS_NO_CONFIDENCE);
  const updateDRepInfo = async () => {
    dRepListItem.value = null;
    dRepIconError.value = false;
    dRepVoteList.value = [];
    if (dRepId.value) {
      dRepListItem.value = getDRepInfo(dRepId.value);
      dRepVoteList.value = await getDRepVoteList(dRepId.value);
      if (!dRepListItem.value) {
        dRepListItem.value = getDRepInfo(dRepId.value);
      }
    }
  };
  const dRepRegistered = computed(() => {
    if (!dRepListItem.value) {
      return false;
    }
    return (dRepListItem.value.fr ?? 0) > 0;
  });
  const dRepActive = computed(() => {
    if (!dRepListItem.value) {
      return false;
    }
    return dRepRegistered.value && dRepListItem.value.a;
  });
  const dRepStatus = computed(() => {
    const _dRepId = dRepListItem.value?.b ?? "";
    if (_dRepId === DREP_ALWAYS_ABSTAIN) {
      return null;
    }
    if (_dRepId === DREP_ALWAYS_NO_CONFIDENCE) {
      return null;
    }
    if (!dRepListItem.value) {
      return "unregistered";
    }
    if (!dRepRegistered.value) {
      return "unregistered";
    }
    if (!dRepActive.value) {
      return "inactive";
    }
    return "active";
  });
  const dRepVotePower = computed(() => dRepListItem.value?.as ?? "0");
  const dRepNumDelegates = computed(() => dRepListItem.value?.d ?? 0);
  const dRepTotalStake = computed(() => totalVoteStake.value ?? "0");
  const dRepVotePowerShare = computed(() => {
    if (!dRepListItem.value) {
      return "0";
    }
    if (isZero(dRepTotalStake.value)) {
      return "0";
    }
    return multiply(divide(dRepVotePower.value, dRepTotalStake.value), 100);
  });
  const dRepName = computed(() => {
    const _dRepId = dRepListItem.value?.b ?? "";
    if (_dRepId === DREP_ALWAYS_ABSTAIN) {
      return "Always Abstain";
    }
    if (_dRepId === DREP_ALWAYS_NO_CONFIDENCE) {
      return "Always No Confidence";
    }
    let name = dRepListItem.value?.n ?? "";
    if (!name) {
      name = dRepId.value?.slice(0, 10) + "..." + dRepId.value?.slice(-6);
    }
    return name;
  });
  const dRepIcon = computed(() => {
    const icon = dRepListItem.value?.i ?? "";
    if (icon.startsWith("https://") || icon.startsWith("data:image")) {
      return icon;
    }
    if (icon.startsWith("ipfs://")) {
      return icon.replace("ipfs://", "https://ipfs.io/ipfs/");
    }
    if (icon.startsWith("http://")) {
      return icon.replace("http://", "https://");
    }
    if (icon.length > 0) {
      return "data:image/svg+xml;base64," + icon;
    }
    return "";
  });
  const dRepPaymentAddress = computed(() => dRepListItem.value?.pa);
  const dRepObjectives = computed(() => dRepListItem.value?.o);
  const dRepQualifications = computed(() => dRepListItem.value?.q);
  const dRepMotivations = computed(() => dRepListItem.value?.m);
  const dRepSocialLinks = computed(() => dRepListItem.value?.rl ?? void 0);
  const setLinkType = (link, hostname) => {
    try {
      const url = new URL(link.u);
      const hostname2 = url.hostname.toLowerCase();
      if (hostname2.includes("twitter.com") || hostname2.includes("x.com")) {
        link.t = "x";
      } else if (hostname2.includes("discord.com") || hostname2.includes("discord.gg")) {
        link.t = "discord";
      } else if (hostname2.includes("github.com")) {
        link.t = "github";
      } else if (hostname2.includes("t.me")) {
        link.t = "telegram";
      } else if (hostname2.includes("youtube.com")) {
        link.t = "youtube";
      } else if (hostname2.includes("linkedin.com")) {
        link.t = "linkedin";
      } else if (hostname2.includes("cardano.org")) {
        link.t = "cardanoForum";
      } else if (hostname2.includes("linktr.ee")) {
        link.t = "linktree";
      } else if (hostname2.includes("eternl.io")) {
        link.t = "eternl";
      } else {
        link.t = "other";
      }
      return true;
    } catch (err) {
      if (/(.+)@(.+){2,}\.(.+){2,}/.test(link.u)) {
        link.t = "email";
      } else {
        console.warn("Error parsing social link:", err, link);
      }
    }
  };
  watch(dRepSocialLinks, (list) => {
    if (!list) {
      return null;
    }
    for (const link of list) {
      if (link.t) {
        break;
      }
      if (!setLinkType(link, link.u)) {
        if (/(.+)@(.+){2,}\.(.+){2,}/.test(link.u)) {
          link.t = "email";
        } else {
          if (!link.u.startsWith("http")) {
            link.u = "https://" + link.u;
            setLinkType(link, link.u);
          } else {
            console.warn("Error parsing social link:", link);
          }
        }
      }
    }
  }, { immediate: true });
  const twitter = computed(() => dRepSocialLinks.value?.find((link) => link.t === "x")?.u);
  const discord = computed(() => dRepSocialLinks.value?.find((link) => link.t === "discord")?.u);
  const telegram = computed(() => dRepSocialLinks.value?.find((link) => link.t === "telegram")?.u);
  const youtube = computed(() => dRepSocialLinks.value?.find((link) => link.t === "youtube")?.u);
  const github = computed(() => dRepSocialLinks.value?.find((link) => link.t === "github")?.u);
  const linkedin = computed(() => dRepSocialLinks.value?.find((link) => link.t === "linkedin")?.u);
  const linktree = computed(() => dRepSocialLinks.value?.find((link) => link.t === "linktree")?.u);
  const cardanoForum = computed(() => dRepSocialLinks.value?.find((link) => link.t === "cardanoForum")?.u);
  const email = computed(() => dRepSocialLinks.value?.find((link) => link.t === "email")?.u);
  const website = computed(() => dRepSocialLinks.value?.find((link) => link.t === "other" || link.t === "eternl")?.u);
  watch(dRepId, () => updateDRepInfo(), { immediate: true });
  return {
    dRepId,
    hasDRepInfo,
    hasDRepVotes,
    isAutoDRep,
    dRepName,
    dRepIcon,
    dRepIconError,
    dRepStatus,
    dRepRegistered,
    dRepActive,
    dRepNumDelegates,
    dRepVotePower,
    dRepTotalStake,
    dRepVotePowerShare,
    dRepPaymentAddress,
    dRepObjectives,
    dRepQualifications,
    dRepMotivations,
    dRepSocialLinks,
    dRepVoteList,
    twitter,
    discord,
    telegram,
    youtube,
    github,
    linkedin,
    linktree,
    cardanoForum,
    email,
    website
  };
};

const useAccountGovInfo = (accountSettings) => {
  const accountData = accountSettings.data;
  const rewardInfo = accountSettings.rewardInfo;
  const govDelegation = computed(() => {
    const govDelegationList = rewardInfo.value?.govDelegationList;
    if (!govDelegationList) {
      return null;
    }
    if (govDelegationList.length === 0) {
      return null;
    }
    return govDelegationList[0];
  });
  const isGovDelegated = computed(() => {
    return !!govDelegation.value;
  });
  const delegatedDRepId = computed(() => {
    if (!govDelegation.value) {
      return null;
    }
    if (govDelegation.value.drep === DREP_ALWAYS_ABSTAIN || govDelegation.value.drep === DREP_ALWAYS_NO_CONFIDENCE) {
      return govDelegation.value.drep;
    }
    return getDRepAddressFromKeyHash(govDelegation.value.drep, govDelegation.value.isScript);
  });
  const accountDRepCred = computed(() => {
    if (!accountData.value?.keys.drep || accountData.value.keys.drep.length === 0) {
      return null;
    }
    return accountData.value.keys.drep[0].cred;
  });
  const accountDRepId = computed(() => {
    if (!accountDRepCred.value) {
      return null;
    }
    return getDRepAddressFromKeyHash(accountDRepCred.value, accountData.value.account.signType === "multisig");
  });
  const isGovDelegatedToSelf = computed(() => {
    if (!accountDRepId.value || !delegatedDRepId.value) {
      return false;
    }
    return accountDRepId.value === delegatedDRepId.value;
  });
  const isGovDelegatedToAbstain = computed(() => {
    if (!delegatedDRepId.value) {
      return false;
    }
    return delegatedDRepId.value === DREP_ALWAYS_ABSTAIN;
  });
  const isGovDelegatedToNoConfidence = computed(() => {
    if (!delegatedDRepId.value) {
      return false;
    }
    return delegatedDRepId.value === DREP_ALWAYS_NO_CONFIDENCE;
  });
  const delegatedDRepInfo = useDRepInfo(delegatedDRepId);
  const accountDRepInfo = useDRepInfo(accountDRepId);
  return {
    govDelegation,
    isGovDelegated,
    isGovDelegatedToSelf,
    isGovDelegatedToAbstain,
    isGovDelegatedToNoConfidence,
    delegatedDRepId,
    delegatedDRepInfo,
    accountDRepCred,
    accountDRepId,
    accountDRepInfo
  };
};

const appWallet = useAppWallet(selectedWalletId);
const walletSettings = useWalletSettings(appWallet);
const walletData = walletSettings.data;
const appAccount = useAppAccount(appWallet, selectedAccountId);
const appAccountBalances = useAppAccountBalances(appAccount);
const accountSettings = useAccountSettings(appAccount);
const accountGovernance = useAccountGovInfo(accountSettings);
const accountData = accountSettings.data;
const accountBalance = computed(() => accountData.value?.balance);
const utxoMap = accountSettings.utxoMap;
const accountList = computed(() => {
  if (!walletData.value) {
    return [];
  }
  return walletData.value.wallet.accountList.filter((account) => isHDAccount(account.path)).sort((a, b) => a.path[2] - b.path[2]);
});
const hasAccount = computed(() => accountList.value.length > 0);
const hasSelectedAccount = computed(() => !!appWallet.value);
const hasSelectedWallet = computed(() => !!appAccount.value);
const isSelectedWallet = (walletId) => !!walletId && walletId === selectedWalletId.value;
const switchWalletAccount = (walletId, accountId) => {
  dispatchSignalSync(doSwitchSelectedWalletAccount, walletId, accountId);
};
function useSelectedAccount() {
  watch(appAccount, () => {
    dispatchSignalSync(onTxHistoryAccountUpdated, appAccount.value);
  });
  return {
    hasSelectedAccount,
    hasSelectedWallet,
    selectedAccountId,
    selectedWalletId,
    appWallet,
    appAccount,
    walletData,
    walletSettings,
    accountData,
    accountList,
    hasAccount,
    accountSettings,
    accountGovernance,
    accountBalance,
    accountBalances: appAccountBalances,
    utxoMap,
    switchWalletAccount,
    isSelectedWallet
  };
}

export { updateFilteredDReps as a, autoDRepList as b, useDRepInfo as c, dRepList as d, useDRepListFilter$1 as e, filteredDRepList as f, getDRepVoteList as g, getGovProposalVotes as h, useDRepListFilter as i, getGovDRepList as j, doLoadDRepList as k, updateDRepList as l, getGovProposalList as m, numDReps as n, totalVoteStake as t, useSelectedAccount as u };
