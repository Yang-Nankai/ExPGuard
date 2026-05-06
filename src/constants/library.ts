export interface LibraryFileRule {
  /** Logical library name */
  builtinName: string;

  /** Filename match rule */
  regex: RegExp;

  /** Global entry objects (optional, for verification) */
  entryObjects?: string[];

  /** Whether this library should be ignored */
  ignore?: boolean;
}


export const LIBRARY_FILE_NAMES: Record<string, LibraryFileRule> = {
  /* ===================== jQuery ===================== */
  jquery: {
    builtinName: "JQuery",
    regex: /(^|\/|\\)jquery([-.].*)?(\.min)?$/,
    entryObjects: ["$", "jQuery"],
  },

  /* ================= Lodash / Underscore ============== */
  lodash: {
    builtinName: "Lodash",
    regex: /(^|\/|\\)(lodash|underscore)([-.].*)?(\.min)?$/,
    entryObjects: ["_", "lodash"],
  },

  /* ===================== Axios ======================= */
  axios: {
    builtinName: "Axios",
    regex: /(^|\/|\\)axios([-.].*)?(\.min)?$/,
    entryObjects: ["axios"],
  },

  /* ===================== CryptoJS ==================== */
  cryptojs: {
    builtinName: "CryptoJS",
    regex: /(^|\/|\\)crypto[-_]?js([-.].*)?(\.min)?$/,
    entryObjects: ["CryptoJS"],
  },

  /* ===================== js-base64 =================== */
  jsbase64: {
    builtinName: "Base64",
    regex: /(^|\/|\\)(js-)?base64([-.].*)?(\.min)?$/,
    entryObjects: ["base64"],
  },

  /* ===================== core-js (ignore) ============= */
  "core-js": {
    builtinName: "CoreJS",
    regex: /(^|\/|\\)core-js([/.-].*)?$/,
    ignore: true,
  },

  /* ===================== moment (ignore) ============== */
  moment: {
    builtinName: "Moment",
    regex: /(^|\/|\\)moment([-.].*)?(\.min)?$/,
    ignore: true,
  },

  /* ===================== date-fns (ignore) ============ */
  "date-fns": {
    builtinName: "DateFns",
    regex: /(^|\/|\\)date-fns([-.].*)?(\.min)?$/,
    ignore: true,
  },

  /* ===================== dayjs (ignore) =============== */
  dayjs: {
    builtinName: "Dayjs",
    regex: /(^|\/|\\)dayjs([-.].*)?(\.min)?$/,
    ignore: true,
  },

  /* ===================== vConsole (ignore) ============= */
  vconsole: {
    builtinName: "VConsole",
    regex: /(^|\/|\\)vconsole([-.].*)?(\.min)?$/,
    ignore: true,
  },

  /* ===================== mescroll (ignore) ============= */
  mescroll: {
    builtinName: "MeScroll",
    regex: /(^|\/|\\)mescroll([-.].*)?(\.min)?$/,
    ignore: true,
  },

  /* ===================== charts & viz (ignore) ========= */
  echarts: {
    builtinName: "ECharts",
    regex: /(^|\/|\\)echarts([-.].*)?(\.min)?$/,
    ignore: true,
  },

  chartjs: {
    builtinName: "ChartJS",
    regex: /(^|\/|\\)chart([-.].*)?(\.min)?$/,
    ignore: true,
  },

  d3: {
    builtinName: "D3",
    regex: /(^|\/|\\)d3([-.].*)?(\.min)?$/,
    ignore: true,
  },

  /* ===================== misc ignore ================== */
  uuid: {
    builtinName: "UUID",
    regex: /(^|\/|\\)uuid([-.].*)?(\.min)?$/,
    ignore: true,
  },

  react: {
    builtinName: "React",
    regex: /(^|\/|\\)react([-.].*)?(\.min)?$/,
    ignore: true,
  },

  vue: {
    builtinName: "Vue",
    regex: /(^|\/|\\)vue([-.].*)?(\.min)?$/,
    ignore: true,
  },

  mathjs: {
    builtinName: "MathJS",
    regex: /(^|\/|\\)math([-.].*)?(\.min)?$/,
    ignore: true,
  },
};


export function detectLibraryByFilename(filename: string) {
  for (const rule of Object.values(LIBRARY_FILE_NAMES)) {
    if (rule.regex.test(filename)) {
      return rule;
    }
  }
  return null;
}