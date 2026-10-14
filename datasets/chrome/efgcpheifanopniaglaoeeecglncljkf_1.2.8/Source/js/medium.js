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
    const _LOG_ = localStorage.CPT_LOG || localStorage.cpt_log;
    const i18n_messages = prepare_i18n_messages();
    const sendMessageToSW = async msg => sendMessage(MESSAGE_TYPE_TO_SERVICEWORKER, msg, "medium");
    const sendMessageToOffscreen = async msg => sendMessage(MESSAGE_TYPE_TO_OFFSCREEN, msg, "medium");
    const sId = location.href.startsWith("http") ? new URL(location.href).searchParams.get("sid") || "none" : "none";
    const my = {
        tabId: -1,
        root: {
            window: null,
            rootId: -1,
            frameId: -1,
            itemId: -1,
            sourceType: "",
            w: 0,
            h: 0,
            origin: "",
            domain: "",
            url: "",
            title: "",
            settings: {}
        }
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
    const doc = {};
    let recorder = null;
    const bridges = {};
    const generateBridge = item => {
        let sourceId = Number(item.getAttribute("sourceid")) || 0;
        const sourceType = item.getAttribute("sourcetype");
        const doc = {};
        for (const d of item.querySelectorAll("[class]")) d.classList.forEach((c => {
            if (!doc[c]) doc[c] = d;
        }));
        doc.__root__ = item;
        let muted = false;
        let downloadId = undefined;
        let state = STATE_LOADING;
        if (recorder) recorder.addEventListener("stop", on_stopped);
        doc.stopButton.addEventListener("click", (() => {
            if (doc.__root__.classList.contains("_complete")) {
                on_stopped();
            } else {
                doc.stopButton.classList.add("loading");
                if (sourceType.match(/video|canvas|mediasource/)) {
                    const root = my?.root?.window;
                    if (root && !root.closed) {
                        const {rootId: rootId, frameId: frameId, itemId: itemId, origin: origin} = my.root;
                        root.postMessage({
                            cmd: CMD_MtoCF_REQUEST_STOP_CAPTURE,
                            params: {
                                rootId: rootId,
                                frameId: frameId,
                                itemId: itemId
                            }
                        }, origin);
                    } else {
                        on_stopped();
                    }
                } else if (sourceType.match(/tab|desktop/)) {
                    if (recorder && recorder.state !== "inactive") recorder.stop();
                }
            }
        }));
        if (sourceType === "mediasource") {
            doc._boost_levels_.style.display = "inline-block";
            for (const btn of doc._boost_levels_.querySelectorAll("button")) {
                const val = Number(btn.querySelector("span").innerText);
                btn.addEventListener("click", (evt => {
                    changePlaybackSpeed(val);
                    for (const tmp of doc._boost_levels_.querySelectorAll("button")) tmp.classList[tmp == btn ? "add" : "remove"]("active");
                }));
            }
        }
        doc.mute.addEventListener("click", (() => {
            muted = !muted;
            changeMuteState();
            const p = muted ? [ "svgcolor_action", "svgcolor_gray" ] : [ "svgcolor_gray", "svgcolor_action" ];
            doc.mute.classList.add(...p);
        }));
        doc.mimetypes.addEventListener("click", (evt => {
            if (!doc.__root__.classList.contains("_complete")) {
                if (sourceType.match(/mediasource/)) {
                    const root = my?.root?.window;
                    if (root && !root.closed) {
                        const bufferId = evt.target.getAttribute("bufferid");
                        console.log(evt.target);
                        console.log(bufferId);
                        if (bufferId) {
                            const {rootId: rootId, frameId: frameId, itemId: itemId, origin: origin} = my.root;
                            root.postMessage({
                                cmd: CMD_MtoCFtoI_REQUEST_CLEAR_BUFFER,
                                params: {
                                    rootId: rootId,
                                    frameId: frameId,
                                    itemId: itemId,
                                    bufferId: bufferId
                                }
                            }, origin);
                        }
                    }
                }
            }
        }));
        doc.as402_checkbox.checked = globals.domain.as402 === undefined || globals.domain.as402;
        doc.as402_checkbox.addEventListener("click", (() => {
            globals.domain.as402 = doc.as402_checkbox.checked;
            saveDomainSettings();
        }));
        doc.openFile.addEventListener("click", (async () => {
            if (downloadId) {
                await sendMessageToSW({
                    cmd: CMD_MtoB_SHOW_DOWNLOAD_FILE,
                    params: {
                        downloadId: downloadId
                    }
                });
            }
        }));
        const transporter = doc.command_transporter;
        transporter.addEventListener("click", (async () => {
            const cmd = transporter.getAttribute("cmd");
            const params = JSON.parse(transporter.getAttribute("params") || "{}");
            if (cmd === "download") {
                const {url: url, suffix: suffix} = params;
                if (url && url.startsWith("blob")) {
                    const time_string = (new Date).toLocaleString().replace(/ /g, "_").replace(/[\/\:]/g, "-");
                    let title = my.root.title?.substr(0, 256).replace(new RegExp(/[\ud800-\ud8ff][\ud000-\udfff]/g), "");
                    if (!title || title.length === 0 || sourceType === "desktop") {
                        title = time_string + "_" + sourceType;
                    } else {
                        if (sourceType === "tab") {
                            title = title + "_" + time_string;
                        }
                    }
                    const filename_candidates = [ (title + "." + suffix).trim().replace(/(^[\.\/])|[\"\*\:\<\>\?\\\|\~]|(\.\/|\/\.)|([\.\/]$)/g, "_").replace(/\//g, "_") ];
                    for (const filename of filename_candidates) {
                        const result = await sendMessageToSW({
                            cmd: CMD_MtoB_DELEGATE_DOWNLOAD_BLOBURL,
                            params: {
                                url: url,
                                filename: filename,
                                sourceId: sourceId
                            }
                        });
                        const {error: error} = result;
                        if (error) {
                            force_save_file(url, filename);
                            document.getElementById("globalinfo").innerText = error;
                            doc.saveButton.classList.remove("loading");
                        } else {
                            downloadId = result.downloadId;
                        }
                        if (_LOG_) console.log(...logGen("item", "error@CMD_MtoB_DELEGATE_DOWNLOAD_BLOBURL", error + ' , filename="' + filename));
                    }
                    URL.revokeObjectURL(url);
                }
            } else if (cmd === "changeSourceId") {
                const {curSourceId: curSourceId, prevSourceId: prevSourceId} = params;
                delete bridges[prevSourceId];
                sourceId = curSourceId;
                bridges[curSourceId] = {
                    on_stopped: on_stopped,
                    on_download_complete: on_download_complete
                };
            } else if (cmd === "remove") {
                const {sourceId: sourceId} = params;
                delete bridges[sourceId];
            } else if (cmd === "revive") {
                const {sourceId: sourceId} = params;
                revive();
            }
        }));
        const changePlaybackSpeed = speed => {
            if (sourceType === "mediasource") {
                const root = my?.root?.window;
                if (root && !root.closed) {
                    const {rootId: rootId, frameId: frameId, itemId: itemId, origin: origin} = my.root;
                    root.postMessage({
                        cmd: CMD_MtoCF_REQUEST_CHANGE_PLAYBACK_SPEED,
                        params: {
                            rootId: rootId,
                            frameId: frameId,
                            itemId: itemId,
                            speed: speed
                        }
                    }, origin);
                }
            }
        };
        const changeMuteState = () => {
            if (sourceType === "mediasource") {
                const root = my?.root?.window;
                if (root && !root.closed) {
                    const {rootId: rootId, frameId: frameId, itemId: itemId, origin: origin} = my.root;
                    root.postMessage({
                        cmd: CMD_MtoCF_REQUEST_TOGGLE_MUTE,
                        params: {
                            rootId: rootId,
                            frameId: frameId,
                            itemId: itemId,
                            muted: muted
                        }
                    }, origin);
                }
            }
        };
        const showMessage = (text, color) => {
            doc.errorLabel.style.display = "block";
            doc.errorLabel.innerText = text;
            if (color) doc.errorLabel.style.color = color;
        };
        const revive = () => {
            const {show: show, hide: hide, setclass: setclass} = dom_syntactic_sugar();
            const {forceRenderLink: forceRenderLink, stopButton: stopButton, saveButton: saveButton, progress: progress} = doc;
            show(forceRenderLink);
            show(stopButton);
            hide(saveButton);
            setclass(doc.__root__, null, "_complete");
            this.state = STATE_LOADING;
        };
        function on_stopped(evt) {
            const reason = "";
            const {rootId: rootId} = my.root;
            const {show: show, hide: hide, setclass: setclass} = dom_syntactic_sugar();
            const {forceRenderLink: forceRenderLink, stopButton: stopButton, saveButton: saveButton, progress: progress} = doc;
            hide(forceRenderLink);
            hide(stopButton);
            show(saveButton);
            if (doc.__root__.classList.contains("_complete")) {} else {
                setclass(doc.__root__, "_complete");
                sendMessageToSW({
                    cmd: CMD_MtoB_NOTIFY_STOPPED,
                    params: {
                        rootId: rootId
                    }
                });
            }
            setTimeout((() => {
                document.title = i18n_messages["complete"];
                document.querySelector('link[rel="icon"]').href = serverList[serverId] + "image/icon_complete_64.png";
            }), 100);
            this.state = STATE_COMPLETE;
            if (_LOG_) console.log(...logGen("item", "stopped", reason));
        }
        const on_download_complete = error => {
            doc.saveButton.classList.remove("loading");
            doc.progress.removeAttribute("value");
            if (error) {
                showMessage("Fatal error occurred at the end of the download: " + (error.current || error), "#f00");
            } else if (ENABLE_SHOW_FILE) {
                doc.openFileContainer.style.width = "60px";
                setTimeout((() => {
                    doc.openFileContainer.style.opacity = "1.0";
                    doc.openFile.style.display = "inline";
                }), 500);
            }
        };
        const force_save_file = (url, filename) => {
            const a = document.createElement("a");
            a.download = filename;
            a.href = url;
            const mouseEvent = new MouseEvent("click");
            a.dispatchEvent(mouseEvent);
            showMessage("Attempted to force save to avoid error.");
        };
        bridges[sourceId] = {
            on_stopped: on_stopped,
            on_download_complete: on_download_complete
        };
    };
    const observe = () => {
        const target = document.getElementById("items");
        const observer = new MutationObserver((records => {
            for (const record of records) {
                const {type: type, target: target} = record;
                if (type === "childList") {
                    const {addedNodes: addedNodes, removedNodes: removedNodes} = record;
                    for (let n = 0; n < addedNodes.length; n++) {
                        const item = addedNodes[n];
                        generateBridge(item);
                    }
                }
            }
        }));
        observer.observe(target, {
            childList: true
        });
    };
    const WebExtension_Runtime_onMessage = (message, sender, sendResponse) => {
        const {cmd: cmd, params: params} = message;
        if (_LOG_) {
            console.log(...logGen("medium", cmd.toUpperCase(), JSON.stringify(params)));
        }
        if (cmd === CMD_BtoM_NOTIFY_DISCONNECT_OPPOSITE) {
            my.root.window = null;
            const type = my?.root?.sourceType || "";
            if (!type.match(/tab|desktop/)) {
                for (const sourceId in bridges) {
                    const item = bridges[sourceId];
                    item.on_stopped();
                }
            }
            return sendResponse({
                result: true
            });
        } else if (cmd === CMD_BtoM_NOTIFY_DOWNLOAD_COMPLETED) {
            const {downloadId: downloadId, sourceId: sourceId, error: error} = params;
            const item = bridges[sourceId];
            if (item) {
                item.on_download_complete(error);
            }
            return sendResponse({
                result: true
            });
        } else if (cmd === CMD_CFtoBtoM_TRANSFER_FOR_NOOPENER) {
            if (!my.root.window) {
                my.root.window = {
                    closed: false,
                    postMessage: async message => await sendMessageToSW({
                        cmd: CMD_MtoBtoCF_TRANSFER_FOR_NOOPENER,
                        params: {
                            tabId: my.root.rootId,
                            message: message
                        }
                    })
                };
                document.getElementById("globalinfo").innerText = "FYI: MS+ mode runs with lower load.";
            }
            if (params.cmd === CMD_CFtoP_SEND_FRAGMENT || params.cmd === CMD_MtoP_SEND_FRAGMENT) {
                const {cmd: cmd, params: params} = message.params;
                const chunks = params.chunks;
                const transfer = [];
                for (const c of chunks) {
                    if (c.chunk) {
                        c.chunk = new Uint8Array(c.chunk).buffer;
                        transfer.push(c.chunk);
                    }
                }
                window.postMessage({
                    cmd: cmd,
                    params: params
                }, location.origin, transfer);
            } else {
                window_onMessage({
                    data: params,
                    origin: null,
                    source: null
                });
            }
            return sendResponse({
                result: true
            });
        }
        if (_LOG_) console.error("must not reach here", ...logGen("medium", cmd.toUpperCase(), JSON.stringify(params)));
    };
    const window_onMessage = async evt => {
        const {data: data, origin: origin, source: source} = evt;
        if (!my.root.window) {
            my.root.window = source;
        }
        const {cmd: cmd, params: params} = data;
        if (cmd === CMD_CFtoM_SEND_AUDIO_BUFFER) {
            const {input: input} = params;
            const p = input?.sampleRate ? input : {
                numberOfChannels: input.length,
                length: input[0].length,
                sampleRate: undefined,
                data: input
            };
            for (let ch = 0; ch < p.numberOfChannels; ch++) {
                const d = Array(p.length);
                for (let n = 0; n < p.length; n++) d[n] = p.data[ch][n];
                p.data[ch] = d;
            }
            sendMessageToOffscreen({
                cmd: CMD_MtoO_SEND_AUDIO_BUFFER,
                params: p
            });
        } else if (cmd === CMD_CFtoM_REQUEST_START_CAPTURE) {
            const {frameId: frameId, itemId: itemId, cancel: cancel} = params;
            signal(frameId + "x" + itemId, cancel ? -1 : 0);
        } else if (cmd === CMD_CFtoM_NOTIFY_STOP_CAPTURE) {
            const {reason: reason, sourceId: sourceId} = params;
            const item = bridges[sourceId];
            if (item) item.on_stopped('stop has notified from content: "' + reason + '"');
        }
    };
    window.addEventListener("message", window_onMessage);
    WebExtensions.runtime.onMessage.addListener(WebExtension_Runtime_onMessage);
    document.addEventListener("DOMContentLoaded", (async () => {
        if (_LOG_) console.log(...logGen("medium", manifest.name, "version: " + manifest.version + ", start at " + Date.now()));
        const remoteConfig = localStorage.CPT_REMOTE_CONFIG || "";
        const result = await sendMessageToSW({
            cmd: CMD_MtoB_NOTIFY_START,
            params: {
                url: location.href,
                remoteConfig: remoteConfig
            }
        });
        if (result.error) {
            if (_LOG_) console.log(...logGen("medium", "CMD_MtoB_NOTIFY_START", result.error));
            return;
        }
        if (_LOG_) console.log(...logGen("medium", "CMD_MtoB_NOTIFY_START", JSON.stringify(result)));
        start(result);
    }));
    const start = async params => {
        const {yourinfo: yourinfo, settings: settings, error: error} = params;
        Object.assign(my, yourinfo);
        Object.assign(globals, settings);
        for (const key of [ "uuid", "counter", "version" ]) localStorage["capturables_" + key] = globals[key];
        if (_LOG_) {
            console.log(...logGen("medium", "usableAPI", Object.keys(chrome)));
            console.log(...logGen("medium", "globals", globals));
            console.log(...logGen("medium", "myself", my));
            console.log(...logGen("medium", "constant", {
                CAPTURE_PERIOD: CAPTURE_PERIOD,
                KEEP_ALIVE: KEEP_ALIVE
            }));
        }
        my.root.domain = my.root.origin?.match(/[^\/]+$/)[0] || "unkown";
        loadDomainSettings();
        observe();
        const {rootId: rootId, frameId: frameId, itemId: itemId, sourceType: sourceType, w: w, h: h, waiting: waiting} = my.root;
        for (const d of document.querySelectorAll("[id]")) doc[d.id] = d;
        doc.version.innerText = "ver " + globals.version;
        doc.titleLabel.innerText = trim(my.root.title, 60, true);
        doc.titleLink.addEventListener("click", (async () => {
            await sendMessageToSW({
                cmd: CMD_MtoB_CHANGE_ACTIVE_TAB,
                params: {
                    targetId: rootId,
                    url: my.root.url
                }
            });
        }));
        doc.openFolder.addEventListener("click", (async () => {
            await sendMessageToSW({
                cmd: CMD_MtoB_OPEN_DOWNLOAD_FOLDER,
                params: {}
            });
        }));
        const UI_COLOR_OFF = "#999";
        const UI_COLOR_ON = "var(--color-action)";
        let _SAFE_CLOSE_ = false;
        const safeclose_func = async evt => {
            evt.preventDefault();
            evt.returnValue = "";
        };
        doc.safeclose.addEventListener("click", (async () => {
            _SAFE_CLOSE_ = !_SAFE_CLOSE_;
            doc.safeclose.style.color = _SAFE_CLOSE_ ? UI_COLOR_ON : UI_COLOR_OFF;
            window[(_SAFE_CLOSE_ ? "add" : "remove") + "EventListener"]("beforeunload", safeclose_func);
        }));
        doc.safeclose.style.color = _SAFE_CLOSE_ ? UI_COLOR_ON : UI_COLOR_OFF;
        if (sourceType === "mediasource") {
            const SVG_COLOR_ON = "svgcolor_action";
            const SVG_COLOR_OFF = "svgcolor_gray";
            let {CIJ: _STACK_, NAL: _MULTI_} = JSON.parse(localStorage[sId] || "null") || MEDIUM_DOMAIN_SETTING_DEFAULT;
            doc.option.style.display = "inline";
            const update_options = save => {
                doc.stack.style.color = _STACK_ ? UI_COLOR_ON : UI_COLOR_OFF;
                doc.stack.classList.add(_STACK_ ? SVG_COLOR_ON : SVG_COLOR_OFF);
                doc.stack.classList.remove(_STACK_ ? SVG_COLOR_OFF : SVG_COLOR_ON);
                doc.multiRes.style.color = _MULTI_ ? UI_COLOR_ON : UI_COLOR_OFF;
                doc.multiRes.classList.add(_MULTI_ ? SVG_COLOR_ON : SVG_COLOR_OFF);
                doc.multiRes.classList.remove(_MULTI_ ? SVG_COLOR_OFF : SVG_COLOR_ON);
                if (save) localStorage[sId] = JSON.stringify({
                    CIJ: _STACK_,
                    NAL: _MULTI_
                });
            };
            doc.stack.addEventListener("click", (() => {
                _STACK_ = !_STACK_;
                update_options(true);
            }));
            doc.multiRes.addEventListener("click", (() => {
                _MULTI_ = !_MULTI_;
                update_options(true);
            }));
            update_options();
        }
        if (sourceType.match(/(video|canvas|tab|desktop)/)) {
            if (waiting) {
                const result = await signal_with_timeout(frameId + "x" + itemId, 8 * 60 * 60 * 1e3);
                if (!result || result === -1) return;
            }
            if (sourceType.match(/(canvas|tab|desktop)/)) {
                const {streamId: streamId, options: options, error: error} = await sendMessageToSW({
                    cmd: CMD_MtoB_REQUEST_MEDIASTREAM_ID,
                    params: {
                        rootId: rootId,
                        frameId: frameId,
                        sourceType: sourceType
                    }
                });
                if (error) {
                    if (_LOG_) console.log("error on", CMD_MtoB_REQUEST_MEDIASTREAM_ID, error);
                    return;
                } else if (sourceType.match(/(tab|desktop)/)) {
                    const capture_size = shrink(w, h, globals.tab.p) || fit(w, h, globals.tab.w, globals.tab.h);
                    const streamOptions = Object.assign({
                        w: capture_size[0],
                        h: capture_size[1]
                    }, options);
                    recorder = await capture(sourceType, streamId, streamOptions);
                }
            }
        }
    };
    const loadDomainSettings = () => {
        if (my.root.domain) {
            globals.domain = JSON.parse(localStorage["capturables_domain_" + my.root.domain] || "{}");
        }
    };
    const saveDomainSettings = () => {
        if (my.root.domain) {
            localStorage["capturables_domain_" + my.root.domain] = JSON.stringify(globals.domain);
        }
    };
    const capture = async (type, streamId, streamOptions) => {
        if (!streamId) return {};
        let transferCount = 0;
        const creationTime = now() / 1e3;
        const elapsedTime = () => now() / 1e3 - creationTime;
        const {w: w, h: h} = streamOptions;
        if (_LOG_) console.log(...logGen("item", "request capture", {
            type: type,
            w: w,
            h: h,
            streamId: streamId
        }));
        const constrain = {
            video: {
                mandatory: {
                    chromeMediaSource: type,
                    chromeMediaSourceId: streamId
                }
            },
            audio: {
                mandatory: {
                    chromeMediaSource: type,
                    chromeMediaSourceId: streamId
                }
            }
        };
        if (type === "tab") {
            Object.assign(constrain.video.mandatory, {
                minHeight: h,
                maxHeight: h,
                minWidth: w,
                maxWidth: w
            });
        }
        const stream = await navigator.mediaDevices.getUserMedia(constrain);
        if (type === "tab") {
            const c = new AudioContext;
            const s = c.createMediaStreamSource(stream);
            s.connect(c.destination);
        }
        const {settings: settings} = my.root;
        const quality = Math.min(Math.max(1, settings.quality), 5);
        const videoBitsPerSecond = Math.max(Math.floor(quality * 3640 * Math.sqrt(w * h)), 5e5);
        const codec = /h264|vp8|vp9/.test(settings.codec) ? settings.codec : "h264";
        const mimeType = "video/webm;codecs=" + codec + ",opus";
        if (_LOG_) console.log(...logGen("item", "start capture", {
            type: type,
            w: w,
            h: h,
            quality: quality,
            videoBitsPerSecond: videoBitsPerSecond,
            codec: codec
        }));
        const recorder = new MediaRecorder(stream, {
            mimeType: mimeType,
            videoBitsPerSecond: videoBitsPerSecond
        });
        recorder.addEventListener("dataavailable", (async evt => {
            if (evt.data.size > 0) {
                const chunk = await evt.data.arrayBuffer();
                const chunkId = ++transferCount;
                const {rootId: rootId, frameId: frameId, itemId: itemId} = my.root;
                const timeRanges = [ {
                    start: 0,
                    end: elapsedTime()
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
                    rootId: rootId,
                    frameId: frameId,
                    itemId: itemId,
                    sourceId: 1,
                    chunks: chunks
                };
                window.postMessage({
                    cmd: CMD_MtoP_SEND_FRAGMENT,
                    params: params
                }, location.origin, [ chunk ]);
            }
        }));
        recorder.addEventListener("stop", (evt => {
            close_mediastreams(stream);
        }));
        recorder.addEventListener("error", (evt => {
            console.warn(evt);
        }));
        recorder.start(type === "desktop" ? CAPTURE_PERIOD_DESKTOP : CAPTURE_PERIOD);
        return recorder;
    };
})();