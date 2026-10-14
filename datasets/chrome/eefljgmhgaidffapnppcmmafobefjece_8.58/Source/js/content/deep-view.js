let privAPIData = null;
let allWords = [];
let totalProducts = 0;
let totalPrices = 0;
let totalReviews = 0;
let totalRatings = 0;
let totalRanks = 0;
let totalSales = 0;
let allDownloadableProducts = [];

function resetData() {
  privAPIData = null;
  allWords = [];
  totalProducts = 0;
  totalPrices = 0;
  totalReviews = 0;
  totalRatings = 0;
  totalRanks = 0;
  totalSales = 0;
  allDownloadableProducts = [];
}

async function retrieveProductDataFromApi({ token, searchKey, domain }) {
  const url =
    "https://go.selfpublishingtitans.com" +
    "/api/v1/amazon-sell-center/get-amazon-sell-center-data";

  const allProducts = [];
  allWords = [];

  // Define a function to fetch data for a given page
  const fetchDataForPage = async (page) => {
    const data = {
      page_offset: page,
      search_key: searchKey,
      domain: domain,
    };

    try {
      const payload = {
        data,
        token,
        url: url,
        method: "POST",
      };
      const res = await sendRequestUsingBackgroundScript("apiRequest", payload);
      const resJson = res.data;
      if (res.status !== 200) {
        const errorMessage = resJson.error;
        throw new Error(errorMessage);
      }

      if (
        resJson &&
        resJson.data.data &&
        resJson.data.data.products &&
        resJson.data.data.products.length > 0
      ) {
        return resJson.data.data.products;
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  // Use Promise.all to fetch data for multiple pages concurrently
  const totalPages = 4;
  const promises = Array.from({ length: totalPages }, (_, page) =>
    fetchDataForPage(page + 1)
  );

  const results = await Promise.allSettled(promises);

  for (const element of results) {
    const result = element;
    if (result.status === "fulfilled") {
      const products = result.value;

      allProducts.push(...products.flat());
    } else {
      if (result.reason.message === "Error: user not paid") {
        throw new Error("user not paid");
      }
    }
  }

  return allProducts;
}

function getBGSellCenterData({ searchKey, domain, page }) {
  // get data from the background script
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(
      {
        message: "getSellCenterData",
        payload: {
          searchKey,
          domain,
          page,
        },
      },
      (response) => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(response.error);
        }
      }
    );
  });
}

async function getDeepViewToken({ token, searchKey, domain }) {
  const url =
    "https://go.selfpublishingtitans.com" +
    `/api/v1/amazon-sell-center/token?keyword=${searchKey}&domain=${domain}`;

  const payload = {
    token,
    url: url,
    method: "GET",
  };
  const res = await sendRequestUsingBackgroundScript("apiRequest", payload);
  const resJson = res.data;
  if (res.status !== 200) {
    console.error("Error getting token", res.error);
    const errorMessage = res.error;
    throw new Error(errorMessage);
  }
  return resJson;
}

async function getSellCenterData({ searchKey, domain, WS }) {
  // get even pages data
  // max 8 pages
  for (let i = 2; i <= 8; i += 2) {
    const data = await getBGSellCenterData({ searchKey, domain, page: i });
    //     type WsResponse struct {
    // 	Success     bool   `json:"success"`
    // 	MessageType string `json:"messageType"`
    // 	Data        string `json:"data"`
    // 	Error       string `json:"error"`
    // }

    const wsResponse = {
      success: true,
      messageType: WSMessageTypes.WSDeepViewFrontSuccess,
      data: JSON.stringify(data),
      error: "",
    };

    WS.send(JSON.stringify(wsResponse));
  }
}

function hideModal() {
  const modal = document.getElementById(`${stylePrefix}-popup-modal`);
  modal.style.display = "none";
}

