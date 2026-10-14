import { bp as Dexie, D as computed, e as ref, P as networkId, aC as dispatchSignal, aX as json, aE as addSignalListener } from './index.js';
import { n as networkIdList } from './NetworkId.js';
import { V as getAddressCredentials, ax as doInitApp } from './app2.js';

const createIAddressBookEntry = (name, address, mode) => {
  return {
    name,
    address,
    mode
  };
};
const createIAddressBook = (id, networkId) => {
  return {
    id,
    networkId,
    entryList: []
  };
};

class AddressBookDB extends Dexie {
  addressbook;
  constructor(networkId) {
    super("eternl-" + networkId + "-addressbook");
    this.version(1).stores({
      addressbook: "id, networkId"
    });
  }
}
const dbMap$1 = networkIdList.reduce((o, n) => {
  o[n] = null;
  return o;
}, {});
const getDB$1 = async (networkId) => {
  let db = dbMap$1[networkId];
  if (!db) {
    db = new AddressBookDB(networkId);
    dbMap$1[networkId] = db;
  }
  if (!db.isOpen()) {
    await db.open();
  }
  return db;
};
const addAddressBook = (addressBook) => {
  return getDB$1(addressBook.networkId).then((db) => {
    return db.transaction("rw", [db.addressbook], async (tx) => {
      await db.addressbook.add(addressBook);
      return true;
    });
  }).catch((error) => {
    return false;
  });
};
const putAddressBook = (addressBook) => {
  return getDB$1(addressBook.networkId).then((db) => {
    return db.transaction("rw", [db.addressbook], async (tx) => {
      await db.addressbook.put(addressBook);
      return true;
    });
  }).catch((error) => {
    return false;
  });
};
const getAddressBook = (networkId, id) => {
  return getDB$1(networkId).then((db) => {
    return db.transaction("rw", [db.addressbook], async (tx) => {
      let addressBook = await db.addressbook.where("id").equals(id).first();
      return addressBook ?? null;
    });
  }).catch((error) => {
    return null;
  });
};
const removeAddressBock = (networkId, id) => {
  return getDB$1(networkId).then((db) => {
    return db.transaction("rw", [db.addressbook], async (tx) => {
      db.addressbook.delete(id);
      return true;
    });
  }).catch((error) => {
    return false;
  });
};
const putAddressBookEntry = (networkId, id, entry, oldName) => {
  return getDB$1(networkId).then((db) => {
    return db.transaction("rw", [db.addressbook], async (tx) => {
      let addressBook = await db.addressbook.where("id").equals(id).first();
      if (!addressBook) {
        addressBook = createIAddressBook(id, networkId);
      }
      for (let i = addressBook.entryList.length - 1; i >= 0; i--) {
        const name = addressBook.entryList[i].name;
        if (name === entry.name || name === oldName) {
          addressBook.entryList.splice(i, 1);
        }
      }
      addressBook.entryList.push(entry);
      await db.addressbook.put(addressBook);
      return true;
    });
  }).catch((error) => {
    return false;
  });
};
const deleteAddressBookEntry$1 = (networkId, id, entryName) => {
  return getDB$1(networkId).then((db) => {
    return db.transaction("rw", [db.addressbook], async (tx) => {
      let addressBook = await db.addressbook.where("id").equals(id).first();
      if (!addressBook) {
        addressBook = createIAddressBook(id, networkId);
      }
      for (let i = addressBook.entryList.length - 1; i >= 0; i--) {
        const listEntry = addressBook.entryList[i];
        if (listEntry.name === entryName) {
          addressBook.entryList.splice(i, 1);
        }
      }
      await db.addressbook.put(addressBook);
      return true;
    });
  }).catch((error) => {
    return false;
  });
};
const putReportLabelEntry = (networkId, id, entry, oldName = "") => {
  return getDB$1(networkId).then((db) => {
    return db.transaction("rw", [db.addressbook], async (tx) => {
      let addressBook = await db.addressbook.where("id").equals(id).first();
      if (!addressBook) {
        addressBook = createIAddressBook(id, networkId);
      }
      if ((oldName?.length ?? 0) > 0) {
        for (let i = addressBook.entryList.length - 1; i >= 0; i--) {
          const name = addressBook.entryList[i].name;
          const address = addressBook.entryList[i].address;
          if (name === oldName && address === entry.address) {
            addressBook.entryList.splice(i, 1);
          }
        }
      }
      addressBook.entryList.push(entry);
      await db.addressbook.put(addressBook);
      return true;
    });
  }).catch((error) => {
    return false;
  });
};
const deleteReportLabelEntry = (networkId, id, entryName, entryAddr) => {
  return getDB$1(networkId).then((db) => {
    return db.transaction("rw", [db.addressbook], async (tx) => {
      let addressBook = await db.addressbook.where("id").equals(id).first();
      if (!addressBook) {
        addressBook = createIAddressBook(id, networkId);
      }
      for (let i = addressBook.entryList.length - 1; i >= 0; i--) {
        const listEntry = addressBook.entryList[i];
        if (listEntry.name === entryName && listEntry.address === entryAddr) {
          addressBook.entryList.splice(i, 1);
        }
      }
      await db.addressbook.put(addressBook);
      return true;
    });
  }).catch((error) => {
    return false;
  });
};
const AddressBookDB$1 = {
  getDB: getDB$1,
  addAddressBook,
  putAddressBook,
  getAddressBook,
  putAddressBookEntry,
  deleteAddressBookEntry: deleteAddressBookEntry$1,
  putReportLabelEntry,
  deleteReportLabelEntry,
  removeAddressBock
};

