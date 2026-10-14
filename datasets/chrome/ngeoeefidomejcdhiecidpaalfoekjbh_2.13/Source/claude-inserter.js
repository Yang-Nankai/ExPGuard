(() => {
    console.log('[Capsule] claude-inserter.js v5 (MAIN world) loaded');

    // ==========================================
    // PRIVACY MASKING
    // ==========================================
    const TRIGGER_TEXT = "Adding capsule context to this conversation! Say Hi.";
    const ALT_TRIGGER = "ACTIVE CAPSULE CONTEXT";

    const styleId = "privacy-capsule-style-final";
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            @keyframes capsuleFadeIn {
                from { opacity: 0; transform: translateY(4px); }
                to { opacity: 1; transform: translateY(0); }
            }

            .privacy-mask-active {
                position: relative !important;
            }

            .privacy-mask-active > * {
                visibility: hidden !important;
                opacity: 0 !important;
                pointer-events: none !important;
            }

            .privacy-mask-active::after {
                position: absolute;
                top: 0; left: 0; right: 0; bottom: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: ui-sans-serif, system-ui, -apple-system, sans-serif;
                font-weight: 500;
                font-size: 14px;
                border-radius: 12px;
                border: 1px solid #3f3f46;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
                z-index: 50;
                animation: capsuleFadeIn 0.4s ease-out forwards;
            }

            .privacy-mask-active[data-privacy-label*="Context"] {
                display: block !important;
                height: 40px !important;
                min-height: 40px !important;
                overflow: hidden !important;
                width: 100% !important;
            }

            .privacy-mask-active[data-privacy-label*="Context"]::after {
                content: none !important;
            }

            .capsule-label-overlay {
                visibility: visible !important;
                opacity: 1 !important;
                display: flex !important;
                position: absolute !important;
                top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
                align-items: center !important;
                justify-content: center !important;
                z-index: 51 !important;
                pointer-events: auto !important;
                background: linear-gradient(145deg, #27272a 0%, #18181b 100%) !important;
                border-left: 4px solid #d97706 !important;
                border-radius: 12px !important;
                color: #e4e4e7 !important;
                font-weight: 600 !important;
                font-size: 14px !important;
                font-family: ui-sans-serif, system-ui, -apple-system, sans-serif !important;
                animation: capsuleFadeIn 0.4s ease-out forwards;
            }
        `;
        document.head.appendChild(style);
    }

    function findUserBubble(startNode) {
        let current = startNode;
        for (let i = 0; i < 8; i++) {
            if (!current) break;
            if (current.classList && current.classList.contains('bg-bg-300')) {
                return current;
            }
            current = current.parentElement;
        }
        return null;
    }

    function getTextNodesContaining(root, needle) {
        const matches = [];
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
        let node;
        while (node = walker.nextNode()) {
            if (node.nodeValue && node.nodeValue.includes(needle)) {
                matches.push(node);
            }
        }
        return matches;
    }

    function maskElement(el, label) {
        if (!el) return;
        if (!el.hasAttribute('data-capsule-masked')) {
            el.setAttribute('data-capsule-masked', 'true');
            el.setAttribute('data-privacy-label', label);
            el.classList.add('privacy-mask-active');
            const overlay = document.createElement('div');
            overlay.className = 'capsule-label-overlay';
            overlay.textContent = label;
            el.appendChild(overlay);
        }
    }

    function scanAndMask() {
        const markers = [TRIGGER_TEXT, ALT_TRIGGER];
        for (const marker of markers) {
            const triggerNodes = getTextNodesContaining(document.body, marker);
            for (const triggerNode of triggerNodes) {
                const userBubble = findUserBubble(triggerNode.parentElement);
                if (userBubble) {
                    const bubbleText = userBubble.textContent || "";
                    const tagMatch = bubbleText.match(/ACTIVE CAPSULE CONTEXT:([^\n*]+)/);
                    const rawTag = tagMatch && tagMatch[1] ? tagMatch[1].trim() : null;
                    const label = rawTag
                        ? `Adding Context of Capsule: ${rawTag} 👀`
                        : "Adding capsule context to this conversation 👀";
                    maskElement(userBubble, label);
                }
            }
        }
    }

    const observer = new MutationObserver(() => { scanAndMask(); });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    scanAndMask();

    // ==========================================
    // FILE INJECTION (page-world handler)
    // ==========================================

    function detectMimeFromBytes(arr) {
        if (arr[0] === 0x89 && arr[1] === 0x50 && arr[2] === 0x4e && arr[3] === 0x47) return 'image/png';
        if (arr[0] === 0xff && arr[1] === 0xd8 && arr[2] === 0xff) return 'image/jpeg';
        if (arr[0] === 0x25 && arr[1] === 0x50 && arr[2] === 0x44 && arr[3] === 0x46) return 'application/pdf';
        if (arr[0] === 0x47 && arr[1] === 0x49 && arr[2] === 0x46) return 'image/gif';
        if (arr[0] === 0x52 && arr[1] === 0x49 && arr[2] === 0x46 && arr[3] === 0x46) return 'image/webp';
        return null;
    }

    function base64ToFile(base64, filename, mime) {
        let finalFilename = filename || "";
        let finalMime = mime || "";
        const lowerName = finalFilename.toLowerCase();
        if (lowerName.endsWith('.wav.txt') || lowerName.endsWith('_wav.txt') || lowerName.endsWith('.m4a.txt') || lowerName.endsWith('.mp3.txt')) {
            finalFilename = finalFilename.slice(0, -4);
            if (finalFilename.toLowerCase().endsWith('_wav')) finalFilename = finalFilename.slice(0, -4) + '.wav';
            if (finalFilename.toLowerCase().endsWith('.wav')) finalMime = 'audio/wav';
            else if (finalFilename.toLowerCase().endsWith('.m4a')) finalMime = 'audio/x-m4a';
            else if (finalFilename.toLowerCase().endsWith('.mp3')) finalMime = 'audio/mpeg';
        }
        const clean = base64.includes(',') ? base64.split(',')[1] : base64;
        if (!clean) { console.warn('[Capsule] Empty base64 for', finalFilename); return null; }
        const bytes = atob(clean);
        const arr = new Uint8Array(bytes.length);
        for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);

        // Detect actual MIME from magic bytes — stored MIME may be wrong
        // (e.g. PDF captured as PNG during conversation scraping, stored as application/pdf)
        const detectedMime = detectMimeFromBytes(arr);
        if (detectedMime && detectedMime !== finalMime) {
            console.warn('[Capsule] MIME mismatch — stored:', finalMime, '— actual:', detectedMime, '— using actual');
            finalMime = detectedMime;
            // Fix filename extension to match actual type if it disagrees
            if (detectedMime === 'image/png' && !finalFilename.toLowerCase().endsWith('.png')) {
                finalFilename = finalFilename.replace(/\.[^.]+$/, '') + '.png';
            } else if (detectedMime === 'image/jpeg' && !finalFilename.match(/\.(jpg|jpeg)$/i)) {
                finalFilename = finalFilename.replace(/\.[^.]+$/, '') + '.jpg';
            }
        }

        const magic = Array.from(arr.slice(0, 4)).map(b => b.toString(16).padStart(2, '0')).join(' ');
        console.log('[Capsule] File:', finalFilename, '| size:', arr.length, '| magic:', magic, '| mime:', finalMime);
        return new File([arr], finalFilename, { type: finalMime });
    }

    function doInjectFiles(attachments, retryCount = 0) {
        const files = attachments.map(a => base64ToFile(a.base64, a.filename, a.mime)).filter(Boolean);
        if (!files.length) { console.warn('[Capsule] No valid files after decode'); return; }

        const dt = new DataTransfer();
        files.forEach(f => dt.items.add(f));

        // Method 1: File input — most reliable in React apps.
        // Claude uses a hidden <input type="file"> that React listens to via change/input events.
        const fileInput =
            document.getElementById('chat-input-file-upload-onpage') ||
            document.getElementById('chat-input-file-upload-bottom') ||
            document.querySelector('[data-testid="file-upload"]') ||
            document.querySelector('input[type="file"]');

        if (fileInput) {
            console.log('[Capsule] Injecting via file input:', fileInput.id || fileInput.getAttribute('data-testid') || 'unknown');
            try {
                Object.defineProperty(fileInput, 'files', { value: dt.files, configurable: true, writable: false });
            } catch (e) {
                // Property already defined — redefine with configurable flag
                Object.defineProperty(fileInput, 'files', { get: () => dt.files, configurable: true });
            }
            if (fileInput._valueTracker) fileInput._valueTracker.setValue('');
            fileInput.dispatchEvent(new Event('change', { bubbles: true }));
            fileInput.dispatchEvent(new Event('input',  { bubbles: true }));
            return;
        }

        // File input not found yet — page may still be rendering after navigation.
        // Retry up to 5 times (2.5 seconds total) before giving up.
        if (retryCount < 5) {
            console.log('[Capsule] File input not found, retrying in 500ms... (attempt', retryCount + 1, 'of 5)');
            setTimeout(() => doInjectFiles(attachments, retryCount + 1), 500);
            return;
        }

        // Method 2: Drag-drop onto fieldset as last resort
        const dropTarget = document.querySelector('fieldset');
        if (dropTarget) {
            console.log('[Capsule] Injecting via drag-drop on fieldset (last resort)');
            dropTarget.dispatchEvent(new DragEvent('dragenter', { bubbles: true, cancelable: true, dataTransfer: dt }));
            dropTarget.dispatchEvent(new DragEvent('dragover',  { bubbles: true, cancelable: true, dataTransfer: dt }));
            dropTarget.dispatchEvent(new DragEvent('drop',      { bubbles: true, cancelable: true, dataTransfer: dt }));
            return;
        }

        console.error('[Capsule] No injection target found after', retryCount, 'retries');
    }

    // ── URL watcher: detect when Claude navigates to a new conversation URL ──
    // When a new conversation is created, Claude navigates from /new (or /) to
    // /chat/{uuid}. That navigation is the reliable signal that the conversation
    // exists server-side and file uploads will be accepted.
    let _queuedAttachments = null;
    let _urlWatcherInterval = null;
    let _urlWatcherTimeout = null;

    function startUrlWatcher() {
        if (_urlWatcherInterval) return;
        const startUrl = window.location.href;
        console.log('[Capsule] URL watcher started, waiting for /chat/{uuid}...');

        _urlWatcherInterval = setInterval(() => {
            const cur = window.location.href;
            if (cur === startUrl) return;

            const hasConvoId = /\/chat\/[a-z0-9-]{8,}/.test(cur);
            if (hasConvoId && _queuedAttachments) {
                clearInterval(_urlWatcherInterval);
                clearTimeout(_urlWatcherTimeout);
                _urlWatcherInterval = null;
                _urlWatcherTimeout = null;
                const pending = _queuedAttachments;
                _queuedAttachments = null;
                console.log('[Capsule] Conversation URL detected — injecting queued files:', cur);
                // Small delay to let Claude's UI finish rendering the new conversation's input area
                setTimeout(() => doInjectFiles(pending), 600);
            }
        }, 150);

        // Safety: abort after 30s to avoid leaking the interval
        _urlWatcherTimeout = setTimeout(() => {
            clearInterval(_urlWatcherInterval);
            _urlWatcherInterval = null;
            _queuedAttachments = null;
            console.warn('[Capsule] URL watcher timed out — conversation never navigated?');
        }, 30000);
    }

    // Immediate injection — for existing conversations (conversation already exists server-side)
    window.addEventListener('CAPSULE_CLAUDE_INJECT_FILES', function (e) {
        const attachments = e.detail && e.detail.attachments;
        if (!attachments || !attachments.length) return;
        console.log('[Capsule] CAPSULE_CLAUDE_INJECT_FILES received', attachments.length, 'file(s)');
        doInjectFiles(attachments);
    });

    // Queue injection — for new conversations (URL watcher fires after navigation)
    window.addEventListener('CAPSULE_CLAUDE_QUEUE_INJECT', function (e) {
        _queuedAttachments = e.detail && e.detail.attachments;
        console.log('[Capsule] Files queued, waiting for conversation URL...', _queuedAttachments?.length, 'file(s)');
        startUrlWatcher();
    });

    window.addEventListener('CAPSULE_CLAUDE_SEND', function () {
        const sendButton =
            document.querySelector('button[aria-label*="Send Message"]') ||
            document.querySelector('button[aria-label*="Send message"]');
        if (sendButton && !sendButton.disabled) {
            console.log('[Capsule] CAPSULE_CLAUDE_SEND: clicking send button');
            sendButton.click();
        } else {
            const textBox = document.querySelector('div[contenteditable="true"]');
            if (textBox) {
                console.log('[Capsule] CAPSULE_CLAUDE_SEND: simulating Enter key');
                textBox.dispatchEvent(new KeyboardEvent('keydown', {
                    bubbles: true, cancelable: true, key: 'Enter', code: 'Enter', keyCode: 13
                }));
            }
        }
    });

})();