const modalHtml = `
    
  <div id="${stylePrefix}-popup-modal" class="${stylePrefix}-modal-2">
      <!-- Modal content -->
      <div class="${stylePrefix}-modal-content" style="width: 80%; margin: auto;">
        <div class="${stylePrefix}-deep-view-modal-nav-bar" id="${stylePrefix}-deep-view-modal-nav-bar">
        <div style="display: flex; align-items: center; gap: 8px;">
        <img src="${chrome.runtime.getURL(
          "assets/images/04.png"
        )}" height="28px">

        <h1 class="${stylePrefix}-icon-text">Titans Deep View</h1>
          
          </div>
          <!-- search bar -->
          <div class="${stylePrefix}-deep-view-modal-nav-bar-search">
            <input
              type="text"
              name="search"
              id="deep-view-search-bar"
              placeholder="Search..."
            />
            <button type="submit" class="${stylePrefix}-rounded-btn" id="${stylePrefix}-deep-view-search-button">
               <img src="${chrome.runtime.getURL("assets/svgs/search.svg")}" >
            </button>
          </div>

          <!-- Show Number of Trail left -->
          <div class="${stylePrefix}-deep-view-modal-nav-bar-trial" style="display: none;" id="${stylePrefix}-trial-div">
            <h1 class="${stylePrefix}-icon-text" id="${stylePrefix}-trial-text">Trial Left: 0</h1>
          </div>


          <div style="display: flex; gap: 8px;">
          <div role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="--value:0" id="${stylePrefix}-progress-indicator"></div>
            <!-- download icon -->
            <button class="${stylePrefix}-rounded-btn" id="${stylePrefix}-deep-view-download-btn">
               <img src="${chrome.runtime.getURL("assets/svgs/download.svg")}" >
            </button>
            <button class="${stylePrefix}-rounded-btn" style="font-size: larger" id="${stylePrefix}-deep-view-close-btn">
              <span class="${stylePrefix}-deep-view-modal-nav-bar-close">&times;</span>
            </button>
            
          </div>
        </div>

        <!-- content header area -->
        <div class="${stylePrefix}-deep-view-modal-content-header" id="${stylePrefix}-deep-view-modal-content-header"></div>
            

        <div id="${stylePrefix}-scrollable-list">
          <div class="${stylePrefix}-no-content" id="${stylePrefix}-no-content" style="display: none">
            <h1 id="${stylePrefix}-no-content-text">You've searched nothing yet!</h1>
          </div>
        </div>
      </div>
    </div>
  
  `;

function showLoading() {
  const loadingSpinnerContainer = document.createElement("div");
  loadingSpinnerContainer.id = `${stylePrefix}-loading-spinner-container`;
  loadingSpinnerContainer.style.display = "flex";
  loadingSpinnerContainer.style.flexDirection = "column";
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

  // get tabs container
  const containerHeader = document.getElementById(
    `${stylePrefix}-deep-view-modal-content-header`
  );

  // add right after the header element
  containerHeader.parentNode.insertBefore(
    loadingSpinnerContainer,
    containerHeader.nextSibling
  );
}

function hideLoading() {
  const loadingSpinnerContainer = document.getElementById(
    `${stylePrefix}-loading-spinner-container`
  );
  if (loadingSpinnerContainer) {
    loadingSpinnerContainer.remove();
  }
}

