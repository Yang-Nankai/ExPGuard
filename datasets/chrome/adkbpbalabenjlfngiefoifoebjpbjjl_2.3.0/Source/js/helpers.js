/**
 * Sends message to the main popup or to the languages popup
 * @param {*} name
 * @param {*} data {}
 * @param {*} target main | languages
 */
self.etfiCommand = (name, data, target = 'main') => {
    const selector = target == 'languages' ? '.etfi-langs-container' : '.etfi-app-container';
    const appContainer = document.querySelector(selector);
    const shadow = appContainer.shadowRoot;
    const frame = shadow.querySelector('iframe');
    // It will be something like "chrome-extension://<extension-id>/"
    const origin = chrome.runtime.getURL('/');
    setTimeout(() => {
        frame.contentWindow.postMessage({
            command: name,
            data: data
        }, origin);
    }, 50);
}

// self is Window object
if (typeof self.etfiExecute === 'undefined') {
    const workerInstances = {};

    addEventListener('message', e => {
        if (e.data) {
            const { command, id, report, result, message } = e.data;

            if (workerInstances[id]) {
                switch (command) {
                    case 'report':
                        workerInstances[id].report(report);
                        break;
                    case 'result':
                        workerInstances[id].resolve(result);
                        break;
                    case 'error':
                        workerInstances[id].reject(Error(message));
                        break;
                }

                if (command === 'result' || command === 'error') {
                    workerInstances[id].frame.remove();
                    delete workerInstances[id];
                }
            }

            // not working, not used
            if (message == 'etfi_langs_list') {
                self.etfiLangs = e.data.langs || [];
            }
        }
    });

    self.etfiExecute = ({
        signal,
        lang,
        src,
        accuracy = '4.0.0'
    }, report) => new Promise((resolve, reject) => {
        // Run the OCR engine in an iframe
        const frame = document.createElement('iframe');
        const id = 'worker-' + Math.random();
        workerInstances[id] = { report, resolve, reject, frame };
        frame.src = chrome.runtime.getURL('/engine/index.html?id=' + id);
        frame.style.display = 'none';
        frame.onload = () => frame.contentWindow.postMessage({
            lang,
            src,
            accuracy
        }, '*');
        document.documentElement.append(frame);

        signal.addEventListener('abort', () => frame.remove());
    });
}

self.etfiCrop = (href, { width, height, left, top }, mode = 'normal') => new Promise(resolve => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
        canvas.width = width || img.width;
        canvas.height = height || img.height;
        if (width && height) {
            ctx.drawImage(img, left, top, width, height, 0, 0, width, height);
        }
        else {
            ctx.drawImage(img, 0, 0);
        }
        if (mode === 'invert' || mode === 'gray') {
            ctx.globalCompositeOperation = mode === 'gray' ? 'saturation' : 'difference';
            ctx.fillStyle = '#fff';
            ctx.globalAlpha = 1;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        resolve(canvas.toDataURL());
    };
    img.src = href;
});

/**
 *
 * @param {*} lang
 * @param {*} src
 * @param {*} target main | languages
 * @returns
 */
self.etfiOcr = (lang, src, target = 'main') => {
    const report = report => {
        etfiCommand('message', {
            message: report.status
        }, target);

        if (report.status === 'recognizing text') {
            etfiCommand('progress', {
                progress: report.progress
            }, target);
        }
        else if (
            report.status === 'loading language traineddata' ||
            report.status === 'loaded language traineddata'
        ) {
            etfiCommand('progress', {
                progress: report.progress,
                lang: 'lang'
            }, target);
        }
    };
    const controller = new AbortController();

    // TODO: receive message instead of event
    //em.addEventListener('closed', () => controller.abort());

    return self.etfiExecute({
        lang,
        src,
        accuracy: '4.0.0', // em.dataset.accuracy,
        signal: controller.signal
    }, report);
};

/**
 * NOTE: if there is previousResult object, run in inverted colors
 *
 * @param {*} previousResult
 * @param {*} mode normal | invert | gray
 * @param {*} href
 * @param {*} box {width, height, left, top}
 * @param {*} target Target popup (app section): main | languages
 * @returns
 */
