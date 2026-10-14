import { cY as walletGroupNameList, cZ as onWalletListUpdated, c_ as walletGroupMap, c1 as getIAppWallet, aA as isHDAccount, a as fixedDappWalletId, b as fixedDappAccountId, u as useDappAccount, b0 as getWalletNameList, e as getIAppAccountById, bU as getAccountName, a5 as ITxBalanceType } from './app2.js';
import { m as createElementBlock, o as openBlock, p as createBaseVNode, bp as Dexie, D as computed, e as ref, P as networkId, Z as useLocalStorage, aX as json, G as watch, f as onMounted, aE as addSignalListener, k as onUnmounted, aF as removeSignalListener, d as defineComponent, t as createCommentVNode, F as Fragment, H as createTextVNode, B as toDisplayString, u as unref, w as useTranslation, aP as markRaw, c as createBlock, z as resolveComponent, U as withModifiers, V as normalizeClass, y as withCtx, n as createVNode, a1 as withDirectives, d6 as vShow, a2 as resolveDirective, bI as DEFAULT_ACCOUNT_ID, Q as reactive, S as renderList } from './index.js';
import { n as networkIdList } from './NetworkId.js';
import { u as useSelectedAccount, h as selectedAccountId, f as getRequestData, A as ApiRequestType, E as ErrorSync } from './epochParams.js';
import { u as useModalSelectAccount, I as IconPlusSign } from './IconPlusSign.js';
import { a as useWalletAccount } from './TransactionAssetList.vue_vue_type_script_setup_true_lang.js';
import { u as useModalReceiveAddress } from './useModalReceiveAddress.js';
import { I as IconDApp, f as IconPin, c as _sfc_main$a, d as _sfc_main$b, M as MultiSigGradient, b as IconLockEnabled, e as IconComputerProgramming01, _ as _sfc_main$c } from './SyncInfo.vue_vue_type_script_setup_true_lang.js';
import { I as IconChevronDown } from './IconChevronDown.js';
import { I as IconChevronUp } from './IconChevronUp.js';
import { I as IconArrowLB } from './IconArrowLB.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper.js';
import { a as IconEyeVisible } from './IconCopy01.js';
import { u as useBalanceVisible } from './useBalanceVisible.js';
import { I as IconPencil } from './IconPencil.js';
import { _ as _sfc_main$9 } from './ContextMenu.vue_vue_type_script_setup_true_lang.js';
import { _ as _sfc_main$d } from './FormattedAmount.vue_vue_type_script_setup_true_lang.js';
import { d as getSlotFromDateId, h as getEpochStart, g as getTimestampFromSlot } from './chain.js';
import { b as appTimezone } from './language.js';
import { s as sleep } from './useAppAccountBalances.js';
import { u as useFormatter } from './useFormatter.js';
import { H as HistoryDB } from './history.js';
import { _ as _sfc_main$e } from './Badge.vue_vue_type_script_setup_true_lang.js';

const _sfc_main$8 = {  };

const _hoisted_1$7 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
};

function _sfc_render$1(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$7, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M22 8s-4 6-10 6S2 8 2 8m13 5.5l1.5 2.5m3.5-5l2 2M2 13l2-2m5 2.5L7.5 16",
      color: "currentColor"
    }, null, -1)
  ]))]))
}
const IconEyeHidden = /*#__PURE__*/_export_sfc(_sfc_main$8, [['render',_sfc_render$1]]);

const _sfc_main$7 = {  };

const _hoisted_1$6 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
};

function _sfc_render(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$6, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      color: "currentColor"
    }, [
      createBaseVNode("path", { d: "M15.5 12a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0" }),
      createBaseVNode("path", { d: "M21.011 14.097c.522-.141.783-.212.886-.346c.103-.135.103-.351.103-.784v-1.934c0-.433 0-.65-.103-.784s-.364-.205-.886-.345c-1.95-.526-3.171-2.565-2.668-4.503c.139-.533.208-.8.142-.956s-.256-.264-.635-.479l-1.725-.98c-.372-.21-.558-.316-.725-.294s-.356.21-.733.587c-1.459 1.455-3.873 1.455-5.333 0c-.377-.376-.565-.564-.732-.587c-.167-.022-.353.083-.725.295l-1.725.979c-.38.215-.57.323-.635.48c-.066.155.003.422.141.955c.503 1.938-.718 3.977-2.669 4.503c-.522.14-.783.21-.886.345S2 10.6 2 11.033v1.934c0 .433 0 .65.103.784s.364.205.886.346c1.95.526 3.171 2.565 2.668 4.502c-.139.533-.208.8-.142.956s.256.264.635.48l1.725.978c.372.212.558.317.725.295s.356-.21.733-.587c1.46-1.457 3.876-1.457 5.336 0c.377.376.565.564.732.587c.167.022.353-.083.726-.295l1.724-.979c.38-.215.57-.323.635-.48s-.003-.422-.141-.955c-.504-1.937.716-3.976 2.666-4.502" })
    ], -1)
  ]))]))
}
const IconSettings = /*#__PURE__*/_export_sfc(_sfc_main$7, [['render',_sfc_render]]);

class EntityListDB extends Dexie {
  list;
  constructor(networkId) {
    super("eternl-" + networkId + "-entitylist");
    this.version(1).stores({
      list: "name"
      // EntityId
    });
  }
}
const dbMap = networkIdList.reduce((o, n) => {
  o[n] = null;
  return o;
}, {});
const getDB = async (networkId) => {
  let db = dbMap[networkId];
  if (!db) {
    db = new EntityListDB(networkId);
    dbMap[networkId] = db;
  }
  if (!db.isOpen()) {
    await db.open();
  }
  return db;
};
const create = (entity) => {
  return getDB(entity.networkId).then((db) => db.list.add(entity).then(() => true)).catch((error) => {
    console.error(error);
    return false;
  });
};
const remove = (networkId, id) => {
  return getDB(networkId).then((db) => db.list.delete(id).then(() => true)).catch((error) => {
    console.error(error);
    return false;
  });
};
const update = (entity) => {
  return getDB(entity.networkId).then((db) => db.list.put(entity).then(() => true)).catch((error) => {
    console.error(error);
    return false;
  });
};
const updateAll = (networkId, entityList) => {
  return getDB(networkId).then((db) => db.list.bulkPut(entityList).then(() => true)).catch((error) => {
    console.error(error);
    return false;
  });
};
const get = (networkId, id) => {
  return getDB(networkId).then((db) => db.list.get(id)).catch((error) => {
    console.error(error);
    return void 0;
  });
};
const getAll = (networkId) => {
  return getDB(networkId).then((db) => db.list.toArray()).catch((error) => {
    console.error(error);
    return [];
  });
};
const EntityListDB$1 = {
  create,
  remove,
  update,
  updateAll,
  get,
  getAll
};

const _selectedEntityId = useLocalStorage("selected-entity-id-" + networkId.value, "");
const _entityList = ref([]);
const _selectedEntity = ref(null);
const selectedEntity = computed(() => _selectedEntity.value);
const fullEntityList = computed(() => _entityList.value);
const entityList = computed(() => {
  if (selectedEntity.value) {
    return [selectedEntity.value];
  }
  return _entityList.value;
});
const selectEntity = (entityId) => {
  _selectedEntity.value = fullEntityList.value.find((entry) => entry.name === entityId) ?? null;
  if (_selectedEntity.value) {
    _selectedEntityId.value = entityId;
  } else {
    _selectedEntityId.value = "";
  }
};
const loadEntityList = async () => {
  let changed = false;
  const newList = await EntityListDB$1.getAll(networkId.value);
  for (let i = fullEntityList.value.length - 1; i >= 0; i--) {
    const entry = fullEntityList.value[i];
    if (!newList.some((e) => e.name === entry.name)) {
      changed = true;
      _entityList.value.splice(i, 1);
    }
  }
  for (const entry of newList) {
    const existingEntry = _entityList.value.find((e) => e.name === entry.name);
    if (!existingEntry) {
      _entityList.value.push(entry);
    } else {
      existingEntry.comment = entry.comment;
      existingEntry.has1YearTaxFree = entry.has1YearTaxFree;
      existingEntry.hasPassiveAccount = entry.hasPassiveAccount;
      existingEntry.accountIdList.splice(0, existingEntry.accountIdList.length, ...entry.accountIdList);
    }
  }
  if (_selectedEntityId.value && !_selectedEntity.value) {
    selectEntity(_selectedEntityId.value);
  }
  return changed;
};
const getEntityByName = (id) => {
  return _entityList.value.find((entry) => entry.name === id) ?? null;
};
const hasEntityName = (name) => {
  return _entityList.value.some((entry) => entry.name === name);
};
const getEntityByAccountId = (accountId) => {
  return _entityList.value.find((entry) => entry.accountIdList.includes(accountId)) ?? null;
};
const addEntity = async (entity) => {
  const success = await EntityListDB$1.create(json(entity));
  if (success) {
    await loadEntityList();
  }
  return success;
};
const updateEntity = async (entity) => {
  const success = await EntityListDB$1.update(json(entity));
  if (success) {
    await loadEntityList();
  }
  return success;
};
const updateAllEntities = async (entityList2) => {
  const success = await EntityListDB$1.updateAll(networkId.value, json(entityList2));
  if (success) {
    await loadEntityList();
  }
  return success;
};
const deleteEntity = async (name) => {
  const success = await EntityListDB$1.remove(networkId.value, name);
  if (success) {
    await loadEntityList();
  }
  return success;
};

const walletListState = useLocalStorage("wls_" + networkId.value, {});
const selectedTabs = ref([]);
const walletTabs = computed(() => {
  let walletTabs2 = [];
  if (!walletGroupNameList.value) {
    return walletTabs2;
  }
  for (const groupName of walletGroupNameList.value) {
    walletTabs2.push({
      primaryLabel: groupName,
      value: groupName
    });
  }
  return walletTabs2;
});
const initUISelectedIds = () => {
  const walletTabList = walletTabs.value;
  const _selectedTabs = [];
  for (const tab of walletTabList) {
    const isActive = useLocalStorage("wgo_" + networkId.value + "_" + tab.value, true);
    if (isActive.value) {
      _selectedTabs.push(tab);
    }
  }
  selectedTabs.value = _selectedTabs;
};
const updateUISelectedIds = () => {
  initUISelectedIds();
};
const toggleGroupSelected = (groupName) => {
  const index = selectedTabs.value.findIndex((tab) => tab.value === groupName);
  if (index > -1) {
    selectedTabs.value.splice(index, 1);
  } else {
    selectedTabs.value.push({
      primaryLabel: groupName,
      value: groupName
    });
  }
  onUpdateUISelectedIds();
};
const onUpdateUISelectedIds = () => {
  const walletTabList = walletTabs.value;
  for (const tab of walletTabList) {
    if (selectedTabs.value.find((selectedTab) => selectedTab.value === tab.value)) {
      useLocalStorage("wgo_" + networkId.value + "_" + tab.value, true).value = true;
    } else {
      useLocalStorage("wgo_" + networkId.value + "_" + tab.value, true).value = false;
    }
  }
};
const sortSelectedGroups = () => {
  selectedTabs.value.sort((a, b) => {
    const av = a.value;
    const bv = b.value;
    if (av === "favorites") {
      return -1;
    }
    if (bv === "favorites") {
      return 1;
    }
    return a.value.localeCompare(b.value, "en-US");
  });
};
const useSelectWalletGroup = () => {
  return {
    selectedTabs,
    walletTabs,
    walletListState,
    sortSelectedGroups,
    initUISelectedIds,
    updateUISelectedIds,
    onUpdateUISelectedIds,
    toggleGroupSelected
  };
};

