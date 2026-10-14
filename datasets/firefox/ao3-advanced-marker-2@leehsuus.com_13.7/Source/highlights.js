// highlights.js — Core Highlight Engine (Serialization, Reconstruction, Application)
// Phase 2: Text Highlights for PRO users
// This file is self-contained: no UI logic. Only the pure engine.

// ============================================================
// 1. TEXT NODE WALKER
// ============================================================

/**
 * Collects all text nodes inside a container in document order.
 * Skips <script>, <style>, and existing <mark.ao3-pro-highlight> wrappers
 * (we read through them — their child text nodes are included).
 * @param {Node} root - The container element (e.g. div.userstuff)
 * @returns {Text[]} Ordered array of Text nodes
 */
function getTextNodes(root) {
    const nodes = [];
    const walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode(node) {
                // Skip text inside script/style tags
                const parent = node.parentNode;
                if (parent && (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE')) {
                    return NodeFilter.FILTER_REJECT;
                }
                return NodeFilter.FILTER_ACCEPT;
            }
        }
    );
    let current;
    while ((current = walker.nextNode())) {
        nodes.push(current);
    }
    return nodes;
}

/**
 * Builds the full flat text string from a container and returns
 * both the string and a mapping array that ties each character
 * offset back to a specific (textNode, localOffset) pair.
 *
 * @param {Element} container
 * @returns {{ flatText: string, map: Array<{node: Text, offset: number}> }}
 */
function buildFlatTextMap(container) {
    const textNodes = getTextNodes(container);
    let flatText = '';
    const map = []; // map[charIndex] = { node, offset }

    for (const node of textNodes) {
        const content = node.nodeValue;
        for (let i = 0; i < content.length; i++) {
            map.push({ node, offset: i });
        }
        flatText += content;
    }
    return { flatText, map };
}

/**
 * Given a flat‑text character index and the map from buildFlatTextMap,
 * returns the DOM position { node: Text, offset: number }.
 *
 * @param {Array<{node: Text, offset: number}>} map
 * @param {number} charIndex
 * @returns {{ node: Text, offset: number }}
 */
function charIndexToDOM(map, charIndex) {
    if (charIndex < 0 || charIndex >= map.length) {
        // Clamp to boundaries
        const clamped = Math.max(0, Math.min(charIndex, map.length - 1));
        return map[clamped];
    }
    return map[charIndex];
}

// ============================================================
// 2. SERIALIZATION — window.getSelection() → storable object
// ============================================================

const CONTEXT_CHARS = 30; // chars of prefix/suffix context
const PARAGRAPH_PREFIX_CHARS = 50;

/**
 * Finds the nearest block-level ancestor of a node and returns its
 * index among siblings of the same type within the container.
 * This provides a stable paragraph anchor for fallback matching.
 *
 * @param {Node} node
 * @param {Element} container
 * @returns {{ index: number, text: string }}
 */
function getParagraphInfo(node, container) {
    // Walk up to find the nearest block element
    let block = node;
    const blockTags = new Set([
        'P', 'DIV', 'BLOCKQUOTE', 'LI', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6',
        'PRE', 'SECTION', 'ARTICLE', 'HEADER', 'FOOTER', 'ASIDE', 'DD', 'DT'
    ]);

    while (block && block !== container) {
        if (block.nodeType === Node.ELEMENT_NODE && blockTags.has(block.tagName)) {
            break;
        }
        block = block.parentNode;
    }

    if (!block || block === container) {
        return { index: 0, text: '' };
    }

    // Count this block's index among all block children of the container
    const allBlocks = container.querySelectorAll(
        Array.from(blockTags).join(',')
    );
    let index = 0;
    for (let i = 0; i < allBlocks.length; i++) {
        if (allBlocks[i] === block) {
            index = i;
            break;
        }
    }

    const fullText = (block.textContent || '').replace(/\s+/g, ' ').trim();
    return {
        index,
        text: fullText.substring(0, PARAGRAPH_PREFIX_CHARS)
    };
}

/**
 * Serializes the current Range into a storable highlight descriptor.
 *
 * @param {Range} range - The user's selection range
 * @param {Element} container - The story content container (div.userstuff)
 * @returns {Object|null} The highlight descriptor, or null if invalid
 */
