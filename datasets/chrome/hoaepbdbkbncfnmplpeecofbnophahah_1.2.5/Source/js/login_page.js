var loginHost = 'https://account.zendrop.com/';

async function getZendropExtensionEnvironment() {
    let appHost = 'https://app.zendrop.com/';
    let extensionEnvironment = [];
    let tabs = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    let tab = tabs[0];

    try {
        extensionEnvironment = await chrome.scripting.executeScript({
            target: {
                tabId: tab.id
            },
            function: () => localStorage['zendrop_extension_environment']
        });
    } catch (error) {
        console.log(error)
    }

    switch (extensionEnvironment[0] && extensionEnvironment[0].result) {
        case 'staging':
            loginHost = 'https://account.staging.zendrop.com/';
            appHost = 'https://app.staging.zendrop.com/';
            break;
        case 'development':
            loginHost = 'http://account.local.zendrop.io/';
            appHost = 'http://app.local.zendrop.io/';
            break;
    }
    chrome.storage.local.set({
        'appHost': appHost
    }, function() {})
};

function addSignUpLink() {
    document.getElementById("SignUpLink").addEventListener("click", function() {
        chrome.tabs.create({
            active: true,
            url: loginHost + "register?from=extension"
        });
    })
}

function addLoginButtonAction() {
    document.getElementById("login-button").addEventListener("click", function() {
        let loginUrl = loginHost + 'check-login';
        chrome.tabs.create({ url: loginUrl })
        window.close();
    })
}

async function fetchExtensionEnvironment(argument) {
    await getZendropExtensionEnvironment();
    addSignUpLink();
    addLoginButtonAction();
}

document.addEventListener('DOMContentLoaded', function() {
    fetchExtensionEnvironment();
}, false);