const onAddressBookEntryUpdated = "onAddressBookEntryUpdated";
const onAddressBookEntryDeleted = "onAddressBookEntryDeleted";
const doSelectAddressBookEntry = "doSelectAddressBookEntry";

const globalId = "global";
const _addressBook = ref(createIAddressBook(globalId, networkId.value));
const addressBook = computed(() => _addressBook.value);
const addressBookNames = computed(() => _addressBook.value.entryList.map((e) => e.name));
const loadAddressBook = async () => {
  let changed = false;
  const globalAddressBook = await AddressBookDB$1.getAddressBook(networkId.value, globalId);
  if (!globalAddressBook) {
    _addressBook.value = createIAddressBook(globalId, networkId.value);
    await AddressBookDB$1.addAddressBook(json(_addressBook.value));
  } else {
    _addressBook.value = globalAddressBook;
  }
  return changed;
};
const mergeAddressBook = async (addressBook2) => {
  const dbEntry = await AddressBookDB$1.getAddressBook(addressBook2.networkId, globalId);
  if (!dbEntry) {
    addressBook2.id = globalId;
    await AddressBookDB$1.addAddressBook(json(addressBook2));
  } else {
    for (const entry of addressBook2.entryList) {
      if (!dbEntry.entryList.some((item) => item.name === entry.name)) {
        dbEntry.entryList.push(entry);
      }
    }
    await AddressBookDB$1.putAddressBook(json(dbEntry));
  }
  await loadAddressBook();
  return true;
};
const getAddressBookEntryByAddress = (address, mode) => {
  {
    return _addressBook.value.entryList.find((entry) => entry.address === address) ?? null;
  }
};
const getAddressBookEntryByName = (name, mode) => {
  {
    return _addressBook.value.entryList.find((entry) => entry.name === name) ?? null;
  }
};
const getAddressBookEntryByMode = (str, mode) => {
  return _addressBook.value.entryList.find((entry) => entry.mode === mode && (entry.address === str || entry.name === str)) ?? null;
};
const updateAddressBookEntry = async (name, address, sendMode, oldName) => {
  const success = await AddressBookDB$1.putAddressBookEntry(
    networkId.value,
    globalId,
    createIAddressBookEntry(name, address, sendMode),
    oldName
  );
  if (success) {
    await loadAddressBook();
  }
  await dispatchSignal(onAddressBookEntryUpdated, success);
  return success;
};
const deleteAddressBookEntry = async (entryName) => {
  const success = await AddressBookDB$1.deleteAddressBookEntry(networkId.value, globalId, entryName);
  if (success) {
    await loadAddressBook();
  }
  await dispatchSignal(onAddressBookEntryDeleted, success);
  return success;
};

