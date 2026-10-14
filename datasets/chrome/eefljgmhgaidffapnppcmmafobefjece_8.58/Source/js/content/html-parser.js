"use strict";

function splittedBsrText(text) {
  let splittedData = text.split(" in ");
  // remove first element if it does not contain a number
  if (!splittedData[0].match(/\d+/)) {
    splittedData.shift();
  }
  if (splittedData.length <= 1) {
    // Clasificación en los más vendidos de Amazon: nº1 en Libros sobre Kwanzaa para niños amazon.es
    if (text.includes("Clasificación en los más vendidos de Amazon:")) {
      // then skip the first part
      splittedData = text.split(":");
      if (splittedData.length > 1) {
        splittedData = splittedData[1].split(" en ");
      } else {
        splittedData = text.split(" en ");
      }
    } else {
      splittedData = text.split(" en ");
    }
  }

  if (splittedData.length <= 1) {
    splittedData = text.split(" w kategorii ");
  }

  if (splittedData.length <= 1) {
    splittedData = text.split(" in der ");
  }

  if (splittedData.length <= 1) {
    splittedData = text.split(" i ");
  }

  // Handle Turkish format: "Şu kategoride 69. sırada: Çapraz Bulmacalar"
  if (splittedData.length <= 1) {
    splittedData = text.split(" sırada: ");
  }

  return splittedData;
}

function getCategoryFromTop100Text(text) {
  const splitters = [" in ", " en ", " w ", " i ", " dans ", " sırada: "];
  let category = text;
  if (text.includes("100")) {
    for (const splitter of splitters) {
      if (text.includes(splitter)) {
        category = text.split(splitter)[1];
        break;
      }
    }
  }

  return category;
}

function containsBracketed100(text) {
  const regex = /\([^)]*100[^)]*\)/;
  return regex.test(text);
}

