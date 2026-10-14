// options.js

// --- Constantes de Storage ---
const storage = (typeof browser !== 'undefined' ? browser.storage : chrome.storage);
const extAPI = (typeof browser !== 'undefined' ? browser : chrome);

// Chaves existentes
const API_KEY_STORE = 'jsonbin_api_key';
const BIN_ID_STORE = 'jsonbin_bin_id';
const REVIEW_BIN_ID_STORE = 'jsonbin_review_bin_id';
const AUTO_BACKUP_STORE = 'auto_backup_enabled';
const CHAPTER_REVIEWS_KEY = 'chapterReviews';
const ENABLE_REVIEWS_KEY = 'enable_chapter_reviews';
const FLOATING_REVIEW_BTN_KEY = 'enable_floating_review_btn';
const ENABLE_BOOKMARK_SYNC_KEY = 'enable_bookmark_sync';
const ENABLE_BOOKMARK_SORT_KEY = 'enable_bookmark_auto_sort';
const ENABLE_BOOKMARK_GROUPING_KEY = 'ao3_enable_bookmark_grouping';
const ENABLE_HIGHLIGHTS_KEY = 'ao3_enable_highlights';

// [WTR] Want to Read keys
const WTR_ENABLED_KEY = 'ao3_wtr_enabled';
const WTR_SYNC_KEY = 'ao3_wtr_sync_bookmarks';
const WTR_HEADER_MENU_KEY = 'ao3_wtr_show_header_menu';
const WTR_TAG_KEY = 'ao3_wtr_tag';
const WTR_FILTER_KEY = 'wtr_filter_active';

// Cores
const COLOR_READ_KEY = 'custom_color_read';
const COLOR_UPDATED_KEY = 'custom_color_updated';
const COLOR_PARTIAL_KEY = 'custom_color_partial';
const COLOR_DONOTREAD_KEY = 'custom_color_do_not_read';
const COLOR_WTR_KEY = 'custom_color_wtr';

// Infinite Scroll
const INFINITE_SCROLL_GLOBAL_KEY = 'ao3_infinite_scroll_global';
const INFINITE_SCROLL_GENERAL_KEY = 'ao3_infinite_scroll_general';
const INFINITE_SCROLL_BOOKMARKS_KEY = 'ao3_infinite_scroll_bookmarks';

// [NOVO] Chave para Stats v5.0
const STATS_CONFIG_KEY = 'ao3_stats_config';
const STATS_LOG_KEY = 'ao3_reading_log';
const CHAPTER_RATINGS_KEY = 'chapterRatings';
const READ_WORKS_KEY = 'ao3_read_works';

// [NOVO] Chaves PRO
const IS_PRO_USER_KEY = 'is_pro_user';
const PRO_LICENSE_KEY = 'ao3_pro_license';
const GUMROAD_PRODUCT_ID = '0pKq5Fyd3MXx9q9g3KXx3g==';
const GUMROAD_CHECKOUT_URL = `https://gumroad.com/l/ao3AdvancedMarkerPro`;

// [NOVO] Cloud provider + Google auth keys
const STORAGE_PROVIDER_KEY = 'storage_provider';    // 'jsonbin' | 'googledrive'
const BOOKS_STATS_ENABLED_KEY = 'books_stats_enabled';
const GOOGLE_EMAIL_KEY = 'google_user_email';
const GOOGLE_TOKEN_KEY = 'google_access_token';

// VARIÁVEL GLOBAL PARA O GRÁFICO (para poder destruir e recriar)
let readingChartInstance = null;
let resizeObserver = null;

let toastTimeout = null;

function showToast(message) {
    const toast = document.getElementById('toast-notification');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    if (toastTimeout) {
        clearTimeout(toastTimeout);
    }

    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ============================================================
//  SIDEBAR NAVIGATION (NEW — replaces legacy tab system)
// ============================================================

/**
 * Activate a panel by its ID and mark the matching sidebar link active.
 * Also shows/hides the global save bar: hidden only on purely data panels.
 */
function openPanel(panelId) {
    // Deactivate all panels
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    // Deactivate all nav links
    document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));

    // Activate the target panel
    const panel = document.getElementById(panelId);
    if (panel) panel.classList.add('active');

    // Activate the matching nav link
    const link = document.querySelector(`.sidebar-link[data-panel="${panelId}"]`);
    if (link) link.classList.add('active');

    // Global Save Bar: hide on data-only panels; show on config panels
    const saveBar = document.getElementById('globalSaveBar');
    if (saveBar) {
        const dataOnlyPanels = ['panelStatsData', 'panelHighlights', 'panelNotebook'];
        saveBar.style.display = dataOnlyPanels.includes(panelId) ? 'none' : 'flex';
    }

    // Lazy-load heavy panels
    if (panelId === 'panelStatsData') {
        setTimeout(() => loadAllStatsData(), 50);
    } else if (panelId === 'panelHighlights') {
        setTimeout(() => renderHighlightsNotebook(), 50);
    } else if (panelId === 'panelNotebook') {
        setTimeout(() => renderReviewsNotebook(), 50);
    }

    // Close mobile drawer after selection
    document.body.classList.remove('mobile-sidebar-open');
}

/**
 * Sets up all sidebar click listeners and the hamburger toggle.
 */
function setupSidebar() {
    // Nav link clicks
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', () => {
            const panelId = link.getAttribute('data-panel');
            if (panelId) openPanel(panelId);
        });
    });

    // Sidebar hamburger (inside sidebar header) — desktop: collapse, mobile: close drawer
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                // Mobile: close the drawer (same as backdrop click)
                document.body.classList.remove('mobile-sidebar-open');
            } else {
                // Desktop: expand / collapse sidebar
                document.body.classList.toggle('sidebar-collapsed');
                try {
                    localStorage.setItem('ao3_sidebar_collapsed',
                        document.body.classList.contains('sidebar-collapsed') ? '1' : '0');
                } catch (e) { /* storage may be unavailable */ }
            }
        });
    }

    // Mobile topbar hamburger (opens overlay drawer)
    const mobileBtn = document.getElementById('mobileHamburgerBtn');
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            document.body.classList.toggle('mobile-sidebar-open');
        });
    }

    // Backdrop click closes mobile drawer
    const backdrop = document.getElementById('sidebarBackdrop');
    if (backdrop) {
        backdrop.addEventListener('click', () => {
            document.body.classList.remove('mobile-sidebar-open');
        });
    }

    // Restore collapsed preference on desktop only
    try {
        if (window.innerWidth > 768 && localStorage.getItem('ao3_sidebar_collapsed') === '1') {
            document.body.classList.add('sidebar-collapsed');
        }
    } catch (e) { /* ignore */ }
}

/**
 * Shows or hides the "My Highlights" nav item based on whether the feature is enabled.
 * If highlights panel is currently active and becomes hidden, switches to Cloud panel.
 */
function updateHighlightsTabVisibility(enabled) {
    const navItem = document.getElementById('navHighlights');
    if (!navItem) return;

    if (enabled) {
        navItem.style.display = '';
    } else {
        navItem.style.display = 'none';
        // If user is on the highlights panel, redirect to Cloud
        const hlPanel = document.getElementById('panelHighlights');
        if (hlPanel && hlPanel.classList.contains('active')) {
            openPanel('panelCloud');
        }
    }
}

// ============================================================
//  PRESERVED BUSINESS LOGIC (unchanged from original)
// ============================================================

function mergeReviews(local, cloud) {
    const merged = { ...cloud };
    for (const [workId, chapters] of Object.entries(local)) {
        if (!merged[workId]) {
            merged[workId] = chapters;
        } else {
            merged[workId] = { ...merged[workId], ...chapters };
        }
    }
    return merged;
}

async function saveOptions() {
    // 1. General Configs
    const apiKey = document.getElementById('apiKey').value.trim();
    const binId = document.getElementById('binId').value.trim();
    const reviewBinId = document.getElementById('reviewBinId').value.trim();
    const autoBackup = document.getElementById('autoBackupEnabled').checked;
    const enableReviews = document.getElementById('enableChapterReviews').checked;
    const floatingReviewBtnEl = document.getElementById('enableFloatingReviewBtn');
    const enableFloatingReviewBtn = floatingReviewBtnEl ? floatingReviewBtnEl.checked : true;
    const enableBookmarkSync = document.getElementById('enable_bookmark_sync').checked;
    const sortEl = document.getElementById('enable_bookmark_auto_sort');
    const enableBookmarkSort = sortEl ? sortEl.checked : false;
    const enableGrouping = document.getElementById('enableBookmarkGrouping') ? document.getElementById('enableBookmarkGrouping').checked : false;
    const highlightToggle = document.getElementById('ao3_enable_highlights');
    const enableHighlights = highlightToggle && highlightToggle.checked ? highlightToggle.checked : false;

    // 2. Colors
    const colorRead = document.getElementById('color-read').value;
    const colorUpdated = document.getElementById('color-updated').value;
    const colorPartial = document.getElementById('color-partial').value;
    const colorDoNotRead = document.getElementById('color-do-not-read').value;
    const colorWtr = document.getElementById('color-wtr') ? document.getElementById('color-wtr').value : '#6f42c1';

    // Infinite Scroll
    const infGlobal = document.getElementById('infiniteScrollGlobal') ? document.getElementById('infiniteScrollGlobal').checked : true;
    const infGeneral = document.getElementById('infiniteScrollGeneral') ? document.getElementById('infiniteScrollGeneral').checked : true;
    const infBookmarks = document.getElementById('infiniteScrollBookmarks') ? document.getElementById('infiniteScrollBookmarks').checked : true;


    // 3. Stats Configs
    const statsConfig = {
        enabled: document.getElementById('enable_stats') ? document.getElementById('enable_stats').checked : false,
        wordsPerBook: parseInt(document.getElementById('stats_words_per_book').value) || 50000,
        yearlyGoal: parseInt(document.getElementById('stats_yearly_goal').value) || 50,
        statsBinId: document.getElementById('statsBinId').value.trim()
    };

    const items = {
        [API_KEY_STORE]: apiKey,
        [BIN_ID_STORE]: binId,
        [REVIEW_BIN_ID_STORE]: reviewBinId,
        [AUTO_BACKUP_STORE]: autoBackup,
        [ENABLE_REVIEWS_KEY]: enableReviews,
        [FLOATING_REVIEW_BTN_KEY]: enableFloatingReviewBtn,
        [ENABLE_BOOKMARK_SYNC_KEY]: enableBookmarkSync,
        [ENABLE_BOOKMARK_SORT_KEY]: enableBookmarkSort,
        [COLOR_READ_KEY]: colorRead,
        [COLOR_UPDATED_KEY]: colorUpdated,
        [COLOR_PARTIAL_KEY]: colorPartial,
        [COLOR_DONOTREAD_KEY]: colorDoNotRead,
        [COLOR_WTR_KEY]: colorWtr,
        [ENABLE_BOOKMARK_GROUPING_KEY]: enableGrouping,
        [ENABLE_HIGHLIGHTS_KEY]: enableHighlights,
        [STATS_CONFIG_KEY]: JSON.stringify(statsConfig),
        [INFINITE_SCROLL_GLOBAL_KEY]: infGlobal,
        [INFINITE_SCROLL_GENERAL_KEY]: infGeneral,
        [INFINITE_SCROLL_BOOKMARKS_KEY]: infBookmarks
    };

    // [WTR] Read WTR fields and include only if PRO
    const isProForSave = (await new Promise(r => storage.local.get(IS_PRO_USER_KEY, r)))[IS_PRO_USER_KEY];
    const wtrEnabledEl = document.getElementById('ao3_wtr_enabled');
    const wtrSyncEl = document.getElementById('ao3_wtr_sync_bookmarks');
    const wtrMenuEl = document.getElementById('ao3_wtr_show_header_menu');
    const wtrTagEl = document.getElementById('ao3_wtr_tag');

    items[WTR_ENABLED_KEY] = isProForSave ? (wtrEnabledEl ? wtrEnabledEl.checked : false) : false;
    items[WTR_SYNC_KEY] = isProForSave ? (wtrSyncEl ? wtrSyncEl.checked : false) : false;
    items[WTR_HEADER_MENU_KEY] = isProForSave ? (wtrMenuEl ? wtrMenuEl.checked : true) : true;
    items[WTR_TAG_KEY] = isProForSave ? (wtrTagEl ? wtrTagEl.value.trim() || 'AO3 Advanced Marker Want to Read' : 'AO3 Advanced Marker Want to Read') : 'AO3 Advanced Marker Want to Read';


    // Read provider radio
    const providerEl = document.querySelector('input[name="storageProvider"]:checked');
    items[STORAGE_PROVIDER_KEY] = providerEl ? providerEl.value : 'jsonbin';

    /* TODO: Books integration pending scope update
    // Books toggle (PRO only)
    const booksStatsEl = document.getElementById('booksStatsEnabled');
    items[BOOKS_STATS_ENABLED_KEY] = isProForSave ? (booksStatsEl ? booksStatsEl.checked : false) : false;
    */
    // Books stats disabled while auth/books scope is not in production.
    // Saving false defensively so existing stored values don't cause unexpected UI states.
    items[BOOKS_STATS_ENABLED_KEY] = false;

    storage.local.set(items, function () {
        showToast('Settings saved successfully!');
        loadAllStatsData();
    });
}