function sortTable(n, type) {
  // set sorting order from the table header
  const tableHeader = document.getElementById(`${stylePrefix}-table-header`);
  const tableHeaderColumns = tableHeader.getElementsByTagName("th");
  const tableHeaderColumn = tableHeaderColumns[n];
  const sortIcon = tableHeaderColumn.getElementsByTagName("i")[0];
  let sortOrder = sortIcon.className;
  if (sortOrder === "fa fa-sort") {
    sortIcon.className = "fa fa-sort-asc";
    sortOrder = "fa fa-sort-desc";
  } else if (sortOrder === "fa fa-sort-asc") {
    sortIcon.className = "fa fa-sort-desc";
  } else if (sortOrder === "fa fa-sort-desc") {
    sortIcon.className = "fa fa-sort-asc";
  }

  const table = document.getElementById(`${stylePrefix}-deep-view-table`);
  const rows = Array.from(table.rows).slice(1); // Convert to array, excluding header row

  // Cache DOM elements
  const getCellValue = (row, index) =>
    row.getElementsByTagName("TD")[index].innerText;
  const convertToNumber = (value) =>
    type === "number" ? Number(value.replace(/,/g, "")) : value.toLowerCase();

  // Create a copy of the rows array for sorting
  const sortedRows = rows.slice();

  // Stable sort based on the chosen column and type
  sortedRows.sort((a, b) => {
    const x = convertToNumber(getCellValue(a, n));
    const y = convertToNumber(getCellValue(b, n));

    if (sortOrder === "fa fa-sort-asc") {
      return x < y ? -1 : x > y ? 1 : 0;
    } else if (sortOrder === "fa fa-sort-desc") {
      return x > y ? -1 : x < y ? 1 : 0;
    }
  });

  // Clear existing rows in the table
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }

  // Append the sorted rows to the table
  for (const element of sortedRows) {
    table.appendChild(element);
  }
}

function removeExistingContent() {
  // remove existing content
  // remove the summary div
  const summaryDiv = document.getElementById(`${stylePrefix}-summary-div`);
  if (summaryDiv) {
    summaryDiv.remove();
  }
  const contentArea = document.getElementById(`${stylePrefix}-scrollable-list`);
  if (contentArea) {
    contentArea.innerHTML = "";
  }
}

const WSMessageTypes = {
  WSDeepViewSuccess: "deep-view-success",
  WSDeepViewError: "deep-view-error",
  WSDeepViewFrontSuccess: "deep-view-front-success",
  WSDeepViewFrontError: "deep-view-front-error",
};

function wsConnection(token) {
  const ws = new WebSocket(
    "wss://go.selfpublishingtitans.com/ws/deep-view?token=" + token
  );
  return ws;
}