function serializeSelection(range, container) {
    if (!range || range.collapsed) return null;

    // Ensure the selection is within the container
    if (!container.contains(range.startContainer) || !container.contains(range.endContainer)) {
        return null;
    }

    const selectedText = range.toString();
    if (!selectedText || selectedText.trim().length === 0) return null;

    // Build flat text map for context extraction
    const { flatText, map } = buildFlatTextMap(container);

    // Locate where the selected text begins in the flat string.
    // We need to map the Range's start position to a flat‑text index.
    const startCharIndex = findCharIndexFromDOM(map, range.startContainer, range.startOffset);
    if (startCharIndex === -1) return null;

    // Extract prefix and suffix from the flat text
    const prefixStart = Math.max(0, startCharIndex - CONTEXT_CHARS);
    const prefix = flatText.substring(prefixStart, startCharIndex);

    const endCharIndex = startCharIndex + selectedText.length;
    const suffix = flatText.substring(endCharIndex, endCharIndex + CONTEXT_CHARS);

    // Get paragraph info for fallback
    const paraInfo = getParagraphInfo(range.startContainer, container);

    // Generate unique ID
    const id = 'h_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);

    return {
        id,
        text: selectedText,
        prefix,
        suffix,
        paragraphIndex: paraInfo.index,
        paragraphText: paraInfo.text,
        color: '#fff59d',
        createdAt: Date.now()
    };
}

/**
 * Given the map from buildFlatTextMap and a DOM position (node + offset),
 * returns the corresponding flat‑text character index.
 *
 * @param {Array<{node: Text, offset: number}>} map
 * @param {Node} node - The DOM node (must be a Text node or its parent)
 * @param {number} offset - The offset within that node
 * @returns {number} The flat‑text character index, or -1 if not found
 */
function findCharIndexFromDOM(map, node, offset) {
    // If node is an Element, the offset refers to child index.
    // Convert to the text node at that child position.
    let targetNode = node;
    let targetOffset = offset;

    if (node.nodeType === Node.ELEMENT_NODE) {
        // offset is the child index — find the text node at that position
        if (offset < node.childNodes.length) {
            targetNode = node.childNodes[offset];
            targetOffset = 0;
        } else if (offset > 0 && offset === node.childNodes.length) {
            // End of element — use last child's end
            const lastChild = node.childNodes[offset - 1];
            if (lastChild.nodeType === Node.TEXT_NODE) {
                targetNode = lastChild;
                targetOffset = lastChild.nodeValue.length;
            } else {
                // Walk into the last child to find its last text node
                const innerNodes = getTextNodes(lastChild);
                if (innerNodes.length > 0) {
                    targetNode = innerNodes[innerNodes.length - 1];
                    targetOffset = targetNode.nodeValue.length;
                } else {
                    return -1;
                }
            }
        } else {
            return -1;
        }
    }

    // If we landed on an element (e.g. <br>), walk to next text node
    if (targetNode.nodeType !== Node.TEXT_NODE) {
        const textNodes = getTextNodes(targetNode);
        if (textNodes.length > 0) {
            targetNode = textNodes[0];
            targetOffset = 0;
        } else {
            return -1;
        }
    }

    // Search the map for this node + offset
    for (let i = 0; i < map.length; i++) {
        if (map[i].node === targetNode && map[i].offset === targetOffset) {
            return i;
        }
    }

    // Fallback: find first occurrence of this node in map and add offset
    for (let i = 0; i < map.length; i++) {
        if (map[i].node === targetNode && map[i].offset === 0) {
            return i + targetOffset;
        }
    }

    return -1;
}

// ============================================================
// 3. RECONSTRUCTION — stored descriptors → DOM highlights
// ============================================================

/**
 * Reconstructs all saved highlights by finding their positions in the
 * current DOM and applying visual marks.
 *
 * @param {Element} container - The story content container (div.userstuff)
 * @param {Array} highlights - Array of highlight descriptors
 * @returns {{ applied: number, orphaned: number }}
 */
