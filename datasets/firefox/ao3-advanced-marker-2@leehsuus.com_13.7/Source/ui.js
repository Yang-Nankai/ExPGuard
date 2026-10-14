// ui.js - Interface de Usuário e Manipulação de DOM

// --- Buttons & Actions Builders ---
function setupBackToTopButton() {
    if (document.getElementById('marker-back-to-top')) return;

    const toTopButton = document.createElement('a');
    toTopButton.id = 'marker-back-to-top';
    toTopButton.href = '#';
    toTopButton.textContent = '↑';
    document.body.appendChild(toTopButton);

    toTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) toTopButton.classList.add('show');
        else toTopButton.classList.remove('show');
    });
}

function setupBackupButtons(isFilterActive) {
    const header = document.querySelector('#main h2');
    if (!header) return;

    const container = document.createElement('div');
    container.className = 'marker-data-sync-container';
    container.style.cssText = 'margin-top: 1em; margin-bottom: 1em; display: flex; flex-wrap: wrap; align-items: center; gap: 10px; border: 1px dashed #cccccc; padding: 10px; border-radius: 4px;';

    const label = document.createElement('span');
    label.textContent = 'Marker Tools:';
    label.style.fontWeight = 'bold';
    label.style.marginRight = '5px';
    container.appendChild(label);
    header.parentNode.insertBefore(container, header.nextSibling);

    // Setup Filter Button inside the container synchronously
    setupActiveFilterButton(container, isFilterActive);

    // Fetch credentials + provider selection, then build appropriate buttons
    storage.local.get([API_KEY_STORE, AUTO_BACKUP_STORE, STORAGE_PROVIDER_KEY], (items) => {
        const provider = (items && items[STORAGE_PROVIDER_KEY]) || 'jsonbin';
        const apiKey = items && items[API_KEY_STORE];
        const isAutoBackup = items && items[AUTO_BACKUP_STORE] === true;

        const filterBtn = container.querySelector('#active-reading-filter-btn');
        function appendOrInsert(el) {
            if (filterBtn) container.insertBefore(el, filterBtn);
            else container.appendChild(el);
        }

        // Helper: sets a link-button into loading state; returns a restore function
        function setLinkLoading(btn, loadingText) {
            btn.style.pointerEvents = 'none';
            btn.style.opacity = '0.6';
            btn.innerHTML = loadingText + ' <span class="btn-spinner"></span>';
            return function restore(originalText) {
                btn.textContent = originalText;
                btn.style.pointerEvents = '';
                btn.style.opacity = '';
            };
        }

        // ── Google Drive route ──────────────────────────────────
        if (provider === 'googledrive') {
            if (isAutoBackup) {
                const statusLabel = document.createElement('span');
                statusLabel.textContent = 'Auto Backup Active';
                statusLabel.style.cssText = 'font-size: 0.9em; color: #28a745; font-weight: bold;';
                appendOrInsert(statusLabel);
            } else {
                let isUploading = false;
                const uploadBtn = document.createElement('a');
                uploadBtn.textContent = 'Upload to Drive';
                uploadBtn.href = 'javascript:void(0)';
                uploadBtn.className = 'action';
                uploadBtn.addEventListener('click', async () => {
                    if (isUploading) return;
                    isUploading = true;
                    const restore = setLinkLoading(uploadBtn, 'Uploading\u2026');
                    try {
                        await window.driveSync.upload();
                    } finally {
                        restore('Upload to Drive');
                        isUploading = false;
                    }
                });
                appendOrInsert(uploadBtn);
            }

            let isDownloading = false;
            const downloadBtn = document.createElement('a');
            downloadBtn.textContent = 'Download from Drive';
            downloadBtn.href = 'javascript:void(0)';
            downloadBtn.className = 'action';
            downloadBtn.addEventListener('click', async () => {
                if (isDownloading) return;
                isDownloading = true;
                const restore = setLinkLoading(downloadBtn, 'Downloading\u2026');
                try {
                    await window.driveSync.download();
                } finally {
                    restore('Download from Drive');
                    isDownloading = false;
                }
            });
            appendOrInsert(downloadBtn);

            // ── JSONBin route (original logic — unchanged) ──────────
        } else if (apiKey) {
            if (isAutoBackup) {
                const statusLabel = document.createElement('span');
                statusLabel.textContent = 'Auto Backup Active';
                statusLabel.style.cssText = 'font-size: 0.9em; color: #28a745; font-weight: bold;';
                appendOrInsert(statusLabel);
            } else {
                const uploadBtn = document.createElement('a');
                uploadBtn.textContent = 'Upload Backup (API)';
                uploadBtn.href = 'javascript:void(0)';
                uploadBtn.className = 'action';

                let isUploading = false;
                uploadBtn.addEventListener('click', async () => {
                    if (isUploading) return;
                    isUploading = true;
                    const restore = setLinkLoading(uploadBtn, 'Uploading\u2026');
                    try {
                        await syncDataToAPI(false);
                    } finally {
                        restore('Upload Backup (API)');
                        isUploading = false;
                    }
                });
                appendOrInsert(uploadBtn);
            }

            let isDownloading = false;
            const downloadBtn = document.createElement('a');
            downloadBtn.textContent = 'Download Backup (API)';
            downloadBtn.href = 'javascript:void(0)';
            downloadBtn.className = 'action';
            downloadBtn.addEventListener('click', async () => {
                if (isDownloading) return;
                isDownloading = true;
                const restore = setLinkLoading(downloadBtn, 'Downloading\u2026');
                try {
                    await syncDataFromAPI();
                } finally {
                    restore('Download Backup (API)');
                    isDownloading = false;
                }
            });
            appendOrInsert(downloadBtn);
        }
    });
}

