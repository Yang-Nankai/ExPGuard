document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("close").addEventListener("click", close);
    document.getElementById("settings").addEventListener("click", settings);

});
  
close = () => {
    chrome.tabs.getCurrent(tab => {
        chrome.tabs.remove(tab.id);
    });
}

settings = () => {
    close();
    chrome.tabs.create({url:chrome.runtime.getURL("pages/settings/settings.html")});
}

addIntl = () => {
    document.getElementsByClassName('text-attention')[0].innerText = chrome.i18n.getMessage("attention");
    document.getElementsByClassName('text-title')[0].innerHTML = chrome.i18n.getMessage("speaking");
    document.getElementsByClassName('text-p-big')[0].innerText = chrome.i18n.getMessage("welcomeDesc");
    document.getElementsByClassName('text-p-small')[0].innerText = chrome.i18n.getMessage("welcomeDesc2");
    document.getElementById('settings').innerText = chrome.i18n.getMessage("toSettings");
    document.getElementById('close').innerText = chrome.i18n.getMessage("closePage");
    document.getElementsByClassName('text-reload')[0].lastElementChild.innerText = chrome.i18n.getMessage("reload");
}

addIntl();