import { bp as Dexie, D as computed, e as ref } from './index.js';

class GuardBlockListDB extends Dexie {
  entry;
  domain;
  allowlist;
  address;
  asset;
  info;
  constructor() {
    super("eternl-guard-blocklist");
    this.version(2).stores({
      entry: "++id, filename",
      domain: "id, *domain",
      allowlist: "id, *domain",
      address: "id, *address",
      asset: "id, *assets",
      info: "id"
    });
  }
}
let guardBlockListDB = null;
const getDB = async () => {
  let db = guardBlockListDB;
  if (!db) {
    db = new GuardBlockListDB();
    guardBlockListDB = db;
  }
  if (!db.isOpen()) {
    await db.open();
  }
  return db;
};
const bulkAddGuardReport = async (reports) => getDB().then((db) => {
  if (reports.r.length === 0) {
    return;
  }
  db.transaction("rw", [db.info, db.entry, db.domain, db.allowlist, db.asset, db.address], async (tx) => {
    await db.info.clear();
    await db.entry.clear();
    await db.domain.clear();
    await db.allowlist.clear();
    await db.asset.clear();
    await db.address.clear();
    await db.info.put({
      id: 1,
      timestamp: Date.now(),
      lastHash: reports.h
    });
    for (const report of reports.r) {
      let inserted = await db.entry.put({
        filename: report.filename,
        description: report.description
      });
      if (report.domains && report.domains.length > 0) {
        await db.domain.put({
          id: inserted,
          domain: report.domains
        });
      }
      if (report.allowlist && report.allowlist.length > 0) {
        await db.allowlist.put({
          id: inserted,
          domain: report.allowlist
        });
      }
      if (report.related_assets && report.related_assets.length > 0) {
        await db.asset.put({
          id: inserted,
          assets: report.related_assets
        });
      }
      if (report.associated_addresses && report.associated_addresses.length > 0) {
        await db.address.put({
          id: inserted,
          address: report.associated_addresses
        });
      }
    }
  });
});
const getLastImportInfo = () => getDB().then((db) => db.info.get(1));
const findDomain = (url) => getDB().then((db) => db.domain.where("domain").anyOf(url).toArray());
const isBlockedDomain = (url) => getDB().then((db) => db.domain.where("domain").equals(url).toArray().then((res) => res.length > 0));
const isAllowedDomain = (url) => getDB().then((db) => db.allowlist.where("domain").equals(url).toArray().then((res) => res.length > 0));
const findAsset = (asset) => getDB().then((db) => db.asset.where("assets").equals(asset).toArray());
const findAddress = (address) => getDB().then((db) => db.address.where("address").anyOf(address).toArray());
const getScamDomainList = () => getDB().then((db) => db.domain.toArray());
const getScamAddressesList = () => getDB().then((db) => db.address.toArray());
const getScamAssetList = () => getDB().then((db) => db.asset.toArray());
const GuardBlockListDB$1 = {
  bulkAddGuardReport,
  getLastImportInfo,
  isBlockedDomain,
  isAllowedDomain,
  findDomain,
  findAsset,
  findAddress,
  getScamAssetList,
  getScamDomainList,
  getScamAddressesList
};

const spamDomains = ref([]);
const spamAddress = ref([]);
const spamAssets = ref([]);
const useGuard = () => {
  const isDomainOnBlockList = async (urlToCheck) => {
    let url;
    try {
      url = new URL(urlToCheck);
    } catch (err) {
      return false;
    }
    let urlParts = url.hostname.split(".");
    let tld = "";
    let domain = "";
    let checkDomain = "";
    if (urlParts.length > 1) {
      tld = urlParts[urlParts.length - 1] ?? "";
      domain = urlParts[urlParts.length - 2] ?? "";
      checkDomain = domain + "." + tld;
    } else if (urlParts.length === 1) {
      domain = urlParts[urlParts.length - 1] ?? "";
      checkDomain = domain;
    }
    if (await GuardBlockListDB$1.isAllowedDomain(checkDomain)) {
      return false;
    }
    if (await GuardBlockListDB$1.isBlockedDomain(domain)) {
      return true;
    }
    while (urlParts.length > 0) {
      checkDomain = urlParts.join(".");
      if (await GuardBlockListDB$1.isBlockedDomain(checkDomain)) {
        return true;
      }
      urlParts.shift();
      if (urlParts.length === 0) {
        break;
      }
    }
    return false;
  };
  const isAddressOnBlockList = (address) => {
    return spamAddress.value.includes(address);
  };
  const isAssetOnBlockList = (asset) => spamAssets.value.includes(asset);
  const getScamAssetList = () => GuardBlockListDB$1.getScamAssetList();
  const cacheServerScamInfos = async () => {
    const guardDomains = await GuardBlockListDB$1.getScamDomainList();
    for (let domains of guardDomains ?? []) {
      for (let domain of domains.domain ?? []) {
        if (!spamDomains.value.includes(domain)) {
          spamDomains.value.push(domain);
        }
      }
    }
    const guardAssets = await GuardBlockListDB$1.getScamAssetList();
    for (let assets of guardAssets ?? []) {
      for (let asset of assets.assets ?? []) {
        if (!spamAssets.value.includes(asset)) {
          spamAssets.value.push(asset);
        }
      }
    }
    const guardAddress = await GuardBlockListDB$1.getScamAddressesList();
    for (let addresses of guardAddress ?? []) {
      for (let address of addresses.address ?? []) {
        if (!spamAddress.value.includes(address)) {
          spamAddress.value.push(address);
        }
      }
    }
  };
  const isSpamAsset = (asset) => {
    if (spamAssets.value.length === 0) ;
    return spamAssets.value.includes(asset.f);
  };
  const numSpamAssets = computed(() => spamAssets.value.length);
  const _spamAssets = computed(() => spamAssets.value);
  return {
    isDomainOnBlockList,
    isAddressOnBlockList,
    isAssetOnBlockList,
    getScamAssetList,
    spamAssets: _spamAssets,
    isSpamAsset,
    numSpamAssets,
    cacheServerScamInfos
  };
};

export { GuardBlockListDB$1 as G, useGuard as u };
