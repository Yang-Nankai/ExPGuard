/* Copyright (C) 2020 claycodes.org - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Clay Smith <clay@claycodes.org>, 2020
 */

var subscriptionStatus = false
function localizeHtmlPage() {
    //Localize by replacing __MSG_***__ meta tags
    var objects = document.getElementsByTagName('html');
    for (var j = 0; j < objects.length; j++) {
        var obj = objects[j];

        var valStrH = obj.innerHTML.toString();
        var valNewH = valStrH.replace(/__MSG_(\w+)__/g, function (match, v1) {
            return v1 ? chrome.i18n.getMessage(v1) : "";
        });

        if (valNewH != valStrH) {
            obj.innerHTML = valNewH;
        }
    }
}

$(document).ready(function () {
    localizeHtmlPage();
    $('.collapsible').collapsible();
    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        if (message.type == 'subscription') {
            console.log('subscription', message)
            subscriptionStatus = message.subscription
            if(subscriptionStatus){
                $('#subscriptionstatus').hide()
            }
        }
    })
    chrome.storage.sync.get(['subscription'],function (result) {
        if(result.subscription){
            $('#subscriptionstatus').hide()
        }
    })
    $('#subscriptionstatus').on('click', function(res){
        chrome.storage.sync.set({subclick:new Date().getTime()})
    })
    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems);
});