function toggleInfiniteScrollSubSwitches(isGlobalEnabled) {
    const general = document.getElementById('infiniteScrollGeneral');
    const bookmarks = document.getElementById('infiniteScrollBookmarks');
    if (general) {
        general.disabled = !isGlobalEnabled;
        if (!isGlobalEnabled) general.checked = false;
    }
    if (bookmarks) {
        bookmarks.disabled = !isGlobalEnabled;
        if (!isGlobalEnabled) bookmarks.checked = false;
    }
}

function setupColorSyncing() {
    const colorPairs = [
        { pickerId: 'color-read', hexId: 'hex-color-read' },
        { pickerId: 'color-updated', hexId: 'hex-color-updated' },
        { pickerId: 'color-partial', hexId: 'hex-color-partial' },
        { pickerId: 'color-do-not-read', hexId: 'hex-color-do-not-read' },
        { pickerId: 'color-wtr', hexId: 'hex-color-wtr' }
    ];

    const hexRegex = /^#[0-9A-Fa-f]{6}$/;

    colorPairs.forEach(pair => {
        const picker = document.getElementById(pair.pickerId);
        const hexInput = document.getElementById(pair.hexId);

        if (!picker || !hexInput) return;

        // Initialize hex input with picker value
        hexInput.value = picker.value.toUpperCase();

        // Sync picker to hex text
        picker.addEventListener('input', () => {
            hexInput.value = picker.value.toUpperCase();
            hexInput.classList.remove('invalid-hex');
        });

        // Sync hex text to picker
        hexInput.addEventListener('input', () => {
            let val = hexInput.value;
            // auto prefix #
            if (val.length > 0 && !val.startsWith('#')) {
                val = '#' + val;
                hexInput.value = val;
            }

            if (hexRegex.test(val)) {
                picker.value = val;
                hexInput.classList.remove('invalid-hex');
            } else {
                hexInput.classList.add('invalid-hex');
            }
        });

        hexInput.addEventListener('blur', () => {
            if (!hexRegex.test(hexInput.value)) {
                // Revert to valid picker value
                hexInput.value = picker.value.toUpperCase();
                hexInput.classList.remove('invalid-hex');
            }
        });
    });
}

function restoreOptions() {
    storage.local.get({
        [API_KEY_STORE]: '',
        [BIN_ID_STORE]: '',
        [REVIEW_BIN_ID_STORE]: '',
        [AUTO_BACKUP_STORE]: false,
        [ENABLE_REVIEWS_KEY]: true,
        [FLOATING_REVIEW_BTN_KEY]: true,
        [ENABLE_BOOKMARK_SYNC_KEY]: false,
        [ENABLE_BOOKMARK_SORT_KEY]: false,
        [COLOR_READ_KEY]: '#28a745',
        [COLOR_UPDATED_KEY]: '#ffc107',
        [COLOR_PARTIAL_KEY]: '#17a2b8',
        [COLOR_DONOTREAD_KEY]: '#dc3545',
        [COLOR_WTR_KEY]: '#6f42c1',
        [STATS_CONFIG_KEY]: '{}',
        [ENABLE_BOOKMARK_GROUPING_KEY]: false,
        [ENABLE_HIGHLIGHTS_KEY]: false,
        [IS_PRO_USER_KEY]: false,
        [PRO_LICENSE_KEY]: '',
        [WTR_ENABLED_KEY]: false,
        [WTR_SYNC_KEY]: false,
        [WTR_HEADER_MENU_KEY]: true,
        [WTR_TAG_KEY]: 'AO3 Advanced Marker Want to Read',
        [STORAGE_PROVIDER_KEY]: 'jsonbin',
        [BOOKS_STATS_ENABLED_KEY]: false,
        [INFINITE_SCROLL_GLOBAL_KEY]: true,
        [INFINITE_SCROLL_GENERAL_KEY]: true,
        [INFINITE_SCROLL_BOOKMARKS_KEY]: true,
    }, function (items) {
        // General
        if (document.getElementById('apiKey')) document.getElementById('apiKey').value = items[API_KEY_STORE];
        if (document.getElementById('binId')) document.getElementById('binId').value = items[BIN_ID_STORE];
        if (document.getElementById('reviewBinId')) document.getElementById('reviewBinId').value = items[REVIEW_BIN_ID_STORE];
        if (document.getElementById('autoBackupEnabled')) document.getElementById('autoBackupEnabled').checked = items[AUTO_BACKUP_STORE];
        if (document.getElementById('enableChapterReviews')) document.getElementById('enableChapterReviews').checked = items[ENABLE_REVIEWS_KEY];
        const floatingBtnEl = document.getElementById('enableFloatingReviewBtn');
        if (floatingBtnEl) {
            floatingBtnEl.checked = items[FLOATING_REVIEW_BTN_KEY] !== false;
            // Disable sub-toggle if Chapter Reviews are off
            floatingBtnEl.disabled = !items[ENABLE_REVIEWS_KEY];
        }
        // Wire master toggle to enable/disable sub-toggle
        const reviewsMasterEl = document.getElementById('enableChapterReviews');
        if (reviewsMasterEl && floatingBtnEl) {
            reviewsMasterEl.addEventListener('change', () => {
                floatingBtnEl.disabled = !reviewsMasterEl.checked;
            });
        }
        if (document.getElementById('enable_bookmark_sync')) document.getElementById('enable_bookmark_sync').checked = items[ENABLE_BOOKMARK_SYNC_KEY];
        if (document.getElementById('enableBookmarkGrouping')) document.getElementById('enableBookmarkGrouping').checked = items[ENABLE_BOOKMARK_GROUPING_KEY];
        const hlCheckbox = document.getElementById('ao3_enable_highlights');
        if (hlCheckbox) {
            hlCheckbox.checked = !!items[ENABLE_HIGHLIGHTS_KEY];
        }
        updateHighlightsTabVisibility(!!items[ENABLE_HIGHLIGHTS_KEY]);

        const proKeyEl = document.getElementById('proLicenseKey');
        if (proKeyEl) proKeyEl.value = items[PRO_LICENSE_KEY];

        // [WTR] Restore WTR settings BEFORE calling updateProUIState so that
        // updateWTRUIState reads the correct saved values when locking/unlocking.
        const wtrEnabledEl = document.getElementById('ao3_wtr_enabled');
        const wtrSyncEl = document.getElementById('ao3_wtr_sync_bookmarks');
        const wtrMenuEl = document.getElementById('ao3_wtr_show_header_menu');
        const wtrTagEl = document.getElementById('ao3_wtr_tag');
        if (wtrEnabledEl) wtrEnabledEl.checked = !!items[WTR_ENABLED_KEY];
        if (wtrSyncEl) wtrSyncEl.checked = !!items[WTR_SYNC_KEY];
        if (wtrMenuEl) wtrMenuEl.checked = items[WTR_HEADER_MENU_KEY] !== false;
        if (wtrTagEl) wtrTagEl.value = items[WTR_TAG_KEY] || 'Want to Read';

        // Now safe to call — WTR checkbox already reflects saved value
        updateProUIState(items[IS_PRO_USER_KEY]);

        const sortEl = document.getElementById('enable_bookmark_auto_sort');
        if (sortEl) sortEl.checked = items[ENABLE_BOOKMARK_SORT_KEY];

        // Colors
        if (document.getElementById('color-read')) { document.getElementById('color-read').value = items[COLOR_READ_KEY]; document.getElementById('hex-color-read').value = items[COLOR_READ_KEY].toUpperCase(); }
        if (document.getElementById('color-updated')) { document.getElementById('color-updated').value = items[COLOR_UPDATED_KEY]; document.getElementById('hex-color-updated').value = items[COLOR_UPDATED_KEY].toUpperCase(); }
        if (document.getElementById('color-partial')) { document.getElementById('color-partial').value = items[COLOR_PARTIAL_KEY]; document.getElementById('hex-color-partial').value = items[COLOR_PARTIAL_KEY].toUpperCase(); }
        if (document.getElementById('color-do-not-read')) { document.getElementById('color-do-not-read').value = items[COLOR_DONOTREAD_KEY]; document.getElementById('hex-color-do-not-read').value = items[COLOR_DONOTREAD_KEY].toUpperCase(); }
        if (document.getElementById('color-wtr')) { document.getElementById('color-wtr').value = items[COLOR_WTR_KEY]; if (document.getElementById('hex-color-wtr')) document.getElementById('hex-color-wtr').value = items[COLOR_WTR_KEY].toUpperCase(); }

        // Infinite Scroll
        if (document.getElementById('infiniteScrollGlobal')) document.getElementById('infiniteScrollGlobal').checked = items[INFINITE_SCROLL_GLOBAL_KEY];
        if (document.getElementById('infiniteScrollGeneral')) document.getElementById('infiniteScrollGeneral').checked = items[INFINITE_SCROLL_GENERAL_KEY];
        if (document.getElementById('infiniteScrollBookmarks')) document.getElementById('infiniteScrollBookmarks').checked = items[INFINITE_SCROLL_BOOKMARKS_KEY];
        toggleInfiniteScrollSubSwitches(items[INFINITE_SCROLL_GLOBAL_KEY]);

        // Stats Inputs
        let statsConfig = {};
        try {
            statsConfig = JSON.parse(items[STATS_CONFIG_KEY] || '{}');
        } catch (e) { statsConfig = {}; }

        if (document.getElementById('enable_stats')) document.getElementById('enable_stats').checked = statsConfig.enabled !== false;
        if (document.getElementById('stats_words_per_book')) document.getElementById('stats_words_per_book').value = statsConfig.wordsPerBook || 50000;
        if (document.getElementById('stats_yearly_goal')) document.getElementById('stats_yearly_goal').value = statsConfig.yearlyGoal || 50;
        if (document.getElementById('statsBinId')) document.getElementById('statsBinId').value = statsConfig.statsBinId || '';

        // Provider selector
        const provider = items[STORAGE_PROVIDER_KEY] || 'jsonbin';
        const radioEl = document.getElementById(provider === 'googledrive' ? 'providerDrive' : 'providerJsonbin');
        if (radioEl) radioEl.checked = true;
        applyProviderVisibility(provider);

        /* TODO: Books integration pending scope update
        // Books toggle
        const booksStatsEl = document.getElementById('booksStatsEnabled');
        if (booksStatsEl) booksStatsEl.checked = !!items[BOOKS_STATS_ENABLED_KEY];
        */
        // Ensure the Books toggle is always unchecked until the scope is restored.
        const booksStatsEl = document.getElementById('booksStatsEnabled');
        if (booksStatsEl) { booksStatsEl.checked = false; booksStatsEl.disabled = true; }

        loadAllStatsData();

        // Google auth state (async, non-blocking)
        setupGoogleAuthUI();
        /* TODO: Books integration pending scope update
        updateBooksStatsDepState();
        */
    });
}

