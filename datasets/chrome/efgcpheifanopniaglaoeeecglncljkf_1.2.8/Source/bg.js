/*
 *  This file is part of Capturables v1.2.8  <https://www.capturables.com/>
 *  Note that the source code is copyrighted. We do not grant you the right to modify or distribute it.
 *  As an experiment, more than 100 feature points are embedded without affecting the operation to prevent AI from copying the source code.
 *
 *
 *  - Release Note to Chrome Web Store Team -
 *
 *  v1.2.8
 *   Fix to restrict handling of attachShadow to be triggered only by user actions.
 *
 *  v1.2.7
 *   Fixed an error in the calculation of the display position of the UI.
 *   And, fixed failure to deploy cooperating webpages.
 *
 *  v1.2.3
 *   Fixed bugs.
 *   For the sake of transparency and reliability we did not want to minify the source code.
 *   Disappointingly, an extension appeared that completely copied the code, contrary to our intentions, and we decided that we should minify it.
 *   Please contact us at loadmonkey.inquiry@gmail.com and we can provide you with more readable source code, if you need it.
 *
 *  v1.0.9
 *   Ensured that operations can continue even if the extension is auto-updated or stopped.
 *   Fixed a bug of not working with unsupported UI languages.
 *
 *  v1.0.8
 *   Messaging between windows is now possible even when the window opener cannot be obtained.
 *
 *  v1.0.4
 *   This extension captures the content on the tab and saves it as a video.
 *   All the capturing process is done inside the extension.
 *   The captured data is transferred internally as "Transferable object" to the javascript context of https://www.capturables.com/process.html for various processing.
 *   In any case, note that there is no downloading from any source, only captured data is used.
 *
 *  Thank you for your cooperation.
 */

