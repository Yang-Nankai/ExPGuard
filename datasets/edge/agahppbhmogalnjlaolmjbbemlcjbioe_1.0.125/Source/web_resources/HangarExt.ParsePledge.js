var HangarExt = HangarExt || {};

HangarExt._shipCount = HangarExt._shipCount || 0;
HangarExt._upgradeCount = HangarExt._upgradeCount || 0;
HangarExt._packageCount = HangarExt._packageCount || 0;
HangarExt._raw = HangarExt._raw || [];

HangarExt.UpdateContainsSummary = function(container)
{
  var $entry = $(container);

  var shipCount = 0;
  var gameCount = 0;
  var itemCount = 0;

  $('.with-images > .item, .without-images > .item', $entry).each(function () {

    var $item = $(this);
    var kind = $.trim($item.find('.kind').text()).replace(/\s*\(.*$/, '');
    var title = $.trim($item.find('.title').text());

    if (kind === 'Ship') {
      shipCount++;
    }
    else if (/digital download/i.test(title)) {
      gameCount++;
    }
    else if (HangarExt._setting.ShowOnlyUsableItemCount && (
             kind === 'Credits' ||
             kind === 'Insurance' ||
       /name reservation/i.test(title) ||
       /\bhangar\b$/i.test(title)))
      {
      return;
    }
    else {
      itemCount++;
    }
  });

  var parts = [];

  if (gameCount > 0) {
    parts.push(gameCount + ' Game Access' + (gameCount !== 1 ? 'es' : ''));
  }

  if (shipCount > 0) {
    parts.push(shipCount + ' Ship' + (shipCount !== 1 ? 's' : ''));
  }

  if (itemCount > 0) {
    parts.push(itemCount + ' Item' + (itemCount !== 1 ? 's' : ''));
  }

  var text = '';
  if (parts.length === 1) {
    text = parts[0];
  }
  else if (parts.length > 1) {
    text = parts.join(', ');
  }

  var $itemsCol = $('.items-col', $entry);

  $itemsCol.css('width', '50%');
  $itemsCol.contents().filter(function () {
    return this.nodeType === 3;
  }).remove();

  $itemsCol.append(text);
};

HangarExt.NormalizeItemsLabel = function(container)
{
  var $itemsCol = $('.items-col', container);

  if ($itemsCol.length === 0) return;

  var node = $itemsCol.contents().filter(function () {
    return this.nodeType === 3 && this.nodeValue.trim().length > 0;
  }).last()[0];

  if (!node) return;

  var text = node.nodeValue.trim();

  if (!/\bitems?\b/i.test(text)) {
    node.nodeValue = ' 1 Item';
    return;
  }

  node.nodeValue = text.replace(/\bitems?\b/i, function(match) {
    return match.toLowerCase() === 'item' ? 'Item' : 'Items';
  });
};

HangarExt.TransformCouponEntry = function(container)
{
  var $entry = $(container);

  var $itemsCol = $('.items-col', $entry);
  if ($itemsCol.length === 0) return;

  var node = $itemsCol.contents().filter(function () {
    return this.nodeType === 3 && this.nodeValue.trim().length > 0;
  }).last()[0];

  if (node) {
    node.nodeValue = ' 1 Coupon Code';
  }

  var $title = $('h3', $entry);
  var text = $title.text().trim();

  var pos = text.indexOf('Coupon:');
  if (pos === -1) return;

  var cleanTitle = text.substring(0, pos + 'Coupon'.length).trim();
  var code = text.substring(pos + 'Coupon:'.length).trim();

  $title.html('<span class="title-text">' + cleanTitle + '</span>');

  $('.items h2', $entry)
    .html(
      '<span class="coupon-code-label">Coupon Code: </span>' +
      '<span class="coupon-code-value" data-code="' + code + '">' + code + '</span>'
    );

  var $items = $('.items.more.js-more', $entry);
  $items.css('margin-top', '20px');

  if ($items.find('.corner').length === 0) {
    $items.append(
      '<div class="corner corner-top-right"></div>' +
      '<div class="corner corner-bottom-left"></div>' +
      '<div class="corner corner-top-left"></div>' +
      '<div class="corner corner-bottom-right"></div>'
    );
  }

  container.couponCode = code;
  container.pledgeName = cleanTitle;
  container.displayName = cleanTitle;
};

HangarExt.AdjustItemImageSize = function(container)
{
    var $entry = $(container);
    var $wrapper = $entry.find('.wrapper-col');
    var $image = $entry.find('.item-image-wrapper .image');

    if (!$wrapper.length || !$image.length) return;

    $image.css({
      width: '131px',
      height: '131px'
    });

    $wrapper.css({
      marginLeft: '160px'
    });
};

HangarExt.BuildSearchItems = function(container)
{
  var items = [];
  if (container.aliasName) {
    items.push(container.aliasName);
  }
  $('.with-images > .item .title, .without-images > .item .title', container).each(function() {
    var title = $.trim($(this).text());
    if (title && $.inArray(title, items) === -1) {
      items.push(title);
    }
  });
  return items;
};

HangarExt.SetSelected = function(pledgeId, selected)
{
  if (!pledgeId) {
    return;
  }

  if (selected) {
    HangarExt._selectedPledgeIds[pledgeId] = true;
  }
  else {
    delete HangarExt._selectedPledgeIds[pledgeId];
  }
  HangarExt.SaveSelectedPledgeIdCache();
};

HangarExt.IsSelected = function(pledgeId)
{
  if (HangarExt._selectedPledgeIds[pledgeId]) {
    HangarExt._foundPledgeIds = HangarExt._foundPledgeIds || {};
    HangarExt._foundPledgeIds[pledgeId] = true;
    return true;
  }
  return false;
}

// Apply a pre-defined filter to a list of items
HangarExt.ParsePledge = function()
{
  // Pre-cache raw markup
  if (!HangarExt._loadingFromCache) {
    if (!HangarExt._targetedPledgeId) {
      HangarExt._raw.push(this.outerHTML);
    }
    else if (!HangarExt.PatchTargetedRawEntry(this)) {
      return;
    }
  }

  var pledgeName = $('.js-pledge-name', this).val() || '';
  if (pledgeName.length > 0) {
    var lowerCase = pledgeName.toLowerCase();
    var $wrapper = $('.wrapper-col', this);
    var $title = $('.title-col h3', this);
    var originalName = pledgeName;
    this.filters = {};
    this.filters.is_referral = lowerCase.indexOf(' referral') > -1;
    this.filters.is_vip_reward = lowerCase.indexOf('vip ') > -1 || lowerCase.indexOf('chairman') > -1;
    this.filters.is_coupon = lowerCase.indexOf(' coupon') > -1;
    pledgeName = pledgeName.replace(/ {2}/gi, " ")
              .replace(/^add-ons - /i, '')
              .replace(/^standalone ship - /i, '')
              .replace(/^combo - /i, '')
              .replace(/^package - /i, '')
              .replace(/^ship upgrades - /i, '')
              .replace(/^extras - /i, '')
              .replace(/^paints - /i, '')
              .replace(/^subscribers exclusive/i, '')
              //.replace(/^Decorations Gamescom /i, '')
              .replace(/^packs - /i, '')
              .replace(/^Takuetsu /i, '')
              .replace(/^Masters of Design Series-/i, 'Schematic: ')
              .replace(/^Masters of Design Series/i, 'Schematic:')
              .replace(/^standalone ships - /i, '')
              .replace(/^subscribers store - /i, '')
              .replace(/^gear - /i, '')
              .replace(/^hunt the polaris - /i, '')
              .replace(/^argo /i, '')
              .replace(/^aegis /i, '')
              .replace(/^Digital Goodies Pack - /i, '')
              .replace(/^CitizenCon Direct /i, 'CitizenCon ')
              .replace(/^Pirate Week 2025 /i, '')
              .replace(' - ', ' ')
              .replace(' – ', ' ')
              .replace('Resource Drive Winner Hurston Dynamics', 'Hurston Resource Drive Tier 6')
              .replace(' Digital Goodies', ' Digital Goodies Pack').replace(' Pack Pack', '  Pack')
              .replace(' plus ', ' + ')
              .replace(' with ', ' + ')
              .replace('Snarling ', '')
              .replace(' & ', ' + ')
              .replace('Idris P', 'Idris-P')
              .replace('BIS C2', 'BIS')
              .replace('BIS Mercury Star Runner', 'BIS Mercury')
              .replace(' Referral Reward', '')
              .replace(' Rewards', '')
              .replace(' Reward', '')
              .replace(' Warbond', '')
              .replace(' LTI', '')
              .replace('VIP ', '')
              .replace('Pulse + Dominion Paint', 'Mirai Pulse + Dominion Paint')
              .replace('X1 BASELINE EDITION', 'Origin X1')
              .replace('Legatus Navium', 'Praetorian')
              .replace('Legatus2', 'Legatus Navium')
              .replace('HoverQuad', 'C.O. HoverQuad')
              .replace(' Anniversary 2018', '')
              .replace('SRV 2949', 'Argo SRV')
              .replace('Talon (Concept)', 'Talon + Aves Suit')
              .replace(' Referral Bonus', '')
              .replace('RSI Mantis', 'RSI Mantis + Quirinus Tech Suit')
              .replace('Quirinus Tech ‘Daybreaker’ Undersuit and Helmet', 'Quirinus ‘Daybreaker’ Suit')
              .replace('Zeus Mk II ES 2955 Best in Show', 'Zeus Mk II 2955 Best in Show')
              .replace('2954 BIS F8C Lightning Pennant', 'F8C Lightning 2954 Best in Show Pennant')
              .replace('2954 BIS F8C Lightning', 'F8C Lightning 2954 Best in Show')
              .replace('2954 BIS C1 Spirit', 'Spirit 2954 Best in Show')
              .replace('600i Explorer Best in Show 2953 Paint', '600i 2953 Best in Show Paint')
              .replace('2951 BIS Hercules Paint and Flight Jacket', 'Hercules 2951 Best in Show')
              .replace('2951 BIS 600i Paint and Flight Jacket', '600i 2951 Best in Show')
              .replace('2951 BIS Mercury Paint and Jacket', 'Mercury Star Runner 2951 Best in Show')
              .replace('2950 BIS Anvil Carrack Gear Pack', 'Carrack 2950 Best in Show')
              .replace('Best in Show 2953', '2953 Best in Show')
              .replace("Best in Show '52", '2952 Best in Show')
              .replace('Reaper Livery Set', 'Paints')
              .replace('Liberation Livery Set', 'Paints')
              .replace(' Patch', '')
              .replace("'", '’')
              .trim();

    this.pledgeName = pledgeName;
    this.displayName = pledgeName;
    this.pledge_id = this.pledge_id || parseInt(($('.js-pledge-id', this).val() || '').trim(), 10);
    // Entfernen von $ sowie ¤ vor dem eigentlichen Betrag
    this.pledge_cost = ($('.js-pledge-value', this).val() || '').replace(/^\D+/, '');
    if (this.pledge_cost.indexOf('USD') !== -1) {
      this.melt_value = parseFloat(this.pledge_cost.replace(/[^0-9.]/g, '')) || 0; // NaN safe!
      this.msrp_value = this.melt_value *100;
    }
    else {
      this.melt_value = 0;
      this.msrp_value = 0;
    }
    this.filters.has_squadron = $('.title:contains(Squadron 42 Digital Download)', this).length > 0;
    this.filters.has_starcitizen  = $('.title:contains(Star Citizen Digital Download)', this).length > 0;
    this.filters.is_meltable = $('.js-reclaim', this).length > 0;
    this.filters.is_giftable = $('.label:contains(Gift)', this).length > 0 && this.melt_value <= 1000;
    //this.filters.is_gifted = $('.availability.red', this).text().trim() === 'Gifted';
    this.filters.is_gifted = $('.availability.red', this).length > 0;
    this.filters.is_package = this.filters.has_squadron || this.filters.has_starcitizen;
    this.filters.has_value = this.melt_value > 0;

    this.filters.is_selected = HangarExt.IsSelected(this.pledge_id);
    if (this.filters.is_selected) {
      $('.row', this).toggleClass('js-selected', this.filters.is_selected);
    }
    this.filters.is_visible = false;

    if (HangarExt._setting.ShowUSDValues || HangarExt._setting.ShowProductionState) {
      HangarExt.AdjustItemImageSize(this);
    }

    if (this.filters.is_coupon) {
      HangarExt.TransformCouponEntry(this);
    }
    else {

      if (this.filters.is_package) {
        HangarExt._packageCount++;
      }

      HangarExt.ParseShip.apply(this);
      HangarExt.ParseComponent.apply(this);
      HangarExt.ParseEquipment.apply(this);
      HangarExt.ParseSkin.apply(this);
      HangarExt.ParseDecoration.apply(this);
      HangarExt.ParseUpgrade.apply(this);
      HangarExt.ParseInsurance.apply(this);
      HangarExt.NormalizeFilters.apply(this);

      if (this.filters.has_ship || this.filters.is_combo || this.filters.has_squadron || this.filters.has_starcitizen) {
        HangarExt.UpdateContainsSummary(this);
      }
      else if (!this.filters.is_upgrade) {
        HangarExt.NormalizeItemsLabel(this);
      }

      var $msrpDiff = HangarExt._setting.ShowSavings ? $('<span>', { class: 'js-msrp-diff' }) : '';
      if (!this.filters.is_meltable && HangarExt._setting.ShowUSDValues) {
        if (this.filters.is_giftable)
          $wrapper.append($("<div>", { class: 'date-col melt-col' }).append($('<label>', { text: 'Giftable Value: ' }), this.pledge_cost, $msrpDiff));
        else
          $wrapper.append($("<div>", { class: 'date-col melt-col' }).append($('<label>', { text: 'Non-meltable Value: ' }), this.pledge_cost, $msrpDiff));
      }
      else if (HangarExt._setting.ShowUSDValues) {
        $wrapper.append($("<div>", { class: 'date-col melt-col' }).append($('<label>', { text: 'Melt Value: ' }), this.pledge_cost, $msrpDiff));
      }

      if (HangarExt._setting.ShowProductionState) {
        if (this.filters.is_ship || this.filters.is_upgrade) {
          //$wrapper.append($("<div>", { class: 'items-col' }).append($('<label>', { text: 'Intended Role: ' }), this.ship_focus));
          $wrapper.append($("<div>", { class: 'items-col' }).append($('<label>', { text: 'Production State: ' }), this.ship_status));
        }
        else if (this.filters.has_ship) {
          var summary = '';
          if (this.flight_ready > 0) {
            summary += this.flight_ready + ' Flight-Ready';
          }
          if (this.in_concept > 0) {
            if (this.flight_ready > 0) {
              summary += ' and ';
            }
            summary += this.in_concept + ' In-Concept';
          }
          $wrapper.append($("<div>", { class: 'items-col' }).append($('<label>', { text: 'Production State: ' }), summary));
        }
      }

      if (HangarExt._setting.ShowBasePledge) {
        if (this.filters.is_vip_reward && (this.pledgeName == 'Legatus Navium' || this.pledgeName == 'Praetorian' || this.pledgeName == 'Wing Commander' || this.pledgeName == 'Space Marshal' || this.pledgeName == 'Grand Admiral' || this.pledgeName == 'High Admiral')) {
          $('.content-block1', this).append('<div class="base-pledge">' + this.pledgeName + '</div>');
        }
        else if (this.filters.is_ship || this.filters.has_ship) {
          $('.content-block1', this).append('<div class="base-pledge">' + originalName + '</div>');
        }
      }

      // Designanpassung
      $('.content-block1>.corner.corner-bottom-right', this).remove();
      $('.content-block1>.corner.corner-top-left', this).remove();

      // nicht rückkaufbar badge
      var $container = $('.title-col', this);
      if (this.filters.is_meltable && $('.js-pledge-not-buybackable', this).val().trim() === '1') {
        $('<span>', { text: 'Not Buybackable' }).addClass('not-buybackable').appendTo($container);
      }

      // shiffshersteller mit anzeigen
      if (this.filters.is_ship && this.ship_manufacturer != undefined) {
        this.displayName = this.ship_manufacturer + ' ' + this.displayName;
      }

      // titel zuweisen vor der pledge ID
      //$title.html('<span class="title-text">' + this.displayName + '</span>');
      $title.empty().append(
        $('<span>', {
          class: 'title-text',
          text: this.displayName
        })
      );
      if (this.filters.is_lti) {
        $title.append(
          $('<span>', {
            class: 'title-insurance',
            text: 'LTI'
          })
        );
        // Nur für die Suche ergänzend
        this.displayName += ' LTI';
      }
      else if (this.insuranceDuration) {
        $title.append(
          $('<span>', {
            class: 'title-insurance',
            text: this.insuranceDuration + 'MI'
          })
        );
        // Nur für die Suche ergänzend
        this.displayName += ' ' + this.insuranceDuration + 'MI';
      }

      // neue pledge-id position
      if (HangarExt._setting.ShowPledgeId) {
        var $availability = $container.find('.availability');
        if ($availability.length) {
          $title.append('<span class="pledge-id">PLEDGE-ID&nbsp; &nbsp;<span class="copyable">' + this.pledge_id + '</span></span>');
        }
      }
    }
    this.sortName = this.displayName;
    this.searchItems = HangarExt.BuildSearchItems(this);
    this.searchText = this.searchItems.join(' ');
  }
  else {
    HangarExt.Log('Hangar-Extension: Error parsing', this.innerHTML);
  }
  if (!HangarExt._targetedPledgeId) {
    HangarExt._inventory.push(this);
  }
  else if (HangarExt.PatchTargetedInventoryEntry(this)) {
    HangarExt.Log('Hangar-Extension: Targeted cache update completed for pledge ' + HangarExt._targetedPledgeId);
    HangarExt._targetedPledgeId = null;
  }
}