import fs from "fs";
import AdmZip from "adm-zip";
import path from "path";
import crypto from "crypto";
import protobuf from "protobufjs";
import { Errors } from "../utils/errorCode";
import logger from "../utils/logger";

const HEX_TO_ALPHA = "abcdefghijklmnop";

/**
 * CrxExtractor class to extract CRX files
 */
export class CrxExtractor {
  private crxPath: string;
  private outputPath: string;
  // private manifestData: Record<string, any> | null = null;
  private crxBuffer: Buffer;
  private extensionId: string | null = null;

  constructor(crxPath: string, outputPath: string) {
    if (!fs.existsSync(crxPath)) {
      Errors.LoaderError(`CRX path ${crxPath} does not exist.`);
    }

    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
    }

    this.crxPath = crxPath;
    this.outputPath = outputPath;
    this.crxBuffer = fs.readFileSync(this.crxPath);
  }

  /**
   * Verify and parse CRX header, return ZIP data offset
   */
  private parseCrxHeader(): number {
    const magic = this.crxBuffer.slice(0, 4).toString("utf-8");
    if (magic !== "Cr24") {
      Errors.LoaderError(`Invalid CRX file magic header.`);
    }

    const version = this.crxBuffer.readUInt32LE(4);
    if (version === 2) {
      const pubKeyLen = this.crxBuffer.readUInt32LE(8);
      const sigLen = this.crxBuffer.readUInt32LE(12);
      return 16 + pubKeyLen + sigLen;
    } else if (version === 3) {
      const headerSize = this.crxBuffer.readUInt32LE(8);
      return 12 + headerSize;
    } else {
      throw Errors.LoaderError(`Unsupported CRX version: ${version}.`);
    }
  }

  /**
   * Unpack CRX to output directory
   */
  async extract() {
    const zipStartOffset = this.parseCrxHeader();
    const zipBuffer = this.crxBuffer.slice(zipStartOffset);
    const zip = new AdmZip(zipBuffer);

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
        "manifest.json not found in CRX archive, maybe cracked or not a valid extension."
      );
    }
  }

  /**
   * Get extension ID from CRX file(CRX2/CRX3 supported)
   */
  getExtensionId(): string | null {
    if (this.extensionId) return this.extensionId;

    try {
      const version = this.crxBuffer.readUInt32LE(4);
      if (version === 2) {
        const pubKeyLen = this.crxBuffer.readUInt32LE(8);
        const pubKey = this.crxBuffer.slice(16, 16 + pubKeyLen);
        this.extensionId = computeExtensionId(pubKey);
      } else if (version === 3) {
        this.extensionId = extractCrx3Id(this.crxBuffer);
      } else {
        this.extensionId = null;
      }
    } catch {
      this.extensionId = null;
    }

    return this.extensionId;
  }

  getOutputPath(): string {
    return this.outputPath;
  }

  getCrxPath(): string {
    return this.crxPath;
  }
}

/**
 * Compute CRX extension ID from public key (correct Chrome logic)
 */
function computeExtensionId(pubKey: Buffer): string {
  const hashHex = crypto.createHash("sha256").update(pubKey).digest("hex");
  return hashHex
    .slice(0, 32)
    .split("")
    .map((ch) => HEX_TO_ALPHA[parseInt(ch, 16)])
    .join("");
}

/**
 * Extract extension ID from CRX3 file
 */
function extractCrx3Id(crxBuffer: Buffer): string | null {
  const headerSize = crxBuffer.readUInt32LE(8);
  const headerBuf = crxBuffer.slice(12, 12 + headerSize);

  // Define CRX3's protobuf structure
  const protoSchema = `
    syntax = "proto2";
    message CrxFileHeader {
      repeated AsymmetricKeyProof sha256_with_rsa = 2;
      repeated AsymmetricKeyProof sha256_with_ecdsa = 3;
      optional bytes signed_header_data = 10000;
    }
    message AsymmetricKeyProof {
      optional bytes public_key = 1;
      optional bytes signature = 2;
    }
    message SignedData {
      optional bytes crx_id = 1;
    }
  `;

  // Parse protobuf
  const root = protobuf.parse(protoSchema).root;
  const CrxFileHeader = root.lookupType("CrxFileHeader");
  const SignedData = root.lookupType("SignedData");

  try {
    const header = CrxFileHeader.decode(headerBuf) as any;

    // Get signed_header_data and parse as SignedData
    let crxIdBin: Buffer | null = null;
    if (header.signedHeaderData) {
      const signedData = SignedData.decode(header.signedHeaderData) as any;
      if (signedData.crxId && signedData.crxId.length === 16) {
        crxIdBin = Buffer.from(signedData.crxId);
      }
    }

    // collect public keys
    const publicKeys: Buffer[] = [];

    // add RSA public keys
    if (header.sha256WithRsa) {
      for (const proof of header.sha256WithRsa) {
        if (proof.publicKey) {
          publicKeys.push(Buffer.from(proof.publicKey));
        }
      }
    }

    // add ECDSA public keys
    if (header.sha256WithEcdsa) {
      for (const proof of header.sha256WithEcdsa) {
        if (proof.publicKey) {
          publicKeys.push(Buffer.from(proof.publicKey));
        }
      }
    }

    // if no crxId or public keys, return null
    if (!crxIdBin || publicKeys.length === 0) {
      return null;
    }

    const crxIdHex = crxIdBin.toString("hex");

    // look for matching public key
    for (const pubKey of publicKeys) {
      const sha256sum = crypto
        .createHash("sha256")
        .update(pubKey)
        .digest("hex");
      if (sha256sum.substring(0, 32) === crxIdHex) {
        return computeExtensionId(pubKey);
      }
    }

    return null;
  } catch (error) {
    logger.error("(extractCrx3Id) Error parsing CRX3 header:", error);
    return null;
  }
}
