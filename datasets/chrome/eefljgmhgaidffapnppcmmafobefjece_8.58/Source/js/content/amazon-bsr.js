let isQuickViewFull = null;
let isProductBoxFullOrLite = null;
let isProductDetailsPopup;

function sendRequestUsingBackgroundScript(message, payload) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ message, payload }, function (response) {
      resolve(response);
    });
  });
}

function cleanPrice(price) {
  if (typeof price === "string") {
    return parseFloat(price.replace(/[^0-9.]/g, ""));
  }
  return price;
}

function getBSRPageCalculatedData(data) {
  const dataItems = data.map((item) => item.value[0].value);

  const bsrList = dataItems.map((item) => item.bsr);
  const ratingsList = dataItems.map((item) => item.ratings);
  const priceList = dataItems.map((item) => cleanPrice(item.price));

  const avg = (arr) => arr.reduce((acc, val) => acc + val, 0) / arr.length;

  const finalData = {
    avgBSR: avg(bsrList),
    lowBSR: Math.min(...bsrList),
    highBSR: Math.max(...bsrList),

    avgReviews: avg(ratingsList),
    lowReviews: Math.min(...ratingsList),
    highReviews: Math.max(...ratingsList),

    avgPrice: avg(priceList),
    lowPrice: Math.min(...priceList),
    highPrice: Math.max(...priceList),

    format: dataItems[0]?.format || "",
  };

  return finalData;
}

function lowAvgHighContent(low, avg, high, symbol) {
  const format = (val) =>
    val !== undefined && val !== null && val !== "" && !isNaN(val)
      ? `${symbol}${parseInt(val).toLocaleString()}`
      : "--";

  return `
    <div style="
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      border-radius: 14px;
      padding: 0px 20px;
      font-family: 'Inter', Arial, sans-serif;
      font-size: 16px;
      
      gap: 8px;
      width: fit-content;
      min-width: 200px;
    ">
      ${[
        ["Low", low],
        ["Average", avg],
        ["High", high],
      ]
        .map(
          ([label, value]) => `
          <div style="display: flex; justify-content: space-between; width: 100%;">
            <div style="font-weight: 600;">${label}:</div>
            <div style="font-weight: 700;">${format(value)}</div>
          </div>
        `
        )
        .join("")}
    </div>
  `;
}

function showLoadingSummary() {
  if (isSptAllInOneUnifiedActive()) {
    return null;
  }
  // Remove existing summary if present
  const existingSummary = document.getElementById("page-summary");
  if (existingSummary) {
    existingSummary.remove();
  }

  const pageSummary = document.createElement("div");
  pageSummary.id = "page-summary";
  pageSummary.style.display = "block";
  pageSummary.style.position = "relative";
  pageSummary.style.marginBottom = "24px";
  pageSummary.style.marginTop = "16px";
  // margin left and right 16px
  pageSummary.style.marginLeft = "16px";
  pageSummary.style.marginRight = "16px";
  pageSummary.classList.add(stylePrefix + "-product-summary");

  // Add loading state
  pageSummary.innerHTML = `
  <div
     id="product-info"
      style="position: relative;
      background: radial-gradient(circle, #F2F4FC, #DAD9FF);
      "
    >
    <div style="
        font-size: 16px;
        line-height: 18px;
        color: rgb(72, 94, 117);
        margin-bottom: 12px;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        gap: 8px;
        justify-content: space-between;
    ">
    <div style="" class="${stylePrefix}-product-summary-rounded-btn">
    <img src="chrome-extension://${chrome.runtime.id}/assets/images/04.png" alt="icon" height="24px">
    <span style="font-size: 24px;" class="">Titans Quick View</span>
    </div>
    </div>
    <div id="main-container" style="
        background: rgb(255, 255, 255);
        border: 1px solid rgb(217, 224, 232);
        border-radius: 24px;
        padding: 16px;">

      <div style="display: flex; justify-content: center; align-items: center; height: 200px;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
          <div class="${stylePrefix}-loader" style="width: 40px; height: 40px;">
            <img src="chrome-extension://${chrome.runtime.id}/assets/images/04.png" alt="loading" style="width: 100%; height: 100%; animation: spin 1s linear infinite;">
          </div>
          <div style="font-family: 'Inter', Arial, sans-serif; font-size: 16px; color: #485E75;">
            Loading product analysis...
          </div>
        </div>
      </div>
    </div>
  `;

  const zgHeader = document.getElementById("zg-header");
  const aboveDPContainer = document.getElementById("above-dp-container");

  if (zgHeader) {
    zgHeader.appendChild(pageSummary);
  }

  // Add CSS for spinning animation
  if (!document.getElementById(`${stylePrefix}-loading-styles`)) {
    const style = document.createElement("style");
    style.id = `${stylePrefix}-loading-styles`;
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
  }

  return pageSummary;
}

