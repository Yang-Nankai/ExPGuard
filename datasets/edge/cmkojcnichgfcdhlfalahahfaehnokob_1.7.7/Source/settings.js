const extpay = ExtPay('web-assist');

var optSettings = null,
    defaultTimeout = 30,
    paid = false,
    options = {
        autostart: true,
        enableWakeup: true,
        //,language: 'Autodetect'
        //    minimize: false,
        timeout: defaultTimeout
    },
    initialized = false;

function checkSettings(showMessage) {

    extpay.getUser().then(user => {
        paid = user.paid;
        if (paid) {
            enableSettings(user);
        } else if (user.subscriptionStatus === 'past_due') {
            enableSettings(user, showMessage);
        } else {
            disableSettings();
        }
        initialized = true;

    }).catch(err => {
        document.getElementById('waOptionsMessage').innerText = "Error fetching data :( Check your internet connection and try again.";
    });
}

function disableSettings() {
    var checkPage = document.getElementById('checkPage'),
        enableWakeup = document.getElementById('enableWakeup'),
        timeout = document.getElementById('timeout'),
        autostart = document.getElementById('autostart'),
        message = document.getElementById('waOptionsMessage');

    checkPage.innerHTML = 'Unlock Premium';
    enableWakeup.checked = false;
    autostart.checked = true;
    enableWakeup.disabled = true;
    autostart.disabled = true;
    timeout.value = defaultTimeout;
    timeout.disabled = true;
    message.innerHTML = '';
    options.enableWakeup = false;
    options.autostart = true;
    options.timeout = defaultTimeout;
    
    storeOptions(options);
}

function enableSettings(user, showMessage) {
    var optionsMessage = document.getElementById('waOptionsMessage');

    if (user.subscriptionStatus === 'past_due' && showMessage) {
        optionsMessage.innerText = "Your subscription payment is past due. You need to update your card!";
    }
    document.getElementById('checkPage').innerHTML = ' Subscription Info';
    document.getElementById('enableWakeup').removeAttribute('disabled');
    document.getElementById('autostart').removeAttribute('disabled');
    document.getElementById('timeout').removeAttribute('disabled');
}
function getOptions(options) {
    //'minimize', , 'language'
    chrome.storage.sync.get(['autostart', 'enableWakeup', 'timeout'], function (value) {
        if (value.autostart !== undefined) {
            
            document.getElementById('autostart').checked = value.autostart;
            options.autostart = value.autostart;
        } 
        else {
            // document.getElementById('autostart').checked = true;
            // options.autostart = true;
        }
        if (value.enableWakeup !== undefined) {
            document.getElementById('enableWakeup').checked = value.enableWakeup;
            options.enableWakeup = value.enableWakeup;
        }

        if (value.timeout !== undefined) {

            document.getElementById('timeout').value = value.timeout;
            options.timeout = value.timeout;
        } else {
            document.getElementById('timeout').value = defaultTimeout;
            options.timeout = defaultTimeout;
        }

        // if (value.minimize !== undefined) {
        //     if (!options.autostart) {
        //         document.getElementById('minimize').checked = true;
        //         options.minimize = true;
        //     } else {
        //         document.getElementById('minimize').checked = value.minimize;
        //         options.minimize = value.minimize;
        //     }
        // }

        // if (value.language !== undefined) {
        //     options.language = getLanguage(value.language);
        //     document.getElementById('language').value = options.language;
        // }

    });
}

