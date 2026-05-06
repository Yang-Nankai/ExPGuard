/**
 * 获取节点的代码片段
 */
export declare function getCodeSnippet(code: string, node: any, contextChars?: number): {
    snippet: string;
    startOffset: number;
    endOffset: number;
} | null;
/**
 * 格式化代码片段，高亮节点部分
 */
export declare function formatCodeSnippet(code: string, startOffset: number, endOffset: number, options?: {
    maxLength?: number;
    ellipsis?: boolean;
    highlightMarkers?: {
        start: string;
        end: string;
    };
}): string;