const useWalletList = (isManageMode, isSelectMode, isLocalMode, showSelectedOnly) => {
  const entity = ref(null);
  const _showSelectedOnly = computed(() => {
    if (!showSelectedOnly) {
      return false;
    }
    if (!entity.value) {
      return false;
    }
    return showSelectedOnly.value && entity.value.accountIdList.length > 0;
  });
  const {
    selectedTabs,
    walletTabs,
    walletListState,
    updateUISelectedIds
  } = useSelectWalletGroup();
  const {
    selectedWalletId,
    selectedAccountId,
    switchWalletAccount
  } = useSelectedAccount();
  const _walletListState = !isLocalMode.value ? walletListState.value : {};
  const groupList = ref([]);
  const doUpdateWalletList = () => {
    const walletGroupList = isManageMode.value || isSelectMode.value ? walletTabs.value : selectedTabs.value;
    const renderGroupButtons = walletGroupList.length > 1;
    for (let i = groupList.value.length - 1; i >= 0; i--) {
      const group = groupList.value[i];
      if (!walletGroupList.some((g) => g.value === group.key)) {
        groupList.value.splice(i, 1);
      }
    }
    let groupIndex = 0;
    for (const option of walletGroupList) {
      const groupKey = option.value;
      const walletIdList = walletGroupMap.value[groupKey];
      let group = groupList.value.find((g) => g.key === groupKey);
      if (!group) {
        group = {
          index: groupIndex++,
          hideGroup: !renderGroupButtons,
          key: groupKey,
          group: option,
          items: []
        };
        groupList.value.push(group);
      }
      let groupState = _walletListState[groupKey];
      if (!groupState) {
        groupState = {
          isVisible: true,
          isExpanded: true
        };
        _walletListState[groupKey] = groupState;
      }
      group.isVisible = groupState.isVisible;
      group.isExpanded = groupState.isExpanded;
      group.isActive = false;
      for (let i = group.items.length - 1; i >= 0; i--) {
        const item = group.items[i];
        if (!walletIdList?.some((w) => w === item.walletId)) {
          group.items.splice(i, 1);
        }
      }
      let walletIndex = 0;
      let atLeastOneWalletSelected = false;
      let notAllWalletsSelected = false;
      let atLeastOneWalletSelectedGlobal = false;
      let notAllWalletsSelectedGlobal = false;
      for (const walletId of walletIdList) {
        const walletKey = `${groupKey}_${walletId}`;
        let walletState = _walletListState[walletKey];
        if (!walletState) {
          walletState = {
            isVisible: true,
            isExpanded: isLocalMode.value
          };
          _walletListState[walletId] = walletState;
        }
        let walletItem = group.items.find((w) => w.walletId === walletId);
        if (!walletItem) {
          walletItem = {
            index: walletIndex++,
            key: walletKey,
            walletId,
            items: []
          };
          group.items.push(walletItem);
        }
        const appWallet = getIAppWallet(walletId);
        walletItem.isVisible = !!appWallet && walletState.isVisible;
        walletItem.isExpanded = walletState.isExpanded;
        walletItem.isActive = false;
        if (walletId === selectedWalletId.value) {
          group.isActive = true;
          walletItem.isActive = true;
        }
        for (let i = walletItem.items.length - 1; i >= 0; i--) {
          const accountId = walletItem.items[i].accountId;
          if (!walletIdList?.some((w) => w === accountId)) {
            walletItem.items.splice(i, 1);
          }
        }
        const accountList = appWallet?.data.wallet.accountList.filter((acct) => isHDAccount(acct.path)) ?? [];
        walletItem.singleAccount = accountList.length === 1 ? accountList[0].id : void 0;
        let accountIndex = 0;
        let atLeastOneAccountSelected = false;
        let notAllAccountsSelected = false;
        let atLeastOneAccountSelectedGlobal = false;
        let notAllAccountsSelectedGlobal = false;
        for (const account of accountList) {
          const isSelectedGlobal = entityList.value.some((e) => e.accountIdList.includes(account.id));
          const accountKey = `${groupKey}_${walletId}_${account.id}`;
          let accountItem = walletItem.items.find((a) => a.accountId === account.id);
          if (!accountItem) {
            accountItem = {
              index: accountIndex++,
              key: accountKey,
              walletId,
              accountId: account.id
            };
            walletItem.items.push(accountItem);
          }
          if (isLocalMode.value && !isSelectedGlobal || _showSelectedOnly.value && !entity.value?.accountIdList.includes(account.id)) {
            for (let i = walletItem.items.length - 1; i >= 0; i--) {
              const item = walletItem.items[i];
              if (item.accountId === account.id) {
                walletItem.items.splice(i, 1);
              }
            }
            continue;
          }
          const accountState = getWalletListState(accountItem);
          accountItem.isVisible = !!appWallet && accountState.isVisible;
          accountItem.isExpanded = accountState.isExpanded;
          accountItem.isSelected = entity.value?.accountIdList.includes(account.id) ?? false;
          accountItem.isSelectedGlobal = isSelectedGlobal;
          accountItem.isActive = account.id === selectedAccountId.value;
          if (!accountItem.isSelected) {
            notAllAccountsSelected = true;
          } else {
            atLeastOneAccountSelected = true;
          }
          if (!accountItem.isSelectedGlobal) {
            notAllAccountsSelectedGlobal = true;
          } else {
            atLeastOneAccountSelectedGlobal = true;
          }
        }
        if (walletItem.items.length === 0) {
          for (let i = group.items.length - 1; i >= 0; i--) {
            const item = group.items[i];
            if (item.walletId === walletItem.walletId) {
              group.items.splice(i, 1);
            }
          }
          continue;
        }
        if (!atLeastOneAccountSelected) {
          walletItem.isSelected = false;
          notAllWalletsSelected = true;
        } else if (notAllAccountsSelected) {
          walletItem.isSelected = "indeterminate";
          notAllWalletsSelected = true;
        } else {
          walletItem.isSelected = true;
          atLeastOneWalletSelected = true;
        }
        if (!atLeastOneAccountSelectedGlobal) {
          walletItem.isSelectedGlobal = false;
          notAllWalletsSelectedGlobal = true;
        } else if (notAllAccountsSelectedGlobal) {
          walletItem.isSelectedGlobal = "indeterminate";
          notAllWalletsSelectedGlobal = true;
        } else {
          walletItem.isSelectedGlobal = true;
          atLeastOneWalletSelectedGlobal = true;
        }
      }
      if (!atLeastOneWalletSelected) {
        group.isSelected = false;
      } else if (notAllWalletsSelected) {
        group.isSelected = "indeterminate";
      } else {
        group.isSelected = true;
      }
      if (!atLeastOneWalletSelectedGlobal) {
        group.isSelectedGlobal = false;
      } else if (notAllWalletsSelectedGlobal) {
        group.isSelectedGlobal = "indeterminate";
      } else {
        group.isSelectedGlobal = true;
      }
    }
    for (let i = groupList.value.length - 1; i >= 0; i--) {
      const group = groupList.value[i];
      if (group.items.length === 0) {
        groupList.value.splice(i, 1);
      }
    }
  };
  const getWalletListState = (node) => {
    let nodeState = _walletListState[node.key];
    if (!nodeState) {
      nodeState = {
        isVisible: true,
        isExpanded: false
      };
      _walletListState[node.key] = nodeState;
    }
    return nodeState;
  };
  const doToggleVisibility = (node) => {
    let nodeState = getWalletListState(node);
    nodeState.isVisible = !nodeState.isVisible;
    doUpdateWalletList();
  };
  const doToggleExpand = (node) => {
    let nodeState = getWalletListState(node);
    nodeState.isExpanded = !nodeState.isExpanded;
    doUpdateWalletList();
  };
  const doSelectGroup = (node) => {
    let newValue = false;
    if (node.isSelected === void 0) {
      newValue = true;
    } else if (node.isSelected === "indeterminate") {
      newValue = true;
    } else if (node.isSelected === false) {
      newValue = true;
    }
    console.log("doSelectGroup", node.isSelected, newValue);
    doSelectChild(node, newValue);
    console.log(fullEntityList.value);
    updateAllEntities(fullEntityList.value);
    doUpdateWalletList();
  };
  const doSelectChild = (node, isSelected) => {
    node.isSelected = isSelected;
    if (node.walletId && node.accountId) {
      for (const _entity of fullEntityList.value) {
        for (let i = _entity.accountIdList.length - 1; i >= 0; i--) {
          if (_entity.accountIdList[i] === node.accountId) {
            _entity.accountIdList.splice(i, 1);
          }
        }
      }
      if (entity.value) {
        if (isSelected) {
          entity.value.accountIdList.push(node.accountId);
        }
      }
    }
    if (!node.items) {
      return;
    }
    for (const child of node.items) {
      doSelectChild(child, isSelected);
    }
  };
  watch([
    selectedWalletId,
    selectedAccountId,
    isManageMode,
    entity,
    selectedEntity,
    _showSelectedOnly
  ], () => doUpdateWalletList());
  watch(walletTabs, () => updateUISelectedIds(), { immediate: true });
  watch(selectedTabs, () => doUpdateWalletList(), { immediate: true });
  onMounted(() => {
    addSignalListener(onWalletListUpdated, "MenuWalletList", doUpdateWalletList);
  });
  onUnmounted(() => {
    removeSignalListener(onWalletListUpdated, "MenuWalletList");
  });
  return {
    selectedWalletId,
    entity,
    groupList,
    isManageMode,
    isSelectMode,
    isLocalMode,
    showSelectedOnly: _showSelectedOnly,
    doToggleVisibility,
    doToggleExpand,
    doSelectGroup,
    switchWalletAccount
  };
};

