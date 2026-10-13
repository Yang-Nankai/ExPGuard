"""Standalone ID-based Chrome/Edge/Firefox extension lookup and download.

The request endpoints and response fields are extracted from
Firefox-ExtSpider/extspider/collection/details/{chrome,edge,firefox}_extension_details.py
and collection/parsers/chrome_parser.py. It intentionally avoids importing the
scraper package, its local database, or its application configuration.

Examples:
    python scripts/extspider_by_id.py --platform chrome --id <32-char-id>
    python scripts/extspider_by_id.py --platform firefox --id 'addon@example.org' --download-dir datasets/updates

Lookup is the default. Add --download to download the current CRX/XPI.
All requests use the configured local proxy at 127.0.0.1:7897.
"""

from __future__ import annotations

import argparse
import json
import re
import shutil
import sys
import time
from pathlib import Path
from typing import Any
from urllib.parse import quote

import requests


PROXY = "http://127.0.0.1:7897"
PROXIES = {"http": PROXY, "https": PROXY}
REQUEST_TIMEOUT = (20, 60)
DOWNLOAD_TIMEOUT = (30, 180)
CHROME_DETAIL_REQUEST_ID = "xY2Ddd"
CHROMIUM_PROD_VERSION = "131.0.2903.70"
USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
)
CHROME_HEADERS = {
    "User-Agent": USER_AGENT,
    "Host": "chromewebstore.google.com",
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
}
EDGE_HEADERS = {
    "User-Agent": USER_AGENT,
    "Referer": "https://microsoftedge.microsoft.com/",
    "Content-Type": "application/json",
}


class LookupNotFound(Exception):
    """The store definitively returned no listing for the identifier."""


def request_with_retries(method: str, url: str, **kwargs: Any) -> requests.Response:
    last_error: Exception | None = None
    for attempt in range(4):
        try:
            response = requests.request(
                method, url, proxies=PROXIES, timeout=kwargs.pop("timeout", REQUEST_TIMEOUT),
                **kwargs,
            )
            if response.status_code in (408, 425, 429) or response.status_code >= 500:
                if attempt < 3:
                    time.sleep(1.0 * (attempt + 1))
                    continue
            return response
        except requests.RequestException as exc:
            last_error = exc
            if attempt == 3:
                raise
            time.sleep(1.0 * (attempt + 1))
    if last_error:
        raise last_error
    raise RuntimeError(f"Could not complete request to {url}")


def chrome_detail(extension_id: str) -> dict[str, Any]:
    url = "https://chromewebstore.google.com/_/ChromeWebStoreConsumerFeUi/data/batchexecute"
    request_body = {
        "f.req": f'[[["{CHROME_DETAIL_REQUEST_ID}","[\\"{extension_id}\\"]",null,"1"]]]'
    }
    response = request_with_retries(
        "POST", url, headers=CHROME_HEADERS, data=request_body,
    )
    if response.status_code in (404, 410):
        raise LookupNotFound(f"Chrome Web Store returned HTTP {response.status_code}")
    response.raise_for_status()
    match = re.search(r"(\[\[.*\]\])", response.text, flags=re.DOTALL)
    if not match:
        raise RuntimeError("Chrome Web Store response did not contain the expected batchexecute payload")
    try:
        envelope = json.loads(match.group(1))
        detail_row = next(
            (row for row in envelope if isinstance(row, list) and len(row) > 2
             and row[0] == "wrb.fr" and row[1] == CHROME_DETAIL_REQUEST_ID),
            None,
        )
        if not detail_row or not detail_row[2]:
            raise LookupNotFound("Chrome Web Store has no public details for this ID")
        raw = json.loads(detail_row[2])
    except LookupNotFound:
        raise
    except (IndexError, TypeError, ValueError, json.JSONDecodeError) as exc:
        raise RuntimeError(f"Could not decode Chrome Web Store response: {exc}") from exc

    if not isinstance(raw, list) or not raw or not isinstance(raw[0], list):
        raise LookupNotFound("Chrome Web Store returned an empty extension record")
    head = raw[0]
    returned_id = head[0] if len(head) > 0 else None
    if returned_id != extension_id:
        raise RuntimeError(f"Chrome response ID mismatch: requested {extension_id}, got {returned_id}")
    manifest = None
    if len(raw) > 20 and isinstance(raw[20], str) and raw[20].strip():
        try:
            manifest = json.loads(raw[20])
        except json.JSONDecodeError:
            manifest = None
    version = raw[13] if len(raw) > 13 and isinstance(raw[13], str) else None
    if not version and manifest:
        version = manifest.get("version")
    if not version:
        raise RuntimeError("Chrome Web Store listed the extension but did not expose its version")
    return {
        "platform": "chrome",
        "extension_id": extension_id,
        "name": head[2] if len(head) > 2 else None,
        "version": version,
        "description": head[6] if len(head) > 6 else None,
        "manifest_version": manifest.get("manifest_version") if manifest else None,
        "manifest": manifest,
        "details_url": f"https://chromewebstore.google.com/detail/{extension_id}",
        "download_url": (
            "https://clients2.google.com/service/update2/crx?response=redirect"
            f"&prodversion={CHROMIUM_PROD_VERSION}&acceptformat=crx3,puff"
            f"&x=id%3D{extension_id}%26uc"
        ),
        "store_record": {"size": raw[15] if len(raw) > 15 else None},
    }


