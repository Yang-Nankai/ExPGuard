"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCodeSnippet = getCodeSnippet;
exports.formatCodeSnippet = formatCodeSnippet;
/**
 * 获取节点的代码片段
 */
function getCodeSnippet(code, node, contextChars = 50) {
    if (!code || !node)
        return null;
    const range = node.range;
    if (!range || !Array.isArray(range) || range.length !== 2) {
        return null;
    }
    const [nodeStart, nodeEnd] = range;
    // 确保位置有效
    if (nodeStart < 0 || nodeEnd > code.length || nodeStart >= nodeEnd) {
        return null;
    }
    // 计算扩展后的范围
    const snippetStart = Math.max(0, nodeStart - contextChars);
    const snippetEnd = Math.min(code.length, nodeEnd + contextChars);
    // 获取代码片段
    const snippet = code.substring(snippetStart, snippetEnd);
    // 计算节点在片段中的相对偏移
    const nodeOffsetInSnippet = nodeStart - snippetStart;
    const nodeLength = nodeEnd - nodeStart;
    return {
        snippet,
        startOffset: nodeOffsetInSnippet,
        endOffset: nodeOffsetInSnippet + nodeLength
    };
}
/**
 * 格式化代码片段，高亮节点部分
 */
function formatCodeSnippet(code, startOffset, endOffset, options = {}) {
    const { maxLength = 200, ellipsis = true, highlightMarkers = { start: ">>>", end: "<<<" } } = options;
    // 验证偏移量
    if (startOffset < 0 ||
        endOffset <= startOffset ||
        endOffset > code.length) {
        // 无效的偏移量，直接返回代码
        if (code.length > maxLength && ellipsis) {
            return code.substring(0, maxLength) + "...";
        }
        return code;
    }
    const before = code.substring(0, startOffset);
    const nodeCode = code.substring(startOffset, endOffset);
    const after = code.substring(endOffset);
    // 如果代码太长，只显示部分
    if (code.length > maxLength) {
        const halfMax = Math.floor(maxLength / 2);
        const remainingChars = maxLength - (nodeCode.length + highlightMarkers.start.length + highlightMarkers.end.length);
        if (remainingChars <= 0) {
            // 节点代码本身就超过了最大长度
            if (ellipsis) {
                return highlightMarkers.start + nodeCode.substring(0, maxLength - 10) + "..." + highlightMarkers.end;
            }
            return highlightMarkers.start + nodeCode.substring(0, maxLength) + highlightMarkers.end;
        }
        const beforeChars = Math.floor(remainingChars / 2);
        const afterChars = remainingChars - beforeChars;
        const beforeTruncated = before.length > beforeChars
            ? (ellipsis ? "..." : "") + before.substring(before.length - beforeChars)
            : before;
        const afterTruncated = after.length > afterChars
            ? after.substring(0, afterChars) + (ellipsis ? "..." : "")
            : after;
        return beforeTruncated + highlightMarkers.start + nodeCode + highlightMarkers.end + afterTruncated;
    }
    return before + highlightMarkers.start + nodeCode + highlightMarkers.end + after;
}