function reconstructHighlights(container, highlights) {
    if (!highlights || highlights.length === 0) return { applied: 0, orphaned: 0 };

    let applied = 0;
    let orphaned = 0;

    // Build the flat text map once for all highlights
    const { flatText, map } = buildFlatTextMap(container);

    for (const hl of highlights) {
        const matchIndex = findHighlightPosition(flatText, map, hl, container);

        if (matchIndex === -1) {
            orphaned++;
            safeLog(`[Highlights] Orphaned highlight: "${hl.text.substring(0, 30)}..."`);
            continue;
        }

        // Convert flat‑text match to a DOM Range
        const range = flatTextRangeToDOM(map, matchIndex, matchIndex + hl.text.length);
        if (!range) {
            orphaned++;
            continue;
        }

        applyHighlightToRange(range, hl.id, hl.color || 'yellow');
        applied++;

        // --- Minimap/Ghost Track Integration ---
        const firstMark = document.querySelector(`mark.ao3-pro-highlight[data-hl-id="${hl.id}"]`);
        const track = document.getElementById('ao3-scrollbar-track');
        if (firstMark && track) {
            const absoluteTop = firstMark.getBoundingClientRect().top + window.scrollY;
            const percentage = (absoluteTop / document.documentElement.scrollHeight) * 100;
            const marker = document.createElement('div');
            marker.className = 'ao3-scroll-marker';
            marker.dataset.hlId = hl.id;
            
            if (hl.color && hl.color.startsWith('#')) {
                marker.style.backgroundColor = hl.color;
            } else {
                marker.classList.add(`ao3-hl-mark-${hl.color || 'yellow'}`);
            }
            
            marker.style.top = percentage + '%';
            track.appendChild(marker);
        }
    }

    safeLog(`[Highlights] Reconstruction complete: ${applied} applied, ${orphaned} orphaned`);
    return { applied, orphaned };
}

/**
 * Searches for a highlight's position in the flat text using the
 * prefix + text + suffix fingerprint, with fallback strategies.
 *
 * @param {string} flatText
 * @param {Array} map
 * @param {Object} hl - Highlight descriptor
 * @param {Element} container
 * @returns {number} The character index where `hl.text` starts, or -1
 */
function findHighlightPosition(flatText, map, hl, container) {
    const { text, prefix, suffix } = hl;

    // --- Strategy 1: Exact fingerprint match (prefix + text + suffix) ---
    const fingerprint = prefix + text + suffix;
    const fpIndex = flatText.indexOf(fingerprint);
    if (fpIndex !== -1) {
        return fpIndex + prefix.length;
    }

    // --- Strategy 2: prefix + text (suffix may have changed) ---
    const prefixText = prefix + text;
    const ptIndex = flatText.indexOf(prefixText);
    if (ptIndex !== -1) {
        return ptIndex + prefix.length;
    }

    // --- Strategy 3: text + suffix (prefix may have changed) ---
    const textSuffix = text + suffix;
    const tsIndex = flatText.indexOf(textSuffix);
    if (tsIndex !== -1) {
        return tsIndex;
    }

    // --- Strategy 4: Exact text match (check uniqueness) ---
    const firstOccurrence = flatText.indexOf(text);
    if (firstOccurrence !== -1) {
        const secondOccurrence = flatText.indexOf(text, firstOccurrence + 1);
        if (secondOccurrence === -1) {
            // Unique match — safe to use
            return firstOccurrence;
        }

        // Multiple matches: use paragraph info to disambiguate
        return disambiguateByParagraph(flatText, map, hl, container);
    }

    // --- Strategy 5: Paragraph-based fallback ---
    return disambiguateByParagraph(flatText, map, hl, container);
}

/**
 * When multiple matches exist or no direct match, use paragraph anchor
 * to narrow down the search to a specific region of the text.
 *
 * @param {string} flatText
 * @param {Array} map
 * @param {Object} hl
 * @param {Element} container
 * @returns {number} Character index or -1
 */
function disambiguateByParagraph(flatText, map, hl, container) {
    const blockTags = 'P, DIV, BLOCKQUOTE, LI, H1, H2, H3, H4, H5, H6, PRE, SECTION, ARTICLE';
    const allBlocks = container.querySelectorAll(blockTags);

    if (hl.paragraphIndex >= allBlocks.length) return -1;

    const targetBlock = allBlocks[hl.paragraphIndex];
    if (!targetBlock) return -1;

    // Verify paragraph identity using paragraphText prefix
    const blockText = (targetBlock.textContent || '').replace(/\s+/g, ' ').trim();
    const storedPrefix = (hl.paragraphText || '').substring(0, 20);

    // Check if this block's text starts similarly
    if (storedPrefix && !blockText.substring(0, 30).includes(storedPrefix.substring(0, 15))) {
        // Paragraph shifted — try adjacent blocks
        for (let delta = -2; delta <= 2; delta++) {
            if (delta === 0) continue;
            const adjIdx = hl.paragraphIndex + delta;
            if (adjIdx < 0 || adjIdx >= allBlocks.length) continue;

            const adjBlock = allBlocks[adjIdx];
            const adjText = (adjBlock.textContent || '').replace(/\s+/g, ' ').trim();
            if (adjText.substring(0, 30).includes(storedPrefix.substring(0, 15))) {
                // Found the shifted paragraph
                const localIdx = adjText.indexOf(hl.text);
                if (localIdx !== -1) {
                    return findBlockStartInFlatText(flatText, adjText) + localIdx;
                }
            }
        }
        return -1;
    }

    // Search within this block's text range in the flat string
    const blockStartInFlat = findBlockStartInFlatText(flatText, blockText);
    if (blockStartInFlat === -1) return -1;

    const localIdx = blockText.indexOf(hl.text);
    if (localIdx !== -1) {
        return blockStartInFlat + localIdx;
    }

    return -1;
}