function setupActiveFilterButton(container, initialState) {
    const filterBtn = document.createElement('a');
    filterBtn.href = 'javascript:void(0)';
    filterBtn.id = 'active-reading-filter-btn';
    filterBtn.className = 'action';

    updateFilterButtonVisual(filterBtn, initialState);

    filterBtn.addEventListener('click', () => toggleActiveFilter(filterBtn));
    container.appendChild(filterBtn);
}

function updateFilterButtonVisual(button, isActive) {
    if (isActive) {
        button.textContent = 'Active Reading Filter: ON';
        button.style.background = '#ffc107';
        button.style.color = '#ffffff';
    } else {
        button.textContent = 'Active Reading Filter: OFF';
        button.style.background = '';
        button.style.color = '';
    }
}

// --- Filter Logic (UI Side) ---
async function toggleActiveFilter(button) {
    // globalPageData vem do content.js (escopo compartilhado)
    globalPageData.isFilterActive = !globalPageData.isFilterActive;
    await saveFilterState(globalPageData.isFilterActive);

    updateFilterButtonVisual(button, globalPageData.isFilterActive);
    applyFilterToAllBlurbs(); // Definido no ui.js abaixo
}

function shouldBeFiltered(blurbElement, allData) {
    const status = blurbElement.getAttribute('data-marker-status');
    if (status === 'read' || status === 'do-not-read') return true;

    if (status === 'partial') {
        const workId = blurbElement.getAttribute('data-work-id');
        const partialData = allData.lastReadChapters[workId];
        if (!partialData || typeof partialData.chapter !== 'number') return false;

        const chaptersElement = blurbElement.querySelector('dd.chapters');
        if (!chaptersElement) return false;

        const chapterMatch = chaptersElement.textContent.match(/(\d+)\/(\d+|\?)/);
        if (chapterMatch && chapterMatch[1]) {
            const totalChapters = parseInt(chapterMatch[1], 10);
            if (partialData.chapter >= totalChapters) return true;
        }
    }
    return false;
}

