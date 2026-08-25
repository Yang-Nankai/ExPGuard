import { Node } from "acorn";
import Def, {
  isSafeForStringInterpretation,
  ObjectDef,
  PrimitiveDef,
  StringSafeDef,
  UnknownDef,
} from "../def-use/types/def";
import { FlowNode } from "../flownode/flownode";
import logger from "../utils/logger";
import { formatLocation } from "../utils/location";
import { taintGenerator } from "../utils/uuid";
import {
  SourceType,
  PropagateType,
  SinkType,
  UrlTaintControl,
  TaintSinkRecord,
  TaintPathRecord,
  PseudoTaintReceiver,
  PseudoTaintSender,
  StorageSet,
  StorageGet,
  TaintFrameFamily,
  TaintProvenance,
} from "./types";
import { TaintContext, InterContextBridge } from "./context";
import config, { DEFAULT_REPORT_OPTIONS, ReportOptions } from "../config";
import { Errors } from "../utils/errorCode";
import { ExtensionScript } from "../extension/extensionScript";
import {
  getFlowMatches,
  isStringInterpretingSink,
  shouldFilterSourceByFrame,
  shouldIncludeScriptInPolicy,
} from "./policy";
import { analyzeFlowConstraintSeverity } from "./constraintSeverity";
import { evaluatePrivilegeDelta } from "./privilege";
import { fileTimerManager } from "../utils/fileTimer";
import { scriptUsageTracker } from "../extension/scriptUsageTracker";
import { messageProtocolsMayMatch } from "./messageProtocol";

/* ============================================================
 * Helpers
 * ============================================================ */

/** A flow that matched a rule but crosses no privilege boundary. */
export interface PrivilegeSuppressedFlow {
  flowType: string;
  sourceType: string;
  sourceFile: string;
  sourceLoc: string;
  sinkType: string;
  sinkFile: string;
  sinkLoc: string;
  reason: string;
}

/**
 * Build stable source key for deduplicating taint ids.
 */
function buildSourceKey(
  sourceType: SourceType,
  node: Node | null,
  remark?: string,
): string {
  const r = (node as any)?.range;
  const base = r ? `${sourceType}@${r[0]}:${r[1]}` : `${sourceType}@unknown`;

  // Keep distinct sources created at the same AST node but with different
  // semantic meaning (e.g. chrome.storage.get for different keys).
  return remark ? `${base}#${remark}` : base;
}

const NUMERIC_PRESENTATION_FIELDS = new Set([
  "count",
  "length",
  "size",
  "total",
  "index",
  "stepId",
]);

function staticPropertyName(node: any): string | null {
  if (!node) return null;
  if (!node.computed && node.property?.type === "Identifier") {
    return node.property.name;
  }
  if (node.computed && node.property?.type === "Literal") {
    return String(node.property.value);
  }
  return null;
}

/** Matches `request.count.toString()` and `String(message.length)`, not title text. */
function isNumericPresentationExpression(node: any): boolean {
  if (!node) return false;

  if (
    node.type === "CallExpression" &&
    node.callee?.type === "MemberExpression" &&
    staticPropertyName(node.callee) === "toString"
  ) {
    return NUMERIC_PRESENTATION_FIELDS.has(staticPropertyName(node.callee.object) ?? "");
  }

  if (
    node.type === "CallExpression" &&
    node.callee?.type === "Identifier" &&
    node.callee.name === "String"
  ) {
    const value = node.arguments?.[0];
    return value?.type === "MemberExpression" &&
      NUMERIC_PRESENTATION_FIELDS.has(staticPropertyName(value) ?? "");
  }

  return false;
}

/**
 * Return the receiver expression in a direct `receiver.innerHTML` access.
 *
 * This deliberately accepts only a simple identifier (the shape used by the
 * extension i18n helpers) rather than trying to prove arbitrary aliases
 * equivalent.  The narrowness is important: a general innerHTML read/write
 * remains a DOM-XSS candidate.
 */
function innerHtmlReceiverFromText(text: string | undefined): string | null {
  if (!text) return null;
  const match = /\b([A-Za-z_$][\w$]*)\s*\.\s*innerHTML\b/.exec(text);
  return match?.[1] ?? null;
}

/** Recover `element` when the source/sink AST span is just `innerHTML`. */
function innerHtmlReceiverNearRange(
  code: string,
  range: [number, number],
): string | null {
  // The def-use source commonly points to only the `innerHTML` property
  // identifier. In that shape the receiver is immediately before the range.
  const before = code.slice(Math.max(0, range[0] - 160), range[0]);
  const prefix = /([A-Za-z_$][\w$]*)\s*\.\s*$/.exec(before);
  if (prefix?.[1]) return prefix[1];

  // If the tracked range starts at the complete MemberExpression, recover
  // the receiver there. Do this only after the prefix check: a bounded slice
  // might otherwise begin in the middle of a long identifier (`ment` from
  // `element`) and manufacture a false receiver name.
  const local = code.slice(range[0], range[1] + 80);
  return innerHtmlReceiverFromText(local);
}

/**
 * Resolve `value = element.innerHTML` when the taint source is `value`.
 *
 * Production extension bundles frequently collapse this into a comma
 * declaration and call `.toString()` before `replace`, for example:
 *
 *   var element = nodes[i], old = element.innerHTML.toString(), next = ...;
 *
 * Accept only that direct, local alias shape.  We deliberately do not chase
 * arbitrary aliases or property accesses: this recogniser feeds an exception
 * to DOM-XSS reporting and must remain narrowly scoped.
 */
function innerHtmlReceiverFromSourceAlias(
  code: string,
  range: [number, number],
): string | null {
  const alias = code.slice(range[0], range[1]).trim();
  if (!/^[A-Za-z_$][\w$]*$/.test(alias)) return null;

  // Keep the lookback small and choose the last declaration/assignment before
  // the source use. This supports comma declarations while avoiding a distant
  // alias in a large bundle. The match is intentionally limited to a simple
  // receiver's `innerHTML` (optionally followed by `.toString()`).
  const before = code.slice(Math.max(0, range[0] - 2_000), range[0]);
  const escaped = alias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const assignments = new RegExp(
    `(?:\\b(?:const|let|var)\\s+|[,;]\\s*)${escaped}\\s*=\\s*` +
      `([A-Za-z_$][\\w$]*)\\s*\\.\\s*innerHTML` +
      `(?:\\s*\\.\\s*toString\\s*\\(\\s*\\))?`,
    "g",
  );
  let receiver: string | null = null;
  for (let match = assignments.exec(before); match; match = assignments.exec(before)) {
    receiver = match[1];
  }
  return receiver;
}

/**
 * Recover the direct binding in `const value = element.innerHTML` at a taint
 * source.  This is used only for the companion i18n-helper recogniser below;
 * both the receiver and the value must subsequently occur as direct arguments
 * to the helper.  Keeping this as a two-name binding prevents a file-wide
 * `i18n.getMessage` call from suppressing an unrelated DOM flow.
 */
function innerHtmlReadBinding(
  code: string,
  range: [number, number],
): { receiver: string; value: string } | null {
  const receiver = innerHtmlReceiverNearRange(code, range);
  if (!receiver) return null;

  const before = code.slice(Math.max(0, range[0] - 240), range[0]);
  // Depending on the def-use node shape, `range` begins either at the full
  // MemberExpression (`element.innerHTML`) or at the property identifier
  // (`innerHTML`).  Accept both direct syntactic prefixes, while requiring
  // that the explicit receiver agrees with the recovered member receiver.
  const memberBinding =
    /(?:\b(?:const|let|var)\s+|[,;]\s*)([A-Za-z_$][\w$]*)\s*=\s*([A-Za-z_$][\w$]*)\s*\.\s*$/.exec(
      before,
    );
  if (memberBinding && memberBinding[2] !== receiver) return null;
  const bareBinding =
    /(?:\b(?:const|let|var)\s+|[,;]\s*)([A-Za-z_$][\w$]*)\s*=\s*$/.exec(
      before,
    );
  const value = memberBinding?.[1] ?? bareBinding?.[1];
  if (!value) return null;
  return { receiver, value };
}

/**
 * Recognise this deliberately narrow interprocedural form of the same i18n
 * rewrite:
 *
 *   function replaceI18n(element, value) { ... value.replace(__MSG_...)
 *     ... element.innerHTML = ...; }
 *   const value = element.innerHTML.toString();
 *   replaceI18n(element, value);
 *
 * In the report path the helper body can precede the source call.  We require
 * the precise function declaration, parameter-to-sink correspondence and
 * direct caller arguments, so it cannot accidentally accept an arbitrary
 * extension i18n operation elsewhere in the bundle.
 */