// --- PRO Paywall & License Handling ---
function updateProUIState(isPro) {
    const statusText = document.getElementById('proStatusText');
    const groupingCheckbox = document.getElementById('enableBookmarkGrouping');
    const highlightsCheckbox = document.getElementById('ao3_enable_highlights');
    const proPromoText = document.getElementById('proPromoText');
    const proPromoText2 = document.getElementById('proPromoText2');

    if (isPro) {
        if (statusText) {
            statusText.textContent = 'License Active ✅';
            statusText.style.color = 'green';
        }
        if (groupingCheckbox) groupingCheckbox.disabled = false;
        if (highlightsCheckbox) highlightsCheckbox.disabled = false;
        if (proPromoText) proPromoText.style.display = 'none';
        if (proPromoText2) proPromoText2.style.display = 'none';
    } else {
        if (statusText) {
            statusText.textContent = 'Free Version. Enter License Key to unlock PRO.';
            statusText.style.color = '#666';
        }
        if (groupingCheckbox) { groupingCheckbox.disabled = true; groupingCheckbox.checked = false; }
        if (highlightsCheckbox) { highlightsCheckbox.disabled = true; highlightsCheckbox.checked = false; }
        if (proPromoText) proPromoText.style.display = 'block';
        if (proPromoText2) proPromoText2.style.display = 'block';
    }

    // [WTR] Sync WTR panel state with PRO status
    const wtrEnabledEl = document.getElementById('ao3_wtr_enabled');
    updateWTRUIState(isPro, wtrEnabledEl ? wtrEnabledEl.checked : false);

    // [BOOKS STATS] Show/hide nav item and panel content based on PRO status
    const navBooksStats = document.getElementById('navBooksStats');
    const booksStatsContent = document.getElementById('booksStatsContent');
    const proPromoBooksStats = document.getElementById('proPromoBooksStats');

    if (isPro) {
        // if (navBooksStats)      navBooksStats.style.display      = '';
        if (booksStatsContent) booksStatsContent.style.display = '';
        if (proPromoBooksStats) proPromoBooksStats.style.display = 'none';
        /* TODO: Books integration pending scope update
        updateBooksStatsDepState(); // re-check Google dependency
        */
    } else {
        // if (navBooksStats)      navBooksStats.style.display      = 'none';
        if (booksStatsContent) booksStatsContent.style.display = 'none';
        if (proPromoBooksStats) proPromoBooksStats.style.display = 'block';
        // Redirect away from Books panel if currently active
        const bsPanel = document.getElementById('panelBooksStats');
        if (bsPanel && bsPanel.classList.contains('active')) openPanel('panelCloud');
    }
}

// ============================================================
//  PROVIDER SELECTOR
// ============================================================

/**
 * Wires up the storage provider radio buttons so selecting a provider
 * immediately shows/hides the appropriate credential sections.
 */
function setupProviderSelector() {
    const radios = document.querySelectorAll('input[name="storageProvider"]');
    radios.forEach(r => r.addEventListener('change', () => applyProviderVisibility(r.value)));
}

/**
 * Shows/hides the JSONBin and Google Drive credential cards based on the
 * selected provider string.
 * @param {'jsonbin'|'googledrive'} provider
 */
function applyProviderVisibility(provider) {
    const isJsonbin = provider === 'jsonbin';
    const sJsonbin = document.getElementById('sectionJsonbin');
    const sStats = document.getElementById('sectionStatsBin');
    const sReview = document.getElementById('sectionReviewBin');
    const sDrive = document.getElementById('sectionGoogleDrive');
    if (sJsonbin) sJsonbin.style.display = isJsonbin ? '' : 'none';
    if (sStats) sStats.style.display = isJsonbin ? '' : 'none';
    if (sReview) sReview.style.display = isJsonbin ? '' : 'none';
    if (sDrive) sDrive.style.display = isJsonbin ? 'none' : '';
}

// ============================================================
//  GOOGLE AUTH UI
// ============================================================

/**
 * Reads the stored Google email and toggles between the Login and
 * Connected states in the Cloud Settings panel. Also binds the
 * Login / Logout button click handlers.
 */
async function setupGoogleAuthUI() {
    const items = await new Promise(r =>
        storage.local.get([GOOGLE_EMAIL_KEY, GOOGLE_TOKEN_KEY], r)
    );

    const email = items[GOOGLE_EMAIL_KEY];
    const hasToken = !!items[GOOGLE_TOKEN_KEY];

    const loginState = document.getElementById('googleLoginState');
    const connectedState = document.getElementById('googleConnectedState');
    const emailSpan = document.getElementById('googleAccountEmail');

    if (hasToken) {
        if (loginState) loginState.style.display = 'none';
        if (connectedState) connectedState.style.display = '';
        if (emailSpan) emailSpan.textContent = email ? `Connected as ${email}` : 'Connected to Google Account';
    } else {
        if (loginState) loginState.style.display = '';
        if (connectedState) connectedState.style.display = 'none';
    }

    // Bind Login button
    const loginBtn = document.getElementById('btnGoogleLogin');
    if (loginBtn) {
        loginBtn.onclick = async () => {
            loginBtn.disabled = true;
            loginBtn.textContent = 'Connecting\u2026';
            try {
                await window.googleAuth.login();
                showToast('Google account connected!');
                await saveOptions();
            } catch (e) {
                console.error('[Auth] Login failed:', e);
                showToast('Login failed: ' + e.message);
            } finally {
                loginBtn.disabled = false;
                loginBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.29-8.16 2.29-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg> Log In with Google';
            }
            await setupGoogleAuthUI();
            /* TODO: Books integration pending scope update
            await updateBooksStatsDepState();
            */
        };
    }

    // Bind Logout button
    const logoutBtn = document.getElementById('btnGoogleLogout');
    if (logoutBtn) {
        logoutBtn.onclick = async () => {
            logoutBtn.disabled = true;
            try {
                await window.googleAuth.logout();
                showToast('Google account disconnected.');
            } catch (e) {
                console.error('[Auth] Logout failed:', e);
                showToast('Logout failed.');
            } finally {
                logoutBtn.disabled = false;
            }
            await setupGoogleAuthUI();
            /* TODO: Books integration pending scope update
            await updateBooksStatsDepState();
            */
        };
    }

    // Token Bridge: Import
    const btnShowTokenImport = document.getElementById('btnShowTokenImport');
    const tokenImportContainer = document.getElementById('tokenImportContainer');
    const btnImportToken = document.getElementById('btnImportToken');
    const importTokenInput = document.getElementById('importTokenInput');

    if (btnShowTokenImport && tokenImportContainer) {
        btnShowTokenImport.onclick = (e) => {
            e.preventDefault();
            tokenImportContainer.style.display = tokenImportContainer.style.display === 'none' ? 'block' : 'none';
        };
    }

    if (btnImportToken && importTokenInput) {
        btnImportToken.onclick = async () => {
            const tokenStr = importTokenInput.value.trim();
            if (!tokenStr) return showToast('Please paste a token string first.');

            btnImportToken.disabled = true;
            btnImportToken.textContent = 'Importing...';
            try {
                await window.googleAuth.importToken(tokenStr);
                showToast('Token imported successfully!');
                importTokenInput.value = '';
                tokenImportContainer.style.display = 'none';
                await setupGoogleAuthUI();
                await saveOptions();
                /* TODO: Books integration pending scope update
                await updateBooksStatsDepState();
                */
            } catch (e) {
                console.error('[TokenBridge] Import failed:', e);
                showToast('Import failed: ' + e.message);
            } finally {
                btnImportToken.disabled = false;
                btnImportToken.textContent = 'Import';
            }
        };
    }

    // Token Bridge: Export
    const btnExportToken = document.getElementById('btnExportToken');
    const tokenExportContainer = document.getElementById('tokenExportContainer');
    const exportTokenOutput = document.getElementById('exportTokenOutput');

    if (btnExportToken && tokenExportContainer && exportTokenOutput) {
        btnExportToken.onclick = async () => {
            try {
                const tokenStr = await window.googleAuth.exportToken();
                exportTokenOutput.value = tokenStr;
                tokenExportContainer.style.display = 'block';
                exportTokenOutput.select();
                try {
                    document.execCommand('copy');
                    showToast('Token copied to clipboard!');
                } catch (err) {
                    showToast('Token generated. Please copy it manually.');
                }
            } catch (e) {
                console.error('[TokenBridge] Export failed:', e);
                showToast('Export failed: ' + e.message);
            }
        };
    }
}

// ============================================================
//  BOOKS STATS DEPENDENCY CHECK
// ============================================================

/**
 * Checks whether the user has a Google account connected.
 * The Books toggle is kept disabled while the auth/books scope
 * is absent from the production OAuth configuration.
 *
 * NOTE: This function intentionally does NOT validate which scopes
 * the stored token covers. Scope changes do not invalidate existing
 * tokens, so checking token presence alone is safe and avoids false
 * auth failures when the token was issued under a broader scope set.
 */