const contractSchemaV1 = {
  list: "++id, address, label"
};
const contractSchemaV2 = {
  list: "++id, address, label",
  data: "id"
  // id is now networkId and data is raw
};
class ContractMappingDB extends Dexie {
  list;
  data;
  constructor(networkId) {
    super("eternl-" + networkId + "-contract");
    this.version(1).stores(contractSchemaV1);
    this.version(2).stores(contractSchemaV2).upgrade(async (tx) => {
      console.log("ContractMappingDB: upgrade to v2", networkId);
      await tx.table("list").clear();
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
    db = new ContractMappingDB(networkId);
    dbMap[networkId] = db;
  }
  if (!db.isOpen()) {
    await db.open();
  }
  return db;
};
const putData = (data) => getDB(data.id).then((db) => db.data.put(data));
const getData = (networkId) => getDB(networkId).then((db) => db.data.toArray());
const ContractMappingDB$1 = {
  putData,
  getData
};

const doLoadContractMapping = "doLoadContractMapping";

const storeId = "contractStore";
const contractMappings = ref(null);
const updateContractMapping = async () => {
  const _networkId = networkId.value;
  const dbEntries = await ContractMappingDB$1.getData(_networkId);
  if (dbEntries.length > 0) {
    contractMappings.value = dbEntries[0];
  }
};
const getContractProperty = (credOrAddress) => {
  if (contractMappings.value) {
    const cred = credOrAddress.startsWith("addr") ? getAddressCredentials(credOrAddress).paymentCred : credOrAddress;
    const mapping = contractMappings.value.list.find((entry) => entry.contractAddress === cred || entry.mintPolicyID === cred);
    if (mapping) {
      return contractMappings.value.properties[mapping.property] ?? null;
    }
  }
  return null;
};
const getContractMappingByAddresses = (addrList) => {
  const propertyList = [];
  if (addrList.length > 0) {
    for (const address of addrList) {
      const property = getContractProperty(address);
      if (property) {
        propertyList.push(property);
      }
    }
    if (propertyList.length === 0) {
      return propertyList;
    }
    propertyList.sort((a, b) => a.label.localeCompare(b.label, "en-US"));
    for (let i = propertyList.length - 1; i >= 0; i--) {
      const item = propertyList[i];
      const label = item.label.split(" ")[0];
      for (let k = 0; k < i; k++) {
        if (propertyList[k].label.startsWith(label)) {
          propertyList.splice(i, 1);
          break;
        }
      }
    }
  }
  return propertyList;
};
const getContractAddressesByLabel = (labelList) => {
  const addressList = [];
  const mapping = contractMappings.value;
  if (!mapping) {
    return addressList;
  }
  for (const label of labelList) {
    const item = label.split(" ")[0].toLowerCase();
    for (let i = 0; i <= mapping.properties.length; i++) {
      const property = mapping.properties[i];
      if (property && typeof property.label === "string" && property.label.toLowerCase().startsWith(item)) {
        const propertyList = mapping.list.filter((entry) => entry.property === i);
        for (const entry of propertyList) {
          if (entry.contractAddress) {
            addressList.push(entry.contractAddress);
          } else if (entry.mintPolicyID) {
            addressList.push(entry.mintPolicyID);
          }
        }
      }
    }
  }
  return addressList;
};
const load = async () => {
  await dispatchSignal(doLoadContractMapping);
  if (!contractMappings.value) {
    await updateContractMapping();
  }
};
addSignalListener(doInitApp, storeId, load);

export { ContractMappingDB$1 as C, getContractMappingByAddresses as a, getAddressBookEntryByAddress as b, onAddressBookEntryDeleted as c, doSelectAddressBookEntry as d, getAddressBookEntryByMode as e, getAddressBookEntryByName as f, getContractAddressesByLabel as g, deleteAddressBookEntry as h, addressBookNames as i, doLoadContractMapping as j, updateContractMapping as k, createIAddressBook as l, mergeAddressBook as m, addressBook as n, onAddressBookEntryUpdated as o, loadAddressBook as p, updateAddressBookEntry as u };
