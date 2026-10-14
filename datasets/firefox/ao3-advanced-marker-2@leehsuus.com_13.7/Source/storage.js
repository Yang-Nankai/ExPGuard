// storage.js - Gerenciamento de dados e API

const storage = (typeof browser !== 'undefined' ? browser.storage : chrome.storage);

// Debug flag: set true locally when troubleshooting. Default false to avoid noisy logs in production.
const DEBUG = false;

function safeLog(...args) {
    if (typeof DEBUG !== 'undefined' && DEBUG) console.log(...args);
}

function safeNotify(message) {
    // Prefer in-UI toast when available, otherwise remain silent in production
    try {
        if (window && window.ui && typeof window.ui.showToast === 'function') {
            window.ui.showToast(message);
            return;
        }
    } catch (e) {
        // ignore
    }
    if (typeof DEBUG !== 'undefined' && DEBUG) {
        try { alert(message); } catch (e) { console.log('[AO3 Notify]', message); }
    }
}

// Keys (canonical names)
const API_KEY_STORE = 'jsonbin_api_key';
const BIN_ID_STORE = 'jsonbin_bin_id';
const REVIEW_BIN_ID_STORE = 'jsonbin_review_bin_id';
const AUTO_BACKUP_STORE = 'auto_backup_enabled';
const LAST_BACKUP_TIMESTAMP = 'last_backup_timestamp';
const PENDING_BOOKMARKS_KEY = 'ao3_pending_bookmarks';
const STATS_CONFIG_KEY = 'ao3_stats_config';
const STATS_LOG_KEY = 'ao3_reading_log';
const STATS_SNAPSHOTS_KEY = 'ao3_stats_snapshots';

// Cloud provider selection keys
const STORAGE_PROVIDER_KEY = 'storage_provider';    // 'jsonbin' | 'googledrive'
const BOOKS_STATS_ENABLED_KEY = 'books_stats_enabled'; // boolean (PRO + Google-gated)

const COLOR_READ_KEY = 'custom_color_read';
const COLOR_UPDATED_KEY = 'custom_color_updated';
const COLOR_PARTIAL_KEY = 'custom_color_partial';
const COLOR_DONOTREAD_KEY = 'custom_color_do_not_read';
const COLOR_WTR_KEY = 'custom_color_wtr';

const ENABLE_REVIEWS_KEY = 'enable_chapter_reviews';
const ENABLE_BOOKMARK_SYNC_KEY = 'enable_bookmark_sync';
const ENABLE_BOOKMARK_SORT_KEY = 'enable_bookmark_auto_sort';
const ENABLE_BOOKMARK_GROUPING_KEY = 'ao3_enable_bookmark_grouping';
const ENABLE_HIGHLIGHTS_KEY = 'ao3_enable_highlights';

// --- Infinite Scroll Keys ---
const INFINITE_SCROLL_GLOBAL_KEY = 'ao3_infinite_scroll_global';
const INFINITE_SCROLL_GENERAL_KEY = 'ao3_infinite_scroll_general';
const INFINITE_SCROLL_BOOKMARKS_KEY = 'ao3_infinite_scroll_bookmarks';

// --- WTR (Want to Read) Keys ---
const WTR_QUEUE_KEY = 'ao3_wtr_queue';
const WTR_ENABLED_KEY = 'ao3_wtr_enabled';
const WTR_SYNC_KEY = 'ao3_wtr_sync_bookmarks';
const WTR_HEADER_MENU_KEY = 'ao3_wtr_show_header_menu';
const WTR_TAG_KEY = 'ao3_wtr_tag';
const WTR_FILTER_KEY = 'wtr_filter_active';
const WTR_PENDING_KEY = 'ao3_wtr_pending';

const CHAPTER_REVIEWS_KEY = 'chapterReviews';
const CHAPTER_RATINGS_KEY = 'chapterRatings';
const READ_WORKS_KEY = 'ao3_read_works_storage';
const LAST_READ_CHAPTER_KEY = 'ao3_last_read_chapter';
const DO_NOT_READ_KEY = 'ao3_do_not_read_storage';

