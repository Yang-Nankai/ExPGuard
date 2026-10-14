// ao3_api.js

async function syncBookmarkToAO3(workId) {
    const options = await storage.local.get('enable_bookmark_sync');
    if (!options['enable_bookmark_sync']) return;

    try {
        // 1. GET para pegar o token e descobrir o estado
        const fetchUrl = `https://archiveofourown.org/works/${workId}/bookmarks/new`;
        const response = await fetch(fetchUrl);

        // Se a resposta não for OK (ex: 500, 404), tratamos como erro
        if (!response.ok) throw new Error(`Fetch error: ${response.status}`);

        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');

        // 2. Extração de Dados
        const tokenInput = doc.querySelector('input[name="authenticity_token"]');
        const pseudInput = doc.querySelector('[name="bookmark[pseud_id]"]');
        const formElement = tokenInput?.closest('form');
        const formAction = formElement?.getAttribute('action');

        // Validação básica
        if (!tokenInput || !pseudInput || !formAction) {
            // Não encontrou o form (provavelmente deslogado). Adiciona na fila.
            await addToPendingBookmarks(workId);
            return;
        }

        // 3. Lógica: Se já existe (edit), aborta.
        if (!formAction.endsWith('bookmarks')) {
            // Sucesso (já existe), remove da fila se estiver lá para garantir
            await removeFromPendingBookmarks(workId);
            return;
        }

        // 4. POST Criação
        const formData = new FormData();
        formData.append('utf8', '✓');
        formData.append('authenticity_token', tokenInput.value);
        formData.append('bookmark[pseud_id]', pseudInput.value);
        formData.append('bookmark[private]', '1');
        formData.append('bookmark[rec]', '0');
        formData.append('bookmark[tag_string]', 'AO3 Advanced Marker Read');
        formData.append('commit', 'Create');

        const postUrl = `https://archiveofourown.org${formAction}`;

        const postResponse = await fetch(postUrl, {
            method: 'POST',
            body: formData
        });

        if (postResponse.ok) {
            safeLog(`[AO3 Marker] Bookmark created for ${workId}`);
            // Se deu sucesso, remove da fila de pendências
            await removeFromPendingBookmarks(workId);
        } else {
            throw new Error(`Post error: ${postResponse.status}`);
        }

    } catch (error) {
        console.error(`[AO3 Marker] Sync failed for ${workId}:`, error);
        // [NOVO] Se falhar (erro de rede, timeout), salva na fila para tentar depois
        await addToPendingBookmarks(workId);
    }
}

// [NOVO] Função para processar a fila de pendências
async function processPendingBookmarks() {
    const pendingList = await loadPendingBookmarks();
    if (pendingList.length === 0) return;

    safeLog(`[RetryQueue] Processing ${pendingList.length} pending bookmarks...`);

    // Processa um por um
    for (const workId of pendingList) {
        // syncBookmarkToAO3 já tem a lógica de remover se der certo
        // ou manter (readicionar) se der errado.
        await syncBookmarkToAO3(workId);
    }
}

// ============================================================
//  WTR Bookmark Sync
// ============================================================

/**
 * Syncs a WTR addition to AO3 Bookmarks.
 * - If the work is NOT yet bookmarked: creates a new Private bookmark with the WTR tag.
 * - If the work IS already bookmarked: merges the WTR tag into the existing tag list.
 * On failure, adds to the WTR pending retry queue.
 *
 * @param {string} workId
 * @param {string} customTag  The WTR tag string from settings (default: "AO3 Advanced Marker Want to Read")
 */