async function updateBooksStatsDepState() {
    // Validate token presence only — scope content is irrelevant here.
    const items = await new Promise(r =>
        storage.local.get([GOOGLE_TOKEN_KEY], r)
    );
    const hasToken = !!items[GOOGLE_TOKEN_KEY];

    const toggle = document.getElementById('booksStatsEnabled');
    const warning = document.getElementById('booksStatsDepWarning');

    /* TODO: Books integration pending scope update
    // Re-enable this block once auth/books is restored to AUTH_SCOPES in auth.js.
    if (!hasToken) {
        // No Google account — disable toggle regardless of PRO status
        if (toggle) { toggle.disabled = true; toggle.checked = false; }
        if (warning) warning.style.display = '';
    } else {
        // Google account present — enable only if PRO
        const proItems = await new Promise(r => storage.local.get(IS_PRO_USER_KEY, r));
        if (toggle) toggle.disabled = !proItems[IS_PRO_USER_KEY];
        if (warning) warning.style.display = 'none';
    }
    */

    // Defensive: keep toggle locked regardless of token state until scope is restored.
    if (toggle) { toggle.disabled = true; toggle.checked = false; }
    // Show warning only if no token is present (unrelated auth feedback is still useful).
    if (warning) warning.style.display = hasToken ? 'none' : '';
}

/**
 * Controls the WTR panel's PRO lock state and nested options visibility.
 * @param {boolean} isPro
 * @param {boolean} isWTREnabled
 */
function updateWTRUIState(isPro, isWTREnabled) {
    const wtrEnabledEl = document.getElementById('ao3_wtr_enabled');
    const wtrNestedOptions = document.getElementById('wtrNestedOptions');
    const proPromoWTR = document.getElementById('proPromoTextWTR');

    if (!isPro) {
        if (wtrEnabledEl) { wtrEnabledEl.disabled = true; wtrEnabledEl.checked = false; }
        if (wtrNestedOptions) wtrNestedOptions.classList.add('wtr-locked');
        if (proPromoWTR) proPromoWTR.style.display = 'block';
    } else {
        if (wtrEnabledEl) wtrEnabledEl.disabled = false;
        if (proPromoWTR) proPromoWTR.style.display = 'none';
        if (wtrNestedOptions) {
            if (isWTREnabled) {
                wtrNestedOptions.classList.remove('wtr-locked');
            } else {
                wtrNestedOptions.classList.add('wtr-locked');
            }
        }
    }
}


async function handleProActivation() {
    const keyInput = document.getElementById('proLicenseKey').value.trim();
    const statusText = document.getElementById('proStatusText');
    const btnActivate = document.getElementById('btnActivatePro');

    if (!keyInput) {
        statusText.textContent = 'Please enter a license key.';
        statusText.style.color = 'red';
        return;
    }

    btnActivate.disabled = true;
    btnActivate.textContent = 'Checking...';
    statusText.textContent = 'Validating license...';
    statusText.style.color = '#666';

    try {
        const response = await fetch('https://api.gumroad.com/v2/licenses/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ product_id: GUMROAD_PRODUCT_ID, license_key: keyInput })
        });

        const data = await response.json();

        if (data.success === true && data.purchase?.refunded === false) {
            await storage.local.set({ [PRO_LICENSE_KEY]: keyInput, [IS_PRO_USER_KEY]: true });
            updateProUIState(true);
        } else {
            await storage.local.set({ [IS_PRO_USER_KEY]: false });
            updateProUIState(false);
            statusText.textContent = data.message || 'Invalid License Key.';
            statusText.style.color = 'red';
        }
    } catch (e) {
        console.error("License validation error:", e);
        await storage.local.set({ [IS_PRO_USER_KEY]: false });
        updateProUIState(false);
        statusText.textContent = 'Error connecting to validation server.';
        statusText.style.color = 'red';
    } finally {
        btnActivate.disabled = false;
        btnActivate.textContent = 'Activate';
    }
}

// --- Stats Dashboard ---
async function loadAllStatsData() {
    const data = await storage.local.get([STATS_LOG_KEY, STATS_CONFIG_KEY, CHAPTER_RATINGS_KEY, READ_WORKS_KEY]);

    let logs = [];
    try { logs = JSON.parse(data[STATS_LOG_KEY] || '[]'); } catch (e) { }

    let config = {};
    try { config = JSON.parse(data[STATS_CONFIG_KEY] || '{}'); } catch (e) { }

    let ratings = {};
    try { ratings = JSON.parse(data[CHAPTER_RATINGS_KEY] || '{}'); } catch (e) { }

    let worksMeta = {};
    try { worksMeta = JSON.parse(data[READ_WORKS_KEY] || '{}'); } catch (e) { }

    const masterMetadata = {};

    logs.forEach(entry => {
        if (entry.workId) {
            masterMetadata[entry.workId] = { title: entry.title, author: entry.author, fandom: entry.fandom };
        }
    });

    Object.keys(worksMeta).forEach(workId => {
        if (!masterMetadata[workId]) {
            masterMetadata[workId] = { title: worksMeta[workId].title, author: worksMeta[workId].author, fandom: worksMeta[workId].fandom };
        }
    });

    renderStatsDashboard(logs, config);
    renderStatsLogTable(logs);
    renderRatingAnalytics(ratings, masterMetadata);
}

async function renderStatsDashboard(logs, config) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const cacheDataRaw = await storage.local.get('ao3_dashboard_cache');
    let cache = null;
    try { cache = JSON.parse(cacheDataRaw.ao3_dashboard_cache || 'null'); } catch (e) { }

    let latestTimestamp = 0;
    if (logs.length > 0) latestTimestamp = Math.max(...logs.map(l => l.timestamp));

    let dashboardState = null;
    if (cache && cache.logCount === logs.length && cache.latestTimestamp === latestTimestamp) {
        dashboardState = cache.state;
    } else {
        let totalWords = 0;
        const fandomsMap = {};
        const authorsMap = {};
        const wordsByDate = {};
        let lastReadTitle = "No recent reading";
        let lastTimestamp = 0;

        logs.forEach(entry => {
            const words = Math.max(0, parseInt(entry.words || entry.wordCount || 0));
            totalWords += words;

            if (entry.timestamp > lastTimestamp) {
                lastTimestamp = entry.timestamp;
                lastReadTitle = entry.title || "Unknown Title";
            }

            const fandom = entry.fandom || "Uncategorized";
            if (!fandomsMap[fandom]) fandomsMap[fandom] = 0;
            fandomsMap[fandom] += words;

            const author = entry.author || "Anonymous";
            if (!authorsMap[author]) authorsMap[author] = { words: 0, chapters: 0 };
            authorsMap[author].words += words;

            const chaptersInThisLog = parseInt(entry.chaptersReadCount || 1);
            authorsMap[author].chapters += chaptersInThisLog;

            const dateObj = new Date(entry.timestamp);
            const dateKey = formatLocalDate(dateObj);
            if (!wordsByDate[dateKey]) wordsByDate[dateKey] = 0;
            wordsByDate[dateKey] += words;
        });

        dashboardState = { totalWords, fandomsMap, authorsMap, wordsByDate, lastReadTitle };

        storage.local.set({
            'ao3_dashboard_cache': JSON.stringify({
                logCount: logs.length,
                latestTimestamp: latestTimestamp,
                state: dashboardState
            })
        });
    }

    const { totalWords, fandomsMap, authorsMap, wordsByDate, lastReadTitle } = dashboardState;

    const sortedDates = Object.keys(wordsByDate).sort();
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    const dateTimestamps = sortedDates.map(d => new Date(d).getTime());
    const oneDay = 24 * 60 * 60 * 1000;

    for (let i = 0; i < dateTimestamps.length; i++) {
        if (i === 0) {
            tempStreak = 1;
        } else {
            const diff = (dateTimestamps[i] - dateTimestamps[i - 1]) / oneDay;
            if (diff >= 0.9 && diff <= 1.1) {
                tempStreak++;
            } else if (diff > 1.1) {
                tempStreak = 1;
            }
        }
        if (tempStreak > longestStreak) longestStreak = tempStreak;
    }

    const lastLogDate = sortedDates.length > 0 ? sortedDates[sortedDates.length - 1] : null;
    if (lastLogDate) {
        const lastDate = new Date(lastLogDate + 'T00:00:00');
        const dayDiff = Math.floor((today.getTime() - lastDate.getTime()) / oneDay);
        currentStreak = dayDiff <= 1 ? tempStreak : 0;
    }

    setText('currentFicTitle', lastReadTitle);
    setText('currentStreakValue', `${currentStreak} Days`);
    setText('longestStreakValue', `${longestStreak} Days`);

    const ratio = config.wordsPerBook || 50000;
    const booksRead = (totalWords / ratio).toFixed(1);
    const goal = config.yearlyGoal || 50;
    const progressPercent = Math.min((booksRead / goal) * 100, 100).toFixed(1);

    let dailyAvg = 0;
    if (sortedDates.length > 0) {
        const firstDate = new Date(sortedDates[0]);
        const daysSinceStart = Math.max(1, (today.getTime() - firstDate.getTime()) / oneDay);
        dailyAvg = Math.round(totalWords / daysSinceStart);
    }

    setText('totalWordsValue', totalWords.toLocaleString());
    setText('totalBooksValue', booksRead);
    setText('dailyAvgValue', dailyAvg.toLocaleString());
    setText('progressPercentValue', `${progressPercent}%`);
    setText('booksReadValue', booksRead);
    setText('goalValue', goal);

    setupGoalTooltip(booksRead, goal, today);

    const totalWordsBadge = document.getElementById('totalWordsBadge');
    if (totalWordsBadge && sortedDates.length > 0) {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const thisWeekWords = Object.entries(wordsByDate)
            .filter(([dateStr]) => new Date(dateStr) >= sevenDaysAgo)
            .reduce((sum, [_, words]) => sum + words, 0);

        const fourteenDaysAgo = new Date();
        fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);
        const lastWeekWords = Object.entries(wordsByDate)
            .filter(([dateStr]) => { const d = new Date(dateStr); return d >= fourteenDaysAgo && d < sevenDaysAgo; })
            .reduce((sum, [_, words]) => sum + words, 0);

        let percentChange = 0;
        if (lastWeekWords > 0) {
            percentChange = Math.round(((thisWeekWords - lastWeekWords) / lastWeekWords) * 100);
        } else if (thisWeekWords > 0) {
            percentChange = 100;
        }

        const sign = percentChange > 0 ? '+' : '';
        totalWordsBadge.textContent = `${sign}${percentChange}%`;
        totalWordsBadge.className = percentChange >= 0 ? 'pill-green' : 'pill-red';
    }

    const progressBar = document.getElementById('progressBarFill');
    if (progressBar) progressBar.style.width = `${progressPercent}%`;

    const star1 = document.getElementById('goalStar1');
    const star2 = document.getElementById('goalStar2');
    const star3 = document.getElementById('goalStar3');
    if (star1) star1.classList.toggle('active', progressPercent >= 33);
    if (star2) star2.classList.toggle('active', progressPercent >= 66);
    if (star3) star3.classList.toggle('active', progressPercent >= 100);

    renderTopFandoms(fandomsMap);
    renderTopAuthors(authorsMap);
    renderChart(wordsByDate);
}

function formatLocalDate(d) {
    if (!(d instanceof Date)) d = new Date(d);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}

function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
}

