/**********************************************************
 * Utilities (Shared by content.js)
 **********************************************************/
console.log("🛠️ content-utils.js loaded");

/**********************************************************
 * SUPPORTED MIME TYPES
 * All attachment MIME types the extension handles. Used by
 * platform extractors to decide which files to include.
 **********************************************************/
const SUPPORTED_MIME_TYPES = new Set([
    // Images
    "image/png", "image/jpeg", "image/jpg", "image/webp",
    "image/avif", "image/gif",
    // Documents
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    // Code / Scripts
    "text/javascript", "application/javascript",
    "text/typescript",
    "text/x-python", "application/x-python",
    "text/x-java-source",
    "text/x-csrc", "text/x-c++src",
    "text/x-csharp",
    "text/x-go",
    "text/x-rustsrc",
    "text/x-php",
    "application/x-sh", "text/x-shellscript",
    "application/x-bat",
    // Web / Markup
    "text/html", "text/css",
    "application/json",
    "text/markdown",
    "application/xml", "text/xml",
    "application/x-yaml", "text/yaml",
    // Data / Misc text
    "application/sql",
    "text/csv",
    "text/x-log",
    "text/plain",
]);

/** Returns true when a MIME type is in the supported set. */
function isSupportedMime(mime) {
    if (!mime) return false;
    // Strip parameters (e.g. "text/plain; charset=utf-8" → "text/plain")
    const base = mime.split(';')[0].trim().toLowerCase();
    return SUPPORTED_MIME_TYPES.has(base);
}

/** Returns true when the MIME type is an image. */
function isImageMime(mime) {
    if (!mime) return false;
    return mime.split(';')[0].trim().toLowerCase().startsWith('image/');
}

/** Returns true when the MIME type is a PDF. */
function isPdfMime(mime) {
    if (!mime) return false;
    return mime.split(';')[0].trim().toLowerCase() === 'application/pdf';
}

/**
 * Infer a supported MIME type from a file extension when the server
 * doesn't provide one (or provides only 'text/plain' as a fallback).
 */
const EXTENSION_TO_MIME = {
    png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg',
    webp: 'image/webp', avif: 'image/avif', gif: 'image/gif',
    pdf: 'application/pdf',
    js: 'text/javascript', ts: 'text/typescript',
    py: 'text/x-python', java: 'text/x-java-source',
    c: 'text/x-csrc', cpp: 'text/x-c++src', cs: 'text/x-csharp',
    go: 'text/x-go', rs: 'text/x-rustsrc', php: 'text/x-php',
    html: 'text/html', css: 'text/css',
    json: 'application/json', md: 'text/markdown', markdown: 'text/markdown',
    xml: 'application/xml', yaml: 'application/x-yaml', yml: 'application/x-yaml',
    sh: 'application/x-sh', bat: 'application/x-bat',
    sql: 'application/sql', csv: 'text/csv', log: 'text/x-log',
    txt: 'text/plain', tex: 'text/plain',
    toml: 'text/plain', ini: 'text/plain', cfg: 'text/plain', conf: 'text/plain',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
};

/**
 * Given a filename, return the best MIME type match.
 * Falls back to serverMime if no extension match is found.
 */
function mimeFromFilename(filename, serverMime) {
    const ext = (filename || '').split('.').pop().toLowerCase();
    return EXTENSION_TO_MIME[ext] || serverMime || 'application/octet-stream';
}

/**********************************************************
 * MULTIMODAL HELPERS
 **********************************************************/

function mmAggressiveClick(el) {
    if (!el) return;
    const events = ['mousedown', 'mouseup', 'click'];
    events.forEach(evtType => {
        const evt = new MouseEvent(evtType, {
            bubbles: true,
            cancelable: true,
            view: window,
            buttons: 1
        });
        el.dispatchEvent(evt);
    });
}

function mmHover(el) {
    if (!el) return;
    const events = ['mouseenter', 'mouseover'];
    events.forEach(evtType => {
        const evt = new MouseEvent(evtType, {
            bubbles: true,
            cancelable: true,
            view: window
        });
        el.dispatchEvent(evt);
    });
}

function mmBlobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const result = reader.result;
            // Always return raw base64 — strip the "data:...;base64," prefix
            const base64 = result.includes(',') ? result.split(',')[1] : result;
            resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

async function mmFetchBlobAsBase64(url) {
    if (!isContextValid()) return { data: null };

    // 1. Try local fetch first (works for blob: URLs and same-origin)
    try {
        const response = await fetch(url);
        if (response.ok) {
            const blob = await response.blob();
            const mime = blob.type || 'application/octet-stream';
            const data = await mmBlobToBase64(blob);
            return { data, mime, size: blob.size };
        }
    } catch (e) {
    }

    // 2. Fall back to background script for CORS-restricted URLs
    return new Promise((resolve) => {
        chrome.runtime.sendMessage({
            type: "downloadAttachment",
            payload: { url }
        }, (res) => {
            if (res?.success && res.base64) {
                // Determine mime from base64 if possible
                const mimeMatch = res.base64.match(/^data:([^;]+);base64,/);
                let mime = mimeMatch ? mimeMatch[1] : (res.mime || 'application/octet-stream');

                // If we got a generic mime, try to improve it if possible (though we don't have filename here)
                if (mime === 'application/octet-stream' || mime === 'binary/octet-stream') {
                    mime = res.mime || mime;
                }

                resolve({ data: res.base64, mime: mime, size: 0 });
            } else {
                resolve({ data: null });
            }
        });
    });
}