// Global State
let JSONBIN_API_KEY = '';
let JSONBIN_BIN_ID = '';
let JSONBIN_REVIEW_BIN_ID = '';
let API_URL = '';
let REVIEW_API_URL = '';
let AUTO_BACKUP_ENABLED = false;
let STATS_CONFIG_ENABLED = false;

let CUSTOM_COLORS = {
    READ: '#28a745',
    UPDATED: '#ffc107',
    PARTIAL: '#17a2b8',
    DONOTREAD: '#dc3545',
    WTR: '#6f42c1'
};

// --- MEMORY CACHE & DEBOUNCE ---
const memoryCache = {
    data: {},
    loaded: {}
};
const saveTimeouts = {};

// Helpers
async function loadData(key) {
    if (memoryCache.loaded[key]) {
        return memoryCache.data[key];
    }

    return new Promise((resolve) => {
        storage.local.get(key, (items) => {
            const isArrayKey = key === 'ao3_reading_log' || key === PENDING_BOOKMARKS_KEY;
            const dataString = items[key] || (isArrayKey ? '[]' : '{}');
            try {
                const parsed = JSON.parse(dataString);
                memoryCache.data[key] = parsed;
                memoryCache.loaded[key] = true;
                resolve(parsed);
            } catch (e) {
                const fallback = isArrayKey ? [] : {};
                memoryCache.data[key] = fallback;
                memoryCache.loaded[key] = true;
                resolve(fallback);
            }
        });
    });
}

async function saveData(key, data) {
    // 1. Atualiza o cache imediatamente
    memoryCache.data[key] = data;
    memoryCache.loaded[key] = true;

    // 2. Resolve a Promise imediatamente sem bloquear a UI
    return new Promise((resolve) => {
        // 3. Debounce
        if (saveTimeouts[key]) {
            clearTimeout(saveTimeouts[key]);
        }

        saveTimeouts[key] = setTimeout(() => {
            const stringified = JSON.stringify(data);
            storage.local.set({ [key]: stringified }, () => {
                delete saveTimeouts[key];
            });
        }, 1000); // 1 segundo de intervalo para acúmulo de requisições

        resolve();
    });
}

// --- GERENCIAMENTO DA FILA DE PENDÊNCIAS (RETRY QUEUE) ---
async function loadPendingBookmarks() {
    const list = await loadData(PENDING_BOOKMARKS_KEY).then(data => Array.isArray(data) ? data : []);
    const now = Date.now();
    const ONE_DAY = 24 * 60 * 60 * 1000;

    let modified = false;
    const validList = [];
    const validIds = [];

    for (const item of list) {
        const isObj = typeof item === 'object';
        const id = isObj ? item.workId : item;
        const addedAt = isObj ? item.addedAt : now;

        if (now - addedAt > ONE_DAY) {
            modified = true;
        } else {
            validList.push(isObj ? item : { workId: id, addedAt });
            validIds.push(id);
            if (!isObj) modified = true;
        }
    }

    if (modified) await saveData(PENDING_BOOKMARKS_KEY, validList);
    return validIds;
}

async function addToPendingBookmarks(workId) {
    const ids = await loadPendingBookmarks(); // this cleans up the array
    if (!ids.includes(workId)) {
        const list = await loadData(PENDING_BOOKMARKS_KEY).then(data => Array.isArray(data) ? data : []);
        list.push({ workId, addedAt: Date.now() });
        await saveData(PENDING_BOOKMARKS_KEY, list);
        safeLog(`[RetryQueue] Work ${workId} added to pending list.`);
    }
}

async function removeFromPendingBookmarks(workId) {
    const list = await loadData(PENDING_BOOKMARKS_KEY).then(data => Array.isArray(data) ? data : []);
    const newList = list.filter(item => {
        if (typeof item === 'string') return item !== workId;
        return item.workId !== workId;
    });
    if (list.length !== newList.length) {
        await saveData(PENDING_BOOKMARKS_KEY, newList);
        safeLog(`[RetryQueue] Work ${workId} removed from pending list.`);
    }
}

