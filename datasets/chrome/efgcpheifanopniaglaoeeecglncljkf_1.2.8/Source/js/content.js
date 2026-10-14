/*
 *  This file is part of Capturables v1.2.8  <https://www.capturables.com/>
 *  Note that the source code is copyrighted. We do not grant you the right to modify or distribute it.
 *  As an experiment, more than 100 feature points are embedded without affecting the operation to prevent AI from copying the source code.
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
    const localStorageProxy = (() => {
        let ls;
        try {
            ls = localStorage;
        } catch (e) {
            ls = {};
        }
        return ls;
    })();
    const _LOG_ = localStorageProxy.CPT_LOG || localStorageProxy.cpt_log;
    const i18n_messages = prepare_i18n_messages();
    const sendMessageToSW = async msg => sendMessage(MESSAGE_TYPE_TO_SERVICEWORKER, msg, my.frameId);
    const RUN_ON_ROOT_DOCUMENT_ONLY = window === window.parent;
    const my = {
        tabId: -1,
        frameId: -1,
        sessionId: -1,
        url: location.href.match(/[^#]+/)[0],
        origin: location.host ? location.origin : location.ancestorOrigins[0]
    };
    const globals = {
        uuid: -1,
        counter: -1,
        version: "",
        tab: {
            w: 1280,
            h: 720,
            p: -1
        },
        domain: {}
    };
    const DEFAULT_SETTINGS = '{"codec":"h264","quality":2,"video":true,"canvas":true,"mediasource":true}';
    let reason_of_stop = "";
    let worker_injection = false;
    let auto_toggled = false;
    const remoteConfig = {
        v: "",
        transfer_slept: false,
        transfer_copied: false
    };
    const parse_remote_config = config => {
        remoteConfig.v = config;
        remoteConfig.transfer_slept = config.includes("TransferSlept");
        remoteConfig.transfer_copied = config.includes("TransferCopied");
    };
    const sleeping_blob = new Blob([ 1 ], {
        type: "x-capturables/sleep"
    });
    const expiredMediaSources = {};
    let latestSourceId = 0;
    const tabStatus = {
        video: false,
        canvas: false,
        mediasource: false,
        n: 0
    };
    const item_doms = [];
    const generate_itemId = (object, sourceType) => {
        const typeId = [ "tab", "desktop", "video", "canvas", "mediasource" ].indexOf(sourceType);
        const {frameId: frameId} = my;
        const objectId = item_doms.indexOf(object);
        const itemId = frameId * 1e4 + typeId * 1e3 + objectId;
        return itemId;
    };
    const item2tab = {};
    const WebExtension_Runtime_onMessage = (message, sender, sendResponse) => {
        if (_LOG_) console.log(...logGenF(my.frameId, "onMessage(" + message.cmd + ")", JSON.stringify(message.params)));
        const {cmd: cmd, params: params} = message;
        const REPLY_ONCE = m => window === window.parent ? sendResponse(m) : false;
        if (cmd === CMD_BtoCF_NOTIFY_RELATION) {
            const {tabId: tabId, itemId: itemId} = params;
            item2tab[itemId] = tabId;
            return sendResponse({
                result: true
            });
        } else if (cmd === CMD_BtoCF_NOTIFY_START_MEDIUM) {
            const {timestamp: timestamp} = params;
            signal(timestamp);
            return sendResponse({
                result: true
            });
        } else if (cmd === CMD_BtoCR_REQUEST_INFO) {
            return sendResponse({
                url: location.href,
                title: document.title
            });
        } else if (cmd === CMD_BtoCF_NOTIFY_MEDIASTREAM_ID) {
            const {streamId: streamId} = params;
            if (audio_stream_resolver) {
                audio_stream_resolver(streamId);
                audio_stream_resolver = null;
            } else {
                audio_stream_id = streamId;
            }
            return sendResponse({
                result: true
            });
        } else if (cmd === CMD_BtoCA_REQUEST_UI_LAYER) {
            const {state: state, init: init} = params;
            overlay[state ? "on" : "off"]();
            if (init) {
                Object.assign(tabStatus, {
                    video: false,
                    canvas: false,
                    mediasource: false,
                    n: 0
                });
            }
            return REPLY_ONCE({
                result: true
            });
        } else if (cmd === CMD_CRtoBtoCA_TOGGLE_LAYER) {
            const {type: type, value: value} = params;
            for (const d of document.querySelectorAll('.__capturables_item__[type="' + type + '"]') || []) {
                d.style.display = value ? "block" : "none";
            }
            return REPLY_ONCE({
                result: true
            });
        } else if (cmd === CMD_BtoCF_NOTIFY_DISCONNECT_OPPOSITE) {
            const {itemId: itemId} = params;
            if (_LOG_) console.log(...logGenF(my.frameId, "Capture window has closed", JSON.stringify(params)));
            if (capture.findById(itemId)?.state === "start") {
                capture.stop(itemId, "Capture window has closed");
            }
            return sendResponse({
                result: true
            });
        } else if (cmd === CMD_MtoBtoCF_TRANSFER_FOR_NOOPENER) {
            window_onMessage({
                data: params,
                origin: serverOrigin,
                source: null
            });
            return sendResponse({
                result: true
            });
        }
    };
    const window_onMessage = async evt => {
        const {data: data, origin: origin, source: source} = evt;
        const {cmd: cmd, params: params} = data || {};
        if (origin === my.origin || origin === serverOrigin) {
            if (cmd === CMD_MtoCF_REQUEST_STOP_CAPTURE) {
                const {rootId: rootId, frameId: frameId, itemId: itemId} = params;
                if (rootId === my.tabId && frameId === my.frameId) {
                    capture.stop(itemId, "stop request from " + loaderFilePath);
                }
            }
            if (cmd === CMD_MtoCFtoI_REQUEST_CLEAR_BUFFER) {
                const {rootId: rootId, frameId: frameId, itemId: itemId, bufferId: bufferId} = params;
                if (rootId === my.tabId && frameId === my.frameId) {
                    capture.clearBuffer(itemId, bufferId, "clearBuffer request from " + loaderFilePath);
                }
            } else if (cmd === CMD_MtoCF_REQUEST_CHANGE_PLAYBACK_SPEED) {
                const {rootId: rootId, frameId: frameId, itemId: itemId, speed: speed} = params;
                if (rootId === my.tabId && frameId === my.frameId) {
                    capture.changeVideoStat(itemId, {
                        speed: speed
                    });
                }
            } else if (cmd === CMD_MtoCF_REQUEST_TOGGLE_MUTE) {
                const {rootId: rootId, frameId: frameId, itemId: itemId, muted: muted} = params;
                if (rootId === my.tabId && frameId === my.frameId) {
                    capture.changeVideoStat(itemId, {
                        muted: muted
                    });
                }
            } else if (cmd === CMD_ItoCF_REQUEST_TRANSFER) {
                const {sourceType: sourceType, transferId: transferId, rootId: rootId, frameId: frameId, itemId: itemId, sourceId: sourceId, prevSourceId: prevSourceId, chunks: chunks} = params;
                if (rootId === my.tabId && frameId === my.frameId) {
                    const item = capture.findById(itemId);
                    item.sourceId = sourceId;
                    if (item?.state === "start") {
                        const transfer = [];
                        if (remoteConfig.transfer_slept) {
                            await timeout(1);
                        } else if (remoteConfig.transfer_copied) {
                            for (const i of chunks) {
                                if (i.chunk) i.chunk = i.chunk.slice(0, i.chunk.byteLength);
                            }
                        } else {
                            await sleeping_blob.arrayBuffer();
                        }
                        for (const i of chunks) {
                            if (i.chunk) transfer.push(i.chunk);
                        }
                        item.postMessage({
                            cmd: CMD_CFtoP_SEND_FRAGMENT,
                            params: params
                        }, serverPath, transfer);
                    }
                }
            } else if (cmd === CMD_ItoCF_NOTIFY_END_TRANSFER) {
                const {rootId: rootId, frameId: frameId, itemId: itemId, sourceId: sourceId} = params;
                if (rootId === my.tabId && frameId === my.frameId) {
                    const item = capture.findById(itemId);
                    if (item?.state === "start") {
                        item.postMessage({
                            cmd: CMD_CFtoM_NOTIFY_STOP_CAPTURE,
                            params: params
                        }, serverPath, []);
                    }
                }
            } else if (cmd === CMD_ItoCF_NOTIFY_STOP_CAPTURE) {
                const {sourceId: sourceId} = params;
                if (sourceId) {
                    if (_LOG_) console.log(...logGenF(my.frameId, "CMD_ItoCF_NOTIFY_STOP_CAPTURE", {
                        sourceId: sourceId
                    }));
                    expiredMediaSources[sourceId] = true;
                    const target = document.querySelector('.__capturables_item__[sourceid="' + sourceId + '"] .__capturables_caption__');
                    if (target) {
                        target.innerText = ".MS,expired";
                        target.setAttribute("expired", 1);
                    }
                }
            }
        }
    };
    const on_domcontentloaded = async () => {
        WebExtensions.runtime.onMessage.addListener(WebExtension_Runtime_onMessage);
        const result = await sendMessageToSW({
            cmd: CMD_CtoB_NOTIFY_START,
            params: {
                darkmode: window.matchMedia("(prefers-color-scheme:dark)").matches
            }
        });
        Object.assign(my, {
            tabId: -1,
            frameId: -1,
            sessionId: -1,
            url: location.href.match(/[^#]+/)[0],
            origin: location.host ? location.origin : location.ancestorOrigins[0]
        });
        window.addEventListener("message", window_onMessage);
        if (result) {
            const {yourinfo: yourinfo, settings: settings, flags: flags} = result;
            Object.assign(my, yourinfo);
            Object.assign(globals, settings);
            parse_remote_config(result.remoteConfig || "");
            worker_injection = flags.worker_injection;
            if (_LOG_) {
                console.log(...logGenF(my.frameId, "my", JSON.stringify(my)));
                console.log(...logGenF(my.frameId, "globals", JSON.stringify(globals)));
                console.log(...logGenF(my.frameId, "flags", JSON.stringify(flags)));
            }
        } else {
            return show_info("FATAL: Failed messaging with extension", "warn");
        }
        let prevKeyUp = 0;
        document.addEventListener("keyup", (evt => {
            const {key: key} = evt;
            if (key === "Control") {
                if (DOUBLE_CLICK_TOGGLE_OVERLAY) {
                    const t = now();
                    if (t - prevKeyUp < 300) {
                        sendMessageToSW({
                            cmd: CMD_CRtoB_TOGGLE_OVERLAY,
                            params: {}
                        });
                    }
                    prevKeyUp = t;
                }
            } else if (key === "Alt") {
                for (const obj of document.querySelectorAll(".__capturables_altkey__")) obj.classList.remove("__capturables_altkey__");
            }
        }));
        window.addEventListener("keydown", (evt => {
            if (evt.altKey) {
                for (const item of document.querySelectorAll(".__capturables_item__")) {
                    item.classList.add("__capturables_altkey__");
                }
            }
        }));
        setInterval(check_state, 1e3);
    };
    let document_roots = [];
    const update_document_roots = () => {
        document_roots = [];
        if (document.body) document_roots.push(document.body);
        const bridge = document.getElementById(globals.uuid);
        if (bridge) {
            const tagNames = Object.keys(JSON.parse(bridge.getAttribute("shadowRoot") || "{}"));
            for (const tagName of tagNames) {
                for (const o of document.getElementsByTagName(tagName)) {
                    if (o.shadowRoot) {
                        document_roots.push(o.shadowRoot);
                    }
                }
            }
        }
    };
    const get_info_container = () => {
        const cid = "__capturables_info__";
        let container = document.getElementById(cid);
        if (!container) {
            container = document.createElement("div");
            container.id = cid;
            document.body.appendChild(container);
        }
        return container;
    };
    const show_info = (msg, type) => {
        const container = get_info_container();
        const layer = document.createElement("div");
        layer.innerText = msg;
        layer.classList.add("__capturables_info_" + type + "__");
        if (language === "ja") layer.classList.add("__capturables_text_ja__");
        container.appendChild(layer);
        setTimeout((() => {
            layer.style.opacity = 0;
            setTimeout((() => {
                container.removeChild(layer);
            }), 1e3);
        }), 5e3);
    };
    const timer_bar = async msec => {
        const container = get_info_container();
        const layer = document.createElement("div");
        layer.classList.add("__capturables_info_error__");
        layer.style.backgroundColor = "#f00";
        layer.style.height = "4px";
        layer.style.width = "100%";
        layer.style.transition = "width " + msec + "ms linear";
        container.appendChild(layer);
        await timeout(500);
        layer.style.width = "0%";
        await timeout(msec);
        container.removeChild(layer);
    };
    let audio_stream_resolver = null;
    let audio_stream_id = null;
    const is_audio_stream_ready = () => {
        if (audio_stream_resolver) audio_stream_resolver();
        return new Promise(((resolve, reject) => {
            audio_stream_resolver = resolve;
        }));
    };
    const capture_and_play_audio = async item => {
        const streamId = audio_stream_id || await is_audio_stream_ready();
        const audio_stream = await navigator.mediaDevices.getUserMedia({
            audio: {
                mandatory: {
                    chromeMediaSource: "tab",
                    chromeMediaSourceId: streamId,
                    echoCancellation: true
                }
            }
        });
        const audio_context = new AudioContext;
        if (false) {
            const stream_source = audio_context.createMediaStreamSource(audio_stream);
            stream_source.connect(audio_context.destination);
        } else {
            const audio_processor = "class P extends AudioWorkletProcessor{process(i,o,p,d,v=i[0],n=v.length,b=Array(n),t=Array(n),c=0){for(;c<n;c++){b[c]=v[c];t[c]=v[c].buffer}this.port.postMessage(b,t);return true}}";
            const f = "data:text/javascript," + encodeURI(audio_processor) + 'registerProcessor("P",P)';
            await audio_context.audioWorklet.addModule(f);
            const audio_node = new AudioWorkletNode(audio_context, "P");
            audio_node.port.addEventListener("message", (evt => {
                const input = evt.data;
                const transfer = [];
                for (let n = 0; n < input.length; n++) {
                    transfer.push(input[n].buffer);
                }
                item.postMessage({
                    cmd: CMD_CFtoM_SEND_AUDIO_BUFFER,
                    params: {
                        input: input
                    }
                }, serverPath, transfer);
            }));
            audio_node.port.start();
            const stream_source = audio_context.createMediaStreamSource(audio_stream);
            stream_source.connect(audio_node);
        }
        return audio_stream;
    };
    const VideoParamsController = video => {
        const saved = {
            speed: video.playbackRate,
            muted: video.muted
        };
        const set = params => {
            const {speed: speed, muted: muted, seek: seek} = params;
            if (speed) {
                video.playbackRate = speed;
                video.setAttribute(globals.uuid, true);
            }
            if (muted !== undefined) video.muted = muted;
            if (seek !== undefined) {
                let time = Number(seek);
                if (time < 0) time = video.duration * .5;
                video.currentTime = time;
            }
        };
        const stop = () => {
            video.removeAttribute(globals.uuid);
            video.playbackRate = saved.speed;
            video.muted = saved.muted;
        };
        return {
            set: set,
            stop: stop
        };
    };
    const capture = (() => {
        const items = {};
        const start = async (params, option) => {
            const {object: object, type: type, attributes: attributes} = params;
            const {width: width, height: height, sourceId: sourceId} = attributes;
            const {shiftKey: shiftKey, ctrlKey: ctrlKey, altKey: altKey} = option;
            const waiting = altKey ? 5e3 : 0;
            const rootId = my.tabId;
            const frameId = my.frameId;
            const itemId = generate_itemId(object, type);
            const url = [ serverPath, langPath, loaderFilePath, "?sid=", hash(location.hostname || "blank") ].join("");
            const settings = JSON.parse(localStorageProxy[globals.uuid] || DEFAULT_SETTINGS);
            let no_audio = false;
            if (type === "video") {
                no_audio = object.volume === 0 || object.muted;
                if (no_audio) {
                    show_info(i18n_messages["cancel_capture_muted"], "warn");
                }
            }
            const item = {
                itemId: itemId,
                object: object,
                type: type,
                url: url,
                state: "start",
                recorder: null,
                window: null,
                no_opener: false,
                primary_stream: null,
                auido_stream: null,
                fps: null,
                creationTime: now(),
                postMessage: (msg, domain, transfer) => {
                    if (!item.window?.closed) {
                        if (item.no_opener) {
                            const tabId = item2tab[itemId];
                            if (tabId) {
                                const chunks = msg.params.chunks || [];
                                for (const c of chunks) {
                                    if (c.chunk) c.chunk = Array.from(new Uint8Array(c.chunk));
                                }
                                sendMessageToSW({
                                    cmd: CMD_CFtoBtoM_TRANSFER_FOR_NOOPENER,
                                    params: {
                                        tabId: tabId,
                                        message: msg
                                    }
                                });
                            }
                        } else {
                            item.window.postMessage(msg, domain, transfer);
                        }
                    }
                },
                sourceId: sourceId,
                transferCount: 0,
                is_fullscreen: false,
                videoParamsController: null,
                is: (...t) => t.includes(item.type),
                elapsedTime: () => (now() - item.creationTime) / 1e3
            };
            items[itemId] = item;
            if (_LOG_) console.log(...logGenF(my.frameId, "capture start", object));
            const timestamp = now();
            const captureTabInfo = {
                rootId: rootId,
                frameId: frameId,
                itemId: itemId,
                sourceId: sourceId,
                sourceType: type,
                waiting: waiting,
                w: width,
                h: height,
                origin: my.origin,
                settings: settings,
                timestamp: timestamp
            };
            if (item.is("tab", "desktop", "video", "canvas", "mediasource")) {
                await sendMessageToSW({
                    cmd: CMD_CFtoB_CREATE_CAPTURE_TAB,
                    params: {
                        url: url,
                        tabInfo: captureTabInfo
                    }
                });
                item.window = window.open(url);
                const opened_with_success = await signal_with_timeout(timestamp, 5e3);
                if (!opened_with_success) {
                    if (_LOG_) console.log(...logGenF(my.frameId, "TIMEOUT", "Warn. No response from " + loaderFilePath + ", continue."));
                } else if (item.window.closed) {
                    item.window = {
                        closed: false
                    };
                    item.no_opener = true;
                }
                if (waiting) {
                    let cancel = false;
                    await timer_bar(waiting);
                    item.postMessage({
                        cmd: CMD_CFtoM_REQUEST_START_CAPTURE,
                        params: {
                            frameId: frameId,
                            itemId: itemId,
                            cancel: cancel
                        }
                    }, serverPath, []);
                    if (cancel) return stop(item.itemId);
                }
                if (type === "tab" || type === "desktop") {} else if (type === "mediasource") {
                    const injection_bridge = document.getElementById(globals.uuid);
                    injection_bridge.setAttribute("ctoi", JSON.stringify({
                        cmd: CMD_CFtoI_REQUEST_START_TRANSFER,
                        params: {
                            rootId: rootId,
                            frameId: frameId,
                            itemId: itemId,
                            sourceId: sourceId
                        }
                    }));
                    injection_bridge.click();
                    if (_LOG_) console.log(...logGenF(my.frameId, "MediaSource", "start transfer"));
                } else {
                    if (type === "canvas") {
                        item.audio_stream = await capture_and_play_audio(item);
                        item.fps = 30;
                        show_info(i18n_messages["capture_canvas_warning"], "warn");
                    } else if (type === "video") {
                        if (item.object && !item.object.__cpt_evt_added__) {
                            await wait_video_start(item.object);
                            if (item.object) {
                                item.object.addEventListener("volumechange", (evt => {
                                    const vTag = evt.target;
                                    if (vTag.volume === 0) {
                                        vTag.volume = .01;
                                    }
                                    if (vTag.muted) {
                                        vTag.muted = false;
                                        show_info(i18n_messages["pending_capture_muted"], "warn");
                                    }
                                }));
                                item.object.addEventListener("loadedmetadata", (() => {
                                    stop(item.itemId, "detect loadedmetadata@video");
                                }));
                                item.object.__cpt_evt_added__ = true;
                            }
                        }
                    }
                    try {
                        item.primary_stream = object.captureStream(item.fps);
                        if (no_audio) {
                            item.primary_stream.removeTrack(item.primary_stream.getAudioTracks()[0]);
                        }
                        if (item.audio_stream) {
                            item.primary_stream.addTrack(item.audio_stream.getAudioTracks()[0]);
                        }
                        const quality = Math.min(Math.max(1, settings.quality), 5);
                        const videoBitsPerSecond = Math.max(Math.floor(quality * 3640 * Math.sqrt(width * height)), 5e5);
                        const codec = /h264|vp8|vp9/.test(settings.codec) ? settings.codec : "h264";
                        const mimeType = "video/webm;codecs=" + codec + ",opus";
                        item.recorder = new MediaRecorder(item.primary_stream, {
                            mimeType: mimeType,
                            videoBitsPerSecond: videoBitsPerSecond
                        });
                        item.recorder.addEventListener("dataavailable", (async evt => {
                            if (evt.data.size > 0) {
                                const chunk = await evt.data.arrayBuffer();
                                const chunkId = ++item.transferCount;
                                const timeRanges = [ {
                                    start: 0,
                                    end: item.elapsedTime()
                                } ];
                                const chunks = [ {
                                    bufferId: 1,
                                    chunkId: chunkId,
                                    chunk: chunk,
                                    mimeType: mimeType,
                                    timeRanges: timeRanges
                                } ];
                                const params = {
                                    sourceType: type,
                                    transferId: chunkId,
                                    rootId: my.tabId,
                                    frameId: my.frameId,
                                    itemId: itemId,
                                    sourceId: sourceId,
                                    chunks: chunks
                                };
                                item.postMessage({
                                    cmd: CMD_CFtoP_SEND_FRAGMENT,
                                    params: params
                                }, serverPath, [ chunk ]);
                            }
                        }));
                        item.recorder.addEventListener("stop", (evt => {
                            const {sourceId: sourceId} = item;
                            item.postMessage({
                                cmd: CMD_CFtoM_NOTIFY_STOP_CAPTURE,
                                params: {
                                    reason: reason_of_stop,
                                    sourceId: sourceId
                                }
                            }, serverPath, []);
                        }));
                        item.recorder.addEventListener("pause", (evt => {
                            console.warn(evt);
                        }));
                        item.recorder.addEventListener("error", (evt => {
                            console.warn(evt);
                            stop(item.itemId, "error@MediaRecorder:" + evt.message);
                        }));
                        const check_if_node_exists = () => {
                            if (item.state === "stop") return;
                            if (document_roots.some((root => root.contains(item.object)))) return setTimeout(check_if_node_exists, 300);
                            stop(item.itemId, "target object has detached from document");
                        };
                        check_if_node_exists();
                        item.recorder.start(CAPTURE_PERIOD);
                        if (_LOG_) console.log(...logGenF(my.frameId, "capture setting", mimeType + ", " + Math.floor(videoBitsPerSecond / 1024) / 1e3 + "MBit/sec"));
                    } catch (e) {
                        console.warn(e);
                    }
                }
            }
        };
        const stop = async (itemId, reason) => {
            reason_of_stop = reason;
            const item = findById(itemId);
            if (item) {
                if (item.state === "stop") return;
                if (item.is("video", "canvas")) {
                    if (item.recorder) {
                        if (item.recorder.state !== "inactive") {
                            item.recorder.stop();
                        }
                    }
                    close_mediastreams([ item.audio_stream ]);
                    item.recorder = null;
                    item.primary_stream = null;
                    item.audio_stream = null;
                } else if (item.is("mediasource")) {
                    const injection_bridge = document.getElementById(globals.uuid);
                    const {sourceId: sourceId} = item;
                    injection_bridge.setAttribute("ctoi", JSON.stringify({
                        cmd: CMD_CFtoI_REQUEST_STOP_TRANSFER,
                        params: {
                            sourceId: sourceId
                        }
                    }));
                    injection_bridge.click();
                    item.postMessage({
                        cmd: CMD_CFtoM_NOTIFY_STOP_CAPTURE,
                        params: {
                            reason: reason_of_stop,
                            sourceId: sourceId
                        }
                    }, serverPath, []);
                    if (_LOG_) console.log(...logGenF(my.frameId, "MediaSource", "stop transfer"));
                    expiredMediaSources[sourceId] = true;
                } else if (item.is("tab")) {}
                item.state = "stop";
                item.object = null;
                item.type = "";
                item?.videoParamsController?.stop();
                if (item.no_opener) {
                    item.window.closed = true;
                }
                if (_LOG_) console.log(...logGenF(my.frameId, "capture stopped", reason));
            }
        };
        const clearBuffer = async (itemId, bufferId, reason) => {
            const item = findById(itemId);
            if (item) {
                if (item.state === "stop") return;
                if (item.is("mediasource")) {
                    const injection_bridge = document.getElementById(globals.uuid);
                    const {sourceId: sourceId} = item;
                    injection_bridge.setAttribute("ctoi", JSON.stringify({
                        cmd: CMD_MtoCFtoI_REQUEST_CLEAR_BUFFER,
                        params: {
                            sourceId: sourceId,
                            bufferId: bufferId
                        }
                    }));
                    injection_bridge.click();
                }
            }
        };
        const changeVideoStat = (itemId, params) => {
            const item = findById(itemId);
            if (item) {
                const video = item?.object;
                if (video) {
                    if (!item.videoParamsController) item.videoParamsController = VideoParamsController(video);
                }
                item?.videoParamsController?.set(params);
            }
        };
        const wait_video_start = video => {
            const is_playing = video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2;
            return new Promise((resolve => {
                if (is_playing) return resolve();
                show_info(i18n_messages["pending_capture_muted"], "warn");
                video.addEventListener("play", resolve);
            }));
        };
        const findById = itemId => items[itemId];
        const findByType = (type, object, sourceId) => {
            if (type === "tab" || type === "desktop") {
                for (const itemId in items) {
                    const item = items[itemId];
                    if (item.type === type) return item;
                }
            } else {
                if (sourceId) {
                    for (const itemId in items) {
                        const item = items[itemId];
                        if (item.type === type && item.object === object && item.sourceId === sourceId) return item;
                    }
                } else {
                    for (const itemId in items) {
                        const item = items[itemId];
                        if (item.type === type && item.object === object) return item;
                    }
                }
            }
            return null;
        };
        return {
            start: start,
            stop: stop,
            clearBuffer: clearBuffer,
            changeVideoStat: changeVideoStat,
            findByType: findByType,
            findById: findById
        };
    })();
    const tab_object = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        offset_x: 0,
        offset_y: 0,
        type: "tab"
    };
    const on_window_resize = () => {
        Object.assign(tab_object, {
            width: window.innerWidth,
            height: window.innerHeight,
            offset_x: window.pageXOffset,
            offset_y: window.pageYOffset
        });
        const t = document.querySelector('.__capturables_item__[type="tab"]');
        if (t) {
            const is_capturing = t.innerText.includes("*") ? "*" : "";
            const {width: width, height: height} = tab_object;
            const capture_size = shrink(width, height, globals.tab.p) || fit(width, height, globals.tab.w, globals.tab.h);
            const [cw, ch] = capture_size;
            t.innerText = is_capturing + cw + "x" + ch;
        }
    };
    const isBoundingOutside = rect => {
        const {scrollX: scrollX, scrollY: scrollY} = window;
        const x = rect.x + scrollX;
        const y = rect.y + scrollY;
        return x < 0 || x > document.documentElement.scrollWidth || y < 0 || y > document.documentElement.scrollHeight;
    };
    const isNoBounding = rect => !rect.width && !rect.height && !rect.x && !rect.y;
    const getDefaultBounding = () => ({
        x: -window.scrollX,
        y: -window.scrollY,
        width: 200,
        height: 40
    });
    const safe_getBoundingClientRect = (elem, n = 0) => {
        if (!elem?.getBoundingClientRect) return getDefaultBounding();
        const rect = elem.getBoundingClientRect();
        const recursive_getBounding = () => {
            const {parentNode: parentNode} = elem;
            if (parentNode && parentNode !== document?.body && n < 5) {
                return safe_getBoundingClientRect(parentNode, ++n);
            }
            return getDefaultBounding();
        };
        if (isNoBounding(rect)) return recursive_getBounding();
        if (isBoundingOutside(rect)) {
            const {offsetParent: offsetParent} = elem;
            if (offsetParent?.getBoundingClientRect) return recursive_getBounding();
            const p = offsetParent.getBoundingClientRect();
            rect.x = p.x + (elem.offsetLeft || 0);
            rect.y = p.y + (elem.offsetTop || 0);
        }
        if (isBoundingOutside(rect)) rect = getDefaultBounding();
        return rect;
    };
    const download_static_file = (url, filename) => {
        const a = document.createElement("a");
        a.download = filename;
        a.href = url + HASH_STATIC_URL;
        a.click();
    };
    const overlay = (() => {
        let layer = null;
        let capturables = [];
        let current = "off";
        const state = () => current;
        const on = async () => {
            if (current === "on") return;
            current = "on";
            const html = [];
            const settings = JSON.parse(localStorageProxy[globals.uuid] || DEFAULT_SETTINGS);
            Object.assign(tab_object, {
                width: window.innerWidth,
                height: window.innerHeight,
                offset_x: window.pageXOffset,
                offset_y: window.pageYOffset
            });
            const get_adjusted_pos = (tx, ty, th) => {
                let dx = 0;
                let dy = 0;
                let n = 0;
                for (let i = 0; i < capturables.length; i++) {
                    const pos = capturables[i].attributes.position;
                    if (pos) {
                        const {x: x, y: y, h: h} = pos;
                        const diff_x = Math.abs(tx + dx - x);
                        const diff_y = Math.abs(ty + dy - y);
                        if (diff_x < h && diff_y < h) {
                            dy += h * 1.1;
                            n++;
                        }
                    }
                }
                return {
                    x: tx + dx,
                    y: ty + dy,
                    h: th,
                    n: n
                };
            };
            const attr = (key, value) => value ? " " + key + '="' + value + '"' : "";
            const font_style = size => "font-size:" + size + "px;line-height:" + size * 1.5 + "px;padding:0 " + Math.floor(size / 4) + "px 0 " + Math.floor(size / 4) + "px;";
            const append = (object, type, attributes) => {
                try {
                    if (_LOG_) console.log(...logGenF(my.frameId, "overlay::found item", Object.assign({
                        type: type,
                        src: object.src
                    }, attributes)));
                    attributes.sourceId = attributes.sourceId || 1;
                    const {width: width, height: height, caption: caption = "", sourceId: sourceId, expired: expired, prohibited: prohibited, url: url} = attributes;
                    const is_small = width && height && (width < 91 || height < 73);
                    if (is_small) return;
                    if (item_doms.indexOf(object) === -1) item_doms.push(object);
                    if (isChrome && DISABLE_ON_YOUTUBE_REGEXP.exec(my.url)) return;
                    const rect = safe_getBoundingClientRect(object);
                    const size = Math.min(50, Math.max(16, rect.width * 16 / 100));
                    const halfSize = Math.min(25, Math.max(12, size / 2));
                    const position = get_adjusted_pos(tab_object.offset_x + rect.x, tab_object.offset_y + rect.y, size * 1.5);
                    const pos = "left:" + position.x + "px;top:" + position.y + "px;";
                    const display = "display:" + (settings[type] ? "block" : "none") + ";";
                    const radius = "border-radius: 0 " + (position.n ? Math.floor(size / 10) + "px " : "0 ") + Math.floor(size / 10) + "px 0;";
                    const decoration = type.match(/canvas/) ? "canvas" : url ? "static" : "";
                    const classes = "__capturables_item__" + (decoration && " __capturables_type_" + decoration + "__");
                    const style = pos + font_style(size) + display + radius;
                    html.push("<div " + attr("class", classes) + attr("style", style) + attr("type", type) + attr("sourceid", sourceId) + attr("index", capturables.length) + ">");
                    const is_capturing = capture.findByType(type, object, sourceId) ? '<span style="color:var(--color-capturing)">*</span>' : "";
                    const is_valid = width && height;
                    const resolution = is_valid ? width + "x" + height : url ? "static" : prohibited ? i18n_messages["prohibited"] : "(no-size)";
                    html.push(is_capturing + resolution);
                    if (is_valid && (type === "canvas" || type === "video")) {
                        html.push('<span class="__capturables_alt__" style="' + font_style(halfSize) + '"> wait 5 sec</span>');
                    }
                    html.push('<span class="__capturables_caption__">' + caption + "</span>");
                    html.push("</div>");
                    attributes.position = position;
                    object.type = type;
                    capturables.push({
                        object: object,
                        type: type,
                        attributes: attributes
                    });
                } catch (e) {
                    console.log(...logGenF(my.frameId, "error on append()"));
                    console.trace(e);
                }
            };
            const append_fixed = (object, type, attributes) => {
                if (item_doms.indexOf(object) === -1) item_doms.push(object);
                const {width: width, height: height, caption: caption = ""} = attributes;
                const rect = object;
                const pos = "right:0px;top:0px;";
                const size = Math.min(50, Math.max(16, rect.width * 16 / 100));
                const halfSize = Math.min(25, Math.max(12, size / 2));
                const radius = "border-radius: 0 0 0 " + Math.floor(size / 10) + "px;";
                const is_capturing = capture.findByType(type, object) ? '<span style="color:var(--color-capturing)">*</span>' : "";
                html.push('<div class="__capturables_item__" style="position:fixed;' + pos + font_style(size) + radius + '" index="' + capturables.length + '" type="' + type + '">');
                html.push(is_capturing + width + "x" + height);
                html.push('<span class="__capturables_alt__" style="' + font_style(halfSize) + '"> wait 5 sec</span>');
                html.push('<span style="padding:0 12px 0 0"></span>');
                html.push("</div>");
                attributes.position = null;
                capturables.push({
                    object: object,
                    type: type,
                    attributes: attributes
                });
                html.push('<div class="__capturables_option__" style="font-size:20px;line-height:30px;padding:0 10px 0 10px" onselectstart="return false">');
                html.push('<div class="__codec__" style="width:50%;text-align:left;display:inline-block"></div>');
                html.push('<div class="__layer__" style="width:50%;text-align:right;display:inline-block"></div>');
                html.push("</div>");
                html.push('<div class="__capturables_item__ __capturables_desktop__" style="position:fixed;right:-4px;top:0px;width:' + size * .6 + "px;height:0px;font-size:" + size * .8 + "px;line-height:" + size * .8 + 'px" index="' + capturables.length + '" type="desktop">+</div>');
                object = structuredClone(object);
                object.type = "desktop";
                capturables.push({
                    object: object,
                    type: "desktop",
                    attributes: {}
                });
            };
            const show_settings = layer => {
                const btn = (root, group, label, value, on_click, temporal) => {
                    const cpt_group = "cpt_" + group;
                    const d = document.createElement("span");
                    d.innerText = label;
                    d.style = "margin:0 10px 0 10px";
                    d.classList.add(cpt_group);
                    if (value !== undefined) {
                        d.addEventListener("click", (() => {
                            const v = typeof value === "boolean" ? !d.classList.contains("active") : value;
                            for (const item of root.querySelectorAll("." + cpt_group)) item.classList[v && item === d ? "add" : "remove"]("active");
                            if (!temporal) {
                                settings[group] = v;
                                localStorageProxy[globals.uuid] = JSON.stringify(settings);
                            }
                            if (on_click) on_click(group, v);
                        }));
                        if (temporal) {
                            if (value) d.classList[value ? "add" : "remove"]("active");
                        } else {
                            d.classList[settings[group] === value ? "add" : "remove"]("active");
                        }
                    }
                    root.appendChild(d);
                };
                const toggle_layer = (type, value) => {
                    sendMessageToSW({
                        cmd: CMD_CRtoBtoCA_TOGGLE_LAYER,
                        params: {
                            type: type,
                            value: value
                        }
                    });
                };
                const enable_worker_injection = (type, value) => {
                    sendMessageToSW({
                        cmd: CMD_CtoB_REQUEST_RELOAD_WITHOUT_CSP,
                        params: {
                            worker_injection: worker_injection
                        }
                    });
                };
                const setting_codec = layer.querySelector(".__codec__");
                const setting_layer = layer.querySelector(".__layer__");
                btn(setting_codec, "codec", "H264", "h264");
                btn(setting_codec, "codec", "VP8", "vp8");
                btn(setting_codec, "codec", "VP9", "vp9");
                btn(setting_codec, "label", "/");
                btn(setting_codec, "quality", "Low", 1);
                btn(setting_codec, "quality", "Mid", 2);
                btn(setting_codec, "quality", "High", 3);
                btn(setting_layer, "video", "Video", true, toggle_layer);
                btn(setting_layer, "canvas", "Canvas", true, toggle_layer);
                btn(setting_layer, "mediasource", "MediaSource", true, toggle_layer);
                btn(setting_layer, "none", "MS+", worker_injection, enable_worker_injection, true);
            };
            const append_as_static = video => {
                const sources = video.querySelectorAll("source");
                const url = video.src || video.currentSrc || sources[0]?.src || "";
                if (url.startsWith("http")) {
                    const width = video.videoWidth || 0;
                    const height = video.videoHeight || 0;
                    append(video, "video", {
                        url: url,
                        width: width,
                        height: height,
                        caption: ".static"
                    });
                }
            };
            if (RUN_ON_ROOT_DOCUMENT_ONLY) {
                const {width: width, height: height} = tab_object;
                const capture_size = shrink(width, height, globals.tab.p) || fit(width, height, globals.tab.w, globals.tab.h);
                const [cw, ch] = capture_size;
                append_fixed(tab_object, "tab", {
                    width: cw,
                    height: ch
                });
                window.addEventListener("resize", on_window_resize);
            }
            update_document_roots();
            const injection_bridge = document.getElementById(globals.uuid);
            if (_LOG_) console.log(...logGenF(my.frameId, "overlay::document_roots", "", document_roots));
            for (const root of document_roots) {
                let retry_count = 0;
                const videos = root.querySelectorAll("video");
                for (let n = 0; n < videos.length; n++) {
                    const v = videos[n];
                    const preload = v.getAttribute("preload");
                    if (preload === "none") {
                        v.setAttribute("preload", "metadata");
                        await timeout(300);
                    }
                    try {
                        const stream = v.captureStream();
                        const {videoWidth: videoWidth = 0, videoHeight: videoHeight = 0, duration: duration} = v;
                        if (duration) {
                            append(v, "video", {
                                width: videoWidth,
                                height: videoHeight
                            });
                            append_as_static(v);
                            const mediaSourceId = Number(v.getAttribute("mediasource"));
                            if (mediaSourceId && injection_bridge) {
                                const expired = expiredMediaSources[mediaSourceId];
                                append(v, "mediasource", {
                                    width: videoWidth,
                                    height: videoHeight,
                                    sourceId: mediaSourceId,
                                    caption: ".MS" + (expired ? ",expired" : "") + "",
                                    expired: expired
                                });
                            }
                        }
                    } catch (e) {
                        if (_LOG_) console.log(...logGenF(my.frameId, "capture error", e.message));
                        if (e.message.includes("origin")) {
                            append_as_static(v);
                        } else {
                            append(v, "video", {
                                width: 0,
                                height: 0,
                                expired: true,
                                prohibited: true
                            });
                        }
                    }
                }
                const canvases = root.querySelectorAll("canvas");
                for (const c of canvases) {
                    const {width: width, height: height} = c;
                    if (width >= 100 && height >= 100) {
                        append(c, "canvas", {
                            width: width,
                            height: height
                        });
                    }
                }
            }
            layer = document.createElement("div");
            layer.innerHTML = html.join("");
            document.body.appendChild(layer);
            layer.addEventListener("click", (async evt => {
                const {target: target, shiftKey: shiftKey, ctrlKey: ctrlKey, altKey: altKey} = evt;
                if (!target.classList.contains("__capturables_item__")) return;
                const expired = target.getAttribute("expired");
                if (expired) {
                    show_info(i18n_messages["mediasource_expired"], "error");
                    return;
                }
                const index = target.getAttribute("index");
                const item = capturables[Number(index)];
                if (item.attributes.url) {
                    const url = item.attributes.url;
                    const suffix = (FIND_SUFFIX_REGEXP.exec(url) || [])[1] || "mp4";
                    const filename = document.title + "." + suffix;
                    await sendMessageToSW({
                        cmd: CMD_CtoB_DIRECT_DOWNLOAD,
                        params: {
                            url: url,
                            filename: filename
                        }
                    });
                    download_static_file(url);
                    return;
                }
                if (item.attributes.prohibited) {
                    const url = [ serverPath, langPath, loaderFilePath, "?sid=", hash(location.hostname || "blank"), "#prohibited" ].join("");
                    sendMessageToSW({
                        cmd: CMD_CtoB_OPEN_URL,
                        params: {
                            url: url
                        }
                    });
                    return;
                }
                if (item && !item.attributes.expired) {
                    if (capture.findByType(item.type, item.object, item.attributes?.sourceId)) {
                        show_info(i18n_messages["already_capturing"], "error");
                    } else {
                        capture.start(item, {
                            shiftKey: shiftKey,
                            ctrlKey: ctrlKey,
                            altKey: altKey
                        });
                        sendMessageToSW({
                            cmd: CMD_CFtoB_START_CAPTURE,
                            params: {}
                        });
                    }
                }
                evt.stopPropagation();
            }));
            if (RUN_ON_ROOT_DOCUMENT_ONLY) {
                show_settings(layer);
            }
        };
        const off = () => {
            if (current === "off") return;
            current = "off";
            capturables = [];
            if (layer) {
                document.body.removeChild(layer);
                layer = null;
            }
            if (RUN_ON_ROOT_DOCUMENT_ONLY) {
                window.removeEventListener("resize", on_window_resize);
            }
        };
        return {
            on: on,
            off: off,
            state: state
        };
    })();
    const check_state = () => {
        if (tabStatus.n % 10 === 0) update_document_roots();
        tabStatus.n++;
        const stat = {
            video: false,
            canvas: false,
            mediasource: false
        };
        const injection_bridge = document.getElementById(globals.uuid);
        for (const root of document_roots) {
            for (const v of root.querySelectorAll("video")) {
                stat.video = true;
                const mediaSourceId = Number(v.getAttribute("mediasource"));
                if (mediaSourceId && mediaSourceId > latestSourceId && injection_bridge) {
                    const expired = expiredMediaSources[mediaSourceId];
                    if (!expired) {
                        stat.mediasource = true;
                    }
                    latestSourceId = mediaSourceId;
                }
            }
            for (const c of root.querySelectorAll("canvas")) {
                const {width: width, height: height} = c;
                if (width >= 100 && height >= 100) {
                    stat.canvas = true;
                }
            }
        }
        if (stat.video !== tabStatus.video || stat.canvas !== tabStatus.canvas || stat.mediasource !== tabStatus.mediasource) {
            const changed_mediasource_state = stat.mediasource !== tabStatus.mediasource;
            Object.assign(tabStatus, stat);
            if (changed_mediasource_state) {
                sendMessageToSW({
                    cmd: CMD_CFtoB_NOTIFY_TAB_STATE,
                    params: {
                        tabStatus: tabStatus
                    }
                });
                if (worker_injection && !auto_toggled) {
                    setTimeout((() => {
                        sendMessageToSW({
                            cmd: CMD_CRtoB_TOGGLE_OVERLAY,
                            params: {}
                        });
                    }), 1e3);
                    auto_toggled = true;
                }
            }
        }
    };
    const started_by_event = () => {
        document.removeEventListener("DOMContentLoaded", started_by_event);
        window.removeEventListener("load", started_by_event);
        on_domcontentloaded();
    };
    if (document.readyState !== "loading") {
        setTimeout(on_domcontentloaded, 1);
    } else {
        document.addEventListener("DOMContentLoaded", started_by_event);
        window.addEventListener("load", started_by_event);
    }
})();