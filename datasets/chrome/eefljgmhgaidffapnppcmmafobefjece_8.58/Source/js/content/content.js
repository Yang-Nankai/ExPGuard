var uniqueId = "amazon-analysis-" + chrome.runtime.id;

let token;

chrome.storage.local.get(["token"], function (response) {
  token = response.token;
});
//data-titans-quick-view-id
let bodyElement = document.body;
// add extension id in body using data attribute
if (bodyElement) {
  bodyElement.setAttribute(
    "data-titans-quick-view-extension-id",
    chrome.runtime.id
  );
}
const hostname = window.location.hostname;
let isSponsoredEnabled = false;
const isSponsoredStoreKey = uniqueId + "_isSponsoredEnabled";
let searchPageAllWords = [];

try {
  window.addEventListener("online", () => console.info("Became online"));
  window.addEventListener("offline", () => console.info("Became offline"));
} catch (error) {
  console.error(error);
}

function sendRequestUsingBackgroundScript(message, payload) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ message, payload }, function (response) {
      resolve(response);
    });
  });
}

function handleFloatingManuLogin() {
  // #floating-menu iterate all children and hide them
  $("#floating-menu")
    .children()
    .each(function () {
      $(this).hide();
    });

  // #login-div show
  $("#login-div").show();

  $(`.${stylePrefix}-palceholder`).click(function () {
    $(this).siblings("input").focus();
  });

  $(`.${stylePrefix}-form-control`).focus(function () {
    $(this).parent().addClass("focused");
  });

  $(`.${stylePrefix}-form-control`).blur(function () {
    var $this = $(this);
    if ($this.val().length == 0) $(this).parent().removeClass("focused");
  });
  $(`.${stylePrefix}-form-control`).blur();
  // if value is not empty then add focused class
  $(`.${stylePrefix}-form-control`).each(function () {
    if ($(this).val().length > 0) {
      $(this).parent().addClass("focused");
    }
  });
}

async function addWordCounter(isDeepViewPaid, isTrail = false) {
  if (isDeepViewPaid || isTrail) {
    appendWordListDiv(
      searchPageAllWords,
      document.getElementById("word-count"),
      "word-list-search-page"
    );
  } else {
    const wordCounterDiv = document.getElementById("word-count");
    if (wordCounterDiv) {
      wordCounterDiv.style.filter = "blur(8px)";
      wordCounterDiv.classList.add("price-popup");

      let dummyWordList = [];
      for (let i = 0; i < 30; i++) {
        dummyWordList.push("dummy " + i);
      }

      appendWordListDiv(dummyWordList, wordCounterDiv, "word-list-search-page");
    }
  }
}

async function showHeader(
  reviews,
  isTrail = false,
  existingSearchVolume = null
) {
  if (isSptAllInOneUnifiedActive()) {
    return;
  }
  // reviews under 50
  const reviewsUnder50 = reviews.filter((review) => review < 50).length || 0;
  // reviews under 5
  const reviewsUnder5 = reviews.filter((review) => review < 5).length || 0;

  const summaryContainer = document.getElementById("page-summary");
  if (summaryContainer) {
    summaryContainer.remove();
  }
  if (!token) {
    return;
  }
  const wordCounterAPIPrams = {
    token,
    url: "https://go.selfpublishingtitans.com/api/v1/check/word-counter",
    method: "GET",
  };
  const response = await sendRequestUsingBackgroundScript(
    "apiRequest",
    wordCounterAPIPrams
  );

  let isDeepViewPaid = true;
  let trialLeft = 0;
  if (response && response.error && response.error === "user not paid") {
    isDeepViewPaid = false;
    // get number of free trials left
    const wordCounterAPIPrams = {
      token,
      url: "https://go.selfpublishingtitans.com/api/v1/amazon-sell-center/deep-view-trials-left",
      method: "GET",
    };
    const response = await sendRequestUsingBackgroundScript(
      "apiRequest",
      wordCounterAPIPrams
    );

    if (response && response.data.data.numberOfTrails) {
      trialLeft = response.data.data.numberOfTrails;
    }
  }

  const pageSummary = document.createElement("div");
  pageSummary.id = "page-summary";
  pageSummary.style.display = "block";

  pageSummary.innerHTML = `
  <div id="product-info" style="position: relative;">
    <div style="
        font-size: 14px;
        line-height: 18px;
        color: rgb(72, 94, 117);
        padding: 8px;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        gap: 8px;
        background-color: #E0D6FF;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        display: flex;
        justify-content: space-between;
        ">

                    <div style="display: flex; align-items: center; gap: 8px;">
                        <img src="chrome-extension://${
                          chrome.runtime.id
                        }/assets/images/04.png" height="22px" />

                        <div style="display: flex; flex-direction: column; gap: 4px;">
                        <div style="font-size: 22px; font-weight: bold;" class="${stylePrefix}-kdplogoword">
                        Titans Quick View
                        </div>
                    
                        <div style="display: flex; align-items: center; gap: 8px; ${
                          isDeepViewPaid ? "display: none;" : ""
                        }" hidden="${isDeepViewPaid}">
                        Trial Left: <span>${trialLeft}</span>
                        </div>
                        </div>
                    </div>

                          <div class=" ${stylePrefix}-white-rounded-box">
                          Under 50 Reviews: <span style="font-size: 14px; ${
                            isDeepViewPaid || isTrail
                              ? ""
                              : "filter: blur(8px);"
                          }"   
                                class="${
                                  isDeepViewPaid || isTrail ? "" : "price-popup"
                                }"
                                > ${
                                  isDeepViewPaid || isTrail
                                    ? numberWithCommas(reviewsUnder50 || 0) || 0
                                    : "0"
                                }/${numberWithCommas(reviews.length)} </span> 
                          </div>

                          <div class="${stylePrefix}-white-rounded-box" style="font-size: 14px;">
                          Under 5 Review: 
                                <span class="${
                                  isDeepViewPaid || isTrail ? "" : "price-popup"
                                }" style="font-size: 14px; ${
    isDeepViewPaid || isTrail ? "" : "filter: blur(8px);"
  }">
                                ${
                                  isDeepViewPaid || isTrail
                                    ? numberWithCommas(reviewsUnder5 || 0) || 0
                                    : "0"
                                }/${numberWithCommas(reviews.length)}
                                </span>
                          </div>

                        <div class=" ${stylePrefix}-white-rounded-box" style="font-size: 14px;">
                        
                            30 Day Search Volume:
                              <span>
                              ${
                                existingSearchVolume
                                  ? existingSearchVolume.outerHTML
                                  : `<span class="" style="font-size: 14px;" id="search-volume">Loading...</span>`
                              }
                              </span>
                        </div>

                    

                    
                    <div>
                            <button class="${stylePrefix}-mui-purple-btn" style="outline: none; border: none; ${
    isDeepViewPaid ? "display: none;" : ""
  }" id="run-trial-btn">Run Free Trial
                            </button>
                            <button class="${stylePrefix}-mui-purple-btn price-popup" style="outline: none; border: none; font-size: 14px; background: white; color: black !important; border: 2px solid rgb(130, 87, 254); ${
    isDeepViewPaid ? "display: none;" : ""
  }">Upgrade</button>

                            <button style="cursor: pointer; border: none; background: none; outline: none;" id="${stylePrefix}-deep-summary-expander-btn">
                                    <img src="chrome-extension://${
                                      chrome.runtime.id
                                    }/assets/svgs/up-arrow.svg" alt=""  height="32px" id="${stylePrefix}-deep-summary-expander-icon" >
                            </button>
                    </div>
      </div>
    </div>
    <div id="${stylePrefix}-deep-view-summary-main-container" style="display: none; box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px 0px; border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px; margin-bottom: 16px;">

    <div style="font-size: 16px;
    font-weight: 600;
    text-align: center;
    display: flex;
    justify-items: center;
    justify-content: center;
    align-items: center;" >
    Words used in product titles:
    </div>
    
    <div style="display: block; width: 90%">
      <div id="word-count"> </div>
    </div>
    </div>
  </div>
  `;

  // insert as the first child of data-component-type="s-search-results" span
  const searchResults = document.querySelector(
    '[data-component-type="s-search-results"]'
  );
  if (searchResults) {
    searchResults.insertBefore(pageSummary, searchResults.firstChild);
  }

  // check if main container is collapsed or not
  chrome.storage.local.get(
    [uniqueId + "_isDeepViewSummaryCollapsed"],
    function (response) {
      if (response[uniqueId + "_isDeepViewSummaryCollapsed"]) {
        const deepViewSummaryMainContainer = document.getElementById(
          `${stylePrefix}-deep-view-summary-main-container`
        );
        deepViewSummaryMainContainer.style.display = "flex";
        // change the icon
        const deepSummaryExpanderIcon = document.getElementById(
          `${stylePrefix}-deep-summary-expander-icon`
        );
        deepSummaryExpanderIcon.src = `chrome-extension://${chrome.runtime.id}/assets/svgs/up-arrow.svg`;
      } else {
        const deepViewSummaryMainContainer = document.getElementById(
          `${stylePrefix}-deep-view-summary-main-container`
        );
        deepViewSummaryMainContainer.style.display = "none";
        // change the icon
        const deepSummaryExpanderIcon = document.getElementById(
          `${stylePrefix}-deep-summary-expander-icon`
        );
        deepSummaryExpanderIcon.src = `chrome-extension://${chrome.runtime.id}/assets/svgs/down-arrow.svg`;
      }
    }
  );

  // add event listener on deep view summary expander button
  const deepSummaryExpanderBtn = document.getElementById(
    `${stylePrefix}-deep-summary-expander-btn`
  );
  if (deepSummaryExpanderBtn) {
    deepSummaryExpanderBtn.addEventListener("click", function () {
      const deepViewSummaryMainContainer = document.getElementById(
        `${stylePrefix}-deep-view-summary-main-container`
      );
      if (deepViewSummaryMainContainer.style.display === "none") {
        deepViewSummaryMainContainer.style.display = "flex";
        // change the icon
        const deepSummaryExpanderIcon = document.getElementById(
          `${stylePrefix}-deep-summary-expander-icon`
        );
        deepSummaryExpanderIcon.src = `chrome-extension://${chrome.runtime.id}/assets/svgs/up-arrow.svg`;
        // save the state in local storage
        chrome.storage.local.set({
          [uniqueId + "_isDeepViewSummaryCollapsed"]: true,
        });
      } else {
        deepViewSummaryMainContainer.style.display = "none";
        // change the icon
        const deepSummaryExpanderIcon = document.getElementById(
          `${stylePrefix}-deep-summary-expander-icon`
        );
        deepSummaryExpanderIcon.src = `chrome-extension://${chrome.runtime.id}/assets/svgs/down-arrow.svg`;
        // save the state in local storage
        chrome.storage.local.set({
          [uniqueId + "_isDeepViewSummaryCollapsed"]: false,
        });
      }
    });
  }

  if (trialLeft <= 0) {
    // disable the run trial button
    $("#run-trial-btn").prop("disabled", true);
  } else {
    // add event listener on run trial button
    const runTrialBtn = document.getElementById("run-trial-btn");
    if (runTrialBtn) {
      runTrialBtn.addEventListener("click", async function () {
        // update the trial left
        const wordCounterAPIPrams = {
          body: {},
          token,
          url: "https://go.selfpublishingtitans.com/api/v1/amazon-sell-center/update-deep-view-trial",
          method: "POST",
        };
        const response = await sendRequestUsingBackgroundScript(
          "apiRequest",
          wordCounterAPIPrams
        );
        if (response && response.data.status === "success") {
          const existingSearchVolume = document.getElementById("search-volume");

          showHeader(reviews, true, existingSearchVolume);
        }
      });
    }
  }
  // check if user is paid for deep view or not
  addWordCounter(isDeepViewPaid, isTrail);
}

