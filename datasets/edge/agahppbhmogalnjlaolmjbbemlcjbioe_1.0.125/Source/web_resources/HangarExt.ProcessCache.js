var HangarExt = HangarExt || {};

HangarExt._selectionSaveTimer = null;
HangarExt._shipMsrpRequestTimeout = 3000;
HangarExt._shipMsrpCacheTime = 10 * 60 * 1000; // 10 Minuten

HangarExt.GetPayloadActions = function(payload, cacheHash, hashOnly)
{
  var results = {
    targeted: 0,
    transfer: 0,
    pending: 0,
    added: 0
  };

  if (!payload || !payload.length) {
    HangarExt.Log('Hangar-Extension: RSI payload not available - using last known cache state');
    // Sollte kein payload vorhanden sein, wird der alte Hash verwendet um unnötiges neu Laden des Hangars zu vermeiden
    return results;
  }

  var actions = {};
  var keyActions = {
    'Buy-back by': false,
    'Upgrade applied': 'upgraded',
    'Created by': 'added',
    'Reclaimed by': 'removed',
    'Claimed as': 'transfer', // Kann 'removed' oder 'added' sein, abhängig vom Nutzernamen, da CIG den gleichen String verwendet
    'Consumed by': 'removed',
    'Gifted to': 'gifted',
    'Gift cancelled': 'gift_cancelled'
  };

  var lastKnown = false;
  var undetermined = false;
  var $pledgeLog = $('<div>').html(payload);
  $('.pledge-log-entry p', $pledgeLog).each(function() {

    var text = $.trim($(this).text());
    var minuteMatch = text.match(/^.+?:(\d{2})\s*(?:am|pm)?\s+-\s+/i);
    var pledgeIdMatch = text.match(/#(\d+)/);
    if (!minuteMatch || !pledgeIdMatch) {
      return;
    }
    var minute = minuteMatch[1];
    var pledgeId = pledgeIdMatch[1];
    // Unbekannte Beschreibung = konservativ als neuer/zu ladender Eintrag
    var actionString = 'added';
    for (var key in keyActions) {
      if (text.indexOf(key) !== -1) {
        actionString = keyActions[key];
        break;
      }
    }
    // Rückkäufe erzeugen zwei Einträge, einmal mit der alten und einmal mit der neuen Pledge ID, daher muss dieser String ignoriert werden
    if (!actionString) {
      return;
    }
    // Sicherung gegen mehrere angewandte Upgrades innerhalb einer Minute auf die gleiche Pledge ID
    var actionKey = pledgeId;
    if (actionString === 'upgraded') {
      var upgradeIdMatch = text.match(/Upgrade applied:\s+#(\d+)/);
      if (upgradeIdMatch) {
        actionKey += '>' + upgradeIdMatch[1];
      }
    }
    // Prüfen ob es sich um den zuletzt bekannten hash handelt
    var hash = actionString + '|' + actionKey + '|' + minute;
    if (hash === cacheHash) {
      lastKnown = true;
      // jQuery each abbrechen, ausgenommen es liegt eine nicht eindeutig bestimmbare Aktion in Form einer "transfer" Flag vor
      if (!undetermined) {
        return false;
      }
    }

    if (!lastKnown && !results.latest_hash) {
      results.latest_hash = hash;
    }
    // jQuery each abbrechen, beim refresh wird nur der neuste Einträg benötigt, sollte sich dieser Verändert haben zwischenzeitlich
    if (hashOnly) {
      return false;
    }

    var transferred = false;
    var previous = actions[pledgeId];
    if (previous) {
      // Existiert nicht länger, keine älteren Ereignisse mehr verarbeiten
      if (previous.removed) {
        return;
      }
      // Handling, wiederholtes giften, abbrechen, nur das neuste Ereignis zählt
      if (previous.gifted || previous.gift_cancelled) {
        if (actionString === 'gifted' || actionString === 'gift_cancelled') {
          return;
        }
      }
      // Umdeklarierung der "transfer" Flag, da das Item nun nachvollziebar durch eine andere Person angenommen wurde
      if (previous.transfer && actionString === 'gifted') {
        actions[pledgeId] = {};
        results.transfer--;
        results.pending--;
        results.added--;
        transferred = true;
        actionString = 'removed';
      }
    }

    // Nur nachträgliche Änderungen der "transfer" Flag zulassen, wenn bereits der zuletzt bekannte Eintrag gefunden wurde
    if (lastKnown && !transferred) {
      return;
    }

    actions[pledgeId] = actions[pledgeId] || {};
    actions[pledgeId][actionString] = true;

    var action = actions[pledgeId];
    if (!action.pending && (action.added || action.transfer || action.upgraded || action.gift_cancelled)) {
      action.pending = true;
      results.pending++;
      // Items werden zuerst im Hangar-Log und danach im Web-Hangar eingetragen, sporadisch kann es
      // zu Verzögerungen kommen, weshalb das System nach Einträgen sucht die noch nicht existieren
      if (action.added) {
        // "added" zählt alle erwarteten neuen Einträge auf der ersten Seite
        results.added++;
      }
      else if (action.transfer) {
        // inklusive transfer, da angenommene Gifts ebenfalls dort erscheinen können
        results.added++;
        // "transfer" wird separat gezählt, um den RSI Deployment Delay für Claimed-as Fälle auszuschließen
        results.transfer++;
        // Sonderhandhabe für eine nicht eindeutig bestimmbare Aktion
        undetermined = true;
      }
      else if (action.upgraded || action.gift_cancelled) {
        results.targeted++;
      }
    }
  });

  results.tasks = lastKnown ? Object.keys(actions).length : 0;
  results.items = actions;
  return results;
};

HangarExt.ProcessCachedEntries = function(cache, payload)
{
  var cacheHash = cache.cacheHash || '';
  var cacheCount = cache.cacheCount || 0;
  var hasCache = cacheCount > 0;
  var batchSize = cacheCount > 10 ? (10 -1) : -1;
  var synchedInvalidation = hasCache && ((cache.cacheToken || '') !== HangarExt._cacheToken);
  var localInitiatedRefresh = hasCache && (cache.localInitiatedRefresh === true);
  var cacheRefresh = synchedInvalidation || localInitiatedRefresh;
  var hashOnly = !hasCache || cacheRefresh;
  var actions = HangarExt.GetPayloadActions(payload, cacheHash, hashOnly);
  // Puffern, aktuell nur für Cache Speicherung verwendet
  HangarExt._cacheHash = actions.latest_hash || cacheHash;
  HangarExt._cacheCount = cacheCount;
  // Puffern der zuletzt aktiven Auswahl
  HangarExt._selectedPledgeIds = cache.cacheSelected || {};
  // Keine Änderungen im Hangar festgestellt, Cache kann 1:1 übernommen werden
  if (!cacheRefresh && hasCache && cacheHash == HangarExt._cacheHash) {
    HangarExt._loadingFromWebsite = false;
    HangarExt._loadingFromCache = true;
    //var itemsPerPage = HangarExt._itemsPerPage != 9999 ? HangarExt._itemsPerPage : 10;
    for (var i = 0; i < cacheCount; i++) {
      HangarExt.ParsePledge.apply($(cache['cacheEntry' + i])[0]);
      if (batchSize == i) {
        //batchSize = cacheCount > itemsPerPage ? (itemsPerPage -1) : i;
        HangarExt.Render();
        //HangarExt.RefreshPager();
      }
    }
    HangarExt.FinalizeBulkUI();
  }
  else {
    var preloadedFirstPage = false;
    // Änderungen im Hangar festgestellt, deterministisches Handling
    if (!cacheRefresh && hasCache && actions.tasks) {
      var expectedOnFirstPage = false;
      // PreloadForCache, verarbeitet nur die erste Hangarseite wenn diese bereits offen ist, wegen konsistenz der Bulk UI  Informationsanzeige
      if (actions.pending && HangarExt.PreloadForCache()) {
        // Der Hangar hat nur eine Seite, alle Vorgänge wurden bereits abgeschlossen
        if (!HangarExt._loadingFromWebsite) {
          return;
        }
        preloadedFirstPage = true;
        // Verzögerte Bereitstellung durch RSI berücksichtigen
        expectedOnFirstPage = actions.added > 0 && actions.added <= 10;
        // Prüfen ob alle gefundenen neuen oder aktualisierten Inhalte sich auf der ersten Seite wiederfinden
        $.each(HangarExt._raw, (index, item) => {
          var pledge_id = parseInt(($('.js-pledge-id', item).val() || '').trim(), 10);
          var action = actions.items[pledge_id];
          if (action) {
            if (action.added) {
              actions.added--;
              actions.pending--;
              actions.tasks--;
            }
            else if (action.transfer) {
              actions.added--;
              actions.transfer--;
              actions.pending--;
              actions.tasks--;
            }
            else if (action.upgraded || action.gift_cancelled) {
              actions.targeted--;
              actions.pending--;
              actions.tasks--;
            }
            else if (action.gifted) {
              actions.tasks--;
            }
            actions.items[pledge_id].preloaded = true;
          }
          else {
            actions.items[pledge_id] = {
              preloaded: true
            };
          }
        });
        // Sollte es sich um einen nachträglich patchbaren Eintrag handeln, Handling ermöglichen
        if (actions.pending === 1 && actions.pending === actions.targeted) {
          actions.pending = 0;
        }
        // ProcessPage rendert bereits die ersten 10 Einträge nach der Verarbeitung, ist somit nicht erneut nötig
        batchSize = -1;
      }
      // Verzögerte Bereitstellung von hinzugefügten Einträgen durch RSI berücksichtigen
      var rsiDeploymentDelay = expectedOnFirstPage && actions.added > 0 && actions.added === actions.pending && actions.transfer === 0;
      // Die restlichen Tasks ausführen sowie die vorgeladenen ausfiltern
      if (!actions.pending || rsiDeploymentDelay) {
        var items = 0;
        var targetedAction = null;
        for (var i = 0; i < cacheCount; i++) {
          var item = $(cache['cacheEntry' + i])[0];
          var pledge_id = parseInt(($('.js-pledge-id', item).val() || '').trim(), 10);
          var action = actions.items[pledge_id];
          if (action) {
            if (action.preloaded) {
              items++;
              continue;
            }
            else if (action.removed || action.transfer) {
              actions.tasks--;
              continue;
            }
            else if (action.gifted) {
              actions.tasks--;
              item = HangarExt.ApplyGiftedPatch(item);
            }
            else if (action.upgraded || action.gift_cancelled) {
              action.pledgeId = pledge_id;
              action.pledgePage = Math.ceil((items +1) /10);
              targetedAction = action;
            }
          }
          items++;
          item.pledge_id = pledge_id;
          HangarExt.ParsePledge.apply(item);
          if (batchSize == items) {
            HangarExt.Render();
          }
        }

        if (actions.tasks <= 0 || rsiDeploymentDelay) {
          // Flag zurücksetzen
          HangarExt._loadingFromWebsite = false;
          // Finalisieren
          if (rsiDeploymentDelay) {
            HangarExt._cacheHash = cacheHash;
            HangarExt.Log('Hangar-Extension: Delayed RSI item deployment detected - full recaching postponed');
          }
          else {
            HangarExt.SaveCache();
            HangarExt.Log('Hangar-Extension: Incremental cache update completed');
          }
          HangarExt.FinalizeBulkUI();
          return;
        }
        else if (targetedAction && targetedAction.pledgePage > 1 && actions.tasks == 1) {
            HangarExt.Log('Hangar-Extension: Starting targeted cache update for pledge ' + targetedAction.pledgeId + ' on page ' + targetedAction.pledgePage);
            HangarExt.LoadPage(targetedAction.pledgePage, targetedAction.pledgeId);
            return;
        }
      }
      HangarExt.Log('Hangar-Extension: Incremental cache update not possible - starting full cache rebuild');
    }
    // Hangar muss komplett neu erfasst werden
    HangarExt._loadingFromCache = false;
    HangarExt._refreshingHangar = hasCache;
    HangarExt._userInitiatedRefresh = cacheRefresh;
    HangarExt._synchedInvalidation = synchedInvalidation && !localInitiatedRefresh;
    HangarExt.LoadPage(preloadedFirstPage ? 2 : 1);
  }
};

HangarExt.SaveCache = function()
{
  var oldCount = HangarExt._cacheCount || 0;
  var count = HangarExt._raw.length;
  var removeKeys = [];
  var cacheItems = {};

  //HangarExt._cacheCount = count;

  $.each(HangarExt._raw, (index, item) => {
    cacheItems['cacheEntry' + index] = item;
  });

  delete HangarExt._raw;

  cacheItems.cacheCount = count;
  cacheItems.cacheHash = HangarExt._cacheHash;
  cacheItems.cacheToken = HangarExt._cacheToken;

  for (var i = count; i < oldCount; i++) {
    removeKeys.push('cacheEntry' + i);
  }
  removeKeys.push('localInitiatedRefresh');

  // Fix race condition: clear() läuft asynchron und konnte sporadisch den bereits per set() geschriebenen Cache löschen
  //chrome.storage.local.clear();
  chrome.storage.local.set(cacheItems, function() {
    chrome.storage.local.remove(removeKeys);
  });
}

HangarExt.CleanupSelectedPledgeIdCache = function()
{
  var selected = HangarExt._selectedPledgeIds || {};
  var found = HangarExt._foundPledgeIds || {};
  var changed = false;
  for (var pledgeId in selected) {
    if (!found[pledgeId]) {
      delete selected[pledgeId];
      changed = true;
    }
  }
  if (changed) {
    HangarExt.SaveSelectedPledgeIdCache();
  }
};

HangarExt.SaveSelectedPledgeIdCache = function()
{
  clearTimeout(HangarExt._selectionSaveTimer);

  HangarExt._selectionSaveTimer = setTimeout(function() {
    if (!Object.keys(HangarExt._selectedPledgeIds).length) {
      chrome.storage.local.remove('cacheSelected');
    }
    else {
      chrome.storage.local.set({
        'cacheSelected': HangarExt._selectedPledgeIds
      });
    }
  }, 1000);
};

HangarExt.ResetSelectedPledgeIdCache = function()
{
  if (Object.keys(HangarExt._selectedPledgeIds).length) {
    HangarExt._selectedPledgeIds = {};
    clearTimeout(HangarExt._selectionSaveTimer);
    chrome.storage.local.remove('cacheSelected');
  }
}

HangarExt.LoadShipMsrpCache = function(cache)
{
  if (!HangarExt._setting.ShowUSDValues || !HangarExt._setting.ShowSavings || cache.localInitiatedRefresh === true) {
    return;
  }
  var now = Date.now();
  if (cache.cacheShipMsrp && cache.cacheShipMsrpTime && now - cache.cacheShipMsrpTime < HangarExt._shipMsrpCacheTime) {
    HangarExt._shipMsrp = cache.cacheShipMsrp;
    HangarExt._shipMsrpLoaded = true;
  }
};

HangarExt.SaveShipMsrpCache = function()
{
  chrome.storage.local.set({
    'cacheShipMsrp': HangarExt._shipMsrp,
    'cacheShipMsrpTime': Date.now()
  });
};

HangarExt.RebuildCache = function() {
  HangarExt.Log('Hangar-Extension: Targeted cache update failed - entry not found, rebuilding cache');
  chrome.storage.local.remove('cacheHash', function() {
    window.location.reload();
  });
};

HangarExt.ApplyGiftedPatch = function(item)
{
  var $item = $(item);
  var $availability = $item.find('.availability');

  if (!$availability.length || $availability.hasClass('red')) {
    return item;
  }

  $availability
    .addClass('red')
    .text('Gifted');

  var $giftButton = $item.find('.js-gift');
  if ($giftButton.length) {
    $giftButton
      .removeClass('js-gift gift')
      .addClass('js-cancel rm');

    $giftButton.find('.label').text('Cancel Gift');

    $giftButton
      .siblings('.shadow-button')
      .remove();
  }

  return $item[0];
};

HangarExt.PatchTargetedRawEntry = function(item)
{
  for (var i = 0; i < HangarExt._raw.length; i++) {
    var rawItem = $(HangarExt._raw[i])[0];
    var pledge_id = parseInt(($('.js-pledge-id', rawItem).val() || '').trim(), 10);
    if (pledge_id == HangarExt._targetedPledgeId) {
      HangarExt._raw[i] = item.outerHTML;
      //HangarExt.Log('Hangar-Extension: Targeted cache entry updated for pledge ' + HangarExt._targetedPledgeId);
      return true;
    }
  }
  return false;
};

HangarExt.PatchTargetedInventoryEntry = function(item)
{
  for (var i = 0; i < HangarExt._inventory.length; i++) {
    if (HangarExt._inventory[i].pledge_id == HangarExt._targetedPledgeId) {
      HangarExt._inventory[i] = item;
      //HangarExt.Log('Hangar-Extension: Targeted inventory entry updated for pledge ' + HangarExt._targetedPledgeId);
      return true;
    }
  }
  return false;
};