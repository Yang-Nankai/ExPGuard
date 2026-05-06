import fs from "fs";
import path from "path";
import { HttpsProxyAgent } from "https-proxy-agent";
import { Errors } from "../utils/errorCode";
import { https } from "follow-redirects";
import logger from "../utils/logger";
import { validateChromeOrEdgeExtensionId } from "../utils/validation";
import config from "../config";

/**
 * Sleep for given milliseconds
 */
function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}


function buildDownloadUrl(extensionId: string): string {
  return `https://clients2.google.com/service/update2/crx?response=redirect&prodversion=${config.targetChromeVersion}&acceptformat=crx3,puff&x=id%3D${extensionId}%26uc`;
}

async function downloadOnce(url:string, target: string): Promise<void> {
    await new Promise<void>((resolve, reject) => {
    const stream = fs.createWriteStream(target);
    const req = https.get(
      url,
      {
        timeout: config.retryTimeoutMs,
        agent: config.proxies?.https
          ? new HttpsProxyAgent(config.proxies.https)
          : undefined,
      },
      (res) => {
        if (res.statusCode !== 200) {
          stream.close();
          fs.unlink(target, () => {});
          return reject(new Error(`HTTP ${res.statusCode}`));
        }

        res.pipe(stream);
        stream.on("finish", () => resolve());
      }
    );

    req.on("error", reject);
    req.on("timeout", () =>
      req.destroy(new Error("CRX download timeout"))
    );
  });
}



/**
 * Download CRX from Chrome Web Store
 */
export async function downloadCrxFromCWS(
  extensionId: string,
  downloadDir: string
): Promise<string> {
  if (!validateChromeOrEdgeExtensionId(extensionId)) {
    throw Errors.ValidatorError(`Invalid extensionId: ${extensionId}`);
  }

  fs.mkdirSync(downloadDir, { recursive: true });

  const url = buildDownloadUrl(extensionId);
  const crxPath = path.join(downloadDir, `${extensionId}.crx`);

  for (let i = 1; i <= config.maxRetry; i++) {
    try {
      await downloadOnce(url, crxPath);
      logger.info(`CRX downloaded: ${crxPath}`);
      return crxPath;
    } catch (err) {
      logger.warn(`CRX download attempt ${i} failed: ${err}`);
      if (i === config.maxRetry) {
        throw Errors.LoaderError(
          `Failed to download CRX after ${i} attempts`
        );
      }
      await sleep(config.retryDelayMs);
    }
  }

  throw Errors.LoaderError("Unreachable");
}