function setupGoalTooltip(booksRead, goal, today) {
    const booksReadEl = document.getElementById('booksReadValue');
    if (!booksReadEl) return;

    booksRead = +booksRead;
    const monthsPassed = today.getMonth();
    const booksPerMonth = goal / 12;
    const expectedBooks = booksPerMonth * (monthsPassed + 1);
    const difference = booksRead - expectedBooks;

    let tooltipText = '';

    if (difference > 0 && booksRead < goal) {
        tooltipText = `✅ You're ${Math.abs(difference).toFixed(1)} books ahead of schedule!`;
    } else if (booksRead >= goal) {
        tooltipText = `🎉 You've reached your yearly goal!`;
    } else {
        const booksNeeded = goal - booksRead;
        const monthsRemaining = 12 - (monthsPassed + 1);
        if (monthsRemaining > 0 && booksNeeded > 0) {
            tooltipText = `⚠️ You need to read ${(booksNeeded / monthsRemaining).toFixed(1)} books/month to reach your goal.`;
        } else {
            tooltipText = booksNeeded > 0
                ? `❌ You're ${Math.abs(difference).toFixed(1)} books behind. Next year's another chance!`
                : `🎉 You've reached your yearly goal!`;
        }
    }

    if (booksReadEl._goalTooltip) { booksReadEl._goalTooltip.remove(); delete booksReadEl._goalTooltip; }
    if (booksReadEl._goalClickHandler) { booksReadEl.removeEventListener('click', booksReadEl._goalClickHandler); delete booksReadEl._goalClickHandler; }

    const tooltipGoal = document.createElement('div');
    tooltipGoal.style.cssText = `position:fixed;background:rgba(0,0,0,0.9);color:white;padding:8px 12px;border-radius:6px;font-size:0.75rem;font-weight:500;pointer-events:none;display:none;z-index:1000;white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,0.3);`;
    tooltipGoal.textContent = tooltipText;
    document.body.appendChild(tooltipGoal);
    booksReadEl._goalTooltip = tooltipGoal;

    const showTooltip = () => {
        const rect = booksReadEl.getBoundingClientRect();
        tooltipGoal.style.display = 'block';
        tooltipGoal.style.left = (rect.left + rect.width / 2 - tooltipGoal.offsetWidth / 2) + 55 + 'px';
        tooltipGoal.style.top = (rect.top - tooltipGoal.offsetHeight - 8) + 'px';
    };
    const hideTooltip = () => { tooltipGoal.style.display = 'none'; };

    booksReadEl.style.cursor = 'help';
    booksReadEl.addEventListener('mouseenter', showTooltip);
    booksReadEl.addEventListener('mouseleave', hideTooltip);

    const clickHandler = (e) => {
        e.stopPropagation();
        tooltipGoal.style.display === 'none' ? showTooltip() : hideTooltip();
    };
    booksReadEl.addEventListener('click', clickHandler);
    booksReadEl._goalClickHandler = clickHandler;

    window._currentGoalTooltip = tooltipGoal;

    if (!window._goalTooltipDocHandlerAdded) {
        window._goalTooltipDocHandlerAdded = true;
        document.addEventListener('click', (e) => {
            if (!e.target.closest || !e.target.closest('#booksReadValue')) {
                if (window._currentGoalTooltip) window._currentGoalTooltip.style.display = 'none';
            }
        });
    }
}

function formatWordCount(n) {
    if (n >= 1_000_000) return parseFloat((n / 1_000_000).toFixed(2)) + 'M';
    if (n >= 1_000) return parseFloat((n / 1_000).toFixed(1)) + 'k';
    return n;
}

function renderTopFandoms(fandomsMap) {
    const list = document.getElementById('topFandomsList');
    if (!list) return;
    list.innerHTML = '';

    const sorted = Object.entries(fandomsMap).sort((a, b) => b[1] - a[1]).slice(0, 3);
    const maxVal = sorted.length > 0 ? sorted[0][1] : 1;

    sorted.forEach(([name, words]) => {
        const percent = (words / maxVal) * 100;
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="flex-justify-between mb-1" style="font-size:0.875rem;">
                <span class="font-medium text-slate-700 name-span author-name" style="margin-right: 8px;"></span>
                <span class="text-slate-500 text-xs" style="flex-shrink: 0;">${formatWordCount(words)} words</span>
            </div>
            <div class="w-full bg-gray-100 rounded-full h-2">
                <div class="bg-indigo-600 h-2 rounded-full" style="width:${percent}%"></div>
            </div>`;
        div.querySelector('.name-span').textContent = name;
        list.appendChild(div);
    });
}

function renderTopAuthors(authorsMap) {
    const list = document.getElementById('topAuthorsList');
    if (!list) return;
    list.innerHTML = '';

    const sorted = Object.entries(authorsMap).sort((a, b) => b[1].words - a[1].words).slice(0, 3);

    sorted.forEach(([name, data], index) => {
        const div = document.createElement('div');
        div.className = 'author-row';
        div.innerHTML = `
            <div class="author-rank">${index + 1}</div>
            <div class="flex-1">
                <div class="text-sm font-semibold text-slate-700 name-span author-name"></div>
                <div class="flex-justify-between">
                    <div class="text-xs text-slate-500">${formatWordCount(data.words)} words</div>
                    <div class="text-xs text-slate-500">${data.chapters} Chapters</div>
                </div>
            </div>`;
        div.querySelector('.name-span').textContent = name;
        list.appendChild(div);
    });
}

function renderChart(wordsByDate) {
    const canvas = document.getElementById('readingChart');
    if (!canvas) return;

    const container = canvas.parentElement;
    let chartWidth = container.clientWidth;
    let chartHeight = container.clientHeight;

    if (chartWidth === 0 || chartHeight === 0) return;

    const maxWidth = Math.min(chartWidth, window.innerWidth - 30);
    chartWidth = maxWidth;

    if (!resizeObserver) {
        resizeObserver = new ResizeObserver(() => renderChart(wordsByDate));
        resizeObserver.observe(container);
    }

    const dpr = window.devicePixelRatio || 1;
    canvas.width = chartWidth * dpr;
    canvas.height = chartHeight * dpr;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    canvas.style.width = `${chartWidth}px`;
    canvas.style.height = `${chartHeight}px`;

    const labels = [];
    const data = [];

    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateKey = formatLocalDate(d);
        labels.push(d.toLocaleDateString('en-US', { weekday: 'short' }));
        data.push(wordsByDate[dateKey] || 0);
    }

    const padding = { top: 20, right: 20, bottom: 30, left: 40 };
    const canvasChartWidth = chartWidth - padding.left - padding.right;
    const canvasChartHeight = chartHeight - padding.top - padding.bottom;
    const maxVal = Math.max(...data, 100);
    const yMax = Math.ceil(maxVal / 100) * 100 * 1.1;

    ctx.clearRect(0, 0, chartWidth, chartHeight);

    ctx.beginPath();
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);

    for (let i = 0; i <= 4; i++) {
        const y = padding.top + (canvasChartHeight * i / 4);
        ctx.moveTo(padding.left, y);
        ctx.lineTo(padding.left + canvasChartWidth, y);
        const val = Math.round(yMax - (yMax * i / 4));
        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px Inter, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(val >= 1000 ? (val / 1000).toFixed(1) + 'k' : val, padding.left - 8, y + 3);
    }
    ctx.stroke();

    ctx.setLineDash([]);
    const getX = (index) => padding.left + (index * (canvasChartWidth / (data.length - 1)));
    const getY = (val) => padding.top + canvasChartHeight - ((val / yMax) * canvasChartHeight);

    const gradient = ctx.createLinearGradient(0, 0, 0, chartHeight);
    gradient.addColorStop(0, 'rgba(79, 70, 229, 0.2)');
    gradient.addColorStop(1, 'rgba(79, 70, 229, 0.0)');

    ctx.beginPath();
    ctx.moveTo(getX(0), getY(data[0]));
    data.forEach((val, i) => { if (i === 0) return; ctx.lineTo(getX(i), getY(val)); });
    ctx.lineTo(getX(data.length - 1), padding.top + canvasChartHeight);
    ctx.lineTo(getX(0), padding.top + canvasChartHeight);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    ctx.moveTo(getX(0), getY(data[0]));
    data.forEach((val, i) => { if (i === 0) return; ctx.lineTo(getX(i), getY(val)); });
    ctx.stroke();

    const chartPoints = [];
    data.forEach((val, i) => {
        const x = getX(i);
        const y = getY(val);
        ctx.beginPath();
        ctx.fillStyle = '#fff';
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2;
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#64748b';
        ctx.font = '12px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(labels[i], x, padding.top + canvasChartHeight + 20);
        chartPoints.push({ x, y, label: labels[i], words: data[i] });
    });

    canvas.chartPoints = chartPoints;
    setupChartTooltip(canvas);
}

function setupChartTooltip(canvas) {
    const existing = document.getElementById('chartTooltip');
    if (existing) existing.remove();

    const tooltip = document.createElement('div');
    tooltip.id = 'chartTooltip';
    tooltip.style.cssText = `position:fixed;background:rgba(0,0,0,0.9);color:white;padding:8px 12px;border-radius:6px;font-size:13px;font-weight:500;pointer-events:none;display:none;z-index:1000;white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,0.3);`;
    document.body.appendChild(tooltip);

    const margin = 20;

    if (canvas._chartClickHandler) {
        canvas.removeEventListener('click', canvas._chartClickHandler);
        delete canvas._chartClickHandler;
    }

    const clickHandler = function (e) {
        e.stopPropagation();
        const clickX = e.clientX;
        const clickY = e.clientY;
        let clickedPoint = null;

        if (Array.isArray(canvas.chartPoints)) {
            const canvasRect = canvas.getBoundingClientRect();
            for (const point of canvas.chartPoints) {
                const distance = Math.hypot(clickX - (canvasRect.left + point.x), clickY - (canvasRect.top + point.y));
                if (distance <= margin) { clickedPoint = point; break; }
            }
        }

        if (clickedPoint) {
            tooltip.textContent = `${clickedPoint.label}: ${clickedPoint.words.toLocaleString()} words`;
            tooltip.style.display = 'block';

            let tooltipX = e.clientX - tooltip.offsetWidth / 2;
            let tooltipY = e.clientY - 40;

            const paddingViewport = 8;
            const vw = document.documentElement.clientWidth;
            if (tooltipX < paddingViewport) tooltipX = paddingViewport;
            if (tooltipX + tooltip.offsetWidth > vw - paddingViewport) tooltipX = vw - tooltip.offsetWidth - paddingViewport;
            if (tooltipY < paddingViewport) tooltipY = e.clientY + 12;

            tooltip.style.left = tooltipX + 'px';
            tooltip.style.top = tooltipY + 'px';

            if (canvas._chartTooltipTimeout) clearTimeout(canvas._chartTooltipTimeout);
            canvas._chartTooltipTimeout = setTimeout(() => { tooltip.style.display = 'none'; }, 3000);
        }
    };

    canvas.addEventListener('click', clickHandler);
    canvas._chartClickHandler = clickHandler;

    if (!window._chartTooltipDocHandlerAdded) {
        window._chartTooltipDocHandlerAdded = true;
        document.addEventListener('click', (e) => {
            const tt = document.getElementById('chartTooltip');
            if (!tt) return;
            if (!e.target.closest || !e.target.closest('canvas')) tt.style.display = 'none';
        });
    }
}

function renderStatsLogTable(logsParam) {
    const container = document.getElementById('statsLogContainer');
    const noLogsMsg = document.getElementById('noLogsMsg');

    if (logsParam) {
        processLogs(logsParam);
    } else {
        storage.local.get(STATS_LOG_KEY, (items) => {
            let logs = [];
            try { logs = JSON.parse(items[STATS_LOG_KEY] || '[]'); } catch (e) { }
            processLogs(logs);
        });
    }

    function processLogs(log) {
        container.innerHTML = '';

        if (!log || log.length === 0) { noLogsMsg.style.display = 'block'; return; }
        noLogsMsg.style.display = 'none';

        if (window._logScrollObserver) {
            window._logScrollObserver.disconnect();
            window._logScrollObserver = null;
        }

        const sentinel = document.createElement('div');
        sentinel.style.height = '1px';
        sentinel.style.width = '1px';
        sentinel.id = 'log-sentinel';

        if (!container._hasClickListener) {
            container.addEventListener('click', (e) => {
                if (e.target.classList.contains('delete-btn-card')) {
                    e.stopPropagation();
                    deleteLogEntry(e.target.getAttribute('data-id'));
                }
            });
            container._hasClickListener = true;
        }

        const sortedLog = [...log].sort((a, b) => b.timestamp - a.timestamp);
        let currentIndex = 0;
        const CHUNK_SIZE = 50;

        function renderChunk() {
            const chunk = sortedLog.slice(currentIndex, currentIndex + CHUNK_SIZE);
            if (chunk.length === 0) {
                if (window._logScrollObserver) {
                    window._logScrollObserver.disconnect();
                    window._logScrollObserver = null;
                }
                if (sentinel.parentNode) sentinel.remove();
                return;
            }

            const fragment = document.createDocumentFragment();
            chunk.forEach(entry => {
                const card = document.createElement('div');
                card.className = 'log-card';

                const dateObj = new Date(entry.timestamp);
                const dateStr = !isNaN(dateObj.getTime())
                    ? dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    : 'Unknown Date';

                const isManual = entry.action === 'MANUAL_LOG';
                const words = parseInt(entry.words || entry.wordCount || 0);

                card.innerHTML = `
                    <div class="card-main">
                        <div class="card-header"><span class="card-date">${dateStr}</span></div>
                        <div class="card-title">${entry.title || 'Unknown Title'}</div>
                        <div class="card-meta">
                            <span class="card-fandom">${entry.fandom || 'No Fandom'}</span>
                            <span class="card-author">${entry.author && entry.author !== 'Unknown' ? `by ${entry.author}` : ''}</span>
                        </div>
                    </div>
                    <div class="card-stats">
                        <span class="badge ${isManual ? 'manual' : 'update'}">${isManual ? 'Chapter/Re-read' : 'Read'}</span>
                        <span class="word-count">+${words.toLocaleString()} words</span>
                    </div>
                    <button class="delete-btn-card" data-id="${entry.id}" title="Remove Entry">✕</button>`;

                fragment.appendChild(card);
            });

            if (sentinel.parentNode) {
                container.insertBefore(fragment, sentinel);
            } else {
                container.appendChild(fragment);
                container.appendChild(sentinel);
            }
            currentIndex += CHUNK_SIZE;

            if (currentIndex >= sortedLog.length) {
                if (window._logScrollObserver) {
                    window._logScrollObserver.disconnect();
                    window._logScrollObserver = null;
                }
                if (sentinel.parentNode) sentinel.remove();
            }
        }

        renderChunk();

        if (currentIndex < sortedLog.length) {
            window._logScrollObserver = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) renderChunk();
            }, { root: container, rootMargin: '100px' });
            window._logScrollObserver.observe(sentinel);
        }
    }
}

async function deleteLogEntry(entryId) {
    if (!confirm('Are you sure you want to remove this entry? The words will be deducted from your stats.')) return;

    storage.local.get([STATS_LOG_KEY, 'ao3_stats_snapshots'], async (items) => {
        let log = [];
        try { log = JSON.parse(items[STATS_LOG_KEY] || '[]'); } catch (e) { }

        const index = log.findIndex(entry => entry.id === entryId);
        if (index === -1) return;

        const entryToRemove = log[index];
        const wordsToRemove = entryToRemove.words || 0;
        const workId = entryToRemove.workId;

        log.splice(index, 1);

        let snapshots = {};
        try { snapshots = JSON.parse(items.ao3_stats_snapshots || '{}'); } catch (e) { }

        if (workId && snapshots[workId]) {
            snapshots[workId] = Math.max(0, snapshots[workId] - wordsToRemove);
            if (snapshots[workId] === 0) delete snapshots[workId];
        }

        await storage.local.set({
            [STATS_LOG_KEY]: JSON.stringify(log),
            'ao3_stats_snapshots': JSON.stringify(snapshots)
        });

        loadAllStatsData();
    });
}

function renderRatingAnalytics(ratingsData, metadataMap) {
    const distribution = {};
    const fandomStats = {};
    const ficList = [];

    for (let i = 5.0; i >= 0.5; i -= 0.5) distribution[i.toFixed(1)] = 0;

    Object.entries(ratingsData).forEach(([workId, data]) => {
        let sum = 0, count = 0;
        Object.keys(data).forEach(key => {
            if (key !== '_meta') {
                const val = parseFloat(data[key]);
                if (!isNaN(val)) { sum += val; count++; }
            }
        });

        let average = 0;
        if (count > 0) { average = sum / count; }
        else if (data._meta && data._meta.globalRating) { average = data._meta.globalRating; }
        else { return; }

        const roundedAvg = (Math.round(average * 2) / 2).toFixed(1);
        if (distribution[roundedAvg] !== undefined) distribution[roundedAvg]++;

        const knownMeta = metadataMap[workId] || {};
        const internalMeta = data._meta || {};

        const title = knownMeta.title || internalMeta.title || `Work #${workId}`;
        const fandom = knownMeta.fandom || internalMeta.fandom || "Unknown Fandom";
        const author = knownMeta.author || internalMeta.author || "Unknown Author";

        if (!fandomStats[fandom]) fandomStats[fandom] = { sum: 0, count: 0 };
        fandomStats[fandom].sum += average;
        fandomStats[fandom].count++;

        ficList.push({ title, author, fandom, average, displayRating: average.toFixed(1) });
    });

    renderRatingDistribution(distribution);
    ficList.sort((a, b) => b.average - a.average || a.title.localeCompare(b.title));
    renderHallOfFame(ficList.slice(0, 5));
    renderFandomRatings(fandomStats);
}

