var cur_src = '';
function alwaysHD() {
    y_player = document.getElementById('movie_player') || document.querySelector('.html5-video-player');
    if (y_player) {
        if (y_player.getAvailableQualityLevels().length !== 0) {
            max_quality = y_player.getAvailableQualityLevels()[0];
            y_player_quality = y_player.getPlaybackQuality();
            if ((max_quality !== y_player_quality) && (cur_src !== location.href)) {
                cur_src = location.href;
                y_player.setPlaybackQuality(max_quality);
                if (y_player.setPlaybackQualityRange) {
                    y_player.setPlaybackQualityRange(max_quality);
                }                
            }
        }
    }

    if (document.documentElement.hasAttribute('data-youtubehd')) {
        setTimeout(alwaysHD, 1000);
    }
}

alwaysHD();