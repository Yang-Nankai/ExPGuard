// SIH's clone of lootspectrum to be moved below our content
function monitorOtherExtensions() {
  let checkCount = 0;
  const maxChecks = 30; // 3 seconds with 100ms intervals

  const checkInterval = setInterval(() => {
    checkCount++;

    const otherExtension = document.querySelector(".sih-cs-opening-case-stats");
    const wrapper = document.querySelector(".inventory_history_pagingrow");
    const ourContent = document.querySelector("#caseboxWrapper");

    if (otherExtension && wrapper && ourContent) {
      // Move other extension below our content
      const nextSibling = ourContent.nextSibling;
      if (nextSibling && nextSibling !== otherExtension) {
        wrapper.insertBefore(otherExtension, nextSibling);
      } else if (!nextSibling) {
        wrapper.appendChild(otherExtension);
      }
      clearInterval(checkInterval);
      return;
    }

    if (checkCount >= maxChecks) {
      clearInterval(checkInterval);
      if (!wrapper) {
        console.warn(
          "LootSpectrum: inventory_history_pagingrow not found during other extension monitoring"
        );
      }
    }
  }, 100);
}

function prepareBox() {
  const box = document.createElement("div");
  box.id = "caseboxWrapper";
  box.class = "caseboxWrapper";

  const finishedBox = document.createElement("div");
  finishedBox.id = "finishedBoxWrapper";
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = chrome.runtime.getURL("./styles/caseAnalytics.css");
  document.head.appendChild(link);

  const link2 = document.createElement("link");
  link2.rel = "stylesheet";
  link2.type = "text/css";
  link2.href = chrome.runtime.getURL("./styles/finished.css");
  document.head.appendChild(link2);
  fetch(chrome.runtime.getURL("html/finishedBox.html")).then((response) =>
    response.text().then((data) => {
      finishedBox.innerHTML = data;
      finishedBox.children[0].style.display = "none";
      const wrapper = document.querySelector(".inventory_history_pagingrow");
      if (wrapper) {
        if (wrapper.firstChild) {
          wrapper.insertBefore(finishedBox, wrapper.firstChild);
        } else {
          wrapper.appendChild(finishedBox);
        }
      } else {
        console.warn(
          "LootSpectrum: inventory_history_pagingrow not found for finishedBox injection"
        );
      }
    })
  );

  // Add the HTML box into the page
  fetch(chrome.runtime.getURL("html/casebox.html")).then((response) =>
    response.text().then((data) => {
      try {
        box.innerHTML = data;
        const button = box.querySelector("#analyticsButton");
        const stopButton = box.querySelector("#stopButton");
        const fixedTimeButton = box.querySelector("#fixedTimeButton");
        const advancedToggle = box.querySelector(".advancedToggle");
        const lootSpectrumLink = box.querySelector("#lootSpectrumLink");
        const partnerLogo = box.querySelector(".partnerLogo");
        const debugNameInput = box.querySelector("#debugNameInput");
        if (version) {
          box.querySelector("#version").innerText = "v" + version;
        }

        // Update image sources to use proper extension URLs
        const partnerLogoImg = box.querySelector(".partnerLogo img");
        if (partnerLogoImg) {
          partnerLogoImg.src = chrome.runtime.getURL("assets/tradeit.svg");
        }

        if (debugNameInput) {
          debugNameInput.addEventListener("change", () => {
            debugName = debugNameInput.value;
          });
        }

        const detectAgeToggle = box.querySelector("#detectAgeToggle");
        if (detectAgeToggle) {
          detectAgeToggle.addEventListener("change", () => {
            detectAgeEnabled = detectAgeToggle.checked;
          });
          // initialize from UI default
          detectAgeEnabled = detectAgeToggle.checked;
        }

        button.addEventListener("click", () => {
          handleLoadingClick();
        });
        stopButton.addEventListener("click", () => {
          handleStopClick();
        });
        fixedTimeButton.addEventListener("click", () => {
          handleFixedTimeClick();
        });
        advancedToggle.addEventListener("click", () => {
          box.querySelectorAll(".advancedButtons").forEach((button) => {
            button.classList.toggle("active");
          });
        });
        lootSpectrumLink.addEventListener("click", () => {
          window.open("https://lootspectrum.com", "_blank");
        });
        partnerLogo.addEventListener("click", () => {
          window.open("https://lootspectrum.com/partner", "_blank");
        });
        box.querySelectorAll(".trackToggle").forEach((toggle) => {
          toggle.addEventListener("change", () => {
            toggleTrack(toggle.checked, toggle.id);
          });
        });
        const wrapper = document.querySelector(".inventory_history_pagingrow");
        if (wrapper) {
          wrapper.appendChild(box);

          // Start monitoring for other extensions
          monitorOtherExtensions();
        } else {
          console.error(
            "LootSpectrum: inventory_history_pagingrow not found for casebox injection"
          );
          return;
        }

        const resetButton = box.querySelector("#resetStatsButton");
        if (!resetButton) return;
        resetButton.addEventListener("click", () => {
          clearDB();
          events.clear();
          eventIds.clear();
          ranToEnd = false;
          counts = {
            gold: 0,
            covert: 0,
            classified: 0,
            restricted: 0,
            milspec: 0,
            stattrak: 0,
            totalCases: 0,
            totalSouvenirs: 0,
            totalTradeUps: 0,
            totalCapsules: 0,
            tournamentDrops: 0,
            totalDrops: 0,
            totalMissions: 0,
            totalArmoryPassUsage: 0,
            totalArmsDealerPurchases: 0,
            casesSinceNoGold: 0,
            firstKnifeCaseCount: 0,
          };
          currentTime = null;
          // Clear real-time stats data structures
          goldItems = [];
          itemFrequencyMap.clear();
          lastStatsUpdate = 0;
          window.localStorage.removeItem("inventoryAge");
          const finishedBox = document.querySelector("#finishedBox");
          if (finishedBox) {
            finishedBox.remove();
          }
          // Clear the display areas
          const goldArea = document.querySelector("#goldArea");
          const mostPulledArea = document.querySelector("#mostPulledArea");
          if (goldArea) goldArea.innerHTML = "";
          if (mostPulledArea) mostPulledArea.innerHTML = "";
          updateBox();
        });

        const getBackupButton = box.querySelector("#getBackupButton");
        if (getBackupButton) {
          getBackupButton.addEventListener("click", () => {
            resetBackup();
          });
        }

        // Add click handlers for category grid items
        setupCategoryClickHandlers();
        loadEvents().then((result) => {
          if (result) {
            document.querySelector(
              "#backupSize"
            ).innerText = `${backupEvents.size}`;
            ranToEnd = result.ranToEnd;
            if (ranToEnd) {
              finishedFunction();
            } else {
              // Update real-time stats after loading existing data
              updateGoldPullListRealtime();
              displayMostPulledSkinsRealtime();
            }
            updateBox();
          }
        });
      } catch (e) {
        console.log(e);
      }
    })
  );
}