const _hoisted_1$5 = { class: "h-5" };
const _hoisted_2$5 = {
  key: 1,
  class: "font-semibold no-cap-first"
};
const _hoisted_3$5 = { class: "truncate" };
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "AccountListItemName",
  props: {
    walletName: { type: String, required: false, default: "" },
    accountName: { type: String, required: false, default: "" },
    accountNameShort: { type: String, required: false, default: "" },
    adaHandleName: { type: String, required: false, default: "" },
    useLongName: { type: Boolean, required: false, default: false },
    addWalletName: { type: Boolean, required: false, default: true },
    isNameSet: { type: Boolean, required: false, default: false },
    truncate: { type: String, required: false, default: "break-all" }
  },
  setup(__props) {
    const { isBalanceVisible } = useBalanceVisible();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$5, [
        __props.addWalletName ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          createTextVNode(toDisplayString(__props.walletName) + " ", 1)
        ], 64)) : createCommentVNode("", true),
        __props.adaHandleName && unref(isBalanceVisible) ? (openBlock(), createElementBlock("span", _hoisted_2$5, [
          __props.addWalletName ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            createTextVNode("- ")
          ], 64)) : createCommentVNode("", true),
          _cache[0] || (_cache[0] = createBaseVNode("span", { class: "text-[#0fd25b] font-black font-mono" }, "$", -1)),
          createBaseVNode("span", _hoisted_3$5, toDisplayString(__props.adaHandleName), 1)
        ])) : __props.useLongName ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
          __props.addWalletName ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            createTextVNode("- ")
          ], 64)) : createCommentVNode("", true),
          createTextVNode(toDisplayString(__props.accountName), 1)
        ], 64)) : __props.isNameSet ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [
          __props.addWalletName ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            createTextVNode("- ")
          ], 64)) : createCommentVNode("", true),
          createTextVNode(toDisplayString(__props.accountName) + " (" + toDisplayString(__props.accountNameShort) + ")", 1)
        ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 4 }, [
          __props.addWalletName ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            createTextVNode("(")
          ], 64)) : createCommentVNode("", true),
          createTextVNode(toDisplayString(__props.accountNameShort), 1),
          __props.addWalletName ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createTextVNode(")")
          ], 64)) : createCommentVNode("", true)
        ], 64))
      ]);
    };
  }
});

const _show$1 = ref(false);
const _walletId = ref(null);
const _accountId$1 = ref(null);
const _currentName = ref("");
const openModalRenameAccount = (walletId, accountId, currentName) => {
  _walletId.value = walletId;
  _accountId$1.value = accountId;
  _currentName.value = currentName;
  _show$1.value = true;
};
const closeModalRenameAccount = () => {
  _show$1.value = false;
  _walletId.value = null;
  _accountId$1.value = null;
  _currentName.value = "";
};
const useModalRenameAccount = () => {
  return {
    showModalRenameAccount: _show$1,
    walletId: _walletId,
    accountId: _accountId$1,
    currentName: _currentName,
    openModalRenameAccount,
    closeModalRenameAccount
  };
};

const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "ContextMenuAccount",
  props: {
    walletId: { type: String, default: "" },
    accountId: { type: String, default: "" }
  },
  setup(__props) {
    const props = __props;
    const walletId = computed(() => props.walletId ?? null);
    const accountId = computed(() => props.accountId ?? null);
    const $t = useTranslation().t;
    const {
      appAccount,
      accountSettings
    } = useWalletAccount(walletId, accountId);
    const {
      toggleFixedDappAccountId
    } = useDappAccount();
    const {
      openModalReceiveAddress
    } = useModalReceiveAddress();
    const {
      openModalRenameAccount
    } = useModalRenameAccount();
    const isFavorite = accountSettings.isFavorite;
    const receiveAddress = accountSettings.receiveAddress;
    const forcedUnusedAddress = accountSettings.forcedUnusedAddress;
    const stakeAddress = accountSettings.stakeAddress;
    const adaHandleList = accountSettings.adaHandleList;
    const _adaHandle = accountSettings.adaHandle;
    const { adaHandle } = _adaHandle;
    const isDappAccount = computed(() => appAccount.value?.isDappAccount ?? false);
    const isFixedAccount = computed(() => isDappAccount.value && fixedDappWalletId.value === walletId.value && fixedDappAccountId.value === appAccount.value?.id);
    const openModalReceive = () => {
      if (receiveAddress.value) {
        openModalReceiveAddress(receiveAddress.value, forcedUnusedAddress.value ?? void 0, stakeAddress.value ?? void 0, adaHandleList.value ?? void 0, adaHandle.value ?? void 0);
      }
    };
    const doToggleFixedDappAccount = () => {
      if (!walletId.value || !appAccount.value?.id) {
        return;
      }
      toggleFixedDappAccountId(walletId.value, appAccount.value.id);
    };
    const openModalRename = () => {
      if (!walletId.value || !accountId.value) {
        return;
      }
      const currentName = accountSettings.name.value || "";
      openModalRenameAccount(walletId.value, accountId.value, currentName);
    };
    const contextMenuItems = computed(() => [
      {
        id: "receive",
        icon: markRaw(IconArrowLB),
        label: $t("wallet-list:account.contextMenu:receiveAddress"),
        fn: openModalReceive
      },
      {
        id: "force-dapp",
        icon: markRaw(IconDApp),
        label: isFixedAccount.value ? $t("wallet-list:account.contextMenu:unsetForcedDappAccount") : $t("wallet-list:account.contextMenu:setForcedDappAccount"),
        fn: doToggleFixedDappAccount
      },
      {
        id: "favorite-account",
        icon: markRaw(IconPin),
        fn: accountSettings.toggleFavorite,
        label: isFavorite.value ? $t("wallet-list:account.contextMenu:removeFavoriteAccount") : $t("wallet-list:account.contextMenu:addFavoriteAccount")
      },
      {
        id: "rename",
        icon: markRaw(IconPencil),
        fn: openModalRename,
        label: $t("wallet-list:account.contextMenu:renameAccount")
      }
    ]);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$9, { items: contextMenuItems.value }, null, 8, ["items"]);
    };
  }
});

