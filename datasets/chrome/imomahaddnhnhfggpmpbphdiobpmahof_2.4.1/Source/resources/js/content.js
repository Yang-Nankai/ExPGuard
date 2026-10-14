var skins_list, current_skin = null;
var domain = 'https://youtube-skins.com';
var host = location.host.split('www.').join('');
var skin = '';
var isOn = false;
var storageLoaded = false;
var skinApplied = false; // Guard проти дублювання
var originalStyleTemplate = ''; // Зберігаємо оригінальний шаблон

// Debug logging
var DEBUG_SKINS = true;
function logDebug(...args) {
    if (DEBUG_SKINS) {
        console.log('[YT-Skins]', ...args);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    logDebug('DOMContentLoaded fired, host:', host);
    
    if (host.indexOf('youtube-skins.com') > -1) {
        disableButtons();
        document.body.dataset.ex = chrome.runtime.id;
        document.body.dataset.youtubeskins = chrome.runtime.id;
        document.body.dataset.installed = 1;
    }

    if (host.indexOf('youtube.com') > -1) {
        needToReload();
        boostVolumenStyle();
        
        // Якщо storage вже завантажено - застосовуємо скін
        if (storageLoaded && current_skin && isOn) {
            logDebug('Storage already loaded, applying skin on DOMContentLoaded');
            // Якщо template ще не згенерований - генеруємо
            if (!style_template || style_template.indexOf('$_{skin}') > -1) {
                try {
                    generate_template(current_skin);
                } catch (err) {
                    logDebug('ERROR generating template on DOMContentLoaded:', err.message);
                }
            }
            reload_style();
        } else {
            logDebug('YouTube detected, waiting for storage...', 'storageLoaded:', storageLoaded);
        }
    }
});
function reload_style() {
    logDebug('reload_style called, readyState:', document.readyState, 'isOn:', isOn, 'current_skin:', current_skin?.name);
    
    // Якщо DOM ще не готовий - чекаємо
    if (document.readyState === "loading") {
        logDebug('DOM still loading, waiting for DOMContentLoaded...');
        document.addEventListener('DOMContentLoaded', function onDOMReady() {
            document.removeEventListener('DOMContentLoaded', onDOMReady);
            logDebug('DOMContentLoaded fired, retrying reload_style');
            reload_style();
        });
        return;
    }
    
    // DOM готовий (interactive або complete)
    if (location.href.indexOf('youtube') > 0) {
        if (current_skin === null || current_skin === undefined || Object.keys(current_skin).length === 0) {
            logDebug('No current_skin, turning off');
            turnOffSkin();
            return;
        }
        if (isOn) {
            logDebug('Turning ON skin');
            turnOnSkin();
        } else {
            logDebug('isOn is false, turning off');
            turnOffSkin();
        }
    }
}

function turnOnSkin() {
    logDebug('turnOnSkin called');
    
    if (!style_template || style_template.indexOf('$_{skin}') > -1) {
        logDebug('ERROR: style_template not ready or not processed');
        return;
    }
    
    // Перевіряємо чи скін вже застосовано
    var existingSkin = document.querySelector('#player_skin');
    if (existingSkin !== null) {
        // Якщо стиль вже є і skinApplied=true - не дублюємо
        if (skinApplied) {
            logDebug('Skin already applied, skipping');
            return;
        }
        existingSkin.remove();
    }
    
    hideElements();
    
    var style = document.createElement('style');
    style.innerHTML = style_template;
    style.id = 'player_skin';
    
    // Додаємо до body або documentElement
    if (document.body) {
        document.body.appendChild(style);
    } else {
        document.documentElement.appendChild(style);
    }
    
    skinApplied = true;
    logDebug('Skin style injected, length:', style_template.length);
    createImages();
}

function permanentProgressBar() {
    if (!document.querySelector('body'))
        return;
    if (document.querySelector('#progress_bar') !== null)
        document.querySelector('#progress_bar').remove();
    style = document.createElement('style');
    style.innerHTML = progress_bar_style;
    style.id = 'progress_bar';
    document.body.appendChild(style);
}

function boostVolumenStyle() {
    if (!document.querySelector('#volumeboost_info_style')) {
        style = document.createElement('style');
        style.innerHTML = `#volumeboost_info{
            background: #0000009e;
            width: 230px;
            height: 35px;
            z-index: 10;
            position: absolute;
            text-align: center;
            display: flex;
            align-content: center;
            justify-content: center;
            align-items: center;
            left: calc(50% - 115px);
            opacity: 0;
            border: 1px solid #7c7a7a;
            border-radius: 3px;
            top: 5px;        
        }
        .greendot {
            width: 6px;
            height: 6px;
            background: #00ff2d;
            border-radius: 50%;
            margin-top: -2px;
            margin-right: 5px;
        }
        .reddot {
            width: 6px;
            height: 6px;
            background: red;
            border-radius: 50%;
            margin-top: -2px;
            margin-right: 5px;
        }        
        .boosted{
            animation: hideMe 4s forwards;
        }
        @keyframes hideMe{
            0%{
                opacity: 0;
            }
            50%{
                opacity: 1;
            }    
            100%{
                opacity: 0;
            }
        }`;
        style.id = 'volumeboost_info_style';
        document.body.appendChild(style);
    }
}