function handleFloatingMenu() {
  // check if floating menu already exists
  if (document.getElementById("draggableDiv")) {
    return;
  }

  document.body.insertAdjacentHTML("beforeend", floatingMenuHTML);

  const draggableDiv = document.getElementById("draggableDiv");

  const floatingMenu = document.getElementById("floating-menu");

  draggableDiv.addEventListener("mousedown", function (e) {
    e.preventDefault(); // Prevent default browser behavior like text selection
    const rect = draggableDiv.getBoundingClientRect();
    const offsetY = rect.bottom - e.clientY; // Calculate the initial offset from the bottom edge of the draggable element

    document.addEventListener("mousemove", moveElement);
    document.addEventListener("mouseup", stopDrag);

    function moveElement(e) {
      const y = window.innerHeight - e.clientY - offsetY;
      draggableDiv.style.bottom = Math.max(y, 100) + "px"; // Ensure the bottom value doesn't go below 0
      if (y > window.innerHeight - 100) {
        draggableDiv.style.bottom = window.innerHeight - 100 + "px";
      }

      const floatingMenuRect = floatingMenu.getBoundingClientRect();
      const floatingMenuHeight = Math.max(floatingMenuRect.height, 400);
      const minY = Math.min(y, window.innerHeight - floatingMenuHeight - 100);
      const finalY = Math.max(minY, 100);
      // Update the floating menu position
      floatingMenu.style.bottom = finalY + "px"; // Ensure the bottom value doesn't go below 0
    }

    function stopDrag() {
      document.removeEventListener("mousemove", moveElement);
      document.removeEventListener("mouseup", stopDrag);
    }
  });

  draggableDiv.addEventListener("click", function (e) {
    e.stopPropagation();
    // toggle the floating menu
    if (floatingMenu.style.display === "block") {
      floatingMenu.style.display = "none";
    } else {
      // check if user is logged in
      chrome.storage.local.get(
        ["userStatus", "userInfo", "token"],
        function (response) {
          if (!response.userStatus) {
            chrome.runtime.sendMessage(
              { message: "login", payload: {} },
              function (response) {
                chrome.storage.local.set({ isEnable: "true" });
                if (response == "success") {
                  floatingMenu.style.display = "block";
                }

                if (response == "fail") {
                  floatingMenu.style.display = "block";
                  handleFloatingManuLogin();
                } else {
                  floatingMenu.style.display = "block";
                  handleFloatingManuLogin();
                }
              }
            );
            return;
          } else {
            floatingMenu.style.display = "block";
            // hide the titans pro search div
            $("#titans-pro-search-div").hide();
            $("#floating-menu-items").css("display", "grid");
          }
        }
      );
    }
  });

  // Close the floating menu when the user clicks outside of it
  document.addEventListener("click", function (e) {
    if (
      e.target !== floatingMenu &&
      !floatingMenu.contains(e.target) &&
      e.target.id !== "search-input"
    ) {
      floatingMenu.style.display = "none";
    }
  });

  //#titans-pro-btn on click hide #floating-menu-items and show #titans-pro-search-div
  $(document).on("click", "#titans-pro-btn", function (event) {
    event.preventDefault();
    $("#floating-menu-items").hide();
    $("#titans-pro-search-div").css("display", "flex");
  });

  // on click Run Titans Pro button send keyword to the amazon search bar and open the titans pro
  $(document).on("click", "#run-titans-pro-btn", function (event) {
    event.preventDefault();
    const keyword = $("#titans-pro-search-input").val();

    if (keyword.length > 0) {
      // if Titans Pro is not installed then open the Titans Pro website
      // check titans-pro-icon-btn is exists or not
      if ($("#titans-pro-icon-btn").length == 0) {
        // titans-pro/on-site?domain=amazon.de&keyword=coloring+books
        const url = `https://selfpublishingtitans.com/titans-pro/on-site?domain=${hostname}&keyword=${keyword}`;
        window.open(url, "_blank");
      } else {
        $("#twotabsearchtextbox").val(keyword);
        $("#titans-pro-icon-btn").click();
        $("#titans-pro-search-div").hide();
        $("#floating-menu-items").css("display", "grid");
        $("#floating-menu").hide();
      }
    }
  });

  // #titans-pro-icon-btn-cancel
  $(document).on("click", "#titans-pro-icon-btn-cancel", function (event) {
    event.preventDefault();
    $("#titans-pro-search-div").hide();
    $("#floating-menu-items").css("display", "grid");
  });

  draggableDiv.style.bottom = "200px";
}