function isI18nPlaceholderHelperInvocation(
  code: string,
  sourceRange: [number, number],
  sinkRange: [number, number],
  sinkReceiver: string,
): boolean {
  if (sinkRange[0] >= sourceRange[0]) return false;
  if (sourceRange[1] - sinkRange[0] > 12_000) return false;

  const source = innerHtmlReadBinding(code, sourceRange);
  if (!source) return false;

  const beforeSink = code.slice(Math.max(0, sinkRange[0] - 2_000), sinkRange[0]);
  const declarations = /\bfunction\s+([A-Za-z_$][\w$]*)\s*\(\s*([A-Za-z_$][\w$]*)\s*,\s*([A-Za-z_$][\w$]*)\s*\)\s*\{/g;
  let helper: { name: string; receiverParam: string; valueParam: string; start: number } | null = null;
  for (let match = declarations.exec(beforeSink); match; match = declarations.exec(beforeSink)) {
    helper = {
      name: match[1],
      receiverParam: match[2],
      valueParam: match[3],
      start: Math.max(0, sinkRange[0] - 2_000) + match.index,
    };
  }
  if (!helper || sinkReceiver !== helper.receiverParam) return false;

  const helperBody = code.slice(helper.start, sourceRange[0]);
  const escapedValue = helper.valueParam.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const hasI18nPlaceholder =
    /__MSG_[A-Za-z0-9_]+__/.test(helperBody) ||
    /__MSG_\(\s*\\w\s*\+\s*\)__/.test(helperBody);
  if (
    !hasI18nPlaceholder ||
    !new RegExp(`\\b${escapedValue}\\s*\\.\\s*replace\\s*\\(`).test(helperBody) ||
    !/(?:chrome|browser)\s*\.\s*i18n\s*\.\s*getMessage\s*\(/.test(helperBody)
  ) {
    return false;
  }

  const afterSource = code.slice(sourceRange[1], Math.min(code.length, sourceRange[1] + 1_200));
  const escapedName = helper.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const escapedReceiver = source.receiver.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const escapedSourceValue = source.value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(
    `\\b${escapedName}\\s*\\(\\s*${escapedReceiver}\\s*,\\s*${escapedSourceValue}\\s*\\)`,
  ).test(afterSource);
}

/** ----------------------------------------
 * TaintManager
 * ---------------------------------------- */
export class TaintManager {
  private _contexts: Map<string, TaintContext> = new Map();
  private _currentContext: TaintContext | null = null;
  private _bridges: Map<string, InterContextBridge> = new Map();
  private _resolvedBridgePairs: Set<string> = new Set();

  private _storageSets: StorageSet[] = [];
  private _storageGets: StorageGet[] = [];

  /**
   * Storage resolution is invoked from each report-producing API. Keep a
   * stable key for every (set, get, source-taint) composition that has
   * already been materialized so repeated report calls remain idempotent.
   * Without this guard each report call allocates a new synthetic taint and
   * clones the complete sender path again.
   */
  private _resolvedStoragePairs: Set<string> = new Set();

  /**
   * Areas read with an unresolved / wildcard key — `storage.local.get(null)`,
   * `get(someComputedKey)`, or a `storage.onChanged` listener. Any of these
   * can observe *any* key in that area, so they count as a consumer for every
   * key. `"*"` means "every area".
   */
  private _storageWildcardReads: Set<string> = new Set();

  /** Flows dropped by the privilege-delta gate during the last report run. */
  private _suppressedByPrivilegeDelta: PrivilegeSuppressedFlow[] = [];

  // report options (can be changed at runtime)
  private _reportOptions: Required<ReportOptions> = {
    ...DEFAULT_REPORT_OPTIONS,
    ...(config.taintReportOptions ?? {}),
  };

  /* ============================================================
   * Context Management
   * ============================================================ */

  enterFile(script: ExtensionScript) {
    let ctx = this._contexts.get(script.key);
    if (!ctx) {
      ctx = new TaintContext(script);
      this._contexts.set(script.key, ctx);
    }
    this._currentContext = ctx;
  }

  exitFile() {
    this._currentContext = null;
  }

  get current(): TaintContext {
    if (!this._currentContext) {
      throw new Error("TaintManager: no active file context");
    }
    return this._currentContext;
  }

  /* ============================================================
   * Storage Modeling
   * ============================================================ */

  /**
   * Record storage.set(key, value)
   */
  recordStorageSet(area: string, key: string, valueDef: Def, astNode: Node) {
    this._storageSets.push({
      area,
      key,
      valueDef,
      contextFilename: this.current.filename,
      astNode,
    });
  }

  /**
   * Record storage.get(key) and immediately create
   * a PSEUDO_STORAGE taint.
   */
  recordStorageGet(
    area: string,
    key: string,
    targetDef: Def,
    astNode: Node,
  ): number {
    const ctx = this.current;

    const taintId = this.createTaintSource(
      targetDef,
      "PSEUDO_STORAGE",
      astNode,
      true,
      `storage.${area}.get('${key}')`,
    );

    this._storageGets.push({
      area,
      key,
      targetDef,
      taintId,
      contextFilename: ctx.filename,
      astNode,
    });

    return taintId;
  }

  /**
   * Record a read that can observe any key in `area` (`"*"` for any area).
   *
   * Used by `storage.<area>.get(null)`, gets whose key expression could not be
   * resolved statically, and `storage.onChanged` listeners. Keeping these
   * separate from `_storageGets` matters for `hasStorageConsumer`: a wildcard
   * read must not be treated as a *specific* (area, key) round-trip, but it
   * must still count as a consumer so storage-poisoning findings are not
   * suppressed for extensions that read their storage generically.
   */
  recordStorageWildcardRead(area: string) {
    this._storageWildcardReads.add(area);
  }

  /**
   * Does anything in this extension read back `(area, key)`?
   *
   * A `chrome.storage` write that nothing ever reads cannot poison a later
   * decision, so `STORAGE_POSOING` findings for such keys carry no privilege
   * consequence. Conservative by construction: any wildcard read makes this
   * true for every key in the area.
   */
  hasStorageConsumer(area: string, key: string): boolean {
    if (this._storageWildcardReads.has("*")) return true;
    if (this._storageWildcardReads.has(area)) return true;

    return this._storageGets.some((g) => g.area === area && g.key === key);
  }

  /* ============================================================
   * Taint Source
   * ============================================================ */

  createTaintSource(
    def: Def,
    sourceType: SourceType,
    astNode: Node | null,
    isPseudo: boolean = false,
    remark?: string,
  ): number {
    const ctx = this.current;

    const taintId = this._getOrCreateSourceTaintId(
      ctx,
      sourceType,
      astNode,
      remark,
    );

    // Only record source when first appears
    if (!ctx.sources.some((s) => s.taintId === taintId)) {
      ctx.sources.push({
        taintId,
        sourceType,
        originDefId: def.uniqueId,
        isPseudo,
        remark,
        originContextFilename: ctx.filename,
        originFrameFamily: this.getContextFrameFamily(ctx.filename),
        provenance: this.inferTaintProvenance(
          sourceType,
          this.getContextFrameFamily(ctx.filename),
          isPseudo,
          remark,
          ctx.script.getCode() ?? undefined,
        ),
      });
    } else {
      // A source can be materialized more than once while a shared script is
      // analyzed.  Keep the most useful provenance rather than overwriting an
      // already-known web-reachable origin with UNKNOWN/UI metadata.
      const existing = ctx.sources.find((s) => s.taintId === taintId)!;
      this.mergeTaintSourceMetadata(existing, {
        originContextFilename: ctx.filename,
        originFrameFamily: this.getContextFrameFamily(ctx.filename),
        provenance: this.inferTaintProvenance(
          sourceType,
          this.getContextFrameFamily(ctx.filename),
          isPseudo,
          remark,
          ctx.script.getCode() ?? undefined,
        ),
      });
    }

    this._addTaintIdToDef(ctx, def, taintId);

    return taintId;
  }

  /**
   * Project a previously written storage value into the receiving context.
   *
   * Storage bridges must stay tainted: a page-controlled object may contain a
   * raw title next to a numeric count.  However, flattening that object to one
   * opaque ``UnknownDef`` loses the JavaScript type facts of its individual
   * fields.  That is what made `count`, `toFixed()` and Date-display-only
   * popup templates look like DOM-XSS sinks.  This deliberately copies only
   * safe runtime *kinds* (number/boolean and syntax-safe formatted strings),
   * never values or sender taint ids.  Unknown fields remain opaque and the
   * projected container is marked opaque, so a raw field still receives the
   * receiver-side synthetic taint and remains reportable.
   *
   * The projection is used only when exactly one producer *site* has already
   * been observed for a literal (area, key). A function can be modeled more
   * than once, so repeated executions of the same AST write site are harmless;
   * genuinely distinct writes or a producer not yet analyzed fall back to the
   * existing conservative UnknownDef.
   */
  getStorageReadShape(
    area: string,
    key: string,
    callNode: FlowNode,
  ): Def | null {
    const producer = this.getUniqueStorageProducer(area, key);
    return producer
      ? this.projectStorageValueShape(producer.valueDef, callNode)
      : null;
  }

  /**
   * Return a producer only when all observations of a storage key come from
   * one AST write site. Re-analyzing a function may record that same site more
   * than once; different sites remain intentionally unresolved.
   */
  private getUniqueStorageProducer(area: string, key: string): StorageSet | null {
    const matches = this._storageSets.filter(
      (set) => set.area === area && set.key === key,
    );
    const sites = new Map<string, StorageSet>();
    for (const set of matches) {
      const range = (set.astNode as any)?.range;
      const location = Array.isArray(range) ? `${range[0]}:${range[1]}` : "unknown";
      sites.set(`${set.contextFilename}:${location}`, set);
    }
    if (sites.size !== 1) return null;
    return [...sites.values()][0];
  }

  /**
   * Resolve the bounded set of literal keys known in an area for a generic
   * helper such as `getStorage(keys)`. Unknown keys remain wildcard reads, but
   * retaining these proven shapes avoids degrading every property to raw text
   * simply because an inter-procedural parameter lost its literal array type.
   */
  getKnownStorageReadShapes(area: string, callNode: FlowNode): Map<string, Def> {
    const keys = new Set<string>();
    for (const set of this._storageSets) {
      if (set.area !== area) continue;
      keys.add(set.key);
      // Generic storage gets can appear in large applications. Keep this
      // helper bounded; the wildcard model below remains conservative.
      if (keys.size >= 128) break;
    }

    const shapes = new Map<string, Def>();
    for (const key of keys) {
      const shape = this.getStorageReadShape(area, key, callNode);
      if (shape) shapes.set(key, shape);
    }
    return shapes;
  }

  private projectStorageValueShape(value: Def, callNode: FlowNode, depth = 0): Def {
    // Never chase unbounded/cyclic object graphs while modeling a storage
    // boundary.  Returning unknown at the limit preserves the old behavior.
    if (depth > 4) {
      const projected = new UnknownDef(callNode);
      projected.markStorageSerialized();
      return projected;
    }

    if (Def.isPrimitiveDef(value)) {
      const projected = new PrimitiveDef(callNode, value.primitiveKind);
      projected.markStorageSerialized();
      return projected;
    }
    if (Def.isStringSafeDef(value)) {
      const projected = new StringSafeDef(callNode);
      projected.markStorageSerialized();
      return projected;
    }
    if (Def.isLiteralDef(value)) {
      if (typeof value.value === "number") {
        const projected = new PrimitiveDef(callNode, "number");
        projected.markStorageSerialized();
        return projected;
      }
      if (typeof value.value === "boolean") {
        const projected = new PrimitiveDef(callNode, "boolean");
        projected.markStorageSerialized();
        return projected;
      }
      // A source-code literal cannot supply attacker-controlled markup.
      if (typeof value.value === "string") {
        const projected = new StringSafeDef(callNode);
        projected.markStorageSerialized();
        return projected;
      }
      const projected = new UnknownDef(callNode);
      projected.markStorageSerialized();
      return projected;
    }
    if (!Def.isObjectDef(value)) {
      const projected = new UnknownDef(callNode);
      projected.markStorageSerialized();
      return projected;
    }

    const projected = new ObjectDef(callNode);
    projected.markStorageSerialized();
    if (value.isArrayLike) projected.markArrayLike();
    // A storage read is a cross-context boundary. Preserve raw-field flows
    // through the normal container fallback while leaving known numeric/date
    // display fields typed.
    projected.markOpaqueContainerTaint();
    for (const [name, field] of value.props) {
      projected.setProperty(
        name,
        this.projectStorageValueShape(field, callNode, depth + 1),
        false,
        value.isArrayLike && /^(?:0|[1-9]\d*)$/.test(name),
      );
    }
    return projected;
  }

  /** Return the frame family of the context that actually created a source. */
  private getContextFrameFamily(contextFilename: string): TaintFrameFamily {
    return scriptUsageTracker.getPrimaryFrameFamilyByKey(
      contextFilename,
    ) as TaintFrameFamily;
  }

  /**
   * Infer whether a source is reachable from the web.  This is intentionally
   * conservative: only an actual content-script source or an explicit
   * external-message source is considered web input.  Popup/options values
   * are extension-owned input and remain tainted for ordinary data-flow, but
   * are not promoted to web taint merely because they cross runtime.onMessage.
   */
  private inferTaintProvenance(
    sourceType: SourceType,
    frameFamily: TaintFrameFamily,
    isPseudo: boolean,
    sourceRemark?: string,
    sourceCode?: string,
  ): TaintProvenance {
    if (isPseudo) return "UNKNOWN";

    if (
      sourceType === "CHROME_ONMESSAGEEXTERNAL_MESSAGE" ||
      sourceType === "CHROME_ONCONNECTEXTERNAL_ONMESSAGE" ||
      sourceType === "CHROME_CONNECT_ONMESSAGE_EXTERANL"
    ) {
      return "EXTERNAL_MESSAGE";
    }

    const domInput =
      sourceType === "ELEMENT_VALUE" ||
      sourceType === "JQUERY_ELEMENT_VAL" ||
      sourceType === "ELEMENT_TEXT_CONTENT" ||
      sourceType === "ELEMENT_INNER_HTML" ||
      sourceType === "ELEMENT_OUTER_HTML" ||
      sourceType === "DOCUMENT_LOCATION" ||
      sourceType === "DOCUMENT_URL" ||
      sourceType === "DOCUMENT_TITLE" ||
      sourceType === "DOCUMENT_COOKIE" ||
      sourceType === "WINDOW_MESSAGE_EVENT" ||
      sourceType === "WINDOW_CUSTOM_EVENT" ||
      sourceType === "TARGET_CUSTOM_EVENT";

    if (domInput && (frameFamily === "CS" || frameFamily === "MAIN")) {
      // A content script sometimes injects its own small settings/payment UI
      // into the page. A literal form control declared by that same extension
      // script is extension UI, not an arbitrary page form. Keep this very
      // narrow: only exact static ids of input/textarea/select controls qualify;
      // ordinary page selectors remain CONTENT_SCRIPT taint.
      if (
        this.isExtensionOwnedInjectedFormControl(
          sourceType,
          sourceRemark,
          sourceCode,
        )
      ) {
        return "EXTENSION_UI";
      }
      return "CONTENT_SCRIPT";
    }
    if (domInput && (frameFamily === "EX" || frameFamily === "DT" || frameFamily === "OF")) {
      return "EXTENSION_UI";
    }

    return "UNKNOWN";
  }

  /**
   * Detect an extension-owned form control injected by the current content
   * script. This intentionally requires an exact literal id in a literal HTML
   * tag in the same script. It does not suppress page fields merely because
   * their id looks familiar, and it never applies to unknown/dynamic selectors.
   */
  private isExtensionOwnedInjectedFormControl(
    sourceType: SourceType,
    sourceRemark?: string,
    sourceCode?: string,
  ): boolean {
    if (
      sourceType !== "ELEMENT_VALUE" &&
      sourceType !== "JQUERY_ELEMENT_VAL"
    ) {
      return false;
    }
    if (!sourceRemark || !sourceCode) return false;

    const raw = sourceRemark.trim();
    const id = raw.startsWith("#") ? raw.slice(1) : raw;
    // getElementById("id") and $('#id') retain only the literal selector in
    // sourceRemark. Reject complex CSS selectors and event placeholders.
    if (!/^[A-Za-z][A-Za-z0-9_:-]{0,127}$/.test(id)) return false;

    const escapedId = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const quotedId = `\\bid\\s*=\\s*([\"'])${escapedId}\\1`;
    const formControl = new RegExp(
      `<\\s*(?:input|textarea|select)\\b(?=[^>]*${quotedId})[^>]*>`,
      "i",
    );
    return formControl.test(sourceCode);
  }

  /** Merge provenance without allowing a weaker later observation to erase a
   * known content-script/external route. */
  private mergeTaintSourceMetadata(
    target: any,
    incoming: {
      originContextFilename?: string;
      originFrameFamily?: TaintFrameFamily;
      provenance?: TaintProvenance;
    },
  ) {
    if (!target.originContextFilename && incoming.originContextFilename) {
      target.originContextFilename = incoming.originContextFilename;
    }
    if (
      (!target.originFrameFamily || target.originFrameFamily === "UNKNOWN") &&
      incoming.originFrameFamily
    ) {
      target.originFrameFamily = incoming.originFrameFamily;
    }

    const rank: Record<TaintProvenance, number> = {
      UNKNOWN: 0,
      EXTENSION_UI: 1,
      CONTENT_SCRIPT: 2,
      UNTRUSTED_STORAGE: 3,
      EXTERNAL_MESSAGE: 4,
    };
    if (
      incoming.provenance &&
      (!target.provenance ||
        rank[incoming.provenance] >
          rank[target.provenance as TaintProvenance])
    ) {
      target.provenance = incoming.provenance;
    }
  }

  private _getOrCreateSourceTaintId(
    ctx: TaintContext,
    sourceType: SourceType,
    astNode: Node | null,
    remark?: string,
  ): number {
    const key = buildSourceKey(sourceType, astNode, remark);

    const existed = ctx.sourceKeyToTaintId.get(key);
    if (existed) return existed;

    const id = taintGenerator.nextId();
    ctx.sourceKeyToTaintId.set(key, id);
    ctx.knownTaintIds.add(id);

    return id;
  }

  /* =======================
   * Propagation (creates edges in DAG)
   * ======================= */
  propagateTaint(
    from: Def | null,
    to: Def | null,
    astNode: Node,
    kind: PropagateType = "OTHER",
    remark: string = "",
  ) {
    if (!from || !to || !from.isTainted) return;
    if (from.uniqueId === to.uniqueId) return;

    const ctx = this.current;
    const fromSet = ctx.defToTaintIds.get(from.uniqueId);
    if (!fromSet) return;

    for (const taintId of fromSet) {
      this._addTaintIdToDef(ctx, to, taintId);
      // A concrete property write (obj.key = value, object literal field, or
      // array element) does not make every sibling field semantically tainted.
      // Preserve that field-local fact so member reads can distinguish it from
      // genuinely opaque containers such as JSON.parse(tainted) and spreads
      // of unknown objects.  This is the key distinction behind title->count
      // and title->unrelated-message-field false positives.
      if (
        Def.isObjectDef(to) &&
        !(kind === "ELEMENT" && remark === "object.setProperty")
      ) {
        to.markOpaqueContainerTaint();
      }

      this._addPathEdge(ctx, taintId, from, to, astNode, kind, remark);
    }
  }

  /* ============================================================
   * Sink Checking
   * ============================================================ */

  /**
   * Check whether a tainted def reaches a sink.
   */
  checkSink(
    sourceDef: Def | null,
    sinkType: SinkType,
    astNode: Node,
    remark?: string,
    urlTaintControl?: UrlTaintControl,
  ) {
    if (!sourceDef || !sourceDef.isTainted) return;

    const ctx = this.current;
    const taintIds = this.getDefTaintIds(sourceDef);
    if (taintIds.length === 0) return;

    // Numeric/boolean values cannot become executable source text or HTML.
    // Do not clear their taint: the very same value may subsequently reach a
    // privileged configuration API (notably chrome.alarms.create), where it
    // remains attacker-controlled and must be reported.
    if (
      isSafeForStringInterpretation(sourceDef) &&
      isStringInterpretingSink(sinkType)
    ) {
      logger.debug(
        `[TAINT-SINK-SUPPRESSED] [${sinkType}] receives a syntax-safe ` +
          `non-string/static template value in [${formatLocation(astNode)}]; ` +
          `attacker data cannot supply code/HTML syntax`,
      );
      return;
    }

    for (const taintId of taintIds) {
      const rec: TaintSinkRecord = {
        taintId,
        sinkType,
        sourceDef: sourceDef,
        astNode,
        remark,
        urlTaintControl,
      };

      ctx.sinks.push(rec);

      logger.debug(
        `[TAINT-SINK][${ctx.filename}] found [${sinkType}] in [${formatLocation(astNode)}] with remark [${remark ?? ""}] and url-control [${urlTaintControl ?? "N/A"}]`,
      );
    }
  }

  /* ============================================================
   * Sanitizer
   * ============================================================ */

  /**
   * Remove taint from a def for specific taint ids.
   */
  applySanitizer(def: Def | null, sanitizerName: string, astNode: Node) {
    if (!def) return;

    const ids = this.getDefTaintIds(def);
    if (ids.length === 0) return;

    const ctx = this.current;

    for (const taintId of ids) {
      this.sanitizeDefForTaint(ctx, def, taintId);
      ctx.sanitizers.push({
        taintId,
        sanitizerName,
        def,
        astNode,
      });
      logger.warn(
        `[TAINT-SANITIZER][${ctx.filename}] clear taint [${taintId}] state by sanitizer ${sanitizerName} in [${formatLocation(astNode)}]`,
      );
    }
  }

  sanitizeDefForTaint(ctx: TaintContext, def: Def, taintId: number) {
    const set = ctx.defToTaintIds.get(def.uniqueId);
    if (!set) return;

    set.delete(taintId);

    if (set.size === 0) {
      ctx.defToTaintIds.delete(def.uniqueId);
      def.clearTaintFlag();
    }
  }

  /* ============================================================
   * DAG Helpers
   * ============================================================ */

  private _edgeKey(fromId: number, toId: number, astNode: Node) {
    const r1 = (astNode as any)?.range;
    const rPart = r1 ? `${r1[0]}:${r1[1]}` : "unknown";
    return `${fromId}->${toId}@${rPart}`;
  }

  /**
   * Insert propagation edge into taint DAG.
   */
  private _addPathEdge(
    ctx: TaintContext,
    taintId: number,
    from: Def,
    to: Def,
    astNode: Node,
    PropagateType: PropagateType = "OTHER",
    remark: string = "",
    transport?: Pick<
      TaintPathRecord,
      | "senderContextFilename"
      | "senderFrameFamily"
      | "receiverContextFilename"
      | "receiverFrameFamily"
      | "senderProvenance"
    >,
  ) {
    if (!ctx.pathDag.has(taintId)) ctx.pathDag.set(taintId, new Map());
    const dag = ctx.pathDag.get(taintId)!;
    const key = this._edgeKey(from.uniqueId, to.uniqueId, astNode);
    if (dag.has(key)) return; // already exists

    const rec: TaintPathRecord = {
      taintId,
      fromDef: from,
      toDef: to,
      astNode,
      PropagateType,
      remark,
      ...transport,
    };
    dag.set(key, rec);
    ctx.knownTaintIds.add(taintId);

    // keep compatibility array small — rebuild on demand
    // TODO: Should rebuild on demand in report phase
    // ctx.syncPathsFromDag();
  }

  /* ============================================================
   * Query
   * ============================================================ */

  getDefTaintIds(def: Def): number[] {
    const s = this.current.defToTaintIds.get(def.uniqueId);
    return s ? [...s] : [];
  }

  /* ============================================================
   * Pseudo-Taint Resolution
   * ============================================================ */

  addPseudoTaintReceiver(receiver: PseudoTaintReceiver) {
    const key = this._bridgeKey(receiver.channel, receiver.outer);
    let bridge = this._bridges.get(key);
    if (!bridge) {
      bridge = new InterContextBridge(receiver.channel, receiver.outer);
      this._bridges.set(key, bridge);
    }
    bridge.addReceiver(receiver);
    this.tryResolveBridgeByKey(key);
  }

  addPseudoTaintSender(sender: PseudoTaintSender) {
    if (!sender.taintDef.isTainted) return;

    const key = this._bridgeKey(sender.channel, sender.outer);
    let bridge = this._bridges.get(key);
    if (!bridge) {
      bridge = new InterContextBridge(sender.channel, sender.outer);
      this._bridges.set(key, bridge);
    }
    bridge.addSender(sender);
    this.tryResolveBridgeByKey(key);
  }

  private _bridgeKey(channel: string, outer?: string) {
    return `${channel}::${outer ?? "<no-outer>"}`;
  }

  private tryResolveBridgeByKey(key: string) {
    const bridge = this._bridges.get(key);
    if (!bridge) return;

    const contextsWithUpdates = new Set<TaintContext>();
    this.processBridge(bridge, this._resolvedBridgePairs, contextsWithUpdates);
    this.syncAllContexts(contextsWithUpdates);
  }

  /**
   * Analyze the relationship between Storage Set and Get
   */
  private resolveStorageTaints() {
    // Keep chrome.storage writes as regular sinks, but do not create the
    // synthetic set -> get taint bridge in the storage-flow ablation.
    if (!config.enableStorageImplicitPropagation) return;
    if (this._storageGets.length === 0 || this._storageSets.length === 0)
      return;
    const contextsWithUpdates = new Set<TaintContext>();
    let newlyResolved = false;
    const newlyResolvedTaintIds = new Set<number>();
    const bridgesToRetry = new Set<InterContextBridge>();
    for (let getIndex = 0; getIndex < this._storageGets.length; getIndex++) {
      const getReq = this._storageGets[getIndex];
      const receiverCtx = this.getContext(getReq.contextFilename);
      if (!receiverCtx) continue;

      // Find all Set operations that match this key.
      for (let setIndex = 0; setIndex < this._storageSets.length; setIndex++) {
        const setReq = this._storageSets[setIndex];
        if (setReq.key !== getReq.key || setReq.area !== getReq.area) continue;

        const senderCtx = this.getContext(setReq.contextFilename);
        if (!senderCtx) continue;

        // Retrieves all true taints contained in the Set (excluding false taints to avoid infinite recursion).
        const s = senderCtx.defToTaintIds.get(setReq.valueDef.uniqueId);
        const senderTaintIds = (s ? [...s] : []).filter((id) => {
          const src = senderCtx.sources.find((s) => s.taintId === id);
          return src && !src.isPseudo;
        });

        for (const sTaintId of senderTaintIds) {
          // Array positions are stable for the lifetime of one analysis and
          // avoid retaining the large request objects just for bookkeeping.
          const pairKey = `${setIndex}:${getIndex}:${sTaintId}`;
          if (this._resolvedStoragePairs.has(pairKey)) continue;

          // Create a composition source to introduce the Sender's taint into the Receiver environment.
          const syntheticId = this.createSyntheticSourceFromStorage(
            setReq,
            senderCtx,
            sTaintId,
            getReq,
            receiverCtx,
          );

          // Cloning path: Sender's path -> Receiver
          this.cloneSenderPaths(senderCtx, sTaintId, receiverCtx, syntheticId);

          // Add logical edges across storage
          this._addPathEdge(
            receiverCtx,
            syntheticId,
            setReq.valueDef,
            getReq.targetDef,
            getReq.astNode,
            "STORAGE",
            `STORAGE_FLOW[area: ${getReq.area}, key: ${getReq.key}, sender: ${senderCtx.filename}, receiver: ${receiverCtx.filename}]`,
          );

          // Key: Replace/merge the original PSEUDO_STORAGE taint path into this actual synthetic taint.
          this.mergePseudoToSynthetic(receiverCtx, getReq.taintId, syntheticId);

          // Only message senders that directly carried this storage pseudo
          // taint need a retry.  Do not replay every bridge in a large
          // extension: that can re-enter thousands of unrelated callbacks.
          for (const bridge of this._bridges.values()) {
            if (
              bridge.senders.some((sender) => {
                if (sender.contextFilename !== receiverCtx.filename) return false;
                const ids = receiverCtx.defToTaintIds.get(
                  sender.taintDef.uniqueId,
                );
                if (!ids?.has(getReq.taintId)) return false;
          this._addTaintIdToDef(
                  receiverCtx,
                  sender.taintDef,
                  syntheticId,
                );
                return true;
              })
            ) {
              bridgesToRetry.add(bridge);
            }
          }

          contextsWithUpdates.add(receiverCtx);
          this._resolvedStoragePairs.add(pairKey);
          newlyResolvedTaintIds.add(syntheticId);
          newlyResolved = true;
        }
      }
    }

    // A storage-backed message sender may have been registered while its
    // value still carried only the PSEUDO_STORAGE taint.  Once the concrete
    // storage source is materialized, retry bridges exactly once for the new
    // source IDs so the message parameter can reach its sink.
    if (newlyResolved) {
      // Restrict the retry to bridges whose sender definition now contains an
      // UNTRUSTED_STORAGE source.  Replaying every bridge here is both
      // unnecessary and expensive for large extensions with many unrelated
      // runtime listeners; callbacks can also register additional bridges.
      for (const bridge of bridgesToRetry) {
        this.processBridge(
          bridge,
          this._resolvedBridgePairs,
          contextsWithUpdates,
          newlyResolvedTaintIds,
        );
      }
    }

    this.syncAllContexts(contextsWithUpdates);
  }

  /**
   * Synthesis source created specifically for storage
   */
  private createSyntheticSourceFromStorage(
    setReq: StorageSet,
    senderCtx: TaintContext,
    senderTaintId: number,
    getReq: StorageGet,
    receiverCtx: TaintContext,
  ): number {
    const senderSource = senderCtx.sources.find(
      (s) => s.taintId === senderTaintId,
    );
    const storageProvenance =
      senderSource?.provenance === "CONTENT_SCRIPT" ||
      senderSource?.provenance === "EXTERNAL_MESSAGE" ||
      senderSource?.provenance === "UNTRUSTED_STORAGE"
        ? "UNTRUSTED_STORAGE"
        : senderSource?.provenance ?? "UNKNOWN";
    const syntheticId = taintGenerator.nextId();

    receiverCtx.knownTaintIds.add(syntheticId);
    receiverCtx.sources.push({
      taintId: syntheticId,
      sourceType: senderSource?.sourceType ?? ("STORAGE_DATA" as any),
      remark: `From storage.${setReq.area}.set('${setReq.key}') in ${senderCtx.filename}`,
      // Retain the root source rather than the immediate storage value.  The
      // report layer uses originDefId to recover the source frame; recording
      // the last hop here made a Popup/Options ELEMENT_VALUE look as though it
      // originated in the background consumer, defeating frame-sensitive
      // filtering.  The fallback keeps the old behaviour for incomplete taint
      // metadata.
      originDefId: senderSource?.originDefId ?? setReq.valueDef.uniqueId,
      isPseudo: false,
      originContextFilename:
        senderSource?.originContextFilename ?? senderCtx.filename,
      originFrameFamily:
        senderSource?.originFrameFamily ??
        this.getContextFrameFamily(senderCtx.filename),
      provenance: storageProvenance,
    });

    this._addTaintIdToDef(receiverCtx, getReq.targetDef, syntheticId);

    return syntheticId;
  }

  /**
   * Merge the temporary pseudo-taint path generated by Get into the actual synthetic taint path.
   */
  private mergePseudoToSynthetic(
    ctx: TaintContext,
    pseudoId: number,
    syntheticId: number,
  ) {
    const pseudoDag = ctx.pathDag.get(pseudoId);
    if (!pseudoDag) return;

    if (!ctx.pathDag.has(syntheticId)) ctx.pathDag.set(syntheticId, new Map());
    const targetDag = ctx.pathDag.get(syntheticId)!;

    for (const rec of pseudoDag.values()) {
      const key = this._edgeKey(
        rec.fromDef.uniqueId,
        rec.toDef.uniqueId,
        rec.astNode,
      );
      if (!targetDag.has(key)) {
        targetDag.set(key, { ...rec, taintId: syntheticId });
      }
    }

    // Simultaneously merge Sink
    const sinksToClone = ctx.sinks.filter((s) => s.taintId === pseudoId);
    for (const sink of sinksToClone) {
      if (
        !ctx.sinks.some(
          (s) => s.taintId === syntheticId && s.astNode === sink.astNode,
        )
      ) {
        ctx.sinks.push({ ...sink, taintId: syntheticId });
      }
    }

    // Update taintId for outer senders that match the pseudoId
    // for (const sender of ctx.outerSenders) {
    //   if (sender.taintId === pseudoId) {
    //     sender.taintId = syntheticId;
    //   }
    // }
  }

  /**
   * Handling a single bridge
   */
  private processBridge(
    bridge: InterContextBridge,
    resolved: Set<string>,
    contextsWithUpdates: Set<TaintContext>,
    onlyTaintIds?: Set<number>,
  ) {
    const { senders, receivers } = bridge;

    // Handling bridges that exist on both the sender and receiver
    if (senders.length > 0 && receivers.length > 0) {
      this.processBridgeWithBothSides(
        bridge,
        resolved,
        contextsWithUpdates,
        onlyTaintIds,
      );
    }
  }

  /**
   * Handling bidirectional bridging
   */
  private processBridgeWithBothSides(
    bridge: InterContextBridge,
    resolved: Set<string>,
    contextsWithUpdates: Set<TaintContext>,
    onlyTaintIds?: Set<number>,
  ) {
    for (const sender of bridge.senders) {
      const senderCtx = this.getContext(sender.contextFilename);
      if (!senderCtx) continue;

      const senderTaintIds = this.getValidSenderTaintIds(senderCtx, sender)
        .filter((id) => !onlyTaintIds || onlyTaintIds.has(id));
      if (!senderTaintIds.length) continue;

      for (const receiver of bridge.receivers) {
        // If the sender and receiver are in the same file and not in an outer scope, skip.
        if (
          receiver.contextFilename === sender.contextFilename &&
          !receiver.outer
        ) {
          // TODO: Later there should be consider manifest.json file!
          continue;
        }

        const receiverCtx = this.getContext(receiver.contextFilename);
        if (!receiverCtx) continue;

        // Internal runtime messages are not an all-to-all data bus.  Only
        // connect endpoints when every fully-known shared action/type field
        // has at least one common candidate. Unknown/Implicit candidates are
        // intentionally retained by messageProtocolsMayMatch().
        if (!messageProtocolsMayMatch(sender.protocol, receiver.protocol)) {
          logger.debug(
            `[MESSAGE-PROTOCOL] skip impossible bridge ` +
              `${sender.contextFilename}(${sender.protocol?.frameFamily ?? "UNKNOWN"}) -> ` +
              `${receiver.contextFilename}(${receiver.protocol?.frameFamily ?? "UNKNOWN"})`,
          );
          continue;
        }

        this.processSenderReceiverPair(
          sender,
          senderCtx,
          senderTaintIds,
          receiver,
          receiverCtx,
          bridge,
          resolved,
          contextsWithUpdates,
        );
      }
    }
  }

  /**
   * Obtain a valid sender taint ID
   */
  private getValidSenderTaintIds(
    ctx: TaintContext,
    sender: PseudoTaintSender,
  ): number[] {
    const taintSet = ctx.defToTaintIds.get(sender.taintDef.uniqueId);
    if (!taintSet || taintSet.size === 0) return [];

    const validTaintIds: number[] = [];
    for (const taintId of taintSet) {
      const source = ctx.sources.find((s) => s.taintId === taintId);
      // Ensure it's a genuine source, not a fake blemish.
      if (source && !source.isPseudo) {
        validTaintIds.push(taintId);
      }
    }
    return validTaintIds;
  }

  private withReceiverContext(receiverCtx: TaintContext, fn: () => void) {
    const prevCtx = this._currentContext;
    this._currentContext = receiverCtx;

    // resolvePseudoTaints 阶段通常没有活动 timer，这里给 receiver 建一个
    let ownTimer = false;
    if (!fileTimerManager.getCurrentTimer()) {
      fileTimerManager.setCurrentTimer(
        receiverCtx.script.absPath,
        receiverCtx.script.getFileSize(),
      );
      ownTimer = true;
    }

    try {
      fn();
    } finally {
      this._currentContext = prevCtx;
      if (ownTimer) fileTimerManager.clearCurrentTimer();
    }
  }

  private materializeSenderMessageTaintInReceiver(
    sender: PseudoTaintSender,
    senderCtx: TaintContext,
    senderTaintId: number,
    receiver: PseudoTaintReceiver,
    receiverCtx: TaintContext,
    channel: string,
  ) {
    const senderSource = senderCtx.sources.find(
      (s) => s.taintId === senderTaintId,
    );
    if (!senderSource || senderSource.isPseudo) return;

    // 把真实 source 元信息带入 receiver 上下文（避免 report 时 source 丢失）
    const receiverSource = receiverCtx.sources.find(
      (s) => s.taintId === senderTaintId,
    );
    if (!receiverSource) {
      receiverCtx.sources.push({
        taintId: senderTaintId,
        sourceType: senderSource.sourceType,
        remark: senderSource.remark,
        // Keep the initial source definition across every runtime relay.  A
        // sender can itself be a background relay, so sender.taintDef is not
        // necessarily the page / popup definition that introduced the taint.
        originDefId: senderSource.originDefId,
        isPseudo: false,
        originContextFilename:
          senderSource.originContextFilename ?? senderCtx.filename,
        originFrameFamily:
          senderSource.originFrameFamily ??
          this.getContextFrameFamily(senderCtx.filename),
        provenance: senderSource.provenance ?? "UNKNOWN",
      });
    } else {
      this.mergeTaintSourceMetadata(receiverSource, {
        originContextFilename:
          senderSource.originContextFilename ?? senderCtx.filename,
        originFrameFamily:
          senderSource.originFrameFamily ??
          this.getContextFrameFamily(senderCtx.filename),
        provenance: senderSource.provenance ?? "UNKNOWN",
      });
    }

    // 关键：将该 source 下关联的所有 Def 一并绑定到 receiverCtx，
    // 避免仅 taint sender.message 时漏掉 message.urlCtrl 等派生 Def。
    const relatedDefs = new Map<number, Def>();
    relatedDefs.set(sender.taintDef.uniqueId, sender.taintDef);

    const senderDag = senderCtx.pathDag.get(senderTaintId);
    if (senderDag) {
      for (const rec of senderDag.values()) {
        relatedDefs.set(rec.fromDef.uniqueId, rec.fromDef);
        relatedDefs.set(rec.toDef.uniqueId, rec.toDef);
      }
    }

    for (const def of relatedDefs.values()) {
      this._addTaintIdToDef(receiverCtx, def, senderTaintId);
    }

    // 记录跨上下文 MESSAGE 边
    this._addPathEdge(
      receiverCtx,
      senderTaintId,
      sender.taintDef,
      sender.taintDef,
      receiver.astNode,
      "MESSAGE",
      `${channel}[${senderCtx.filename}->${receiverCtx.filename}]`,
      {
        senderContextFilename: senderCtx.filename,
        senderFrameFamily:
          sender.protocol?.frameFamily ??
          this.getContextFrameFamily(senderCtx.filename),
        receiverContextFilename: receiverCtx.filename,
        receiverFrameFamily: this.getContextFrameFamily(receiverCtx.filename),
        senderProvenance: senderSource.provenance ?? "UNKNOWN",
      },
    );
  }

  /**
   * Processing sender-receiver pairs
   */
  private processSenderReceiverPair(
    sender: PseudoTaintSender,
    senderCtx: TaintContext,
    senderTaintIds: number[],
    receiver: PseudoTaintReceiver,
    receiverCtx: TaintContext,
    bridge: InterContextBridge,
    resolved: Set<string>,
    contextsWithUpdates: Set<TaintContext>,
  ) {
    for (const senderTaintId of senderTaintIds) {
      const key = this.generateResolvedKey(receiver, sender, senderTaintId);

      if (resolved.has(key)) continue;
      resolved.add(key);

      // 新逻辑：deferred receiver，直接用 sender.message 驱动回调
      if (receiver.deferredMessage) {
        this.materializeSenderMessageTaintInReceiver(
          sender,
          senderCtx,
          senderTaintId,
          receiver,
          receiverCtx,
          bridge.channel,
        );

        this.withReceiverContext(receiverCtx, () => {
          // Re-project the message at the actual cross-context delivery
          // boundary. The callback was registered before the sender ran, so
          // its closure must not retain the initial untainted placeholder.
          // This also preserves sibling-field precision for message objects.
          const invoke = receiver.deferredMessage!.invoke;
          invoke(sender.taintDef);
        });

        contextsWithUpdates.add(receiverCtx);
        continue;
      }

      // 旧逻辑：非 deferred 继续 synthetic source 路线
      // TODO: add message constraint validation here to filter out infeasible paths.
      // Create a synthesis source
      const syntheticId = this.createSyntheticSource(
        sender,
        senderCtx,
        senderTaintId,
        receiver,
        receiverCtx,
      );

      // Cloning sender path
      this.cloneSenderPaths(senderCtx, senderTaintId, receiverCtx, syntheticId);

      // Add cross-page margin
      this.addCrossPageEdge(
        sender,
        senderCtx,
        receiver,
        receiverCtx,
        syntheticId,
        bridge.channel,
      );

      // Cloned receiver pseudo-taint path
      this.cloneReceiverPseudoPaths(receiver, receiverCtx, syntheticId);

      // clone receiver's sink
      this.cloneReceiverSinks(receiver, receiverCtx, syntheticId);

      // Mark the context that needs to be synchronized.
      contextsWithUpdates.add(receiverCtx);
    }
  }

  /**
   * Build a unique key for a resolved cross-context taint pair.
   */
  private generateResolvedKey(
    receiver: PseudoTaintReceiver,
    sender: PseudoTaintSender,
    senderTaintId: number,
  ): string {
    const r = (receiver.astNode as any)?.range;
    const receiverIdentity = receiver.taintId
      ? `tid:${receiver.taintId}`
      : r
        ? `loc:${r[0]}:${r[1]}`
        : "loc:unknown";

    const senderDefId = sender.taintDef.uniqueId;

    return `${receiver.contextFilename}:${receiverIdentity}:${sender.contextFilename}:${senderDefId}:${senderTaintId}`;
  }

  /**
   * Create a synthetic taint source in the receiver context
   * based on the sender's original source.
   */
  private createSyntheticSource(
    sender: PseudoTaintSender,
    senderCtx: TaintContext,
    senderTaintId: number,
    receiver: PseudoTaintReceiver,
    receiverCtx: TaintContext,
  ): number {
    const senderSource = senderCtx.sources.find(
      (s) => s.taintId === senderTaintId,
    );
    if (!senderSource)
      throw Errors.TaintError("SyntheticSource sender source not found");

    const syntheticId = taintGenerator.nextId();
    receiverCtx.knownTaintIds.add(syntheticId);

    receiverCtx.sources.push({
      taintId: syntheticId,
      sourceType: senderSource.sourceType,
      remark: senderSource.remark,
      // As above, retain the original source identity instead of collapsing
      // it to the most recent runtime.sendMessage payload.
      originDefId: senderSource.originDefId,
      isPseudo: false,
      originContextFilename:
        senderSource.originContextFilename ?? senderCtx.filename,
      originFrameFamily:
        senderSource.originFrameFamily ??
        this.getContextFrameFamily(senderCtx.filename),
      provenance: senderSource.provenance ?? "UNKNOWN",
    });

    // Map synthetic taint to receiver target definition
    if (receiver.targetDef) {
      this._addTaintIdToDef(receiverCtx, receiver.targetDef, syntheticId);
    }

    return syntheticId;
  }

  /**
   * Clone all propagation paths of a sender taint
   * into the receiver context under a synthetic taint ID.
   */
  private cloneSenderPaths(
    senderCtx: TaintContext,
    senderTaintId: number,
    receiverCtx: TaintContext,
    syntheticId: number,
  ) {
    const senderDag = senderCtx.pathDag.get(senderTaintId);
    if (!senderDag) return;

    if (!receiverCtx.pathDag.has(syntheticId)) {
      receiverCtx.pathDag.set(syntheticId, new Map());
    }
    const rDag = receiverCtx.pathDag.get(syntheticId)!;

    for (const [edgeKey, pathRec] of senderDag.entries()) {
      const newRec: TaintPathRecord = {
        taintId: syntheticId,
        fromDef: pathRec.fromDef,
        toDef: pathRec.toDef,
        astNode: pathRec.astNode,
        PropagateType: pathRec.PropagateType,
        remark: pathRec.remark,
        senderContextFilename: pathRec.senderContextFilename,
        senderFrameFamily: pathRec.senderFrameFamily,
        receiverContextFilename: pathRec.receiverContextFilename,
        receiverFrameFamily: pathRec.receiverFrameFamily,
        senderProvenance: pathRec.senderProvenance,
      };

      const freshKey = this._edgeKey(
        newRec.fromDef.uniqueId,
        newRec.toDef.uniqueId,
        newRec.astNode,
      );
      if (!rDag.has(freshKey)) {
        rDag.set(freshKey, newRec);
      }
    }
  }

  /**
   * Add a MESSAGE edge representing cross-context propagation.
   */
  private addCrossPageEdge(
    sender: PseudoTaintSender,
    senderCtx: TaintContext,
    receiver: PseudoTaintReceiver,
    receiverCtx: TaintContext,
    syntheticId: number,
    channel: string,
  ) {
    const toDef = receiver.targetDef ?? sender.taintDef;
    const senderSource = (senderCtx.defToTaintIds.get(sender.taintDef.uniqueId)
      ? [...senderCtx.defToTaintIds.get(sender.taintDef.uniqueId)!]
      : []
    )
      .map((id) => senderCtx.sources.find((s) => s.taintId === id))
      .find(Boolean);

    this._addPathEdge(
      receiverCtx,
      syntheticId,
      sender.taintDef,
      toDef,
      receiver.astNode,
      "MESSAGE",
      `${channel}[${senderCtx.filename}->${receiverCtx.filename}]`,
      {
        senderContextFilename: senderCtx.filename,
        senderFrameFamily:
          sender.protocol?.frameFamily ??
          this.getContextFrameFamily(senderCtx.filename),
        receiverContextFilename: receiverCtx.filename,
        receiverFrameFamily: this.getContextFrameFamily(receiverCtx.filename),
        senderProvenance: senderSource?.provenance,
      },
    );
  }

  /**
   * Clone receiver's pseudo-taint paths to the synthetic taint.
   */
  private cloneReceiverPseudoPaths(
    receiver: PseudoTaintReceiver,
    receiverCtx: TaintContext,
    syntheticId: number,
  ) {
    if (!receiver.taintId) return;

    const rSrcDag = receiverCtx.pathDag.get(receiver.taintId);
    if (!rSrcDag) return;

    if (!receiverCtx.pathDag.has(syntheticId)) {
      receiverCtx.pathDag.set(syntheticId, new Map());
    }
    const synDag = receiverCtx.pathDag.get(syntheticId)!;

    for (const rec of rSrcDag.values()) {
      const mappedKey = this._edgeKey(
        rec.fromDef.uniqueId,
        rec.toDef.uniqueId,
        rec.astNode,
      );
      if (!synDag.has(mappedKey)) {
        synDag.set(mappedKey, {
          taintId: syntheticId,
          fromDef: rec.fromDef,
          toDef: rec.toDef,
          astNode: rec.astNode,
          PropagateType: rec.PropagateType,
          remark: rec.remark,
          senderContextFilename: rec.senderContextFilename,
          senderFrameFamily: rec.senderFrameFamily,
          receiverContextFilename: rec.receiverContextFilename,
          receiverFrameFamily: rec.receiverFrameFamily,
          senderProvenance: rec.senderProvenance,
        });
      }
    }
  }

  /**
   * Clone receiver sinks from pseudo taint to synthetic taint.
   */
  private cloneReceiverSinks(
    receiver: PseudoTaintReceiver,
    receiverCtx: TaintContext,
    syntheticId: number,
  ) {
    if (!receiver.taintId) return;

    const sinksToClone = receiverCtx.sinks.filter(
      (s) => s.taintId === receiver.taintId,
    );

    for (const sink of sinksToClone) {
      receiverCtx.sinks.push({
        ...sink,
        taintId: syntheticId,
      });
    }
  }

  /**
   * Sync path DAGs and update outer receivers for all contexts.
   */
  private syncAllContexts(contextsWithUpdates: Set<TaintContext>) {
    for (const ctx of this._contexts.values()) {
      if (contextsWithUpdates.has(ctx)) {
        ctx.syncPathsFromDag();
      }

      // this.updateOuterReceivers(ctx);
      // this._cleanupOrphanOuterSenders(ctx);
    }
  }

  private getContext(filename: string): TaintContext | null {
    return this._contexts.get(filename) ?? null;
  }

  /* ============================================================
   * Reprot
   * ============================================================ */

  generateReportForFile(filename: string, opts?: ReportOptions) {
    const ctx = this._contexts.get(filename);
    if (!ctx) return null;

    const fileFrame = scriptUsageTracker.getPrimaryFrameByKey(ctx.filename);

    if (!shouldIncludeScriptInPolicy(ctx.filename)) {
      return {
        filename: ctx.filename,
        fileFrame,
        issues: [],
        totalIssues: 0,
      };
    }

    // Storage pseudo taints are still resolved in report phase.
    this.resolveStorageTaints();

    const mergedOpts = { ...this._reportOptions, ...(opts || {}) };
    return this._generateReportFromContext(ctx, mergedOpts);
  }

  generateGlobalReport(opts?: ReportOptions) {
    // Storage pseudo taints are still resolved in report phase.
    this.resolveStorageTaints();

    const mergedOpts = { ...this._reportOptions, ...(opts || {}) };

    // returns array of per-file reports
    return [...this._contexts.values()]
      .filter((ctx) => shouldIncludeScriptInPolicy(ctx.filename))
      .map((ctx) => this._generateReportFromContext(ctx, mergedOpts));
  }

  /**
   * Extract a code snippet around a node with optional context.
   * Returns the snippet and the node's relative offsets.
   */
  private _getCodeSnippet(
    ctx: TaintContext,
    node: Node,
    contextChars: number = 50,
  ): {
    snippet: string;
    startOffset: number;
    endOffset: number;
  } | null {
    if (!node) return null;

    if (!ctx || !ctx.script) return null;

    try {
      const code = ctx.script.getCode?.();
      if (!code) return null;

      const range = (node as any)?.range;
      if (!range || !Array.isArray(range) || range.length !== 2) {
        return null;
      }

      const [nodeStart, nodeEnd] = range;

      // Validate range boundaries
      if (nodeStart < 0 || nodeEnd > code.length || nodeStart >= nodeEnd) {
        return null;
      }

      // Expand snippet range with surrounding context
      const snippetStart = Math.max(0, nodeStart - contextChars);
      const snippetEnd = Math.min(code.length, nodeEnd + contextChars);

      const snippet = code.substring(snippetStart, snippetEnd);

      const nodeOffsetInSnippet = nodeStart - snippetStart;
      const nodeLength = nodeEnd - nodeStart;

      return {
        snippet,
        startOffset: nodeOffsetInSnippet,
        endOffset: nodeOffsetInSnippet + nodeLength,
      };
    } catch (err) {
      logger.debug(`Failed to get code snippet: ${err}`);
      return null;
    }
  }

  /**
   * Cached location formatter to avoid repeated formatLocation calls.
   */
  private _makeLocFormatter() {
    const cache = new Map<string, string>();
    return (node: Node | null) => {
      if (!node) return "[unknown]";
      const r = (node as any)?.range;
      const key = r ? `${r[0]}:${r[1]}` : JSON.stringify(node);
      if (cache.has(key)) return cache.get(key)!;
      try {
        const formatted = formatLocation(node);
        cache.set(key, formatted);
        return formatted;
      } catch {
        cache.set(key, "[unknown]");
        return "[unknown]";
      }
    };
  }

  /**
   * Build a truncated flow list according to report options.
   * Each `paths` item is { kind, loc, remark }
   */
  private _truncateFlows(
    paths: Array<{ kind: string; loc: string; remark?: string }>,
    opts: Required<ReportOptions>,
  ) {
    const n = paths.length;
    if (opts.level === "detailed" || n <= opts.headCount + opts.tailCount + 2) {
      // show all (or small enough)
      return {
        list: paths.slice(0, Math.min(n, opts.maxFlowPerIssue)),
        omitted: 0,
      };
    }

    if (opts.level === "partial") {
      const head = paths.slice(0, opts.headCount);
      const tail = paths.slice(n - opts.tailCount, n);
      const omitted = Math.max(0, n - (head.length + tail.length));
      return {
        list: [
          ...head,
          {
            kind: "...",
            loc: `... (${omitted} steps omitted)`,
            remark: undefined,
          },
          ...tail,
        ],
        omitted,
      };
    }

    // brief
    const head = paths.slice(0, Math.min(1, n));
    const tail = paths.slice(Math.max(n - 1, 0), n);
    const omitted = Math.max(0, n - (head.length + tail.length));
    return {
      list: [
        ...head,
        {
          kind: "...",
          loc: `... (${omitted} steps omitted)`,
          remark: undefined,
        },
        ...tail,
      ],
      omitted,
    };
  }

  /**
   * Build the report-facing sink info objects for a set of sink records.
   * Shared by the representative and the (dedup) stub paths so both produce
   * byte-identical sink data.
   */
  private _buildSinkInfos(
    sinks: any[],
    ctx: TaintContext,
    fmt: (node: Node | null) => string,
    fileFrame: string,
    fileFrameConstraint: any,
    fileFrames: any,
    opts: Required<ReportOptions>,
  ): any[] {
    return sinks.map((s) => {
      const sinkInfo: any = {
        kind: s.sinkType,
        remark: s.remark,
        urlTaintControl: s.urlTaintControl,
        loc: fmt(s.astNode),
        file: ctx.filename,
        frame: fileFrame,
        frameConstraint: fileFrameConstraint,
        frames: fileFrames,
      };

      if (opts.includeCode) {
        const snippet = this._getCodeSnippet(
          ctx,
          s.astNode,
          opts.codeContextChars,
        );
        if (snippet) {
          sinkInfo.code = this._formatCodeSnippet(
            snippet.snippet,
            snippet.startOffset,
            snippet.endOffset,
          );
        }
      }

      return sinkInfo;
    });
  }

  /**
   * Generate a structured report from a single taint context.
   */
  private _generateReportFromContext(
    ctx: TaintContext,
    opts: Required<ReportOptions>,
  ) {
    const issues: any[] = [];
    const fileFrame = scriptUsageTracker.getPrimaryFrameByKey(ctx.filename);
    const fileFrameConstraint =
      scriptUsageTracker.getFrameConstraint(fileFrame);
    const fileFrames = scriptUsageTracker.getScriptFrameDescriptorsByKey(
      ctx.filename,
    );

    // Ensure paths array is synced (do once)
    ctx.syncPathsFromDag();

    // create cached formatter for this context
    const fmt = this._makeLocFormatter();

    // Optional source-level dedup (see ReportOptions.dedupSources). When on we
    // pre-group taint records so a duplicate source can be recognised and
    // emitted as a stub WITHOUT materialising its full propagation path — the
    // dominant cost on files with thousands of cloned pseudo-sources. The
    // representative (first) occurrence still gets the full treatment below, so
    // downstream consumers that collapse duplicate sources see identical data.
    let sinksByTaint: Map<number, any[]> | null = null;
    let sanitizersByTaint: Map<number, any[]> | null = null;
    let pathCountByTaint: Map<number, number> | null = null;
    let firstPathByTaint: Map<number, any> | null = null;
    const seenSourceKeys = opts.dedupSources ? new Set<string>() : null;
    if (opts.dedupSources) {
      sinksByTaint = new Map();
      for (const s of ctx.sinks) {
        const arr = sinksByTaint.get(s.taintId);
        if (arr) arr.push(s);
        else sinksByTaint.set(s.taintId, [s]);
      }
      sanitizersByTaint = new Map();
      for (const s of ctx.sanitizers) {
        const arr = sanitizersByTaint.get(s.taintId);
        if (arr) arr.push(s);
        else sanitizersByTaint.set(s.taintId, [s]);
      }
      pathCountByTaint = new Map();
      firstPathByTaint = new Map();
      for (const p of ctx.paths) {
        pathCountByTaint.set(
          p.taintId,
          (pathCountByTaint.get(p.taintId) ?? 0) + 1,
        );
        if (!firstPathByTaint.has(p.taintId)) {
          firstPathByTaint.set(p.taintId, p);
        }
      }
    }

    for (const src of ctx.sources) {
      // Skip PSEUDO types entirely in final report
      if (src.isPseudo) continue;
      // if (shouldFilterSourceByFrame(src.sourceType, fileFrame)) continue;

      // Duplicate short-circuit (dedup mode only). The pre-check mirrors the
      // `paths.length === 0 && sinks.length === 0` skip below exactly, so the
      // same set of sources is emitted either way.
      if (seenSourceKeys) {
        const tid = src.taintId;
        const dupSinks = sinksByTaint!.get(tid) ?? [];
        const dupPathCount = pathCountByTaint!.get(tid) ?? 0;
        if (dupPathCount === 0 && dupSinks.length === 0) continue;
        const dupSourceNode = firstPathByTaint!.get(tid)?.astNode;
        const dupLoc = dupSourceNode ? fmt(dupSourceNode) : "[unknown]";
        const key = `${src.sourceType}\u0000${src.remark ?? ""}\u0000${dupLoc}`;
        if (seenSourceKeys.has(key)) {
          const dupSanitizers = sanitizersByTaint!.get(tid) ?? [];
          issues.push({
            source: {
              kind: src.sourceType,
              remark: src.remark,
              loc: dupLoc,
              file: ctx.filename,
              frame: fileFrame,
              frameConstraint: fileFrameConstraint,
              frames: fileFrames,
            },
            flow: [],
            flowMeta: { totalSteps: dupPathCount, omitted: 0 },
            sinks: this._buildSinkInfos(
              dupSinks,
              ctx,
              fmt,
              fileFrame,
              fileFrameConstraint,
              fileFrames,
              opts,
            ),
            sanitized: dupSanitizers.length > 0,
          });
          continue;
        }
        seenSourceKeys.add(key);
      }

      const paths = ctx.paths.filter((p) => p.taintId === src.taintId);
      const sinks = ctx.sinks.filter((s) => s.taintId === src.taintId);
      const sanitizers = ctx.sanitizers.filter(
        (s) => s.taintId === src.taintId,
      );

      if (paths.length === 0 && sinks.length === 0) continue;

      const sourceNode = paths[0]?.astNode;
      let sourceCodeSnippet = null;

      if (opts.includeCode && sourceNode) {
        const snippet = this._getCodeSnippet(
          ctx,
          sourceNode,
          opts.codeContextChars,
        );
        if (snippet) {
          sourceCodeSnippet = this._formatCodeSnippet(
            snippet.snippet,
            snippet.startOffset,
            snippet.endOffset,
          );
        }
      }

      // build flow records (kind + loc + remark + code)
      const fullFlow = paths.map((p) => {
        const flowItem: any = {
          kind: p.PropagateType,
          loc: fmt(p.astNode),
          remark: p.remark || undefined,
        };

        if (opts.includeCode) {
          const snippet = this._getCodeSnippet(
            ctx,
            p.astNode,
            opts.codeContextChars,
          );
          if (snippet) {
            flowItem.code = this._formatCodeSnippet(
              snippet.snippet,
              snippet.startOffset,
              snippet.endOffset,
            );
          }
        }

        return flowItem;
      });

      // truncate according to opts
      const truncated = this._truncateFlows(fullFlow, opts);

      const sourceInfo: any = {
        kind: src.sourceType,
        remark: src.remark,
        loc: sourceNode ? fmt(sourceNode) : "[unknown]",
        file: ctx.filename,
        frame: fileFrame,
        frameConstraint: fileFrameConstraint,
        frames: fileFrames,
      };

      if (opts.includeCode && sourceCodeSnippet) {
        sourceInfo.code = sourceCodeSnippet;
      }

      const sinksWithCode = this._buildSinkInfos(
        sinks,
        ctx,
        fmt,
        fileFrame,
        fileFrameConstraint,
        fileFrames,
        opts,
      );

      issues.push({
        source: sourceInfo,
        // flow: truncated.list (list elements) + optionally omitted count
        flow: truncated.list,
        flowMeta: {
          totalSteps: fullFlow.length,
          omitted: truncated.omitted,
        },
        sinks: sinksWithCode,
        sanitized: sanitizers.length > 0,
      });
    }

    return {
      filename: ctx.filename,
      fileFrame,
      fileFrameConstraint,
      fileFrames,
      issues,
      totalIssues: issues.length,
    };
  }

  /**
   * Format a snippet and highlight the node region using markers.
   */
  private _formatCodeSnippet(
    code: string,
    startOffset: number,
    endOffset: number,
    options: { maxLength?: number; ellipsis?: boolean } = {},
  ): string {
    const { maxLength = 200, ellipsis = true } = options;

    if (
      startOffset >= 0 &&
      endOffset > startOffset &&
      endOffset <= code.length
    ) {
      const before = code.substring(0, startOffset);
      const nodeCode = code.substring(startOffset, endOffset);
      const after = code.substring(endOffset);

      // If the code is too long, only a portion will be displayed.
      if (code.length > maxLength) {
        const halfMax = Math.floor(maxLength / 2);
        const beforeTruncated =
          before.length > halfMax
            ? (ellipsis ? "..." : "") +
              before.substring(before.length - halfMax)
            : before;
        const afterTruncated =
          after.length > halfMax
            ? after.substring(0, halfMax) + (ellipsis ? "..." : "")
            : after;

        return beforeTruncated + ">>>" + nodeCode + "<<<" + afterTruncated;
      }

      return before + ">>>" + nodeCode + "<<<" + after;
    }

    // If there is no highlighted area, return to the code directly.
    if (code.length > maxLength && ellipsis) {
      return code.substring(0, maxLength) + "...";
    }

    return code;
  }

  /**
   * Storage/message callback replay may temporarily erase a numeric Def's
   * type. At report time, use the sink AST to distinguish count/length
   * formatting from direct document-title presentation. Direct
   * `message.title` and `message.title.toString()` are intentionally not
   * matched, so Action Badge/Title findings for title text are preserved.
   */
  private isDocumentTitleNumericActionPresentationSink(
    sourceType: SourceType,
    sink: TaintSinkRecord,
  ): boolean {
    if (sourceType !== "DOCUMENT_TITLE") return false;
    if (
      sink.sinkType !== "CHROME_ACTION_BADGE_OPTIONS" &&
      sink.sinkType !== "CHROME_ACTION_TITLE_OPTIONS"
    ) {
      return false;
    }

    const arg = (sink.astNode as any)?.arguments?.[0];
    if (arg?.type !== "ObjectExpression") return false;

    return arg.properties?.some((property: any) => {
      if (property?.type !== "Property") return false;
      const key = property.computed
        ? property.key?.type === "Literal"
          ? String(property.key.value)
          : null
        : property.key?.type === "Identifier"
          ? property.key.name
          : null;
      return (key === "text" || key === "title") &&
        isNumericPresentationExpression(property.value);
    }) ?? false;
  }

  /**
   * Collect unique source-to-sink flows across all contexts (lightweight mode).
   */
  private _collectFlowsLite(): Array<any> {
    const flowSet = new Set<string>();
    const flowObjs: any[] = [];

    // Reset per-run so repeated report calls don't accumulate duplicates.
    this._suppressedByPrivilegeDelta = [];

    // Build a global defId → context index ONCE per report run. The old
    // `_findContextByDefId` walked every context for every sink, which is
    // O(N·M) and was the hottest cross-context lookup. The index reduces
    // it to O(1) per query at the cost of a single linear pass here.
    const defOwnerIndex = this._buildDefOwnerIndex();

    for (const ctx of this._contexts.values()) {
      if (!shouldIncludeScriptInPolicy(ctx.filename)) continue;

      // ensure synced
      ctx.syncPathsFromDag();

      // per context formatter to speed up
      const fmt = this._makeLocFormatter();

      // Pre-index sources by taintId so we can look them up in O(1) instead
      // of scanning the source array for every sink in this context.
      const sourceByTaint = new Map<number, (typeof ctx.sources)[number]>();
      for (const s of ctx.sources) sourceByTaint.set(s.taintId, s);

      // Pre-index the source-AST-node for each taintId. We previously paid an
      // O(paths) `find` per (sink, match) pair. Pick the *first* path entry
      // for each taintId by simple iteration.
      const sourceAstByTaint = new Map<number, Node>();
      for (const p of ctx.paths) {
        if (!sourceAstByTaint.has(p.taintId)) {
          sourceAstByTaint.set(p.taintId, p.astNode);
        }
      }

      // Pre-index message/storage edges per taintId so the per-sink loop
      // doesn't have to scan ctx.paths twice for every emission.
      const messageByTaint = new Map<number, (typeof ctx.paths)[number]>();
      const storageByTaint = new Map<number, (typeof ctx.paths)[number]>();
      for (const p of ctx.paths) {
        if (p.PropagateType === "MESSAGE" && !messageByTaint.has(p.taintId)) {
          messageByTaint.set(p.taintId, p);
        }
        if (p.PropagateType === "STORAGE" && !storageByTaint.has(p.taintId)) {
          storageByTaint.set(p.taintId, p);
        }
      }

      for (const sink of ctx.sinks) {
        const taintId = sink.taintId;

        const source = sourceByTaint.get(taintId);
        if (!source || source.isPseudo) continue;

        if (
          this.isDocumentTitleNumericActionPresentationSink(
            source.sourceType,
            sink,
          )
        ) {
          continue;
        }

        // The rule engine may return multiple FlowTypes for the same
        // (source, sink) pair — e.g. cookies → fetch.body matching both a
        // SENSITIVE_DATA → MESSAGE_RESPONSE rule and a NETWORK_SEND rule.
        // We emit one summary record per matched FlowType so analysts can
        // triage them as distinct findings.
        const matches = getFlowMatches(source.sourceType, sink.sinkType);
        if (matches.length === 0) continue;

        const message = messageByTaint.get(taintId);
        const storage = storageByTaint.get(taintId);

        // A source def is intentionally copied into every receiver context so
        // the def-use engine can continue its analysis there.  That means a
        // global def-owner index can otherwise resolve the copied definition
        // to the *receiver* (usually background) instead of its real source
        // frame. Prefer the sender recorded in the actual MESSAGE/STORAGE
        // transport; this is what distinguishes a popup form value from a
        // content-script DOM value after runtime.onMessage has relayed it.
        // This frame recovery is intentionally scoped to form-value sources.
        // Existing document URL/title flows retain their historical reporting
        // semantics; changing those here would silently alter unrelated
        // recall behaviour. The requested precision change is specifically
        // about Popup/Options ELEMENT_VALUE / jQuery.val input.
        const isUiInputSource =
          source.sourceType === "ELEMENT_VALUE" ||
          source.sourceType === "JQUERY_ELEMENT_VAL";
        const transportSourceContexts = isUiInputSource
          ? this._getTransportSourceContexts(ctx, taintId)
          : [];
        const hasCrossContextHop = !!message || !!storage;
        const rootSourceContext =
          isUiInputSource && source.originContextFilename
            ? this.getContext(source.originContextFilename)
            : null;
        const actualMessageSenderContext =
          isUiInputSource &&
          source.provenance === "EXTENSION_UI" &&
          message?.senderContextFilename
          ? this.getContext(message.senderContextFilename)
          : null;
        const sourceCtx =
          rootSourceContext ??
          actualMessageSenderContext ??
          transportSourceContexts[0] ??
          (hasCrossContextHop && source.originDefId
            ? defOwnerIndex.get(source.originDefId)
            : null) ??
          ctx;

        const sourceNode =
          (sourceCtx === ctx
            ? sourceAstByTaint.get(taintId)
            : sourceCtx.paths.find((p) => p.taintId === taintId)?.astNode) ??
          sourceAstByTaint.get(taintId) ??
          sink.astNode;

        const sourceLoc = sourceNode ? fmt(sourceNode) : "[unknown]";
        const sinkLoc = fmt(sink.astNode);

        // Schema-backed document attributes are initialized as sources. A write
        // such as `document.title = originalTitle` must not itself be treated as
        // a new read of untrusted `document.title`; otherwise its local
        // temporary can leak into unrelated callbacks in the summary. We
        // suppress only an AST-confirmed write on the source property. A genuine
        // RHS read (`const title = document.title`) remains visible.
        if (
          this.isDocumentSourceWriteArtifact(
            source.sourceType,
            sourceCtx.script.getAST(),
            sourceNode,
          )
        ) {
          logger.debug(
            `[SOURCE-DIRECTION] suppress ${source.sourceType} recorded from its own property write in ${sourceCtx.filename}`,
          );
          continue;
        }

        for (const match of matches) {
          const flowType = match.flowType;
          // Dedup key now includes flowType so the same source/sink pair can
          // surface under multiple categories without being collapsed.
          const key = `${flowType}|${source.sourceType}|${ctx.filename}|${sourceLoc}|${sink.sinkType}|${sinkLoc}|${sink.remark ?? ""}|${sink.urlTaintControl ?? ""}`;

          if (flowSet.has(key)) continue;
          flowSet.add(key);

          const sourceFile = sourceCtx?.filename ?? ctx.filename;
          // Frame-family correction is intentionally narrow: this change is
          // about popup/options form values.  Reclassifying every document
          // source merely because it crossed a message would alter unrelated
          // historical TP semantics (for example document URL fixtures).
          const sourceFrameFamily = isUiInputSource
            ? source.originFrameFamily ?? message?.senderFrameFamily
            : undefined;
          const sourceFrame =
            this.getFrameTagForFamily(sourceFile, sourceFrameFamily) ??
            scriptUsageTracker.getPrimaryFrameByKey(sourceFile);
          const sourceFrameConstraint =
            scriptUsageTracker.getFrameConstraint(sourceFrame);
          const sourceFrames =
            scriptUsageTracker.getScriptFrameDescriptorsByKey(sourceFile);
          const sinkFrame = scriptUsageTracker.getPrimaryFrameByKey(
            ctx.filename,
          );
          const sinkFrameConstraint =
            scriptUsageTracker.getFrameConstraint(sinkFrame);
          const sinkFrames = scriptUsageTracker.getScriptFrameDescriptorsByKey(
            ctx.filename,
          );

          const constraintSeverity = analyzeFlowConstraintSeverity({
            sourceType: source.sourceType,
            sinkType: sink.sinkType,
            sourceFrame,
            sourceFrameConstraint,
          });

          if (
            this.shouldSuppressExtensionUiFlow(
              source.sourceType,
              source.provenance,
              message?.senderProvenance,
              sink.sinkType,
            )
          ) {
            logger.debug(
                `[FRAME-SENSITIVE-MESSAGE] suppress extension-UI source ` +
                  `${sourceFile} -> ${ctx.filename}; no content-script, ` +
                `external-message, or untrusted-storage provenance`,
            );
            continue;
          }

          // A common extension boilerplate helper reads its own static HTML,
          // replaces __MSG_<key>__ localisation tokens through the browser's
          // i18n catalog, then writes the transformed text back to the *same*
          // element. Generic DOM source/sink modelling sees innerHTML ->
          // innerHTML and reports DOM_XSS, but the replacement value is neither
          // webpage input nor attacker-controlled HTML. Keep this recogniser
          // intentionally exact so ordinary page DOM flows remain reportable.
          if (
            flowType === "DOM_XSS" &&
            this.isI18nPlaceholderLocalizationSelfRewrite(
              source.sourceType,
              sink.sinkType,
              sourceCtx,
              ctx,
              sourceNode,
              sink.astNode,
              hasCrossContextHop,
              sourceFrame,
              sinkFrame,
            )
          ) {
            const reason =
              "DOM_XSS suppressed: extension i18n self-localization replaces " +
              "static __MSG_*__ tokens with chrome/browser.i18n.getMessage() " +
              "and writes back to the same element";
            this._suppressedByPrivilegeDelta.push({
              flowType,
              sourceType: source.sourceType,
              sourceFile,
              sourceLoc,
              sinkType: sink.sinkType,
              sinkFile: ctx.filename,
              sinkLoc,
              reason,
            });
            logger.debug(`[I18N-LOCALIZATION] dropped ${sourceFile} ${sourceLoc} -> ${sinkLoc}: ${reason}`);
            continue;
          }

          if (
            shouldFilterSourceByFrame(
              source.sourceType,
              sourceFrame,
              sink.sinkType,
              sinkFrame,
              sourceFrames.map((descriptor) => descriptor.id),
            )
          ) {
            continue;
          }

          // Privilege-delta gate: a matched (source, sink) pair is only a
          // finding when the sink grants authority the data's origin lacked.
          // See `src/taint/privilege.ts`.
          const privilege = evaluatePrivilegeDelta({
            sourceProvenance: source.provenance,
            sourceType: source.sourceType,
            sinkType: sink.sinkType,
            sourceFrame,
            sinkFrame,
            flowType,
            sinkRemark: sink.remark,
            sourceRemark: source.remark,
            sinkUrlTaintControl: sink.urlTaintControl,
            sinkCode: this._getNodeText(ctx, sink.astNode),
            sinkScriptCode: ctx.script.getCode() ?? undefined,
            hasStorageConsumer: (a, k) => this.hasStorageConsumer(a, k),
          });

          if (!privilege.crosses) {
            this._suppressedByPrivilegeDelta.push({
              flowType,
              sourceType: source.sourceType,
              sourceFile,
              sourceLoc,
              sinkType: sink.sinkType,
              sinkFile: ctx.filename,
              sinkLoc,
              reason: privilege.reason,
            });

            logger.debug(
              `[PRIVILEGE-DELTA] dropped ${flowType} ${source.sourceType} -> ${sink.sinkType} (${sinkLoc}): ${privilege.reason}`,
            );

            if (config.privilegeDeltaFiltering) continue;
          }

          const flowObj: any = {
            flowType,
            ruleId: match.ruleId,
            ruleDescription: match.ruleDescription,
            sourceType: source.sourceType,
            sourceRemark: source.remark,
            sourceProvenance: source.provenance,
            sourceOriginContext: source.originContextFilename,
            sourceOriginFrameFamily: source.originFrameFamily,
            sourceFile,
            sourceFrame,
            sourceFrameConstraint,
            sourceFrames,
            sourceLoc,

            sinkType: sink.sinkType,
            sinkRemark: sink.remark,
            sinkUrlTaintControl: sink.urlTaintControl,
            sinkFile: ctx.filename,
            sinkFrame,
            sinkFrameConstraint,
            sinkFrames,
            sinkLoc,

            ctx: ctx.filename,
            messagePassing: !!message,
            channel: message?.remark,
            messageSender: message?.senderContextFilename,
            messageSenderFrameFamily: message?.senderFrameFamily,
            messageSenderProvenance: message?.senderProvenance,
            storagePassing: !!storage,
            area: storage?.remark,
            constraintKind: constraintSeverity.constraintKind,
            severity: constraintSeverity.severity,
            severityReason: constraintSeverity.severityReason,
            severityEvidence: constraintSeverity.severityEvidence,

            // Present on every flow so a consumer can triage by exploitability
            // even when `privilegeDeltaFiltering` is turned off.
            privilegeCrossing: privilege.crosses,
            privilegeReason: privilege.reason,
          };

          // Optionally attach source code snippet
          if (this._reportOptions.includeCode && sourceNode) {
            const snippet = this._getCodeSnippet(
              ctx,
              sourceNode,
              this._reportOptions.codeContextChars,
            );
            if (snippet) {
              flowObj.sourceCode = this._formatCodeSnippet(
                snippet.snippet,
                snippet.startOffset,
                snippet.endOffset,
              );
            }
          }

          // Optionally attach sink code snippet
          if (this._reportOptions.includeCode) {
            const snippet = this._getCodeSnippet(
              ctx,
              sink.astNode,
              this._reportOptions.codeContextChars,
            );
            if (snippet) {
              flowObj.sinkCode = this._formatCodeSnippet(
                snippet.snippet,
                snippet.startOffset,
                snippet.endOffset,
              );
            }
          }

          flowObjs.push(flowObj);
        }
      }
    }

    return flowObjs;
  }

  /**
   * Reverse-index every (defId → TaintContext that holds it) used by the
   * report phase to backtrack a flow to its originating frame. Built once
   * per report run.
   */
  private _buildDefOwnerIndex(): Map<number, TaintContext> {
    const idx = new Map<number, TaintContext>();
    for (const ctx of this._contexts.values()) {
      for (const defId of ctx.defToTaintIds.keys()) {
        // First-writer-wins: the source context (where the original tainted
        // def was minted) is what _findContextByDefId previously preferred.
        if (!idx.has(defId)) idx.set(defId, ctx);
      }
    }
    return idx;
  }

  /** Pick the concrete frame tag matching a retained source family. */
  private getFrameTagForFamily(
    scriptKey: string,
    family?: TaintFrameFamily,
  ): string | undefined {
    if (!family || family === "UNKNOWN") return undefined;
    return scriptUsageTracker
      .getScriptFrameDescriptorsByKey(scriptKey)
      .find((descriptor) => descriptor.family === family)?.id;
  }

  /**
   * Popup/options values remain ordinary tainted data, but they must not be
   * upgraded to web taint just because an onMessage listener receives them.
   * Unknown provenance is retained conservatively; only an explicit UI root
   * is suppressed.  A content-script, external-message, or storage-derived
   * provenance therefore keeps the original TP behavior.
   */
  private shouldSuppressExtensionUiFlow(
    sourceType: SourceType,
    sourceProvenance?: TaintProvenance,
    senderProvenance?: TaintProvenance,
    sinkType?: SinkType,
  ): boolean {
    // Keep the existing high-integrity/document sources (URL, cookie, title,
    // location) conservative. The UI-only rule targets form/markup values and
    // window-event payloads, which are the observed Popup/Options FP shapes.
    const uiSurfaceSources = new Set<SourceType>([
      "ELEMENT_VALUE",
      "JQUERY_ELEMENT_VAL",
      "ELEMENT_TEXT_CONTENT",
      "JQUERY_ELEMENT_TEXT",
      "ELEMENT_INNER_HTML",
      "JQUERY_ELEMENT_HTML",
      "ELEMENT_OUTER_HTML",
      "WINDOW_MESSAGE_EVENT",
      "WINDOW_CUSTOM_EVENT",
      "TARGET_CUSTOM_EVENT",
    ]);
    if (!uiSurfaceSources.has(sourceType)) return false;

    // A window message that writes an options value into chrome.storage is an
    // explicit persistence boundary. Keep it reportable so the later consumer
    // can be audited as storage poisoning; popup messages into privileged APIs
    // remain covered by the UI-origin suppression below.
    if (
      sourceType === "WINDOW_MESSAGE_EVENT" &&
      (sinkType === "CHROME_LOCAL_STORAGE" ||
        sinkType === "CHROME_SYNC_STORAGE" ||
        sinkType === "CHROME_SESSION_STORAGE")
    ) {
      return false;
    }

    // `EXTENSION_UI` is an explicit root classification, not a best-effort
    // guess. Do not suppress UNKNOWN origins. Conversely, a root that was
    // upgraded to CONTENT_SCRIPT / EXTERNAL_MESSAGE / UNTRUSTED_STORAGE must
    // remain a reportable web path even if a later relay passes through a UI.
    const provenances = [sourceProvenance, senderProvenance].filter(
      (value): value is TaintProvenance => !!value,
    );
    if (
      provenances.some(
        (value) =>
          value === "CONTENT_SCRIPT" ||
          value === "EXTERNAL_MESSAGE" ||
          value === "UNTRUSTED_STORAGE",
      )
    ) {
      return false;
    }
    return provenances.includes("EXTENSION_UI");
  }

  /**
   * Recognise a very specific, non-attacker-controlled extension i18n rewrite:
   *
   *   const old = el.innerHTML;
   *   const next = old.replace(/__MSG_(\\w+)__/g, (_, key) =>
   *     chrome.i18n.getMessage(key));
   *   el.innerHTML = next;
   *
   * The generic taint model correctly records the DOM data dependency but
   * cannot infer that `__MSG_*__` is an extension-bundled placeholder.  This
   * helper rejects all cross-context paths, all non-innerHTML sinks, different
   * receivers, and loose file-wide i18n coincidences.  In particular, it does
   * not suppress document.URL/element-value flows, attacker messages, or a
   * content-script's arbitrary HTML write.
   */
  private isI18nPlaceholderLocalizationSelfRewrite(
    sourceType: SourceType,
    sinkType: SinkType,
    sourceCtx: TaintContext,
    sinkCtx: TaintContext,
    sourceNode: Node | null | undefined,
    sinkNode: Node | null | undefined,
    hasCrossContextHop: boolean,
    sourceFrame: string,
    sinkFrame: string,
  ): boolean {
    if (
      sourceType !== "ELEMENT_INNER_HTML" ||
      sinkType !== "DOM_INNER_HTML" ||
      hasCrossContextHop ||
      sourceCtx.filename !== sinkCtx.filename
    ) {
      return false;
    }

    // Do not apply this to an isolated content script or MAIN-world script.
    // On a web document, an attacker can mutate the HTML before the same
    // syntactic `__MSG_*__` helper executes, so suppressing it would hide a
    // genuine DOM-XSS path. The four permitted families are always
    // extension-owned documents (or a background page / service worker).
    const extensionDocumentFamilies = new Set<TaintFrameFamily>([
      "EX", "BG", "DT", "OF",
    ]);
    if (
      !extensionDocumentFamilies.has(
        scriptUsageTracker.getFrameFamily(sourceFrame),
      ) ||
      !extensionDocumentFamilies.has(
        scriptUsageTracker.getFrameFamily(sinkFrame),
      )
    ) {
      return false;
    }

    const sourceRange = (sourceNode as any)?.range as
      | [number, number]
      | undefined;
    const sinkRange = (sinkNode as any)?.range as [number, number] | undefined;
    const code = sourceCtx.script.getCode();
    if (!code || !sourceRange || !sinkRange) return false;

    const sourceReceiver =
      innerHtmlReceiverNearRange(code, sourceRange) ??
      innerHtmlReceiverFromSourceAlias(code, sourceRange);
    const sinkReceiver = innerHtmlReceiverNearRange(code, sinkRange);
    if (!sourceReceiver || !sinkReceiver) return false;

    const transformStart = Math.min(sourceRange[0], sinkRange[0]);
    const transformEnd = Math.max(sourceRange[1], sinkRange[1]);
    if (transformEnd - transformStart > 12_000) return false;

    // The usual inline form must preserve the same receiver. A helper body
    // may lexical-shadow its receiver parameter, so it is instead checked by
    // the parameter/argument correspondence in the helper recogniser. Its
    // i18n evidence is necessarily before the sink, and is checked within the
    // helper body by isI18nPlaceholderHelperInvocation().
    if (sinkRange[0] < sourceRange[0]) {
      return isI18nPlaceholderHelperInvocation(
        code,
        sourceRange,
        sinkRange,
        sinkReceiver,
      );
    }

    const transform = code.slice(sourceRange[0], sinkRange[1]);
    // Chrome's bundled localisation helper commonly encodes the placeholder
    // as the dynamic regexp `/__MSG_(\\w+)__/g`, rather than a literal key.
    // Recognise both forms, but only within this tightly bounded same-element
    // extension-document rewrite and only when it calls the browser i18n API.
    const hasI18nPlaceholder =
      /__MSG_[A-Za-z0-9_]+__/.test(transform) ||
      /__MSG_\(\s*\\w\s*\+\s*\)__/.test(transform);
    const isLocalization = (
      hasI18nPlaceholder &&
      /\.replace\s*\(/.test(transform) &&
      /(?:chrome|browser)\s*\.\s*i18n\s*\.\s*getMessage\s*\(/.test(transform)
    );
    if (!isLocalization) return false;

    return sourceReceiver === sinkReceiver;
  }

  private isDocumentSourceWriteArtifact(
    sourceType: SourceType,
    scriptAst: Node | null | undefined,
    sourceNode: Node | null | undefined,
  ): boolean {
    if (sourceType !== "DOCUMENT_TITLE" || !scriptAst || !sourceNode) {
      return false;
    }

    const sourceAst: any = sourceNode as any;
    const sourceRange = (sourceAst.range ??
      (sourceAst.start != null && sourceAst.end != null
        ? [sourceAst.start, sourceAst.end]
        : undefined)) as [number, number] | undefined;
    if (!sourceRange) return false;

    // `sourceNode` is often the RHS identifier (e.g. `originalTitle`) rather
    // than the complete AssignmentExpression. Walk the owning script and
    // identify an assignment whose RHS contains that source span.
    let found = false;
    const visit = (value: any) => {
      if (found || !value || typeof value !== "object") return;
      if (value.type === "AssignmentExpression") {
        const left = value.left;
        const right = value.right;
        const rightRange = (right?.range ??
          (right?.start != null && right?.end != null
            ? [right.start, right.end]
            : undefined)) as [number, number] | undefined;
        const isTitleWrite =
          left?.type === "MemberExpression" &&
          !left.computed &&
          left.object?.type === "Identifier" &&
          left.object.name === "document" &&
          left.property?.type === "Identifier" &&
          left.property.name === "title";
        if (
          isTitleWrite &&
          rightRange &&
          rightRange[0] <= sourceRange[0] &&
          rightRange[1] >= sourceRange[1]
        ) {
          found = true;
          return;
        }
      }
      for (const [key, child] of Object.entries(value)) {
        if (key === "loc" || key === "range") continue;
        if (Array.isArray(child)) {
          for (const item of child) visit(item);
        } else {
          visit(child);
        }
      }
    };
    visit(scriptAst);
    return found;
  }

  /**
   * Recover likely root source contexts from cross-context path annotations.
   *
   * Paths are cloned into receiver contexts, so a raw Def id alone is not
   * enough to identify its original frame. MESSAGE/STORAGE annotations retain
   * the sender filename. If a taint traversed multiple relays, prefer a
   * content-script sender (web origin) over extension UI/background relays;
   * this both preserves real content-script findings and prevents popup input
   * from being reclassified as background web content.
   */
  private _getTransportSourceContexts(
    ctx: TaintContext,
    taintId: number,
  ): TaintContext[] {
    const candidates = new Map<string, TaintContext>();

    for (const path of ctx.paths) {
      if (path.taintId !== taintId) continue;

      const remark = path.remark ?? "";
      let senderFilename: string | undefined;

      if (path.PropagateType === "MESSAGE") {
        // e.g. runtime.single.sender.message[popup->background]
        const match = /\[([^\]]+?)->[^\]]+\]$/.exec(remark);
        senderFilename = match?.[1];
      } else if (path.PropagateType === "STORAGE") {
        // e.g. STORAGE_FLOW[area: local, key: x, sender: popup, receiver: bg]
        const match = /sender:\s*([^,\]]+)/.exec(remark);
        senderFilename = match?.[1]?.trim();
      }

      if (!senderFilename) continue;
      const senderCtx = this.getContext(senderFilename);
      if (senderCtx) candidates.set(senderCtx.filename, senderCtx);
    }

    const familyRank: Record<string, number> = {
      CS: 0,
      EX: 1,
      DT: 1,
      OF: 1,
      BG: 2,
      UNKNOWN: 3,
    };

    return [...candidates.values()].sort((left, right) => {
      const l = familyRank[
        scriptUsageTracker.getPrimaryFrameFamilyByKey(left.filename)
      ] ?? 3;
      const r = familyRank[
        scriptUsageTracker.getPrimaryFrameFamilyByKey(right.filename)
      ] ?? 3;
      return l - r || left.filename.localeCompare(right.filename);
    });
  }

  /**
   * Global summary (JSON format)
   */
  getGlobalSummary(opts?: ReportOptions) {
    const mergedOpts = { ...this._reportOptions, ...(opts || {}) };
    this.resolveStorageTaints();

    const flows = this._collectFlowsLite();

    /* =========================================================
     * TODO: Should not print here, need to fix in future
     * Log taint flow summary
     * ========================================================= */
    if (flows.length > 0) {
      logger.info(`Detected ${flows.length} taint flows:`);

      for (const f of flows) {
        logger.info(
          `[${f.flowType}] ${f.sourceType} -> ${f.sinkType} ` +
            `(${f.sourceFile}:${f.sourceLoc} -> ${f.sinkFile}:${f.sinkLoc})`,
        );
      }
    }

    const suppressed = this.getPrivilegeSuppressedFlows();
    if (suppressed.length > 0) {
      logger.info(
        `Suppressed ${suppressed.length} flow(s) that cross no privilege boundary ` +
          `(set config.privilegeDeltaFiltering = false to include them).`,
      );
    }

    return {
      hasFlows: flows.length > 0,
      flows,
      // Never silently discarded: the dropped findings stay available for
      // audit / tuning of the privilege model.
      privilegeSuppressedCount: suppressed.length,
      privilegeSuppressed: suppressed,
    };
  }

  /**
   * Flows that matched a rule but were dropped because no privilege boundary
   * was crossed. Populated by the most recent `_collectFlowsLite()` run.
   */
  getPrivilegeSuppressedFlows(): PrivilegeSuppressedFlow[] {
    return [...this._suppressedByPrivilegeDelta];
  }

  /* =======================
   * Utils
   * ======================= */
  /**
   * Return exact source text for a sink node when range metadata is present.
   * This metadata is consumed only by precision gates and is not persisted in
   * the generated report.
   */
  private _getNodeText(
    ctx: TaintContext,
    node: Node | null | undefined,
  ): string | undefined {
    const range = (node as any)?.range;
    const code = ctx.script.getCode();
    if (!code || !Array.isArray(range) || range.length < 2) return undefined;
    const [start, end] = range;
    if (
      typeof start !== "number" ||
      typeof end !== "number" ||
      start < 0 ||
      end < start
    ) {
      return undefined;
    }
    return code.slice(start, end);
  }

  private _addTaintIdToDef(ctx: TaintContext, def: Def, taintId: number) {
    const defId = def.uniqueId;
    if (!ctx.defToTaintIds.has(defId)) {
      ctx.defToTaintIds.set(defId, new Set());
    }
    ctx.defToTaintIds.get(defId)!.add(taintId);
    ctx.knownTaintIds.add(taintId);
    def.markTaintedFlag();
  }

  /* =======================
   * Debug
   * ======================= */
  resetAll() {
    this._contexts.clear();
    this._currentContext = null;
    this._bridges.clear();
    this._resolvedBridgePairs.clear();
    this._storageSets = [];
    this._storageGets = [];
    this._resolvedStoragePairs.clear();
    this._storageWildcardReads.clear();
    taintGenerator.reset();
  }
}