function mmBase64ToFile(base64String, filename, mimeType) {
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

    const cleanBase64 = base64String.includes(',')
        ? base64String.split(',')[1]
        : base64String;
    const byteCharacters = atob(cleanBase64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    return new File([new Uint8Array(byteNumbers)], finalFilename, { type: finalMime });
}

function mmCreateDragEvent(type, dataTransfer) {
    return new DragEvent(type, {
        bubbles: true,
        cancelable: true,
        composed: true,
        view: window,
        dataTransfer: dataTransfer
    });
}

const mmWait = (ms) => new Promise(r => setTimeout(r, ms));

function closeChatGPTFileViewer() {
    const selectors = [
        'button[aria-label="Close"]',
        'button[aria-label="Close modal"]',
        'button[aria-label="Close image"]',
        'button[aria-label*="close" i]',
        '.btn-close',
        '[data-testid="close-button"]'
    ];
    let closed = false;
    for (const selector of selectors) {
        const btns = document.querySelectorAll(selector);
        for (const btn of btns) {
            if (btn && btn.offsetParent !== null) {
                btn.click();
                closed = true;
            }
        }
    }
    return closed;
}

async function canvasesToPdfBase64(container = document) {
    // Determine the correct jsPDF class based on UMD loading
    const jsPDFClass = (window.jspdf && window.jspdf.jsPDF) || window.jsPDF;
    if (!jsPDFClass) {
        console.error("❌ jsPDF not found. Make sure jspdf.min.js is loaded.");
        return null;
    }

    const canvases = container.querySelectorAll('.react-pdf__Page__canvas, canvas');
    if (!canvases.length) return null;

    const pdf = new jsPDFClass({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4'
    });

    canvases.forEach((canvas, index) => {
        const imgData = canvas.toDataURL('image/png', 1.0);
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = (canvas.height * pageWidth) / canvas.width;

        if (index !== 0) pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
    });

    const dataUri = pdf.output('datauristring');
    return dataUri.split(',')[1]; // Return pure base64
}


/**********************************************************
 * END MULTIMODAL HELPERS
 **********************************************************/

// Helper to check if extension context is still valid
function isContextValid() {
    try {
        return !!(typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id);
    } catch (e) {
        return false;
    }
}

// Simple platform detector
function detectPlatform() {
    const hostname = window.location.hostname;
    const url = window.location.href;
    const platform = hostname.includes('notebooklm.google.com') ? 'notebooklm' :
        hostname.includes('grok.com') ? 'grok' :
        hostname.includes('copilot.microsoft.com') ? 'copilot' :
        hostname.includes('www.perplexity.ai') ? 'perplexity' :
            hostname.includes('gemini.google.com') || hostname.includes('aistudio.google.com') ? 'gemini' :
                hostname.includes('claude.ai') ? (url.includes('/project/') ? 'claude-project' : 'claude') :
                    hostname.includes('chat.deepseek.com') ? 'deepseek' :
                        hostname.includes('mail.google.com') ? 'mail' :
                            hostname.includes('lovable.dev') ? 'lovable' :
                                hostname.includes('replit.com') ? (url.includes('/repls') || url.includes('/~') || url.includes('/projects') || url.includes('/home') || url.endsWith('replit.com/') ? 'replit-project' : 'replit') :
                                    hostname.includes('outlook.live.com') || hostname.includes('outlook.office.com') || hostname.includes('outlook.office365.com') ? 'outlook' :
                                        hostname.includes('app.emergent.sh') ? 'emergent' :
                                            (hostname.includes('chatgpt.com') || hostname.includes('chat.openai.com')) ? (url.includes('/project') || url.includes('project=') ? 'chatgpt-project' : 'chatgpt') : 'chatgpt';
    return platform;
}

function getConversationId() {
    const url = window.location.href;
    const platform = detectPlatform();

    try {
        if (platform === 'notebooklm') {
            const match = url.match(/\/notebook\/([a-zA-Z0-9_-]+)/);
            return match ? match[1] : null;
        } else if (platform === 'gemini') {
            // Patterns: 
            // https://gemini.google.com/app/<id>
            // https://gemini.google.com/u/0/app/<id>
            const match = url.match(/\/app\/([a-zA-Z0-9]+)/);
            return match ? match[1] : null;
        } else if (platform === 'mail') {
            // Gmail thread ID from URL
            const match = url.match(/#\w+\/([a-zA-Z0-9]+)/);
            return match ? match[1] : null;
        } else if (platform === 'perplexity') {
            const match = url.match(/\/search\/([^\/?#]+)/);
            if (!match) return null;
            const parts = match[1].split('-');
            return parts[parts.length - 1] || null;
        } else if (platform.startsWith('claude')) {
            // Pattern: https://claude.ai/chat/<uuid>
            // Also works for projects: https://claude.ai/project/<uuid>/chat/<uuid>
            const match = url.match(/\/chat\/([a-z0-9-]+)/);
            return match ? match[1] : null;
        } else if (platform === 'deepseek') {
            // Pattern: https://chat.deepseek.com/a/chat/s/<uuid>
            const match = url.match(/\/a\/chat\/s\/([a-z0-9-]+)/);
            return match ? match[1] : null;
        } else if (platform === 'copilot') {
            // Pattern: https://copilot.microsoft.com/chats/<uuid>
            const match = url.match(/\/chats\/([a-zA-Z0-9-]+)/);
            return match ? match[1] : null;
        } else if (platform === 'grok') {
            // Pattern: https://grok.com/chat/<uuid> (also /c/<uuid>)
            const match = url.match(/\/(?:chat|c)\/([a-zA-Z0-9-]+)/);
            return match ? match[1] : null;
        } else if (platform === 'chatgpt') {
            // Patterns: 
            // https://chatgpt.com/c/<uuid>
            // https://chatgpt.com/g/<id>/c/<uuid>
            const match = url.match(/\/c\/([a-z0-9-]+)/);
            return match ? match[1] : null;
        } else if (platform === 'replit') {
            // Pattern: https://replit.com/@user/ProjectName or /replid/xxx
            const match = url.match(/\/@[^/]+\/([^/?#]+)/) || url.match(/\/replid\/([^/?#]+)/);
            return match ? match[1] : null;
        } else if (platform === 'emergent') {
            // Pattern: https://app.emergent.sh/project/{id} or /chat/{id}
            const match = url.match(/\/(?:project|chat)\/([a-zA-Z0-9_-]+)/);
            return match ? match[1] : null;
        }
    } catch (err) {
        console.error("Error extracting conversation ID:", err);
    }
    return null;
}

function getChatTitle() {
    const platform = detectPlatform();
    let title = "";

    try {
        if (platform === 'chatgpt') {
            // Priority 1: Current active sidebar item
            const activeItem = document.querySelector('a[data-active] .truncate') ||
                document.querySelector('li[data-testid*="history-item-"] .truncate');
            if (activeItem) title = activeItem.textContent.trim();
        } else if (platform.startsWith('claude')) {
            // Priority 1: Chat title button in the header (Regular chats)
            const titleBtn = document.querySelector('button[data-testid="chat-title-button"]');
            if (titleBtn) {
                const innerText = titleBtn.querySelector('.truncate')?.textContent || titleBtn.textContent;
                title = innerText.trim();
            }

            // Priority 2: Project title h1 (Projects)
            if (!title && platform === 'claude-project') {
                const projectH1 = document.querySelector('h1.font-heading');
                if (projectH1) title = projectH1.textContent.trim();
            }
        } else if (platform === 'gemini') {
            // Priority 1: Conversation title class
            const titleEl = document.querySelector('.conversation-title');
            if (titleEl) title = titleEl.textContent.trim();
        } else if (platform === 'deepseek') {
            // Priority 1: Specific class/tabindex structure provided
            const titleEl = document.querySelector('div[class*="afa34042"]') ||
                document.querySelector('div[tabindex="0"][style*="outline: none"]');
            if (titleEl) title = titleEl.textContent.trim();
        } else if (platform === 'copilot') {
            // Try specific Copilot conversation title selectors (new layout)
            const titleEl = document.querySelector('[class*="conversation-header"] [title]') ||
                document.querySelector('h1[class*="title"]') ||
                document.querySelector('[aria-label*="conversation" i][title]') ||
                document.querySelector('nav [title]:not([title=""])');
            if (titleEl) title = (titleEl.getAttribute('title') || titleEl.textContent || '').trim();
        } else if (platform === 'grok') {
            // Grok: active sidebar conversation item, else header/title element
            const titleEl = document.querySelector('a[aria-current="page"]') ||
                document.querySelector('[class*="conversation"][class*="active"]') ||
                document.querySelector('nav a[href*="/chat/"][aria-current], nav a[href*="/c/"][aria-current]');
            if (titleEl) title = titleEl.textContent.trim();
        } else if (platform === 'notebooklm') {
            const titleEl = document.querySelector('div[class*="notebook-title"]') || document.querySelector('h1, h2');
            if (titleEl) title = titleEl.textContent.trim();
        } else if (platform === 'mail' || platform === 'gmail') {
            const subjectEl = document.querySelector('h2[aria-label="Message subject"], .hP');
            title = subjectEl ? subjectEl.textContent.trim() : "Email Capsule";
        } else if (platform === 'outlook') {
            const subjectEl = document.querySelector('div[role="main"] h1, div[aria-label="Subject"], .QBy00');
            title = subjectEl ? subjectEl.textContent.trim() : "Outlook Capsule";
        } else if (platform === 'perplexity') {
            // Perplexity: use document title or h1 tag
            const cleanTitle = document.title.replace(/\\s*-\\s*Perplexity/i, '').trim();
            if (cleanTitle && cleanTitle.length > 0) {
                title = cleanTitle;
            } else {
                const h1 = document.querySelector('h1');
                if (h1) title = h1.textContent.trim();
            }
        } else if (platform === 'replit') {
            // Replit: try project name from header or URL
            const headerEl = document.querySelector('span[data-cy="workspace-header-title"]') ||
                document.querySelector('.repl-name') ||
                document.querySelector('header span:first-child');
            if (headerEl) title = headerEl.textContent.trim();
            if (!title) {
                const match = window.location.pathname.match(/\/@[^/]+\/([^/?#]+)/);
                if (match) title = decodeURIComponent(match[1]);
            }
        } else if (platform === 'emergent') {
            // Emergent: try project/chat title from header elements
            const headerEl = document.querySelector('h1') ||
                document.querySelector('[class*="project-name"]') ||
                document.querySelector('[class*="chat-title"]');
            if (headerEl) title = headerEl.textContent.trim();
            if (!title) {
                // Fallback: extract from URL path /project/{name} or /chat/{name}
                const match = window.location.pathname.match(/\/(?:project|chat)\/([^/?#]+)/);
                if (match) title = decodeURIComponent(match[1]);
            }
        }
    } catch (err) {
        console.warn("Error extracting chat title via selectors:", err);
    }

    // Fallback if specific selectors failed
    if (!title || title === 'ChatGPT' || title === 'New chat') {
        title = document.title;
        if (platform === 'chatgpt') {
            title = title.replace(/ - ChatGPT$/, '');
        } else if (platform.startsWith('claude')) {
            title = title.replace(/ - Claude$/, '');
        } else if (platform === 'gemini') {
            title = title.replace(/^Gemini$/, 'Gemini Chat').replace(/^Gemini - /, '');
        } else if (platform === 'deepseek') {
            title = title.replace(/^DeepSeek - /, '');
        } else if (platform === 'perplexity') {
            title = title.replace(/\s*-\s*Perplexity.*$/i, '').trim();
        } else if (platform === 'emergent') {
            title = title.replace(/\s*[-|]\s*Emergent.*$/i, '').trim();
        } else if (platform === 'copilot') {
            title = title.replace(/\s*-\s*Microsoft Copilot.*$/i, '').trim();
        } else if (platform === 'grok') {
            title = title.replace(/\s*[-|]\s*Grok.*$/i, '').trim();
        } else if (platform === 'notebooklm') {
            title = title.replace(/\s*-\s*NotebookLM.*$/i, '').trim();
        }
    }

    return title.trim() || "New Capsule";
}

function getPostDropMessages(msgs) {
    if (!msgs || !msgs.length) {
        return [];
    }

    const DROP_MARKERS = [
        "Adding Capsule Context To Conversation 👀",
        "**ACTIVE CAPSULE CONTEXT**",
        "Adding capsule context to this conversation! Say Hi."
    ];

    // Find the last index of any drop marker
    let lastDropIndex = -1;
    for (let i = msgs.length - 1; i >= 0; i--) {
        const text = msgs[i].text || msgs[i].content || "";
        const role = msgs[i].role || "unknown";

        // CLEAN the text for more robust matching (normalize whitespace)
        const cleanText = text.replace(/\s+/g, ' ');

        if (DROP_MARKERS.some(marker => cleanText.includes(marker))) {
            lastDropIndex = i;
            break;
        }
    }

    if (lastDropIndex === -1) {
        return msgs;
    }

    const sliced = msgs.slice(lastDropIndex + 1);
    return sliced;
}

/* ===== CHATGPT UTILS ===== */
function waitForMessagesFromChatGPT(options = {}) {
    const scope = options.scope || document;
    const timeout = typeof options === 'number' ? options : (options.timeout || 15000);
    return new Promise((resolve, reject) => {
        const start = Date.now();
        const interval = setInterval(() => {
            const messages = scope.querySelectorAll("article, [data-testid^='conversation-turn-'], [data-message-author-role], section[data-section-id]");
            if (messages.length > 0) {
                clearInterval(interval);
                resolve(messages);
            }
            if (Date.now() - start > timeout) {
                clearInterval(interval);
                const turnTest = document.querySelectorAll('[data-testid^="conversation-turn-"]').length;
                const authorTest = document.querySelectorAll('[data-message-author-role]').length;
                const sectionTest = document.querySelectorAll('section[data-section-id]').length;
                const articleTest = document.querySelectorAll('article').length;
                const errorStr = `Timed out waiting for messages (Found ${articleTest} art, ${turnTest} turns, ${authorTest} authors, ${sectionTest} sections)`;
                reject(errorStr);
            }
        }, 500);
    });
}

async function getMessagesFromChatGPT(options = {}) {
    const scope = options.scope || document;
    // Select all potential message containers
    const turnElements = Array.from(scope.querySelectorAll('[data-testid^="conversation-turn-"], [data-message-author-role], article, section[data-section-id]'))
        .filter((el, index, self) => !self.some((other, otherIdx) => otherIdx !== index && other.contains(el)));
    const messages = [];

    const includeAttachments = options.includeAttachments !== false;

    if (includeAttachments && isContextValid()) {
        await new Promise((resolve) => {
            if (window.__capsulePdfInterceptorInjected) {
                resolve();
                return;
            }
            const script = document.createElement('script');
            script.src = chrome.runtime.getURL('gpt-pdf-interceptor.js');
            script.onload = () => {
                window.__capsulePdfInterceptorInjected = true;
                script.remove();
                resolve();
            };
            script.onerror = () => {
                script.remove();
                resolve();
            };
            (document.head || document.documentElement).appendChild(script);
        });
        await mmWait(300);
    }

    for (const turn of turnElements) {
        try {
            // Determine role by looking for the role attribute or identifying features
            const roleContainer = turn.querySelector("[data-message-author-role]") ||
                (turn.hasAttribute("data-message-author-role") ? turn : null);
            let role = roleContainer?.getAttribute("data-message-author-role");

            if (!role) {
                // Heuristic: User messages often have specific labels
                if (turn.querySelector('[aria-label*="You"], [alt*="User avatar"]')) {
                    role = "user";
                } else if (turn.tagName.toLowerCase() === 'section' || turn.querySelector('.markdown, .prose')) {
                    role = "assistant";
                } else {
                    role = "unknown";
                }
            }

            // Find the main text container
            const textContainer = turn.querySelector(".markdown, .prose, [data-message-author-role='user']") || turn;

            let text = "";
            if (textContainer) {
                text = Array.from(textContainer.querySelectorAll("p, pre, li")).map(el => el.textContent).join("\n").trim()
                    || textContainer.textContent.trim();
            } else {
                // Fallback for cases where selectors might be slightly different
                text = Array.from(turn.querySelectorAll("p, pre, li")).map(el => el.textContent).join("\n").trim();
            }

            // ===== MULTIMODAL: Extract images from this turn =====
            const attachments = [];

            if (includeAttachments) {
                const allImages = turn.querySelectorAll('img');
                const imagePromises = Array.from(allImages).map(async (img, imgIndex) => {
                    const src = img.getAttribute('src') || '';
                    const alt = (img.getAttribute('alt') || '').toLowerCase();
                    const width = img.naturalWidth || img.width;

                    const isAvatar = alt.includes("avatar") || src.includes("avatar") || src.includes("profile") || img.closest('button[aria-label*="Copy"], [data-testid*="avatar"]');
                    const isTiny = (width && width < 40) || (img.naturalHeight && img.naturalHeight < 40);
                    const isExtensionLogo = img.classList.contains('tilantra-capsule-logo-btn') || src.includes('capsule.png');
                    const isUserUploadedOrGenerated = src.includes('oaiusercontent.com') || src.includes('backend-api/estuary') || src.startsWith('blob:');

                    if (!isAvatar && !isTiny && !isExtensionLogo && (isUserUploadedOrGenerated || width > 120)) {
                        try {
                            let base64 = null, mime = 'image/png';
                            if (src.startsWith('blob:')) {
                                const result = await mmFetchBlobAsBase64(src);
                                if (result && result.data) {
                                    base64 = result.data;
                                    mime = result.mime;
                                }
                            } else {
                                const bgRes = await chrome.runtime.sendMessage({ type: "downloadAttachment", payload: { url: src } });
                                if (bgRes && bgRes.success && bgRes.base64) {
                                    base64 = bgRes.base64;
                                    mime = bgRes.mime || mime;
                                }
                            }

                            if (base64) {
                                let filename = `image_${imgIndex + 1}.png`;
                                const match = alt.match(/whatsapp image.*?\.(jpeg|jpg|png|webp)/i);
                                if (match) {
                                    filename = match[0];
                                } else if (alt.endsWith('.png') || alt.endsWith('.jpg') || alt.endsWith('.jpeg')) {
                                    filename = alt;
                                }

                                return {
                                    type: 'image',
                                    filename: filename,
                                    mime: mime,
                                    base64: base64
                                };
                            }
                        } catch (e) {
                            console.error("Failed to extract ChatGPT image:", e);
                        }
                    }
                    return null;
                });
                
                const resolvedImages = await Promise.all(imagePromises);
                for (const imgObj of resolvedImages) {
                    if (imgObj) attachments.push(imgObj);
                }

                // ===== MULTIMODAL: Extract ALL uploaded file attachments from this turn =====
                // ChatGPT renders every uploaded file (xlsx, js, docx, pdf, csv…) as a button
                // pill whose aria-label is the filename. We collect them all and process them
                // later via the page-world interceptor (same flow as PDFs).
                const allFileBtns = Array.from(
                    turn.querySelectorAll('button[aria-label], a[download]')
                ).filter(btn => {
                    const label = (btn.getAttribute('aria-label') || btn.getAttribute('download') || '').trim();
                    if (!label) return false;
                    const ext = label.split('.').pop().toLowerCase();

                    // Don't treat images as preview buttons if we already extracted them directly
                    if (isImageMime(EXTENSION_TO_MIME[ext])) return false;

                    return !!EXTENSION_TO_MIME[ext]; // only pick up supported extensions
                });

                for (const btn of allFileBtns) {
                    const label = (btn.getAttribute('aria-label') || btn.getAttribute('download') || '').trim();
                    attachments.push({ _pdfButton: btn, _pdfName: label });
                }
            }

            if (text || attachments.length > 0) {
                messages.push({ role, text, attachments });
            }
        } catch (err) {
            console.error("Error parsing ChatGPT message:", err);
        }
    }

    // ===== MULTIMODAL: Process all pending PDF buttons via page-world interceptor =====
    // Collect all pending PDF placeholders across all messages
    const pendingPdfs = [];
    for (const msg of messages) {
        if (!msg.attachments) continue;
        for (let i = msg.attachments.length - 1; i >= 0; i--) {
            const att = msg.attachments[i];
            if (att._pdfButton) {
                pendingPdfs.push({ msgAttachments: msg.attachments, index: i, button: att._pdfButton, name: att._pdfName });
            }
        }
    }

    // Count total attachments (images + PDFs) for status updates
    let totalAttachments = 0;
    for (const msg of messages) {
        if (msg.attachments) {
            totalAttachments += msg.attachments.length;
        }
    }

    if (pendingPdfs.length > 0 && isContextValid()) {

        // Inject the page-world interceptor script (monkey-patches window.open & createElement)
        await new Promise((resolve) => {
            // Check if already injected
            if (window.__capsulePdfInterceptorInjected) {
                resolve();
                return;
            }
            const script = document.createElement('script');
            script.src = chrome.runtime.getURL('gpt-pdf-interceptor.js');
            script.onload = () => {
                window.__capsulePdfInterceptorInjected = true;
                script.remove();
                resolve();
            };
            script.onerror = () => {
                console.error("Failed to inject PDF interceptor script");
                script.remove();
                resolve();
            };
            (document.head || document.documentElement).appendChild(script);
        });

        // Give the interceptor a moment to set up
        await mmWait(300);

        // Process each PDF button sequentially
        let processedCount = totalAttachments - pendingPdfs.length; // Images already processed
        for (const [pdfIndex, pending] of pendingPdfs.entries()) {
            try {
                // Unified Parallel Flow for ALL files (PDFs, text, code, spreadsheets, docx etc.)
                const fileData = await new Promise((resolve) => {
                    let resolved = false;
                    let iframeInterval = null;

                    const cleanAndResolve = (result) => {
                        if (resolved) return;
                        resolved = true;

                        // Stop interceptor and clean up listeners
                        window.dispatchEvent(new CustomEvent('CAPSULE_STOP_PDF_CAPTURE'));
                        window.removeEventListener('CAPSULE_PDF_URL', urlHandler);
                        window.removeEventListener('CAPSULE_PDF_DATA', dataHandler);
                        if (iframeInterval) clearInterval(iframeInterval);
                        clearTimeout(overallTimeout);

                        // Cancel background download expectation if we resolved via page-world/iframe
                        chrome.runtime.sendMessage({ action: "cancelExpectDownload" });

                        resolve(result);
                    };

                    // 1. Page-world direct data intercept handler (instant!)
                    const dataHandler = (event) => {
                        if (resolved) return;
                        const { base64, mime } = event.detail || {};
                        // Ignore JSON responses, they are usually download_url redirects
                        if (mime && mime.includes('json')) return;

                        if (base64) {
                            closeChatGPTFileViewer();
                            cleanAndResolve({ data: base64, mime });
                        }
                    };

                    // 2. Page-world URL intercept handler (backup)
                    const urlHandler = async (event) => {
                        if (resolved) return;
                        const url = event.detail?.url;
                        if (url) {
                            try {
                                const bgRes = await chrome.runtime.sendMessage({ type: "downloadAttachment", payload: { url } });
                                if (bgRes && bgRes.success && bgRes.base64) {
                                    closeChatGPTFileViewer();
                                    cleanAndResolve({ data: bgRes.base64, mime: bgRes.mime });
                                }
                            } catch (e) {
                                console.error(`   ❌ [Content] Failed to fetch intercepted URL:`, e);
                            }
                        }
                    };

                    window.addEventListener('CAPSULE_PDF_DATA', dataHandler);
                    window.addEventListener('CAPSULE_PDF_URL', urlHandler);
                    window.dispatchEvent(new CustomEvent('CAPSULE_START_PDF_CAPTURE'));

                    // 3. Register expectDownload with background script in parallel
                    let dlPromise = new Promise((resolveDl) => {
                        chrome.runtime.sendMessage({ action: "expectDownload" }, (bgRes) => {
                            resolveDl(bgRes || null);
                        });
                    });

                    // Click the button after a tiny delay so the listeners/expectDownload are ready
                    setTimeout(() => {
                        if (!resolved) pending.button.click();
                    }, 50);

                    // 4. Handle background download intercept result
                    dlPromise.then((dlResult) => {
                        if (resolved) return;
                        if (dlResult?.success) {
                            let finalBase64 = null;
                            let finalMime = mimeFromFilename(pending.name, 'application/octet-stream');

                            if (dlResult.base64) {
                                finalBase64 = dlResult.base64;
                                finalMime = dlResult.mime || finalMime;
                                if (dlResult.filename) pending.name = dlResult.filename;
                            } else if (dlResult.type === 'blob_url' && dlResult.url) {
                                fetch(dlResult.url)
                                    .then(r => r.ok ? r.blob() : null)
                                    .then(blob => blob ? mmBlobToBase64(blob).then(b64 => {
                                        finalBase64 = b64;
                                        finalMime = blob.type || dlResult.mime || finalMime;
                                    }) : null)
                                    .catch(e => console.warn(`   ⚠️ [Content] blob_url fetch failed for ${pending.name}:`, e))
                                    .finally(() => {
                                        if (finalBase64) {
                                            closeChatGPTFileViewer();
                                            cleanAndResolve({ data: finalBase64, mime: finalMime });
                                        }
                                    });
                                return;
                            }

                            if (finalBase64) {
                                closeChatGPTFileViewer();
                                cleanAndResolve({ data: finalBase64, mime: finalMime });
                            }
                        }
                    });

                    // 5. Poll for Estuary iframe (runs in parallel, checks every 200ms)
                    iframeInterval = setInterval(async () => {
                        if (resolved) return;
                        try {
                            const allIframes = Array.from(document.querySelectorAll('iframe'));
                            for (const ifr of allIframes) {
                                let src = ifr.src || "";
                                if (src.includes('backend-api/estuary/content')) {
                                    const bgRes = await chrome.runtime.sendMessage({ type: "downloadAttachment", payload: { url: src } });
                                    if (bgRes && bgRes.success && bgRes.base64) {
                                        closeChatGPTFileViewer();
                                        cleanAndResolve({ data: bgRes.base64, mime: bgRes.mime });
                                        return;
                                    }
                                }
                            }

                            // DOM-based fallback for text/code viewers (.tex, .py, etc.)
                            const codeBlock = document.querySelector('.file-viewer-content code, [data-testid="file-viewer-content"] code, pre.file-viewer-content');
                            if (codeBlock && codeBlock.textContent && codeBlock.textContent.trim().length > 0) {
                                // Double check it isn't a loading state
                                if (codeBlock.textContent.includes('Loading') && codeBlock.textContent.length < 20) return;

                                closeChatGPTFileViewer();
                                const text = codeBlock.textContent;
                                const base64 = btoa(unescape(encodeURIComponent(text)));
                                cleanAndResolve({ data: base64, mime: mimeFromFilename(pending.name, 'text/plain') });
                                return;
                            }
                        } catch (e) {
                            // ignore fetch errors during polling
                        }
                    }, 200);

                    // 6. Overall timeout fallback (15 seconds)
                    const overallTimeout = setTimeout(() => {
                        if (resolved) return;
                        console.warn(`   ⚠️ [Content] Unified extraction timed out/failed for: ${pending.name}. Resolving null.`);
                        closeChatGPTFileViewer();
                        cleanAndResolve(null);
                    }, 15000);
                });

                // Replace the placeholder with actual data or remove it
                if (fileData && fileData.data) {
                    const resolvedMime = mimeFromFilename(pending.name, fileData.mime);
                    pending.msgAttachments[pending.index] = {
                        type: isPdfMime(resolvedMime) ? 'pdf' : (isImageMime(resolvedMime) ? 'image' : 'file'),
                        filename: pending.name,
                        mime: resolvedMime,
                        base64: fileData.data
                    };
                } else {
                    pending.msgAttachments.splice(pending.index, 1);
                }

                // Wait before clicking the next one (prevents popup blocker issues)
                await mmWait(1000);

            } catch (e) {
                console.error("Failed to extract ChatGPT file/PDF:", e);
                pending.msgAttachments.splice(pending.index, 1);
            }
        }
    } else if (pendingPdfs.length > 0) {
        // Context invalid, remove all PDF placeholders
        for (const pending of pendingPdfs) {
            pending.msgAttachments.splice(pending.index, 1);
        }
    }

    // Clean up any remaining placeholder objects (safety)
    for (const msg of messages) {
        if (msg.attachments) {
            msg.attachments = msg.attachments.filter(a => !a._pdfButton);
        }
    }

    return messages;
}

/* ===== GEMINI UTILS ===== */
function waitForMessagesFromGemini(timeout = 15000) {
    return new Promise((resolve, reject) => {
        const start = Date.now();
        const interval = setInterval(() => {
            const turns = document.querySelectorAll('#chat-history .conversation-container');
            if (turns.length > 0) {
                clearInterval(interval);
                resolve(turns);
            }
            if (Date.now() - start > timeout) {
                clearInterval(interval);
                reject("Timed out waiting for messages");
            }
        }, 500);
    });
}

async function getMessagesFromGemini(options = { includeAttachments: true }) {
    const history = [];
    // Select ONLY role containers to avoid merged text from parent containers
    const turns = document.querySelectorAll('user-query, model-response');

    const includeAttachments = options.includeAttachments !== false;
    const processedPdfBtns = new Set();

    // Count total attachments for progress tracking
    let totalAttachments = 0;
    for (const el of turns) {
        const imgs = Array.from(el.querySelectorAll('img')).filter(img => {
            const isSmall = img.naturalWidth < 100;
            const isProfile = img.src.includes('profile_photo') || img.src.includes('googleusercontent.com/a/');
            const isIcon = img.src.includes('icon') || img.src.includes('symbol');
            return !isSmall && !isProfile && !isIcon;
        });
        const pdfBtns = el.querySelectorAll('button.new-file-preview-file');
        totalAttachments += imgs.length + pdfBtns.length;
    }
    let attachmentIndex = 0;

    for (const el of turns) {
        const isAI = el.tagName.toLowerCase() === 'model-response' || el.closest('model-response');
        const role = isAI ? 'model' : 'user';

        const contentEl = el.querySelector('.query-text, message-content, .markdown') || el;

        // PRIORITIZE our saved attribute, fallback to textContent
        const text = (el.getAttribute('data-capsule-text') ||
            contentEl.getAttribute('data-capsule-text') ||
            contentEl.textContent).trim();

        // ===== MULTIMODAL: Extract images from this turn =====
        const attachments = [];

        if (includeAttachments) {
            const uniqueImgSrcs = new Set();
            const imgs = Array.from(el.querySelectorAll('img')).filter(img => {
                const isSmall = img.naturalWidth < 100;
                const isProfile = img.src.includes('profile_photo') || img.src.includes('googleusercontent.com/a/');
                const isIcon = img.src.includes('icon') || img.src.includes('symbol');
                
                if (isSmall || isProfile || isIcon) return false;
                if (uniqueImgSrcs.has(img.src)) return false;
                uniqueImgSrcs.add(img.src);
                return true;
            });

            for (const [i, img] of imgs.entries()) {
                attachmentIndex++;

                try {
                    let base64 = null;
                    if (img.src.startsWith('blob:')) {
                        const r = await fetch(img.src);
                        const blob = await r.blob();
                        base64 = await mmBlobToBase64(blob);
                    } else if (isContextValid()) {
                        const res = await chrome.runtime.sendMessage({
                            type: "downloadAttachment",
                            payload: { url: img.src }
                        });
                        if (res?.success && res.base64) {
                            base64 = res.base64;
                        }
                    }
                    if (base64) {
                        attachments.push({
                            type: 'image',
                            filename: `image_${i + 1}.png`,
                            mime: 'image/png',
                            base64: base64
                        });
                    }
                } catch (e) {
                    console.error("Failed to extract Gemini image:", e);
                }
            }

            // ===== MULTIMODAL: Extract PDFs/Files from this turn =====
            // Broad search for file chips specific to Gemini's UI
            const validExts = Object.keys(EXTENSION_TO_MIME).filter(e => e !== 'jpg' && e !== 'png' && e !== 'jpeg' && e !== 'webp').join('|');
            const extRegex = new RegExp(`(\\.?)\\b(${validExts})\\b`, 'i');
            const looseExtRegex = new RegExp(`\\b(pdf|docx|xlsx|txt|csv|pptx|zip|tex|md|py|js|html|css|json)\\b`, 'i');

            // Broaden the search root because Gemini moved file chips outside the text container
            const searchRoot = el.closest('.conversation-container, .message-wrapper, .turn, message-row') || el.parentElement || el;

            const pdfBtns = Array.from(searchRoot.querySelectorAll('button, [role="button"], a, .file-attachment-card, file-attachment, .file-preview, .clickable, chip, [class*="attachment"], [class*="file"]')).filter(btn => {
                const ariaLabel = (btn.getAttribute('aria-label') || '').trim().toLowerCase();
                const testId = (btn.getAttribute('data-test-id') || '').trim().toLowerCase();
                const text = (btn.textContent || '').trim().toLowerCase();
                const className = (btn.className || '').toString().toLowerCase();
                
                const labelToCheck = ariaLabel || testId || text;
                
                // If we're relying solely on textContent, ensure it's short (a file chip, not a whole chat bubble)
                if (!ariaLabel && !testId && text.length > 150) return false;

                // Match if the label has a valid extension (with or without dot), OR if the class screams "file attachment"
                const hasExt = extRegex.test(labelToCheck) || looseExtRegex.test(labelToCheck);
                const hasFileClass = className.includes('attachment') || className.includes('file-preview') || className.includes('file-chip');
                
                const isDownloadBtn = labelToCheck.includes('download') || labelToCheck.includes('save') || labelToCheck.includes('export');
                
                return (hasExt || hasFileClass) && !isDownloadBtn && text.length > 0;
            });

            // Deduplicate: If an element is a parent of another element in the list, discard the parent.
            // We only want the deepest/most specific clickable element for each file.
            const uniquePdfBtns = pdfBtns.filter((btn, index, self) => {
                if (processedPdfBtns.has(btn)) return false;
                return !self.some(otherBtn => otherBtn !== btn && btn.contains(otherBtn));
            });
            uniquePdfBtns.forEach(btn => processedPdfBtns.add(btn));
            
            console.log(`[CONTENT-UTILS] Found ${uniquePdfBtns.length} document/file chips in this turn.`);

            for (const btn of uniquePdfBtns) {
                let nameText = btn.getAttribute("aria-label") || "";
                if (!nameText || nameText.toLowerCase().includes("preview file") || nameText.toLowerCase().includes("download")) {
                    const nameEl = btn.querySelector('.new-file-name') || btn.querySelector('.name') || btn.querySelector('.file-name') || btn.querySelector('.attachment-name') || btn.querySelector('.title');
                    nameText = nameEl ? nameEl.textContent.trim() : (btn.innerText.trim() || "document.pdf");
                }

                // Clean up the name mapping
                nameText = nameText.replace("Loading ", "").replace(/\.$/, "").trim();
                let finalName = nameText;

                try {
                    const downloadPromise = chrome.runtime.sendMessage({ action: "expectDownload" });

                    // Signal the page-world interceptor to start a one-shot capture
                    window.dispatchEvent(new CustomEvent('GEMINI_START_BLOB_CAPTURE'));

                    // Listen for CAPSULE_PDF_DATA which carries the full data URL
                    const fileCapturePromise = new Promise(resolve => {
                        const dataHandler = (e) => {
                            if (e.detail && e.detail.base64) {
                                if (e.detail.mime && e.detail.mime.includes('json')) return; // Ignore JSON
                                window.removeEventListener('CAPSULE_PDF_DATA', dataHandler);
                                resolve({ data: e.detail.base64, mime: e.detail.mime });
                            }
                        };
                        window.addEventListener('CAPSULE_PDF_DATA', dataHandler);
                    });

                    // Click the file chip to open the side-panel or viewer
                    btn.click(); 
                    btn.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true, view: window }));
                    btn.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true, view: window }));

                    let fileData = null;

                    // 1. Check if clicking the chip itself immediately triggered the file fetch (wait 2s max)
                    const quickCapture = await Promise.race([
                        fileCapturePromise,
                        mmWait(2000).then(() => null)
                    ]);

                    if (quickCapture && quickCapture.data) {
                        fileData = quickCapture;
                        console.log(`[CONTENT-UTILS] Captured file immediately upon clicking chip for ${finalName}`);
                    } else {
                        // 2. If not, poll for the download button in the newly opened modal (max 5 seconds)
                        let downloadTarget = null;
                        const findVisibleDownloadTarget = () => {
                            const selectors = [
                                'button[aria-label*="Download" i]',
                                'button[data-tooltip*="Download" i]',
                                '[title*="Download" i]',
                                'button[aria-label*="Save" i]',
                                '.download-button',
                                'a[download]',
                                '[aria-label*="download" i]'
                            ];
                            for (const sel of selectors) {
                                const elements = document.querySelectorAll(sel);
                                for (const targetEl of elements) {
                                    if (targetEl.getBoundingClientRect().width > 0) {
                                        return targetEl.closest('[role="button"]') || targetEl.closest('button') || targetEl;
                                    }
                                }
                            }
                            // Fallback SVG
                            const svgs = document.querySelectorAll('svg');
                            for (const svg of svgs) {
                                if (svg.innerHTML.includes('M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z') || svg.innerHTML.includes('M19 9h-4V3H9v6H5l7 7 7-7z')) {
                                    const parentBtn = svg.closest('button, [role="button"], a');
                                    if (parentBtn && parentBtn.getBoundingClientRect().width > 0) return parentBtn;
                                }
                            }
                            return null;
                        };

                        for (let attempt = 0; attempt < 50; attempt++) {
                            const target = findVisibleDownloadTarget();
                            if (target) {
                                downloadTarget = target;
                                break;
                            }
                            await mmWait(100);
                        }

                        if (!downloadTarget) {
                            console.warn(`[CONTENT-UTILS] CRITICAL: Could not find download button for ${finalName}!`);
                            const visibleBtns = Array.from(document.querySelectorAll('button, [role="button"], a')).filter(b => b.getBoundingClientRect().width > 0);
                            console.log(`[CONTENT-UTILS] Visible buttons on screen:`, visibleBtns.map(b => b.getAttribute('aria-label') || b.innerText).join(' | '));
                        } else {
                            // Click the download button
                            downloadTarget.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true, view: window }));
                            downloadTarget.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true, view: window }));
                            downloadTarget.click();
                            
                            // 3. Wait for the file capture after clicking download (max 5 seconds)
                            fileData = await Promise.race([
                                fileCapturePromise,
                                mmWait(5000).then(() => null)
                            ]);
                        }
                    }

                    // Stop the interceptor to prevent contaminating next file
                    window.dispatchEvent(new CustomEvent('GEMINI_STOP_BLOB_CAPTURE'));

                        let finalBase64 = null;
                        let finalMime = "application/pdf";

                        if (fileData && fileData.data) {
                            // fileData.data is the full data URL (data:mime;base64,...)
                            // uploadAttachment in background.js strips the prefix — same as GPT
                            finalBase64 = fileData.data;
                            finalMime = (fileData.mime || "application/pdf").split(';')[0].trim();
                            console.log(`[CONTENT-UTILS] Used CAPSULE_PDF_DATA for ${finalName}`);
                        } else {
                            // Fallback: check background script download interception
                            console.log(`[CONTENT-UTILS] Waiting for background downloadPromise for ${finalName}...`);
                            const res = await Promise.race([
                                downloadPromise,
                                mmWait(1000).then(() => ({ success: false }))
                            ]);
                            console.log(`[CONTENT-UTILS] downloadPromise resolved:`, res ? Object.keys(res) : null);
                            if (res?.success && res.base64) {
                                finalBase64 = res.base64;
                                finalMime = res.mime || "application/pdf";
                                if (res.filename) finalName = res.filename;
                                console.log(`[CONTENT-UTILS] Used background downloadPromise for ${finalName}`);
                            } else {
                                console.warn(`[CONTENT-UTILS] downloadPromise failed or timed out for ${finalName}`);
                            }
                        }

                        // Text Scraper & Lightweight Canvas Fallback
                        if (!finalBase64) {
                            console.log(`[CONTENT-UTILS] Both primary capture methods failed for ${finalName}, attempting text scrape/canvas fallback...`);
                            let bestText = '';
                            const potentialPanels = document.querySelectorAll('[role="dialog"], [class*="side-panel"], [class*="preview"], [class*="viewer"], right-panel, file-preview');
                            for (const el of potentialPanels) {
                                if (el.getBoundingClientRect().width > 0) {
                                    const text = el.innerText || '';
                                    if (text.length > bestText.length) {
                                        bestText = text;
                                    }
                                }
                            }
                            
                            if (bestText.length < 50) {
                                const allDivs = document.querySelectorAll('div, main, section');
                                for (const el of allDivs) {
                                    if (el.closest('#chat-history') || el.closest('user-query') || el.closest('model-response') || el.closest('.conversation-container')) continue;
                                    if (el.getBoundingClientRect().width > 0) {
                                        const text = el.innerText || '';
                                        if (text.length > bestText.length) {
                                            bestText = text;
                                        }
                                    }
                                }
                            }
                            
                            if (bestText.trim().length > 50) {
                                // We successfully scraped the text! Save it as a text file to save massive space
                                finalBase64 = btoa(unescape(encodeURIComponent(bestText.trim())));
                                finalMime = "text/plain";
                                if (!finalName.match(/\.(txt|md|py|js|html|css|csv|tex|json)$/i)) {
                                    finalName = finalName + ".txt";
                                }
                            } else {
                                // Absolute worst-case scenario: Canvas fallback but ONLY on the side panel
                                let targetEl = document.querySelector('[role="dialog"], [class*="side-panel"], right-panel, file-preview') || document.body;
                                finalBase64 = await canvasesToPdfBase64(targetEl);
                                finalMime = "application/pdf";
                            }
                        }

                        if (finalBase64) {
                            // Detect actual MIME from magic bytes so the filename extension
                            // (e.g. .pdf) cannot override what the data actually is.
                            // Gemini's PDF viewer exposes PNG thumbnails that arrive labeled
                            // as application/pdf once mimeFromFilename sees the .pdf extension.
                            const cleanB64 = finalBase64.includes(',') ? finalBase64.split(',')[1] : finalBase64;
                            let detectedMime = null;
                            try {
                                const head = Uint8Array.from(atob(cleanB64.slice(0, 8)), c => c.charCodeAt(0));
                                if (head[0] === 0x89 && head[1] === 0x50 && head[2] === 0x4e && head[3] === 0x47) detectedMime = 'image/png';
                                else if (head[0] === 0xff && head[1] === 0xd8 && head[2] === 0xff) detectedMime = 'image/jpeg';
                                else if (head[0] === 0x25 && head[1] === 0x50 && head[2] === 0x44 && head[3] === 0x46) detectedMime = 'application/pdf';
                            } catch(e) {}

                            let resolvedMime, resolvedName;
                            if (detectedMime && detectedMime !== finalMime) {
                                console.warn(`[CONTENT-UTILS] MIME mismatch for ${finalName}: expected ${finalMime}, actual bytes = ${detectedMime}. Using actual.`);
                                resolvedMime = detectedMime;
                                // Fix file extension to match actual bytes
                                if (detectedMime === 'image/png') resolvedName = finalName.replace(/\.[^.]+$/, '.png');
                                else if (detectedMime === 'image/jpeg') resolvedName = finalName.replace(/\.[^.]+$/, '.jpg');
                                else resolvedName = finalName;
                            } else {
                                resolvedMime = mimeFromFilename(finalName, finalMime);
                                resolvedName = finalName;
                            }

                            attachments.push({
                                type: isPdfMime(resolvedMime) ? 'pdf' : (isImageMime(resolvedMime) ? 'image' : 'file'),
                                filename: resolvedName,
                                mime: resolvedMime,
                                base64: finalBase64
                            });
                        }

                        // ── Close Side Panel ──
                        const findCloseBtn = () => {
                            const closeBtnSelectors = [
                                'button[aria-label*="Close" i]',
                                'button[data-tooltip*="Close" i]',
                                'button[aria-label*="hide" i]',
                                'button[data-tooltip*="hide" i]',
                                '.close-button'
                            ];
                            for (const sel of closeBtnSelectors) {
                                const elements = document.querySelectorAll(sel);
                                for (const targetEl of elements) {
                                    if (targetEl.getBoundingClientRect().width > 0) {
                                        return targetEl.closest('button') || targetEl;
                                    }
                                }
                            }
                            return null;
                        };

                        const closeBtn = findCloseBtn();
                        if (closeBtn) {
                            closeBtn.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true, view: window }));
                            closeBtn.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true, view: window }));
                            closeBtn.click();
                        } else {
                            document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
                        }

                        // Wait for side-panel closing animation
                        await mmWait(500);
                } catch (e) {
                    console.error(`[CONTENT-UTILS] Error extracting Gemini file ${finalName}:`, e);
                    document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
                }
            }
        }

        if (text || attachments.length > 0) {
            // Basic deduplication in case of overlapping selectors
            if (history.length > 0 &&
                history[history.length - 1].role === role &&
                history[history.length - 1].text === text &&
                attachments.length === 0) continue;

            history.push({ role, text, attachments });
        }
    }

    return history;
}

