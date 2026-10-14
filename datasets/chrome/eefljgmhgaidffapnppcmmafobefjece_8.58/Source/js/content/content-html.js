"use strict";

function getExactMatchCount(productDetails, searchKeyword) {
  let matchCounter = 0;
  productDetails.forEach((item) => {
    if (containsWord(item.title, searchKeyword) && !item.isSponsored) {
      matchCounter++;
    }
  });
  return matchCounter;
}

/**
 * Render analysis table
 * @param {*} avgBSR
 * @param {*} nicheScore
 * @param {*} avgReviews
 * @param {*} avgPrice
 */
async function renderTable(
  productDetails = [],
  demandOpportunityData,
  resNumber,
  productCount,
  productCountForBSRavg,
  sum,
  avgBSR
) {
  if (document.getElementById(uniqueId)) {
    document.getElementById(uniqueId).parentElement.remove();
  }
  
  // get search keyword from the search bar
  const searchKeyword = document.getElementById("twotabsearchtextbox").value;

  let matchCounter = getExactMatchCount(productDetails, searchKeyword);

  const minBSR = Math.min(
    ...Object.keys(productDetails)
      .map((key) => productDetails[key].bsr)
      .filter((bsr) => bsr > 0) // filter out 0 values
  ).toFixed(0);


  const maxBSR = Math.max(
    ...Object.keys(productDetails).map(function (key) {
      return productDetails[key].bsr;
    })
  ).toFixed(0);
  // todo
  const avgReviews = (
    Object.keys(productDetails)
      .map(function (key) {
        return productDetails[key].reviews || productDetails[key].ratings;
      })
      .reduce((a, b) => a + b, 0) / productCount
  ).toFixed(0);

  const minReviews = Math.min(
    ...Object.keys(productDetails).map(function (key) {
      return productDetails[key].reviews || productDetails[key].ratings;
    })
  ).toFixed(0);

  const maxReviews = Math.max(
    ...Object.keys(productDetails).map(function (key) {
      return productDetails[key].reviews || productDetails[key].ratings;
    })
  ).toFixed(0);

  const avgPrice = (
    Object.keys(productDetails)
      .map(function (key) {
        return productDetails[key].price;
      })
      .reduce((a, b) => a + b, 0) / productCount
  ).toFixed(2);
  // ignore sponsored products
  const minPrice = Math.min(
    ...Object.keys(productDetails).map(function (key) {
      return productDetails[key].price;
    })
  ).toFixed(2);

  const maxPrice = Math.max(
    ...Object.keys(productDetails).map(function (key) {
      return productDetails[key].price;
    })
  ).toFixed(2);

  const indSellers = Object.keys(productDetails).filter(function (key) {
    return (
      productDetails[key].seller.toLowerCase().indexOf("independently") !== -1
    );
  }).length;

  let score = 0;

  if (
    demandOpportunityData &&
    demandOpportunityData.data &&
    demandOpportunityData.data.niche_score
  ) {
    score = demandOpportunityData.data.niche_score;
  }

  let ScoreColor = "#ddd";
  if (score >= 87.6 && score <= 100) {
    ScoreColor = "#3dff2c";
  } else if (score >= 75.1 && score <= 87.5) {
    ScoreColor = "#48ff00";
  } else if (score >= 65.1 && score <= 87.5) {
    ScoreColor = "#48ff00";
  } else if (score >= 62.6 && score <= 75) {
    ScoreColor = "#aeff00";
  } else if (score >= 60.0 && score <= 65.0) {
    ScoreColor = "#aeff00";
  } else if (score >= 50.1 && score <= 62.5) {
    ScoreColor = "#f4ff00";
  } else if (score >= 50.1 && score <= 59.9) {
    ScoreColor = "#D5EA69";
  } else if (score >= 37.6 && score <= 50) {
    ScoreColor = "#f7f400";
  } else if (score >= 25.1 && score <= 37.5) {
    ScoreColor = "#ffc700";
  } else if (score >= 12.6 && score <= 25) {
    ScoreColor = "#ff7c00";
  } else if (score >= 0 && score <= 12.5) {
    ScoreColor = "#ff0002";
  }

  const tableData = {
    extensionId: chrome.runtime.id,
    totalResults: numberWithCommas(resNumber),
    firstPageResults: numberWithCommas(productDetails.length),
    indResults: indSellers,
    avgPrice: numberWithCommas(avgPrice),
    lowPrice: numberWithCommas(minPrice),
    highPrice: numberWithCommas(maxPrice),
    score: score,
    scoreColor: ScoreColor,
    avgBsr: numberWithCommas(avgBSR),
    lowBsr: numberWithCommas(minBSR),
    highBsr: numberWithCommas(maxBSR),
    avgReviews: numberWithCommas(avgReviews),
    lowReviews: numberWithCommas(minReviews),
    highReviews: numberWithCommas(maxReviews),
  };

  let demandScore = -1;
  let opportunityScore = -1;
  let isPaid = false;
  // check any of the data is undefined or not if yes then not paid
  if (
    demandOpportunityData &&
    demandOpportunityData.data &&
    demandOpportunityData.data.opportunityScore !== -1
  ) {
    // paid
    isPaid = true;
    demandScore = demandOpportunityData.data.demandScore;
    opportunityScore = demandOpportunityData.data.opportunityScore;
  } else if (
    demandOpportunityData &&
    demandOpportunityData.data &&
    demandOpportunityData.data.demandScore
  ) {
    // free
    demandScore = demandOpportunityData.data.demandScore;
  }

  const tableOld = `
  <table id="amazon-analysis-${
    chrome.runtime.id
  }" style="border-collapse: collapse; border: 2px solid white; color: black; text-align: center; font-size: 16px">
    <tbody>
      <tr style="border: 2px solid #E0D6FF; line-height: 30px">
        <td rowspan="2" style="border: 2px solid #E0D6FF; vertical-align: middle; background-color: #E0D6FF;">
          <div style="display: flex; align-items: center; justify-content: center">
            <img src="chrome-extension://${
              chrome.runtime.id
            }/assets/images/04.png" width="200px" />
          </div>
        </td>
        <td style="border: 2px solid #E0D6FF; background-color: #E0D6FF; text-align: left; vertical-align:top;">
        
  
          <div style="border: 2px solid rgb(130, 87, 254); border-radius: 10px; margin-left: 32px; width: 230px; text-align: center; display: flex; align-items: center">
            <span style="margin: 5px; margin-left: 40px">${score}</span>
            <span
              style="
                width: 20px;
                height: 20px;
                display: table;
                border-radius: 100px;
                margin: 5px;
              "
            ></span>
            <span
              style=" margin:5px;width: 20px; height: 20px; border-radius: 100px; background: ${ScoreColor}; line-height: 1.2; border: 2px solid #ddd; display: flex; align-items: center; justify-content: center; cursor: help"
              title="Keyword Niche Score Algorithm 2.0 – The higher the score, the better. It is recommend to find niches with a score of 60 and higher, but see what averages and scores works best for you. The lowest score I would be potentially interested in is 50 for a new product, but be careful. Always check first page results to confirm the niche for yourself. The score is just a guide. Once you find a niche you want to sell in, create a solid plan of how you will create a product to enter the niche, how you can be better than your competitors, what your starting price will be, your main keywords, and most importantly your title are going to use. Your design, your title, your keywords, description, price have to be right for you to have a chance to rank for your new niche. If you do not do a good job with that, you might never rank in your niche, or at least not for long. "
              >?</span
            >
            <span style="margin-left:5px">Loading...</span>
            </div>
        </td>
        <td style="text-align: left; border: 2px solid #E0D6FF; background-color: #E0D6FF;">
          <span style="font-weight: bold; margin-left: 5px">Number of Results</span>
  
          <div style="border: 2px solid rgb(130, 87, 254); border-radius: 10px; width: 185px; height: 40px; line-height: 40px; text-align: center">${numberWithCommas(
            resNumber
          )}</div>
        </td>
        <td style="text-align: left; border: 2px solid #E0D6FF; background-color: #E0D6FF;">
          <span style="font-weight: bold; margin-left: 5px">Average Price</span>
  
          <div style="border: 2px solid rgb(130, 87, 254); border-radius: 10px; width: 185px; height: 40px; line-height: 40px; text-align: center">${numberWithCommas(
            avgPrice
          )}</div>
        </td>
  
        <td style="text-align: left; border: 2px solid #E0D6FF; background-color: #E0D6FF;">
          <span style="font-weight: bold; margin-left: 5px">Help</span>
  
          <div style="border: 2px solid rgb(130, 87, 254); border-radius: 10px; width: 185px; height: 40px; line-height: 40px; text-align: center">
            <a href="https://www.facebook.com/groups/2690865597847008" target="_blank" style="color: black; display: block">
              <span>Join Facebook Group</span>
            </a>
          </div>
        </td>
        <td style="text-align: left; border: 2px solid #E0D6FF; background-color: #E0D6FF;">
          <span style="font-weight: bold; margin-left: 5px">Self Publishing Titans</span>
  
          <div style="border: 2px solid rgb(130, 87, 254); border-radius: 10px; width: 185px; height: 40px; line-height: 40px; text-align: center">
            <a href="https://selfpublishingtitans.com/" target="_blank" style="color: black; display: block">
              <span>More Free Tools</span>
            </a>
          </div>
        </td>
      </tr>
      <tr style="border: 2px solid white; line-height: 30px">
        <td style="border: 2px solid #E0D6FF; text-align: left; vertical-align: middle; background-color: #E0D6FF; display: flex; flex-direction: column; justify-content: center; align-items: center;">
          <span> <span style="font-weight: bold; font-size: 30px;padding-left: 10px;" class="${stylePrefix}-kdplogoword">Titans Quick View</span> </span>

          <button id="deep-view-btn" class="${stylePrefix}-mui-purple-btn ${stylePrefix}-deep-view-btn" style="margin-top: 12px">Titans Deep View</button>
          
        </td>
  
        <td style="text-align: left; border: 2px solid #E0D6FF; background-color: #E0D6FF">
          <span style="font-weight: bold; margin-left: 5px">Average BSR</span>
  
          <div style="border: 2px solid rgb(130, 87, 254); border-radius: 10px; width: 185px; height: 40px; line-height: 40px; text-align: center">${numberWithCommas(
            avgBSR
          )}</div>
        </td>
  
        <td style="text-align: left; border: 2px solid #E0D6FF; background-color: #E0D6FF;">
          <span style="font-weight: bold; margin-left: 5px">Average Reviews</span>
  
          <div style="border: 2px solid rgb(130, 87, 254); border-radius: 10px; width: 185px; height: 40px; line-height: 40px; text-align: center">${numberWithCommas(
            avgReviews
          )}</div>
        </td>
        <td style="text-align: left; border: 2px solid #E0D6FF; background-color: #E0D6FF;">
          <span style="font-weight: bold; margin-left: 5px">Download</span>
  
          <div style="border: 2px solid rgb(130, 87, 254); border-radius: 10px; width: 185px; height: 40px; line-height: 40px; text-align: center">
            <a
              href="javascript: void(0)"
              id="download_excel_file_${chrome.runtime.id}"
              style="color: white; display: block"
            >
              All 1st Page Data
            </a>
          </div>
        </td>
        <td style="text-align: left; border: 2px solid #E0D6FF; background-color: #E0D6FF;">
          <span style="font-weight: bold; margin-left: 5px">How To</span>
  
          <div style="background-color: red; border: 2px solid rgb(130, 87, 254); border-radius: 10px; width: 185px; height: 40px; line-height: 40px; text-align: center">
            <a href="https://www.youtube.com/channel/UCkOTYGNYxS6jq7JT3Fk5NEQ" target="_blank" style="color: white"> New Tutorial Video! </a>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  `;

  const table = `
    <table id="amazon-analysis-${
      chrome.runtime.id
    }" style="height: 170px; width: 100%; border-collapse: collapse; border: 2px solid #E0D6FF; color: black; text-align: center; font-size: 16px">
    <tbody>
      <tr style="border: 2px solid #E0D6FF; line-height: 30px">
        <td style="border: 2px solid #E0D6FF; text-align: left; vertical-align: middle; background-color: #E0D6FF; display: flex; flex-direction: column; justify-content: center; align-items: center;">
          <span> <span style="font-weight: bold; font-size: 30px;padding-left: 10px;" class="${stylePrefix}-kdplogoword">Titans Quick View</span> </span>

          <button id="deep-view-btn" class="${stylePrefix}-mui-purple-btn ${stylePrefix}-deep-view-btn" style="margin-top: 12px; outline: none; border: none;">Titans Deep View</button>
          
        </td>

        <td rowspan="2" class="${stylePrefix}-bsr-td">
          <span style="font-weight: bold; margin-left: 5px">Results</span>
<div class="${stylePrefix}-box-wrapper">
          <div class="${stylePrefix}-top-box" >
            <div class="${stylePrefix}-left-box" style="width:120px;">Total Results</div>
            <div>${tableData.totalResults}</div>
          </div>
          <div class="${stylePrefix}-inner-box" >
            <div class="${stylePrefix}-left-box" style="width:120px;">Exact Match</div>
            <div>${matchCounter}/${productCount}</div>
            <div id="counter-popup" style="display: inline-block;"></div>
          </div>
          <div class="${stylePrefix}-bottom-box" >
            <div class="${stylePrefix}-left-box" style="width:120px;">Ind. Published</div>
            <div>${tableData.indResults}</div>
          </div>
          </div>
        </td>
        <td rowspan="2" class="${stylePrefix}-bsr-td">
          <span style="font-weight: bold; margin-left: 5px; font-size: 95%;">Best Seller Rank</span>
<div class="${stylePrefix}-box-wrapper">
          <div class="${stylePrefix}-top-box" >
            <div class="${stylePrefix}-left-box">Average</div>
            <div>${tableData.avgBsr}</div>
          </div>
          <div class="${stylePrefix}-inner-box">
            <div class="${stylePrefix}-left-box">Low</div>
            <div>${tableData.lowBsr}</div>
          </div>
          <div class="${stylePrefix}-bottom-box">
            <div class="${stylePrefix}-left-box">High</div>
            <div>${tableData.highBsr}</div>
          </div>
          </div>
        </td>
        <td rowspan="2" class="${stylePrefix}-bsr-td">
          <span style="font-weight: bold; margin-left: 5px">Reviews</span>
<div class="${stylePrefix}-box-wrapper">
          <div class="${stylePrefix}-top-box">
            <div class="${stylePrefix}-left-box">Average</div>
            <div>${tableData.avgReviews}</div>
          </div>
          <div class="${stylePrefix}-inner-box">
            <div class="${stylePrefix}-left-box">Low</div>
            <div>${tableData.lowReviews}</div>
          </div>
          <div class="${stylePrefix}-bottom-box">
            <div class="${stylePrefix}-left-box">High</div>
            <div>${tableData.highReviews}</div>
          </div>
          </div>
        </td>
        <td rowspan="2" class="${stylePrefix}-bsr-td">
          <span style="font-weight: bold; margin-left: 5px">Price</span>
<div class="${stylePrefix}-box-wrapper">
          <div class="${stylePrefix}-top-box">
            <div class="${stylePrefix}-left-box">Average</div>
            <div>${tableData.avgPrice}</div>
          </div>
          <div class="${stylePrefix}-inner-box">
            <div class="${stylePrefix}-left-box">Low</div>
            <div>${tableData.lowPrice}</div>
          </div>
          <div class="${stylePrefix}-bottom-box">
            <div class="${stylePrefix}-left-box">High</div>
            <div>${tableData.highPrice}</div>
          </div>
          </div>
        </td>
        <td rowspan="2" class="${stylePrefix}-bsr-td">
          <span style="font-weight: bold; margin-left: 5px">Links</span>
<div class="${stylePrefix}-box-wrapper">
          <div class="${stylePrefix}-top-box" >
          ${
            isPaid == false
              ? `
     <a target="_blank" 
     style="color: black; margin-left: 4px;"
     href="https://chrome.google.com/webstore/detail/titans-pro-amazon-kdp-key/mmdamlknnafgffhlobhlmiljonijdnid/related" > Get Titans Pro
  
  </a>
     
     `
              : `<a href="https://www.selfpublishingtitans.com/pricing" target="_blank" style="margin-left: 4px; color: black;"> Titans Ultra </a>`
          }
            
          </div>

          <div class="${stylePrefix}-inner-box">
            <a href="https://www.facebook.com/groups/2690865597847008" target="_blank" style="margin-left: 4px; color: black;">
              <span>Join Facebook Group</span>
            </a>
          </div>

          <div class="${stylePrefix}-bottom-box">
            <a href="javascript: void(0)" id="download_excel_file_${
              chrome.runtime.id
            }" style="margin-left: 4px; color: black;"> Download 1st Page Data </a>
          </div>
          </div>
        </td>

        <td rowspan="2" style="padding-left: 10px; border: 2px solid #E0D6FF; vertical-align: middle; background-color: #E0D6FF;">
          <div style="min-width: 200px; display: flex; align-items: center; justify-content: center">
            <img src="chrome-extension://${
              chrome.runtime.id
            }/assets/images/04.png" width="200px" />
          </div>
        </td>
      </tr>
      <tr style="text-align: -webkit-center; border: 2px solid white; line-height: 30px">
        <td style="border: 2px solid #E0D6FF; background-color: #E0D6FF; vertical-align:top; min-width: 310px;">
  
  <div class="${stylePrefix}-card ${stylePrefix}-js-card" id="flipCard">
    <div class="${stylePrefix}-card__wrapper">

          <div class="${stylePrefix}-box-wrapper ${stylePrefix}-card__side ${
    isPaid ? `${stylePrefix}-card__side--back` : `${stylePrefix}-is-active`
  }" style="border: 2px solid rgb(130, 87, 254); width: fit-content; margin-top: 10px; border-radius: 10px; text-align: center; display: flex; align-items: center">
    <span style="margin-left: 5px">Niche Score:</span>
   
    <span class="${stylePrefix}-circle-icon" style="
                background: ${tableData.scoreColor};">
        ${tableData.score}
    </span>
    <div id="niche-popup"></div>
  
</div>

<div class="${stylePrefix}-box-wrapper ${stylePrefix}-card__side ${
    isPaid ? `${stylePrefix}-is-active` : `${stylePrefix}-card__side--back`
  }" style="border: 2px solid rgb(130, 87, 254); width: fit-content; margin-top: 10px; border-radius: 10px; text-align: center; display: flex; align-items: center">

    <span style="margin-left: 5px">Demand</span>

     ${
       demandScore !== -1
         ? `
     <span class="${stylePrefix}-circle-icon" style="
                background: ${demandOpportunityData.data.demandColor};">
        ${demandScore}
    </span>
    <div id="demand-popup"></div>
     `
         : `<div id="demand-popup"></div>`
     }

         <span style="margin-left: 5px">Opportunity</span>
   
    ${
      opportunityScore !== -1
        ? `
        <span class="${stylePrefix}-circle-icon" style="${
            isPaid ? "" : "filter: blur(4px);"
          }
                background: ${demandOpportunityData.data.opportunityColor};">
        ${opportunityScore}
    </span>
    
        `
        : `
        <div class="${stylePrefix}-tooltip">
        <span class="${stylePrefix}-circle-icon" style="filter: blur(4px); background: white;">
        ?
    </span>
    <span class="${stylePrefix}-tooltiptext">Upgrade to Titans Pro to see full analysis</span>
    </div>
    `
    }
    
    <div id="opportunity-popup"></div>
</div>

 </div>
 </div>
 
 <div>
     <button id="flipButton"
     class="${stylePrefix}-text-btn"
     style="color: black;"
     >
     ${isPaid ? "See Niche Score Analysis" : "See Titans Pro Analysis"} 
     </b>
      </div>
        </td>
      </tr>
    </tbody>
  </table>


	`;

  const wrapper = document.createElement("div");
  wrapper.style.cssText = "height: 190px; background: #E0D6FF;";
  chrome.storage.local.get(["version"], function (item) {
    if (item.version === 2) {
      wrapper.innerHTML = tableOld;
    } else if (item.version === 3) {
      wrapper.innerHTML = table;
    }
    let opportunityText = `
    The opportunity scoring analysis is meant to help guide you to see if the niche might be good and worthwhile for you. The higher the number the better it might be. Opportunity would also be an indication of how worthwhile the niche is and how easy it might be to rank on page 1 on Amazon for the keyword. 0 would be the lowest and 9 the highest. 
    `;
    addPopUp("opportunity-popup", opportunityText);
    const demandText = `The demand scoring analysis is an indication of how in demand a niche might be. 0 would be the lowest and 9 the highest. If a demand has a score of 1 or 2 for example, one does not necessarily have to shy away from it. Small niches can be wonderful too and make you sales. Of the two scoring systems, the opportunity score will be the most important one when choosing a niche for your book or product.`;
    addPopUp("demand-popup", demandText);
    const nicheText = `Keyword Niche Score Algorithm 2.0 – The higher the score, the better. It is recommend to find niches with a score of 60 and higher, but see what averages and scores works best for you. The lowest score I would be potentially interested in is 50 for a new product, but be careful. Always check first page results to confirm the niche for yourself. The score is just a guide. Once you find a niche you want to sell in, create a solid plan of how you will create a product to enter the niche, how you can be better than your competitors, what your starting price will be, your main keywords, and most importantly your title are going to use. Your design, your title, your keywords, description, price have to be right for you to have a chance to rank for your new niche. If you do not do a good job with that, you might never rank in your niche, or at least not for long.`;
    addPopUp("niche-popup", nicheText);
    addPopUp(
      "counter-popup",
      "This is a Titans Quick View feature. It shows you the amount of exact matches from your keyword search in product titles on this search results page",
      "display: inline-block; margin-left: 5px; height: 20px; width: 20px"
    );

    let cardTransitionTime = 500;

    let $card = $(`.${stylePrefix}-js-card`);
    let switching = false;

    $("#flipButton").click(flipCard);

    var isTextChanged = false;

    function changeText() {
      if (isTextChanged) {
        $("#flipButton").html(
          isPaid ? "See Niche Score Analysis" : "See Titans Pro Analysis"
        );

        isTextChanged = false;
      } else {
        $("#flipButton").html(
          isPaid ? "See Titans Pro Analysis" : "See Niche Score Analysis"
        );
        isTextChanged = true;
      }
    }

    function flipCard() {
      changeText();
      if (switching) {
        // change the button text
        return false;
      }

      switching = true;

      $card.toggleClass(`${stylePrefix}-is-switched`);
      setTimeout(function () {
        $card.children().children().toggleClass(`${stylePrefix}-is-active`);
        switching = false;
      }, cardTransitionTime / 2);
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
  nav.after(wrapper);
  nav.style.height = "auto";

  setTimeout(function () {
    $("#download_excel_file_" + chrome.runtime.id).click(function () {
      createExcelFile(productDetails);
    });
  }, 200);
}