async function initializeEvents() {
    var txtTimeout = document.getElementById('timeout'),
        msg = 'Reload the page to enable changed options.';

    txtTimeout.addEventListener('input', function () {
        options.timeout = txtTimeout.value;
        document.getElementById('waOptionsMessage').innerText = msg;
        storeOptions(options);
    });

    optSettings = Array.from(document.body.querySelectorAll('input[type="checkbox"], select'));
    optSettings.forEach(function (setting) {
        setting.addEventListener('change', function () {
            if (!initialized) return;

            switch (setting.id) {
                case 'autostart':
                    options.autostart = setting.checked;
                    // if (!setting.checked) {
                    //   //  options.minimize = true;
                    //     // setting.ownerDocument.getElementById('minimize').checked = true;
                    //     // setting.ownerDocument.getElementById('minimize').disabled = true;
                    // } else {
                    //  //   setting.ownerDocument.getElementById('minimize').disabled = false;
                    // }
                    break;
                case 'enableWakeup':
                    options.enableWakeup = setting.checked;
                    break;
                // case 'minimize':
                //     options.minimize = setting.checked;
                //     break;
                case 'timeout':
                    options.timeout = setting.value;
                    break;
                // case 'language':
                //     options.language = setting.value;
                //     break;
            }
            document.getElementById('waOptionsMessage').innerText = msg;
            storeOptions(options);
        });
    });
}



async function storeOptions(options) {
    // Save it using the Chrome extension storage API.
    //  var language = getLanguageCode(options.language);
    chrome.storage.sync.set({
        'autostart': options.autostart,
        'enableWakeup': options.enableWakeup,
        //  'minimize': options.minimize,
        'timeout': options.timeout,
        'paid': paid,
        //  'language': language,
        //'showLabels': options.showLabels
    }, function () {});
}

function initialize() {
    checkSettings(true);
    getOptions(options);
    initializeEvents();
}

function checkFocus() {
    checkSettings();
}

initialize(options);
document.getElementById('settingsContainer').addEventListener('focus', checkFocus);
document.getElementById('checkPage').addEventListener('click', extpay.openPaymentPage);

