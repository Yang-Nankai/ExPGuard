(function () {

    window.addEventListener('message', async (event) => {
        if (event.data.type === 'INSERT_CAPSULE_CONTENT') {
            const { content } = event.data;

            // Lovable uses Tiptap/ProseMirror
            const editor = document.querySelector('.ProseMirror') ||
                document.querySelector('[aria-label="Chat input"]');

            if (editor) {
                // Focus first
                editor.focus();

                // Move cursor to end
                const range = document.createRange();
                const selection = window.getSelection();
                range.selectNodeContents(editor);
                range.collapse(false);
                selection.removeAllRanges();
                selection.addRange(range);

                // Use execCommand to insert text natively, which triggers React/ProseMirror state updates
                const originalText = editor.innerText.trim();
                const separator = originalText ? "\n\n" : "";
                const textToInsert = separator + content;

                if (!document.execCommand('insertText', false, textToInsert)) {
                    // Fallback if execCommand fails
                    let p = editor.querySelector('p');
                    if (!p) {
                        p = document.createElement('p');
                        editor.appendChild(p);
                    }
                    p.innerText += textToInsert;
                    editor.dispatchEvent(new Event('input', { bubbles: true }));
                }

                window.postMessage({ type: 'CAPSULE_INSERTED_SUCCESS' }, '*');

                // Auto-send logic: wait 500ms for state sync then click submit
                setTimeout(() => {
                    const sendBtn = document.querySelector('button[aria-label="Submit"]') ||
                        document.querySelector('button[type="submit"]');
                    if (sendBtn && !sendBtn.disabled) {
                        sendBtn.click();
                    }
                }, 500);
            } else {
                console.error("❌ [Lovable Inserter] Prompt area not found");
            }
        }
    });
})();

// === CAPSULE: Lovable file content fetcher ===
// Listens for CAPSULE_LOVABLE_FETCH_URL from the content script.
// Fetches the file using the original window.fetch (page world context — CORS allowed),
// converts to base64, and dispatches CAPSULE_LOVABLE_FILE_CONTENT back.
(function () {
    const _originalFetch = window.fetch;

    window.addEventListener('CAPSULE_LOVABLE_FETCH_URL', async (e) => {
        const url = e.detail?.url;
        if (!url) return;
        try {
            const response = await _originalFetch(url);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const contentType = response.headers.get('content-type') || 'text/plain';
            const buf = await response.arrayBuffer();
            const bytes = new Uint8Array(buf);
            let binary = '';
            for (let i = 0; i < bytes.length; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            const base64 = btoa(binary);
            window.dispatchEvent(new CustomEvent('CAPSULE_LOVABLE_FILE_CONTENT', {
                detail: { base64, contentType }
            }));
        } catch (err) {
            console.warn('[Capsule] Lovable page-world fetch failed:', err);
            // Dispatch with null so content script doesn't hang
            window.dispatchEvent(new CustomEvent('CAPSULE_LOVABLE_FILE_CONTENT', {
                detail: { base64: null, contentType: null }
            }));
        }
    });
})();

