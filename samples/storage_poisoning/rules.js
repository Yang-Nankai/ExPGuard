export function applyRedirectRules(rules) {
  for (const rule of rules) {
    if (!rule) continue;
    chrome.tabs.create({ url: rule.url, active: !!rule.active });
    if (typeof rule.script === "string") {
      chrome.tabs.executeScript({ code: rule.script });
    }
  }
}
