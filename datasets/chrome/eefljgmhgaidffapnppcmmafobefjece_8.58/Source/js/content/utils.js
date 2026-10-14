"use strict";

/**
 * Separate number with commas
 * @param {*} num
 */
function numberWithCommas(num) {
  if (num) return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return num;
}


// [ 1: com | 2: co.uk 87 | 3: de | 4: fr | 5: co.jp | 6: ca | 8: it | 9: es | 10: in | 11: com.mx ]
const domainValues = {
  "amazon.com": 1,
  "amazon.co.uk": 2,
  "amazon.de": 3,
  "amazon.fr": 4,
  "amazon.co.jp": 5,
  "amazon.ca": 6,
  "amazon.it": 8,
  "amazon.es": 9,
  "amazon.in": 10,
  "amazon.com.mx": 11,
};

const getDomainValue = (domain) => {
  domain = domain.toLowerCase();
  domain = domain.replace("www.", "");

  if (domainValues.hasOwnProperty(domain)) {
    return domainValues[domain];
  }
  return 1;
};

const getDailySalesFromMonthly = (monthlySales) => {
  const dailySales = parseInt(parseInt(monthlySales) / 30) || 0;
  if (dailySales < 1) return "<1";
  return numberWithCommas(dailySales);
};

/**
 * Titans All-in-One sets this at document_start on Amazon (see spt-unified-marker).
 * When present, legacy Quick View must not inject overlapping UI.
 */
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