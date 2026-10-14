var HangarExt = HangarExt || {};

HangarExt.SearchBox = function()
{
  const $searchBox = $('<input>', {
    id: 'searchInput',
    class: 'js-custom-search',
    placeholder: 'Search your Hangar ...'
  });

  const $searchBoxMirror = $('<input>', {
    class: 'js-custom-search-complete',
    disabled: 'disabled'
  });

  function updateSearch()
  {
    if (this.value.length < 2) {
      HangarExt.ResetInputField(this.value.length == 1);
    }

    if (this.value.length > 0) {
      $('.js-custom-search-reset').show();
    } else {
      $('.js-custom-search-reset').hide();
    }

    HangarExt.Render(true);
    HangarExt.RefreshPager();

    if (HangarExt._cachedSearchTerm && (!HangarExt._visibleEntries || HangarExt._visibleEntries == HangarExt._totalEntries)) {
      HangarExt._searchTerm = '';
      HangarExt.SaveLocalSetting('filterSearch', '');
      HangarExt._cachedSearchTerm = false;
    }
  }

  $searchBox.keydown(function(event) {
    if (event.keyCode === 9) {
      event.preventDefault();

      if (HangarExt._suggestion.trim().length > 0) {
        $('#searchInput').val(HangarExt._suggestion);
        updateSearch.call(this);
      }
    }
  });

  $searchBox.on('input', updateSearch);

  return [$searchBox[0], $searchBoxMirror[0]];
};

HangarExt.ResetInputField = function(suggestionsOnly)
{
  if (!suggestionsOnly) {
    $('#searchInput').val('');
  }
  $('.js-custom-search-complete').val('');

  HangarExt._searchTerm = '';
  HangarExt._suggestion = '';
}

HangarExt.SearchReset = function()
{
  return $('<a>', {
    class: 'js-custom-search-reset',
    text: '✕'
  }).hide().bind('click.HangarExt', function(e) {
    e.preventDefault();
    e.stopPropagation();

    HangarExt.ResetInputField();

    if (HangarExt._cachedSearchTerm) {
      HangarExt.SaveLocalSetting('filterSearch', '');
      HangarExt._cachedSearchTerm = false;
    }

    $(this).hide();

    HangarExt.Render(true);
    HangarExt.RefreshPager();
  })[0];
};

HangarExt.RestoreSearchTerm = function()
{
  var $searchBox = $('#searchInput');

  if (!$searchBox.length || !HangarExt._searchTerm.length) {
    return;
  }

  $searchBox.val(HangarExt._searchTerm);

  $('.js-custom-search-reset').show();

  $searchBox.focus();
  $searchBox[0].setSelectionRange(
    HangarExt._searchTerm.length,
    HangarExt._searchTerm.length
  );
};