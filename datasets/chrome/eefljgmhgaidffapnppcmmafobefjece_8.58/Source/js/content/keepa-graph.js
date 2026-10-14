var uniqueId = "amazon-analysis-" + chrome.runtime.id;

/** Defined here too: Amazon-only content script entry loads keepa-graph without utils.js */
function isSptAllInOneUnifiedActive() {
  try {
    return (
      document.documentElement.getAttribute("data-spt-unified-extension") ===
      "1"
    );
  } catch (e) {
    return false;
  }
}

function isValidBook(parsedData) {
  if (!parsedData.size || !parsedData.price || !parsedData.page_count) {
    return false;
  }
  return true;
}

function getMonthlySalesRange(monthlySales, hasMainBsr) {
  // Handle different input types and convert to string
  if (monthlySales === null || monthlySales === undefined) {
    return "0 - 0";
  }

  if (!hasMainBsr) {
    return "-- - --";
  }

  // Convert to string and remove commas
  const monthlySalesStr = String(monthlySales).replace(/,/g, "");
  const sales = parseInt(monthlySalesStr, 10);

  // Handle NaN case
  if (isNaN(sales)) {
    return "0 - 0";
  }

  let lower = Math.round(sales * 0.8);
  let upper = Math.round(sales * 1.2);

  // range value are same then it should be -1 and +1 ex: 1-1 then it should be 0-2, 2-2 then it should be 1-3
  if (lower === upper) {
    lower = lower - 1;
    upper = upper + 1;
  }
  // range can't be negative
  if (lower < 0) {
    lower = 0;
  }
  if (upper < 0) {
    upper = 0;
  }

  const range = `${lower.toLocaleString()} - ${upper.toLocaleString()}`;
  return range;
}

function getRoyaltyRange(royalty, hasMainBsr) {
  if (!hasMainBsr) {
    return "-- - --";
  }
  return `$${parseInt(
    royalty?.data?.data?.royalty_min || 0
  )?.toLocaleString()} - $${parseInt(
    royalty?.data?.data?.royalty_max || 0
  )?.toLocaleString()}`;
}

async function getRoyalty(
  domain,
  bsr,
  dimension,
  price,
  page_count,
  isIndependentPublisher
) {
  if (!token) {
    token = await getToken();
  }
  if (!bsr || !dimension || !price || !page_count || !domain || !token) {
    return;
  }

  if (typeof price === "string") {
    price = parseFloat(price.replace(/[^0-9.]/g, ""));
  }

  const data = {
    dimension: dimension,
    bsr: bsr,
    price: price,
    page_count: page_count,
    domain: domain,
    is_independent_publisher: isIndependentPublisher,
  };
  const payload = {
    data,
    token,
    url: "https://go.selfpublishingtitans.com/api/v1/royalty/",
    method: "POST",
  };
  const response = await sendRequestUsingBackgroundScript(
    "apiRequest",
    payload
  );
  return response;
}

// add 24 hours, 7 days, 30 days, 90 days, 6M, 1 Year all time buttons to the card header
function addButtonsToCardHeader(cardHeader, asin) {
  const buttons = [
    {
      text: "24 Hours",
      value: 24,
    },
    {
      text: "7 Days",
      value: 7,
    },
    {
      text: "30 Days",
      value: 30,
    },
    {
      text: "90 Days",
      value: 90,
    },
    {
      text: "6 Months",
      value: 180,
    },
    {
      text: "1 Year",
      value: 365,
    },
    {
      text: "All Time",
      value: 9999,
    },
  ];

  // create a div element
  let div = document.createElement("div");
  // set the div class
  div.className = "btn-group";
  div.style =
    "display: flex; justify-content: center; margin: 0; padding: 20px 0;";
  // set the div style
  // div.style = "float: center;";
  // create a button elements
  for (const button of buttons) {
    // create a button element
    let buttonElement = document.createElement("button");
    // style text button
    // set the button class
    buttonElement.className = `${stylePrefix}-text-btn`;
    // button id
    buttonElement.id = `${stylePrefix}-graph-button-${button.value}`;
    // set the button text
    buttonElement.innerText = button.text;
    // add to the div
    div.appendChild(buttonElement);
  }
  // append the div to the card header
  cardHeader.appendChild(div);
}

