var HangarExt = HangarExt || {};

HangarExt.ProcessPage = function($page, pageNo, preload)
{
  var isEmpty = $('.list-items > li > .empty-list', $page).length > 0;
  var isDuplicate = false;
  var $items = $('.list-items > li', $page);

  if (!isEmpty && $items.length > 0)
  {
    var firstPledgeId = $('.js-pledge-id', $items.first()).val();
    if (firstPledgeId && firstPledgeId === HangarExt._lastFirstPledgeId) {
      isDuplicate = true;
    }
    else {
      HangarExt._lastFirstPledgeId = firstPledgeId;
    }
  }

  if (!isEmpty && !isDuplicate) {
    if (HangarExt._targetedPledgeId) {
      $items.each(function() {
        var pledge_id = parseInt(($('.js-pledge-id', this).val() || '').trim(), 10);
        if (pledge_id == HangarExt._targetedPledgeId) {
          this.pledge_id = pledge_id;
          HangarExt.ParsePledge.apply(this);
          return false;
        }
      });
      isDuplicate = true;
    }
    else {
      $items.each(HangarExt.ParsePledge);
    }
  }

  if (HangarExt._targetedPledgeId) {
    HangarExt.RebuildCache();
  }
  else if (isEmpty || isDuplicate || $items.length < 10) {
    HangarExt._loadingFromWebsite = false;
    HangarExt._userInitiatedRefresh = false;
    HangarExt._synchedInvalidation = false;
    HangarExt._refreshingHangar = false;

    HangarExt.SaveCache();
    HangarExt.FinalizeBulkUI();
  }
  else {
    HangarExt.Render();
    if (HangarExt._itemsPerPage != 9999) {
      HangarExt.RefreshPager();
    }
    if (!preload) {
      HangarExt.LoadPage(pageNo + 1);
    }
  }
};