/* ===== CLAUDE UTILS (NUCLEAR OPTION) ===== */
function waitForMessagesFromClaude(options = { scope: document }) {
    const scope = options.scope || document;
    return new Promise((resolve, reject) => {
        const timeout = 10000;
        const start = Date.now();
        const interval = setInterval(() => {
            const msgs = scope.querySelectorAll('.whitespace-pre-wrap, [data-test-id="chat-query"], [data-test-id="chat-message"]');
            if (msgs.length > 0) {
                clearInterval(interval);
                resolve(msgs);
            }
            if (Date.now() - start > timeout) {
                clearInterval(interval);
                reject("Timed out waiting for messages");
            }
        }, 500);
    });
}

async function getMessagesFromClaude(options = { includeAttachments: true, scope: document }) {
    const history = [];
    const scope = options.scope || document;
    const includeAttachments = options.includeAttachments !== false;

    // STRATEGY: Grab EVERY text bubble on the entire page
    // Claude uses .whitespace-pre-wrap for message text, but we also look for test-ids
    const elements = scope.querySelectorAll('.whitespace-pre-wrap, .standard-markdown, [data-test-id="chat-query"], [data-test-id="chat-message"]');

    if (elements.length === 0) {
        console.warn("⚠️ Nuclear selector failed. Is the chat empty?");
        return history;
    }


    // Sort elements by their position in the DOM to ensure correct order
    const sortedElements = Array.from(elements).sort((a, b) => {
        return (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING) ? -1 : 1;
    });

    let attachmentIndex = 0;

    // Track attempted elements AND filenames across the entire chat to prevent duplicates
    const processedPhase1Els = new Set();
    const processedPhase1Names = new Set();
    const processedPhase1ImageSrcs = new Set();

    for (const [index, el] of sortedElements.entries()) {
        // PRIORITIZE our saved attribute
        const text = (el.getAttribute('data-capsule-text') || el.textContent).trim();
        if (!text || text === "Copy" || text === "Edit") continue;
        if (el.closest('button')) continue; // skip attachment card chips — their text is not a message
        if (el.tagName === 'CODE') continue; // skip inline code spans — they carry whitespace-pre-wrap but are not messages

        // Check for duplicates (common if multiple selectors match the same thing)
        if (history.length > 0 && history[history.length - 1].text === text) continue;

        let role = 'model';

        // Find the message container (parent of the text bubble usually)
        // Heuristic: Go up until we hit a semantic container or too far
        let messageContainer = el.closest('.font-claude-message, .font-user-message');

        if (!messageContainer) {
            // AGGRESSIVE FALLBACK: Look for potential row containers higher up
            let current = el;
            for (let i = 0; i < 7; i++) {
                if (current.parentElement) {
                    current = current.parentElement;
                    const isRow = current.classList.contains('grid') || current.classList.contains('flex') ||
                        current.getAttribute('data-test-id') || current.className.includes('message');
                    if (isRow) {
                        messageContainer = current;
                        if (current.clientWidth > 400) break;
                    }
                }
            }
            if (!messageContainer) messageContainer = el.parentElement;
        }

        // Improved Role Detection
        if (messageContainer) {
            if (
                messageContainer.classList.contains('font-user-message') ||
                messageContainer.querySelector('.font-user-message') ||
                el.getAttribute('data-test-id') === 'chat-query' ||
                messageContainer.innerText.includes('User') // Weak heuristic but sometimes works
            ) {
                role = 'user';
            } else {
                // Check if it's explicitly user by looking for non-claude attributes
                // Often user messages have a different background color context
                const computedStyle = window.getComputedStyle(messageContainer);
                if (computedStyle.backgroundColor !== 'rgba(0, 0, 0, 0)' && computedStyle.backgroundColor !== 'transparent') {
                    // User messages often have a background, Claude's often don't (they just sit there)
                    // But this is varying. 
                    // Let's rely on 'font-user-message' class existence in ancestry
                    if (el.closest('.font-user-message')) role = 'user';
                }
            }
        }

        if (history.length > 0 && history[history.length - 1].text === text) continue;

        const attachments = [];

        if (includeAttachments && messageContainer) {
            // ROBUST: Search parent, siblings, and the message container itself
            const scopes = [messageContainer, messageContainer.parentElement, messageContainer.previousElementSibling, messageContainer.nextElementSibling].filter(Boolean);

            for (const scope of scopes) {
                // --- Part 1: Direct Image Extraction (Raw images in message) ---
                const rawImages = Array.from(scope.querySelectorAll('img')).filter(img => {
                    if (attachments.some(a => a._el === img)) return false;
                    if (processedPhase1Els.has(img)) return false;

                    const src = img.src || "";
                    if (src && processedPhase1ImageSrcs.has(src)) return false;

                    const alt = (img.alt || "").toLowerCase();
                    const isAvatar = alt.includes("avatar") || src.includes("avatar") || src.includes("profile") || img.closest('button[aria-label*="Copy"], [data-testid*="avatar"]');
                    const width = img.naturalWidth || parseInt(img.getAttribute("width") || "0", 10) || 0;
                    const height = img.naturalHeight || parseInt(img.getAttribute("height") || "0", 10) || 0;
                    const isTiny = (width && width < 40) || (height && height < 40);

                    // Skip if thumbnail for a PDF/Doc (usually has .pdf in alt or specific container)
                    const isDocThumbnail = alt.endsWith('.pdf') || alt.includes('.pdf') || img.closest('button')?.querySelector('h3') || img.closest('a[href*="document_pdf"]');

                    // Skip images from our own extension UI
                    const isExtensionLogo = img.classList.contains('tilantra-capsule-logo-btn') ||
                        img.closest('.tilantra-capsule-button-container') ||
                        img.closest('.tilantra-capsule-menu') ||
                        src.includes('capsule.png');

                    return !isAvatar && !isTiny && !isDocThumbnail && !isExtensionLogo;
                });

                for (const img of rawImages) {
                    attachmentIndex++;
                    try {
                        const result = await mmFetchBlobAsBase64(img.src);
                        if (result.data) {
                            // Try to find a better filename
                            let imgName = `image_${history.length}_${attachments.length}.png`;
                            const alt = (img.alt || "").trim();
                            if (alt && alt.match(/\.(png|jpg|jpeg|gif|webp)$/i)) {
                                imgName = alt;
                            } else {
                                const dataTestId = img.getAttribute('data-testid');
                                if (dataTestId && dataTestId.match(/\.(png|jpg|jpeg|gif|webp)$/i)) {
                                    imgName = dataTestId;
                                }
                            }

                            attachments.push({
                                type: 'image',
                                filename: imgName,
                                mime: result.mime || 'image/png',
                                base64: result.data,
                                _el: img
                            });

                            processedPhase1Els.add(img);
                            if (img.src) processedPhase1ImageSrcs.add(img.src);
                            processedPhase1Names.add(imgName.toLowerCase());
                        }
                    } catch (e) {
                        console.error("Claude direct image fail:", e);
                    }
                }

                // --- Part 2: Click-and-Extract (Documents like PDF, CSV, etc.) ---
                // Collect all potential file cards from all scopes into a unique array
                const INLINE_TAGS = new Set(['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN', 'A', 'LI', 'TD', 'CODE', 'PRE', 'BLOCKQUOTE', 'EM', 'STRONG', 'LABEL']);
                const allDocElementsSet = new Set();

                for (const scope of scopes) {
                    const docElementsRaw = Array.from(scope.querySelectorAll('*')).filter(el => {
                        // Skip if this card contains an image that was already captured in Part 1
                        if (Array.from(el.querySelectorAll('img')).some(img => img.src && processedPhase1ImageSrcs.has(img.src))) return false;
                        // Skip inline text elements — they're message content, not file cards
                        if (INLINE_TAGS.has(el.tagName)) return false;
                        // Skip structural containers (too many children = layout wrapper)
                        if (el.children.length > 6) return false;
                        // Must be visible and rendered
                        if (el.clientWidth === 0 && el.clientHeight === 0) return false;

                        const bText = (el.innerText || el.textContent || '').trim().toLowerCase();
                        // File cards have short text (filename + type badge + date ≈ < 100 chars)
                        if (!bText || bText.length > 100) return false;

                        // STRATEGY: Exclude common message text containers to prevent false positives
                        if (el.classList.contains('whitespace-pre-wrap') || el.classList.contains('standard-markdown')) return false;
                        if (el.closest('.whitespace-pre-wrap, .standard-markdown')) return false;

                        // Improved detection: Check for data-testid with extension OR img alt with extension
                        const dataTestId = (el.getAttribute('data-testid') || '').toLowerCase();
                        const hasExtInTestId = dataTestId.match(/\.([a-z0-9]{1,6})(?![a-z0-9])/);

                        const isDocThumbnail = !!(el.querySelector('img') && (
                            (el.querySelector('img').alt || '').toLowerCase().includes('.pdf') ||
                            (el.querySelector('img').alt || '').toLowerCase().includes('thumbnail') ||
                            hasExtInTestId
                        ));
                        const extMatch = bText.match(/\.([a-z0-9]{1,6})(?![a-z0-9])/);
                        const hasExtension = !!(extMatch && EXTENSION_TO_MIME[extMatch[1]]) || !!hasExtInTestId;
                        const isArtifact = !!(dataTestId.includes('artifact') ||
                            (typeof el.className === 'string' && el.className.toLowerCase().includes('artifact')));
                        const hasDownloadBtn = !!el.querySelector('button[aria-label*="Download"], a[download], button h3');

                        // Only count as a card if it has visual markers or explicit card IDs
                        return isDocThumbnail || isArtifact || hasDownloadBtn || (hasExtension && el.clientWidth > 50 && el.clientHeight > 30);
                    });
                    docElementsRaw.forEach(el => allDocElementsSet.add(el));
                }

                // De-duplicate: nested ones
                const docElements = Array.from(allDocElementsSet).filter((el, _, arr) =>
                    !arr.some(other => other !== el && other.contains(el))
                );

                if (docElements.length > 0) {
                    for (let i = 0; i < docElements.length; i++) {
                        const el = docElements[i];

                        // Skip if detached or hidden (common if previous modal interactions changed the DOM)
                        if (!el.isConnected || el.offsetParent === null) {
                            console.warn(`[Capsule|Claude] Skipping card ${i + 1}: not visible or detached.`);
                            continue;
                        }

                        // Skip if this exact element OR its filename was already processed
                        if (processedPhase1Els.has(el)) continue;
                        processedPhase1Els.add(el);

                        // Extract the tentative filename now (before clicking) for name-based dedup
                        const tentativeH3 = el.querySelector('h3');
                        const tentativeImg = el.querySelector('img');
                        const tentativeName = (tentativeH3 ? tentativeH3.textContent.trim() : (tentativeImg?.alt || el.textContent || '').trim())
                            .replace(/\s+thumbnail$/, '').trim().toLowerCase();

                        if (tentativeName && processedPhase1Names.has(tentativeName)) continue;

                        await mmWait(600); // Reduced pulse delay
                        attachmentIndex++;

                        try {
                            const h3 = el.querySelector('h3');
                            const img = el.querySelector('img');
                            let initialName = h3 ? h3.textContent.trim() : (img?.alt || "").trim();
                            if (!initialName) {
                                const textLines = (el.innerText || el.textContent || '').split('\n').map(l => l.trim()).filter(Boolean);
                                initialName = textLines[0] || `file_${attachmentIndex}`;
                            }
                            // Clean up: strip "thumbnail" and trailing "Download"
                            initialName = initialName.replace(/\s+thumbnail$/, '').replace(/Download$/i, '').trim();

                            const isTentativePDF = tentativeName.endsWith('.pdf') || (el.textContent || '').toLowerCase().includes('pdf');

                            // UNIFIED PARALLEL FLOW FOR CLAUDE (Phase 1)
                            let finalFilename = initialName;
                            const isActuallyPDF = finalFilename.toLowerCase().endsWith('.pdf') || isTentativePDF;

                            const fileData = await new Promise((resolve) => {
                                let resolved = false;
                                let fallbackInterval = null;

                                const cleanAndResolve = (result) => {
                                    if (resolved) return;
                                    resolved = true;
                                    window.dispatchEvent(new CustomEvent('CAPSULE_STOP_PDF_CAPTURE'));
                                    window.removeEventListener('CAPSULE_PDF_URL', urlHandler);
                                    window.removeEventListener('CAPSULE_PDF_DATA', dataHandler);
                                    if (fallbackInterval) clearInterval(fallbackInterval);
                                    clearTimeout(overallTimeout);
                                    chrome.runtime.sendMessage({ action: "cancelExpectDownload" });
                                    resolve(result);
                                };

                                const dataHandler = (event) => {
                                    if (resolved) return;
                                    const { base64, mime } = event.detail || {};
                                    if (mime && mime.includes('json')) return;
                                    if (base64) cleanAndResolve({ data: base64, mime });
                                };

                                const urlHandler = async (event) => {
                                    if (resolved) return;
                                    const url = event.detail?.url;
                                    if (url) {
                                        try {
                                            const bgRes = await chrome.runtime.sendMessage({ type: "downloadAttachment", payload: { url } });
                                            if (bgRes && bgRes.success && bgRes.base64) {
                                                cleanAndResolve({ data: bgRes.base64, mime: bgRes.mime });
                                            }
                                        } catch (e) {}
                                    }
                                };

                                window.addEventListener('CAPSULE_PDF_DATA', dataHandler);
                                window.addEventListener('CAPSULE_PDF_URL', urlHandler);
                                window.dispatchEvent(new CustomEvent('CAPSULE_START_PDF_CAPTURE'));

                                let dlPromise = new Promise((resolveDl) => {
                                    chrome.runtime.sendMessage({ action: "expectDownload" }, (bgRes) => resolveDl(bgRes || null));
                                });

                                dlPromise.then((dlResult) => {
                                    if (resolved) return;
                                    if (dlResult?.success) {
                                        let finalBase64 = null;
                                        let finalMime = mimeFromFilename(finalFilename, 'application/octet-stream');
                                        if (dlResult.base64) {
                                            finalBase64 = dlResult.base64;
                                            finalMime = dlResult.mime || finalMime;
                                            if (dlResult.filename) finalFilename = dlResult.filename;
                                        } else if (dlResult.type === 'blob_url' && dlResult.url) {
                                            fetch(dlResult.url).then(r => r.ok ? r.blob() : null).then(blob => blob ? mmBlobToBase64(blob).then(b64 => {
                                                finalBase64 = b64;
                                                finalMime = blob.type || dlResult.mime || finalMime;
                                            }) : null).catch(() => {}).finally(() => {
                                                if (finalBase64) cleanAndResolve({ data: finalBase64, mime: finalMime });
                                            });
                                            return;
                                        }
                                        if (finalBase64) cleanAndResolve({ data: finalBase64, mime: finalMime });
                                    }
                                });

                                // CLICK to open preview modal or trigger instant download
                                const clickTarget = el.querySelector('button, img') || el;
                                if (isTentativePDF) {
                                    mmAggressiveClick(clickTarget);
                                } else {
                                    el.click();
                                }

                                // Continuous fallback poller: watch for modal, canvas, and inner download buttons
                                fallbackInterval = setInterval(async () => {
                                    if (resolved) return;
                                    const modal = document.querySelector('div[role="dialog"]');
                                    const modalOrBody = modal || document.body;

                                    // Extract real filename if modal opened
                                    const modalTitle = modalOrBody.querySelector('h2, h1, [data-testid*="title"], header')?.textContent?.trim();
                                    if (modalTitle && modalTitle.includes('.')) {
                                        finalFilename = modalTitle;
                                    }

                                    // Check for direct anchor download
                                    const dl = modalOrBody.querySelector('a[download], a[href*="/api/"][href*="/download"], a[href*="document_pdf"]');
                                    if (dl && dl.href && !dl.dataset.capsuleClicked) {
                                        dl.dataset.capsuleClicked = 'true';
                                        const res = await mmFetchBlobAsBase64(dl.href);
                                        if (res && res.data && res.data.length > 100) {
                                            cleanAndResolve({ data: res.data, mime: res.mime });
                                            return;
                                        }
                                    }

                                    // Check for Download button
                                    const allModalButtons = Array.from(modalOrBody.querySelectorAll('button, a'));
                                    const downloadBtn = allModalButtons.find(btn => {
                                        const label = (btn.textContent || btn.getAttribute('aria-label') || '').toLowerCase().trim();
                                        return label.includes('download');
                                    });
                                    if (downloadBtn && !downloadBtn.dataset.capsuleClicked) {
                                        downloadBtn.dataset.capsuleClicked = 'true';
                                        mmAggressiveClick(downloadBtn);
                                        // Wait a moment, check for follow-up dialogs
                                        setTimeout(() => {
                                            const followUpDialog = document.querySelector('div[role="dialog"]:not([data-capsule-scanned])');
                                            if (followUpDialog) {
                                                followUpDialog.dataset.capsuleScanned = 'true';
                                                const followUpDlBtn = Array.from(followUpDialog.querySelectorAll('button, a')).find(b => (b.textContent || b.getAttribute('aria-label') || '').toLowerCase().includes('download'));
                                                if (followUpDlBtn) mmAggressiveClick(followUpDlBtn);
                                            }
                                        }, 2000);
                                    }

                                    // Canvas Fallback for PDFs
                                    if (isActuallyPDF) {
                                        const canvases = modalOrBody.querySelectorAll('.react-pdf__Page__canvas, canvas');
                                        if (canvases.length > 0 && !modalOrBody.dataset.capsuleCanvasStitched) {
                                            modalOrBody.dataset.capsuleCanvasStitched = 'true';
                                            setTimeout(async () => {
                                                if (resolved) return;
                                                const stitchedBase64 = await canvasesToPdfBase64(modalOrBody);
                                                if (stitchedBase64) cleanAndResolve({ data: stitchedBase64, mime: 'application/pdf' });
                                            }, 800);
                                        }
                                    }

                                    // Text fallback
                                    const isTextExt = finalFilename.match(/\.(txt|md|csv|json|js|py|html|css|xml|yaml|yml|tex)$/i);
                                    if (!isActuallyPDF && isTextExt) {
                                        const contentDiv = modalOrBody.querySelector('.font-mono.whitespace-pre-wrap') || modalOrBody.querySelector('.font-mono') || modalOrBody.querySelector('pre') || modalOrBody.querySelector('code') || modalOrBody.querySelector('[class*="code"]') || modalOrBody.querySelector('[class*="text-viewer"]');
                                        const text = contentDiv?.innerText?.trim();
                                        if (text && text.length > 10) {
                                            const base64 = btoa(unescape(encodeURIComponent(text)));
                                            cleanAndResolve({ data: base64, mime: mimeFromFilename(finalFilename, 'text/plain') });
                                            return;
                                        }
                                    }
                                }, 300);

                                const overallTimeout = setTimeout(() => {
                                    console.warn(`[Capsule|Claude] Extraction timed out for ${finalFilename}.`);
                                    cleanAndResolve(null);
                                }, 15000);
                            });

                            let fileBase64 = null;
                            let resolvedMime = null;
                            if (fileData && fileData.data) {
                                fileBase64 = fileData.data;
                                resolvedMime = fileData.mime;
                            }

                            // CLOSE MODAL
                            const modalForClose = document.querySelector('div[role="dialog"]');
                            const modalOrBodyForClose = modalForClose || document.body;
                            const closeBtn = modalOrBodyForClose.querySelector('button[aria-label="Close"], button[aria-label*="close"]');
                            if (closeBtn) closeBtn.click();
                            else document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));

                            await mmWait(600); // Reduced settle time

                            if (fileBase64) {
                                // ENSURE FILENAME HAS EXTENSION (Backend requires it for some types)
                                if (!finalFilename.includes('.')) {
                                    let ext = 'txt';
                                    const m = (resolvedMime || '').toLowerCase();
                                    const uiText = el.innerText.toLowerCase();

                                    if (m.includes('text/plain') || m.includes('text/markdown')) ext = 'txt';
                                    else if (m.includes('presentation') || m.includes('powerpoint') || m.includes('pptx') || uiText.includes('pptx') || uiText.includes('presentation')) ext = 'pptx';
                                    else if (m.includes('spreadsheet') || m.includes('excel') || m.includes('xlsx') || uiText.includes('xlsx') || uiText.includes('spreadsheet')) ext = 'xlsx';
                                    else if (m.includes('word') || m.includes('docx') || uiText.includes('docx') || uiText.includes('word document')) ext = 'docx';
                                    else if (m.includes('pdf') || uiText.includes('pdf')) ext = 'pdf';
                                    else if (m.includes('javascript') || m.includes('/js')) ext = 'js';
                                    else if (m.includes('typescript') || m.includes('/ts')) ext = 'ts';
                                    else if (m.includes('python')) ext = 'py';
                                    else if (m.includes('html')) ext = 'html';
                                    else if (m.includes('css')) ext = 'css';
                                    else if (m.includes('json') || uiText.includes('json')) ext = 'json';
                                    else if (m.includes('csv') || uiText.includes('csv')) ext = 'csv';
                                    else if (m.includes('xml') || uiText.includes('xml')) ext = 'xml';
                                    else if (m.includes('yaml') || m.includes('yml') || uiText.includes('yaml')) ext = 'yaml';
                                    else if (m.includes('image/')) ext = m.split('/')[1] || 'png';

                                    finalFilename += `.${ext}`;
                                    if (ext === 'txt') resolvedMime = 'text/plain';
                                }

                                // GLOBAL NORMALIZATION: Ensure .tex files always use text/plain
                                if (finalFilename.toLowerCase().endsWith('.tex')) {
                                    resolvedMime = 'text/plain';
                                }

                                const isPDF = finalFilename.toLowerCase().endsWith('.pdf');
                                attachments.push({
                                    type: isPDF ? 'pdf' : (isImageMime(resolvedMime) ? 'image' : 'file'),
                                    filename: finalFilename.trim(),
                                    mime: isPDF ? 'application/pdf' : (resolvedMime || 'application/octet-stream'),
                                    base64: fileBase64,
                                    _el: el
                                });

                                // SUCCESS: Mark as processed only now (with trimming)
                                if (finalFilename) processedPhase1Names.add(finalFilename.trim().toLowerCase());
                                if (tentativeName) processedPhase1Names.add(tentativeName.trim().toLowerCase());
                            }
                        } catch (e) {
                            console.error("Claude doc extraction fail:", e);
                            document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
                        }
                    }
                }
            }
        }

        // Cleanup internal markers
        attachments.forEach(a => delete a._el);

        history.push({ role, text, attachments });
    }
    // ── Phase 2: Global file attachment scan ──────────────────────────────
    // Claude renders uploaded file cards in a separate panel (right side of the UI),
    // completely outside the message container scopes searched above.
    // We scan the entire document once after the message loop, find all file cards
    // by content, and attach them to the last user message in history.
    if (includeAttachments) {
        const processedPhase2Els = new Set();
        const processedPhase2Names = new Set();

        // Collect all filenames already captured by Phase 1 (across all messages in history)
        // so Phase 2 doesn't add the same file a second time.
        const phase1CapturedNames = new Set();
        for (const msg of history) {
            for (const att of (msg.attachments || [])) {
                phase1CapturedNames.add((att.filename || '').toLowerCase());
            }
        }

        const P2_INLINE_TAGS = new Set(['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN', 'A', 'LI', 'TD', 'CODE', 'PRE', 'BLOCKQUOTE', 'EM', 'STRONG', 'LABEL']);

        const globalCardsRaw = Array.from(document.querySelectorAll('*')).filter(el => {
            if (P2_INLINE_TAGS.has(el.tagName)) return false; // Exclude inline text — message content
            if (el.children.length > 8) return false;
            if (el.clientWidth === 0 && el.clientHeight === 0) return false;
            const bText = (el.innerText || el.textContent || '').trim().toLowerCase();
            if (!bText || bText.length > 100) return false; // File cards are short (name+badge+date)

            // Improved detection: data-testid with extension
            const dataTestId = (el.getAttribute('data-testid') || '').toLowerCase();
            const hasExtInTestId = dataTestId.match(/\.([a-z0-9]{1,6})(?![a-z0-9])/);

            const extMatch = bText.match(/\.([a-z0-9]{1,6})(?![a-z0-9])/);
            const hasExtension = !!(extMatch && EXTENSION_TO_MIME[extMatch[1]]) || !!hasExtInTestId;
            const isArtifact = !!(dataTestId.includes('artifact') ||
                (typeof el.className === 'string' && el.className.toLowerCase().includes('artifact')));
            const hasPdfBadge = bText.includes('pdf') && bText.length < 25;
            return hasExtension || isArtifact || hasPdfBadge;
        });

        // De-duplicate: keep only outermost matching element per card
        const globalCards = globalCardsRaw.filter((el, _, arr) =>
            !arr.some(other => other !== el && other.contains(el))
        );

        for (const card of globalCards) {
            if (processedPhase2Els.has(card)) continue;
            processedPhase2Els.add(card);

            try {
                const rawText = (card.innerText || card.textContent || '').trim();

                // Skip conversation bubbles like "You said: ..."
                if (/^(you said|user)[:]/i.test(rawText)) continue;

                // Find the filename: search ALL lines for a known file extension,
                // not just the first line (e.g. "Share\nContent\nHCI.pptx" has filename on line 3)
                const allLines = rawText.split('\n').map(l => l.trim()).filter(Boolean);
                const filenameLine = allLines.find(l => l.toLowerCase().match(/\.([a-z0-9]{1,6})(?![a-z0-9])/));
                if (!filenameLine) continue;

                let cardFilename = filenameLine;
                let fileBase64 = null;
                let resolvedMime = mimeFromFilename(cardFilename, 'application/octet-stream');

                // Skip if already captured by Phase 1 or earlier in Phase 2
                const lowerName = cardFilename.toLowerCase();
                if (phase1CapturedNames.has(lowerName) || processedPhase2Names.has(lowerName)) {
                    continue;
                }

                // Check if this card contains an image we already captured in Phase 1
                const cardImages = Array.from(card.querySelectorAll('img'));
                if (cardImages.some(img => img.src && processedPhase1ImageSrcs.has(img.src))) {
                    continue;
                }

                // TIER 0: Check for a direct download button inside the card itself
                const p2directDlBtn = Array.from(card.querySelectorAll('button, a')).find(b => {
                    const label = (b.textContent || b.getAttribute('aria-label') || b.getAttribute('title') || '').toLowerCase();
                    return label.includes('download');
                });

                if (p2directDlBtn) {
                    const dlResult = await new Promise((resolveDl) => {
                        const dlTimeout = setTimeout(() => resolveDl(null), 10000);
                        chrome.runtime.sendMessage({ action: "expectDownload" }, (bgRes) => {
                            clearTimeout(dlTimeout);
                            resolveDl(bgRes || null);
                        });
                        setTimeout(() => p2directDlBtn.click(), 100);
                    });

                    if (dlResult?.success) {
                        // INTEGRITY CHECK: Reject empty/tiny captures
                        if (dlResult.base64 && dlResult.base64.length > 100) {
                            fileBase64 = dlResult.base64;
                            resolvedMime = dlResult.mime || resolvedMime;
                            if (dlResult.filename) cardFilename = dlResult.filename;
                        } else if (dlResult.type === 'blob_url' && dlResult.url) {
                            try {
                                const bf = await fetch(dlResult.url);
                                if (bf.ok) {
                                    const blob = await bf.blob();
                                    fileBase64 = await mmBlobToBase64(blob);
                                    resolvedMime = blob.type || resolvedMime;
                                }
                            } catch (e) { }
                        }
                    }
                }

                // Detect if this card IS already the open viewer panel
                // (Claude's artifact panel shows "Share" and "Content" tabs alongside the filename)
                const rawLower = rawText.toLowerCase();
                const isAlreadyOpenPanel = rawLower.includes('share') && rawLower.includes('content');

                let p2modal;
                if (fileBase64) {
                    // Already captured via direct download
                } else if (isAlreadyOpenPanel) {
                    // Card IS the viewer — use it directly, no click needed
                    p2modal = card;
                    // For the open panel, also search in its parent/ancestor so sibling
                    // content areas (like the text content pane for .txt files) are included.
                    const viewerAncestor = card.closest('[class*="artifact"], [class*="viewer"], [class*="panel"]') ||
                        card.parentElement || card;
                    p2modal = viewerAncestor;
                } else {
                    // Stage 1: Robust Card Clicking
                    const isP2PDF = cardFilename.toLowerCase().endsWith('.pdf') || rawText.toLowerCase().includes('pdf');
                    const p2ClickTarget = card.querySelector('button, img') || card;

                    // Watch for any new tab that opens as a result of this click
                    let p2TabResult = null;
                    const p2TabPromise = new Promise((res) =>
                        chrome.runtime.sendMessage({ action: 'watchClaudeTab' }, res)
                    );

                    if (isP2PDF) {
                        mmAggressiveClick(p2ClickTarget);
                        await mmWait(600);
                    } else {
                        card.click();
                        await mmWait(300);
                    }

                    p2TabResult = await p2TabPromise;
                    if (p2TabResult?.success && p2TabResult.url) {
                        const result = await mmFetchBlobAsBase64(p2TabResult.url);
                        if (result && result.data) {
                            fileBase64 = result.data;
                            resolvedMime = result.mime;
                        }
                    } else {
                        chrome.runtime.sendMessage({ action: 'stopClaudeTabWatch' });
                    }

                    // Check for dialog (PPTX "can't preview" popup) first, then artifact panel
                    p2modal = document.querySelector('div[role="dialog"]') ||
                        Array.from(document.querySelectorAll('[class*="artifact"], [data-testid*="artifact"], [class*="panel"], [class*="viewer"]'))
                            .find(el => (el.innerText || el.textContent || '').toLowerCase().includes(cardFilename.toLowerCase().split('.')[0]));
                }
                const p2modalOrBody = p2modal || document.body;

                // Stage 2: "cntr" Interaction (ONLY for PDFs, only if not already captured)
                const isFinalPDF = cardFilename.toLowerCase().endsWith('.pdf');
                if (isFinalPDF && !fileBase64) {
                    const p2cntr = p2modalOrBody.querySelector('img[alt*="thumbnail"], .react-pdf__Page, canvas');
                    if (p2cntr) {

                        // Watch for any new tab from the cntr click
                        let p2CntrTabResult = null;
                        const p2CntrTabPromise = new Promise((res) =>
                            chrome.runtime.sendMessage({ action: 'watchClaudeTab' }, res)
                        );

                        mmHover(p2cntr);
                        mmAggressiveClick(p2cntr);
                        await mmWait(600);

                        p2CntrTabResult = await p2CntrTabPromise;
                        if (p2CntrTabResult?.success && p2CntrTabResult.url) {
                            const result = await mmFetchBlobAsBase64(p2CntrTabResult.url);
                            if (result && result.data) {
                                fileBase64 = result.data;
                                resolvedMime = result.mime;
                            }
                        } else {
                            chrome.runtime.sendMessage({ action: 'stopClaudeTabWatch' });
                        }
                    }
                }

                const p2ModalTitle = p2modalOrBody.querySelector('h1, h2, header')?.textContent?.trim();
                if (p2ModalTitle && p2ModalTitle.match(/\.[a-z0-9]{1,6}$/i)) {
                    cardFilename = p2ModalTitle;
                    resolvedMime = mimeFromFilename(cardFilename, resolvedMime);
                }

                // Tier 1: Direct anchor fetch
                const p2dlAnchor = p2modalOrBody.querySelector('a[download], a[href*="/api/"][href*="/download"], a[href*="document_pdf"]');
                if (p2dlAnchor?.href) {
                    const res = await mmFetchBlobAsBase64(p2dlAnchor.href);
                    if (res?.data) { fileBase64 = res.data; resolvedMime = mimeFromFilename(cardFilename, res.mime); }
                }

                const isPDFCard = cardFilename.toLowerCase().endsWith('.pdf');

                // Tier 2: Download button intercept (Prioritized)
                if (!fileBase64) {
                    const filenameBaseLower = cardFilename.toLowerCase().replace(/\.[^.]+$/, '').substring(0, 15);
                    const p2dlBtn = Array.from(p2modalOrBody.querySelectorAll('button, a, [role="button"]')).find(b => {
                        const label = [
                            b.textContent,
                            b.getAttribute('aria-label'),
                            b.getAttribute('title')
                        ].filter(Boolean).join(' ').toLowerCase();
                        return label.includes('download') || (filenameBaseLower.length > 4 && label.includes(filenameBaseLower));
                    });
                    if (p2dlBtn) {
                        const dlResult = await new Promise(res2 => {
                            const t = setTimeout(() => res2(null), 8000);
                            chrome.runtime.sendMessage({ action: 'expectDownload' }, bgRes => {
                                clearTimeout(t);
                                res2(bgRes || null);
                            });
                            // Step 1: Click button
                            setTimeout(() => {
                                const p2BtnTarget = p2dlBtn.getAttribute('target');
                                if (p2BtnTarget === '_blank') p2dlBtn.setAttribute('target', '_self');

                                mmAggressiveClick(p2dlBtn);

                                if (p2BtnTarget === '_blank') {
                                    setTimeout(() => p2dlBtn.setAttribute('target', '_blank'), 2000);
                                }

                                // Step 2: After 2s, check for dialog
                                setTimeout(() => {
                                    const p2followUpDialog = document.querySelector('div[role="dialog"]');
                                    if (p2followUpDialog) {
                                        const p2followUpDlBtn = Array.from(p2followUpDialog.querySelectorAll('button, a')).find(b =>
                                            (b.textContent || b.getAttribute('aria-label') || b.getAttribute('title') || '').toLowerCase().includes('download')
                                        );
                                        if (p2followUpDlBtn) mmAggressiveClick(p2followUpDlBtn);
                                    }
                                }, 2000);
                            }, 150);
                        });
                        if (dlResult?.success) {
                            if (dlResult.base64) {
                                fileBase64 = dlResult.base64;
                                resolvedMime = dlResult.mime || resolvedMime;
                                if (dlResult.filename) cardFilename = dlResult.filename;
                            } else if (dlResult.type === 'blob_url' && dlResult.url) {
                                try {
                                    const bf = await fetch(dlResult.url);
                                    if (bf.ok) {
                                        const blob = await bf.blob();
                                        fileBase64 = await mmBlobToBase64(blob);
                                        resolvedMime = blob.type || resolvedMime;
                                    }
                                } catch (_) { }
                            }
                        }
                    }
                }

                // Tier 3: Canvas Stitching (Fallback)
                if (!fileBase64 && isPDFCard) {
                    const canvases = p2modalOrBody.querySelectorAll('.react-pdf__Page__canvas, canvas');
                    if (canvases.length > 0) {
                        await mmWait(800); // Reduced wait
                        const stitchedBase64 = await canvasesToPdfBase64(p2modalOrBody);
                        if (stitchedBase64) {
                            fileBase64 = stitchedBase64;
                            resolvedMime = 'application/pdf';
                        }
                    }
                }

                // Tier 4: Text content extraction (formerly Tier 3)
                // Text files in Claude are rendered inline — no download button, but content is visible.
                // We read the pre/code/font-mono area directly and encode as base64 text.
                const isP2TextExt = cardFilename.match(/\.(txt|md|csv|json|js|py|html|css|xml|yaml|yml|tex)$/i);
                if (!fileBase64 && isP2TextExt) {
                    const p3contentEl = p2modalOrBody.querySelector(
                        '.font-mono.whitespace-pre-wrap, .font-mono, pre, code, ' +
                        '[class*="code-block"], [class*="content-area"], [class*="file-content"]'
                    );
                    const p3text = p3contentEl?.innerText?.trim();
                    if (p3text && p3text.length > 10) {
                        fileBase64 = btoa(unescape(encodeURIComponent(p3text)));
                        resolvedMime = mimeFromFilename(cardFilename, 'text/plain');
                    }
                }

                // Close modal
                const p2closeBtn = p2modalOrBody.querySelector('button[aria-label="Close"], button[aria-label*="close"]');
                if (p2closeBtn) p2closeBtn.click();
                else document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
                await mmWait(300); // Reduced wait

                if (fileBase64) {
                    // ENSURE FILENAME HAS EXTENSION (Backend requires it for some types)
                    if (!cardFilename.includes('.')) {
                        let ext = 'txt';
                        const m = (resolvedMime || '').toLowerCase();
                        const uiText = card.innerText.toLowerCase();

                        if (m.includes('text/plain') || m.includes('text/markdown')) ext = 'txt';
                        else if (m.includes('presentation') || m.includes('powerpoint') || m.includes('pptx') || uiText.includes('pptx') || uiText.includes('presentation')) ext = 'pptx';
                        else if (m.includes('spreadsheet') || m.includes('excel') || m.includes('xlsx') || uiText.includes('xlsx') || uiText.includes('spreadsheet')) ext = 'xlsx';
                        else if (m.includes('word') || m.includes('docx') || uiText.includes('docx') || uiText.includes('word document')) ext = 'docx';
                        else if (m.includes('pdf') || uiText.includes('pdf')) ext = 'pdf';
                        else if (m.includes('javascript') || m.includes('/js')) ext = 'js';
                        else if (m.includes('typescript') || m.includes('/ts')) ext = 'ts';
                        else if (m.includes('python')) ext = 'py';
                        else if (m.includes('html')) ext = 'html';
                        else if (m.includes('css')) ext = 'css';
                        else if (m.includes('json') || uiText.includes('json')) ext = 'json';
                        else if (m.includes('csv') || uiText.includes('csv')) ext = 'csv';
                        else if (m.includes('xml') || uiText.includes('xml')) ext = 'xml';
                        else if (m.includes('yaml') || m.includes('yml') || uiText.includes('yaml')) ext = 'yaml';
                        else if (m.includes('image/')) ext = m.split('/')[1] || 'png';

                        cardFilename += `.${ext}`;
                        if (ext === 'txt') resolvedMime = 'text/plain';
                    }

                    // GLOBAL NORMALIZATION: Ensure .tex files always use text/plain
                    if (cardFilename.toLowerCase().endsWith('.tex')) {
                        resolvedMime = 'text/plain';
                    }

                    const isPDF = cardFilename.toLowerCase().endsWith('.pdf');
                    const p2attachment = {
                        type: isPDF ? 'pdf' : (isImageMime(resolvedMime) ? 'image' : 'file'),
                        filename: cardFilename.trim(),
                        mime: isPDF ? 'application/pdf' : (resolvedMime || 'application/octet-stream'),
                        base64: fileBase64
                    };
                    const lastUser = [...history].reverse().find(m => m.role === 'user');
                    if (lastUser) {
                        lastUser.attachments = lastUser.attachments || [];
                        lastUser.attachments.push(p2attachment);
                        processedPhase2Names.add(cardFilename.trim().toLowerCase());
                    } else {
                        history.push({ role: 'user', text: `[File: ${cardFilename}]`, attachments: [p2attachment] });
                    }
                }

                await mmWait(400); // Reduced settle
            } catch (e) {
                console.error('[Capsule|Claude] Phase 2 card extraction failed:', e);
                document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
            }
        }
    }
    // ── End Phase 2 ───────────────────────────────────────────────────────

    return history;
}