// const languages = [
//     ["Arabic (Algeria)", "ar-DZ"],
//     ["Arabic (Bahrain)", "ar-BH"],
//     ["Arabic (Egypt)", "ar-EG"],
//     ["Arabic (Iraq)", "ar-IQ"],
//     ["Arabic (Israel)", "ar-IL"],
//     ["Arabic (Jordan)", "ar-JO"],
//     ["Arabic (Kuwait)", "ar-KW"],
//     ["Arabic (Lebanon)", "ar-LB"],
//     ["Arabic (Libya)", "ar-LY"],
//     ["Arabic (Morocco)", "ar-MA"],
//     ["Arabic (Oman)", "ar-OM"],
//     ["Arabic (Qatar)", "ar-QA"],
//     ["Arabic (Saudi Arabia)", "ar-SA"],
//     ["Arabic (Palestinian Authority)", "ar-PS"],
//     ["Arabic (Syria)", "ar-SY"],
//     ["Arabic (Tunisia)", "ar-TN"],
//     ["Arabic (United Arab Emirates)", "ar-AE"],
//     ["Arabic (Yemen)", "ar-YE"],
//     ["Bulgarian (Bulgaria)", "bg-BG"],
//     ["Catalan (Spain)", "ca-ES"],
//     ["Chinese (Cantonese, Traditional)", "zh-HK"],
//     ["Chinese (Mandarin, Simplified)", "zh-CN"],
//     ["Chinese (Taiwanese Mandarin)", "zh-TW"],
//     ["Croatian (Croatia)", "hr-HR"],
//     ["Czech (Czech)", "cs-CZ"],
//     ["Danish (Denmark)", "da-DK"],
//     ["Dutch (Netherlands)", "nl-NL"],
//     ["English (Australia)", "en-AU"],
//     ["English (Canada)", "en-CA"],
//     ["English (Ghana)", "en-GH"],
//     ["English (Hong Kong)", "en-HK"],
//     ["English (India)", "en-IN"],
//     ["English (Ireland)", "en-IE"],
//     ["English (Kenya)", "en-KE"],
//     ["English (New Zealand)", "en-NZ"],
//     ["English (Nigeria)", "en-NG"],
//     ["English (Philippines)", "en-PH"],
//     ["English (Singapore)", "en-SG"],
//     ["English (South Africa)", "en-ZA"],
//     ["English (Tanzania)", "en-TZ"],
//     ["English (United Kingdom)", "en-GB"],
//     ["English (United States)", "en-US"],
//     ["Estonian (Estonia)", "et-EE"],
//     ["Filipino (Philippines)", "fil-PH"],
//     ["Finnish (Finland)", "fi-FI"],
//     ["French (Canada)", "fr-CA"],
//     ["French (France)", "fr-FR"],
//     ["French (Switzerland)", "fr-CH"],
//     ["German (Austria)", "de-AT"],
//     ["German (Switzerland)", "de-CH"],
//     ["German (Germany)", "de-DE"],
//     ["Greek (Greece)", "el-GR"],
//     ["Gujarati (Indian)", "gu-IN"],
//     ["Hebrew (Israel)", "he-IL"],
//     ["Hindi (India)", "hi-IN"],
//     ["Hungarian (Hungary)", "hu-HU"],
//     ["Indonesian (Indonesia)", "id-ID"],
//     ["Irish (Ireland)", "ga-IE"],
//     ["Italian (Italy)", "it-IT"],
//     ["Japanese (Japan)", "ja-JP"],
//     ["Kannada (India)", "kn-IN"],
//     ["Korean (Korea)", "ko-KR"],
//     ["Latvian (Latvia)", "lv-LV"],
//     ["Lithuanian (Lithuania)", "lt-LT"],
//     ["Malay (Malaysia)", "ms-MY"],
//     ["Maltese (Malta)", "mt-MT"],
//     ["Marathi (India)", "mr-IN"],
//     ["Norwegian (Bokmål, Norway)", "nb-NO"],
//     ["Persian (Iran)", "fa-IR"],
//     ["Polish (Poland)", "pl-PL"],
//     ["Portuguese (Brazil)", "pt-BR"],
//     ["Portuguese (Portugal)", "pt-PT"],
//     ["Romanian (Romania)", "ro-RO"],
//     ["Russian (Russia)", "ru-RU"],
//     ["Slovak (Slovakia)", "sk-SK"],
//     ["Slovenian (Slovenia)", "sl-SI"],
//     ["Spanish (Argentina)", "es-AR"],
//     ["Spanish (Bolivia)", "es-BO"],
//     ["Spanish (Chile)", "es-CL"],
//     ["Spanish (Colombia)", "es-CO"],
//     ["Spanish (Costa Rica)", "es-CR"],
//     ["Spanish (Cuba)", "es-CU"],
//     ["Spanish (Dominican Republic)", "es-DO"],
//     ["Spanish (Ecuador)", "es-EC"],
//     ["Spanish (El Salvador)", "es-SV"],
//     ["Spanish (Equatorial Guinea)", "es-GQ"],
//     ["Spanish (Guatemala)", "es-GT"],
//     ["Spanish (Honduras)", "es-HN"],
//     ["Spanish (Mexico)", "es-MX"],
//     ["Spanish (Nicaragua)", "es-NI"],
//     ["Spanish (Panama)", "es-PA"],
//     ["Spanish (Paraguay)", "es-PY"],
//     ["Spanish (Peru)", "es-PE"],
//     ["Spanish (Puerto Rico)", "es-PR"],
//     ["Spanish (Spain)", "es-ES"],
//     ["Spanish (Uruguay)", "es-UY"],
//     ["Spanish (USA)", "es-US"],
//     ["Spanish (Venezuela)", "es-VE"],
//     ["Swahili (Kenya)", "sw-KE"],
//     ["Swedish (Sweden)", "sv-SE"],
//     ["Tamil (India)", "ta-IN"],
//     ["Telugu (India)", "te-IN"],
//     ["Thai (Thailand)", "th-TH"],
//     ["Turkish (Turkey)", "tr-TR"],
//     ["Vietnamese (Vietnam)", "vi-VN"]
// ];

// function getLanguage(language) {
//     if (language === '') return 'Autodetect';

//     for (var x = 0; x < languages.length; x++) {
//         if (languages[x][1] === language) return languages[x][0];
//     }
//     return 'Autodetect';
// }

// function getLanguageCode(language) {
//     if (language === 'Autodetect') return '';
//     for (var x = 0; x < languages.length; x++) {
//         if (languages[x][0] === language) return languages[x][1];
//     }
// }