function getBsrNumber(type, parsed, selectors, siteLang) {
  let bsr = null;
  let bsrMatches = [];

  selectors.bsr[siteLang][type].forEach((selector) => {
    const element = parsed.find(selector);
    if (element.length > 0) {
      // First, try to get the main BSR from direct text content (excluding nested lists)
      const directText = element
        .clone()
        .children("ul, ol")
        .remove()
        .end()
        .text();
      if (directText) {
        // Look for numbers with separators first (main BSR is often formatted)
        const separatedMatch = directText.match(/\b\d{1,3}(?:[,\s.]\d{3})+\b/);
        if (separatedMatch) {
          const rank = parseInt(separatedMatch[0].replace(/[,\s.]/g, ""), 10);
          bsrMatches.push(rank);
          return; // Found main BSR, skip looking for others in this element
        }

        // Look for simple numbers in direct text
        const simpleMatch = directText.match(/\b\d+\b/);
        if (simpleMatch) {
          const rank = parseInt(simpleMatch[0], 10);
          bsrMatches.push(rank);
          return; // Found main BSR, skip looking for others in this element
        }
      }

      // Fallback: If no direct BSR found, use the full text (including nested elements)
      const fullText = element.text();
      if (fullText) {
        // Find all potential BSR numbers in the text
        const allNumberMatches = [];

        // First, capture numbers with separators (1,234 or 134 029 or 1.234)
        const separatedMatches = fullText.match(/\b\d{1,3}(?:[,\s.]\d{3})+\b/g);
        if (separatedMatches) {
          separatedMatches.forEach((match) => {
            const rank = parseInt(match.replace(/[,\s.]/g, ""), 10);
            allNumberMatches.push(rank);
          });
        }

        // Then, capture simple numbers (157, 1234, etc.) but exclude parts of separated numbers
        const simpleMatches = fullText.match(/\b\d+\b/g);
        if (simpleMatches) {
          simpleMatches.forEach((match) => {
            const rank = parseInt(match, 10);
            // Check if this number is part of a separated number we already captured
            let isPartOfSeparated = false;
            if (separatedMatches) {
              isPartOfSeparated = separatedMatches.some((sepMatch) => {
                const cleanSepMatch = sepMatch.replace(/[,\s.]/g, "");
                // Check if the simple number is the same as the cleaned separated number
                if (cleanSepMatch === match) return true;

                // Check if the simple number appears as a segment in the separated number
                const segments = sepMatch.split(/[,\s.]/);
                return segments.includes(match);
              });
            }

            if (!isPartOfSeparated) {
              allNumberMatches.push(rank);
            }
          });
        }

        // Add all valid numbers to bsrMatches, but prioritize the first/largest
        if (allNumberMatches.length > 0) {
          // Take the first (and typically largest) BSR number found
          bsrMatches.push(allNumberMatches[0]);
        }
      }
    }
  });

  if (bsrMatches.length > 0) {
    // Take the first BSR found (prioritizes main BSR over sub-categories)
    bsr = bsrMatches[0];
  } else {
    bsr = null;
  }

  // check if bsr is not null or undefined or 0 then return bsr
  if (bsr) {
    return bsr;
  }

  if (type === "list") {
    if (!bsr) {
      selectors.bsr[siteLang][type].forEach((selector) => {
        if (
          parsed.find(selector).text() !== null &&
          parsed.find(selector).text() !== ""
        ) {
          const text = parsed.find(selector).text().trim();

          // Try to match space-separated, comma-separated, or dot-separated numbers first
          if (!bsr) bsr = text.match(/\d{1,3}(?:[,\s.]\d{3})+/);
          if (!bsr)
            bsr = text.match(/\d+((.|,|\s)\d+)+((.|,|\s)\d+)+((.|,|\s)\d+)?/);
          if (!bsr) bsr = text.match(/\d+((.|,|\s)\d+)?/);
          if (!bsr) bsr = text.match(/\d+/);
        }
      });

      if (Array.isArray(bsr)) {
        bsr = bsr[0];
      }
    }
  } else {
    selectors.bsr[siteLang]["table"].forEach((selector) => {
      if (
        parsed.find(selector).next("td").text() !== null &&
        parsed.find(selector).next("td").text() !== ""
      ) {
        const tableText = parsed.find(selector).next("td").text();

        // Try to match space-separated, comma-separated, or dot-separated numbers first
        bsr = tableText.match(/\d{1,3}(?:[,\s.]\d{3})+/);

        if (!bsr)
          bsr = tableText.match(
            /\d+((.|,|\s)\d+)+((.|,|\s)\d+)+((.|,|\s)\d+)?/
          );

        if (!bsr) bsr = tableText.match(/\d+((.|,|\s)\d+)?/);
      }
    });
    if (Array.isArray(bsr)) {
      bsr = bsr[0];
    }
  }

  if (bsr && typeof bsr === "string") {
    bsr = bsr.replaceAll(",", "");
    bsr = bsr.replaceAll(".", "");
    bsr = bsr.replaceAll(/\s/g, "");
    bsr = parseFloat(bsr);
  }

  if (Number.isNaN(bsr)) {
    bsr = 0;
  }

  return bsr;
}

function getProductDimensionsFromList(parsed, selectors, siteLang) {
  if (!siteLang) {
    return "";
  }
  let productDimensions = "";
  try {
    selectors.productDimensions[siteLang]["list"].forEach((selector) => {
      const element = parsed.find(selector);
      if (element.length > 0) {
        productDimensions = element.text().trim();
      }
    });
    if (!productDimensions) {
      productDimensions = parsed
        .find(selectors.size[siteLang]["list"])
        .next("span")
        .text();
    }
    if (productDimensions) {
      productDimensions = extractSize(productDimensions);
    }
  } catch (error) {
    console.log(error);
  }

  return productDimensions;
}

function getProductDimensionsFromTable(parsed, selectors, siteLang) {
  let productDimensions = "";
  try {
    selectors.productDimensions[siteLang]["table"].forEach((selector) => {
      const element = parsed.find(selector);
      if (element.length > 0) {
        productDimensions = element.text().trim();
      }
    });
    if (!productDimensions) {
      productDimensions = parsed
        .find(selectors.size[siteLang]["table"])
        .next("td")
        .text();
    }
    if (productDimensions) {
      productDimensions = extractSize(productDimensions);
    }
  } catch (error) {
    console.log(error);
  }
  return productDimensions;
}

