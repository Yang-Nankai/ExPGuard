// util.js  —  pure helpers, no taint surface of its own
// Frame: BG_1 (via import) + CS_1 (via import in content.js)

const DEFAULTS = Object.freeze({
  user: "anonymous",
  location: "unknown",
  ts: 0,
});

export function mergeWithDefaults(obj) {
  return Object.assign({}, DEFAULTS, obj || {});
}

export function pickFields(obj, fields) {
  const out = {};
  for (const key of fields) {
    if (obj && key in obj) out[key] = obj[key];
  }
  return out;
}