function turnOffSkin() {
    skinApplied = false; // Скидаємо guard
    if (document.querySelector('#player_skin'))
        document.querySelector('#player_skin').remove();
    restoreDeafult();
    createImages();
}




function disableButtons() {
    var ids = [];
    for (var key in skins_list) {
        skin = skins_list[key];
        ids.push(skin.id.toString());
    }

    all_buttons = document.querySelectorAll('.main-btn-add');
    all_buttons.forEach(function (button) {
        if (ids.includes(button.dataset.id.toString())) {
            button.classList.add('disabled');
        } else {
            button.classList.remove('disabled');
        }
    });
}

function generate_template(skinData) {
    logDebug('generate_template called with skin:', skinData?.name);
    
    try {
        var files = JSON.parse(skinData.files);
        var template = JSON.parse(skinData.template);
        
        logDebug('Parsed files:', Object.keys(files));
        logDebug('Parsed template:', Object.keys(template));
        
        // Скидаємо guard бо новий скін
        skinApplied = false;
        
        if (files.hasOwnProperty('leftbottom_file'))
            template.leftbottom = 'background-image: url(https://youtube-skins.com' + files.leftbottom_file + ');' + template.leftbottom;
        if (files.hasOwnProperty('lefttop_file'))
            template.lefttop = template.lefttop + ' ' + 'background-image: url(https://youtube-skins.com' + files.lefttop_file + ')';
        if (files.hasOwnProperty('rightbottom_file'))
            template.rightbottom = template.rightbottom + ' ' + 'background-image: url(https://youtube-skins.com' + files.rightbottom_file + ')';
        if (files.hasOwnProperty('righttop_file'))
            template.righttop = template.righttop + ' ' + 'background-image: url(https://youtube-skins.com' + files.righttop_file + ')';
        if (files.hasOwnProperty('ytpgradientbottom_file'))
            template.ytpgradientbottom = template.ytpgradientbottom + ' ' + 'background-image: url(https://youtube-skins.com' + files.ytpgradientbottom_file + ') !important;';
        
        // URL до buttons.svg
        var skinUrl = 'https://youtube-skins.com' + files.buttons;
        logDebug('Skin URL:', skinUrl);
        
        // Зберігаємо оригінальний шаблон якщо ще не збережено
        if (!originalStyleTemplate) {
            originalStyleTemplate = style_template;
        }
        
        // Починаємо з оригінального шаблону
        var processedTemplate = originalStyleTemplate;
        
        // Замінюємо URL скіна
        processedTemplate = processedTemplate.split('$_{skin}').join(skinUrl);
        
        // Замінюємо всі placeholders з template
        for (var key in template) {
            var placeholder = key + ':';
            var value = template[key] || '';
            processedTemplate = processedTemplate.split(placeholder).join(value);
        }
        
        // Оновлюємо глобальну змінну
        style_template = processedTemplate;
        
        logDebug('Template processed successfully, length:', style_template.length);
        logDebug('Contains $_{skin}:', style_template.indexOf('$_{skin}') > -1);
        
        return template;
        
    } catch (error) {
        logDebug('ERROR in generate_template:', error.message, error.stack);
        throw error;
    }
}

chrome.storage.local.get('isOn', function (e) {
    isOn = e.isOn;
    logDebug('Storage: isOn =', isOn);
    
    chrome.storage.local.get('skins', function (e) {
        skins_list = e.skins;
        logDebug('Storage: skins loaded, count:', skins_list?.length);
        disableButtons();
    });
    
    chrome.storage.local.get('current_skin', function (e) {
        logDebug('Storage: current_skin loaded:', e.current_skin?.name);
        
        if (host.indexOf('youtube.com') == -1)
            return;
            
        current_skin = e.current_skin;
        storageLoaded = true;
        
        if (current_skin !== undefined && current_skin !== null && Object.keys(current_skin).length > 0) {
            try {
                var generated_template = generate_template(e.current_skin);
                logDebug('Template generated, calling reload_style');
                reload_style();
            } catch (err) {
                logDebug('ERROR generating template:', err.message, err.stack);
                turnOffSkin();
            }
        } else {
            logDebug('No current_skin, turning off');
            turnOffSkin();
        }
    });
});


