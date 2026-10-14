var HangarExt = HangarExt || {};

// Render UI controls
HangarExt.DrawUI = function()
{
  var $controls = $($('.controls')[0]);
  $controls.addClass('js-custom-controls');
  $controls.removeClass('controls');
  $controls.empty();

  var $controls1 = $('<div>', { class: 'controls clearfix mrn15' });
  var $controls2 = $('<div>', { class: 'controls clearfix mrn15' });
  var $controls3 = $('<div>', { class: 'controls clearfix mrn15 js-custom-search-wrapper' });

  $controls.append($controls1, $controls2, $controls3);

  $('.js-pager').remove();

  // Fix: DropDown funktionieren sporadisch nicht
  // Grund: RSI re-initialisiert Controls nachträglich
  // Lösung: Initial visuell aufbauen und nach 750ms funktional neu setzen
  var buildFilterControls = function($controls1, renewal)
  {
    $controls1.empty();

    $controls1.append(HangarExt.Dropdown([
      { Value: 'None', Text: 'Show All', Class: 'first', Selected: HangarExt._filterType == 'None' },
      { Value: 'HasShip', Text: 'All Ships', Selected: HangarExt._filterType == 'HasShip' },
      { Value: 'IsShip', Text: 'Standalone Ships', Selected: HangarExt._filterType == 'IsShip' },
      { Value: 'IsCombo', Text: 'Combo Packages', Selected: HangarExt._filterType == 'IsCombo' },
      { Value: 'IsPackage', Text: 'Game Packages', Selected: HangarExt._filterType == 'IsPackage' },
      { Value: 'IsUpgrade', Text: 'Ship Upgrades', Selected: HangarExt._filterType == 'IsUpgrade' },
      { Value: 'IsNameable', Text: 'Nameable Ships', Class: 'split', Selected: HangarExt._filterType == 'IsNameable' },
      { Value: 'HasPaint', Text: 'Ship Paints', Class: 'split', Selected: HangarExt._filterType == 'HasPaint' },
      { Value: 'HasComponent', Text: 'Ship Components', Selected: HangarExt._filterType == 'HasComponent' },
      { Value: 'HasEquipment', Text: 'FPS Equipment', Selected: HangarExt._filterType == 'HasEquipment' },
      { Value: 'HasDecoration', Text: 'Hangar Decorations', Selected: HangarExt._filterType == 'HasDecoration' },
      { Value: 'IsReward', Text: 'Chairman’s Club', Class: 'split', Selected: HangarExt._filterType == 'IsReward' },
      { Value: 'IsReferral', Text: 'Referral Rewards', Selected: HangarExt._filterType == 'IsReferral' },
      { Value: 'IsCoupon', Text: 'Subscriber Coupons', Class: 'split', Selected: HangarExt._filterType == 'IsCoupon' },
    ], '162px', 'js-custom-filter', function(e, value) { HangarExt._filterType = value; HangarExt.SaveLocalSetting('filterType', value); HangarExt.Render(true); HangarExt.RefreshPager(); }));

    $controls1.append(HangarExt.Dropdown([
      { Value: 'Purchased', Text: 'Pledge Date', Selected: HangarExt._sortingMethod == 'Purchased' },
      { Value: 'Name', Text: 'Pledge Name', Selected: HangarExt._sortingMethod == 'Name' },
      { Value: 'Value', Text: 'Pledge Value', Selected: HangarExt._sortingMethod == 'Value' },
    ], '140px', 'js-custom-sort', function(e, value) { HangarExt._sortingMethod = value; HangarExt.SaveSyncSetting('sortingMethod', value); HangarExt.Render(true); HangarExt.RefreshPager(); }));

    $controls1.append(HangarExt.Pager([
      { Value: '9999', Text: 'Show All', Class: 'first', Selected: HangarExt._itemsPerPage == 9999 },
      { Value: '10', Text: '10 per page', Selected: HangarExt._itemsPerPage == 10 },
      { Value: '25', Text: '25 per page', Selected: HangarExt._itemsPerPage == 25 },
      { Value: '50', Text: '50 per page', Selected: HangarExt._itemsPerPage == 50 },
      { Value: '100', Text: '100 per page', Selected: HangarExt._itemsPerPage == 100 },
    ], '140px', 'js-custom-pager', function(e, value) { HangarExt.Render(true); }, renewal ));
  }

  buildFilterControls($controls1);

  setTimeout(() => {
    buildFilterControls($controls1, true);
  }, 1250); // Geändert von 750 auf 1250
  // Ende des Fixes

  $controls2.append(
    HangarExt.Toggle('Flight Ready', 'IsFlightReady', 'IsInConcept')
  );
  $controls2.append(
    HangarExt.Toggle('LTI', 'HasLTI', '!HasLTI')
  );
  $controls2.append(
    HangarExt.Toggle('Giftable', 'IsGiftable', '!IsGiftable')
  );
  $controls2.append(
    HangarExt.Toggle('Gifted', 'IsGifted', '!IsGifted')
  );
  $controls2.append(
    HangarExt.Toggle('Meltable', 'IsMeltable', '!IsMeltable')
  );
  $controls2.append(
    HangarExt.Toggle('Upgraded', 'IsUpgraded', '!IsUpgraded')
  );
  $controls2.append(
    HangarExt.Toggle('Valuable', 'HasValue', '!HasValue')
  );
  $controls2.append(
    HangarExt.Toggle('Selected', 'IsSelected', '!IsSelected')
  );
  $controls2.append(
    HangarExt.Toggle('Reset')
  );
  $controls3.append(HangarExt.SearchBox());
  $controls3.append(HangarExt.SearchReset());
}