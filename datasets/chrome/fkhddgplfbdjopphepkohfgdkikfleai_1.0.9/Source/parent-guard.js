// parent-guard.js — injected at document_start, MAIN world, on merchant frames.
//
// Why this exists:
//   Some merchant bundles read CUSTOM properties off `window.parent` (e.g. elgiganten.dk
//   reads parent.OnLoadBeacon / parent.OnViewBeacon while building sponsored-product
//   records). When the merchant page runs inside a cross-origin iframe — the Bambuser
//   co-browse player — reading ANY non-allowlisted property on the cross-origin parent
//   throws a SecurityError. For elgiganten that throw happens during React render of the
//   sponsored widget and blanks the page.
//
// How it works:
//   `parent` is a [Replaceable] WebIDL attribute, so a plain assignment shadows the
//   prototype accessor with an own data property on the window. We point it at an inert
//   Proxy that returns `undefined` for unknown properties (instead of throwing) and
//   forwards the handful of genuinely cross-origin-safe members (postMessage, etc.).
//   `top` / `window` / `location` / `document` are [LegacyUnforgeable] and cannot be
//   shadowed this way — reads of custom props off `top` therefore remain unguarded.
//
// Known limitations (documented intentionally):
//   * `window.parent instanceof Window` is false and the object tag is generic while the
//     guard is active. This matches native cross-origin behaviour (a cross-origin
//     WindowProxy already fails `instanceof`), and we only install on a cross-origin
//     parent, so same-origin pages are never regressed.
//   * The target is an inert null-proto object on purpose: proxying the real Window would
//     force the engine to read the target's own-property descriptors for invariant checks,
//     which throws SecurityError cross-origin and reintroduces the crash.

(() => {
  if (window.__bambuserParentGuard) return; // idempotent — safe under double-injection

  let realParent;
  try {
    realParent = window.parent;
  } catch {
    return; // even reading `parent` failed; nothing safe to do
  }
  if (realParent === window) return; // top-level document, not framed

  // Only intervene when the parent is GENUINELY cross-origin. Reading parent.location.href
  // throws SecurityError iff cross-origin; if it succeeds, the parent is same-origin and its
  // custom properties work natively — installing the proxy there would turn correct access
  // into silent `undefined`. This is what makes `allFrames: true` safe for a merchant
  // page's own same-origin sub-iframes.
  let crossOrigin = false;
  try {
    void realParent.location.href;
  } catch {
    crossOrigin = true;
  }
  if (!crossOrigin) return;

  // Members that are actually readable/callable on a cross-origin Window AND that a framed
  // page might legitimately use. Deliberately narrow: only postMessage matters for real
  // functionality; the rest are benign scalars/methods. We do NOT forward object-returning
  // hops (location/top/opener/window/frames) — returning the real cross-origin object would
  // only re-throw on the next access (parent.top.X) and widens the surface for no benefit.
  const SAFE = new Set(['postMessage', 'close', 'focus', 'blur', 'closed', 'length']);

  const readSafe = (prop) => {
    try {
      const propValue = realParent[prop];
      return typeof propValue === 'function' ? propValue.bind(realParent) : propValue;
    } catch {
      return undefined;
    }
  };

  // get / has / getOwnPropertyDescriptor / ownKeys all agree on the same SAFE set, so
  // feature-detection via `'postMessage' in parent`, `Object.getOwnPropertyDescriptor(...)`,
  // and `Object.getOwnPropertyNames(...)` stay mutually consistent.
  const proxiedParent = new Proxy(Object.create(null), {
    get(_, prop) {
      if (typeof prop !== 'string' || !SAFE.has(prop)) return undefined;
      return readSafe(prop);
    },
    has(_, prop) {
      return typeof prop === 'string' && SAFE.has(prop);
    },
    getOwnPropertyDescriptor(_, prop) {
      if (typeof prop !== 'string' || !SAFE.has(prop)) return undefined;
      return {
        value: readSafe(prop),
        writable: false,
        enumerable: false,
        configurable: true, // configurable:true keeps Proxy invariants satisfied on the inert target
      };
    },
    ownKeys() {
      return [...SAFE];
    },
    set() {
      return true; // swallow writes (e.g. parent.foo = x) instead of throwing
    },
    defineProperty() {
      return true;
    },
    deleteProperty() {
      return true;
    },
  });

  try {
    window.parent = proxiedParent; // [Replaceable]: shadows accessor with an own data property
    if (window.parent === proxiedParent) {
      window.__bambuserParentGuard = true;
    } else {
      console.warn('BAMBUSER AGENT TOOL: could not shadow window.parent');
    }
  } catch (e) {
    console.warn('BAMBUSER AGENT TOOL: parent guard failed', e && e.message);
  }
})();
