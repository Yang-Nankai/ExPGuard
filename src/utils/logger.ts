/**
 * Winston logger setup
 */

import winston, { format, transports, Logger } from "winston";
import path from "path";
import fs from "fs";
import config from "../config";

/**
 * Ensure log directory exists
 */
function ensureLogDir(logFilePath: string): void {
  const logDir = path.dirname(logFilePath);
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
}

/**
 * Custom log format
 */
const logFormat = format.printf(({ timestamp, level, message }) => {
  return `${timestamp} [${level.toUpperCase()}] ${message}`;
});

/**
 * Current file transport reference
 * Used for dynamic replacement
 */
let fileTransport: transports.FileTransportInstance | null = null;

/**
 * Create Winston logger
 */
const logger: Logger = winston.createLogger({
  level: config.logLevel || "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
    logFormat
  ),
  transports: [
    new transports.Console(),
  ],
});

/**
 * Initialize file logging (optional at startup)
 */
function initFileTransport(logFilePath?: string): void {
  if (!logFilePath) return;

  ensureLogDir(logFilePath);

  fileTransport = new transports.File({
    filename: logFilePath,
  });

  logger.add(fileTransport);
}

// initialize with config value (if provided)
initFileTransport(config.logFile);

/**
 * Dynamically update log file path at runtime
 */
export function setLogFile(logFilePath: string): void {
  ensureLogDir(logFilePath);

  // Remove old file transport if exists
  if (fileTransport) {
    logger.remove(fileTransport);
    fileTransport.close?.();
  }

  // Create and add new file transport
  fileTransport = new transports.File({
    filename: logFilePath,
  });

  logger.add(fileTransport);
}

export default logger;
