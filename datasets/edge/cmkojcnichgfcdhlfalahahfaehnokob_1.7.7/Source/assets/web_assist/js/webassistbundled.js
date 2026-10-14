var waTimeout = function (options) {
    var me = this,
        timeout = null;

    me.start = function () {
        if (timeout) return;
        timeout = setTimeout(function () {
            options.ontimeout();
        }, options.timeout);
    };

    me.stop = function () {
        clearTimeout(timeout);
        timeout = null;
    };

    me.restart = function () {
        me.stop();
        me.start();
    };
};

/**
 * Use the Web Speech Recognition API t0 get transcripts and passes them to the WebAssist object
 */

var WebSpeechRecognitionAPI = function (options) {
  var me = this,
    recognitionStopped = true,
    speechTimeout = null,
    provider =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      window.mozSpeechRecognition ||
      window.msSpeechRecognition,
    recognition = new provider();

  me.dictationMode = false;
  if (parseInt(options.webSpeechTimeout) > 0) {
    speechTimeout = new waTimeout({
      ontimeout: ontimeout,
      timeout: parseInt(options.webSpeechTimeout) * 1000,
    });
  }

  //  recognition.interimResults = options.interimResults;
  recognition.maxAlternatives = options.maxAlternatives;
  recognition.continuous = false;
  const language = navigator.language;
  if (language.startsWith("en-")) {
    recognition.lang = language;
  } else {
    if (options.languageCode) recognition.lang = options.languageCode;
  }

  //Process incoming transcripts and send results to the WebAssist object
  recognition.onresult = function (event) {
    var transcripts = [],
      transcript = "",
      results = null,
      finalResults = false,
      alternatives = null;

    try {
      //    for (var i = event.resultIndex, rLen = event.results.length; i < rLen; i++) {
      results = event.results[0];
      finalResults = results.isFinal;
      alternatives = Array.from(results);
      //     alternatives = (finalResults) ? sortTranscripts(alternatives) : alternatives;

      for (var x = 0, len = alternatives.length; x < len; x++) {
        // console.log(alternatives[x].transcript);
        // console.log(alternatives[x].confidence);
        transcript = alternatives[x].transcript.trim();
        if (transcript) transcripts.push(transcript);
      }

      if (transcripts.length) options.onResult(transcripts, finalResults);
      //Use callback to send transcript array to WebAssist object
      if (parseInt(options.webSpeechTimeout) > 0) speechTimeout.restart();
    } catch (e) {
      if (parseInt(options.webSpeechTimeout) > 0) speechTimeout.stop();
      if (options.onError) options.onError("error " + e.message);
      console.log("Native provider error " + e.message);
    }
  };

  // function checkNextTranscript() {
  //   setTimeout(() => {
  //     if (!transcripts.length) {
  //       options.onResult([currentTranscript], finalResults);
  //       currentTranscript = "";
  //     }
  //   }, 500);
  // }

  recognition.onstart = function (event) {
    endCount = 0;
    if (options.recognitionStarted) options.recognitionStarted();
  };

  me.setContinuousMode = function (value) {
    recognition.continuous = value;
  };

  var speechError = false;

  recognition.onerror = function (event) {
    if (
      options.onError &&
      event.error !== "aborted" &&
      event.error !== "no-speech"
    ) {
      speechError = true;
      if (parseInt(options.webSpeechTimeout) > 0) speechTimeout.stop();
      if (event.error === "network") {
        options.onError("network");
      } else if (event.error === "not-allowed") {
        options.onError("notallowederror");
      } else {
        options.onError("error  " + event.message);
      }
      console.log("Speech recognition error detected: " + event.error);
    }
  };

  var endCount = 0,
    serviceError = false;

  recognition.onend = function () {

    //If the recognitionStopped variable is not set it is an error
    if (!recognitionStopped && !speechError) {
      if (!endCount)
        setTimeout(() => {
          if (endCount > 20) {
            console.log("restart recognition error " + endCount);
            options.onError("error recognition");
            serviceError = true;
          }
          endCount = 0;
        }, 5000);

      if (!serviceError) {
        new Date().getTime() - lastStartedAt;
        recognitionStopped = true;
        startIt();
      }

      serviceError = false;
      endCount += 1;
    }
    speechError = false;
  };

  function startIt() {
    me.start(true);
  }

  var lastStartedAt = null;
  //Start recognition
  me.start = function (reset) {
    try {
      if (!recognitionStopped || document.hidden) return;
      lastStartedAt = new Date().getTime();
      recognitionStopped = false;
      recognition.start();
      //Start timeout countdown
      if (parseInt(options.webSpeechTimeout) > 0 && !reset) {
        speechTimeout.stop();
        speechTimeout.start();
      }
    } catch (error) {
      console.log("Recognition start error " + error.message);
    }
  };

  //Stop recognition
  me.stop = function () {
    recognition.stop();
    recognitionStopped = true;
    if (parseInt(options.webSpeechTimeout) > 0) {
      //Stop timeout countdown
      speechTimeout.stop();
    }

    // stopMicrophone();
  };

  me.resetTimeout = function () {
    speechTimeout.stop();
    if (parseInt(options.webSpeechTimeout) > 0) {
      speechTimeout = new waTimeout({
        ontimeout: ontimeout,
        timeout: parseInt(options.webSpeechTimeout) * 1000,
      });
    }
  };

  me.setVideoTimeout = function (data) {
    if (parseInt(options.webSpeechTimeout) > 0) {
      speechTimeout.stop();
      speechTimeout = new waTimeout({
        ontimeout: ontimeout,
        timeout: 5000,
      });
    }
  };

  function ontimeout() {
    options.ontimeout("Timeout");
  }
};

//Sort by confidence in descending order. Don't change this without changing how the transcripts are processed
//by the Dictation object
// function sortTranscripts(alternatives) {
//   var result = 0;
//   alternatives.sort(function (a, b) {
//     result = (a.confidence > b.confidence) ? 1 : -1;
//     return result * -1;
//   });
//   return alternatives;
// }

var modalWindow = function () {

  var me = this,
    modalWindow = null,
  mask = null,
    onClose = null,
  isOpen = false,
  closeID = 'waCloseModal';

  me.shadowDocument = null;
 
  async function initializeDialog() {
    var  div = document.createElement('div');
    div.style.zIndex = 99999;
    me.shadowDocument = div.attachShadow({mode: 'open'});
    var style = document.createElement("style"),
    styleHTML = getStyle();

    div.id = 'waModalShadow';
    document.body.appendChild(div);
    style.innerHTML = styleHTML;
    me.shadowDocument.appendChild(style);
    div = document.createElement('div');
    div.id = 'waModal';
    div.innerHTML = getDialogHTML();
    me.shadowDocument.appendChild(div);
    modalWindow = div;

    div = document.createElement('div');
    div.id = 'waMask';
   document.body.appendChild(div);
    mask = div;
    addEvents();
  }

  function getStyle() {
    return '#waModal label,#waModal select,#waModal textarea{color:#000;font-weight:400;float:none;margin:0;padding:0;line-height:normal}#waItems option,#waModal{font-family:"Times New Roman",Times,serif!important}#addShortcut input[type=button],#addTemplate input[type=button]{color:#fff;border-color:#48cfad;background-color:#3874fa;display:inline-block;padding:10px 20px}#addShortcut input[type=button],#addTemplate input[type=button],#waCloseModal:focus,#waCloseModal:hover{text-decoration:none;cursor:pointer}#waModal{position:fixed;top:50%;left:50%;font-weight:700;background-color:#fefefe;z-index:10000000;opacity:0;border-radius:5px;transform:translate(-50%,-50%)}#waModal input{background-color:#fff;color:#000;line-height:normal;font-weight:400}#waModal select,#waModal textarea{background-color:#fff}.titleRow{background:radial-gradient(circle at 10% 20%,#4b6cb7 0,#37528d 90%);padding-bottom:8px;border-radius:5px}#waModalTitle{display:inline-block;font-weight:700;padding-top:8px;font-size:21px;margin-left:15px;color:#fff}#waCloseModal{margin:-2px 0 0;padding:0 8px 0 0;line-height:normal;color:#fff;vertical-align:top;font-size:28px;font-weight:700;float:right}#addShortcut,#addTemplate{text-align:left;background-color:#fff;padding-left:15px;padding-right:15px;box-shadow:0 0 10px rgba(0,0,0,.1)}#addShortcut .form-group,#addTemplate .form-group{margin-top:15px}#addShortcut label,#addTemplate label{display:block;font-weight:700;font-size:16px;margin-bottom:4px}#addShortcut input[type=button]{border-radius:.25em;font-size:19px;margin-left:150px;margin-top:45px;margin-bottom:15px}#addShortcut input[type=text]{width:375px;padding:10px 5px 5px 10px;box-sizing:border-box;border:1px solid #ccc;font-size:16px;border-radius:4px}#addShortcut input[type=text]:focus,#addShortcut select:focus{outline:#c3e6f4}#waItems option{margin:5px 0 0 10px;padding:0;font-weight:400;line-height:normal;font-size:18px!important}#addTemplate input[type=text],#addTemplate textarea{width:750px;padding:10px 5px 5px 10px;box-sizing:border-box;font-size:16px}#addTemplate input[type=text]{border:1px solid #ccc;border-radius:4px}#addTemplate textarea{height:350px;border:1px solid #ccc;border-radius:4px}#addTemplate input[type=button]{border-radius:.25em;font-size:19px;margin-left:325px;margin-bottom:10px}';
  }

  async function addEvents() {
    mask.addEventListener('click', function () {
      me.hide();
    });

  }

  function getDialogHTML() {
    return '<div class="titleRow" ><div id="waModalTitle"></div><span role="button" id="' + closeID + '">&times;</span></div><div id="waModalContent"></div>';
  }

  initializeDialog();
  me.show = function (options) {
    me.hide(true);
    mask.style.display = 'block';
    modalWindow.style.display = 'block';
    me.shadowDocument.getElementById('waModalTitle').innerHTML = options.title;
    me.shadowDocument.getElementById('waModalContent').innerHTML = options.html;
    mask.style.opacity = 1;
    modalWindow.style.opacity = 1;
    onClose = options.onClose;
    isOpen = true;
    addButtonEvents(options.confirmID, options.cancelID, options.onConfirm, options.showClose);
    if (options.onShow) options.onShow();
  };

  async function addButtonEvents(confirmID, cancelID, onConfirm, showClose) {
    var closeElem = me.shadowDocument.getElementById(closeID);

    if (showClose) {
      closeElem.style.display = 'block';
      closeElem.addEventListener('click', function () {
        me.hide();
      });
    } else {
      closeElem.style.display = 'none';
    }


    if (confirmID) {
      me.shadowDocument.getElementById(confirmID).addEventListener('click', function () {
        if (onConfirm) {
          onConfirm();
        }
      });
    }

    if (cancelID) {
      me.shadowDocument.getElementById(cancelID).addEventListener('click', function () {
        me.hide();
      });
    }
  }

  me.hide = function () {
    if (isOpen) {
      mask.style.opacity = 0;
      modalWindow.style.opacity = 0;
      me.shadowDocument.getElementById('waModalContent').innerHTML = '';
      mask.style.display = 'none';
      modalWindow.style.display = 'none';
      isOpen = false;
      if (onClose) onClose();
    }
  };

};

var waCommandFunctions = function (options, wa) {
  var me = this,
    isMobile = window.innerWidth < 600,
    currentURL = window.location.href,
    documentBody = document.body,
    documentElement = document.documentElement,
    contentEditable = new ContentEditableUtils$1();

  //Emulates a user click
  me.clickElement = function (data) {
    var elem = null,
      dataElem = data.elem,
      error = false,
      search = null;

    if (dataElem.disabled === undefined || dataElem.disabled === false) {
      if (data.elem.hasAttribute("contenteditable")) {
        data.elem.focus();
        return true;
      }

      if (dataElem.getAttribute("type") === "file") {
        options.onError("nocommand");
        if (options.onError) {
          dataElem.focus();
          return true;
        }
      }

      //Amazon
      elem = dataElem.parentNode.querySelector('[name="rememberMe"');
      if (elem) {
        elem.checked = true;
        return;
      }

      if (currentURL.indexOf("chatgpt.com") > -1) {
        if (
          dataElem.innerText &&
          dataElem.innerText.toLowerCase().indexOf("upload") > -1
        ) {
          if (options.onError) {
            options.onError("nocommand");
            dataElem.focus();
            return true;
          }
        }
        if (dataElem.getAttribute("data-testid") === "profile-button") {
          if (options.onError) {
            options.onError("nocommand");
            dataElem.focus();
            return true;
          }
        }
      }

      if (currentURL.indexOf("wikipedia") > -1) {
        if (
          (!dataElem.href && dataElem.innerText === "Share") ||
          dataElem.innerText === "Wikitext" ||
          dataElem.innerText === "Embed" ||
          dataElem.innerText === "HTML" ||
          getParentNodeByAttribute(
            dataElem.parentNode,
            "role",
            "listbox",
            document
          ) ||
          (dataElem.title &&
            dataElem.nodeName === "A" &&
            dataElem.getAttribute("role") === "button")
        ) {
          if (options.onError) {
            options.onError("nocommand");
            dataElem.focus();
            return true;
          }
        }
      }

      if (
        dataElem.id === "ybarAccountMenuOpener" ||
        dataElem.id === "ybarNotificationMenu" ||
        dataElem.getAttribute("alt") === "user"
      ) {
        focusElem(dataElem.parentNode);
        if (options.elementClicked) options.elementClicked(2000);
        return;
      }

      if (currentURL.indexOf("fandom.com") > -1) {
        //  .fandom-select, picture
        if (
          dataElem.getAttribute("class") &&
          (dataElem.getAttribute("class").indexOf("fandom-select") > -1 ||
            dataElem.getAttribute("class").indexOf("wds-dropdown__toggle") > -1)
        ) {
          if (options.onError) {
            options.onError("nocommand");
            dataElem.focus();
            return true;
          }
        }
        if (
          dataElem.getAttribute("href") &&
          dataElem.getAttribute("href") === "#" &&
          dataElem.getElementsByTagName("span").length
        ) {
          if (options.onError) {
            options.onError("nocommand");
            dataElem.focus();
            return true;
          }
        }
      }

      if (
        currentURL.indexOf("espn.com") > -1 &&
        dataElem.nodeName === "BUTTON" &&
        dataElem.innerText === "TOP EVENTS"
      ) {
        if (options.onError) {
          options.onError("nocommand");
          dataElem.focus();
          return true;
        }
      }

      if (currentURL.indexOf("bing.com") > -1) {
        if (
          dataElem.nodeName === "A" &&
          dataElem.getAttribute("class") &&
          dataElem.getAttribute("class").indexOf("richImgLnk") > -1
        ) {
          dataElem.firstChild.click();
          if (options.elementClicked) options.elementClicked(2000);
          return;
        }

        search = getParentNodeByAttribute(
          dataElem.parentNode,
          "role",
          "option",
          dataElem.ownerDocument
        );

        if (
          search &&
          getParentNodeByAttribute(
            search.parentNode,
            "aria-label",
            "Suggestions",
            search.ownerDocument
          )
        ) {
          window.location.href =
            "https://www.bing.com/search?q=" + search.innerText;
          if (options.elementClicked) options.elementClicked(2000);
          return;
        }

        if (
          currentURL.indexOf("https://www.bing.com/maps") === -1 &&
          dataElem.innerText === "Feedback"
        ) {
          dataElem.click();
          options.onError("");
          return true;
        }

        if (
          dataElem.getAttribute("h") &&
          dataElem.nodeName === "A" &&
          dataElem.getAttribute("h").indexOf("ID=images") > -1
        ) {
          elementClicked(dataElem, data);
          location.reload();
          return;
        }
      }

      try {
        error = elementClicked(dataElem, data);
      } catch (e) {
        console.log(e.message);
        error = true;
      }

      if (wa.dictationMode) {
        if (options.sendCommandMessage)
          options.sendCommandMessage('Dictation Mode. Say "stop" to end.');
      }
      return error;
    } else {
      return true;
    }
  };

  var domModified = false;

  function elementClicked(elem, data) {
    try {
      var parentNode = elem.parentNode.parentNode
        ? elem.parentNode.parentNode
        : elem;
      observeMutations(parentNode, elem);
      if (elem.nodeName.toLowerCase() === "select") {
        if (!elem.hasAttribute("multiple")) {
          displayDropdown(elem);
        } else {
          elem.firstChild.selected = true;
        }
        return;
      }

      if (elem.nodeName === "LABEL") elem = data.elem;

      if (elem.click) {
        me.fireEvent(elem, "mousedown");
        me.fireEvent(elem, "mouseup");
        elem.click();
      }

      if (data.labelElem) data.elem.focus();
      setTimeout(() => {
        if (!domModified && !elem.href) {
          observeMutations(documentBody, elem);
          //||
          if (
            elem.nodeName === "svg" ||
            (elem.nodeName === "IMG" && !elem.click)
          ) {
            clickParents(elem, elem.ownerDocument, 3);
            setTimeout(() => {
              // if (!domModified && window.location.href === currentURL) {
              //   //if (options.onError) options.onError("nocommand");
              //   elem.focus();
              // }
              removeListeners();
            }, 200);
          } else if (elem.nodeName === "LI" || elem.nodeName === "SPAN") {
            if (!domModified && window.location.href === currentURL) {
              clickChildren(elem, 3);
              if (
                elem.nodeName === "SPAN" &&
                !domModified &&
                window.location.href === currentURL
              )
                clickParents(elem.parentNode, elem.ownerDocument, 2);
            }

            setTimeout(() => {
              // if (!domModified && window.location.href === currentURL && elem.nodeName === 'SPAN') {
              //  // if (options.onError) options.onError("nocommand");
              //   elem.focus();
              // }
              removeListeners();
            }, 200);
          } else if (elem.nodeName === "DIV" && !elem.hasAttribute("role")) {
            if (!domModified && window.location.href === currentURL) {
              clickChildren(elem, 3);
            }
            removeListeners();
          } else {
            removeListeners();
          }
        } else {
          removeListeners();
        }
      }, 1000);

      if (options.elementClicked) options.elementClicked(1000);
    } catch (e) {
      if (options.onError) options.onError("nocommand");
      elem.focus();
      return true;
    }
  }

  function setDomModified() {
    domModified = true;
  }

  var domObservers = [];

  function observeMutations(targetNode, elem) {
    window.addEventListener("popstate", setDomModified);
    // Create an observer instance linked to the callback function
    const observer = new MutationObserver((mutationsList, observer) => {
      for (const mutation of mutationsList) {
        if (!mutation.target.isEqualNode(elem)) {
          if (mutation.attributeName) {
            if (
              mutation.attributeName === "class" ||
              mutation.attributeName === "style"
            ) {
              domModified = true;
              return;
            }
          } else {
            domModified = true;
            return;
          }
        }
      }
    });

    // Options for the observer (which mutations to observe)
    const config = { attributes: true, childList: true, subtree: true };

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);
    domObservers.push(observer);

    elem.addEventListener("change", function (e) {
      domModified = true;
    });
  }

  async function removeListeners() {
    domModified = false;
    domObservers.forEach(function (observer) {
      observer.disconnect();
    });
    window.removeEventListener("popstate", setDomModified);
    domObservers = [];
  }

  function clickParents(parentNode, doc, depth) {
    var x = 0;

    try {
      while (
        x < depth &&
        parentNode &&
        parentNode !== documentElement &&
        parentNode !== doc &&
        parentNode !== documentBody
      ) {
        if (parentNode.nodeType === 1) {
          if (domModified) return;
          if (parentNode.href) domModified = true;
          setTimeout(() => {
            if (domModified) return;
            if (parentNode && parentNode.click) parentNode.click();
            if (!domModified) addMouseEVents(parentNode);
          }, 100);
        }
        x++;
        if (parentNode) parentNode = parentNode.parentNode;
      }
    } catch (error) {
      console.log("click parents " + error.message);
    }

    return null;
  }

  async function clickChildren(elem, depth) {
    var childNodes = elem.querySelectorAll("*"),
      childNode = null,
      rect = null;

    for (let index = 0; index < depth; index++) {
      childNode = childNodes[index];
      try {
        if (childNode && childNode.nodeType === 1 && childNode.click) {
          rect = childNode.getBoundingClientRect();
          if (isVisibleInViewport(childNode, rect)) {
            if (
              childNode.nodeName !== "A" ||
              childNode.innerText === elem.innerText
            ) {
              if (domModified) return;
              if (!domModified) addMouseEVents(elem);
              if (childNode.href || childNode.nodeName === "BuTTON")
                domModified = true;
            }
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  function isVisibleInViewport(el, rect) {
    var pointEl = getPointEl(rect, el.ownerDocument),
      visible = (pointEl === el && pointEl) || el.contains(pointEl);

    return visible;
  }

  function getPointEl(rect, doc) {
    try {
      var pointEl = doc.elementFromPoint(rect.left + 2, rect.top + 2);

      return pointEl;
    } catch (e) {
      console.log("point " + e.message);
      return null;
    }
  }
  // const baseMouseOpts = {
  //   bubbles: !0,
  //   clientX: 0,
  //   clientY: 0
  // }
  //   , clickMouseOpts = {
  //     button: 0,
  //     buttons: 0,
  //     cancelBubble: !1,
  //     cancelable: !0,
  //     composed: !0,
  //     defaultPrevented: !1,
  //     detail: 1,
  //     eventPhase: 1,
  //     fromElement: null,
  //     height: 1,
  //     isPrimary: !1,
  //     pointerId: 1,
  //     pointerType: "mouse",
  //     pressure: 0,
  //     relatedTarget: null,
  //     returnValue: !0,
  //     tangentialPressure: 0,
  //     tiltX: 0,
  //     tiltY: 0,
  //     toElement: null,
  //     twist: 0,
  //     type: "click",
  //     which: 1,
  //     width: 1
  //   };

  me.hover = function (data) {
    var dataElem = data.elem;

    if (
      currentURL.indexOf("espn.com") > -1 &&
      dataElem.nodeName === "BUTTON" &&
      dataElem.innerText === "TOP EVENTS"
    ) {
      if (options.onError) {
        options.onError("nocommand");
        dataElem.focus();
        return true;
      }
    }

    if (dataElem.parentNode.parentNode)
      observeMutations(dataElem.parentNode.parentNode, dataElem);
    addMouseEVents(dataElem);
    dataElem.focus();
    if (dataElem.nodeName !== "INPUT" && !dataElem.href) {
      setTimeout(() => {
        if (!domModified) {
          observeMutations(documentBody, dataElem);
          if (dataElem.nodeName === "LI" || dataElem.nodeName === "A") {
            hoverChildren(dataElem);
          } else {
            hoverParents(dataElem, dataElem.ownerDocument, 3);
            setTimeout(() => {
              if (!domModified) hoverChildren(dataElem);
            }, 50);
          }
        }

        setTimeout(() => {
          if (
            !domModified &&
            (dataElem.nodeName === "svg" ||
              dataElem.nodeName === "LI" ||
              dataElem.nodeName === "img")
          ) {
            if (options.onError) {
              options.onError("nocommand");
              dataElem.focus();
            }
          }
          removeListeners();
          return;
        }, 200);
      }, 1000);
    } else {
      removeListeners();
    }

    setTimeout(function () {
      if (options.elementClicked) options.elementClicked(0);
    }, 200);
  };

  function hoverChildren(elem) {
    var childNodes = Array.from(elem.childNodes);

    if (childNodes.length) {
      childNodes.forEach((childNode) => {
        if (domModified) return;
        if (childNode.nodeType === 1 && !childNode.href) {
          addMouseEVents(childNode);
        }
      });
    }
  }

  function hoverParents(parentNode, doc, depth) {
    var x = 0;

    try {
      while (
        x < depth &&
        parentNode &&
        parentNode !== documentElement &&
        parentNode !== doc &&
        parentNode !== documentBody
      ) {
        if (domModified) return;
        if (parentNode.nodeType === 1 && !parentNode.href) {
          addMouseEVents(parentNode);
        }
        x++;
        parentNode = parentNode.parentNode;
      }
    } catch (error) {
      console.log("hover");
    }

    return null;
  }

  function addMouseEVents(elem) {
    if (domModified) return;

    if (!domModified) me.fireEvent(elem, "mouseenter");
    if (!domModified) me.fireEvent(elem, "mouseover");
    if (!domModified) me.fireEvent(elem, "mousemove");

    setTimeout(() => {
      addKeyEvent(13, elem);
    }, 200);
  }

  me.enterKey = function (data) {
    var elem = wa.dictationElement ? wa.dictationElement : getActiveElement();
    if (elem) addKeyEvent(13, elem);
    if (options.elementClicked) options.elementClicked(0);
  };

  function addKeyEvent(charCode, elem) {
    var ke = new KeyboardEvent("keydown", {
      bubbles: true,
      cancelable: false,
      keyCode: charCode,
    });
    elem.dispatchEvent(ke);

    ke = new KeyboardEvent("keydown", {
      bubbles: true,
      cancelable: false,
      keyCode: charCode,
    });
    elem.dispatchEvent(ke);

    ke = new KeyboardEvent("keypress", {
      bubbles: true,
      cancelable: false,
      keyCode: charCode,
    });
    elem.dispatchEvent(ke);
  }

  me.tabKey = function () {
    var elem = wa.dictationElement ? wa.dictationElement : getActiveElement();
    if (elem) addKeyEvent(9, elem);
    if (options.elementClicked) options.elementClicked(0);
  };

  me.escapeKey = function () {
    var elem = wa.dictationElement ? wa.dictationElement : getActiveElement();
    if (elem) addKeyEvent(27, elem);
    if (options.elementClicked) options.elementClicked(0);
  };

  me.mouseOut = function (data) {
    me.fireEvent(data.elem, "mouseout");
    me.fireEvent(data.elem, "mouseleave");
    addKeyEvent(27, data.elem);
    data.elem.blur();
    documentBody.click();
    if (options.elementClicked) options.elementClicked(0);
  };

  //Sets the active element
  me.focusElement = function (data) {
    focusElem(data.elem);
    if (options.elementClicked) options.elementClicked(0);
  };

  //Emulates a user click on the active element
  me.clickActive = function (data) {
    var activeElement = getActiveElement();

    if (
      activeElement.nodeName.toLowerCase() === "select" ||
      activeElement.type === "select-one"
    ) {
      displayDropdown(activeElement);
    } else {
      data.elem = activeElement;
      elementClicked(activeElement, data);
    }
    activeElement.focus();
    if (options.elementClicked) options.elementClicked(0);
  };

  me.homePage = function (data) {
    var url = new URL(currentURL);
    window.location.assign("https://" + url.hostname);
  };

  me.goToURL = function (data) {
    data.transcript = removePunctuation(data.transcript.toLowerCase());
    var url = getWildCardText(data).trim();
    url = formatURL(url);
    if (isValidUrl(url)) {
      data.transcript = url;
      window.location.assign(url);
    } else {
      return true;
    }
  };

  function formatURL(url) {
    url = replaceAll(url, "dot ", ".");
    url = replaceAll(url, " net", ".net");
    url = replaceAll(url, " org", ".org");
    url = replaceAll(url, " edu", ".edu");
    url = replaceAll(url, " uk", ".uk");
    url = replaceAll(url, " biz", ".biz");
    url = replaceAll(url, " gov", ".gov");
    url = replaceAll(url, " co", ".co");
    url = replaceAll(url, " ai", ".ai");
    url = replaceAll(url, "forward slash", "/");
    url = replaceAll(url, "slash", "/");
    url = replaceAll(url, "dash", "-");
    url = replaceAll(url, " ", "");
    if (
      url.indexOf("http://") === -1 &&
      url.indexOf("https://") === -1 &&
      url.indexOf("mailto") === -1
    ) {
      if (url.indexOf("www,") > -1) {
        url = "https://" + url;
      } else {
        url = "https://www." + url;
      }
    }
    return url;
  }
  me.searchTab = function (data) {
    data.transcript = removePunctuation(data.transcript).toLowerCase();
    var url = getWildCardText(data);
    url = /Edg/.test(navigator.userAgent)
      ? "https://www.bing.com/search?q="
      : "http://google.com/search?q=";
    url = url + replaceAll(url, " ", "+");
    window.open(url);
  };

  me.search = function (data) {
    data.transcript = removePunctuation(data.transcript).toLowerCase();
    var url = getWildCardText(data);
    url = isEdgeBrowser()
      ? "https://www.bing.com/search?q=" + replaceAll(url, " ", "+")
      : "http://google.com/search?q=" + replaceAll(url, " ", "+");
    window.location.assign(url);
  };

  //Scrolls to the bottom or top of the page
  me.scrollBottom = function (data) {
    var activeElement = getActiveElement(),
      scrollElement =
        activeElement.id === "waDropdown"
          ? activeElement
          : getScrollElement(activeElement, "vertical"),
      scrollHeight =
        scrollElement && scrollElement.scrollHeight
          ? scrollElement.scrollHeight
          : documentElement.scrollHeight;

    if (scrollElement) {
      scrollElement.focus();
      if (scrollElement.nodeName === "BODY") {
        window.scrollTo({
          top: scrollHeight,
          behavior: "smooth",
        });
      } else {
        scrollElement.scrollTo({
          top: scrollHeight,
          behavior: "smooth",
        });
      }
    }
  };

  me.scrollTop = function (data) {
    if (data.elem) data.elem.focus();
    var activeElement = data.elem ? data.elem : getActiveElement(),
      scrollElement =
        activeElement.id === "waDropdown"
          ? activeElement
          : getScrollElement(activeElement, "vertical");

    if (scrollElement) {
      scrollElement.focus();
      if (scrollElement.nodeName === "BODY") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        scrollElement.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
  };

  function getActiveElement() {
    var doc = null,
      documents = wa.getDocuments(),
      activeElement = null;

    for (let index = 0; index < documents.length; index++) {
      try {
        doc = documents[index];
        if (doc.activeElement && doc.activeElement.nodeName !== "BODY") {
          if (doc.activeElement.ownerDocument) {
            activeElement = doc.activeElement;
          } else {
            if (doc.activeElement.nodeName === "IFRAME") {
              activeElement = doc.activeElement;
            } else {
              activeElement = doc.activeElement;
              //  if (doc === document && doc.activeElement !== document.body) break;
            }
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    if (!activeElement) {
      activeElement = documentBody;
      window.focus();
    }

    return activeElement;
  }

  function getScrollElement(activeElement, dir) {
    var parentNode = activeElement,
      activeNode = null;

    while (parentNode && parentNode !== document.documentElement) {
      if (hasScrollBar(parentNode, dir)) {
        activeNode = parentNode;
        break;
      }
      parentNode =
        parentNode.parentNode instanceof DocumentFragment
          ? parentNode.parentNode.host
          : parentNode.parentNode;
    }
    if (!activeNode)
      activeNode = documentBody.scrollHeight ? documentBody : documentElement;
    if (activeNode !== documentBody && !hasScrollBar(activeNode, dir))
      activeNode = getFirstScroll(document, dir);
    return activeNode;
  }

  function getFirstScroll(doc, dir) {
    var selector =
        'div, div:not([wascrolllabel="false"]):not(#waDropdown), aside, section',
      scrollElems =
        doc instanceof ShadowRoot
          ? getShadowElems(doc, selector)
          : doc.querySelectorAll(selector);

    for (var i = 0; i < scrollElems.length; i++) {
      if (hasScrollBar(scrollElems[i], dir)) return scrollElems[i];
    }
    return documentElement;
  }

  function hasScrollBar(element, dir) {
    var style = null,
      scrollable = false;

    if (element.nodeType === 1) {
      style = getComputedStyle(element);

      if (dir === "vertical") {
        if (style.overflow) {
          scrollable =
            style.overflow.indexOf("scroll") > -1 ||
            style.overflow.indexOf("auto") > -1 ||
            style.overflow === "contain" ||
            style.overflow === "overlay";
        }
        if (!scrollable && style.overscrollBehavior) {
          scrollable = style.overscrollBehavior === "contain";
        }

        if (!scrollable && style.overflowY) {
          scrollable =
            style.overflowY.indexOf("scroll") > -1 ||
            style.overflowY.indexOf("auto") > -1 ||
            style.overflowY === "overlay";
        }

        if (!scrollable && style.overscrollBehaviorY) {
          scrollable = style.overscrollBehaviorY === "contain";
        }
      } else {
        scrollable =
          style.overflow === "scroll" ||
          style.overflow === "auto" ||
          style.overflow === "overlay" ||
          style.overflow === "contain" ||
          style.overflowX === "scroll" ||
          style.overflowX === "overlay" ||
          style.overflowX === "auto" ||
          style.overscrollBehaviorX === "contain";
      }
    }
    return (
      scrollable &&
      (element.scrollHeight > element.clientHeight || element === documentBody)
    );
  }

  me.scrollPageDown = function () {
    documentBody.focus();
    scrollBy(document.scrollingElement, 0, window.innerHeight4 / 4);
  };

  me.scrollPageUp = function () {
    documentBody.focus();
    scrollBy(document.scrollingElement, 0, -window.innerHeight / 4);
  };

  //Scrolls page or element (whichever has focus) down or up
  me.scrollDown = function (data) {
    if (currentURL.indexOf("https://www.youtube.com/shorts") > -1) {
      nextShort();
      return;
    }

    if (data.elem) data.elem.focus();
    var activeElement = data.elem ? data.elem : getActiveElement(),
      scrollElement =
        activeElement.id === "waDropdown"
          ? activeElement
          : getScrollElement(activeElement, "vertical"),
      currentPosition = scrollElement.scrollTop,
      height = 0;

    if (scrollElement) {
      scrollElement.focus();
      if (scrollElement.nodeName === "BODY") {
        scrollBody(window.innerHeight / 4);
        if (documentBody.scrollTop === currentPosition) {
          scrollBy(documentElement || documentBody, 0, window.innerHeight / 4);
        }
      } else {
        height =
          scrollElement.offsetHeight > window.innerHeight ||
          !scrollElement.offsetHeight
            ? window.innerHeight / 4
            : scrollElement.offsetHeight / 4;
        scrollBy(scrollElement, 0, height);
        setTimeout(function () {
          if (currentPosition === scrollElement.scrollTop) {
            scrollBody(window.innerHeight / 4);
          }
        }, 100);
      }
    }
  };

  me.scrollUp = function (data) {
    if (currentURL.indexOf("https://www.youtube.com/shorts") > -1) {
      previousShort();
      return;
    }

    if (data.elem) data.elem.focus();

    var activeElement = getActiveElement(),
      scrollElement =
        activeElement.id === "waDropdown"
          ? activeElement
          : getScrollElement(activeElement, "vertical"),
      currentPosition = scrollElement.scrollTop,
      height = 0;

    if (scrollElement) {
      if (scrollElement.nodeName === "BODY") {
        if (
          currentURL.indexOf("facebook.com") !== -1 &&
          documentElement.scrollTop === 0
        ) {
          documentBody.focus();
          scrollBy(documentBody, 0, -window.innerHeight / 4);
        } else {
          scrollBody(-window.innerHeight / 4);
          if (documentBody.scrollTop === currentPosition) {
            scrollBy(
              documentElement || documentBody,
              0,
              -window.innerHeight / 4
            );
          }
        }
      } else {
        height =
          scrollElement.offsetHeight > window.innerHeight ||
          !scrollElement.offsetHeight
            ? window.innerHeight / 4
            : scrollElement.offsetHeight / 4;
        scrollBy(scrollElement, 0, -height);
        setTimeout(function () {
          if (currentPosition === scrollElement.scrollTop) {
            scrollBody(-window.innerHeight / 4);
          }
        }, 100);
      }
    }
  };

  function scrollBy(activeElement, x, y) {
    var options = {
        behavior: "smooth",
        left: x,
        top: y,
      },
      isSmoothScrollSupported = "scrollBehavior" in documentElement.style;

    if (isSmoothScrollSupported) {
      activeElement.scrollBy(options);
    } else {
      activeElement.scrollBy(options.left, options.top);
    }
  }

  //Continuously scrolls page down or up until the turn off command is executed or the the bottom or top of the
  // page is reached;
  var scrollingDown = false,
    scrollingUp = false,
    upScrollAnimation = null,
    downScrollAnimation = null,
    autoScrollElement = null;

  me.autoScrollDown = function (data) {
    if (
      currentURL.indexOf("facebook.com") > -1 ||
      currentURL.indexOf("twitter.com") > -1 ||
      currentURL.indexOf("ebay.com") > -1
    ) {
      if (options.sendCommandMessage)
        options.sendCommandMessage("Autoscrolling is not available");
      return true;
    }

    scrollingDown = true;
    if (options.autoScroll) options.autoScroll(true);
    autoScrollElement = getScrollElement(getActiveElement(), "vertical");
    scrollToBottom();
  };

  me.autoScrollUp = function (data) {
    if (
      currentURL.indexOf("facebook.com") > -1 ||
      currentURL.indexOf("twitter.com") > -1 ||
      currentURL.indexOf("ebay.com") > -1
    ) {
      if (options.sendCommandMessage)
        options.sendCommandMessage("Autoscrolling is not available");
      return true;
    }

    scrollingUp = true;
    if (options.autoScroll) options.autoScroll(true);
    autoScrollElement = getScrollElement(getActiveElement(), "vertical");
    scrollToTop();
  };

  var interval = 30,
    increment = 5;

  function scrollToTop() {
    if (!scrollingUp) {
      clearTimeout(upScrollAnimation);
      if (options.autoScroll) options.autoScroll(false);
      return;
    }

    if (autoScrollElement === documentBody) {
      if (hasScrollBar(documentElement, "vertical")) {
        autoScrollElement = documentElement;
      }
    }
    if (
      autoScrollElement === documentBody ||
      autoScrollElement === documentElement
    ) {
      scrollingUp = documentBody.scrollTop || documentElement.scrollTop;
    } else {
      scrollingUp = autoScrollElement.scrollTop;
    }

    if (scrollingUp) {
      var currentPosition = autoScrollElement.scrollTop;

      autoScrollElement.scrollBy({
        top: increment * -1,
        left: 0,
        behavior: "smooth",
      });
      if (
        autoScrollElement.scrollTop === currentPosition &&
        autoScrollElement === documentBody
      ) {
        documentElement.scrollBy({
          top: increment * -1,
          left: 0,
          behavior: "smooth",
        });
      }
      upScrollAnimation = setTimeout(function () {
        if (!isMobile) {
          window.requestIdleCallback(scrollToTop, {
            timeout: 150,
          });
        } else {
          window.requestAnimationFrame(scrollToTop);
        }
      }, interval);
    } else {
      clearTimeout(upScrollAnimation);
      if (options.autoScroll) options.autoScroll(false);
      if (options.elementClicked) options.elementClicked(0);
    }
  }

  function scrollToBottom() {
    if (!scrollingDown) {
      clearTimeout(downScrollAnimation);
      if (options.autoScroll) options.autoScroll(false);
      return;
    }

    if (autoScrollElement === documentBody) {
      if (hasScrollBar(documentElement, "vertical")) {
        autoScrollElement = documentElement;
      }
    }

    if (
      autoScrollElement.scrollTop &&
      autoScrollElement.offsetHeight + autoScrollElement.scrollTop >=
        autoScrollElement.scrollHeight
    )
      scrollingDown = false;

    if (scrollingDown) {
      var currentPosition = autoScrollElement.scrollTop;

      autoScrollElement.scrollBy({
        top: increment,
        left: 0,
        behavior: "smooth",
      });
      if (autoScrollElement.scrollTop === currentPosition) {
        autoScrollElement = documentElement;

        autoScrollElement.scrollBy({
          top: increment,
          left: 0,
          behavior: "smooth",
        });
      }

      downScrollAnimation = setTimeout(function () {
        if (!isMobile) {
          window.requestIdleCallback(scrollToBottom, {
            timeout: 100,
          });
        } else {
          window.requestAnimationFrame(scrollToBottom);
        }
      }, interval);
    } else {
      clearTimeout(downScrollAnimation);
      if (options.autoScroll) options.autoScroll(false);
      if (options.elementClicked) options.elementClicked(0);
    }
  }

  me.stopScroll = function () {
    clearTimeout(downScrollAnimation);
    clearTimeout(upScrollAnimation);

    if (scrollingDown || scrollingUp) {
      scrollingDown = false;
      scrollingUp = false;
    } else {
      return true;
    }
    if (options.autoScroll) options.autoScroll(false);
    if (options.elementClicked) options.elementClicked(0);
  };

  me.scrollRight = function (data) {
    var activeElement = getActiveElement(),
      scrollElement =
        activeElement.id === "waDropdown"
          ? activeElement
          : getScrollElement(activeElement, "horizontal");

    if (scrollElement) {
      if (data.elem) data.elem.focus();
      if (scrollElement.nodeName === "BODY") {
        window.focus();
        scrollBy(window, 100, 0);
      } else {
        scrollBy(scrollElement, 50, 0);
      }
    }
  };

  me.scrollLeft = function (data) {
    var activeElement = getActiveElement(),
      scrollElement =
        activeElement.id === "waDropdown"
          ? activeElement
          : getScrollElement(activeElement, "horizontal");

    if (scrollElement) {
      if (data.elem) data.elem.focus();
      if (scrollElement.nodeName === "BODY") {
        window.focus();
        scrollBy(window, -100, 0);
      } else {
        scrollBy(scrollElement, -50, 0);
      }
    }
  };

  me.pageDown = function (data) {
    if (currentURL.indexOf("https://www.youtube.com/shorts") > -1) {
      nextShort();
      return;
    }

    var activeElement = getActiveElement(),
      scrollElement =
        activeElement.id === "waDropdown"
          ? activeElement
          : getScrollElement(activeElement, "vertical"),
      currentPosition = scrollElement.scrollTop,
      height = 0;

    if (scrollElement) {
      if (scrollElement.nodeName === "BODY") {
        scrollBody(window.innerHeight);
        if (documentBody.scrollTop === currentPosition) {
          scrollBy(documentElement || documentBody, 0, window.innerHeight);
        }
      } else {
        height =
          scrollElement.offsetHeight > window.innerHeight ||
          !scrollElement.offsetHeight
            ? window.innerHeight
            : scrollElement.offsetHeight;
        scrollBy(scrollElement, 0, height);
        setTimeout(function () {
          if (currentPosition === scrollElement.scrollTop) {
            scrollBody(window.innerHeight);
          }
        }, 100);
      }
    }
  };

  function nextShort() {
    var el = document.querySelector('[aria-label="Next video"]');
    if (el) el.click();
  }

  function previousShort() {
    var el = document.querySelector('[aria-label="Previous video"]');
    if (el) el.click();
  }

  function scrollBody(interval) {
    window.focus();
    scrollBy(documentBody, 0, interval);
  }

  me.pageUp = function (data) {
    var activeElement = getActiveElement(),
      scrollElement =
        activeElement.id === "waDropdown"
          ? activeElement
          : getScrollElement(activeElement, "vertical"),
      currentPosition = scrollElement.scrollTop,
      height = 0;

    if (currentURL.indexOf("https://www.youtube.com/shorts") > -1) {
      previousShort();
      return;
    }

    if (scrollElement) {
      if (scrollElement.nodeName === "BODY") {
        scrollBody(-window.innerHeight);
        if (documentBody.scrollTop === currentPosition) {
          scrollBy(documentElement || documentBody, 0, -window.innerHeight);
        }
      } else {
        height =
          scrollElement.offsetHeight > window.innerHeight ||
          !scrollElement.offsetHeight
            ? window.innerHeight
            : scrollElement.offsetHeight;
        scrollBy(scrollElement, 0, -height);
        setTimeout(function () {
          if (currentPosition === scrollElement.scrollTop) {
            scrollBody(-window.innerHeight);
          }
        }, 100);
      }
    }
  };

  me.tab = function (data) {
    tabToElement(data.focusElements, 1);
  };

  me.tabBack = function (data) {
    tabToElement(data.focusElements, -1, data.document);
  };

  function tabToElement(focusableElements, direction) {
    var currentElem = null,
      elem = null,
      focusable = focusableElements,
      index = 0,
      currentIndex = 0;

    if (expander) {
      expander.hideDropdown();
      currentElem = expander.elem;
      expander = null;
    } else {
      currentElem = getActiveElement();
    }

    index = elem === documentBody ? 0 : focusable.indexOf(currentElem);
    currentIndex = getIndex(index, direction, focusable);

    elem = focusable[currentIndex];

    currentIndex = getIndex(focusable.indexOf(elem), direction, focusable);
    if (elem) focusElem(elem);

    //If the next element can't receive focus loop until a focusable element is found.

    while (
      elem !== getActiveElement() &&
      currentIndex < Math.abs(focusable.length) - 1
    ) {
      elem = focusable[currentIndex];
      currentIndex = getIndex(focusable.indexOf(elem), direction, focusable);
      if (elem.nodeName === "IFRAME") {
        currentIndex = getIndex(focusable.indexOf(elem), direction, focusable);
        elem = focusable[currentIndex];
        currentIndex = getIndex(focusable.indexOf(elem), direction, focusable);
      }
      focusElem(elem);
    }
    if (currentElem.nodeName !== "BODY") currentElem.blur();
    if (options.elementClicked) options.elementClicked(500);
  }

  function getIndex(index, direction, focusable) {
    if (direction === 1 && index >= focusable.length - 1) {
      return 0;
    } else if (direction === 1 && index === 0) {
      return 1;
    } else if (direction === -1 && index <= 0) {
      return focusable.length - 1;
    } else {
      return index + direction;
    }
  }

  function getParentNodeByAttribute(parentNode, attr, value, doc) {
    var currentValue = null;

    try {
      while (
        parentNode &&
        parentNode !== document.documentElement &&
        parentNode !== doc &&
        parentNode !== document.body
      ) {
        if (parentNode.nodeType === 1) {
          currentValue = parentNode.getAttribute(attr);
          if (currentValue && currentValue.indexOf(value) > -1) {
            return parentNode;
          }
        }
        parentNode = parentNode.parentNode;
      }
    } catch (e) {
      console.log("Parent attribute error");
    }

    return null;
  }

  function focusElem(elem) {
    if (elem.disabled == null || elem.disabled === false) {
      if (!isFocusElement(elem)) elem.tabIndex = 0;
      elem.focus();
      if (
        elem.getAttribute("type") === "textarea" ||
        elem.getAttribute("type") === "text" ||
        elem.getAttribute("type") === "search"
      ) {
        elem.select();
      }
    }
  }

  function isFocusElement(elem) {
    var nodeName = elem.nodeName;
    return (
      nodeName === "A" ||
      nodeName === "INPUT" ||
      nodeName === "BUTTON" ||
      nodeName === "TEXTAREA" ||
      elem.getAttribute("contenteditable") === true ||
      elem.getAttribute("tabindex") > -1 ||
      nodeName === "SELECT"
    );
  }

  //Checkbox element related commands
  me.checkboxCommands = function (data) {
    var elem = data.elem;

    if (
      elem.id === "ybarAccountMenuOpener" ||
      elem.id === "ybarNotificationMenu"
    ) {
      focusElem(elem.parentNode);
      if (options.elementClicked) options.elementClicked(0);
      return;
    }
    elem.click();
    if (options.elementClicked) options.elementClicked(0);
    focusElem(elem);
  };

  //Select element related commands
  me.openDropdown = function (data) {
    displayDropdown(data.elem);
  };

  var expander = null;
  function displayDropdown(elem) {
    elem.focus();
    expander = new selectExpander(elem);
    expander.displayDropdown();

    if (options.elementClicked) options.elementClicked(0);
  }

  //Move up and down list options
  me.moveDown = function () {
    var elem = document.getElementById("waDropdown"),
      value = "";

    if (elem) {
      value = getSelectValue(elem, 1);
      if (value) {
        expander.elem.value = value;
        me.fireEvent(expander.elem, "change");
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

  me.moveUp = function () {
    var elem = document.getElementById("waDropdown"),
      value = "";

    if (elem) {
      value = getSelectValue(elem, -1);
      if (value) {
        expander.elem.value = value;
        me.fireEvent(expander.elem, "change");
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

  function getSelectValue(elem, direction) {
    var dropdownOptions = elem.getElementsByTagName("span"),
      newPosition = 0;

    for (var i = 0; i < dropdownOptions.length; i++) {
      if (dropdownOptions[i].classList.contains("selected")) {
        newPosition = i + direction;
        if (newPosition >= 0 && newPosition < dropdownOptions.length) {
          dropdownOptions[i].classList.remove("selected");
          dropdownOptions[newPosition].classList.add("selected");
          return dropdownOptions[newPosition].getAttribute("data-value");
        }
      }
    }
  }

  me.selectOption = function (data) {
    var elem = data.elem,
      dropdown = document.getElementById("waDropdown"),
      text = "";

    text = "";

    if (dropdown) {
      if (data.dataURL) {
        window.location.href = data.dataURL;
        return;
      }
      if (!isOption(elem, data.optionText)) return true;
      //Amazon
      if (
        elem.getAttribute("aria-describedby") === "searchDropdownDescription"
      ) {
        text = data.optionText;
        document.getElementById("searchDropdownDescription").innerText = text;
        document.getElementById("nav-search-label-id").innerText = text;
        elem.value = data.optionValue;
      } else {
        elem.value = data.optionValue;
      }
      if (dropdown) {
        dropdown.value = data.optionValue;
        setSelected(elem, dropdown);
        me.fireEvent(dropdown, "change");
        expander.hideDropdown();
        expander = null;
      } else {
        elem.value = data.optionValue;
      }

      me.fireEvent(elem, "change");

      if (options.elementClicked) options.elementClicked(0);

      me.fireEvent(elem, "input");
    } else {
      return true;
    }
  };

  function isOption(elem, value) {
    for (var i = 0; i < elem.options.length; i++) {
      if (
        value === elem.options[i].value ||
        value === elem.options[i].innerText
      )
        return true;
    }
  }

  function setSelected(elem, dropdown) {
    var options = elem.options,
      dropdownOptions = dropdown.getElementsByTagName("span"),
      value = elem.value;

    for (var i = 0; i < options.length; i++) {
      if (options[i].value === value) {
        dropdownOptions[i].classList.add("selected");
      } else {
        dropdownOptions[i].classList.remove("selected");
      }
    }
  }
  //End select

  me.moveContainerLeft = function () {
    var el = document.getElementById("RedMicPage"),
      classList = el.classList;

    classList.remove("MicRight");
    if (classList.contains("MicLeft")) classList.remove("MicLeft");
    classList.add("MicLeft");
    el = document.getElementById("GreenMicPage");
    if (classList.contains("MicLeft")) classList.remove("MicRight");
    classList.remove("MicLeft");
    classList.add("MicLeft");
    el = document.getElementById("WebAssistContainer");
    classList.remove("webContainerRight");
    classList.remove("webContainerLeft");
    classList.add("webContainerLeft");
  };

  me.moveContainerRight = function () {
    var el = document.getElementById("RedMicPage"),
      classList = el.classList;

    if (classList.contains("MicRight")) classList.remove("MicRight");
    classList.remove("MicLeft");
    classList.add("MicRight");
    el = document.getElementById("GreenMicPage");
    if (classList.contains("MicRight")) classList.remove("MicRight");
    classList.remove("MicLeft");
    classList.add("MicRight");
    el = document.getElementById("WebAssistContainer");
    classList.remove("webContainerRight");
    classList.remove("webContainerLeft");
    classList.add("webContainerRight");
  };

  //Video element related commands
  me.videoCommands = function (data) {
    var playX = "",
      playY = "",
      video = getActiveVideo(),
      elem = null,
      secondURL = 0,
      videoButton = "",
      time = 0;

    if (currentURL.indexOf("foxnews.com") > -1) {
      if (options.onError) options.onError("nocommand");
      return true;
    }
    if (video) {
      if (!video.hasAttribute("tabindex")) video.tabIndex = 0;
    }
    var commandText = data.commandText;
    commandText = commandText === "play audio" ? "play video" : commandText;
    commandText = commandText === "pause audio" ? "pause video" : commandText;
    commandText = commandText === "stop audio" ? "stop video" : commandText;

    switch (commandText) {
      case "play video":
        if (video) {
          video.focus();
          if (video.nodeName === "IFRAME") {
            video.click();
            playY = isEncoded(video.src)
              ? decodeURIComponent(video.src)
              : video.src;
            playY = playY.replace("&&autoplay=1", "");
            playY = playY.replace("&autoplay=1", "");
            playY = playY.replace("&autoplay=0", "");
            playY = playY.replace("autoplay=0", "");
            playY = playY.replaceAll("autoplay=1", "");

            if (playY) {
              secondURL = getSecondPosition(playY, "http");
              playY = secondURL ? playY.substring(secondURL) : playY;
              if (secondURL > -1) playX = video.src.substring(0, secondURL);
              if (currentURL.indexOf("fandom.com") > -1) {
                if (options.onError) {
                  options.onError("nocommand");
                  return true;
                }
              } else {
                //"https://duckduckgo.com/video_frame?url=https://www.youtube-nocookie.com/embed/pxgsZTPlz8k?wmode=transparent&iv_load_policy=3&&html5=1&showinfo=0&rel=0&modestbranding=1&playsinline=0&theme=light"
                // video.src = 'https://www.youtube-nocookie.com/embed/pxgsZTPlz8k?wmode=transparent&iv_load_policy=3&&html5=1&showinfo=0&rel=0&modestbranding=1&playsinline=0&theme=light&&autoplay=1'            //    video.src = playY  + '&&autoplay=1';
                if (playY.indexOf("?") === -1) {
                  playY += "?";
                }
                video.removeAttribute("loading");
                video.src = playX + playY + "&autoplay=1";
              }
              setTimeout(() => {
                me.fireEvent(documentBody, "mousemove");
              }, 3000);
            }
          } else {
            if (video && video.paused === true) {
              try {
                video.play().catch((error) => {
                  if (error.name === "NotAllowedError") {
                    options.onError("screen");
                  }
                  // else {
                  //   options.onError('error');
                  // }
                });
              } catch (error) {
                options.onError("screen");
              }
            } else {
              return true;
            }
          }
        } else {
          options.sendCommandMessage("No detected media.");
          return true;
        }
        break;

      case "pause video":
        if (video) {
          video.focus();
          if (video.nodeName === "IFRAME") {
            playY = isEncoded(video.src)
              ? decodeURIComponent(video.src)
              : video.src;
            playY = playY.replaceAll("&&autoplay=1", "");
            playY = playY.replaceAll("autoplay=1", "");
            video.src = playY;
          } else {
            video.pause();
          }
        } else {
          options.sendCommandMessage("No detected media.");
          return true;
        }

        break;

      case "stop video":
        if (video) {
          video.focus();
          if (video.nodeName === "IFRAME") {
            playY = isEncoded(video.src)
              ? decodeURIComponent(video.src)
              : video.src;
            playY = playY.replaceAll("&&autoplay=1", "");
            playY = playY.replaceAll("autoplay=1", "");
            video.src = playY;
          } else {
            if (!isStreamingSource(video)) {
              video.pause();
              video.currentTime = 0;
            } else {
              video.pause();
            }
          }
        } else {
          options.sendCommandMessage("No detected media.");
          return true;
        }

        break;

      case "time *":
        time = getWildCardNumber(data, 1);
        if (time === 1) return true;
        if (video) {
          if (video.currentTime > 0) {
            setTimeout(() => {
              options.sendCommandMessage('Use the "go forward" command.');
              return true;
            }, 1000);
            return true;
          }
          if (video.nodeName === "IFRAME") {
            if (options.onError) options.onError("nocommand");
            return true;
          }
          video.currentTime = time;
        } else {
          postMessage("seek", { time: time });
        }
        break;

      case "go back *":
        time = getWildCardNumber(data, 2);
        if (time === 1) return true;
        if (video) {
          if (video.currentTime === 0) {
            setTimeout(() => {
              options.sendCommandMessage('Use the "time" command to advance');
              return true;
            }, 1000);
            return true;
          }

          if (video.nodeName === "IFRAME") {
            if (options.onError) options.onError("nocommand");
            return true;
          }
          video.currentTime = video.currentTime - time;
        } else {
          postMessage("back", { time: time });
        }
        break;

      case "go forward *":
        time = getWildCardNumber(data, 2);
        if (time === 1) return true;
        if (video) {
          if (video.currentTime === 0) {
            setTimeout(() => {
              options.sendCommandMessage('Use the "time" command to advance');
              return true;
            }, 1000);
            return true;
          }
          time = getWildCardNumber(data, 2);
          if (video.nodeName === "IFRAME") {
            if (options.onError) options.onError("nocommand");
            return true;
          }
          video.currentTime = video.currentTime + time;
        } else {
          postMessage("forward", { time: time });
        }
        break;

      case "full screen":
        if (video) {
          if (video.nodeName === "IFRAME") {
            if (options.onError) options.onError("nocommand");
            return true;
          }
          elem = fullScreenMatch() ? documentElement : video;

          try {
            elem.requestFullscreen().catch((err) => {
              return;
            });
          } catch (error) {
            return;
          }

          if (options.elementClicked) options.elementClicked(200);
        } else {
          options.sendCommandMessage("No detected media.");
          return true;
        }

        break;

      case "exit screen":
        if (video.nodeName === "IFRAME") {
          if (options.onError) options.onError("nocommand");
          return;
        }
        document.exitFullscreen();
        if (options.elementClicked) options.elementClicked(200);
        break;

      case "volume down":
        if (video.nodeName === "IFRAME") {
          if (options.onError) options.onError("nocommand");
          return true;
        }
        if (video.volume > 0.19) video.volume -= 0.2;
        break;

      case "volume up":
        if (video.nodeName === "IFRAME") {
          if (options.onError) options.onError("nocommand");
          return true;
        }
        if (video.volume < 0.81) video.volume += 0.2;
        break;

      case "mute video":
        if (video.nodeName === "IFRAME") {
          playY = video.src.replaceAll("mute=0", "mute=1");
          video.src = playY;
          return;
        }
        video.setAttribute("muted", "");
        video.muted = true;
        break;

      case "unmute video":
        if (video.nodeName === "IFRAME") {
          playY = video.src.replaceAll("mute=1", "mute=0");
          video.src = playY;
          return;
        }
        video.setAttribute("muted", "");
        video.muted = false;
        break;

      case "next video":
        //Handles netflix and youtube videos
        videoButton = document.querySelectorAll(
          '[aria-label="Next Episode"], [class*="ytp-next-button"]'
        )[0]; //getNextButton();
        if (videoButton) {
          data.elem = videoButton;
          elementClicked(videoButton, data);
        }
        break;

      case "restart video":
        //Handles netflix and youtube videos
        me.fireEvent(document.getElementsByTagName("video")[0], "mouseenter");
        videoButton = document.querySelector('[class*="ytp-prev-button"]');
        data.elem = videoButton;
        elementClicked(videoButton, data);
        break;
      //youtube
      case "skip ads":
        videoButton = document.querySelector('[class*="ytp-ad-skip-button"]');
        if (videoButton) {
          data.elem = videoButton;
          elementClicked(videoButton, data);
        }
        break;

      case "show video":
        me.hover({
          elem: video,
        });
        break;
    }
    if (options.elementClicked) options.elementClicked(300);
  };

  function isStreamingSource(videoElement) {
    const src = videoElement.srcObject;
    return src instanceof MediaStream || src instanceof MediaSourceHandle;
  }

  function getSecondPosition(str, subString) {
    return str.indexOf(subString, str.indexOf(subString) + 1);
  }

  function isEncoded(uri) {
    uri = uri || "";
    return uri !== decodeURIComponent(uri);
  }

  function getActiveVideo() {
    var videos = getVideos(),
      video = addYouTube();

    if (video) videos.push(video);
    for (let index = 0; index < videos.length; index++) {
      const video = videos[index];
      if (videoInViewPort(video)) {
        return video;
      }
    }
  }

  function videoInViewPort(el) {
    var rect = el.getBoundingClientRect();
    var top = rect.top,
      left = rect.left;
    return (
      (top || left || document.fullscreenElement) &&
      top < window.innerHeight &&
      (top > -50 || top + el.offsetHeight > 10) &&
      left < window.scrollX + window.innerWidth
    );
  }

  function getVideos() {
    var documents = wa.getDocuments(),
      doc = null,
      videos = [],
      allVideos = [];

    for (let index = 0; index < documents.length; index++) {
      doc = documents[index];
      videos =
        doc instanceof ShadowRoot
          ? getShadowElems(doc, "video, audio")
          : doc.querySelectorAll("video, audio");
      allVideos.push.apply(allVideos, videos);
    }

    return allVideos;
  }

  function addYouTube() {
    var frames = document.getElementsByTagName("iframe");

    for (var x = 0; x < frames.length; x++) {
      if (frames[x].src && frames[x].src.indexOf("www.youtube") > -1) {
        return frames[x];
      }
    }
  }

  function postMessage(action, params) {
    var frame = document.getElementById("speechFrame"),
      url = frame.src;
    frame.contentWindow.postMessage(
      JSON.stringify({
        action: action,
        host: window.location.href,
        options: options,
        params: params,
      }),
      url
    );
  }
  function fullScreenMatch() {
    return (
      currentURL.indexOf("youtube.com") > -1 ||
      currentURL.indexOf("tubi.com") > -1
    );
  }

  document.addEventListener("fullscreenchange", (event) => {
    if (document.fullscreenElement) {
      documentElement.style.overflow = "hidden";
      documentElement.style.overflowX = "hidden";
      documentElement.style.overflowY = "hidden";
      documentBody.style.overflow = "hidden";
      documentBody.style.overflowX = "hidden";
      documentBody.style.overflowY = "hidden";
    } else {
      documentElement.style.overflow = "auto";
      documentElement.style.overflowX = "auto";
      documentElement.style.overflowY = "auto";
      documentBody.style.overflow = "auto";
      documentBody.style.overflowX = "auto";
      documentBody.style.overflowY = "auto";
    }
  });

  //Browser related commands
  me.goBack = function () {
    var elem = document.fullscreenElement;

    if (elem) elem.exitFullscreen();
    window.history.back();
    if (currentURL.indexOf("facebook.com") > -1) documentElement.focus();
    if (options.elementClicked) options.elementClicked(2000);
  };

  me.goForward = function () {
    var elem = document.fullscreenElement;

    if (elem) elem.exitFullscreen();
    window.history.forward();
    if (currentURL.indexOf("facebook.com")) documentElement.focus();
    if (options.elementClicked) options.elementClicked(2000);
  };

  me.reload = function () {
    location.reload();
  };

  me.clickPage = function () {
    if (document.activeElement) document.activeElement.blur();
    if (!documentBody.tabIndex || documentBody.tabIndex < 0)
      documentBody.tabIndex = 0;
    documentBody.focus();

    me.fireEvent(documentBody, "mouseover");
    me.fireEvent(documentBody, "mouseenter");
    me.fireEvent(documentBody, "mousemove");
    me.fireEvent(documentBody, "mouseup");

    documentBody.click();

    if (!documentElement.tabIndex || documentElement.tabIndex < 0)
      documentElement.tabIndex = 0;
    documentElement.focus();

    me.fireEvent(documentElement, "mouseover");
    me.fireEvent(documentElement, "mouseenter");
    me.fireEvent(documentElement, "mousemove");
    me.fireEvent(documentElement, "mouseup");

    documentElement.click();
    if (options.elementClicked) options.elementClicked(0);
  };

  me.fireEvent = function (node, eventName) {
    var event = new Event(eventName, {
      bubbles: true,
      cancelable: false,
    });
    node.dispatchEvent(event);
  };

  me.underlineCommands = function (data) {
    try {
      var commands = wa.getWebCommands(),
        element = null,
        elemValue = "";

      for (let index = 0; index < commands.length; index++) {
        element = commands[index].elem;
        if (element) elemValue = element.innerText || element.value;
        if (element && elemValue) {
          element.style.textDecoration = "underline";
        }
      }
    } catch (error) {
      console.log("underline error " + error.message);
    }
  };

  me.hideCommands = function (data) {
    try {
      var commands = wa.getWebCommands(),
        element = null,
        elemValue = "";

      for (let index = 0; index < commands.length; index++) {
        element = commands[index].elem;
        if (element) elemValue = element.innerText || element.value;
        if (element && elemValue) {
          element.style.textDecoration = null;
        }
      }
    } catch (error) {
      console.log("hide commands " + error.message);
    }
  };

  //Dictation related functions
  me.moveLeft = function (data) {
    var elem = wa.dictationElement ? wa.dictationElement : getActiveElement(),
      steps = 0,
      textArray = null;

    if (
      currentURL.indexOf("chatgpt.com") === -1 &&
      currentURL.indexOf("linkedin.com") === -1 &&
      ((elem.hasAttribute("contenteditable") &&
        (currentURL.indexOf("facebook") > -1 ||
          currentURL.indexOf("reddit") > -1)) ||
        elem.getElementsByTagName("*").length)
    ) {
      if (options.onError) options.onError("nocommand");
      setTimeout(() => {
        if (elem) elem.focus();
      }, 3000);
      return true;
    }
    if (
      elem.getAttribute("type") === "text" ||
      elem.nodeName.toLowerCase() === "textfield" ||
      elem.hasAttribute("contenteditable") ||
      elem.nodeName.toLowerCase() === "textarea" ||
      elem.getAttribute("type") === "search"
    ) {
      data.transcript = removePunctuation(data.transcript).toLowerCase();
      steps = getWildCardNumber(data, 2) * -1;
      if (steps) {
        //Make sure transcript matches command
        textArray = data.commandText.split(" ");
        data.transcript =
          textArray[0] + " " + textArray[1] + " " + Math.abs(steps);
        moveCaret(elem, steps);
      } else {
        data.transcript = textArray[0] + " " + textArray[1] + " " + 1;
        moveCaret(elem, -1);
      }
    } else if (elem.getAttribute("type") === "range") {
      steps = getWildCardNumber(data, 2);
      if (steps) {
        setRange(elem, steps * -1);
        data.transcript = data.commandText.replace("*", steps);
      } else {
        setRange(elem, -1);
        data.transcript = data.commandText.replace("*", 1);
      }
    } else {
      setTimeout(() => {
        if (options.onError) options.onError("nocommand");
      }, 3000);
      return true;
    }
  };

  function setRange(elem, steps) {
    var valueStep = elem.getAttribute("steps"),
      step = valueStep ? valueStep * steps : steps;

    if (isNegative(step)) {
      step = Math.abs(step);
      elem.stepDown(step);
    } else {
      elem.stepUp(step);
    }
    fireInputEvents(elem);
  }

  function isNegative(val) {
    return Math.sign(val) > -1 ? false : true;
  }

  function getWildCardNumber(data, minLength) {
    data.transcript = removePunctuation(data.transcript).toLowerCase();
    var integer = 0,
      text = checkForNumbers(data.transcript, data.transcript.split(" ")),
      textArray = text.split(" ");

    if (textArray.length > minLength) {
      if (isInteger(textArray[minLength])) {
        integer = parseInt(textArray[minLength]);
      } else {
        integer = me.getIntegerFromWords(textArray[minLength]);
        if (!integer) return 1;
      }
    } else {
      integer = 1;
    }

    return integer;
  }

  me.moveRight = function (data) {
    var elem = wa.dictationElement ? wa.dictationElement : getActiveElement(),
      steps = 0,
      textArray = null;

    if (
      currentURL.indexOf("chatgpt.com") === -1 &&
      currentURL.indexOf("linkedin.com") === -1 &&
      ((elem.hasAttribute("contenteditable") &&
        (currentURL.indexOf("facebook") > -1 ||
          currentURL.indexOf("reddit") > -1)) ||
        elem.getElementsByTagName("*").length)
    ) {
      if (options.onError) options.onError("nocommand");
      setTimeout(() => {
        if (elem) elem.focus();
      }, 3000);
      return true;
    }

    if (
      elem.hasAttribute("contenteditable") ||
      elem.nodeName.toLowerCase() === "textfield" ||
      elem.getAttribute("type") === "text" ||
      elem.nodeName.toLowerCase() === "textarea" ||
      elem.getAttribute("type") === "search"
    ) {
      data.transcript = removePunctuation(data.transcript).toLowerCase();
      steps = getWildCardNumber(data, 2);
      if (steps) {
        //Make sure transcript matches command
        moveCaret(elem, steps);
        textArray = data.commandText.split(" ");
        data.transcript = textArray[0] + " " + textArray[1] + " " + steps;
      } else {
        moveCaret(elem, 1);
        data.transcript = textArray[0] + " " + textArray[1] + " " + 1;
      }
    } else if (elem.getAttribute("type") === "range") {
      steps = getWildCardNumber(data, 2);
      if (steps) {
        setRange(elem, steps);
        data.transcript = data.commandText.replace("*", steps);
      } else {
        setRange(elem, 1);
        data.transcript = data.commandText.replace("*", 1);
      }
    } else {
      setTimeout(() => {
        if (options.onError) options.onError("nocommand");
      }, 3000);
      return true;
    }
  };

  function isInteger(str) {
    return /^\+?(0|[1-9]\d*)$/.test(str);
  }

  function moveCaret(elem, direction) {
    var pos = getCursorPosition(elem) + direction;
    if (!activeUndo) activeUndo = new waUndo(elem, setActiveUndo, options);
    activeUndo.setCursorPos(pos, elem);
  }

  function getCursorPosition(el) {
    var start = 0,
      normalizedValue = 0,
      range = null,
      textInputRange = null,
      len = 0,
      endRange = null;

    if (
      typeof el.selectionStart == "number" &&
      typeof el.selectionEnd == "number"
    ) {
      start = el.selectionStart;
    } else if (el.hasAttribute("contenteditable")) {
      start = contentEditable.getCaretPosition(el);
    } else {
      if (!document.selection) return 1;
      range = document.selection.createRange();
      if (range && range.parentElement() == el) {
        len = el.value.length;
        normalizedValue = el.value.replace(/\r\n/g, "\n");
        // Create a working TextRange that lives only in the input
        textInputRange = el.createTextRange();
        textInputRange.moveToBookmark(range.getBookmark());
        // Check if the start and end of the selection are at the very end
        // of the input, since moveStart/moveEnd doesn't return what we want
        // in those cases
        endRange = el.createTextRange();
        endRange.collapse(false);
        if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
          start = len;
        } else {
          start = -textInputRange.moveStart("character", -len);
          start += normalizedValue.slice(0, start).split("\n").length - 1;
        }
      }
    }
    return start;
  }

  //Moves cursor to beginning or end of an element's text (e.g. textarea)
  me.home = function () {
    var elem = wa.dictationElement ? wa.dictationElement : getActiveElement();
    if (
      currentURL.indexOf("chatgpt.com") === -1 &&
      currentURL.indexOf("linkedin.com") === -1 &&
      ((elem.hasAttribute("contenteditable") &&
        (currentURL.indexOf("facebook") > -1 ||
          currentURL.indexOf("reddit") > -1)) ||
        elem.getElementsByTagName("*").length)
    ) {
      if (options.onError) options.onError("nocommand");
      setTimeout(() => {
        if (elem) elem.focus();
      }, 3000);
      return true;
    }

    if (!activeUndo) activeUndo = new waUndo(elem, setActiveUndo, options);
    if (
      elem.getAttribute("type") === "textfield" ||
      elem.getAttribute("type") === "text" ||
      elem.nodeName.toLowerCase() === "textarea" ||
      elem.getAttribute("type") === "search" ||
      elem.getAttribute("contenteditable") === "true"
    ) {
      //The element's undo object is used to keep track of cursor position
      activeUndo.setCursorPos(0, elem);
    } else {
      setTimeout(() => {
        if (options.onError) options.onError("nocommand");
      }, 3000);
      return true;
    }
  };

  me.end = function () {
    var elem = wa.dictationElement ? wa.dictationElement : getActiveElement();
    if (
      currentURL.indexOf("chatgpt.com") === -1 &&
      currentURL.indexOf("linkedin.com") === -1 &&
      ((elem.hasAttribute("contenteditable") &&
        (currentURL.indexOf("facebook") > -1 ||
          currentURL.indexOf("reddit") > -1)) ||
        elem.getElementsByTagName("*").length)
    ) {
      if (options.onError) options.onError("nocommand");
      setTimeout(() => {
        if (elem) elem.focus();
      }, 3000);
      return true;
    }

    if (!activeUndo) activeUndo = new waUndo(elem, setActiveUndo, options);
    if (
      elem.getAttribute("type") === "text" ||
      elem.getAttribute("type") === "textfield" ||
      elem.nodeName.toLowerCase() === "textarea" ||
      elem.getAttribute("type") === "search"
    ) {
      activeUndo.setCursorPos(getElemValue(elem).length, elem);
    } else if (elem.getAttribute("contenteditable") === "true") {
      setEndOfContenteditable(elem);
    } else {
      setTimeout(() => {
        if (options.onError) options.onError("nocommand");
      }, 3000);
      return true;
    }
  };

  function setEndOfContenteditable(contentEditableElement) {
    activeUndo.setCursorPos(
      contentEditableElement.innerText.length,
      contentEditableElement
    );
  }

  var currentGoToInd = 0,
    currentGoToText = "";
  //Moves the cursor to the beginning of the text specified by the user.
  me.goTo = function (data) {
    var elem = wa.dictationElement ? wa.dictationElement : getActiveElement();
    if (
      currentURL.indexOf("chatgpt.com") === -1 &&
      currentURL.indexOf("linkedin.com") === -1 &&
      ((elem.hasAttribute("contenteditable") &&
        (currentURL.indexOf("facebook") > -1 ||
          currentURL.indexOf("reddit") > -1)) ||
        elem.getElementsByTagName("*").length)
    ) {
      if (options.onError) options.onError("nocommand");
      setTimeout(() => {
        if (elem) elem.focus();
      }, 3000);
      return true;
    }

    if (
      elem.getAttribute("type") === "text" ||
      elem.hasAttribute("contenteditable") ||
      elem.nodeName.toLowerCase() === "textarea" ||
      elem.getAttribute("type") === "textfield" ||
      elem.getAttribute("type") === "search"
    ) {
      currentGoToInd = 0;
      data.transcript = removePunctuation(data.transcript).toLowerCase();
      currentGoToText = getWildCardText(data);
      return moveCursor(elem, 0);
    } else {
      if (options.onError) options.onError("nocommand");
      return true;
    }
  };

  me.goToNext = function (data) {
    var elem = wa.dictationElement ? wa.dictationElement : getActiveElement();
    if (
      currentURL.indexOf("chatgpt.com") === -1 &&
      currentURL.indexOf("linkedin.com") === -1 &&
      ((elem.hasAttribute("contenteditable") &&
        (currentURL.indexOf("facebook") > -1 ||
          currentURL.indexOf("reddit") > -1)) ||
        elem.getElementsByTagName("*").length)
    ) {
      if (options.onError) options.onError("nocommand");
      setTimeout(() => {
        if (elem) elem.focus();
      }, 3000);
      return true;
    }

    if (
      elem.getAttribute("type") === "text" ||
      elem.getAttribute("type") === "textfield" ||
      elem.nodeName.toLowerCase() === "textarea" ||
      elem.getAttribute("type") === "search" ||
      elem.getAttribute("contenteditable") === "true"
    ) {
      moveCursor(elem, 1);
    } else {
      return true;
    }
  };

  function checkForNumbers(text, words) {
    var number = 0,
      len = words.length;

    text = text.trim();
    for (var i = 0; i < len; i++) {
      number = me.getIntegerFromWords(words[i]);
      if (number) {
        text = text.replace(words[i], number);
        break;
      }
    }
    return text;
  }

  function getWildCardText(data) {
    var elem = wa.dictationElement ? wa.dictationElement : getActiveElement();
    var commandText = checkForNumbers(
        data.commandText.replace("*", ""),
        data.commandText.split(" ")
      ),
      transcript = checkForNumbers(
        data.transcript,
        data.transcript.split(" ")
      ).toLowerCase();
    var length = elem.hasAttribute("contenteditable")
        ? commandText.length + 1
        : commandText.length,
      textStart = transcript.indexOf(commandText),
      start = textStart + length;

    return transcript.substring(start).trim();
  }

  function moveCursor(elem, next) {
    var re = "\\b" + escapeRegExp(currentGoToText.toLowerCase()) + "\\b";

    currentGoToInd = regexIndexOf(
      getElemValue(elem).toLowerCase(),
      re,
      currentGoToInd + next
    );
    if (currentGoToInd > -1) {
      if (!activeUndo) activeUndo = new waUndo(elem, setActiveUndo, options);
      activeUndo.setCursorPos(currentGoToInd, elem);
    } else {
      return true;
    }
  }

  var currentHighlightInd = 0,
    currentHighlightText = "";

  //Highlights the text specified by the user.
  me.highlight = function (data) {
    var elem = wa.dictationElement ? wa.dictationElement : getActiveElement();

    if (elem.hasAttribute("contenteditable")) {
      if (options.onError) options.onError("nocommand");
      setTimeout(() => {
        if (elem) elem.focus();
      }, 3000);
      return true;
    }

    currentHighlightInd = 0;
    currentHighlightText = getWildCardText(data);
    if (
      elem.getAttribute("type") === "text" ||
      elem.getAttribute("type") === "textfield" ||
      elem.nodeName.toLowerCase() === "textarea" ||
      elem.getAttribute("type") === "search"
    ) {
      data.transcript = removePunctuation(data.transcript).toLowerCase();

      return highlightText(elem, 0);
    } else if (elem.hasAttribute("contenteditable")) {
      currentHighlightText =
        removePunctuation(currentHighlightText).toLowerCase();
      contentEditable.findAndSelectText(elem, currentHighlightText, 0);
    } else {
      return true;
    }
  };

  me.highlightNext = function (data) {
    var elem = wa.dictationElement ? wa.dictationElement : getActiveElement();

    if (
      (elem.hasAttribute("contenteditable") &&
        (currentURL.indexOf("facebook") > -1 ||
          currentURL.indexOf("reddit") > -1)) ||
      elem.getElementsByTagName("P").length ||
      elem.getElementsByTagName("DIV").length
    ) {
      if (options.onError) options.onError("nocommand");
      setTimeout(() => {
        if (elem) elem.focus();
      }, 3000);
      return true;
    }

    currentHighlightInd = currentHighlightInd + 1;
    if (
      elem.getAttribute("type") === "text" ||
      elem.hasAttribute("contenteditable") ||
      elem.getAttribute("type") === "textfield" ||
      elem.nodeName.toLowerCase() === "textarea" ||
      elem.getAttribute("type") === "search"
    ) {
      return highlightText(elem, currentHighlightInd);
    } else if (elem.hasAttribute("contenteditable")) {
      currentHighlightText =
        removePunctuation(currentHighlightText).toLowerCase();
      contentEditable.findAndSelectText(
        elem,
        currentHighlightText,
        currentHighlightInd
      );
    } else {
      if (options.onError) options.onError("nocommand");
      return true;
    }
  };

  function highlightText(elem, next) {
    var elemText = escapeRegExp(getElemValue(elem).toLowerCase().trim()),
      re = escapeRegExp(currentHighlightText.toLowerCase()),
      win = elem.ownerDocument.defaultView,
      sel = win.getSelection(),
      range = null,
      endOffset = 0,
      offset = 0;

    // currentHighlightInd = regexIndexOf(' ' + elemText.toLowerCase() + ' ', ' ' + re + ' ', currentHighlightInd + next);
    currentHighlightInd = regexIndexOf(
      elemText.toLowerCase(),
      re,
      currentHighlightInd + next
    );
    if (currentHighlightInd > -1) {
      if (elem.hasAttribute("contenteditable")) {
        activeUndo.setCursorPos(currentHighlightInd, elem);
        range = sel.getRangeAt(0);
        offset = range.startOffset === 0 ? 0 : range.startOffset;
        endOffset = offset === 0 ? 0 : offset;
        if (elem.innerHTML.length > elem.innerHTML.trim().length) {
          endOffset += 1;
          offset += 1;
        }
        sel.setBaseAndExtent(
          elem.firstChild,
          offset,
          elem.lastChild,
          endOffset + currentHighlightText.length
        );
      } else if (elem.setSelectionRange) {
        sel.removeAllRanges();
        elem.setSelectionRange(
          currentHighlightInd,
          currentHighlightText.length + currentHighlightInd
        );
      }
    } else {
      return true;
    }
  }

  function regexIndexOf(text, re, i) {
    var indexInSuffix = text.slice(i).search(re);
    return indexInSuffix < 0 ? indexInSuffix : indexInSuffix + i;
  }

  function escapeRegExp(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, " ");
  }

  //Highlights all text
  me.highlightAll = function () {
    var elem = wa.dictationElement ? wa.dictationElement : getActiveElement();

    if (
      elem.getAttribute("type") === "text" ||
      elem.getAttribute("type") === "textfield" ||
      elem.nodeName.toLowerCase() === "textarea" ||
      elem.getAttribute("type") === "search"
    ) {
      elem.select();
    } else if (elem.getAttribute("contenteditable") === "true") {
      selectContentEditable(elem);
    } else {
      setTimeout(() => {
        if (options.onError) options.onError("nocommand");
      }, 3000);
      return true;
    }
  };

  function selectContentEditable(elem) {
    var range, selection, win;

    if (document.body.createTextRange) {
      range = document.body.createTextRange();
      range.moveToElementText(elem);
      range.select();
    } else if (window.getSelection) {
      win = elem.ownerDocument.defaultView;
      selection = win.getSelection();
      range = document.createRange();
      range.selectNodeContents(elem);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  me.unHighlight = function () {
    var elem = wa.dictationElement ? wa.dictationElement : getActiveElement();
    if (
      (elem && elem.getAttribute("type") === "text") ||
      elem.hasAttribute("contenteditable") ||
      elem.getAttribute("type") === "textfield" ||
      elem.nodeName.toLowerCase() === "textarea" ||
      elem.getAttribute("type") === "search"
    ) {
      if (window.getSelection) {
        window.getSelection().removeAllRanges();
      } else if (document.selection) {
        document.selection.empty();
      }
      me.end();
    } else {
      return true;
    }
  };

  //Emulates pressing backspace key
  me.backspace = function (data) {
    var elem = wa.dictationElement ? wa.dictationElement : getActiveElement(),
      steps = 0;

    if (
      currentURL.indexOf("chatgpt.com") === -1 &&
      currentURL.indexOf("linkedin.com") === -1 &&
      ((elem.hasAttribute("contenteditable") &&
        (currentURL.indexOf("facebook") > -1 ||
          currentURL.indexOf("reddit") > -1)) ||
        elem.getElementsByTagName("*").length)
    ) {
      if (options.onError) options.onError("nocommand");
      setTimeout(() => {
        if (elem) elem.focus();
      }, 3000);
      return true;
    }

    if (elem) {
      if (
        (elem.nodeName.toLowerCase() === "input" &&
          (elem.getAttribute("type") !== "email" ||
            elem.getAttribute("type") !== "number")) ||
        elem.nodeName.toLowerCase() === "textarea" ||
        elem.getAttribute("contenteditable") === "true"
      ) {
        //This is a wildcard command that can contain the number of times to go back (e.g 'backspace 5')
        data.transcript = removePunctuation(data.transcript).toLowerCase();
        steps = getWildCardNumber(data, 1);
        if (steps) {
          removeCharacter(elem, -1, steps);
          data.transcript = data.commandText.replace("*", steps);
          if (options.elementClicked) options.elementClicked(100);
        } else {
          removeCharacter(elem, -1, 1);
          data.transcript = data.commandText.replace("*", 1);
          if (options.elementClicked) options.elementClicked(100);
        }
      } else {
        setTimeout(() => {
          if (options.onError) options.onError("nocommand");
        }, 3000);
        return true;
      }
    }
  };

  //Emulates pressing the delete key
  me.delete = function (data) {
    var elem = wa.dictationElement ? wa.dictationElement : getActiveElement();

    if (
      currentURL.indexOf("chatgpt.com") === -1 &&
      currentURL.indexOf("linkedin.com") === -1 &&
      ((elem.hasAttribute("contenteditable") &&
        (currentURL.indexOf("facebook") > -1 ||
          currentURL.indexOf("reddit") > -1)) ||
        elem.getElementsByTagName("*").length)
    ) {
      if (options.onError) options.onError("nocommand");
      setTimeout(() => {
        if (elem) elem.focus();
      }, 3000);
      return true;
    }

    if (elem) {
      if (
        (elem.nodeName.toLowerCase() === "input" &&
          (elem.getAttribute("type") !== "email" ||
            elem.getAttribute("type") !== "number")) ||
        elem.nodeName.toLowerCase() === "textarea" ||
        elem.getAttribute("contenteditable") === "true"
      ) {
        //This is a wildcard command that can contain the number of characters to delete (e.g 'delete 5')
        data.transcript = removePunctuation(data.transcript).toLowerCase();
        var steps = getWildCardNumber(data, 1);

        if (steps) {
          removeCharacter(elem, 1, steps);
          data.transcript = data.commandText.replace("*", steps);
          if (options.elementClicked) options.elementClicked(100);
        } else {
          removeCharacter(elem, 1, 1);
          data.transcript = data.commandText.replace("*", 1);
          if (options.elementClicked) options.elementClicked(100);
        }
      } else {
        setTimeout(() => {
          if (options.onError) options.onError("nocommand");
        }, 3000);
        return true;
      }
    }
  };

  function removeCharacter(elem, direction, steps) {
    var currentPos = elem.getAttribute("contenteditable")
        ? contentEditable.getCaretPosition(elem)
        : getCursorPosition(elem),
      text = getElemValue(elem),
      movePos = 0,
      sel = null;

    if (elem.getAttribute("contenteditable")) sel = window.getSelection();

    if (elem.selectionStart != elem.selectionEnd) {
      // check if the user has selected some text inside field
      text =
        text.substr(0, elem.selectionStart) + text.substr(elem.selectionEnd);
    } else if (sel && sel.toString().length) {
      text =
        text.substr(0, sel.baseOffset - 1) +
        text.substr(sel.baseOffset + sel.toString().length);
      currentPos = sel.baseOffset - 1;
    } else {
      if (direction === -1) {
        currentPos = currentPos > text.length ? currentPos - 1 : currentPos;
        text =
          text.substr(0, currentPos - steps) +
          text.substr(currentPos, text.length);
        movePos = -Math.abs(steps);
      } else {
        text =
          text.substr(0, currentPos) +
          text.substr(currentPos + steps, text.length);
      }
    }
    setElemValue(elem, text);
    resetCursor(elem, currentPos + movePos);
    fireInputEvents(elem);
  }

  function fireInputEvents(activeElement) {
    me.fireEvent(activeElement, "keydown");
    me.fireEvent(activeElement, "keyup");
    me.fireEvent(activeElement, "keypress");
    me.fireEvent(activeElement, "change");
    me.fireEvent(activeElement, "input");
  }
  function getElemValue(elem) {
    if (
      elem.nodeName.toLowerCase() === "input" ||
      elem.nodeName.toLowerCase() === "textarea"
    ) {
      return elem.value;
    } else {
      var innerText = elem.innerText;

      if (innerText[innerText.length - 1] === "\n")
        innerText = innerText.slice(0, -1); // get rid of weird extra newline
      return innerText;
    }
  }
  function resetCursor(txtElement, currentPos) {
    var range = null;

    if (txtElement.setSelectionRange) {
      txtElement.focus();
      txtElement.setSelectionRange(currentPos, currentPos);
    } else if (txtElement.createTextRange) {
      range = txtElement.createTextRange();
      range.moveStart("character", currentPos);
      range.select();
    } else if (txtElement.getAttribute("contenteditable")) {
      contentEditable.setCaretPosition(txtElement, currentPos);
    }
  }

  //Capitalizes highlighted text
  me.capitalize = function () {
    var elem = wa.dictationElement,
      elemValue = "",
      selectedText = "";

    if (elem) {
      if (
        elem.nodeName.toLowerCase() === "input" ||
        elem.nodeName.toLowerCase() === "textarea" ||
        elem.hasAttribute("contenteditable")
      ) {
        elemValue = getElemValue(elem);
        selectedText = getHighlightedText(elem, elemValue);
        if (!selectedText) return;
        setElemValue(
          elem,
          elemValue.replace(selectedText, capitalize(selectedText))
        );
        activeUndo.setCursorPos(getElemValue(elem).length, elem);
        me.fireEvent(elem, "input");
        me.fireEvent(elem, "change");
      } else {
        return true;
      }
    }
  };

  //Converts all of the highlighted text to uppercase.
  me.upperCase = function () {
    var elem = wa.dictationElement,
      elemValue = "",
      selectedText = "";

    if (elem) {
      if (
        elem.nodeName.toLowerCase() === "input" ||
        elem.nodeName.toLowerCase() === "textarea" ||
        elem.hasAttribute("contenteditable")
      ) {
        elemValue = getElemValue(elem);
        selectedText = getHighlightedText(elem, elemValue);
        if (!selectedText) return;
        setElemValue(
          elem,
          elemValue.replace(selectedText, selectedText.toUpperCase())
        );
        activeUndo.setCursorPos(getElemValue(elem).length, elem);
        me.fireEvent(elem, "input");
        me.fireEvent(elem, "change");
        return;
      }
    }
  };

  //Converts all of the highlighted text to lowercase.
  me.lowerCase = function () {
    var elem = wa.dictationElement,
      elemValue = "",
      selectedText = "";

    if (elem) {
      if (
        elem.nodeName.toLowerCase() === "input" ||
        elem.nodeName.toLowerCase() === "textarea" ||
        elem.hasAttribute("contenteditable")
      ) {
        elemValue = getElemValue(elem);
        selectedText = getHighlightedText(elem, elemValue);
        if (!selectedText) return;
        setElemValue(
          elem,
          elemValue.replace(selectedText, selectedText.toLowerCase())
        );
        activeUndo.setCursorPos(getElemValue(elem).length, elem);
        me.fireEvent(elem, "input");
        me.fireEvent(elem, "change");
      } else {
        return true;
      }
    }
  };

  function getHighlightedText(elem, elemValue) {
    if (elem.hasAttribute("contenteditable")) {
      var win = elem.ownerDocument.defaultView,
        sel = win.getSelection();

      return elemValue.substring(
        sel.baseOffset,
        sel.baseOffset + sel.toString().length
      );
    } else {
      return elemValue.substring(elem.selectionStart, elem.selectionEnd);
    }
  }

  // This is a wildcard command that takes the letters spelled out by the user and returns the text
  //with the spaces removed
  me.spellWord = function (data) {
    var elem = wa.dictationElement,
      commandText = "",
      prefix = "";

    if (elem) {
      if (
        elem.nodeName.toLowerCase() === "input" ||
        elem.nodeName.toLowerCase() === "textarea" ||
        elem.getAttribute("contenteditable") === "true"
      ) {
        data.transcript = removePunctuation(data.transcript).toLowerCase();
        commandText = getWildCardText(data);
        prefix = getElemValue(elem).trim() ? " " : "";
        if (
          (commandText && elem.getAttribute("type") === "email") ||
          commandText.indexOf(".") === commandText.length - 4
        )
          commandText = commandText
            .toLowerCase()
            .replace(" at ", "@")
            .replace(" dot ", ".")
            .toLowerCase();
        commandText = removeInnerSpaces(commandText);
        updateValue(elem, prefix + commandText);
        if (options.elementClicked) options.elementClicked(100);
      } else {
        return true;
      }
    }
  };

  me.convertNumber = function (data) {
    var elem = wa.dictationElement,
      commandText = "",
      prefix = "";

    if (elem) {
      if (
        elem.nodeName.toLowerCase() === "input" ||
        elem.nodeName.toLowerCase() === "textarea" ||
        elem.getAttribute("contenteditable") === "true"
      ) {
        commandText = getWildCardNumber(data, 1);
        if (!Number.isInteger(commandText)) return true;
        prefix = getElemValue(elem).trim() ? " " : "";
        commandText = commandText.toString().replaceAll(" ", "");
        updateValue(elem, prefix + commandText);
        data.transcript = data.commandText.replace("*", commandText);
        if (options.elementClicked) options.elementClicked(100);
      } else {
        return true;
      }
    }
  };
  // function needsCase(elemValue, myValue, pos) {
  //   var testValue = '';
  //   if (!pos) return true;
  //   if (pos < elemValue.length && pos > 2 && (myValue.length > 1 ||
  //     myValue.trim().substring(0, 0).toLowerCase() !== 'i')) {
  //     testValue = testValue.substring(pos - 2, pos);
  //     if (!/[.!?]$/.test(testValue)) {
  //       return false;
  //     }
  //   }
  //   if (!/[.!?]$/.test(elemValue.substring(0, pos).trim()) && (myValue.length > 1 ||
  //     myValue.trim().substring(0, 0).toLowerCase() !== 'i') && elemValue.length) {
  //     return false;
  //   }
  //   return true;
  // }

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // function insertTextAtCaret(element, text) {
  //   var sel, win, range, pos;

  //   if (window.getSelection) {
  //     win = element.ownerDocument.defaultView;
  //     sel = win.getSelection();
  //     if (sel.getRangeAt && sel.rangeCount) {
  //       if (!sel.baseOffset) text.trim();
  //       pos = sel.toString().length
  //         ? sel.baseOffset + text.length
  //         : contentEditable.getCaretPosition(element) + text.length;
  //       range = sel.getRangeAt(0);
  //       range.deleteContents();
  //       range.insertNode(element.ownerDocument.createTextNode(text));
  //     }
  //   } else if (
  //     element.ownerDocument.selection &&
  //     element.ownerDocument.selection.createRange
  //   ) {
  //     element.ownerDocument.selection.createRange().text = text;
  //     pos = text.length;
  //   }

  //   fireInputEvents(element);
  //   activeUndo.setCursorPos(pos, element);
  // }

  function insertTextAtCaret(element, text) {
    var sel, win, range, pos, newText, length;

    if (window.getSelection) {
      win = element.ownerDocument.defaultView;
      sel = win.getSelection();

      if (sel.getRangeAt && sel.rangeCount) {
        newText = text.trim();
        length = newText.length;
        // Determine cursor position based on selection or caret position
        pos = sel.toString().length
          ? sel.baseOffset + text.length - 1
          : contentEditable.getCaretPosition(element);

        // Adjust position if needed
        if (length === 1) {
          if (text.length - length < 2) {
            pos = pos + length;
          } else {
            pos = pos + text.length;
          }
        } else {
          if (!sel.toString().length) pos = pos + text.length;
        }

        range = sel.getRangeAt(0);
        // Add the new range to the selection object
        sel.addRange(range);
        text = sel.toString().length ? newText : text;
        //  range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(element.ownerDocument.createTextNode(text));
        fireInputEvents(element);
        // Set the caret position
        if (pos >= element.innerText.length) {
          activeUndo.setCursorPos(element.innerText.length, element);
        } else {
          activeUndo.setCursorPos(pos, element);
        }

        // Adjust the selection to the end of the inserted text
        const selection = window.getSelection();
        const newRange = document.createRange();

        newRange.setStart(element.lastChild, element.lastChild.length);
        newRange.collapse(true);

        // Clear previous ranges and set the new one
        selection.removeAllRanges();
        selection.addRange(newRange);
      }
    } else if (
      element.ownerDocument.selection &&
      element.ownerDocument.selection.createRange
    ) {
      // Fallback for older browsers like IE
      element.ownerDocument.selection.createRange().text = text;
    }
  }
  function setElemValue(elem, value) {
    var span = null,
      div = null,
      para = null;

    if (
      elem.nodeName.toLowerCase() === "input" ||
      elem.nodeName.toLowerCase() === "textarea"
    ) {
      if (elem.type === "range" || elem.type === "number") value = value.trim();
      elem.value = value;
    } else {
      if (
        currentURL.indexOf("twitter") > -1 &&
        elem.getAttribute("contenteditable") &&
        elem.getAttribute("role") === "textbox"
      ) {
        span = elem.querySelector("SPAN");
        if (span)
          span.innerHTML = '<span data-text="true">' + value + "</span>";
      } else if (
        currentURL.indexOf("pinterest") > -1 &&
        elem.getAttribute("contenteditable") &&
        elem.getAttribute("role") === "combobox"
      ) {
        span = elem.querySelector("SPAN");
        if (span) {
          div = document.getElementsByClassName(
            "public-DraftEditorPlaceholder-inner"
          );
          if (div.length) div[0].innerText = "";
          span.innerHTML = '<span data-text="true">' + value + "</span>";
        }
      } else if (
        currentURL.indexOf("linkedin") > -1 &&
        elem.getAttribute("contenteditable") &&
        elem.getAttribute("class") &&
        elem.getAttribute("class").indexOf("ql-editor") > -1
      ) {
        para = elem.querySelector("P");
        if (para) para.innerHTML = value;
      } else {
        elem.innerHTML = value;
      }
    }
  }

  function removeInnerSpaces(text) {
    return text.split(" ").join("");
  }

  function insertAtCursor(elem, myValue) {
    //IE support
    var elemValue = getElemValue(elem);

    if (document.selection) {
      elem.focus();
      var sel = document.selection.createRange();
      sel.text = myValue;
    } //MOZILLA and others
    else if (elem.selectionStart || elem.selectionStart == "0") {
      var startPos = elem.selectionStart,
        endPos = elem.selectionEnd;

      elemValue =
        elemValue.substring(0, startPos) +
        myValue +
        elemValue.substring(endPos, elemValue.length);
      setElemValue(elem, elemValue);
      elem.selectionStart = startPos + myValue.length;
      elem.selectionEnd = startPos + myValue.length;
    } else {
      elemValue += myValue;
      setElemValue(elem, elemValue);
    }
  }

  //Clears sll text from element
  me.clearAll = function () {
    var elem = wa.dictationElement;

    if (elem) {
      if (
        elem.nodeName.toLowerCase() === "input" ||
        elem.nodeName.toLowerCase() === "textarea" ||
        elem.getAttribute("contenteditable") === "true"
      ) {
        setElemValue(elem, "");
        me.fireEvent(elem, "input");
        me.fireEvent(elem, "change");
      } else {
        return true;
      }
      if (options.elementClicked) options.elementClicked(1000);
    }
  };

  me.insertEmail = function (data) {
    var elem = wa.dictationElement;

    if (elem) {
      if (
        elem.nodeName.toLowerCase() === "input" ||
        elem.nodeName.toLowerCase() === "textarea" ||
        elem.getAttribute("contenteditable") === "true"
      ) {
        data.transcript = removePunctuation(data.transcript).toLowerCase();
        var commandText = getWildCardText(data),
          prefix = getElemValue(elem).trim() ? " " : "";

        commandText = commandText
          .replace(" at", "@")
          .replace(" dot", ".")
          .replace(" at ", "@")
          .replace(" dot ", ".")
          .replaceAll(" ", "")
          .toLowerCase();
        commandText = removeInnerSpaces(commandText);
        // elem.getAttribute('contenteditable') === 'true' ? updateValue(elem, prefix + commandText) : insertAtCursor(elem, prefix + commandText);
        updateValue(elem, prefix + commandText);
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

  me.addSpace = function (data) {
    var transcript = " " + data.transcript.trim().toLowerCase() + " ";
    return transcript.replaceAll(
      " " + data.commandText.toLowerCase() + " ",
      data.replacementText
    );
  };

  me.openShortcut = function (data) {
    if (!wa.paid) return true;
    var url = formatURL(data.URL);
    window.location.href = url;
  };

  me.insertTemplate = function (data) {
    var elem = wa.dictationElement;
    if (!wa.paid) return true;
    if (elem) {
      if (
        elem.nodeName.toLowerCase() === "input" ||
        elem.nodeName.toLowerCase() === "textarea" ||
        elem.getAttribute("contenteditable") === "true"
      ) {
        updateValue(elem, data.text);
        if (options.elementClicked) options.elementClicked(100);
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

  var currentText = "";
  me.copy = function () {
    var elem = document.activeElement;

    if (elem && elem.id === "notes" && !selectedText()) elem.select();

    try {
      document.execCommand("copy");
    } catch (error) {
      currentText = selectedText();
      document.body.focus();
      navigator.clipboard
        .writeText(currentText)
        .then(() => {
          elem.focus();
          setTimeout(() => {
            options.sendCommandMessage("Text copied");
          }, 1000);
        })
        .catch(() => {});
    }
  };

  function selectedText() {
    var text = "";

    if (window.getSelection) text = window.getSelection().toString();
    return text;
  }

  me.paste = function () {
    var activeElement = getActiveElement();

    if (
      (activeElement && activeElement.nodeName.toLowerCase() === "input") ||
      activeElement.nodeName.toLowerCase() === "textarea" ||
      activeElement.getAttribute("contenteditable") === "true"
    ) {
      try {
        document.execCommand("paste");
      } catch (error) {
        if (currentText) {
          if (activeElement.hasAttribute("contenteditable")) {
            insertTextAtCaret(activeElement, currentText);
          } else {
            insertAtCursor(activeElement, currentText);
          }
        } else {
          document.body.focus();
          navigator.clipboard.readText().then(
            function (text) {
              if (activeElement.hasAttribute("contenteditable")) {
                insertTextAtCaret(activeElement, text);
              } else {
                insertAtCursor(activeElement, text);
              }
              activeElement.focus();
            },
            (err) => document.execCommand("paste")
          );
        }
        currentText = "";
      }
    }
  };

  function updateValue(elem, myValue) {
    var elemValue = getElemValue(elem),
      valueLength = 0;

    if (document.selection) {
      var sel = document.selection.createRange();

      sel.text = myValue.trim();
      fireInputEvents(elem);
    } else if (elem.selectionStart || elem.selectionStart === 0) {
      var startPos = elem.selectionStart,
        endPos = elem.selectionEnd,
        previousCharacter =
          startPos === 0 ? "" : elemValue.substring(startPos - 1, startPos);

      myValue =
        (myValue.length > 1 && elem.selectionStart) || myValue === " "
          ? myValue
          : myValue.trim();
      myValue =
        !previousCharacter || previousCharacter === " "
          ? myValue
          : " " + myValue;
      elemValue =
        elemValue.substring(0, startPos) +
        myValue +
        elemValue.substring(endPos, elemValue.length);

      setElemValue(elem, elemValue);

      valueLength = myValue.length ? myValue.length : 1;
      if (myValue.length === 3 && myValue.trim().length === 1) valueLength -= 1;
      elem.selectionStart = startPos + valueLength;
      elem.selectionEnd = startPos + valueLength;
      fireInputEvents(elem);
    } else if (elem.getAttribute("contenteditable")) {
      insertTextAtCaret(elem, myValue);
    } else {
      setElemValue(elem, myValue);
      fireInputEvents(elem);
    }
  }

  function removePunctuation(text) {
    text = text.replace("-", "");
    return text.replace(/[?!.,]+$/, "");
  }

  //This is function that convert the commands to symbols and other text.
  me.replaceCommandText = function (data) {
    var transcript = " " + data.transcript.trim(),
      //  commandText = ' ' + data.commandText + ' ',
      commandText = " " + data.commandText,
      re = new RegExp(commandText, "ig"),
      elem = data.element;

    //  transcript = removePunctuation(transcript).toLowerCase();
    // transcript = replaceCommandPunct(transcript, commandText).toLowerCase();
    if (
      transcript.trim() === "new line" &&
      elem.hasAttribute("contenteditable")
    ) {
      if (options.onError) options.onError("nocommand");

      setTimeout(() => {
        if (elem) elem.focus();
      }, 3000);

      return "";
    }
    transcript = transcript.replaceAll(re, data.replacementText);
    transcript =
      transcript.trim().length <= 1 ||
      data.transcript.toLowerCase().indexOf(" face") > -1
        ? transcript
        : transcript.trim();
    return transcript;
  };

  function replaceAll(retString, strReplace, strWith) {
    return retString.replace(new RegExp(strReplace, "ig"), strWith);
  }

  //The undo objects are added to certain elements that accept user input. Each object tracks the changes in
  // text and the cursor position at the time of the change
  var activeUndo = null;

  me.undo = function () {
    if (!activeUndo) {
      setTimeout(() => {
        if (options.onError) options.onError("nocommand");
        return;
      }, 3000);
      return true;
    }
    var elem = wa.dictationElement ? wa.dictationElement : getActiveElement();

    if (
      currentURL.indexOf("chatgpt.com") === -1 &&
      currentURL.indexOf("linkedin.com") === -1 &&
      ((elem.hasAttribute("contenteditable") &&
        (currentURL.indexOf("facebook") > -1 ||
          currentURL.indexOf("reddit") > -1)) ||
        elem.getElementsByTagName("*").length)
    ) {
      if (options.onError) options.onError("nocommand");
      setTimeout(() => {
        if (elem) elem.focus();
      }, 3000);
      return true;
    }

    activeUndo.undo();
    if (options.elementClicked) options.elementClicked(1000);
  };

  me.redo = function () {
    if (!activeUndo) {
      setTimeout(() => {
        if (options.onError) options.onError("nocommand");
        return;
      }, 3000);
      return true;
    }
    var elem = wa.dictationElement ? wa.dictationElement : getActiveElement();

    if (
      currentURL.indexOf("chatgpt.com") === -1 &&
      currentURL.indexOf("linkedin.com") === -1 &&
      ((elem.hasAttribute("contenteditable") &&
        (currentURL.indexOf("facebook") > -1 ||
          currentURL.indexOf("reddit") > -1)) ||
        elem.getElementsByTagName("*").length)
    ) {
      if (options.onError) options.onError("nocommand");
      setTimeout(() => {
        if (elem) elem.focus();
      }, 3000);
      return true;
    }

    activeUndo.redo();

    if (options.elementClicked) options.elementClicked(1000);
  };

  var inputUndos = [];
  me.initializeInputUndos = function (doc) {
    var selector =
        "[contenteditable=true]:not([undoElement]), input:not([type=number]):not([type=time]):not([type=datetime-local]):not([type=date]):not([type=datetime]):not([undoElement]), textarea:not([undoElement])",
      inputs =
        doc instanceof ShadowRoot
          ? getShadowElems(doc, selector)
          : doc.querySelectorAll(selector);

    inputs.forEach(function (input) {
      input.setAttribute("undoElement", "true");
      inputUndos.push(new waUndo(input, setActiveUndo, options));
    });
  };

  function getShadowElems(root, selector) {
    var childNodes = Array.from(root.childNodes),
      elemArray = [];

    childNodes.forEach((childNode) => {
      if (childNode.querySelectorAll)
        elemArray.push.apply(
          elemArray,
          Array.from(childNode.querySelectorAll(selector))
        );
    });
    return elemArray;
  }

  function setActiveUndo(activeObj) {
    activeUndo = activeObj;
  }
  //End Dictation
  function isEdgeBrowser() {
    return /Edg/.test(navigator.userAgent);
  }

  var small = {
    zero: 0,
    won: 1,
    one: 1,
    first: 1,
    two: 2,
    second: 2,
    to: 2,
    too: 2,
    three: 3,
    third: 3,
    for: 4,
    four: 4,
    fourth: 4,
    five: 5,
    fifth: 5,
    six: 6,
    sixth: 6,
    seven: 7,
    seventh: 7,
    eight: 8,
    eighth: 8,
    ate: 8,
    nine: 9,
    ninth: 9,
    nein: 9,
    ten: 10,
    tin: 10,
    tenth: 10,
    eleven: 11,
    eleventh: 11,
    twelve: 12,
    twelfth: 12,
    thirteen: 13,
    thirteenth: 13,
    fourteen: 14,
    fourteenth: 14,
    fifteen: 15,
    fifteenth: 15,
    sixteen: 16,
    sixteenth: 16,
    seventeen: 17,
    seventeenth: 17,
    eighteen: 18,
    eighteenth: 18,
    nineteen: 19,
    nineteenth: 19,
    twenty: 20,
    twentieth: 20,
    "twenty-one": 21,
    "twenty-first": 21,
    "twenty-two": 22,
    "twenty-second": 22,
    "twenty-three": 23,
    "twenty-third": 23,
    "twenty-four": 24,
    "twenty-fourth": 24,
    "twenty-five": 25,
    "twenty-fifth": 25,
    "twenty-six": 26,
    "twenty-sixth": 26,
    "twenty-seven": 27,
    "twenty-seventh": 27,
    "twenty-eight": 28,
    "twenty-eighth": 28,
    "twenty-nine": 29,
    "twenty-ninth": 29,
    thirty: 30,
    thirtieth: 30,
    "thirty-one": 31,
    "thirty-first": 31,
    "thirty-two": 32,
    "thirty-three": 33,
    "thirty-four": 34,
    "thirty-five": 35,
    "thirty-six": 36,
    "thirty-seven": 37,
    "thirty-eight": 38,
    "thirty-nine": 39,
    forty: 40,
    "forty-one": 41,
    "forty-two": 42,
    "forty-three": 43,
    "forty-four": 44,
    "forty-five": 45,
    "forty-six": 46,
    "forty-seven": 47,
    "forty-eight": 48,
    "forty-nine": 49,
    fifty: 50,
    "fifty-one": 51,
    "fifty-two": 52,
    "fifty-three": 53,
    "fifty-four": 54,
    "fifty-five": 55,
    "fifty-six": 56,
    "fifty-seven": 57,
    "fifty-eight": 58,
    "fifty-nine": 59,
    sixty: 60,
    "sixty-one": 61,
    "sixty-two": 62,
    "sixty-three": 63,
    "sixty-four": 64,
    "sixty-five": 65,
    "sixty-six": 66,
    "sixty-seven": 67,
    "sixty-eight": 68,
    "sixty-nine": 69,
    seventy: 70,
    "seventy-one": 71,
    "seventy-two": 72,
    "seventy-three": 73,
    "seventy-four": 74,
    "seventy-five": 75,
    "seventy-six": 76,
    "seventy-seven": 77,
    "seventy-eight": 78,
    "seventy-nine": 79,
    eighty: 80,
    "eighty-one": 81,
    "eighty-two": 82,
    "eighty-three": 83,
    "eighty-four": 84,
    "eighty-five": 85,
    "eighty-six": 86,
    "eighty-seven": 87,
    "eighty-eight": 88,
    "eighty-nine": 89,
    ninety: 90,
    "ninety-one": 91,
    "ninety-two": 92,
    "ninety-three": 93,
    "ninety-four": 94,
    "ninety-five": 95,
    "ninety-six": 96,
    "ninety-seven": 97,
    "ninety-eight": 98,
    "ninety-nine": 99,
  };

  var Magnitude = {
    thousand: 1000,
    million: 1000000,
    billion: 1000000000,
    trillion: 1000000000000,
    quadrillion: 1000000000000000,
    quintillion: 1000000000000000000,
    sextillion: 1000000000000000000000,
    septillion: 1000000000000000000000000,
    octillion: 1000000000000000000000000000,
    nonillion: 1000000000000000000000000000000,
    decillion: 1000000000000000000000000000000000,
  };

  me.getIntegerFromWords = function (text) {
    return convertText(text.replace(" and ", " ").split(/[\s-]+/));
  };

  function convertText(words) {
    var n = 0,
      g = 0,
      x = "",
      result = "";

    words.forEach(function (w) {
      x = small[w];
      if (x != null) {
        g = g + x;
      } else if (w == "hundred") {
        g = g * 100;
      } else {
        x = Magnitude[w];
        if (x != null) {
          n = n + g * x;
          g = 0;
        } else {
          return "";
        }
      }
    });
    result = n + g;
    return result === "00" || result === 0 ? "" : result;
  }

  me.testWeb = function (data) {
    console.log("test web");
  };

  //Chrome
  me.newTab = function () {
    var url = /Edg/.test(navigator.userAgent)
      ? "https://www.bing.com"
      : "https://www.google.com";

    chrome.runtime.sendMessage(
      {
        action: "new tab",
      },
      function () {
        window.open(url, "_blank");
      }
    );
  };

  me.openTab = function (data) {
    data.transcript = removePunctuation(data.transcript).toLowerCase();
    var url = getWildCardText(data).trim();
    url = formatURL(url);

    if (isValidUrl(url)) {
      data.transcript = url;
      chrome.runtime.sendMessage(
        {
          action: "open",
          URL: url,
        },
        function () {
          window.open(url, "_blank");
        }
      );
    } else {
      return true;
    }
  };

  me.selectTab = function (data) {
    if (!containsNumbers(data.transcript)) return true;
    var index = getWildCardNumber(data, 1);
    data.transcript = data.commandText.replace("*", index);
    chrome.runtime.sendMessage(
      {
        action: "select tab",
        index: index,
      },
      function () {}
    );
  };

  function containsNumbers(inputString) {
    return /\d/.test(inputString);
  }

  me.lastTab = function () {
    chrome.runtime.sendMessage(
      {
        action: "last tab",
      },
      function () {}
    );
  };

  me.nextTab = function () {
    chrome.runtime.sendMessage(
      {
        action: "next tab",
      },
      function () {}
    );
  };

  me.previousTab = function () {
    chrome.runtime.sendMessage(
      {
        action: "previous tab",
      },
      function () {}
    );
  };

  me.closeTab = function () {
    chrome.runtime.sendMessage(
      {
        action: "close tab",
      },
      function () {}
    );
  };

  // me.speakText = function() {
  //   var elem = getActiveElement(),
  //   utterance = null,
  //  voice = window.speechSynthesis.getVoices()[2];;
  //   if (elem && elem !== document.body && elem !== documentElement && elem.innerText) {
  //      utterance = new SpeechSynthesisUtterance(elem.innerText);

  //   } else {
  //     utterance = new SpeechSynthesisUtterance('There is no text in this element.');
  //   }
  //  utterance.voice = voice;
  //     speechSynthesis.speak(utterance);
  // }

  me.bookmarkPage = function (data) {
    chrome.runtime.sendMessage(
      {
        action: "bookmark",
        url: window.location.href,
        title: document.title,
      },
      function () {}
    );
  };

  me.removeBookmark = function () {
    chrome.runtime.sendMessage(
      {
        action: "remove bookmark",
        url: window.location.href,
      },
      function () {}
    );
  };

  me.zoomIn = function (data) {
    zoomIn();
  };

  me.zoomOut = function (data) {
    zoomOut();
  };

  me.resetZoom = function (data) {
    resetZoom();
  };

  // Reset zoom function
  function resetZoom() {
    documentBody.style.zoom = "";
    if (options.elementClicked) options.elementClicked(100);
  }

  function zoomIn() {
    var currentZoom = parseFloat(documentBody.style.zoom) || 1,
      newZoom = currentZoom + 0.15;

    documentBody.style.zoom = newZoom.toString();
    if (options.elementClicked) options.elementClicked(1000);
  }

  // Zoom out function
  function zoomOut() {
    var currentZoom = parseFloat(documentBody.style.zoom) || 1,
      newZoom = currentZoom - 0.15;

    documentBody.style.zoom = newZoom.toString();
    if (options.elementClicked) options.elementClicked(1000);
  }

  //My shortcuts;
  var modal = null,
    currentCommand = "";

  me.addShortcut = function (data) {
    if (!wa.paid) return true;
    var html = getAddShortcutHTML(),
      options = {
        html: html,
        title: "New Shortcut",
        confirmID: "waConfirmModal",
        showClose: true,
        onShow: initializeShortcut,
        onConfirm: addShortcut,
        onClose: onClose,
      };

    modal = modal ? modal : new modalWindow();
    modal.show(options);
    wa.setModal(true);
  };

  function initializeShortcut() {
    var elURL = modal.shadowDocument.getElementById("waURL");
    elURL.value = window.location.href;
    setCommandFocus();
    if (options.elementClicked) options.elementClicked(300);
  }

  function setCommandFocus() {
    setTimeout(() => {
      var elCommand = modal.shadowDocument.getElementById("commandName");
      if (elCommand) {
        elCommand.focus();
        if (elCommand.value) elCommand.select();
      }
    }, 2000);
  }

  function addShortcut() {
    var url = modal.shadowDocument.getElementById("waURL"),
      command = modal.shadowDocument.getElementById("commandName"),
      urlValue = url.value.toLowerCase().trim(),
      commandValue = command.value.toLowerCase();

    if (urlValue) urlValue = formatURL(urlValue);
    if (urlValue && isValidUrl(urlValue) && commandValue) {
      chrome.storage.sync.get(null, function (items) {
        for (let key in items) {
          if (items.hasOwnProperty(key)) {
            if (items[key].commandText === commandValue) {
              // Save the record to chrome.storage.sync
              command.focus();
              setTimeout(() => {
                command.select();
                options.sendCommandMessage("This command already exists.");
              }, 1250);
              return;
            }
          }
        }

        addShortcutRecord(commandValue, urlValue, url, command);
      });
    } else {
      validateShortcut(url, command, commandValue);
    }
  }

  function validateShortcut(url, command, commandValue) {
    if (!commandValue) {
      setTimeout(() => {
        options.sendCommandMessage("You must enter the command name.");
      }, 2000);
      command.focus();
    } else {
      setTimeout(() => {
        options.sendCommandMessage("You must enter a valid URL.");
      }, 2000);
      url.focus();
      url.select();
    }
  }

  function addShortcutRecord(commandValue, urlValue, url, command) {
    const record = {
        url: urlValue,
        commandText: commandValue,
        type: "shortcuts",
      },
      key = commandValue.toLowerCase();

    chrome.storage.sync.set({ [key]: record }, function () {
      modal.hide();
    });
    url.value = "";
    command.value = "";
  }

  function getAddShortcutHTML() {
    return '<div id="addShortcut" class="form-container"><form action="#"><div class="form-group"><label for="commandName">Command Name:</label><input tabIndex=1 type="text" id="commandName" name="commandName"></div><div class="form-group"><label for="waURL">URL:</label><input tabIndex=2" type="text" id="waURL" name="url"></div><div class="form-group"><input id="waConfirmModal" tabIndex=3 type="button" value="Submit"></div></form></div>';
  }

  me.displayShortcuts = function (data) {
    if (!wa.paid) return true;
    loadItems("shortcuts");
    if (options.elementClicked) options.elementClicked(300);
  };

  function displayItems(items, type) {
    var div = document.createElement("div"),
      title = "My " + sentenceCase(type);

    modal = modal ? modal : new modalWindow();
    div.appendChild(items);
    var options = {
      html: div.innerHTML,
      onShow: showItems,
      title: title,
      showClose: true,
      onClose: onClose,
    };
    modal.show(options);
    wa.setModal(true);
  }

  function showItems() {
    var items = modal.shadowDocument.getElementById("waItems");
    if (items) items.focus();
    items.style.outline = "#c3e6f4";
  }

  function loadItems(type) {
    var elItems = document.createElement("select");
    elItems.multiple = true;
    elItems.style.width = "400px";
    elItems.style.height = "100%";
    elItems.style.minHeight = "500px";
    elItems.style.maxHeight = "600px";
    elItems.tabIndex = 0;
    elItems.style.overflow = "auto";
    elItems.id = "waItems";
    elItems.size = 10;
    getItemsStorage(elItems, type);
  }

  // Convert the items object to an array
  function getItemsStorage(elItems, type) {
    chrome.storage.sync.get(null, function (items) {
      var option = null,
        commandText = "",
        itemsArray = Object.keys(items).map(function (key) {
          return items[key];
        });
      elItems.innerHTML = "";
      // Filter the array to only include items . a commandName property
      itemsArray = itemsArray.filter(function (item) {
        return item.hasOwnProperty("commandText") && item.type === type;
      });

      // Sort the array by commandText
      itemsArray = itemsArray.sort(function (a, b) {
        if (a.commandText < b.commandText) return -1;
        if (a.commandText > b.commandText) return 1;
        return 0;
      });

      // Iterate over the sorted array
      for (let item of itemsArray) {
        commandText = item.commandText;
        if (commandText) {
          option = document.createElement("option");
          option.value = commandText;
          option.textContent = sentenceCase(commandText);
          elItems.appendChild(option);
        }
      }
      displayItems(elItems, type);
    });
  }

  function sentenceCase(str) {
    return str.replace(/[a-z]/i, function (letter) {
      if (/^[a-zA-Z]+$/.test(letter)) {
        return letter.toUpperCase();
      } else {
        return letter;
      }
    });
  }

  me.editItem = function (data) {
    if (!wa.paid) return true;
    data.transcript = removePunctuation(data.transcript).toLowerCase();
    var command = getWildCardText(data);
    currentCommand = command;
    chrome.storage.sync.get(null, function (items) {
      var commandText = "";

      for (let key in items) {
        if (items.hasOwnProperty(key)) {
          commandText = items[key].commandText;
          if (commandText === currentCommand) {
            loadItem(items[key].type);
          }
        }
      }
    });
    return true;
  };

  function loadItem(type, data) {
    var html = "";

    if (type === "shortcuts") {
      html = getAddShortcutHTML();
    } else if (type === "templates") {
      html = getAddTemplateHTML();
    }

    var options = {
      html: html,
      title: "Update Item",
      confirmID: "waConfirmModal",
      showClose: true,
      onShow: setCommandFocus,
      onConfirm: updateItem,
      onClose: onClose,
    };

    if (currentCommand.trim().length === 0) return true;

    modal = modal ? modal : new modalWindow();
    modal.show(options);
    wa.setModal(true);

    setTimeout(() => {
      setEditItem(type);
    }, 100);
  }

  function setEditItem(type) {
    if (options.elementClicked) options.elementClicked();
    chrome.storage.sync.get(null, function (items) {
      var commandText = "",
        elCommand = null;

      for (let key in items) {
        if (items.hasOwnProperty(key)) {
          commandText = items[key].commandText;
          if (commandText === currentCommand) {
            elCommand = modal.shadowDocument.getElementById("commandName");
            elCommand.value = commandText;
            if (type === "shortcuts") {
              modal.shadowDocument.getElementById("waURL").value =
                items[key].url;
            } else if ((items[key], type === "templates")) {
              modal.shadowDocument.getElementById("waTemplateText").value =
                items[key].text;
            }
            return;
          }
        }
      }

      modal.hide();
      setTimeout(() => {
        if (options.sendCommandMessage)
          options.sendCommandMessage("This command does not exist.");
      }, 0);
    });
  }

  async function updateItem() {
    chrome.storage.sync.get(null, function (items) {
      var commandText = "";

      for (let key in items) {
        if (items.hasOwnProperty(key)) {
          commandText = items[key].commandText;
          if (commandText === currentCommand) {
            getItem(items[key].type);
          }
        }
      }
    });
  }

  function getItem(type) {
    chrome.storage.sync.get(null, function (items) {
      var commandText = "";

      for (let key in items) {
        if (items.hasOwnProperty(key)) {
          commandText = items[key].commandText;
          if (commandText === currentCommand) {
            if (type === "shortcuts") {
              chrome.storage.sync.remove(key, function () {
                addShortcut();
              });
            } else if (type === "templates") {
              chrome.storage.sync.remove(key, function () {
                addTemplate();
              });
            }
            break;
          }
        }
      }
      if (modal && modal.shadowDocument) {
        var elItems = modal.shadowDocument.getElementById("waItems");
        if (elItems)
          setTimeout(() => {
            getItemsStorage(elItems);
          }, 200);
      }
    });
  }

  me.removeItem = function (data) {
    data.transcript = removePunctuation(data.transcript).toLowerCase();
    var commandName = getWildCardText(data);
    if (commandName.trim().length === 0) return true;
    deleteItem(commandName);
  };

  function deleteItem(command) {
    chrome.storage.sync.get(null, function (items) {
      var commandText = "";

      for (let key in items) {
        if (items.hasOwnProperty(key)) {
          commandText = items[key].commandText;
          if (commandText === command) {
            chrome.storage.sync.remove(key, function () {});
            if (modal) me.hideItems();
          }
        }
      }
    });
  }

  function onClose() {
    wa.setModal(false);
    if (options.elementClicked) options.elementClicked(50);
  }

  //Templates
  me.addTemplate = function (data) {
    if (!wa.paid) return true;
    var html = getAddTemplateHTML(),
      options = {
        html: html,
        title: "New Template",
        confirmID: "waConfirmModal",
        showClose: true,
        onShow: initializeTemplate,
        onConfirm: addTemplate,
        onClose: onClose,
      };

    modal = modal ? modal : new modalWindow();
    modal.show(options);
    wa.setModal(true);
  };

  function initializeTemplate() {
    if (options.elementClicked) options.elementClicked(200);
    setCommandFocus();
  }

  function addTemplate() {
    var text = modal.shadowDocument.getElementById("waTemplateText"),
      command = modal.shadowDocument.getElementById("commandName"),
      textValue = text.value,
      commandValue = command.value.toLowerCase();

    if (textValue && commandValue) {
      chrome.storage.sync.get(null, function (items) {
        for (let key in items) {
          if (items.hasOwnProperty(key)) {
            if (items[key].commandText === commandValue) {
              // Save the record to chrome.storage.sync
              command.focus();
              setTimeout(() => {
                command.select();
                options.sendCommandMessage("This command already exists.");
              }, 1250);
              return;
            }
          }
        }

        addTemplateRecord(commandValue, textValue, text, command);
      });
    } else {
      validateTemplate(commandValue, command, text);
    }
  }

  function validateTemplate(commandValue, command, text) {
    if (!commandValue) {
      setTimeout(() => {
        options.sendCommandMessage("You must enter the command name.");
      }, 2000);
      command.focus();
    } else {
      setTimeout(() => {
        options.sendCommandMessage("You must enter some text.");
      }, 2000);
      text.focus();
    }
  }

  function addTemplateRecord(commandValue, textValue, text, command) {
    const record = {
        text: textValue,
        commandText: commandValue,
        type: "templates",
      },
      key = commandValue.toLowerCase();

    chrome.storage.sync.set({ [key]: record }, function () {
      modal.hide();
    });
    text.value = "";
    command.value = "";
  }

  function getAddTemplateHTML() {
    return '<div id="addTemplate" class="form-container"><form action="#"><div class="form-group"><label for="commandName">Command Name:</label><input tabIndex=1 type="text" id="commandName" name="commandName"></div><div class="form-group"><label for="waTemplateText">Text:</label><textarea tabIndex=2" id="waTemplateText"></textarea></div><div class="form-group"><input id="waConfirmModal" tabIndex=3 type="button" value="Submit"></div></form></div>';
  }

  me.displayTemplates = function (data) {
    if (!wa.paid) return true;
    loadItems("templates");
    if (options.elementClicked) options.elementClicked(200);
    // modal.show(html, 'Templates', null, true, false, '');
  };

  me.hideItems = function (data) {
    modal.hide();
  };

  //   me.searchHistory = function (data) {
  //     searchHistory('llm', processHistory);
  //   }

  //   function processHistory(history) {
  //   alert(history.length);

  //   }

  //   function searchHistory(searchText, callback) {
  //     // Query object to filter history results
  //     var searchQuery = {
  //         text: searchText,
  //         maxResults: 10 // Maximum number of results to retrieve
  //     };

  //     // Search history using chrome.history API
  //     chrome.history.search(searchQuery, function(historyItems) {
  //         // Pass the history items to the callback function
  //         callback(historyItems);
  //     });
  // }
  //End Shortcuts

  me.zoomIn = function (data) {
    zoomIn();
  };

  me.zoomOut = function (data) {
    zoomOut();
  };

  me.resetZoom = function (data) {
    resetZoom();
  };

  function isValidUrl(str) {
    const pattern = new RegExp(
      "^([a-zA-Z]+:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IP (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$", // fragment locator
      "i"
    );
    return pattern.test(str);
  }
  // function isValidUrl(string) {
  //   try {
  //     var url = new URL(string);
  //     return true;
  //   } catch (err) {
  //     return false;
  //   }
  // }
};

//There are the functions associated with the Shortcut feature

//The undo object tracks changes to the elements value and the cursor position at the time of the change
//and allows user to undo and redo changes they have made

var waUndo = function (elem, setActiveUndo, options) {
  var me = this,
    contentEditable = new ContentEditableUtils$1();

  me.currentInd = 0;

  me.elem = elem;
  //This array of objects contains the tracked changes.
  me.changeItems = [];

  me.setCursorPos = function (pos, elem) {
    pos = pos < 1 ? 0 : pos;

    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos);
    } else if (elem.getAttribute("contenteditable") === "true") {
      contentEditable.setCaretPosition(elem, pos);
    } else if (elem.createTextRange) {
      var range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd("character", pos);
      range.moveStart("character", pos);
      range.select();
    }
    me.changeItems[me.currentInd].cursorPosition = pos;
  };

  me.changeCursorPos = function (pos) {
    var changeItem = me.changeItems[me.currentInd],
      newItem = {
        value: changeItem.value,
        cursorPosition: pos,
      };

    Object.assign(changeItem, newItem);
  };

  me.undo = function () {
    if (me.changeItems.length > 1 && me.currentInd > 0) {
      me.currentInd -= 1;
      setElemValue(elem, me.changeItems[me.currentInd].value);
      if (!elem.hasAttribute("contenteditable")) {
        me.setCursorPos(me.changeItems[me.currentInd].cursorPosition, elem);
      } else {
        me.setCursorPos(me.changeItems[me.currentInd].cursorPosition, elem);
      }
    }
  };

  me.redo = function () {
    if (me.currentInd < me.changeItems.length - 1) {
      me.currentInd += 1;
      setElemValue(elem, me.changeItems[me.currentInd].value);
      me.setCursorPos(me.changeItems[me.currentInd].cursorPosition, elem);
    }
  };

  function setElemValue(elem, value) {
    if (
      elem.nodeName.toLowerCase() === "input" ||
      elem.nodeName.toLowerCase() === "textarea"
    ) {
      elem.value = value;
    } else {
      elem.innerHTML = value;
    }
  }

  async function initializeInputEvents() {
    var elemValue = "";

    //Reghister change event handlers for the specified elements
    if (
      (elem.nodeName.toLowerCase() === "input" &&
        elem.getAttribute("type") !== "number") ||
      elem.nodeName.toLowerCase() === "textarea" ||
      elem.hasAttribute("contenteditable")
    ) {
      elemValue = getElemValue(elem);

      me.changeItems.push({
        value: elemValue,
        cursorPosition: 0,
      });

      if (elem.hasAttribute("contenteditable")) {
        elem.addEventListener("change", function () {
          addToUndoStack();
        });

        elem.addEventListener("input", function () {
          addToUndoStack();
        });

        elem.addEventListener("keyup", function (e) {
          var keyCode = e.keyCode;
          if (
            (keyCode && keyCode > 36 && keyCode < 41) ||
            keyCode === 8 ||
            keyCode === 46
          )
            me.changeCursorPos(contentEditable.getCaretPosition(elem));
        });

        elem.addEventListener("click", function () {
          me.changeCursorPos(contentEditable.getCaretPosition(elem));
        });
      } else {
        elem.addEventListener("input", function () {
          addToUndoStack();
        });
        // elem.addEventListener('change', function () {
        //   addToUndoStack();
        // });
        elem.addEventListener("keyup", function (e) {
          var keyCode = e.keyCode;
          if (
            (keyCode && keyCode > 36 && keyCode < 41) ||
            keyCode === 8 ||
            keyCode === 46
          )
            me.changeCursorPos(getCursorPosition(elem));
        });

        elem.addEventListener("click", function () {
          me.changeCursorPos(getCursorPosition(elem));
        });
      }
    }

    function addToUndoStack() {
      if (me.currentInd < me.changeItems.length - 1)
        me.changeItems.splice(
          me.currentInd + 1,
          me.changeItems.length - me.currentInd - 1
        );
      elemValue = getElemValue(elem);

      if (elemValue !== me.changeItems[me.currentInd].value) {
        me.changeItems.push({
          value: elemValue,
          cursorPosition: getCursorPosition(elem),
        });
        me.currentInd = me.currentInd + 1;
        if (options.elementClicked) options.elementClicked(1500);
      }
    }

    elem.addEventListener("focus", function () {
      setActiveUndo(me);
    });
    if (elem === document.activeElement) setActiveUndo(me);
  }

  function getElemValue(elem) {
    if (
      elem.nodeName.toLowerCase() === "input" ||
      elem.nodeName.toLowerCase() === "textarea"
    ) {
      return elem.value;
    } else {
      var innerText = elem.innerText; // using innerText here because it preserves newlines
      if (innerText[innerText.length - 1] === "\n")
        innerText = innerText.slice(0, -1); // get rid of weird extra newline
      return innerText;
    }
  }

  function getCursorPosition(el) {
    var start = 0,
      normalizedValue,
      range,
      textInputRange,
      len,
      endRange;

    if (
      typeof el.selectionStart == "number" &&
      typeof el.selectionEnd == "number"
    ) {
      start = el.selectionStart;
    } else if (el.hasAttribute("contenteditable")) {
      start = contentEditable.getCaretPosition(el);
    } else {
      if (!document.selection) return 1;
      range = document.selection.createRange();
      if (range && range.parentElement() == el) {
        len = el.value.length;
        normalizedValue = el.value.replace(/\r\n/g, "\n");
        // Create a working TextRange that lives only in the input
        textInputRange = el.createTextRange();
        textInputRange.moveToBookmark(range.getBookmark());
        // Check if the start and end of the selection are at the very end
        // of the input, since moveStart/moveEnd doesn't return what we want
        // in those cases
        endRange = el.createTextRange();
        endRange.collapse(false);
        if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
          start = len;
        } else {
          start = -textInputRange.moveStart("character", -len);
          start += normalizedValue.slice(0, start).split("\n").length - 1;
        }
      }
    }
    return start;
  }

  initializeInputEvents();
};

//Creates a temporary dropdown of the dropdown list for the user to interact with
//and transfers the value selected by the user to the dropdownd element
var selectExpander = function (elem) {
  var me = this,
    wcf = new waCommandFunctions(),
    dropdown = null;

  me.elem = elem;

  me.displayDropdown = function () {
    var options = me.elem.options,
      elemId = "",
      id = "";

    dropdown = document.getElementById("waDropdown");
    if (dropdown) document.documentElement.removeChild(dropdown);
    dropdown = document.createElement("DIV");
    dropdown.id = "waDropdown";
    dropdown.tabIndex = 0;
    elemId = elem.id;
    id = elemId ? elemId : "select";

    dropdown.setAttribute("for", id);
    dropdown.innerHTML = getDropdownHTML();
    styleElement();
    document.documentElement.appendChild(dropdown);
    dropdown.getBoundingClientRect();
    // if (rect.bottom > window.innerHeight) dropdown.style.height = dropdown.offsetHeight - (rect.bottom - window.innerHeight) + 'px';
    if (elem.value) setSelected();
    addEvents(options);
    wcf.fireEvent(dropdown, "focus");
    if (!elem.tabIndex || elem.tabIndex < 0) elem.tabIndex = 0;
  };

  function getDropdownHTML() {
    var options = elem.options,
      html = "";

    for (var i = 0; i < options.length; i++) {
      html +=
        '<span data-value="' +
        options[i].value +
        '">' +
        options[i].innerText +
        "</span>";
    }
    return html;
  }

  me.hideDropdown = function () {
    try {
      var select = document.getElementById("waDropdown");

      if (select) {
        select.remove();
      }
    } catch (error) {
      console.log("hide dropdown " + error.message);
    }
  };

  function styleElement() {
    var styling = dropdown.style,
      compStyles = window.getComputedStyle(elem),
      rect = null;

    styling.fontSize = compStyles.getPropertyValue("font-size");
    styling.fontFamily = compStyles.getPropertyValue("font-family");
    styling.lineHeight = compStyles.getPropertyValue("line-height");
    styling.paddingTop = compStyles.getPropertyValue("padding-top");
    styling.paddingBottom = compStyles.getPropertyValue("padding-bottom");
    styling.paddingLeft = compStyles.getPropertyValue("padding-left");
    styling.paddingRight = compStyles.getPropertyValue("padding-right");
    styling.backgroundColor = compStyles.getPropertyValue("background-color");
    styling.color = compStyles.getPropertyValue("color");
    rect = getCoords(elem);
    styling.left = rect.left + "px";
    styling.top = rect.top + elem.offsetHeight + "px";
    styling.minWidth = elem.offsetWidth + 25 + "px";
    styling.zIndex = "999999999999999";
  }

  function getCoords(elem) {
    try {
      var box = elem.getBoundingClientRect();
      var body = document.body;
      var docEl = document.documentElement;
      var scrollTop = window.pageYOffset || docEl.scrollTop;

      //Facebook
      if (window.location.href.indexOf("facebook.com") !== -1)
        scrollTop = docEl.scrollTop;
      var scrollLeft =
        window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

      var clientTop = body.offsetTop || 0;
      var clientLeft = body.offsetLeft || 0;

      var top = box.top + scrollTop - clientTop;
      var left = box.left + scrollLeft - clientLeft;

      if (elem.ownerDocument && elem.ownerDocument !== document) {
        var win =
            elem.ownerDocument.defaultView || elem.ownerDocument.parentWindow,
          frame = win.frameElement,
          rectFrame = null;

        if (frame) {
          rectFrame = frame.getBoundingClientRect();
        } else {
          return;
        }

        if (rectFrame.top === 0) {
          left = left + rectFrame.left;
        } else if (rectFrame.left === 0) {
          left = left;
          top = top + rectFrame.top;
        } else {
          left = left + rectFrame.left;
          top = top + rectFrame.top;
        }
      }

      if (elem.nodeName === "AREA" && elem.hasAttribute("coords")) {
        var coords = elem.getAttribute("coords");

        box = elem.parentNode.parentNode.getBoundingClientRect();
        coords = coords.split(",");
        left = parseInt(coords[0]) + box.left + scrollLeft - clientLeft;
        top = parseInt(coords[1]) + box.top + scrollTop - clientTop;
      }

      return {
        top: Math.round(top) - 1,
        left: Math.round(left),
      };
    } catch (error) {
      console.log(error.message);
    }
  }

  function setSelected() {
    var options = elem.options,
      dropdownOptions = dropdown.getElementsByTagName("span"),
      value = elem.value;

    for (var i = 0; i < options.length; i++) {
      if (options[i].value === value) {
        dropdownOptions[i].classList.add("selected");
        return;
      }
    }
  }

  function setSelectValue(e) {
    if (elem.getAttribute("aria-describedby") === "searchDropdownDescription") {
      document.getElementById("searchDropdownDescription").innerText = e.value;
    } else {
      elem.value = e.value;
    }

    wcf.fireEvent(elem, "change");
    me.hideDropdown();
  }

  async function addEvents(options) {
    for (var i = 0; i < options.length; i++) {
      options[i].addEventListener("click", setSelectValue);
    }
    elem.addEventListener("blur", me.hideDropdown);
    dropdown.addEventListener("blur", me.hideDropdown);
    if (options.elementClicked) options.elementClicked(1000);
  }
};

var ContentEditableUtils$1 = function () {
  var me = this;
  me.currentIndex = 0;
  me.findAndSelectText = function (
    elem,
    currentHighlightText,
    currentHighlightInd
  ) {
    var elemText = escapeRegExp(getElemValue(elem).toLowerCase().trim());
    var re = escapeRegExp(currentHighlightText);

    // Find the index of the text to highlight
    currentHighlightInd = regexIndexOf(
      elemText.toLowerCase(),
      re,
      currentHighlightInd
    );

    // Get the window selection object
    const sel = window.getSelection();
    sel.removeAllRanges(); // Clear any existing selection

    // Get the text content of the <p> element
    const textContent = elem.innerText || elem.textContent;

    // Find the start and end positions of the searchText
    const startOffset = textContent.indexOf(currentHighlightText);
    const endOffset = startOffset + currentHighlightText.length;

    // If the text is found, proceed with the selection
    if (startOffset !== -1) {
      let range = document.createRange();

      let currentNode = elem.firstChild;
      let currentOffset = 0;
      let foundStart = false;
      let startNode, endNode, localStartOffset, localEndOffset;

      // Traverse the child nodes of <p> (elem)
      while (currentNode) {
        if (currentNode.nodeType === Node.TEXT_NODE) {
          const nodeText = currentNode.textContent;
          const nodeLength = nodeText.length;

          if (!foundStart && currentOffset + nodeLength >= startOffset) {
            startNode = currentNode;
            localStartOffset = startOffset - currentOffset;
            foundStart = true;
          }

          if (foundStart && currentOffset + nodeLength >= endOffset) {
            endNode = currentNode;
            localEndOffset = endOffset - currentOffset;
            break;
          }

          currentOffset += nodeLength;
        }
        currentNode = currentNode.nextSibling;
      }

      // If both startNode and endNode are found, set the selection range
      if (startNode && endNode) {
        range.setStart(startNode, localStartOffset);
        range.setEnd(endNode, localEndOffset);
        sel.addRange(range);
      } else {
        console.log("Failed to set selection");
      }
    } else {
      console.log("Text not found");
    }
  };

  //    me.findAndSelectText = function(elem, currentHighlightText, currentHighlightInd) {

  //     var elemText = escapeRegExp(getElemValue(elem).toLowerCase().trim()),
  //     re = escapeRegExp(currentHighlightText);

  //     currentHighlightInd = regexIndexOf(
  //       elemText.toLowerCase(),
  //       re,
  //       currentHighlightInd
  //     );
  //  //   activeUndo.setCursorPos(currentHighlightInd, elem);
  //     const sel = window.getSelection();
  //     sel.removeAllRanges(); // Clear any existing selection

  //     // Get the text content of the contenteditable element
  //     const textContent = elem.innerText || elem.textContent;

  //     // Find the start and end positions of the searchText
  //     const startOffset = textContent.indexOf(currentHighlightText);
  //     const endOffset = startOffset + currentHighlightText.length;

  //     // If the text is found, proceed with the selection
  //     if (startOffset !== -1) {
  //       // Get the first and last child nodes of the contenteditable elem
  //       const firstChild = elem.firstChild;
  //       const lastChild = elem.lastChild;

  //       // Set the base and extent of the selection to highlight the desired text
  //       sel.setBaseAndExtent(
  //         firstChild, // Start node
  //         startOffset, // Start offset
  //         lastChild, // End node
  //         endOffset // End offset
  //       );
  //     } else {
  //       console.log('Text not found');
  //     }
  //   }
  function getElemValue(elem) {
    if (
      elem.nodeName.toLowerCase() === "input" ||
      elem.nodeName.toLowerCase() === "textarea"
    ) {
      return elem.value;
    } else {
      var innerText = elem.innerText;

      if (innerText[innerText.length - 1] === "\n")
        innerText = innerText.slice(0, -1); // get rid of weird extra newline
      return innerText;
    }
  }

  function regexIndexOf(text, re, i) {
    var indexInSuffix = text.slice(i).search(re);
    return indexInSuffix < 0 ? indexInSuffix : indexInSuffix + i;
  }

  function escapeRegExp(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, " ");
  }

  me.setCaretPosition = function (container, position) {
    var doc = container.ownerDocument || container.document,
      win = doc.defaultView || doc.parentWindow,
      selection = null,
      range = null;

    if (position >= 0) {
      selection = win.getSelection();
      range = me.createRange(container, { count: position });

      if (range != null) {
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }

    if (position >= 0) {
      selection = win.getSelection();
      range = me.createRange(container, { count: position });
      if (range != null) {
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };

  /**
   * Get the current caret position inside a contentEditable container
   */
  me.getCaretPosition = function (container) {
    var doc = container.ownerDocument || container.document,
      win = doc.defaultView || doc.parentWindow,
      selection = win.getSelection(),
      charCount = -1,
      node;

    if (selection.focusNode != null) {
      if (me.isDescendantOf(selection.focusNode, container)) {
        node = selection.focusNode;
        charCount = selection.focusOffset;
        while (node != null) {
          if (node == container) {
            break;
          }
          if (node.previousSibling != null) {
            node = node.previousSibling;
            charCount += node.textContent.length;
          } else {
            node = node.parentNode;
            if (node == null) {
              break;
            }
          }
        }
      }
    }
    return charCount;
  };

  /**
   * Returns true if the node is a descendant (or equal to) a parent
   */
  me.isDescendantOf = function (node, parent) {
    while (node != null) {
      if (node == parent) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  };

  me.createRange = function (node, chars, range) {
    var doc = node.ownerDocument || node.document,
      win = doc.defaultView || doc.parentWindow;

    if (range == null) {
      range = win.document.createRange();
      range.selectNode(node);
      range.setStart(node, 0);
    }

    if (chars.count == 0) {
      range.setEnd(node, chars.count);
    } else if (node != null && chars.count > 0) {
      if (node.nodeType == 3) {
        if (node.textContent.length < chars.count) {
          chars.count -= node.textContent.length;
        } else {
          range.setEnd(node, chars.count);
          chars.count = 0;
        }
      } else {
        var _g = 0,
          _g1 = node.childNodes.length;
        while (_g < _g1) {
          var lp = _g++;
          range = me.createRange(node.childNodes[lp], chars, range);
          if (chars.count == 0) {
            break;
          }
        }
      }
    }
    return range;
  };
};

// function findString(str) {
//   if (parseInt(navigator.appVersion) < 4) return;
//   var strFound;
//   if (window.find) {
//     // CODE FOR BROWSERS THAT SUPPORT window.find.
//     strFound = self.find(str);
//     if (strFound) {
//       self.scrollTo(0, self.findOffset(str));
//     }
//   } else if (document.selection) {
//     // CODE FOR BROWSERS THAT SUPPORT document.selection.
//     var range = document.selection.createRange();
//     range.text = str;
//     range.collapse(false);
//     self.scrollTo(0, range.offsetTop);
//   }
//   return strFound;
// }

// async function playSoundEffects(timeout) {
//   setTimeout(() => {
//     try {
//       let attention = new Audio(
//         chrome.runtime.getURL("bubble-sound-effect.wav")
//       );
//       attention.play().catch(function (err) {
//         onError("screen");
//       });
//     } catch (error) { }
//   }, timeout);

// }

/**
 * Talisman v1.1.4"
 * (c) 2016-2020 Guillaume Plique (Yomguithereal)
 * Released under the MIT License. 
 * 
 * Talisman stemmers/s-stemmer
 * ============================
 *
 * Implementation of the English "S-Stemmer".
 *
 * [Reference]:
 * http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.104.9828&rep=rep1&type=pdf
 *
 * [Article]:
 * Donna Harman (1991) How effective is suffixing?
 * Journal of the American Society for Information Science (vol. 42 issue 1).
 *
 * [Note]:
 * I cannot find the original author of the algorithm, only its explanation in
 * the linked article.
 */

function sStemmer(word) {
  var length = word.length;

  if (length < 3 || word[length - 1] !== 's')
    return word;

  var penultimate = word[length - 2];

  if (penultimate === 'u' || penultimate === 's')
    return word;

  if (penultimate === 'e') {
    if (length > 3 &&
        word[length - 3] === 'i' &&
        word[length - 4] !== 'a' &&
        word[length - 4] !== 'e') {
      return word.slice(0, -3) + 'y';
    }

    if (word[length - 3] === 'i' ||
        word[length - 3] === 'a' ||
        word[length - 3] === 'o' ||
        word[length - 3] === 'e') {
      return word;
    }
  }

  return word.slice(0, -1);
}

var waCommandMatches = function (options) {
  var me = this;
  me.waitForFinal = false;
  me.activeCommand = null;
  me.maxCommandWords = 0;
  me.dictationMode = false;
  me.dictConvert = null;
  me.testMode = false;
  me.hasPunctuation = isEdgeBrowser();

  var setActive = false;
  me.processCommandMatches = function (transcript, commands, finalResults, lastTranscript) {
    if (!me.activeCommand) {
      var fullTranscript = transcript;

      transcript = prepareTranscript(transcript);
      var length = transcript.split(' ').length;
      //Check if the number of words in the transcript is greater than the maximum number of words in all commands.
      //An additional word is allowed because a transcript could still be a similar match with different word counts.
      if (length <= me.maxCommandWords + 1) getCommandMatches(' ' + transcript + ' ', fullTranscript, commands, finalResults, lastTranscript);
      if (finalResults && lastTranscript && !me.activeCommand) {
        processWildcardCommands(transcript, fullTranscript, lastTranscript, commands);
      }
      if (me.activeCommand) {

        setActive = false;
        var removeActive = executeCommand();
        //If the executeCommand function returns true it indicates that the command did not execute (not due to error)
        //and the active command should be set to null. This will allow the search for command matches to continue.
        if (removeActive) {
          setActive = true;
        } else {
          if (options.commandMatch) options.commandMatch(me.activeCommand, finalResults, lastTranscript);
          if (me.activeCommand.elem && me.activeCommand.elem.getAttribute('wascrolllabel') === "true" && options.sendCommandMessage) options.sendCommandMessage('Scrolling Enabled');
        }
      }
    }

    if (setActive && lastTranscript && finalResults) {
      if (me.dictationMode) me.activeCommand = new Object();
      setActive = false;
    }
  };

  function prepareTranscript(transcript) {
    var transcriptArray = transcript.trim().split(" ");
    //Replaces the word representation for certain numbers with an integer. This improves recognition accuracy
    //for certain commands (e.g. "backspace *").   
    transcript = replaceNumbers(transcript, transcriptArray);
    transcript = me.cleanText(transcript);
    return options.usePhonemes ? me.convertToPhonemes(transcript) : transcript;
  }

  function replaceNumbers(text, words) {
    var len = words.length,
      number = 0,
      wcf = new waCommandFunctions(),
      word = '';

    for (var i = 0; i < len; i++) {
      
      word = removePunctuation(words[i]).toLowerCase();
      number = wcf.getIntegerFromWords(word);
      if (number) {
        text = text.replace(words[i], number);
        break;
      }
    }
    return text;
  }

  function removePunctuation(text) {
    text = text.replace('-', '');
    return text.replace(/[?!.,]+$/, '');
  }
  // Converts text to phonemes when there is match in the phoneme dictionary
  me.convertToPhonemes = function (text) {
    var newText = '',
      words = text.trim().split(' ');

    words.forEach(function (word) {
      newText = newText + getPhonemeMatch(word, me.dictConvert.dictIndex, me.dictConvert.dictArray) + ' ';
    });
    return newText.trim().toLowerCase();
  };

  function getPhonemeMatch(word, phonInd, phonDict) {
    var fChar = word.charAt(0).toUpperCase(),
      start = getDictIndex(fChar, phonInd);

    for (var i = start; i < phonDict.length; i++) {
      if (phonDict[i][0].charAt(0) !== fChar) break;
      if (word === me.cleanText(phonDict[i][0])) return phonDict[i][1];
    }
    return word;
  }

  function getDictIndex(fChar, phonInd) {
    for (var i = 0; i < phonInd.length; i++) {
      if (phonInd[i].character === fChar) {
        return phonInd[i].ind;
      }
    }
  }

  function prepareCommandText(command) {
    if (options.usePhonemes) {
      return command.phonemeText;
    } else {
      var words = command.commandText.split(' ');
      return me.cleanText(replaceNumbers(command.commandText, words));
    }
  }

  function getCommandMatches(transcript, fullTranscript, commands, finalResults, lastTranscript) {
    var command = null,
      commandText = '',
      match = false;
    // Loop through commands
    for (var i = 0; i < commands.length; i++) {
      command = commands[i];
      commandText = command.commandText;
      if (commandText.indexOf(' *') === -1 && commandText) {
        //Converts to phonemes or returns plain text.

        commandText = prepareCommandText(command);
        if (commandText.trim() && commandText !== 'wadup') {
          match = addCommandMatches(command, commandText, transcript, fullTranscript, commands, finalResults, lastTranscript, i === commands.length - 1);
          if (match) return;
        }
      }
    }
  }

  // Determine the transcript matches the current command
  function addCommandMatches(command, commandText, transcript, fullTranscript, commands, finalResults, lastTranscript, lastCommand) {
    var match = false;

    if ((Number.isInteger(parseInt(transcript)) && me.dictationMode) || (command.useFinalResult && !finalResults)) return false;
    match = addRegularMatches(command, ' ' + commandText + ' ', transcript, fullTranscript, commands, finalResults);
    // if (command.commandText && command.commandText.indexOf('wadup') === -1 && options.useSimilarityScore && !me.dictationMode && !match && command.commandText.indexOf(' *') === -1) {
    //   //Compares the current command text with the transcript using a string comparison algorithm.    
    //   addSimilarMatches(command, fullTranscript, transcript, finalResults, lastTranscript, lastCommand);
    // }
    return match;
  }

  function addRegularMatches(command, commandText, transcript, fullTranscript, commands, finalResults) {
  
    var match = command.exactMatch ? commandText.replaceAll(' ', '') === transcript.replaceAll(' ', '') : transcript.replaceAll(' ', '').indexOf(commandText.replaceAll(' ', '')) === 0;

    if (match) {
      if (!me.waitForFinal && command.useWaitForFinal) {
        // If a command match partially matches another command, then wait for the final transcript to execute.
        // this will prevent commands from executing prematurely when there are interim results (e.g. click a and click a city)
        me.waitForFinal = checkForPartialMatch(command.commandText, commands);
      }
      if (me.waitForFinal && !finalResults) return false;
      addCommandMatch(command, fullTranscript);
    }
    return match;
  }

  // function addSimilarMatches(command, fullTranscript, transcript, finalResults, lastTranscript, lastCommand) {
  //   //Will return a similarity object if the similarity score is above a certain threshold
  //   var objSimilarity = getSimilarity(fullTranscript, transcript, command.commandText, command);
  //   if (objSimilarity) {
  //     //Compare scores with any existing matches
  //     if (objSimilarity.score > maxSimilarity.score) maxSimilarity = objSimilarity;
  //   }

  //   //Wait until the end to add the match and execute
  //   if (finalResults && lastTranscript && lastCommand && maxSimilarity.score > 0) {
  //     console.log("Similar: " + maxSimilarity.fullTranscript + " to " + maxSimilarity.command.commandText);

  //     addCommandMatch(maxSimilarity.command, maxSimilarity.fullTranscript);
  //   }
  // }

  function addCommandMatch(command, fullTranscript) {
    command.dictationMode = me.dictationMode;
    command.transcript = fullTranscript;
    //Make this the active command
    me.activeCommand = command;
  }

  function checkForPartialMatch(commandText, array) {
    for (var i = 0; i < array.length; i++) {
      if (commandText.length < array[i].commandText.length) {
        if (array[i].commandText.toLowerCase().indexOf(commandText.toLowerCase()) > -1) return true;
      } else {
        return false;
      }
    }
    return false;
  }

  // function getSimilarity(fullTranscript, transcript, commandText, command) {
  //   var commandMatch = null;

  //   var score = lig2(fullTranscript.toLowerCase(), commandText.toLowerCase());
  //   if (score > 0.73) {
  //     commandMatch = {
  //       command: command,
  //       score: score,
  //       transcript: transcript,
  //       fullTranscript: fullTranscript
  //     };
  //   }

  //   return commandMatch;
  // }

  // Wildcard commands are commands that includes static text and any text that is spoken after the 
  // static text. All wildcard commands should include the * character.
  function processWildcardCommands(transcript, fullTranscript, lastTranscript, commands) {
    var command = null,
      match = false,
      isWildcard = false,
      commandText = '',
      transcriptText = '';

    for (var i = 0; i < commands.length; i++) {
      command = commands[i];
      isWildcard = command.commandText.indexOf(' *');
      if (isWildcard > - 1 && (lastTranscript)) {
        commandText = transcript.substring(0, isWildcard);
        transcriptText = command.commandText.replace(' *', '');
        if (commandText === transcriptText) {
          match = addCommandMatches(command, prepareCommandText(command), ' ' + transcript + ' ', fullTranscript, commands, true);
          if (match) return;
        }
      }
    }
  }

  function executeCommand() {
    try {

      var error = me.activeCommand.commandFunction(me.activeCommand);
      //  if (error && me.testMode) logNoCommand(me.activeCommand);
      return error;
    } catch (err) {
      console.log('Execute error ' + err.message);
      if (document.activeElement && document.activeElement.hasAttribute('contenteditable')) {
        var activeElement = document.activeElement;
        if (options.onError) options.onError('noDictation');
        setTimeout(() => {
          activeElement.focus();
        }, 1000);

        return true;
      } else {
        if (options.onError) options.onError('error');
        return true;
      }

    }
  }

  // function logNoCommand(activeCommand) {
  //   console.log('Command error ' + activeCommand.commandText + ' ' + activeCommand.commandFunction.name);
  // }

  me.processDictationCommands = function (transcript, commands, activeElement, lastTranscript) {
    var command = '',
      commandText = '',
      newTranscript = transcript;

    for (var i = 0; i < commands.length; i++) {
      command = commands[i];
      commandText = command.commandText;
      if (commandText.length <= transcript.length) {
        newTranscript = executeDictationMatches(command, commandText, newTranscript, activeElement, lastTranscript);
      }
    }
    return newTranscript;
  };


  function executeDictationMatches(command, commandText, text, activeElement, lastTranscript) {
    var testText = cleanDictationText(text.toLowerCase()),
      newText = text;

    if (me.hasPunctuation) {
      text = text.replace(/[?!,.,]/g, '');
      command.transcript = text;
    }

    //If the transcript matches the command execute immediately
    if (testText === commandText) {
      me.activeCommand = command;
      newText = executeDictationCommand(text, command, activeElement);
      return newText;
    }

    //When the last transcript is reached, search for a full or partial match
    if (lastTranscript) {
      testText = ' ' + testText + ' ';
      var ind =  testText.indexOf(' ' + commandText + ' ');
      if (ind > -1) {
        newText = executeDictationCommand(newText, command, activeElement);
      }
    }

    return newText;
  }

  function executeDictationCommand(text, command, activeElement) {
    command.transcript = text;
    command.element = activeElement;
    return command.commandFunction(command);
  }

  function cleanDictationText(text) {
    text = text.replace(/[^\w\s]/gi, '');
    return text;
  }

  //Removes punctuation, and converts plural words to their singular form
  me.cleanText = function (text) {
    //Remove punctuation
    var newText = text.replace(/[^\w\s]/gi, '').replace(/-/g, ' ').toLowerCase(),
      re = /(\s(-|\|)\s)/g;  //Removes symbols

    newText = newText.replace(re, '').trim();
    //This is not needed?
    //   nextText = removeInvalidChars(noSymbols);
    if (options.useStemmer) {
      var words = newText.split(' ');
      if (words) {
        words.forEach(function (word) {
          newText = newText + sStemmer(word) + ' ';
        });
      } else {
        newText = text;
      }
    }
    return newText;
  };

  me.initializeVariables = function () {
    me.activeCommand = null;
    me.waitForFinal = false;
  };

  function isEdgeBrowser() {
    return /Edg/.test(navigator.userAgent);
  }
};

var waWebCommands = function (options, commandMatches, wa) {
  var wcf = new waCommandFunctions(options, wa),
    me = this,
    currentURL = window.location.href,
    altCommands = new altCommandText();

  me.commands = [];
  me.documents = returnDocuments(document);
  me.elementCount = 0;
  me.testMode = false;
  me.focusElems = [];
  me.hasPunctuation = isEdgeBrowser();
  me.modal = false;

  me.initializeInputUndos = async function () {
    me.documents.forEach(async function (doc) {
      wcf.initializeInputUndos(doc);
    });
  };

  me.initializeCommands = function (labelsHidden, showAllLabels) {
    try {
      // showAllLabels = true;
      me.commands = [];
      currentURL = window.location.href;
      me.initializeStaticCommands();
      addPaidCommands();
      me.addChromeCommands();
      var documents = me.documents;
      altCommands.reset();

      documents.forEach(function (doc) {
        me.initializeDynamicCommands(doc, labelsHidden);

        wcf.initializeInputUndos(doc);
      });

      if (!labelsHidden) me.addAltCommands(labelsHidden, showAllLabels);

      //  if (!siteMatch()) addDivCommands(document, labelsHidden);
      // addCarouselDetector();
      me.sortCommands();
    } catch (e) {
      console.log("Error initializing commands " + e.message);
    }
  };

  //Static commands are the same for each web page
  me.initializeStaticCommands = function () {
    me.focusElems = getElemsTabOrder();

    me.addCommands([
      // {
      //   commandText: "stop",
      //   commandFunction: wcf.stopScroll
      // },
      // {
      //   commandText: "off",
      //   commandFunction: wcf.stopScroll,
      //   alternateText: "stop",
      //   useWaitForFinal: true
      // },
      {
        commandText: "home page",
        commandFunction: wcf.homePage,
        exactMatch: true,
      },
      {
        commandText: "browse *",
        commandFunction: wcf.goToURL,
        useLastTranscript: true,
      },
      {
        commandText: "auto scroll down",
        commandFunction: wcf.autoScrollDown,
        exactMatch: true,
      },
      {
        commandText: "auto scroll",
        commandFunction: wcf.autoScrollDown,
        alternateText: "auto scroll down",
        useWaitForFinal: true,
        exactMatch: true,
      },

      {
        commandText: "auto scroll up",
        commandFunction: wcf.autoScrollUp,
        exactMatch: true,
      },
      {
        commandText: "scroll down",
        commandFunction: wcf.scrollDown,
        exactMatch: true,
      },
      {
        commandText: "scroll up",
        commandFunction: wcf.scrollUp,
        exactMatch: true,
      },
      {
        commandText: "next page",
        commandFunction: wcf.pageDown,
        exactMatch: true,
        useWaitForFinal: true,
      },
      {
        commandText: "previous page",
        commandFunction: wcf.pageUp,
        exactMatch: true,
        useWaitForFinal: true,
      },
      {
        commandText: "the previous page",
        commandFunction: wcf.pageUp,
        alternateText: "previous page",
        useWaitForFinal: true,
      },
      {
        commandText: "top",
        commandFunction: wcf.scrollTop,
        exactMatch: true,
        useWaitForFinal: true,
        alternateText: "top page",
      },
      {
        commandText: "top page",
        commandFunction: wcf.scrollTop,
      },
      {
        commandText: "the top page",
        commandFunction: wcf.scrollTop,
        alternateText: "top page",
      },
      {
        commandText: "bottom page",
        commandFunction: wcf.scrollBottom,
      },
      {
        commandText: "bottom",
        commandFunction: wcf.scrollBottom,
        exactMatch: true,
        useWaitForFinal: true,
      },
      {
        commandText: "scroll right",
        commandFunction: wcf.scrollRight,
        exactMatch: true,
      },
      {
        commandText: "scroll left",
        commandFunction: wcf.scrollLeft,
        exactMatch: true,
      },
      {
        commandText: "scroll page down",
        commandFunction: wcf.scrollPageDown,
        exactMatch: true,
      },
      {
        commandText: "scroll page up",
        commandFunction: wcf.scrollPageUp,
        exactMatch: true,
      },
      {
        //These two command emulate pressing the tab key
        commandText: "next element",
        commandFunction: wcf.tab,
        focusElements: me.focusElems,
        exactMatch: true,
      },
      {
        commandText: "the previous element",
        commandFunction: wcf.tabBack,
        focusElements: me.focusElems,
        alternateText: "previous element",
        exactMatch: true,
      },
      {
        commandText: "previous element",
        commandFunction: wcf.tabBack,
        focusElements: me.focusElems,
        exactMatch: true,
      },
      {
        commandText: "back",
        commandFunction: wcf.goBack,
        exactMatch: true,
        useWaitForFinal: true,
      },
      {
        commandText: "forward",
        commandFunction: wcf.goForward,
        exactMatch: true,
        useWaitForFinal: true,
      },
      {
        commandText: "reload",
        commandFunction: wcf.reload,
        exactMatch: true,
        useWaitForFinal: true,
      },
      // {
      //   commandText: 'speak text',
      //   commandFunction: wcf.speakText,
      //   exactMatch: true,
      //   useWaitForFinal: true
      // },
      {
        //The move up and move down commands apply to select elements
        commandText: "move down",
        commandFunction: wcf.moveDown,
        exactMatch: true,
      },
      {
        commandText: "move up",
        commandFunction: wcf.moveUp,
        exactMatch: true,
      },
      {
        //Dictation related commands
        commandText: "move left *",
        commandFunction: wcf.moveLeft, //This function assumes the command has three words (e.g. move left five)
        isNumeric: true,
      },
      {
        commandText: "move right *",
        commandFunction: wcf.moveRight, //This function assumes the command has three words (e.g. move right five)
        isNumeric: true,
      },
      {
        commandText: "move write *",
        commandFunction: wcf.moveRight, //This function assumes the command has three words (e.g. move right five)
        alternateText: "move right",
        isNumeric: true,
      },
      {
        commandText: "clear text",
        commandFunction: wcf.clearAll,
      },
      {
        commandText: "delete *",
        commandFunction: wcf.delete,
        isNumeric: true, //This function assumes the command has two words (e.g. delete five)
      },
      {
        commandText: "backspace *",
        commandFunction: wcf.backspace,
        isNumeric: true, //This function assumes the command has two words (e.g. backspace five)
      },
      {
        //These two commands simulate undo and redo commands. I chose this command text because of the poorer recognition
        //performance associated with "undo" and "redo"
        commandText: "reverse",
        commandFunction: wcf.undo,
        exactMatch: true,
      },
      {
        commandText: "repeat",
        commandFunction: wcf.redo,
        exactMatch: true,
      },
      // {
      //   commandText: 'new paragraph',
      //   commandFunction: wcf.newParagraph //This function assumes the command has two words (e.g. backspace five)
      // },
      {
        commandText: "go to *", //Similar to a find operation but the cursor is positioned in front of the search text
        commandFunction: wcf.goTo,
        useLastTranscript: true,
      },
      {
        commandText: "go two *", //Similar to a find operation but the cursor is positioned in front of the search text
        commandFunction: wcf.goTo,
        useLastTranscript: true,
      },
      {
        commandText: "go 2 *", //Similar to a find operation but the cursor is positioned in front of the search text
        commandFunction: wcf.goTo,
        useLastTranscript: true,
      },
      {
        commandText: "go to next",
        commandFunction: wcf.goToNext,
        exactMatch: true,
      },
      {
        commandText: "highlight all",
        commandFunction: wcf.highlightAll,
        exactMatch: true,
      },
      {
        commandText: "remove highlight",
        commandFunction: wcf.unHighlight,
        exactMatch: true,
      },
      {
        commandText: "find next",
        commandFunction: wcf.highlightNext,
        exactMatch: true,
      },
      {
        commandText: "find *", //Similar to  find operation where the search text is highlighted
        commandFunction: wcf.highlight,
        useLastTranscript: true,
      },
      {
        //These can only be used when the text is highlighted
        commandText: "capitalize",
        commandFunction: wcf.capitalize,
        exactMatch: true,
      },
      {
        commandText: "lowercase",
        commandFunction: wcf.lowerCase,
        exactMatch: true,
      },
      {
        commandText: "uppercase",
        commandFunction: wcf.upperCase,
        exactMatch: true,
      },
      {
        //Can be used in dictation mode to move to beginning and end of the text.
        commandText: "home",
        commandFunction: wcf.home,
        exactMatch: true,
        useWaitForFinal: true,
      },
      {
        commandText: "end key",
        commandFunction: wcf.end,
        useWaitForFinal: true,
        exactMatch: true,
      },
      {
        commandText: "and key",
        exactMatch: true,
        alternateText: "end key",
        commandFunction: wcf.end,
        useWaitForFinal: true,
      },
      {
        commandText: "end",
        exactMatch: true,
        alternateText: "end key",
        commandFunction: wcf.end,
        useWaitForFinal: true,
      },
      {
        commandText: "in key",
        alternateText: "end key",
        exactMatch: true,
        commandFunction: wcf.end,
        useWaitForFinal: true,
      },
      {
        commandText: "enter key",
        commandFunction: wcf.enterKey,
        useWaitForFinal: true,
        exactMatch: true,
      },
      {
        commandText: "escape key",
        commandFunction: wcf.escapeKey,
        useWaitForFinal: true,
        exactMatch: true,
      },
      {
        commandText: "tab key",
        commandFunction: wcf.tabKey,
        useWaitForFinal: true,
        exactMatch: true,
      },
      //  {
      //   commandText: 'new line',
      //   useWaitForFinal: true,
      //   commandFunction: wcf.newLine //This function assumes the command has two words (e.g. backspace five)
      // },
      {
        //Allows user to spell the text they want inserted one letter at a time
        commandText: "spell *",
        commandFunction: wcf.spellWord,
        useLastTranscript: true,
      },
      {
        commandText: "copy text",
        commandFunction: wcf.copy,
        useWaitForFinal: true,
        exactMatch: true,
      },
      {
        commandText: "paste text",
        commandFunction: wcf.paste,
        useWaitForFinal: true,
        exactMatch: true,
      },
      {
        commandText: "click page",
        commandFunction: wcf.clickPage,
        useWaitForFinal: true,
        exactMatch: true,
      },
      {
        commandText: "click element",
        commandFunction: wcf.clickActive,
        useWaitForFinal: true,
        exactMatch: true,
      },
      {
        commandText: "underline commands",
        commandFunction: wcf.underlineCommands,
        exactMatch: true,
      },
      {
        commandText: "hide commands",
        commandFunction: wcf.hideCommands,
        exactMatch: true,
      },
      {
        //Allows user to spell the text they want inserted one letter at a time
        commandText: "insert e-mail *",
        commandFunction: wcf.insertEmail,
        useLastTranscript: true,
        exactMatch: true,
      },
      {
        //Allows user to spell the text they want inserted one letter at a time
        commandText: "insert email *",
        commandFunction: wcf.insertEmail,
        useLastTranscript: true,
      },
      {
        //Allows user to spell the text they want inserted one letter at a time
        commandText: "numeral *",
        commandFunction: wcf.convertNumber,
        useLastTranscript: true,
      },
      // {
      //   //Allows user to spell the text they want inserted one letter at a time
      //   commandText: "Search",
      //   commandFunction: wcf.searchHistory,
      //   useLastTranscript: true,
      // }
    ]);
  };

  // Returns an array of elements in tab order. This includes elements from the main document and any iframes
  // present
  function getElemsTabOrder() {
    //Get all focusable elements except those with a tabndex of 0
    var documents = me.documents,
      allDocElements = [];

    documents.forEach(function (doc) {
      allDocElements.push.apply(allDocElements, getTabOrder(doc));
    });

    return allDocElements;
  }

  /**
   * Returns the tab order of elements in a given document.
   * @param {Document|ShadowRoot} doc - The document to retrieve tab order from.
   * @returns {Array} - An array of elements in tab order.
   */
  function getTabOrder(doc) {
    // Select all tabbable elements.
    var selector =
        'a, input, select, textarea, button:not(button > a), summary, video, audio, [tabindex="0"]:not(iframe), [contenteditable]',
      tabElems =
        doc instanceof ShadowRoot
          ? getShadowElems(doc, selector)
          : doc.querySelectorAll(selector);

    // Select all elements with a tabindex attribute.
    selector = "[tabindex]";
    var indexedElems =
      doc instanceof ShadowRoot
        ? getShadowElems(doc, selector)
        : doc.querySelectorAll(selector);

    // Filter out all elements with a tabindex less than or equal to 0.
    indexedElems = Array.from(indexedElems).filter((el) => {
      return parseInt(el.tabIndex) > 0;
    });

    // Combine the tabbable elements and indexed elements, and sort them by tabindex.
    return insertIndexedElements(indexedElems, tabElems);
  }

  /**
   * Returns all shadow DOM elements matching a given selector.
   * @param {ShadowRoot} shadowRoot - The shadow root to search for elements in.
   * @param {string} selector - The selector to match against.
   * @returns {NodeList} - A NodeList of matching elements.
   */
  function getShadowElems(shadowRoot, selector) {
    return shadowRoot.querySelectorAll(selector);
  }

  /**
   * Combines and sorts indexed and tabbable elements.
   * @param {Array} indexedElems - The elements with a tabindex attribute.
   * @param {NodeList} tabElems - The tabbable elements.
   * @returns {Array} - An array of elements in tab order.
   */
  function insertIndexedElements(indexedElems, tabElems) {
    var insertIndex = 0;

    return Array.from(tabElems).sort((a, b) => {
      var aIndex = indexedElems.indexOf(a),
        bIndex = indexedElems.indexOf(b);

      if (aIndex !== -1 && bIndex !== -1) {
        return aIndex - bIndex;
      } else if (aIndex !== -1) {
        return -1;
      } else if (bIndex !== -1) {
        return 1;
      } else {
        return insertIndex++;
      }
    });
  }

  // Dynamic commands are dependent on the text associated with relevant page elements
  me.initializeDynamicCommands = function (doc, labelsHidden) {
    var prefixes = ["", "show", "hide", "focus"],
      functs = [wcf.clickElement, wcf.hover, wcf.mouseOut, wcf.focusElement],
      selector = "",
      selects = null;

    doc = doc ? doc : document;
    selects = doc.querySelectorAll("select");
    addSelectCommands(doc, selects);
    addSelectEvents(selects);
    addLabelCommands(doc, labelsHidden);
    //.slot,
    selector =
      'button, summary[role=button], paper-button, [href], [onclick], h5, fluent-button, .search__dropdown__sections, [class*="burger" i], [class*="next" i], [class*="owl-prev" i], [class*="previous" i],  [aria-label*="mute" i], [data-region], .wds-collapsible-panel__header, .wds-dropdown__toggle, .aspect, .nav_right, .nav_left, .listItemText, input[type=image], input[type=button], input[type=submit], div[role=gridcell], div[data-hover=tooltip], input[type=reset], div[role="link"], [role=columnheader], [role=img], [role=combobox],  [role=radio], [role=tab], a, [role=checkbox], [role=button], [data-test-id="attachment-list-item"], [email], [data-e2e="profile-icon"], [role="option"], .hmenu-close-icon, [role="option"], .cr, .tn-close, .exint__close, #p-select .fandom-select, picture, .tp-yt-paper-tab,  #text, #refinement-clear-all-button, .suggestion-box-image-section-middle-dot, [data-test-locator=stream-item-category-label], [data-test-locator=catlabel]';

    if (currentURL.indexOf("reddit.com") > -1)
      selector +=
        ",._32zXxOy-JDeJPYiXTZ6GWU, .zB167v8VzkVM9pUFETGba, ._2HYsucNpMdUpYlGBMviq8M";

    if (!siteMatch()) {
      selector +=
        ', [data-id], div[role=name], div[role="menuitem"], span:not([id^="altElem"]), area,  [class*="dropdown" i],  [class*="nav-right" i], [class*="notification" i], [class*="nav-left" i], [action="click"], [role=" link"], .switchbuttzoncircle, [id*=previous], [id*=next], h3, [id*=search], [id*=volume], [data-test-id=pin], .dropdown-trigger, div[title], div[id*="arrow" i][id*="left" i], div[id*="arrow" i][id*="right" i], div[class*="arrow" i][class*="carousel" i], [id*="hamburger" i], div[class*="arrow" i][class*="left" i], div[class*="arrow" i][class*="right" i], .unseen, [class*="menu" i][class*="open" i], [class*="left" i][class*="button" i], span[class*="dropdown" i], [class*="button" i], div[class*="close" i], span[class*="close" i], [class*="right" i][class*="button" i], .q-text, .hide--screen-s, .grid-page-selector, .tV0DEo5a5LUrl8Piw6Ao, .module--carousel__left, .module--carousel__right, [class*="volume"], .lm_hpaprice, li, svg, img, th, .slider-back arrow, .slider-forward arrow';
      if (currentURL.indexOf("bing.com") > -1) {
        if (currentURL.indexOf("bing.com/videos") > -1)
          selector += ", div[class=''], div[class=active]";
      } else if (currentURL.indexOf("linkedin.com") > -1)
        selector = selector.replace("li, ", "");
    }

    me.addElementCommands(doc, selector, prefixes, functs, labelsHidden, false);
    addVideoCommands(doc);
    // select = document.getElementById('waDropdown');

    // if (select) {
    //   activeElem = getActiveElement();
    //   addSelectCommands(doc, activeElem);
    // }
  };

  async function addVideoCommands(doc) {
    var videos = [];

    try {
      if (doc instanceof ShadowRoot || doc.getElementsByTagName)
        videos =
          doc instanceof ShadowRoot
            ? getShadowElems(doc, "video")
            : doc.getElementsByTagName("video");

      //These commands can handle videos that aren't loaded immediately
      if (doc === document) {
        me.addCommands([
          {
            commandText: "stop video",
            commandFunction: wcf.videoCommands,
          },
          {
            commandText: "pause video",
            commandFunction: wcf.videoCommands,
          },
          {
            commandText: "play video",
            commandFunction: wcf.videoCommands,
          },
          {
            commandText: "mute video",
            commandFunction: wcf.videoCommands,
          },
          {
            commandText: "go forward *",
            commandFunction: wcf.videoCommands,
          },
          {
            commandText: "go back *",
            commandFunction: wcf.videoCommands,
          },
          {
            commandText: "time *",
            commandFunction: wcf.videoCommands,
          },
          {
            commandText: "unmute video",
            commandFunction: wcf.videoCommands,
          },
          {
            commandText: "full screen",
            commandFunction: wcf.videoCommands,
          },
          {
            commandText: "exit screen",
            commandFunction: wcf.videoCommands,
          },
          {
            commandText: "show video",
            commandFunction: wcf.videoCommands,
          },
          {
            commandText: "next video",
            commandFunction: wcf.videoCommands,
          },
          {
            //YouTube
            commandText: "restart video",
            commandFunction: wcf.videoCommands,
          },

          {
            //YouTube
            commandText: "skip ads",
            commandFunction: wcf.videoCommands,
          },
          {
            commandText: "play audio",
            commandFunction: wcf.videoCommands,
          },
          {
            commandText: "pause audio",
            commandFunction: wcf.videoCommands,
          },
          {
            commandText: "stop audio",
            commandFunction: wcf.videoCommands,
          },
          // {
          //   commandText: "mute audio",
          //   commandFunction: wcf.videoCommands,
          // },
          // {
          //   commandText: "unmute audio",
          //   commandFunction: wcf.videoCommands,
          // },
          {
            commandText: "volume down",
            commandFunction: wcf.videoCommands,
          },
          {
            commandText: "volume up",
            commandFunction: wcf.videoCommands,
          },
        ]);
      }

      for (let index = 0; index < videos.length; index++) {
        addVideoEvents(videos[index]);
        addMouseEvents(videos[index]);
      }
    } catch (error) {
      console.log("video " + error.message);
    }
  }

  function addPaidCommands() {
    addShortCutCommands();
    addTemplateCommands();
    me.addCommands([
      {
        commandText: "remove *",
        commandFunction: wcf.removeItem,
      },
      {
        commandText: "update *",
        commandFunction: wcf.editItem,
      },
    ]);
  }

  function addShortCutCommands() {
    me.addCommands([
      {
        commandText: "new shortcut",
        commandFunction: wcf.addShortcut,
        exactMatch: true,
      },
      {
        commandText: "new short cut",
        commandFunction: wcf.addShortcut,
        alternateText: "new shortcut",
        exactMatch: true,
      },
      {
        commandText: "new short cuts",
        commandFunction: wcf.addShortcut,
        alternateText: "new shortcut",
        exactMatch: true,
      },

      {
        commandText: "my shortcut",
        commandFunction: wcf.displayShortcuts,
        exactMatch: true,
      },
      {
        commandText: "my shortcuts",
        commandFunction: wcf.displayShortcuts,
        exactMatch: true,
      },
      {
        commandText: "my short cut",
        commandFunction: wcf.displayShortcuts,
        alternateText: "my shortcuts",
        exactMatch: true,
      },
      {
        commandText: "my short cuts",
        commandFunction: wcf.displayShortcuts,
        alternateText: "my shortcuts",
        exactMatch: true,
      },
      {
        commandText: "hide shortcuts",
        commandFunction: wcf.hideItems,
        exactMatch: true,
      },
      {
        commandText: "hide short cuts",
        commandFunction: wcf.hideItems,
        alternateText: "hide shortcuts",
        exactMatch: true,
      },
    ]);
    addShortCuts();
  }

  function addShortCuts() {
    chrome.storage.sync.get(null, function (items) {
      for (let key in items) {
        if (items.hasOwnProperty(key)) {
          if (items[key].commandText && items[key].url) {
            me.addCommands([
              {
                commandText: items[key].commandText,
                URL: items[key].url,
                commandFunction: wcf.openShortcut,
                exactMatch: true,
              },
            ]);
          }
        }
      }
    });
  }

  function addTemplateCommands() {
    me.addCommands([
      {
        commandText: "new template",
        commandFunction: wcf.addTemplate,
        exactMatch: true,
      },
      {
        commandText: "my template",
        commandFunction: wcf.displayTemplates,
        exactMatch: true,
      },
      {
        commandText: "my templates",
        commandFunction: wcf.displayTemplates,
        exactMatch: true,
      },
      {
        commandText: "hide templates",
        commandFunction: wcf.hideItems,
        exactMatch: true,
      },
      {
        commandText: "hide template",
        commandFunction: wcf.hideItems,
        exactMatch: true,
      },
    ]);
    addTemplates();
  }

  function addTemplates() {
    chrome.storage.sync.get(null, function (items) {
      for (let key in items) {
        if (items.hasOwnProperty(key)) {
          if (items[key].commandText && items[key].text) {
            me.addCommands([
              {
                commandText: items[key].commandText,
                text: items[key].text,
                commandFunction: wcf.insertTemplate,
                exactMatch: true,
              },
            ]);
          }
        }
      }
    });
  }

  async function addVideoEvents(video) {
    video.addEventListener(
      "canPlay",
      function () {
        var rect = video.getBoundingClientRect();

        if (inViewport(video, rect))
          setTimeout(function () {
            options.videoOn(video);
          }, 5000);
      },
      true
    );

    // video.addEventListener(
    //   "pause",
    //   function () {
    //     options.videoOff();
    //   },
    //   true
    // );

    // video.addEventListener(
    //   "stalled",
    //   function () {
    //     options.videoOff();
    //   },
    //   true
    // );

    video.addEventListener(
      "mouseenter",
      function () {
        setTimeout(() => {
          if (options.elementClicked) options.elementClicked(500);
        }, 50);
      },
      true
    );
  }
  function elemArrayMatch(elems) {
    for (let index = 0; index < elems.length; index++) {
      if (elemMatch(elems[index])) return true;
    }
  }

  function elemMatch(elem) {
    if (!elem) return false;
    for (var x = 0; x < me.commands.length; x++) {
      if (me.commands[x].elem === elem) {
        return true;
      }
    }
  }

  function siteMatch() {
    return (
      currentURL.indexOf("gmail.com") > -1 ||
      currentURL.indexOf("facebook.com") > -1 ||
      currentURL.indexOf(".youtube.com") > -1 ||
      currentURL.indexOf("netflix.com") > -1 ||
      currentURL.indexOf("craigslist.org") > -1 ||
      currentURL.indexOf("reddit.com") > -1
    );
  }

  function addLabelCommands(elem, labelsHidden, elems) {
    var input = null,
      prefixes = ["", "show", "hide", "focus"],
      childInput = null,
      functs = [wcf.clickElement, wcf.hover, wcf.mouseOut];

    //This process involves getting all of the label elements and their associated elements
    elems =
      elem instanceof ShadowRoot
        ? getShadowElems(elem, "label")
        : elem.querySelectorAll("label");
    for (var x = 0; x < elems.length; x++) {
      try {
        if (
          isVisible(elems[x], elems[x].ownerDocument) &&
          (!elems[x].id || elems[x].id.indexOf("altElem") === -1)
        ) {
          if (elems[x].htmlFor) {
            input = elem.getElementById(elems[x].htmlFor);
            if (!input) {
              childInput = elem.getElementsByName(elems[x].htmlFor);
              if (childInput.length) input = childInput[0];
            }
          }
          if (!input)
            input =
              elems[x].querySelector("input") ||
              elems[x].querySelector("textarea") ||
              elems[x].querySelector("[contenteditable]");
          if (input) {
            if (input.nodeName !== "BUTTON")
              addLabelsByType(elems[x], input, labelsHidden, elem);
          } else {
            addEventCommand(
              elems[x],
              elems[x].ownerDocument,
              prefixes,
              functs,
              labelsHidden,
              false
            );
          }
          input = null;
        }
      } catch (error) {
        console.log("Add label " + error.message + " " + elems[x].nodeName);
      }
    }
  }

  function addLabelsByType(labelElem, targetElem, labelsHidden, doc) {
    //Add command based on the type of element.
    if (targetElem.getAttribute("type") === "checkbox") {
      addLabelCommand(
        labelElem,
        "check",
        targetElem,
        wcf.checkboxCommands,
        labelsHidden,
        doc
      );
      addLabelCommand(
        labelElem,
        "uncheck",
        targetElem,
        wcf.checkboxCommands,
        labelsHidden,
        doc
      );
      addLabelCommand(
        labelElem,
        "",
        targetElem,
        wcf.checkboxCommands,
        labelsHidden,
        doc
      );
    } else if (
      targetElem.getAttribute("type") === "radio" ||
      targetElem.getAttribute("type") === "file"
    ) {
      addLabelCommand(
        labelElem,
        "",
        targetElem,
        wcf.clickElement,
        labelsHidden,
        doc
      );
    } else if (
      targetElem.nodeName === "SELECT" &&
      !targetElem.hasAttribute("multiple")
    ) {
      addLabelCommand(
        labelElem,
        "",
        targetElem,
        wcf.openDropdown,
        labelsHidden,
        doc
      );
    } else if (
      targetElem.getAttribute("role") === "listbox" &&
      targetElem.getAttribute("role") === "option"
    ) {
      addLabelCommand(
        labelElem,
        "",
        targetElem,
        wcf.clickElement,
        labelsHidden,
        doc
      );
    } else if (
      targetElem.getAttribute("type") === "email" ||
      targetElem.getAttribute("type") === "file"
    ) {
      addLabelCommand(
        labelElem,
        "",
        targetElem,
        wcf.clickElement,
        labelsHidden,
        doc
      );
    } else if (targetElem.getAttribute("contenteditable") === "true") {
      addLabelCommand(
        labelElem,
        "",
        targetElem,
        wcf.clickElement,
        labelsHidden,
        doc
      );
    } else {
      addLabelCommand(
        labelElem,
        "",
        targetElem,
        wcf.clickElement,
        labelsHidden,
        doc
      );
    }
    addLabelCommand(
      labelElem,
      "focus",
      targetElem,
      wcf.focusElement,
      labelsHidden,
      doc
    );
  }

  function addLabelCommand(
    label,
    commandText,
    targetElem,
    callback,
    labelsHidden,
    doc,
    useFinalResult
  ) {
    try {
      var text = me.getCommandText(label, commandText, labelsHidden, doc),
        words = null,
        exactMatch = false,
        command = null;

      if (text !== "wadup") {
        words = text.trim().split(" ");
        exactMatch = words.length === 1 ? true : false;
        command = {
          commandText: text,
          checkAltText: true,
          elem: targetElem,
          labelElem: label,
          commandFunction: callback,
          exactMatch: exactMatch,
          useWaitForFinal: true,
          useFinalResult: useFinalResult,
        };
        me.addCommands([command]);
      }
    } catch (error) {
      console.log("split error");
    }
  }

  function addSelectCommands(doc, selects) {
    var text = "",
      elem = "";

    for (let index = 0; index < selects.length; index++) {
      elem = selects[index];
      if (elem.id !== "waItems") {
        for (var i = 0; i < elem.options.length; i++) {
          text = me.getCommandText(elem.options[i], "", false, doc);
          if (text !== "wadup") addItemCommand(elem.options[i], elem, text);
        }
      }
    }
    //Add a command for each option
  }

  async function addSelectEvents(selects) {
    for (let index = 0; index < selects.length; index++) {
      const elem = selects[index];
      if (!elem.multiple) {
        elem.addEventListener("focus", openDropdown);
      }
    }
  }

  function openDropdown(e) {
    if (document.getElementById("waDropDown")) return;
    wcf.openDropdown({ elem: e.target });
  }

  function addItemCommand(option, elem, text) {
    var command = null;

    command = {
      commandText: text,
      elem: elem,
      optionText: option.innerText,
      optionValue: option.value,
      checkAltText: true,
      dataURL: option.getAttribute("data-url")
        ? option.getAttribute("data-url")
        : null,
      commandFunction: wcf.selectOption,
      useWaitForFinal: true,
    };
    me.addCommands([command]);
  }

  me.addAltCommands = function (labelsHidden, showAllLabels, parentElem) {
    //Adds text  vg (numbers) to certain element types that have no associated text (eg an image wrapped in a hyperlink)
    if (!parentElem) {
      var documents = me.documents;

      if (
        currentURL.indexOf("facebook.com/games/?store_visit") === -1 &&
        currentURL.indexOf("paypal.com/signin") === -1
      ) {
        documents.forEach(function (doc) {
          addAltLabels(labelsHidden, doc);
        });
        //Check
        if (currentURL.indexOf("fandom.com") > -1) {
          if (currentURL.indexOf("action=edit") === -1) {
            addAltElements(labelsHidden, showAllLabels);
          }
        } else {
          addAltElements(labelsHidden, showAllLabels);
        }
      } else {
        if (options.sendCommandMessage)
          options.sendCommandMessage("Labels are not available here.");
      }

      documents.forEach(function (doc) {
        AddScrollElements(labelsHidden, doc);
      });
    } else {
      addAltLabels(labelsHidden, parentElem);
      addAltElements(labelsHidden, showAllLabels);
      AddScrollElements(labelsHidden, document);
    }
  };

  // This function adds commands for certain element types without text and elements
  // with duplicate command text. Number based text will appear above the element
  function addAltElements(labelsHidden, showAllLabels) {
    var commands = [],
      currentElem = null,
      isParentCommand = false,
      command = null;

    commands = filterCommands();

    for (var x = 0; x < commands.length; x++) {
      try {
        command = commands[x];
        currentElem = command.labelElem ? command.labelElem : command.elem;
        if (currentURL.indexOf("amazon.com") > -1) {
          if (
            currentElem.getAttribute("aria-label") !== "Unmute" &&
            currentElem.getAttribute("aria-label") !== "Mute"
          ) {
            if (
              (currentElem.nodeName === "A" ||
                currentElem.nodeName === "BUTTON") &&
              getParentNodeByAttribute(
                currentElem.parentNode,
                "class",
                "_1ia8UV",
                currentElem.ownerDocument
              )
            ) {
              addAltElement(currentElem, labelsHidden, false);
            }
          }
        }

        if (
          currentElem.getAttribute("type") !== "checkbox" &&
          (!currentElem.id || currentElem.id.indexOf("altElem") === -1) &&
          !currentElem.getAttribute("alttext") &&
          currentElem.getAttribute("class") !== "Text" &&
          (!isParentCommand ||
            command.commandText === "addcircleoutline" ||
            currentURL.indexOf("mail.yahoo.com") > -1) &&
          needsAltText(
            currentElem,
            command,
            commands,
            command.document,
            showAllLabels
          )
        ) {
          addAltElement(currentElem, labelsHidden, false);
        }
      } catch (err) {
        console.log(
          "Alt command error " + err.message + " " + currentElem.nodeName
        );
      }
    }
  }

  function filterCommands() {
    var nodeName = null;

    return me.commands.filter(function (command) {
      //Change to variables
      if (command.elem && command.checkAltText) {
        var elem = command.elem;
        nodeName = elem.nodeName;
        return (
          elem.nodeName === "A" ||
          command.labelElem ||
          nodeName === "SPAN" ||
          nodeName === "BUTTON" ||
          nodeName === "SVG" ||
          nodeName === "svg" ||
          nodeName === "IMG" ||
          nodeName === "LI" ||
          nodeName === "UL" ||
          nodeName === "DIV" ||
          nodeName === "LABEL" ||
          nodeName === "I" ||
          nodeName === "TH" ||
          nodeName === "H3" ||
          nodeName === "P" ||
          nodeName === "H5" ||
          nodeName === "HEADER" ||
          nodeName === "TIME" ||
          nodeName === "AREA" ||
          nodeName === "PICTURE" ||
          nodeName === "FLUENT-BUTTON" ||
          nodeName === "FACEPLATE-TRACKER" ||
          nodeName === "SUMMARY" ||
          elem.type === "image" ||
          elem.type === "button" ||
          elem.type === "file" ||
          elem.type === "submit" ||
          elem.hasAttribute("email") ||
          (nodeName !== "INPUT" && elem.hasAttribute("data-testid")) ||
          elem.hasAttribute("data-region") ||
          elem.hasAttribute("data-alt-text") ||
          elem.getAttribute("name") === "button" ||
          elem.getAttribute("role") === "button" ||
          elem.getAttribute("role") === "tab" ||
          elem.getAttribute("role") === "checkbox" ||
          elem.getAttribute("role") === "gridcell" ||
          elem.getAttribute("role") === "option" ||
          elem.getAttribute("role") === "menuitem" ||
          elem.getAttribute("role") === "radio" ||
          elem.getAttribute("role") === "link" ||
          elem.getAttribute("role") === " link" ||
          elem.getAttribute("type") === "file" ||
          elem.getAttribute("type") === "submit" ||
          elem.getAttribute("type") === "button" ||
          elem.getAttribute("type") === "reset" ||
          elem.getAttribute("data-e2e") ||
          elem.id === "text"
        );
      } else {
        return false;
      }
    });
  }
  function addAltElement(currentElem, labelsHidden, addOutline) {
    var ind = 0,
      i = 0,
      lbl = null,
      input = null,
      prefixes = ["", "show ", "hide ", "focus "],
      functs = [wcf.clickElement, wcf.hover, wcf.mouseOut, wcf.focusElement];

    // if (me.testMode) currentElem.style.color = '#98FB98';
    if (currentElem.nodeName === "INPUT") {
      ind = altCommands.addSpan(
        currentElem,
        labelsHidden,
        addOutline,
        false,
        me.commands,
        true
      ); //Adds DIV element and returns command text
      if (isClickableInput(currentElem)) {
        addAltTextCommand(ind.toString(), currentElem, wcf.clickElement);
      } else {
        addAltTextCommand(ind.toString(), currentElem, wcf.focusElement);
      }
    } else if (currentElem.nodeName === "LABEL") {
      input = currentElem.htmlFor
        ? document.getElementById(currentElem.htmlFor)
        : null;
      if (!input && currentElem.htmlFor) {
        input = document.getElementsByName(currentElem.htmlFor);
        if (input) input = input[0];
      }

      if (input) {
        lbl = altCommands.addLabel(currentElem, labelsHidden, me.commands);
        if (lbl) addLabelsByType(lbl, input, false, currentElem.ownerDocument);
      } else {
        ind = altCommands.addSpan(
          currentElem,
          labelsHidden,
          addOutline,
          false,
          me.commands,
          true
        );
        for (i = 0; i < prefixes.length; i++) {
          addAltTextCommand(prefixes[i] + ind, currentElem, functs[i]);
        }
      }
    } else {
      ind = altCommands.addSpan(
        currentElem,
        labelsHidden,
        addOutline,
        false,
        me.commands,
        true
      ); //Adds DIV element and returns command text
      for (i = 0; i < prefixes.length; i++) {
        addAltTextCommand(prefixes[i] + ind, currentElem, functs[i]);
      }
    }
  }

  async function addAltScrollElement(currentElem, labelsHidden, addOutline) {
    var ind = altCommands.addSpan(
      currentElem,
      labelsHidden,
      addOutline,
      true,
      me.commands,
      true
    ); //Adds DIV element and returns command text
    addAltTextCommand(ind.toString(), currentElem, wcf.focusElement);
  }

  function isClickableInput(currentElem) {
    return (
      currentElem.type === "button" ||
      currentElem.type === "submit" ||
      currentElem.type === "color" ||
      currentElem.type === "file" ||
      currentElem.type === "image" ||
      currentElem.type === "radio" ||
      currentElem.type === "checkbox" ||
      currentElem.type === "a" ||
      currentElem.nodeName === "BUTTON" ||
      currentElem.type === "reset"
    );
  }

  var windowHeight = window.innerHeight,
    windowWidth = window.innerWidth;

  function isVisible(el, doc) {
    try {
      var rect = el.getBoundingClientRect();

      return inViewport(el, rect) && isVisibleInViewport(el, rect, doc);
    } catch (e) {
      console.log("Check visibility " + e.message);
      return false;
    }
  }

  var bottomOffset = currentURL.indexOf("mail.yahoo.com") > -1 ? 35 : 5;

  function inViewport(el, rect) {
    var minTop = el.nodeName === "VIDEO" ? -100 : -10;

    try {
      return (
        rect.top >= minTop &&
        rect.top <= windowHeight - bottomOffset &&
        rect.left > -10 &&
        rect.left + 20 <= windowWidth
      );
    } catch (e) {
      console.log("Viewport " + e.message);
    }
  }

  function isVisibleInViewport(el, rect, doc) {
    var elStyle = getComputedStyle(el),
      isYouTube = currentURL.indexOf("youtube.com") > -1 ? true : false,
      cls = el.getAttribute("class"),
      elName = el.nodeName,
      pointEl = null,
      elemCovered = false,
      parentRect = null,
      pointName = null,
      pointRect = null,
      elHref = typeof el.href == "string" ? el.href : "",
      aria = el.getAttribute("aria-label"),
      parentStyle = null,
      parentNode = null,
      style = null,
      pointStyle = null;

    if (aria && aria.toLowerCase() === 'next photo') {
      return true;
    }
   
    if (elStyle.display === "none" || elStyle.visibility === "hidden")
      return false;

    if (currentURL.indexOf("chatgpt.com") > -1) {
      if (elName === "svg" || elName === "SPAN") {
        return false;
      }
    }

    if (currentURL.indexOf("msn.com") > -1) {
      if (elName === "svg") {
        return false;
      }
    }

    if (me.modal) {
      if (hasParentWithId(el, "waModal")) {
        return true;
      } else {
        return false;
      }
    }
    
    if (currentURL.indexOf("youtube.com") > -1) {
      if (el.getAttribute('role') === 'button') {
        var btn = getParentNodeByTag(el.parentNode,'BUTTON');
        if (el.innerText === btn.innerText) return false;
      }
    }
    

    if (
      elName !== "A" &&
      elName !== "BUTTON" &&
      elName !== "INPUT" &&
      elName !== "LABEL" &&
      cls &&
      cls.indexOf("button") > -1 &&
      (el.getElementsByTagName("button").length ||
        el.querySelector("[role=button]"))
    )
      return false;
    if (elName === "DETAILS") return false;
    if (
      elName === "IMG" &&
      (!el.getAttribute("alt") ||
        el.getAttribute("alt").indexOf("search") > -1) &&
      !isHeader(el) &&
      getComputedStyle(el.parentNode).cursor !== "pointer"
    )
      return false;
    if (
      elName === "FORM" ||
      elName === "ARTICLE" ||
      elName === "SECTION" ||
      elName === "NAV"
    )
      return false;
    if (
      el.getAttribute("role") === "presentation " &&
      elName !== "DIV" &&
      elName !== "A" &&
      elName !== "BUTTON"
    )
      return false;
    if (
      el.hasAttribute("readonly") &&
      el.nodeName !== "TEXTAREA" &&
      el.nodeName !== "INPUT"
    )
      return false;
    //Check
    if (
      elName === "A" &&
      elHref &&
      elHref.indexOf("UTF8&ref_=sv_") > -1 &&
      elHref.indexOf("chat") === -1 &&
      !el.innerText
    )
      return false;
    //Youtube video cnx
   
    if (
      el.nodeName.toLowerCase().indexOf("cnx") > -1 ||
      (el.parentNode &&
        el.parentNode.nodeName.toLowerCase().indexOf("cnx") > -1)
    )
      return false;

    if (el.getAttribute("role") === "none") return false;
    if (el.type !== "checkbox" && el.type !== "radio") {
      if (
        elName !== "SELECT" &&
        !(
          elName === "A" &&
          getParentNodeByAttribute(el.parentNode, "id", "header")
        ) &&
        !(elName === "A" && el.getElementsByTagName("img").length) &&
        elName !== "LABEL" &&
        !el.getAttribute("htmlFor") &&
        !el.getElementsByTagName("input").length &&
        elName !== "SPAN" &&
        elName !== "AREA" &&
        elName !== "IMAGE" &&
        elName !== "svg" &&
        currentURL.indexOf("community.ebay") === -1
      ) {
        if (rect.height < 6 || (el.offsetWidth < 6 && rect.width < 6)) {
          if (
            (rect.top !== 0 && rect.height === 0) ||
            (el.innerText && el.innerText.length > 1) ||
            !el.innerText
          )
            return false;
        }
      } else {
        if (
          Number.isInteger(parseInt(elStyle.width)) &&
          parseInt(elStyle.width) < 6 &&
          Number.isInteger(parseInt(elStyle.height)) &&
          parseInt(elStyle.height) < 6
        )
          return false;
      }

      if (
        elName === "INPUT" &&
        el.type !== "button" &&
        el.type !== "submit" &&
        el.offsetHeight < 5
      )
        return false;
    } else {
      if (el.labels.length === 0) {
        if (rect.height < 6 || (el.offsetWidth < 6 && rect.width < 6)) {
          if (
            (rect.top !== 0 && rect.height === 0) ||
            (el.innerText && el.innerText.length > 1) ||
            !el.innerText
          )
            return false;
        }
      }
    }

    if (el.type === "checkbox" || el.type === "radio") {
      if (
        el.parentNode.nodeName === "LABEL" &&
        rect.height === 1 &&
        rect.width === 1
      ) {
        return true;
      }
    }
    if (
      elName === "TH" &&
      window.getComputedStyle(el.closest("table")).cursor === "pointer"
    )
      return false;

    if (elName !== "A" && elName !== "LABEL") {
      var input = el.getElementsByTagName("INPUT");
      if (input.length && input[0].value === el.innerText) return false;
    }

    if (elName === "LABEL" && el.htmlFor) {
      var elem = el.ownerDocument.getElementById(el.htmlFor);
      if (elem) {
        if (elem.type === "hidden") return false;
      }
    }

    if (el.getAttribute("role") == "group") return false;

    if (
      elName !== "VIDEO" &&
      !elHref &&
      (rect.left || rect.right) &&
      !rect.top &&
      !rect.left &&
      !rect.width
    )
      return false;

    if (
      el.getAttribute("disabled") === "true" ||
      el.getAttribute("disabled") === ""
    )
      return false;

    if (
      elName !== "A" &&
      elName !== "LI" &&
      elName !== "INPUT" &&
      elName !== "LABEL" &&
      elName !== "BUTTON" &&
      el.getAttribute("role") !== "option" &&
      el.getAttribute("role") !== "button" &&
      el.getAttribute("role") !== "link" &&
      el.getAttribute("role") !== " link" &&
      el.getElementsByTagName("a").length
    )
      return false;
    //Check
    if (currentURL.indexOf("craigslist.org") > -1) {
      if (getParentNodeByAttribute(el, "id", "search-results", doc))
        return true;
      if (getParentNodeByAttribute(el, "class", "result-info", doc)) {
        return true;
      }
    }

    //Check
    if (cls === "hidden-link") return false;

    //check
    if (currentURL.indexOf("/x.com") > -1) {
      if (elName === "SPAN" && el.innerHTML === "·") {
        return false;
      }
    }

    if (elName === "SPAN" && el.getAttribute("role") !== "button") {
      if (
        el.getElementsByTagName("button").length ||
        el.getElementsByTagName("a").length
      )
        return false;
    }

    if (
      elName === "SPAN" &&
      !el.hasAttribute("data-bind") &&
      !el.hasAttribute("onclick") &&
      !el.hasAttribute("href") &&
      !(el.hasAttribute("tabindex") && el.getAttribute("tabindex") > -1) &&
      !el.hasAttribute("data-testid") &&
      el.getAttribute("role") !== "menuitem" &&
      el.getAttribute("role") !== "link" &&
      el.getAttribute("role") !== "radio" &&
      el.getAttribute("role") !== "checkbox" &&
      el.getAttribute("role") !== "button" &&
      el.getAttribute("role") !== "tab"
    ) {
      if (
        !el.innerHTML &&
        elStyle.content === "none" &&
        elStyle.content === "none" &&
        !elStyle.background
      )
        return false;
      if (
        cls &&
        ((cls.toLowerCase().indexOf("arrow") > -1 &&
          cls.toLowerCase().indexOf("left") > -1) ||
          (cls.toLowerCase().indexOf("arrow") > -1 &&
            cls.toLowerCase().indexOf("right") > -1) ||
          cls.toLowerCase().indexOf("chevron-right") > -1 ||
          cls.toLowerCase().indexOf("chevron-left") > -1)
      )
        return true;
      if (
        !cls ||
        (cls.toLowerCase().indexOf("addthis") === -1 &&
          cls.toLowerCase().indexOf("favorite") === -1 &&
          cls.toLowerCase().indexOf("dropdown") === -1 &&
          cls.toLowerCase().indexOf("checkbox") === -1 &&
          cls.toLowerCase().indexOf("search") === -1 &&
          cls.toLowerCase().indexOf("bookmark") === -1 &&
          cls.toLowerCase().indexOf("close ") === -1 &&
          cls.toLowerCase().indexOf("button") === -1 &&
          cls.toLowerCase().indexOf("dropdown") === -1)
      ) {
        if (el.getAttribute("role") !== "button") {
          if (!isHeader(el)) return false;
        } else {
          if (!cls) return false;
        }
      }
    }

    if (el.nodeName === "LI") {
      var innerText = el.innerText,
        anch = el.getElementsByTagName("A");

      if (anch.length && innerText && anch[0].innerText === innerText)
        return false;
      if (
        anch.length &&
        isChild(anch[0], el) &&
        anch[0].href &&
        el.innerText &&
        anch[0].innerText &&
        el.innerText.trim().indexOf(anch[0].innerText.trim()) === 0
      )
        return false;
      var button = el.getElementsByTagName("BUTTON");
      if (button.length && innerText && button[0].innerText === innerText)
        return false;
    }

    if (
      el.href &&
      typeof el.href == "string" &&
      (el.href.indexOf("adsrvr") > -1 || el.href.indexOf("adpub") > -1)
    )
      return false;

    if (checkOpacity(el, doc)) return false;
    if (elName === "svg" && el.getAttribute("role") === "img") return false;
    if (el.getAttribute("aria-hidden") === "true" && el.nodeName === "IMG")
      return false;

    pointEl = getPointEl(el, rect, doc);
    elemCovered = pointEl !== el;

    if (elemCovered) {
      if (
        pointEl &&
        (pointEl.id === "notes" ||
          pointEl.getAttribute("class") === "notesHeader")
      )
        return false;

      if (
        elName === "BUTTON" &&
        aria &&
        (aria.toLowerCase() === "more" ||
          aria.toLowerCase().indexOf("accessibility") > -1 ||
          aria.indexOf("favorite") > -1)
      ) {
        return true;
      }
      if (
        el.href &&
        typeof el.href == "string" &&
        (el.href.indexOf("adsettings") > -1 ||
          el.href.indexOf("googleads") > -1 ||
          el.href.indexOf("ad.doubleclick") > -1 ||
          el.href.indexOf("adserve") > -1 ||
          el.href.indexOf("adsense") > -1 ||
          el.href.indexOf("adchoices") > -1)
      )
        return false;

      if (
        pointEl === null &&
        (rect.height || rect.width) &&
        rect.left > -5 &&
        rect.top > -5
      ) {
        return true;
      } else {
        if (!pointEl) {
          if (el.ownerDocument === document || !(rect.height && rect.width)) {
            return false;
          } else {
            return true;
          }
        }
      }
      var pointShadow = isInShadow(pointEl);
      if (pointShadow) {
        var shadowEl = isInShadow(el);
        if (pointShadow !== shadowEl) return false;
      }

      if (pointEl.id === "waMask") return false;
      if (checkDisplay(el.parentNode, doc)) return false;

      if (elName === "AREA" && rect.top) return true;

      pointRect = pointEl.getBoundingClientRect();
      if (
        (pointRect.width || pointRect.height) &&
        (rect.height || rect.width)
      ) {
        if (
          pointRect.top > rect.bottom ||
          pointRect.left > rect.left + rect.width
        ) {
          return true;
        }
      }

      if (cls && cls.indexOf("q-text") !== -1) {
        if (elName === "DIV" && el.innerText == el.innerHTML) {
          return true;
        } else {
          return false;
        }
      }

      if (isHeader(pointEl) && !isHeader(el)) return false;
      var isFacebook = currentURL.indexOf("facebook.com") > -1 ? true : false;

      pointName = pointEl.nodeName;

      if (getParentNodeByAttribute(pointEl, "id", "regularHelp")) return false;
      //check
      if (
        elName === "A" &&
        elHref === "" &&
        currentURL.indexOf("yahoo.com") > -1
      )
        return true;

      if (elName === "INPUT" && pointName === "LABEL") return true;

      if (
        elName === "LABEL" &&
        pointName === "INPUT" &&
        isVisible(pointEl, pointEl.ownerDocument) &&
        el.getElementsByTagName("INPUT").length
      ) {
        return true;
      }
      // if (
      //   isYouTube &&
      //   elName === "A" &&
      //   el.id === "endpoint" &&
      //   (el.getAttribute("role") === "link" || el.title === "Shorts")
      // ) {
      //   return false;
      // }

      if (
        pointEl &&
        (el.contains(pointEl) || isChild(pointEl, el)) &&
        el.getAttribute("contenteditable") !== "true"
      ) {
        return true;
      }

      if (isYouTube && elName === "A" && el.href && el.id === "endpoint") {
        return true;
      }

      if (
        cls &&
        cls.toLowerCase().indexOf("pause") > -1 &&
        el.ownerDocument.getElementsByTagName("VIDEO").length
      )
        return true;
      var pointIndex = pointCovering(pointEl, doc);
      pointStyle = getComputedStyle(pointEl);
      var elIndex = 0;
      if (pointIndex && pointIndex > 1) {
        elIndex = pointCovering(el, doc);
        if (elIndex === 0) return false;
        if (
          !elIndex ||
          (pointIndex > elIndex && !isHeader(el)) ||
          (elIndex > pointIndex &&
            isHeader(pointEl) &&
            !pointEl.contains(el)) ||
          (pointIndex === "8888888888888888" &&
            elIndex === "8888888888888888" &&
            !pointEl.contains(el) &&
            !el.contains(pointEl))
        )
          return false;
      } else if (
        pointIndex > elIndex &&
        pointStyle.width > window.innerWidth - 50 &&
        pointStyle.height > window.innerHeight - 50
      ) {
        return false;
      }

      if (
        rect.height > 30 &&
        pointEl.ownerDocument === el.ownerDocument &&
        !isCovered(el, pointEl, rect, doc)
      )
        return true;

      if (cls && cls.indexOf("favorite") > -1) return true;
      if (
        elName !== "svg" &&
        el.hasAttribute("rpl") &&
        el.id !== "search-input-chip"
      ) {
        if ((elName === "A" || elName === "BUTTON") && pointName === "A") {
          return true;
        }
        if (
          isHeader(el) ||
          (el.innerText && el.innerText.toLowerCase().indexOf("reply") > -1) ||
          (el.id && el.id.toLowerCase().indexOf("search") > -1)
        ) {
          return true;
        }
      }

      if (el.getAttribute("contenteditable") === "true") return true;

      if (aria === "Back" && elName !== "A" && elName !== "BUTTON") return true;

      if (
        isFacebook &&
        getParentNodeByAttribute(el.parentNode, "class", "x1y1aw1k")
      )
        return false;

      if (el.getAttribute("data-video-type")) return true;

      if (elName === "BUTTON" || elName === "A") {
        if (el.parentNode && el.parentNode.nodeType === 1) {
          parentRect = el.parentNode.getBoundingClientRect();
          if (
            parentRect.height === 0 &&
            parentRect.width === 0 &&
            !(parentRect.offsetLeft === 0 && parentRect.offsetTop === 0)
          )
            return false;
        }
      }

      if (el.parentNode && el.parentNode.nodeType === 1) {
        parentStyle = getComputedStyle(el.parentNode);
        if (
          parentStyle.visibility === "hidden" ||
          parentStyle.display === "none"
        )
          return false;
      }

      //check
      if (pointEl.nodeType === 1) {
        if (
          pointEl.getAttribute("class") === "search-filters-wrap" ||
          pointEl.getAttribute("class") === "search-filters-wrap"
        )
          return true;
        //Check
        if (
          pointEl.getAttribute("data-a-target") ===
          "player-overlay-click-handler"
        )
          return true;

        if (currentURL.indexOf("quora.com") > -1) {
          if (
            pointEl.hasAttribute("class") &&
            pointEl.getAttribute("class").indexOf("qu-borderRadius") > -1
          )
            return true;
        }
      }
      //google
      if (elHref && cls === "ro1ntb ZYbY5b ZHugbd") {
        return true;
      }
      if (currentURL.indexOf("pinterest.com") > -1) {
        if (
          pointEl.innerText &&
          pointEl.innerText.toLowerCase().indexOf("inbox") > -1
        )
          return true;
      }

      //Check
      if (currentURL.indexOf("bing.com") > -1) {
        if (currentURL.indexOf("bing.com/map") > -1) {
          if (
            elName === "A" &&
            el.hasAttribute("href") &&
            el.querySelector("img")
          ) {
            return true;
          }
        }
      }
      if (pointEl === document.documentElement) return true;
      //check
      if (elName === "VIDEO") return true;

      if (
        pointEl.nodeName === "I" &&
        el.href &&
        pointEl.offsetWidth < el.offsetWidth
      )
        return true;

      parentNode = el.parentNode;
      try {
        while (
          parentNode &&
          el.getRootNode() !== parentNode &&
          parentNode !== document.documentElement &&
          parentNode !== document.body &&
          parentNode !== document.body &&
          parentNode !== doc
        ) {
          if (parentNode.nodeName === "VIDEO") break;
          if (
            isYouTube &&
            parentNode.id &&
            parentNode.id.indexOf("player") > -1
          )
            return true;

          if (parentNode.nodeType === 1) {
            style = getComputedStyle(parentNode);
            if (
              style.overflow === "scroll" ||
              style.overflow === "auto" ||
              (style.overflow && style.overflow.indexOf("hidden")) > -1 ||
              style.overflow.indexOf("clip") > -1 ||
              style.overscrollBehavior === "contain" ||
              (style.overflowY && style.overflowY.indexOf("hidden") > -1) ||
              style.overflowY === "scroll" ||
              style.overflowY === "auto" ||
              style.overflowY.indexOf("clip") > -1 ||
              style.overscrollBehaviorY === "contain"
            ) {
              //facebook
              if (isFacebook) {
                if (
                  parentNode.className &&
                  parentNode.className
                    .toString()
                    .indexOf(
                      "rpm2j7zs k7i0oixp gvuykj2m j83agx80 cbu4d94t ni8dbmo4 du4w35lb q5bimw55"
                    ) > -1
                ) {
                  return false;
                }
                if (el.getAttribute("aria-haspopup") === "menu") {
                  return false;
                }
              }

              if (!visibleY(el, parentNode) && parseInt(style.flexShrink) > 0) {
                return false;
              }
            }

            if (
              parentNode.scrollLeft &&
              style.overflow.indexOf("hidden") === -1 &&
              style.overflow.indexOf("hidden") === -1
            ) {
              var left = el.offsetLeft ? el.offsetLeft : rect.left,
                visibleLeft =
                  left + el.offsetWidth >
                  el.offsetWidth + parentNode.scrollLeft,
                visibleRight =
                  el.offsetLeft - el.offsetWidth < parentNode.scrollLeft;

              if (!visibleLeft || !visibleRight) {
                return false;
              }
            } else {
              parentRect = parentNode.getBoundingClientRect();
              if (
                parentRect.height &&
                parentRect.left > -10 &&
                rect.left + 10 > parentRect.left + parentNode.offsetWidth &&
                style.flexShrink !== "0"
              ) {
                return false;
              }
              if (
                parentRect.height &&
                rect.left < parentRect.left &&
                style.flexShrink !== "0"
              ) {
                return false;
              }
            }
            if (
              style.visibility === "hidden" ||
              style.display === "none" ||
              style.maxHeight === 0 ||
              style.maxWidth === 0
            ) {
              return false;
            }
            if (parentNode === el) {
              return true;
            }
          }

          parentNode = parentNode.parentNode;
        }
      } catch (e) {
        console.log("parent " + e.message);
      }
      if (
        !el.offsetHeight &&
        !el.offsetWidth &&
        elName === "A" &&
        el.getElementsByTagName("img").length
      ) {
        if (el.childNodes[0].offsetHeight > 0) {
          return true;
        }
      }

      if (el.href && typeof el.href == "string") {
        if (
          (el.href.indexOf("=facebook") > -1 &&
            currentURL.indexOf("facebook") === -1) ||
          (el.href.indexOf("=pinterest") > -1 &&
            currentURL.indexOf("pinterest") === -1) ||
          (el.href.indexOf("=twitter") > -1 &&
            currentURL.indexOf("twitter") === -1) ||
          (el.href.indexOf("=instagram") > -1 &&
            currentURL.indexOf("instagram") === -1) ||
          (el.href.indexOf("=youtube") > -1 &&
            currentURL.indexOf("youtube") === -1) ||
          (el.href.indexOf("=linkedin") > -1 &&
            currentURL.indexOf("linkedin") === -1) ||
          (el.href.indexOf("=snapchat") > -1 &&
            currentURL.indexOf("snapchat") === -1) ||
          (el.href.indexOf("=flipboard") > -1 &&
            currentURL.indexOf("flipboard") === -1)
        ) {
          return true;
        }

        if (currentURL.indexOf("google.com") === -1) {
          if (
            (el.href.indexOf("facebook") > -1 &&
              currentURL.indexOf("facebook") === -1) ||
            (el.href.indexOf("pinterest") > -1 &&
              currentURL.indexOf("pinterest") === -1) ||
            (el.href.indexOf("twitter") > -1 &&
              currentURL.indexOf("twitter") === -1) ||
            (el.href.indexOf("instagram") > -1 &&
              currentURL.indexOf("instagram") === -1) ||
            (el.href.indexOf("youtube") > -1 &&
              currentURL.indexOf("youtube") === -1) ||
            (el.href.indexOf("linkedin") > -1 &&
              currentURL.indexOf("linkedin") === -1) ||
            (el.href.indexOf("snapchat") > -1 &&
              currentURL.indexOf("snapchat") === -1) ||
            (el.href.indexOf("flipboard") > -1 &&
              currentURL.indexOf("flipboard") === -1)
          ) {
            return true;
          }
        }
      }

      if (elName === "LABEL" && pointName !== "IFRAME") {
        var inp =
          el.getElementsByTagName("input")[0] ||
          el.getElementsByTagName("select")[0] ||
          el.querySelector("[contenteditable]");
        if (inp && isVisible(inp, inp.ownerDocument)) {
          return true;
        }
      }
      if (
        (aria && aria.toLowerCase().indexOf("favorite") > -1) ||
        (el.getAttribute("title") &&
          el.getAttribute("title").indexOf("favorite") > -1)
      )
        return true;
      if (currentURL.indexOf("amazon.com") > -1) {
        if (cls === "nav-profiles-menu-link" > -1) return false;
      }
      if (
        el.offsetWidth < 100 &&
        elName !== "SPAN" &&
        cls &&
        cls.toLowerCase().indexOf("arrow") === -1 &&
        cls &&
        (cls.toLowerCase().indexOf("next") > -1 ||
          cls.toLowerCase().indexOf("prev") > -1)
      ) {
        return true;
      }
      //check
      if (showSiteElems()) {
        if (
          elName === "BUTTON" &&
          !pointEl.innerText &&
          ((el.innerText && el.innerText.length > 1) ||
            el.hasAttribute("aria-label"))
        ) {
          return true;
        }

        if (
          elName === "A" &&
          elHref &&
          elHref.indexOf("#") === -1 &&
          (el.innerText || elHref.indexOf("/cart") > -1) &&
          pointName !== "INPUT"
        ) {
          return true;
        }

        if (
          el.getAttribute("role") === "BUTTON" &&
          (el.hasAttribute("aria-label") || el.hasAttribute("data-k"))
        ) {
          return true;
        }
      }

      if (pointEl.nodeType === 1) {
        if (
          pointStyle.visibility === "hidden" ||
          pointStyle.display === "none" ||
          pointStyle.backfaceVisibility === "hidden" ||
          pointStyle.background === "transparent"
        )
          return true;
        if (
          pointStyle.zIndex !== "auto" &&
          elStyle.zIndex !== "auto" &&
          Number.isInteger(parseInt(elStyle.zIndex)) &&
          parseInt(elStyle.zIndex)
        ) {
          if (Number.isInteger(parseInt(pointStyle.zIndex))) {
            if (parseInt(elStyle.zIndex) > parseInt(pointStyle.zIndex))
              return true;
          } else {
            return true;
          }
        }

        if (pointStyle.background === "transparent") {
          return true;
        }
        if (elName !== "INPUT" && elStyle.opacity < 0.3) {
          return false;
        }
      } else {
        return true;
      }
      if (
        (aria || (el.id && el.nodeName === "a" && el.href && el.innerText)) &&
        pointName === "HEADER"
      )
        return true;
      if (el.getAttribute("contenteditable") === "true") return true;

      if (
        ((elName === "LABEL" && !el.htmlFor) || isCustom(el)) &&
        !el.innerHTML
      )
        return false;

      if (elName === "LABEL" && el.htmlFor && rect.height > 5) {
        var inputEl = el.ownerDocument.getElementById(el.htmlFor);
        if (isVisible(inputEl, el.ownerDocument)) return true;
      }

      if (elName === "LABEL" && el.getElementsByTagName("textarea").length)
        return true;
      if (pointName === "I" && el.offsetHeight) return true;

      if (
        (pointEl.contains(el) || isChild(el, pointEl)) &&
        aria !== "React" &&
        pointName !== "OL" &&
        pointName !== "BODY" &&
        pointName !== "FORM" &&
        pointName !== "HEADER" &&
        pointName !== "NAV" &&
        pointName !== "FOOTER" &&
        ((el.offsetHeight && el.offsetWidth) ||
          elName === "svg" ||
          elName === "AREA" ||
          elName === "IMAGE")
      ) {
        if (pointEl.nodeType === 1) {
          if (rect.top <= pointRect.bottom - 10 && pointRect.height < 800) {
            return true;
          }
        }
      }

      //Check
      if (elName === "BUTTON" && el.getAttribute("aria-disabled") === "false")
        return true;

      if (
        (elName === "A" || elName === "BUTTON") &&
        cls &&
        cls.indexOf("carousel") > -1 &&
        !el.innerText
      )
        return true;
      if (pointName === "path" && (elName === "svg" || elName === "IMG"))
        return true;
      if (
        pointName !== "path" &&
        pointName !== "IMG" &&
        pointName !== "BUTTON" &&
        pointName !== "SVG" &&
        pointName !== "INPUT" &&
        (pointEl.offsetHeight === 0 || pointEl.offsetWidth === 0) &&
        pointEl.innerHTML === ""
      )
        return true;
      if (pointEl.offsetWidth >= windowWidth) return false;
      if (
        (pointName === "INPUT" &&
          pointEl.contains(el) &&
          el.getAttribute("role") !== "button" &&
          elName !== "SPAN" &&
          elName !== "BUTTON" &&
          elName !== "IMG" &&
          elName !== "A") ||
        pointName === "image"
      )
        return true;

      if (el.offsetWidth && pointName === "FORM" && elName === "BUTTON")
        return true;
      if (
        el.offsetWidth &&
        pointName === "FOOTER" &&
        getParentNodeByTag(el, "FOOTER", el.ownerDocument)
      )
        return true;
      if (elName === "SPAN" && pointName === "BODY") return true;
      if (pointName === "SPAN" && el.getAttribute("role") === "button")
        return true;
      if (
        getParentNodeByTag(pointEl, "HEADER", pointEl.ownerDocument) &&
        !getParentNodeByTag(el, "HEADER", el.ownerDocument)
      )
        return false;

      if (
        aria &&
        el.nodeName === "INPUT" &&
        !isHeader(el) &&
        (el.getAttribute("type") === "text" ||
          el.getAttribute("type") === "checkbox" ||
          el.getAttribute("type") === "radio" ||
          !el.hasAttribute("type"))
      )
        return true;

      if (
        ((elName === "A" && el.href) ||
          el.hasAttribute("role") ||
          elName === "BUTTON") &&
        el.offsetHeight > 150 &&
        el.offsetWidth > 150
      )
        return true;
      if (elName === "Button" && pointName === "I") return true;

      if (cls && cls.indexOf("left") > -1 && cls.indexOf("arrow") > -1)
        return true;
      if (cls && cls.indexOf("right") > -1 && cls.indexOf("arrow") > -1)
        return true;
      if (
        elName === "A" &&
        el.innerText &&
        el.innerText.toLowerCase().indexOf(" accessibility") > -1
      )
        return true;
      if (
        isHeader(el) &&
        isHeader(pointEl) &&
        (elName === "A" || elName === "BUTTON") &&
        cls &&
        cls.indexOf("search") > -1 &&
        el.getElementsByTagName("svg").length
      )
        return true;
      if (
        elName === "SPAN" ||
        elName === "BUTTON" ||
        elName === "A" ||
        elName === "I"
      ) {
        var title = el.title;
        if (
          title &&
          (title.toLowerCase().indexOf("close ") > -1 ||
            title.toLowerCase().indexOf(" close") > -1 ||
            (title && title.toLowerCase().indexOf("dismiss") > -1) ||
            (title && title.toLowerCase().indexOf("previous") > -1) ||
            (title && title.toLowerCase().indexOf("next") > -1) ||
            (cls && cls.toLowerCase().indexOf("next") > -1) ||
            (cls && cls.toLowerCase().indexOf("previous") > -1) ||
            (cls && cls.toLowerCase().indexOf("dismiss") > -1))
        ) {
          return true;
        }
      }

      if (
        pointName === "IFRAME" &&
        pointEl.ownerDocument !== el.ownerDocument
      ) {
        return true;
      }

      return false;
    }

    if (elStyle.cursor === "move") return false;
    return true;
  }

  function checkOpacity(parentNode, doc) {
    try {
      var style = null,
        docElement = document.documentElement,
        docBody = document.body;

      while (
        parentNode &&
        parentNode !== docElement &&
        parentNode !== doc &&
        parentNode !== docBody
      ) {
        if (
          parentNode.nodeType === 1 &&
          parentNode.nodeName !== "INPUT" &&
          parentNode.nodeName !== "SELECT"
        ) {
          style = getComputedStyle(parentNode);
          if (style.opacity < 0.3) {
            return true;
          }
        }
        parentNode = parentNode.parentNode;
      }
    } catch (error) {
      console.log("Parent error");
    }
    return false;
  }

  function checkDisplay(parentNode, doc) {
    try {
      var style = null,
        docElement = document.documentElement,
        docBody = document.body;

      while (
        parentNode &&
        parentNode !== docElement &&
        parentNode !== doc &&
        parentNode !== docBody
      ) {
        if (
          parentNode.nodeType === 1 &&
          parentNode.nodeName !== "INPUT" &&
          parentNode.nodeName !== "SELECT"
        ) {
          style = getComputedStyle(parentNode);
          if (style.display === "none") {
            return true;
          }
        }
        parentNode = parentNode.parentNode;
      }
    } catch (error) {
      console.log("Parent error");
    }
    return false;
  }
  function belowParent(parentNode, pointEl, el, doc) {
    try {
      var rect = null,
        elRect = el.getBoundingClientRect(),
        docElement = document.documentElement,
        docBody = document.body;

      while (
        parentNode &&
        parentNode !== docElement &&
        parentNode !== doc &&
        parentNode !== docBody
      ) {
        if (parentNode.nodeType === 1) {
          rect = parentNode.getBoundingClientRect();
          if (rect.bottom < elRect.top + elRect.height) {
            return true;
          }
          if (parentNode === pointEl) {
            return;
          }
        }
        parentNode = parentNode.parentNode;
      }
    } catch (error) {
      console.log(error.message);
    }
    return false;
  }

  function isChild(el, parentNode) {
    var elems = parentNode.childNodes;

    if (el.parentNode === parentNode) return true;
    for (let index = 0; index < elems.length; index++) {
      if (el === elems[index]) {
        return true;
      }
    }
  }

  function isHeader(el) {
    try {
      if (el.nodeType === 1) {
        var menuParent = getParentNodeByAttribute(
            el,
            "class",
            "menu",
            el.ownerDocument
          ),
          headerParent =
            el.nodeName === "HEADER" ||
            getParentNodeByTag(el.parentNode, "NAV", el.ownerDocument) ||
            getParentNodeByTag(el.parentNode, "HEADER", el.ownerDocument) ||
            getParentNodeByAttribute(el, "id", "header", el.ownerDocument) ||
            getParentNodeByAttribute(el, "class", "header", el.ownerDocument);

        if (
          menuParent ||
          (headerParent &&
            headerParent.offsetWidth >= 400 &&
            el.ownerDocument === window.document)
        ) {
          var menu = headerParent || menuParent,
            menuRect = menu.getBoundingClientRect();

          if (menuRect.top < 175) {
            var elRect = el.getBoundingClientRect();
            if (elRect.top < 250) return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
    } catch (error) {
      console.log("header rect");
    }
  }

  function isFooter(el) {
    return getParentNodeByTag(el.parentNode, "FOOTER", el.ownerDocument);
  }

  function isCovered(el, pointEl, rect, doc) {
    var centerX = 0,
      centerY = 0,
      arr = null;

    try {
      centerX = rect.left + 2;
      centerY = rect.top + rect.height - 2;
      arr = doc.elementsFromPoint(centerX, centerY);
      if (arr[0]) {
        if (
          arr[0] == el &&
          (!belowParent(el.parentNode, pointEl, el, el.ownerDocument) ||
            el.innerText)
        )
          return false;
      }

      centerX = rect.left + rect.width * 0.5 + 2;
      centerY = rect.top + rect.height * 0.5 - 2;
      arr = doc.elementsFromPoint(centerX, centerY);
      if (arr[0]) {
        if (
          arr[0] == el &&
          (!belowParent(el.parentNode, pointEl, el, el.ownerDocument) ||
            el.innerText)
        )
          return false;
      }
    } catch (error) {
      console.log("ElementFromPoint error " + error.message);
      return false;
    }
    return true;
  }

  function showSiteElems() {
    return (
      currentURL.indexOf("spotify.com") > -1 ||
      currentURL.indexOf("fandom.com") > -1 ||
      currentURL.indexOf(".weather.com") > -1 ||
      currentURL.indexOf("cnn.com") > -1 ||
      currentURL.indexOf("espn.com") > -1 ||
      currentURL.indexOf("quora.com") > -1 ||
      currentURL.indexOf("twitch.tv") > -1 ||
      currentURL.indexOf("foxnews.com") > -1
    );
  }

  function isCustom(elem) {
    if (elem.tagName.includes("-")) {
      return true;
    } else {
      return false;
    }
  }

  function getPointEl(el, rect, doc) {
    try {
      var topAdjust = 7;

      if (el.ownerDocument !== window.document) {
        return getFrameCoords(el, rect.left + 5, rect.top + topAdjust);
      } else {
        return doc.elementFromPoint(rect.left + 5, rect.top + topAdjust);
      }
    } catch (e) {
      console.log("point " + e.message);
      return false;
    }
  }

  function getFrameCoords(elem, left, top) {
    var rectFrame = currentFrameAbsolutePosition(),
      elRect = elem.getBoundingClientRect();

    if (rectFrame) {
      left = elRect.left + rectFrame.left;
      top = elRect.top + rectFrame.top;
    } else {
      rectFrame = getIframe(elem.ownerDocument);
      if (rectFrame) {
        rectFrame = rectFrame.getBoundingClientRect();
        left = elRect.left + rectFrame.left;
        top = elRect.top + rectFrame.top;
      }
    }

    return document.elementFromPoint(left + 10, top + 10);
  }

  function getIframe(doc) {
    var frames = document.getElementsByTagName("iframe");

    function getFrameByReferrer(frames) {
      var childFrames = null,
        frameMatch = null,
        frame = null;

      try {
        for (var x = 0; x < frames.length; x++) {
          frame = frames[x];
          if (isSameOrigin(frames[x]) && frame.contentDocument) {
            if (
              frames[x].contentWindow.document.referrer ===
              doc.defaultView.document.referrer
            ) {
              return frames[x];
            }
            childFrames =
              frames[x].contentDocument.getElementsByTagName("iframe");
            if (childFrames.length)
              frameMatch = getFrameByReferrer(childFrames);
            if (frameMatch) return frameMatch;
          }
        }
      } catch (error) {
        console.log("frame error");
      }
    }

    return getFrameByReferrer(frames);
  }

  function isSameOrigin(iframe) {
    if (iframe.src) {
      var iframeOrigin = new URL(iframe.src);
      if (iframeOrigin) iframeOrigin = iframeOrigin.origin;
      return iframeOrigin === window.location.origin;
    } else {
      return true; // If src is not set, consider it as a same origin
    }
  }

  function currentFrameAbsolutePosition() {
    let currentWindow = window;
    let currentParentWindow;
    let positions = [];
    let rect = null;

    while (currentWindow !== window.top) {
      currentParentWindow = currentWindow.parent;
      for (let idx = 0; idx < currentParentWindow.frames.length; idx++)
        if (currentParentWindow.frames[idx] === currentWindow) {
          for (let frameElement of currentParentWindow.document.getElementsByTagName(
            "iframe"
          )) {
            if (frameElement.contentWindow === currentWindow) {
              rect = frameElement.getBoundingClientRect();
              positions.push({ x: rect.x, y: rect.y });
            }
          }
          currentWindow = currentParentWindow;
          break;
        }
    }

    if (positions.length === 0) return null;

    return positions.reduce(
      (accumulator, currentValue) => {
        return {
          x: accumulator.x + currentValue.x,
          y: accumulator.y + currentValue.y,
        };
      },
      { left: 0, top: 0 }
    );
  }

  function pointCovering(pointEl, doc) {
    var parentNode = pointEl,
      parentStyle = null,
      zIndex = 1,
      currentIndex = 0,
      parIndex = 0,
      body = document.body,
      docElement = doc.documentElement,
      parentRect = null;

    while (
      parentNode &&
      parentNode !== doc &&
      parentNode !== docElement &&
      parentNode !== body
    ) {
      try {
        if (parentNode.nodeType === 1) {
          parentStyle = getComputedStyle(parentNode);
          if (parentStyle.zIndex === 0) {
            return 0;
          }
          parIndex = parseInt(parentStyle.zIndex);

          if (Number.isInteger(parIndex)) {
            if (
              parIndex &&
              parentNode !== pointEl.ownerDocument &&
              ((parseInt(parentStyle.width) > windowWidth - 20 &&
                parIndex >= 2) ||
                parIndex > zIndex)
            ) {
              currentIndex = parIndex > currentIndex ? parIndex : currentIndex;
            }
          }

          if (
            (!parentNode.offsetTop && parentStyle.position === "fixed") ||
            parentStyle.position === "sticky"
          ) {
            parentRect = parentNode.getBoundingClientRect();
            if (
              parentRect.left === 0 &&
              parentNode.offsetWidth >= windowWidth - 20
            ) {
              if (parIndex && parIndex > 10) {
                return 88888888888888888;
              } else {
                currentIndex = 8888888888888888;
              }
            }
          }
        }
      } catch (error) {
        console.log(error.message);
      }
      parentNode = parentNode.parentNode;
    }

    return currentIndex;
  }

  if (Array.prototype.indexOf === undefined) {
    Array.prototype.indexOf = function (element) {
      for (var i = 0, l = this.length; i < l; i++) {
        if (this[i] == element) return i;
      }
      return -1;
    };
  }

  var visibleY = function (el, parentNode) {
    var rect = el.getBoundingClientRect(),
      top = rect.top,
      parentRect = parentNode.getBoundingClientRect(),
      parentTop = 0,
      parentBottom = 0;

    if (parentNode.nodeType !== 1) return true;
    if (el.ownerDocument !== document) {
      var frameRect = currentFrameAbsolutePosition();
      if (frameRect) {
        top = top + frameRect.top;
        parentBottom = parentRect.bottom + frameRect.bottom;
        parentTop = parentRect.top + frameRect.top;
      }
    } else {
      parentBottom = parentRect.bottom;
      parentTop = parentRect.top;
    }

    if (top > parentBottom + 10) return false;
    // Check if the element is out of view due to a container scrolling
    if (top < parentTop - 10) return false;

    return true;
  };

  function returnDocuments(doc) {
    var docs = [];

    function getShadowRoots(ele) {
      return [ele, ...ele.querySelectorAll("*")]
        .filter((e) => !!e.shadowRoot)
        .flatMap((e) => [e.shadowRoot, ...getShadowRoots(e.shadowRoot)]);
    }

    function addIframes(currentDocument) {
      if (currentDocument) {
        docs.push(currentDocument);
      } else {
        currentDocument = document;
      }

      currentDocument.querySelectorAll("iframe").forEach((frame) => {
        try {
          if (
            frame.contentWindow.document &&
            frame.src.indexOf("robots.txt") === -1
          ) {
            docs.push.apply(docs, getShadowRoots(frame.contentWindow.document));
            addIframes(frame.contentWindow.document);
          } else {
            if (currentURL.indexOf("secure5.store.apple.com") > -1) {
              return;
            }
          }
        } catch (e) {
          if (currentURL.indexOf("secure5.store.apple.com") > -1) {
            return;
          }
        }
      });
    }

    docs.push(doc);
    var shadowroots = getShadowRoots(doc);
    docs.push.apply(docs, shadowroots);
    addIframes();
    return docs;
  }

  function needsAltText(elem, command, commands, doc, showAllLabels) {
    var currentElem = null,
      currHref = null,
      nodeName = elem.nodeName,
      style = getComputedStyle(elem),
      aria = elem.getAttribute("aria-label"),
      cls = elem.getAttribute("class");

    if (me.modal) {
      if (hasParentWithId(elem, "waModal")) {
        if (showAllLabels) {
          return true;
        }
      } else {
        return false;
      }
    }

    if (elem.getAttribute("role") === "text") return false;
    if (command.elem.type === "checkbox" || command.elem.type === "radio") {
      if (
        command.elem.parentNode.nodeName === "LABEL" &&
        command.elem.offsetHeight === 1 &&
        command.elem.offsetHeight === 1
      ) {
        return true;
      }
    }

    if (
      currentURL.indexOf("msn.com") > -1 &&
      elem.nodeName === "FLUENT-BUTTON" &&
      elem.hasAttribute("aria-label") &&
      elem.getAttribute("aria-label").toLowerCase().indexOf("close") > -1
    ) {
      return false;
    }

    if (
      elem.nodeName !== "A" &&
      elem.nodeName !== "LABEL" &&
      elem.nodeName !== "INPUT" &&
      elem.getElementsByTagName("button").length
    )
      return false;
    if (elem.nodeName === "FLUENT-BUTTON" && elem.shadowRoot) return false;

    if (
      elem.getAttribute("aria-label") &&
      elem.getAttribute("aria-label").toLowerCase() === "search" &&
      elem.getAttribute("role") === "button"
    )
      return true;
    if (
      (elem.nodeName === "I" ||
        (elem.nodeName === "DIV" && elem.getAttribute("role") !== "button") ||
        isCustom(elem)) &&
      !elem.innerHTML &&
      getComputedStyle(elem, ":before").content === "none" &&
      getComputedStyle(elem, ":after").content === "none"
    ) {
      return false;
    }

    if (
      elem.nodeName === "I" &&
      elem.getAttribute("aria-hidden") === "true" &&
      elem.innerText
    )
      return false;

    if (elem.nodeName === "svg" && elem.getAttribute("aria-hidden") === "true")
      return false;

    if (
      elem.getAttribute("role") === "button" &&
      !aria &&
      !elem.hasAttribute("jsaction") &&
      !elem.hasAttribute("jsdata") &&
      !elem.hasAttribute("id") &&
      !isHeader(elem) &&
      !isFooter(elem) &&
      elem.nodeName !== "BUTTON" &&
      style.cursor !== "pointer" &&
      style.cursor !== "default" &&
      elem.innerText
    )
      return false;
    //Lebel without cursor or adjacent input
    if (
      elem.nodeName === "LABEL" &&
      !elem.htmlFor &&
      !elem.querySelector("[contenteditable]") &&
      !elem.getElementsByTagName("select").length &&
      !elem.getElementsByTagName("input").length &&
      style.cursor !== "pointer"
    )
      return false;
    if (
      elem.nodeName === "INPUT" &&
      getParentNodeByTag(elem.parentNode, "LABEL")
    )
      return false;
    if (
      showAllLabels &&
      currentURL.indexOf("mail.yahoo.com") > -1 &&
      elem.getAttribute("aria-label") === "Select message"
    )
      return false;

    if (
      currentURL.indexOf("mail.yahoo.com") === -1 &&
      elem.id &&
      elem.id.indexOf("altElem") > -1
    )
      return false;

    if (elem.nodeName === "ARTICLE") return false;

    if (
      nodeName === "A" &&
      style.cursor !== "auto" &&
      style.cursor !== "default" &&
      style.cursor !== "pointer" &&
      style.cursor !== "zoom-in" &&
      !elem.innerText
    )
      return false;

    if (currentURL.indexOf("google.com") > -1) {
      if (document.getElementsByTagName("scrolling-carousel").length) {
        //check
        if (getParentNodeByTag(elem.parentNode, "SCROLLING-CAROUSEL"))
          return true;
      } else if (
        nodeName === "IMG" &&
        getParentNodeByTag(elem.parentNode, "VIDEO-VOYAGER")
      ) {
        return true;
      }
    }

    if (currentURL.indexOf("amazon.com") > -1) {
      if (
        getParentNodeByAttribute(
          elem.parentNode,
          "class",
          "webPlayerContainer",
          doc
        )
      ) {
        return false;
      }

      if (getParentNodeByAttribute(elem.parentNode, "class", "lAtJLC", doc)) {
        return false;
      }
    }

    if (
      (currentURL.indexOf("facebook.com") > -1 &&
        elem.href &&
        elem.href.indexOf("/messages") > -1) ||
      (nodeName === "SPAN" &&
        elem.className &&
        elem.className.toString().indexOf("a8c37x1j") > -1 &&
        getComputedStyle(elem, ":before").content &&
        elem.getElementsByTagName("span").length)
    ) {
      return true;
    }

    if (currentURL.indexOf("facebook.com") > -1) {
      if (
        (nodeName === "SPAN" && elem.getAttribute("class") === "_5cue _5cuf") ||
        elem.getAttribute("class") === "_5cue _3zn3 _5cuf"
      ) {
        return false;
      }
      if (elem.getAttribute("role") === "gridcell") return false;
    }

    if (
      currentURL.indexOf("netflix.com") > -1 &&
      elem.getAttribute("aria-label") &&
      elem.className &&
      elem.className === "slider-refocus"
    ) {
      return true;
    }

    if (
      currentURL.indexOf("youtube.com") > -1 &&
      (elem.nodeName !== "SPAN" ||
        elem.parentNode.getAttribute("class") ===
          "vp-cc-element vp-show float bottom") &&
      getParentNodeByAttribute(
        elem.parentNode,
        "aria-label",
        "Yahoo Video Player",
        doc
      )
    )
      return false;

    if (currentURL.indexOf("youtube.com") > -1) {
   if (elem.nodeName === "A" && elem.id === "thumbnail") return false;

      if (
        elem.getAttribute("aria-label") &&
        elem.getAttribute("aria-label") === "Share" &&
        elem.getAttribute("aria-haspopup")
      )
        return false;
    }

    //check
    if (nodeName === "BUTTON") {
      if (elem.getAttribute("data-is-focusable") === "false") return false;
    }

    if (currentURL.indexOf("tiktok.com") > -1) {
      if (
        nodeName === "A" &&
        command.commandText &&
        elem.getElementsByTagName("svg").length &&
        !elem.getAttribute("data-e2e")
      ) {
        return true;
      } else if (
        nodeName === "SPAN" &&
        elem.getElementsByTagName("img").length
      ) {
        if (
          elem.className &&
          elem.className
            .toString()
            .indexOf("tiktok-tuohvl-SpanAvatarContainer") !== -1
        )
          return true;
        var html = elem.innerHTML;
        if (html && html.indexOf("loading") > -1) {
          return false;
        }
      } else if (nodeName === "SPAN") {
        if (getSiblingByTag(elem, "A") || getSiblingByTag(elem, "SPAN")) {
          return false;
        }
      } else if (elem.getAttribute("data-e2e") === "nav-discover-href") {
        return true;
      }
    }

    if (currentURL.indexOf("reddit.com") > -1) {
      if (
        !showAllLabels &&
        ((elem.firstChild &&
          elem.firstChild.id &&
          elem.firstChild.id.indexOf("AwardBadges") > -1) ||
          (elem.parentNode.id &&
            elem.parentNode.id.indexOf("AwardBadges") > -1) ||
          getSiblingByID(elem, "AwardBadges"))
      ) {
        return false;
      }
    }

    if (currentURL.indexOf("mail.yahoo.com") > -1) {
      if (elem.parentNode.getAttribute("role") === "gridcell") {
        return true;
      }
    }

    if (currentURL.indexOf("bing.com") > -1) {
      var anchor = getParentNodeByTag(elem.parentNode, "A");
      if (
        elem.getAttribute("role") === "button" &&
        anchor &&
        anchor.getAttribute("class") &&
        anchor.getAttribute("class").indexOf("comment") > -1 &&
        anchor.innerText
      ) {
        return false;
      }
      if (
        elem.getAttribute("class") &&
        elem.getAttribute("class") === "br-voidlink br-imgClickWrap"
      ) {
        return false;
      }

      if (
        elem.getAttribute("role") === "tab" &&
        (!elem.innerText || showAllLabels)
      ) {
        return true;
      }

      if (
        elem.getAttribute("class") &&
        elem.getAttribute("class").indexOf("richImgLnk") > -1 &&
        elem.parentNode.getAttribute("class") &&
        elem.parentNode.getAttribute("class").indexOf("imgContainer nofocus") >
          -1
      )
        return false;

      if (
        elem.getAttribute("h") &&
        elem.getAttribute("h").indexOf("video") > -1 &&
        !command.commandText
      ) {
        return true;
      }
    }

    if (currentURL.indexOf("fandom.com") > -1) {
      if (
        elem.getAttribute("class") &&
        elem.getAttribute("class").indexOf("wds-dropdown__toggle") > -1
      ) {
        if (elem.getElementsByTagName("a").length) return false;
      }

      if (
        elem.getAttribute("class") &&
        (elem.getAttribute("class").indexOf("MediaCard") > -1 ||
          elem.getAttribute("class").indexOf("TweetAction") > -1)
      ) {
        return false;
      }

      if (
        elem.parentNode.getAttribute("class") &&
        elem.parentNode
          .getAttribute("class")
          .indexOf("global-navigation__link-icon") > -1
      ) {
        return false;
      }
    }

    if (currentURL.indexOf("espn") > -1) {
      if (command.commandText && elem.innerText.indexOf("Log In") > -1)
        return true;
    }

    if (currentURL.indexOf("pinterest.com") > -1) {
      // if (nodeName === "DIV" && elem.getAttribute("role") === "button")
      //   return true;
      if (
        getParentNodeByAttribute(
          elem.parentNode,
          "class",
          "emoji-scroll-wrapper",
          doc
        )
      ) {
        return false;
      }
    }

    if (currentURL.indexOf("twitch.tv") > -1) {
      if (
        nodeName !== "TEXTAREA" &&
        getParentNodeByAttribute(
          elem.parentNode,
          "data-test-selector",
          "chat-scrollable-area__message-container",
          doc
        )
      ) {
        return false;
      }

      if (
        getParentNodeByAttribute(
          elem.parentNode,
          "class",
          "featured-content-carousel__item-container featured-content-carousel__item-container--description featured-content-carousel__item-container--offset-2 featured-content-carousel__item-container--left-2",
          doc
        )
      ) {
        return false;
      }

      if (
        getParentNodeByAttribute(
          elem.parentNode,
          "class",
          "featured-content-carousel__item-container featured-content-carousel__item-container--description featured-content-carousel__item-container--offset-1 featured-content-carousel__item-container--right-1",
          doc
        )
      ) {
        return false;
      }

      if (
        nodeName === "IMG" &&
        getParentNodeByAttribute(
          elem.parentNode,
          "class",
          "featured-content-carousel__wrapper"
        )
      ) {
        return false;
      }
    }

    if (currentURL.indexOf("office.com")) {
      if (
        nodeName === "A" &&
        elem.getAttribute("class") &&
        elem.getAttribute("class").indexOf("mru-list-item") > -1
      )
        return true;
    }

    if (currentURL.indexOf("ebay.com") > -1) {
      if (
        elem.getAttribute("target") === "_blank" &&
        elem.getElementsByTagName("img").length
      ) {
        return true;
      }
    }

    if (currentURL.indexOf("weather.com") > -1) {
      if (
        elem.parentNode.getAttribute("class") &&
        elem.parentNode.getAttribute("class").indexOf("CountryList") > -1
      ) {
        return false;
      }
    }

    if (currentURL.indexOf("apple.com") > -1) {
      if (command.commandText === "Browse All") return false;
    }

    if (
      document.getElementsByTagName("video").length &&
      currentURL.indexOf("cnn.com") === -1 &&
      currentURL.indexOf("youtube.com") === -1 &&
      currentURL.indexOf("/x.com") === -1 &&
      currentURL.indexOf("instagram.com") === -1 &&
      currentURL.indexOf("weather.com") === -1 &&
      currentURL.indexOf("pinterest.com") === -1
    ) {
      if (cls && cls.toLowerCase().indexOf("print") > -1) return true;
    }

    if (elem.getAttribute("aria-label") === "Pin page") return true;

    if (
      elem.getAttribute("h") &&
      elem.getAttribute("h").indexOf("ID=video") > -1
    ) {
      return true;
    }

    if (
      nodeName === "A" &&
      !getComputedStyle(elem, "background-image") &&
      getComputedStyle(elem, ":before").content === "none" &&
      getComputedStyle(elem, ":after").content === "none" &&
      (!elem.href ||
        (elem.href && elem.href === currentURL + "#") ||
        elem.href.indexOf("javascript:") > -1) &&
      !elem.innerHTML
    )
      return false;
    if (elem.nodeName === "BUTTON" && elem.querySelector("[role=button")) {
      return false;
    }
    if (!command.commandText) {
      if (checkRelatedNodes(elem, elem.nodeName, doc)) return false;
      if (aria) {
        //Check alt
        if (
          aria.toLowerCase().indexOf("next") > -1 ||
          aria.toLowerCase().indexOf("prev") > -1
        )
          return true;
      }
      if (cls && cls.indexOf("left") > -1 && cls.indexOf("arrow") > -1)
        return true;
      if (cls && cls.indexOf("right") > -1 && cls.indexOf("arrow") > -1)
        return true;
      if (elem.nodeName === "LABEL") {
        if (elem.htmlFor && elem.innerHTML) return true;
      }

      if (
        elem.nodeName !== "BUTTON" &&
        elem.nodeName !== "SPAN" &&
        elem.className &&
        elem.className.toString().toLowerCase().indexOf("search") > -1
      )
        return true;

      if (elem.href) {
        for (var x = 0; x < commands.length; x++) {
          currentElem = commands[x].elem;
          currHref = currentElem.href;
          if (
            currentElem &&
            currHref &&
            currHref.indexOf("#") === -1 &&
            currHref.indexOf("javascript:") === -1 &&
            elem.href === currHref &&
            elem !== currentElem
          ) {
            //Check for a hyperlink width a duplicate href attribute that also has text
            var ariaLabel = elem.getAttribute("aria-label");
            //Youtube
            if (ariaLabel && ariaLabel.indexOf("Next (SHIFT+n)") > -1)
              return true;
          }
        }
      }

      if (style.visibility === "hidden" || style.display === "none")
        return false;

      return true;
    } else {
      var commandText = command.commandText.toLowerCase();

      if (
        currentURL.indexOf("mail.yahoo.com") === 0 &&
        (commandText.indexOf("@") > -1 ||
          commandText.indexOf(".com") > -1 ||
          commandText.indexOf(".org") > -1 ||
          commandText.indexOf(".gov") > -1 ||
          commandText.indexOf(".edu") > -1 ||
          commandText.indexOf("/") > -1 ||
          (commandText.indexOf(".") > -1 && commandText.indexOf("/") > -1))
      )
        return true;

      if (nodeName === "A" && commandText.indexOf("http") > -1) return true;

      if (cls !== null) {
        if (cls.indexOf("next") > -1 || cls.indexOf("prev") > -1) {
          return true;
        }
      }

      if (checkRelatedNodes(elem, elem.nodeName, doc)) return false;
      if (
        (style.cursor === "default" &&
          !aria &&
          !elem.hasAttribute("jsname") &&
          !elem.htmlFor &&
          elem.getAttribute("role") !== "link" &&
          elem.nodeName !== "BUTTON" &&
          !elem.innerText &&
          elem.getAttribute("type") !== "submit" &&
          (elem.nodeName !== "LABEL" || isFooter(elem)) &&
          !elem.href) ||
        (style.cursor === "text" &&
          elem.nodeName !== "LABEL" &&
          elem.nodeName !== "BUTTON")
      )
        return false;
      if (
        style.cursor !== "pointer" &&
        elem.getAttribute("type") !== "submit" &&
        elem.getAttribute("role") !== "link" &&
        elem.nodeName !== "P" &&
        elem.nodeName !== "LABEL" &&
        !aria &&
        isFooter(elem) &&
        elem.innerText
      )
        return false;
      if (aria !== null) {
        //Check alt
        if (
          aria.toLowerCase().indexOf("next") > -1 ||
          aria.toLowerCase().indexOf("prev") > -1
        )
          return true;
      }
      if (cls && cls.indexOf("left") > -1 && cls.indexOf("arrow") > -1)
        return true;
      if (cls && cls.indexOf("right") > -1 && cls.indexOf("arrow") > -1)
        return true;

      if (
        commandText.indexOf("facebook") > -1 ||
        commandText.indexOf("pinterest") > -1 ||
        commandText.indexOf("twitter") > -1 ||
        commandText.indexOf("instagram") > -1 ||
        commandText.indexOf("hacker news") > -1 ||
        commandText.indexOf("youtube") > -1 ||
        commandText.indexOf("linkedin") > -1 ||
        commandText.indexOf("snapchat") > -1 ||
        commandText.indexOf("flipboard") > -1 ||
        commandText === "e-mail" ||
        commandText === "email" ||
        commandText === "rss" ||
        commandText === "spotify" ||
        commandText === "iheartradio" ||
        commandText === "google" ||
        commandText === "apple" ||
        commandText === "android" ||
        commandText === "kindle" ||
        commandText === "windows" ||
        commandText === "windows phone" ||
        (commandText === "notification" &&
          (elem.nodeName === "A" || elem.nodeName === "BUTTON"))
      )
        return true;

      if (isNumeric(commandText) || commandText.indexOf("$") > -1) return true;
      if (elem.nodeName === "LABEL" && !isInShadow(elem)) {
        var htmlFor = elem.htmlFor;
        if (htmlFor) {
          var input = elem.ownerDocument.getElementsByName(htmlFor);
          input = input.length ? input[0] : null;
          if (!input) input = elem.ownerDocument.getElementById(htmlFor);

          if (
            !input &&
            getComputedStyle(elem).cursor !== "pointer" &&
            !elem.getElementsByTagName("INPUT").length
          ) {
            return false;
          }
        }
      }

      if (
        (commandText.toLowerCase() === "search" ||
          commandText.toLowerCase() === "previous" ||
          commandText.toLowerCase() === "next") &&
        !getParentNodeByAttribute(elem.parentNode, "alttext", "true", doc)
      )
        return true;
    }

    //Check alt
    if (
      nodeName === "A" &&
      elem.querySelector("img") &&
      (!elem.innerText || showAllLabels)
    )
      return true;

    if (currentURL.indexOf("craigslist.org")) {
      if (
        elem.getAttribute("class") === "result-title hdrlnk" ||
        elem.getAttribute("class") === "screen-reader-text" ||
        elem.getAttribute("class") === "banish icon icon-trash" ||
        elem.getAttribute("class") === "icon icon-star" ||
        elem.getAttribute("class") === "icon icon-star fav"
      ) {
        return true;
      }
    }

    var innerText = elem.innerText ? elem.innerText.toLowerCase() : "";
    if (innerText === "skip to content" || innerText === "skip to main content")
      return false;

    if (style.visibility === "hidden" || style.display === "none") return false;

    return showAllLabels ? true : false;
  }

  function isInShadow(node) {
    if (node.nodeType === 1) {
      var el = node.getRootNode();
      if (el instanceof ShadowRoot) {
        return el;
      } else if (node.shadowRoot) {
        return node;
      } else {
        return null;
      }
    }
  }

  function isNumeric(value) {
    value = value.toLowerCase().replace("k", "");
    return !isNaN(value);
  }

  function checkRelatedNodes(elem, nodeName, doc) {
    var parentLink = null,
      svgSibling = null,
      html = "",
      anchor = null,
      buttonChild = null,
      anchorParent = null,
      parentButton = null,
      anchorSibling = null,
      divParent = null,
      input = null,
      divButton = null,
      siblingLabel = null,
      parentBtn = null,
      buttonSibling = null,
      anchors = null,
      sibling = null,
      imgSibling = null,
      inputSibling = null,
      parentListItem = null,
      linkChild = null,
      spanSibling = null,
      divChild = null,
      anchorChild = null,
      links = null,
      buttonNode = null;

    if (nodeName === "A") {
      input = elem.getElementsByTagName("input");
      divButton = elem.querySelector('[role="button"]');
      anchorParent = getParentNodeByTag(elem.parentNode, "A");
      buttonChild = elem.getElementsByTagName("button");
      sibling = getSiblingByTag(elem, "A");
      parentLink = getParentNodeByAttribute(
        elem.parentNode,
        "role",
        "link",
        doc
      );

      if (
        getParentNodeByTag(elem.parentNode, "BUTTON") ||
        (parentLink && parentLink.hasAttribute("alttext")) ||
        (anchorParent && anchorParent.href === elem.href) ||
        (divButton &&
          elemMatch(divButton) &&
          divButton.nodeName !== "SPAN" &&
          divButton.innerText === elem.innerText) ||
        (buttonChild.length &&
          buttonChild[0].innerText.trim() === elem.innerText.trim() &&
          elemMatch(buttonChild[0])) ||
        (input.length &&
          (input[0].type === "submit" ||
            input[0].type === "button" ||
            input[0].type === "search")) ||
        (input.length &&
          elem.href &&
          elem.href.indexOf("#") === -1 &&
          elem.href !== "javascript:void(0);" &&
          input[0].hasAttribute("alttext")) ||
        checkForSiblingAnchorMatch(elem, elem.href) ||
        checkForChildAnchorMatch(elem) ||
        isAnchorCommandMatch(elem)
      ) {
        return true;
      }
    } else if (nodeName === "svg") {
      if (elem.id === "equalizer") return false;
      svgSibling = getSiblingByTag(elem, "svg");
      divParent = getParentNodeByAttribute(
        elem.parentNode,
        "alttext",
        "true",
        elem.ownerDocument
      );
      anchorParent = getParentNodeByTag(elem.parentNode, "A");
      parentButton = getParentNodeByTag(elem.parentNode, "BUTTON");
      spanSibling = getSiblingByTag(elem, "SPAN");
      if (anchorParent) return true;
      if (
        parentButton ||
        getSiblingByTag(elem, "A") ||
        getSiblingByTag(elem, "FORM") ||
        getParentNodeByAttribute(elem.parentNode, "role", "button", doc) ||
        (!elem.id &&
          svgSibling &&
          svgSibling.hasAttribute("class") &&
          elem.getAttribute("class") === svgSibling.getAttribute("class") &&
          elem.title === svgSibling.title &&
          elem.getAttribute("aria-label") ===
            svgSibling.getAttribute("aria-label")) ||
        (getSiblingByTag(elem, "BUTTON") && !svgSibling) ||
        getSiblingByTag(elem, "INPUT") ||
        getSiblingByTag(elem, "LABEL") ||
        (spanSibling && elemMatch(spanSibling)) ||
        divParent ||
        getParentNodeByTag(elem.parentNode, "LABEL") ||
        getParentNodeByAttribute(elem.parentNode, "role", "option", doc) ||
        getParentNodeByAttribute(elem.parentNode, "role", "button", doc) ||
        getParentNodeByAttribute(elem.parentNode, "onclick", "(", doc) ||
        elem.getAttribute("class") === "waMinimize"
      )
        return true;
    } else if (nodeName === "SPAN" && elem.getAttribute("role") !== "button") {
      sibling = getSiblingByTag(elem, "SPAN");
      parentButton = getParentNodeByAttribute(
        elem.parentNode,
        "role",
        "button",
        doc
      );
      parentBtn = getParentNodeByTag(elem.parentNode, "BUTTON");
      siblingLabel = getSiblingByTag(elem, "LABEL");
      anchorSibling = getSiblingByTag(elem, "A");
      buttonSibling = getSiblingByTag(elem, "BUTTON");
      inputSibling = getSiblingByTag(elem, "INPUT");
      anchor = getParentNodeByTag(elem.parentNode, "A");

      svgSibling = getSiblingByTag(elem, "svg");
      parentLink = getParentNodeByAttribute(
        elem.parentNode,
        "role",
        "link",
        doc
      );

      if (
        (parentBtn && (elemMatch(parentBtn) || !elem.innerText) && !elem.id) ||
        buttonSibling ||
        getParentNodeByAttribute(elem.parentNode, "alttext", "true", doc) ||
        getParentNodeByTag(elem.parentNode, "INPUT") ||
        (svgSibling && svgSibling.hasAttribute("alttext") && elem.innerText) ||
        parentLink ||
        getParentNodeByAttribute(elem.parentNode, "role", "option", doc) ||
        // && (elemMatch(anchor) || !elem.innerText)
        anchor ||
        (sibling && !elem.hasAttribute("role") && elemMatch(sibling)) ||
        (inputSibling && inputSibling.hasAttribute("alttext")) ||
        (parentButton && parentButton.hasAttribute("alttext")) ||
        (siblingLabel && siblingLabel.hasAttribute("alttext")) ||
        (anchorSibling && !elem.id) ||
        elem.querySelector("[role=button]") ||
        (getParentNodeByTag(elem.parentNode, "SPAN") && elem.innerText) ||
        elem.getElementsByTagName("input").length ||
        elem.getElementsByTagName("label").length ||
        elem.getElementsByTagName("button").length ||
        getParentNodeByAttribute(
          elem.parentNode,
          "role",
          "menuitemradio",
          doc
        ) ||
        elem.getElementsByTagName("a").length
      )
        return true;
      html = elem.innerHTML.replace(/<\!--.*?-->/g, "");
      if (
        !html &&
        elem.getAttribute("role") !== "button" &&
        !getComputedStyle(elem, "background-image") &&
        getComputedStyle(elem, ":before").content === "none" &&
        getComputedStyle(elem, ":after").content === "none"
      )
        return true;
    } else if (
      nodeName === "LI" ||
      nodeName === "SUMMARY" ||
      nodeName === "H3" ||
      nodeName === "H5" ||
      nodeName === "DIV"
    ) {
      anchors = elem.getElementsByTagName("a");
      buttonNode = elem.getElementsByTagName("button");
      buttonChild = elem.querySelector("[role=button]");
      linkChild = elem.querySelector("[role=link]");
      divChild = elem.querySelector("div");
      if (currentURL.indexOf("/x.com") > -1) {
        if (elem.getAttribute("role") !== "button") return false;
      }

      if (linkChild) return true;

      if (
        (buttonChild &&
          elemMatch(buttonChild) &&
          elem.getAttribute("role") !== "link" &&
          elem.getAttribute("role") !== "button") ||
        (elem.getAttribute("role") !== "button" &&
          getParentNodeByAttribute(elem.parentNode, "role", "button", doc)) ||
        (elem.getAttribute("role") !== "button" &&
          getParentNodeByTag(elem.parentNode, "A")) ||
        (elem.getAttribute("role") !== "button" &&
          elem.getElementsByTagName("button").length) ||
        elem.getElementsByTagName("label").length ||
        elem.getElementsByTagName("input").length ||
        (elem.getAttribute("role") !== "button" &&
          divChild &&
          elemMatch(divChild)) ||
        (nodeName !== "H5" &&
          elem.getAttribute("role") !== "button" &&
          getSiblingByTag(elem, "BUTTON")) ||
        (anchors.length && elemArrayMatch(anchors)) ||
        elem.querySelector("[role=combobox]") ||
        getParentNodeByTag(elem.parentNode, "BUTTON") ||
        (elem.getAttribute("role") !== "button" &&
          getParentNodeByAttribute(elem.parentNode, "alttext", "true", doc)) ||
        buttonNode.length
      )
        return true;

      html = elem.innerHTML.replace(/<\!--.*?-->/g, "");
      if (
        elem.getAttribute("role") !== "button" &&
        !html &&
        !getComputedStyle(elem, "background-image") &&
        window.getComputedStyle(elem, ":before").content === "none" &&
        window.getComputedStyle(elem, ":after").content === "none"
      )
        return true;
    } else if (
      nodeName === "IMG" ||
      nodeName === "I" ||
      nodeName === "PICTURE"
    ) {
      imgSibling = getSiblingByTag(elem, "IMG");
      inputSibling = getSiblingByTag(elem, "INPUT");
      imgSibling ? elemMatch(imgSibling) : false;
      parentListItem = getParentNodeByTag(elem.parentNode, "LI");
      anchor = getParentNodeByTag(elem.parentNode, "A");

      if (currentURL.indexOf("/x.com") > -1 && getSiblingByTag(elem, "IMG"))
        return true;
      if (
        elem.hasAttribute("aria-label") &&
        elem.getAttribute("role") === "BUTTON"
      )
        return false;
      if (
        elem.id === "GreenMicPage" ||
        elem.id === "RedMicPage" ||
        (parentListItem && parentListItem.hasAttribute("alttext")) ||
        getParentNodeByTag(elem.parentNode, "BUTTON") ||
        getParentNodeByTag(elem.parentNode, "LABEL") ||
        (elem.nodeName !== "PICTURE" &&
          elem.nodeName !== "IMG" &&
          getParentNodeByAttribute(elem.parentNode, "alttext", "true", doc)) ||
        ((elem.nodeName === "IMG" || elem.nodeName === "PICTURE") &&
          anchor &&
          (anchor.hasAttribute("alttext") || elemMatch(anchor)) &&
          anchor.href &&
          anchor.href.indexOf("#") === -1 &&
          anchor.href.toLowerCase().indexOf("javascript:") === -1) ||
        (inputSibling && elemMatch(inputSibling)) ||
        getParentNodeByAttribute(elem.parentNode, "alttext", "true", doc) ||
        getParentNodeByAttribute(elem.parentNode, "role", "button", doc) ||
        getParentNodeByAttribute(elem.parentNode, "onclick", "(", doc) ||
        elem.querySelector("[role=button")
      )
        return true;
    } else if (nodeName === "LABEL") {
      // htmlFor = elem.getAttribute('htmlFor');
      anchorChild = elem.getElementsByTagName("a");
      anchorParent = getParentNodeByTag(elem.parentNode, "A");
      if (getParentNodeByTag(elem.parentNode, "BUTTON")) return true;
      if (
        anchorParent &&
        anchorParent.href &&
        anchorParent.innerText === elem.innerText
      )
        return true;
      if (
        anchorChild.length &&
        !elem.getElementsByTagName("input").length &&
        anchorChild[0].innerText === elem.innerText
      )
        return true;
    } else if (
      elem.hasAttribute("role") &&
      elem.getAttribute("role") === "button" &&
      elem.nodeName !== "BUTTON"
    ) {
      links = elem.getElementsByTagName("a").length;
      anchorParent = getParentNodeByTag(elem.parentNode, "A");
      if (
        links.length ||
        (anchorParent && elemMatch(anchorParent)) ||
        getParentNodeByAttribute(elem.parentNode, "role", "button", doc)
      )
        return true;
    } else if (
      elem.nodeName !== "BUTTON" &&
      elem.hasAttribute("role") &&
      elem.getAttribute("role") !== "button" &&
      elem.getAttribute("role") !== "link"
    ) {
      if (
        elem.querySelector("[role=button]") ||
        elem.getElementsByTagName("a").length ||
        elem.getElementsByTagName("input").length ||
        elem.getElementsByTagName("button").length ||
        elem.getElementsByTagName("label").length
      )
        return true;
    } else if (nodeName === "P") {
      if (
        getSiblingByTag(elem, "P") ||
        getParentNodeByAttribute(elem.parentNode, "alttext", "true", doc) ||
        elem.querySelector("alttext")
      ) {
        return true;
      }
    } else {
      if (
        elem.nodeName !== "BUTTON" &&
        elem.getAttribute("role") !== "button" &&
        !elem.hasAttribute("onclick") &&
        (getParentNodeByAttribute(elem.parentNode, "alttext", "true", doc) ||
          getParentNodeByTag(elem.parentNode, "BUTTON") ||
          elem.getElementsByTagName("BUTTON").length ||
          elem.getElementsByTagName("A").length)
      )
        return true;
    }

    return false;
  }

  function checkForChildAnchorMatch(elem) {
    var children = elem.children,
      currentElem = null,
      currHref = "";

    for (var x = 0; x < children.length; x++) {
      currentElem = children[x];
      currHref = currentElem.href;
      if (currentElem && currentElem !== elem) {
        if (
          currHref &&
          currHref === elem.href &&
          currentElem.hasAttribute("altText") &&
          currHref.indexOf("javascript:") === -1 &&
          currHref !== currentURL + "#"
        ) {
          return true;
        }
      }
    }
  }

  var checkForSiblingAnchorMatch = function (e, href) {
    // if no parent, return no sibling
    if (!e.parentNode) {
      return false;
    }
    // first child of the parent node
    let sibling = e.parentNode.firstChild,
      rect = null;

    // collecting siblings
    while (sibling) {
      try {
        if (sibling.nodeType === 1) {
          rect = sibling.getBoundingClientRect();
          if (
            sibling !== e &&
            inViewport(sibling, rect) &&
            sibling.nodeName === "A" &&
            sibling.href &&
            sibling.href.indexOf("#") === -1 &&
            sibling.href.indexOf("javascript:") === -1 &&
            sibling.href === href &&
            sibling.hasAttribute("alttext")
          ) {
            return true;
          }
        }
      } catch (error) {
        console.log(error.message);
      }

      sibling = sibling.nextSibling;
    }
    return false;
  };

  function isAnchorCommandMatch(elem) {
    var currentElem = null;

    for (var x = 0; x < me.commands.length; x++) {
      currentElem = me.commands[x].elem;
      if (
        currentElem &&
        currentElem.hasAttribute("alttext") &&
        currentElem !== elem &&
        currentElem.href &&
        currentElem.href === elem.href &&
        currentElem.href.indexOf("#") === -1 &&
        currentElem.href.indexOf("javascript:") === -1 &&
        !currentElem.innerText &&
        currentElem.innerText === elem.innerText
      ) {
        return true;
      }
    }
  }

  function getSiblingByTag(e, tagName) {
    // first child of the parent node
    try {
      let sibling = e.parentNode.firstChild;
      // collecting siblings
      while (sibling) {
        if (sibling !== e) {
          if (sibling.nodeName === tagName) return sibling;
        }
        sibling = sibling.nextSibling;
      }
    } catch (error) {
      console.log(error.message);
    }

    return false;
  }

  function getSiblingByID(elem, value) {
    // first child of the parent node
    let sibling = elem.parentNode.firstChild;
    // collecting siblings
    while (sibling) {
      try {
        if (sibling !== elem && sibling.nodeType === 1) {
          if (sibling.id && sibling.id.indexOf(value) > -1) {
            return true;
          }
        }
      } catch (error) {
        console.log(error.message);
      }

      sibling = sibling.nextSibling;
    }
    return false;
  }

  function getParentNodeByTag(parentNode, nodeName, doc) {
    var docElement = document.documentElement,
      docBody = document.body,
      shadowRoot = getShadowHost(parentNode);

    parentNode = shadowRoot ? shadowRoot : parentNode;
    while (parentNode && parentNode !== docElement && parentNode !== docBody) {
      try {
        if (parentNode.nodeType === 1) {
          if (parentNode.nodeName === nodeName) {
            return parentNode;
          }
        }
      } catch (error) {
        console.log(error.message);
      }
      parentNode = parentNode.parentNode;
    }

    return null;
  }

  function getParentNodeByAttribute(parentNode, attr, value, doc) {
    var currentValue = null,
      docElement = document.documentElement,
      docBody = document.body,
      shadowRoot = getShadowHost(parentNode);

    parentNode = shadowRoot ? shadowRoot : parentNode;

    try {
      while (
        parentNode &&
        parentNode !== docElement &&
        parentNode !== doc &&
        parentNode !== docBody
      ) {
        if (parentNode.nodeType === 1) {
          currentValue = parentNode.getAttribute(attr);
          if (currentValue && currentValue.toLowerCase().indexOf(value) > -1) {
            return parentNode;
          }
        }
        parentNode = parentNode.parentNode;
      }
    } catch (e) {
      console.log("Parent attribute error");
    }

    return null;
  }

  function getShadowHost(node) {
    if (!node) return null;
    try {
      var el = node.getRootNode();
      if (node instanceof DocumentFragment) {
        return el.host;
      } else if (node.shadowRoot) {
        return el.host;
      } else {
        return null;
      }
    } catch (error) {}
  }

  function addAltTextCommand(text, elem, callBack, useFinalResult) {
    var command = {
      commandText: text,
      elem: elem,
      commandFunction: callBack,
      checkAltText: true,
      useFinalResult: useFinalResult,
      useWaitForFinal: true,
      exactMatch: true,
    };

    me.addCommands([command]);
  }

  function addAltLabels(labelsHidden, parentElem, showAllLabels) {
    var selector =
        'input:not([type]), input[type=image], input[type=time], input[type=post], input[type=input], input[type=url], input[type=textfield], input[type=text], input[type=search], input[type="checkbox"], input[type=radio], input[type=tel], input[type=date], input[type=email], input[type=phoneNumber], input[type=password], input[type=number], [role=textbox], textarea, select, [contenteditable=true]',
      inputs =
        parentElem instanceof ShadowRoot
          ? getShadowElems(parentElem, selector)
          : parentElem.querySelectorAll(selector),
      labels =
        parentElem instanceof ShadowRoot
          ? getShadowElems(parentElem, "label")
          : parentElem.querySelectorAll("label"),
      currentElem = null,
      anchor = null,
      hasAnchorParent = false,
      hasLabelParent = false,
      lbl = null;

    //Check each element for a corresponding label using the For attribute
    for (var x = 0; x < inputs.length; x++) {
      currentElem = inputs[x];
      if (isVisible(currentElem, parentElem)) {
        if (
          currentElem.hasAttribute("contenteditable") &&
          !currentElem.hasAttribute("tabindex")
        ) {
          currentElem.tabIndex = 0;
        }
        if (!labelMatch(currentElem, labels)) {
          anchor = getParentNodeByTag(currentElem.parentNode, "A");
          hasAnchorParent = anchor && elemMatch(anchor);
          hasLabelParent = getParentNodeByTag(
            currentElem.parentNode,
            "LABEL",
            currentElem.ownerDocument
          );
          if (
            !hasLabelParent ||
            (!hasLabelParent.innerText &&
              !hasAnchorParent &&
              currentElem.getAttribute("alttext") !== "true" &&
              (!currentElem.id || currentElem.id.indexOf("altElem") === -1))
          ) {
            lbl = altCommands.addLabel(currentElem, labelsHidden, me.commands);
            addLabelsByType(lbl, currentElem, false, parentElem);
          }
        }
      }
    }
  }

  function labelMatch(input, labels) {
    var label = null;

    for (var x = 0; x < labels.length; x++) {
      label = labels[x];
      if (
        ((label.htmlFor &&
          (label.htmlFor === input.id || label.htmlFor === input.name)) ||
          input.parentNode === label) &&
        isVisible(label, label.ownerDocument)
      ) {
        return true;
      }
    }
    return false;
  }

  async function AddScrollElements(labelsHidden, doc) {
    var selector =
        'infinite-scroller, ul, div:not([wascrolllabel="false"]):not(#waDropdown), aside, nav, section, left-nav',
      elems =
        doc instanceof ShadowRoot
          ? getShadowElems(doc, selector)
          : doc.querySelectorAll(selector),
      rect = null,
      style = null;

    try {
      elems.forEach(function (elem) {
        rect = elem.getBoundingClientRect();
        if (elem.offsetWidth > 150 && elem.offsetHeight > 300) {
          style = getComputedStyle(elem);
          if (
            hasScrollBar(elem, "vertical", style) &&
            inViewport(elem, rect) &&
            style.opacity > 0.2 &&
            style.display !== "none" &&
            style.visibility === "visible"
          ) {
            addScrollElem(labelsHidden, elem, style);
            addScrollEvent(elem);
          }
        }
      });
    } catch (e) {
      console.log("Scroll Mouse error");
    }
  }

  async function addScrollElem(labelsHidden, elem, style) {
    if (
      (elem.getAttribute("class") &&
        elem.getAttribute("class").toLowerCase().indexOf("textarea__textarea") >
          -1) ||
      !elem.offsetHeight ||
      !elem.offsetWidth
    )
      return;

    if (!isScrollOverlap(elem)) {
      addAltScrollElement(elem, labelsHidden, true);
      if (!elem.tabIndex || elem.tabIndex < 0) elem.tabIndex = 0;
      elem.setAttribute("wascrolllabel", "true");
      elem.style.outlineColor = "SKYBLUE";
      elem.style.outlineWidth = "1px";
      elem.style.outlineStyle = "solid";
    }
  }

  function hasScrollBar(element, dir, style) {
    var scrollable = false;

    if (dir === "vertical") {
      scrollable =
        style.overflow.indexOf("scroll") > -1 ||
        style.overflow === "auto" ||
        style.overflow.indexOf("clip") > -1 ||
        style.overflow === "contain" ||
        style.overscrollBehavior === "contain" ||
        style.overflow.indexOf("overlay") > -1 ||
        style.overflowY.indexOf("scroll") > -1 ||
        style.overflow.indexOf("clip") > -1 ||
        style.overflowY === "auto" ||
        style.overflowY.indexOf("overlay") > -1 ||
        style.overscrollBehaviorY === "contain";
    } else {
      scrollable =
        style.overflow.indexOf("scroll") > -1 ||
        style.overflow === "auto" ||
        style.overflow.indexOf("overlay") > -1 ||
        style.overflow === "contain" ||
        style.overflowX.indexOf("scroll") > -1 ||
        style.overflowX.indexOf("overlay") > -1 ||
        style.overflowX === "auto" ||
        style.overscrollBehaviorX === "contain";
    }
    if (!scrollable) element.setAttribute("wascrolllabel", "false");
    return (
      scrollable &&
      element.offsetHeight > 240 &&
      element.scrollHeight - 50 > element.offsetHeight
    );
  }

  function isScrollOverlap(elem) {
    var elems = document.querySelectorAll("[waScrolllabel=true]"),
      rect1 = elem.getBoundingClientRect(),
      rect2 = null;

    for (let index = 0; index < elems.length; index++) {
      if (elems[index] !== elem) {
        rect2 = elems[index].getBoundingClientRect();
        if (isOverlap(rect1, rect2)) {
          return true;
        }
      }
    }
  }

  function isOverlap(rect1, rect2) {
    if (
      !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
      )
    ) {
      return true;
    } else {
      return false;
    }
  }

  async function addScrollEvent(elem) {
    if (elem.id === "waDropdown") return;
    if (elem.getAttribute("wascrollEvent") !== "true") {
      elem.setAttribute("wascrollEvent", "true");
      elem.addEventListener("scroll", function (e) {
        if (
          document.scrollingElement.scrollTop === 0 &&
          e.target !== document.scrollingElement &&
          e.target.offsetWidth < 400 &&
          currentURL.indexOf("twitch") > -1
        )
          return;
        if (options.elementClicked) options.elementClicked(400);
      });
    }
  }

  // End initializing commands

  //Public methodsh
  // Adds commands to all elements returned by the specified selector using the prefixes array (e.g. 'click")
  me.addChromeCommands = function () {
    me.addCommands(getChromeCommands());
  };

  function getChromeCommands() {
    return [
      {
        commandText: "new tab",
        commandFunction: wcf.newTab,
        useWaitForFinal: true,
        exactMatch: true,
      },
      {
        commandText: "web search *",
        commandFunction: wcf.search,
        useFinalResult: true,
        useWaitForFinal: true,
      },
      {
        commandText: "open page *",
        commandFunction: wcf.openTab,
      },
      {
        commandText: "tab *",
        commandFunction: wcf.selectTab,
        isNumeric: true,
      },
      {
        commandText: "close tab",
        commandFunction: wcf.closeTab,
      },
      {
        commandText: "last tab",
        commandFunction: wcf.lastTab,
      },
      {
        commandText: "next tab",
        commandFunction: wcf.nextTab,
      },
      {
        commandText: "previous tab",
        commandFunction: wcf.previousTab,
      },
      {
        commandText: "bookmark page",
        commandFunction: wcf.bookmarkPage,
      },
      {
        commandText: "remove bookmark",
        commandFunction: wcf.removeBookmark,
      },
      {
        commandText: "zoom in",
        commandFunction: wcf.zoomIn,
      },
      {
        commandText: "zoom out",
        commandFunction: wcf.zoomOut,
      },
      {
        commandText: "reset zoom",
        commandFunction: wcf.resetZoom,
      },
      // , {
      //   commandText: 'weather',
      //   url: 'www.weatherbug.com',
      //   commandFunction: wcf.openShortcut
      // }, {
      //   commandText: 'news',
      //   url: 'https://apnews.com/',
      //   commandFunction: wcf.openShortcut
      // },  {
      //   commandText: 'sports',
      //   url: 'https://sports.yahoo.com/',
      //   commandFunction: wcf.openShortcut
      // },  {
      //   commandText: 'finance',
      //   url: 'https://finance.yahoo.com/',
      //   commandFunction: wcf.openShortcut
      // },  {
      //   commandText: 'entertainment',
      //   url: 'https://www.yahoo.com/entertainment/',
      //   commandFunction: wcf.openShortcut
      // }
    ];
  }

  me.updateAltElemsPosition = function () {
    altCommands.updateAltElemsPosition();
  };

  me.addElementCommands = function (
    doc,
    selector,
    prefixes,
    commandFunctions,
    labelsHidden,
    useFinalResult
  ) {
    var elems =
        doc instanceof ShadowRoot
          ? getShadowElems(doc, selector)
          : doc.querySelectorAll(selector),
      elem = null,
      id = "";

    if (elems) {
      me.elementCount = elems.length;
      for (var x = 0; x < elems.length; x++) {
        try {
          elem = elems[x];

          id = elem.id;
          if (
            isVisible(elem, doc) &&
            clickable(elem) &&
            (!id || id.indexOf("altElem") === -1) &&
            !isCheckbox(elem) &&
            id !== "waRedMicSpeechDisplay" &&
            id !== "waGreenMicSpeechDisplay"
          ) {
            if (
              elem.nodeName !== "A" &&
              elem.nodeName !== "INPUT" &&
              !elem.hasAttribute("tabIndex")
            ) {
              elem.tabIndex = 0;
            }
            addEventCommand(
              elem,
              doc,
              prefixes,
              commandFunctions,
              labelsHidden,
              useFinalResult
            );
          }
        } catch (e) {
          console.log(
            "Error initializing commands " + e.message + " " + elem.nodeName
          );
        }
      }
    }
  };

  function hasParentWithId(element, id) {
    // Traverse up the DOM tree
    while (element) {
      if (element.nodeType === 1 && element.id === id) {
        return true;
      }
      element = element.parentElement;
    }
    return false;
  }

  function isCheckbox(elem) {
    if (elem.getAttribute("role") === "checkbox") {
      if (elem.type === "checkbox") return true;
    }
  }

  function clickable(elem) {
    var nodeName = elem.nodeName,
      role = elem.getAttribute("role"),
      cursor = null;

    if (
      nodeName === "I" ||
      nodeName === "SUMMARY" ||
      nodeName === "UL" ||
      nodeName === "DIV" ||
      nodeName === "AREA" ||
      nodeName === "P" ||
      nodeName === "TIME" ||
      nodeName === "PICTURE" ||
      nodeName === "H3" ||
      nodeName === "H5" ||
      nodeName === "DIV" ||
      nodeName === "SVG" ||
      nodeName === "svg" ||
      nodeName === "TH" ||
      nodeName === "SPAN" ||
      nodeName === "IMG" ||
      nodeName === "LI" ||
      elem.id === "text" ||
      (elem.getAttribute("class") &&
        elem.getAttribute("class").indexOf("q-text") !== -1) ||
      role === "link" ||
      role === "columnheader"
    ) {
      cursor = getComputedStyle(elem).cursor;
      if (
        nodeName === "A" &&
        elem.offsetHeight > 75 &&
        elem.offsetWidth > 75 &&
        cursor === "auto"
      )
        return true;
      if (
        (nodeName === "P" ||
          nodeName === "IMG" ||
          nodeName === "TH" ||
          nodeName === "H5" ||
          nodeName === "H3" ||
          nodeName === "UL" ||
          nodeName === "I") &&
        elem.getAttribute("role") !== "link" &&
        cursor !== "pointer"
      )
        return false;
      return (
        cursor === "pointer" ||
        cursor === "zoom-in" ||
        (elem.hasAttribute("data-testid") && nodeName === "I") ||
        (cursor === "text" && nodeName !== "SPAN") ||
        role === "option" ||
        role === "button" ||
        role === "checkbox" ||
        role === "combobox" ||
        role === "textbox" ||
        role === "select" ||
        role === "search" ||
        role === "searchbox" ||
        role === "radio" ||
        role === "menuitem" ||
        currentURL.indexOf("walmart.com/store/finder") > -1 ||
        (elem.getAttribute("title") &&
          nodeName !== "DIV" &&
          nodeName !== "H5" &&
          nodeName !== "PICTURE" &&
          nodeName !== "H3" &&
          nodeName !== "TH" &&
          nodeName !== "IMG" &&
          nodeName !== "svg" &&
          !elem.hasAttribute("data-testid")) ||
        (cursor === "default" &&
          !getParentNodeByTag(elem.parentNode, "FOOTER", elem.ownerDocument) &&
          nodeName !== "svg" &&
          nodeName !== "DIV" &&
          nodeName !== "I" &&
          nodeName !== "H5" &&
          nodeName !== "PICTURE" &&
          nodeName !== "SPAN" &&
          nodeName !== "H5" &&
          nodeName !== "H3" &&
          currentURL.indexOf("yahoo.com") === -1 &&
          nodeName !== "IMG" &&
          nodeName !== "LI") ||
        elem.getAttribute("alt") === "user" ||
        (elem.getAttribute("aria-haspopup") === "true" &&
          nodeName !== "SPAN") ||
        (elem.hasAttribute("size") &&
          nodeName !== "H5" &&
          nodeName !== "IMG" &&
          nodeName !== "PICTURE" &&
          nodeName !== "H3" &&
          nodeName !== "TH" &&
          nodeName !== "LI") ||
        (elem.hasAttribute("data-action") &&
          nodeName !== "PICTURE" &&
          nodeName !== "IMG" &&
          nodeName !== "H5" &&
          nodeName !== "H3" &&
          nodeName !== "TH") ||
        (elem.nodeName === "LI" &&
          elem.hasAttribute("part") &&
          currentURL.indexOf("msn.com") > -1) ||
        (elem.nodeName === "svg" &&
          elem.hasAttribute("class") &&
          elem.getAttribute("class").toLowerCase().indexOf("menu") !== -1) ||
        (elem.nodeName === "PICTURE" && getChildCursor(elem)) ||
        (elem.nodeName === "svg" &&
          elem.getAttribute("class") &&
          elem.getAttribute("class").indexOf("search") > -1 &&
          isHeader(elem)) ||
        (elem.nodeName === "SPAN" &&
          elem.getAttribute("class") &&
          elem.getAttribute("class").indexOf("search") > -1 &&
          isHeader(elem))
      );
    } else {
      return true;
    }
  }

  function getChildCursor(elem) {
    var elems = elem.getElementsByTagName("*");

    for (let index = 0; index < elems.length; index++) {
      try {
        if (elems[index].nodeType === 1) {
          if (getComputedStyle(elems[index]).cursor === "pointer") return true;
        }
      } catch (error) {
        console.log("Get cursor parent " + error.message);
      }
    }
    return false;
  }

  function addEventCommand(
    elem,
    doc,
    prefixes,
    commandFunctions,
    labelsHidden,
    useFinalResult
  ) {
    var text = me.getCommandText(elem, prefixes[0], labelsHidden, doc),
      currentText = "",
      checkAltText = false,
      command = {};

    if (text !== "wadup") {
      for (var x = 0; x < prefixes.length; x++) {
        if (text) {
          currentText = prefixes[x] ? prefixes[x] + " " + text : text;
          checkAltText = prefixes[x] ? false : true;
          if (
            currentURL.indexOf("facebook.com") > -1 &&
            text &&
            text.indexOf("active") > -1
          ) {
            currentText = "";
          }
          //Yahoo inbox text
          if (
            currentURL.indexOf("mail.yahoo.com") > -1 &&
            text &&
            text.indexOf("open inbox") > -1
          ) {
            currentText = "inbox";
          }

          if (
            currentURL.indexOf("craigslist.org") > -1 &&
            elem.getAttribute("title") ===
              "save this post in your favorites list"
          ) {
            currentText = "";
          }

          command = {
            commandText: currentText,
            elem: elem,
            checkAltText: checkAltText,
            document: doc,
            commandFunction: commandFunctions[x],
            useWaitForFinal: true,
            useFinalResult: useFinalResult,
          };
          me.addCommands([command]);
          currentText = "";
        } else {
          command = {
            commandText: text,
            elem: elem,
            document: doc,
            commandFunction: commandFunctions[x],
            checkAltText: true,
            useWaitForFinal: true,
            useFinalResult: useFinalResult,
          };
          me.addCommands([command]);
          break;
        }

        if (elem) {
          addMouseEvents(elem);
        }
      }
    }
  }

  async function addMouseEvents(elem) {
    var mouseOver = false;

    if (elem.getAttribute("wamouseEvent") !== "true") {
      elem.setAttribute("wamouseEvent", "true");
      elem.addEventListener("mouseenter", function (e) {
        if (e.isTrusted && !mouseOver) {
          setTimeout(() => {
            if (options.elementClicked) options.elementClicked(0);
            mouseOver = true;
          }, 50);
        }
      });

      document.body.addEventListener("mouseenter", function (e) {
        if (e.isTrusted && mouseOver) {
          mouseOver = false;
          setTimeout(() => {
            if (options.elementClicked) options.elementClicked(0);
          }, 50);
        }
      });

      elem.addEventListener("mouseleave", function (e) {
        if (e.isTrusted) {
          setTimeout(() => {
            if (options.elementClicked) options.elementClicked(0);
            mouseOver = false;
          }, 50);
        }
      });

      elem.addEventListener("click", function (e) {
        if (e.isTrusted === true) {
          if (options.elementClicked) options.elementClicked(0);
        }
      });
    }
  }

  //Returns unique command text for each element
  me.getCommandText = function (elem, prefix, labelsHidden, doc) {
    var text = getElementText(elem),
      currentText = prefix;

    try {
      if (text) {
        //Ensures that there are no duplicate commands added by adding one word at a time
        currentText = processElemText(
          elem,
          text,
          currentText,
          labelsHidden,
          doc
        );
        if (currentURL.indexOf("amazon.com") > -1) {
          if (elem.getAttribute("type") === "submit" && !text)
            return elem.parentNode.innerText;
        }
      }

      return text ? currentText.trim() : "";
    } catch (error) {
      console.log(error.message);
    }
  };

  function processElemText(elem, text, currentText, labelsHidden, doc) {
    var words = text.split(" "),
      match = false;

    for (var i = 0; i < words.length; i++) {
      if (words[i].trim().length) {
        currentText = currentText ? currentText + " " + words[i] : words[i];
        if (words.length === 1 || (words.length > 1 && i >= 1)) {
          if (i > 1) {
            match = true;
            break;
          }
          match = commandTextMatch(currentText, me.commands);
          if (!match) {
            break;
          }
        }
      }
    }
    if (match) {
      currentText = processDuplicates(
        elem,
        text,
        currentText,
        labelsHidden,
        doc
      );
    }
    return currentText;
  }

  function processDuplicates(elem, text, currentText, labelsHidden, doc) {
    var innerText = elem.innerText,
      elemParent = null;

    if (elem.nodeName === "Input") return "wadup";
    if (text === "home" || text === "search") return innerText.trim();
    if (elem.nodeName === "DIV" && !elem.hasAttribute("role")) return "wadup";
    elemParent = isRelated(elem);

    if (
      elemParent &&
      (elemParent.nodeName === "LI" ||
        elemParent.nodeName === "SPAN" ||
        elemParent.nodeName === "H5" ||
        elemParent.nodeName === "H3" ||
        elemParent.nodeName === "DIV")
    )
      return currentText.trim();

    if (elemParent && elem.getAttribute("role") !== "button") return "wadup";

    if (text.indexOf("@") > -1 && text.indexOf(".") > -1) {
      addAltElement(elem, labelsHidden, false);
      return "wadup";
    }

    if (elem.nodeName === "SPAN") return "wadDup";

    if (
      elem.nodeName === "LABEL" ||
      elem.nodeName === "OPTION" ||
      elem.getAttribute("role") === "button"
    ) {
      return innerText.trim();
    }

    if (
      currentURL.indexOf("facebook.com/games/?store_visit") > -1 ||
      currentURL.indexOf("paypal.com/signin") > -1
    ) {
      return "wadup";
    }

    if (
      !labelsHidden &&
      text.toLowerCase() === "follow" &&
      elem.getAttribute("role") === "button"
    ) {
      addAltElement(elem, labelsHidden, false);
      return "wadup";
    }

    if (
      elem.parentNode &&
      elem.parentNode.nodeType === 1 &&
      elemMatch(elem.parentNode) &&
      elem.parentNode.innerText.trim() === innerText.trim()
    )
      return innerText.trim();

    if (elem.nodeName === "A" && checkForSiblingAnchorMatch(elem, elem.href))
      return "wadup";

    if (
      elem.nodeName === "A" &&
      getComputedStyle(elem).cursor !== "auto" &&
      getComputedStyle(elem).cursor !== "pointer" &&
      getComputedStyle(elem).cursor !== "zoom-in"
    )
      return currentText.trim();

    if (
      ((currentURL.indexOf("/x.com") === -1 &&
        getParentNodeByTag(elem.parentNode, "A")) ||
        getParentNodeByAttribute(elem.parentNode, "role", "button", doc) ||
        getParentNodeByAttribute(elem.parentNode, "role", "link", doc)) &&
      elem.nodeName !== "A" &&
      elem.getAttribute("role") !== "button" &&
      elem.nodeName !== "BUTTON"
    )
      return "wadup";

    if (elem.id && elem.id.indexOf("altElem") > -1) return currentText.trim();

    if (
      getParentNodeByTag(elem.parentNode, "LABEL") &&
      elem.nodeName !== "A"
    )
      return "wadup";

    if (innerText && innerText.indexOf("Skip to") > -1)
      return currentText.trim();

    if (elem.offsetHeight < 3 || elem.offsetWidth < 3)
      return currentText.trim();

    if (
      currentURL.indexOf("/weather/") > -1 &&
      elem.parentNode &&
      elem.parentNode.hasAttribute("data-testid")
    )
      return currentText.trim();

    if (
      elem.parentNode.nodeType === 1 &&
      elem.parentNode.getAttribute("class") &&
      elem.parentNode.getAttribute("class").indexOf("CountryList") > -1
    )
      return "wadup";

    if (
      elem.getAttribute("class") &&
      elem.getAttribute("class").indexOf("wds-dropdown__toggle") > -1
    ) {
      return "wadup";
    }

    if (
      elem.getAttribute("role") === "button" &&
      getComputedStyle(elem).cursor !== "pointer"
    )
      return currentText.trim();

    if (elem.nodeName === "LI") return currentText.trim();

    if (currentURL.indexOf("linkedn.com") > -1) {
      if (
        elem.nodeName === "BUTTON" &&
        innerText &&
        innerText.toLowerCase().indexOf("skip to") > -1
      )
        return "wadup";
    }

    if (
      (elem.firstChild &&
        elem.firstChild.id &&
        elem.firstChild.id.indexOf("AwardBadges") > -1) ||
      (elem.parentNode.id && elem.parentNode.id.indexOf("AwardBadges") > -1) ||
      getSiblingByID(elem, "AwardBadges")
    ) {
      return "wadup";
    }

    if (elem.nodeName === "I" && elem.getAttribute("aria-hidden") === "true")
      return "wadup";

    if (!labelsHidden && elem.getAttribute("alttext") !== "true") {
      checkForDuplicates(elem, currentText, labelsHidden);
      addAltElement(elem, labelsHidden, false);
    }

    return "wadup";
  }

  function checkForDuplicates(elem, text, labelsHidden) {
    var currentElem = null;

    for (var i = 0; i < me.commands.length; i++) {
      currentElem = me.commands[i].elem;

      if (
        currentElem &&
        currentElem.nodeName !== "LI" &&
        !currentElem.contains(elem) &&
        currentElem !== elem &&
        !currentElem.hasAttribute("alttext") &&
        me.commands[i].commandText &&
        currentElem !== document &&
        me.commands[i].commandText.indexOf("text") === 0
      ) {
        addAltElement(currentElem, labelsHidden, false);
      }
    }
  }

  function isRelated(elem) {
    var currentElem = null,
      innerText = elem.innerText;

    for (var i = 0; i < me.commands.length; i++) {
      currentElem = me.commands[i].elem;
      if (currentElem && currentElem.nodeName !== "BODY") {
        if (currentElem.contains(elem)) return currentElem;
        if (
          elem.href &&
          elem.href.indexOf("javascript:") === -1 &&
          elem.href.indexOf("#") === -1 &&
          elem.href === currentElem.href &&
          innerText === currentElem.innerText
        )
          return currentElem;
      }
    }
  }

  function getElementText(elem) {
    if (
      elem.hasAttribute("contenteditable") ||
      elem.type === "text" ||
      elem.type === "email"
    )
      return "";
    var text = elem.innerText || elem.value;

    if (text) {
      text = text.toString().replaceAll(" & ", " and ");

      if (text.indexOf("@") > -1 && text.indexOf(".") > -1)
        return text.toLowerCase().trim();

      text = text.replace(/[\/)(\n]/g, " ");

      if (text.length === 1) text = text.replace(/\W/g, "");

      if (text.indexOf("f.") > -1) {
        if (text.indexOf(": ") === -1) {
          text = text.replace(/:/g, " ");
        }
      }

      text = text.replaceAll(".", "");
      text = text.replace(/ - /g, " ");
      text = text.replace(/[^a-z0-9- ']/gi, "");
      text = text
        .replace(
          /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
          ""
        )
        .replace(/\s+/g, " ");
      return text.toLowerCase().trim();
    } else {
      return "";
    }
  }

  function commandTextMatch(commandText, commands, elem) {
    var currentCommandText = "";

    for (var i = 0; i < commands.length; i++) {
      if (commands[i].commandText) {
        currentCommandText = commands[i].commandText.replace(" *", "");
        if (currentCommandText === commandText) {
          return true;
        }
      }
    }
    return false;
  }

  me.addCommands = function (cmds) {
    var wordLength = 0;

    for (var i = 0; i < cmds.length; i++) {
      if (options.usePhonemes)
        cmds[i].phonemeText = commandMatches.convertToPhonemes(
          commandMatches.cleanText(cmds[i].commandText.replace(" *", ""))
        );
      //Updates commandMatches object's maxCommandWords property
      wordLength = checkWordLength(cmds[i].commandText);
      if (wordLength === 1) cmds[i].exactMatch = true;
    }

    me.commands.push.apply(me.commands, cmds);
  };

  function checkWordLength(text) {
    try {
      var words = text.split(" "),
        wordLength = words.length;

      if (wordLength > commandMatches.maxCommandWords)
        commandMatches.maxCommandWords = wordLength;
      return wordLength;
    } catch (e) {
      console.log("word length error");
    }
  }

  // Called by the WebAssist to process the transcript array and execute commands using the commandMatches object
  me.executeCommandMatches = function (transcripts, finalResults) {
    var lastTranscript = false;

    commandMatches.testMode = me.testMode;
    try {
      for (var x = 0, len = transcripts.length; x < len; x++) {
        lastTranscript = finalResults && x === len - 1;
        commandMatches.processCommandMatches(
          transcripts[x],
          me.commands,
          finalResults,
          lastTranscript
        );
        if (commandMatches.activeCommand) return;
      }
    } catch (e) {
      console.log("Error processing command matches " + e.message);
    }
  };

  //Sorts commands by command text length in descending order
  me.sortCommands = function () {
    me.commands.sort(function (a, b) {
      // Sort descending
      var aCount = a.commandText;
      var bCount = b.commandText;
      return bCount.length - aCount.length;
    });
  };

  me.setCommandText = function (oldText, newText) {
    for (var i = 0; i < me.commands.length; i++) {
      if (me.commands[i].commandText === oldText) {
        me.commands[i].commandText = newText;
        return;
      }
    }
  };

  me.removeCommands = function (cmds) {
    for (var i = 0; i < cmds.length; i++) {
      me.commands.splice(getWebCommandIndex(cmds[i]), 1);
    }
  };

  function getWebCommandIndex(commandText) {
    for (var i = 0; i < me.commands.length; i++) {
      if (me.commands[i].commandText === commandText) {
        return i;
      }
    }
  }

  me.resetDocuments = async function () {
    me.documents = returnDocuments(document);
  };

  function isEdgeBrowser() {
    return /Edg/.test(navigator.userAgent);
  }
};

var altCommandText = function () {
  var me = this,
    currentIndex = 3,
    currentURL = window.location.href,
    altContainer = null;

  me.elems = [];

  me.reset = function () {
    currentIndex = 3;
  };

  me.addLabel = function (elem, labelsHidden, commands) {
    try {
      var coordinates = getCoords(elem),
        container = getContainer(coordinates, labelsHidden);

      altContainer = altContainer
        ? altContainer
        : document.getElementById("WebAssistRoot").childNodes[0];
      altContainer.appendChild(container);
      return getLabel(elem, container, coordinates, commands);
    } catch (e) {
      console.log(e.message);
    }
  };

  function getLabel(elem, container, coordinates, commands) {
    var lbl = document.createElement("label"),
      elemId = elem.id,
      id = elemId ? elemId : "wass" + currentIndex.toString();

    lbl.htmlFor = id;
    if (!elem.tabIndex || elem.tabIndex < 0) elem.tabIndex = 0;
    if (!elemId) elem.id = id;
    lbl.id = "altElem" + id;
    lbl.style.wordBreak = "normal";
    container.appendChild(lbl);

    if (coordinates.top - elem.ownerDocument.defaultView.pageYOffset < 16) {
      container.style.margin = "0px";
      container.style.top = coordinates.top + "px";
      container.style.left = coordinates.left - lbl.offsetWidth - 7 + "px";
    }

    if (coordinates.left < 15) {
      container.style.margin = "0px";
      container.style.margin = "0px";
      container.style.left = coordinates.left + 15 + "px";
    }

    if (hasLabel(lbl)) {
      container.style.top = coordinates.top + lbl.offsetHeight + "px";
    }

    currentIndex = addElemText(lbl, getIndex(currentIndex, commands));
    elem.setAttribute("alttext", true);
    return lbl;
  }

  me.addSpan = function (
    elem,
    labelsHidden,
    addOutline,
    isScrollLabel,
    commands,
    checkLabel
  ) {
    try {
      var coordinates = getCoords(elem);

      if (!coordinates) return;

      var container = getContainer(coordinates, labelsHidden),
        div = document.createElement("DIV");

      altContainer = altContainer
        ? altContainer
        : document.getElementById("WebAssistRoot").childNodes[0];

      if (!isScrollLabel) elem.setAttribute("alttext", true);
      if (addOutline) elem.style.outline = "#eaf7fc solid 1px";

      altContainer.appendChild(container);
      currentIndex = getSpan(
        elem,
        container,
        coordinates,
        isScrollLabel,
        commands,
        checkLabel
      );
      container.appendChild(div);
      return currentIndex - 1;
    } catch (e) {
      console.log(e.message);
    }
  };

  function getContainer(coordinates, labelsHidden) {
    var div = document.createElement("DIV"),
      top = coordinates.top,
      left = coordinates.left;

    div.style.visibility = labelsHidden ? "hidden" : "visible";
    div.style.position = "absolute";
    div.style.top = top - 15 + "px";
    div.style.left = left - 15 + "px";
    div.className = "waAltText";
    return div;
  }

  var spanClone = document.createElement("SPAN");

  function getSpan(
    elem,
    container,
    coordinates,
    isScrollLabel,
    commands,
    checkLabel
  ) {
    var span = spanClone.cloneNode(false),
      elemId = elem.id,
      id = elemId ? elemId : "wass" + currentIndex.toString();

    if (!elemId) elem.id = id;
    span.id = "altElem" + id;
    span.style.wordBreak = "normal";
    if (isScrollLabel) {
      span.style.color = "#0033FF";
    }
    container.appendChild(span);
    currentIndex = addElemText(span, getIndex(currentIndex, commands));

    if (
      coordinates.top - container.ownerDocument.defaultView.scrollY <
      span.offsetHeight
    ) {
      container.style.margin = "0px";
      container.style.top = coordinates.top + "px";
      container.style.left = coordinates.left - span.offsetWidth - 7 + "px";
    }

    if (coordinates.left < 15) {
      container.style.margin = "0px";
      container.style.left = coordinates.left + 15 + "px";
    }

    if (checkLabel && hasLabel(span)) {
      container.style.top = coordinates.top + span.offsetHeight + "px";
    }
    return currentIndex;
  }

  function hasLabel(elem) {
    var elemRect = elem.getBoundingClientRect(),
      rect = null,
      elems = document.querySelectorAll("[id*=altElem]");

    for (var x = 0; x < elems.length; x++) {
      rect = elems[x].getBoundingClientRect();
      if (isOverlap(rect, elemRect) && elems[x] !== elem) {
        return true;
      }
    }
  }

  function isOverlap(rect1, rect2) {
    if (
      (rect2.top >= rect1.top && rect2.top <= rect1.bottom - 4) ||
      (rect2.bottom >= rect1.top && rect2.bottom <= rect1.bottom - 4)
    ) {
      if (
        (rect2.left >= rect1.left && rect2.left <= rect1.right) ||
        (rect2.right >= rect1.left && rect2.right <= rect1.right)
      ) {
        return true;
      }
      return false;
    }
  }

  function getIndex(index, commands) {
    while (getCommandTextMatch(index, commands)) {
      index++;
    }
    return index !== 4 ? index : 5;
  }

  function getCommandTextMatch(text, commands) {
    var command = null,
      elem = null;

    for (var x = 0; x < commands.length; x++) {
      command = commands[x];
      elem = command.elem;
      if (
        elem &&
        command.commandText &&
        command.commandText.toString() === text.toString() &&
        (!elem.id || elem.id.indexOf("altElem") === -1) &&
        Number.isInteger(parseInt(command.commandText))
      ) {
        return true;
      }
    }
    return false;
  }

  function getCoords(elem) {
    try {
      var box = elem.getBoundingClientRect(),
        body = document.body,
        docEl = document.documentElement,
        scrollTop = window.pageYOffset || docEl.scrollTop;

      //Facebook
      if (window.location.href.indexOf("facebook.com") !== -1)
        scrollTop = docEl.scrollTop;
      var scrollLeft =
        window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

      var clientTop = body.offsetTop || 0,
        clientLeft = body.offsetLeft || 0,
        top = box.top + scrollTop - clientTop,
        left = box.left + scrollLeft - clientLeft;

      if (elem.ownerDocument && elem.ownerDocument !== document) {
        var win =
            elem.ownerDocument.defaultView || elem.ownerDocument.parentWindow,
          frame = win.frameElement,
          rectFrame = null;

        if (frame) {
          rectFrame = frame.getBoundingClientRect();
        } else {
          return;
        }

        if (rectFrame.top === 0) {
          left = left + rectFrame.left;
        } else if (rectFrame.left === 0) {
          left = left;
          top = top + rectFrame.top;
        } else {
          left = left + rectFrame.left;
          top = top + rectFrame.top;
        }
      }

      if (elem.nodeName === "AREA" && elem.hasAttribute("coords")) {
        var coords = elem.getAttribute("coords");

        box = elem.parentNode.parentNode.getBoundingClientRect();
        coords = coords.split(",");
        left = parseInt(coords[0]) + box.left + scrollLeft - clientLeft;
        top = parseInt(coords[1]) + box.top + scrollTop - clientTop;
      }

      if (currentURL.indexOf("personal.chase") > -1) {
        top -= 119;
      }

      return {
        top: Math.round(top) - 1,
        left: Math.round(left),
      };
    } catch (error) {
      console.log(error.message);
    }
  }

  // basic-result
  function addElemText(elem, currentIndex) {
    // Skip 2 because recognition for this number is not good enough
    currentIndex = currentIndex < 3 ? 3 : currentIndex;
    var newIndex = currentIndex;
    elem.innerText = currentIndex;
    newIndex++;
    return newIndex;
  }

  me.updateAltElemsPosition = function () {
    altContainer = altContainer
      ? altContainer
      : document.getElementById("WebAssistRoot").childNodes[0];

    var documents = returnDocuments(document),
      elems = altContainer.querySelectorAll(".waAltText");

    documents.forEach(function (doc) {
      updatePosition(elems, doc);
    });
  };

  function returnDocuments(doc) {
    var docs = [];

    function getShadowRoots(ele) {
      return [ele, ...ele.querySelectorAll("*")]
        .filter((e) => !!e.shadowRoot)
        .flatMap((e) => [e.shadowRoot, ...getShadowRoots(e.shadowRoot)]);
    }

    function addIframes(currentDocument) {
      if (currentDocument) {
        docs.push(currentDocument);
      } else {
        currentDocument = document;
      }

      currentDocument.querySelectorAll("iframe").forEach((frame) => {
        try {
          if (
            frame.contentWindow.document &&
            frame.src.indexOf("robots.txt") === -1
          ) {
            docs.push.apply(docs, getShadowRoots(frame.contentWindow.document));
            addIframes(frame.contentWindow.document);
          } else {
            if (currentURL.indexOf("secure5.store.apple.com") > -1) {
              return;
            }
          }
        } catch (e) {
          if (currentURL.indexOf("secure5.store.apple.com") > -1) {
            return;
          }
        }
      });
    }

    docs.push(doc);
    var shadowroots = getShadowRoots(doc);

    docs.push.apply(docs, shadowroots);
    addIframes();
    return docs;
  }

  function updatePosition(elems, doc) {
    var lbl = null,
      id = "",
      target = null,
      box = null;

    for (var x = 0; x < elems.length; x++) {
      lbl = elems[x].children[0];
      id = lbl.id.substring(7);
      target = doc.querySelector("#" + id);
      box = getCoords(target);
      elems[x].top = box.top;
      elems[x].left = box.left;
      if (target.offsetTop < lbl.offsetHeight - 3) {
        lbl.style.margin = "0px";
        lbl.style.marginLeft = -lbl.offsetWidth + "px";
      }
    }
  }
};

// async function addCarouselDetector() {
//   var elems = document.querySelectorAll('[class*="slider"]'),
//     rect = null;
//   if (elems.length && inViewport(elems[0], rect)) {

//     let observer = new MutationObserver(mutationRecords => {
//       if (mutationRecords[0]) {
//         if (options.elementClicked) options.elementClicked(500);
//       }
//     });

//     // observe everything except attributes
//     observer.observe(elems[0], {
//       childList: true,
//       attributes: true
//     });

//   } else {

//     elems = document.querySelectorAll('[class*="carousel"]');

//     if (elems.length) {
//       elems.forEach(function (el) {
//         rect = el.getBoundingClientRect();
//         if (inViewport(el, rect)) {
//           let observer = new MutationObserver(mutationRecords => {
//             if (mutationRecords[0]) {
//               if (options.elementClicked) options.elementClicked(500);
//             }
//           });

//           // observe everything except attributes
//           observer.observe(el, {
//             childList: true,
//             attributes: true
//           });
//         }
//       });

//     }
//   }

// }

// async function addDivCommands(doc, labelsHidden) {

//   var divs = doc instanceof ShadowRoot ? getShadowElems(doc, 'div[class]:not([nocursor="true"]') : doc.querySelectorAll('div[class]:not([nocursor="true"]'),
//     rect = null;
//   divs.forEach(function (elem) {
//     if (getComputedStyle(elem).cursor === 'pointer') {
//       rect = elem.getBoundingClientRect();
//       if (inViewport(elem, rect) && !elem.hasAttribute('alttext') &&
//         !getParentNodeByAttribute(elem.parentNode, 'alttext', 'true') && decodeEntities(elem.innerHTML) === elem.innerText &&
//         getPointEl(elem, rect, elem.ownerDocument) === elem) {
//         addAltElement(elem, labelsHidden, false);
//       }
//     } else {
//       elem.setAttribute('nocursor', 'true');
//     }
//   });
// }

// var decodeEntities = (function () {
//   // this prevents any overhead from creating the object each time
//   var element = document.createElement('div');

//   function decodeHTMLEntities(str) {
//     if (str && typeof str === 'string') {
//       // strip script/html tags
//       str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
//       str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
//       element.innerHTML = str;
//       str = element.textContent;
//       element.textContent = '';
//     }
//     element.remove();
//     return str;
//   }

//   return decodeHTMLEntities;
// })();
// function isInShadow(node) {
//   if (node.nodeType === 1) {
//     var el = node.getRootNode();
//     if (el instanceof ShadowRoot) {
//       return el;
//     } else if (node.shadowRoot) {
//       return node;
//     } else {
//       return null;
//     }
//   }
// }
// function checkForOverlap(newElem) {
//   var elems = document.getElementsByClassName('wa');
//   for (let index = 0; index < elems.length; index++) {
//     const elem = elems[index];
//     if (isOverlap(newElem, elem)) return true;
//   }
// }

/**
 * Initializes dictation based commands that replaces command text with other text (e.g. symbols), executes
 * those commands, and inserts the transcript into form related elements that accept user input.
 */

var waDictation = function (options, pageCommands) {
  var me = this,
    wcf = new waCommandFunctions(options),
    currentURL = window.location.href,
    contentEditable = new ContentEditableUtils();

  me.commands = [];
  me.element = null;

  function initializeDictationCommands() {
    var replaceCommandText = wcf.replaceCommandText;

    me.commands = [
      {
        commandText: "add space",
        replacementText: " ",
        commandFunction: wcf.addSpace,
      },
      {
        commandText: "semicolon",
        replacementText: "; ",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "semi colon",
        replacementText: "; ",
        commandFunction: replaceCommandText,
      },

      {
        commandText: ";",
        replacementText: "; ",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "add;",
        replacementText: "; ",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "colon",
        replacementText: ": ",
        exactMatch: true,
        commandFunction: replaceCommandText,
      },
      {
        commandText: "add:",
        replacementText: ": ",
        commandFunction: replaceCommandText,
      },
      {
        commandText: ":",
        replacementText: ": ",
        commandFunction: replaceCommandText,
      },
      // {
      //   commandText: 'close single',
      //   replacementText: "' ",
      //   commandFunction: replaceCommandText
      // },
      // {
      //   commandText: "close '",
      //   replacementText: "' ",
      //   commandFunction: replaceCommandText
      // },
      {
        commandText: "single quote",
        replacementText: "'",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "'",
        replacementText: "'",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "close quote",
        replacementText: '" ',
        commandFunction: replaceCommandText,
      },

      {
        commandText: "unquote",
        replacementText: '" ',
        commandFunction: replaceCommandText,
      },
      {
        commandText: '"',
        replacementText: ' "',
        commandFunction: replaceCommandText,
      },
      {
        commandText: "quotes",
        replacementText: ' "',
        exactMatch: true,
        commandFunction: replaceCommandText,
      },
      {
        commandText: "quote",
        replacementText: ' "',
        commandFunction: replaceCommandText,
      },
      {
        commandText: "apostrophe",
        replacementText: "'",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "open parentheses",
        replacementText: " (",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "(",
        replacementText: " (",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "close parenthesis",
        replacementText: ") ",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "close parentheses",
        replacementText: ") ",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "closed parenthesis",
        replacementText: ") ",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "closed parentheses",
        replacementText: ") ",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "close princesses",
        replacementText: ") ",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "close princess",
        replacementText: ") ",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "closed parentheses",
        replacementText: ") ",
        commandFunction: replaceCommandText,
      },
      {
        commandText: ")",
        replacementText: ") ",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "open bracket",
        replacementText: " [",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "close bracket",
        replacementText: "] ",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "closed bracket",
        replacementText: "] ",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "open brace",
        replacementText: " {",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "close brace",
        replacementText: "} ",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "closed brace",
        replacementText: "} ",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "add plus",
        replacementText: " + ",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "+",
        replacementText: " + ",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "add minus",
        replacementText: " − ",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "-",
        replacementText: " - ",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "÷",
        replacementText: " ÷ ",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "add division",
        replacementText: " ÷ ",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "add multiplication",
        replacementText: " × ",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "new line",
        replacementText: " \r\n",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "%",
        replacementText: "% ",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "add percent",
        replacementText: "% ",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "greater than or equal to",
        replacementText: " ≥ ",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "greater than",
        replacementText: " > ",
        commandFunction: replaceCommandText,
      },
      {
        commandText: ">",
        replacementText: " > ",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "less than or equal to",
        replacementText: " ≤ ",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "less than",
        replacementText: " < ",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "<",
        replacementText: " < ",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "add equal",
        replacementText: " = ",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "=",
        replacementText: " = ",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "add at",
        replacementText: "@",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "add apps",
        replacementText: "@",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "add app",
        replacementText: "@",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "add asterisk",
        replacementText: "*",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "add asterix",
        replacementText: "*",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "add astrid",
        replacementText: "*",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "add dollar",
        replacementText: " $",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "add yen",
        replacementText: " ¥",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "add yin",
        replacementText: " ¥",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "add euro",
        replacementText: " €",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "add gyro",
        replacementText: " €",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "add pound",
        replacementText: " £",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "add #",
        replacementText: " #",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "add cent",
        replacementText: "¢",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "adsense",
        replacementText: "¢",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "add scent",
        replacementText: "¢",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "add sent",
        replacementText: "¢",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "slash",
        replacementText: "/",
        commandFunction: replaceCommandText,
        exactMatch: true,
      },
      {
        commandText: "/",
        replacementText: "/",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "backslash",
        replacementText: "\\",
        commandFunction: replaceCommandText,
        exactMatch: true,
      },
      {
        commandText: "back slash",
        replacementText: "\\",
        commandFunction: replaceCommandText,
        exactMatch: true,
      },
      {
        commandText: "\\",
        replacementText: "\\",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "vertical bar",
        replacementText: " | ",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "ellipsis",
        replacementText: "… ",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "ellipses",
        replacementText: "… ",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "question mark",
        replacementText: "? ",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "?",
        replacementText: "? ",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "exclamation mark",
        replacementText: "! ",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "exclamation point",
        replacementText: "! ",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "!",
        replacementText: "! ",
        commandFunction: replaceCommandText,
      },

      {
        commandText: "period",
        replacementText: ". ",
        commandFunction: replaceCommandText,
      },
      {
        commandText: ".",
        replacementText: ". ",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "comma",
        replacementText: ", ",
        commandFunction: replaceCommandText,
      },
      {
        commandText: ",",
        replacementText: ", ",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "underscore",
        replacementText: "_",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "under score",
        replacementText: "_",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "hyphen",
        replacementText: "-",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "dash",
        replacementText: "-",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "add line",
        replacementText: " \n",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "smiley face",
        replacementText: " :) ",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "wink face",
        replacementText: " ;) ",
        commandFunction: replaceCommandText,
      },

      {
        commandText: "sad face",
        replacementText: " :( ",
        commandFunction: replaceCommandText,
      },
      // {
      //   commandText: 'neutral face',
      //   replacementText: ' :-| ',
      //   commandFunction: replaceCommandText
      // },
      // {
      //   commandText: 'annoyed face',
      //   replacementText: ' :-// ',
      //   commandFunction: replaceCommandText
      // },
      {
        commandText: "copyright",
        replacementText: " © ",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "copy right",
        replacementText: " © ",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "add trademark",
        replacementText: "™ ",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "add trade mark",
        replacementText: "™ ",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "ampersand",
        replacementText: " & ",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "&",
        replacementText: " & ",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "tilde",
        replacementText: " ~",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "tildy",
        replacementText: " ~",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "hash",
        replacementText: " #",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "hash tag",
        replacementText: " #",
        commandFunction: replaceCommandText,
      },
      {
        commandText: "hashtag",
        replacementText: " #",
        commandFunction: replaceCommandText,
      },
    ];
  }

  me.dictate = function (transcripts) {
    try {
      var transcript = "",
        currentElem = me.element,
        lastIndex = 0;

      if (
        currentURL.indexOf("linkedin.com") === -1 &&
        currentURL.indexOf("chatgpt.com") === -1 &&
        ((currentElem.hasAttribute("contenteditable") &&
          (currentURL.indexOf("facebook") > -1 ||
            currentURL.indexOf("reddit") > -1)) ||
          currentElem.getElementsByTagName("*").length)
      ) {
        if (options.onError) options.onError("noDictation");
        setTimeout(() => {
          if (currentElem) currentElem.focus();
          return;
        }, 3000);
        return;
      }

      lastIndex = transcripts.length - 1;
      transcript = transcripts[lastIndex];
      if (isEdgeBrowser() && currentElem.nodeName === "INPUT") {
        transcript = transcript.replace(/[?!.,]/g, "");
      }

      transcript = pageCommands.processDictationCommands(
        transcript,
        me.commands,
        currentElem,
        true
      );
      if (transcript) insertTranscript(transcript, true);
    } catch (e) {
      if (options.onError) options.onError("Dictation error " + e.message);
    }
  };

  function insertTranscript(transcript, lastTranscript) {
    var activeElement = me.element,
      nodeName = activeElement.nodeName.toLowerCase(),
      attrValue = activeElement.getAttribute("type");

    if (
      attrValue === "text" ||
      attrValue === "textfield" ||
      nodeName === "textarea" ||
      attrValue === "search" ||
      attrValue === null ||
      activeElement.hasAttribute("contenteditable")
    ) {
      //Elements that accept plain text
      if (lastTranscript) insertText(transcript, activeElement);
    } else {
      //Elements that accept a certain value type (e.g. date)
      setValue(transcript, activeElement, lastTranscript);
    }
    fireInputEvents(activeElement);
  }

  function fireInputEvents(activeElement) {
    wcf.fireEvent(activeElement, "keydown");
    wcf.fireEvent(activeElement, "keyup");
    wcf.fireEvent(activeElement, "keypress");
    wcf.fireEvent(activeElement, "change");
    wcf.fireEvent(activeElement, "input");
  }

  //Insert and formats text based on the value type accepted by the element
  function setValue(transcript, elem, lastTranscript) {
    var dt = null,
      number = "",
      tim = "";

    transcript = transcript.trim();
    if (elem.getAttribute("type") === "date") {
      dt = new Date(transcript);
      if (Object.prototype.toString.call(transcript) !== "[object Date]") {
        dt = convertValidDate(transcript);
      }
      if (dt && dt.toString() !== "Invalid Date") {
        setElemValue(elem, dt.toISOString().substr(0, 10));
      }
    } else if (elem.getAttribute("type") === "time") {
      tim = ConvertTimeFormat(transcript);
      if (tim) setElemValue(elem, tim);
    } else if (elem.getAttribute("type") === "datetime-local") {
      transcript = transcript.replace("a.m.", "am");
      transcript = transcript.replace("p.m.", "pm");
      dt = new Date(transcript);
      if (Object.prototype.toString.call(transcript) !== "[object Date]") {
        dt = convertValidDate(transcript);
      }
      if (dt) setElemValue(elem, formatDateTime(dt));
    } else if (elem.getAttribute("type") === "email") {
      if (lastTranscript) {
        transcript = transcript.toLowerCase();
        transcript = transcript.replace(" at ", " @");
        transcript = transcript.replace(" dot ", ".");
        setElemValue(elem, transcript.replace(/ /g, ""));
      }
    } else if (elem.getAttribute("type") === "password") {
      if (lastTranscript) setElemValue(elem, transcript.replace(/ /g, ""));
    } else if (elem.getAttribute("type") === "url") {
      if (lastTranscript) {
        transcript = transcript.toLowerCase();
        transcript = formatURL(transcript);
        setElemValue(elem, transcript.replace(/ /g, ""));
      }
    } else if (elem.getAttribute("type") === "number") {
      number = getNumber(transcript, lastTranscript);
      if (number) setElemValue(elem, number);
    } else if (elem.getAttribute("type") === "range") {
      number = getNumber(transcript, lastTranscript);
      if (number) setElemValue(elem, number.toString());
    } else {
      if (lastTranscript) setElemValue(elem, transcript);
    }
  }

  function formatURL(url) {
    url = replaceAll(url, "dot ", ".");
    url = replaceAll(url, " net", ".net");
    url = replaceAll(url, " org", ".org");
    url = replaceAll(url, " edu", ".edu");
    url = replaceAll(url, " uk", ".uk");
    url = replaceAll(url, " biz", ".biz");
    url = replaceAll(url, " gov", ".gov");
    url = replaceAll(url, " co", ".co");
    url = replaceAll(url, " ai", ".ai");
    url = replaceAll(url, "forward slash", "/");
    url = replaceAll(url, "slash", "/");
    url = replaceAll(url, " ", "");
    if (url.indexOf("http://") === -1 && url.indexOf("https://") === -1)
      url = "https://" + url;
    return url;
  }

  function getNumber(transcript, lastTranscript) {
    var lastNumber = "",
      matchNumber = "",
      numberMatch = false,
      number = "";

    if (isNaN(transcript)) {
      if (
        transcript.indexOf(transcript, " ") > -1 &&
        transcript.indexOf(transcript, "0") > -1
      )
        transcript = checkForCombo(transcript);
      transcript = transcript.replace(/:00/g, "").replace(/:+/gi, ""); //.-+
      number = transcript.replace(/ /g, "");
      number = Number(number);
      if (isNaN(number)) {
        number = getIntegerFromPartial(transcript);
        if (!number) number = wcf.getIntegerFromWords(transcript);
        number = number ? parseInt(number) : "";
      }
    } else {
      number = parseInt(transcript);
    }

    if (number) {
      if (parseInt(number) === lastNumber) {
        numberMatch = true;
        matchNumber = number;
      }
      lastNumber = parseInt(number);
    }

    number = lastTranscript && numberMatch ? matchNumber : number;
    if (lastTranscript) {
      numberMatch = false;
      matchNumber = "";
      lastNumber = "";
    }
    return number;
  }

  function checkForCombo(transcript) {
    var arrTrans = transcript.split(" "),
      number = 0,
      newTrans = "";

    arrTrans.forEach(function (word) {
      number = wcf.getIntegerFromWords(word);
      newTrans = number ? newTrans + " " + number : newTrans + " " + word;
    });
    arrTrans = newTrans.trim().split(" ");

    if (arrTrans.length > 2) {
      if (!isNaN(arrTrans[0]) && !isNaN(arrTrans[2])) {
        number = arrTrans[0].substr(0, arrTrans[0].length - arrTrans[2].length);
        return number + arrTrans[2];
      }
    } else if (arrTrans.length === 2) {
      if (!isNaN(arrTrans[0]) && !isNaN(arrTrans[1])) {
        number = arrTrans[0].substr(0, arrTrans[0].length - arrTrans[1].length);
        return number + arrTrans[1];
      }
    }
    return transcript;
  }

  function getIntegerFromPartial(transcript) {
    var arrTrans = transcript.split(" "),
      newTrans = "",
      number = "";

    arrTrans.forEach(function (word) {
      number = wcf.getIntegerFromWords(word);
      newTrans += number ? number : word;
    });

    if (newTrans) {
      if (isNaN(newTrans)) {
        return "";
      } else {
        return newTrans;
      }
    } else {
      return "";
    }
  }

  function convertValidDate(transcript) {
    var arrDate = transcript.split(" "),
      day = parseInt(arrDate[1]),
      dt = null;

    if (day) {
      arrDate[1] = day;
      dt = arrDate.join(" ");
      dt = new Date(dt);
    } else if (arrDate[1]) {
      day = wcf.getIntegerFromWords(arrDate[1]);
      if (day) {
        arrDate[1] = day;
        dt = arrDate.join(" ");
        dt = new Date(dt);
      } else {
        dt = null;
      }
    }
    return dt;
  }

  function ConvertTimeFormat(time) {
    try {
      var hours = Number(time.match(/^(\d+)/)[1]);
      if (!hours) return null;

      var minutes = Number(time.match(/:(\d+)/)[1]),
        AMPM = time.match(/\s(.*)$/)[1].toLowerCase();

      if (AMPM == "pm" && hours < 12) hours = hours + 12;
      if (AMPM == "am" && hours == 12) hours = hours - 12;
      if (AMPM == "p.m." && hours < 12) hours = hours + 12;
      if (AMPM == "a.m." && hours == 12) hours = hours - 12;
      var sHours = hours.toString(),
        sMinutes = minutes.toString();

      if (hours < 10) sHours = "0" + sHours;
      if (minutes < 10) sMinutes = "0" + sMinutes;

      return sHours + ":" + sMinutes + ":00";
    } catch (e) {
      return null;
    }
  }

  function formatDateTime(date) {
    var year = date.getFullYear(),
      month = date.getMonth() + 1, // months are zero indexed
      day = date.getDate(),
      hour = date.getHours(),
      minute = date.getMinutes();

    if (hour < 10) hour = "0" + hour;
    if (minute < 10) minute = "0" + minute;
    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;
    //YYYY-MM-DDThh:mm:ss.ms
    return year + "-" + month + "-" + day + "T" + hour + ":" + minute;
  }

  //Inserts plain text into the element
  function insertText(transcript, elem) {
    var currentValue = getElemValue(elem),
      pos = 0,
      space = "",
      punctuation = "",
      lastChar = "";

    if (transcript !== " ") {
      pos = getCursorPosition(elem);
      var sel = window.getSelection(),
        selPos = !sel.toString().length ? pos : pos + sel.toString().length;

      punctuation = currentValue.substring(selPos, selPos + 1);
      lastChar = transcript.substring(transcript.length - 1);
      if (
        punctuation !== " " &&
        currentValue.length &&
        !isEndPunctuation(punctuation) &&
        !isBeginningPunctuation(lastChar) &&
        !isBeginningPunctuation(punctuation) &&
        (transcript.trim().length > 1 ||
          transcript.trim().match(/^[0-9a-zA-Z]/)) &&
        pos < currentValue.length
      )
        transcript += " ";

      space =
        pos > currentValue.length
          ? currentValue.substring(currentValue.length - 1, currentValue.length)
          : currentValue.substring(pos - 1, pos);

      if (
        (space !== " " &&
          space !== "'" &&
          pos &&
          !isEndPunctuation(transcript.substring(0, 1)) &&
          space.trim().length &&
          cleanText(currentValue).trim().length &&
          (transcript.trim().length > 1 ||
            transcript.trim().match(/^[0-9a-zA-Z]/))) ||
        isBeginningPunctuation(
          transcript.substring(0, 1) &&
            transcript !== ' "' &&
            transcript.trim() !== " '"
        )
      ) {
        transcript = " " + transcript;
      }
    }

    updateValue(elem, transcript);

    // if (currentValue === getElemValue(elem) && transcript !== currentValue) {
    //   if (transcript.trim().length) {
    //     if (options.onError) options.onError('noDictation');
    //     setTimeout(() => {
    //       elem.focus();
    //       return;
    //     }, 5000);
    //   }

    //   return;
    // }
  }

  function isEndPunctuation(character) {
    var symbols = [
      '"',
      "'",
      ")",
      "",
      "}",
      "_",
      " ?",
      ".",
      " !",
      ";",
      ":",
      "~",
      "_",
      ",",
    ];
    if (symbols.indexOf(character) > -1) return true;
  }

  function isBeginningPunctuation(character) {
    var symbols = ['"', "'", "(", "[", "{", "$", " ¥", " €", " £", "@", "~"];
    if (symbols.indexOf(character) > -1) return true;
  }

  function getCursorPosition(el) {
    var start = 0,
      normalizedValue,
      range,
      textInputRange,
      len,
      endRange;

    if (
      typeof el.selectionStart == "number" &&
      typeof el.selectionEnd == "number"
    ) {
      start = el.selectionStart;
    } else if (el.hasAttribute("contenteditable")) {
      start = contentEditable.getCaretPosition(el);
    } else {
      if (!document.selection) return 1;
      range = document.selection.createRange();
      if (range && range.parentElement() == el) {
        len = el.value.length;
        normalizedValue = el.value.replace(/\r\n/g, "\n");
        // Create a working TextRange that lives only in the input
        textInputRange = el.createTextRange();
        textInputRange.moveToBookmark(range.getBookmark());
        // Check if the start and end of the selection are at the very end
        // of the input, since moveStart/moveEnd doesn't return what we want
        // in those cases
        endRange = el.createTextRange();
        endRange.collapse(false);
        if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
          start = len;
        } else {
          start = -textInputRange.moveStart("character", -len);
          start += normalizedValue.slice(0, start).split("\n").length - 1;
        }
      }
    }
    return start;
  }

  function updateValue(elem, myValue) {
    var elemValue = getElemValue(elem),
      valueLength = 0;

    if (document.selection) {
      elem.focus();
      var sel = document.selection.createRange();
      myValue = formatString(replaceAll(myValue, " i ", " I ")).trim() + " ";
      sel.text = myValue;
    } else if (elem.selectionStart || elem.selectionStart === 0) {
      var startPos = elem.selectionStart,
        endPos = elem.selectionEnd;

      myValue =
        myValue.length > 2 || myValue === " " ? myValue : myValue.trim();
      if (myValue.match(/\r|\n/)) myValue = myValue.replace(" /r", "/r");
      elemValue =
        elemValue.substring(0, startPos) +
        myValue +
        elemValue.substring(endPos, elemValue.length);
      elemValue = formatString(elemValue);
      setElemValue(elem, elemValue);
      valueLength = myValue.trim().length ? myValue.length : 1;
      if (
        myValue.length === 3 &&
        myValue.trim().length === 1 &&
        !myValue.match(/\r|\n/)
      )
        valueLength -= 1;
      elem.selectionStart = startPos + valueLength;
      elem.selectionEnd = startPos + valueLength;
    } else if (elem.getAttribute("contenteditable")) {
      // if (elem.childNodes.length === 1 && elem.childNodes[0].nodeName === 'P') {
      //     elem = elem.childNodes[0];
      // }

      insertTextAtCaret(elem, myValue);
    } else {
      myValue = formatString(myValue).trim() + " ";
      setElemValue(elem, myValue);
    }
  }

  function replaceAll(retString, strReplace, strWith) {
    return retString.replace(
      new RegExp(strReplace.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"), "ig"),
      strWith
    );
  }

  function cleanText(text) {
    //Remove punctuation
    var newText = text.replace(/[^\w\s]/gi, "").replace(/-/g, " "),
      re = /(\s(-|\|)\s)/g; //Removes symbols

    newText = newText.replace(re, "").trim();
    return newText;
  }

  // function insertTextAtCaret(element, text) {
  //   var sel, win, range, pos, newText, length, newString;

  //   if (window.getSelection) {
  //     win = element.ownerDocument.defaultView;
  //     sel = win.getSelection();

  //     if (sel.getRangeAt && sel.rangeCount) {
  //       newText = text.trim();
  //       length = newText.length;

  //       // Update the text to insert based on selection length
  //       text = sel.toString().length ? newText : text;

  //       // Get the current range
  //       range = sel.getRangeAt(0);

  //       // Delete selected text if any
  //       range.deleteContents();

  //       // Insert the new text
  //       range.insertNode(element.ownerDocument.createTextNode(text));

  //       // Format the content after insertion
  //       newString = formatString(element.innerText);
  //       element.innerText = newString.trim();

  //       // Determine cursor position based on selection or caret position
  //       pos = sel.toString().length
  //       ? sel.baseOffset + text.length - 1
  //       : contentEditable.getCaretPosition(element);

  //     // Adjust position if needed
  //     if (length === 1) {
  //       if (text.length - length < 2) {
  //         pos = pos + length;
  //       } else {
  //         pos = pos + text.length;
  //       }
  //     } else {
  //       if (!sel.toString().length) pos = pos + text.length;
  //     }

  //       // Set the caret position
  //       if (pos >= element.innerText.length) {
  //        contentEditable.setCaretPosition(element, element.innerText.length);
  //      } else {
  //        contentEditable.setCaretPosition(element, pos);
  //      }

  //       // Adjust the selection to the end of the inserted text
  //       const selection = window.getSelection();
  //       const newRange = document.createRange();
  //       const childElem = element.lastChild ? element.lastChild : element
  //       newRange.setStart(childElem, childElem);
  //       newRange.collapse(true);

  //       // Clear previous ranges and set the new one
  //       selection.removeAllRanges();
  //       selection.addRange(newRange);

  //     }
  //   } else if (element.ownerDocument.selection && element.ownerDocument.selection.createRange) {
  //     // Fallback for older browsers like IE
  //     element.ownerDocument.selection.createRange().text = text;
  //   }
  // }

  function insertTextAtCaret(element, text) {
    var sel, win, range, pos, newText, length, newString;

    if (window.getSelection) {
      win = element.ownerDocument.defaultView;
      sel = win.getSelection();

      if (sel.getRangeAt && sel.rangeCount) {
        newText = text.trim();
        length = newText.length;
        pos = sel.toString().length
          ? sel.baseOffset + text.length - 1
          : contentEditable.getCaretPosition(element);

        if (length === 1) {
          if (text.length - length < 2) {
            pos = pos + length;
          } else {
            pos = pos + text.length;
          }
        } else {
          if (!sel.toString().length) pos = pos + text.length;
        }
        // Create a selection object
    //    const selection = window.getSelection();
      //  const range = sel.getRangeAt(0);
      //   // Set the range to the end of the contentEditable element
      //   range.setStart(element, text.length-1);
      //   range.collapse(true);

        // Remove all ranges from the selection object
       // selection.removeAllRanges();
         range = sel.getRangeAt(0);
        // Add the new range to the selection object
        sel.addRange(range);
        text = sel.toString().length ? newText : text;
      //  range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(element.ownerDocument.createTextNode(text));
        newString = formatString(element.innerText);
        element.innerText = newString.trim();

        if (pos >= element.innerText.length) {
          contentEditable.setCaretPosition(
            me.element,
            element.innerText.length
          );
        } else {
          contentEditable.setCaretPosition(me.element, pos);
        }
      }
    } else if (
      element.ownerDocument.selection &&
      element.ownerDocument.selection.createRange
    ) {
      element.ownerDocument.selection.createRange().text = text;
    }
  }

  function formatString(elemValue) {
    elemValue = capitalizeSentences(elemValue);

    if (elemValue.search("  ") > -1) {
      elemValue = elemValue.replace(new RegExp("  ", "g"), " ");
    }
    return elemValue;
  }

  function getElemValue(elem) {
    if (
      elem.nodeName.toLowerCase() === "input" ||
      elem.nodeName.toLowerCase() === "textarea"
    ) {
      return elem.value;
    } else {
      var innerText = elem.innerText; // using innerText here because it preserves newlines
      if (innerText[innerText.length - 1] === "\n")
        innerText = innerText.slice(0, -1); // get rid of weird extra newline
      return innerText;
    }
  }

  function setElemValue(elem, value) {
    if (
      elem.nodeName.toLowerCase() === "input" ||
      elem.nodeName.toLowerCase() === "textarea"
    ) {
      elem.value = value;
    } else {
      elem.innerHTML = value;
    }
  }

  function capitalizeSentences(text) {
    var newText = "",
      prefix = "",
      sentences = sentenceParser(text),
      firstSentence = true,
      isNewLine = false;

    sentences.forEach(function (sentence) {
      if (
        !/^[a-zA-Z]+$/.test(sentence.substring(0, 1)) ||
        firstSentence ||
        sentence.indexOf("\n") > -1 ||
        isNewLine
      ) {
        prefix = "";
      } else {
        prefix = " ";
      }

      if (sentence.indexOf("\n") > -1) {
        isNewLine = true;
      } else {
        isNewLine = false;
      }

      firstSentence = false;
      newText += prefix + sentenceCase(sentence);
    });

    // sentences.forEach(function (sentence) {
    //   if (!/^[a-zA-Z]+$/.test(sentence.substring(0, 1)) ||
    //   firstSentence ||
    //   sentence ==='/r/n' ||
    //   sentence ==='/n' ||
    //   isNewLine) {
    //     prefix = "";
    //   } else {
    //     prefix = " ";
    //   }

    //   if (sentence ==='/r/n' ||
    //   sentence ==='/n')  {

    //     isNewLine = true;
    //   } else {
    //     isNewLine = false;
    //   }

    //   firstSentence = false;
    //   newText += prefix + sentenceCase(sentence);
    // });
    return newText;
  }

  function sentenceCase(str) {
    return str.replace(/[a-z]/i, function (letter) {
      if (/^[a-zA-Z]+$/.test(letter)) {
        return letter.toUpperCase();
      } else {
        return letter;
      }
    });
  }

  me.removeDictationCommands = function (cmds) {
    for (var i = 0; i < cmds.length; i++) {
      me.commands.splice(getDictationCommandIndex(cmds[i]), 1);
    }
  };

  function getDictationCommandIndex(commandText) {
    for (var i = 0; i < me.commands.length; i++) {
      if (me.commands[i].commandText === commandText) {
        return i;
      }
    }
  }

  function isEdgeBrowser() {
    return /Edg/.test(navigator.userAgent);
  }

  initializeDictationCommands();
};

var sentenceParser = function (text) {
  var sentences = [],
    // Split by end punctuation or newline characters (keeping consecutive newlines separate)
    chunks = text.split(/(\S.+?[.\?!]|\n)/g),
    // Detection of non-sentence chunks
    abbrev_reg = new RegExp(
      "\\b(" + abbreviations.join("|") + ")[.!?] ?$",
      "i"
    ),
    acronym_reg = new RegExp("[ |.][A-Z].?$", "i"),
    ellipses_reg = new RegExp("\\.\\.\\.*$"),
    // Loop through these chunks, and join the non-sentence chunks back together
    chunks_length = chunks.length;

  for (var i = 0; i < chunks_length; i++) {
    if (chunks[i] || chunks[i] === "\r\n" || chunks[i] === "\n") {
      // Trim whitespace
      if (chunks[i] !== "\r\n" && chunks[i] !== "\n") {
        chunks[i] = chunks[i].replace(/^\s+|\s+$/g, "");
      }

      // Should this chunk be combined with the next one?
      if (
        chunks[i + 1] &&
        (chunks[i].match(abbrev_reg) ||
          chunks[i].match(acronym_reg) ||
          chunks[i].match(ellipses_reg))
      ) {
        chunks[i + 1] = (
          (chunks[i] || "") +
          " " +
          (chunks[i + 1] || "")
        ).replace(/ +/g, " ");
      } else if (chunks[i] && chunks[i].length > 0) {
        // This chunk is a proper sentence
        sentences.push(chunks[i]);
        chunks[i] = "";
      }
    }
  }
  // If we never got a sentence, return the given text
  if (sentences.length === 0) {
    return [text];
  }
  return sentences;
};

// var sentenceParser = function (text) {
//   var sentences = [],
//     //first do a greedy-split..
//     chunks = text.split(/(\S.+?[.\?!])(?=\s+|$|")/g),
//     //detection of non-sentence chunks
//     abbrev_reg = new RegExp('\\b(' + abbreviations.join('|') + ')[.!?] ?$', 'i'),
//     acronym_reg = new RegExp('[ |\.][A-Z]\.?$', 'i'),
//     ellipses_reg = new RegExp('\\.\\.\\.*$'),
//     //loop through these chunks, and join the non-sentence chunks back together..
//     chunks_length = chunks.length;

//   for (var i = 0; i < chunks_length; i++) {
//     if (chunks[i]) {
//       //trim whitespace
//       chunks[i] = chunks[i].replace(/^\s+|\s+$/g, '');
//       //should this chunk be combined with the next one?
//       if (chunks[i + 1] && (chunks[i].match(abbrev_reg) || chunks[i].match(acronym_reg) || chunks[i].match(ellipses_reg))) {
//         chunks[i + 1] = ((chunks[i] || '') + ' ' + (chunks[i + 1] || '')).replace(/ +/g, ' ');
//       } else if (chunks[i] && chunks[i].length > 0) { //this chunk is a proper sentence..
//         sentences.push(chunks[i]);
//         chunks[i] = '';
//       }
//     }
//   }
//   //if we never got a sentence, return the given text
//   if (sentences.length === 0) {
//     return [text];
//   }
//   return sentences;
// };

// Array of abbreviations detected by SentenceParter object
var abbreviations = [
  "arc",
  "al",
  "exp",
  "fy",
  "pd",
  "pl",
  "plz",
  "tce",
  "bl",
  "ma",
  "ba",
  "lit",
  "ex",
  "eg",
  "ie",
  "ca",
  "cca",
  "vs",
  "etc",
  "esp",
  "ft",
  "bc",
  "ad",
  "md",
  "corp",
  "col",
  "dept",
  "univ",
  "assn",
  "bros",
  "inc",
  "ltd",
  "co",
  //proper nouns with exclamation marks
  "yahoo",
  "joomla",
  "jeopardy",
  "rd",
  "st",
  "dist",
  "mt",
  "ave",
  "blvd",
  "cl",
  "ct",
  "cres",
  "hwy",
  //states
  "ariz",
  "cal",
  "calif",
  "colo",
  "conn",
  "fla",
  "fl",
  "ga",
  "ida",
  "ia",
  "kan",
  "kans",
  "minn",
  "neb",
  "nebr",
  "okla",
  "penna",
  "penn",
  "pa",
  "dak",
  "tenn",
  "tex",
  "ut",
  "vt",
  "va",
  "wis",
  "wisc",
  "wy",
  "wyo",
  "usafa",
  "alta",
  "ont",
  "que",
  "sask",
  "jan",
  "feb",
  "mar",
  "apr",
  "jun",
  "jul",
  "aug",
  "sep",
  "sept",
  "oct",
  "nov",
  "dec",
  "circa",
  //Honorifics
  "adj",
  "adm",
  "adv",
  "asst",
  "atty",
  "bldg",
  "brig",
  "capt",
  "cmdr",
  "comdr",
  "cpl",
  "det",
  "dr",
  "esq",
  "gen",
  "gov",
  "hon",
  "jr",
  "llb",
  "lt",
  "maj",
  "messrs",
  "mister",
  "mlle",
  "mme",
  "mr",
  "mrs",
  "ms",
  "mstr",
  "op",
  "ord",
  "phd",
  "prof",
  "pvt",
  "rep",
  "reps",
  "res",
  "rev",
  "sen",
  "sens",
  "sfc",
  "sgt",
  "sir",
  "sr",
  "supt",
  "surg",
  "miss",
  "misses",
  "no",
];

var ContentEditableUtils = function () {
  var me = this;

  me.setCaretPosition = function (container, position) {
    var doc = container.ownerDocument || container.document,
      win = doc.defaultView || doc.parentWindow;
    if (position >= 0) {
      var selection = win.getSelection(),
        range = me.createRange(container, { count: position });
      if (range != null) {
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };

  /**
   * Get the current caret position inside a contentEditable container
   */
  me.getCaretPosition = function (container) {
    var doc = container.ownerDocument || container.document,
      win = doc.defaultView || doc.parentWindow,
      selection = win.getSelection(),
      charCount = -1,
      node;

    if (selection.focusNode != null) {
      if (me.isDescendantOf(selection.focusNode, container)) {
        node = selection.focusNode;
        charCount = selection.focusOffset;
        while (node != null) {
          if (node == container) {
            break;
          }
          if (node.previousSibling != null) {
            node = node.previousSibling;
            charCount += node.textContent.length;
          } else {
            node = node.parentNode;
            if (node == null) {
              break;
            }
          }
        }
      }
    }
    return charCount;
  };

  /**
   * Returns true if the node is a descendant (or equal to) a parent
   */
  me.isDescendantOf = function (node, parent) {
    while (node != null) {
      if (node == parent) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  };

  me.createRange = function (node, chars, range) {
    var doc = node.ownerDocument || node.document,
      win = doc.defaultView || doc.parentWindow;

    if (range == null) {
      range = win.document.createRange();
      range.selectNode(node);
      range.setStart(node, 0);
    }
    if (chars.count == 0) {
      range.setEnd(node, chars.count);
    } else if (node != null && chars.count > 0) {
      if (node.nodeType == 3) {
        if (node.textContent.length < chars.count) {
          chars.count -= node.textContent.length;
        } else {
          range.setEnd(node, chars.count);
          chars.count = 0;
        }
      } else {
        var _g = 0,
          _g1 = node.childNodes.length;
        while (_g < _g1) {
          var lp = _g++;
          range = me.createRange(node.childNodes[lp], chars, range);
          if (chars.count == 0) {
            break;
          }
        }
      }
    }
    return range;
  };
};

// function isInShadow(node) {
//   if (node.nodeType === 1) {
//     var el = node.getRootNode();
//     if (el instanceof ShadowRoot) {
//       return el;
//     } else if (node.shadowRoot) {
//       return node;
//     } else {
//       return null;
//     }
//   }
// }

// function needsCase(elemValue, myValue, pos) {
//   var testValue = '';
//   if (pos < 2) return true;
//   if (pos < elemValue.length && pos > 2 && (myValue.length > 1 ||
//     myValue.trim().substring(0, 0).toLowerCase() !== 'i')) {
//     testValue = testValue.substring(pos - 2, pos);
//     if (!/[.-™'%!?]$/.test(testValue)) {
//       return false;
//     }
//   }
//   if (!/[.!?]$/.test(elemValue.substring(0, pos).trim()) && (myValue.length > 1 ||
//     myValue.trim().substring(0, 0).toLowerCase() !== 'i') && elemValue.length) {
//     return false;
//   }
//   return true;
// }

// function updateTranscript(transcript, elemValue) {
//   //Handles adding spaces before transcript, if needed
//   if (transcript.substring(0, 1) !== ' ' && elemValue.length) {
//     if (transcript.trim().length === 1) {
//       if (transcript.trim().match(/^[0-9a-zA-Z]+$/)) transcript = ' ' + transcript;
//     }
//   }
//   return transcript;
// }

// function checkForSymbol(elemValue) {
//   var symbols = ['"', "'", ' (', ' [', ' {', ' $', ' ¥', ' €', ' £', '\'', '@', '~'];

//   var endString = elemValue.substring(elemValue.length - 2, elemValue.length);
//   for (var i = 0; i < symbols.length; i++) {
//     if (endString === symbols[i]) {
//       return true;
//     }
//   }
// }
// function getShadowElements(root, selector) {
//   var childNodes = Array.from(root.childNodes),
//     elemArray = [];

//   elemArray.push.apply(elemArray, childNodes);

//   childNodes.forEach(childNode => {
//     if (childNode.querySelectorAll) elemArray.push.apply(elemArray, Array.from(childNode.querySelectorAll(selector)));
//   });

//   return elemArray;
// }

/*
 * This is the interface that developers will use to interact with the app.
 * 1.Initializes primary objects
 * 2. Passes transcript from the speech provider object to other objects
 */

var WebAssist = function (options) {
  var me = this,
    webCommands = null,
    dictation = null,
    commandMatches = null,
    recognition = null,
    recognitionActive = false,
    //This is the list of browsers that currently support the native speech provider.
    //You will need to update this as more browsers adopt the standard.
    browsers = ["chrome", "safari", "samsung", "edg"];

  me.paid = false;
  me.compatible = true;
  me.dictationMode = false;
  me.showAllLabels = false;
  me.soundEffects = false;
  me.defaultOptions = {
    useDictation: true,
    useAltProvider: false,
    useWebProvider: true,
    usePhonemes: true,
    addVocabulary: true,
    altSpeechTimeout: 20000,
    paid: false,
    webSpeechTimeout: 0,
    maxAlternatives: 3,
    languageCode: "en-US",
    interimResults: true,
    singleUtterance: false,
    model: "default",
    //   phonemeDictPath: getFullPath('miscellaneous/phonemedicthomo.csv'),
    addAltText: true,
  };
  me.testMode = false;

  // function getFullPath(path) {
  //   var scripts = document.getElementsByTagName("script"),
  //     location = scripts[scripts.length - 1].src,
  //     lastIndex = location.lastIndexOf('/'),
  //     currentPosition = 0,
  //     position = 0;

  //   do {
  //     currentPosition = location.indexOf('/', currentPosition + 1);
  //     if (currentPosition !== lastIndex) position = currentPosition;
  //   }
  //   while (currentPosition < lastIndex);

  //   return location.substring(0, position + 1) + path;
  // }

  // Initializes options object properties not set by user with their default values
  me.options = extend(me.defaultOptions, options);

  function extend(obj1, obj2) {
    var obj3 = {},
      attrname = "";

    for (attrname in obj1) {
      obj3[attrname] = obj1[attrname];
    }
    for (attrname in obj2) {
      obj3[attrname] = obj2[attrname];
    }
    return obj3;
  }

  function initialize() {
    try {
      //Get recognition object so we can check for compatibility and make an early exit
      me.options.onResult = processResults;
      initializeSpeechObjects();
      if (!me.options.frameAllowed) {
        recognition = getSpeechProvider(me.options);
        if (!recognition) {
          me.compatible = false;
          return;
        }
      }
      
      if (me.options.useDictation && document.activeElement && !noEditContent(document.activeElement))
        checkDictationMode(document.activeElement);

     
      
      // recognition.addGrammars(commands)
      if (me.options.usePhonemes) {
        getDictionary();
      }
      //Initialized event raised
      if (me.options.initialized) me.options.initialized();
    } catch (e) {
      if (me.options.onError) me.options.onError("error  " + e.message);
      console.log(e.message);
    }
  }

  function getSpeechProvider(recOptions) {
    //If Chrome is being used, use the native speech provider else the alternative provider will be used.

    if (
      typeof window.webkitSpeechRecognition !== "undefined" &&
      me.options.useWebProvider
    ) {
      if (checkNativeBrowser()) {
        return new WebSpeechRecognitionAPI(recOptions);
      } else {
        if (me.options.useAltProvider) {
          return returnAltProvider();
        } else {
          return null;
        }
      }
    } else {
      if (me.options.useAltProvider) {
        return returnAltProvider();
      } else {
        return null;
      }
    }
  }

  function returnAltProvider(recOptions) {
    if (navigator.mediaDevices.getUserMedia) ; else {
      return null;
    }
  }

  async function getDictionary() {
    var response = await fetch(me.options.phonemeDictPath),
      text = "";

    if (response.ok) {
      text = await response.text();
    } else {
      if (me.options.onError) me.options.onError("error HTTP-Error");
      console.log("HTTP-Error: " + response.status);
    }
    addDictionary(text);
    //Initialized event raised
    if (me.options.initialized) me.options.initialized();
  }

  function addDictionary(text) {
    var dictConvert = null;

    dictConvert = new CSVToArray();
    //Phoneme dictionary
    dictConvert.convert(text);
    commandMatches.dictConvert = dictConvert;
  }

  //Initializes primary objects used by the app
  function initializeSpeechObjects() {
    var commands = [];

    try {
      commandMatches = new waCommandMatches(me.options);
      webCommands = new waWebCommands(me.options, commandMatches, me);
      commands.push.apply(commands, webCommands.commands);

      if (me.options.useDictation) {
        dictation = new waDictation(me.options, commandMatches);
        commands.push.apply(commands, dictation.commands);
      }
      //  var browser = getBrowser();

      // if ( browser !== 'edg') postMessage('addGrammars', commands);
      //Pass the array of commands to the speech provider (if applicable)
      // if (me.options.addVocabulary && recognition.addVocabulary) recognition.addVocabulary(commands);
    } catch (e) {
      if (me.options.onError) me.options.onError("error " + e.message);
      console.log(e.message);
    }
  }

  //Starts speech recognition
  me.start = function () {
    try {
      if (document.hidden || recognitionActive) return;
      recognitionActive = true;
      if (me.options.frameAllowed) {
        postMessage("startRecognition");
      } else {
        recognition.start();
      }

      if (me.options.recognitionStarted) me.options.recognitionStarted();
      // setTimeout(() => {
      //   if (me.options.recognitionStarted) me.options.recognitionStarted();
      // }, 200);
    } catch (e) {
      if (e.message.indexOf("recognition has already started") === -1) {
        if (me.options.onError) me.options.onError("error");
        console.log(e.message);
      }
    }
  };

  function postMessage(action, data) {
    //  window.focus();
    var frame = document.getElementById("speechFrame"),
      url = frame.src;
    options.data = data;
    frame.contentWindow.postMessage(
      JSON.stringify({
        action: action,
        host: window.location.href,
        options: options,
      }),
      url
    );
  }

  //Stop speech recognition
  me.stop = function () {
    try {
      if (me.options.frameAllowed) {
        postMessage("stopRecognition");
      } else {
        recognition.stop();
      }
      if (me.options.recognitionStopped) me.options.recognitionStopped();
      recognitionActive = false;
    } catch (e) {
      if (me.options.onError) me.options.onError("error");
      console.log(e.message);
    }
  };

  me.initializeCommands = function (labelsHidden) {
    try {
      webCommands.initializeCommands(labelsHidden, me.showAllLabels);
      addFocusEvents(webCommands.focusElems);
      if (window.location.href.indexOf("facebook.com") === -1) {
        setTimeout(() => {
          initializeGrammars();
        }, 100);
      }
    } catch (e) {
      console.log("Could not initialize all commands " + e.message);
    }
  };

  async function initializeGrammars() {
    var grammarCommands = [];
    grammarCommands.push.apply(grammarCommands, webCommands.commands);
    grammarCommands.push.apply(grammarCommands, dictation.commands);
    postMessage("addGrammars", grammarCommands);
  }
  // function testCommands(ommands) {
  //   webCommands.testMode = true;
  //   ommands.forEach(command => {
  //     if (command.elem) {
  //       if (command.elem.nodeName !== 'INPUT' && !command.elem.href) {
  //         me.executeWebCommand(command.commandText);
  //         wcf.clickPage();
  //       }
  //     }
  //   });
  // }

  me.initializeDynamicCommands = function (elem) {
    var showAllLabels = me.showAllLabels;
    webCommands.initializeDynamicCommands(elem);
    webCommands.addAltCommands(false, showAllLabels, elem);
  };

  me.setCommandText = function (oldText, newText) {
    try {
      webCommands.setCommandText(oldText, newText);
      webCommands.sortCommands();
    } catch (e) {
      if (me.options.onError) me.options.onError(e.message);
    }
  };

  me.getDocuments = function () {
    return webCommands.documents;
  };

  me.resetDocuments = function () {
    webCommands.resetDocuments();
  };

  //These methods are used to add and remove your custom commands
  me.addWebCommands = function (commands) {
    try {
      webCommands.addCommands(commands);
      webCommands.sortCommands();
    } catch (e) {
      if (me.options.onError) me.options.onError(e.message);
    }
  };

  me.addDictationCommands = function (commands) {
    try {
      dictation.commands.push.apply(dictation.commands, commands);
    } catch (e) {
      if (me.options.onError) me.options.onError(e.message);
    }
  };

  me.removeWebCommands = function (commands) {
    try {
      webCommands.removeCommands(commands);
    } catch (e) {
      if (me.options.onError) me.options.onError(e.message);
    }
  };

  me.updateAltElemsPosition = function () {
    webCommands.updateAltElemsPosition();
  };

  me.removeDictationCommands = function (commands) {
    try {
      dictation.removeCommands(commands);
    } catch (e) {
      if (me.options.onError) me.options.onError(e.message);
    }
  };

  // Returns an array of available web commands. Intended primarily for testing
  me.getWebCommands = function () {
    return webCommands.commands;
  };

  // Returns an array of available dictation commands. Intended primarily for testing
  me.getDictationCommands = function () {
    return dictation.commands;
  };

  // These two methods can be used to test different commands
  me.executeWebCommand = function (text) {
    setTimeout(() => {
      webCommands.executeCommandMatches(text, true);
      commandMatches.initializeVariables();
    }, 500);
  };

  //Returns the text that is inserted into the element
  me.executeDictation = function (text, elem) {
    if (elem) elem.focus();
    return dictation.dictate(text);
  };

  //This is a callback function used by the speech provider objects to return recognized speech transcripts
  //The transcript array is then passed to other objects for further processing/
  function processResults(transcripts, finalResults) {
    transcripts = transcripts.reverse();
    if (!finalResults && commandMatches.waitForFinal) return;
    //Process transcript if there is not an existing command match
    if (!commandMatches.activeCommand) {
      if (!me.dictationMode || (me.dictationMode && finalResults))
        webCommands.executeCommandMatches(transcripts, finalResults);
      if (me.dictationMode && !commandMatches.activeCommand && finalResults)
       dictation.dictate(transcripts);
    }

    if (finalResults) {
      commandMatches.initializeVariables();
      //Execute lastTranscript event if set
      if (me.options.lastTranscript) me.options.lastTranscript();
      if (
        !me.dictationMode &&
        !commandMatches.activeCommand &&
        me.options.noMatch
      )
        me.options.noMatch();
    }
  }

  async function addFocusEvents(focusElems) {
    focusElems.forEach(function (elem) {
      
      if (elem.nodeName !== "VIDEO" && !noEditContent(elem)) {
        elem.addEventListener("focus", styleFocus);
        elem.addEventListener("blur", removeFocusStyle);
        elem.setAttribute("focusEvent", "true");
      //  if (!elem.tabIndex || elem.tabIndex < 0) elem.tabIndex = 0;
      } else {
        if (elem.hasAttribute('contenteditable')) {
          elem.addEventListener("focus", noEditMessage);
          
        }
        return;
      }
      
      // else {
      //   if (elem.hasAttribute('contenteditable')) {
      //     elem.addEventListener("focus", noEditMessage);
      //     return;
      //   }
      // }
    });

  }

  async function checkDictationMode(activeElement) {
    var attrValue = activeElement.getAttribute("type");

   if (noEditContent(activeElement)) return;
    //Switch to dictation mode for elements that can receive user input.
    //input:not([type=number]):not([type=time]):not([type=datetime-local]):not([type=date]):not([type=datetime])
    if (
      (activeElement.nodeName === "INPUT" &&
        attrValue !== "checkbox" &&
        attrValue !== "radio" &&
        attrValue !== "month" &&
        attrValue !== "file" &&
        attrValue !== "button" &&
        attrValue !== "image" &&
        attrValue !== "submit" &&
        attrValue !== "week" &&
        attrValue !== "color" &&
        attrValue !== "reset") ||
      activeElement.nodeName === "TEXTAREA" ||
      activeElement.getAttribute("contenteditable") === "true"
    ) {
      if (me.options.useDictation) {
        me.startDictation(activeElement);
      }
    }
  }

  function noEditMessage(e) {
    setMessage('Use "open notes" for voice dictation.');
   
  }
  function setMessage(message) {
   var commandText = document.querySelector('#waCommands');
   commandText.innerHTML = message;
  }

  function noEditContent(currentElem) {
      return window.location.href.indexOf("linkedin.com") === -1 && window.location.href.indexOf("chatgpt.com") === -1 && 
      (currentElem.hasAttribute("contenteditable") &&
     
        (window.location.href.indexOf("facebook") > -1 ||
        window.location.href.indexOf("reddit") > -1) ||
          currentElem.getElementsByTagName("*").length 
 );
}
  
  function styleFocus(evt) {
    var currentTarget = evt.currentTarget,
      attrValue = currentTarget.getAttribute("type");

    currentTarget.setAttribute("hasOutline", "true");
    currentTarget.style.outlineColor = "#c3e6f4"; //'SKYBLUE';
    currentTarget.style.outlineWidth = "3px";
    currentTarget.style.outlineStyle = "solid";
    if (
      currentTarget.offsetHeight < 150 &&
      currentTarget.nodeName !== "INPUT" &&
      currentTarget.nodeName !== "SELECT" &&
      currentTarget.nodeName !== "TEXTAREA" &&
      !currentTarget.hasAttribute("contenteditable")
    )
      currentTarget.style.fontWeight = "bolder";
    //Switch to dictation mode for elements that can receive user input.
    //input:not([type=number]):not([type=time]):not([type=datetime-local]):not([type=date]):not([type=datetime])
    if (
      (currentTarget.nodeName === "INPUT" &&
        attrValue !== "checkbox" &&
        attrValue !== "radio" &&
        attrValue !== "month" &&
        attrValue !== "file" &&
        attrValue !== "button" &&
        attrValue !== "image" &&
        attrValue !== "submit" &&
        attrValue !== "week" &&
        attrValue !== "color" &&
        attrValue !== "reset") ||
      currentTarget.nodeName === "TEXTAREA" ||
      currentTarget.getAttribute("contenteditable") === "true"
    ) {
      if (me.options.useDictation) {
        setTimeout(function () {
          me.startDictation(currentTarget);
        }, 50);
      }
    }
  }

  me.startDictation = function (currentTarget) {
    currentTarget = currentTarget ? currentTarget : document.activeElement;
    me.dictationMode = true;

    if (me.options.frameAllowed) {
      postMessage("setDictationMode", true);
      postMessage("setContinuousMode", true);
    }

    commandMatches.dictationMode = true;
    if (recognitionActive) {
      if (options.sendCommandMessage)
        setTimeout(() => {
          options.sendCommandMessage(
            'Dictation Mode. Say "stop dictation" to end.'
          );
        }, 500);
    }
    me.dictationElement = currentTarget;
    dictation.element = currentTarget;
  };

  function removeFocusStyle(e) {
    var focusElems =
      e.target.ownerDocument.querySelectorAll("[hasOutline=true");

    removeStyle(e.target);

    focusElems.forEach(function (elem) {
      removeStyle(elem);
    });

    if (me.options.useDictation) {
      me.stopDictation();
    }
  }

  function removeStyle(elem) {
    elem.style.removeProperty("outline-style");
    elem.style.removeProperty("outline-color)");
    elem.style.removeProperty("outline-width)");
    elem.removeAttribute("hasOutline");
    if (
      elem.nodeName !== "INPUT" &&
      elem.nodeName !== "SELECT" &&
      elem.nodeName !== "TEXTAREA" &&
      !elem.hasAttribute("contenteditable")
    )
      elem.style.removeProperty("font-weight");
  }

  me.stopDictation = function () {
    if (me.options.useDictation && me.dictationMode) {
      window.focus();
      me.dictationMode = false;

      me.dictationElement = null;
      dictation.element = null;
      if (me.options.frameAllowed) {
        postMessage("setDictationMode", false);
        postMessage("setContinuousMode", false);
      }

      commandMatches.dictationMode = false;
      if (recognitionActive) {
        if (options.sendCommandMessage)
          options.sendCommandMessage(options.defaultCommandText);
      }
    }
  };

  me.initializeInputUndos = function () {
    webCommands.initializeInputUndos();
  };

  me.setModal = function (isModal) {
    webCommands.modal = isModal;
  };

  me.resetTimeout = function () {
    if (me.options.frameAllowed) {
      postMessage("resetTimeout");
    } else {
      recognition.resetTimeout();
    }
  };

  me.setVideoTimeout = function (data) {
    if (me.options.frameAllowed) {
      postMessage("setVideoTimeout");
    } else {
      recognition.setVideoTimeout();
    }
  };

  me.returnDocuments = function () {
    return webCommands.documents;
  };

  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    if (request.action === "stop" && document.hidden) {
      recognitionActive = true;
      if (me.options.tabFocus) me.options.tabFocus(false);
    } else if (request.action === "start") {
      recognitionActive = false;
      if (me.options.tabFocus) me.options.tabFocus(true);
    } else if (request.action === "Update") {
      if (me.options.initializeCommands) me.options.initializeCommands();
    } else if (request.action === "paidStatus") {
      me.paid = request.paid;
    }
    sendResponse({
      status: "ok",
    });
  });

  window.addEventListener("message", function (message) {
    if (!isJsonString(message.data)) return;

    var data = JSON.parse(message.data);

    if (!data || !data.type) return;

    if (data.type === "timeout") {
      me.options.ontimeout();
    } else if (data.type === "speechDetected") {
      me.options.startRecognition();
    } else if (data.type === "transcripts") {
      processResults(data.transcripts, data.finalResults);
    } else if (data.type === "reload") {
      if (document.hidden) location.reload();
    }

    // else if (data.type === "recognitionStarted") {
    //   me.options.recognitionStarted();
    // }
  });

  function isJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  function checkNativeBrowser() {
    var browser = getBrowser();

    for (var i = 0; i < browsers.length; i++) {
      if (browser === browsers[i]) return true;
    }
    return false;
  }

  function getBrowser() {
    var userAgent = navigator.userAgent.toLowerCase();

    switch (true) {
      case userAgent.indexOf("edg") > -1:
        return "edg";
      case userAgent.indexOf("chrome") > -1 &&
        navigator.vendor.toLowerCase() === "google inc." &&
        typeof window.opr === "undefined" &&
        userAgent.indexOf(" ubrowser") === -1:
        return "chrome";

      case typeof InstallTrigger !== "undefined" ||
        navigator.appVersion.toLowerCase().indexOf("fxios") > -1 ||
        Array.prototype.slice
          .call(window.getComputedStyle(document.documentElement, ""))
          .join("")
          .match(/-(moz|webkit|ms)-/)[1]
          .toLowerCase() === "moz":
        return "firefox";
      case /Safari/i.test(userAgent) && /Apple Computer/.test(navigator.vendor):
        var platform = navigator.platform.toLowerCase();

        if (
          platform.indexOf("iphone") > -1 ||
          platform.indexOf("ipod") ||
          platform.indexOf("ipad")
        ) {
          if (navigator.appVersion.toLowerCase().indexOf("mobi") > -1) {
            return "safari";
          } else {
            return "other";
          }
        } else {
          return "safari";
        }
      case userAgent.match(/samsungbrowser/i):
        return "samsung";

      default:
        return "other";
    }
  }

  initialize();
  window.WebAssist = me;
};

//Used to parse the phoneme dictionary
var CSVToArray = function () {
  var me = this;
  me.dictArray = [];
  me.dictIndex = [];

  me.convert = function (dict) {
    var allRows = dict.split(/\r?\n|\r/);
    allRows.forEach(function (row) {
      me.dictArray.push(row.split(","));
    });
    indexDictArray();
  };

  function indexDictArray() {
    var start = 1,
      ind = 0,
      character = "A";

    me.dictIndex.push({
      character: character,
      ind: ind,
    });

    for (var i = 65; i < 90; i++) {
      ind = getIndex(start, character);
      character = String.fromCharCode(i + 1);
      me.dictIndex.push({
        character: character,
        ind: ind,
      });
      start = ind + 1;
    }
  }

  function getIndex(start, character) {
    for (var i = start; i < me.dictArray.length; i++) {
      if (character !== me.dictArray[i][0].charAt(0)) return i;
    }
  }
};

// function addMessage(currentTarget) {
//   var coords = getCoords(currentTarget);
//   var el = document.createElement("div");
//   el.id = 'tempMessage';
//   el.style.position = 'fixed';
//   el.innerText = 'Focused';
//   el.style.left = coords.left + 'px';
//   el.style.bottom = coords.top + 2 + 'px';
//   document.body.appendChild(el);
//   return el
// }

// function deleteMessage(currentTarget) {
//   setInterval(() => {
//     currentTarget.remove()
//   }, 2000);
//  ;
// }

(function(e){if("function"==typeof bootstrap)bootstrap("hark",e);else if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else if("undefined"!=typeof ses){if(!ses.ok())return;ses.makeHark=e;}else "undefined"!=typeof window?window.hark=e():global.hark=e();})(function(){  return (function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports);}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
  var WildEmitter = require('wildemitter');
  
  function getMaxVolume (analyser, fftBins) {
    var maxVolume = -Infinity;
    analyser.getFloatFrequencyData(fftBins);
  
    for(var i=4, ii=fftBins.length; i < ii; i++) {
      if (fftBins[i] > maxVolume && fftBins[i] < 0) {
        maxVolume = fftBins[i];
      }
    }  
    return maxVolume;
  }
  
  
  var audioContextType;
  if (typeof window !== 'undefined') {
    audioContextType = window.AudioContext || window.webkitAudioContext;
  }
  // use a single audio context due to hardware limits
  var audioContext = null;
  module.exports = function(stream, options) {
    var harker = new WildEmitter();
  
    // make it not break in non-supported browsers
    if (!audioContextType) return harker;
  
    //Config
    var options = options || {},
        smoothing = (options.smoothing || 0.2),
        interval = (options.interval || 50),
        threshold = options.threshold,
        play = options.play,
        history = options.history || 10,
        running = true;
  
    // Ensure that just a single AudioContext is internally created
    audioContext = options.audioContext || audioContext || new audioContextType();
  
    var sourceNode, fftBins, analyser;
  
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 1024;
    analyser.smoothingTimeConstant = smoothing;
    fftBins = new Float32Array(analyser.frequencyBinCount);
  
    if (stream.jquery) stream = stream[0];
    if (stream instanceof HTMLAudioElement || stream instanceof HTMLVideoElement) {
      //Audio Tag
      sourceNode = audioContext.createMediaElementSource(stream);
      if (typeof play === 'undefined') play = true;
      threshold = threshold || -50;
    } else {
      //WebRTC Stream
      sourceNode = audioContext.createMediaStreamSource(stream);
      threshold = threshold || -50;
    }
  
    sourceNode.connect(analyser);
    if (play) analyser.connect(audioContext.destination);
  
    harker.speaking = false;
  
    harker.suspend = function() {
      return audioContext.suspend();
    };
    harker.resume = function() {
      return audioContext.resume();
    };
    Object.defineProperty(harker, 'state', { get: function() {
      return audioContext.state;
    }});
    audioContext.onstatechange = function() {
      harker.emit('state_change', audioContext.state);
    };
  
    harker.setThreshold = function(t) {
      threshold = t;
    };
  
    harker.setInterval = function(i) {
      interval = i;
    };
  
    harker.stop = function() {
      running = false;
      harker.emit('volume_change', -100, threshold);
      if (harker.speaking) {
        harker.speaking = false;
        harker.emit('stopped_speaking');
      }
      analyser.disconnect();
      sourceNode.disconnect();
    };
    harker.speakingHistory = [];
    for (var i = 0; i < history; i++) {
        harker.speakingHistory.push(0);
    }
  
    // Poll the analyser node to determine if speaking
    // and emit events if changed
    var looper = function() {
      setTimeout(function() {
  
        //check if stop has been called
        if(!running) {
          return;
        }
  
        var currentVolume = getMaxVolume(analyser, fftBins);
  
        harker.emit('volume_change', currentVolume, threshold);
  
        var history = 0;
        if (currentVolume > threshold && !harker.speaking) {
          // trigger quickly, short history
          for (var i = harker.speakingHistory.length - 3; i < harker.speakingHistory.length; i++) {
            history += harker.speakingHistory[i];
          }
          if (history >= 2) {
            harker.speaking = true;
            harker.emit('speaking');
          }
        } else if (currentVolume < threshold && harker.speaking) {
          for (var i = 0; i < harker.speakingHistory.length; i++) {
            history += harker.speakingHistory[i];
          }
          if (history == 0) {
            harker.speaking = false;
            harker.emit('stopped_speaking');
          }
        }
        harker.speakingHistory.shift();
        harker.speakingHistory.push(0 + (currentVolume > threshold));
  
        looper();
      }, interval);
    };
    looper();
  
    return harker;
  };
  
  },{"wildemitter":2}],2:[function(require,module,exports){
  /*
  WildEmitter.js is a slim little event emitter by @henrikjoreteg largely based
  on @visionmedia's Emitter from UI Kit.
  
  Why? I wanted it standalone.
  
  I also wanted support for wildcard emitters like this:
  
  emitter.on('*', function (eventName, other, event, payloads) {
  
  });
  
  emitter.on('somenamespace*', function (eventName, payloads) {
  
  });
  
  Please note that callbacks triggered by wildcard registered events also get
  the event name as the first argument.
  */
  
  module.exports = WildEmitter;
  
  function WildEmitter() { }
  
  WildEmitter.mixin = function (constructor) {
      var prototype = constructor.prototype || constructor;
  
      prototype.isWildEmitter= true;
  
      // Listen on the given `event` with `fn`. Store a group name if present.
      prototype.on = function (event, groupName, fn) {
          this.callbacks = this.callbacks || {};
          var hasGroup = (arguments.length === 3),
              group = hasGroup ? arguments[1] : undefined,
              func = hasGroup ? arguments[2] : arguments[1];
          func._groupName = group;
          (this.callbacks[event] = this.callbacks[event] || []).push(func);
          return this;
      };
  
      // Adds an `event` listener that will be invoked a single
      // time then automatically removed.
      prototype.once = function (event, groupName, fn) {
          var self = this,
              hasGroup = (arguments.length === 3),
              group = hasGroup ? arguments[1] : undefined,
              func = hasGroup ? arguments[2] : arguments[1];
          function on() {
              self.off(event, on);
              func.apply(this, arguments);
          }
          this.on(event, group, on);
          return this;
      };
  
      // Unbinds an entire group
      prototype.releaseGroup = function (groupName) {
          this.callbacks = this.callbacks || {};
          var item, i, len, handlers;
          for (item in this.callbacks) {
              handlers = this.callbacks[item];
              for (i = 0, len = handlers.length; i < len; i++) {
                  if (handlers[i]._groupName === groupName) {
                      //console.log('removing');
                      // remove it and shorten the array we're looping through
                      handlers.splice(i, 1);
                      i--;
                      len--;
                  }
              }
          }
          return this;
      };
  
      // Remove the given callback for `event` or all
      // registered callbacks.
      prototype.off = function (event, fn) {
          this.callbacks = this.callbacks || {};
          var callbacks = this.callbacks[event],
              i;
  
          if (!callbacks) return this;
  
          // remove all handlers
          if (arguments.length === 1) {
              delete this.callbacks[event];
              return this;
          }
  
          // remove specific handler
          i = callbacks.indexOf(fn);
          callbacks.splice(i, 1);
          if (callbacks.length === 0) {
              delete this.callbacks[event];
          }
          return this;
      };
  
      /// Emit `event` with the given args.
      // also calls any `*` handlers
      prototype.emit = function (event) {
          this.callbacks = this.callbacks || {};
          var args = [].slice.call(arguments, 1),
              callbacks = this.callbacks[event],
              specialCallbacks = this.getWildcardCallbacks(event),
              i,
              len,
              listeners;
  
          if (callbacks) {
              listeners = callbacks.slice();
              for (i = 0, len = listeners.length; i < len; ++i) {
                  if (!listeners[i]) {
                      break;
                  }
                  listeners[i].apply(this, args);
              }
          }
  
          if (specialCallbacks) {
              len = specialCallbacks.length;
              listeners = specialCallbacks.slice();
              for (i = 0, len = listeners.length; i < len; ++i) {
                  if (!listeners[i]) {
                      break;
                  }
                  listeners[i].apply(this, [event].concat(args));
              }
          }
  
          return this;
      };
  
      // Helper for for finding special wildcard event handlers that match the event
      prototype.getWildcardCallbacks = function (eventName) {
          this.callbacks = this.callbacks || {};
          var item,
              split,
              result = [];
  
          for (item in this.callbacks) {
              split = item.split('*');
              if (item === '*' || (split.length === 2 && eventName.slice(0, split[0].length) === split[0])) {
                  result = result.concat(this.callbacks[item]);
              }
          }
          return result;
      };
  
  };
  
  WildEmitter.mixin(WildEmitter);
  
  },{}]},{},[1])(1)
  });
  hark;
  var hark$1 = hark;

var speechDetector = function (options) {
    var me = this,
        maxInterval = 1500,
        minInterval = 500,
        speech = null,
        deviceId = '',
        hOptions = {
            interval: 70,
            threshold: -70
        };

    me.globalStream = null;
    me.detectorOn = false;
    me.soundEffects = false;

    me.stop = function () {
        try {
            closeMedia();
        } catch (e) {
            console.log('Media error');
        }
    };

    me.start = function () {

        var constraints = {
            audio: {
                noiseSuppression: true
            },
            video: false
        },
            speechOn = false;

        try {
            if (me.detectorOn) return;

            if (!navigator.mediaDevices.getUserMedia || document.hidden) return;

            navigator.mediaDevices.getUserMedia(constraints)
                .then(handleSuccess, handleError).catch(function () { });
        } catch (e) {
            if (options.onError) options.onError(e.message);
        }

        function handleSuccess(stream) {
            try {

                me.detectorOn = true;
                if (!document.hidden) {
                    me.globalStream = stream;
                    //  speech = speech ? speech : hark(stream, hOptions);
                    speech = hark$1(stream, hOptions);
                    deviceId = getID(stream);
                } else {
                    me.globalStream = stream;
                    stopMicrophone();
                }
            } catch (e) {
                if (options.onError) options.onError(e.message);
            }

            function getID(stream) {
                var tracks = stream.getAudioTracks(),
                    device = '';

                for (let index = 0; index < tracks.length; index++) {
                    device = tracks[index].label;
                    if (device) return device;
                }
            }

            if (speech) {
                speech.on('speaking', function () {
                    try {
                        startClock();
                    } catch (error) {
                        console.log('speech object');
                    }

                });

                speech.on('stopped_speaking', function () {
                    if (speechOn) return;
                    speechOn = true;
                    var endTime = new Date(),
                        elTime = elapsedTime(endTime);
                //    console.log('Total ' + elTime.toString());
                    if (elTime < maxInterval && elTime > minInterval) {
                 //       console.log('Time ' + endTime.toString());
                        options.callback();

                        if (me.soundEffects) {
                            try {
                                let attention = new Audio(chrome.runtime.getURL('bubble-sound-effect.wav'));
                                attention.play().catch(function (err) { });
                            } catch (error) { }
                        }
                    }
                    speechOn = false;
                });
            }

        }

        function handleError(error) {
            console.log(error);
        }

    };

    // function checkMicrophonePermission() {
    //     var microphonePermission = navigator.permissions.query({ name: 'microphone' }).then(function name(permission) {
    //         return permission.state === 'granted'
    //     });
    //     return microphonePermission
    // }

    var startTime = null, counting = false;

    function startClock() {
        if (counting) return;
        startTime = new Date();
        counting = true;
    }

    function elapsedTime(endTime) {
        var elapsed = endTime - startTime;
        counting = false;
        return elapsed;
    }

    function closeMedia() {

        if (!me.detectorOn) return;
        speech.stop();
        stopMicrophone();
        me.detectorOn = false;
    }

    async function stopMicrophone() {
        await me.globalStream.getAudioTracks().forEach(function (track) {
            if (track.label === deviceId) {
                if (track.readyState === 'live') track.stop();
                //  track.enabled = false;
            }
        });
    }
};

// function getFullPath(path) {
//     var scripts = document.getElementsByTagName("script"),
//         location = scripts[scripts.length - 1].src,
//         lastIndex = location.lastIndexOf('/'),
//         currentPosition = 0,
//         position = 0;

//     do {
//         currentPosition = location.indexOf('/', currentPosition + 1);
//         if (currentPosition !== lastIndex) position = currentPosition;
//     }
//     while (currentPosition < lastIndex);

//     return location.substring(0, position + 1) + path;
// }

//import hark from './hark.bundle.js';

var speechDetectorFrame = function (options) {
  var me = this;

  me.detectorOn = false;
  me.soundEffects = false;

  me.stop = function () {
    try {
      me.detectorOn = false;
      var frame = document.getElementById("speechFrame"),
        url = frame.src;

      frame.contentWindow.postMessage(
        JSON.stringify({
          action: "stopSpeechDetection",
          host: window.location.href,
        }),
        url
      );
    } catch (e) {
      console.log("Media error");
    }
  };

  me.start = function () {
    try {
      if (!navigator.mediaDevices.getUserMedia) return;
      var frame = document.getElementById("speechFrame"),
        url = frame.src;

      if (document.hidden) return;

      frame.contentWindow.postMessage(
        JSON.stringify({
          action: "startSpeechDetection",
          options: options,
          host: window.location.href,
        }),
        url
      );

      setTimeout(() => {
        if (!document.hidden) {
          me.detectorOn = true;
          if (me.soundEffects) {
            try {
              let attention = new Audio(
                chrome.runtime.getURL("bubble-sound-effect.wav")
              );
              attention.play().catch(function (err) {});
            } catch (error) {}
          }
        }
      }, 100);
      
    } catch (e) {
      if (options.onError) options.onError(e.message);
    }
  };
};

/* Opens and closes panel containing the help content */
 
var waPanel = function (id) {
	var me = this,
		panel = null;

	me.open = false;

	me.show = function () {
		me.open = true;
		if (!panel) panel = document.getElementById(id);
		panel.scrollTop = 0;
		panel.style.display = "block";
		panel.zIndex = 999999999;
		panel.style.right = '0px';
		panel.focus();
	};

	me.hide = function () {
		me.open = false;
		var width = panel.offsetWidth;
		panel.style.right = width * -1 + 20 + 'px';
		panel.style.display = "none";
	};
};

var WebAssistUI = function (webAssistObj, options) {
  if (options.loadCSS) loadCSS(options.CSSPath);
  var me = this,
    wcf = new waCommandFunctions(options),
    panel = null,
    helpID = 'helpPanel',
    notesID = 'notesContainer',
    helpCloseMessage = 'Say "close help" to close help.',
    notesCloseMessage = 'Say "copy text" to copy the dictated text.',
    speechContainerID = 'WebAssistContainer',

    //The speech container contains elements that allow the user to start and stop speech recognition, 
    //displays command matches and recognition status, and hides the speech container.        
    elSpeechContainer = null,
    elStopRecognition = null,
    elStartRecognition = null,
    elCommandText = null,
    elWebStatus = null,
    elMinimizeContainer = null,
    startSpeechDisplay = null,
    showSpeechDisplay = null,
    altContainer = null;
    
  me.wakeUpEnabled = false;
  me.pageLoaded = false;
  me.enabled = true;
  me.minimized = options.showPageMic ? true : false;
  me.isMobile = options.isMobile;
  me.helpOpen = false;
  me.notesOpen = false;
  me.recorder = null;
  me.soundEffects = false;
  //Get the path of the image directory 
  if (!options.isExtension) options.imageDirectory = options.imageDirectory ? options.imageDirectory : getFullPath('images/');

  function initialize() {
    try {
      //Insert UI HTML into the document
      createUI();
      //Initialize global variables
      initializeVariables();
      //Initialize event handlers
      initializeEvents();
      //This function allows microphone access through the getUserMedia method without user interaction

      //style="opacity: 1; width: 28px; height: 28px; position: fixed; bottom: 0px;"
      if (options.showPageMic) startSpeechDisplay.setAttribute('style', 'display:inline-block !important;');
      //   if (options.showPageMic) startSpeechDisplay.style.display = 'inline-block  !important;';
    } catch (e) {
      if (options.onError) options.onError('error');
      console.log('Error initializing UI ' + e.message);
    }
  }

  function createUI() {
    if (options.isExtension) {
      insertRegularUIExt();
      // if (me.isMobile) {
      //   //   insertMobileUIExt();
      // } else {
      //   insertRegularUIExt();

      // }
    } else {
      if (me.isMobile) {
        insertMobileUI();
      } else {
        insertRegularUI();
      }
    }
  }

  function resetUI() {
    if (options.elementClicked) options.elementClicked();
    // if (me.isMobile) {
    //   //  deleteUI();
    //   //  initialize();
    // } else {
    //   if (options.elementClicked) options.elementClicked();
    // }
  }

  function insertMobileUI() {
    var html = '<div class="waMicSpeechContainer"> <div id="waStatus"></div> <img alt="start recognition" id="waRedMicSpeechDisplay" src="microphone-24-green.png"> <img alt="stop recognition" id="waGreenMicSpeechDisplay" src="microphone-24-red.png"></div><div id="waCommandContainer"><div id="waCommands"></div></div><div id="waMinimizeContainer" style="width:16px;height:16px"> <svg class="waMinimize" viewBox="0 0 15.1 8.9" fill="darkgrey" aria-hidden="true"> <polygon class="olark-top-bar-arrow" points="0.2,1.4 7.6,8.9 15.1,1.4 13.7,0 7.6,6 1.6,0"></polygon> </svg></div>';
    addDiv(document.documentElement || document.documentElement, speechContainerID, html, 'webContainerRight', '');
    if (options.showPageMic) {
      addImage(document.documentElement || document.documentElement, 'RedMicPage', options.imageDirectory + "microphone-24-red.png", 'start recognition', 'MicRight');
      addImage(document.documentElement || document.documentElement, 'GreenMicPage', options.imageDirectory + "microphone-24-green.png", 'display widget', 'MicRight');
    }
  }

  function insertRegularUI() {
    var html = '<div class="waHeader"> <b>Web Assist</b><div id="waMinimizeContainer"> <div id="waMinimize"><div></div></div></div></div><div class="waMicSpeechContainer" > <img alt="start recognition" id="waRedMicSpeechDisplay" style="width:28;height28;" src="microphone-28-green.png"><img alt="stop recognition" id="waGreenMicSpeechDisplay" style="width:28px;height28px;"  src="microphone-28-red.png"><div id="waStatus" style=""></div></div> <div id="waCommands" > Say "help" to learn more about Web Assist</div>';
    addDiv(document.documentElement || document.documentElement, speechContainerID, html, 'webContainerRight', '');

    if (options.showPageMic) {
      addImage(document.documentElement || document.documentElement, 'RedMicPage', options.imageDirectory + "microphone-28-red.png", 'start recognition', 'MicRight');
      addImage(document.documentElement || document.documentElement, 'GreenMicPage', options.imageDirectory + "microphone-28-green.png", 'display widget', 'MicRight');
    }
  }

  // function insertMobileUIExt() {
  //   var html = '<div class="waMicSpeechContainer"> <div id="waStatus"></div> <img alt="start recognition" id="waRedMicSpeechDisplay" src="' + chrome.runtime.getURL("/microphone-24-green.png") + '"> <img alt="stop recognition" id="waGreenMicSpeechDisplay" src="' + chrome.runtime.getURL("microphone-24-red.png") + '"></div><div id="waCommandContainer"><div id="waCommands"></div></div><div id="waMinimizeContainer" style="width:16px;height:16px"> <svg class="waMinimize" viewBox="0 0 15.1 8.9" fill="darkgrey" aria-hidden="true"> <polygon class="olark-top-bar-arrow" points="0.2,1.4 7.6,8.9 15.1,1.4 13.7,0 7.6,6 1.6,0"></polygon> </svg></div>';

  //   addDiv(document.documentElement || document.documentElement, speechContainerID, html, '', '');
  //   if (options.showPageMic) {
  //     addImage(document.documentElement || document.documentElement, 'RedMicPage', chrome.runtime.getURL("microphone-24-red.png"), 'start recognition', 'MicRight', '24px', '24px');
  //     addImage(document.documentElement || document.documentElement, 'GreenMicPage', chrome.runtime.getURL("microphone-24-green.png"), 'display widget', 'MicRight', '24px', '24px');
  //   }
  // }

  function insertRegularUIExt() {
    var html = '<div class="waHeader"> <b>Web Assist</b><div id="waMinimizeContainer"> <div id="waMinimize"><div></div></div></div></div><div class="waMicSpeechContainer"> <img alt="start recognition" id="waRedMicSpeechDisplay" style="width:28;height28;" src="' + chrome.runtime.getURL("microphone-28-green.png") + '"><img alt="stop recognition" id="waGreenMicSpeechDisplay" style="width:28px;height28px;"  src="' + chrome.runtime.getURL("microphone-28-red.png") + '"><div id="waStatus" style=""></div></div> <div id="waCommands" > Say "help" to learn more about Web Assist</div>';

    addDiv(document.documentElement, speechContainerID, html, '', '');

    if (options.showPageMic) {
      addImage(document.documentElement, 'RedMicPage', chrome.runtime.getURL("microphone-28-red.png"), 'start recognition', 'MicRight', '28px', '28px');
      addImage(document.documentElement, 'GreenMicPage', chrome.runtime.getURL("microphone-28-green.png"), 'display widget', 'MicRight', '28px', '28px');
    }
  }

  function initializeHelp(path) {
    fetch(path)
      .then(function (response) {
        if (response.status !== 200) {
          if (options.onError) options.onError('error');
          console.log("HTTP-Error: " + response.status);
          return;
        } else {
          return response.text();
        }
      })
      .then(function (result) {

        insertHelp(result);
        me.hideLabels();

        if (options.elementClicked) options.elementClicked(100);

      });
  }

  function insertHelp(htm) {
    var classes = ["sidePanel"],
      helpPanel = document.getElementById(helpID);

    panel = new waPanel(helpID);
    if (!helpPanel) {
      addDiv(document.documentElement || document.documentElement, helpID, htm, classes, "-1");
      helpPanel = document.getElementById(helpID);
    } else {
      helpPanel.innerHTML = htm;
    }

    panel.show();
    me.setCommandText(helpCloseMessage);
    initializeHelpEvents(helpPanel);

    // setTimeout(() => {
    //   link = document.getElementById('#navigationHeader');
    //   link.focus();
    // }, 2000);
  }

async function initializeHelpEvents(parent) {
    addAnchorEvents(parent);
    document.addEventListener("click",
      function (event) {
        // If user either clicks X button OR clicks outside the modal window, then close modal by calling closeModal()
        if (!event.target.closest("#helpPanel") && !event.target.closest(" #" + speechContainerID) && event.target.id.toLowerCase().indexOf('micpage') === -1) {
          if (me.helpOpen) me.closeHelp();
        }
      },
      false
    );
  }

async function addAnchorEvents(helpPanel) {
    var links = helpPanel.querySelectorAll('button'),
      elem = null;

    links.forEach(function (link) {
      link.addEventListener('click', function (e) {
        elem = document.getElementById(link.id.substr(1));
        elem.scrollIntoView({
          behavior: "smooth"
        });
        helpPanel.click();
        wcf.fireEvent(helpPanel, 'focus');
      });
    });
  }

  me.openNotes = function () {
    activeElement = getActiveElement();
    initializeNotes(options.notesPath);
  };

  function initializeNotes(path) {
    fetch(path)
      .then(function (response) {
        if (response.status !== 200) {
          if (options.onError) options.onError('error');
          console.log("HTTP-Error: " + response.status);
          return;
        } else {
          return response.text();
        }
      })
      .then(function (result) {
        insertNotes(result);
        me.notesOpen = true;
       if (options.elementClicked) options.elementClicked(100);
      });
  }

  function insertNotes(htm) {
    var notesPanel = document.getElementById(notesID);

    panel = new waPanel(notesID);
    if (!notesPanel) {
      addDiv(document.documentElement, notesID, htm, ['notesContainer'], "-1");
      notesPanel = document.getElementById(notesID);
    } else {
      notesPanel.innerHTML = htm;
    }
    panel.show();
    var elNote = document.getElementById(notesID);
    if (window.innerHeight <  590) {
      elNote.style.height = (window.innerHeight - 30) + 'px';
    } else {
      elNote.style.height = '580px';

    }
   elNote.style.border = 'none';
    initializeNoteEvents();

    setTimeout(() => {
     
      setTimeout(() => {
        me.setCommandText(notesCloseMessage);
        document.getElementById('notes').focus();
      }, 1000);
    }, 100);
  }

 async function initializeNoteEvents(parent) {
    var closeNotes = document.getElementById('closeNotes');

    closeNotes.addEventListener("click",
      function (event) {
        me.closeNotes();
      },
      false
    );

    document.addEventListener("click",
      function (event) {
        // If user either clicks X button OR clicks outside the modal window, then close modal by calling closeModal()
          if (!event.target.closest("#notesContainer") && !event.target.closest(" #" + speechContainerID) && event.target.id.toLowerCase().indexOf('micpage') === -1) {
            if (me.notesOpen) me.closeNotes();
          }
          
      },
      false
    );
  }

  me.closeNotes = function () {
    me.notesOpen = false;
   if (document.activeElement) document.activeElement.blur();
    if (panel && panel.open) panel.hide();

    if (activeElement) {
      activeElement.focus();
    } else {
      document.body.focus();
    }
    activeElement = null;
    options.elementClicked(300);
    me.setCommandText(options.defaultCommandText);
  };

  function addDiv(parent, id, html, clsList, tabIndex) {
    var div = document.createElement("DIV");

    div.id = id;
    div.innerHTML = html;
    if (clsList) clsList.forEach(function (cls) {
      div.classList.add(cls);
    });
    if (tabIndex) div.tabIndex = tabIndex;
    parent.appendChild(div);
  }

  function addImage(parent, id, path, alt, className, width, height) {
    var img = document.createElement("img");

    img.style.width = width;
    img.style.height = height;
    img.id = id;
    img.className = className;
    img.src = path;
    img.alt = alt;
    parent.appendChild(img);
  }

 async function initializeVariables() {
    elSpeechContainer = document.getElementById(speechContainerID);
    elWebStatus = elSpeechContainer.querySelector('#waStatus');
    elStopRecognition = elSpeechContainer.querySelector('#waRedMicSpeechDisplay');
    elStartRecognition = elSpeechContainer.querySelector('#waGreenMicSpeechDisplay');
    elCommandText = elSpeechContainer.querySelector('#waCommands');
    elMinimizeContainer = elSpeechContainer.querySelector('#waMinimizeContainer');
    // if (me.isMobile) positionStatus(elSpeechContainer, elWebStatus);
    if (options.showPageMic) {
      startSpeechDisplay = document.getElementById('RedMicPage');
      showSpeechDisplay = document.getElementById('GreenMicPage');
    }
  }

  // function positionStatus(elSpeechContainer, status) {
  //   status.style.top = -22 + 'px';
  //   status.style.left = '0px';
  // }

  var activeElement = null;

async function initializeEvents() {
    elStopRecognition.onclick = function () {
      me.stopRecognition('Stopped', '');
      setTimeout(() => {
        if (activeElement && isVisible(activeElement)) {
          activeElement.focus();
          activeElement = null;
        }
      }, 300);
    };

    elStartRecognition.onclick = function () {
      this.disabled = true;
      document.body.focus();
      me.startRecognition();
      me.showLabels();
      setTimeout(() => {
        if (activeElement && isVisible(activeElement)) {
          activeElement.focus();
          activeElement = null;
        }
      }, 300);
      
      this.disabled = true;
    };

    if (options.showPageMic) {
      startSpeechDisplay.onmousedown = function () {
       activeElement = getActiveElement();
      };

      showSpeechDisplay.onmousedown = function () {
        activeElement = getActiveElement();
      };
      
      startSpeechDisplay.onclick = function () {
        me.minimized = false;
        document.body.focus();
        me.startRecognition();
        me.showLabels();
        setTimeout(() => {
          if (activeElement && isVisible(activeElement)) {
            activeElement.focus();
            activeElement = null;
          }
        }, 300);
      };

      showSpeechDisplay.onclick = function () {
        me.showSpeechContainer();
        setTimeout(() => {
          if (activeElement && isVisible(activeElement)) {
            activeElement.focus();
            activeElement = null;
          }
        }, 300);
      };
    }

    elMinimizeContainer.onclick = function () {
      me.minimizeSpeechContainer();
      setTimeout(() => {
        if (activeElement && isVisible(activeElement)) {
          activeElement.focus();
          activeElement = null;
        }
      }, 300);
    };

    elSpeechContainer.onmousedown = function () {
      activeElement = getActiveElement();
    };

    function isVisible(el) {
      try {
        var rect = el.getBoundingClientRect(),
          minTop = el.nodeName === 'VIDEO' ? -100 : -5;

        return rect.top >= minTop &&
          rect.bottom - rect.height <= window.innerHeight - 5;

      } catch (e) {
        console.log('Active visible error');
        return false;
      }
    }

  }



  me.moveContainerLeft = function () {
    var el = document.getElementById('RedMicPage');

    el.classList.remove("MicRight");
    el.classList.remove("MicLeft");
    el.classList.add("MicLeft");
    el = document.getElementById('GreenMicPage');
    el.classList.remove("MicRight");
    el.classList.remove("MicLeft");
    el.classList.add("MicLeft");
    el = document.getElementById(speechContainerID);
    el.classList.remove("webContainerRight");
    el.classList.remove("webContainerLeft");
    el.classList.add("webContainerLeft");

  };

  me.moveContainerRight = function () {
    var el = document.getElementById('RedMicPage');

    el.classList.remove("MicRight");
    el.classList.remove("MicLeft");
    el.classList.add("MicRight");
    el = document.getElementById('GreenMicPage');
    el.classList.remove("MicRight");
    el.classList.remove("MicLeft");
    el.classList.add("MicRight");
    el = document.getElementById(speechContainerID);
    el.classList.remove("webContainerRight");
    el.classList.remove("webContainerLeft");
    el.classList.add("webContainerRight");
  };

  me.hideUI = function (hideWidget) {
    try {
      var elems = null,
        documents = webAssistObj.getDocuments();

     // altContainer = altContainer ? altContainer : document.getElementById('WebAssistRoot');
      altContainer = document.getElementById('WebAssistRoot');

      if (altContainer) {
        altContainer = altContainer.childNodes[0];
        altContainer.replaceChildren();

        documents.forEach(function (doc) {
          elems = doc instanceof ShadowRoot ? getShadowElems(doc, '[alttext]') : doc.querySelectorAll('[alttext]');
          for (var i = 0, len = elems.length; i < len; i++) {
            elems[i].removeAttribute('alttext');
            if (elems[i].getAttribute('wascrolllabel') === 'true') elems[i].removeAttribute('wascrolllabel');
            if (elems[i].id && elems[i].id.indexOf('wass') === 0) elems[i].id = '';

          }
        });
      }

      if (typeof hideWidget !== 'object' && hideWidget && showSpeechDisplay) {
        startSpeechDisplay.style.display = 'none';
        showSpeechDisplay.style.display = 'none';
        elSpeechContainer.style.display = 'none';
      }

    } catch (error) {
      console.log(error.message);
    }
  };

  me.hideLabels = function () {
    me.hideUI(false);
  };

  me.showLabels = function () {
    options.showLabels();
  };

  function getShadowElems(root, selector) {
    var childNodes = Array.from(root.childNodes),
      elemArray = [];

    childNodes.forEach(childNode => {
      if (childNode.nodeType === 1) elemArray.push(childNode);

      if (childNode.querySelectorAll) elemArray.push.apply(elemArray, Array.from(childNode.querySelectorAll(selector)));
    });

    return elemArray;
  }

  me.minimizeSpeechContainer = function () {
    if (!options.showPageMic) return;
    elSpeechContainer.style.display = 'none';
    if (elStartRecognition.style.display === 'none') {
      startSpeechDisplay.style.display = 'none';
      showSpeechDisplay.setAttribute('style', 'display:inline-block !important;');
      if (options.elementClicked) options.elementClicked(1);
    } else {
      showSpeechDisplay.style.display = 'none';
      startSpeechDisplay.setAttribute('style', 'display:inline-block !important;');

    }
    me.minimized = true;
  };

  me.closeWeb = function () {
    try {
      if (me.soundEffects) {
        let attention = new Audio(chrome.runtime.getURL('bubble-sound-effect.wav'));
        attention.play().catch(function (err) { });

      }
    } catch (error) { }

    me.stopRecognition("Stopped", '');
    me.minimizeSpeechContainer();
    elSpeechContainer.style.display = 'none';
  };

  me.stopRecognition = function (status, msg) {
    try {

      if (!me.enabled) return;
      me.enabled = false;

      elStartRecognition.style.visibility = 'hidden';
      elStartRecognition.style.display = 'inline-block';
      elStopRecognition.style.display = 'none';
      elStartRecognition.style.visibility = 'visible';

      if (me.minimized) {
        showSpeechDisplay.style.display = 'none';
        startSpeechDisplay.setAttribute('style', 'display:inline-block !important;');
      }
      webAssistObj.stop();
      // status = (!status && !me.isMobile) ? 'Stopped' : status;
      status = (!status) ? 'Stopped' : status;

      me.setStatus(status);
      // if (!me.isMobile) {
      //   me.setStatus(status);
      // } else {
      //   me.setStatus('');
      // }

      setTimeout(() => {
        if (me.wakeUpEnabled &&  options.speechDetect && msg !== 'Window') options.speechDetect.start();
        me.enabled = true;
      }, 300);

    } catch (e) {
      if (options.onError) options.onError('error');
      console.log(e.message);
    }
  };

  me.showSpeechContainer = function () {
    me.minimized = false;
    if (options.showPageMic) {
      showSpeechDisplay.style.display = 'none';
      startSpeechDisplay.style.display = 'none';
    }
    elSpeechContainer.style.display = 'inline-block';
  };

  me.setStatus = function (msg) {
    //if (me.isMobile) elWebStatus.style.display = msg ? "inline-block" : 'none';
    elWebStatus.innerHTML = msg;
  };

  me.getStatus = function () {
    return elWebStatus.innerHTML;
  };

  me.setCommandText = function (text) {
    elCommandText.innerHTML = text;
  };

  me.getCommandText = function () {
    return elCommandText.innerHTML;
  };

  me.startRecognition = function () {
    try {
      if (!me.enabled) return;
      // if (window.location.href.indexOf('https') === -1) {
      //   me.setCommandText('Page not secure');
      //   return;
      // }
      me.enabled = false;

      elStopRecognition.style.visibility = 'hidden';
      elStopRecognition.style.display = 'inline-block';
      elStartRecognition.style.display = 'none';
      elStopRecognition.style.visibility = 'visible';
      me.setCommandText(options.defaultCommandText);
      me.setStatus('Starting..');

      if (options.speechDetect && options.speechDetect.detectorOn) options.speechDetect.stop();
      if (options.showPageMic) startSpeechDisplay.style.display = 'none';
      if (!me.minimized) {
        elSpeechContainer.style.display = 'inline-block';
      } else {
        showSpeechDisplay.style.display = 'inline-block';
      }

      //   if (!me.isMobile) {
      //   //  setTimeout(() => {

      //  //   }, 100);

      //   } else {
      //   //  elWebStatus.style.display = 'none';
      //   }

      webAssistObj.start();

      setTimeout(() => {
        me.setStatus('Listening');
      }, 100);

      me.enabled = true;
    } catch (e) {
      if (options.onError) options.onError('error');
      console.log(e.message);
    }
  };

  me.openHelp = function () {
    me.helpOpen = true;
    initializeHelp(options.helpPath);
  };

  me.openDeveloperHelp = function () {
    initializeHelp(options.developerPath);
    me.hideLabels();
  };

  me.closeHelp = function () {
    me.helpOpen = false;

    if (panel && panel.open) panel.hide();
    document.body.focus();
    me.setCommandText(options.defaultCommandText);
  };

  me.isOnline = function () {
    if (!window.navigator.onLine) {
      me.setCommandText('Check your internet connection');
      return false;
    }
    return true;
  };

  function getFullPath(path) {
    var scripts = document.getElementsByTagName("script"),
      location = scripts[scripts.length - 1].src,
      lastIndex = location.lastIndexOf('/'),
      currentPosition = 0,
      position = 0;

    do {
      currentPosition = location.indexOf('/', currentPosition + 1);
      if (currentPosition !== lastIndex) position = currentPosition;
    }
    while (currentPosition < lastIndex);

    return location.substring(0, position + 1) + path;
  }

  function loadCSS(path) {
    var style = document.createElement('link');

    path = path ? path : getFullPath('css/webassistui.css');
    style.href = path;
    style.rel = 'stylesheet';
    document.head.appendChild(style);
  }

  var doit = null,
    currentWidth = 0,
    currentHeight = 0;

  window.addEventListener('resize', async function (e) {
    try {
      if (e.target.innerWidth !== currentWidth || e.target.innerHeight !== currentHeight) {
        clearTimeout(doit);
        if (e.target.innerWidth > 600) {
          var status = me.getStatus();
          me.isMobile = false;
          doit = setTimeout(function () {
            resetUI();
            if (status === 'Listening' || status === 'Match') me.startRecognition();
          }, 100);
        } else if (e.target.innerWidth <= 600) {
          me.isMobile = true;
          doit = setTimeout(resetUI, 100);
        }
      }
      currentWidth = e.target.innerWidth;
      currentHeight = e.target.innerHeight;
    } catch (error) {
      if (options.onError) options.onError('error');
    }

  });

 
  function getActiveElement() {
    var doc = null,
      documents = webAssistObj.getDocuments(),
      actElement = null;

    for (let index = 0; index < documents.length; index++) {
      try {
        doc = documents[index];
        if (doc.activeElement && doc.activeElement.nodeName !== "BODY") {
          if (doc.activeElement.ownerDocument) {
            actElement = doc.activeElement;
          } else {
            if (doc.activeElement.nodeName === "IFRAME") {
              actElement = doc.activeElement;
            } else {
              actElement = doc.activeElement;
            }
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    if (!actElement) {
      actElement = document.body;
      window.focus();
    }

    return actElement;
  }

  initialize();
  window.WebAssistUI = me;
};

// function isInShadow(node) {F
//   if (node.nodeType === 1) {
//     var el = node.getRootNode();
//     if (el instanceof ShadowRoot) {
//       return el;F
//     } else if (node.shadowRoot) {
//       return node;
//     } else {
//       return null;
//     }
//   }
// }

// import modalWindow from "./modalWindow";

var mediaRecorder = function () {
    // Convert the audio data chunks to a single audio data blob.
    let me = this,
        wcf = new waCommandFunctions(),
        frameCover = null;
       // cameraPosition = 'user',\

    me.recording = false;
    me.options = null;
    me.playing = false;
    me.recorderOpen = false;
    me.recorderType = '';
    me.error = false;

    me.quality = function (data) {
        if (window.location.href.indexOf('facebook.com') > -1) {
            me.options.sendCommandMessage('Recording is not allowed here');
            return true;
        }
        data.transcript = removePunctuation(data.transcript.toLowerCase());
        var quality = getWildCardText(data);

        data.transcript = data.transcript.toLowerCase();
        postMessage('quality', { quality: quality });
    };

    // me.cameraPosition = function () {
    //     var html = geCameraPositionHTML();
    //     dialog = new modalWindow();
    //     //div style="width:200px;height:200px">This is a dialog</div>'
    //     dialog.show(html, "Camera Position", '280px', true, setCameraPosition);

    //     function geCameraPositionHTML() {
    //         return '<div><div><input type="radio" id="front" checked="true" name="camera" value="user"><label style="margin-left:15px;margin-top:5px" for="front">Front Camera</label><br></div><div style="margin-top:10px"><input type="radio" id="back" name="camera" value="environment"><label style="margin-left:15px" for="back">Back Camera</label><br></div></div>'
    //     }

    //     function setCameraPosition() {
    //         var front = document.getElementById('front');
    //         if (front.checked) {
    //             cameraPosition = 'user';
    //         } else {
    //             cameraPosition = 'environment';
    //         }
    //     }
    // };

    me.startRecorder = function () {
        if (window.location.href.indexOf('facebook.com') > -1) {
            me.options.sendCommandMessage('Recording is not allowed here');
            return true;
        }
      
        postMessage('startRecording');
        initializeRecorder();
        setFrameCoordinates('0px', 'auto', '450px', '65px');
         var frame = document.getElementById('speechFrame'),
        frameStyle = frame.style;
        setFrameCover(frameStyle.width, frameStyle.height);
        me.recording = true;
        me.recorderType = 'audio';
        me.recorderOpen = true;
        setTimeout(() => {
            if (!me.error) me.options.sendCommandMessage('Say "stop" to stop recording.');
        }, 1000);
    };

   async function setFrameCover(width, height) {
       
        frameCover = document.getElementById('waFrameCover');
        frameCover.style.width = width;
        frameCover.style.height = height;
        frameCover.style.display = 'block';
    }

    function initializeRecorder() {
        frameCover = null;
        // cameraPosition = 'user';
        me.recording = false;
        me.playing = false;
        me.error = false;
       // if (me.recorderType = 'video') me.closeVideo();
    }

    // me.recordVideo = function () {
    //     if (window.location.href.indexOf('facebook.com') > -1) {
    //         me.options.sendCommandMessage('Recording is not allowed here');
    //         return true;
    //     }

    //     setFrameCoordinates('auto', '0px', window.innerWidth + 'px', window.innerHeight + 'px');
    //     postMessage('recordVideo');
    //     initializeRecorder();
    //     setFrameCover('450px', '65px');
    //     me.recording = true;
    //     me.recorderType = 'video';
    //     me.recorderOpen = true;
    //     setTimeout(() => {
    //         me.options.elementClicked(1);
    //         if (!me.error) me.options.sendCommandMessage('Say "stop" to stop recording.');
    //     }, 1250);
    // };

    // me.recordMix = function () {
    //     if (window.location.href.indexOf('facebook.com') > -1) {
    //         me.options.sendCommandMessage('Recording is not allowed here');
    //         return true;
    //     }

    //     setFrameCoordinates('auto', '0px', window.innerWidth + 'px', window.innerHeight + 'px');
    //     postMessage('recordMix');
    //     initializeRecorder();
    //     setFrameCover('450px', '65px');
    //     me.recording = true;
    //     me.recorderType = 'video';
    //     me.recorderOpen = true;
    //     setTimeout(() => {
    //         if (!me.error) me.options.sendCommandMessage('Say "stop" to stop recording.');
    //     }, 1250);
    // };

    // me.recordTab = function () {
    //     // Capture audio from the current tab using getUserMedia
    //     try {
    //         var frameStyle = document.getElementById('speechFrame').style;
    //         frameStyle.width = '450px';

    //         frameStyle.height = '65px';
    //         frameCover = document.getElementById('waFrameCover');
    //         frameCover.style.width = frameStyle.width;
    //         frameCover.style.height = frameStyle.height;
    //         frameCover.style.display = 'block';
    //         postMessage('recordTab');
    //         me.recording = true;
    //         setTimeout(() => {
    //             me.options.sendCommandMessage('Say "stop" to stop recording.');
    //         }, 1000);


    //     } catch (e) {
    //         data = JSON.stringify({ type: "error", message: "" });
    //         window.postMessage(data, parentHost);
    //         console.log("Media audio  error " + e.message);
    //     }
    // };

    me.stopRecorder = function () {
        if (me.recording) {
            postMessage('stopRecording');
            me.recording = false;
            setFrameCoordinates('0px', 'auto', '450px', '65px');
            setTimeout(() => {
                if (!me.error) me.options.sendCommandMessage('Say "play recording" or "download recording"');
            }, 1500);
            setTimeout(() => {
                document.body.tabIndex = 0;
                document.body.focus();
            }, 1250);
      
        } else {
            return true;
        }
    };

    me.downloadRecording = function () {
       if (!me.recorderOpen) return true;
        postMessage('downloadRecording');
        setTimeout(() => {
            if (!me.error) me.options.sendCommandMessage('Say "play recording" to start play.');
        }, 1500);
    };

    me.playRecording = function () {
        if (!me.recorderOpen) return true;
        // if (me.recorderType === 'video') {
        //     setFrameCoordinates('auto', '0px', window.innerWidth + 'px', window.innerHeight + 'px');
        // }
        postMessage('playRecording');
        me.playing = true;
        setTimeout(() => {
            if (!me.error) me.options.sendCommandMessage('Say "pause" or "stop playing"');
        }, 1000);
    };

    me.pausePlaying = function () {
        if (!me.playing) return true;
        setTimeout(() => {
            me.options.sendCommandMessage('Say "play recording" to continue');
        }, 1500);
        postMessage('pause');
    };

    me.stopPlaying = function () {

        if (!me.playing) return true;
        setTimeout(() => {
            me.options.sendCommandMessage('Say "play recording" to continue');
        }, 1500);
        postMessage('stop playing');
    };

    function setFrameCoordinates(bottom, top, width, height) {
        var frame = document.getElementById('speechFrame'),
            frameStyle = frame.style;

        frameStyle.bottom = bottom;
        frameStyle.top = top;
        frameStyle.width = width;
        frameStyle.height = height;
    }

    // me.openVideo = function () {
    //    if (me.recorderType !== 'video') return true;
    //     setTimeout(() => {
    //       if (!me.error) me.options.sendCommandMessage('Say "close video" to close this window.');
    //     }, 1250);
    //     setFrameCoordinates('auto', '0px', window.innerWidth + 'px', window.innerHeight + 'px');

    //     postMessage('openVideo');
        
    // };

    // me.closeVideo = function () {
    //     if (!me.error && me.recorderType === 'video') {
    //         if (!me.recording) {
    //             setTimeout(() => {
    //                 me.options.sendCommandMessage('Say "open video" to continue playback.');
    //             }, 1250);
    //         } else {
    //             setTimeout(() => {
    //                 me.options.sendCommandMessage('Say "open video" to continue watching.');
    //             }, 1250);
    //         }
    //     }
       
    //     if (dialog) dialog.hide();
    //     postMessage('closeVideo');
    //     setFrameCoordinates('0px', 'auto', '450px', '65px');
    // };

    me.hide = function () {
        if (!me.recorderOpen) return true;
        if (me.recording) me.recording = false;
        me.recorderType = '';
        setFrameCoordinates('0px', 'auto', '0px', '0px');
        document.getElementById('waFrameCover').style.display = 'none';
        setTimeout(() => {
            me.options.sendCommandMessage('Say "open help" to learn more.');
        }, 1250);
        me.recorderOpen = false;
        postMessage('hideAudio');
    };

    function getWildCardText(data) {
        var commandText = checkForNumbers(data.commandText.replace('*', ''), data.commandText.split(' ')),
            transcript = checkForNumbers(data.transcript, data.transcript.split(' ')),
            start = transcript.indexOf(commandText) + commandText.length;

        return transcript.substring(start).trim().toLowerCase();
    }

    function checkForNumbers(text, words) {
        var number = 0,
            len = words.length;

        text = text.trim();
        for (var i = 0; i < len; i++) {
            number = wcf.getIntegerFromWords(words[i]);
            if (number) {
                text = text.replace(words[i], number);
                break;
            }
        }
        return text;
    }

    function removePunctuation(text) {
        text = text.replace('-', '');
        return text.replace(/[?!.,]/g, '');
    }

    function postMessage(action, params) {
        var frame = document.getElementById("speechFrame"),
            url = frame.src;
        frame.contentWindow.postMessage(
            JSON.stringify({ action: action, host: window.location.href, options: me.options, params: params }),
            url
        );
    }

    window.addEventListener("message", async function (message) {
        if (!isJsonString(message.data)) return;

        var data = JSON.parse(message.data);

        if (!data || !data.type) return;

        if (data.type === "mediaEnded") {
            me.playing = false;
            me.options.sendCommandMessage('Say "play recording" to listen again.');
        } else if (data.type === 'mediaPlaying') {

            me.playing = true;
            setTimeout(() => {
                me.options.sendCommandMessage('Say "pause" or "stop playing"');
            }, 1000);
        } else if (data.type === 'audioDisabled') {
            document.body.addEventListener('click', startRecorder);
            window.addEventListener('keydown', startRecorder);
        } else if (data.type === "playStopped") {
            me.options.sendCommandMessage('Say "play recording" or "download recording."');
            me.playing = false;
        } else if (data.type === 'error') {
            setTimeout(() => {
                me.options.onError(data.message);
            }, 1000);
            me.error = true;
        }
        else if (data.type === 'commandMessage') {
            setTimeout(() => {
                me.options.sendCommandMessage(data.message);
            }, 1000);
            me.error = true;
        }

      ///  else if (data.type === "dialogClosed") {
            //     me.playing = false;
            //     document.body.tabIndex = 0;
            //     document.body.focus();
            //   if(me.recording) {
            //     me.options.sendCommandMessage('Say "stop" to stop recording"');
            //   } else if(me.recorderType === 'video') {
            //     me.options.sendCommandMessage('Say "play recording" or "download recording"');
            //   } 
         //   }
    });

    function startRecorder() {
        me.playRecording();
        document.body.removeEventListener('click', startRecorder);
        window.removeEventListener('keydown', startRecorder);
    }

    function isJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

};

(function (window, document) {
  var isExtension = true,
    autostart = true,
    wa = null,
    webUI = null,
    helpMessage = 'Say "open help" to learn more.',
    //if language not english false
    usePhonemes = false,
    useStemmer = false,
    recognitionStart = false,
    isMobile = window.innerWidth <= 600,
    interimResults = false,
    labelsHidden = false,
    speechDetect = null,
    enableWakeup = false,
    microphone = true,
    currentURL = window.location.href,
    timeout = 30,
    language = "en-US",
    wakeReminder = "Say any word to start recognition",
    //Interval to wait before updating commands after a speech command click
    clickUpdateInterval = 2000,
    //Interval to wait before updating commands after the extension script is loaded
    initializeCommandInterval = 500,
    //Interval to wait before updating commands after a manual click
    documentClickInterval = 2500,
    commandsUpdating = false,
    scrolling = false,
    altContainer = null,
    documentClicked = false,
    heightChanging = false,
    stopStatus = "Stopped",
    listeningStatus = "Listening",
    redMicPage = null,
    extensionHidden = false,
    soundEffects = false,
    microphoneEnabled = false,
    frameAllowed = checkAllowFrame(),
    recorder = null,
    options = null,
    activeElement = null,
    identity = null;

  if (extensionUninstalled()) return;
  if (currentURL.indexOf("web-assist") > -1) return;
  if (
    currentURL.indexOf("docs.google.com/document/d/") > -1 ||
    currentURL.indexOf("onedrive.live.com/edit") > -1
  )
    return;

  if (
    document.title &&
    document.title.toLowerCase().indexOf("extensionpay") > -1
  )
    return;

  if (!document.hidden) {
    emulateUserInteraction(document.documentElement);
  }

  function createMicFrame(url) {
    var frame = document.createElement("iframe"),
      internalUrl = chrome.runtime.getURL(url),
      frameStyle = frame.style;

    frame.src = internalUrl;
    frame.setAttribute(
      "allow",
      "autoplay; microphone; camera; display-capture"
    );
    frame.id = "speechFrame";
    frameStyle.zIndex = 9999999999;
    frameStyle.position = "fixed";
    frameStyle.bottom = 0;
    frameStyle.left = 0;
    frameStyle.width = "0px";
    frameStyle.height = "0px";
    frameStyle.border = "none";
    addFrameEvent(frame);

    document.body.appendChild(frame);
    addCover(frameStyle);
  }

  async function addCover(frameStyle) {
    var cover = document.createElement("div"),
      coverStyle = cover.style;

    cover.zIndex = 2;
    cover.id = "waFrameCover";
    coverStyle.bottom = frameStyle.bottom;
    coverStyle.left = frameStyle.left;
    coverStyle.position = "fixed";
    coverStyle.display = "none";
    coverStyle.background = "transparent";
    document.body.appendChild(cover);
    addCoverEvent(cover);
  }

  function addFrameEvent(frame) {
    frame.onload = function () {
      initializeApp(true);
    };
  }

  async function addCoverEvent(cover) {
    cover.onclick = async function () {
      if (webUI) {
        webUI.setCommandText("Use commands or keyboard to use recorder");
        webUI.showSpeechContainer();
      }
    };
  }

  function initialize(isExtension) {
    var webRoot = null;
    try {
      if (frameAllowed) recorder = new mediaRecorder();
      webRoot = createWebAssistRoot();
      if (!webRoot) {
        return;
      }

      //Initialize a new WebAssist object and set options if this is an extension
      if (!isExtension) {
        initializeApp(isExtension);
      }
      getPaidStatus();
    } catch (error) {
      console.log("Initialize error " + error.message);
      onError("error");
    }
  }

  var initTime =
    window.location.href.indexOf("chatgpt.com") > -1 ||
    window.location.href.indexOf("shopify.com") > -1
      ? 5000
      : 0;
  setTimeout(() => {
    if (frameAllowed) {
      setSavedOptions(true);
      createMicFrame("speechFrame.html");
      initialize(isExtension);
    } else {
      setSavedOptions(false);
      initialize(isExtension);
    }
  }, initTime);

  checkMicrophone();

  function checkAllowFrame() {
    return currentURL.indexOf("facebook.com") === -1;
  }

  async function addWindowEvents() {
    addFocusEvents(window);
    window.addEventListener("pageshow", function (e) {
      if (extensionHidden || extensionUninstalled()) return;
      if (e.persisted && recognitionStart) webUI.stopRecognition();
    });

    window.addEventListener("popstate", function (e) {
      if (extensionHidden || extensionUninstalled()) return;
      updateCommands(clickUpdateInterval, true);
    });
  }

  // async function addIframeEvents() {
  //   document.querySelectorAll("iframe").forEach((frame) => {
  //     try {
  //       if (
  //         frame.contentWindow.document &&
  //         frame.src.indexOf("robots.txt") === -1
  //       ) {
  //        addFocusEvents(frame.contentWindow.document);
  //       } else {
  //         if (currentURL.indexOf("secure5.store.apple.com") > -1) {
  //           return;
  //         }
  //       }
  //     } catch (e) {
  //       if (currentURL.indexOf("secure5.store.apple.com") > -1) {
  //         return;
  //       }
  //     }
  //   });
  // }

  async function addVideoEvents() {
    document.addEventListener("fullscreenerror", function (event) {
      handleScreenError();
    });

    function handleScreenError() {
      onError("screen");
    }
  }
  async function addFocusEvents(win) {
    win.addEventListener("focus", function (e) {
      if (extensionHidden || extensionUninstalled()) return;
      getPaidStatus();

      if (document.activeElement.id === "speechFrame") {
        document.activeElement.blur();
        document.body.focus();
        return;
      }

      setTimeout(() => {
        tabFocus(true);
      }, 410);
    });

    win.addEventListener("blur", function (e) {
      if (extensionHidden || extensionUninstalled()) return;
      var inIframe = isActiveElementInIframe();
      if (!inIframe || recorder.recorderOpen) {
        setTimeout(async () => {
          if (microphoneEnabled && enableWakeup && document.hidden) {
            location.reload();
          }
        }, 200);
        tabFocus(false);
        setTimeout(() => {
          if (!document.hidden) {
            identity = document.querySelector(`[id^="googleidentityservice"]`);
            if (identity) {
              activeElement = getActiveElement();
              document.documentElement.click();
              activeElement.focus();
            }
          }
        }, 500);
      } else {
        setTimeout(() => {
          if (microphoneEnabled && enableWakeup && document.hidden) {
            location.reload();
          }
        }, 100);
        if (document.hidden) tabFocus(false);
      }
    });
  }

  function getActiveElement() {
    var doc = null,
      documents = wa.getDocuments(),
      actElement = null;

    for (let index = 0; index < documents.length; index++) {
      try {
        doc = documents[index];
        if (doc.activeElement && doc.activeElement.nodeName !== "BODY") {
          if (doc.activeElement.ownerDocument) {
            actElement = doc.activeElement;
          } else {
            if (doc.activeElement.nodeName === "IFRAME") {
              actElement = doc.activeElement;
            } else {
              actElement = doc.activeElement;
            }
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    if (!actElement) {
      actElement = document.body;
      window.focus();
    }

    return actElement;
  }

  function isActiveElementInIframe() {
    // Get the active element
    const activeElement = document.activeElement;

    // If the active element is within an iframe
    try {
      return (
        (activeElement && activeElement.tagName === "IFRAME") ||
        window.top.document !== activeElement.ownerDocument
      );
    } catch (e) {
      // Catch cross-origin errors (if any)
      return true; // Assume it is in an iframe if there is a cross-origin error
    }
  }

  //Detects when microphone permission has been first granted and displays a message.
  async function addPermissionDetector() {
    navigator.permissions
      .query({ name: "microphone" })
      .then(async function (permissionStatus) {
        permissionStatus.onchange = async function () {
          if (this.state === "granted") {
            microphone = true;
            microphoneEnabled = true;
            if (enableWakeup) {
              if (!recognitionStart && !autostart) webUI.stopRecognition();
              webUI.setCommandText("This page will be reloaded when inactive.");
              webUI.showSpeechContainer();
              if (soundEffects) {
                let attention = new Audio(
                  chrome.runtime.getURL("bubble-sound-effect.wav")
                );
                attention.play().catch(function (err) {
                  onError("screen");
                });
              }
            }
          }
        };
      });
  }

  function createWebAssistRoot() {
    //This is the html for the shadowroot that contains all of the alternate labels
    /* <div id="WebAssistRoot">
    
      <div>
        <div class="label" style="height: 40px; left: 16px; top: 299px; width: 40px;">
          <span>1</span>
          <div>
          </div>
        </div>
      
    </div>f
  </div> */
    //  var styleHTML = ".waAltText div{width:100%;height:100%;opacity:.1}div{text-align:left}.waAltText{position:absolute;z-index:999999999999}.waAltText span,.waAltText label{margin:-1em;position:absolute;color:black;z-index:1;text-align:center;font-weight:bold;line-height:normal;background-image:linear-gradient(#fff 0%,#f9f9f9 100%);font-family:sans-serif;padding-top:1px;padding-right:1px;font-size:14px;max-width:28px}",

    var styleHTML =
        ".waAltText div{opacity:.1;text-align:left;}.waAltText{overflow-wrap:normal;position:absolute;z-index:9999999999}.waAltText span,.waAltText label{margin:0px;position:absolute;color:black;z-index:1;text-align:center;font-weight:bold;line-height:normal;background-image:linear-gradient(#fff 0%,#f9f9f9 100%);font-family:sans-serif;padding-top:1px;padding-right:1px;font-size:14px;max-width:28px}",
      div = document.createElement("div"),
      parentElem = getParentElement(),
      style = document.createElement("style");

    div.id = "WebAssistRoot";
    div.style.overflowX = "hidden";
    div.style.zIndex = 999999999999;
    div.style.maxWidth = window.innerWidth + "px";

    altContainer = document.createElement("div");
    altContainer.id = "waAltContainer";
    altContainer.style.overflowX = "hidden";
    div.appendChild(altContainer);
    style.innerHTML = styleHTML;
    div.appendChild(style);
    parentElem.appendChild(div);
    return document.getElementById("WebAssistRoot") ? div : null;
  }

  function initializeApp(isExtension) {
    var waitTime = enableWakeup && !autostart ? 250 : 0;
    //This is to get the microphone permission dialogue to display

    if (enableWakeup) {
      if (frameAllowed) {
        speechDetect = new speechDetectorFrame({
          callback: startRecognition,
        });
      } else {
        speechDetect = new speechDetector({
          callback: startRecognition,
        });
      }
    }

    if (enableWakeup && !autostart && microphone) {
      setTimeout(() => {
        speechDetect.start();
      }, 300);
    }

    wa = initializeWebAssist(isExtension);

    wa.frameAllowed = frameAllowed;
    //wa.testMode = true;
    //Checks to see if the browser is compatible

    if (!wa.compatible) return;

    //Initialize the UI object
    setTimeout(() => {
      webUI = initializeUI(wa);
      if (!window.isSecureContext) {
        onError("secure");
      }
      webUI.wakeUpEnabled = enableWakeup;
      initializeRecognition();
    }, waitTime);

    addPermissionDetector();
  }

  async function getPaidStatus() {
    if (extensionHidden || extensionUninstalled()) return;
    setTimeout(() => {
      chrome.runtime.sendMessage(
        {
          action: "isPaid",
        },
        function () {}
      );
    }, 300);
  }

  function initializeWebAssist(isExtension) {
    //Initializes and returns the WebAssist object
    options = {
      isExtension: isExtension,
      interimResults: interimResults,
      usePhonemes: usePhonemes,
      useStemmer: useStemmer,
      //  phonemeDictPath: chrome.runtime.getURL("phonemedicthomo.csv"),
      webSpeechTimeout: timeout,
      languageCode: language,
      initialized: initialized, //Events
      recognitionStarted: recognitionStarted,
      recognitionStopped: recognitionStopped,
      ontimeout: ontimeout,
      tabFocus: tabFocus,
      startRecognition: startRecognition,
      commandMatch: commandMatch,
      initializeCommands: initializeCommands,
      onError: onError,
      elementClicked: elementClicked,
      optionsSet: optionsSet,
      autoScroll: autoScroll,
      scrollDocument: scrollDocument,
      sendCommandMessage: sendCommandMessage,
      defaultCommandText: helpMessage,
      videoOn: videoOn,
      videoOff: videoOff,
      frameAllowed: frameAllowed,
      setStatus: setStatus,
    };
    if (frameAllowed) recorder.options = options;

    return new WebAssist(options);
  }

  function setSavedOptions(isExtension) {
    try {
      // Read settings using the storage API
      //  , 'language'
      //   chrome.storage.sync.clear(function() {
      //     if (chrome.runtime.lastError) {
      //         console.error(chrome.runtime.lastError);
      //     } else {
      //         console.log('All items cleared from chrome.storage');
      //     }
      // });

      chrome.storage.sync.get(
        ["autostart", "enableWakeup", "timeout", "paid"],
        function (value) {
          if (value.paid !== undefined && value.paid) {
            if (value.autostart !== undefined) {
              autostart = value.autostart;
            }
          } else {
            autostart = true;
          }

          if (value.enableWakeup !== undefined)
            enableWakeup = value.enableWakeup;
          if (value.timeout !== undefined) timeout = value.timeout;
          // if (value.language !== undefined) language = value.language;
          if (!autostart) labelsHidden = true;
          if (!frameAllowed) initializeApp(isExtension);
        }
      );
    } catch (error) {
      console.log("Storage " + error.message);
    }
  }

  function initializeUI(wa) {
    //Initializes and returns the webassistui object
    return new WebAssistUI(wa, {
      isExtension: true,
      elementClicked: elementClicked,
      defaultCommandText: helpMessage, //The text that is displayed when the app is started
      showPageMic: true, //Display microphone icon at the bottom right of the page
      isMobile: isMobile,
      loadCSS: false,
      speechDetect: speechDetect,
      showLabels: showLabels,
      notesPath: chrome.runtime.getURL("notes.html"),
      helpPath: chrome.runtime.getURL("help.min.html"),
      onError: onError,
    });
  }

  function startRecognition() {
    if (webUI) {
      if (!document.hidden) webUI.startRecognition();
    }
    showLabels();
  }

  //You can use this function to add your own commands
  async function addCustomCommands() {
    wa.addWebCommands([
      {
        commandText: "minimize web", //Hide the main UI and display the microphone icon
        commandFunction: webUI.minimizeSpeechContainer,
      },
      {
        commandText: "minimize", //Hide the main UI and display the microphone icon
        commandFunction: webUI.minimizeSpeechContainer,
        exactMatch: true,
        useWaitForFinal: true,
      },
      {
        commandText: "close web", //Hide the main UI and stop speech recognition
        commandFunction: webUI.closeWeb,
      },
      {
        commandText: "clothes web",
        commandFunction: webUI.closeWeb,
        alternateText: "close web",
        useWaitForFinal: true,
      },
      {
        commandText: "open web", //Display the main UI and hide the microphone icon
        commandFunction: webUI.showSpeechContainer,
      },
      {
        commandText: "left side",
        commandFunction: webUI.moveContainerLeft,
      },
      {
        commandText: "right side",
        commandFunction: webUI.moveContainerRight,
      },
      {
        commandText: "write side",
        commandFunction: webUI.moveContainerRight,
      },
      {
        commandText: "open help", //Display the help content in the side panel
        commandFunction: openHelp,
      },
      {
        commandText: "developer help", //Display the help content in the side panel
        commandFunction: webUI.openDeveloperHelp,
      },
      {
        commandText: "open notes", //Display the help content in the side panel
        commandFunction: openNotes,
      },
      {
        commandText: "close notes", //Close the side panel
        commandFunction: closeNotes,
      },
      {
        commandText: "clothes notes", //Hide the main UI and stop speech recognition
        commandFunction: closeNotes,
        alternateText: "close notes",
        exactMatch: true,
        useWaitForFinal: true,
      },
      {
        commandText: "close help", //Close the side panel
        commandFunction: closeHelp,
      },
      {
        commandText: "clothes help", //Close the side panel
        alternateText: "close help",
        exactMatch: true,
        commandFunction: closeHelp,
      },
      {
        commandText: "close", //Hide the main UI and stop speech recognition
        commandFunction: closeHelp,
        alternateText: "close help",
        exactMatch: true,
        useWaitForFinal: true,
      },
      {
        commandText: "hide labels",
        commandFunction: hideLabels,
      },
      {
        commandText: "display labels",
        commandFunction: showLabels,
        exactMatch: true,
        useWaitForFinal: true,
      },
      {
        commandText: "display all labels",
        commandFunction: showAllLabels,
        exactMatch: true,
        useWaitForFinal: true,
      },
      {
        commandText: "stop dictation",
        commandFunction: wa.stopDictation,
        exactMatch: true,
        useWaitForFinal: false,
      },
      {
        commandText: "start dictation",
        commandFunction: wa.startDictation,
        exactMatch: true,
        useWaitForFinal: true,
      },
      {
        commandText: "sound effects",
        commandFunction: addSoundEffects,
        exactMatch: true,
        useWaitForFinal: true,
      },
      {
        commandText: "no sound",
        commandFunction: noSoundEffects,
        exactMatch: true,
        useWaitForFinal: true,
      },
      {
        commandText: "quiet mode",
        commandFunction: quietMode,
        useWaitForFinal: true,
      },
      {
        commandText: "end quiet mode",
        commandFunction: endQuietMode,
        useWaitForFinal: true,
      },
    ]);

    if (frameAllowed) addRecorderCommands();
  }

  function isVideo() {
    var documents = wa.returnDocuments(),
      videoFound = false,
      videos = null,
      audios = null;

    documents.forEach((doc) => {
      videos = doc.querySelectorAll("videos");
      audios = doc.querySelectorAll("audio");
      if (videos.length || audios.length) {
        videoFound = true;
      }
    });

    return videoFound;
  }

  function startRecorder(data) {
    if (isVideo()) {
      sendCommandMessage("Can't record on a video/audio page");
      webUI.showSpeechContainer();
      return true;
    } else {
      recorder.startRecorder(data);
    }
  }

  function addRecorderCommands() {
    wa.addWebCommands([
      {
        commandText: "stop",
        commandFunction: recorder.stopRecorder,
        exactMatch: true,
        useWaitForFinal: true,
      },
      {
        commandText: "record",
        commandFunction: startRecorder,
        exactMatch: true,
        useWaitForFinal: true,
      },
      // {
      //   commandText: "record video",
      //   commandFunction: recorder.recordVideo,
      //   exactMatch: true,
      //   useWaitForFinal: true
      // },

      // {
      //   commandText: "record tab",
      //   commandFunction: recorder.recordTab,
      //   exactMatch: true,
      //   useWaitForFinal: true
      // },
      {
        commandText: "quality *",
        commandFunction: recorder.quality,
      },
      {
        commandText: "play recording",
        commandFunction: recorder.playRecording,
        exactMatch: true,
        useWaitForFinal: true,
      },
      {
        commandText: "stop playing",
        commandFunction: recorder.stopPlaying,
        exactMatch: true,
        useWaitForFinal: true,
      },
      {
        commandText: "pause",
        commandFunction: recorder.pausePlaying,
        exactMatch: true,
        useWaitForFinal: true,
      },
      {
        commandText: "download recording",
        exactMatch: true,
        commandFunction: recorder.downloadRecording,
        useWaitForFinal: true,
      },
      {
        commandText: "close recorder",
        commandFunction: recorder.hide,
        useWaitForFinal: true,
      },
      {
        commandText: "clothes recorder",
        commandFunction: recorder.hide,
        alternateText: "close recorder",
        useWaitForFinal: true,
      },
    ]);
  }

  function getParentElement() {
    var div = document.createElement("div"),
      testEl = null;

    div.id = "test";
    document.documentElement.appendChild(div);
    testEl = document.getElementById("test");
    if (testEl && currentURL.indexOf("shopify.com") === -1) {
      testEl.remove();
      return document.documentElement;
    } else {
      return document.body;
    }
  }

  function openHelp() {
    try {
      if (webUI.notesOpen) {
        webUI.setCommandText("Close notes before proceeding.");
        webUI.showSpeechContainer();
        return true;
      }
      labelsHidden = false;

      webUI.openHelp();
    } catch (error) {
      onError("error");
    }
  }

  async function closeHelp(data) {
    try {
      if (webUI.helpOpen) {
        webUI.closeHelp();
      } else {
        if (
          (data.transcript === "close" || data.transcript === "close,") &&
          frameAllowed &&
          !recorder.recording
        ) {
          data.commandText = "close web";
          webUI.closeWeb();
          return true;
        }
      }
      updateCommands(100, true);
    } catch (error) {
      onError("error");
    }
  }

  function openNotes() {
    try {
      if (webUI.helpOpen) {
        webUI.setCommandText("Close help before proceeding.");
        webUI.showSpeechContainer();
        return true;
      }
      labelsHidden = false;
      webUI.openNotes();
    } catch (error) {
      onError("error");
    }
  }

  async function closeNotes() {
    try {
      webUI.closeNotes();
      // updateCommands(100, true);
    } catch (error) {
      onError("error");
    }
  }

  function hideLabels() {
    if (webUI) {
      labelsHidden = true;
      wa.showAllLabels = false;
      webUI.hideLabels();
    }
  }

  function showLabels() {
    if (wa) {
      labelsHidden = false;
      updateCommands(100, true);
    }
  }

  function showAllLabels() {
    if (wa) {
      labelsHidden = false;
      wa.showAllLabels = true;
      updateCommands(100, true);
    }
  }

  function addSoundEffects() {
    if (webUI) {
      soundEffects = true;
      webUI.soundEffects = true;
      wa.soundEffects = true;
      if (speechDetect) speechDetect.soundEffects = true;
      let attention = new Audio(
        chrome.runtime.getURL("bubble-sound-effect.wav")
      );
      attention.play().catch(function (err) {
        onError("screen");
      });
    }
  }

  async function noSoundEffects() {
    if (webUI) {
      soundEffects = false;
      wa.soundEffects = false;
      webUI.soundEffects = false;
      if (speechDetect) speechDetect.soundEffects = false;
    }
  }

  var inQuietMode = false;

  async function quietMode() {
    if (enableWakeup) {
      webUI.wakeUpEnabled = false;
      enableWakeup = false;
      inQuietMode = true;
    }
  }

  async function endQuietMode() {
    if (inQuietMode) {
      webUI.wakeUpEnabled = true;
      enableWakeup = true;
      inQuietMode = false;
    }
  }

  async function setStatus(msg) {
    webUI.setStatus(msg);
  }

  async function checkMicrophone() {
    navigator.permissions
      .query({ name: "microphone" })
      .then(function (permission) {
        if (permission.state === "denied") {
          microphone = false;
        } else {
          microphoneDisabled();
        }
      });
  }

  async function microphoneDisabled() {
    var devices = await navigator.mediaDevices.enumerateDevices(),
      hasMicrophone = false;

    devices.forEach(function (device) {
      if (device.kind === "audioinput") {
        hasMicrophone = true;
        return;
      }
    });
    if (!hasMicrophone) {
      microphone = false;
    }
  }
  var pageLoaded = false,
    updateDelay = null;

  function initializeRecognition() {
    commandsUpdating = false;
    if (!pageLoaded) {
      pageLoaded = true;

      setTimeout(() => {
        if (autostart) {
          if (document.hidden) {
            recognitionStart = false;
            windowStopped = true;
          } else {
            webUI.startRecognition();
          }
          clearTimeout(updateDelay);
        } else {
          wa.initializeInputUndos();
        }
      }, 500);
    }
  }

  async function addSiteMethods() {
    //Site specific code
    if (currentURL.indexOf("mail.yahoo.com") > -1) {
      var els = document.querySelector(
        "[class='p_R Z_0 iy_h iz_A W_6D6F H_6D6F k_w em_N c22hqzz_GN '"
      );

      if (els) {
        els.tabIndex = 0;
        els.focus();
      }
      initializeCommandInterval = 1000;
      clickUpdateInterval = 3500;
      documentClickInterval = 3500;
    } else if (currentURL.indexOf("facebook.com") > -1) {
      clickUpdateInterval = 3000;
      documentClickInterval = 3000;
      if (currentURL.indexOf("/adsmanager") > -1) {
        initializeCommandInterval = 15000;
      } else {
        initializeCommandInterval = 3000;
      }
    } else if (currentURL.indexOf("youtube.com") > -1) {
      clickUpdateInterval = 3500;
      documentClickInterval = 3500;
      initializeCommandInterval = 6000;
      var elem = document.body || document.documentElement;
      elem.click();
    } else if (currentURL.indexOf("huffpost.com") > -1) {
      clickUpdateInterval = 2000;
      documentClickInterval = 2900;
      initializeCommandInterval =
        currentURL === "https://www.huffpost.com/" ? 4500 : 2000;
    } else if (currentURL.indexOf("netflix.com") > -1) {
      clickUpdateInterval = 1200;
      documentClickInterval = 1200;
      initializeCommandInterval = 4000;
    } else if (currentURL.indexOf("mail.google.com") > -1) {
      var el = document.getElementById(":3");
      if (el) {
        if (!el.tabindex || el.tabindex < 0) {
          el.tabIndex = 0;
        }
        el.focus();
      }
      documentClickInterval = 2000;
      clickUpdateInterval = 2000;
    } else if (currentURL.indexOf("tiktok.com") > -1) {
      documentClickInterval = 2000;
      clickUpdateInterval = 2000;
    } else if (currentURL.indexOf("twitter.com") > -1) {
      clickUpdateInterval = 5000;
      documentClickInterval = 5000;
      initializeCommandInterval = 4000;
    } else if (currentURL.indexOf("weather.com") > -1) {
      initializeCommandInterval = 4000;
    } else if (currentURL.indexOf("amazon.com") > -1) {
      initializeCommandInterval = 2250;
    } else if (currentURL.indexOf("reddit.com") > -1) {
      initializeCommandInterval = 3000;
      clickUpdateInterval = 3000;
      documentClickInterval = 3000;
    } else if (currentURL.indexOf("cnn.com") > -1) {
      clickUpdateInterval = 3000;
      documentClickInterval = 3000;
    } else if (currentURL.indexOf("pinterest.com") > -1) {
      initializeCommandInterval = 2000;
      clickUpdateInterval = 3000;
      documentClickInterval = 3000;
    } else if (currentURL.indexOf("twitch.tv") > -1) {
      initializeCommandInterval = 3500;
      clickUpdateInterval = 3000;
    } else if (currentURL.indexOf("ebay.com") > -1) {
      initializeCommandInterval = 3000;
      clickUpdateInterval = 3000;
      documentClickInterval = 3000;
    } else if (currentURL.indexOf("walmart.com") > -1) {
      initializeCommandInterval = 3000;
      clickUpdateInterval = 3000;
      documentClickInterval = 3000;
    } else if (currentURL.indexOf("linkedin.com") > -1) {
      documentClickInterval = 3250;
      clickUpdateInterval = 3250;
      initializeCommandInterval = 3500;
    } else if (currentURL.indexOf("outlook.live.com") > -1) {
      clickUpdateInterval = 3000;
    } else if (currentURL.indexOf("skype.com") > -1) {
      initializeCommandInterval = 5000;
    } else if (currentURL.indexOf("yahoo.com") > -1) {
      initializeCommandInterval = 3000;
      clickUpdateInterval = 5500;
      documentClickInterval = 5500;
    } else if (currentURL.indexOf("espn.com") > -1) {
      initializeCommandInterval = 4000;
      clickUpdateInterval = 4000;
      documentClickInterval = 4000;
    } else if (currentURL.indexOf("bing.com") > -1) {
      clickUpdateInterval = 3000;
      documentClickInterval = 3000;
    } else if (currentURL === "apple.com/") {
      clickUpdateInterval = 4000;
    } else if (currentURL.indexOf("yahoo.com") > -1) {
      clickUpdateInterval = 3000;
      documentClickInterval = 3000;
    } else if (currentURL.indexOf("paypal.com") > -1) {
      if (currentURL.indexOf("xoom") > -1) initializeCommandInterval = 3500;
    } else if (currentURL.indexOf("fandom.com") > -1) {
      clickUpdateInterval = 3000;
      documentClickInterval = 3000;
    } else if (currentURL.indexOf("duckduckgo.com") > -1) {
      if (currentURL.indexOf("=maps") > -1) {
        initializeCommandInterval = 6000;
        documentClickInterval = 6000;
        clickUpdateInterval = 6000;
      } else {
        initializeCommandInterval = 4000;
        documentClickInterval = 4000;
        clickUpdateInterval = 4000;
      }
    } else if (currentURL.indexOf("google.com") > -1) {
      initializeCommandInterval = 100;
      documentClickInterval = 2000;
      clickUpdateInterval = 2000;
    } else if (currentURL.indexOf("craigslist.com") > -1) {
      initializeCommandInterval = 1000;
      documentClickInterval = 1000;
      clickUpdateInterval = 1000;
    }
  }

  var autoScrolling = false,
    scrollPosition = 0,
    scrollInterval = 0;
  //Handles updating commands when scrolling the document manually
  function scrollDocument(e) {
    try {
      if (e.target.id === "waDropdown") return;
      if (isScrollElement(e.target)) return;
      if (
        document.scrollingElement.scrollTop === 0 &&
        e.target !== document.scrollingElement &&
        e.target.offsetWidth < 400 &&
        currentURL.indexOf("twitch") > -1
      )
        return;
      if (
        !scrolling &&
        isInViewport(e.target) &&
        !elemClicked &&
        !documentClicked &&
        appInitialized
      ) {
        scrolling = true;
        if (
          e.target.getAttribute &&
          e.target.getAttribute("class") &&
          e.target.getAttribute("class") === "resize-detector"
        )
          return;
        if (
          e.target.getAttribute &&
          e.target.getAttribute("class") &&
          e.target.getAttribute("class") === "simplebar-scroll-content" &&
          e.target.firstChild.getAttribute("class") === "simplebar-content"
        )
          return;

        scrollInterval = getScrolllnterval(e.target.scrollingElement);
        if (webUI) webUI.hideUI(false);
        setTimeout(function () {
          updateCommands(0, false);
          scrolling = false;
        }, scrollInterval);
      }

      //Facebook
      if (
        currentURL.indexOf("facebook.com") > -1 &&
        scrollPosition > 0 &&
        scrollPosition === document.documentElement.scrollTop - 1
      ) {
        document.body.focus();
        fireEvent(document.body, "focus");
      }

      scrollPosition = document.documentElement.scrollTop;
    } catch (error) {
      console.log("scroll error " + error.message);
    }
  }

  function isScrollElement(target) {
    var elems = document.querySelectorAll("[wascrolllabel=true]");

    for (var x = 0; x < elems.length; x++) {
      if (elems[x] === target) return true;
    }
  }

  var isInViewport = function (elem) {
    if (elem.getBoundingClientRect) {
      if (elem.offsetHeight > window.innerHeight) return true;
      var distance = elem.getBoundingClientRect();

      return (
        distance.top >= 0 &&
        distance.left >= 0 &&
        distance.bottom <=
          (window.innerHeight + 1 || document.documentElement.clientHeight) &&
        distance.right <=
          (window.innerWidth + 1 || document.documentElement.clientWidth)
      );
    } else {
      return true;
    }
  };

  //This is the interval to wait before commands are updated after scrolling and has site specific values
  function getScrolllnterval() {
    if (currentURL.indexOf("youtube.com") > -1) {
      return 750;
    } else if (currentURL.indexOf("facebook.com") > -1) {
      if (currentURL.indexOf("/watch") > -1) {
        return 1000;
      } else {
        return 750;
      }
    } else if (currentURL.indexOf("netflix.com") > -1) {
      return 1000;
    } else if (currentURL.indexOf("mail.yahoo.com") > -1) {
      return 200;
    } else if (currentURL.indexOf("weather.com") > -1) {
      return 200;
    } else if (currentURL.indexOf("cnn.com") > -1) {
      return 1250;
    } else if (currentURL.indexOf("amazon.com") > -1) {
      return 1500;
    } else if (currentURL.indexOf("apple.com") > -1) {
      return 900;
    } else if (currentURL.indexOf("paypal.com") > -1) {
      return 900;
    } else if (currentURL.indexOf("bing.com") > -1) {
      return 1000;
    } else if (currentURL.indexOf("cnn.com") > -1) {
      return 100;
    } else if (currentURL.indexOf("google.com") > -1) {
      return 1000;
    } else if (currentURL.indexOf("craigslist.com") > -1) {
      return 100;
    } else if (currentURL.indexOf("reddit.com") > -1) {
      return 1000;
    } else {
      return 900;
    }
  }

  function fireEvent(node, eventName) {
    // Make sure we use the ownerDocument from the provided node to avoid cross-window problems
    var event = new Event(eventName, {
      bubbles: true,
      cancelable: false,
    });
    node.dispatchEvent(event);
  }

  //This is not currently implemented
  function autoScroll(autoScroll) {
    autoScrolling = autoScroll;
    if (!autoScrolling) scrolling = false;
  }

  function initializeCommands() {
    try {
      if (appInitialized && !documentClicked && !elemClicked) {
        if (webUI) webUI.hideUI(false);
        setTimeout(function () {
          updateCommands(0, false);
        }, initializeCommandInterval);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  function updateCommands(interval, hideUI) {
    try {
      if (labelsHidden || extensionHidden || document.hidden) return;
      redMicPage = redMicPage || document.getElementById("RedMicPage");
      if (!redMicPage) {
        if (webUI) webUI.hideUI(false);
        return;
      }

      if (!commandsUpdating && !autoScrolling) {
        commandsUpdating = true;
        if (webUI && hideUI) webUI.hideUI(false);
        var updateTimeout = setTimeout(function () {
          if (!wa) return;
          wa.resetDocuments();

          wa.initializeCommands(labelsHidden);
          addCustomCommands();
          clearTimeout(updateTimeout);

          var documents = wa.returnDocuments();
          documents.forEach((doc) => {
            if (doc.addEventListener)
              doc.addEventListener("scroll", scrollDocument, true);
          });
          scrolling = false;
          commandsUpdating = false;
          elemClicked = false;
          documentClicked = false;
        }, interval);
      }
    } catch (error) {
      onError("update commands error");
    }
  }

  var elemClicked = false;

  function elementClicked(interval) {
    var updateInterval = interval ? interval : clickUpdateInterval;

    elemClicked = true;
    if (!scrolling) {
      scrolling = true;
      updateCommands(updateInterval, true);
    }
  }

  function sendCommandMessage(msg) {
    if (webUI) webUI.setCommandText(msg);
  }

  var appInitialized = false,
    commandsInitialized = false;

  //Event callbacks
  function initialized() {
    addSiteMethods();
    setTimeout(function () {
      updateCommands(0, false);
      commandsInitialized = true;
    }, initializeCommandInterval);

    appInitialized = true;
    if (!microphone && autostart) {
      onError("notallowederror");
      return;
    }
  }

  function recognitionStopped() {
    hideLabels();
    if (enableWakeup) {
      webUI.setCommandText(wakeReminder);
    } else {
      webUI.setCommandText(helpMessage);
    }
    recognitionStart = false;
  }

  function recognitionStarted() {
    if (soundEffects) playSoundEffects();
    recognitionStart = true;
  }

  async function commandMatch(command) {
    if (webUI.getStatus() !== stopStatus) {
      setMatchCommandText(command);
      setMatchStatus();
      try {
        if (soundEffects) {
          let attention = new Audio(
            chrome.runtime.getURL("bubble-sound-effect.wav")
          );
          attention.play().catch(function (err) {});
        }
      } catch (error) {
        console.log("sound effects");
      }
    }
  }

  async function setMatchCommandText(command) {
    var commandText =
      command.commandText.indexOf(" *") === -1
        ? command.commandText
        : command.transcript;

    if (command.alternateText) {
      commandText = command.alternateText;
      if (command.commandText.indexOf(" *") > -1)
        commandText += " " + getWildCardText(command.transcript, commandText);
    }
    //Remove unnecessary punctuation
    commandText = commandText.replace(/[,;:.?!]+/g, "");
    webUI.setCommandText(commandText);
  }

  function getWildCardText(transcript, commandText) {
    var start = transcript.indexOf(commandText) + commandText.length;

    return transcript.substring(start).trim();
  }

  var currentStatus = "";

  async function setMatchStatus() {
    var timeout = 500;

    currentStatus = !webUI.isMobile ? webUI.getStatus() : "";
    setTimeout(function () {
      if (recognitionStart) {
        //This if for mobile devices
        //  if (!currentStatus && !webUI.isMobile) currentStatus = listeningStatus;
        currentStatus = listeningStatus;
        webUI.setStatus(currentStatus);
        currentStatus = "";
      }
    }, timeout);
    if (webUI.getStatus() !== "Timeout") webUI.setStatus("Match");
  }

  var windowStopped = false,
    labelsOn = true;

  function tabFocus(activeTab) {
    if (
      extensionHidden ||
      extensionUninstalled() ||
      !appInitialized ||
      document.activeElement.id === "speechFrame"
    )
      return;
    if (activeTab) {
      if (!recognitionStart && windowStopped) {
        windowStopped = false;
        if (webUI) {
          webUI.startRecognition();
          recognitionStart = true;
        }
        if (labelsOn) webUI.showLabels();
        labelsOn = true;
      } else {
        if (!recognitionStart && enableWakeup && speechDetect && microphone)
          speechDetect.start();
      }
    } else {
      if (
        !recognitionStart &&
        enableWakeup &&
        speechDetect &&
        speechDetect.detectorOn
      ) {
        speechDetect.stop();
      }
      if (webUI) webUI.hideLabels();
      if (recognitionStart) {
        windowStopped = true;
        if (labelsHidden) labelsOn = false;
        if (webUI) webUI.stopRecognition(stopStatus, "Window");
      }
      setTimeout(() => {
        if (
          document.hidden &&
          ((enableWakeup && speechDetect && speechDetect.detectorOn) ||
            recognitionStart)
        ) {
          location.reload();
        }
      }, 4000);
    }
  }

  function optionsSet(msg) {
    if (msg) webUI.setCommandText(msg);
  }

  function extensionUninstalled() {
    try {
      if (!chrome.runtime.getManifest()) {
        // will return undefined in an orphaned script
        labelsHidden = true;
        hideExtension();
        return true;
      }
    } catch (e) {
      // currently doesn't happen, but may happen
      labelsHidden = true;
      hideExtension();
      return true;
    }
  }

  function hideExtension() {
    extensionHidden = true;
    if (webUI) {
      if (recognitionStart) webUI.stopRecognition(stopStatus, "Window");
      if (webUI.helpOpen) closeHelp();
      closeNotes();
      if (frameAllowed) recorder.hide();
      var elMmodal = document.getElementById("waModalShadow");
      if (elMmodal) {
        elMmodal.style.display = "none";
      }

      var elMask = document.getElementById("waMask");
      if (elMask) elMask.style.display = "none";
      webUI.hideUI(true);
      wa = null;
      webUI = null;
    }

    labelsHidden = true;
    if (enableWakeup && speechDetect) speechDetect.stop();
  }

  async function onError(msg) {
    try {
      if (soundEffects) {
        let attention = new Audio(
          chrome.runtime.getURL("bubble-sound-effect.wav")
        );
        attention.play().catch(function () {});
      }
    } catch (error) {
      console.log("sound effects");
    }
    if (webUI) {
      if (document.activeElement) document.activeElement.blur();
      webUI.enabled = true;
      var msgText = "";
      if (msg === "network") {
        if (recognitionStart) {
          webUI.stopRecognition(stopStatus);
          webUI.setCommandText("Check your internet connection");
          webUI.showSpeechContainer();
          return;
        }
      } else if (msg === "notallowederror") {
        setTimeout(() => {
          webUI.enabled = true;
          webUI.stopRecognition(stopStatus, "Window");
          if (enableWakeup && speechDetect) speechDetect.stop();
          speechDetect = null;
          hideLabels();
          webUI.setCommandText("Microphone access denied");
          webUI.showSpeechContainer();
          return;
        }, 2000);
        return;
      } else if (msg === "screen") {
        setTimeout(() => {
          webUI.setCommandText("Press any key or click the page to continue.");
        }, 2000);

        webUI.showSpeechContainer();
        return;
      } else if (msg === "noDictation") {
        webUI.setCommandText('Use "open notes" for voice dictation.');
        webUI.showSpeechContainer();
        return;
      } else if (msg === "restart") {
        webUI.setCommandText("There was a problem - try reloading the page.");
        if (document.hidden) document.reload();
        return;
      } else if (msg === "noscroll") {
        webUI.setCommandText("Scrolling commands are disabled on this page.");
        webUI.showSpeechContainer();
        return;
      } else if (msg === "error") {
        msgText = "There was a problem - try reloading the page";
      } else if (msg === "nocommand") {
        msgText = "This command is not available.";
        webUI.setCommandText(msgText);
        webUI.showSpeechContainer();
        return;
      } else if (msg === "nolabels") {
        msgText = "Labels are not available on this site.";
        webUI.setCommandText(msgText);
        if (!recognitionStart) webUI.stopRecognition(stopStatus);
        webUI.showSpeechContainer();
        return;
      } else if (msg === "secure") {
        setTimeout(() => {
          webUI.enabled = true;
          webUI.stopRecognition(stopStatus);
          webUI.setCommandText("You must have a secure connection.");
          webUI.showSpeechContainer();
          return;
        }, 200);

        return;
      } else if (msg === "frame") {
        msgText = "Some commands might not be available.";
        webUI.setCommandText(msgText);
        return;
      } else if (msg === "youtube") {
        msgText = "Youtube commands are not available.";
        webUI.setCommandText(msgText);
        return;
      } else {
        msgText = "There was a problem - try reloading the page";
      }
      webUI.stopRecognition(stopStatus);
      msgText = msgText ? msgText : helpMessage;
      webUI.setCommandText(msgText);
      webUI.showSpeechContainer();
    }

    console.log(msg);
  }

  async function ontimeout() {
    if (!recognitionStart) return;
    if (soundEffects) {
      let attention = new Audio(
        chrome.runtime.getURL("bubble-sound-effect.wav")
      );
      attention.play().catch(function (err) {});
    }
    webUI.stopRecognition("Timeout");
    setTimeout(() => {
      if (webUI.isMobile) {
        webUI.setCommandText("Timeout");
      } else {
        if (enableWakeup) {
          webUI.setCommandText(wakeReminder);
        } else {
          webUI.setCommandText(helpMessage);
        }
      }
    }, 2000);
  }
  //End Web Assist Events

  async function removeDropdown() {
    var select = document.getElementById("waDropdown");
    if (select) {
      select.remove();
    }
  }

  //THe native dialogs cause errors so they need to replaced with custom functions that prevent
  //recognition from being stopped in the windowFocus event.
  var oldAlert = window.alert;

  window.alert = function () {
    oldAlert.apply(window, arguments);
  };

  var oldConfirm = window.confirm;

  window.confirm = function () {
    return oldConfirm.apply(window, arguments);
  };

  var oldPrompt = window.prompt;

  window.prompt = function () {
    return oldPrompt.apply(window, arguments);
  };

  document.addEventListener(
    "click",
    function (e) {
      try {
        var el = e.target;

        if (
          e.pointerType &&
          appInitialized &&
          el !== document.body &&
          !el.closest("#WebAssistContainer") &&
          !scrolling &&
          el.id !== "GreenMicPage" &&
          el.id !== "RedMicPage"
        ) {
          if (isCommand(el.target)) return false;
          //bing
          if (
            el.getAttribute("h") &&
            el.getAttribute("h").indexOf("ID=images") > -1 &&
            el.nodeName === "A"
          ) {
            location.reload();
            return;
          }

          if (el.innerText === "Feedback") {
            onError("nocommand");
            return;
          }

          documentClicked = true;
          if (webUI) webUI.hideUI(false);
          scrolling = true;
          updateCommands(documentClickInterval, false);
          removeDropdown();
        }
      } catch (error) {
        console.log("Doc click error " + error.message);
      }
    },
    false
  );

  function isCommand(elem) {
    var elems = document.querySelectorAll(`[id^="altElem"]`);
    for (var x = 0; x < elems.length; x++) {
      if (elems[x] === elem) return true;
    }
  }

  function siteMatch() {
    return (
      currentURL.indexOf("facebook.com") > -1 ||
      currentURL.indexOf("gmail.com") > -1 ||
      currentURL.indexOf("mail.yahoo.com") > -1 ||
      currentURL.indexOf("youtube.com") > -1 ||
      currentURL.indexOf("google.com") > -1 ||
      currentURL.indexOf("netflix.com") > -1 ||
      currentURL.indexOf("instagram.com") > -1 ||
      currentURL.indexOf("tiktok.com") > -1 ||
      currentURL.indexOf("twitch.tv") > -1 ||
      currentURL.indexOf("amazon.com") > -1
    );
  }

  var changeCount = 0,
    fullURL = window.location.href;

  var zoomLevel = window.devicePixelRatio;
  if (!siteMatch()) {
    var currentHeight = document.body.clientHeight;

    const resizeObserver = new ResizeObserver(async (entries) => {
      try {
        if (window.location.href !== fullURL) {
          changeCount = 0;
        }
        fullURL = window.location.href;
        if (
          (appInitialized && !scrolling && !heightChanging) ||
          zoomLevel !== window.devicePixelRatio
        ) {
          zoomLevel = window.devicePixelRatio;
          if (
            entries[0].target === document.body ||
            entries[0].target === document.documentElement ||
            zoomLevel !== window.devicePixelRatio
          ) {
            if (
              (changeCount > 5 &&
                document.body.clientHeight !== currentHeight) ||
              zoomLevel !== window.devicePixelRatio
            ) {
              currentHeight = document.body.clientHeight;
              setTimeout(function () {
                changeCount = 5;
              }, 4000);
              return;
            }
            currentHeight = document.body.clientHeight;
          }
          changeCount += 1;
          if (changeCount < 6) {
            setTimeout(function () {
              updateCommands(0, true);
              heightChanging = false;
            }, 3000);
          }
        }
      } catch (e) {
        onError("error");
      }
    });

    setTimeout(async function () {
      resizeObserver.observe(document.documentElement);
    }, 4000);
  }

  async function documentChangeInitialize() {
    if (commandsInitialized) {
      updateCommands(1000, true);
      updateDelay = setTimeout(function () {
        commandsInitialized = false;
      }, 5000);
    }
  }

  if (
    currentURL.indexOf("youtube.com") == -1 &&
    currentURL.indexOf("twitch.tv") === -1
  ) {
    let observer = new MutationObserver(documentChangeInitialize);
    observer.observe(document.body, { childList: true, subtree: true });
  }

  var videoPause = false;

  async function videoOn(video) {
    if (recognitionStart && video.muted === false) {
      wa.setVideoTimeout();
      videoPause = true;
    }
  }

  async function videoOff() {
    if (videoPause && !recognitionStart) {
      wa.resetTimeout();
      webUI.startRecognition();
      videoPause = false;
    }
  }

  function KeyPress(e) {
    var keyCode = e.keyCode;

    //alt + s start
    if (keyCode === 83 && e.altKey) {
      if (!document.hidden) {
        startRecognition();
        if (soundEffects) playSoundEffects();
      }
      //alt + c close
    } else if (keyCode === 67 && e.altKey) {
      recognitionStart = false;
      webUI.minimizeSpeechContainer();
      webUI.stopRecognition("Stopped");
      if (soundEffects) playSoundEffects();
      //alt + o
    } else if (keyCode === 79 && e.altKey) {
      if (recognitionStart) {
        webUI.showSpeechContainer();
        if (soundEffects) playSoundEffects();
      } else {
        webUI.stopRecognition();
        webUI.showSpeechContainer();
        if (soundEffects) playSoundEffects();
      }
      //alt + h
    } else if (keyCode === 72 && e.altKey) {
      webUI.minimizeSpeechContainer();
      if (soundEffects) playSoundEffects();
    } else if (keyCode === 71 && e.altKey) {
      showAllLabels();
      if (soundEffects) playSoundEffects();
    } else if (keyCode === 88 && e.altKey) {
      hideLabels();
      if (soundEffects) playSoundEffects();
    } else if (keyCode === 77 && e.altKey) {
      addSoundEffects();
    } else if (keyCode === 65 && e.altKey) {
      if (soundEffects) playSoundEffects();
      noSoundEffects();
      //Start recording alt - r
    } else if (keyCode === 82 && e.altKey) {
      if (soundEffects) playSoundEffects();
      if (recorder) recorder.startRecorder();
      //Stop recording alt + w
    } else if (keyCode === 82 && e.altKey) {
      if (soundEffects) playSoundEffects();
      if (recorder) recorder.startRecorder();
      //Stop recording alt + w
    } else if (keyCode === 87 && e.altKey) {
      if (soundEffects) playSoundEffects();
      if (recorder) recorder.stopRecorder();
      // play audio alt + p
    } else if (keyCode === 80 && e.altKey) {
      if (soundEffects) playSoundEffects();
      if (recorder) recorder.playRecording();
      // Pause play alt+ u
    } else if (keyCode === 85 && e.altKey) {
      if (soundEffects) playSoundEffects();
      if (recorder) recorder.pausePlaying();
      // Stop  play alt + b
    } else if (keyCode === 66 && e.altKey) {
      if (soundEffects) playSoundEffects();
      if (recorder) recorder.stopPlaying();
      // Hide recorder  alt + l
    } else if (keyCode === 76 && e.altKey) {
      if (soundEffects) playSoundEffects();
      if (recorder) recorder.hide();
      // Hide recorder  alt + i
    } else if (keyCode === 73 && e.altKey) {
      if (soundEffects) playSoundEffects();
      if (recorder) recorder.downloadRecording();
    }
  }

  async function playSoundEffects() {
    try {
      let attention = new Audio(
        chrome.runtime.getURL("bubble-sound-effect.wav")
      );
      attention.play().catch(function (err) {
        onError("screen");
      });
    } catch (error) {}
  }

  window.onkeydown = KeyPress;

  async function emulateUserInteraction(elem) {
    elem.focus();
    elem.click();
    fireEvent(elem, "click");
  }

  setTimeout(() => {
    addWindowEvents();
    addVideoEvents();
  }, 200);
})(window, document);

// chrome.runtime.sendMessage({
//   action: "microphone",
//   URL: url
// }, function () { });
//window.onload = function () {
// initializeRecognition();
//};

// document.addEventListener("visibilitychange", function () {
//   try {
//     if (document.visibilityState === 'hidden') {
//       tabFocus(false);
//     } else if (document.visibilityState === 'visible') {
//     if (windowFocused)  tabFocus(true);
//      windowFocused = false;
//     }
//     else {
//       tabFocus(false);
//     }
//   } catch (error) {
//     console('tab focus error');
//   }

// });

// chrome.runtime.connect().onDisconnect.addListener(function() {
//   hideExtension()
// })

// document.addEventListener("visibilitychange", function () {
//   //console.log( document.visibilityState );

//   // if (document.hidden && !inIframe()) {
//   //   if (microphoneEnabled) {
//   //     location.reload();
//   //   }
//   //   visibilityChange = true;
//   //   tabFocus(false);
//   // }

// });

// function createMicFrame() {
//   var frame = document.createElement('iframe'),
//     internalUrl = chrome.runtime.getURL("microphone.html");
//   frame.setAttribute("allow", "microphone; camera");
//   frame.src = internalUrl;
//   document.body.appendChild(frame);
// }

// var windowsArray = Array.from(document.getElementsByTagName('iframe'));

// windowsArray.forEach((frame) => {
//   if (isSameOrigin(frame) && frame.contentDocument) {
//     addFocusEvents(frame.contentWindow);
//   }
// });
