var HangarExt = HangarExt || {};

HangarExt.ParseUpgrade = function()
{
  this.filters.is_upgrade = $('.js-upgrade-data', this).length > 0;

  if (this.filters.is_upgrade) {

    HangarExt._upgradeCount++;

    var upgradeData = JSON.parse($('.js-upgrade-data', this).val());
    var baseName = upgradeData.match_items[0].name
               .replace('with Pisces Expedition', 'w/C8X')
               .replace('Constellation ', '')
               .replace('Starlifter ', '')
               .replace(' Module', '');
    var targetItems = upgradeData.target_items;
    var targetName = targetItems[0].name
                 .replace('with Pisces Expedition', 'w/C8X')
                 .replace('Constellation ', '')
                 .replace('Starlifter ', '')
                 .replace(' Module', '');

		this.displayName = 'Upgrade: ' + baseName + ' ➔ ' + targetName;
		this.aliasName = 'Upgrade: ' + baseName + ' to ' + targetName;
    this.filters.is_warbond_upgrade = /war\s?bond/i.test(upgradeData.name);
    this.msrp_ships = [
      // Als Fallback hinterlegt, kann jedoch abweichen von dem was RSI erwartet im Abgleich
      upgradeData.match_items[0].name,
      upgradeData.target_items[0].name
    ];
    // Upgrade Typ bestimmen
    var upgradeType = this.filters.is_warbond_upgrade ? ' - Warbond Edition' : ' - Standard Edition';
    // Bild sowie Hersteller zuweisen
    var searchBaseName = upgradeData.match_items[0].name.toLowerCase();
    var searchTargetName = targetItems[0].name.toLowerCase();

    var $title = $('.content-block1 .with-images .item:first .title', this);
    var $image = $('.basic-infos .image', this);

    var shipURL = '';
    var matchBase, matchTarget;
    for (var i = 0, j = HangarExt._shipMatrix.length; i < j; i++) {
      var ship = HangarExt._shipMatrix[i];
      var matrixName = ship.name.toLowerCase();
      if (!matchBase && searchBaseName.indexOf(matrixName) > -1) {
        baseName = ship.manufacturer.shortName + ' ' + baseName;
        // Eindeutige RSI Kennung zuweisen + Fallback für in der Schiffsmatrix fehlende Fahrzeuge
        this.msrp_ships[0] = ship.key || ship.name;
        if (matchTarget) {
          break;
        }
        matchBase = true;
      }
      else if (!matchTarget && searchTargetName.indexOf(matrixName) > -1) {
        // Produktionsstatus
        this.ship_status = HangarExt.CapitalizeWords(ship.status || '');
        // Eindeutige RSI Kennung zuweisen + Fallback für in der Schiffsmatrix fehlende Fahrzeuge
        this.msrp_ships[1] = ship.key || ship.name;
        // Filter Flags setzen für Sortierung
        if (this.ship_status == 'Flight-Ready') {
          this.filters.is_flight_ready = true;
        }
        else {
          this.filters.is_in_concept = true;
        }

        // Upgrades haben original kein Vorschaubild, dieses ergänzen
        if (ship.thumbnail != undefined) {
          $image.css({ 'background-image': 'url("' + ship.thumbnail + '")'});
        }

        // Zusatzinformationen ergänzen
        $title.after(
          $('<div>', {
            class: 'kind',
            html: 'Upgrade' + upgradeType
          }),
          $('<div>', {
            class: 'sub-info',
            html: 'Production State (<span>' + this.ship_status + '</span>)'
          }),
          $('<div>', {
            class: 'sub-info',
            html: 'Focus (<span>' + (ship.focus || '') + '</span>)'
          })
        );

        shipURL = ship.url || '';
        targetName = ship.manufacturer.shortName + ' ' + targetName;

        if (matchBase) {
          break;
        }
        matchTarget = true;
      }
    }

    // Namen sowie falls gegeben die URL aktualisieren
    if (shipURL.length > 0) {
      $title.html(
        $('<a>', {
          href: shipURL,
          target: '_blank',
          text: baseName + ' ➔ ' + targetName
        })
      );
    }
    else {
      $title.text(baseName + ' ➔ ' + targetName);
    }

    // Zusätzliche Inhalte mit auflisten
    var itemCount = targetItems.length -1;
    if (itemCount > 0) {
      var $withoutImages = $('<div>', { class: 'without-images' });
      for (var i = 1; i < targetItems.length; i++) {
        $withoutImages.append(
          $('<div>', { class: 'item' }).append(
            $('<div>', {
              class: 'title',
              text: targetItems[i].name
            })
          )
        );
      }

      $withoutImages.append(
        $('<div>', { class: 'cboth' })
      );

      $('.content-block1 .with-images', this).after(
        $('<div>', {
          class: 'also-contains',
          text: 'Also Contains'
        }),
        $withoutImages
      );
    }

    // Auflistung des Inhaltes
    var $itemsCol = $('.items-col', this);
    $itemsCol.contents().filter(function () {
      return this.nodeType === 3;
    }).remove();

    if (itemCount > 0) {
      $itemsCol.append('1 Upgrade, ' + itemCount + ' Item' + (itemCount !== 1 ? 's' : '') + upgradeType);
    }
    else {
      $itemsCol.append('1 Upgrade' + upgradeType);
    }
  }
}

