var contentCreateInstanceReqId = "";
var contentInstanceId = "";

function getTimeStamp() {
    var now = new Date();
    return ((now.getMonth() + 1) + '/' +
            (now.getDate()) + '/' +
             now.getFullYear() + " " +
             now.getHours() + ':' +
             ((now.getMinutes() < 10)
                 ? ("0" + now.getMinutes())
                 : (now.getMinutes())) + ':' +
             ((now.getSeconds() < 10)
                 ? ("0" + now.getSeconds())
                 : (now.getSeconds())));
}

function postMessageToPage(_req) {
    try
    {
        if ("instance_created" == _req.action)
        {
            if ("" == contentInstanceId && contentCreateInstanceReqId == _req.req_id)
            {
                contentInstanceId = _req.instance_id;
                contentCreateInstanceReqId = "";
                console.log("Сontent: got instance ID " + contentInstanceId);
            }
        }
        else if  ("instance_destroyed" == _req.action)
        {
            if (contentInstanceId == _req.instance_id)
            {
                console.log("Сontent: clearing instance ID " + contentInstanceId);
                contentInstanceId = "";
            }
        }
    
        var msg = {};
        msg["type"] = "BPCLIENT_TO_PAGE";
        msg["msg"] = _req;
        window.postMessage(msg, "*");

//		console.log(getTimeStamp() + " Content: sent message to page: " + JSON.stringify(_req));
    }
    catch(e)
    {
        console.log("Content script exception: " + e.message);
    }
}

console.log("Loading Agent Desktop browser Extension content script");

//	The DIV element is for the parent HTML page to see if extension is installed
if (document.getElementById('ADHelperCheck'))
{
    console.log("Initializing AD Helper extension for the frame");

    var manifest = chrome.runtime.getManifest();
    var isInstalledNode = document.createElement('div');
    
    isInstalledNode.id = 'iCSIMExtensionInstalled';
    isInstalledNode.setAttribute("ext_version", manifest.version);
    document.body.appendChild(isInstalledNode);

    console.log("Agent Desktop browser Extension check DOM element added, id: " + isInstalledNode.id);

    window.addEventListener("message", function(event) {
        // We only accept messages from ourselves
        if (event.source != window)
            return;

        if (event.data.type && (event.data.type == "PAGE_TO_BPCLIENT")) {
            if ("create_instance" == event.data.msg.action)
                contentCreateInstanceReqId = event.data.msg.req_id;

            try {
                chrome.runtime.sendMessage(event.data.msg);
            } catch(e) {
                if (e.message.toLowerCase().includes("context invalidated")) {
                    console.log(`exception calling an extension`);
                    postMessageToPage({action: 'extension_updated'})
                }
            }
//			console.log(getTimeStamp() + " Content: sent message to extension: " + JSON.stringify(event.data.msg));
        }
    }, false);

    
    window.addEventListener("unload", function() {
        console.log("Сontent: unload; instance ID " + contentInstanceId);
        
        if ("" != contentInstanceId) {
            console.log("Content: destroying instance");

            var req = {};
            req.action = "destroy_instance";
            req.instance_id = contentInstanceId;

            try {
                chrome.runtime.sendMessage(req);
            } catch(e) {
                if (e.message.toLowerCase().includes("context invalidated")) {
                    console.log(`exception calling an extension`);
                }
            }
        }

        //	Report unloaded AD tab to background extension script
        try {
            chrome.runtime.sendMessage({action: "ad_tab_unloaded"});
        } catch(e) {
        }
    }, false);

    chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
        postMessageToPage(msg);
    });

    //	Report loaded AD tab to background extension script
    chrome.runtime.sendMessage({ action: "ad_tab_loaded" }, function (tabId) {
        console.log('My tabId is', tabId);
    });
}
else
    console.log("Frame is not Agent Desktop, not initializing helper extension");