const _hoisted_1$4 = { class: "shrink grow pl-0.5 pt-0.5 pb-0.5 flex flex-row et-js-ic et-gap-sm min-w-0" };
const _hoisted_2$4 = {
  key: 0,
  class: "absolute -right-1.25 -bottom-1.25 shrink-0 size-5 p-0.5 rounded-sm bg-bg-app shadow-sm"
};
const _hoisted_3$4 = { class: "shrink grow ml-0.25 flex flex-col et-text-sm truncate" };
const _hoisted_4$2 = { class: "grow flex et-gap-xs et-js-ic" };
const _hoisted_5$2 = { class: "font-semibold truncate" };
const _hoisted_6$2 = {
  key: 0,
  class: "flex et-js-ic et-gap-sm h-4"
};
const _hoisted_7$2 = { class: "flex flex-row et-js-ic et-gap-xs" };
const _hoisted_8$2 = { class: "flex flex-row justify-between items-center py-1 px-2" };
const _hoisted_9$1 = { class: "et-text-xs" };
const _hoisted_10$1 = { class: "et-text-xs underline" };
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "WalletListItemCompact",
  props: {
    item: { type: Object, required: true },
    walletList: { type: Object, required: true },
    showDappIcon: { type: Boolean, required: false, default: false },
    hideFiatBalance: { type: Boolean, required: false, default: false }
  },
  setup(__props) {
    const props = __props;
    const {
      isManageMode,
      isSelectMode,
      isLocalMode,
      doToggleVisibility,
      doToggleExpand,
      doSelectGroup,
      selectedWalletId,
      switchWalletAccount
    } = props.walletList;
    const walletId = computed(() => props.item.walletId ?? null);
    const accountId = computed(() => props.item.accountId ?? null);
    const $t = useTranslation().t;
    const {
      appWallet,
      appAccount,
      walletSettings,
      accountSettings
    } = useWalletAccount(walletId, accountId);
    const {
      toggleFixedDappAccountId
    } = useDappAccount();
    const {
      openModalReceiveAddress
    } = useModalReceiveAddress();
    const walletName = walletSettings.name;
    const isNameSet = accountSettings.isNameSet;
    const accountName = accountSettings.name;
    const accountNameShort = accountSettings.nameShort;
    const receiveAddress = accountSettings.receiveAddress;
    const forcedUnusedAddress = accountSettings.forcedUnusedAddress;
    const stakeAddress = accountSettings.stakeAddress;
    const adaHandleList = accountSettings.adaHandleList;
    const _adaHandle = accountSettings.adaHandle;
    const {
      adaHandle,
      adaHandleName
    } = _adaHandle;
    const balanceTotal = computed(() => appWallet.value?.data.balance.total ?? "0");
    const isAccountListOpen = computed(() => props.item.isExpanded ?? false);
    const isDappAccount = computed(() => appAccount.value?.isDappAccount ?? false);
    const isFixedAccount = computed(() => isDappAccount.value && fixedDappWalletId.value === walletId.value && fixedDappAccountId.value === appAccount.value?.id);
    const isWalletSyncing = walletSettings.isSyncing;
    const checkMarkColor = ref("text-txt-green");
    const showSyncState = ref(false);
    let _toid = -1;
    watch(isWalletSyncing, (value) => {
      if (value) {
        checkMarkColor.value = "text-txt-green";
      } else {
        checkMarkColor.value = "text-txt-green";
        clearTimeout(_toid);
        _toid = setTimeout(() => {
          checkMarkColor.value = "";
        }, 2e3);
      }
    });
    const numAccounts = computed(() => {
      if (!appWallet.value) {
        return 0;
      }
      return appWallet.value.data.wallet.accountList.reduce((cnt, acct) => {
        return isHDAccount(acct.path) ? cnt + 1 : cnt;
      }, 0) ?? 0;
    });
    const hasMoreThanOneAccount = computed(() => numAccounts.value > 1);
    const onHideSyncState = () => {
      showSyncState.value = false;
    };
    const onShowSyncState = () => {
      showSyncState.value = true;
    };
    const openModalReceive = () => {
      if (receiveAddress.value) {
        openModalReceiveAddress(receiveAddress.value, forcedUnusedAddress.value ?? void 0, stakeAddress.value ?? void 0, adaHandleList.value ?? void 0, adaHandle.value ?? void 0);
      }
    };
    const onClickedItem = () => {
      if (isSelectMode.value) {
        doSelectGroup(props.item);
      } else {
        switchWalletAccount(walletId.value);
      }
    };
    const isSelected = ref(props.item.isSelected);
    const doToggleFixedDappAccount = () => {
      if (!walletId.value || !appAccount.value?.id) {
        return;
      }
      toggleFixedDappAccountId(walletId.value, appAccount.value.id);
    };
    computed(() => [
      {
        id: "receive",
        icon: markRaw(IconArrowLB),
        label: $t("wallet-list:account.contextMenu:receiveAddress"),
        fn: openModalReceive
      },
      {
        id: "force-dapp",
        icon: markRaw(IconDApp),
        label: isFixedAccount.value ? $t("wallet-list:account.contextMenu:unsetForcedDappAccount") : $t("wallet-list:account.contextMenu:setForcedDappAccount"),
        fn: doToggleFixedDappAccount
      }
    ]);
    watch(() => props.item, () => {
      isSelected.value = props.item.isSelected;
    }, { immediate: true, deep: true });
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_Checkbox = resolveComponent("Checkbox");
      const _component_Card = resolveComponent("Card");
      return openBlock(), createBlock(_component_Button, {
        class: normalizeClass(["transaction-item w-full p-0 flex flex-col et-js-ic gap-0 rounded-xl! shadow-sm border-1 border-[var(--p-content-border-color)] data-active:border-border-highlight/50 hover:data-active:border-border-highlight hover:border-border-highlight/50 bg-[var(--p-card-background)] hover:bg-[var(--p-button-text-secondary-hover-background)]", " " + (unref(isSelectMode) && (!__props.item.isSelectedGlobal || __props.item.isSelectedGlobal === "indeterminate") ? "border-yellow/50!" : "")]),
        severity: "secondary",
        "data-ui": unref(appWallet)?.id === unref(selectedWalletId) && !unref(isSelectMode) && !unref(isLocalMode) ? "active" : "",
        text: "",
        onClick: withModifiers(onClickedItem, ["prevent", "stop"])
      }, {
        default: withCtx(() => [
          createVNode(_component_Card, {
            class: "w-full min-w-0 bg-transparent border-0 rounded-xl!",
            pt: {
              body: "flex gap-0 p-0",
              title: "flex flex-row et-gap-md et-jb-ic et-jb-ic sm:et-jb-is max-2xs:flex-wrap",
              content: "flex flex-row et-gap-xs et-jb-ic et-jb-ic sm:et-jb-ic max-2xs:flex-wrap p-1.5",
              footer: "flex flex-row et-gap-md et-jc-ic"
            }
          }, {
            content: withCtx(() => [
              createBaseVNode("div", _hoisted_1$4, [
                createVNode(_sfc_main$a, {
                  class: normalizeClass(["shrink-0 cursor-pointer border-1 border-border-1 rounded-lg", "size-10"]),
                  rounded: "rounded-lg shadow-sm",
                  "icon-seed": unref(appWallet)?.data.settings.plate.image ?? void 0,
                  "icon-data": unref(appWallet)?.data.settings.plate.data ?? void 0
                }, {
                  default: withCtx(() => [
                    unref(appWallet) && !unref(appWallet).isMnemonic ? (openBlock(), createElementBlock("div", _hoisted_2$4, [
                      unref(appWallet).isHardware ? (openBlock(), createBlock(_sfc_main$b, {
                        key: 0,
                        class: "w-full h-full",
                        "sign-type": unref(appWallet)?.data.wallet.signType
                      }, null, 8, ["sign-type"])) : unref(appWallet).isMultiSig ? (openBlock(), createBlock(MultiSigGradient, {
                        key: 1,
                        class: "w-full h-full"
                      })) : unref(appWallet).isReadOnly ? (openBlock(), createBlock(IconLockEnabled, {
                        key: 2,
                        class: "w-full h-full"
                      })) : unref(appWallet).isCLI ? (openBlock(), createBlock(IconComputerProgramming01, {
                        key: 3,
                        class: "w-full h-full"
                      })) : createCommentVNode("", true)
                    ])) : createCommentVNode("", true)
                  ]),
                  _: 1
                }, 8, ["icon-seed", "icon-data"]),
                createBaseVNode("div", _hoisted_3$4, [
                  createBaseVNode("div", _hoisted_4$2, [
                    createBaseVNode("div", _hoisted_5$2, [
                      createVNode(_sfc_main$6, {
                        "ada-handle-name": unref(adaHandleName),
                        "account-name": unref(accountName),
                        "account-name-short": unref(accountNameShort),
                        "wallet-name": unref(walletName),
                        "is-name-set": unref(isNameSet),
                        "add-wallet-name": ""
                      }, null, 8, ["ada-handle-name", "account-name", "account-name-short", "wallet-name", "is-name-set"])
                    ])
                  ]),
                  !unref(isLocalMode) ? (openBlock(), createElementBlock("div", _hoisted_6$2, [
                    walletId.value ? withDirectives((openBlock(), createBlock(_sfc_main$c, {
                      key: 0,
                      class: "et-text-xs text-txt-muted",
                      "wallet-id": walletId.value,
                      "account-id": "''",
                      "use-wallet-sync-status": "",
                      onHide: onHideSyncState,
                      onShow: onShowSyncState
                    }, null, 8, ["wallet-id"])), [
                      [vShow, showSyncState.value]
                    ]) : createCommentVNode("", true),
                    withDirectives(createVNode(_sfc_main$d, {
                      class: "",
                      amount: balanceTotal.value,
                      "clipboard-enabled": false,
                      "css-color": "et-text-sm"
                    }, null, 8, ["amount"]), [
                      [vShow, !showSyncState.value]
                    ])
                  ])) : createCommentVNode("", true)
                ])
              ]),
              hasMoreThanOneAccount.value || unref(isManageMode) || unref(isLocalMode) ? (openBlock(), createBlock(_component_Button, {
                key: 0,
                class: normalizeClass([isAccountListOpen.value ? "bg-(--p-surface-700)" : "bg-(--p-surface-700)", "shrink-0 pl-2 pr-1.25 py-0 shadow-xs shadow-dark/25"]),
                size: "small",
                severity: "secondary",
                rounded: "",
                text: "",
                onClick: _cache[0] || (_cache[0] = withModifiers(($event) => unref(doToggleExpand)(__props.item), ["prevent", "stop"]))
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_7$2, [
                    createTextVNode(toDisplayString(numAccounts.value) + " ", 1),
                    isAccountListOpen.value ? (openBlock(), createBlock(IconChevronUp, {
                      key: 0,
                      class: "size-4"
                    })) : (openBlock(), createBlock(IconChevronDown, {
                      key: 1,
                      class: "size-4 mt-0.25"
                    }))
                  ])
                ]),
                _: 1
              }, 8, ["class"])) : !accountId.value ? (openBlock(), createBlock(_sfc_main$5, {
                key: 1,
                "wallet-id": walletId.value ?? void 0,
                "account-id": accountId.value ?? void 0
              }, null, 8, ["wallet-id", "account-id"])) : createCommentVNode("", true),
              unref(isManageMode) && !unref(isSelectMode) ? (openBlock(), createBlock(_component_Button, {
                key: 2,
                class: "shrink-0 size-6 p-0",
                size: "small",
                severity: "secondary",
                rounded: "",
                text: "",
                onClick: _cache[1] || (_cache[1] = withModifiers(($event) => unref(doToggleVisibility)(__props.item), ["prevent", "stop"]))
              }, {
                default: withCtx(() => [
                  __props.item.isVisible ? (openBlock(), createBlock(IconEyeVisible, {
                    key: 0,
                    class: "size-4"
                  })) : (openBlock(), createBlock(IconEyeHidden, {
                    key: 1,
                    class: "size-4"
                  }))
                ]),
                _: 1
              })) : createCommentVNode("", true),
              unref(isSelectMode) ? (openBlock(), createBlock(_component_Checkbox, {
                key: 3,
                modelValue: isSelected.value,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => isSelected.value = $event),
                class: "mx-2",
                indeterminate: __props.item.isSelected === "indeterminate",
                binary: "",
                onClick: withModifiers(onClickedItem, ["prevent", "stop"])
              }, null, 8, ["modelValue", "indeterminate"])) : createCommentVNode("", true)
            ]),
            _: 1
          }),
          walletId.value && unref(appAccount) && isDappAccount.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            isFixedAccount.value ? (openBlock(), createBlock(_component_Button, {
              key: 0,
              class: "w-full bg-bg-info hover:bg-bg-info cursor-pointer",
              unstyled: "",
              onClick: _cache[3] || (_cache[3] = withModifiers(($event) => unref(toggleFixedDappAccountId)(walletId.value, unref(appAccount).id), ["stop", "prevent"]))
            }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_8$2, [
                  createBaseVNode("div", _hoisted_9$1, toDisplayString(unref($t)("common:button.forcedDappAccount")), 1),
                  createBaseVNode("div", _hoisted_10$1, toDisplayString(unref($t)("common:disable")), 1)
                ])
              ]),
              _: 1
            })) : createCommentVNode("", true)
          ], 64)) : createCommentVNode("", true)
        ]),
        _: 1
      }, 8, ["class", "data-ui"]);
    };
  }
});

const _show = ref(false);
const _accountId = ref(null);
const openModalReportingAccountSettings = (accountId) => {
  _accountId.value = accountId;
  _show.value = !!accountId;
};
const closeModalReportingAccountSettings = () => {
  _show.value = false;
  _accountId.value = null;
};
const useModalReportingAccountSettings = () => {
  return {
    openModalReportingAccountSettings,
    closeModalReportingAccountSettings,
    showModalReportingAccountSettings: _show,
    accountId: _accountId
  };
};