function sendRequestUsingBackgroundScript(message, payload) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ message, payload }, function (response) {
      resolve(response);
    });
  });
}

function containsWord(str, word) {
  srt = str.toLowerCase();
  word = word.toLowerCase();
  // Escape special characters in the word
  const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // Create a regular expression pattern with optional 's' character
  const pattern = new RegExp(`\\b${escapedWord}s?\\b`, "i");

  // Test if the pattern exists in the string
  return pattern.test(str);
}

$(document).on("submit", "#spt-login", function (event) {
  event.preventDefault();

  $(".logdiv").css("display", "none");
  $(`.${stylePrefix}-loader-s`).css("display", "block");
  $(".wrongpass").css("display", "none");
  const username = $("#username").val();
  const password = $("#password").val();

  if (username && password) {
    chrome.runtime.sendMessage(
      { message: "manualLogin", payload: { username, password } },
      function (response) {
        if (response == "success") {
          location.reload();
        }

        if (response == "fail") {
          $(`.${stylePrefix}-loader-s`).css("display", "none");
          $(".wrongpass").css("display", "block");
          $(".logdiv").css("display", "flex");

          setTimeout(function () {
            $(".wrongpass").css("display", "none");
          }, 3000);
        }
      }
    );
  } else {
    $("#username").attr("placeholder", "Enter a username.");
    $("#password").attr("placeholder", "Enter a password.");
    $("#username").css("border", "2px solid red");
    $("#password").css("border", "2px solid red");
    $(".logdiv").css("display", "flex");
    $(`.${stylePrefix}-loader-s`).css("display", "none");
  }
});

/**
 * Get amazon products url
 */
function getProductUrls() {
  return new Promise(async (resolve, reject) => {
    const nodes = document.querySelectorAll(
      ".s-main-slot.s-result-list [data-component-type=s-search-result]"
    );
    const links = [];
    nodes.forEach((item) => {
      try {
        // .match(/\d+((.|,)\d+)?/) get price from string
        let price = 0;
        if (
          item &&
          item.querySelector("span.a-offscreen") &&
          item.querySelector("span.a-offscreen").textContent
        ) {
          price = item.querySelector("span.a-offscreen").textContent;
        }
        const currencyDelimiterString = currencyDelimiter[hostname];
        const isSponsored = item.querySelector(".a-row.a-spacing-micro");
        const node = item.querySelector(".rush-component > .a-link-normal");
        const index = item.getAttribute("data-index");
        let asin = item.getAttribute("data-asin");
        if (!asin) {
          asin = node.getAttribute("href").match(/\/dp\/(.*)\//)[1];
        }

        // let reviewSpan = $(
        //   'div[data-csa-c-slot-id="alf-reviews"] span.a-size-base'
        // );
        let reviewSpan = item.querySelector(
          'div[data-csa-c-slot-id="alf-reviews"] span.a-size-base'
        );

        if (!reviewSpan) {
          reviewSpan = item.querySelector(
            'div[data-csa-c-slot-id="amzn-reviews"] span.a-size-base'
          );
        }

        if (!reviewSpan) {
          // a-size-base s-underline-text
          reviewSpan = item.querySelector("span.a-size-base.s-underline-text");
        }

        let numberOfReviews = 0;

        if (reviewSpan) {
          // Get the text content of the <span>
          numberOfReviews = reviewSpan.textContent.trim().replace(/,/g, "");
          // remove . from the number
          numberOfReviews = numberOfReviews.replaceAll(".", "");
        }

        // Fallback: Extract from aria-label if reviewSpan is not found
        if (numberOfReviews === 0) {
          const reviewLink = item.querySelector('a[aria-label*="ratings"]');
          if (reviewLink) {
            const ariaLabel = reviewLink.getAttribute("aria-label");
            // Extract number from aria-label like "4,906 ratings", "8.373 ratings", "1,234.5 ratings"
            const match = ariaLabel.match(/(\d+(?:[.,]\d+)*)\s*ratings?/i);
            if (match) {
              // Handle different decimal separators and thousands separators
              let numberStr = match[1];

              // For review counts, we need to determine if it's thousands separator or decimal
              // Numbers like "5.376" are typically thousands (5376 reviews)
              // Numbers like "8.5" could be decimal (8.5 reviews) but unlikely for review counts

              if (numberStr.includes(".") && !numberStr.includes(",")) {
                // Check if it looks like thousands separator (3+ digits after dot)
                const parts = numberStr.split(".");
                if (parts.length === 2 && parts[1].length >= 3) {
                  // Treat as thousands separator: "5.376" -> "5376"
                  numberStr = numberStr.replace(".", "");
                }
                // If less than 3 digits after dot, treat as decimal (though unlikely for reviews)
              } else if (numberStr.includes(",") && !numberStr.includes(".")) {
                // If only comma, treat as thousands separator: "4,906" -> "4906"
                numberStr = numberStr.replace(",", "");
              } else if (numberStr.includes(",") && numberStr.includes(".")) {
                // If both comma and dot, comma is thousands separator: "1,234.5" -> "1234.5"
                numberStr = numberStr.replace(/,/g, "");
              }

              numberOfReviews = numberStr;
            }
          }
        }

        // parse int or zero
        numberOfReviews = parseInt(numberOfReviews) || 0;

        const titleSelectors = ["h2 > a > span", "h2 > span", "h2"];
        let titleElement = null;
        let title = "";

        try {
          for (const selector of titleSelectors) {
            titleElement = item.querySelector(selector);
            if (titleElement && titleElement.textContent) {
              const titleText = titleElement.textContent;
              title = titleText;
              const titleWords = titleText
                .toLowerCase()
                .replace(/[^\w\s]|_/g, "") // Remove punctuation and underscores
                .trim()
                .split(/\s+/) // Split by whitespace
                .filter((word) => word.length > 2); // Filter out short words

              searchPageAllWords.push(...titleWords);
              break;
            }
          }
        } catch (error) {
          console.error(error);
        }

        links.push({
          asin: asin,
          link: "https://" + hostname + node.getAttribute("href"),
          index: index,
          isSponsored: isSponsored == null ? false : true,
          reviews: numberOfReviews,
          title: title,
          price:
            price == null
              ? 0
              : accounting.unformat(price, currencyDelimiterString),
        });
      } catch (error) {
        console.error(error);
      }
    });
    if (links.length == 0) {
      reject();
    }
    resolve(links);
  });
}

async function getToken() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(["token"], function (response) {
      resolve(response.token);
    });
  });
}

async function getDemandOpportunityScore(data) {
  let token = await getToken();
  const fingerprint = await ThumbmarkJS.getFingerprint();

  if (!token) {
    return;
  }
  const payload = {
    data,
    token,
    url: "https://go.selfpublishingtitans.com/api/v1/chrome/bsr-results",
    method: "POST",
    extraHeaders: {
      "X-Browser-Fingerprint": fingerprint,
    },
  };
  const response = await sendRequestUsingBackgroundScript(
    "apiRequest",
    payload
  );
  return response;
}

function closeModal(modal) {
  modal.remove();
}

// Function to open the modal
function openModal(divId, pText) {
  if (document.querySelector(`.${stylePrefix}-modal`)) {
    return;
  }
  const modal = document.createElement("div");
  modal.classList.add(`${stylePrefix}-modal`);

  const modalContent = document.createElement("div");
  modalContent.classList.add(`${stylePrefix}-modal-content`);

  const text = document.createElement("p");
  text.textContent = pText;
  text.style.color = "black";

  const closeButton = document.createElement("button");
  closeButton.textContent = "x";
  closeButton.addEventListener("click", () => closeModal(modal));
  closeButton.classList.add(`${stylePrefix}-close-icon`);
  modalContent.appendChild(text);
  modalContent.appendChild(closeButton);

  modal.appendChild(modalContent);
  document.body.addEventListener(
    "click",
    () => {
      closeModal(modal);
    },
    true
  );
  // position: fixed;
  //   top: 0;
  //   left: 0;
  // get the divId position
  const divIdPosition = document.getElementById(divId).getBoundingClientRect();
  modal.style.left = divIdPosition.left + "px";
  modal.style.top = 150 + "px";
  modal.style.position = "fixed";
  modal.style.minWidth = "800px";
  modal.style.maxWidth = "900px";

  document.getElementById(divId).appendChild(modal);
}