// --- NORMALIZAÇÃO INTELIGENTE ---
function normalizeCloudReviews(record) {
    if (!record) return {};
    if (record[CHAPTER_REVIEWS_KEY]) {
        if (typeof record[CHAPTER_REVIEWS_KEY] === 'string') {
            try { return JSON.parse(record[CHAPTER_REVIEWS_KEY]); } catch (e) { return {}; }
        }
        return record[CHAPTER_REVIEWS_KEY];
    }
    if (record['CHAPTER_REVIEWS_KEY']) {
        if (typeof record['CHAPTER_REVIEWS_KEY'] === 'string') {
            try { return JSON.parse(record['CHAPTER_REVIEWS_KEY']); } catch (e) { return {}; }
        }
        return record['CHAPTER_REVIEWS_KEY'];
    }
    const keys = Object.keys(record);
    if (keys.some(k => !isNaN(k))) {
        return record;
    }
    return {};
}

// Public Methods
const loadReadWorks = () => loadData(READ_WORKS_KEY);
const saveReadWorks = (data) => saveData(READ_WORKS_KEY, data);
const loadLastReadChapter = () => loadData(LAST_READ_CHAPTER_KEY);
const saveLastReadChapter = (data) => saveData(LAST_READ_CHAPTER_KEY, data);
const loadDoNotRead = () => loadData(DO_NOT_READ_KEY);
const saveDoNotRead = (data) => saveData(DO_NOT_READ_KEY, data);

async function loadChapterReviews() {
    const data = await storage.local.get(CHAPTER_REVIEWS_KEY);
    if (!data[CHAPTER_REVIEWS_KEY]) return {};
    try { return JSON.parse(data[CHAPTER_REVIEWS_KEY]); } catch (e) { return {}; }
}

async function saveChapterReview(workId, chapterIndex, text, meta = null, url = null) {
    const reviews = await loadChapterReviews();
    if (!reviews[workId]) reviews[workId] = {};

    if (meta) {
        if (!reviews[workId]._meta) reviews[workId]._meta = {};
        if (meta.title) reviews[workId]._meta.title = meta.title;
        if (meta.author) reviews[workId]._meta.author = meta.author;
    }

    const isTextEmpty = typeof text === 'string' ? text.trim() === '' : (!text || !text.text || text.text.trim() === '');

    if (isTextEmpty) {
        delete reviews[workId][chapterIndex];
        const hasReviews = Object.keys(reviews[workId]).some(k => k !== '_meta');
        if (!hasReviews) delete reviews[workId];
    } else {
        if (url) {
            reviews[workId][chapterIndex] = { text: typeof text === 'string' ? text : text.text, url: url };
        } else {
            reviews[workId][chapterIndex] = typeof text === 'string' ? text : text.text;
        }
    }

    await storage.local.set({ [CHAPTER_REVIEWS_KEY]: JSON.stringify(reviews) });
}

// --- CHAPTER RATINGS FUNCTIONS ---
async function loadChapterRatings() {
    const data = await storage.local.get(CHAPTER_RATINGS_KEY);
    if (!data[CHAPTER_RATINGS_KEY]) return {};
    try { return JSON.parse(data[CHAPTER_RATINGS_KEY]); } catch (e) { return {}; }
}

async function saveChapterRating(workId, chapterIndex, rating, totalChapters = null) {
    const ratings = await loadChapterRatings();
    if (!ratings[workId]) ratings[workId] = {};

    // Inicializa metadata se não existir
    if (!ratings[workId]._meta) {
        ratings[workId]._meta = { totalChapters: totalChapters || 1, globalRating: null };
    }

    // Atualiza totalChapters se fornecido
    if (totalChapters) {
        ratings[workId]._meta.totalChapters = totalChapters;
    }

    // Trata 0 como remoção (usuário limpou a avaliação)
    if (rating === null || rating === undefined || rating === '' || rating === 0) {
        // Se for global, também limpa do _meta
        if (chapterIndex === 'global' && ratings[workId]._meta) {
            ratings[workId]._meta.globalRating = null;
        }
        delete ratings[workId][chapterIndex];
    } else {
        // Se chapterIndex for 'global', salva também em _meta para referência rápida
        if (chapterIndex === 'global') {
            ratings[workId]._meta.globalRating = parseFloat(rating);
        }
        ratings[workId][chapterIndex] = parseFloat(rating);
    }

    // Limpa a obra se não houver ratings individuais e também não houver global
    const hasIndividualRatings = Object.keys(ratings[workId]).some(k => k !== '_meta');
    const hasGlobal = ratings[workId]._meta && typeof ratings[workId]._meta.globalRating === 'number';
    if (!hasIndividualRatings && !hasGlobal) {
        delete ratings[workId];
    }

    await storage.local.set({ [CHAPTER_RATINGS_KEY]: JSON.stringify(ratings) });
}