function handleLoadingClick() {
  const button = document.querySelector("#analyticsButton");
  const stopButton = document.querySelector("#stopButton");
  button.classList.add("loading");
  stopButton.classList.remove("loading");
  handleButtonClick();
}

function handleStopClick() {
  const button = document.querySelector("#analyticsButton");
  const stopButton = document.querySelector("#stopButton");
  button.classList.remove("loading");
  stopButton.classList.add("loading");
  toggleLoading(false);
}

function resetBackup() {
  events.clear();
  events = new Map(backupEvents);
  saveEvents(events, false);
  window.location.reload();
}

function toggleTrack(checked, type) {
  console.log(checked, type);
  trackToggles[type] = checked;
}

function updateBox() {
  document.querySelector("#caseCountHeader").innerText = counts.totalCases;
  document.querySelector("#goldCounter").innerText = counts.gold;
  document.querySelector("#covertCounter").innerText = counts.covert;
  document.querySelector("#classifiedCounter").innerText = counts.classified;
  document.querySelector("#restrictedCounter").innerText = counts.restricted;
  document.querySelector("#milspecCounter").innerText = counts.milspec;
  document.querySelector("#stattrakCounter").innerText = counts.stattrak;
  document.querySelector("#knifeCount").innerText = counts.casesSinceNoGold;
  document.querySelector("#packageCount").innerText = counts.totalSouvenirs;
  document.querySelector("#tradeUpCount").innerText = counts.totalTradeUps;
  document.querySelector("#stickerCount").innerText = counts.totalCapsules;
  document.querySelector("#dropCount").innerText = counts.totalDrops;
  document.querySelector("#missionCount").innerText = counts.totalMissions;
  document.querySelector("#armoryPassUsageCount").innerText =
    counts.totalArmoryPassUsage;
  document.querySelector("#tournamentDropCount").innerText =
    counts.tournamentDrops ?? "0";
  document.querySelector("#armsDealerCount").innerText =
    counts.totalArmsDealerPurchases ?? "0";
  updateBars();
  sortCounterBoxes();
  if (counts.lastEventTime) {
    document.querySelector("#lastDateChecked").innerText = new Date(
      counts.lastEventTime
    ).toLocaleDateString();
  }
  if (counts.firstEventTime) {
    document.querySelector("#dateCheckLabelFrom").innerText = new Date(
      counts.firstEventTime
    ).toLocaleDateString();
  }
}

