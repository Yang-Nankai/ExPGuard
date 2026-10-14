var HangarExt = window.HangarExt || {};

HangarExt.Loading = HangarExt.Loading || false;
HangarExt.BulkEnabled = HangarExt.BulkEnabled || false;
HangarExt.$bulkUI = null;

// Render UI controls
HangarExt.BulkUI = function()
{
  var bulkHeight = $('.js-bulk-ui').height();
  var maxOffset = document.body.scrollHeight - ($('#billing .inner-content').height() + $('#billing .inner-content').offset().top - 70);
  var minOffset = $('.billing-title-pager-wrapper').offset().top;

  var positionUI = function() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollTop > document.body.scrollHeight - maxOffset - bulkHeight) HangarExt.$bulkUI[0].style.top = (document.body.scrollHeight - maxOffset - bulkHeight - scrollTop + 70) + 'px';
    else if (scrollTop < minOffset) HangarExt.$bulkUI[0].style.top = (minOffset - scrollTop + 70) + 'px';
    else HangarExt.$bulkUI[0].style.top = '80px';
  };

  $(document).on('scroll', positionUI);

  var $billing = $('#billing');

  HangarExt.$bulkUI = $('<div>', { class: 'js-bulk-ui' });

  HangarExt.$bulkUI.$inner = $('<div>', { class: 'inner content-block1 loading' });
  HangarExt.$bulkUI.$value = $('<div>', { class: 'value' });
  HangarExt.$bulkUI.$downloads = $('<div>', { class: 'actions' });
  HangarExt.$bulkUI.$loading = $('<div>', { class: 'status value' });
  var type = HangarExt._setting.ShowUSDValues ? 'cash' : 'count';
  HangarExt.$bulkUI.addClass(type);
  $billing.append(HangarExt.$bulkUI);
  HangarExt.$bulkUI.append(HangarExt.$bulkUI.$inner);
  HangarExt.$bulkUI.$inner.append(
    HangarExt.$bulkUI.$loading,
    HangarExt.$bulkUI.$value,
    HangarExt.$bulkUI.$downloads,
    $('<div>', { class: 'top-line-thin' }),
    $('<div>', { class: 'top-line' }),
    $('<div>', { class: 'corner corner-top-right' }),
    $('<div>', { class: 'corner corner-bottom-right' }));

  HangarExt.$bulkUI.$downloads.append(HangarExt.Button('Hangar CSV', 'download js-download-csv', HangarExt._callbacks.DownloadCSV));
  HangarExt.$bulkUI.$downloads.append(HangarExt.Button('Fleet JSON', 'download js-download-json', HangarExt._callbacks.DownloadJSON));

  bulkHeight = $('.js-bulk-ui').height();
  positionUI();
}

HangarExt.EnsureBulkUI = function()
{
  if (HangarExt.$bulkUI && HangarExt.$bulkUI.$inner) {
    return true;
  }
  $('.js-bulk-ui').remove();
  HangarExt.$bulkUI = null;
  if (!$('#billing').length) {
    HangarExt.Log('Hangar-Extension: Cannot create Bulk UI - billing container missing');
    return false;
  }
  HangarExt.BulkUI();
  if (!(HangarExt.$bulkUI && HangarExt.$bulkUI.$inner)) {
    HangarExt.Log('Hangar-Extension: Bulk UI not found - recreation failed');
    return false;
  }
  return true;
};

HangarExt.BindBulkUI = function()
{
  HangarExt.$bulkUI.$inner.removeClass('loading');
  HangarExt.$list.on('click.HangarExt', 'a', function(e) { e.originalEvent.isButton = true; });
  HangarExt.$list.on('click.HangarExt', '.coupon-code-value', function(e) {
    e.originalEvent.isButton = true;
    e.stopPropagation();
    var $code = $(this);
    var code = $code.attr('data-code');
    navigator.clipboard.writeText(code).then(function() {
      $code
        .text('- Copied -')
        .css('cursor', 'default');
      setTimeout(function() {
        $code
          .text(code)
          .css('cursor', '');
      }, 1000);
    }).catch(function() {
      HangarExt.Log('Hangar-Extension: Error copying coupon code');
    });
  });
  HangarExt.$list.on('click.HangarExt', 'li', function(e) {
    if (!e.originalEvent.isButton) {
      const $row = $('.row', this);
      this.filters.is_selected = !this.filters.is_selected;
      $row.toggleClass('js-selected', this.filters.is_selected);
      // wird nur für selected filter benötigt hier
      if ($('.status-selector .js-custom-filter[value="IsSelected"], [value="!IsSelected"]').length > 0) {
        $('.row.active').removeClass('active');
        HangarExt.Render();
        HangarExt.RefreshPager();
      }
      // ...
      HangarExt.SetSelected(this.pledge_id, this.filters.is_selected);
      HangarExt.RefreshBulkUI();
      HangarExt.UpdateResetState();
    }
  });
}