const _hoisted_1$3 = { class: "shrink grow flex flex-row et-js-ic et-gap-sm min-w-0" };
const _hoisted_2$3 = { class: "shrink grow flex flex-col et-text-sm pl-1.75 py-1 truncate" };
const _hoisted_3$3 = { class: "grow flex et-gap-xs et-js-ic" };
const _hoisted_4$1 = { class: "font-semibold et-text-xs truncate pt-0.25" };
const _hoisted_5$1 = {
  key: 0,
  class: "flex et-js-ic et-gap-sm -mt-0.5 mb-0.25 h-4"
};
const _hoisted_6$1 = { class: "flex flex-row justify-between items-center py-1 px-2" };
const _hoisted_7$1 = { class: "et-text-xs" };
const _hoisted_8$1 = { class: "et-text-xs underline" };
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "WalletListItemAccountCompact",
  props: {
    item: { type: Object, required: true },
    walletList: { type: Object, required: true },
    showDappIcon: { type: Boolean, required: false, default: false },
    hideFiatBalance: { type: Boolean, required: false, default: false }
  },
  setup(__props) {
    const props = __props;
    const {
      isManageMode,
      isSelectMode,
      isLocalMode,
      showSelectedOnly,
      doToggleVisibility,
      doSelectGroup,
      switchWalletAccount
    } = props.walletList;
    const walletId = computed(() => props.item.walletId ?? null);
    const accountId = computed(() => props.item.accountId ?? null);
    const $t = useTranslation().t;
    const {
      appAccount,
      walletSettings,
      accountSettings
    } = useWalletAccount(walletId, accountId);
    const {
      openModalReceiveAddress
    } = useModalReceiveAddress();
    const {
      openModalReportingAccountSettings
    } = useModalReportingAccountSettings();
    const {
      toggleFixedDappAccountId
    } = useDappAccount();
    const walletName = walletSettings.name;
    const walletAccountId = walletSettings.walletAccountId;
    const isNameSet = accountSettings.isNameSet;
    const accountName = accountSettings.name;
    const accountNameShort = accountSettings.nameShort;
    const isFavorite = accountSettings.isFavorite;
    const receiveAddress = accountSettings.receiveAddress;
    const forcedUnusedAddress = accountSettings.forcedUnusedAddress;
    const stakeAddress = accountSettings.stakeAddress;
    const adaHandleList = accountSettings.adaHandleList;
    const _adaHandle = accountSettings.adaHandle;
    const {
      adaHandle,
      adaHandleName
    } = _adaHandle;
    const balanceTotal = computed(() => appAccount.value?.data.balance.total ?? "0");
    const isDappAccount = computed(() => appAccount.value?.isDappAccount ?? false);
    const isFixedAccount = computed(() => isDappAccount.value && fixedDappWalletId.value === walletId.value && fixedDappAccountId.value === accountId.value);
    const isWalletSyncing = walletSettings.isSyncing;
    const checkMarkColor = ref("text-txt-green");
    const showSyncState = ref(false);
    let _toid = -1;
    watch(isWalletSyncing, (value) => {
      if (value) {
        checkMarkColor.value = "text-txt-green";
      } else {
        checkMarkColor.value = "text-txt-green";
        clearTimeout(_toid);
        _toid = setTimeout(() => {
          checkMarkColor.value = "";
        }, 2e3);
      }
    });
    const onHideSyncState = () => {
      showSyncState.value = false;
    };
    const onShowSyncState = () => {
      showSyncState.value = true;
    };
    const openModalReceive = () => {
      if (receiveAddress.value) {
        openModalReceiveAddress(receiveAddress.value, forcedUnusedAddress.value ?? void 0, stakeAddress.value ?? void 0, adaHandleList.value ?? void 0, adaHandle.value ?? void 0);
      }
    };
    const doSwitchWalletAccount = (walletId2, accountId2) => {
      if (!walletId2 || !accountId2) {
        return;
      }
      if (showSelectedOnly.value) {
        openModalReportingAccountSettings(accountId2);
      } else {
        switchWalletAccount(walletId2, accountId2);
      }
    };
    const isSelected = computed(() => props.item.isSelected);
    const doToggleFixedDappAccount = () => {
      if (!walletId.value || !accountId.value) {
        return;
      }
      toggleFixedDappAccountId(walletId.value, accountId.value);
    };
    computed(() => [
      {
        id: "receive",
        icon: markRaw(IconArrowLB),
        label: $t("wallet-list:account.contextMenu:receiveAddress"),
        fn: openModalReceive
      },
      {
        id: "force-dapp",
        icon: markRaw(IconDApp),
        label: isFixedAccount.value ? $t("wallet-list:account.contextMenu:unsetForcedDappAccount") : $t("wallet-list:account.contextMenu:setForcedDappAccount"),
        fn: doToggleFixedDappAccount
      },
      {
        id: "favorite-account",
        icon: markRaw(IconPin),
        fn: accountSettings.toggleFavorite,
        label: isFavorite.value ? $t("wallet-list:account.contextMenu:removeFavoriteAccount") : $t("wallet-list:account.contextMenu:addFavoriteAccount")
      }
    ]);
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_Checkbox = resolveComponent("Checkbox");
      const _component_Card = resolveComponent("Card");
      const _directive_tooltip = resolveDirective("tooltip");
      return openBlock(), createBlock(_component_Button, {
        class: normalizeClass([
          "transaction-item w-full p-0 flex flex-col et-js-ic gap-0 rounded-xl! shadow-sm border-1 border-border-1 data-active:border-border-highlight/50 hover:data-active:border-border-highlight hover:border-border-highlight/50 bg-bg-2 hover:bg-[var(--p-button-text-secondary-hover-background)]",
          unref(isSelectMode) && (!__props.item.isSelectedGlobal || __props.item.isSelectedGlobal === "indeterminate") ? "border-yellow/50!" : unref(appAccount)?.id === unref(walletAccountId) && !unref(isSelectMode) && !unref(isLocalMode) ? "border-green/33" : ""
        ]),
        severity: "secondary",
        "data-ui": unref(appAccount)?.id === unref(selectedAccountId) && !unref(isSelectMode) && !unref(isLocalMode) ? "active" : "",
        text: "",
        onClick: _cache[6] || (_cache[6] = withModifiers(($event) => doSwitchWalletAccount(walletId.value, accountId.value), ["prevent", "stop"]))
      }, {
        default: withCtx(() => [
          createVNode(_component_Card, {
            class: "w-full min-w-0 bg-transparent border-0 rounded-xl!",
            pt: {
              body: "flex gap-0 p-0",
              title: "flex flex-row et-gap-md et-jb-ic et-jb-ic sm:et-jb-is max-2xs:flex-wrap",
              content: "flex flex-row et-gap-xs et-jb-ic et-jb-ic sm:et-jb-ic max-2xs:flex-wrap pl-0.5 pr-1.5 py-0.5",
              footer: "flex flex-row et-gap-md et-jc-ic"
            }
          }, {
            content: withCtx(() => [
              createBaseVNode("div", _hoisted_1$3, [
                unref(isManageMode) ? withDirectives((openBlock(), createBlock(_component_Button, {
                  key: 0,
                  class: "shrink-0 size-8 p-0",
                  rounded: "",
                  link: "",
                  onClick: _cache[0] || (_cache[0] = withModifiers(($event) => unref(accountSettings).toggleFavorite(), ["prevent", "stop"]))
                }, {
                  default: withCtx(() => [
                    createVNode(IconPin, {
                      class: normalizeClass(["size-5.5 aspect-square", unref(isFavorite) ? "text-txt-highlight fill-txt-highlight" : "text-txt-content fill-none"])
                    }, null, 8, ["class"])
                  ]),
                  _: 1
                })), [
                  [_directive_tooltip, unref($t)("home-accountCard:button.favorite.tooltip")]
                ]) : createCommentVNode("", true),
                createBaseVNode("div", _hoisted_2$3, [
                  createBaseVNode("div", _hoisted_3$3, [
                    createBaseVNode("div", _hoisted_4$1, [
                      createVNode(_sfc_main$6, {
                        "ada-handle-name": unref(adaHandleName),
                        "account-name": unref(accountName),
                        "account-name-short": unref(accountNameShort),
                        "wallet-name": unref(walletName),
                        "is-name-set": unref(isNameSet),
                        "add-wallet-name": false,
                        "use-long-name": ""
                      }, null, 8, ["ada-handle-name", "account-name", "account-name-short", "wallet-name", "is-name-set"])
                    ])
                  ]),
                  !unref(isLocalMode) ? (openBlock(), createElementBlock("div", _hoisted_5$1, [
                    walletId.value && accountId.value ? withDirectives((openBlock(), createBlock(_sfc_main$c, {
                      key: 0,
                      class: "et-text-xs text-txt-muted",
                      "wallet-id": walletId.value,
                      "account-id": accountId.value,
                      onHide: onHideSyncState,
                      onShow: onShowSyncState
                    }, null, 8, ["wallet-id", "account-id"])), [
                      [vShow, showSyncState.value]
                    ]) : createCommentVNode("", true),
                    withDirectives(createVNode(_sfc_main$d, {
                      class: "",
                      amount: balanceTotal.value,
                      "clipboard-enabled": false,
                      "css-color": "et-text-xs"
                    }, null, 8, ["amount"]), [
                      [vShow, !showSyncState.value]
                    ])
                  ])) : createCommentVNode("", true)
                ])
              ]),
              createVNode(_sfc_main$5, {
                "wallet-id": walletId.value ?? void 0,
                "account-id": accountId.value ?? void 0
              }, null, 8, ["wallet-id", "account-id"]),
              unref(showSelectedOnly) ? (openBlock(), createBlock(_component_Button, {
                key: 0,
                class: "shrink-0 size-6 p-0 bg-(--p-surface-700) shadow-xs shadow-dark/25",
                size: "small",
                severity: "secondary",
                rounded: "",
                text: "",
                onClick: _cache[1] || (_cache[1] = withModifiers(($event) => unref(openModalReportingAccountSettings)(accountId.value), ["prevent", "stop"]))
              }, {
                default: withCtx(() => [
                  createVNode(IconSettings, { class: "size-4" })
                ]),
                _: 1
              })) : createCommentVNode("", true),
              unref(isManageMode) && !unref(isSelectMode) ? (openBlock(), createBlock(_component_Button, {
                key: 1,
                class: "shrink-0 size-6 p-0",
                size: "small",
                severity: "secondary",
                rounded: "",
                text: "",
                onClick: _cache[2] || (_cache[2] = withModifiers(($event) => unref(doToggleVisibility)(__props.item), ["prevent", "stop"]))
              }, {
                default: withCtx(() => [
                  __props.item.isVisible ? (openBlock(), createBlock(IconEyeVisible, {
                    key: 0,
                    class: "size-4"
                  })) : (openBlock(), createBlock(IconEyeHidden, {
                    key: 1,
                    class: "size-4"
                  }))
                ]),
                _: 1
              })) : createCommentVNode("", true),
              unref(isSelectMode) ? (openBlock(), createBlock(_component_Checkbox, {
                key: 2,
                modelValue: isSelected.value,
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => isSelected.value = $event),
                class: "mx-2",
                binary: "",
                onClick: _cache[4] || (_cache[4] = withModifiers(($event) => unref(doSelectGroup)(__props.item), ["prevent", "stop"]))
              }, null, 8, ["modelValue"])) : createCommentVNode("", true)
            ]),
            _: 1
          }),
          walletId.value && accountId.value && isDappAccount.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            isFixedAccount.value ? (openBlock(), createBlock(_component_Button, {
              key: 0,
              class: "w-full bg-bg-info hover:bg-bg-info cursor-pointer",
              unstyled: "",
              onClick: _cache[5] || (_cache[5] = withModifiers(($event) => unref(toggleFixedDappAccountId)(walletId.value, accountId.value), ["stop", "prevent"]))
            }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_6$1, [
                  createBaseVNode("div", _hoisted_7$1, toDisplayString(unref($t)("common:button.forcedDappAccount")), 1),
                  createBaseVNode("div", _hoisted_8$1, toDisplayString(unref($t)("common:disable")), 1)
                ])
              ]),
              _: 1
            })) : createCommentVNode("", true)
          ], 64)) : createCommentVNode("", true)
        ]),
        _: 1
      }, 8, ["class", "data-ui"]);
    };
  }
});

