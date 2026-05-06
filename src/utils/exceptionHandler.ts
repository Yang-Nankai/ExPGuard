// exceptionhandler.ts
import logger from "./logger";

interface LoggedError {
  errorMsg?: string;
  error: Error;
}

let totalErrors: LoggedError[] = [];

export function handleException(error: Error, infoMsg?: string, errorMsg?: string) {
  if (infoMsg) logger.info(infoMsg);
  if (errorMsg) logger.error(errorMsg);
  if (error) logger.error(error);

  totalErrors.push({ errorMsg, error });
}

export function clearTotalErrors(): void {
  totalErrors = [];
}

export function outputTotalErrors(): void {
  totalErrors.forEach(item => {
    if (item.errorMsg) logger.info(item.errorMsg);
    logger.info(item.error);
  });
}
