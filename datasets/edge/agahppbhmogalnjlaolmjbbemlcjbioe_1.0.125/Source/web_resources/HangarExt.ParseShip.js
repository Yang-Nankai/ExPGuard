var HangarExt = HangarExt || {};

HangarExt.CapitalizeWords = function(str) {
  return str
    .toLowerCase()
    .replace(/\b\w/g, function(char) {
      return char.toUpperCase();
    });
};

HangarExt.CleanInsuranceItems = function(container)
{
  $('.with-images', container).each(function () {

    var $insuranceItems = $(this).children('.item').filter(function () {
      return $.trim($(this).find('.kind').text()) === 'Insurance';
    });

    if ($insuranceItems.length <= 1) {
      return;
    }

    var bestItem = null;
    var bestDuration = -1;

    $insuranceItems.each(function () {

      var title = $.trim($(this).find('.title').text());
      if (/lifetime/i.test(title)) {
        bestItem = this;
        return false;
      }

      var match = title.match(/(\d+)/);
      if (match) {
        var duration = parseInt(match[1], 10);
        if (duration > bestDuration) {
          bestDuration = duration;
          bestItem = this;
        }
      }
    });

    if (!bestItem) {
      return;
    }

    $insuranceItems.each(function () {
      if (this !== bestItem) {
        $(this).remove();
      }
    });
  });
};