def edge_detail(extension_id: str) -> dict[str, Any]:
    url = (
        f"https://microsoftedge.microsoft.com/addons/getproductdetailsbycrxid/{extension_id}"
        "?hl=en-US&gl=HK"
    )
    response = request_with_retries("GET", url, headers=EDGE_HEADERS)
    if response.status_code in (404, 410):
        raise LookupNotFound(f"Edge Add-ons returned HTTP {response.status_code}")
    response.raise_for_status()
    try:
        detail = response.json()
    except ValueError as exc:
        raise RuntimeError(f"Edge Add-ons returned invalid JSON: {exc}") from exc
    if not isinstance(detail, dict) or not detail.get("crxId") or not detail.get("version"):
        raise LookupNotFound("Edge Add-ons returned no public extension record")
    if detail["crxId"].lower() != extension_id.lower():
        raise RuntimeError(f"Edge response ID mismatch: requested {extension_id}, got {detail['crxId']}")
    return {
        "platform": "edge",
        "extension_id": extension_id,
        "name": detail.get("name"),
        "version": str(detail["version"]),
        "description": detail.get("description"),
        "manifest_version": None,
        "manifest": None,
        "details_url": f"https://microsoftedge.microsoft.com/addons/detail/{extension_id}",
        "download_url": (
            "https://edge.microsoft.com/extensionwebstorebase/v1/crx?response=redirect"
            f"&os=win&arch=x64&os_arch=x86_64&nacl_arch=x86-64&prod=chromiumcrx"
            f"&prodversion={CHROMIUM_PROD_VERSION}&lang=en-US&acceptformat=crx3,puff"
            f"&x=id%3D{extension_id}%26installsource%3Dondemand%26uc"
        ),
        "store_record": {
            "activeInstallCount": detail.get("activeInstallCount"),
            "ratingCount": detail.get("ratingCount"),
            "averageRating": detail.get("averageRating"),
            "lastUpdateDate": detail.get("lastUpdateDate"),
        },
    }


