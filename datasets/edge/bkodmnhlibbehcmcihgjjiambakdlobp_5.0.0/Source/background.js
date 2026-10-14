import { DEFAULT_OPTIONS } from './defaults.js';

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.get(DEFAULT_OPTIONS, (data) => {
        if (chrome.runtime.lastError) {
            console.error('Storage error:', chrome.runtime.lastError);
            return;
        }

        // Migrate settings, preserving user values
        chrome.storage.sync.set({
            default_ebay_site: data.default_ebay_site,
            default_ebay_site_text: data.default_ebay_site_text,
            search_sold: data.search_sold,
            search_completed: data.search_completed,
            search_title_desc: data.search_title_desc,
            search_sort: data.search_sort,
            buying_auction: data.buying_auction,
            buying_buy_now: data.buying_buy_now,
            buying_best_offer: data.buying_best_offer,
            price_min: data.price_min || DEFAULT_OPTIONS.price_min,
            price_max: data.price_max || DEFAULT_OPTIONS.price_max,
            free_shipping: data.free_shipping || DEFAULT_OPTIONS.free_shipping,
            location_pref: data.location_pref,
            wintype_pref: data.wintype_pref,
            use_saved_options_for_freeform: data.use_saved_options_for_freeform,
            search_history: data.search_history,
            use_options: data.use_options,
            history_limit: data.history_limit || DEFAULT_OPTIONS.history_limit,
            theme_preference: data.theme_preference || DEFAULT_OPTIONS.theme_preference,
            display_mode: data.display_mode || DEFAULT_OPTIONS.display_mode,
        });

        // Set up the context menu
        chrome.contextMenus.create({
            id: 'searchEbayMenu',
            title: 'Search for \'%s\' on eBay',
            contexts: ['selection']
        });
    });
});


function buildEbaySearchUrl( searchSelection, ebaySearchItems, info ) {
    let {
        default_ebay_site,
        search_sold,
        search_completed,
        search_title_desc,
        search_sort,
        buying_auction,
        buying_buy_now,
        buying_best_offer,
        price_min,
        price_max,
        free_shipping,
        display_mode,
        location_pref,
        use_saved_options_for_freeform
    } = ebaySearchItems;
    const context = info.context;
    const ebaySearchSold = ~~search_sold;
    let ebaySearchCompleted = ~~search_completed;
    if (ebaySearchSold) ebaySearchCompleted = 1;
    const ebaySearchLocationPref = location_pref !== null ? location_pref : 0;
    const searchOptionsEnabled = ((context === 'contextMenu') ||
        (context !== 'contextMenu' && use_saved_options_for_freeform && (info.data && info.data.use_options)));

    let ebaySearchUrl = `${default_ebay_site}_nkw=${encodeURIComponent(searchSelection)}`;
    if (ebaySearchLocationPref === 2) {
        ebaySearchUrl += `&rt=nc`;
    }
    if (searchOptionsEnabled) {
        ebaySearchUrl += `&_sop=${search_sort}&LH_Complete=${ebaySearchCompleted}&LH_Sold=${ebaySearchSold}`;
        if (ebaySearchLocationPref) ebaySearchUrl += `&LH_PrefLoc=${ebaySearchLocationPref}`;
        // Title & Description search
        if (search_title_desc) ebaySearchUrl += `&LH_TitleDesc=1`;
        // Buying format options
        if (buying_auction) ebaySearchUrl += `&LH_Auction=1`;
        if (buying_buy_now) ebaySearchUrl += `&LH_BIN=1`;
        if (buying_best_offer) ebaySearchUrl += `&LH_BO=1`;
        // Price range
        if (price_min) ebaySearchUrl += `&_udlo=${price_min}`;
        if (price_max) ebaySearchUrl += `&_udhi=${price_max}`;
        // Free shipping
        if (free_shipping) ebaySearchUrl += `&LH_FS=1`;
        // Display mode (list/gallery view)
        if (display_mode && display_mode !== '0') ebaySearchUrl += `&_dmd=${display_mode}`;
    }
    return ebaySearchUrl;
}

