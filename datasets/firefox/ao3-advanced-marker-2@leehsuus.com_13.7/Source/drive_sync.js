// drive_sync.js — Google Drive appDataFolder Sync Module
// Exposes window.driveSync for consumption by ui.js and options.js.

(function () {
    'use strict';

    const DRIVE_FILE_NAME = 'ao3_marker_data.json';

    // Cross-browser storage handle (shared scope with storage.js in content scripts)
    const _storage = (typeof browser !== 'undefined' ? browser : chrome).storage;

    // Strict Blacklist for Keys that should NOT be synced to Google Drive
    const BLACKLIST = [
        'auto_backup_enabled',
        'google_access_token',
        'google_refresh_token',
        'google_token_expiry',
        'google_user_email',
        'ao3_dashboard_cache',
        'ao3_wtr_pending',
        'ao3_pending_bookmarks'
    ];

    /**
     * Builds the JSON payload for upload using the "Catch-All" Strategy.
     * Iterates over all storage keys and filters out blacklisted keys.
     */
    async function _buildPayload() {
        return new Promise(resolve => {
            _storage.local.get(null, (items) => {
                const data = {};
                Object.keys(items).forEach(key => {
                    if (!BLACKLIST.includes(key)) {
                        data[key] = items[key];
                    }
                });

                const payload = {
                    timestamp: Date.now(),
                    version: '5.0',
                    data: data
                };
                resolve(payload);
            });
        });
    }

    /**
     * Finds the 'ao3_marker_data.json' file in the appDataFolder.
     * If it doesn't exist, creates it.
     * @returns {Promise<string>} The File ID.
     */
    async function _findOrCreateFile(token) {
        const query = encodeURIComponent(`name='${DRIVE_FILE_NAME}'`);
        const searchRes = await fetch(`https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&q=${query}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (!searchRes.ok) throw new Error('Failed to search Drive: ' + searchRes.status);
        const searchData = await searchRes.json();

        if (searchData.files && searchData.files.length > 0) {
            return searchData.files[0].id;
        }

        // Create the file
        const createRes = await fetch('https://www.googleapis.com/drive/v3/files', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: DRIVE_FILE_NAME,
                parents: ['appDataFolder']
            })
        });

        if (!createRes.ok) throw new Error('Failed to create Drive file: ' + createRes.status);
        const createData = await createRes.json();
        return createData.id;
    }

    /**
     * Uploads local extension data to Google Drive appDataFolder.
     * @param {boolean} isAutomatic - If true, suppresses UI toast notifications.
     */
    async function upload(isAutomatic = false) {
        const notify = _getNotifier();
        const showNotify = (msg) => { if (!isAutomatic) notify(msg); };

        async function doUpload(forceRefresh = false) {
            const token = await window.googleAuth.getToken(forceRefresh);
            const fileId = await _findOrCreateFile(token);
            const payload = await _buildPayload();

            const boundary = '-------314159265358979323846';
            const delimiter = "\r\n--" + boundary + "\r\n";
            const close_delim = "\r\n--" + boundary + "--";

            const metadata = {
                'mimeType': 'application/json'
            };

            const multipartRequestBody =
                delimiter +
                'Content-Type: application/json\r\n\r\n' +
                JSON.stringify(metadata) +
                delimiter +
                'Content-Type: application/json\r\n\r\n' +
                JSON.stringify(payload) +
                close_delim;

            const uploadRes = await fetch(`https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=multipart`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': `multipart/related; boundary=${boundary}`
                },
                body: multipartRequestBody
            });

            if (!uploadRes.ok) {
                if (uploadRes.status === 401) throw new Error('401_UNAUTHORIZED');
                throw new Error('Upload failed: ' + uploadRes.status);
            }
        }

        try {
            try {
                await doUpload(false);
                _storage.local.set({ 'last_backup_timestamp': Date.now() });
                showNotify('Drive Upload: Success!');
            } catch (e) {
                if (e.message === '401_UNAUTHORIZED' || e.message.includes('401')) {
                    console.warn('[DriveSync] Token expired server-side. Forcing refresh and retrying...');
                    await doUpload(true);
                    _storage.local.set({ 'last_backup_timestamp': Date.now() });
                    showNotify('Drive Upload: Success!');
                } else {
                    throw e; // Bubble up other errors
                }
            }
        } catch (finalErr) {
            if (finalErr.message === '401_UNAUTHORIZED' || finalErr.message.includes('401')) {
                showNotify('Google session expired. Please re-authenticate in settings.');
            } else {
                console.error('[DriveSync] Upload error:', finalErr);
                showNotify('Drive Upload Error: ' + finalErr.message);
            }
        }
    }

    /**
     * Merges a cloud highlight object with a local highlight object.
     * Adds new chapters/highlights, overwrites existing highlights by ID,
     * but does NOT delete local highlights missing from the cloud.
     */
    function _mergeHighlights(localHl, cloudHl) {
        if (!localHl) return cloudHl;
        if (!cloudHl) return localHl;
        
        let localData = typeof localHl === 'string' ? JSON.parse(localHl) : localHl;
        let cloudData = typeof cloudHl === 'string' ? JSON.parse(cloudHl) : cloudHl;

        const merged = { ...localData, chapters: { ...(localData.chapters || {}) } };
        
        if (cloudData.workTitle) merged.workTitle = cloudData.workTitle;
        if (cloudData.workAuthor) merged.workAuthor = cloudData.workAuthor;

        const cloudChapters = cloudData.chapters || {};
        
        for (const chapKey in cloudChapters) {
            if (!merged.chapters[chapKey]) {
                merged.chapters[chapKey] = [...cloudChapters[chapKey]];
            } else {
                // Deep merge highlights by ID
                const localMarks = merged.chapters[chapKey];
                const cloudMarks = cloudChapters[chapKey];
                
                cloudMarks.forEach(cloudMark => {
                    const idx = localMarks.findIndex(lm => lm.id === cloudMark.id);
                    if (idx !== -1) {
                        localMarks[idx] = cloudMark; // Overwrite
                    } else {
                        localMarks.push(cloudMark); // Add new
                    }
                });
            }
        }
        
        // Return stringified if original was stringified, though storage handles objects directly too.
        return typeof localHl === 'string' ? JSON.stringify(merged) : merged;
    }

    /**
     * Downloads data from Google Drive appDataFolder and restores locally.
     */
    async function download() {
        const notify = _getNotifier();

        async function doDownload(forceRefresh = false) {
            const token = await window.googleAuth.getToken(forceRefresh);
            
            const query = encodeURIComponent(`name='${DRIVE_FILE_NAME}'`);
            const searchRes = await fetch(`https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&q=${query}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!searchRes.ok) {
                if (searchRes.status === 401) throw new Error('401_UNAUTHORIZED');
                throw new Error('Failed to search Drive: ' + searchRes.status);
            }
            const searchData = await searchRes.json();
            
            if (!searchData.files || searchData.files.length === 0) {
                throw new Error('NO_BACKUP_FOUND');
            }
            
            const fileId = searchData.files[0].id;
            
            const downloadRes = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            if (!downloadRes.ok) {
                if (downloadRes.status === 401) throw new Error('401_UNAUTHORIZED');
                throw new Error('Download failed: ' + downloadRes.status);
            }
            
            const cloudPayload = await downloadRes.json();
            return cloudPayload.data;
        }

        try {
            if (!confirm('WARNING: Overwrite local data? This will restore History, Stats, Reviews, Highlights, and Settings from Google Drive.')) return;

            let cloudData;
            try {
                cloudData = await doDownload(false);
            } catch (e) {
                if (e.message === '401_UNAUTHORIZED' || e.message.includes('401')) {
                    console.warn('[DriveSync] Token expired server-side. Forcing refresh and retrying...');
                    cloudData = await doDownload(true);
                } else {
                    throw e; // Bubble up
                }
            }
            
            if (!cloudData) {
                notify('Drive Download: Invalid backup format.');
                return;
            }

            // Fetch local data to merge highlights
            const localData = await new Promise(resolve => _storage.local.get(null, resolve));
            const dataToSave = {};

            Object.keys(cloudData).forEach(key => {
                if (BLACKLIST.includes(key)) return; // Failsafe
                
                if (key.startsWith('ao3_hl_')) {
                    // Deep merge highlights
                    dataToSave[key] = _mergeHighlights(localData[key], cloudData[key]);
                } else {
                    // Overwrite other keys
                    dataToSave[key] = cloudData[key];
                }
            });

            await new Promise((resolve, reject) => {
                _storage.local.set(dataToSave, () => {
                    if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
                    else resolve();
                });
            });

            notify('Drive Download: Success! Reloading...');
            setTimeout(() => window.location.reload(), 600);

        } catch (finalErr) {
            if (finalErr.message === 'NO_BACKUP_FOUND') {
                notify('Drive Download: No backup found on Google Drive.');
            } else if (finalErr.message === '401_UNAUTHORIZED' || finalErr.message.includes('401')) {
                notify('Google session expired. Please re-authenticate in settings.');
            } else {
                console.error('[DriveSync] Download error:', finalErr);
                notify('Drive Download Error: ' + finalErr.message);
            }
        }
    }

    /**
     * Returns the best available notification function for the current context.
     * @private
     */
    function _getNotifier() {
        if (window.ui && typeof window.ui.showToast === 'function') {
            return window.ui.showToast;
        }
        if (typeof showToast === 'function') {
            return showToast;
        }
        return (msg) => console.log('[DriveSync]', msg);
    }

    // ──────────────────────────────────────────────────────────
    //  Public API
    // ──────────────────────────────────────────────────────────
    window.driveSync = {
        upload,
        download,
        FILE_NAME: DRIVE_FILE_NAME
    };

})();