function updateBars() {
  const gradient = document.querySelector(".stats");

  // Calculate percentages
  const goldPercent =
    counts.gold > 0 ? (counts.gold / counts.totalCases) * 100 : 0;
  const covertPercent =
    counts.covert > 0 ? (counts.covert / counts.totalCases) * 100 : 0;
  const classifiedPercent =
    counts.classified > 0 ? (counts.classified / counts.totalCases) * 100 : 0;
  const restrictedPercent =
    counts.restricted > 0 ? (counts.restricted / counts.totalCases) * 100 : 0;
  const milspecPercent =
    counts.milspec > 0 ? (counts.milspec / counts.totalCases) * 100 : 0;
  const stattrakPercent =
    counts.stattrak > 0 ? (counts.stattrak / counts.totalCases) * 100 : 0;

  // Set CSS custom properties for bar widths
  gradient.style.setProperty("--goldBarWidth", `${goldPercent}%`);
  gradient.style.setProperty("--covertBarWidth", `${covertPercent}%`);
  gradient.style.setProperty("--classifiedBarWidth", `${classifiedPercent}%`);
  gradient.style.setProperty("--restrictedBarWidth", `${restrictedPercent}%`);
  gradient.style.setProperty("--milspecBarWidth", `${milspecPercent}%`);
  gradient.style.setProperty("--stattrakBarWidth", `${stattrakPercent}%`);

  // Update percentage displays in labels
  const goldPercentEl = document.querySelector("#goldPercent");
  const covertPercentEl = document.querySelector("#covertPercent");
  const classifiedPercentEl = document.querySelector("#classifiedPercent");
  const restrictedPercentEl = document.querySelector("#restrictedPercent");
  const milspecPercentEl = document.querySelector("#milspecPercent");
  const stattrakPercentEl = document.querySelector("#stattrakPercent");

  if (goldPercentEl) goldPercentEl.textContent = `${goldPercent.toFixed(1)}%`;
  if (covertPercentEl)
    covertPercentEl.textContent = `${covertPercent.toFixed(1)}%`;
  if (classifiedPercentEl)
    classifiedPercentEl.textContent = `${classifiedPercent.toFixed(1)}%`;
  if (restrictedPercentEl)
    restrictedPercentEl.textContent = `${restrictedPercent.toFixed(1)}%`;
  if (milspecPercentEl)
    milspecPercentEl.textContent = `${milspecPercent.toFixed(1)}%`;
  if (stattrakPercentEl)
    stattrakPercentEl.textContent = `${stattrakPercent.toFixed(1)}%`;
}

function sortCounterBoxes() {
  const numberRow = document.querySelector(".numberRow");
  if (!numberRow) return;

  const items = Array.from(numberRow.querySelectorAll(".numberRowItem"));

  items.sort((a, b) => {
    const valueA = parseInt(a.querySelector("strong")?.innerText || "0", 10);
    const valueB = parseInt(b.querySelector("strong")?.innerText || "0", 10);
    return valueB - valueA; // Sort in descending order
  });

  // Clear existing items
  while (numberRow.firstChild) {
    numberRow.removeChild(numberRow.firstChild);
  }

  // Append sorted items
  items.forEach((item) => numberRow.appendChild(item));
}