async function getWorkRating(workId) {
    const ratings = await loadChapterRatings();
    if (!ratings[workId]) return null;

    const meta = ratings[workId]._meta;
    const totalChapters = meta?.totalChapters || 1;
    const globalRating = meta?.globalRating;

    let sum = 0;
    for (let i = 1; i <= totalChapters; i++) {
        const chapterKey = i.toString();
        if (ratings[workId][chapterKey]) {
            sum += ratings[workId][chapterKey];
        } else if (globalRating) {
            // Se capítulo não tem avaliação individual, usa global
            sum += globalRating;
        }
        // Se não tem global e não tem individual, conta como 0
    }

    if (totalChapters === 0) return null;
    const average = sum / totalChapters;
    return Math.round(average * 10) / 10; // Retorna com 1 casa decimal
}

async function saveFilterState(isActive) { await storage.local.set({ filterState: isActive }); }
async function loadFilterState() { const data = await storage.local.get('filterState'); return data.filterState || false; }

async function loadCustomColors() {
    return new Promise((resolve) => {
        storage.local.get({
            [COLOR_READ_KEY]: '#28a745',
            [COLOR_UPDATED_KEY]: '#ffc107',
            [COLOR_PARTIAL_KEY]: '#17a2b8',
            [COLOR_DONOTREAD_KEY]: '#dc3545',
            [COLOR_WTR_KEY]: '#6f42c1'
        }, (items) => {
            CUSTOM_COLORS.READ = items[COLOR_READ_KEY];
            CUSTOM_COLORS.UPDATED = items[COLOR_UPDATED_KEY];
            CUSTOM_COLORS.PARTIAL = items[COLOR_PARTIAL_KEY];
            CUSTOM_COLORS.DONOTREAD = items[COLOR_DONOTREAD_KEY];
            CUSTOM_COLORS.WTR = items[COLOR_WTR_KEY];

            if (typeof document !== 'undefined') {
                document.documentElement.style.setProperty('--wtr-color', CUSTOM_COLORS.WTR);
            }
            resolve();
        });
    });
}

function checkApiCredentials() {
    if (!JSONBIN_API_KEY || !JSONBIN_BIN_ID) return false;
    return true;
}

/**
 * Returns the currently selected storage provider.
 * @returns {Promise<'jsonbin'|'googledrive'>}
 */
async function getStorageProvider() {
    return new Promise(resolve =>
        storage.local.get({ [STORAGE_PROVIDER_KEY]: 'jsonbin' }, items =>
            resolve(items[STORAGE_PROVIDER_KEY])
        )
    );
}

async function loadApiCredentials() {
    return new Promise((resolve) => {
        storage.local.get([API_KEY_STORE, BIN_ID_STORE, REVIEW_BIN_ID_STORE, AUTO_BACKUP_STORE, STATS_CONFIG_KEY], (items) => {
            if (items[API_KEY_STORE]) JSONBIN_API_KEY = items[API_KEY_STORE] || '';
            JSONBIN_BIN_ID = items[BIN_ID_STORE] || '';
            JSONBIN_REVIEW_BIN_ID = items[REVIEW_BIN_ID_STORE] || '';
            AUTO_BACKUP_ENABLED = items[AUTO_BACKUP_STORE] === true;
            if (items[STATS_CONFIG_KEY]) STATS_CONFIG_ENABLED = JSON.parse(items[STATS_CONFIG_KEY])?.enabled || false;
            if (JSONBIN_BIN_ID) API_URL = `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`;
            if (JSONBIN_REVIEW_BIN_ID) REVIEW_API_URL = `https://api.jsonbin.io/v3/b/${JSONBIN_REVIEW_BIN_ID}`;
            resolve();
        });
    });
}

