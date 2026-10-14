"use strict";
exlib.process=function(node) {
  let elements = node.querySelectorAll("[i18n-content],[i18n-value]");
  for (let element, i = 0; element = elements[i]; i++) {
    let att = element.getAttribute('i18n-content');
    if (att != null) {
      let s=exlib.i18nString(att);
      if(s)element.textContent = s;
    }
    att = element.getAttribute('i18n-value');
    if (att != null) {
      let s=exlib.i18nString(att);
      if(s)element.setAttribute("value",s);
    }
  }
}
exlib.process(document);