
function getRuntimeId() {
	var d = new Date().getTime();
	d += (parseInt(Math.random() * 100)).toString();
	d = "runtime-" + d;
	return d;
}
var runtimeId = getRuntimeId();

function postStorageMessageToPage(payload) {
	try {
		var msg = {};
		msg["type"] = "BPATTERN_STORAGE_IN";
		msg["msg"] = payload;
		window.postMessage(msg, "*");
	} catch (err) {
		console.error("Extension storage: exception: ", err);
	}
}

console.log("Loading Agent Desktop browser Extension content script [storage]. Runtime ID " + runtimeId);

if (document.getElementById("ADHelperCheck") || document.getElementById("ADSharedStorageCheck")) {

    var manifest = chrome.runtime.getManifest();
	var isInstalledNode = document.createElement("div");
	
	isInstalledNode.id = "iCSIMExtensionStorageEnabled";
	isInstalledNode.setAttribute("ext_version", manifest.version);
	document.body.appendChild(isInstalledNode);

	window.addEventListener("message", function(event) {
		// We only accept messages from ourselves
		if (event.source != window || event.isTrusted == false) {
            return;
        }
        if (event.data.type != "BPATTERN_STORAGE_OUT") {
            return;
        }

        var origin = event.origin;
        var msg = event.data.msg;
        var keyOriginPrefix = origin + "_";
        var key = keyOriginPrefix + msg.key;

        function respondWithError(err) {
            postStorageMessageToPage({
                action: "response",
                request_id: msg.request_id,
                data: {
                    status: "failure",
                    error: err
                }
            });
        }

        function resolveResult(promise, transform) {
            promise.then(function (result) {
                postStorageMessageToPage({
                    action: "response",
                    request_id: msg.request_id,
                    data: {
                        status: "success",
                        result: transform ? transform(result) : result
                    }
                });
            }).catch(function (err) {
                console.error("Extension storage: chrome.storage.local catch: ", err);
                respondWithError(err);
            });
        }

        try {
            switch (msg.action) {
                case "get_item":
                    resolveResult(chrome.storage.local.get([key]), function (result) {
                        var data = result[key];
                        return (data &&  typeof data === 'object' && 'value' in data) ? data.value : undefined;
                    });
                    break;
                case "get_all":
                    resolveResult(chrome.storage.local.get(null), function (result) {
                        var originStorage = {};
                        for (var key in result) {
                            if (key.indexOf(keyOriginPrefix) == 0) {
                                var data = result[key];
                                var value = (data &&  typeof data === 'object' && 'value' in data) ? data.value : undefined;
                                originStorage[key.substring(keyOriginPrefix.length)] = value;
                            }
                        }
                        return originStorage;
                    });
                    break;
                case "set_item": {
                    var packedItem = {
                        value: String(msg.value),
                        runtimeId: runtimeId
                    }
                    resolveResult(chrome.storage.local.set({[key]: packedItem}));
                    break;
                }
                case "remove_item":
                    resolveResult(chrome.storage.local.remove([key]));
                    break;
                case "clear":
                    resolveResult(
                        chrome.storage.local.get(null)
                        .then(function (fullStorage) {
                            return chrome.storage.local.remove(
                                Object.keys(fullStorage)
                                .filter(function (key) {
                                    return key.indexOf(keyOriginPrefix) == 0;
                                })
                            );
                        }),
                        function() {
                            return undefined;
                        }
                    );
                    break;
                case "keys":
                    resolveResult(chrome.storage.local.get(null), function (result) {
                        return Object.keys(result)
                        .filter(function (key) {
                            return key.indexOf(keyOriginPrefix) == 0;
                        });
                    });
                    break;
                default:
                    console.warn("Extension storage: get unknown action " + msg.action);
                    break;
            }
        } catch (err) {
            console.error("Extension storage: method error: ", err);
            respondWithError(err);
        }
    }, false);

	chrome.storage.onChanged.addListener(function (changedData, area) {
		if (area != "local") {
			return;
		}
		var changedKeys = Object.keys(changedData);
		for (var i = 0; i < changedKeys.length; ++i) {
			var key = changedKeys[i];
			var oldValueData = (changedData[key].oldValue && typeof changedData[key].oldValue == 'object')
				? changedData[key].oldValue
				: undefined;
			var newValueData = (changedData[key].newValue && typeof changedData[key].newValue == 'object')
                ? changedData[key].newValue
                : undefined;
            var eventRuntimeId = newValueData ? newValueData.runtimeId : oldValueData.runtimeId;
			if (eventRuntimeId == runtimeId) {
				// Don't fire "storage" event for changes made by current page
				break;
			}
            var origin = window.location.origin;
            var keyOriginPrefix = origin + "_";
            if (key.indexOf(keyOriginPrefix) != 0) {
                // Don't fire "storage" event fro changes made from different origin
                break;
            }
            var restoredKey = key.substring(keyOriginPrefix.length);

			postStorageMessageToPage({
				action: "storage",
				data: {
					key: restoredKey,
					oldValue: oldValueData ? oldValueData.value : undefined,
					newValue: newValueData ? newValueData.value : undefined
				}
			});
		}
	});

	postStorageMessageToPage({action: "storage_init"});
}