function createDeepViewTable() {
  const table = document.createElement("table");
  table.className = `${stylePrefix}-table`;
  table.id = `${stylePrefix}-deep-view-table`;
  table.style.width = "100%";
  table.style.borderCollapse = "collapse";
  table.style.borderSpacing = "0";
  table.style.marginBottom = "8px";

  // create table header
  const tableHeader = document.createElement("thead");
  tableHeader.className = `${stylePrefix}-table-header`;
  tableHeader.id = `${stylePrefix}-table-header`;
  // use material design colors white color card and black text
  tableHeader.style.background = "white";
  tableHeader.style.color = "black";
  // add elevation to the div
  tableHeader.style.boxShadow = "0 4px 8px 0 rgba(0,0,0,0.2)";
  // sticky table header
  tableHeader.style.position = "sticky";
  tableHeader.style.top = "0";

  // create table header row
  const tableHeaderRow = document.createElement("tr");
  tableHeaderRow.className = `${stylePrefix}-table-header-row`;
  tableHeaderRow.id = `${stylePrefix}-table-header-row`;

  // create table header columns
  const tableHeaderColumns = [
    {
      name: "Image",
      width: "5%",
      index: 0,
      isSortAbled: false,
      type: "image",
    },
    {
      name: "Title",
      width: "35%",
      index: 1,
      isSortAbled: true,
      type: "string",
    },
    {
      name: "Category",
      width: "10%",
      index: 2,
      isSortAbled: true,
      type: "string",
    },
    {
      name: "Price",
      width: "10%",
      index: 3,
      isSortAbled: true,
      type: "number",
    },
    {
      name: "Review",
      width: "10%",
      index: 4,
      isSortAbled: true,
      type: "number",
    },
    {
      name: "Rating",
      width: "10%",
      index: 5,
      isSortAbled: true,
      type: "number",
    },
    {
      name: "Rank",
      width: "10%",
      index: 6,
      isSortAbled: true,
      type: "number",
    },
    {
      name: "Sales",
      width: "10%",
      index: 7,
      isSortAbled: true,
      type: "number",
    },
  ];

  // add sorting icon to the table header columns

  // create table header columns
  for (const column of tableHeaderColumns) {
    const tableHeaderColumn = document.createElement("th");
    tableHeaderColumn.className = `${stylePrefix}-table-header-column`;
    tableHeaderColumn.id = `${stylePrefix}-table-header-column`;
    tableHeaderColumn.innerText = column.name;
    tableHeaderColumn.style.width = column.width;
    tableHeaderColumn.style.padding = "8px";
    tableHeaderColumn.style.textAlign = "left";
    tableHeaderColumn.style.fontWeight = "500";
    tableHeaderColumn.style.fontSize = "14px";
    tableHeaderColumn.style.color = "black";
    tableHeaderColumn.style.cursor = "pointer";
    if (column.isSortAbled) {
      // add sorting icon
      const sortIcon = document.createElement("i");
      sortIcon.className = "fa fa-sort";
      sortIcon.style.marginLeft = "8px";

      tableHeaderColumn.appendChild(sortIcon);
      // add event listener to the table header column
      tableHeaderColumn.addEventListener("click", () => {
        sortTable(column.index, column.type);
      });
    }
    tableHeaderRow.appendChild(tableHeaderColumn);
  }

  // add table header row to the table header
  tableHeader.appendChild(tableHeaderRow);

  // add table header to the table
  table.appendChild(tableHeader);

  // create table body
  const tableBody = document.createElement("tbody");
  tableBody.className = `${stylePrefix}-table-body`;
  tableBody.id = `${stylePrefix}-table-body`;

  // Add pseudo-element to tbody using JavaScript
  const styleElement = document.createElement("style");
  styleElement.textContent = `
  #${stylePrefix}-table-body:before {
    content: "@";
    display: block;
    line-height: 10px;
    text-indent: -99999px;
  }
`;
  document.head.appendChild(styleElement);

  // add table body to the table
  table.appendChild(tableBody);

  // add table to the content area
  const contentArea = document.getElementById(`${stylePrefix}-scrollable-list`);
  if (contentArea) {
    contentArea.appendChild(table);
  }

  return tableBody;
}