self.etfiExtractText = async (previousResult, mode = 'normal', lang, href, box, target = 'main') => {
    const src = await self.etfiCrop(href, box, mode);

    etfiCommand('progress', {
        progress: 0
    }, target);
    etfiCommand('clear', {}, target);

    //const lang = previousResult?.lang || em.dataset.language || 'eng';
    // const lang = lang || previousResult?.lang || 'eng';
    if (previousResult?.lang) {
        lang = previousResult.lang;
    }

    let recognitionResult;
    try {
        if (lang !== 'detect') {
            recognitionResult = await etfiOcr(lang, src, target);

        } else {
            await Promise.all([
                etfiOcr('eng', src, target).then(ocrResult => {
                    return new Promise(resolve => chrome.i18n.detectLanguage(ocrResult.text, langDetectResult => {
                        resolve({
                            lang: 'eng',
                            ocrResult,
                            langDetectResult
                        });
                    }));
                }),
                etfiOcr('ara', src, target).then(ocrResult => {
                    return new Promise(resolve => chrome.i18n.detectLanguage(ocrResult.text, langDetectResult => {
                        resolve({
                            lang: 'ara',
                            ocrResult,
                            langDetectResult
                        });
                    }));
                }),
                etfiOcr('jpn', src, target).then(ocrResult => {
                    return new Promise(resolve => chrome.i18n.detectLanguage(ocrResult.text, langDetectResult => {
                        resolve({
                            lang: 'jpn',
                            ocrResult,
                            langDetectResult
                        });
                    }));
                })
            ]).then(async a => {
                const oneOfThree = a.sort((a, b) => {
                    return b.ocrResult.confidence - a.ocrResult.confidence;
                })[0];
                if (oneOfThree.langDetectResult.languages.length) {
                    // example: 'ha'
                    const ln = oneOfThree.langDetectResult.languages[0].language;
                    const isReliable = oneOfThree.langDetectResult.languages[0].isReliable;

                    // const e = r.lang.startsWith(ln) ? r.lang : em.dataset.languages.split(', ').filter(s => s.startsWith(ln)).shift();

                    const recognitionLang = oneOfThree.lang.startsWith(ln) ? oneOfThree.lang : self.etfiLangs.filter(s => s.id !== 'detect' && s.id.startsWith(ln)).shift().id;

                    if (recognitionLang) {
                        if (a.some(o => o.lang === recognitionLang && o.isReliable)) {
                            recognitionResult = a.filter(o => o.lang === recognitionLang && o.isReliable).shift().ocrResult;
                        } else {
                            recognitionResult = await etfiOcr(recognitionLang, src, target);
                        }
                        recognitionResult.lang = recognitionLang;
                    }
                    // indicate the detected language
                    etfiCommand('auto_detect', {
                        langDetected: recognitionLang || oneOfThree.lang
                    }, target);
                    etfiCommand('message', {
                        message: `Detected language is "${recognitionLang || oneOfThree.lang}". Please wait...`
                    }, target);
                }
                recognitionResult = recognitionResult || oneOfThree.ocrResult;
            });
        }
        etfiCommand('progress', {
            progress: 1
        }, target);

        // in case "confidence" is not acceptable, rerun with inverted colors
        if (recognitionResult.confidence < 50 && !previousResult) {
            etfiCommand('message', {
                message: `Low confidence (${recognitionResult.confidence}%). Trying with inverted colors. Please wait...`
            }, target);
            await new Promise(resolve => setTimeout(resolve, 2000));
            etfiExtractText(recognitionResult, 'invert', lang, href, box, target);
            return;
        }
        // rerun with black and white colors
        if (mode === 'invert' && recognitionResult.confidence < 20 && previousResult.confidence < 20) {
            etfiCommand('message', {
                message: `Low confidence (${recognitionResult.confidence}%) again! Trying with black and white colors. Please wait...`
            }, target);

            etfiExtractText(recognitionResult, 'gray', lang, href, box, target);
            return;
        }
        if (previousResult) {
            if (previousResult.confidence > recognitionResult.confidence) {
                recognitionResult = previousResult;
            }
        }

        if (recognitionResult.text.trim() === '') {
            etfiCommand('result_error', {
                error: 'Cannot extract text. Please adjust the region of the image you\'re capturing and try again.',
            }, target);
        }
        else {
            etfiCommand('result_success', {
                result: recognitionResult.hocr,
                sourceUrl: location.href,
                sourceImageData: href,
                cropBox: box
            }, target);
            etfiCommand('enable', {}, target);
        }
    }
    catch (e) {
        console.warn(e);
        etfiCommand('result_error', {
            error: 'Cannot extract text. Please adjust the region of the image you\'re capturing and try again.',
        }, target);
    }
};
