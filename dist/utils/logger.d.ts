/**
 * Winston logger setup
 */
import { Logger } from "winston";
/**
 * Create Winston logger
 */
declare const logger: Logger;
/**
 * Dynamically update log file path at runtime
 */
export declare function setLogFile(logFilePath: string): void;
export default logger;
