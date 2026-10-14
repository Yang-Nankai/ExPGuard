var jobSearchId;
var requestUrl;

function runSearchQuery(e) {
    try {

        if (e.target.getAttribute("requestUrl") != null &&
            e.target.getAttribute("jobSearchId") != null) {

            requestUrl = e.target.getAttribute("requestUrl");
            jobSearchId = e.target.getAttribute("jobSearchId");

            //console.log('runSearchQuery');

            chrome.runtime.sendMessage({ url: requestUrl, msType: "search request" }, (response) => {
                triggerSearchResponse(response);
            });
        }
    }
    catch (ex) {

    }
}


function triggerSearchResponse(response) {
    try {

        //console.log('triggerSearchResponse');

        var element = document.getElementById('searchResultElem');
        var elementExist = false;

        if (typeof (element) != 'undefined' && element != null) {

            elementExist = true;
        }
        else {
            element = document.createElement('searchResultElem');
        }

        element.setAttribute('response', response);
        element.setAttribute('jobSearchId', jobSearchId);

        if (elementExist == false) {
            document.documentElement.appendChild(element);
        }

        var event = document.createEvent("Events");

        event.initEvent('search_response_event', true, false);

        element.dispatchEvent(event);

    }
    catch (ex) {

    }
}

//add event listener for keyword tools
document.addEventListener('KTD_EXT_EVENT_SEARCH', runSearchQuery, false, true);

//register extension
document.body.setAttribute('ktd-ext-v3', '1.3');