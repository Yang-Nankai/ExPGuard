// DO NOT MESS WITH THIS FILE UNLESS YOU KNOW WHAT YOU ARE DOING!
// these attributes are set in content.ts on the script element.
var sonarUniqueId = parseInt(document.currentScript.getAttribute('sonarUniqueId'));
var sonarSiteId = parseInt(document.currentScript.getAttribute('sonarSiteId'));
var rumUrl = new URL(document.currentScript.getAttribute('rumUrl'));
var WindowEvent;
var profiler;
var windowEvent;
var pageWindow = window.parent;
(function (WindowEvent) {
    WindowEvent['Load'] = 'load';
    WindowEvent['BeforeUnload'] = 'beforeunload';
    WindowEvent['Abort'] = 'abort';
    WindowEvent['Error'] = 'error';
    WindowEvent['Unload'] = 'unload';
})(WindowEvent || (WindowEvent = {}));
var VisibilityType;
(function (VisibilityType) {
    VisibilityType[(VisibilityType['Focus'] = 0)] = 'Focus';
    VisibilityType[(VisibilityType['Blur'] = 1)] = 'Blur';
})(VisibilityType || (VisibilityType = {}));
var AjaxTiming = (function () {
    function AjaxTiming(url, method, isAsync, open) {
        var _this = this;
        this.getPerformanceTimings = function (entry) {
            _this.connect = entry.connectEnd - entry.connectStart;
            _this.dns = entry.domainLookupEnd - entry.domainLookupStart;
            _this.duration = entry.duration;
            _this.load = entry.responseEnd - entry.responseStart;
            _this.wait = entry.responseStart - entry.requestStart;
            _this.start = entry.startTime;
            _this.redirect = entry.redirectEnd - entry.redirectStart;
            if (entry['secureConnectionStart']) {
                _this.ssl = entry.connectEnd - entry['secureConnectionStart'];
            }
        };
        this.url = url;
        this.method = method;
        this.isAsync = isAsync;
        this.open = open;
    }
    return AjaxTiming;
})();
var ProfilerJsError = (function () {
    function ProfilerJsError(message, url, lineNumber) {
        this.count = 0;
        this.message = message;
        this.url = url;
        this.lineNumber = lineNumber;
    }
    ProfilerJsError.createText = function (msg, url, num) {
        return [msg, url, num].join(':');
    };
    ProfilerJsError.prototype.getText = function () {
        return ProfilerJsError.createText(this.message, this.url, this.lineNumber);
    };
    return ProfilerJsError;
})();
var ProfilerEventManager = (function () {
    function ProfilerEventManager() {
        this.events = [];
        this.hasAttachEvent = !!window.attachEvent;
    }
    ProfilerEventManager.prototype.add = function (type, target, func) {
        this.events.push({
            type: type,
            target: target,
            func: func,
        });
        if (this.hasAttachEvent) {
            target.attachEvent('on' + type, func);
        } else {
            target.addEventListener(type, func, false);
        }
    };
    ProfilerEventManager.prototype.remove = function (type, target, func) {
        if (this.hasAttachEvent) {
            target.detachEvent(type, func);
        } else {
            target.removeEventListener(type, func, false);
        }
        var index = this.events.indexOf({
            type: type,
            target: target,
            func: func,
        });
        if (index !== 1) {
            this.events.splice(index, 1);
        }
    };
    ProfilerEventManager.prototype.clear = function () {
        for (var _i = 0, _a = this.events; _i < _a.length; _i++) {
            var ev = _a[_i];
            this.remove(ev.type, ev.target, ev.func);
        }
        this.events = [];
    };
    return ProfilerEventManager;
})();
var RProfiler = (function () {
    function RProfiler() {
        var _this = this;
        this.startTime = new Date().getTime();
        this.eventsTimingHandler = new EventsTimingHandler();
        this.inputDelay = new InputDelayHandler();
        this.version = 'v3.2.0';
        this.info = {};
        this.hasInsight = false;
        this.data = {
            start: this.startTime,
            jsCount: 0,
            jsErrors: [],
            loadTime: -1,
            loadFired: window.document.readyState == 'complete',
            ajax: [],
        };
        this.eventManager = new ProfilerEventManager();
        this.startAjaxCapture = function () {
            var xhr = XMLHttpRequest.prototype;
            var open = xhr.open;
            var send = xhr.send;
            var tempArray = [];
            var used = {};
            var array = _this.data.ajax;
            var compareEntriesDelay = 25;
            var hasPerformance =
                typeof window.performance == 'object' &&
                typeof window.performance.now == 'function' &&
                typeof window.performance.getEntriesByType == 'function';
            if (hasPerformance && typeof window.performance.setResourceTimingBufferSize === 'function') {
                window.performance.setResourceTimingBufferSize(300);
            }
            var now = function () {
                if (hasPerformance) {
                    return window.performance.now();
                }
                return new Date().getTime();
            };
            xhr.open = function (method, url, async, user, password) {
                if (async === void 0) {
                    async = true;
                }
                this.rpIndex = tempArray.length;
                tempArray.push(new AjaxTiming(url, method, async, now()));
                open.call(this, method, url, async, user, password);
            };
            xhr.send = function (data) {
                var _this = this;
                var changeFunc = this.onreadystatechange;
                this.onreadystatechange = function (arg) {
                    var request = tempArray[_this.rpIndex];
                    if (!request) {
                        return;
                    }
                    var state = _this.readyState;
                    switch (state) {
                        case 0:
                            break;
                        case 1:
                            request.connectionEstablished = now();
                            break;
                        case 2:
                            request.requestReceived = now();
                            break;
                        case 3:
                            request.processingTime = now();
                            break;
                        case 4:
                            request.complete = now();
                            var hasResponse = !!(
                                _this.response &&
                                _this.response != null &&
                                _this.response != undefined
                            );
                            switch (_this.responseType) {
                                case 'text':
                                case '':
                                    if (typeof _this.responseText == 'string') {
                                        request.responseSize = _this.responseText.length;
                                    }
                                    break;
                                case 'json':
                                    if (hasResponse && typeof _this.response.toString == 'function') {
                                        request.responseSize = _this.response.toString().length;
                                    }
                                    break;
                                case 'arraybuffer':
                                    if (hasResponse && typeof _this.response.byteLength == 'number') {
                                        request.responseSize = _this.response.byteLength;
                                    }
                                    break;
                                case 'blob':
                                    if (hasResponse && typeof _this.response.size == 'number') {
                                        request.responseSize = _this.response.size;
                                    }
                                    break;
                                case 'document':
                                    break;
                            }
                            (function (req, arr) {
                                setTimeout(function () {
                                    if (!hasPerformance) {
                                        return;
                                    }
                                    var url = req.url;
                                    var matches = new Array();
                                    var entries = performance.getEntriesByType('resource');
                                    for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
                                        var entry = entries_1[_i];
                                        if (entry.name == url) {
                                            matches.push(entry);
                                        }
                                    }
                                    array.push(req);
                                    if (matches.length == 0) {
                                        return;
                                    }
                                    if (!used[url]) {
                                        used[url] = [];
                                    }
                                    if (matches.length == 1) {
                                        req.getPerformanceTimings(matches[0]);
                                        used[url].push(0);
                                        return;
                                    }
                                    var u = used[url];
                                    for (var index in matches) {
                                        if (u.indexOf(index) != -1) {
                                            continue;
                                        }
                                        req.getPerformanceTimings(matches[index]);
                                        u.push(index);
                                        return;
                                    }
                                    req.getPerformanceTimings(matches[0]);
                                }, compareEntriesDelay);
                            })(request, array);
                            break;
                    }
                    if (typeof changeFunc == 'function') {
                        changeFunc.call(_this, arg);
                    }
                };
                var request = tempArray[this.rpIndex];
                if (!request) {
                    return;
                }
                if (data && !isNaN(data.length)) {
                    request.sendSize = data.length;
                }
                request.send = now();

                send.call(this, data);
            };
        };
        this.recordPageLoad = function () {
            _this.data.loadTime = new Date().getTime();
            _this.data.loadFired = true;
        };
        this.addError = function (msg, url, lineNum) {
            _this.data.jsCount++;
            var currError = ProfilerJsError.createText(msg, url, lineNum);
            var errorArr = _this.data.jsErrors;
            for (var _i = 0, errorArr_1 = errorArr; _i < errorArr_1.length; _i++) {
                var err = errorArr_1[_i];
                if (err.getText() == currError) {
                    err.count++;
                    return;
                }
            }
            errorArr.push(new ProfilerJsError(msg, url, lineNum));
        };
        this.addInfo = function (infoType, key, value) {
            if (_this.isNullOrEmpty(infoType)) {
                return;
            }
            if (_this.isNullOrEmpty(value)) {
                _this.info[infoType] = key;
            } else {
                if (_this.isNullOrEmpty(key)) {
                    return;
                }
                if (_this.isNullOrEmpty(_this.info[infoType])) {
                    _this.info[infoType] = {};
                }
                _this.info[infoType][key] = value;
            }
            _this.hasInsight = true;
        };
        this.clearInfo = function () {
            _this.info = {};
            _this.hasInsight = false;
        };
        this.clearErrors = function () {
            _this.data.jsCount = 0;
            _this.data.jsErrors = [];
        };
        this.clearAjax = function () {
            _this.data.ajax = [];
        };
        this.getInfo = function () {
            if (!_this.hasInsight) {
                return null;
            }
            return _this.info;
        };
        this.getEventTimingHandler = function () {
            return _this.eventsTimingHandler;
        };
        this.getInputDelay = function () {
            return _this.inputDelay;
        };
        this.eventManager.add(WindowEvent.Load, window, this.recordPageLoad);
        var errorFunc = this.addError;
        this.startAjaxCapture();

        function recordJsError(e) {
            var ev = e.target || e.srcElement;
            if (ev.nodeType == 3) {
                ev = ev.parentNode;
            }
            errorFunc('N/A', ev.src || ev.URL, -1);
            return false;
        }
        if (!!window['opera']) {
            this.eventManager.add(WindowEvent.Error, document, recordJsError);
        } else if ('onerror' in window) {
            var origOnError = window.onerror;
            window.onerror = function (msg, url, lineNum) {
                errorFunc(msg, url, lineNum);
                if (!!origOnError) {
                    return origOnError(msg, url, lineNum);
                }
                return false;
            };
        }
    }
    RProfiler.prototype.isNullOrEmpty = function (val) {
        if (val === undefined || val === null) {
            return true;
        }
        if (typeof val == 'string') {
            var str = val;
            return str.trim().length == 0;
        }
        return false;
    };
    RProfiler.prototype.dispatchCustomEvent = function (event) {
        (function (w) {
            if (typeof w.CustomEvent === 'function') {
                return false;
            }

            function CustomEvent(event, params) {
                params = params || {
                    bubbles: false,
                    cancelable: false,
                    detail: undefined,
                };
                var evt = document.createEvent('CustomEvent');
                evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
                return evt;
            }
            CustomEvent.prototype = Event.prototype;
            w.CustomEvent = CustomEvent;
        })(window);
        var e = new CustomEvent(event);
        window.dispatchEvent(e);
    };
    return RProfiler;
})();
var InputDelayHandler = (function () {
    function InputDelayHandler() {
        var _this = this;
        this.firstInputDelay = 0;
        this.firstInputTimeStamp = 0;
        this.startTime = 0;
        this.delay = 0;
        this.profileManager = new ProfilerEventManager();
        this.eventTypes = ['click', 'mousedown', 'keydown', 'touchstart', 'pointerdown'];
        this.addEventListeners = function () {
            _this.eventTypes.forEach(function (event) {
                _this.profileManager.add(event, document, _this.onInput);
            });
        };
        this.now = function () {
            return new Date().getTime();
        };
        this.removeEventListeners = function () {
            _this.eventTypes.forEach(function (event) {
                _this.profileManager.remove(event, document, _this.onInput);
            });
        };
        this.onInput = function (evt) {
            if (!evt.cancelable) {
                return;
            }
            var isEpochTime = evt.timeStamp > 1e12;
            _this.firstInputTimeStamp = _this.now();
            var useFirstInputTime = isEpochTime || !window['performance'];
            var now = useFirstInputTime ? _this.firstInputTimeStamp : window['performance'].now();
            _this.delay = now - evt.timeStamp;
            if (evt.type == 'pointerdown') {
                _this.onPointerDown();
            } else {
                _this.removeEventListeners();
                _this.updateFirstInputDelay();
            }
        };
        this.onPointerUp = function () {
            _this.removeEventListeners();
            _this.updateFirstInputDelay();
        };
        this.onPointerCancel = function () {
            _this.removePointerEventListeners();
        };
        this.removePointerEventListeners = function () {
            _this.profileManager.remove('pointerup', document, _this.onPointerUp);
            _this.profileManager.remove('pointercancel', document, _this.onPointerCancel);
        };
        this.updateFirstInputDelay = function () {
            if (_this.delay >= 0 && _this.delay < _this.firstInputTimeStamp - _this.startTime) {
                _this.firstInputDelay = Math.round(_this.delay);
            }
        };
        this.startSoftNavigationCapture = function () {
            _this.resetSoftNavigationCapture();
        };
        this.resetSoftNavigationCapture = function () {
            _this.resetFirstInputDelay();
            _this.addEventListeners();
        };
        this.resetFirstInputDelay = function () {
            _this.delay = 0;
            _this.firstInputDelay = 0;
            _this.startTime = 0;
            _this.firstInputTimeStamp = 0;
        };
        this.startTime = this.now();
        this.addEventListeners();
    }
    InputDelayHandler.prototype.onPointerDown = function () {
        this.profileManager.add('pointerup', document, this.onPointerUp);
        this.profileManager.add('pointercancel', document, this.onPointerCancel);
    };
    InputDelayHandler.prototype.getFirstInputDelay = function () {
        return this.firstInputDelay;
    };
    return InputDelayHandler;
})();
var EventsTimingHandler = (function () {
    function EventsTimingHandler() {
        var _this = this;
        this.hiddenStrings = ['hidden', 'msHidden', 'webkitHidden', 'mozHidden'];
        this.visibilityStrings = [
            'visibilitychange',
            'msvisibilitychange',
            'webkitvisibilitychange',
            'mozvisibilitychange',
        ];
        this.captureSoftNavigation = false;
        this.hidden = 'hidden';
        this.visibilityChange = 'visibilitychange';
        this.visibilityEvents = [];
        this.eventManager = new ProfilerEventManager();
        this.engagementTimeIntervalMs = 1000;
        this.engagementTime = 0;
        this.firstEngagementTime = 0;
        this.lastEventTimeStamp = 0;
        this.timeoutId = undefined;
        this.now = function () {
            return new Date().getTime();
        };
        this.startVisibilityCapture = function () {
            _this.initializeVisibilityProperties();
            document.addEventListener(_this.visibilityChange, _this.captureFocusEvent, false);
        };
        this.initializeVisibilityProperties = function () {
            var values = _this.hiddenStrings;
            var propertyIndex = 0;
            for (var i = 0; i < values.length; i++) {
                if (typeof document[values[i]] !== 'undefined') {
                    propertyIndex = i;
                }
            }
            _this.visibilityChange = _this.visibilityStrings[propertyIndex];
            _this.hidden = _this.hiddenStrings[propertyIndex];
        };
        this.captureFocusEvent = function () {
            _this.updateVisibilityChangeTime();
            if (!document[_this.hidden]) {
                _this.captureEngagementTime();
            }
        };
        this.updateVisibilityChangeTime = function () {
            if (document[_this.hidden]) {
                _this.captureVisibilityEvent(VisibilityType.Blur);
            } else {
                _this.captureVisibilityEvent(VisibilityType.Focus);
            }
        };
        this.onBlur = function () {
            _this.captureVisibilityEvent(VisibilityType.Blur);
        };
        this.onFocus = function () {
            _this.captureVisibilityEvent(VisibilityType.Focus);
        };
        this.captureVisibilityEvent = function (type) {
            _this.visibilityEvents.push({
                type: type,
                time: _this.now(),
            });
        };
        this.captureEngagementTime = function (isFirstEngagement) {
            if (isFirstEngagement === void 0) {
                isFirstEngagement = true;
            }
            if (!_this.lastEventTimeStamp) {
                _this.engagementTime = _this.engagementTimeIntervalMs;
                _this.lastEventTimeStamp = _this.now();
                return;
            }
            var timeBetweenEvents = _this.now() - _this.lastEventTimeStamp;
            _this.lastEventTimeStamp = _this.now();
            if (isFirstEngagement && _this.firstEngagementTime === 0) {
                _this.firstEngagementTime = _this.now();
            }
            if (timeBetweenEvents > 0 && timeBetweenEvents < _this.engagementTimeIntervalMs) {
                clearTimeout(_this.timeoutId);
                _this.engagementTime += timeBetweenEvents;
                return;
            }
            _this.startTimer();
        };
        this.captureMouseMove = function () {
            _this.captureEngagementTime(false);
        };
        this.startTimer = function () {
            _this.timeoutId = setTimeout(function () {
                _this.engagementTime += _this.engagementTimeIntervalMs;
            }, _this.engagementTimeIntervalMs);
        };
        this.getFocusAwayTime = function () {
            var events = _this.visibilityEvents;
            var resetIndex = -1;
            if (events.length === 0) {
                return 0;
            }
            var currentBlurIndex = resetIndex;
            var index = 0;
            var currentFocusIndex = resetIndex;
            var hiddenTimeLapsed = 0;
            while (index < events.length) {
                if (events[index].type === VisibilityType.Blur && currentBlurIndex === resetIndex) {
                    currentBlurIndex = index;
                }
                var isNewFocusEvent = currentFocusIndex === resetIndex && currentBlurIndex !== resetIndex;
                if (events[index].type === VisibilityType.Focus && isNewFocusEvent) {
                    currentFocusIndex = index;
                }
                var validFocusChange = currentBlurIndex !== resetIndex && currentFocusIndex !== resetIndex;
                if (validFocusChange) {
                    var diff = events[currentFocusIndex].time - events[currentBlurIndex].time;
                    if (diff > 0) {
                        hiddenTimeLapsed += diff;
                    }
                    currentBlurIndex = resetIndex;
                    currentFocusIndex = resetIndex;
                }
                index = index + 1;
            }
            if (currentBlurIndex === events.length - 1) {
                hiddenTimeLapsed += _this.now() - events[currentBlurIndex].time;
            }
            return hiddenTimeLapsed;
        };
        this.getEngagementTime = function () {
            return _this.engagementTime;
        };
        this.getFirstEngagementTime = function () {
            return _this.firstEngagementTime;
        };
        this.startSoftNavigationCapture = function () {
            _this.captureSoftNavigation = true;
        };
        this.resetSoftNavigationCapture = function () {
            _this.resetEngagementMetrics();
            _this.visibilityEvents = [];
        };
        this.resetEngagementMetrics = function () {
            _this.engagementTime = 0;
            _this.lastEventTimeStamp = _this.now();
            _this.firstEngagementTime = 0;
        };
        this.clear = function () {
            _this.eventManager.clear();
        };
        this.captureEngagementTime(false);
        this.eventManager.add('scroll', document, this.captureEngagementTime);
        this.eventManager.add('resize', window, this.captureEngagementTime);
        this.eventManager.add('mouseup', document, this.captureEngagementTime);
        this.eventManager.add('keyup', document, this.captureEngagementTime);
        this.eventManager.add('mousemove', document, this.captureMouseMove);
        this.eventManager.add('focus', window, this.onFocus);
        this.eventManager.add('blur', window, this.onBlur);
        this.eventManager.add('focus', document, this.onFocus);
        this.eventManager.add('blur', document, this.onBlur);
    }
    return EventsTimingHandler;
})();
profiler = new RProfiler();
windowEvent = WindowEvent;
pageWindow.RProfiler = profiler;
pageWindow.profiler = profiler;
pageWindow.WindowEvent = WindowEvent;
profiler.dispatchCustomEvent('GlimpseLoaded');
var __extends =
    (this && this.__extends) ||
    (function () {
        var extendStatics = function (d, b) {
            extendStatics =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                        d.__proto__ = b;
                    }) ||
                function (d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
        };
    })();
