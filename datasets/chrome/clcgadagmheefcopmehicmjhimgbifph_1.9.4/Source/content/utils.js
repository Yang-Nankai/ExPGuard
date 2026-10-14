function calculatePercentages() {
  const counts = totalPulls.reduce((acc, pull) => {
    acc[pull.color] = (acc[pull.color] || 0) + 1;
    if (pull.stattrak) acc.stattrak = (acc.stattrak || 0) + 1;
    return acc;
  }, {});

  const num = totalPulls.length;

  const returnObject = {
    gold: {
      count: counts.d4af37,
      percentage: calculatePercentage(counts.d4af37, num),
    },
    covert: {
      count: counts.eb4b4b,
      percentage: calculatePercentage(counts.eb4b4b, num),
    },
    classified: {
      count: counts.d32ce6,
      percentage: calculatePercentage(counts.d32ce6, num),
    },
    restricted: {
      count: counts["8847ff"],
      percentage: calculatePercentage(counts["8847ff"], num),
    },
    milspec: {
      count: counts["4b69ff"],
      percentage: calculatePercentage(counts["4b69ff"], num),
    },
    stattrak: {
      count: counts.stattrak,
    },
  };
  returnObject.gold.percentage =
    Math.floor((returnObject.gold.count / num) * 10000) / 100;
  if (isNaN(returnObject.gold.percentage)) returnObject.gold.percentage = 0;
  returnObject.covert.percentage =
    Math.floor((returnObject.covert.count / num) * 10000) / 100;
  if (isNaN(returnObject.covert.percentage)) returnObject.covert.percentage = 0;
  returnObject.classified.percentage =
    Math.floor((returnObject.classified.count / num) * 10000) / 100;
  if (isNaN(returnObject.classified.percentage))
    returnObject.classified.percentage = 0;
  returnObject.restricted.percentage =
    Math.floor((returnObject.restricted.count / num) * 10000) / 100;
  if (isNaN(returnObject.restricted.percentage))
    returnObject.restricted.percentage = 0;
  returnObject.milspec.percentage =
    Math.floor((returnObject.milspec.count / num) * 10000) / 100;
  if (isNaN(returnObject.milspec.percentage))
    returnObject.milspec.percentage = 0;
  returnObject.stattrak.percentage =
    Math.floor((returnObject.stattrak.count / num) * 10000) / 100;
  if (isNaN(returnObject.stattrak.percentage))
    returnObject.stattrak.percentage = 0;
  return returnObject;
}

function calculatePercentage(count, total) {
  if (isNaN(count) || isNaN(total)) return 0;
  return Math.floor((count / total) * 10000) / 100;
}

function parseDate(str) {
  let [datePart, timePart] = str.split("  ");
  let [day, month, year] = datePart.split(" ");
  let [time, modifier] = timePart.split(/(am|pm)/i);

  let [hours, minutes] = time.split(":");
  if (modifier.toLowerCase() === "pm" && hours !== "12") {
    hours = parseInt(hours, 10) + 12;
  } else if (modifier.toLowerCase() === "am" && hours === "12") {
    hours = "00";
  }

  const dateString = `${day} ${month} ${year} ${hours}:${minutes}`;

  return new Date(dateString);
}

function injectScript() {
  var s = document.createElement("script");
  s.src = chrome.runtime.getURL("content/inject.js");
  s.onload = function () {
    this.remove();
  };
  (document.head || document.documentElement).appendChild(s);
}

function getFirstKnifeCaseCount(events) {
  //This function will return the amount of cases opened until the first knife was opened.
  // We have to query from the back of the array because the first knife case is the last one in the array.
  const lastGoldPull = events.findLastIndex(
    (event) => event.color === "d4af37"
  );
  return lastGoldPull === -1 ? events.length : events.length - lastGoldPull;
}
