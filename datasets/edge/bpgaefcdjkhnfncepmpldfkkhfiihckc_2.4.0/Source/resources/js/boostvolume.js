boostvolume = false;

function setBooster(e) {
    volumeLevel = e.volume * 100;
    youtubeVolumeLevel = parseInt(document.querySelector('.ytp-volume-panel').ariaValueNow);
    if (!e.hasAttribute('data-original-volume')) {
        e.dataset.originalVolume = (volumeLevel / youtubeVolumeLevel) * 100;
    }

    if (volumeLevel != youtubeVolumeLevel) {
        e.volume = youtubeVolumeLevel / 100;

//        if (!volumeboost_info.classList.contains('boosted')) {
//            setTimeout(function () {
//                volumeboost_info.innerHTML = '<span class="greendot"></span>VOLUME BOOSTED';
//                volumeboost_info.classList.add('boosted');
//            }, 1000);
//        }
    } else if (!e.hasAttribute('data-noboost')) {
        e.dataset.noboost = true;
//        if (!volumeboost_info.classList.contains('boosted')) {
//            setTimeout(function () {
//                volumeboost_info.innerHTML = '<span class="reddot"></span>VOLUME BOOST NOT AVAILABLE';
//                volumeboost_info.classList.add('boosted');
//            }, 1000);
//        }
    }

}

function removeBooster() {
    //if (document.querySelector('#volumeboost_info'))  volumeboost_info.className = '';
    if (document.getElementsByTagName('video')[0].hasAttribute('data-original-volume')) {
        youtubeVolumeLevel = parseInt(document.querySelector('.ytp-volume-panel').ariaValueNow);
        volumeLevelOriginal = document.getElementsByTagName('video')[0].dataset.originalVolume;
        diff = (volumeLevelOriginal / 100) * youtubeVolumeLevel;
        document.getElementsByTagName('video')[0].volume = diff / 100;
    }

    if (document.getElementsByTagName('video')[0].hasAttribute('data-original-volume'))
        document.getElementsByTagName('video')[0].removeAttribute('data-original-volume');
}

function checkVolumeBooster(target) {
    if (location.href.indexOf('youtube') > 0) {
        chrome.storage.local.get('boostvolume', function (e) {            
            boostvolume = e.boostvolume;
            if (boostvolume)
                setBooster(target);
            else
                removeBooster(target);
        });
    }
}


if (document.readyState === "complete" || document.readyState === "loaded") {
    checkVolumeBooster(document.getElementsByTagName('video')[0]);
}