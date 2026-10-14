document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (!key) return;
    element.textContent = chrome.i18n.getMessage(key);
});