function mergeReviews(local, cloud) {
    const merged = { ...cloud };
    for (const [workId, chapters] of Object.entries(local)) {
        if (!merged[workId]) merged[workId] = chapters;
        else merged[workId] = { ...merged[workId], ...chapters };
    }
    return merged;
}

async function syncDataToAPI(isAutomatic = false) {
    if (!checkApiCredentials()) return;

    const [
        readWorks,
        lastReadChapters,
        doNotReadWorks,
        chapterRatings
    ] = await Promise.all([
        loadData(READ_WORKS_KEY),
        loadData(LAST_READ_CHAPTER_KEY),
        loadData(DO_NOT_READ_KEY),
        loadChapterRatings()
    ]);

    const mainDataPayload = {
        READ_WORKS_KEY: JSON.stringify(readWorks),
        LAST_READ_CHAPTER_KEY: JSON.stringify(lastReadChapters),
        DO_NOT_READ_KEY: JSON.stringify(doNotReadWorks),
        CHAPTER_RATINGS_KEY: JSON.stringify(chapterRatings),
        timestamp: Date.now(),
        version: '4.0'
    };

    let mainUploadSuccess = false;
    let messages = [];

    // 1. Upload Principal
    try {
        const response = await fetch(API_URL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-Master-Key": JSONBIN_API_KEY,
                "X-Bin-Versioning": "false"
            },
            body: JSON.stringify(mainDataPayload)
        });

        if (response.ok) {
            mainUploadSuccess = true;
            const timestampToSave = {};
            timestampToSave[LAST_BACKUP_TIMESTAMP] = Date.now();
            storage.local.set(timestampToSave);
            if (!isAutomatic) messages.push("History Backup: Success.");
        } else {
            if (!isAutomatic) messages.push("History Backup Failed.");
        }
    } catch (error) {
        if (!isAutomatic) messages.push("History Backup: Error.");
    }

    // 2. Upload Reviews (if configured)
    if (JSONBIN_REVIEW_BIN_ID && REVIEW_API_URL) {
        try {
            const localReviews = await loadChapterReviews();
            let cloudReviews = {};
            try {
                const getRes = await fetch(REVIEW_API_URL + '/latest', {
                    method: "GET",
                    headers: { "X-Master-Key": JSONBIN_API_KEY }
                });
                if (getRes.ok) {
                    const json = await getRes.json();
                    const record = json.record;
                    cloudReviews = normalizeCloudReviews(record);
                }
            } catch (e) { /* Ignore Errors */ }

            const mergedReviews = mergeReviews(localReviews, cloudReviews);

            if (Object.keys(mergedReviews).length > 0) {
                const reviewResponse = await fetch(REVIEW_API_URL, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Master-Key": JSONBIN_API_KEY,
                        "X-Bin-Versioning": "false"
                    },
                    body: JSON.stringify({
                        [CHAPTER_REVIEWS_KEY]: JSON.stringify(mergedReviews),
                        timestamp: Date.now(),
                        version: '4.0'
                    })
                });

                if (reviewResponse.ok) {
                    reviewUploadSuccess = true;
                    if (!isAutomatic) messages.push("Reviews Backup: Success (Merged).");
                } else {
                    if (!isAutomatic) messages.push("Reviews Backup Failed.");
                }
            }
        } catch (error) {
            if (!isAutomatic) messages.push("Reviews Backup: Connection Error.");
        }
    }

    // 3. Upload Stats Data (if enabled and configured)
    if (STATS_CONFIG_ENABLED) {
        try {
            const statsConfigRaw = await loadData(STATS_CONFIG_KEY);
            const statsConfig = typeof statsConfigRaw === 'string' ? JSON.parse(statsConfigRaw) : statsConfigRaw;
            const statsBinId = statsConfig && statsConfig.statsBinId ? statsConfig.statsBinId : null;

            if (statsBinId && statsBinId.trim() !== '') {
                const [statsLog, statsSnapshots] = await Promise.all([
                    loadData(STATS_LOG_KEY),
                    loadData(STATS_SNAPSHOTS_KEY)
                ]);

                const statsPayload = {
                    [STATS_LOG_KEY]: JSON.stringify(statsLog || []),
                    [STATS_SNAPSHOTS_KEY]: JSON.stringify(statsSnapshots || {}),
                    [STATS_CONFIG_KEY]: JSON.stringify(statsConfig || {}),
                    timestamp: Date.now(),
                    type: 'AO3_EXTENSION_STATS'
                };

                const statsUrl = `https://api.jsonbin.io/v3/b/${statsBinId}`;
                const statsRes = await fetch(statsUrl, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Master-Key": JSONBIN_API_KEY,
                        "X-Bin-Versioning": "false"
                    },
                    body: JSON.stringify(statsPayload)
                });

                if (statsRes.ok) {
                    if (!isAutomatic) messages.push("Reading Stats: Success.");
                } else {
                    if (!isAutomatic) messages.push(`Reading Stats Failed (Status: ${statsRes.status}).`);
                }
            }
        } catch (error) {
            safeLog(error);
            if (!isAutomatic) messages.push("Reading Stats: Error (Check Bin ID).");
        }
    }

    if (!isAutomatic && messages.length > 0) safeNotify(messages.join('\n'));
}
async function syncDataFromAPI() {
    if (!checkApiCredentials()) return;
    if (!confirm('WARNING: Overwrite local data? This will restore History, Stats, Reviews and Ratings (if configured).')) return;

    let successCount = 0;

    // 1. DOWNLOAD PRINCIPAL (Main Bin)
    try {
        const response = await fetch(API_URL + '/latest', {
            method: "GET",
            headers: { "X-Master-Key": JSONBIN_API_KEY }
        });

        if (response.ok) {
            const json = await response.json();
            const data = json.record;

            if (data && data.READ_WORKS_KEY) {
                const dataToSave = {
                    [READ_WORKS_KEY]: data.READ_WORKS_KEY,
                    [LAST_READ_CHAPTER_KEY]: data.LAST_READ_CHAPTER_KEY,
                    [DO_NOT_READ_KEY]: data.DO_NOT_READ_KEY,
                    [CHAPTER_RATINGS_KEY]: data.CHAPTER_RATINGS_KEY || JSON.stringify({})
                };

                await storage.local.set(dataToSave);
                successCount++;
            } else {
                safeNotify('Main Bin Error: Invalid Data Structure.');
            }
        } else {
            safeNotify('Main Bin Download Failed.');
        }
    } catch (error) {
        safeNotify('Connection Error on Main Bin.');
    }

    // 2. DOWNLOAD DE STATS (Bin Separado)
    if (STATS_CONFIG_ENABLED) {
        try {
            const statsConfigRaw = await loadData(STATS_CONFIG_KEY);
            const statsConfig = typeof statsConfigRaw === 'string' ? JSON.parse(statsConfigRaw) : statsConfigRaw;
            const statsBinId = statsConfig && statsConfig.statsBinId ? statsConfig.statsBinId : null;

            if (statsBinId && statsBinId.trim() !== '') {
                const statsUrl = `https://api.jsonbin.io/v3/b/${statsBinId}/latest`;
                const statsRes = await fetch(statsUrl, {
                    method: "GET",
                    headers: { "X-Master-Key": JSONBIN_API_KEY }
                });

                if (statsRes.ok) {
                    const json = await statsRes.json();
                    const data = json.record;

                    if (data[STATS_LOG_KEY] || data[STATS_SNAPSHOTS_KEY] || data[STATS_CONFIG_KEY]) {
                        const statsToSave = {};
                        if (data[STATS_LOG_KEY]) statsToSave[STATS_LOG_KEY] = data[STATS_LOG_KEY];
                        if (data[STATS_SNAPSHOTS_KEY]) statsToSave[STATS_SNAPSHOTS_KEY] = data[STATS_SNAPSHOTS_KEY];
                        if (data[STATS_CONFIG_KEY]) statsToSave[STATS_CONFIG_KEY] = data[STATS_CONFIG_KEY];

                        await storage.local.set(statsToSave);
                        successCount++;
                    }
                }
            }
        } catch (error) {
            safeLog("Stats download skipped or failed (config missing?)", error);
        }
    }

    // 3. DOWNLOAD DE REVIEWS (Bin Separado)
    if (JSONBIN_REVIEW_BIN_ID && REVIEW_API_URL) {
        try {
            const reviewRes = await fetch(REVIEW_API_URL + '/latest', {
                method: "GET",
                headers: { "X-Master-Key": JSONBIN_API_KEY }
            });

            if (reviewRes.ok) {
                const json = await reviewRes.json();
                const data = json.record;

                let importedReviews = normalizeCloudReviews(data);

                const itemsToSave = {};
                if (Object.keys(importedReviews).length > 0) itemsToSave[CHAPTER_REVIEWS_KEY] = JSON.stringify(importedReviews);

                if (Object.keys(itemsToSave).length > 0) {
                    await storage.local.set(itemsToSave);
                    successCount++;
                }
            }
        } catch (error) {
            safeLog("Review download skipped or failed", error);
        }
    }

    if (successCount > 0) {
        safeNotify('Restore completed! Reloading page...');
        setTimeout(() => window.location.reload(), 600);
    }
}
async function checkAutomaticBackup() {
    const items = await new Promise(r => storage.local.get([AUTO_BACKUP_STORE, STORAGE_PROVIDER_KEY, LAST_BACKUP_TIMESTAMP], r));
    const isAutoBackupEnabled = items[AUTO_BACKUP_STORE] === true;
    const provider = items[STORAGE_PROVIDER_KEY] || 'jsonbin';
    const last = items[LAST_BACKUP_TIMESTAMP] || 0;

    if (!isAutoBackupEnabled) return;
    if (Date.now() - last <= 24 * 60 * 60 * 1000) return;

    if (provider === 'jsonbin') {
        if (!JSONBIN_API_KEY || !JSONBIN_BIN_ID) return;
        await syncDataToAPI(true);
    } else if (provider === 'googledrive') {
        if (window.driveSync && typeof window.driveSync.upload === 'function') {
            try {
                await window.driveSync.upload(true);
            } catch (e) {
                console.error('[AutoBackup] Google Drive automatic upload failed', e);
            }
        }
    }
}