var PostType;
(function (PostType) {
    PostType[(PostType['OnLoad'] = 0)] = 'OnLoad';
    PostType[(PostType['OnBeforeUnload'] = 1)] = 'OnBeforeUnload';
    PostType[(PostType['OnAbort'] = 2)] = 'OnAbort';
    PostType[(PostType['Flush'] = 3)] = 'Flush';
})(PostType || (PostType = {}));
var DataWrapper = (function () {
    function DataWrapper() {
        this.hasErrors = false;
        this._appErrors = null;
        this.hasIndicators = false;
        this._indicators = null;
        this.hasTracepoints = false;
        this._tracepoints = null;
    }
    DataWrapper.prototype.addError = function (key, value) {
        if (!this.hasErrors) {
            this._appErrors = new Object();
            this.hasErrors = true;
        }
        this._appErrors[key] = value;
    };
    DataWrapper.prototype.getErrors = function () {
        return this._appErrors;
    };
    DataWrapper.prototype.addIndicator = function (obj) {
        if (!this.hasIndicators) {
            this._indicators = {};
            this.hasIndicators = true;
        }
        for (var key in obj) {
            this._indicators[key] = obj[key];
        }
    };
    DataWrapper.prototype.getIndicators = function () {
        return this._indicators;
    };
    DataWrapper.prototype.addTracepoint = function (obj) {
        if (!this.hasTracepoints) {
            this._tracepoints = {};
            this.hasTracepoints = true;
        }
        for (var key in obj) {
            this._tracepoints[key] = obj[key];
        }
    };
    DataWrapper.prototype.getTracepoints = function () {
        return this._tracepoints;
    };
    return DataWrapper;
})();
(function () {
    if (!document.getElementById || !(window['attachEvent'] || window.addEventListener)) {
        return;
    }
    var location = pageWindow.location;
    var protocol = location.protocol + '//';
    var rpVersion = profiler.version;
    var hasPerformance = typeof pageWindow.performance == 'object';
    var hasGetEntriesAPI = hasPerformance && typeof pageWindow.performance.getEntriesByType == 'function';
    var windowEventDef = {
        Load: windowEvent.Load,
        BeforeUnload: windowEvent.BeforeUnload,
        Unload: windowEvent.Unload,
        Abort: windowEvent.Abort,
        Error: windowEvent.Error,
    };
    var testUserId = 'test';
    var version = 'v3.2.0';
    rumUrl.protocol = location.protocol;
    var config = {
        sampleRate: 100,
        waterfallSampleRate: 100,
        postUrl: rumUrl.toString(),
        siteId: 16,
        debugParameter: 'GlimpseDebug',
        debugUrl: 'g.3gl.net/jp/v3.1.5/D',
        waterfallParameter: 'GlimpseWaterfall',
        sendOnLoad: false,
        clearResources: true,
    };
    var now = function () {
        return new Date().getTime();
    };
    if (!!pageWindow['__cpPostUrl']) {
        config.postUrl = pageWindow['__cpPostUrl'].trim();
    }
    if (!!pageWindow['__cpSendOnLoad']) {
        config.sendOnLoad = pageWindow['__cpSendOnLoad'] === true;
    }
    var PerformanceObserver = (function () {
        function PerformanceObserver() {
            var _this = this;
            this.longTaskEndTime = 0;
            this.waitTime = 5000;
            this.performanceObserverApi = pageWindow['PerformanceObserver'];
            this.performanceLongTaskTiming = pageWindow['PerformanceLongTaskTiming'];
            this.observeLongTask = function (entries) {
                for (var i = 0; i < entries.length; i++) {
                    var currEntry = entries[i];
                    if (i > 0) {
                        var prevEntry = entries[i - 1];
                        _this.longTaskEndTime =
                            currEntry.startTime - prevEntry.startTime > _this.waitTime
                                ? _this.setLongTaskTime(prevEntry)
                                : _this.setLongTaskTime(currEntry);
                    } else {
                        _this.longTaskEndTime = _this.setLongTaskTime(currEntry);
                    }
                }
            };
            this.setLongTaskTime = function (entry) {
                return Math.round(entry.startTime + entry.duration);
            };
            this.getLongTaskTime = function () {
                return _this.longTaskEndTime;
            };
            if (this.performanceLongTaskTiming) {
                this.observe(['longtask'], this.observeLongTask);
            }
        }
        PerformanceObserver.prototype.observe = function (entryTypes, callBack) {
            if (this.performanceObserverApi) {
                var observer = new this.performanceObserverApi(function (list, obj) {
                    var entries = list.getEntries();
                    callBack(entries);
                });
                observer.observe({ entryTypes: entryTypes });
            }
        };
        return PerformanceObserver;
    })();
    var performanceObserver = new PerformanceObserver();
    var Storage = (function () {
        function Storage() {}
        Storage.save = function (value) {
            if (Storage.canUseLocalStorage()) {
                pageWindow.localStorage.setItem(Storage.storeKey, value);
                return;
            }
            Storage.setCookie(value);
        };
        Storage.read = function () {
            if (Storage.canUseLocalStorage()) {
                var store = pageWindow.localStorage.getItem(Storage.storeKey);
                if (store) {
                    return store;
                }
            }
            return this.readCookie();
        };
        Storage.canUseLocalStorage = function () {
            var canUse = true;
            try {
                var key = Storage.storeKey + 'delete';
                var value = key + 0;
                pageWindow.localStorage.setItem(key, value);
                var valueFromStorage = pageWindow.localStorage.getItem(key);
                canUse = value === valueFromStorage;
                if (canUse) {
                    pageWindow.localStorage.removeItem(key);
                }
            } catch (ex) {
                canUse = false;
            }
            return canUse;
        };
        Storage.setCookie = function (value) {
            var date = new Date();
            date.setTime(date.getTime() + Storage.cookieExpireDays * 24 * 60 * 60 * 1000);
            var expires = '; expires=' + date.toUTCString();
            var split = pageWindow.document.domain.split('.');
            var length = split.length;
            var domain = split[length - 2] + '.' + split[length - 1];
            document.cookie =
                Storage.storeKey + '=' + encodeURIComponent(value) + expires + '; path=/; domain=' + domain + ';';
        };
        Storage.readCookie = function () {
            var split = pageWindow.document.cookie.split(';');
            var regex = Storage.storeRegex;
            for (var _i = 0, split_1 = split; _i < split_1.length; _i++) {
                var c = split_1[_i];
                if (regex.test(c)) {
                    return decodeURIComponent(c.substring(c.indexOf('=') + 1, c.length));
                }
            }
            return '';
        };
        Storage.cookieExpireDays = 365;
        Storage.storeKey = '__CG';
        Storage.storeRegex = new RegExp('^(\\s)*' + Storage.storeKey + '=', 'i');
        return Storage;
    })();
    var Util = (function () {
        function Util() {}
        Util.getValue = function (resource, metric) {
            var allowOrigin = resource.responseStart !== 0;
            switch (metric) {
                case Metrics.DNS:
                    return Util.getMetricValue(resource.domainLookupEnd, resource.domainLookupStart, allowOrigin);
                case Metrics.Connect:
                    return Util.getMetricValue(resource.connectEnd, resource.connectStart, allowOrigin);
                case Metrics.Load:
                    return Util.getMetricValue(resource.responseEnd, resource.responseStart, allowOrigin);
                case Metrics.Wait:
                    return Util.getMetricValue(resource.responseStart, resource.requestStart, allowOrigin);
                case Metrics.Start:
                    return resource.startTime;
                case Metrics.Redirect:
                    return Util.getMetricValue(resource.redirectEnd, resource.redirectStart);
                case Metrics.Duration:
                    return resource.duration;
                case Metrics.SSL:
                    if (resource['secureConnectionStart']) {
                        return allowOrigin ? resource.connectEnd - resource['secureConnectionStart'] : null;
                    }
                    break;
            }
            return 0;
        };
        Util.getMetricValue = function (end, start, allowOrigin) {
            if (allowOrigin === void 0) {
                allowOrigin = true;
            }
            if (!allowOrigin) {
                return null;
            } else if (end >= 0 && end >= start && start >= 0) {
                return end - start;
            }
        };
        Util.getRoundedValue = function (value) {
            return value ? Math.round(value) : value;
        };
        Util.addScriptTag = function (url, scope) {
            var script = scope.document.createElement('script');
            script.type = 'text/javascript';
            script.src = protocol + url;
            scope.document.body.appendChild(script);
        };
        Util.getQueryStringValue = function (val) {
            var query = location.search.substring(1);
            var values = query.split('&');
            var arr;
            for (var i = 0; i < values.length; i++) {
                arr = values[i].split('=');
                if (arr[0] == val) {
                    return arr[1];
                }
            }
            return '';
        };
        Util.stopEvents = function () {
            if (!profiler) {
                return;
            }
            profiler.eventManager.clear();
            profiler.getEventTimingHandler().clear();
        };
        return Util;
    })();
    var CookieIdentifier;
    (function (CookieIdentifier) {
        CookieIdentifier['UserId'] = 'u';
        CookieIdentifier['SessionId'] = 's';
        CookieIdentifier['SessionTime'] = 't';
        CookieIdentifier['PageViewCount'] = 'c';
        CookieIdentifier['UrlCheckSum'] = 'k';
        CookieIdentifier['PostFlag'] = 'f';
    })(CookieIdentifier || (CookieIdentifier = {}));
    var WinHttpMethod;
    (function (WinHttpMethod) {
        WinHttpMethod[(WinHttpMethod['GET'] = 0)] = 'GET';
        WinHttpMethod[(WinHttpMethod['POST'] = 1)] = 'POST';
        WinHttpMethod[(WinHttpMethod['HEAD'] = 2)] = 'HEAD';
        WinHttpMethod[(WinHttpMethod['DELETE'] = 3)] = 'DELETE';
        WinHttpMethod[(WinHttpMethod['OPTIONS'] = 4)] = 'OPTIONS';
        WinHttpMethod[(WinHttpMethod['PUT'] = 5)] = 'PUT';
        WinHttpMethod[(WinHttpMethod['TRACE'] = 6)] = 'TRACE';
        WinHttpMethod[(WinHttpMethod['CONNECT'] = 7)] = 'CONNECT';
    })(WinHttpMethod || (WinHttpMethod = {}));
    var Metrics;
    (function (Metrics) {
        Metrics[(Metrics['DNS'] = 0)] = 'DNS';
        Metrics[(Metrics['Connect'] = 1)] = 'Connect';
        Metrics[(Metrics['Load'] = 2)] = 'Load';
        Metrics[(Metrics['Wait'] = 3)] = 'Wait';
        Metrics[(Metrics['Start'] = 4)] = 'Start';
        Metrics[(Metrics['Redirect'] = 5)] = 'Redirect';
        Metrics[(Metrics['Duration'] = 6)] = 'Duration';
        Metrics[(Metrics['SSL'] = 7)] = 'SSL';
    })(Metrics || (Metrics = {}));
    var VisitorStorage = (function () {
        function VisitorStorage() {
            this.userId = -1;
            this.sessionId = 0;
            this.sessionTime = 0;
            this.pageViewCount = 0;
            this.viewCount = 0;
            this.pageViewId = 0;
            this.postFlag = -1;
            this.sendWaterfall = false;
            this.exitToEntry = 0;
        }
        VisitorStorage.prototype.resetViewCount = function () {
            this.viewCount = 1;
        };
        VisitorStorage.prototype.save = function () {
            var text = this.getText();
            Storage.save(text);
        };
        VisitorStorage.prototype.load = function () {
            var storeValue = Storage.read();
            if (!storeValue) {
                return false;
            }
            var split = storeValue.split(',');
            for (var _i = 0, split_2 = split; _i < split_2.length; _i++) {
                var visitorVal = split_2[_i];
                var array = visitorVal.split(':');
                if (array.length !== 2) {
                    continue;
                }
                var key = array[0];
                if (typeof key === 'string') {
                    key = key.trim();
                }
                var value = array[1];
                if (key === CookieIdentifier.UrlCheckSum) {
                    this.urlCheckSum = value;
                    continue;
                }
                var num = parseInt(array[1], 10);
                if (isNaN(num)) {
                    continue;
                }
                switch (key) {
                    case CookieIdentifier.UserId:
                        this.userId = num;
                        break;
                    case CookieIdentifier.SessionId:
                        this.sessionId = num;
                        break;
                    case CookieIdentifier.SessionTime:
                        this.sessionTime = num;
                        break;
                    case CookieIdentifier.PageViewCount:
                        this.pageViewCount = num;
                        break;
                    case CookieIdentifier.PostFlag:
                        this.postFlag = num;
                        break;
                }
            }
            return true;
        };
        VisitorStorage.prototype.getText = function () {
            var text = CookieIdentifier.UserId + ':' + this.userId + ',';
            text += CookieIdentifier.SessionId + ':' + this.sessionId + ',';
            text += CookieIdentifier.SessionTime + ':' + this.sessionTime + ',';
            text += CookieIdentifier.PageViewCount + ':' + this.pageViewCount + ',';
            text += CookieIdentifier.UrlCheckSum + ':' + this.urlCheckSum + ',';
            text += CookieIdentifier.PostFlag + ':' + this.postFlag;
            return text;
        };
        return VisitorStorage;
    })();
    var Visitor = (function () {
        function Visitor() {
            this.sessionExpire = 30 * 60 * 1000;
            this.store = new VisitorStorage();
        }
        Visitor.prototype.updateSessionTime = function () {
            if (!this.store) {
                return;
            }
            var time = new Date().getTime();
            if (time - this.store.sessionTime > this.sessionExpire) {
                this.store.sessionId = 0;
            }
            this.store.sessionTime = time;
            this.updateStore();
        };
        Visitor.prototype.updateStore = function () {
            if (!this.store) {
                return;
            }
            this.store.save();
        };
        Visitor.prototype.initStore = function () {
            var hasStoredValue = this.store.load();
            if (!hasStoredValue) {
                return;
            }
            if (this.store.postFlag == 1) {
                var rate = this.getUserId(config.sampleRate / 100);
                var waterfallRate = rate / (100 / config.waterfallSampleRate);
                this.store.sendWaterfall = this.store.userId <= waterfallRate;
            }
        };
        Visitor.prototype.resetPostFlag = function () {
            this.store.postFlag = 0;
            if (config.sampleRate < 0) {
                this.store.postFlag = -1;
                return;
            }
            var rate = this.getUserId(config.sampleRate / 100);
            if (this.store.userId <= rate) {
                this.store.postFlag = 1;
                var waterfallRate = rate / (100 / config.waterfallSampleRate);
                this.store.sendWaterfall = this.store.userId <= waterfallRate;
            }
        };
        Visitor.prototype.getReferrer = function (url) {
            var host = this.getHostName(url).replace(':', '-');
            var index = url.indexOf('?');
            var n = 0;
            for (var i = host.length; i < url.length; i++) {
                n += url.charCodeAt(i) % i;
            }
            return host + '/' + (index < 0 ? url.length : index) + '/' + url.length + '/' + n;
        };
        Visitor.prototype.getHostName = function (url) {
            var start = url.indexOf('//') + 2;
            var end = url.indexOf('/', start);
            if (start < 2 && end == -1) {
                return url;
            }
            if (end == -1) {
                end = url.length;
            }
            return url.substring(start, end);
        };
        Visitor.prototype.init = function () {
            var start = profiler.data.start;
            this.initStore();
            if (this.store.userId == -1) {
                var userId = this.store.userId;
                if (userId != testUserId && userId > -1) {
                    this.store.userId = userId;
                    this.resetPostFlag();
                }
            }
            if (this.store.userId == -1 || this.store.userId == testUserId) {
                this.store.userId = this.getUserId();
                this.resetPostFlag();
            }
            if (this.store.sessionId == 0 || start - this.store.sessionTime > this.sessionExpire) {
                this.store.sessionId = Math.floor(1 + Math.random() * ((Math.pow(2, 32) - 2) / 2));
                this.store.pageViewCount = 1;
            } else {
                if (this.store.pageViewCount < 65535) {
                    this.store.pageViewCount++;
                }
                if (
                    this.getReferrer(pageWindow.document.referrer) == this.store.urlCheckSum &&
                    this.store.sessionTime > 0
                ) {
                    this.store.exitToEntry = start - this.store.sessionTime;
                }
            }
            this.store.sessionTime = new Date().getTime();
            this.store.pageViewId = Math.floor(1 + Math.random() * ((Math.pow(2, 16) - 2) / 2));
            this.store.urlCheckSum = this.getReferrer(pageWindow.location.href);
            this.store.resetViewCount();
            this.updateStore();
            var hasVisitorData = this.store.load();
            return hasVisitorData;
        };
        Visitor.prototype.getUserId = function (seed) {
            if (seed === void 0) {
                seed = Math.random();
            }
            return Math.floor(1 + seed * ((Math.pow(2, 64) - 2) / 2));
        };
        Visitor.prototype.shouldPost = function () {
            return this.store.postFlag == 1;
        };
        return Visitor;
    })();
    var TreeNode = (function () {
        function TreeNode(char) {
            this.char = char;
            this.children = [];
        }
        return TreeNode;
    })();
    var Tree = (function () {
        function Tree() {
            this.root = new TreeNode('');
            this.isReversed = true;
        }
        Tree.prototype.add = function (parent, char) {
            if (parent === void 0) {
                parent = this.root;
            }
            var children = parent.children;
            for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
                var child = children_1[_i];
                if (child.char == char) {
                    return child;
                }
            }
            var node = new TreeNode(char);
            children.push(node);
            node.parent = parent;
            return node;
        };
        Tree.prototype.toObject = function () {
            var obj = {};
            var isSuffix = this.isReversed;
            (function recurse(curr, obj) {
                var isRoot = curr.char == '';
                var arg;
                if (isRoot) {
                    arg = obj;
                } else {
                    var key = curr.char;
                    if (curr.children.length == 1) {
                        while (curr.children.length == 1) {
                            curr = curr.children[0];
                            key = isSuffix ? curr.char + key : key + curr.char;
                        }
                    }
                    obj[key] = curr.data || {};
                    arg = obj[key];
                }
                for (var i = 0; i < curr.children.length; i++) {
                    recurse(curr.children[i], arg);
                }
            })(this.root, obj);
            return obj;
        };
        return Tree;
    })();
    var WaterfallItem = (function () {
        function WaterfallItem(resource) {
            this.dns = null;
            this.connect = null;
            this.load = null;
            this.wait = null;
            this.start = 0;
            this.duration = 0;
            this.redirect = 0;
            this.ssl = null;
            this.url = resource.name;
            var func = Util.getValue;
            this.dns = func(resource, Metrics.DNS);
            this.connect = func(resource, Metrics.Connect);
            this.wait = func(resource, Metrics.Wait);
            this.load = func(resource, Metrics.Load);
            this.start = func(resource, Metrics.Start);
            this.duration = func(resource, Metrics.Duration);
            this.redirect = func(resource, Metrics.Redirect);
            this.ssl = func(resource, Metrics.SSL);
        }
        Object.defineProperty(WaterfallItem.prototype, 'url', {
            get: function () {
                return this._url;
            },
            set: function (u) {
                if (u.indexOf('http://') !== -1) {
                    this.protocol = 0;
                } else if (u.indexOf('https://') !== -1) {
                    this.protocol = 1;
                }
                var host = u.split('/').slice(1, 3).join('');
                var index = host.indexOf(':');
                if (index != -1) {
                    var p = host.substr(index + 1);
                    var num = parseInt(p);
                    if (!isNaN(num)) {
                        this.port = num;
                    }
                }
                u = u.substr(u.indexOf(host) + host.length);
                index = u.indexOf('?');
                if (index != -1) {
                    u = u.substr(0, index);
                }
                index = u.indexOf('#');
                if (index != -1) {
                    u = u.substr(0, index);
                }
                u = u.substr(0, 64);
                this._url = u;
            },
            enumerable: true,
            configurable: true,
        });
        WaterfallItem.prototype.translateForPost = function () {
            var round = Math.round;
            var roundedValue = Util.getRoundedValue;
            var obj = {
                u: this.url,
                pr: this.protocol,
            };
            var setIfNumber = function (key, num) {
                if (typeof num == 'number' && !isNaN(num)) {
                    obj[key] = num;
                }
            };
            setIfNumber('pt', this.port);
            setIfNumber('dn', roundedValue(this.dns));
            setIfNumber('fc', roundedValue(this.connect));
            setIfNumber('ld', roundedValue(this.load));
            setIfNumber('wt', roundedValue(this.wait));
            setIfNumber('st', roundedValue(this.start));
            setIfNumber('rd', roundedValue(this.redirect));
            setIfNumber('dr', roundedValue(this.duration));
            setIfNumber('ssl', roundedValue(this.ssl));
            return obj;
        };
        return WaterfallItem;
    })();
    var AjaxItem = (function (_super) {
        __extends(AjaxItem, _super);
        function AjaxItem(timing, resource, isSummary) {
            var _this = _super.call(this, resource) || this;
            _this.responseTime = 0;
            _this.sendSize = 0;
            _this.responseSize = 0;
            _this.method = WinHttpMethod[timing.method.toUpperCase()];
            if (timing.complete && timing.connectionEstablished) {
                _this.responseTime = timing.complete - timing.connectionEstablished;
            }
            _this.isSummary = isSummary;
            if (isSummary) {
                _this.start = undefined;
                _this.count = 1;
            } else {
                _this.isAsync = timing.isAsync;
            }
            _this.sendSize = timing.sendSize || 0;
            _this.responseSize = timing.responseSize || 0;
            return _this;
        }
        AjaxItem.prototype.update = function (timing, resource) {
            var func = Util.getValue;
            if (resource.responseStart) {
                this.dns += func(resource, Metrics.DNS);
                this.connect += func(resource, Metrics.Connect);
                this.wait += func(resource, Metrics.Wait);
                this.load += func(resource, Metrics.Load);
                this.ssl += func(resource, Metrics.SSL);
            }
            this.duration += func(resource, Metrics.Duration);
            this.redirect += func(resource, Metrics.Redirect);
            this.sendSize += timing.sendSize || 0;
            this.responseSize += timing.responseSize || 0;
            this.count++;
        };
        AjaxItem.prototype.translateForPost = function () {
            var obj = _super.prototype.translateForPost.call(this);
            if (this.isSummary) {
                obj['n'] = this.count;
            } else {
                obj['ia'] = this.isAsync ? 1 : 0;
            }
            obj['md'] = this.method;
            obj['rp'] = Math.round(this.responseTime);
            obj['ss'] = this.sendSize;
            obj['rs'] = this.responseSize;
            return obj;
        };
        return AjaxItem;
    })(WaterfallItem);
    var HostSummary = (function () {
        function HostSummary() {
            this.count = 0;
            this.dns = null;
            this.connect = null;
            this.load = null;
            this.wait = null;
            this.duration = 0;
            this.redirect = 0;
            this.ssl = null;
        }
        HostSummary.prototype.addAjaxItem = function (timing, resource) {
            this.update(resource);
            var ajax = new AjaxItem(timing, resource, true);
            if (typeof this._ajax == 'undefined') {
                this._ajax = [];
                this._ajax.push(ajax);
                return;
            }
            for (var _i = 0, _a = this._ajax; _i < _a.length; _i++) {
                var a = _a[_i];
                if (a.url == ajax.url) {
                    a.update(timing, resource);
                    return;
                }
            }
            if (this._ajax.length < 10) {
                this._ajax.push(ajax);
            }
        };
        HostSummary.prototype.update = function (resource) {
            var func = Util.getValue;
            if (resource.responseStart) {
                this.dns += func(resource, Metrics.DNS);
                this.connect += func(resource, Metrics.Connect);
                this.wait += func(resource, Metrics.Wait);
                this.load += func(resource, Metrics.Load);
                this.ssl += func(resource, Metrics.SSL);
            }
            this.duration += func(resource, Metrics.Duration);
            this.redirect += func(resource, Metrics.Redirect);
            this.count++;
        };
        HostSummary.prototype.translateForPost = function () {
            var roundedValue = Util.getRoundedValue;
            var obj = {
                n: this.count,
                dn: roundedValue(this.dns),
                fc: roundedValue(this.connect),
                ld: roundedValue(this.load),
                wt: roundedValue(this.wait),
                dr: roundedValue(this.duration),
                rd: roundedValue(this.redirect),
                ssl: roundedValue(this.ssl),
            };
            if (this._ajax) {
                var ajax = [];
                for (var _i = 0, _a = this._ajax; _i < _a.length; _i++) {
                    var a = _a[_i];
                    ajax.push(a.translateForPost());
                }
                obj['ax'] = ajax;
            }
            return obj;
        };
        return HostSummary;
    })();
    var HostWaterfall = (function () {
        function HostWaterfall() {
            this._resources = [];
        }
        HostWaterfall.prototype.translateForPost = function () {
            var a = [];
            for (var _i = 0, _a = this._resources; _i < _a.length; _i++) {
                var res = _a[_i];
                a.push(res.translateForPost());
            }
            return a;
        };
        HostWaterfall.prototype.addItem = function (resource) {
            var item = new WaterfallItem(resource);
            this._resources.push(item);
        };
        HostWaterfall.prototype.addAjaxItem = function (timing, resource) {
            var ajax = new AjaxItem(timing, resource, false);
            this._resources.push(ajax);
        };
        return HostWaterfall;
    })();
    var PostData = (function (_super) {
        __extends(PostData, _super);
        function PostData() {
            var _this = (_super !== null && _super.apply(this, arguments)) || this;
            _this.maxJsErrors = 10;
            _this.charCodes = {
                '\b': '\\b',
                '\t': '\\t',
                '\n': '\\n',
                '\f': '\\f',
                '\r': '\\r',
                '"': '\\"',
                '\\': '\\\\',
                '&': '%26',
            };
            _this.strRegex = /["&\\\x00-\x1f\x7f-\x9f]/g;
            return _this;
        }
        PostData.prototype.toString = function (sendWaterfall) {
            var obj = this.translateForPost(sendWaterfall);
            if (typeof JSON == 'undefined') {
                return this.jsonStringify(obj);
            }
            return JSON.stringify(obj);
        };
        PostData.prototype.strEscape = function (value) {
            var char = this.charCodes[value];
            if (char) {
                return char;
            }
            var index = value.charCodeAt(0);
            return '\\u00' + Math.floor(index / 16).toString(16) + (index % 16).toString(16);
        };
        PostData.prototype.jsonStringify = function (value) {
            var arr = new Array();
            switch (typeof value) {
                case 'string':
                    return this.strRegex.test(value)
                        ? '"' + value.replace(this.strRegex, this.strEscape) + '"'
                        : '"' + value + '"';
                case 'number':
                    return isFinite(value) ? String(value) : 'null';
                case 'boolean':
                    return String(value);
                case 'object':
                    if (!value) {
                        return 'null';
                    }
                    if (value.constructor === Date) {
                    }
                    if (typeof value.length == 'number' && !value.propertyIsEnumerable('length')) {
                        for (var _i = 0, _a = value; _i < _a.length; _i++) {
                            var a = _a[_i];
                            arr.push(this.jsonStringify(a));
                        }
                        return '[' + arr.join(',') + ']';
                    }
                    for (var key in value) {
                        if (typeof key == 'string') {
                            var str = this.jsonStringify(value[key]);
                            if (!!str) {
                                arr.push(this.jsonStringify(key) + ':' + str);
                            }
                        }
                    }
                    return '{' + arr.join(',') + '}';
            }
            return '';
        };
        PostData.prototype.translateForPost = function (sendWaterfall) {
            var obj = new Object();
            obj['v'] = version;
            obj['pt'] = this.postType;
            obj['ui'] = sonarUniqueId;
            obj['si'] = this.sessionId;
            obj['di'] = sonarSiteId;
            obj['pi'] = this.pageViewId;
            obj['jsc'] = this.jsErrorCount || 0;
            obj['rf'] = this.referrer;
            obj['pc'] = this.pageViewCount;
            obj['vc'] = this.viewCount;
            obj['dh'] = this.screenHeight;
            obj['dw'] = this.screenWidth;
            obj['rc'] = this.redirectCount || 0;
            obj['tp'] = this.timeOnPage;
            obj['tti'] = this.timeToInteract;
            obj['vct'] = this.vizComplete;
            obj['et'] = this.engagementTime;
            obj['fet'] = this.firstEngagementTime;
            obj['jsc'] = this.jsErrorCount || 0;
            obj['fid'] = this.firstInputDelay;
            if (this.jsErrors && this.jsErrors.length > 0) {
                var arr = [];
                for (var i = 0; i < Math.min(this.jsErrors.length, this.maxJsErrors); i++) {
                    arr.push(this.translateErrorForPost(this.jsErrors[i]));
                }
                obj['jse'] = arr;
            }
            if (this.hasErrors) {
                obj['ae'] = this.getErrors();
            }
            if (this.hasIndicators) {
                obj['ind'] = this.getIndicators();
            }
            if (this.hasTracepoints) {
                obj['tra'] = this.getTracepoints();
            }
            if (this.isConversion) {
                obj['cv'] = this.isConversion ? 1 : 0;
                if (this.revenue) {
                    obj['rv'] = this.revenue;
                }
                if (this.revenueItems) {
                    obj['ri'] = this.revenueItems;
                }
            }
            if (this.pageGroup) {
                obj['pg'] = this.pageGroup;
            }
            if (this.variation) {
                obj['ab'] = this.variation;
            }
            if (this.resources || this.ajaxRequests) {
                var r = this.translateResources(this.resources, this.ajaxRequests);
                obj['res'] = r.summary;
                if (sendWaterfall) {
                    obj['wf'] = r.waterfall;
                }
            }
            if (typeof this.isNewView == 'boolean') {
                obj['nv'] = this.isNewView ? 1 : 0;
            }
            if (!this.isNewPageView) {
                obj['np'] = 0;
                return obj;
            }
            obj['np'] = 1;
            obj['dn'] = this.dns;
            obj['fc'] = this.fullConnect;
            obj['wt'] = this.wait;
            obj['ld'] = this.load;
            obj['de'] = this.domInteractive;
            obj['dl'] = this.domLoaded;
            obj['dc'] = this.docComplete;
            obj['rp'] = this.response;
            obj['cl'] = this.contentLoad;
            obj['rd'] = this.redirect;
            obj['rc'] = this.redirectCount || 0;
            obj['fp'] = this.firstPaint;
            obj['fcp'] = this.firstContentPaint;
            obj['fid'] = this.firstInputDelay;
            obj['maf'] = this.markAboveTheFold;
            obj['mfl'] = this.markFullyLoaded;
            obj['mfv'] = this.markFullyVisible;
            obj['mtu'] = this.markTimeToUserAction;
            if (this.secureConnect) {
                obj['sc'] = this.secureConnect;
            }
            if (this.exitToEntry) {
                obj['xe'] = this.exitToEntry;
            }
            if (this.entryToOnLoad) {
                obj['el'] = this.entryToOnLoad;
            }
            if (this.prerender) {
                obj['pr'] = this.prerender;
            }
            return obj;
        };
        PostData.prototype.translateErrorForPost = function (error) {
            var obj = {};
            obj['m'] = error.message;
            obj['n'] = error.lineNumber;
            obj['c'] = error.count + 1;
            var url = error.url;
            var qStrIndex = url.indexOf('?');
            if (qStrIndex != -1) {
                url = url.substr(0, qStrIndex);
            }
            obj['u'] = url;
            return obj;
        };
        PostData.prototype.translateResources = function (resources, ajaxResources) {
            var hasResources = !!resources;
            var hasAjaxResources = !!ajaxResources;
            if (!hasResources && !hasAjaxResources) {
                return null;
            }
            var getAjaxTiming = function (resource) {
                if (!hasResources || !hasAjaxResources) {
                    return null;
                }
                for (var _i = 0, ajaxResources_1 = ajaxResources; _i < ajaxResources_1.length; _i++) {
                    var a = ajaxResources_1[_i];
                    var url = a.url;
                    if (url.indexOf('http') != 0) {
                        var lastIndex = location.href.lastIndexOf('/');
                        url = location.href.substring(0, lastIndex) + '/' + url;
                    }
                    if (url == resource.name) {
                        return a;
                    }
                }
                return null;
            };
            var hostObj = {};
            if (resources) {
                for (var _i = 0, resources_1 = resources; _i < resources_1.length; _i++) {
                    var res = resources_1[_i];
                    if (!res) {
                        continue;
                    }
                    var host = res.name.split('/').slice(1, 3).join('');
                    if (!host || host.length == 0) {
                        continue;
                    }
                    var portIndex = host.indexOf(':');
                    if (portIndex != -1) {
                        host = host.substr(0, portIndex);
                    }
                    if (!hostObj.hasOwnProperty(host)) {
                        hostObj[host] = {
                            summary: new HostSummary(),
                            waterfall: new HostWaterfall(),
                        };
                    }
                    var h = hostObj[host];
                    var ajax = getAjaxTiming(res);
                    if (ajax) {
                        h.summary.addAjaxItem(ajax, res);
                        h.waterfall.addAjaxItem(ajax, res);
                    } else {
                        h.summary.update(res);
                        h.waterfall.addItem(res);
                    }
                }
            }
            var tree1 = new Tree();
            for (var name in hostObj) {
                var node = undefined;
                for (var i = name.length - 1; i >= 0; i--) {
                    var char = name[i];
                    node = tree1.add(node, char);
                }
                node.data = hostObj[name].summary.translateForPost();
            }
            var tree2 = new Tree();
            for (var name in hostObj) {
                var node = undefined;
                for (var i = name.length - 1; i >= 0; i--) {
                    var char = name[i];
                    node = tree2.add(node, char);
                }
                node.data = hostObj[name].waterfall.translateForPost();
            }
            var container = {
                summary: tree1.toObject(),
                waterfall: tree2.toObject(),
            };
            return container;
        };
        return PostData;
    })(DataWrapper);
    var DataProvider = (function () {
        function DataProvider() {
            var _this = this;
            this.visitor = new Visitor();
            this.postUrl = config.postUrl;
            this.didSendInitial = false;
            this.isDebugging = false;
            this.countResourcesSent = 0;
            this.didSoftNavigation = false;
            this.currentUrl = '';
            this.softNavigationStart = 0;
            this.MaxNumberOfPerformanceMarks = 1000;
            this.getTimeOnPage = function (isSoftNavigation) {
                var focusAwayTime = _this.getFocusAwayTime(isSoftNavigation);
                var navigationStart = _this.getNavigationStart(isSoftNavigation);
                var timeOnPage = now() - navigationStart - focusAwayTime;
                return timeOnPage;
            };
            this.getFirstEngagementTime = function (isSoftNavigation) {
                var navigationStart = _this.getNavigationStart(isSoftNavigation);
                if (profiler.getEventTimingHandler) {
                    var engagementStartTime = profiler.getEventTimingHandler().getFirstEngagementTime();
                    if (engagementStartTime && navigationStart) {
                        var firstEngagementTime = engagementStartTime - navigationStart;
                        return firstEngagementTime;
                    }
                }
                return 0;
            };
            this.getNavigationStart = function (isSoftNavigation) {
                return isSoftNavigation ? _this.softNavigationStart : pageWindow.performance.timing.navigationStart;
            };
            this.getFocusAwayTime = function (isSoftNavigation) {
                if (profiler.getEventTimingHandler) {
                    return profiler.getEventTimingHandler().getFocusAwayTime() || 0;
                }
            };
            this.updateDebugData = function () {
                var postObj = _this.createInitPostObject(PostType.OnBeforeUnload, false);
                var sendWaterfall =
                    _this.visitor.store.sendWaterfall || !!Util.getQueryStringValue(config.waterfallParameter);
                var dataStr = postObj.toString(sendWaterfall);
                profiler['debugData'] = postObj;
                profiler['unloadDebugData'] = dataStr;
            };
            this.onPageLoad = function () {
                if (_this.isDebugging) {
                    profiler['debugData'] = _this.createInitPostObject(PostType.OnLoad, false);
                    profiler['updateDebugData'] = _this.updateDebugData;
                    profiler['sendData'] = function () {
                        _this.doPost(PostType.OnBeforeUnload, false);
                    };
                    Util.stopEvents();
                    Util.addScriptTag(config.debugUrl, pageWindow);
                    return;
                }
                _this.visitor.updateSessionTime();
                _this.doPost(PostType.OnLoad, false);
            };
            this.captureSoftNavigations = function () {
                profiler.eventManager.add('hashchange', pageWindow, _this.onSoftNavigation);
                var history = pageWindow.history;
                if (!history) {
                    return;
                }
                var functionStr = 'function';
                if (typeof history.go === functionStr) {
                    var origGo_1 = history.go;
                    history.go = function (delta) {
                        _this.onSoftNavigation();
                        origGo_1.call(history, delta);
                    };
                }
                if (typeof history.back === functionStr) {
                    var origBack_1 = history.back;
                    history.back = function () {
                        _this.onSoftNavigation();
                        origBack_1.call(history);
                    };
                }
                if (typeof history.forward === functionStr) {
                    var origForward_1 = history.forward;
                    history.forward = function () {
                        _this.onSoftNavigation();
                        origForward_1.call(history);
                    };
                }
                if (typeof history.pushState === functionStr) {
                    var origPush_1 = history.pushState;
                    history.pushState = function (data, title, url) {
                        _this.onSoftNavigation();
                        origPush_1.call(history, data, title, url);
                    };
                }
            };
            this.onViewVisuallyComplete = function (val) {
                if (_this.didSoftNavigation) {
                    _this.doPost(PostType.OnLoad, true);
                }
            };
            this.onSoftNavigation = function () {
                var vc;
                if (pageWindow['CPVisuallyComplete']) {
                    vc = pageWindow['CPVisuallyComplete'];
                    vc.onComplete(_this.onViewVisuallyComplete);
                }
                _this.doPost(PostType.OnBeforeUnload, _this.didSoftNavigation);
                _this.visitor.store.viewCount++;
                pageWindow.setTimeout(function () {
                    _this.softNavigationStart = now();
                    if (profiler.getEventTimingHandler) {
                        var handler = profiler.getEventTimingHandler();
                        var inputHandler = profiler.getInputDelay();
                        handler.startSoftNavigationCapture();
                        inputHandler.startSoftNavigationCapture();
                        handler.resetSoftNavigationCapture();
                    }
                }, 0);
                _this.didSoftNavigation = true;
            };
            this.doPost = function (type, isSoftNavigation) {
                if (!_this.visitor.shouldPost()) {
                    return;
                }
                if (type == PostType.OnBeforeUnload && !profiler.data.loadFired) {
                    type = PostType.OnAbort;
                }
                var postObj;
                if (_this.didSendInitial) {
                    postObj = _this.createDiffPostObject(type, isSoftNavigation);
                } else {
                    postObj = _this.createInitPostObject(type, isSoftNavigation);
                    _this.didSendInitial = true;
                }
                var canSendWaterfall =
                    _this.visitor.store.sendWaterfall || !!Util.getQueryStringValue(config.waterfallParameter);
                var isWaterfallPost = type == PostType.OnBeforeUnload || type == PostType.OnAbort;
                var sendWaterfall = canSendWaterfall && isWaterfallPost;
                _this.makeRequest(postObj, sendWaterfall, type === PostType.OnLoad);
            };
            if (!profiler || !profiler.data) {
                return;
            }
            var didInitVisitor = this.visitor.init();
            this.isDebugging = !!Util.getQueryStringValue(config.debugParameter);
            if (!this.isDebugging && !didInitVisitor) {
                Util.stopEvents();
                return;
            }
            this.captureSoftNavigations();
            var didLoadPost = false;
            var loadPost = function () {
                if (didLoadPost) {
                    return;
                }
                profiler.data.loadFired = true;
                didLoadPost = true;
                _this.onPageLoad();
            };
            if (!profiler.data.loadFired && !!pageWindow.document) {
                profiler.data.loadFired = pageWindow.document.readyState == 'complete';
            }
            if (profiler.data.loadFired) {
                loadPost();
            } else {
                profiler.eventManager.add(windowEventDef.Load, parent.window, loadPost);
            }
            var didUnloadPost = false;
            var unloadPost = function () {
                if (didUnloadPost) {
                    return;
                }
                didUnloadPost = true;
                _this.doPost(PostType.OnBeforeUnload, false);
            };
            profiler.eventManager.add(windowEventDef.BeforeUnload, pageWindow, unloadPost);
            profiler.eventManager.add(windowEventDef.Unload, pageWindow, unloadPost);
        }
        DataProvider.prototype.createInitPostObject = function (ev, isSoftNavigation) {
            var postObj = this.createBasePostObj(ev, true, isSoftNavigation);
            var info = this.visitor.store;
            if (info.exitToEntry > 0) {
                postObj.exitToEntry = info.exitToEntry;
            }
            var entryToLoad = profiler.data.loadTime - profiler.data.start;
            if (entryToLoad > 0) {
                postObj.entryToOnLoad = entryToLoad;
            }
            if (document['webkitVisibilityState'] === 'prerender') {
                postObj.prerender = 1;
            }
            if (hasPerformance) {
                var arr = void 0;
                if (hasGetEntriesAPI) {
                    arr = pageWindow.performance.getEntriesByType('resource');
                    postObj.resources = arr;
                }
                if (ev != PostType.OnLoad) {
                    this.setClearResources();
                    if (config.clearResources && pageWindow.performance.clearResourceTimings) {
                        pageWindow.performance.clearResourceTimings();
                    } else {
                        this.countResourcesSent = arr.length;
                    }
                }
            }
            return postObj;
        };
        DataProvider.prototype.createDiffPostObject = function (ev, isSoftNavigation) {
            var postObj = this.createBasePostObj(ev, false, isSoftNavigation);
            if (hasPerformance) {
                var arr = [];
                if (hasGetEntriesAPI) {
                    arr = pageWindow.performance.getEntriesByType('resource');
                }
                if (ev != PostType.OnLoad) {
                    this.setClearResources();
                    if (config.clearResources && pageWindow.performance.clearResourceTimings) {
                        postObj.resources = arr;
                        pageWindow.performance.clearResourceTimings();
                    } else {
                        postObj.resources = arr.slice(this.countResourcesSent);
                        this.countResourcesSent = arr.length;
                    }
                }
            }
            return postObj;
        };
        DataProvider.prototype.createBasePostObj = function (ev, isNewPageView, isSoftNavigation) {
            var postObj = new PostData();
            postObj.postType = ev;
            postObj.isNewPageView = isNewPageView;
            postObj.siteId = config.siteId;
            postObj.referrer = encodeURI(pageWindow.location.href);
            postObj.sampleRate = config.sampleRate;
            postObj.waterfallSampleRate = config.waterfallSampleRate;
            if (ev === PostType.OnBeforeUnload || ev === PostType.OnAbort) {
                postObj.referrer = this.currentUrl || encodeURI(pageWindow.location.href);
            } else {
                postObj.referrer = encodeURI(pageWindow.location.href);
            }
            this.currentUrl = postObj.referrer;
            if (isSoftNavigation) {
                postObj.isNewView = ev == PostType.OnLoad;
            }
            var info = this.visitor.store;
            postObj.userId = info.userId;
            postObj.sessionId = info.sessionId;
            postObj.pageViewId = info.pageViewId;
            postObj.pageViewCount = info.pageViewCount;
            postObj.viewCount = info.viewCount;
            postObj.screenHeight = screen.height;
            postObj.screenWidth = screen.width;
            if (profiler.data.jsCount > 0) {
                postObj.jsErrorCount = profiler.data.jsCount;
                postObj.jsErrors = profiler.data.jsErrors;
                profiler.clearErrors();
            }
            if (profiler.hasInsight) {
                this.addInsightForPost(postObj);
                profiler.clearInfo();
            }
            if (profiler.data.ajax) {
                postObj.ajaxRequests = profiler.data.ajax.slice();
                profiler.clearAjax();
            }
            if (pageWindow['CPVisuallyComplete']) {
                var val = pageWindow['CPVisuallyComplete'].getValue();
                if (typeof val == 'number') {
                    postObj.vizComplete = val;
                }
            }
            if (pageWindow.performance) {
                var timing = pageWindow.performance.timing;
                var allowOrigin = timing.responseStart;
                postObj.dns = allowOrigin ? timing.domainLookupEnd - timing.domainLookupStart : null;
                postObj.fullConnect = allowOrigin ? timing.connectEnd - timing.connectStart : null;
                postObj.wait = allowOrigin ? timing.responseStart - timing.requestStart : null;
                postObj.load = allowOrigin ? timing.responseEnd - timing.responseStart : null;
                postObj.domInteractive = Util.getMetricValue(timing.domInteractive, timing.navigationStart);
                postObj.domLoaded = Util.getMetricValue(timing.domContentLoadedEventStart, timing.navigationStart);
                postObj.docComplete = Util.getMetricValue(timing.domComplete, timing.navigationStart);
                postObj.response = Util.getMetricValue(timing.responseEnd, timing.navigationStart);
                postObj.contentLoad = Util.getMetricValue(timing.loadEventStart, timing.domLoading);
                postObj.redirect = timing.redirectEnd - timing.redirectStart;
                if (timing['secureConnectionStart']) {
                    postObj.secureConnect = timing.connectEnd - timing['secureConnectionStart'];
                }
                if (hasGetEntriesAPI) {
                    var paintTimings = pageWindow.performance.getEntriesByType('paint');
                    if (paintTimings && paintTimings.length > 0) {
                        postObj.firstPaint = this.getPaintTimings(paintTimings, 'first-paint');
                        postObj.firstContentPaint = this.getPaintTimings(paintTimings, 'first-contentful-paint');
                    }
                }
                var contentLoadEnd = Util.getMetricValue(timing.domContentLoadedEventEnd, timing.navigationStart);
                var timeToInteract = performanceObserver.getLongTaskTime();
                postObj.timeToInteract =
                    contentLoadEnd && contentLoadEnd < timeToInteract ? timeToInteract : contentLoadEnd;
                if (pageWindow.performance.navigation) {
                    postObj.redirectCount = pageWindow.performance.navigation.redirectCount;
                }
                postObj.timeOnPage = this.getTimeOnPage(isSoftNavigation);
                if (profiler.getEventTimingHandler) {
                    postObj.engagementTime = profiler.getEventTimingHandler().getEngagementTime();
                }
                if (profiler.getInputDelay) {
                    postObj.firstInputDelay = profiler.getInputDelay().getFirstInputDelay();
                }
                postObj.firstEngagementTime = this.getFirstEngagementTime(isSoftNavigation);
                this.addPerformanceMarksToPostData(pageWindow.performance, postObj);
            }
            return postObj;
        };
        DataProvider.prototype.addPerformanceMarksToPostData = function (performance, postObj) {
            if (performance.getEntriesByType) {
                var marks = performance.getEntriesByType('mark');
                if (marks && marks.length > 0 && marks.length < this.MaxNumberOfPerformanceMarks) {
                    var validMarks = marks.filter(function (x) {
                        return x.startTime != null && x.duration != null;
                    });
                    for (var _i = 0, validMarks_1 = validMarks; _i < validMarks_1.length; _i++) {
                        var mark = validMarks_1[_i];
                        this.addMarkToPostData(mark, postObj);
                    }
                }
            }
        };
        DataProvider.prototype.addMarkToPostData = function (mark, postObj) {
            var markTime = mark.startTime + mark.duration;
            switch (mark.name) {
                case 'mark_fully_loaded':
                    postObj.markFullyLoaded = markTime;
                    break;
                case 'mark_fully_visible':
                    postObj.markFullyVisible = markTime;
                    break;
                case 'mark_above_the_fold':
                    postObj.markAboveTheFold = markTime;
                    break;
                case 'mark_time_to_user_action':
                    postObj.markTimeToUserAction = markTime;
                    break;
                default:
                    break;
            }
        };
        DataProvider.prototype.getPaintTimings = function (paintTimings, type) {
            var paintType = paintTimings.filter(function (x) {
                return x.name === type;
            });
            if (paintType && paintType.length > 0 && paintType[0].startTime) {
                return Math.round(paintType[0].startTime);
            }
        };
        DataProvider.prototype.setClearResources = function () {
            if (!!pageWindow['__cpPreventResourceClear']) {
                config.clearResources = pageWindow['__cpPreventResourceClear'] === false;
            }
        };
        DataProvider.prototype.addInsightForPost = function (postObj) {
            var insight = profiler.info;
            for (var name_1 in insight) {
                switch (name_1) {
                    case 'appError':
                        var n = insight[name_1];
                        if (n && typeof n == 'object') {
                            var num;
                            for (var key in n) {
                                num = Number(key);
                                if (isNaN(num)) {
                                    continue;
                                }
                                var tmp = n[key];
                                if (tmp && typeof tmp == 'string') {
                                    var str = tmp;
                                    if (str.length > 32) {
                                        str = str.substring(0, 32);
                                    }
                                    postObj.addError(key, str);
                                }
                            }
                        }
                        break;
                    case 'conversion':
                        var n = insight[name_1];
                        postObj.isConversion = true;
                        if (n) {
                            if (typeof n == 'object') {
                                var num;
                                for (var key in n) {
                                    num = Number(key);
                                    if (isNaN(num)) {
                                        continue;
                                    }
                                    var tmp = n[key];
                                    if (tmp && typeof tmp == 'number') {
                                        postObj.revenue = num;
                                        postObj.revenueItems = tmp;
                                    }
                                }
                            }
                        }
                        break;
                    case 'indicator':
                        var ind = this.buildInsight(insight[name_1], 0);
                        if (ind[0]) {
                            postObj.addIndicator(ind[1]);
                        }
                        break;
                    case 'tracepoint':
                        var tra = this.buildInsight(insight[name_1], '');
                        if (tra[0]) {
                            postObj.addTracepoint(tra[1]);
                        }
                        break;
                    case 'pageGroup':
                        var n = insight[name_1];
                        if (n !== undefined && typeof n == 'string') {
                            postObj.pageGroup = n;
                        }
                        break;
                    case 'variation':
                        var n = insight[name_1];
                        if (n !== undefined && typeof n == 'string') {
                            postObj.variation = n;
                        }
                        break;
                }
            }
        };
        DataProvider.prototype.buildInsight = function (insight, expected) {
            var obj = {};
            var ret = false;
            if (insight && typeof insight == 'object') {
                for (var key in insight) {
                    if (key) {
                        var n = insight[key];
                        if (n && typeof n == typeof expected) {
                            obj[key] = n;
                            ret = true;
                        }
                    }
                }
            }
            if (!ret) {
                return [ret, obj];
            }
            return [ret, obj];
        };
        DataProvider.prototype.makeRequest = function (postObj, sendWaterfall, runTraceroute) {
            var dataStr = postObj.toString(sendWaterfall);
            /*if (pageWindow.navigator && typeof pageWindow.navigator["sendBeacon"] == "function") {
                pageWindow.navigator["sendBeacon"](this.postUrl, dataStr);
            }
            else {
                var request = new XMLHttpRequest();
                if (window.XDomainRequest) {
                    request = new window.XDomainRequest();
                    request.timeout = 0;
                    request.onload = function () { };
                    request.onerror = function () { };
                    request.ontimeout = function () { };
                    request.onprogress = function () { };
                }
                request.open("POST", this.postUrl, false);
                request.setRequestHeader ? request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8') : null;
                request.send(dataStr);
                request = null;
            }*/

            var event = new CustomEvent('rumRequestSent', {
                detail: {
                    host: pageWindow.location.host,
                    siteId: sonarSiteId,
                    sessionId: postObj.sessionId,
                    data: dataStr,
                    runTraceroute: runTraceroute,
                },
            });

            pageWindow.dispatchEvent(event);
        };
        return DataProvider;
    })();
    var provider = new DataProvider();
})();
//# sourceMappingURL=main.js.map
var windowItem = parent.window || window;
windowItem.CPVisuallyComplete = (function () {
    var VisComplete = (function () {
        function VisComplete() {
            var _this = this;
            this.targetWindow = windowItem;
            this.mutation = undefined;
            this.mutationObserver = undefined;
            this.start = 0;
            this.waitMs = 2000;
            this.paintTimeMaxThreshold = 120000;
            this.maxResourceTiming = 0;
            this.mutationObserverVal = 0;
            this.scroll = 'scroll';
            this.click = 'click';
            this.maxDiffBetweenMutation = 500;
            this.disconnectObserverTimeout = 5000;
            this.removeListeners = function () {
                document.removeEventListener(_this.scroll, _this.clear);
                document.removeEventListener(_this.click, _this.clear);
            };
            this.addListeners = function () {
                document.addEventListener(_this.scroll, _this.clear);
                document.addEventListener(_this.click, _this.clear);
            };
            this.clear = function () {
                clearTimeout(_this.timeout);
                _this.removeListeners();
                _this.trigger();
            };
            this.onLoad = function () {
                _this.timeout = setTimeout(function () {
                    _this.removeListeners();
                    _this.calculate();
                }, _this.waitMs);
            };
            this.calculate = function () {
                if (!_this.targetWindow.performance) {
                    _this.trigger();
                    return;
                }
                _this.calcResourceBasedVisuallyCompleteTime();
                _this.trigger();
            };
            this.getPerformanceTime = function () {
                return _this.targetWindow['performance'].now();
            };
            this.resetValueOnSoftNav = function () {
                _this.mutationObserverVal = 0;
                _this.maxResourceTiming = 0;
                _this.softNav = false;
            };
            this.mutationCallback = function (mutationsList) {
                mutationsList.forEach(function (mutation) {
                    if (_this.targetWindow['performance'] && mutation.addedNodes.length > 0) {
                        var perfTime = _this.getPerformanceTime();
                        if (_this.softNav) {
                            _this.resetValueOnSoftNav();
                        }
                        perfTime = perfTime - _this.start;
                        if (
                            _this.mutationObserverVal === 0 ||
                            perfTime - _this.mutationObserverVal <= _this.maxDiffBetweenMutation
                        ) {
                            _this.mutationObserverVal = Math.round(perfTime);
                        }
                    }
                });
            };
            this.initMutationObserver = function () {
                var startTime = 0;
                var mutationObserver =
                    _this.targetWindow['MutationObserver'] ||
                    _this.targetWindow['WebKitMutationObserver'] ||
                    _this.targetWindow['MozMutationObserver'];
                if (mutationObserver) {
                    if (!_this.mutation) {
                        _this.mutation = new mutationObserver(_this.mutationCallback);
                    }
                    _this.observe();
                }
            };
            this.trigger = function () {
                if (_this.callback) {
                    var visCompTime = _this.getValue();
                    _this.callback(visCompTime);
                }
            };
            this.observe = function () {
                _this.mutation.observe(_this.targetWindow.document, {
                    childList: true,
                    attributes: true,
                    characterData: true,
                    subtree: true,
                    attributeOldValue: true,
                    characterDataOldValue: true,
                });
                setTimeout(function () {
                    _this.mutation.disconnect();
                }, _this.disconnectObserverTimeout);
            };
            this.getValue = function () {
                if (_this.maxResourceTiming || _this.mutationObserverVal) {
                    var visCompTime = 0;
                    if (_this.maxResourceTiming && _this.mutationObserverVal) {
                        visCompTime = Math.max(_this.maxResourceTiming, _this.mutationObserverVal);
                    } else if (_this.maxResourceTiming) {
                        visCompTime = _this.maxResourceTiming;
                    } else if (_this.mutationObserverVal) {
                        visCompTime = _this.mutationObserverVal;
                    }
                    return visCompTime;
                }
                return undefined;
            };
            this.onComplete = function (callback) {
                _this.callback = callback;
            };
            this.reset = function () {
                _this.mutationObserver = undefined;
                _this.softNav = true;
                if (_this.targetWindow['performance']) {
                    _this.start = _this.getPerformanceTime();
                    _this.initMutationObserver();
                    _this.onLoad();
                }
            };
            this.captureSoftNavigations = function () {
                if (!_this.targetWindow['HashChangeEvent']) {
                    return;
                }
                _this.addEvent('hashchange', _this.targetWindow, _this.reset);
                var history = _this.targetWindow.history;
                if (!history) {
                    return;
                }
                var functionStr = 'function';
                if (typeof history.go === functionStr) {
                    var origGo_1 = history.go;
                    history.go = function (delta) {
                        _this.reset();
                        origGo_1.call(history, delta);
                    };
                }
                if (typeof history.back === functionStr) {
                    var origBack_1 = history.back;
                    history.back = function () {
                        _this.reset();
                        origBack_1.call(history);
                    };
                }
                if (typeof history.forward === functionStr) {
                    var origForward_1 = history.forward;
                    history.forward = function () {
                        _this.reset();
                        origForward_1.call(history);
                    };
                }
                if (typeof history.pushState === functionStr) {
                    var origPush_1 = history.pushState;
                    history.pushState = function (data, title, url) {
                        _this.reset();
                        origPush_1.call(history, data, title, url);
                    };
                }
            };
            this.calcResourceBasedVisuallyCompleteTime = function () {
                _this.maxResourceTiming = _this.getMaxResourceTime();
            };
            this.initMutationObserver();
            this.captureSoftNavigations();
            this.init();
        }
        VisComplete.prototype.init = function (isReset) {
            var document = this.targetWindow.document;
            if (document.readyState == 'complete') {
                this.onLoad();
            } else {
                this.targetWindow.addEventListener('load', this.onLoad);
            }
            this.removeListeners();
            this.addListeners();
        };
        VisComplete.prototype.getMaxResourceTime = function () {
            var maxTime = 0;
            var initiatorTypes = ['img', 'iframe', 'css', 'script', 'subdocument'];
            var requests = this.targetWindow.performance.getEntriesByType('resource');
            for (var _i = 0, requests_1 = requests; _i < requests_1.length; _i++) {
                var request = requests_1[_i];
                var requestEnd = request.responseEnd;
                if (initiatorTypes.indexOf(request.initiatorType) > -1 && requestEnd > this.start) {
                    requestEnd = requestEnd - this.start;
                    if (!maxTime || requestEnd > maxTime) {
                        maxTime = Math.round(requestEnd);
                    }
                }
            }
            return maxTime;
        };
        VisComplete.prototype.addEvent = function (type, target, func) {
            if (!!this.targetWindow.attachEvent) {
                target.attachEvent('on' + type, func);
            } else {
                target.addEventListener(type, func, false);
            }
        };
        VisComplete.prototype.getResourceTimings = function () {
            try {
                var timings = this.targetWindow.performance.getEntriesByType('resource');
                return timings;
            } catch (_a) {}
        };
        VisComplete.prototype.getFirstPaintTime = function () {
            var paintTime = 0;
            try {
                var paintTimings = this.targetWindow.performance.getEntriesByType('paint');
                if (paintTimings && paintTimings.length > 0) {
                    var firstPaint = paintTimings.filter(function (x) {
                        return x.name === 'first-paint';
                    });
                    if (firstPaint && firstPaint.length > 0 && firstPaint[0].startTime) {
                        paintTime = firstPaint[0].startTime;
                    }
                    var firstContentfulPaint = paintTimings.filter(function (x) {
                        return x.name === 'first-contentful-paint';
                    });
                    if (firstContentfulPaint && firstContentfulPaint.length > 0 && firstContentfulPaint[0].startTime) {
                        paintTime = firstContentfulPaint[0].startTime;
                    }
                }
            } catch (_a) {}
            return paintTime;
        };
        return VisComplete;
    })();
    var visComplete = new VisComplete();
    return {
        getValue: visComplete.getValue,
        onComplete: visComplete.onComplete,
        reset: visComplete.reset,
    };
})();