async function syncWTRBookmarkToAO3(workId, customTag = 'AO3 Advanced Marker Want to Read') {
    try {
        // 1. GET the bookmark form to discover the current state + token
        const fetchUrl = `https://archiveofourown.org/works/${workId}/bookmarks/new`;
        const response = await fetch(fetchUrl);
        if (!response.ok) throw new Error(`Fetch error: ${response.status}`);

        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');

        const tokenInput = doc.querySelector('input[name="authenticity_token"]');
        const pseudInput = doc.querySelector('[name="bookmark[pseud_id]"]');
        const formElement = tokenInput?.closest('form');
        const formAction = formElement?.getAttribute('action');

        if (!tokenInput || !pseudInput || !formAction) {
            // Not logged in or page error — add to retry queue
            await addToWTRPendingBookmarks(workId);
            return;
        }

        const isExistingBookmark = !formAction.endsWith('bookmarks');

        if (isExistingBookmark) {
            // --- MERGE PATH: bookmark already exists → add WTR tag to existing tags ---
            // Extract the edit form URL (the formAction points to /bookmarks/:id)
            const bookmarkId = formAction.match(/bookmarks\/(\d+)/)?.[1];
            if (!bookmarkId) {
                await removeFromWTRPendingBookmarks(workId);
                return; // can't parse bookmark ID, skip silently
            }

            // Read current tag_string from the new-bookmark form
            // (AO3 pre-fills edit fields into the /bookmarks/new endpoint when a bookmark exists)
            const existingTagInput = doc.querySelector('input[name="bookmark[tag_string]"], textarea[name="bookmark[tag_string]"]');
            const existingTags = existingTagInput ? existingTagInput.value : '';

            // Merge: add WTR tag if not already present
            const tagsArray = existingTags.split(',').map(t => t.trim()).filter(Boolean);
            if (!tagsArray.includes(customTag)) {
                tagsArray.push(customTag);
            } else {
                // Tag already there — nothing to do
                await removeFromWTRPendingBookmarks(workId);
                return;
            }

            const editUrl = `https://archiveofourown.org${formAction}`;
            const formData = new FormData();
            formData.append('utf8', '✓');
            formData.append('_method', 'put');
            formData.append('authenticity_token', tokenInput.value);
            formData.append('bookmark[pseud_id]', pseudInput.value);
            formData.append('bookmark[tag_string]', tagsArray.join(', '));

            // Preserve private state — read from existing form
            const privateInput = doc.querySelector('input[name="bookmark[private]"][type="hidden"]');
            formData.append('bookmark[private]', privateInput ? privateInput.value : '1');

            const putResponse = await fetch(editUrl, { method: 'POST', body: formData });
            if (!putResponse.ok) throw new Error(`PUT error: ${putResponse.status}`);

        } else {
            // --- CREATE PATH: no bookmark yet → create new Private bookmark with WTR tag ---
            const formData = new FormData();
            formData.append('utf8', '✓');
            formData.append('authenticity_token', tokenInput.value);
            formData.append('bookmark[pseud_id]', pseudInput.value);
            formData.append('bookmark[private]', '1');
            formData.append('bookmark[rec]', '0');
            formData.append('bookmark[tag_string]', customTag);
            formData.append('commit', 'Create');

            const postUrl = `https://archiveofourown.org${formAction}`;
            const postResponse = await fetch(postUrl, { method: 'POST', body: formData });
            if (!postResponse.ok) throw new Error(`POST error: ${postResponse.status}`);
        }

        // Success: mark ao3BookmarkCreated in the queue and clear from retry queue
        const queue = await loadWTRQueue();
        if (queue[workId]) {
            queue[workId].ao3BookmarkCreated = true;
            await saveWTRQueue(queue);
        }
        await removeFromWTRPendingBookmarks(workId);
        safeLog(`[WTR] AO3 bookmark synced for work ${workId}`);

    } catch (error) {
        console.error(`[WTR] Bookmark sync failed for ${workId}:`, error);
        await addToWTRPendingBookmarks(workId);
    }
}

/**
 * Retry any WTR bookmarks that failed on a previous attempt.
 * Called on page load and when the browser comes back online.
 */
async function processWTRPendingBookmarks() {
    const pendingList = await loadWTRPendingBookmarks();
    if (pendingList.length === 0) return;

    // Load WTR tag from settings for the retry
    const wtrSettings = await loadWTRSettings();
    const tag = wtrSettings.tag;

    safeLog(`[WTR RetryQueue] Processing ${pendingList.length} pending WTR bookmarks...`);
    for (const workId of pendingList) {
        await syncWTRBookmarkToAO3(workId, tag);
    }
}
