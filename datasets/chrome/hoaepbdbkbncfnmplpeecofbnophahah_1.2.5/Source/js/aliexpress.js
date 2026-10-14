document.addEventListener('DOMContentLoaded', function() {
    addImportButtonAction();
    addSupportLink();
    addLogout();
}, false);

function extractDOMAndSend() {
    let productInformation = {}
    let scripts = document.scripts
    for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].innerText !== '' && scripts[i].innerText.includes('window.runParams')) {
            let scriptTagContent = scripts[i].innerText;

            scriptTagContent = scriptTagContent.replace('window.runParams = {', '').trim()
            scriptTagContent = scriptTagContent.replace('window._d_c_ = window._d_c_ || {};', '').trim()
            scriptTagContent = scriptTagContent.replace('window._d_c_.viewName = \'newDetail\';', '').trim()
            scriptTagContent = scriptTagContent.replace('window._d_c_.isCSR = false;', '').trim()
            scriptTagContent = scriptTagContent.replace('data: ', '').trim()
            scriptTagContent = scriptTagContent.replace('};', '').trim()

            try {
                let parsedProductInformation = JSON.parse(scriptTagContent)

                productInformation = {
                    productInfoComponent: parsedProductInformation.PRODUCT_TITLE ?? null,
                    imageComponent: parsedProductInformation.HEADER_IMAGE_PC ?? null,
                    productDescriptionComponent: parsedProductInformation.DESC ?? null,
                    priceComponent: parsedProductInformation.PRICE ? parsedProductInformation.PRICE.targetSkuPriceInfo : null,
                    variantComponent: parsedProductInformation.SKU ? parsedProductInformation.SKU.skuProperties : [],
                };
            } catch (error) {
                console.log('error while parsing product info ', error.message)
            }
            break;
        }
    }
    chrome.runtime.sendMessage({
        type: 'PRODUCT_DETAIL',
        data: productInformation,
        url: document.location.href.split('?')[0]
    })
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'updatePopup') {
        document.querySelector('#in-progress-message').innerHTML = '';
        if (message.data.data.status === 'success') {
            document.querySelector('#success-message').innerHTML = 'Product added to your import list.';

            setTimeout(function() {
                document.querySelector('#success-message').innerHTML = '';
            }, 2000);
        } else {
            document.querySelector('#error-message').innerHTML = message.error_message ?? 'Something went wrong. Please try again.';
            setTimeout(function() {
                document.querySelector('#error-message').innerHTML = '';
            }, 2000);
        }
    }
});

function addImportButtonAction() {
    document.getElementById("import").addEventListener("click", function() {
        // display the in progress message
        $('#in-progress-message').append('Gathering product data...');

        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, (tabs) => {
            const activeTab = tabs[0];
            chrome.scripting.executeScript({
                target: {
                    tabId: activeTab.id
                },
                function: extractDOMAndSend,
            })
        });
    });
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