function renderRatingDistribution(dist) {
    const container = document.getElementById('ratingDistributionContainer');
    if (!container) return;
    container.innerHTML = '';

    const nonZeroVals = Object.values(dist).filter(v => v > 0);
    const maxVal = nonZeroVals.length ? Math.max(...nonZeroVals) : 1;
    const keys = Object.keys(dist).sort((a, b) => b - a);

    let hasData = false;
    keys.forEach(score => {
        const count = dist[score];
        if (count === 0) return;
        hasData = true;
        const percent = (count / maxVal) * 100;
        container.innerHTML += `
            <div>
                <div class="flex-justify-between mb-1" style="font-size:0.85em;">
                    <span class="font-medium text-slate-700">★ ${score}</span>
                    <span class="text-slate-500 text-xs">${count}</span>
                </div>
                <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-indigo-600 h-2 rounded-full" style="width:${percent}%"></div>
                </div>
            </div>`;
    });

    if (!hasData) container.innerHTML = '<p class="text-slate-500 text-sm">No ratings logged yet.</p>';
}

function renderHallOfFame(topFics) {
    const container = document.getElementById('hallOfFameContainer');
    if (!container) return;
    container.innerHTML = '';

    if (topFics.length === 0) {
        container.innerHTML = '<div style="text-align:center;color:#94a3b8;padding:20px;">Rate stories to see them here.</div>';
        return;
    }

    topFics.slice(0, 3).forEach(fic => {
        container.innerHTML += `
            <div style="border:1px solid #e2e8f0;border-radius:8px;padding:12px;margin-bottom:10px;box-shadow:0 1px 2px rgba(0,0,0,0.05);">
                <div style="display:flex;justify-content:space-between;align-items:start;">
                    <div>
                        <div class="text-sm font-semibold text-slate-700">${fic.title}</div>
                        <div class="text-xxs text-slate-500">${fic.fandom}</div>
                        <div class="text-xxs text-slate-500" style="font-style:italic">by ${fic.author}</div>
                    </div>
                    <div style="text-align:right;">
                        <div style="font-weight:800;font-size:0.8em;color:#d97706;">★ ${fic.displayRating}</div>
                    </div>
                </div>
            </div>`;
    });
}

function renderFandomRatings(fandomStats) {
    const container = document.getElementById('fandomRatingContainer');
    if (!container) return;
    container.innerHTML = '';

    const list = Object.entries(fandomStats)
        .map(([name, data]) => ({ name, avg: (data.sum / data.count).toFixed(1), count: data.count }))
        .sort((a, b) => b.avg - a.avg);

    if (list.length === 0) { container.innerHTML = '<p class="text-slate-500 text-sm">No data.</p>'; return; }

    list.slice(0, 3).forEach(item => {
        container.innerHTML += `
            <div style="display:flex;justify-content:space-between;align-items:center;font-size:0.85em;padding:6px 0;border-bottom:1px dashed var(--border-color);">
                <span class="text-slate-700" style="font-weight:500;">${item.name}</span>
                <span class="text-slate-700" style="padding:2px 6px;border-radius:4px;font-weight:700;">${item.avg} ★</span>
            </div>`;
    });
}

// ============================================================
//  GENERIC NOTEBOOK RENDERER
// ============================================================

class NotebookRenderer {
    constructor(config) {
        this.dashboardId = config.dashboardId;
        this.searchInputId = config.searchInputId;
        this.emptyIconPath = config.emptyIconPath;
        this.emptyMessage = config.emptyMessage;
        this.chunkSize = config.chunkSize || 20;
        this.loadDataFn = config.loadDataFn;
        this.deleteItemFn = config.deleteItemFn;
        this.renderItemHtmlFn = config.renderItemHtmlFn;

        this.allData = [];
        this.filteredData = [];
        this.currentChunk = 0;
        this.isSearching = false;

        this.init();
    }