function addTableBodyRow(data, tableBody, WS) {
  // hide the loading animation
  hideLoading();
  const products = data.data.products;
  // keep only title, price, review, rating, rank, sales, category, image
  let filteredProducts = products.map((product) => {
    const {
      title,
      price,
      customerReviewsCount,
      customerReviewsRatingValue,
      salesRank,
      estSales,
      salesRankContextName,
      imageUrl,
      link,
      asin,
    } = product;
    return {
      title,
      price,
      reviews: customerReviewsCount,
      ratings: customerReviewsRatingValue,
      rank: salesRank,
      sales: estSales,
      category: salesRankContextName,
      imageUrl,
      link,
      asin,
    };
  }
  );
  allDownloadableProducts.push(...filteredProducts);

  for (const product of products) {
    totalProducts++;
    if (product.salesRank === 0) {
      product.estSales = 0;
    }
    totalPrices += product.price ?? 0;
    totalReviews += product.customerReviewsCount ?? 0;
    totalRatings += product.customerReviewsRatingValue ?? 0;
    totalRanks += product.salesRank ?? 0;
    totalSales += product.estSales ?? 0;

    const titleWords = product.title
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
      .trim()
      .split(" ");
    // remove only spaces
    const words = titleWords.filter((word) => word !== "" && word !== " ");
    allWords.push(...words);

    const tableBodyRow = document.createElement("tr");
    tableBodyRow.className = `${stylePrefix}-table-body-row`;
    tableBodyRow.id = `${stylePrefix}-table-body-row`;
    tableBodyRow.style.fontSize = "14px";
    tableBodyRow.style.fontWeight = "400";
    tableBodyRow.lineHeight = "1.5em";

    // create table body columns
    const tableBodyColumns = [
      {
        data: product.imageUrl,
        type: "image",
        name: "image",
      },
      {
        data: product.title,
        type: "string",
        name: "title",
      },

      {
        data: product.salesRankContextName,
        type: "string",
        name: "category",
      },
      {
        data: product.price,
        type: "number",
        name: "price",
      },

      {
        data: product.customerReviewsCount ?? 0,
        type: "number",
        name: "review",
      },
      {
        data: product.customerReviewsRatingValue ?? 0,
        type: "number",
        name: "rating",
      },
      {
        data: product.salesRank ?? 0,
        type: "number",
        name: "rank",
      },
      {
        data: product.estSales,
        type: "number",
        name: "sales",
      },

      // product.domain,
    ];

    // create table body columns
    for (const column of tableBodyColumns) {
      if (column.type === "image") {
        // create image column
        const tableBodyColumn = document.createElement("td");
        tableBodyColumn.className = `${stylePrefix}-table-body-column`;
        tableBodyColumn.id = `${stylePrefix}-table-body-column`;
        const image = document.createElement("img");
        image.src = column.data;
        image.style.width = "50px";
        image.style.height = "60px";
        tableBodyColumn.appendChild(image);
        tableBodyRow.appendChild(tableBodyColumn);
      } else if (column.name === "title") {
        const tableBodyColumn = document.createElement("td");
        tableBodyColumn.className = `${stylePrefix}-table-body-column`;
        tableBodyColumn.id = `${stylePrefix}-table-body-column`;
        // add ... to the text if it's too long
        const title =
          column.data.length > 100
            ? column.data.substring(0, 100) + "..."
            : column.data;
        const titleLink = document.createElement("a");
        titleLink.href =
          product.link ?? `https://www.amazon.com/dp/${product.asin}`;
        titleLink.target = "_blank";
        titleLink.innerText = title;
        tableBodyColumn.appendChild(titleLink);
        tableBodyColumn.style.maxWidth = "300px";
        tableBodyColumn.style.textOverflow = "ellipsis";
        tableBodyColumn.style.overflow = "hidden";
        tableBodyColumn.style.lineHeight = "1.5em";
        tableBodyColumn.title = column.data;
        tableBodyRow.appendChild(tableBodyColumn);
      } else if (column.type === "number") {
        const tableBodyColumn = document.createElement("td");
        tableBodyColumn.className = `${stylePrefix}-table-body-column`;
        tableBodyColumn.id = `${stylePrefix}-table-body-column`;
        tableBodyColumn.innerText = column.data.toLocaleString();
        tableBodyRow.appendChild(tableBodyColumn);
      } else {
        const tableBodyColumn = document.createElement("td");
        tableBodyColumn.className = `${stylePrefix}-table-body-column`;
        tableBodyColumn.id = `${stylePrefix}-table-body-column`;
        tableBodyColumn.innerText = column.data;

        // allow only 2 lines of text
        tableBodyColumn.style.maxHeight = "3em";
        tableBodyColumn.style.textOverflow = "ellipsis";
        tableBodyColumn.style.overflow = "hidden";
        tableBodyColumn.style.lineHeight = "1.5em";

        // add tooltip
        tableBodyColumn.title = column.data;

        tableBodyRow.appendChild(tableBodyColumn);
      }
    }

    // add table body row to the table body
    tableBody.appendChild(tableBodyRow);
  }

  // if result length is greater than 100 then close the connection
  if (allDownloadableProducts.length >= 100) {
    WS.close();
  }
}

