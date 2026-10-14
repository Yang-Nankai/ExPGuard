function localize() {
    document.querySelector('.on-off .title').innerHTML = chrome.i18n.getMessage("onoff");
    document.querySelector('.on-off-light .title').innerHTML = chrome.i18n.getMessage("on_off_light");
    document.querySelector('.on-off-progress .title').innerHTML = chrome.i18n.getMessage("on_off_progress");
    document.querySelector('.on-off-ads .title').innerHTML = chrome.i18n.getMessage("on_off_ads");

    document.querySelector('.rate_us_text').innerHTML = chrome.i18n.getMessage("rate_us_text");
    document.querySelector('.favorites_text').innerHTML = chrome.i18n.getMessage("favorites_text");
    document.querySelector('.recently_text').innerHTML = chrome.i18n.getMessage("recently_text");
    document.querySelector('.player-text').innerHTML = chrome.i18n.getMessage("player_text");
    
    document.querySelector('.optimizevolume_help').innerHTML = chrome.i18n.getMessage("optimizevolume_help");
    document.querySelector('.alwayshd_help').innerHTML = chrome.i18n.getMessage("alwayshd_help");
    
    document.querySelector('.optimizevolume').innerHTML = chrome.i18n.getMessage("optimizevolume");
    document.querySelector('.alwayshd').innerHTML = chrome.i18n.getMessage("alwayshd");
    
    more_skins.innerHTML = chrome.i18n.getMessage("more");
}


document.addEventListener('DOMContentLoaded', function () {
    localize();
});