function getPageCountFromList(parsed, selectors, siteLang) {
  let pageCount = 0;
  selectors.printLength[siteLang]["list"].forEach((selector) => {
    const element = parsed.find(selector);
    if (element.length > 0) {
      pageCount = element.text().trim();
    }
  });
  if (pageCount) {
    pageCount = extractPageCount(pageCount);
  }
  return pageCount;
}

function getPageCountFromTable(parsed, selectors, siteLang) {
  let pageCount = 0;
  selectors.printLength[siteLang]["table"].forEach((selector) => {
    const element = parsed.find(selector);
    if (element.length > 0) {
      pageCount = element.text().trim();
    }
  });
  if (pageCount) {
    pageCount = extractPageCount(pageCount);
  }
  return pageCount;
}

function extractPrice(raw) {
  const match = raw.match(
    /([\d.,]+)\s*([€$£]|USD|GBP|EUR)?|([€$£]|USD|GBP|EUR)\s*([\d.,]+)/
  );

  let numberStr = "";
  if (match) {
    // EU style (e.g., "15,99 €")
    if (match[1]) numberStr = match[1];
    // US/UK style (e.g., "$9.99")
    else if (match[4]) numberStr = match[4];
  } else {
    return 0;
  }

  // Normalize number (assumes comma is decimal if no dot present)
  if (numberStr.includes(",") && !numberStr.includes(".")) {
    numberStr = numberStr.replace(",", ".");
  }

  // Remove any thousand separators
  numberStr = numberStr.replace(/[, ](?=\d{3}\b)/g, "");

  return parseFloat(numberStr);
}

function extractSize(raw) {
  const match = raw.match(/(\d+(\.\d+)?\s*x\s*){2}\d+(\.\d+)?/);
  return match ? match[0].trim() : "";
}