const _currentYear = ref((/* @__PURE__ */ new Date()).getFullYear());
if (_currentYear.value < 2020) {
  _currentYear.value = 2020;
}
const _year = ref(2020);
const _month = ref(0);
const _day = ref(0);
const year = computed(() => _year.value);
const month = computed(() => _month.value);
const day = computed(() => _day.value);
const minSlotOfYear = computed(() => getSlotFromDateId("mainnet", { year: year.value, month: month.value, day: day.value, timezone: appTimezone.value }, false));
const maxSlotOfYear = computed(() => getSlotFromDateId("mainnet", { year: year.value, month: month.value, day: day.value, timezone: appTimezone.value }, true));
const setDay = (day2) => {
  if (day2 < 0) {
    day2 = 31;
  }
  if (day2 > 31) {
    day2 = 0;
  }
  _day.value = day2;
};
const setMonth = (month2) => {
  if (month2 < 0) {
    month2 = 12;
  }
  if (month2 > 12) {
    month2 = 0;
  }
  _month.value = month2;
};
const setYear = (year2) => {
  if (year2 < 2020) {
    year2 = 2020;
  }
  if (year2 > _currentYear.value) {
    year2 = _currentYear.value;
  }
  _year.value = year2;
};
const prevDay = () => {
  setDay(_day.value - 1);
};
const nextDay = () => {
  setDay(_day.value + 1);
};
const prevMonth = () => {
  setMonth(_month.value - 1);
};
const nextMonth = () => {
  setMonth(_month.value + 1);
};
const prevYear = () => {
  setYear(_year.value - 1);
};
const nextYear = () => {
  setYear(_year.value + 1);
};
const useReportTimeChanger = () => {
  return {
    year,
    month,
    day,
    minSlotOfYear,
    maxSlotOfYear,
    setDay,
    setMonth,
    setYear,
    prevDay,
    prevMonth,
    prevYear,
    nextDay,
    nextMonth,
    nextYear
  };
};

const sortITxHashList = (list) => {
  list.sort((a, b) => a.slot - b.slot || a.idx - b.idx);
};

const sortBalanceList = (balanceList) => {
  balanceList.sort((a, b) => {
    if (a.s === b.s) {
      return a.idx - b.idx;
    }
    return a.s - b.s;
  });
  for (const balance of balanceList) {
    const cbList = balance.cb;
    if (cbList) {
      cbList.sort((a, b) => {
        const at = a.t;
        const bt = b.t;
        if (at === "p" && bt !== "p") {
          return -1;
        }
        if (bt === "p" && at !== "p") {
          return 1;
        }
        if (at === "f" && bt !== "f") {
          return -1;
        }
        if (bt === "f" && at !== "f") {
          return 1;
        }
        if (at === "c" && bt !== "c") {
          return -1;
        }
        if (bt === "c" && at !== "c") {
          return 1;
        }
        if (at === "i" && bt !== "i") {
          return -1;
        }
        if (bt === "i" && at !== "i") {
          return 1;
        }
        if (a.au && !b.au) {
          return 1;
        }
        if (!a.au && b.au) {
          return -1;
        }
        return 0;
      });
    }
  }
};
const getAccountNamesById = (accountId, onlyInternal, accountIdList) => {
  const walletNameList = getWalletNameList();
  const walletNameMap = /* @__PURE__ */ new Map();
  for (const walletName of walletNameList) {
    walletNameMap.set(walletName.id, walletName.name);
  }
  if (onlyInternal && !accountIdList.includes(accountId)) {
    return "";
  }
  if (!onlyInternal && accountIdList.includes(accountId)) {
    return "";
  }
  const appAccount = getIAppAccountById(accountId, true);
  if (appAccount) {
    return walletNameMap.get(appAccount.walletId) + ": " + getAccountName(appAccount.data, true).value;
  }
  return "";
};
const getAccountNames = (accountIdList) => {
  const accountNameSet = /* @__PURE__ */ new Set();
  const walletNameList = getWalletNameList();
  const walletNameMap = /* @__PURE__ */ new Map();
  for (const walletName of walletNameList) {
    walletNameMap.set(walletName.id, walletName.name);
  }
  for (const accountId of accountIdList) {
    const appAccount = getIAppAccountById(accountId, true);
    if (appAccount) {
      accountNameSet.add(walletNameMap.get(appAccount.walletId) + ":" + getAccountName(appAccount.data, true).value);
    }
  }
  return Array.from(accountNameSet);
};
const getAccountIdsByTxHash = (txHashMap, hash, onlyInternal, accountIdList) => {
  const accountIdSet = /* @__PURE__ */ new Set();
  for (const [accountId, hashSet] of txHashMap) {
    if (onlyInternal && !accountIdList.includes(accountId)) {
      continue;
    }
    if (!onlyInternal && accountIdList.includes(accountId)) {
      continue;
    }
    if (hashSet.has(hash)) {
      accountIdSet.add(accountId);
    }
  }
  return Array.from(accountIdSet);
};

const getAccountReport = (networkId, accountPubKey, txHashList, scHashList, lastTxHashList) => {
  const accountId = accountPubKey?.slice(0, 16) ?? DEFAULT_ACCOUNT_ID;
  return getRequestData()(
    networkId,
    accountId,
    ApiRequestType.syncAccountReport,
    ErrorSync.syncAccountReport,
    {
      id: accountId,
      pub: accountPubKey,
      txHashList,
      scHashList,
      lastTxHashList
    },
    async (data) => data
  );
};

const _rawData = reactive({});
const _isLoading = reactive({});
const isAccountLoadingRawReportingData = computed(() => _isLoading);
const isLoadingRawReportingData = computed(() => {
  for (const accountId in _isLoading) {
    if (_isLoading[accountId]) {
      return true;
    }
  }
  return false;
});
const getAllRawData = () => _rawData;
const clearRawData = () => {
  for (const accountId in _rawData) {
    delete _rawData[accountId];
  }
};
const getRawData = (accountId, reset) => {
  if (!_rawData[accountId]) {
    _rawData[accountId] = {
      balanceList: [],
      openSCList: [],
      closedSCList: []
    };
  }
  if (reset) {
    _rawData[accountId].balanceList.splice(0);
    _rawData[accountId].openSCList.splice(0);
    _rawData[accountId].closedSCList.splice(0);
  }
  return _rawData[accountId];
};
const addRawData = (_newData) => {
  const numTxAdded = {};
  const _map = {};
  for (const accountId in _newData) {
    const newData = _newData[accountId];
    if (typeof accountId !== "string" || !Array.isArray(newData.balanceList) || !Array.isArray(newData.openSCList) || !Array.isArray(newData.closedSCList)) {
      numTxAdded[accountId] = -1;
      continue;
    }
    _map[accountId] = newData.balanceList.length;
    const rawData = getRawData(accountId, false);
    const hashMap = new Set(rawData.balanceList.map((b) => b.h));
    for (const balance of newData.balanceList) {
      if (hashMap.has(balance.h)) {
        continue;
      }
      rawData.balanceList.push(balance);
    }
    const openScIdSet = new Set(rawData.openSCList.map((p) => p.id));
    const closedScIdSet = new Set(rawData.closedSCList.map((p) => p.id));
    for (const scProcess of newData.openSCList) {
      if (openScIdSet.has(scProcess.id)) {
        continue;
      }
      if (closedScIdSet.has(scProcess.id)) {
        continue;
      }
      openScIdSet.add(scProcess.id);
      rawData.openSCList.push(scProcess);
    }
    for (const scProcess of newData.closedSCList) {
      if (closedScIdSet.has(scProcess.id)) {
        continue;
      }
      closedScIdSet.add(scProcess.id);
      rawData.closedSCList.push(scProcess);
    }
    for (let i = rawData.openSCList.length - 1; i >= 0; i--) {
      const scProcess = rawData.openSCList[i];
      if (closedScIdSet.has(scProcess.id)) {
        rawData.openSCList.splice(i, 1);
      }
    }
    numTxAdded[accountId] = newData.balanceList.length;
    sortBalanceList(rawData.balanceList);
  }
  const _list = Object.keys(_map).sort((a, b) => b.localeCompare(a));
  for (const accountId of _list) {
  }
  return numTxAdded;
};
const loadRawData = async (appAccount, minSlot, maxSlot, _stopSync, reset) => {
  const txRequestLimit = 25;
  const maxRequestLimit = 25e3;
  const accountId = appAccount.id;
  const accountPutKey = appAccount.data.account.pub;
  const networkId2 = appAccount.data.state.networkId;
  appAccount.data.state.numTxHashes;
  if (_isLoading[accountId]) {
    return;
  }
  _isLoading[accountId] = true;
  const rawData = getRawData(accountId, reset);
  sortBalanceList(rawData.balanceList);
  const hashMap = new Set(rawData.balanceList.map((b) => b.h));
  let _txBalanceList = await HistoryDB.getTxBalanceListTest(networkId2, accountId);
  const numTxInDB = _txBalanceList.length;
  _txBalanceList = _txBalanceList.filter((_) => !hashMap.has(_.hash) && _.slot >= minSlot && _.slot <= maxSlot);
  sortITxHashList(_txBalanceList);
  numTxInDB - _txBalanceList.length;
  let numLoaded = 0;
  let hadError = false;
  const addList = [];
  let offset = 0;
  for (; offset < _txBalanceList.length && numLoaded < maxRequestLimit && !_stopSync.value; offset += txRequestLimit, numLoaded += txRequestLimit) {
    if (hadError) {
      offset -= txRequestLimit;
      numLoaded -= txRequestLimit;
      hadError = false;
    }
    const txBalanceList = _txBalanceList.slice(offset, offset + txRequestLimit);
    const lastTxHashList = _txBalanceList.slice(Math.max(offset - 200, 0), offset).map((txBalance) => txBalance.hash);
    const txHashList = txBalanceList.map((txBalance) => {
      return { hash: txBalance.hash, slot: txBalance.slot, idx: txBalance.idx };
    });
    try {
      if (txHashList.length > 0) {
        const lastTx = txHashList[txHashList.length - 1];
        const res = await getAccountReport(
          networkId2,
          accountPutKey,
          txHashList,
          rawData.openSCList.map((scp) => scp.hashList[scp.hashList.length - 1]),
          lastTxHashList
        );
        for (const balance of res.reportTxBalanceList) {
          if (!hashMap.has(balance.h)) {
            hashMap.add(balance.h);
            addList.push(balance);
          }
        }
      }
    } catch (err) {
      console.error("err", err);
      hadError = true;
      await sleep(250);
    }
  }
  addRewardsToRawData(appAccount, rawData, minSlot, maxSlot);
  sortBalanceList(addList);
  if (addList.length > 0) {
    for (const balance of addList) {
      rawData.balanceList.push(balance);
    }
  }
  _isLoading[accountId] = false;
};
const saveRawData = (minSlot, maxSlot) => {
  let data = {};
  for (const accountId in _rawData) {
    sortBalanceList(_rawData[accountId].balanceList);
    data[accountId] = {
      balanceList: _rawData[accountId].balanceList.filter((b) => b.s >= minSlot && b.s <= maxSlot),
      openSCList: _rawData[accountId].openSCList.filter((b) => b.slot >= minSlot && b.slot <= maxSlot),
      closedSCList: _rawData[accountId].closedSCList.filter((b) => b.slot >= minSlot && b.slot <= maxSlot)
    };
  }
  return { rawData: json(data) };
};
const addRewardsToRawData = (appAccount, rawData, minSlot = 0, maxSlot = 0) => {
  if (appAccount.data.rewardInfoList && appAccount.data.rewardInfoList.length > 0) {
    const rewardList = appAccount.data.rewardInfoList[0].rewardList;
    for (const reward of rewardList) {
      const epochStart = getEpochStart(networkId.value, reward.epochSpendable).slotNumber;
      if (minSlot > 0 && maxSlot > 0 && (epochStart < minSlot || epochStart > maxSlot)) {
        continue;
      }
      const rewardHash = reward.epochSpendable + "-rewards-" + reward.type;
      let balance = rawData.balanceList.find((b) => b.h === rewardHash);
      if (!balance) {
        balance = {
          h: rewardHash,
          s: getEpochStart("mainnet", reward.epochSpendable).slotNumber,
          idx: 0,
          a: { coin: reward.amount },
          f: "0",
          t: ITxBalanceType.rewards
        };
        rawData.balanceList.push(balance);
      }
      if (reward.type === "refund") {
        balance.d = reward.amount;
      }
    }
  }
};

