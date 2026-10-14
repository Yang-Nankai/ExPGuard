// ==========================================
// 🛡️ REPLIT CAPSULE INSERTER (Page World)
// ==========================================
(function () {

    // === PART 1: Text Insertion (via postMessage from content.js) ===
    window.addEventListener('message', async (event) => {
        if (event.data.type === 'INSERT_CAPSULE_CONTENT') {
            const { content } = event.data;

            // Replit uses a CodeMirror editor (contenteditable div) for the prompt input
            const editor = document.querySelector('div.cm-content[contenteditable="true"]') ||
                document.querySelector('#ai-prompt-input div[contenteditable="true"]') ||
                document.querySelector('div[data-cy="ai-prompt-input"] div[contenteditable="true"]') ||
                document.querySelector('textarea');

            if (editor) {
                editor.focus();

                if (editor.tagName.toLowerCase() === 'textarea') {
                    // Native textarea (e.g. Replit home-page React Aria prompt box).
                    // Set value via the native setter, then reset React's internal
                    // value tracker so the controlled component fires onChange.
                    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
                        window.HTMLTextAreaElement.prototype, 'value'
                    ).set;
                    nativeInputValueSetter.call(editor, content);
                    if (editor._valueTracker) editor._valueTracker.setValue('');
                    editor.dispatchEvent(new InputEvent('input', {
                        bubbles: true, data: content, inputType: 'insertText'
                    }));
                    editor.dispatchEvent(new Event('change', { bubbles: true }));
                } else {
                    // ContentEditable — use execCommand
                    const range = document.createRange();
                    const selection = window.getSelection();
                    range.selectNodeContents(editor);
                    range.collapse(false);
                    selection.removeAllRanges();
                    selection.addRange(range);

                    if (!document.execCommand('insertText', false, content)) {
                        editor.textContent += content;
                        editor.dispatchEvent(new Event('input', { bubbles: true }));
                    }
                }

                window.postMessage({ type: 'CAPSULE_INSERTED_SUCCESS' }, '*');

                // Auto-send after a delay for state sync
                setTimeout(() => {
                    const sendBtn = document.querySelector('button[data-cy="ai-prompt-submit"]') ||
                        document.querySelector('button[aria-label="Start"]') ||
                        document.querySelector('button[aria-label*="Send"]');
                    if (sendBtn && !sendBtn.disabled) {
                        sendBtn.click();
                    }
                }, 800);
            } else {
                console.error("❌ [Replit Inserter] Prompt area not found");
            }
        }
    });

    // === PART 2: Privacy Masking ===
    // Hides the injected capsule context from the user's view, replacing it
    // with a clean "Adding capsule context..." label (same pattern as claude-inserter.js).
    const TRIGGER_TEXT = "Adding capsule context to this conversation! Say Hi.";
    const ALT_TRIGGER = "ACTIVE CAPSULE CONTEXT";

    const styleId = "capsule-replit-privacy-style";
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            @keyframes capsuleFadeIn {
                from { opacity: 0; transform: translateY(4px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .capsule-replit-masked {
                position: relative !important;
            }
            .capsule-replit-masked > * {
                visibility: hidden !important;
                opacity: 0 !important;
                pointer-events: none !important;
            }
            .capsule-replit-masked {
                display: block !important;
                height: 44px !important;
                min-height: 44px !important;
                overflow: hidden !important;
                width: 100% !important;
            }
            .capsule-replit-label {
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
                border-left: 4px solid #f26522 !important;
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

    function findMessageBubble(node) {
        let current = node;
        for (let i = 0; i < 10; i++) {
            if (!current) break;
            // Replit renders messages as <li> inside an <ol> in a section[role="status"]
            if (current.tagName === 'LI' && current.parentElement?.tagName === 'OL') {
                return current;
            }
            const cl = current.className || '';
            if (typeof cl === 'string' && (
                cl.includes('message') || cl.includes('Message') ||
                cl.includes('bubble') || cl.includes('chat-message') ||
                cl.includes('justify-end') || cl.includes('useMessages')
            )) {
                return current;
            }
            current = current.parentElement;
        }
        return null;
    }

    function scanAndMask() {
        const markers = [TRIGGER_TEXT, ALT_TRIGGER];
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        let node;
        while (node = walker.nextNode()) {
            if (!node.nodeValue) continue;
            for (const marker of markers) {
                if (node.nodeValue.includes(marker)) {
                    const bubble = findMessageBubble(node.parentElement);
                    if (bubble && !bubble.hasAttribute('data-capsule-masked')) {
                        bubble.setAttribute('data-capsule-masked', 'true');
                        bubble.classList.add('capsule-replit-masked');

                        const bubbleText = bubble.textContent || "";
                        const tagMatch = bubbleText.match(/ACTIVE CAPSULE CONTEXT:\s*([^\n*]+)/);
                        const rawTag = tagMatch && tagMatch[1] ? tagMatch[1].trim() : null;
                        const label = rawTag
                            ? `Adding Context of Capsule: ${rawTag} 👀`
                            : "Adding capsule context to this conversation 👀";

                        const overlay = document.createElement('div');
                        overlay.className = 'capsule-replit-label';
                        overlay.textContent = label;
                        bubble.appendChild(overlay);
                    }
                }
            }
        }
    }

    const observer = new MutationObserver(() => scanAndMask());
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    scanAndMask();

    // === PART 3: File Injection Handler ===
    // Listens for file injection requests from the content script and injects
    // files via file input or drag-drop fallback.
    window.addEventListener('CAPSULE_REPLIT_INJECT_FILES', function (e) {
        const attachments = e.detail && e.detail.attachments;
        if (!attachments || !attachments.length) return;

        function base64ToFile(base64, filename, mime) {
            let finalFilename = filename || "";
            let finalMime = mime || "";
            const lowerName = finalFilename.toLowerCase();
            if (lowerName.endsWith('.wav.txt') || lowerName.endsWith('_wav.txt') || lowerName.endsWith('.m4a.txt') || lowerName.endsWith('.mp3.txt')) {
                finalFilename = finalFilename.slice(0, -4);
                if (finalFilename.toLowerCase().endsWith('_wav')) {
                    finalFilename = finalFilename.slice(0, -4) + '.wav';
                }
                if (finalFilename.toLowerCase().endsWith('.wav')) {
                    finalMime = 'audio/wav';
                } else if (finalFilename.toLowerCase().endsWith('.m4a')) {
                    finalMime = 'audio/x-m4a';
                } else if (finalFilename.toLowerCase().endsWith('.mp3')) {
                    finalMime = 'audio/mpeg';
                }
                console.log(`🔊 Capsule Hub: Unmasked disguised audio file! Renamed from "${filename}" to "${finalFilename}" with MIME "${finalMime}"`);
            }

            const clean = base64.includes(',') ? base64.split(',')[1] : base64;
            const bytes = atob(clean);
            const arr = new Uint8Array(bytes.length);
            for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
            return new File([arr], finalFilename, { type: finalMime });
        }

        const files = attachments.map(a => base64ToFile(a.base64, a.filename, a.mime));

        // Try file input first
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) {
            const dt = new DataTransfer();
            files.forEach(f => dt.items.add(f));
            Object.defineProperty(fileInput, 'files', {
                value: dt.files, configurable: true, writable: false
            });
            if (fileInput._valueTracker) fileInput._valueTracker.setValue('');
            fileInput.dispatchEvent(new Event('change', { bubbles: true }));
            fileInput.dispatchEvent(new Event('input', { bubbles: true }));
            return;
        }

        // Fallback: drag-drop onto the chat area
        const target = document.querySelector('div.cm-content[contenteditable="true"]') ||
            document.querySelector('div[contenteditable="true"]') ||
            document.querySelector('[data-agent-input2-drop-target]') ||
            document.body;

        const dataTransfer = new DataTransfer();
        files.forEach(f => dataTransfer.items.add(f));

        function createDragEvent(type, dt) {
            return new DragEvent(type, {
                bubbles: true, cancelable: true, composed: true,
                view: window, dataTransfer: dt
            });
        }

        target.dispatchEvent(createDragEvent('dragenter', dataTransfer));
        target.dispatchEvent(createDragEvent('dragover', dataTransfer));
        target.dispatchEvent(createDragEvent('drop', dataTransfer));
    });

})();
