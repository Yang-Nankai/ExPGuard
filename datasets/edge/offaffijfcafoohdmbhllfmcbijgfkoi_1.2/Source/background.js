importScripts("browser-polyfill.js");

browser.runtime.onMessage.addListener(async (request, sender) => {
  var getServiceUrl = new Promise(function (resolve, reject) {
        var servurl = "";
        findStorage().get(["serviceUrl"], function (items) {
            servurl = items.serviceUrl;
            if (!servurl) {
                servurl = "http://localhost:9871/";
                findStorage().set({ 'serviceUrl': servurl }, function () {
                    console.log('Value is set to ' + servurl);
                });
            }
            resolve(servurl);
        })
    });
	
	return getServiceUrl.then(function (serviceUrl) {
        if (!serviceUrl) {
            return Promise.resolve({ success: false, error: "No serviceUrl is provided in extension" });
        }
        var url = serviceUrl;
        if (serviceUrl.substr(serviceUrl.length - 1, 1) == "/") {
            url = url + "EpsilonSmartService/";
        }
        else {
            url = url + "/EpsilonSmartService/";
        }
        var url = url + request.operation;

        request.method = request.method ? request.method : "GET";
        let fetchParameters = {
            method: request.method,
            headers: {
                'Content-Type': 'application/json',
            }
        };
        
        if (request.data) {
            if (request.method.toLowerCase() == "get") {
                url = buildUrl(url, request.data);
            }
            else {
                fetchParameters.body = JSON.stringify(request.data);
            }
        }

        return fetch(url, fetchParameters).then(function (response) {
            if (response.ok) {
                return response.json();
            }

            throw new Error("Error during request to '" + url + "': Status =>" + response.status + ", StatusText =>" + response.statusText);
        }).then(function (responseData) {
            return { success: true, data: responseData };
        }).catch(function (error) {
            return { success: false, error: error && error.message ? error.message : (error + "error durring request") };
        });
    });
});

function findStorage() {
    if (chrome.storage !== undefined && chrome.storage.local !== undefined) {
        return chrome.storage.local;
    }
    else {
        return browser.storage.local;
    }
}

function buildUrl(url, parameters) {
    var qs = "";
    for (var key in parameters) {
        var value = parameters[key];
        qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
    }
    if (qs.length > 0) {
        qs = qs.substring(0, qs.length - 1); //chop off last "&"
        url = url + "?" + qs;
    }
    return url;
}