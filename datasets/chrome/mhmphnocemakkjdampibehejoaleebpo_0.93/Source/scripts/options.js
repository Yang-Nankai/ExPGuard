function isValidTab( tab ) {
    if (tab == null) return false;
    var url = new URL(tab.url);
    if (url.protocol == "https:" || url.protocol == "http:") {
        return true;
    }
    return false;
};

function sendCloseNotificationMsg(  ) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs.length > 0) {
          var tab = tabs[0];
          if (isValidTab(tab)) {
              chrome.tabs.sendMessage(tab.id, { data: "closeNotification" })
          }
      }
    });
};

sendCloseNotificationMsg();

/*var supernovaOptions = (function() {

}());
$(document).ready(function () {
 //reload options
});
*/