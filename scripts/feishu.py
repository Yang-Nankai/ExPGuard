"""Feishu (Lark) custom-bot webhook client + interactive card builders.

Stdlib-only (urllib + hmac/hashlib) so the batch orchestrator carries zero
extra dependencies. Mirrors the design of the old TypeScript notifier:

  - A progress card with a unicode bar, X/N completed, the current extension,
    and running tallies (findings, errors). Re-sent as each extension finishes
    so the chat shows live movement.
  - A summary card with the final per-extension breakdown and totals, colored
    by outcome (green all-clear / orange findings / red errors).

Every network failure is swallowed (logged to stderr) — a webhook outage must
never abort an analysis batch. Honors HTTPS_PROXY for real https webhooks.
"""

from __future__ import annotations

import base64
import hashlib
import hmac
import json
import sys
import time
import urllib.request
from typing import Any, Dict, List, Optional, Sequence

BAR_WIDTH = 20
_MAX_ROWS = 30


def _sign(secret: str, timestamp_sec: int) -> str:
    """Feishu custom-bot signature: HMAC-SHA256 with key ``{ts}\\n{secret}``."""
    string_to_sign = f"{timestamp_sec}\n{secret}"
    digest = hmac.new(string_to_sign.encode("utf-8"), b"", hashlib.sha256).digest()
    return base64.b64encode(digest).decode("utf-8")


