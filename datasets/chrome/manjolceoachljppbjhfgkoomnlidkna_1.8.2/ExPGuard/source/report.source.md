# Source-level Taint Flow — manjolceoachljppbjhfgkoomnlidkna 1.8.2

- Source type: CRX
- Files with issues: 4 / 20
- Distinct taint flows: 3  (collapsed from 3 raw issue entries)
- Sinkless sources skipped: 11 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — STORAGE_ALL_ITEMS (storage.all.items[local])

- **Source**: `STORAGE_ALL_ITEMS` — `libs/CommonMemory` L6:C69 -> L6:C76  `for (var o in r) new RegExp(e.prefix).test(r[o]) && null !== »t[r[o]]« && (e.data[r[o]] = t[r[o]]), new RegExp(e.prefix_exp).test(r[o]) && null !== t[r[o]] && (e.exp[r[o]] = t[r[o]])`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (_cm_uid) — `libs/CommonMemory` L29:C169 -> L29:C196  `o[this.prefix + e] = t, o[this.prefix_exp + e] = r ? i + 1e3 * r : i + 18e5, this.data[this.prefix + e] = t, this.exp[this.prefix_exp + e] = o[this.prefix_exp + e], »chrome.storage.local.set(o)«`
  - `CHROME_LOCAL_STORAGE` (_cm_token) — `libs/CommonMemory` L29:C169 -> L29:C196  `o[this.prefix + e] = t, o[this.prefix_exp + e] = r ? i + 1e3 * r : i + 18e5, this.data[this.prefix + e] = t, this.exp[this.prefix_exp + e] = o[this.prefix_exp + e], »chrome.storage.local.set(o)«`
  - `CHROME_LOCAL_STORAGE` (_cm_visits_cnt) — `libs/CommonMemory` L29:C169 -> L29:C196  `o[this.prefix + e] = t, o[this.prefix_exp + e] = r ? i + 1e3 * r : i + 18e5, this.data[this.prefix + e] = t, this.exp[this.prefix_exp + e] = o[this.prefix_exp + e], »chrome.storage.local.set(o)«`
  - `CHROME_LOCAL_STORAGE` (_cm_curBanner) — `libs/CommonMemory` L29:C169 -> L29:C196  `o[this.prefix + e] = t, o[this.prefix_exp + e] = r ? i + 1e3 * r : i + 18e5, this.data[this.prefix + e] = t, this.exp[this.prefix_exp + e] = o[this.prefix_exp + e], »chrome.storage.local.set(o)«`
  - `JQUERY_ELEMENT_TEXT_SET` (#justroll-user-balance-target) — `content/content` L633:C10 -> L633:C76  `»$('#justroll-user-balance-target').text(d.user.balance.toFixed(7))«`
  - `CHROME_LOCAL_STORAGE` (_cm_justroll_top) — `libs/CommonMemory` L29:C169 -> L29:C196  `o[this.prefix + e] = t, o[this.prefix_exp + e] = r ? i + 1e3 * r : i + 18e5, this.data[this.prefix + e] = t, this.exp[this.prefix_exp + e] = o[this.prefix_exp + e], »chrome.storage.local.set(o)«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (117417 raw steps → 83 distinct lines):
   1. L6 _(in `libs/CommonMemory`)_ `for (var o in r) »new RegExp(e.prefix).test(r[o]) && null !== t[r[o]] && (e.data[r[o]] = t[r[o]]), new RegExp(e.prefix_exp).test(r[o]) && null !== t[r[o]] && (e.exp[r[o]] = t[r[o]]«)`  · ELEMENT:member-element-container, ASSIGN:binary-right, ASSIGN:logical-right
   2. L2 _(in `content/countUp`)_ `»__assign = Object.assign || f«unction(t) {`  · ELEMENT:object.setProperty
   3. L21 _(in `libs/CommonMemory`)_ `»void 0 !== this.data[o] && this.exp[i] > 0 && this.exp[i] > (new Date).valueOf() ? t.push(this.data[o]) : t.push«(null)`  · ELEMENT:member-element-container, ASSIGN:binary-right, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:computed-member-unknown-alternative
   4. L16 _(in `popup/purify`)_ `cr»eate =« Object.create; // eslint-disable-line import/no-mutable-exports`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
   5. L23 _(in `popup/purify`)_ `apply = function apply(fun, thisVal»ue, «args) {`  · ELEMENT:member-element-container, ASSIGN:conditional-consequent
   6. L1087 `stopList = »JSON.parse(stopList)«`  · RETURN:json.parse
   7. L1091 `if (»'hosts' in stopList && stopList.hosts.length && stopList.hosts.indexOf(url.host) > -1«) {`  · ELEMENT:member-element, ELEMENT:member.length, ASSIGN:logical-right, RETURN:fallback-return, ASSIGN:binary-left, ASSIGN:logical-left
   8. L1095 `if (»'pages' in stopList && stopList.pages.length && stopList.pages.indexOf(url.urlnh) > -1«) {`  · ELEMENT:member-element, ELEMENT:member.length, ASSIGN:logical-right, RETURN:fallback-return, ASSIGN:binary-left, ASSIGN:logical-left
   9. L943 `if (»curBanner && curBanner.length > 1«) {`  · ELEMENT:member.length, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  10. L944 `d = »JSON.parse(curBanner)«`  · RETURN:json.parse
  11. L4 (→L821) `»  justroll = {«`  · ELEMENT:object.setProperty
  12. L184 `if (»d.user && 'uid' in d.user) cm.set('uid', d.user.uid«, 3600)`  · ELEMENT:member-element, ASSIGN:logical-left
  13. L29 _(in `libs/CommonMemory`)_ `o[this.prefix + e] = »t, o[this.prefix_exp + e] = r ? i + 1e3 * r : i + 18e5, this.data[this.prefix + e] = t«, this.exp[this.prefix_exp + e] = o[this.prefix_exp + e], chrome.storage.local.set(o)`  · ASSIGN:identifier
  14. L27 `»childr«en: [`  · ELEMENT:object.setProperty
  15. L188 `if (»d.token«) {`  · ELEMENT:member-element
  16. L194 `if (»d.badge« >= 0) {`  · ELEMENT:member-element, ASSIGN:binary-left, ELEMENT:member-element-container
  17. L190 `cm.set('token', »d.token«)`  · ELEMENT:member-element
  18. L195 `»justroll.bg({ badge: d.badge })«`  · ELEMENT:member-element, ELEMENT:object.setProperty
  19. L201 `if (»d.visits >= 0 && justroll.visits(d.visits)«) {`  · ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ELEMENT:member-element-container
  20. L664 `cm.set('visits_cnt', »cnt«, 21600)`  · ASSIGN:identifier
  21. L668 `if (»crnt < cnt«) {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right
  22. L785 `if (»!('type' in justroll._d) || justroll._d.type !== 'captcha'«) justroll.dispatcher(justroll._d)`  · ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-right
  23. L191 `justroll.init(»d.token«)`  · ELEMENT:member-element
  24. L238 `if (»token) justroll.token = token«`  · ASSIGN:identifier
  25. L224 `if (»!cm.get('private_policy_agree') && 'applications' in chrome.runtime.getManifest()«) {`  · ASSIGN:logical-left
  26. L268 `»chrome.runtime.sendMessage({ req_init: 1, token: token })«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  27. L208 `if (»d.notify«) {`  · ELEMENT:member-element, ELEMENT:member-element-container
  28. L197 `if (»justroll._d.adv && justroll._d.adv.length«)`  · ELEMENT:member-element, ELEMENT:member.length, ASSIGN:logical-left, ASSIGN:logical-right
  29. L203 `if (»justroll._d.adv && justroll._d.adv.length«)`  · ELEMENT:member-element, ELEMENT:member.length, ASSIGN:logical-left, ASSIGN:logical-right
  30. L209 `justroll.notify(»d.notify«)`  · ELEMENT:member-element
  31. L686 `if (»data.type« === 'captcha') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  32. L688 `src: »data.src«,`  · ASSIGN:identifier, ELEMENT:member-element
  33. L687 (→L692) `»        content = $('<iframe>').attr({«`  · ELEMENT:object.setProperty
  34. L693 `} else if (»data.type« === 'captsurfe') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  35. L695 `} else if (»data.type« === 'msg') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  36. L696 `content = $('<div>').json2html(»data«, justroll.tpl.ntf_msg, { output: 'jquery' })`  · ASSIGN:identifier
  37. L697 `} else if (»data.type« === 'visit') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  38. L698 `content = $('<div>').json2html(»data«, justroll.tpl.ntf_visit, { output: 'jquery' })`  · ASSIGN:identifier
  39. L699 `} else if (»data.type« === 'no_ttl') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  40. L700 `content = $('<div>').json2html(»data«, justroll.tpl.ntf_nottl, {output: 'jquery'})`  · ASSIGN:identifier
  41. L701 `} else if (»data.type« === 'video') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  42. L702 `content = $('<div>').json2html(»data.data«, justroll.tpl.ntf_video, {output: 'jquery'})`  · ASSIGN:identifier, ELEMENT:member-element
  43. L720 `if (»data.type« === 'visit') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  44. L754 `if (»data.type« === 'captsurfe') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  45. L766 `$('#justroll-notify').data('type', »data.type«)`  · ASSIGN:identifier, ELEMENT:member-element
  46. L770 `if ('timeout' in »data) data.autoclose = data.timeout«`  · ASSIGN:identifier, ELEMENT:member-element
  47. L747 `if (»data.type« !== 'captcha') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  48. L772 `if (»'autoclose' in data && data.autoclose«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-right
  49. L776 `}, »data.autoclose«)`  · ASSIGN:identifier, ELEMENT:member-element
  50. L214 `if (»d.adv«) justroll.panel(d)`  · ELEMENT:member-element
  51. L198 `cm.set('curBanner', »JSON.stringify(justroll._d)«, 300)`  · RETURN:json.stringify
  52. L204 `cm.set('curBanner', »JSON.stringify(justroll._d)«, 300)`  · RETURN:json.stringify
  53. L481 `if (»!'adv' in d || !d.adv.length«) {`  · ELEMENT:member-element, ELEMENT:member.length, ASSIGN:unary, ASSIGN:logical-right
  54. L585 `if (!$('#jr-adv-' + »d.adv[0].id«).length) {`  · ELEMENT:member-element, ASSIGN:binary-right
  55. L616 `justroll.progress = »parseInt(cm.get('progress') || 0)«`  · RETURN:parseInt
  56. L588 `for (»var i in d.adv«) {`  · ELEMENT:member-element, ITERATE:loop.iteration
  57. L589 `var ad = »d.adv[i]«`  · ELEMENT:member-element, ASSIGN:identifier, ELEMENT:member-element-container
  58. L590 `$('#justroll-adv').json2html(»ad, ad.tpl ? ad.tpl : justroll.tpl['t' + ad.type«], { output: 'jquery' })`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:conditional-consequent
  59. L591 `if (»ad.type« === 0) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  60. L594 `.attr('id', 'jr-adv-' + String(»parseInt(ad.id)«))`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:parseInt
  61. L595 `.data('key', »ad.key«)`  · ASSIGN:identifier, ELEMENT:member-element
  62. L596 `.addClass('jr-adv jr-t' + »ad.type«)`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right
  63. L531 `.append($('<span>').attr('id', 'justroll-user-balance-target').text(»d.user.balance.toFixed(7)«))`  · ELEMENT:member-element, RETURN:fallback-return
  64. L215 `else if (»d.user && 'balance' in d.user«) justroll.panel_balance(d)`  · ELEMENT:member-element, ASSIGN:logical-left
  65. L622 `if (»justroll.onpanel_balance && justroll.animation«) {`  · ASSIGN:logical-left
  66. L623 (→L629) `var ubal = new CountUp('justroll-user-balance-target', »d.user.balance.toFixed(7), {«`  · ELEMENT:member-element, RETURN:fallback-return, ELEMENT:object.setProperty
  67. L17 `// captcha_check: »false,«`  · ASSIGN:identifier
  68. L123 _(in `content/countUp`)_ `this.endVal = this.validateValue(»endVal«);`  · ASSIGN:identifier
  69. L232 _(in `popup/purify`)_ `HTMLTemplateElement = »windo«w.HTMLTemplateElement,`  · ASSIGN:identifier
  70. L234 _(in `content/countUp`)_ `this.error = "[CountUp] invalid start or end value: " + »value«;`  · ASSIGN:identifier, ASSIGN:binary-right
  71. L630 `if (»!ubal.error«) {`  · ASSIGN:unary
  72. L633 `$('#justroll-user-balance-target').text(»d.user.balance.toFixed(7)«)`  · ELEMENT:member-element, RETURN:fallback-return
  73. L217 `if (»d.error«) justroll.error(d)`  · ELEMENT:member-element
  74. L279 `if (typeof d === 'string') »d = { error: d }«`  · ELEMENT:object.setProperty
  75. L281 `if (»d.error« === 'token_expired') {`  · ASSIGN:binary-left
  76. L286 `if (»d.error« === 'guest') justroll.guest()`  · ASSIGN:binary-left
  77. L288 `if (»d.error« === 'captcha') justroll.captcha(d)`  · ASSIGN:binary-left
  78. L290 `if (»d.error« === 'not_allowed') $('#justroll').remove()`  · ASSIGN:binary-left
  79. L292 `if (»d.error === 'break_onfocus' && justroll.onfocus«) {`  · ASSIGN:binary-left, ASSIGN:logical-left
  80. L219 `if (»d.init«) justroll.init()`  · ELEMENT:member-element
  81. L965 `if (»justroll.infocus && ifvisible.now() && (!justroll.progress || justroll.progress === 100)«) justroll.init()`  · ASSIGN:unary, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  82. L1062 `if (»justroll.infocus && (justroll.progress === 100 || !justroll.progress)«) justroll.init()`  · ASSIGN:binary-left, ASSIGN:unary, ASSIGN:logical-left, ASSIGN:logical-right
  83. L1066 `if (»justroll.infocus && justroll.progress < 100«) justroll.progressbar(1)`  · ASSIGN:binary-left, ASSIGN:logical-right

---

## Flow #2 — JQUERY_ELEMENT_TEXT (#justroll-user-balance-target)

- **Source**: `JQUERY_ELEMENT_TEXT` — `content/content` L624:C20 -> L624:C73  `startVal: »parseFloat($('#justroll-user-balance-target').text())«,`
- **Sink(s)**:
  - `DOM_INNER_HTML` (innerHTML) — `content/content` L225:C20 -> L225:C29  `console.erro»r('Surfe.«be ERROR: You must agree Privacy Policy')`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (6258 raw steps → 28 distinct lines):
   1. L624 `startVal: »parseFloat($('#justroll-user-balance-target').text())«,`  · RETURN:parseFloat
   2. L623 (→L629) `»        var ubal = new CountUp('justroll-user-balance-target', d.user.balance.toFixed(7), {«`  · ELEMENT:object.setProperty
   3. L116 _(in `content/countUp`)_ `»this.options = __assign({}, this.defaults, options)«;`  · ELEMENT:object.setProperty, COPY:object.assign
   4. L118 _(in `content/countUp`)_ `»this.options.formattingFn« : this.formatNumber;`  · ELEMENT:member-element, ASSIGN:conditional-consequent
   5. L120 `styl»e: 'display: flex; -w«ebkit-box-align: center; align-items: center; height: 100%;',`  · ELEMENT:member-element, ASSIGN:conditional-consequent
   6. L121 _(in `content/countUp`)_ `this.startVal = this.validateValue(»this.options.startVal«);`  · ELEMENT:member-element-container
   7. L232 _(in `popup/purify`)_ `HTMLTemplateElement = »windo«w.HTMLTemplateElement,`  · ASSIGN:identifier
   8. L234 _(in `content/countUp`)_ `this.error = "[CountUp] invalid start or end value: " + »value«;`  · ASSIGN:identifier, ASSIGN:binary-right
   9. L124 _(in `popup/purify`)_ `var html = freeze(['a', 'abbr', 'ac»ronym', 'address', 'area', 'article', 'as«ide', 'audio', 'b', 'bdi', 'bdo', 'big', 'blink', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', '…`  · ELEMENT:member-element-container, ASSIGN:logical-right, RETURN:Math.max
  10. L125 _(in `content/json2html`)_ `//_apply the transform» to this object and append it to the res«ults`  · ELEMENT:member-element-container, RETURN:Math.pow
  11. L243 _(in `popup/purify`)_ `// new document created via» createHTMLDocument. «As per the spec`  · ELEMENT:member-element-container
  12. L127 _(in `popup/purify`)_ `var svg = freeze(['svg', 'a', 'altglyp»h', 'altglyphdef', 'al«tglyphitem', 'animatecolor', 'animatemotion', 'animatetransform', 'audio', 'canvas', 'circle', 'clippath', 'defs', 'desc…`  · ELEMENT:member-element-container
  13. L128 `style: 'f»ont-weight: bold; font«-size: 14px; line-height: 16px; color: #FFFFFF; margin-bottom: 4px;',`  · ELEMENT:member-element-container
  14. L129 _(in `popup/purify`)_ `var svgFil»ters = freeze(['feBlen«d', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence']);`  · ELEMENT:member-element-container, ASSIGN:binary-left
  15. L95 _(in `popup/purify`)_ `// Config presets (e.g». tags.js, attrs.js) are imm«utable.`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:conditional-consequent
  16. L96 _(in `content/countUp`)_ `if (»_this.options.useGrouping«) {`  · ELEMENT:member-element-container
  17. L107 _(in `content/countUp`)_ `if (»_this.options.numerals && _this.options.numerals.length«) {`  · ELEMENT:member-element, ELEMENT:member.length, ASSIGN:logical-left, ASSIGN:logical-right
  18. L111 _(in `content/countUp`)_ `return »neg + _this.options.prefix + x1 + x2 + _this.options.suffix«;`  · ELEMENT:member-element-container, ASSIGN:binary-right, ASSIGN:binary-left, ASSIGN:identifier
  19. L109 _(in `content/json2html`)_ `//Itterrate throug»h the arra«y and add it to the elements array`  · ASSIGN:identifier, ELEMENT:member-element-container
  20. L219 `if (d.init) justroll».init(«)`  · ASSIGN:identifier
  21. L132 _(in `content/countUp`)_ `»this.el = (typeof target === 'string') ? document.getElementById(target) : target«;`  · ELEMENT:object.setProperty
  22. L222 _(in `popup/purify`)_ `// so that you can pass your» own W«indow`  · ASSIGN:identifier
  23. L225 `console.error('Surfe.be »ERROR:« You must agree Privacy Policy')`  · ASSIGN:identifier
  24. L145 _(in `content/countUp`)_ `if (Math.abs(animateAmount) > »this.options.smartEasingThreshold«) {`  · ELEMENT:member-element-container, ASSIGN:binary-right
  25. L148 _(in `popup/purify`)_ `var IS_ALLOWED_URI = seal(/^(?:»(?:(?:f|ht)tps?|mailto|tel|callto|c«id|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i // eslint-disable-line no-useless-escape`  · ELEMENT:member-element-container, ASSIGN:binary-right
  26. L159 _(in `popup/purify`)_ `return typeof window === »'undefined' ? null : w«indow;`  · ELEMENT:member-element-container
  27. L216 _(in `content/ifvisible`)_ `res.timeLeftPer = (100 - (res».ti«meLeft * 100 / idleTime)).toFixed(2);`  · ASSIGN:identifier
  28. L91 `'fo»nt-size: 9px !important; right: 3px !important; bo«ttom: 8px !important; position: absolute!important; font-family: Verdana, sans-serif !important; display: block !important; color: #000000 !important; text-align: center !important; line-height: 0px !important; letter-spacing: normal !important; -webkit-hyphens: auto !important; -ms-hyphens: auto !important; hyphens: auto !important; text-decoration: none !important;;',`  · ASSIGN:identifier, RETURN:Math.abs, RETURN:Number.toFixed

---

## Flow #3 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `content/content` L975:C17 -> L975:C35  `let data = »JSON.parse(e.data)«;`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (_cm_uid) — `libs/CommonMemory` L29:C169 -> L29:C196  `o[this.prefix + e] = t, o[this.prefix_exp + e] = r ? i + 1e3 * r : i + 18e5, this.data[this.prefix + e] = t, this.exp[this.prefix_exp + e] = o[this.prefix_exp + e], »chrome.storage.local.set(o)«`
  - `CHROME_LOCAL_STORAGE` (storage.fuzzy.settings) — `content/content` L189:C8 -> L189:C35  `»chrome.storage.local.set(d)«`
  - `CHROME_LOCAL_STORAGE` (_cm_token) — `libs/CommonMemory` L29:C169 -> L29:C196  `o[this.prefix + e] = t, o[this.prefix_exp + e] = r ? i + 1e3 * r : i + 18e5, this.data[this.prefix + e] = t, this.exp[this.prefix_exp + e] = o[this.prefix_exp + e], »chrome.storage.local.set(o)«`
  - `CHROME_LOCAL_STORAGE` (_cm_visits_cnt) — `libs/CommonMemory` L29:C169 -> L29:C196  `o[this.prefix + e] = t, o[this.prefix_exp + e] = r ? i + 1e3 * r : i + 18e5, this.data[this.prefix + e] = t, this.exp[this.prefix_exp + e] = o[this.prefix_exp + e], »chrome.storage.local.set(o)«`
  - `JQUERY_ELEMENT_TEXT_SET` (#justroll-user-balance-target) — `content/content` L633:C10 -> L633:C76  `»$('#justroll-user-balance-target').text(d.user.balance.toFixed(7))«`
  - `CHROME_LOCAL_STORAGE` (_cm_justroll_top) — `libs/CommonMemory` L29:C169 -> L29:C196  `o[this.prefix + e] = t, o[this.prefix_exp + e] = r ? i + 1e3 * r : i + 18e5, this.data[this.prefix + e] = t, this.exp[this.prefix_exp + e] = o[this.prefix_exp + e], »chrome.storage.local.set(o)«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (90356 raw steps → 90 distinct lines):
   1. L975 `let data = »JSON.parse(e.data)«;`  · RETURN:json.parse
   2. L1021 `if (»!e.data || e.data.target !== _domain_«) return`  · ASSIGN:unary, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   3. L1023 `if (»e.data.cmd« === 'auth') {`  · ELEMENT:member-element, ASSIGN:binary-left
   4. L985 `if (»data.event« === 'initialDelivery') {`  · ELEMENT:member-element, ASSIGN:binary-left
   5. L1024 `if (»e.data.token«) {`  · ELEMENT:member-element
   6. L1032 `if (»e.data.cmd« === 'ntf_close') {`  · ELEMENT:member-element, ASSIGN:binary-left
   7. L986 `justroll.vyData.muted = »data.info.muted«`  · ELEMENT:member-element
   8. L978 (→L983) `»        justroll.vyData = {«`  · ELEMENT:object.setProperty
   9. L184 `if (»d.user && 'uid' in d.user) cm.set('uid', d.user.uid«, 3600)`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  10. L29 _(in `libs/CommonMemory`)_ `o[this.prefix + e] = »t, o[this.prefix_exp + e] = r ? i + 1e3 * r : i + 18e5, this.data[this.prefix + e] = t«, this.exp[this.prefix_exp + e] = o[this.prefix_exp + e], chrome.storage.local.set(o)`  · ASSIGN:identifier
  11. L27 `»childr«en: [`  · ELEMENT:object.setProperty
  12. L2 `//» _domain_ = 'l«oc.surfe.be',`  · ELEMENT:object.setProperty
  13. L188 `if (»d.token«) {`  · ASSIGN:identifier, ELEMENT:member-element
  14. L189 `chrome.storage.local.set(»d«)`  · ASSIGN:identifier
  15. L194 `if (»d.badge« >= 0) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  16. L190 `cm.set('token', »d.token«)`  · ASSIGN:identifier, ELEMENT:member-element
  17. L195 `»justroll.bg({ badge: d.badge })«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
  18. L201 `if (»d.visits >= 0 && justroll.visits(d.visits)«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left
  19. L21 _(in `libs/CommonMemory`)_ `»void 0 !== this.data[o] && this.exp[i] > 0 && this.exp[i] > (new Date).valueOf() ? t.push(this.data[o]) : t.push«(null)`  · ELEMENT:computed-member-unknown-alternative, ELEMENT:member-element-container, ASSIGN:binary-right, ASSIGN:logical-left
  20. L16 _(in `popup/purify`)_ `cr»eate =« Object.create; // eslint-disable-line import/no-mutable-exports`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  21. L23 _(in `popup/purify`)_ `apply = function apply(fun, thisVal»ue, «args) {`  · ELEMENT:member-element-container, ASSIGN:conditional-consequent
  22. L664 `cm.set('visits_cnt', »cnt«, 21600)`  · ASSIGN:identifier
  23. L668 `if (»crnt < cnt«) {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right
  24. L191 `justroll.init(»d.token«)`  · ASSIGN:identifier, ELEMENT:member-element
  25. L238 `if (»token) justroll.token = token«`  · ASSIGN:identifier
  26. L4 (→L821) `»  justroll = {«`  · ELEMENT:object.setProperty
  27. L224 `if (»!cm.get('private_policy_agree') && 'applications' in chrome.runtime.getManifest()«) {`  · ASSIGN:logical-left
  28. L268 `»chrome.runtime.sendMessage({ req_init: 1, token: token })«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  29. L208 `if (»d.notify«) {`  · ASSIGN:identifier, ELEMENT:member-element
  30. L209 `justroll.notify(»d.notify«)`  · ASSIGN:identifier, ELEMENT:member-element
  31. L686 `if (»data.type« === 'captcha') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  32. L688 `src: »data.src«,`  · ASSIGN:identifier, ELEMENT:member-element
  33. L687 (→L692) `»        content = $('<iframe>').attr({«`  · ELEMENT:object.setProperty
  34. L693 `} else if (»data.type« === 'captsurfe') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  35. L695 `} else if (»data.type« === 'msg') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  36. L696 `content = $('<div>').json2html(»data«, justroll.tpl.ntf_msg, { output: 'jquery' })`  · ASSIGN:identifier
  37. L697 `} else if (»data.type« === 'visit') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  38. L698 `content = $('<div>').json2html(»data«, justroll.tpl.ntf_visit, { output: 'jquery' })`  · ASSIGN:identifier
  39. L699 `} else if (»data.type« === 'no_ttl') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  40. L700 `content = $('<div>').json2html(»data«, justroll.tpl.ntf_nottl, {output: 'jquery'})`  · ASSIGN:identifier
  41. L701 `} else if (»data.type« === 'video') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  42. L702 `content = $('<div>').json2html(»data.data«, justroll.tpl.ntf_video, {output: 'jquery'})`  · ASSIGN:identifier, ELEMENT:member-element
  43. L720 `if (»data.type« === 'visit') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  44. L754 `if (»data.type« === 'captsurfe') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  45. L766 `$('#justroll-notify').data('type', »data.type«)`  · ASSIGN:identifier, ELEMENT:member-element
  46. L770 `if ('timeout' in »data) data.autoclose = data.timeout«`  · ASSIGN:identifier, ELEMENT:member-element
  47. L747 `if (»data.type« !== 'captcha') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  48. L772 `if (»'autoclose' in data && data.autoclose«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-right
  49. L776 `}, »data.autoclose«)`  · ASSIGN:identifier, ELEMENT:member-element
  50. L214 `if (»d.adv) justroll.panel(d«)`  · ASSIGN:identifier, ELEMENT:member-element
  51. L481 `if (»!'adv' in d || !d.adv.length«) {`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member.length, ASSIGN:unary, ASSIGN:logical-right
  52. L585 `if (!$('#jr-adv-' + »d.adv[0].id«).length) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right
  53. L616 `justroll.progress = »parseInt(cm.get('progress') || 0)«`  · RETURN:parseInt
  54. L588 `for (»var i in d.adv«) {`  · ASSIGN:identifier, ELEMENT:member-element, ITERATE:loop.iteration
  55. L589 `var ad = »d.adv[i]«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  56. L590 `$('#justroll-adv').json2html(»ad, ad.tpl ? ad.tpl : justroll.tpl['t' + ad.type«], { output: 'jquery' })`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:conditional-consequent
  57. L591 `if (»ad.type« === 0) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  58. L594 `.attr('id', 'jr-adv-' + String(»parseInt(ad.id)«))`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:parseInt
  59. L595 `.data('key', »ad.key«)`  · ASSIGN:identifier, ELEMENT:member-element
  60. L596 `.addClass('jr-adv jr-t' + »ad.type«)`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right
  61. L531 `.append($('<span>').attr('id', 'justroll-user-balance-target').text(»d.user.balance.toFixed(7)«))`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  62. L215 `else if (»d.user && 'balance' in d.user) justroll.panel_balance(d«)`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  63. L622 `if (»justroll.onpanel_balance && justroll.animation«) {`  · ASSIGN:logical-left
  64. L623 (→L629) `var ubal = new CountUp('justroll-user-balance-target', »d.user.balance.toFixed(7), {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ELEMENT:object.setProperty
  65. L17 `// captcha_check: »false,«`  · ASSIGN:identifier
  66. L123 _(in `content/countUp`)_ `this.endVal = this.validateValue(»endVal«);`  · ASSIGN:identifier
  67. L232 _(in `popup/purify`)_ `HTMLTemplateElement = »windo«w.HTMLTemplateElement,`  · ASSIGN:identifier
  68. L234 _(in `content/countUp`)_ `this.error = "[CountUp] invalid start or end value: " + »value«;`  · ASSIGN:identifier, ASSIGN:binary-right
  69. L630 `if (»!ubal.error«) {`  · ASSIGN:unary
  70. L633 `$('#justroll-user-balance-target').text(»d.user.balance.toFixed(7)«)`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  71. L217 `if (»d.error) justroll.error(d«)`  · ASSIGN:identifier, ELEMENT:member-element
  72. L279 `if (typeof d === 'string') »d = { error: d }«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  73. L281 `if (»d.error« === 'token_expired') {`  · ASSIGN:binary-left
  74. L286 `if (»d.error« === 'guest') justroll.guest()`  · ASSIGN:binary-left
  75. L288 `if (»d.error« === 'captcha') justroll.captcha(d)`  · ASSIGN:binary-left
  76. L290 `if (»d.error« === 'not_allowed') $('#justroll').remove()`  · ASSIGN:binary-left
  77. L292 `if (»d.error === 'break_onfocus' && justroll.onfocus«) {`  · ASSIGN:binary-left, ASSIGN:logical-left
  78. L219 `if (»d.init«) justroll.init()`  · ASSIGN:identifier, ELEMENT:member-element
  79. L989 `if (»data.event === 'infoDelivery' && 'muted' in data.info«) {`  · ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left
  80. L990 `justroll.vyData.muted = »data.info.muted«`  · ELEMENT:member-element
  81. L993 `if (»data.event« === 'onReady') {`  · ELEMENT:member-element, ASSIGN:binary-left
  82. L997 `if (»data.event« === 'onStateChange') {`  · ELEMENT:member-element, ASSIGN:binary-left
  83. L998 `if (»data.info« === -1)`  · ELEMENT:member-element, ASSIGN:binary-left
  84. L1001 `if (»data.info« === 3)`  · ELEMENT:member-element, ASSIGN:binary-left
  85. L1004 `if (»data.info« === 1) {`  · ELEMENT:member-element, ASSIGN:binary-left
  86. L1009 `if (»data.info« === 2) {`  · ELEMENT:member-element, ASSIGN:binary-left
  87. L1013 `if (»data.info« === 0) {`  · ELEMENT:member-element, ASSIGN:binary-left
  88. L869 `if (»!videoPlayer && location.host === 'vk.com' && justroll.vyData«) {`  · ASSIGN:logical-right
  89. L1062 `if (»justroll.infocus && (justroll.progress === 100 || !justroll.progress)«) justroll.init()`  · ASSIGN:binary-left, ASSIGN:unary, ASSIGN:logical-left, ASSIGN:logical-right
  90. L1066 `if (»justroll.infocus && justroll.progress < 100«) justroll.progressbar(1)`  · ASSIGN:binary-left, ASSIGN:logical-right

---
