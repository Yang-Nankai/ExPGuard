var oldHref = '';

function setCounter(cnt) {
    if (!document.querySelector('#skin_button'))
        return;

    cnt = parseInt(cnt);
    document.querySelector('#skin_button').href = "https://youtube-skins.com/?skins=" + cnt;

    noNewSkinsHide = localStorage.getItem('noNewSkinsHide') ? JSON.parse(localStorage.getItem('noNewSkinsHide')) : false;
    isCounterOn = localStorage.getItem('isCounterOn') ? JSON.parse(localStorage.getItem('isCounterOn')) : true;
    if ((noNewSkinsHide) && (parseInt(cnt) === 0))
        document.querySelector('#skin_button').style.display = 'none';
    else
        document.querySelector('#skin_button').style.display = 'block';

    if (!isCounterOn)
        document.querySelector('#skin_button').style.display = 'none';

    cnt = parseInt(cnt);
    if (cnt > 0) {
        document.querySelector('#skins_count').style.display = 'block';
        document.querySelector('#skins_count').innerHTML = cnt;
    } else {
        document.querySelector('#skins_count').style.display = 'none';
    }
}

function getLastSkinData(id) {
    localStorage.setItem('last_update', new Date().getDay());
    fetch('https://youtube-skins.com/checkskins/' + id)
            .then((response) => response.json())
            .then(function (data) {
                localStorage.setItem('noNewSkinsHide', data.noNewSkinsHide);
                localStorage.setItem('isCounterOn', data.isCounterOn);
                if (data.id == 0) {
                    localStorage.setItem('last_skin', data.last);
                } else {
                    localStorage.setItem('skins_count', data.count);
                    setCounter(data.count);
                }
                localStorage.setItem('last_id', data.last);
            });
}


function addSkinBtn() {
    if ((!document.querySelector('#skin_button')) && (document.querySelector('#below #top-level-buttons-computed'))) {
        div_button = document.createElement('a');
        div_button.href = "https://youtube-skins.com/?skins=0";
        div_button.target = "_blank";
        div_button.id = 'skin_button';
        div_button.style.textDecoration = 'none';
        div_button.dataset.count = 0;
        div_button.onclick = function () {
            localStorage.setItem('last_skin', localStorage.getItem('last_id'));
            localStorage.setItem('skins_count', 0);
            document.querySelector('#skins_count').style.display = 'none';
        };
        div_button.innerHTML = `
        <button>
        <span id="skins_count">0</span>
        <div class=""><span class="" role="text">Skins</span></div></button>
    `;

        div_center = document.querySelector('#below #top-level-buttons-computed');
        div_center.appendChild(div_button);
        skins_cnt = localStorage.getItem('skins_count') ? parseInt(localStorage.getItem('skins_count')) : 0;
        setCounter(skins_cnt);
        
        initSkinBtn();
        installSkinButton();
    }
}

function installSkinButton() {
    if (localStorage.getItem('last_update') !== null) {
        last_update = localStorage.getItem('last_update');
        last_skin = localStorage.getItem('last_skin');
        if (last_update != new Date().getDay())
            getLastSkinData(last_skin);
    } else {
        localStorage.setItem('last_skin', '0');
        getLastSkinData(0);
    }
}


function initSkinBtn() {
    if ((location.href.search('shorts') > 0) && (!document.querySelector('#hide_skin')) && (location.href.search("/watch?") < 1)) {
        hide_skin = document.createElement('style');
        hide_skin.id = 'hide_skin';
        hide_skin.innerHTML = '#skin_button{ visibility: hidden;}';
        document.documentElement.appendChild(hide_skin);
    } else if (document.querySelector('#hide_skin'))
        document.querySelector('#hide_skin').remove();
}


window.addEventListener("load", () => {
    var bodyList = document.querySelector("body");

    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            addSkinBtn();
        });
    });

    var config = {
        childList: true,
        subtree: true
    };

    observer.observe(bodyList, config);
});