// Efficient function to update gold items display during run
function updateGoldPullListRealtime() {
  const goldPullList = document.querySelector("#goldArea");
  if (!goldPullList) return;

  // Clear existing items
  goldPullList.innerHTML = "";

  // Display gold items from our efficient array
  goldItems
    .slice()
    .reverse()
    .forEach((item) => {
      const pullElement = document.createElement("div");
      pullElement.classList.add("skinCard");
      const pullImage = document.createElement("img");
      pullImage.src =
        "https://community.cloudflare.steamstatic.com/economy/image/" +
        item.image;
      pullImage.alt = item.name;

      const pullName = document.createElement("h3");
      pullName.innerText = item.name;
      pullElement.appendChild(pullImage);
      pullElement.appendChild(pullName);
      goldPullList.appendChild(pullElement);
    });
}

// Efficient function to get most pulled items from frequency map
function getMostPulledItemsRealtime() {
  const sortedItems = Array.from(itemFrequencyMap.entries())
    .map(([name, data]) => ({
      name,
      count: data.count,
      image: data.image,
    }))
    .sort((a, b) => b.count - a.count);

  return sortedItems.slice(0, 3);
}

// Efficient function to display most pulled skins during run
function displayMostPulledSkinsRealtime() {
  const mostPulledSkins = document.querySelector("#mostPulledArea");
  if (!mostPulledSkins) return;

  mostPulledSkins.innerHTML = "";

  try {
    const sortedSkins = getMostPulledItemsRealtime();
    sortedSkins.forEach((skin) => {
      const skinElement = document.createElement("div");
      skinElement.classList.add("skinCard");
      const skinImage = document.createElement("img");
      skinImage.src =
        "https://community.cloudflare.steamstatic.com/economy/image/" +
        skin.image;
      skinImage.alt = skin.name;
      const skinName = document.createElement("h3");
      skinName.innerText = skin.name;
      const skinCount = document.createElement("span");
      skinCount.innerText = skin.count;
      skinElement.appendChild(skinImage);
      skinElement.appendChild(skinName);
      skinElement.appendChild(skinCount);
      mostPulledSkins.appendChild(skinElement);
    });
  } catch (error) {
    console.error("Error displaying most pulled skins:", error);
  }
}

// Function to update stats during run
function updateStatsDuringRun() {
  const now = Date.now();
  if (now - lastStatsUpdate > STATS_UPDATE_INTERVAL) {
    updateGoldPullListRealtime();
    displayMostPulledSkinsRealtime();
    lastStatsUpdate = now;
  }
}

// Function to load gold items for display
async function updateGoldPullList() {
  const goldPullList = document.querySelector("#goldArea");
  goldPullList.innerHTML = "";

  const db = await initDB();
  const transaction = db.transaction(STORE_NAME, "readonly");
  const store = transaction.objectStore(STORE_NAME);
  const index = store.index("date");

  const request = index.getAll();

  request.onsuccess = () => {
    const events = request.result.filter(
      (event) => event.gainedItems?.[0]?.color === "d4af37"
    );

    events.forEach((event) => {
      const pullElement = document.createElement("div");
      pullElement.classList.add("skinCard");
      const pullImage = document.createElement("img");
      pullImage.src =
        "https://community.cloudflare.steamstatic.com/economy/image/" +
        event.gainedItems[0].image;
      pullImage.alt = event.gainedItems[0].name;

      const pullName = document.createElement("h3");
      pullName.innerText = event.gainedItems[0].name;
      pullElement.appendChild(pullImage);
      pullElement.appendChild(pullName);
      goldPullList.appendChild(pullElement);
    });
  };
}

// Function to get item frequencies from IndexedDB
async function getItemFrequencies() {
  const db = await initDB();
  const transaction = db.transaction(STORE_NAME, "readonly");
  const store = transaction.objectStore(STORE_NAME);
  const index = store.index("date");

  const request = index.getAll();

  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      const events = request.result;
      const frequencyMap = events.reduce((map, event) => {
        if (
          !(
            event.name.includes("Unlocked") &&
            ((event.lostItems.length === 1 &&
              event.lostItems[0].type === "Container") ||
              (event.lostItems.length === 2 &&
                event.lostItems.some((item) => item.type === "Container") &&
                event.lostItems.some((item) => item.type === "Key"))) &&
            (event.gainedItems[0].type === "Weapon" ||
              event.gainedItems[0].type === "Gloves") &&
            !event.gainedItems[0].name.includes("Souvenir")
          ) ||
          !event.gainedItems?.[0]
        )
          return map;

        const item = event.gainedItems[0];
        if (!map[item.name]) {
          map[item.name] = {
            count: 0,
            image: item.image,
          };
        }
        map[item.name].count++;
        return map;
      }, {});

      const result = Object.entries(frequencyMap)
        .map(([name, data]) => ({
          name,
          count: data.count,
          image: data.image,
        }))
        .sort((a, b) => b.count - a.count);

      resolve(result);
    };

    request.onerror = () => reject(request.error);
  });
}

