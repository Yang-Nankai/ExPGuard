chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    processRequest(request).then(sendResponse);
    return true;
});

async function processRequest(message) {

    console.log(message);

    try {
        if (message.msType == "search request") {

            var rspText = await getResponse(message.url);

            return rspText;
        }
    }
    catch (error) {
        console.log('onMessage error: ' + error);
    }

    return "";
}

async function getResponse(url) {

    try {

        console.log('runnig fetch');

        const response = await fetch(url);

        if (response.ok) {
            return response.text();
        }
        else if (response.status == 403) {
            return '403 Error <br/>' + response.text();
        }

    } catch (error) {
        console.log('fetch error: ' + error);
    }

    return "";
}



