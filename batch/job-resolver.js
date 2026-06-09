"use strict";
/**
 * Job discovery and resolution from different input sources
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveJobsFromDirectory = resolveJobsFromDirectory;
exports.resolveJobsFromJsonl = resolveJobsFromJsonl;
exports.resolveJobs = resolveJobs;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
/**
 * Resolve jobs from a directory containing extension packages.
 * Scans for files matching pattern: <id>.crx, <id>_<version>.crx, <id>.xpi, <id>_<version>.xpi
 */
function resolveJobsFromDirectory(directory, platform) {
    const jobs = [];
    if (!fs_1.default.existsSync(directory)) {
        throw new Error(`Directory not found: ${directory}`);
    }
    const entries = fs_1.default.readdirSync(directory, { withFileTypes: true });
    for (const entry of entries) {
        if (!entry.isFile())
            continue;
        const filename = entry.name;
        const ext = path_1.default.extname(filename).toLowerCase();
        // Determine source type based on platform and file extension
        let sourceType;
        if (platform === "firefox" && ext === ".xpi") {
            sourceType = "XPI";
        }
        else if (platform === "chrome" && ext === ".crx") {
            sourceType = "CRX";
        }
        else {
            continue; // Skip files that don't match platform
        }
        // Extract extension ID and version from filename
        const basename = path_1.default.basename(filename, ext);
        const match = basename.match(/^([^_]+)(?:_(.+))?$/);
        if (match) {
            const extensionId = match[1];
            const extensionVersion = match[2];
            jobs.push({
                sourceType,
                input: path_1.default.join(directory, filename),
                extensionId,
                extensionVersion,
                platform,
            });
        }
    }
    return jobs;
}
/**
 * Resolve jobs from a JSONL file.
 * Each line should be a JSON object with: {id: string, version?: string, path: string}
 */
function resolveJobsFromJsonl(jsonlPath, platform) {
    const jobs = [];
    if (!fs_1.default.existsSync(jsonlPath)) {
        throw new Error(`JSONL file not found: ${jsonlPath}`);
    }
    const content = fs_1.default.readFileSync(jsonlPath, "utf-8");
    const lines = content.split("\n").filter((line) => line.trim());
    for (let i = 0; i < lines.length; i++) {
        try {
            const entry = JSON.parse(lines[i]);
            if (!entry.id || !entry.path) {
                console.warn(`[BATCH] Skipping line ${i + 1}: missing required fields (id, path)`);
                continue;
            }
            if (!fs_1.default.existsSync(entry.path)) {
                console.warn(`[BATCH] Skipping line ${i + 1}: path not found: ${entry.path}`);
                continue;
            }
            // Determine source type based on file extension
            const ext = path_1.default.extname(entry.path).toLowerCase();
            let sourceType;
            if (ext === ".xpi") {
                sourceType = "XPI";
            }
            else if (ext === ".crx") {
                sourceType = "CRX";
            }
            else if (fs_1.default.statSync(entry.path).isDirectory()) {
                sourceType = "DIR";
            }
            else {
                console.warn(`[BATCH] Skipping line ${i + 1}: unsupported file type: ${ext}`);
                continue;
            }
            jobs.push({
                sourceType,
                input: entry.path,
                extensionId: entry.id,
                extensionVersion: entry.version,
                platform,
            });
        }
        catch (err) {
            console.warn(`[BATCH] Skipping line ${i + 1}: invalid JSON: ${err}`);
        }
    }
    return jobs;
}
/**
 * Resolve jobs based on batch options
 */
function resolveJobs(input, sourceMode, platform) {
    if (sourceMode === "directory") {
        return resolveJobsFromDirectory(input, platform);
    }
    else {
        return resolveJobsFromJsonl(input, platform);
    }
}