// ============================================================
//  WTR (Want to Read) — Queue & Settings Helpers
// ============================================================

/** Load the full WTR queue object. */
const loadWTRQueue = () => loadData(WTR_QUEUE_KEY);

/** Save the full WTR queue object. */
const saveWTRQueue = (data) => saveData(WTR_QUEUE_KEY, data);

/**
 * Add a fic to the WTR queue.
 * @param {string} workId
 * @param {{title: string, author: string}} meta
 */
async function addToWTRQueue(workId, meta) {
    const queue = await loadWTRQueue();
    if (!queue[workId]) {
        queue[workId] = {
            addedAt: Date.now(),
            title: meta.title || 'Unknown Title',
            author: meta.author || 'Unknown Author',
            ao3BookmarkCreated: false
        };
        await saveWTRQueue(queue);
        safeLog(`[WTR] Added ${workId} to queue.`);
    }
}

/**
 * Remove a fic from the WTR queue.
 * @param {string} workId
 */
async function removeFromWTRQueue(workId) {
    const queue = await loadWTRQueue();
    if (queue[workId]) {
        delete queue[workId];
        await saveWTRQueue(queue);
        safeLog(`[WTR] Removed ${workId} from queue.`);
    }
}

/**
 * Returns true if the given workId is in the WTR queue.
 * @param {string} workId
 */
