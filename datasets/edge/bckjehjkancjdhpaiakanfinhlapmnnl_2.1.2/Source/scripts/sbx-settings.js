var sbxSettings = new (function(){
	
	var _sbxSettings = {
		'deviceID' : null,
		'deviceConnected' : 0,
		'email' : null,
		'ak': null,
		'fid': null,
		'block': true,
		'notifyOnBlock': false,
		'endDate':	new Date()
	};
	
	function saveSettings() {
		chrome.storage.sync.set(_sbxSettings);
	}
	
	function loadSettings(callback) {
		chrome.storage.sync.get(_sbxSettings, function(items) {
			_sbxSettings = items;
			
			if (!_sbxSettings.deviceID) {
				_sbxSettings.deviceID = generateUUID();
				saveSettings();
			}
			
			if (typeof callback == 'function') {
				callback.call(_sbxSettings, _sbxSettings);
			}
		});
		return true;
	}

    function generateUUID(){
        var d = new Date().getTime();
        if(window.performance && typeof window.performance.now === "function"){
            d += performance.now();; //use high-precision timer if available
        }
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
    }
	
	chrome.storage.onChanged.addListener(function(changes, namespace) {
        for (key in changes) {
        	_sbxSettings[key] = changes[key].newValue;

			console.log('"%s" in namespace "%s" changed. ' +
                      'Old value was "%s", new value is "%s".',
                      key,
                      namespace,
					changes[key].oldValue,
					changes[key].newValue);

        }
    });
	
	loadSettings();
	
	return function(key, val){
		if (typeof key == 'function') {
			return loadSettings(key);
		}
		if (typeof key == 'object') {
			for (i in key) {
				_sbxSettings[i] = key[i];
			}
			saveSettings();
			return key;
		}
		else if (typeof val == 'undefined' && typeof key == 'undefined') {
			return _sbxSettings;
		}
		else if (typeof val == 'undefined') {
			return _sbxSettings[key];
		}
		_sbxSettings[key] = val;
		saveSettings();
		return val;
	};
})();