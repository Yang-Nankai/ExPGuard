function getBuyerNick() {
    try {
        if (window.FE_GLOBALS && window.FE_GLOBALS.loginId != null) {
            return window.FE_GLOBALS.loginId;
        }
    } catch (e) {
        console.error('Error getting buyer nick:', e);
    }
    return '';
}

function waitForBuyerNick(callback, maxAttempts = 20, interval = 200) {
    let attempts = 0;

    function check() {
        attempts++;
        const nick = getBuyerNick();

        if (nick) {
            callback(nick);
            return;
        }

        if (attempts >= maxAttempts) {
            callback('');
            return;
        }

        setTimeout(check, interval);
    }

    check();
}

waitForBuyerNick(function(nick) {
    isLogin1688 = nick;
    buyer_nick = nick;
    window.postMessage({ type: 'FROM_PAGE', isLogin1688: isLogin1688, buyer_nick: buyer_nick }, '*');
}, 5, 50);