function onClickHandler(info) {
    if (!info || (info && info.menuItemId === 'searchEbayMenu' && !info.selectionText)
        || (info && info.action === 'invokeOnClickHandler' && !info.data?.search)) {
        return; // No selection text or search text provided
    }
    info.context = "contextMenu";
    chrome.storage.sync.get([
        'default_ebay_site',
        'search_sold',
        'search_completed',
        'search_title_desc',
        'search_sort',
        'buying_auction',
        'buying_buy_now',
        'buying_best_offer',
        'price_min',
        'price_max',
        'free_shipping',
        'display_mode',
        'location_pref',
        'wintype_pref',
        'use_saved_options_for_freeform',
        'search_history',
        'history_limit',
    ], (items) => {
        if (chrome.runtime.lastError) {
            console.error('Storage error:', chrome.runtime.lastError);
            return;
        }

        const searchSelection = info.selectionText || info.data.search;
        const ebaySearchUrl = buildEbaySearchUrl(searchSelection, items, info);
        const historyLimit = items.history_limit || DEFAULT_OPTIONS.history_limit;

        // Save the search history
        updateHistory(searchSelection, ebaySearchUrl, items.search_history || [], historyLimit);

        // Open the page up.
        const wintypePref = items.wintype_pref;
        switch (wintypePref) {
            case 'newtab':
                chrome.tabs.create({
                    'url': ebaySearchUrl,
                    'active': true,
                });
                break;
            case 'newwin':
                chrome.windows.create({
                    'url': ebaySearchUrl,
                    'focused': true,
                    'type': 'normal',
                });
                break;
            case 'sametab':
                openInSameTab(ebaySearchUrl);
                break;
            default:
                chrome.tabs.create({
                    'url': ebaySearchUrl,
                    'active': true,
                });
                break;
        }
    });
}


function updateHistory(term, url, history, maxHistory = 5) {
    // Remove duplicate if exists (update position instead of adding duplicate)
    const existingIndex = history.findIndex(item => item.term.toLowerCase() === term.toLowerCase());
    if (existingIndex !== -1) {
        history.splice(existingIndex, 1);
    }

    // Add to front
    history.unshift({ term: term, url: url });

    // Trim to max length
    if (history.length > maxHistory) {
        history = history.slice(0, maxHistory);
    }

    chrome.storage.sync.set({ search_history: history });
}

// Navigate in the same tab
function openInSameTab(url) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
            chrome.tabs.update(tabs[0].id, { url: url });
        }
    });
}

chrome.runtime.onMessageExternal.addListener(function ( request ) {
    if (request) {
        if (request.msg === 'popupSearch') {
            onClickHandler(request);
        }
    }
    return true;
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "invokeOnClickHandler") {
        request.context = "contextMenu";
        onClickHandler(request);
        sendResponse({ status: "success", request: request });
    }
});

chrome.contextMenus.onClicked.addListener(onClickHandler);

chrome.action.onClicked.addListener(( tab ) => {
    onClickHandler(tab);
});

// Omnibox support - type "ebay" in address bar, then Tab/Space, then search term
chrome.omnibox.onInputEntered.addListener((text) => {
    if (!text.trim()) return;

    // Trigger search with the entered text
    onClickHandler({
        action: 'invokeOnClickHandler',
        context: 'contextMenu',
        data: {
            search: text.trim(),
            use_options: true
        }
    });
});

// Keyboard shortcut support (Alt+Shift+E)
chrome.commands.onCommand.addListener((command) => {
    if (command === 'search-selection') {
        // Get the selected text from the active tab
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (!tabs[0]) return;

            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: () => window.getSelection().toString()
            }, (results) => {
                if (chrome.runtime.lastError) {
                    console.error('Script error:', chrome.runtime.lastError);
                    return;
                }

                const selectedText = results?.[0]?.result?.trim();
                if (selectedText) {
                    onClickHandler({
                        action: 'invokeOnClickHandler',
                        context: 'contextMenu',
                        data: {
                            search: selectedText,
                            use_options: true
                        }
                    });
                }
            });
        });
    }
});

