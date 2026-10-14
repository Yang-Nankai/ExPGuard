(() => {
    // Configuration
    const CAPSULE_ACTIVE = true; 
    
    // Toggle to true to hide raw text and show capsule banner; false to see raw text during testing
    const ENABLE_MASKING = true; 

    // CSV parsing and extraction helpers
    function parseCSV(text) {
        const lines = [];
        let row = [];
        let col = "";
        let inQuotes = false;
        
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const nextChar = text[i + 1];
            
            if (inQuotes) {
                if (char === '"') {
                    if (nextChar === '"') {
                        col += '"';
                        i++; // skip next quote
                    } else {
                        inQuotes = false;
                    }
                } else {
                    col += char;
                }
            } else {
                if (char === '"') {
                    inQuotes = true;
                } else if (char === ',') {
                    row.push(col.trim());
                    col = "";
                } else if (char === '\n' || char === '\r') {
                    row.push(col.trim());
                    col = "";
                    if (row.some(field => field.length > 0)) {
                        lines.push(row);
                    }
                    row = [];
                    if (char === '\r' && nextChar === '\n') {
                        i++; // skip LF
                    }
                } else {
                    col += char;
                }
            }
        }
        
        if (col || row.length > 0) {
            row.push(col.trim());
            if (row.some(field => field.length > 0)) {
                lines.push(row);
            }
        }
        return lines;
    }

    function getCsvDataWithTimeout(timeoutMs = 3000) {
        if (window.__tilantraCapturedCsvText) {
            return Promise.resolve(window.__tilantraCapturedCsvText);
        }
        return new Promise((resolve) => {
            const start = Date.now();
            const interval = setInterval(() => {
                if (window.__tilantraCapturedCsvText) {
                    clearInterval(interval);
                    resolve(window.__tilantraCapturedCsvText);
                } else if (Date.now() - start >= timeoutMs) {
                    clearInterval(interval);
                    resolve(null);
                }
            }, 100);
        });
    }

    function findThreeDotsButton(originBtn) {
        let container = originBtn ? (originBtn.closest('.artifact-card, .artifact-viewer, [class*="artifact-card"], [class*="artifact-viewer"]') || document.querySelector('studio-panel')) : document.querySelector('studio-panel');
        if (!container) {
            container = document.body;
        }
        
        console.log("🔊 Capsule Hub: Scanning container for 3-dots buttons:", container);
        const buttons = Array.from(container.querySelectorAll('button'));
        
        // Collect all potential 3-dots buttons in the container (NEVER scan global document to avoid top-level header/analytics buttons)
        const candidates = [];
        for (const btn of buttons) {
            const btnHTML = btn.innerHTML || "";
            const ariaLabel = btn.getAttribute('aria-label') || "";
            const isMoreOptions = ariaLabel.toLowerCase().includes('more option') ||
                                 btn.classList.contains('mat-mdc-menu-trigger') ||
                                 btn.classList.contains('menu-icon') ||
                                 btnHTML.includes('more_vert') ||
                                 (btn.querySelector('mat-icon')?.textContent || "").includes('more_vert');
            if (isMoreOptions && btn.style.display !== 'none') {
                candidates.push(btn);
            }
        }
        
        console.log("🔊 Capsule Hub: Candidates list:", candidates.map((c, i) => `Candidate #${i}: aria-label="${c.getAttribute('aria-label')}" class="${c.className}"`));
        
        if (candidates.length === 0) return null;
        if (candidates.length === 1) return candidates[0];
        
        // Prioritize the 3-dots button inside the displayed card box.
        // We walk up from each candidate button up to (but not including) the common container.
        // If we find any card text indicators along the way, it's the card button!
        const cardBtn = candidates.find(btn => {
            if (originBtn) {
                // Skip if the candidate is in the same toolbar/header wrapper as originBtn
                const headerToolbar = originBtn.closest('.toolbar, .header, [class*="toolbar"], [class*="header"], [class*="title-bar"]') || originBtn.parentElement;
                if (headerToolbar && headerToolbar.contains(btn)) {
                    console.log("🔊 Capsule Hub: Filtered candidate because it's in the header toolbar.");
                    return false;
                }
            }
            
            let curr = btn.parentElement;
            while (curr && curr !== container) {
                const text = curr.textContent || "";
                const hasCardText = text.includes('See answer') || 
                                    text.includes('Show answer') || 
                                    text.includes('Missed') || 
                                    /\d+\s*\/\s*\d+/.test(text);
                if (hasCardText) {
                    const className = (curr.className || "").toLowerCase();
                    // If we match card text indicators but are not in the main toolbar, it's our target!
                    if (!className.includes('toolbar') && !className.includes('header')) {
                        console.log("🔊 Capsule Hub: Matched card text indicators in parent chain:", className);
                        return true;
                    }
                }
                curr = curr.parentElement;
            }
            return false;
        });
        
        if (cardBtn) {
            console.log("🔊 Capsule Hub: Selected card's 3-dots button:", cardBtn);
            return cardBtn;
        }
        
        // Fallback: the card's 3-dots button is the last candidate inside the container (DOM order)
        console.log("🔊 Capsule Hub: Fallback to last candidate inside container.");
        return candidates[candidates.length - 1];
    }

    function simulateClick(element) {
        if (!element) return;
        const events = ['pointerdown', 'mousedown', 'pointerup', 'mouseup', 'click'];
        events.forEach(type => {
            const ev = type.startsWith('pointer') 
                ? new PointerEvent(type, { bubbles: true, cancelable: true, view: window, isPrimary: true })
                : new MouseEvent(type, { bubbles: true, cancelable: true, view: window });
            element.dispatchEvent(ev);
        });
    }

    function openAddSourcesDialog() {
        const btn = document.querySelector('button.add-source-button') || 
                    document.querySelector('button[aria-label*="Add source" i]') ||
                    document.querySelector('button[aria-label*="sources" i]') ||
                    Array.from(document.querySelectorAll('button')).find(b => b.textContent.toLowerCase().includes('add source') || b.textContent.toLowerCase().includes('add sources'));
        if (btn) {
            console.log("👉 Capsule Hub: Clicking Add Source button:", btn);
            simulateClick(btn);
            return true;
        }
        return false;
    }

    function findAndClickDownloadSet(originBtn) {
        return new Promise((resolve, reject) => {
            const threeDotsBtn = findThreeDotsButton(originBtn);
            if (!threeDotsBtn) {
                return reject(new Error("Could not find the options menu (3-dots) button on the screen."));
            }
            
            console.log("🔊 Capsule Hub: Clicking options 3-dots button with events...");
            simulateClick(threeDotsBtn);
            
            let attempts = 0;
            const interval = setInterval(() => {
                attempts++;
                const overlays = Array.from(document.querySelectorAll('.cdk-overlay-container, .mat-menu-panel, .mat-mdc-menu-panel, [role="menu"]'));
                let downloadBtn = null;
                
                for (const overlay of overlays) {
                    const items = Array.from(overlay.querySelectorAll('button, [role="menuitem"], .mat-mdc-menu-item, .mat-menu-item'));
                    for (const item of items) {
                        const text = item.textContent.toLowerCase();
                        if (text.includes('download set') || text.includes('download')) {
                            downloadBtn = item;
                            break;
                        }
                    }
                    if (downloadBtn) break;
                }
                
                if (downloadBtn) {
                    clearInterval(interval);
                    console.log("🔊 Capsule Hub: Found 'Download set' menu item, clicking it...");
                    simulateClick(downloadBtn);
                    resolve();
                } else if (attempts > 30) {
                    clearInterval(interval);
                    reject(new Error("Timed out waiting for options menu containing 'Download set' option."));
                }
            }, 100);
        });
    }

    // ──── Cross-Frame Communication ────────────────────────────────────────────────
    // The NotebookLM flashcard/quiz viewer runs inside a sandboxed cross-origin iframe
    // hosted on *.usercontent.goog. Direct DOM access is blocked by the browser's
    // Same-Origin Policy. We coordinate via HTML5 postMessage instead.

    /** Finds the NotebookLM app iframe in the current page's DOM. */
    function findNotebookLMAppFrame() {
        const iframes = Array.from(document.querySelectorAll('iframe'));
        return iframes.find(f => {
            const src = f.src || '';
            return src.includes('usercontent.goog') && src.includes('notebooklm-apps');
        });
    }

    /**
     * Sends a download command to the flashcard app iframe via postMessage.
     * The frame's content script (notebooklm-app-frame.js) handles the actual click.
     */
    async function clickFlashcardDownloadViaFrame() {
        const iframe = findNotebookLMAppFrame();
        if (!iframe) {
            throw new Error('Could not find the NotebookLM flashcard app frame. Please make sure the flashcard viewer is fully open on screen.');
        }
        if (!iframe.contentWindow) {
            throw new Error('Cannot access app frame window. The frame may not have loaded yet — please wait a moment and try again.');
        }
        console.log('👉 Capsule Hub: Sending TILANTRA_CLICK_FLASHCARD_DOWNLOAD to app frame...');
        iframe.contentWindow.postMessage({ type: 'TILANTRA_CLICK_FLASHCARD_DOWNLOAD' }, '*');
    }

    // Listen for messages relayed from the app iframe (CSV data or error reports).
    window.addEventListener('message', (event) => {
        const data = event.data;
        if (!data || typeof data !== 'object') return;

        if (data.type === 'TILANTRA_FLASHCARD_CSV_CAPTURED' && data.csvText) {
            console.log('🔊 Capsule Hub: Received flashcard CSV from app frame via postMessage (' + data.csvText.length + ' chars).');
            window.__tilantraCapturedCsvText = data.csvText;
        }

        if (data.type === 'TILANTRA_FRAME_ERROR') {
            console.error('🔊 Capsule Hub: Error reported from app frame:', data.error);
        }
    });
    // ──────────────────────────────────────────────────────────────────────────────

    let isProcessing = false; 

    // Inject Shared Capsule Styles (only applied if masking is enabled)
    const style = document.createElement('style');
    style.id = 'tilantra-capsule-mask-styles';
    style.textContent = `
        [data-capsule-input="true"] {
            position: relative !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            min-height: 120px !important;
            width: 100% !important;
            background: transparent !important;
            color: transparent !important;
        }

        [data-capsule-input="true"] > * {
            display: none !important;
        }

        [data-capsule-input="true"]::after {
            content: attr(data-capsule-label);
            position: static !important;
            color: #fff !important;
            font-size: 20px !important;
            font-family: var(--google-sans-font, "Google Sans", sans-serif) !important;
            font-weight: 500;
            text-align: center;
        }

        @media (prefers-color-scheme: light) {
            [data-capsule-input="true"]::after { color: #333 !important; }
        }
    `;

    if (ENABLE_MASKING) {
        document.head.appendChild(style);
    }

    // Inject Tier 2 Capture Styles
    const tier2Style = document.createElement('style');
    tier2Style.id = 'tilantra-capsule-tier2-styles';
    tier2Style.textContent = `
        .tilantra-capsule-save-audio-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
            color: #ffffff !important;
            border: none;
            padding: 6px 14px;
            border-radius: 20px;
            font-family: var(--google-sans-font, "Google Sans", sans-serif);
            font-size: 13px;
            font-weight: 500;
            cursor: pointer;
            margin-left: 8px;
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.2), 0 2px 4px -1px rgba(79, 70, 229, 0.1);
        }
        .tilantra-capsule-save-audio-btn:hover {
            background: linear-gradient(135deg, #4f46e5 0%, #4338ca 100%);
            transform: translateY(-1px);
            box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.3), 0 4px 6px -2px rgba(79, 70, 229, 0.15);
        }
        .tilantra-capsule-save-audio-btn:disabled {
            background: #4b5563 !important;
            cursor: not-allowed;
            box-shadow: none;
            transform: none;
        }

        .tilantra-capsule-save-artifact-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
            color: #ffffff !important;
            border: none;
            padding: 6px 12px;
            border-radius: 16px;
            font-family: var(--google-sans-font, "Google Sans", sans-serif);
            font-size: 12px;
            font-weight: 500;
            cursor: pointer;
            margin-left: 8px;
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.2), 0 2px 4px -1px rgba(79, 70, 229, 0.1);
        }
        .tilantra-capsule-save-artifact-btn:hover {
            background: linear-gradient(135deg, #4f46e5 0%, #4338ca 100%);
            transform: translateY(-1px);
            box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.3), 0 4px 6px -2px rgba(79, 70, 229, 0.15);
        }
        .tilantra-capsule-save-artifact-btn:disabled {
            background: #4b5563 !important;
            cursor: not-allowed;
            box-shadow: none;
            transform: none;
        }

        .tilantra-capsule-save-artifact-icon-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: rgba(99, 102, 241, 0.1);
            color: #818cf8 !important;
            border: 1px solid rgba(129, 140, 248, 0.2);
            width: 32px;
            height: 32px;
            border-radius: 50%;
            cursor: pointer;
            margin-left: 6px;
            transition: all 0.2s ease;
        }
        .tilantra-capsule-save-artifact-icon-btn:hover {
            background: rgba(99, 102, 241, 0.2);
            border-color: #818cf8;
            color: #a5b4fc !important;
            transform: scale(1.05);
        }
        .tilantra-capsule-save-artifact-icon-btn:disabled {
            background: rgba(156, 163, 175, 0.1) !important;
            border-color: rgba(156, 163, 175, 0.2);
            color: #9ca3af !important;
            cursor: not-allowed;
            transform: none;
        }

        .tilantra-mini-spinner {
            width: 12px;
            height: 12px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: #fff;
            animation: tilantraMiniSpin 0.8s linear infinite;
            display: inline-block;
            vertical-align: middle;
            margin-right: 4px;
        }
        @keyframes tilantraMiniSpin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(tier2Style);

    function getElementText(el) {
        if (!el) return "";
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            return el.value.trim();
        }
        return el.textContent.trim();
    }

    // Helpers for Audio Overview & Artifact Capture
    function findAudioPlayerControls(audioEl) {
        let parent = audioEl.parentElement;
        while (parent && parent !== document.body) {
            const buttons = parent.querySelectorAll('button');
            if (buttons.length > 0) {
                return { container: parent, buttons: Array.from(buttons) };
            }
            parent = parent.parentElement;
        }
        return { container: audioEl.parentElement, buttons: [] };
    }



    function findContentContainer(copyBtn) {
        let parent = copyBtn.parentElement;
        let depth = 0;
        while (parent && parent !== document.body && depth < 12) {
            const hasTextContent = parent.querySelector('h1, h2, h3, p, li, ul, ol');
            if (hasTextContent && parent.tagName !== 'BUTTON') {
                const className = (parent.className || '').toLowerCase();
                const id = (parent.id || '').toLowerCase();
                const tagName = parent.tagName.toLowerCase();
                if (className.includes('card') || className.includes('artifact') || className.includes('panel') || 
                    id.includes('card') || id.includes('artifact') || 
                    tagName === 'studio-panel' || tagName === 'mat-card' || tagName === 'section' ||
                    className.includes('viewer') || className.includes('container')) {
                    return parent;
                }
            }
            parent = parent.parentElement;
            depth++;
        }
        return copyBtn.closest('.card') || copyBtn.closest('.artifact') || copyBtn.closest('studio-panel') || copyBtn.parentElement;
    }

    function getNotebookTitle() {
        const titleEl = document.querySelector('div[class*="notebook-title"]') || 
                        document.querySelector('.notebook-title-text') ||
                        document.querySelector('header h1') || 
                        document.querySelector('header h2') ||
                        document.querySelector('h1') ||
                        document.querySelector('h2');
        return titleEl ? titleEl.textContent.trim() : "NotebookLM Notebook";
    }

    function parseArtifactToMarkdown(container) {
        // Helper to get text content, supporting inputs/textareas
        const getElementText = (el) => {
            if (!el) return "";
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                return el.value.trim();
            }
            return el.textContent.trim();
        };

        const titleEl = container.querySelector('input.artifact-title, .artifact-title, h1, h2, h3, [class*="title"]') || 
                        container.parentElement?.querySelector('input.artifact-title, .artifact-title, h1, h2, h3') ||
                        document.querySelector('studio-panel h2');
        const title = getElementText(titleEl) || "NotebookLM Artifact";
        
        const titleLower = title.toLowerCase();
        const textLower = container.textContent.toLowerCase();
        const classNameLower = (container.className || '').toLowerCase();
        
        const hasAppViewer = container.querySelector('app-viewer') || container.closest('artifact-viewer')?.querySelector('app-viewer') || document.querySelector('app-viewer');
        const isFlashcard = titleLower.includes('flashcard') || textLower.includes('flashcard') || classNameLower.includes('flashcard') || !!hasAppViewer;
        const isQuiz = titleLower.includes('quiz') || textLower.includes('quiz') || classNameLower.includes('quiz');
        
        let markdown = `# ${title}\n\n`;
        
        if (isFlashcard) {
            console.log("👉 Capsule Hub: Parsing as Flashcards from CSV");
            
            const csvText = window.__tilantraCapturedCsvText;
            if (csvText) {
                console.log("👉 Capsule Hub: Reconstructing flashcards from captured CSV text");
                const rows = parseCSV(csvText);
                if (rows.length > 0) {
                    let startIndex = 0;
                    // Check if first row is a header
                    const firstRow = rows[0];
                    if (firstRow.length >= 2 && 
                        (firstRow[0].toLowerCase().includes('front') || 
                         firstRow[0].toLowerCase().includes('question') || 
                         firstRow[0].toLowerCase().includes('q') || 
                         firstRow[1].toLowerCase().includes('back') || 
                         firstRow[1].toLowerCase().includes('answer') || 
                         firstRow[1].toLowerCase().includes('a'))) {
                        startIndex = 1;
                    }
                    
                    let count = 1;
                    for (let i = startIndex; i < rows.length; i++) {
                        const row = rows[i];
                        if (row.length >= 2) {
                            const front = row[0];
                            const back = row[1];
                            if (front && back) {
                                markdown += `### Flashcard ${count}\n**Front/Question:** ${front}\n**Back/Answer:** ${back}\n\n`;
                                count++;
                            }
                        }
                    }
                    return markdown;
                }
            }
            
            // Fallback: DOM parsing (e.g. if we are looking at a text guide that has a few inline cards)
            const cardElements = Array.from(container.querySelectorAll('.flashcard-card, [class*="flashcard-card"], .card-container, mat-card, [class*="card"]'))
                .filter(el => !el.className.includes('toolbar') && !el.className.includes('actions'));
            
            let count = 1;
            cardElements.forEach(card => {
                const front = card.querySelector('.front, .question, [class*="front"], [class*="question"]')?.textContent?.trim();
                const back = card.querySelector('.back, .answer, [class*="back"], [class*="answer"]')?.textContent?.trim();
                
                if (front && back) {
                    markdown += `### Flashcard ${count}\n**Front/Question:** ${front}\n**Back/Answer:** ${back}\n\n`;
                    count++;
                } else {
                    const paragraphs = Array.from(card.querySelectorAll('p, div, span'))
                        .map(el => el.textContent.trim())
                        .filter(t => t.length > 0 && !t.includes('Copy') && !t.includes('Save'));
                    if (paragraphs.length >= 2) {
                        markdown += `### Flashcard ${count}\n**Front/Question:** ${paragraphs[0]}\n**Back/Answer:** ${paragraphs[1]}\n\n`;
                        count++;
                    }
                }
            });
            
            if (count > 1) {
                return markdown;
            }
        }
        
        if (isQuiz) {
            console.log("👉 Capsule Hub: Parsing as Quiz");
            const questionContainers = Array.from(container.querySelectorAll('.question-container, [class*="question-container"], .quiz-question-card, [class*="question-card"]'));
            if (questionContainers.length > 0) {
                questionContainers.forEach((qCard, idx) => {
                    const questionText = qCard.querySelector('.question-text, h3, p, [class*="question"]')?.textContent?.trim() || `Question ${idx + 1}`;
                    markdown += `### ${idx + 1}. ${questionText}\n\n`;
                    
                    const options = Array.from(qCard.querySelectorAll('.option, li, [class*="option"]'))
                        .map(opt => opt.textContent.trim())
                        .filter(t => t.length > 0 && !t.includes('Copy') && !t.includes('Save'));
                        
                    if (options.length > 0) {
                        options.forEach(opt => {
                            markdown += `- [ ] ${opt}\n`;
                        });
                        markdown += `\n`;
                    }
                    
                    const explanation = qCard.querySelector('.explanation, .feedback, [class*="explanation"]')?.textContent?.trim();
                    if (explanation) {
                        markdown += `*Explanation:* ${explanation}\n\n`;
                    }
                });
                return markdown;
            }
        }
        
        const textContainer = container.querySelector('.artifact-content, .content, [class*="content"], .body, [class*="body"]') || container;
        
        const parseNode = (node) => {
            let nodeMarkdown = "";
            const tagName = node.tagName;
            
            if (!tagName) {
                return node.textContent;
            }
            
            const className = (node.className || '');
            if (tagName === 'BUTTON' || tagName === 'MAT-ICON' || 
                tagName === 'SCRIPT' || tagName === 'STYLE' ||
                (typeof className === 'string' && (
                    className.includes('toolbar') || 
                    className.includes('actions') ||
                    className.includes('tilantra-capsule') ||
                    className.includes('copy')
                ))) {
                return "";
            }
            
            if (tagName.match(/^H[1-6]$/)) {
                const level = tagName[1];
                const prefix = '#'.repeat(parseInt(level));
                let text = "";
                Array.from(node.childNodes).forEach(child => { text += parseNode(child); });
                nodeMarkdown += `\n\n${prefix} ${text.trim()}\n\n`;
            } else if (tagName === 'P') {
                let text = "";
                Array.from(node.childNodes).forEach(child => { text += parseNode(child); });
                nodeMarkdown += `\n\n${text.trim()}\n\n`;
            } else if (tagName === 'LI') {
                let text = "";
                Array.from(node.childNodes).forEach(child => { text += parseNode(child); });
                nodeMarkdown += `\n- ${text.trim()}`;
            } else if (tagName === 'BR') {
                nodeMarkdown += "\n";
            } else if (tagName === 'STRONG' || tagName === 'B') {
                let text = "";
                Array.from(node.childNodes).forEach(child => { text += parseNode(child); });
                return ` **${text.trim()}** `;
            } else if (tagName === 'EM' || tagName === 'I') {
                let text = "";
                Array.from(node.childNodes).forEach(child => { text += parseNode(child); });
                return ` *${text.trim()}* `;
            } else if (tagName === 'UL' || tagName === 'OL') {
                Array.from(node.children).forEach(child => {
                    nodeMarkdown += parseNode(child);
                });
                nodeMarkdown += "\n\n";
            } else if (tagName === 'TABLE') {
                let tableMarkdown = "\n\n";
                const rows = Array.from(node.querySelectorAll('tr'));
                rows.forEach((row, rIdx) => {
                    const cells = Array.from(row.querySelectorAll('th, td')).map(cell => cell.textContent.trim().replace(/\|/g, '\\|'));
                    tableMarkdown += "| " + cells.join(" | ") + " |\n";
                    if (rIdx === 0) {
                        tableMarkdown += "| " + cells.map(() => "---").join(" | ") + " |\n";
                    }
                });
                tableMarkdown += "\n\n";
                return tableMarkdown;
            } else if (tagName === 'DIV' || tagName === 'SECTION') {
                let childText = "";
                Array.from(node.childNodes).forEach(child => {
                    childText += parseNode(child);
                });
                if (node.parentElement === textContainer || 
                    (typeof className === 'string' && (className.includes('paragraph') || className.includes('block')))) {
                    nodeMarkdown += `\n\n${childText.trim()}\n\n`;
                } else {
                    nodeMarkdown += childText;
                }
            } else {
                Array.from(node.childNodes).forEach(child => {
                    nodeMarkdown += parseNode(child);
                });
            }
            return nodeMarkdown;
        };
        
        let bodyMarkdown = parseNode(textContainer);
        bodyMarkdown = bodyMarkdown.replace(/\n{3,}/g, '\n\n').trim();
        
        markdown += bodyMarkdown;
        return markdown;
    }

    function buildSVGIcon(size, strokeColor = 'currentColor', isCheckmark = false) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', size);
        svg.setAttribute('height', size);
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', strokeColor);
        svg.setAttribute('stroke-width', '2.5');
        svg.setAttribute('stroke-linecap', 'round');
        svg.setAttribute('stroke-linejoin', 'round');

        if (isCheckmark) {
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', 'M22 11.08V12a10 10 0 1 1-5.93-9.14');
            svg.appendChild(path);

            const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
            polyline.setAttribute('points', '22 4 12 14.01 9 11.01');
            svg.appendChild(polyline);
        } else {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', '12');
            circle.setAttribute('cy', '12');
            circle.setAttribute('r', '10');
            svg.appendChild(circle);

            const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line1.setAttribute('x1', '12');
            line1.setAttribute('y1', '8');
            line1.setAttribute('x2', '12');
            line1.setAttribute('y2', '16');
            svg.appendChild(line1);

            const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line2.setAttribute('x1', '8');
            line2.setAttribute('y1', '12');
            line2.setAttribute('x2', '16');
            line2.setAttribute('y2', '12');
            svg.appendChild(line2);
        }
        return svg;
    }

    function buildSpinner(borderTopColor) {
        const spinner = document.createElement('span');
        spinner.className = 'tilantra-mini-spinner';
        if (borderTopColor) {
            spinner.style.borderTopColor = borderTopColor;
            spinner.style.borderLeftColor = 'rgba(129, 140, 248, 0.2)';
            spinner.style.borderRightColor = 'rgba(129, 140, 248, 0.2)';
            spinner.style.borderBottomColor = 'rgba(129, 140, 248, 0.2)';
        }
        return spinner;
    }

    function setButtonState(btn, state, type = 'text', size = '14') {
        while (btn.firstChild) {
            btn.removeChild(btn.firstChild);
        }

        if (state === 'initial') {
            const svg = buildSVGIcon(size);
            if (type === 'text') {
                svg.style.marginRight = '4px';
                if (size === '12') svg.style.verticalAlign = 'middle';
                btn.appendChild(svg);
                
                const textSpan = document.createElement('span');
                textSpan.textContent = 'Save to Capsule';
                if (size === '12') textSpan.style.verticalAlign = 'middle';
                btn.appendChild(textSpan);
            } else {
                btn.appendChild(svg);
            }
        } else if (state === 'saving') {
            if (type === 'text') {
                btn.appendChild(buildSpinner());
                btn.appendChild(document.createTextNode(' Saving...'));
            } else {
                btn.appendChild(buildSpinner('#818cf8'));
            }
        } else if (state === 'saved') {
            if (type === 'text') {
                btn.appendChild(document.createTextNode('Saved!'));
            } else {
                btn.appendChild(buildSVGIcon(size, '#10b981', true));
            }
        }
    }

    function scanStudioPanel() {
        // 1. Scan for Audio Overviews using speed buttons
        const speedBtn = Array.from(document.querySelectorAll('button, span, div, p')).find(el => {
            const text = el.textContent.trim().toLowerCase();
            return text === '1.0x' || text === '1.5x' || text === '2.0x' || /^\d\.\d+x$/.test(text);
        });
        
        if (speedBtn && !speedBtn.parentNode.querySelector('.tilantra-capsule-save-audio-btn')) {
            console.log("✅ Capsule Hub: Found audio player speed button. Injecting Save to Capsule next to:", speedBtn.textContent);
            
            const saveBtn = document.createElement('button');
            saveBtn.className = 'tilantra-capsule-save-audio-btn';
            saveBtn.style.cssText = `
              display: inline-flex;
              align-items: center;
              justify-content: center;
              background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
              color: #ffffff !important;
              border: none;
              padding: 4px 10px;
              border-radius: 12px;
              font-family: var(--google-sans-font, "Google Sans", sans-serif);
              font-size: 11px;
              font-weight: 500;
              cursor: pointer;
              margin-left: 12px;
              transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
              box-shadow: 0 2px 4px rgba(79, 70, 229, 0.2);
              vertical-align: middle;
              height: 22px;
            `;
            
            setButtonState(saveBtn, 'initial', 'text', '12');
            
            saveBtn.onmouseover = () => {
                saveBtn.style.background = 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)';
                saveBtn.style.transform = 'translateY(-0.5px)';
            };
            saveBtn.onmouseout = () => {
                saveBtn.style.background = 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)';
                saveBtn.style.transform = 'none';
            };
            
            speedBtn.parentNode.insertBefore(saveBtn, speedBtn.nextSibling);
            
            saveBtn.addEventListener('click', async (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                saveBtn.disabled = true;
                setButtonState(saveBtn, 'saving', 'text', '12');
                
                let audioTruncationNotice = "";
                
                try {
                    // Trace up to find player container
                    let playerCard = speedBtn.parentElement;
                    while (playerCard && playerCard !== document.body) {
                        const className = (playerCard.className || '').toLowerCase();
                        if (className.includes('player') || className.includes('card') || className.includes('container') || playerCard.tagName === 'MAT-CARD') {
                            break;
                        }
                        playerCard = playerCard.parentElement;
                    }
                    if (!playerCard) playerCard = speedBtn.parentElement;
                    
                    const notebookTitle = getNotebookTitle();
                    const overviewTitle = playerCard.querySelector('h1, h2, h3, [class*="title"], [class*="header"], [class*="text"]')
                                            ?.textContent?.trim() || "Audio Overview";
                    
                    // 1. Find the options menu (three dots button)
                    let threeDotsBtn = Array.from(playerCard.querySelectorAll('button')).find(b => {
                        const aria = b.getAttribute('aria-label') || "";
                        return b.textContent.includes('more') || aria.includes('more') || b.innerHTML.includes('more_vert');
                    });
                    
                    if (!threeDotsBtn) {
                        const studioPanel = document.querySelector('studio-panel, .studio-panel');
                        if (studioPanel) {
                            threeDotsBtn = Array.from(studioPanel.querySelectorAll('button')).find(b => {
                                const aria = b.getAttribute('aria-label') || "";
                                return b.textContent.includes('more') || aria.includes('more') || b.innerHTML.includes('more_vert');
                            });
                        }
                    }
                    
                    if (!threeDotsBtn) {
                        alert("Could not find the options menu (three dots) on the audio player to capture download.");
                        saveBtn.disabled = false;
                        setButtonState(saveBtn, 'initial', 'text', '12');
                        return;
                    }

                    // 2. Prepare background script to intercept download via event bridge
                    const downloadPromise = new Promise((resolve, reject) => {
                        const timeout = setTimeout(() => {
                            window.removeEventListener("CAPSULE_AUDIO_DOWNLOAD_RESPONSE", onResponse);
                            reject(new Error("Timeout waiting for audio download capture"));
                        }, 15000);
                        
                        function onResponse(e) {
                            window.removeEventListener("CAPSULE_AUDIO_DOWNLOAD_RESPONSE", onResponse);
                            clearTimeout(timeout);
                            if (e.detail && e.detail.success) {
                                resolve(e.detail);
                            } else {
                                reject(new Error(e.detail?.error || "Failed to capture download"));
                            }
                        }
                        
                        window.addEventListener("CAPSULE_AUDIO_DOWNLOAD_RESPONSE", onResponse);
                    });

                    window.dispatchEvent(new CustomEvent("CAPSULE_AUDIO_DOWNLOAD_REQUEST"));
                    
                    // Wait 300ms to ensure the background script registers the interception task before we trigger the download
                    await new Promise(r => setTimeout(r, 300));

                    // 3. Click three dots to open menu.
                    // Use a full pointer event sequence (hover → focus → press → release) to ensure
                    // Angular/Material initialises the dynamic "Download" menu item correctly —
                    // this matches what happens during a genuine human mouse click.
                    console.log("👉 Capsule Hub: Clicking player options menu with full hover simulation...");
                    const _audioBtnParent = threeDotsBtn.parentElement;
                    if (_audioBtnParent) {
                        _audioBtnParent.dispatchEvent(new PointerEvent('pointerenter', { bubbles: false, cancelable: false, view: window }));
                        _audioBtnParent.dispatchEvent(new MouseEvent('mouseenter',    { bubbles: false, cancelable: false, view: window }));
                        _audioBtnParent.dispatchEvent(new MouseEvent('mouseover',     { bubbles: true,  cancelable: true,  view: window }));
                    }
                    threeDotsBtn.dispatchEvent(new PointerEvent('pointerenter', { bubbles: false, cancelable: false, view: window }));
                    threeDotsBtn.dispatchEvent(new MouseEvent('mouseenter',    { bubbles: false, cancelable: false, view: window }));
                    threeDotsBtn.dispatchEvent(new MouseEvent('mouseover',     { bubbles: true,  cancelable: true,  view: window }));
                    await new Promise(r => setTimeout(r, 60));
                    try { threeDotsBtn.focus(); } catch (_fe) {}
                    threeDotsBtn.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true, view: window, isPrimary: true, button: 0 }));
                    threeDotsBtn.dispatchEvent(new MouseEvent('mousedown',    { bubbles: true, cancelable: true, view: window, button: 0 }));
                    await new Promise(r => setTimeout(r, 60));
                    threeDotsBtn.dispatchEvent(new PointerEvent('pointerup',  { bubbles: true, cancelable: true, view: window, isPrimary: true, button: 0 }));
                    threeDotsBtn.dispatchEvent(new MouseEvent('mouseup',      { bubbles: true, cancelable: true, view: window, button: 0 }));
                    threeDotsBtn.dispatchEvent(new MouseEvent('click',        { bubbles: true, cancelable: true, view: window, button: 0 }));

                    // Wait for Angular change detection and overlay transition
                    await new Promise(r => setTimeout(r, 450));
                    
                    // 4. Find the Download option and click it
                    let downloadItem = null;
                    const overlayContainer = document.querySelector('.cdk-overlay-container');
                    if (overlayContainer) {
                        downloadItem = Array.from(overlayContainer.querySelectorAll('button, [role="menuitem"], .mat-mdc-menu-item, .mat-menu-item'))
                                            .find(el => el.textContent.toLowerCase().includes('download'));
                    }
                    if (!downloadItem) {
                        downloadItem = Array.from(document.querySelectorAll('button, a, [role="menuitem"]'))
                                            .find(el => el.textContent.toLowerCase().includes('download'));
                    }
                    
                    if (!downloadItem) {
                        // Close open menu
                        document.body.click();
                        // Cancel pending task in background via event bridge
                        window.dispatchEvent(new CustomEvent("CAPSULE_AUDIO_DOWNLOAD_CANCEL"));
                        
                        alert("Could not find the 'Download' option in the player options menu.");
                        saveBtn.disabled = false;
                        setButtonState(saveBtn, 'initial', 'text', '12');
                        return;
                    }
                    
                    console.log("👉 Capsule Hub: Clicking Download to capture stream");
                    downloadItem.click();
                    
                    // 5. Wait for download capture and fetch
                    const captureResult = await downloadPromise;
                    console.log("✅ Capsule Hub: Captured audio stream successfully via download interception!");
                    
                    let attachment = null;
                    if (captureResult.base64) {
                        let base64Data = captureResult.base64;
                        if (base64Data.includes(";base64,")) {
                            base64Data = base64Data.split(";base64,")[1];
                        }
                        
                        const originalFilename = captureResult.filename || "";
                        const originalMime = captureResult.mime || "";
                        const ext = originalFilename.toLowerCase().split('.').pop() || "wav";
                        const isCompressed = ['mp3', 'm4a', 'aac', 'ogg', 'webm', 'mp4', 'm4b'].includes(ext) || 
                                             originalMime.toLowerCase().includes('mpeg') || 
                                             originalMime.toLowerCase().includes('mp3') || 
                                             originalMime.toLowerCase().includes('aac') || 
                                             originalMime.toLowerCase().includes('mp4') || 
                                             originalMime.toLowerCase().includes('m4a');
                        
                        let finalMime = 'text/plain';
                        let finalFilename = (captureResult.filename || `${overviewTitle.replace(/[^a-zA-Z0-9_-]/g, '_')}.wav`) + '.txt';
                        
                        try {
                            const arrayBuf = base64ToArrayBuffer(base64Data);
                            const originalSizeMB = arrayBuf.byteLength / (1024 * 1024);
                            console.log("👉 Capsule Hub: Original file size:", originalSizeMB.toFixed(2), "MB", `(Detected compressed format: ${isCompressed}, Ext: ${ext})`);
                            
                            // If it's already a compressed format (MP3/M4A) and fits within typical server limits (< 0.7 MB), upload as-is
                            if (isCompressed && originalSizeMB <= 0.7) {
                                console.log(`✅ Capsule Hub: Original ${ext.toUpperCase()} is under 0.7 MB. Skipping compression.`);
                                finalMime = 'text/plain';
                                finalFilename = (captureResult.filename || `${overviewTitle.replace(/[^a-zA-Z0-9_-]/g, '_')}.${ext}`) + '.txt';
                            } else {
                                console.log("👉 Capsule Hub: Compressing/truncating audio dynamically to fit under 700KB WAV...");
                                const compressResult = await compressWavAudio(arrayBuf);
                                base64Data = arrayBufferToBase64(compressResult.buffer);
                                console.log("✅ Capsule Hub: Compressed file size:", (compressResult.buffer.byteLength / (1024 * 1024)).toFixed(2), "MB");
                                
                                if (compressResult.truncated) {
                                    audioTruncationNotice = `*(Note: The audio overview was truncated to the first ${Math.round(compressResult.duration)} seconds due to server size limits.)*`;
                                }
                                finalMime = 'text/plain';
                                finalFilename = `${overviewTitle.replace(/[^a-zA-Z0-9_-]/g, '_')}_wav.txt`;
                            }
                        } catch (compressErr) {
                            console.error("⚠️ Capsule Hub: Failed to compress audio, uploading original", compressErr);
                            finalMime = 'text/plain';
                            finalFilename = (captureResult.filename || `${overviewTitle.replace(/[^a-zA-Z0-9_-]/g, '_')}.${ext}`) + '.txt';
                        }
                        
                        attachment = {
                            type: 'audio',
                            filename: finalFilename,
                            mime: finalMime,
                            base64: base64Data
                        };
                    }
                    
                    const messages = [
                        {
                            role: 'assistant',
                            text: `### NotebookLM Audio Overview\n\n- **Notebook Title:** ${notebookTitle}\n- **Overview Title:** ${overviewTitle}\n- **Source URL:** [NotebookLM Link](${window.location.href})\n\n*(Note: This capsule was saved from the NotebookLM Studio Panel. Due to server format limits, the audio file is saved inside a .txt wrapper file. ${attachment ? "To play it, download the attached file and change its extension from .txt back to .wav (or .m4a)." : "Audio file could not be retrieved directly."}*${audioTruncationNotice ? "\n\n" + audioTruncationNotice : ""}`,
                            attachments: attachment ? [attachment] : []
                        }
                    ];
                    
                    window.dispatchEvent(new CustomEvent("CAPSULE_SAVE_REQUEST", {
                        detail: {
                            tag: `Audio: ${overviewTitle}`,
                            messages: messages
                        }
                    }));
                    
                    setButtonState(saveBtn, 'saved', 'text', '12');
                    saveBtn.style.background = '#10b981';
                    
                    setTimeout(() => {
                        saveBtn.disabled = false;
                        setButtonState(saveBtn, 'initial', 'text', '12');
                        saveBtn.style.background = '';
                    }, 3000);
                    
                } catch (err) {
                    console.error("❌ Error saving Audio Overview:", err);
                    alert("Failed to save audio overview capsule: " + (err.message || err));
                    saveBtn.disabled = false;
                    setButtonState(saveBtn, 'initial', 'text', '12');
                }
            });
        }
        
        // 2. Scan for Studio Artifacts
        const studioPanel = document.querySelector('studio-panel, .studio-panel');
        if (!studioPanel) return;
        
        const buttons = Array.from(studioPanel.querySelectorAll('button'));
        buttons.forEach(btn => {
            if (btn.dataset.capsuleInjected === "true" || btn.className.includes('tilantra-capsule')) return;
            
            // Limit injection ONLY to actual open artifact components to avoid matching "Add note" and header buttons
            const artContainer = btn.closest('.artifact-card, .artifact-viewer, [class*="artifact-card"], [class*="artifact-viewer"]');
            if (!artContainer) return;
            
            // Safeguard: Check if this artifact container already has a Save button injected to avoid duplicates
            if (artContainer.querySelector('.tilantra-capsule-save-artifact-btn, .tilantra-capsule-save-artifact-icon-btn')) {
                return;
            }
            
            const btnHTML = btn.innerHTML || "";
            const isCopyBtn = btn.textContent.toLowerCase().includes('copy') || 
                               btn.querySelector('mat-icon')?.textContent.includes('content_copy') || 
                               btn.getAttribute('aria-label')?.toLowerCase().includes('copy') ||
                               btnHTML.includes('content_copy') ||
                               btnHTML.includes('copy_all');
                               
            const isNotesBtn = btn.textContent.toLowerCase().includes('note') || 
                                btn.querySelector('mat-icon')?.textContent.includes('note') || 
                                btn.getAttribute('aria-label')?.toLowerCase().includes('note');
                                
            const isMoreOptionsBtn = btn.getAttribute('aria-label')?.toLowerCase().includes('more option') ||
                                     btnHTML.includes('more_vert') ||
                                     btn.querySelector('mat-icon')?.textContent.includes('more_vert');
                                
            if (isCopyBtn || isNotesBtn || isMoreOptionsBtn) {
                btn.dataset.capsuleInjected = "true";
                
                const saveBtn = document.createElement('button');
                const hasText = btn.textContent.trim().length > 0 && !btn.textContent.trim().match(/^[a-z_]+$/);
                const buttonType = hasText ? 'text' : 'icon';
                const buttonSize = hasText ? '14' : '18';
                
                if (hasText) {
                    saveBtn.className = 'tilantra-capsule-save-artifact-btn';
                } else {
                    saveBtn.className = 'tilantra-capsule-save-artifact-icon-btn';
                    saveBtn.title = "Save to Capsule";
                }
                
                setButtonState(saveBtn, 'initial', buttonType, buttonSize);
                
                if (isMoreOptionsBtn) {
                    btn.parentNode.insertBefore(saveBtn, btn);
                } else {
                    btn.parentNode.insertBefore(saveBtn, btn.nextSibling);
                }
                
                saveBtn.addEventListener('click', async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    saveBtn.disabled = true;
                    setButtonState(saveBtn, 'saving', buttonType, buttonSize);
                    
                    try {
                        const container = findContentContainer(btn);
                        
                        const titleEl = artContainer.querySelector('input.artifact-title, .artifact-title, h1, h2, h3, [class*="title"]') ||
                                        container.querySelector('input.artifact-title, .artifact-title, h1, h2, h3, [class*="title"]') || 
                                        container.parentElement?.querySelector('input.artifact-title, .artifact-title, h1, h2, h3') ||
                                        document.querySelector('studio-panel h2');
                        const title = getElementText(titleEl) || "NotebookLM Artifact";
                        
                        const titleLower = title.toLowerCase();
                        const textLower = container.textContent.toLowerCase();
                        const classNameLower = (container.className || '').toLowerCase();
                        const hasAppViewer = container.querySelector('app-viewer') || container.closest('artifact-viewer')?.querySelector('app-viewer') || document.querySelector('app-viewer');
                        const isFlashcard = titleLower.includes('flashcard') || textLower.includes('flashcard') || classNameLower.includes('flashcard') || !!hasAppViewer;

                        if (isFlashcard) {
                            console.log("👉 Capsule Hub: Flashcard detected, requesting CSV from app frame...");
                            window.__tilantraExpectingCsv = true;
                            window.__tilantraCapturedCsvText = null;

                            try {
                                // Send command to the cross-origin app iframe to locate and click
                                // the flashcard's own 3-dots → "Download set" button chain.
                                await clickFlashcardDownloadViaFrame();
                                console.log("👉 Capsule Hub: Waiting for CSV relay from app frame (up to 5 seconds)...");
                                const csvText = await getCsvDataWithTimeout(5000);
                                if (csvText) {
                                    console.log("👉 Capsule Hub: Successfully received flashcard CSV from app frame!");
                                } else {
                                    console.warn("⚠️ Capsule Hub: App frame CSV relay timed out. Is the flashcard viewer fully open?");
                                }
                            } catch (e) {
                                console.error("❌ Error triggering CSV extraction via frame:", e);
                            } finally {
                                window.__tilantraExpectingCsv = false;
                            }
                        }

                        const markdown = parseArtifactToMarkdown(container);
                        console.log("👉 Capsule Hub: Generated artifact markdown:", markdown);
                        
                        // Safeguard: Check that the parsed markdown actually contains text content (to prevent API 'null vector' errors)
                        const cleanContent = markdown.replace(/#[^\n]*\n/g, '').replace(/\s+/g, '').trim();
                        if (cleanContent.length < 5) {
                            alert("No text content could be parsed from this artifact. Please make sure the artifact is fully open and visible on screen before saving.");
                            saveBtn.disabled = false;
                            setButtonState(saveBtn, 'initial', buttonType, buttonSize);
                            return;
                        }
                        
                        window.dispatchEvent(new CustomEvent("CAPSULE_SAVE_REQUEST", {
                            detail: {
                                tag: title,
                                messages: [
                                    {
                                        role: 'assistant',
                                        text: markdown
                                    }
                                ]
                            }
                        }));
                        
                        setButtonState(saveBtn, 'saved', buttonType, buttonSize);
                        if (hasText) {
                            saveBtn.style.background = '#10b981';
                        }
                        
                        setTimeout(() => {
                            saveBtn.disabled = false;
                            setButtonState(saveBtn, 'initial', buttonType, buttonSize);
                            if (hasText) saveBtn.style.background = '';
                        }, 3000);
                        
                    } catch (err) {
                        console.error("❌ Error saving Studio artifact:", err);
                        alert("Failed to save artifact capsule: " + (err.message || err));
                        saveBtn.disabled = false;
                        setButtonState(saveBtn, 'initial', buttonType, buttonSize);
                    }
                });
            }
        });
    }

    function base64ToArrayBuffer(base64) {
        const binaryString = atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    }

    function arrayBufferToBase64(buffer) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        const chunk = 8192;
        for (let i = 0; i < len; i += chunk) {
            binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
        }
        return btoa(binary);
    }

    function writeString(view, offset, string) {
        for (let i = 0; i < string.length; i++) {
            view.setUint8(offset + i, string.charCodeAt(i));
        }
    }

    function encodeWAV(audioBuffer, use8Bit = true) {
        const sampleRate = audioBuffer.sampleRate;
        const channelData = audioBuffer.getChannelData(0);
        const numSamples = channelData.length;
        const bytesPerSample = use8Bit ? 1 : 2;
        
        const buffer = new ArrayBuffer(44 + numSamples * bytesPerSample);
        const view = new DataView(buffer);
        
        writeString(view, 0, 'RIFF');
        view.setUint32(4, 36 + numSamples * bytesPerSample, true);
        writeString(view, 8, 'WAVE');
        writeString(view, 12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true);
        view.setUint16(22, 1, true);
        view.setUint32(24, sampleRate, true);
        view.setUint32(28, sampleRate * bytesPerSample, true);
        view.setUint16(32, bytesPerSample, true);
        view.setUint16(34, use8Bit ? 8 : 16, true);
        writeString(view, 36, 'data');
        view.setUint32(40, numSamples * bytesPerSample, true);
        
        let offset = 44;
        if (use8Bit) {
            for (let i = 0; i < numSamples; i++, offset += 1) {
                let s = Math.max(-1, Math.min(1, channelData[i]));
                let sample = Math.round((s + 1) * 127.5);
                view.setUint8(offset, sample);
            }
        } else {
            for (let i = 0; i < numSamples; i++, offset += 2) {
                let s = Math.max(-1, Math.min(1, channelData[i]));
                view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
            }
        }
        
        return buffer;
    }

    async function compressWavAudio(arrayBuffer) {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        try {
            console.log("👉 Capsule Hub: Decoding audio data to determine length and sample rate...");
            const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
            const originalDuration = audioBuffer.duration;
            console.log(`👉 Capsule Hub: Audio original duration: ${originalDuration.toFixed(1)} seconds`);
            
            // Choose target parameters to keep size under 700 KB (716,800 bytes) to bypass Nginx 1MB limit.
            // WAV size is roughly duration * sampleRate.
            let targetSampleRate = 8000;
            let renderDuration = originalDuration;
            let truncated = false;
            
            if (originalDuration > 90) {
                // If it's longer than 90 seconds, we truncate to 120 seconds and downsample to 6000 Hz.
                // 120 * 6000 = 720 KB (fits under 1MB base64)
                targetSampleRate = 6000;
                renderDuration = 120;
                truncated = true;
            } else if (originalDuration > 45) {
                // Keep full duration but downsample to 8000 Hz
                targetSampleRate = 8000;
            } else {
                // Short audio: keep full duration and use higher quality
                targetSampleRate = 16000;
            }
            
            if (renderDuration > originalDuration) {
                renderDuration = originalDuration;
            }
            
            console.log(`👉 Capsule Hub: Rendering audio at ${targetSampleRate} Hz for ${renderDuration.toFixed(1)} seconds (Truncated: ${truncated})`);
            
            const offlineCtx = new OfflineAudioContext(
                1, // mono
                Math.ceil(renderDuration * targetSampleRate),
                targetSampleRate
            );
            
            const source = offlineCtx.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(offlineCtx.destination);
            source.start();
            
            const renderedBuffer = await offlineCtx.startRendering();
            const buffer = encodeWAV(renderedBuffer, true);
            
            return {
                buffer,
                truncated,
                duration: renderDuration,
                originalDuration
            };
        } finally {
            audioCtx.close();
        }
    }

    function findTriggerElements() {
        const elements = [];
        try {
            // Find all elements in the DOM
            const all = document.querySelectorAll('*');
            for (let i = 0; i < all.length; i++) {
                const el = all[i];
                // Check if textContent contains the trigger without the markdown asterisks (which get stripped in render)
                if (el.textContent && el.textContent.includes("ACTIVE CAPSULE CONTEXT")) {
                    // Check if it's the deepest element containing the text to avoid parent containers
                    let hasChildWithText = false;
                    for (let j = 0; j < el.children.length; j++) {
                        if (el.children[j].textContent && el.children[j].textContent.includes("ACTIVE CAPSULE CONTEXT")) {
                            hasChildWithText = true;
                            break;
                        }
                    }
                    if (!hasChildWithText) {
                        elements.push(el);
                    }
                }
            }
        } catch (e) {
            // Silence errors
        }
        return elements;
    }

    function processAllMessages() {
        if (isProcessing || !CAPSULE_ACTIVE) return;
        isProcessing = true;

        try {
            const triggerElements = findTriggerElements();
            triggerElements.forEach(el => {
                // Find the closest user message container to ensure we don't mask model turns that copy/echo the text
                const bubble = el.closest('.from-user-message-inner-content');
                if (!bubble) return; // Skip if it's not part of the user's chat turn

                const text = el.textContent || "";

                if (bubble.dataset.processed !== "true") {
                    bubble.setAttribute('data-capsule-text', text);
                    
                    const tagMatch = text.match(/ACTIVE CAPSULE CONTEXT:?\s*([^\n\r]*)/);
                    let tagLabel = tagMatch && tagMatch[1] ? tagMatch[1].trim() : null;
                    if (tagLabel) {
                        tagLabel = tagLabel.replace(/\*+$/, "").trim(); // Remove trailing Markdown stars if present
                    }

                    const label = tagLabel
                        ? `Adding Context of Capsule: ${tagLabel} 👀`
                        : "Adding capsule context to this conversation 👀";
                    
                    bubble.setAttribute('data-capsule-label', label);
                    bubble.dataset.processed = "true";
                    
                    if (ENABLE_MASKING) {
                        bubble.dataset.capsuleInput = "true";
                    }
                }
            });
            
            // Scan Studio panel elements (Audio Overviews & Artifacts)
            scanStudioPanel();
        } catch (err) {
            console.error("Error during message scanning:", err);
        }

        isProcessing = false;
    }

    // Initial scan and live mutations observer
    setTimeout(processAllMessages, 10);
    const pollInterval = setInterval(() => {
        if (CAPSULE_ACTIVE) {
            processAllMessages();
        } else {
            clearInterval(pollInterval);
        }
    }, 100);

    let debounceTimer;
    const observer = new MutationObserver(() => {
        if (CAPSULE_ACTIVE) {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(processAllMessages, 50);
        }
    });

    function base64ToFile(base64, filename, mimeType) {
        let finalFilename = filename || "";
        let finalMime = mimeType || "";
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
        const byteCharacters = atob(clean);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        return new File([new Uint8Array(byteNumbers)], finalFilename, { type: finalMime });
    }

    window.addEventListener("CAPSULE_NOTEBOOKLM_INJECT_FILES", (e) => {
        const attachments = e.detail?.attachments || [];
        if (attachments.length === 0) return;
        
        const files = attachments.map(a => base64ToFile(a.base64, a.filename, a.mime));
        console.log("👉 Capsule Hub: Starting file upload for NotebookLM...", files);

        // Set the files on the global so the early-bound interceptor knows to intercept
        window.__tilantraFilesToInject = files;
        window.__tilantraCapturedInput = null;
        window.__tilantraFilePickerIntercepted = false;

        // Late-bound prototype overrides (in case page scripts reset them during load)
        const originalHTMLElementClick = HTMLElement.prototype.click;
        const originalHTMLInputElementClick = HTMLInputElement.prototype.click;
        const originalDispatchEvent = EventTarget.prototype.dispatchEvent;

        const interceptClickLate = function(target, clickFn, args) {
            if (target && target.tagName === 'INPUT' && target.type === 'file' && window.__tilantraFilesToInject) {
                console.log("✅ Capsule Hub: Intercepted file input click via late-bound hook!", target);
                window.__tilantraCapturedInput = target;
                return; // Prevent opening the browser's native file picker!
            }
            return clickFn.apply(target, args);
        };

        HTMLElement.prototype.click = function() {
            return interceptClickLate(this, originalHTMLElementClick, arguments);
        };

        HTMLInputElement.prototype.click = function() {
            return interceptClickLate(this, originalHTMLInputElementClick, arguments);
        };

        EventTarget.prototype.dispatchEvent = function(event) {
            if (event && event.type === 'click' && this.tagName === 'INPUT' && this.type === 'file' && window.__tilantraFilesToInject) {
                console.log("✅ Capsule Hub: Intercepted click dispatch event via late-bound hook!", this);
                window.__tilantraCapturedInput = this;
                event.preventDefault();
                event.stopPropagation();
                return false;
            }
            return originalDispatchEvent.apply(this, arguments);
        };

        function restoreAll() {
            HTMLElement.prototype.click = originalHTMLElementClick;
            HTMLInputElement.prototype.click = originalHTMLInputElementClick;
            EventTarget.prototype.dispatchEvent = originalDispatchEvent;
            
            window.__tilantraFilesToInject = null;
            window.__tilantraCapturedInput = null;
            window.__tilantraFilePickerIntercepted = false;
        }

        function findFileInputInRoot(root) {
            if (!root) return null;
            const input = root.querySelector && root.querySelector('input[type="file"]');
            if (input) return input;
            
            const children = root.querySelectorAll ? Array.from(root.querySelectorAll('*')) : [];
            for (const child of children) {
                if (child.shadowRoot) {
                    const found = findFileInputInRoot(child.shadowRoot);
                    if (found) return found;
                }
            }
            return null;
        }

        function findFileInputInIframes(root = document) {
            const iframes = root.querySelectorAll ? Array.from(root.querySelectorAll('iframe')) : [];
            for (const iframe of iframes) {
                try {
                    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                    if (iframeDoc) {
                        const found = findFileInputInRoot(iframeDoc);
                        if (found) return found;
                        
                        const nested = findFileInputInIframes(iframeDoc);
                        if (nested) return nested;
                    }
                } catch (e) {
                    // Ignore cross-origin errors
                }
            }
            return null;
        }

        function findFileInput() {
            // Check direct document and shadow roots
            const direct = findFileInputInRoot(document);
            if (direct) return direct;
            
            // Check iframes
            const iframeInput = findFileInputInIframes(document);
            if (iframeInput) return iframeInput;
            
            return null;
        }

        function simulateHover(element) {
            if (!element) return;
            const opts = { bubbles: true, cancelable: true, view: window };
            element.dispatchEvent(new PointerEvent('pointerenter', opts));
            element.dispatchEvent(new PointerEvent('pointerover', opts));
            element.dispatchEvent(new MouseEvent('mouseenter', opts));
            element.dispatchEvent(new MouseEvent('mouseover', opts));
        }

        function closeAddSourcesDialog() {
            const btn = document.querySelector('add-sources-dialog button[aria-label*="Close" i]') ||
                        document.querySelector('add-sources-dialog button.close-button') ||
                        document.querySelector('mat-dialog-container button[aria-label*="Close" i]') ||
                        document.querySelector('button.close-button');
            if (btn) {
                console.log("👉 Capsule Hub: Closing Add Sources dialog");
                simulateClick(btn);
            }
        }

        function findComputerCard() {
            const dialog = document.querySelector('add-sources-dialog') || 
                           document.querySelector('mat-dialog-container') || 
                           document.querySelector('.cdk-overlay-container') || 
                           document.body;
            
            function search(root, priorityCheck) {
                if (!root) return null;
                
                if (root.nodeType === 3) {
                    const text = root.nodeValue.trim().toLowerCase();
                    if (priorityCheck(text)) {
                        let parent = root.parentElement;
                        let ancestors = [];
                        let candidates = [];
                        
                        while (parent && parent !== document.body) {
                            const tag = parent.tagName.toLowerCase();
                            const role = parent.getAttribute ? parent.getAttribute('role') : null;
                            const jslog = parent.getAttribute ? parent.getAttribute('jslog') : null;
                            const className = (parent.className && typeof parent.className === 'string') ? parent.className.toLowerCase() : '';
                            
                            // Skip presentational/non-clickable leaf tags
                            const isPresentational = tag === 'mat-icon' || tag === 'span' || tag === 'i' || 
                                                     tag === 'svg' || tag === 'path' || tag === 'g' ||
                                                     tag === 'abbr' || tag === 'b' || tag === 'strong';
                                                     
                            if (!isPresentational) {
                                const isButton = tag === 'button' || tag === 'a' || role === 'button' || role === 'menuitem' || role === 'tab' || role === 'option';
                                const isClickTracked = jslog && jslog.includes('click');
                                const hasUploadClass = className.includes('dropzone') || 
                                                       className.includes('drop-zone') || 
                                                       className.includes('upload') || 
                                                       className.includes('picker') ||
                                                       className.includes('button') || 
                                                       className.includes('card') || 
                                                       className.includes('option') || 
                                                       className.includes('item') ||
                                                       className.includes('clickable');
                                                       
                                const score = (isButton ? 10 : 0) + (hasUploadClass ? 5 : 0) + (isClickTracked ? 3 : 0);
                                if (isButton || hasUploadClass || isClickTracked || tag.includes('-') || parent.onclick) {
                                    candidates.push({ element: parent, score: score, tag: tag, className: className });
                                }
                            }
                            
                            ancestors.push({
                                tag: parent.tagName,
                                class: parent.className,
                                jslog: jslog,
                                role: role
                            });
                            parent = parent.parentElement;
                        }
                        
                        console.log("👉 Ancestors of Computer text node:", JSON.stringify(ancestors, null, 2));
                        
                        if (candidates.length > 0) {
                            // Sort candidates by score descending
                            candidates.sort((a, b) => b.score - a.score);
                            const chosen = candidates[0].element;
                            console.log("👉 Chosen clickable ancestor:", chosen.tagName, chosen.className, "with score:", candidates[0].score);
                            return chosen;
                        }
                        return root.parentElement;
                    }
                }
                
                if (root.shadowRoot) {
                    const found = search(root.shadowRoot, priorityCheck);
                    if (found) return found;
                }
                
                const children = root.childNodes ? Array.from(root.childNodes) : [];
                for (const child of children) {
                    const found = search(child, priorityCheck);
                    if (found) return found;
                }
                
                return null;
            }
            
            // Priority 1: Specific upload/local file/computer keywords
            const p1 = search(dialog, (text) => {
                if (!text || text.length > 50) return false;
                const hasUploadKeyword = text.includes('computer') || 
                                         text === 'device' || 
                                         text.includes('upload') || 
                                         text.includes('local file');
                const hasExcludeKeyword = text.includes('drive') || 
                                          text.includes('link') || 
                                          text.includes('youtube') || 
                                          text.includes('url') || 
                                          text.includes('website') ||
                                          text.includes('copied text') ||
                                          text.includes('paste text');
                return hasUploadKeyword && !hasExcludeKeyword;
            });
            
            if (p1) return p1;
            
            // Priority 2: Generic dropzone keywords
            return search(dialog, (text) => {
                if (!text || text.length > 50) return false;
                return text.includes('drop your files') || 
                       text.includes('drag and drop') || 
                       text.includes('select files') || 
                       text.includes('choose files');
            });
        }

        const runDragDropSimulation = () => {
            console.log("👉 Capsule Hub: Simulating drag-drop for files into NotebookLM...");
            const dataTransfer = new DataTransfer();
            files.forEach(file => dataTransfer.items.add(file));
            
            try {
                if (!dataTransfer.types || !dataTransfer.types.includes('Files')) {
                    Object.defineProperty(dataTransfer, 'types', {
                        value: ['Files'],
                        writable: false,
                        configurable: true
                    });
                }
            } catch (err) {
                console.warn("Could not redefine dataTransfer.types:", err);
            }

            const createDragEvent = (type) => {
                const ev = new DragEvent(type, {
                    bubbles: true,
                    cancelable: true,
                    composed: true,
                    view: window
                });
                Object.defineProperty(ev, 'dataTransfer', {
                    value: dataTransfer,
                    writable: false,
                    configurable: true
                });
                return ev;
            };

            const targets = [
                document.querySelector('add-sources-dialog'),
                document.querySelector('mat-dialog-container'),
                document.querySelector('[role="dialog"]'),
                document.querySelector('.source-empty-state'),
                document.querySelector('source-picker'),
                document.querySelector('.source-panel-content'),
                document.querySelector('.source-panel'),
                document.querySelector('.xap-uploader-dropzone'),
                document.querySelector('.drop-zone'),
                document.body,
                window
            ].filter(Boolean);

            targets.forEach(target => {
                target.dispatchEvent(createDragEvent('dragenter'));
                target.dispatchEvent(createDragEvent('dragover'));
                target.dispatchEvent(createDragEvent('drop'));
            });
            console.log("✅ Capsule Hub: File drop events dispatched to targets.");
        };

        function uploadFilesToInput(inputElement) {
            try {
                const dt = new DataTransfer();
                files.forEach(f => dt.items.add(f));
                
                Object.defineProperty(inputElement, 'files', {
                    value: dt.files,
                    configurable: true,
                    writable: false
                });
                
                if (inputElement._valueTracker) inputElement._valueTracker.setValue('');
                inputElement.dispatchEvent(new Event('change', { bubbles: true }));
                inputElement.dispatchEvent(new Event('input', { bubbles: true }));
                
                console.log("✅ Capsule Hub: Files successfully set on input, change event dispatched.");
            } catch (err) {
                console.error("❌ Capsule Hub: Error setting files on input:", err);
                runDragDropSimulation();
            }
        }

        // Try direct injection first (in case it already exists in the DOM)
        const directInput = findFileInput();
        if (directInput) {
            console.log("✅ Capsule Hub: Found pre-existing file input, uploading directly:", directInput);
            restoreAll();
            uploadFilesToInput(directInput);
            window.dispatchEvent(new CustomEvent('CAPSULE_NOTEBOOKLM_FILES_DONE', { detail: { success: true } }));
            return;
        }

        // Open dialog and poll
        if (!openAddSourcesDialog()) {
            console.warn("⚠️ Capsule Hub: Could not find Add Source button to open dialog. Falling back to drag-drop.");
            restoreAll();
            runDragDropSimulation();
            window.dispatchEvent(new CustomEvent('CAPSULE_NOTEBOOKLM_FILES_DONE', { detail: { success: false, reason: 'no_dialog_button' } }));
            return;
        }

        function logAllInputs(root = document, prefix = '') {
            try {
                const inputs = root.querySelectorAll ? Array.from(root.querySelectorAll('input')) : [];
                inputs.forEach(input => {
                    console.log(`🔍 [INPUT] ${prefix} <input type="${input.type}" id="${input.id}" class="${input.className}" accept="${input.getAttribute('accept') || ''}">`);
                });
                
                const children = root.querySelectorAll ? Array.from(root.querySelectorAll('*')) : [];
                children.forEach(child => {
                    if (child.shadowRoot) {
                        logAllInputs(child.shadowRoot, prefix + ' [SHADOW]');
                    }
                });
                
                const iframes = root.querySelectorAll ? Array.from(root.querySelectorAll('iframe')) : [];
                iframes.forEach((iframe, i) => {
                    try {
                        const doc = iframe.contentDocument || iframe.contentWindow.document;
                        if (doc) {
                            logAllInputs(doc, prefix + ` [IFRAME_${i}]`);
                        }
                    } catch (e) {
                        console.log(`🔍 [IFRAME_${i}] (cross-origin, content hidden)`);
                    }
                });
            } catch (err) {
                console.error("Error logging inputs:", err);
            }
        }

        let attempts = 0;
        const maxAttempts = 40; // Extended timeout (~6 seconds max)
        let lastClickAttempt = 0;
        
        const checkInterval = setInterval(() => {
            attempts++;
            
            // Check if we captured the file input click, if one is in DOM, OR if showOpenFilePicker was intercepted!
            const inputElement = window.__tilantraCapturedInput || findFileInput();
            
            if (inputElement || window.__tilantraFilePickerIntercepted) {
                clearInterval(checkInterval);
                restoreAll();
                
                if (inputElement) {
                    console.log("✅ Capsule Hub: Found file input (captured or DOM):", inputElement);
                    uploadFilesToInput(inputElement);
                } else {
                    console.log("✅ Capsule Hub: Files successfully injected via showOpenFilePicker intercept.");
                }
                
                setTimeout(closeAddSourcesDialog, 800);
                window.dispatchEvent(new CustomEvent('CAPSULE_NOTEBOOKLM_FILES_DONE', { detail: { success: true } }));
                return;
            }

            // Check if dialog is open and find the card to click
            const card = findComputerCard();
            if (card) {
                // Click and hover the card initially, and then retry every 5 attempts (~750ms) if uploader is still not initialized/captured
                if (lastClickAttempt === 0 || (attempts - lastClickAttempt) >= 5) {
                    console.log("👉 Capsule Hub: Hovering and Clicking Computer card, attempt:", attempts, card.textContent.trim());
                    try {
                        console.log("👉 Card HTML:", card.outerHTML);
                    } catch (e) {}
                    simulateHover(card);
                    simulateClick(card);
                    lastClickAttempt = attempts;
                }
            }

            if (attempts >= maxAttempts) {
                clearInterval(checkInterval);
                restoreAll();
                console.warn("⚠️ Capsule Hub: Timed out waiting for dialog file input capture. Falling back to drag-drop.");
                
                // Diagnostics
                console.log("=== DIAGNOSTICS: ALL INPUTS IN DOM ===");
                logAllInputs();
                
                console.log("=== DIAGNOSTICS: DIALOG HTML ===");
                const dialog = document.querySelector('add-sources-dialog') || document.querySelector('mat-dialog-container');
                if (dialog) console.log(dialog.outerHTML.substring(0, 5000));
                
                runDragDropSimulation();
                closeAddSourcesDialog();
                window.dispatchEvent(new CustomEvent('CAPSULE_NOTEBOOKLM_FILES_DONE', { detail: { success: false, reason: 'timeout' } }));
            }
        }, 150);
    });



    window.addEventListener("CAPSULE_NOTEBOOKLM_INJECT_SOURCE", (e) => {
        const summary = e.detail?.summary || "";
        const tag = e.detail?.tag || "Unknown Capsule";
        const attachments = e.detail?.attachments || [];

        const injectFiles = () => {
            if (attachments.length > 0) {
                // Add a small delay to let the Paste Text source finish adding
                setTimeout(() => {
                    window.dispatchEvent(new CustomEvent("CAPSULE_NOTEBOOKLM_INJECT_FILES", {
                        detail: { attachments }
                    }));
                }, 1500);
            }
        };

        if (!summary || summary.trim() === "") {
            injectFiles();
            return;
        }

        if (!openAddSourcesDialog()) {
            console.warn("⚠️ Capsule Hub: Could not open Add Sources dialog for text injection.");
            injectFiles();
            return;
        }

        let attempts = 0;
        const checkInterval = setInterval(() => {
            attempts++;
            const dialog = document.querySelector('add-sources-dialog') || document.querySelector('mat-dialog-container');
            if (dialog) {
                const pasteTab = Array.from(dialog.querySelectorAll('button, [role="tab"], .mat-mdc-tab, .mdc-tab')).find(el => {
                    const text = el.textContent.toLowerCase();
                    return text.includes('paste text') || text.includes('copied text');
                });
                
                if (pasteTab) {
                    console.log("👉 Capsule Hub: Found Paste Text tab, clicking...");
                    simulateClick(pasteTab);
                    
                    setTimeout(() => {
                        const textarea = dialog.querySelector('textarea');
                        const titleInput = dialog.querySelector('input[type="text"]');
                        
                        if (textarea) {
                            console.log("👉 Capsule Hub: Filling Paste Text contents...");
                            
                            textarea.focus();
                            textarea.value = summary;
                            textarea.dispatchEvent(new Event('input', { bubbles: true }));
                            textarea.dispatchEvent(new Event('change', { bubbles: true }));
                            
                            if (titleInput) {
                                titleInput.focus();
                                titleInput.value = `Capsule: ${tag}`;
                                titleInput.dispatchEvent(new Event('input', { bubbles: true }));
                                titleInput.dispatchEvent(new Event('change', { bubbles: true }));
                            }
                            
                            const findInsertButton = () => {
                                return Array.from(dialog.querySelectorAll('button, [role="button"], .mdc-button')).find(b => {
                                    const t = b.textContent.trim().toLowerCase();
                                    return t === 'insert' || t.includes('add source') || t === 'add' || t === 'save';
                                });
                            };

                            const insertBtn = findInsertButton();
                            
                            if (insertBtn) {
                                let clickAttempts = 0;
                                const clickInterval = setInterval(() => {
                                    clickAttempts++;
                                    const isDisabled = insertBtn.disabled || insertBtn.getAttribute('aria-disabled') === 'true';
                                    if (!isDisabled) {
                                        console.log("👉 Capsule Hub: Insert button is enabled, clicking...");
                                        simulateClick(insertBtn);
                                        clearInterval(clickInterval);
                                        
                                        // Wait for the dialog to close before initiating files injection
                                        let closeAttempts = 0;
                                        const closeInterval = setInterval(() => {
                                            closeAttempts++;
                                            const stillOpen = document.querySelector('add-sources-dialog') || document.querySelector('mat-dialog-container');
                                            if (!stillOpen || closeAttempts > 30) {
                                                clearInterval(closeInterval);
                                                injectFiles();
                                            }
                                        }, 100);
                                    } else if (clickAttempts > 20) {
                                        console.warn("⚠️ Capsule Hub: Insert button remained disabled after 20 attempts.");
                                        clearInterval(clickInterval);
                                        injectFiles(); // Fallback so we don't completely block files
                                    }
                                }, 100);
                            } else {
                                console.warn("⚠️ Capsule Hub: Insert button not found in Paste Text dialog.");
                                injectFiles(); // Fallback so we don't completely block files
                            }
                        } else {
                            console.warn("⚠️ Capsule Hub: Textarea not found in Paste Text tab.");
                            injectFiles();
                        }
                    }, 500);
                    
                    clearInterval(checkInterval);
                    return;
                }
            }
            
            if (attempts > 20) {
                clearInterval(checkInterval);
                console.warn("⚠️ Capsule Hub: Timed out waiting for Paste Text tab.");
                injectFiles();
            }
        }, 150);
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
    });
})();
