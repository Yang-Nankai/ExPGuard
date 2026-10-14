var sbx = new (function(){
    var sbx = this;

    var r20 = /%20/g,
        rbracket = /\[\]$/,
        rCRLF = /\r?\n/g,
        rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
        rsubmittable = /^(?:input|select|textarea|keygen)/i;
    var class2type = {};

    String.prototype.sbxTrunc = function(n){
        return this.substr(0,n-1)+(this.length>n?'&hellip;':'');
    };

    this.extend = function() {
        var src, copyIsArray, copy, name, options, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        if ( typeof target === "boolean" ) {
            deep = target;

            // skip the boolean and the target
            target = arguments[ i ] || {};
            i++;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if ( typeof target !== "object" && !sbx.isFunction(target) ) {
            target = {};
        }

        // extend jQuery itself if only one argument is passed
        if ( i === length ) {
            target = this;
            i--;
        }

        for ( ; i < length; i++ ) {
            // Only deal with non-null/undefined values
            if ( (options = arguments[ i ]) != null ) {
                // Extend the base object
                for ( name in options ) {
                    src = target[ name ];
                    copy = options[ name ];

                    // Prevent never-ending loop
                    if ( target === copy ) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if ( deep && copy && ( sbx.isPlainObject(copy) || (copyIsArray = sbx.isArray(copy)) ) ) {
                        if ( copyIsArray ) {
                            copyIsArray = false;
                            clone = src && sbx.isArray(src) ? src : [];

                        } else {
                            clone = src && sbx.isPlainObject(src) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[ name ] = sbx.extend( deep, clone, copy );

                        // Don't bring in undefined values
                    } else if ( copy !== undefined ) {
                        target[ name ] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    };


    function buildParams( prefix, obj, traditional, add ) {
        var name;

        if ( sbx.isArray( obj ) ) {
            // Serialize array item.
            sbx.each( obj, function( i, v ) {
                if ( traditional || rbracket.test( prefix ) ) {
                    // Treat each array item as a scalar.
                    add( prefix, v );

                } else {
                    // Item is non-scalar (array or object), encode its numeric index.
                    buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
                }
            });

        } else if ( !traditional && sbx.type( obj ) === "object" ) {
            // Serialize object item.
            for ( name in obj ) {
                buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
            }

        } else {
            // Serialize scalar item.
            add( prefix, obj );
        }
    }

    this.parseQuery = function( queryString ) {
        var params = {}, queries, temp, i, l;

        // Split into key/value pairs
        queries = queryString.split("&");

        // Convert the array of strings into an object
        for ( i = 0, l = queries.length; i < l; i++ ) {
            temp = queries[i].split('=');
            params[temp[0]] = decodeURIComponent(temp[1]);
        }

        return params;
    };

    this.param = function( a, traditional ) {
        var prefix,
            s = [],
            add = function( key, value ) {
                // If value is a function, invoke it and return its value
                value = sbx.isFunction( value ) ? value() : ( value == null ? "" : value );
                s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
            };

        // Set traditional to true for jQuery <= 1.3.2 behavior.
        if ( traditional === undefined ) {
            traditional = false;
        }

        // If an array was passed in, assume that it is an array of form elements.
        if ( sbx.isArray( a ) ) {
            // Serialize the form elements
            sbx.each( a, function() {
                add( this.name, this.value );
            });

        } else {
            // If traditional, encode the "old" way (the way 1.3.2 or older
            // did it), otherwise encode params recursively.
            for ( prefix in a ) {
                buildParams( prefix, a[ prefix ], traditional, add );
            }
        }

        // Return the resulting serialization
        return s.join( "&" ).replace( r20, "+" );
    };

    this.each = function(a, callback) {
        if (typeof callback != 'function') {
            return a;
        }
        for(i in a) {
            if (callback.call(a[i], i, a[i]) === false) {
                break;
            }
        }
        return a;
    };

    this.localize = function(attr) {
        if (typeof attr == 'undefined') {
            attr = 'data-content';
        }
        var allElements = document.getElementsByTagName('*');
        for (var i = 0, n = allElements.length; i < n; i++)
        {
            if (allElements[i].getAttribute(attr) !== null)
            {
                allElements[i].innerHTML = chrome.i18n.getMessage(allElements[i].getAttribute(attr));
            }
        }
    };

    sbx.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
        class2type[ "[object " + name + "]" ] = name.toLowerCase();
    });

    this.extend({

        isFunction: function( obj ) {
            return sbx.type(obj) === "function";
        },

        isArray: Array.isArray || function( obj ) {
            return sbx.type(obj) === "array";
        },

        isWindow: function( obj ) {
            return obj != null && obj == obj.window;
        },

        isNumeric: function( obj ) {
            return !sbx.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
        },

        isEmptyObject: function( obj ) {
            var name;
            for ( name in obj ) {
                return false;
            }
            return true;
        },

        isPlainObject: function( obj ) {
            var key;
            if ( !obj || sbx.type(obj) !== "object" || obj.nodeType || sbx.isWindow( obj ) ) {
                return false;
            }
            try {
                // Not own constructor property must be Object
                if ( obj.constructor &&
                    !hasOwn.call(obj, "constructor") &&
                    !hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
                    return false;
                }
            } catch ( e ) {
                // IE8,9 Will throw exceptions on certain host objects #9897
                return false;
            }
            if ( support.ownLast ) {
                for ( key in obj ) {
                    return hasOwn.call( obj, key );
                }
            }
            for ( key in obj ) {}
            return key === undefined || hasOwn.call( obj, key );
        },
        type: function( obj ) {
            if ( obj == null ) {
                return obj + "";
            }
            return typeof obj === "object" || typeof obj === "function" ?
                class2type[ toString.call(obj) ] || "object" :
                typeof obj;
        }
    });

    this.md5 = hex_md5;
    /*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
    var hexcase=0;function hex_md5(a){return rstr2hex(rstr_md5(str2rstr_utf8(a)))}function hex_hmac_md5(a,b){return rstr2hex(rstr_hmac_md5(str2rstr_utf8(a),str2rstr_utf8(b)))}function md5_vm_test(){return hex_md5("abc").toLowerCase()=="900150983cd24fb0d6963f7d28e17f72"}function rstr_md5(a){return binl2rstr(binl_md5(rstr2binl(a),a.length*8))}function rstr_hmac_md5(c,f){var e=rstr2binl(c);if(e.length>16){e=binl_md5(e,c.length*8)}var a=Array(16),d=Array(16);for(var b=0;b<16;b++){a[b]=e[b]^909522486;d[b]=e[b]^1549556828}var g=binl_md5(a.concat(rstr2binl(f)),512+f.length*8);return binl2rstr(binl_md5(d.concat(g),512+128))}function rstr2hex(c){try{hexcase}catch(g){hexcase=0}var f=hexcase?"0123456789ABCDEF":"0123456789abcdef";var b="";var a;for(var d=0;d<c.length;d++){a=c.charCodeAt(d);b+=f.charAt((a>>>4)&15)+f.charAt(a&15)}return b}function str2rstr_utf8(c){var b="";var d=-1;var a,e;while(++d<c.length){a=c.charCodeAt(d);e=d+1<c.length?c.charCodeAt(d+1):0;if(55296<=a&&a<=56319&&56320<=e&&e<=57343){a=65536+((a&1023)<<10)+(e&1023);d++}if(a<=127){b+=String.fromCharCode(a)}else{if(a<=2047){b+=String.fromCharCode(192|((a>>>6)&31),128|(a&63))}else{if(a<=65535){b+=String.fromCharCode(224|((a>>>12)&15),128|((a>>>6)&63),128|(a&63))}else{if(a<=2097151){b+=String.fromCharCode(240|((a>>>18)&7),128|((a>>>12)&63),128|((a>>>6)&63),128|(a&63))}}}}}return b}function rstr2binl(b){var a=Array(b.length>>2);for(var c=0;c<a.length;c++){a[c]=0}for(var c=0;c<b.length*8;c+=8){a[c>>5]|=(b.charCodeAt(c/8)&255)<<(c%32)}return a}function binl2rstr(b){var a="";for(var c=0;c<b.length*32;c+=8){a+=String.fromCharCode((b[c>>5]>>>(c%32))&255)}return a}function binl_md5(p,k){p[k>>5]|=128<<((k)%32);p[(((k+64)>>>9)<<4)+14]=k;var o=1732584193;var n=-271733879;var m=-1732584194;var l=271733878;for(var g=0;g<p.length;g+=16){var j=o;var h=n;var f=m;var e=l;o=md5_ff(o,n,m,l,p[g+0],7,-680876936);l=md5_ff(l,o,n,m,p[g+1],12,-389564586);m=md5_ff(m,l,o,n,p[g+2],17,606105819);n=md5_ff(n,m,l,o,p[g+3],22,-1044525330);o=md5_ff(o,n,m,l,p[g+4],7,-176418897);l=md5_ff(l,o,n,m,p[g+5],12,1200080426);m=md5_ff(m,l,o,n,p[g+6],17,-1473231341);n=md5_ff(n,m,l,o,p[g+7],22,-45705983);o=md5_ff(o,n,m,l,p[g+8],7,1770035416);l=md5_ff(l,o,n,m,p[g+9],12,-1958414417);m=md5_ff(m,l,o,n,p[g+10],17,-42063);n=md5_ff(n,m,l,o,p[g+11],22,-1990404162);o=md5_ff(o,n,m,l,p[g+12],7,1804603682);l=md5_ff(l,o,n,m,p[g+13],12,-40341101);m=md5_ff(m,l,o,n,p[g+14],17,-1502002290);n=md5_ff(n,m,l,o,p[g+15],22,1236535329);o=md5_gg(o,n,m,l,p[g+1],5,-165796510);l=md5_gg(l,o,n,m,p[g+6],9,-1069501632);m=md5_gg(m,l,o,n,p[g+11],14,643717713);n=md5_gg(n,m,l,o,p[g+0],20,-373897302);o=md5_gg(o,n,m,l,p[g+5],5,-701558691);l=md5_gg(l,o,n,m,p[g+10],9,38016083);m=md5_gg(m,l,o,n,p[g+15],14,-660478335);n=md5_gg(n,m,l,o,p[g+4],20,-405537848);o=md5_gg(o,n,m,l,p[g+9],5,568446438);l=md5_gg(l,o,n,m,p[g+14],9,-1019803690);m=md5_gg(m,l,o,n,p[g+3],14,-187363961);n=md5_gg(n,m,l,o,p[g+8],20,1163531501);o=md5_gg(o,n,m,l,p[g+13],5,-1444681467);l=md5_gg(l,o,n,m,p[g+2],9,-51403784);m=md5_gg(m,l,o,n,p[g+7],14,1735328473);n=md5_gg(n,m,l,o,p[g+12],20,-1926607734);o=md5_hh(o,n,m,l,p[g+5],4,-378558);l=md5_hh(l,o,n,m,p[g+8],11,-2022574463);m=md5_hh(m,l,o,n,p[g+11],16,1839030562);n=md5_hh(n,m,l,o,p[g+14],23,-35309556);o=md5_hh(o,n,m,l,p[g+1],4,-1530992060);l=md5_hh(l,o,n,m,p[g+4],11,1272893353);m=md5_hh(m,l,o,n,p[g+7],16,-155497632);n=md5_hh(n,m,l,o,p[g+10],23,-1094730640);o=md5_hh(o,n,m,l,p[g+13],4,681279174);l=md5_hh(l,o,n,m,p[g+0],11,-358537222);m=md5_hh(m,l,o,n,p[g+3],16,-722521979);n=md5_hh(n,m,l,o,p[g+6],23,76029189);o=md5_hh(o,n,m,l,p[g+9],4,-640364487);l=md5_hh(l,o,n,m,p[g+12],11,-421815835);m=md5_hh(m,l,o,n,p[g+15],16,530742520);n=md5_hh(n,m,l,o,p[g+2],23,-995338651);o=md5_ii(o,n,m,l,p[g+0],6,-198630844);l=md5_ii(l,o,n,m,p[g+7],10,1126891415);m=md5_ii(m,l,o,n,p[g+14],15,-1416354905);n=md5_ii(n,m,l,o,p[g+5],21,-57434055);o=md5_ii(o,n,m,l,p[g+12],6,1700485571);l=md5_ii(l,o,n,m,p[g+3],10,-1894986606);m=md5_ii(m,l,o,n,p[g+10],15,-1051523);n=md5_ii(n,m,l,o,p[g+1],21,-2054922799);o=md5_ii(o,n,m,l,p[g+8],6,1873313359);l=md5_ii(l,o,n,m,p[g+15],10,-30611744);m=md5_ii(m,l,o,n,p[g+6],15,-1560198380);n=md5_ii(n,m,l,o,p[g+13],21,1309151649);o=md5_ii(o,n,m,l,p[g+4],6,-145523070);l=md5_ii(l,o,n,m,p[g+11],10,-1120210379);m=md5_ii(m,l,o,n,p[g+2],15,718787259);n=md5_ii(n,m,l,o,p[g+9],21,-343485551);o=safe_add(o,j);n=safe_add(n,h);m=safe_add(m,f);l=safe_add(l,e)}return Array(o,n,m,l)}function md5_cmn(h,e,d,c,g,f){return safe_add(bit_rol(safe_add(safe_add(e,h),safe_add(c,f)),g),d)}function md5_ff(g,f,k,j,e,i,h){return md5_cmn((f&k)|((~f)&j),g,f,e,i,h)}function md5_gg(g,f,k,j,e,i,h){return md5_cmn((f&j)|(k&(~j)),g,f,e,i,h)}function md5_hh(g,f,k,j,e,i,h){return md5_cmn(f^k^j,g,f,e,i,h)}function md5_ii(g,f,k,j,e,i,h){return md5_cmn(k^(f|(~j)),g,f,e,i,h)}function safe_add(a,d){var c=(a&65535)+(d&65535);var b=(a>>16)+(d>>16)+(c>>16);return(b<<16)|(c&65535)}function bit_rol(a,b){return(a<<b)|(a>>>(32-b))};

    return this;
})();


var sbxSettings = new (function(){

    var _sbxSettings = {
        'deviceID' : null,
        'deviceConnected' : 0,
        'email' : null,
        'ak': null,
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
        // if(window.performance && typeof window.performance.now === "function"){
        //     d += performance.now();; //use high-precision timer if available
        // }
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

var sbxAPI = new (function(){
    var apiUrl = 'https://app.kiddoware.com/v3/';
    var apiUrlNew = 'https://kpsbproxy.kiddoware.com/';

    async function apiCall(method, params, callback, error){

        if(method == '/') {
           
            var firebaseId = await chrome.storage.local.get("fid").then(data => data.fid);
			if(!firebaseId)
			{
				firebaseId = 'pXsDvB2aH1W6VnDFSWUXNPlekPi2';
			}
            //console.log("firebaseId 1111: ",firebaseId);

            params['firebaseId'] = firebaseId;
            params['key'] = 'pANbhAvLsUFs/hefbg7DV1MeCImmML8718baEzD';
            params['deviceId'] = sbxSettings('deviceID');
       	var requestURL = apiUrlNew + '?' + sbx.param(params);
		} else {
            params['id'] = sbxSettings('deviceID');
			var requestURL = apiUrl + method + '/?' + sbx.param(params);
		}

        //console.log("apiCall1:",params);

        return new Promise(resolve => {
            if (typeof callback == 'function') {
                fetch(requestURL)
                    .then(
                        function(response) {
                            if (response.status !== 200) {
                                console.log('Looks like there was a problem. Status Code: ' +
                                    response.status);
                                return resolve(null);
                            }
                            response.json().then(function(r) {
                                if (r) {
                                    sbxSettings({
                                        'deviceConnected': r.deviceConnected,
                                        'endDate' : r.endDate
                                    });
                                }
                                return resolve(r);
                            });
                        }
                    ).catch(function(err) {
                    console.log('Fetch Error :-S', err);
                    return resolve(null);
                });
            }
            else {
                fetch(requestURL)
                    .then(
                        function(response) {
                            if (response.status !== 200) {
                                console.log('Looks like there was a problem. Status Code: ' +
                                    response.status);
                                return resolve(null);
                            }
                            response.json().then(function(r) {
                                if (r) {
                                    sbxSettings({
                                        'deviceConnected': r.deviceConnected,
                                        'endDate' : r.endDate
                                    });
                                }
                                if(r.result)
                                {
                                    return resolve(r.result);
                                }
                                else
                                {
                                    return resolve(r);
                                }
                               
                            });
                        }
                    ).catch(function(err) {
                    console.log('Fetch Error :-S', err);
                    return resolve(null);
                });
            }
        });
    }

    function privateCall(method, params, callback, error){
        return apiCall('api/' + method, params, callback, error);
    }

    function publicCall(method, params, callback, error){
        return apiCall('public_api/' + method, params, callback, error);
    }

    function proxyCall(method, params, callback, error){
		var res = apiCall(method, params, callback, error);
        return res;
	}

    this.call = apiCall;

    this.privateCall = privateCall;

    this.publicCall = publicCall;

    this.checkUrl = function(url){
        // Skip checking internal Chrome URLs and extension URLs
        if (url && (
            url.startsWith('chrome-extension://') || 
            url.startsWith('chrome://') || 
            url.startsWith('moz-extension://') ||
            url.startsWith('edge-extension://') ||
            url.startsWith('about:') ||
            url.startsWith('data:') ||
            url.startsWith('file://') ||
            url.startsWith('view-source:') ||
            url.startsWith('chrome-search://') ||
            url.startsWith('devtools://')
        )) {
            return Promise.resolve({allowed: "1"});
        }
        return proxyCall('/', {
            'url': url
        });
    };

    this.getKey = function(params, callback, error){

        params['os'] = "chrome";
        params['deviceName'] = "Chrome Browser";
        params['connectDevice'] = 1;


        return publicCall('getKey', params, function(r){
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

chrome.tabs.onUpdated.addListener(async function(tabId, changeInfo, tab) {
    // Skip checking internal Chrome URLs and extension URLs
    if (tab.url && (
        tab.url.startsWith('chrome-extension://') || 
        tab.url.startsWith('chrome://') || 
        tab.url.startsWith('moz-extension://') ||
        tab.url.startsWith('edge-extension://') ||
        tab.url.startsWith('about:') ||
        tab.url.startsWith('data:') ||
        tab.url.startsWith('file://') ||
        tab.url.startsWith('view-source:') ||
        tab.url.startsWith('chrome-search://') ||
        tab.url.startsWith('devtools://')
    )) {
        return;
    }
    
    // Skip if tab.url is undefined, null, or empty
    if (!tab.url || tab.url.trim() === '') {
        return;
    }
    
    Promise.all([
        sbxAPI.checkUrl(tab.url)
    ]).then(response => {
        let result = response[0];
        
        // Skip if result is null or undefined
        if (!result) {
            return;
        }
        
        if (result.allowed != "1") {
            sbxSettings(function(){
                if (sbxSettings("notifyOnBlock")) {
                    var d = new Date();
                    var noteId = result.url + d.getFullYear() + d.getMonth() + d.getDate() + d.getHours() + d.getMinutes() + parseInt(d.getSeconds() / 2, 10);
                    chrome.notifications.create(noteId, {
                        type: "list",
                        title: chrome.i18n.getMessage("Page_Block"),
                        message: chrome.i18n.getMessage("Page_Block_description"),
                        iconUrl: "images/alert.png",
                        items: [
                            {title: chrome.i18n.getMessage("Domain") + ": ", message: result.domain},
                            {title: chrome.i18n.getMessage("URL") + ": ", message: result.url},
                            {title: chrome.i18n.getMessage("Result") + ": ", message: result.allowed},
                            {title: chrome.i18n.getMessage("Rule") + ": ", message: result.rule},
                            {title: chrome.i18n.getMessage("Category") + ": ", message: result.category}]
                    }, function (notificationId) {

                    });
                }
            });
           
            // Only create dynamic rule if tab.url is valid
            if (tab.url && tab.url.trim() !== '') {
                chrome.declarativeNetRequest.updateDynamicRules({
                    removeRuleIds: [1],
                    addRules: [
                        {
                            id: 1,
                            priority: 1,
                            "action": { "type": "redirect", "redirect": { "url": chrome.runtime.getURL('blocked.html#'+sbx.param(result)) } },
                            condition: { urlFilter: tab.url, resourceTypes: ['main_frame'] },
                        },
                    ]
                });
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    chrome.tabs.update(tabs[0].id, {url: chrome.runtime.getURL('blocked.html#'+sbx.param(result))});
                });
            }
            
        }
        else
        {
            chrome.declarativeNetRequest.updateDynamicRules({
                removeRuleIds: [1],
            });
        }
    }).catch(error => {
        console.error('Error in tab update listener:', error);
    });
});

var KPSB_GET_KEY_URL = 'https://app.kiddoware.com/kw_backend_new/public/api/kpsb/public_api/getKey';

function kpsbAllowedAuthSenderUrl(url) {
    if (!url || typeof url !== 'string') return false;
    try {
        var u = new URL(url);
        if (u.protocol !== 'https:') return false;
        var h = u.hostname.toLowerCase();
        if (h !== 'app.kiddoware.com' && !/^[a-z0-9-]+\.app\.kiddoware\.com$/.test(h)) return false;
        return u.pathname.indexOf('kpsb-extension-auth') !== -1;
    } catch (e) {
        return false;
    }
}

function kpsbLooksLikeFirebaseIdToken(t) {
    if (typeof t !== 'string' || t.length < 100 || t.length > 12000) return false;
    var parts = t.split('.');
    if (parts.length !== 3) return false;
    return /^[A-Za-z0-9_-]+$/.test(parts[0]) && /^[A-Za-z0-9_-]+$/.test(parts[1]);
}

var kpsbGoogleAuthLastTs = 0;
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.type !== 'KPSB_WEB_GOOGLE_AUTH') {
        return;
    }
    var tabUrl = (sender.tab && sender.tab.url) || sender.url || '';
    if (!kpsbAllowedAuthSenderUrl(tabUrl)) {
        sendResponse({ ok: false, error: 'Invalid sender' });
        return true;
    }
    if (!kpsbLooksLikeFirebaseIdToken(message.idToken)) {
        sendResponse({ ok: false, error: 'Invalid token' });
        return true;
    }
    var now = Date.now();
    if (now - kpsbGoogleAuthLastTs < 2000) {
        sendResponse({ ok: false, error: 'Please wait' });
        return true;
    }
    kpsbGoogleAuthLastTs = now;
    (async function () {
        try {
            var sync = await chrome.storage.sync.get(['deviceID']);
            var deviceId = sync.deviceID;
            if (!deviceId) {
                deviceId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = (Math.random() * 16) | 0;
                    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
                });
                await chrome.storage.sync.set({ deviceID: deviceId });
            }
            var res = await fetch(KPSB_GET_KEY_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({
                    idToken: message.idToken,
                    id: deviceId,
                    connectDevice: true,
                    os: 'chrome',
                    deviceName: 'Chrome Browser'
                })
            });
            var j = JSON.parse(await res.text());
            if (j.result !== 'success' || !j.data) {
                sendResponse({ ok: false, error: j.message || 'Authorization failed' });
                return;
            }
            var d = j.data;
            await chrome.storage.local.set({ fid: d.fid });
            await chrome.storage.sync.set({
                ak: d.ak,
                fid: d.fid,
                email: message.email || '',
                deviceConnected: 'yes',
                endDate: d.endDate || ''
            });
            try {
                chrome.notifications.create('kpsb-google-' + Date.now(), {
                    type: 'basic',
                    iconUrl: 'images/48.png',
                    title: 'Safe Browser',
                    message: 'Signed in with Google.'
                });
            } catch (e) {}
            sendResponse({ ok: true });
        } catch (e) {
            sendResponse({ ok: false, error: (e && e.message) || String(e) });
        }
    })();
    return true;
});
