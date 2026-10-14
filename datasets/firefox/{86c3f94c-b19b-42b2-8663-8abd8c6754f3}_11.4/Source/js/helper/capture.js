async function captureRecipeToCloud() {
    const url = await getTabUrl();
    const sid = await getSessionId();
    const body = {sessionId: sid, url: url};
    const result = await jsonPost(API_CAPTURE_RECIPE, body);
    return result;
}

async function captureRecipeToDesktop() {
    const url = await getTabUrl();
    const param1 = btoa(url);
    let param = btoa(url).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    param = encodeURI(param);
    // console.error('Desktop URL: ' + param); // For debugging
    const apiUrl = 'http://localhost:5918/capture-recipe?d=' + param1 + '&b=' + param;
    const result = await textGet(apiUrl);
    return result;
}

async function getTabUrl() {
    let queryOptions = { active: true, currentWindow: true };
    let tabs = await chrome.tabs.query(queryOptions);
    return tabs[0].url;
}