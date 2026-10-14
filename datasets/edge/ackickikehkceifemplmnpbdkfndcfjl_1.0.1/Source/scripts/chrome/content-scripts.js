document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A') {
        const href = e.target.getAttribute('href');
        if (href.endsWith('.m3u8')) {
            e.preventDefault(); 
            chrome.runtime.sendMessage({ action: "openPlayer", url: href });
        }
    }
});