function addPopUp(divId, text, styleText = "") {
  // content.js
  const helpIcon = document.createElement("span");
  helpIcon.innerHTML = "?";
  helpIcon.classList.add(`${stylePrefix}-bsr-help-icon`);
  helpIcon.style.cssText = styleText;
  helpIcon.setAttribute("id", "openModal");

  // add hover event
  helpIcon.addEventListener(
    "mouseover",
    function () {
      openModal(divId, text);
    },
    false
  );

  // remove hover event
  helpIcon.addEventListener(
    "mouseout",
    function () {
      closeModal(document.querySelector(`.${stylePrefix}-modal`));
    },
    false
  );

  // add help icon
  document.getElementById(divId).appendChild(helpIcon);
}

/**
 * Create and download excel file
 * @param {*} productDetails
 */
function createExcelFile(productDetails) {
  // Create csv data
  var data = [["ASIN / ISBN", "Authors", "Title"]];
  Object.keys(productDetails).map(function (key) {
    var arr = [];
    arr.push(productDetails[key].asin || productDetails[key].isbn10);
    arr.push(productDetails[key].authors);
    arr.push(productDetails[key].title.replace(/,/g, ""));
    data.push(arr);
  });
  csvData = data
    .map(function (v) {
      return v.join(",");
    })
    .join("\n");

  const createXLSLFormatObj = [];

  /* XLS Head Columns */
  const xlsHeader = ["ASIN / ISBN", "Authors", "Title"];

  /* XLS Rows Data */
  const xlsRows = Object.keys(productDetails).map(function (key) {
    return {
      "ASIN / ISBN": productDetails[key].asin || productDetails[key].isbn10,
      Authors: productDetails[key].authors,
      Title: productDetails[key].title.replace(/,/g, ""),
    };
  });

  createXLSLFormatObj.push(xlsHeader);
  $.each(xlsRows, function (index, value) {
    const innerRowData = [];
    $.each(value, function (ind, val) {
      innerRowData.push(val);
    });
    createXLSLFormatObj.push(innerRowData);
  });

  /* File Name */
  var filename = "amazon_analysis.xlsx";

  /* Sheet Name */
  var ws_name = "AmazonAnalysis";

  var wb = XLSX.utils.book_new(),
    ws = XLSX.utils.aoa_to_sheet(createXLSLFormatObj);

  /* Add worksheet to workbook */
  XLSX.utils.book_append_sheet(wb, ws, ws_name);

  /* Write workbook and Download */
  XLSX.writeFile(wb, filename);
}
function getDataByKey(key) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([key], function (response) {
      resolve(response[key]);
    });
  });
}

/**
 * Render analysis table
 * @param {*} resNumber
 * @param {*} avgBSR
 * @param {*} nicheScore
 * @param {*} avgReviews
 * @param {*} avgPrice
 */
function renderLoadingTable() {
  if (document.getElementById(uniqueId)) {
    document.getElementById(uniqueId).parentElement.remove();
  }

  const wrapper = document.createElement("div");
  wrapper.style.cssText = "height: 190px; background: #E0D6FF;";
  // document.body.style = "position:absolute";
  chrome.storage.local.get(["version"], function (item) {
    if (item.version === 2) {
      wrapper.innerHTML = tableOld;
    } else if (item.version === 3) {
      wrapper.innerHTML = table;
    }
    setTimeout(function () {
      // Add eventlistner
      const v3Btn = document.querySelector("#switchStyleV3");
      if (v3Btn) {
        v3Btn.addEventListener("click", function () {
          chrome.storage.local.set({ version: 3 });
          location.reload();
        });
      }

      // Add eventlistner
      const v2Btn = document.querySelector("#switchStyle");
      if (v2Btn) {
        v2Btn.addEventListener("click", function () {
          chrome.storage.local.set({ version: 2 });
          location.reload();
        });
      }
    }, 500);
  });

  const nav = document.getElementById("nav-main");
  if (nav) {
    nav.after(wrapper);
    nav.style.height = "auto";
  }
}

async function getSalesEstimate(domain, bsr, format) {
  if (!token) {
    token = await getToken();
  }
  if (!bsr) {
    return;
  }
  const data = {
    domain,
    bsr,
    format,
  };
  const payload = {
    data,
    token,
    url: "https://go.selfpublishingtitans.com/api/v1/chrome/estimated-sales",
    method: "POST",
  };
  const response = await sendRequestUsingBackgroundScript(
    "apiRequest",
    payload
  );
  return response;
}

/**
 * Create a graph button and handle click event by asin
 * on click button show the graph
 * @param {*} asin
 * @returns button
 */
function createAndHandleGraphButton(asin, isIcon = true) {
  if (!asin || !token) {
    const div = document.createElement("div");
    return div;
  }
  // create graph button
  let btn = document.createElement("button");

  btn.id = "search-page-graph-btn-" + asin + generateUUID();
  if (isIcon) {
    btn.innerHTML = graphSVG;
    btn.style.backgroundColor = "transparent";
    btn.style.border = "none";
    btn.style.cursor = "pointer";
    btn.style.padding = "0";
    btn.style.margin = "0";
    btn.style.outline = "none";
    btn.style.height = "20px";
  } else {
    btn.innerHTML = "BSR Graph";
    // classList.add(`${stylePrefix}-mui-white-btn`);
    btn.classList.add(`${stylePrefix}-mui-white-btn`);
    btn.classList.add(`${stylePrefix}-underline-text-hover`);
  }

  $(document).on("click", `#${btn.id}`, function () {
    showGraphPopup(asin, token);
  });
  return btn;
}

function showProductDetailsPopupCard(
  product,
  imageClass = ".s-image",
  byAsin = false
) {
  // add after the product image
  // get the product image position
  let popupCard = $(
    `#${stylePrefix}-product-details-popup-card-${product.index}`
  );

  if (byAsin) {
    popupCard = $(`#${stylePrefix}-product-details-popup-card-${product.asin}`);
  }

  let productImage = document.querySelector(
    `[data-index="${product.index}"] ${imageClass}`
  );

  if (!productImage) {
    productImage = document.querySelector(
      `[data-asin="${product.asin}"] ${imageClass}`
    );
  }

  const productImagePosition = productImage.getBoundingClientRect();
  const productImageHeight = productImagePosition.height;
  const productImageLeft = productImagePosition.left;
  const productImageTop = productImagePosition.top;

  if (popupCard.length == 0) {
    return;
  }

  // calculate left position based on available space
  let left = productImageLeft + "px";
  if (productImageLeft + 600 > window.innerWidth) {
    left = "auto";
  }

  // Set the position of the popup card
  popupCard.css({
    top: productImageTop + productImageHeight + "px",
    left: left,
    display: "block", // Show the popup card
  });
  // get Popup card height
  const popupCardHeight = popupCard.height();
  // update top position if popup card is going out of the window
  if (
    productImageTop + productImageHeight + popupCardHeight >
    window.innerHeight
  ) {
    popupCard.css({
      top: "auto",
      bottom: "10px",
    });
  }

  $(`[data-index="${product.index}"] .s-image`).on("mouseout", function (e) {
    // Check if the related target is outside the popup card and its children
    if (
      !$(e.relatedTarget).closest(
        `#${stylePrefix}-product-details-popup-card-${product.index}`
      ).length
    ) {
      $(`#${stylePrefix}-product-details-popup-card-${product.index}`).hide();
    } else {
      // Hide the popup card if the related target is inside the popup card
      $(`#${stylePrefix}-product-details-popup-card-${product.index}`).on(
        "mouseleave",
        function () {
          $(this).hide();
        }
      );
    }
  });
}