function appendWordListDiv(allWords, contentHeader, wordListDivId) {
  // remove existing word list div
  const exWordListDiv = document.getElementById(wordListDivId);
  if (exWordListDiv) {
    exWordListDiv.remove();
  }
  // horizontal scrollable word list ex: coloring (100), book (90)
  // add after summary div
  const wordListDiv = document.createElement("div");
  wordListDiv.className = `${stylePrefix}-word-list-div`;
  wordListDiv.id = wordListDivId;
  wordListDiv.style.overflowX = "auto";
  wordListDiv.style.display = "flex";
  wordListDiv.style.flexDirection = "row";
  wordListDiv.style.gap = "8px";
  wordListDiv.style.padding = "8px";
  wordListDiv.style.marginBottom = "8px";

  // create word list object {word: coloring, count: 100}
  let wordList = [];
  allWords.forEach((word) => {
    const index = wordList.findIndex((item) => item.word === word);
    if (index !== -1) {
      wordList[index].count++;
    } else {
      wordList.push({ word, count: 1 });
    }
  });

  // sort word list
  const sortedWordList = wordList.toSorted((a, b) => b.count - a.count);

  // add two words in a div seperated by hr
  for (let i = 0; i < sortedWordList.length; i += 2) {
    const div = document.createElement("div");
    div.style.fontSize = "14px";
    div.style.fontWeight = "400";
    div.style.lineHeight = "1.5";
    div.style.background = "white";
    div.style.color = "black";
    div.style.boxShadow = "0 4px 8px 0 rgba(0,0,0,0.2)";
    div.style.padding = "8px";
    div.style.borderRadius = "8px";
    div.style.whiteSpace = "nowrap";

    const count1 = sortedWordList[i].count;
    const word1 = sortedWordList[i].word;
    // add word 1
    const word1Span = document.createElement("span");
    word1Span.innerText = `${word1}: ${count1}`;
    word1Span.style.whiteSpace = "nowrap";

    // add word 1 to the div
    div.appendChild(word1Span);

    // add hr
    const hr = document.createElement("hr");
    hr.style.width = "100%";
    hr.style.margin = "0";

    // add hr to the div
    div.appendChild(hr);

    const word2Index = i + 1;
    // add word 2
    if (sortedWordList.length > word2Index) {
      const count2 = sortedWordList[word2Index].count;
      const word2 = sortedWordList[word2Index].word;
      const word2Span = document.createElement("span");
      word2Span.innerText = `${word2}: ${count2}`;
      word2Span.style.whiteSpace = "nowrap";
      // add word 2 to the div
      div.appendChild(word2Span);
    }

    // add div to the word list div
    wordListDiv.appendChild(div);
  }

  // add word list to the content header
  if (contentHeader) {
    contentHeader.appendChild(wordListDiv);
  }
}

function addSummaryDataToContentHeader({
  avgPrice,
  avgReviewCount,
  avgRating,
  avgRank,
  avgSales,
  isLoading,
}) {
  // remove existing summary div
  const exSummaryDiv = document.getElementById(`${stylePrefix}-summary-div`);
  if (exSummaryDiv) {
    exSummaryDiv.remove();
  }
  // summary data
  const summaryDiv = document.createElement("div");
  summaryDiv.className = `${stylePrefix}-summary-div`;
  summaryDiv.id = `${stylePrefix}-summary-div`;
  summaryDiv.style.display = "flex";
  summaryDiv.style.flexDirection = "row";
  summaryDiv.style.gap = "30px";
  summaryDiv.style.padding = "8px";
  summaryDiv.style.marginBottom = "8px";
  summaryDiv.style.alignItems = "center";
  summaryDiv.style.justifyContent = "center";
  summaryDiv.style.fontSize = "14px";
  summaryDiv.style.fontWeight = "bold";
  summaryDiv.style.color = "#000";

  // create summary data
  const summaryData = [
    {
      name: "Average Price",
      value: isLoading ? "Loading..." : numberWithCommas(avgPrice),
    },
    {
      name: "Average Review Count",
      value: isLoading
        ? "Loading..."
        : numberWithCommas(parseInt(avgReviewCount)),
    },
    {
      name: "Average Rating",
      value: isLoading ? "Loading..." : numberWithCommas(avgRating),
    },
    {
      name: "Average Rank",
      value: isLoading ? "Loading..." : numberWithCommas(parseInt(avgRank)),
    },
    {
      name: "Average Sales",
      value: isLoading ? "Loading..." : numberWithCommas(parseInt(avgSales)),
    },
  ];

  // create summary data divs
  for (const data of summaryData) {
    const div = document.createElement("div");
    div.style.display = "flex";
    div.style.flexDirection = "column";
    div.style.gap = "8px";
    div.style.alignItems = "center";
    div.style.justifyContent = "center";
    div.style.fontSize = "14px";
    div.style.fontWeight = "400";
    div.style.lineHeight = "1.5";
    // use material design colors white color card and black text
    div.style.background = "white";
    div.style.color = "black";
    // add elevation to the div
    div.style.boxShadow = "0 4px 8px 0 rgba(0,0,0,0.2)";
    div.style.padding = "8px";
    div.style.borderRadius = "8px";

    const name = document.createElement("span");
    name.innerText = data.name + ":" + " " + data.value;

    div.appendChild(name);

    summaryDiv.appendChild(div);
  }

  // add summary data to the content header
  const contentHeader = document.getElementById(
    `${stylePrefix}-deep-view-modal-content-header`
  );
  if (contentHeader) {
    contentHeader.appendChild(summaryDiv);
  }
}