HangarExt.UpdateStatus = function(pageNo, errorCode, retryDelay, retryCount, maxRetries)
{
  if (HangarExt.EnsureBulkUI()) {
    HangarExt.$bulkUI.$loading.empty();

    var status, label, subInfo;
    if (errorCode === 'retrying') {
      status  = 'Loading Error';
      label   = 'Page ' + pageNo;
      subInfo = 'Attempt \u00A0' + retryCount + '\u00A0 of \u00A0' + maxRetries + ' - Retrying in ' + retryDelay + ' sec';
    }
    else if (errorCode === 'failed') {
      status  = 'Refresh Failed';
      label   = 'Page ' + pageNo;
      subInfo = 'Request Limit Reached';
    }
    else {
      var isPreparing = pageNo === 0;
      status  = isPreparing ? 'Preparing' : ( HangarExt._refreshingHangar ? 'Refreshing' : 'Loading' );
      label   = isPreparing ? 'Please wait' : 'Page ' + pageNo;
      subInfo = isPreparing ? 'Initializing Hangar' : ( HangarExt._refreshingHangar ? (HangarExt._userInitiatedRefresh ? ( HangarExt._synchedInvalidation ? 'Browser Sync Request' : 'Local User Request' ) : 'Hangar Data Sync Required') : 'Processing Hangar Data' );
    }

    HangarExt.$bulkUI.$loading.append(
      $('<span>', { class: 'amount', text: status + ' \u2026' }),
      $('<span>', { class: 'label', text: label }),
      $('<br>'),
      $('<span>', { class: 'sub-info', text: subInfo }),
      $('<br>')
    );
  }
}

HangarExt.FinalizeBulkUI = function()
{
  HangarExt.Render();
  HangarExt.RefreshPager();
  HangarExt.CleanupSelectedPledgeIdCache();

  //HangarExt._totalEntries = HangarExt._inventory.length;
  HangarExt.LoadShipMsrp(function() {
    if (HangarExt._setting.ShowSavings) {
      HangarExt.PatchMsrpDiff();
    }
    HangarExt.LoadStoreCredits(function() {
      if (HangarExt.EnsureBulkUI()) {
        HangarExt.BindBulkUI();
        HangarExt.RefreshBulkUI();
        HangarExt.UpdateResetState();
      }
    });
  });
}

HangarExt.ShowBulkSavings = function()
{
  return HangarExt._setting.ShowSavings && (
    HangarExt._displayableSavings == true ||
    //HangarExt._totalSelectedUSDSavingValue !== 0 ||
    HangarExt._filterType == 'HasShip' ||
    HangarExt._filterType == 'IsShip' ||
    HangarExt._filterType == 'IsCombo' ||
    HangarExt._filterType == 'IsPackage' ||
    HangarExt._filterType == 'IsUpgrade' ||
    HangarExt._filterType == 'IsNameable'
  );
};

