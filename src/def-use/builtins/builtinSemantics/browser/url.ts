import {
  BuiltInSemantics,
  DefFactory,
  defFactory,
  Def,
  taintManager,
  BuiltInRegistry,
} from "../index";

/**
 * ======================================================
 * URL.prototype.constructor(href)
 * ======================================================
 */
BuiltInSemantics.register(
  "URL.prototype.constructor",
  (args, callNode, astNode, thisDef) => {
    const [href] = args;
    const urlObj = Def.isObjectDef(thisDef)
      ? thisDef
      : defFactory.createObjectDef(callNode);

    if (href) {
      urlObj.setProperty("href", href);

      // href → url
      taintManager.propagateTaint(
        href,
        urlObj,
        astNode,
        "INITIAL",
        "URL.constructor",
      );
    }

    // create searchParams
    const searchParams = DefFactory.createURLSearchParamsInstanceDef(
      callNode,
      astNode,
      [],
    );

    // two-way binding
    (searchParams as any).__urlOwner = urlObj;
    urlObj.setProperty("searchParams", searchParams);

    return urlObj;
  },
);

/**
 * ======================================================
 * URLSearchParams.prototype.constructor()
 * ======================================================
 */
BuiltInSemantics.register(
  "URLSearchParams.prototype.constructor",
  (_args, _callNode, _astNode, thisDef) => {
    return thisDef;
  },
);

/**
 * ======================================================
 * URLSearchParams.prototype.append(name, value)
 * ======================================================
 */
BuiltInSemantics.register(
  "URLSearchParams.prototype.append",
  (args, _callNode, astNode, thisDef) => {
    const [, value] = args;
    if (!thisDef || !value) return undefined;

    // value → searchParams
    taintManager.propagateTaint(
      value,
      thisDef,
      astNode,
      "RETURN",
      "URLSearchParams.append",
    );

    // searchParams → URL
    const owner = (thisDef as any).__urlOwner;
    if (owner) {
      taintManager.propagateTaint(
        thisDef,
        owner,
        astNode,
        "MUTATE",
        "URLSearchParams.append->URL",
      );

      const href = owner.lookupProperty("href");
      if (href) {
        taintManager.propagateTaint(
          thisDef,
          href,
          astNode,
          "MUTATE",
          "URL.searchParams->href",
        );
      }
    }

    return undefined;
  },
);

/**
 * ======================================================
 * URLSearchParams.prototype.toString()
 * ======================================================
 */
BuiltInSemantics.register(
  "URLSearchParams.prototype.toString",
  (_args, callNode, astNode, thisDef) => {
    const str = defFactory.createUnknownDef(callNode);

    taintManager.propagateTaint(
      thisDef,
      str,
      astNode,
      "RETURN",
      "URLSearchParams.toString",
    );

    return str;
  },
);
