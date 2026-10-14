var uniqueId = "amazon-analysis-" + chrome.runtime.id;
const isSponsoredStoreKey = uniqueId + "_isSponsoredEnabled";

function updateButtonStatus(key, buttonId) {
  chrome.storage.local.get(key, function (data) {
    if (data[key] === "true" || data[key] === true) {
      $(buttonId).prop("checked", true);
    }
  });
}

function setButtonStatus(key, buttonId, isWithMessage = false) {
  $(buttonId).change(function () {
    chrome.storage.local.set(
      {
        [key]: $(this).is(":checked"),
      },
      function () {
        if (chrome.runtime.lastError) {
          console.error("Error Storing 1: ", chrome.runtime.lastError.message);
        }
      }
    );
    if (isWithMessage) {
      if ($(this).is(":checked")) {
        chrome.tabs.query(
          { currentWindow: true, active: true },
          function (tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, { isEnable: "true" });
          }
        );
      } else {
        chrome.tabs.query(
          { currentWindow: true, active: true },
          function (tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, { isEnable: "false" });
          }
        );
      }
    }
  });
}

(function () {
  let userPackage = null;
  chrome.runtime.sendMessage({ message: "userStatus" }, function (response) {
    userPackage = response?.userPackage;

    if (!response.userStatus) {
      chrome.runtime.sendMessage({ message: "login" }, function (response) {
        if (response == "fail") {
          window.location.replace("./pop-up-sign-in.html");
          console.error("login fail");
        } else {
          chrome.tabs.query(
            { currentWindow: true, active: true },
            function (tabs) {
              var activeTab = tabs[0];
              chrome.tabs.sendMessage(activeTab.id, { isEnable: "true" });
            }
          );
        }
      });
    }
  });

  chrome.storage.local.get(["token"], async function (response) {
    const res = await fetch(
      `https://go.selfpublishingtitans.com/api/v1/check/huge-expander`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${response.token}`,
        },
      }
    );

    let resJson = await res.json();
    if (
      res.status === 401 ||
      resJson.error == "Unauthorized" ||
      resJson.error == "Invalid token"
    ) {
      chrome.runtime.sendMessage(
        { message: "logout", payload: {} },
        function (response) {
          window.location.replace("./pop-up-sign-in.html");
        }
      );
    }
    // if (resJson.data) {
    //   document.getElementById("titanpro").style.display = "none";
    // } else {
    //   document.getElementById("titanpro").style.display = "block";
    // }
  });
})();

// quick view enabled/disabled
updateButtonStatus(uniqueId + "_isEnable", "#extension_status");
setButtonStatus(uniqueId + "_isEnable", "#extension_status", true);

// quick_view_lite
updateButtonStatus(uniqueId + "_quickViewFull", "#quick_view_lite");
setButtonStatus(uniqueId + "_quickViewFull", "#quick_view_lite");
setButtonStatus(uniqueId + "_isDeepViewSummaryCollapsed", "#quick_view_lite");

// include sponsored ads
updateButtonStatus(isSponsoredStoreKey, "#is_sponsored_status");
setButtonStatus(isSponsoredStoreKey, "#is_sponsored_status");

// product Page Graph
var productPageGraph = uniqueId + "_productPageGraph";
updateButtonStatus(productPageGraph, "#product_page_graph_status");
setButtonStatus(productPageGraph, "#product_page_graph_status");

// Product Page deep view Widget
var productPageDeepViewWidget = uniqueId + "_productPageDeepViewWidget";
updateButtonStatus(productPageDeepViewWidget, "#product_page_deep_view_widget_status");
setButtonStatus(productPageDeepViewWidget, "#product_page_deep_view_widget_status");

// search Page Deep View Widget
var searchPageDeepViewWidget = uniqueId + "_deepViewSummary";
updateButtonStatus(searchPageDeepViewWidget, "#search_page_deep_view_widget_status");
setButtonStatus(searchPageDeepViewWidget, "#search_page_deep_view_widget_status");

// Search Page Product Card
// var searchPageProductCard = uniqueId + "_searchPageProductCard";
// updateButtonStatus(searchPageProductCard, "#search_page_product_card_status");
// setButtonStatus(searchPageProductCard, "#search_page_product_card_status");

// product details Popup
var productDetailsPopup = uniqueId + "_productDetailsPopup";
updateButtonStatus(productDetailsPopup, "#product_details_popup_status");
setButtonStatus(productDetailsPopup, "#product_details_popup_status");

// Deep View
var deepView = uniqueId + "_deepView";
updateButtonStatus(deepView, "#deep_view_status");
setButtonStatus(deepView, "#deep_view_status");

// let salesData = uniqueId + "_isSalesCollapsed";
// updateButtonStatus(salesData, "#sales_data_collapsed_status");
// setButtonStatus(salesData, "#sales_data_collapsed_status");

// box_full_or_lite_status
let boxFullOrLite = uniqueId + "_productBoxFullOrLite";
updateButtonStatus(boxFullOrLite, "#box_full_or_lite_status");
setButtonStatus(boxFullOrLite, "#box_full_or_lite_status");

const treadMark = uniqueId + "_treadMark";
updateButtonStatus(treadMark, "#tread_mark_status");
setButtonStatus(treadMark, "#tread_mark_status");

const guidelineStatus = uniqueId + "_guidelineStatus";
updateButtonStatus(guidelineStatus, "#guideline_status");
setButtonStatus(guidelineStatus, "#guideline_status");

document.querySelector("#go-to-options").addEventListener("click", function () {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL("options.html"));
  }
});
