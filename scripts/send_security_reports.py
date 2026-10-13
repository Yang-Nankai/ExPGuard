"""Send selected Ground Truth reports by SMTP with an auditable ledger update.

Safety defaults are intentional: a recipient must be selected explicitly, a
run is capped at two messages unless --allow-bulk is supplied, and entries
marked already_disclosed or without a reliable contact are skipped.

Credentials are read from EXP_REPORT_SMTP_USER and
EXP_REPORT_SMTP_PASSWORD (or requested interactively). They are never written
to the ledger or report files.
"""

from __future__ import annotations

import argparse
import getpass
import html
import json
import os
import smtplib
import ssl
from datetime import datetime, timezone
from email.message import EmailMessage
from email.utils import formataddr, make_msgid
from pathlib import Path
from typing import Any


def now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def load(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8-sig"))


def write_json(path: Path, value: Any) -> None:
    temp = path.with_name(path.name + ".tmp")
    temp.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    temp.replace(path)


def html_body(markdown_body: str) -> str:
    """Render a report as formatted email body content (never as an attachment)."""
    try:
        from markdown_it import MarkdownIt
        rendered = MarkdownIt("commonmark", {"html": False, "breaks": True}).render(markdown_body)
    except ImportError:
        rendered = f"<pre>{html.escape(markdown_body)}</pre>"
    return (
        "<!doctype html><html><body style=\"font-family:Arial,sans-serif;color:#202124;line-height:1.55;max-width:900px;margin:24px auto;padding:0 20px\">"
        f"{rendered}</body></html>"
    )


def main() -> int:
    root = Path(__file__).resolve().parents[1]
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--ledger", type=Path, default=root / "datasets" / "reporting" / "reporting-ledger.json")
    parser.add_argument("--extension-id", action="append", help="Send only this extension ID; repeat for multiple IDs.")
    parser.add_argument("--limit", type=int, default=None, help="Maximum messages. Required unless --extension-id is used; use 1 or 2 for test sends.")
    parser.add_argument("--allow-bulk", action="store_true", help="Remove the two-message safety cap after human review.")
    parser.add_argument("--dry-run", action="store_true", help="Build and validate messages without connecting to SMTP.")
    parser.add_argument("--smtp-host", default=os.getenv("EXP_REPORT_SMTP_HOST", "smtp.qiye.163.com"))
    parser.add_argument("--smtp-port", type=int, default=int(os.getenv("EXP_REPORT_SMTP_PORT", "465")))
    parser.add_argument("--insecure-tls", action="store_true", help="Allow SMTP TLS with an untrusted/mismatched certificate (only when the university relay presents one).")
    parser.add_argument("--smtp-user", default=os.getenv("EXP_REPORT_SMTP_USER", "2120240775@mail.nankai.edu.cn"))
    parser.add_argument("--smtp-password", default=None, help=argparse.SUPPRESS)
    parser.add_argument("--sender-name", default=os.getenv("EXP_REPORT_SENDER_NAME", "Xin Yang"))
    parser.add_argument("--cc", default=os.getenv("EXP_REPORT_CC", "wanpeng.li@liverpool.ac.uk"))
    parser.add_argument("--resend", action="store_true", help="Allow entries marked pending_revised after a corrected report was generated.")
    parser.add_argument("--print-body", action="store_true", help="Print the selected message metadata and body preview.")
    args = parser.parse_args()
    if not args.ledger.exists():
        parser.error(f"ledger not found: {args.ledger}")
    if args.limit is None and not args.extension_id:
        parser.error("select recipients with --extension-id or set --limit (1 or 2 for the first test run)")
    if args.limit is not None and args.limit <= 0:
        parser.error("--limit must be positive")
    if not args.allow_bulk and args.limit is not None and args.limit > 2:
        parser.error("the default safety cap is two messages; use --limit 1 or 2, or explicitly add --allow-bulk")
    data = load(args.ledger)
    entries = data.get("entries", [])
    wanted = set(args.extension_id or [])
    selected = []
    for entry in entries:
        if wanted and entry.get("extension_id") not in wanted:
            continue
        allowed_statuses = {"pending", "pending_revised"} if args.resend else {"pending"}
        if entry.get("email_status") not in allowed_statuses:
            continue
        if not entry.get("developer_email") or not entry.get("report_path"):
            continue
        if not Path(entry["report_path"]).is_file():
            entry["email_status"] = "missing_report"
            continue
        selected.append(entry)
    if args.limit is not None:
        selected = selected[: args.limit]
    if not args.allow_bulk and len(selected) > 2:
        parser.error("the default safety cap is two messages; select at most two extension IDs or explicitly add --allow-bulk")
    if not selected:
        print(json.dumps({"selected": 0, "message": "No eligible pending entries matched."}, ensure_ascii=False, indent=2))
        return 0
    if not args.dry_run:
        password = args.smtp_password or os.getenv("EXP_REPORT_SMTP_PASSWORD") or getpass.getpass("SMTP password: ")
    else:
        password = None
    messages = []
    for entry in selected:
        report_path = Path(entry["report_path"])
        body = report_path.read_text(encoding="utf-8")
        msg = EmailMessage()
        msg["From"] = formataddr((args.sender_name, args.smtp_user))
        msg["To"] = entry["developer_email"]
        msg["Cc"] = args.cc
        msg["Reply-To"] = args.smtp_user
        msg["Subject"] = entry.get("subject") or f"Security Vulnerability Report: Privilege Escalation in {entry.get('name') or entry['extension_id']}"
        msg["Message-ID"] = make_msgid(domain="nankai.edu.cn")
        msg["X-ExPGuard-Report-Key"] = entry["key"]
        msg.set_content(body)
        msg.add_alternative(html_body(body), subtype="html")
        messages.append((entry, msg))
    if args.print_body or args.dry_run:
        print(json.dumps({"dry_run": args.dry_run, "smtp_host": args.smtp_host, "smtp_port": args.smtp_port, "cc": args.cc, "inline_body": True, "attachments": 0, "body_types": ["text/plain", "text/html"], "selected": [{"key": e["key"], "to": e["developer_email"], "subject": m["Subject"], "report_path": e["report_path"], "body_chars": len(m.get_body(preferencelist=('plain',)).get_content()), "html_body_chars": len(m.get_body(preferencelist=('html',)).get_content())} for e, m in messages]}, ensure_ascii=False, indent=2))
    if args.dry_run:
        return 0
    context = ssl.create_default_context()
    if args.insecure_tls:
        context.check_hostname = False
        context.verify_mode = ssl.CERT_NONE
    try:
        if args.smtp_port == 465:
            client = smtplib.SMTP_SSL(args.smtp_host, args.smtp_port, context=context, timeout=60)
        else:
            client = smtplib.SMTP(args.smtp_host, args.smtp_port, timeout=60)
            client.ehlo()
            client.starttls(context=context)
            client.ehlo()
        with client:
            client.login(args.smtp_user, password)
            for entry, msg in messages:
                try:
                    client.send_message(msg)
                    entry["email_status"] = "sent"
                    entry["email_sent_at_utc"] = now()
                    entry["email_message_id"] = msg["Message-ID"]
                    entry["needs_resend"] = False
                    entry["email_revision"] = entry.get("report_revision")
                    entry["smtp_host"] = args.smtp_host
                    entry["smtp_port"] = args.smtp_port
                except Exception as exc:
                    entry["email_status"] = "failed"
                    entry["email_error"] = str(exc)
                    raise
    except Exception as exc:
        write_json(args.ledger, data)
        print(json.dumps({"status": "failed", "error": str(exc), "ledger": str(args.ledger)}, ensure_ascii=False, indent=2))
        return 2
    write_json(args.ledger, data)
    print(json.dumps({"status": "sent", "count": len(messages), "ledger": str(args.ledger), "recipients": [e["developer_email"] for e, _ in messages]}, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