async function salesDataDiv(data) {
  const newInnerRestCardDataDiv = document.createElement("div");
  newInnerRestCardDataDiv.style.display = "inline-flex";
  newInnerRestCardDataDiv.id = `${stylePrefix}-restCardDataDiv-${
    data.index || data.asin || data.isbn10
  }`;
  newInnerRestCardDataDiv.classList.add(`${stylePrefix}-restCardDataDiv`);

  const newInnerSalesDiv = document.createElement("div");
  newInnerSalesDiv.classList.add(`${stylePrefix}-sales`);
  const UUID = generateUUID();
  newInnerSalesDiv.id = `1d-sales-${UUID}`;

  // show loading text
  newInnerSalesDiv.textContent = `Sales 1D: ...`;

  const newInnerRoyaltyDiv = document.createElement("div");
  newInnerRoyaltyDiv.classList.add(`${stylePrefix}-royalty`);
  newInnerRoyaltyDiv.id = `royalty-${UUID}`;

  const newInner30DSalesDiv = document.createElement("div");
  newInner30DSalesDiv.classList.add(`${stylePrefix}-sales`);
  newInner30DSalesDiv.id = `30d-sales-${UUID}`;

  // show loading text
  newInner30DSalesDiv.textContent = `Sales 30D: ...`;

  // show loading text
  newInnerRoyaltyDiv.textContent = `Royalty: ... - ...`;

  newInnerRestCardDataDiv.appendChild(newInnerRoyaltyDiv);

  if (data.hasMainBsr) {
    getSalesEstimate(hostname, data.bsr || 0, data.format)
      .then((response) => {
        const salesData =
          parseInt(response?.data?.data?.estimatedSales || 0) || 0;
        const newInnerSalesDiv = document.getElementById(`1d-sales-${UUID}`);
        const newInner30DSalesDiv = document.getElementById(
          `30d-sales-${UUID}`
        );
        if (response?.error && response.error === "user not paid") {
          newInnerSalesDiv.innerHTML = `<div class="price-popup"> Sales 1D: <span style="filter: blur(8px);" > 00 </span> </div>`;
          newInner30DSalesDiv.innerHTML = `<div class="price-popup"> Sales 30D: <span style="filter: blur(8px);" > 00 </span> </div>`;

          if (newInnerRoyaltyDiv?.textContent) {
            newInnerRoyaltyDiv.innerHTML = `<div class="price-popup">Royalty: <span style="filter: blur(8px);" > 00 </span> </div>`;
          }
        } else {
          newInnerSalesDiv.textContent = `Sales 1D: ${
            salesData === 0 ? "0" : getDailySalesFromMonthly(salesData) || 0
          }`;
          newInner30DSalesDiv.textContent = `Sales 30D: ${
            numberWithCommas(salesData) || 0
          }`;
        }
      })
      .catch((error) => {
        const newInnerSalesDiv = document.getElementById(`1d-sales-${UUID}`);
        const newInner30DSalesDiv = document.getElementById(
          `30d-sales-${UUID}`
        );
        console.error(error);
        newInnerSalesDiv.textContent = `Sales 1D: 0`;
        newInner30DSalesDiv.textContent = `Sales 30D: 0`;
      });

    // add estimated royalty
    getRoyalty(
      window.location.hostname,
      data.bsr || 0,
      data.size,
      data.price,
      data.page_count,
      data.isIndependentPublisher
    ).then((response) => {
      const newInnerRoyaltyDiv = document.getElementById(`royalty-${UUID}`);
      if (response) {
        if (response?.error && response.error === "user not paid") {
          if (newInnerRoyaltyDiv?.textContent) {
            newInnerRoyaltyDiv.innerHTML = `<div class="price-popup">Royalty: <span style="filter: blur(8px);" > 00 </span> </div>`;
          }
        } else {
          newInnerRoyaltyDiv.textContent = `Royalty: ${getRoyaltyRange(
            response,
            data.hasMainBsr
          )}`;
        }
      } else {
        if (newInnerRoyaltyDiv?.textContent) {
          newInnerRoyaltyDiv.innerHTML = `<div class="price-popup">Royalty: <span style="filter: blur(8px);" > 00 </span> </div>`;
        }
      }
    });
  } else {
    newInnerSalesDiv.textContent = `Sales 1D: --`;
    newInner30DSalesDiv.textContent = `Sales 30D: --`;
    if (newInnerRoyaltyDiv?.textContent) {
      newInnerRoyaltyDiv.textContent = `Royalty: -- - --`;
    }
  }
  newInnerRestCardDataDiv.appendChild(newInnerSalesDiv);
  newInnerRestCardDataDiv.appendChild(newInner30DSalesDiv);

  return newInnerRestCardDataDiv;
}

async function addActionDiv(data, newInnerRestCardDataDiv) {
  const searchKeyword = $("#twotabsearchtextbox").val().trim();
  // add retro view button
  const actionsDiv = document.createElement("div");
  actionsDiv.classList.add(`${stylePrefix}-action-div`);

  const retroViewButton = document.createElement("a");
  retroViewButton.classList.add(`${stylePrefix}-mui-white-btn`);
  retroViewButton.textContent = "Retro View";
  retroViewButton.href = `https://selfpublishingtitans.com/titans-retro-vision?asin=${
    data.asin || data.isbn10.replace(/,/g, "")
  }&domain=${hostname}&isSponsored=false&index=${
    data.index
  }&from=extension&keyword=${encodeURIComponent(searchKeyword) ?? ""}`;

  retroViewButton.target = "_blank";
  actionsDiv.appendChild(retroViewButton);

  // add graph button
  const graphBtn = createAndHandleGraphButton(data.asin, false);
  actionsDiv.insertAdjacentElement("beforeend", graphBtn);
  newInnerRestCardDataDiv.appendChild(actionsDiv);
}

async function getProductDetailsPopup(
  data,
  imageClass = ".s-image",
  byAsin = false
) {
  const productDetailsPopupCard = document.createElement("div");
  productDetailsPopupCard.id = `${stylePrefix}-product-details-popup-card-${data.index}`;
  if (byAsin) {
    productDetailsPopupCard.id = `${stylePrefix}-product-details-popup-card-${data.asin}`;
  }
  productDetailsPopupCard.style.display = "none";
  productDetailsPopupCard.style.maxWidth = "600px";
  productDetailsPopupCard.style.maxHeight = "600px";
  productDetailsPopupCard.style.overflow = "auto";
  productDetailsPopupCard.classList.add(
    `${stylePrefix}-product-details-popup-card`
  );

  productDetailsPopupCard.innerHTML = data.productDetailsDom.html();

  if (byAsin) {
    $(`[data-asin="${data.asin}"] ${imageClass}`).on("mouseover", function () {
      // hide all other popup cards
      $(`.${stylePrefix}-product-details-popup-card`).hide();
      showProductDetailsPopupCard(data, imageClass, true);
    });

    $(`[data-asin="${data.asin}"] ${imageClass}`).on("mouseout", function (e) {
      // Check if the related target is outside the popup card and its children
      if (
        !$(e.relatedTarget).closest(
          `#${stylePrefix}-product-details-popup-card-${data.asin}`
        ).length
      ) {
        $(`#${stylePrefix}-product-details-popup-card-${data.asin}`).hide();
      } else {
        // Hide the popup card if the related target is inside the popup card
        $(`#${stylePrefix}-product-details-popup-card-${data.asin}`).on(
          "mouseleave",
          function () {
            $(this).hide();
          }
        );
      }
    });
  } else {
    $(`[data-index="${data.index}"] ${imageClass}`).on(
      "mouseover",
      function () {
        // hide all other popup cards
        $(`.${stylePrefix}-product-details-popup-card`).hide();
        showProductDetailsPopupCard(data, imageClass);
      }
    );

    $(`[data-index="${data.index}"] ${imageClass}`).on(
      "mouseout",
      function (e) {
        // Check if the related target is outside the popup card and its children
        if (
          !$(e.relatedTarget).closest(
            `#${stylePrefix}-product-details-popup-card-${data.index}`
          ).length
        ) {
          $(`#${stylePrefix}-product-details-popup-card-${data.index}`).hide();
        } else {
          // Hide the popup card if the related target is inside the popup card
          $(`#${stylePrefix}-product-details-popup-card-${data.index}`).on(
            "mouseleave",
            function () {
              $(this).hide();
            }
          );
        }
      }
    );

    if (!document.querySelector(`[data-index="${data.index}"] ${imageClass}`)) {
      // if data-index is not available then use data-asin
      $(`[data-asin="${data.asin}"] ${imageClass}`).on(
        "mouseover",
        function () {
          // hide all other popup cards
          $(`.${stylePrefix}-product-details-popup-card`).hide();
          showProductDetailsPopupCard(data, imageClass);
        }
      );

      $(`[data-asin="${data.asin}"] ${imageClass}`).on(
        "mouseout",
        function (e) {
          // Check if the related target is outside the popup card and its children
          if (
            !$(e.relatedTarget).closest(
              `#${stylePrefix}-product-details-popup-card-${data.index}`
            ).length
          ) {
            $(
              `#${stylePrefix}-product-details-popup-card-${data.index}`
            ).hide();
          } else {
            // Hide the popup card if the related target is inside the popup card
            $(`#${stylePrefix}-product-details-popup-card-${data.index}`).on(
              "mouseleave",
              function () {
                $(this).hide();
              }
            );
          }
        }
      );
    }
  }

  return productDetailsPopupCard;
}

