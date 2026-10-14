var HangarExt = HangarExt || {};

HangarExt._callbacks = HangarExt._callbacks || {};
HangarExt._callbacks.Pager = [];

HangarExt.RefreshPager = function() {
  for (var i = 0, j = HangarExt._callbacks.Pager.length; i < j; i++)
    HangarExt._callbacks.Pager[i]();
}

// Render a toggle that sets the value of an element
HangarExt.Pager = function(options, width, className, callback, renewal)
{
  width = width || '150px';
  className = className || 'js-custom-pager';

  var $control = $('<div>', { class: 'options-selector pager-wrapper ' + className });
  var $pager = $('<div>', { class: 'pager clearfix js-pager' });
  var $left = $('<div>', { class: 'left' });
  var $right = $('<div>', { class: 'right' });
  var maxButtons = 6;

  $control.append($pager);
  $pager.append($left, $right);

  HangarExt._callbacks.Pager.push(function() {

    for (var i = 0, j = options.length; i < j; i++)
    {
      options[i].Selected = HangarExt._itemsPerPage == options[i].Value;
      options[i].Class = '';
    }

    var maxPages = Math.max(1, Math.ceil(HangarExt._visibleEntries / HangarExt._itemsPerPage));
    if (HangarExt._pageNo < 1) {
      HangarExt._pageNo = 1;
    }
    else if (HangarExt._pageNo > maxPages) {
      HangarExt._pageNo = maxPages;
    }

    var firstPage = Math.max(1, HangarExt._pageNo - Math.floor(maxButtons / 2));
    if (firstPage > maxPages - maxButtons) {
      firstPage = Math.max(1, maxPages - maxButtons + 1);
    }

    $left.empty();
    $right.empty();

    $left.append(HangarExt.Dropdown(options, width, className, function(e, pageCount) {
      HangarExt._pageNo = 1;
      HangarExt._itemsPerPage = pageCount;

      if (typeof callback === 'function') {
        callback.call(this, e, HangarExt._pageNo);
      }

      HangarExt.SaveSyncSetting('itemsPerPage', pageCount);
      HangarExt.RefreshPager();
    }));

    if (maxPages <= 1) {
      $left.addClass('mr5');
      return;
    } else {
      $left.removeClass('mr5');
    }

    for (i = firstPage, j = Math.min(firstPage + maxButtons - 1, maxPages); i <= j; i++) {
      $right.append($('<a>', { class: 'trans-02s trans-color' + ((i == HangarExt._pageNo) ? ' active' : ''), rel: i, text: i }));
    }

    var $buttons = $('a', $right);
    $buttons.bind('click', function(e) {
      e.preventDefault();
      e.stopPropagation();

      var $this = $(this);
      var newPage = $this.attr('rel');
      if (newPage != HangarExt._pageNo) {
        HangarExt._pageNo = newPage;
        if (typeof callback === 'function') {
          callback.call(this, e, HangarExt._pageNo);
        }
        HangarExt.RefreshPager();
      }
    });
  });

  if (renewal) {
    HangarExt.BindPagerKeys(callback);
    HangarExt.RefreshPager();
  }

  return $control;
}

HangarExt.BindPagerKeys = function(callback)
{
  $(document).on('keydown', function(e) {
    if (e.target && /input|textarea|select/i.test(e.target.tagName)) {
      return;
    }

    if (HangarExt._itemsPerPage == 9999) {
      return;
    }

    var newPage = HangarExt._pageNo;
    if (e.keyCode === 37) {
      newPage--;
    }
    else if (e.keyCode === 39) {
      newPage++;
    }
    else {
      return;
    }

    var maxPages = Math.max(1, Math.ceil(HangarExt._visibleEntries / HangarExt._itemsPerPage));
    if (maxPages <= 1) {
      return;
    }
    else if (newPage < 1 || newPage > maxPages || newPage === HangarExt._pageNo) {
      return;
    }

    e.preventDefault();

    HangarExt._pageNo = newPage;

    if (typeof callback === 'function') {
      callback.call(this, e, HangarExt._pageNo);
    }

    HangarExt.ScrollToTop();
    HangarExt.RefreshPager();
  });
};