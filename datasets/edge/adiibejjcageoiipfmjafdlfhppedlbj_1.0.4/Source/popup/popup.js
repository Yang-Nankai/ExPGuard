document.addEventListener('DOMContentLoaded', function () {

    var URL = 'https://dddz.dalualex.com';

    chrome.tabs.create({ url: URL + '/index.html' });

});