function applyFilterToAllBlurbs() {
    const blurbs = document.querySelectorAll('li.work.blurb, li.bookmark.blurb');
    blurbs.forEach(blurbElement => {
        if (globalPageData.isFilterActive) {
            if (shouldBeFiltered(blurbElement, globalPageData)) {
                blurbElement.style.display = 'none';
            } else {
                blurbElement.style.display = '';
            }
        } else {
            blurbElement.style.display = '';
        }
    });

    // Compose WTR filter on top — but ONLY on pages that have the WTR filter button
    // (i.e. the user's own Bookmarks page). On all other listing pages the filter
    // must not apply, regardless of the saved filterActive flag.
    // NOTE: applyWTRFilterToBlurbs runs whenever the button is present, because
    // the default-OFF state now also hides WTR items from the main listing.
    if (document.getElementById('wtr-filter-btn')) {
        applyWTRFilterToBlurbs(blurbs);
    }

    // Update folder counts if in grouping mode
    if (window.updateGroupCountsBasedOnFilter) {
        window.updateGroupCountsBasedOnFilter();
    }
}

// ============================================================
//  WTR Filter Helpers
// ============================================================

/**
 * Injects the "Filter WTR" button into the Marker Tools container.
 * Only called from content.js when on the user's own Bookmarks page.
 */
function setupWTRFilterButton(container, initialState) {
    const wtrFilterBtn = document.createElement('a');
    wtrFilterBtn.href = 'javascript:void(0)';
    wtrFilterBtn.id = 'wtr-filter-btn';
    wtrFilterBtn.className = 'action';
    updateWTRFilterButtonVisual(wtrFilterBtn, initialState);
    wtrFilterBtn.addEventListener('click', () => toggleWTRFilter(wtrFilterBtn));
    container.appendChild(wtrFilterBtn);
}

function updateWTRFilterButtonVisual(button, isActive) {
    if (isActive) {
        button.textContent = 'Want to Read: ON';
        button.style.background = CUSTOM_COLORS.WTR || '#6f42c1';
        button.style.color = '#ffffff';
    } else {
        button.textContent = 'Want to Read: OFF';
        button.style.background = '';
        button.style.color = '';
    }
}

async function toggleWTRFilter(button) {
    window._wtrFilterActive = !window._wtrFilterActive;
    if (typeof saveWTRFilterState === 'function') {
        await saveWTRFilterState(window._wtrFilterActive);
    }
    updateWTRFilterButtonVisual(button, window._wtrFilterActive);
    applyFilterToAllBlurbs();
}

/**
 * Applies WTR visibility rules to a NodeList/Array of blurbs.
 * Called internally by applyFilterToAllBlurbs whenever #wtr-filter-btn is in DOM.
 *
 * Behavior:
 *   - Filter OFF (default): WTR items are HIDDEN from the main listing.
 *   - Filter ON: Only WTR items are SHOWN (all others hidden).
 *
 * Reads from window._wtrQueueIds (Set of workId strings), populated by content.js.
 */
function applyWTRFilterToBlurbs(blurbs) {
    const wtrIds = window._wtrQueueIds || new Set();
    const filterIsOn = !!window._wtrFilterActive;

    blurbs.forEach(blurb => {
        if (blurb.style.display === 'none' && !filterIsOn) return; // already hidden by read filter; don't unhide
        const workId = blurb.getAttribute('data-work-id');
        const isInWTR = wtrIds.has(workId);

        if (filterIsOn) {
            // Filter ON: show ONLY WTR items
            blurb.style.display = isInWTR ? '' : 'none';
        } else {
            // Filter OFF (default): hide WTR items from the main list
            if (isInWTR) {
                blurb.style.display = 'none';
            }
            // Non-WTR items that were hidden by the read filter stay hidden;
            // non-WTR items that were visible remain visible (no change needed).
        }
    });
}



function createActionItem(text, clickHandler, updateStateFunction) {
    const listItem = document.createElement('li');
    const button = document.createElement('a');
    button.href = 'javascript:void(0);';
    button.textContent = text;
    button.addEventListener('click', clickHandler);
    listItem.appendChild(button);
    if (updateStateFunction) {
        updateStateFunction(button);
    }
    return listItem;
}

function hexToRgb(hex) {
    if (!hex) return "0, 0, 0";
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `${r}, ${g}, ${b}`;
}

