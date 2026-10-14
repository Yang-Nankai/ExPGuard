var sbxAPI = new (function(){
	// Laravel backend API base (same as Vue app) for Firebase auth and KPSB
	var apiUrlLaravel = 'https://app.kiddoware.com/kw_backend_new/public/api/';
	var apiUrl = 'https://app.kiddoware.com/v3/';
	var apiUrlNew = 'https://kpsbproxy.kiddoware.com/';
	
	async function apiCall(method, params, callback, error){
		
		var xhr = new XMLHttpRequest();

		if(method == '/') {

			var firebaseId = await chrome.storage.local.get("fid").then(data => data.fid);
			if(!firebaseId)
			{
				firebaseId = 'pXsDvB2aH1W6VnDFSWUXNPlekPi2';
			}
            //console.log("firebaseId 2222: ",firebaseId);

			params['firebaseId'] = firebaseId;
			
            params['key'] = 'pANbhAvLsUFs/hefbg7DV1MeCImmML8718baEzD';
			params['deviceId'] = sbxSettings('deviceID');
			var requestURL = apiUrlNew + '?' + sbx.param(params);
		} else {
            params['id'] = sbxSettings('deviceID');
			var requestURL = apiUrl + method + '/?' + sbx.param(params);
		}
		
		//console.log("apiCall1: ",params);
		
		function parseJsonResponse(responseText) {
			var trimmed = (responseText || '').trim();
			if (!trimmed || trimmed.charAt(0) !== '{' && trimmed.charAt(0) !== '[') {
				return null;
			}
			try {
				return JSON.parse(responseText);
			} catch (e) {
				return null;
			}
		}

		if (typeof callback == 'function') {
				xhr.onreadystatechange = function() {
					if (xhr.readyState == 4) {
						if (xhr.status == 200){
							var r = parseJsonResponse(xhr.responseText);
							if (r === null && xhr.responseText && xhr.responseText.trim().indexOf('<!DOCTYPE') === 0) {
								if (typeof error == 'function') {
									error('Server returned a web page instead of data. The service may be unavailable or the request was redirected.');
								}
								return;
							}
							if (r) {
								sbxSettings({
									'deviceConnected': r.deviceConnected,
									'endDate' : r.endDate
								});
							}
							if (!r || r && r.error) {
								console.error(r && r.error);
								if (typeof error == 'function') {
									error(r && r.error && r.error.message ? r.error.message : (r && r.error ? String(r.error) : 'Invalid response'));
								}
							}
							else if (r !== null) {
								callback(r.result);
							}
						}
						else if (typeof error == 'function') {
							console.error(xhr.statusText);
							error(xhr.statusText);
						}
					}
				};
				xhr.open("GET", requestURL , true);
				xhr.send();	
		}
		else {
			xhr.open('GET', requestURL, false);  
			xhr.send(null);
			if (xhr.status === 200) {
				var r = parseJsonResponse(xhr.responseText);
				if (r === null && xhr.responseText && xhr.responseText.trim().indexOf('<!DOCTYPE') === 0) {
					return null;
				}
				if (r) {
					sbxSettings({
						'deviceConnected': r.deviceConnected,
						'endDate' : r.endDate
					});
				}
				return r ? r.result : null;
			}	
			return null;
		}
	}
	
	function privateCall(method, params, callback, error){
		return apiCall('api/' + method, params, callback, error);
	}
	
	function publicCall(method, params, callback, error){
		return apiCall('public_api/' + method, params, callback, error);
	}

	function proxyCall(method, params, callback, error){
		return apiCall(method, params, callback, error);
	}
	
	this.call = apiCall;
	
	this.privateCall = privateCall;
	
	this.publicCall = publicCall;
	
	this.checkUrl = function(url){
		return proxyCall('/', {
			'url': url
		});
	};
	
	/**
	 * Get key using Firebase ID token (same flow as Vue app).
	 * POSTs to Laravel kpsb/public_api/getKey; response format: { result, message, data: { ak, fid, rule } }.
	 */
	function getKeyWithFirebaseToken(idToken, email, callback, error) {
		var url = apiUrlLaravel + 'kpsb/public_api/getKey';
		var body = {
			idToken: idToken,
			id: sbxSettings('deviceID'),
			os: 'chrome',
			deviceName: 'Chrome Browser',
			connectDevice: 1
		};
		var xhr = new XMLHttpRequest();
		xhr.open('POST', url, true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.setRequestHeader('Accept', 'application/json');
		xhr.onreadystatechange = function () {
			if (xhr.readyState !== 4) return;
			var text = xhr.responseText || '';
			var trimmed = text.trim();
			if (trimmed.indexOf('<!DOCTYPE') === 0 || trimmed.indexOf('<') === 0) {
				if (typeof error === 'function') {
					error('Server returned a web page instead of data. Check that the API URL is correct.');
				}
				return;
			}
			var r;
			try {
				r = JSON.parse(text);
			} catch (e) {
				if (typeof error === 'function') error('Invalid server response');
				return;
			}
			if (xhr.status !== 200 || (r.result && r.result === 'failed')) {
				if (typeof error === 'function') {
					error(r.message || r.error || xhr.statusText || 'Request failed');
				}
				return;
			}
			var data = r.data || r;
			var fid = data.fid || data.ak;
			chrome.storage.local.set({ fid: fid });
			sbxSettings({
				'ak': data.ak,
				'fid': fid,
				'email': email || '',
				'deviceConnected': 'yes',
				'endDate': data.endDate || ''
			});
			if (typeof callback === 'function') {
				callback({ ak: data.ak, fid: fid, rule: data.rule });
			}
		};
		xhr.onerror = function () {
			if (typeof error === 'function') error('Network error');
		};
		xhr.send(JSON.stringify(body));
	}

	this.getKey = function(params, callback, error){
		params['os'] = "chrome";	
		params['deviceName'] = "Chrome Browser";
		params['connectDevice'] = 1;

		// Firebase Auth: use ID token and POST to Laravel
		if (params.idToken) {
			return getKeyWithFirebaseToken(params.idToken, params.email, callback, error);
		}

		// Legacy: email + MD5 password (GET) – may not work if backend expects Firebase only
		return publicCall('getKey', params, function(r){
			chrome.storage.local.set({ fid: r.fid });
			sbxSettings({
				'ak' : r.ak,
				'fid' : r.fid,
				'email': params.l
			});
			callback(r);
		}, error);
	};
	
	this.getFavorites = function(callback){
		return publicCall('getFavorites', {}, function(r){
			callback(r.favorites);
		});
	};
	
	this.authorized = function(){
		return (sbxSettings('deviceConnected') && sbxSettings('deviceConnected') != "no");
	};
	
	return this;
	
})();
