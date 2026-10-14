document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(['email'], function(result) {
        // if the user has logged in and saved his email
        if (result['email'] !== undefined && result['email'] != null && result['email'] !== '') {
            // check the current tab url
            chrome.tabs.query({
                active: true,
                lastFocusedWindow: true
            }, function(tabs) {
                // get the url
                var current_tab_url = tabs[0].url;
                var pattern = /\b(aliexpress\.)\b(.*?)\/item\//;
                // if we're on an aliexpress item page
                if (pattern.test(current_tab_url)) {
                    // redirect to aliexpress page
                    window.location.href = '/html/aliexpress.html';
                } else {
                    // else redirect to non aliexpress page
                    window.location.href = '/html/non_aliexpress.html';
                }
            });
        } else {
            // redirect to the login page
            window.location.href = '/html/login_page.html';
        }
    })
});