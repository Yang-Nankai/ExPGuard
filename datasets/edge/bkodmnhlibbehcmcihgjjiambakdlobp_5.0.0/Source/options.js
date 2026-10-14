// Search eBay Extension - Options Script
// Version 5.0.0

import { DEFAULT_OPTIONS } from './defaults.js';

// DOM element references
const elements = {
    ebaysite: () => document.getElementById('ebaysite'),
    titleDesc: () => document.getElementById('titleDesc'),
    completed: () => document.getElementById('completed'),
    sold: () => document.getElementById('sold'),
    buyingAuction: () => document.getElementById('buyingAuction'),
    buyingBuyNow: () => document.getElementById('buyingBuyNow'),
    buyingBestOffer: () => document.getElementById('buyingBestOffer'),
    priceMin: () => document.getElementById('priceMin'),
    priceMax: () => document.getElementById('priceMax'),
    freeShipping: () => document.getElementById('freeShipping'),
    sorting: () => document.getElementById('sorting'),
    themePref: () => document.getElementById('themePref'),
    displayMode: () => document.getElementById('displayMode'),
    wintypePref: () => document.getElementById('wintypePref'),
    historyLimit: () => document.getElementById('historyLimit'),
    canLocation: () => document.getElementById('canLocation'),
    ukLocation: () => document.getElementById('ukLocation'),
    canadaOptions: () => document.getElementById('canadaOptions'),
    ukOptions: () => document.getElementById('ukOptions'),
    endedRecently: () => document.getElementById('endedRecently'),
    saveBtn: () => document.getElementById('saveBtn'),
    resetBtn: () => document.getElementById('resetBtn'),
    exportBtn: () => document.getElementById('exportBtn'),
    importBtn: () => document.getElementById('importBtn'),
    importFile: () => document.getElementById('importFile'),
    statusMessage: () => document.getElementById('statusMessage'),
};

// Initialize options page
document.addEventListener('DOMContentLoaded', () => {
    restoreOptions();
    setupEventListeners();
});

// Set up all event listeners
function setupEventListeners() {
    // Save button
    elements.saveBtn().addEventListener('click', saveOptions);

    // Reset button
    elements.resetBtn().addEventListener('click', resetToDefaults);

    // Export/Import buttons
    elements.exportBtn().addEventListener('click', exportSettings);
    elements.importBtn().addEventListener('click', () => elements.importFile().click());
    elements.importFile().addEventListener('change', importSettings);

    // eBay site change - show/hide regional options
    elements.ebaysite().addEventListener('change', updateRegionalOptions);

    // Completed/Sold checkboxes - show/hide "Ended Recently" sort option
    elements.completed().addEventListener('change', updateEndedRecentlyVisibility);
    elements.sold().addEventListener('change', updateEndedRecentlyVisibility);

    // Theme change - apply immediately
    elements.themePref().addEventListener('change', () => {
        applyTheme(elements.themePref().value);
    });
}

// Restore saved options
function restoreOptions() {
    chrome.storage.sync.get(DEFAULT_OPTIONS, (items) => {
        if (chrome.runtime.lastError) {
            showStatus('Error loading settings', 'error');
            return;
        }

        // Set form values
        elements.ebaysite().value = items.default_ebay_site;
        elements.titleDesc().checked = items.search_title_desc;
        elements.completed().checked = items.search_completed;
        elements.sold().checked = items.search_sold;
        elements.buyingAuction().checked = items.buying_auction;
        elements.buyingBuyNow().checked = items.buying_buy_now;
        elements.buyingBestOffer().checked = items.buying_best_offer;
        elements.priceMin().value = items.price_min || '';
        elements.priceMax().value = items.price_max || '';
        elements.freeShipping().checked = items.free_shipping;
        elements.sorting().value = items.search_sort;
        elements.themePref().value = items.theme_preference || 'auto';
        elements.displayMode().value = items.display_mode || '0';
        elements.wintypePref().value = items.wintype_pref;
        elements.historyLimit().value = items.history_limit || 5;

        // Apply theme
        applyTheme(items.theme_preference || 'auto');

        // Set regional options
        if (items.location_pref) {
            elements.canLocation().value = items.location_pref;
            elements.ukLocation().value = items.location_pref;
        }

        // Update UI visibility
        updateRegionalOptions();
        updateEndedRecentlyVisibility();
    });
}