// --- Blurb Visuals ---
function updateBlurbVisualState(workElement, isRead, isPartial, isDoNotRead, lastRead, workUpdatedTimestamp) {
    const header = workElement.querySelector('h4.heading');
    if (!header) return;

    // 1. Clear old
    workElement.classList.remove('marker-blurb', 'read', 'updated', 'partial', 'dnr');
    workElement.removeAttribute('data-marker-status');
    workElement.style.backgroundColor = '';
    workElement.style.border = '';
    workElement.style.borderRadius = '';

    const existingBadges = header.querySelectorAll('.marker-badge');
    existingBadges.forEach(badge => badge.remove());

    let badgesWrapper = header.querySelector('.marker-badges-wrapper');
    if (!badgesWrapper) {
        badgesWrapper = document.createElement('span');
        badgesWrapper.className = 'marker-badges-wrapper';
        badgesWrapper.style.cssText = 'display: block; margin-top: 5px;';
        header.appendChild(badgesWrapper);
    } else {
        // Limpa badges
        Array.from(badgesWrapper.children).forEach(child => {
            if (child.classList.contains('marker-badge')) child.remove();
        });
    }

    // 2. Apply Styles
    if (isDoNotRead) {
        workElement.setAttribute('data-marker-status', 'do-not-read');
        const rgb = hexToRgb(CUSTOM_COLORS.DONOTREAD);
        workElement.style.backgroundColor = `rgba(${rgb}, 0.1)`;
        workElement.style.border = `1px solid rgba(${rgb}, 0.6)`;
        workElement.style.borderRadius = '4px';

        const badge = document.createElement('span');
        badge.textContent = 'Do Not Read X';
        badge.className = 'marker-badge';
        badge.style.cssText = `display: inline-block; padding: 2px 6px; font-size: 0.8em; font-weight: bold; color: #ffffff; background-color: ${CUSTOM_COLORS.DONOTREAD}; border-radius: 10px;`;
        badgesWrapper.appendChild(badge);
    }
    else if (isRead) {
        const lastReadTimestamp = lastRead?.timestamp || 0;
        const isUpdated = workUpdatedTimestamp > lastReadTimestamp;

        if (isUpdated) {
            workElement.setAttribute('data-marker-status', 'updated-read');
            const rgb = hexToRgb(CUSTOM_COLORS.UPDATED);
            workElement.style.backgroundColor = `rgba(${rgb}, 0.1)`;
            workElement.style.border = `1px solid rgba(${rgb}, 0.6)`;
            workElement.style.borderRadius = '4px';

            const updateBadge = document.createElement('span');
            updateBadge.textContent = 'NEW CHAPTER!';
            updateBadge.className = 'marker-badge';
            // Custom text color for yellow
            updateBadge.style.cssText = `display: inline-block; padding: 2px 6px; font-size: 0.8em; font-weight: bold; background-color: ${CUSTOM_COLORS.UPDATED}; color: #000000; border-radius: 10px;`;
            badgesWrapper.appendChild(updateBadge);
        } else {
            workElement.setAttribute('data-marker-status', 'read');
            const rgb = hexToRgb(CUSTOM_COLORS.READ);
            workElement.style.backgroundColor = `rgba(${rgb}, 0.1)`;
            workElement.style.border = `1px solid rgba(${rgb}, 0.6)`;
            workElement.style.borderRadius = '4px';

            const readBadge = document.createElement('span');
            readBadge.textContent = 'Read ✔';
            readBadge.className = 'marker-badge';
            readBadge.style.cssText = `display: inline-block; padding: 2px 6px; font-size: 0.8em; font-weight: bold; color: #ffffff; background-color: ${CUSTOM_COLORS.READ}; border-radius: 10px;`;
            badgesWrapper.appendChild(readBadge);
        }
    }
    else if (isPartial && lastRead) {
        workElement.setAttribute('data-marker-status', 'partial');
        const rgb = hexToRgb(CUSTOM_COLORS.PARTIAL);
        workElement.style.backgroundColor = `rgba(${rgb}, 0.1)`;
        workElement.style.border = `1px solid rgba(${rgb}, 0.6)`;
        workElement.style.borderRadius = '4px';

        const chapterBadge = document.createElement('a');
        chapterBadge.href = lastRead.url;
        chapterBadge.className = 'marker-badge';

        const chapterNumberMatch = lastRead.title.match(/Chapter (\d+)/i);
        let badgeText = chapterNumberMatch ? `Stopped at: Ch ${chapterNumberMatch[1]}` : `Stopped at: ${lastRead.title}`;
        const dateTimeString = formatTimestamp(lastRead.timestamp);
        badgeText += ` (${dateTimeString})`;

        chapterBadge.textContent = badgeText;
        chapterBadge.style.cssText = `display: inline-block; padding: 2px 6px; font-size: 0.8em; font-weight: bold; color: #ffffff; background-color: ${CUSTOM_COLORS.PARTIAL}; border-radius: 10px; text-decoration: none;`;
        badgesWrapper.appendChild(chapterBadge);
    } else {
        workElement.setAttribute('data-marker-status', 'unmarked');
    }

    // --- Update Buttons inside Blurbs ---
    const readBtn = workElement.querySelector('.marker-action-read');
    const doNotReadBtn = workElement.querySelector('.marker-action-do-not-read');
    const wtrBtn = workElement.querySelector('.marker-action-wtr');
    const symbolBtnStyle = 'display: inline-block; padding: 3px 5px; margin-right: 5px; font-size: 0.9em; color: #ffffff; border-radius: 4px; cursor: pointer; text-decoration: none; line-height: 1; min-width: 0.8em;';

    if (readBtn) {
        readBtn.style.cssText = isRead
            ? `${symbolBtnStyle} background: ${CUSTOM_COLORS.READ} !important; color: #ffffff !important;`
            : `${symbolBtnStyle} background-color: #6c757d;`;
    }
    if (doNotReadBtn) {
        doNotReadBtn.style.cssText = isDoNotRead
            ? `${symbolBtnStyle} background: ${CUSTOM_COLORS.DONOTREAD} !important; color: #ffffff !important;`
            : `${symbolBtnStyle} background-color: #6c757d;`;
    }
    // WTR button: disable when fic is read or partial (can't queue what you've started)
    if (wtrBtn) {
        const isInWTR = workElement.getAttribute('data-marker-status') === 'wtr';
        if (isRead || isPartial) {
            wtrBtn.style.opacity = '0.3';
            wtrBtn.style.pointerEvents = 'none';
            wtrBtn.title = 'Already read – cannot add to WTR';
        } else if (isInWTR) {
            wtrBtn.style.cssText = `${symbolBtnStyle} background: ${CUSTOM_COLORS.WTR || '#6f42c1'} !important; color: #ffffff !important; opacity: 1; pointer-events: auto;`;
            wtrBtn.title = 'Remove from Want to Read';
        } else {
            wtrBtn.style.cssText = `${symbolBtnStyle} background-color: #6c757d; opacity: 1; pointer-events: auto;`;
            wtrBtn.title = 'Add to Want to Read';
        }
    }
}