/**
 * Finds where a block's text content begins in the flat text.
 * Uses a prefix of the block text for matching.
 *
 * @param {string} flatText
 * @param {string} blockText - The normalized text of the block element
 * @returns {number} Char index in flatText or -1
 */
function findBlockStartInFlatText(flatText, blockText) {
    if (!blockText || blockText.length === 0) return -1;

    // Use first 40 chars of block as search key (enough to be unique)
    const searchKey = blockText.substring(0, Math.min(40, blockText.length));

    // Normalize whitespace in flat text for comparison
    // We can't normalize the whole flat text (offsets would drift),
    // so we scan for approximate match
    let searchPos = 0;
    while (searchPos < flatText.length) {
        const idx = flatText.indexOf(searchKey.charAt(0), searchPos);
        if (idx === -1) return -1;

        // Try to match the search key starting from idx
        let fi = idx;
        let si = 0;
        let matched = true;

        while (si < searchKey.length && fi < flatText.length) {
            if (flatText[fi] === searchKey[si]) {
                fi++;
                si++;
            } else if (/\s/.test(flatText[fi]) && /\s/.test(searchKey[si])) {
                // Both whitespace — skip
                fi++;
                si++;
            } else {
                matched = false;
                break;
            }
        }

        if (matched && si === searchKey.length) {
            return idx;
        }

        searchPos = idx + 1;
    }

    return -1;
}

/**
 * Converts a flat‑text range [startCharIndex, endCharIndex) into a DOM Range.
 *
 * @param {Array<{node: Text, offset: number}>} map
 * @param {number} start - Start char index (inclusive)
 * @param {number} end   - End char index (exclusive)
 * @returns {Range|null}
 */
function flatTextRangeToDOM(map, start, end) {
    if (start < 0 || end > map.length || start >= end) return null;

    const startPos = map[start];
    // End is exclusive, so we need the position AFTER the last included char
    const endEntry = map[end - 1];

    if (!startPos || !endEntry) return null;

    try {
        const range = document.createRange();
        range.setStart(startPos.node, startPos.offset);
        range.setEnd(endEntry.node, endEntry.offset + 1);
        return range;
    } catch (e) {
        safeLog('[Highlights] Error creating range:', e);
        return null;
    }
}

// ============================================================
// 4. APPLYING — Range → visual <mark> wrappers
// ============================================================

/**
 * Applies a visual highlight to a DOM Range by wrapping the content
 * in <mark> elements. Correctly handles ranges that cross multiple
 * text nodes and inline HTML elements.
 *
 * Strategy: We iterate over all text nodes within the range and wrap
 * each affected segment individually. This avoids the pitfalls of
 * Range.surroundContents() which fails on partial element selections.
 *
 * @param {Range} range - The DOM Range to highlight
 * @param {string} highlightId - Unique ID for this highlight
 * @param {string} color - CSS background color
 */
function applyHighlightToRange(range, highlightId, color) {
    // Collect all text nodes within the range
    const textNodes = getTextNodesInRange(range);
    if (textNodes.length === 0) return;

    for (const { node, startOffset, endOffset } of textNodes) {
        wrapTextSegment(node, startOffset, endOffset, highlightId, color);
    }
}

/**
 * Finds all text nodes (or portions of them) that fall within a Range.
 * Returns an array of { node, startOffset, endOffset } descriptors.
 *
 * @param {Range} range
 * @returns {Array<{node: Text, startOffset: number, endOffset: number}>}
 */