async function isInWTRQueue(workId) {
    const queue = await loadWTRQueue();
    return !!queue[workId];
}

/**
 * Load all WTR settings in a single storage.local.get call.
 * Returns object with enabled, syncBookmarks, showHeaderMenu, tag, filterActive.
 */
async function loadWTRSettings() {
    return new Promise((resolve) => {
        storage.local.get({
            [WTR_ENABLED_KEY]: false,
            [WTR_SYNC_KEY]: false,
            [WTR_HEADER_MENU_KEY]: true,
            [WTR_TAG_KEY]: 'AO3 Advanced Marker Want to Read',
            [WTR_FILTER_KEY]: false
        }, (items) => {
            resolve({
                enabled: !!items[WTR_ENABLED_KEY],
                syncBookmarks: !!items[WTR_SYNC_KEY],
                showHeaderMenu: !!items[WTR_HEADER_MENU_KEY],
                tag: items[WTR_TAG_KEY] || 'AO3 Advanced Marker Want to Read',
                filterActive: !!items[WTR_FILTER_KEY]
            });
        });
    });
}

/** Save WTR filter active state. */
async function saveWTRFilterState(isActive) {
    await storage.local.set({ [WTR_FILTER_KEY]: isActive });
}

// --- WTR Pending Bookmark Retry Queue ---

