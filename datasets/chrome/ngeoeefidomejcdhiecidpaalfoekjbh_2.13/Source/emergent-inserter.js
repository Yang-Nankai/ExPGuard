// ==========================================
// 🛡️ EMERGENT CAPSULE INSERTER (Page World)
// ==========================================
(function () {
    // === PART 1: Privacy Masking ===
    const TRIGGER_TEXT = "Adding capsule context to this conversation! Say Hi.";
    const ALT_TRIGGER = "ACTIVE CAPSULE CONTEXT";

    const styleId = "capsule-emergent-privacy-style";
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            @keyframes capsuleFadeIn {
                from { opacity: 0; transform: translateY(4px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .capsule-emergent-masked {
                position: relative !important;
                display: block !important;
                height: 44px !important;
                min-height: 44px !important;
                overflow: hidden !important;
                width: 100% !important;
            }
            .capsule-emergent-masked > * {
                visibility: hidden !important;
                opacity: 0 !important;
                pointer-events: none !important;
            }
            .capsule-emergent-label {
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
                border-left: 4px solid #80FFF9 !important;
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
            const cl = current.className || '';
            if (typeof cl === 'string' && (cl.includes('message') || cl.includes('bubble') || cl.includes('chat'))) {
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
                    const bubble = findMessageBubble(node.parentElement) || node.parentElement;
                    if (bubble && !bubble.hasAttribute('data-capsule-masked')) {
                        bubble.setAttribute('data-capsule-masked', 'true');
                        bubble.classList.add('capsule-emergent-masked');

                        const bubbleText = bubble.textContent || "";
                        const tagMatch = bubbleText.match(/ACTIVE CAPSULE CONTEXT:\s*([^\n*]+)/);
                        const rawTag = tagMatch && tagMatch[1] ? tagMatch[1].trim() : null;
                        const label = rawTag
                            ? `Adding Context of Capsule: ${rawTag} 👀`
                            : "Adding capsule context to this conversation 👀";

                        const overlay = document.createElement('div');
                        overlay.className = 'capsule-emergent-label';
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

    let activeUploadPromise = null;

    // === PART 2: File Injection Handler ===
    window.addEventListener('CAPSULE_EMERGENT_INJECT_FILES', function (e) {
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

        activeUploadPromise = new Promise((resolve) => {
            // First, trigger the attach button click to open the modal portal
            const clickAttachButton = () => {
                const attachBtn = document.querySelector('button[class*="group/paperclip"]') ||
                                  document.querySelector('button[aria-label*="attach" i]') ||
                                  document.querySelector('button[title*="attach" i]');
                if (attachBtn) {
                    attachBtn.click();
                    return true;
                }
                return false;
            };

            clickAttachButton();

            // Poll for the file input to appear in the DOM (max 3.75 seconds)
            let inputCheckAttempts = 0;
            const inputInterval = setInterval(() => {
                const fileInput = document.querySelector('input[type="file"]');
                if (fileInput) {
                    clearInterval(inputInterval);
                    
                    // We found the file input! Now populate it.
                    const dt = new DataTransfer();
                    files.forEach(f => dt.items.add(f));
                    
                    Object.defineProperty(fileInput, 'files', {
                        value: dt.files,
                        configurable: true,
                        writable: false
                    });
                    if (fileInput._valueTracker) fileInput._valueTracker.setValue('');
                    
                    fileInput.dispatchEvent(new Event('change', { bubbles: true }));
                    fileInput.dispatchEvent(new Event('input', { bubbles: true }));

                    // Poll for the confirm button ("Attach X Files") to become enabled
                    let confirmAttempts = 0;
                    const confirmInterval = setInterval(() => {
                        const confirmBtn = Array.from(document.querySelectorAll('button')).find(btn => {
                            const text = btn.textContent || '';
                            return /attach.*file/i.test(text) || /attach/i.test(text);
                        });

                        if (confirmBtn && !confirmBtn.disabled) {
                            clearInterval(confirmInterval);
                            confirmBtn.click();

                            // Poll until the modal disappears (upload is complete)
                            let uploadCheckAttempts = 0;
                            const uploadInterval = setInterval(() => {
                                const hasModal = Array.from(document.querySelectorAll('div, [role="dialog"]')).some(el => {
                                    return el.textContent && el.textContent.includes('Attach Files') && el.offsetWidth > 0;
                                });

                                if (!hasModal || ++uploadCheckAttempts > 80) {
                                    clearInterval(uploadInterval);
                                    setTimeout(resolve, 300); // Small safety buffer
                                }
                            }, 250);
                        }

                        if (++confirmAttempts > 30) {
                            clearInterval(confirmInterval);
                            resolve(); // Fallback if confirm button doesn't show up/enable
                        }
                    }, 250);
                }

                if (++inputCheckAttempts > 25) {
                    clearInterval(inputInterval);
                    
                    // Fallback to drag-drop simulation if file input doesn't show up
                    fallbackDragDrop();
                }
            }, 150);

            function fallbackDragDrop() {
                const dataTransfer = new DataTransfer();
                files.forEach(f => dataTransfer.items.add(f));

                const target = document.querySelector('div[contenteditable="true"]') || document.querySelector('textarea') || document.body;
                
                function createDragEvent(type, dt) {
                    return new DragEvent(type, { bubbles: true, cancelable: true, composed: true, view: window, dataTransfer: dt });
                }

                target.dispatchEvent(createDragEvent('dragenter', dataTransfer));
                target.dispatchEvent(createDragEvent('dragover', dataTransfer));
                target.dispatchEvent(createDragEvent('drop', dataTransfer));

                setTimeout(() => {
                    const cleanupTargets = [target, document.body, window];
                    const allDivs = document.querySelectorAll('div');
                    for (const div of allDivs) {
                        const text = (div.textContent || "").toLowerCase();
                        if (text.includes("drop") || text.includes("upload") || text.includes("drag")) {
                            cleanupTargets.unshift(div);
                        }
                    }
                    cleanupTargets.forEach(el => {
                        if (el) {
                            el.dispatchEvent(createDragEvent('dragleave', dataTransfer));
                            el.dispatchEvent(createDragEvent('dragend', dataTransfer));
                            el.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
                        }
                    });
                    resolve();
                }, 100);
            }
        });
    });

    // === PART 3: Text Insertion Handler ===
    window.addEventListener('CAPSULE_EMERGENT_INJECT_TEXT', function (e) {
        const content = e.detail && e.detail.content;
        if (!content) return;

        const performTextInjection = () => {
            const editor = document.querySelector('div[contenteditable="true"]') ||
                           document.querySelector('textarea[placeholder*="Message" i]') ||
                           document.querySelector('textarea[placeholder*="Build" i]') ||
                           document.querySelector('textarea');

            if (editor) {
                editor.focus();

                if (editor.tagName && editor.tagName.toLowerCase() === 'textarea') {
                    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
                        window.HTMLTextAreaElement.prototype, 'value'
                    ).set;
                    nativeInputValueSetter.call(editor, content);
                    editor.dispatchEvent(new Event('input', { bubbles: true }));
                    editor.dispatchEvent(new Event('change', { bubbles: true }));
                } else {
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

                // Auto-send after brief sync delay
                setTimeout(() => {
                    const sendBtn = document.querySelector('button.bg-textarea-submit-btn-bg') ||
                                    document.querySelector('button[class*="bg-textarea-submit-btn-bg"]') ||
                                    document.querySelector('button[aria-label*="Send" i]') ||
                                    Array.from(document.querySelectorAll('button')).find(b => b.querySelector('svg') && !b.disabled);
                    if (sendBtn && !sendBtn.disabled) {
                        sendBtn.click();
                    }
                }, 400);
            } else {
                console.error("❌ [Emergent Inserter] Prompt textarea/editor not found");
            }
        };

        if (activeUploadPromise) {
            activeUploadPromise.then(() => {
                activeUploadPromise = null;
                performTextInjection();
            });
        } else {
            performTextInjection();
        }
    });
})();