/* ===== PERPLEXITY UTILS ===== */
function waitForMessagesFromPerplexity(timeout = 15000) {
    return new Promise((resolve, reject) => {
        const start = Date.now();
        const interval = setInterval(() => {
            // Perplexity: user query is in h1 with group/query, wrapper has group/title; match either
            const msgs = document.querySelectorAll('[class*="group/query"], [class*="group/title"], .whitespace-pre-line');
            if (msgs.length > 0) {
                clearInterval(interval);
                resolve(msgs);
            }
            if (Date.now() - start > timeout) {
                clearInterval(interval);
                reject("Timed out waiting for messages");
            }
        }, 500);
    });
}

async function getMessagesFromPerplexity() {
    const history = [];
    const globalAttachments = [];
    let attachmentIndex = 0;
    const processedNames = new Set(); // Prevent duplicate attachment clicks

    const isAttachmentPill = (pill) => {
        const text = (pill.textContent || "").toLowerCase().trim();
        if (text.match(/\d+\s+attachments/) || text.match(/^\+\d+$/) || text.match(/\+\s*\d+$/) || text.match(/\d+\s+sources/)) return false;

        const aria = (pill.getAttribute('aria-label') || "").toLowerCase();
        const html = pill.innerHTML || "";
        const isDoc = text.includes('.pdf') || aria.includes('pdf') || html.includes('pplx-icon-pdf') || html.includes('fa-file-pdf');
        const isImg = text.includes('.png') || text.includes('.jpg') || pill.querySelector('img.object-cover') || html.includes('pplx-icon-image') || html.includes('pplx-icon-photo');
        const hasExtension = text.match(/\.(pdf|png|jpg|jpeg|webp|gif|pptx)$/i);

        return isDoc || isImg || hasExtension;
    };

    async function processPill(pill) {
        if (!pill) return;

        try {
            const filenameEl = pill.querySelector('.truncate, .line-clamp-1, [class*="line-clamp"]') || pill;
            let givenName = filenameEl.textContent.trim();

            if (!givenName || !givenName.includes('.')) {
                const allText = pill.innerText || pill.textContent || "";

                // Clean any trailing '+1' from the inner text before matching
                const cleanText = allText.replace(/\+\s*\d+$/, '').trim();

                const match = cleanText.match(/([a-zA-Z0-9_.-]+\.(pdf|png|jpg|jpeg|gif))/i);
                if (match) givenName = match[1];
            }
            if (!givenName) {
                attachmentIndex++;
                givenName = `attachment_${attachmentIndex}`;
            }

            if (processedNames.has(givenName)) {
                return;
            }
            processedNames.add(givenName);


            const isPDF = givenName.toLowerCase().endsWith('.pdf') || pill.innerHTML.includes('pplx-icon-pdf') || pill.innerHTML.includes('fa-file-pdf');

            pill.click();

            // Dynamic wait for modal to open and content to render
            let modal = null;
            for (let attempt = 0; attempt < 10; attempt++) {
                modal = document.querySelector('div[role="dialog"]');
                if (modal) break;
                await mmWait(500);
            }
            if (!modal) modal = document.body;

            if (isPDF) {
                for (let attempt = 0; attempt < 25; attempt++) { // Up to 12.5 seconds for heavy PDFs
                    const viewer = modal.querySelector('#pdfViewer') || modal.querySelector('.react-pdf__Page__canvas');
                    const s3Link = modal.querySelector('a[href*="s3.amazonaws"]');
                    if (viewer || s3Link) {
                        await mmWait(1500); // Small buffer after detecting
                        break;
                    }
                    await mmWait(500);
                }
            } else {
                await mmWait(1500);
            }

            // re-query modal in case it changed
            modal = document.querySelector('div[role="dialog"]') || document.body;
            let capturedBase64 = null;
            let capturedMime = null;

            const dlLinks = Array.from(modal.querySelectorAll('a')).filter(a => {
                const href = a.href || "";
                return href.includes('s3.amazonaws') || href.includes('download') || a.textContent.toLowerCase().includes('download');
            });

            // If it's a PDF, Perplexity renders it as images inside #pdfViewer
            // E.g. <img src="blob:https://www.perplexity.ai/..." alt="Page 1">
            if (isPDF) {
                const pdfViewer = modal.querySelector('#pdfViewer');
                if (pdfViewer) {
                    // Try to scroll down to force lazy-loading of all pages
                    const pages = pdfViewer.querySelectorAll('.pdf-page, [data-page]');
                    for (const page of pages) {
                        page.scrollIntoView({ behavior: 'instant', block: 'center' });
                        await mmWait(400); // Give it a moment to load the image
                    }

                    // Scroll back to top just in case
                    pdfViewer.scrollTo(0, 0);
                    await mmWait(1000); // Wait for final rendering

                    // Grab all the blobs
                    const pageImgs = Array.from(pdfViewer.querySelectorAll('img[src^="blob:"]'));
                    if (pageImgs.length > 0) {
                        try {
                            const jsPDFClass = (window.jspdf && window.jspdf.jsPDF) || window.jsPDF;
                            if (jsPDFClass) {
                                const pdf = new jsPDFClass({ orientation: 'portrait', unit: 'pt', format: 'a4' });
                                let addedPage = false;

                                for (let idx = 0; idx < pageImgs.length; idx++) {
                                    const img = pageImgs[idx];
                                    const res = await mmFetchBlobAsBase64(img.src);
                                    if (res && res.data) {
                                        const imgData = res.data.startsWith('data:')
                                            ? res.data
                                            : `data:${res.mime || 'image/png'};base64,${res.data}`;

                                        // Wait for image dimensions
                                        const tempImg = new Image();
                                        tempImg.src = imgData;
                                        await new Promise(r => tempImg.onload = r);

                                        const pageWidth = pdf.internal.pageSize.getWidth();
                                        const pageHeight = (tempImg.height * pageWidth) / tempImg.width;

                                        if (addedPage) pdf.addPage();
                                        // Use generic image format for addImage
                                        pdf.addImage(imgData, 'JPEG', 0, 0, pageWidth, pageHeight);
                                        addedPage = true;
                                    }
                                }

                                if (addedPage) {
                                    const dataUri = pdf.output('datauristring');
                                    capturedBase64 = dataUri.split(',')[1];
                                    capturedMime = 'application/pdf';
                                }
                            }
                        } catch (e) {
                            console.warn("Failed to stitch pdf blob images:", e);
                        }
                    } else {
                        // Sometimes it's canvases
                        const canvases = pdfViewer.querySelectorAll('canvas');
                        if (canvases.length > 0) {
                            capturedBase64 = await canvasesToPdfBase64();
                            if (capturedBase64) capturedMime = 'application/pdf';
                        }
                    }
                }
            }

            // Always prioritize the direct S3 download link if available (it often is for both PDFs and images)
            // In the provided DOM, images have <a target="_blank" href="https://ppl-ai-file-upload.s3.amazonaws...
            let primaryDownloadLink = null;



            if (dlLinks.length > 0) primaryDownloadLink = dlLinks[0].href;

            // For PDFs, there's often a specific download button with aria-label="Download PDF" which might not be an <a> tag
            const dlBtn = Array.from(modal.querySelectorAll('button')).find(b => {
                const aria = (b.getAttribute('aria-label') || "").toLowerCase();
                return aria.includes('download pdf');
            });

            // If it's a button, it might just trigger a browser download instead of an S3 link.
            // But usually the S3 link is somewhere on the page for both.

            if (primaryDownloadLink) {
                try {
                    const res = await mmFetchBlobAsBase64(primaryDownloadLink);
                    if (res && res.data) {
                        capturedBase64 = res.data;
                        capturedMime = res.mime || (isPDF ? 'application/pdf' : 'image/png');
                    }
                } catch (e) { console.warn("Failed to fetch from modal link:", e); }
            }

            if (!capturedBase64) {
                if (isPDF) {
                    const hasCanvas = modal.querySelector('.react-pdf__Page__canvas, canvas');
                    if (hasCanvas) {
                        await mmWait(1500);
                        capturedBase64 = await canvasesToPdfBase64(modal);
                        capturedMime = 'application/pdf';
                    }
                } else {
                    const mainImg = modal.querySelector('img:not([alt*="avatar"])');
                    if (mainImg && mainImg.src) {
                        const res = await mmFetchBlobAsBase64(mainImg.src);
                        if (res && res.data) {
                            capturedBase64 = res.data;
                            capturedMime = res.mime || 'image/png';
                        }
                    }
                }
            }

            if (capturedBase64) {
                globalAttachments.push({
                    type: isPDF ? 'pdf' : 'image',
                    filename: givenName || (isPDF ? 'document.pdf' : 'image.png'),
                    mime: capturedMime || (isPDF ? 'application/pdf' : 'image/png'),
                    base64: capturedBase64
                });
            } else {
                console.warn(`[Capsule] Failed to extract pill base64 from modal`);
            }

            const closeBtn = modal.querySelector('button[aria-label="Close"], button[title="Close"]');
            if (closeBtn) {
                closeBtn.click();
            } else {
                document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
            }
            await mmWait(500); // Wait for modal out animation

        } catch (e) {
            console.error("Perplexity pill extraction fail:", e);
            document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        }
    }

    // Helper: extract attachments from the sources/attachments sidebar
    async function extractFromSidebar(targetAttachmentsArray) {
        let sidebar = null;
        for (let attempt = 0; attempt < 12; attempt++) {
            sidebar = document.querySelector('[class*="search-side-content"]');
            if (sidebar) break;
            await mmWait(500);
        }
        if (!sidebar) {
            console.warn('[Capsule] Sources/attachments sidebar failed to open.');
            return;
        }

        const links = Array.from(sidebar.querySelectorAll('a[href*="s3.amazonaws"], a[href*="ppl-ai-file-upload"]'));
        const seenHrefs = new Set();

        for (const link of links) {
            const href = link.href;
            if (!href || seenHrefs.has(href)) continue;
            seenHrefs.add(href);

            // Extract filename: prefer .font-medium, then .line-clamp-2, then URL decode
            let filename = '';
            const nameEl = link.querySelector('.font-medium, .line-clamp-2, [class*="font-medium"]');
            if (nameEl) filename = nameEl.textContent.trim();
            if (!filename) {
                // Fall back to URL-decoded filename from the S3 key
                try {
                    const urlPath = new URL(href).pathname;
                    filename = decodeURIComponent(urlPath.split('/').pop()) || 'attachment';
                } catch (_) { filename = 'attachment'; }
            }

            // Infer MIME and type from extension
            const resolvedMime = mimeFromFilename(filename, null);
            const fileType = isPdfMime(resolvedMime) ? 'pdf' : (isImageMime(resolvedMime) ? 'image' : 'file');

            if (processedNames.has(filename)) {
                continue;
            }
            processedNames.add(filename);

            try {
                const res = await mmFetchBlobAsBase64(href);
                if (res && res.data) {
                    targetAttachmentsArray.push({
                        type: fileType,
                        filename,
                        mime: res.mime || resolvedMime || 'application/octet-stream',
                        base64: res.data
                    });
                }
            } catch (e) {
                console.warn(`[Capsule] Failed to fetch sidebar attachment ${filename}:`, e);
            }
        }

        // Close the sidebar
        const closeBtn = sidebar.querySelector('button[aria-label="Close"]');
        if (closeBtn) closeBtn.click();
        else document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        await mmWait(600);
    }

    // 1. Process Standalone Pills (individual file attachments, not the aggregate "N attachments" button)
    const allStandalonePills = Array.from(document.querySelectorAll('button, [role="button"], a, .cursor-pointer'))
        .filter(pill => !pill.closest('[role="menu"]') && !pill.closest('[role="tablist"]') && pill.getAttribute('role') !== 'tab')
        .filter(pill => !pill.closest('nav, aside, [class*="sidebar"], [class*="history"]'))
        .filter(isAttachmentPill);

    // Deduplicate: filter out any pill that contains another matched pill 
    // to ensure we only click the innermost clickable element once.
    const standalonePills = allStandalonePills.filter(p => !allStandalonePills.some(child => child !== p && p.contains(child)));

    for (const pill of standalonePills) {
        if (pill.clientWidth > 0 && pill.clientWidth < 40) continue;
        await processPill(pill);
    }

    // 2. Handle the aggregate "N attachments" / "N sources" button globally
    // This button is shown at the top of a query and opens a sidebar listing ALL uploaded files.
    const aggregateBtns = Array.from(document.querySelectorAll('button, [role="button"]')).filter(b => {
        const t = (b.textContent || '').trim().toLowerCase();
        return t.match(/^\d+\s+(attachments?|sources?)$/);
    });

    if (aggregateBtns.length > 0 && globalAttachments.length === 0) {
        for (const btn of aggregateBtns) {
            btn.click();
            await extractFromSidebar(globalAttachments);
        }
    }

    // 3. Parse messages
    const selector = '[class*="group/query"], div[class*="prose"]';
    const elements = document.querySelectorAll(selector);
    if (elements.length === 0) {
        console.warn("⚠️ [Perplexity] No message elements found. Selectors may need tuning.");
    }

    const sortedElements = Array.from(elements).sort((a, b) => {
        return (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING) ? -1 : 1;
    });

    let hasAssignedGlobalAttachments = false;

    for (const el of sortedElements) {
        let text = (el.getAttribute('data-capsule-text') || el.textContent).trim();
        const role = (el.matches('[class*="group/query"]') || el.closest('[class*="group/title"]')) ? 'user' : 'model';
        const attachments = [];

        // 3a. Check for per-message "N sources" button (web search sources, may also contain attachments)
        // Search broadly in the page for any uncaught sources buttons at the same hierarchy level as this element.
        const msgParent = el.parentElement || el;
        const perMsgSourceBtn = Array.from(msgParent.querySelectorAll('button, [role="button"]')).find(b => {
            const t = (b.textContent || '').trim().toLowerCase();
            // Only match "N sources" here (aggregate "N attachments" handled globally above)
            return t.match(/^\d+\s+sources$/);
        });

        if (perMsgSourceBtn) {
            perMsgSourceBtn.click();
            await extractFromSidebar(attachments);
        }

        // Assign global attachments (like standalone pills) to the first user message we encounter
        if (!hasAssignedGlobalAttachments && role === 'user' && globalAttachments.length > 0) {
            attachments.push(...globalAttachments);
            hasAssignedGlobalAttachments = true;
        }

        // 4. Fallback: Inline Images specifically inside this message block
        const imgs = Array.from(el.querySelectorAll('img')).filter(img => {
            const src = img.src || "";
            const alt = (img.alt || "").toLowerCase();
            const isAvatar = alt.includes("avatar") || src.includes("avatar") || src.includes("profile");
            const w = img.naturalWidth || parseInt(img.getAttribute("width") || "0", 10) || 0;
            const h = img.naturalHeight || parseInt(img.getAttribute("height") || "0", 10) || 0;
            return !isAvatar && w > 50 && h > 50 && src.startsWith("http");
        });

        for (const [i, img] of imgs.entries()) {
            attachmentIndex++;
            try {
                const result = await mmFetchBlobAsBase64(img.src);
                if (result && result.data) {
                    attachments.push({
                        type: 'image',
                        filename: `inline_image_${history.length}_${i}.png`,
                        mime: result.mime || 'image/png',
                        base64: result.data
                    });
                }
            } catch (e) {
                console.warn("Perplexity inline image fail:", e);
            }
        }

        // If this message has no text AND no attachments, skip it entirely
        if ((!text || text.length < 2) && attachments.length === 0) continue;

        // Optionally prevent exact duplicates if there are no attachments
        if (attachments.length === 0 && history.length > 0 && history[history.length - 1].text === text) continue;

        history.push({ role, text, attachments });
    }

    // Fallback if we never found a user message to assign global attachments to
    if (!hasAssignedGlobalAttachments && globalAttachments.length > 0) {
        if (history.length > 0) {
            history[history.length - 1].attachments.push(...globalAttachments);
        } else {
            history.push({ role: 'user', text: '', attachments: globalAttachments });
        }
    }
    return history;
}


