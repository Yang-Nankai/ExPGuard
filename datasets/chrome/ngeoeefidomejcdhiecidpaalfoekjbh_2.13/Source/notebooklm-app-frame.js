// notebooklm-app-frame.js
// Runs in MAIN world inside the NotebookLM app iframe (*.usercontent.goog/notebooklm-apps/*).
// Listens for postMessage commands from the parent page (notebooklm.google.com) and
// performs DOM automation inside the iframe where buttons are directly accessible.
(() => {
    console.log('🃏 Capsule Hub: App frame script loaded inside NotebookLM app iframe.');

    // ── Helpers ────────────────────────────────────────────────────────────────

    const wait = (ms) => new Promise(r => setTimeout(r, ms));

    /**
     * Simulates a realistic native click sequence on an element.
     * Dispatches hover → focus → pointerdown → wait → pointerup → click.
     * This ensures Angular/Material initializes dynamic menu items (e.g. "Download")
     * the same way a human physical click would.
     */
    async function simulateNativeClick(element) {
        if (!element) return;

        // Step 1: hover parent container
        const parent = element.parentElement;
        if (parent) {
            parent.dispatchEvent(new PointerEvent('pointerenter', { bubbles: false, cancelable: false, view: window }));
            parent.dispatchEvent(new MouseEvent('mouseenter',   { bubbles: false, cancelable: false, view: window }));
            parent.dispatchEvent(new MouseEvent('mouseover',    { bubbles: true,  cancelable: true,  view: window }));
        }

        // Step 2: hover the button itself
        element.dispatchEvent(new PointerEvent('pointerenter', { bubbles: false, cancelable: false, view: window }));
        element.dispatchEvent(new MouseEvent('mouseenter',   { bubbles: false, cancelable: false, view: window }));
        element.dispatchEvent(new MouseEvent('mouseover',    { bubbles: true,  cancelable: true,  view: window }));

        await wait(60);

        // Step 3: focus
        try { element.focus(); } catch (_) {}

        // Step 4: press
        element.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true, view: window, isPrimary: true, button: 0 }));
        element.dispatchEvent(new MouseEvent('mousedown',    { bubbles: true, cancelable: true, view: window, button: 0 }));

        await wait(60);

        // Step 5: release + click
        element.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, cancelable: true, view: window, isPrimary: true, button: 0 }));
        element.dispatchEvent(new MouseEvent('mouseup',    { bubbles: true, cancelable: true, view: window, button: 0 }));
        element.dispatchEvent(new MouseEvent('click',      { bubbles: true, cancelable: true, view: window, button: 0 }));
    }

    // ── Command Handler ────────────────────────────────────────────────────────

    /**
     * Main handler: finds the flashcard 3-dots button inside this iframe,
     * clicks it, waits for the menu, then clicks "Download set".
     */
    async function handleDownloadCommand() {
        console.log('🃏 Capsule Hub [FRAME]: Received TILANTRA_CLICK_FLASHCARD_DOWNLOAD');

        // Find all 3-dots / more-options buttons in the iframe's DOM
        const allButtons = Array.from(document.querySelectorAll('button'));
        const threeDotsButtons = allButtons.filter(btn => {
            const html      = btn.innerHTML || '';
            const ariaLabel = (btn.getAttribute('aria-label') || '').toLowerCase();
            return html.includes('more_vert') ||
                   ariaLabel.includes('more')  ||
                   ariaLabel.includes('option') ||
                   btn.classList.contains('mat-mdc-menu-trigger') ||
                   btn.classList.contains('menu-icon');
        });

        console.log(`🃏 Capsule Hub [FRAME]: Found ${threeDotsButtons.length} 3-dots candidate(s)`);

        if (threeDotsButtons.length === 0) {
            const msg = 'No 3-dots button found inside flashcard frame. Is the flashcard set fully loaded?';
            console.error('🃏 Capsule Hub [FRAME]:', msg);
            window.parent.postMessage({ type: 'TILANTRA_FRAME_ERROR', error: msg }, '*');
            return;
        }

        // Log all candidates for debugging
        threeDotsButtons.forEach((btn, idx) => {
            const rect = btn.getBoundingClientRect();
            console.log(`🃏 Capsule Hub [FRAME]: Candidate #${idx}:`, btn.getAttribute('aria-label'), '| pos:', rect.top, rect.left);
        });

        // Prefer the last candidate (avoids any toolbar buttons that appear first in DOM order)
        const threeDotsBtn = threeDotsButtons[threeDotsButtons.length - 1];
        console.log('🃏 Capsule Hub [FRAME]: Clicking 3-dots button:', threeDotsBtn.outerHTML.substring(0, 200));

        await simulateNativeClick(threeDotsBtn);

        // Wait for Angular Material overlay/menu to render
        let downloadBtn = null;
        for (let attempt = 0; attempt < 35; attempt++) {
            await wait(100);

            const overlays = Array.from(document.querySelectorAll(
                '.cdk-overlay-container, .mat-menu-panel, .mat-mdc-menu-panel, [role="menu"]'
            ));

            for (const overlay of overlays) {
                const items = Array.from(overlay.querySelectorAll(
                    'button, [role="menuitem"], .mat-mdc-menu-item, .mat-menu-item'
                ));
                downloadBtn = items.find(item =>
                    (item.textContent || '').toLowerCase().includes('download')
                );
                if (downloadBtn) break;
            }

            if (downloadBtn) break;
        }

        if (!downloadBtn) {
            const msg = '"Download set" menu item not found in flashcard options after 3.5 seconds.';
            console.error('🃏 Capsule Hub [FRAME]:', msg);
            window.parent.postMessage({ type: 'TILANTRA_FRAME_ERROR', error: msg }, '*');
            return;
        }

        console.log('🃏 Capsule Hub [FRAME]: Found "Download set", clicking...');
        await simulateNativeClick(downloadBtn);
        // The interceptor (notebooklm-interceptor.js, also injected into this frame)
        // will catch the resulting createObjectURL / anchor click and postMessage the CSV to the parent.
    }

    // ── Message Listener ───────────────────────────────────────────────────────

    window.addEventListener('message', (event) => {
        // Only accept messages from the direct parent frame (the notebooklm.google.com page)
        if (event.source !== window.parent) return;

        const data = event.data;
        if (!data || typeof data !== 'object') return;

        if (data.type === 'TILANTRA_CLICK_FLASHCARD_DOWNLOAD') {
            handleDownloadCommand();
        }
    });

    console.log('🃏 Capsule Hub [FRAME]: Ready — listening for TILANTRA_CLICK_FLASHCARD_DOWNLOAD.');
})();
