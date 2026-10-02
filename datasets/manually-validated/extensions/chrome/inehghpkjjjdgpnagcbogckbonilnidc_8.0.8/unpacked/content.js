//
// This base class contains properties and functionality
// that is common to all the content scripts.
//
var Extension;
(function (Extension) {
    class DgContentBase {
        constructor() {
            // IDs:
            this.FRAME_ID = '__degreed_bookmarklet__';
            this.WRAPPER_ID = '__degreed_bookmarklet_wrapper__';
            this.LOADER_ID = '__degreed_bookmarklet_loader__';
            // Style:
            this.LOADER_Z_INDEX = '2147483647';
            this.SLIDER_Z_INDEX = '2147483646';
            this.WIDTH = '375px';
            this.CLOSE_RIGHT_STYLE = '-425px';
            this.OPEN_RIGHT_STYLE = '0px';
            // Page data:
            this.contentData = {
                summary: null,
                externalId: null,
                image: null,
                inputType: null,
                contentLength: null,
                lengthSvc: null,
                provider: null,
                source: null,
                tags: null,
                title: null,
                userSelection: null,
                url: null,
            };
        }
        // Methods
        getYouTubeExternalId(url) {
            const slug = url.match(/[?&]v=([^&#]+)/)[1];
            return slug ? slug : undefined;
        }
        getVimeoIdByUrl(url) {
            // These should mirror the patterns in the PatternMatchVimeoIdFromUrl method in VimeoHelper.cs
            // Account for vimeo.com/vimeocdn.com url beginning and query string/fragment end
            let vimeoId = '';
            //TODO: for now skipping the eslint, remove unnecessary escape chars from pattern
            /* eslint-disable no-useless-escape */
            const idOnlyRegex = /^.+\.com\/([0-9]+)\/?(?:[\?#].*)?$/; // http://vimeo.com/1234 - id is 1234
            const idAtStartRegex = /^.+\.com\/([0-9]+)\/\w+\/?(?:[\?#].*)?$/; // https://vimeo.com/1234/abcd789 - id is 1234
            const channelRegex = /^.+\.com\/channels\/\w+\/([0-9]+)\/?(?:[\?#].*)?$/; // http://vimeo.com/channels/abcd789/1234 - id is 1234
            const albumRegex = /^.+\.com\/album\/\w+\/video\/([0-9]+)\/?(?:[\?#].*)?$/; // http://vimeo.com/album/abcd789/video/1234 - id is 1234
            /* eslint-enable no-useless-escape */
            const match = url.match(idOnlyRegex) ||
                url.match(idAtStartRegex) ||
                url.match(channelRegex) ||
                url.match(albumRegex);
            if (match) {
                vimeoId = match[1];
            }
            return vimeoId;
        }
        getVimeoExternalId(url) {
            const slug = this.getVimeoIdByUrl(url);
            return slug && slug.length ? slug : undefined;
        }
        getExternalId(url) {
            const providerName = this.getProvider(url);
            let externalId;
            if (!url) {
                url = document.location.href;
            }
            switch (providerName) {
                case 'YouTube':
                    externalId = this.getYouTubeExternalId(url);
                    break;
                case 'Vimeo':
                    externalId = this.getVimeoExternalId(url);
                    break;
                default:
                    externalId = undefined;
                    break;
            }
            return externalId;
        }
        getImageUrl() {
            let imageUrl;
            const metaSelector = 'meta[itemprop="thumbnailUrl"],meta[itemprop="image"],meta[property="og:image"],meta[name="twitter:image"]';
            const metaImages = document.querySelectorAll(metaSelector);
            for (let i = 0; i < metaImages.length; i++) {
                if (metaImages[i].content.length && metaImages[i].content.length > 0) {
                    imageUrl = metaImages[i].content;
                    break;
                }
            }
            return imageUrl;
        }
        getInputType(url) {
            let inputType = 'Article';
            if (!url) {
                url = document.location.href;
            }
            if (this.isVideoURL(url)) {
                inputType = 'Video';
            }
            return inputType;
        }
        isVideoURL(url) {
            const videoExtensions = ['.mp4', '.3gp', '.ogg', '.webm'];
            const videoSiteSubStrings = [
                'youtube.',
                'vimeo.',
                'www.ted.com',
                'tedxtalks.ted.com/video',
                'channel9.msdn.com',
                ...videoExtensions,
            ];
            return videoSiteSubStrings.some((subString) => url.indexOf(subString) !== -1);
        }
        getSource() {
            return document.location.hostname;
        }
        getProvider(url) {
            let provider = '';
            if (!url) {
                url = document.location.href.toLowerCase();
            }
            // not just .com so we don't exclude other country TLD's
            if (url.indexOf('youtube.') !== -1) {
                provider = 'YouTube';
            }
            else if (url.indexOf('vimeo.') !== -1) {
                provider = 'Vimeo';
            }
            return provider;
        }
        getTitle(url) {
            let title = '';
            const titleTag = document.getElementsByTagName('title')[0];
            if (titleTag) {
                // Use the title tag if it's available
                title = titleTag.textContent;
            }
            else if (document.title && document.title !== '') {
                // Try to use .title (it can be set dynamically, separate from title tag)
                title = document.title;
            }
            else {
                // Use the hostname as the final fallback
                title = document.location.hostname;
            }
            // Don't include the dynamic YT notification count in the title
            if (url.indexOf('youtube.') !== -1 && title) {
                const pattern = /\((\d+\)\s?)/; // e.g. "(42) "
                const match = pattern.exec(title);
                if (match && match.index === 0) {
                    // strip if a match at the beginning
                    title = title === null || title === void 0 ? void 0 : title.replace(pattern, '');
                }
            }
            return title;
        }
        getLength() {
            let length = null;
            const url = document.location.href;
            if (url.indexOf('youtube.') !== -1) {
                length = this.getYouTubeDuration(url);
            }
            return length;
        }
        getLengthSvc() {
            const providerName = this.getProvider();
            let lengthSvc = null;
            if (providerName === 'Vimeo') {
                const slug = document.location.pathname.substr(1);
                if (slug && slug.length) {
                    lengthSvc = '//vimeo.com/api/v2/video/' + slug + '.json';
                }
            }
            return lengthSvc;
        }
        getSummary() {
            let summary = null;
            // YouTube's SPA doesn't update the <head> meta tags on some navigation, so we need to first try
            // using the meta[itemprop] which DOES get updated
            const metaSelector = 'meta[itemprop="description"],meta[name="description"],meta[property="description"],meta[property="og:description"]';
            const metaDescs = document.querySelectorAll(metaSelector);
            for (let i = 0; i < metaDescs.length; i++) {
                if (metaDescs[i].content) {
                    if (metaDescs[i].content.length && metaDescs[i].content.length > 0) {
                        summary = metaDescs[i].content;
                        break;
                    }
                }
            }
            return summary;
        }
        getYouTubeDuration(url) {
            let totalSeconds = null;
            const duration = document.querySelector('meta[itemprop="duration"]');
            if (duration && duration.content) {
                const time = duration.content.split('M');
                const minsAsSeconds = time[0].replace(/\D+/g, '') * 60;
                totalSeconds = time[1].replace(/\D+/g, '') * 1 + minsAsSeconds;
            }
            return totalSeconds;
        }
        getTags() {
            const providerName = this.getProvider(undefined);
            const suggestedYtTags = () => {
                try {
                    const ytTags = ytplayer.config.args.keywords.split(',');
                    const tags = [];
                    for (let i = 0; i < ytTags.length; i++) {
                        tags.push({ Name: ytTags[i] });
                    }
                    return tags;
                }
                catch (e) {
                    return [];
                }
            };
            const suggestedVimeoTags = () => {
                try {
                    const tags = [];
                    const tagLi = document.querySelectorAll('.tags li');
                    for (let i = 0; i < tagLi.length; i++) {
                        tags.push({ Name: tagLi[i].innerText });
                    }
                    return tags;
                }
                catch (e) {
                    return [];
                }
            };
            switch (providerName) {
                case 'YouTube':
                    return suggestedYtTags();
                case 'Vimeo':
                    return suggestedVimeoTags();
                default:
                    return null;
            }
        }
        refineContentData() {
            // Extra fetching for SPA YouTube & Video non-updating tags
            switch (this.contentData.provider) {
                case 'YouTube':
                    try {
                        this.contentData.image =
                            'https://i.ytimg.com/vi/' +
                                this.contentData.externalId +
                                '/mqdefault.jpg';
                        const desc = document.getElementById('watch-description-text');
                        if (desc) {
                            this.contentData.summary = desc.innerText;
                        }
                    }
                    catch (e) {
                        // use existing
                    }
                    break;
                case 'Vimeo':
                    try {
                        const desc = document.querySelector('#info .description_wrapper');
                        if (desc) {
                            this.contentData.summary = desc.innerText;
                        }
                    }
                    catch (e) {
                        // use existing
                    }
                    break;
            }
        }
        extractUrlIfPdf(currentHref) {
            const embeddedPdfPage = '/degreed-button/pdf?';
            const isEmbeddedPdfPage = currentHref.indexOf(embeddedPdfPage) > -1;
            const referer = 'referer=';
            if (isEmbeddedPdfPage) {
                currentHref = currentHref.split(referer)[1];
            }
            return currentHref;
        }
        pullContentData(currentHref, userSelection) {
            currentHref = this.extractUrlIfPdf(currentHref);
            const contentData = {
                url: currentHref,
                externalId: this.getExternalId(currentHref),
                provider: this.getProvider(currentHref),
                inputType: this.getInputType(currentHref),
                summary: this.getSummary(),
                image: this.getImageUrl(),
                contentLength: this.getLength(),
                lengthSvc: this.getLengthSvc(),
                source: this.getSource(),
                tags: this.getTags(),
                title: this.getTitle(currentHref),
                userSelection: userSelection,
            };
            this.contentData = contentData;
            this.refineContentData();
            return this.contentData;
        }
        pollForUrlChanges(currentUrl, postMessaging) {
            // This HAS to stay lite! Limit to non-heavy checks/comparators.
            // Invoke functions only as callbacks for when conditions are met.
            // Being strict here will allow this to remain lite and benign.
            //
            // This polling is required because major sites like
            // Medium.com, YouTube.com, etc. change urls in a way
            // that does not allow us to consistently use built-in
            // methods like popstate, hashchange, locationchange, etc.
            setInterval(() => {
                if (currentUrl !== location.href) {
                    // Reset the current URL for next checks
                    currentUrl = location.href;
                    // ...and respond to the change detection:
                    this.onUrlChange(postMessaging);
                }
            }, 500);
        }
        onUrlChange(postMessaging) {
            // We need to reset the state to reflect the new URL
            //
            // We can't use .load or .ready since both are already set.
            // We _can_ fire immediately and have general success,
            // however, we're giving a buffer, since 1s doesn't degrade the UX
            // and should improve reliability.
            //
            // Since the metadata is generally the first thing that changes
            // on these sites, the assumption here is 1s is plenty of time.
            //
            setTimeout(() => {
                const isUpdate = true;
                this.pullContentFromBase();
                postMessaging(isUpdate);
            }, 1000);
        }
        pullContentFromBase() {
            var _a;
            const currentHref = document.location.href;
            this.pullContentData(currentHref, (_a = this.contentData.userSelection) !== null && _a !== void 0 ? _a : '');
        }
        // Public setters
        setContentData(contentData) {
            this.contentData = contentData;
        }
        setUserSelection(userSelection) {
            this.contentData.userSelection = userSelection.substr(0, 50);
        }
        // Public getters
        getContentData() {
            return this.contentData;
        }
        getUserSelection() {
            return this.contentData.userSelection;
        }
        // public getEnvConfigs() {
        //   return this.ENV_CONFIGS;
        // }
        getLoaderId() {
            return this.LOADER_ID;
        }
        getFrameId() {
            return this.FRAME_ID;
        }
        getWrapperId() {
            return this.WRAPPER_ID;
        }
        getCloseRightStyle() {
            return this.CLOSE_RIGHT_STYLE;
        }
        getOpenRightStyle() {
            return this.OPEN_RIGHT_STYLE;
        }
        getSliderZIndex() {
            return this.SLIDER_Z_INDEX;
        }
        // Dynamic styling
        injectCss(code, id) {
            const style = document.createElement('style');
            style.type = 'text/css';
            style.id = id;
            if (style['styleSheet']) {
                // IE
                style['styleSheet'].cssText = code;
            }
            else {
                // Other browsers
                style.innerHTML = code;
            }
            if (document.getElementsByTagName('head')) {
                document.getElementsByTagName('head')[0].appendChild(style);
            }
            else {
                document.body.appendChild(style);
            }
        }
        getIframeInitialStyle() {
            return `background: #fff !important; display: block !important; position: fixed !important; top: 0 !important; left: auto !important; right: ${this.CLOSE_RIGHT_STYLE} !important; z-index: -1; border: none; box-shadow: 0 0 24px rgba(0, 0, 0, 0.5); height: 100vh !important; width: ${this.WIDTH} !important; transition: right 0.33s ease-in-out; webkit-transform: translate(0%, 0%) !important; transform: translate(0%, 0%) !important; top:0%; right:0%; left:0%;`;
        }
        getLoaderAndWrapperHtml() {
            return `<dialog aria-modal="true" id="${this.WRAPPER_ID}" style="position: fixed !important; top: 0 !important; right: ${this.CLOSE_RIGHT_STYLE}; height: 100% !important; width: ${this.WIDTH} !important; background: #fff !important; box-shadow: 0 0 24px rgba(0, 0, 0, 0.5) !important; z-index: ${this.LOADER_Z_INDEX} !important; transition: right 0.33s ease-in-out !important"><div id="${this.LOADER_ID}" style="z-index: ${this.LOADER_Z_INDEX} !important; top: 0 !important; right: 0 !important; height: 100vh !important; position: fixed !important; width: ${this.WIDTH} !important;"><div class="dg-loader">Loading...</div></div></dialog>`;
        }
        getLoaderHtml() {
            return `<div id="${this.LOADER_ID}" style="z-index: ${this.LOADER_Z_INDEX} !important; top: 0 !important; right: 0 !important; height: 100vh !important; position: fixed !important; width: ${this.WIDTH} !important;"><div class="dg-loader">Loading...</div></div>`;
        }
        getLoaderWithWrapperHtml() {
            return `<div id="${this.WRAPPER_ID}" style="position: fixed !important; top: 0 !important; right: ${this.CLOSE_RIGHT_STYLE}; height: 100% !important; width: ${this.WIDTH} !important; background: #fff !important; box-shadow: 0 0 24px rgba(0, 0, 0, 0.5) !important; z-index: ${this.SLIDER_Z_INDEX} !important; transition: right 0.33s ease-in-out !important">${this.getLoaderHtml()}</div>`;
        }
        getLoaderCss() {
            return '.dg-loader{margin:100px;font-size:15px;width:15px;height:15px;position:absolute !important;right:76px !important;border-radius:50%;position:relative;text-indent:-9999em;top:42px !important; animation-delay: 0.2125s !important; -webkit-animation:dg-loader 1.1s infinite ease;animation:dg-loader 1.1s infinite ease;-webkit-transform:translateZ(0);-ms-transform:translateZ(0);transform:translateZ(0)}@-webkit-keyframes dg-loader{0%,100%{box-shadow:0 -2.6em 0 0 #bcbcbc,1.8em -1.8em 0 0 rgba(188,188,188,.2),2.5em 0 0 0 rgba(188,188,188,.2),1.75em 1.75em 0 0 rgba(188,188,188,.2),0 2.5em 0 0 rgba(188,188,188,.2),-1.8em 1.8em 0 0 rgba(188,188,188,.2),-2.6em 0 0 0 rgba(188,188,188,.5),-1.8em -1.8em 0 0 rgba(188,188,188,.7)}12.5%{box-shadow:0 -2.6em 0 0 rgba(188,188,188,.7),1.8em -1.8em 0 0 #bcbcbc,2.5em 0 0 0 rgba(188,188,188,.2),1.75em 1.75em 0 0 rgba(188,188,188,.2),0 2.5em 0 0 rgba(188,188,188,.2),-1.8em 1.8em 0 0 rgba(188,188,188,.2),-2.6em 0 0 0 rgba(188,188,188,.2),-1.8em -1.8em 0 0 rgba(188,188,188,.5)}25%{box-shadow:0 -2.6em 0 0 rgba(188,188,188,.5),1.8em -1.8em 0 0 rgba(188,188,188,.7),2.5em 0 0 0 #bcbcbc,1.75em 1.75em 0 0 rgba(188,188,188,.2),0 2.5em 0 0 rgba(188,188,188,.2),-1.8em 1.8em 0 0 rgba(188,188,188,.2),-2.6em 0 0 0 rgba(188,188,188,.2),-1.8em -1.8em 0 0 rgba(188,188,188,.2)}37.5%{box-shadow:0 -2.6em 0 0 rgba(188,188,188,.2),1.8em -1.8em 0 0 rgba(188,188,188,.5),2.5em 0 0 0 rgba(188,188,188,.7),1.75em 1.75em 0 0 #bcbcbc,0 2.5em 0 0 rgba(188,188,188,.2),-1.8em 1.8em 0 0 rgba(188,188,188,.2),-2.6em 0 0 0 rgba(188,188,188,.2),-1.8em -1.8em 0 0 rgba(188,188,188,.2)}50%{box-shadow:0 -2.6em 0 0 rgba(188,188,188,.2),1.8em -1.8em 0 0 rgba(188,188,188,.2),2.5em 0 0 0 rgba(188,188,188,.5),1.75em 1.75em 0 0 rgba(188,188,188,.7),0 2.5em 0 0 #bcbcbc,-1.8em 1.8em 0 0 rgba(188,188,188,.2),-2.6em 0 0 0 rgba(188,188,188,.2),-1.8em -1.8em 0 0 rgba(188,188,188,.2)}62.5%{box-shadow:0 -2.6em 0 0 rgba(188,188,188,.2),1.8em -1.8em 0 0 rgba(188,188,188,.2),2.5em 0 0 0 rgba(188,188,188,.2),1.75em 1.75em 0 0 rgba(188,188,188,.5),0 2.5em 0 0 rgba(188,188,188,.7),-1.8em 1.8em 0 0 #bcbcbc,-2.6em 0 0 0 rgba(188,188,188,.2),-1.8em -1.8em 0 0 rgba(188,188,188,.2)}75%{box-shadow:0 -2.6em 0 0 rgba(188,188,188,.2),1.8em -1.8em 0 0 rgba(188,188,188,.2),2.5em 0 0 0 rgba(188,188,188,.2),1.75em 1.75em 0 0 rgba(188,188,188,.2),0 2.5em 0 0 rgba(188,188,188,.5),-1.8em 1.8em 0 0 rgba(188,188,188,.7),-2.6em 0 0 0 #bcbcbc,-1.8em -1.8em 0 0 rgba(188,188,188,.2)}87.5%{box-shadow:0 -2.6em 0 0 rgba(188,188,188,.2),1.8em -1.8em 0 0 rgba(188,188,188,.2),2.5em 0 0 0 rgba(188,188,188,.2),1.75em 1.75em 0 0 rgba(188,188,188,.2),0 2.5em 0 0 rgba(188,188,188,.2),-1.8em 1.8em 0 0 rgba(188,188,188,.5),-2.6em 0 0 0 rgba(188,188,188,.7),-1.8em -1.8em 0 0 #bcbcbc}}@keyframes dg-loader{0%,100%{box-shadow:0 -2.6em 0 0 #bcbcbc,1.8em -1.8em 0 0 rgba(188,188,188,.2),2.5em 0 0 0 rgba(188,188,188,.2),1.75em 1.75em 0 0 rgba(188,188,188,.2),0 2.5em 0 0 rgba(188,188,188,.2),-1.8em 1.8em 0 0 rgba(188,188,188,.2),-2.6em 0 0 0 rgba(188,188,188,.5),-1.8em -1.8em 0 0 rgba(188,188,188,.7)}12.5%{box-shadow:0 -2.6em 0 0 rgba(188,188,188,.7),1.8em -1.8em 0 0 #bcbcbc,2.5em 0 0 0 rgba(188,188,188,.2),1.75em 1.75em 0 0 rgba(188,188,188,.2),0 2.5em 0 0 rgba(188,188,188,.2),-1.8em 1.8em 0 0 rgba(188,188,188,.2),-2.6em 0 0 0 rgba(188,188,188,.2),-1.8em -1.8em 0 0 rgba(188,188,188,.5)}25%{box-shadow:0 -2.6em 0 0 rgba(188,188,188,.5),1.8em -1.8em 0 0 rgba(188,188,188,.7),2.5em 0 0 0 #bcbcbc,1.75em 1.75em 0 0 rgba(188,188,188,.2),0 2.5em 0 0 rgba(188,188,188,.2),-1.8em 1.8em 0 0 rgba(188,188,188,.2),-2.6em 0 0 0 rgba(188,188,188,.2),-1.8em -1.8em 0 0 rgba(188,188,188,.2)}37.5%{box-shadow:0 -2.6em 0 0 rgba(188,188,188,.2),1.8em -1.8em 0 0 rgba(188,188,188,.5),2.5em 0 0 0 rgba(188,188,188,.7),1.75em 1.75em 0 0 #bcbcbc,0 2.5em 0 0 rgba(188,188,188,.2),-1.8em 1.8em 0 0 rgba(188,188,188,.2),-2.6em 0 0 0 rgba(188,188,188,.2),-1.8em -1.8em 0 0 rgba(188,188,188,.2)}50%{box-shadow:0 -2.6em 0 0 rgba(188,188,188,.2),1.8em -1.8em 0 0 rgba(188,188,188,.2),2.5em 0 0 0 rgba(188,188,188,.5),1.75em 1.75em 0 0 rgba(188,188,188,.7),0 2.5em 0 0 #bcbcbc,-1.8em 1.8em 0 0 rgba(188,188,188,.2),-2.6em 0 0 0 rgba(188,188,188,.2),-1.8em -1.8em 0 0 rgba(188,188,188,.2)}62.5%{box-shadow:0 -2.6em 0 0 rgba(188,188,188,.2),1.8em -1.8em 0 0 rgba(188,188,188,.2),2.5em 0 0 0 rgba(188,188,188,.2),1.75em 1.75em 0 0 rgba(188,188,188,.5),0 2.5em 0 0 rgba(188,188,188,.7),-1.8em 1.8em 0 0 #bcbcbc,-2.6em 0 0 0 rgba(188,188,188,.2),-1.8em -1.8em 0 0 rgba(188,188,188,.2)}75%{box-shadow:0 -2.6em 0 0 rgba(188,188,188,.2),1.8em -1.8em 0 0 rgba(188,188,188,.2),2.5em 0 0 0 rgba(188,188,188,.2),1.75em 1.75em 0 0 rgba(188,188,188,.2),0 2.5em 0 0 rgba(188,188,188,.5),-1.8em 1.8em 0 0 rgba(188,188,188,.7),-2.6em 0 0 0 #bcbcbc,-1.8em -1.8em 0 0 rgba(188,188,188,.2)}87.5%{box-shadow:0 -2.6em 0 0 rgba(188,188,188,.2),1.8em -1.8em 0 0 rgba(188,188,188,.2),2.5em 0 0 0 rgba(188,188,188,.2),1.75em 1.75em 0 0 rgba(188,188,188,.2),0 2.5em 0 0 rgba(188,188,188,.2),-1.8em 1.8em 0 0 rgba(188,188,188,.5),-2.6em 0 0 0 rgba(188,188,188,.7),-1.8em -1.8em 0 0 #bcbcbc}}';
        }
    }
    Extension.DgContentBase = DgContentBase;
})(Extension || (Extension = {}));
var Extension;
(function (Extension) {
    class DgChromeContent extends Extension.DgContentBase {
        constructor() {
            super();
            // CONFIGS
            // Packaging:
            this.WEB_ACCESSIBLE_FRAME = 'trusted/trusted-frame-proxy.html';
            this.EXTENSION_ORIGIN = 'chrome-extension://' + chrome.runtime.id;
            // private readonly BASE_HOST = '@@baseUrl';
            // Events:
            this.OPEN_SLIDER_EVENT = 'OPEN_SLIDER';
            this.CLOSE_SLIDER_EVENT = 'CLOSE_SLIDER';
            this.CLOSE_SLIDER_FROM_X_EVENT = 'CLOSE_SLIDER_FROM_X';
            this.CHANGE_ICON_EVENT = 'CHANGE_ICON';
            this.CHECK_OPEN_EVENT = 'CHECK_OPEN';
            this.SEND_USER_SELECTION_EVENT = 'SEND_USER_SELECTION';
            this.EVENT_HANDLE_PDF = 'HANDLE_PDF';
            this.APP_READY_EVENT = 'APP_READY';
            this.SHOW_LOADER_EVENT = 'SHOW_LOADER';
            this.HIDE_LOADER_EVENT = 'HIDE_LOADER';
            // General Properties
            this.iframe = this.constructIframe();
            this.init();
        }
        // Methods
        init() {
            this.initRuntimeListeners();
            super.pollForUrlChanges(location.href, (isUpdate) => {
                this.postMessaging(isUpdate);
            });
        }
        initRuntimeListeners() {
            chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
                let responseValue = null;
                if (message.action) {
                    switch (message.action) {
                        case this.OPEN_SLIDER_EVENT:
                            this.openSlider();
                            break;
                        case this.CLOSE_SLIDER_EVENT:
                            this.closeSlider();
                            break;
                        case this.SHOW_LOADER_EVENT:
                            this.injectLoader();
                            break;
                        case this.HIDE_LOADER_EVENT:
                            this.removeLoader();
                            break;
                        case this.APP_READY_EVENT:
                            // Once the app is ready, we can remove the loader
                            // and send the message with the pageData
                            this.removeLoader();
                            this.postMessaging();
                            break;
                        case this.CLOSE_SLIDER_FROM_X_EVENT:
                            this.closeSlider();
                            chrome.runtime.sendMessage({
                                message: this.CHANGE_ICON_EVENT,
                            });
                            break;
                        case this.CHECK_OPEN_EVENT:
                            responseValue = { isOpen: this.checkIsSliderOpen() };
                            break;
                        case this.SEND_USER_SELECTION_EVENT:
                            this.setUserSelection(() => {
                                this.sendUserSelection();
                            });
                            break;
                        case this.EVENT_HANDLE_PDF:
                            this.handlePdf();
                            break;
                        default:
                            console.warn('Unrecognized event: ', message.action);
                            responseValue = false;
                            break;
                    }
                }
                // Even if the response can be null, Chrome messaging guidelines
                // ask for sendResponse to be invoked once-per-message, in order
                // to fulfill the 1:1 exchange, which helps avoid runtime errors.
                sendResponse(responseValue);
            });
        }
        getPageData() {
            var _a;
            super.pullContentData(location.href, (_a = super.getContentData().userSelection) !== null && _a !== void 0 ? _a : '');
        }
        postMessaging(isUpdate = false) {
            if (this.iframe && this.iframe.contentWindow) {
                this.iframe.contentWindow.postMessage(JSON.stringify({
                    degreedData: super.getContentData(),
                    isUpdate: isUpdate,
                }), '*');
            }
        }
        constructIframe() {
            // location.ancestorOrigins exists in Chromium browsers
            const originExists = location.ancestorOrigins.contains(this.EXTENSION_ORIGIN);
            let iframe;
            if (originExists) {
                // This avoids recursive frame insertion
                iframe = document.getElementById(super.getFrameId());
            }
            else {
                // To work, this must be declared as a web_accessible_resources in manifest.json
                iframe = document.createElement('iframe');
                iframe.src = chrome.runtime.getURL(this.WEB_ACCESSIBLE_FRAME);
                iframe.id = super.getFrameId();
                iframe.style.cssText = super.getIframeInitialStyle();
            }
            return iframe;
        }
        insertTrustedFrame(callback) {
            document.body.appendChild(this.iframe);
            if (typeof callback === 'function') {
                callback(this.iframe);
            }
        }
        // LOADER
        injectLoader() {
            // Inject CSS
            const cssContent = super.getLoaderCss();
            super.injectCss(cssContent, 'dg-loader-css');
            // Inject HTML
            const loaderWrapper = document.createElement('div');
            loaderWrapper.id = super.getWrapperId();
            loaderWrapper.innerHTML = super.getLoaderHtml();
            document.body.appendChild(loaderWrapper);
        }
        removeLoader() {
            try {
                const loader = document.getElementById(super.getWrapperId());
                loader && loader.parentNode && loader.parentNode.removeChild(loader);
            }
            catch (e) {
                // We're a visiting script on the host page.
                // If the loader doesn't exist anymore,
                // for whatever reason, we use a catch to ignore.
            }
        }
        // SLIDER
        openSlider() {
            // Check DOM for inserted instance
            if (!document.getElementById(super.getFrameId())) {
                // first time through
                // this.injectLoader();
                this.insertTrustedFrame((insertedFrame) => {
                    this.setOpenSliderStyles(insertedFrame);
                    this.setUserSelection();
                    this.getPageData();
                });
            }
            else {
                this.setOpenSliderStyles(this.iframe);
                this.setUserSelection(() => {
                    this.sendUserSelection();
                });
            }
        }
        closeSlider() {
            if (this.iframe) {
                this.setCloseSliderStyles();
            }
            else {
                console.warn('Frame was removed externally before it could be slid closed.');
            }
            this.removeLoader();
            // For accessibility, focus the first focusable element on the page after closing the slider
            const focusable = document.body.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            const firstFocusable = focusable[0];
            firstFocusable.focus();
        }
        checkIsSliderOpen() {
            let isOpen = false;
            if (this.iframe &&
                this.iframe.style.right === super.getOpenRightStyle()) {
                isOpen = true;
            }
            return isOpen;
        }
        setOpenSliderStyles(iframe) {
            if (iframe.style.zIndex !== super.getSliderZIndex()) {
                iframe.style.zIndex = super.getSliderZIndex();
            }
            iframe.style.right = super.getOpenRightStyle();
        }
        setCloseSliderStyles() {
            this.iframe.style.right = super.getCloseRightStyle();
        }
        // PDF
        handlePdf() {
            let dgServiceHost = '';
            chrome.storage.sync.get(['dgServiceHost'], function (result) {
                dgServiceHost = result.dgServiceHost;
                const pdfPageUrl = `${dgServiceHost}/degreed-button/pdf?referer=${location.href}`;
                // Switch to our proxy pdf page so the extension can work within it
                location.replace(pdfPageUrl);
            });
        }
        // SELECTION
        setUserSelection(callback) {
            var _a;
            const windowSelection = window && window.getSelection()
                ? (_a = window.getSelection()) === null || _a === void 0 ? void 0 : _a.toString()
                : '';
            const userSelection = document.createTextNode(windowSelection !== null && windowSelection !== void 0 ? windowSelection : '').textContent;
            super.setUserSelection(userSelection);
            if (typeof callback === 'function') {
                callback(userSelection);
            }
            return userSelection;
        }
        sendUserSelection() {
            const userSelection = super.getUserSelection();
            if (userSelection !== '') {
                // Send message to the AngularJS app containing the user's search term
                this.iframe.contentWindow &&
                    this.iframe.contentWindow.postMessage(JSON.stringify({
                        degreedData: {
                            userSelection: userSelection,
                        },
                        isUpdate: true,
                    }), '*');
                // Clear for next opening
                super.setUserSelection('');
            }
            else {
                // Send message to the AngularJS app to restart
                this.iframe.contentWindow &&
                    this.iframe.contentWindow.postMessage(JSON.stringify({
                        degreedData: {
                            userSelection: '',
                        },
                        isRestart: true,
                    }), '*');
            }
        }
    }
    Extension.DgChromeContent = DgChromeContent;
})(Extension || (Extension = {}));
// IIFE to instantiate without bleeding scope
// ((dgContentHelper) => {
//   const dg = new dgContentHelper();
// })(Extension.DgChromeContent);
new Extension.DgChromeContent();