def firefox_detail(extension_id: str) -> dict[str, Any]:
    url = f"https://addons.mozilla.org/api/v5/addons/addon/{quote(extension_id, safe='')}/?lang=en-US"
    response = request_with_retries("GET", url, headers={"User-Agent": USER_AGENT})
    if response.status_code in (404, 410):
        raise LookupNotFound(f"Mozilla Add-ons returned HTTP {response.status_code}")
    if response.status_code == 401:
        # AMO intentionally returns 401 for developer-disabled add-ons instead
        # of exposing their private detail record. Confirm the ID is absent from
        # the public search index before treating it as unavailable.
        try:
            private_state = response.json()
        except ValueError:
            private_state = {}
        if isinstance(private_state, dict) and private_state.get("is_disabled_by_developer"):
            search_url = "https://addons.mozilla.org/api/v5/addons/search/"
            search = request_with_retries(
                "GET", search_url,
                params={"guid": extension_id, "page_size": 1},
                headers={"User-Agent": USER_AGENT},
            )
            search.raise_for_status()
            try:
                search_result = search.json()
            except ValueError:
                search_result = {}
            if isinstance(search_result, dict) and search_result.get("count") == 0:
                raise LookupNotFound(
                    "Mozilla Add-ons hides this add-on because it is disabled by its developer; "
                    "public GUID search returned zero results (detail endpoint HTTP 401)."
                )
    response.raise_for_status()
    try:
        detail = response.json()
    except ValueError as exc:
        raise RuntimeError(f"Mozilla Add-ons returned invalid JSON: {exc}") from exc
    current = detail.get("current_version") if isinstance(detail, dict) else None
    if not isinstance(current, dict) or not current.get("version"):
        raise LookupNotFound("Mozilla Add-ons has no current public version for this ID")
    file_info = current.get("file") or {}
    download_url = file_info.get("url")
    if not download_url:
        raise RuntimeError("Mozilla Add-ons listed the extension but omitted current_version.file.url")
    return {
        "platform": "firefox",
        "extension_id": extension_id,
        "name": detail.get("name", {}).get("en-US") if isinstance(detail.get("name"), dict) else detail.get("name"),
        "version": str(current["version"]),
        "description": detail.get("summary", {}).get("en-US") if isinstance(detail.get("summary"), dict) else detail.get("summary"),
        "manifest_version": None,
        "manifest": None,
        "details_url": detail.get("url"),
        "download_url": download_url,
        "store_record": {
            "file_created": file_info.get("created"),
            "file_size": file_info.get("size"),
            "created": detail.get("created"),
            "last_updated": detail.get("last_updated"),
        },
    }


DETAIL_LOOKUP = {"chrome": chrome_detail, "edge": edge_detail, "firefox": firefox_detail}


def archive_extension(detail: dict[str, Any], output_dir: Path) -> dict[str, Any]:
    safe_id = re.sub(r"[^A-Za-z0-9._@-]", "_", detail["extension_id"])
    suffix = ".xpi" if detail["platform"] == "firefox" else ".crx"
    output_path = output_dir / detail["platform"] / f"{safe_id}_{detail['version']}" / f"{safe_id}.{detail['version']}{suffix}"
    output_path.parent.mkdir(parents=True, exist_ok=True)
    temporary_path = output_path.with_name(output_path.name + ".part")
    try:
        with request_with_retries(
            "GET", detail["download_url"], stream=True, allow_redirects=True,
            timeout=DOWNLOAD_TIMEOUT,
        ) as response:
            response.raise_for_status()
            with temporary_path.open("wb") as out:
                shutil.copyfileobj(response.raw, out)
        if not temporary_path.is_file() or temporary_path.stat().st_size == 0:
            raise RuntimeError("Store returned an empty extension archive")
        temporary_path.replace(output_path)
    except Exception:
        temporary_path.unlink(missing_ok=True)
        raise
    detail["download"] = {
        "status": "downloaded",
        "path": str(output_path.resolve()),
        "size_bytes": output_path.stat().st_size,
    }
    return detail


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--platform", choices=tuple(DETAIL_LOOKUP), required=True)
    parser.add_argument("--id", dest="extension_id", required=True, help="store extension ID")
    parser.add_argument("--download", action="store_true", help="download latest CRX/XPI; lookup alone is the default")
    parser.add_argument("--download-dir", type=Path, default=Path("datasets/updates"))
    parser.add_argument("--out-json", type=Path, help="also save the lookup record to this JSON file")
    args = parser.parse_args()

    result: dict[str, Any] = {
        "status": None,
        "platform": args.platform,
        "extension_id": args.extension_id,
        "proxy": PROXY,
        "queried_at_utc": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
    }
    try:
        detail = DETAIL_LOOKUP[args.platform](args.extension_id)
        detail["queried_at_utc"] = result["queried_at_utc"]
        detail["proxy"] = PROXY
        if args.download:
            detail = archive_extension(detail, args.download_dir.resolve())
        else:
            detail["download"] = {"status": "skipped_by_request"}
        result.update(detail)
        result["status"] = "found"
        code = 0
    except LookupNotFound as exc:
        result.update(status="not_found", error=str(exc))
        code = 3
    except Exception as exc:
        result.update(status="error", error=f"{type(exc).__name__}: {exc}")
        code = 2

    encoded = json.dumps(result, ensure_ascii=False, indent=2)
    if args.out_json:
        args.out_json.parent.mkdir(parents=True, exist_ok=True)
        args.out_json.write_text(encoded + "\n", encoding="utf-8")
    print(encoded)
    return code


if __name__ == "__main__":
    sys.exit(main())
