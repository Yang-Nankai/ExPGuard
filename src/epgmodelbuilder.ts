import fs from "fs";
import { Options } from "acorn";
import logger from "./utils/logger";
import {
  ExtensionSourceType,
  loadExtensionAsync,
} from "./extension/extensionLoader";
import { Timer } from "./utils/timer";
import path from "path";
import { ExtensionContext } from "./extension/extensionContext";
import { scriptUsageTracker } from "./extension/scriptUsageTracker";

/** =====================================================
 *  EPG Model Builder
 *  ===================================================== */

export interface EPGOptions {
  extensionPath: string;
  extensionType: ExtensionSourceType;
  outputPath: string;
  extensionId: string;
  extensionVersion?: string;
  parseOptions?: Options;
}

export class EPGModelBuilder {
  private _extensionContext: ExtensionContext | null = null;
  private _extensionId: string | null = null;

  /**
   * Unified public entry
   * CLI / runner should ONLY call this
   */
  async analyze(options: EPGOptions): Promise<ExtensionContext> {
    switch (options.extensionType) {
      case ExtensionSourceType.CRX:
        return this.analyzeCRX(options);
      case ExtensionSourceType.DIR:
        return this.analyzeDIR(options);
      case ExtensionSourceType.WEB:
        return this.analyzeWEB(options);
      default:
        throw new Error(`Unsupported extension type: ${options.extensionType}`);
    }
  }

  /** =======================
   * Source-specific wrappers
   * ======================= */

  async analyzeCRX(options: EPGOptions): Promise<ExtensionContext> {
    return this._analyze(options, ExtensionSourceType.CRX);
  }

  async analyzeDIR(options: EPGOptions): Promise<ExtensionContext> {
    return this._analyze(options, ExtensionSourceType.DIR);
  }

  async analyzeWEB(options: EPGOptions): Promise<ExtensionContext> {
    return this._analyze(options, ExtensionSourceType.WEB);
  }

  /** =======================
   * Core implementation
   * ======================= */

  private async _analyze(
    options: EPGOptions,
    sourceType: ExtensionSourceType,
  ): Promise<ExtensionContext> {
    const { extensionPath, outputPath, extensionId, extensionVersion } =
      options;

    scriptUsageTracker.reset();

    // set global extension id
    this._extensionId = extensionId;
    this.cleanOutputDir(outputPath);

    const timer = new Timer(`Analyze ${extensionId}`);
    timer.start();

    logger.info(
      `[EPG] Start analyzing ${extensionId ?? "unknown"}-${extensionVersion ?? "unknown"} (${ExtensionSourceType[sourceType]})`,
    );

    const unpackedPath = path.join(outputPath, "unpacked");

    // Load extension
    const extMeta = await loadExtensionAsync(
      sourceType,
      extensionPath,
      unpackedPath,
      extensionId,
    );

    this._extensionContext = extMeta;

    // Deterministic analysis order
    extMeta.analyzeScriptsInOrder();

    timer.stop();
    logger.info(
      `[EPG DONE] ${extensionId} v${extensionVersion ?? "unknown"} total=${timer.getDuration()}s`,
    );

    return extMeta;
  }

  /**
   * Remove and recreate output directory
   */
  private cleanOutputDir(outputPath: string): void {
    if (fs.existsSync(outputPath)) {
      fs.rmSync(outputPath, { recursive: true, force: true });
    }
    fs.mkdirSync(outputPath, { recursive: true });
  }

  get extensionContext(): ExtensionContext | null {
    return this._extensionContext;
  }

  getExtensionId(): string | null {
    return this._extensionId;
  }
}

export const epgModelBuilder = new EPGModelBuilder();