function extractPageCount(raw) {
  const match = raw.match(
    /(\d+)\s*(pages|Seiten|páginas|pagine|sidor|pagina's)/i
  );
  return match ? parseInt(match[1], 10) : 0;
}

function cleanRankValue(rank) {
  // remove all non-numeric characters
  rank = rank.replace(/[^0-9]/g, "");

  // add hash before the rank
  rank = "#" + parseInt(rank).toLocaleString();
  return rank;
}

function getBookBSRNotFound(siteLang) {
  let bookLabel = "Books";
  let message = "BSR not provided by Amazon";

  if (siteLang === "english" || siteLang === "canadian") {
    bookLabel = "Books";
    message = "Rank not provided by Amazon";
  } else if (siteLang === "estonian") {
    bookLabel = "Raamatud";
    message = "Amazon ei paku edetabelit";
  } else if (siteLang === "italian") {
    bookLabel = "Libri";
    message = "Classifica non fornita da Amazon";
  } else if (siteLang === "german") {
    bookLabel = "Bücher";
    message = "Rangliste nicht von Amazon bereitgestellt";
  } else if (siteLang === "french") {
    bookLabel = "Livres";
    message = "Classement non fourni par Amazon";
  } else if (siteLang === "spanish") {
    bookLabel = "Libros";
    message = "Clasificación no proporcionada por Amazon";
  } else if (siteLang === "portuguese") {
    bookLabel = "Livros";
    message = "Classificação não fornecida pela Amazon";
  } else if (siteLang === "turkish") {
    bookLabel = "Kitaplar";
    message = "Sıralama Amazon tarafından sağlanmadı";
  } else if (siteLang === "dutch") {
    bookLabel = "Boeken";
    message = "Ranglijst niet verstrekt door Amazon";
  } else if (siteLang === "arabic") {
    bookLabel = "الكتب";
    message = "الترتيب غير مقدم من أمازون";
  } else if (siteLang === "polish") {
    bookLabel = "Książki";
    message = "Ranking nieudostępniony przez Amazon";
  } else if (siteLang === "swedish") {
    bookLabel = "Böcker";
    message = "Rankning tillhandahålls inte av Amazon";
  }

  const html = `<div class="${stylePrefix}-prod-list-items">
              <div style="display: contents;">
              <a
              href="${hostname}/gp/bestsellers/books/ref=pd_zg_ts_books"
              class="${stylePrefix}-list-items-a"
              >
              ${bookLabel}
              </a>
              </div>
              ${" "} ${message}
              </div>`;

  return html;
}

// No ranking yet
function getNoRankingYet(siteLang) {
  let message = "";

  if (siteLang === "english" || siteLang === "canadian") {
    message = "No ranking yet";
  } else if (siteLang === "estonian") {
    message = "Veel pole edetabelit";
  } else if (siteLang === "italian") {
    message = "Nessuna classifica al momento";
  } else if (siteLang === "german") {
    message = "Noch kein Ranking vorhanden";
  } else if (siteLang === "french") {
    message = "Pas encore de classement";
  } else if (siteLang === "spanish") {
    message = "Aún no hay clasificación";
  } else if (siteLang === "portuguese") {
    message = "Ainda sem classificação";
  } else if (siteLang === "turkish") {
    message = "Henüz bir sıralama yok";
  } else if (siteLang === "dutch") {
    message = "Nog geen ranglijst beschikbaar";
  } else if (siteLang === "arabic") {
    message = "لا يوجد ترتيب بعد";
  } else if (siteLang === "polish") {
    message = "Brak rankingu na razie";
  } else if (siteLang === "swedish") {
    message = "Ingen rankning ännu";
  } else {
    message = "No ranking yet";
  }

  const html = `<div class="${stylePrefix}-prod-list-items">
              <div style="display: contents;">
              ${message}
              </div>
              </div>`;
  return html;
}

function detectEBookFormat() {
  // if document contains .ebooks class and #dp
  const dp = document.querySelector("#dp");
  if (dp && dp.classList.contains("ebooks")) {
    return "ebook";
  } else {
    return "paperback";
  }
}

/**
 * Parse english content
 * @param {*} html
 */
async function parseProductHTML(html) {
  const siteLang = validDomains[hostname];
  html = html.replace(/<img[^>]*>/g, "");
  const parsed = $(html);
  const title = parsed.find(selectors.title[siteLang]).text().trim();
  // Get product details
  let itemWeight = 0;
  let bsr = 0;
  let bsrHTML = [];
  let paperback = 0;
  let isbn10 = 0;
  let seller = "";
  let ratings = 0;
  let productDimensions = "";
  let authorsNode = null;
  let authors = [];
  let pageCount = 0;
  let hasMainBsr = false;

  let productDetailsDom = getProductDetailsDom(parsed);
  productDimensions = getProductDimensionsFromList(parsed, selectors, siteLang);
  pageCount = getPageCountFromList(parsed, selectors, siteLang);
  if (!pageCount) {
    pageCount = getPageCountFromTable(parsed, selectors, siteLang);
  }
  const isListLayout =
    parsed.find("#detailBulletsWrapper_feature_div").length ||
    parsed.find("#productDetailsTable").length;
  // Determine product details layout
  if (isListLayout) {
    // Get product details
    itemWeight = parsed
      .find(selectors.itemWeight[siteLang]["list"])
      .text()
      .match(/\d+((.|,)\d+)?/);
    if (Array.isArray(itemWeight)) {
      itemWeight = itemWeight[0];
    }

    bsr = getBsrNumber("list", parsed, selectors, siteLang);

    // Get bsr html
    bsrHTML = [];
    let resultList = [];
    // {
    //   rank: "",
    //   category: "",
    //   link: ""
    // }
    selectors.bsrHTML[siteLang]["list"].forEach((selector) => {
      const element = parsed.find(selector);
      const htmlContent = element.html();

      // Check if the HTML content is valid and not empty
      if (htmlContent) {
        // If the content starts with a <li> tag
        // sub bsr
        if (htmlContent.trim().startsWith("<li>")) {
          element.find("li").each(function () {
            const content = $(this).find("span.a-list-item").text().trim();

            const splittedData = splittedBsrText(content);
            const rank = splittedData[0].trim();
            const category = splittedData.slice(1).join(" in ").trim();

            // Extract the URL within the <a> tag
            const link = $(this).find("a").attr("href");

            if (containsBracketed100(content)) {
              hasMainBsr = true;
            }

            // Push the extracted data into the resultList array
            resultList.push({ content, rank, category, link });
          });
        } else {
          const content = element.text().trim();
          const splittedData = splittedBsrText(content);
          let rank = splittedData[0].trim();

          // Extract only numbers from the rank string (handle space, comma, dot separators)
          const rankMatch =
            rank.match(/\d{1,3}(?:[,\s.]\d{3})+/) ||
            rank.match(/\d+((.|,|\s)\d+)+((.|,|\s)\d+)+((.|,|\s)\d+)?/);
          rank = Array.isArray(rankMatch) ? rankMatch[0] : rank;

          // category is the fist <a> tag text

          let category = element.find("a").first().text().trim();
          category = getCategoryFromTop100Text(category);

          // Extract the URL within the <a> tag
          const link = element.find("a").attr("href");

          // Include both main BSR and sub-categories
          // Main BSR typically contains these patterns: "See Top", "En Popüler 100", "Top 100", etc.
          // Sub-categories are everything else
          if (containsBracketed100(content)) {
            hasMainBsr = true;
          }
          resultList.push({ content, rank, category, link });
        }
      }
    });

    resultList.forEach((value, idx) => {
      if (value.rank && value.category && value.link) {
        let contentDiv = `
              <div class="${stylePrefix}-prod-list-items">
              <div style="display: contents;">
              <a
              href="${value.link}"
              class="${stylePrefix}-list-items-a"
              >
              ${value.category}
              </a>
              </div>
              ${" "} ${cleanRankValue(value.rank)}
              </div>
              `;

        bsrHTML.push(contentDiv);
      }
    });
    if (bsrHTML.length) {
      bsrHTML = bsrHTML.join("");
    }

    paperback = parsed
      .find(selectors.paperback[siteLang]["list"])
      .text()
      .match(/\d+((.|,)\d+)?/);
    if (Array.isArray(paperback)) {
      paperback = paperback[0];
    }

    isbn10 = parsed
      .find(selectors.isbn10[siteLang]["list"])
      .next("span")
      .text()
      .match(/\d+((.|,)\d+)?/);
    if (!isbn10) {
      isbn10 = parsed
        .find(selectors.asin[siteLang]["list"])
        .next("span")
        .text()
        .trim();
    }
    if (Array.isArray(isbn10)) {
      isbn10 = isbn10[0];
    }

    for (const element of selectors.publisher[siteLang]["list"]) {
      if (parsed.find(element).next("span").text()) {
        seller = parsed.find(element).next("span").text();
      }

      if (seller && seller.length > 0) {
        break;
      }
    }

    try {
      const ratingsDom = parsed.find(selectors.ratings[siteLang]["list"]);
      if (ratingsDom.length > 0) {
        ratings = ratingsDom
          .first()
          .text()
          .match(/\d+((.|,)\d+)?/);
      }
    } catch (error) {
      console.error(error, title);
    }

    if (!ratings) {
      try {
        const ratingsDom = parsed.find(selectors.ratings[siteLang]["table"]);
        if (ratingsDom.length > 0) {
          ratings = ratingsDom
            .first()
            .next("td")
            .text()
            .match(/\d+((.|,)\d+)?/);
        }
      } catch (error) {
        console.error(error, title);
      }
    }

    if (!ratings) {
      try {
        const ratingsDom = parsed.find(selectors.ratings[siteLang]["table"]);
        if (ratingsDom.length > 0) {
          ratings = ratingsDom
            .fist()
            .text()
            .match(/\d+((.|,)\d+)?/);
        }
      } catch (error) {
        console.error(error, title);
      }
    }
    if (Array.isArray(ratings)) {
      ratings = ratings[0];
    }

    authorsNode = parsed.find(
      selectors.authorsNode[siteLang]["list"] + " a.contributorNameID"
    );
    if (authorsNode.length <= 0) {
      authorsNode = parsed.find(selectors.authorsNode[siteLang]["list"] + " a");
    }
    authors = [];
    for (const element of authorsNode) {
      authors.push(element.innerText.trim().replace(/,/g, ""));
    }
  }

  if (
    parsed.find("#productDetails_feature_div").length ||
    parsed.find("#prodDetails").length ||
    parsed.find("#audibleProductDetails").length ||
    parsed.find("#detailBullets_feature_div").length ||
    parsed.find("#productDetails_detailBullets_sections1").length
  ) {
    // Get product details
    itemWeight = parsed
      .find(selectors.itemWeight[siteLang]["table"])
      .next("td")
      .text()
      .match(/\d+((.|,)\d+)?/);
    if (Array.isArray(itemWeight)) {
      itemWeight = itemWeight[0];
    }

    if (!bsr) {
      bsr = getBsrNumber("table", parsed, selectors, siteLang);
    }

    if (bsrHTML.length == 0) {
      let resultList2 = [];
      selectors.bsrHTML[siteLang]["table"].forEach((selector) => {
        if (
          parsed.find(selector).next("td").html() !== null &&
          parsed.find(selector).next("td").html() !== undefined
        ) {
          // selector ignore spaces
          parsed
            .find(selector)
            .next("td")
            .each(function () {
              $(this)
                .find("span")
                .each(function () {
                  let content = $(this).text().trim();
                  let splittedData = splittedBsrText(content);
                  if (splittedData.length > 1) {
                    let rank = splittedData[0].trim();
                    let category = splittedData.splice(1).join(" in ").trim();

                    if (category.includes("Top 100")) {
                      category = category.split("(")[0].trim();
                    }
                    if (containsBracketed100(content)) {
                      hasMainBsr = true;
                    }

                    // Extract the URL within <a> tag
                    let link = $(this).find("a").attr("href");
                    // Push the extracted data into the resultList array
                    resultList2.push({ content, rank, category, link });
                  }
                });
            });
        }
      });

      // remove duplicates
      resultList2 = resultList2.filter(
        (v, i, a) => a.findIndex((t) => t.category === v.category) === i
      );

      resultList2.forEach((value, idx) => {
        let contentDiv = `
                <div class="${stylePrefix}-prod-list-items">
                <div style="display: contents;">
                <a
                href="${value.link}"
                class="${stylePrefix}-list-items-a"
                >
                ${value.category}
                </a>
                </div>
                ${" "} ${cleanRankValue(value.rank)}
                </div>
                `;

        bsrHTML.push(contentDiv);
      });
      if (bsrHTML.length) {
        bsrHTML = bsrHTML.join("");
      }
    }

    paperback = parsed
      .find(selectors.paperback[siteLang]["table"])
      .next("td")
      .text()
      .match(/\d+((.|,)\d+)?/);
    if (Array.isArray(paperback)) {
      paperback = paperback[0];
    }

    isbn10 = parsed
      .find(selectors.isbn10[siteLang]["table"])
      .next("td")
      .text()
      .match(/\d+((.|,)\d+)?/);
    if (!isbn10) {
      selectors.asin[siteLang]["table"].forEach((selector) => {
        if (
          parsed.find(selector).next("td").html() !== null &&
          parsed.find(selector).next("td").html() !== undefined
        ) {
          isbn10 = parsed.find(selector).next("td").text().trim();
        }
      });
    }
    if (Array.isArray(isbn10)) {
      isbn10 = isbn10[0];
    }

    if (seller == "" || seller == undefined || seller == null) {
      for (const element of selectors.publisher[siteLang]["table"]) {
        if (parsed.find(element).next("td").text()) {
          seller = parsed.find(element).next("td").text();
        }

        if (seller && seller.length > 0) {
          break;
        }
      }
    }

    if (!productDimensions) {
      productDimensions = getProductDimensionsFromTable(
        parsed,
        selectors,
        siteLang
      );
    }

    authorsNode = parsed.find(
      selectors.authorsNode[siteLang]["table"] + " a.contributorNameID"
    );
    if (authorsNode.length <= 0) {
      authorsNode = parsed.find(
        selectors.authorsNode[siteLang]["table"] + " a"
      );
    }
    authors = [];
    for (const element of authorsNode) {
      authors.push(element.innerText.trim().replace(/,/g, ""));
    }
  }

  // Get price
  let price = 0;
  price = $("#tmm-grid-swatch-PAPERBACK .slot-price span").attr("aria-label");
  if (!price) {
    const priceStr = parsed.find("span.a-color-price").attr("aria-label");
    if (priceStr) {
      price = priceStr;
    }
  }

  if (!price) {
    const fullLabel = $(".slot-price span").attr("aria-label"); // "from $9.99"
    console.log({ fullLabel });
    if (fullLabel) {
      price = fullLabel.match(/\$[\d.,]+/)[0]; // "$9.99"
    }
  }

  const paperbackPrice = parsed.find(selectors.paperbackPrice[siteLang]).text();

  const kindlePrice = parsed.find(selectors.kindlePrice[siteLang]).text();

  const spiralBoundPrice = parsed
    .find(selectors.spiralBoundPrice[siteLang])
    .text();

  const hardcoverPrice = parsed.find(selectors.hardcoverPrice[siteLang]).text();

  const mp3Price = parsed.find(selectors.mp3Price[siteLang]).text();

  const audiobookPrice = parsed.find(selectors.audiobookPrice[siteLang]).text();

  const insideBoxPrice = parsed.find(selectors.insideBoxPrice[siteLang]).text();

  const otherPrice = parsed.find(selectors.otherPrice[siteLang]).text();

  if (paperbackPrice !== null && !price) {
    price = paperbackPrice;
  } else if (kindlePrice !== null && !price) {
    price = kindlePrice;
  } else if (spiralBoundPrice !== null && !price) {
    price = spiralBoundPrice;
  } else if (hardcoverPrice !== null && !price) {
    price = hardcoverPrice;
  } else if (mp3Price !== null && !price) {
    price = mp3Price;
  } else if (audiobookPrice !== null && !price) {
    price = audiobookPrice;
  } else if (insideBoxPrice !== null && !price) {
    price = insideBoxPrice;
  } else if (otherPrice !== null && !price) {
    price = otherPrice;
  }

  if (Array.isArray(price)) {
    price = price[0];
  }

  const currencyDelimiterString = currencyDelimiter[hostname];

  //"category":[{"type":"selector","value":"div[data-feature-name=\'wayfinding-breadcrumbs\'] > ul > li:nth-child(1) > span > a","next":{"type":"element","value":0,"next":{"type":"property","value":"textContent","next":{"type":"function","value":"trim"}}}},{"type":"selector","value":"#searchDropdownBox","next":{"type":"element","value":0,"next":{"type":"property","value":"selectedOptions","next":{"type":"element","value":0,"next":{"type":"property","value":"textContent"}}}}},{"type":"selector","value":"#nav-subnav a","next":{"type":"element","value":0,"next":{"type":"selector","value":"span.nav-a-content","next":{"type":"element","value":0,"next":{"type":"property","value":"textContent","next":{"type":"function","value":"trim"}}}}}}]}
  let category = "";
  let categoryUrl = "";
  // get category from the bsrHTML first element
  if (bsrHTML.length) {
    category = $(bsrHTML)
      .find(`.${stylePrefix}-list-items-a`)
      .first()
      .text()
      .trim();
    categoryUrl = $(bsrHTML)
      .find(`.${stylePrefix}-list-items-a`)
      .first()
      .attr("href");
  }
  if (category == "" || category == undefined || category == null) {
    category = parsed
      .find(
        "div[data-feature-name='wayfinding-breadcrumbs'] > ul > li:nth-child(1) > span > a"
      )
      .text()
      .trim();
  }
  if (category == "" || category == undefined || category == null) {
    category = parsed.find("[data-category]").first().attr("data-category");
  }
  if (category == "" || category == undefined || category == null) {
    category = parsed
      .find("#searchDropdownBox")
      .find(":selected")
      .text()
      .trim();
  }
  if (category == "" || category == undefined || category == null) {
    category = parsed.find("#nav-subnav a").first().text().trim();
  }

  if (categoryUrl == "" || categoryUrl == undefined || categoryUrl == null) {
    categoryUrl = parsed
      .find(
        "div[data-feature-name='wayfinding-breadcrumbs'] > ul > li:nth-child(1) > span > a"
      )
      .attr("href");
  }

  if (categoryUrl == "" || categoryUrl == undefined || categoryUrl == null) {
    categoryUrl = "";
  }

  if (price) {
    price = extractPrice(price);
  }

  if (!hasMainBsr) {
    if (bsrHTML && bsrHTML.length) {
      // insert the not found html at the top of the bsrHTML
      bsrHTML = getBookBSRNotFound(siteLang) + bsrHTML;
    } else {
      bsrHTML = getNoRankingYet(siteLang);
    }
  }

  const fmt = detectEBookFormat();

  return {
    title: title,
    format: fmt,
    authors: authors.join("-"),
    itemWeight: itemWeight ? itemWeight : 0,
    bsr: bsr,
    bsrHTML: bsrHTML,
    paperback: paperback ? paperback.replace(",", "").replace(".", "") : "",
    isbn10: isbn10 ? isbn10.replace(/,/g, "") : "",
    seller: seller,
    size: productDimensions,
    ratings: ratings ? parseInt(ratings.replace(",", "").replace(".", "")) : 0,
    price: accounting.unformat(price, currencyDelimiterString),
    productDetailsDom: productDetailsDom,
    category: category,
    categoryUrl: categoryUrl,
    page_count: pageCount,
    hasMainBsr: hasMainBsr,
  };
}
function getProductDetailsDom(parsed) {
  let productDetailsDom = parsed.find("#detailBulletsWrapper_feature_div");
  if (productDetailsDom.length <= 0) {
    productDetailsDom = parsed.find("#productDetailsTable");
  }

  if (productDetailsDom.length <= 0) {
    productDetailsDom = parsed.find("#prodDetails");
  }

  if (productDetailsDom.length <= 0) {
    productDetailsDom = parsed.find("#productDetails_feature_div");
  }

  if (productDetailsDom.length <= 0) {
    productDetailsDom = parsed.find("#detailBullets_feature_div");
  }

  if (productDetailsDom.length <= 0) {
    productDetailsDom = parsed.find("#audibleProductDetails");
  }

  productDetailsDom.find("hr").remove();

  // remove first h2 tag
  productDetailsDom.find("h2").first().remove();

  // remove parent element containing "Warranty & Support"
  productDetailsDom.find("h1:contains('Warranty & Support')").parent().remove();

  const prodHeaderHtml = `
  
  <img src="chrome-extension://${chrome.runtime.id}/assets/images/04.png" alt="" width="30px" height="24px">
  <h2>Product Details</h2>
  `;
  // get first element and create a flex div and add the product details
  const productCardHeader = document.createElement("div");
  productCardHeader.classList.add(`${stylePrefix}-productCardHeader`);
  productCardHeader.style = "display: flex; align-items: center; gap: 8px;";
  productCardHeader.innerHTML = prodHeaderHtml;
  productDetailsDom.prepend(productCardHeader);

  // set width=100% to .a-span6 class in productDetailsDom
  productDetailsDom.find(".a-span6").css("width", "100%");
  return productDetailsDom;
}