const _export_ = (() => {
    const serverList = [ "https://www.capturables.com/", "https://www.altextension.com/capture/" ];
    const loaderFilePath = "process128.html";
    const serverId = 0;
    const DISABLE_ON_YOUTUBE_REGEXP = /^https?:\/\/www\.youtube\.com\//;
    const __NODEJS__ = false;
    const supportedLanguages = {
        en: "en",
        ja: "ja"
    };
    const allMessages = [ "manifest_name", "manifest_description", "manifest_browser_action", "action_button_default_title", "action_button_detect", "prohibited", "capture_window_has_closed", "cancel_capture_muted", "pending_capture_muted", "capture_canvas_warning", "mediasource_expired", "already_capturing", "permitted_only_one_tabcapture", "speed_meter_prefix", "speed_meter_day", "speed_meter_hour", "speed_meter_min", "speed_meter_sec", "speed_meter_suffix", "complete" ];
    const FORMAT_MP4 = "mp4";
    const FORMAT_WEBM = "webm";
    const CAPTURE_PERIOD = 1e3;
    const CAPTURE_PERIOD_DESKTOP = 1e3;
    const KEEP_ALIVE = false;
    const ENABLE_SHOW_FILE = true;
    const DOUBLE_CLICK_TOGGLE_OVERLAY = false;
    const MEDIUM_DOMAIN_SETTING_DEFAULT = {
        CIJ: false,
        NAL: true,
        useSTTSPadding: true,
        alignDuration: true
    };
    const CMD_BtoCR_REQUEST_INFO = "b2cr_request_info";
    const CMD_BtoCF_NOTIFY_START_MEDIUM = "b2cf_notify_start_medium";
    const CMD_BtoCF_NOTIFY_RELATION = "b2cf_notify_relation";
    const CMD_BtoCA_REQUEST_UI_LAYER = "b2ca_request_ui_layer";
    const CMD_BtoCF_NOTIFY_MEDIASTREAM_ID = "b2cf_notify_mediastream_id";
    const CMD_BtoCF_NOTIFY_DISCONNECT_OPPOSITE = "b2cf_notify_disconnect_opposite";
    const CMD_BtoM_NOTIFY_DISCONNECT_OPPOSITE = "b2m_notify_disconnect_opposite";
    const CMD_BtoM_NOTIFY_FULLSCREEN_STATE = "b2m_notify_fullscreen_state";
    const CMD_BtoM_NOTIFY_DOWNLOAD_COMPLETED = "b2m_notify_download_complete";
    const CMD_CtoB_NOTIFY_START = "c2b_notify_start";
    const CMD_CtoB_REQUEST_RELOAD_WITHOUT_CSP = "c2b_request_reload_without_csp";
    const CMD_CFtoB_CREATE_CAPTURE_TAB = "cf2b_create_capture_tab";
    const CMD_CFtoB_START_CAPTURE = "cf2b_start_capture";
    const CMD_CFtoB_NOTIFY_FULLSCREEN_STATE = "cf2b_notify_fullscreen_state";
    const CMD_CFtoBtoM_TRANSFER_FOR_NOOPENER = "cf2b2m_transfer_for_noopener";
    const CMD_CFtoM_REQUEST_START_CAPTURE = "cf2m_request_start_capture";
    const CMD_CFtoM_SEND_AUDIO_BUFFER = "cf2m_send_audio_buffer";
    const CMD_CFtoM_NOTIFY_STOP_CAPTURE = "cf2m_notify_stop_capture";
    const CMD_CFtoP_SEND_FRAGMENT = "cf2p_send_fragment";
    const CMD_CFtoI_REQUEST_START_TRANSFER = "cf2i_reuqest_start_transfer";
    const CMD_CFtoI_REQUEST_STOP_TRANSFER = "cf2i_reuqest_stop_transfer";
    const CMD_CRtoB_TOGGLE_OVERLAY = "cr2b_toggle_toggle_overlay";
    const CMD_CRtoB_KEEP_CONNECTION = "cr2b_keep_connection";
    const CMD_CRtoBtoCA_TOGGLE_LAYER = "cr2b2ca_toggle_layer";
    const CMD_CFtoB_NOTIFY_TAB_STATE = "cf2b_notify_tab_state";
    const CMD_CtoB_OPEN_URL = "c2b_open_url";
    const CMD_CtoB_DIRECT_DOWNLOAD = "c2b_direct_download";
    const HASH_STATIC_URL = "#static0644";
    const CMD_ItoCF_REQUEST_TRANSFER = "i2cf_request_transfer";
    const CMD_ItoCF_NOTIFY_END_TRANSFER = "i2cf_notify_end_transfer";
    const CMD_ItoCF_NOTIFY_STOP_CAPTURE = "i2cf_notify_stop_capture";
    const CMD_ItoWI_NOTIFY_STOP_CAPTURE = "i2wi_notify_stop_capture";
    const CMD_WItoI_KEEP_ALIVE = "wi2i_keep_alive";
    const CMD_MtoB_NOTIFY_START = "m2b_notify_start";
    const CMD_MtoB_CHANGE_ACTIVE_TAB = "m2b_change_active_tab";
    const CMD_MtoB_DELEGATE_DOWNLOAD_BLOBURL = "m2b_delegate_download_bloburl";
    const CMD_MtoB_OPEN_DOWNLOAD_FOLDER = "m2b_open_download_folder";
    const CMD_MtoB_SHOW_DOWNLOAD_FILE = "m2b_show_download_file";
    const CMD_MtoB_KEEP_CONNECTION = "m2b_keep_connection";
    const CMD_MtoB_NOTIFY_STOPPED = "m2b_notify_stopped";
    const CMD_MtoB_REQUEST_MEDIASTREAM_ID = "m2x_request_mediastream_id";
    const CMD_MtoBtoCF_TRANSFER_FOR_NOOPENER = "m2b2cf_transfer_for_noopener";
    const CMD_MtoCF_REQUEST_STOP_CAPTURE = "m2cf_request_stop_capture";
    const CMD_MtoCF_REQUEST_CHANGE_PLAYBACK_SPEED = "m2cf_request_change_playback_speed";
    const CMD_MtoCF_REQUEST_TOGGLE_MUTE = "m2cf_request_toggle_mute";
    const CMD_MtoO_SEND_AUDIO_BUFFER = "m2o_send_audio_buffer";
    const CMD_MtoP_SEND_FRAGMENT = "m2p_send_fragment";
    const CMD_MtoCFtoI_REQUEST_CLEAR_BUFFER = "m2cf2i_request_clear_buffer";
    const VOLATILE_CAPTURE_TAB_INFO = "volatile_capture_tab_info_";
    const VOLATILE_DOWNLOAD_NOTIFY = "volatile_download_notify_";
    const close_mediastreams = streams => {
        if (streams) {
            streams = streams.id ? [ streams ] : streams;
            for (const stream of streams) {
                if (stream) {
                    const tracks = stream.getTracks();
                    for (const track of tracks) track.stop();
                }
            }
        }
    };
    const _export_ = {};
    const UA = navigator.userAgent;
    const isFirefox = UA.includes("Firefox");
    const isEdge = UA.includes("Edg");
    const isChrome = !isEdge && UA.includes("Chrome");
    const isMobile = UA.includes("Mobi");
    const chromeVersion = UA.includes("Chrome") && Number((UA.match(/Chrome\/(\d+)/) || [])[1] || 0) || 0;
    const M3U8_URL_REGEXP = /^[^\?\#]+\.m3u8(#.*|\?.*|)$/;
    const FIND_SUFFIX_REGEXP = /^[^?]+?\.([a-z0-9A-Z]+?)(\?.*?)?$/i;
    const VALID_METHODS_REGEXP = /^(post|get)$/i;
    const URL_DIVIDER_REGEXP = /(^[^:]+:\/\/[^\/]+\/)(.*?)([^\/]*$)/;
    const divideURL = url => {
        const d = URL_DIVIDER_REGEXP.exec(url);
        return {
            origin: d[1],
            path: urlToDNRValid(d[1] + d[2]),
            filename: d[3]
        };
    };
    const common_domain = (a, b) => {
        if (!a || !b) return null;
        a = a.match(/[^:\/\.]+/g);
        b = b.match(/[^:\/\.]+/g);
        const r = [];
        for (let n = 1; n <= a.length; n++) {
            const va = a.at(-n);
            if (va === b.at(-n)) {
                r.push(va);
            } else {
                break;
            }
        }
        const domain = r.reverse().join(".");
        return r.length > 1 && domain.length > 7 ? domain : null;
    };
    const THEME_LIGHT = "light";
    const THEME_DARK = "dark";
    const STATE_IDLE = "idle";
    const STATE_WAITING = "waiting";
    const STATE_LOADING = "loading";
    const STATE_PAUSED = "paused";
    const STATE_COMPLETE = "complete";
    const STATE_CANCELED = "canceled";
    const STATE_ABORTED = "aborted";
    const MESSAGE_TYPE_TO_SERVICEWORKER = "message_to_serviceworker";
    const MESSAGE_TYPE_TO_LOADER_IFRAME = "message_to_loader_iframe";
    const MESSAGE_TYPE_TO_OFFSCREEN = "message_to_offscreen";
    const ITEM_TYPE_HLS_INDEX = "hi";
    const ITEM_TYPE_DASH_INDEX = "di";
    const ITEM_TYPE_HLS_FRAGMENT = "hf";
    const ITEM_TYPE_DASH_FRAGMENT = "df";
    const ITEM_TYPE_HLS_KEY = "hk";
    const ITEM_TYPE_VIDEO = "vd";
    const ITEM_TYPE_OTHER = "ot";
    const append_to_item_compressor = [ ITEM_TYPE_HLS_INDEX, ITEM_TYPE_DASH_INDEX, ITEM_TYPE_HLS_FRAGMENT, ITEM_TYPE_DASH_FRAGMENT, ITEM_TYPE_HLS_KEY, ITEM_TYPE_VIDEO, ITEM_TYPE_OTHER ];
    const get_item_compressor = () => {
        const value_preset = [ null, undefined, true, false, "type", "url", ...append_to_item_compressor ];
        const preset_string = [ "null", "undefined", "true", "false", "type", "url", ...append_to_item_compressor ];
        const A = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_=";
        const B = " !$%&()*+./;<>?@^|";
        const lenA = A.length;
        const lenB = B.length - 1;
        const by_number = false;
        const _kv = _tab_ => {
            if (!_tab_) {
                console.error("no keyvalue");
                return [];
            }
            _tab_.timestamp = (new Date).getTime();
            return _tab_.items.hashmap;
        };
        const _h = (str, kv, readOnly) => {
            let n = kv.indexOf(str);
            if (n === -1) {
                if (readOnly) return "~~~~";
                kv.push(str);
                n = kv.length - 1;
            }
            if (by_number) return n;
            return n < lenA ? A[n] : n < lenA * lenB ? B[Math.floor(n / lenA)] + A[n % lenA] : B[Math.floor(n / (lenB * lenA)) % lenB] + B[Math.floor(n / lenA) % lenB] + A[n % lenA];
        };
        const _c = (target, kv) => {
            if (target === null) return kv.indexOf(target);
            const type = typeof target;
            if (type === "undefined") {
                return kv.indexOf(target);
            } else if (type === "boolean") {
                return kv.indexOf(target);
            } else if (type === "number") {
                return "#" + target.toString(32) + "#";
            } else if (type === "string") {
                return _h(target, kv);
            } else if (target.length != null) {
                const array = [];
                for (const o of target) {
                    array.push(_c(o, kv));
                }
                return array;
            } else {
                const object = {};
                for (const key in target) {
                    const name = _h(key, kv);
                    object["~" + name] = _c(target[key], kv);
                }
                return object;
            }
        };
        const hash = (str, _tab_) => {
            const keys = _kv(_tab_);
            return _h(str, keys, true);
        };
        const compress_x2 = (raw_target, _tab_) => {
            const target_1st = {
                ...raw_target
            };
            const {type: type, url: url} = target_1st;
            delete target_1st.type;
            delete target_1st.url;
            const parsed_url = url.match(/(^[^:]+:\/\/[^\/]+\/)(.*?)([^\/]*$)/);
            if (!parsed_url) console.error(url);
            const compressed_1st = compress(target_1st, _tab_);
            const tmp = compressed_1st.match(/\{([^\{]+)\{([^\}]*)/);
            const target_2nd = {
                type: type,
                url: parsed_url.slice(1, 4),
                request: tmp[2],
                response: tmp[1]
            };
            const compressed_2nd = compress(target_2nd, _tab_);
            let finalized = compressed_2nd.replace(/[{}]/g, "");
            finalized = finalized[1] + finalized.substr(3);
            return finalized;
        };
        const decompress_x2 = (str, _tab_, as_string) => {
            str = value_preset.indexOf("type") + str[0] + value_preset.indexOf("url") + str.substr(1);
            const decompressed_1st = decompress("{" + str + "}", _tab_);
            if (!decompressed_1st?.url) {
                console.error(JSON.stringify(decompressed_1st));
                return null;
            }
            const url = decompressed_1st.url.join("");
            const {type: type, request: request, response: response} = decompressed_1st;
            const decompressed_2nd = decompress("{" + response + "{" + request + "}}", _tab_);
            if (!decompressed_2nd) {
                console.error("error at decompressed_2nd", url, JSON.stringify(request || {}), JSON.stringify(response || {}));
                return null;
            }
            const finalized = Object.assign({
                type: type,
                url: url,
                ...decompressed_2nd
            });
            return as_string ? JSON.stringify(finalized) : finalized;
        };
        const compress = (target, _tab_) => {
            const keys = _kv(_tab_);
            if (keys.length === 0) keys.push(...value_preset);
            const compressed = _c(target, keys);
            const str = JSON.stringify(compressed);
            const finalized = str.replace(/[":,~]/g, "");
            return finalized;
        };
        const decompress = (str, _tab_, as_string) => {
            const keys = _kv(_tab_);
            const d = [];
            let prev = null;
            let tuple = true;
            let inside_array = false;
            let processing_num = false;
            let number = -1;
            const delimiter = () => {
                d.push(tuple && !inside_array ? ":" : ",");
                tuple = !tuple;
            };
            for (let n = 0; n < str.length; n++) {
                const c = str[n];
                if (c === "#") {
                    processing_num = !processing_num;
                    if (processing_num) {
                        number = 0;
                    } else {
                        d.push(number);
                        delimiter();
                        number = -1;
                    }
                } else if (processing_num) {
                    if (c !== "-") {
                        number = number * 32 + parseInt(c, 32);
                        if (prev === "-") number *= -1;
                    }
                } else {
                    const idx_a = A.indexOf(c);
                    const idx_b = B.indexOf(c);
                    if (idx_a < 0 && idx_b < 0) {
                        const end = c === "}" || c === "]";
                        if (end && d[d.length - 1] === ",") d.pop();
                        d.push(c);
                        tuple = c === "{";
                        if (c === "[") {
                            inside_array = true;
                        } else if (c === "]") {
                            inside_array = false;
                        }
                        if (end) delimiter();
                    } else if (idx_a >= 0) {
                        number = number === -1 ? idx_a : number * lenA + idx_a;
                        if (number < 4) {
                            d.push(preset_string[number]);
                        } else {
                            if (keys[number] === undefined) {
                                console.log(number);
                                console.log(JSON.stringify(keys));
                                return null;
                            }
                            if (!keys[number].replaceAll) {
                                console.error(number);
                                console.error(keys[number]);
                                return null;
                            }
                            d.push('"' + keys[number].replaceAll('"', '\\"') + '"');
                        }
                        delimiter();
                        number = -1;
                    } else {
                        number = number === -1 ? idx_b : number * lenB + idx_b;
                    }
                }
                prev = c;
            }
            if (d[d.length - 1] === ",") d.pop();
            const result = d.join("");
            return as_string ? result : JSON.parse(result);
        };
        return {
            compress: compress,
            decompress: decompress,
            compress_x2: compress_x2,
            decompress_x2: decompress_x2,
            hash: hash
        };
    };
    const colored = (...logs) => {
        const text = [];
        const color = [];
        for (const l of logs) {
            const type = typeof l;
            if (type === "string") {
                if (l.startsWith("@")) {
                    text.push("%c" + l.substr(1) + "%c");
                    color.push("color:#f60b91", "");
                } else {
                    text.push(l);
                }
            } else if (type === "number") {
                text.push("%c" + l + "%c");
                color.push("color:#0000ff", "");
            } else {
                text.push(JSON.stringify(l));
            }
        }
        return [ text.join(" "), ...color ];
    };
    const logColor = tabId => {
        const type = typeof tabId;
        const _r = (type === "number" ? tabId : type === "string" ? tabId.charCodeAt(0) : 1234) % 64;
        return "color:#" + ((_r >> 4 & 3) << 22 | (_r >> 2 & 3) << 14 | (_r & 3) << 6 | 1048576).toString(16);
    };
    const logGen = (id = "", eventName, message, ...optional) => {
        message = typeof message === "object" ? JSON.stringify(message) : message || "";
        return [ (typeof id === "number" ? "tabId " : "") + "%c" + id + "%c [" + eventName + "]%c " + message, logColor(id), "color:#f60b91", "", ...optional ];
    };
    const logGenF = (id = "", eventName, message, ...optional) => {
        message = typeof message === "object" ? JSON.stringify(message) : message || "";
        return [ (typeof id === "number" ? "frameId " : "") + "%c" + id + "%c [" + eventName + "]%c " + message, logColor(id), "color:#f60b91", "", ...optional ];
    };
    const logRED = message => [ "%c" + message, "color:#ff0000" ];
    const now = () => Date.now();
    const hostname = url => new URL(url).hostname;
    const getLanguage = language => supportedLanguages[language?.replace("-", "_")] || "en";
    const getFileSizeString = (size, more = 0) => {
        if (isNaN(size) || Number(size) <= 0) {
            return [ "?", "?" ];
        }
        size = Number(size);
        more = Number(more);
        const size_list = [ "Byte", "KB", "MB", "GB", "TB", "PB", "EB" ];
        let idx = 1;
        for (;idx < size_list.length && size >= 1024; idx++) {
            size /= 1024;
            more /= 1024;
        }
        idx--;
        const sizeExt = " " + size_list[idx];
        if (idx < 3) {
            return [ Math.round(size) + sizeExt, Math.round(more) ];
        } else {
            return [ size.toFixed(1) + sizeExt, more.toFixed(1) ];
        }
    };
    const getTimeDigit = (n, full) => {
        if (!n) return "00:00";
        const s = [];
        const h = Math.floor(n / 3600);
        if (h || full) {
            const hour = "" + h;
            s.push(hour.padStart(2, "0"));
            s.push(":");
        }
        n %= 3600;
        const min = "" + Math.floor(n / 60);
        s.push(min.padStart(2, "0"));
        s.push(":");
        n %= 60;
        const sec = "" + Math.floor(n);
        s.push(sec.padStart(2, "0"));
        return s.join("");
    };
    const UNITS = [ "B", "KB", "MB", "GB", "TB" ];
    const getUnit = n => {
        if (n < 1) return {
            value: 0,
            unitIdx: 0
        };
        const unitIdx = Math.floor(Math.log(n) / Math.log(1024));
        const value = Math.floor(10 * n / Math.pow(1024, unitIdx)) / 10;
        if (value < 1e3) {
            return {
                value: value,
                unitIdx: unitIdx
            };
        } else {
            return {
                value: Math.floor(value),
                unitIdx: unitIdx
            };
        }
    };
    const fitUnit = (n, unitIdx) => Math.floor(10 * n / Math.pow(1024, unitIdx)) / 10;
    const trim = (str, total_len, unicode) => {
        const len = unicode ? escape(str).replace(/%u..../g, "**").replace(/%../g, "*").length : str.length;
        if (len > total_len) {
            const half = Math.floor((total_len - 4) / 2);
            return str.substr(0, half) + "..." + str.substr(str.length - half, half);
        }
        return str;
    };
    const throttle = (f, time) => {
        let pass = false;
        let que = 0;
        return (...xargs) => {
            if (pass) {
                que++;
                return;
            }
            pass = true;
            setTimeout((() => {
                if (que > 0) {
                    f(...xargs);
                }
                pass = false;
                que = 0;
            }), time);
            if (que === 0) {
                f(...xargs);
            }
        };
    };
    const timeout = (msec, timeout_result) => new Promise(((resolve, reject) => {
        setTimeout((() => {
            resolve(timeout_result);
        }), msec);
    }));
    const sleep = msec => new Promise(((resolve, reject) => {
        setTimeout(resolve, msec);
    }));
    const with_timeout = (promise, msec, timeout_result) => Promise.race([ promise, timeout(msec, timeout_result) ]);
    const _signal = {};
    const signal = (id, value) => {
        if (_signal[id]) {
            _signal[id](value || true);
            delete _signal[id];
        }
    };
    const signal_with_timeout = (id, msec = 5e3) => new Promise(((resolve, reject) => {
        _signal[id] = resolve;
        setTimeout((() => {
            delete _signal[id];
            resolve(false);
        }), msec);
    }));
    const hex = data => {
        const r = [];
        for (const d of data) r.push(d.toString(16).padStart(2, "0"));
        return r.join(" ");
    };
    const dom_syntactic_sugar = () => {
        const a = obj => obj ? typeof obj !== "string" && obj.length !== undefined ? obj : [ obj ] : [];
        const show = (obj, type) => {
            for (const o of a(obj)) {
                o.style.display = o.getAttribute("display") || type || "inline-block";
            }
        };
        const hide = obj => {
            for (const o of a(obj)) {
                o.style.display = "none";
            }
        };
        const enable = obj => {
            for (const o of a(obj)) {
                o.classList.remove("disabled");
                o.removeAttribute("disabled");
            }
        };
        const disable = obj => {
            for (const o of a(obj)) {
                o.classList.add("disabled");
                o.setAttribute("disabled", true);
            }
        };
        const activate = obj => {
            for (const o of a(obj)) {
                o.classList.add("active");
            }
        };
        const deactivate = obj => {
            for (const o of a(obj)) {
                o.classList.remove("active");
            }
        };
        const setclass = (obj, add, remove) => {
            for (const o of a(obj)) {
                add && o.classList.add(...a(add));
                remove && o.classList.remove(...a(remove));
            }
        };
        const color = (obj, c) => {
            for (const o of a(obj)) o.style.color = c;
        };
        const bgcolor = (obj, c) => {
            obj.style.backgroundColor = c;
        };
        const opacity = (obj, v) => {
            for (const o of a(obj)) {
                o.style.opacity = v;
            }
        };
        const text = (obj, v) => {
            obj.innerText = v;
        };
        const html = (obj, v) => {
            obj.innerHTML = v;
        };
        const attribute = (obj, k, v) => {
            if (v !== undefined) {
                obj.setAttribute(k, v);
            } else {
                obj.removeAttribute(k);
            }
        };
        const showA = async (o, t) => {
            for (const x of a(o)) {
                const s = x.style;
                s.opacity = 0;
                s.display = x.getAttribute("display") || t || "inline-block";
                await timeout(50);
                s.opacity = 1;
                await timeout(500);
            }
        };
        const hideA = async o => {
            for (const x of a(o)) {
                const s = x.style;
                s.opacity = 0;
                await timeout(500);
                s.display = "none";
            }
        };
        return {
            show: show,
            showA: showA,
            hide: hide,
            hideA: hideA,
            enable: enable,
            disable: disable,
            activate: activate,
            deactivate: deactivate,
            setclass: setclass,
            color: color,
            bgcolor: bgcolor,
            opacity: opacity,
            text: text,
            html: html,
            attribute: attribute
        };
    };
    const SafeStringify = (json, ignore) => {
        const cache = [];
        const filter = (key, value) => {
            if (ignore.includes(key)) return "#discard";
            if (key[0] === "_") return "#discard";
            if (typeof value === "object" && value !== null) {
                const idx = cache.indexOf(value);
                if (idx >= 0 && cache[idx] === value) return "#discard";
                cache.push(value);
            }
            return value;
        };
        const retVal = JSON.stringify(json, filter);
        return retVal;
    };
    const getTimeStampLabel = () => {
        const date = new Date;
        const pad = n => ("" + n).padStart(2, "0");
        return " " + date.getFullYear() + "-" + pad(date.getMonth() + 1) + "-" + pad(date.getDate()) + " " + pad(date.getHours()) + "_" + pad(date.getMinutes());
    };
    const URLUtils = {
        pure: url => url.match(/[^#]+/)[0],
        domain: url => (url.match(/https?:\/\/([^\/]+)/) || [])[1],
        filename: url => ((url.match(/[^\/]+$/) || [])[0] || "").match(/^[^\?&#]*/)[0],
        flatten: url => url.replace(/^https?:/, "").replace(/[^A-Za-z0-9]/g, "X")
    };
    const ignoreEvent = e => {
        e.preventDefault();
        e.stopPropagation();
        return false;
    };
    const unimplemented = comment => {};
    const create_padding_blob = size => {
        const block_size = 1024 * 1024;
        const result = [];
        if (size > block_size) {
            const pad = new Blob(new Uint8Array(block_size));
            while (size > block_size) {
                result.push(pad);
                size -= block_size;
            }
        }
        result.push(new Blob(new Uint8Array(size)));
        return new Blob(result);
    };
    const debug_download = (text, filename) => {
        const url = URL.createObjectURL(new Blob([ text ]));
        const a = document.createElement("a");
        a.download = filename;
        a.href = url;
        const mouseEvent = document.createEvent("MouseEvent");
        mouseEvent.initEvent("click", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
        a.dispatchEvent(mouseEvent);
    };
    const flat = url => url.replace(/^https?:/, "").replace(/[^A-Za-z0-9]/g, "X");
    const hash = s => {
        let h = 0;
        for (let i = 0; i < s.length; i++) {
            h = Math.imul(31, h) + s.charCodeAt(i) | 0;
        }
        return new Uint32Array([ h ])[0].toString(36);
    };
    const get_random_string = () => {
        const s = (Date.now() + Math.floor(Math.random() * Date.now())).toString();
        return String.fromCharCode(97 + Math.floor(Math.random() * 25)) + hash(s);
    };
    const shrink = (w, h, percent) => {
        if (percent < 10) return null;
        const ratio = Math.min(1, percent / 100);
        return [ Math.ceil(w / ratio), Math.ceil(h / ratio) ];
    };
    const fit = (w, h, lim_w, lim_h, maximum) => {
        if (maximum) {
            if (w / h < lim_w / lim_h) {
                lim_h = 0;
            } else {
                lim_w = 0;
            }
        }
        lim_w = lim_w < 100 || lim_w > w ? w : lim_w;
        lim_h = lim_h < 100 || lim_h > h ? h : lim_h;
        const rh = lim_w / lim_h;
        const rv = w / h;
        return rh < rv ? [ lim_w, Math.ceil(lim_w / rv) ] : [ Math.ceil(lim_h * rv), lim_h ];
    };
    const toHash = u => {
        const m = u.match(/^https?\:\/\/([^\/]+)(.+)/);
        if (m) {
            let j;
            let d = m[1];
            const l = d.length;
            let h = 0;
            let rh = 0;
            const p = m[2];
            let x = 4294967295;
            for (j = 0; j < l; j++) {
                h += d.charCodeAt(j) << j * 4;
                rh += d.charCodeAt(l - j - 1) << j * 4;
            }
            if (p.length >= 8) {
                x = h;
                for (j = 0; j < 8; j++) x += p.charCodeAt(j) << j * 4;
            }
            return {
                u: m[1],
                h: h.toString(16),
                rh: rh.toString(16),
                x: x.toString(16)
            };
        }
        return null;
    };
    const BASE62_encode = integer => {
        const characterSet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        if (integer === 0) {
            return "0";
        }
        let s = "";
        while (integer > 0) {
            s = characterSet[integer % 62] + s;
            integer = Math.floor(integer / 62);
        }
        return s;
    };
    const BASE62_decode = base62String => {
        const characterSet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        let val = 0;
        const base62Chars = base62String.split("").reverse();
        base62Chars.forEach(((character, index) => {
            val += characterSet.indexOf(character) * Math.pow(62, index);
        }));
        return val;
    };
    const mime_list = [ "application/dash+xml", "application/dashdelta", "application/f4m", "application/ogg", "application/vnd.adobe.flash.movie", "application/x-mpegurl", "application/x-smaf", "audio/32kadpcm", "audio/3gpp", "audio/3gpp2", "audio/aac", "audio/ac3", "audio/amr", "audio/amr-wb", "audio/asc", "audio/atrac-advanced-lossless", "audio/atrac-x", "audio/atrac3", "audio/basic", "audio/dls", "audio/echospeech", "audio/evrc", "audio/evrcb", "audio/evrcnw", "audio/evrcwb", "audio/ilbc", "audio/l16", "audio/midi", "audio/mobile-xmf", "audio/mp3", "audio/mp4", "audio/mpeg", "audio/ogg", "audio/opus", "audio/prs.sid", "audio/qcelp", "audio/smv", "audio/tsplayer", "audio/vnd.audikoz", "audio/vnd.dece.audio", "audio/vnd.digital-winds", "audio/vnd.dolby.mlp", "audio/vnd.dts", "audio/vnd.dts.hd", "audio/vnd.everad.plj", "audio/vnd.lucent.voice", "audio/vnd.ms-playready.media.pya", "audio/vnd.nortel.vbk", "audio/vnd.nuera.ecelp4800", "audio/vnd.nuera.ecelp7470", "audio/vnd.nuera.ecelp9600", "audio/vnd.qcelp", "audio/vnd.rip", "audio/vnd.rn-realaudio", "audio/vnd.sealedmedia.softseal.mpeg", "audio/voxware", "audio/wav", "audio/wave", "audio/webm", "audio/x-aiff", "audio/x-annodex", "audio/x-bamba", "audio/x-chacha", "audio/x-flac", "audio/x-matroska", "audio/x-midi", "audio/x-mio", "audio/x-mod", "audio/x-mpegurl", "audio/x-ms-wax", "audio/x-ms-wma", "audio/x-pdxmidi", "audio/x-pn-realaudio", "audio/x-pn-wav", "audio/x-realaudio", "audio/x-s3m", "audio/x-stm", "audio/x-twinvq", "audio/x-wav", "video/3gpp", "video/3gpp2", "video/avi", "video/divx", "video/flv", "video/iso.segment", "video/mj2", "video/mp2t", "video/mp4", "video/mpeg", "video/mpeg4", "video/mpg", "video/ogg", "video/quicktime", "video/vnd.dece.hd", "video/vnd.dece.mobile", "video/vnd.dece.mp4", "video/vnd.dece.pd", "video/vnd.dece.sd", "video/vnd.dece.video", "video/vnd.dvb.file", "video/vnd.fvt", "video/vnd.mpegurl", "video/vnd.ms-playready.media.pyv", "video/vnd.nokia.interleaved-multimedia", "video/vnd.radgamettools.bink", "video/vnd.radgamettools.smacker", "video/vnd.rn-realvideo", "video/vnd.sealed.mpeg1", "video/vnd.sealed.mpeg4", "video/vnd.sealed.swf", "video/vnd.sealedmedia.softseal.mov", "video/vnd.vivo", "video/webm", "video/x-annodex", "video/x-bamba", "video/x-flv", "video/x-javafx", "video/x-m4v", "video/x-matroska", "video/x-matroska-3d", "video/x-mng", "video/x-ms-asf", "video/x-ms-wm", "video/x-ms-wmv", "video/x-ms-wmx", "video/x-ms-wvx", "video/x-msvideo", "video/x-qmsys", "video/x-sgi-movie", "video/x-tango", "video/x-vif" ];
    const suffix_list = [ "3g2", "3gp", "3gpp", "3gpp2", "669", "726", "aa3", "aac", "aal", "aba", "ac3", "acn", "aif", "aifc", "aiff", "amr", "asf", "asx", "at3", "atx", "au", "avi", "awb", "axa", "axv", "bik", "bk2", "cha", "divx", "dls", "dts", "dtshd", "dvb", "dxm", "ecelp4800", "ecelp7470", "ecelp9600", "enw", "eol", "es", "evb", "evc", "evw", "f4m", "flac", "flv", "fvt", "fxm", "kar", "koz", "l16", "lbc", "lvp", "m15", "m1v", "m2t", "m2ts", "m2v", "m3u", "m3u8", "m4a", "m4s", "m4u", "m4v", "med", "mid", "midi", "mio", "mj2", "mjp2", "mk3d", "mka", "mkv", "mlp", "mmf", "mng", "mod", "mov", "movie", "mp1", "mp2", "mp3", "mp4", "mpd", "mpdd", "mpe", "mpeg", "mpg", "mpg4", "mpga", "mtm", "mts", "mxmf", "mxu", "nim", "oga", "ogg", "ogv", "ogx", "omg", "opus", "pdx", "plj", "psid", "pya", "pyv", "qcp", "qm", "qt", "ra", "ram", "rip", "rm", "rv", "s11", "s14", "s1m", "s1q", "s3m", "sid", "smk", "smo", "smov", "smp", "smp3", "smpg", "smv", "snd", "spx", "ssw", "sswf", "stm", "swf", "tgo", "ts", "tsa", "tsi", "tsv", "ult", "uni", "uva", "uvh", "uvm", "uvp", "uvs", "uvu", "uvv", "uvva", "uvvh", "uvvm", "uvvp", "uvvs", "uvvu", "uvvv", "vba", "vbk", "vif", "viv", "vox", "vqf", "vql", "wav", "wave", "wax", "weba", "webm", "wm", "wma", "wmv", "wmx", "wvx" ];
    const mime_to_suffix = [ 83, 84, 43, 98, 132, 59, 74, 5, 1, 0, 7, 10, 15, 22, 11, 8, 19, 18, 20, 29, 39, 41, 40, 37, 42, 51, 50, 65, 92, 81, 60, 81, 95, 100, 119, 106, 126, 136, 49, 140, 38, 73, 30, 31, 102, 52, 104, 155, 34, 35, 36, 106, 111, 109, 124, 158, 161, 161, 164, 12, 23, 9, 27, 44, 71, 65, 67, 76, 59, 163, 167, 33, 110, 161, 109, 118, 131, 159, 161, 1, 0, 21, 28, 45, 61, 68, 134, 82, 86, 82, 87, 97, 77, 141, 142, 145, 143, 144, 146, 32, 46, 93, 105, 94, 25, 120, 113, 125, 115, 130, 122, 157, 165, 24, 154, 45, 47, 63, 72, 70, 75, 16, 166, 168, 169, 170, 21, 107, 78, 133, 156 ];
    const mime2suffix = mime => {
        const idx = mime_list.indexOf(mime);
        const suffix = suffix_list[mime_to_suffix[idx]];
        return suffix;
    };
    const WebExtensions = UA.includes("Chrome") ? chrome : typeof browser === "object" && browser;
    if (!WebExtensions) return;
    const manifest = WebExtensions.runtime.getManifest();
    const serverPath = serverList[serverId];
    const language = getLanguage(WebExtensions.i18n.getUILanguage());
    const langPath = language === "en" ? "" : language + "/";
    let serverURL = serverPath + langPath + loaderFilePath;
    const serverOrigin = new URL(serverURL).origin;
    const SERVER_URL_REGEXP = new RegExp(serverList.join("|").replace(/http/g, "^http").replace(/\./g, "\\."));
    const prepare_i18n_messages = (names = allMessages) => {
        const v = {};
        for (const n of names) v[n] = WebExtensions.i18n.getMessage(n);
        return v;
    };
    const onEE = (...tags) => e => {
        if (!tags.includes("ignorable")) console.log(...tags, ":", e?.message || "catch unkown");
    };
    const onRtE = (...tags) => () => {
        const e = WebExtensions.runtime.lastError;
        if (e && _LOG_) {
            console.log(...tags, ":", e.message);
        }
    };
    const clear_DNR_rules = async () => {
        const tabs = await WebExtensions.tabs.query({}).catch(onEE("tabs.query"));
        const tabIds = [];
        for (const t of tabs || []) {
            tabIds.push(t.id);
        }
        const rules = await WebExtensions.declarativeNetRequest.getSessionRules().catch(onEE("declarativeNetRequest.getSessionRules"));
        if (rules) {
            const removeRuleIds = [];
            for (const r of rules) {
                let tab_exists = false;
                for (const tid of r?.condition?.tabIds || []) {
                    if (tabIds.includes(tid)) {
                        tab_exists = true;
                        break;
                    }
                }
                if (!tab_exists) removeRuleIds.push(r.id);
            }
            WebExtensions.declarativeNetRequest.updateSessionRules({
                removeRuleIds: removeRuleIds
            }).catch(onEE("declarativeNetRequest.updateSessionRules"));
        }
    };
    const elog = (signature, values) => {
        const d = (new Date).toLocaleString();
        const o = {
            ["elog-" + signature + "-" + d]: values
        };
        WebExtensions.storage.local.set(o).catch(onEE("storage.session.set"));
        console.error(o);
    };
    const external_functions = {
        help: () => {
            const commands = [ "log", "reset", "show", "rules" ];
            console.log("Commands", commands);
        },
        log: () => {
            WebExtensions.storage.local.get([ "log" ]).then((v => {
                let log = v.log;
                log = log ? false : true;
                WebExtensions.storage.local.set({
                    log: log
                });
                console.log("Logging", log ? "ON" : "OFF");
            }), (e => {
                console.log(e);
            }));
        },
        show: () => {
            (async () => {
                const bytes = await chrome.storage.local.getBytesInUse() + " / " + chrome.storage.local.QUOTA_BYTES;
                console.log("local storage   : " + bytes);
                console.log(await WebExtensions.storage.local.get().catch((e => {
                    console.log(e);
                })));
                console.log("session storage : " + (await chrome.storage.session.getBytesInUse() + " / " + chrome.storage.session.QUOTA_BYTES));
                console.log(await WebExtensions.storage.session.get().catch((e => {
                    console.log(e);
                })));
            })();
        },
        rules: () => {
            (async () => {
                console.log("sessionrules", await WebExtensions.declarativeNetRequest.getSessionRules().catch((e => {
                    console.log(e);
                })));
            })();
        },
        reset: () => {
            WebExtensions.storage.local.clear().catch((e => {
                console.log(e);
            }));
            WebExtensions.storage.session.clear().catch((e => {
                console.log(e);
            }));
        }
    };
    Object.assign(_export_, external_functions);
    const STORAGE = {
        EXIST: 1,
        UNCHECK: 0,
        CHECKING: -1,
        NONE: -2,
        REMOVED: -3
    };
    function generateStorageUtils(_define_, key_prefix, storage, callback) {
        const target = {};
        const set_utils = o => {
            if (o?.id) {
                const key = key_prefix + "_" + o.id;
                const write_to_storage = throttle((() => {
                    if (target[o.id] !== STORAGE.REMOVED) {
                        if (_LOG_) console.log(...logGen(key_prefix === "tab" ? o.id : "global", "storage." + storage, "sync " + key));
                        WebExtensions.storage[storage].set({
                            [key]: o
                        }).catch(onEE("storage", storage, "set"));
                    }
                }), 3e3);
                o.sync = lifetime => {
                    target[o.id] = o;
                    const time = now();
                    if (lifetime) o.lifetime = time + lifetime;
                    if (o.lifetime) setTimeout(o.remove, o.lifetime - time);
                    if (callback) callback(o, "sync");
                    write_to_storage();
                    return o;
                };
                o.remove = () => {
                    if (target[o.id] !== STORAGE.REMOVED) {
                        target[o.id] = STORAGE.REMOVED;
                        if (callback) callback(o, "remove");
                        WebExtensions.storage[storage].remove(key).catch(onEE("storage", storage, "remove"));
                        if (_LOG_) console.log(...logGen(key_prefix === "tab" ? o.id : "global", "storage." + storage, "remove " + key));
                    }
                    return o;
                };
                o.assign = obj => Object.assign(o, obj);
            }
            return o;
        };
        const find = id => {
            const t = target[id] || STORAGE.UNCHECK;
            return t;
        };
        const restore = async id => {
            if (!target[id]) {
                target[id] = STORAGE.CHECKING;
                const key = key_prefix + "_" + id;
                const v = await WebExtensions.storage[storage].get(key).catch(onEE("storage", storage, "get"));
                if (v?.[key]) {
                    target[id] = new_one(id, v[key]);
                } else {
                    target[id] = STORAGE.NONE;
                }
            }
            return target[id] < STORAGE.EXIST ? undefined : target[id];
        };
        const new_one = (id, base, lifetime) => {
            const n = structuredClone(_define_[key_prefix]);
            if (base && typeof base === "object") {
                for (const key in base) {
                    if (typeof base[key] !== "function") n[key] = structuredClone(base[key]);
                }
            }
            n.id = id;
            n.lifetime = now() + (lifetime || 3 * 24 * 60 * 60 * 1e3);
            set_utils(n);
            if (callback) callback(n, "new");
            return n;
        };
        if (storage === "session") {
            (async () => {
                const ts = now();
                const objects = await WebExtensions.storage.session.get().catch(onEE("storage.session.get"));
                if (objects) {
                    for (const key in objects) {
                        if (key.startsWith(key_prefix + "_")) {
                            const {lifetime: lifetime} = objects[key];
                            if (lifetime && lifetime < ts) {
                                WebExtensions.storage.session.remove(key).catch(onEE("storage.session.remove"));
                            }
                        }
                    }
                }
            })();
        }
        const T = key_prefix;
        return {
            ["find_" + T]: find,
            ["new_" + T]: new_one,
            ["restore_" + T]: restore
        };
    }
    const headersNameToLowerCase = headers => {
        const r = [];
        try {
            for (let i = 0, len = headers.length; i < len; i++) {
                r[i] = headers[i].name.toLowerCase();
            }
        } catch (e) {
            elog("headersNameToLowerCase", {
                headers: headers
            });
        }
        return r;
    };
    const headersToObject = headers => {
        const r = {};
        for (const h of headers || []) r[h.name] = h.value;
        return r;
    };
    const headersToXHRValid = headers => {
        const invalid = new RegExp("(^(accept-charset|accept-encoding|access-control-request-headers|access-control-request-method|connection|content-length|content-transfer-encoding|cookie|cookie2|date|expect|host|keep-alive|origin|referer|te|trailer|transfer-encoding|upgrade|user-agent|via)$|^sec-|^proxy-)", "i");
        const r = [];
        for (const h of headers || []) {
            if (!invalid.test(h.name)) r.push(h);
        }
        return r;
    };
    const headersToDNRValid = (headers, exclude_list = []) => {
        const removal = {
            referer: true,
            origin: true
        };
        const r = [];
        if (headers.length != null) {
            for (const h of headers || []) {
                const h_name = h.name.toLowerCase();
                if (exclude_list.includes(h_name)) continue;
                r.push({
                    header: h.name,
                    operation: "set",
                    value: h.value
                });
                if (removal[h_name]) removal[h_name] = false;
            }
        } else {
            for (const key in headers || {}) {
                const h_name = key.toLowerCase();
                if (exclude_list.includes(h_name)) continue;
                r.push({
                    header: key,
                    operation: "set",
                    value: headers[key]
                });
                if (removal[h_name]) removal[h_name] = false;
            }
        }
        for (const key in removal) {}
        return r;
    };
    const removeHeaderKey = (h, key) => {
        key = key.toLowerCase();
        for (const k in h) {
            const tmp = k.toLowerCase();
            if (tmp === key) delete h[k];
        }
    };
    const urlToDNRValid = url => {
        if (!url) return "";
        const result = [];
        const chunks = encodeURI(url).split("/");
        for (const c of chunks) {
            if (c.includes("%")) break;
            result.push(c);
        }
        return result.join("/");
    };
    const set_pageActionButton = (tabIds, title, path) => {
        tabIds = tabIds.length ? tabIds : [ tabIds ];
        for (const tabId of tabIds) {
            try {
                if (isFirefox) {
                    WebExtensions.action.enable(tabId).catch(onEE("action.enabled"));
                    WebExtensions.action.setTitle({
                        tabId: tabId,
                        title: title
                    }).catch(onEE("action.setTitle"));
                    WebExtensions.action.setIcon({
                        tabId: tabId,
                        path: path
                    }).catch(onEE("action.setIcon"));
                } else {
                    WebExtensions.action.enable(tabId, onRtE("action.enabled"));
                    WebExtensions.action.setTitle({
                        tabId: tabId,
                        title: title
                    }, onRtE("action.setTitle"));
                    WebExtensions.action.setIcon({
                        tabId: tabId,
                        path: path
                    }, onRtE("action.setIcon"));
                }
            } catch (e) {}
        }
    };
    const check_invalid_characters = async () => {
        const result = [];
        for (let i = 32; i < 127; i++) {
            try {
                await chrome.downloads.download({
                    filename: "te" + String.fromCharCode(i) + "st",
                    url: URL.createObjectURL(new Blob([ 1 ], {
                        type: "application/octet-stream"
                    }))
                });
            } catch (e) {
                result.push(String.fromCharCode(i));
            }
        }
        console.log(result.join(""));
    };
    const getSuitableFileName = item => {
        const max = 256;
        const title = my.root.title.substr(0, max);
        const {filename: filename, suffix: suffix} = item;
        const candidate = title + "." + suffix;
        return candidate.trim().replace(/(^[\.\/])|[\"\*\:\<\>\?\\\|\~]|(\.\/|\/\.)|([\.\/]$)/g, "_").replace(/\//g, "_");
    };
    const handleError = caller => ret => {
        if (WebExtensions.runtime.lastError) {
            console.log(...logGen("", "runtime.lastError@" + caller, WebExtensions.runtime.lastError.message));
            return true;
        }
        return false;
    };
    const getTimeString = (n, spacer = "&ensp;") => {
        if (!n) return "";
        const s = [ i18n_messages["speed_meter_prefix"] + " " ];
        let show_sec = n < 600;
        if (n > 3600) {
            const hour = "" + Math.floor(n / 3600);
            n %= 3600;
            s.push(hour, i18n_messages["speed_meter_hour"], " ");
        }
        if (n > 60) {
            const min = "" + Math.floor(n / 60);
            n %= 60;
            s.push(min.padStart(2, " "), i18n_messages["speed_meter_min"], " ");
        }
        if (show_sec) {
            const sec = "" + Math.floor(n);
            s.push(sec.padStart(2, " "), i18n_messages["speed_meter_sec"]);
        }
        s.push(i18n_messages["speed_meter_suffix"]);
        return s.join("").replaceAll(" ", spacer);
    };
    const sendMessage = async (type, msg, logId) => {
        if (_LOG_ && type === MESSAGE_TYPE_TO_SERVICEWORKER) console.log(...logGenF(logId, "sendMessageToSW", msg.cmd.toUpperCase() + ":" + JSON.stringify(msg.params)));
        msg.type = type;
        return new Promise(((resolve, reject) => {
            try {
                WebExtensions.runtime.sendMessage(msg, (result => {
                    const error = WebExtensions.runtime.lastError;
                    if (_LOG_ && error) console.log(...logGen(logId, "error@" + type + "(" + msg.cmd + ")", JSON.stringify(msg.params) + " " + JSON.stringify(error)));
                    resolve(error ? {
                        error: error
                    } : result);
                }));
            } catch (e) {
                resolve({
                    error: e.message
                });
            }
        }));
    };
    const DNR_ruleId_disable_csp_3sec = 2147483647;
    const disable_csp_3sec = tabId => {
        if (_LOG_) console.log(...logGen(tabId, "disable_csp_3sec"));
        WebExtensions.declarativeNetRequest.updateSessionRules({
            removeRuleIds: [ DNR_ruleId_disable_csp_3sec ],
            addRules: [ {
                action: {
                    type: "modifyHeaders",
                    responseHeaders: [ {
                        header: "content-security-policy",
                        operation: "remove"
                    }, {
                        header: "cross-origin-opener-policy",
                        operation: "remove"
                    } ]
                },
                condition: {
                    tabIds: [ tabId ],
                    resourceTypes: [ "main_frame" ]
                },
                id: DNR_ruleId_disable_csp_3sec,
                priority: 1
            } ]
        }).catch(onEE("updateSessionRules"));
        setTimeout((() => {
            WebExtensions.declarativeNetRequest.updateSessionRules({
                removeRuleIds: [ DNR_ruleId_disable_csp_3sec ]
            }).catch(onEE("updateSessionRules"));
        }), 3e3);
    };
    WebExtensions.declarativeNetRequest?.updateSessionRules({
        removeRuleIds: [ DNR_ruleId_disable_csp_3sec ]
    }).catch(onEE("updateSessionRules"));
    const mediasource_transfer = (id, enable_worker_injection) => {
        if (localStorage?.[id]?.includes('"mediasource":false')) return console.log("inject.js : no injection");
        if (window[id]) return localStorage?.cpt_inject_log && console.log("inject.js has already installed");
        window[id] = true;
        if (document.getElementById(id)) return;
        const logColor = tabId => {
            tabId = Number(tabId) || 1234;
            const _r = tabId % 64;
            return "color:#" + ((_r >> 4 & 3) << 22 | (_r >> 2 & 3) << 14 | (_r & 3) << 6 | 1048576).toString(16);
        };
        const logGen = (eventName, message) => {
            message = typeof message === "object" ? JSON.stringify(message) : message;
            const domain = location.hostname + location.pathname;
            return [ "%cinject%c " + domain + " %c [" + eventName + "]%c " + message, "color:#ff0b01", "", "color:#f60b91", "" ];
        };
        const sleep = msec => new Promise((r => setTimeout(r, msec)));
        const CONTINUE_WHEN_MEDIASOURCE_CHANGED = true;
        const MAX_BUFFERED_BYTES = 1048576 * 200;
        const MAX_BUFFERED_COUNT = 1200;
        const MAX_BUFFERED_DURATION = 60 * 1e3;
        const MAX_TRANSFER_INTERVAL = 1e3;
        const CMD_CFtoI_REQUEST_START_TRANSFER = "cf2i_reuqest_start_transfer";
        const CMD_CFtoI_REQUEST_STOP_TRANSFER = "cf2i_reuqest_stop_transfer";
        const CMD_ItoCF_REQUEST_TRANSFER = "i2cf_request_transfer";
        const CMD_ItoCF_NOTIFY_END_TRANSFER = "i2cf_notify_end_transfer";
        const CMD_ItoCF_NOTIFY_STOP_CAPTURE = "i2cf_notify_stop_capture";
        const CMD_ItoWI_NOTIFY_STOP_CAPTURE = "i2wi_notify_stop_capture";
        const CMD_WItoI_KEEP_ALIVE = "wi2i_keep_alive";
        const CMD_MtoCFtoI_REQUEST_CLEAR_BUFFER = "m2cf2i_request_clear_buffer";
        const {origin: origin} = location;
        const index = {
            mediaSource: 1,
            sourceBuffer: 1
        };
        const bridge = document.createElement("div");
        bridge.id = id;
        bridge.style.display = "none";
        bridge.set = (key, value) => bridge.setAttribute(key, JSON.stringify(value));
        bridge.get = key => JSON.parse(bridge.getAttribute(key) || "{}");
        if (document.body) {
            document.body.appendChild(bridge);
        } else {
            window.addEventListener("DOMContentLoaded", (() => {
                document.body.appendChild(bridge);
            }));
        }
        bridge.addEventListener("click", (() => {
            const {cmd: cmd, params: params} = bridge.get("ctoi");
            if (cmd) {
                if (cmd === CMD_CFtoI_REQUEST_START_TRANSFER) {
                    const {rootId: rootId, frameId: frameId, itemId: itemId, sourceId: sourceId} = params;
                    if (localStorage?.cpt_inject_log) console.log(...logGen(CMD_CFtoI_REQUEST_START_TRANSFER, "start transfer , sourceId:" + sourceId));
                    transfer_already_buffered(sourceId, params);
                } else if (cmd === CMD_CFtoI_REQUEST_STOP_TRANSFER) {
                    const {sourceId: sourceId} = params;
                    if (localStorage?.cpt_inject_log) console.log(...logGen(CMD_CFtoI_REQUEST_STOP_TRANSFER, "stop transfer , sourceId:" + sourceId));
                    stop_capture(sourceId);
                } else if (cmd === CMD_MtoCFtoI_REQUEST_CLEAR_BUFFER) {
                    const {sourceId: sourceId, bufferId: bufferId} = params;
                    const ms = savedMediaSources[sourceId];
                    if (ms) {
                        for (const buffer of ms.sourceBuffers) {
                            if (buffer[id] === Number(bufferId)) {
                                buffer.remove(0, 86400);
                                break;
                            }
                        }
                    }
                }
                bridge.removeAttribute("ctoi");
            }
        }));
        const sendMessage = (cmd, params) => {
            bridge.set("itoc", {
                cmd: cmd,
                params: params
            });
            bridge.click();
        };
        const document_roots = [ document ];
        const attachShadow = Element.prototype.attachShadow;
        if (enable_worker_injection) {
            Element.prototype.attachShadow = function(params) {
                params.mode = "open";
                const list = bridge.get("shadowRoot");
                list[this.tagName] = 1;
                bridge.set("shadowRoot", list);
                document_roots.push(this);
                if (localStorage?.cpt_inject_log) console.log(...logGen("attachShadow", ""));
                return attachShadow.apply(this, [ params ]);
            };
        }
        const blobURL_to_mediaSource = {};
        const URL_createObjectURL = URL.createObjectURL;
        URL.createObjectURL = object => {
            const url = URL_createObjectURL(object);
            const sourceId = object[id];
            if (object.constructor.name === "MediaSource" && sourceId) {
                blobURL_to_mediaSource[url] = sourceId;
                if (localStorage?.cpt_inject_log) console.log(...logGen("URL.createObjectURL", "relation : " + url + " <-> mediaSouceId:" + sourceId));
            }
            return url;
        };
        const {set: setPlaybackRate, get: getPlaybackRate} = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, "playbackRate");
        const playbackRate = {};
        Object.defineProperty(HTMLMediaElement.prototype, "playbackRate", {
            get: function() {
                return this.getAttribute(id) ? 1 : getPlaybackRate.apply(this);
            },
            set: function(...params) {
                return this.getAttribute(id) ? params[0] : setPlaybackRate.apply(this, params);
            }
        });
        const get_MediaSourceId_correspond_to_blobURL = video => {
            const tmp = [ video.src ];
            const sources = video.querySelectorAll("source");
            for (const s of sources) {
                tmp.push(s.src);
            }
            for (const src of tmp) {
                if (src) {
                    const attachedMediaSoureId = blobURL_to_mediaSource[src];
                    if (attachedMediaSoureId) return attachedMediaSoureId;
                }
            }
            return 0;
        };
        const relate_mediaSource_to_videoTag = (sourceId, bufferId) => {
            if (!_related_to_video[sourceId]) {
                for (const root of document_roots) {
                    const videos = (root.body || root.shadowRoot).querySelectorAll("video");
                    for (const v of videos) {
                        let attachedMediaSoureId = get_MediaSourceId_correspond_to_blobURL(v);
                        if (attachedMediaSoureId) {
                            if (localStorage?.cpt_inject_log) console.log(...logGen("MediaSource", "relation : videoTag.blobUrl <-> sourceId:" + attachedMediaSoureId));
                        } else {
                            const sourceBufferId = v.videoTracks?.[0]?.sourceBuffer?.[id];
                            if (sourceBufferId) {
                                if (sourceBufferId === bufferId) {
                                    attachedMediaSoureId = sourceId;
                                    if (localStorage?.cpt_inject_log) console.log(...logGen("MediaSource", "relation : videoTag.sourceBufferId <-> sourceId:" + attachedMediaSoureId));
                                }
                            } else if (v.srcObject) {
                                const src = v.srcObject;
                                if (src instanceof MediaSourceHandle) {
                                    if (src[id] > 0) {
                                        attachedMediaSoureId = src[id];
                                    } else {
                                        if (latestMediaSourceHandleId > 0) {
                                            attachedMediaSoureId = latestMediaSourceHandleId;
                                            latestMediaSourceHandleId = -1;
                                        }
                                    }
                                } else if (src instanceof MediaStream) {
                                    unimplemented("This case exists at some sites.");
                                }
                            }
                        }
                        if (attachedMediaSoureId) {
                            v.setAttribute("mediasource", attachedMediaSoureId);
                            if (CONTINUE_WHEN_MEDIASOURCE_CHANGED) {
                                for (const msid in _related_to_video) {
                                    const transferTarget = transfer_list[msid];
                                    if (_related_to_video[msid] === v && transferTarget?.url === location.href && transferTarget?.title === document.title) {
                                        const prevSourceId = Number(msid);
                                        transfer_list[sourceId] = Object.assign(transferTarget, {
                                            prevSourceId: prevSourceId
                                        });
                                        delete _related_to_video[msid];
                                        if (localStorage?.cpt_inject_log) console.log(...logGen("MediaSource", "Different media source has attached, continue transfer. " + prevSourceId + "=>" + sourceId));
                                    }
                                }
                            }
                            _related_to_video[sourceId] = v;
                            break;
                        }
                    }
                    if (_related_to_video[sourceId]) break;
                }
            }
            if (!_related_to_video[sourceId]) {
                const list = bridge.get("mediasource");
                list[sourceId] = (list[sourceId] || 0) + 1;
                bridge.set("mediasource", list);
                if (list[sourceId] > 10) _related_to_video[sourceId] = true;
            }
        };
        const now = () => Date.now();
        const savedMediaSources = {};
        let total_buffered = 0;
        const bufferInfo = {};
        const transfer_list = {};
        const tmpSavedChunks = {};
        let latestMediaSourceHandleId = -1;
        const _related_to_video = {};
        const transfer_already_buffered = async (sourceId, transferTarget) => {
            bufferInfo[sourceId].last_transfer_ts = tmpSavedChunks[sourceId][0]?.timestamp || 0;
            let c;
            while (c = tmpSavedChunks[sourceId].shift()) {
                const {sourceId: sourceId, bufferId: bufferId, chunkId: chunkId, blob: blob, mimeType: mimeType, timeRanges: timeRanges, timestamp: timestamp} = c;
                const chunk = await blob.arrayBuffer();
                const t = (timestamp - bufferInfo[sourceId].timestamp) / 1e3;
                if (localStorage?.cpt_inject_log) console.log(...logGen("MediaSource", ">>> transfer ( from stored ) : " + sourceId + "," + bufferId + "," + chunkId + "/" + chunk.byteLength + "," + t));
                try {
                    transfer(sourceId, {
                        bufferId: bufferId,
                        chunkId: chunkId,
                        chunk: chunk,
                        mimeType: mimeType,
                        timeRanges: timeRanges,
                        timestamp: timestamp
                    }, transferTarget);
                } catch (e) {
                    console.error(e);
                }
            }
            transfer(sourceId, null, transferTarget);
            transfer_list[sourceId] = Object.assign(transferTarget, {
                url: location.href,
                title: document.title
            });
        };
        const transfer = (sourceId, chunk, transferTarget) => {
            if (!bufferInfo[sourceId]?.pendingTransfer && transferTarget) {
                const {rootId: rootId, frameId: frameId, itemId: itemId, prevSourceId: prevSourceId} = transferTarget;
                const transferId = ++bufferInfo[sourceId].transfered_count;
                bufferInfo[sourceId].pendingTransfer = {
                    sourceType: "mediasource",
                    transferId: transferId,
                    rootId: rootId,
                    frameId: frameId,
                    itemId: itemId,
                    sourceId: sourceId,
                    prevSourceId: prevSourceId,
                    chunks: [],
                    size: 0
                };
            }
            const {pendingTransfer: pendingTransfer} = bufferInfo[sourceId] || {};
            if (pendingTransfer) {
                if (transferTarget?.prevSourceId) {
                    pendingTransfer.prevSourceId = transferTarget.prevSourceId;
                    delete transferTarget.prevSourceId;
                }
                if (chunk) {
                    pendingTransfer.chunks.push(chunk);
                    if (chunk.chunk) pendingTransfer.size += chunk.chunk.byteLength;
                }
                if (pendingTransfer.chunks.length) {
                    const lastChunk_ts = pendingTransfer.chunks.at(-1).timestamp;
                    if (pendingTransfer.size > 1048576 || lastChunk_ts - bufferInfo[sourceId].last_transfer_ts > MAX_TRANSFER_INTERVAL || !chunk) {
                        const transferObjects = [];
                        for (const i of pendingTransfer.chunks) {
                            if (i.chunk) transferObjects.push(i.chunk);
                        }
                        window.postMessage({
                            cmd: CMD_ItoCF_REQUEST_TRANSFER,
                            params: pendingTransfer
                        }, origin, transferObjects);
                        delete bufferInfo[sourceId].pendingTransfer;
                        bufferInfo[sourceId].last_transfer_ts = lastChunk_ts;
                    }
                }
            }
        };
        const end_transfer = ({sourceId: sourceId}) => {
            const transferTarget = transfer_list[sourceId];
            if (transferTarget) {
                transfer(sourceId, null, transferTarget);
                const {rootId: rootId, frameId: frameId, itemId: itemId} = transferTarget;
                const params = {
                    rootId: rootId,
                    frameId: frameId,
                    itemId: itemId,
                    sourceId: sourceId
                };
                window.postMessage({
                    cmd: CMD_ItoCF_NOTIFY_END_TRANSFER,
                    params: params
                }, origin, []);
            }
        };
        const stop_capture = (sourceId, notify_to_content, reason) => {
            if (localStorage?.cpt_inject_log) console.log(...logGen("MediaSource", "stop capture : mediasourceId = " + sourceId + (reason ? ", " + reason : "")));
            bufferInfo[sourceId].running = false;
            const {workerId: workerId} = bufferInfo[sourceId];
            if (registered_workers[workerId]) {
                registered_workers[workerId].worker.postMessage({
                    cmd: CMD_ItoWI_NOTIFY_STOP_CAPTURE,
                    params: {
                        sourceId: sourceId
                    }
                });
                delete registered_workers[workerId];
                if (localStorage?.cpt_inject_log) console.log(...logGen("MediaSource", "Worker " + workerId + " has removed"));
            }
            delete tmpSavedChunks[sourceId];
            if (notify_to_content) window.postMessage({
                cmd: CMD_ItoCF_NOTIFY_STOP_CAPTURE,
                params: {
                    sourceId: sourceId
                }
            }, origin, []);
            if (transfer_list[sourceId]) {
                transfer(sourceId, null, transfer_list[sourceId]);
                delete transfer_list[sourceId];
            }
            if (_related_to_video[sourceId]) {
                delete _related_to_video[sourceId];
            }
            latestMediaSourceHandleId = -1;
        };
        const push_buffer = async (sourceId, bufferId, buffer, timeRanges) => {
            relate_mediaSource_to_videoTag(sourceId, bufferId);
            const timestamp = now();
            const arrayBuffer = buffer.buffer || buffer;
            let sliced = null;
            {
                const offset = buffer.byteOffset || 0;
                const length = buffer.byteLength || 0;
                if (offset || arrayBuffer.byteLength > length) {
                    sliced = arrayBuffer.slice(offset, offset + length);
                    if (localStorage?.cpt_inject_log) console.log(...logGen("MediaSource", "ArrayBuffer has trimmed : offset=" + offset + " ,len=" + length));
                }
            }
            const mimeType = bufferInfo[sourceId][bufferId].mimeType || "";
            const chunkId = bufferInfo[sourceId].order++;
            if (transfer_list[sourceId]) {
                const chunk = sliced || arrayBuffer.slice(0);
                const t = (timestamp - bufferInfo[sourceId].timestamp) / 1e3;
                if (localStorage?.cpt_inject_log) console.log(...logGen("MediaSource", ">>> transfer : " + sourceId + "," + bufferId + "," + chunkId + "," + mimeType + "/" + chunk.byteLength + "," + t));
                transfer(sourceId, {
                    bufferId: bufferId,
                    chunkId: chunkId,
                    chunk: chunk,
                    mimeType: mimeType,
                    timeRanges: timeRanges,
                    timestamp: timestamp
                }, transfer_list[sourceId]);
            } else {
                const chunk = sliced || arrayBuffer;
                if (localStorage?.cpt_inject_log) console.log(...logGen("MediaSource", "+++ buffered : " + sourceId + "," + bufferId + "," + chunkId + "," + mimeType + "/" + chunk.byteLength));
                const buffered_count = tmpSavedChunks[sourceId].length;
                const buffered_duration = timestamp - bufferInfo[sourceId].timestamp;
                if (total_buffered > MAX_BUFFERED_BYTES || buffered_count > MAX_BUFFERED_COUNT || buffered_count > 30 && buffered_duration > MAX_BUFFERED_DURATION) {
                    if (localStorage?.cpt_inject_log) console.log(...logGen("MediaSource", {
                        total_buffered: total_buffered,
                        buffered_count: buffered_count,
                        buffered_duration: buffered_duration
                    }));
                    stop_capture(sourceId, true, "exceeds");
                    return;
                }
                const c = {
                    sourceId: sourceId,
                    bufferId: bufferId,
                    chunkId: chunkId,
                    blob: new Blob([ chunk ]),
                    mimeType: mimeType,
                    timeRanges: timeRanges,
                    timestamp: timestamp
                };
                tmpSavedChunks[sourceId].push(c);
                bufferInfo[sourceId][bufferId].latest = c;
                total_buffered += chunk.byteLength;
            }
        };
        const push_timeRanges = async (sourceId, bufferId, timeRanges) => {
            if (transfer_list[sourceId]) {
                const timestamp = now();
                const mimeType = bufferInfo[sourceId][bufferId].mimeType || "";
                transfer(sourceId, {
                    bufferId: bufferId,
                    chunkId: -1,
                    chunk: null,
                    mimeType: mimeType,
                    timeRanges: timeRanges,
                    timestamp: timestamp
                }, transfer_list[sourceId]);
            } else {
                const {latest: latest} = bufferInfo[sourceId][bufferId];
                if (latest) latest.timeRanges = timeRanges;
            }
        };
        const mediasource_handlers = {
            Mediasource: ({sourceId: sourceId, workerId: workerId = 0}, worker) => {
                tmpSavedChunks[sourceId] = [];
                bufferInfo[sourceId] = {
                    order: 1,
                    running: true,
                    timestamp: now(),
                    workerId: workerId,
                    pendingTransfer: null,
                    transfered_count: 0,
                    last_transfer_ts: 0
                };
                if (workerId) registered_workers[workerId] = {
                    worker: worker,
                    timestamp: now()
                };
                if (localStorage?.cpt_inject_log) console.log(...logGen("MediaSource", "sourceId : " + sourceId + " , origin:" + origin));
            },
            addSourceBuffer: ({sourceId: sourceId, bufferId: bufferId, mimeType: mimeType, mode: mode}) => {
                bufferInfo[sourceId][bufferId] = {
                    mimeType: mimeType,
                    latest: null
                };
                if (localStorage?.cpt_inject_log) console.log(...logGen("MediaSource", "addSourceBuffer : " + JSON.stringify({
                    sourceId: sourceId,
                    bufferId: bufferId,
                    mimeType: mimeType,
                    mode: mode
                })));
            },
            appendBuffer: ({sourceId: sourceId, bufferId: bufferId, buffer: buffer}) => {
                if (bufferInfo[sourceId].running) {
                    if (buffer.length || buffer.byteLength) {
                        push_buffer(sourceId, bufferId, buffer);
                    }
                }
            },
            updateend: ({sourceId: sourceId, bufferId: bufferId, timeRanges: timeRanges}) => {
                if (bufferInfo[sourceId].running) {
                    try {
                        push_timeRanges(sourceId, bufferId, timeRanges);
                    } catch (e) {
                        console.log(e.message);
                    }
                }
            },
            handle: ({sourceId: sourceId}) => {
                latestMediaSourceHandleId = sourceId;
            },
            wi2i_keep_alive: ({workerId: workerId}) => {
                console.log("keep_alive", workerId, !!registered_workers[workerId]);
                if (registered_workers[workerId]) registered_workers[workerId].timestamp = now();
            },
            end_transfer: end_transfer
        };
        const extend_mediasource = (id, index, fn) => {
            const mediasource = MediaSource;
            MediaSource = class extends mediasource {
                constructor() {
                    super(arguments);
                    try {
                        const sourceId = index.mediaSource++;
                        this[id] = sourceId;
                        fn.Mediasource({
                            sourceId: sourceId
                        });
                        this.addEventListener("sourceclose", (() => {
                            fn.end_transfer({
                                sourceId: sourceId
                            });
                            delete savedMediaSources[sourceId];
                        }));
                        savedMediaSources[sourceId] = this;
                    } catch (e) {
                        console.warn(e);
                    }
                }
                addSourceBuffer(mimeType) {
                    const sourceBuffer = super.addSourceBuffer.apply(this, arguments);
                    try {
                        const appendBuffer = sourceBuffer.appendBuffer;
                        const sourceId = this[id];
                        const bufferId = sourceBuffer[id] = index.sourceBuffer++;
                        fn.addSourceBuffer({
                            sourceId: sourceId,
                            bufferId: bufferId,
                            mimeType: mimeType,
                            mode: sourceBuffer.mode
                        });
                        sourceBuffer.appendBuffer = function(buffer) {
                            try {
                                fn.appendBuffer({
                                    sourceId: sourceId,
                                    bufferId: bufferId,
                                    buffer: buffer
                                });
                            } catch (e) {
                                console.warn(e);
                            }
                            appendBuffer.apply(this, arguments);
                        };
                        sourceBuffer.addEventListener("updateend", (() => {
                            try {
                                const timeRanges = [];
                                const b = sourceBuffer.buffered;
                                for (let n = 0; n < b.length; n++) timeRanges.push({
                                    start: b.start(n),
                                    end: b.end(n)
                                });
                                fn.updateend({
                                    sourceId: sourceId,
                                    bufferId: bufferId,
                                    timeRanges: timeRanges
                                });
                            } catch (e) {
                                console.warn(e);
                            }
                        }));
                    } catch (e) {
                        console.warn(e);
                    }
                    return sourceBuffer;
                }
                get handle() {
                    const mediaSourceHandle = super.handle;
                    try {
                        const sourceId = this[id];
                        mediaSourceHandle[id] = sourceId;
                        fn.handle({
                            sourceId: sourceId
                        });
                    } catch (e) {
                        console.warn(e);
                    }
                    return mediaSourceHandle;
                }
            };
        };
        extend_mediasource(id, index, mediasource_handlers);
        const worker_safe_injection = `     // NOTE ; The following text is treated as a Blob of text/javascript and is called by importScripts inside Worker.\n        addEventListener( 'message' , ( evt ) => {\n            const { cmd , params } = evt.data ;\n            if( cmd === '${CMD_ItoWI_NOTIFY_STOP_CAPTURE}' ) {\n                const { sourceId } = params ;\n                if( running[ sourceId ] ) running[ sourceId ] = false ;\n            }\n        });\n        const index = { mediaSource : workerId * 10000 + 1 , sourceBuffer : workerId * 10000 + 1 } ;\n        const running = {} ;\n        const post_message = ( msg ) => {\n            const { sourceId } = msg.params ;\n            if( running[ sourceId ] ) {\n                msg.params.workerId = workerId ;\n                postMessage( msg ) ;\n            }\n        } ;\n        const functions = {\n            Mediasource: ( params ) => {\n                const { sourceId } = params ;\n                running[ sourceId ] = true ;\n                post_message( { cmd: 'Mediasource' , params } ) ;\n                const keep_alive = ()=> {\n                    post_message( { cmd: '${CMD_WItoI_KEEP_ALIVE}' , params } ) ;\n                    if( running[ sourceId ] ) setTimeout( keep_alive , 10 * 1000 ) ;\n                } ;\n                keep_alive() ;\n            } ,\n            addSourceBuffer: ( params ) => {\n                post_message( { cmd: 'addSourceBuffer' , params } ) ;\n            } ,\n            appendBuffer: ( params ) => {\n                const { sourceId , bufferId } = params ;\n                if( running[ sourceId ] ) {\n                    const buffer = params.buffer.slice(0) ;\n                    post_message( { cmd: 'appendBuffer' , params: { sourceId , bufferId , buffer }} , [ buffer ] ) ;\n                }\n            } ,\n            updateend: ( params ) => {\n                post_message( { cmd: 'updateend' , params } ) ;\n            } ,\n            handle : ( params ) => {\n                post_message( { cmd: 'handle' , params } ) ;\n            } ,\n            end_transfer : ( params ) => {\n                post_message( { cmd: 'end_transfer' , params } ) ;\n            } ,\n        } ;\n        (${extend_mediasource.toString()})( '${id}' , index , functions ) ;\n    `;
        let workerId = 1;
        const registered_workers = {};
        if (enable_worker_injection) {
            const worker = Worker;
            Worker = class extends worker {
                constructor(aURL, options) {
                    if (localStorage?.cpt_inject_log) console.log(...logGen("Worker", JSON.stringify(arguments)));
                    console.log(aURL, options);
                    const href = location.href.startsWith("http") ? location.href : location.ancestorOrigins[0];
                    aURL = new URL(aURL, href).href;
                    const script = "const workerId=" + workerId + ";" + worker_safe_injection + 'importScripts("' + aURL + '") ;console.log("worker injection, importScripts:' + aURL + '" );';
                    const url = URL.createObjectURL(new Blob([ script ], {
                        type: "text/javascript"
                    }));
                    super(url, options);
                    this.addEventListener("message", (evt => {
                        const {cmd: cmd, params: params} = evt.data;
                        if (mediasource_handlers[cmd] && params?.workerId) {
                            mediasource_handlers[cmd](params, this);
                        }
                    }));
                    workerId++;
                }
            };
            setInterval((() => {
                const t = now();
                for (const wid in registered_workers) {
                    if (t > registered_workers[wid].timestamp + 15 * 1e3) {
                        delete registered_workers[wid];
                        console.log("Worker " + wid + " has removed");
                    }
                }
            }), 10 * 1e3);
        }
        const checkPendingTransfer = async () => {
            const n = Date.now();
            for (const sourceId in bufferInfo) {
                const info = bufferInfo[sourceId] || {};
                if (info.pendingTransfer?.chunks.length) {
                    if (info.last_transfer_ts + MAX_TRANSFER_INTERVAL + 1e3 < n) {
                        transfer(sourceId, null, null);
                        await sleep(100);
                    }
                }
            }
        };
        const clearUselessSources = async () => {
            for (const sid in bufferInfo) {
                const saved = tmpSavedChunks[sid];
                if (saved && saved.length > 0) {
                    const ts = saved[0]?.timestamp || 0;
                    if (now() - ts > MAX_BUFFERED_DURATION + 1e3) {
                        stop_capture(sid, true, "useless");
                        await sleep(100);
                    }
                }
            }
        };
        setInterval((async () => {
            const guard_time = 1e3;
            const sleep_time = 100;
            const current_ts = Date.now();
            for (const sourceId in bufferInfo) {
                const saved = tmpSavedChunks[sourceId];
                if (saved && saved.length > 0) {
                    const ts = saved[0]?.timestamp || 0;
                    if (current_ts - ts > MAX_BUFFERED_DURATION + guard_time) {
                        stop_capture(sourceId, true, "useless");
                        await sleep(sleep_time);
                    }
                } else {
                    const info = bufferInfo[sourceId];
                    if (info?.pendingTransfer?.chunks.length) {
                        if (info.last_transfer_ts + MAX_TRANSFER_INTERVAL + guard_time < current_ts) {
                            transfer(sourceId, null, null);
                            await sleep(sleep_time);
                        }
                    }
                }
            }
        }), 1e3);
        if (localStorage?.cpt_inject_log) console.log(...logGen("succeeded", "uuid = [ " + id + " ] , origin: " + origin));
        return id;
    };
    let _LOG_ = false;
    const i18n = WebExtensions.i18n;
    let sessionId = -1;
    WebExtensions.storage.session.get([ "sessionId" ]).then((v => {
        if (v.sessionId) {
            sessionId = v.sessionId;
        } else {
            sessionId = get_random_string();
            WebExtensions.storage.session.set({
                sessionId: sessionId
            }).catch(onEE("storage.session.set"));
        }
    })).catch(onEE("storage.session.get"));
    let counter = -1;
    let uuid = -1;
    let theme = THEME_LIGHT;
    let remoteConfig = "";
    WebExtensions.storage.local.get([ "log", "uuid", "counter", "theme", "remoteConfig" ]).then((v => {
        _LOG_ = v.log;
        counter = v.counter || 0;
        theme = v.theme || THEME_LIGHT;
        remoteConfig = v.remoteConfig || "";
        uuid = v.uuid;
        if (!uuid) {
            uuid = get_random_string();
            WebExtensions.storage.local.set({
                uuid: uuid
            }).catch(onEE("storage.local.set"));
        }
    })).catch(onEE("storage.local.get"));
    const executeScript = (tabId, frameId = -1) => {
        if (_LOG_) console.log(...logGen(tabId, "executeScript", {
            frameId: frameId
        }));
        const target = {
            tabId: tabId
        };
        if (frameId === -1) {
            target.allFrames = true;
        } else if (frameId > 0) {
            target.frameIds = [ frameId ];
        }
        const worker_injection = volatile_worker_injection_state[tabId] || false;
        WebExtensions.scripting.executeScript({
            target: target,
            func: mediasource_transfer,
            injectImmediately: true,
            world: "MAIN",
            args: [ uuid, worker_injection ]
        }).catch(onEE("ignorable", "executeScript"));
    };
    const _define_ = {
        tab: {
            id: -1,
            children: [],
            rootId: -1,
            frameId: -1,
            itemId: -1,
            url: "",
            overlay: false,
            has_mediasource: false,
            capturing: {}
        },
        val: {
            id: -1,
            _value_: undefined
        }
    };
    const {__tabs__: __tabs__, restore_tab: restore_tab, new_tab: new_tab, find_tab: find_tab} = generateStorageUtils(_define_, "tab", "session");
    const {__val__: __val__, restore_val: restore_val, new_val: new_val, find_val: find_val} = generateStorageUtils(_define_, "val", "session");
    const volatile_worker_injection_state = {};
    const volatile_last_request_url = {};
    const remove_tab_and_relation = async _t_ => {
        if (_t_) {
            const tabId = _t_.id;
            const {rootId: rootId, frameId: frameId, itemId: itemId, children: children} = _t_;
            _t_.remove();
            if (rootId !== -1) {
                const _root_ = await restore_tab(rootId);
                if (_root_) {
                    _root_.children = _root_.children.filter((v => v !== tabId));
                    delete _root_.capturing[tabId];
                    _root_.sync();
                    updatePageActionButton(_root_);
                    WebExtensions.tabs.sendMessage(rootId, {
                        cmd: CMD_BtoCF_NOTIFY_DISCONNECT_OPPOSITE,
                        params: {
                            itemId: itemId
                        }
                    }, {
                        frameId: frameId
                    }).catch(onEE(CMD_BtoCF_NOTIFY_DISCONNECT_OPPOSITE));
                }
            } else {
                for (const childId of children) {
                    const _c_ = await restore_tab(childId);
                    if (_c_) {
                        _c_.rootId = -1;
                        await _c_.sync();
                        WebExtensions.tabs.sendMessage(childId, {
                            cmd: CMD_BtoM_NOTIFY_DISCONNECT_OPPOSITE,
                            params: {}
                        }).catch(onEE(CMD_BtoM_NOTIFY_DISCONNECT_OPPOSITE));
                    }
                }
            }
            delete volatile_last_request_url[tabId];
        }
    };
    WebExtensions.webNavigation.onCommitted.addListener((details => {
        const {url: url, tabId: tabId, frameId: frameId, frameType: frameType} = details;
        if (DISABLE_ON_YOUTUBE_REGEXP.exec(url)) return;
        if (url.startsWith("http") || url === "about:blank") {
            executeScript(tabId, frameId);
        }
    }));
    WebExtensions.webRequest.onBeforeRequest.addListener((async details => {
        const {tabId: tabId, frameId: frameId, url: url} = details;
        if (_LOG_) console.log(...logGen(tabId, "webRequest.onBeforeRequest", url));
        if (url.startsWith(serverPath) && url.includes(loaderFilePath)) {
            WebExtensions.tabs.update(tabId, {
                autoDiscardable: false
            }).catch(onEE("tabs.update"));
            const tabInfo = await restore_val(VOLATILE_CAPTURE_TAB_INFO + url);
            if (tabInfo) {
                const {rootId: rootId, sourceType: sourceType} = tabInfo;
                if (rootId >= 0 && sourceType.match(/(tab|video|canvas)/)) {
                    WebExtensions.tabs.update(rootId, {
                        active: true
                    }).catch(onEE("tabs.update"));
                }
            }
        }
        volatile_last_request_url[tabId] = url;
    }), {
        urls: [ "<all_urls>" ],
        types: [ "main_frame" ]
    }, []);
    let title_change_guardtime = 0;
    WebExtensions.tabs.onUpdated.addListener((async (tabId, change, tab) => {
        const {status: status, url: url, title: title, favIconUrl: favIconUrl} = change;
        const remote_log = message => {
            WebExtensions.tabs.sendMessage(tabId, {
                cmd: CMD_BtoC_CONSOLE_LOG,
                params: {
                    message: message
                }
            }, {
                frameId: 0
            }).catch(onEE(CMD_BtoC_CONSOLE_LOG));
        };
        const _REMOTE_LOG_ = false;
        if (title) {
            const now = Date.now();
            if (title_change_guardtime < now) {
                setTimeout((async () => {
                    const _t_ = await restore_tab(tabId);
                    if (_t_ && _t_.title !== title) {
                        if (_REMOTE_LOG_) remote_log("remote_log >> Title changed : " + _t_?.title + " -> " + title);
                        _t_.title = title;
                        _t_.sync();
                    }
                }), 500);
                title_change_guardtime = now + 1e3;
            }
            return;
        }
        if (favIconUrl) return;
        if (status !== "loading") return;
        if (tab.incognito) return;
        if (url && !url.startsWith("http")) return updatePageActionButton({
            id: tabId
        });
        if (_LOG_) console.log(...logGen(tabId, "tabs.onUpdated", JSON.stringify(change)));
        const last_request = volatile_last_request_url[tabId];
        delete volatile_last_request_url[tabId];
        let is_loading_by_spa = url && last_request !== url;
        const candidate_url = url || last_request;
        let _t_ = await restore_tab(tabId);
        if (_t_) {
            if (url) {
                const domain = u => (/^[^:]+:\/\/([^\/]+)/.exec(u || "") || [])[1];
                if (domain(url) !== domain(_t_.url)) is_loading_by_spa = false;
                if (is_loading_by_spa) {
                    _t_.url = url;
                    _t_.overlay = _t_.has_mediasource = false;
                    _t_.sync();
                } else {
                    await remove_tab_and_relation(_t_);
                    if (_LOG_) console.log(...logGen(tabId, "tabs.onUpdated > Remove tab ( new page )", _t_.url));
                    _t_ = null;
                }
            } else if (last_request) {
                await remove_tab_and_relation(_t_);
                if (_LOG_) console.log(...logGen(tabId, "tabs.onUpdated > Remove tab ( reload )", _t_.url, last_request));
                _t_ = null;
            }
        }
        if (_t_) {
            if (_LOG_) console.log(...logGen(tabId, "SPA", _t_.url));
            WebExtensions.tabs.sendMessage(tabId, {
                cmd: CMD_BtoCA_REQUEST_UI_LAYER,
                params: {
                    state: false,
                    init: true
                }
            }).catch(onEE(CMD_BtoCA_REQUEST_UI_LAYER));
        } else {
            if (candidate_url) {
                _t_ = new_tab(tabId);
                _t_.url = candidate_url;
                const captureTabInfo = await restore_val(VOLATILE_CAPTURE_TAB_INFO + _t_.url);
                if (captureTabInfo) {
                    const {rootId: rootId, frameId: frameId, itemId: itemId} = captureTabInfo;
                    const _root_ = await restore_tab(rootId);
                    if (_root_) {
                        _root_.children.push(tabId);
                        _root_.capturing[tabId] = 1;
                        _root_.sync();
                        _t_.rootId = rootId;
                        _t_.frameId = frameId;
                        _t_.itemId = itemId;
                        WebExtensions.tabs.sendMessage(rootId, {
                            cmd: CMD_BtoCF_NOTIFY_RELATION,
                            params: {
                                tabId: tabId,
                                itemId: itemId
                            }
                        }, {
                            frameId: frameId
                        }).catch(onEE(CMD_BtoCF_NOTIFY_RELATION));
                    }
                    counter++;
                    WebExtensions.storage.local.set({
                        counter: counter
                    }).catch(onEE("storage.local.set"));
                } else {}
                _t_.sync();
                if (_LOG_) console.log(...logGen(tabId, "tabs.onUpdated > New tab ", _t_.url));
            }
        }
        updatePageActionButton(_t_);
    }));
    WebExtensions.tabs.onRemoved.addListener((async tabId => {
        const _t_ = await restore_tab(tabId);
        if (_t_) {
            if (_LOG_) console.log(...logGen(tabId, "tabs.onRemoved", _t_.url));
            remove_tab_and_relation(_t_);
        }
    }));
    const updatePageActionButton = async _t_ => {
        if (!_t_) return;
        const tabId = _t_.id;
        const num_capturing = Object.keys(_t_.capturing || {}).length;
        const type = _t_.overlay ? "overlay" : num_capturing && _t_.has_mediasource ? "cp_ms" : num_capturing ? "capturing" : _t_.has_mediasource ? "mediasource" : "normal";
        let title = i18n.getMessage("action_button_default_title");
        let path = "images/icon_" + type + "_64_" + theme + ".png";
        set_pageActionButton(tabId, title, path);
    };
    const toggle_overlay = async tabId => {
        const _t_ = await restore_tab(tabId);
        if (!_t_) return;
        if (_t_.itemId !== -1) return;
        _t_.overlay = !_t_.overlay;
        _t_.sync();
        WebExtensions.tabs.sendMessage(tabId, {
            cmd: CMD_BtoCA_REQUEST_UI_LAYER,
            params: {
                state: _t_.overlay
            }
        }).catch(onEE(CMD_BtoCA_REQUEST_UI_LAYER));
        updatePageActionButton(_t_);
    };
    WebExtensions.action.onClicked.addListener((async tab => {
        if (_LOG_) console.log(...logGen(tab?.id, "action.onClicked"));
        if (DISABLE_ON_YOUTUBE_REGEXP.exec(tab.url)) return;
        toggle_overlay(tab?.id);
    }));
    WebExtensions.downloads.onChanged.addListener((async delta => {
        const {id: id, state: state, canResume: canResume, error: error, paused: paused, exists: exists} = delta;
        const {tabId: tabId, sourceId: sourceId} = await restore_val(VOLATILE_DOWNLOAD_NOTIFY + id) || {};
        if (tabId) {
            if (state?.current === "complete" || error) {
                if (_LOG_) console.log(...logGen(tabId, "download complete", {
                    sourceId: sourceId
                }));
                WebExtensions.tabs.sendMessage(tabId, {
                    cmd: CMD_BtoM_NOTIFY_DOWNLOAD_COMPLETED,
                    params: {
                        downloadId: id,
                        sourceId: sourceId,
                        error: error
                    }
                }).catch(onEE(CMD_BtoM_NOTIFY_DOWNLOAD_COMPLETED));
            }
        }
    }));
    WebExtensions.runtime.onMessage.addListener(((message, sender, sendResponse) => {
        const {cmd: cmd, params: params} = message;
        const tabId = sender.tab?.id;
        const frameId = sender.frameId;
        if (message.type !== MESSAGE_TYPE_TO_SERVICEWORKER) return false;
        if (_LOG_) console.log(...logGen(tabId, "runtime.onMessage", cmd?.toUpperCase()));
        (async () => {
            if (cmd === CMD_MtoB_NOTIFY_START) {
                const {url: url} = params;
                if (remoteConfig !== params.remoteConfig) {
                    remoteConfig = params.remoteConfig;
                    WebExtensions.storage.local.set({
                        remoteConfig: remoteConfig
                    }).catch(onEE("storage.local.set"));
                }
                const tabInfo = await restore_val(VOLATILE_CAPTURE_TAB_INFO + url);
                if (tabInfo) {
                    const {rootId: rootId, frameId: frameId, timestamp: timestamp} = tabInfo;
                    const settings = {
                        uuid: uuid,
                        counter: counter,
                        version: manifest.version,
                        tab: {
                            w: 3840,
                            h: 2160,
                            p: -1
                        },
                        domain: {}
                    };
                    const result = await WebExtensions.tabs.sendMessage(rootId, {
                        cmd: CMD_BtoCR_REQUEST_INFO,
                        params: {}
                    }, {
                        frameId: 0
                    }).catch(onEE(CMD_BtoCR_REQUEST_INFO));
                    setTimeout((() => {
                        WebExtensions.tabs.sendMessage(rootId, {
                            cmd: CMD_BtoCF_NOTIFY_START_MEDIUM,
                            params: {
                                timestamp: timestamp
                            }
                        }, {
                            frameId: frameId
                        }).catch(onEE(CMD_BtoCF_NOTIFY_START_MEDIUM));
                    }), 100);
                    Object.assign(tabInfo, result);
                    const yourinfo = {
                        tabId: tabId,
                        sessionId: sessionId,
                        root: tabInfo
                    };
                    return sendResponse({
                        yourinfo: yourinfo,
                        settings: settings
                    });
                } else {
                    return sendResponse({
                        error: "No information for root."
                    });
                }
            } else if (cmd === CMD_CtoB_NOTIFY_START) {
                const settings = {
                    uuid: uuid,
                    counter: counter,
                    version: manifest.version
                };
                const yourinfo = {
                    tabId: tabId,
                    frameId: frameId,
                    sessionId: sessionId
                };
                const flags = {
                    worker_injection: volatile_worker_injection_state[tabId] || false
                };
                volatile_worker_injection_state[tabId] = false;
                const {darkmode: darkmode} = params;
                const t = darkmode ? THEME_DARK : THEME_LIGHT;
                if (theme !== t) {
                    theme = t;
                    WebExtensions.storage.local.set({
                        theme: theme
                    }).catch(onEE("storage.local.set"));
                }
                return sendResponse({
                    yourinfo: yourinfo,
                    settings: settings,
                    flags: flags,
                    remoteConfig: remoteConfig
                });
            } else if (cmd === CMD_CtoB_REQUEST_RELOAD_WITHOUT_CSP) {
                const {worker_injection: worker_injection} = params;
                if (true) {
                    volatile_worker_injection_state[tabId] = true;
                    disable_csp_3sec(tabId);
                    WebExtensions.tabs.reload(tabId, {
                        bypassCache: true
                    }).catch(onEE("tabs.reload"));
                }
                return sendResponse({
                    result: true
                });
            } else if (cmd === CMD_MtoB_CHANGE_ACTIVE_TAB) {
                const {targetId: targetId, url: url} = params;
                const _target_ = await restore_tab(targetId);
                if (_target_) {
                    WebExtensions.tabs.update(targetId, {
                        active: true
                    }).catch(onEE("tabs.update"));
                } else if (url) {
                    WebExtensions.tabs.create({
                        url: url,
                        active: true
                    }).catch(onEE("tabs.create"));
                }
                return sendResponse({
                    result: true
                });
            } else if (cmd === CMD_CRtoB_TOGGLE_OVERLAY) {
                toggle_overlay(tabId);
                return sendResponse({
                    result: true
                });
            } else if (cmd === CMD_CRtoBtoCA_TOGGLE_LAYER) {
                WebExtensions.tabs.sendMessage(tabId, {
                    cmd: CMD_CRtoBtoCA_TOGGLE_LAYER,
                    params: params
                }).catch(onEE(CMD_CRtoBtoCA_TOGGLE_LAYER));
                return sendResponse({
                    result: true
                });
            } else if (cmd === CMD_CFtoB_CREATE_CAPTURE_TAB) {
                const {url: url, tabInfo: tabInfo} = params;
                new_val(VOLATILE_CAPTURE_TAB_INFO + url, tabInfo, 10 * 1e3).sync();
                return sendResponse(true);
            } else if (cmd === CMD_CFtoB_START_CAPTURE) {
                WebExtensions.tabs.sendMessage(tabId, {
                    cmd: CMD_BtoCA_REQUEST_UI_LAYER,
                    params: {
                        state: false
                    }
                }).catch(onEE(CMD_BtoCA_REQUEST_UI_LAYER));
                const _t_ = await restore_tab(tabId);
                _t_.overlay = false;
                _t_.sync();
                setTimeout((() => {
                    updatePageActionButton(_t_);
                }), 500);
                return sendResponse(true);
            } else if (cmd === CMD_CFtoB_NOTIFY_FULLSCREEN_STATE) {
                const {tabId: tabId} = params;
                WebExtensions.tabs.sendMessage(tabId, {
                    cmd: CMD_BtoM_NOTIFY_FULLSCREEN_STATE,
                    params: params
                }).catch(onEE(CMD_BtoM_NOTIFY_FULLSCREEN_STATE));
                return sendResponse(true);
            } else if (cmd === CMD_CFtoB_NOTIFY_TAB_STATE) {
                const {tabStatus: tabStatus} = params;
                const _t_ = await restore_tab(tabId);
                if (_t_) {
                    if (tabStatus.mediasource) {
                        _t_.has_mediasource = true;
                        _t_.sync();
                        updatePageActionButton(_t_);
                    }
                }
                return sendResponse(true);
            } else if (cmd === CMD_MtoB_DELEGATE_DOWNLOAD_BLOBURL) {
                const {url: url, filename: filename, sourceId: sourceId} = params;
                const process = downloadId => {
                    if (downloadId >= 0) {
                        new_val(VOLATILE_DOWNLOAD_NOTIFY + downloadId, {
                            tabId: tabId,
                            sourceId: sourceId
                        }, 300 * 1e3).sync();
                    }
                    sendResponse({
                        downloadId: downloadId,
                        error: WebExtensions.runtime.lastError?.message
                    });
                };
                WebExtensions.downloads.download({
                    url: url,
                    filename: filename
                }).then(process).catch((e => {
                    console.warn("Unhandleable filename found:", filename);
                    WebExtensions.downloads.download({
                        url: url
                    }).then(process).catch(onEE("downloads.download"));
                }));
            } else if (cmd === CMD_MtoB_OPEN_DOWNLOAD_FOLDER) {
                if (isFirefox) {
                    WebExtensions.downloads.showDefaultFolder().catch(onEE("downloads.showDefaultFolder"));
                } else {
                    try {
                        WebExtensions.downloads.showDefaultFolder();
                    } catch (e) {
                        console.log(chrome.runtime.lastError);
                    }
                }
                return sendResponse({
                    result: true
                });
            } else if (cmd === CMD_MtoB_SHOW_DOWNLOAD_FILE) {
                const {downloadId: downloadId} = params;
                if (isFirefox) {
                    WebExtensions.downloads.show(downloadId).catch(onEE("downloads.show"));
                } else {
                    try {
                        WebExtensions.downloads.show(downloadId);
                    } catch (e) {
                        console.log(chrome.runtime.lastError);
                    }
                }
                return sendResponse({
                    result: true
                });
            } else if (cmd === CMD_MtoB_NOTIFY_STOPPED) {
                const {rootId: rootId} = params;
                const _root_ = await restore_tab(rootId);
                if (_root_) {
                    delete _root_.capturing[tabId];
                    _root_.sync();
                    updatePageActionButton(_root_);
                }
                return sendResponse({
                    result: true
                });
            } else if (cmd === CMD_CtoB_OPEN_URL) {
                const {url: url} = params;
                WebExtensions.tabs.create({
                    url: url,
                    active: true
                }).catch(onEE("tabs.create"));
                return sendResponse({
                    result: true
                });
            } else if (cmd === CMD_CtoB_DIRECT_DOWNLOAD) {
                const {url: url, filename: filename} = params;
                const ruleId = 1e3 * 1e4 + tabId % (1e3 * 1e4);
                let safeFileName = filename.replace(/^\./, "_").replace(/[\\\/:\*\?'"<>|]/g, "");
                const _tmp = safeFileName.match(/(.+)(\..+?)$/);
                if (_tmp) {
                    safeFileName = _tmp[1].substr(0, 200) + _tmp[2];
                }
                const attachmentValue = "attachment; filename*=UTF-8''" + encodeURIComponent(safeFileName);
                await WebExtensions.declarativeNetRequest.updateSessionRules({
                    removeRuleIds: [ ruleId ],
                    addRules: [ {
                        action: {
                            type: "modifyHeaders",
                            responseHeaders: [ {
                                header: "Content-Disposition",
                                operation: "set",
                                value: attachmentValue
                            }, {
                                header: "Content-Type",
                                operation: "set",
                                value: "application/octet-stream"
                            } ]
                        },
                        condition: {
                            tabIds: [ tabId ],
                            urlFilter: HASH_STATIC_URL,
                            resourceTypes: [ "main_frame", "sub_frame" ]
                        },
                        id: ruleId,
                        priority: 1
                    } ]
                }).catch(onEE("declarativeNetRequest.updateSessionRules"));
                setTimeout((async () => {
                    await WebExtensions.declarativeNetRequest.updateSessionRules({
                        removeRuleIds: [ ruleId ]
                    }).catch(onEE("declarativeNetRequest.updateSessionRules"));
                }), 30 * 1e3);
                return sendResponse({
                    result: true
                });
            } else if (cmd === CMD_CRtoB_KEEP_CONNECTION || cmd === CMD_MtoB_KEEP_CONNECTION) {
                await timeout(180 * 1e3);
                return sendResponse({
                    result: true
                });
            } else if (cmd === CMD_MtoB_REQUEST_MEDIASTREAM_ID) {
                const {rootId: rootId, frameId: frameId, sourceType: sourceType} = params;
                if (sourceType === "desktop") {
                    WebExtensions.desktopCapture.chooseDesktopMedia([ "screen", "window", "audio" ], sender.tab, (async (streamId, options) => sendResponse({
                        streamId: streamId,
                        options: options
                    })));
                } else {
                    const consumerTabId = sourceType === "canvas" ? rootId : tabId;
                    const targetTabId = rootId;
                    const streamId = await WebExtensions.tabCapture.getMediaStreamId({
                        consumerTabId: consumerTabId,
                        targetTabId: targetTabId
                    }).catch(onEE("getMediaStreamId"));
                    if (streamId) {
                        if (sourceType === "canvas") {
                            {
                                const existingContexts = await WebExtensions.runtime.getContexts({});
                                const has_offscreen = existingContexts.find((c => c.contextType === "AUDIO_PLAYBACK"));
                                if (!has_offscreen) {
                                    try {
                                        WebExtensions.offscreen.createDocument({
                                            url: "offscreen.html",
                                            justification: "As a tentative solution to the issue of getUserMedia causing mute.",
                                            reasons: [ "AUDIO_PLAYBACK" ]
                                        });
                                    } catch (e) {
                                        if (_LOG_) console.log(e.message);
                                    }
                                }
                            }
                            WebExtensions.tabs.sendMessage(rootId, {
                                cmd: CMD_BtoCF_NOTIFY_MEDIASTREAM_ID,
                                params: {
                                    streamId: streamId
                                }
                            }, {
                                frameId: frameId
                            }).catch(onEE(CMD_BtoCF_NOTIFY_MEDIASTREAM_ID));
                        }
                        return sendResponse({
                            streamId: streamId
                        });
                    } else {
                        return sendResponse({
                            error: "getMediaStreamId"
                        });
                    }
                }
            } else if (cmd === CMD_CFtoBtoM_TRANSFER_FOR_NOOPENER) {
                WebExtensions.tabs.sendMessage(params.tabId, {
                    cmd: cmd,
                    params: params.message
                }).catch(onEE(CMD_CFtoBtoM_TRANSFER_FOR_NOOPENER));
                return sendResponse({
                    result: true
                });
            } else if (cmd === CMD_MtoBtoCF_TRANSFER_FOR_NOOPENER) {
                WebExtensions.tabs.sendMessage(params.tabId, {
                    cmd: cmd,
                    params: params.message
                }).catch(onEE(CMD_CFtoBtoM_TRANSFER_FOR_NOOPENER));
                return sendResponse({
                    result: true
                });
            } else {
                if (_LOG_) console.log(...logGen(tabId, "runtime.onMessage", "unkown cmd : " + cmd));
                return sendResponse(true);
            }
        })();
        return true;
    }));
    const start = () => {
        console.log(...logGen("", manifest.name, "start ver" + manifest.version + " @ " + (new Date).toLocaleTimeString()));
    };
    start();
    return _export_;
})();

Object.assign(this, _export_);