// Function to display most pulled skins
async function displayMostPulledSkins() {
  const mostPulledSkins = document.querySelector("#mostPulledArea");
  mostPulledSkins.innerHTML = "";

  try {
    const sortedSkins = await getItemFrequencies();
    sortedSkins.slice(0, 3).forEach((skin) => {
      const skinElement = document.createElement("div");
      skinElement.classList.add("skinCard");
      const skinImage = document.createElement("img");
      skinImage.src =
        "https://community.cloudflare.steamstatic.com/economy/image/" +
        skin.image;
      skinImage.alt = skin.name;
      const skinName = document.createElement("h3");
      skinName.innerText = skin.name;
      const skinCount = document.createElement("span");
      skinCount.innerText = skin.count;
      skinElement.appendChild(skinImage);
      skinElement.appendChild(skinName);
      skinElement.appendChild(skinCount);
      mostPulledSkins.appendChild(skinElement);
    });
  } catch (error) {
    console.error("Error displaying most pulled skins:", error);
  }
}

function addLog(log, type) {
  const timer = new Date().toLocaleTimeString().split(":");
  const time = `${timer[0]}:${timer[1]}:${timer[2]}`;
  const logs = document.querySelector("#logs");
  if (logs.children.length > 20) {
    logs.children[0].remove();
  }
  logs.innerHTML += `<p class="${type}">[${time}]: ${log}</p>`;
}

function toggleLoading(_isLoading, isfinished = false) {
  isLoading = _isLoading;
  if (_isLoading) {
    document.querySelector(".loadingCircle").classList.remove("hidden");
  } else if (!isfinished) {
    document.querySelector(".loadingCircle").classList.add("hidden");
  }
}

// Category event list functionality
let currentCategory = null;
let currentPage = 0;
let currentEvents = [];
let eventsPerPage = 100;

const categories = [
  "TRADE-UPS",
  "CAPSULES",
  "PACKAGES",
  "DROPS",
  "ARMORY",
  "TOURNAMENT DROPS",
  "ARMORY PASSES",
  "ARMS DEALER",
  "CASES", // Adding cases category
];

function setupCategoryClickHandlers() {
  const categoryItems = document.querySelectorAll(".numberRowItem");

  categoryItems.forEach((item) => {
    item.style.cursor = "pointer";
    item.addEventListener("click", (e) => {
      e.stopPropagation();
      const label = item.querySelector("label").innerText;
      showCategoryEvents(label);
    });
  });
}

async function showCategoryEvents(categoryName) {
  try {
    // Map category names to event types
    const categoryMapping = {
      "TRADE-UPS": "tradeups",
      CAPSULES: "capsules",
      PACKAGES: "souvenirs",
      DROPS: "drops",
      ARMORY: "missions",
      "TOURNAMENT DROPS": "tournamentDrops",
      "ARMORY PASSES": "armoryPassUsage",
      "ARMS DEALER": "armsDealerPurchases",
      CASES: "cases",
    };

    const categoryType = categoryMapping[categoryName];
    if (!categoryType) {
      addLog(`Unknown category: ${categoryName}`, "warning");
      return;
    }

    currentCategory = categoryName;
    currentPage = 0;

    // Fetch events for this category
    currentEvents = await getEventsByCategory(categoryType);
    currentEvents.sort((a, b) => b.date - a.date); // Sort by date descending

    displayCategoryEvents();
  } catch (error) {
    addLog(`Error loading ${categoryName} events: ${error.message}`, "error");
  }
}

