# Reviewer Notes (JustBlock Security)

**Manifest V3**
- No remotely hosted code; all JS/CSS bundled.
- Content Security Policy for extension pages: `script-src 'self'; object-src 'self'`.
- Permissions: only `"declarativeNetRequest"` and `"storage"`; `"tabs"` is optional/on-demand.

**Rules**
- All static rulesets live under `/dnr/*.json`.
- Default enabled packs (on fresh install) are limited to core safety packs (mail/crypto/fb/file) to avoid overblocking.
- Dynamic allow rules are generated only for user-added whitelisted domains (ID range 900000+).

**Privacy**
- No collection or transmission of personal data.
- All filtering is local/on-device.
- A public privacy policy is provided (see `/docs/privacy-policy.html`).

**UI**
- Options page and popup have clear on/off states and per-pack toggles.
- Adult-site blocking is **disabled by default** and clearly labeled as parental control.

**Misc**
- No `eval` / `new Function` used.
- No external network requests from extension pages.
- No payment, upsells, or external “upgrade” flows.
