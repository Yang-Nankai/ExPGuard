document.addEventListener('DOMContentLoaded', function() {
    addAliExpressRedirect();
    addSupportLink();
    addLogout();
}, false);

function addAliExpressRedirect() {
    document.getElementById("redirect-to-ali").addEventListener("click", function() {
        chrome.tabs.create({
            active: true,
            url: "https://www.aliexpress.com/"
        });
    })
}

function addSupportLink() {
    document.getElementById("support").addEventListener("click", function() {
        chrome.tabs.create({
            active: true,
            url: "https://support.zendrop.com"
        });
    })
}

function addLogout() {
    document.getElementById("logout").addEventListener("click", function() {
        // remove the email from local storage
        chrome.storage.local.remove('email');
        // redirect to the login page
        window.location.href = '/html/login_page.html';
    })
}