class FeishuNotifier:
    """Posts interactive cards to a Feishu custom-bot webhook.

    Disabled (every method is a no-op) when no webhook is configured, so the
    orchestrator can construct one unconditionally.
    """

    def __init__(
        self,
        webhook: Optional[str] = None,
        secret: Optional[str] = None,
        timeout: float = 30.0,
    ) -> None:
        self.webhook = webhook
        self.secret = secret
        self.timeout = timeout

    @property
    def enabled(self) -> bool:
        return bool(self.webhook)

    def send_card(self, card: Dict[str, Any]) -> bool:
        return self._post({"msg_type": "interactive", "card": card})

    def send_text(self, text: str) -> bool:
        return self._post({"msg_type": "text", "content": {"text": text}})

    def _post(self, payload: Dict[str, Any]) -> bool:
        if not self.webhook:
            return False

        if self.secret:
            ts = int(time.time())
            payload["timestamp"] = str(ts)
            payload["sign"] = _sign(self.secret, ts)

        body = json.dumps(payload).encode("utf-8")
        req = urllib.request.Request(
            self.webhook,
            data=body,
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        try:
            # urlopen honors HTTPS_PROXY / HTTP_PROXY from the environment.
            with urllib.request.urlopen(req, timeout=self.timeout) as resp:
                raw = resp.read().decode("utf-8") or "{}"
            parsed = json.loads(raw)
            code = parsed.get("code")
            if code not in (0, None):
                print(
                    f"[FEISHU] webhook returned code={code} msg={parsed.get('msg')}",
                    file=sys.stderr,
                )
            return code in (0, None)
        except Exception as err:  # noqa: BLE001 - never let a webhook break a batch
            print(f"[FEISHU] POST failed: {err}", file=sys.stderr)
            return False


# --------------------------------------------------------------------------
# Card builders (pure functions — easy to unit test).
# --------------------------------------------------------------------------

def _progress_bar(done: int, total: int) -> str:
    if total <= 0:
        return "░" * BAR_WIDTH
    filled = round((done / total) * BAR_WIDTH)
    filled = max(0, min(BAR_WIDTH, filled))
    return "█" * filled + "░" * (BAR_WIDTH - filled)


def _pct(done: int, total: int) -> str:
    if total <= 0:
        return "0%"
    return f"{round((done / total) * 100)}%"


def _fmt_duration(ms: float) -> str:
    s = round(ms / 1000)
    if s < 60:
        return f"{s}s"
    m = s // 60
    return f"{m}m{s % 60:02d}s"


def _theme(errors: int, findings: int) -> str:
    if errors > 0:
        return "red"
    if findings > 0:
        return "orange"
    return "green"


def _escape_md(s: str) -> str:
    out = []
    for ch in str(s):
        if ch in "\\`*_~":
            out.append("\\" + ch)
        else:
            out.append(ch)
    return "".join(out)


def _md(content: str) -> Dict[str, Any]:
    return {"tag": "div", "text": {"tag": "lark_md", "content": content}}


def build_progress_card(
    total: int,
    completed: int,
    findings: int,
    errors: int,
    started_at_ms: float,
    now_ms: float,
    current: Optional[str] = None,
) -> Dict[str, Any]:
    bar = _progress_bar(completed, total)
    elapsed = _fmt_duration(now_ms - started_at_ms)
    lines = [
        f"**`{bar}`** {_pct(completed, total)}  ({completed}/{total})",
        "",
        f"🔎 Findings so far: **{findings}**"
        + (f"   ⚠️ Errors: **{errors}**" if errors > 0 else ""),
        f"⏱️ Elapsed: {elapsed}",
    ]
    if current:
        lines += ["", f"▶️ Analyzing: `{_escape_md(current)}`"]
    return {
        "config": {"wide_screen_mode": True},
        "header": {
            "template": _theme(errors, findings),
            "title": {
                "tag": "plain_text",
                "content": "ExPGuard — Batch Analysis (running)",
            },
        },
        "elements": [_md("\n".join(lines))],
    }


def build_summary_card(
    results: Sequence[Dict[str, Any]],
    started_at_ms: float,
    ended_at_ms: float,
) -> Dict[str, Any]:
    total = len(results)
    errored = sum(1 for r in results if r.get("status") == "error")
    total_findings = sum(int(r.get("findings") or 0) for r in results)
    with_findings = sum(1 for r in results if int(r.get("findings") or 0) > 0)

    flow_totals: Dict[str, int] = {}
    for r in results:
        for k, v in (r.get("flowTypeCounts") or {}).items():
            flow_totals[k] = flow_totals.get(k, 0) + int(v)
    flow_summary = (
        "　".join(
            f"{k}: **{v}**"
            for k, v in sorted(flow_totals.items(), key=lambda kv: -kv[1])
        )
        or "none"
    )

    head_lines = [
        f"📦 Extensions: **{total}**　✅ clean: **{total - with_findings - errored}**"
        f"　🔎 with findings: **{with_findings}**　⚠️ errors: **{errored}**",
        f"🧮 Total findings: **{total_findings}**",
        f"🏷️ {flow_summary}",
        f"⏱️ Total time: {_fmt_duration(ended_at_ms - started_at_ms)}",
    ]

    rows: List[str] = []
    for r in list(results)[:_MAX_ROWS]:
        name = _escape_md(r.get("extensionId") or r.get("input") or "?")
        findings = int(r.get("findings") or 0)
        icon = "⚠️" if r.get("status") == "error" else ("🔴" if findings > 0 else "🟢")
        node_cov = r.get("nodeCoverage")
        cov = f" · cov {round(node_cov * 100)}%" if node_cov is not None else ""
        if r.get("status") == "error":
            detail = f" · {_escape_md(r.get('errorType') or 'error')}"
        else:
            plural = "" if findings == 1 else "s"
            detail = f" · {findings} finding{plural}{cov}"
        rows.append(f"{icon} `{name}`{detail}")
    if len(results) > _MAX_ROWS:
        rows.append(f"… and {len(results) - _MAX_ROWS} more")

    return {
        "config": {"wide_screen_mode": True},
        "header": {
            "template": _theme(errored, total_findings),
            "title": {
                "tag": "plain_text",
                "content": "ExPGuard — Batch Analysis (done)",
            },
        },
        "elements": [
            _md("\n".join(head_lines)),
            {"tag": "hr"},
            _md("\n".join(rows) or "_no extensions_"),
        ],
    }
