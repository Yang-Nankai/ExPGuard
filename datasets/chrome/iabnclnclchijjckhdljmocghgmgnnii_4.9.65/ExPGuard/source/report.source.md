# Source-level Taint Flow — iabnclnclchijjckhdljmocghgmgnnii 4.9.65

- Source type: CRX
- Files with issues: 6 / 7
- Distinct taint flows: 2  (collapsed from 2 raw issue entries)
- Sinkless sources skipped: 19 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — STORAGE_ALL_ITEMS (storage.all.items[sync])

- **Source**: `STORAGE_ALL_ITEMS` — `background` L2775:C13 -> L2775:C22  `for (»const key« in sync) {`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (Extension-state) — `background` L2998:C6 -> L3014:C7 (spans to L3014)  `»chrome.storage.local.set(«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (10785 raw steps → 253 distinct lines):
   1. L2775 `for (»const key« in sync) {`  · ITERATE:loop.iteration
   2. L2776 `if (»!sync[key]«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary, ELEMENT:member-element-container, ELEMENT:implicit.add
   3. L2800 `»...sync«,`  · COPY:object-spread
   4. L2779 `const »metaKeysCount = sync[key].__meta_split_count«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container, ELEMENT:implicit.add
   5. L2780 `if (»!metaKeysCount«) {`  · ASSIGN:identifier, ASSIGN:unary
   6. L2784 `for (let i = 0; i < »metaKeysCount«; i++) {`  · ASSIGN:identifier, ASSIGN:binary-right
   7. L2785 `»string += sync[`${key}_${i.toString(36)}`]«`  · ASSIGN:template-literal, ELEMENT:member-element-container, ELEMENT:implicit.add, ASSIGN:identifier
   8. L2789 `sync[»key] = JSON.parse(string)«`  · RETURN:json.parse, ASSIGN:identifier
   9. L2798 (→L2801) `»        sync = {«`  · ELEMENT:object.setProperty
  10. L3484 `return »typeof x === 'object' && x != null && !Array.isArray(x)«`  · ASSIGN:binary-left, ASSIGN:logical-right, ASSIGN:logical-left
  11. L3553 `if (»!isPlainObject(settings)«) {`  · ASSIGN:unary
  12. L3570 `const »{ errors: themeErrors } = validateTheme(settings.theme)«`  · ELEMENT:member-element-container, ELEMENT:implicit.add, ELEMENT:destructure-property[errors]
  13. L3706 `if (»!isPlainObject(theme)«) {`  · ASSIGN:unary
  14. L3707 `»return { errors: ['Theme is not a plain object'], theme: DEFAULT_THEME }«`  · ELEMENT:object.setProperty
  15. L3770 `»return { errors, theme }«`  · ELEMENT:object.setProperty
  16. L3571 `errors.push(...»themeErrors«)`  · ASSIGN:identifier
  17. L3521 `const »errors = []«`  · ELEMENT:object.setProperty
  18. L3703 `»return { errors, settings }«`  · ELEMENT:object.setProperty
  19. L3840 `const »{ errors: syncCfgErrors } = validateSettings($sync)«`  · ELEMENT:implicit.add, ELEMENT:destructure-property[errors]
  20. L3841 `»syncCfgErrors.forEach((err) => logWarn(err))«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  21. L3807 `settings.theme = { »...DEFAULT_THEME, ...settings.theme« }`  · COPY:object-spread, ELEMENT:member-element-container
  22. L3808 `settings.time = { »...DEFAULT_SETTINGS.time, ...settings.time« }`  · ELEMENT:member-element-container, COPY:object-spread
  23. L3809 `»settings.presets.forEach«((preset) => {`  · ELEMENT:member-element-container
  24. L3810 `preset.theme = { »...DEFAULT_THEME«, ...preset.theme }`  · COPY:object-spread
  25. L3812 `»settings.customThemes.forEach«((site) => {`  · ELEMENT:member-element-container
  26. L3813 `site.theme = { »...DEFAULT_THEME«, ...site.theme }`  · COPY:object-spread
  27. L3820 `»this.loadBarrier = new PromiseBarrier()«`  · ELEMENT:object.setProperty
  28. L3804 `»this.settings = await this.loadSettingsFromStorage()«`  · ELEMENT:implicit.add
  29. L4863 `»this.user = new UserStorage()«`  · ELEMENT:object.setProperty
  30. L3822 `const »{ errors: localCfgErrors } = validateSettings(local)«`  · ELEMENT:implicit.add, ELEMENT:destructure-property[errors]
  31. L3823 `»localCfgErrors.forEach((err) => logWarn(err))«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  32. L4943 (→L4944) `»this.user.settings.enableContextMenus &&«`  · ELEMENT:member-element-container, ASSIGN:logical-left
  33. L4955 `if (»this.user.settings.syncSitesFixes«) {`  · ELEMENT:member-element-container
  34. L4888 `const { »automation, automationBehaviour: behavior« } = this.user.settings`  · ELEMENT:destructure-property[automation], ELEMENT:destructure-property[automationBehaviour]
  35. L4891 `switch (»automation«) {`  · ASSIGN:identifier
  36. L4893 `const { »time« } = this.user.settings`  · ELEMENT:destructure-property[time]
  37. L4894 `isAutoDark = isInTimeIntervalLocal(»time.activation, time.deactivation«)`  · ASSIGN:identifier, ELEMENT:member-element
  38. L172 `const a = parse24HTime(»time0«)`  · ASSIGN:identifier
  39. L128 `return »time.split(':').map((x) => parseInt(x))«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  40. L173 `const b = parse24HTime(»time1«)`  · ASSIGN:identifier
  41. L175 `if (compareTime(»a, b«) > 0) {`  · ASSIGN:identifier
  42. L131 `if (»time1[0] === time2[0] && time1[1] === time2[1]«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:binary-right, ASSIGN:logical-left, ASSIGN:logical-right
  43. L134 `if (»time1[0] < time2[0] || (time1[0] === time2[0] && time1[1] < time2[1])«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:binary-right, ASSIGN:logical-left, ASSIGN:logical-right
  44. L176 `return compareTime(»a, t) <= 0 || compareTime(t, b«) < 0`  · ASSIGN:identifier
  45. L178 `return compareTime(»a, t) <= 0 && compareTime(t, b«) < 0`  · ASSIGN:identifier
  46. L4895 `»nextCheck = nextTimeInterval(time.activation, time.deactivation)«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:implicit.add
  47. L140 `const a = parse24HTime(»time0«)`  · ASSIGN:identifier
  48. L141 `const b = parse24HTime(»time1«)`  · ASSIGN:identifier
  49. L143 `if (compareTime(»a, b«) > 0) {`  · ASSIGN:identifier
  50. L144 `return nextTimeInterval(»time1, time0«, date)`  · ASSIGN:identifier
  51. L146 `if (compareTime(»a, b«) === 0) {`  · ASSIGN:identifier
  52. L149 `if (compareTime(t, »a«) < 0) {`  · ASSIGN:identifier
  53. L150 `date.setHours(»a[0]«)`  · ASSIGN:identifier, ELEMENT:member-element
  54. L156 `if (compareTime(t, »b«) < 0) {`  · ASSIGN:identifier
  55. L151 `date.setMinutes(»a[1]«)`  · ASSIGN:identifier, ELEMENT:member-element
  56. L157 `date.setHours(»b[0]«)`  · ASSIGN:identifier, ELEMENT:member-element
  57. L167 `»a[0]«,`  · ASSIGN:identifier, ELEMENT:member-element
  58. L168 `»a[1]«`  · ASSIGN:identifier, ELEMENT:member-element
  59. L163 (→L169) `»    return new Date(«`  · RETURN:Date.constructor, ELEMENT:member-element, RETURN:fallback-return
  60. L158 `date.setMinutes(»b[1]«)`  · ASSIGN:identifier, ELEMENT:member-element
  61. L4912 `const { »latitude, longitude } = this.user.settings.location«`  · ELEMENT:member-element-container, ELEMENT:destructure-property[latitude], ELEMENT:destructure-property[longitude]
  62. L4913 `if (»latitude != null && longitude != null«) {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  63. L4921 `if (»automation«) {`  · ASSIGN:identifier
  64. L4914 `isAutoDark = isNightAtLocation(»latitude, longitude«)`  · ASSIGN:identifier
  65. L283 `const time = getSunsetSunriseUTCTime(»latitude, longitude«, date)`  · ASSIGN:identifier
  66. L212 `const lnHour = »longitude« / 15`  · ASSIGN:identifier, ASSIGN:binary-left
  67. L214 `const t = dayOfYear + »((isSunrise ? 6 : 18) - lnHour) / 24«`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:binary-left
  68. L215 `const M = »0.9856 * t« - 3.289`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:binary-left
  69. L217 `»M + 1.916 * Math.sin(M * D2R) + 0.02 * Math.sin(2 * M * D2R)« + 282.634`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right
  70. L218 `if (»L« > 360) {`  · ASSIGN:identifier, ASSIGN:binary-left
  71. L236 `(Math.cos(zenith * D2R) - sinDec * Math.sin(»latitude« * D2R)) /`  · ASSIGN:identifier, ASSIGN:binary-left
  72. L237 `(cosDec * Math.cos(»latitude« * D2R))`  · ASSIGN:identifier, ASSIGN:binary-left
  73. L253 `const T = »H + RA - 0.06571 * t« - 6.622`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:binary-left
  74. L254 `let UT = »T - lnHour«`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right
  75. L255 `if (»UT« > 24) {`  · ASSIGN:identifier, ASSIGN:binary-left
  76. L4922 `if (»behavior« === 'OnOff') {`  · ASSIGN:identifier, ASSIGN:binary-left
  77. L4915 `nextCheck = nextTimeChangeAtLocation(»latitude, longitude«)`  · ASSIGN:identifier
  78. L299 `const time = getSunsetSunriseUTCTime(»latitude, longitude«, date)`  · ASSIGN:identifier
  79. L4924 `} else if (»behavior« === 'Scheme') {`  · ASSIGN:identifier, ASSIGN:binary-left
  80. L4884 `(»this.autoState === '' && this.user.settings.enabled«)`  · ELEMENT:member-element-container, ASSIGN:logical-right
  81. L4881 (→L4884) `»        this.autoState === 'turn-on' ||«`  · ASSIGN:logical-right
  82. L5226 `if (»this.user.settings.changeBrowserTheme«) {`  · ELEMENT:member-element-container
  83. L5227 `»setWindowTheme(this.user.settings.theme)«`  · ELEMENT:implicit.add, ELEMENT:member-element-container
  84. L4965 `runOnProtectedPages: »this.user.settings.enableForProtectedPages«,`  · ELEMENT:member-element-container
  85. L4964 (→L4966) `»        this.tabs.updateContentScript({«`  · ELEMENT:object.setProperty
  86. L4968 `»this.user.settings.fetchNews« && this.news.subscribe()`  · ELEMENT:member-element-container
  87. L3094 `...(sync ? »sync.readNews« : []),`  · ELEMENT:member-element-container
  88. L3104 `...(sync ? »sync.displayedNews« : []),`  · ELEMENT:member-element-container
  89. L4698 `if (»this.user.settings.automation« !== 'system') {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  90. L4710 `this.wasEnabledOnLastCheck !== »isSwitchedOn« ||`  · ASSIGN:identifier, ASSIGN:binary-right
  91. L4709 (→L4712) `»          this.wasEnabledOnLastCheck === null ||«`  · ASSIGN:logical-right, ASSIGN:logical-left
  92. L4714 `this.wasEnabledOnLastCheck = »isSwitchedOn«`  · ASSIGN:identifier
  93. L5286 `const »extension = new Extension()«`  · ELEMENT:object.setProperty
  94. L5052 `if (»!this.user.settings«) {`  · ASSIGN:unary
  95. L5056 (→L5079) `»      return {«`  · ELEMENT:object.setProperty
  96. L5089 `if (»this.user.settings.detectDarkTheme«) {`  · ELEMENT:member-element-container
  97. L2974 `»state[key] = this.parent[key] || this.defaults[key]«`  · ELEMENT:implicit.add, ELEMENT:member-element-container, ASSIGN:logical-left
  98. L2972 `const »state = {}«`  · ELEMENT:object.setProperty
  99. L2998 (→L3014) `»      chrome.storage.local.set(«`  · ELEMENT:object.setProperty
  100. L3375 `(tab) => »options.runOnProtectedPages || canInjectScript(tab.url)«`  · ASSIGN:logical-left
  101. L3564 `const »{ errors: themeErrors } = validateTheme(theme)«`  · ELEMENT:implicit.add, ELEMENT:destructure-property[errors]
  102. L3565 `return »themeErrors.length« === 0`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-left
  103. L4560 `const »modified = modify(rgb, filter)«`  · ASSIGN:identifier, ELEMENT:implicit.add
  104. L4417 `if (»theme.mode« === 0) {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  105. L4276 `const isDarkScheme = »theme.mode« === 1`  · ELEMENT:member-element-container, ASSIGN:binary-left
  106. L4280 `return »theme[prop]«`  · ELEMENT:member-element-container
  107. L4421 `»return modifyColorWithCache(rgb, { ...theme, mode: 0 }, modifyBgHSL, pole)«`  · ELEMENT:object.setProperty, COPY:object-spread, ASSIGN:identifier, ELEMENT:implicit.add
  108. L4316 `»resultId += `${theme[key]};`«`  · ELEMENT:implicit.add, ELEMENT:member-element-container, ASSIGN:template-literal
  109. L4318 `return »resultId«`  · ASSIGN:identifier
  110. L4335 `if (fnCache.has(»id«)) {`  · ASSIGN:identifier
  111. L4336 `return fnCache.get(»id«)`  · ASSIGN:identifier
  112. L4339 `const »pole = poleColor == null ? null : parseToHSLWithCache(poleColor)«`  · ASSIGN:identifier, ELEMENT:implicit.add, ASSIGN:conditional-alternate
  113. L4290 `if (colorParseCache.has(»color«)) {`  · ASSIGN:identifier
  114. L4291 `return colorParseCache.get(»color«)`  · ASSIGN:identifier
  115. L4293 `const »rgb = parse(color)«`  · ASSIGN:identifier, ELEMENT:implicit.add
  116. L3973 `const c = »$color.trim().toLowerCase()«`  · ASSIGN:identifier, ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  117. L3974 `if (»c.match(rgbMatch)«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  118. L3975 `return parseRGB(»c«)`  · ASSIGN:identifier
  119. L4042 `const [r, g, b, »a = 1] = getNumbersFromString($rgb«, rgbRange, rgbUnits)`  · ASSIGN:identifier, ELEMENT:destructure-element[3]
  120. L4018 `const raw = getNumbers(»str«)`  · ASSIGN:identifier
  121. L3998 `const startIndex = »$color.indexOf('(')«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  122. L3999 `$color = »$color.substring(startIndex + 1, $color.length - 1)«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ELEMENT:member.length, RETURN:fallback-return
  123. L4000 `for (let i = 0; i < »$color.length«; i++) {`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right
  124. L4001 `const c = »$color[i]«`  · ASSIGN:identifier, ELEMENT:member-element
  125. L4002 `if (»(c >= '0' && c <= '9') || c === '.' || c === '+' || c === '-'«) {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  126. L4004 `} else if (»isMining && (c === ' ' || c === ',')«) {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  127. L4005 `numbers.push(»$color.substring(prevPos, i)«)`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  128. L3995 `const »numbers = []«`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  129. L4043 `»return { r, g, b, a }«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  130. L3977 `if (»c.match(hslMatch)«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  131. L3978 `return parseHSL(»c«)`  · ASSIGN:identifier
  132. L4048 `const [h, s, l, »a = 1] = getNumbersFromString($hsl«, hslRange, hslUnits)`  · ASSIGN:identifier, ELEMENT:destructure-element[3]
  133. L4049 `»return hslToRGB({ h, s, l, a })«`  · ASSIGN:identifier, ELEMENT:object.setProperty, ELEMENT:implicit.add
  134. L3890 `if (»s« === 0) {`  · ASSIGN:identifier, ASSIGN:binary-left
  135. L3891 `const »[r, b, g] = [l, l, l].map((x) => Math.round(x * 255))«`  · ASSIGN:identifier, ELEMENT:object.setProperty, ELEMENT:implicit.add
  136. L3894 `const c = (»1 - Math.abs(2 * l - 1)) * s«`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:binary-left, RETURN:Math.abs
  137. L3892 `»return { r, g, b, a }«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  138. L3895 `const x = »c * (1 - Math.abs(((h / 60) % 2) - 1)«)`  · ASSIGN:identifier, ASSIGN:binary-left, RETURN:Math.abs, ASSIGN:binary-right
  139. L3896 `const m = »l - c / 2«`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right
  140. L3899 `? [»c, x«, 0]`  · ASSIGN:identifier
  141. L3897 (→L3909) `»    const [r, g, b] = («`  · ELEMENT:object.setProperty, ELEMENT:implicit.add, ELEMENT:member-element-container
  142. L3901 `? [»x, c«, 0]`  · ASSIGN:identifier
  143. L3903 `? [0, »c, x«]`  · ASSIGN:identifier
  144. L3905 `? [0, »x, c«]`  · ASSIGN:identifier
  145. L3907 `? [»x, 0, c«]`  · ASSIGN:identifier
  146. L3908 `: »[c, 0, x]«`  · ASSIGN:identifier, ASSIGN:conditional-alternate
  147. L3906 (→L3908) `»        : h < 300«`  · ASSIGN:conditional-alternate
  148. L3904 (→L3908) `»        : h < 240«`  · ASSIGN:conditional-alternate
  149. L3902 (→L3908) `»        : h < 180«`  · ASSIGN:conditional-alternate
  150. L3900 (→L3908) `»        : h < 120«`  · ASSIGN:conditional-alternate
  151. L3910 `»return { r, g, b, a }«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  152. L3980 `if (»c.match(hexMatch)«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  153. L3981 `»return parseHex(c)«`  · ASSIGN:identifier, ELEMENT:implicit.add
  154. L4052 `const h = »$hex.substring(1)«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  155. L4053 `switch (»h.length«) {`  · ASSIGN:identifier, ELEMENT:member.length
  156. L4057 `const a = h.length === 3 ? 1 : »parseInt(`${h[3]}${h[3]}`, 16) / 255«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal, RETURN:parseInt, ASSIGN:binary-left, ASSIGN:conditional-alternate
  157. L4058 `»return { r, g, b, a }«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  158. L4065 `const a = h.length === 6 ? 1 : »parseInt(h.substring(6, 8), 16) / 255«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, RETURN:parseInt, ASSIGN:binary-left, ASSIGN:conditional-alternate
  159. L4066 `»return { r, g, b, a }«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  160. L3983 `if (knownColors.has(»c«)) {`  · ASSIGN:identifier
  161. L3984 `return getColorByName(»c«)`  · ASSIGN:identifier
  162. L4072 `const n = knownColors.get(»$color«)`  · ASSIGN:identifier
  163. L3986 `if (systemColors.has(»c«)) {`  · ASSIGN:identifier
  164. L3987 `return getSystemColor(»c«)`  · ASSIGN:identifier
  165. L4081 `const n = systemColors.get(»$color«)`  · ASSIGN:identifier
  166. L3989 `if (»$color« === 'transparent') {`  · ASSIGN:identifier, ASSIGN:binary-left
  167. L3912 `function rgbToHSL({ »r: r255, g: g255, b: b255, a = 1« }) {`  · ELEMENT:destructure-property[r], ELEMENT:destructure-property[g], ELEMENT:destructure-property[b], ELEMENT:destructure-property[a]
  168. L3913 `const r = »r255« / 255`  · ASSIGN:identifier, ASSIGN:binary-left
  169. L3914 `const g = »g255« / 255`  · ASSIGN:identifier, ASSIGN:binary-left
  170. L3915 `const b = »b255« / 255`  · ASSIGN:identifier, ASSIGN:binary-left
  171. L3916 `const max = »Math.max(r, g, b)«`  · ASSIGN:identifier, RETURN:Math.max
  172. L3917 `const min = »Math.min(r, g, b)«`  · ASSIGN:identifier, RETURN:Math.min
  173. L3918 `const c = »max - min«`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right
  174. L3919 `const l = (»max + min«) / 2`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right
  175. L3920 `if (»c« === 0) {`  · ASSIGN:identifier, ASSIGN:binary-left
  176. L3921 `»return { h: 0, s: 0, l, a }«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  177. L3925 `? »((g - b) / c) % 6«`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right, ASSIGN:conditional-consequent
  178. L3927 `? »(b - r) / c + 2«`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right, ASSIGN:conditional-consequent
  179. L3928 `: »(r - g) / c« + 4) * 60`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right
  180. L3924 (→L3928) `»      (max === r«`  · ASSIGN:binary-left
  181. L3929 `if (»h« < 0) {`  · ASSIGN:identifier, ASSIGN:binary-left
  182. L3932 `const s = »c / (1 - Math.abs(2 * l - 1)«)`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:binary-left, RETURN:Math.abs
  183. L3933 `»return { h, s, l, a }«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  184. L4294 `const »hsl = rgbToHSL(rgb)«`  · ELEMENT:implicit.add
  185. L4295 `colorParseCache.set(»color«, hsl)`  · ASSIGN:identifier
  186. L4288 `const »colorParseCache = new Map()«`  · ELEMENT:object.setProperty
  187. L4342 `const »modified = modifyHSL(hsl, pole, anotherPole)«`  · ASSIGN:identifier, ELEMENT:implicit.add
  188. L4395 `let lx = scale(l, 0.5, 1, MAX_BG_LIGHTNESS, »pole.l«)`  · ASSIGN:identifier, ELEMENT:member-element
  189. L1284 `return »((x - inLow) * (outHigh - outLow)) / (inHigh - inLow) + outLow«`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right
  190. L4389 `const hx = »pole.h«`  · ASSIGN:identifier, ELEMENT:member-element
  191. L4397 `const hx = »pole.h«`  · ASSIGN:identifier, ELEMENT:member-element
  192. L4390 `const sx = »pole.s«`  · ASSIGN:identifier, ELEMENT:member-element
  193. L4398 `const sx = »pole.s«`  · ASSIGN:identifier, ELEMENT:member-element
  194. L4391 `»return { h: hx, s: sx, l: lx, a }«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  195. L4399 `»return { h: hx, s: sx, l: lx, a }«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  196. L3889 `function hslToRGB({ »h, s, l, a = 1« }) {`  · ELEMENT:destructure-property[h], ELEMENT:destructure-property[s], ELEMENT:destructure-property[l], ELEMENT:destructure-property[a]
  197. L4343 `const »{ r, g, b, a } = hslToRGB(modified)«`  · ELEMENT:implicit.add, ELEMENT:destructure-property[r], ELEMENT:destructure-property[g], ELEMENT:destructure-property[b], ELEMENT:destructure-property[a]
  198. L1306 `if (»config.sepia« !== 0) {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  199. L1309 `if (»config.grayscale« !== 0) {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  200. L1312 `if (»config.contrast« !== 100) {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  201. L1315 `if (»config.brightness« !== 100) {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  202. L1318 `if (»config.mode« === 1) {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  203. L4345 `const »[rf, gf, bf] = applyColorMatrix([r, g, b], matrix)«`  · ASSIGN:identifier, ELEMENT:object.setProperty, ELEMENT:implicit.add
  204. L1324 `const »rgb = [[r / 255], [g / 255], [b / 255], [1], [1]]«`  · ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:object.setProperty, ELEMENT:implicit.add
  205. L1293 `for (let j = 0, len2 = »m2[0].length; j < len2«; j++) {`  · ELEMENT:member-element-container, ELEMENT:member.length, ASSIGN:identifier, ASSIGN:binary-right
  206. L1296 `sum += m1[i][k] * »m2[k][j]«`  · ELEMENT:member-element-container, ASSIGN:binary-right
  207. L1298 `result[i][j] = »sum«`  · ASSIGN:identifier
  208. L1292 `»result[i] = []«`  · ELEMENT:object.setProperty
  209. L4349 `: rgbToString({ r: rf, g: gf, b: bf, »a« })`  · ASSIGN:identifier
  210. L4346 (→L4349) `»    const color =«`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  211. L3954 `if (»a != null && a < 1«) {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  212. L3956 `»a«,`  · ASSIGN:identifier
  213. L3936 `const fixed = »n.toFixed(digits)«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  214. L3940 `const dot = »fixed.indexOf('.')«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  215. L3941 `if (»dot« >= 0) {`  · ASSIGN:identifier, ASSIGN:binary-left
  216. L3942 `const zerosMatch = »fixed.match(/0+$/)«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  217. L3950 `return »fixed«`  · ASSIGN:identifier
  218. L3943 `if (»zerosMatch«) {`  · ASSIGN:identifier
  219. L3944 `if (»zerosMatch.index === dot + 1«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:binary-right
  220. L3945 `return »fixed.substring(0, dot)«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  221. L3955 (→L3958) `»      return `rgba(${toFixed(r)}, ${toFixed(g)}, ${toFixed(b)}, ${toFixed(«`  · ELEMENT:implicit.add, ASSIGN:template-literal
  222. L3947 `return »fixed.substring(0, zerosMatch.index)«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  223. L4350 `fnCache.set(»id, color«)`  · ASSIGN:identifier
  224. L4351 `return »color«`  · ASSIGN:identifier
  225. L4461 `if (»theme.mode« === 0) {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  226. L4283 `const isDarkScheme = »theme.mode« === 1`  · ELEMENT:member-element-container, ASSIGN:binary-left
  227. L4285 `return »theme[prop]«`  · ELEMENT:member-element-container
  228. L4465 `»return modifyColorWithCache(rgb, { ...theme, mode: 0 }, modifyFgHSL, pole)«`  · ELEMENT:object.setProperty, COPY:object-spread, ASSIGN:identifier, ELEMENT:implicit.add
  229. L4432 `const lx = scale(l, 0.5, 1, MIN_FG_LIGHTNESS, »pole.l«)`  · ASSIGN:identifier, ELEMENT:member-element
  230. L4445 `const hx = »pole.h«`  · ASSIGN:identifier, ELEMENT:member-element
  231. L4434 `const hx = »pole.h«`  · ASSIGN:identifier, ELEMENT:member-element
  232. L4446 `const sx = »pole.s«`  · ASSIGN:identifier, ELEMENT:member-element
  233. L4435 `const sx = »pole.s«`  · ASSIGN:identifier, ELEMENT:member-element
  234. L4447 `const lx = scale(l, 0, 0.5, »pole.l«, MIN_FG_LIGHTNESS)`  · ASSIGN:identifier, ELEMENT:member-element
  235. L4436 `»return { h: hx, s: sx, l: lx, a }«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  236. L4448 `»return { h: hx, s: sx, l: lx, a }«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  237. L4456 `lx = scale(l, 0, 0.5, »pole.l«, MIN_FG_LIGHTNESS)`  · ASSIGN:identifier, ELEMENT:member-element
  238. L4442 `»return { h: hx, s, l: lx, a }«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  239. L4454 `lx = scale(l, 0, 0.5, »pole.l«, Math.min(1, MIN_FG_LIGHTNESS + 0.05))`  · ASSIGN:identifier, ELEMENT:member-element
  240. L4458 `»return { h: hx, s, l: lx, a }«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  241. L4485 `if (»theme.mode« === 0) {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  242. L4490 (→L4496) `»    return modifyColorWithCache(«`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  243. L4492 `{ »...theme«, mode: 0 },`  · COPY:object-spread
  244. L4494 `»poleFg«,`  · ASSIGN:identifier
  245. L4495 `»poleBg«`  · ASSIGN:identifier
  246. L4341 `anotherPoleColor == null ? null : »parseToHSLWithCache(anotherPoleColor)«`  · ASSIGN:identifier, ASSIGN:conditional-alternate
  247. L4340 (→L4341) `»    const anotherPole =«`  · ELEMENT:implicit.add
  248. L4474 `hx = »poleFg.h«`  · ASSIGN:identifier, ELEMENT:member-element
  249. L4477 `hx = »poleBg.h«`  · ASSIGN:identifier, ELEMENT:member-element
  250. L4482 `»return { h: hx, s: sx, l: lx, a }«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  251. L4475 `sx = »poleFg.s«`  · ASSIGN:identifier, ELEMENT:member-element
  252. L4478 `sx = »poleBg.s«`  · ASSIGN:identifier, ELEMENT:member-element
  253. L1555 `»return selectors.map((s) => s.replace(/\,$/, '')).join(',\n')«`  · ELEMENT:implicit.add

---

## Flow #2 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L5404:C10 -> L5404:C17  `if (»message«.source === 'supabase-auth-adapter') {`
- **Sink(s)**:
  - `CHROME_RUNTIME_ONCONNECTEXTERNAL_POSTMESSAGE` (chrome.runtime.onConnectExternal.addListener[postMessage]) — `background` L5378:C8 -> L5378:C38  `»port.postMessage(notification)«;`
  - `CHROME_SYNC_STORAGE` (unknown) — `background` L5430:C14 -> L5445:C16 (spans to L5445)  `»chrome.storage.sync.set({ [key]: value }, () => {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (55 raw steps → 18 distinct lines):
   1. L5404 `if (»message.source« === 'supabase-auth-adapter') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   2. L5405 `switch (»message.action«) {`  · ASSIGN:identifier, ELEMENT:member-element
   3. L5481 `} else if (»message.type« === 'broadcast') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   4. L5482 `notifyConnectedClients(»message.data || message«);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
   5. L5378 `port.postMessage(»notification«);`  · ASSIGN:identifier
   6. L5411 `const { »key } = message.data«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:destructure-property[key]
   7. L5412 `chrome.storage.sync.get(»key«, result => {`  · ASSIGN:identifier
   8. L5418 `sendResponse({ status: 'success', value: result[»key«] || null });`  · ASSIGN:identifier
   9. L5429 `const { »key, value } = message.data«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:destructure-property[key], ELEMENT:destructure-property[value]
  10. L5430 (→L5445) `chrome.storage.sync.set({ [»key]: value }, () => {«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  11. L5440 `»key«,`  · ASSIGN:identifier
  12. L5437 (→L5443) `»                  notifyConnectedClients({«`  · ELEMENT:object.setProperty
  13. L5441 `»value«,`  · ASSIGN:identifier
  14. L5454 `const { »key } = message.data«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:destructure-property[key]
  15. L5455 `chrome.storage.sync.remove(»key«, () => {`  · ASSIGN:identifier
  16. L5477 `console.warn('Unknown action:', »message.action«);`  · ASSIGN:identifier, ELEMENT:member-element
  17. L5464 `»key«,`  · ASSIGN:identifier
  18. L5461 (→L5466) `»                  notifyConnectedClients({«`  · ELEMENT:object.setProperty

---
