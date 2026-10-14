var port = undefined;
var helperUp = false;

var adTabs = new Set();

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

initPort();

chrome.runtime.onMessage.addListener(function(data, sender) {
    if ("reset_port" == data.action) {
        initPort();
    }
    else if ("ad_tab_loaded" == data.action) {
        console.log(getTimeStamp() + " AD tab reported " + sender.tab.id + ": setting non discardable");
        adTabs.add(sender.tab.id);
        chrome.tabs.update(sender.tab.id, {autoDiscardable: false});
        chrome.tabs.sendMessage(sender.tab.id, {action: helperUp ? "helper_up" : "helper_down"});
    }
    else if ("ad_tab_unloaded" == data.action) {
        console.log(getTimeStamp() + " AD tab unloaded " + sender.tab.id);
        adTabs.delete(sender.tab.id);
    }
    else {
        if (helperUp) {
            if ("create_instance" == data.action) {
                data.origin = sender.origin;
                console.log(getTimeStamp() + " creating ADHelper instance for tab " + sender.tab.id + " loaded from " + data.origin);
            }
            port.postMessage(data);
            console.log(getTimeStamp() + " Message sent to native port: " + data.action);
        }
        else {
            chrome.tabs.sendMessage(sender.tab.id, {
                action: "error",
                error_code: 100,
                error_text: "helper not ready",
                req_id: data.req_id
            });
        }
    }
});

function isChrome() { return -1 != navigator.userAgent.toLowerCase().search("chrome"); }

function sendMessageToAgentDesktopTabs(msg) {
    chrome.tabs.query({}, function (tabs) {
        for (var i = 0; i < tabs.length; ++i) {
            if (adTabs.has(tabs[i].id))
                chrome.tabs.sendMessage(tabs[i].id, msg);
        }
    });
}

function initPort()
{
    if (!isChrome())
    {
        console.log("This is only supported in Chrome browser");
    }
    else
    {
        //	Already started and connected
        if (undefined != port) {
            return;
        }
        
        try
        {
            port = chrome.runtime.connectNative('com.brightpattern.bpclient');
        }
        catch(e)
        {
            console.log("Exception while creating native port: " + e.message);
        }
        
        if (port != undefined)
        {
            port.onMessage.addListener(function(msg) {
                console.log(getTimeStamp() + " Message received from native port: " + msg.action);
                
                if ("helper_connected" == msg.action)
                {
                    helperUp = true;
                    msg.action = "helper_up";
                }
                else if ("helper_disconnected" == msg.action)
                {
                    helperUp = false;
                    msg.action = "helper_down";
                }
                
                if ("__ping__" == msg.action)
                {
                    var pong = {};
                    pong.action = "__pong__";
                    pong.instance_id = msg.instance_id;

                    port.postMessage(pong);
                    console.log(getTimeStamp() + " Message sent to native port: " + pong.action);
                }
                else
                {
                    sendMessageToAgentDesktopTabs(msg);
                }
            });
            
            port.onDisconnect.addListener(function() {
                console.log("Port disconnected");
                
                helperUp = false;

                //	Notify all tabs of all windows
                var msg = {action: "helper_down"};

                sendMessageToAgentDesktopTabs(msg);

                port = undefined;
            });		
        }
        else
        {
            console.log("Unable to create native port");
        }
    }		
}
