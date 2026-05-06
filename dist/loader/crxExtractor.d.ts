/**
 * CrxExtractor class to extract CRX files
 */
export declare class CrxExtractor {
    private crxPath;
    private outputPath;
    private crxBuffer;
    private extensionId;
    constructor(crxPath: string, outputPath: string);
    /**
     * Verify and parse CRX header, return ZIP data offset
     */
    private parseCrxHeader;
    /**
     * Unpack CRX to output directory
     */
    extract(): Promise<void>;
    /**
     * Get extension ID from CRX file(CRX2/CRX3 supported)
     */
    getExtensionId(): string | null;
    getOutputPath(): string;
    getCrxPath(): string;
}
