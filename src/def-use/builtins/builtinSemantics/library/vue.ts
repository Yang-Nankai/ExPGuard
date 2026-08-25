import {
  BuiltInSemantics,
  defFactory,
  Def,
  ObjectDef,
  interAnalyzer,
  taintManager,
} from "../index";

/**
 * ======================================================
 * ==================== Vue Semantics ===================
 * ======================================================
 *
 * Vue's `v-html` directive and a string `template`/`render` option both end up
 * injecting raw HTML. We model the two stable, call-based forms:
 *   - `new Vue({ template, render, ... })` / `Vue.createApp({...})`
 *   - `Vue.compile(tainted)` — runtime template → render-function codegen
 *
 * Compiled SFC output varies by build; the options-object inspection below
 * covers the common Options-API and `createApp` shapes.
 */

/**
 * Inspect a Vue options object for HTML-injection sinks.
 */
function checkVueOptions(optionsDef: ObjectDef, astNode: any) {
  // `template: tainted` — string template compiled into the DOM.
  const templateDef = optionsDef.lookupProperty("template");
  if (templateDef) {
    taintManager.checkSink(templateDef, "VUE_V_HTML", astNode, "Vue.template");
  }

  // `render: tainted` — rarely a raw string, but check defensively.
  const renderDef = optionsDef.lookupProperty("render");
  if (renderDef && renderDef.isTainted) {
    taintManager.checkSink(renderDef, "VUE_V_HTML", astNode, "Vue.render");
  }

  // Compiled `v-html` lands in `domProps.innerHTML`.
  const domProps = optionsDef.lookupProperty("domProps");
  if (Def.isObjectDef(domProps)) {
    const innerHtml = domProps.lookupProperty("innerHTML");
    if (innerHtml) {
      taintManager.checkSink(innerHtml, "VUE_V_HTML", astNode, "Vue.v-html");
    }
  }
}

// --------------------- new Vue({...}) / Vue({...}) -------------------
BuiltInSemantics.register("Vue.fn", (args, callNode, astNode) => {
  interAnalyzer.setCurrentSideEffects();

  const optionsDef = args[0];
  if (Def.isObjectDef(optionsDef)) {
    checkVueOptions(optionsDef, astNode);
  }

  return defFactory.createObjectDef(callNode);
});

// --------------------- Vue.createApp({...}) -------------------
BuiltInSemantics.register("Vue.createApp", (args, callNode, astNode) => {
  interAnalyzer.setCurrentSideEffects();

  const optionsDef = args[0];
  if (Def.isObjectDef(optionsDef)) {
    checkVueOptions(optionsDef, astNode);
  }

  // createApp returns an app instance; model `mount` as a no-op passthrough.
  const app = defFactory.createObjectDef(callNode);
  const mount = defFactory.createBuiltInFunctionDef(callNode, "Vue.app.mount");
  app.setProperty("mount", mount);
  return app;
});

// --------------------- Vue.compile(template) -------------------
BuiltInSemantics.register("Vue.compile", (args, callNode, astNode) => {
  interAnalyzer.setCurrentSideEffects();

  const templateDef = args[0];
  if (templateDef) {
    taintManager.checkSink(templateDef, "VUE_COMPILE", astNode, "Vue.compile");
  }

  // Returns { render, staticRenderFns }.
  const result = defFactory.createObjectDef(callNode);
  const render = defFactory.createBuiltInFunctionDef(callNode, "Vue.render");
  result.setProperty("render", render);
  return result;
});
