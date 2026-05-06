"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrxExtractor = void 0;
const fs_1 = __importDefault(require("fs"));
const adm_zip_1 = __importDefault(require("adm-zip"));
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
const protobufjs_1 = __importDefault(require("protobufjs"));
const errorCode_1 = require("../utils/errorCode");
const logger_1 = __importDefault(require("../utils/logger"));
const HEX_TO_ALPHA = "abcdefghijklmnop";
/**
 * CrxExtractor class to extract CRX files
 */
class CrxExtractor {
    constructor(crxPath, outputPath) {
        this.extensionId = null;
        if (!fs_1.default.existsSync(crxPath)) {
            errorCode_1.Errors.LoaderError(`CRX path ${crxPath} does not exist.`);
        }
        if (!fs_1.default.existsSync(outputPath)) {
            fs_1.default.mkdirSync(outputPath, { recursive: true });
        }
        this.crxPath = crxPath;
        this.outputPath = outputPath;
        this.crxBuffer = fs_1.default.readFileSync(this.crxPath);
    }
    /**
     * Verify and parse CRX header, return ZIP data offset
     */
    parseCrxHeader() {
        const magic = this.crxBuffer.slice(0, 4).toString("utf-8");
        if (magic !== "Cr24") {
            errorCode_1.Errors.LoaderError(`Invalid CRX file magic header.`);
        }
        const version = this.crxBuffer.readUInt32LE(4);
        if (version === 2) {
            const pubKeyLen = this.crxBuffer.readUInt32LE(8);
            const sigLen = this.crxBuffer.readUInt32LE(12);
            return 16 + pubKeyLen + sigLen;
        }
        else if (version === 3) {
            const headerSize = this.crxBuffer.readUInt32LE(8);
            return 12 + headerSize;
        }
        else {
            throw errorCode_1.Errors.LoaderError(`Unsupported CRX version: ${version}.`);
        }
    }
    /**
     * Unpack CRX to output directory
     */
    extract() {
        return __awaiter(this, void 0, void 0, function* () {
            const zipStartOffset = this.parseCrxHeader();
            const zipBuffer = this.crxBuffer.slice(zipStartOffset);
            const zip = new adm_zip_1.default(zipBuffer);
            zip.getEntries().forEach((entry) => {
                const entryPath = path_1.default.join(this.outputPath, entry.entryName);
                if (entry.isDirectory) {
                    fs_1.default.mkdirSync(entryPath, { recursive: true });
                }
                else {
                    fs_1.default.mkdirSync(path_1.default.dirname(entryPath), { recursive: true });
                    fs_1.default.writeFileSync(entryPath, entry.getData());
                }
            });
            const manifestPath = path_1.default.join(this.outputPath, "manifest.json");
            if (!fs_1.default.existsSync(manifestPath)) {
                errorCode_1.Errors.LoaderError("manifest.json not found in CRX archive, maybe cracked or not a valid extension.");
            }
        });
    }
    /**
     * Get extension ID from CRX file(CRX2/CRX3 supported)
     */
    getExtensionId() {
        if (this.extensionId)
            return this.extensionId;
        try {
            const version = this.crxBuffer.readUInt32LE(4);
            if (version === 2) {
                const pubKeyLen = this.crxBuffer.readUInt32LE(8);
                const pubKey = this.crxBuffer.slice(16, 16 + pubKeyLen);
                this.extensionId = computeExtensionId(pubKey);
            }
            else if (version === 3) {
                this.extensionId = extractCrx3Id(this.crxBuffer);
            }
            else {
                this.extensionId = null;
            }
        }
        catch (_a) {
            this.extensionId = null;
        }
        return this.extensionId;
    }
    getOutputPath() {
        return this.outputPath;
    }
    getCrxPath() {
        return this.crxPath;
    }
}
exports.CrxExtractor = CrxExtractor;
/**
 * Compute CRX extension ID from public key (correct Chrome logic)
 */
function computeExtensionId(pubKey) {
    const hashHex = crypto_1.default.createHash("sha256").update(pubKey).digest("hex");
    return hashHex
        .slice(0, 32)
        .split("")
        .map((ch) => HEX_TO_ALPHA[parseInt(ch, 16)])
        .join("");
}
/**
 * Extract extension ID from CRX3 file
 */
function extractCrx3Id(crxBuffer) {
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
    const root = protobufjs_1.default.parse(protoSchema).root;
    const CrxFileHeader = root.lookupType("CrxFileHeader");
    const SignedData = root.lookupType("SignedData");
    try {
        const header = CrxFileHeader.decode(headerBuf);
        // Get signed_header_data and parse as SignedData
        let crxIdBin = null;
        if (header.signedHeaderData) {
            const signedData = SignedData.decode(header.signedHeaderData);
            if (signedData.crxId && signedData.crxId.length === 16) {
                crxIdBin = Buffer.from(signedData.crxId);
            }
        }
        // collect public keys
        const publicKeys = [];
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
            const sha256sum = crypto_1.default
                .createHash("sha256")
                .update(pubKey)
                .digest("hex");
            if (sha256sum.substring(0, 32) === crxIdHex) {
                return computeExtensionId(pubKey);
            }
        }
        return null;
    }
    catch (error) {
        logger_1.default.error("(extractCrx3Id) Error parsing CRX3 header:", error);
        return null;
    }
}
