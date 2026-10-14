var skins_list, current_skin = {};
domain = 'https://youtube-skins.com';
host = location.host.split('www.').join('');
skin = '';
isOn = false;

document.addEventListener('DOMContentLoaded', function () {
    if (host.indexOf('youtube-skins.com') > -1) {
        disableButtons();
        document.body.dataset.ex = chrome.runtime.id;
        document.body.dataset.youtubeskins = chrome.runtime.id;
        document.body.dataset.installed = 1;
    }

    if (host.indexOf('youtube.com') > -1) {
        needToReload();
        boostVolumenStyle();
        if (current_skin == undefined) {
            turnOffSkin();
            return;
        }
        if (isOn) {
            turnOnSkin();
        } else
            turnOffSkin();
    }
});
function reload_style() {
    if (document.readyState === "complete" || document.readyState === "loaded") {
        if (location.href.indexOf('youtube') > 0) {
            if (current_skin == undefined) {
                turnOffSkin();
                return;
            }
            if (isOn)
                turnOnSkin();
            else
                turnOffSkin();
        }
    }
}

function turnOnSkin() {
    hideElements();
    if (document.querySelector('#player_skin') !== null)
        player_skin.remove();
    style = document.createElement('style');
    style.innerHTML = style_template;
    style.id = 'player_skin';
    document.body.appendChild(style);
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

function generate_template(skin) {
    files = JSON.parse(skin.files);
    template = JSON.parse(skin.template);
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
    skin = 'https://youtube-skins.com' + files.buttons;
    style_template = style_template.split('$_{skin}').join(skin);
    for (key in JSON.parse(current_skin.template)) {
        style_template = style_template.split(key + ':').join(template[key]);
    }

    return template;
}

chrome.storage.local.get('isOn', function (e) {
    isOn = e.isOn;
    chrome.storage.local.get('skins', function (e) {
        skins_list = e.skins;
        disableButtons();
    });
    chrome.storage.local.get('current_skin', function (e) {
        if (host.indexOf('youtube.com') == -1)
            return;
        current_skin = e.current_skin;
        if (current_skin !== undefined) {
            try {
                generated_template = generate_template(e.current_skin);
                reload_style();
            } catch (e) {
            }
        } else {
            turnOffSkin();
        }
    });
});