const _hoisted_1$2 = { class: "w-full flex flex-wrap et-je-ic et-gap-xs" };
const _hoisted_2$2 = {
  key: 0,
  class: "shrink grow flex flex-row et-js-ic et-gap-sm min-w-0"
};
const _hoisted_3$2 = { class: "shrink grow min-w-30 flex flex-col et-text-sm truncate" };
const _hoisted_4 = { class: "grow flex et-gap-xs et-js-ic" };
const _hoisted_5 = { class: "font-semibold et-text-sm truncate" };
const _hoisted_6 = { class: "min-w-60 et-text-xs" };
const _hoisted_7 = { class: "min-w-16 et-text-sm -mt-0.25" };
const _hoisted_8 = { class: "w-full flex flex-row et-je-ic et-text-sm" };
const _hoisted_9 = { class: "w-32 flex flex-row et-js-ic et-text-sm whitespace-nowrap" };
const _hoisted_10 = { class: "shrink-0 flex flex-row et-js-ic et-gap-xs" };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "WalletListItemAccountRawData",
  props: {
    item: { type: Object, required: true },
    walletList: { type: Object, required: true },
    showDappIcon: { type: Boolean, required: false, default: false },
    hideFiatBalance: { type: Boolean, required: false, default: false }
  },
  setup(__props) {
    const props = __props;
    const walletId = computed(() => props.item.walletId ?? null);
    const accountId = computed(() => props.item.accountId ?? null);
    const $t = useTranslation().t;
    const {
      appAccount,
      walletSettings,
      accountSettings
    } = useWalletAccount(walletId, accountId);
    const walletName = walletSettings.name;
    const isNameSet = accountSettings.isNameSet;
    const accountName = accountSettings.name;
    const accountNameShort = accountSettings.nameShort;
    const _adaHandle = accountSettings.adaHandle;
    const {
      adaHandle,
      adaHandleName
    } = _adaHandle;
    const {
      minSlotOfYear,
      maxSlotOfYear
    } = useReportTimeChanger();
    const { formatDatetime } = useFormatter();
    const _stopSync = ref(false);
    accountSettings.name;
    const path = accountSettings.path;
    const accountNetworkId = accountSettings.accountNetworkId;
    const rewardInfo = accountSettings.rewardInfo;
    const rawData = computed(() => accountId.value ? getRawData(accountId.value, false) : null);
    const numTxInRange = ref(0);
    const numRewardsInRange = ref(0);
    const numRawDataInRange = computed(() => numTxInRange.value + numRewardsInRange.value);
    const numRawDataInRangeLoaded = computed(() => {
      const _appAccount = appAccount.value;
      if (!_appAccount) {
        return 0;
      }
      let count = 0;
      for (const item of rawData.value?.balanceList ?? []) {
        if (item.s >= minSlotOfYear.value && item.s <= maxSlotOfYear.value) {
          count++;
        }
      }
      return count;
    });
    const isLoadingDone = computed(() => numRawDataInRange.value > 0 && numRawDataInRangeLoaded.value === numRawDataInRange.value);
    watch([networkId, appAccount, rewardInfo, minSlotOfYear, maxSlotOfYear], async () => {
      if (!appAccount.value) {
        numTxInRange.value = 0;
        numRewardsInRange.value = 0;
        return;
      }
      numTxInRange.value = await HistoryDB.getTxBalanceListRangeCount(networkId.value, appAccount.value.id, minSlotOfYear.value, maxSlotOfYear.value);
      if (!rewardInfo.value) {
        numRewardsInRange.value = 0;
        return;
      }
      const rewardList = rewardInfo.value.rewardList;
      if (!rewardList) {
        numRewardsInRange.value = 0;
        return;
      }
      getEpochStart(networkId.value, minSlotOfYear.value);
      numRewardsInRange.value = rewardList.filter((item) => {
        const epochStart = getEpochStart(networkId.value, item.epochSpendable).slotNumber;
        return epochStart >= minSlotOfYear.value && epochStart <= maxSlotOfYear.value;
      }).length;
    }, { immediate: true });
    computed(() => {
      const _appAccount = appAccount.value;
      if (!_appAccount) {
        return 0;
      }
      return rawData.value?.balanceList.filter((item) => item.h.length < 40).length ?? 0;
    });
    const lastReport = computed(() => {
      const _appAccount = appAccount.value;
      if (!_appAccount) {
        return null;
      }
      if (numRawDataInRangeLoaded.value > 0) {
        return rawData.value.balanceList[rawData.value.balanceList.length - 1];
      }
      return null;
    });
    const reportDateStart = computed(() => {
      if (lastReport.value) {
        const date = getTimestampFromSlot(accountNetworkId.value, lastReport.value.s);
        return formatDatetime(date, true, false);
      }
      return "last: -";
    });
    const stopCreateReport = () => {
      _stopSync.value = true;
    };
    const doCreateReport = async () => {
      const _appAccount = appAccount.value;
      console.log("doCreateReport", _appAccount);
      if (!_appAccount) {
        return;
      }
      _stopSync.value = false;
      await loadRawData(_appAccount, minSlotOfYear.value, maxSlotOfYear.value, _stopSync, true);
      _stopSync.value = false;
    };
    onUnmounted(() => {
      _stopSync.value = true;
    });
    return (_ctx, _cache) => {
      const _component_Card = resolveComponent("Card");
      const _component_Button = resolveComponent("Button");
      const _directive_tooltip = resolveDirective("tooltip");
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        createVNode(_component_Card, {
          class: normalizeClass([
            "grow min-w-0 bg-bg-2 border-1 border-border-1 rounded-full!",
            (numRawDataInRange.value > 0 ? "" : " opacity-50 ") + " " + (isLoadingDone.value ? " border-green/50 " : numRawDataInRange.value > 0 ? " border-yellow/50 " : "border-border-1") + " "
          ]),
          pt: {
            body: "flex gap-0 px-3 py-0",
            title: "flex flex-row et-gap-md et-jb-ic et-jb-ic sm:et-jb-is max-2xs:flex-wrap",
            content: "flex flex-row et-gap-xs et-jb-ic et-jb-ic sm:et-jb-ic max-2xs:flex-wrap pl-0.5 pr-0.5 py-0.5",
            footer: "flex flex-row et-gap-md et-jc-ic"
          }
        }, {
          content: withCtx(() => [
            accountId.value ? (openBlock(), createElementBlock("div", _hoisted_2$2, [
              createBaseVNode("div", _hoisted_3$2, [
                createBaseVNode("div", _hoisted_4, [
                  withDirectives((openBlock(), createElementBlock("div", _hoisted_5, [
                    createVNode(_sfc_main$6, {
                      "ada-handle-name": unref(adaHandleName),
                      "account-name": unref(accountName),
                      "account-name-short": unref(accountNameShort),
                      "wallet-name": unref(walletName),
                      "is-name-set": unref(isNameSet),
                      "add-wallet-name": false,
                      "use-long-name": ""
                    }, null, 8, ["ada-handle-name", "account-name", "account-name-short", "wallet-name", "is-name-set"])
                  ])), [
                    [_directive_tooltip, accountId.value]
                  ])
                ])
              ]),
              createBaseVNode("div", _hoisted_6, toDisplayString(unref(path)), 1),
              createBaseVNode("div", _hoisted_7, [
                isLoadingDone.value ? (openBlock(), createBlock(_sfc_main$e, {
                  key: 0,
                  "css-badge": "et-text-xs h-4! py-0! px-2!",
                  size: "small",
                  badge: { id: "done", label: "done", bgColor: "#307324", color: "#fff" }
                })) : unref(isAccountLoadingRawReportingData)[accountId.value] ?? false ? (openBlock(), createBlock(_sfc_main$e, {
                  key: 1,
                  "css-badge": "et-text-xs h-4! py-0! px-2!",
                  size: "small",
                  badge: { id: "loading", label: "loading", bgColor: "#ffb700", color: "#151515" }
                })) : (openBlock(), createBlock(_sfc_main$e, {
                  key: 2,
                  "css-badge": "et-text-xs h-4! py-0! px-2!",
                  size: "small",
                  badge: { id: "idle", label: "idle" }
                }))
              ]),
              createBaseVNode("div", _hoisted_8, toDisplayString(numRawDataInRangeLoaded.value) + " / " + toDisplayString(numRawDataInRange.value), 1),
              _cache[0] || (_cache[0] = createTextVNode("- ", -1)),
              createBaseVNode("div", _hoisted_9, toDisplayString(reportDateStart.value), 1)
            ])) : createCommentVNode("", true)
          ]),
          _: 1
        }, 8, ["class"]),
        createBaseVNode("div", _hoisted_10, [
          createVNode(_component_Button, {
            class: "grow",
            label: unref($t)("reporting:rawData.button.stop"),
            disabled: !unref(isLoadingRawReportingData),
            size: "small",
            severity: "secondary",
            rounded: "",
            outlined: "",
            onClick: stopCreateReport
          }, null, 8, ["label", "disabled"]),
          createVNode(_component_Button, {
            class: "grow",
            label: unref($t)("reporting:rawData.button.reload"),
            disabled: unref(isLoadingRawReportingData),
            size: "small",
            severity: "secondary",
            rounded: "",
            outlined: "",
            onClick: doCreateReport
          }, null, 8, ["label", "disabled"])
        ])
      ]);
    };
  }
});

