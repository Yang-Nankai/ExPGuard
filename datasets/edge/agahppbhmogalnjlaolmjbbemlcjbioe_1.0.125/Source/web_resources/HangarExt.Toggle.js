
var HangarExt = HangarExt || {};

// Render a toggle that sets the value of an element
HangarExt.Toggle = function(label, value1, value2)
{
  var $toggle = $('<div>', { class: 'status-selector tag-wrapper' });
  if (label === 'Reset') {
    $toggle.addClass('last-wrapper');
  }
  var $tag = $('<div>', { class: 'tag js-tag' }).append(
    $('<div>', { class: 'left' }).append(
      $('<div>', { class: 'effect trans-02s trans-opacity' })),
    $('<div>', { class: 'tag-content' }).append(
      $('<div>', { class: 'effect trans-02s trans-opacity' }),
      $('<span>', { class: 'text', text: label })
    )
  );

	label = $.trim(label).replace(/\s+/g, '');
  var defaultValue = HangarExt._filter[label] || '';

  // TODO: Set default value
  var $value = $('<input>', { type: 'hidden', class: 'js-custom-filter', value: defaultValue });

  $toggle.append($tag);
  $toggle.append($value);

  $toggle.Value1 = value1 || '';
  $toggle.Value2 = value2 || '';

  var getState = function()
  {
    if ($value.val() == '')
      return null;
    else if ($value.val() == $toggle.Value2)
      return false;
    else
      return true;
  }

  var updateState = function()
  {
    var state = getState();
    var wasOn = $tag.hasClass('on');

    $tag.removeClass('off');
    $tag.removeClass('on');

    switch (state)
    {
      case true: $tag.addClass('on'); break;
      case false: $tag.addClass('off'); break;
    }
    return wasOn;
  };

  updateState();

  var buttonHandler = function(label, value, wasOn)
  {
    if (label === 'Reset') {
      if (!wasOn) {
          return;
      }

			var removeKeys = [];
      $.each(HangarExt._filter, function(key) {
        HangarExt._filter[key] = '';
				removeKeys.push('filter' + key);
			});
      HangarExt.RemoveLocalSettings(removeKeys);

      $('.js-tag.on, .js-tag.off').removeClass('on off');
      $('.status-selector .js-custom-filter').val('');

      HangarExt.$list.empty();
      HangarExt.$list.append(HangarExt._inventory);

      $('.js-inventory .js-selected').removeClass('js-selected');
      $.each(HangarExt._inventory, function(_, item) {
        if (item.filters) {
          item.filters.is_selected = false;
        }
      });
      HangarExt.ResetSelectedPledgeIdCache();
    }
    else {
      HangarExt._filter[label] = value;
      HangarExt.SaveLocalSetting('filter' + label, value);
    }

    $('.row.active').removeClass('active');

    HangarExt.Render(true);
    HangarExt.RefreshPager();
  };

  $toggle.bind('click', function(e) {

    var state = getState();
    switch (state)
    {
      case null:  $value.val($toggle.Value1); break;
      case true:  $value.val($toggle.Value2); break;
      case false: $value.val(null); break;
    }

    buttonHandler(label, $value.val(), updateState());
  });

  return $toggle;
}

HangarExt.UpdateResetState = function()
{
  var $reset = $('.last-wrapper .js-tag');
  var active =
    $('.js-inventory .js-selected').length > 0 ||
    $('.js-tag.on').not($reset).length > 0 ||
    $('.js-tag.off').length > 0 ||
    $('.row.active').length > 0;

  $reset.toggleClass('on', active);
};