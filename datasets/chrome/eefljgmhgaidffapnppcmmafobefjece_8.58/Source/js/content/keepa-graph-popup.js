function removeGraph() {
  // remove the div
  document.getElementById("keepa-graph-div").remove();
}

/** Same signal as keepa-graph.js / utils.js — Titans All-in-One owns product-page Keepa. */
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

// show the graph
async function showGraphPopup(asin, token) {
  if (isSptAllInOneUnifiedActive()) {
    return;
  }
  // create a card element to hold the graph
  let card = document.createElement("div");
  // set the card class
  card.className = `${stylePrefix}-modal-content`;
  card.style = "height: 80vh; width: 80vw;";
  // set the card id
  card.id = "keepa-graph-card";

  // create a card header element
  let cardHeader = document.createElement("div");
  // set the card header class
  cardHeader.className = "card-header";

  // add a close button to the card header
  // create a button element
  let button = document.createElement("button");
  // set the button text
  button.innerHTML = "<span>&times;</span>"
  // set the button style
  button.style = "float: right; border: none; background-color: transparent; font-size: 1.5rem; cursor: pointer; color: black; border-radius: 50%;";
  // add an event listener to the button
  button.addEventListener("click", () => {
    // remove the graph
    document.getElementById("keepa-graph-div").remove();
  });
  // append the button to the card header
  cardHeader.appendChild(button);

  // add 24 hours, 7 days, 30 days, 90 days, 6M, 1 Year all time buttons to the card header
  // create a div element
  addButtonsToCardHeader(cardHeader, asin);

  // create a card body element
  let cardBody = document.createElement("div");
  cardBody.style.height = "80%";
  // set the card body class
  cardBody.className = ``;
  // set the card body id
  cardBody.id = "keepa-graph-card-body";

  let graphCanvas = document.createElement("canvas");
  graphCanvas.id = "graph-canvas";
  graphCanvas.style = "height: 100%; width: 100%;";
  cardBody.appendChild(graphCanvas);

  // show in the center of the page
  // create a div to hold the card
  let div = document.createElement("div");
  // set the div id
  div.id = "keepa-graph-div";
  // set the div class
  div.className = `${stylePrefix}-modal-2`;
  div.style =
    "display: flex; justify-content: center; align-items: center; height: 100vh; width: 100vw; position: fixed; top: 0; left: 0; background-color: rgba(0, 0, 0, 0.5); z-index: 1000;";
  // set the div style
  // append the card to the div
  div.appendChild(card);
  card.appendChild(cardHeader);
  card.appendChild(cardBody);
  document.body.appendChild(div);

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
  cardHeader.parentNode.insertBefore(
    loadingSpinnerContainer,
    cardHeader.nextSibling
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
      card.remove();
      return;
    }
  } catch (error) {
    console.error(error);
    loadingSpinnerContainer.remove();
    card.remove();
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
    card.remove();
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

      ctx.fillText(
        "Self Publishing Titans",
        chart.width / 2.2,
        chart.height / 3
      );

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

  if (ctx.chart) {
    ctx.chart.destroy();
  }

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



