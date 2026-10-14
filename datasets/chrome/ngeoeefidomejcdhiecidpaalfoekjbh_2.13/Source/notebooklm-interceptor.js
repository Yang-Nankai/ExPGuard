// notebooklm-interceptor.js
// Runs in the page context (MAIN world) at document_start
(() => {
    console.log("🧠 Capsule Hub: Injected main world interceptor at document_start");

    // Detect if running inside a cross-origin subframe (e.g. NotebookLM app iframe on *.usercontent.goog).
    const __tilantraIsSubframe = (window.self !== window.top);
    const __tilantraIsNLMFrame = __tilantraIsSubframe && (
        (document.referrer || '').includes('notebooklm.google.com') ||
        (window.location.href || '').includes('notebooklm-apps')
    );
    if (__tilantraIsNLMFrame) {
        console.log('🧠 Capsule Hub: Running inside NotebookLM app frame — CSV relay mode active.');
    }

    // CSV Download Interception
    try {
        const originalCreateObjectURL = URL.createObjectURL;
        if (!window.__tilantraObjectUrlsMap) {
            window.__tilantraObjectUrlsMap = {};
        }
        URL.createObjectURL = function(blob) {
            const url = originalCreateObjectURL.apply(this, arguments);
            try {
                if (blob instanceof Blob) {
                    if (__tilantraIsNLMFrame) {
                        // In the NotebookLM app subframe: relay every text blob to the parent page unconditionally.
                        blob.text().then(text => {
                            if (text && text.length > 0) {
                                console.log('🔊 Capsule Hub Interceptor [FRAME]: Captured blob, relaying to parent (' + text.length + ' chars)');
                                window.parent.postMessage({
                                    type: 'TILANTRA_FLASHCARD_CSV_CAPTURED',
                                    csvText: text
                                }, '*');
                            }
                        }).catch(err => {
                            console.error('Error reading blob in frame interceptor:', err);
                        });
                        // Still map the URL so the anchor interceptor can read it if needed.
                        window.__tilantraObjectUrlsMap[url] = blob;
                    } else if (!__tilantraIsSubframe && window.__tilantraExpectingCsv) {
                        // In the main page: only capture when the inserter has signalled it's expecting a CSV.
                        blob.text().then(text => {
                            console.log('🔊 Capsule Hub Interceptor: Intercepted Blob text from URL.createObjectURL:', text.substring(0, 200));
                            window.__tilantraCapturedCsvText = text;
                        }).catch(err => {
                            console.error('Error reading intercepted blob:', err);
                        });
                        window.__tilantraObjectUrlsMap[url] = blob;
                    }
                }
            } catch (e) {
                console.error('Error in URL.createObjectURL interceptor:', e);
            }
            return url;
        };

        const originalAnchorClick = HTMLAnchorElement.prototype.click;
        HTMLAnchorElement.prototype.click = function() {
            try {
                const href = this.href || '';
                const downloadAttr = this.getAttribute('download') || '';
                const isCsvDownload = downloadAttr.endsWith('.csv') || href.startsWith('blob:');

                if (__tilantraIsNLMFrame && isCsvDownload) {
                    // In the NotebookLM app subframe: intercept and relay to parent.
                    console.log('🔊 Capsule Hub Interceptor [FRAME]: Intercepted anchor CSV download, relaying to parent. href:', href);
                    if (window.__tilantraObjectUrlsMap && window.__tilantraObjectUrlsMap[href]) {
                        const blob = window.__tilantraObjectUrlsMap[href];
                        blob.text().then(text => {
                            window.parent.postMessage({
                                type: 'TILANTRA_FLASHCARD_CSV_CAPTURED',
                                csvText: text
                            }, '*');
                        });
                    }
                    return; // Prevent the native browser download!
                } else if (!__tilantraIsSubframe && window.__tilantraExpectingCsv && isCsvDownload) {
                    // In the main page: intercept when expecting a CSV.
                    console.log('🔊 Capsule Hub Interceptor: Intercepted anchor click for CSV download! href:', href, 'download:', downloadAttr);
                    if (window.__tilantraObjectUrlsMap && window.__tilantraObjectUrlsMap[href]) {
                        const blob = window.__tilantraObjectUrlsMap[href];
                        blob.text().then(text => {
                            window.__tilantraCapturedCsvText = text;
                        });
                    }
                    return; // Prevent the native browser download!
                }
            } catch (e) {
                console.error('Error in HTMLAnchorElement click interceptor:', e);
            }
            return originalAnchorClick.apply(this, arguments);
        };

        // Capture click listener on window to catch dynamic dispatches
        window.addEventListener('click', (ev) => {
            try {
                if (!ev.target) return;
                const anchor = ev.target.closest('a');
                if (!anchor) return;
                const href = anchor.href || '';
                const downloadAttr = anchor.getAttribute('download') || '';
                const isCsvDownload = downloadAttr.endsWith('.csv') || href.startsWith('blob:');

                if (__tilantraIsNLMFrame && isCsvDownload) {
                    // In the NotebookLM app subframe: relay to parent.
                    ev.preventDefault();
                    ev.stopPropagation();
                    if (window.__tilantraObjectUrlsMap && window.__tilantraObjectUrlsMap[href]) {
                        const blob = window.__tilantraObjectUrlsMap[href];
                        blob.text().then(text => {
                            window.parent.postMessage({
                                type: 'TILANTRA_FLASHCARD_CSV_CAPTURED',
                                csvText: text
                            }, '*');
                        });
                    }
                } else if (!__tilantraIsSubframe && window.__tilantraExpectingCsv && isCsvDownload) {
                    // In the main page: intercept when expecting a CSV.
                    console.log('🔊 Capsule Hub Interceptor: Intercepted capture-phase click for CSV download!');
                    ev.preventDefault();
                    ev.stopPropagation();
                    if (window.__tilantraObjectUrlsMap && window.__tilantraObjectUrlsMap[href]) {
                        const blob = window.__tilantraObjectUrlsMap[href];
                        blob.text().then(text => {
                            window.__tilantraCapturedCsvText = text;
                        });
                    }
                }
            } catch (e) {}
        }, true);
    } catch (e) {
        console.error("Capsule Hub: Failed to hook CSV download interceptor:", e);
    }

    // Intercept Audio src changes to capture the blob URL
    try {
        const originalSrcDesc = Object.getOwnPropertyDescriptor(HTMLAudioElement.prototype, 'src');
        if (originalSrcDesc && originalSrcDesc.set) {
            Object.defineProperty(HTMLAudioElement.prototype, 'src', {
                set(val) {
                    console.log("🔊 Capsule Hub Interceptor: HTMLAudioElement src setter:", val);
                    window.__tilantraCapturedAudioSrc = val;
                    return originalSrcDesc.set.call(this, val);
                },
                get() {
                    return originalSrcDesc.get.call(this);
                },
                configurable: true
            });
        }
        
        const originalSourceSrcDesc = Object.getOwnPropertyDescriptor(HTMLSourceElement.prototype, 'src');
        if (originalSourceSrcDesc && originalSourceSrcDesc.set) {
            Object.defineProperty(HTMLSourceElement.prototype, 'src', {
                set(val) {
                    console.log("🔊 Capsule Hub Interceptor: HTMLSourceElement src setter:", val);
                    window.__tilantraCapturedAudioSrc = val;
                    return originalSourceSrcDesc.set.call(this, val);
                },
                get() {
                    return originalSourceSrcDesc.get.call(this);
                },
                configurable: true
            });
        }
    } catch (e) {
        console.error("Capsule Hub: Failed to hook Audio/Source src setters:", e);
    }
    
    // Store original functions
    const originalHTMLElementClick = HTMLElement.prototype.click;
    const originalHTMLInputElementClick = HTMLInputElement.prototype.click;
    const originalShowOpenFilePicker = window.showOpenFilePicker;
    const originalDispatchEvent = EventTarget.prototype.dispatchEvent;
    
    const interceptClick = function(target, clickFn, args) {
        if (target && target.tagName === 'INPUT' && target.type === 'file' && window.__tilantraFilesToInject) {
            console.log("✅ Capsule Hub: Intercepted file input click via document_start hook!", target);
            window.__tilantraCapturedInput = target;
            return; // Prevent opening the browser's native file picker!
        }
        return clickFn.apply(target, args);
    };

    // Override HTMLElement.prototype.click
    HTMLElement.prototype.click = function() {
        return interceptClick(this, originalHTMLElementClick, arguments);
    };

    // Override HTMLInputElement.prototype.click
    HTMLInputElement.prototype.click = function() {
        return interceptClick(this, originalHTMLInputElementClick, arguments);
    };

    // Override EventTarget.prototype.dispatchEvent
    EventTarget.prototype.dispatchEvent = function(event) {
        if (event && event.type === 'click' && this.tagName === 'INPUT' && this.type === 'file' && window.__tilantraFilesToInject) {
            console.log("✅ Capsule Hub: Intercepted click dispatch event on file input via document_start hook!", this);
            window.__tilantraCapturedInput = this;
            // Prevent default and stop propagation to prevent browser file dialog
            event.preventDefault();
            event.stopPropagation();
            return false;
        }
        return originalDispatchEvent.apply(this, arguments);
    };
    
    // Override window.showOpenFilePicker
    window.showOpenFilePicker = async function(options) {
        if (window.__tilantraFilesToInject) {
            console.log("✅ Capsule Hub: Intercepted showOpenFilePicker via document_start hook!");
            window.__tilantraFilePickerIntercepted = true;
            
            const files = window.__tilantraFilesToInject;
            // Clear the files to prevent double-triggering
            window.__tilantraFilesToInject = null;
            
            return files.map(file => ({
                kind: 'file',
                name: file.name,
                getFile: async () => file,
                queryPermission: async () => 'granted',
                requestPermission: async () => 'granted'
            }));
        }
        if (originalShowOpenFilePicker) {
            return originalShowOpenFilePicker.apply(this, arguments);
        }
        throw new Error("showOpenFilePicker not supported natively");
    };

    // Also add a capture-phase click listener on window to catch dynamic dispatches
    window.addEventListener('click', (ev) => {
        if (ev.target && ev.target.tagName === 'INPUT' && ev.target.type === 'file' && window.__tilantraFilesToInject) {
            console.log("✅ Capsule Hub: Intercepted click event on file input via document_start hook!", ev.target);
            window.__tilantraCapturedInput = ev.target;
            ev.preventDefault();
            ev.stopPropagation();
        }
    }, true);

    // Dynamic iframe prototype patcher to handle uploader sandbox iframes
    const patchWindow = (win) => {
        try {
            if (!win || win.__tilantraPatched) return;
            win.__tilantraPatched = true;
            
            const origHTMLElementClick = win.HTMLElement.prototype.click;
            const origHTMLInputElementClick = win.HTMLInputElement.prototype.click;
            const origDispatchEvent = win.EventTarget.prototype.dispatchEvent;
            
            const interceptClickIframe = function(target, clickFn, args) {
                if (target && target.tagName === 'INPUT' && target.type === 'file' && window.__tilantraFilesToInject) {
                    console.log("✅ Capsule Hub: Intercepted file input click via iframe hook!", target);
                    window.__tilantraCapturedInput = target;
                    return; // Prevent native file dialog
                }
                return clickFn.apply(target, args);
            };
            
            win.HTMLElement.prototype.click = function() {
                return interceptClickIframe(this, origHTMLElementClick, arguments);
            };
            
            win.HTMLInputElement.prototype.click = function() {
                return interceptClickIframe(this, origHTMLInputElementClick, arguments);
            };
            
            win.EventTarget.prototype.dispatchEvent = function(event) {
                if (event && event.type === 'click' && this.tagName === 'INPUT' && this.type === 'file' && window.__tilantraFilesToInject) {
                    console.log("✅ Capsule Hub: Intercepted click dispatch event on file input via iframe hook!", this);
                    window.__tilantraCapturedInput = this;
                    event.preventDefault();
                    event.stopPropagation();
                    return false;
                }
                return origDispatchEvent.apply(this, arguments);
            };
        } catch (e) {}
    };

    // Override HTMLIFrameElement.prototype.contentWindow and contentDocument getters
    try {
        const descWindow = Object.getOwnPropertyDescriptor(HTMLIFrameElement.prototype, 'contentWindow');
        const descDocument = Object.getOwnPropertyDescriptor(HTMLIFrameElement.prototype, 'contentDocument');
        
        if (descWindow && descWindow.get) {
            Object.defineProperty(HTMLIFrameElement.prototype, 'contentWindow', {
                get() {
                    const win = descWindow.get.call(this);
                    if (win) patchWindow(win);
                    return win;
                },
                configurable: true
            });
        }
        
        if (descDocument && descDocument.get) {
            Object.defineProperty(HTMLIFrameElement.prototype, 'contentDocument', {
                get() {
                    const doc = descDocument.get.call(this);
                    if (doc && doc.defaultView) patchWindow(doc.defaultView);
                    return doc;
                },
                configurable: true
            });
        }
    } catch (e) {
        console.error("Capsule Hub: Failed to hook iframe prototype getters:", e);
    }
})();