/* ===== DEEPSEEK UTILS ===== */
function waitForMessagesFromDeepSeek(timeout = 15000) {
    return new Promise((resolve, reject) => {
        const start = Date.now();
        const interval = setInterval(() => {
            const msgs = document.querySelectorAll('div.ds-message._63c77b1');
            if (msgs.length > 0) {
                clearInterval(interval);
                resolve(msgs);
            }
            if (Date.now() - start > timeout) {
                clearInterval(interval);
                reject("Timed out waiting for messages");
            }
        }, 500);
    });
}

async function getMessagesFromDeepSeek(options = { includeAttachments: true }) {
    const history = [];
    const messages = document.querySelectorAll('div.ds-message, div[class*="ds-message"]');

    const includeAttachments = options.includeAttachments !== false;

    // Count total attachments for progress tracking
    let totalAttachments = 0;
    for (const el of messages) {
        const imgs = Array.from(el.querySelectorAll('img')).filter(img => {
            const isAvatar = img.src.includes('avatar') || img.src.includes('profile');
            const isKnownImage = img.classList.contains('image') || img.src.includes('file-') || img.src.includes('myhuaweicloud');
            const hasSize = img.naturalWidth > 30 || (parseInt(img.getAttribute('width')) > 30);
            return !isAvatar && (isKnownImage || hasSize);
        });
        const attachmentButtons = el.querySelectorAll('div._76cd190');
        totalAttachments += imgs.length + attachmentButtons.length;
    }
    let attachmentIndex = 0;

    for (const el of messages) {
        const text = (el.getAttribute('data-capsule-text') ||
            el.querySelector('[data-capsule-text]')?.getAttribute('data-capsule-text') ||
            el.textContent).trim();

        const isAssistant = !!(el.querySelector('.ds-markdown') || el.querySelector('[class*="ds-markdown"]'));
        const role = isAssistant ? 'assistant' : 'user';

        const attachments = [];

        if (includeAttachments) {
            // 1. IMAGES
            // Improved selector: DeepSeek images often have .image class or specific src patterns
            const imgs = Array.from(el.querySelectorAll('img')).filter(img => {
                const isAvatar = img.src.includes('avatar') || img.src.includes('profile');
                const isKnownImage = img.classList.contains('image') || img.src.includes('file-') || img.src.includes('myhuaweicloud');
                const hasSize = img.naturalWidth > 30 || (parseInt(img.getAttribute('width')) > 30);
                return !isAvatar && (isKnownImage || hasSize);
            });

            for (const [i, img] of imgs.entries()) {
                attachmentIndex++;

                try {
                    const result = await mmFetchBlobAsBase64(img.src);
                    if (result.data) {
                        const filename = `image_${history.length}_${i}.png`;
                        const resolvedMime = mimeFromFilename(filename, result.mime);
                        attachments.push({
                            type: 'image',
                            filename: filename,
                            mime: resolvedMime || 'image/png',
                            base64: result.data
                        });
                    }
                } catch (e) {
                    console.error("DeepSeek image fail:", e);
                }
            }

            // 2. UNIFIED ATTACHMENTS (PDF & Images via buttons)
            const attachmentButtons = el.querySelectorAll('div._76cd190');
            for (const [i, btn] of Array.from(attachmentButtons).entries()) {
                attachmentIndex++;

                try {
                    const filenameEl = btn.querySelector('div.f3a54b52');
                    const filename = filenameEl ? filenameEl.textContent.trim() : `file_${i}`;
                    const resolvedMime = mimeFromFilename(filename, null);
                    const isFilePDF = isPdfMime(resolvedMime);
                    const isFileImage = isImageMime(resolvedMime);

                    btn.click();

                    if (isFilePDF) {
                        // PDF DYNAMIC WAIT: Poll for growth & stability
                        let sidebar = null;
                        let pages = [];
                        let canvases = [];
                        let lastPageCount = 0;
                        let lastCanvasCount = 0;
                        let stabilityCounter = 0;

                        for (let attempt = 0; attempt < 60; attempt++) {
                            sidebar = document.querySelector('div._519be07._3f79b51._27fc06b') || document.querySelector('div[class*="sidebar"]');
                            if (sidebar) {
                                pages = sidebar.querySelectorAll('.react-pdf__Page');
                                canvases = sidebar.querySelectorAll('.react-pdf__Page__canvas');
                                const cp = pages.length;
                                const cc = canvases.length;

                                if (cp > lastPageCount || cc > lastCanvasCount) {
                                    lastPageCount = cp;
                                    lastCanvasCount = cc;
                                    stabilityCounter = 0;
                                } else if (cp > 0 && cc >= cp) {
                                    stabilityCounter++;
                                }
                                if (stabilityCounter >= 3) break;
                            }
                            await mmWait(1000);
                        }

                        if (sidebar && pages.length > 0) {
                            const pdfBase64 = await canvasesToPdfBase64();
                            if (pdfBase64) {
                                attachments.push({ type: 'pdf', filename, mime: 'application/pdf', base64: pdfBase64 });
                            } else {
                                // Text fallback
                                let pdfText = "";
                                for (const p of pages) {
                                    const c = p.querySelector('.react-pdf__Page__textContent') || p;
                                    pdfText += c.innerText.trim() + "\n\n";
                                }
                                const trimmed = pdfText.trim();
                                if (trimmed) {
                                    attachments.push({ type: 'text', filename: filename + ".txt", mime: 'text/plain', base64: btoa(unescape(encodeURIComponent(trimmed))) });
                                }
                            }
                            // Close sidebar
                            const closeBtn = sidebar.querySelector('div._5d271a3') || sidebar.querySelector('div[role="button"]:has(svg path[d*="M14.1167"])');
                            if (closeBtn) closeBtn.click();
                            else document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
                        }
                    } else if (isFileImage) {
                        // IMAGE DYNAMIC WAIT: Poll for img.image (max 4s)
                        let foundImg = null;
                        for (let attempt = 0; attempt < 8; attempt++) {
                            foundImg = document.querySelector('img.image');
                            if (foundImg) break;
                            await mmWait(500);
                        }

                        if (foundImg) {
                            const result = await mmFetchBlobAsBase64(foundImg.src);
                            if (result.data) {
                                const finalMime = mimeFromFilename(filename, result.mime || resolvedMime);
                                attachments.push({ type: 'image', filename, mime: finalMime, base64: result.data });
                            } else {
                                console.error(`[DEEPSEEK-DEBUG] Image capture failed for ${filename}`);
                            }
                            document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
                        } else {
                            console.warn(`[DEEPSEEK-DEBUG] Image preview never appeared for ${filename}`);
                        }
                    } else {
                        // OTHER FILE TYPES (xlsx, js, csv, docx…)
                        // DeepSeek opens a text-based preview sidebar for non-PDF/non-image files.
                        // Wait for the sidebar/preview panel to appear, then grab text content.
                        let previewPanel = null;
                        for (let attempt = 0; attempt < 10; attempt++) {
                            previewPanel = document.querySelector('div._519be07._3f79b51._27fc06b') || document.querySelector('div[class*="sidebar"]');
                            if (previewPanel && previewPanel.innerText.trim().length > 0) break;
                            await mmWait(500);
                        }

                        if (previewPanel) {
                            const previewText = previewPanel.innerText.trim();
                            if (previewText) {
                                attachments.push({
                                    type: 'file',
                                    filename,
                                    mime: resolvedMime || 'text/plain',
                                    base64: btoa(unescape(encodeURIComponent(previewText)))
                                });
                            }
                            const closeBtn = previewPanel.querySelector('div._5d271a3') || previewPanel.querySelector('div[role="button"]:has(svg path[d*="M14.1167"])');
                            if (closeBtn) closeBtn.click();
                            else document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
                        } else {
                            console.warn(`[DEEPSEEK-DEBUG] No preview panel for ${filename}`);
                            document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
                        }
                    }
                    await mmWait(500);
                } catch (e) {
                    console.error("DeepSeek attachment fail:", e);
                    document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
                }
            }
        }

        if (text || attachments.length > 0) {
            history.push({ role, text, attachments });
        }
    }

    return history;
}