// --- Review Modal UI ---
async function openReviewModal(workId, chapterIndex) {
    if (document.getElementById('marker-review-modal')) return;

    const btn = document.getElementById('marker-floating-review-btn');
    if (btn) {
        btn.style.display = 'none';
    }

    const luminance = getBodyLuminance();
    const themeClass = (luminance < 128) ? 'theme-dark' : 'theme-light';

    const overlay = document.createElement('div');
    overlay.id = 'marker-review-overlay';

    const modal = document.createElement('div');
    modal.id = 'marker-review-modal';
    modal.className = themeClass;

    // Loading State
    const loadingH4 = document.createElement('h4');
    loadingH4.textContent = 'Chapter Review';
    const loadingP = document.createElement('p');
    loadingP.textContent = 'Loading...';
    modal.appendChild(loadingH4);
    modal.appendChild(loadingP);

    document.body.appendChild(overlay);
    document.body.appendChild(modal);

    setTimeout(() => {
        overlay.style.display = 'block';
        modal.style.display = 'block';
    }, 10);

    const allReviews = await loadChapterReviews();
    let existingReview = (allReviews[workId] && allReviews[workId][chapterIndex]) || "";
    if (typeof existingReview === 'object' && existingReview !== null) {
        existingReview = existingReview.text || "";
    }

    // Build Final UI (Safe)
    modal.innerHTML = '';

    const xBtn = document.createElement('span');
    xBtn.innerHTML = '&times;';
    xBtn.style.cssText = 'position: absolute; top: 10px; right: 15px; font-size: 24px; cursor: pointer; color: inherit; line-height: 1; font-weight: bold; opacity: 0.7; transition: opacity 0.2s;';
    xBtn.title = 'Close';
    xBtn.onmouseover = () => xBtn.style.opacity = '1';
    xBtn.onmouseout = () => xBtn.style.opacity = '0.7';
    xBtn.addEventListener('click', closeReviewModal);
    modal.appendChild(xBtn);

    const h4 = document.createElement('h4');
    h4.textContent = 'Chapter Review';
    h4.style.marginTop = '0'; // Adjust margin to accommodate the X button

    const textarea = document.createElement('textarea');
    textarea.id = 'ao3-review-text';
    textarea.value = existingReview;

    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'modal-actions';

    const rightDiv = document.createElement('div');
    rightDiv.style.display = 'flex';
    rightDiv.style.alignItems = 'center';

    const saveBtn = document.createElement('button');
    saveBtn.id = 'ao3-save-review';
    saveBtn.className = 'action';
    saveBtn.textContent = 'Save Review';

    const statusSpan = document.createElement('span');
    statusSpan.id = 'ao3-review-status';
    statusSpan.style.cssText = 'margin-right: 10px; color: green; display: none;';

    // Append status first, then button, so status is on the left of the button
    rightDiv.appendChild(statusSpan);
    rightDiv.appendChild(saveBtn);

    actionsDiv.style.justifyContent = 'flex-end';
    actionsDiv.appendChild(rightDiv);

    modal.appendChild(h4);
    modal.appendChild(textarea);
    modal.appendChild(actionsDiv);

    saveBtn.addEventListener('click', () => saveReviewHandler(workId, chapterIndex));

    // Auto-save on outside click: save draft silently, then close and notify.
    overlay.addEventListener('click', async () => {
        const textarea = document.getElementById('ao3-review-text');
        if (textarea) {
            await saveReviewHandler(workId, chapterIndex);
        }
        const btn = document.getElementById('marker-floating-review-btn');
        if (btn) {
            btn.style.display = 'flex';
        }
        closeReviewModal();
        showToast('Review saved!');
    });
}

