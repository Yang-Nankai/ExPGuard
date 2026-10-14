(() => {
    if (window.__capsulePdfInterceptorActive) return;
    window.__capsulePdfInterceptorActive = true;

    let captureActive = false;

    // Listen for start/stop capture events from the content script
    window.addEventListener('CAPSULE_START_PDF_CAPTURE', () => {
        captureActive = true;
    });

    window.addEventListener('CAPSULE_STOP_PDF_CAPTURE', () => {
        captureActive = false;
    });

    const isFileUrl = (url) => {
        if (!url) return false;
        return url.includes('files.oaiusercontent.com') ||
            url.includes('/backend-api/files/') ||
            url.includes('/backend-api/estuary/') ||
            url.includes('/download') ||
            url.startsWith('blob:') ||
            /\.(pdf|docx|xlsx|pptx|txt|csv|zip|png|jpg|jpeg|gif|webp|tex|md)$/i.test(url.split('?')[0]);
    };

    const reportUrl = (url, source) => {
        if (!captureActive || !url) return;

        // FILTER: Ignore known analytics/tracking/telemetry hosts
        const isTracking = url.includes('ab.chatgpt.com') ||
            url.includes('statsig') ||
            url.includes('telemetry') ||
            url.includes('datadog') ||
            url.includes('sentry') ||
            url.includes('browser-intake') ||
            url.includes('/statsc/');

        if (isTracking || !isFileUrl(url)) {
            return;
        }

        window.dispatchEvent(new CustomEvent('CAPSULE_PDF_URL', { detail: { url, source } }));
    };

    // 1. window.open
    const originalOpen = window.open;
    window.open = function (url) {
        let result = originalOpen.apply(this, arguments);
        if (captureActive) {
            reportUrl(url, 'WindowOpen');
        }
        return result; // Don't block
    };

    // 2. HTMLAnchorElement.prototype.click
    const originalAnchorClick = HTMLAnchorElement.prototype.click;
    HTMLAnchorElement.prototype.click = function () {
        if (captureActive) {
            reportUrl(this.href, 'AnchorClick');
            // We usually don't want to block this as users might be clicking manually, 
            // but for automated capture we'll block to prevent multiple tabs.
            return;
        }
        return originalAnchorClick.apply(this, arguments);
    };

    // 3. fetch
    const originalFetch = window.fetch;
    window.fetch = function (input, init) {
        let url = '';
        if (typeof input === 'string') url = input;
        else if (input instanceof Request) url = input.url;
        else if (input && typeof input.toString === 'function') url = input.toString();

        const promise = originalFetch.apply(this, arguments);

        if (captureActive && url) {
            const isFile = isFileUrl(url);
            if (isFile) {
                promise.then(async (response) => {
                    try {
                        const cloned = response.clone();
                        const blob = await cloned.blob();
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            window.dispatchEvent(new CustomEvent('CAPSULE_PDF_DATA', {
                                detail: { url, base64: reader.result, mime: blob.type }
                            }));
                        };
                        reader.readAsDataURL(blob);
                    } catch (e) {
                        reportUrl(url, 'FetchResponseFail');
                    }
                }).catch(() => {});
            }
        }
        return promise;
    };

    // 4. XMLHttpRequest
    const originalXhrOpen = XMLHttpRequest.prototype.open;
    const originalXhrSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.open = function (method, url) {
        this.__url = url;
        return originalXhrOpen.apply(this, arguments);
    };
    XMLHttpRequest.prototype.send = function () {
        if (captureActive && this.__url && isFileUrl(this.__url)) {
            const self = this;
            self.addEventListener('load', () => {
                try {
                    let blobPromise;
                    if (self.responseType === 'blob') {
                        blobPromise = Promise.resolve(self.response);
                    } else if (self.responseType === 'arraybuffer') {
                        blobPromise = Promise.resolve(new Blob([self.response]));
                    } else {
                        blobPromise = Promise.resolve(new Blob([self.response || self.responseText]));
                    }

                    blobPromise.then(blob => {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            window.dispatchEvent(new CustomEvent('CAPSULE_PDF_DATA', {
                                detail: {
                                    url: self.__url,
                                    base64: reader.result,
                                    mime: blob.type || self.getResponseHeader('content-type')
                                }
                            }));
                        };
                        reader.readAsDataURL(blob);
                    }).catch(() => {
                        reportUrl(self.__url, 'XHRResponseFail');
                    });
                } catch (e) {
                    reportUrl(self.__url, 'XHRException');
                }
            });
        }
        return originalXhrSend.apply(this, arguments);
    };

    // 5. URL.createObjectURL
    const originalCreateObjectURL = URL.createObjectURL;
    URL.createObjectURL = function (obj) {
        const url = originalCreateObjectURL.apply(this, arguments);
        if (captureActive) {
            reportUrl(url, 'BlobURL');
        }
        return url;
    };

    window.dispatchEvent(new CustomEvent('CAPSULE_PDF_INTERCEPTOR_READY'));
})();