function updateSummaryWithData(
  pageSummary,
  finalData,
  monthlySales,
  isDeepViewPaid = false
) {
  if (!pageSummary) {
    return;
  }
  pageSummary.innerHTML = `
  <div
     id="product-info"
      style="position: relative;
      background: radial-gradient(circle, #F2F4FC, #DAD9FF);
      "
    >
    <div style="
        font-size: 16px;
        line-height: 18px;
        color: rgb(72, 94, 117);
        margin-bottom: 12px;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        gap: 8px;
        justify-content: space-between;
    ">
    <div style="" class="${stylePrefix}-product-summary-rounded-btn">
    <img src="chrome-extension://${
      chrome.runtime.id
    }/assets/images/04.png" alt="icon" height="24px">
    <span style="font-size: 24px;" class="">Titans Quick View</span>
    <a id="deep-view-btn" class="${stylePrefix}-mui-purple-btn" hidden="${isDeepViewPaid}"  >Titans Quick View</a>
    </div>
    
    <a class="${stylePrefix}-product-summary-rounded-btn" style="${
    isDeepViewPaid ? "display: none;" : ""
  } href="https://www.selfpublishingtitans.com/titans-pro" target="_blank">Upgrade Plan</a>
    
    </div>
    <div id="main-container" style="
        background: rgb(255, 255, 255);
        border: 1px solid rgb(217, 224, 232);
        border-radius: 24px;
        padding: 16px;">

      <div style="display: flex; justify-content: space-around; gap: 16px;">


      <div class="${stylePrefix}-product-summary-card"  style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
        <div class="${stylePrefix}-product-summary-card-header">
          Best Sellers Rank
        </div>
         ${lowAvgHighContent(
           finalData.lowBSR,
           finalData.avgBSR,
           finalData.highBSR,
           "#"
         )}
      </div>
      <div
        class="${stylePrefix}-product-summary-card"
        style="display: flex; justify-content: center; align-items: center; flex-direction: column;"
      >
        <div class="${stylePrefix}-product-summary-card-header">
          Reviews
        </div>
        ${lowAvgHighContent(
          finalData.lowReviews,
          finalData.avgReviews,
          finalData.highReviews,
          ""
        )}
      </div>

      <div class="${stylePrefix}-product-summary-card">
        <div class="${stylePrefix}-product-summary-card-header">
        30 Day Sales
        </div>
        
        <div class="${
          isDeepViewPaid ? "" : "price-popup"
        } ${stylePrefix}-product-summary-card-content">
           <span style="${isDeepViewPaid ? "" : "filter: blur(8px);"}" > ${
    isDeepViewPaid ? getMonthlySalesRange(monthlySales, true) : "000"
  } </span>
        </div>
        
      </div>

    <div class="${stylePrefix}-product-summary-card" style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
      <div class="${stylePrefix}-product-summary-card-header">
        Price
      </div>
      ${lowAvgHighContent(
        finalData.lowPrice,
        finalData.avgPrice,
        finalData.highPrice,
        "$"
      )}
    </div>
  `;
}