function closeReviewModal() {
    const btn = document.getElementById('marker-floating-review-btn');
    if (btn) {
        btn.style.display = 'flex';
    }

    const overlay = document.getElementById('marker-review-overlay');
    const modal = document.getElementById('marker-review-modal');
    if (overlay) document.body.removeChild(overlay);
    if (modal) document.body.removeChild(modal);
}

async function saveReviewHandler(workId, chapterIndex) {
    const saveBtn = document.getElementById('ao3-save-review');
    const textarea = document.getElementById('ao3-review-text');
    const statusMsg = document.getElementById('ao3-review-status');

    if (saveBtn) {
        saveBtn.disabled = true;
        saveBtn.textContent = 'Saving...';
    }

    const workTitleEl = document.querySelector('h2.title.heading');
    const workAuthorEl = document.querySelector('h3.byline.heading a[rel="author"]');
    const title = workTitleEl ? workTitleEl.textContent.trim() : null;
    const author = workAuthorEl ? workAuthorEl.textContent.trim() : null;
    const currentUrl = window.location.href.split('#')[0];

    await saveChapterReview(workId, chapterIndex, textarea.value, { title, author }, currentUrl);

    if (saveBtn) {
        saveBtn.disabled = false;
        saveBtn.textContent = 'Save Review';
    }
    if (statusMsg) {
        statusMsg.textContent = 'Saved!';
        statusMsg.style.display = 'inline';
        setTimeout(() => { if (statusMsg) statusMsg.style.display = 'none'; }, 2500);
    }
}

// ============================================================
//  Floating Chapter Review Button
// ============================================================

