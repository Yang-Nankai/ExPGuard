var HangarExt = HangarExt || {};

HangarExt._localSettingsSaveTimer = null;

HangarExt.GetSyncStorage = function(callback)
{
  chrome.storage.sync.get(null, function(settings) {
    if (typeof callback === 'function') {
      callback.call(this, settings);
    }
  });
};

HangarExt.GetLocalStorage = function(callback)
{
  chrome.storage.local.get(null, function(storage) {
    if (typeof callback === 'function') {
      callback.call(this, storage);
    }
  });
};

HangarExt.ApplySyncSettings = function(storage)
{
  var storageVersion = 1;

  storage = storage || {};
  HangarExt = HangarExt || {};

  HangarExt._cacheToken = storage.cacheToken || '';
  HangarExt._sortingMethod = storage.sortingMethod || 'Purchased';
  HangarExt._itemsPerPage = storage.itemsPerPage || 25;

  var defaultValue = storage.initialized ? false : true;
  HangarExt._setting = HangarExt._setting || {};
  HangarExt._setting.ShowPledgeId = storage.settingShowPledgeId || defaultValue;
  HangarExt._setting.ShowBasePledge = storage.settingShowBasePledge || defaultValue;
  HangarExt._setting.ShowProductionState = storage.settingShowProductionState || defaultValue;
  HangarExt._setting.ShowUSDValues = storage.settingShowUSDValues || defaultValue;
  HangarExt._setting.ShowSavings = storage.settingShowSavings || false;
  HangarExt._setting.ShowOnlyUsableItemCount = storage.settingShowOnlyUsableItemCount || defaultValue;
  HangarExt._setting.ShowAllItemEntries = storage.settingShowAllItemEntries || false;

  if (storage.initialized) {
    HangarExt.SyncStorageCleanup(storage, storageVersion);
  }
  else {
    // Nur nötig, falls der Nutzer die Optionen öffnet, während der Hangar noch
    // eingelesen wird, das direkt die tatsächlich geltenden Werte angezeigt werden
    chrome.storage.sync.set({
      // related
      initialized: true,
      storageVersion: storageVersion,
      // settings
      settingShowPledgeId: true,
      settingShowBasePledge: true,
      settingShowUSDValues: true,
      settingShowProductionState: true,
      settingShowOnlyUsableItemCount: true,
      settingShowAllItemEntries: false
    });
  }
}

HangarExt.ApplyLocalSettings = function(storage)
{
  var storageVersion = 1;

  storage = storage || {};
  HangarExt = HangarExt || {};

  HangarExt._filterType = storage.filterType || 'None';
  HangarExt._searchTerm = storage.filterSearch || '';
  HangarExt._cachedSearchTerm = !!HangarExt._searchTerm.length;

  HangarExt._filter = HangarExt._filter || {};
  HangarExt._filter.LTI = storage.filterLTI || '';
  HangarExt._filter.Giftable = storage.filterGiftable || '';
  HangarExt._filter.Gifted = storage.filterGifted || '';
  HangarExt._filter.Meltable = storage.filterMeltable || '';
  HangarExt._filter.Upgraded = storage.filterUpgraded || '';
  HangarExt._filter.Valuable = storage.filterValuable || '';
  HangarExt._filter.Selected = storage.filterSelected || '';
  HangarExt._filter.FlightReady = storage.filterFlightReady || '';

  HangarExt.LocalStorageCleanup(storage, storageVersion);
}

HangarExt.SaveSyncSetting = function(key, value)
{
  var data = {};
  data[key] = value;

  chrome.storage.sync.set(data);
};

HangarExt.SaveLocalSetting = function(key, value)
{
  HangarExt._pendingLocalSet = HangarExt._pendingLocalSet || {};
  HangarExt._pendingLocalRemove = HangarExt._pendingLocalRemove || {};

  if (value === '') {
    delete HangarExt._pendingLocalSet[key];
    HangarExt._pendingLocalRemove[key] = true;
  }
  else {
    delete HangarExt._pendingLocalRemove[key];
    HangarExt._pendingLocalSet[key] = value;
  }

  clearTimeout(HangarExt._localSettingsSaveTimer);

  HangarExt._localSettingsSaveTimer = setTimeout(function() {
    var setData = HangarExt._pendingLocalSet;
    var removeKeys = Object.keys(HangarExt._pendingLocalRemove);

    HangarExt._pendingLocalSet = {};
    HangarExt._pendingLocalRemove = {};

    if (Object.keys(setData).length) {
      chrome.storage.local.set(setData, function() {
        if (removeKeys.length) {
          chrome.storage.local.remove(removeKeys);
        }
      });
    }
    else if (removeKeys.length) {
      chrome.storage.local.remove(removeKeys);
    }
  }, 1000);
};

HangarExt.RemoveLocalSettings = function(keys)
{
  chrome.storage.local.remove(keys);
};

HangarExt.SyncStorageCleanup = function(storage, currentVersion)
{
  var storageVersion = storage.storageVersion || 0;
  if (storageVersion >= currentVersion) {
    return;
  }

  var allowedKeys = [
    // related
    'initialized',
    'storageVersion',
    // cache
    'cacheToken',
    // view
    'sortingMethod',
    'itemsPerPage',
    // settings
    'settingShowPledgeId',
    'settingShowBasePledge',
    'settingShowProductionState',
    'settingShowUSDValues',
    'settingShowSavings',
    'settingShowOnlyUsableItemCount',
    'settingShowAllItemEntries'
  ];

  var removeKeys = [];
  for (var key in storage) {
    if (allowedKeys.indexOf(key) === -1) {
      removeKeys.push(key);
      //delete storage[key];
    }
  }

  if (removeKeys.length) {
    chrome.storage.sync.remove(removeKeys, function() {
      chrome.storage.sync.set({
        storageVersion: currentVersion
      });
      HangarExt.Log('Hangar-Extension: Removed obsolete sync storage keys: ' + removeKeys.join(', '));
    });
  }
  else {
    chrome.storage.sync.set({
      storageVersion: currentVersion
    });
  }
};

HangarExt.LocalStorageCleanup = function(storage, currentVersion)
{
  var storageVersion = storage.storageVersion || 0;
  if (storageVersion >= currentVersion) {
    return;
  }

  var allowedKeys = [
    // related
    'storageVersion',
    // cache
    'cacheCount',
    'cacheHash',
    'cacheToken',
    'cacheSelected',
    'cacheShipMsrp',
    'cacheShipMsrpTime',
    // filter - drop down + search
    'filterType',
    'filterSearch',
    // filter - buttons
    'filterLTI',
    'filterGiftable',
    'filterGifted',
    'filterMeltable',
    'filterUpgraded',
    'filterValuable',
    'filterSelected',
    'filterFlightReady'
  ];

  var removeKeys = [];
  for (var key in storage) {
    if (allowedKeys.indexOf(key) === -1 && !/^cacheEntry\d+$/.test(key)) {
      removeKeys.push(key);
    }
  }

  if (removeKeys.length) {
    chrome.storage.local.remove(removeKeys, function() {
      chrome.storage.local.set({
        storageVersion: currentVersion
      });
      HangarExt.Log('Hangar-Extension: Removed obsolete local storage keys: ' + removeKeys.join(', '));
    });
  }
  else {
    chrome.storage.local.set({
      storageVersion: currentVersion
    });
  }
};