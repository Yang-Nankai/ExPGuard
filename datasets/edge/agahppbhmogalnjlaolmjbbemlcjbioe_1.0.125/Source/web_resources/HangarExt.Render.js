var HangarExt = HangarExt || {};

HangarExt._pageNo = 1;
HangarExt._itemsPerPage = HangarExt._itemsPerPage || 25;//10;
HangarExt._visibleEntries = HangarExt._visibleEntries || 25;//10;

// Render items that match the search, filter and sort criteria
HangarExt.Render = function(refreshUI)
{
  var filterBy = 'js-custom-filter';
  var sortBy = 'js-custom-sort';
  var searchBy = 'js-custom-search';

  filterBy = '.' + filterBy;
  sortBy = '.' + sortBy;
  searchBy = '.' + searchBy;

  var buffer = HangarExt._inventory;
  //var buffer = HangarExt._inventory.slice(0);

  // Sichtbarkeitsstatus für Filter-/Suchergebnis zurücksetzen
  $.each(buffer, function(_, item) {
    item.filters.is_visible = false;
  });

  $(filterBy).each(function() {
    buffer = HangarExt.Filter(buffer, $(this).val());
  });

  $(searchBy).each(function() {
    buffer = HangarExt.Search(buffer, $(this).val());
  });

  $(sortBy).each(function() {
    buffer = HangarExt.Sort(buffer, $(this).val());
  });

  //if (HangarExt._searchTerm.length >= 2) {
  $('.js-custom-search-complete').each(function() {
    $(this).val(HangarExt.SearchSuggestion(buffer, HangarExt._searchTerm));
  });
  //}

  // Alle aktuell gefilterten/gesuchten Einträge markieren
  $.each(buffer, function(_, item) {
    item.filters.is_visible = true;
  });

  HangarExt._visibleEntries = buffer.length;

  var maxPages = Math.max(1, Math.ceil(HangarExt._visibleEntries / HangarExt._itemsPerPage));
  if (HangarExt._pageNo < 1) {
    HangarExt._pageNo = 1;
  }
  else if (HangarExt._pageNo > maxPages) {
    HangarExt._pageNo = maxPages;
  }

  if (HangarExt._visibleEntries > 0 && HangarExt._itemsPerPage < 1000) {
    buffer = buffer.slice((HangarExt._pageNo - 1) * HangarExt._itemsPerPage, HangarExt._pageNo * HangarExt._itemsPerPage);
  }

  if (HangarExt._inventory.length > 0 && HangarExt._visibleEntries === 0 && $('#searchInput').val().trim().length !== 0) {
    buffer.push(
      $('<h4>')
        .addClass('empty-list')
        .text('No Results Found')
    );
  }
  else if (HangarExt._visibleEntries == 0) {
    buffer.push(
      $('<h4>')
        .addClass('empty-list')
        .text('No Entries Found')
    );
  }

  HangarExt.$list.empty();
  HangarExt.$list.append(buffer);
  if (refreshUI) {
    HangarExt.RefreshBulkUI();
    HangarExt.UpdateResetState();
  }
}

HangarExt.PatchMsrpDiff = function()
{
  $.each(HangarExt._inventory, function(_, item) {
    if (!item.msrp_ships) {
      return;
    }
    var currentValue = 0;
    if (item.filters.is_upgrade) {
      var fromValue = HangarExt._shipMsrp[item.msrp_ships[0]];
      var toValue = HangarExt._shipMsrp[item.msrp_ships[1]];
      if (!fromValue || !toValue) {
        return;
      }
      currentValue = toValue - fromValue;
    }
    else {
      for (var i = 0; i < item.msrp_ships.length; i++) {
        var shipValue = HangarExt._shipMsrp[item.msrp_ships[i]];
        if (!shipValue) {
          return;
        }
        currentValue += shipValue;
      }
    }
    $('.with-images > .item', item).each(function() {
      if ($.trim($(this).find('.kind:first').text()) == 'Component') {
        var componentName = $.trim($(this).find('.title:first').text());
        currentValue += HangarExt._contentMsrp[componentName] || 0;
      }
    });
    if (item.filters.has_squadron) {
      currentValue += HangarExt._contentMsrp['Squadron 42 Digital Download'] || 0;
    }
    if (item.filters.has_starcitizen) {
      currentValue += HangarExt._contentMsrp['Star Citizen Digital Download'] || 0;
    }
    var difference = currentValue - item.msrp_value;
    var state = difference > 0 ? 'positive' : (difference < 0 ? 'negative' : 'neutral');
    var symbol = difference > 0 ? '▼' : (difference < 0 ? '▲' : '●');
    var prefix = difference > 0 ? '-' : (difference < 0 ? '+' : '=');
    var value = Math.abs(difference) / 100;
    var percent = currentValue ? Math.abs((difference / currentValue) * 100) : 0;
    $('.js-msrp-diff', item)
      .html(
        '<span class="msrp-diff-value">' +
          '<span class="msrp-diff-symbol-' + state + '">' + symbol + '</span> ' +
          prefix + value.toFixed(2) + ' USD' +
        '</span>' +
        '<span class="msrp-diff-percent">' +
          prefix + percent.toFixed(1) + ' %' +
        '</span>'
      );
    item.total_saving_value = (difference / 100);
  });
};