const _hoisted_1$1 = { class: "pl-2 font-semibold" };
const _hoisted_2$1 = { class: "shrink-0 flex flex-row et-je-ic et-gap-xs" };
const _hoisted_3$1 = { class: "flex flex-row et-js-ic et-gap-xs et-text-xs font-semibold" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "WalletListGroup",
  props: {
    item: { type: Object, required: true },
    walletList: { type: Object, required: true }
  },
  setup(__props) {
    const props = __props;
    const {
      isManageMode,
      isSelectMode,
      isLocalMode,
      doToggleVisibility,
      doToggleExpand,
      doSelectGroup
    } = props.walletList;
    const onClickedItem = () => {
      if (isSelectMode.value) {
        doSelectGroup(props.item);
      } else {
        doToggleExpand(props.item);
      }
    };
    const isSelected = ref(props.item.isSelected);
    watch(() => props.item, () => {
      isSelected.value = props.item.isSelected;
    }, { immediate: true, deep: true });
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_Checkbox = resolveComponent("Checkbox");
      return __props.item.isVisible && !__props.item.hideGroup || unref(isManageMode) || unref(isSelectMode) ? (openBlock(), createBlock(_component_Button, {
        key: 0,
        class: normalizeClass([(!__props.item.isVisible && !unref(isSelectMode) ? "opacity-50" : "") + " " + (unref(isSelectMode) && (!__props.item.isSelectedGlobal || __props.item.isSelectedGlobal === "indeterminate") ? "border-yellow/50!" : ""), "wallet-group w-full py-1 pl-1.25 pr-1.25 et-jb-ic rounded-xl! shadow-sm overflow-hidden border-1 border-[var(--p-content-border-color)] data-active:border-border-highlight/50 hover:data-active:border-border-highlight hover:border-border-highlight/50 bg-bg-1 hover:bg-[var(--p-button-text-secondary-hover-background)]"]),
        severity: "secondary",
        "data-ui": __props.item.isActive && !unref(isSelectMode) && !unref(isLocalMode) ? "active" : "",
        text: "",
        onClick: withModifiers(onClickedItem, ["prevent", "stop"])
      }, {
        default: withCtx(() => [
          createBaseVNode("span", _hoisted_1$1, toDisplayString(__props.item.group?.primaryLabel), 1),
          createBaseVNode("div", _hoisted_2$1, [
            (__props.item.items?.length ?? 0) > 0 ? (openBlock(), createBlock(_component_Button, {
              key: 0,
              class: normalizeClass([__props.item.isExpanded ? "bg-(--p-surface-700)" : "bg-(--p-surface-700)", "shrink-0 pl-2 pr-1.25 py-0.5 shadow-xs shadow-dark/25"]),
              size: "small",
              severity: "secondary",
              rounded: "",
              text: "",
              onClick: _cache[0] || (_cache[0] = withModifiers(($event) => unref(doToggleExpand)(__props.item), ["prevent", "stop"]))
            }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_3$1, [
                  createTextVNode(toDisplayString(__props.item.items?.length ?? 0) + " ", 1),
                  __props.item.isExpanded ? (openBlock(), createBlock(IconChevronUp, {
                    key: 0,
                    class: "size-4"
                  })) : (openBlock(), createBlock(IconChevronDown, {
                    key: 1,
                    class: "size-4 mt-0.25"
                  }))
                ])
              ]),
              _: 1
            }, 8, ["class"])) : createCommentVNode("", true),
            unref(isManageMode) && !unref(isSelectMode) ? (openBlock(), createBlock(_component_Button, {
              key: 1,
              class: "shrink-0 size-6 p-0",
              size: "small",
              severity: "secondary",
              rounded: "",
              text: "",
              onClick: _cache[1] || (_cache[1] = withModifiers(($event) => unref(doToggleVisibility)(__props.item), ["prevent", "stop"]))
            }, {
              default: withCtx(() => [
                __props.item.isVisible ? (openBlock(), createBlock(IconEyeVisible, {
                  key: 0,
                  class: "size-4"
                })) : (openBlock(), createBlock(IconEyeHidden, {
                  key: 1,
                  class: "size-4"
                }))
              ]),
              _: 1
            })) : createCommentVNode("", true),
            unref(isSelectMode) ? (openBlock(), createBlock(_component_Checkbox, {
              key: 2,
              modelValue: isSelected.value,
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => isSelected.value = $event),
              class: "mx-2",
              indeterminate: __props.item.isSelected === "indeterminate",
              binary: "",
              onClick: withModifiers(onClickedItem, ["prevent", "stop"])
            }, null, 8, ["modelValue", "indeterminate"])) : createCommentVNode("", true)
          ])
        ]),
        _: 1
      }, 8, ["class", "data-ui"])) : createCommentVNode("", true);
    };
  }
});

const _hoisted_1 = { class: "shrink-0 w-full max-h-full inline-block pr-1 et-scrollbar overflow-x-hidden overflow-y-scroll" };
const _hoisted_2 = { class: "w-full flex flex-col et-gap-xs" };
const _hoisted_3 = {
  key: 1,
  class: "w-full pl-2 mb-1 flex flex-col et-js-ic et-gap-xs"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WalletList",
  props: {
    walletList: { type: Object, required: true }
  },
  emits: ["select"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const {
      isManageMode,
      isSelectMode,
      isLocalMode,
      showSelectedOnly,
      groupList
    } = props.walletList;
    const {
      setModalSelectAccountOpen
    } = useModalSelectAccount();
    const doOpenAddAccount = (item) => {
      setModalSelectAccountOpen(true, "ui", "ButtonOpenAddAccount_" + item.walletId);
    };
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(groupList), (group, index) => {
            return openBlock(), createElementBlock(Fragment, null, [
              createVNode(_sfc_main$1, {
                item: group,
                "wallet-list": __props.walletList
              }, null, 8, ["item", "wallet-list"]),
              (group.isVisible || unref(isManageMode) || unref(isSelectMode)) && group.isExpanded && (!!group.items && group.items.length) ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: normalizeClass(["relative w-full mb-1 flex flex-col et-js-ic et-gap-xs", {
                  "pl-2": !group.hideGroup
                }])
              }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(group.items, (wallet) => {
                  return openBlock(), createElementBlock(Fragment, null, [
                    wallet.isVisible || unref(isManageMode) || unref(isSelectMode) ? (openBlock(), createBlock(_sfc_main$4, {
                      key: 0,
                      class: normalizeClass({
                        "opacity-50": !wallet.isVisible && !unref(isSelectMode)
                      }),
                      item: wallet,
                      "wallet-list": __props.walletList,
                      "show-num-accounts": ""
                    }, null, 8, ["class", "item", "wallet-list"])) : createCommentVNode("", true),
                    unref(isManageMode) || unref(showSelectedOnly) || !wallet.singleAccount && wallet.isVisible && wallet.isExpanded || unref(isLocalMode) && wallet.isExpanded ? (openBlock(), createElementBlock("div", _hoisted_3, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(wallet.items, (account) => {
                        return openBlock(), createElementBlock(Fragment, null, [
                          !unref(isLocalMode) ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                            account.isVisible || (unref(isManageMode) || unref(showSelectedOnly)) ? (openBlock(), createBlock(_sfc_main$3, {
                              key: 0,
                              class: normalizeClass(!account.isVisible && !unref(isSelectMode) ? "opacity-50" : ""),
                              item: account,
                              "wallet-list": __props.walletList
                            }, null, 8, ["class", "item", "wallet-list"])) : createCommentVNode("", true)
                          ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                            account.isVisible || (unref(isManageMode) || unref(showSelectedOnly)) ? (openBlock(), createBlock(_sfc_main$2, {
                              key: 0,
                              class: normalizeClass(!account.isVisible && !unref(isSelectMode) ? "opacity-50" : ""),
                              item: account,
                              "wallet-list": __props.walletList
                            }, null, 8, ["class", "item", "wallet-list"])) : createCommentVNode("", true)
                          ], 64))
                        ], 64);
                      }), 256)),
                      unref(isManageMode) ? (openBlock(), createBlock(_component_Button, {
                        key: 0,
                        class: "w-full",
                        label: _ctx.$t("common:button.addAccount"),
                        size: "small",
                        severity: "secondary",
                        rounded: "",
                        outlined: "",
                        onClick: withModifiers(($event) => doOpenAddAccount(wallet), ["prevent", "stop"])
                      }, {
                        icon: withCtx(() => [
                          createVNode(IconPlusSign, { class: "size-3 mt-0.5" })
                        ]),
                        _: 1
                      }, 8, ["label", "onClick"])) : createCommentVNode("", true)
                    ])) : createCommentVNode("", true)
                  ], 64);
                }), 256))
              ], 2)) : createCommentVNode("", true)
            ], 64);
          }), 256))
        ])
      ]);
    };
  }
});

export { updateAllEntities as A, useModalReportingAccountSettings as B, getEntityByAccountId as C, getAccountNamesById as D, IconEyeHidden as I, _sfc_main as _, IconSettings as a, useReportTimeChanger as b, sortBalanceList as c, getRawData as d, getAccountIdsByTxHash as e, getAllRawData as f, getEntityByName as g, addRawData as h, clearRawData as i, entityList as j, fullEntityList as k, loadRawData as l, saveRawData as m, getAccountNames as n, _sfc_main$6 as o, _sfc_main$5 as p, useSelectWalletGroup as q, useModalRenameAccount as r, selectedEntity as s, loadEntityList as t, useWalletList as u, selectEntity as v, deleteEntity as w, addEntity as x, updateEntity as y, hasEntityName as z };