/**
 * Injects a fixed floating button (pencil icon) that opens the chapter review
 * modal from anywhere on the work page. Respects the enable_floating_review_btn
 * and enable_chapter_reviews settings. Idempotent.
 *
 * @param {string} workId           The AO3 work ID.
 * @param {string} chapterIndex     The current chapter index (e.g. "1").
 */
async function injectFloatingReviewButton(workId, chapterIndex) {
    // Idempotency guard
    if (document.getElementById('marker-floating-review-btn')) return;

    const browserAPI = (typeof browser !== 'undefined' ? browser : chrome);
    const opts = await browserAPI.storage.local.get([
        'enable_chapter_reviews',
        'enable_floating_review_btn'
    ]);

    // Both master toggle and sub-toggle must be enabled
    if (!opts['enable_chapter_reviews']) return;
    // If the key doesn't exist yet (new install), default to true
    if (opts['enable_floating_review_btn'] === false) return;

    const PENCIL_SVG = `<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"><path d="M17.561 2.439a2.121 2.121 0 0 0-3 0L3.81 13.189A2.094 2.094 0 0 0 3 14.605V17a1 1 0 0 0 1 1h2.395a2.094 2.094 0 0 0 1.416-.811L17.56 6.439a2.121 2.121 0 0 0 0-3zM5.879 16H5v-.879l7.02-7.02 1.878 1.879L5.879 16zM16.146 5.025l-1.879-1.879L15.72 1.79a1.121 1.121 0 0 1 1.586 0l.94.94a1.121 1.121 0 0 1 0 1.586l-2.099 2.1z"/></svg>`;

    const btn = document.createElement('a');
    btn.id = 'marker-floating-review-btn';
    btn.href = 'javascript:void(0)';
    btn.title = 'Open Chapter Review';
    btn.setAttribute('aria-label', 'Open Chapter Review');
    btn.innerHTML = PENCIL_SVG;

    // Detect theme — mirrors the same check used in openReviewModal (ui.js)
    const luminance = getBodyLuminance();
    const isDark = luminance < 128;

    // Position above the back-to-top button (which sits at bottom: 20px).
    // Colors mirror #ao3-pro-showcase-btn (styles.css) for light/dark mode,
    // and the SVG fill adopts the same color as .marker-review-toggle-icon
    // (color: inherit → currentColor = AO3's --link-color).
    btn.style.cssText = [
        'position: fixed',
        'bottom: 70px',
        'right: 20px',
        'z-index: 99998',
        'width: 36px',
        'height: 36px',
        'border-radius: 50%',
        'display: flex',
        'align-items: center',
        'justify-content: center',
        isDark
            ? 'background-color: rgba(50, 50, 50, 0.9)'
            : 'background-color: rgba(255, 255, 255, 0.9)',
        isDark
            ? 'border: 1px solid #555'
            : 'border: 1px solid #ccc',
        'box-shadow: 0 4px 12px rgba(0,0,0,0.3)',
        'backdrop-filter: blur(4px)',
        'cursor: pointer',
        'text-decoration: none',
        'transition: transform 0.2s, background-color 0.2s',
        'user-select: none'
    ].join('; ');

    btn.addEventListener('mouseenter', () => { btn.style.transform = 'scale(1.1)'; });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        openReviewModal(workId, chapterIndex);
    });

    document.body.appendChild(btn);
}

