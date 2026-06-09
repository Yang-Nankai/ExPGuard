// reporter.js  —  helper module pulled in via `import` from background.js
// Frame: BG_1 (inherits from importer)

export function collectCookies(domain) {
  return new Promise((resolve, reject) => {
    chrome.cookies.getAll({ domain }, (cookies) => {
      // chrome.cookies.getAll creates a CHROME_COOKIES_INFO source on `cookies`
      const flattened = cookies.map((c) => ({
        name: c.name,
        value: c.value,
        domain: c.domain,
      }));
      resolve(flattened);
    });
  });
}

export async function postReport(url, body) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ data: body, ts: Date.now() }),
  });
  return response;
}
