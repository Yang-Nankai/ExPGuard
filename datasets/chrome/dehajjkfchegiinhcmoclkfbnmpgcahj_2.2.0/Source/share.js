var docentURL = document.getElementById('docent-url');
sessionStorage.setItem('docentShareCode', docentURL.dataset.shareCode);
chrome.storage.local.set({docentShareCode: docentURL.dataset.shareCode }, () => {
    window.location = docentURL;
    document.body.innerHTML = '';
});