/* ===== GMAIL UTILS ===== */
async function getMessagesFromGmail(options = { includeAttachments: true }) {
    const messages = [];
    const includeAttachments = options.includeAttachments !== false;

    // 1. Get Subject
    const subjectEl = document.querySelector('h2[aria-label="Message subject"], .hP');
    const subject = subjectEl ? subjectEl.textContent.trim() : "No Subject";

    // 2. EXPAND THREAD
    const expandAllBtn = document.querySelector('button[aria-label="Expand all"], img[aria-label="Expand all"], [data-tooltip="Expand all"]');
    if (expandAllBtn && (expandAllBtn.getAttribute('aria-label') === 'Expand all' || expandAllBtn.getAttribute('data-tooltip') === 'Expand all')) {
        expandAllBtn.click();
        await mmWait(1500);
    }

    // 3. Parallel Extraction of Messages
    const emailContainers = Array.from(document.querySelectorAll('.adn.ads'));

    if (emailContainers.length === 0) {
        const bodyEl = document.querySelector('.a3s.aiL');
        if (bodyEl) {
            const atts = includeAttachments ? await getGmailAttachments(document) : [];
            messages.push({
                role: 'user',
                text: `Subject: ${subject}\n\nContent:\n${(bodyEl.innerText || bodyEl.textContent || "").trim()}`,
                attachments: atts
            });
        }
    } else {
        const globalSeenUrls = new Set();
        const extractionPromises = emailContainers.map(async (container) => {
            const checkbox = container.querySelector('.capsule-message-checkbox');
            if (checkbox && !checkbox.checked) return null;

            const senderEl = container.querySelector('.gD');
            const sender = senderEl ? senderEl.textContent.trim() : "Unknown Sender";
            const bodyEl = container.querySelector('.a3s.aiL');
            if (!bodyEl) return null;

            let attachments = [];
            if (includeAttachments) {
                const chips = await getGmailAttachments(container, globalSeenUrls);
                const embeds = await getEmbeddedImages(bodyEl, globalSeenUrls);
                attachments = [...chips, ...embeds];
            }

            const dateEl = container.querySelector('.g3') || container.querySelector('.ha h1 span') || container.querySelector('.m3');
            const timestamp = dateEl ? dateEl.textContent.trim() : "";

            return {
                role: 'user',
                text: `From: ${sender}${timestamp ? ' (' + timestamp + ')' : ''}\n\n${(bodyEl.innerText || bodyEl.textContent || "").trim()}`,
                attachments
            };
        });

        const extracted = await Promise.all(extractionPromises);
        messages.push(...extracted.filter(Boolean));
    }

    // Apply a global attachment safety limit to prevent message size errors
    let totalAttachments = 0;
    const GLOBAL_MAX_ATTACHMENTS = 15;
    messages.forEach(msg => {
        if (msg.attachments) {
            const uniqueAtts = [];
            const seenNames = new Set();
            for (const att of msg.attachments) {
                if (!seenNames.has(att.filename)) {
                    seenNames.add(att.filename);
                    uniqueAtts.push(att);
                }
            }

            if (totalAttachments >= GLOBAL_MAX_ATTACHMENTS) {
                msg.attachments = [];
            } else {
                const remaining = GLOBAL_MAX_ATTACHMENTS - totalAttachments;
                msg.attachments = uniqueAtts.slice(0, remaining);
                totalAttachments += msg.attachments.length;
            }
        }
    });

    return messages;
}

async function getEmbeddedImages(container, globalSeenUrls = new Set()) {
    const images = [];
    const imgs = container.querySelectorAll('img[src], img[data-src]');
    const MAX_IMAGES = 5;
    const imagePromises = [];

    for (const img of Array.from(imgs)) {
        if (imagePromises.length >= MAX_IMAGES) break;
        try {
            const width = img.naturalWidth || img.width || img.clientWidth || 0;
            const height = img.naturalHeight || img.height || img.clientHeight || 0;
            if (width > 0 && width < 100) continue;
            if (height > 0 && height < 100) continue;

            const src = img.src || img.getAttribute('data-src');
            if (!src || src.includes('emoji') || src.includes('favicon') || src.includes('tracker') || src.includes('open.gif')) continue;
            if (globalSeenUrls.has(src)) continue;
            globalSeenUrls.add(src);

            imagePromises.push((async () => {
                try {
                    const result = await Promise.race([
                        mmFetchBlobAsBase64(src),
                        new Promise(r => setTimeout(() => r({ data: null }), 5000))
                    ]);

                    if (result && result.data) {
                        return {
                            type: 'image',
                            filename: `embedded_image_${Math.random().toString(36).substr(2, 5)}.png`,
                            mime: result.mime || 'image/png',
                            base64: result.data,
                            isEmbedded: true
                        };
                    }
                } catch (e) {
                    // Ignore
                }
                return null;
            })());
        } catch (e) {
            console.warn("Embedded image capture skipped:", e);
        }
    }

    const results = await Promise.all(imagePromises);
    return results.filter(Boolean);
}

async function getGmailAttachments(scopeEl, globalSeenUrls = new Set()) {
    const attachments = [];
    // Select attachment chips (PDFs and Images) - including modern .aZo structure
    const chips = scopeEl.querySelectorAll('div[role="listitem"].a98, .br7, .aZo[download_url]');

    for (const chip of Array.from(chips)) {
        try {
            let filename = "attachment";
            let url = null;
            let mimeHint = null;

            // 1. Try parsing download_url attribute (Most robust for modern Gmail)
            const downloadUrlAttr = chip.getAttribute('download_url');
            if (downloadUrlAttr) {
                const parts = downloadUrlAttr.split(':');
                if (parts.length >= 3) {
                    mimeHint = parts[0];
                    filename = decodeURIComponent(parts[1]);
                    url = parts.slice(2).join(':');
                    // Clean up potential double URL prefixes in Gmail's attribute
                    if (url.includes('https://') && url.indexOf('https://') > 0) {
                        url = url.substring(url.indexOf('https://'));
                    }
                }
            }

            // 2. Fallback: Filename detection from DOM
            if (!filename || filename === "attachment") {
                const filenameEl = chip.querySelector('.aV3') || chip.querySelector('.aWQ');
                if (filenameEl) filename = filenameEl.textContent.trim();
            }

            // 3. Fallback: Find download/preview link from DOM
            if (!url) {
                const downloadLink = chip.querySelector('a[href*="disp=attd"]') || chip.querySelector('a[href*="disp=safe"]') || chip.querySelector('a[download]');
                if (downloadLink) url = downloadLink.href;
            }

            if (!url || globalSeenUrls.has(url)) continue;
            globalSeenUrls.add(url);

            // Resolve the best MIME type: extension > mimeHint > server header
            const resolvedMime = mimeFromFilename(filename, mimeHint);

            // Skip file types we don't support
            if (!isSupportedMime(resolvedMime)) continue;

            const result = await mmFetchBlobAsBase64(url);
            if (result.data) {
                const finalMime = mimeFromFilename(filename, result.mime || mimeHint);
                attachments.push({
                    type: isPdfMime(finalMime) ? 'pdf' : (isImageMime(finalMime) ? 'image' : 'file'),
                    filename: filename,
                    mime: finalMime,
                    base64: result.data
                });
            }
        } catch (e) {
            console.error("[GMAIL-DEBUG] Attachment capture fail:", e);
        }
    }
    return attachments;
}


/* ===== ANIMATIONS ===== */
function createAnimationStyles() {
    if (document.getElementById('capsule-animation-styles')) return;

    const style = document.createElement('style');
    style.id = 'capsule-animation-styles';
    style.textContent = `
    @keyframes capsule-shake {
      0% { transform: translate(-50%, -50%) rotate(0deg); }
      25% { transform: translate(-50%, -50%) rotate(-10deg); }
      75% { transform: translate(-50%, -50%) rotate(10deg); }
      100% { transform: translate(-50%, -50%) rotate(0deg); }
    }
    @keyframes capsule-pop {
      0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
      100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
    }
    @keyframes capsule-fly-up {
      0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
      100% { transform: translate(calc(50vw - 50px), -100vh) scale(0.5); opacity: 0; }
    }
    .capsule-overlay {
        position: fixed;
        top: 50%;
        left: 50%;
        width: 80px;
        height: 80px;
        z-index: 99999;
        pointer-events: none;
        transform: translate(-50%, -50%);
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .capsule-overlay img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    .capsule-shake {
        animation: capsule-shake 0.5s infinite ease-in-out;
    }
    .capsule-pop {
        animation: capsule-pop 0.5s forwards ease-out;
    }
    .capsule-fly-up {
        animation: capsule-fly-up 1.5s forwards ease-in-out;
    }
    .capsule-arrow {
        position: absolute;
        top: -50px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 40px;
        animation: capsule-bounce 1s infinite;
    }
    @keyframes capsule-bounce {
        0%, 100% { transform: translateX(-50%) translateY(0); }
        50% { transform: translateX(-50%) translateY(-10px); }
    }
    @keyframes capsule-breathing {
      0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px rgba(0, 0, 255, 0.4)); }
      50% { transform: scale(1.15); filter: drop-shadow(0 0 20px rgba(128, 200, 255, 0.9)); }
    }
    .capsule-breathing {
      animation: capsule-breathing 1.2s infinite ease-in-out !important;
      z-index: 100000 !important;
    }
  `;
    document.head.appendChild(style);
}

// Call immediately to inject styles
createAnimationStyles();

function showDroppingAnimation() {
    let overlay = document.getElementById('capsule-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'capsule-overlay';
        overlay.className = 'capsule-overlay';
        const img = document.createElement('img');
        if (isContextValid()) {
            img.src = chrome.runtime.getURL('capsule.png');
        } else {
            console.warn("🚫 Extension context invalidated. Please refresh the page.");
        }
        overlay.appendChild(img);
        document.body.appendChild(overlay);
    }
    overlay.className = 'capsule-overlay capsule-shake';
}

function showOpeningAnimation() {
    const overlay = document.getElementById('capsule-overlay');
    if (overlay) {
        overlay.className = 'capsule-overlay capsule-pop';
        setTimeout(() => {
            overlay.remove();
        }, 500);
    }
}

function hideDroppingAnimation() {
    const overlay = document.getElementById('capsule-overlay');
    if (overlay) {
        overlay.remove();
    }
}

/**
 * Shows a selector modal for attachments.
 * Returns a Promise that resolves with the selected attachments.
 */
function showAttachmentSelector(attachments, platform) {
    return new Promise((resolve) => {
        // If no attachments, just resolve empty
        if (!attachments || attachments.length === 0) {
            resolve([]);
            return;
        }

        const NOTEBOOKLM_SUPPORTED_EXTENSIONS = new Set([
            'pdf', 'txt', 'md', 'docx', 'csv', 'pptx', 'epub', 
            '3g2', '3gp', 'aac', 'aif', 'aifc', 'aiff', 'amr', 'au', 'avi', 'cda', 
            'm4a', 'mid', 'mp3', 'mp4', 'mpeg', 'ogg', 'opus', 'ra', 'ram', 'snd', 'wav', 'wma', 
            'avif', 'bmp', 'gif', 'ico', 'jp2', 'png', 'webp', 'tif', 'tiff', 'heic', 'heif', 'jpeg', 'jpg', 'jpe'
        ]);

        const getAttachmentSupport = (filename) => {
            if (platform !== 'notebooklm') return { isSupported: true, ext: '' };
            const ext = filename.split('.').pop().toLowerCase();
            return { isSupported: NOTEBOOKLM_SUPPORTED_EXTENSIONS.has(ext), ext };
        };

        // Create Modal Element
        const modal = document.createElement('div');
        modal.id = 'capsule-attachment-selector';
        modal.className = 'capsule-modal-overlay';

        // Glassmorphism styling & animations
        modal.innerHTML = `
      <div class="capsule-modal-card">
        <div class="capsule-modal-header">
          <h3>Select Attachments</h3>
          <p>Choose which files to drop into the chat</p>
        </div>
        <div class="capsule-modal-body">
          <div class="capsule-select-all-row">
            <label class="capsule-checkbox-container">
              <input type="checkbox" id="capsule-select-all" checked>
              <span class="capsule-checkmark"></span>
              <span class="capsule-select-all-text">Select All</span>
            </label>
          </div>
          <div class="capsule-attachments-list">
            ${attachments.map((att, index) => {
                const { isSupported, ext } = getAttachmentSupport(att.filename);
                return `
              <div class="capsule-attachment-item ${!isSupported ? 'capsule-attachment-item-disabled' : ''}" data-index="${index}" data-supported="${isSupported}" data-ext="${ext}" title="${!isSupported ? `This file type (.${ext}) is not supported by NotebookLM` : ''}">
                <label class="capsule-checkbox-container" style="${!isSupported ? 'cursor: not-allowed !important;' : ''}">
                  <input type="checkbox" class="capsule-att-checkbox" data-index="${index}" ${isSupported ? 'checked' : 'disabled'}>
                  <span class="capsule-checkmark" style="${!isSupported ? 'background-color: rgba(255, 255, 255, 0.03) !important; border-color: rgba(255, 255, 255, 0.05) !important;' : ''}"></span>
                  <div class="capsule-att-info">
                    <span class="capsule-att-name" title="${att.filename}">${att.filename}</span>
                    <span class="capsule-att-meta">
                      ${att.type.toUpperCase()} • ${att.mime}
                      ${!isSupported ? `<span class="capsule-unsupported-badge">Unsupported</span>` : ''}
                    </span>
                  </div>
                </label>
              </div>
                `;
            }).join('')}
          </div>
        </div>
        <div class="capsule-modal-footer">
          <button id="capsule-cancel-drop" class="capsule-btn-secondary">Cancel</button>
          <button id="capsule-confirm-drop" class="capsule-btn-primary">Drop Selected</button>
        </div>
      </div>
      <style>
        .capsule-modal-overlay {
          all: initial; /* Reset inherited styles */
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
          background: rgba(0, 0, 0, 0.7) !important;
          backdrop-filter: blur(12px) !important;
          -webkit-backdrop-filter: blur(12px) !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          z-index: 2147483647 !important;
          opacity: 0 !important;
          transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          font-family: 'Inter', system-ui, -apple-system, sans-serif !important;
          box-sizing: border-box !important;
        }
        .capsule-modal-overlay.show {
          opacity: 1 !important;
        }
        .capsule-modal-card {
          margin: 0 !important;
          padding: 0 !important;
          background: #0f172a !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 18px !important;
          width: 340px !important;
          max-width: 90vw !important;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8) !important;
          transform: translateY(30px) scale(0.95) !important;
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
          overflow: hidden !important;
          color: #f8fafc !important;
          box-sizing: border-box !important;
          display: block !important;
        }
        .capsule-modal-card * {
          box-sizing: border-box !important;
        }
        .capsule-modal-overlay.show .capsule-modal-card {
          transform: translateY(0) scale(1) !important;
        }
        .capsule-modal-header {
          padding: 20px 24px 16px !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%) !important;
          width: 100% !important;
          display: block !important;
        }
        .capsule-modal-header h3 {
          margin: 0 !important;
          font-size: 18px !important;
          font-weight: 800 !important;
          letter-spacing: -0.025em !important;
          background: linear-gradient(135deg, #fff 0%, #94a3b8 100%) !important;
          -webkit-background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
          line-height: 1.2 !important;
        }
        .capsule-modal-header p {
          margin: 4px 0 0 !important;
          font-size: 12px !important;
          color: #94a3b8 !important;
          font-weight: 500 !important;
          line-height: normal !important;
        }
        .capsule-modal-body {
          padding: 16px 20px !important;
          max-height: 380px !important;
          overflow-y: auto !important;
          scrollbar-width: thin !important;
          scrollbar-color: #334155 transparent !important;
          width: 100% !important;
          display: block !important;
        }
        .capsule-modal-body::-webkit-scrollbar {
          width: 5px !important;
        }
        .capsule-modal-body::-webkit-scrollbar-thumb {
          background-color: #334155 !important;
          border-radius: 10px !important;
        }
        .capsule-select-all-row {
          padding-bottom: 12px !important;
          margin-bottom: 12px !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
          width: 100% !important;
          display: block !important;
        }
        .capsule-select-all-text {
          font-weight: 700 !important;
          color: #818cf8 !important;
          font-size: 14px !important;
          margin-left: 8px !important;
        }
        .capsule-attachments-list {
          display: flex !important;
          flex-direction: column !important;
          gap: 8px !important;
          width: 100% !important;
        }
        .capsule-attachment-item {
          background: rgba(255, 255, 255, 0.03) !important;
          border: 1px solid rgba(255, 255, 255, 0.05) !important;
          border-radius: 12px !important;
          padding: 10px !important;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
          width: 100% !important;
          display: block !important;
        }
        .capsule-attachment-item:hover {
          background: rgba(255, 255, 255, 0.06) !important;
          border-color: rgba(99, 102, 241, 0.4) !important;
          transform: translateX(4px) !important;
        }
        .capsule-attachment-item-disabled {
          opacity: 0.55 !important;
          background: rgba(239, 68, 68, 0.02) !important;
          border-color: rgba(239, 68, 68, 0.15) !important;
          cursor: not-allowed !important;
        }
        .capsule-attachment-item-disabled:hover {
          background: rgba(239, 68, 68, 0.04) !important;
          border-color: rgba(239, 68, 68, 0.25) !important;
          transform: none !important;
        }
        .capsule-unsupported-badge {
          font-size: 8.5px !important;
          color: #f87171 !important;
          border: 1px solid rgba(248, 113, 113, 0.3) !important;
          padding: 1px 4px !important;
          border-radius: 4px !important;
          font-weight: 700 !important;
          margin-left: 6px !important;
          text-transform: uppercase !important;
          display: inline-block !important;
          vertical-align: middle !important;
        }
        .capsule-checkbox-container {
          display: flex !important;
          align-items: center !important;
          position: relative !important;
          padding-left: 32px !important;
          cursor: pointer !important;
          font-size: 13px !important;
          user-select: none !important;
          width: 100% !important;
          margin: 0 !important;
        }
        .capsule-checkbox-container input {
          position: absolute !important;
          opacity: 0 !important;
          cursor: pointer !important;
          height: 0 !important;
          width: 0 !important;
        }
        .capsule-checkmark {
          position: absolute !important;
          top: 50% !important;
          left: 0 !important;
          transform: translateY(-50%) !important;
          height: 18px !important;
          width: 18px !important;
          background-color: rgba(0, 0, 0, 0.3) !important;
          border-radius: 5px !important;
          border: 1.5px solid rgba(255, 255, 255, 0.2) !important;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .capsule-checkbox-container:hover input ~ .capsule-checkmark {
          border-color: rgba(99, 102, 241, 0.6) !important;
          background-color: rgba(99, 102, 241, 0.1) !important;
        }
        .capsule-checkbox-container input:checked ~ .capsule-checkmark {
          background-color: #6366f1 !important;
          border-color: #6366f1 !important;
          box-shadow: 0 0 10px rgba(99, 102, 241, 0.3) !important;
        }
        .capsule-checkmark:after {
          content: "" !important;
          position: absolute !important;
          display: none !important;
        }
        .capsule-checkbox-container input:checked ~ .capsule-checkmark:after {
          display: block !important;
        }
        .capsule-checkbox-container .capsule-checkmark:after {
          left: 6px !important;
          top: 2px !important;
          width: 4px !important;
          height: 8px !important;
          border: solid white !important;
          border-width: 0 2px 2px 0 !important;
          transform: rotate(45deg) !important;
        }
        .capsule-att-info {
          display: flex !important;
          flex-direction: column !important;
          gap: 2px !important;
          margin-left: 10px !important;
          flex: 1 !important;
          min-width: 0 !important; /* Essential for flex truncation */
          overflow: hidden !important;
          text-align: left !important;
        }
        .capsule-att-name {
          font-weight: 600 !important;
          color: #f1f5f9 !important;
          font-size: 13.5px !important;
          display: block !important;
          white-space: nowrap !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
          width: 100% !important;
        }
        .capsule-att-meta {
          font-size: 10.5px !important;
          color: #64748b !important;
          font-weight: 500 !important;
          white-space: nowrap !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
          width: 100% !important;
          opacity: 0.8 !important;
        }
        .capsule-modal-footer {
          padding: 16px 20px !important;
          background: rgba(0, 0, 0, 0.2) !important;
          border-top: 1px solid rgba(255, 255, 255, 0.05) !important;
          display: flex !important;
          justify-content: flex-end !important;
          gap: 10px !important;
          width: 100% !important;
        }
        .capsule-btn-primary {
          background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%) !important;
          color: white !important;
          border: none !important;
          padding: 10px 18px !important;
          border-radius: 12px !important;
          font-weight: 700 !important;
          font-size: 13px !important;
          cursor: pointer !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          box-shadow: 0 4px 10px rgba(99, 102, 241, 0.2) !important;
          width: auto !important;
        }
        .capsule-btn-primary:hover {
          transform: translateY(-1px) !important;
          box-shadow: 0 6px 15px rgba(99, 102, 241, 0.3) !important;
          filter: brightness(1.1) !important;
        }
        .capsule-btn-secondary {
          background: rgba(255, 255, 255, 0.03) !important;
          color: #94a3b8 !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          padding: 10px 18px !important;
          border-radius: 12px !important;
          font-weight: 700 !important;
          font-size: 13px !important;
          cursor: pointer !important;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
          width: auto !important;
        }
        .capsule-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.08) !important;
          color: #f1f5f9 !important;
          border-color: rgba(255, 255, 255, 0.2) !important;
        }
      </style>
    `;

        document.body.appendChild(modal);

        // Force reflow
        modal.offsetHeight;
        modal.classList.add('show');

        const selectAll = modal.querySelector('#capsule-select-all');
        const checkboxes = modal.querySelectorAll('.capsule-att-checkbox');

        selectAll.onchange = () => {
            checkboxes.forEach(cb => {
                if (!cb.disabled) {
                    cb.checked = selectAll.checked;
                }
            });
        };

        checkboxes.forEach(cb => {
            if (!cb.disabled) {
                cb.onchange = () => {
                    const enabledCheckboxes = Array.from(checkboxes).filter(c => !c.disabled);
                    const allChecked = enabledCheckboxes.every(c => c.checked);
                    selectAll.checked = allChecked;
                };
            }
        });

        // Add warnings for unsupported clicked items
        const disabledItems = modal.querySelectorAll('.capsule-attachment-item-disabled');
        disabledItems.forEach(item => {
            item.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                const ext = item.dataset.ext || 'unknown';
                alert(`NotebookLM does not support .${ext} files. Supported formats: pdf, txt, md, docx, csv, pptx, epub, and standard audio/video/image types.`);
            };
        });

        const cleanup = () => {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 400);
        };

        modal.querySelector('#capsule-cancel-drop').onclick = () => {
            cleanup();
            resolve(null);
        };

        modal.querySelector('#capsule-confirm-drop').onclick = () => {
            const selectedIndices = Array.from(checkboxes)
                .filter(cb => cb.checked)
                .map(cb => parseInt(cb.dataset.index));

            const selectedAttachments = selectedIndices.map(i => attachments[i]);
            cleanup();
            resolve(selectedAttachments);
        };

        modal.onclick = (e) => {
            if (e.target === modal) {
                cleanup();
                resolve(null);
            }
        };
    });
}

