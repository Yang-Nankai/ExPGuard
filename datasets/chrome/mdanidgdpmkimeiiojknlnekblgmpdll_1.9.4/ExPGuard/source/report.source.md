# Source-level Taint Flow — mdanidgdpmkimeiiojknlnekblgmpdll 1.9.4

- Source type: CRX
- Files with issues: 2 / 4
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 3 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `background` L182:C0 -> L240:C2 (spans to L240)  `»chrome.runtime.onMessage.addListener(«`
- **Sink(s)**:
  - `FETCH_BODY` (https://www.google-analytics.com/mp/collect?measurement_id=G-48B3G8LRPQ&api_secret=uIAXRk5NR3m2Mef57TbpxQ) — `background` L210:C8 -> L216:C12 (spans to L216)  `»fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurement_id}&api_secret=${api_secret}`, {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (465 raw steps → 61 distinct lines):
   1. L182 (→L240) `»chrome.runtime.onMessage.addListener(«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[b4g->background]`
   2. L195 `var event_name = »data[0].replaceAll("-", "_").replaceAll(" ", "_")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   3. L196 `var »event = { name: event_name }«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
   4. L197 `if (»data[1]« != null) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   5. L198 `var action = »data[1].replaceAll("-", "_").replaceAll(" ", "_")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   6. L199 `var »params = { action: action }«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
   7. L200 `if (»data[2]« != null) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   8. L201 `var label = »data[2].replaceAll("-", "_").replaceAll(" ", "_")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   9. L202 `params.label = »label«;`  · ASSIGN:identifier
  10. L221 `var »emailMeterCalculations = BoomerangEmailMeterWorkerObject.calculate_email_readability_metrics([request.composeBodyText, request.subject])«;`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  11. L148 `var messageBodyPlainText = »messageData[0]«;`  · ELEMENT:member-element-container
  12. L149 `var subject = »messageData[1]«;`  · ELEMENT:member-element-container
  13. L151 `messageBodyPlainText = »messageBodyPlainText.substring(0, MAX_TEXT_LENGTH)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  14. L152 `messageBodyPlainText = remove_quoted_text(»messageBodyPlainText«);`  · ASSIGN:identifier
  15. L121 `var startOfQuotedText = »messageBodyPlainText.search(/^On.*wrote:$/gm)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  16. L122 `if (»startOfQuotedText« > 0) {`  · ASSIGN:identifier, ASSIGN:binary-left
  17. L123 `messageBodyPlainText = »messageBodyPlainText.slice(0, startOfQuotedText - 1)«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, RETURN:fallback-return
  18. L125 `return »messageBodyPlainText«;`  · ASSIGN:identifier
  19. L153 `messageBodyPlainText = remove_urls(»messageBodyPlainText«)`  · ASSIGN:identifier
  20. L130 `messageBodyPlainText = »messageBodyPlainText.replace(/\b((?:[a-z][\w\-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?\u00AB\u00BB\u201C\u201D\u2018\u2019]))/gm, "")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  21. L131 `return »messageBodyPlainText«;`  · ASSIGN:identifier
  22. L154 `var wordCount = word_count(»messageBodyPlainText«);`  · ASSIGN:identifier
  23. L10 `var cleanText = clean_line(»text«);`  · ASSIGN:identifier
  24. L24 `for (var i = 0; i < »line.length«; i++) {`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right
  25. L25 `var c = »line[i]«;`  · ASSIGN:identifier, ELEMENT:member-element
  26. L27 `if(»c.toLowerCase() != c.toUpperCase() || c == "'"«)`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left, ASSIGN:binary-right, ASSIGN:logical-left, ASSIGN:logical-right
  27. L29 `cleanedLine += »c«;`  · ASSIGN:identifier
  28. L155 `var »sentenceCount = sentence_count(messageBodyPlainText)«;`  · ASSIGN:identifier, ELEMENT:implicit.add
  29. L43 `var matches = »text.match(SENTENCE_REGEX)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  30. L44 `if (»matches«) {`  · ASSIGN:identifier
  31. L45 `return »matches.length«;`  · ASSIGN:identifier, ELEMENT:member.length
  32. L156 `var syllableCount = syllable_count(»messageBodyPlainText«);`  · ASSIGN:identifier
  33. L57 `word = »word.toLowerCase()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  34. L58 `word = »word.replace(/'/g, " ")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  35. L60 `if (»word« === "i")`  · ASSIGN:identifier, ASSIGN:binary-left
  36. L62 `if (»word« === "a")`  · ASSIGN:identifier, ASSIGN:binary-left
  37. L65 `if (»word[word.length - 1]« === "e") {`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-left, ELEMENT:member-element-container
  38. L66 `word = »word.substring(0, word.length - 1)«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member.length, ASSIGN:binary-left, RETURN:fallback-return
  39. L69 `var phonems = »word.split(/[^aeiouy]+/)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  40. L74 `if (syllabe.test(»word«)) {`  · ASSIGN:identifier
  41. L84 `if (»word.length« == 1) {`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-left
  42. L80 `if (syllabe.test(»word«)) {`  · ASSIGN:identifier
  43. L88 `for (var i = 0; i < »phonems.length«; i++) {`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right
  44. L89 `if (»phonems[i].length« > 0)`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member.length, ASSIGN:binary-left
  45. L157 `var »gradeLevel = flesch_kincaid_grade_level(wordCount, sentenceCount, syllableCount)«;`  · ASSIGN:identifier, ELEMENT:implicit.add
  46. L100 `var grade = »0.39 * wordCount / sentenceCount + 11.8 * syllableCount / wordCount« - 15.59;`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:binary-left
  47. L101 `if (»grade« == Infinity) {`  · ASSIGN:identifier, ASSIGN:binary-left
  48. L105 `return »grade«;`  · ASSIGN:identifier
  49. L158 `var »questionCount = question_count(messageBodyPlainText)«;`  · ASSIGN:identifier, ELEMENT:implicit.add
  50. L110 `var matches = »text.match(QUESTION_REGEX)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  51. L111 `if (»matches«) {`  · ASSIGN:identifier
  52. L112 `return »matches.length«;`  · ASSIGN:identifier, ELEMENT:member.length
  53. L161 `"fleschKincaidGradeLevel" : »gradeLevel«,`  · ASSIGN:identifier
  54. L159 (→L166) `»        var values = {«`  · ELEMENT:object.setProperty
  55. L162 `"sentenceCount" : »sentenceCount«,`  · ASSIGN:identifier
  56. L164 `"questionCount" : »questionCount«,`  · ASSIGN:identifier
  57. L165 `"subjectWordCount" : »(subject.match(/\S+/g) || []).length«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left, ELEMENT:member.length
  58. L136 `if(»isNaN(values.fleschKincaidGradeLevel)«) {`  · RETURN:isNaN
  59. L222 `»chrome.tabs.sendMessage(sender.tab.id, {greeting: "respondable_output", metrics: emailMeterCalculations})«;`  · ELEMENT:object.setProperty
  60. L210 (→L216) `»        fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurement_id}&api_secret=${api_secret}`, {«`  · ELEMENT:object.setProperty
  61. L212 (→L215) `»            body: JSON.stringify({«`  · RETURN:json.stringify

---