function addSummaryToPage(finalData, monthlySales, isDeepViewPaid = false) {
  const pageSummary = document.getElementById("page-summary");
  if (pageSummary) {
    updateSummaryWithData(pageSummary, finalData, monthlySales, isDeepViewPaid);
  } else {
    const newPageSummary = showLoadingSummary();
    if (!newPageSummary) {
      return;
    }
    updateSummaryWithData(
      newPageSummary,
      finalData,
      monthlySales,
      isDeepViewPaid
    );
  }
}

async function getToken() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(["token"], function (response) {
      resolve(response.token);
    });
  });
}

async function fetchProductHTML(url) {
  const response = await fetch(url);
  if (!response.ok) return "";
  return await response.text();
}

async function setProductDataBsr(productData, productObj) {
  let data = await productData;

  data.index = productObj.index;
  data.asin = productObj.asin || productData.isbn10;
  data.link = productObj.link;
  data.isSponsored = productObj.isSponsored;
  if (
    productObj.price !== undefined &&
    productObj.price !== "" &&
    productObj.price !== null
  ) {
    data.price = productObj.price;
  }
  // add product details
  let product = document.querySelectorAll(
    '.s-main-slot.s-result-list [data-index="' + data.index + '"]'
  )[1];
  if (!product) {
    product = document.querySelector(
      '.s-main-slot.s-result-list [data-index="' + data.index + '"]'
    );
  }
  if (!product) {
    product = document.querySelector(
      '.s-main-slot.s-result-list [data-index="' +
        data.index +
        '"] .s-include-content-margin.s-border-bottom.s-latency-cf-section'
    );
  }

  if (!product) {
    product = document.querySelector('[data-asin="' + data.asin + '"]');
  }

  if (!product) {
    // bds-unified-book-faceout
    product = document.querySelector(
      "bds-unified-book-faceout[data-csa-c-item-id='" + data.asin + "']"
    );
  }

  if (product) {
    const productCardWrapper = document.createElement("div");
    productCardWrapper.id = `productCardWrapper-${
      data.index || data.asin || data.isbn10
    }`;

    const productCard = document.createElement("div");
    productCard.id = `productCard-${data.asin}`;
    productCard.classList.add(`${stylePrefix}-productCard`);

    if (
      !(isProductDetailsPopup === false || isProductDetailsPopup === "false")
    ) {
      const productDetailsPopupCard = await getProductDetailsPopup(
        data,
        ".a-dynamic-image",
        true
      );
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
    // check if product is already done or loading
    if (product.isDone || product.isLoading) {
      return;
    }

    // Set product loading
    product.isLoading = true;

    if (!product.isSponsored || isSponsoredEnabled) {
      const promise = new Promise((resolve, reject) => {
        try {
          const link = product.link;
          fetchProductHTML(link)
            .then((html) => {
              if (html !== "") {
                const productDetails = parseProductHTML(html);

                setProductDataBsr(productDetails, product);
                product.isDone = true;

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
        '[data-asin="' + product.asin + '"]'
      );
      if (!productElement) {
        productElement = document.querySelectorAll(
          '.s-main-slot.s-result-list [data-index="' + product.index + '"]'
        )[1];
      }
      if (!productElement) {
        productElement = document.querySelector(
          '.s-main-slot.s-result-list [data-index="' + product.index + '"]'
        );
      }
      if (!productElement) {
        productElement = document.querySelector(
          '.s-main-slot.s-result-list [data-index="' +
            product.index +
            '"] .s-include-content-margin.s-border-bottom.s-latency-cf-section'
        );
      }

      if (!productElement) {
        // bds-unified-book-faceout
        productElement = document.querySelector(
          "bds-unified-book-faceout[data-csa-c-item-id='" + product.asin + "']"
        );
      }

      if (productElement) {
        const details = document.createElement("div");
        details.style.border = "3px solid black";
        details.style.margin = "5px";
        details.style.padding = "5px";
        details.style.backgroundColor = "white";
        details.style.marginBottom = "8px";
        details.innerHTML =
          "<div>This is a Sponsored Product. If you want to fetch all data then turn on the sponsored button from the popup menu.</div>";
        productElement.prepend(details);
      } else {
        console.error("Product element not found", product.index);
      }
    }
  });

  return Promise.allSettled(promises);
}

function hasAsin(obj, asinToCheck) {
  if (!Array.isArray(obj)) return false;
  return obj.some((item) => item.asin === asinToCheck);
}

function getProductDataBSRPage() {
  const productsData = [];
  const promises = [];

  $("div[data-asin]").each(function () {
    const asin = $(this).attr("data-asin");

    const link = "https://" + hostname + $(this).find("a").attr("href");
    //a-size-base a-color-price
    const price = $(this).find("span.a-size-base.a-color-price").text();
    const isLoading = false;
    const isDone = false;
    const isSponsored = false;
    if (!hasAsin(productsData, asin)) {
      productsData.push({
        link,
        asin,
        price,
        isLoading,
        isDone,
        isSponsored,
      });
      promises.push(getProductDetails(productsData));
    }
  });

  return Promise.allSettled(promises);
}

function getProductsData() {
  // data-csa-c-item-id
  const products = document.querySelectorAll("[data-csa-c-item-id]");
  const productsData = [];
  const promises = [];
  products.forEach((product) => {
    // Check if the product is a shadow host
    let link = null;
    let price = null;

    if (product.shadowRoot) {
      // Query inside the shadow root
      const anchor = product.shadowRoot.querySelector("a[role='link']");
      if (anchor) {
        link = anchor.href;
      }

      const priceElement = product.shadowRoot.querySelector(".offscreen");
      if (priceElement) {
        price = priceElement.textContent.trim();
      }
    }
    const asin = product.getAttribute("data-csa-c-item-id");
    if (!link) {
      link = product.querySelector("a").href;
    }

    const isLoading = false;
    const isDone = false;
    const isSponsored = false;

    if (!hasAsin(productsData, asin)) {
      productsData.push({
        link,
        asin,
        price,
        isLoading,
        isDone,
        isSponsored,
      });
      promises.push(getProductDetails(productsData));
    }
  });

  return Promise.allSettled(promises);
}

function checkIfAmazonLeaderboardPage() {
  const url = window.location.href.toLowerCase();
  const zgBanner = document.getElementById("zg_banner");

  // Amazon leaderboard patterns
  const leaderboardPatterns = [
    "/gp/bestsellers",
    "/bestsellers",
    "/best-sellers-",
    "/zgbs",
    "/zg_bs_",
    "/zg-",
    "/zg_",
    "/gp/movers-and-shakers",
    "/movers-and-shakers",
    "/gp/most-wished-for",
    "/most-wished-for",
    "/gp/gift-ideas",
    "/gift-ideas",
  ];

  // Check if URL matches any leaderboard pattern
  const hasLeaderboardPattern = leaderboardPatterns.some((pattern) =>
    url.includes(pattern)
  );

  // Exclude product/search pages
  const isProductPage =
    url.includes("/dp/") ||
    url.includes("/gp/product/") ||
    url.includes("/gp/aw/d/") ||
    url.includes("/product/") ||
    url.includes("/aw/d/") ||
    url.includes("/gp/aw/") ||
    url.includes("/aw/") ||
    url.includes("/s?k=");

  return !!(zgBanner || hasLeaderboardPattern) && !isProductPage;
}

/**
 * Render analysis table
 */
async function renderAnalysisTable2() {
  // Check domain hostname
  if (!Object.keys(validDomains).includes(hostname)) {
    return;
  }
  if (isSptAllInOneUnifiedActive()) {
    return;
  }

  // const zg_banner = document.getElementById("zg_banner");
  // const gpUrl = window.location.href.includes("/gp/");
  // const bestsellersUrl = window.location.href.includes("/Best-Sellers-");

  // const breadcrumbs = [...document.querySelectorAll("a")].some((a) =>
  //   a.textContent.trim().toLowerCase().includes("best seller")
  // );

  if (!checkIfAmazonLeaderboardPage()) {
    return;
  }

  isQuickViewFull = await getDataByKey(uniqueId + "_quickViewFull");
  isProductBoxFullOrLite = await getDataByKey(
    uniqueId + "_productBoxFullOrLite"
  );

  token = await getToken();

  isProductDetailsPopup = await getDataByKey(uniqueId + "_productDetailsPopup");

  chrome.runtime.sendMessage({ message: "userStatus" }, function (response) {
    if (!response.userStatus) {
      // try to login
      chrome.runtime.sendMessage({ message: "login" }, function (response) {
        if (response == "fail") {
          // remove loading
          if (document.getElementById(uniqueId)) {
            document.getElementById(uniqueId).parentElement.remove();
          }
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
    // Render loading
    if (response.userStatus) {
      chrome.storage.local.get([isSponsoredStoreKey], function (response) {
        if (
          response[isSponsoredStoreKey] === "true" ||
          response[isSponsoredStoreKey] === true
        ) {
          isSponsoredEnabled = true;
        }
      });
      chrome.storage.local.get(uniqueId + "_isEnable", function (data) {
        if (
          data[uniqueId + "_isEnable"] !== undefined &&
          (data[uniqueId + "_isEnable"] == "false" ||
            data[uniqueId + "_isEnable"] == false)
        ) {
          return;
        }

        let productsData = [];

        // Show loading state immediately
        const loadingSummary = showLoadingSummary();
        if (!loadingSummary) {
          return;
        }

        $(document).ready(function () {
          getProductDataBSRPage().then(async (data) => {
            const finalData = getBSRPageCalculatedData(data);
            const estSales = await getSalesEstimate(
              window.location.hostname,
              parseInt(finalData.avgBSR) || 0,
              finalData.format
            );
            console.log({ estSales });
            let monthlySales = 0;
            if (estSales?.data) {
              try {
                monthlySales = numberWithCommas(
                  parseInt(estSales.data.data.estimatedSales)
                );
              } catch (error) {
                console.error(error);
              }
            }

            let isDeepViewPaid = true;

            if (estSales?.error && estSales.error === "user not paid") {
              isDeepViewPaid = false;
            }

            // Update the loading summary with actual data
            updateSummaryWithData(
              loadingSummary,
              finalData,
              monthlySales,
              isDeepViewPaid
            );
          });
        });

        // alternative page
        if (!productsData.length) {
          getProductsData().then((data) => {});
        }
        // show word frequency from titles
        // show avg price
        // show avg sales
        // show avg bsr

        // Create a MutationObserver instance with proper filtering and debouncing
        let observerTimeout;
        let isProcessing = false;
        let processedAsins = new Set(); // Track processed ASINs to avoid duplicates

        const processNewProducts = () => {
          if (isProcessing) return;
          if (processingCount >= MAX_PROCESSING_ATTEMPTS) {
            console.log(
              "Maximum processing attempts reached, stopping observer"
            );
            cleanup();
            return;
          }

          isProcessing = true;
          processingCount++;

          try {
            // Only skip if we have a summary AND no new products to process
            // We should always process new products, even if summary exists
            const currentProductCount = $("div[data-asin]").length;
            const processedCount = processedAsins.size;
            const hasNewProductsToProcess =
              currentProductCount > processedCount;

            if (
              document.getElementById("page-summary") &&
              !hasNewProductsToProcess
            ) {
              console.log(
                "Summary exists and no new products to process, skipping"
              );
              return;
            }

            let hasNewProducts = false;

            // Only process original Amazon product elements, not our injected ones
            const productSelectors = [
              "div[data-asin]",
              "[data-csa-c-item-id]",
              ".zg-item",
              ".zg-item-immersion",
              ".zg-banner-item",
            ];

            productSelectors.forEach((selector) => {
              $(selector).each(function () {
                const asin =
                  $(this).attr("data-asin") ||
                  $(this).attr("data-csa-c-item-id");
                if (!asin) return;

                // Check if already processed
                if (processedAsins.has(asin)) {
                  return;
                }

                // Check if already in productsData
                if (hasAsin(productsData, asin)) {
                  processedAsins.add(asin); // Mark as processed
                  return;
                }

                // Skip if this is our own injected product card
                if ($(this).closest(`[id^="productCardWrapper-"]`).length > 0) {
                  return;
                }

                console.log(`Processing new product: ${asin}`);
                processedAsins.add(asin);
                hasNewProducts = true;

                console.log(`Product ${asin} added to processing queue`);

                const link =
                  "https://" + hostname + $(this).find("a").attr("href");
                const price = $(this)
                  .find("span.a-size-base.a-color-price")
                  .text();
                const isLoading = false;
                const isDone = false;
                const isSponsored = false;

                productsData.push({
                  link,
                  asin,
                  price,
                  isLoading,
                  isDone,
                  isSponsored,
                });
                getProductDetails(productsData);
              });
            });

            // Create summary only if no summary exists and we have products
            if (
              !document.getElementById("page-summary") &&
              (hasNewProducts || productsData.length > 0)
            ) {
              const loadingSummary = showLoadingSummary();
              if (loadingSummary) {
                // Process the data and update summary
                getProductDataBSRPage()
                  .then(async (data) => {
                    try {
                      const finalData = getBSRPageCalculatedData(data);
                      const estSales = await getSalesEstimate(
                        window.location.hostname,
                        parseInt(finalData.avgBSR) || 0,
                        finalData.format
                      );
                      console.log({ estSales });
                      let monthlySales = 0;
                      if (estSales?.data) {
                        try {
                          monthlySales = numberWithCommas(
                            parseInt(estSales.data.data.estimatedSales)
                          );
                        } catch (error) {
                          console.error(error);
                        }
                      }

                      let isDeepViewPaid = true;
                      if (
                        estSales?.error &&
                        estSales.error === "user not paid"
                      ) {
                        isDeepViewPaid = false;
                      }

                      // Update the loading summary with actual data
                      updateSummaryWithData(
                        loadingSummary,
                        finalData,
                        monthlySales,
                        isDeepViewPaid
                      );
                    } catch (error) {
                      console.error("Error processing product data:", error);
                    }
                  })
                  .catch((error) => {
                    console.error("Error in getProductDataBSRPage:", error);
                  });
              }
            }
          } catch (error) {
            console.error("Error processing new products:", error);
          } finally {
            console.log(
              `Processing complete. Total products: ${productsData.length}, Processed ASINs: ${processedAsins.size}`
            );
            isProcessing = false;
          }
        };

        const observer = new MutationObserver((mutations) => {
          // Filter out irrelevant mutations
          const relevantMutations = mutations.filter((mutation) => {
            // Only process childList mutations
            if (
              mutation.type !== "childList" ||
              mutation.addedNodes.length === 0
            ) {
              return false;
            }

            // Check if any added node contains product data
            return Array.from(mutation.addedNodes).some((node) => {
              // Skip text nodes
              if (node.nodeType === Node.TEXT_NODE) {
                return false;
              }

              // Skip our own injected elements
              if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node;
                if (
                  element.id &&
                  element.id.startsWith("productCardWrapper-")
                ) {
                  return false;
                }
                if (element.id === "page-summary") {
                  return false;
                }
                if (
                  element.querySelector &&
                  element.querySelector('[id^="productCardWrapper-"]')
                ) {
                  return false;
                }
              }

              return true;
            });
          });

          if (relevantMutations.length === 0) {
            return;
          }

          // Clear existing timeout to debounce
          if (observerTimeout) {
            clearTimeout(observerTimeout);
          }

          // Debounce the processing
          observerTimeout = setTimeout(() => {
            processNewProducts();
          }, 500); // Increased debounce time
        });

        // Only observe the product list container, not the entire body
        const targetContainer =
          document.querySelector(".s-main-slot.s-result-list") ||
          document.querySelector("#zg-center") ||
          document.querySelector("#zg") ||
          document.querySelector("#zg_banner") ||
          document.querySelector(".zg-grid") ||
          document.querySelector(".zg-banner") ||
          document.querySelector(".zg") ||
          document.querySelector("main") ||
          document.body; // Fallback to body for scroll-based loading

        if (targetContainer) {
          console.log(
            "Starting MutationObserver on container:",
            targetContainer.tagName,
            targetContainer.id || targetContainer.className
          );
          observer.observe(targetContainer, {
            childList: true,
            subtree: true,
          });
        } else {
          console.warn("No target container found for MutationObserver");
        }

        // Set a maximum processing limit to prevent infinite loops
        let processingCount = 0;
        const MAX_PROCESSING_ATTEMPTS = 50; // Increased for more products

        // Cleanup function
        const cleanup = () => {
          if (observer) {
            observer.disconnect();
          }
          if (observerTimeout) {
            clearTimeout(observerTimeout);
          }
          if (scrollTimeout) {
            clearTimeout(scrollTimeout);
          }
          if (periodicCheck) {
            clearInterval(periodicCheck);
          }
          // Remove scroll listener
          window.removeEventListener("scroll", handleScroll);
        };

        // Clean up on page unload
        window.addEventListener("beforeunload", cleanup);
        window.addEventListener("unload", cleanup);

        // Add scroll event listener to detect new content loading
        let scrollTimeout;
        const handleScroll = () => {
          if (scrollTimeout) {
            clearTimeout(scrollTimeout);
          }

          scrollTimeout = setTimeout(() => {
            console.log("Scroll detected, checking for new products...");
            // Check if we're near the bottom of the page
            const scrollPosition = window.scrollY + window.innerHeight;
            const pageHeight = document.documentElement.scrollHeight;

            if (pageHeight - scrollPosition < 500) {
              // Within 500px of bottom
              console.log("Near bottom of page, processing new products...");
              processNewProducts();
            }
          }, 300);
        };

        // Listen for scroll events
        window.addEventListener("scroll", handleScroll, { passive: true });

        // Also check periodically for new content
        const periodicCheck = setInterval(() => {
          const currentProductCount = $("div[data-asin]").length;
          const processedCount = processedAsins.size;

          if (currentProductCount > processedCount) {
            console.log(
              `Periodic check: Found ${
                currentProductCount - processedCount
              } new products`
            );
            processNewProducts();
          }
        }, 2000); // Check every 2 seconds

        // Expose functions for debugging
        window.debugMutationObserver = {
          processNewProducts,
          cleanup,
          processedAsins: processedAsins,
          processingCount: () => processingCount,
          stopObserver: cleanup,
          forceProcess: () => {
            console.log("Manually forcing product processing...");
            processNewProducts();
          },
          getStats: () => {
            const currentProducts = $("div[data-asin]").length;
            const processedCount = processedAsins.size;
            return {
              currentProducts,
              processedCount,
              newProducts: currentProducts - processedCount,
              hasSummary: !!document.getElementById("page-summary"),
            };
          },
        };

        // Also expose a simple global function for manual triggering
        window.forceProcessProducts = () => {
          console.log("Manual trigger: Processing products...");
          processNewProducts();
        };

        // Add a function to check current state
        window.checkProductState = () => {
          const currentProducts = $("div[data-asin]").length;
          const processedCount = processedAsins.size;
          const hasSummary = !!document.getElementById("page-summary");

          console.log("=== Product State ===");
          console.log(`Current products on page: ${currentProducts}`);
          console.log(`Processed ASINs: ${processedCount}`);
          console.log(`Products in queue: ${productsData.length}`);
          console.log(`Summary exists: ${hasSummary}`);
          console.log(
            `New products to process: ${currentProducts - processedCount}`
          );

          if (currentProducts - processedCount > 0) {
            console.log(
              "New products found! Run window.forceProcessProducts() to process them."
            );
          }
        };
      });
    }
  });
}

chrome.storage.local.get(uniqueId + "_isEnable", async function (data) {
  if (
    data[uniqueId + "_isEnable"] !== undefined &&
    (data[uniqueId + "_isEnable"] == "false" ||
      data[uniqueId + "_isEnable"] == false)
  ) {
    return;
  }
  // Render main table
  await renderAnalysisTable2();
});

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  chrome.storage.local.set(
    {
      [uniqueId + "_isEnable"]: msg.isEnable,
    },
    function () {
      if (chrome.runtime.lastError) {
        console.error("Error Storing 2: ", chrome.runtime.lastError.message);
      }
    }
  );
});
