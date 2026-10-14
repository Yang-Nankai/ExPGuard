window.addEventListener('message', function (e) {
    if (e.origin != 'https://qwerpdf.com' && e.origin != 'https://www.qwerpdf.com') {
        return false;
    }

    if (localStorage.getItem('__debug')) {
        console.log('Content script receiving: ');
        console.log(e);
    }

    chrome.runtime.sendMessage(e.data, (res) => {
        if (chrome.runtime.lastError) {
            
        }

        if (localStorage.getItem('__debug')) {
            console.log('Content script sending: ');
            console.log(sender);
        }
    });
});