async function liteVersionProductCard(data, productCardWrapper, productCard) {
  const searchKeyword = $("#twotabsearchtextbox").val().trim();
  const details = document.createElement("div");

  const asinDivID = `${stylePrefix}-asin-div-${
    data.index || data.asin || data.isbn10
  }`;

  details.innerHTML = `<div  id="${asinDivID}" style="display: flex; gap: 4px; align-items: center; font-size: 16px">
        <div style="display: flex; gap: 8px; align-items: center; width: 100%">
          <img src="chrome-extension://${
            chrome.runtime.id
          }/assets/images/04.png" height="16px" />

          ${
            data.categoryUrl !== ""
              ? `<a class="${stylePrefix}-list-items-a" href="${
                  data.categoryUrl
                }" style="font-weight: 800; text-transform: capitalize; max-width: 42%; text-wrap: nowrap; margin-right: 0px;">${data.category.replace(
                  /-/g,
                  " "
                )}</a>`
              : `
          <div style="font-weight: 800; text-transform: capitalize; max-width: 42%; text-wrap: nowrap; margin-right: 0px;">${data.category.replace(
            /-/g,
            " "
          )}</div>

  `
          }
          
  <div style="margin-left: -8px; font-weight: 800;">: ${
    numberWithCommas(data.bsr || 0) || 0
  }</div>
    <a href="https://selfpublishingtitans.com/titans-asin-tracker?asin=${
      data.asin || data.isbn10.replace(/,/g, "")
    }&domain=${hostname}&isSponsored=false&index=${
    data.index
  }&from=extension&keyword=${encodeURIComponent(searchKeyword) ?? ""}" >
  <div class="${stylePrefix}-tooltip" style="display: flex;">
  <img src="chrome-extension://${
    chrome.runtime.id
  }/assets/svgs/track.svg" height="18px" />
  
  <span class="${stylePrefix}-tooltiptext">Track Product</span>
  </div>
   
  </a>
        </div>
      </div>
      `;

  const newInnerRestCardDataDiv = await salesDataDiv(data);

  newInnerRestCardDataDiv.style.marginTop = "8px";

  await addActionDiv(data, newInnerRestCardDataDiv);

  details.insertAdjacentHTML("beforeend", newInnerRestCardDataDiv.outerHTML);

  productCard.appendChild(details);

  productCardWrapper.appendChild(productCard);
}

async function fullVersionProductCard(data, productCardWrapper, productCard) {
  const searchKeyword = $("#twotabsearchtextbox").val().trim();
  const details = document.createElement("div");

  const asinDivID = `${stylePrefix}-asin-div-${
    data.index || data.asin || data.isbn10
  }`;

  details.innerHTML =
    `<div  id="${asinDivID}" style="display: flex; gap: 4px; align-items: center; font-size: 16px">` +
    `<img src="chrome-extension://${chrome.runtime.id}/assets/images/04.png" height="16px" />` +
    data.asin +
    `<a href="https://selfpublishingtitans.com/titans-asin-tracker?asin=${
      data.asin || data.isbn10.replace(/,/g, "")
    }&domain=${hostname}&isSponsored=false&index=${
      data.index
    }&from=extension&keyword=${encodeURIComponent(searchKeyword) ?? ""}" >
  <div class="${stylePrefix}-tooltip" style="display: flex;">
  <img src="chrome-extension://${
    chrome.runtime.id
  }/assets/svgs/track.svg" height="18px" />
  
  <span class="${stylePrefix}-tooltiptext">Track Product</span>
  </div>
   </a>` +
    "</div >" +
    "<div style='margin-top: 8px'>" +
    data.bsrHTML +
    "</div>" +
    `
        ${
          data.seller !== "" &&
          data.seller !== undefined &&
          data.seller !== null
            ? `<div>
        <strong>Publisher: </strong>
         ${data.seller}
        </div>`
            : ""
        }
        `;

  // productCard.appendChild(details);
  productCard.insertAdjacentHTML("beforeend", details.outerHTML);

  // add sales data div
  const newInnerRestCardDataDiv = await salesDataDiv(data);

  await addActionDiv(data, newInnerRestCardDataDiv);

  productCard.insertAdjacentHTML(
    "beforeend",
    newInnerRestCardDataDiv.outerHTML
  );

  productCardWrapper.style.marginBottom = "8px";
  productCardWrapper.appendChild(productCard);
}

/**
 * Render analysis table
 */
