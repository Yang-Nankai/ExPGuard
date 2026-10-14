var HangarExt = HangarExt || {};
var RSI = RSI || {};

HangarExt.Initialize = function()
{
  // Nötig bei einer durch RSI erzwungenen Seitenneueinladung
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

  // Nur nötig, falls RSI ebenfalls ein Handling dafür bereitstellt
  //setTimeout(function() {
  //  window.scrollTo(0, 0);
  //}, 0);

  // Element where we display the pledges
  HangarExt.$list = null;

  // Inventory containing all pledges
  HangarExt._inventory = [];

  // Schiffsmatrix von der RSI Webseite laden: https://robertsspaceindustries.com/ship-matrix/index
  $.ajax({
    url: '/ship-matrix/index',
    method: 'GET',
    dataType: 'json',
    success: (response) => {

      var shipMatrixOverrides = $.extend({}, HangarExt._shipMatrixOverrides);
      var manufacturerShortName = {
        AEGS: 'Aegis',
        ANVL: 'Anvil',
        ARGO: 'ARGO',
        BANU: 'Banu',
        CNOU: 'CNOU',
        CRUS: 'Crusader',
        DRAK: 'Drake',
        ESPR: 'Esperia',
        GAMA: 'Gatac',
        GREY: "Grey's",
        GRIN: 'Greycat',
        KRIG: 'Kruger',
        MISC: 'MISC',
        MRAI: 'Mirai',
        ORIG: 'Origin',
        RSI: 'RSI',
        TMBL: 'Tumbril',
        VNCL: 'Vanduul',
        XNAA: 'Aopoa'
      };

      HangarExt._shipMatrix = response.data
        .map((ship) => {
          var rsiShip = {
            name: ship.name
              .replace(/^Aegis /i, '')
              .replace(/^Anvil /i, '')
              .replace(/^Aopoa /i, '')
              .replace(/^Argo /i, '')
              .replace(/^Banu /i, '')
              .replace(/^CNOU /i, '')
              .replace(/^Crusader /i, '')
              .replace(/^Drake /i, '')
              .replace(/^Esperia /i, '')
              .replace(/^Gatac /i, '')
              .replace(/^Greycat Industrial /i, '')
              .replace(/^Greycat /i, '')
              .replace(/^Grey's /i, '')
              .replace(/^Kruger /i, '')
              .replace(/^MISC /i, '')
              .replace(/^Mirai /i, '')
              .replace(/^Origin /i, '')
              .replace(/^RSI /i, '')
              .replace(/^Tumbril /i, '')
              .replace(/^Vanduul /i, '')
              .replace(/^Xi'an /i, '')
              .trim(),
            thumbnail: ship.media[0].images.heap_infobox,
            fullsize: ship.media[0].images.hub_small,
            manufacturer: {
              code: ship.manufacturer.code,
              name: ship.manufacturer.name,
              shortName: manufacturerShortName[ship.manufacturer.code] || ship.manufacturer.code
            },
            status: ship.production_status,
            focus: ship.focus,
            url: ship.url,
          };
          // Nötig als unveränderte eindeutige Kennung zur Preisabfrage
          rsiShip.key = rsiShip.name;
          // Patchen und Ergänzen der Daten der Schiffsmatrix
          var overrides = HangarExt._shipMatrixOverrides[rsiShip.name];
          delete shipMatrixOverrides[rsiShip.name];

          return $.extend({}, rsiShip, overrides);
        })

        .concat($.map(shipMatrixOverrides, (ship, key) => {
          if (ship.name == undefined) ship.name = key;
          return ship;
        }))

        .sort((a, b) => {
          return (b.name || '').length - (a.name || '').length;
        });

        // Falls noch alphabetisch benötigt, sollte jedoch nicht
        //.sort((a, b) => {
        //  ((b.name || '').length - (a.name || '').length) ||
        //  (a.name || '').localeCompare(b.name || '')
        //});

      HangarExt.GetSyncStorage(function(syncStorage)
      {
        HangarExt.GetLocalStorage(function(localStorage)
        {
          var $lists = $('.list-items');
          if ($lists.length == 1) {
            HangarExt.$list = $($lists[0]);
            HangarExt.$list.addClass('js-inventory');
            $lists = undefined;

            HangarExt.ApplySyncSettings(syncStorage);
            HangarExt.ApplyLocalSettings(localStorage);
            HangarExt.LoadShipMsrpCache(localStorage);

            HangarExt.BulkUI();
            HangarExt.DrawUI();
            HangarExt.RestoreSearchTerm();
            HangarExt.UpdateStatus(0);

            RSI.Api.Account.pledgeLog((payload) => {
              // Kann sporadisch auftreten, wenn die RSI-Seite während Verkaufsaktionen stark ausgesetet ist
              if (HangarExt._pledgeLogHandled) {
                HangarExt.Log('Hangar-Extension: Received duplicate pledgeLog callback from RSI - ignored');
                return;
              }
              HangarExt._pledgeLogHandled = true;
              HangarExt.ProcessCachedEntries(localStorage, payload.data.rendered);
            });
          } else {
            HangarExt.Log('Hangar-Extension: Error locating inventory');
          }
        });
      });

      HangarExt.ScrollToTop = function()
      {
        if ($(window).scrollTop() >= 150) {
          $('html, body')
            .stop(true, true)
            .animate({
              scrollTop: 0
            }, 800);
        }
      }

      $('.page-wrapper').on('dblclick', function(event) {
        var target = event.target;
        if (target && target.nodeType !== 1) {
          target = target.parentElement;
        }
        // Interaktive / eigene UI Bereiche ignorieren
        if ($(target).closest(
          'a, button, input, textarea, select, .sidenav ul, .js-bulk-ui, .inner-content'
        ).length) {
          return;
        }
        HangarExt.ScrollToTop();
      });

      $('.page-wrapper').on('click', '.js-expand-arrow', function() {
        setTimeout(function() {
          HangarExt.UpdateResetState();
        }, 0);
      });

      // Fix: Beim automatisierten Hochscrollen via Doppelklick werden sporadisch Texte markiert
      $('.page-wrapper').on('selectstart', function(event) {
          var target = event.target;
          if (target && target.nodeType !== 1) {
            target = target.parentElement;
          }
          // Interaktive / eigene UI Bereiche ignorieren
          if ($(target).closest(
            'a, button, input, textarea, select, .sidenav ul, .js-bulk-ui, .inner-content'
          ).length) {
            return;
          }
          event.preventDefault();
          // Bestehende Textauswahl beim Klick ausserhalb weiterhin entfernen
          var selection = window.getSelection && window.getSelection();
          if (selection && selection.rangeCount > 0) {
            selection.removeAllRanges();
          }
        });

      // Fix: Geklickte Schiffs-/Upgrade-Links bleiben beim Zurückkehren in den Tab markiert
      $(document).on('visibilitychange', function() {
          if (!document.hidden && window.getSelection) {
            window.getSelection().removeAllRanges();
          }
        });
    }
  });
}

HangarExt.Log = function()
{
  console.log.apply(this, Array.from(arguments));
}

HangarExt.WaitForjQuery = function(attempts)
{
  attempts = attempts || 0;
  if (typeof $ === 'function') {
    if (HangarExt._waitForjQueryTimer) {
      clearTimeout(HangarExt._waitForjQueryTimer);
      HangarExt._waitForjQueryTimer = null;
    }
    HangarExt.Initialize();
  }
  else if (attempts >= 100) {
    HangarExt.Log('Hangar-Extension: jQuery not available');
  }
  else {
    // Im Regelfall ist jQuery erst 1-2ms verzögert verfügbar
    var delay = 1;
    if (attempts >= 50) {
      delay = 50;
    }
    else if (attempts >= 20) {
      delay = 10;
    }
    if (!HangarExt._waitForjQueryTimer) {
      window.addEventListener('beforeunload', function() {
        if (HangarExt._waitForjQueryTimer) {
          clearTimeout(HangarExt._waitForjQueryTimer);
          HangarExt._waitForjQueryTimer = null;
        }
      });
    }
    HangarExt._waitForjQueryTimer = setTimeout(function() {
      try {
        HangarExt.WaitForjQuery(attempts + 1);
      }
      catch (e) {
        // Kontext während des Neuladens, Aktualisierens oder der Navigation ungültig geworden
      }
    }, delay);
  }
};

HangarExt._initCount = HangarExt._initCount || 0;

if (HangarExt._initCount++ === 0) {
  HangarExt.WaitForjQuery();
}

// StoreCredits abrufen
HangarExt._storeCredits = 0.00;
HangarExt.LoadStoreCredits = function(callback)
{
  var url = '/en/account/dashboard';
  $.get(url, function(html)
  {
    try {
      var doc = new DOMParser().parseFromString(html, 'text/html');
      var script = doc.querySelector('script[data-platform-client-props]');
      if (script) {
        var raw = script.getAttribute('data-platform-client-props');
        if (raw) {
          var decoded = new DOMParser()
            .parseFromString(raw, 'text/html')
            .documentElement
            .textContent;

          var data = JSON.parse(decoded);
          var credits = (((data || {}).routerParams || {}).account || {}).creditsData || [];
          for (var i = 0; i < credits.length; i++) {
            if (credits[i].variant === 'store') {
              HangarExt._storeCredits = credits[i].value / 100;
              break;
            }
          }
        }
      }
    }
    catch (e) {
      HangarExt.Log('Hangar-Extension: Failed to parse store credits');
    }
    if (callback) {
      callback();
    }
  })
  .fail(function() {
    HangarExt.Log('Hangar-Extension: Error loading store credits');
    if (callback) {
      callback();
    }
  });
};

// Schiffspreise abrufen
HangarExt._shipMsrp = {
  // Promotions - ohne wirklichen Preis
  //'C8 Pisces': 0,
  'Sabre Raven': 20000,
  'F7A Hornet Mk I': 2000,
  'Dragonfly Star Kitten': 4000,
  '600i Executive Edition': 47500,
  'F8C Lightning Executive Edition': 30000,
  // Fehlende Fahrzeuge beim RSI Abruf
  'F7A Hornet Mk II': 17500,
  'F7C-M Super Hornet Mk II': 24000,
  'F8C Lightning': 30000,
  'Idris-M': 100000,
  'Javelin': 300000,
  'Kraken': 165000,
  'Kraken Privateer': 200000,
  'Odin': 590000,
  'PTV': 1500,
  'Caterpillar Pirate Edition': 33000
};

HangarExt._contentMsrp = {
  // Komponenten (Automatisierter Abgleich)
  'Aurora Mk II Combat Module': 1000,
  'Aurora Mk II Cargo Module': 1000,
  'Galaxy - Cargo Module': 7000,
  'Galaxy - Refinery Module': 8000,
  'Galaxy - Med Bay Module': 9000,
  'Retaliator Torpedo Module - Bow': 7500,
  'Retaliator Torpedo Module - Stern': 5000,
  'Retaliator Cargo Module - Bow': 3000,
  'Retaliator Cargo Module - Stern': 3000,
  'Retaliator Dropship Module - Bow': 7500,
  'Retaliator Personnel Module - Bow': 2500,
  'Retaliator Personnel Module - Stern': 2500,
  'Endeavor Bio Dome (2x1)': 10000,
  'Endeavor Service Equipment & Crew (2x1)': 2500,
  'Endeavor General Science (2x1)': 4500,
  'Endeavor Fuel Pod (2x1)': 3500,
  'Endeavor Medical Bay (2x2)': 7500,
  'Endeavor Telescope Array (2x1)': 12500,
  'Endeavor Supercollider (2x2)': 12500,
  'Endeavor Landing (2x1)': 7500,
  'Endeavor Research Lab (2x1)': 4500,
  // Spielzugänge (Analoger Abgleich)
  'Squadron 42 Digital Download': 2000, // Paketpreis 2012 bis 2023
  'Star Citizen Digital Download': 1500
};

// Übersetzung für die in der Schiffsmatrix hinterlegten Namen, nötig damit die Schiffe im Abgleich gefunden werden können
HangarExt._shipMsrpToMatrixName = {
  'Aurora ES': 'Aurora Mk I ES',
  'Aurora LX': 'Aurora Mk I LX',
  'Aurora MR': 'Aurora Mk I MR',
  'Aurora CL': 'Aurora Mk I CL',
  'Aurora LN': 'Aurora Mk I LN',
  'Anvil Ballista Snowblind': 'Ballista Snowblind',
  'Anvil Ballista Dunestalker': 'Ballista Dunestalker',
  'Argo Mole Carbon Edition': 'Mole Carbon Edition',
  'Argo Mole Talus Edition': 'Mole Talus Edition',
  'F7C-S Hornet Ghost Mk II - copy': 'F7C-M Super Hornet Mk II'
};

HangarExt.LoadShipMsrp = function(callback)
{
  if (!HangarExt._setting.ShowUSDValues || !HangarExt._setting.ShowSavings || HangarExt._shipMsrpLoaded) {
    if (typeof callback === 'function') {
      callback();
    }
    return;
  }

  var controller = new AbortController();
  var timeout = setTimeout(function() {
    controller.abort();
  }, HangarExt._shipMsrpRequestTimeout);

  fetch('/pledge-store/api/upgrade/v2/graphql', {
    method: 'POST',
    credentials: 'include',
    signal: controller.signal,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify([{
      operationName: 'initShipUpgrade',
      variables: {},
      query:
        'query initShipUpgrade {\n' +
        '  ships {\n' +
        '    name\n' +
        '    msrp\n' +
        '  }\n' +
        '}\n'
    }])
  })
  .then(function(response) {
    clearTimeout(timeout);
    if (!response.ok) {
      HangarExt.Log('Hangar Extension: Ship MSRP request failed', response.status);
      HangarExt._setting.ShowSavings = false;
      if (typeof callback === 'function') {
        callback();
      }
      return null;
    }
    return response.json();
  })
  .then(function(result) {
    if (!result) {
      return;
    }
    var ships = result && result[0] && result[0].data && result[0].data.ships
      ? result[0].data.ships
      : [];

    for (var i = 0; i < ships.length; i++) {
      var shipName = $.trim(ships[i].name || '');
      if (shipName && ships[i].msrp) {
        shipName = HangarExt._shipMsrpToMatrixName[shipName] || shipName;
        HangarExt._shipMsrp[shipName] = ships[i].msrp;
        //HangarExt.Log("msrp ship: ", ships[i]);
      }
      //else HangarExt.Log("msrp ship error: ", ships[i]);
    }
    //HangarExt.Log('Hangar Extension: Loaded current ship MSRP data', Object.keys(HangarExt._shipMsrp).length);
    if (typeof callback === 'function') {
      callback();
    }
    HangarExt.SaveShipMsrpCache();
  })
  .catch(function(error) {
    clearTimeout(timeout);
    if (error.name == 'AbortError') {
      HangarExt.Log('Hangar Extension: Ship MSRP request timed out');
    }
    else {
      HangarExt.Log('Hangar Extension: Failed to load current ship MSRP data', error);
    }
    HangarExt._setting.ShowSavings = false;
    if (typeof callback === 'function') {
      callback();
    }
  });
};