# Source-level Taint Flow — plafcfhgmgngohafpaalbpbjifnoaiji 2.9.2

- Source type: CRX
- Files with issues: 18 / 34
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 21 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background/background` L1223:C14 -> L1223:C21  `console.log(»request«);`
- **Sink(s)**:
  - `CHROME_TABS_CREATE_OPTIONS` — `background/background` L480:C2 -> L483:C4 (spans to L483)  `»chrome.tabs.create({ url: request.url }, function (tab) {«`
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `background/background` L646:C3 -> L646:C25  `»sendResponse(response)«;`
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `background/background` L1106:C6 -> L1106:C30  `»sendResponse(encDSCInfo)«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (610 raw steps → 83 distinct lines):
   1. L1223 `console.log(»request«);`  · ASSIGN:identifier
   2. L1233 `rv = commonListener(sender, »request«, sendResponse, tabInfo);`  · ASSIGN:identifier
   3. L471 `if(»request.type« == G2C_MSG.SET_INFO)`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   4. L474 `XSG2C.setInfo(BGUTILS.getServiceName(sender.url), tabInfo, »request.handle, request.action, request.message«);`  · ASSIGN:identifier, ELEMENT:member-element
   5. L478 `else if(»request.type« == G2C_MSG.TABS)`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   6. L480 (→L483) `chrome.tabs.create({ url: »request.url }, function (tab) {«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
   7. L1239 `emsListener(service, tabInfo, »request«, sender, sendResponse);`  · ASSIGN:identifier
   8. L578 `if(»request.xsSignerInfo == undefined || (request.xsSignerInfo != undefined && request.xsSignerInfo.handle == undefined)«)`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   9. L585 `XSG2C.emsInit(service, »request«, function(pan){`  · ASSIGN:identifier
  10. L623 `emsSign(service, tabInfo, »request.tbs, xsSignerInfo, request.params«, sendResponse);`  · ASSIGN:identifier, ELEMENT:member-element
  11. L490 `XSG2C.getSignature(service, tabInfo, SIGNATURE_TYPE.PKCS7, »tbs, xsSignerInfo, params«, function(xsSignerInfo, xsSignatureInfo){`  · ASSIGN:identifier
  12. L1243 `embListener(service, tabInfo, »request«, sender, sendResponse);`  · ASSIGN:identifier
  13. L507 `payload = »JSON.parse(request.payload)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:json.parse
  14. L516 `if(»request.url.indexOf("ListToken")« > -1)`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left
  15. L548 `else if(»request.url.indexOf("ListCertificate")« > -1)`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left
  16. L552 `else if(»request.url.indexOf("PKCSSign")« > -1)`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left
  17. L554 `XSG2C.getSignature(service, tabInfo,  SIGNATURE_TYPE.PKCS7, payload, undefined, »request.params«, function(xsSignerInfo, xsSignatureInfo){`  · ASSIGN:identifier, ELEMENT:member-element
  18. L569 `console.log("Unsupported URL: "+»request.url«);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right
  19. L1247 `epfListener(service, tabInfo, »request«, sender, sendResponse);`  · ASSIGN:identifier
  20. L632 `if(»request.otlType« == G2C_MSG.REG_DSC)`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  21. L638 `else if(»request.otlType« == G2C_MSG.GET_SIGNATORIES)`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  22. L636 `tbs = »request.xsSignerInfo.handle«;`  · ASSIGN:identifier, ELEMENT:member-element
  23. L640 `XSG2C.loadSignersInfo(service, tabInfo, »request.selectedSignerIndex«, function(signatories){`  · ASSIGN:identifier, ELEMENT:member-element
  24. L653 `else if(»request.otltype« == G2C_MSG.GET_SIGNER)`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  25. L671 `XSG2C.getSignature(service, tabInfo, signatureType, »tbs, request.xsSignerInfo, request.params«, function(xsSignerInfo, xsSignatureInfo){`  · ASSIGN:identifier, ELEMENT:member-element
  26. L655 `XSG2C.getSignerInfo(service, tabInfo, undefined, undefined, »request.params«, function(xsSignerInfo){`  · ASSIGN:identifier, ELEMENT:member-element
  27. L665 `else if(»request.otlType« == G2C_MSG.GET_SIGNATURE)`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  28. L667 `tbs = »request.tbs«;`  · ASSIGN:identifier, ELEMENT:member-element
  29. L1251 `icegateListener(service, tabInfo, »request«, sender, sendResponse);`  · ASSIGN:identifier
  30. L815 `if(»request.otltype« == G2C_MSG.REG_DSC)`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  31. L818 `XSG2C.getSignature(service, tabInfo, SIGNATURE_TYPE.REGISTERDSC, »request.tbs, request.xsSignerInfo, request.params«, function(xsSignerInfo, xsSignatureInfo){`  · ASSIGN:identifier, ELEMENT:member-element
  32. L826 `else if(»request.otltype« == G2C_MSG.GET_SIGNER)`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  33. L828 `XSG2C.getSignerInfo(service, tabInfo, undefined, undefined, »request.params«, function(xsSignerInfo){`  · ASSIGN:identifier, ELEMENT:member-element
  34. L837 `else if(»request.otltype« == G2C_MSG.GET_SIGNATURE)`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  35. L839 `XSG2C.getSignature(service, tabInfo, SIGNATURE_TYPE.PKCS7, »request.tbs, request.xsSignerInfo, request.params«, function(xsSignerInfo, xsSignatureInfo){`  · ASSIGN:identifier, ELEMENT:member-element
  36. L849 `else if(»request.otltype« == G2C_MSG.GET_REDIRECT_URL)`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  37. L1255 `icegateNewListener(service, tabInfo, »request«, sender, sendResponse);`  · ASSIGN:identifier
  38. L868 `if(»request.otltype« == G2C_MSG.GET_SIGNATURE)`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  39. L870 `if(»request.sigType« === SIGNATURE_TYPE.RAW) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  40. L905 `else if(»request.otltype« == G2C_MSG.GET_SIGNER)`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  41. L872 `XSG2C.getSignature(service, tabInfo, "Signature requested to sign the document", »request.tbs, request.params, request.params«, function(xsSignerInfo, xsSignatureInfo){`  · ASSIGN:identifier, ELEMENT:member-element
  42. L882 `XSG2C.getSignerInfo(service, tabInfo, undefined, undefined, »request.params«, function(xsSignerInfo){`  · ASSIGN:identifier, ELEMENT:member-element
  43. L908 `XSG2C.getSignerInfo(SERVICENAME_DGFT, tabInfo, undefined, undefined, »request.params«, function(xsSignerInfo){`  · ASSIGN:identifier, ELEMENT:member-element
  44. L1259 `mahaitListener(service, tabInfo, »request«, sender, sendResponse);`  · ASSIGN:identifier
  45. L921 `if(»request.otltype« == G2C_MSG.GET_SIGNER)`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  46. L923 `XSG2C.getSignerInfo(service, tabInfo, undefined, undefined, »request.params«, function(xsSignerInfo){`  · ASSIGN:identifier, ELEMENT:member-element
  47. L932 `else if(»request.otltype« == G2C_MSG.GET_SIGNATURE)`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  48. L934 `XSG2C.getSignature(service, tabInfo, (request.sigType==SIGNATURE_TYPE.PKCS7)?SIGNATURE_TYPE.PKCS7:SIGNATURE_TYPE.RAW, »request.tbs, request.xsSignerInfo, request.params«, function(xsSignerInfo, xsSignatureInfo){`  · ASSIGN:identifier, ELEMENT:member-element
  49. L1263 `shcilListener(service, tabInfo, »request«, sender, sendResponse);`  · ASSIGN:identifier
  50. L948 `if(»request.otltype« == G2C_MSG.GET_SIGNER)`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  51. L950 `XSG2C.getSignerInfo(service, tabInfo, undefined, undefined, »request.params«, function(xsSignerInfo){`  · ASSIGN:identifier, ELEMENT:member-element
  52. L959 `else if(»request.otltype« == G2C_MSG.GET_SIGNATURE)`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  53. L961 `XSG2C.getSignature(service, tabInfo, »request.sigType, request.tbs, request.xsSignerInfo, request.params«, function(xsSignerInfo, xsSignatureInfo){`  · ASSIGN:identifier, ELEMENT:member-element
  54. L1267 `xsListener(service, tabInfo, »request«, sender, sendResponse);`  · ASSIGN:identifier
  55. L1037 `if(»XSCUTILS.getComponentName(service) == COMPONENT.CRIS && request.params«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-right
  56. L1044 `if(»request.otltype« == G2C_MSG.GET_SIGNER) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  57. L1040 `Req.deserialize(»request.params.payload«);`  · ASSIGN:identifier, ELEMENT:member-element
  58. L1046 `XSG2C.getSignerInfo(service, tabInfo, undefined, undefined, »request.params«, function(xsSignerInfo){`  · ASSIGN:identifier, ELEMENT:member-element
  59. L1054 `else if(»request.otltype« == G2C_MSG.GET_SIGNATURE) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  60. L1041 `»request«.params.payload = Req;`  · ASSIGN:identifier
  61. L1056 `XSG2C.getSignature(service, tabInfo, »request.sigType, request.tbs, request.xsSignerInfo, request.params«, function(xsSignerInfo, xsSignatureInfo){`  · ASSIGN:identifier, ELEMENT:member-element
  62. L1066 `else if(»request.otltype« == G2C_MSG.GET_DECRYPTED_DATA) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  63. L1068 `XSG2C.getDecryptedData(service, tabInfo, »request.encDataArr, request.xsSignerInfo, request.params«, function(xsSignerInfo, xsSignatureInfo){`  · ASSIGN:identifier, ELEMENT:member-element
  64. L1076 `else if(»request.otltype« == G2C_MSG.GET_ENC_DSC) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  65. L1132 `else if(»request.otltype« == G2C_MSG.GET_CERT_INFO) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  66. L1120 `if(»request.reload«) {`  · ASSIGN:identifier, ELEMENT:member-element
  67. L1134 `XSG2C.xsCertParser(»request.service, request.xsSignerInfo«, function(signerInfo){`  · ASSIGN:identifier, ELEMENT:member-element
  68. L1142 `else if(»request.otltype« == G2C_MSG.DISPLAY_NOTIFICATION) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  69. L1144 `notifications(»request.show, request.message«);`  · ASSIGN:identifier, ELEMENT:member-element
  70. L1004 `if(»show && msg«) {`  · ASSIGN:identifier, ASSIGN:logical-left, ASSIGN:logical-right
  71. L1016 `message: »msg«,`  · ASSIGN:identifier
  72. L1009 (→L1021) `»				chrome.notifications.create(«`  · ELEMENT:object.setProperty
  73. L521 `XSG2C.getSignerInfo(service, tabInfo, pan, »payload.encryptionKeyId, request.params«, function(xsSignerInfo){`  · ELEMENT:member-element, ASSIGN:identifier
  74. L587 `XSG2C.getSignerInfo(service, tabInfo, pan, undefined, »request.params«, function(xsSignerInfo){`  · ASSIGN:identifier, ELEMENT:member-element
  75. L592 `emsSign(service, tabInfo, »request.tbs, xsSignerInfo, request.params«, sendResponse);`  · ASSIGN:identifier, ELEMENT:member-element
  76. L644 `response.selectedSignerIndex = »request.selectedSignerIndex«;`  · ASSIGN:identifier, ELEMENT:member-element
  77. L643 `»response = {}«;`  · ELEMENT:object.setProperty
  78. L891 `XSG2C.getSignature(service, tabInfo, »request.sigType, request.tbs, xsSignerInfo, request.params«, function(xsSignerInfo, xsSignatureInfo){`  · ASSIGN:identifier, ELEMENT:member-element
  79. L1058 `if(»request.params.payload.certtype === request.params.payload.CERT_TYPE.EN«) xsSignatureInfo.registerEnc = true;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:binary-right
  80. L1085 `if(resp.handle === »request.xsSignerInfo.handle«) sendResponse(resp);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right
  81. L1098 `XSG2C.getExtGetAllEncDSC(service, tabInfo, »request.xsSignerInfo, request.params«, function(encDSCInfo){`  · ASSIGN:identifier, ELEMENT:member-element
  82. L1100 `if(»request.params.payload.action === request.params.payload.ACTIONS.SIGN«) encDSCInfo.registerEnc = true; // Flag is used to identify where the user is registering encryption certificate. Will be used to display contextual text in key not found prompt.`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:binary-right
  83. L1102 `encDSCInfo = {»...request.xsSignerInfo, ...encDSCInfo«};`  · ASSIGN:identifier, ELEMENT:member-element, COPY:object-spread

---