function showGenerationSuccessAnimation() {
    let overlay = document.getElementById('capsule-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'capsule-overlay';
        overlay.className = 'capsule-overlay';
        document.body.appendChild(overlay);
    }

    // Add arrow and image
    if (isContextValid()) {
        const imgUrl = chrome.runtime.getURL('capsule.png');
        overlay.innerHTML = `<img src="${imgUrl}" alt="capsule"><div class="capsule-arrow">⬆️</div>`;
    } else {
        overlay.innerHTML = `<div style="font-size: 30px">💊</div><div class="capsule-arrow">⬆️</div>`;
    }

    overlay.className = 'capsule-overlay capsule-fly-up';
    setTimeout(() => {
        overlay.remove();
    }, 1500);
}

/* ===== GENERATOR (SHARED) ===== */
function generateCapsuleFromMessages(msgs, tag = "auto-generated") {
    return new Promise(async (resolve, reject) => {
        if (!msgs || !msgs.length) {
            alert("No messages found to summarize.");
            reject("No messages");
            return;
        }

        // Check for test mode
        const { testMode } = await chrome.storage.local.get("testMode");

        // Map messages to include role and text/content
        const messages = msgs.map(m => ({
            role: m.role,
            content: m.text || m.content
        }));

        // Collect attachments from all messages
        const attachments = msgs.flatMap((m, idx) =>
            (m.attachments || []).map(a => ({
                type: a.type,
                filename: a.filename,
                mime: a.mime,
                base64: a.base64,
                message_index: idx
            }))
        );

        // Log any attachments that came through with empty/missing data
        attachments.forEach(a => {
            if (!a.base64) {
                console.warn(`[Capsule] Empty attachment detected: "${a.filename}" (type: ${a.type}, mime: ${a.mime})`);
            }
        });

        // TEST MODE: Preview data without backend call
        if (testMode) {
            console.log("%c🧪 TEST MODE - PREVIEW ONLY (No Backend Call)", "background: #4f46e5; color: white; font-size: 14px; font-weight: bold; padding: 8px;");

            console.log("%c📨 Conversation Messages:", "background: #10b981; color: white; font-weight: bold; padding: 4px;");
            messages.forEach((msg, i) => {
                console.log(`%c[${i + 1}] ${msg.role}:`, "font-weight: bold; color: #6366f1;", msg.content.substring(0, 200) + (msg.content.length > 200 ? '...' : ''));
            });

            if (attachments.length > 0) {
                console.log("%c📎 Attachments Detected:", "background: #f59e0b; color: white; font-weight: bold; padding: 4px;");
                attachments.forEach((att, i) => {
                    console.log(`%c[${i + 1}] ${att.filename}`, "font-weight: bold; color: #f59e0b;");
                    console.log(`   Type: ${att.type}`);
                    console.log(`   Mime: ${att.mime}`);
                    if (att.base64) {
                        console.log(`   Full Base64 Data (click to expand):`);
                        console.log(att.base64);
                        console.log(`   Preview: ${att.base64.substring(0, 200)}...`);
                    }
                });
            }

            console.log("%c🌍 Context Details:", "background: #6366f1; color: white; font-weight: bold; padding: 4px;");
            console.log({
                tag,
                platform: detectPlatform(),
                conversationId: getConversationId()
            });

            alert(`✅ TEST MODE: Preview logged to console\n\nMessages: ${messages.length}\nAttachments: ${attachments.length}\n\nCheck console for FULL base64 data.`);
            chrome.runtime.sendMessage({ type: "GENERATION_COMPLETE", success: true });
            resolve({ testMode: true, messages, attachments });
            return;
        }

        const sourcePlatform = detectPlatform();
        const conversationId = getConversationId();

        if (!isContextValid()) {
            alert("Extension context invalidated. Please refresh the page to continue using Capsule Hub.");
            reject("Context invalidated");
            return;
        }

        chrome.runtime.sendMessage(
            {
                type: "generateCapsule",
                payload: {
                    messages: messages,
                    attachments: attachments,
                    tag: tag,
                    extracted_from: sourcePlatform,
                    conversationId: conversationId
                }
            },
            (res) => {
                if (!res?.success) {
                    chrome.runtime.sendMessage({ type: "GENERATION_COMPLETE", success: false, error: res?.error });
                    reject(res?.error || "Unknown error");
                    return;
                }
                const capsuleId = res.data.capsule_id || res.data.id;
                if (capsuleId) {
                    chrome.storage.local.set({ lastCapsuleId: capsuleId });

                    // NEW: Store local mapping immediately so versioning UI triggers next time
                    if (conversationId) {
                        chrome.storage.local.get("localConvoMappings", ({ localConvoMappings = {} }) => {
                            localConvoMappings[conversationId] = capsuleId;
                            chrome.storage.local.set({ localConvoMappings });
                        });
                    }

                    showGenerationSuccessAnimation();
                    chrome.runtime.sendMessage({ type: "GENERATION_COMPLETE", success: true });
                    resolve(capsuleId);
                } else {
                    alert("Capsule created but no ID was returned.");
                    chrome.runtime.sendMessage({ type: "GENERATION_COMPLETE", success: false });
                    reject("No ID returned");
                }
            }
        );
    });
}

function generateVersionFromMessages(msgs, capsuleId) {
    return new Promise(async (resolve, reject) => {
        if (!msgs || !msgs.length) {
            alert("No messages found for versioning.");
            chrome.runtime.sendMessage({ type: "GENERATION_COMPLETE", success: false });
            reject("No messages");
            return;
        }

        // Check for test mode
        const { testMode } = await chrome.storage.local.get("testMode");

        const messages = msgs.map(m => ({
            role: m.role,
            content: m.text || m.content
        }));

        // Collect attachments from all messages
        const attachments = msgs.flatMap((m, idx) =>
            (m.attachments || []).map(a => ({
                type: a.type,
                filename: a.filename,
                mime: a.mime,
                base64: a.base64,
                message_index: idx
            }))
        );

        // Log any attachments that came through with empty/missing data
        attachments.forEach(a => {
            if (!a.base64) {
                console.warn(`[Capsule] Empty attachment (Version) detected: "${a.filename}" (type: ${a.type}, mime: ${a.mime})`);
            }
        });

        // TEST MODE: Preview data without backend call
        if (testMode) {
            console.log("%c🧪 TEST MODE (VERSION) - PREVIEW ONLY", "background: #4f46e5; color: white; font-size: 14px; font-weight: bold; padding: 8px;");

            console.log("%c📨 Version Messages:", "background: #10b981; color: white; font-weight: bold; padding: 4px;");
            messages.forEach((msg, i) => {
                console.log(`%c[${i + 1}] ${msg.role}:`, "font-weight: bold; color: #6366f1;", msg.content.substring(0, 200) + (msg.content.length > 200 ? '...' : ''));
            });

            if (attachments.length > 0) {
                console.log("%c📎 Attachments Detected:", "background: #f59e0b; color: white; font-weight: bold; padding: 4px;");
                attachments.forEach((att, i) => {
                    console.log(`%c[${i + 1}] ${att.filename}`, "font-weight: bold; color: #f59e0b;");
                });
            }

            console.log("%c🌍 Context Details:", "background: #6366f1; color: white; font-weight: bold; padding: 4px;");
            console.log({
                capsuleId,
                platform: detectPlatform()
            });

            alert(`✅ TEST MODE: Version preview logged to console\n\nMessages: ${messages.length}\nAttachments: ${attachments.length}`);
            chrome.runtime.sendMessage({ type: "GENERATION_COMPLETE", success: true });
            resolve({ testMode: true, messages, attachments });
            return;
        }

        const sourcePlatform = detectPlatform();

        if (!isContextValid()) {
            alert("Extension context invalidated. Please refresh the page.");
            reject("Context invalidated");
            return;
        }
        const conversationId = getConversationId();
        chrome.runtime.sendMessage({
            type: "createCapsuleVersion",
            payload: {
                capsuleId: capsuleId,
                messages: messages,
                attachments: attachments,
                extracted_from: sourcePlatform,
                conversationId: conversationId
            }
        }, (res) => {
            if (res?.success) {
                // NEW: Ensure local mapping is updated for versioning
                if (conversationId && capsuleId) {
                    chrome.storage.local.get("localConvoMappings", ({ localConvoMappings = {} }) => {
                        localConvoMappings[conversationId] = capsuleId;
                        chrome.storage.local.set({ localConvoMappings });
                    });
                }

                showGenerationSuccessAnimation();
                chrome.runtime.sendMessage({ type: "GENERATION_COMPLETE", success: true });
                resolve(res.data);
            } else {
                console.error("❌ Version creation failed:", res?.error);
                alert("Error: " + (res?.error || "Unknown error"));
                chrome.runtime.sendMessage({ type: "GENERATION_COMPLETE", success: false });
                reject(res?.error || "Unknown error");
            }
        });
    });
}

/* ===== COPILOT UTILS ===== */

/**
 * Recursively collects all elements matching any of the given selectors,
 * including inside Shadow DOM roots. Required for new Copilot layout.
 */
function copilotShadowQueryAll(selectors, root = document.body, results = []) {
    if (!root) return results;
    // Check root itself (handles ShadowRoot nodes)
    if (root.nodeType === Node.ELEMENT_NODE) {
        for (const sel of selectors) {
            try {
                if (root.matches && root.matches(sel)) {
                    results.push(root);
                    break;
                }
            } catch (e) { /* ignore invalid selectors */ }
        }
    }
    // Recurse into shadow root if present
    if (root.shadowRoot) {
        copilotShadowQueryAll(selectors, root.shadowRoot, results);
    }
    // Recurse into children
    const children = root.children || root.childNodes;
    if (children) {
        for (const child of children) {
            if (child.nodeType === Node.ELEMENT_NODE) {
                copilotShadowQueryAll(selectors, child, results);
            }
        }
    }
    return results;
}

function waitForMessagesFromCopilot(timeout = 15000) {
    return new Promise((resolve, reject) => {
        const start = Date.now();
        const COPILOT_MSG_SELECTORS = [
            'cib-message',
            '.cl-message-bubble',
            '.ac-textBlock',
            '[data-testid*="message"]',
            '[class*="user-message"]',
            '[class*="bot-message"]',
            '[class*="chat-turn"]',
        ];
        const interval = setInterval(() => {
            // Try standard query first (old Copilot layout)
            let msgs = document.querySelectorAll('cib-message, [data-testid*="message"], .ac-textBlock, div[role="log"] > div, .cl-message-bubble');
            // If nothing found, pierce shadow DOM for new Copilot layout
            if (msgs.length === 0) {
                const shadowResults = copilotShadowQueryAll(COPILOT_MSG_SELECTORS);
                if (shadowResults.length > 0) msgs = shadowResults;
            }
            // Fallback: check for ANY substantial text containers in conversation area
            if (msgs.length === 0) {
                const conversationArea = document.querySelector('[role="main"], [role="log"], main');
                if (conversationArea) {
                    const textDivs = conversationArea.querySelectorAll('div, p, article');
                    const withText = Array.from(textDivs).filter(el => (el.textContent || '').trim().length > 20);
                    if (withText.length > 0) msgs = withText;
                }
            }
            if (msgs.length > 0) {
                clearInterval(interval);
                resolve(msgs);
            }
            if (Date.now() - start > timeout) {
                clearInterval(interval);
                reject("Timed out waiting for messages");
            }
        }, 500);
    });
}

async function getMessagesFromCopilot(options = { includeAttachments: true }) {
    const history = [];
    const COPILOT_MSG_SELECTORS = [
        'cib-message',
        '.cl-message-bubble',
        '.ac-textBlock',
        '[data-testid*="message"]',
        '[class*="user-message"]',
        '[class*="bot-message"]',
        '[class*="chat-turn"]',
    ];

    // Try standard DOM query first (works for old Bing/Copilot layout)
    let elements = Array.from(document.querySelectorAll('cib-message, [data-testid*="message"], .ac-textBlock, div.cl-message-bubble'));

    // If nothing found, pierce Shadow DOM for new Copilot layout
    if (elements.length === 0) {
        console.log("[Copilot] Standard query found nothing — trying shadow DOM traversal");
        elements = copilotShadowQueryAll(COPILOT_MSG_SELECTORS);
    }

    // Fallback: collect all substantial text blocks from the conversation area
    if (elements.length === 0) {
        console.log("[Copilot] Shadow query found nothing — using conversation area fallback");
        const conversationArea = document.querySelector('[role="main"], [role="log"], main') || document.body;
        const allDivs = Array.from(conversationArea.querySelectorAll('p, article, [class*="message"], [class*="response"], [class*="turn"]'));
        elements = allDivs.filter(el => {
            const text = (el.textContent || '').trim();
            // Skip very short elements, navigation, buttons
            return text.length > 10 && !['BUTTON', 'NAV', 'HEADER', 'FOOTER'].includes(el.tagName);
        });
    }

    if (elements.length === 0) {
        console.warn("⚠️ [Copilot] No message elements found after all strategies.");
        return history;
    }

    // Sort elements in DOM order
    const sortedElements = elements.sort((a, b) => {
        try {
            return (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING) ? -1 : 1;
        } catch (e) { return 0; }
    });

    for (const el of sortedElements) {
        let text = (el.getAttribute('data-capsule-text') || el.textContent || '').trim();
        if (!text || text.length < 3) continue;
        // Skip UI noise (nav labels, button text, very short strings)
        if (text.length < 10 && /^[\W\d]+$/.test(text)) continue;
        // Deduplicate consecutive identical messages
        if (history.length > 0 && history[history.length - 1].text === text) continue;

        // Determine role: check attributes, class names, source attributes
        const classStr = (typeof el.className === 'string' ? el.className : '');
        const sourceAttr = el.getAttribute('source') || '';
        const isUser = (
            (el.getAttribute('type') === 'text' && sourceAttr !== 'bot') ||
            classStr.includes('user') ||
            classStr.includes('User') ||
            el.getAttribute('data-role') === 'user'
        );
        const role = isUser ? 'user' : 'model';
        history.push({ role, text, attachments: [] });
    }
    return history;
}

/* ===== GROK UTILS (grok.com) ===== */

// Both user and assistant turns wrap their text in `.response-content-markdown`.
// Only the user's copy is nested inside `[data-testid="user-message"]`, which
// gives a reliable role test (see getMessagesFromGrok).
const GROK_MSG_SELECTORS = [
    '.response-content-markdown',
    '[data-testid="user-message"]',
];

function waitForMessagesFromGrok(timeout = 15000) {
    return new Promise((resolve, reject) => {
        const start = Date.now();
        const interval = setInterval(() => {
            let msgs = document.querySelectorAll(GROK_MSG_SELECTORS.join(', '));
            // Fallback: substantial text blocks inside the conversation area
            if (msgs.length === 0) {
                const conversationArea = document.querySelector('main, [role="main"], [role="log"]');
                if (conversationArea) {
                    const blocks = conversationArea.querySelectorAll('.prose, .markdown, p, article');
                    const withText = Array.from(blocks).filter(el => (el.textContent || '').trim().length > 20);
                    if (withText.length > 0) msgs = withText;
                }
            }
            if (msgs.length > 0) {
                clearInterval(interval);
                resolve(msgs);
            }
            if (Date.now() - start > timeout) {
                clearInterval(interval);
                reject("Timed out waiting for messages");
            }
        }, 500);
    });
}

/**
 * Extract uploaded attachments from a Grok user turn by driving the UI:
 * click the file chip → wait for the preview sidebar → click its Download button →
 * let background.js intercept the download → convert to base64. Fragile by nature
 * (it depends on Grok's chip/sidebar markup), so every step degrades gracefully.
 */
async function extractGrokAttachments(userTurnEl) {
    const results = [];
    if (!userTurnEl || !isContextValid()) return results;

    // Chips/media can render inside the bubble or as a sibling in the same turn container.
    const searchRoot = userTurnEl.closest('[data-testid="user-message"]')?.parentElement || userTurnEl;

    // ---- Images: <img> carries a direct src (assets.grok.com/.../content or blob:) ----
    // No sidebar needed — fetch the bytes straight away (background handles cross-origin).
    const seenSrc = new Set();
    const imgs = Array.from(searchRoot.querySelectorAll('img')).filter(img => {
        const src = img.getAttribute('src') || '';
        if (!src || !/^https?:|^blob:/.test(src)) return false;
        const w = img.naturalWidth || img.width || 0;
        if (w && w < 64) return false; // skip icons/avatars
        return true;
    });
    for (const img of imgs) {
        const rawSrc = img.getAttribute('src');
        if (seenSrc.has(rawSrc)) continue;
        seenSrc.add(rawSrc);
        // Grok renders a low-res ".../preview-image" inline; the full asset lives at
        // ".../content". Prefer the full version, fall back to whatever the img had.
        const src = rawSrc.replace(/\/preview-image(\?|$)/, '/content$1');
        let base64 = null;
        let mime = 'image/png';
        let name = (img.getAttribute('alt') || '').trim() || `image_${results.length + 1}.png`;
        try {
            if (src.startsWith('blob:')) {
                const r = await fetch(src);
                if (r.ok) { const blob = await r.blob(); base64 = await mmBlobToBase64(blob); mime = blob.type || mime; }
            } else if (isContextValid()) {
                let bg = await chrome.runtime.sendMessage({ type: "downloadAttachment", payload: { url: src } });
                // If the normalized /content URL failed, retry with the original src
                if ((!bg || !bg.success || !bg.base64) && src !== rawSrc) {
                    bg = await chrome.runtime.sendMessage({ type: "downloadAttachment", payload: { url: rawSrc } });
                }
                if (bg?.success && bg.base64) { base64 = bg.base64; mime = bg.mime || mime; }
            }
        } catch (e) {
            console.warn(`[Grok] image fetch failed for ${name}`, e);
        }
        if (base64) {
            results.push({ type: 'image', filename: name, mime, base64 });
        }
    }

    // ---- File chips (PDF/doc): must open the preview sidebar and click Download ----
    const openBtns = Array.from(searchRoot.querySelectorAll('button[aria-label="Open attachment"]'));

    for (const openBtn of openBtns) {
        const nameEl = openBtn.querySelector('span.truncate') || openBtn.querySelector('span');
        let finalName = (nameEl?.textContent || '').trim() || 'attachment';

        try {
            // 1. Open the attachment preview sidebar
            openBtn.click();

            // 2. Poll for the sidebar's Download button (max ~5s)
            let downloadBtn = null;
            for (let i = 0; i < 50; i++) {
                const candidate = document.querySelector('button[aria-label="Download"]');
                if (candidate && candidate.getBoundingClientRect().width > 0) { downloadBtn = candidate; break; }
                await mmWait(100);
            }
            if (!downloadBtn) {
                console.warn(`[Grok] Download button not found for ${finalName}`);
                continue;
            }

            // 3. Arm BOTH capture paths, then click Download:
            //    - Primary: page-world blob interceptor (grok-inserter.js) reads the
            //      bytes at blob-creation time, beating Grok's immediate revoke.
            //    - Fallback: background download interception.
            const fileCapturePromise = new Promise(resolve => {
                const handler = (e) => {
                    if (e.detail && e.detail.base64) {
                        window.removeEventListener('CAPSULE_GROK_FILE_DATA', handler);
                        resolve({ data: e.detail.base64, mime: e.detail.mime });
                    }
                };
                window.addEventListener('CAPSULE_GROK_FILE_DATA', handler);
            });
            window.dispatchEvent(new CustomEvent('GROK_START_BLOB_CAPTURE'));
            const downloadPromise = chrome.runtime.sendMessage({ action: "expectDownload" });
            await mmWait(200); // let both interceptors register before the download fires
            downloadBtn.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true, view: window }));
            downloadBtn.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true, view: window }));
            downloadBtn.click();

            // 4. Take whichever capture path resolves first
            let finalBase64 = null;
            let finalMime = mimeFromFilename(finalName, 'application/octet-stream');

            const captured = await Promise.race([fileCapturePromise, mmWait(8000).then(() => null)]);
            window.dispatchEvent(new CustomEvent('GROK_STOP_BLOB_CAPTURE'));

            if (captured && captured.data) {
                finalBase64 = captured.data; // full data: URL (background strips the prefix)
                finalMime = (captured.mime || finalMime).split(';')[0].trim();
            } else {
                // Fallback: background download interception (base64 or a blob: URL to fetch)
                const res = await Promise.race([downloadPromise, mmWait(1000).then(() => ({ success: false }))]);
                if (res?.success) {
                    if (res.base64) {
                        finalBase64 = res.base64;
                        finalMime = res.mime || finalMime;
                        if (res.filename) finalName = res.filename;
                    } else if (res.type === 'blob_url' && res.url) {
                        try {
                            const r = await fetch(res.url);
                            if (r.ok) {
                                const blob = await r.blob();
                                finalBase64 = await mmBlobToBase64(blob);
                                finalMime = blob.type || res.mime || finalMime;
                            }
                        } catch (e) {
                            console.warn(`[Grok] blob_url fetch failed for ${finalName}`, e);
                        }
                    }
                }
            }

            if (finalBase64) {
                results.push({
                    type: isPdfMime(finalMime) ? 'pdf' : (isImageMime(finalMime) ? 'image' : 'file'),
                    filename: finalName,
                    mime: finalMime,
                    base64: finalBase64
                });
            } else {
                console.warn(`[Grok] Could not capture bytes for ${finalName}`);
            }
        } catch (e) {
            console.error(`[Grok] attachment extraction failed for ${finalName}`, e);
        } finally {
            // 5. Close the sidebar so the next chip opens cleanly (button, else Escape)
            const closeBtn = document.querySelector('button[aria-label="Close"], button[aria-label*="Close" i]');
            if (closeBtn && closeBtn.getBoundingClientRect().width > 0) {
                closeBtn.click();
            } else {
                document.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Escape', code: 'Escape', keyCode: 27 }));
            }
            await mmWait(300);
        }
    }
    return results;
}

