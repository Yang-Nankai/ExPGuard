# Source-level Taint Flow — jolbglpclnpdolcmbgdipkdimneiplof 1.0.3

- Source type: CRX
- Files with issues: 5 / 6
- Distinct taint flows: 2  (collapsed from 2 raw issue entries)
- Sinkless sources skipped: 16 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `js/background` L5:C0 -> L5:C51  `»chrome.runtime.onMessage.addListener(handleMessage)«;`
- **Sink(s)**:
  - `FETCH_BODY` ([Unknown URL]) — `js/background` L51:C26 -> L51:C51  `const response = await »fetch(url, requestConfig)«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (101 raw steps → 7 distinct lines):
   1. L5 `»chrome.runtime.onMessage.addListener(handleMessage)«;`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[js/content->js/background]`
   2. L13 `Object.keys(»data«).forEach(key => {`  · ASSIGN:identifier
   3. L35 `value: »JSON.stringify(data)«`  · ASSIGN:identifier, RETURN:json.stringify
   4. L34 (→L36) `»			Object.defineProperty(requestConfig, 'body', {«`  · ELEMENT:object.setProperty
   5. L21 (→L31) `»		let requestConfig = {«`  · ELEMENT:object.setProperty
   6. L99 `buyer_nick = »encodeURIComponent(request.data)«;`  · RETURN:encodeURIComponent
   7. L14 `dataStr += »key + '=' + data[key]« + '&';`  · ASSIGN:identifier, ELEMENT:member-element-container, ASSIGN:binary-right, ASSIGN:binary-left

---

## Flow #2 — NAVIGATOR_USER_AGENT (navigator.userAgent)

