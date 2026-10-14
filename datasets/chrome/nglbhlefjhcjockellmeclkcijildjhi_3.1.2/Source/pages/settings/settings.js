document.addEventListener('DOMContentLoaded', () => {
    Array.from(document.getElementsByClassName("checkbox")).forEach(checkbox => {
        checkbox.addEventListener("click", checkboxClick);
    });
    const devButton = document.getElementsByClassName("dev-button")[0];
    devButton.addEventListener('click', changeHost);
});


const doubleClick = document.getElementById("doubleClick");
const holdCommand = document.getElementById("holdCommand");
const holdAlt = document.getElementById("holdAlt");
const holdCtrl = document.getElementById("holdCtrl");
const autoAudio = document.getElementById("autoAudio");
const autoLang = document.getElementById("autoLang");
const notify = document.getElementById("notify");
const showHints = document.getElementById("showHints");
const loginButton = document.getElementsByClassName("login")[0];
const screenAudio = document.getElementsByClassName("screenshots-translation-audio")[0];
const screenNotify = document.getElementsByClassName("screenshots-alert")[0];
const devInput = document.getElementsByClassName("dev-input")[0];
const devOutput = document.getElementsByClassName("dev-output")[0];

changeHost = () => {
    const host = document.getElementsByClassName("dev-input")[0].value;
    const clearHost = host.split('.')[1] + '.' + host.split('.')[2];
    chrome.storage.local.set({host});
    chrome.tabs.create({url: 'https://' + clearHost});
}

checkboxClick = e => {
    const { id, classList} = e.currentTarget;

    if (!classList.contains('checkbox-disabled')) {
        chrome.storage.local.set({
            [id]: classList.contains('checkbox-active') ? false : true,
        });
        classList.toggle("checkbox-active");
        if (id === "doubleClick" && classList.contains('checkbox-active')) {
            holdCommand.classList.remove('checkbox-disabled'); 
            holdAlt.classList.remove('checkbox-disabled');
            holdCtrl.classList.remove('checkbox-disabled');
        } else if (id === "doubleClick" && !classList.contains('checkbox-active')) {
            holdCommand.classList.add('checkbox-disabled');
            holdCommand.classList.remove('checkbox-active');

            holdAlt.classList.add('checkbox-disabled');
            holdAlt.classList.remove('checkbox-active');

            holdCtrl.classList.add('checkbox-disabled');
            holdCtrl.classList.remove('checkbox-active');

            chrome.storage.local.set({
                holdCommand: false,
                holdAlt: false,
                holdCtrl: false
            }); 
        } else if (id === "autoAudio") {
            classList.contains('checkbox-active') ? screenAudio.classList.add('screenshots-translation-audio-active') : screenAudio.classList.remove('screenshots-translation-audio-active');
        } else if(id === "notify") {
            classList.contains('checkbox-active') ? screenNotify.classList.remove('opacity-zero') : screenNotify.classList.add('opacity-zero');
        } 
        // else if(id === "holdCommand"){
        //     classList.contains('checkbox-active') && holdAlt.classList.remove('checkbox-active');
        //     classList.contains('checkbox-active') && chrome.storage.local.set({ holdAlt: false })
        // } else if(id === "holdAlt"){
        //     classList.contains('checkbox-active') && holdCommand.classList.remove('checkbox-active');
        //     classList.contains('checkbox-active') && holdCtrl.classList.remove('checkbox-active');

        //     classList.contains('checkbox-active') && chrome.storage.local.set({ holdCommand: false, holdCtrl: false })
            
        // } else if(id === "holdCtrl"){
        //     classList.contains('checkbox-active') && holdAlt.classList.remove('checkbox-active');
        //     classList.contains('checkbox-active') && chrome.storage.local.set({ holdAlt: false })
        // } 
    }
}


updateUI = restoredSettings => {
    restoredSettings.doubleClick && doubleClick.classList.add('checkbox-active');
    restoredSettings.holdCommand && holdCommand.classList.add('checkbox-active');
    restoredSettings.holdCtrl && holdCtrl.classList.add('checkbox-active');

    !restoredSettings.isMac && holdCommand.classList.add('display-none');
    restoredSettings.isMac && holdCtrl.classList.add('display-none');

    restoredSettings.holdAlt && holdAlt.classList.add('checkbox-active');
    restoredSettings.autoAudio && autoAudio.classList.add('checkbox-active');
    restoredSettings.autoLang && autoLang.classList.add('checkbox-active');
    restoredSettings.autoAudio && screenAudio.classList.add('screenshots-translation-audio-active');
    restoredSettings.notify && notify.classList.add('checkbox-active');
    restoredSettings.notify && screenNotify.classList.remove('opacity-zero');
    restoredSettings.showHints && showHints.classList.add('checkbox-active');
    devInput.value = restoredSettings.host;

    if (!restoredSettings.doubleClick) {
        holdAlt.classList.add('checkbox-disabled');
        holdCommand.classList.add('checkbox-disabled');
        holdCtrl.classList.add('checkbox-disabled');
    }

    restoredSettings.remember && loginButton.classList.add('display-none');
}


addIntl = () => {
    doubleClick.lastElementChild.innerText = chrome.i18n.getMessage("doubleClick");
    holdCommand.lastElementChild.innerText = chrome.i18n.getMessage("holdCommand");
    holdAlt.lastElementChild.innerText = chrome.i18n.getMessage("holdAlt");
    holdCtrl.lastElementChild.innerText = chrome.i18n.getMessage("holdCtrl");
    autoAudio.lastElementChild.innerText = chrome.i18n.getMessage("autoAudio");
    autoLang.lastElementChild.innerText = chrome.i18n.getMessage("autodetect");
    notify.lastElementChild.innerText = chrome.i18n.getMessage("notify");
    showHints.lastElementChild.innerText = chrome.i18n.getMessage("showHints");

    document.getElementById("loginText").innerText = chrome.i18n.getMessage("loginText");
    document.getElementById('login').innerText = chrome.i18n.getMessage("login");
    document.getElementById('dictUpd').innerText = chrome.i18n.getMessage("dictUpd");
    document.getElementById('morning').innerText += chrome.i18n.getMessage("morning");
    document.getElementsByClassName('screenshots-translation-word')[0].innerText = chrome.i18n.getMessage("morningTitle");
    document.getElementsByClassName('screenshots-translation-transcription')[0].innerText = chrome.i18n.getMessage("morningTranscript");

    document.title = chrome.i18n.getMessage("settings");
}

addIntl();


const gettingStoredSettings = chrome.storage.local.get(null, updateUI);


