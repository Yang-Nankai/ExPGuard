// Search eBay Extension - Popup Script
// Version 5.0.0

import { DEFAULT_OPTIONS } from './defaults.js';

// DOM element references
const elements = {
    searchForm: () => document.getElementById('searchForm'),
    searchInput: () => document.getElementById('search'),
    useOptionsCheckbox: () => document.getElementById('useOptions'),
    optionsLink: () => document.getElementById('optionsLink'),
    searchBtn: () => document.getElementById('searchBtn'),
    searchBtnText: () => document.getElementById('searchBtnText'),
    searchSpinner: () => document.getElementById('searchSpinner'),
    historyList: () => document.getElementById('historyList'),
    emptyState: () => document.getElementById('emptyState'),
    deleteAllBtn: () => document.getElementById('deleteAllBtn'),
    siteBadge: () => document.getElementById('ebaySiteBadge'),
    autocompleteDropdown: () => document.getElementById('autocompleteDropdown'),
    searchModeHint: () => document.getElementById('searchModeHint'),
};

// State
let searchHistory = [];
let selectedAutocompleteIndex = -1;

// Initialize popup
document.addEventListener('DOMContentLoaded', () => {
    const optionsUrl = chrome.runtime.getURL('options.html');
    elements.optionsLink().href = optionsUrl;

    // Load settings and history
    chrome.storage.sync.get(DEFAULT_OPTIONS, (items) => {
        if (chrome.runtime.lastError) {
            console.error('Storage error:', chrome.runtime.lastError);
            return;
        }

        // Apply theme
        applyTheme(items.theme_preference || 'auto');

        // Set site badge
        const siteName = items.default_ebay_site_text || 'United States';
        elements.siteBadge().textContent = siteName;

        // Set use options checkbox
        elements.useOptionsCheckbox().checked = items.use_saved_options_for_freeform;

        // Show search mode hint if title & description search is enabled
        if (items.search_title_desc && items.use_saved_options_for_freeform) {
            elements.searchModeHint().classList.remove('hidden');
        }

        // Store history for autocomplete
        searchHistory = items.search_history || [];

        // Render history
        renderSearchHistory(searchHistory);
    });

    // Event listeners
    setupEventListeners();
});

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

// Set up all event listeners
function setupEventListeners() {
    // Use options checkbox
    elements.useOptionsCheckbox().addEventListener('change', (e) => {
        chrome.storage.sync.set({ use_saved_options_for_freeform: e.target.checked });
        // Update search mode hint visibility
        chrome.storage.sync.get(['search_title_desc'], (items) => {
            if (items.search_title_desc && e.target.checked) {
                elements.searchModeHint().classList.remove('hidden');
            } else {
                elements.searchModeHint().classList.add('hidden');
            }
        });
    });

    // Search form submit
    elements.searchForm().addEventListener('submit', handleSearch);

    // Delete all button
    elements.deleteAllBtn().addEventListener('click', handleDeleteAll);

    // Autocomplete
    const searchInput = elements.searchInput();
    searchInput.addEventListener('input', handleAutocompleteInput);
    searchInput.addEventListener('keydown', handleAutocompleteKeydown);
    searchInput.addEventListener('blur', () => {
        // Delay hide to allow click on dropdown items
        setTimeout(() => hideAutocomplete(), 150);
    });

    // History list delegation for delete buttons
    elements.historyList().addEventListener('click', handleHistoryClick);
}

// Handle search form submission
function handleSearch(e) {
    e.preventDefault();

    const searchTerm = elements.searchInput().value.trim();
    if (!searchTerm) return;

    // Show loading state
    setLoadingState(true);

    const useOptions = elements.useOptionsCheckbox().checked;

    chrome.runtime.sendMessage({
        action: 'invokeOnClickHandler',
        data: {
            search: searchTerm,
            use_options: useOptions
        }
    }, (response) => {
        setLoadingState(false);
        if (chrome.runtime.lastError) {
            console.error('Message error:', chrome.runtime.lastError);
        }
    });
}

// Set loading state on search button
function setLoadingState(loading) {
    const btnText = elements.searchBtnText();
    const spinner = elements.searchSpinner();
    const btn = elements.searchBtn();

    if (loading) {
        btnText.textContent = 'Searching...';
        spinner.classList.remove('hidden');
        btn.disabled = true;
    } else {
        btnText.textContent = 'Search eBay';
        spinner.classList.add('hidden');
        btn.disabled = false;
    }
}

