var showPledgeId = document.getElementById('showPledgeId');
var showBasePledge = document.getElementById('showBasePledge');
var showProductionState = document.getElementById('showProductionState');
var showUSDValues = document.getElementById('showUSDValues');
var showSavings = document.getElementById('showSavings');
var showOnlyUsableItemCount = document.getElementById('showOnlyUsableItemCount');
var showAllItemEntries = document.getElementById('showAllItemEntries');
var initialSettings = {};
var settingsChanged = false;
var reloadMessageSent = false;

// Load current settings and reflect them in the toggles
chrome.storage.sync.get(null, function(settings) {
  initialSettings = {
    settingShowPledgeId: settings.settingShowPledgeId || false,
    settingShowBasePledge: settings.settingShowBasePledge || false,
    settingShowProductionState: settings.settingShowProductionState || false,
    settingShowUSDValues: settings.settingShowUSDValues || false,
    settingShowSavings: settings.settingShowSavings || false,
    settingShowOnlyUsableItemCount: settings.settingShowOnlyUsableItemCount || false,
    settingShowAllItemEntries: settings.settingShowAllItemEntries || false
  };
  showPledgeId.checked = initialSettings.settingShowPledgeId;
  showBasePledge.checked = initialSettings.settingShowBasePledge;
  showProductionState.checked = initialSettings.settingShowProductionState;
  showUSDValues.checked = initialSettings.settingShowUSDValues;
  showSavings.checked = initialSettings.settingShowSavings;
  showOnlyUsableItemCount.checked = initialSettings.settingShowOnlyUsableItemCount;
  showAllItemEntries.checked = initialSettings.settingShowAllItemEntries;
});

function updateChangedState() {
  settingsChanged =
    showPledgeId.checked !== initialSettings.settingShowPledgeId ||
    showBasePledge.checked !== initialSettings.settingShowBasePledge ||
    showProductionState.checked !== initialSettings.settingShowProductionState ||
    showUSDValues.checked !== initialSettings.settingShowUSDValues ||
    showSavings.checked !== initialSettings.settingShowSavings ||
    showOnlyUsableItemCount.checked !== initialSettings.settingShowOnlyUsableItemCount ||
    showAllItemEntries.checked !== initialSettings.settingShowAllItemEntries;
}

function saveSetting(key, value) {
    var update = {};
    update[key] = value;
    chrome.storage.sync.set(update);
    updateChangedState();
}

showPledgeId.addEventListener('change', function() {
  saveSetting('settingShowPledgeId', this.checked);
});

showBasePledge.addEventListener('change', function() {
  saveSetting('settingShowBasePledge', this.checked);
});

showProductionState.addEventListener('change', function() {
  saveSetting('settingShowProductionState', this.checked);
});

//showUSDValues.addEventListener('change', function() { saveSetting('settingShowUSDValues', this.checked); });
showUSDValues.addEventListener('change', function() {
  saveSetting('settingShowUSDValues', this.checked);
  if (!this.checked && showSavings.checked) {
    showSavings.checked = false;
    saveSetting('settingShowSavings', false);
  }
});

//showSavings.addEventListener('change', function() { saveSetting('settingShowSavings', this.checked); });
showSavings.addEventListener('change', function() {
  if (this.checked && !showUSDValues.checked) {
    showUSDValues.checked = true;
    saveSetting('settingShowUSDValues', true);
  }
  saveSetting('settingShowSavings', this.checked);
});

showOnlyUsableItemCount.addEventListener('change', function() {
  saveSetting('settingShowOnlyUsableItemCount', this.checked);
});

showAllItemEntries.addEventListener('change', function() {
  saveSetting('settingShowAllItemEntries', this.checked);
});

document.getElementById('refreshHangar').addEventListener('click', function() {
  var button = this;
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var tab = tabs && tabs[0];
    if (tab && tab.url && /^https:\/\/(www\.)?robertsspaceindustries\.com\/(?:[^\/]+\/)?account\/pledges(?:[?#].*)?$/.test(tab.url)) {
      //button.textContent = 'Rebuilding Hangar Cache...';
      var token = Date.now().toString();
      chrome.storage.sync.set({
        cacheToken: token
      }, function() {
        chrome.storage.local.set({
          localInitiatedRefresh: true
        }, function() {
          chrome.tabs.reload(tab.id);
          window.close();
        });
      });
    }
    else {
      console.log('Hangar-Extension: The RSI Hangar must be the active tab for cache rebuilding');
      button.disabled = true;
      button.textContent = 'RSI Hangar tab required';
    }
  });
});

document.getElementById('closeSettings').addEventListener('click', function() {
  window.close();
});

document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden' && settingsChanged && !reloadMessageSent) {
      reloadMessageSent = true;
      chrome.runtime.sendMessage({type: 'reloadPledgeTabs'});
    }
});