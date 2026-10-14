let appHost = '';

// Promisify chrome.storage.local.get
function getLocalData(key) {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get([key], function(result) {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve(result[key]);
            }
        });
    });
}

// Function to send DOM content to the server
function sendToServer(content) {
    const url = appHost + 'api/chrome-extension-import-from-aliexpress';

    if (content.data?.productInfoComponent === null || content.data?.productInfoComponent === undefined) {
        chrome.runtime.sendMessage({
            type: 'updatePopup',
            data: 'error',
            error_message: 'Error while gathering product information. Please try again later.'
        });
    } else {
        chrome.storage.local.get(['email'], function(result) {
            // Get the email
            let email = result['email'];

            const requestData = {
                email: email,
                productData: content.data,
                url: content.url,
            };

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })
              .then((response) => response.json())
              .then((data) => {
                  chrome.runtime.sendMessage({
                      type: 'updatePopup',
                      data: data
                  });
              })
              .catch((error) => {
                  chrome.runtime.sendMessage({
                      type: 'updatePopup',
                      data: error
                  });
              });
        });
    }
}

async function fetchData() {
    try {
        appHost = await getLocalData('appHost');
    } catch (error) {
        chrome.runtime.sendMessage({
            type: 'updatePopup',
            data: error
        });
    }
}

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'LOGIN_TO_EXTENSION') {
        chrome.storage.local.set({
            'email': message.email
        }, function() {})
    } else if (message.type === 'LOGOUT_TO_EXTENSION') {
        chrome.storage.local.remove('email');
    } else if (message.type === 'PRODUCT_DETAIL') {
        fetchData().then(r => sendToServer(message));
    }
});