async function renderAnalysisTable() {
  // Check is on search page
  const urlParams = new URLSearchParams(window.location.search);
  const haskeyword = urlParams.get("k");

  if (haskeyword == null) {
    return;
  }

  const hasPage = urlParams.get("page");
  // if has page then do not render table

  const isQuickViewFull = await getDataByKey(uniqueId + "_quickViewFull");
  const isProductBoxFullOrLite = await getDataByKey(
    uniqueId + "_productBoxFullOrLite"
  );

  token = await getToken();

  // _productDetailsPopup
  const isProductDetailsPopup = await getDataByKey(
    uniqueId + "_productDetailsPopup"
  );

  if (!(isQuickViewFull === false || isQuickViewFull === "false") && !hasPage) {
    renderLoadingTable();
  }

  chrome.storage.local.get([isSponsoredStoreKey], function (response) {
    if (
      response[isSponsoredStoreKey] === "true" ||
      response[isSponsoredStoreKey] === true
    ) {
      isSponsoredEnabled = true;
    }
  });

  async function fetchProductHTML(url) {
    const response = await fetch(url);
    if (!response.ok) return "";
    return await response.text();
  }

  function getProductDetailsLoadingPopup(data) {
    const productDetailsPopupCard = document.createElement("div");
    productDetailsPopupCard.id = `${stylePrefix}-product-details-popup-card-${data.index}`;
    // set data attribute loading
    productDetailsPopupCard.setAttribute("data-loading", "true");
    productDetailsPopupCard.style.display = "block";
    productDetailsPopupCard.style.width = "400px";
    productDetailsPopupCard.style.height = "350px";
    productDetailsPopupCard.style.overflow = "hidden";
    productDetailsPopupCard.classList.add(
      `${stylePrefix}-product-details-popup-card`
    );

    const loadingSpinnerContainer = document.createElement("div");
    loadingSpinnerContainer.id = `${stylePrefix}-loading-spinner-container`;
    loadingSpinnerContainer.style.display = "flex";
    loadingSpinnerContainer.style.justifyContent = "center";
    loadingSpinnerContainer.style.alignItems = "center";
    loadingSpinnerContainer.style.height = "100%";
    loadingSpinnerContainer.style.width = "100%";
    const loadingSpinner = document.createElement("div");
    loadingSpinner.id = `${stylePrefix}-loading-spinner`;
    // center the loading spinner

    loadingSpinner.className = `${stylePrefix}-loader`;

    // add logo to the loading spinner
    const logo = document.createElement("img");
    logo.src = chrome.runtime.getURL("assets/images/04.png");
    loadingSpinner.appendChild(logo);

    // add loading spinner to the container
    loadingSpinnerContainer.appendChild(loadingSpinner);

    // add loading spinner container to the popup card
    productDetailsPopupCard.appendChild(loadingSpinnerContainer);

    $(`[data-index="${data.index}"] .s-image`).on("mouseout", function (e) {
      // Check if the related target is outside the popup card and its children
      if (
        !$(e.relatedTarget).closest(
          `#${stylePrefix}-product-details-popup-card-${data.index}`
        ).length
      ) {
        $(`#${stylePrefix}-product-details-popup-card-${data.index}`).hide();
      } else {
        // Hide the popup card if the related target is inside the popup card
        $(`#${stylePrefix}-product-details-popup-card-${data.index}`).on(
          "mouseleave",
          function () {
            $(this).hide();
          }
        );
      }
    });

    return productDetailsPopupCard;
  }

  async function setProductData(productData, productObj) {
    let data = await productData;

    // add product details
    data.index = productObj.index;
    data.asin = productObj.asin || data.isbn10;
    data.link = productObj.link;
    data.isSponsored = productObj.isSponsored;
    if (data.price !== undefined && data.price !== "" && data.price !== null) {
      data.price = productObj.price;
    }

    let product = document.querySelector('[data-index="' + data.index + '"]');

    if (!product) {
      product = document.querySelector('[data-asin="' + data.asin + '"]');
    }

    if (product) {
      const productCardWrapper = document.createElement("div");
      productCardWrapper.id = `productCardWrapper-${
        data.index || data.asin || data.isbn10
      }`;
      const productCard = document.createElement("div");
      productCard.id = `productCard-${data.index || data.asin || data.isbn10}`;
      productCard.classList.add(`${stylePrefix}-productCard`);

      if (
        !(isProductDetailsPopup === false || isProductDetailsPopup === "false")
      ) {
        const productDetailsPopupCard = await getProductDetailsPopup(data);
        productCard.appendChild(productDetailsPopupCard);
      }
      if (
        isProductBoxFullOrLite === false ||
        isProductBoxFullOrLite === "false"
      ) {
        await liteVersionProductCard(data, productCardWrapper, productCard);
      } else {
        await fullVersionProductCard(data, productCardWrapper, productCard);
      }

      const sCardContainer = product.querySelector(".s-card-container");

      if (sCardContainer) {
        const aSectionElement = product.querySelector(".a-section");

        if (aSectionElement) {
          sCardContainer.insertBefore(productCardWrapper, aSectionElement);
        } else {
          sCardContainer.appendChild(productCardWrapper); // Appends to the end if no element with class 'a-section' is found
        }
      } else {
        product.insertAdjacentElement("beforebegin", productCardWrapper);
      }
    }
  }

  function getProductDetails(products) {
    const promises = [];

    products.forEach((product, idx) => {
      // Check if product is sponsored defined or not

      if (!product.isSponsored || isSponsoredEnabled) {
        const promise = new Promise((resolve, reject) => {
          try {
            const link = product.link;
            fetchProductHTML(link)
              .then(async (html) => {
                if (html !== "") {
                  const productDetails = await parseProductHTML(html);
                  setProductData(productDetails, product);
                  productDetails.reviews = product.reviews;

                  return productDetails;
                }
              })
              .then(resolve)
              .catch(reject);
          } catch (error) {
            console.error(error);
            resolve(); // Resolve the promise to continue the loop
          }
        });

        promises.push(promise);
      } else {
        // Create sponsored product box
        // add product details
        let productElement = document.querySelector(
          '[data-index="' + product.index + '"]'
        );
        if (!productElement) {
          productElement = document.querySelector(
            '[data-asin="' + product.asin + '"]'
          );
        }

        if (productElement) {
          const productCard = document.createElement("div");
          productCard.id = `productCard-${
            product.index || product.asin || product.isbn10
          }`;
          productCard.classList.add(`${stylePrefix}-productCard`);

          const details = document.createElement("div");
          details.innerHTML =
            "<div>This is a Sponsored Product. If you want to fetch all data then turn on the sponsored button from the popup menu.</div>";

          productCard.appendChild(details);

          if (
            !(
              isProductDetailsPopup == "false" || isProductDetailsPopup == false
            )
          ) {
            // on hover over fetch the product details and show the popup card
            $(
              `[data-index="${
                product.index || product.asin || product.isbn10
              }"] .s-image`
            ).on("mouseover", function () {
              // if data-loading is true and popup is hidden then show the loading popup card
              if (
                $(
                  `#${stylePrefix}-product-details-popup-card-${
                    product.index || product.asin || product.isbn10
                  }`
                ).attr("data-loading") == "true" &&
                $(
                  `#${stylePrefix}-product-details-popup-card-${
                    product.index || product.asin || product.isbn10
                  }`
                ).css("display") == "none"
              ) {
                $(
                  `#${stylePrefix}-product-details-popup-card-${
                    product.index || product.asin || product.isbn10
                  }`
                ).show();

                return;
              }
              // check if product details popup card is exists or not
              if (
                $(
                  `#${stylePrefix}-product-details-popup-card-${
                    product.index || product.asin || product.isbn10
                  }`
                ).length == 0
              ) {
                $(
                  `[data-index="${
                    product.index || product.asin || product.isbn10
                  }"] .s-image`
                ).on("mouseout", function (e) {
                  // Check if the related target is outside the popup card and its children
                  if (
                    !$(e.relatedTarget).closest(
                      `#${stylePrefix}-product-details-popup-card-${
                        product.index || product.asin || product.isbn10
                      }`
                    ).length
                  ) {
                    $(
                      `#${stylePrefix}-product-details-popup-card-${
                        product.index || product.asin || product.isbn10
                      }`
                    ).hide();
                  } else {
                    // Hide the popup card if the related target is inside the popup card
                    $(
                      `#${stylePrefix}-product-details-popup-card-${
                        product.index || product.asin || product.isbn10
                      }`
                    ).on("mouseleave", function () {
                      $(this).hide();
                    });
                  }
                });
                const getProductDetailsLoadingPopupCard =
                  getProductDetailsLoadingPopup(product);
                productCard.appendChild(getProductDetailsLoadingPopupCard);
                showProductDetailsPopupCard(product);

                fetchProductHTML(product.link)
                  .then(async (html) => {
                    if (html !== "") {
                      const productDetails = await parseProductHTML(html);
                      productDetails.index = product.index;
                      productDetails.asin = product.asin;
                      productDetails.link = product.link;
                      const productDetailsPopupCard =
                        await getProductDetailsPopup(productDetails);

                      // remove loading popup card
                      $(
                        `#${stylePrefix}-product-details-popup-card-${
                          product.index || product.asin || product.isbn10
                        }`
                      ).remove();
                      productCard.appendChild(productDetailsPopupCard);
                      return productDetails;
                    }
                  })
                  .then((productDetails) => {
                    showProductDetailsPopupCard(product);
                    // hide after 3 seconds if not hovered over the product
                    setTimeout(() => {
                      // check if the cursor is over the product image
                      if (
                        !document
                          .querySelector(
                            `[data-index="${
                              product.index || product.asin || product.isbn10
                            }"] .s-image`
                          )
                          .matches(":hover")
                      ) {
                        $(
                          `#${stylePrefix}-product-details-popup-card-${
                            product.index || product.asin || product.isbn10
                          }`
                        ).hide();
                      }
                    }, 3000);
                  });
              }
            });
          }
          // productElement.prepend(productCard);
          const sCardContainer =
            productElement.querySelector(".s-card-container");

          if (sCardContainer) {
            const aSectionElement = productElement.querySelector(".a-section");

            if (aSectionElement) {
              sCardContainer.insertBefore(productCard, aSectionElement);
            } else {
              sCardContainer.appendChild(productCard); // Appends to the end if no element with class 'a-section' is found
            }
          } else {
            productElement.insertAdjacentElement("beforebegin", productCard);
          }
          // productElement.prepend(details);
        } else {
          console.error("Product element not found", product.index);
        }
      }
    });

    return Promise.allSettled(promises);
  }
  setTimeout(async function () {
    try {
      const products = await getProductUrls();

      if (isQuickViewFull === false || isQuickViewFull === "false") {
        // get search keyword from the search bar
        const searchKeyword = document.getElementById(
          "twotabsearchtextbox"
        ).value;
        // get all organic products
        const organicProducts = products.filter(
          (pro) => pro.isSponsored == false
        );

        const productCount = organicProducts.length;
        // add exact match
        const exactMatchCount = getExactMatchCount(
          organicProducts,
          searchKeyword
        );
        const exactMatchSpan = document.createElement("span");
        exactMatchSpan.style.margin = "10px";
        exactMatchSpan.innerHTML = `
                    <span>Exact Match: ${exactMatchCount} / ${productCount}</span>
                `;
        const aSection = document.querySelector(
          ".a-section.a-spacing-small.a-spacing-top-small"
        );
        if (aSection) {
          aSection.append(exactMatchSpan);
        }
      }
      if (products.length <= 0) {
        return;
      }

      const withOutSponsored = products.filter(
        (pro) => pro.isSponsored == false
      );

      // all reviews
      const allReviews = withOutSponsored.map((pro) => pro.reviews);

      // [uniqueId + "_deepViewSummary"];
      chrome.storage.local.get(
        [uniqueId + "_deepViewSummary"],
        async function (response) {
          if (
            response[uniqueId + "_deepViewSummary"] === false ||
            response[uniqueId + "_deepViewSummary"] == "false"
          ) {
            return;
          }
          // render table
          showHeader(allReviews);
        }
      );

      let productDetails = await getProductDetails(products);

      productDetails = productDetails
        .filter((pro) => pro.status === "fulfilled" && pro.value)
        .map((pro) => pro.value);
      // Get number of results
      var resNumber = 0;
      try {
        document.querySelectorAll("script").forEach((item) => {
          if (item.innerText.indexOf("totalResultCount") >= 0) {
            const scriptText = item.innerText.trim();
            let jsonText = scriptText.substr(scriptText.indexOf("{"));
            jsonText = jsonText.replace(");", "").replace(/\\/g, "").trim();
            resNumber = JSON.parse(jsonText).totalResultCount;
          }
        });
      } catch (error) {
        console.error(error);
      }

      // get demand opportunity here
      let language = "en_US";
      try {
        const splittedLanguage = document.documentElement.lang.split("-");
        language =
          splittedLanguage[0] + "_" + splittedLanguage[1].toUpperCase();
      } catch (error) {
        console.error(error);
      }
      let demandOpportunityData;
      const productCount = Object.keys(productDetails).filter(function (item) {
        return productDetails[item].isSponsored == false;
      }).length;

      const productCountForBSRavg = Object.keys(productDetails).filter(
        function (item) {
          return (
            productDetails[item].isSponsored == false &&
            productDetails[item].bsr !== 0
          );
        }
      ).length;

      const sum = Object.keys(productDetails)
        .map(function (key) {
          return productDetails[key].bsr;
        })
        .reduce((a, b) => a + b, 0);
      let avgBSR = 0;
      if (sum > 0) {
        avgBSR = (sum / productCountForBSRavg).toFixed(0);
      }
      const avgReviews = (
        Object.keys(productDetails)
          .map(function (key) {
            return productDetails[key].ratings;
          })
          .reduce((a, b) => a + b, 0) / productCount
      ).toFixed(0);
      const avgPrice = (
        Object.keys(productDetails)
          .map(function (key) {
            return productDetails[key].price;
          })
          .reduce((a, b) => a + b, 0) / productCount
      ).toFixed(2);
      try {
        const mid = MID_BY_HOST[hostname.replace("www.", "")] || "";
        let keyword = $("#twotabsearchtextbox").val().trim();

        let data = {
          search_text: keyword,
          search_result: resNumber,
          mid: mid,
          hostname: hostname,
          language: language,
          cookies: document.cookie,
          avg_bsr: parseFloat(avgBSR),
          avg_reviews: parseFloat(avgReviews),
          avg_price: parseFloat(avgPrice),
        };

        const response = await getDemandOpportunityScore(data);

        if (response.status == 200) {
          //const jsonData = await response.json();
          demandOpportunityData = response.data;
          // set search volume
          if (
            demandOpportunityData.data &&
            demandOpportunityData.data.searchVolume
          ) {
            if (demandOpportunityData.data.searchVolume >= 0) {
              $("#search-volume").text(
                numberWithCommas(demandOpportunityData.data.searchVolume)
              );
            } else {
              $("#search-volume").html(
                `<div class="price-popup" style="filter: blur(6px); cursor: pointer;">0</div>`
              );
            }
          } else {
            $("#search-volume").text("0");
          }
        } else if (response.status == 401) {
          chrome.runtime.sendMessage(
            { message: "logout", payload: {} },
            function (response) {
              chrome.storage.local.set({ userStatus: false });
              showLoginModal();
            }
          );
        }
      } catch (error) {
        // check if token is invalid or not
        console.error(error);
      }
      const organicProducts = productDetails.filter(
        (pro) => pro.isSponsored == false
      );
      // get all query params
      const urlParams = new URLSearchParams(window.location.search);

      // render table
      if (
        !(isQuickViewFull === false || isQuickViewFull === "false") &&
        !hasPage
      ) {
        await renderTable(
          organicProducts,
          demandOpportunityData,
          resNumber,
          productCount,
          productCountForBSRavg,
          sum,
          avgBSR
        );
      }

      if (productDetails.length == 0) {
        // remove loading
        // location.reload();
      }
    } catch (error) {
      console.error(error);
      // Continue with the code execution even if an error occurs
    }
  }, 500);
}