    async init() {
        const dashboard = document.getElementById(this.dashboardId);
        if (!dashboard) return;

        dashboard.innerHTML = '<div class="loading-spinner">Loading...</div>';

        this.allData = await this.loadDataFn();

        if (this.allData.length === 0) {
            dashboard.innerHTML = `
                <div class="no-highlights">
                    <span class="no-highlights-icon">${this.emptyIconPath}</span>
                    <p>${this.emptyMessage}</p>
                </div>`;
            return;
        }

        this.allData.sort((a, b) => {
            const titleA = (a.workTitle || `Work #${a.id}`).toLowerCase();
            const titleB = (b.workTitle || `Work #${b.id}`).toLowerCase();
            return titleA.localeCompare(titleB);
        });

        this.filteredData = [...this.allData];
        this.currentChunk = 0;
        dashboard.innerHTML = '';

        if (dashboard._scrollObserver) dashboard._scrollObserver.disconnect();

        if (!dashboard._sentinel) {
            dashboard._sentinel = document.createElement('div');
            dashboard._sentinel.style.height = '1px';
            dashboard._sentinel.style.width = '1px';
            dashboard._sentinel.className = 'notebook-sentinel';
        }

        dashboard._scrollObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !this.isSearching) {
                this.renderChunk();
            }
        }, { root: null, rootMargin: '200px' });

        const searchInput = document.getElementById(this.searchInputId);
        if (searchInput && !searchInput._searchListener) {
            searchInput._searchListener = (e) => {
                const query = e.target.value.toLowerCase().trim();
                if (!query) {
                    this.filteredData = [...this.allData];
                    this.isSearching = false;
                } else {
                    this.isSearching = true;
                    this.filteredData = this.allData.map(work => {
                        const title = (work.workTitle || '').toLowerCase();
                        const author = (work.workAuthor || '').toLowerCase();
                        if (title.includes(query) || author.includes(query)) return work;

                        if (work.chapters) {
                            let newChapters = {};
                            let matchFound = false;
                            for (const idx in work.chapters) {
                                const matchingItems = work.chapters[idx].filter(item => item.text.toLowerCase().includes(query));
                                if (matchingItems.length > 0) { newChapters[idx] = matchingItems; matchFound = true; }
                            }
                            if (matchFound) return { ...work, chapters: newChapters };
                        }
                        return null;
                    }).filter(w => w !== null);
                }
                dashboard.innerHTML = '';
                this.currentChunk = 0;
                this.renderChunk(this.isSearching);
            };
            searchInput.addEventListener('input', searchInput._searchListener);
        }

        this.renderChunk();
    }

    renderChunk(forceOpenAll = false) {
        const dashboard = document.getElementById(this.dashboardId);
        if (!dashboard) return;

        if (this.currentChunk >= this.filteredData.length && !this.isSearching) return;

        const chunk = this.isSearching
            ? this.filteredData
            : this.filteredData.slice(this.currentChunk, this.currentChunk + this.chunkSize);

        if (chunk.length === 0 && this.currentChunk === 0) {
            dashboard.innerHTML = '<div style="text-align:center;padding:20px;color:#666;">No matches found.</div>';
            return;
        }

        const fragment = document.createDocumentFragment();

        chunk.forEach(work => {
            const workCard = document.createElement('div');
            workCard.className = 'hl-work-card';
            workCard.setAttribute('data-work-key', work.key);

            const title = work.workTitle || `Work #${work.id}`;
            const author = work.workAuthor || 'Unknown Author';
            let itemCount = 0;
            if (work.chapters) itemCount = Object.values(work.chapters).reduce((sum, items) => sum + items.length, 0);

            workCard.innerHTML = `
                <div class="hl-work-header">
                    <div style="display:flex;gap:10px;flex:1;align-items:center;min-width:0;">
                        <span class="hl-arrow folder-icon" style="flex-shrink:0;">▶</span>
                        <div class="hl-work-title" style="min-width:0;">${title}</div>
                        <div class="hl-work-author text-slate-500 text-xs mt-1" style="flex-shrink:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">by ${author}</div>
                    </div>
                    <div style="display:flex;align-items:center;">
                        <span class="hl-count-badge" style="background:#eef2ff;color:#4f46e5;padding:2px 8px;border-radius:12px;font-size:0.75rem;font-weight:600;">${itemCount}</span>
                    </div>
                </div>
                <div class="hl-work-content"></div>`;

            const header = workCard.querySelector('.hl-work-header');
            const contentDiv = workCard.querySelector('.hl-work-content');

            header.addEventListener('click', () => {
                const isOpen = workCard.classList.contains('open');
                if (!isOpen) {
                    if (contentDiv.innerHTML === '') this.buildLazyAccordionContent(contentDiv, work, workCard, dashboard);
                    workCard.classList.add('open');
                } else {
                    workCard.classList.remove('open');
                }
            });

            if (this.isSearching || forceOpenAll) {
                this.buildLazyAccordionContent(contentDiv, work, workCard, dashboard);
                workCard.classList.add('open');
            }

            fragment.appendChild(workCard);
        });

        dashboard.appendChild(fragment);

        if (!this.isSearching) {
            this.currentChunk += this.chunkSize;
            if (this.currentChunk < this.filteredData.length) {
                dashboard.appendChild(dashboard._sentinel);
                dashboard._scrollObserver.observe(dashboard._sentinel);
            } else {
                if (dashboard._sentinel.parentNode) dashboard._sentinel.remove();
                dashboard._scrollObserver.disconnect();
            }
        } else {
            this.currentChunk = this.filteredData.length;
            if (dashboard._sentinel.parentNode) dashboard._sentinel.remove();
            dashboard._scrollObserver.disconnect();
        }
    }

    buildLazyAccordionContent(contentDiv, work, workCard, dashboard) {
        const chapters = work.chapters || {};
        const chapterIndexes = Object.keys(chapters).sort((a, b) => parseInt(a) - parseInt(b));
        const workUrl = `https://archiveofourown.org/works/${work.id}`;

        const fragment = document.createDocumentFragment();

        chapterIndexes.forEach(idx => {
            const items = chapters[idx];
            if (!items || items.length === 0) return;

            const chapterTitle = items[0].chapterName || `Chapter ${idx}`;
            const chapterLink = items[0].chapterUrl || workUrl;

            items.forEach(item => {
                const itemEl = document.createElement('div');
                itemEl.innerHTML = this.renderItemHtmlFn(work, idx, item, chapterTitle, chapterLink);
                const el = itemEl.firstElementChild;

                const chapterLinkEl = el.querySelector('.hl-chapter-link');
                if (chapterLinkEl) {
                    chapterLinkEl.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (typeof extAPI !== 'undefined') extAPI.tabs.create({ url: chapterLink });
                        else if (typeof browser !== 'undefined') browser.tabs.create({ url: chapterLink });
                        else chrome.tabs.create({ url: chapterLink });
                    });
                }

                const delBtn = el.querySelector('.delete-btn-card');
                if (delBtn) {
                    delBtn.onclick = async (e) => {
                        e.stopPropagation();
                        if (!confirm("Delete this item?")) return;

                        await this.deleteItemFn(work.key, idx, item.id);
                        el.remove();

                        if (workCard.querySelectorAll('.log-card').length === 0) {
                            workCard.remove();
                            this.allData = this.allData.filter(w => w.key !== work.key);
                            this.filteredData = this.filteredData.filter(w => w.key !== work.key);
                        } else {
                            const badge = workCard.querySelector('.hl-count-badge');
                            if (badge) badge.textContent = `${workCard.querySelectorAll('.log-card').length}`;
                        }

                        if (dashboard.querySelectorAll('.hl-work-card').length === 0) this.init();
                    };
                }

                fragment.appendChild(el);
            });
        });

        contentDiv.appendChild(fragment);
    }
}

// ============================================================
//  HIGHLIGHTS NOTEBOOK
// ============================================================

let highlightsRendererInstance = null;

async function renderHighlightsNotebook() {
    if (!highlightsRendererInstance) {
        highlightsRendererInstance = new NotebookRenderer({
            dashboardId: 'highlights-dashboard',
            searchInputId: 'highlight-search',
            emptyIconPath: `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                        stroke="currentColor" fill="none" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round"
                        class="icon icon-pen" width="40" height="40">
                    <path d="M12 20h9"/>
                    <path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4 12.5-12.5z"/>
                </svg>`,
            emptyMessage: 'Your notebook is empty. Start highlighting text on AO3 works!',
            loadDataFn: async () => {
                const items = await new Promise(resolve => { storage.local.get(null, resolve); });
                const hlKeys = Object.keys(items).filter(key => key.startsWith('ao3_hl_'));
                return hlKeys.map(key => {
                    let data = items[key];
                    if (typeof data === 'string') { try { data = JSON.parse(data); } catch (e) { return null; } }
                    return { id: key.replace('ao3_hl_', ''), key, ...data };
                }).filter(w => w !== null);
            },
            deleteItemFn: async (workKey, chapterIdx, hlId) => {
                const rawData = await new Promise(resolve => storage.local.get(workKey, items => resolve(items[workKey])));
                let data = rawData;
                if (typeof data === 'string') { try { data = JSON.parse(data); } catch (e) { return; } }
                if (!data?.chapters?.[chapterIdx]) return;
                data.chapters[chapterIdx] = data.chapters[chapterIdx].filter(hl => hl.id !== hlId);
                if (data.chapters[chapterIdx].length === 0) delete data.chapters[chapterIdx];

                if (Object.keys(data.chapters).length === 0) {
                    await new Promise(resolve => storage.local.remove(workKey, resolve));
                } else {
                    await new Promise(resolve => storage.local.set({ [workKey]: data }, resolve));
                }
            },
            renderItemHtmlFn: (work, idx, hl, chapterTitle, chapterLink) => {
                const colorClass = hl.color ? `border-${hl.color}` : 'border-yellow';
                let borderStyle = '';
                if (hl.color === 'yellow') borderStyle = 'border-left: 4px solid rgb(255, 235, 59);';
                else if (hl.color === 'pink') borderStyle = 'border-left: 4px solid rgb(233, 30, 99);';
                else if (hl.color === 'green') borderStyle = 'border-left: 4px solid rgb(34, 226, 76);';
                else if (hl.color === 'purple') borderStyle = 'border-left: 4px solid rgb(156, 39, 176);';

                const dateObj = new Date(hl.createdAt);
                const dateStr = !isNaN(dateObj.getTime())
                    ? dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    : '';

                return `
                    <div class="log-card hl-log-card ${colorClass}" style="${borderStyle}">
                        <div class="card-main">
                            <div class="card-header"><span class="card-date">${dateStr}</span></div>
                            <div class="hl-text text-slate-700" style="margin:4px 0;font-style:italic;font-size:0.85rem;">"${hl.text}"</div>
                            <div class="text-xs">
                                <a href="${chapterLink}" class="hl-chapter-link" style="color:inherit;text-decoration:none;">📄 ${chapterTitle}</a>
                            </div>
                        </div>
                        <button class="delete-btn-card" title="Delete Highlight">✕</button>
                    </div>`;
            }
        });
    } else {
        highlightsRendererInstance.init();
    }
}

// ============================================================
//  REVIEWS NOTEBOOK
// ============================================================

let reviewsRendererInstance = null;

