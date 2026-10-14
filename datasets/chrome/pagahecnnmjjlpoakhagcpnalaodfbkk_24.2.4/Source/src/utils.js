function encodeQueryData(data) {
    const ret = [];
    for (let d in data) ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    return ret.join('&');
}

function getBackgroundLocalStorageValue(key, sendResponse) {
    chrome.runtime.sendMessage(chrome.runtime.id, { type: 'local_storage', key }, sendResponse);
}

function getSendyURL(query, sendResponse) {
    let url;
    getBackgroundLocalStorageValue('host_name_prefix', function (value) {
        let hostName;

        if (value == 'dev' || value === 'app-test') {
            hostName = HOST_NAME_DEV;
        } else if (value == 'stg' || value === 'app-staging') {
            hostName = HOST_NAME_STG;
        } else {
            hostName = HOST_NAME;
        }

        if (query) {
            const encodedQuery = encodeQueryData(query);
            url = `${hostName}/extension/?${encodedQuery}`;
        } else {
            url = `${hostName}/extension/`;
        }

        sendResponse(url);
    });
}