HangarExt.RefreshBulkUI = function()
{
  if (HangarExt._loadingFromWebsite) {
    return;
  }

  HangarExt._selectedEntries = 0;
  HangarExt._selectedUSDValue = 0.00;
  HangarExt._filteredUSDValue = 0.00;
  HangarExt._totalSelectedUSDSavingValue = 0.00;
  HangarExt._totalFilteredUSDSavingValue = 0.00;
  HangarExt._totalUSDValue = 0.00;
  HangarExt._totalEntries = 0;
  HangarExt._displayableSavings = false;

  $.each(HangarExt._inventory, function(_, item) {
    HangarExt._totalUSDValue += item.melt_value || 0;
    HangarExt._totalEntries++;

    if (item.filters.is_visible) {
      HangarExt._filteredUSDValue += item.melt_value || 0;
      HangarExt._totalFilteredUSDSavingValue += item.total_saving_value || 0;
    }

    if (item.filters.is_selected) {
      HangarExt._selectedEntries++;
      HangarExt._selectedUSDValue += item.melt_value || 0;
      HangarExt._totalSelectedUSDSavingValue += item.total_saving_value || 0;
      //if (!HangarExt._displayableSavings && (item.filters.has_ship || item.filters.is_upgrade)) {
      if (!HangarExt._displayableSavings && item.msrp_ships) {
        HangarExt._displayableSavings = true;
      }
    }
  });

  HangarExt.$bulkUI.$value.empty();

  if (HangarExt._visibleEntries !== HangarExt._totalEntries && HangarExt._selectedEntries == 0) {
    HangarExt.$bulkUI.$value.append(
      $('<span>', { class: 'count' }).append(
        $('<span>', { class: 'amount', text: HangarExt._visibleEntries }),
        $('<span>', { class: 'label', text: 'Filtered' }),
        $('<span>', { class: 'amount', text: HangarExt._totalEntries }),
        $('<span>', { class: 'label', text: (HangarExt._totalEntries==1?'Entry':'Entries') }),
        $('<br>')
       ),
    );
  }
  else {
    HangarExt.$bulkUI.$value.append(
      $('<span>', { class: 'count' }).append(
        $('<span>', { class: 'amount', text: HangarExt._selectedEntries }),
        $('<span>', { class: 'label', text: 'Selected' }),
        $('<span>', { class: 'amount', text: HangarExt._totalEntries }),
        $('<span>', { class: 'label', text: (HangarExt._totalEntries==1?'Entry':'Entries') }),
        $('<br>')
       ),
    );
  }

  var label = 'Hangar';
  var value = HangarExt._totalUSDValue;
  if (HangarExt._selectedEntries > 0 && HangarExt._setting.ShowUSDValues) {
    HangarExt.$bulkUI.$value.append(
      $('<span>', { class: 'count' }).append(
        $('<span>', { class: 'amount', text: HangarExt._selectedUSDValue.toLocaleString('en-US', {minimumFractionDigits: 2}) + ' USD' }),
        $('<span>', { class: 'label', text: 'Selected' }),
        $('<br>')
      ),
    );
    if (HangarExt.ShowBulkSavings()) {
      value = HangarExt._totalSelectedUSDSavingValue;
      label = value < 0 ? 'Overpaid' : 'Saved'
      value = value < 0 ? Math.abs(value) : value;
    }
  }
  else if (HangarExt._visibleEntries !== HangarExt._totalEntries && HangarExt._setting.ShowUSDValues) {
    HangarExt.$bulkUI.$value.append(
      $('<span>', { class: 'count' }).append(
        $('<span>', { class: 'amount', text: HangarExt._filteredUSDValue.toLocaleString('en-US', {minimumFractionDigits: 2}) + ' USD' }),
        $('<span>', { class: 'label', text: 'Filtered' }),
        $('<br>')
      ),
    );
    if (HangarExt.ShowBulkSavings()) {
      value = HangarExt._totalFilteredUSDSavingValue;
      label = value < 0 ? 'Overpaid' : 'Saved'
      value = value < 0 ? Math.abs(value) : value;
    }
  }
  else
  {
    HangarExt.$bulkUI.$value.append(
      $('<span>', { class: 'count' }).append(
        $('<span>', { class: 'amount', text: HangarExt._upgradeCount }),
        $('<span>', { class: 'label-short', text: (HangarExt._upgradeCount==1?'CCU':'CCUs') }),
        $('<span>', { class: 'amount', text: HangarExt._shipCount }),
        $('<span>', { class: 'label-short', text: (HangarExt._shipCount==1?'Ship':'Ships') }),
        $('<span>', { class: 'amount', text: HangarExt._packageCount }),
        $('<span>', { class: 'label', text: (HangarExt._packageCount==1?'Package':'Packages') }),
        $('<br>')
      ),
    );
  }

  HangarExt.$bulkUI.$value.append(
    $('<span>', { class: 'cash' }).append(
      $('<span>', { class: 'amount', text: value.toLocaleString('en-US', {minimumFractionDigits: 2}) + ' USD' }),
      $('<span>', { class: 'label', text: label }),
      $('<br>')
    ),
    $('<span>', { class: 'cash' }).append(
      $('<span>', { class: 'amount', text: HangarExt._storeCredits.toLocaleString('en-US', {minimumFractionDigits: 2}) + ' USD' }),
      $('<span>', { class: 'label', text: 'Credits' }),
      $('<br>')
    ),
  );
}