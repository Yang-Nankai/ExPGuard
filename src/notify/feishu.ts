// feishu.ts
//
// Minimal Feishu (Lark) custom-bot webhook client. Sends interactive cards so a
// batch run can surface live progress and a final summary in a chat. Zero new
// dependencies: uses follow-redirects https (same as the CRX downloader) and
// honors the configured proxy. All failures are swallowed (logged) — a webhook
// outage must never abort an analysis batch.
//
// Feishu custom-bot signing (optional): if a secret is configured, each request
// is signed with timestamp + HMAC-SHA256 per Feishu's spec.

import crypto from "crypto";
import http from "http";
import https from "https";
import { HttpsProxyAgent } from "https-proxy-agent";
import config from "../config";
import logger from "../utils/logger";

export interface FeishuConfig {
  webhook: string;
  /** Optional signing secret (custom-bot "签名校验"). */
  secret?: string;
}

interface FeishuResponse {
  code?: number;
  msg?: string;
  StatusCode?: number;
}

/** Compute Feishu's timestamp+secret HMAC-SHA256 signature (base64). */
function sign(secret: string, timestampSec: number): string {
  // Per Feishu spec the HMAC key is `${timestamp}\n${secret}` and the message
  // is empty.
  const stringToSign = `${timestampSec}\n${secret}`;
  const hmac = crypto.createHmac("sha256", stringToSign);
  hmac.update("");
  return hmac.digest("base64");
}

/** POST a raw JSON payload to the webhook. Resolves even on HTTP/biz error. */
function postJson(
  webhook: string,
  payload: Record<string, unknown>,
): Promise<FeishuResponse | null> {
  return new Promise((resolve) => {
    let url: URL;
    try {
      url = new URL(webhook);
    } catch {
      logger.error(`[FEISHU] Invalid webhook URL: ${webhook}`);
      return resolve(null);
    }

    const body = JSON.stringify(payload);
    const isHttps = url.protocol === "https:";
    const transport = isHttps ? https : http;
    const req = transport.request(
      {
        method: "POST",
        protocol: url.protocol,
        hostname: url.hostname,
        port: url.port || undefined,
        path: url.pathname + url.search,
        timeout: config.retryTimeoutMs,
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body),
        },
        // Only proxy real https traffic; never tunnel a localhost/test webhook.
        agent:
          isHttps && config.proxies?.https
            ? new HttpsProxyAgent(config.proxies.https)
            : undefined,
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            const parsed = data ? (JSON.parse(data) as FeishuResponse) : {};
            if (parsed.code && parsed.code !== 0) {
              logger.warn(
                `[FEISHU] webhook returned code=${parsed.code} msg=${parsed.msg}`,
              );
            }
            resolve(parsed);
          } catch {
            resolve(null);
          }
        });
      },
    );

    req.on("error", (err) => {
      logger.error(`[FEISHU] POST failed: ${String(err)}`);
      resolve(null);
    });
    req.on("timeout", () => req.destroy(new Error("Feishu webhook timeout")));

    req.write(body);
    req.end();
  });
}

/**
 * Feishu notifier. Construct with a webhook (+ optional secret), then push
 * interactive cards. Disabled (no-op) when no webhook is configured.
 */
export class FeishuNotifier {
  private readonly webhook?: string;
  private readonly secret?: string;

  constructor(cfg?: Partial<FeishuConfig>) {
    this.webhook = cfg?.webhook;
    this.secret = cfg?.secret;
  }

  get enabled(): boolean {
    return !!this.webhook;
  }

  /** Send an interactive card. Returns true on apparent success. */
  async sendCard(card: Record<string, unknown>): Promise<boolean> {
    if (!this.webhook) return false;

    const payload: Record<string, unknown> = {
      msg_type: "interactive",
      card,
    };

    if (this.secret) {
      const ts = Math.floor(nowMs() / 1000);
      payload.timestamp = String(ts);
      payload.sign = sign(this.secret, ts);
    }

    const res = await postJson(this.webhook, payload);
    return !!res && (res.code === 0 || res.code === undefined);
  }

  /** Send a plain-text message (fallback / simple notices). */
  async sendText(text: string): Promise<boolean> {
    if (!this.webhook) return false;
    const payload: Record<string, unknown> = {
      msg_type: "text",
      content: { text },
    };
    if (this.secret) {
      const ts = Math.floor(nowMs() / 1000);
      payload.timestamp = String(ts);
      payload.sign = sign(this.secret, ts);
    }
    const res = await postJson(this.webhook, payload);
    return !!res && (res.code === 0 || res.code === undefined);
  }
}

// Date.now is wrapped so signing stays testable / mockable.
function nowMs(): number {
  return Date.now();
}