function buttonCssHandler(btn, btns) {
  btns.forEach((btn) => {
    btn.classList.remove(`active`);
  });
  btn.classList.add(`active`);
}

function convertKeepaTimestamp(keepaTimestamp) {
  // Add 21,564,000 to Keepa timestamp
  let uncompressedTimestamp = keepaTimestamp + 21564000;

  // Convert to milliseconds
  let javascriptTimestamp = uncompressedTimestamp * 60000;

  return javascriptTimestamp;
}

// show the graph
async function showGraph(asin, token) {
  if (isSptAllInOneUnifiedActive()) {
    return;
  }
  let container = document.createElement("div");
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.height = "80vh";

  let containerHeader = document.createElement("div");
  containerHeader.className = "card-header";
  containerHeader.style.display = "flex";
  containerHeader.style.alignItems = "center";
  containerHeader.style.justifyContent = "center";
  containerHeader.style.height = "50px"; // Set a fixed height
  containerHeader.style.marginBottom = "10px";

  addButtonsToCardHeader(containerHeader, asin);

  let graphContainer = document.createElement("div");
  graphContainer.style.flex = "1"; // Allow it to take up the remaining space
  graphContainer.style.width = "100%";

  let canvas = document.createElement("canvas");
  canvas.id = "graph-canvas";
  canvas.style.height = "100%";
  canvas.style.width = "100%";

  graphContainer.appendChild(canvas);

  container.appendChild(containerHeader);
  container.appendChild(graphContainer);

  let atfContainer = document.getElementById(
    "ATFCriticalFeaturesDataContainer"
  );

  if (atfContainer) {
    atfContainer.parentNode.insertBefore(container, atfContainer.nextSibling);
  } else {
    return;
  }

  // show loading spinner
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

  // add right after the header element
  containerHeader.parentNode.insertBefore(
    loadingSpinnerContainer,
    containerHeader.nextSibling
  );

  const domainValue = getDomainValue(hostname);

  const keepaApiUrl = `https://go.selfpublishingtitans.com/api/v1/keepa/graph?domain=${domainValue}&stats=365&buybox=1&history=1&offers=20&asin=${asin}`;

  let response = null;
  try {
    const payload = {
      data: null,
      token,
      url: keepaApiUrl,
      method: "GET",
    };
    response = await sendRequestUsingBackgroundScript("apiRequest", payload);
    if (response.status != 200) {
      loadingSpinnerContainer.remove();
      container.remove();
      return;
    }
  } catch (error) {
    console.error(error);
    loadingSpinnerContainer.remove();
    container.remove();
  }

  let data;
  let keepaProductsCsv;

  try {
    data = response.data;

    data = data.data;

    data = JSON.parse(data.response);

    data = data.products[0];

    keepaProductsCsv = data.csv;
  } catch (error) {
    console.error(error);
    loadingSpinnerContainer.remove();
    container.remove();
  }

  const keepaAmazonPriceHistory = keepaProductsCsv[0] || [];
  const keepaNewPriceHistory = keepaProductsCsv[1] || [];
  const keepaUsedPriceHistory = keepaProductsCsv[2] || [];
  const keepaSalesRankHistory = keepaProductsCsv[3] || [];
  const keepaReviewHistory = keepaProductsCsv[17] || [];
  const keepaListPriceHistory = keepaProductsCsv[4] || [];
  const keepaCollectiblePriceHistory = keepaProductsCsv[5] || [];
  const keepaBuyBoxPriceHistory = keepaProductsCsv[18] || [];
  const keepaFbaPriceHistory = keepaProductsCsv[10] || [];
  const sellersNewHistory = keepaProductsCsv[11] || [];

  let keepaChartData = [];

  let keepaTimestamps = [];

  const bsr = [];
  const amazon = [];
  const buyBox = [];
  const fba = [];
  const newPrice = [];
  const newOfferCount = [];
  const reviewCount = [];
  const list = [];

  // generate chart data from tracking since to current date

  // keepa amazon price history
  if (keepaAmazonPriceHistory) {
    for (let i = 0; i < keepaAmazonPriceHistory.length; i += 2) {
      keepaTimestamps.push(keepaAmazonPriceHistory[i]);
    }
  }

  // keepa new price history
  if (keepaNewPriceHistory) {
    for (let i = 0; i < keepaNewPriceHistory.length; i += 2) {
      keepaTimestamps.push(keepaNewPriceHistory[i]);
    }
  }

  // keepa bsr
  if (keepaSalesRankHistory) {
    for (let i = 0; i < keepaSalesRankHistory.length; i += 2) {
      keepaTimestamps.push(keepaSalesRankHistory[i]);
    }
  }

  // keepa review history
  if (keepaReviewHistory) {
    for (let i = 0; i < keepaReviewHistory.length; i += 2) {
      keepaTimestamps.push(keepaReviewHistory[i]);
    }
  }

  // keepa list price history
  if (keepaListPriceHistory) {
    for (let i = 0; i < keepaListPriceHistory.length; i += 2) {
      keepaTimestamps.push(keepaListPriceHistory[i]);
    }
  }

  // keepa buy box price history
  if (keepaBuyBoxPriceHistory) {
    for (let i = 0; i < keepaBuyBoxPriceHistory.length; i += 3) {
      keepaTimestamps.push(keepaBuyBoxPriceHistory[i]);
    }
  }

  // sort the timestamps
  keepaTimestamps.sort((a, b) => a - b);

  // remove duplicates
  keepaTimestamps = [...new Set(keepaTimestamps)];

  // add values to the arrays or null
  for (let i = 0; i < keepaTimestamps.length; i++) {
    // bsr
    if (keepaSalesRankHistory.includes(keepaTimestamps[i])) {
      const value =
        keepaSalesRankHistory[
          keepaSalesRankHistory.indexOf(keepaTimestamps[i]) + 1
        ];

      if (value === -1) {
        if (bsr.length === 0) {
          bsr.push(null);
        } else {
          let prevValue = bsr[bsr.length - 1];
          bsr.push(prevValue);
        }
      } else {
        bsr.push(value);
      }
    } else {
      if (bsr.length === 0) {
        bsr.push(null);
      } else {
        let prevValue = bsr[bsr.length - 1];
        bsr.push(prevValue);
      }
    }

    // amazon
    if (keepaAmazonPriceHistory.includes(keepaTimestamps[i])) {
      const value =
        keepaAmazonPriceHistory[
          keepaAmazonPriceHistory.indexOf(keepaTimestamps[i]) + 1
        ];

      if (value === -1) {
        if (amazon.length === 0) {
          amazon.push(null);
        } else {
          let prevValue = amazon[amazon.length - 1];
          amazon.push(prevValue);
        }
      } else {
        if (value === null) {
          amazon.push(null);
        } else {
          amazon.push(value / 100);
        }
      }
    } else {
      if (amazon.length === 0) {
        amazon.push(null);
      } else {
        let prevValue = amazon[amazon.length - 1];
        amazon.push(prevValue);
      }
    }

    // buy box
    if (keepaBuyBoxPriceHistory.includes(keepaTimestamps[i])) {
      const value =
        keepaBuyBoxPriceHistory[
          keepaBuyBoxPriceHistory.indexOf(keepaTimestamps[i]) + 1
        ];

      if (value === -1) {
        if (buyBox.length === 0) {
          buyBox.push(null);
        } else {
          let prevValue = buyBox[buyBox.length - 1];
          buyBox.push(prevValue);
        }
      } else {
        if (value === null) {
          buyBox.push(null);
        } else {
          buyBox.push(value / 100);
        }
      }
    } else {
      if (buyBox.length === 0) {
        buyBox.push(null);
      } else {
        let prevValue = buyBox[buyBox.length - 1];
        buyBox.push(prevValue);
      }
    }

    // fba
    if (keepaFbaPriceHistory.includes(keepaTimestamps[i])) {
      const value =
        keepaFbaPriceHistory[
          keepaFbaPriceHistory.indexOf(keepaTimestamps[i]) + 1
        ];

      if (value === -1) {
        if (fba.length === 0) {
          fba.push(null);
        } else {
          let prevValue = fba[fba.length - 1];
          fba.push(prevValue);
        }
      } else {
        if (value === null) {
          fba.push(null);
        } else {
          fba.push(value / 100);
        }
      }
    } else {
      if (fba.length === 0) {
        fba.push(null);
      } else {
        let prevValue = fba[fba.length - 1];
        fba.push(prevValue);
      }
    }

    // new price
    if (keepaNewPriceHistory.includes(keepaTimestamps[i])) {
      const value =
        keepaNewPriceHistory[
          keepaNewPriceHistory.indexOf(keepaTimestamps[i]) + 1
        ];

      if (value === -1) {
        if (newPrice.length === 0) {
          newPrice.push(null);
        } else {
          let prevValue = newPrice[newPrice.length - 1];
          newPrice.push(prevValue);
        }
      } else {
        if (value === null) {
          newPrice.push(null);
        } else {
          newPrice.push(value / 100);
        }
      }
    } else {
      if (newPrice.length === 0) {
        newPrice.push(null);
      } else {
        let prevValue = newPrice[newPrice.length - 1];
        newPrice.push(prevValue);
      }
    }

    // new offer count
    if (sellersNewHistory.includes(keepaTimestamps[i])) {
      const value =
        sellersNewHistory[sellersNewHistory.indexOf(keepaTimestamps[i]) + 1];

      if (value === -1) {
        if (newOfferCount.length === 0) {
          newOfferCount.push(null);
        } else {
          let prevValue = newOfferCount[newOfferCount.length - 1];
          newOfferCount.push(prevValue);
        }
      } else {
        if (value === null) {
          newOfferCount.push(null);
        } else {
          newOfferCount.push(value);
        }
      }
    } else {
      if (newOfferCount.length === 0) {
        newOfferCount.push(null);
      } else {
        let prevValue = newOfferCount[newOfferCount.length - 1];
        newOfferCount.push(prevValue);
      }
    }

    // review count
    if (keepaReviewHistory.includes(keepaTimestamps[i])) {
      const value =
        keepaReviewHistory[keepaReviewHistory.indexOf(keepaTimestamps[i]) + 1];

      if (value === -1) {
        if (reviewCount.length === 0) {
          reviewCount.push(null);
        } else {
          let prevValue = reviewCount[reviewCount.length - 1];
          reviewCount.push(prevValue);
        }
      } else {
        if (value === null) {
          reviewCount.push(null);
        } else {
          reviewCount.push(value);
        }
      }
    } else {
      if (reviewCount.length === 0) {
        reviewCount.push(null);
      } else {
        let prevValue = reviewCount[reviewCount.length - 1];
        reviewCount.push(prevValue);
      }
    }

    // list
    if (keepaListPriceHistory.includes(keepaTimestamps[i])) {
      const value =
        keepaListPriceHistory[
          keepaListPriceHistory.indexOf(keepaTimestamps[i]) + 1
        ];

      if (value === -1) {
        if (list.length === 0) {
          list.push(null);
        } else {
          let prevValue = list[list.length - 1];
          list.push(prevValue);
        }
      } else {
        if (value === null) {
          list.push(null);
        } else {
          list.push(value / 100);
        }
      }
    } else {
      if (list.length === 0) {
        list.push(null);
      } else {
        let prevValue = list[list.length - 1];
        list.push(prevValue);
      }
    }
  }

  let dates = keepaTimestamps.map(
    (timestamp) => new Date(convertKeepaTimestamp(timestamp))
  );

  const leftColumn = document.getElementById("leftCol");
  const rightColumn = document.getElementById("rightCol");

  if (leftColumn && rightColumn) {
    // if left column and right column has the almost same height
    if (rightColumn.offsetHeight - leftColumn.offsetHeight < 100) {
      container.style.width = "100%";
      container.style.alignItems = "center";
    } else {
      container.style.clear = "left";
      container.style.height = "70vh";
    }
  } else {
    container.style.clear = "left";
    container.style.height = "70vh";
  }

  // plot a line chart
  const ctx = document.getElementById("graph-canvas");
  // remove time from the date

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: "BSR",
        data: bsr,
        borderColor: "#7F58AF",
        fill: false,
        yAxisID: "BSR",
        stepped: true,
      },
      {
        label: "List Price",
        data: list,
        borderColor: "#FEB326",
        fill: false,
        yAxisID: "y",
      },
      {
        // same
        label: "New Price",
        data: buyBox,
        borderColor: "#64C5EB",
        fill: false,
        yAxisID: "y",
        stepped: true,
      },

      // {
      //   label: "amazon",
      //   data: amazon,
      //   borderColor: "#e8c3b9",
      //   fill: false,
      // },
      //   {
      //     label: "New",
      //     data: newPrice,
      //     borderColor: "#c45850",
      //     fill: false,
      //   },
      //   {
      //     label: "New Offer Count",
      //     data: newOfferCount,
      //     borderColor: "#c45850",
      //     fill: false,
      //   },
      {
        label: "Review Count",
        data: reviewCount,
        borderColor: "#E84D8A",
        fill: false,
        yAxisID: "ReviewCountY",
        stepped: true,
      },
      //   {
      //     label: "List",
      //     data: list,
      //     borderColor: "#c45850",
      //     fill: false,
      //     yAxisID: "y",
      //     stepped: true,
      //   },
    ],
  };

  let progress = {
    value: 0,
  };
  let initProgress = {
    value: 0,
  };

  // add a background watermark Text inside the chart (Self Publishing Titans) linear-gradient( 270.09deg, #6b49fc -13.64%, #de85ff 86.14%, #e26ff1 106.56% ) color
  let logoImage = {
    id: "spt-logo",
    beforeDraw: function (chart, args, options) {
      const ctx = chart.ctx;
      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "bold 5rem Arial";
      // add gradient to the text
      const gradient = ctx.createLinearGradient(0, 0, chart.width, 0);
      gradient.addColorStop(0, "#6b49fc");
      gradient.addColorStop(1, "#e26ff1");
      ctx.fillStyle = gradient;

      // add opacity to the text
      ctx.globalAlpha = 0.2;

      if (rightColumn.offsetHeight - leftColumn.offsetHeight < 100) {
        ctx.fillText(
          "Self Publishing Titans",
          chart.width / 2,
          chart.height / 3
        );
      } else {
        ctx.fillText(
          "Self Publishing Titans",
          chart.width / 2.2,
          chart.height / 3
        );
      }

      ctx.restore();
    },
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      axis: "x",
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          displayFormats: {
            quarter: "MMM YYYY",
          },
          unit: "day",
          stepSize: 1,
        },
      },
      y: {
        grace: "20%",
        type: "linear",
        position: "left",
        title: {
          display: true,
          text: "Price",
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return "$" + parseFloat(value).toFixed(2);
          },
          color: "#7F58AF",
        },
      },
      BSR: {
        type: "linear",
        position: "right",
        title: {
          display: true,
          text: "BSR",
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return parseInt(value).toLocaleString();
          },
          color: "#7F58AF",
        },
        grace: "20%",
      },
      ReviewCountY: {
        type: "linear",
        position: "right",
        title: {
          display: true,
          text: "Review Count",
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return parseInt(value).toLocaleString();
          },
          color: "#7F58AF",
        },
        grace: "20%",
      },
    },
    // zoom plugin
    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
            speed: 0.01,
          },
          pinch: {
            enabled: true,
            speed: 0.01,
          },
          mode: "x",
        },
        pan: {
          enabled: true,
          mode: "x",
        },
      },
    },
    // show loading spinner before chart data is loaded
    animation: {
      duration: 2000,
      onProgress: function (context) {
        if (context.initial) {
          initProgress.value = context.currentStep / context.numSteps;
        } else {
          progress.value = context.currentStep / context.numSteps;
        }
      },
      onComplete: function (context) {
        if (context.initial) {
        } else {
        }
      },
    },
  };

  const chart = new Chart(ctx, {
    type: "line",
    data: chartData,
    options: chartOptions,
    plugins: [logoImage],
  });

  // remove loading spinner
  loadingSpinnerContainer.remove();

  // init chart with last 30 days data
  chart.resetZoom();
  chart.zoomScale(
    "x",
    {
      min: new Date(new Date() - 1000 * 60 * 60 * 24 * 30).valueOf(),
      max: new Date().valueOf(),
    },
    "default"
  );
  chart.update();

  // all buttons handler
  const btn24Hours = document.getElementById(`${stylePrefix}-graph-button-24`);
  const btn7Days = document.getElementById(`${stylePrefix}-graph-button-7`);
  const btn30Days = document.getElementById(`${stylePrefix}-graph-button-30`);
  const btn90Days = document.getElementById(`${stylePrefix}-graph-button-90`);
  const btn6Months = document.getElementById(`${stylePrefix}-graph-button-180`);
  const btn1Year = document.getElementById(`${stylePrefix}-graph-button-365`);
  const btnAllTime = document.getElementById(
    `${stylePrefix}-graph-button-9999`
  );

  const buttons = [
    btn24Hours,
    btn7Days,
    btn30Days,
    btn90Days,
    btn6Months,
    btn1Year,
    btnAllTime,
  ];

  //set the default button as active
  buttonCssHandler(btn30Days, buttons);

  // 24 hours button handler
  btn24Hours.addEventListener("click", () => {
    // update zoom
    chart.resetZoom();
    chart.zoomScale(
      "x",
      {
        // current date - 24 hours
        min: new Date(new Date() - 1000 * 60 * 60 * 24).valueOf(),
        max: new Date().valueOf(),
      },
      "default"
    );
    chart.update();
    buttonCssHandler(btn24Hours, buttons);
  });

  // 7 days button handler
  btn7Days.addEventListener("click", () => {
    // update zoom
    chart.resetZoom();
    chart.zoomScale(
      "x",
      {
        min: new Date(new Date() - 1000 * 60 * 60 * 24 * 7).valueOf(),
        max: new Date().valueOf(),
      },
      "default"
    );
    chart.update();
    buttonCssHandler(btn7Days, buttons);
  });

  // 30 days button handler
  btn30Days.addEventListener("click", () => {
    // update zoom
    chart.resetZoom();
    chart.zoomScale(
      "x",
      {
        min: new Date(new Date() - 1000 * 60 * 60 * 24 * 30).valueOf(),
        max: new Date().valueOf(),
      },
      "default"
    );
    chart.update();
    buttonCssHandler(btn30Days, buttons);
  });

  // 90 days button handler

  btn90Days.addEventListener("click", () => {
    // update zoom
    chart.resetZoom();
    chart.zoomScale(
      "x",
      {
        min: new Date(new Date() - 1000 * 60 * 60 * 24 * 90).valueOf(),
        max: new Date().valueOf(),
      },
      "default"
    );
    chart.update();
    buttonCssHandler(btn90Days, buttons);
  });

  // 6 months button handler
  btn6Months.addEventListener("click", () => {
    // update zoom
    chart.resetZoom();
    chart.zoomScale(
      "x",
      {
        min: new Date(new Date() - 1000 * 60 * 60 * 24 * 180).valueOf(),
        max: new Date().valueOf(),
      },
      "default"
    );
    chart.update();
    buttonCssHandler(btn6Months, buttons);
  });

  // 1 year button handler
  btn1Year.addEventListener("click", () => {
    // update zoom
    chart.resetZoom();
    chart.zoomScale(
      "x",
      {
        min: new Date(new Date() - 1000 * 60 * 60 * 24 * 365).valueOf(),
        max: new Date().valueOf(),
      },
      "default"
    );
    chart.update();
    buttonCssHandler(btn1Year, buttons);
  });

  // all time button handler
  btnAllTime.addEventListener("click", () => {
    // update zoom
    chart.resetZoom();
    chart.zoomScale(
      "x",
      {
        min: new Date(keepaChartData[0].date).valueOf(),
        max: new Date().valueOf(),
      },
      "default"
    );
    chart.update();
    buttonCssHandler(btnAllTime, buttons);
  });
}