function showDeepViewData(token, searchKey) {
  allDownloadableProducts = [];

  totalProducts = 0;
  let isFirst = true;

  const WS = wsConnection(token);

  WS.onopen = function (event) {
  };

  let hostname = window.location.hostname;

  getSellCenterData({
    searchKey: searchKey,
    domain: hostname.replace("www.", ""),
    WS,
  });
  let tableBody = null;

  WS.onmessage = function (e) {
    const data = JSON.parse(e.data);
    if (data.messageType === WSMessageTypes.WSDeepViewSuccess) {
      if (isFirst) {
        tableBody = createDeepViewTable();

        addSummaryDataToContentHeader({
          avgPrice: 0,
          avgReviewCount: 0,
          avgRating: 0,
          avgRank: 0,
          avgSales: 0,
          isLoading: true,
        });
        isFirst = false;
      }
      // add to table and update the summary div
      const result = JSON.parse(data.data);
      addTableBodyRow(result, tableBody, WS);
      appendWordListDiv(
        allWords,
        document.getElementById(`${stylePrefix}-deep-view-modal-content-header`),
        "word-list-deep-view"
      );
    }
  };

  WS.onclose = function (event) {
    // hide the loading animation
    hideLoading();
    addSummaryDataToContentHeader({
      avgPrice: (totalPrices / totalProducts).toFixed(2),
      avgReviewCount: (totalReviews / totalProducts).toFixed(2),
      avgRating: (totalRatings / totalProducts).toFixed(2),
      avgRank: (totalRanks / totalProducts).toFixed(2),
      avgSales: (totalSales / totalProducts).toFixed(2),
      isLoading: false,
    });
    // add word list after summary div
    appendWordListDiv(
      allWords,
      document.getElementById(`${stylePrefix}-deep-view-modal-content-header`),
      "word-list-deep-view"
    );
  };

  WS.onerror = function (error) {
    // hide the loading animation
    hideLoading();
  };

  // websocket connection timeout after 1 minutes
  setTimeout(() => {
    if(WS) WS.close();
  }, 60000);
}