async function getEventsByCategory(categoryType) {
  const db = await initDB();
  const transaction = db.transaction(STORE_NAME, "readonly");
  const store = transaction.objectStore(STORE_NAME);
  const index = store.index("date");

  return new Promise((resolve, reject) => {
    const request = index.getAll();

    request.onsuccess = () => {
      const allEvents = request.result;
      let filteredEvents = [];

      switch (categoryType) {
        case "tradeups":
          filteredEvents = allEvents.filter(
            (event) =>
              event.name.includes("Crafted") &&
              (event.lostItems.length === 10 || event.lostItems.length === 5) &&
              event.gainedItems.length === 1
          );
          break;
        case "capsules":
          filteredEvents = allEvents.filter(
            (event) =>
              event.name.includes("Unlocked") &&
              event.lostItems[0].type === "Container" &&
              event.gainedItems[0].type === "Sticker"
          );
          break;
        case "souvenirs":
          filteredEvents = allEvents.filter(
            (event) =>
              event.name.includes("Unlocked") &&
              event.lostItems[0].type === "Container" &&
              event.gainedItems[0].type === "Weapon" &&
              event.gainedItems[0].name.includes("Souvenir")
          );
          break;
        case "drops":
          filteredEvents = allEvents.filter(
            (event) =>
              (event.name.includes("Earned a new rank and got a drop") ||
                event.name.includes("Got an item drop")) &&
              event.gainedItems.length > 0
          );
          break;
        case "missions":
          filteredEvents = allEvents.filter(
            (event) =>
              (event.name.includes("Mission reward") &&
                event.date > 1727913600000) ||
              (event.name.includes("Used") &&
                event.lostItems[0].name.includes("Armory Pass"))
          );
          break;
        case "tournamentDrops":
          filteredEvents = allEvents.filter(
            (event) =>
              event.gainedItems.length === 1 &&
              event.gainedItems[0].name.toLowerCase().includes("souvenir") &&
              event.name.toLowerCase().includes("drop") &&
              event.gainedItems[0].type === "Container"
          );
          break;
        case "armsDealerPurchases":
          filteredEvents = allEvents.filter(
            (event) =>
              event.name.includes("Purchased from Arms Dealer") &&
              event.gainedItems.length === 1
          );
          break;
        case "armoryPassUsage":
          filteredEvents = allEvents.filter(
            (event) =>
              event.name.includes("Used") &&
              event.lostItems[0].name.includes("Armory Pass")
          );
          break;
        case "cases":
          filteredEvents = allEvents.filter(
            (event) =>
              event.name.includes("Unlocked") &&
              ((event.lostItems.length === 1 &&
                event.lostItems[0].type === "Container") ||
                (event.lostItems.length === 2 &&
                  event.lostItems.some((item) => item.type === "Container") &&
                  event.lostItems.some((item) => item.type === "Key"))) &&
              (event.gainedItems[0].type === "Weapon" ||
                event.gainedItems[0].type === "Gloves") &&
              !event.gainedItems[0].name.includes("Souvenir")
          );
          break;
      }

      resolve(filteredEvents);
    };

    request.onerror = () => reject(request.error);
  });
}

function displayCategoryEvents() {
  const detailContent = document.querySelector(".detailContent");
  if (!detailContent) return;

  // Remove existing category list
  const existingList = document.querySelector("#categoryEventList");
  if (existingList) {
    existingList.remove();
  }

  // Create category event list container
  const categoryListContainer = document.createElement("div");
  categoryListContainer.id = "categoryEventList";
  categoryListContainer.className = "categoryEventList";
  categoryListContainer.innerHTML = `
    <div class="categoryEventHeader">
      <h3>Events: ${currentCategory}</h3>
      <div class="categoryControls">
        <select class="categoryDropdown" id="categoryDropdown">
          <option value="">Select Category...</option>
        </select>
        <button class="closeCategoryList" id="closeCategoryList">×</button>
      </div>
    </div>
    <div class="categoryEventContent">
      <div class="categoryEventItems" id="categoryEventItems"></div>
      <div class="categoryPagination" id="categoryPagination"></div>
    </div>
  `;

  // Insert before the detailContent (above the gold/most pulled sections)
  detailContent.parentElement.insertBefore(
    categoryListContainer,
    detailContent
  );

  document
    .getElementById("closeCategoryList")
    .addEventListener("click", () => closeCategoryList());

  // Populate dropdown with categories
  populateCategoryDropdown();

  // Add dropdown event listener
  document
    .getElementById("categoryDropdown")
    .addEventListener("change", (e) => {
      const selectedCategory = e.target.value;
      if (selectedCategory) {
        showCategoryEvents(selectedCategory);
      }
    });

  renderCategoryEventsPage();
}