async function getMessagesFromGrok(options = { includeAttachments: true }) {
    const history = [];
    const includeAttachments = options.includeAttachments !== false;

    // Select both surfaces: user turns carry [data-testid="user-message"]; every turn
    // (user + Grok) wraps its text in .response-content-markdown. We skip the markdown
    // that's nested inside a user bubble so each turn is counted exactly once.
    let elements = Array.from(document.querySelectorAll('[data-testid="user-message"], .response-content-markdown'));

    // Fallback: collect substantial text blocks from the conversation area
    if (elements.length === 0) {
        const conversationArea = document.querySelector('main, [role="main"], [role="log"]') || document.body;
        const blocks = Array.from(conversationArea.querySelectorAll('.prose, .markdown, p, article, [class*="message"], [class*="response"]'));
        elements = blocks.filter(el => {
            const text = (el.textContent || '').trim();
            return text.length > 10 && !['BUTTON', 'NAV', 'HEADER', 'FOOTER'].includes(el.tagName);
        });
    }

    if (elements.length === 0) {
        console.warn("⚠️ [Grok] No message elements found.");
        return history;
    }

    // Sort in DOM order
    const sortedElements = elements.sort((a, b) => {
        try {
            return (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING) ? -1 : 1;
        } catch (e) { return 0; }
    });

    for (const el of sortedElements) {
        const isUserBubble = el.getAttribute('data-testid') === 'user-message';
        // Skip the markdown nested inside a user bubble — its parent bubble already covers it.
        if (!isUserBubble && el.closest && el.closest('[data-testid="user-message"]')) continue;

        let text = (el.getAttribute('data-capsule-text') || el.innerText || el.textContent || '').trim();
        const role = isUserBubble ? 'user' : 'model';

        // Extract attachments for user turns (drives the chip/sidebar UI)
        let attachments = [];
        if (includeAttachments && isUserBubble) {
            try { attachments = await extractGrokAttachments(el); } catch (e) { /* non-fatal */ }
        }

        // Keep the turn if it has text OR attachments (attachment-only messages are valid)
        if ((!text || text.length < 3) && attachments.length === 0) continue;
        if (text && text.length < 10 && /^[\W\d]+$/.test(text) && attachments.length === 0) continue;
        if (text && history.length > 0 && history[history.length - 1].text === text && attachments.length === 0) continue;

        history.push({ role, text, attachments });
    }
    return history;
}

/**********************************************************
 * NEW CHAT MAPPING WATCHER (Shared)
 **********************************************************/
let pendingCapsuleId = null;
let watcherInterval = null;

function startConversationIdWatcher() {
    if (watcherInterval) return;

    watcherInterval = setInterval(() => {
        const convoId = getConversationId();
        if (convoId && pendingCapsuleId) {
            finalizeMapping(pendingCapsuleId, convoId);
            stopConversationIdWatcher();
        }
    }, 2000); // Check every 2s

    // Also stop after 2 minutes to avoid indefinite polling
    setTimeout(() => {
        if (watcherInterval) {
            stopConversationIdWatcher();
        }
    }, 120000);
}

function stopConversationIdWatcher() {
    if (watcherInterval) {
        clearInterval(watcherInterval);
        watcherInterval = null;
    }
}

function finalizeMapping(capsuleId, conversationId) {
    // Also store locally so version-choice fires for dropped capsules
    chrome.storage.local.get("localConvoMappings", ({ localConvoMappings = {} }) => {
        localConvoMappings[conversationId] = capsuleId;
        chrome.storage.local.set({ localConvoMappings });
    });

    chrome.runtime.sendMessage({
        type: "getCapsule",
        payload: { capsuleId, conversationId }
    }, (res) => {
        if (res?.success) {
            pendingCapsuleId = null;
        } else {
            console.error("⚠️ [Mapping] Finalization failed:", res?.error);
        }
    });
}

/**********************************************************
 * LOVABLE EXTRACTION
 **********************************************************/
async function getMessagesFromLovable(options = { scope: document }) {
    const scope = options.scope || document;
    // Respect includeAttachments flag (false when called from fast filter for speed)
    const includeAttachments = options.includeAttachments !== false;
    // Lovable uses Tiptap/ProseMirror for input, and usually standard list for messages.
    // We'll target the prose containers in the sidebar.
    const turnElements = Array.from(scope.querySelectorAll('.prose, .markdown, div[role="presentation"]'))
        .filter(el => {
            // Avoid code preview blocks or very short UI elements
            return el.innerText.length > 3 && !el.closest('pre');
        });

    const messages = [];
    for (const turn of turnElements) {
        // Determine role: User messages are usually associated with a user avatar or aligned differently.
        const isUser = turn.closest('.justify-end') || turn.parentElement.innerText.includes('You');
        const role = isUser ? 'user' : 'assistant';
        const text = turn.innerText.trim();
        if (text) {
            messages.push({ role, text, attachments: [] });
        }
    }

    // ── Phase 2: File attachment extraction ──────────────────────────────────
    // Only runs when includeAttachments is true (skipped for fast filter calls).
    if (includeAttachments) {
        // Lovable's builder posts downloadable file cards in the left chat panel.
        // Confirmed selector: div.flex.w-full.items-center.gap-2.p-3 containing
        //   span.text-sm.leading-none (filename) + span.uppercase (extension badge).
        // Clicking the card fires a tokenized fetch: filename.ext?_lovable_token=...
        // The lovable-inserter.js interceptor captures this URL and fires a custom event.
        const fileCards = Array.from(document.querySelectorAll(
            'div.flex.w-full.items-center.gap-2.p-3'
        )).filter(div =>
            div.querySelector('span.text-xs.uppercase') &&      // extension badge present
            div.querySelector('span.text-sm.leading-none')      // filename span present
        );

        for (const card of fileCards) {
            const filename = card.querySelector('span.text-sm.leading-none')?.innerText?.trim();
            const ext = card.querySelector('span.uppercase')?.innerText?.trim()?.toLowerCase();
            if (!filename || !ext) continue;

            // Build full filename (e.g. "King In Battle" + "txt" → "King In Battle.txt")
            const fullName = filename.toLowerCase().endsWith(`.${ext}`) ? filename : `${filename}.${ext}`;

            // Click the card → Lovable opens file in right panel as an iframe
            // (confirmed URL pattern: [project].lovable.app/__l5e/documents/[file]?__lovable_token=...)
            const clickTarget = card.closest('button') || card.closest('[role="button"]') || card;
            clickTarget.click();

            // Poll for the iframe that Lovable injects to preview the file
            const iframeSrc = await new Promise((resolve) => {
                let attempts = 0;
                const poll = setInterval(() => {
                    // Match iframes whose src is on lovable.app with a token
                    const iframe = document.querySelector('iframe[src*="lovable.app"][src*="lovable_token"]');
                    if (iframe?.src) {
                        clearInterval(poll);
                        resolve(iframe.src);
                    }
                    if (++attempts >= 20) { // 10 seconds max
                        clearInterval(poll);
                        resolve(null);
                    }
                }, 500);
            });

            if (!iframeSrc) {
                console.warn(`[Capsule] Lovable iframe not found for: ${fullName}`);
                continue;
            }

            // Ask page world (lovable-inserter.js) to fetch the URL — page world has CORS access
            const fileData = await new Promise((resolve) => {
                let captured = false;

                const handler = (e) => {
                    if (captured) return;
                    captured = true;
                    window.removeEventListener('CAPSULE_LOVABLE_FILE_CONTENT', handler);
                    const { base64, contentType } = e.detail;
                    resolve(base64 ? { data: `data:${contentType};base64,${base64}`, mime: contentType } : null);
                };

                window.addEventListener('CAPSULE_LOVABLE_FILE_CONTENT', handler);
                window.dispatchEvent(new CustomEvent('CAPSULE_LOVABLE_FETCH_URL', { detail: { url: iframeSrc } }));

                // 8-second timeout — resolve null so capsule generation is never blocked
                setTimeout(() => {
                    if (!captured) {
                        captured = true;
                        window.removeEventListener('CAPSULE_LOVABLE_FILE_CONTENT', handler);
                        console.warn(`[Capsule] Lovable file fetch timed out for: ${fullName}`);
                        resolve(null);
                    }
                }, 8000);
            });

            if (fileData?.data) {
                const mime = mimeFromFilename(fullName, fileData.mime);
                const attachment = {
                    type: isPdfMime(mime) ? 'pdf' : 'file',
                    filename: fullName,
                    mime,
                    base64: fileData.data
                };
                // Attach to the last assistant message; if none exists, create a stub entry
                const lastAssistant = [...messages].reverse().find(m => m.role === 'assistant');
                if (lastAssistant) {
                    lastAssistant.attachments.push(attachment);
                } else {
                    messages.push({ role: 'assistant', text: `[File: ${fullName}]`, attachments: [attachment] });
                }
            }

            // Brief gap between cards to avoid race conditions on rapid UI updates
            await new Promise(r => setTimeout(r, 800));
        }
    } // end includeAttachments guard
    // ── End Phase 2 ──────────────────────────────────────────────────────────

    return messages;
}


async function waitForMessagesFromLovable(timeout = 10000, scope = document) {
    return new Promise((resolve, reject) => {
        const start = Date.now();
        const interval = setInterval(() => {
            const messages = scope.querySelectorAll('.prose, .markdown');
            if (messages.length > 0) {
                clearInterval(interval);
                resolve(messages);
            }
            if (Date.now() - start > timeout) {
                clearInterval(interval);
                reject('Timed out waiting for Lovable messages');
            }
        }, 500);
    });
}

/* ===== REPLIT UTILS ===== */
async function waitForMessagesFromReplit(timeout = 10000, scope = document) {
    return new Promise((resolve) => {
        const start = Date.now();
        const interval = setInterval(() => {
            const messages = scope.querySelectorAll(
                '[class*="useMessages-module"], [class*="UserMessage-module"], [class*="Text-module__multiline"], [class*="Text-module__text"]'
            );
            if (messages.length > 0 || Date.now() - start > timeout) {
                clearInterval(interval);
                resolve(Array.from(messages));
            }
        }, 500);
    });
}

async function getMessagesFromReplit(options = { scope: document, includeAttachments: true }) {
    const scope = options.scope || document;
    const includeAttachments = options.includeAttachments !== false;
    const messages = [];

    // ── Strategy 1: Target identified Replit Message Container ──
    const messagesSection = scope.querySelector('[class*="useMessages-module__ln2wrG__container"]') ||
        scope.querySelector('section[aria-label*="Messages"]');

    let turnElements = [];

    if (messagesSection) {
        // Find individual message turns inside the container
        // We look for LI elements or UserMessage blocks
        turnElements = Array.from(messagesSection.querySelectorAll(
            'li, [class*="UserMessage-module"], [class*="Text-module__multiline"], [class*="Text-module__text"]'
        ));
    }

    // ── Strategy 2: Fallback to all identified text/message classes across the page ──
    if (turnElements.length === 0) {
        turnElements = Array.from(scope.querySelectorAll(
            '[class*="UserMessage-module"], [class*="EventRenderer-module__ECGMXG__userMessage"], ' +
            '[class*="Text-module__multiline"], [class*="Text-module__text"], ' +
            '[data-cy="chat-message"]'
        ));
    }

    // De-duplicate: Ensure we don't have nested elements (e.g. text inside a message bubble)
    const filtered = turnElements.filter((el, _, arr) =>
        !arr.some(other => other !== el && other.contains(el))
    );

    for (const turn of filtered) {
        const text = (turn.innerText || turn.textContent || '').trim();
        if (!text || text.length < 2) continue;

        // Skip obvious UI noise
        if (text.includes('Checkpoint made') || text.includes('Planning scriptwriting')) continue;
        if (messages.length > 0 && messages[messages.length - 1].text === text) continue;

        // Role detection:
        // Use the exact class hashes found to identify User messages
        const isUser = !!(
            turn.closest('[class*="UserMessage-module"]') ||
            turn.closest('[class*="userMessage"]') ||
            turn.closest('.justify-end') ||
            (turn.className || '').includes('userMessage')
        );
        const role = isUser ? 'user' : 'assistant';

        const attachments = [];
        if (includeAttachments) {
            const imgs = Array.from(turn.querySelectorAll('img')).filter(img => {
                const w = img.naturalWidth || img.width || 0;
                return w > 50 && !img.src.includes('avatar') && !img.src.includes('logo');
            });
            for (const img of imgs) {
                try {
                    const result = await mmFetchBlobAsBase64(img.src);
                    if (result.data) {
                        attachments.push({
                            type: 'image',
                            filename: `replit_img.png`,
                            mime: result.mime || 'image/png',
                            base64: result.data
                        });
                    }
                } catch (e) { }
            }
        }

        messages.push({ role, text, attachments });
    }

    return messages;
}

/* ===== OUTLOOK UTILS ===== */
async function getMessagesFromOutlook(options = { includeAttachments: true }) {
    const messages = [];
    const scopeEl = options.scope || document;

    // 1. Get Subject
    const subjectEl = scopeEl.querySelector('div[role="main"] h1, div[aria-label="Subject"], .QBy00, [data-test-id="message-subject"], .Fk_vG');
    const subject = subjectEl ? subjectEl.textContent.trim() : "No Subject";

    // 2. Get Messages (Outlook often displays a single message or a conversational thread)
    const bodyContainers = scopeEl.querySelectorAll('div[aria-label="Message body"], div.x_Print, .allowTextSelection, [data-test-id="message-body-container"], .rps_a');

    if (bodyContainers.length === 0) {
        const mainPane = scopeEl.querySelector('div[role="main"], #ReadingPaneContainerId');
        if (mainPane) {
            messages.push({
                role: 'user',
                text: `Subject: ${subject}\n\nContent:\n${(mainPane.innerText || mainPane.textContent || "").trim().substring(0, 5000)}`,
                attachments: await getOutlookAttachments(scopeEl)
            });
        }
    } else {
        for (const container of Array.from(bodyContainers)) {
            const parentRegion = container.closest('div[role="region"]') || container.parentElement;

            // Extraction

            const senderEl = parentRegion ? parentRegion.querySelector('div[aria-label^="From:"]') : null;
            const sender = senderEl ? senderEl.getAttribute('aria-label')?.replace('From: ', '') || "Unknown Sender" : "Unknown Sender";

            messages.push({
                role: 'user',
                text: `From: ${sender}\n\n${(container.innerText || container.textContent || "").trim()}`,
                attachments: await getOutlookAttachments(parentRegion || container)
            });
        }
    }
    return messages;
}

async function getOutlookAttachments(scopeEl) {
    const attachments = [];
    if (!scopeEl) return attachments;
    const attachmentItems = scopeEl.querySelectorAll('div[aria-label^="Attachment: "], div[role="listitem"]:has(button[aria-label*="Download"])');

    for (const item of Array.from(attachmentItems)) {
        try {
            let filename = "attachment";
            const label = item.getAttribute('aria-label');
            if (label && label.startsWith('Attachment: ')) {
                filename = label.replace('Attachment: ', '');
            } else {
                const nameEl = item.querySelector('span[title], div[title]');
                if (nameEl) filename = nameEl.getAttribute('title') || nameEl.textContent.trim();
            }
            attachments.push({
                type: 'file',
                filename: filename,
                mime: mimeFromFilename(filename, 'application/octet-stream'),
                isPlaceholder: true
            });
        } catch (e) {
            console.error("[OUTLOOK-DEBUG] Attachment capture fail:", e);
        }
    }
    return attachments;
}

/* ===== EMERGENT UTILS ===== */
async function waitForMessagesFromEmergent(timeout = 10000) {
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
        const hasContent = document.body.innerText.length > 50;
        if (hasContent) return true;
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    return false;
}

async function getMessagesFromEmergent(options = { scope: document, includeAttachments: true }) {
    let result = [];
    const scope = options.scope || document;

    // Emergent text extraction logic (heuristic fallback)
    const walker = document.createTreeWalker(scope.body, NodeFilter.SHOW_TEXT, null, false);
    let node;
    let fullText = "";
    while (node = walker.nextNode()) {
        if (node.nodeValue.trim()) fullText += node.nodeValue.trim() + "\n";
    }

    // Add predictive URL if on the chat page
    let tabUrl = "";
    const activeTab = document.querySelector('.active-tab') || document.querySelector('[class*="active"]');
    if (activeTab && activeTab.textContent) {
        const tabName = activeTab.textContent.trim().split(" ")[0]; // basic cleanup
        if (tabName.length > 3) {
            tabUrl = `https://${tabName}.preview.emergentagent.com/?utm_source=share`;
        }
    }

    result.push({
        role: "user",
        content: fullText.substring(0, 5000), // Limit size for safety
        attachment_links: tabUrl ? [tabUrl] : []
    });

    return result;
}

/* ===== NOTEBOOKLM UTILS ===== */
function waitForMessagesFromNotebookLM(timeout = 15000) {
    return new Promise((resolve, reject) => {
        const start = Date.now();
        const interval = setInterval(() => {
            const msgs = document.querySelectorAll('.from-user-message-inner-content, .from-model-message-inner-content, [class*="user-message"], [class*="model-message"], [class*="response-container"], [class*="query-response"]');
            if (msgs.length > 0) {
                clearInterval(interval);
                resolve(msgs);
            }
            if (Date.now() - start > timeout) {
                clearInterval(interval);
                reject("Timed out waiting for messages");
            }
        }, 500);
    });
}

async function scrapeAllNotebookLMSources() {
    const attachments = [];

    // 1. Get the list of all source titles while on the main sources panel
    const sourceButtons = Array.from(document.querySelectorAll('.source-stretched-button'));
    const sourceTitles = sourceButtons.map(btn => btn.getAttribute('aria-label')).filter(Boolean);
    
    console.log(`[NotebookLM Scraping] Found ${sourceTitles.length} sources to scrape:`, sourceTitles);

    for (const title of sourceTitles) {
        console.log(`[NotebookLM Scraping] Opening source: ${title}`);
        
        // Find the button again (since the DOM might have refreshed)
        const btn = Array.from(document.querySelectorAll('.source-stretched-button'))
            .find(b => b.getAttribute('aria-label') === title);

        if (!btn) {
            console.warn(`[NotebookLM Scraping] Source button for "${title}" not found.`);
            continue;
        }

        // Click the source to open it
        btn.click();

        // Wait for the document viewer to load (.scroll-area should be present and text loaded)
        let scrollArea = null;
        for (let attempt = 0; attempt < 25; attempt++) {
            scrollArea = document.querySelector('.scroll-area');
            if (scrollArea && scrollArea.textContent.trim().length > 0) {
                break;
            }
            await new Promise(r => setTimeout(r, 200));
        }

        if (!scrollArea) {
            console.warn(`[NotebookLM Scraping] scroll-area for "${title}" failed to load.`);
            continue;
        }

        // Scrape the scroll-area with programmatic scrolling
        console.log(`[NotebookLM Scraping] Scraping text for: ${title}`);
        let sourceText = "";
        let lastScrollTop = -1;
        const seenParagraphs = new Set();
        const paragraphsText = [];

        // Scroll back to top first just in case
        scrollArea.scrollTop = 0;
        await new Promise(r => setTimeout(r, 100));

        while (scrollArea.scrollTop !== lastScrollTop) {
            lastScrollTop = scrollArea.scrollTop;

            const textElements = Array.from(scrollArea.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, pre, code, [class*="paragraph"], [class*="text"]'));
            textElements.forEach(el => {
                const t = el.textContent ? el.textContent.trim() : '';
                if (t && t.length > 5 && !seenParagraphs.has(t)) {
                    seenParagraphs.add(t);
                    paragraphsText.push(t);
                }
            });

            scrollArea.scrollTop += 600;
            await new Promise(r => setTimeout(r, 150));
        }

        sourceText = paragraphsText.join("\n\n");
        console.log(`[NotebookLM Scraping] Scraped ${sourceText.length} characters for: ${title}`);

        if (sourceText) {
            // Convert text to base64 data URI format for capsule attachment
            const base64Content = btoa(unescape(encodeURIComponent(sourceText)));
            const mime = "text/plain";
            
            // Strip any existing extensions like .pdf or .docx and always save as a text file
            let cleanTitle = title;
            if (cleanTitle.toLowerCase().endsWith(".pdf")) {
                cleanTitle = cleanTitle.slice(0, -4);
            } else if (cleanTitle.toLowerCase().endsWith(".docx")) {
                cleanTitle = cleanTitle.slice(0, -5);
            } else if (cleanTitle.toLowerCase().endsWith(".txt")) {
                cleanTitle = cleanTitle.slice(0, -4);
            }
            const filename = `${cleanTitle}.txt`;

            attachments.push({
                type: "file",
                filename: filename,
                mime: mime,
                base64: `data:${mime};base64,${base64Content}`
            });
        }

        // Go back to the sources list
        const backBtn = Array.from(document.querySelectorAll('span, button, div, a'))
            .find(el => el.textContent.trim() === 'Sources' && el.offsetParent !== null);
        
        if (backBtn) {
            backBtn.click();
            console.log(`[NotebookLM Scraping] Clicked Back to Sources`);
        } else {
            console.warn(`[NotebookLM Scraping] Back button "Sources" not found! Trying history back.`);
            window.history.back();
        }

        // Wait for the sources panel to load again
        let returned = false;
        for (let attempt = 0; attempt < 25; attempt++) {
            if (document.querySelector('.source-stretched-button')) {
                returned = true;
                break;
            }
            await new Promise(r => setTimeout(r, 200));
        }

        if (!returned) {
            console.error(`[NotebookLM Scraping] Failed to return to sources list after scraping "${title}".`);
            break;
        }

        // Wait a small buffer before clicking the next source
        await new Promise(r => setTimeout(r, 300));
    }

    console.log(`[NotebookLM Scraping] Completed scraping. Total attachments: ${attachments.length}`);
    return attachments;
}

async function getMessagesFromNotebookLM() {
    const messages = [];

    // Extract sources panel full text contents as base64 attachments
    let sourcesAttachments = [];
    try {
        sourcesAttachments = await scrapeAllNotebookLMSources();
    } catch (err) {
        console.error("❌ [NotebookLM Scraping] Failed during traversal:", err);
    }

    if (sourcesAttachments.length > 0) {
        messages.push({
            role: 'system',
            text: `[NotebookLM Source Panel Files - Extracted ${sourcesAttachments.length} documents]`,
            attachments: sourcesAttachments
        });
    }

    // Select both user and model message containers in DOM order
    const elements = Array.from(document.querySelectorAll('.from-user-message-inner-content, .from-model-message-inner-content, [class*="user-message"], [class*="model-message"], [class*="response-container"], [class*="query-response"]'))
        .filter((el, index, self) => !self.some((other, otherIdx) => otherIdx !== index && other.contains(el)));

    for (const el of elements) {
        let role = 'unknown';
        const className = (el.className || '').toLowerCase();
        
        if (className.includes('user-message') || className.includes('from-user') || el.closest('[class*="user-message"]')) {
            role = 'user';
        } else if (className.includes('model-message') || className.includes('from-model') || className.includes('response') || el.closest('[class*="model-message"]') || el.closest('[class*="response"]')) {
            role = 'assistant';
        }

        const text = el.textContent ? el.textContent.trim() : '';
        if (text) {
            messages.push({ role, text, attachments: [] });
        }
    }
    return messages;
}