async function handleDeepView(token, searchKeyword) {
  // check if dom is exist
  // if (!document.getElementById(stylePrefix + "-popup-modal")) {
  //   document.body.innerHTML += modalHtml;
  // }
  // use jquery to check if dom is exist
  if ($(`#${stylePrefix}-popup-modal`).length) {
    // remove existing content
    $(`#${stylePrefix}-popup-modal`).remove();
  }
  // add modal html to the body
  $("body").append(modalHtml);

  // // remove existing content
  // removeExistingContent();

  // show the modal
  // document.getElementById(stylePrefix + "-popup-modal").style.display = "block";
  $(`#${stylePrefix}-popup-modal`).show();

  if (searchKeyword.length) {
    // insert the keyword to the search bar
    document.getElementById("deep-view-search-bar").value = searchKeyword;
    // remove existing content
    removeExistingContent();
    // show the loading animation
    showLoading();
  }
  const hostname = window.location.hostname;
  try {
    const deepViewToken = await getDeepViewToken({
      token: token,
      searchKey: searchKeyword,
      domain: hostname.replace("www.", ""),
    });

    if (deepViewToken) {
      if (deepViewToken.data.is_paid === false) {
        // set trial left
        const trialDiv = document.getElementById(`${stylePrefix}-trial-div`);
        trialDiv.style.display = "flex";
        const trialText = document.getElementById(`${stylePrefix}-trial-text`);
        trialText.innerText = `Trial Left: ${deepViewToken.data.trial_left}`;
      } else {
        // hide trial left
        const trialDiv = document.getElementById(`${stylePrefix}-trial-div`);
        trialDiv.style.display = "none";
      }

      let token = deepViewToken.data.token;

      // show the data
      showDeepViewData(token, searchKeyword);
    }
  } catch (error) {
    console.error("Error getting token", error);
    hideLoading();
    alert(error.message);
  }
  // add the data to the content area
  // create table with the data (with sorting)
}

// deep view click event if dom is exist
$(document).on(
  "click",
  `#${stylePrefix}-deep-view-search-button`,
  function (e) {
    e.preventDefault();
    e.stopPropagation();
    // get token from local storage
    chrome.storage.local.get(["token"], function (result) {
      const token = result.token;
      if (token === null) {
        return;
      }
      // get text from the deep view search bar
      const searchedKeyword = document.getElementById(
        "deep-view-search-bar"
      ).value;
      handleDeepView(token, searchedKeyword);
    });
  }
);

// deep-view-search-bar on enter key press event
$(document).on("keypress", `#deep-view-search-bar`, function (e) {
  if (e.which == 13) {
    // get token from local storage
    chrome.storage.local.get(["token"], function (result) {
      const token = result.token;
      if (token === null) {
        return;
      }
      const searchedKeyword = document.getElementById(
        "deep-view-search-bar"
      ).value;

      handleDeepView(token, searchedKeyword);
    });
  }
});

// deep view click event if dom is exist
$(document).on("click", "#deep-view-btn", function (e) {
  e.preventDefault();
  e.stopPropagation();
  // get token from local storage
  chrome.storage.local.get(
    ["token", uniqueId + "_deepView"],
    function (result) {
      const token = result.token;
      if(result[uniqueId + "_deepView"] == false || result[uniqueId + "_deepView"] == "false" || !token){
        if(result[uniqueId + "_deepView"] == false || result[uniqueId + "_deepView"] == "false"){
          alert("Please enable the Deep View feature from the extension options page.");
        } else {
          alert("Please login to use this feature.");
        }
        return;
      }
      // get text from the amazon search bar
      const searchedKeyword = document.getElementById(
        "twotabsearchtextbox"
      ).value;
      // resetData();
      handleDeepView(token, searchedKeyword);
    }
  );
});

// ${stylePrefix}-deep-view-download-btn
// add event listener to download button
$(document).on("click", `#${stylePrefix}-deep-view-download-btn`, function (e) {
  e.preventDefault();
  e.stopPropagation();
  // download the data
  if (allDownloadableProducts.length) {
    // download xlsx file using XLSX library
    const ws = XLSX.utils.json_to_sheet(allDownloadableProducts);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "products.xlsx");
  }
});

// add event listener to close button
$(document).on("click", `#${stylePrefix}-deep-view-close-btn`, function (e) {
  e.preventDefault();
  e.stopPropagation();
  hideModal();
});


