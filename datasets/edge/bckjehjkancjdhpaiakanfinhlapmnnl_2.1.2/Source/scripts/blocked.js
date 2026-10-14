(function(){

    var params = sbx.parseQuery(window.location.hash.replace('#',''));
    console.log(params);
    document.title = chrome.i18n.getMessage("Page_at_domain_is_blocked").replace("%s", params.domain);

    document.addEventListener('DOMContentLoaded', function () {
        document.title = chrome.i18n.getMessage("Page_at_domain_is_blocked").replace("%s", params.domain);

        sbx.localize();

        var truncUrl = document.getElementById('truncated-url');
        if (truncUrl) {
            truncUrl.innerHTML = params.url.sbxTrunc(50);
            truncUrl.href = params.url;
            truncUrl.title = params.url;
        }

        sbx.each(params, function(elementId, value){
            var el = document.getElementById(elementId);
            if (el) {
                el.innerHTML = value;
                if (el.tagName == 'A') {
                    el.href = value;
                    el.title = value;
                }
            }
        });
    });


})();