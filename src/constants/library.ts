export type LibraryModel = "react" | "vue" | "angular";

export interface LibraryFileRule {
  /** Logical library name (for logging / reporting). */
  name: string;

  /** Filename match rule (always case-insensitive). Absent for content-detected rules. */
  regex?: RegExp;

  /**
   * Framework this file implements, when it is one we model semantically
   * (React/Vue/Angular). The model lives in the global builtin registry and is
   * always available; this tag is informational and gates content sniffing.
   */
  model?: LibraryModel;

  /** Whether this library's own source should be skipped during analysis. */
  ignore?: boolean;
}

/**
 * Build a tight filename matcher for a framework/library stem.
 *
 * Matches ONLY:
 *   - the bare stem at a path boundary:           `react`, `vue`
 *   - the stem with a dist/min/build marker:      `react.production.min`,
 *                                                 `vue.runtime.global`, `react.min`
 *   - the stem with a version suffix:             `react-18.2.0`, `vue@3.4.0`
 *   - explicit extra stems (e.g. `react-dom`):    via `extraStems`
 *
 * It deliberately does NOT match business files that merely start with the
 * stem, e.g. `react-myhelper`, `vue-mywidget` — those keep getting analyzed.
 */
function frameworkStem(stem: string, extraStems: string[] = []): RegExp {
  const all = [stem, ...extraStems].map(escapeRegex);
  const alt = all.join("|");
  // (^|/|\) <stem> ( optional: .min | .production | .development | .runtime |
  //                  .global | .common | .esm | .cjs | -<version> | @<version> )* $
  const marker =
    "(?:[.](?:min|production|development|runtime|global|common|esm|cjs|slim|prod|dev|browser|umd))*";
  const version = "(?:[-@]\\d[\\w.]*)?";
  return new RegExp(`(^|[\\/\\\\])(?:${alt})${version}${marker}${version}$`, "i");
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export const LIBRARY_FILE_NAMES: Record<string, LibraryFileRule> = {
  /* ===================== jQuery ===================== */
  jquery: {
    name: "jQuery",
    regex: /(^|[\/\\])jquery([-.][\w.]*)?(\.min)?$/i,
  },

  /* ================= Lodash / Underscore ============== */
  lodash: {
    name: "Lodash",
    regex: /(^|[\/\\])(lodash|underscore)([-.][\w.]*)?(\.min)?$/i,
  },

  /* ===================== Axios ======================= */
  axios: {
    name: "Axios",
    regex: /(^|[\/\\])axios([-.][\w.]*)?(\.min)?$/i,
  },

  /* ===================== CryptoJS ==================== */
  cryptojs: {
    name: "CryptoJS",
    regex: /(^|[\/\\])crypto[-_]?js([-.][\w.]*)?(\.min)?$/i,
  },

  /* ===================== js-base64 =================== */
  jsbase64: {
    name: "Base64",
    regex: /(^|[\/\\])(js-)?base64([-.][\w.]*)?(\.min)?$/i,
  },

  /* ===================== core-js (ignore) ============= */
  "core-js": {
    name: "CoreJS",
    regex: /(^|[\/\\])core-js([\/.-].*)?$/i,
    ignore: true,
  },

  /* ===================== moment (ignore) ============== */
  moment: {
    name: "Moment",
    regex: /(^|[\/\\])moment([-.][\w.]*)?(\.min)?$/i,
    ignore: true,
  },

  /* ===================== date-fns (ignore) ============ */
  "date-fns": {
    name: "DateFns",
    regex: /(^|[\/\\])date-fns([-.][\w.]*)?(\.min)?$/i,
    ignore: true,
  },

  /* ===================== dayjs (ignore) =============== */
  dayjs: {
    name: "Dayjs",
    regex: /(^|[\/\\])dayjs([-.][\w.]*)?(\.min)?$/i,
    ignore: true,
  },

  /* ===================== vConsole (ignore) ============= */
  vconsole: {
    name: "VConsole",
    regex: /(^|[\/\\])vconsole([-.][\w.]*)?(\.min)?$/i,
    ignore: true,
  },

  /* ===================== mescroll (ignore) ============= */
  mescroll: {
    name: "MeScroll",
    regex: /(^|[\/\\])mescroll([-.][\w.]*)?(\.min)?$/i,
    ignore: true,
  },

  /* ===================== charts & viz (ignore) ========= */
  echarts: {
    name: "ECharts",
    regex: /(^|[\/\\])echarts([-.][\w.]*)?(\.min)?$/i,
    ignore: true,
  },

  chartjs: {
    name: "ChartJS",
    // Match `chart.js`, `chartjs`, `chart.min`, `chart-4.4.0` — but NOT
    // `chart-utils` (a hyphen followed by a non-numeric word).
    regex: /(^|[\/\\])chart(\.?js)?([-.]\d[\w.]*)?(\.min)?$/i,
    ignore: true,
  },

  d3: {
    name: "D3",
    regex: /(^|[\/\\])d3([-.][\w.]*)?(\.min)?$/i,
    ignore: true,
  },

  /* ===================== misc ignore ================== */
  uuid: {
    name: "UUID",
    regex: /(^|[\/\\])uuid([-.][\w.]*)?(\.min)?$/i,
    ignore: true,
  },

  /* ============== frameworks (modeled, ignore source) ============== */
  react: {
    name: "React",
    regex: frameworkStem("react", ["react-dom", "react-router", "react-is"]),
    model: "react",
    ignore: true,
  },

  vue: {
    name: "Vue",
    regex: frameworkStem("vue", ["vue-router", "vuex"]),
    model: "vue",
    ignore: true,
  },

  angular: {
    name: "Angular",
    regex: frameworkStem("angular", ["zone", "polyfills"]),
    model: "angular",
    ignore: true,
  },

  mathjs: {
    name: "MathJS",
    regex: frameworkStem("mathjs", ["math.js"]),
    ignore: true,
  },
};

export function detectLibraryByFilename(filename: string): LibraryFileRule | null {
  for (const rule of Object.values(LIBRARY_FILE_NAMES)) {
    if (rule.regex && rule.regex.test(filename)) {
      return rule;
    }
  }
  return null;
}

/* ======================================================
 * Content-based detection
 * ------------------------------------------------------
 * Bundlers inline frameworks into `popup.js` / `vendor.bundle.js`, so the
 * filename never reveals them. Sniff a capped prefix of the source for stable
 * runtime signatures. First match wins.
 *
 * IMPORTANT: signatures must be *framework-internal* markers that appear in the
 * vendored bundle itself — NOT public API surface that ordinary user code
 * calls (`React.createElement`, `Vue.compile`, `bypassSecurityTrust`, ...).
 * Matching the public API would misclassify a user file that merely *uses* the
 * framework as the framework, and wrongly skip its analysis.
 * ====================================================== */

/** How many bytes of a file to scan for framework signatures. */
const CONTENT_SCAN_LIMIT = 64 * 1024;

interface ContentSignature {
  model: LibraryModel;
  name: string;
  patterns: RegExp[];
}

const CONTENT_SIGNATURES: ContentSignature[] = [
  {
    model: "react",
    name: "React",
    patterns: [
      /__reactInternalInstance/,
      /_reactRootContainer/,
      /react\.production\.min/,
      /__SECRET_INTERNALS_DO_NOT_USE/,
    ],
  },
  {
    model: "vue",
    name: "Vue",
    patterns: [
      /__vue__/,
      /__VUE_DEVTOOLS_GLOBAL_HOOK__/,
      /__VUE_HMR_RUNTIME__/,
    ],
  },
  {
    model: "angular",
    name: "Angular",
    patterns: [
      /platformBrowserDynamic/,
      /ng\.probe\b/,
      /ɵ[a-zA-Z]/, // Angular Ivy private prefix (ɵ)
      /__NG_DEVTOOLS_GLOBAL_HOOK__/,
    ],
  },
];

export function detectLibraryByContent(code: string): LibraryFileRule | null {
  if (!code) return null;

  const slice = code.length > CONTENT_SCAN_LIMIT
    ? code.slice(0, CONTENT_SCAN_LIMIT)
    : code;

  for (const sig of CONTENT_SIGNATURES) {
    if (sig.patterns.some((p) => p.test(slice))) {
      return { name: sig.name, model: sig.model, ignore: true };
    }
  }

  return null;
}