const extractASIN = (url) => {
  var ASINreg = new RegExp(/(?:\/)([A-Z0-9]{10})(?:$|\/|\?)/);
  var cMatch = url.match(ASINreg);
  if (cMatch == null) {
    return null;
  }
  return cMatch[1];
};

async function showPageSummary(asin) {
  if (isSptAllInOneUnifiedActive()) {
    return;
  }
  const summaryContainer = document.getElementById("page-summary");
  if (summaryContainer) {
    return;
  }
  // asin, rank, category, est Daily Sales, est Monthly Sales,
  // create boxes and add to the page
  const currentPageHtml = document.documentElement.innerHTML;
  const parsedData = await parseProductHTML(currentPageHtml);

  if (!asin) {
    asin = extractASIN(window.location.href);
  }

  if (!asin) {
    //data-asin
    asin = document.querySelector("[data-asin]").getAttribute("data-asin");
  }

  parsedData.asin = asin;

  const pageSummary = document.createElement("div");
  pageSummary.id = "page-summary";
  pageSummary.style.display = "block";
  pageSummary.style.position = "relative";
  pageSummary.style.marginBottom = "24px";
  // margin left and right 16px
  pageSummary.style.marginLeft = "16px";
  pageSummary.style.marginRight = "16px";
  pageSummary.classList.add(stylePrefix + "-product-summary");

  let estSales = null;
  if (parsedData.hasMainBsr) {
    estSales = await getSalesEstimate(
      window.location.hostname,
      parsedData.bsr,
      parsedData.format
    );
  }

  console.log("parsedData", parsedData);
  const isIndependentPublisher =
    parsedData.seller.toLowerCase().indexOf("independently") !== -1;

  let royalty = null;
  if (parsedData.hasMainBsr) {
    royalty = await getRoyalty(
      window.location.hostname,
      parsedData.bsr,
      parsedData.size,
      parsedData.price,
      parsedData.page_count,
      isIndependentPublisher
    );
  }

  const isValidBookData = isValidBook(parsedData);

  let dailySales = 0;
  let monthlySales = 0;

  if (estSales?.data) {
    try {
      monthlySales = numberWithCommas(
        parseInt(estSales.data.data.estimatedSales)
      );
      dailySales = getDailySalesFromMonthly(estSales.data.data.estimatedSales);
    } catch (error) {
      console.error(error);
    }
  }

  let isDeepViewPaid = true;

  if (estSales?.error && estSales.error === "user not paid") {
    isDeepViewPaid = false;
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


      <div class="${stylePrefix}-product-summary-card">
        <div class="${stylePrefix}-product-summary-card-header">
          Best Sellers Rank
        </div>
         ${parsedData.bsrHTML}
        </div>
      <div
        class="${stylePrefix}-product-summary-card"
        style="display: ${
          isValidBookData && royalty !== null && royalty !== undefined
            ? "block"
            : "none"
        };"
      >
        <div class="${stylePrefix}-product-summary-card-header">
          30 Day Royalties
        </div>
        <div class="${stylePrefix}-product-summary-card-content" style="${
    isDeepViewPaid ? "" : "filter: blur(8px);"
  }">
          ${getRoyaltyRange(royalty, parsedData.hasMainBsr)}
        </div>
      </div>

      <div class="${stylePrefix}-product-summary-card">
        <div class="${stylePrefix}-product-summary-card-header">
        30 Day Sales
        </div>
        
        <div class="${
          isDeepViewPaid ? "" : "price-popup"
        } ${stylePrefix}-product-summary-card-content">
           <span style="${isDeepViewPaid ? "" : "filter: blur(8px);"}" > ${
    isDeepViewPaid
      ? getMonthlySalesRange(monthlySales, parsedData.hasMainBsr)
      : "000"
  } </span>
        </div>
        
      </div>

    <div class="${stylePrefix}-product-summary-card">
      <div class="${stylePrefix}-product-summary-card-header">
      Other Resources
      </div>
      <div class="${stylePrefix}-product-summary-card-content" style="display: flex; flex-direction: column; gap: 8px;">
        <a class="${stylePrefix}-product-summary-rounded-btn" style="width: 100%; padding: 4px 16px;" href="https://selfpublishingtitans.com/titans-asin-tracker?asin=${asin}&domain=${hostname}&from=extension" target="_blank">Track Product</a>
        <a class="${stylePrefix}-product-summary-rounded-btn" style="width: 100%; padding: 4px 16px;" href="https://selfpublishingtitans.com/titans-retro-vision?asin=${asin}&domain=${hostname}&from=extension" target="_blank">Reverse Engineer</a>
      </div>
    </div>
  `;

  const atfContainer = document.getElementById("dp-container");
  const aboveDPContainer = document.getElementById("above-dp-container");

  if (aboveDPContainer) {
    aboveDPContainer.appendChild(pageSummary);
  } else if (atfContainer) {
    atfContainer.prepend(pageSummary);
  }

  // .${stylePrefix}-prod-list-items set the font size to 16px
  $(`.${stylePrefix}-prod-list-items`).css("font-size", "16px");
  // .${stylePrefix}-list-items-a set the font size to 16px
  $(`.${stylePrefix}-list-items-a`).css("font-size", "16px");
}

chrome.storage.local.get(
  [uniqueId + "_isEnable", uniqueId + "_productPageGraph", "token"],
  async function (data) {
    if (
      data[uniqueId + "_isEnable"] == "false" ||
      data[uniqueId + "_isEnable"] == false ||
      data["token"] == null ||
      data["token"] == undefined ||
      data[uniqueId + "_productPageGraph"] == "false" ||
      data[uniqueId + "_productPageGraph"] == false
    ) {
      console.info("titans deep view Graph is disabled");
      return;
    }
    const asin = extractASIN(window.location.href);
    if (!asin) {
      return;
    }
    showGraph(asin, data["token"]);
  }
);

chrome.storage.local.get(
  [uniqueId + "_isEnable", uniqueId + "_productPageDeepViewWidget", "token"],
  async function (data) {
    if (
      data[uniqueId + "_isEnable"] == "false" ||
      data[uniqueId + "_isEnable"] == false ||
      data["token"] == null ||
      data["token"] == undefined ||
      data[uniqueId + "_productPageDeepViewWidget"] == "false" ||
      data[uniqueId + "_productPageDeepViewWidget"] == false
    ) {
      console.info("titans deep view summary is disabled");
      return;
    }
    const asin = extractASIN(window.location.href);
    if (!asin) {
      return;
    }
    showPageSummary(asin);
  }
);