- **Source**: `NAVIGATOR_USER_AGENT` — `js/layui` L295:C31 -> L295:C62  `}, h.v = "1.0.8", h.ie = (t = »navigator.userAgent.toLowerCase«(), !!(l.ActiveXObject || "ActiveXObject" in l) && ((t.match(/msie\s(\d+)/) || [])[1] || "11")), h.layui = layui || {}, h.getPath = layui.cache.dir, h.stope = layui.stope, h.each = function() {`
- **Sink(s)**:
  - `DOM_INNER_HTML` (innerHTML) — `js/layui` L583:C37 -> L583:C46  `i = (2 === i ? t.elem && (t.elem.»innerHTML« = r) : 3 === i ? t.elem.html(r) : n[u](t.elem) && (n[u](t.elem)`
  - `DOM_INNER_HTML` (innerHTML) — `js/layui` L584:C6 -> L584:C15  `.»innerHTML« = r), t.jump && t.jump(t, e), n[u]("layui-laypage-" + t.index));`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (12667 raw steps → 93 distinct lines):
   1. L295 `}, h.v = "1.0.8", h.ie = (t = »navigator.userAgent.toLowerCase(), !!(l.ActiveXObject || "ActiveXObject" in l) && ((t.match(/msie\s(\d+)/) || [])[1] || "11")«), h.layui = layui || {}, h.getPath = layui.cache.dir, h.stope = layui.stope, h.each = function() {`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:identifier, ASSIGN:logical-left, ASSIGN:logical-right
   2. L279 (→L281) `»		h = function(t) {«`  · ELEMENT:object.setProperty
   3. L606 `»u.path && i.lay && lay.layui && lay.layui.link«(u.path + e, t, a)`  · ASSIGN:logical-left, ELEMENT:member-element-container
   4. L1420 `}, n ? (u.ready(), »layui.define«("lay", function(e) {`  · ELEMENT:member-element-container
   5. L52 (→L61) `return "function" == typeof t && (r = t, t = []), »this.use(t, function() {«`  · ELEMENT:member-element-container, ELEMENT:implicit.add
   6. L66 (→L68) `u = (o = "string" == typeof o ? [o] : "function" == typeof o ? (t = o, ["all"]) : o, d.jQuery && jQuery.fn.on && (»n.each(o, function(t, e) {«`  · ELEMENT:member-element-container, ELEMENT:implicit.add
   7. L218 `if (»this.isArray«(t = t || []))`  · ELEMENT:member-element-container
   8. L211 `var e, o = »this.type«(t);`  · ELEMENT:member-element-container
   9. L84 `if (e = e || [], m.host = »m.host || (i.match(/\/\/([\s\S]+?)\//) || ["//" + location.host + "/"])[0], 0 === o.length || layui["layui.all"] && N[u]«) return c(), n;`  · ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:member-element-container, ASSIGN:identifier, RETURN:fallback-return
  10. L85 (→L86) `var p, y = (y = »(N[u] ? i + "modules/" : !/^\{\/\}/.test(n.modules[u]) && m.base || "") + (n.modules[u] || u) + ".js")«`  · ELEMENT:member-element-container, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:binary-right, ASSIGN:binary-left, RETURN:fallback-return, ASSIGN:identifier, ASSIGN:logical-right, ASSIGN:conditional-consequent
  11. L87 `return »!m.modules[u] && layui[u] && (m.modules[u] = y)«, m.modules[u] ? function f() {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:member-element-container
  12. L5 (→L10) `»		m = {«`  · ELEMENT:object.setProperty
  13. L89 (→L95) `}() : ((p = h.createElement("script"))["async"] = !0, p.charset = "utf-8", p.src = »y + ((i = !0 === m.version ? m.v || (new Date)«`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:conditional-alternate, ASSIGN:binary-right, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:conditional-consequent
  14. L95 `}), m.modules[u] = »y«), n`  · ASSIGN:identifier
  15. L88 `return ++l > 1e3 * m.timeout / 4 ? g(»u« + " is not a valid module", "error") : void("string" == typeof m.modules[u] && m.status[u] ? c() : setTimeout(f, 4))`  · ASSIGN:binary-left
  16. L23 `e = e || "log", d.console && console[e] && console[e]("layui error hint: " + »t«)`  · ASSIGN:identifier, ASSIGN:binary-right
  17. L4805 `}, C.fn.andSelf = C.fn.addBack, »layui.define«(function(e) {`  · ELEMENT:member-element-container
  18. L4811 `var h, f, e, n = »p.layui && layui.define«,`  · ELEMENT:member-element-container, ASSIGN:logical-left
  19. L4844 `ie: (e = »navigator.userAgent.toLowerCase()«, !!(p.ActiveXObject || "ActiveXObject" in p) && ((e.match(/msie\s(\d+)/) || [])[1] || "11")),`  · ELEMENT:member-element, RETURN:fallback-return
  20. L5471 `}, »p.layui && layui.define ? (m.ready(), layui.define«("jquery", function(e) {`  · ELEMENT:member-element-container, ASSIGN:logical-left
  21. L4853 `return n ? »layui.addcss«(i, e, t) : c.link(i, e, t), this`  · ELEMENT:member-element-container
  22. L124 `return »layui.link(href«, e, o)`  · ELEMENT:member-element-container, ASSIGN:identifier
  23. L5477 `»layui.define«("jquery", function(e) {`  · ELEMENT:member-element-container
  24. L5594 `»layui.define«(["jquery", "laytpl", "lay"], function(e) {`  · ELEMENT:member-element-container
  25. L5793 `»layui.define«("jquery", function(e) {`  · ELEMENT:member-element-container
  26. L6008 `»layui.define«(["jquery", "lay"], function(e) {`  · ELEMENT:member-element-container
  27. L6338 `»layui.define«("jquery", function(t) {`  · ELEMENT:member-element-container
  28. L6624 `»layui.define«("layer", function(e) {`  · ELEMENT:member-element-container
  29. L6936 `»layui.define«(["layer", "util"], function(e) {`  · ELEMENT:member-element-container
  30. L7287 `»layui.define«(["laytpl", "laypage", "form", "util"], function(e) {`  · ELEMENT:member-element-container
  31. L8252 `»layui.define«("form", function(e) {`  · ELEMENT:member-element-container
  32. L8636 `»layui.define«(["laytpl", "form"], function(e) {`  · ELEMENT:member-element-container
  33. L8864 `»layui.define«("jquery", function(e) {`  · ELEMENT:member-element-container
  34. L8998 `»layui.define«("jquery", function(e) {`  · ELEMENT:member-element-container
  35. L9102 `»layui.define«("jquery", function(l) {`  · ELEMENT:member-element-container
  36. L9180 `»layui.define«(["layer", "form"], function(t) {`  · ELEMENT:member-element-container
  37. L9473 (→L9505) `»layui.define(["lay", "util"], function(e) {«`  · ELEMENT:member-element-container
  38. L75 `return ++l > 1e3 * m.timeout / 4 ? g(»u« + " is not a valid module", "error") : void(m.status[u] ? c() : setTimeout(r, 4))`  · ASSIGN:binary-left
  39. L92 `s(t, »y«)`  · ASSIGN:identifier
  40. L74 `.readyState) || (m.modules[u] = »e«, a.removeChild(p), function r() {`  · ASSIGN:identifier
  41. L94 `s(t, »y«)`  · ASSIGN:identifier
  42. L126 `if (»layui[t]«) return "function" == typeof m.callback[t] ? m.callback[t] : null`  · ELEMENT:member-element-container
  43. L190 `var o = »navigator.userAgent.toLowerCase()«,`  · ELEMENT:member-element, RETURN:fallback-return
  44. L197 `ie: »!!(d.ActiveXObject || "ActiveXObject" in d) && ((o.match(/msie\s(\d+)/) || [])[1] || "11")«,`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left, ASSIGN:logical-right
  45. L195 (→L199) `»				r = {«`  · ELEMENT:object.setProperty
  46. L193 `return »(t = (o.match(e) || [])[1]) || !1«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left
  47. L200 `return »t && !r[t] && (r[t] = e(t)), r.android = /android/.test(o«), r.ios = "ios" === r.os, r.mobile = !(!r.android && !r.ios), r`  · ASSIGN:identifier, ELEMENT:computed-member-unknown-alternative, ELEMENT:member-element-container, ASSIGN:unary, ASSIGN:logical-right, ASSIGN:logical-left
  48. L261 (→L263) `return o === s ? (delete(n.cache.event[t] || {})[u], n) : r ? (m.event[t] = m.event[t] || {}, m.event[t][u] = [r], this) : (»layui.each(m.event[t], function(t, e) {«`  · ELEMENT:member-element-container, ELEMENT:implicit.add
  49. L262 `"{*}" === u ? »layui.each(e, l) : ("" === t && layui.each(e, l), u && t === u && layui.each«(e, l))`  · ELEMENT:member-element-container
  50. L271 `var i = »layui.cache«;`  · ELEMENT:member-element-container
  51. L272 (→L274) `»layui.config({«`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  52. L273 `dir: »i.dir.replace(/lay\/dest\/$/, "")«`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  53. L136 `for (»var e in t = t || {}) m[e] = t[e«];`  · ITERATE:loop.iteration, ASSIGN:identifier
  54. L274 `}), a("layui.all", »layui.v«)`  · ELEMENT:member-element-container
  55. L296 `»return layui.each.apply(layui, arguments), this«`  · ELEMENT:member-element-container, ELEMENT:implicit.add
  56. L591 `index: layui.laypage ? »layui.laypage.index + 1e4« : 0,`  · ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:conditional-consequent
  57. L517 (→L597) `»		o = (t.prototype.type = function() {«`  · ELEMENT:object.setProperty
  58. L515 `»a.config = e || {}, a.config.index = ++o.index«, a.render(!0)`  · ASSIGN:update, ELEMENT:object.setProperty
  59. L538 `limit: (t = ['<span class="layui-laypage-limits"><select lay-ignore>'], »layui.each«(r.limits, function(e, a) {`  · ELEMENT:member-element-container
  60. L524 (→L543) `»				s = {«`  · ELEMENT:implicit.add
  61. L544 (→L546) `return [»'<div class="layui-box layui-laypage layui-laypage-' + (r.theme ? /^#/.test(r.theme) ? "molv" : r.theme : "default") + '" id="layui-laypage-' + r.index + '">', (i = [], layui.each(r.layout, function(e, a) {«`  · ASSIGN:binary-right, ASSIGN:binary-left, ELEMENT:member-element-container, ELEMENT:implicit.add, ELEMENT:object.setProperty, RETURN:array.join
  62. L584 `.innerHTML = »r), t.jump && t.jump(t, e), n[u]("layui-laypage-" + t.index«));`  · ASSIGN:binary-right, ASSIGN:identifier
  63. L583 (→L584) `i = (2 === i ? »t.elem && (t.elem.innerHTML = r) : 3 === i ? t.elem.html(r) : n[u](t.elem) && (n[u](t.elem)«`  · ASSIGN:identifier, ELEMENT:object.setProperty, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:conditional-consequent
  64. L652 (→L656) `if (1 < a.length) return »layui.each(a, function() {«`  · ELEMENT:member-element-container, ELEMENT:implicit.add
  65. L624 `return n ? »layui.addcss«(a, e, t) : l.link(a, e, t), this`  · ELEMENT:member-element-container
  66. L122 `var href = t.indexOf('chrome-extension://')==-1 ? »m.dir + "css/" + t« : t;`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:conditional-consequent
  67. L108 (→L109) `t = (»(t = "string" == typeof r ? r : t) || o)«`  · ASSIGN:identifier, ASSIGN:logical-right, ELEMENT:member-element, RETURN:fallback-return
  68. L110 `a = i.id = "layuicss-" + »t«,`  · ASSIGN:identifier, ASSIGN:binary-right
  69. L114 `return i.rel = "stylesheet", i.href = »o« + (m.debug ? "?v=" + (new Date)`  · ASSIGN:identifier, ASSIGN:binary-left
  70. L115 `.getTime() : ""), i.media = "all", h.getElementById(»a«) || e.appendChild(i), "function" != typeof r || function s(t) {`  · ASSIGN:identifier
  71. L116 `var e = h.getElementById(»a«);`  · ASSIGN:identifier
  72. L117 `return ++l > 1e3 * m.timeout / 100 ? g(»o« + " timeout") : void(1989 === parseInt(n.getStyle(e, "width")) ? (t === u && e.removeAttribute("lay-status"), e.getAttribute("lay-status") === u ? setTimeout(s, 100) : r()) : (e.setAttribute("lay-status", u), setTimeout(function() {`  · ASSIGN:identifier, ASSIGN:binary-left
  73. L741 `…m = lay(o.eventElem), o.elem[0] && (r.rangeStr = o.range ? "string" == typeof o.range ? o.range : "-" : "", "array" === »layui.type«(o.range) && (r.rangeElem = [lay(o.range[0]), lay(o.range[1])]), t[o.type] || (i.console && console.error && console.err…`  · ELEMENT:member-element-container
  74. L841 `}), e.push(»'<div class="laydate-footer-btns">' + n.join("")« + "</div>"), e.join(""))), lay.each(y, function(e, t) {`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-right, ASSIGN:binary-left
  75. L1176 `.val(e) : (a = t.rangeElem) ? ("array" !== »layui.type«(e) && (e = e.split(" " + t.rangeStr + " ")), a[0].val(e[0] || ""), a[1].val(e[1] || "")) : (0 === lay(n)`  · ELEMENT:member-element-container
  76. L782 `}), r.elemID = "layui-laydate" + o.elem.attr("lay-key"), (o.show || e) && r.render(), e || r.events(), o.value && o.isInitValue && ("date" === »layui.type«(o.value) ? r.setValue(r.parse(0, r.systemDate(o.value))) : r.setValue(o.value)))`  · ELEMENT:member-element-container
  77. L769 (→L770) `.getTime(), i = [(n = »new Date(n ? n < 864e5 ? a + 864e5 * n : n : a))«`  · ASSIGN:binary-right, ASSIGN:conditional-consequent, RETURN:Date.constructor, ELEMENT:member-element, RETURN:fallback-return
  78. L770 `.getFullYear(), »n.getMonth() + 1, n.getDate()«`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left
  79. L761 (→L771) `»			l = "number" == typeof o[t] ? (n = o[t], a = new Date, a = r.newDate({«`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  80. L771 (→L781) `], [»n.getHours(), n.getMinutes(), n.getSeconds()]) : (i = (o[t].match(/\d+-\d+-\d+/) || [""])[0].split("-"), (o[t].match(/\d+:\d+:\d+/) || [""])[0].split(":")), o[t] = {«`  · ELEMENT:member-element, RETURN:fallback-return, ELEMENT:object.setProperty
  81. L778 `hours: 0 | »l[0]«,`  · ELEMENT:member-element-container, ASSIGN:binary-right
  82. L779 `minutes: 0 | »l[1]«,`  · ELEMENT:member-element-container, ASSIGN:binary-right
  83. L780 `seconds: 0 | »l[2]«`  · ELEMENT:member-element-container, ASSIGN:binary-right
  84. L804 (→L818) `»					t = [((t = lay.elem("i", {«`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  85. L793 `»d = t.elemHeader = []«,`  · ELEMENT:object.setProperty
  86. L840 `o.range && "now" === t || (i && "clear" === t && (a = "cn" === o.lang ? "\u91cd\u7f6e" : "Reset"), »n.push('<span lay-type="' + t + '" class="laydate-btns-' + t + '">' + a + "</span>")«)`  · ELEMENT:member-element, RETURN:fallback-return
  87. L936 `}), »n && e.html('<span class="laydate-day-mark">' + n + "</span>")«, this`  · ASSIGN:binary-right, ASSIGN:binary-left, ASSIGN:logical-left
  88. L940 `return "array" !== »layui.type«(e.holidays) || lay.each(e.holidays, function(a, e) {`  · ELEMENT:member-element-container
  89. L1386 (→L1387) `return !t && n && »layui.hint()«`  · ELEMENT:member-element-container, ASSIGN:logical-left
  90. L1421 `u.path = »layui.cache.dir«, l.run(lay), e(a, u)`  · ELEMENT:member-element-container
  91. L610 (→L626) `»		u = {«`  · ELEMENT:object.setProperty
  92. L64 `i = m.dir = »m.dir || v«,`  · ELEMENT:member-element-container, ASSIGN:logical-left
  93. L90 `.getTime() : »m.version || "") ? "?v=" + i« : ""), a.appendChild(p), !p.attachEvent || p.attachEvent.toString && p.attachEvent.toString()`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:conditional-consequent, ELEMENT:member-element, ASSIGN:logical-left

---