// Save options
function saveOptions() {
    const selectedSite = elements.ebaysite();
    const selectedOption = selectedSite.options[selectedSite.selectedIndex];

    const dataToSave = {
        default_ebay_site: selectedOption.value,
        default_ebay_site_text: selectedOption.text,
        search_title_desc: elements.titleDesc().checked,
        search_completed: elements.completed().checked,
        search_sold: elements.sold().checked,
        buying_auction: elements.buyingAuction().checked,
        buying_buy_now: elements.buyingBuyNow().checked,
        buying_best_offer: elements.buyingBestOffer().checked,
        price_min: elements.priceMin().value,
        price_max: elements.priceMax().value,
        free_shipping: elements.freeShipping().checked,
        search_sort: elements.sorting().value,
        theme_preference: elements.themePref().value,
        display_mode: elements.displayMode().value,
        wintype_pref: elements.wintypePref().value,
        history_limit: parseInt(elements.historyLimit().value, 10),
        location_pref: getLocationPreference(),
    };

    chrome.storage.sync.set(dataToSave, () => {
        if (chrome.runtime.lastError) {
            showStatus('Error saving settings', 'error');
            return;
        }
        showStatus('Options saved!', 'success');
    });
}

// Get location preference based on selected site
function getLocationPreference() {
    const canadaOptions = elements.canadaOptions();
    const ukOptions = elements.ukOptions();

    if (!canadaOptions.classList.contains('hidden')) {
        return elements.canLocation().value;
    } else if (!ukOptions.classList.contains('hidden')) {
        return elements.ukLocation().value;
    }
    return null;
}

// Update regional options visibility based on selected site
function updateRegionalOptions() {
    const selectedSite = elements.ebaysite();
    const selectedOption = selectedSite.options[selectedSite.selectedIndex];
    const siteId = selectedOption.id;

    const canadaOptions = elements.canadaOptions();
    const ukOptions = elements.ukOptions();

    // Hide all regional options first
    canadaOptions.classList.add('hidden');
    ukOptions.classList.add('hidden');

    // Show relevant regional options
    if (siteId === 'gf-CA') {
        canadaOptions.classList.remove('hidden');
    } else if (siteId === 'gf-GB') {
        ukOptions.classList.remove('hidden');
    }
}

// Show/hide "Ended Recently" sort option
function updateEndedRecentlyVisibility() {
    const endedRecently = elements.endedRecently();
    const isCompletedOrSold = elements.completed().checked || elements.sold().checked;

    if (isCompletedOrSold) {
        endedRecently.classList.remove('hidden');
    } else {
        endedRecently.classList.add('hidden');
        // If "Ended Recently" was selected, reset to default
        if (elements.sorting().value === '13') {
            elements.sorting().value = '12';
        }
    }
}

// Reset to default options
function resetToDefaults() {
    if (!confirm('Reset all settings to defaults?')) return;

    chrome.storage.sync.set(DEFAULT_OPTIONS, () => {
        if (chrome.runtime.lastError) {
            showStatus('Error resetting settings', 'error');
            return;
        }
        restoreOptions();
        showStatus('Settings reset to defaults', 'success');
    });
}

// Export settings to JSON file
function exportSettings() {
    chrome.storage.sync.get(null, (items) => {
        if (chrome.runtime.lastError) {
            showStatus('Error exporting settings', 'error');
            return;
        }

        const dataStr = JSON.stringify(items, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'search-ebay-settings.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        showStatus('Settings exported!', 'success');
    });
}

// Import settings from JSON file
function importSettings(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const settings = JSON.parse(event.target.result);

            // Validate that it looks like our settings
            if (!settings.default_ebay_site) {
                throw new Error('Invalid settings file');
            }

            // Merge with defaults to ensure all keys exist
            const mergedSettings = { ...DEFAULT_OPTIONS, ...settings };

            chrome.storage.sync.set(mergedSettings, () => {
                if (chrome.runtime.lastError) {
                    showStatus('Error importing settings', 'error');
                    return;
                }
                restoreOptions();
                showStatus('Settings imported!', 'success');
            });
        } catch (err) {
            showStatus('Invalid settings file', 'error');
        }
    };
    reader.readAsText(file);

    // Reset file input
    e.target.value = '';
}

// Show status message
function showStatus(message, type) {
    const statusEl = elements.statusMessage();
    statusEl.textContent = message;
    statusEl.className = 'status-message status-' + type;
    statusEl.classList.remove('hidden');

    setTimeout(() => {
        statusEl.classList.add('hidden');
    }, 3000);
}

// Apply theme to document
function applyTheme(theme) {
    document.documentElement.removeAttribute('data-theme');

    if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    } else if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    // 'auto' uses CSS prefers-color-scheme (no data-theme attribute)
}