async function renderReviewsNotebook() {
    if (!reviewsRendererInstance) {
        reviewsRendererInstance = new NotebookRenderer({
            dashboardId: 'notebook-dashboard',
            searchInputId: 'notebook-search',
            emptyIconPath: `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="40" height="40">
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                    <path d="M6.5 2L6 22" />
                </svg>`,
            emptyMessage: 'Your notebook is empty. Start reviewing chapters on AO3 works!',
            loadDataFn: async () => {
                const items = await new Promise(resolve => {
                    storage.local.get(['chapterReviews', 'ao3_read_works_storage', 'ao3_reading_log'], resolve);
                });

                let rawReviews = {};
                try { rawReviews = JSON.parse(items.chapterReviews || '{}'); } catch (e) { }

                let worksMeta = {};
                try { worksMeta = JSON.parse(items.ao3_read_works_storage || '{}'); } catch (e) { }

                let logs = [];
                try { logs = JSON.parse(items.ao3_reading_log || '[]'); } catch (e) { }

                const masterMeta = {};
                logs.forEach(entry => {
                    if (entry.workId) masterMeta[entry.workId] = { title: entry.title, author: entry.author };
                });
                Object.keys(worksMeta).forEach(workId => {
                    if (!masterMeta[workId]) masterMeta[workId] = { title: worksMeta[workId].title, author: worksMeta[workId].author };
                });

                const formattedReviews = [];
                for (const workId in rawReviews) {
                    const chapterKeys = Object.keys(rawReviews[workId]);
                    if (chapterKeys.length === 0) continue;

                    const metaObj = rawReviews[workId]._meta || {};
                    const title = metaObj.title || masterMeta[workId]?.title || `Work #${workId}`;
                    const author = metaObj.author || masterMeta[workId]?.author || 'Unknown Author';

                    const chaptersObj = {};
                    for (const chIdx of chapterKeys) {
                        if (chIdx === '_meta') continue;
                        const reviewData = rawReviews[workId][chIdx];

                        let text = reviewData;
                        let chapterUrl = `https://archiveofourown.org/works/${workId}/navigate`;

                        if (typeof reviewData === 'object' && reviewData !== null) {
                            text = reviewData.text;
                            chapterUrl = reviewData.url || chapterUrl;
                        }

                        chaptersObj[chIdx] = [{
                            id: `review_${chIdx}`,
                            text: text,
                            chapterName: `Chapter ${chIdx}`,
                            chapterUrl: chapterUrl
                        }];
                    }

                    formattedReviews.push({
                        key: workId,
                        id: workId,
                        workTitle: title,
                        workAuthor: author,
                        chapters: chaptersObj
                    });
                }
                return formattedReviews;
            },
            deleteItemFn: async (workKey, chapterIdx, itemId) => {
                const rawData = await new Promise(resolve => storage.local.get('chapterReviews', resolve));
                let reviews = {};
                try { reviews = JSON.parse(rawData.chapterReviews || '{}'); } catch (e) { }

                if (reviews[workKey] && reviews[workKey][chapterIdx]) {
                    delete reviews[workKey][chapterIdx];
                    if (Object.keys(reviews[workKey]).length === 0) {
                        delete reviews[workKey];
                    }
                    await new Promise(resolve => storage.local.set({ chapterReviews: JSON.stringify(reviews) }, resolve));
                }
            },
            renderItemHtmlFn: (work, idx, review, chapterTitle, chapterLink) => {
                return `
                    <div class="log-card hl-log-card" style="border-left: 4px solid #4f46e5;">
                        <div class="card-main">
                            <div class="hl-text text-slate-700" style="margin:4px 0;font-size:0.85rem;white-space:pre-wrap;">${review.text}</div>
                            <div class="text-xs mt-2">
                                <a href="${chapterLink}" class="hl-chapter-link" style="color:#64748b;text-decoration:none;font-weight:500;">📝 ${chapterTitle}</a>
                            </div>
                        </div>
                        <button class="delete-btn-card" title="Delete Review">✕</button>
                    </div>`;
            }
        });
    } else {
        reviewsRendererInstance.init();
    }
}

// ============================================================
//  INITIALISATION
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    restoreOptions();
    setupSidebar();
    setupProviderSelector();
    setupColorSyncing();

    const globalScrollToggle = document.getElementById('infiniteScrollGlobal');
    if (globalScrollToggle) {
        globalScrollToggle.addEventListener('change', (e) => toggleInfiniteScrollSubSwitches(e.target.checked));
    }

    // Open the first panel on load
    openPanel('panelCustom');

    // Stats refresh button
    const refreshDataBtn = document.getElementById('refreshStatsDataBtn');
    if (refreshDataBtn) refreshDataBtn.addEventListener('click', () => loadAllStatsData());

    // PRO activation
    const btnActivatePro = document.getElementById('btnActivatePro');
    if (btnActivatePro) btnActivatePro.addEventListener('click', handleProActivation);

    // PRO-gated grouping toggle: intercept click when disabled
    const groupingCheckboxWrapper = document.getElementById('groupingCheckboxWrapper');
    if (groupingCheckboxWrapper) {
        groupingCheckboxWrapper.addEventListener('click', (e) => {
            const groupingCheckbox = document.getElementById('enableBookmarkGrouping');
            if (groupingCheckbox && groupingCheckbox.disabled) {
                e.preventDefault();
                e.stopPropagation();
                alert('This feature requires an active AO3 Marker PRO License.');
            }
        }, true);
    }

    // PRO-gated highlights toggle: intercept click when disabled
    const highlightsCheckboxWrapper = document.getElementById('highlightsCheckboxWrapper');
    if (highlightsCheckboxWrapper) {
        highlightsCheckboxWrapper.addEventListener('click', (e) => {
            const highlightsCheckbox = document.getElementById('ao3_enable_highlights');
            if (highlightsCheckbox && highlightsCheckbox.disabled) {
                e.preventDefault();
                e.stopPropagation();
                alert('This feature requires an active AO3 Marker PRO License.');
            }
        }, true);
    }

    // Buy PRO link
    const buyProLink = document.getElementById('buyProLink');
    if (buyProLink) {
        buyProLink.addEventListener('click', (e) => {
            e.preventDefault();
            extAPI.tabs.create({ url: GUMROAD_CHECKOUT_URL });
        });
    }

    // Promo text links
    const proPromoTextLink = document.getElementById('proPromoText');
    if (proPromoTextLink) {
        proPromoTextLink.addEventListener('click', (e) => {
            e.preventDefault();
            extAPI.tabs.create({ url: GUMROAD_CHECKOUT_URL });
        });
    }

    const proPromoText2Link = document.getElementById('proPromoText2');
    if (proPromoText2Link) {
        proPromoText2Link.addEventListener('click', (e) => {
            e.preventDefault();
            extAPI.tabs.create({ url: GUMROAD_CHECKOUT_URL });
        });
    }

    const proPromoBooksStats = document.getElementById('proPromoBooksStats');
    if (proPromoBooksStats) {
        proPromoBooksStats.addEventListener('click', (e) => {
            e.preventDefault();
            extAPI.tabs.create({ url: GUMROAD_CHECKOUT_URL });
        });
    }

    // Sync Highlights nav visibility whenever the toggle changes
    const hlToggleCheckbox = document.getElementById('ao3_enable_highlights');
    if (hlToggleCheckbox) {
        hlToggleCheckbox.addEventListener('change', () => {
            updateHighlightsTabVisibility(hlToggleCheckbox.checked);
        });
    }

    // [WTR] Real-time master-toggle: lock/unlock nested options instantly
    const wtrMasterToggle = document.getElementById('ao3_wtr_enabled');
    if (wtrMasterToggle) {
        wtrMasterToggle.addEventListener('change', () => {
            storage.local.get(IS_PRO_USER_KEY, (items) => {
                updateWTRUIState(!!items[IS_PRO_USER_KEY], wtrMasterToggle.checked);
            });
        });
    }

    // [WTR] Promo text link → Gumroad checkout
    const proPromoWTRLink = document.getElementById('proPromoTextWTR');
    if (proPromoWTRLink) {
        proPromoWTRLink.addEventListener('click', (e) => {
            e.preventDefault();
            extAPI.tabs.create({ url: GUMROAD_CHECKOUT_URL });
        });
    }

    const goalYearLabel = document.getElementById('goalYearLabel');
    if (goalYearLabel) {
        goalYearLabel.textContent = new Date().getFullYear();
    }

    updateStorageUsage();
});

// Event listeners that can be safely bound after DOMContentLoaded
const saveBtn = document.getElementById('saveButton');
if (saveBtn) saveBtn.addEventListener('click', saveOptions);



const resetColorsBtn = document.getElementById('resetColorsBtn');
if (resetColorsBtn) {
    resetColorsBtn.addEventListener('click', () => {
        // Revert UI to default hex values
        document.getElementById('color-read').value = '#28a745';
        document.getElementById('hex-color-read').value = '#28A745';
        document.getElementById('color-updated').value = '#ffc107';
        document.getElementById('hex-color-updated').value = '#FFC107';
        document.getElementById('color-partial').value = '#17a2b8';
        document.getElementById('hex-color-partial').value = '#17A2B8';
        document.getElementById('color-do-not-read').value = '#dc3545';
        document.getElementById('hex-color-do-not-read').value = '#DC3545';
        const wtrInput = document.getElementById('color-wtr');
        if (wtrInput) wtrInput.value = '#6f42c1';
        if (document.getElementById('hex-color-wtr')) document.getElementById('hex-color-wtr').value = '#6F42C1';

        // Save default hex values to local storage immediately
        storage.local.set({
            [COLOR_READ_KEY]: '#28a745',
            [COLOR_UPDATED_KEY]: '#ffc107',
            [COLOR_PARTIAL_KEY]: '#17a2b8',
            [COLOR_DONOTREAD_KEY]: '#dc3545',
            [COLOR_WTR_KEY]: '#6f42c1'
        }, () => {
            showToast('Colors reset to default!');
        });
    });
}

// Storage Usage Indicator
async function updateStorageUsage() {
    const usageText = document.getElementById('storageUsageText');
    const usageBar = document.getElementById('storageUsageBar');
    const quotaText = document.getElementById('storageUsageQuota');
    const warningText = document.getElementById('storageWarningText');

    if (!usageText || !usageBar) return;

    try {
        // Get bytes in use from chrome.storage.local
        const bytesInUse = await new Promise(resolve => {
            storage.local.getBytesInUse(null, resolve);
        });

        // Get quota from navigator.storage (if available)
        let quotaBytes = 100 * 1024 * 1024; // Default visual fallback 100MB
        if (navigator.storage && navigator.storage.estimate) {
            const estimate = await navigator.storage.estimate();
            if (estimate.quota) {
                quotaBytes = estimate.quota;
            }
        }

        const mbInUse = (bytesInUse / (1024 * 1024)).toFixed(2);
        const mbQuota = (quotaBytes / (1024 * 1024)).toFixed(0);

        usageText.textContent = `${mbInUse} MB`;
        if (quotaText) quotaText.textContent = `of ~${mbQuota} MB available`;

        // Calculate percentage for the bar
        let percent = (bytesInUse / quotaBytes) * 100;
        if (percent > 100) percent = 100;
        usageBar.style.width = `${percent}%`;

        // Colors
        if (percent > 80) {
            usageBar.style.backgroundColor = '#ef4444'; // Red
        } else if (percent > 50) {
            usageBar.style.backgroundColor = '#f59e0b'; // Amber
        } else {
            usageBar.style.backgroundColor = '#3b82f6'; // Blue
        }

        // Show warning if over 50MB (absolute limit for safety reminder)
        if (warningText) {
            if (bytesInUse > 50 * 1024 * 1024) {
                warningText.style.display = 'block';
            } else {
                warningText.style.display = 'none';
            }
        }

    } catch (err) {
        console.error('Error calculating storage usage:', err);
        usageText.textContent = 'Error';
    }
}
