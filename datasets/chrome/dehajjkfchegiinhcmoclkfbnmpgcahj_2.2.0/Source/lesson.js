var docentURL = document.getElementById('docent-url');
let {docentId: docentID, elementId: elementID } = docentURL.dataset;
localStorage.setItem('docentID', docentID);
localStorage.setItem('docentURL', docentURL.href);
sessionStorage.removeItem('docentShareCode');
sessionStorage.setItem('docentID', docentID);
sessionStorage.setItem('elementID', elementID);

chrome.storage.local.remove('docentShareCode', () => {
    chrome.storage.local.set(sessionStorage, () => {
        window.location = docentURL;
        document.body.innerHTML = '';
    });
});