function renderCategoryEventsPage() {
  const itemsContainer = document.querySelector("#categoryEventItems");
  const paginationContainer = document.querySelector("#categoryPagination");

  if (!itemsContainer || !paginationContainer) return;

  const startIndex = currentPage * eventsPerPage;
  const endIndex = Math.min(startIndex + eventsPerPage, currentEvents.length);
  const pageEvents = currentEvents.slice(startIndex, endIndex);

  // Clear existing content
  itemsContainer.innerHTML = "";
  paginationContainer.innerHTML = "";

  // Render events
  pageEvents.forEach((event) => {
    const eventItem = createCategoryEventItem(event);
    itemsContainer.appendChild(eventItem);
  });

  // Render pagination
  const totalPages = Math.ceil(currentEvents.length / eventsPerPage);
  if (totalPages > 1) {
    const paginationHTML = `
      <div class="paginationControls">
        <button class="paginationBtn" id="previousPage"  ${
          currentPage === 0 ? "disabled" : ""
        }>← Previous</button>
        <span class="paginationInfo">Page ${
          currentPage + 1
        } of ${totalPages} (${currentEvents.length} total events)</span>
        <button class="paginationBtn" id="nextPage"  ${
          currentPage >= totalPages - 1 ? "disabled" : ""
        }>Next →</button>
      </div>
    `;
    paginationContainer.innerHTML = paginationHTML;
    document
      .getElementById("previousPage")
      .addEventListener("click", () => changeCategoryPage(-1));
    document
      .getElementById("nextPage")
      .addEventListener("click", () => changeCategoryPage(1));
  }
}

function createCategoryEventItem(event) {
  const eventItem = document.createElement("div");
  eventItem.className = "categoryEventItem";

  // Get the main item (gained item for most categories, lost item for some)
  let mainItem = event.gainedItems[0];
  let isLostItem = false;

  if (
    event.name.includes("Used") &&
    event.lostItems[0].name.includes("Armory Pass")
  ) {
    mainItem = event.lostItems[0];
    isLostItem = true;
  }

  const date = new Date(event.date).toLocaleDateString();
  const rarityColor = mainItem.color || "#4b69ff";

  eventItem.innerHTML = `
    <div class="categoryEventItemImage">
      <img src="https://community.cloudflare.steamstatic.com/economy/image/${
        mainItem.image
      }" alt="${mainItem.name}">
    </div>
    <div class="categoryEventItemContent">
      <div class="categoryEventItemName">${mainItem.name}</div>
      ${
        mainItem.wear
          ? `<div class="categoryEventItemWear">${mainItem.wear}</div>`
          : ""
      }
      <div class="categoryEventItemDate">${date}</div>
    </div>
    <div class="categoryEventItemCta">
      <button class="eventCtaButton" onclick="window.open('https://lootspectrum.com', '_blank')">
        Find out detailed stats
      </button>
    </div>
  `;

  // Apply rarity color as background tone
  if (rarityColor && rarityColor !== "#4b69ff") {
    const colorIntensity = 0.15; // Subtle background
    const rgb = hexToRgb(rarityColor);
    if (rgb) {
      eventItem.style.backgroundColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${colorIntensity})`;
      eventItem.style.borderLeft = `3px solid ${rarityColor}`;
    }
  }

  return eventItem;
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function changeCategoryPage(direction) {
  const totalPages = Math.ceil(currentEvents.length / eventsPerPage);
  const newPage = currentPage + direction;

  if (newPage >= 0 && newPage < totalPages) {
    currentPage = newPage;
    renderCategoryEventsPage();
  }
}

function populateCategoryDropdown() {
  const dropdown = document.getElementById("categoryDropdown");
  if (!dropdown) return;

  // Clear existing options except the first one
  while (dropdown.children.length > 1) {
    dropdown.removeChild(dropdown.lastChild);
  }

  // Add categories to dropdown
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    dropdown.appendChild(option);
  });

  // Set current category as selected
  if (currentCategory) {
    dropdown.value = currentCategory;
  }
}

function closeCategoryList() {
  const categoryList = document.querySelector("#categoryEventList");
  if (categoryList) {
    categoryList.remove();
  }
  currentCategory = null;
  currentPage = 0;
  currentEvents = [];
}