async function loadWTRPendingBookmarks() {
    return new Promise((resolve) => {
        storage.local.get(WTR_PENDING_KEY, (items) => {
            try {
                const data = items[WTR_PENDING_KEY];
                const list = Array.isArray(data) ? data : (data ? JSON.parse(data) : []);

                const now = Date.now();
                const ONE_DAY = 24 * 60 * 60 * 1000;
                let modified = false;
                const validList = [];
                const validIds = [];

                for (const item of list) {
                    const isObj = typeof item === 'object';
                    const id = isObj ? item.workId : item;
                    const addedAt = isObj ? item.addedAt : now;

                    if (now - addedAt > ONE_DAY) {
                        modified = true;
                    } else {
                        validList.push(isObj ? item : { workId: id, addedAt });
                        validIds.push(id);
                        if (!isObj) modified = true;
                    }
                }

                if (modified) {
                    storage.local.set({ [WTR_PENDING_KEY]: JSON.stringify(validList) });
                }
                resolve(validIds);
            } catch (e) {
                resolve([]);
            }
        });
    });
}

async function addToWTRPendingBookmarks(workId) {
    const ids = await loadWTRPendingBookmarks(); // cleans up and normalizes
    if (!ids.includes(workId)) {
        storage.local.get(WTR_PENDING_KEY, (items) => {
            try {
                const data = items[WTR_PENDING_KEY];
                const list = Array.isArray(data) ? data : (data ? JSON.parse(data) : []);
                list.push({ workId, addedAt: Date.now() });
                storage.local.set({ [WTR_PENDING_KEY]: JSON.stringify(list) });
                safeLog(`[WTR RetryQueue] ${workId} added to pending.`);
            } catch (e) {
                const list = [{ workId, addedAt: Date.now() }];
                storage.local.set({ [WTR_PENDING_KEY]: JSON.stringify(list) });
            }
        });
    }
}

async function removeFromWTRPendingBookmarks(workId) {
    storage.local.get(WTR_PENDING_KEY, (items) => {
        try {
            const data = items[WTR_PENDING_KEY];
            const list = Array.isArray(data) ? data : (data ? JSON.parse(data) : []);
            const newList = list.filter(item => {
                if (typeof item === 'string') return item !== workId;
                return item.workId !== workId;
            });
            if (newList.length !== list.length) {
                storage.local.set({ [WTR_PENDING_KEY]: JSON.stringify(newList) });
            }
        } catch (e) {
            // ignore
        }
    });
}

/**
 * Load Infinite Scroll settings in a single call.
 * Defaults all toggles to true.
 */
async function loadInfiniteScrollSettings() {
    return new Promise((resolve) => {
        storage.local.get({
            [INFINITE_SCROLL_GLOBAL_KEY]: true,
            [INFINITE_SCROLL_GENERAL_KEY]: true,
            [INFINITE_SCROLL_BOOKMARKS_KEY]: true
        }, (items) => {
            resolve({
                global: !!items[INFINITE_SCROLL_GLOBAL_KEY],
                general: !!items[INFINITE_SCROLL_GENERAL_KEY],
                bookmarks: !!items[INFINITE_SCROLL_BOOKMARKS_KEY]
            });
        });
    });
}

// Export for Jest testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        mergeReviews, normalizeCloudReviews, loadData, saveData,
        addToWTRQueue, loadWTRQueue, removeFromWTRQueue, isInWTRQueue,
        addToWTRPendingBookmarks, removeFromWTRPendingBookmarks, loadWTRPendingBookmarks,
        loadWTRSettings, getWorkRating, saveChapterRating, loadInfiniteScrollSettings,
        saveChapterReview, loadChapterReviews,
        __resetCache: () => { memoryCache.data = {}; memoryCache.loaded = {}; }
    };
}
