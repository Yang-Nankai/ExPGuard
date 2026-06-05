import fs from "fs";
import AdmZip from "adm-zip";
import path from "path";
import { Errors } from "../utils/errorCode";
import logger from "../utils/logger";

/**
 * XpiExtractor — unpacks a Firefox extension (`.xpi`).
 *
 * An XPI is a plain ZIP archive (with an extra `META-INF/` signing directory),
 * unlike a CRX which prepends a binary `Cr24` header + signature. So extraction
 * is just "unzip and confirm manifest.json exists" — no header parsing.
 */
export class XpiExtractor {
  private xpiPath: string;
  private outputPath: string;
  private xpiBuffer: Buffer;
  private manifest: Record<string, any> | null = null;

  constructor(xpiPath: string, outputPath: string) {
    if (!fs.existsSync(xpiPath)) {
      Errors.LoaderError(`XPI path ${xpiPath} does not exist.`);
    }

    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
    }

    this.xpiPath = xpiPath;
    this.outputPath = outputPath;
    this.xpiBuffer = fs.readFileSync(this.xpiPath);
  }

  /**
   * Unpack the XPI to the output directory.
   */
  async extract() {
    const zip = new AdmZip(this.xpiBuffer);

    zip.getEntries().forEach((entry) => {
      const entryPath = path.join(this.outputPath, entry.entryName);

      if (entry.isDirectory) {
        fs.mkdirSync(entryPath, { recursive: true });
      } else {
        fs.mkdirSync(path.dirname(entryPath), { recursive: true });
        fs.writeFileSync(entryPath, entry.getData());
      }
    });

    const manifestPath = path.join(this.outputPath, "manifest.json");
    if (!fs.existsSync(manifestPath)) {
      Errors.LoaderError(
        "manifest.json not found in XPI archive, maybe corrupted or not a valid extension."
      );
    }

    try {
      this.manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
    } catch {
      Errors.LoaderError(`Failed to parse manifest.json at ${manifestPath}`);
    }
  }

  /**
   * Parsed manifest (available after `extract()`).
   */
  getManifest(): Record<string, any> | null {
    return this.manifest;
  }

  /**
   * Firefox extension ID, read from the manifest's gecko settings.
   * MV3 uses `browser_specific_settings.gecko.id`; MV2 historically used
   * `applications.gecko.id`. Returns null if neither is present (Firefox
   * allows temporary add-ons without an explicit ID).
   */
  getExtensionId(): string | null {
    const m = this.manifest;
    if (!m) return null;
    return (
      m.browser_specific_settings?.gecko?.id ??
      m.applications?.gecko?.id ??
      null
    );
  }

  getOutputPath(): string {
    return this.outputPath;
  }

  getXpiPath(): string {
    return this.xpiPath;
  }
}
