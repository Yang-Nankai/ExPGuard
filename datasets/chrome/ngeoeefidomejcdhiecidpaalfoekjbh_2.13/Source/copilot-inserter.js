(() => {
    // ==========================================
    // Microsoft Copilot privacy capsule (Gemini-style transparent mask)
    // ==========================================

    const TRIGGER_TEXT = "**ACTIVE CAPSULE CONTEXT**";

    const styleId = "privacy-capsule-style-copilot";
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            [data-capsule-input="true"] {
                position: relative !important;
                display: flex !important;
                justify-content: center !important;
                align-items: center !important;
                min-height: 120px !important;
                width: 100% !important;
                background: transparent !important;
                box-shadow: none !important;
                border: none !important;
            }

            /* NUCLEAR HIDE: Remove all original UI children visually */
            [data-capsule-input="true"] > * {
                display: none !important;
            }

            /* Show the fake input via pseudo-element on the container */
            [data-capsule-input="true"]::after {
                content: attr(data-capsule-label);
                position: static !important;
                color: #fff !important;
                font-size: 20px !important;
                font-family: ui-sans-serif, system-ui, -apple-system, sans-serif !important;
                font-weight: 600;
                text-align: center;
                background: transparent !important;
            }

            @media (prefers-color-scheme: light) {
                [data-capsule-input="true"]::after { color: #333 !important; }
            }
            
            [data-capsule-response="true"] {
                position: relative !important;
                display: flex !important;
                justify-content: flex-start !important;
                align-items: center !important;
                min-height: 60px !important;
                width: 100% !important;
                background: transparent !important;
            }
            
            [data-capsule-response="true"] > * {
                display: none !important;
            }
            
            [data-capsule-response="true"]::after {
                content: attr(data-privacy-label);
                position: static !important;
                color: #a1a1aa !important;
                font-size: 16px !important;
                font-family: ui-sans-serif, system-ui, -apple-system, sans-serif !important;
                font-weight: 500;
                text-align: left;
            }
        `;
        document.head.appendChild(style);
    }

    function findUserBubble(startNode) {
        if (!startNode) return null;
        let current = startNode.parentElement || startNode.host || startNode;
        for (let i = 0; i < 15; i++) {
            if (!current) break;
            const c = current.className && typeof current.className === 'string' ? current.className : '';
            if (c.includes('user') || c.includes('User') || current.getAttribute?.('source') === 'user' || current.tagName?.toLowerCase() === 'cib-message') {
                return current;
            }
            if (c.includes('cl-message-bubble') || current.tagName?.toLowerCase() === 'cib-chat-turn') return current;
            current = current.parentElement || current.host;
        }
        return startNode.parentElement;
    }

    function getTextNodesContaining(root, needle) {
        const matches = [];
        function walk(node) {
            if (node.nodeType === Node.TEXT_NODE) {
                if (node.nodeValue && node.nodeValue.includes(needle)) {
                    matches.push(node);
                }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                if (node.shadowRoot) walk(node.shadowRoot);
                for (const child of node.childNodes) walk(child);
            } else if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
                for (const child of node.childNodes) walk(child);
            }
        }
        walk(root);
        return matches;
    }

    function isInSidebar(el) {
        if (!el) return false;
        let node = el;
        while (node && node !== document.body) {
            if (!node.tagName) { node = node.parentElement || node.host; continue; }
            const tag = node.tagName.toLowerCase();
            if (tag === 'nav' || tag === 'aside') return true;
            node = node.parentElement || node.host;
        }
        return false;
    }

    /**
     * Returns true if the element is inside the Copilot input/composer area.
     * This prevents scanAndMask from masking the textarea while the capsule
     * text is temporarily set there before being sent.
     */
    function isInComposer(el) {
        if (!el) return false;
        let node = el;
        while (node && node !== document.body) {
            if (!node.tagName) { node = node.parentElement || node.host; continue; }
            const tag = node.tagName.toLowerCase();
            // Direct input elements
            if (tag === 'textarea' || tag === 'input') return true;
            // Contenteditable composer boxes
            if (node.getAttribute && node.getAttribute('contenteditable') === 'true') return true;
            // Role-based detection
            if (node.getAttribute && node.getAttribute('role') === 'textbox') return true;
            // Copilot's specific searchbox id
            if (node.id === 'searchbox') return true;
            // Copilot composer area class names
            if (typeof node.className === 'string' && (
                node.className.includes('composer') ||
                node.className.includes('input-area') ||
                node.className.includes('searchbox')
            )) return true;
            node = node.parentElement || node.host;
        }
        return false;
    }

    function maskElement(el, label, isResponse) {
        if (!el) return;
        if (isInSidebar(el)) return;
        // Never mask the input/composer area — only mask sent chat bubbles
        if (isInComposer(el)) return;
        
        if (!el.hasAttribute('data-capsule-masked')) {
            el.setAttribute('data-capsule-masked', 'true');
            if (isResponse) {
                el.setAttribute('data-capsule-response', 'true');
                el.setAttribute('data-privacy-label', label);
            } else {
                el.setAttribute('data-capsule-input', 'true');
                el.setAttribute('data-capsule-label', label);
            }
            
            const rootNode = el.getRootNode();
            if (rootNode instanceof ShadowRoot && !rootNode.getElementById(styleId)) {
                const styleClone = document.getElementById(styleId).cloneNode(true);
                rootNode.appendChild(styleClone);
            }
        }
    }

    function elementIsAfter(a, b) {
        const position = b.compareDocumentPosition(a);
        return Boolean(position & Node.DOCUMENT_POSITION_FOLLOWING);
    }

    function findNextAssistantMessageContainer(triggerNode) {
        const candidates = [];
        function walk(node) {
            if (node.nodeType === Node.ELEMENT_NODE) {
                const tag = node.tagName.toLowerCase();
                const source = node.getAttribute('source');
                if ((tag === 'cib-message' && source === 'bot') || node.matches('[class*="message"], [class*="Message"], [class*="assistant"], [class*="bubble"], article, .ac-textBlock')) {
                    candidates.push(node);
                }
                if (node.shadowRoot) walk(node.shadowRoot);
            }
            if (node.childNodes) node.childNodes.forEach(walk);
        }
        walk(document.body);
        
        const nextEl = candidates.find((el) => {
            return elementIsAfter(triggerNode, el);
        });
        
        if (!nextEl) return null;
        const tag = nextEl.tagName ? nextEl.tagName.toLowerCase() : '';
        if (tag === 'textarea' || nextEl.getAttribute?.('contenteditable') === 'true' || nextEl.id === 'searchbox') return null;
        return nextEl;
    }

    function scanAndMask() {
        const triggerNodes = getTextNodesContaining(document.body, "ACTIVE CAPSULE CONTEXT");
        if (!triggerNodes.length) return;

        // Filter out trigger nodes found inside the composer/input area —
        // the capsule text sits in the textarea briefly before being sent.
        // We only want to mask text nodes that are in the actual chat history.
        const mainTriggerNodes = triggerNodes.filter(n =>
            !isInSidebar(n.parentElement) && !isInComposer(n.parentElement)
        );
        for (const triggerNode of mainTriggerNodes) {
            const userBubble = findUserBubble(triggerNode.parentElement);
            if (userBubble) {
                // Extra safety: skip if findUserBubble resolved to a composer ancestor
                if (isInComposer(userBubble)) continue;
                const bubbleText = userBubble.textContent || "";
                const tagMatch = bubbleText.match(/ACTIVE CAPSULE CONTEXT:([^\n*]+)/);
                const rawTag = tagMatch && tagMatch[1] ? tagMatch[1].trim() : null;
                const label = rawTag
                    ? `Adding Context of Capsule: ${rawTag} 👀`
                    : "Adding capsule context to this conversation 👀";
                    
                maskElement(userBubble, label, false);
                // Wait for the next assistant response
                const aiContainer = findNextAssistantMessageContainer(triggerNode);
                if (aiContainer) {
                    maskElement(aiContainer, "Capsule Injection Successful ✨", true);
                }
            }
        }
    }

    const observer = new MutationObserver(() => { scanAndMask(); });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    scanAndMask();

    /* ========== FILE INJECTION (page-world) ========== */
    window.addEventListener('CAPSULE_COPILOT_INJECT_FILES', function (e) {
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

        const fileInput = document.querySelector('input[type="file"][accept*="image"], input[type="file"][accept*="pdf"]') ||
            document.querySelector('input[type="file"]');

        if (!fileInput) return;

        const dt = new DataTransfer();
        files.forEach(f => dt.items.add(f));
        Object.defineProperty(fileInput, 'files', { value: dt.files, configurable: true, writable: false });
        if (fileInput._valueTracker) fileInput._valueTracker.setValue('');
        fileInput.dispatchEvent(new Event('change', { bubbles: true }));
        fileInput.dispatchEvent(new Event('input', { bubbles: true }));
    });
})();