HangarExt.CleanNameReservations = function(container)
{
  var $container = $(container);

  var shipTitles = [];

  $('.with-images .item', $container).each(function () {
    var kind = $.trim($(this).find('.kind').text()).replace(/\s*\(.*$/, '');

    if (kind !== 'Ship') {
      return;
    }

    var title = $.trim($(this).find('.title').text()).replace(/\s+/g, ' ');

    if (title) {
      shipTitles.push(title.toLowerCase());
    }
  });

  $('.without-images', $container).each(function () {
    var seen = {};

    $('.item', this).each(function () {
      var $item = $(this);
      var title = $.trim($item.find('.title').text()).replace(/\s+/g, ' ');

      if (title.indexOf('Name Reservation') === -1) {
        return;
      }

      var shipName = $.trim(title.replace(/Name Reservation/i, '')).toLowerCase();

      if (!shipName) {
        return;
      }

      var hasMatchingShip = false;

      for (var i = 0; i < shipTitles.length; i++) {
        if (shipTitles[i].indexOf(shipName) > -1 || shipName.indexOf(shipTitles[i]) > -1) {
          hasMatchingShip = true;
          break;
        }
      }

      if (!hasMatchingShip || seen[shipName]) {
        $item.remove();
      } else {
        seen[shipName] = true;
      }
    });
  });
};

HangarExt.RemoveUpgradedTitleClass = function(container)
{
  var $h3 = $('.title-col h3', container);

  if ($h3.hasClass('upgraded')) {
    $h3.removeClass('upgraded');
  }
};

HangarExt.RestoreUpgradeButton = function(container)
{
  var $entry = $(container);

  if ($entry.find('.upgraded').length === 0) {
    return;
  }

  var $itemsBox = $entry.find('.items.more');
  if ($itemsBox.length === 0) {
    return;
  }

  // Schon vorhanden? Dann nichts tun.
  //if ($itemsBox.find('a.js-upgrade-log').length > 0) {
  if ($itemsBox.children('a.js-upgrade-log').length > 0) {
    return;
  }

  var $button = $('<a>', {
    'class': 'shadow-button trans-02s trans-color js-upgrade-log gift upgrade-icon' //'shadow-button trans-02s trans-color js-upgrade-log upgrade'
  }).append(
    $('<span>', { 'class': 'label js-label trans-02s', text: 'Upgrades' }),
    $('<span>', { 'class': 'icon trans-02s' }).append(
      $('<span>', { 'class': 'effect trans-opacity trans-03s' })
    ),
    $('<span>', { 'class': 'left-section' }),
    $('<span>', { 'class': 'right-section' })
  );

  var $buttons = $itemsBox.children('a.shadow-button');

  if ($buttons.length > 0) {
    $button.insertAfter($buttons.last());
  } else {
    $button.insertAfter($itemsBox.children('h2').first());
  }
};

HangarExt.RemoveRenameInfobox = function(container)
{
  var $entry = $(container);

  var $infobox = $entry.find('.nameable-infobox');
  if ($infobox.length === 0) {
    return;
  }

  //$infobox.hide();
  $infobox.remove();
};

HangarExt.RepositionRenameButton = function(container)
{
  var $entry = $(container);

  var $infobox = $entry.find('.nameable-infobox');
  if ($infobox.length === 0) {
    return;
  }

  var $itemsBox = $entry.find('.items.more');
  if ($itemsBox.length === 0) {
    return;
  }

  if ($itemsBox.children('a.js-rename-ship').length > 0) {
    return;
  }

  var $button = $('<a>', {
    'class': 'shadow-button trans-02s trans-color js-rename-ship rename-icon'
  }).append(
    $('<span>', { 'class': 'label js-label trans-02s', text: 'Rename Ship' }),
    $('<span>', { 'class': 'icon trans-02s' }).append(
      $('<span>', { 'class': 'effect trans-opacity trans-03s' })
    ),
    $('<span>', { 'class': 'left-section' }),
    $('<span>', { 'class': 'right-section' })
  );

  var $buttons = $itemsBox.children('a.shadow-button');

  if ($buttons.length > 0) {
    $button.insertAfter($buttons.last());
  } else {
    $button.insertAfter($itemsBox.children('h2').first());
  }

  //$infobox.hide();
  $infobox.remove();
};

HangarExt.SortItemsByKind = function(container)
{
  $('.with-images', container).each(function () {

    var $wrapper = $(this);
    var $items = $wrapper.children('.item').get();

    function getKind(item) {
      var text = $.trim($(item).find('.kind').text());
      // Alles ab der ersten Klammer entfernen:
      // "Ship (In-Concept)" -> "Ship"
      text = text.replace(/\s*\(.*$/, '');

      return $.trim(text);
    }

    function getPriority(kind) {
      if (kind === 'Ship') return 0;
      if (kind === 'Insurance') return 1;
      if (kind === 'Credits') return 2;
      if (kind === 'Skin') return 3;
      if (kind === 'FPS Equipment') return 4;
      return 5;
    }

    $items.sort(function(a, b) {
      return getPriority(getKind(a)) - getPriority(getKind(b));
    });

    $wrapper.append($items);
  });
};

HangarExt._includedShips = {};
HangarExt._exportShipList = [];

HangarExt.AddExportShip = function(matched, parentShipName)
{
  //if (!matched || !matched.found) {
  //  return;
  //}

  if (parentShipName) {
    HangarExt._exportShipList.push($.extend({}, matched, {
      parent: parentShipName
    }));
  }
  else {
    HangarExt._exportShipList.push(matched);
  }
};

HangarExt.GetIncludedShip = function(shipName)
{
  if (HangarExt._includedShips[shipName] !== undefined) {
    return HangarExt._includedShips[shipName];
  }

  var matched = HangarExt.MatchShip(shipName);
  if (!matched.found) {
    HangarExt._includedShips[shipName] = null;
    return null;
  }

  var includedShip = {
    html:
      '<div class="item included-ship">' +
        '<div class="image" style="background-image: url(&quot;' + (matched.fullsize || matched.thumbnail || '') + '&quot;);"></div>' +
        '<div class="text">' +
          '<div class="title">' +
            (matched.url
              ? '<a href="' + matched.url + '" target="_blank">' + matched.manufacturer.shortName + ' ' + matched.name + '</a>'
              : matched.manufacturer.shortName + ' ' + matched.name
            ) +
          '</div>' +
          '<div class="kind">Included Ship (<span class="production-state">' + matched.status + '</span>)</div>' +
          '<div class="sub-info">Focus (<span>' + matched.focus + '</span>)</div>' +
        '</div>' +
      '</div>',
    data: matched
  };

  HangarExt._includedShips[shipName] = includedShip;
  return includedShip;
};

HangarExt.AddIncludedShipItems = function(container, shipName, includedShips)
{
  //if (!includedShips) {
  //  return;
  //}

  var includedShipItems = '';
  for (var i = 0; i < includedShips.length; i++) {
    var includedShip = HangarExt.GetIncludedShip(includedShips[i]);
    if (includedShip) {
      includedShipItems += includedShip.html;
      HangarExt.AddExportShip(includedShip.data, shipName);
    }
  }

  if (includedShipItems) {
    $(container).append(includedShipItems);
  }
};

HangarExt.MatchShip = function(shipName) {
  var result = {
    found: false,
    name: shipName,
    manufacturer: {
      code: '',
      name: '',
      shortName: ''
    },
    status: '',
    focus: ''
    //url: '',
    //export: ''
  };

  for (var i = 0, j = HangarExt._shipMatrix.length; i < j; i++) {
    var ship = HangarExt._shipMatrix[i];
    if (shipName.toLowerCase().indexOf(ship.name.toLowerCase()) > -1) {
      result.found = true;
      result.name = ship.displayName || ship.name;
      result.manufacturer = ship.manufacturer;
      result.status = HangarExt.CapitalizeWords(ship.status || '');
      result.focus = ship.focus || '';
      result.url = ship.url || '';
      result.thumbnail = ship.thumbnail;
      result.fullsize = ship.fullsize;
      result.export = ship.export || '';
      result.key = ship.key || '';
      if (ship.childs) {
        result.childs = ship.childs;
      }
      return result;
    }
  }

  HangarExt.Log('Hangar-Extension: Unmatched', shipName);
  return result;
};

HangarExt.ParseShip = function()
{
  //var $ships = $('.kind:contains(Ship)', this).closest('.text');
  var shipCount = 0;
  var $ships = $('.kind:contains(Ship)', this).parent().parent();
  if ($ships.length >= 1) {

    this.filters.has_ship = true;
    this.filters.is_ship = $ships.length == 1;
    this.filters.is_combo = !this.filters.is_ship;

    this.filters.is_upgraded = $('.upgraded', this).length > 0;
    this.filters.is_nameable = $('.contains-nameable', this).length > 0;

    var parsedShips = [];
    var msrpShips = [];
    var self = this;

    if (!self.filters.is_ship) {
      this.flight_ready = 0;
      this.in_concept = 0;
    }

    $ships.each(function () {
      var $ship = $(this);
      var rawShipName = $('.title', $ship).text().trim();
      var shipName = (rawShipName || '')
        .replace(/ (- )?lti/i, '')
        .replace(/ (- )?warbond edition/i, '')
        .replace(/ (- )?warbond/i, '')
        .replace(/ (- )?war bond/i, '')
        .replace(/ promo wb/i, '')
        .trim();

      var matched = HangarExt.MatchShip(shipName);

      parsedShips.push(matched);
      shipCount++;

      if (matched.found) {

        // Eindeutige RSI Kennung zuweisen + Fallback für in der Schiffsmatrix fehlende Fahrzeuge
        msrpShips.push(matched.key || matched.name);

        if (matched.thumbnail != undefined) {
          if (self.filters.is_ship) {
            $('.basic-infos .image', self).css({
              'background-image': 'url("' + matched.thumbnail + '")'
            });
          }
          var $image = $ship.find('.image');
          var itemImageUrl = matched.fullsize || matched.thumbnail;
          if ($image.length > 0) {
            $image.css({
              'background-image': 'url("' + itemImageUrl + '")'
            });
          }
        }

        if (matched.url) {
          var $title = $ship.find('.title');
          $title.html(
            $('<a>', {
              href: matched.url,
              target: '_blank',
              text: matched.manufacturer.shortName + ' ' + matched.name
            })
          );
        }

        var $kind = $ship.find('.kind');
        $kind.html(
          'Ship (<span class="production-state">' + matched.status + '</span>)'
        );

        $('<div>', {
          class: 'sub-info',
          html: 'Focus (<span>' + matched.focus + '</span>)'
        }).insertAfter($kind);

        if (matched.status == 'Flight-Ready') {
          if (!self.filters.is_ship) {
            self.flight_ready++;
          }
          self.filters.is_flight_ready = true;
        }
        else { //if (matched.status == 'In-Concept') {
          if (!self.filters.is_ship) {
            self.in_concept++;
          }
          self.filters.is_in_concept = true;
        }

        HangarExt.AddExportShip(matched);
        if (matched.childs) {
          shipCount += matched.childs.length;
          HangarExt.AddIncludedShipItems(this, matched.name, matched.childs);
        }
      }
    });

    if (this.filters.is_ship && parsedShips.length === 1 && parsedShips[0].found) {
      this.ship_name = parsedShips[0].name;
      this.ship_manufacturer = parsedShips[0].manufacturer.shortName;
      this.ship_status = parsedShips[0].status;
      this.displayName = this.ship_name.replace(':', '');
      this.pledgeName = this.displayName;
    }
    else if (this.filters.is_combo) {
      this.displayName = this.displayName.replace(/ (- )?lti/i, '')
        .replace(/ (- )?warbond edition/i, '')
        .replace(/ (- )?warbond/i, '')
        .replace(/ (- )?war bond/i, '')
        .replace(/ promo wb/i, '')
        .replace(':', '')
        .replace(/ - .*/, '');
      this.pledgeName = this.displayName;
    }
    this.msrp_ships = msrpShips;
  }

  HangarExt._shipCount += shipCount; //$ships.length;
  if (this.filters.has_ship || this.filters.is_combo) {
    if (!HangarExt._setting.ShowAllItemEntries) {
      HangarExt.CleanInsuranceItems(this);
      HangarExt.CleanNameReservations(this);
    }
    if (this.filters.is_gifted) {
      HangarExt.RemoveRenameInfobox(this);
    }
    else {
      HangarExt.RepositionRenameButton(this);
      HangarExt.RestoreUpgradeButton(this);
    }
    HangarExt.RemoveUpgradedTitleClass(this);
  }
  HangarExt.SortItemsByKind(this);
};