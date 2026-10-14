function openSteamInventory() {
  window.open("https://steamcommunity.com/id/me/inventoryhistory/", "_blank");
}

function createAccount() {
  window.open("https://lootspectrum.com/login", "_blank");
}

document.querySelector(".ctaButton").addEventListener("click", openSteamInventory);
document.querySelector(".secondary").addEventListener("click", createAccount);