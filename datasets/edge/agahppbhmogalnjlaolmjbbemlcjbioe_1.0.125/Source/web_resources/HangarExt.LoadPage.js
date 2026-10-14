
var HangarExt = HangarExt || {};

HangarExt._processedRequests = HangarExt._processedRequests || {};

HangarExt._pageLoadDelay = 250;
HangarExt._pageTimeout = 3000;
HangarExt._pageRetryDelays = [5, 30, 60];
HangarExt._pageRetryableErrors = {
  0: true,   // No response, timeout, connection aborted oder RSI/gateway interruption
  429: true, // Too Many Requests (rate limit)
  500: true, // Internal Server Error
  502: true, // Bad Gateway
  503: true, // Service Unavailable
  504: true  // Gateway Timeout
};

HangarExt.LoadPage = function(pageNo, targetedQuery)
{
  pageNo = pageNo || 1;
  if (targetedQuery) {
    HangarExt._targetedPledgeId = targetedQuery;
    HangarExt.FetchPage(pageNo);
  }
  else {
    HangarExt.UpdateStatus(pageNo);
    if (pageNo === 1) {
      HangarExt._loadingFromWebsite = true;
      HangarExt._lastFirstPledgeId = null;
      if (HangarExt.IsCurrentHangarPageReady()) {
        return HangarExt.ProcessPage(document.body, pageNo);
      }
      HangarExt.FetchPage(pageNo);
    }
    else {
      setTimeout(function() {
        HangarExt.FetchPage(pageNo);
      }, HangarExt._pageLoadDelay);
    }
  }
}

HangarExt.PreloadForCache = function()
{
  HangarExt._loadingFromWebsite = true;
  HangarExt._lastFirstPledgeId = null;
  if (HangarExt.IsCurrentHangarPageReady()) {
    HangarExt.ProcessPage(document.body, 1, true);
    return true;
  }
  return false;
}

HangarExt.FetchPage = function(pageNo, retryCount)
{
  retryCount = retryCount || 0;
  $.ajax({
    url: '/account/pledges?page=' + pageNo,
    method: 'GET',
    dataType: 'html',
    timeout: HangarExt._pageTimeout,
    success: function(data) {
      if (HangarExt._processedRequests[pageNo]) {
        HangarExt.Log('Hangar-Extension: Ignored duplicate response for already processed page ' + pageNo);
      }
      else {
        HangarExt._processedRequests[pageNo] = true;

        var $tmp = $('<div>').html(data);
        var page = $tmp.find('.page-wrapper')[0] || $tmp[0];
        HangarExt.ProcessPage(page, pageNo);
      }
    },
    error: function(xhr, textStatus) {
      if (HangarExt._processedRequests[pageNo]) {
        HangarExt.Log('Hangar-Extension: Ignored outdated error response for page ' + pageNo);
      }
      else if (HangarExt._pageRetryableErrors[xhr.status]) {
        var maxRetries = HangarExt._pageRetryDelays.length;
        if (retryCount < maxRetries) {
          var retryDelay = HangarExt._pageRetryDelays[retryCount];
          var errorText = xhr.status ? 'Error ' + xhr.status : 'Timeout';
          HangarExt.Log('Hangar-Extension: ' + errorText + ' on page ' + pageNo + ', retrying in ' + retryDelay + ' seconds');
          HangarExt.ScheduleFetchRetry(pageNo, retryDelay, retryCount + 1, maxRetries);
        }
        else {
          var errorText = xhr.status ? 'error ' + xhr.status : 'a timeout';
          HangarExt.Log('Hangar-Extension: Could not load page ' + pageNo + ' due to ' + errorText + '. Aborted after ' + retryCount + ' attempts');
          HangarExt.UpdateStatus(pageNo, 'failed');
        }
      }
      else {
        var errorText = xhr.status ? 'error ' + xhr.status : 'a timeout';
        HangarExt.Log('Hangar-Extension: Failed to load Hangar page ' + pageNo + ' due to ' + errorText);
        HangarExt.UpdateStatus(pageNo, 'failed');
      }
    }
  });
}

HangarExt.ScheduleFetchRetry = function(pageNo, retryDelay, retryCount, maxRetries)
{
  HangarExt.UpdateStatus(pageNo, 'retrying', retryDelay, retryCount, maxRetries);

  var remaining = retryDelay;
  var timer = setInterval(function() {
    remaining--;
    if (remaining <= 0) {
      clearInterval(timer);
      HangarExt.UpdateStatus(pageNo);
      HangarExt.FetchPage(pageNo, retryCount);
    }
    else {
      HangarExt.UpdateStatus(pageNo, 'retrying', remaining, retryCount, maxRetries);
    }
  }, 1000);
};

HangarExt.IsCurrentHangarPageReady = function()
{
  if (!document.location.pathname.includes('/account/pledges')) {
    return false;
  }
  var params = new URLSearchParams(document.location.search);
  var page = params.get('page') || '1';
  if (page !== '1') {
    return false;
  }
  for (const [key, value] of params.entries()) {
    if (key !== 'page' && value !== '') {
      return false;
    }
  }
  return true;
};