HangarExt.ParseComponent = function()
{
  var $component = $('.kind:contains(Component)', this).parent().parent();

  this.filters.has_component = $component.length >= 1;
}

HangarExt.ParseDecoration = function()
{
  var $decoration = $('.kind:contains(Hangar decoration)', this).parent().parent();

  this.filters.has_decoration = $decoration.length >= 1;
}

HangarExt.ParseEquipment = function()
{
  var $equipment = $('.kind:contains(FPS Equipment)', this).parent().parent();

  this.filters.has_equipment = $equipment.length >= 1;
}

HangarExt.ParseSkin = function()
{
  // Fix Best in Show Livery - Christmas 2019
  $('.title:contains(Livery Upgrade)', this).after('<div class="kind">Skin</div>');

  var $skin = $('.kind:contains(Skin)', this).parent().parent();
  this.filters.has_skin = $skin.length >= 1;
}

HangarExt.NormalizeFilters = function()
{
  if (this.pledgeName == 'Badger and Badges' ||
      this.pledgeName == 'Gimbals and Guns')
  {
    this.filters.is_referral = true;
  }
  // Fehlender LTI Eintrag seitens CIG
  else if (this.pledgeName == 'Surf and Turf') {
    //this.displayName = this.displayName + ' | LTI';
    this.filters.has_decoration = true;
    this.filters.is_referral = true;
  }
  // Fehlende Zuordnung innerhalb des Pledges seitens CIG
  else if (this.pledgeName.indexOf('Digital Goodies') > -1) {
    this.filters.has_decoration = true;
    this.filters.has_equipment = true;
  }
  // Falsche Zuordnung innerhalb des Pledges seitens CIG
  else if (this.pledgeName == 'Praetorian') {
    this.filters.has_component = true;
    this.filters.has_equipment = false;
  }
  // Falsche Zuordnung innerhalb des Pledges seitens CIG
  else if (this.pledgeName.indexOf(' Pennant') > -1 ||
           this.pledgeName.indexOf(' Poster') > -1 ||
           this.pledgeName.indexOf('Schematic') > -1 ||
           this.pledgeName.indexOf('2954 Best in Show') > -1 ||
           this.pledgeName.indexOf('2955 Best in Show') > -1 ||
           this.pledgeName == 'Coramor 2955 Décor Pack')
  {
      this.filters.has_decoration = true;
      this.filters.has_equipment = false;
  }
  // Fehlende Schiffspezifizierung seitens CIG
  else if (this.pledgeName == '2952 Best in Show') {
    this.pledgeName = 'Carrack 2952 Best in Show';
    this.displayName = this.pledgeName;
  }
  // Fehlende Zuordnung innerhalb des Pledges seitens CIG
  else if (this.pledgeName == 'Hurston Resource Drive Tier 6' ||
           this.pledgeName == 'Salvaged Skull Container Set' ||
           this.pledgeName.indexOf('Career Kit') > -1)
  {
      this.filters.has_equipment = true;
  }
  else if (this.pledgeName.indexOf(' Paint') > -1 &&
           this.pledgeName.indexOf(' Painting') == -1)
  {
      this.filters.has_skin = true;
  }
  // Fehlende Zuordnung innerhalb des Pledges seitens CIG
  else if (this.pledgeName.indexOf(' Bundle') > -1) {
    this.filters.has_equipment = true;
    this.filters.has_skin = true;
  }
  // Fehlende Zuordnung innerhalb des Pledges seitens CIG
  else if (!this.filters.has_equipment && (
           this.pledgeName.indexOf(' Clothing') > -1 ||
           this.pledgeName.indexOf(' Armor') > -1 ||
           this.pledgeName.indexOf(' Suit') > -1 ||
           this.pledgeName.indexOf(' Backpack') > -1))
  {
      this.filters.has_equipment = true;
  }
}

HangarExt.ParseInsurance = function()
{
  if (this.filters.is_upgrade) {
    return;
  }

  this.insuranceDuration = 0;

  var pledge = this;
  $('.item', pledge).filter(function () {
    return $.trim($(this).find('.kind').text()) === 'Insurance';
  }).each(function () {
    var title = $.trim($(this).find('.title').text());
    if (/lifetime/i.test(title)) {
      pledge.filters.is_lti = true;
      pledge.insuranceDuration = 0;
      return false;
    }

    var match = title.match(/(\d+)/);
    if (match) {
      var duration = parseInt(match[1], 10);
      if (duration > pledge.insuranceDuration) {
        pledge.insuranceDuration = duration;
      }
    }
  });
};