(function injectInfiniteScrollStyles() {
    const styleId = 'marker-infinite-scroll-style';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
        .marker-spinner {
            border: 4px solid #f3f3f3; /* Cinza claro */
            border-top: 4px solid #900; /* Vermelho AO3 */
            border-radius: 50%;
            width: 30px;
            height: 30px;
            animation: marker-spin 1s linear infinite;
            margin: 0 auto; /* Centraliza horizontalmente */
            display: none; /* Começa escondido */
        }

        @keyframes marker-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        /* Ajuste para Dark Mode do AO3 se necessário */
        body.dark .marker-spinner,
        body.reversi .marker-spinner {
            border-color: #444;
            border-top-color: #900;
        }
    `;
    document.head.appendChild(style);
})();

// --- [NOVO] Sistema de Notificação (Toast) para v5.0 ---
function showToast(message, duration = 3000) {
    let toast = document.getElementById('ao3-marker-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'ao3-marker-toast';
        toast.style.cssText = `
            position: fixed; bottom: 20px; left: 40px;
            background-color: var(--button-bg, #900); color: #fff; padding: 5px 10px;
            border-radius: 5px; z-index: 100000;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
            font-family: sans-serif; opacity: 0; transition: opacity 0.3s;
        `;
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.opacity = '1';

    setTimeout(() => {
        toast.style.opacity = '0';
    }, duration);
}

async function renderDashboardWidget() {
    // Verifica se stats está ativo e existe
    if (!window.stats || !await window.stats.isEnabled()) return;

    // Local de injeção: No dashboard do usuário, geralmente na div.primary ou antes do profile
    const dashboardHeader = document.querySelector('div.primary.header.module');
    if (!dashboardHeader) return; // Não estamos no dashboard correto

    // Verifica se já existe
    if (document.getElementById('ao3-stats-widget')) return;

    // Calcula dados
    const statsData = await window.stats.getYearlyStats();

    // Cria Elementos
    const widget = document.createElement('div');
    widget.id = 'ao3-stats-widget';
    widget.className = 'ao3-tracker-widget';

    // ALTERAÇÃO CRÍTICA AQUI:
    // float: left -> Faz o widget "flutuar" logo após o cabeçalho, respeitando o layout do AO3
    // width: 100% -> Garante que ele ocupe a linha inteira, forçando-o a ficar abaixo do cabeçalho
    // margin-top: 20px -> Garante um respiro visual para não colar nos botões
    widget.style.cssText = `
        float: left; 
        width: 100%;
        background: transparent;
        color: inherit;
        box-sizing: border-box;
        margin: 20px 0 20px 0;
        padding: 15px;
        border: 1px solid;
        border-color: currentColor; 
        border-top: 5px solid #900;
        opacity: 0.9;
    `;

    const title = document.createElement('h3');
    title.className = 'heading';
    title.textContent = `${statsData.year} Reading Challenge`;
    title.style.cssText = 'border-bottom: none; padding-bottom: 5px; font-family: inherit; color: inherit;';

    // Barra de Progresso Container (O fundo da barra)
    const progressWrapper = document.createElement('div');
    // Usamos rgba para o fundo ser adaptativo (transparente escuro)
    progressWrapper.style.cssText = 'background: rgba(128, 128, 128, 0.2); height: 20px; border-radius: 10px; overflow: hidden; margin-bottom: 10px; border: 1px solid rgba(128,128,128, 0.3);';

    // Barra de Progresso Fill (O preenchimento)
    const progressFill = document.createElement('div');
    // Mantemos o vermelho #900 característico do AO3, ou pode mudar se preferir
    progressFill.style.cssText = `background: #900; height: 100%; width: ${statsData.percent}%; transition: width 0.5s;`;
    progressWrapper.appendChild(progressFill);

    // Texto de Detalhes
    const details = document.createElement('p');
    // Usamos 'inherit' para a fonte seguir o tema
    details.style.cssText = "font-family: inherit; color: inherit; margin: 0;";
    details.innerHTML = `
        <strong>${statsData.percent}%</strong> of your goal (${statsData.booksRead} / ${statsData.goalBooks} works)<br>
        <span style="opacity: 0.8; font-size: 0.9em;">Total Words: ${statsData.totalWords.toLocaleString()} — Logged Entries: ${statsData.entriesCount}</span>
    `;

    widget.appendChild(title);
    widget.appendChild(progressWrapper);
    widget.appendChild(details);

    // INSERÇÃO
    // Mantemos a inserção no mesmo lugar. Sem o 'clear: both', o gap deve sumir.
    dashboardHeader.parentNode.insertBefore(widget, dashboardHeader.nextSibling);
}

// [NOVO] Expor a função globalmente para que stats.js consiga chamar window.ui.showToast
window.ui = {
    showToast: showToast,
    renderDashboardWidget: renderDashboardWidget
};