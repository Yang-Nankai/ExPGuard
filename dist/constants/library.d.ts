export interface LibraryFileRule {
    /** Logical library name */
    builtinName: string;
    /** Filename match rule */
    regex: RegExp;
    /** Global entry objects (optional, for verification) */
    entryObjects?: string[];
    /** Whether this library should be ignored */
    ignore?: boolean;
}
export declare const LIBRARY_FILE_NAMES: Record<string, LibraryFileRule>;
export declare function detectLibraryByFilename(filename: string): LibraryFileRule | null;