function getTextNodesInRange(range) {
    const result = [];
    const startContainer = range.startContainer;
    const endContainer = range.endContainer;
    const startOffset = range.startOffset;
    const endOffset = range.endOffset;

    // Simple case: range is entirely within one text node
    if (startContainer === endContainer && startContainer.nodeType === Node.TEXT_NODE) {
        result.push({ node: startContainer, startOffset, endOffset });
        return result;
    }

    // Complex case: range spans multiple nodes
    // Get the common ancestor and walk all text nodes within
    const commonAncestor = range.commonAncestorContainer;
    const allTextNodes = getTextNodes(
        commonAncestor.nodeType === Node.TEXT_NODE
            ? commonAncestor.parentNode
            : commonAncestor
    );

    let inRange = false;
    for (const textNode of allTextNodes) {
        if (textNode === startContainer) {
            // First node: starts at startOffset, goes to end of node
            inRange = true;
            if (textNode.nodeType === Node.TEXT_NODE) {
                result.push({
                    node: textNode,
                    startOffset: startOffset,
                    endOffset: textNode.nodeValue.length
                });
            }
            // If start and end are the same node (already handled above, but safety)
            if (textNode === endContainer) {
                result[result.length - 1].endOffset = endOffset;
                break;
            }
            continue;
        }

        if (textNode === endContainer) {
            // Last node: starts at 0, ends at endOffset
            if (textNode.nodeType === Node.TEXT_NODE) {
                result.push({
                    node: textNode,
                    startOffset: 0,
                    endOffset: endOffset
                });
            }
            break;
        }

        if (inRange) {
            // Middle nodes: fully included
            if (textNode.nodeType === Node.TEXT_NODE) {
                result.push({
                    node: textNode,
                    startOffset: 0,
                    endOffset: textNode.nodeValue.length
                });
            }
        }
    }

    return result;
}

/**
 * Wraps a segment of a text node in a <mark> element.
 * Splits the text node if necessary (when only part of it is highlighted).
 *
 * @param {Text} textNode
 * @param {number} start - Start offset within this text node
 * @param {number} end   - End offset within this text node
 * @param {string} highlightId
 * @param {string} color
 */
function wrapTextSegment(textNode, start, end, highlightId, color) {
    if (start >= end) return;
    if (!textNode || textNode.nodeType !== Node.TEXT_NODE) return;

    const text = textNode.nodeValue;
    if (start >= text.length) return;

    // Clamp end to actual text length
    const safeEnd = Math.min(end, text.length);

    // Check if this text node is already inside a highlight mark
    const parent = textNode.parentNode;
    if (parent && parent.tagName === 'MARK' && parent.classList.contains('ao3-pro-highlight')) {
        return; // Already highlighted, skip
    }

    // Split the text node to isolate the segment to highlight
    // Original: [0 ... start ... end ... length]
    // After:    [before][highlighted][after]

    let targetNode = textNode;

    // Split off "before" portion
    if (start > 0) {
        targetNode = textNode.splitText(start);
        // Now targetNode starts at position `start` and textNode is [0..start)
    }

    // Split off "after" portion
    const highlightLength = safeEnd - start;
    if (highlightLength < targetNode.nodeValue.length) {
        targetNode.splitText(highlightLength);
        // Now targetNode is [start..end) and the rest is the after portion
    }

    // Create the <mark> wrapper
    const mark = document.createElement('mark');
    mark.className = 'ao3-pro-highlight';
    mark.setAttribute('data-hl-id', highlightId);
    
    // Support new multi-color classes or fallback to old hex colors
    if (color && color.startsWith('#')) {
        mark.style.backgroundColor = color;
    } else {
        mark.classList.add(`ao3-hl-mark-${color || 'yellow'}`);
    }

    // Insert the mark and move the text into it
    targetNode.parentNode.insertBefore(mark, targetNode);
    mark.appendChild(targetNode);
}

// ============================================================
// 5. REMOVAL — unwrap a highlight by ID
// ============================================================

/**
 * Removes a highlight from the DOM by unwrapping all <mark> elements
 * with the given highlight ID. Also normalizes adjacent text nodes.
 *
 * @param {string} highlightId
 */
function removeHighlightById(highlightId) {
    const marks = document.querySelectorAll(`mark.ao3-pro-highlight[data-hl-id="${highlightId}"]`);

    marks.forEach(mark => {
        const parent = mark.parentNode;
        if (!parent) return;

        // Move all children out of the mark
        while (mark.firstChild) {
            parent.insertBefore(mark.firstChild, mark);
        }
        parent.removeChild(mark);

        // Normalize to merge adjacent text nodes
        parent.normalize();
    });
}

// ============================================================
// 6. EXPORTS — Expose functions for content.js
// ============================================================

window.highlights = {
    serializeSelection,
    reconstructHighlights,
    applyHighlightToRange,
    removeHighlightById
};