chrome.storage.local.get(
  [uniqueId + "_isEnable", "userStatus", "userInfo", "token"],
  async function (data) {
    if (
      data[uniqueId + "_isEnable"] !== undefined &&
      (data[uniqueId + "_isEnable"] == "false" ||
        data[uniqueId + "_isEnable"] == false)
    ) {
      return;
    }
    // Check domain hostname
    if (!Object.keys(validDomains).includes(hostname)) {
      return;
    }
    if (isSptAllInOneUnifiedActive()) {
      return;
    }
    // Handle floating menu
    handleFloatingMenu();

    // Check if user is logged in
    if (!data.userStatus) {
      chrome.runtime.sendMessage(
        { message: "login", payload: {} },
        function (response) {
          if (response == "success") {
            renderAnalysisTable();
          }

          if (response == "fail") {
            console.error("login failed");
          }
        }
      );
      return;
    } else {
      // if user is logged in then render the analysis table
      await renderAnalysisTable();
    }
  }
);

// event based on ajax request
if (Object.keys(validDomains).includes(hostname)) {
  var oldLocation = location.href;
  setInterval(function () {
    // if url contains query params k= then render the table
    const urlParams = new URLSearchParams(window.location.search);
    const haskeyword = urlParams.get("k");
    if (location.href !== oldLocation && haskeyword) {
      // do your action
      oldLocation = location.href;

      const el = document.getElementById(uniqueId);

      if (el && el.parentElement) {
        el.parentElement.remove();
      }

      location.reload();

      // Render main table
      // renderAnalysisTable();
    }
  }, 500);
}

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  chrome.storage.local.set(
    {
      [uniqueId + "_isEnable"]: msg.isEnable,
    },
    function () {
      if (chrome.runtime.lastError) {
        console.error("Error Storing 2: ", chrome.runtime.lastError.message);
      }

      // location.reload();
    }
  );
});