// Clear all children from an element safely
function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

// Render search history list
function renderSearchHistory(history) {
    const historyList = elements.historyList();
    const emptyState = elements.emptyState();
    const deleteAllBtn = elements.deleteAllBtn();

    clearElement(historyList);

    if (!history || history.length === 0) {
        emptyState.classList.remove('hidden');
        deleteAllBtn.classList.add('hidden');
        return;
    }

    emptyState.classList.add('hidden');
    deleteAllBtn.classList.remove('hidden');

    history.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'history-item fade-in';
        li.dataset.index = index;

        const link = document.createElement('a');
        link.href = item.url;
        link.textContent = item.term;
        link.title = item.term;
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // Open in configured way via background script
            chrome.runtime.sendMessage({
                action: 'invokeOnClickHandler',
                data: {
                    search: item.term,
                    use_options: elements.useOptionsCheckbox().checked
                }
            });
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = '\u00D7'; // multiplication sign (x)
        deleteBtn.setAttribute('aria-label', `Delete "${item.term}" from history`);
        deleteBtn.dataset.deleteIndex = index;

        li.appendChild(link);
        li.appendChild(deleteBtn);
        historyList.appendChild(li);
    });
}

// Handle clicks on history list (event delegation)
function handleHistoryClick(e) {
    const deleteBtn = e.target.closest('.delete-btn');
    if (deleteBtn) {
        const index = parseInt(deleteBtn.dataset.deleteIndex, 10);
        deleteSearchItem(index);
    }
}

// Delete a single search item
function deleteSearchItem(index) {
    chrome.storage.sync.get(['search_history'], (result) => {
        if (chrome.runtime.lastError) {
            console.error('Storage error:', chrome.runtime.lastError);
            return;
        }

        const history = result.search_history || [];
        history.splice(index, 1);

        chrome.storage.sync.set({ search_history: history }, () => {
            searchHistory = history;
            renderSearchHistory(history);
        });
    });
}

// Handle delete all
function handleDeleteAll() {
    if (!confirm('Delete all search history?')) return;

    chrome.storage.sync.set({ search_history: [] }, () => {
        searchHistory = [];
        renderSearchHistory([]);
    });
}

// Autocomplete functions
function handleAutocompleteInput(e) {
    const query = e.target.value.trim().toLowerCase();

    if (!query || searchHistory.length === 0) {
        hideAutocomplete();
        return;
    }

    const matches = searchHistory.filter(item =>
        item.term.toLowerCase().includes(query)
    ).slice(0, 5);

    if (matches.length === 0) {
        hideAutocomplete();
        return;
    }

    showAutocomplete(matches);
}

function showAutocomplete(matches) {
    const dropdown = elements.autocompleteDropdown();
    clearElement(dropdown);
    selectedAutocompleteIndex = -1;

    matches.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'autocomplete-item';
        div.textContent = item.term;
        div.dataset.index = index;
        div.addEventListener('mousedown', () => {
            elements.searchInput().value = item.term;
            hideAutocomplete();
        });
        dropdown.appendChild(div);
    });

    dropdown.classList.remove('hidden');
}

function hideAutocomplete() {
    elements.autocompleteDropdown().classList.add('hidden');
    selectedAutocompleteIndex = -1;
}

function handleAutocompleteKeydown(e) {
    const dropdown = elements.autocompleteDropdown();
    if (dropdown.classList.contains('hidden')) return;

    const items = dropdown.querySelectorAll('.autocomplete-item');
    if (items.length === 0) return;

    if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedAutocompleteIndex = Math.min(selectedAutocompleteIndex + 1, items.length - 1);
        updateAutocompleteSelection(items);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedAutocompleteIndex = Math.max(selectedAutocompleteIndex - 1, -1);
        updateAutocompleteSelection(items);
    } else if (e.key === 'Enter' && selectedAutocompleteIndex >= 0) {
        e.preventDefault();
        elements.searchInput().value = items[selectedAutocompleteIndex].textContent;
        hideAutocomplete();
    } else if (e.key === 'Escape') {
        hideAutocomplete();
    }
}

function updateAutocompleteSelection(items) {
    items.forEach((item, index) => {
        if (index === selectedAutocompleteIndex) {
            item.classList.add('selected');
        } else {
            item.classList.remove('selected');
        }
    });
}
